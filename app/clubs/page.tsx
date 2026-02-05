import db from "@/db";
import { clubs } from "@/db/schema";

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function ClubsPage() {
  const allClubs = await db.select().from(clubs).orderBy(clubs.createdAt);

  return (
    <main className="min-h-screen bg-[#0c0c0c] text-[#e8e8e8] selection:bg-[#ff5f1f] selection:text-black">
      <div className="relative mx-auto max-w-6xl px-8 py-16 md:py-24">
        {/* Header */}
        <header className="mb-20">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-xs tracking-widest text-[#666] uppercase">
              Directory
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-[#333] to-transparent" />
          </div>
          <h1 className="mt-6 font-mono text-6xl font-light tracking-tight md:text-8xl">
            Clubs
            <span className="ml-4 inline-block text-[#ff5f1f]">.</span>
          </h1>
          <p className="mt-4 max-w-md font-mono text-sm text-[#666] leading-relaxed">
            {allClubs.length} registered{" "}
            {allClubs.length === 1 ? "club" : "clubs"}
          </p>
        </header>

        {/* Content */}
        {allClubs.length === 0 ? (
          <div className="relative border border-[#222] bg-[#111] p-12 md:p-20">
            <div className="absolute -top-3 left-8 bg-[#0c0c0c] px-3 font-mono text-xs tracking-widest text-[#444] uppercase">
              Status
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-8 flex h-20 w-20 items-center justify-center border border-dashed border-[#333]">
                <svg
                  className="h-8 w-8 text-[#444]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h2 className="font-mono text-2xl font-light tracking-tight">
                No clubs yet
              </h2>
              <p className="mt-3 max-w-sm font-mono text-sm text-[#666] leading-relaxed">
                The directory is empty. Run the seed script to populate initial
                data.
              </p>
              <code className="mt-6 inline-block border border-[#333] bg-[#0a0a0a] px-4 py-2 font-mono text-xs text-[#888]">
                pnpm db:seed
              </code>
            </div>
          </div>
        ) : (
          <div className="space-y-0">
            {/* Table header */}
            <div className="grid grid-cols-12 gap-4 border-b border-[#222] pb-4 font-mono text-xs tracking-widest text-[#555] uppercase">
              <div className="col-span-1">#</div>
              <div className="col-span-4">Name</div>
              <div className="col-span-5">Email</div>
              <div className="col-span-2 text-right">Created</div>
            </div>

            {/* Club rows */}
            {allClubs.map((club, index) => (
              <div
                key={club.id}
                className="group grid grid-cols-12 gap-4 border-b border-[#1a1a1a] py-5 transition-all duration-300 hover:border-[#333] hover:bg-[#111]"
              >
                <div className="col-span-1 font-mono text-sm text-[#444] transition-colors group-hover:text-[#ff5f1f]">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="col-span-4">
                  <span className="font-mono text-base font-medium tracking-tight transition-colors group-hover:text-white">
                    {club.name}
                  </span>
                </div>
                <div className="col-span-5">
                  <span className="font-mono text-sm text-[#888] transition-colors group-hover:text-[#aaa]">
                    {club.email}
                  </span>
                </div>
                <div className="col-span-2 text-right">
                  <span className="font-mono text-xs text-[#555] transition-colors group-hover:text-[#777]">
                    {formatDate(club.createdAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
