"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/client";
import useDebounce from "@/hooks/use-debounce";
import { getPatients } from "@/queries/get-patients";
import { PatientSearchCardLoading } from "./patient-search-card-loading";
import { PatientSearchCard } from "./patient-search-card";
import { PatientSearchEmptyState } from "./patient-search-empty-state";
import useSWR from "swr";

const pacientsFetcher = async (searchQuery: string) => {
  const supabase = createClient();
  const { data } = await getPatients(supabase, searchQuery);
  return data;
};

export function PatientSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery);

  const { data: patients, isLoading } = useSWR(
    [debouncedSearchQuery],
    debouncedSearchQuery ? pacientsFetcher : null
  );

  const noResults = Boolean(
    patients && !patients?.length && !isLoading && debouncedSearchQuery
  );
  const hasResults = Boolean(patients && patients?.length && !isLoading);

  return (
    <div className="w-full max-w-3xl">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search patients by name, MRN, or condition... Hint: Try 'John Doe'"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 pr-4"
        />
      </div>

      <div className="h-[400px] overflow-y-auto">
        {isLoading && (
          <div className="h-full flex flex-col gap-2">
            {[...Array(4)].map((_, i) => (
              <PatientSearchCardLoading key={i} />
            ))}
          </div>
        )}
        {hasResults && (
          <ul className="divide-y flex flex-col gap-2">
            {patients.map((patient) => (
              <li key={patient.id}>
                <PatientSearchCard patient={patient} />
              </li>
            ))}
          </ul>
        )}

        {noResults && <PatientSearchEmptyState />}
      </div>
    </div>
  );
}
