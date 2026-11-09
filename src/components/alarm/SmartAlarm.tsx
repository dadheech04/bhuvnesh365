import React, { useState, useEffect } from 'react';
import { sound } from '../../utils/audio';
import { Bell, Volume2, ShieldCheck, CheckCircle2, Clock, Camera, AlertCircle } from 'lucide-react';

export const SmartAlarm: React.FC = () => {
  const [alarmActive, setAlarmActive] = useState(false);
  const [alarmRinging, setAlarmRinging] = useState(false);
  const [alarmTime, setAlarmTime] = useState('05:45');
  const [wakeAcknowledged, setWakeAcknowledged] = useState(false);
  const [useCameraVerification, setUseCameraVerification] = useState(false);

  // Reminders config
  const reminders = [
    { time: '05:45 AM', label: 'Wake-Up & Hydrate 500ml', type: 'Wake' },
    { time: '06:00 AM', label: 'Gym Mode Priority Window', type: 'Gym' },
    { time: '07:15 AM', label: 'Post-Workout Soya / Oats & AM SPF 50+', type: 'Nutrition' },
    { time: '10:30 AM', label: 'Office Hours Start - Deep Focus Mode', type: 'Work' },
    { time: '01:30 PM', label: 'Office High-Protein Vegetarian Lunch', type: 'Nutrition' },
    { time: '05:00 PM', label: 'Sprouts & Pumpkin Seeds Snack (Anti-Crash)', type: 'Nutrition' },
    { time: '08:30 PM', label: 'Light Paneer / Tofu Dinner', type: 'Nutrition' },
    { time: '09:15 PM', label: '20 Pages Reading & Reflection Vlog', type: 'Mind' },
    { time: '09:45 PM', label: 'Screens Off & 4-7-8 Sleep Decompression', type: 'Sleep' },
  ];

  const handleTestAlarm = () => {
    sound.playAlarmSiren();
    setAlarmRinging(true);
  };

  const handleDismissAlarm = () => {
    sound.playSetComplete();
    setAlarmRinging(false);
    setWakeAcknowledged(true);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 sm:p-7 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-mono font-bold mb-2">
              <Bell className="w-3.5 h-3.5" /> 5:45 AM Precision Awakening
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Smart Alarm & Schedule Accountability</h2>
            <p className="text-xs text-slate-400 mt-1">
              Synchronized wake-up and daily milestone acoustic alerts tailored to Bhuvnesh Dadheech&apos;s adaptive calendar.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleTestAlarm}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-amber-400 border border-amber-500/30 flex items-center gap-1.5 transition"
            >
              <Volume2 className="w-4 h-4" /> Test Acoustic Alarm Tone
            </button>
          </div>
        </div>

        {/* Alarm Card */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-center my-6">
          <span className="text-xs uppercase font-mono tracking-widest text-slate-400">Target Wake-Up Time</span>
          <div className="text-5xl sm:text-6xl font-black text-white font-mono my-2">{alarmTime} AM</div>

          {alarmRinging ? (
            <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500 animate-pulse my-4">
              <p className="text-sm font-black text-amber-300 uppercase">
                ⏰ 5:45 AM ALARM ACTIVE: WAKE UP & BUILD YOUR BODY!
              </p>
              <button
                onClick={handleDismissAlarm}
                className="mt-3 px-8 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-sm uppercase tracking-wider shadow-lg"
              >
                I AM AWAKE & STANDING UP
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-3 mt-4">
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Armed & Ready
              </span>
            </div>
          )}
        </div>

        {/* Daily Precision Milestone Schedule */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400" /> Daily Transformation Schedule Cadence
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {reminders.map((rem, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between"
              >
                <div>
                  <span className="text-xs font-mono font-black text-emerald-400">{rem.time}</span>
                  <p className="text-xs font-bold text-white mt-0.5">{rem.label}</p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                  {rem.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
