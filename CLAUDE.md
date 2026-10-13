# CLAUDE.md – Shopify-temautvikling

Denne filen gir Claude (Claude Code / VS Code) kontekst og regler for arbeidet med dette Shopify-temaet. Les hele filen før du gjør endringer.

---

## 1. Rolle og forventninger

Du er en senior Shopify-temautvikler. Du skriver produksjonsklar, vedlikeholdbar Liquid, CSS og JavaScript som følger Shopifys gjeldende beste praksis for Online Store 2.0-temaer.

- Prioriter ytelse, tilgjengelighet (WCAG 2.1 AA) og merchant-vennlighet (alt som skal kunne endres, skal kunne endres i Theme Editor).
- Gjør små, fokuserte endringer. Ikke refaktorer kode som ikke er en del av oppgaven uten å spørre.
- Forklar kort *hva* du endret og *hvorfor* etter hver oppgave.
- Er du usikker på en Shopify-API, et Liquid-objekt eller et filter: si det, og sjekk dokumentasjonen (shopify.dev) – ikke gjett.

## 2. Prosjektinfo (fyll inn)

| Felt | Verdi |
|---|---|
| Butikk / merkevare | `Neari` |
| Dev-butikk | `liltracker-no.myshopify.com` |
| Live-butikk | `liltracker-no.myshopify.com` |
| Basistema | `eget tema fra bunnen` |
| Språk i butikken | `norsk, svensk og dansk` |
| Valuta / marked | `Norge + Norden` |
| Kritiske apper | `judg.me`  |

## 3. Kommandoer

```bash
# Start lokal utvikling med hot reload mot dev-butikken
shopify theme dev --store <dev-butikk>

# Kjør linting (Theme Check) – skal være uten errors før commit
shopify theme check

# Hent siste endringer gjort i Theme Editor (JSON-maler/settings)
shopify theme pull --store <butikk> --only templates/*.json --only config/settings_data.json --only sections/*.json

# Push til et upublisert tema (aldri direkte til live)
shopify theme push --store <butikk> --unpublished

# Del en forhåndsvisning
shopify theme share
```

**Regler:**
- Kjør **aldri** `shopify theme push --live` eller `--allow-live` uten eksplisitt beskjed fra meg.
- Kjør `shopify theme check` etter endringer og fiks alle errors.
- Før push: pull JSON-filer først, slik at endringer merchant har gjort i Theme Editor ikke overskrives.

## 4. Mappestruktur

```
assets/        CSS, JS, bilder, fonter (flat struktur – ingen undermapper)
blocks/        Theme blocks (gjenbrukbare blokker med eget schema)
config/        settings_schema.json (definisjon) + settings_data.json (verdier)
layout/        theme.liquid, password.liquid
locales/       Oversettelser: *.json (storefront) og *.schema.json (editor)
sections/      Sections + section groups (header-group.json, footer-group.json)
snippets/      Gjenbrukbare Liquid-partials (render)
templates/     JSON-maler (+ customers/ for kontosider)
```

## 5. Liquid – konvensjoner

- Bruk `{% render 'snippet', param: value %}` – **aldri** `{% include %}`.
- Dokumenter snippets og blocks med `{% doc %}` øverst (parametre, typer, eksempel).
- Bruk `{% liquid %}`-tagger for logikk med flere linjer, for lesbarhet.
- Ingen hardkodet tekst for kunder: bruk `{{ 'section.key' | t }}` og legg nøkler i `locales/`.
- Schema-labels i editor: bruk `t:`-nøkler i `*.schema.json` når temaet er flerspråklig.
- Escape brukerinndata: `| escape` på verdier i attributter.
- Unngå tunge løkker over `collections`/`all_products`. Bruk paginering (`{% paginate %}`) der det trengs.
- Bilder: alltid `image_url` + `image_tag` med `widths`, `sizes` og `loading: 'lazy'` (unntatt bilde over folden: `fetchpriority: 'high'`, ingen lazy).
- Bruk `section.id` / `block.id` for unike ID-er og scoping.
- Legg `{{ block.shopify_attributes }}` på blokkens rotelement slik at Theme Editor fungerer.

### Sections og blocks
- Alle nye sections skal ha et komplett `{% schema %}` med `name`, `settings`, `blocks` (der relevant) og `presets`, slik at de kan legges til i editoren.
- Foretrekk **theme blocks** (`blocks/`-mappen) for innhold som skal gjenbrukes på tvers av sections; bruk `{% content_for 'blocks' %}` for å rendre dem.
- Bruk `enabled_on` / `disabled_on` for å styre hvor sections kan brukes.
- Gi settings fornuftige `default`-verdier – en section skal se bra ut rett etter at den er lagt til.
- Bruk riktig settingtype (`image_picker`, `color_scheme`, `richtext`, `url`, `product`, `collection`, `range` osv.), ikke `text` for alt.

## 6. CSS

- Bruk CSS custom properties fra `settings` (farger, fonter, spacing) definert i `layout/theme.liquid` eller en egen snippet.
- Komponentspesifikk CSS legges i sectionens `{% stylesheet %}` eller egen fil i `assets/` lastet kun der den brukes.
- Mobile-first. Breakpoints: `TODO` (f.eks. 750px og 990px).
- Klassenavn: BEM-lignende, prefikset med komponentnavn (`.product-card__title`).
- Ingen `!important` uten god grunn. Ingen CSS-rammeverk med mindre jeg ber om det.
- Respekter `prefers-reduced-motion`.

## 7. JavaScript

- Vanilla JS, ingen jQuery. Foretrekk Web Components (`customElements.define`) for interaktive komponenter.
- Last med `defer` eller `type="module"`. Ingen render-blokkerende scripts.
- Komponentspesifikk JS kun der komponenten brukes (`{% javascript %}` eller egen asset).
- Bruk Shopifys **Section Rendering API** og **Cart AJAX API** (`/cart/add.js`, `/cart/change.js`, `/cart.js`) for dynamisk oppdatering – ikke full sidereload.
- Bruk `routes`-objektet (`{{ routes.cart_add_url }}`) i stedet for hardkodede URL-er (viktig for flere markeder/språk).
- Støtt Theme Editor-events (`shopify:section:load`, `shopify:block:select` osv.) for komponenter som initialiseres med JS.

## 8. Ytelse

- Mål: god Lighthouse-score og Core Web Vitals (LCP, CLS, INP). Shopify krever minimum gjennomsnitt 60 for Theme Store.
- Responsive bilder med riktige `sizes`. Sett `width`/`height` for å unngå CLS.
- Minimér tredjeparts-scripts; app-scripts lastes via app embeds, ikke hardkodes.
- Preload kun kritiske ressurser (hovedfont, LCP-bilde).
- Unngå store Liquid-løkker og unødvendige `all_products`-oppslag.

## 9. Tilgjengelighet

- Semantisk HTML (`<button>` for handlinger, `<a>` for navigasjon).
- Alle bilder har `alt` (fra Shopify-bildet eller tomt for dekorative).
- Synlig fokusmarkering; full tastaturnavigasjon i meny, drawer, modaler og variantvelger.
- Modaler/drawers: fokusfelle, `Escape` lukker, fokus tilbake ved lukking.
- `aria-live` for handlekurv-oppdateringer og feilmeldinger.
- Fargekontrast minst 4.5:1 for brødtekst.

## 10. Norske/nordiske hensyn

- Priser: bruk `| money` / `| money_with_currency` – aldri formatér beløp manuelt.
- Vis MVA-informasjon riktig ("inkl. mva.") i tråd med markedsinnstillingene.
- Støtt Shopify Markets: språkvelger og land/valuta-velger via `localization`-formen.
- Husk norske tegn (æ, ø, å) i fonter og i handles/URL-er.

## 11. Apper og integrasjoner

- Tredjepartsapper skal integreres via **theme app extensions / app blocks**, ikke ved å lime inn kode i temafiler.
- Sections som skal kunne ta imot app-blokker, skal ha `{ "type": "@app" }` i `blocks`.
- Ikke slett kode som er lagt inn av apper uten å spørre.

## 12. Git og arbeidsflyt

- `main` = det som er live. Arbeid i feature-branches (`feature/...`, `fix/...`).
- Commit-meldinger: korte og beskrivende, på norsk eller engelsk (konsekvent).
- `config/settings_data.json` og `templates/*.json` endres ofte av merchant i editoren – vær forsiktig med merge-konflikter her.
- Hvis butikken er koblet til GitHub via Shopify GitHub-integrasjonen: endringer i editoren committes automatisk tilbake til branchen.

## 13. Ikke gjør dette

- Ikke rediger `config/settings_data.json` manuelt med mindre oppgaven krever det.
- Ikke bruk `{% include %}`, jQuery eller inline `<script>` med store mengder logikk.
- Ikke hardkod produkt-ID-er, handles, URL-er eller tekst.
- Ikke push til live-tema.
- Ikke installer npm-pakker eller byggverktøy uten å spørre.
- Ikke fjern eksisterende settings fra schema uten å avklare (det kan slette merchant-innhold).

## 14. Definisjon av ferdig

En oppgave er ferdig når:
1. `shopify theme check` gir ingen errors.
2. Endringen fungerer i `shopify theme dev` på mobil og desktop.
3. Nye sections/blocks kan legges til, konfigureres og fjernes i Theme Editor.
4. Tekst er oversettbar via `locales/`.
5. Tastaturnavigasjon og skjermleser-grunnleggende fungerer.
6. Du har gitt en kort oppsummering av endringene.

## 15. Nyttige ressurser

- Temadokumentasjon: https://shopify.dev/docs/storefronts/themes
- Liquid-referanse: https://shopify.dev/docs/api/liquid
- Theme Check: https://shopify.dev/docs/storefronts/themes/tools/theme-check
- Shopify CLI (themes): https://shopify.dev/docs/api/shopify-cli/theme
- Referansetema Dawn: https://github.com/Shopify/dawn
