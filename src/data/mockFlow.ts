import { FlowGraph, GroupConfig } from '../types/flow';

export const mockFlowData: FlowGraph = {
  nodes: [
    {
      id: 'home',
      name: 'HomePage',
      filePath: '/src/pages/HomePage.tsx',
      route: '/',
      type: 'page',
      meta: {
        layout: 'MainLayout',
        auth: false,
        description: 'Landing page with hero section'
      }
    },
    {
      id: 'dashboard',
      name: 'Dashboard',
      filePath: '/src/pages/Dashboard.tsx',
      route: '/dashboard',
      type: 'page',
      meta: {
        layout: 'AppLayout',
        auth: true,
        protected: true,
        description: 'User dashboard with analytics'
      }
    },
    {
      id: 'test-page',
      name: 'TestPage',
      filePath: '/src/pages/TestPage.tsx',
      route: '/test',
      type: 'page',
      meta: {
        layout: 'MainLayout',
        auth: false,
        description: 'Test page for FlowScope demonstration'
      }
    },
    {
      id: 'about-page',
      name: 'AboutPage',
      filePath: '/src/pages/AboutPage.tsx',
      route: '/about',
      type: 'page',
      meta: {
        layout: 'MainLayout',
        auth: false,
        description: 'About FlowScope information page'
      }
    },
    {
      id: 'api-users',
      name: 'UsersAPI',
      filePath: '/src/api/users.ts',
      route: '/api/users',
      type: 'api',
      meta: {
        auth: true,
        description: 'User management endpoints'
      }
    }
  ],
  edges: [
    {
      id: 'home-dashboard',
      source: 'home',
      target: 'dashboard',
      type: 'navigation',
      label: 'Dashboard'
    },
    {
      id: 'home-test',
      source: 'home',
      target: 'test-page',
      type: 'navigation',
      label: 'Test FlowScope'
    },
    {
      id: 'home-about',
      source: 'home',
      target: 'about-page',
      type: 'navigation',
      label: 'About'
    },
    {
      id: 'test-about',
      source: 'test-page',
      target: 'about-page',
      type: 'navigation',
      label: 'Learn More'
    },
    {
      id: 'about-test',
      source: 'about-page',
      target: 'test-page',
      type: 'navigation',
      label: 'Try Demo'
    },
    {
      id: 'dashboard-api-users',
      source: 'dashboard',
      target: 'api-users',
      type: 'api-call',
      label: 'GET /users'
    }
  ]
};

export const mockGroups: GroupConfig[] = [
  {
    id: 'public',
    name: 'Public Pages',
    color: '#8B5CF6',
    nodeIds: ['home', 'test-page', 'about-page']
  },
  {
    id: 'protected',
    name: 'Protected Pages',
    color: '#3B82F6',
    nodeIds: ['dashboard']
  },
  {
    id: 'api',
    name: 'API Endpoints',
    color: '#F59E0B',
    nodeIds: ['api-users']
  }
];