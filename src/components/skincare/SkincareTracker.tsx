import React, { useState } from 'react';
import { SkincareRoutine } from '../../types';
import { storage, getTodayKey } from '../../utils/storage';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';
import {
  SunMedium,
  Moon,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  Save
} from 'lucide-react';

export const SkincareTracker: React.FC = () => {
  const [routine, setRoutine] = useState<SkincareRoutine>(() =>
    storage.getSkincare(getTodayKey())
  );
  const [observationNote, setObservationNote] = useState(routine.observations || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const toggleAM = (key: keyof SkincareRoutine['morning']) => {
    sound.playTap();
    const updated = {
      ...routine,
      morning: {
        ...routine.morning,
        [key]: !routine.morning[key],
      },
    };
    setRoutine(updated);
    storage.saveSkincare(updated);
  };

  const togglePM = (key: keyof SkincareRoutine['evening']) => {
    sound.playTap();
    const updated = {
      ...routine,
      evening: {
        ...routine.evening,
        [key]: !routine.evening[key],
      },
    };
    setRoutine(updated);
    storage.saveSkincare(updated);
  };

  const handleSaveObservations = () => {
    sound.playSetComplete();
    const updated = {
      ...routine,
      observations: observationNote,
    };
    setRoutine(updated);
    storage.saveSkincare(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const amCount = Object.values(routine.morning).filter(Boolean).length;
  const pmCount = Object.values(routine.evening).filter(Boolean).length;

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 sm:p-7 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-mono font-bold mb-2">
              <SunMedium className="w-3.5 h-3.5" /> Barrier Defense & Pigmentation Protocol
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Skincare & Grooming Tracker
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Disciplined dermatological protocol to prevent photo-aging, treat pigmentation, and preserve facial
              barrier integrity.
            </p>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-mono uppercase text-slate-400">AM / PM Status</span>
            <div className="text-xl font-black text-amber-400 font-mono">
              AM: {amCount}/5 • PM: {pmCount}/3
            </div>
          </div>
        </div>

        {/* Dermatologist Safety Guardrail */}
        <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-600/30 flex items-start gap-3 text-xs text-amber-200 mb-6">
          <ShieldCheck className="w-5 h-5 flex-shrink-0 text-amber-400" />
          <p>
            <strong>Active Ingredient Safety:</strong> Never layer potent exfoliants (AHA/BHA) concurrently with pure
            ascorbic acid (Vitamin C) or prescription retinoids without medical spacing. Discontinue if persistent stinging occurs.
          </p>
        </div>

        {/* Morning Routine Card */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 mb-6">
          <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <SunMedium className="w-4 h-4 text-amber-400" /> Morning Routine (Post-Gym 7:15 AM)
            </h3>
            <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">
              Broad-Spectrum Defense
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {[
              { key: 'cleanser', label: '1. Gentle Non-Stripping Cleanser', note: 'Preserves acid mantle' },
              { key: 'vitaminCOrActive', label: '2. Vitamin C (10-15%) / Niacinamide', note: 'Antioxidant & tone clarity' },
              { key: 'moisturizer', label: '3. Ceramide Barrier Moisturizer', note: 'Hydrates stratum corneum' },
              { key: 'sunscreenSpf50', label: '4. Broad-Spectrum SPF 50+ PA++++', note: 'Essential photo-protection' },
              { key: 'sunscreenReapplied', label: '5. Midday Sunscreen Reapplication', note: 'Crucial before afternoon commute' },
            ].map((step) => {
              const active = routine.morning[step.key as keyof SkincareRoutine['morning']];
              return (
                <button
                  key={step.key}
                  onClick={() => toggleAM(step.key as keyof SkincareRoutine['morning'])}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between text-left transition ${
                    active
                      ? 'bg-amber-950/30 border-amber-500/50 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-300'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold">{step.label}</div>
                    <span className="text-[10px] text-slate-500 font-mono">{step.note}</span>
                  </div>
                  <CheckCircle2
                    className={`w-5 h-5 flex-shrink-0 ${
                      active ? 'text-amber-400' : 'text-slate-700'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Evening Routine Card */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 mb-6">
          <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Moon className="w-4 h-4 text-cyan-400" /> Evening Repair Routine (9:30 PM Pre-Sleep)
            </h3>
            <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">
              Cellular Regeneration
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {[
              { key: 'cleanser', label: '1. Deep Gentle Cleanser', note: 'Removes office pollutants & SPF' },
              { key: 'treatmentSerum', label: '2. Dermatologist Treatment Serum', note: 'Even skin tone & repair' },
              { key: 'moisturizer', label: '3. Rich Restorative Cream', note: 'Locks overnight hydration' },
            ].map((step) => {
              const active = routine.evening[step.key as keyof SkincareRoutine['evening']];
              return (
                <button
                  key={step.key}
                  onClick={() => togglePM(step.key as keyof SkincareRoutine['evening'])}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between text-left transition ${
                    active
                      ? 'bg-cyan-950/30 border-cyan-500/50 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-300'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold">{step.label}</div>
                    <span className="text-[10px] text-slate-500 font-mono">{step.note}</span>
                  </div>
                  <CheckCircle2
                    className={`w-5 h-5 flex-shrink-0 ${
                      active ? 'text-cyan-400' : 'text-slate-700'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Observations & Irritation Log */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
          <label className="text-xs uppercase font-mono tracking-wider text-slate-400 block mb-2 font-bold">
            Weekly Skin Observations & Irritation Journal:
          </label>
          <textarea
            rows={2}
            value={observationNote}
            onChange={(e) => setObservationNote(e.target.value)}
            placeholder="Record changes in pigmentation, skin texture, dryness, or reaction to active products..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 mb-3"
          />
          <button
            onClick={handleSaveObservations}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 transition"
          >
            {savedSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {savedSuccess ? 'Saved' : 'Save Observations'}
          </button>
        </div>
      </div>
    </div>
  );
};
