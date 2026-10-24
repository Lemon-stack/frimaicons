"use client";

import { useColorMode } from "@/hooks/use-color-mode";
import { useIconDialog } from "@/hooks/use-icon-dialog";
import { useIconSearch } from "@/hooks/use-icon-search";
import { useSearchShortcut } from "@/hooks/use-search-shortcut";
import { SECTOR_LABELS } from "@/lib/labels";
import { BrandPanel } from "./brand-panel";
import { BrowseSidebar } from "./browse-sidebar";
import { IconDialog } from "./icon-dialog";
import { IconGrid } from "./icon-grid";
import { SearchBar } from "./search-bar";
import { SectorFilter } from "./sector-filter";
import { SortMenu } from "./sort-menu";
import { StyleFilter } from "./style-filter";
import { TopBar } from "./top-bar";

export function IconBrowser() {
  const search = useIconSearch();
  const { mode, setMode, iconColor } = useColorMode();
  const dialog = useIconDialog();
  const { ref: searchRef, label: shortcutLabel } = useSearchShortcut();
  const { query, sector, setSector, results, total } = search;

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-3 p-3 sm:p-4 lg:h-dvh lg:grid-cols-[264px_minmax(0,1fr)] lg:grid-rows-[auto_minmax(0,1fr)]">
      <BrandPanel />

      <TopBar>
        <SearchBar
          ref={searchRef}
          value={query}
          onChange={search.setQuery}
          placeholder={`Search ${total} logos...`}
          shortcut={shortcutLabel}
        />
        <SortMenu value={search.sort} onChange={search.setSort} />
        <StyleFilter value={mode} onChange={setMode} />
      </TopBar>

      <BrowseSidebar total={total} sector={sector} onSectorChange={setSector} sectorCounts={search.sectorCounts} />

      <main className="min-h-0 space-y-4 rounded-2xl bg-panel p-3 sm:p-4 lg:overflow-y-auto">
        <SectorFilter value={sector} onChange={setSector} options={search.sectorCounts} total={total} />
        <h1 className="flex items-baseline gap-2 px-1 text-sm">
          <span className="font-medium">{sector ? SECTOR_LABELS[sector] : "All logos"}</span>
          <span className="text-muted-foreground tabular-nums">{results.length}</span>
        </h1>
        {results.length > 0 ? (
          <IconGrid icons={results} color={iconColor} onSelect={dialog.show} />
        ) : (
          <p className="py-16 text-center text-muted-foreground">No logos match{query && <> &ldquo;{query}&rdquo;</>} yet.</p>
        )}
      </main>

      <IconDialog icon={dialog.icon} open={dialog.open} onOpenChange={dialog.onOpenChange} colorMode={mode} />
    </div>
  );
}
