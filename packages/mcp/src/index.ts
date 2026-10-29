import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createServer } from "./server";

createServer()
  .connect(new StdioServerTransport())
  .catch((error) => {
    console.error("frimaicons MCP server failed to start:", error);
    process.exit(1);
  });
