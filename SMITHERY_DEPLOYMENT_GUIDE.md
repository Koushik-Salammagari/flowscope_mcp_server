# 🚀 FlowScope Smithery.ai Deployment Guide

## 📋 **Prerequisites**

### **Required Tools**
- ✅ Node.js (v18+)
- ✅ npm
- ✅ Smithery CLI (`npm install -g @smithery/cli`)
- ✅ Git repository access

### **Current Status**
- ✅ **MCP Server**: Built and tested
- ✅ **FlowScope Frontend**: Running at `http://localhost:5176/`
- ✅ **Smithery CLI**: Installed
- ✅ **Deployment Scripts**: Ready

## 🎯 **Deployment Options**

### **Option 1: Quick Deploy (Recommended)**
```bash
# Run the automated deployment script
chmod +x deploy-smithery.sh
./deploy-smithery.sh
```

### **Option 2: Manual Deploy**
```bash
# Step-by-step manual deployment
npm install
cd mcp-server && npm run build && cd ..
smithery create flowscope-mcp-server
smithery deploy flowscope-mcp-server
```

### **Option 3: GitHub Actions (Advanced)**
```bash
# Set up automated deployment via GitHub Actions
# (See GitHub Actions workflow in .github/workflows/deploy.yml)
```

## 🔧 **Step-by-Step Deployment**

### **Step 1: Verify MCP Server**
```bash
# Test the MCP server locally
cd mcp-server
npm run build
node dist/index.js
# Should show: "FlowScope MCP Server started"
```

### **Step 2: Prepare for Deployment**
```bash
# Install dependencies
npm install

# Build all components
cd mcp-server && npm run build && cd ..
cd server && npm run build && cd ..
```

### **Step 3: Create Smithery Deployment**
```bash
# Create new deployment
smithery create flowscope-mcp-server

# Configure deployment
smithery config set NODE_ENV=production
smithery config set PORT=3001
smithery config set LOG_LEVEL=info
```

### **Step 4: Deploy to Smithery**
```bash
# Deploy the application
smithery deploy flowscope-mcp-server

# Get deployment URL
smithery info flowscope-mcp-server --json
```

### **Step 5: Test Deployment**
```bash
# Test the deployed MCP server
curl -f "$DEPLOYMENT_URL/api/health"
```

## 📊 **MCP Server Tools Available**

### **Core Analysis Tools**
1. **`analyze_flow`** - Analyze page-to-page flow structure
2. **`get_flow_summary`** - Get detailed flow summary
3. **`find_orphaned_pages`** - Find disconnected pages
4. **`analyze_security_flow`** - Security analysis
5. **`suggest_improvements`** - Architecture recommendations

### **Real-time Monitoring Tools**
6. **`start_live_monitoring`** - Start real-time file watching
7. **`get_live_flow_update`** - Get latest flow updates

## 🔗 **Integration with Claude Desktop**

### **Configuration File**
Create `claude-desktop-config.json`:
```json
{
  "mcpServers": {
    "flowscope": {
      "command": "node",
      "args": ["$DEPLOYMENT_URL"],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

### **Add to Claude Desktop**
1. Open Claude Desktop
2. Go to Settings → MCP Servers
3. Add the FlowScope MCP server configuration
4. Restart Claude Desktop
5. Start using FlowScope tools!

## 🎮 **Using FlowScope on Smithery.ai**

### **For Vibe Coders**
1. **Install Claude Desktop** with FlowScope MCP server
2. **Start a vibe coding session**
3. **Use FlowScope tools** to analyze your application flow
4. **Get real-time insights** as you code

### **For Tool Creators**
1. **Deploy your own MCP server** to Smithery.ai
2. **Make it available** to the community
3. **Others can use your tools** in their vibe coding sessions

### **For Teams**
1. **Deploy FlowScope** for your team
2. **Share the MCP server** configuration
3. **Collaborate** with real-time flow analysis

## 📈 **Deployment Verification**

### **Health Check**
```bash
# Test the deployment
curl -f "$DEPLOYMENT_URL/api/health"
# Expected: {"status": "healthy", "version": "1.0.0"}
```

### **MCP Server Test**
```bash
# Test MCP server communication
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/list", "params": {}}' | node dist/index.js
```

### **Tool Testing**
```bash
# Test individual tools
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "get_flow_summary", "arguments": {}}}' | node dist/index.js
```

## 🔧 **Troubleshooting**

### **Common Issues**

#### **Deployment Fails**
```bash
# Check logs
smithery logs flowscope-mcp-server

# Restart deployment
smithery restart flowscope-mcp-server
```

#### **MCP Server Not Responding**
```bash
# Check server status
smithery status flowscope-mcp-server

# Rebuild and redeploy
cd mcp-server && npm run build && cd ..
smithery deploy flowscope-mcp-server
```

#### **Claude Desktop Integration Issues**
```bash
# Verify MCP server is running
curl -f "$DEPLOYMENT_URL/api/health"

# Check Claude Desktop logs
# Look for MCP server connection errors
```

### **Debug Commands**
```bash
# View deployment logs
smithery logs flowscope-mcp-server --follow

# Check deployment status
smithery status flowscope-mcp-server

# Get deployment info
smithery info flowscope-mcp-server --json
```

## 🎯 **Next Steps After Deployment**

### **1. Share with Community**
- **Post on Smithery.ai** - Make FlowScope available to others
- **Document usage** - Create guides for vibe coders
- **Gather feedback** - Improve based on user experience

### **2. Enhance Features**
- **Add more tools** - Expand MCP server capabilities
- **Improve analysis** - Better flow detection algorithms
- **Real-time updates** - Live flow monitoring

### **3. Scale Usage**
- **Monitor usage** - Track how many people use FlowScope
- **Gather metrics** - Understand user patterns
- **Iterate quickly** - Deploy improvements

## 🚀 **Success Metrics**

### **Deployment Success**
- ✅ MCP server responds to health checks
- ✅ Tools return proper responses
- ✅ Claude Desktop can connect
- ✅ Real-time monitoring works

### **User Adoption**
- 📊 Number of users accessing FlowScope
- 📊 Tool usage frequency
- 📊 User feedback and ratings
- 📊 Community engagement

### **Technical Performance**
- ⚡ Response times under 100ms
- ⚡ 99.9% uptime
- ⚡ Error rate under 1%
- ⚡ Successful tool executions

## 🎉 **Congratulations!**

You've successfully deployed FlowScope to Smithery.ai! 

**FlowScope is now available as a tool for the vibe coding community!**

### **What You've Accomplished**
- ✅ **Built a working MCP server** with 7 powerful tools
- ✅ **Deployed to Smithery.ai** for community access
- ✅ **Created real-time flow analysis** for vibe coding
- ✅ **Made FlowScope available** to other developers

### **Impact**
- 🎯 **Vibe coders** can now use FlowScope in their sessions
- 🎯 **Teams** can collaborate with real-time flow analysis
- 🎯 **Tool creators** have a template for MCP server deployment
- 🎯 **Community** benefits from better flow understanding

**FlowScope is now part of the future of AI-powered development!** 🚀 