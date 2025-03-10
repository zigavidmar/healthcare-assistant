"use client";
import Disclaimer from "@/components/disclaimer";
import Editor from "./_components/editor";
import moment from "moment";
import { X } from "lucide-react";
import Link from "next/link";
import { getPatientSession } from "@/queries/get-patient-session";
import { createClient } from "@/utils/supabase/client";
import useSWR from "swr";
import { useParams } from "next/navigation";
import { Fragment } from "react";

async function fetcher(patientId: string, sessionId: string) {
  const supabase = createClient();
  const response = await getPatientSession(supabase, patientId, sessionId);
  return response;
}

export default function Page() {
  const params = useParams();
  const patientId = params.patientId as string;
  const sessionId = params.sessionId as string;

  const {
    data: sessionData,
    error,
    mutate,
  } = useSWR([patientId, sessionId], () => fetcher(patientId, sessionId));

  function renderView() {
    if (error) {
      return <p>Error loading session data</p>;
    }

    if (!sessionData) {
      return <p>Loading...</p>;
    }

    const session = sessionData.data;

    return (
      <Fragment>
        <div className="flex-grow overflow-y-auto">
          <div className="flex items-center justify-between gap-10 pb-5 sticky top-0 bg-secondary">
            <p className="font-medium text-primary text-lg">{session?.name}</p>
            <Link href="/">
              <X size={24} />
            </Link>
          </div>
          <div>
            <p className="text-primary text-sm font-semibold">Notes</p>
            <ul className="flex flex-col gap-5 py-4 overflow-y-auto">
              {session?.session_notes.map((note) => (
                <li key={note.id} className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-semibold">
                      by @{note.user_id.name}
                    </p>
                    <p className="text-paragraph text-xs">
                      {moment(note.created_at).format("HH:mm")}
                    </p>
                  </div>
                  <p className="text-paragraph text-sm">{note.content}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Editor session={session} mutateSession={mutate} />
          <Disclaimer />
        </div>
      </Fragment>
    );
  }

  return (
    <div className="h-screen border-l border-border-primary w-[500px] bg-white flex flex-col p-5">
      {renderView()}
    </div>
  );
}
