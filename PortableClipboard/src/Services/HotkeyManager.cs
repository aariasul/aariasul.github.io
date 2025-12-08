
using System;
using System.Windows.Forms;
using System.Runtime.InteropServices;

namespace PortableClipboard.Services
{
    public sealed class HotkeyManager : NativeWindow, IDisposable
    {
        [DllImport("user32.dll")] static extern bool RegisterHotKey(IntPtr hWnd, int id, uint fsModifiers, uint vk);
        [DllImport("user32.dll")] static extern bool UnregisterHotKey(IntPtr hWnd, int id);
        [DllImport("user32.dll")] static extern IntPtr GetForegroundWindow();

        const uint MOD_CONTROL = 0x0002;
        const uint MOD_SHIFT   = 0x0004;
        const int  WM_HOTKEY   = 0x0312;

        private readonly int _id = 1; // single hotkey id

        // IMPORTANT: pass hwnd of the currently focused window
        public event Action<IntPtr>? Triggered;

        public HotkeyManager()
        {
            CreateHandle(new CreateParams());
            // Ctrl+Shift+V
            RegisterHotKey(Handle, _id, MOD_CONTROL | MOD_SHIFT, (uint)Keys.V);
        }

        protected override void WndProc(ref Message m)
        {
            if (m.Msg == WM_HOTKEY && m.WParam.ToInt32() == _id)
            {
                var hwnd = GetForegroundWindow();      // capture BEFORE any UI
                Triggered?.Invoke(hwnd);               // pass it to listeners
            }
            base.WndProc(ref m);
        }

        public void Dispose()
        {
            UnregisterHotKey(Handle, _id);
            DestroyHandle();
        }
    }
}
