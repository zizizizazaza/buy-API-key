
import React, { useState } from 'react';
import { Cluster } from '../types';
import { Activity, ArrowRight, Copy, Check, Terminal, Settings, ArrowLeft, Users, Cpu, ShieldAlert } from 'lucide-react';

interface ClusterViewProps {
  // Fix: changed 'clusters[]' to 'Cluster[]' to match the imported type name
  clusters: Cluster[];
  joinedId: string | null;
  onJoin: (id: string) => void;
  onLeave?: () => void;
}

const CodeBlock = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative bg-zinc-950 border border-zinc-900 p-5 mt-3 mb-6 flex justify-between items-center transition-all hover:border-zinc-700">
      <code className="mono text-zinc-300 text-xs break-all tracking-tight">{code}</code>
      <button 
        onClick={handleCopy}
        className="ml-4 p-2 text-zinc-600 hover:text-[#FF3B30] transition-colors"
        title="Copy to clipboard"
      >
        {copied ? <Check size={14} className="text-green-500" /> : <Copy size={16} />}
      </button>
    </div>
  );
};

const MOCK_WORKERS = [
  { ip: '104.18.2.14', gpu: 'RTX 4090', vram: '24GB' },
  { ip: '172.67.13.2', gpu: 'RTX 3090', vram: '24GB' },
  { ip: '198.51.100.42', gpu: 'A100', vram: '80GB' },
  { ip: '203.0.113.88', gpu: 'RTX 4080', vram: '16GB' },
  { ip: '45.33.22.11', gpu: 'RTX 4090', vram: '24GB' }
];

export const ClusterView: React.FC<ClusterViewProps> = ({ clusters, joinedId, onJoin, onLeave }) => {
  const [os, setOs] = useState<'mac' | 'linux'>('linux');
  const [selectedClusterId, setSelectedClusterId] = useState<string | null>(null);

  const selectedCluster = clusters.find(c => c.id === selectedClusterId);

  const handleJoin = (id: string) => {
    onJoin(id);
  };

  const handleLeaveConfirm = () => {
    if (confirm("Terminate Connection? Your Node Will Be Disconnected From The Swarm.")) {
      onLeave?.();
    }
  };

  if (selectedCluster) {
    const isJoinedThis = joinedId === selectedCluster.id;
    const isJoinedOther = joinedId !== null && joinedId !== selectedCluster.id;

    return (
      <div className="p-8 lg:p-20 max-w-[1600px] mx-auto space-y-16">
        <button 
          onClick={() => setSelectedClusterId(null)}
          className="flex items-center gap-3 font-black text-[10px] text-zinc-500 hover:text-white uppercase tracking-widest transition-all mb-10 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
          Back To Registry
        </button>

        <div className="grid lg:grid-cols-12 gap-20">
          <div className="lg:col-span-4 space-y-12">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <span className="mono text-[10px] bg-zinc-900 border border-zinc-800 px-3 py-1 text-zinc-400 uppercase tracking-widest">{selectedCluster.id}</span>
                <span className={`font-black text-[10px] uppercase tracking-widest ${selectedCluster.status === 'ACTIVE' ? 'text-green-500' : 'text-[#FF3B30]'}`}>
                  {selectedCluster.status}
                </span>
              </div>
              <h2 className="text-7xl font-black tracking-tighter leading-none">{selectedCluster.name}</h2>
              <p className="font-bold text-xs text-zinc-500 uppercase tracking-widest">Architecture: {selectedCluster.model}</p>
            </div>

            <div className="border border-zinc-900 p-10 space-y-10 bg-zinc-900/10">
              <div className="grid grid-cols-2 gap-10">
                <div className="space-y-2">
                  <div className="font-bold text-[9px] text-zinc-600 uppercase tracking-widest">Status</div>
                  <div className="text-base font-black">Working</div>
                </div>
                <div className="space-y-2">
                  <div className="font-bold text-[9px] text-zinc-600 uppercase tracking-widest">Active Workers</div>
                  <div className="text-base font-black">{selectedCluster.nodeCount}</div>
                </div>
              </div>

              <div className="pt-10 border-t border-zinc-900">
                {isJoinedThis ? (
                  <button 
                    onClick={handleLeaveConfirm}
                    className="w-full btn-primary border-[#FF3B30] text-[#FF3B30] hover:bg-[#FF3B30] hover:text-white"
                  >
                    Leave Cluster
                  </button>
                ) : (
                  <div className="group relative">
                    <button 
                      disabled={isJoinedOther}
                      onClick={() => handleJoin(selectedCluster.id)}
                      className="w-full btn-primary"
                    >
                      Join Cluster
                    </button>
                    {isJoinedOther && (
                      <div className="absolute top-full left-0 w-full mt-6 p-6 border border-[#FF3B30]/30 bg-[#FF3B30]/5 text-[#FF3B30] font-bold text-[10px] uppercase leading-relaxed text-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <ShieldAlert size={14} className="inline-block mr-2 mb-0.5" />
                        Please Exit Active Cluster First
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-10">
            <div className="flex justify-between items-end border-b border-zinc-900 pb-6">
              <h3 className="text-3xl font-black tracking-tighter">Verified Worker Registry</h3>
              <div className="font-bold text-[9px] text-zinc-600 uppercase tracking-widest">Live Feed Enabled</div>
            </div>
            
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-900">
                  <th className="py-5 font-bold text-[10px] text-zinc-600 uppercase tracking-widest">Node IP</th>
                  <th className="py-5 font-bold text-[10px] text-zinc-600 uppercase tracking-widest">GPU Target</th>
                  <th className="py-5 font-bold text-[10px] text-zinc-600 uppercase tracking-widest text-right">Capacity</th>
                </tr>
              </thead>
              <tbody className="mono text-xs">
                {MOCK_WORKERS.map((w, idx) => (
                  <tr key={idx} className="border-b border-zinc-900/50 hover:bg-zinc-900/20 transition-colors group">
                    <td className="py-6 text-zinc-400 font-bold group-hover:text-white">{w.ip}</td>
                    <td className="py-6 text-zinc-500 uppercase sans font-black">{w.gpu}</td>
                    <td className="py-6 text-zinc-300 text-right font-black sans">{w.vram}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 lg:p-20 max-w-[1600px] mx-auto space-y-40">
      {/* Manifesto Section */}
      <section className="grid lg:grid-cols-12 gap-20 items-start">
        <div className="lg:col-span-9 space-y-16">
          <div className="flex items-center gap-6">
             <div className="h-[3px] w-16 bg-[#FF3B30]"></div>
             <div className="font-black text-[#FF3B30] text-[10px] tracking-[0.5em] uppercase">Protocol Activation Phase</div>
          </div>
          <h2 className="text-7xl lg:text-[10rem] font-black manifesto-title">
            Compute Is <br />
            <span className="text-zinc-800">The New</span> <br />
            <span className="text-transparent bg-clip-text bg-accent-gradient">Currency.</span>
          </h2>
          <p className="text-zinc-400 text-2xl font-light leading-tight max-w-2xl">
            The Hetu distributed P2P network is reshaping compute allocation. Deploy local nodes to participate in global AI inference clusters and secure protocol-level yield.
          </p>
        </div>
        <div className="lg:col-span-3 border-t border-zinc-900 pt-10 hidden lg:block">
           <div className="space-y-6">
            <h3 className="font-bold text-[10px] text-zinc-600 uppercase tracking-widest">Network Stats</h3>
            <div className="text-3xl font-black mono text-zinc-200">84.22 PFLOPS</div>
            <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Nodes Connected: 4,821</div>
          </div>
        </div>
      </section>

      {/* Cluster List View */}
      <section className="space-y-20">
        <div className="flex justify-between items-end">
          <h3 className="text-5xl font-black tracking-tighter">Cluster</h3>
          <div className="font-bold text-[10px] text-zinc-600 uppercase mb-3 tracking-widest">{clusters.length} Available Channels</div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {clusters.map((cluster) => {
            const isJoinedThis = joinedId === cluster.id;
            const canShowButton = joinedId === null || isJoinedThis;

            return (
              <div 
                key={cluster.id} 
                onClick={() => setSelectedClusterId(cluster.id)}
                className="border border-zinc-900 p-10 flex flex-col justify-between group hover:border-[#FF3B30] transition-all bg-[#0A0A0A] min-h-[400px] cursor-pointer"
              >
                <div className="space-y-10">
                  <div className="flex justify-between items-center">
                    <span className="mono text-[10px] text-zinc-500 border border-zinc-800 px-3 py-1 uppercase">{cluster.id}</span>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 font-black text-[10px] text-zinc-500 uppercase">
                        <Users size={12} /> {cluster.nodeCount}
                      </div>
                      <div className={`flex items-center gap-2 font-black text-[10px] uppercase ${cluster.status === 'ACTIVE' ? 'text-[#FF3B30]' : 'text-zinc-700'}`}>
                        <span className={`w-2 h-2 rounded-full ${cluster.status === 'ACTIVE' ? 'bg-[#FF3B30] animate-pulse' : 'bg-zinc-800'}`}></span>
                        {cluster.status}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-4xl font-black leading-none group-hover:text-white transition-colors">{cluster.name}</h4>
                    <p className="font-bold text-[11px] text-zinc-500 uppercase tracking-[0.2em]">Architecture: {cluster.model}</p>
                  </div>
                </div>

                <div className="mt-16">
                  {canShowButton ? (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isJoinedThis) {
                          setSelectedClusterId(cluster.id);
                        } else {
                          handleJoin(cluster.id);
                        }
                      }}
                      className={`w-full btn-primary ${isJoinedThis ? 'bg-[#FF3B30] border-[#FF3B30] text-white' : ''}`}
                    >
                      {isJoinedThis ? 'Joined' : 'Join Cluster'}
                      {!isJoinedThis && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                    </button>
                  ) : (
                    <div className="h-[60px] border border-zinc-900 flex items-center justify-center bg-zinc-950/50">
                       <span className="font-black text-[10px] text-zinc-800 uppercase tracking-[0.3em]">System Locked</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Installation Guide */}
      <section className="space-y-16">
        <div className="flex justify-between items-end border-b border-zinc-900 pb-6">
          <div className="space-y-3">
            <h3 className="text-5xl font-black tracking-tighter">Installation Guide</h3>
            <p className="text-zinc-500 text-lg font-light">A streamlined guide to building a distributed AI inference cluster on your local hardware.</p>
          </div>
          <div className="flex items-center gap-3 font-bold text-[10px] text-zinc-600 uppercase tracking-widest">
            <Terminal size={14} />
            Guide Version: 4.0.1
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4 space-y-10">
            <div className="border border-[#FF3B30]/30 bg-[#FF3B30]/5 p-10 space-y-8">
              <div className="flex items-center gap-4 text-[#FF3B30]">
                <Settings size={24} />
                <h4 className="font-black tracking-widest text-base">Prerequisites</h4>
              </div>
              <ul className="space-y-6 font-bold text-xs uppercase">
                <li className="flex justify-between items-center border-b border-zinc-900 pb-3">
                  <span className="text-zinc-500">Python Version</span>
                  <span className="text-zinc-200 mono">3.11.0 ≤ V &lt; 3.14.0</span>
                </li>
                <li className="flex justify-between items-center border-b border-zinc-900 pb-3">
                  <span className="text-zinc-500">Git Core</span>
                  <span className="text-zinc-200">Installed</span>
                </li>
                <li className="flex justify-between items-center border-b border-zinc-900 pb-3">
                  <span className="text-zinc-500">Architecture</span>
                  <span className="text-zinc-200">X86_64 / ARM64</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-12">
            <div className="space-y-10">
              <div className="space-y-4">
                <div className="flex items-center gap-5">
                  <span className="bg-zinc-900 text-white w-10 h-10 flex items-center justify-center font-black text-sm mono border border-zinc-800">01</span>
                  <h5 className="font-black tracking-widest text-base text-zinc-300">Clone Repository</h5>
                </div>
                <CodeBlock code="git clone https://github.com/GradientHQ/hetu.git && cd hetu" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-5">
                  <span className="bg-zinc-900 text-white w-10 h-10 flex items-center justify-center font-black text-sm mono border border-zinc-800">02</span>
                  <h5 className="font-black tracking-widest text-base text-zinc-300">Setup Virtual Environment</h5>
                </div>
                <CodeBlock code="python3 -m venv ./venv && source ./venv/bin/activate" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <span className="bg-zinc-900 text-white w-10 h-10 flex items-center justify-center font-black text-sm mono border border-zinc-800">03</span>
                    <h5 className="font-black tracking-widest text-base text-zinc-300">Install Dependencies</h5>
                  </div>
                  <div className="flex bg-zinc-950 border border-zinc-800 p-1">
                    <button 
                      onClick={() => setOs('mac')}
                      className={`px-5 py-2 text-[10px] font-black uppercase transition-all ${os === 'mac' ? 'bg-[#FF3B30] text-white' : 'text-zinc-600 hover:text-zinc-300'}`}
                    >
                      macOS
                    </button>
                    <button 
                      onClick={() => setOs('linux')}
                      className={`px-5 py-2 text-[10px] font-black uppercase transition-all ${os === 'linux' ? 'bg-[#FF3B30] text-white' : 'text-zinc-600 hover:text-zinc-300'}`}
                    >
                      Linux
                    </button>
                  </div>
                </div>
                <CodeBlock code={os === 'mac' ? "pip install -e '.[mac]'" : "pip install -e ."} />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-5">
                  <span className="bg-zinc-900 text-white w-10 h-10 flex items-center justify-center font-black text-sm mono border border-zinc-800">04</span>
                  <h5 className="font-black tracking-widest text-base text-zinc-300">Run Application</h5>
                </div>
                <CodeBlock code="hetu run" />
              </div>
            </div>

            <div className="bg-zinc-900/20 border border-zinc-800 p-8 flex items-center justify-between shadow-inner">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 border border-green-500/30 flex items-center justify-center text-green-500 bg-green-500/5">
                  <Check size={24} />
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-black text-zinc-200">Service Deployment Successful</div>
                  <div className="mono text-[10px] text-zinc-600 uppercase">Access <span className="text-[#FF3B30] font-bold">http://localhost:3001</span> To Configure Instance</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
