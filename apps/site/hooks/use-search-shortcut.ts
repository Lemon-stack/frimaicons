"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

function isTyping(target: EventTarget | null) {
  return target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName));
}

function isModK(e: KeyboardEvent) {
  return (e.metaKey || e.ctrlKey) && !e.altKey && e.key.toLowerCase() === "k";
}

function isSlash(e: KeyboardEvent) {
  return e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey && !isTyping(e.target);
}

const subscribe = () => () => {};
const isApple = () => /Mac|iPhone|iPad/.test(navigator.platform);

/** Focuses the returned input ref on ⌘K / Ctrl+K, or "/" outside a text field. */
export function useSearchShortcut() {
  const ref = useRef<HTMLInputElement>(null);
  // Server render has no platform, so it shows the Ctrl form until hydration.
  const label = useSyncExternalStore(subscribe, () => (isApple() ? "⌘K" : "Ctrl K"), () => "Ctrl K");

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!isModK(e) && !isSlash(e)) return;
      e.preventDefault();
      ref.current?.focus();
      ref.current?.select();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return { ref, label };
}
