# aykutaskeri.de — Tasks & Backlog
# Automatisch gepflegt vom AI-Agenten nach jeder Session

<!-- TASKS-START -->

## Offene Tasks (Backlog)

---

- Status: todo
- Priority: medium
- Notes: **Icons vereinheitlichen und Icon-Bibliothek nutzen**
  - Aktuelle Situation: Icons sind als hardcodierte Inline-SVGs in Komponenten. Keine zentrale Bibliothek. ACF-Felder für Icons (`bereich_1_icon` bis `bereich_4_icon`) existieren, werden aber nicht verwendet.
  - Ziel: Zentrale Icon-Bibliothek (z.B. Lucide React), Icons über ACF auswählbar, einheitliches Look & Feel
  - Lösungsansatz: Lucide React installieren, ACF um Icon-Select erweitern, zentrale Icon-Komponente erstellen, Migration aller inline SVGs

---

- Status: todo
- Priority: low
- Notes: **Header: Bindestrich vor „Enthusiast" hinzufügen**
  - Aktuell: "X Enthusiast"
  - Soll: "X-Enthusiast" (mit Bindestrich direkt am Wort)

---

- Status: todo
- Priority: medium
- Notes: **Portfolio: „Ansehen"-Span unten bündig ausrichten**
  - Der grüne "Ansehen"-Span soll unabhängig von der Textlänge immer unten in der Card platziert sein
  - Alle "Ansehen"-Spans sollen in einer Reihe bündig sein (gleiche vertikale Position)
  - CSS: `mt-auto` auf dem Span oder Card-Container mit Flexbox/Grid

---

- Status: todo
- Priority: high
- Notes: **Kontaktformular: E-Mail über Website versenden** (nicht mailto-Link)
  - Formular soll Daten an WordPress senden
  - WordPress versendet E-Mail über SMTP
  - Nach Versand: Formular leeren + Success-Meldung anzeigen

---

- Status: todo
- Priority: medium
- Notes: **Timeline-Animation beim Scrollen**
  - Die vertikale Linie soll sich mit dem Scrollen mitbewegen (scroll-synced)
  - Punkte sollen "aktiviert" werden wenn sie in den Viewport kommen (IntersectionObserver)
  - Punkte sollen bündig (zentriert) sein mit dem ersten Element innerhalb des timeline-items:
    - Bei Berufserfahrung: Punkt zentriert mit period-badge
    - Bei Ausbildung: Punkt zentriert mit icon innerhalb der card

---

- Status: todo
- Priority: medium
- Notes: Scroll-triggered fade-in-up Entrance-Animationen für Sections (About, Experience, Portfolio) via IntersectionObserver — ähnlich wie Skill-Bars

---

- Status: todo
- Priority: low
- Notes: Produktiv-Deployment auf aykutaskeri.de (aktuell nur staging). Erst wenn Aykut zufrieden mit dem Stand ist.

---

- Status: todo
- Priority: medium
- Notes: Like-Funktion für Skills (kleine Gamification), welche Skills besonders beliebt sind + Übergabe ans Kontaktformular

---

- Status: todo
- Priority: medium
- Notes: External Link Icon neben Text-Links, die externe Websites in neuem Tab öffnen. Externe Links sollen immer `target="_blank"` mit `rel="noopener noreferrer"` haben.

---

- Status: todo
- Priority: medium
- Notes: Kennenlernen-Button: Icon ändern zu Scroll-down Icon (wie bei "Zu den Skills"), da nicht zu neuer Seite navigiert wird, sondern nach unten gescrollt.

---

- Status: todo
- Priority: medium
- Notes: On-Demand ISR — WordPress-Änderungen sollen ohne neuen Deploy sichtbar werden
  - Next.js API Route: /api/revalidate mit secret token
  - WordPress: Webhook bei save_post/post Update
  - Siehe: https://nextjs.org/docs/app/building-your-application/data-fetching/revalidation#on-demand-revalidation

---

- Status: todo
- Priority: low
- Notes: `ausbildung_text` und `weiterbildung_text` sind in WordPress identisch — Aykut muss das in WP korrigieren

<!-- TASKS-END -->

<!-- NOTES-START -->

## Erledigte Punkte (diese Session)

- ✅ Skills.tsx: WP `hard_skill_N_farbe` als Bar-Farbe, `resolveColor()` für Elementor-Var-Fallback
- ✅ Card-Hover: `.card` (statisch) vs `.card-interactive` (nur klickbare Cards)
- ✅ Progress-Bar: `bar-grow` Keyframe entfernt, Width 100% JS-gesteuert via IntersectionObserver
- ✅ Staging-Domain-Problem behoben: Alias muss nach jedem Deploy manuell gesetzt werden
- ✅ Header: `{bereich} Enthusiast` Sub-Headline
- ✅ Buttons: Apple-easing, Icon rechts (SVG nach Text im JSX), optimierte Shadows
- ✅ Soft-Skill-Badges: Hover entfernt (nicht klickbar)
- ✅ Education.tsx: Accordion für Weiterbildung + Ausbildung, alle zugeklappt
- ✅ Prose-Styles: vollständige eigene Implementierung (p, ul, ol, li, a, strong, em, h3, h4, blockquote, prose-sm, prose-invert)
- ✅ Button-CSS-Bug: `--ease-apple` außerhalb Selektor hat gesamten .btn-Block invalidiert — behoben
- ✅ `.agent/AGENT.md` + `tasks.md` aktualisiert

<!-- NOTES-END -->
