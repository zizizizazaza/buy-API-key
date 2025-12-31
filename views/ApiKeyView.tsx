
import React, { useState } from 'react';
import { 
  CreditCard, Plus, Copy, Check, ShieldAlert, Zap, History, X, 
  Terminal, Globe, Cpu, ZapOff, ShieldCheck, Gift, Code2, 
  Wrench, VenetianMask, ChevronLeft, ChevronRight, MessageSquare,
  Eye, EyeOff, Wallet, ArrowRight as ArrowIcon, Shield, Layers, Users
} from 'lucide-react';
import { ApiKey, PricingModel, Transaction } from '../types';
import { NavigationPath } from '../App';

interface ApiKeyViewProps {
  activeSubPath: NavigationPath;
  setActivePath: (path: NavigationPath) => void;
}

// Extended Pricing Model to include Input/Output specific pricing
interface ExtendedPricingModel extends PricingModel {
  provider: 'HETU Spot' | 'Official' | 'P2P Cluster';
  context: string;
  marketPriceInput: number;
  isUncensored?: boolean;
  isHot?: boolean;
  isFree?: boolean;
}

const PRICING_DATA: ExtendedPricingModel[] = [
  // User Requested Free / P2P Series
  { name: 'OpenAI/GPT-OSS-20B', category: 'P2P Network', inputPrice: 0.00, outputPrice: 0.00, note: 'Community Node', company: { name: 'OSS', color: '#74aa9c', initial: 'O' }, provider: 'P2P Cluster', context: '32k', marketPriceInput: 0.00, isFree: true },
  { name: 'Google/Gemini-2.0-Flash-Exp', category: 'Community', inputPrice: 0.00, outputPrice: 0.00, note: 'Testing Phase', company: { name: 'Google', color: '#4285F4', initial: 'G' }, provider: 'P2P Cluster', context: '1M', marketPriceInput: 0.00, isFree: true },
  { name: 'Google/Gemma-3-27B-IT', category: 'Efficiency', inputPrice: 0.00, outputPrice: 0.00, note: 'Lightweight', company: { name: 'Google', color: '#4285F4', initial: 'G' }, provider: 'P2P Cluster', context: '8k', marketPriceInput: 0.00, isFree: true },
  { name: 'Meta/Llama-3.3-70B-Instruct', category: 'OSS Flagship', inputPrice: 0.00, outputPrice: 0.00, note: 'SOTA Open Source', company: { name: 'Meta', color: '#0668E1', initial: 'M' }, provider: 'P2P Cluster', context: '128k', marketPriceInput: 0.00, isFree: true },
  { name: 'Alibaba/Qwen3-235B-A22B', category: 'Reasoning', inputPrice: 0.00, outputPrice: 0.00, note: 'Extreme Scale', company: { name: 'Alibaba', color: '#FF6A00', initial: 'A' }, provider: 'P2P Cluster', context: '128k', marketPriceInput: 0.00, isFree: true },
  { name: 'Amazon/Nova-2-Lite-V1', category: 'Efficiency', inputPrice: 0.00, outputPrice: 0.00, note: 'Low Latency', company: { name: 'Amazon', color: '#FF9900', initial: 'A' }, provider: 'P2P Cluster', context: '64k', marketPriceInput: 0.00, isFree: true },
  { name: 'TNG/DeepSeek-R1T-Chimera', category: 'Reasoning', inputPrice: 0.00, outputPrice: 0.00, note: 'Distributed Relay', company: { name: 'TNG', color: '#FF3B30', initial: 'T' }, provider: 'P2P Cluster', context: '128k', marketPriceInput: 0.00, isFree: true, isUncensored: true },
  { name: 'TNG/DeepSeek-R1T2-Chimera', category: 'Reasoning', inputPrice: 0.00, outputPrice: 0.00, note: 'Enhanced Logic', company: { name: 'TNG', color: '#FF3B30', initial: 'T' }, provider: 'P2P Cluster', context: '128k', marketPriceInput: 0.00, isFree: true, isUncensored: true },
  
  // OpenAI Series
  { name: 'OpenAI/GPT-5.2', category: 'Next Gen', inputPrice: 1.75, outputPrice: 14.00, note: 'Reasoning SOTA', company: { name: 'OpenAI', color: '#74aa9c', initial: 'O' }, provider: 'Official', context: '128k', marketPriceInput: 2.50, isHot: true },
  { name: 'OpenAI/GPT-5.2 Pro', category: 'Elite', inputPrice: 21.00, outputPrice: 168.00, note: 'Maximum Intelligence', company: { name: 'OpenAI', color: '#74aa9c', initial: 'O' }, provider: 'Official', context: '200k', marketPriceInput: 30.00 },
  { name: 'OpenAI/GPT-5.1', category: 'Flagship', inputPrice: 1.25, outputPrice: 10.00, note: 'Balanced Power', company: { name: 'OpenAI', color: '#74aa9c', initial: 'O' }, provider: 'Official', context: '128k', marketPriceInput: 1.50 },
  { name: 'OpenAI/GPT-5.1-Codex', category: 'Coding', inputPrice: 1.25, outputPrice: 10.00, note: 'Expert Dev', company: { name: 'OpenAI', color: '#74aa9c', initial: 'O' }, provider: 'Official', context: '128k', marketPriceInput: 1.50 },
  { name: 'OpenAI/GPT-5-Nano', category: 'Fast', inputPrice: 0.05, outputPrice: 0.40, note: 'Extreme Speed', company: { name: 'OpenAI', color: '#74aa9c', initial: 'O' }, provider: 'HETU Spot', context: '32k', marketPriceInput: 0.10 },
  { name: 'OpenAI/GPT-4o', category: 'Multimodal', inputPrice: 2.50, outputPrice: 10.00, note: 'Omni Vision', company: { name: 'OpenAI', color: '#74aa9c', initial: 'O' }, provider: 'Official', context: '128k', marketPriceInput: 5.00 },
  { name: 'OpenAI/GPT-4o-Mini', category: 'Fast', inputPrice: 0.15, outputPrice: 0.60, note: 'Efficient Multi', company: { name: 'OpenAI', color: '#74aa9c', initial: 'O' }, provider: 'Official', context: '128k', marketPriceInput: 0.25 },
  { name: 'OpenAI/GPT-4.1', category: 'Reliable', inputPrice: 2.00, outputPrice: 8.00, note: 'Legacy Stability', company: { name: 'OpenAI', color: '#74aa9c', initial: 'O' }, provider: 'Official', context: '128k', marketPriceInput: 3.00 },
  { name: 'OpenAI/GPT-4.1-Nano', category: 'Tiny', inputPrice: 0.10, outputPrice: 0.40, note: 'Legacy Speed', company: { name: 'OpenAI', color: '#74aa9c', initial: 'O' }, provider: 'HETU Spot', context: '32k', marketPriceInput: 0.15 },
  { name: 'OpenAI/GPT-Image-1', category: 'Image Gen', inputPrice: 5.00, outputPrice: 10.00, note: 'Visual Core', company: { name: 'OpenAI', color: '#74aa9c', initial: 'O' }, provider: 'Official', context: '1k', marketPriceInput: 7.00 },

  // Anthropic Series
  { name: 'Anthropic/Claude Opus 4.5', category: 'Cognitive', inputPrice: 5.00, outputPrice: 25.00, note: 'Human-like Reason', company: { name: 'Anthropic', color: '#D97757', initial: 'A' }, provider: 'Official', context: '200k', marketPriceInput: 8.00, isHot: true },
  { name: 'Anthropic/Claude Opus 4', category: 'Reasoning', inputPrice: 15.00, outputPrice: 75.00, note: 'SOTA Logic', company: { name: 'Anthropic', color: '#D97757', initial: 'A' }, provider: 'Official', context: '200k', marketPriceInput: 20.00 },
  { name: 'Anthropic/Claude Sonnet 4.5', category: 'Balanced', inputPrice: 3.00, outputPrice: 15.00, note: 'Daily Driver', company: { name: 'Anthropic', color: '#D97757', initial: 'A' }, provider: 'Official', context: '200k', marketPriceInput: 4.50 },

  // xAI Series
  { name: 'xAI/Grok 4', category: 'Real-time', inputPrice: 3.00, outputPrice: 15.00, note: 'Direct Access', company: { name: 'xAI', color: '#FFFFFF', initial: 'X' }, provider: 'Official', context: '128k', marketPriceInput: 5.00 },
  { name: 'xAI/Grok 4 Fast', category: 'Efficiency', inputPrice: 0.20, outputPrice: 0.50, note: 'Rapid X Search', company: { name: 'xAI', color: '#FFFFFF', initial: 'X' }, provider: 'HETU Spot', context: '128k', marketPriceInput: 0.40 },
  { name: 'xAI/Grok 4.1 Fast', category: 'Efficiency', inputPrice: 0.20, outputPrice: 0.50, note: 'Live Stream', company: { name: 'xAI', color: '#FFFFFF', initial: 'X' }, provider: 'HETU Spot', context: '128k', marketPriceInput: 0.40 },
  { name: 'xAI/Grok Code Fast 1', category: 'Coding', inputPrice: 0.20, outputPrice: 1.50, note: 'Dev Optimized', company: { name: 'xAI', color: '#FFFFFF', initial: 'X' }, provider: 'HETU Spot', context: '128k', marketPriceInput: 0.50 },
  { name: 'xAI/Grok 3 Mini', category: 'Tiny', inputPrice: 0.30, outputPrice: 0.50, note: 'Minimal Core', company: { name: 'xAI', color: '#FFFFFF', initial: 'X' }, provider: 'HETU Spot', context: '32k', marketPriceInput: 0.60 },

  // DeepSeek Series
  { name: 'DeepSeek/DeepSeek-V3.2', category: 'Efficiency', inputPrice: 0.10, outputPrice: 0.45, note: 'Price King', company: { name: 'DeepSeek', color: '#6200EE', initial: 'D' }, provider: 'HETU Spot', context: '128k', marketPriceInput: 0.20, isHot: true },
  { name: 'DeepSeek/DeepSeek-V3', category: 'Efficiency', inputPrice: 0.14, outputPrice: 0.28, note: 'Benchmark Leader', company: { name: 'DeepSeek', color: '#6200EE', initial: 'D' }, provider: 'HETU Spot', context: '128k', marketPriceInput: 0.25 },
  { name: 'DeepSeek/DeepSeek-R1', category: 'Reasoning', inputPrice: 0.55, outputPrice: 2.19, note: 'Logic Focused', company: { name: 'DeepSeek', color: '#6200EE', initial: 'D' }, provider: 'Official', context: '128k', marketPriceInput: 0.80 },

  // Google Series
  { name: 'Google/Gemini 2.5 Flash', category: 'Fast', inputPrice: 0.10, outputPrice: 0.40, note: 'Speed/Quality', company: { name: 'Google', color: '#4285F4', initial: 'G' }, provider: 'HETU Spot', context: '1M', marketPriceInput: 0.15 },
];

const MOCK_KEYS: ApiKey[] = [
  { id: '1', name: 'Dev_Environment_01', key: 'sk-hetu-823123456789012k', maskedKey: 'sk-hetu-823...12k', createdAt: '2024-05-10', lastUsed: '2 hours ago', status: 'ACTIVE' }
];

const MOCK_TXS: Transaction[] = [
  { id: 'TX_USDC_001', amount: 50.00, timestamp: '2024-05-20 14:22', status: 'SUCCESS', channel: 'USDC' },
  { id: 'TX_USDC_002', amount: 100.00, timestamp: '2024-05-18 09:11', status: 'SUCCESS', channel: 'USDC' }
];

export const ApiKeyView: React.FC<ApiKeyViewProps> = ({ activeSubPath, setActivePath }) => {
  const [balance, setBalance] = useState(150.45);
  const [keys, setKeys] = useState<ApiKey[]>(MOCK_KEYS);
  const [showRefill, setShowRefill] = useState(false);
  const [newKeyModal, setNewKeyModal] = useState<{ show: boolean; key: string | null; name: string }>({ show: false, key: null, name: '' });
  const [refillAmount, setRefillAmount] = useState<string>('50');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCreateKey = () => {
    const newId = (keys.length + 1).toString();
    const fullKey = `sk-hetu-${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    const newKeyEntry: ApiKey = {
      id: newId,
      name: newKeyModal.name || `Key_${newId}`,
      key: fullKey,
      maskedKey: `${fullKey.substring(0, 10)}...${fullKey.substring(fullKey.length - 4)}`,
      createdAt: new Date().toISOString().split('T')[0],
      lastUsed: 'Never',
      status: 'ACTIVE'
    };
    setKeys([newKeyEntry, ...keys]);
    setNewKeyModal({ ...newKeyModal, key: fullKey });
  };

  const handleRefill = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setBalance(prev => prev + parseFloat(refillAmount));
      setIsProcessing(false);
      setShowRefill(false);
    }, 2000);
  };

  return (
    <div className="p-8 lg:p-20 max-w-[1600px] mx-auto space-y-24">
      {activeSubPath === 'API_KEY_PRICING' ? (
        <PricingSection setActivePath={setActivePath} />
      ) : (
        <ManagementSection 
          balance={balance} 
          keys={keys} 
          onOpenRefill={() => setShowRefill(true)} 
          onCreateKey={() => setNewKeyModal({ show: true, key: null, name: '' })}
        />
      )}

      {/* Recharge Modal */}
      {showRefill && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <div className="w-full max-w-xl border border-main bg-sub p-12 space-y-12">
            <div className="flex justify-between items-start">
              <h3 className="text-4xl font-black tracking-tighter uppercase text-main">Recharge</h3>
              <button onClick={() => setShowRefill(false)} className="text-dim hover:text-main transition-colors"><X size={24}/></button>
            </div>
            
            <div className="space-y-6">
              <label className="font-black text-[10px] text-dim uppercase tracking-widest">Select Deposit Amount (USDC)</label>
              <div className="grid grid-cols-4 gap-4">
                {['50', '100', '500', '1000'].map(amt => (
                  <button 
                    key={amt}
                    onClick={() => setRefillAmount(amt)}
                    className={`border p-4 font-black text-xs transition-all ${refillAmount === amt ? 'border-[#FF3B30] text-[#FF3B30] bg-[#FF3B30]/5' : 'border-main text-dim hover:border-main'}`}
                  >
                    ${amt}
                  </button>
                ))}
              </div>
              <div className="relative mt-4">
                <input 
                  type="number" 
                  value={refillAmount}
                  onChange={(e) => setRefillAmount(e.target.value)}
                  placeholder="Custom Amount"
                  className="w-full bg-main border border-main p-5 font-black text-xl text-main focus:border-[#FF3B30] outline-none"
                />
                <span className="absolute right-5 top-1/2 -translate-y-1/2 font-black text-dim">USDC</span>
              </div>
            </div>

            <button 
              onClick={handleRefill}
              disabled={isProcessing}
              className="w-full btn-primary h-20 text-xl"
            >
              {isProcessing ? 'SYNCHRONIZING LEDGER...' : 'INITIATE DEPOSIT'}
            </button>
            
            <p className="text-[9px] text-dim font-bold uppercase tracking-widest text-center">
              Transactions are settled on the parallel execution layer. Low gas fees apply.
            </p>
          </div>
        </div>
      )}

      {/* New Key Modal */}
      {newKeyModal.show && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <div className="w-full max-w-2xl border border-main bg-sub p-12 space-y-10">
            {newKeyModal.key ? (
              <>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-green-500">
                    <ShieldAlert size={20} />
                    <h3 className="text-2xl font-black uppercase tracking-tighter">Security Protocol Activated</h3>
                  </div>
                  <p className="text-dim font-bold text-xs uppercase leading-relaxed">
                    This secret key will only be displayed once. If you lose this key, you will need to revoke it and generate a new one. Store it in a secure hardware vault.
                  </p>
                </div>
                <div className="bg-main border border-main p-6 flex justify-between items-center group">
                  <code className="mono text-sm text-[#FF3B30] break-all">{newKeyModal.key}</code>
                  <button 
                    onClick={() => {navigator.clipboard.writeText(newKeyModal.key!); alert('Key Copied')}} 
                    className="ml-4 p-2 text-dim hover:text-main transition-colors"
                  >
                    <Copy size={20}/>
                  </button>
                </div>
                <button onClick={() => setNewKeyModal({ show: false, key: null, name: '' })} className="w-full btn-primary">I HAVE SECURED THE KEY</button>
              </>
            ) : (
              <>
                <h3 className="text-3xl font-black uppercase tracking-tighter text-main">Issue New Access Token</h3>
                <div className="space-y-4">
                  <label className="font-black text-[10px] text-dim uppercase tracking-widest">Key Nickname</label>
                  <input 
                    type="text" 
                    value={newKeyModal.name}
                    onChange={(e) => setNewKeyModal({...newKeyModal, name: e.target.value})}
                    placeholder="e.g. Production_Env"
                    className="w-full bg-main border border-main p-5 font-black text-xl text-main focus:border-[#FF3B30] outline-none"
                    autoFocus
                  />
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setNewKeyModal({ show: false, key: null, name: '' })} className="flex-1 btn-outline">Cancel</button>
                  <button 
                    onClick={handleCreateKey} 
                    disabled={!newKeyModal.name}
                    className="flex-2 btn-primary px-12 disabled:opacity-30"
                  >
                    Generate Key
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const PricingSection = ({ setActivePath }: { setActivePath: (path: NavigationPath) => void }) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [isSimConnected, setIsSimConnected] = useState(false);
  const [activeSnippetTab, setActiveSnippetTab] = useState<'python' | 'curl' | 'apps'>('python');
  
  const totalPages = Math.ceil(PRICING_DATA.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = PRICING_DATA.slice(startIndex, startIndex + itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const copyToClipboard = (text: string, msg: string) => {
    navigator.clipboard.writeText(text);
    alert(msg);
  };

  return (
    <div className="space-y-32 animate-in fade-in duration-700">
      {/* Module A — Hero Section */}
      <section className="space-y-12">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <span className="mono text-[10px] text-[#FF3B30] font-black tracking-[0.4em]">Powered by idle RTX 4090 GPUs · Pay with USDT · No KYC · No logs · No censorship</span>
            <div className="h-[1px] flex-1 bg-main"></div>
          </div>
          <h2 className="text-5xl lg:text-7xl font-black tracking-tighter leading-[0.9] text-main">
            Idle GPUs In.<br />
            <span className="text-transparent bg-clip-text bg-accent-gradient">Lower Prices Out.</span>
          </h2>
          <p className="text-dim text-2xl font-light max-w-3xl leading-snug">
            Cut your inference costs by up to 85% using our global network of idle GPUs. Compatible with OpenAI SDKs. No KYC required.
          </p>
          <div className="flex items-center gap-3 text-dim font-bold text-xs uppercase tracking-widest">
            <Users size={14} className="text-[#FF3B30]"/> Trusted by 5,000+ Builders & Decentralized Nodes.
          </div>
        </div>
        <div className="flex gap-6">
          <button className="btn-primary px-10 h-16 text-xs" onClick={() => setIsSimConnected(true)}>Start for Free with 500k Tokens</button>
          <button className="btn-outline px-10 h-16 text-xs flex items-center gap-3">
             View Documentation <ArrowIcon size={16}/>
          </button>
        </div>
      </section>

      {/* Module B — Pricing Plans (NEW) */}
      <section className="grid lg:grid-cols-3 gap-px bg-main border border-main">
        {/* Plan A: Hobbyist */}
        <div className="bg-sub p-12 space-y-10 border-r border-main hover:bg-main transition-colors flex flex-col">
          <div className="space-y-4">
            <span className="text-[10px] font-black tracking-[0.3em] text-dim uppercase">Target: Students & Experiments</span>
            <h4 className="text-4xl font-black tracking-tighter uppercase">Hobbyist</h4>
            <div className="text-5xl font-black text-main">$0<span className="text-base text-dim lowercase font-normal"> / month</span></div>
            <p className="text-xs font-bold text-[#FF3B30] uppercase tracking-widest">Forever Free Tier</p>
          </div>
          
          <ul className="space-y-6 flex-1 py-10 border-y border-main/10 mt-6">
            <li className="flex items-start gap-3 text-xs font-medium text-dim uppercase leading-relaxed">
              <Check size={14} className="text-green-500 shrink-0 mt-0.5"/>
              <span><b>50,000 Free Tokens</b> replenished weekly (P2P Models)</span>
            </li>
            <li className="flex items-start gap-3 text-xs font-medium text-dim uppercase leading-relaxed">
              <Check size={14} className="text-green-500 shrink-0 mt-0.5"/>
              <span><b>$0.015 / 1M Tokens</b> for Llama-3-8B & Qwen-7B</span>
            </li>
            <li className="flex items-start gap-3 text-xs font-medium text-dim uppercase leading-relaxed">
              <Check size={14} className="text-green-500 shrink-0 mt-0.5"/>
              <span><b>Optional:</b> $50/Year Unlimited Pass for 7B/8B models</span>
            </li>
            <li className="flex items-start gap-3 text-xs font-medium text-dim uppercase leading-relaxed">
              <Check size={14} className="text-green-500 shrink-0 mt-0.5"/>
              <span>Community Support</span>
            </li>
          </ul>

          <button className="btn-outline w-full h-16 mt-10">Start Hacking</button>
        </div>

        {/* Plan B: Pro Builder */}
        <div className="bg-sub p-12 space-y-10 border-r border-main hover:bg-main transition-colors flex flex-col relative">
          <div className="absolute top-0 right-0 bg-[#FF3B30] text-white text-[9px] font-black px-4 py-1 uppercase tracking-widest">Most Popular</div>
          <div className="space-y-4">
            <span className="text-[10px] font-black tracking-[0.3em] text-dim uppercase">Target: Startups & Production</span>
            <h4 className="text-4xl font-black tracking-tighter uppercase">Pro Builder</h4>
            <div className="text-5xl font-black text-main">$8<span className="text-base text-dim lowercase font-normal"> / resource pack</span></div>
            <p className="text-xs font-bold text-[#FF3B30] uppercase tracking-widest">Scale Fast</p>
          </div>
          
          <ul className="space-y-6 flex-1 py-10 border-y border-main/10 mt-6">
            <li className="flex items-start gap-3 text-xs font-medium text-dim uppercase leading-relaxed">
              <Check size={14} className="text-green-500 shrink-0 mt-0.5"/>
              <span><b>5 Million Tokens</b> included (Valid 90 days)</span>
            </li>
            <li className="flex items-start gap-3 text-xs font-medium text-dim uppercase leading-relaxed">
              <Check size={14} className="text-green-500 shrink-0 mt-0.5"/>
              <span><b>Debug Mode:</b> Free 100 tokens/min for dev</span>
            </li>
            <li className="flex items-start gap-3 text-xs font-medium text-dim uppercase leading-relaxed">
              <Check size={14} className="text-green-500 shrink-0 mt-0.5"/>
              <span><b>Smart Routing:</b> P2P & Data Center auto-switch</span>
            </li>
            <li className="flex items-start gap-3 text-xs font-medium text-dim uppercase leading-relaxed">
              <Check size={14} className="text-green-500 shrink-0 mt-0.5"/>
              <span>Full Model Library Access (GPT-4o, Claude 3.5)</span>
            </li>
          </ul>

          <button className="btn-primary w-full h-16 mt-10">Buy Starter Pack</button>
        </div>

        {/* Plan C: Enterprise */}
        <div className="bg-sub p-12 space-y-10 hover:bg-main transition-colors flex flex-col">
          <div className="space-y-4">
            <span className="text-[10px] font-black tracking-[0.3em] text-dim uppercase">Target: High-Volume Businesses</span>
            <h4 className="text-4xl font-black tracking-tighter uppercase">Enterprise</h4>
            <div className="text-5xl font-black text-main">Contact</div>
            <p className="text-xs font-bold text-[#FF3B30] uppercase tracking-widest">Scale & Security</p>
          </div>
          
          <ul className="space-y-6 flex-1 py-10 border-y border-main/10 mt-6">
            <li className="flex items-start gap-3 text-xs font-medium text-dim uppercase leading-relaxed">
              <Check size={14} className="text-green-500 shrink-0 mt-0.5"/>
              <span><b>Volume Discount:</b> 20% off for >100M tokens/mo</span>
            </li>
            <li className="flex items-start gap-3 text-xs font-medium text-dim uppercase leading-relaxed">
              <Check size={14} className="text-green-500 shrink-0 mt-0.5"/>
              <span><b>Dedicated Instances:</b> QPS > 5,000 guaranteed</span>
            </li>
            <li className="flex items-start gap-3 text-xs font-medium text-dim uppercase leading-relaxed">
              <Check size={14} className="text-green-500 shrink-0 mt-0.5"/>
              <span><b>Private Deployment:</b> Fine-tuning options</span>
            </li>
            <li className="flex items-start gap-3 text-xs font-medium text-dim uppercase leading-relaxed">
              <Check size={14} className="text-green-500 shrink-0 mt-0.5"/>
              <span>99.9% Uptime SLA & Account Manager</span>
            </li>
          </ul>

          <button className="btn-outline w-full h-16 mt-10">Contact Sales</button>
        </div>
      </section>

      {/* Module C — Core Pricing Table (UNCHANGED per user) */}
      <section className="space-y-12">
        <div className="flex justify-between items-end border-b border-main pb-8">
           <div className="space-y-2">
             <h3 className="text-5xl font-black tracking-tighter leading-none">Model Registry</h3>
             <p className="text-dim text-sm font-bold tracking-widest">Simple pricing. No bundles. No tricks.</p>
           </div>
           <div className="flex gap-4">
             <button 
               onClick={handlePrev} 
               disabled={currentPage === 1}
               className="p-3 border border-main text-dim hover:text-[#FF3B30] hover:border-[#FF3B30] disabled:opacity-20 transition-all"
             >
               <ChevronLeft size={20}/>
             </button>
             <button 
               onClick={handleNext} 
               disabled={currentPage === totalPages}
               className="p-3 border border-main text-dim hover:text-[#FF3B30] hover:border-[#FF3B30] disabled:opacity-20 transition-all"
             >
               <ChevronRight size={20}/>
             </button>
           </div>
        </div>
        
        <div className="border border-main overflow-x-auto bg-sub/10 backdrop-blur-sm">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-sub/50 border-b border-main">
                <th className="px-8 py-6 font-black text-[10px] text-dim uppercase tracking-[0.2em]">Model Architecture</th>
                <th className="px-8 py-6 font-black text-[10px] text-dim uppercase tracking-[0.2em]">Provider</th>
                <th className="px-8 py-6 font-black text-[10px] text-dim uppercase tracking-[0.2em]">Context</th>
                <th className="px-8 py-6 font-black text-[10px] text-dim uppercase tracking-[0.2em]">Input Price</th>
                <th className="px-8 py-6 font-black text-[10px] text-dim uppercase tracking-[0.2em]">Output Price</th>
                <th className="px-8 py-6 font-black text-[10px] text-dim uppercase tracking-[0.2em] text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((p, i) => (
                <tr key={i} className="border-b border-main group hover:bg-sub/30 transition-colors">
                  <td className="px-8 py-8">
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-10 h-10 flex items-center justify-center font-black text-xs mono border border-main shrink-0"
                        style={{ backgroundColor: `${p.company.color}15`, borderColor: `${p.company.color}40`, color: p.company.color }}
                      >
                        {p.company.initial}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-lg tracking-tighter text-main group-hover:text-[#FF3B30] transition-colors">{p.name}</span>
                          {p.isHot && <span className="text-[8px] bg-[#FF3B30]/10 text-[#FF3B30] px-1.5 py-0.5 border border-[#FF3B30]/20 font-black uppercase">🔥 Hot</span>}
                          {p.isUncensored && <span className="text-[8px] bg-[var(--p2p-cyan)]/10 text-[var(--p2p-cyan)] px-1.5 py-0.5 border border-[var(--p2p-cyan)]/20 font-black uppercase">🛡️ Uncensored</span>}
                          {p.isFree && <span className="text-[8px] bg-green-500/10 text-green-500 px-1.5 py-0.5 border border-green-500/20 font-black uppercase">Free</span>}
                        </div>
                        <div className="text-[8px] font-bold text-dim tracking-[0.2em] uppercase">{p.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-8">
                     <span className={`text-[10px] font-black uppercase px-3 py-1 border ${p.provider === 'HETU Spot' ? 'border-[#FF3B30]/30 text-[#FF3B30]' : p.provider === 'P2P Cluster' ? 'border-[var(--p2p-cyan)]/30 text-[var(--p2p-cyan)]' : 'border-dim/30 text-dim'}`}>
                        {p.provider}
                     </span>
                  </td>
                  <td className="px-8 py-8 mono text-xs font-bold text-dim uppercase">{p.context}</td>
                  <td className="px-8 py-8">
                    <div className="space-y-1">
                      <div className={`text-xl font-black ${p.isFree ? 'text-green-500' : 'text-main'} flex items-center gap-3`}>
                        {p.isFree ? '$0.00' : `$${p.inputPrice.toFixed(2)}`}
                        {!p.isFree && p.marketPriceInput > 0 && (
                          <span className="text-[9px] font-black text-green-500 uppercase tracking-tighter">
                            ▼ {Math.round((1 - p.inputPrice/p.marketPriceInput) * 100)}%
                          </span>
                        )}
                      </div>
                      <div className="text-[9px] font-bold text-dim uppercase tracking-widest">Per 1M tokens</div>
                    </div>
                  </td>
                  <td className="px-8 py-8">
                    <div className="space-y-1">
                      <div className={`text-xl font-black ${p.isFree ? 'text-green-500' : 'text-main'}`}>
                        {p.isFree ? '$0.00' : `$${p.outputPrice.toFixed(2)}`}
                      </div>
                      <div className="text-[9px] font-bold text-dim uppercase tracking-widest">Per 1M tokens</div>
                    </div>
                  </td>
                  <td className="px-8 py-8 text-right">
                    <button 
                      onClick={() => {navigator.clipboard.writeText(p.name); alert(`Copied ID: ${p.name}`)}}
                      className="p-3 border border-main text-dim hover:text-[#FF3B30] hover:border-[#FF3B30] transition-all"
                      title="Copy Model ID"
                    >
                      <Copy size={16}/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Pagination Control */}
        <div className="flex justify-center items-center gap-10 pt-8">
          <button 
            onClick={handlePrev} 
            disabled={currentPage === 1}
            className="btn-outline px-8 h-12 flex items-center gap-2 disabled:opacity-10"
          >
            <ChevronLeft size={14}/> Previous
          </button>
          <button 
            onClick={handleNext} 
            disabled={currentPage === totalPages}
            className="btn-outline px-8 h-12 flex items-center gap-2 disabled:opacity-10"
          >
            Next <ChevronRight size={14}/>
          </button>
        </div>
      </section>

      {/* Module D — Why Build with HETU? (NEW) */}
      <section className="space-y-20">
        <h3 className="text-6xl font-black tracking-tighter text-center uppercase">Why Build with HETU?</h3>
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="p-10 border border-main bg-sub space-y-4">
            <div className="flex items-center gap-4 text-[#FF3B30]">
              <Cpu size={24}/>
              <h4 className="text-2xl font-black tracking-tighter uppercase">1. Unbeatable Economics</h4>
            </div>
            <p className="text-dim text-sm font-medium leading-relaxed uppercase">
              By utilizing idle P2P resources (sunk costs) for small models, we drive prices down to near-zero. You save money; miners earn yield.
            </p>
          </div>

          <div className="p-10 border border-main bg-sub space-y-4">
            <div className="flex items-center gap-4 text-[#FF3B30]">
              <Code2 size={24}/>
              <h4 className="text-2xl font-black tracking-tighter uppercase">2. Developer-First Experience</h4>
            </div>
            <p className="text-dim text-sm font-medium leading-relaxed uppercase">
              Drop-in replacement for OpenAI. Just change your <code className="text-[#FF3B30]">base_url</code> and <code className="text-[#FF3B30]">api_key</code>. Includes a generous debugging allowance so you don't pay for errors.
            </p>
          </div>

          <div className="p-10 border border-main bg-sub space-y-4">
            <div className="flex items-center gap-4 text-[#FF3B30]">
              <Shield size={24}/>
              <h4 className="text-2xl font-black tracking-tighter uppercase">3. Privacy & Freedom</h4>
            </div>
            <p className="text-dim text-sm font-medium leading-relaxed uppercase">
              We support USDT/USDC native payments. No intrusive KYC for standard tiers. Access uncensored models via our decentralized routing layer.
            </p>
          </div>

          <div className="p-10 border border-main bg-sub space-y-4">
            <div className="flex items-center gap-4 text-[#FF3B30]">
              <Layers size={24}/>
              <h4 className="text-2xl font-black tracking-tighter uppercase">4. Hybrid Reliability</h4>
            </div>
            <p className="text-dim text-sm font-medium leading-relaxed uppercase">
              Best of both worlds: Ultra-cheap P2P nodes for background tasks, and premium Data Center nodes for production-critical workloads.
            </p>
          </div>
        </div>
      </section>

      {/* Module E — Use Cases (UNCHANGED per user) */}
      <section className="space-y-16">
        <h3 className="text-5xl font-black tracking-tighter text-center">One Key. Real Use Cases.</h3>
        <div className="grid lg:grid-cols-3 gap-12">
           <div className="border border-main p-10 space-y-8 bg-sub group hover:border-[#FF3B30] transition-all">
              <Code2 size={32} className="text-[#FF3B30]"/>
              <div className="space-y-4">
                <h4 className="text-2xl font-black tracking-tight">For Developers</h4>
                <p className="text-dim text-xs font-medium leading-relaxed">
                  Drop-in OpenAI compatibility. Works with Python, Node.js, LangChain, and most OpenAI SDKs. Just change the base_url. Nothing else breaks.
                </p>
                <div className="bg-main border border-main p-4 text-[10px] mono text-dim overflow-x-auto">
                   <pre>{`client = OpenAI(
  base_url="https://api.hetu.ai/v1",
  api_key="sk-..."
)`}</pre>
                </div>
              </div>
           </div>

           <div className="border border-main p-10 space-y-8 bg-sub group hover:border-[#FF3B30] transition-all">
              <Wrench size={32} className="text-[#FF3B30]"/>
              <div className="space-y-4">
                <h4 className="text-2xl font-black tracking-tight">For Power Users</h4>
                <p className="text-dim text-xs font-medium leading-relaxed">
                  Works with popular open-source clients. Use HETU directly in tools you already know: NextChat · LobeChat · Cherry Studio · Immersive Translate. Paste the key and endpoint. Done.
                </p>
              </div>
           </div>

           <div className="border border-main p-10 space-y-8 bg-sub group hover:border-[#FF3B30] transition-all">
              <VenetianMask size={32} className="text-[#FF3B30]"/>
              <div className="space-y-4">
                <h4 className="text-2xl font-black tracking-tight">For RP & Privacy Users</h4>
                <p className="text-dim text-xs font-medium leading-relaxed">
                  Uncensored models, no moral lectures. Tired of filtered outputs and content warnings? Run Dolphin, Pygmalion, and other uncensored models with zero prompt logging.
                </p>
              </div>
           </div>
        </div>
      </section>

      {/* Module F — Quick Start (UNCHANGED per user) */}
      <section className="space-y-20 border border-main bg-main p-12 lg:p-24 shadow-2xl">
        <h3 className="text-5xl lg:text-6xl font-black tracking-tighter text-center">Start in under 1 minute</h3>
        
        <div className="grid lg:grid-cols-3 gap-16 relative">
          {/* Step 1 */}
          <div className="space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="w-14 h-14 border border-[#FF3B30] flex items-center justify-center font-black text-xl mono bg-sub text-[#FF3B30]">1</div>
            <div className="space-y-4">
              <h5 className="text-2xl font-black">Login with Wallet</h5>
              <p className="text-dim text-sm font-medium leading-relaxed">No email or phone needed. Simply sign a message to login. Supports MetaMask, Phantom, OKX Wallet.</p>
            </div>
            <div className="pt-4 w-full">
              {isSimConnected ? (
                <div className="bg-green-500/10 border border-green-500/30 p-5 flex items-center gap-3 text-green-500 font-black text-[10px] tracking-widest justify-center">
                  <Check size={14}/> Connected: $0.10 Balance
                </div>
              ) : (
                <button onClick={() => setIsSimConnected(true)} className="btn-primary w-full h-16 text-[10px] flex gap-3">
                  <Wallet size={16}/> Connect Wallet
                </button>
              )}
            </div>
          </div>

          {/* Step 2 */}
          <div className="space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="w-14 h-14 border border-main flex items-center justify-center font-black text-xl mono bg-sub">2</div>
            <div className="space-y-4">
              <h5 className="text-2xl font-black">Recharge & Get API Key</h5>
              <p className="text-dim text-sm font-medium leading-relaxed">Deposit USDC to activate your account. Then issue a personal token to access the network.</p>
            </div>
            <div className="pt-4 w-full">
              <button 
                onClick={() => setActivePath('API_KEY_MANAGEMENT')}
                className="btn-primary w-full h-16 text-[10px] flex gap-3 border-[#FF3B30] text-[#FF3B30] hover:bg-[#FF3B30] hover:text-white"
              >
                Recharge on My Keys <ChevronRight size={14}/>
              </button>
            </div>
          </div>

          {/* Step 3 */}
          <div className="space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="w-14 h-14 border border-main flex items-center justify-center font-black text-xl mono bg-sub">3</div>
            <div className="space-y-4">
              <h5 className="text-2xl font-black">Change Base URL</h5>
              <p className="text-dim text-sm font-medium leading-relaxed">Replace the official api.openai.com with our decentralized node address.</p>
            </div>
            <div className="pt-4 w-full">
              <button 
                onClick={() => copyToClipboard('https://api.hetu.ai/v1', 'Endpoint Copied')}
                className="w-full bg-sub border border-main p-5 text-center mono text-xs text-[#FF3B30] hover:bg-main transition-colors cursor-pointer group"
              >
                https://api.hetu.ai/v1 <span className="opacity-0 group-hover:opacity-100 ml-2">📋</span>
              </button>
            </div>
          </div>
        </div>

        {/* Snippet Tabs */}
        <div className="space-y-6 pt-12">
          <div className="flex border-b border-main">
            {[
              {id: 'python', label: 'Python SDK'},
              {id: 'curl', label: 'cURL'},
              {id: 'apps', label: 'NextChat / 3rd Party Apps'}
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveSnippetTab(tab.id as any)}
                className={`px-8 py-4 font-black text-[10px] uppercase tracking-widest border-t border-x -mb-[1px] transition-all ${activeSnippetTab === tab.id ? 'border-main bg-sub text-[#FF3B30]' : 'border-transparent text-dim hover:text-main'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          <div className="bg-sub border border-main p-10 mono text-xs overflow-x-auto min-h-[300px]">
            {activeSnippetTab === 'python' && (
              <pre className="text-zinc-300 leading-relaxed">
{`from openai import OpenAI

# Initialize with HETU config
client = OpenAI(
    base_url="https://api.hetu.ai/v1",  # <--- Change this line
    api_key="sk-hetu-your-key"          # Paste your key here
)

response = client.chat.completions.create(
    model="llama3-70b",
    messages=[{"role": "user", "content": "Hello HETU!"}]
)
print(response.choices[0].message.content)`}
              </pre>
            )}
            {activeSnippetTab === 'curl' && (
              <pre className="text-zinc-300 leading-relaxed">
{`curl https://api.hetu.ai/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer sk-hetu-your-key" \\
  -d '{
    "model": "llama3-70b",
    "messages": [{"role": "user", "content": "Why is decentralized AI better?"}]
  }'`}
              </pre>
            )}
            {activeSnippetTab === 'apps' && (
              <div className="space-y-8 py-4">
                 <div className="space-y-2">
                    <div className="text-dim uppercase text-[10px] font-black tracking-widest">Interface Address (Base URL)</div>
                    <div className="text-main bg-main p-4 border border-main">https://api.hetu.ai/v1</div>
                 </div>
                 <div className="space-y-2">
                    <div className="text-dim uppercase text-[10px] font-black tracking-widest">API Key</div>
                    <div className="text-main bg-main p-4 border border-main">sk-hetu-your-key</div>
                 </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Module G — FAQ (UPDATED) */}
      <section className="max-w-4xl mx-auto space-y-16">
        <h3 className="text-5xl font-black tracking-tighter text-center uppercase">FAQ</h3>
        <div className="space-y-1 border-y border-main bg-main">
           {[
             { q: "How can you offer Llama-3 at $0.015?", a: "We utilize a global network of idle consumer GPUs (like RTX 4090s). Since the hardware cost is already \"sunk\" for the owners, we only need to cover electricity and a small incentive, passing huge savings to you." },
             { q: "Is the P2P network stable enough for production?", a: "For the \"Hobbyist\" tier, we offer best-effort redundancy. For \"Pro\" and \"Enterprise\" tiers, our Smart Router automatically fails over to high-availability data center nodes if a P2P node lags, ensuring stability." },
             { q: "What is the \"Free Debugging Allowance\"?", a: "We believe developers shouldn't pay for print(\"hello world\"). Pro users get a allowance of 100 tokens/minute on specific small models strictly for testing and integration purposes." },
             { q: "Do you support Crypto payments?", a: "Yes. We accept USDT (TRC20/ERC20), USDC, and ETH directly. No credit card is required for the Prepaid and Pay-as-you-go plans." }
           ].map((item, i) => (
             <div key={i} className="bg-sub p-10 space-y-4 border-b border-main last:border-0 group hover:bg-main transition-all">
                <h5 className="text-lg font-black tracking-tight text-main group-hover:text-[#FF3B30] transition-colors flex items-center gap-4">
                   <MessageSquare size={16}/> {item.q}
                </h5>
                <p className="text-dim text-sm font-medium leading-relaxed uppercase">{item.a}</p>
             </div>
           ))}
        </div>
      </section>
    </div>
  );
};

const ManagementSection = ({ balance, keys, onOpenRefill, onCreateKey }: any) => (
  <div className="space-y-20 animate-in fade-in duration-500">
    <div className="grid lg:grid-cols-12 gap-20">
      <div className="lg:col-span-4 space-y-10">
         <div className="border border-main p-12 bg-sub space-y-12">
            <div className="space-y-2">
              <div className="font-black text-[10px] text-dim uppercase tracking-[0.3em]">Account Balance</div>
              <div className="text-7xl font-black tracking-tighter leading-none text-main">${balance.toFixed(2)}</div>
            </div>
            
            <div className="flex flex-col gap-4">
              <button onClick={onOpenRefill} className="btn-primary h-16 text-[10px]">Recharge</button>
            </div>
         </div>

         <div className="space-y-6">
            <h4 className="font-black text-[10px] text-dim uppercase tracking-widest flex items-center gap-3">
              <History size={12}/> Transaction History
            </h4>
            <div className="space-y-px bg-main border border-main">
               {MOCK_TXS.map((tx, i) => (
                 <div key={i} className="bg-sub p-6 flex justify-between items-center">
                    <div className="space-y-1">
                      <div className="text-[11px] font-black text-main">{tx.id}</div>
                      <div className="text-[9px] font-bold text-dim mono">{tx.timestamp}</div>
                    </div>
                    <div className="text-sm font-black text-green-500">+${tx.amount.toFixed(2)}</div>
                 </div>
               ))}
            </div>
         </div>
      </div>

      <div className="lg:col-span-8 space-y-12">
        <div className="flex justify-between items-end border-b border-main pb-6">
           <h3 className="text-5xl font-black uppercase tracking-tighter leading-none text-main">API Keys</h3>
           <button onClick={onCreateKey} className="btn-primary flex items-center gap-3 py-3 px-6 text-[10px]">
              <Plus size={14}/> Issue Key
           </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-main">
            <thead>
              <tr className="border-b border-main">
                <th className="py-6 font-black text-[10px] text-dim uppercase tracking-widest">Key Nickname</th>
                <th className="py-6 font-black text-[10px] text-dim uppercase tracking-widest">Token Cipher</th>
                <th className="py-6 font-black text-[10px] text-dim uppercase tracking-widest">Created Date</th>
              </tr>
            </thead>
            <tbody>
              {keys.map((k: any) => (
                <tr key={k.id} className="border-b border-main group hover:bg-sub transition-all">
                  <td className="py-8">
                    <div className="font-black text-sm text-main">{k.name}</div>
                  </td>
                  <td className="py-8">
                    <div className="flex items-center gap-4">
                      <code className="mono text-sm font-bold text-dim bg-main px-3 py-1.5 border border-main transition-all group-hover:text-main group-hover:border-[#FF3B30]">{k.maskedKey}</code>
                      <button 
                        onClick={() => {navigator.clipboard.writeText(k.key); alert('Key copied to clipboard')}} 
                        className="p-2 text-dim hover:text-[#FF3B30] transition-colors" 
                        title="Copy Token"
                      >
                        <Copy size={16}/>
                      </button>
                    </div>
                  </td>
                  <td className="py-8 font-black text-[10px] text-dim uppercase">{k.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {keys.length === 0 && (
            <div className="py-20 text-center text-dim font-black text-[10px] uppercase tracking-[0.3em]">
              No active keys detected. Issue a new key to begin.
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);
