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

- Status: completed
- Priority: low
- Notes: **Header: Bindestrich vor „Enthusiast" hinzugefügt**
  - Erledigt: `Header.tsx` und `layout.tsx` angepasst
  - "X Enthusiast" → "X-Enthusiast"

---

- Status: completed
- Priority: medium
- Notes: **Portfolio: „Ansehen"-Span unten bündig ausgerichtet**
  - Erledigt: `Portfolio.tsx` mit Flexbox angepasst
  - Cards: `flex flex-col`, Content: `flex-grow`, Span: `mt-auto pt-3`

---

- Status: completed
- Priority: high
- Notes: **RankMath SEO Integration für Headless CMS**
  - Issue: #16 (geschlossen)
  - PR: #17 (gemerged)
  - Erledigt: SEO-Metadaten werden jetzt aus RankMath via REST API geladen
  - Dokumentation: `RANKMATH-SEO.md` erstellt
  - Änderungen:
    - Types: `RankMathMeta` und `RankMathAPIResponse` Interfaces
    - API-Client: `getRankMathMeta()` und `parseRankMathHead()` Methoden
    - Metadata-Generation: `cv/[slug]/page.tsx` angepasst
  - Unterstützt: Title, Description, OG, Twitter Cards, Canonical, Robots

---

- Status: todo
- Priority: medium
- Notes: **Print-Ansicht: Enthusiast-Suffix fehlt im Header**
  - Issue: #15
  - Problem: Im Print-Header fehlt "-Enthusiast" hinter dem Bereich-Text
  - Screen zeigt korrekt: "Online-Marketing-Enthusiast"
  - Print zeigt nur: "Online-Marketing"
  - Möglicherweise andere Komponente/Layout für Print verwendet

---

- Status: todo
- Priority: low
- Notes: `ausbildung_text` und `weiterbildung_text` sind in WordPress identisch — Aykut muss das in WP korrigieren

<!-- TASKS-END -->

<!-- NOTES-START -->

## Erledigte Punkte (diese Session)

- ✅ **RankMath SEO Integration vollständig implementiert und gemerged (Issue #16, PR #17)**:
  - Dokumentation `RANKMATH-SEO.md` mit Setup-Anleitung und API-Dokumentation
  - Types: `RankMathMeta` und `RankMathAPIResponse` Interfaces
  - API-Client: `getRankMathMeta()` und `parseRankMathHead()` Methoden
  - Metadata-Generation in `cv/[slug]/page.tsx` angepasst
  - Unterstützung für Title, Description, Canonical, Robots, Open Graph, Twitter Cards
  - OG Image Hinweis dokumentiert (kein Fallback für Custom Post Types)
- ✅ **Print-CV vollständig implementiert und in main gemerged**:
  - 2-Spalten Layout (35/65) mit Inter Font
  - Header mit Profilbild, Name, Titel, Kontakt
  - Linke Spalte: Das zeichnet mich aus, Skills (3 Gruppen), Soft Skills, Sprachen
  - Rechte Spalte: Berufserfahrung (2 Seiten aufgeteilt)
  - Seite 2: Kontakt-Section mit Icons
  - Einheitliche blaue Überschriften mit Divider
  - Zeiträume: 9pt (kleiner)
  - Listenpunkte für Job-Beschreibungen
  - Branch `ai-task-print-cv` gemerged und gelöscht
- ✅ Kontaktformular vollständig umgebaut (Issue #6):

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
