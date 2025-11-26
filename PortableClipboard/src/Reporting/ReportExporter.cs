
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using PortableClipboard.Services;

namespace PortableClipboard.Reporting
{
    public static class ReportExporter
    {
        public static string ExportCsv(DateTime start, DateTime end, List<Snippet> snippets)
        {
            string baseDir = AppDomain.CurrentDomain.BaseDirectory;
            string file = Path.Combine(baseDir, $"report_{start:yyyy-MM-dd}_{end:yyyy-MM-dd}.csv");

            var events = LoadEvents(baseDir)
                .Where(ev => ev.Ts >= start && ev.Ts <= end)
                .ToList();

            int total = events.Count;
            int autoCount = events.Count(e => e.Event == "snippet_paste");
            int copyCount = events.Count(e => e.Event == "snippet_copy");

            var byCat = events.GroupBy(e => e.Category)
                              .Select(g => new { Category = g.Key, Count = g.Count() })
                              .OrderByDescending(x => x.Count)
                              .ToList();

            var bySnippet = events.GroupBy(e => e.SnippetTitle)
                                  .Select(g => new { Title = g.Key, Count = g.Count() })
                                  .OrderByDescending(x => x.Count)
                                  .ToList();

            var settings = StorageService.LoadSettings();
            var estSeconds = total * settings.AvgTypingSeconds;

            using var sw = new StreamWriter(file);
            sw.WriteLine("Time Frame,Snippets Used,Time Saved (seconds),Auto-Paste %,Copy-Only %");
            double ap = total == 0 ? 0 : (autoCount * 100.0 / total);
            double cp = total == 0 ? 0 : (copyCount * 100.0 / total);
            sw.WriteLine($"{start:yyyy-MM-dd} to {end:yyyy-MM-dd},{total},{estSeconds},{ap:F1},{cp:F1}");

            sw.WriteLine();
            sw.WriteLine("Top Categories (Count)");
            foreach (var c in byCat) sw.WriteLine($"{c.Category},{c.Count}");

            sw.WriteLine();
            sw.WriteLine("Most Used Snippets (Count)");
            foreach (var s in bySnippet) sw.WriteLine($"\"{s.Title.Replace("\"", "\"\"")}\",{s.Count}");

            sw.Flush();
            return file;
        }

        private static IEnumerable<UsageEvent> LoadEvents(string baseDir)
        {
            string[] files = new[]
            {
                Path.Combine(baseDir, "usage.log"),
                Path.Combine(baseDir, "usage.log.1"),
                Path.Combine(baseDir, "usage.log.2"),
            };

            foreach (var f in files)
            {
                if (!File.Exists(f)) continue;
                foreach (var line in File.ReadLines(f))
                {
                    if (string.IsNullOrWhiteSpace(line)) continue;
                    UsageEvent? ev = null;
                    try { ev = JsonSerializer.Deserialize<UsageEvent>(line); }
                    catch { }
                    if (ev != null) yield return ev;
                }
            }
        }
    }
}
