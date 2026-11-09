import React, { useState, useEffect } from 'react';
import { SwimmingSession } from '../../types';
import { storage, getTodayKey } from '../../utils/storage';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';
import {
  Waves,
  Play,
  Square,
  Plus,
  ShieldAlert,
  Clock,
  Compass,
  CheckCircle2
} from 'lucide-react';

export const SwimmingMode: React.FC = () => {
  const [isSwimming, setIsSwimming] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [poolLengthMeters, setPoolLengthMeters] = useState<number>(25);
  const [lapsCompleted, setLapsCompleted] = useState<number>(0);
  const [selectedStroke, setSelectedStroke] = useState<SwimmingSession['stroke']>('Freestyle');

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSwimming) {
      interval = setInterval(() => {
        setSecondsElapsed((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSwimming]);

  const handleLapTap = () => {
    sound.playTap();
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(100);
      } catch {
        // ignore
      }
    }
    setLapsCompleted((l) => l + 1);
  };

  const handleFinishSwim = () => {
    sound.playSetComplete();
    setIsSwimming(false);

    const totalDistance = lapsCompleted * poolLengthMeters;
    const pace100m =
      totalDistance > 0
        ? `${Math.floor((secondsElapsed / (totalDistance / 100)) / 60)}:${Math.floor(
            (secondsElapsed / (totalDistance / 100)) % 60
          )
            .toString()
            .padStart(2, '0')}`
        : '2:15';

    const session: SwimmingSession = {
      id: `swim_${Date.now()}`,
      date: getTodayKey(),
      poolType: poolLengthMeters === 50 ? 'Pool 50m' : 'Pool 25m',
      poolLengthMeters,
      lapsCompleted,
      totalDistanceMeters: totalDistance,
      durationMinutes: Math.round(secondsElapsed / 60),
      stroke: selectedStroke,
      avgPacePer100m: `${pace100m} /100m`,
      estimatedCalories: Math.round((secondsElapsed / 60) * 11),
    };

    storage.saveSwimmingSession(session);

    confetti({
      particleCount: 60,
      spread: 60,
    });
  };

  const totalMeters = lapsCompleted * poolLengthMeters;

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 sm:p-7 shadow-2xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono font-bold mb-2">
              <Waves className="w-3.5 h-3.5" /> Zero-Impact Full-Body Conditioning
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Swimming Tracker</h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono">Pool Length:</span>
            {[25, 50].map((len) => (
              <button
                key={len}
                onClick={() => setPoolLengthMeters(len)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold border ${
                  poolLengthMeters === len
                    ? 'bg-cyan-500 text-black border-cyan-400'
                    : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}
              >
                {len}m
              </button>
            ))}
          </div>
        </div>

        {/* Safety Note Invariant */}
        <div className="p-3.5 rounded-2xl bg-cyan-950/30 border border-cyan-800/40 flex items-start gap-2.5 text-xs text-cyan-200 mb-6">
          <ShieldAlert className="w-5 h-5 flex-shrink-0 text-cyan-400" />
          <p>
            <strong>Aquatic Safety Rule:</strong> Never engage in underwater breath-holding or hyperventilation contests.
            Focus on rhythmic bilateral breathing and smooth rotational gliding.
          </p>
        </div>

        {/* Live Gauges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
            <span className="text-[10px] uppercase font-mono text-slate-400">Total Laps</span>
            <div className="text-4xl font-black text-cyan-400 font-mono mt-1">{lapsCompleted}</div>
            <span className="text-xs text-slate-400">LAPS</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
            <span className="text-[10px] uppercase font-mono text-slate-400">Total Distance</span>
            <div className="text-4xl font-black text-white font-mono mt-1">{totalMeters}</div>
            <span className="text-xs text-cyan-400 font-bold">METERS</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
            <span className="text-[10px] uppercase font-mono text-slate-400">Time</span>
            <div className="text-3xl sm:text-4xl font-black text-white font-mono mt-1">
              {Math.floor(secondsElapsed / 60)}:{(secondsElapsed % 60).toString().padStart(2, '0')}
            </div>
            <span className="text-xs text-amber-400 font-bold">MM:SS</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
            <span className="text-[10px] uppercase font-mono text-slate-400">Stroke</span>
            <div className="text-lg font-black text-emerald-400 truncate mt-2">{selectedStroke}</div>
            <span className="text-xs text-slate-400">CURRENT STYLE</span>
          </div>
        </div>

        {/* Stroke Selector Buttons */}
        <div className="flex flex-wrap gap-2 my-4">
          {(['Freestyle', 'Breaststroke', 'Backstroke', 'Butterfly', 'Mixed'] as SwimmingSession['stroke'][]).map(
            (stroke) => (
              <button
                key={stroke}
                onClick={() => setSelectedStroke(stroke)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border ${
                  selectedStroke === stroke
                    ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}
              >
                {stroke}
              </button>
            )
          )}
        </div>

        {/* Giant One-Tap Lap Button */}
        {isSwimming ? (
          <div className="space-y-4 my-6">
            <button
              onClick={handleLapTap}
              className="w-full h-32 sm:h-40 rounded-3xl bg-gradient-to-tr from-cyan-600 to-cyan-400 active:scale-95 text-black font-black text-2xl sm:text-3xl uppercase tracking-wider shadow-xl shadow-cyan-500/30 flex flex-col items-center justify-center gap-2 transition"
            >
              <Plus className="w-8 h-8 stroke-[3]" />
              <span>TAP FOR NEXT LAP (+{poolLengthMeters}m)</span>
            </button>

            <button
              onClick={handleFinishSwim}
              className="w-full h-14 rounded-2xl bg-rose-500 hover:bg-rose-400 text-black font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Square className="w-5 h-5 fill-black" />
              <span>End Swim Session & Save</span>
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              sound.playTap();
              setIsSwimming(true);
            }}
            className="w-full h-14 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition mt-4"
          >
            <Play className="w-5 h-5 fill-black" />
            <span>Enter Pool & Start Swimming</span>
          </button>
        )}
      </div>
    </div>
  );
};
