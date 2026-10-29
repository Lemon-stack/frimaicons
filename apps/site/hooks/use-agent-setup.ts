"use client";

import { useState } from "react";
import { MCP_AGENTS } from "@/lib/mcp-agents";

export function useAgentSetup() {
  const [agentId, setAgentId] = useState(MCP_AGENTS[0].id);
  const agent = MCP_AGENTS.find(({ id }) => id === agentId) ?? MCP_AGENTS[0];

  return { agent, agentId, setAgentId };
}
