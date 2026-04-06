/**
 * TC Breda - Custom Footer Scripts
 * Hosted via GitHub Pages (KatamaNL/tcbreda-scripts)
 *
 * 1. Vervangt copyright link naar katama.nl
 * 2. Voegt klikbare footer navigatie links toe
 * 3. Voegt diagonaal rood/blauw patroon toe boven footer
 */
(function() {
  'use strict';

  function init() {
    fixCopyrightLink();
    fixRouteLink();
    createFooterNav();
    fixHamburgerColor();
    createFooterDiagonal();
  }

  function fixCopyrightLink() {
    var link = document.querySelector('.copyright a');
    if (link) {
      link.href = 'https://katama.nl';
      link.target = '_blank';
      link.rel = 'noopener';
    }
  }

  function fixRouteLink() {
    var links = document.querySelectorAll('.footer a');
    links.forEach(function(a) {
      if (a.textContent.trim() === 'Routebeschrijving' || a.href.indexOf('maps/dir') > -1) {
        a.href = 'https://maps.app.goo.gl/HiJ2PQoEtcm3YY839';
        a.target = '_blank';
        a.rel = 'noopener';
      }
    });
  }

  function createFooterNav() {
    var footerRow = document.querySelector('.footer .row');
    if (!footerRow) return;

    var nav = document.createElement('div');
    nav.className = 'footer-nav-links';
    nav.style.cssText = 'width:100%;text-align:center;padding:20px 0 10px;margin-top:20px;border-top:1px solid rgba(255,255,255,0.15)';

    var links = [
      ['/', 'Home'],
      ['/contributies', 'Lidmaatschap'],
      ['/tennislessen', 'Tennisles'],
      ['/activiteiten', 'Activiteiten'],
      ['/sponsoring', 'Sponsoring'],
      ['/contact', 'Contact'],
      ['/baanhuur', 'Baanhuur']
    ];

    links.forEach(function(item, i) {
      if (i > 0) {
        var sep = document.createElement('span');
        sep.textContent = ' | ';
        sep.style.cssText = 'color:rgba(255,255,255,0.3);font-size:13px';
        nav.appendChild(sep);
      }
      var a = document.createElement('a');
      a.href = item[0];
      a.textContent = item[1];
      a.style.cssText = 'color:rgba(255,255,255,0.5);font-size:13px;text-decoration:none;padding:0 6px;transition:color 0.2s';
      a.addEventListener('mouseover', function() { this.style.color = '#fff'; });
      a.addEventListener('mouseout', function() { this.style.color = 'rgba(255,255,255,0.5)'; });
      nav.appendChild(a);
    });

    footerRow.parentNode.appendChild(nav);
    footerRow.parentNode.classList.add('has-nav-links');
  }

  function fixHamburgerColor() {
    var style = document.createElement('style');
    style.textContent = '.navbar-toggler{color:#383c8f!important;border-color:#383c8f!important}.navbar-toggler-bars,.navbar-toggler-bars::before,.navbar-toggler-bars::after{background:#383c8f!important}';
    document.head.appendChild(style);
  }

  function createFooterDiagonal() {
    var footer = document.querySelector('.footer');
    if (!footer || document.querySelector('.footer-diagonal-band')) return;

    var band = document.createElement('div');
    band.className = 'footer-diagonal-band';

    var red = document.createElement('div');
    red.className = 'footer-diagonal-red';
    band.appendChild(red);

    footer.parentNode.insertBefore(band, footer);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
