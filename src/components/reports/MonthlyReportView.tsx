import React, { useState } from 'react';
import { generateMonthlyReport } from '../../utils/analytics';
import { exportMonthlyReportPDF } from '../../utils/pdfExport';
import { sound } from '../../utils/audio';
import {
  FileText,
  Download,
  Trophy,
  Dumbbell,
  Compass,
  Waves,
  Bike,
  Sparkles,
  UtensilsCrossed,
  HeartPulse,
  Award,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  Target
} from 'lucide-react';

export const MonthlyReportView: React.FC = () => {
  const [monthOffset, setMonthOffset] = useState<number>(0);
  const report = generateMonthlyReport(monthOffset);

  const handleDownloadPDF = () => {
    sound.playSetComplete();
    exportMonthlyReportPDF(report);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 sm:p-7 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold mb-2">
              <FileText className="w-3.5 h-3.5" /> Executive Transformation Audit
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Monthly Transformation Report: {report.monthYear}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Holistic multidimensional assessment of strength volume, running cardio, swimming, mantra japa, strict
              vegetarian protein, and habit compliance.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMonthOffset((prev) => Math.max(0, prev - 1))}
              disabled={monthOffset === 0}
              className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs font-bold text-slate-300 disabled:opacity-40"
            >
              Current
            </button>
            <button
              onClick={() => setMonthOffset((prev) => prev + 1)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs font-bold text-slate-300"
            >
              Previous Month
            </button>
            <button
              onClick={handleDownloadPDF}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-500/25 transition active:scale-95"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>Download PDF Audit</span>
            </button>
          </div>
        </div>

        {/* Biometric Summary Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
            <span className="text-[10px] uppercase font-mono text-slate-400">Transformation Score</span>
            <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono mt-1">
              {report.transformationScore}
            </div>
            <span className="text-xs text-slate-400 font-bold">/ 100 ELITE</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
            <span className="text-[10px] uppercase font-mono text-slate-400">Starting Weight</span>
            <div className="text-3xl sm:text-4xl font-black text-white font-mono mt-1">
              {report.startingWeightKg} kg
            </div>
            <span className="text-xs text-slate-400 font-bold">CURRENT: {report.currentWeightKg} KG</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
            <span className="text-[10px] uppercase font-mono text-slate-400">Waist Measurement</span>
            <div className="text-3xl sm:text-4xl font-black text-cyan-400 font-mono mt-1">
              {report.waistCm} cm
            </div>
            <span className="text-xs text-emerald-400 font-bold">TARGET: 80 CM</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
            <span className="text-[10px] uppercase font-mono text-slate-400">Avg Daily Protein</span>
            <div className="text-3xl sm:text-4xl font-black text-amber-400 font-mono mt-1">
              {report.nutritionStats.avgDailyProteinG}g
            </div>
            <span className="text-xs text-amber-400 font-bold">
              {report.nutritionStats.proteinCompliancePercent}% COMPLIANCE
            </span>
          </div>
        </div>

        {/* Multidimensional Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
          {/* Gym Performance Pillar */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h3 className="text-sm font-bold text-white uppercase font-mono flex items-center gap-2">
              <Dumbbell className="w-4 h-4 text-emerald-400" /> Gym & Hypertrophy Metrics
            </h3>
            <div className="text-xs text-slate-300 space-y-1.5 pt-1">
              <p>• Completed Workouts: <strong>{report.gymStats.totalWorkouts} sessions</strong> ({report.gymStats.consistencyPercent}% compliance)</p>
              <p>• Total Repetitions: <strong>{report.gymStats.totalReps.toLocaleString()} reps</strong> across {report.gymStats.totalSets} sets</p>
              <p>• Total Volume Lifted: <strong>{report.gymStats.totalVolumeKg.toLocaleString()} kg</strong></p>
              <p>• Peak Progression: <strong className="text-emerald-400">{report.gymStats.topProgressedLift}</strong></p>
            </div>
          </div>

          {/* Running & Cardio Pillar */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h3 className="text-sm font-bold text-white uppercase font-mono flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400" /> Outdoor Running & Cardio
            </h3>
            <div className="text-xs text-slate-300 space-y-1.5 pt-1">
              <p>• Total Running: <strong>{report.runningStats.totalKm} km</strong> ({report.runningStats.totalRuns} outdoor sessions)</p>
              <p>• Average Pace: <strong>{report.runningStats.avgPaceMinKm} min/km</strong> (Fastest: {report.runningStats.fastestKmMin} min/km)</p>
              <p>• Longest Continuous Run: <strong>{report.runningStats.longestKm} km</strong></p>
              <p>• Cycling Volume: <strong>{report.cyclingStats.totalKm} km</strong> at avg {report.cyclingStats.avgSpeedKmh} km/h</p>
            </div>
          </div>

          {/* Swimming & Aquatic Conditioning */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h3 className="text-sm font-bold text-white uppercase font-mono flex items-center gap-2">
              <Waves className="w-4 h-4 text-cyan-400" /> Swimming & Pool Metrics
            </h3>
            <div className="text-xs text-slate-300 space-y-1.5 pt-1">
              <p>• Total Aquatic Distance: <strong>{report.swimmingStats.totalMeters.toLocaleString()} meters</strong></p>
              <p>• Number of Pool Sessions: <strong>{report.swimmingStats.totalSessions}</strong></p>
              <p>• Average Pace: <strong>{report.swimmingStats.avgPace100m}</strong></p>
            </div>
          </div>

          {/* Meditation & Mind Master */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h3 className="text-sm font-bold text-white uppercase font-mono flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" /> Meditation & Mantra Japa
            </h3>
            <div className="text-xs text-slate-300 space-y-1.5 pt-1">
              <p>• Total Stillness Time: <strong>{report.meditationStats.totalMinutes} minutes</strong></p>
              <p>• Sessions Completed: <strong>{report.meditationStats.totalSessions}</strong> ({report.meditationStats.consistencyPercent}% consistency)</p>
              <p>• Sacred Mantra Beads: <strong>{report.meditationStats.totalMantraReps.toLocaleString()} repetitions</strong> (Gayatri & Mahamrityunjaya)</p>
            </div>
          </div>
        </div>

        {/* AI Performance Coach Synthesis */}
        <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 mb-6">
          <h3 className="text-xs uppercase font-mono tracking-wider text-emerald-400 font-bold mb-2">
            Coach Synthesis & Biometric Assessment:
          </h3>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{report.coachSummary}</p>
        </div>

        {/* Next Month Targets */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
          <h3 className="text-xs uppercase font-mono tracking-wider text-white font-bold mb-3 flex items-center gap-2">
            <Target className="w-4 h-4 text-emerald-400" /> Prescriptive Milestones for Next Month:
          </h3>
          <ul className="space-y-2 text-xs text-slate-300">
            {report.nextMonthTargets.map((target, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{target}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
