import { Skeleton } from "@/components/ui/skeleton"

export default function ClientsLoading() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Clients</h1>
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="flex items-center space-x-2">
        <Skeleton className="h-10 w-full max-w-md" />
        <Skeleton className="h-10 w-24" />
      </div>

      <div className="grid gap-6">
        {Array(5)
          .fill(null)
          .map((_, i) => (
            <div key={i} className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-72" />
                </div>
                <div className="flex space-x-2">
                  <Skeleton className="h-9 w-9 rounded-md" />
                  <Skeleton className="h-9 w-9 rounded-md" />
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-28 hidden sm:block" />
                <Skeleton className="h-4 w-20 hidden md:block" />
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
