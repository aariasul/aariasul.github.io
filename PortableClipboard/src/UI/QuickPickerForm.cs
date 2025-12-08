
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Runtime.InteropServices;
using PortableClipboard.Services;

namespace PortableClipboard.UI
{
    public class QuickPickerForm : Form
    {
        private readonly TextBox _search = new TextBox();
        private readonly ListBox _list = new ListBox();
        private readonly IntPtr _targetHwnd; // hwnd captured BEFORE picker was created

        public QuickPickerForm(System.Collections.Generic.List<Snippet> snippets, IntPtr targetHwnd)
        {
            _targetHwnd = targetHwnd;

            Text = "Quick Paste";
            TopMost = true;
            Width = 420; Height = 360;
            FormBorderStyle = FormBorderStyle.SizableToolWindow;
            StartPosition = FormStartPosition.CenterScreen;
            ShowInTaskbar = false;

            _search.Dock = DockStyle.Top;
            _list.Dock = DockStyle.Fill;

            Controls.Add(_list);
            Controls.Add(_search);

            _list.DataSource = snippets.OrderBy(s => s.Category).ThenBy(s => s.Title).ToList();
            _list.DisplayMember = "Title";

            _search.TextChanged += (s, e) =>
            {
                var q = _search.Text.Trim().ToLowerInvariant();
                if (string.IsNullOrEmpty(q))
                    _list.DataSource = snippets.OrderBy(s => s.Category).ThenBy(s => s.Title).ToList();
                else
                    _list.DataSource = snippets
                        .Where(x => x.Title.ToLowerInvariant().Contains(q) || x.Text.ToLowerInvariant().Contains(q))
                        .OrderBy(s => s.Category).ThenBy(s => s.Title).ToList();
            };

            _list.DoubleClick += async (s, e) => await PasteSelected();
            KeyPreview = true;
            KeyDown += async (s, e) =>
            {
                if (e.KeyCode == Keys.Enter) { e.Handled = true; await PasteSelected(); }
                if (e.KeyCode == Keys.Escape) Close();
            };
        }

        private async Task PasteSelected()
        {
            if (_list.SelectedItem is not Snippet sn) return;

            // 1) Hide picker so it doesn’t keep focus
            Hide();

            // 2) Put text on clipboard first (needed for WM_PASTE and Ctrl+V)
            ClipboardService.SetText(sn.Text);

            // 3) Try the reliable foreground path (ALT nudge + restore + delay + Ctrl+V)
            PasteService.SendAltNudge();
            FocusUtil.TryRestoreFocus(_targetHwnd);
            await Task.Delay(150);

            if (sn.AutoPaste)
            {
                // First attempt: Ctrl+V to the restored window
                PasteService.SendCtrlV();

                // Optional tiny delay then fallback: WM_PASTE directly to EDIT child
                await Task.Delay(80);
                PasteService.TryDirectPasteToEdit(_targetHwnd);
            }

            Close();
        }
    }

    internal static class FocusUtil
    {
        [DllImport("user32.dll")] static extern bool SetForegroundWindow(IntPtr hWnd);
        [DllImport("user32.dll")] static extern bool BringWindowToTop(IntPtr hWnd);
        [DllImport("user32.dll")] static extern bool SetFocus(IntPtr hWnd);
        [DllImport("user32.dll")] static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
        const int SW_SHOW = 5;

        public static void TryRestoreFocus(IntPtr hwnd)
        {
            if (hwnd == IntPtr.Zero) return;
            try
            {
                ShowWindow(hwnd, SW_SHOW);
                BringWindowToTop(hwnd);
                SetForegroundWindow(hwnd);
                SetFocus(hwnd);
            }
            catch { /* ignore */ }
        }
    }
}
