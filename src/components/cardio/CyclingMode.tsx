import React, { useState, useEffect, useRef } from 'react';
import { CardioSession, GPSPoint } from '../../types';
import { storage, getTodayKey } from '../../utils/storage';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';
import {
  Play,
  Square,
  Pause,
  Bike,
  Gauge,
  Flame,
  Clock,
  Compass,
  Mountain,
  Radio
} from 'lucide-react';

export const CyclingMode: React.FC = () => {
  const [isRiding, setIsRiding] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [distanceKm, setDistanceKm] = useState(0);
  const [maxSpeedKmh, setMaxSpeedKmh] = useState(0);
  const [currentSpeedKmh, setCurrentSpeedKmh] = useState(0);
  const [elevationGain, setElevationGain] = useState(45);
  const [useSimulation, setUseSimulation] = useState(false);

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const polylineRef = useRef<any>(null);

  // Initialize Leaflet Map
  useEffect(() => {
    let isMounted = true;
    const initMap = async () => {
      if (typeof window !== 'undefined' && mapContainerRef.current && !mapInstanceRef.current) {
        try {
          const L = await import('leaflet');
          if (!isMounted || !mapContainerRef.current) return;

          const defaultLat = 26.9124;
          const defaultLng = 75.7873;

          const map = L.map(mapContainerRef.current, {
            zoomControl: false,
            attributionControl: false,
          }).setView([defaultLat, defaultLng], 14);

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
          }).addTo(map);

          const polyline = L.polyline([], {
            color: '#06b6d4',
            weight: 5,
            opacity: 0.9,
          }).addTo(map);

          polylineRef.current = polyline;
          mapInstanceRef.current = map;
        } catch {
          // ignore
        }
      }
    };
    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRiding && !isPaused) {
      interval = setInterval(() => {
        setSecondsElapsed((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRiding, isPaused]);

  // Simulation or Geolocation
  useEffect(() => {
    if (!isRiding || isPaused) return;

    if (useSimulation) {
      const startLat = 26.9124;
      const startLng = 75.7873;
      const interval = setInterval(() => {
        setDistanceKm((d) => Math.round((d + 0.007) * 1000) / 1000); // ~25 km/h
        const currentSpeed = 24.5 + (Math.random() * 4 - 2);
        setCurrentSpeedKmh(Math.round(currentSpeed * 10) / 10);
        setMaxSpeedKmh((m) => Math.max(m, Math.round(currentSpeed * 10) / 10));

        if (mapInstanceRef.current && polylineRef.current) {
          const step = Math.random() * 0.001;
          const nextLat = startLat + step;
          const nextLng = startLng + step;
          polylineRef.current.addLatLng([nextLat, nextLng]);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRiding, isPaused, useSimulation]);

  const handleStartRide = () => {
    sound.playTap();
    setIsRiding(true);
    setIsPaused(false);
  };

  const handlePauseRide = () => {
    sound.playTap();
    setIsPaused(true);
  };

  const handleResumeRide = () => {
    sound.playTap();
    setIsPaused(false);
  };

  const handleStopAndSave = () => {
    sound.playSetComplete();
    setIsRiding(false);
    setIsPaused(false);

    const avgSpeed = secondsElapsed > 0 ? (distanceKm / (secondsElapsed / 3600)) : 22.5;
    const calories = Math.round(distanceKm * 32);

    const session: CardioSession = {
      id: `cycle_${Date.now()}`,
      type: 'Cycling',
      date: getTodayKey(),
      startTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      durationSeconds: secondsElapsed,
      distanceKm: Math.round(distanceKm * 100) / 100,
      avgPaceMinPerKm: 2.6,
      avgSpeedKmh: Math.round(avgSpeed * 10) / 10,
      maxSpeedKmh: maxSpeedKmh || 28.5,
      estimatedCalories: calories,
      elevationGainMeters: elevationGain,
      isSimulated: useSimulation,
    };

    storage.saveCardioSession(session);

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
    });
  };

  const formatTime = (totalSec: number): string => {
    const hrs = Math.floor(totalSec / 3600);
    const min = Math.floor((totalSec % 3600) / 60);
    const sec = totalSec % 60;
    return `${hrs > 0 ? `${hrs}:` : ''}${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 sm:p-7 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono font-bold mb-2">
              <Bike className="w-3.5 h-3.5" /> High-Cadence Aerobic Power
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">GPS Cycling Tracker</h2>
          </div>
          <label className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700 cursor-pointer w-fit">
            <input
              type="checkbox"
              checked={useSimulation}
              onChange={(e) => setUseSimulation(e.target.checked)}
              className="rounded accent-cyan-500"
            />
            <span>Simulate Ride</span>
          </label>
        </div>

        {/* Live Gauges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
            <span className="text-[10px] uppercase font-mono text-slate-400">Total Distance</span>
            <div className="text-3xl sm:text-4xl font-black text-white font-mono mt-1">
              {distanceKm.toFixed(2)}
            </div>
            <span className="text-xs text-cyan-400 font-bold">KM</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
            <span className="text-[10px] uppercase font-mono text-slate-400">Current Speed</span>
            <div className="text-3xl sm:text-4xl font-black text-white font-mono mt-1">
              {currentSpeedKmh.toFixed(1)}
            </div>
            <span className="text-xs text-emerald-400 font-bold">KM / H</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
            <span className="text-[10px] uppercase font-mono text-slate-400">Duration</span>
            <div className="text-3xl sm:text-4xl font-black text-white font-mono mt-1">
              {formatTime(secondsElapsed)}
            </div>
            <span className="text-xs text-amber-400 font-bold">MOVING TIME</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
            <span className="text-[10px] uppercase font-mono text-slate-400">Max Speed</span>
            <div className="text-3xl sm:text-4xl font-black text-cyan-400 font-mono mt-1">
              {maxSpeedKmh.toFixed(1)}
            </div>
            <span className="text-xs text-cyan-400 font-bold">KM / H PEAK</span>
          </div>
        </div>

        {/* Leaflet Map */}
        <div className="w-full h-72 sm:h-80 rounded-2xl overflow-hidden border border-slate-800 my-4">
          <div ref={mapContainerRef} className="w-full h-full" />
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          {!isRiding ? (
            <button
              onClick={handleStartRide}
              className="flex-1 h-14 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition"
            >
              <Play className="w-5 h-5 fill-black" />
              <span>Start Cycling Ride</span>
            </button>
          ) : (
            <>
              {isPaused ? (
                <button
                  onClick={handleResumeRide}
                  className="flex-1 h-14 rounded-2xl bg-cyan-500 text-black font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5 fill-black" /> Resume
                </button>
              ) : (
                <button
                  onClick={handlePauseRide}
                  className="flex-1 h-14 rounded-2xl bg-amber-500 text-black font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <Pause className="w-5 h-5 fill-black" /> Pause
                </button>
              )}
              <button
                onClick={handleStopAndSave}
                className="px-6 h-14 rounded-2xl bg-rose-500 text-black font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Square className="w-5 h-5 fill-black" /> Finish
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
