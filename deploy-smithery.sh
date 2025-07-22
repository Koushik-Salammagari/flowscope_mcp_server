#!/bin/bash

# FlowScope Smithery.ai Deployment Script
# This script automates the deployment of FlowScope MCP Server to Smithery.ai

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
    
    if ! command -v smithery &> /dev/null; then
        print_warning "Smithery CLI not found. Installing..."
        npm install -g @smithery/cli
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
    
    # Build web server
    cd server
    npm install
    npm run build
    cd ..
    
    print_success "Project built successfully"
}

# Create Smithery deployment
create_smithery_deployment() {
    print_status "Creating Smithery.ai deployment..."
    
    # Check if deployment already exists
    if smithery list | grep -q "flowscope-mcp-server"; then
        print_warning "Deployment already exists. Updating..."
        smithery update flowscope-mcp-server
    else
        print_status "Creating new deployment..."
        smithery create flowscope-mcp-server
    fi
    
    print_success "Smithery deployment created/updated"
}

# Configure deployment
configure_deployment() {
    print_status "Configuring deployment settings..."
    
    # Set environment variables
    smithery config set NODE_ENV=production
    smithery config set PORT=3001
    smithery config set LOG_LEVEL=info
    
    # Set deployment configuration
    smithery config set RUNTIME=node
    smithery config set HEALTH_CHECK=/api/health
    
    print_success "Deployment configured"
}

# Deploy to Smithery
deploy_to_smithery() {
    print_status "Deploying to Smithery.ai..."
    
    # Deploy the application
    smithery deploy flowscope-mcp-server
    
    print_success "Deployment completed successfully"
}

# Get deployment URL
get_deployment_url() {
    print_status "Getting deployment URL..."
    
    DEPLOYMENT_URL=$(smithery info flowscope-mcp-server --json | jq -r '.url')
    
    if [ "$DEPLOYMENT_URL" != "null" ] && [ "$DEPLOYMENT_URL" != "" ]; then
        print_success "Deployment URL: $DEPLOYMENT_URL"
        
        # Create configuration example
        cat > claude-desktop-config-example.json << EOF
{
  "mcpServers": {
    "flowscope": {
      "command": "node",
      "args": ["$DEPLOYMENT_URL"],
      "env": {}
    }
  }
}
EOF
        
        print_success "Claude Desktop configuration saved to claude-desktop-config-example.json"
    else
        print_warning "Could not retrieve deployment URL"
    fi
}

# Test deployment
test_deployment() {
    print_status "Testing deployment..."
    
    # Wait a moment for deployment to be ready
    sleep 10
    
    # Test health endpoint
    if curl -f "$DEPLOYMENT_URL/api/health" > /dev/null 2>&1; then
        print_success "Deployment is healthy and responding"
    else
        print_warning "Health check failed. Deployment might still be starting up."
    fi
}

# Main deployment process
main() {
    echo "🎯 FlowScope Smithery.ai Deployment"
    echo "=================================="
    
    check_dependencies
    build_project
    create_smithery_deployment
    configure_deployment
    deploy_to_smithery
    get_deployment_url
    test_deployment
    
    echo ""
    echo "🎉 Deployment completed!"
    echo ""
    echo "Next steps:"
    echo "1. Copy the configuration from claude-desktop-config-example.json"
    echo "2. Add it to your Claude Desktop configuration"
    echo "3. Restart Claude Desktop"
    echo "4. Start using FlowScope for vibe coding!"
    echo ""
    echo "For more information, visit: https://github.com/your-username/flowscope"
}

# Run main function
main "$@" 