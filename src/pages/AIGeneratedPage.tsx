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
