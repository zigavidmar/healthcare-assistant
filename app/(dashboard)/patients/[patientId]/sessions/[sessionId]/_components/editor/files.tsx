import useSessionEditor from "@/store/use-session-editor";
import { AudioLines, Paperclip, X } from "lucide-react";
import React from "react";

export default function EditorFiles() {
  const { files } = useSessionEditor();

  if (!files || files.length === 0) {
    return null;
  }

  return (
    <div className="flex gap-2 mb-4">
      {files.map((file) => (
        <File key={file.lastModified} file={file} />
      ))}
    </div>
  );
}

function File({ file }: { file: File }) {
  const { files, setFiles } = useSessionEditor();

  function handleRemove() {
    setFiles(files.filter((f) => f.lastModified !== file.lastModified));
  }
  return (
    <div className="flex items-center gap-2 bg-gray-100 rounded-md p-2">
      <AudioFileIcon contentType={file.type} />
      <span className="text-primary text-sm">{file.name}</span>
      <button type="button" className="text-paragraph" onClick={handleRemove}>
        <X size={14} />
      </button>
    </div>
  );
}

function AudioFileIcon({ contentType }: { contentType: string }) {
  switch (contentType) {
    case "audio/webm":
      return <AudioLines size={16} className="text-gray-500" />;
    default:
      return <Paperclip size={16} className="text-gray-500" />;
  }
}
