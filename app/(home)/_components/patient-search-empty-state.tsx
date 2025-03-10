import { Bug } from "lucide-react";

export function PatientSearchEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-6">
      <Bug className="w-16 h-16 text-paragraph" />
      <p className="text-paragraph text-center text-sm">
        No patients found. Try searching for a different patient.
      </p>
    </div>
  );
}
