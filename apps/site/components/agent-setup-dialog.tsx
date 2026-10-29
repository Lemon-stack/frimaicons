"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useAgentSetup } from "@/hooks/use-agent-setup";
import { useAutoHeight } from "@/hooks/use-auto-height";
import { useCopy } from "@/hooks/use-copy";
import { getSetupText, MCP_AGENT_ICONS, MCP_AGENTS } from "@/lib/mcp-agents";
import { REPO_URL } from "@/lib/site";
import { AgentLogo } from "./agent-logo";
import { CopyButton } from "./copy-button";

export function AgentSetupDialog() {
  const { agent, agentId, setAgentId } = useAgentSetup();
  const { copy, copiedKey } = useCopy();
  const { ref: setupRef, height: setupHeight } = useAutoHeight<HTMLDivElement>();
  const { setup } = agent;
  const text = getSetupText(setup);

  return (
    <Dialog>
      <DialogTrigger className="group flex w-full flex-col gap-2 rounded-2xl bg-panel p-3 text-left outline-none hover:ring-2 hover:ring-primary focus-visible:ring-2 focus-visible:ring-primary">
        <AvatarGroup className="*:data-[slot=avatar]:ring-panel">
          {MCP_AGENT_ICONS.map((icon) => (
            <AgentLogo key={icon.slug} icon={icon} />
          ))}
          <AvatarGroupCount className="bg-tile ring-panel group-hover:text-foreground">
            <HugeiconsIcon icon={ArrowRight01Icon} className="transition-transform group-hover:translate-x-0.5" />
          </AvatarGroupCount>
        </AvatarGroup>
        <span className="text-[15px] font-medium">Use with AI assistants</span>
      </DialogTrigger>

      <DialogContent className="max-h-[calc(100dvh-2rem)] gap-4 overflow-y-auto p-4 text-sm sm:max-w-xl">
        <DialogHeader className="gap-1.5">
          <DialogTitle className="text-base">Use with AI assistants</DialogTitle>
          <DialogDescription className="text-sm">
            Add the frimaicons MCP server so your agent can search logos and write the SVG or React code.
          </DialogDescription>
        </DialogHeader>

        <ToggleGroup
          aria-label="Agent"
          spacing={2}
          value={[agentId]}
          onValueChange={([id]) => id && setAgentId(id)}
          className="grid w-full grid-cols-2 sm:grid-cols-3"
        >
          {MCP_AGENTS.map(({ id, name, icon }) => (
            <ToggleGroupItem
              key={id}
              value={id}
              className="h-10 justify-start gap-2 rounded-xl bg-tile px-2 text-sm text-muted-foreground aria-pressed:text-foreground aria-pressed:ring-2 aria-pressed:ring-primary"
            >
              <AgentLogo icon={icon} className="size-6" />
              <span className="truncate">{name}</span>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>

        <div
          style={{ height: setupHeight }}
          className="overflow-hidden transition-[height] duration-200 ease-out motion-reduce:transition-none"
        >
          <div ref={setupRef}>
            <div
              key={agentId}
              className="space-y-2 duration-200 animate-in fade-in-0 slide-in-from-bottom-1 motion-reduce:animate-none"
            >
              <p className="text-muted-foreground">
                {setup.kind === "command" ? (
                  "Run in your terminal:"
                ) : (
                  <>
                    Add to <code className="font-mono text-foreground">{setup.file}</code>:
                  </>
                )}
              </p>
              <div className="relative rounded-lg border border-border bg-background/60">
                <pre className="overflow-x-auto p-3 pr-12 font-mono text-[13px] leading-relaxed whitespace-pre-wrap wrap-anywhere">
                  <code>{text}</code>
                </pre>
                <div className="absolute top-1 right-1">
                  <CopyButton
                    label={`Copy ${agent.name} setup`}
                    copied={copiedKey === agentId}
                    onCopy={() => copy(agentId, text)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Using another client? Any MCP client works with <code className="font-mono">npx -y @frimaicons/mcp</code>.{" "}
          <a href={`${REPO_URL}/tree/main/packages/mcp#setup`} className="underline hover:text-foreground">
            Setup guide
          </a>
        </p>
      </DialogContent>
    </Dialog>
  );
}
