"use client";

import { useColorMode } from "@/hooks/use-color-mode";
import { useIconSearch } from "@/hooks/use-icon-search";
import { ColorToggle } from "./color-toggle";
import { IconGrid } from "./icon-grid";
import { SearchBar } from "./search-bar";
import { SectorFilter } from "./sector-filter";

export function IconBrowser() {
  const { query, setQuery, sector, setSector, results, sectorCounts, total } = useIconSearch();
  const { mode, toggle, iconColor } = useColorMode();

  return (
    <section className="space-y-4">
      <div className="flex gap-2">
        <SearchBar value={query} onChange={setQuery} placeholder={`Search ${total} icons…`} />
        <ColorToggle mode={mode} onToggle={toggle} />
      </div>
      <SectorFilter value={sector} onChange={setSector} options={sectorCounts} total={total} />
      {results.length > 0 ? (
        <IconGrid icons={results} color={iconColor} />
      ) : (
        <p className="py-16 text-center text-muted">No logos match &ldquo;{query}&rdquo; yet.</p>
      )}
    </section>
  );
}
