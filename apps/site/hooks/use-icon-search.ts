"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { icons, searchIcons, SECTORS, type Sector } from "frimaicons";

export function useIconSearch() {
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState<Sector | undefined>();
  const deferredQuery = useDeferredValue(query);

  const results = useMemo(() => searchIcons(icons, { query: deferredQuery, sector }), [deferredQuery, sector]);

  const sectorCounts = useMemo(
    () => SECTORS.map((s) => ({ sector: s, count: icons.filter((i) => i.sector === s).length })).filter((s) => s.count > 0),
    [],
  );

  return { query, setQuery, sector, setSector, results, sectorCounts, total: icons.length };
}
