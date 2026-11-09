@echo off
title BHUVNESH 365 – PERSONAL TRANSFORMATION OS
echo =====================================================================
echo   BHUVNESH 365 – PERSONAL TRANSFORMATION OPERATING SYSTEM
echo   BUILD YOUR BODY. MASTER YOUR MIND. UPGRADE YOUR LIFE.
echo =====================================================================
echo.
cd /d "%~dp0"
echo Starting Transformation OS Engine...
start "" "http://localhost:3000"
call npm.cmd run dev
pause
