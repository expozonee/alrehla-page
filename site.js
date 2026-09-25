// Language switch. Order: ?lang=ar|en in the URL, then the saved choice,
// then the device language (English devices get English, everything else Arabic).
(function () {
  var root = document.documentElement;
  var KEY = "alrehla-lang";

  function pick() {
    var fromUrl = new URLSearchParams(location.search).get("lang");
    if (fromUrl === "ar" || fromUrl === "en") return fromUrl;
    try {
      var saved = localStorage.getItem(KEY);
      if (saved === "ar" || saved === "en") return saved;
    } catch (e) {}
    return /^en\b/i.test(navigator.language || "") ? "en" : "ar";
  }

  function apply(lang) {
    root.classList.remove("show-ar", "show-en");
    root.classList.add("show-" + lang);
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";
    var buttons = document.querySelectorAll("[data-set-lang]");
    for (var i = 0; i < buttons.length; i++) {
      var active = buttons[i].getAttribute("data-set-lang") === lang;
      buttons[i].setAttribute("aria-pressed", active ? "true" : "false");
    }
  }

  var current = pick();
  apply(current);
  document.addEventListener("DOMContentLoaded", function () { apply(current); });

  document.addEventListener("click", function (event) {
    var button = event.target.closest && event.target.closest("[data-set-lang]");
    if (!button) return;
    current = button.getAttribute("data-set-lang");
    try { localStorage.setItem(KEY, current); } catch (e) {}
    apply(current);
  });
})();
