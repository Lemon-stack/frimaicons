"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { icons, searchIcons, SECTORS, type Sector } from "@frimaicons/core";
import { sortIcons, type SortKey } from "@/lib/sort";

export function useIconSearch() {
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState<Sector | undefined>();
  const [sort, setSort] = useState<SortKey>("name");
  const deferredQuery = useDeferredValue(query);

  const results = useMemo(
    () => sortIcons(searchIcons(icons, { query: deferredQuery, sector }), sort),
    [deferredQuery, sector, sort],
  );

  const sectorCounts = useMemo(
    () =>
      SECTORS.map((key) => ({ key, count: icons.filter((i) => i.sector === key).length })).filter(
        (entry) => entry.count > 0,
      ),
    [],
  );

  return { query, setQuery, sector, setSector, sort, setSort, results, sectorCounts, total: icons.length };
}
