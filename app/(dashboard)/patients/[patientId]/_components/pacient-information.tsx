import { createClient } from "@/utils/supabase/client";
import { getPatientById } from "@/queries/get-patient-by-id";
import SessionsList from "./sessions-list";

export default async function PacientInformation({
  patientId,
}: {
  patientId: string;
}) {
  const supabase = createClient();

  const { data: pacient, error } = await getPatientById(supabase, patientId);

  if (error) {
    return <p>Error loading patient data</p>;
  }

  if (!pacient) {
    return <p>Patient not found</p>;
  }

  return (
    <div>
      <h1 className="text-2xl">{pacient.name}</h1>
      <p className="text-sm text-gray-500">{pacient.email}</p>
      <p className="text-sm text-gray-500">{pacient.phone}</p>
      <div className="py-5 gap-5 grid grid-cols-3">
        <SessionsList {...pacient} />
      </div>
    </div>
  );
}
