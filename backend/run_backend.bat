@echo off
echo ================================
echo Running CPU Scheduler Backend
echo ================================

g++ main.cpp algorithms/*.cpp -o scheduler.exe

if errorlevel 1 (
    echo Compilation failed!
    pause
    exit /b
)

scheduler.exe
pause
