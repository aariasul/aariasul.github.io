using System;
using System.Windows.Forms;
using System.Runtime.InteropServices;

namespace PortableClipboard.Services
{
    public sealed class HotkeyManager : NativeWindow, IDisposable
    {
        [DllImport("user32.dll")] static extern bool RegisterHotKey(IntPtr hWnd, int id, uint fsModifiers, uint vk);
        [DllImport("user32.dll")] static extern bool UnregisterHotKey(IntPtr hWnd, int id);

        const uint MOD_CONTROL = 0x0002;
        const uint MOD_SHIFT   = 0x0004;
        const int  WM_HOTKEY   = 0x0312;

        private readonly int _id = 1;
        public event Action? Triggered;

        public HotkeyManager()
        {
            CreateHandle(new CreateParams());
            RegisterHotKey(Handle, _id, MOD_CONTROL | MOD_SHIFT, (uint)Keys.V); // Ctrl+Shift+V
        }

        protected override void WndProc(ref Message m)
        {
            if (m.Msg == WM_HOTKEY && m.WParam.ToInt32() == _id)
                Triggered?.Invoke();
            base.WndProc(ref m);
        }

        public void Dispose()
        {
            UnregisterHotKey(Handle, _id);
            DestroyHandle();
        }
    }
}
