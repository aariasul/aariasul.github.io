
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
        private readonly IntPtr _lastActiveWindow;

        [DllImport("user32.dll")] static extern IntPtr GetForegroundWindow();

        public QuickPickerForm(System.Collections.Generic.List<Snippet> snippets)
        {
            // Capture the window that was active before opening Quick Picker
            _lastActiveWindow = GetForegroundWindow();

            Text = "Quick Paste";
            TopMost = true;
            Width = 420; Height = 360;
            FormBorderStyle = FormBorderStyle.SizableToolWindow;
            StartPosition = FormStartPosition.CenterScreen;

            _search.Dock = DockStyle.Top;
            _list.Dock = DockStyle.Fill;

            Controls.Add(_list);
            Controls.Add(_search);

            // Load snippets into list
            _list.DataSource = snippets.OrderBy(s => s.Category).ThenBy(s => s.Title).ToList();
            _list.DisplayMember = "Title";

            // Filter snippets on search
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

            // Double-click or Enter to paste
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

            // Close picker first to release focus
            Hide();

            // Restore focus to previously active window
            FocusUtil.RestoreFocus(_lastActiveWindow);

            // Small delay so Windows settles focus
            await Task.Delay(120);

            // Copy text and paste
            ClipboardService.SetText(sn.Text);
            if (sn.AutoPaste)
                PasteService.SendCtrlV();

            Close();
        }
    }

    internal static class FocusUtil
    {
        [DllImport("user32.dll")] static extern bool SetForegroundWindow(IntPtr hWnd);
        public static void RestoreFocus(IntPtr hwnd)
        {
            if (hwnd != IntPtr.Zero) SetForegroundWindow(hwnd);
        }
    }
}
