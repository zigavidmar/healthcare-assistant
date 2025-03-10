import Disclaimer from "@/components/disclaimer";
import Header from "@/components/header";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen h-full flex flex-col gap-5 justify-between py-5">
      <Header type="auth" />
      <main>{children}</main>;
      <Disclaimer />
    </div>
  );
}
