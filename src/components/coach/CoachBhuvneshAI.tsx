import React, { useState } from 'react';
import { storage, getTodayKey } from '../../utils/storage';
import { sound } from '../../utils/audio';
import {
  BrainCircuit,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  TrendingUp,
  Activity,
  Heart,
  Send,
  MessageSquare
} from 'lucide-react';

export const CoachBhuvneshAI: React.FC = () => {
  const profile = storage.getProfile();
  const workouts = storage.getWorkouts();
  const cardio = storage.getCardioSessions();
  const nutrition = storage.getNutritionLog(getTodayKey());
  const recovery = storage.getRecovery(getTodayKey());
  const meditation = storage.getMeditationSessions();

  // Dynamic Heuristic Insights Engine
  const generateInsights = () => {
    const list: { type: 'success' | 'warning' | 'info'; title: string; advice: string }[] = [];

    // 1. Recovery & Soreness Analysis
    if (recovery.soreness.lowerBack === 'Severe' || recovery.soreness.lowerBack === 'Moderate') {
      list.push({
        type: 'warning',
        title: 'Lumbar Spine Safeguard Active',
        advice:
          'Lower back soreness flagged. Replace heavy axial loaded squats/Romanian deadlifts with chest-supported dumbbell rows and leg curls today. Never sacrifice joint longevity for acute volume.',
      });
    }

    // 2. Sleep & Office Hours Analysis
    if (recovery.sleepHours < 6.5) {
      list.push({
        type: 'warning',
        title: 'Sleep Deficit Recovery Protocol',
        advice:
          'Recorded under 6.5 hours of sleep. Given your demanding 10:30 AM – 9:00 PM office hours, cap today’s training session at 40 minutes and take a 10-minute box-breathing break at 3:00 PM.',
      });
    } else {
      list.push({
        type: 'success',
        title: 'Deep Restorative Sleep Architecture',
        advice:
          `Logged ${recovery.sleepHours} hours of sleep. Growth hormone and myofibrillar protein synthesis are primed. Ideal day to hit your working sets on compound lifts.`,
      });
    }

    // 3. Strict Vegetarian Protein Adherence
    const proteinDelta = profile.proteinTargetGrams - (nutrition.totalProteinG || 0);
    if (proteinDelta > 40) {
      list.push({
        type: 'info',
        title: 'Vegetarian Protein Deficit Alert',
        advice:
          `You are currently ${Math.round(proteinDelta)}g short of your 130g protein goal. Add 50g boiled soya chunks (26g protein) or 100g low-fat paneer (24g protein) with dinner to prevent muscle catabolism.`,
      });
    } else {
      list.push({
        type: 'success',
        title: 'Optimal Nitrogen Balance',
        advice:
          'Protein compliance is stellar. Amino acid pools are well supplied for abdominal fat reduction and lean muscle preservation.',
      });
    }

    // 4. Cardio & Running Milestone
    const runs = cardio.filter((c) => c.type === 'Running');
    if (runs.length >= 3) {
      list.push({
        type: 'info',
        title: 'Next Running Milestone: Sub-28min 5K',
        advice:
          'Aerobic base has adapted cleanly. On your next Thursday outdoor session, hold a steady 5:35 min/km pace for the first 3km, then accelerate over the final 2km.',
      });
    }

    return list;
  };

  const insights = generateInsights();

  // Interactive Coach Q&A
  const [messages, setMessages] = useState<{ role: 'coach' | 'user'; text: string }[]>([
    {
      role: 'coach',
      text: `Namaste Bhuvnesh. I have synchronized your biometric records, strict vegetarian nutrition logs, and recovery metrics. What aspect of your 365 transformation shall we optimize today?`,
    },
  ]);
  const [queryInput, setQueryInput] = useState('');

  const handleSendQuery = () => {
    if (!queryInput.trim()) return;
    sound.playTap();
    const userText = queryInput;
    setQueryInput('');

    const newMsgs = [...messages, { role: 'user' as const, text: userText }];
    setMessages(newMsgs);

    setTimeout(() => {
      sound.playTimerDone();
      let reply = '';
      const lower = userText.toLowerCase();

      if (lower.includes('protein') || lower.includes('diet') || lower.includes('veg')) {
        reply = `For strict vegetarian hypertrophy without eggs or meat, your top staples are Soya Chunks (52g protein/100g), Low-Fat Paneer (24g/100g), and Pea/Rice Isolate (26g/scoop). Spreading 130g across 4 meals of ~32g ensures continuous muscle protein synthesis.`;
      } else if (lower.includes('pain') || lower.includes('hurt') || lower.includes('back') || lower.includes('knee')) {
        reply = `Coach Safety Notice: Immediately suspend the movement causing discomfort. Do not push through sharp joint or tendon pain. If discomfort persists past 48 hours, seek a licensed physiotherapist.`;
      } else if (lower.includes('tired') || lower.includes('fatigue') || lower.includes('office')) {
        reply = `With your 10:30 AM – 9:00 PM schedule, fatigue is natural if sleep slips. Today, do not force heavy maximums. Switch to a 30-minute high-incline treadmill walk and 108 Gayatri Mantra japa to reset your nervous system.`;
      } else {
        reply = `Consistency beats sporadic intensity every single time. Stick to your 5:45 AM wake-up target, hit 130g vegetarian protein, and protect your 9:45 PM sleep boundary tonight.`;
      }

      setMessages([...newMsgs, { role: 'coach', text: reply }]);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 sm:p-7 shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-black font-black">
            <BrainCircuit className="w-7 h-7" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5" /> Autonomous Transformation Coach
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Coach Bhuvnesh AI</h2>
          </div>
        </div>

        {/* Proactive Prescriptive Insights */}
        <h3 className="text-xs uppercase font-mono tracking-wider text-slate-400 font-bold mb-3">
          Today&apos;s Biometric & Strategic Action Insights:
        </h3>
        <div className="space-y-3 mb-6">
          {insights.map((item, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border ${
                item.type === 'warning'
                  ? 'bg-amber-950/20 border-amber-600/40 text-amber-200'
                  : item.type === 'success'
                  ? 'bg-emerald-950/20 border-emerald-600/40 text-emerald-200'
                  : 'bg-cyan-950/20 border-cyan-600/40 text-cyan-200'
              }`}
            >
              <h4 className="text-xs font-bold uppercase font-mono mb-1">{item.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{item.advice}</p>
            </div>
          ))}
        </div>

        {/* Coach Chat Panel */}
        <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase font-mono text-slate-400 mb-3 border-b border-slate-800 pb-2">
            <MessageSquare className="w-4 h-4 text-emerald-400" /> Direct Coach Dialogue
          </div>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1 mb-4">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-2xl text-xs max-w-[85%] ${
                  m.role === 'user'
                    ? 'ml-auto bg-emerald-500 text-black font-semibold'
                    : 'mr-auto bg-slate-900 border border-slate-800 text-slate-200'
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendQuery()}
              placeholder="Ask coach about form, vegetarian meals, soreness, or late office adjustments..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <button
              onClick={handleSendQuery}
              className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
