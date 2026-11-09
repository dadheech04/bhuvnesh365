import React from 'react';

interface ActivityRingsProps {
  movePercent: number; // Gym/Cardio (0-100+)
  mindPercent: number; // Meditation/Breathing (0-100+)
  fuelPercent: number; // Protein/Nutrition (0-100+)
  size?: number;
}

export const ActivityRings: React.FC<ActivityRingsProps> = ({
  movePercent,
  mindPercent,
  fuelPercent,
  size = 180,
}) => {
  const strokeWidth = 14;
  const center = size / 2;

  // Radius for the 3 concentric rings
  const r1 = center - strokeWidth; // Move (outer)
  const r2 = r1 - strokeWidth - 4; // Mind (middle)
  const r3 = r2 - strokeWidth - 4; // Fuel (inner)

  const c1 = 2 * Math.PI * r1;
  const c2 = 2 * Math.PI * r2;
  const c3 = 2 * Math.PI * r3;

  const offset1 = c1 - (Math.min(100, movePercent) / 100) * c1;
  const offset2 = c2 - (Math.min(100, mindPercent) / 100) * c2;
  const offset3 = c3 - (Math.min(100, fuelPercent) / 100) * c3;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="rotate-[-90deg]">
        <defs>
          <linearGradient id="moveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#f43f5e" />
          </linearGradient>
          <linearGradient id="mindGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <linearGradient id="fuelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
        </defs>

        {/* Outer Background (Move) */}
        <circle
          cx={center}
          cy={center}
          r={r1}
          fill="none"
          stroke="#ef4444"
          strokeOpacity="0.18"
          strokeWidth={strokeWidth}
        />
        {/* Outer Active */}
        <circle
          cx={center}
          cy={center}
          r={r1}
          fill="none"
          stroke="url(#moveGrad)"
          strokeWidth={strokeWidth}
          strokeDasharray={c1}
          strokeDashoffset={offset1}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />

        {/* Middle Background (Mind) */}
        <circle
          cx={center}
          cy={center}
          r={r2}
          fill="none"
          stroke="#06b6d4"
          strokeOpacity="0.18"
          strokeWidth={strokeWidth}
        />
        {/* Middle Active */}
        <circle
          cx={center}
          cy={center}
          r={r2}
          fill="none"
          stroke="url(#mindGrad)"
          strokeWidth={strokeWidth}
          strokeDasharray={c2}
          strokeDashoffset={offset2}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />

        {/* Inner Background (Fuel) */}
        <circle
          cx={center}
          cy={center}
          r={r3}
          fill="none"
          stroke="#10b981"
          strokeOpacity="0.18"
          strokeWidth={strokeWidth}
        />
        {/* Inner Active */}
        <circle
          cx={center}
          cy={center}
          r={r3}
          fill="none"
          stroke="url(#fuelGrad)"
          strokeWidth={strokeWidth}
          strokeDasharray={c3}
          strokeDashoffset={offset3}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>

      {/* Center Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
        <span className="text-xs uppercase tracking-widest text-slate-400 font-medium">OS Sync</span>
        <span className="text-xl font-black text-white tracking-tight">
          {Math.round((movePercent + mindPercent + fuelPercent) / 3)}%
        </span>
      </div>
    </div>
  );
};
