# Claude Desktop MCP Setup Instructions

## Step 1: Build the MCP Server

First, build the MCP server in your project:

```bash
cd mcp-server
npm install
npm run build
```

## Step 2: Find Your Project Path

You need to replace `/home/project/mcp-server/dist/index.js` with your actual project path.

### To find your current project path:

**On macOS/Linux:**
```bash
pwd
```

**On Windows:**
```cmd
cd
```

This will show you the full path to your current directory.

## Step 3: Configure Claude Desktop

### macOS Configuration

1. Open Terminal and edit the config file:
```bash
nano ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

2. Add this configuration (replace `YOUR_PROJECT_PATH` with your actual path):
```json
{
  "mcpServers": {
    "flowscope": {
      "command": "node",
      "args": ["YOUR_PROJECT_PATH/mcp-server/dist/index.js"],
      "env": {}
    }
  }
}
```

**Example for macOS:**
```json
{
  "mcpServers": {
    "flowscope": {
      "command": "node",
      "args": ["/Users/yourname/Documents/flowscope-project/mcp-server/dist/index.js"],
      "env": {}
    }
  }
}
```

### Windows Configuration

1. Open Command Prompt or PowerShell and edit:
```cmd
notepad %APPDATA%\Claude\claude_desktop_config.json
```

2. Add this configuration:
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

**Example for Windows:**
```json
{
  "mcpServers": {
    "flowscope": {
      "command": "node",
      "args": ["C:\\Users\\YourName\\Documents\\flowscope-project\\mcp-server\\dist\\index.js"],
      "env": {}
    }
  }
}
```

## Step 4: Restart Claude Desktop

After saving the configuration file, completely quit and restart Claude Desktop.

## Step 5: Test the Connection

In Claude Desktop, try asking:
- "Can you analyze my application's flow structure?"
- "What tools do you have available?"

You should see FlowScope tools available!

## Troubleshooting

### Common Issues:

1. **"Command not found" error:**
   - Make sure Node.js is installed and in your PATH
   - Try using the full path to node: `/usr/local/bin/node` (macOS) or `C:\Program Files\nodejs\node.exe` (Windows)

2. **"File not found" error:**
   - Double-check the path to your project
   - Make sure you ran `npm run build` in the mcp-server directory
   - Verify the `dist/index.js` file exists

3. **Permission errors:**
   - On macOS/Linux, you might need to make the file executable:
     ```bash
     chmod +x /path/to/your/project/mcp-server/dist/index.js
     ```

4. **Config file doesn't exist:**
   - Create the directory first:
     - macOS: `mkdir -p ~/Library/Application\ Support/Claude/`
     - Windows: `mkdir %APPDATA%\Claude`
   - Then create the config file

### Alternative Node.js Paths:

If the default `node` command doesn't work, try these full paths:

**macOS:**
- `/usr/local/bin/node`
- `/opt/homebrew/bin/node`
- `/usr/bin/node`

**Windows:**
- `C:\Program Files\nodejs\node.exe`
- `C:\Program Files (x86)\nodejs\node.exe`

**Find Node.js location:**
- macOS/Linux: `which node`
- Windows: `where node`

## Example Working Configuration

Here's a complete working example:

```json
{
  "mcpServers": {
    "flowscope": {
      "command": "/usr/local/bin/node",
      "args": ["/Users/john/Projects/my-flowscope-app/mcp-server/dist/index.js"],
      "env": {}
    }
  }
}
```