# WordPress Headless Setup

Dokumentation des Headless CMS Setups mit Next.js Frontend.

## 🏗️ Architektur

### Option C: Hybrid (gewählt)

```
┌─────────────────────────────────────────────────────────────┐
│                      REPO STRUKTUR                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  aykutaskeri.de/                                           │
│  ├── src/                    ← Next.js Frontend            │
│  │   └── app/                                              │
│  │       └── cv/[slug]/                                    │
│  │                                                         │
│  ├── mu-plugins/             ← MU-Plugins (versioniert)    │
│  │   ├── headless-api.php                                 
│  │   ├── samesite-cookie.php
│  │   └── toolkit-replacement.php                          │
│  │                                                         │
│  ├── wp-theme/               ← WP Theme (versioniert)      │
│  │   ├── style.css                                         │
│  │   ├── functions.php                                     │
│  │   └── index.php                                         │
│  │                                                         │
│  ├── acf-exports/            ← ACF Field Groups           │
│  │   └── group_*.json                                      │
│  │                                                         │
│  └── scripts/                ← Deploy & Management        │
│      ├── acf-cli.js                                        │
│      └── deploy-wp-theme.sh                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌──────────────────────┐      ┌──────────────────────────┐
│   NEXT.JS FRONTEND   │      │    WORDPRESS BACKEND     │
│   (Vercel)           │      │    (All-Inkl)            │
│                      │      │                          │
│  aykutaskeri.de      │◄────►│  wp.aykutaskeri.de/wp-json │
│                      │ REST │                          │
│  • Static Site       │ API  │  • Headless CMS         │
│  • ISR               │      │  • ACF Fields           │
│  • Edge CDN          │      │  • Custom Post Types    │
│                      │      │  • MU-Plugins           │
└──────────────────────┘      └──────────────────────────┘
```

## 📁 Lokale Struktur vs. Server

| Lokales Repo | Deploy Ziel | Methode | Umgebung |
|--------------|-------------|---------|----------|
| `src/` | Vercel | Automatisch bei Git Push | staging → main |
| `mu-plugins/` | All-Inkl MU-Plugins | Manuel SCP/SFTP | Beide (gleiches Backend) |
| `wp-theme/` | All-Inkl Themes | `./scripts/deploy-wp-theme.sh` | Beide (gleiches Backend) |
| `acf-exports/` | All-Inkl ACF | `node scripts/acf-cli.js import` | Beide (gleiches Backend) |

## 🚀 Deploy Workflows

### Git Branching Strategy

```
feature/xyz ──► staging ──► main
     │            │          │
     │            ▼          ▼
     │     staging.      aykutaskeri.de
     │     aykutaskeri.de
     │
     ▼
  Entwicklung
```

| Branch | Umgebung | URL | Auto-Deploy |
|--------|----------|-----|-------------|
| `main` | Production | aykutaskeri.de | ✅ Ja |
| `staging` | Staging | staging.aykutaskeri.de | ✅ Ja |
| `feature/*` | - | - | ❌ Nein |

### Frontend (Vercel)

```bash
# 1. Feature entwickeln
git checkout -b feature/neue-funktion
# ... Entwicklung ...
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

**Wichtig:** WordPress-Backend ist für beide Umgebungen identisch!

### WordPress Theme

```bash
# Theme deployen (gilt für beide Umgebungen)
./scripts/deploy-wp-theme.sh

# Nach Deploy: Änderungen commiten
git add wp-theme/
git commit -m "wp: Theme aktualisiert"
git push origin main
```

### MU-Plugins

```bash
# MU-Plugins deployen (gilt für beide Umgebungen)
scp -i ~/.ssh/wp_cli_aykutaskeri mu-plugins/* ssh-w01b65d3@w01b65d3.kasserver.com:/www/htdocs/w01b65d3/aykutaskeri.de/wp-content/mu-plugins/

# Nach Deploy: Änderungen commiten
git add mu-plugins/
git commit -m "wp: MU-Plugins aktualisiert"
git push origin main
```

### ACF Fields

```bash
# Export aus WordPress (bei Änderungen)
node scripts/acf-cli.js export-all

# Änderungen commiten
git add acf-exports/
git commit -m "wp: ACF Felder exportiert"
git push origin main

# Import zu WordPress (bei Restore/Deploy)
node scripts/acf-cli.js import acf-exports/group_xxx.json
```

**Hinweis:** ACF-Änderungen betreffen sofort beide Umgebungen (gleiches WordPress).

## 📋 Aktive Plugins

**Aktive Plugins (6):**
- Advanced Custom Fields 6.7.1
- ACF to REST API 3.3.4
- Duplicator 1.5.15
- Enable Media Replace 4.1.8
- RankMath SEO 1.0.265
- WP Mail SMTP 4.7.1

**MU-Plugins (3):**
- headless-api.php (Kontaktformular API + Admin-Toolbar)
- samesite-cookie.php (SameSite Cookie Fix)
- toolkit-replacement.php (Performance & Security)

**Theme:**
- Aykut Askeri Headless v1.0.0

## 🔧 WordPress Konfiguration

### Permalinks
- Post: `/%postname%/`
- Custom Post Type "cv": `/cv/%postname%/` (aber irrelevant, da Headless)

### REST API
- Standard WP REST API: `https://wp.aykutaskeri.de/wp-json/wp/v2/`
- ACF Endpoints: `https://wp.aykutaskeri.de/wp-json/acf/v3/`
- Custom Contact API: `https://wp.aykutaskeri.de/wp-json/custom/v1/send-contact`

### Security
- XML-RPC deaktiviert (via MU-Plugin)
- Security Headers gesetzt
- Admin-Zugriff auf Plugins eingeschränkt

## 📝 Entwicklung

### Neue ACF Felder hinzufügen
1. Im WP-Admin ACF Felder erstellen
2. Exportieren: `node scripts/acf-cli.js export-all`
3. Committen: `git add acf-exports/ && git commit`
4. Pushen: `git push origin main`

### Theme anpassen
1. Dateien in `wp-theme/` bearbeiten
2. Testen lokal (optional)
3. Deployen: `./scripts/deploy-wp-theme.sh`
4. Committen: `git add wp-theme/ && git commit`

### MU-Plugins anpassen
1. Dateien in `mu-plugins/` bearbeiten
2. SCP zu Server
3. Committen

## 🔄 Zukünftige Erweiterungen

### functions.php im Theme
Die `functions.php` enthält bereits kommentierte Beispiele für:
- Custom Post Types registrieren
- REST API Extensions
- Admin Customizations

### Blog-Funktionalität
Wenn ein Blog hinzugefügt wird:
1. `archive.php` und `single.php` anpassen
2. Antispam Bee Plugin neu installieren
3. Ggf. Theme erweitern

## 🆘 Troubleshooting

### Theme wird nicht angezeigt
```bash
# Prüfe ob Theme aktiv ist
wp theme list

# Aktivieren
wp theme activate aykutaskeri-headless
```

### REST API funktioniert nicht
```bash
# Permalinks flushen
wp rewrite flush

# Prüfen
curl https://wp.aykutaskeri.de/wp-json/wp/v2/cv
```

### Deploy-Probleme
- SSH Key prüfen: `ssh -i ~/.ssh/wp_cli_aykutaskeri ssh-w01b65d3@w01b65d3.kasserver.com`
- Berechtigungen prüfen
- Theme-Verzeichnis manuell erstellen

## 📚 Weiterführende Links

- [WordPress REST API Handbook](https://developer.wordpress.org/rest-api/)
- [ACF to REST API](https://github.com/airesvsg/acf-to-rest-api)
- [Next.js Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [WP-CLI Commands](https://developer.wordpress.org/cli/commands/)

---

**Version:** 1.0.0  
**Letztes Update:** 12.03.2026  
**Autor:** Aykut Askeri
