import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PatientRow } from "@/types/supabase";
import moment from "moment";
import Link from "next/link";
import { Fragment } from "react";

export function PatientSearchCard({ patient }: { patient: PatientRow }) {
  function calculateAge(dateOfBirth: string) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

  const lastSession = patient.sessions[0];

  return (
    <Link
      href={`/patients/${patient.id}`}
      className="block transition-colors text-left p-4 border border-border-primary rounded-sm bg-secondary hover:bg-primary/10"
    >
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarFallback className="bg-primary/10 text-primary">
            {patient.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <p className="font-medium">{patient.name}</p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-paragraph">
            <span>MRN: {patient.mrn}</span>
            <span>Age: {calculateAge(patient.date_of_birth)}</span>
            {lastSession && (
              <Fragment>
                <span>
                  Last session:{" "}
                  <span className="text-primary font-medium">
                    {moment(lastSession.date).format("MMM D, YYYY")}
                  </span>{" "}
                  duo to{" "}
                  <span className="text-primary font-medium">
                    {lastSession.name}
                  </span>
                </span>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
