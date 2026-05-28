export function SkeletonPost() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 animate-pulse">
      {/* Back link */}
      <div className="h-4 w-20 bg-cream-border dark:bg-[#2a2a2a] rounded mb-8" />

      {/* Header */}
      <div className="mb-10">
        <div className="flex gap-2 mb-3">
          <div className="h-5 w-20 bg-cream-border dark:bg-[#2a2a2a] rounded-full" />
          <div className="h-5 w-16 bg-cream-border dark:bg-[#2a2a2a] rounded-full" />
        </div>
        <div className="h-10 w-3/4 bg-cream-border dark:bg-[#2a2a2a] rounded mb-3" />
        <div className="h-6 w-full bg-cream-border dark:bg-[#2a2a2a] rounded mb-2" />
        <div className="h-6 w-2/3 bg-cream-border dark:bg-[#2a2a2a] rounded mb-4" />
        <div className="h-4 w-40 bg-cream-border dark:bg-[#2a2a2a] rounded" />
      </div>

      {/* Content lines */}
      <div className="space-y-3">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="h-4 bg-cream-border dark:bg-[#2a2a2a] rounded"
            style={{ width: `${70 + Math.random() * 30}%` }}
          />
        ))}
        <div className="h-24 w-full bg-cream-border dark:bg-[#2a2a2a] rounded mt-6" />
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`b-${i}`}
            className="h-4 bg-cream-border dark:bg-[#2a2a2a] rounded"
            style={{ width: `${60 + Math.random() * 40}%` }}
          />
        ))}
      </div>
    </main>
  )
}
