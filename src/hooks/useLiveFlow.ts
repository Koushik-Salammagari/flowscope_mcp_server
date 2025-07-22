import { useState, useEffect, useCallback } from 'react';
import { FlowGraph, PageNode, FlowEdge } from '../types/flow';

interface LiveFlowState {
  isConnected: boolean;
  isMonitoring: boolean;
  lastUpdate: Date | null;
  flowGraph: FlowGraph | null;
  changes: string[];
  error: string | null;
}

interface LiveFlowActions {
  startMonitoring: (projectPath?: string) => Promise<void>;
  stopMonitoring: () => void;
  getLatestUpdate: () => Promise<void>;
  clearChanges: () => void;
}

export const useLiveFlow = (): LiveFlowState & LiveFlowActions => {
  const [state, setState] = useState<LiveFlowState>({
    isConnected: false,
    isMonitoring: false,
    lastUpdate: null,
    flowGraph: null,
    changes: [],
    error: null,
  });

  const [ws, setWs] = useState<WebSocket | null>(null);

  const connectWebSocket = useCallback(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws/flow`;
    
    const websocket = new WebSocket(wsUrl);
    
    websocket.onopen = () => {
      setState(prev => ({ ...prev, isConnected: true, error: null }));
    };

    websocket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        switch (data.type) {
          case 'flow_update':
            setState(prev => ({
              ...prev,
              flowGraph: data.flowGraph,
              lastUpdate: new Date(),
              changes: [...prev.changes, `Flow updated at ${new Date().toLocaleTimeString()}`],
            }));
            break;
          
          case 'file_changed':
            setState(prev => ({
              ...prev,
              changes: [...prev.changes, `File changed: ${data.filePath}`],
            }));
            break;
          
          case 'error':
            setState(prev => ({
              ...prev,
              error: data.message,
            }));
            break;
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    websocket.onclose = () => {
      setState(prev => ({ 
        ...prev, 
        isConnected: false, 
        isMonitoring: false 
      }));
    };

    websocket.onerror = (error) => {
      setState(prev => ({ 
        ...prev, 
        error: 'WebSocket connection error',
        isConnected: false 
      }));
    };

    setWs(websocket);
  }, []);

  const startMonitoring = useCallback(async (projectPath?: string) => {
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      connectWebSocket();
      return;
    }

    ws.send(JSON.stringify({
      type: 'start_monitoring',
      projectPath,
    }));

    setState(prev => ({ 
      ...prev, 
      isMonitoring: true,
      changes: [...prev.changes, 'Started live monitoring'],
    }));
  }, [ws, connectWebSocket]);

  const stopMonitoring = useCallback(() => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: 'stop_monitoring' }));
    }

    setState(prev => ({ 
      ...prev, 
      isMonitoring: false,
      changes: [...prev.changes, 'Stopped live monitoring'],
    }));
  }, [ws]);

  const getLatestUpdate = useCallback(async () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: 'get_latest_update' }));
    }
  }, [ws]);

  const clearChanges = useCallback(() => {
    setState(prev => ({ ...prev, changes: [] }));
  }, []);

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [connectWebSocket]);

  return {
    ...state,
    startMonitoring,
    stopMonitoring,
    getLatestUpdate,
    clearChanges,
  };
}; 