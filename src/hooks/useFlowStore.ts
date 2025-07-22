import { create } from 'zustand';
import { FlowGraph, PageNode, FlowEdge, GroupConfig } from '../types/flow';
import { mockFlowData, mockGroups } from '../data/mockFlow';

interface FlowStore {
  flowGraph: FlowGraph;
  groups: GroupConfig[];
  selectedNode: PageNode | null;
  activeGroups: string[];
  searchTerm: string;
  
  // Actions
  setFlowGraph: (graph: FlowGraph) => void;
  setSelectedNode: (node: PageNode | null) => void;
  toggleGroup: (groupId: string) => void;
  setSearchTerm: (term: string) => void;
  updateNode: (nodeId: string, updates: Partial<PageNode>) => void;
  addEdge: (edge: FlowEdge) => void;
  removeEdge: (edgeId: string) => void;
}

export const useFlowStore = create<FlowStore>((set, get) => ({
  flowGraph: mockFlowData,
  groups: mockGroups,
  selectedNode: null,
  activeGroups: [],
  searchTerm: '',

  setFlowGraph: (graph) => set({ flowGraph: graph }),
  
  setSelectedNode: (node) => set({ selectedNode: node }),
  
  toggleGroup: (groupId) => set((state) => ({
    activeGroups: state.activeGroups.includes(groupId)
      ? state.activeGroups.filter(id => id !== groupId)
      : [...state.activeGroups, groupId]
  })),
  
  setSearchTerm: (term) => set({ searchTerm: term }),
  
  updateNode: (nodeId, updates) => set((state) => ({
    flowGraph: {
      ...state.flowGraph,
      nodes: state.flowGraph.nodes.map(node =>
        node.id === nodeId ? { ...node, ...updates } : node
      )
    }
  })),
  
  addEdge: (edge) => set((state) => ({
    flowGraph: {
      ...state.flowGraph,
      edges: [...state.flowGraph.edges, edge]
    }
  })),
  
  removeEdge: (edgeId) => set((state) => ({
    flowGraph: {
      ...state.flowGraph,
      edges: state.flowGraph.edges.filter(edge => edge.id !== edgeId)
    }
  }))
}));