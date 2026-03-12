#!/bin/bash

# WordPress Theme Deploy Script
# Kopiert das Headless Theme zu All-Inkl

# Farben für Output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# SSH Konfiguration
SSH_KEY="${HOME}/.ssh/wp_cli_aykutaskeri"
SSH_USER="ssh-w01b65d3"
SSH_HOST="w01b65d3.kasserver.com"
WP_PATH="/www/htdocs/w01b65d3/aykutaskeri.de"
THEME_NAME="aykutaskeri-headless"

echo -e "${YELLOW}🚀 Deploye WordPress Theme zu All-Inkl...${NC}"
echo "============================================"

# Prüfe ob SSH Key existiert
if [ ! -f "$SSH_KEY" ]; then
    echo -e "${RED}❌ SSH Key nicht gefunden: $SSH_KEY${NC}"
    exit 1
fi

# Theme-Verzeichnis auf Server erstellen
echo -e "${YELLOW}📁 Erstelle Theme-Verzeichnis...${NC}"
ssh -i "$SSH_KEY" "${SSH_USER}@${SSH_HOST}" "mkdir -p ${WP_PATH}/wp-content/themes/${THEME_NAME}"

# Theme-Dateien kopieren
echo -e "${YELLOW}📂 Kopiere Theme-Dateien...${NC}"
scp -i "$SSH_KEY" -r \
    wp-theme/* \
    "${SSH_USER}@${SSH_HOST}:${WP_PATH}/wp-content/themes/${THEME_NAME}/"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Theme erfolgreich kopiert!${NC}"
else
    echo -e "${RED}❌ Fehler beim Kopieren${NC}"
    exit 1
fi

# Theme aktivieren
echo -e "${YELLOW}🎨 Aktiviere Theme...${NC}"
ssh -i "$SSH_KEY" "${SSH_USER}@${SSH_HOST}" "cd ${WP_PATH} && wp theme activate ${THEME_NAME} --allow-root"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Theme aktiviert!${NC}"
else
    echo -e "${RED}❌ Fehler beim Aktivieren${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}🎉 Deploy abgeschlossen!${NC}"
echo ""
echo "Theme: aykutaskeri-headless"
echo "Pfad: ${WP_PATH}/wp-content/themes/${THEME_NAME}"
echo ""
echo "Prüfe: https://aykutaskeri.de/wp-admin"
