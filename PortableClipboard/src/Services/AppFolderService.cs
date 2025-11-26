
using System.Diagnostics;
using System.IO;

namespace PortableClipboard.Services
{
    public static class AppFolderService
    {
        public static void OpenAppFolder()
        {
            var dir = Directory.GetParent(System.AppDomain.CurrentDomain.BaseDirectory)!.FullName;
            Process.Start(new ProcessStartInfo()
            {
                FileName = dir,
                UseShellExecute = true
            });
        }
    }
}
