import React, { useState } from 'react';
import { weeklyWorkoutSplit } from '../../data/defaultProfile';
import { exerciseLibrary } from '../../data/exercises';
import { Exercise } from '../../types';
import { storage } from '../../utils/storage';
import { ActiveWorkout } from './ActiveWorkout';
import { ExerciseDetailModal } from './ExerciseDetailModal';
import {
  Dumbbell,
  Play,
  Calendar,
  Flame,
  Clock,
  Sparkles,
  Info,
  CheckCircle2,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export const GymTrainerMode: React.FC = () => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(() => {
    const day = new Date().getDay(); // 0 is Sun, 1 is Mon...
    return day === 0 ? 6 : day - 1; // 0 is Mon, 6 is Sun
  });

  const [activeWorkoutMode, setActiveWorkoutMode] = useState(false);
  const [selectedExerciseForModal, setSelectedExerciseForModal] = useState<Exercise | null>(null);

  const selectedPlan = weeklyWorkoutSplit[selectedDayIndex];
  const prescribedExercises = selectedPlan.exerciseIds
    .map((id) => exerciseLibrary.find((ex) => ex.id === id))
    .filter((ex): ex is Exercise => Boolean(ex));

  const recentWorkouts = storage.getWorkouts();

  if (activeWorkoutMode && prescribedExercises.length > 0) {
    return (
      <ActiveWorkout
        exercises={prescribedExercises}
        workoutTitle={selectedPlan.splitTitle}
        onFinishWorkout={() => setActiveWorkoutMode(false)}
        onCancel={() => setActiveWorkoutMode(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 p-5 sm:p-7 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold mb-2">
              <Clock className="w-3.5 h-3.5" /> 6:00 AM – 7:00 AM Priority Window
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Intelligent Gym Trainer
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Strictly engineered hypertrophy and strength routine with automatic rest timing, set logging, and safe
              progressive overload for Bhuvnesh Dadheech.
            </p>
          </div>

          {!selectedPlan.isRestDay && (
            <button
              onClick={() => setActiveWorkoutMode(true)}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-black text-sm uppercase tracking-wider shadow-lg shadow-emerald-500/30 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5 fill-black" />
              <span>Enter Gym Mode</span>
            </button>
          )}
        </div>
      </div>

      {/* Weekly Day Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {weeklyWorkoutSplit.map((plan, idx) => {
          const isSelected = selectedDayIndex === idx;
          const isToday = (new Date().getDay() === 0 ? 6 : new Date().getDay() - 1) === idx;
          return (
            <button
              key={plan.dayName}
              onClick={() => setSelectedDayIndex(idx)}
              className={`flex-shrink-0 px-4 py-3 rounded-2xl text-xs font-bold transition-all border ${
                isSelected
                  ? 'bg-emerald-500 text-black border-emerald-400 shadow-md shadow-emerald-500/20 scale-[1.02]'
                  : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-1.5 justify-between">
                <span>{plan.dayName.slice(0, 3)}</span>
                {isToday && (
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isSelected ? 'bg-black' : 'bg-emerald-400 animate-pulse'
                    }`}
                  />
                )}
              </div>
              <p
                className={`text-[10px] font-normal truncate max-w-[90px] mt-0.5 ${
                  isSelected ? 'text-black/80 font-medium' : 'text-slate-400'
                }`}
              >
                {plan.isRestDay ? 'Rest / Zen' : plan.splitTitle.split(' ')[0]}
              </p>
            </button>
          );
        })}
      </div>

      {/* Selected Day Split Details */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 font-bold">
              {selectedPlan.dayName} Split Plan
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">{selectedPlan.splitTitle}</h2>
          </div>
          <div className="flex items-center gap-2">
            {selectedPlan.focusMuscles.map((muscle) => (
              <span
                key={muscle}
                className="text-[10px] font-mono px-2 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700/60"
              >
                {muscle}
              </span>
            ))}
          </div>
        </div>

        {selectedPlan.isRestDay ? (
          <div className="p-8 rounded-2xl bg-cyan-950/20 border border-cyan-800/30 text-center my-4">
            <Sparkles className="w-10 h-10 text-cyan-400 mx-auto mb-2" />
            <h3 className="text-lg font-bold text-white">Full Body Recovery & Mind Recharge</h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto mt-1 leading-relaxed">
              Muscles grow during deep sleep and rest, not while lifting. Enjoy a leisurely outdoor walk, practice the 108
              Gayatri Mantra beads, and hit your 130g vegetarian protein target today.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {prescribedExercises.map((exercise, index) => (
              <div
                key={exercise.id}
                className="group flex items-center justify-between p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-emerald-500/40 transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-mono text-xs font-bold flex items-center justify-center">
                    0{index + 1}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {exercise.name}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {exercise.defaultSets} Sets × {exercise.defaultReps} Reps • {exercise.recommendedStartingWeightKg} kg • Rest {exercise.defaultRestSec}s
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedExerciseForModal(exercise)}
                    className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 border border-slate-800 transition"
                    title="View Anatomy & Form"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Exercise Modal */}
      {selectedExerciseForModal && (
        <ExerciseDetailModal
          exercise={selectedExerciseForModal}
          onClose={() => setSelectedExerciseForModal(null)}
        />
      )}

      {/* Historical Workout Performance Cards */}
      {recentWorkouts.length > 0 && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
            <Flame className="w-4 h-4 text-emerald-400" /> Recent Completed Workouts
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {recentWorkouts.slice(0, 4).map((wo) => (
              <div
                key={wo.id}
                className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono text-slate-400">{wo.date}</span>
                  <p className="text-xs font-bold text-white">{wo.title}</p>
                  <p className="text-[11px] text-emerald-400 font-mono mt-0.5">
                    {wo.totalSetsCompleted} sets • {wo.totalRepsCompleted} reps • {wo.totalVolumeKg.toLocaleString()} kg volume
                  </p>
                </div>
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
