---
title: "What is MCP? The Protocol That's Fixing How AI Connects to Your Tools"
description: "Learn what the Model Context Protocol (MCP) is, why it exists, how its client-server architecture works, and how to build your own MCP server step by step."
category: AI
published: true
createdAt: 2026-08-02T09:00:00.000Z
image: /assets/what-is-mcp-cover.svg
author: Devanshu Patil
authorTitle: Software Developer
readingTime: 9 min read
tags: ['ai', 'mcp', 'llm']
proficiency: Beginner
---

Say you're building an AI assistant. You want it to read files on disk, query your database, check GitHub issues, and search Slack. So you write custom integration code for each one — a file-reading tool for your LLM SDK, a database tool, a GitHub tool, a Slack tool.

Now switch to a different AI provider, or add a second assistant that also needs those same capabilities. You write it all again. Every AI app talking to every tool needs its own custom glue code. Ten tools and five apps isn't fifteen integrations — it's fifty.

That's the exact problem **MCP** (Model Context Protocol) was built to solve.

> **TL;DR** — MCP is an open protocol (from Anthropic, late 2024) that lets any AI application plug into any tool through one shared standard, instead of a custom integration per app-tool pair. It defines three roles — **host** (the AI app), **client** (the connector inside it), **server** (the thing exposing a tool or data) — and three primitives a server can expose: **tools** (actions), **resources** (data), **prompts** (templates). Result: connecting *M* apps to *N* tools needs *M + N* pieces instead of *M × N*.

---

## What is MCP?

MCP is an open protocol, introduced by Anthropic in late 2024, that standardizes how AI applications connect to external tools, data sources, and systems. Instead of writing a custom integration for every AI-app-to-tool pairing, you write one MCP server for a tool, and any MCP-compatible AI application can use it — no matter which model powers that application.

The comparison people reach for is **USB-C**. Before USB-C, every device needed its own cable and port. USB-C didn't make devices smarter — it made them universally pluggable. MCP does the same thing for AI: it doesn't make a model smarter, it makes tools and data sources universally pluggable into whatever is running that model.

This turns an **M × N problem into an M + N problem**. Without a standard, connecting M AI applications to N tools needs M × N custom integrations. With MCP, each tool builds one server (N), each application builds one client (M), and they all interoperate.

---

## The Architecture: Hosts, Clients, Servers

MCP defines three roles. If you only remember one table from this post, make it this one:

| Role | What it is | Example |
|---|---|---|
| **Host** | The AI application the user interacts with | Claude Desktop, Claude Code, your own agent |
| **Client** | Lives inside the host, manages one connection to one server | Built into the host application |
| **Server** | Exposes capabilities (tools, data, prompts) over the protocol | A GitHub server, a database server, a filesystem server |

```
Host application (Claude Desktop, Claude Code, your agent)
   │
   ├── MCP Client ──► MCP Server (GitHub)     — issues, PRs, repos
   ├── MCP Client ──► MCP Server (Postgres)   — query your database
   └── MCP Client ──► MCP Server (filesystem) — read/write local files
```

A host can connect to many servers at once. Each client-server pair is a 1:1 connection, and the host coordinates across all of them — deciding which server to call based on what the user (or the model) is trying to do.

Communication happens over JSON-RPC 2.0, transported either over **stdio** (the server runs as a local subprocess — simplest for local tools) or **Streamable HTTP** (the server runs remotely, like the hosted GitHub or Linear MCP servers you'd connect to from Claude).

---

## The Three Core Primitives

An MCP server exposes its capabilities through three types of primitives:

**Tools** — actions the model can invoke, with typed inputs and outputs. This is the one you'll use most: `create_issue`, `run_query`, `send_message`. The model decides when to call a tool based on its description, the same way function calling works in a standard LLM API.

**Resources** — data the host can read and feed into context, like files, database records, or API responses. Think of these as read-only context the application can pull in, rather than actions the model actively invokes.

**Prompts** — reusable, parameterized prompt templates the server provides, so common workflows don't need to be re-typed by every user of that server.

Most servers you'll encounter — GitHub, Linear, Slack — lean almost entirely on tools. Resources and prompts exist for cases where a server wants to hand over structured context or ready-made workflows.

---

## Building a Minimal MCP Server

Theory is easy to nod along to and forget. Here's the smallest possible MCP server — a single tool that looks up the weather for a city — using the official `@modelcontextprotocol/sdk` over stdio, so you can see exactly what "exposing a tool" looks like in real code.

```bash
npm install @modelcontextprotocol/sdk zod
```

```ts
// weather-server.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "weather-server",
  version: "1.0.0",
});

server.registerTool(
  "get_weather",
  {
    title: "Get Weather",
    description: "Get the current weather for a city.",
    inputSchema: { city: z.string().describe("City name, e.g. 'London'") },
  },
  async ({ city }) => {
    // In a real server this would call a weather API.
    const tempC = 18;
    return {
      content: [
        { type: "text", text: `${city}: ${tempC}°C, partly cloudy.` },
      ],
    };
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);
```

That's the whole server. It declares one tool, describes what it does and what input it expects, and returns a text result when called. Any MCP host — Claude Desktop, Claude Code, a custom agent — can now use `get_weather` without any code specific to that host.

### Connecting it to Claude Desktop

Point the host at your server by adding it to Claude Desktop's config file:

```json
{
  "mcpServers": {
    "weather": {
      "command": "node",
      "args": ["/absolute/path/to/weather-server.js"]
    }
  }
}
```

Restart Claude Desktop, and it launches your server as a subprocess, discovers the `get_weather` tool automatically, and can call it whenever a conversation calls for weather info — no further integration code required.

### Using a remote MCP server from the Claude API

You don't have to write a server yourself — hosted MCP servers already exist for tools like GitHub, Linear, and Notion. From the Claude API, you connect to one with the MCP connector:

```python
response = client.beta.messages.create(
    model="claude-opus-4-8",
    max_tokens=1024,
    betas=["mcp-client-2025-11-20"],
    mcp_servers=[
        {"type": "url", "url": "https://api.githubcopilot.com/mcp/", "name": "github"}
    ],
    tools=[{"type": "mcp_toolset", "mcp_server_name": "github"}],
    messages=[{"role": "user", "content": "List open issues in my repo"}],
)
```

Anthropic handles the connection server-side — you just declare the server and let Claude decide when to call its tools.

---

## How MCP Helps

**One integration, many hosts.** Build a server once — for your internal database, your ticketing system, your CI pipeline — and every MCP-compatible AI tool your team uses can call it, without you writing separate glue code for each one.

**Decouples tools from models.** Your GitHub server doesn't care whether it's talking to Claude, or some other MCP-compatible client. Swap the underlying model without touching your integrations.

**Standardized discovery.** Hosts can query a server for its available tools at connection time, so the model always knows exactly what's callable and with what inputs — no manually maintained tool lists that drift out of sync with reality.

**A real ecosystem, not a one-off SDK feature.** Because MCP is an open spec, not an Anthropic-only feature, servers exist for hundreds of tools already — GitHub, Slack, Postgres, Puppeteer, Google Drive, and more — built by the community and by the tool vendors themselves.

---

## Where MCP Shows Up

- **Coding agents** — Claude Code uses MCP servers to reach GitHub, linters, test runners, and deployment tools without hardcoding any of it
- **Internal developer tools** — expose your company's internal APIs (deploy pipeline, feature flags, internal wiki) as one MCP server, usable from any AI tool your team adopts
- **Data-heavy assistants** — a Postgres or data-warehouse MCP server lets an assistant answer questions against live data instead of stale exports
- **Multi-tool agents** — an agent that needs to check Linear, post to Slack, and read a Notion doc in one workflow, without three bespoke SDKs bolted together

---

## Getting Started

1. **Try an existing server first.** Before building your own, check if a server already exists for the tool you need — GitHub, Slack, Postgres, and dozens of others are already public.
2. **Add it to your host.** In Claude Desktop or Claude Code, that's a few lines of config pointing at the server's command (local) or URL (remote).
3. **Build your own when you need to.** If you're exposing an internal system, start from the official SDK (`@modelcontextprotocol/sdk` for TypeScript, or the Python equivalent) — a minimal server, like the weather example above, is only a few dozen lines.

---

## Key Takeaways

- MCP is a **standard**, not a product — it turns an M × N integration mess into M + N.
- Three roles: **host** (the AI app), **client** (its connector), **server** (the tool/data provider).
- Three primitives a server exposes: **tools** (actions), **resources** (data), **prompts** (templates) — tools are what you'll use 90% of the time.
- Transport is either local (**stdio**, subprocess) or remote (**Streamable HTTP**).
- You rarely need to build a server from scratch — check the existing ecosystem (GitHub, Slack, Postgres, and more) before writing your own.

---

## The Bottom Line

MCP isn't a smarter model or a faster inference engine — it's plumbing. But plumbing is exactly what was missing. Before it, every AI application that wanted to use a tool had to build and maintain its own bespoke integration, and every tool that wanted to be usable from AI had to guess which SDKs to support.

If you're building anything that connects an AI assistant to real tools or real data — your own product, or an internal workflow — MCP is very likely the right layer to build that connection on, rather than another one-off integration you'll have to rewrite the next time you switch models.

I wrote this post while digging into MCP for my own understanding of how modern AI tooling is standardizing — I haven't shipped a production MCP server yet, but the natural next step for me is wiring a small one into an existing project (probably exposing MediFind's medicine database as an MCP server) to see the M + N model hold up in practice. If you're exploring the same thing, I'd genuinely like to compare notes.
