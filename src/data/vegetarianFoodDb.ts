import { FoodItem } from '../types';

export const vegetarianFoodDatabase: FoodItem[] = [
  // High-Protein Staples
  {
    id: 'soya-chunks',
    name: 'Soya Chunks (Nutrela)',
    hindiName: 'सोया चंक्स',
    category: 'Protein',
    servingUnit: '100g (uncooked)',
    servingGrams: 100,
    calories: 345,
    proteinG: 52.0,
    carbsG: 33.0,
    fatG: 0.5,
    fiberG: 13.0,
    isStrictVegetarian: true,
    description: 'The undisputed king of vegetarian plant protein. Boiling in salted water yields double volume with over 50g complete amino profile.'
  },
  {
    id: 'paneer-raw',
    name: 'Fresh Cow Milk Paneer',
    hindiName: 'ताज़ा पनीर',
    category: 'Dairy',
    servingUnit: '100g',
    servingGrams: 100,
    calories: 265,
    proteinG: 18.5,
    carbsG: 3.5,
    fatG: 20.0,
    fiberG: 0,
    isStrictVegetarian: true,
    description: 'Rich in slow-digesting casein protein, calcium, and healthy fats. Excellent for sustained muscle protein synthesis.'
  },
  {
    id: 'paneer-lowfat',
    name: 'Low-Fat / Skimmed Milk Paneer',
    hindiName: 'लो-फैट पनीर',
    category: 'Dairy',
    servingUnit: '100g',
    servingGrams: 100,
    calories: 160,
    proteinG: 24.0,
    carbsG: 4.0,
    fatG: 5.0,
    fiberG: 0,
    isStrictVegetarian: true,
    description: 'High protein-to-calorie ratio, ideal when managing abdominal fat while preserving lean muscle mass.'
  },
  {
    id: 'tofu-firm',
    name: 'Firm Organic Tofu',
    hindiName: 'सोया पनीर (टोफू)',
    category: 'Protein',
    servingUnit: '100g',
    servingGrams: 100,
    calories: 144,
    proteinG: 17.0,
    carbsG: 3.0,
    fatG: 8.5,
    fiberG: 2.3,
    isStrictVegetarian: true,
    description: 'Complete soy protein, light on digestion, low in saturated fat, absorbs Indian spices and curries perfectly.'
  },
  {
    id: 'plant-protein-powder',
    name: 'Plant Protein Isolate (Pea & Brown Rice)',
    hindiName: 'प्लांट प्रोटीन पाउडर',
    category: 'Protein',
    servingUnit: '1 scoop (33g)',
    servingGrams: 33,
    calories: 130,
    proteinG: 26.0,
    carbsG: 2.5,
    fatG: 1.5,
    fiberG: 2.0,
    isStrictVegetarian: true,
    description: '100% vegan certified isolate providing 26g clean protein with BCAAs for post-workout muscle repair.'
  },
  {
    id: 'greek-yogurt',
    name: 'Greek Yogurt (Plain / Unsweetened Epigamia)',
    hindiName: 'ग्रीक योगर्ट',
    category: 'Dairy',
    servingUnit: '1 cup (150g)',
    servingGrams: 150,
    calories: 110,
    proteinG: 12.0,
    carbsG: 6.0,
    fatG: 3.0,
    fiberG: 0,
    isStrictVegetarian: true,
    description: 'Strained probiotic curd packed with bioavailable protein and gut-strengthening active cultures.'
  },
  {
    id: 'curd-dahi',
    name: 'Homemade Curd (Dahi)',
    hindiName: 'घर का दही',
    category: 'Dairy',
    servingUnit: '1 bowl (150g)',
    servingGrams: 150,
    calories: 90,
    proteinG: 5.5,
    carbsG: 6.5,
    fatG: 4.5,
    fiberG: 0,
    isStrictVegetarian: true,
    description: 'Traditional Indian digestion aid, cooling, enhances gut microbiome and nutrient absorption.'
  },
  {
    id: 'cow-milk',
    name: 'Toned Cow Milk',
    hindiName: 'गाय का दूध',
    category: 'Dairy',
    servingUnit: '1 glass (250ml)',
    servingGrams: 250,
    calories: 145,
    proteinG: 8.2,
    carbsG: 12.0,
    fatG: 7.5,
    fiberG: 0,
    isStrictVegetarian: true,
    description: 'Natural whey and casein blend, fortified with vitamin D and phosphorus for bone and muscle recovery.'
  },

  // Dals, Pulses & Sprouts
  {
    id: 'moong-dal-cooked',
    name: 'Moong Dal (Yellow/Split Cooked)',
    hindiName: 'मूंग दाल (पकी हुई)',
    category: 'Dal & Lentils',
    servingUnit: '1 katori (150g cooked)',
    servingGrams: 150,
    calories: 155,
    proteinG: 10.5,
    carbsG: 25.0,
    fatG: 1.0,
    fiberG: 6.5,
    isStrictVegetarian: true,
    description: 'Extremely easy on digestion, soothing for the stomach, high in folate and potassium.'
  },
  {
    id: 'moong-sprouts',
    name: 'Sprouted Green Moong Beans',
    hindiName: 'अंकुरित मूंग',
    category: 'Protein',
    servingUnit: '1 cup (100g)',
    servingGrams: 100,
    calories: 105,
    proteinG: 8.5,
    carbsG: 19.0,
    fatG: 0.8,
    fiberG: 7.6,
    isStrictVegetarian: true,
    description: 'Sprouting activates live enzymes, boosts vitamin C, and multiplies bioavailable micronutrients.'
  },
  {
    id: 'kala-chana-boiled',
    name: 'Black Chickpeas (Kala Chana Boiled)',
    hindiName: 'उबला काला चना',
    category: 'Dal & Lentils',
    servingUnit: '1 cup (150g)',
    servingGrams: 150,
    calories: 220,
    proteinG: 12.5,
    carbsG: 38.0,
    fatG: 3.0,
    fiberG: 10.5,
    isStrictVegetarian: true,
    description: 'High in slow-releasing complex carbs and iron. Outstanding pre-workout or post-run fuel.'
  },
  {
    id: 'rajma-cooked',
    name: 'Rajma / Red Kidney Beans (Cooked)',
    hindiName: 'पके राजमा',
    category: 'Dal & Lentils',
    servingUnit: '1 bowl (180g)',
    servingGrams: 180,
    calories: 215,
    proteinG: 14.0,
    carbsG: 40.0,
    fatG: 1.2,
    fiberG: 11.5,
    isStrictVegetarian: true,
    description: 'Classic North Indian powerhouse packed with soluble fiber to lower LDL cholesterol and abdominal visceral fat.'
  },
  {
    id: 'masoor-dal',
    name: 'Red Masoor Dal (Cooked)',
    hindiName: 'लाल मसूर दाल',
    category: 'Dal & Lentils',
    servingUnit: '1 katori (150g)',
    servingGrams: 150,
    calories: 165,
    proteinG: 11.0,
    carbsG: 27.0,
    fatG: 1.0,
    fiberG: 7.0,
    isStrictVegetarian: true,
    description: 'Rich in dietary iron, manganese, and antioxidants, cooks fast and sustains midday energy.'
  },

  // Whole Grains & Breads
  {
    id: 'whole-wheat-roti',
    name: 'Whole Wheat Roti (Phulka, No Ghee)',
    hindiName: 'रोटी / फुल्का',
    category: 'Grains',
    servingUnit: '1 medium roti (35g)',
    servingGrams: 35,
    calories: 85,
    proteinG: 3.2,
    carbsG: 17.5,
    fatG: 0.5,
    fiberG: 2.8,
    isStrictVegetarian: true,
    description: 'Traditional 100% whole wheat flatbread providing complex carbohydrates and B vitamins.'
  },
  {
    id: 'besan-chilla',
    name: 'Besan Chilla (Chickpea Flour Pancake)',
    hindiName: 'बेसन का चीला',
    category: 'Grains',
    servingUnit: '1 medium chilla (60g)',
    servingGrams: 60,
    calories: 135,
    proteinG: 7.5,
    carbsG: 16.0,
    fatG: 4.5,
    fiberG: 4.2,
    isStrictVegetarian: true,
    description: 'Savory Indian crepe loaded with herbs, tomatoes, and chickpea protein. Ideal 15-minute breakfast.'
  },
  {
    id: 'rolled-oats',
    name: 'Rolled Oats (Raw)',
    hindiName: 'ओट्स',
    category: 'Grains',
    servingUnit: '50g',
    servingGrams: 50,
    calories: 190,
    proteinG: 6.8,
    carbsG: 34.0,
    fatG: 3.2,
    fiberG: 5.5,
    isStrictVegetarian: true,
    description: 'Rich in beta-glucan soluble fiber that helps trim stubborn abdominal fat and balances blood sugar.'
  },
  {
    id: 'brown-rice-cooked',
    name: 'Steamed Brown Basmati Rice',
    hindiName: 'भूरा चावल',
    category: 'Grains',
    servingUnit: '1 cup cooked (150g)',
    servingGrams: 150,
    calories: 170,
    proteinG: 3.8,
    carbsG: 36.0,
    fatG: 1.5,
    fiberG: 2.5,
    isStrictVegetarian: true,
    description: 'Slow-burning grain with mineral husk intact for steady energy during long office hours.'
  },

  // Nuts, Seeds & Healthy Fats
  {
    id: 'almonds-raw',
    name: 'Raw California / Mamra Almonds',
    hindiName: 'बादाम',
    category: 'Nuts & Seeds',
    servingUnit: '15 nuts (20g)',
    servingGrams: 20,
    calories: 120,
    proteinG: 4.5,
    carbsG: 4.0,
    fatG: 10.0,
    fiberG: 2.5,
    isStrictVegetarian: true,
    description: 'Vitamin E and magnesium dense; supports testosterone, healthy skin, and cognitive acuity.'
  },
  {
    id: 'walnuts',
    name: 'Walnut Halves',
    hindiName: 'अखरोट',
    category: 'Nuts & Seeds',
    servingUnit: '5 halves (15g)',
    servingGrams: 15,
    calories: 100,
    proteinG: 2.3,
    carbsG: 2.0,
    fatG: 10.0,
    fiberG: 1.0,
    isStrictVegetarian: true,
    description: 'Top vegetarian source of Alpha-Linolenic Acid (plant Omega-3) for cardiovascular and joint health.'
  },
  {
    id: 'peanut-butter-natural',
    name: '100% Natural Roasted Peanut Butter (No Added Sugar)',
    hindiName: 'मूंगफली का मक्खन',
    category: 'Nuts & Seeds',
    servingUnit: '1 tbsp (16g)',
    servingGrams: 16,
    calories: 95,
    proteinG: 4.5,
    carbsG: 3.0,
    fatG: 8.0,
    fiberG: 1.2,
    isStrictVegetarian: true,
    description: 'Heart-healthy monounsaturated fats paired with protein for quick pre-gym fuel.'
  },
  {
    id: 'chia-seeds',
    name: 'Chia Seeds',
    hindiName: 'चिया के बीज',
    category: 'Nuts & Seeds',
    servingUnit: '1 tbsp (12g)',
    servingGrams: 12,
    calories: 60,
    proteinG: 2.0,
    carbsG: 5.0,
    fatG: 3.8,
    fiberG: 4.5,
    isStrictVegetarian: true,
    description: 'Super-hydrating mucilage fiber that retains 10x its weight in water, promoting prolonged fullness.'
  },
  {
    id: 'pumpkin-seeds',
    name: 'Roasted Pumpkin Seeds',
    hindiName: 'कद्दू के बीज',
    category: 'Nuts & Seeds',
    servingUnit: '20g',
    servingGrams: 20,
    calories: 115,
    proteinG: 6.0,
    carbsG: 2.5,
    fatG: 9.5,
    fiberG: 1.5,
    isStrictVegetarian: true,
    description: 'Exceptionally rich in zinc and magnesium to support sleep architecture and natural hormone balance.'
  }
];

export interface MealRecommendation {
  title: string;
  targetSlot: 'Breakfast' | 'Lunch' | 'Pre-Gym' | 'Dinner' | 'Snacks';
  totalProteinG: number;
  totalCalories: number;
  ingredients: string[];
  preparationTimeMin: number;
  instructions: string;
}

export const indianHighProteinMealPlans: MealRecommendation[] = [
  {
    title: 'Pre-Gym Energy Boost',
    targetSlot: 'Pre-Gym',
    totalProteinG: 18,
    totalCalories: 260,
    ingredients: ['1 medium banana', '1 tbsp natural peanut butter', '1 glass toned milk (or black coffee)'],
    preparationTimeMin: 3,
    instructions: 'Consume 30-40 minutes before morning 6:00 AM gym session for quick glycemic fuel and sustained nitrogen.'
  },
  {
    title: 'Post-Workout Power Breakfast',
    targetSlot: 'Breakfast',
    totalProteinG: 38,
    totalCalories: 480,
    ingredients: ['1 scoop plant protein isolate', '50g rolled oats', '150g Greek yogurt or dahi', '10g chia seeds', '10 almonds'],
    preparationTimeMin: 5,
    instructions: 'Mix oats with warm water or milk, stir in protein isolate, top with Greek yogurt and crunchy nuts.'
  },
  {
    title: 'High-Protein Office Lunch Box',
    targetSlot: 'Lunch',
    totalProteinG: 42,
    totalCalories: 580,
    ingredients: ['60g dry Soya chunks cooked with onions and tomatoes', '1 bowl Moong dal', '2 whole wheat phulkas', 'Cucumber salad'],
    preparationTimeMin: 20,
    instructions: 'Boil soya chunks, squeeze water, saute with cumin, ginger-garlic and tomato masala. Pack with dal and rotis.'
  },
  {
    title: 'Mid-Office 5:00 PM Anti-Fatigue Snack',
    targetSlot: 'Snacks',
    totalProteinG: 16,
    totalCalories: 190,
    ingredients: ['1 cup roasted green moong sprouts', '15g roasted pumpkin seeds', 'Lemon juice & chaat masala'],
    preparationTimeMin: 2,
    instructions: 'Toss sprouts with diced cucumber, tomatoes, lemon juice, and seeds. Curbs evening junk food cravings.'
  },
  {
    title: 'Lean Muscle Regeneration Dinner',
    targetSlot: 'Dinner',
    totalProteinG: 36,
    totalCalories: 510,
    ingredients: ['120g low-fat Paneer or firm Tofu grilled with spices', '1 bowl Rajma or Dal Tadka', '1 cup steamed brown rice or 1 roti', 'Green salad'],
    preparationTimeMin: 15,
    instructions: 'Cube paneer/tofu, season with turmeric, roasted cumin, and black pepper. Lightly pan-sear and enjoy before 8:30 PM.'
  }
];
