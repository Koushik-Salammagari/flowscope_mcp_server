# FlowScope MCP Server

A Model Context Protocol (MCP) server that provides page-to-page flow analysis for web applications. This server can be connected to Claude Desktop to enable AI-powered analysis of your application's navigation structure.

## Features

- **Flow Analysis**: Parse and analyze page-to-page navigation structure
- **Security Audit**: Identify authentication and authorization patterns
- **Orphaned Page Detection**: Find pages not connected to main navigation
- **Architecture Recommendations**: Get suggestions for improving app structure
- **Real-time Updates**: File watcher invalidates cache when code changes

## Installation

```bash
cd mcp-server
npm install
npm run build
```

## Claude Desktop Configuration

Add this to your Claude Desktop configuration file:

### macOS
Edit `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "flowscope": {
      "command": "node",
      "args": ["/path/to/your/project/mcp-server/dist/index.js"],
      "env": {}
    }
  }
}
```

### Windows
Edit `%APPDATA%/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "flowscope": {
      "command": "node",
      "args": ["C:\\path\\to\\your\\project\\mcp-server\\dist\\index.js"],
      "env": {}
    }
  }
}
```

## Usage in Claude Desktop

Once configured, you can use these tools in Claude Desktop:

### 1. Analyze Flow
```
Can you analyze the page flow structure of my application?
```

### 2. Get Flow Summary
```
Show me a detailed summary of my application's page structure.
```

### 3. Find Orphaned Pages
```
Are there any pages in my app that aren't connected to the main navigation?
```

### 4. Security Analysis
```
Analyze the authentication and authorization flow in my application.
```

### 5. Get Improvements
```
What improvements can I make to my application's flow structure?
```

## Available Tools

| Tool | Description |
|------|-------------|
| `analyze_flow` | Analyze the page-to-page flow structure |
| `get_flow_summary` | Get detailed summary of application structure |
| `find_orphaned_pages` | Find unconnected pages |
| `analyze_security_flow` | Analyze auth/security patterns |
| `suggest_improvements` | Get architecture recommendations |

## Supported Frameworks

- React (Create React App, Vite)
- Next.js (Pages Router & App Router)
- Vue.js with Vue Router
- Generic TypeScript/JavaScript projects

## File Structure Analysis

The server analyzes:
- Page components in `src/pages/`, `pages/`, `app/`
- Route definitions and navigation
- Authentication patterns
- Layout usage
- API route structure

## Development

```bash
# Watch mode for development
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Troubleshooting

1. **Server not connecting**: Check that the path in Claude Desktop config is correct
2. **No analysis results**: Ensure your project has recognizable page structure
3. **Permission errors**: Make sure Claude Desktop has access to your project directory

## Example Output

```markdown
# FlowScope Analysis Complete

## Project Structure
- Total Pages: 8
- Protected Pages: 3
- Public Pages: 5
- API Routes: 2
- Orphaned Pages: 1

## Key Findings
- Found 1 orphaned pages that may not be reachable through navigation
- Consider adding authentication to protect sensitive pages
- Many pages lack layout definitions. Consider implementing consistent layouts

## Flow Graph
The analysis found 8 nodes and 6 connections in your application flow.
```