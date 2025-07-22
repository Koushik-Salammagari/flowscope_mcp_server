import React from 'react';
import { File, Database, Code, ArrowRight } from 'lucide-react';

export function FlowLegend() {
  return (
    <div className="absolute bottom-4 left-4 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-10">
      <h4 className="text-sm font-medium text-gray-700 mb-3">Legend</h4>
      
      <div className="space-y-2">
        <div className="text-xs text-gray-600 font-medium">Node Types</div>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-gradient-to-br from-blue-500 to-blue-600" />
            <span className="text-xs">Pages</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-gradient-to-br from-orange-500 to-orange-600" />
            <span className="text-xs">APIs</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-gradient-to-br from-purple-500 to-purple-600" />
            <span className="text-xs">Layouts</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-gradient-to-br from-green-500 to-green-600" />
            <span className="text-xs">Components</span>
          </div>
        </div>
        
        <div className="text-xs text-gray-600 font-medium mt-3">Edge Types</div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-blue-500" />
            <span className="text-xs">Navigation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-green-500" />
            <span className="text-xs">Redirect</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-red-500" />
            <span className="text-xs">API Call</span>
          </div>
        </div>
      </div>
    </div>
  );
}