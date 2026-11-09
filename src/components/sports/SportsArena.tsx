import React, { useState } from 'react';
import { sportsArenaList, SportArenaItem } from '../../data/sportsArenaDb';
import { SportsActivity } from '../../types';
import { storage, getTodayKey } from '../../utils/storage';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';
import {
  Trophy,
  Award,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  Play
} from 'lucide-react';

export const SportsArena: React.FC = () => {
  const [selectedSport, setSelectedSport] = useState<SportArenaItem>(sportsArenaList[0]);
  const [selectedLevel, setSelectedLevel] = useState<'EASY' | 'MEDIUM' | 'HARD'>('MEDIUM');
  const [assessmentStep, setAssessmentStep] = useState(false);
  const [assessmentResultReason, setAssessmentResultReason] = useState<string>('');
  const [durationMin, setDurationMin] = useState(45);

  const handleRunAssessment = (condition: 'easy' | 'med' | 'hard') => {
    sound.playTap();
    if (condition === 'easy') {
      setSelectedLevel('EASY');
      setAssessmentResultReason(
        'Recommended Level: EASY. Foundation phase to establish tendon durability and neuromuscular mechanics before introducing high-velocity rotation.'
      );
    } else if (condition === 'med') {
      setSelectedLevel('MEDIUM');
      setAssessmentResultReason(
        'Recommended Level: MEDIUM. You possess strong foundational athletic conditioning. Medium drills will challenge tactical stamina and precision under fatigue.'
      );
    } else {
      setSelectedLevel('HARD');
      setAssessmentResultReason(
        'Recommended Level: HARD. High-intensity competitive protocols unlocked. Prioritize dynamic warm-up to safeguard hamstrings and shoulders.'
      );
    }
    setAssessmentStep(false);
  };

  const handleLogActivity = () => {
    sound.playSetComplete();

    const activity: SportsActivity = {
      id: `sport_${Date.now()}`,
      sport: selectedSport.name as SportsActivity['sport'],
      date: getTodayKey(),
      durationMinutes: durationMin,
      difficultyLevel: selectedLevel,
      challengesCompleted: [selectedSport.levels[selectedLevel].targetScore],
      skillsPracticed: selectedSport.levels[selectedLevel].skills,
      caloriesBurned: Math.round(durationMin * 8.5),
    };

    storage.saveSportsActivity(activity);

    confetti({
      particleCount: 60,
      spread: 60,
    });
  };

  const currentLevelData = selectedSport.levels[selectedLevel];

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 sm:p-7 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold mb-2">
              <Trophy className="w-3.5 h-3.5" /> Sports Arena & Strategic Play
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Athletic Sports & Games Module
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Multi-discipline athletic arenas featuring structured Easy, Medium, and Hard tiers, skill rubrics, and
              tactical mental challenges.
            </p>
          </div>

          <button
            onClick={() => setAssessmentStep(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 transition self-start sm:self-auto"
          >
            <HelpCircle className="w-4 h-4 text-emerald-400" />
            Skill Assessment Quiz
          </button>
        </div>

        {/* Sport Selection Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none mb-6">
          {sportsArenaList.map((sport) => (
            <button
              key={sport.id}
              onClick={() => {
                setSelectedSport(sport);
                setAssessmentResultReason('');
              }}
              className={`flex-shrink-0 px-4 py-2.5 rounded-2xl text-xs font-bold border transition ${
                selectedSport.id === sport.id
                  ? 'bg-emerald-500 text-black border-emerald-400 shadow-md font-extrabold'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              {sport.name}
            </button>
          ))}
        </div>

        {/* Assessment Reason Banner */}
        {assessmentResultReason && (
          <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-xs text-emerald-300 mb-6 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">{assessmentResultReason}</p>
          </div>
        )}

        {/* Difficulty Level Selector */}
        <div className="flex items-center gap-2 mb-6">
          {(['EASY', 'MEDIUM', 'HARD'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`flex-1 py-3 rounded-2xl text-xs font-bold font-mono tracking-wider border transition ${
                selectedLevel === lvl
                  ? lvl === 'HARD'
                    ? 'bg-rose-500 text-black border-rose-400 font-black'
                    : lvl === 'MEDIUM'
                    ? 'bg-amber-500 text-black border-amber-400 font-black'
                    : 'bg-emerald-500 text-black border-emerald-400 font-black'
                  : 'bg-slate-950 text-slate-400 border-slate-800'
              }`}
            >
              {lvl} TIER
            </button>
          ))}
        </div>

        {/* Selected Tier Challenge Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">{currentLevelData.title}</h3>
            <span className="text-xs font-mono text-emerald-400 font-bold">
              ~{currentLevelData.durationMin} Minutes
            </span>
          </div>

          <div>
            <span className="text-xs font-mono uppercase text-slate-400 font-bold block mb-1.5">
              Core Technical Skills Trained:
            </span>
            <ul className="text-xs text-slate-300 list-disc pl-4 space-y-1">
              {currentLevelData.skills.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-xs font-mono uppercase text-slate-400 font-bold block mb-1.5">
              Prescribed Drills:
            </span>
            <ul className="text-xs text-slate-300 list-disc pl-4 space-y-1">
              {currentLevelData.drills.map((d, idx) => (
                <li key={idx}>{d}</li>
              ))}
            </ul>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
            <strong>Benchmark Target:</strong> {currentLevelData.targetScore}
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono">Session Duration:</span>
              <button
                onClick={() => setDurationMin((d) => Math.max(15, d - 15))}
                className="w-7 h-7 rounded bg-slate-800 text-white font-bold text-xs"
              >
                -
              </button>
              <span className="text-xs font-mono text-white font-bold">{durationMin} min</span>
              <button
                onClick={() => setDurationMin((d) => d + 15)}
                className="w-7 h-7 rounded bg-slate-800 text-white font-bold text-xs"
              >
                +
              </button>
            </div>

            <button
              onClick={handleLogActivity}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider transition"
            >
              Log {selectedSport.name} Session
            </button>
          </div>
        </div>
      </div>

      {/* Assessment Modal */}
      {assessmentStep && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#0f172a] border border-slate-800 rounded-3xl p-6 shadow-2xl">
            <h3 className="text-lg font-black text-white mb-2">
              {selectedSport.name} Ability Assessment
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Select your current experience level to receive a personalized difficulty recommendation.
            </p>
            <div className="space-y-2.5">
              <button
                onClick={() => handleRunAssessment('easy')}
                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500 text-left text-xs text-slate-200 font-semibold"
              >
                <div className="text-emerald-400 font-bold mb-0.5">Beginner / Recreational</div>
                <div className="text-slate-400 text-[11px]">
                  {selectedSport.assessmentQuestions[0]?.easyCondition || 'Basic fundamental play'}
                </div>
              </button>

              <button
                onClick={() => handleRunAssessment('med')}
                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500 text-left text-xs text-slate-200 font-semibold"
              >
                <div className="text-amber-400 font-bold mb-0.5">Intermediate / Club Level</div>
                <div className="text-slate-400 text-[11px]">
                  {selectedSport.assessmentQuestions[0]?.medCondition || 'Regular player with good stamina'}
                </div>
              </button>

              <button
                onClick={() => handleRunAssessment('hard')}
                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-rose-500 text-left text-xs text-slate-200 font-semibold"
              >
                <div className="text-rose-400 font-bold mb-0.5">Advanced / Tournament Competitor</div>
                <div className="text-slate-400 text-[11px]">
                  {selectedSport.assessmentQuestions[0]?.hardCondition || 'High competitive skill'}
                </div>
              </button>
            </div>
            <button
              onClick={() => setAssessmentStep(false)}
              className="w-full mt-4 py-2 text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
