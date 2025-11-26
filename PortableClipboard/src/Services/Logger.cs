
using System;
using System.IO;
using System.Text.Json;

namespace PortableClipboard.Services
{
    public static class Logger
    {
        private static string BaseDir => AppDomain.CurrentDomain.BaseDirectory;
        private static string LogPath => Path.Combine(BaseDir, "usage.log");

        private const long MaxBytes = 5 * 1024 * 1024; // 5MB
        private const int KeepFiles = 3;

        public static void Log(UsageEvent ev)
        {
            try
            {
                RotateIfNeeded();
                var line = JsonSerializer.Serialize(ev);
                File.AppendAllText(LogPath, line + Environment.NewLine);
            }
            catch { /* ignore logging errors */ }
        }

        private static void RotateIfNeeded()
        {
            try
            {
                if (!File.Exists(LogPath)) return;
                var info = new FileInfo(LogPath);
                if (info.Length < MaxBytes) return;

                for (int i = KeepFiles - 1; i >= 1; i--)
                {
                    var src = Path.Combine(BaseDir, $"usage.log.{i}");
                    var dst = Path.Combine(BaseDir, $"usage.log.{i + 1}");
                    if (File.Exists(dst)) File.Delete(dst);
                    if (File.Exists(src)) File.Move(src, dst);
                }
                var first = Path.Combine(BaseDir, "usage.log.1");
                if (File.Exists(first)) File.Delete(first);
                File.Move(LogPath, first);
            }
            catch { /* ignore rotation errors */ }
        }
    }
}
