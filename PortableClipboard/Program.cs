
using System;
using System.Windows.Forms;
using PortableClipboard.UI;

namespace PortableClipboard
{
    internal static class Program
    {
        [STAThread]
        static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);

            using var tray = new TrayApp(versionText: "Portable Clipboard v1.0");
            Application.Run();
        }
    }
}
