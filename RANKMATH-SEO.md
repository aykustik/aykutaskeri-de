# RankMath SEO Integration (Headless CMS)

Diese Dokumentation beschreibt die Integration von RankMath SEO in das Headless WordPress + Next.js Setup.

---

## Übersicht

| Komponente | Beschreibung |
|------------|-------------|
| **CMS** | WordPress mit RankMath SEO Plugin |
| **Frontend** | Next.js 13+ (App Router) |
| **API** | RankMath REST API Endpoint |
| **Ziel** | SEO-Metadaten (Title, Description, OG, Schema.org) aus RankMath für jedes CV |

---

## WordPress Einrichtung

### 1. RankMath SEO Plugin

Das Plugin ist bereits installiert. Stelle sicher, dass die aktuelle Version läuft.

### 2. Headless CMS Support aktivieren

1. WordPress Admin öffnen: `https://aykutaskeri.de/wp-admin`
2. Navigieren zu: **RankMath SEO → Dashboard → Others**
3. Option **"Headless CMS Support"** aktivieren
4. Änderungen speichern

### 3. SEO-Einstellungen pro CV

Für jeden CV-Post können individuelle SEO-Einstellungen vorgenommen werden:

1. CV-Post bearbeiten (z.B. Post ID 1212, Slug `9kau1e4q`)
2. RankMath Meta-Box öffnen
3. Folgende Werte anpassen:
   - **Titel** (`<title>`)
   - **Meta-Beschreibung** (`<meta name="description">`)
   - **Open Graph** (og:title, og:description, og:image)
   - **Schema.org** (JSON-LD strukturierte Daten)
   - **Canonical URL**
   - **Robots Meta** (noindex, nofollow, etc.)

**Test-CV:**
- URL: https://aykutaskeri.de/cv/9kau1e4q/
- Post ID: 1212
- Slug: `9kau1e4q`

> ⚠️ **Wichtiger Hinweis zu OG Images (Open Graph):**
> 
> RankMath bietet **kein Standard-Fallback** für Open Graph Images bei Custom Post Types (wie CV). 
> Es wird **kein Bild automatisch ausgegeben** wenn keines explizit gesetzt ist.
> 
> **Empfohlene Vorgehensweise:**
> - Pro CV-Post immer ein OG Image in der RankMath Meta-Box hinterlegen
> - Unter "Social" Tab → "Facebook" / "Twitter" das Bild auswählen
> - Ideal: 1200×630px für optimale Darstellung auf Facebook/Twitter
> - Alternativ: Featured Image des Posts wird oft automatisch verwendet

---

## API Endpunkt

### Basis-URL

```
https://wp.aykutaskeri.de/wp-json/rankmath/v1/getHead
```

### Request

```http
GET /wp-json/rankmath/v1/getHead?url=https://aykutaskeri.de/cv/{slug}/
```

### Response Format

```json
{
  "success": true,
  "head": "<title>Aykut Askeri - Online-Marketing Experte</title><meta name=\"description\" content=\"...\"/>..."
}
```

### Fehlerfälle

| Fehler | Ursache | Lösung |
|--------|---------|--------|
| `rest_no_route` | Headless CMS Support nicht aktiviert | In RankMath Settings aktivieren |
| `Invalid parameter(s): url` | URL unvollständig | Vollständige URL mit Protokoll verwenden |
| `Missing parameter(s): url` | URL-Parameter fehlt | `?url=` Parameter hinzufügen |

---

## Next.js Integration

### Architektur

```
src/
├── app/cv/[slug]/page.tsx    # generateMetadata() ruft RankMath API
├── lib/wordpress.ts          # API-Client mit getRankMathMeta()
└── types/wordpress.ts        # TypeScript Interfaces
```

### Implementierung

#### 1. Types (types/wordpress.ts)

```typescript
export interface RankMathMeta {
  title?: string;
  description?: string;
  canonical?: string;
  robots?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
  schema?: Record<string, unknown>;
}

export interface RankMathAPIResponse {
  success: boolean;
  head: string;
}
```

#### 2. API-Client (lib/wordpress.ts)

```typescript
async getRankMathMeta(url: string): Promise<RankMathMeta | null> {
  const res = await fetch(
    `${WP_API_URL}/rankmath/v1/getHead?url=${encodeURIComponent(url)}`,
    { headers: this.getHeaders() }
  );
  
  if (!res.ok) return null;
  
  const data: RankMathAPIResponse = await res.json();
  if (!data.success) return null;
  
  // HTML parsen und extrahieren
  return this.parseRankMathHead(data.head);
}

private parseRankMathHead(html: string): RankMathMeta {
  // Implementierung siehe Code
}
```

#### 3. Metadata-Generation (app/cv/[slug]/page.tsx)

```typescript
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const cv = await wpAPI.getCVBySlug(params.slug);
  
  if (!cv) {
    return { title: 'CV nicht gefunden' };
  }

  // RankMath SEO-Daten abrufen
  const pageUrl = `https://aykutaskeri.de/cv/${params.slug}/`;
  const rankMathMeta = await wpAPI.getRankMathMeta(pageUrl);
  
  if (rankMathMeta) {
    return {
      title: rankMathMeta.title,
      description: rankMathMeta.description,
      alternates: { canonical: rankMathMeta.canonical },
      robots: rankMathMeta.robots,
      openGraph: {
        title: rankMathMeta.ogTitle,
        description: rankMathMeta.ogDescription,
        images: rankMathMeta.ogImage ? [{ url: rankMathMeta.ogImage }] : undefined,
        url: rankMathMeta.ogUrl,
        type: rankMathMeta.ogType as any,
      },
    };
  }
  
  // Fallback (sollte nicht passieren wenn RankMath korrekt konfiguriert)
  return {
    title: `${cv.acf.vorname} ${cv.acf.nachname} - ${cv.acf.bereich || 'Lebenslauf'}`,
    description: `Online-CV von ${cv.acf.vorname} ${cv.acf.nachname}`,
  };
}
```

---

## Unterstützte SEO-Features

### Meta Tags

| Tag | Quelle | Next.js Mapping |
|-----|--------|----------------|
| `<title>` | RankMath Titel-Eingabe | `metadata.title` |
| `<meta name="description">` | RankMath Description | `metadata.description` |
| `<link rel="canonical">` | RankMath Canonical URL | `metadata.alternates.canonical` |
| `<meta name="robots">` | RankMath Robots | `metadata.robots` |

### Open Graph

| Property | Quelle | Next.js Mapping |
|----------|--------|----------------|
| `og:title` | RankMath OG Titel | `metadata.openGraph.title` |
| `og:description` | RankMath OG Description | `metadata.openGraph.description` |
| `og:image` | RankMath OG Image | `metadata.openGraph.images` |
| `og:url` | RankMath Canonical | `metadata.openGraph.url` |
| `og:type` | RankMath OG Type | `metadata.openGraph.type` |

### Schema.org (JSON-LD)

RankMath generiert strukturierte Daten als `<script type="application/ld+json">`.

**Hinweis:** Next.js unterstützt JSON-LD nativ über `metadata.other` oder direkt im JSX.

---

## Testing

### API Test

```bash
# RankMath API testen
curl "https://wp.aykutaskeri.de/wp-json/rankmath/v1/getHead?url=https://aykutaskeri.de/cv/9kau1e4q/"
```

### Validierung

1. **Meta-Tags prüfen:**
   ```bash
   curl -s "https://wp.aykutaskeri.de/wp-json/rankmath/v1/getHead?url=https://aykutaskeri.de/cv/9kau1e4q/" | jq '.head'
   ```

2. **Frontend Meta-Tags:**
   - Seite im Browser öffnen
  - DevTools → Elements → `<head>` prüfen
   - Oder: View Source (Ctrl+U / Cmd+Option+U)

3. **Online Validatoren:**
   - [Google Rich Results Test](https://search.google.com/test/rich-results)
   - [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
   - [Twitter Card Validator](https://cards-dev.twitter.com/validator)

---

## Troubleshooting

### Problem: API gibt 404 zurück

**Ursache:** Headless CMS Support nicht aktiviert  
**Lösung:** RankMath → Dashboard → Others → Headless CMS Support aktivieren

### Problem: Leere Meta-Daten

**Ursache:** Keine SEO-Daten im CV-Post hinterlegt  
**Lösung:** CV-Post bearbeiten → RankMath Meta-Box ausfüllen

### Problem: Schema.org Daten fehlen

**Ursache:** RankMath Schema nicht konfiguriert  
**Lösung:** RankMath → Titles & Meta → Schemas konfigurieren

### Problem: OG Image wird nicht angezeigt

**Ursache:** Bild-URL falsch oder nicht öffentlich  
**Lösung:** In RankMath Meta-Box prüfen, Bild über "Social" Tab setzen

---

## Wartung

### Bei RankMath Updates

1. Changelog prüfen auf REST API Änderungen
2. Test mit CV 9kau1e4q durchführen
3. Ggf. Code-Anpassungen in `lib/wordpress.ts`

### Bei neuen CV-Posts

Automatisch aktiv - RankMath übernimmt die Metadaten basierend auf:
- Globalen SEO-Einstellungen (Templates)
- Individuellen Post-Einstellungen

Keine Code-Änderungen nötig!

---

## Ressourcen

- [RankMath Headless CMS Dokumentation](https://rankmath.com/kb/headless-cms-support/)
- [Next.js Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [WordPress REST API Handbook](https://developer.wordpress.org/rest-api/)

---

## Implementation Status

**Status:** ✅ Abgeschlossen  
**Branch:** `feat/16-rankmath-seo-integration`  
**PR:** #16  
**Gemerged:** Ja

### Implementierte Features

- ✅ RankMath API Client in `lib/wordpress.ts`
- ✅ TypeScript Interfaces in `types/wordpress.ts`
- ✅ Metadata Generation in `cv/[slug]/page.tsx`
- ✅ Unterstützung für: Title, Description, Canonical, Robots, Open Graph, Twitter Cards, Schema.org
- ✅ Automatischer Fallback auf CV-Daten (wenn RankMath nicht konfiguriert)

### Dateien geändert

- `src/types/wordpress.ts` - RankMath Interfaces hinzugefügt
- `src/lib/wordpress.ts` - `getRankMathMeta()` und `parseRankMathHead()` Methoden
- `src/app/cv/[slug]/page.tsx` - Metadata Generation angepasst

---

**Stand:** März 2026  
**Zuletzt aktualisiert:** Nach Implementation
