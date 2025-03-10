import React from "react";

function PatientCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-border-primary bg-white shadow-2xs rounded-xl">
      {children}
    </div>
  );
}

export default PatientCard;
