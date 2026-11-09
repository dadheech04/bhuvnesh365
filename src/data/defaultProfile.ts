import { UserProfile, DayWorkoutPlan } from '../types';

export const defaultUserProfile: UserProfile = {
  name: 'Bhuvnesh Dadheech',
  tagline: 'BUILD YOUR BODY. MASTER YOUR MIND. UPGRADE YOUR LIFE.',
  gender: 'Male',
  heightCm: 180,
  startingWeightKg: 76,
  currentWeightKg: 76,
  targetWeightKg: 72,
  waistCm: 88,
  targetWaistCm: 80,
  diet: 'Strict Vegetarian',
  officeHours: {
    start: '10:30',
    end: '21:00',
  },
  preferredGymHours: {
    start: '06:00',
    end: '07:00',
  },
  wakeUpTarget: '05:45',
  sleepTarget: '21:45',
  proteinTargetGrams: 130, // Recommended starting range: 120-140g
  waterTargetLiters: 3.5,
  dailyCalorieTarget: 2150,
  journeyDurationMonths: 12,
  startDate: new Date().toISOString().split('T')[0],
};

export const weeklyWorkoutSplit: DayWorkoutPlan[] = [
  {
    dayName: 'Monday',
    splitTitle: 'Chest & Triceps Hypertrophy',
    focusMuscles: ['Chest', 'Triceps', 'Shoulders'],
    exerciseIds: ['db-chest-press', 'incline-db-press', 'tricep-extension', 'plank'],
    isRestDay: false,
  },
  {
    dayName: 'Tuesday',
    splitTitle: 'Back & Biceps Thickness',
    focusMuscles: ['Back', 'Biceps'],
    exerciseIds: ['lat-pulldown', 'seated-cable-row', 'bicep-curl', 'incline-treadmill'],
    isRestDay: false,
  },
  {
    dayName: 'Wednesday',
    splitTitle: 'Leg Foundation & Core Strength',
    focusMuscles: ['Quads', 'Hamstrings', 'Glutes', 'Calves', 'Core'],
    exerciseIds: ['squat', 'leg-press', 'romanian-deadlift', 'plank'],
    isRestDay: false,
  },
  {
    dayName: 'Thursday',
    splitTitle: 'Active Recovery & Outdoor Cardio',
    focusMuscles: ['Cardio', 'Full Body'],
    exerciseIds: ['elliptical', 'incline-treadmill'],
    isRestDay: false,
  },
  {
    dayName: 'Friday',
    splitTitle: 'Shoulder Cannon & Upper Power',
    focusMuscles: ['Shoulders', 'Chest', 'Triceps', 'Biceps'],
    exerciseIds: ['shoulder-press', 'incline-db-press', 'bicep-curl', 'tricep-extension'],
    isRestDay: false,
  },
  {
    dayName: 'Saturday',
    splitTitle: 'Athletic Conditioning & Sports Arena',
    focusMuscles: ['Full Body', 'Cardio'],
    exerciseIds: ['squat', 'romanian-deadlift', 'seated-cable-row', 'plank'],
    isRestDay: false,
  },
  {
    dayName: 'Sunday',
    splitTitle: 'Mind Master & Total Body Regeneration',
    focusMuscles: ['Full Body'],
    exerciseIds: [],
    isRestDay: true,
  },
];
