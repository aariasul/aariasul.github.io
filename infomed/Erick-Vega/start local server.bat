@echo off
REM === Iniciar servidor local y detenerlo al cerrar Chrome ===

cd /d "%~dp0"

REM Iniciar el servidor en segundo plano (minimizado)
start "" /min cmd /c "python -m http.server 5500"

REM Abrir Chrome y esperar a que lo cierres
start /wait "" chrome.exe "http://localhost:5500/"

REM Al cerrar Chrome, detener el servidor de Python
taskkill /IM python.exe /F >nul 2>&1
exit