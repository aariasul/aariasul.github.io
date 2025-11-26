
using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;

namespace PortableClipboard.Services
{
    public static class StorageService
    {
        private static string BaseDir => AppDomain.CurrentDomain.BaseDirectory;
        private static string SnippetsPath => Path.Combine(BaseDir, "snippets.json");
        private static string SettingsPath => Path.Combine(BaseDir, "settings.json");
        private static string StatePath => Path.Combine(BaseDir, "state.json");

        public static List<Snippet> LoadSnippets()
        {
            if (!File.Exists(SnippetsPath))
            {
                var seed = new List<Snippet>
                {
                    new Snippet { Title = "Hello, this is Alonso from Support. How can I assist you today?", Category="Category01", Text="Hello, this is Alonso from Support. How can I assist you today?" },
                    new Snippet { Title = "Good day! Please let me know if you need any help.", Category="Category01", Text="Good day! Please let me know if you need any help." },
                    new Snippet { Title = "Thank you for reaching out to us.", Category="Category01", Text="Thank you for reaching out to us." },
                    new Snippet { Title = "Closing the ticket per your request.", Category="Category02", Text="Closing the ticket per your request." },
                    new Snippet { Title = "Please confirm if the issue is resolved so we can close the case.", Category="Category02", Text="Please confirm if the issue is resolved so we can close the case." },
                    new Snippet { Title = "Thank you for contacting us. Have a great day!", Category="Category02", Text="Thank you for contacting us. Have a great day!" }
                };
                SaveSnippets(seed);
                return seed;
            }
            var json = File.ReadAllText(SnippetsPath);
            return JsonSerializer.Deserialize<List<Snippet>>(json) ?? new List<Snippet>();
        }

        public static void SaveSnippets(List<Snippet> snippets)
        {
            var json = JsonSerializer.Serialize(snippets, new JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText(SnippetsPath, json);
        }

        public static AppSettings LoadSettings()
        {
            if (!File.Exists(SettingsPath))
            {
                var def = new AppSettings();
                SaveSettings(def);
                return def;
            }
            var json = File.ReadAllText(SettingsPath);
            return JsonSerializer.Deserialize<AppSettings>(json) ?? new AppSettings();
        }

        public static void SaveSettings(AppSettings s)
        {
            var json = JsonSerializer.Serialize(s, new JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText(SettingsPath, json);
        }

        public static AppState LoadState()
        {
            if (!File.Exists(StatePath))
            {
                var st = new AppState();
                SaveState(st);
                return st;
            }
            var json = File.ReadAllText(StatePath);
            return JsonSerializer.Deserialize<AppState>(json) ?? new AppState();
        }

        public static void SaveState(AppState st)
        {
            var json = JsonSerializer.Serialize(st, new JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText(StatePath, json);
        }

        public static string GetAppFolder() => BaseDir;
    }
}
