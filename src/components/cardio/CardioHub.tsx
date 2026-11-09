import React, { useState } from 'react';
import { OutdoorRunning } from './OutdoorRunning';
import { CyclingMode } from './CyclingMode';
import { SwimmingMode } from './SwimmingMode';
import { OtherActivities } from './OtherActivities';
import { Compass, Bike, Waves, Footprints } from 'lucide-react';

export const CardioHub: React.FC = () => {
  const [subTab, setSubTab] = useState<'running' | 'cycling' | 'swimming' | 'other'>('running');

  return (
    <div className="space-y-6">
      {/* Sub-tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
        <button
          onClick={() => setSubTab('running')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition ${
            subTab === 'running'
              ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Compass className="w-4 h-4" /> Outdoor Running (GPS)
        </button>

        <button
          onClick={() => setSubTab('cycling')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition ${
            subTab === 'cycling'
              ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Bike className="w-4 h-4" /> Cycling
        </button>

        <button
          onClick={() => setSubTab('swimming')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition ${
            subTab === 'swimming'
              ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Waves className="w-4 h-4" /> Swimming
        </button>

        <button
          onClick={() => setSubTab('other')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition ${
            subTab === 'other'
              ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Footprints className="w-4 h-4" /> Walking / Mobility
        </button>
      </div>

      {/* Active Sub-Tab View */}
      {subTab === 'running' && <OutdoorRunning />}
      {subTab === 'cycling' && <CyclingMode />}
      {subTab === 'swimming' && <SwimmingMode />}
      {subTab === 'other' && <OtherActivities />}
    </div>
  );
};
