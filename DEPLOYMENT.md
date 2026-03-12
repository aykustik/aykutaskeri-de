# Deployment Anleitung

## Übersicht

Dieses Projekt verwendet einen **Git-Branch-basierten Deployment Workflow** mit zwei Umgebungen:

| Umgebung | Branch | URL | Zweck |
|----------|--------|-----|-------|
| **Production** | `main` | aykutaskeri.de | Live-Website |
| **Staging** | `staging` | staging.aykutaskeri.de | Tests & Preview |

## Git Workflow (Branching Strategy)

```
feature/xyz ──► staging ──► main
     │            │          │
     │            ▼          ▼
     │      staging.      aykutaskeri.de
     │      aykutaskeri.de
     │
     ▼
  Entwicklung
```

### 1. Feature entwickeln

```bash
# Neuen Feature-Branch erstellen
git checkout -b feature/neue-funktion

# ... Entwicklung ...

git add .
git commit -m "feat: Beschreibung der Änderung"
git push origin feature/neue-funktion
```

### 2. Auf Staging testen

```bash
# Zu staging wechseln
git checkout staging

# Feature-Branch mergen
git merge feature/neue-funktion

# Auf Staging pushen (auto-deploy)
git push origin staging

# → Automatisch deployed zu: https://staging.aykutaskeri.de
```

**Teste auf Staging:**
- ✅ Layout & Design
- ✅ Komponenten-Funktionalität
- ✅ Mobile Responsiveness
- ✅ Navigation & Routing
- ✅ API-Integration (WordPress)

### 3. Nach Production deployen

```bash
# Zu main wechseln
git checkout main

# Staging-Änderungen mergen
git merge staging

# Auf Production pushen (auto-deploy)
git push origin main

# → Automatisch deployed zu: https://aykutaskeri.de
```

## Wichtige Hinweise

### Was auf Staging getestet werden kann:
- ✅ Frontend-Änderungen (Next.js)
- ✅ Layout & Design (Tailwind CSS)
- ✅ Neue Komponenten
- ✅ Responsive Design
- ✅ SEO-Änderungen
- ✅ Performance-Optimierungen

### Was NICHT getestet werden kann (gleiches Backend):
- ❌ ACF Feld-Änderungen (betrifft beide Umgebungen)
- ❌ WordPress Plugin Updates
- ❌ Neue CV-Daten (gleiche Datenbank)
- ❌ API-Struktur-Änderungen

**WordPress ist EINE Instanz** für beide Umgebungen. Das ist bei Headless CMS normal.

## Voraussetzungen

1. **GitHub Repository** - Code liegt auf GitHub
2. **Vercel Account** - Projekt ist mit GitHub verbunden
3. **WordPress** - Läuft bei All-Inkl
4. **SSH-Zugriff** - Für WordPress-Updates (siehe WORDPRESS-SETUP.md)

## Umgebungsvariablen

Beide Umgebungen verwenden die **gleichen** ENV-Variablen:

| Name | Wert | Beschreibung |
|------|------|--------------|
| `NEXT_PUBLIC_WP_API_URL` | `https://aykutaskeri.de/wp-json` | WordPress REST API |
| `WP_AUTH_HEADER` | `Base64(username:password)` | Authentifizierung |

**Anmerkung:** WordPress-Backend ist für beide Umgebungen identisch.

## WordPress-Änderungen

Für Änderungen am WordPress-Backend (ACF, Plugins, etc.):

```bash
# ACF Fields exportieren
node scripts/acf-cli.js export-all

# Theme deployen
./scripts/deploy-wp-theme.sh

# Änderungen commiten
git add acf-exports/ wp-theme/
git commit -m "wp: ACF-Felder und Theme aktualisiert"
git push origin main
```

**Hinweis:** WordPress-Änderungen sollten sorgfältig getestet werden, da sie sofort live sind.

## Monitoring & Troubleshooting

### Deployments überwachen

1. **Vercel Dashboard:** https://vercel.com/dashboard
   - Deployment-Status
   - Build-Logs
   - Domain-Übersicht

2. **Staging URL:** https://staging.aykutaskeri.de
   - Vor dem Merge zu main immer testen!

3. **Production URL:** https://aykutaskeri.de
   - Live-Website

### Häufige Probleme

**Build schlägt fehl:**
```bash
# Lokal testen
npm install
npm run build
```

**API funktioniert nicht:**
- WordPress erreichbar? `curl https://aykutaskeri.de/wp-json/wp/v2/cv`
- CORS-Header korrekt?
- Application Password gültig?

**Staging zeigt alten Stand:**
```bash
# Prüfen welcher Branch deployed
git log staging --oneline -1
```

## Zusammenfassung

| Aktion | Befehl | Ergebnis |
|--------|--------|----------|
| Feature starten | `git checkout -b feature/xyz` | Neuer Branch |
| Staging deploy | `git push origin staging` | staging.aykutaskeri.de |
| Production deploy | `git push origin main` | aykutaskeri.de |
| Theme deploy | `./scripts/deploy-wp-theme.sh` | WordPress-Theme update |

---

**Wichtig:** Immer erst auf **Staging** testen, dann nach **Production** mergen!
