import PacientInformation from "./_components/pacient-information";

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ patientId: string }>;
  children: React.ReactNode;
}) {
  const { patientId } = await params;

  return (
    <div className="flex">
      <div className="max-w-[1000px] w-full mx-auto py-5 gap-10 flex flex-col px-5">
        <PacientInformation patientId={patientId} />
      </div>
      {children}
    </div>
  );
}
