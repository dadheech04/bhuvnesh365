import React, { useState } from 'react';
import { CardioSession } from '../../types';
import { storage, getTodayKey } from '../../utils/storage';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';
import {
  Footprints,
  Flame,
  Zap,
  Play,
  CheckCircle2,
  Timer,
  Heart
} from 'lucide-react';

export const OtherActivities: React.FC = () => {
  const [selectedActivity, setSelectedActivity] = useState<CardioSession['type']>('Walking');
  const [durationMin, setDurationMin] = useState(30);
  const [distanceKm, setDistanceKm] = useState(2.5);
  const [jumpRopeCount, setJumpRopeCount] = useState(500);

  const handleSaveActivity = () => {
    sound.playSetComplete();

    const calories =
      selectedActivity === 'Jump Rope'
        ? Math.round(durationMin * 12)
        : selectedActivity === 'Hiking'
        ? Math.round(durationMin * 8.5)
        : Math.round(durationMin * 5.5);

    const session: CardioSession = {
      id: `act_${Date.now()}`,
      type: selectedActivity,
      date: getTodayKey(),
      startTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      durationSeconds: durationMin * 60,
      distanceKm,
      avgPaceMinPerKm: distanceKm > 0 ? durationMin / distanceKm : 10,
      avgSpeedKmh: distanceKm > 0 ? (distanceKm / (durationMin / 60)) : 4.5,
      estimatedCalories: calories,
      notes: selectedActivity === 'Jump Rope' ? `${jumpRopeCount} jumps completed` : undefined,
    };

    storage.saveCardioSession(session);

    confetti({
      particleCount: 50,
      spread: 50,
    });
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 sm:p-7 shadow-2xl">
        <h2 className="text-xl sm:text-2xl font-black text-white mb-2">
          Walking, Mobility & Cross-Training
        </h2>
        <p className="text-xs text-slate-400 mb-6">
          Record low-intensity steady-state cardio, outdoor hikes, jump rope sessions, and restorative yoga.
        </p>

        {/* Activity Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
          {(['Walking', 'Hiking', 'Treadmill', 'Elliptical', 'Jump Rope'] as CardioSession['type'][]).map(
            (act) => (
              <button
                key={act}
                onClick={() => setSelectedActivity(act)}
                className={`p-3 rounded-2xl text-xs font-bold border transition ${
                  selectedActivity === act
                    ? 'bg-emerald-500 text-black border-emerald-400 font-extrabold shadow-md'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                {act}
              </button>
            )
          )}
        </div>

        {/* Input Parameters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mb-6">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-xs font-mono uppercase text-slate-400">Duration (Minutes)</span>
            <div className="flex items-center gap-3 my-2">
              <button
                onClick={() => setDurationMin((d) => Math.max(5, d - 5))}
                className="w-10 h-10 rounded-xl bg-slate-800 text-white font-bold"
              >
                -
              </button>
              <span className="text-2xl font-black text-white font-mono w-16 text-center">
                {durationMin}
              </span>
              <button
                onClick={() => setDurationMin((d) => d + 5)}
                className="w-10 h-10 rounded-xl bg-slate-800 text-white font-bold"
              >
                +
              </button>
            </div>
          </div>

          {selectedActivity !== 'Jump Rope' ? (
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-xs font-mono uppercase text-slate-400">Distance (KM)</span>
              <div className="flex items-center gap-3 my-2">
                <button
                  onClick={() => setDistanceKm((d) => Math.max(0.5, Math.round((d - 0.5) * 10) / 10))}
                  className="w-10 h-10 rounded-xl bg-slate-800 text-white font-bold"
                >
                  -
                </button>
                <span className="text-2xl font-black text-emerald-400 font-mono w-16 text-center">
                  {distanceKm}
                </span>
                <button
                  onClick={() => setDistanceKm((d) => Math.round((d + 0.5) * 10) / 10)}
                  className="w-10 h-10 rounded-xl bg-slate-800 text-white font-bold"
                >
                  +
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-xs font-mono uppercase text-slate-400">Jumps Completed</span>
              <div className="flex items-center gap-3 my-2">
                <button
                  onClick={() => setJumpRopeCount((c) => Math.max(50, c - 50))}
                  className="w-10 h-10 rounded-xl bg-slate-800 text-white font-bold"
                >
                  -
                </button>
                <span className="text-2xl font-black text-amber-400 font-mono w-20 text-center">
                  {jumpRopeCount}
                </span>
                <button
                  onClick={() => setJumpRopeCount((c) => c + 50)}
                  className="w-10 h-10 rounded-xl bg-slate-800 text-white font-bold"
                >
                  +
                </button>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleSaveActivity}
          className="w-full sm:w-auto px-8 h-12 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider transition"
        >
          Save {selectedActivity} Record
        </button>
      </div>
    </div>
  );
};
