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
