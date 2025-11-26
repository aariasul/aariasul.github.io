
using System;
using System.Globalization;

namespace PortableClipboard
{
    public static class WeekUtil
    {
        public static int GetIsoWeekOfYear(DateTime dt)
        {
            return ISOWeek.GetWeekOfYear(dt);
        }
    }
}
