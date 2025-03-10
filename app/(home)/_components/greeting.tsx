"use client";

import { useUser } from "@/app/context/user-context";
import React from "react";

export default function Greeting() {
  const { user } = useUser();

  return (
    <div className="flex flex-col items-center justify-center">
      <img src="/corti-logo.svg" alt="Corti AI" className="w-20 h-20" />
      <h1 className="text-4xl font-bold text-center leading-12">
        Welcome back,
        <br /> <span className="text-tertiary">{user?.name || "Anon"}!</span>
      </h1>
      <p className="text-center mt-5 text-sm text-paragraph">
        Search for a patient to start documenting their case.
      </p>
    </div>
  );
}
