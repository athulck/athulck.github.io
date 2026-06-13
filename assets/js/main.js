/* ============================================================
   Hack2Own — site behaviour
   ============================================================ */
(function () {
  "use strict";

  /* ---- Mobile nav toggle ---- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { links.classList.remove("open"); });
    });
  }

  /* ---- Scroll reveal ---- */
  var revs = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revs.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    revs.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 0.06 + "s";
      io.observe(el);
    });
  } else {
    revs.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll(".faq-q").forEach(function (q) {
    q.addEventListener("click", function () {
      var item = q.closest(".faq-item");
      var ans = item.querySelector(".faq-a");
      var open = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(function (it) {
        it.classList.remove("open");
        it.querySelector(".faq-a").style.maxHeight = null;
      });
      if (!open) {
        item.classList.add("open");
        ans.style.maxHeight = ans.scrollHeight + "px";
      }
    });
  });

  /* ---- Terminal typing effect (hero) ---- */
  var term = document.querySelector("[data-typed]");
  if (term) {
    var lines = JSON.parse(term.getAttribute("data-typed"));
    var out = term.querySelector(".term-stream");
    var cursor = term.querySelector(".cursor");
    var li = 0, ci = 0;
    function type() {
      if (li >= lines.length) { return; }
      var line = lines[li];
      if (ci === 0) {
        var div = document.createElement("div");
        div.className = "tline";
        div.innerHTML = '<span class="pr">' + line.p + '</span> <span class="body"></span>';
        out.appendChild(div);
      }
      var bodyEl = out.lastChild.querySelector(".body");
      if (ci < line.t.length) {
        bodyEl.textContent += line.t.charAt(ci);
        ci++;
        setTimeout(type, 22 + Math.random() * 30);
      } else {
        out.lastChild.querySelector(".body").className = "body " + (line.c || "cm");
        li++; ci = 0;
        setTimeout(type, 360);
      }
    }
    setTimeout(type, 500);
  }
})();
