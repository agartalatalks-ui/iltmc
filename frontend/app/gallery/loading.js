export default function GalleryLoading() {
  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="h-16 w-64 bg-zinc-800 rounded animate-pulse mx-auto mb-12" />
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="break-inside-avoid bg-zinc-800 rounded-lg animate-pulse"
              style={{ height: `${180 + (i % 3) * 60}px` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
