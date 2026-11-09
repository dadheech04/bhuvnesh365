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

// ─── Neon API sync helpers ────────────────────────────────────────────────────

const BASE = '/api/index';

async function apiGet<T>(resource: string, date?: string): Promise<T | null> {
  try {
    const url = date ? `${BASE}?resource=${resource}&date=${date}` : `${BASE}?resource=${resource}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.json() as T;
  } catch {
    return null;
  }
}

async function apiPost(resource: string, body: unknown, date?: string): Promise<boolean> {
  try {
    const url = date ? `${BASE}?resource=${resource}&date=${date}` : `${BASE}?resource=${resource}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return res.ok;
  } catch {
    return false;
  }
}

// ─── Storage object ───────────────────────────────────────────────────────────

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
  async getProfileAsync(): Promise<UserProfile> {
    const remote = await apiGet<UserProfile>('profile');
    if (remote) {
      localStorage.setItem(KEYS.PROFILE, JSON.stringify(remote));
      return remote;
    }
    return this.getProfile();
  },
  saveProfile(profile: UserProfile): void {
    localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
    apiPost('profile', profile); // fire-and-forget sync to Neon
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
  async getWorkoutsAsync(): Promise<WorkoutSession[]> {
    const remote = await apiGet<WorkoutSession[]>('workouts');
    if (remote && Array.isArray(remote)) {
      localStorage.setItem(KEYS.WORKOUTS, JSON.stringify(remote));
      return remote;
    }
    return this.getWorkouts();
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
    apiPost('workouts', session); // sync to Neon
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
  async getCardioSessionsAsync(): Promise<CardioSession[]> {
    const remote = await apiGet<CardioSession[]>('cardio');
    if (remote && Array.isArray(remote)) {
      localStorage.setItem(KEYS.CARDIO, JSON.stringify(remote));
      return remote;
    }
    return this.getCardioSessions();
  },
  saveCardioSession(session: CardioSession): void {
    const list = this.getCardioSessions();
    list.unshift(session);
    localStorage.setItem(KEYS.CARDIO, JSON.stringify(list));
    apiPost('cardio', session);
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
  async getSwimmingSessionsAsync(): Promise<SwimmingSession[]> {
    const remote = await apiGet<SwimmingSession[]>('swimming');
    if (remote && Array.isArray(remote)) {
      localStorage.setItem(KEYS.SWIMMING, JSON.stringify(remote));
      return remote;
    }
    return this.getSwimmingSessions();
  },
  saveSwimmingSession(session: SwimmingSession): void {
    const list = this.getSwimmingSessions();
    list.unshift(session);
    localStorage.setItem(KEYS.SWIMMING, JSON.stringify(list));
    apiPost('swimming', session);
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
  async getMeditationSessionsAsync(): Promise<MeditationSession[]> {
    const remote = await apiGet<MeditationSession[]>('meditation');
    if (remote && Array.isArray(remote)) {
      localStorage.setItem(KEYS.MEDITATION, JSON.stringify(remote));
      return remote;
    }
    return this.getMeditationSessions();
  },
  saveMeditationSession(session: MeditationSession): void {
    const list = this.getMeditationSessions();
    list.unshift(session);
    localStorage.setItem(KEYS.MEDITATION, JSON.stringify(list));
    apiPost('meditation', session);
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
  async getNutritionLogAsync(date: string = getTodayKey()): Promise<DailyNutritionLog> {
    const remote = await apiGet<DailyNutritionLog>(`/nutrition/${date}`);
    if (remote) {
      localStorage.setItem(`${KEYS.NUTRITION}_${date}`, JSON.stringify(remote));
      return remote;
    }
    return this.getNutritionLog(date);
  },
  saveNutritionLog(log: DailyNutritionLog): void {
    // Recalculate totals
    let cals = 0, prot = 0, carbs = 0, fat = 0, fiber = 0;
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
    apiPost(`/nutrition/${log.date}`, log);
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
  async getSkincareAsync(date: string = getTodayKey()): Promise<SkincareRoutine> {
    const remote = await apiGet<SkincareRoutine>(`/skincare/${date}`);
    if (remote) {
      localStorage.setItem(`${KEYS.SKINCARE}_${date}`, JSON.stringify(remote));
      return remote;
    }
    return this.getSkincare(date);
  },
  saveSkincare(routine: SkincareRoutine): void {
    localStorage.setItem(`${KEYS.SKINCARE}_${routine.date}`, JSON.stringify(routine));
    apiPost(`/skincare/${routine.date}`, routine);
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
        chest: 'None', upperBack: 'None', lowerBack: 'None',
        shoulders: 'None', biceps: 'None', triceps: 'None',
        quads: 'None', hamstrings: 'None', glutes: 'None',
        calves: 'None', core: 'None', neck: 'None'
      },
      fatigueScore: 20,
      overallRecoveryScore: 85
    };
  },
  async getRecoveryAsync(date: string = getTodayKey()): Promise<RecoveryLog> {
    const remote = await apiGet<RecoveryLog>(`/recovery/${date}`);
    if (remote) {
      localStorage.setItem(`${KEYS.RECOVERY}_${date}`, JSON.stringify(remote));
      return remote;
    }
    return this.getRecovery(date);
  },
  saveRecovery(log: RecoveryLog): void {
    localStorage.setItem(`${KEYS.RECOVERY}_${log.date}`, JSON.stringify(log));
    apiPost(`/recovery/${log.date}`, log);
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
  async getHabitsAsync(date: string = getTodayKey()): Promise<DailyHabitItem[]> {
    const remote = await apiGet<DailyHabitItem[]>(`/habits/${date}`);
    if (remote && Array.isArray(remote)) {
      localStorage.setItem(`${KEYS.HABITS}_${date}`, JSON.stringify(remote));
      return remote;
    }
    return this.getHabits(date);
  },
  saveHabits(date: string, habits: DailyHabitItem[]): void {
    localStorage.setItem(`${KEYS.HABITS}_${date}`, JSON.stringify(habits));
    apiPost(`/habits/${date}`, habits);
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
  async getSportsActivitiesAsync(): Promise<SportsActivity[]> {
    const remote = await apiGet<SportsActivity[]>('sports');
    if (remote && Array.isArray(remote)) {
      localStorage.setItem(KEYS.SPORTS, JSON.stringify(remote));
      return remote;
    }
    return this.getSportsActivities();
  },
  saveSportsActivity(act: SportsActivity): void {
    const list = this.getSportsActivities();
    list.unshift(act);
    localStorage.setItem(KEYS.SPORTS, JSON.stringify(list));
    apiPost('sports', act);
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
  async getAchievementsAsync(): Promise<Achievement[]> {
    const remote = await apiGet<Achievement[]>('achievements');
    if (remote && Array.isArray(remote) && remote.length > 0) {
      localStorage.setItem(KEYS.ACHIEVEMENTS, JSON.stringify(remote));
      return remote;
    }
    return this.getAchievements();
  },
  saveAchievements(list: Achievement[]): void {
    localStorage.setItem(KEYS.ACHIEVEMENTS, JSON.stringify(list));
    apiPost('achievements', list);
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
  },

  // DB Health Check
  async checkDbConnection(): Promise<boolean> {
    try {
      const res = await fetch('/api/index?resource=health');
      const data = await res.json();
      return data.status === 'healthy';
    } catch {
      return false;
    }
  }
};
