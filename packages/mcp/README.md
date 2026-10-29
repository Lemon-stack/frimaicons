# @frimaicons/mcp

[MCP](https://modelcontextprotocol.io) server for frimaicons. Lets Claude, Cursor and other AI assistants search company logos and drop in ready-to-use SVG or React code.

Runs locally over stdio. No API key, no network calls: the logo data ships inside the package.

## Setup

Claude Code:

```bash
claude mcp add frimaicons -- npx -y @frimaicons/mcp
```

Claude Desktop, Cursor, Windsurf and other clients take the same command in their MCP config:

```json
{
  "mcpServers": {
    "frimaicons": {
      "command": "npx",
      "args": ["-y", "@frimaicons/mcp"]
    }
  }
}
```

## Tools

| Tool | What it does |
| --- | --- |
| `search_icons` | Search by name and/or sector. Returns slug, title, brand hex, sector and React component name. |
| `get_icon` | One logo by slug: SVG markup (`currentColor` or brand color), raw 24×24 path, `@frimaicons/react` snippet, source. |
| `list_sectors` | Sectors with logo counts and examples. |
| `request_logo` | Says whether a logo exists, is planned, or is missing. For missing ones, returns a prefilled GitHub issue link. It never files anything itself. |

Try asking: _"Add Paystack and Flutterwave logos to the payment options, in brand colors."_

## Legal

The code is MIT licensed. Every logo is a trademark of its owner. Use logos according to each brand's guidelines. Brand owners can request removal at [github.com/Lemon-stack/frimaicons/issues](https://github.com/Lemon-stack/frimaicons/issues).
