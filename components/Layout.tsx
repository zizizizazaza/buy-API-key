
import React, { useState } from 'react';
import { Wallet, Activity, ChevronDown, Sun, Moon } from 'lucide-react';
import { NavigationPath } from '../App';

interface LayoutProps {
  children: React.ReactNode;
  activePath: NavigationPath;
  setActivePath: (path: NavigationPath) => void;
  hideNav: boolean;
  hasNode: boolean;
  isWalletConnected: boolean;
  onConnect: () => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

/**
 * Re-creating the HETU logo as a high-fidelity SVG based on the provided reference.
 * Blocky 'H' with a distinctive horizontal/diagonal band cutout.
 */
const HetuLogo = () => (
  <svg width="28" height="28" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <path d="M20 20H45V50H75V20H100V100H75V70H45V100H20V20Z" fill="currentColor" />
    <path d="M20 45H45C55 45 65 55 75 55H100V75H75C65 75 55 65 45 65H20V45Z" fill="var(--bg-color)" />
  </svg>
);

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  activePath, 
  setActivePath, 
  hideNav,
  hasNode, 
  isWalletConnected,
  onConnect,
  theme,
  toggleTheme
}) => {
  const [p2pOpen, setP2pOpen] = useState(false);
  const [apiKeyOpen, setApiKeyOpen] = useState(false);

  const handleLogoClick = () => {
    setActivePath('P2P_CLUSTERS');
  };

  if (hideNav) {
    return (
      <div className="min-h-screen bg-main flex flex-col text-main font-sans">
        <header className="fixed top-8 left-8 z-[100] flex items-center gap-2 cursor-pointer group" onClick={handleLogoClick}>
          <HetuLogo />
          <h1 className="text-3xl font-black uppercase tracking-tighter glitch-hover leading-none">
            HETU
          </h1>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    );
  }

  const isP2PActive = activePath.startsWith('P2P_');
  const isApiKeyActive = activePath.startsWith('API_KEY_');

  return (
    <div className="min-h-screen flex flex-col bg-main font-sans">
      {/* Primary Global Navigation */}
      <header className="border-b border-main px-8 py-6 flex justify-between items-center bg-main sticky top-0 z-50">
        <div className="flex items-center gap-16">
          <div className="flex items-center gap-2 pr-10 border-r border-main cursor-pointer group" onClick={handleLogoClick}>
            <HetuLogo />
            <h1 className="text-3xl font-black uppercase tracking-tighter glitch-hover leading-none text-main">
              HETU
            </h1>
          </div>
          
          <nav className="hidden lg:flex gap-12 text-[11px] font-black tracking-[0.2em] uppercase">
            <button 
              onClick={() => setActivePath('AGENT')}
              className={`hover:text-[#FF3B30] transition-all py-2 ${activePath === 'AGENT' ? 'text-[#FF3B30]' : 'text-dim'}`}
            >
              AGENT
            </button>

            <div className="relative flex items-center group">
              <button 
                onClick={() => setP2pOpen(!p2pOpen)}
                className={`flex items-center gap-2 hover:text-[#FF3B30] transition-all py-2 ${isP2PActive ? 'text-[#FF3B30]' : 'text-dim'}`}
              >
                P2P NETWORK <ChevronDown size={10} className={p2pOpen ? 'rotate-180 transition-transform' : 'transition-transform'} />
              </button>
              
              {p2pOpen && (
                <div className="absolute top-full left-0 mt-4 w-56 bg-sub border border-main z-50 py-3 shadow-2xl">
                  <button onClick={() => { setActivePath('P2P_CLUSTERS'); setP2pOpen(false); }} className="w-full text-left px-6 py-3 hover:bg-main text-[10px] font-bold uppercase tracking-widest text-dim hover:text-main">CLUSTERS</button>
                  {hasNode && <button onClick={() => { setActivePath('P2P_MY_NODE'); setP2pOpen(false); }} className="w-full text-left px-6 py-3 hover:bg-main text-[10px] font-bold uppercase tracking-widest text-dim hover:text-main">MY NODE</button>}
                  <button onClick={() => { setActivePath('P2P_EARNINGS'); setP2pOpen(false); }} className="w-full text-left px-6 py-3 hover:bg-main text-[10px] font-bold uppercase tracking-widest text-dim hover:text-main">EARNINGS</button>
                </div>
              )}
            </div>

            <div className="relative flex items-center group">
              <button 
                onClick={() => setApiKeyOpen(!apiKeyOpen)}
                className={`flex items-center gap-2 hover:text-[#FF3B30] transition-all py-2 ${isApiKeyActive ? 'text-[#FF3B30]' : 'text-dim'}`}
              >
                API KEY <ChevronDown size={10} className={apiKeyOpen ? 'rotate-180 transition-transform' : 'transition-transform'} />
              </button>
              
              {apiKeyOpen && (
                <div className="absolute top-full left-0 mt-4 w-56 bg-sub border border-main z-50 py-3 shadow-2xl">
                  <button onClick={() => { setActivePath('API_KEY_PRICING'); setApiKeyOpen(false); }} className="w-full text-left px-6 py-3 hover:bg-main text-[10px] font-bold uppercase tracking-widest text-dim hover:text-main">PRICING</button>
                  <button onClick={() => { setActivePath('API_KEY_MANAGEMENT'); setApiKeyOpen(false); }} className="w-full text-left px-6 py-3 hover:bg-main text-[10px] font-bold uppercase tracking-widest text-dim hover:text-main">MY KEYS</button>
                </div>
              )}
            </div>

            <button 
              onClick={() => setActivePath('TASK')}
              className={`hover:text-[#FF3B30] transition-all py-2 ${activePath === 'TASK' ? 'text-[#FF3B30]' : 'text-dim'}`}
            >
              TASK
            </button>
            <button 
              onClick={() => setActivePath('PROFILE')}
              className={`hover:text-[#FF3B30] transition-all py-2 ${activePath === 'PROFILE' ? 'text-[#FF3B30]' : 'text-dim'}`}
            >
              PROFILE
            </button>
          </nav>
        </div>
        
        <div className="flex items-center gap-6">
          <button 
            onClick={toggleTheme}
            className="p-3 border border-main text-dim hover:text-main hover:border-[#FF3B30] transition-all"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <button 
            onClick={onConnect}
            className="btn-outline text-[10px] flex items-center gap-3 px-6"
          >
            <Wallet size={12} />
            {isWalletConnected ? '0x71C...4F9' : 'CONNECT WALLET'}
          </button>
        </div>
      </header>

      {/* Sub-Navigation */}
      {(isP2PActive || isApiKeyActive) && (
        <div className="bg-sub border-b border-main px-8 py-3 flex gap-10 items-center">
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest">
            {isP2PActive ? (
              <>
                <button onClick={() => setActivePath('P2P_CLUSTERS')} className={activePath === 'P2P_CLUSTERS' ? 'text-main border-b-2 border-[#FF3B30] pb-1' : 'text-dim hover:text-main pb-1'}>CLUSTERS</button>
                {hasNode && <button onClick={() => setActivePath('P2P_MY_NODE')} className={activePath === 'P2P_MY_NODE' ? 'text-main border-b-2 border-[#FF3B30] pb-1' : 'text-dim hover:text-main pb-1'}>MY NODE</button>}
                <button onClick={() => setActivePath('P2P_EARNINGS')} className={activePath === 'P2P_EARNINGS' ? 'text-main border-b-2 border-[#FF3B30] pb-1' : 'text-dim hover:text-main pb-1'}>EARNINGS</button>
              </>
            ) : (
              <>
                <button onClick={() => setActivePath('API_KEY_PRICING')} className={activePath === 'API_KEY_PRICING' ? 'text-main border-b-2 border-[#FF3B30] pb-1' : 'text-dim hover:text-main pb-1'}>PRICING</button>
                <button onClick={() => setActivePath('API_KEY_MANAGEMENT')} className={activePath === 'API_KEY_MANAGEMENT' ? 'text-main border-b-2 border-[#FF3B30] pb-1' : 'text-dim hover:text-main pb-1'}>MY KEYS</button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Protocol Surface */}
      <main className="flex-1 overflow-x-hidden text-main">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-main px-8 py-6 bg-main text-[9px] mono uppercase flex justify-between items-center text-dim">
        <div className="flex gap-12">
          <span className="flex items-center gap-3 font-bold"><Activity size={10} className="text-[#FF3B30]"/> NODE SYNC VERIFIED</span>
          <span className="text-dim hidden sm:inline tracking-tighter">PARALLEL STATE HASH ACTIVE</span>
        </div>
        <div className="tracking-[0.2em] font-bold text-dim">
          STRICT CRYPTO IDENTITY MODE ENFORCED
        </div>
      </footer>
    </div>
  );
};
