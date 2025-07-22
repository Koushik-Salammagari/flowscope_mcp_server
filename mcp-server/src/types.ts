export interface PageNode {
  id: string;
  name: string;
  filePath: string;
  route: string;
  type: 'page' | 'layout' | 'api' | 'component';
  meta?: {
    layout?: string;
    auth?: boolean;
    protected?: boolean;
    params?: string[];
    description?: string;
  };
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  type: 'navigation' | 'redirect' | 'conditional' | 'api-call';
  label?: string;
}

export interface FlowGraph {
  nodes: PageNode[];
  edges: FlowEdge[];
}

export interface AnalysisResult {
  flowGraph: FlowGraph;
  stats: {
    totalPages: number;
    protectedPages: number;
    publicPages: number;
    apiRoutes: number;
    orphanedPages: number;
  };
  recommendations: string[];
}