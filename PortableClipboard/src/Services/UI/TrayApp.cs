
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
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

        // Windows API for focus restoration
        [DllImport("user32.dll")]
        private static extern IntPtr GetForegroundWindow();

        [DllImport("user32.dll")]
        private static extern bool SetForegroundWindow(IntPtr hWnd);

        private IntPtr _lastActiveWindow = IntPtr.Zero;

        private void StoreActiveWindow()
        {
            _lastActiveWindow = GetForegroundWindow();
        }

        private void RestoreFocus()
        {
            if (_lastActiveWindow != IntPtr.Zero)
            {
                SetForegroundWindow(_lastActiveWindow);
            }
        }

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
            // Store the active window before showing the tray menu
            StoreActiveWindow();

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

