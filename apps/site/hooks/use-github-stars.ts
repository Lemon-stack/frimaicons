"use client";

import { useEffect, useState } from "react";
import { REPO_API_URL } from "@/lib/site";

const compact = new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 });

/** Live star count from the GitHub API; null until it loads or if the request fails. */
export function useGithubStars() {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(REPO_API_URL, { signal: controller.signal, headers: { Accept: "application/vnd.github+json" } })
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub API responded ${res.status}`);
        return res.json() as Promise<{ stargazers_count: number }>;
      })
      .then((repo) => setStars(repo.stargazers_count))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        console.error("Could not load GitHub stars", error);
      });
    return () => controller.abort();
  }, []);

  return stars === null ? null : compact.format(stars);
}
