import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Eye, Code, ExternalLink } from 'lucide-react';
import { PageNode } from '../../types/flow';

interface CustomNodeProps {
  data: any;
  selected?: boolean;
}

export const CustomNode: React.FC<CustomNodeProps> = ({ data, selected }) => {
  const node = data.node as PageNode;
  const onPreview = data.onPreview as (node: PageNode) => void;

  const getNodeColor = () => {
    switch (node.type) {
      case 'page':
        return node.meta?.protected ? '#3B82F6' : '#8B5CF6';
      case 'api':
        return '#F59E0B';
      case 'component':
        return '#10B981';
      default:
        return '#6B7280';
    }
  };

  const getNodeIcon = () => {
    switch (node.type) {
      case 'page':
        return '📄';
      case 'api':
        return '🔌';
      case 'component':
        return '🧩';
      default:
        return '📄';
    }
  };

  const handlePreviewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPreview(node);
  };

  return (
    <div
      className={`px-4 py-3 rounded-lg shadow-lg border-2 min-w-[200px] ${
        selected ? 'border-blue-500' : 'border-gray-200'
      }`}
      style={{ backgroundColor: getNodeColor() + '10' }}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <span className="text-lg">{getNodeIcon()}</span>
          <h3 className="font-semibold text-gray-900 text-sm truncate">
            {node.name}
          </h3>
        </div>
        
        <div className="flex items-center space-x-1">
          <button
            onClick={handlePreviewClick}
            className="p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded"
            title="Preview Page"
          >
            <Eye className="w-3 h-3" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.open(node.filePath, '_blank');
            }}
            className="p-1 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded"
            title="View Code"
          >
            <Code className="w-3 h-3" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.open(node.route, '_blank');
            }}
            className="p-1 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded"
            title="Open Page"
          >
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
      
      <div className="space-y-1">
        <p className="text-xs text-gray-600 truncate">
          {node.route}
        </p>
        <p className="text-xs text-gray-500 truncate">
          {node.meta?.description || 'No description'}
        </p>
        
        <div className="flex items-center space-x-2 mt-2">
          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
            {node.type}
          </span>
          {node.meta?.auth && (
            <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded">
              🔒 Auth
            </span>
          )}
          {node.meta?.protected && (
            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
              Protected
            </span>
          )}
        </div>
      </div>
      
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
};