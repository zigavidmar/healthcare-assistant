import { Skeleton } from "@/components/ui/skeleton";

export function PatientSearchCardLoading() {
  return (
    <div className="flex flex-col transition-colors text-left p-4 border border-border-primary rounded-sm bg-secondary hover:bg-primary/5 gap-5">
      <div className="flex items-center gap-3 w-full">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex flex-col gap-3 w-full">
          <Skeleton className="w-full h-5" />
          <div className="flex flex-wrap items-center gap-x-3 text-sm text-paragraph">
            <Skeleton className="w-20 h-3" />
            <Skeleton className="w-14 h-3" />
            <Skeleton className="w-20 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
}
