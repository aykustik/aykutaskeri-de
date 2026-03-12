# Aykut Askeri - Headless CMS

Dieses Repository enthält sowohl das **Next.js Frontend** als auch alle Dateien für das **WordPress Headless CMS**.

## 🏗️ Architektur

```
┌─────────────────┐      ┌──────────────────┐
│  NEXT.JS        │      │  WORDPRESS       │
│  (Vercel)       │◄────►│  (All-Inkl)      │
│                 │ REST │                  │
│  Frontend       │ API  │  Headless CMS    │
│  Static Site    │      │  ACF Fields      │
│  ISR/Edge CDN   │      │  Custom API      │
└─────────────────┘      └──────────────────┘
```

## 📁 Repository Struktur

```
aykutaskeri.de/
├── src/                      # Next.js Frontend
│   └── app/
│       └── cv/[slug]/
│
├── mu-plugins/               # WordPress MU-Plugins
│   ├── contact-api.php
│   └── toolkit-replacement.php
│
├── wp-theme/                 # WordPress Headless Theme
│   ├── style.css
│   ├── functions.php
│   └── ...
│
├── acf-exports/              # ACF Field Groups
│
├── scripts/                  # Deploy & Management
│   ├── acf-cli.js           # ACF Export/Import
│   └── deploy-wp-theme.sh   # Theme Deployment
│
└── docs/
    ├── ACF-CLI.md           # ACF CLI Dokumentation
    ├── WORDPRESS-SETUP.md   # WordPress Setup Guide
    └── RANKMATH-SEO.md      # SEO Dokumentation
```

## 🚀 Quick Start

### Frontend Entwicklung

```bash
# Dependencies installieren
npm install

# Dev Server starten
npm run dev

# Open http://localhost:3000
```

### WordPress Theme Deploy

```bash
# Theme zu All-Inkl deployen
./scripts/deploy-wp-theme.sh
```

### ACF Fields verwalten

```bash
# Alle Field Groups exportieren
node scripts/acf-cli.js export-all

# Field Group importieren
node scripts/acf-cli.js import acf-exports/group_xxx.json
```

## 📚 Dokumentation

- **[WORDPRESS-SETUP.md](WORDPRESS-SETUP.md)** - Komplette WordPress Setup Dokumentation
- **[ACF-CLI.md](ACF-CLI.md)** - ACF CLI Tool Anleitung
- **[RANKMATH-SEO.md](RANKMATH-SEO.md)** - SEO Integration

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 13+ (App Router)
- **Styling:** Tailwind CSS
- **Deployment:** Vercel
- **TypeScript:** Ja

### Backend
- **CMS:** WordPress (Headless)
- **Custom Fields:** Advanced Custom Fields Pro
- **Hosting:** All-Inkl
- **PHP:** 7.4 (Upgrade zu 8.3+ geplant)

### API
- **REST API:** WordPress REST API
- **ACF Integration:** ACF to REST API
- **Custom Endpoints:** Contact Form API

## 📝 Aktive Plugins

**WordPress Plugins (6):**
- Advanced Custom Fields 6.7.1
- ACF to REST API 3.3.4
- Duplicator 1.5.15
- Enable Media Replace 4.1.8
- RankMath SEO 1.0.265
- WP Mail SMTP 4.7.1

**MU-Plugins (2):**
- contact-api.php
- toolkit-replacement.php

## 🔧 Wartung

### Updates durchführen
```bash
# WordPress Plugins updaten (via SSH)
ssh all-inkl
wp plugin update --all

# Theme anpassen und deployen
# 1. wp-theme/ bearbeiten
# 2. ./scripts/deploy-wp-theme.sh
```

### Backup
- **Frontend:** Git Repository (Vercel)
- **WordPress:** Duplicator (manuell via WP-Admin)
- **ACF Fields:** `node scripts/acf-cli.js export-all`

## 🆘 Support

Bei Problemen:
1. WORDPRESS-SETUP.md konsultieren
2. Troubleshooting-Sektion prüfen
3. SSH-Zugriff testen: `ssh -i ~/.ssh/wp_cli_aykutaskeri ssh-w01b65d3@w01b65d3.kasserver.com`

---

**Erstellt:** März 2026  
**Autor:** Aykut Askeri  
**Frontend:** [aykutaskeri.de](https://aykutaskeri.de)
