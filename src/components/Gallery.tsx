// src/components/Gallery.tsx
import { useMemo, useState } from "react";
import type { MomentItem, MomentTag } from "../data/moments";

type FilterKey = "All" | "Pingxi" | "Chiang Mai" | "Hoi An" | "Sky Lantern" | "Water Lantern";

export default function Gallery({ items }: { items: MomentItem[] }) {
  const [filter, setFilter] = useState<FilterKey>("All");
  const [sortNewest, setSortNewest] = useState(true);

  const filtered = useMemo(() => {
    const base = filter === "All" ? items : items.filter(m => m.tags.includes(filter as MomentTag));
    return [...base].sort((a, b) => +new Date(sortNewest ? b.dateAdded : a.dateAdded) - +new Date(sortNewest ? a.dateAdded : b.dateAdded));
  }, [items, filter, sortNewest]);

  const tabs: FilterKey[] = ["All", "Pingxi", "Chiang Mai", "Hoi An", "Sky Lantern", "Water Lantern"];

  return (
    <div>
      {/* 필터/정렬 */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`rounded-full border px-3 py-1 text-sm
              ${filter === t ? "border-white/40 bg-white/10" : "border-white/15 bg-white/5 hover:bg-white/10"}`}
          >
            {t}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2 text-xs">
          <span className="text-white/60">Sort</span>
          <button
            onClick={() => setSortNewest(s => !s)}
            className="rounded border border-white/15 bg-white/5 px-2 py-1 hover:bg-white/10"
            aria-label="Toggle sort order"
          >
            {sortNewest ? "Newest" : "Oldest"}
          </button>
        </div>
      </div>

      {/* 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {filtered.map(m => (
          <figure key={m.id} className="aspect-[3/2] overflow-hidden rounded-xl border border-white/10 bg-white/5">
            <img
              src={m.src}
              alt={m.title ?? "lantern"}
              loading="lazy"
              className="h-full w-full object-cover transition-transform hover:scale-[1.02]"
            />
            <figcaption className="flex items-center justify-between p-2 text-[11px] text-white/70">
              <span className="truncate">{m.title ?? m.source}</span>
              <span className="shrink-0">{new Date(m.dateAdded).toISOString().slice(0,10)}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}