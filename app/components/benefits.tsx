export function Benefits() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Why choose our timesheet tool
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Designed to save you time and reduce administrative burden
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {/* Benefit 1 */}
            <div className="flex flex-col items-center space-y-2">
              <div className="p-2 bg-blue-100 rounded-full">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Save time</h3>
              <p className="text-gray-500 dark:text-gray-400 text-center">
                Reduce timesheet completion from hours to minutes with our AI-powered system.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="flex flex-col items-center space-y-2">
              <div className="p-2 bg-blue-100 rounded-full">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Improve accuracy</h3>
              <p className="text-gray-500 dark:text-gray-400 text-center">
                Eliminate human error and ensure your time tracking is precise and consistent.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="flex flex-col items-center space-y-2">
              <div className="p-2 bg-blue-100 rounded-full">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Better insights</h3>
              <p className="text-gray-500 dark:text-gray-400 text-center">
                Gain valuable insights into how time is spent across projects and teams.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
