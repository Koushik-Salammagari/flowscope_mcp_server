import React, { useMemo, useCallback, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  ConnectionMode,
  MarkerType
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { CustomNode } from './CustomNode';
import { CustomEdge } from './CustomEdge';
import { NodeDetailsPanel } from './NodeDetailsPanel';
import { FlowControls } from './FlowControls';
import { FlowLegend } from './FlowLegend';
import { PagePreview } from './PagePreview';
import { useFlowStore } from '../../hooks/useFlowStore';
import { PageNode } from '../../types/flow';

const nodeTypes = {
  custom: CustomNode,
};

const edgeTypes = {
  custom: CustomEdge,
};

const defaultEdgeOptions = {
  type: 'custom',
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: '#6B7280',
  },
};

export function FlowPreview() {
  const { flowGraph, searchTerm, activeGroups, groups } = useFlowStore();
  const [previewNode, setPreviewNode] = useState<PageNode | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Convert flow data to React Flow format
  const { initialNodes, initialEdges } = useMemo(() => {
    const filteredNodes = flowGraph.nodes.filter(node => {
      const matchesSearch = !searchTerm || 
        node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        node.route.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesGroup = activeGroups.length === 0 || 
        activeGroups.some(groupId => 
          groups.find(g => g.id === groupId)?.nodeIds.includes(node.id)
        );
      
      return matchesSearch && matchesGroup;
    });

    const filteredNodeIds = new Set(filteredNodes.map(n => n.id));
    
    const nodes = filteredNodes.map((node, index) => ({
      id: node.id,
      type: 'custom',
      position: {
        x: (index % 4) * 250 + 100,
        y: Math.floor(index / 4) * 200 + 100,
      },
      data: {
        node: node,
        onPreview: (node: PageNode) => {
          setPreviewNode(node);
          setIsPreviewOpen(true);
        }
      },
    })) as Node[];

    const edges: Edge[] = flowGraph.edges
      .filter(edge => 
        filteredNodeIds.has(edge.source) && filteredNodeIds.has(edge.target)
      )
      .map(edge => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        type: 'custom',
        data: {
          type: edge.type,
          label: edge.label,
        },
      }));

    return { initialNodes: nodes, initialEdges: edges };
  }, [flowGraph, searchTerm, activeGroups, groups]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Update nodes when filter changes
  React.useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  const onConnect = useCallback((connection: any) => {
    // In a real implementation, this would add a new edge to the flow
    console.log('Connection:', connection);
  }, []);

  const handlePreviewClose = () => {
    setIsPreviewOpen(false);
    setPreviewNode(null);
  };

  return (
    <div className="h-screen w-full bg-gray-50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        connectionMode={ConnectionMode.Loose}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
        className="bg-gray-50"
      >
        <Background color="#e5e7eb" gap={20} />
        <Controls 
          position="bottom-right"
          className="!bg-white !border-gray-200 !shadow-lg"
        />
      </ReactFlow>
      
      <FlowControls />
      <NodeDetailsPanel />
      <FlowLegend />
      
      <PagePreview
        node={previewNode}
        isOpen={isPreviewOpen}
        onClose={handlePreviewClose}
      />
    </div>
  );
}