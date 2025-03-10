"use client";
import React from "react";
import useSessionEditor from "@/store/use-session-editor";
import EditorToolbar from "./editor/toolbar";
import WaveformVisualizer from "./editor/wave-form-visualizer";
import EditorFiles from "./editor/files";
import { Skeleton } from "@/components/ui/skeleton";
import { SessionRow } from "@/types/supabase";

interface EditorProps {
  session: SessionRow;
  mutateSession: () => Promise<SessionRow>;
}

export default function Editor({ session, mutateSession }: EditorProps) {
  const {
    value,
    setValue,
    voiceRecording: { isRecording, analyser, isTranscribing },
  } = useSessionEditor();

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setValue(e.target.value);
  }

  return (
    <div className="border border-gray-200 rounded-md p-5">
      <EditorFiles />
      <div className="h-[80px] relative mb-2">
        <textarea
          className="w-full resize-none placeholder:text-gray-400 text-sm outline-none h-full"
          value={value}
          onChange={handleChange}
          disabled={isRecording}
          placeholder="Type your notes here, record a voice note or attach a file"
        ></textarea>
        {isRecording && (
          <div className="absolute top-0 left-0 bottom-0 right-0 w-full bg-secondary rounded overflow-hidden">
            <WaveformVisualizer analyser={analyser} />
          </div>
        )}
        {isTranscribing && (
          <div className="absolute top-0 left-0 bottom-0 right-0 w-full rounded bg-secondary">
            <Skeleton className="absolute top-0 left-0 bottom-0 right-0 w-full rounded flex items-center justify-center">
              <p className="text-primary text-sm">
                Transcribings audio to text...
              </p>
            </Skeleton>
          </div>
        )}
      </div>
      <EditorToolbar session={session} mutateSession={mutateSession} />
    </div>
  );
}
