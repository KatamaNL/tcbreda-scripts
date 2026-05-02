/**
 * TC Breda - Custom Footer Scripts
 * Hosted via GitHub Pages (KatamaNL/tcbreda-scripts)
 *
 * 1. Vervangt copyright link naar katama.nl
 * 2. Voegt klikbare footer navigatie links toe
 * 3. Voegt diagonaal rood/blauw patroon toe boven footer
 * 4. Meta Pixel (Zomer Challenge campagne 2026)
 */
(function() {
  'use strict';

  var META_PIXEL_ID = '942137727696983';

  function init() {
    fixCopyrightLink();
    fixRouteLink();
    createFooterNav();
    fixHamburgerColor();
    createFooterDiagonal();
    injectFAQSchema();
    initMetaPixel();
    trackPageEvents();
    bindCheckoutEvents();
  }

  function initMetaPixel() {
    if (window.fbq) return;
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', META_PIXEL_ID);
    fbq('track', 'PageView');
  }

  function trackPageEvents() {
    if (!window.fbq) return;
    var path = window.location.pathname.toLowerCase().replace(/\/$/, '');
    if (path === '/zomer-challenge') {
      fbq('track', 'ViewContent', {
        content_name: 'Zomer Challenge 2026',
        content_category: 'tijdelijk-lidmaatschap',
        content_ids: ['zomer-challenge-2026'],
        currency: 'EUR',
        value: 40.00
      });
    }
  }

  function bindCheckoutEvents() {
    if (!window.fbq) return;
    var path = window.location.pathname.toLowerCase().replace(/\/$/, '');
    if (path !== '/zomer-challenge') return;

    document.body.addEventListener('click', function(e) {
      var target = e.target.closest('a, button');
      if (!target) return;
      var text = (target.textContent || '').trim().toLowerCase();
      var href = (target.getAttribute('href') || '').toLowerCase();
      var isCheckout = /aanmeld|inschrijv|word lid|deelnem|reserveer/.test(text)
                    || /lidworden|lid-worden|inschrijv|aanmeld/.test(href);
      if (isCheckout) {
        fbq('track', 'InitiateCheckout', {
          content_name: 'Zomer Challenge 2026',
          currency: 'EUR',
          value: 40.00
        });
      }
    }, true);
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

  function injectFAQSchema() {
    var path = window.location.pathname.toLowerCase().replace(/\/$/, '');
    var faq = null;

    if (path === '/lid-worden' || path === '/hoe-word-je-lid') {
      faq = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'Kan ik eerst een keer komen kijken bij TC Breda?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Natuurlijk! Loop gerust binnen tijdens openingstijden. Je bent altijd welkom voor een rondleiding.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Wat is de Zomer Challenge?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Van juni t/m augustus kun je 3 maanden tennissen voor slechts 40 euro. Ideaal om de club te leren kennen.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Kan ik op elk moment lid worden van TC Breda?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Ja! Je kunt op elk moment instromen. De tarieven worden aangepast per kwartaal (1 januari, 1 juli of 1 oktober).'
            }
          },
          {
            '@type': 'Question',
            'name': 'Heb ik eigen materiaal nodig om te tennissen?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Een tennisracket en tennisschoenen (bij voorkeur gravel) zijn nodig. Ballen worden door de club verzorgd bij lessen en competitie.'
            }
          }
        ]
      };
    } else if (path === '/contributies') {
      faq = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'Wat kost een seniorenlidmaatschap bij TC Breda?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Een seniorenlidmaatschap (vanaf 21 jaar) kost 170 euro per jaar bij instap per 1 januari, 90 euro per 1 juli of 55 euro per 1 oktober. Senioren tot 21 jaar betalen 125 euro per jaar. 65-plussers betalen 70 euro per jaar.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Zijn er jeugdtarieven bij TC Breda?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Ja. Jeugd van 8 t/m 17 jaar betaalt 57 euro per jaar, jeugd van 5 t/m 7 jaar betaalt 45 euro per jaar. Voor jeugd t/m 17 jaar wordt geen inschrijfgeld in rekening gebracht.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Wat is het inschrijfgeld bij TC Breda?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Het inschrijfgeld is eenmalig 23 euro per persoon bij aanmelding. Voor jeugd t/m 17 jaar wordt geen inschrijfgeld in rekening gebracht.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Wat is de waarborg bardienst?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'De waarborg bardienst is 50 euro. Elk lid is verplicht twee bar- of parkdiensten per jaar te vervullen. De waarborg wordt terugbetaald na correct opzeggen van het lidmaatschap en het vervullen van de verplichte diensten.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Kan ik de verplichte bardiensten afkopen?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Ja, de verplichte bardiensten kunnen worden afgekocht voor 35 euro per dienst of 60 euro voor twee diensten.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Wat kost de Zomer Challenge 2026?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'De Zomer Challenge 2026 kost 40 euro voor een tijdelijk lidmaatschap van juni t/m augustus, of 59 euro inclusief 2 tennislessen. Het lidmaatschap eindigt automatisch per 1 september 2026.'
            }
          }
        ]
      };
    }

    if (faq) {
      var el = document.createElement('script');
      el.type = 'application/ld+json';
      el.textContent = JSON.stringify(faq);
      document.head.appendChild(el);
    }
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
