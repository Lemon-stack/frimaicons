"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCopy } from "@/hooks/use-copy";
import type { getSnippets } from "@/lib/snippets";
import { CopyButton } from "./copy-button";

const TABS = [
  { value: "react", label: "React" },
  { value: "svg", label: "SVG" },
] as const;

export function CodeTabs({ snippets }: { snippets: ReturnType<typeof getSnippets> }) {
  const { copy, copiedKey } = useCopy();

  return (
    <Tabs defaultValue="react" className="gap-3">
      <TabsList className="h-9">
        {TABS.map(({ value, label }) => (
          <TabsTrigger key={value} value={value} className="px-4 text-sm">
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
      {TABS.map(({ value, label }) => (
        <TabsContent key={value} value={value}>
          <div className="relative rounded-lg border border-border bg-background/60">
            <pre className="max-h-48 overflow-auto p-4 pr-14 font-mono text-[13px] leading-relaxed break-all whitespace-pre-wrap">
              <code>{snippets[value]}</code>
            </pre>
            <div className="absolute top-2 right-2">
              <CopyButton label={`Copy ${label}`} copied={copiedKey === value} onCopy={() => copy(value, snippets[value])} />
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
