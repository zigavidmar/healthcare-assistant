import { create } from "zustand";

interface SessionEditorStore {
  value: string;
  setValue: (value: string) => void;
  voiceRecording: {
    isRecording?: boolean;
    isTranscribing?: boolean;
    blob?: Blob | null;
    analyser?: AnalyserNode | null;
  };
  setVoiceRecording: (voiceRecording: {
    isRecording?: boolean;
    isTranscribing?: boolean;
    analyser?: AnalyserNode | null;
  }) => void;
  files: File[];
  setFiles: (files: File[]) => void;
}

const useSessionEditor = create<SessionEditorStore>((set) => ({
  value: "",
  setValue: (value) => set({ value }),
  voiceRecording: {
    isRecording: false,
    isTranscribing: false,
    analyser: null,
  },
  setVoiceRecording: (updates) =>
    set((state) => ({
      voiceRecording: {
        ...state.voiceRecording,
        ...updates,
      },
    })),
  files: [],
  setFiles: (files) => set({ files }),
}));

export default useSessionEditor;
