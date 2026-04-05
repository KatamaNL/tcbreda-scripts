# TC Breda - Custom Scripts

Custom JavaScript voor tcbreda.nl (KNLTB.Club CMS).

## Wat doet het?

1. **Copyright link**: Verandert de "Powered by KNLTB.Club" link naar `katama.nl`
2. **Footer navigatie**: Voegt klikbare navigatielinks toe onderaan de footer

## Installatie in het CMS

### Optie 1: Via Aangepaste scripts per pagina (handmatig)

Open elke pagina in het CMS (Clubsite > Pagina's > [pagina]) en plak het volgende in het veld **"Aangepaste scripts"** (het CodeMirror veld onderaan rechts):

```html
<script src="https://katamanl.github.io/tcbreda-scripts/tcbreda.js"></script>
```

### Optie 2: Via KNLTB Support (aanbevolen)

Stuur een mail naar support@knltb.club met het verzoek om onderstaande regel toe te voegen aan de site template, vlak voor `</body>`:

```
Beste KNLTB Support,

Kunnen jullie voor clubsite TC Breda (Club ID: 1099) de volgende scripttag toevoegen aan de footer template, vlak voor de </body> tag?

<script src="https://katamanl.github.io/tcbreda-scripts/tcbreda.js"></script>

Dit is een klein script dat de footer navigatie en copyright tekst aanpast.

Alvast bedankt!
```

## Hosting

Dit bestand wordt gehost via GitHub Pages op de KatamaNL organisatie:
- Repository: `KatamaNL/tcbreda-scripts`
- URL: `https://katamanl.github.io/tcbreda-scripts/tcbreda.js`
