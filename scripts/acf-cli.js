#!/usr/bin/env node

/**
 * ACF CLI Tool für WordPress @ All-Inkl
 * Verwaltet ACF Field Groups via WP-CLI über SSH
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Konfiguration aus .env.local laden
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

const SSH_KEY = process.env.WP_SSH_KEY || `${process.env.HOME}/.ssh/wp_cli_aykutaskeri`;
const SSH_USER = process.env.WP_SSH_USER || 'ssh-w01b65d3';
const SSH_HOST = process.env.WP_SSH_HOST || 'w01b65d3.kasserver.com';
const WP_PATH = process.env.WP_PATH || '/www/htdocs/w01b65d3/aykutaskeri.de';

const SSH_CMD = `ssh -i ${SSH_KEY} ${SSH_USER}@${SSH_HOST}`;

function runWP(command) {
  const fullCmd = `${SSH_CMD} "cd ${WP_PATH} && ${command}"`;
  try {
    return execSync(fullCmd, { encoding: 'utf8', stdio: 'pipe' });
  } catch (error) {
    console.error('❌ Fehler:', error.message);
    process.exit(1);
  }
}

function list() {
  console.log('📋 ACF Field Groups:');
  console.log('='.repeat(80));
  const output = runWP('wp post list --post_type=acf-field-group --fields=ID,post_name,post_title --format=table');
  console.log(output);
}

function exportFieldGroup(id, filename) {
  console.log(`📤 Exportiere Field Group ${id}...`);
  
  // Post Daten exportieren
  const postData = runWP(`wp post get ${id} --format=json`);
  const post = JSON.parse(postData);
  
  // Metadaten exportieren
  const metaData = runWP(`wp post meta list ${id} --format=json`);
  const meta = JSON.parse(metaData);
  
  const exportData = {
    post: {
      post_title: post.post_title,
      post_name: post.post_name,
      post_content: post.post_content,
      post_status: post.post_status,
      post_type: post.post_type,
    },
    meta: meta.reduce((acc, item) => {
      acc[item.meta_key] = item.meta_value;
      return acc;
    }, {})
  };
  
  const outputFile = filename || `acf-field-group-${post.post_name}.json`;
  const outputPath = path.join(__dirname, '..', 'acf-exports', outputFile);
  
  // Sicherstellen, dass das Verzeichnis existiert
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  
  fs.writeFileSync(outputPath, JSON.stringify(exportData, null, 2));
  console.log(`✅ Exportiert nach: acf-exports/${outputFile}`);
}

function exportAll() {
  console.log('📦 Exportiere alle Field Groups...');
  const output = runWP('wp post list --post_type=acf-field-group --fields=ID,post_name --format=json');
  const groups = JSON.parse(output);
  
  groups.forEach(group => {
    exportFieldGroup(group.ID, `${group.post_name}.json`);
  });
  
  console.log(`\n✅ ${groups.length} Field Groups exportiert nach acf-exports/`);
}

function importFieldGroup(filePath) {
  console.log(`📥 Importiere ${filePath}...`);
  
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Datei nicht gefunden: ${filePath}`);
    process.exit(1);
  }
  
  const importData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const post = importData.post;
  const meta = importData.meta;
  
  // Prüfen ob die Field Group bereits existiert
  const existing = runWP(`wp post list --post_type=acf-field-group --name="${post.post_name}" --fields=ID --format=ids`).trim();
  
  let postId;
  if (existing) {
    console.log(`📝 Aktualisiere bestehende Field Group (ID: ${existing})...`);
    postId = existing;
    runWP(`wp post update ${postId} --post_title="${post.post_title}" --post_content='${JSON.stringify(post.post_content)}'`);
  } else {
    console.log('📝 Erstelle neue Field Group...');
    const result = runWP(`wp post create --post_type=acf-field-group --post_title="${post.post_title}" --post_name="${post.post_name}" --post_status="${post.post_status}" --post_content='${JSON.stringify(post.post_content)}' --porcelain`);
    postId = result.trim();
  }
  
  // Metadaten importieren
  if (meta) {
    Object.entries(meta).forEach(([key, value]) => {
      runWP(`wp post meta update ${postId} "${key}" '${JSON.stringify(value)}'`);
    });
  }
  
  console.log(`✅ Importiert (ID: ${postId})`);
}

function showHelp() {
  console.log(`
🛠️  ACF CLI Tool für WordPress @ All-Inkl

Verwendung:
  node scripts/acf-cli.js <command> [options]

Commands:
  list                    Zeigt alle ACF Field Groups
  export <id> [file]      Exportiert eine Field Group als JSON
  export-all              Exportiert alle Field Groups
  import <file>           Importiert eine Field Group aus JSON

Beispiele:
  node scripts/acf-cli.js list
  node scripts/acf-cli.js export 658
  node scripts/acf-cli.js export-all
  node scripts/acf-cli.js import acf-exports/group_61439ff22439a.json
`);
}

// Hauptprogramm
const command = process.argv[2];
const arg1 = process.argv[3];
const arg2 = process.argv[4];

switch (command) {
  case 'list':
    list();
    break;
  case 'export':
    if (!arg1) {
      console.error('❌ Bitte Field Group ID angeben');
      process.exit(1);
    }
    exportFieldGroup(arg1, arg2);
    break;
  case 'export-all':
    exportAll();
    break;
  case 'import':
    if (!arg1) {
      console.error('❌ Bitte Dateipfad angeben');
      process.exit(1);
    }
    importFieldGroup(arg1);
    break;
  case 'help':
  case '--help':
  case '-h':
  default:
    showHelp();
    break;
}
