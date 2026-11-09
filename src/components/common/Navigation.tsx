import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Dumbbell,
  Navigation as CompassIcon,
  Sparkles,
  UtensilsCrossed,
  HeartPulse,
  CheckSquare,
  Trophy,
  BrainCircuit,
  FileText,
  User,
  Menu,
  X,
  Bell,
  SunMedium,
  Award,
  Download
} from 'lucide-react';

export type NavTab =
  | 'dashboard'
  | 'gym'
  | 'cardio'
  | 'meditation'
  | 'nutrition'
  | 'recovery'
  | 'habits'
  | 'sports'
  | 'leadership'
  | 'coach'
  | 'skincare'
  | 'alarm'
  | 'report'
  | 'profile';

interface NavigationProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onStartToday: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  onSelectTab,
  onStartToday,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [installPrompt, setInstallPrompt] = useState<any>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    if (installPrompt) {
      installPrompt.prompt();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const choice = await installPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setInstallPrompt(null);
      }
    } else {
      alert('To install on Desktop / Mobile:\n\n• On Chrome/Edge: Click the install icon (🖥️ or ⬇️) in the browser address bar, or Menu → "Install App".\n• On iPhone (Safari): Tap the Share button → "Add to Home Screen".\n• On Android: Tap Menu (3 dots) → "Add to Home screen".');
    }
  };

  const mainNavItems: { id: NavTab; label: string; icon: React.FC<{ className?: string }>; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'gym', label: 'Gym Trainer', icon: Dumbbell, badge: 'Live' },
    { id: 'cardio', label: 'Cardio & GPS', icon: CompassIcon },
    { id: 'meditation', label: 'Meditation & 108', icon: Sparkles },
    { id: 'nutrition', label: 'Strict Veg Diet', icon: UtensilsCrossed, badge: '130g' },
    { id: 'recovery', label: 'Recovery & Soreness', icon: HeartPulse },
    { id: 'habits', label: 'Habits & Discipline', icon: CheckSquare },
    { id: 'sports', label: 'Sports Arena', icon: Trophy },
    { id: 'leadership', label: 'Leadership Dev', icon: Award },
    { id: 'coach', label: 'AI Performance Coach', icon: BrainCircuit, badge: 'Smart' },
    { id: 'skincare', label: 'Skincare Routine', icon: SunMedium },
    { id: 'alarm', label: '5:45 AM Alarm', icon: Bell },
    { id: 'report', label: 'Monthly Report (PDF)', icon: FileText },
    { id: 'profile', label: 'Profile & Cloud Data', icon: User },
  ];

  const handleSelect = (tab: NavTab) => {
    onSelectTab(tab);
    setDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Header Bar for Mobile & Desktop */}
      <header className="sticky top-0 z-40 bg-[#0b0f17]/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDrawerOpen(true)}
            className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => handleSelect('dashboard')}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center font-black text-black text-sm tracking-tighter shadow-md shadow-emerald-500/20">
              365
            </div>
            <div>
              <h1 className="text-sm font-black tracking-tight text-white flex items-center gap-1.5">
                BHUVNESH 365
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  OS v2.0
                </span>
              </h1>
              <p className="text-[10px] text-slate-400 font-medium hidden sm:block">
                BUILD YOUR BODY. MASTER YOUR MIND. UPGRADE YOUR LIFE.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleInstallClick}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs flex items-center gap-1.5 transition"
            title="Download / Install as standalone app"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Install App</span>
          </button>

          <button
            onClick={onStartToday}
            className="relative px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-extrabold text-xs uppercase tracking-wider shadow-md shadow-emerald-500/25 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-black animate-ping" />
            Start Today
          </button>
        </div>
      </header>

      {/* Desktop Sidebar Navigation */}
      <aside className="hidden md:flex flex-col w-64 fixed left-0 top-[57px] bottom-0 bg-[#0e131f] border-r border-slate-800/80 p-3 overflow-y-auto">
        <div className="space-y-1">
          {mainNavItems.map((item) => {
            const active = currentTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  active
                    ? 'bg-emerald-500 text-black font-bold shadow-md shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${active ? 'text-black' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[9px] uppercase px-1.5 py-0.5 rounded-full font-mono ${
                      active ? 'bg-black/20 text-black' : 'bg-slate-800 text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Motivational Footnote in Desktop Sidebar */}
        <div className="mt-auto pt-4 border-t border-slate-800/80 text-[11px] text-slate-500 text-center">
          <p className="font-medium text-slate-400">Bhuvnesh Dadheech</p>
          <p className="text-[10px] text-emerald-500/90 font-mono mt-0.5">Strict Vegetarian • 180cm • 76kg</p>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar (Core Quick Actions) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0e131f]/95 backdrop-blur-lg border-t border-slate-800/80 px-2 py-1.5 flex items-center justify-around">
        {[
          { id: 'dashboard', label: 'Today', icon: LayoutDashboard },
          { id: 'gym', label: 'Gym', icon: Dumbbell },
          { id: 'cardio', label: 'Cardio', icon: CompassIcon },
          { id: 'meditation', label: 'Mind', icon: Sparkles },
          { id: 'nutrition', label: 'Nutrition', icon: UtensilsCrossed },
        ].map((item) => {
          const active = currentTab === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleSelect(item.id as NavTab)}
              className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-all ${
                active ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? 'scale-110' : ''}`} />
              <span className="text-[10px] font-medium mt-0.5">{item.label}</span>
            </button>
          );
        })}
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex flex-col items-center py-1 px-2 text-slate-400 hover:text-slate-200"
        >
          <Menu className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-0.5">More</span>
        </button>
      </nav>

      {/* Mobile Drawer Slide-Over */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="relative w-80 max-w-[85vw] bg-[#0e131f] border-r border-slate-800 p-4 flex flex-col h-full z-10 overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center font-black text-black text-xs">
                  365
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white">BHUVNESH 365</h2>
                  <p className="text-[10px] text-slate-400">All Modules Menu</p>
                </div>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1.5 mt-4">
              {mainNavItems.map((item) => {
                const active = currentTab === item.id;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition-all ${
                      active
                        ? 'bg-emerald-500 text-black font-bold'
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-emerald-400 border border-emerald-500/20">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
