import React from 'react';

const TestPage: React.FC = () => {
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
          
          <div className="bg-purple-50 p-4 rounded-md">
            <h3 className="font-semibold text-purple-900 mb-2">AI Collaboration</h3>
            <p className="text-purple-700 text-sm">
              When working with AI assistants, you can now see what pages they're creating and how they fit into your app's structure.
            </p>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2">Navigation</h3>
          <div className="space-y-2">
            <a href="/" className="block text-blue-600 hover:text-blue-800">
              ← Back to Home
            </a>
            <a href="/dashboard" className="block text-blue-600 hover:text-blue-800">
              → Go to Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage; 