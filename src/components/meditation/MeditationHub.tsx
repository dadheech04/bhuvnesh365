import React, { useState } from 'react';
import { BreathingCircle } from './BreathingCircle';
import { MantraCounter } from './MantraCounter';
import { Sparkles, Sun, Wind, Moon } from 'lucide-react';

export const MeditationHub: React.FC = () => {
  const [subTab, setSubTab] = useState<'breathing' | 'mantra'>('mantra');

  return (
    <div className="space-y-6">
      {/* Sub-tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setSubTab('mantra')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition ${
            subTab === 'mantra'
              ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Sun className="w-4 h-4" /> 108 Sacred Mantra Japa
        </button>

        <button
          onClick={() => setSubTab('breathing')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition ${
            subTab === 'breathing'
              ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Wind className="w-4 h-4" /> Animated Breathing Circle
        </button>
      </div>

      {subTab === 'mantra' && <MantraCounter />}
      {subTab === 'breathing' && <BreathingCircle />}
    </div>
  );
};
