import React, { useState, useEffect } from 'react';
import { Exercise, ExerciseSessionRecord, WorkoutSetRecord, WorkoutSession } from '../../types';
import { sound } from '../../utils/audio';
import { storage, getTodayKey } from '../../utils/storage';
import confetti from 'canvas-confetti';
import {
  Play,
  CheckCircle2,
  SkipForward,
  Plus,
  AlertOctagon,
  Info,
  ArrowRight,
  Sparkles,
  ShieldAlert,
  ChevronLeft
} from 'lucide-react';
import { ExerciseDetailModal } from './ExerciseDetailModal';

interface ActiveWorkoutProps {
  exercises: Exercise[];
  workoutTitle: string;
  onFinishWorkout: () => void;
  onCancel: () => void;
}

export const ActiveWorkout: React.FC<ActiveWorkoutProps> = ({
  exercises,
  workoutTitle,
  onFinishWorkout,
  onCancel,
}) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSetNumber, setCurrentSetNumber] = useState(1);
  const [sessionRecords, setSessionRecords] = useState<ExerciseSessionRecord[]>(() =>
    exercises.map((ex) => ({
      exerciseId: ex.id,
      exerciseName: ex.name,
      sets: Array.from({ length: ex.defaultSets }, (_, i) => ({
        setNumber: i + 1,
        targetReps: ex.defaultReps,
        actualReps: ex.defaultReps,
        weightKg: ex.recommendedStartingWeightKg,
        completed: false,
      })),
      skipped: false,
    }))
  );

  // Rest Timer State
  const [isResting, setIsResting] = useState(false);
  const [restSecondsLeft, setRestSecondsLeft] = useState(0);
  const [totalRestDuration, setTotalRestDuration] = useState(60);

  // Current inputs
  const currentExercise = exercises[currentExerciseIndex];
  const currentRecord = sessionRecords[currentExerciseIndex];
  const currentSet = currentRecord?.sets[currentSetNumber - 1];

  const [inputWeight, setInputWeight] = useState<number>(
    currentSet?.weightKg ?? currentExercise.recommendedStartingWeightKg
  );
  const [inputReps, setInputReps] = useState<number>(
    currentSet?.actualReps ?? currentExercise.defaultReps
  );

  // Modals & Safety
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showPainModal, setShowPainModal] = useState(false);
  const [painMessage, setPainMessage] = useState('');
  const [progressiveOverloadPrompt, setProgressiveOverloadPrompt] = useState<{
    exerciseName: string;
    currentWeight: number;
    suggestedWeight: number;
  } | null>(null);

  // Sync inputs when exercise or set changes
  useEffect(() => {
    if (currentSet) {
      setInputWeight(currentSet.weightKg);
      setInputReps(currentSet.actualReps);
    }
  }, [currentExerciseIndex, currentSetNumber]);

  // Countdown Rest Timer Effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isResting && restSecondsLeft > 0) {
      timer = setInterval(() => {
        setRestSecondsLeft((prev) => {
          if (prev <= 1) {
            sound.playTimerDone();
            setIsResting(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isResting, restSecondsLeft]);

  // Handle Set Completed
  const handleCompleteSet = () => {
    sound.playSetComplete();

    // Vibrate phone if mobile support exists
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate([100, 50, 100]);
      } catch {
        // ignore
      }
    }

    const updated = [...sessionRecords];
    const rec = updated[currentExerciseIndex];
    rec.sets[currentSetNumber - 1] = {
      ...rec.sets[currentSetNumber - 1],
      weightKg: Number(inputWeight),
      actualReps: Number(inputReps),
      completed: true,
    };
    setSessionRecords(updated);

    // Start Rest Timer automatically
    const restTime = currentExercise.defaultRestSec || 60;
    setTotalRestDuration(restTime);
    setRestSecondsLeft(restTime);
    setIsResting(true);

    // Advance set or exercise
    if (currentSetNumber < currentExercise.defaultSets) {
      setCurrentSetNumber((prev) => prev + 1);
    } else {
      // Finished all sets for this exercise!
      // Check for progressive overload viability
      const allSetsHitTarget = rec.sets.every(
        (s) => s.actualReps >= currentExercise.defaultReps && s.completed
      );
      if (allSetsHitTarget && currentExercise.category !== 'Cardio') {
        const increment = currentExercise.recommendedStartingWeightKg >= 20 ? 2.5 : 1.25;
        setProgressiveOverloadPrompt({
          exerciseName: currentExercise.name,
          currentWeight: inputWeight,
          suggestedWeight: Math.round((inputWeight + increment) * 10) / 10,
        });
      }

      if (currentExerciseIndex < exercises.length - 1) {
        // Unlock next exercise
        setCurrentExerciseIndex((prev) => prev + 1);
        setCurrentSetNumber(1);
      }
    }
  };

  const handleSkipRest = () => {
    setIsResting(false);
    setRestSecondsLeft(0);
    sound.playTap();
  };

  const handleAdd30sRest = () => {
    setRestSecondsLeft((prev) => prev + 30);
    sound.playTap();
  };

  const handleSkipExercise = () => {
    const updated = [...sessionRecords];
    updated[currentExerciseIndex].skipped = true;
    setSessionRecords(updated);
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex((prev) => prev + 1);
      setCurrentSetNumber(1);
    }
  };

  const handleReportPain = (location: string) => {
    const updated = [...sessionRecords];
    updated[currentExerciseIndex].painReported = true;
    updated[currentExerciseIndex].painDetails = location;
    setSessionRecords(updated);
    setShowPainModal(false);
    setPainMessage(
      `Discomfort flagged in ${location}. AI Coach Safety Notice: Stop this movement immediately. Joint integrity and long-term transformation always precede ego-lifting.`
    );
  };

  const handleFinishWorkout = () => {
    // Calculate totals
    let totalVol = 0;
    let totalSets = 0;
    let totalReps = 0;

    sessionRecords.forEach((rec) => {
      rec.sets.forEach((s) => {
        if (s.completed) {
          totalSets += 1;
          totalReps += s.actualReps;
          totalVol += s.actualReps * s.weightKg;
        }
      });
    });

    const session: WorkoutSession = {
      id: `w_${Date.now()}`,
      date: getTodayKey(),
      title: workoutTitle,
      dayOfWeek: new Date().getDay(),
      exercises: sessionRecords,
      durationMinutes: 55,
      totalVolumeKg: Math.round(totalVol),
      totalSetsCompleted: totalSets,
      totalRepsCompleted: totalReps,
      completedAt: new Date().toISOString(),
      coachAdvice:
        'Great muscular tension created. Ensure strict 130g vegetarian protein intake within 2 hours to initiate myofibrillar repair.',
    };

    storage.saveWorkout(session);

    // Celebration
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });

    onFinishWorkout();
  };

  const isLastExercise = currentExerciseIndex === exercises.length - 1;
  const isLastSet = currentSetNumber === currentExercise.defaultSets;
  const hasFinishedAll = sessionRecords.every((r) =>
    r.skipped || r.sets.every((s) => s.completed)
  );

  return (
    <div className="min-h-[85vh] bg-[#090d16] text-white flex flex-col justify-between p-3 sm:p-6 rounded-3xl border border-slate-800 shadow-2xl relative">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <button
          onClick={onCancel}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800"
        >
          <ChevronLeft className="w-4 h-4" /> Exit
        </button>
        <div className="text-center">
          <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-bold">
            Gym Mode • {workoutTitle}
          </span>
          <p className="text-xs text-slate-300 font-medium">
            Exercise {currentExerciseIndex + 1} of {exercises.length}
          </p>
        </div>
        <button
          onClick={() => setShowDetailModal(true)}
          className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 px-2.5 py-1.5 rounded-xl bg-cyan-950/40 border border-cyan-800/40"
        >
          <Info className="w-4 h-4" /> Form Cues
        </button>
      </div>

      {/* Safety Alert Banner if Pain Reported */}
      {painMessage && (
        <div className="my-3 p-3 rounded-2xl bg-rose-950/40 border border-rose-500/50 flex items-start gap-3 text-rose-300 text-xs">
          <ShieldAlert className="w-5 h-5 flex-shrink-0 text-rose-400" />
          <p className="leading-relaxed">{painMessage}</p>
        </div>
      )}

      {/* Exercise Overview Card */}
      <div className="my-auto py-4 text-center">
        <span className="text-xs uppercase font-mono tracking-wider text-slate-400">
          Target: {currentExercise.targetMuscles.join(', ')} • {currentExercise.equipment}
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-1 mb-2">
          {currentExercise.name}
        </h1>

        {/* Set & Rep Indicator Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-black mb-6">
          <span>Set {currentSetNumber} of {currentExercise.defaultSets}</span>
          <span>•</span>
          <span>Target: {currentExercise.defaultReps} Reps</span>
        </div>

        {/* Big Touch Controls for Weight & Reps */}
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto my-3">
          {/* Weight Control */}
          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-3xl flex flex-col items-center">
            <span className="text-xs font-mono uppercase text-slate-400">Weight (KG)</span>
            <div className="flex items-center gap-3 my-2">
              <button
                onClick={() => setInputWeight((w) => Math.max(0, Math.round((w - 2.5) * 10) / 10))}
                className="w-11 h-11 rounded-2xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-white font-bold text-lg flex items-center justify-center border border-slate-700"
              >
                -
              </button>
              <span className="text-3xl sm:text-4xl font-black text-white font-mono w-20 text-center">
                {inputWeight}
              </span>
              <button
                onClick={() => setInputWeight((w) => Math.round((w + 2.5) * 10) / 10)}
                className="w-11 h-11 rounded-2xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-white font-bold text-lg flex items-center justify-center border border-slate-700"
              >
                +
              </button>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Total dumbbell / plate</span>
          </div>

          {/* Reps Control */}
          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-3xl flex flex-col items-center">
            <span className="text-xs font-mono uppercase text-slate-400">Completed Reps</span>
            <div className="flex items-center gap-3 my-2">
              <button
                onClick={() => setInputReps((r) => Math.max(1, r - 1))}
                className="w-11 h-11 rounded-2xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-white font-bold text-lg flex items-center justify-center border border-slate-700"
              >
                -
              </button>
              <span className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono w-16 text-center">
                {inputReps}
              </span>
              <button
                onClick={() => setInputReps((r) => r + 1)}
                className="w-11 h-11 rounded-2xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-white font-bold text-lg flex items-center justify-center border border-slate-700"
              >
                +
              </button>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Strict form count</span>
          </div>
        </div>

        {/* Rest Timer Drawer (Active during rest) */}
        {isResting && (
          <div className="max-w-md mx-auto my-4 p-4 rounded-3xl bg-cyan-950/40 border border-cyan-500/40 animate-pulse">
            <span className="text-xs uppercase font-mono tracking-wider text-cyan-400 font-bold">
              Rest & Oxygen Recovery
            </span>
            <div className="text-4xl font-black text-white font-mono my-1">
              {Math.floor(restSecondsLeft / 60)}:{(restSecondsLeft % 60).toString().padStart(2, '0')}
            </div>
            <div className="flex items-center justify-center gap-2 mt-3">
              <button
                onClick={handleAdd30sRest}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-cyan-300 flex items-center gap-1 border border-slate-700"
              >
                <Plus className="w-3.5 h-3.5" /> +30s
              </button>
              <button
                onClick={handleSkipRest}
                className="px-4 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-black uppercase tracking-wider flex items-center gap-1"
              >
                <SkipForward className="w-3.5 h-3.5" /> Skip Rest
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Progressive Overload Notification Banner */}
      {progressiveOverloadPrompt && (
        <div className="max-w-md mx-auto mb-3 p-3.5 rounded-2xl bg-emerald-950/50 border border-emerald-500/50 flex items-center justify-between text-xs">
          <div>
            <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Progressive Overload Unlocked
            </span>
            <p className="text-slate-200 mt-0.5">
              Hit all reps! Suggest increasing {progressiveOverloadPrompt.exerciseName} to{' '}
              <strong className="text-emerald-400">{progressiveOverloadPrompt.suggestedWeight} kg</strong> next session.
            </p>
          </div>
          <button
            onClick={() => setProgressiveOverloadPrompt(null)}
            className="px-2.5 py-1 rounded-lg bg-emerald-500 text-black font-bold text-[10px] uppercase ml-2 flex-shrink-0"
          >
            Accept
          </button>
        </div>
      )}

      {/* Bottom Main Execution Bar */}
      <div className="space-y-3 pt-2 border-t border-slate-800/80">
        <div className="flex items-center gap-3">
          {/* Set Completed Main Large Button (60px height target) */}
          <button
            onClick={handleCompleteSet}
            className="flex-1 h-14 sm:h-16 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 active:scale-[0.98] text-black font-black text-base sm:text-lg uppercase tracking-wider shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2.5 transition"
          >
            <CheckCircle2 className="w-6 h-6 text-black" />
            <span>Complete Set {currentSetNumber}</span>
          </button>

          {/* Skip Exercise Button */}
          <button
            onClick={handleSkipExercise}
            className="h-14 sm:h-16 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-xs font-bold"
            title="Skip Exercise"
          >
            Skip
          </button>
        </div>

        {/* Safety & Navigation Actions */}
        <div className="flex items-center justify-between text-xs">
          <button
            onClick={() => setShowPainModal(true)}
            className="text-rose-400 hover:text-rose-300 flex items-center gap-1.5 font-semibold py-1 px-2 rounded-lg hover:bg-rose-950/30"
          >
            <AlertOctagon className="w-4 h-4" /> Report Pain / Discomfort
          </button>

          {(hasFinishedAll || (isLastExercise && isLastSet)) && (
            <button
              onClick={handleFinishWorkout}
              className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs uppercase tracking-wider shadow-md shadow-cyan-500/25 flex items-center gap-1.5 animate-bounce"
            >
              Finish Workout <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Modals */}
      {showDetailModal && (
        <ExerciseDetailModal
          exercise={currentExercise}
          onClose={() => setShowDetailModal(false)}
        />
      )}

      {/* Pain & Discomfort Assessment Modal */}
      {showPainModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#0f172a] border border-rose-500/40 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center gap-2 text-rose-400 mb-2">
              <ShieldAlert className="w-6 h-6" />
              <h3 className="text-lg font-black text-white">Report Pain or Unusual Discomfort</h3>
            </div>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              True strength lies in injury prevention. If you feel sharp joint pain, tendon strain, or dizziness, stop
              this exercise immediately.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs mb-4">
              {['Shoulder Anterior', 'Lower Back', 'Knee Joint', 'Elbow Tendon', 'Neck Strain', 'Dizziness'].map(
                (loc) => (
                  <button
                    key={loc}
                    onClick={() => handleReportPain(loc)}
                    className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-rose-500 text-slate-200 text-left font-semibold"
                  >
                    {loc}
                  </button>
                )
              )}
            </div>
            <button
              onClick={() => setShowPainModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
            >
              Cancel / False Alarm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
