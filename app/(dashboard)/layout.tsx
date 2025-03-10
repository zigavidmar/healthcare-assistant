import Sidebar from "./sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen justify-between grid grid-cols-[60px_1fr]">
      <Sidebar />
      <main className="bg-background h-screen">{children}</main>
    </div>
  );
}
