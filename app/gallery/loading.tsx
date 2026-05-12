export default function GalleryLoading() {
  return (
    <div className="min-h-dvh bg-stellar-black pb-24 pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-3 w-28 animate-pulse rounded-full bg-stellar-blue/30" />
        <div className="mt-4 h-12 w-2/3 max-w-md animate-pulse rounded-lg bg-white/10" />
        <div className="mt-4 h-4 w-full max-w-xl animate-pulse rounded bg-white/5" />
        <div className="mt-4 h-4 w-5/6 max-w-lg animate-pulse rounded bg-white/5" />
        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-white/5 bg-stellar-surface/40 ring-1 ring-stellar-blue/10"
            >
              <div className="aspect-[3/4] animate-pulse bg-gradient-to-br from-zinc-800/80 to-stellar-blue/10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
