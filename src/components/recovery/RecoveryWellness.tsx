import React, { useState } from 'react';
import { RecoveryLog, BodySorenessMap, SorenessLevel } from '../../types';
import { storage, getTodayKey } from '../../utils/storage';
import { sound } from '../../utils/audio';
import {
  HeartPulse,
  Moon,
  Zap,
  ShieldAlert,
  Save,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export const RecoveryWellness: React.FC = () => {
  const [recoveryLog, setRecoveryLog] = useState<RecoveryLog>(() =>
    storage.getRecovery(getTodayKey())
  );
  const [savedSuccess, setSavedSuccess] = useState(false);

  const sorenessCycle: SorenessLevel[] = ['None', 'Mild', 'Moderate', 'Severe'];

  const toggleSoreness = (key: keyof BodySorenessMap) => {
    sound.playTap();
    const current = recoveryLog.soreness[key];
    const currentIndex = sorenessCycle.indexOf(current);
    const nextLevel = sorenessCycle[(currentIndex + 1) % sorenessCycle.length];

    const updatedSoreness: BodySorenessMap = {
      ...recoveryLog.soreness,
      [key]: nextLevel,
    };

    // Calculate fatigue score (0-100)
    let score = 0;
    Object.values(updatedSoreness).forEach((val) => {
      if (val === 'Mild') score += 5;
      if (val === 'Moderate') score += 12;
      if (val === 'Severe') score += 20;
    });

    const sleepBonus = recoveryLog.sleepHours >= 7 && recoveryLog.sleepHours <= 9 ? 15 : 0;
    const energyBonus = recoveryLog.energyRating * 2;
    const overallRecovery = Math.max(10, Math.min(100, 100 - score + sleepBonus + energyBonus - 30));

    const updated: RecoveryLog = {
      ...recoveryLog,
      soreness: updatedSoreness,
      fatigueScore: Math.min(100, score),
      overallRecoveryScore: overallRecovery,
    };

    setRecoveryLog(updated);
    storage.saveRecovery(updated);
  };

  const handleSave = () => {
    sound.playSetComplete();
    storage.saveRecovery(recoveryLog);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const getSorenessColor = (level: SorenessLevel) => {
    if (level === 'Severe') return 'bg-rose-500/20 text-rose-400 border-rose-500/50';
    if (level === 'Moderate') return 'bg-amber-500/20 text-amber-400 border-amber-500/50';
    if (level === 'Mild') return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50';
    return 'bg-slate-950 text-slate-500 border-slate-800';
  };

  return (
    <div className="space-y-6">
      {/* Top HUD */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 sm:p-7 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono font-bold mb-2">
              <HeartPulse className="w-3.5 h-3.5" /> Autonomic Readiness & Muscular Recovery
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Recovery & Wellness OS</h2>
            <p className="text-xs text-slate-400 mt-1">
              Evaluates sleep debt, systemic fatigue, and muscle soreness to intelligently modulate training intensity.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] font-mono uppercase text-slate-400">Recovery Readiness</span>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                {recoveryLog.overallRecoveryScore}%
              </div>
            </div>
          </div>
        </div>

        {/* Safety Warning Invariant */}
        <div className="p-3.5 rounded-2xl bg-rose-950/20 border border-rose-800/40 flex items-start gap-3 text-xs text-rose-200 mb-6">
          <ShieldAlert className="w-5 h-5 flex-shrink-0 text-rose-400" />
          <p>
            <strong>Medical Safety Guardrail:</strong> If you experience chest tightness, breathing difficulties,
            dizziness, or acute joint stabbing pain, stop all physical exercise immediately and consult a certified medical
            professional.
          </p>
        </div>

        {/* Sleep Tracker */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase text-slate-400 flex items-center gap-1.5">
                <Moon className="w-4 h-4 text-cyan-400" /> Sleep Duration
              </span>
              <span className="text-xs text-emerald-400 font-bold font-mono">7-9h Target</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  setRecoveryLog((prev) => ({
                    ...prev,
                    sleepHours: Math.max(4, Math.round((prev.sleepHours - 0.5) * 10) / 10),
                  }))
                }
                className="w-9 h-9 rounded-xl bg-slate-800 text-white font-bold"
              >
                -
              </button>
              <span className="text-3xl font-black text-white font-mono w-16 text-center">
                {recoveryLog.sleepHours}h
              </span>
              <button
                onClick={() =>
                  setRecoveryLog((prev) => ({
                    ...prev,
                    sleepHours: Math.min(12, Math.round((prev.sleepHours + 0.5) * 10) / 10),
                  }))
                }
                className="w-9 h-9 rounded-xl bg-slate-800 text-white font-bold"
              >
                +
              </button>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-xs font-mono uppercase text-slate-400 flex items-center gap-1.5 mb-2">
              <Zap className="w-4 h-4 text-amber-400" /> Energy Rating (1-10)
            </span>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="1"
                max="10"
                value={recoveryLog.energyRating}
                onChange={(e) =>
                  setRecoveryLog((prev) => ({
                    ...prev,
                    energyRating: Number(e.target.value) as RecoveryLog['energyRating'],
                  }))
                }
                className="w-full accent-amber-500"
              />
              <span className="text-xl font-black text-amber-400 font-mono w-8 text-center">
                {recoveryLog.energyRating}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-xs font-mono uppercase text-slate-400 mb-2 block">
              Sleep Timing Adherence
            </span>
            <div className="text-xs text-slate-300 space-y-1 font-mono">
              <p>Target Bed: <strong>21:45 PM</strong></p>
              <p>Target Wake: <strong>05:45 AM</strong></p>
            </div>
          </div>
        </div>

        {/* Interactive Muscle Soreness Heatmap */}
        <div className="my-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Interactive Muscle Soreness Map (Tap to Cycle: None → Mild → Mod → Severe)
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">
              Fatigue Index: {recoveryLog.fatigueScore}/100
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(
              [
                { key: 'chest', label: 'Chest (Pectorals)' },
                { key: 'upperBack', label: 'Upper Back & Lats' },
                { key: 'lowerBack', label: 'Lower Back / Spine' },
                { key: 'shoulders', label: 'Shoulders & Delts' },
                { key: 'biceps', label: 'Biceps' },
                { key: 'triceps', label: 'Triceps' },
                { key: 'quads', label: 'Quads (Thighs)' },
                { key: 'hamstrings', label: 'Hamstrings' },
                { key: 'glutes', label: 'Glutes' },
                { key: 'calves', label: 'Calves' },
                { key: 'core', label: 'Core / Abs' },
                { key: 'neck', label: 'Neck & Traps' },
              ] as { key: keyof BodySorenessMap; label: string }[]
            ).map((item) => {
              const level = recoveryLog.soreness[item.key];
              return (
                <button
                  key={item.key}
                  onClick={() => toggleSoreness(item.key)}
                  className={`p-3 rounded-2xl border text-left transition-all ${getSorenessColor(level)}`}
                >
                  <div className="text-xs font-bold">{item.label}</div>
                  <div className="text-[10px] uppercase font-mono tracking-wider font-extrabold mt-1">
                    {level}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Save Changes Button */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <p className="text-xs text-slate-400">
            {recoveryLog.soreness.lowerBack === 'Severe' || recoveryLog.soreness.lowerBack === 'Moderate'
              ? '⚠️ Lower back flagged: AI coach suggests substituting Romanian deadlifts with leg curls today.'
              : 'Musculoskeletal readiness normal. Ready for programmed volume.'}
          </p>

          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 transition"
          >
            {savedSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {savedSuccess ? 'Saved' : 'Save Recovery State'}
          </button>
        </div>
      </div>
    </div>
  );
};
