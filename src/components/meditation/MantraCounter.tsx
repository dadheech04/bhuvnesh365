import React, { useState } from 'react';
import { mantrasData, MantraInfo } from '../../data/mantras';
import { sound } from '../../utils/audio';
import { storage, getTodayKey } from '../../utils/storage';
import { MeditationSession } from '../../types';
import confetti from 'canvas-confetti';
import {
  Sun,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  BookOpen,
  Volume2
} from 'lucide-react';

export const MantraCounter: React.FC = () => {
  const [selectedMantra, setSelectedMantra] = useState<MantraInfo>(mantrasData[0]);
  const [japaCount, setJapaCount] = useState<number>(0);
  const [targetJapa] = useState<number>(108);
  const [showMeaning, setShowMeaning] = useState(false);

  const handleIncrement = () => {
    sound.playJapaChime();
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(40);
      } catch {
        // ignore
      }
    }

    const nextCount = japaCount + 1;
    setJapaCount(nextCount);

    if (nextCount === targetJapa) {
      sound.playTibetanBowl();
      confetti({
        particleCount: 108,
        spread: 80,
        origin: { y: 0.6 },
      });

      // Save to storage
      const session: MeditationSession = {
        id: `japa_${Date.now()}`,
        date: getTodayKey(),
        type: selectedMantra.id === 'gayatri-mantra' ? 'Gayatri Mantra' : 'Mahamrityunjaya Mantra',
        durationMinutes: 15,
        japaCount: 108,
        targetJapa: 108,
        moodAfter: 'Clarity',
        notes: `Completed full 108 mala of ${selectedMantra.name}`,
      };
      storage.saveMeditationSession(session);
    }
  };

  const handleReset = () => {
    setJapaCount(0);
    sound.playTap();
  };

  const progressPercent = Math.min(100, (japaCount / targetJapa) * 100);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 sm:p-7 shadow-2xl">
        {/* Mantra Switcher */}
        <div className="flex flex-wrap gap-2 mb-6">
          {mantrasData.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setSelectedMantra(m);
                setJapaCount(0);
              }}
              className={`px-4 py-2 rounded-2xl text-xs font-bold border transition ${
                selectedMantra.id === m.id
                  ? 'bg-amber-500 text-black border-amber-400 shadow-md font-extrabold'
                  : 'bg-slate-950 text-slate-300 border-slate-800'
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>

        {/* Sacred Sanskrit & Transliteration Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-amber-950/20 border border-amber-600/30 text-center mb-6">
          <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 font-bold">
            Sacred Chanting Text
          </span>
          <p className="text-lg sm:text-2xl font-bold text-amber-200 my-3 leading-relaxed font-sans">
            {selectedMantra.sanskrit}
          </p>
          <p className="text-xs sm:text-sm text-slate-300 italic font-mono max-w-xl mx-auto">
            &quot;{selectedMantra.transliteration}&quot;
          </p>

          <button
            onClick={() => setShowMeaning(!showMeaning)}
            className="mt-3 text-xs text-amber-400 hover:text-amber-300 flex items-center justify-center gap-1.5 mx-auto font-medium"
          >
            <BookOpen className="w-3.5 h-3.5" />
            {showMeaning ? 'Hide English Meaning' : 'View English Meaning & Cognitive Benefits'}
          </button>

          {showMeaning && (
            <div className="mt-4 pt-4 border-t border-amber-800/40 text-left text-xs text-slate-300 space-y-2">
              <p><strong>Philosophical Meaning:</strong> {selectedMantra.meaning}</p>
              <div>
                <strong>Transformation Benefits:</strong>
                <ul className="list-disc pl-4 mt-1 space-y-1 text-slate-400">
                  {selectedMantra.benefits.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Digital Mala Bead Progress Counter */}
        <div className="flex flex-col items-center my-6">
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center">
            {/* SVG Progress Ring */}
            <svg className="w-full h-full rotate-[-90deg]">
              <circle
                cx="50%"
                cy="50%"
                r="42%"
                fill="none"
                stroke="#334155"
                strokeWidth="10"
                strokeOpacity="0.4"
              />
              <circle
                cx="50%"
                cy="50%"
                r="42%"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="10"
                strokeDasharray="264"
                strokeDashoffset={264 - (progressPercent / 100) * 264}
                strokeLinecap="round"
                className="transition-all duration-300"
              />
            </svg>

            {/* Tap Button Inside Ring */}
            <button
              onClick={handleIncrement}
              className="absolute inset-5 rounded-full bg-gradient-to-tr from-amber-600/30 via-slate-900 to-amber-950/40 hover:bg-slate-800 active:scale-95 border border-amber-500/30 flex flex-col items-center justify-center cursor-pointer transition shadow-inner group"
            >
              <Sun className="w-6 h-6 text-amber-400 group-hover:rotate-45 transition-transform" />
              <span className="text-4xl sm:text-5xl font-black text-white font-mono mt-1">
                {japaCount}
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 font-bold mt-1">
                TAP SACRED BEAD
              </span>
            </button>
          </div>

          <p className="text-xs text-slate-400 mt-4 font-mono">
            Target: 108 Repetitions • {108 - Math.min(108, japaCount)} Remaining
          </p>

          <button
            onClick={handleReset}
            className="mt-3 flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Counter
          </button>
        </div>
      </div>
    </div>
  );
};
