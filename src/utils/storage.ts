import {
  UserProfile,
  WorkoutSession,
  CardioSession,
  SwimmingSession,
  MeditationSession,
  DailyNutritionLog,
  SkincareRoutine,
  RecoveryLog,
  DailyHabitItem,
  SportsActivity,
  Achievement
} from '../types';
import { defaultUserProfile } from '../data/defaultProfile';
import { initialAchievements } from '../data/achievementsDb';

const KEYS = {
  PROFILE: 'bhuvnesh365_profile',
  WORKOUTS: 'bhuvnesh365_workouts',
  CARDIO: 'bhuvnesh365_cardio',
  SWIMMING: 'bhuvnesh365_swimming',
  MEDITATION: 'bhuvnesh365_meditation',
  NUTRITION: 'bhuvnesh365_nutrition',
  SKINCARE: 'bhuvnesh365_skincare',
  RECOVERY: 'bhuvnesh365_recovery',
  HABITS: 'bhuvnesh365_habits',
  SPORTS: 'bhuvnesh365_sports',
  ACHIEVEMENTS: 'bhuvnesh365_achievements',
};

export const getTodayKey = (): string => new Date().toISOString().split('T')[0];

export const storage = {
  // User Profile
  getProfile(): UserProfile {
    try {
      const data = localStorage.getItem(KEYS.PROFILE);
      return data ? JSON.parse(data) : defaultUserProfile;
    } catch {
      return defaultUserProfile;
    }
  },
  saveProfile(profile: UserProfile): void {
    localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
  },

  // Workouts
  getWorkouts(): WorkoutSession[] {
    try {
      const data = localStorage.getItem(KEYS.WORKOUTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },
  saveWorkout(session: WorkoutSession): void {
    const list = this.getWorkouts();
    const existingIndex = list.findIndex(w => w.id === session.id);
    if (existingIndex >= 0) {
      list[existingIndex] = session;
    } else {
      list.unshift(session);
    }
    localStorage.setItem(KEYS.WORKOUTS, JSON.stringify(list));
  },

  // Cardio (Running, Cycling, Walking)
  getCardioSessions(): CardioSession[] {
    try {
      const data = localStorage.getItem(KEYS.CARDIO);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },
  saveCardioSession(session: CardioSession): void {
    const list = this.getCardioSessions();
    list.unshift(session);
    localStorage.setItem(KEYS.CARDIO, JSON.stringify(list));
  },

  // Swimming
  getSwimmingSessions(): SwimmingSession[] {
    try {
      const data = localStorage.getItem(KEYS.SWIMMING);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },
  saveSwimmingSession(session: SwimmingSession): void {
    const list = this.getSwimmingSessions();
    list.unshift(session);
    localStorage.setItem(KEYS.SWIMMING, JSON.stringify(list));
  },

  // Meditation
  getMeditationSessions(): MeditationSession[] {
    try {
      const data = localStorage.getItem(KEYS.MEDITATION);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },
  saveMeditationSession(session: MeditationSession): void {
    const list = this.getMeditationSessions();
    list.unshift(session);
    localStorage.setItem(KEYS.MEDITATION, JSON.stringify(list));
  },

  // Nutrition
  getNutritionLog(date: string = getTodayKey()): DailyNutritionLog {
    try {
      const raw = localStorage.getItem(`${KEYS.NUTRITION}_${date}`);
      if (raw) return JSON.parse(raw);
    } catch {
      // fallback
    }
    return {
      date,
      meals: {
        breakfast: [],
        lunch: [],
        preWorkout: [],
        dinner: [],
        snacks: []
      },
      waterLiters: 0,
      totalCalories: 0,
      totalProteinG: 0,
      totalCarbsG: 0,
      totalFatG: 0,
      totalFiberG: 0
    };
  },
  saveNutritionLog(log: DailyNutritionLog): void {
    // Recalculate totals
    let cals = 0;
    let prot = 0;
    let carbs = 0;
    let fat = 0;
    let fiber = 0;

    Object.values(log.meals).forEach(mealArray => {
      mealArray.forEach(item => {
        cals += item.totalCalories;
        prot += item.totalProteinG;
        carbs += item.totalCarbsG;
        fat += item.totalFatG;
        fiber += item.totalFiberG;
      });
    });

    log.totalCalories = Math.round(cals);
    log.totalProteinG = Math.round(prot * 10) / 10;
    log.totalCarbsG = Math.round(carbs * 10) / 10;
    log.totalFatG = Math.round(fat * 10) / 10;
    log.totalFiberG = Math.round(fiber * 10) / 10;

    localStorage.setItem(`${KEYS.NUTRITION}_${log.date}`, JSON.stringify(log));
  },

  // Skincare
  getSkincare(date: string = getTodayKey()): SkincareRoutine {
    try {
      const raw = localStorage.getItem(`${KEYS.SKINCARE}_${date}`);
      if (raw) return JSON.parse(raw);
    } catch {
      // fallback
    }
    return {
      date,
      morning: {
        cleanser: false,
        vitaminCOrActive: false,
        moisturizer: false,
        sunscreenSpf50: false,
        sunscreenReapplied: false
      },
      evening: {
        cleanser: false,
        treatmentSerum: false,
        moisturizer: false
      }
    };
  },
  saveSkincare(routine: SkincareRoutine): void {
    localStorage.setItem(`${KEYS.SKINCARE}_${routine.date}`, JSON.stringify(routine));
  },

  // Recovery & Soreness
  getRecovery(date: string = getTodayKey()): RecoveryLog {
    try {
      const raw = localStorage.getItem(`${KEYS.RECOVERY}_${date}`);
      if (raw) return JSON.parse(raw);
    } catch {
      // fallback
    }
    return {
      date,
      sleepHours: 7.5,
      sleepQuality: 4,
      bedTime: '22:00',
      wakeTime: '05:45',
      energyRating: 8,
      soreness: {
        chest: 'None',
        upperBack: 'None',
        lowerBack: 'None',
        shoulders: 'None',
        biceps: 'None',
        triceps: 'None',
        quads: 'None',
        hamstrings: 'None',
        glutes: 'None',
        calves: 'None',
        core: 'None',
        neck: 'None'
      },
      fatigueScore: 20,
      overallRecoveryScore: 85
    };
  },
  saveRecovery(log: RecoveryLog): void {
    localStorage.setItem(`${KEYS.RECOVERY}_${log.date}`, JSON.stringify(log));
  },

  // Habits
  getHabits(date: string = getTodayKey()): DailyHabitItem[] {
    try {
      const raw = localStorage.getItem(`${KEYS.HABITS}_${date}`);
      if (raw) return JSON.parse(raw);
    } catch {
      // fallback
    }
    return [
      { id: 'h-wake', title: '5:45 AM Wake-Up & Bed Made', category: 'Discipline', completed: false, targetMetric: '05:45' },
      { id: 'h-gym', title: 'Morning Gym (6:00 - 7:00 AM)', category: 'Health', completed: false, targetMetric: '60 min' },
      { id: 'h-protein', title: '130g Strict Vegetarian Protein Target', category: 'Health', completed: false, targetMetric: '130g' },
      { id: 'h-water', title: '3.5L Pure Water Hydration', category: 'Health', completed: false, targetMetric: '3.5L' },
      { id: 'h-sunscreen', title: 'AM Skincare & SPF 50+ Sunscreen', category: 'Health', completed: false },
      { id: 'h-japa', title: '108 Japa Mantra or 15m Meditation', category: 'Mindset', completed: false, targetMetric: '108 reps' },
      { id: 'h-reading', title: '20 Pages Deep Reading', category: 'Learning', completed: false, targetMetric: '20 pages' },
      { id: 'h-english', title: 'English Fluency & 5 New Words Practice', category: 'Learning', completed: false, targetMetric: '15 min' },
      { id: 'h-vlog', title: 'Daily Transformation Reflection / Vlog', category: 'Discipline', completed: false, targetMetric: '1 video' },
      { id: 'h-screen', title: 'Digital Discipline (< 2h Leisure, No Reels)', category: 'Discipline', completed: false, targetMetric: '< 2 hrs' },
      { id: 'h-sleep', title: 'Sleep Wind-Down by 9:45 PM', category: 'Discipline', completed: false, targetMetric: '21:45' }
    ];
  },
  saveHabits(date: string, habits: DailyHabitItem[]): void {
    localStorage.setItem(`${KEYS.HABITS}_${date}`, JSON.stringify(habits));
  },

  // Sports
  getSportsActivities(): SportsActivity[] {
    try {
      const raw = localStorage.getItem(KEYS.SPORTS);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },
  saveSportsActivity(act: SportsActivity): void {
    const list = this.getSportsActivities();
    list.unshift(act);
    localStorage.setItem(KEYS.SPORTS, JSON.stringify(list));
  },

  // Achievements
  getAchievements(): Achievement[] {
    try {
      const raw = localStorage.getItem(KEYS.ACHIEVEMENTS);
      return raw ? JSON.parse(raw) : initialAchievements;
    } catch {
      return initialAchievements;
    }
  },
  saveAchievements(list: Achievement[]): void {
    localStorage.setItem(KEYS.ACHIEVEMENTS, JSON.stringify(list));
  },

  // Full Backup & Restore
  exportFullDataBackup(): string {
    const backup: Record<string, unknown> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('bhuvnesh365_')) {
        try {
          backup[key] = JSON.parse(localStorage.getItem(key) || 'null');
        } catch {
          backup[key] = localStorage.getItem(key);
        }
      }
    }
    return JSON.stringify(backup, null, 2);
  },
  importFullDataBackup(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString);
      Object.keys(data).forEach(key => {
        if (key.startsWith('bhuvnesh365_')) {
          localStorage.setItem(key, typeof data[key] === 'string' ? data[key] : JSON.stringify(data[key]));
        }
      });
      return true;
    } catch {
      return false;
    }
  }
};
