import React, { useState, useEffect } from 'react';
import { vegetarianFoodDatabase, indianHighProteinMealPlans } from '../../data/vegetarianFoodDb';
import { FoodItem, MealLogItem, DailyNutritionLog } from '../../types';
import { storage, getTodayKey } from '../../utils/storage';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';
import {
  UtensilsCrossed,
  Droplets,
  Plus,
  Trash2,
  Sparkles,
  Search,
  CheckCircle2,
  ShieldCheck,
  Flame,
  ChefHat
} from 'lucide-react';

export const NutritionTracker: React.FC = () => {
  const profile = storage.getProfile();
  const [nutritionLog, setNutritionLog] = useState<DailyNutritionLog>(() =>
    storage.getNutritionLog(getTodayKey())
  );

  const [selectedMealSlot, setSelectedMealSlot] = useState<
    'breakfast' | 'lunch' | 'preWorkout' | 'dinner' | 'snacks'
  >('breakfast');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFood, setSelectedFood] = useState<FoodItem>(vegetarianFoodDatabase[0]);
  const [servingsMultiplier, setServingsMultiplier] = useState<number>(1);
  const [showRecipes, setShowRecipes] = useState(false);

  // Quick Water Add
  const handleAddWater = (liters: number) => {
    sound.playTap();
    const updated = {
      ...nutritionLog,
      waterLiters: Math.round((nutritionLog.waterLiters + liters) * 10) / 10,
    };
    setNutritionLog(updated);
    storage.saveNutritionLog(updated);
  };

  // Add Item to Current Meal Slot
  const handleAddFoodToMeal = () => {
    sound.playTap();
    const mealItem: MealLogItem = {
      id: `item_${Date.now()}`,
      foodId: selectedFood.id,
      foodName: selectedFood.name,
      servings: servingsMultiplier,
      totalCalories: Math.round(selectedFood.calories * servingsMultiplier),
      totalProteinG: Math.round(selectedFood.proteinG * servingsMultiplier * 10) / 10,
      totalCarbsG: Math.round(selectedFood.carbsG * servingsMultiplier * 10) / 10,
      totalFatG: Math.round(selectedFood.fatG * servingsMultiplier * 10) / 10,
      totalFiberG: Math.round(selectedFood.fiberG * servingsMultiplier * 10) / 10,
    };

    const updated = { ...nutritionLog };
    updated.meals[selectedMealSlot] = [...updated.meals[selectedMealSlot], mealItem];

    // Recalculate totals
    storage.saveNutritionLog(updated);
    setNutritionLog({ ...updated });

    // Check if target reached!
    if (updated.totalProteinG >= profile.proteinTargetGrams) {
      confetti({
        particleCount: 50,
        spread: 60,
      });
    }
  };

  const handleRemoveItem = (slot: keyof DailyNutritionLog['meals'], id: string) => {
    sound.playTap();
    const updated = { ...nutritionLog };
    updated.meals[slot] = updated.meals[slot].filter((item) => item.id !== id);
    storage.saveNutritionLog(updated);
    setNutritionLog({ ...updated });
  };

  const filteredFoods = vegetarianFoodDatabase.filter(
    (f) =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (f.hindiName && f.hindiName.includes(searchQuery)) ||
      f.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const proteinProgress = Math.min(
    100,
    Math.round((nutritionLog.totalProteinG / profile.proteinTargetGrams) * 100)
  );
  const waterProgress = Math.min(
    100,
    Math.round((nutritionLog.waterLiters / profile.waterTargetLiters) * 100)
  );

  return (
    <div className="space-y-6">
      {/* Top Nutrition & Protein HUD */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 sm:p-7 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Strict Vegetarian (Zero Meat, Zero Eggs)
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Vegetarian Nutrition Tracker
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Engineered for Bhuvnesh Dadheech: 130g daily plant & dairy protein target for lean muscle hypertrophy and
              belly fat reduction.
            </p>
          </div>

          <button
            onClick={() => setShowRecipes(!showRecipes)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 self-start sm:self-auto transition"
          >
            <ChefHat className="w-4 h-4 text-emerald-400" />
            {showRecipes ? 'Hide Meal Plans' : 'View Indian High-Protein Meal Plans'}
          </button>
        </div>

        {/* Protein Progress Bar Hero */}
        <div className="my-6 p-5 rounded-2xl bg-slate-950 border border-slate-800">
          <div className="flex items-baseline justify-between mb-2">
            <div>
              <span className="text-xs font-mono uppercase text-slate-400">Daily Protein Target</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">
                  {nutritionLog.totalProteinG}g
                </span>
                <span className="text-sm text-slate-400 font-mono font-bold">
                  / {profile.proteinTargetGrams}g target
                </span>
              </div>
            </div>
            <span className="text-xl font-black text-white font-mono">{proteinProgress}%</span>
          </div>

          <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-500"
              style={{ width: `${proteinProgress}%` }}
            />
          </div>

          {/* Calorie & Macro Split Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-4 border-t border-slate-800/80 text-center">
            <div>
              <span className="text-[10px] text-slate-400 font-mono uppercase">Total Energy</span>
              <p className="text-sm font-black text-white font-mono">{nutritionLog.totalCalories} kcal</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-mono uppercase">Carbohydrates</span>
              <p className="text-sm font-black text-cyan-400 font-mono">{nutritionLog.totalCarbsG}g</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-mono uppercase">Healthy Fats</span>
              <p className="text-sm font-black text-amber-400 font-mono">{nutritionLog.totalFatG}g</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-mono uppercase">Dietary Fiber</span>
              <p className="text-sm font-black text-purple-400 font-mono">{nutritionLog.totalFiberG}g</p>
            </div>
          </div>
        </div>

        {/* Water Hydration Tracker */}
        <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-800/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-400">
              <Droplets className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase font-mono text-cyan-400 font-bold">Hydration Engine</span>
              <p className="text-lg font-black text-white font-mono">
                {nutritionLog.waterLiters} / {profile.waterTargetLiters} Liters
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleAddWater(0.25)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-cyan-300 border border-slate-700"
            >
              +250 ml Glass
            </button>
            <button
              onClick={() => handleAddWater(0.5)}
              className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-black uppercase tracking-wider"
            >
              +500 ml Bottle
            </button>
          </div>
        </div>
      </div>

      {/* Indian High-Protein Meal Suggestions Drawer */}
      {showRecipes && (
        <div className="rounded-3xl bg-slate-900/80 border border-emerald-500/30 p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase font-mono">
            <ChefHat className="w-4 h-4" /> Indian High-Protein Vegetarian Meal Plans (130g+ Blueprint)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {indianHighProteinMealPlans.map((plan, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-mono text-emerald-400 font-bold">{plan.targetSlot}</span>
                    <span className="text-white font-black font-mono">
                      {plan.totalProteinG}g Protein • {plan.totalCalories} kcal
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-2">{plan.title}</h4>
                  <ul className="text-xs text-slate-300 list-disc pl-4 space-y-0.5 mb-2">
                    {plan.ingredients.map((ing, i) => (
                      <li key={i}>{ing}</li>
                    ))}
                  </ul>
                </div>
                <p className="text-[11px] text-slate-400 italic border-t border-slate-800/80 pt-2">
                  {plan.instructions}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Food Logger Section */}
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-5 sm:p-6">
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <UtensilsCrossed className="w-4 h-4 text-emerald-400" /> Log Vegetarian Food Item
        </h3>

        {/* Meal Slot Tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          {(
            [
              { id: 'breakfast', label: 'Breakfast' },
              { id: 'preWorkout', label: 'Pre-Gym' },
              { id: 'lunch', label: 'Office Lunch' },
              { id: 'snacks', label: 'Evening Snacks' },
              { id: 'dinner', label: 'Dinner' },
            ] as { id: typeof selectedMealSlot; label: string }[]
          ).map((slot) => (
            <button
              key={slot.id}
              onClick={() => setSelectedMealSlot(slot.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition ${
                selectedMealSlot === slot.id
                  ? 'bg-emerald-500 text-black border-emerald-400 font-black'
                  : 'bg-slate-950 text-slate-400 border-slate-800'
              }`}
            >
              {slot.label} ({nutritionLog.meals[slot.id].length})
            </button>
          ))}
        </div>

        {/* Search Food Database */}
        <div className="relative mb-4">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Soya Chunks, Paneer, Moong Dal, Sprouts, Tofu..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Quick Food Item Pills */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none">
          {filteredFoods.slice(0, 8).map((food) => (
            <button
              key={food.id}
              onClick={() => setSelectedFood(food)}
              className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-semibold border text-left transition ${
                selectedFood.id === food.id
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50 font-bold'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="font-bold">{food.name}</div>
              <div className="text-[10px] text-slate-400">
                {food.proteinG}g protein / {food.servingUnit}
              </div>
            </button>
          ))}
        </div>

        {/* Selected Item Portion & Log Button */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-white">{selectedFood.name}</h4>
            <p className="text-xs text-slate-400">
              1 serving ({selectedFood.servingUnit}) = {selectedFood.calories} kcal • {selectedFood.proteinG}g protein • {selectedFood.carbsG}g carbs
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono">Servings:</span>
              <button
                onClick={() => setServingsMultiplier((m) => Math.max(0.5, Math.round((m - 0.5) * 10) / 10))}
                className="w-8 h-8 rounded-lg bg-slate-800 text-white font-bold"
              >
                -
              </button>
              <span className="text-sm font-mono font-bold text-white w-8 text-center">
                {servingsMultiplier}
              </span>
              <button
                onClick={() => setServingsMultiplier((m) => Math.round((m + 0.5) * 10) / 10)}
                className="w-8 h-8 rounded-lg bg-slate-800 text-white font-bold"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddFoodToMeal}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 transition"
            >
              <Plus className="w-4 h-4" /> Add to {selectedMealSlot}
            </button>
          </div>
        </div>

        {/* Logged Items in Current Slot */}
        <div className="mt-6">
          <h4 className="text-xs uppercase font-mono tracking-wider text-slate-400 mb-2">
            Items Logged in {selectedMealSlot}
          </h4>
          {nutritionLog.meals[selectedMealSlot].length === 0 ? (
            <p className="text-xs text-slate-500 italic">No food logged yet in this slot.</p>
          ) : (
            <div className="space-y-2">
              {nutritionLog.meals[selectedMealSlot].map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs"
                >
                  <div>
                    <span className="font-bold text-white">{item.foodName}</span>
                    <span className="text-slate-400 ml-2 font-mono">
                      ({item.servings} serving{item.servings > 1 ? 's' : ''}) • {item.totalCalories} kcal •{' '}
                      <strong className="text-emerald-400">{item.totalProteinG}g protein</strong>
                    </span>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(selectedMealSlot, item.id)}
                    className="p-1 rounded text-slate-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
