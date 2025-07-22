import React from 'react';
import { Play, Square, RefreshCw, X, Activity, Clock, AlertCircle } from 'lucide-react';
import { useLiveFlow } from '../../hooks/useLiveFlow';

export const LiveMonitoringPanel: React.FC = () => {
  const {
    isConnected,
    isMonitoring,
    lastUpdate,
    changes,
    error,
    startMonitoring,
    stopMonitoring,
    getLatestUpdate,
    clearChanges,
  } = useLiveFlow();

  const handleStartMonitoring = async () => {
    try {
      await startMonitoring();
    } catch (error) {
      console.error('Failed to start monitoring:', error);
    }
  };

  const handleStopMonitoring = () => {
    stopMonitoring();
  };

  const handleRefresh = async () => {
    try {
      await getLatestUpdate();
    } catch (error) {
      console.error('Failed to get latest update:', error);
    }
  };

  return (
    <div className="fixed top-4 right-4 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Live Monitoring</h3>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-sm text-gray-600">
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <span className="text-sm text-red-800">{error}</span>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <div className="flex space-x-2">
            {!isMonitoring ? (
              <button
                onClick={handleStartMonitoring}
                disabled={!isConnected}
                className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Play className="w-4 h-4" />
                <span>Start Monitoring</span>
              </button>
            ) : (
              <button
                onClick={handleStopMonitoring}
                className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                <Square className="w-4 h-4" />
                <span>Stop Monitoring</span>
              </button>
            )}
            
            <button
              onClick={handleRefresh}
              disabled={!isConnected}
              className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {lastUpdate && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>Last update: {lastUpdate.toLocaleTimeString()}</span>
            </div>
          )}

          {changes.length > 0 && (
            <div className="border-t pt-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-900">Recent Changes</h4>
                <button
                  onClick={clearChanges}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="max-h-32 overflow-y-auto space-y-1">
                {changes.slice(-5).map((change, index) => (
                  <div key={index} className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                    {change}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {isMonitoring && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-blue-600 animate-pulse" />
              <span className="text-sm text-blue-800">
                Monitoring active - watching for file changes...
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 