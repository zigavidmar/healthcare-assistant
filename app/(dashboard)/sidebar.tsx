import { Home } from "lucide-react";
import Link, { type LinkProps } from "next/link";
import React from "react";

export default function Sidebar() {
  return (
    <nav className="flex flex-col justify-between w-full border-r border-gray-100 py-5 px-2">
      <div className="flex flex-col items-center gap-10">
        <img className="h-6" src="/corti-logo-icon.svg" alt="Corti AI" />
        <ul>
          <li>
            <SidebarLink href="/">
              <Home size={20} />
            </SidebarLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function SidebarLink({
  children,
  ...props
}: {
  children: React.ReactNode;
} & LinkProps) {
  return (
    <Link
      className="rounded-sm hover:bg-light w-8 h-8 cursor-pointer transition-colors flex items-center justify-center"
      {...props}
    >
      {children}
    </Link>
  );
}
