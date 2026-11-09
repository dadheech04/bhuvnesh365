import React from 'react';
import { Exercise } from '../../types';
import { MuscleAnatomy } from '../common/MuscleAnatomy';
import { X, AlertTriangle, ShieldCheck, CheckCircle2, RefreshCw } from 'lucide-react';

interface ExerciseDetailModalProps {
  exercise: Exercise;
  onClose: () => void;
  onSelectAlternative?: (altName: string) => void;
}

export const ExerciseDetailModal: React.FC<ExerciseDetailModalProps> = ({
  exercise,
  onClose,
  onSelectAlternative,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0f172a] border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl my-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
            {exercise.category[0]}
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400">
              {exercise.equipment} • {exercise.category}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">{exercise.name}</h2>
          </div>
        </div>

        {/* Anatomical Visualizer */}
        <div className="my-5 flex justify-center">
          <MuscleAnatomy
            activeMuscles={exercise.targetMuscles}
            secondaryMuscles={exercise.secondaryMuscles}
            size="md"
          />
        </div>

        {/* Quick Prescription Bar */}
        <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-center my-4">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">Prescribed</span>
            <p className="text-sm font-black text-white">{exercise.defaultSets} Sets × {exercise.defaultReps} Reps</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">Start Weight</span>
            <p className="text-sm font-black text-emerald-400">{exercise.recommendedStartingWeightKg} kg</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">Rest Duration</span>
            <p className="text-sm font-black text-cyan-400">{exercise.defaultRestSec}s</p>
          </div>
        </div>

        <div className="space-y-4 max-h-[45vh] overflow-y-auto pr-1">
          {/* Step-by-Step Instructions */}
          <div>
            <h3 className="text-xs uppercase font-mono tracking-wider text-slate-300 font-bold mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Step-by-Step Execution
            </h3>
            <ol className="space-y-2 text-xs text-slate-300 pl-4 list-decimal marker:text-emerald-500">
              {exercise.instructions.map((step, idx) => (
                <li key={idx} className="leading-relaxed">{step}</li>
              ))}
            </ol>
          </div>

          {/* Posture & Alignment */}
          <div className="p-3.5 rounded-2xl bg-cyan-950/20 border border-cyan-800/30">
            <h3 className="text-xs uppercase font-mono tracking-wider text-cyan-400 font-bold mb-1.5 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Form Cues & Posture
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-300 list-disc pl-4 marker:text-cyan-400">
              {exercise.postureTips.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>

          {/* Common Mistakes & Safety */}
          <div className="p-3.5 rounded-2xl bg-rose-950/20 border border-rose-800/30">
            <h3 className="text-xs uppercase font-mono tracking-wider text-rose-400 font-bold mb-1.5 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" /> Common Mistakes to Avoid
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-300 list-disc pl-4 marker:text-rose-400">
              {exercise.commonMistakes.map((m, idx) => (
                <li key={idx}>{m}</li>
              ))}
            </ul>
          </div>

          {/* Alternatives */}
          {exercise.alternativeExercises.length > 0 && (
            <div>
              <h3 className="text-xs uppercase font-mono tracking-wider text-slate-400 font-bold mb-2 flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 text-slate-400" /> Safe Alternatives
              </h3>
              <div className="flex flex-wrap gap-2">
                {exercise.alternativeExercises.map((alt, idx) => (
                  <button
                    key={idx}
                    onClick={() => onSelectAlternative && onSelectAlternative(alt)}
                    className="text-xs px-2.5 py-1 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60"
                  >
                    {alt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-5 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider transition"
          >
            Got It, Ready to Lift
          </button>
        </div>
      </div>
    </div>
  );
};
