import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { storage } from '../../utils/storage';
import { sound } from '../../utils/audio';
import {
  User,
  Save,
  Download,
  Upload,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles
} from 'lucide-react';

export const ProfileSettings: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>(() => storage.getProfile());
  const [saveStatus, setSaveStatus] = useState<string>('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playSetComplete();
    storage.saveProfile(profile);
    setSaveStatus('Profile updated successfully!');
    setTimeout(() => setSaveStatus(''), 2500);
  };

  const handleExportBackup = () => {
    sound.playTap();
    const backupJson = storage.exportFullDataBackup();
    const blob = new Blob([backupJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BHUVNESH_365_Backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = storage.importFullDataBackup(content);
      if (success) {
        sound.playSetComplete();
        setProfile(storage.getProfile());
        setSaveStatus('Backup restored successfully!');
        setTimeout(() => setSaveStatus(''), 2500);
      } else {
        alert('Invalid backup JSON format.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 sm:p-7 shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-black font-black text-xl">
            BD
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">{profile.name}</h2>
            <p className="text-xs text-slate-400 font-mono">
              Strict Vegetarian • 180cm • Starting 76kg • 12-Month OS Journey
            </p>
          </div>
        </div>

        {saveStatus && (
          <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs font-bold mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> {saveStatus}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Biometrics */}
          <div>
            <h3 className="text-xs font-mono uppercase text-emerald-400 font-bold mb-3">
              Biometrics & Body Composition
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={profile.heightCm}
                  onChange={(e) => setProfile({ ...profile, heightCm: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                  Starting Weight (kg)
                </label>
                <input
                  type="number"
                  value={profile.startingWeightKg}
                  onChange={(e) => setProfile({ ...profile, startingWeightKg: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                  Current Weight (kg)
                </label>
                <input
                  type="number"
                  value={profile.currentWeightKg}
                  onChange={(e) => setProfile({ ...profile, currentWeightKg: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                  Waist Measurement (cm)
                </label>
                <input
                  type="number"
                  value={profile.waistCm}
                  onChange={(e) => setProfile({ ...profile, waistCm: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                  Target Waist (cm)
                </label>
                <input
                  type="number"
                  value={profile.targetWaistCm}
                  onChange={(e) => setProfile({ ...profile, targetWaistCm: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                  Daily Protein Target (grams)
                </label>
                <input
                  type="number"
                  value={profile.proteinTargetGrams}
                  onChange={(e) => setProfile({ ...profile, proteinTargetGrams: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white"
                />
              </div>
            </div>
          </div>

          {/* Schedule Engine */}
          <div>
            <h3 className="text-xs font-mono uppercase text-emerald-400 font-bold mb-3 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> Adaptive Schedule Preferences
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                  Wake-Up Target
                </label>
                <input
                  type="text"
                  value={profile.wakeUpTarget}
                  onChange={(e) => setProfile({ ...profile, wakeUpTarget: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                  Preferred Gym Window
                </label>
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    value={profile.preferredGymHours.start}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        preferredGymHours: { ...profile.preferredGymHours, start: e.target.value },
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white font-mono"
                  />
                  <span className="text-slate-500 font-mono">-</span>
                  <input
                    type="text"
                    value={profile.preferredGymHours.end}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        preferredGymHours: { ...profile.preferredGymHours, end: e.target.value },
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                  Daily Office Hours
                </label>
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    value={profile.officeHours.start}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        officeHours: { ...profile.officeHours, start: e.target.value },
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white font-mono"
                  />
                  <span className="text-slate-500 font-mono">-</span>
                  <input
                    type="text"
                    value={profile.officeHours.end}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        officeHours: { ...profile.officeHours, end: e.target.value },
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                  Sleep Target
                </label>
                <input
                  type="text"
                  value={profile.sleepTarget}
                  onChange={(e) => setProfile({ ...profile, sleepTarget: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white font-mono"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 transition"
            >
              <Save className="w-4 h-4" /> Save Profile Preferences
            </button>
          </div>
        </form>

        {/* Data Persistence, JSON Export & Backup */}
        <div className="mt-8 pt-6 border-t border-slate-800">
          <h3 className="text-xs font-mono uppercase text-white font-bold mb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Complete Offline Data Sovereignty & Backups
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            All your workouts, GPS traces, running logs, meditation sessions, and habits are stored safely in local
            persistent browser storage. Export or restore full JSON backups anytime.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleExportBackup}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2 border border-slate-700"
            >
              <Download className="w-4 h-4" /> Export Full JSON Backup
            </button>

            <label className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2 border border-slate-700 cursor-pointer">
              <Upload className="w-4 h-4" /> Restore JSON Backup
              <input
                type="file"
                accept=".json"
                onChange={handleImportBackup}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
