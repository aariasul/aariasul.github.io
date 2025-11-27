
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

        // Hotkey Manager for Quick Picker
        private HotkeyManager? _hotkey;

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
            InitializeHotkey();

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
                    item.Click += async (s, e) => await UseSnippet(sn, source: "tray");
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

            var maintenance = new ToolStripMenuItem("Maintenance Mode");
            maintenance.Click += (s, e) =>
            {
                using var mf = new MaintenanceForm();
                mf.ShowDialog();
            };
            menu.Items.Add(maintenance);

            var exit = new ToolStripMenuItem("Exit");
            exit.Click += (s, e) =>
            {
                Logger.Log(new UsageEvent { Event = "app_exit" });
                Application.Exit();
            };
            menu.Items.Add(exit);

            _notifyIcon.ContextMenuStrip = menu;
        }

        private void InitializeHotkey()
        {
            _hotkey = new HotkeyManager();
            _hotkey.Triggered += () =>
            {
                try
                {
                    using var qp = new QuickPickerForm(_snippets);
                    qp.ShowDialog();
                }
                catch { /* swallow exceptions */ }
            };
        }

        private async System.Threading.Tasks.Task UseSnippet(Snippet sn, string source)
        {
            try { _notifyIcon.ContextMenuStrip?.Close(); } catch { }

            RestoreFocus();
            await System.Threading.Tasks.Task.Delay(120);

            ClipboardService.SetText(sn.Text);
            if (sn.AutoPaste)
                PasteService.SendCtrlV();

