import React from "react";

interface HeaderProps {
  type?: "auth" | "default";
}

export default function Header({ type = "default" }: HeaderProps) {
  if (type === "auth") {
    return (
      <header className="p-5 pt-0 flex items-center justify-center w-full">
        <img className="h-7" src="/corti-logo.svg" alt="Corti AI" />
      </header>
    );
  }

  return (
    <header className="p-5 flex items-center justify-between w-full">
      <img className="h-7" src="/corti-logo.svg" alt="Corti AI" />
    </header>
  );
}
