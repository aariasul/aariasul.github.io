
# PortableClipboard (v1.0)

A portable Windows clipboard manager built with C# and WinForms.  
Runs as a single `.exe` file (no installation required) and provides quick access to frequently used text snippets.

---

## ✅ Features Implemented
- Tray icon + Editor window
- Plain text snippets
- Editable categories and snippets
- Default Auto-paste, with per-snippet toggle for Copy-only
- Usage logging (with app name), rotation (5MB)
- Time saved counters (weekly + all-time) + Reset buttons
- Export Report (CSV) with custom time frame
- Open App Folder button
- Version number in tray tooltip

---

## ✅ Quick Start for End Users
1. Download `PortableClipboard.exe` from GitHub Actions artifact.
2. Double-click to run (no installation required).
3. Tray icon appears:
   - Right-click for categories and snippets.
   - Open Editor to manage snippets, reset counters, export reports.

---

## ✅ Build Instructions (Local)
Requires **.NET 8 SDK** installed.
```bash
dotnet publish PortableClipboard/src/PortableClipboard.csproj -c Release -r win-x64 --self-contained true /p:PublishSingleFile=true
