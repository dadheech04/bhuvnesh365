import React, { useState } from 'react';
import { DailyHabitItem } from '../../types';
import { storage, getTodayKey } from '../../utils/storage';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';
import {
  CheckSquare,
  Square,
  Flame,
  Award,
  Sparkles,
  Smartphone,
  EyeOff,
  BookOpen,
  Mic,
  Video
} from 'lucide-react';

export const HabitsDiscipline: React.FC = () => {
  const [habits, setHabits] = useState<DailyHabitItem[]>(() =>
    storage.getHabits(getTodayKey())
  );

  const handleToggle = (id: string) => {
    sound.playTap();
    const updated = habits.map((h) => {
      if (h.id === id) {
        return { ...h, completed: !h.completed };
      }
      return h;
    });

    setHabits(updated);
    storage.saveHabits(getTodayKey(), updated);

    // If all completed
    if (updated.every((h) => h.completed)) {
      sound.playSetComplete();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const completedCount = habits.filter((h) => h.completed).length;
  const progressPercent = Math.round((completedCount / habits.length) * 100);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 sm:p-7 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold mb-2">
              <CheckSquare className="w-3.5 h-3.5" /> Identity-Based Habit Engine
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Digital Discipline & Daily Habits
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              &quot;We are what we repeatedly do. Excellence, then, is not an act, but a habit.&quot;
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] font-mono uppercase text-slate-400">Today&apos;s Compliance</span>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                {completedCount} / {habits.length}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden my-4">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Habits Checklist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-6">
          {habits.map((habit) => (
            <button
              key={habit.id}
              onClick={() => handleToggle(habit.id)}
              className={`p-3.5 rounded-2xl border flex items-center justify-between text-left transition-all ${
                habit.completed
                  ? 'bg-emerald-950/20 border-emerald-500/40 text-white'
                  : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                    habit.completed ? 'bg-emerald-500 text-black' : 'border border-slate-700 text-transparent'
                  }`}
                >
                  <CheckSquare className="w-4 h-4 stroke-[3]" />
                </div>
                <div>
                  <div className={`text-xs font-bold ${habit.completed ? 'line-through text-slate-400' : ''}`}>
                    {habit.title}
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">{habit.category}</span>
                </div>
              </div>

              {habit.targetMetric && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                  {habit.targetMetric}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Digital Discipline Advisory */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-1.5">
          <span className="font-bold text-white uppercase tracking-wider text-[11px] block">
            Digital Monk Principles:
          </span>
          <p>• Zero infinite-scroll reels during office hours (10:30 AM – 9:00 PM).</p>
          <p>• Replace passive evening browsing with 20 pages of high-leverage reading.</p>
          <p>• 15-minute spoken English recording cements linguistic fluidity for leadership.</p>
        </div>
      </div>
    </div>
  );
};
