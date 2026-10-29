import { fiClaude, fiCursor, fiGitHubCopilot, fiGoogleGemini, fiOpenAI, type FrimaIcon } from "@frimaicons/core";

const PACKAGE = "@frimaicons/mcp";

const SERVER_CONFIG = { command: "npx", args: ["-y", PACKAGE] };

const MCP_SERVERS_JSON = JSON.stringify({ mcpServers: { frimaicons: SERVER_CONFIG } }, null, 2);

export type AgentSetup =
  | { kind: "command"; command: string }
  | { kind: "config"; file: string; config: string };

export interface McpAgent {
  id: string;
  name: string;
  icon: FrimaIcon;
  setup: AgentSetup;
}

export const MCP_AGENTS: McpAgent[] = [
  {
    id: "claude-code",
    name: "Claude Code",
    icon: fiClaude,
    setup: { kind: "command", command: `claude mcp add frimaicons -- npx -y ${PACKAGE}` },
  },
  {
    id: "cursor",
    name: "Cursor",
    icon: fiCursor,
    setup: { kind: "config", file: "~/.cursor/mcp.json", config: MCP_SERVERS_JSON },
  },
  {
    id: "vscode",
    name: "VS Code",
    icon: fiGitHubCopilot,
    setup: { kind: "command", command: `code --add-mcp '${JSON.stringify({ name: "frimaicons", ...SERVER_CONFIG })}'` },
  },
  {
    id: "codex",
    name: "Codex",
    icon: fiOpenAI,
    setup: { kind: "command", command: `codex mcp add frimaicons -- npx -y ${PACKAGE}` },
  },
  {
    id: "gemini-cli",
    name: "Gemini CLI",
    icon: fiGoogleGemini,
    setup: { kind: "command", command: `gemini mcp add frimaicons npx -y ${PACKAGE}` },
  },
  {
    id: "claude-desktop",
    name: "Claude Desktop",
    icon: fiClaude,
    setup: { kind: "config", file: "claude_desktop_config.json", config: MCP_SERVERS_JSON },
  },
];

/** One logo per brand, for the avatar stack. */
export const MCP_AGENT_ICONS = [...new Map(MCP_AGENTS.map(({ icon }) => [icon.slug, icon])).values()];

export function getSetupText(setup: AgentSetup) {
  return setup.kind === "command" ? setup.command : setup.config;
}
