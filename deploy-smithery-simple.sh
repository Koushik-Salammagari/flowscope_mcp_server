#!/bin/bash

# FlowScope Smithery.ai Deployment Script (Simplified)
# This script deploys FlowScope MCP Server to Smithery.ai

set -e

echo "🚀 Starting FlowScope deployment to Smithery.ai..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required tools are installed
check_dependencies() {
    print_status "Checking dependencies..."
    
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js first."
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm first."
        exit 1
    fi
    
    print_success "All dependencies are satisfied"
}

# Build the project
build_project() {
    print_status "Building FlowScope project..."
    
    # Install dependencies
    npm install
    
    # Build MCP server
    cd mcp-server
    npm install
    npm run build
    cd ..
    
    print_success "Project built successfully"
}

# Build for Smithery
build_for_smithery() {
    print_status "Building for Smithery.ai..."
    
    # Use Smithery CLI to build
    npx @smithery/cli build mcp-server/dist/index.js
    
    print_success "Built for Smithery.ai successfully"
}

# Deploy to Smithery
deploy_to_smithery() {
    print_status "Deploying to Smithery.ai..."
    
    # First, we need to login to Smithery
    print_status "Please login to Smithery.ai..."
    npx @smithery/cli login
    
    # Then deploy
    print_status "Deploying FlowScope MCP Server..."
    npx @smithery/cli run mcp-server/dist/index.js --name flowscope-mcp-server
    
    print_success "Deployment completed successfully"
}

# Test deployment
test_deployment() {
    print_status "Testing deployment..."
    
    # List available servers
    npx @smithery/cli list servers
    
    print_success "Deployment test completed"
}

# Create configuration example
create_config() {
    print_status "Creating Claude Desktop configuration..."
    
    cat > claude-desktop-config.json << EOF
{
  "mcpServers": {
    "flowscope": {
      "command": "npx",
      "args": ["@smithery/cli", "run", "flowscope-mcp-server"],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
EOF
    
    print_success "Claude Desktop configuration saved to claude-desktop-config.json"
}

# Main deployment process
main() {
    echo "🎯 FlowScope Smithery.ai Deployment (Simplified)"
    echo "==============================================="
    
    check_dependencies
    build_project
    build_for_smithery
    deploy_to_smithery
    test_deployment
    create_config
    
    echo ""
    echo "🎉 Deployment completed!"
    echo ""
    echo "Next steps:"
    echo "1. Copy the configuration from claude-desktop-config.json"
    echo "2. Add it to your Claude Desktop configuration"
    echo "3. Restart Claude Desktop"
    echo "4. Start using FlowScope for vibe coding!"
    echo ""
    echo "Available FlowScope tools:"
    echo "- analyze_flow: Analyze page-to-page flow structure"
    echo "- get_flow_summary: Get detailed flow summary"
    echo "- find_orphaned_pages: Find disconnected pages"
    echo "- analyze_security_flow: Security analysis"
    echo "- suggest_improvements: Architecture recommendations"
    echo "- start_live_monitoring: Start real-time monitoring"
    echo "- get_live_flow_update: Get latest flow updates"
    echo ""
    echo "For more information, visit: https://github.com/your-username/flowscope"
}

# Run main function
main "$@" 