"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";

interface ToolbarActionButtonProps {
  icon: React.ReactNode;
  tooltipContent: string;
}

export default function ToolbarActionButton({
  icon,
  tooltipContent,
  ...props
}: ToolbarActionButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className="hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
          {...props}
        >
          {icon}
        </button>
      </TooltipTrigger>
      <TooltipContent>{tooltipContent}</TooltipContent>
    </Tooltip>
  );
}
