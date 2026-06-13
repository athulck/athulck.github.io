/* Populate the sign-in gate from ?module=&level= */
(function () {
  "use strict";
  var LEVELS = {
    1: { lv: "L1", nm: "Apprentice", price: "₹7,500 one-time", cert: "CEH Ready", blurb: "structured theory, exam-aligned notes, and lifetime access" },
    2: { lv: "L2", nm: "Professional", price: "₹22,000 / year", cert: "eJPT Ready", blurb: "hosted hands-on labs, guided attack paths, and graded challenges" },
    3: { lv: "L3", nm: "Expert", price: "₹30,000 / year", cert: "OSCP Ready", blurb: "advanced labs, real-world chains, and exam-grade practice machines" }
  };
  var MODULES = {
    recon: "Reconnaissance & Footprinting",
    scanning: "Scanning & Enumeration",
    web: "Web Application Attacks",
    network: "Network Exploitation",
    privesc: "Privilege Escalation",
    reporting: "Reporting & Methodology"
  };

  var params = new URLSearchParams(window.location.search);
  var lvl = parseInt(params.get("level"), 10);
  var mod = params.get("module");
  var info = LEVELS[lvl] || LEVELS[1];
  var modName = MODULES[mod] || "this module";

  var pill = document.getElementById("gate-level");
  var title = document.getElementById("gate-title");
  var body = document.getElementById("gate-body");
  if (pill) pill.textContent = info.lv + " · " + info.nm + " · " + info.cert;
  if (title) title.innerHTML = 'Unlock <span class="accent">' + info.lv + " " + info.nm + '</span>';
  if (body) body.textContent =
    "“" + modName + "” at " + info.lv + " unlocks " + info.blurb +
    ". This tier is part of the full Hack2Own platform — sign up to continue your descent. (" + info.price + ")";
})();
