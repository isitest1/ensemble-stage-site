// Language toggle shared by all pages. Switches EN/JP within the same URL.
// Preference is remembered in localStorage; first visit follows the browser language.
// A ?lang=ja / ?lang=en query or #hash on load can force a language.
(function () {
  function detect() {
    var params = new URLSearchParams(window.location.search);
    var q = params.get('lang');
    if (q === 'ja' || q === 'en') return q;
    var saved = localStorage.getItem('lang');
    if (saved === 'ja' || saved === 'en') return saved;
    var nav = (navigator.language || navigator.userLanguage || '').toLowerCase();
    return nav.indexOf('ja') === 0 ? 'ja' : 'en';
  }

  function apply(lang) {
    document.documentElement.setAttribute('data-lang', lang);
    localStorage.setItem('lang', lang);
    var buttons = document.querySelectorAll('[data-lang-btn]');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].classList.toggle('active', buttons[i].getAttribute('data-lang-btn') === lang);
    }
    document.title = document.title; // no-op; titles are handled per-page
  }

  // Set the attribute as early as possible to avoid a flash of the wrong language.
  document.documentElement.setAttribute('data-lang', detect());

  document.addEventListener('DOMContentLoaded', function () {
    apply(detect());
    var buttons = document.querySelectorAll('[data-lang-btn]');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function () {
        apply(this.getAttribute('data-lang-btn'));
      });
    }
  });

  window.__setLang = apply;
})();
