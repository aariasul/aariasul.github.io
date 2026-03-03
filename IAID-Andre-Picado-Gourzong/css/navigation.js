(function() {

  function tryOpen(url, fallback, timeout = 1500) {
      let hidden = false;

      function onVisibilityChange() {
          if (document.hidden) {
              hidden = true;
          }
      }

      document.addEventListener("visibilitychange", onVisibilityChange);

      window.location = url;

      setTimeout(() => {
          document.removeEventListener("visibilitychange", onVisibilityChange);
          if (!hidden && fallback) {
              window.location = fallback;
          }
      }, timeout);
  }

  window.openSmartNavigation = function(destination) {

      const encoded = encodeURIComponent(destination);

      const googleApp = "comgooglemaps://?daddr=" + encoded + "&directionsmode=driving";
      const googleWeb = "https://www.google.com/maps/dir/?api=1&destination=" + encoded;
      const waze = "https://waze.com/ul?q=" + encoded + "&navigate=yes";
      const apple = "http://maps.apple.com/?daddr=" + encoded;

      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const isAndroid = /Android/.test(navigator.userAgent);

      if (isAndroid) {
          tryOpen(waze, googleWeb);
      }

      else if (isIOS) {
          tryOpen(googleApp, null);
          setTimeout(() => {
              tryOpen(waze, apple);
          }, 1600);
      }

      else {
          window.location = googleWeb;
      }
  };

})();