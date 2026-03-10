# Deployment Anleitung

## Voraussetzungen

1. **GitHub Repository** - Push den Code zu GitHub
2. **Vercel Account** - Registriere dich auf vercel.com
3. **WordPress Konfiguration** - Siehe `WP-SETUP.md`

## Schritt-für-Schritt

### 1. Code zu GitHub pushen

```bash
cd wordpress-headless
git add .
git commit -m "Initial commit - Headless WordPress CV Frontend"
git remote add origin https://github.com/dein-user/dein-repo.git
git push -u origin main
```

### 2. Vercel Deployment

1. Gehe zu [vercel.com](https://vercel.com)
2. Klicke "Add New..." → "Project"
3. Wähle dein GitHub Repository
4. Konfiguriere die Environment Variables:

| Name | Wert |
|------|------|
| `NEXT_PUBLIC_WP_API_URL` | `https://aykutaskeri.de/wp-json` |
| `WP_AUTH_HEADER` | Base64 encode von `username:app_password` |

5. Klicke "Deploy"

### 3. Domain konfigurieren (optional)

1. In Vercel: Settings → Domains
2. Füge deine Domain hinzu (z.B. `cv.aykutaskeri.de`)
3. DNS-Einträge entsprechend setzen

## .htaccess Proxy Setup

Damit die CVs unter `aykutaskeri.de/cv/*` erreichbar sind:

### Option A: Subdomain (empfohlen)

1. Erstelle eine Subdomain `cv.aykutaskeri.de` bei All-Inkl
2. Zeige auf das Vercel Deployment
3. Oder nutze CNAME: `cname.vercel-dns.com`

### Option B: Unterverzeichnis Proxy

Füge folgende Regeln in die `.htaccess` deiner WordPress-Installation ein:

```apache
# CV Proxy zu Vercel
RewriteEngine On
RewriteBase /

# Nur CV-Routen proxy-n
RewriteRule ^cv/(.*)$ https://deine-vercel-app.vercel.app/cv/$1 [P,L]
```

**Hinweis:** Das Proxy-Setup erfordert mod_proxy auf dem Server.

## Monitoring

- Vercel Dashboard zeigt Deployment-Status
- Bei Fehlern: Deployment-Logs prüfen
- WordPress prüfen: `/wp-json/wp/v2/cv` sollte funktionieren

## Troubleshooting

### API funktioniert nicht
1. CORS in WordPress konfiguriert?
2. Application Password korrekt encoded?
3. URL richtig in `.env.local`?

### Bilder werden nicht geladen
1. WordPress URL in den Einstellungen korrekt?
2. Bilder öffentlich zugänglich?

### Build schlägt fehl
1. Node.js Version prüfen (Next.js 13.5+ braucht Node 16+)
2. `npm install` lokal testen
