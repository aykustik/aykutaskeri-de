# aykutaskeri.de — Tasks & Backlog
# Automatisch gepflegt vom AI-Agenten nach jeder Session

<!-- TASKS-START -->

## Offene Tasks (Backlog)

---

- Status: todo
- Priority: medium
- Notes: **Hero/Intro-Section: Buttons unter Text oder rechts?**
  - Issue: #10
  - Aktuell: Buttons rechts neben dem Text (Flexbox mit md:justify-between)
  - Frage: Sollen die Buttons unter dem Textinhalt platziert werden?
  - Nächste Schritte: Visuelle Evaluierung, Decision treffen, ggf. CSS anpassen

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
- Priority: low
- Notes: `ausbildung_text` und `weiterbildung_text` sind in WordPress identisch — Aykut muss das in WP korrigieren

<!-- TASKS-END -->

<!-- NOTES-START -->

## Erledigte Punkte (diese Session)

- ✅ Kontaktformular vollständig umgebaut (Issue #6):
  - Mu-Plugin `contact-api.php` v1.2 → `/wp-content/mu-plugins/` (lokal: `contact-api.php`)
  - SMTP via WP Mail SMTP, Empfänger aus ACF `e_mail`, Reply-To: Absender-E-Mail
  - From-Name: `{ansprechpartner} von {firma}` oder nur `{firma}`
  - Betreff: `Positive/Negative Rückmeldung von {firma} auf „aykutaskeri.de"`
  - Neues Pflichtfeld: E-Mail des Absenders, blur-Validierung, kein Browser-Tooltip (`noValidate`)
  - E-Mail-Feld aus ACF `ansprechpartner_e_mail` vorbelegt
  - Feldkennzeichnung: nur optionale Felder mit `(optional)`
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
