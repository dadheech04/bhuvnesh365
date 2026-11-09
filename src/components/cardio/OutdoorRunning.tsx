import React, { useState, useEffect, useRef } from 'react';
import { CardioSession, GPSPoint } from '../../types';
import { storage, getTodayKey } from '../../utils/storage';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';
import {
  Play,
  Square,
  Pause,
  MapPin,
  Flame,
  Clock,
  Compass,
  Trophy,
  AlertCircle,
  Sparkles,
  Radio
} from 'lucide-react';

export const OutdoorRunning: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [gpsPoints, setGpsPoints] = useState<GPSPoint[]>([]);
  const [currentSpeedKmh, setCurrentSpeedKmh] = useState(0);
  const [distanceKm, setDistanceKm] = useState(0);
  const [gpsStatus, setGpsStatus] = useState<'idle' | 'searching' | 'locked' | 'denied' | 'simulated'>('idle');
  const [useSimulation, setUseSimulation] = useState(false);

  const watchIdRef = useRef<number | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const polylineRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markerRef = useRef<any>(null);

  // Calculate Distance between two lat/lng in KM (Haversine formula)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Initialize Leaflet Map
  useEffect(() => {
    let isMounted = true;
    const initMap = async () => {
      if (typeof window !== 'undefined' && mapContainerRef.current && !mapInstanceRef.current) {
        try {
          const L = await import('leaflet');
          if (!isMounted || !mapContainerRef.current) return;

          // Default initial center (India coordinates)
          const defaultLat = 26.9124;
          const defaultLng = 75.7873;

          const map = L.map(mapContainerRef.current, {
            zoomControl: false,
            attributionControl: false,
          }).setView([defaultLat, defaultLng], 15);

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
          }).addTo(map);

          const polyline = L.polyline([], {
            color: '#10b981',
            weight: 5,
            opacity: 0.9,
            smoothFactor: 1,
          }).addTo(map);

          polylineRef.current = polyline;
          mapInstanceRef.current = map;
        } catch {
          // Leaflet load error
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

  // Duration Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        setSecondsElapsed((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isPaused]);

  // GPS Tracking or Simulation Engine
  useEffect(() => {
    if (!isRunning || isPaused) {
      if (watchIdRef.current !== null && 'geolocation' in navigator) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
      return;
    }

    if (useSimulation) {
      setGpsStatus('simulated');
      // Simulate GPS runner at ~10.5 km/h
      const startLat = 26.9124;
      const startLng = 75.7873;
      const simInterval = setInterval(() => {
        setGpsPoints((prev) => {
          const step = (prev.length + 1) * 0.00015;
          const newPt: GPSPoint = {
            latitude: startLat + Math.sin(step) * 0.003 + step * 0.2,
            longitude: startLng + Math.cos(step) * 0.003 + step * 0.2,
            timestamp: Date.now(),
            speed: 2.9, // m/s = ~10.4 km/h
          };
          if (prev.length > 0) {
            const last = prev[prev.length - 1];
            const addedKm = calculateDistance(last.latitude, last.longitude, newPt.latitude, newPt.longitude);
            setDistanceKm((d) => Math.round((d + addedKm) * 1000) / 1000);
          }
          setCurrentSpeedKmh(10.4);

          // Update Leaflet map view & polyline
          if (mapInstanceRef.current && polylineRef.current) {
            polylineRef.current.addLatLng([newPt.latitude, newPt.longitude]);
            mapInstanceRef.current.panTo([newPt.latitude, newPt.longitude]);
          }

          return [...prev, newPt];
        });
      }, 1500);

      return () => clearInterval(simInterval);
    } else {
      // Real Geolocation
      if (!('geolocation' in navigator)) {
        setGpsStatus('denied');
        return;
      }

      setGpsStatus('searching');
      watchIdRef.current = navigator.geolocation.watchPosition(
        (pos) => {
          setGpsStatus('locked');
          const newPt: GPSPoint = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            altitude: pos.coords.altitude || undefined,
            speed: pos.coords.speed || undefined,
            timestamp: pos.timestamp,
          };

          setGpsPoints((prev) => {
            if (prev.length > 0) {
              const last = prev[prev.length - 1];
              const addedKm = calculateDistance(last.latitude, last.longitude, newPt.latitude, newPt.longitude);
              if (addedKm > 0.002) {
                // Filter GPS drift noise
                setDistanceKm((d) => Math.round((d + addedKm) * 1000) / 1000);
              }
            }
            if (pos.coords.speed) {
              setCurrentSpeedKmh(Math.round(pos.coords.speed * 3.6 * 10) / 10);
            }

            if (mapInstanceRef.current && polylineRef.current) {
              polylineRef.current.addLatLng([newPt.latitude, newPt.longitude]);
              mapInstanceRef.current.panTo([newPt.latitude, newPt.longitude]);
            }

            return [...prev, newPt];
          });
        },
        () => {
          setGpsStatus('denied');
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 1000,
        }
      );

      return () => {
        if (watchIdRef.current !== null) {
          navigator.geolocation.clearWatch(watchIdRef.current);
          watchIdRef.current = null;
        }
      };
    }
  }, [isRunning, isPaused, useSimulation]);

  const handleStartRunning = () => {
    sound.playTap();
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePauseRunning = () => {
    sound.playTap();
    setIsPaused(true);
  };

  const handleResumeRunning = () => {
    sound.playTap();
    setIsPaused(false);
  };

  const handleStopAndSave = () => {
    sound.playSetComplete();
    setIsRunning(false);
    setIsPaused(false);

    const paceMinPerKm = distanceKm > 0.05 ? secondsElapsed / 60 / distanceKm : 5.3;
    const avgSpeed = secondsElapsed > 0 ? (distanceKm / (secondsElapsed / 3600)) : 0;
    const calories = Math.round(distanceKm * 76 * 1.036); // standard caloric estimate for 76kg runner

    const session: CardioSession = {
      id: `run_${Date.now()}`,
      type: 'Running',
      date: getTodayKey(),
      startTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      durationSeconds: secondsElapsed,
      distanceKm: Math.round(distanceKm * 100) / 100,
      avgPaceMinPerKm: Math.round(paceMinPerKm * 100) / 100,
      avgSpeedKmh: Math.round(avgSpeed * 10) / 10,
      estimatedCalories: calories,
      gpsRoute: gpsPoints,
      isSimulated: useSimulation,
    };

    storage.saveCardioSession(session);

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
    });
  };

  const formatPace = (sec: number, km: number): string => {
    if (km < 0.05) return "--:--";
    const paceTotalSec = sec / km;
    const min = Math.floor(paceTotalSec / 60);
    const s = Math.floor(paceTotalSec % 60);
    return `${min}:${s.toString().padStart(2, '0')} /km`;
  };

  const formatTime = (totalSec: number): string => {
    const hrs = Math.floor(totalSec / 3600);
    const min = Math.floor((totalSec % 3600) / 60);
    const sec = totalSec % 60;
    if (hrs > 0) {
      return `${hrs}:${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    }
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Top Runner HUD */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900/90 border border-slate-800 p-5 sm:p-7 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                GPS Cardio Mode
              </span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded flex items-center gap-1 ${
                  gpsStatus === 'locked'
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    : gpsStatus === 'simulated'
                    ? 'bg-cyan-950 text-cyan-400 border border-cyan-800'
                    : 'bg-amber-950 text-amber-400 border border-amber-800'
                }`}
              >
                <Radio className="w-3 h-3 animate-pulse" />
                {gpsStatus === 'locked'
                  ? 'GPS Locked'
                  : gpsStatus === 'simulated'
                  ? 'Simulation Mode'
                  : gpsStatus === 'searching'
                  ? 'Acquiring Satellites...'
                  : gpsStatus === 'denied'
                  ? 'Location Blocked'
                  : 'GPS Ready'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
              Outdoor Running Tracker
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <label className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={useSimulation}
                onChange={(e) => setUseSimulation(e.target.checked)}
                className="rounded accent-emerald-500"
              />
              <span>Desk Test Simulator</span>
            </label>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Distance</span>
            <div className="text-3xl sm:text-4xl font-black text-white font-mono mt-1">
              {distanceKm.toFixed(2)}
            </div>
            <span className="text-xs text-emerald-400 font-bold">KILOMETERS</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Duration</span>
            <div className="text-3xl sm:text-4xl font-black text-white font-mono mt-1">
              {formatTime(secondsElapsed)}
            </div>
            <span className="text-xs text-cyan-400 font-bold">HH:MM:SS</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Avg Pace</span>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-1">
              {formatPace(secondsElapsed, distanceKm)}
            </div>
            <span className="text-xs text-amber-400 font-bold">MIN / KM</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Est. Calories</span>
            <div className="text-3xl sm:text-4xl font-black text-rose-400 font-mono mt-1">
              {Math.round(distanceKm * 76 * 1.036)}
            </div>
            <span className="text-xs text-rose-400 font-bold">KCAL BURNED</span>
          </div>
        </div>

        {/* Live OpenStreetMap Leaflet Container */}
        <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden border border-slate-800 shadow-inner my-4">
          <div ref={mapContainerRef} className="w-full h-full z-10" />

          {/* Map Overlay Badge */}
          <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700 text-[10px] font-mono text-slate-300">
            OpenStreetMap Live
          </div>

          {gpsStatus === 'denied' && (
            <div className="absolute inset-0 z-30 bg-black/80 flex flex-col items-center justify-center p-6 text-center">
              <AlertCircle className="w-10 h-10 text-rose-400 mb-2" />
              <p className="text-sm font-bold text-white">Location Access Denied or Unavailable</p>
              <p className="text-xs text-slate-400 max-w-sm mt-1">
                Please grant browser location permissions for real GPS tracking, or check &quot;Desk Test Simulator&quot; to test.
              </p>
            </div>
          )}
        </div>

        {/* Primary Controls */}
        <div className="flex items-center gap-3 mt-4">
          {!isRunning ? (
            <button
              onClick={handleStartRunning}
              className="flex-1 h-14 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-black text-sm uppercase tracking-wider shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 active:scale-98 transition"
            >
              <Play className="w-5 h-5 fill-black" />
              <span>Start Outdoor Run</span>
            </button>
          ) : (
            <>
              {isPaused ? (
                <button
                  onClick={handleResumeRunning}
                  className="flex-1 h-14 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition"
                >
                  <Play className="w-5 h-5 fill-black" />
                  <span>Resume Run</span>
                </button>
              ) : (
                <button
                  onClick={handlePauseRunning}
                  className="flex-1 h-14 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition"
                >
                  <Pause className="w-5 h-5 fill-black" />
                  <span>Pause Run</span>
                </button>
              )}

              <button
                onClick={handleStopAndSave}
                className="px-6 h-14 rounded-2xl bg-rose-500 hover:bg-rose-400 text-black font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition"
              >
                <Square className="w-5 h-5 fill-black" />
                <span>Save Run</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Beginner to 10K Progressive Running Plans */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 sm:p-6">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
          <Trophy className="w-4 h-4 text-emerald-400" /> Progressive Distance Ladders
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {[
            { target: '1 KM', label: 'Aerobic Ignite', targetPace: '6:30 /km', status: 'Completed' },
            { target: '3 KM', label: 'Rhythm Builder', targetPace: '6:00 /km', status: 'Mastered' },
            { target: '5 KM', label: 'Endurance Base', targetPace: '5:30 /km', status: 'In Progress' },
            { target: '10 KM', label: 'Transformation Elite', targetPace: '5:15 /km', status: 'Locked' },
          ].map((milestone) => (
            <div
              key={milestone.target}
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">{milestone.target}</span>
                <p className="text-sm font-bold text-white mt-0.5">{milestone.label}</p>
                <p className="text-xs text-slate-400 font-mono mt-1">Goal: {milestone.targetPace}</p>
              </div>
              <span className="mt-3 text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 w-fit">
                {milestone.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
