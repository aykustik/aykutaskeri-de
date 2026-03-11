# aykutaskeri.de — Tasks & Backlog
# Automatisch gepflegt vom AI-Agenten nach jeder Session

<!-- TASKS-START -->

## Offene Tasks (Backlog)

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
- Priority: low
- Notes: `ausbildung_text` und `weiterbildung_text` sind in WordPress identisch — Aykut muss das in WP korrigieren (verschiedene Intro-Texte für die beiden Sections)

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
