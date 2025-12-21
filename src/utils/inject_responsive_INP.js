(function () {
  // Inject hide/fade styles
  var style = document.createElement("style");
  style.textContent =
    ".hero-content { visibility: hidden; opacity: 0; transition: opacity 0.5s ease; } .hero-content.ready { visibility: visible; opacity: 1; }";
  document.head.appendChild(style);

  function getComputed(el, prop) {
    return parseFloat(getComputedStyle(el)[prop]) || 0;
  }

  function scaleHeroVisual() {
    var wrapper = document.querySelector(".hero-image-wrapper");
    var avatar = document.querySelector(".avatar-placeholder");
    var heroText = document.querySelector(".hero-text");
    var hero = document.querySelector(".hero");
    var nav = document.querySelector("nav");
    var heroContent = document.querySelector(".hero-content");
    var container = document.querySelector(".container");

    if (!wrapper || !avatar || !heroText || !hero || !heroContent) return;

    var vw = window.innerWidth;
    var vh = window.innerHeight;

    if (vw <= 1024) {
      // Get computed values
      var navHeight = nav ? getComputed(nav, "height") : 0;
      var heroPaddingTop = getComputed(hero, "paddingTop");
      var heroPaddingBottom = getComputed(hero, "paddingBottom");
      var contentGap = heroContent ? getComputed(heroContent, "gap") : 24;

      // Temporarily reset wrapper to measure text height
      var prevWidth = wrapper.style.width;
      var prevHeight = wrapper.style.height;
      wrapper.style.width = "0";
      wrapper.style.height = "0";

      var heroTextHeight = heroText.getBoundingClientRect().height;

      // Restore previous values
      wrapper.style.width = prevWidth;
      wrapper.style.height = prevHeight;

      // Calculate available space
      var availableHeight =
        vh -
        (navHeight +
          heroPaddingTop +
          heroPaddingBottom +
          heroTextHeight +
          contentGap);

      // Constraints
      var containerPadding = container
        ? getComputed(container, "paddingLeft") * 2
        : 32;
      var maxSize = Math.min((vw - containerPadding) * 0.8, 350);
      var minSize = 120;

      // Calculate optimal size (aspect ratio ~1.25)
      var optimalWidth = Math.max(
        Math.min(availableHeight / 1.25, maxSize),
        minSize
      );
      var optimalHeight = optimalWidth * 1.25;
      var avatarSize = optimalWidth * 0.5;

      // Apply sizes
      wrapper.style.setProperty("width", optimalWidth + "px", "important");
      wrapper.style.setProperty("height", optimalHeight + "px", "important");
      avatar.style.setProperty("width", avatarSize + "px", "important");
      avatar.style.setProperty("height", avatarSize + "px", "important");
      avatar.style.setProperty(
        "font-size",
        avatarSize * 0.35 + "px",
        "important"
      );

      console.log(
        "[hero-scale] mobile:",
        optimalWidth + "x" + optimalHeight,
        "avatar:",
        avatarSize
      );
    } else {
      // Reset to CSS defaults
      wrapper.style.removeProperty("width");
      wrapper.style.removeProperty("height");
      avatar.style.removeProperty("width");
      avatar.style.removeProperty("height");
      avatar.style.removeProperty("font-size");

      console.log("[hero-scale] desktop: reset");
    }

    // Fade in
    heroContent.classList.add("ready");
    console.log("[hero-scale] ready");
  }

  // Debounced resize handler
  var resizeTimeout;
  function debouncedScale() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(scaleHeroVisual, 50);
  }

  // Run immediately
  scaleHeroVisual();

  // Listen for resize and orientation change
  window.addEventListener("resize", debouncedScale);
  window.addEventListener("orientationchange", function () {
    setTimeout(scaleHeroVisual, 150);
  });
})();
