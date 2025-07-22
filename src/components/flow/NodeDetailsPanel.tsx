import React from 'react';
import { X, File, ExternalLink, Code, Shield, Globe } from 'lucide-react';
import { useFlowStore } from '../../hooks/useFlowStore';

export function NodeDetailsPanel() {
  const { selectedNode, setSelectedNode } = useFlowStore();

  if (!selectedNode) return null;

  const handleJumpToFile = () => {
    // In a real implementation, this would trigger VS Code/Cursor to open the file
    console.log(`Opening file: ${selectedNode.filePath}`);
    alert(`Would open: ${selectedNode.filePath}`);
  };

  return (
    <div className="absolute top-4 right-4 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-10">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">{selectedNode.name}</h3>
          <button
            onClick={() => setSelectedNode(null)}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>
      
      <div className="p-4 space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-600">Route</label>
          <div className="flex items-center gap-2 mt-1">
            <Code className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
              {selectedNode.route}
            </span>
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-600">File Path</label>
          <div className="flex items-center gap-2 mt-1">
            <File className="w-4 h-4 text-gray-400" />
            <button
              onClick={handleJumpToFile}
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              {selectedNode.filePath}
            </button>
            <ExternalLink className="w-3 h-3 text-gray-400" />
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-600">Type</label>
          <div className="mt-1">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {selectedNode.type}
            </span>
          </div>
        </div>
        
        {selectedNode.meta && (
          <div>
            <label className="text-sm font-medium text-gray-600">Properties</label>
            <div className="mt-2 space-y-2">
              {selectedNode.meta.layout && (
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-purple-500" />
                  <span className="text-sm">Layout: {selectedNode.meta.layout}</span>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                {selectedNode.meta.auth ? (
                  <>
                    <Shield className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Authentication Required</span>
                  </>
                ) : (
                  <>
                    <Globe className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">Public Access</span>
                  </>
                )}
              </div>
              
              {selectedNode.meta.protected && (
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">Protected Route</span>
                </div>
              )}
            </div>
          </div>
        )}
        
        {selectedNode.meta?.description && (
          <div>
            <label className="text-sm font-medium text-gray-600">Description</label>
            <p className="mt-1 text-sm text-gray-700">
              {selectedNode.meta.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}