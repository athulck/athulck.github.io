/* ============================================================
   Hack2Own — Module level switcher
   Reads data-* attributes on .lvl-nav to wire up the
   "Go Shallow" / "Go Deeper" arrows.

   Expected markup:
   <div class="lvl-nav" data-module="recon" data-level="0">
   Free level (0) routes to ./l0.html
   Locked levels (1-3) route to ../../pages/locked.html?module=recon&level=1
   ============================================================ */
(function () {
  "use strict";
  var nav = document.querySelector(".lvl-nav");
  if (!nav) return;

  var LEVELS = [
    { lv: "L0", nm: "Noob" },
    { lv: "L1", nm: "Apprentice" },
    { lv: "L2", nm: "Professional" },
    { lv: "L3", nm: "Expert" }
  ];

  var mod = nav.getAttribute("data-module");
  var cur = parseInt(nav.getAttribute("data-level"), 10) || 0;

  function urlFor(level) {
    if (level === 0) return "./l0.html";
    // locked.html lives in /pages relative to /modules/<mod>/
    return "../../pages/locked.html?module=" + encodeURIComponent(mod) + "&level=" + level;
  }

  function go(level) {
    if (level < 0 || level > 3) return;
    window.location.href = urlFor(level);
  }

  var prev = nav.querySelector(".lvl-prev");   // shallower
  var next = nav.querySelector(".lvl-next");   // deeper
  var disp = nav.querySelector(".lvl-display");

  if (disp) {
    disp.innerHTML = '<div class="lv">' + LEVELS[cur].lv + '</div><div class="nm">' + LEVELS[cur].nm + '</div>';
  }
  if (prev) {
    if (cur <= 0) prev.setAttribute("disabled", "");
    else prev.addEventListener("click", function () { go(cur - 1); });
  }
  if (next) {
    if (cur >= 3) next.setAttribute("disabled", "");
    else next.addEventListener("click", function () { go(cur + 1); });
  }

  /* keyboard arrows */
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft" && prev && !prev.hasAttribute("disabled")) go(cur - 1);
    if (e.key === "ArrowRight" && next && !next.hasAttribute("disabled")) go(cur + 1);
  });
})();
