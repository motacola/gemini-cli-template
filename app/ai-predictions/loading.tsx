import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-5 w-full max-w-[450px]" />
      </div>

      <div className="space-y-4">
        <Skeleton className="h-[500px] w-full" />
      </div>
    </div>
  )
}
