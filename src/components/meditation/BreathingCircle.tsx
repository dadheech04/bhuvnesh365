import React, { useState, useEffect } from 'react';
import { BreathingConfig } from '../../types';
import { breathingProtocols } from '../../data/mantras';
import { sound } from '../../utils/audio';
import { Play, Square, ShieldCheck, Sparkles } from 'lucide-react';

export const BreathingCircle: React.FC = () => {
  const [selectedProtocol, setSelectedProtocol] = useState<BreathingConfig>(breathingProtocols[0]);
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Hold Empty'>('Inhale');
  const [phaseSecondsLeft, setPhaseSecondsLeft] = useState(4);
  const [currentCycle, setCurrentCycle] = useState(1);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive) {
      timer = setInterval(() => {
        setPhaseSecondsLeft((prev) => {
          if (prev <= 1) {
            // Transition to next phase
            sound.playTap();
            if (phase === 'Inhale') {
              if (selectedProtocol.holdSec > 0) {
                setPhase('Hold');
                return selectedProtocol.holdSec;
              } else {
                setPhase('Exhale');
                return selectedProtocol.exhaleSec;
              }
            } else if (phase === 'Hold') {
              setPhase('Exhale');
              return selectedProtocol.exhaleSec;
            } else if (phase === 'Exhale') {
              if (selectedProtocol.holdEmptySec > 0) {
                setPhase('Hold Empty');
                return selectedProtocol.holdEmptySec;
              } else {
                // Next cycle
                setCurrentCycle((c) => c + 1);
                setPhase('Inhale');
                return selectedProtocol.inhaleSec;
              }
            } else {
              // Hold Empty finished -> Next cycle
              setCurrentCycle((c) => c + 1);
              setPhase('Inhale');
              return selectedProtocol.inhaleSec;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive, phase, selectedProtocol]);

  const handleStart = () => {
    sound.playTibetanBowl();
    setIsActive(true);
    setPhase('Inhale');
    setPhaseSecondsLeft(selectedProtocol.inhaleSec);
    setCurrentCycle(1);
  };

  const handleStop = () => {
    setIsActive(false);
    setPhase('Inhale');
    setPhaseSecondsLeft(selectedProtocol.inhaleSec);
  };

  const getCircleScale = () => {
    if (!isActive) return 'scale-90';
    if (phase === 'Inhale') return 'scale-125 duration-[4000ms]';
    if (phase === 'Hold' || phase === 'Hold Empty') return 'scale-125';
    if (phase === 'Exhale') return 'scale-75 duration-[4000ms]';
    return 'scale-90';
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 sm:p-7 shadow-2xl flex flex-col items-center text-center">
        <h2 className="text-xl sm:text-2xl font-black text-white">Mindful Breathing Circle</h2>
        <p className="text-xs text-slate-400 max-w-md mt-1 mb-6">
          Controlled autonomic down-regulation to calm nervous system cortisol and prepare for sleep or peak focus.
        </p>

        {/* Protocol Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {breathingProtocols.map((p) => (
            <button
              key={p.name}
              disabled={isActive}
              onClick={() => {
                setSelectedProtocol(p);
                setPhaseSecondsLeft(p.inhaleSec);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition ${
                selectedProtocol.name === p.name
                  ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40 font-bold'
                  : 'bg-slate-950 text-slate-400 border-slate-800'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Animated Expanding/Contracting Breathing Orb */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center my-6">
          {/* Ambient Pulsing Glow Rings */}
          <div
            className={`absolute inset-0 rounded-full bg-cyan-500/10 blur-2xl transition-transform ease-in-out ${getCircleScale()}`}
          />
          <div
            className={`w-48 h-48 sm:w-56 sm:h-56 rounded-full border-2 border-cyan-400/40 bg-gradient-to-tr from-cyan-950/80 via-slate-900 to-emerald-950/80 shadow-2xl shadow-cyan-500/20 flex flex-col items-center justify-center transition-all ease-in-out ${getCircleScale()}`}
          >
            <span className="text-[11px] uppercase font-mono tracking-widest text-cyan-400 font-bold">
              {isActive ? phase : 'Ready'}
            </span>
            <div className="text-5xl font-black text-white font-mono my-1">
              {isActive ? phaseSecondsLeft : selectedProtocol.inhaleSec}s
            </div>
            {isActive && (
              <span className="text-[10px] text-slate-400 font-mono">Cycle {currentCycle}</span>
            )}
          </div>
        </div>

        {/* Safety Note */}
        <p className="text-[11px] text-slate-400 max-w-sm mb-6 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          Do not force prolonged breath retention. Breathe comfortably and stop if dizzy.
        </p>

        {/* Controls */}
        <div className="flex items-center gap-3 w-full max-w-xs">
          {!isActive ? (
            <button
              onClick={handleStart}
              className="w-full h-14 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition"
            >
              <Play className="w-5 h-5 fill-black" />
              <span>Begin Breathing</span>
            </button>
          ) : (
            <button
              onClick={handleStop}
              className="w-full h-14 rounded-2xl bg-rose-500 hover:bg-rose-400 text-black font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition"
            >
              <Square className="w-5 h-5 fill-black" />
              <span>Stop Session</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
