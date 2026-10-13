# Neari – Shopify-tema

Eget Online Store 2.0-tema bygget fra `Neari Shopify theme design/` og `Neari Brandbook details/`. Farger, typografi, knapper, merker og radier er hentet uendret fra brandbookens tokens (se `:root` i `assets/base.css`).

## Kom i gang

```bash
shopify theme check
shopify theme dev --store liltracker-no.myshopify.com
shopify theme push --store liltracker-no.myshopify.com --unpublished
```

`.shopifyignore` holder design- og brandbook-mappene utenfor push.

## Oppsett i Shopify admin

**Navigasjonsmenyer** (Innhold → Menyer): `main-menu` (Neari Go, Neari Care, Slik virker det `/#slik`, Ice Junior `/#ice`, Hjelp `/#hjelp`), `footer` (Klokker) og `footer-help` (Hjelp).

**Produkt-metafelt** (Innstillinger → Egendefinerte data → Produkter), namespace `neari`:

| Nøkkel | Type | Bruk |
| --- | --- | --- |
| `segment` | Enkel tekstlinje (`barn` / `eldre`) | Styrer merkefarge og fotnote. Standard `barn` |
| `badge` | Enkel tekstlinje | Overstyrer segmentmerket |
| `short_description` | Enkel tekstlinje | Tekst på produktkort og under tittelen |
| `spec_badge` | Enkel tekstlinje | Overstyrer «4G · GPS · SOS» |
| `fine_print` | Tekst på flere linjer | Overstyrer fotnoten |
| `points` | Liste, enkel tekstlinje | Fordelsliste, format `ikon\|tekst`, f.eks. `phone\|Ring tre faste nummer`. Ikoner: phone, map-pin, shield, school, battery, check |

**Farge-varianter:** Bruk en variantopsjon som heter «Farge» med swatches (hex) – de vises som runde fargeknapper.

**Ice Junior** vises kun i det norske markedet (merke, fotnote, Ice Junior-seksjon). I Sverige og Danmark vises «bruk ditt eget SIM, ingen Neari-avgift».

**Judge.me:** Legg til appen som app-blokk i produktsiden (blokk «Apper») i Theme Editor.

## Struktur

- `sections/` – forside (`hero`, `featured-products`, `feature-grid`, `segment-cards`, `ice-junior`, `faq`), header/footer-grupper, handlekurvskuff og alle `main-*`-sider
- `snippets/` – ikoner (Lucide), bilde, produktkort, merker, paginering
- `assets/` – `base.css` (tokens + delte komponenter), `global.js` (web components), selvhostede fonter, logoer
- `locales/` – `nb.default.json`, `sv.json`, `da.json`
