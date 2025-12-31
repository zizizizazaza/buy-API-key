
import React from 'react';
import { EarningRecord } from '../types';
import { TrendingUp, History, ArrowUpRight } from 'lucide-react';

const MOCK_HISTORY: EarningRecord[] = [
  { id: 'TX_8829_A', nodeId: 'NODE_X', tokens: 842.2, amount: 24.42, type: 'FLUX', timestamp: '2024-05-21 16:12' },
  { id: 'TX_8829_B', nodeId: 'NODE_X', tokens: 0, amount: 4.10, type: 'CREDIT', timestamp: '2024-05-21 14:00' },
  { id: 'TX_8829_C', nodeId: 'NODE_X', tokens: 321.5, amount: 9.85, type: 'FLUX', timestamp: '2024-05-21 11:32' },
  { id: 'TX_8828_D', nodeId: 'NODE_X', tokens: 0, amount: 3.20, type: 'CREDIT', timestamp: '2024-05-21 09:12' }
];

export const EarningsView: React.FC = () => {
  return (
    <div className="p-8 lg:p-20 max-w-[1600px] mx-auto space-y-32">
      <div className="grid lg:grid-cols-12 gap-20 items-start">
        <div className="lg:col-span-8 space-y-20">
          <div className="space-y-8">
            <h2 className="text-8xl font-black tracking-tighter leading-none">
              Protocol <br />
              <span className="text-[#FF3B30]">Settlement</span>
            </h2>
            <p className="text-zinc-500 max-w-xl text-xl font-light leading-tight">
              Real-time reward propagation from the parallel execution layer. 
              Compute output is verified and settled in FLUX tokens.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-zinc-900 border border-zinc-900 overflow-hidden shadow-2xl">
            <div className="bg-[#0A0A0A] p-12 space-y-12 group hover:bg-zinc-900/40 transition-all">
              <div className="flex justify-between items-start">
                <div className="space-y-3">
                  <div className="font-black text-[10px] text-zinc-600 uppercase tracking-[0.3em]">Total Inference Yield</div>
                  <div className="text-6xl font-black uppercase tracking-tighter">
                    2,842.40 <span className="text-lg text-[#FF3B30] mono font-bold">FLUX</span>
                  </div>
                </div>
                <div className="p-3 border border-[#FF3B30]/30 text-[#FF3B30]">
                  <TrendingUp size={28} />
                </div>
              </div>
              <div className="pt-10 border-t border-zinc-900 flex justify-between items-center">
                <span className="font-bold text-[10px] text-zinc-500 uppercase tracking-widest">Mark To Market: $1,422.05</span>
                <span className="text-[#FF3B30] font-black text-[10px] uppercase tracking-wider">+18.2% Weekly</span>
              </div>
            </div>

            <div className="bg-[#0A0A0A] p-12 space-y-12 group hover:bg-zinc-900/40 transition-all">
              <div className="flex justify-between items-start">
                <div className="space-y-3">
                  <div className="font-black text-[10px] text-zinc-600 uppercase tracking-[0.3em]">Standby Credits</div>
                  <div className="text-6xl font-black uppercase tracking-tighter">
                    124.50 <span className="text-lg text-zinc-600 mono font-bold">CREDITS</span>
                  </div>
                </div>
                <div className="p-3 border border-zinc-800 text-zinc-700">
                  <History size={28} />
                </div>
              </div>
              <div className="pt-10 border-t border-zinc-900 flex justify-between items-center">
                <span className="font-bold text-[10px] text-zinc-500 uppercase tracking-widest">Uptime Reliability: 100%</span>
                <span className="text-zinc-500 font-black text-[10px] uppercase tracking-wider">Epoch ID: 482</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 lg:sticky lg:top-40">
          <div className="border border-zinc-900 p-12 space-y-12 bg-zinc-900/5 shadow-2xl">
            <div className="space-y-5">
              <h3 className="text-4xl font-black tracking-tighter">Liquidity Bridge</h3>
              <p className="font-bold text-[11px] text-zinc-500 leading-relaxed uppercase tracking-wider">
                Transfer verified protocol rewards to a private cryptographic wallet. Requires network level clearance.
              </p>
            </div>
            
            <div className="space-y-6">
              <button 
                disabled
                className="w-full btn-primary bg-white text-black hover:bg-[#FF3B30] hover:text-white"
              >
                Initiate Withdrawal
              </button>
              <div className="text-center">
                <span className="font-black text-[10px] text-zinc-700 uppercase tracking-[0.2em]">Next Settle Cycle: 08:44:12</span>
              </div>
            </div>

            <div className="pt-12 border-t border-zinc-900 grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <div className="font-black text-[10px] text-zinc-600 uppercase tracking-widest">Gas Status</div>
                <div className="text-sm font-black text-[#FF3B30]">Low Optimal</div>
              </div>
              <div className="space-y-2">
                <div className="font-black text-[10px] text-zinc-600 uppercase tracking-widest">Network Fee</div>
                <div className="text-sm font-black text-white">0.05%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="space-y-16">
        <div className="flex justify-between items-end border-b border-zinc-900 pb-6">
          <h3 className="text-4xl font-black tracking-tighter">Ledger Verification</h3>
          <div className="flex gap-12">
             <button className="font-black text-[11px] text-zinc-600 hover:text-[#FF3B30] transition-colors uppercase tracking-widest">Export Data</button>
             <button className="font-black text-[11px] text-zinc-600 hover:text-[#FF3B30] transition-colors uppercase tracking-widest">View Scanner</button>
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-zinc-900">
                <th className="py-8 font-black text-[11px] text-zinc-700 uppercase tracking-[0.2em]">Sequence Hash</th>
                <th className="py-8 font-black text-[11px] text-zinc-700 uppercase tracking-[0.2em]">Compute Task</th>
                <th className="py-8 font-black text-[11px] text-zinc-700 uppercase tracking-[0.2em]">Yield Type</th>
                <th className="py-8 font-black text-[11px] text-zinc-700 uppercase tracking-[0.2em]">Timestamp</th>
                <th className="py-8 font-black text-[11px] text-zinc-700 uppercase tracking-[0.2em] text-right">Settlement</th>
              </tr>
            </thead>
            <tbody className="mono text-xs font-medium">
              {MOCK_HISTORY.map((row) => (
                <tr key={row.id} className="border-b border-zinc-900 group hover:bg-zinc-900/20 transition-all">
                  <td className="py-10 text-zinc-500 uppercase font-black">{row.id}</td>
                  <td className="py-10">
                    {row.tokens > 0 ? (
                      <div className="flex items-center gap-3">
                        <span className="text-zinc-200 sans font-black text-sm">{row.tokens.toFixed(1)} Tokens Processed</span>
                        <ArrowUpRight size={14} className="text-[#FF3B30]" />
                      </div>
                    ) : (
                      <span className="text-zinc-700 sans font-black text-xs">System Standby Pulse</span>
                    )}
                  </td>
                  <td className="py-10">
                    <span className={`px-3 py-1 border font-black text-[10px] sans ${row.type === 'FLUX' ? 'border-[#FF3B30]/30 text-[#FF3B30]' : 'border-zinc-800 text-zinc-600'}`}>
                      {row.type}
                    </span>
                  </td>
                  <td className="py-10 text-zinc-600 uppercase tracking-tighter sans font-black">{row.timestamp}</td>
                  <td className="py-10 text-right font-black text-white text-xl sans">
                    +{row.amount.toFixed(2)} <span className="text-xs text-zinc-600">{row.type}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
