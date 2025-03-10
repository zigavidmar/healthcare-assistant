"use client";

import { PatientRow, SessionRow } from "@/types/supabase";
import React from "react";
import moment from "moment";
import PatientCard from "./patient-card";
import Link from "next/link";

export default function SessionsList({
  sessions,
}: PatientRow & { sessions: SessionRow[] }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-semibold">Sessions</p>
      <PatientCard>
        <ul>
          {sessions.slice(0, 3).map((session) => (
            <li key={session.id}>
              <Session session={session} />
            </li>
          ))}
        </ul>
      </PatientCard>
    </div>
  );
}

function Session({ session }: { session: SessionRow }) {
  function renderDate() {
    // If today, show time
    if (moment(session.date).isSame(moment(), "day")) {
      return (
        "Today at " +
        moment(session.date).format("HH:mm") +
        " " +
        moment(session.date).fromNow()
      );
    }

    // If in the near future, show "On [] at 14:00"
    if (moment(session.date).isAfter(moment())) {
      return "On " + moment(session.date).format("dddd [at] HH:mm");
    }

    return moment(session.date).format("DD.MM.YYYY HH:mm");
  }

  return (
    <Link
      href={`/patients/${session.patient_id}/sessions/${session.id}`}
      className="p-3 text-left flex flex-col gap-1 w-full"
    >
      <p className="text-sm font-semibold">{session.name}</p>
      <div className="flex items-center gap-2">
        <p className="text-xs text-gray-400">{renderDate()}</p>
        <SessionStatusBadge status={session.status} />
      </div>
    </Link>
  );
}

function SessionStatusBadge({ status }: { status: SessionRow["status"] }) {
  return (
    <span
      className={`text-[8px] uppercase font-semibold inline-block rounded-sm px-2 py-1 ${
        status === "finished"
          ? "bg-green-100 text-green-800"
          : "bg-yellow-100 text-yellow-800"
      }`}
    >
      {status}
    </span>
  );
}
