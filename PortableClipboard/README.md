
# Portable Clipboard (v1.0)

Portable Windows clipboard manager (single `.exe`, no installation).

## Features
- Tray + Editor
- Plain text snippets
- Editable categories
- Auto-paste default + per-snippet Copy-only toggle
- Usage logging (with active app name), rotation (5MB, keep 3 files)
- Time saved counters (weekly + all-time) in Editor + Reset buttons
- Export Report (CSV) with custom time frame
- Open App Folder button
- Version in tray tooltip

## Build (requires .NET 8 SDK)
```bash
dotnet publish -c Release -r win-x64 --self-contained true /p:PublishSingleFile=true
