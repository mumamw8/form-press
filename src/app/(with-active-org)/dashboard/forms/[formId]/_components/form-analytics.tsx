export const FormAnalytics = () => {
  return (
    <div className="h-full flex flex-col py-4 gap-2">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-muted/50 p-4">
          <h2 className="text-gray-400">Views</h2>
          <p className="font-semibold">1000</p>
        </div>
        <div className="rounded-xl bg-muted/50 p-4">
          <h2 className="text-gray-400">Submissions</h2>
          <p className="font-semibold">1000</p>
        </div>
        <div className="rounded-xl bg-muted/50 p-4">
          <h2 className="text-gray-400">Submission Rate</h2>
          <p className="font-semibold">100%</p>
        </div>
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </div>
  )
}
