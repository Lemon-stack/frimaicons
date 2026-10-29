import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { beforeAll, describe, expect, it } from "vitest";
import { createServer } from "./server";

const client = new Client({ name: "test", version: "0.0.0" });

beforeAll(async () => {
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  await Promise.all([createServer().connect(serverTransport), client.connect(clientTransport)]);
});

function parse(result: Awaited<ReturnType<typeof client.callTool>>) {
  const [first] = result.content as { type: string; text: string }[];
  return JSON.parse(first!.text);
}

describe("frimaicons MCP server", () => {
  it("lists the four tools", async () => {
    const { tools } = await client.listTools();
    expect(tools.map((t) => t.name).sort()).toEqual(["get_icon", "list_sectors", "request_logo", "search_icons"]);
  });

  it("answers search_icons", async () => {
    const data = parse(await client.callTool({ name: "search_icons", arguments: { query: "flutterwave" } }));
    expect(data.results[0].slug).toBe("flutterwave");
  });

  it("flags unknown icons as errors", async () => {
    const result = await client.callTool({ name: "get_icon", arguments: { slug: "nope-not-real" } });
    expect(result.isError).toBe(true);
  });

  it("rejects invalid sectors", async () => {
    const result = await client.callTool({ name: "search_icons", arguments: { sector: "space" } });
    expect(result.isError).toBe(true);
  });
});
