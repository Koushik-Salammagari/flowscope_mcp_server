# FlowScope MCP Server

A Model Context Protocol (MCP) server for FlowScope integration with Claude Desktop.

## Overview

This is a minimal MCP server that provides FlowScope integration capabilities to Claude Desktop. The server implements the basic MCP protocol and can be configured to work with Claude Desktop's MCP integration.

## Features

- ✅ MCP Protocol Implementation
- ✅ Claude Desktop Integration
- ✅ Basic FlowScope Tool Definitions
- ✅ Minimal, Stable Server

## Installation

1. Clone this repository:
```bash
git clone <your-repo-url>
cd flowscope-project
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
node simple-mcp-server.js
```

## Claude Desktop Configuration

Add this configuration to your Claude Desktop settings:

```json
{
  "mcpServers": {
    "flowscope": {
      "command": "node",
      "args": ["/path/to/flowscope-project/simple-mcp-server.js"],
      "env": {}
    }
  }
}
```

## Server Status

The server provides:
- **Connection**: Stable MCP protocol connection
- **Capabilities**: Tools, Resources, and Prompts support
- **Tools**: Basic FlowScope tool definitions

## Development

The server is built using:
- Node.js
- @modelcontextprotocol/sdk
- ES Modules

## Troubleshooting

If Claude Desktop shows the server as "Disabled":
1. Ensure the server is running
2. Check the configuration path
3. Restart Claude Desktop completely
4. Verify the server responds to initialize requests

