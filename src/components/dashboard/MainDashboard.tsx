import React from 'react';
import { calculateDailyTransformationScore } from '../../utils/analytics';
import { storage, getTodayKey } from '../../utils/storage';
import { weeklyWorkoutSplit } from '../../data/defaultProfile';
import { ActivityRings } from '../common/ActivityRings';
import { StatCard } from '../common/StatCard';
import { NavTab } from '../common/Navigation';
import { sound } from '../../utils/audio';
import {
  Flame,
  Dumbbell,
  Compass,
  Sparkles,
  UtensilsCrossed,
  Droplets,
  Moon,
  SunMedium,
  CheckSquare,
  Award,
  ChevronRight,
  Play,
  Clock,
  Waves,
  Bike
} from 'lucide-react';

interface MainDashboardProps {
  onSelectTab: (tab: NavTab) => void;
  onStartToday: () => void;
}

export const MainDashboard: React.FC<MainDashboardProps> = ({
  onSelectTab,
  onStartToday,
}) => {
  const profile = storage.getProfile();
  const todayKey = getTodayKey();
  const scoreData = calculateDailyTransformationScore(todayKey);
  const nutrition = storage.getNutritionLog(todayKey);
  const recovery = storage.getRecovery(todayKey);
  const workouts = storage.getWorkouts();
  const cardio = storage.getCardioSessions();
  const habits = storage.getHabits(todayKey);
  const achievements = storage.getAchievements();

  // Find today's split
  const todayDayIdx = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
  const todayPlan = weeklyWorkoutSplit[todayDayIdx];
  const hadWorkoutToday = workouts.some((w) => w.date === todayKey);

  // Calculate rings
  const movePercent = hadWorkoutToday ? 100 : Math.min(100, Math.round((cardio.length > 0 ? 70 : 15)));
  const mindPercent = scoreData.breakdown.meditationScore > 0 ? 100 : 20;
  const fuelPercent = Math.min(
    100,
    Math.round(((nutrition.totalProteinG || 0) / profile.proteinTargetGrams) * 100)
  );

  return (
    <div className="space-y-6">
      {/* Hero OS Command Center */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-[#0e1626] border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              DAY 42 OF 365 TRANSFORMATION JOURNEY
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Welcome, {profile.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-xl leading-relaxed">
              &quot;BUILD YOUR BODY. MASTER YOUR MIND. UPGRADE YOUR LIFE.&quot;
            </p>

            {/* Quick Action Button: START TODAY */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onStartToday}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-black text-sm uppercase tracking-wider shadow-lg shadow-emerald-500/30 flex items-center gap-2.5 active:scale-95 transition"
              >
                <Play className="w-5 h-5 fill-black" />
                <span>Start Today&apos;s Workout ({todayPlan.splitTitle.split(' ')[0]})</span>
              </button>

              <button
                onClick={() => onSelectTab('coach')}
                className="px-5 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider border border-slate-700 flex items-center gap-2 transition"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>AI Coach Briefing</span>
              </button>
            </div>
          </div>

          {/* Activity Rings & Transformation Score Pillar */}
          <div className="flex items-center gap-6 bg-slate-950/80 p-5 rounded-3xl border border-slate-800/80 self-center lg:self-auto">
            <ActivityRings
              movePercent={movePercent}
              mindPercent={mindPercent}
              fuelPercent={fuelPercent}
              size={150}
            />
            <div className="space-y-2 text-xs font-mono">
              <div>
                <span className="text-[10px] uppercase text-slate-400 font-bold">Daily OS Score</span>
                <div className="text-3xl font-black text-white tracking-tight">
                  {scoreData.totalScore}
                  <span className="text-xs text-emerald-400 font-bold"> / 100</span>
                </div>
                <span className="text-[10px] uppercase font-bold text-emerald-400">
                  Rating: {scoreData.rating}
                </span>
              </div>

              <div className="pt-2 border-t border-slate-800/80 space-y-1 text-[11px]">
                <div className="flex items-center gap-1.5 text-rose-400">
                  <div className="w-2 h-2 rounded-full bg-rose-500" />
                  <span>Move: {movePercent}%</span>
                </div>
                <div className="flex items-center gap-1.5 text-cyan-400">
                  <div className="w-2 h-2 rounded-full bg-cyan-500" />
                  <span>Mind: {mindPercent}%</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Protein: {fuelPercent}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Key Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatCard
          title="Gym Workout"
          value={hadWorkoutToday ? 'Done' : '6:00 AM'}
          subtext={todayPlan.splitTitle}
          icon={Dumbbell}
          color="emerald"
          onClick={() => onSelectTab('gym')}
        />
        <StatCard
          title="Protein"
          value={`${nutrition.totalProteinG}g`}
          subtext={`/ ${profile.proteinTargetGrams}g target`}
          icon={UtensilsCrossed}
          color="cyan"
          progress={fuelPercent}
          onClick={() => onSelectTab('nutrition')}
        />
        <StatCard
          title="Hydration"
          value={`${nutrition.waterLiters}L`}
          subtext={`/ ${profile.waterTargetLiters}L target`}
          icon={Droplets}
          color="blue"
          progress={Math.round((nutrition.waterLiters / profile.waterTargetLiters) * 100)}
          onClick={() => onSelectTab('nutrition')}
        />
        <StatCard
          title="Sleep"
          value={`${recovery.sleepHours}h`}
          subtext="Bed 21:45 • Wake 05:45"
          icon={Moon}
          color="purple"
          onClick={() => onSelectTab('recovery')}
        />
        <StatCard
          title="Habits"
          value={`${habits.filter((h) => h.completed).length}/${habits.length}`}
          subtext="Daily discipline"
          icon={CheckSquare}
          color="amber"
          progress={Math.round(
            (habits.filter((h) => h.completed).length / (habits.length || 1)) * 100
          )}
          onClick={() => onSelectTab('habits')}
        />
        <StatCard
          title="Mantra Japa"
          value={scoreData.breakdown.meditationScore > 0 ? '108' : 'Pending'}
          subtext="Gayatri / Mahamrityunjaya"
          icon={Sparkles}
          color="rose"
          onClick={() => onSelectTab('meditation')}
        />
      </div>

      {/* Middle Section: Today's Timeline & Priority Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule Card */}
        <div className="lg:col-span-2 rounded-3xl bg-slate-900/80 border border-slate-800 p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" /> Today&apos;s Adaptive Transformation Schedule
            </h3>
            <span className="text-xs font-mono text-slate-400">Office: 10:30 AM – 9:00 PM</span>
          </div>

          <div className="space-y-2.5">
            {[
              { time: '05:45 AM', task: 'Wake-Up, Hydrate 500ml & 4-4 Breathing', done: true, tab: 'alarm' as NavTab },
              { time: '06:00 AM - 07:00 AM', task: `Gym Mode: ${todayPlan.splitTitle}`, done: hadWorkoutToday, tab: 'gym' as NavTab },
              { time: '07:15 AM', task: 'Post-Workout Soya / Oats & AM SPF 50+ Sunscreen', done: false, tab: 'nutrition' as NavTab },
              { time: '10:30 AM - 01:30 PM', task: 'Office Deep Work Block #1 (Zero Social Media Reels)', done: true, tab: 'habits' as NavTab },
              { time: '01:30 PM', task: 'Office High-Protein Vegetarian Lunch', done: false, tab: 'nutrition' as NavTab },
              { time: '05:00 PM', task: 'Moong Sprouts & Pumpkin Seeds Energy Boost', done: false, tab: 'nutrition' as NavTab },
              { time: '09:00 PM - 09:45 PM', task: 'PM Skincare, 20 Pages Reading & Reflection Vlog', done: false, tab: 'skincare' as NavTab },
              { time: '09:45 PM', task: 'Sleep Wind-Down & 4-7-8 Deep Sleep Relaxation', done: false, tab: 'meditation' as NavTab },
            ].map((item, idx) => (
              <div
                key={idx}
                onClick={() => onSelectTab(item.tab)}
                className="group flex items-center justify-between p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-emerald-500/40 cursor-pointer transition"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      item.done ? 'bg-emerald-400' : 'bg-slate-600'
                    }`}
                  />
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 font-bold">{item.time}</span>
                    <p className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {item.task}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
              </div>
            ))}
          </div>
        </div>

        {/* Streaks & Milestone Badges Card */}
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" /> Active Streaks
            </h3>
            <span className="text-xs font-mono text-emerald-400 font-bold">Iron Will</span>
          </div>

          <div className="space-y-2.5">
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Flame className="w-5 h-5 text-rose-500 animate-pulse" />
                <div>
                  <div className="text-xs font-bold text-white">Gym Consistency Streak</div>
                  <span className="text-[10px] text-slate-400">Consecutive split workouts</span>
                </div>
              </div>
              <span className="text-lg font-black text-rose-400 font-mono">14 Days</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <div>
                  <div className="text-xs font-bold text-white">108 Mantra Japa Streak</div>
                  <span className="text-[10px] text-slate-400">Sacred daily beads</span>
                </div>
              </div>
              <span className="text-lg font-black text-amber-400 font-mono">21 Days</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <UtensilsCrossed className="w-5 h-5 text-emerald-400" />
                <div>
                  <div className="text-xs font-bold text-white">130g Protein Streak</div>
                  <span className="text-[10px] text-slate-400">Strict vegetarian</span>
                </div>
              </div>
              <span className="text-lg font-black text-emerald-400 font-mono">18 Days</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold block mb-2">
              Recently Unlocked Badges:
            </span>
            <div className="flex flex-wrap gap-2">
              {achievements
                .filter((a) => a.unlocked)
                .slice(0, 3)
                .map((ach) => (
                  <div
                    key={ach.id}
                    className="px-2.5 py-1 rounded-xl bg-slate-950 border border-amber-500/30 text-[10px] font-bold text-amber-300 flex items-center gap-1"
                  >
                    <Award className="w-3 h-3 text-amber-400" />
                    <span>{ach.title}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
