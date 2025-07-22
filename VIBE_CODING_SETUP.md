# FlowScope Vibe Coding Setup Guide

This guide will help you set up FlowScope for real-time flow analysis during your vibe coding sessions. FlowScope will help you understand the application structure as you code and see how AI-generated code affects your app's flow.

## 🎯 What is Vibe Coding with FlowScope?

**Vibe Coding** is a development approach where you code with AI assistance while maintaining a clear understanding of your application's structure. FlowScope provides real-time visualization of your app's flow, helping you:

- **See the big picture** as you code
- **Understand AI-generated pages** and their relationships
- **Maintain architectural consistency** during rapid development
- **Plan user journeys** as you build features

## 🚀 Quick Start

### 1. Install FlowScope

```bash
# Clone the repository
git clone https://github.com/your-username/flowscope.git
cd flowscope

# Install dependencies
npm install
cd mcp-server && npm install
cd ../server && npm install
cd ..

# Build the project
npm run build
```

### 2. Start the Development Environment

```bash
# Start the development server
npm run dev
```

This will start:
- **Frontend**: `http://localhost:3000` - FlowScope visualization
- **Backend**: `http://localhost:3001` - WebSocket server
- **MCP Server**: Running in background for analysis

### 3. Configure for Your Project

1. **Open FlowScope** in your browser
2. **Click "Start Monitoring"** in the Live Monitoring panel
3. **Point to your project** (optional - defaults to current directory)
4. **Start coding!** 🎉

## 🎨 Using FlowScope During Vibe Coding

### Real-Time Flow Visualization

As you code, FlowScope will automatically:

1. **Detect new files** in your project
2. **Analyze page structure** and relationships
3. **Update the flow diagram** in real-time
4. **Show connections** between pages and components

### Understanding AI-Generated Code

When working with AI assistants like Claude:

1. **Ask AI to create pages**: "Create a user profile page"
2. **Watch FlowScope update**: See the new page appear in the flow
3. **Understand relationships**: See how it connects to existing pages
4. **Plan navigation**: Understand the user journey

### Example Vibe Coding Session

```bash
# 1. Start FlowScope
npm run dev

# 2. Open your project in your IDE
code my-react-app

# 3. Start monitoring in FlowScope
# Click "Start Monitoring" in the UI

# 4. Ask AI to create pages
# "Create a dashboard page with user analytics"

# 5. Watch FlowScope update
# See the new dashboard page appear in the flow

# 6. Continue building
# "Add a settings page that connects to the dashboard"

# 7. See the flow evolve
# Watch the navigation structure grow
```

## 🔧 Advanced Configuration

### Custom File Watching

Create a `.flowscope.json` file in your project root:

```json
{
  "watchPatterns": [
    "src/**/*.{ts,tsx,js,jsx}",
    "pages/**/*.{ts,tsx,js,jsx}",
    "app/**/*.{ts,tsx,js,jsx}",
    "components/**/*.{ts,tsx,js,jsx}"
  ],
  "ignorePatterns": [
    "node_modules/**",
    "dist/**",
    "build/**",
    "*.test.{ts,tsx,js,jsx}"
  ],
  "analysis": {
    "includeComponents": true,
    "detectRoutes": true,
    "analyzeAuth": true
  }
}
```

### Framework-Specific Setup

#### React (Create React App / Vite)
```json
{
  "watchPatterns": ["src/**/*.{ts,tsx,js,jsx}"],
  "routeDetection": {
    "router": "react-router",
    "routeFiles": ["src/App.tsx", "src/routes.tsx"]
  }
}
```

#### Next.js
```json
{
  "watchPatterns": [
    "pages/**/*.{ts,tsx,js,jsx}",
    "app/**/*.{ts,tsx,js,jsx}",
    "components/**/*.{ts,tsx,js,jsx}"
  ],
  "routeDetection": {
    "router": "nextjs",
    "pagesDir": "pages",
    "appDir": "app"
  }
}
```

#### Vue.js
```json
{
  "watchPatterns": [
    "src/**/*.{vue,ts,js}",
    "pages/**/*.{vue,ts,js}"
  ],
  "routeDetection": {
    "router": "vue-router",
    "routeFiles": ["src/router/index.ts"]
  }
}
```

## 🎯 Vibe Coding Workflows

### 1. Feature Development Workflow

```bash
# Start FlowScope
npm run dev

# 1. Plan the feature
# "I want to add user authentication"

# 2. Ask AI to create login page
# "Create a login page with email/password"

# 3. Watch FlowScope
# See login page appear, note it's unconnected

# 4. Ask AI to create registration
# "Create a registration page"

# 5. Plan navigation
# "How should users navigate between login and register?"

# 6. Add navigation
# "Add navigation links between login and register pages"

# 7. See the flow evolve
# Watch the authentication flow take shape
```

### 2. Refactoring Workflow

```bash
# 1. Start monitoring
# Click "Start Monitoring" in FlowScope

# 2. Identify issues
# Look for orphaned pages or disconnected flows

# 3. Plan refactoring
# "I want to consolidate these similar pages"

# 4. Make changes
# Rename, move, or delete files

# 5. Watch updates
# See the flow diagram update in real-time

# 6. Verify improvements
# Check that the flow is now cleaner
```

### 3. AI Pair Programming Workflow

```bash
# 1. Start FlowScope
npm run dev

# 2. Open your AI assistant (Claude, GPT, etc.)

# 3. Describe your goal
# "I want to build an e-commerce app"

# 4. Ask AI to create structure
# "Create the main pages for an e-commerce app"

# 5. Watch FlowScope
# See the page structure emerge

# 6. Ask for improvements
# "How can I improve the user flow?"

# 7. Implement suggestions
# "Add a shopping cart page"

# 8. See the flow improve
# Watch the user journey become more logical
```

## 🔍 Understanding the Flow Diagram

### Node Types

- **🟦 Pages**: Main application pages
- **🟨 API Routes**: Backend endpoints
- **🟩 Components**: Reusable UI components
- **🟥 Protected**: Pages requiring authentication
- **🟪 Public**: Pages accessible to everyone

### Edge Types

- **Navigation**: User clicks to navigate
- **API Call**: Page makes API request
- **Redirect**: Automatic redirection
- **Import**: Component imports

### Node Groups

- **Authentication**: Login, register, auth pages
- **Protected Pages**: Dashboard, profile, settings
- **Public Pages**: Home, about, contact
- **API Endpoints**: Backend services

## 🛠️ Troubleshooting

### Common Issues

1. **FlowScope not detecting changes**
   - Check file watching patterns
   - Ensure files are in watched directories
   - Restart monitoring

2. **WebSocket connection issues**
   - Check if server is running on port 3001
   - Verify firewall settings
   - Check browser console for errors

3. **MCP server not responding**
   - Check MCP server logs
   - Verify project path is correct
   - Restart the MCP server

### Debug Mode

Enable debug logging:

```bash
# Set debug environment variable
export FLOWSCOPE_DEBUG=true

# Start with debug logging
npm run dev
```

### Manual Analysis

If automatic detection isn't working:

```bash
# Run manual analysis
curl -X POST http://localhost:3001/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"projectPath": "/path/to/your/project"}'
```

## 🎉 Tips for Effective Vibe Coding

### 1. Start with a Plan
- Sketch your app's flow before coding
- Use FlowScope to visualize the plan
- Keep the flow diagram open while coding

### 2. Iterate Quickly
- Make small changes and watch the flow update
- Use AI to generate boilerplate quickly
- Focus on the big picture, not perfect code

### 3. Validate Architecture
- Check for orphaned pages regularly
- Ensure logical navigation flow
- Look for security gaps in the flow

### 4. Collaborate with AI
- Ask AI to explain the flow structure
- Get suggestions for improving navigation
- Use AI to identify architectural issues

## 🚀 Next Steps

1. **Deploy to Smithery.ai** for team use
2. **Integrate with Claude Desktop** for AI-powered analysis
3. **Customize for your framework** and coding style
4. **Share with your team** for collaborative development

---

**Happy Vibe Coding! 🎉**

Remember: The goal is to code with confidence, understanding your application's structure as it evolves. FlowScope helps you maintain that understanding in real-time. 