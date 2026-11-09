import { Achievement } from '../types';

export const initialAchievements: Achievement[] = [
  // Gym Achievements
  {
    id: 'first-workout',
    title: 'First Step to Greatness',
    description: 'Completed your first gym workout in BHUVNESH 365 OS.',
    iconName: 'Dumbbell',
    category: 'Gym',
    unlocked: true,
    unlockedAt: new Date().toISOString(),
    progressPercent: 100
  },
  {
    id: 'ten-gym-sessions',
    title: 'Iron Foundation',
    description: 'Crushed 10 complete gym workout sessions with progressive overload.',
    iconName: 'Trophy',
    category: 'Gym',
    unlocked: false,
    progressPercent: 30
  },
  {
    id: 'fifty-workouts',
    title: 'Centurion of Strength',
    description: 'Completed 50 disciplined workouts. Real muscular density forged.',
    iconName: 'Award',
    category: 'Gym',
    unlocked: false,
    progressPercent: 6
  },
  {
    id: 'chest-master',
    title: 'Pectoral Dominance',
    description: 'Increased Dumbbell Chest Press working weight by 5kg with pristine form.',
    iconName: 'Zap',
    category: 'Gym',
    unlocked: false,
    progressPercent: 40
  },

  // Cardio Achievements
  {
    id: 'first-5k-run',
    title: '5K Road Pioneer',
    description: 'Ran 5 kilometres continuously without stopping.',
    iconName: 'Compass',
    category: 'Cardio',
    unlocked: false,
    progressPercent: 60
  },
  {
    id: 'first-10k-ride',
    title: 'Cyclist Horizon',
    description: 'Completed a 10 km outdoor GPS cycling route.',
    iconName: 'Activity',
    category: 'Cardio',
    unlocked: false,
    progressPercent: 45
  },
  {
    id: 'hundred-km-running',
    title: 'Century Endurance Club',
    description: 'Accumulated 100 total kilometres of outdoor running.',
    iconName: 'Flame',
    category: 'Cardio',
    unlocked: false,
    progressPercent: 18
  },
  {
    id: 'pool-master',
    title: 'Aquatic Flow',
    description: 'Completed 20 laps (1000m) in a single swimming session.',
    iconName: 'Shield',
    category: 'Cardio',
    unlocked: false,
    progressPercent: 25
  },

  // Meditation & Mind
  {
    id: 'mantra-108',
    title: '108 Sacred Beads',
    description: 'Completed a full Japa Mala of 108 Gayatri or Mahamrityunjaya repetitions.',
    iconName: 'Sun',
    category: 'Meditation',
    unlocked: true,
    unlockedAt: new Date().toISOString(),
    progressPercent: 100
  },
  {
    id: 'hundred-meditation-sessions',
    title: 'Zen Master of Stillness',
    description: 'Recorded 100 mindful meditation or breathing sessions.',
    iconName: 'Moon',
    category: 'Meditation',
    unlocked: false,
    progressPercent: 12
  },
  {
    id: 'seven-day-calm',
    title: 'Inner Sanctuary',
    description: '7 consecutive days of morning or evening meditation practice.',
    iconName: 'Heart',
    category: 'Meditation',
    unlocked: false,
    progressPercent: 57
  },

  // Nutrition & Habits
  {
    id: 'protein-target-streak',
    title: 'Plant Protein Titan',
    description: 'Hit 130g+ strict vegetarian protein target for 7 consecutive days.',
    iconName: 'Target',
    category: 'Nutrition',
    unlocked: false,
    progressPercent: 71
  },
  {
    id: 'skincare-30-days',
    title: 'Radiant Shield',
    description: 'Completed 30 consecutive days of morning SPF 50+ and night skincare.',
    iconName: 'Sparkles',
    category: 'Habits',
    unlocked: false,
    progressPercent: 27
  },
  {
    id: 'seven-day-discipline',
    title: 'Iron Will Streak',
    description: '7-day consecutive streak of 5:45 AM wake up and habit completion.',
    iconName: 'Crown',
    category: 'Habits',
    unlocked: false,
    progressPercent: 71
  },
  {
    id: 'digital-monk',
    title: 'Digital Monk',
    description: 'Kept non-work screen time under 2 hours and zero mindless reels for 5 days.',
    iconName: 'EyeOff',
    category: 'Habits',
    unlocked: false,
    progressPercent: 40
  }
];
