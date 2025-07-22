import React from 'react';
import { Search, Filter, Layers, Zap } from 'lucide-react';
import { useFlowStore } from '../../hooks/useFlowStore';

export function FlowControls() {
  const { 
    searchTerm, 
    setSearchTerm, 
    groups, 
    activeGroups, 
    toggleGroup 
  } = useFlowStore();

  return (
    <div className="absolute top-4 left-4 z-10 space-y-4">
      {/* Search */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Search className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Search Pages</span>
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filter by name or route..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Group Filters */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filter Groups</span>
        </div>
        <div className="space-y-2">
          {groups.map((group) => (
            <button
              key={group.id}
              onClick={() => toggleGroup(group.id)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                activeGroups.includes(group.id)
                  ? 'bg-blue-100 text-blue-800 border border-blue-200'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: group.color }}
              />
              {group.name}
            </button>
          ))}
        </div>
      </div>

      {/* Real-time Status */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-green-500" />
          <span className="text-sm font-medium text-gray-700">Live Updates</span>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Monitoring codebase changes...
        </p>
      </div>
    </div>
  );
}