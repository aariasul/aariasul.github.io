
private void InitializeHotkey()
{
    _hotkey = new HotkeyManager();
    _hotkey.Triggered += (hwnd) =>
    {
        try
        {
            using var qp = new QuickPickerForm(_snippets, hwnd); // pass target hwnd
            qp.ShowDialog();
        }
        catch { /* swallow exceptions */ }
    };
}
