Neari lager GPS-smartklokker som holder familien nær – barna på vei til skolen og foreldrene som bor alene. Navnet kommer fra engelske *near*: vi selger ikke overvåking, vi selger nærhet.

**Merkeløfte:** *Always near.* – på norsk: *Alltid nær.*

## Posisjonering

- **Hva:** 4G GPS-smartklokker med to-veis samtale, SOS-knapp, sanntidsposisjon og skolemodus.
- **For hvem:** Foreldre til barn 5–12 år, og voksne barn som vil ha trygghet rundt en eldre forelder.
- **Hvorfor oss:** Én engangssum for klokka, og så 0 kr i måneden for barn under 13 år (se Ice Junior under). Ingen bindingstid, ingen egen Neari-abonnementsavgift.
- **Mot hvem:** Xplora og Garmin Bounce, som begge låser kunden til et månedlig abonnement.

## Hovedbudskap: 0 kr i måneden med Ice Junior

Dette er vårt sterkeste salgsargument i Norge. Formuler det alltid presist:

- Ice Junior er et gratis mobilabonnement fra **Ice** for barn **under 13 år**: 0 kr/mnd og 1 GB data.
- Foreldrene trenger **ikke** være Ice-kunder.
- Datakvoten gjelder kun i Ices eget nett – oppfordre alltid til å sjekke Ices dekningskart.
- Abonnementet fungerer bare i Norge.

**Slik sier vi det:**
- Overskrift: «Én gang betalt. 0 kr i måneden.»
- Undertekst: «Neari fungerer med Ice Junior – gratis mobilabonnement for barn under 13 år.»
- Liten tekst (alltid med): «Ice Junior leveres av Ice. Gjelder barn under 13 år, kun i Norge og i Ices nett. Sjekk dekning på ice.no.»

**Regler:**
- Bruk `Badge` med variant «Ice Junior» – aldri Ices logo eller fargeprofil uten skriftlig avtale med Ice.
- Ikke kall det «gratis klokke» eller antyd at Neari står bak abonnementet.
- Overfor eldre-segmentet: Ice Junior gjelder ikke. Der selger vi på «fungerer med vanlig nano-SIM fra alle operatører».
- I Sverige og Danmark finnes ikke tilbudet – der er budskapet «bruk ditt eget SIM, ingen Neari-avgift».

## Tone of voice

Varm, rolig og konkret. Vi snakker som en trygg nabo, ikke som et sikkerhetsselskap.

- **Du-form**, alltid. «Du ser hvor barnet ditt er» – ikke «Brukeren kan spore».
- **Nærhet, ikke frykt.** Skriv om å ringe hjem og komme trygt fram, ikke om farer og kidnapping.
- **Konkret.** «Ring tre faste nummer» slår «sømløs kommunikasjon».
- **Kort.** Overskrifter under åtte ord. Ingen utropstegn i overskrifter.
- **Ingen emoji** i produkttekst og annonseoverskrifter.
- **Språk:** Merkenavn og slagord på engelsk (*Always near.*). All kundetekst på det lokale språket (bokmål i Norge, svensk i Sverige, dansk i Danmark).

| Skriv | Ikke skriv |
| --- | --- |
| Vit at hun kom fram. | Overvåk barnet ditt 24/7! |
| Et trykk, så ringer klokka deg. | Avansert SOS-nødvarslingssystem |
| Mamma kan ringe, men slipper å bruke smarttelefon. | Perfekt for senile eldre |

## Logo

- Bruk logofilene i `assets/Logo` (SVG): ordmerket «neari» i små bokstaver med pingen – en coral prikk med to buer som sprer seg ut, et signal om at noen er nær. Bruk `neari-logo.svg` på lys bakgrunn, `neari-logo-negativ.svg` på mørk, `neari-ping.svg` for pingen alene og `neari-appikon.svg` som app-ikon. Tegn eller skriv aldri logoen på nytt.
- Fjord-ordmerke på `sand` eller hvit; sand-ordmerke på `fjord`. Pingen er alltid `coral`.
- Frisone rundt logoen: minst høyden på bokstaven «n».
- Minste størrelse: 20px høyde digitalt, 8 mm på trykk og emballasje.
- Pingen alene kan brukes som app-ikon, favicon og på klokkas oppstartsskjerm.
- Ikke strekk, roter, legg skygge på eller bytt farge på pingen.

## Farger

- **Sidebakgrunn:** `sand`. Kort ligger på `surface-raised`.
- **Tekst:** `ink`, sekundært `ink-muted`. Ingen annen tekstfarge for brødtekst.
- **Merkefargene** er `fjord` (tillit) og `coral` (varme). Fordeling i markedsmateriell: om lag 60 % `sand`/lyst, 25 % `fjord`, 10 % `coral`, 5 % `sage`/`sky`.
- **Handling:** Én primærknapp per visning i `coral-strong`. Lenker i `coral-strong`.
- **Segment-aksent:** `coral` leder i barnekommunikasjon, `sage` leder i eldre-kommunikasjon. Begge bruker `fjord` som anker.
- Aldri brødtekst på `coral` – kontrasten er for lav. Bruk `fjord` på coral kun for display-tekst på minst 24px.
- Ingen gradienter.

## Typografi

- **Display:** Bricolage Grotesque (Google Fonts) i `display-xl`, `display-l` og `heading`. Brukes til overskrifter og kampanjebudskap.
- **Tekst:** Figtree (Google Fonts) i `body-l`, `body`, `body-s` og `label`.
- Overskrifter med setningsstor forbokstav, ikke Title Case og ikke versaler.
- `label` kan settes i versaler med 0.06em sporing for små merker.
- Eldre-segmentet: minst `body-l` for brødtekst.

## Form og layout

- Myke former: knapper og merker i `radius-pill`, kort i `radius-m`, store bilder i `radius-l`.
- Luft fremfor linjer: skill seksjoner med `space-12` (mobil) og `space-20` (desktop), ikke med streker.
- Bruk `line` bare til kortkanter og tabeller.
- Ingen skygger utenom en svak løfting på modaler.
- Fokusring: 2px solid `focus` med 2px avstand, på alle interaktive elementer.

## Bildestil

- Ekte øyeblikk i dagslys: barn på sykkel til skolen, besteforeldre på tur, en telefonsamtale fra håndleddet.
- Klokka skal synes, men ansiktet og situasjonen bærer bildet.
- Nordisk lys og natur, varme hudtoner, ingen stockfoto-smil rett i kamera.
- Ikke vis barn i farlige eller skremmende situasjoner, og ikke vis kartsporing som overvåkingsestetikk med røde sikter.
- Produktbilder på `sand`- eller `sky`-bakgrunn, aldri på ren hvit.

## Ikoner

- Bruk Lucide (open source, linjeikoner) i 1.75px strek, farget `ink` eller `fjord`.
- Faste ikoner for kjernefunksjoner: `phone` (samtale), `map-pin` (posisjon), `shield` (SOS), `school` (skolemodus), `battery` (batteri).
- Ingen emoji som ikoner.

## Produktnavn

- Hold det enkelt: **Neari** + modell. Forslag: *Neari Go* (barn), *Neari Care* (eldre).
- Skriv alltid «Neari» med stor N i løpende tekst. Ordmerket i logoen er i små bokstaver.
