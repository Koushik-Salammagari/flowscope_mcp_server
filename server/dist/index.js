"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const ws_1 = require("ws");
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const wss = new ws_1.WebSocketServer({ server });
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, '../../dist')));
// Store active connections
const connections = new Set();
// MCP Server communication
let mcpProcess = null;
let mcpInput = null;
const startMCPServer = () => {
    const mcpServerPath = path_1.default.join(__dirname, '../../mcp-server/dist/index.js');
    mcpProcess = (0, child_process_1.spawn)('node', [mcpServerPath], {
        stdio: ['pipe', 'pipe', 'pipe']
    });
    mcpInput = mcpProcess.stdin;
    mcpProcess.stdout.on('data', (data) => {
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
        }
        catch (error) {
            console.error('Error parsing MCP output:', error);
        }
    });
    mcpProcess.stderr.on('data', (data) => {
        console.error('MCP Error:', data.toString());
    });
    mcpProcess.on('close', (code) => {
        console.log(`MCP Server exited with code ${code}`);
    });
};
const sendToMCP = (message) => {
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
const broadcastToClients = (message) => {
    connections.forEach((ws) => {
        if (ws.readyState === ws.OPEN) {
            ws.send(JSON.stringify(message));
        }
    });
};
// WebSocket connection handling
wss.on('connection', (ws) => {
    console.log('New WebSocket connection');
    connections.add(ws);
    ws.on('message', (data) => {
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
        }
        catch (error) {
            console.error('Error parsing WebSocket message:', error);
        }
    });
    ws.on('close', () => {
        console.log('WebSocket connection closed');
        connections.delete(ws);
    });
    ws.on('error', (error) => {
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
    }
    catch (error) {
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
//# sourceMappingURL=index.js.map