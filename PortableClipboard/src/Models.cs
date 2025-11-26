
using System;

namespace PortableClipboard
{
    public class Snippet
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Title { get; set; } = "";
        public string Text { get; set; } = "";
        public string Category { get; set; } = "Category01";
        public bool AutoPaste { get; set; } = true; // default Auto-paste
    }

    public class AppSettings
    {
        public int AvgTypingSeconds { get; set; } = 15;
        public bool DefaultAutoPaste { get; set; } = true;
    }

    public class AppState
    {
        public int WeeklyTimeSavedSeconds { get; set; } = 0;
        public int AllTimeSavedSeconds { get; set; } = 0;
        public DateTime WeeklyResetAt { get; set; } = DateTime.Now;
        public DateTime AllTimeResetAt { get; set; } = DateTime.Now;
        public int LastWeekNumber { get; set; } = WeekUtil.GetIsoWeekOfYear(DateTime.Now);
    }

    public class UsageEvent
    {
        public DateTime Ts { get; set; } = DateTime.Now;
        public string Event { get; set; } = "";
        public string SnippetId { get; set; } = "";
        public string SnippetTitle { get; set; } = "";
        public string Category { get; set; } = "";
        public string Mode { get; set; } = ""; // autoPaste | copyOnly
        public string Format { get; set; } = "plain";
        public string Source { get; set; } = "tray"; // tray | editor
        public string App { get; set; } = "";
        public string Version { get; set; } = "1.0.0";
    }
}
