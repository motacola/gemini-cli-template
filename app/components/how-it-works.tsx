export function HowItWorks() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How it works</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Three simple steps to effortless time tracking
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {/* Step 1 */}
            <div className="flex flex-col items-center space-y-2 border p-6 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold">Tell us what you did</h3>
              <p className="text-gray-500 dark:text-gray-400 text-center">
                Type or speak what you worked on in plain language, just like you'd tell a colleague.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center space-y-2 border p-6 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold">AI does the work</h3>
              <p className="text-gray-500 dark:text-gray-400 text-center">
                Our AI identifies projects, tasks, and time spent, then organizes everything automatically.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center space-y-2 border p-6 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold">Review and submit</h3>
              <p className="text-gray-500 dark:text-gray-400 text-center">
                Quickly review the categorized time entries and submit your timesheet with one click.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
