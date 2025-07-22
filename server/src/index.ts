import express from 'express';
import { createServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { spawn } from 'child_process';
import path from 'path';
import cors from 'cors';

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../dist')));

// Store active connections
const connections = new Set<WebSocket>();

// MCP Server communication
let mcpProcess: any = null;
let mcpInput: any = null;

const startMCPServer = () => {
  const mcpServerPath = path.join(__dirname, '../../mcp-server/dist/index.js');
  
  mcpProcess = spawn('node', [mcpServerPath], {
    stdio: ['pipe', 'pipe', 'pipe']
  });

  mcpInput = mcpProcess.stdin;

  mcpProcess.stdout.on('data', (data: Buffer) => {
    const message = data.toString();
    console.log('MCP Output:', message);
    
    // Parse MCP response and broadcast to WebSocket clients
    try {
      // This is a simplified parser - in production you'd want a proper MCP client
      if (message.includes('flow_update')) {
        broadcastToClients({
          type: 'flow_update',
          data: message
        });
      }
    } catch (error) {
      console.error('Error parsing MCP output:', error);
    }
  });

  mcpProcess.stderr.on('data', (data: Buffer) => {
    console.error('MCP Error:', data.toString());
  });

  mcpProcess.on('close', (code: number) => {
    console.log(`MCP Server exited with code ${code}`);
  });
};

const sendToMCP = (message: any) => {
  if (mcpInput) {
    const mcpMessage = {
      jsonrpc: '2.0',
      id: Date.now(),
      method: 'tools/call',
      params: {
        name: message.type,
        arguments: message.args || {}
      }
    };
    
    mcpInput.write(JSON.stringify(mcpMessage) + '\n');
  }
};

const broadcastToClients = (message: any) => {
  connections.forEach((ws) => {
    if (ws.readyState === ws.OPEN) {
      ws.send(JSON.stringify(message));
    }
  });
};

// WebSocket connection handling
wss.on('connection', (ws: WebSocket) => {
  console.log('New WebSocket connection');
  connections.add(ws);

  ws.on('message', (data: Buffer) => {
    try {
      const message = JSON.parse(data.toString());
      console.log('Received message:', message);

      switch (message.type) {
        case 'start_monitoring':
          sendToMCP({
            type: 'start_live_monitoring',
            args: {
              projectPath: message.projectPath
            }
          });
          break;

        case 'stop_monitoring':
          sendToMCP({
            type: 'stop_monitoring'
          });
          break;

        case 'get_latest_update':
          sendToMCP({
            type: 'get_live_flow_update'
          });
          break;

        default:
          console.log('Unknown message type:', message.type);
      }
    } catch (error) {
      console.error('Error parsing WebSocket message:', error);
    }
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
    connections.delete(ws);
  });

  ws.on('error', (error: Error) => {
    console.error('WebSocket error:', error);
    connections.delete(ws);
  });
});

// API endpoints
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', connections: connections.size });
});

app.post('/api/analyze', async (req, res) => {
  try {
    const { projectPath } = req.body;
    
    sendToMCP({
      type: 'analyze_flow',
      args: { projectPath }
    });

    res.json({ status: 'analysis_started' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to start analysis' });
  }
});

// Start the server
const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  startMCPServer();
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  if (mcpProcess) {
    mcpProcess.kill();
  }
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
}); 