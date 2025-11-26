
using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows.Forms;
using PortableClipboard.Services;

namespace PortableClipboard.UI
{
    public class TrayApp : IDisposable
    {
        private readonly NotifyIcon _notifyIcon = new NotifyIcon();
        private readonly string _versionText;

        private List<Snippet> _snippets = new();
        private AppSettings _settings = new();
        private AppState _state = new();

        public TrayApp(string versionText)
        {
            _versionText = versionText;
            _notifyIcon.Icon = System.Drawing.SystemIcons.Application;
            _notifyIcon.Text = _versionText;
            _notifyIcon.Visible = true;

            _snippets = StorageService.LoadSnippets();
            _settings = StorageService.LoadSettings();
            _state = StorageService.LoadState();
            CheckWeekRollover();

            BuildMenu();
            Logger.Log(new UsageEvent { Event = "app_start" });
        }

        private void BuildMenu()
        {
            var menu = new ContextMenuStrip();

            foreach (var cat in _snippets.Select(s => s.Category).Distinct().OrderBy(c => c))
            {
                var catItem = new ToolStripMenuItem(cat);
                foreach (var sn in _snippets.Where(s => s.Category == cat).OrderBy(s => s.Title))
                {
                    var item = new ToolStripMenuItem(sn.Title);
                    item.Click += (s, e) => UseSnippet(sn, source: "tray");
                    catItem.DropDownItems.Add(item);
                }
                menu.Items.Add(catItem);
            }

            menu.Items.Add(new ToolStripSeparator());
            var editor = new ToolStripMenuItem("Open Editor…");
            editor.Click += (s, e) =>
            {
                using var ed = new EditorForm(_snippets, _settings, _state,
                    onSave: SaveAll,
                    onRebuild: RebuildMenu,
                    onResetWeekly: ResetWeekly,
                    onResetAll: ResetAll,
                    openAppFolder: () => AppFolderService.OpenAppFolder());
                ed.ShowDialog();
            };
            menu.Items.Add(editor);

            var exit = new ToolStripMenuItem("Exit");
            exit.Click += (s, e) =>
            {
                Logger.Log(new UsageEvent { Event = "app_exit" });
                Application.Exit();
            };
            menu.Items.Add(exit);

            _notifyIcon.ContextMenuStrip = menu;
        }

        private void RebuildMenu() => BuildMenu();

        private void SaveAll()
        {
            StorageService.SaveSnippets(_snippets);
            StorageService.SaveSettings(_settings);
            StorageService.SaveState(_state);
        }

        private void UseSnippet(Snippet sn, string source)
        {
            ClipboardService.SetText(sn.Text);
            var appName = GetActiveAppName();
            var mode = sn.AutoPaste ? "autoPaste" : "copyOnly";

            if (sn.AutoPaste) PasteService.SendCtrlV();

            _state.WeeklyTimeSavedSeconds += _settings.AvgTypingSeconds;
            _state.AllTimeSavedSeconds += _settings.AvgTypingSeconds;
            StorageService.SaveState(_state);

            Logger.Log(new UsageEvent
            {
                Event = sn.AutoPaste ? "snippet_paste" : "snippet_copy",
                SnippetId = sn.Id,
                SnippetTitle = sn.Title,
                Category = sn.Category,
                Mode = mode,
                Source = source,
                App = appName
            });
        }

        private string GetActiveAppName()
        {
            try
            {
                var fg = GetForegroundProcessName();
                return string.IsNullOrWhiteSpace(fg) ? "unknown" : fg;
            }
            catch { return "unknown"; }
        }

        [System.Runtime.InteropServices.DllImport("user32.dll")]
        private static extern IntPtr GetForegroundWindow();
        [System.Runtime.InteropServices.DllImport("user32.dll")]
        private static extern int GetWindowThreadProcessId(IntPtr hWnd, out int lpdwProcessId);

        private static string GetForegroundProcessName()
        {
            IntPtr hwnd = GetForegroundWindow();
            if (hwnd == IntPtr.Zero) return "";
            GetWindowThreadProcessId(hwnd, out int pid);
            try
            {
                var p = System.Diagnostics.Process.GetProcessById(pid);
                return p.ProcessName;
            }
            catch { return ""; }
        }

        private void CheckWeekRollover()
        {
            int currentWeek = WeekUtil.GetIsoWeekOfYear(DateTime.Now);
            if (currentWeek != _state.LastWeekNumber)
            {
                _state.WeeklyTimeSavedSeconds = 0;
                _state.WeeklyResetAt = DateTime.Now;
                _state.LastWeekNumber = currentWeek;
                StorageService.SaveState(_state);
            }
        }

        private void ResetWeekly()
        {
            _state.WeeklyTimeSavedSeconds = 0;
            _state.WeeklyResetAt = DateTime.Now;
            StorageService.SaveState(_state);
        }

        private void ResetAll()
        {
            _state.AllTimeSavedSeconds = 0;
            _state.AllTimeResetAt = DateTime.Now;
            StorageService.SaveState(_state);
        }

        public void Dispose()
        {
            _notifyIcon.Visible = false;
            _notifyIcon.Dispose();
        }
    }
}
