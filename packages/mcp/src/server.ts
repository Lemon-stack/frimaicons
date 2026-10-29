import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { SECTORS } from "@frimaicons/core";
import { z } from "zod";
import pkg from "../package.json";
import { getLogo, listSectors, requestLogo, searchLogos } from "./tools";

const readOnly = { readOnlyHint: true, openWorldHint: false };
const sector = z.enum(SECTORS);

function json(data: unknown, isError = false): CallToolResult {
  return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }], ...(isError && { isError }) };
}

export function createServer() {
  const server = new McpServer({ name: "frimaicons", version: pkg.version });

  server.registerTool(
    "search_icons",
    {
      title: "Search logos",
      description:
        "Search frimaicons company logos by name and/or sector. Returns slug, title, brand hex, sector and the @frimaicons/react component name. Omit the query to list a whole sector.",
      inputSchema: {
        query: z.string().optional().describe("Brand name, e.g. 'paystack' or 'mercado pago'"),
        sector: sector.optional().describe("Only return logos from this sector"),
        limit: z.number().int().min(1).max(200).optional().describe("Max results, default 20"),
      },
      annotations: readOnly,
    },
    async (args) => json(searchLogos(args)),
  );

  server.registerTool(
    "get_icon",
    {
      title: "Get logo",
      description:
        "Get one logo by slug: ready-to-use SVG markup, the raw 24x24 path, a @frimaicons/react snippet, brand hex and the logo source.",
      inputSchema: {
        slug: z.string().describe("Icon slug from search_icons, e.g. 'stripe'"),
        color: z
          .enum(["currentColor", "brand"])
          .optional()
          .describe("'brand' fills with the company's color; default 'currentColor' inherits text color"),
      },
      annotations: readOnly,
    },
    async (args) => {
      const result = getLogo(args);
      return json(result, !result.found);
    },
  );

  server.registerTool(
    "list_sectors",
    {
      title: "List sectors",
      description: "List logo sectors with how many logos each has and a few examples.",
      annotations: readOnly,
    },
    async () => json(listSectors()),
  );

  server.registerTool(
    "request_logo",
    {
      title: "Request a logo",
      description:
        "Check whether a company logo exists, is already planned, or is missing. For missing logos returns a prefilled GitHub issue link for the user to open; it does not file anything itself.",
      inputSchema: {
        company: z.string().describe("Company name"),
        website: z.string().url().optional().describe("Company website"),
        sector: sector.optional(),
      },
      annotations: readOnly,
    },
    async (args) => json(requestLogo(args)),
  );

  return server;
}
