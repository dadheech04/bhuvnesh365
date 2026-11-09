import React from 'react';
import { MuscleGroup } from '../../types';

interface MuscleAnatomyProps {
  activeMuscles: MuscleGroup[];
  secondaryMuscles?: MuscleGroup[];
  size?: 'sm' | 'md' | 'lg';
}

export const MuscleAnatomy: React.FC<MuscleAnatomyProps> = ({
  activeMuscles,
  secondaryMuscles = [],
  size = 'md',
}) => {
  const isPrimary = (muscle: MuscleGroup) => activeMuscles.includes(muscle);
  const isSecondary = (muscle: MuscleGroup) => secondaryMuscles.includes(muscle);

  const getColor = (muscle: MuscleGroup) => {
    if (isPrimary(muscle)) return '#10b981'; // vibrant emerald
    if (isSecondary(muscle)) return '#06b6d4'; // bright cyan
    return '#334155'; // muted slate-700
  };

  const getOpacity = (muscle: MuscleGroup) => {
    if (isPrimary(muscle)) return '1';
    if (isSecondary(muscle)) return '0.85';
    return '0.35';
  };

  const dim = size === 'sm' ? 140 : size === 'lg' ? 260 : 200;

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-6 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
        {/* Anterior (Front) View */}
        <div className="flex flex-col items-center">
          <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-1">Anterior (Front)</span>
          <svg width={dim * 0.45} height={dim} viewBox="0 0 100 220" className="drop-shadow-md">
            {/* Head & Neck */}
            <circle cx="50" cy="18" r="12" fill="#475569" opacity="0.6" />
            <path d="M44 30 L56 30 L54 40 L46 40 Z" fill="#475569" opacity="0.6" />

            {/* Shoulders (Deltoids) */}
            <path
              d="M32 42 Q22 45 22 58 Q28 62 34 50 Z"
              fill={getColor('Shoulders')}
              opacity={getOpacity('Shoulders')}
              className="transition-colors duration-300"
            />
            <path
              d="M68 42 Q78 45 78 58 Q72 62 66 50 Z"
              fill={getColor('Shoulders')}
              opacity={getOpacity('Shoulders')}
              className="transition-colors duration-300"
            />

            {/* Chest (Pectorals) */}
            <path
              d="M34 44 Q50 46 50 58 Q34 68 34 44 Z"
              fill={getColor('Chest')}
              opacity={getOpacity('Chest')}
              className="transition-colors duration-300"
            />
            <path
              d="M66 44 Q50 46 50 58 Q66 68 66 44 Z"
              fill={getColor('Chest')}
              opacity={getOpacity('Chest')}
              className="transition-colors duration-300"
            />

            {/* Biceps */}
            <path
              d="M20 60 Q16 75 22 88 Q26 75 22 60 Z"
              fill={getColor('Biceps')}
              opacity={getOpacity('Biceps')}
              className="transition-colors duration-300"
            />
            <path
              d="M80 60 Q84 75 78 88 Q74 75 78 60 Z"
              fill={getColor('Biceps')}
              opacity={getOpacity('Biceps')}
              className="transition-colors duration-300"
            />

            {/* Forearms */}
            <path d="M18 90 L24 90 L22 115 L16 115 Z" fill="#475569" opacity="0.4" />
            <path d="M82 90 L76 90 L78 115 L84 115 Z" fill="#475569" opacity="0.4" />

            {/* Core / Abdominals */}
            <rect
              x="42"
              y="62"
              width="16"
              height="38"
              rx="4"
              fill={getColor('Core')}
              opacity={getOpacity('Core')}
              className="transition-colors duration-300"
            />

            {/* Quads (Thighs) */}
            <path
              d="M33 108 Q30 145 36 160 Q46 160 48 108 Z"
              fill={getColor('Quads')}
              opacity={getOpacity('Quads')}
              className="transition-colors duration-300"
            />
            <path
              d="M67 108 Q70 145 64 160 Q54 160 52 108 Z"
              fill={getColor('Quads')}
              opacity={getOpacity('Quads')}
              className="transition-colors duration-300"
            />

            {/* Calves (Anterior) */}
            <path
              d="M35 165 L44 165 L42 205 L37 205 Z"
              fill={getColor('Calves')}
              opacity={getOpacity('Calves')}
              className="transition-colors duration-300"
            />
            <path
              d="M65 165 L56 165 L58 205 L63 205 Z"
              fill={getColor('Calves')}
              opacity={getOpacity('Calves')}
              className="transition-colors duration-300"
            />
          </svg>
        </div>

        {/* Posterior (Back) View */}
        <div className="flex flex-col items-center">
          <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-1">Posterior (Back)</span>
          <svg width={dim * 0.45} height={dim} viewBox="0 0 100 220" className="drop-shadow-md">
            {/* Head */}
            <circle cx="50" cy="18" r="12" fill="#475569" opacity="0.6" />

            {/* Upper Back / Traps / Lats */}
            <path
              d="M32 40 L68 40 L60 88 L40 88 Z"
              fill={getColor('Back')}
              opacity={getOpacity('Back')}
              className="transition-colors duration-300"
            />

            {/* Triceps */}
            <path
              d="M20 58 Q15 72 20 86 Q25 72 22 58 Z"
              fill={getColor('Triceps')}
              opacity={getOpacity('Triceps')}
              className="transition-colors duration-300"
            />
            <path
              d="M80 58 Q85 72 80 86 Q75 72 78 58 Z"
              fill={getColor('Triceps')}
              opacity={getOpacity('Triceps')}
              className="transition-colors duration-300"
            />

            {/* Glutes */}
            <path
              d="M35 94 Q50 94 50 115 Q35 118 33 98 Z"
              fill={getColor('Glutes')}
              opacity={getOpacity('Glutes')}
              className="transition-colors duration-300"
            />
            <path
              d="M65 94 Q50 94 50 115 Q65 118 67 98 Z"
              fill={getColor('Glutes')}
              opacity={getOpacity('Glutes')}
              className="transition-colors duration-300"
            />

            {/* Hamstrings */}
            <path
              d="M34 118 Q32 145 36 160 Q46 160 48 118 Z"
              fill={getColor('Hamstrings')}
              opacity={getOpacity('Hamstrings')}
              className="transition-colors duration-300"
            />
            <path
              d="M66 118 Q68 145 64 160 Q54 160 52 118 Z"
              fill={getColor('Hamstrings')}
              opacity={getOpacity('Hamstrings')}
              className="transition-colors duration-300"
            />

            {/* Calves (Posterior) */}
            <path
              d="M34 165 Q30 180 38 205 L44 205 Q46 180 43 165 Z"
              fill={getColor('Calves')}
              opacity={getOpacity('Calves')}
              className="transition-colors duration-300"
            />
            <path
              d="M66 165 Q70 180 62 205 L56 205 Q54 180 57 165 Z"
              fill={getColor('Calves')}
              opacity={getOpacity('Calves')}
              className="transition-colors duration-300"
            />
          </svg>
        </div>
      </div>

      {/* Target Legends */}
      <div className="flex items-center gap-4 mt-3 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
          <span className="text-slate-300 font-medium">Primary: {activeMuscles.join(', ') || 'None'}</span>
        </div>
        {secondaryMuscles.length > 0 && (
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-cyan-500 shadow-sm shadow-cyan-500/50" />
            <span className="text-slate-400">Secondary: {secondaryMuscles.join(', ')}</span>
          </div>
        )}
      </div>
    </div>
  );
};
