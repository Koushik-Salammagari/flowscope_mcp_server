import React from 'react';
import { FlowPreview } from './components/flow/FlowPreview';
import { LiveMonitoringPanel } from './components/flow/LiveMonitoringPanel';

function App() {
  return (
    <div className="h-screen">
      <FlowPreview />
      <LiveMonitoringPanel />
    </div>
  );
}

export default App;