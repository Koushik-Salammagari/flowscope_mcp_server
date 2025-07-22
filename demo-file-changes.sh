#!/bin/bash

# Demo script to simulate file changes for FlowScope testing
echo "🎯 FlowScope Real-Time Monitoring Demo"
echo "======================================"
echo ""

echo "📁 Current project structure:"
ls -la src/pages/
echo ""

echo "🧪 Creating test pages to demonstrate FlowScope detection..."
echo ""

# Create a new page to simulate AI-generated code
echo "Creating: src/pages/AIGeneratedPage.tsx"
cat > src/pages/AIGeneratedPage.tsx << 'EOF'
import React from 'react';

const AIGeneratedPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          🤖 AI Generated Page
        </h1>
        <p className="text-gray-600 mb-6">
          This page was created by an AI assistant during a vibe coding session.
          FlowScope should detect this new page and update the flow diagram!
        </p>
        
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-md">
            <h3 className="font-semibold text-green-900 mb-2">AI Detection</h3>
            <p className="text-green-700 text-sm">
              FlowScope detected this new page and added it to the flow visualization.
            </p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-md">
            <h3 className="font-semibold text-blue-900 mb-2">Real-Time Updates</h3>
            <p className="text-blue-700 text-sm">
              The flow diagram should have updated automatically when this file was created.
            </p>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2">Navigation</h3>
          <div className="space-y-2">
            <a href="/" className="block text-blue-600 hover:text-blue-800">
              ← Back to Home
            </a>
            <a href="/test" className="block text-blue-600 hover:text-blue-800">
              → Test Page
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIGeneratedPage;
EOF

echo "✅ Created AIGeneratedPage.tsx"
echo ""

# Wait a moment to simulate real-time detection
sleep 2

# Create another page to show multiple changes
echo "Creating: src/pages/UserProfile.tsx"
cat > src/pages/UserProfile.tsx << 'EOF'
import React from 'react';

const UserProfile: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          👤 User Profile
        </h1>
        <p className="text-gray-600 mb-6">
          Another page created during vibe coding. FlowScope should detect this too!
        </p>
        
        <div className="space-y-4">
          <div className="bg-yellow-50 p-4 rounded-md">
            <h3 className="font-semibold text-yellow-900 mb-2">Multiple Changes</h3>
            <p className="text-yellow-700 text-sm">
              FlowScope can handle multiple file changes and update the flow in real-time.
            </p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-md">
            <h3 className="font-semibold text-purple-900 mb-2">Flow Connections</h3>
            <p className="text-purple-700 text-sm">
              This page connects to other parts of the application, showing the flow relationships.
            </p>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2">Navigation</h3>
          <div className="space-y-2">
            <a href="/dashboard" className="block text-blue-600 hover:text-blue-800">
              ← Back to Dashboard
            </a>
            <a href="/settings" className="block text-blue-600 hover:text-blue-800">
              → Settings
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
EOF

echo "✅ Created UserProfile.tsx"
echo ""

# Wait a moment
sleep 2

# Create an API route to show different types of nodes
echo "Creating: src/api/profile.ts"
cat > src/api/profile.ts << 'EOF'
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Get user profile
    res.status(200).json({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      avatar: '/api/avatars/1.jpg'
    });
  } else if (req.method === 'PUT') {
    // Update user profile
    res.status(200).json({
      message: 'Profile updated successfully'
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
EOF

echo "✅ Created profile.ts API route"
echo ""

echo "📊 Updated project structure:"
ls -la src/pages/
echo ""

echo "🎯 FlowScope should now show:"
echo "  ✅ 2 new pages (AIGeneratedPage, UserProfile)"
echo "  ✅ 1 new API route (profile)"
echo "  ✅ Updated flow connections"
echo "  ✅ New nodes in the visualization"
echo ""

echo "🌐 Open http://localhost:5174/ to see the updated FlowScope visualization!"
echo ""

echo "📝 To test real-time monitoring:"
echo "  1. Open FlowScope in your browser"
echo "  2. Click 'Start Monitoring' in the Live Monitoring panel"
echo "  3. Make changes to any .tsx or .ts files"
echo "  4. Watch the flow diagram update in real-time!"
echo ""

echo "🎉 Demo completed! FlowScope is working for real-time vibe coding!" 