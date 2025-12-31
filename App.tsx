
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { ClusterView } from './views/ClusterView';
import { MyNodeView } from './views/MyNodeView';
import { EarningsView } from './views/EarningsView';
import { ApiKeyView } from './views/ApiKeyView';
import { Cluster } from './types';

const AgentView = () => <div className="min-h-screen bg-main flex items-center justify-center font-black text-4xl text-[#FF3B30] uppercase tracking-tighter">Immersive_Agent_Context_Active</div>;
const TaskView = () => <div className="p-20 text-zinc-500 uppercase mono text-xs">Task_Registry_Module_Pending...</div>;
const ProfileView = () => <div className="p-20 text-zinc-500 uppercase mono text-xs">Identity_Protocol_Module_Pending...</div>;

const MOCK_CLUSTERS: Cluster[] = [
  { id: 'c1', name: 'Llama-3-70B-Global', model: 'Llama 3 70B', nodeCount: 124, gpuType: 'RTX 4090', vramRequired: 24, status: 'ACTIVE' },
  { id: 'c2', name: 'Stable-Diff-XL-Edge', model: 'SDXL 1.0', nodeCount: 86, gpuType: 'RTX 3090', vramRequired: 20, status: 'ACTIVE' },
  { id: 'c3', name: 'Grok-1-Parallel-X', model: 'Grok-1', nodeCount: 312, gpuType: 'A100/H100', vramRequired: 80, status: 'DEPLOYING' }
];

export type NavigationPath = 'AGENT' | 'P2P_CLUSTERS' | 'P2P_MY_NODE' | 'P2P_EARNINGS' | 'TASK' | 'PROFILE' | 'API_KEY_PRICING' | 'API_KEY_MANAGEMENT';

const App: React.FC = () => {
  const [activePath, setActivePath] = useState<NavigationPath>('P2P_CLUSTERS');
  const [joinedClusterId, setJoinedClusterId] = useState<string | null>(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleJoinCluster = (clusterId: string) => {
    if (joinedClusterId && joinedClusterId !== clusterId) {
      alert("TERMINATE CURRENT INSTANCE FIRST");
      return;
    }
    setJoinedClusterId(clusterId);
    setActivePath('P2P_MY_NODE');
  };

  const handleLeaveCluster = () => {
    setJoinedClusterId(null);
    setActivePath('P2P_CLUSTERS');
  };

  const isImmersive = activePath === 'AGENT';

  return (
    <Layout 
      activePath={activePath} 
      setActivePath={setActivePath} 
      hideNav={isImmersive}
      hasNode={!!joinedClusterId}
      isWalletConnected={isWalletConnected}
      onConnect={() => setIsWalletConnected(true)}
      theme={theme}
      toggleTheme={toggleTheme}
    >
      {activePath === 'AGENT' && <AgentView />}
      {activePath === 'P2P_CLUSTERS' && (
        <ClusterView 
          clusters={MOCK_CLUSTERS} 
          joinedId={joinedClusterId} 
          onJoin={handleJoinCluster} 
          onLeave={handleLeaveCluster}
        />
      )}
      {activePath === 'P2P_MY_NODE' && joinedClusterId && (
        <MyNodeView 
          cluster={MOCK_CLUSTERS.find(c => c.id === joinedClusterId)!} 
          onLeave={handleLeaveCluster}
        />
      )}
      {activePath === 'P2P_EARNINGS' && <EarningsView />}
      {(activePath === 'API_KEY_PRICING' || activePath === 'API_KEY_MANAGEMENT') && (
        <ApiKeyView activeSubPath={activePath} setActivePath={setActivePath} />
      )}
      {activePath === 'TASK' && <TaskView />}
      {activePath === 'PROFILE' && <ProfileView />}
    </Layout>
  );
};

export default App;
