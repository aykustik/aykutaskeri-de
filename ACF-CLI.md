# ACF CLI Tool

CLI-Tool zum Verwalten von ACF (Advanced Custom Fields) Field Groups via WP-CLI über SSH.

## Features

- Liste alle ACF Field Groups auf
- Exportiere einzelne oder alle Field Groups als JSON
- Importiere Field Groups aus JSON-Dateien
- Versioniere ACF-Konfigurationen in Git

## Voraussetzungen

- SSH-Zugriff auf den WordPress-Server (All-Inkl)
- SSH-Key-Authentifizierung eingerichtet
- WP-CLI auf dem Server verfügbar

## Setup

1. **SSH-Key erstellen** (falls noch nicht geschehen):
   ```bash
   ssh-keygen -t ed25519 -C "wp-cli-aykutaskeri" -f ~/.ssh/wp_cli_aykutaskeri
   ```

2. **Public Key bei All-Inkl hinterlegen**:
   - Einloggen ins KAS (kasserver.com)
   - Tools → SSH-Zugang → SSH-Benutzer bearbeiten
   - Public Key einfügen

3. **.env.local konfigurieren**:
   ```bash
   WP_SSH_HOST=w01b65d3.kasserver.com
   WP_SSH_USER=ssh-w01b65d3
   WP_SSH_KEY=/Users/USERNAME/.ssh/wp_cli_aykutaskeri
   WP_PATH=/www/htdocs/w01b65d3/aykutaskeri.de
   ```

## Verwendung

### Alle Field Groups auflisten

```bash
node scripts/acf-cli.js list
```

### Einzelne Field Group exportieren

```bash
node scripts/acf-cli.js export 658
# Oder mit eigenem Dateinamen:
node scripts/acf-cli.js export 658 meine-config.json
```

### Alle Field Groups exportieren

```bash
node scripts/acf-cli.js export-all
```

Exports werden im Ordner `acf-exports/` gespeichert.

### Field Group importieren

```bash
node scripts/acf-cli.js import acf-exports/group_61439ff22439a.json
```

## Workflow: ACF-Änderungen versionieren

1. **Vor Änderungen**: Alle Field Groups exportieren
   ```bash
   node scripts/acf-cli.js export-all
   git add acf-exports/
   git commit -m "Backup: ACF Field Groups vor Änderung"
   ```

2. **Änderungen im WP-Admin vornehmen**

3. **Nach Änderungen**: Exportieren und committen
   ```bash
   node scripts/acf-cli.js export-all
   git add acf-exports/
   git commit -m "Update: Neue ACF Felder hinzugefügt"
   ```

4. **Auf anderen Umgebungen deployen**:
   ```bash
   node scripts/acf-cli.js import acf-exports/group_XXX.json
   ```

## Verfügbare Field Groups

| ID | Name | Titel |
|----|------|-------|
| 658 | group_61439ff22439a | Bewerberdaten |
| 652 | group_61439dee3d920 | Unternehmensdaten |
| 663 | group_6143a0cc8048e | About |
| 682 | group_6143a4914a25f | Skillset |
| ... | ... | ... |

## Troubleshooting

### SSH-Verbindung schlägt fehl

```bash
# Teste SSH-Verbindung
ssh -i ~/.ssh/wp_cli_aykutaskeri ssh-w01b65d3@w01b65d3.kasserver.com
```

### WP-CLI nicht gefunden

Bei All-Inkl ist WP-CLI unter `/usr/bin/wp` verfügbar. Falls nicht:
```bash
# WP-CLI manuell installieren
curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
chmod +x wp-cli.phar
sudo mv wp-cli.phar /usr/local/bin/wp
```

## Weitere WP-CLI Befehle

Direkt auf dem Server ausführen:
```bash
ssh -i ~/.ssh/wp_cli_aykutaskeri ssh-w01b65d3@w01b65d3.kasserver.com "cd /www/htdocs/w01b65d3/aykutaskeri.de && wp post list --post_type=acf-field-group"
```
