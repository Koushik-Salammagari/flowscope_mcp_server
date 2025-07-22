#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

class SimpleFlowScopeMCPServer {
  constructor() {
    this.server = new Server({
      name: 'flowscope-mcp-server',
      version: '1.0.0',
      capabilities: {
        tools: {},
        resources: {},
        prompts: {}
      }
    });
  }

  async run() {
    try {
      const transport = new StdioServerTransport();
      await this.server.connect(transport);
      
      // Keep the process alive
      process.on('SIGINT', () => {
        process.exit(0);
      });
      
      process.on('SIGTERM', () => {
        process.exit(0);
      });
      
    } catch (error) {
      console.error('Error starting FlowScope MCP Server:', error);
      process.exit(1);
    }
  }
}

// Start the server
const server = new SimpleFlowScopeMCPServer();
server.run().catch(console.error); 