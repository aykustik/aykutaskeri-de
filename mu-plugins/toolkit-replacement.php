<?php
/**
 * ============================================================================
 * PLUGIN NAME: Toolkit Replacement
 * VERSION:     1.0.0
 * AUTHOR:      ACF CLI Tool / Aykut Askeri
 * DESCRIPTION: Ersetzt das "Toolkit for Elementor" Plugin nach Migration 
 *              zu einem Headless Next.js Setup (aykutaskeri.de)
 * ============================================================================
 * 
 * KONTEXT:
 * --------
 * Dieses MU-Plugin wurde am 12.03.2026 erstellt, um das kommerzielle Plugin
 * "Toolkit for Elementor" zu ersetzen. Wir haben das WordPress-Setup von
 * einem klassischen Elementor-Theme zu einem Headless CMS mit Next.js 
 * Frontend migriert. Toolkit for Elementor war nicht mehr kompatibel und
 * die Lizenz war abgelaufen.
 * 
 * WAS DIESSES PLUGIN MACHT:
 * -------------------------
 * Es implementiert die wichtigsten Features aus Toolkit for Elementor,
 * die auch ohne Elementor Sinn ergeben:
 * 
 * 1. WP BLOAT REMOVAL
 *    - Entfernt unnötige WordPress-Features und Scripts
 *    - Reduziert HTTP Requests und Page Size
 *    
 * 2. AUTOSAVE INTERVALL
 *    - Verlängert den Autosave-Intervall von 60 auf 120 Sekunden
 *    - Reduziert Server-Load bei längeren Edit-Sessions
 *    
 * 3. DASHBOARD CLEANUP
 *    - Entfernt überflüssige Dashboard-Widgets
 *    - Schafft aufgeräumtere Admin-Oberfläche
 *    
 * 4. ADMIN ACCESS RESTRICTIONS
 *    - Plugin-Verwaltung nur für Administratoren
 *    - Erhöhte Sicherheit bei Multi-User-Setup
 *    
 * 5. SICHERHEITS-HEADER
 *    - Setzt Security Headers (X-Frame-Options, etc.)
 *    - Schutz vor Clickjacking und MIME-Type Confusion
 * 
 * WAS ES NICHT MEHR MACHT (Features aus Toolkit for Elementor):
 * -------------------------------------------------------------
 * - KEIN Page Caching (wird durch Next.js/Vercel übernommen)
 * - KEIN CSS/JS Minify (Next.js übernimmt)
 * - KEIN CDN Support (Vercel Edge Network)
 * - KEIN Google Fonts Handling (Next.js optimiert)
 * - KEIN Heartbeat Control (WordPress Default 15s ist OK)
 * - KEINE Elementor-spezifischen Optimierungen
 * 
 * WARTUNG:
 * --------
 * - Datei liegt in: /wp-content/mu-plugins/toolkit-replacement.php
 * - MU-Plugins werden automatisch von WordPress geladen
 * - Keine Aktivierung/Deaktivierung nötig
 * - Updates: Datei direkt bearbeiten oder per SCP/Deploy ersetzen
 * 
 * TROUBLESHOOTING:
 * ----------------
 * - Falls Probleme: Im Browser DevTools prüfen, ob Scripts geladen werden
 * - XML-RPC Blockierung kann alte Plugins stören (prüfen ob noch benötigt)
 * - Security Headers können bei iframe-Einbettungen Probleme machen
 * 
 * ÄNDERUNGSHISTORIE:
 * ------------------
 * v1.0.0 (12.03.2026) - Initiale Version nach Toolkit Master Migration
 * 
 * ============================================================================
 */

// Verhindere direkten Zugriff
if (!defined('ABSPATH')) {
    exit;
}

/* ============================================================================
   SECTION 1: WP BLOAT REMOVAL
   ============================================================================
   Entfernt WordPress-Features, die für ein Headless CMS nicht benötigt werden
   oder die Performance negativ beeinflussen.
   ============================================================================ */

/**
 * Emoji Support deaktivieren
 * 
 * WordPress lädt standardmäßig ein Emoji-Script im Frontend, das für ein
 * Headless CMS (Next.js) nicht benötigt wird. Das Next.js Frontend rendert
 * Emojis selbstständig.
 * 
 * @since 1.0.0
 */
add_action('init', function() {
    // Frontend Scripts/Styles entfernen
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('admin_print_scripts', 'print_emoji_detection_script');
    remove_action('wp_print_styles', 'print_emoji_styles');
    remove_action('admin_print_styles', 'print_emoji_styles');
    
    // RSS Feed Emojis entfernen
    remove_filter('the_content_feed', 'wp_staticize_emoji');
    remove_filter('comment_text_rss', 'wp_staticize_emoji');
    remove_filter('wp_mail', 'wp_staticize_emoji_for_email');
    
    // TinyMCE Editor Emojis entfernen
    add_filter('tiny_mce_plugins', function($plugins) {
        if (is_array($plugins)) {
            return array_diff($plugins, ['wpemoji']);
        }
        return [];
    });
});

/**
 * Dashicons für nicht-angemeldete User entfernen
 * 
 * Dashicons sind WordPress-Icons, die nur im Admin oder für eingeloggte User
 * sichtbar sein sollten. Für normale Besucher unnötiges CSS.
 * 
 * @since 1.0.0
 */
add_action('wp_enqueue_scripts', function() {
    if (!is_admin_bar_showing()) {
        wp_deregister_style('dashicons');
    }
});

/**
 * oEmbed Funktionalität deaktivieren
 * 
 * oEmbed erlaubt das automatische Einbetten von YouTube/Vimeo Videos durch
 * einfaches Einfügen der URL. Für ein Headless CMS nicht benötigt, da das
 * Next.js Frontend eigene Embed-Komponenten nutzt.
 * 
 * ACHTUNG: Dies deaktiviert die automatische Video-Einbettung im Classic Editor.
 * Wenn du oEmbed doch brauchst, diesen Block auskommentieren.
 * 
 * @since 1.0.0
 */
add_action('init', function() {
    // oEmbed Discovery Links aus Header entfernen
    remove_action('wp_head', 'wp_oembed_add_discovery_links');
    remove_action('wp_head', 'wp_oembed_add_host_js');
    
    // oEmbed Filter deaktivieren
    remove_filter('oembed_dataparse', 'wp_filter_oembed_result', 10);
    remove_action('wp_head', 'rest_output_link_wp_head', 10);
    
    // oEmbed Rewrite Rules entfernen
    add_filter('rewrite_rules_array', function($rules) {
        foreach ($rules as $rule => $rewrite) {
            if (strpos($rule, 'embed') !== false) {
                unset($rules[$rule]);
            }
        }
        return $rules;
    });
}, 999);

/**
 * XML-RPC API deaktivieren
 * 
 * XML-RPC wird für die WordPress-App und Pingbacks verwendet. Da wir ein
 * Headless Setup mit REST API nutzen, ist XML-RPC nicht mehr nötig und
 * stellt ein potentielles Sicherheitsrisiko dar.
 * 
 * HINWEIS: Das kontakt-api.php MU-Plugin nutzt die REST API, nicht XML-RPC.
 * 
 * @since 1.0.0
 */
add_filter('xmlrpc_enabled', '__return_false');
add_filter('xmlrpc_methods', function($methods) {
    return [];
});
add_action('init', function() {
    add_filter('wp_headers', function($headers) {
        unset($headers['X-Pingback']);
        return $headers;
    });
});

/**
 * Query Strings aus statischen Assets entfernen
 * 
 * WordPress fügt ?ver= Parameter zu CSS/JS Dateien hinzu (für Cache-Busting).
 * Das ist gut für Updates, aber schlecht für CDNs. Da wir Vercel nutzen,
 * ist das nicht mehr kritisch, aber sauberer.
 * 
 * @since 1.0.0
 */
add_filter('script_loader_src', 'toolkit_replacement_remove_query_strings', 15);
add_filter('style_loader_src', 'toolkit_replacement_remove_query_strings', 15);

function toolkit_replacement_remove_query_strings($src) {
    if (strpos($src, '?ver=')) {
        $src = remove_query_arg('ver', $src);
    }
    if (strpos($src, '?v=')) {
        $src = remove_query_arg('v', $src);
    }
    return $src;
}

/**
 * Feed Links aus Header entfernen
 * 
 * RSS/Atom Feed Links sind für ein Headless CMS irrelevant, da das
 * Next.js Frontend keine Feeds anbietet (bzw. eigene implementieren könnte).
 * 
 * @since 1.0.0
 */
add_action('init', function() {
    remove_action('wp_head', 'feed_links', 2);
    remove_action('wp_head', 'feed_links_extra', 3);
});

/**
 * Verschiedene WordPress Meta-Tags entfernen
 * 
 * - RSD Link: Really Simple Discovery für XML-RPC Clients
 * - Shortlink: WordPress eigene URL-Verkürzung
 * - WLW Link: Windows Live Writer Support (veraltet)
 * - REST API Links: Nicht benötigt im Frontend (Headless)
 * - WP Generator: WordPress Versions-Tag (Sicherheitsrisiko)
 * 
 * @since 1.0.0
 */
remove_action('wp_head', 'rsd_link');                                    // RSD Discovery
remove_action('wp_head', 'wp_shortlink_wp_head', 10);                    // Shortlinks
remove_action('template_redirect', 'wp_shortlink_header', 11);
remove_action('wp_head', 'wlwmanifest_link');                            // Windows Live Writer
remove_action('wp_head', 'rest_output_link_wp_head', 10);                // REST API Links (Frontend)
remove_action('template_redirect', 'rest_output_link_header', 11);
remove_action('wp_head', 'wp_generator');                                // WP Version

/* ============================================================================
   SECTION 2: AUTOSAVE INTERVALL
   ============================================================================
   Standard WordPress: 60 Sekunden
   Dieses Plugin: 120 Sekunden (2 Minuten)
   
   Reduziert die Server-Last, wenn längere Texte im Editor geschrieben werden.
   Bei einem Headless CMS wird meist direkt in ACF gearbeitet, daher weniger
   kritisch, aber trotzdem sinnvoll.
   ============================================================================ */

if (!defined('AUTOSAVE_INTERVAL')) {
    define('AUTOSAVE_INTERVAL', 120); // 120 Sekunden = 2 Minuten
}

/* ============================================================================
   SECTION 3: DASHBOARD CLEANUP
   ============================================================================
   Entfernt überflüssige Widgets aus dem WordPress Admin Dashboard für eine
   aufgeräumtere Oberfläche. Die wichtigsten Widgets (ACF, RankMath) bleiben.
   ============================================================================ */

add_action('wp_dashboard_setup', function() {
    // Aktivität (Recent Comments, Posts, etc.)
    remove_meta_box('dashboard_activity', 'dashboard', 'normal');
    
    // "Auf einen Blick" (Post Counts, etc.)
    remove_meta_box('dashboard_right_now', 'dashboard', 'normal');
    
    // Schnellentwurf (Quick Draft Box)
    remove_meta_box('dashboard_quick_press', 'dashboard', 'side');
    
    // WordPress News/Blog
    remove_meta_box('dashboard_primary', 'dashboard', 'side');
    
    // Site Health Status
    remove_meta_box('dashboard_site_health', 'dashboard', 'normal');
    
    // Browser-Update Warnung (veraltet)
    remove_meta_box('dashboard_browser_nag', 'dashboard', 'normal');
    
    // PHP Update Warnung
    remove_meta_box('dashboard_php_nag', 'dashboard', 'normal');
}, 999);

/* ============================================================================
   SECTION 4: ADMIN ACCESS RESTRICTIONS
   ============================================================================
   Einschränkung des Plugin-Managements auf Administratoren.
   Erhöht die Sicherheit, falls mal andere User Accounts angelegt werden.
   ============================================================================ */

/**
 * Plugin-Seite nur für Administratoren zugänglich
 * 
 * @since 1.0.0
 */
add_action('admin_init', function() {
    if (!current_user_can('manage_options') && !defined('DOING_AJAX')) {
        global $pagenow;
        if ($pagenow === 'plugins.php') {
            wp_die(
                __('Zugriff verweigert. Nur Administratoren können Plugins verwalten.', 'toolkit-replacement'),
                __('Zugriff verweigert', 'toolkit-replacement'),
                ['response' => 403]
            );
        }
    }
});

/**
 * Plugin-Menü für Nicht-Admins ausblenden
 * 
 * @since 1.0.0
 */
add_action('admin_menu', function() {
    if (!current_user_can('manage_options')) {
        remove_menu_page('plugins.php');
    }
}, 999);

/* ============================================================================
   SECTION 5: SICHERHEITS-HEADER
   ============================================================================
   Setzt wichtige Security Headers für den HTTP Response.
   Diese Header werden vom Apache/Nginx Server gesendet und vom Browser
   ausgewertet.
   ============================================================================ */

/**
 * Security Headers setzen
 * 
 * X-Frame-Options: SAMEORIGIN
 * - Verhindert Clickjacking-Angriffe durch Einbettung in Frames
 * 
 * X-Content-Type-Options: nosniff  
 * - Verhindert MIME-Type Confusion Attacken
 * 
 * Referrer-Policy: strict-origin-when-cross-origin
 * - Kontrolliert, wieviel Referrer-Info bei externen Links gesendet wird
 * 
 * @since 1.0.0
 */
add_action('send_headers', function() {
    if (!is_admin()) {
        header('X-Frame-Options: SAMEORIGIN');
        header('X-Content-Type-Options: nosniff');
        header('Referrer-Policy: strict-origin-when-cross-origin');
    }
});

/* ============================================================================
   SECTION 6: PERFORMANCE OPTIMIERUNGEN
   ============================================================================
 * Kleine Optimierungen, die nicht kritisch sind aber nice-to-have.
 * ============================================================================ */

/**
 * jQuery Migrate entfernen
 * 
 * jQuery Migrate ist ein Kompatibilitäts-Script für alte Plugins.
 * Da wir nur moderne Plugins nutzen (ACF, RankMath), nicht nötig.
 * 
 * @since 1.0.0
 */
add_action('wp_default_scripts', function($scripts) {
    if (!is_admin() && isset($scripts->registered['jquery'])) {
        $script = $scripts->registered['jquery'];
        if ($script->deps) {
            $script->deps = array_diff($script->deps, ['jquery-migrate']);
        }
    }
});

/**
 * WordPress Version aus Script/Style URLs entfernen
 * 
 * Entfernt ?ver=x.x.x aus Asset-URLs. Geringer Sicherheitsgewinn
 * (Security through Obscurity) und sauberere URLs.
 * 
 * @since 1.0.0
 */
add_filter('style_loader_src', 'toolkit_replacement_remove_wp_version', 15);
add_filter('script_loader_src', 'toolkit_replacement_remove_wp_version', 15);

function toolkit_replacement_remove_wp_version($src) {
    global $wp_version;
    if (strpos($src, 'ver=' . $wp_version)) {
        $src = remove_query_arg('ver', $src);
    }
    return $src;
}

/* ============================================================================
   SECTION 7: DEBUG INFO
   ============================================================================
 * Zeigt eine Erfolgsnachricht im Admin, wenn das Plugin aktiv ist.
 * Hilfreich zur Verifizierung, dass das Plugin geladen wurde.
 * ============================================================================ */

add_action('admin_notices', function() {
    if (current_user_can('manage_options')) {
        echo '<div class="notice notice-success is-dismissible">';
        echo '<p><strong>Toolkit Replacement:</strong> Toolkit Master Features erfolgreich migriert. Plugin ist aktiv.</p>';
        echo '</div>';
    }
});

/* ============================================================================
   END OF PLUGIN
   ============================================================================ */
