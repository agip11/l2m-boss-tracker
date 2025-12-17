@echo off
REM Development server script for Windows
REM This script sets NODE_ENV properly for Windows

setlocal enabledelayedexpansion

cd /d "%~dp0"

echo Memulai L2M Tracker Development Server...
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo ERROR: node_modules tidak ditemukan
    echo Jalankan "npm install" terlebih dahulu!
    echo.
    pause
    exit /b 1
)

REM Check if app.db exists
if not exist "app.db" (
    echo Database belum dibuat, membuat sekarang...
    call node init-db.js
    if !errorlevel! neq 0 (
        echo ERROR: Gagal membuat database!
        pause
        exit /b 1
    )
    echo.
)

REM Start the development server
echo Menjalankan server di http://localhost:5000
echo.
set NODE_ENV=development
npx tsx server/index.ts

REM If the above fails, show error
if !errorlevel! neq 0 (
    echo.
    echo ERROR: Server gagal dimulai
    pause
    exit /b 1
)

pause
