
using System.Windows.Forms;

namespace PortableClipboard.Services
{
    public static class ClipboardService
    {
        public static void SetText(string text)
        {
            Clipboard.SetText(text, TextDataFormat.UnicodeText); // plain text only
        }
    }
}
