export type Gender = 'Male' | 'Female' | 'Other';
export type DietType = 'Strict Vegetarian';

export interface UserProfile {
  name: string;
  tagline: string;
  gender: Gender;
  heightCm: number;
  startingWeightKg: number;
  currentWeightKg: number;
  targetWeightKg: number;
  waistCm: number;
  targetWaistCm: number;
  diet: DietType;
  officeHours: {
    start: string; // '10:30'
    end: string;   // '21:00'
  };
  preferredGymHours: {
    start: string; // '06:00'
    end: string;   // '07:00'
  };
  wakeUpTarget: string; // '05:45'
  sleepTarget: string;  // '21:45'
  proteinTargetGrams: number; // 130
  waterTargetLiters: number;  // 3.5
  dailyCalorieTarget: number; // 2100
  journeyDurationMonths: 6 | 12;
  startDate: string; // ISO date
}

export type MuscleGroup = 
  | 'Chest'
  | 'Back'
  | 'Shoulders'
  | 'Biceps'
  | 'Triceps'
  | 'Quads'
  | 'Hamstrings'
  | 'Glutes'
  | 'Calves'
  | 'Core'
  | 'Full Body'
  | 'Cardio';

export interface Exercise {
  id: string;
  name: string;
  targetMuscles: MuscleGroup[];
  secondaryMuscles: MuscleGroup[];
  defaultSets: number;
  defaultReps: number;
  defaultRestSec: number;
  recommendedStartingWeightKg: number;
  instructions: string[];
  postureTips: string[];
  safetyInstructions: string[];
  commonMistakes: string[];
  alternativeExercises: string[];
  category: 'Compound' | 'Isolation' | 'Cardio';
  equipment: 'Dumbbell' | 'Barbell' | 'Cable' | 'Machine' | 'Bodyweight' | 'Treadmill' | 'Elliptical';
  animationType: 'press' | 'pull' | 'squat' | 'hinge' | 'curl' | 'extension' | 'plank' | 'cardio';
}

export interface WorkoutSetRecord {
  setNumber: number;
  targetReps: number;
  actualReps: number;
  weightKg: number;
  completed: boolean;
  rpe?: number; // Rate of Perceived Exertion (1-10)
}

export interface ExerciseSessionRecord {
  exerciseId: string;
  exerciseName: string;
  sets: WorkoutSetRecord[];
  skipped?: boolean;
  notes?: string;
  painReported?: boolean;
  painDetails?: string;
}

export interface WorkoutSession {
  id: string;
  date: string;
  title: string;
  dayOfWeek: number; // 0-6
  exercises: ExerciseSessionRecord[];
  durationMinutes: number;
  totalVolumeKg: number;
  totalSetsCompleted: number;
  totalRepsCompleted: number;
  completedAt?: string;
  feedback?: string;
  coachAdvice?: string;
}

export interface DayWorkoutPlan {
  dayName: string;
  splitTitle: string;
  focusMuscles: MuscleGroup[];
  exerciseIds: string[];
  isRestDay: boolean;
}

export interface GPSPoint {
  latitude: number;
  longitude: number;
  timestamp: number;
  altitude?: number;
  speed?: number; // m/s
}

export interface CardioSession {
  id: string;
  type: 'Running' | 'Cycling' | 'Walking' | 'Hiking' | 'Treadmill' | 'Elliptical' | 'Jump Rope';
  date: string;
  startTime: string;
  durationSeconds: number;
  distanceKm: number;
  avgPaceMinPerKm: number;
  avgSpeedKmh: number;
  maxSpeedKmh?: number;
  estimatedCalories: number;
  elevationGainMeters?: number;
  gpsRoute?: GPSPoint[];
  notes?: string;
  isSimulated?: boolean;
}

export interface SwimmingSession {
  id: string;
  date: string;
  poolType: 'Pool 25m' | 'Pool 50m' | 'Open Water';
  poolLengthMeters: number;
  lapsCompleted: number;
  totalDistanceMeters: number;
  durationMinutes: number;
  stroke: 'Freestyle' | 'Breaststroke' | 'Backstroke' | 'Butterfly' | 'Mixed';
  avgPacePer100m: string; // e.g., '1:45'
  estimatedCalories: number;
  notes?: string;
}

export interface BreathingConfig {
  name: string;
  inhaleSec: number;
  holdSec: number;
  exhaleSec: number;
  holdEmptySec: number;
  cycles: number;
  purpose: string;
}

export interface MeditationSession {
  id: string;
  date: string;
  type: 'Breathing' | 'Mindfulness' | 'Stress Relief' | 'Morning' | 'Evening' | 'Gayatri Mantra' | 'Mahamrityunjaya Mantra';
  durationMinutes: number;
  japaCount?: number; // up to 108
  targetJapa?: number;
  moodBefore?: 'Stressed' | 'Tired' | 'Neutral' | 'Focused' | 'Calm';
  moodAfter?: 'Relaxed' | 'Peaceful' | 'Energized' | 'Clarity' | 'Calm';
  notes?: string;
}

export interface FoodItem {
  id: string;
  name: string;
  hindiName?: string;
  category: 'Protein' | 'Dal & Lentils' | 'Dairy' | 'Grains' | 'Nuts & Seeds' | 'Snacks';
  servingUnit: string; // e.g. "100g", "1 cup (150g)", "1 scoop (33g)"
  servingGrams: number;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  fiberG: number;
  isStrictVegetarian: true; // Safety invariant
  description?: string;
}

export interface MealLogItem {
  id: string;
  foodId: string;
  foodName: string;
  servings: number;
  totalCalories: number;
  totalProteinG: number;
  totalCarbsG: number;
  totalFatG: number;
  totalFiberG: number;
}

export interface DailyNutritionLog {
  date: string;
  meals: {
    breakfast: MealLogItem[];
    lunch: MealLogItem[];
    preWorkout: MealLogItem[];
    dinner: MealLogItem[];
    snacks: MealLogItem[];
  };
  waterLiters: number;
  totalCalories: number;
  totalProteinG: number;
  totalCarbsG: number;
  totalFatG: number;
  totalFiberG: number;
}

export interface SkincareRoutine {
  date: string;
  morning: {
    cleanser: boolean;
    vitaminCOrActive: boolean;
    moisturizer: boolean;
    sunscreenSpf50: boolean;
    sunscreenReapplied: boolean;
  };
  evening: {
    cleanser: boolean;
    treatmentSerum: boolean;
    moisturizer: boolean;
  };
  observations?: string;
  irritationReported?: boolean;
}

export type SorenessLevel = 'None' | 'Mild' | 'Moderate' | 'Severe';

export interface BodySorenessMap {
  chest: SorenessLevel;
  upperBack: SorenessLevel;
  lowerBack: SorenessLevel;
  shoulders: SorenessLevel;
  biceps: SorenessLevel;
  triceps: SorenessLevel;
  quads: SorenessLevel;
  hamstrings: SorenessLevel;
  glutes: SorenessLevel;
  calves: SorenessLevel;
  core: SorenessLevel;
  neck: SorenessLevel;
}

export interface RecoveryLog {
  date: string;
  sleepHours: number;
  sleepQuality: 1 | 2 | 3 | 4 | 5; // 1 poor, 5 excellent
  bedTime: string; // '22:00'
  wakeTime: string; // '05:45'
  energyRating: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  soreness: BodySorenessMap;
  fatigueScore: number; // 0-100 calculated
  overallRecoveryScore: number; // 0-100
  notes?: string;
}

export interface DailyHabitItem {
  id: string;
  title: string;
  category: 'Discipline' | 'Learning' | 'Mindset' | 'Health';
  completed: boolean;
  targetMetric?: string;
  value?: string | number;
}

export interface LeadershipChallenge {
  id: string;
  track: 
    | 'Negotiation' 
    | 'Communication' 
    | 'Public Speaking' 
    | 'Decision-Making' 
    | 'Emotional Intelligence' 
    | 'Delegation' 
    | 'Confidence' 
    | 'Honesty' 
    | 'Leadership' 
    | 'English Fluency';
  title: string;
  description: string;
  actionableStep: string;
  reflectionPrompt: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface SportsActivity {
  id: string;
  sport: 'Badminton' | 'Cricket' | 'Football' | 'Basketball' | 'Tennis' | 'Table Tennis' | 'Squash' | 'Volleyball' | 'Chess' | 'Custom';
  date: string;
  durationMinutes: number;
  difficultyLevel: 'EASY' | 'MEDIUM' | 'HARD';
  challengesCompleted: string[];
  scoreOrResult?: string;
  caloriesBurned?: number;
  skillsPracticed: string[];
  notes?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: string;
  category: 'Gym' | 'Cardio' | 'Meditation' | 'Nutrition' | 'Habits' | 'Milestone';
  unlocked: boolean;
  unlockedAt?: string;
  progressPercent: number;
}

export interface MonthlyTransformationReport {
  monthYear: string; // e.g., 'November 2026'
  generatedAt: string;
  transformationScore: number;
  startingWeightKg: number;
  currentWeightKg: number;
  waistCm: number;
  gymStats: {
    totalWorkouts: number;
    totalSets: number;
    totalReps: number;
    totalVolumeKg: number;
    consistencyPercent: number;
    topProgressedLift: string;
  };
  runningStats: {
    totalKm: number;
    totalRuns: number;
    avgPaceMinKm: number;
    longestKm: number;
    fastestKmMin: number;
  };
  swimmingStats: {
    totalSessions: number;
    totalMeters: number;
    avgPace100m: string;
  };
  cyclingStats: {
    totalSessions: number;
    totalKm: number;
    avgSpeedKmh: number;
  };
  meditationStats: {
    totalMinutes: number;
    totalSessions: number;
    totalMantraReps: number;
    consistencyPercent: number;
  };
  nutritionStats: {
    avgDailyProteinG: number;
    proteinCompliancePercent: number;
    avgDailyWaterLiters: number;
  };
  recoveryStats: {
    avgSleepHours: number;
    avgEnergyRating: number;
    restDaysTaken: number;
  };
  habitsStats: {
    habitsCompleted: number;
    readingDays: number;
    englishSpeakingDays: number;
    journalDays: number;
    screenTimeUnderTargetPercent: number;
  };
  achievementsUnlocked: string[];
  coachSummary: string;
  nextMonthTargets: string[];
}
