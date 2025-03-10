import Greeting from "./_components/greeting";
import { PatientSearch } from "./_components/patient-search";

export default function Home() {
  return (
    <div className="h-screen flex flex-col gap-10 justify-center items-center bg-background pb-14">
      <div className="max-w-[600px] w-full flex flex-col gap-10">
        <Greeting />
        <PatientSearch />
      </div>
    </div>
  );
}
