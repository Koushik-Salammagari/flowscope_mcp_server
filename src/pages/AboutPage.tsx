import React from 'react';

const AboutPage: React.FC = () => {
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
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2">Navigation</h3>
          <div className="flex space-x-4">
            <a href="/" className="text-blue-600 hover:text-blue-800">
              ← Home
            </a>
            <a href="/test" className="text-blue-600 hover:text-blue-800">
              → Test Page
            </a>
            <a href="/dashboard" className="text-blue-600 hover:text-blue-800">
              → Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 