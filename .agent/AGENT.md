# AI-Agent Instructions — aykutaskeri.de

Zentrale Anleitung für AI-Agenten. Immer zuerst diese Datei lesen.

---

## Projekt-Übersicht

**Ziel:** Headless WordPress CMS + Next.js 13 Frontend für den persönlichen CV von Aykut Askeri.

| Was | Wo |
|---|---|
| Lokaler Ordner | `/Users/aykut/dev/aykutaskeri.de` |
| GitHub Repo | https://github.com/aykustik/aykutaskeri-de |
| Staging URL | https://staging.aykutaskeri.de/cv/9kau1e4q/ |
| WordPress Backend | https://aykutaskeri.de/wp-admin — `ki-agent` / `0NY0jlB9Ce37!gu7lzPgQ*wH` |
| Vercel Projekt | `aykuts-projects-ba02f320/aykutaskeri.de` |
| Vercel Team Scope | `team_MTo6YjYbA3kRuoVSfs0LSvFw` |
| Vercel Projekt-ID | `prj_08oeFEJTYIEi81PYLwmdTUiX4Zvn` |
| GitHub User | aykustik — iphone.aykut@gmail.com |

**CV WordPress Post:** ID `1212`, Slug `9kau1e4q`
**API Endpoints:**
- `https://aykutaskeri.de/wp-json/wp/v2/cv?slug=9kau1e4q`
- `https://aykutaskeri.de/wp-json/acf/v3/cv/1212`

---

## Deploy-Workflow

```bash
# Build lokal prüfen
cd /Users/aykut/dev/aykutaskeri.de && npm run build

# Deployen (Hintergrund-Prozess, dauert ~2 min)
npx vercel --prod --yes

# Nach Deploy: Deployment-URL holen
npx vercel ls --yes | head -5

# Staging-Domain auf neues Deployment zeigen
npx vercel alias set <deployment-url> staging.aykutaskeri.de --scope team_MTo6YjYbA3kRuoVSfs0LSvFw
```

**Wichtig:** `staging.aykutaskeri.de` ist NICHT automatisch das neueste `--prod` Deployment — die Domain muss nach jedem Deploy manuell neu aliased werden (scope-Problem zwischen Team und Custom Domain).

---

## Architektur & Dateistruktur

```
src/
├── app/
│   ├── globals.css          ← Gesamtes Design-System (CSS-Vars, Animationen, Print, Prose)
│   ├── layout.tsx           ← Fonts (Montserrat + Roboto via Google), Metadata, metadataBase
│   ├── page.tsx             ← Home-Platzhalter
│   └── cv/[slug]/page.tsx   ← Dynamische CV-Route (SSR)
├── components/
│   ├── CVPage.tsx           ← Master-Layout, Section-Reihenfolge
│   ├── Header.tsx           ← 'use client' — Avatar, Name, Kontakt, Social, PDF-Button
│   ├── Hero.tsx             ← 'use client' — Gradient-BG, Blur-Blobs, Eyebrow, CTA-Buttons
│   ├── About.tsx            ← Über mich, Bereich-Kacheln, Zeichnet/Mag-Cards, Sprachen
│   ├── Skills.tsx           ← 'use client' — IntersectionObserver, WP-Farben pro Skill-Bar
│   ├── CTA.tsx              ← 'use client' — Deep-Indigo Gradient, Orange Pulse-Glow Button
│   ├── Experience.tsx       ← Timeline, Purple Dots, erster Dot hat Ping-Animation
│   ├── Education.tsx        ← 'use client' — Accordion (alle zu), Weiterbildung Grid + Ausbildung Timeline
│   ├── Portfolio.tsx        ← Projekt-Cards (card-interactive, weil klickbar)
│   └── Contact.tsx          ← 'use client' — Kontaktdaten + Kontaktformular (POST an WP REST-API)
├── lib/
│   ├── wordpress.ts         ← API-Client, normalizeACF() (Bindestriche → Unterstriche)
│   └── utils.ts             ← decodeHtml()
└── types/
    └── wordpress.ts         ← Alle ACF-Interfaces inkl. hard_skill_N_farbe
```

**Section-Reihenfolge (CVPage.tsx):**
Header → Hero → About → Skills → CTA → Experience → Weiterbildung → Ausbildung → Portfolio → Contact → Footer

---

## Design-System

### CSS-Variablen (globals.css)
```css
--brand-purple:        #575CC2   /* Primary — CTAs, Timeline, Divider, Bars */
--brand-purple-dark:   #3d4194   /* Hover */
--brand-purple-light:  #eeeffe   /* Icon-BG, Badge-BG */
--brand-purple-grad:   #818cf8   /* Gradient-Endpunkt */
--brand-emerald:       #059669   /* Achievements, Soft Skills, Weiterbildung */
--brand-emerald-light: #d1fae5
--brand-orange:        #F97316   /* NUR CTA-Button */
--brand-brick:         #e5533d   /* NUR "Mag ich nicht"-Icon */
--brand-brick-light:   #fef3f2
```

### Fonts
- **Headings:** Montserrat (700/800) — via `var(--font-montserrat)` / `.font-heading`
- **Body:** Roboto (400/500) — via `var(--font-roboto)` / Standard

### Cards
- `.card` — statisch, kein Hover (Weiterbildung, Experience, About, Skills)
- `.card-interactive` — Hover-Lift + Shadow (nur Portfolio und Accordion-Items mit Inhalt)

### Buttons
- Alle Buttons: Icon **rechts** (SVG nach Text im JSX)
- Apple-style Easing: `cubic-bezier(0.4, 0, 0.2, 1)` auf allen Transitions
- Klassen: `.btn-primary`, `.btn-outline`, `.btn-white`, `.btn-orange`
- `.btn-orange` hat `pulse-glow` Keyframe-Animation (CTA-Section)

### Prose / Rich-Text
- `.prose` — eigene Implementierung in globals.css (kein @tailwindcss/typography Plugin!)
- Deckt ab: `p`, `ul`, `ol`, `li`, `a`, `strong`, `em`, `h3`, `h4`, `blockquote`
- `.prose-sm` — kleinere Variante für Cards
- `.prose-invert` — für dunkle Hintergründe (CTA-Section)
- Links: purple, underline mit offset, external links bekommen `↗` suffix
- **Alle `dangerouslySetInnerHTML`-Container für Fließtext müssen `.prose` haben**

### Animationen
- `stripe-slide` — diagonale Streifen auf Skill-Bars (CSS-only)
- `float` — Sprachkreise schweben (3.5s, gestaffelt)
- `dot-ping` — erster Timeline-Dot pulsiert
- `shimmer` — Divider-Linie shimmer
- `pulse-glow` — CTA-Button Orange-Glow
- `bar-grow` — **entfernt** (war mit IntersectionObserver inkompatibel)
- Alle Animationen respektieren `prefers-reduced-motion`

---

## WordPress / ACF — Wichtige Erkenntnisse

- **ACF REST:** Feldnamen kommen mit **Bindestrichen** → `normalizeACF()` in `lib/wordpress.ts` normalisiert zu Unterstrichen
- **`sprachen_anzeigen`:** Gibt `"1"`, `"2"`, `"3"` als Strings zurück → `showLangCount()` in About.tsx
- **Sprach-Farben:** WP gibt Elementor CSS-Vars zurück (`var(--e-global-color-...)`) → werden ignoriert, Farben kommen aus `LANG_COLORS` Lookup nach Sprachname
- **`hard_skill_N_farbe`:** Enthält echte Hex-Farben (#4285f4 etc.) → direkt als Bar-Farbe verwenden. `resolveColor()` in Skills.tsx filtert Elementor-Vars raus und fällt auf brand-purple zurück
- **`hard_skill_N_starke`:** Kommt als String aus der API → `parseInt()` nötig
- **`ausbildung_text` = `weiterbildung_text`:** Identischer Inhalt in WP (WP-seitiges Datenproblem, nicht unser Bug)
- **CV Post ID:** 1212, Slug: `9kau1e4q`
- **`ansprechpartner_e_mail`:** Neues ACF-Feld — wenn befüllt, wird das E-Mail-Feld im Kontaktformular vorbelegt
- **`ansprechpartner`:** Kein Pflichtfeld mehr in WP — kann leer sein

---

## Kontaktformular

- **Endpoint:** `POST https://aykutaskeri.de/wp-json/custom/v1/send-contact`
- **Mu-Plugin:** `/wp-content/mu-plugins/contact-api.php` (Version 1.2) — lokal liegt die Datei unter `contact-api.php` im Projektwurzel
- **SMTP:** WP Mail SMTP Plugin, From: `kontakt@aykutaskeri.de`
- **Empfänger (TO):** ACF `e_mail` — wird vom Frontend als `cv_email` mitgeschickt
- **Reply-To:** E-Mail-Adresse des Formular-Absenders (`absender_email`)
- **From-Name:** `{ansprechpartner} von {firma}` oder nur `{firma}` wenn kein Ansprechpartner
- **Betreff:** `Positive/Negative Rückmeldung von {firma} auf „aykutaskeri.de"`

**POST-Body Felder:**
| Feld | Quelle |
|------|--------|
| `absender_email` | Formular-Eingabe (Pflicht) |
| `cv_email` | ACF `e_mail` |
| `cv_firma` | ACF `firma` |
| `cv_ansprechpartner` | ACF `ansprechpartner` |
| `stellenbezeichnung` | ACF `stellenbezeichnung` |
| `anstellungsart_gewunscht` | ACF `anstellungsart_gewunscht` |
| `beworbene_anstellungsart` | ACF `beworbene_anstellungsart` |
| `response` | `yes` / `no` (Pflicht) |
| `nachricht` | Formular-Eingabe (optional) |
| `url` | aktuelle Seiten-URL |
| `datum` | lokales Datum (de-DE) |
| `uhrzeit` | lokale Uhrzeit (de-DE) |

**Validierung (Frontend):**
- Radio-Buttons: Pflicht — bei Submit ohne Auswahl erscheint Fehlermeldung unter den Buttons
- E-Mail: Pflicht — Fehler erscheint bei `onBlur` (nicht beim Tippen), Browser-Validierung via `noValidate` deaktiviert
- Nachricht: Optional — Label trägt `(optional)`-Zusatz

---

## Bereich-Feld Verwendung

Das ACF-Feld `bereich` (z.B. "Online-Marketing") wird an mehreren Stellen mit festem Suffix verwendet:

| Komponente | Verwendung |
|---|---|
| Header | `{bereich} Enthusiast` (Suffix leicht ausgeblendet via `opacity-70`) |
| Hero | `"Und ich liebe {bereich}."` |
| — | CTA-Header kommt vollständig aus WP (`cta_header` Feld) |

---

## Print-Styles

- `@media print` in globals.css
- Versteckt: Hero, CTA, Kontakt-Section, alle Buttons, Progress-Bars, Timeline-Dots
- Skill-Bars → Plain Text (`{name} — {strength}%`)
- Sprachen → Plain Text Liste
- Schrift: 9.5pt Roboto, enges Line-Height
- Seitenumbruch vor `#berufserfahrung`
- `.no-print` / `.screen-only` / `.print-only` Helper-Klassen

---

## Bekannte Stolperfallen

1. **Vercel Alias muss nach jedem Deploy manuell gesetzt werden** (siehe Deploy-Workflow oben)
2. **`--ease-apple` außerhalb eines Selektors** macht den gesamten nachfolgenden CSS-Block ungültig → immer CSS-Variablen nur in `:root {}` oder einem Selektor deklarieren
3. **Server Components:** Event-Handler (`onClick` etc.) nur in `'use client'`-Komponenten. Crash-History: Portfolio.tsx hatte onMouseEnter in Server Component
4. **next/image braucht `remotePatterns`** in `next.config.js` für `aykutaskeri.de`
5. **`prose`-Klassen ohne Plugin:** `@tailwindcss/typography` ist NICHT installiert. Alle Prose-Styles sind manuell in globals.css. Niemals `prose-slate`, `prose-sm` etc. als Ersatz für eigene Styles behandeln — sie funktionieren nur weil wir `.prose-sm` selbst definiert haben.
6. **Kontaktformular `noValidate`:** Das `<form>` hat `noValidate` — Browser-Validierung ist bewusst deaktiviert. Eigene Validierungslogik in Contact.tsx. `type="email"` bleibt für Autofill-Support.
7. **Mu-Plugin contact-api.php:** Liegt lokal im Projektwurzel (nicht in `src/`). Muss bei Änderungen manuell nach `/wp-content/mu-plugins/contact-api.php` hochgeladen werden — kein automatisches Deployment.
