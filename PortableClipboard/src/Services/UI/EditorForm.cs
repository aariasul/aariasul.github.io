
using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows.Forms;
using PortableClipboard.Services;

namespace PortableClipboard.UI
{
    public class EditorForm : Form
    {
        private readonly List<Snippet> _snippets;
        private readonly AppSettings _settings;
        private readonly AppState _state;
        private readonly Action _onSave;
        private readonly Action _onRebuild;
        private readonly Action _resetWeekly;
        private readonly Action _resetAll;
        private readonly Action _openAppFolder;

        private ListBox _list = new ListBox();
        private TextBox _title = new TextBox();
        private TextBox _text = new TextBox { Multiline = true, ScrollBars = ScrollBars.Vertical };
        private TextBox _category = new TextBox();
        private CheckBox _autoPaste = new CheckBox { Text = "Auto-paste" };
        private Button _add = new Button { Text = "Add" };
        private Button _delete = new Button { Text = "Delete" };
        private Button _saveBtn = new Button { Text = "Save Changes" };
        private Label _status = new Label { AutoSize = true };
        private NumericUpDown _avgTyping = new NumericUpDown { Minimum = 1, Maximum = 120, Value = 15 };
        private Button _resetWeeklyBtn = new Button { Text = "Reset Weekly Counter" };
        private Button _resetAllBtn = new Button { Text = "Reset All-time Counter" };
        private Button _openFolderBtn = new Button { Text = "Open App Folder" };
        private Button _exportReportBtn = new Button { Text = "Export Report (CSV)" };

        public EditorForm(List<Snippet> snippets, AppSettings settings, AppState state,
            Action onSave, Action onRebuild, Action onResetWeekly, Action onResetAll, Action openAppFolder)
        {
            _snippets = snippets;
            _settings = settings;
            _state = state;
            _onSave = onSave;
            _onRebuild = onRebuild;
            _resetWeekly = onResetWeekly;
            _resetAll = onResetAll;
            _openAppFolder = openAppFolder;

            Text = "Portable Clipboard – Editor";
            Width = 900; Height = 560;

            _list.Dock = DockStyle.Left; _list.Width = 280;
            _list.SelectedIndexChanged += OnSelect;

            var panel = new Panel { Dock = DockStyle.Fill, Padding = new Padding(8) };
            var layout = new TableLayoutPanel { Dock = DockStyle.Fill, ColumnCount = 2, RowCount = 10 };
            layout.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 28));
            layout.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 72));

            layout.Controls.Add(new Label { Text = "Title" }, 0, 0);
            layout.Controls.Add(_title, 1, 0);
            layout.Controls.Add(new Label { Text = "Text (plain)" }, 0, 1);
            layout.Controls.Add(_text, 1, 1);
            layout.Controls.Add(new Label { Text = "Category" }, 0, 2);
            layout.Controls.Add(_category, 1, 2);
            layout.Controls.Add(_autoPaste, 1, 3);
            layout.Controls.Add(_add, 0, 4);
            layout.Controls.Add(_delete, 1, 4);
            layout.Controls.Add(_saveBtn, 1, 5);

            layout.Controls.Add(new Label { Text = "Avg typing time (seconds)" }, 0, 6);
            layout.Controls.Add(_avgTyping, 1, 6);

            layout.Controls.Add(_resetWeeklyBtn, 0, 7);
            layout.Controls.Add(_resetAllBtn, 1, 7);

            layout.Controls.Add(_openFolderBtn, 0, 8);
            layout.Controls.Add(_exportReportBtn, 1, 8);

            layout.Controls.Add(_status, 1, 9);

            panel.Controls.Add(layout);
            Controls.Add(panel);
            Controls.Add(_list);

            _avgTyping.Value = _settings.AvgTypingSeconds;

            _add.Click += (s, e) =>
            {
                var sn = new Snippet { Title = "New Snippet", Text = "", Category = "Category01", AutoPaste = _settings.DefaultAutoPaste };
                _snippets.Add(sn);
                RefreshList();
                _list.SelectedItem = sn;
            };
            _delete.Click += (s, e) =>
            {
                if (_list.SelectedItem is Snippet sn)
                {
                    _snippets.Remove(sn);
                    RefreshList();
                }
            };
            _saveBtn.Click += (s, e) =>
            {
                if (_list.SelectedItem is Snippet sn)
                {
                    sn.Title = _title.Text;
                    sn.Text = _text.Text;
                    sn.Category = _category.Text;
                    sn.AutoPaste = _autoPaste.Checked;
                }
                _settings.AvgTypingSeconds = (int)_avgTyping.Value;
                _onSave();
                _onRebuild();
                UpdateStatus();
            };

            _resetWeeklyBtn.Click += (s, e) => { _resetWeekly(); UpdateStatus(); };
            _resetAllBtn.Click += (s, e) => { _resetAll(); UpdateStatus(); };

            _openFolderBtn.Click += (s, e) => _openAppFolder();

            _exportReportBtn.Click += (s, e) =>
            {
                using var dlg = new ReportExporterDialog(_snippets);
                dlg.ShowDialog();
            };

            RefreshList();
            UpdateStatus();
        }

        private void RefreshList()
        {
            _list.DataSource = null;
            _list.DataSource = _snippets.OrderBy(s => s.Category).ThenBy(s => s.Title).ToList();
            _list.DisplayMember = "Title";
        }

        private void OnSelect(object sender, EventArgs e)
        {
            if (_list.SelectedItem is Snippet sn)
            {
                _title.Text = sn.Title;
                _text.Text = sn.Text;
                _category.Text = sn.Category;
                _autoPaste.Checked = sn.AutoPaste;
            }
        }

        private void UpdateStatus()
        {
            _status.Text = $"Time saved (wk): {FormatDuration(_state.WeeklyTimeSavedSeconds)} • Total: {FormatDuration(_state.AllTimeSavedSeconds)}";
        }

        private static string FormatDuration(int seconds)
        {
            var t = TimeSpan.FromSeconds(seconds);
            if (t.TotalHours >= 1) return $"{(int)t.TotalHours}h {t.Minutes}m";
            if (t.TotalMinutes >= 1) return $"{(int)t.TotalMinutes}m {t.Seconds}s";
            return $"{t.Seconds}s";
        }
    }

    public class ReportExporterDialog : Form
    {
        private DateTimePicker _start = new DateTimePicker { Format = DateTimePickerFormat.Short };
        private DateTimePicker _end = new DateTimePicker { Format = DateTimePickerFormat.Short };
        private Button _export = new Button { Text = "Export CSV" };
        private Button _cancel = new Button { Text = "Cancel" };
        private readonly List<Snippet> _snippets;

        public ReportExporterDialog(List<Snippet> snippets)
        {
            _snippets = snippets;

            Text = "Export Report";
            Width = 400; Height = 180;

            var layout = new TableLayoutPanel { Dock = DockStyle.Fill, ColumnCount = 2, RowCount = 3, Padding = new Padding(8) };
            layout.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 40));
            layout.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 60));

            layout.Controls.Add(new Label { Text = "Start Date" }, 0, 0);
            layout.Controls.Add(_start, 1, 0);
            layout.Controls.Add(new Label { Text = "End Date" }, 0, 1);
            layout.Controls.Add(_end, 1, 1);

            var buttons = new FlowLayoutPanel { FlowDirection = FlowDirection.RightToLeft, Dock = DockStyle.Fill };
            buttons.Controls.Add(_export);
            buttons.Controls.Add(_cancel);

            layout.Controls.Add(buttons, 1, 2);
            Controls.Add(layout);

            _cancel.Click += (s, e) => Close();
            _export.Click += (s, e) =>
            {
                var sdt = _start.Value.Date;
                var edt = _end.Value.Date.AddDays(1).AddTicks(-1); // inclusive end

                var path = Reporting.ReportExporter.ExportCsv(sdt, edt, _snippets);
                MessageBox.Show($"Report exported:\n{path}", "Export Report", MessageBoxButtons.OK, MessageBoxIcon.Information);
                Close();
            };
        }
    }
}
