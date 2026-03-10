# KI-Agent Workflows für CV-Verwaltung

## Einrichtung

Diese Prompts helfen dir, neue CVs zu erstellen und zu verwalten.

---

## Neues CV erstellen

```
Erstelle ein neues Online-CV in WordPress für folgende Stelle:
- Firma: [FIRMA]
- Position: [POSITION]
- Ansprechpartner: [NAME]
- Gewünschte Anstellungsart: [ART]

Nutze die WP REST API um:
1. Einen neuen CV-Post vom Typ "cv" zu erstellen
2. Die ACF-Felder mit den Daten zu befüllen

Die verfügbaren ACF-Felder sind in /src/types/wordpress.ts definiert.
```

---

## CV aktualisieren

```
Aktualisiere das CV mit dem Slug [SLUG]:
- Feld: [FELD_NAME]
- Neuer Wert: [WERT]

Nutze die WP REST API: PUT /wp/v2/cv/{id}
```

---

## Neues CV aus bestehendem klonen

```
Dupliziere das bestehende CV mit dem Slug [SLUG] für eine neue Bewerbung:
- Neue Firma: [FIRMA]
- Neue Position: [POSITION]
- Änderungen: [LISTE DER ÄNDERUNGEN]
```

---

## Typische Aktualisierungen

### Berufserfahrung hinzufügen
```
Füge eine neue Berufserfahrung zum CV [SLUG] hinzu:
- Zeitraum: [VON - BIS]
- Titel: [POSITION]
- Beschreibung: [AUFGABEN]
```

### Skills aktualisieren
```
Aktualisiere die Hard Skills im CV [SLUG]:
- [SKILL_1]: [STÄRKE]%
- [SKILL_2]: [STÄRKE]%
```

### Projekt zum Portfolio hinzufügen
```
Füge ein neues Projekt zum Portfolio hinzu:
- Titel: [PROJEKT_TITEL]
- Beschreibung: [BESCHREIBUNG]
- URL: [LINK]
```

---

## Nützliche WP REST API Endpunkte

| Aktion | Methode | Endpoint |
|--------|--------|----------|
| Alle CVs | GET | `/wp/v2/cv` |
| CV nach Slug | GET | `/wp/v2/cv?slug={slug}` |
| CV erstellen | POST | `/wp/v2/cv` |
| CV aktualisieren | PUT | `/wp/v2/cv/{id}` |
| CV löschen | DELETE | `/wp/v2/cv/{id}` |
| ACF-Felder | GET/POST | `/acf/v3/cv/{id}` |

---

## Authentifizierung

Für authentifizierte Anfragen:
```bash
# Basis-Auth Header generieren
echo -n "benutzername:app_passwort" | base64
```

Header: `Authorization: Basic BASE64_STRING`
