import { jsPDF } from 'jspdf';
import { MonthlyTransformationReport } from '../types';

export function exportMonthlyReportPDF(report: MonthlyTransformationReport): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const primaryColor = [16, 185, 129]; // emerald-500
  const darkColor = [15, 23, 42];      // slate-900
  const grayColor = [100, 116, 139];   // slate-500

  // Header Banner
  doc.setFillColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.rect(0, 0, 210, 42, 'F');

  // Title & Tagline
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('BHUVNESH 365 – PERSONAL TRANSFORMATION OS', 14, 18);

  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('BUILD YOUR BODY. MASTER YOUR MIND. UPGRADE YOUR LIFE.', 14, 26);

  doc.setTextColor(200, 200, 200);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`Monthly Executive Transformation Audit: ${report.monthYear} | Issued: ${report.generatedAt}`, 14, 34);

  // Transformation Score Badge
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.roundedRect(160, 8, 36, 26, 3, 3, 'F');
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(`${report.transformationScore}`, 178, 20, { align: 'center' });
  doc.setFontSize(8);
  doc.text('OS SCORE', 178, 28, { align: 'center' });

  let y = 52;

  // Section 1: User Profile & Body Composition
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('1. ATHLETE PROFILE & BIOMETRIC PROGRESS', 14, y);
  y += 7;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(50, 50, 50);
  doc.text(`Athlete: Bhuvnesh Dadheech | Height: 180 cm | Diet: Strict Vegetarian (100% No Meat, No Fish, No Eggs)`, 14, y);
  y += 5;
  doc.text(`Starting Weight: ${report.startingWeightKg} kg  →  Current Weight: ${report.currentWeightKg} kg  |  Waist: ${report.waistCm} cm (Target: 80 cm)`, 14, y);
  y += 10;

  // Section 2: Gym Performance & Progressive Overload
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.text('2. INTELLIGENT GYM PERFORMANCE & VOLUME', 14, y);
  y += 7;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`• Workouts Completed: ${report.gymStats.totalWorkouts} sessions (${report.gymStats.consistencyPercent}% split compliance)`, 14, y);
  y += 5;
  doc.text(`• Total Volume Lifted: ${report.gymStats.totalVolumeKg.toLocaleString()} kg | Total Sets: ${report.gymStats.totalSets} | Total Reps: ${report.gymStats.totalReps}`, 14, y);
  y += 5;
  doc.text(`• Top Progressive Overload Lift: ${report.gymStats.topProgressedLift}`, 14, y);
  y += 10;

  // Section 3: Cardio, Running, Swimming, Cycling
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('3. CARDIO, RUNNING, SWIMMING & CYCLING METRICS', 14, y);
  y += 7;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`• Outdoor GPS Running: ${report.runningStats.totalKm} km across ${report.runningStats.totalRuns} runs (Avg Pace: ${report.runningStats.avgPaceMinKm} min/km, Longest: ${report.runningStats.longestKm} km)`, 14, y);
  y += 5;
  doc.text(`• Swimming: ${report.swimmingStats.totalMeters.toLocaleString()} meters across ${report.swimmingStats.totalSessions} sessions (Pace: ${report.swimmingStats.avgPace100m})`, 14, y);
  y += 5;
  doc.text(`• GPS Cycling: ${report.cyclingStats.totalKm} km (Avg Speed: ${report.cyclingStats.avgSpeedKmh} km/h across ${report.cyclingStats.totalSessions} rides)`, 14, y);
  y += 10;

  // Section 4: Mind, Meditation & Japa
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('4. MEDITATION, BREATHWORK & 108 MANTRA JAPA', 14, y);
  y += 7;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`• Total Stillness Time: ${report.meditationStats.totalMinutes} minutes across ${report.meditationStats.totalSessions} sessions (${report.meditationStats.consistencyPercent}% consistency)`, 14, y);
  y += 5;
  doc.text(`• Sacred Japa Repetitions: ${report.meditationStats.totalMantraReps.toLocaleString()} beads (Gayatri & Mahamrityunjaya Mantras)`, 14, y);
  y += 10;

  // Section 5: Strict Vegetarian Nutrition & Recovery
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('5. STRICT VEGETARIAN NUTRITION & RECOVERY', 14, y);
  y += 7;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`• Avg Daily Protein: ${report.nutritionStats.avgDailyProteinG} g/day (Target: 130g, Compliance: ${report.nutritionStats.proteinCompliancePercent}%)`, 14, y);
  y += 5;
  doc.text(`• Daily Water Hydration: ${report.nutritionStats.avgDailyWaterLiters} L/day | Avg Sleep: ${report.recoveryStats.avgSleepHours} hrs/night (Energy: ${report.recoveryStats.avgEnergyRating}/10)`, 14, y);
  y += 10;

  // Section 6: AI Performance Coach Summary
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('6. AI COACH ANALYSIS & STRATEGIC ASSESSMENT', 14, y);
  y += 7;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  const splitCoach = doc.splitTextToSize(report.coachSummary, 180);
  doc.text(splitCoach, 14, y);
  y += splitCoach.length * 4.5 + 4;

  // Section 7: Next Month Action Targets
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('7. PRESCRIPTIVE TARGETS FOR NEXT MONTH', 14, y);
  y += 7;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  report.nextMonthTargets.forEach((target) => {
    doc.text(`✓ ${target}`, 14, y);
    y += 5;
  });

  // Footer
  doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
  doc.setFontSize(8);
  doc.text('Confidential & Dedicated to Bhuvnesh Dadheech | BHUVNESH 365 – PERSONAL TRANSFORMATION OS', 105, 288, { align: 'center' });

  // Save the PDF
  doc.save(`BHUVNESH_365_Transformation_Report_${report.monthYear.replace(' ', '_')}.pdf`);
}
