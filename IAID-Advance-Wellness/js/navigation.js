(function() {

  function tryOpen(url, fallback, timeout = 1500) {
      let hidden = false;

      function onVisibilityChange() {
          if (document.hidden) {
              hidden = true;
          }
      }

      document.addEventListener("visibilitychange", onVisibilityChange);

      window.location.href = url;

      setTimeout(() => {
          document.removeEventListener("visibilitychange", onVisibilityChange);
          if (!hidden && fallback) {
              window.location.href = fallback;
          }
      }, timeout);
  }

  window.openSmartNavigation = function(destination) {

      const encoded = encodeURIComponent(destination);

      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const isAndroid = /Android/.test(navigator.userAgent);

      const googleApp = "comgooglemaps://?daddr=" + encoded + "&directionsmode=driving";
      const googleWeb = "https://www.google.com/maps/dir/?api=1&destination=" + encoded;
      const wazeWeb = "https://waze.com/ul?q=" + encoded + "&navigate=yes";
      const apple = "http://maps.apple.com/?daddr=" + encoded;

      // 🔥 ANDROID FIX — USE INTENT
      const wazeIntent = "intent://ul?q=" + encoded + "&navigate=yes#Intent;scheme=https;package=com.waze;end";

      if (isAndroid) {
          // Android: Waze intent → Google fallback
          tryOpen(wazeIntent, googleWeb);
      }

      else if (isIOS) {
          // iOS: Google app → Waze → Apple
          tryOpen(googleApp, null);

          setTimeout(() => {
              tryOpen(wazeWeb, apple);
          }, 1600);
      }

      else {
          // Desktop
          window.location.href = googleWeb;
      }
  };

})();