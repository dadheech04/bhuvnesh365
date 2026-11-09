import React, { useState } from 'react';
import { Navigation, NavTab } from './components/common/Navigation';
import { MainDashboard } from './components/dashboard/MainDashboard';
import { GymTrainerMode } from './components/gym/GymTrainerMode';
import { CardioHub } from './components/cardio/CardioHub';
import { MeditationHub } from './components/meditation/MeditationHub';
import { NutritionTracker } from './components/nutrition/NutritionTracker';
import { RecoveryWellness } from './components/recovery/RecoveryWellness';
import { HabitsDiscipline } from './components/habits/HabitsDiscipline';
import { SportsArena } from './components/sports/SportsArena';
import { LeadershipDev } from './components/leadership/LeadershipDev';
import { CoachBhuvneshAI } from './components/coach/CoachBhuvneshAI';
import { SkincareTracker } from './components/skincare/SkincareTracker';
import { SmartAlarm } from './components/alarm/SmartAlarm';
import { MonthlyReportView } from './components/reports/MonthlyReportView';
import { ProfileSettings } from './components/profile/ProfileSettings';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');

  const handleStartToday = () => {
    setCurrentTab('gym');
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
      {/* Top Header & Mobile Drawer Navigation */}
      <Navigation
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onStartToday={handleStartToday}
      />

      {/* Main Content Area */}
      <div className="flex-1 md:pl-64 flex flex-col pb-20 md:pb-8">
        <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 lg:p-8">
          {currentTab === 'dashboard' && (
            <MainDashboard
              onSelectTab={setCurrentTab}
              onStartToday={handleStartToday}
            />
          )}
          {currentTab === 'gym' && <GymTrainerMode />}
          {currentTab === 'cardio' && <CardioHub />}
          {currentTab === 'meditation' && <MeditationHub />}
          {currentTab === 'nutrition' && <NutritionTracker />}
          {currentTab === 'recovery' && <RecoveryWellness />}
          {currentTab === 'habits' && <HabitsDiscipline />}
          {currentTab === 'sports' && <SportsArena />}
          {currentTab === 'leadership' && <LeadershipDev />}
          {currentTab === 'coach' && <CoachBhuvneshAI />}
          {currentTab === 'skincare' && <SkincareTracker />}
          {currentTab === 'alarm' && <SmartAlarm />}
          {currentTab === 'report' && <MonthlyReportView />}
          {currentTab === 'profile' && <ProfileSettings />}
        </main>

        {/* Global OS Footer */}
        <footer className="mt-auto px-6 py-4 text-center text-xs text-slate-500 border-t border-slate-800/60 hidden md:block">
          <p className="font-semibold text-slate-400">
            BHUVNESH 365 – PERSONAL TRANSFORMATION OPERATING SYSTEM
          </p>
          <p className="text-[10px] text-slate-600 mt-0.5">
            Dedicated solely to Bhuvnesh Dadheech • Strict Vegetarian • 100% Client-Side Privacy & Offline Persistence
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
