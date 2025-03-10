"use client";
import { AudioLines, Paperclip, Save, StopCircle } from "lucide-react";
import React, { useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import useSessionEditor from "@/store/use-session-editor";
import ToolbarActionButton from "./toolbar-action-button";
import { useUser } from "@/app/context/user-context";
import { SessionRow } from "@/types/supabase";

interface EditorToolbarProps {
  session: SessionRow;
  mutateSession: () => void;
}

export default function EditorToolbar({
  session,
  mutateSession,
}: EditorToolbarProps) {
  const { value } = useSessionEditor();
  const { user } = useUser();

  async function handleSubmit() {
    if (!value) {
      return;
    }

    const supabase = createClient();

    const { data, error } = await supabase
      .from("session_notes")
      .insert({ content: value, session_id: session.id, user_id: user.id })
      .select("*");

    if (error) {
      console.error(error);
    }

    if (data) {
      useSessionEditor.setState({ value: "", files: [] });
    }
  }

  return (
    <div className="flex items-center gap-10 justify-between">
      <div className="flex items-center gap-2">
        <ToolbarActionButton
          icon={<Paperclip size={16} className="text-gray-500" />}
          onClick={() => {}}
          disabled
          tooltipContent="This feature is not available yet"
        />
        <VoiceRecorder mutateSession={mutateSession} />
      </div>
      <div>
        <ToolbarActionButton
          icon={<Save size={16} className="text-gray-500" />}
          onClick={handleSubmit}
          tooltipContent="Save"
          disabled={!value}
        />
      </div>
    </div>
  );
}

function VoiceRecorder({ mutateSession }: { mutateSession: () => void }) {
  const { voiceRecording, setVoiceRecording, setValue } = useSessionEditor();
  const { isRecording } = voiceRecording;
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioContextRef = useRef(null);
  const sourceRef = useRef(null);

  async function recordAudio() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const options = { mimeType: "audio/webm; codecs=opus" };
    mediaRecorderRef.current = new MediaRecorder(stream, options);
    audioChunksRef.current = [];

    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/webm",
      });

      sendAudioToAPI(audioBlob);
    };

    mediaRecorderRef.current.start();
    setVoiceRecording({ isRecording: true });

    audioContextRef.current = new AudioContext();
    const analyser = audioContextRef.current.createAnalyser();
    sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
    sourceRef.current.connect(analyser);

    setVoiceRecording({ analyser });
  }

  async function stopRecording() {
    mediaRecorderRef.current?.stop();
    sourceRef.current?.disconnect();
    audioContextRef.current?.close();
    setVoiceRecording({ isRecording: false, analyser: null });
  }

  const sendAudioToAPI = async (audioBlob: Blob) => {
    if (!audioBlob) return;
    setVoiceRecording({ isTranscribing: true });

    const audioFile = new File([audioBlob], "recording.webm", {
      type: "audio/webm",
    });

    const formData = new FormData();
    formData.append("file", audioFile);

    try {
      const response = await fetch("/api/voice-to-text", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setValue(data.transcript);
      setVoiceRecording({ isTranscribing: false });
      () => mutateSession();
    } catch (error) {
      console.error("Error converting audio to text:", error);
    }
  };

  if (isRecording) {
    return (
      <ToolbarActionButton
        icon={<StopCircle size={16} className="text-red-500" />}
        onClick={stopRecording}
        tooltipContent="Stop recording"
      />
    );
  }

  return (
    <ToolbarActionButton
      icon={<AudioLines size={16} className="text-blue-600" />}
      onClick={recordAudio}
      tooltipContent="Record audio to text"
    />
  );
}
