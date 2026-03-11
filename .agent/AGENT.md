# AI-Agent Instructions

Dies ist die zentrale Anleitung für AI-Agenten, die dieses Projekt autonom bearbeiten. 
Ziel: Tasks abarbeiten, README.md aktualisieren, Git-Operationen durchführen und Tasks dokumentieren.

## Tasks

- Lies `.agent/tasks.md` als Single Source of Truth.
- Tasks enthalten:
  - GitHub Issue: URL zum Issue
  - Branch: Worktree / Feature-Branch
  - Status: todo | in-progress | done
  - Priority: low | medium | high
  - Notes: zusätzliche Informationen
- Statusänderungen:
  - Nach erfolgreichem Merge oder PR → Status auf done setzen
  - Verschiebe erledigte Tasks optional in `completed.md`

### Task-Erstellung filtern

- Ein Task wird nur erstellt, wenn:
  1. Es sich um eine konkrete, umsetzbare Arbeit handelt.
  2. Die Aufgabe im Code, in Config, Branch oder Dokumentation resultiert.
  3. Es eine klar definierte Ausgabe gibt (Code, Pull Request, README-Update, Issue-Update).
- Keine Tasks erstellen für:
  - Diskussionen im Chat
  - Fragen, Ideen, Meinungen
  - Tests oder Experimente ohne festen Outcome
- Bei Unsicherheit:
  - Task zunächst in `Notes` markieren, Status `pending review`

## Notes (optional)

- Temporäre Ideen, Fragen oder Diskussionen, die noch keine echte Task sind.
- Können später manuell oder automatisch in Tasks konvertiert werden.
- Beispielstruktur:
  - Issue / Branch optional
  - Status: pending review
  - Beschreibung / Gedanken

## README.md Aktualisierung

- README.md ist Dokumentation für Menschen.
- Folgende Abschnitte werden gepflegt:
  - Projektbeschreibung
  - Übersicht aller Tasks mit Status
  - Branches / Worktrees
  - Letzte Pull Requests
- Tasks in README.md werden aus `.agent/tasks.md` übernommen.
- Änderungen im Code / Tasks → README.md automatisch aktualisieren.

## Git-Operationen

1. Für jeden Task:
   - Neuen Branch / Worktree erstellen: `<defaultBranchPrefix>-<IssueNummer>`
   - `workspaceStartupScript` ausführen (z.B. npm install)
   - Änderungen committen:
     git add .
     git commit -m "AI-Agent: Update Task #<Nummer> / README"
   - Branch pushen:
     git push origin <branch-name>
   - Pull Request erstellen:
     gh pr create --title "Task #<Nummer> Update" --body "Implementiert Task und aktualisiert README"
2. Nach PR Merge:
   - Task Status → done
   - README.md aktualisieren
   - Worktree optional löschen

## Konfiguration & Startup Script

- Prüfe `.agent/config.json`:
  - githubTokenEnv
  - defaultBranchPrefix
  - projectID
  - workspaceStartupScript
  - autoUpdateTasks
- Wenn Felder fehlen → automatisch ergänzen mit Standardwerten
- Vor Task-Bearbeitung:
  - Führe `workspaceStartupScript` aus (z.B. npm install)

## Multi-Agent / Multi-Session

- Diese Anweisungen gelten für alle AI-Agenten, die Zugriff auf das Repo haben
  (OpenCode, Claude, CodeX, …)
- Alle Tasks bleiben in `tasks.md` Single Source of Truth
- README.md ist synchronisierte Dokumentation
- Branches / Worktrees werden nach Standardpräfix organisiert
- config.json wird automatisch gepflegt

## Task Block Beispiel

- GitHub Issue: https://github.com/org/repo/issues/123
- Branch: ai-task-123
- Status: todo
- Priority: high
- Notes: Implement OAuth Login
