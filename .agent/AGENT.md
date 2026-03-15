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
- `https://wp.aykutaskeri.de/wp-json/wp/v2/cv?slug=9kau1e4q`
- `https://wp.aykutaskeri.de/wp-json/acf/v3/cv/1212`

---

## Deploy-Workflow (Git-Branch-basiert)

### Überblick
| Branch | Umgebung | URL | Trigger |
|--------|----------|-----|---------|
| `main` | Production | https://aykutaskeri.de | Auto bei Push |
| `staging` | Staging | https://staging.aykutaskeri.de | Auto bei Push |
| `feature/*` | - | - | Manuell testen |

### Workflow

```bash
# 1. Feature entwickeln
git checkout -b feature/neue-funktion
# ... Entwicklung ...
git add . && git commit -m "feat: Beschreibung"
git push origin feature/neue-funktion

# 2. Auf Staging testen
git checkout staging
git merge feature/neue-funktion
git push origin staging
# → Automatisch: https://staging.aykutaskeri.de

# 3. Nach Production deployen
git checkout main
git merge staging
git push origin main
# → Automatisch: https://aykutaskeri.de
```

### Lokal bauen (Vor dem Commit)

```bash
cd /Users/aykut/dev/aykutaskeri.de
npm run build
```

**Hinweis:** Kein manuelles `npx vercel` mehr nötig — Deployments laufen automatisch über Git-Push!

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

- **Endpoint:** `POST https://wp.aykutaskeri.de/wp-json/custom/v1/send-contact`
- **Mu-Plugin:** `/wp-content/mu-plugins/headless-api.php` (Version 1.2)
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

## Headless Auth System

### Problemstellung

Der normale WordPress-REST-Cookie-Auth mit Nonce funktioniert im Headless-Kontext nicht zuverlässig:
- Nonce ist für Cross-Origin-Requests umständlich
- `is_user_logged_in()` im REST-Kontext erkennt durchgereichte Cookies nicht

### Lösung

Serverseitige Cookie-Validierung via Next.js als Vermittlungsschicht:

```
Browser → Next.js (/api/auth/status) → WordPress (headless-auth/v1/status)
         ← JSON Response ← Cookie-Validierung ←
```

### WordPress-Endpoint

- **URL:** `GET /wp-json/headless-auth/v1/status`
- **Mu-Plugin:** `headless-api.php`
- **Cookie-Validierung:** Direkt via `wp_validate_auth_cookie()` (nicht is_user_logged_in)
- **Caching:** Keines (immer frisch)

### Next.js Server-Route

- **URL:** `GET /api/auth/status`
- **Zweck:** Serverseitige Cookie-Weiterleitung an WordPress
- **Technologie:** App Router (`src/app/api/auth/status/route.ts`)
- **Credentials:** `include` (Cookie durchreichen)

### Response-Struktur

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `logged_in` | boolean | Ob User eingeloggt |
| `can_edit` | boolean | Ob User `edit_posts` Capability hat |
| `roles` | string[] | WordPress-Rollen des Users |
| `user` | object? | `{id, display_name, email}` |

**Beispiel-Response (eingeloggt mit Schreibrechten):**
```json
{
  "logged_in": true,
  "can_edit": true,
  "roles": ["administrator"],
  "user": {
    "id": 1,
    "display_name": "Aykut Askeri",
    "email": "admin@example.com"
  }
}
```

**Beispiel-Response (nicht eingeloggt):**
```json
{
  "logged_in": false,
  "can_edit": false,
  "roles": [],
  "user": null
}
```

### Berechtigungsprüfung

- **Capability für `can_edit`:** `edit_posts`
- **Typische Rollen mit dieser Capability:** `administrator`, `editor`, `author`
- **Hinweis:** Rollen sind ergänzende Debug-/UI-Information – die finale Berechtigungsentscheidung erfolgt capability-basiert.

### AdminFloatingButton

- **Logik:** Zeige Button wenn `can_edit === true`
- **Fetch:** `/api/auth/status` (server-to-server, nicht client-seitig direkt zu WP)
- **Fallback:** Bei Fehler → Button nicht anzeigen

### Cookie-Voraussetzungen

Für funktionierende Auth-Erkennung:

| Attribut | Wert | Hinweis |
|----------|------|---------|
| Domain | `.aykutaskeri.de` | Mit Punkt für Subdomains |
| Path | `/` | Ganzes Domain |
| Secure | `true` | Nur HTTPS |
| SameSite | `None` | Für Cross-Origin |

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

1. **Git Workflow:** Immer `staging` vor `main` — nie direkt Feature → main
2. **`--ease-apple` außerhalb eines Selektors** macht den gesamten nachfolgenden CSS-Block ungültig → immer CSS-Variablen nur in `:root {}` oder einem Selektor deklarieren
3. **Server Components:** Event-Handler (`onClick` etc.) nur in `'use client'`-Komponenten. Crash-History: Portfolio.tsx hatte onMouseEnter in Server Component
4. **next/image braucht `remotePatterns`** in `next.config.js` für `aykutaskeri.de`
5. **`prose`-Klassen ohne Plugin:** `@tailwindcss/typography` ist NICHT installiert. Alle Prose-Styles sind manuell in globals.css. Niemals `prose-slate`, `prose-sm` etc. als Ersatz für eigene Styles behandeln — sie funktionieren nur weil wir `.prose-sm` selbst definiert haben.
6. **Kontaktformular `noValidate`:** Das `<form>` hat `noValidate` — Browser-Validierung ist bewusst deaktiviert. Eigene Validierungslogik in Contact.tsx. `type="email"` bleibt für Autofill-Support.
7. **Mu-Plugin headless-api.php:** Liegt im `mu-plugins/` Ordner. Muss bei Änderungen manuell nach `/wp-content/mu-plugins/` hochgeladen werden — kein automatisches Deployment.
