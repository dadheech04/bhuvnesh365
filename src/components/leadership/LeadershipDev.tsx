import React, { useState } from 'react';
import { leadershipTracksData, LeadershipTrackInfo } from '../../data/leadershipTracks';
import { LeadershipChallenge } from '../../types';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';
import {
  Award,
  Sparkles,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Quote
} from 'lucide-react';

export const LeadershipDev: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = useState<LeadershipTrackInfo>(leadershipTracksData[0]);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [reflectionText, setReflectionText] = useState<{ [challengeId: string]: string }>({});

  const handleCompleteChallenge = (id: string) => {
    sound.playSetComplete();
    if (!completedChallenges.includes(id)) {
      setCompletedChallenges([...completedChallenges, id]);
      confetti({
        particleCount: 50,
        spread: 60,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 sm:p-7 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold mb-2">
              <Award className="w-3.5 h-3.5" /> Executive Mastery & Character Architecture
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Leadership & Personal Development
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              10 dedicated developmental tracks engineered for elite business acumen, verbal elegance, emotional poise,
              and decisive leadership.
            </p>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-mono uppercase text-slate-400">Mastered Challenges</span>
            <div className="text-2xl font-black text-emerald-400 font-mono">
              {completedChallenges.length} / 15
            </div>
          </div>
        </div>

        {/* 10 Track Selector Chips */}
        <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-none mb-6">
          {leadershipTracksData.map((track) => (
            <button
              key={track.id}
              onClick={() => setSelectedTrack(track)}
              className={`flex-shrink-0 px-3.5 py-2 rounded-2xl text-xs font-bold border transition ${
                selectedTrack.id === track.id
                  ? 'bg-emerald-500 text-black border-emerald-400 shadow-md font-extrabold'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              {track.title}
            </button>
          ))}
        </div>

        {/* Track Quote Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 mb-6 flex items-start gap-3">
          <Quote className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs sm:text-sm text-slate-200 italic font-serif">
              &quot;{selectedTrack.quote}&quot;
            </p>
            <p className="text-[11px] text-slate-400 mt-1">{selectedTrack.description}</p>
          </div>
        </div>

        {/* Actionable Challenges List */}
        <div className="space-y-4">
          {selectedTrack.challenges.map((ch) => {
            const isDone = completedChallenges.includes(ch.id);
            return (
              <div
                key={ch.id}
                className={`p-5 rounded-2xl border transition-all ${
                  isDone
                    ? 'bg-emerald-950/20 border-emerald-500/40'
                    : 'bg-slate-950/80 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase font-mono px-2 py-0.5 rounded bg-slate-900 text-emerald-400 border border-slate-800 font-bold">
                      {ch.difficulty}
                    </span>
                    <h3 className="text-sm font-bold text-white">{ch.title}</h3>
                  </div>
                  {isDone && (
                    <span className="flex items-center gap-1 text-xs text-emerald-400 font-bold font-mono">
                      <CheckCircle2 className="w-4 h-4" /> Completed
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-300 mb-3 leading-relaxed">{ch.description}</p>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800/80 mb-3">
                  <strong className="text-xs text-emerald-400 uppercase font-mono block mb-1">
                    Daily Action Assignment:
                  </strong>
                  <p className="text-xs text-slate-200">{ch.actionableStep}</p>
                </div>

                {/* Reflection Input */}
                <div className="space-y-1.5 mb-3">
                  <label className="text-[11px] text-slate-400 font-medium">
                    Reflection Prompt: {ch.reflectionPrompt}
                  </label>
                  <textarea
                    rows={2}
                    value={reflectionText[ch.id] || ''}
                    onChange={(e) =>
                      setReflectionText({ ...reflectionText, [ch.id]: e.target.value })
                    }
                    placeholder="Write your evening debrief observations here..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {!isDone && (
                  <button
                    onClick={() => handleCompleteChallenge(ch.id)}
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider transition"
                  >
                    Mark Assignment Accomplished
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
