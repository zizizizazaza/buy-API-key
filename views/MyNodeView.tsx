
import React, { useState, useEffect } from 'react';
import { Cluster, NodeStatus } from '../types';
import { LineChart, Line, ResponsiveContainer, YAxis, XAxis } from 'recharts';
import { Zap, Wifi, Layers, Cpu, LogOut, Terminal } from 'lucide-react';

interface MyNodeViewProps {
  cluster: Cluster;
  onLeave: () => void;
}

const generateMockData = () => {
  return Array.from({ length: 30 }, (_, i) => ({
    time: i,
    val: Math.floor(Math.random() * 50) + 30
  }));
};

export const MyNodeView: React.FC<MyNodeViewProps> = ({ cluster, onLeave }) => {
  const [utilData, setUtilData] = useState(generateMockData());
  const [vramUsage, setVramUsage] = useState(18.4);

  useEffect(() => {
    const interval = setInterval(() => {
      setUtilData(prev => [...prev.slice(1), { time: Date.now(), val: Math.floor(Math.random() * 30) + 60 }]);
      setVramUsage(v => Math.min(24, Math.max(16, v + (Math.random() - 0.5))));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8 lg:p-20 max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-20">
      {/* Left Metadata */}
      <aside className="lg:col-span-4 space-y-16">
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-[#FF3B30] animate-pulse"></div>
            <span className="font-black text-[10px] text-[#FF3B30] uppercase tracking-widest">Active Deployment Live</span>
          </div>
          <div className="space-y-6">
            <h2 className="text-7xl font-black tracking-tighter leading-none">{cluster.name}</h2>
            <div className="flex flex-wrap gap-4">
              <span className="font-black text-[10px] bg-[#FF3B30]/10 text-[#FF3B30] px-4 py-2 uppercase border border-[#FF3B30]/20">{cluster.model}</span>
              <span className="font-black text-[10px] bg-zinc-900 text-zinc-500 px-4 py-2 uppercase border border-zinc-800">Swarm ID: 8f2b</span>
            </div>
          </div>
        </div>

        <div className="border border-zinc-900 bg-zinc-900/5 p-10 space-y-10">
          <div className="flex justify-between items-center">
            <span className="font-bold text-[10px] text-zinc-600 uppercase tracking-widest">Execution State</span>
            <div className="flex items-center gap-2">
              <span className="font-black text-xs uppercase text-[#FF3B30]">Computing</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between font-black text-[10px] uppercase tracking-wider">
              <span className="text-zinc-600">Cycle Stability</span>
              <span className="text-white">99.4%</span>
            </div>
            <div className="w-full h-[3px] bg-zinc-900 overflow-hidden">
              <div className="h-full bg-accent-gradient transition-all duration-1000" style={{ width: '99.4%' }}></div>
            </div>
          </div>

          <div className="p-6 bg-black border border-zinc-900 space-y-4 shadow-inner">
            <div className="flex items-center gap-3 text-[#FF3B30]">
               <Terminal size={14}/>
               <span className="font-black text-[10px] uppercase">Protocol Log</span>
            </div>
            <div className="mono text-[10px] text-zinc-600 leading-relaxed space-y-2">
              <div>> Processing Shard 722...</div>
              <div>> Validating Tensor Weights...</div>
              <div>> Relay Response Verified.</div>
            </div>
          </div>

          <button 
            onClick={() => {
              if (confirm("Terminate Instance? Your Contribution To The Swarm Will Cease.")) {
                onLeave();
              }
            }}
            className="w-full btn-primary border-zinc-800 text-zinc-500 hover:text-[#FF3B30] hover:border-[#FF3B30]"
          >
            <LogOut size={16} />
            Terminate Instance
          </button>
        </div>
      </aside>

      {/* Main Stats Grid */}
      <div className="lg:col-span-8 space-y-12">
        <div className="grid md:grid-cols-4 gap-px bg-zinc-900 border border-zinc-900">
          <MetricTile label="Hardware Target" value="RTX 4090" sub="Ada Lovelace" icon={<Cpu size={16} />} />
          <MetricTile label="Node Priority" value="MAX YIELD" sub="Heavy Class" icon={<Layers size={16} />} />
          <MetricTile label="Network Sync" value="SYNCHRONIZED" sub="Global Relay" icon={<Zap size={16} className="text-[#FF3B30]" />} />
          <MetricTile label="Latency" value="14.2MS" sub="Peer To Peer" icon={<Wifi size={16} />} />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Utilization UI */}
          <div className="border border-zinc-900 p-12 space-y-10 flex flex-col bg-zinc-900/5">
            <div className="flex justify-between items-start">
              <div className="space-y-3">
                <div className="font-black text-[10px] text-zinc-600 uppercase tracking-[0.3em]">Core Utilization</div>
                <div className="text-6xl font-black tracking-tighter">{utilData[utilData.length - 1].val}%</div>
              </div>
              <div className="p-3 border border-[#FF3B30]/40 text-[#FF3B30]">
                <Zap size={24} />
              </div>
            </div>
            <div className="flex-1 min-h-[220px] w-full mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={utilData}>
                  <Line 
                    type="step" 
                    dataKey="val" 
                    stroke="#FF3B30" 
                    strokeWidth={4} 
                    dot={false} 
                    animationDuration={200} 
                  />
                  <YAxis hide domain={[0, 100]} />
                  <XAxis hide />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Memory UI */}
          <div className="border border-zinc-900 p-12 space-y-12 bg-zinc-900/5">
            <div className="space-y-3">
              <div className="font-black text-[10px] text-zinc-600 uppercase tracking-[0.3em]">VRAM Pressure</div>
              <div className="text-6xl font-black tracking-tighter">
                {vramUsage.toFixed(1)} <span className="text-xl text-zinc-700 font-black tracking-normal uppercase">/ 24.0 GB</span>
              </div>
            </div>
            
            <div className="space-y-14">
              <div className="relative">
                <div className="h-8 bg-zinc-950 w-full overflow-hidden flex border border-zinc-900">
                  <div className="h-full bg-accent-gradient transition-all duration-700" style={{ width: `${(vramUsage/24)*100}%` }}></div>
                </div>
                <div className="flex justify-between font-black text-[9px] text-zinc-600 mt-4 uppercase tracking-widest">
                  <span>Res Buf: 2.1GB</span>
                  <span>Load Limit: 24.0GB</span>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
                  <span className="font-black text-[10px] uppercase text-zinc-500">Memory Map</span>
                  <span className="text-[10px] font-black uppercase text-zinc-400">Swarm Load Active</span>
                </div>
                <div className="grid grid-cols-2 gap-8 font-black text-[10px] text-zinc-600 uppercase">
                   <div className="space-y-1">
                      <div>L Transformer x1</div>
                      <div className="text-white mono text-xs">{vramUsage > 12 ? '6.2 GB' : '3.1 GB'}</div>
                   </div>
                   <div className="space-y-1">
                      <div>K Cache Reserve</div>
                      <div className="text-white mono text-xs">{vramUsage > 12 ? '4.4 GB' : '2.2 GB'}</div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricTile = ({ label, value, sub, icon }: { label: string, value: string, sub: string, icon: React.ReactNode }) => (
  <div className="bg-[#0A0A0A] p-10 space-y-8 hover:bg-zinc-900/40 transition-all group">
    <div className="flex justify-between items-center">
      <span className="font-black text-[9px] text-zinc-600 uppercase tracking-[0.2em] group-hover:text-zinc-400 transition-colors">{label}</span>
      <span className="text-zinc-800 group-hover:text-[#FF3B30] transition-colors">{icon}</span>
    </div>
    <div className="space-y-2">
      <div className="text-3xl font-black tracking-tighter">{value}</div>
      <div className="font-bold text-[9px] text-zinc-700 uppercase tracking-widest">{sub}</div>
    </div>
  </div>
);
