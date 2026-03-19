@echo off
echo Starting local HTTP server...

cd /d %~dp0

:: Try Python 3 first
python -m http.server 8000 >nul 2>&1
if %errorlevel%==0 goto end

:: Fallback to py launcher
py -m http.server 8000 >nul 2>&1
if %errorlevel%==0 goto end

echo.
echo Python is not installed or not in PATH.
echo Please install Python from https://www.python.org/downloads/
echo.
pause
exit

:end
echo Server running at:
echo http://localhost:8000
echo.
pause