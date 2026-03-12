# Epic: Interaktive Recruiter-UX im Online-CV

## Ziel

Das Online-CV soll dezente, professionelle Interaktionen für Recruiter/CEOs ermöglichen.
Diese Interaktionen sollen:

- das Interesse des Besuchers strukturieren
- relevante Inhalte für ein mögliches Kennenlerngespräch vorbereiten
- wertvolle Insights für die Optimierung des CVs liefern
- bei Kontaktaufnahme in komprimierter Form an das Kontaktformular übergeben werden

Die Umsetzung soll **subtil, hochwertig und nicht verspielt** sein.
Kein klassisches Gamification-System mit Punkten, Badges, Prozent-Scores oder auffälligen Animationen – das kippt bei einem CV schnell von originell zu unseriös.

---

# Issue 1: Skill-Favoriten im Skills-Bereich (freie Auswahl)

## Beschreibung

Im Skills-Bereich soll pro Skill eine dezente Möglichkeit bestehen, diesen als relevant/interessant zu markieren.

## Ziel

Besucher können schnell signalisieren, welche Skills aus ihrer Sicht besonders relevant oder interessant sind.

## Anforderungen

- Pro Skill eine subtile Interaktionsmöglichkeit hinzufügen
- Kein Social-Media-Look, kein auffälliges Like-System
- Auswahl soll lokal in der Session gespeichert werden
- Mehrfachauswahl erlauben
- Markierte Skills sollen später für Formular-Kontext und Analytics verfügbar sein

## Mögliche UI-Richtung

- Bookmark / Stern / dezenter „Relevant"-State
- Kein großes Heart/Like-Muster, falls es zu verspielt wirkt

## Hinweis

Dieses Issue ist die Basis für Issue 2 (Top-3-Logik). Beide können zusammengelegt werden, wenn Top-3 direkt als primärer Mechanismus umgesetzt wird.

## Zu speichernde Daten

- Skill-ID
- Skill-Label
- Zeitpunkt der Interaktion
- Aktion: selected / unselected

## Priorität

medium

---

# Issue 2: Top-3-Skills Auswahl als primärer Skill-Interaktionsmechanismus

## Beschreibung

Besucher können maximal 3 Skills als besonders relevant markieren. Dies ist der empfohlene primäre Ansatz gegenüber unbegrenzten freien Favoriten.

## Ziel

Eine fokussierte Auswahl mit höherem Signalwert als bloße Likes – direkt verwertbar als Gesprächseinstieg.

## Anforderungen

- Maximal 3 Skills auswählbar
- Falls mehr als 3 markiert werden, klare UX-Entscheidung:
  - entweder limitieren
  - oder Top-3 visuell hervorheben
- Die finale Auswahl soll an das Kontaktformular übergeben werden können

## Nutzen

- Höherer Signalwert als bloße Likes
- Besserer Gesprächseinstieg
- Weniger Rauschen in den Daten

## Zu speichernde Daten

- Reihenfolge der Auswahl
- finale Top-Auswahl

## Priorität

**high** *(von medium hochgestuft – empfohlener Kernmechanismus)*

---

# Issue 3: Merken-Funktion für Gesprächspunkte

## Beschreibung

Bestimmte Inhalte im CV sollen vom Besucher für ein späteres Gespräch markiert werden können.

## Ziel

Recruiter/CEOs können relevante Themen aktiv „vormerken", sodass diese bei einer Kontaktaufnahme automatisch als Gesprächsanlass mitgesendet werden.

## Geeignete Inhalte

- Skills
- Berufserfahrungs-Stationen
- Weiterbildung
- besondere Projekte / Schwerpunkte
- Themenblöcke wie SEO, CRO, UX, Branding, B2B

## Anforderungen

- Dezente „Merken"-/„Darüber sprechen"-Funktion
- Interaktion soll nicht aufdringlich sein
- Gemerkte Inhalte in einer Session-Liste sammeln
- Liste später an Kontaktformular übergeben

## Zu speichernde Daten

- Content-Typ
- Content-ID
- Content-Titel / Label
- Aktion: bookmarked / removed

## Priorität

medium

---

# Issue 4: Rollen-/Perspektivenwahl für Besucher

## Beschreibung

Besucher sollen optional eine Perspektive auswählen können, aus der sie das Profil betrachten.

## Ziel

Leichte Personalisierung der Erfahrung und bessere Interpretation von Interaktionen.

## Mögliche Optionen

- Recruiter
- CEO / Founder
- Marketing Lead
- optional: HR / Hiring Manager

## Anforderungen

- Kleine, subtile Auswahlmöglichkeit
- Auswahl ist optional
- Auswahl wird in der Session gespeichert
- Kann später für Formular-Kontext und Analytics verwendet werden

## Nutzen

- Bessere Einordnung der Interaktionen
- Kontext für spätere Kontaktanfragen
- Optionale Basis für spätere UI-Personalisierung

## Zu speichernde Daten

- gewählte Rolle/Perspektive
- Zeitpunkt der Auswahl

## Priorität

low to medium

---

# Issue 5: Wichtigste Interessensbereiche auswählen

## Beschreibung

Besucher sollen angeben können, welche Bereiche des Profils für sie am interessantesten oder relevantesten sind.

## Ziel

Zusätzlicher Kontext für Gesprächsanbahnung und qualitative Insights zur Optimierung des CVs.

## Mögliche Optionen

- SEO
- UX/UI
- Conversion-Optimierung
- Webdesign
- Branding
- B2B-Erfahrung
- Strategie
- operative Umsetzung

## Anforderungen

- Einfache Mehrfachauswahl
- Subtile Einbindung, z. B. als Chips oder Auswahlfelder
- Auswahl lokal speichern
- Bei Kontaktanfrage als Kontext ergänzen

## Zu speichernde Daten

- ausgewählte Interessensbereiche
- Reihenfolge oder Anzahl der Interaktionen

## Priorität

medium

---

# Issue 6: Kontaktformular um Session-Kontext erweitern

## Beschreibung

Das Kontaktformular soll relevante Interaktionen aus der aktuellen Session automatisch übernehmen und in strukturierter Form mitsenden.

## Ziel

Bei Kontaktaufnahme sollen nicht nur Kontaktdaten und Nachricht gesendet werden, sondern auch der inhaltliche Kontext aus der CV-Interaktion.

## Anforderungen

- Relevante Session-Daten beim Absenden anreichern
- Nur sinnvolle, komprimierte Daten übergeben
- Keine rohe Event-Liste senden
- Daten für dich lesbar und direkt nutzbar zusammenfassen

## Kontextblock in der Anfrage

Mögliche Felder:

- markierte Skills
- Top-3-Skills
- gemerkte Gesprächsthemen
- gewählte Perspektive
- interessante Bereiche
- meistbesuchte Sections der Session
- Antwort auf Abschlussfrage (Issue 13)

## Beispiel für Ausgabe

- Relevante Skills: SEO, UX/UI, Conversion-Optimierung
- Gesprächsthemen: B2B-Webdesign, Positionierung
- Perspektive: CEO / Founder
- Besonders interessante Bereiche: Berufserfahrung, Skills

## Priorität

high

---

# Issue 7: Sichtbare Vorschau des übergebenen Kontexts im Formular

## Beschreibung

Falls Session-Kontext an das Kontaktformular übergeben wird, soll dieser für den Besucher sichtbar gemacht werden.

## Ziel

Mehr Transparenz und bessere UX. Der Besucher soll verstehen, welche Interaktionen zusammen mit der Anfrage übermittelt werden.

## Anforderungen

- Kleinen Kontextblock im Formular anzeigen
- Nur anzeigen, wenn relevante Session-Daten vorhanden sind
- Inhalt klar und kompakt formulieren
- Optional einzelne Einträge vor Absenden entfernbar machen

## Beispiel-Text

„Folgende ausgewählte Schwerpunkte werden Ihrer Anfrage hinzugefügt."

## Nutzen

- transparente Datennutzung
- vertrauenswürdiger Eindruck
- Nutzer behält Kontrolle

## Priorität

high

---

# Issue 8: Aggregierte Session-Insights für interne Auswertung

## Beschreibung

Interaktionen im Online-CV sollen zusätzlich aggregiert für interne Insights nutzbar gemacht werden.

## Ziel

Erkennen, welche Inhalte häufig Interesse auslösen und welche Interaktionen häufiger zu Kontaktaufnahmen führen.

## Anforderungen

- Aggregierte Auswertung ermöglichen
- Kein Fokus auf invasive Einzelnutzer-Überwachung
- Auswertung eher auf Content- und Funnel-Ebene
- Kontakt-Conversions mit Session-Interessen verknüpfbar machen

## Mögliche Kennzahlen

- meistmarkierte Skills
- meistgemerkte Themen
- häufigste Perspektivenwahl
- meistinteragierte Sections
- Kontaktquote nach Interaktionstyp
- häufige Kombinationen von Interessen
- häufigste Antworten auf die Abschlussfrage

## Priorität

medium

---

# Issue 9: Meistbesuchte Sections der Session erfassen

## Beschreibung

Es soll erfasst werden, welche Abschnitte des CVs innerhalb einer Session besonders aktiv betrachtet wurden.

## Ziel

Zusätzliche Hinweise darauf, welche Inhalte besonders relevant oder überzeugend wirken.

## Anforderungen

- Keine invasive Tiefenmessung
- Stattdessen pragmatische Section-View-Logik
- z. B. Section als „gesehen" markieren, wenn sie sinnvoll im Viewport war
- Optional zusätzliche Gewichtung bei aktiver Interaktion innerhalb der Section

## Zu speichernde Daten

- Section-ID / Name
- first_seen
- interaction_count
- optional: dwell bucket statt exakter Sekunden

## Hinweis

Keine pixelgenaue Tracking-Logik, keine Mausbewegungsanalyse.

## Priorität

medium

---

# Issue 10: Floating Session-Kontext-Widget für Besucher

## Beschreibung

Eine dezente, persistente UI-Komponente, die dem Besucher seine aktuell gesammelten Markierungen anzeigt und direkten Zugang zum Kontaktformular bietet.

## Ziel

Gemerkte Inhalte und ausgewählte Skills jederzeit sichtbar halten, ohne dass der Besucher scrollen oder suchen muss.

## Mögliche Inhalte

- gemerkte Themen anzeigen
- ausgewählte Skills anzeigen
- schneller Sprung zum Kontaktformular
- optionale Möglichkeit, einzelne Einträge zu entfernen

## Anforderungen

- sehr reduzierte, elegante UI
- nur anzeigen, wenn mindestens eine Interaktion stattgefunden hat
- mobil und desktop sinnvoll lösbar

## Priorität

low to medium

---

# Issue 11: Nur relevante Interaktionen ins Formular übernehmen

## Beschreibung

Es soll eine klare Filterlogik geben, welche Session-Daten bei Kontaktanfrage tatsächlich mitgesendet werden.

## Ziel

Vermeidung von Datenmüll und unnötig technischen Rohdaten in der Kontaktanfrage.

## Anforderungen

- Nur verdichtete, hochwertige Signale übernehmen
- Keine vollständige Event-Historie
- Keine technischen Debugdaten
- Keine unnötig granularen Zeitdaten

## Ins Formular übernehmen

- markierte Skills
- Top-3-Skills
- gemerkte Themen
- Perspektive
- interessante Bereiche
- ggf. meistrelevante Sections
- Antwort auf Abschlussfrage (Issue 13), falls vorhanden

## Nur intern behalten

- einzelne Klickevents
- Toggle-Historie
- Zeitstempel pro Kleininteraktion
- technische Session-Rohdaten

## Priorität

high

---

# Issue 12: Datenschutz- und Transparenzkonzept für Interaktionsdaten

## Beschreibung

Für alle interaktiven CV-Funktionen soll geprüft und definiert werden, wie transparent und datensparsam die Speicherung und Übermittlung erfolgt.

## Ziel

Die Features sollen professionell wirken und kein unangenehmes Tracking-Gefühl erzeugen.

## Anforderungen

- Nur sinnvolle Daten erfassen
- Datenübermittlung bei Kontaktaufnahme transparent machen
- Keine unnötigen personenbezogenen Trackingmuster
- Formulierungen für Transparenzhinweise definieren
- Optional prüfen, ob Einwilligungs-/Hinweistext nötig ist

## Fokus

Nicht maximale Datensammlung, sondern hochwertige, nachvollziehbare Kontextdaten.

## Priorität

high

---

# Issue 13: Abschlussfrage „Was war für Sie besonders relevant?"

## Beschreibung

Am Ende der Session oder direkt vor dem Kontaktformular soll dem Besucher eine kurze, optionale Abschlussfrage gestellt werden.

## Ziel

Aktive, qualitative Selbsteinschätzung des Besuchers einholen – ergänzend zu den passiven Interaktionsdaten. Das gibt einen direkten, unverfälschten Hinweis auf das eigentliche Interesse.

## Mögliche Umsetzung

- Einfache Freitextfrage: „Was hat Sie an diesem Profil besonders angesprochen?"
- Oder als vorausgefüllte Mehrfachauswahl mit optionalem Freitextfeld
- Eingebettet direkt oberhalb oder innerhalb des Kontaktformulars
- Alternativ als kurze Modal-/Overlay-Frage beim Sprung zum Formular

## Anforderungen

- Antwort ist optional, kein Pflichtfeld
- Antwort wird in den Formular-Kontext übernommen (vgl. Issue 6 und 11)
- Nur anzeigen, wenn Besucher Richtung Kontaktformular navigiert
- Formulierung muss professionell und nicht aufdringlich wirken

## Zu speichernde Daten

- Freitextantwort oder gewählte Optionen
- Zeitpunkt der Antwort

## Nutzen

- Ergänzt passive Interaktionsdaten um aktive Selbstauskunft
- Direkter Gesprächseinstieg
- Hohes Qualitätssignal bei Kontaktanfragen

## Priorität

medium

---

# Empfohlene Priorisierung

## Phase 1

- Issue 2: Top-3-Skills *(hochgestuft – empfohlener Kernmechanismus)*
- Issue 3: Merken-Funktion
- Issue 6: Formular-Kontext
- Issue 7: Sichtbare Vorschau im Formular
- Issue 11: Filterlogik für Formular-Daten
- Issue 12: Datenschutz / Transparenz

## Phase 2

- Issue 1: Skill-Favoriten *(freie Auswahl, falls Top-3 allein nicht ausreicht)*
- Issue 5: Interessensbereiche
- Issue 8: Aggregierte Insights
- Issue 9: meistbesuchte Sections
- Issue 13: Abschlussfrage

## Phase 3

- Issue 4: Rollenwahl
- Issue 10: Floating Session-Kontext-Widget

---

# Kurzfazit für die strategische Richtung

**Das ist kein Spielsystem, sondern eine subtile Interaktions- und Qualifizierungslogik für Recruiter/CEOs.**
Die Interaktionen sollen:

- hochwertig wirken
- echten Mehrwert für Gespräche liefern
- das CV optimierbar machen
- aber nicht nach übergriffigem Tracking oder verspielter Gamification aussehen
