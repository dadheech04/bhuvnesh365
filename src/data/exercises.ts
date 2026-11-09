import { Exercise } from '../types';

export const exerciseLibrary: Exercise[] = [
  {
    id: 'db-chest-press',
    name: 'Dumbbell Chest Press',
    targetMuscles: ['Chest'],
    secondaryMuscles: ['Triceps', 'Shoulders'],
    defaultSets: 3,
    defaultReps: 12,
    defaultRestSec: 75,
    recommendedStartingWeightKg: 12.5,
    category: 'Compound',
    equipment: 'Dumbbell',
    animationType: 'press',
    instructions: [
      'Sit on the edge of a flat bench with dumbbells resting on your thighs.',
      'Kick dumbbells up as you lie back, planting feet firmly on the ground.',
      'Hold dumbbells above upper chest with elbows at a 45–60 degree angle to your torso (not flared 90 degrees).',
      'Lower weights smoothly until dumbbells reach chest level, feeling a deep stretch across pecs.',
      'Press upward with power, squeezing pecs at the peak without locking elbows aggressively.'
    ],
    postureTips: [
      'Maintain a slight natural arch in the lower back.',
      'Keep shoulder blades retracted and pinned into the bench throughout.',
      'Drive feet down into the floor for leg drive and spinal stability.'
    ],
    safetyInstructions: [
      'Never drop heavy dumbbells carelessly; bring knees up to meet weights before sitting up.',
      'If you feel sharp shoulder anterior impingement, narrow elbow angle or decrease weight.',
      'Do not bounce or lose control at bottom of movement.'
    ],
    commonMistakes: [
      'Flaring elbows out to 90 degrees (strains rotator cuff).',
      'Bouncing dumbbells off the chest.',
      'Arching hips off the bench excessively.'
    ],
    alternativeExercises: ['Barbell Bench Press', 'Push-ups', 'Hammer Strength Chest Press', 'Machine Chest Fly']
  },
  {
    id: 'incline-db-press',
    name: 'Incline Dumbbell Press',
    targetMuscles: ['Chest', 'Shoulders'],
    secondaryMuscles: ['Triceps'],
    defaultSets: 3,
    defaultReps: 10,
    defaultRestSec: 75,
    recommendedStartingWeightKg: 10,
    category: 'Compound',
    equipment: 'Dumbbell',
    animationType: 'press',
    instructions: [
      'Set bench to a 30 to 45-degree angle. Higher angles shift too much load to front deltoids.',
      'Lie back with dumbbells resting just outside upper chest, palms facing forward.',
      'Press both dumbbells upward until arms are extended but not locked.',
      'Slowly lower the dumbbells back to upper chest level over 2–3 seconds.'
    ],
    postureTips: [
      'Keep your chest high and collarbones spread wide.',
      'Ensure bench angle is not steeper than 45 degrees.'
    ],
    safetyInstructions: [
      'Control the descent; rapid drops place extreme torque on shoulder capsules.',
      'Stop if acute anterior shoulder pain occurs.'
    ],
    commonMistakes: [
      'Setting bench at 60+ degrees turning it into a shoulder press.',
      'Touching dumbbells at top with a loud clack (loses continuous muscular tension).'
    ],
    alternativeExercises: ['Incline Barbell Press', 'Low-to-High Cable Fly', 'Decline Push-ups']
  },
  {
    id: 'lat-pulldown',
    name: 'Lat Pulldown',
    targetMuscles: ['Back'],
    secondaryMuscles: ['Biceps', 'Shoulders'],
    defaultSets: 3,
    defaultReps: 12,
    defaultRestSec: 60,
    recommendedStartingWeightKg: 35,
    category: 'Compound',
    equipment: 'Cable',
    animationType: 'pull',
    instructions: [
      'Adjust thigh pad so your legs are firmly locked under the rollers.',
      'Grip wide bar slightly wider than shoulder-width with overhand grip.',
      'Lean back slightly (about 10–15 degrees), engage lats by depressing shoulder blades first.',
      'Pull bar down smoothly toward upper chest, driving elbows downward and backward.',
      'Pause for 1 second at chest, then slowly control the bar back up to full stretch.'
    ],
    postureTips: [
      'Do not swing your torso back and forth using momentum.',
      'Imagine trying to put your elbows into your back pockets.'
    ],
    safetyInstructions: [
      'Never pull behind the neck; this causes severe cervical and rotator cuff strain.',
      'Control the eccentric return rather than letting weight stack slam.'
    ],
    commonMistakes: [
      'Yanking weight with momentum and excessive backward swinging.',
      'Rounding shoulders forward at bottom of pull.'
    ],
    alternativeExercises: ['Assisted Pull-ups', 'Neutral Grip Pulldown', 'Straight Arm Pulldown']
  },
  {
    id: 'seated-cable-row',
    name: 'Seated Cable Row',
    targetMuscles: ['Back'],
    secondaryMuscles: ['Biceps', 'Forearms', 'Core'],
    defaultSets: 3,
    defaultReps: 12,
    defaultRestSec: 60,
    recommendedStartingWeightKg: 30,
    category: 'Compound',
    equipment: 'Cable',
    animationType: 'pull',
    instructions: [
      'Sit on bench with feet placed on footrests, knees slightly bent (never locked out).',
      'Reach forward to grip V-bar attachment with arms extended and spine neutral.',
      'Pull handles smoothly towards lower abdomen/navel, pulling shoulder blades together.',
      'Hold peak squeeze for a count of 1 second.',
      'Slowly extend arms forward with control, maintaining tall upright torso posture.'
    ],
    postureTips: [
      'Keep chest puffed out and shoulders rolled back.',
      'Do not rock your lower back back and forth.'
    ],
    safetyInstructions: [
      'Avoid hyperextending or flexing lumbar spine under load.',
      'Keep knees soft when bracing on the foot pads.'
    ],
    commonMistakes: [
      'Using aggressive torso swinging to move the weight.',
      'Shrugging shoulders up to ears instead of retracting scapulae.'
    ],
    alternativeExercises: ['One-Arm Dumbbell Row', 'Chest-Supported Machine Row', 'Inverted Bodyweight Row']
  },
  {
    id: 'leg-press',
    name: 'Leg Press (45-Degree)',
    targetMuscles: ['Quads'],
    secondaryMuscles: ['Glutes', 'Hamstrings', 'Calves'],
    defaultSets: 3,
    defaultReps: 12,
    defaultRestSec: 90,
    recommendedStartingWeightKg: 60,
    category: 'Compound',
    equipment: 'Machine',
    animationType: 'press',
    instructions: [
      'Sit securely on leg press machine with hips fully back against seat pad.',
      'Place feet shoulder-width apart in middle of platform, toes pointed slightly outward.',
      'Release safety pins and lower sled smoothly until knees form 90-degree angle.',
      'Press through heels and midfoot to push platform back up.',
      'Stop just before your knees lock out to maintain constant quad tension and protect joints.'
    ],
    postureTips: [
      'Ensure tailbone stays firmly glued to backrest; never let lower back round off.',
      'Knees must track in line with 2nd and 3rd toes, never collapsing inward.'
    ],
    safetyInstructions: [
      'CRITICAL: Never lock knees out completely under heavy load.',
      'Always set safety stops so sled cannot crush you if fatigue hits.'
    ],
    commonMistakes: [
      'Letting butt curl off seat at bottom of repetition.',
      'Locking knees forcefully at top of press.'
    ],
    alternativeExercises: ['Goblet Squats', 'Hack Squat', 'Dumbbell Walking Lunges']
  },
  {
    id: 'squat',
    name: 'Squats (Barbell or Goblet)',
    targetMuscles: ['Quads', 'Glutes'],
    secondaryMuscles: ['Hamstrings', 'Core', 'Calves'],
    defaultSets: 3,
    defaultReps: 10,
    defaultRestSec: 90,
    recommendedStartingWeightKg: 20,
    category: 'Compound',
    equipment: 'Barbell',
    animationType: 'squat',
    instructions: [
      'Position feet slightly wider than shoulder-width, toes turned out 15–30 degrees.',
      'Inhale deeply into abdomen (Valsalva brace) and push hips back like sitting into a chair.',
      'Descend until thighs are at least parallel to the floor, keeping knees tracking over toes.',
      'Drive through midfoot and heels to return to standing position, exhaling at top.'
    ],
    postureTips: [
      'Keep chest proud and eyes focused forward or slightly downward.',
      'Maintain tight core and neutral spine throughout descent and ascent.'
    ],
    safetyInstructions: [
      'Use safety pins inside a power rack.',
      'If lower back rounds (butt wink), reduce depth or switch to Goblet Squat first.'
    ],
    commonMistakes: [
      'Knees caving inward (valgus collapse).',
      'Rising on toes or letting heels lift off floor.'
    ],
    alternativeExercises: ['Goblet Squat with Dumbbell', 'Smith Machine Squat', 'Leg Press']
  },
  {
    id: 'shoulder-press',
    name: 'Dumbbell Overhead Shoulder Press',
    targetMuscles: ['Shoulders'],
    secondaryMuscles: ['Triceps', 'Core'],
    defaultSets: 3,
    defaultReps: 10,
    defaultRestSec: 75,
    recommendedStartingWeightKg: 10,
    category: 'Compound',
    equipment: 'Dumbbell',
    animationType: 'press',
    instructions: [
      'Sit on an upright bench with back support, holding dumbbells at shoulder level with overhand grip.',
      'Elbows should be positioned slightly in front of shoulders in the scapular plane (not flared wide).',
      'Press weights vertically overhead until arms are extended above crown of head.',
      'Pause briefly, then lower dumbbells smoothly back to ear level.'
    ],
    postureTips: [
      'Keep core braced and ribcage down to prevent excessive lower back arching.',
      'Move dumbbells in a smooth arc that finishes directly over your center of gravity.'
    ],
    safetyInstructions: [
      'Do not lean back excessively to turn this into an incline press.',
      'Select a weight you can press without head bobbing or spinal contortion.'
    ],
    commonMistakes: [
      'Flaring elbows completely to sides (impinges supraspinatus).',
      'Hyperextending lumbar spine.'
    ],
    alternativeExercises: ['Barbell Overhead Press', 'Machine Shoulder Press', 'Arnold Press']
  },
  {
    id: 'bicep-curl',
    name: 'Dumbbell Bicep Curls',
    targetMuscles: ['Biceps'],
    secondaryMuscles: ['Forearms'],
    defaultSets: 3,
    defaultReps: 12,
    defaultRestSec: 60,
    recommendedStartingWeightKg: 8,
    category: 'Isolation',
    equipment: 'Dumbbell',
    animationType: 'curl',
    instructions: [
      'Stand tall or sit upright holding a dumbbell in each hand at arms length, palms facing thighs.',
      'Keeping upper arms pinned tightly beside torso, curl weights up while supinating wrists (palms face up).',
      'Squeeze biceps forcefully at peak contraction for 1 second.',
      'Slowly lower weights over 2 seconds back to starting position.'
    ],
    postureTips: [
      'Do not swing torso or use hips to launch the dumbbells up.',
      'Keep elbows stationary in space.'
    ],
    safetyInstructions: [
      'Avoid hyperextending elbows at the bottom under heavy load.',
      'Maintain neutral wrist alignment.'
    ],
    commonMistakes: [
      'Swinging body for momentum (cheat curls).',
      'Allowing elbows to drift forward excessively.'
    ],
    alternativeExercises: ['EZ Bar Preacher Curl', 'Incline Dumbbell Curl', 'Cable Bicep Curl']
  },
  {
    id: 'tricep-extension',
    name: 'Overhead Tricep Extension (Dumbbell/Cable)',
    targetMuscles: ['Triceps'],
    secondaryMuscles: ['Shoulders', 'Core'],
    defaultSets: 3,
    defaultReps: 12,
    defaultRestSec: 60,
    recommendedStartingWeightKg: 10,
    category: 'Isolation',
    equipment: 'Dumbbell',
    animationType: 'extension',
    instructions: [
      'Sit upright holding one dumbbell with both hands cupping top plate overhead.',
      'Keep upper arms vertical and close to ears.',
      'Lower dumbbell behind your head by bending only at elbows until triceps feel fully stretched.',
      'Extend elbows to press dumbbell back overhead, contracting triceps hard at top.'
    ],
    postureTips: [
      'Brace core to keep ribs down and prevent hyper-arching spine.',
      'Keep elbows pointing forward/upward, avoiding excessive flare.'
    ],
    safetyInstructions: [
      'Ensure secure grip around dumbbell base so it never slips behind head.',
      'If elbows ache, replace with rope cable pushdown or skull crushers.'
    ],
    commonMistakes: [
      'Allowing elbows to flare wide out to the sides.',
      'Short-changing range of motion at bottom.'
    ],
    alternativeExercises: ['Cable Rope Tricep Pushdown', 'Skull Crushers', 'Bench Dips']
  },
  {
    id: 'romanian-deadlift',
    name: 'Romanian Deadlift (RDL)',
    targetMuscles: ['Hamstrings', 'Glutes'],
    secondaryMuscles: ['Back', 'Core', 'Forearms'],
    defaultSets: 3,
    defaultReps: 10,
    defaultRestSec: 90,
    recommendedStartingWeightKg: 25,
    category: 'Compound',
    equipment: 'Dumbbell',
    animationType: 'hinge',
    instructions: [
      'Stand holding dumbbells or barbell in front of thighs, feet hip-width apart.',
      'Slightly soften knees and keep them fixed in that soft angle throughout.',
      'Hinge at hips, pushing glutes straight backward towards wall behind you.',
      'Lower weights close to shins until you feel a deep stretch in hamstrings (around mid-shin level).',
      'Drive hips forward to return to standing, squeezing glutes at top.'
    ],
    postureTips: [
      'Maintain flat, neutral spine with shoulder blades set in place.',
      'Keep dumbbells skimming close to legs throughout entire path.'
    ],
    safetyInstructions: [
      'DO NOT round lower back. Stop descent once hips stop traveling backward.',
      'Do not turn this into a squat by bending knees further.'
    ],
    commonMistakes: [
      'Rounding the spine to reach the floor.',
      'Letting weights drift away from legs, overloading lower back.'
    ],
    alternativeExercises: ['Lying Leg Curl', 'Barbell Good Mornings', 'Single-Leg Dumbbell RDL']
  },
  {
    id: 'plank',
    name: 'Core Stability Forearm Plank',
    targetMuscles: ['Core'],
    secondaryMuscles: ['Shoulders', 'Glutes'],
    defaultSets: 3,
    defaultReps: 45, // seconds
    defaultRestSec: 60,
    recommendedStartingWeightKg: 0,
    category: 'Isolation',
    equipment: 'Bodyweight',
    animationType: 'plank',
    instructions: [
      'Lie face down and place forearms on floor with elbows directly under shoulders.',
      'Tuck toes and lift body so only forearms and toes touch the ground.',
      'Form a rigid, straight line from head to heels.',
      'Actively squeeze glutes, brace abs as if expecting a punch, and breathe smoothly.',
      'Hold the static position with solid alignment.'
    ],
    postureTips: [
      'Keep gaze neutral on floor slightly ahead of fingers.',
      'Do not allow hips to sag or pike up into a tent.'
    ],
    safetyInstructions: [
      'Stop if you feel dull lower back pinching (signals core disengagement).',
      'Focus on full-body tension rather than mindlessly holding poor form.'
    ],
    commonMistakes: [
      'Holding breath.',
      'Sagging hips putting strain on lumbar vertebrae.'
    ],
    alternativeExercises: ['Deadbug', 'Pallof Press', 'Ab Wheel Rollout', 'Side Plank']
  },
  {
    id: 'incline-treadmill',
    name: 'Incline Treadmill Power Walk',
    targetMuscles: ['Cardio', 'Calves'],
    secondaryMuscles: ['Glutes', 'Hamstrings'],
    defaultSets: 1,
    defaultReps: 20, // minutes
    defaultRestSec: 0,
    recommendedStartingWeightKg: 0,
    category: 'Cardio',
    equipment: 'Treadmill',
    animationType: 'cardio',
    instructions: [
      'Step onto treadmill, clip safety emergency cord to shirt.',
      'Set incline to 8% to 12% and speed between 4.5 to 5.5 km/h.',
      'Walk with strong, deliberate strides, pumping arms naturally at sides.',
      'Maintain steady breathing through nose and mouth in Zone 2 heart rate.'
    ],
    postureTips: [
      'Stand upright; avoid leaning backward or clinging to handles for support.',
      'Drive through balls of feet and engage calves on every incline step.'
    ],
    safetyInstructions: [
      'Holding onto rails drastically decreases calorie burn and alters natural biomechanics.',
      'Stay centered on the belt.'
    ],
    commonMistakes: [
      'Gripping handrails and leaning back like water-skiing.',
      'Taking excessively long or clumsy strides.'
    ],
    alternativeExercises: ['Stair Climber', 'Outdoor Incline Walk', 'Rucking']
  },
  {
    id: 'elliptical',
    name: 'Low-Impact Elliptical Cross-Trainer',
    targetMuscles: ['Cardio', 'Full Body'],
    secondaryMuscles: ['Quads', 'Glutes', 'Calves'],
    defaultSets: 1,
    defaultReps: 25, // minutes
    defaultRestSec: 0,
    recommendedStartingWeightKg: 0,
    category: 'Cardio',
    equipment: 'Elliptical',
    animationType: 'cardio',
    instructions: [
      'Step onto pedals and grasp moving handles comfortably.',
      'Start pedaling forward with smooth, fluid oval motion.',
      'Adjust resistance to moderate (level 6–10) to sustain a challenging Zone 2/3 aerobic pace.',
      'Push and pull handles actively to engage upper body musculature.'
    ],
    postureTips: [
      'Keep heels down on pedals rather than pedaling strictly on toes.',
      'Keep torso erect with shoulders relaxed.'
    ],
    safetyInstructions: [
      'Zero impact on knees; excellent choice for active recovery or when legs feel sore from squats.',
      'Stop if foot numbness occurs; reposition feet.'
    ],
    commonMistakes: [
      'Pedaling with zero resistance flailing legs uselessly.',
      'Slouching over the machine display console.'
    ],
    alternativeExercises: ['Stationary Bike', 'Rowing Machine', 'SkiErg']
  }
];
