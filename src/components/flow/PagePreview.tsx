import React from 'react';
import { X, ExternalLink, Code, Eye } from 'lucide-react';
import { PageNode } from '../../types/flow';

interface PagePreviewProps {
  node: PageNode | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PagePreview: React.FC<PagePreviewProps> = ({ node, isOpen, onClose }) => {
  if (!isOpen || !node) return null;

  const renderPageContent = () => {
    switch (node.id) {
      case 'home':
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-gray-900 mb-6">
                Welcome to FlowScope
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                Real-time application flow analysis for vibe coding. See how your code changes affect the application structure.
              </p>
              <div className="space-x-4">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                  Get Started
                </button>
                <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        );

      case 'test-page':
        return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                🧪 Test Page
              </h1>
              <p className="text-gray-600 mb-6">
                This is a test page created to demonstrate FlowScope's real-time flow monitoring capabilities.
              </p>
              
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-md">
                  <h3 className="font-semibold text-blue-900 mb-2">FlowScope Detection</h3>
                  <p className="text-blue-700 text-sm">
                    When you created this page, FlowScope should have detected it and updated the flow diagram in real-time.
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-md">
                  <h3 className="font-semibold text-green-900 mb-2">Vibe Coding</h3>
                  <p className="text-green-700 text-sm">
                    This demonstrates how you can see the impact of your code changes on the application flow as you build.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'about-page':
        return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                📖 About FlowScope
              </h1>
              <p className="text-gray-600 mb-6">
                FlowScope is a real-time application flow analysis tool designed for vibe coding sessions.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-md">
                    <h3 className="font-semibold text-blue-900 mb-2">Real-Time Monitoring</h3>
                    <p className="text-blue-700 text-sm">
                      Watch your application flow evolve as you code. See new pages appear instantly in the flow diagram.
                    </p>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-md">
                    <h3 className="font-semibold text-green-900 mb-2">AI Collaboration</h3>
                    <p className="text-green-700 text-sm">
                      Understand what pages AI assistants are creating and how they connect to your existing structure.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-purple-50 p-4 rounded-md">
                    <h3 className="font-semibold text-purple-900 mb-2">Architecture Validation</h3>
                    <p className="text-purple-700 text-sm">
                      Ensure your app follows best practices and identify orphaned pages or missing connections.
                    </p>
                  </div>
                  
                  <div className="bg-yellow-50 p-4 rounded-md">
                    <h3 className="font-semibold text-yellow-900 mb-2">Vibe Coding</h3>
                    <p className="text-yellow-700 text-sm">
                      Code with confidence, knowing how your changes affect the overall application structure.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'dashboard':
        return (
          <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm border-b">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-6">
                  <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">Welcome back, User</span>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Profile</button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Analytics</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Page Views</span>
                      <span className="font-semibold">1,234</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Users</span>
                      <span className="font-semibold">567</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <button className="w-full text-left text-blue-600 hover:text-blue-800">
                      View Profile
                    </button>
                    <button className="w-full text-left text-blue-600 hover:text-blue-800">
                      Settings
                    </button>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>Page created: TestPage</div>
                    <div>Page created: AboutPage</div>
                    <div>API updated: UsersAPI</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {node.name}
              </h1>
              <p className="text-gray-600 mb-6">
                {node.meta?.description || 'Page preview not available'}
              </p>
              <div className="bg-gray-100 p-4 rounded-md">
                <p className="text-sm text-gray-600">
                  Route: {node.route}
                </p>
                <p className="text-sm text-gray-600">
                  Type: {node.type}
                </p>
                {node.meta?.auth && (
                  <p className="text-sm text-red-600">🔒 Protected Page</p>
                )}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-3">
            <Eye className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              Page Preview: {node.name}
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => window.open(node.route, '_blank')}
              className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="text-sm">Open</span>
            </button>
            <button
              onClick={() => window.open(node.filePath, '_blank')}
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-800"
            >
              <Code className="w-4 h-4" />
              <span className="text-sm">Code</span>
            </button>
            <button
              onClick={onClose}
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-800"
            >
              <X className="w-4 h-4" />
              <span className="text-sm">Close</span>
            </button>
          </div>
        </div>
        
        <div className="overflow-auto max-h-[calc(90vh-80px)]">
          {renderPageContent()}
        </div>
      </div>
    </div>
  );
}; 