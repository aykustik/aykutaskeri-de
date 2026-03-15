<?php
/**
 * Aykut Askeri Headless Theme - functions.php
 * 
 * Dieses Theme ist für ein Headless CMS Setup mit Next.js Frontend.
 * Es enthält kein Frontend-Design, sondern nur WordPress-Konfiguration.
 * 
 * Alle Features sind in MU-Plugins ausgelagert:
 * - headless-api.php (Kontaktformular API + Admin-Toolbar)
 * - samesite-cookie.php (SameSite Cookie Fix)
 * - toolkit-replacement.php (Performance & Security)
 * 
 * @package AykutAskeriHeadless
 * @version 1.0.0
 */

// Verhindere direkten Zugriff
if (!defined('ABSPATH')) {
    exit;
}

/**
 * ============================================
 * THEME SETUP
 * ============================================
 */

/**
 * Theme Setup Funktion
 * Wird beim Aktivieren des Themes ausgeführt
 * 
 * @since 1.0.0
 */
function aykutaskeri_headless_setup() {
    // Theme Support deklarieren
    add_theme_support('post-thumbnails');
    add_theme_support('title-tag');
    
    // Menü-Positionen registrieren (falls mal benötigt)
    register_nav_menus([
        'primary' => __('Hauptmenü', 'aykutaskeri-headless'),
    ]);
}
add_action('after_setup_theme', 'aykutaskeri_headless_setup');

/**
 * ============================================
 * HEADLESS CMS CONFIGURATION
 * ============================================
 */

/**
 * Frontend-URL für Headless Setup
 * Leitet alle Frontend-Anfragen zu Next.js um
 * 
 * @since 1.0.0
 */
function aykutaskeri_headless_template_redirect() {
    // Nur für Frontend (nicht Admin, nicht API, nicht Cron)
    if (is_admin() || defined('REST_REQUEST') || defined('DOING_CRON')) {
        return;
    }
    
    // Nicht für eingeloggte User (damit Preview funktioniert)
    if (is_user_logged_in()) {
        return;
    }
    
    // Zur Next.js App umleiten
    // Hinweis: In Produktion sollte das besser über .htaccess oder Server-Config gelöst werden
    // Dies ist nur als Fallback
    wp_redirect('https://aykutaskeri.de', 301);
    exit;
}
// AUSKOMMENTIERT - Lass WordPress als API laufen, keine Weiterleitung
// add_action('template_redirect', 'aykutaskeri_headless_template_redirect');

/**
 * Admin Bar für nicht-Admins ausblenden
 * Da es kein Frontend-Theme gibt, ist die Admin Bar im Frontend störend
 * 
 * @since 1.0.0
 */
add_filter('show_admin_bar', function($show) {
    return current_user_can('manage_options');
});

/**
 * ============================================
 * CUSTOM POST TYPE SUPPORT
 * ============================================
 * 
 * Diese Sektion kann erweitert werden, wenn neue Post Types benötigt werden.
 * Aktuell werden CV Post Types über ACF verwaltet.
 */

/**
 * Beispiel: Custom Post Type registrieren
 * 
 * @since 1.0.0
 */
// add_action('init', function() {
//     register_post_type('portfolio', [
//         'labels' => [
//             'name' => 'Portfolio',
//             'singular_name' => 'Portfolio Item'
//         ],
//         'public' => true,
//         'has_archive' => false,
//         'supports' => ['title', 'editor', 'thumbnail'],
//         'show_in_rest' => true,
//     ]);
// });

/**
 * ============================================
 * API EXTENSIONS
 * ============================================
 * 
 * Hier können REST API Erweiterungen hinzugefügt werden.
 * ACF-Fields werden automatisch über acf-to-rest-api ausgegeben.
 */

/**
 * Zusätzliche Felder zur REST API hinzufügen
 * 
 * @since 1.0.0
 */
// add_action('rest_api_init', function() {
//     register_rest_field('cv', 'custom_field', [
//         'get_callback' => function($post) {
//             return get_post_meta($post['id'], 'custom_field', true);
//         },
//     ]);
// });

/**
 * ============================================
 * ADMIN CUSTOMIZATIONS
 * ============================================
 */

/**
 * Admin Footer Text anpassen
 * 
 * @since 1.0.0
 */
add_filter('admin_footer_text', function() {
    return 'Aykut Askeri Headless CMS | <a href="https://aykutaskeri.de" target="_blank">Frontend ansehen</a>';
});

/**
 * Login Logo URL anpassen
 * 
 * @since 1.0.0
 */
add_filter('login_headerurl', function() {
    return 'https://aykutaskeri.de';
});

add_filter('login_headertext', function() {
    return 'Aykut Askeri';
});

/**
 * Frontend URL für eingeloggte User korrigieren
 * Der "Seite anzeigen" Link in der WP-Admin Topbar soll auf die Hauptdomain zeigen.
 *
 * WICHTIG: REST-API-Pfade (wp-json) werden ausdrücklich ausgenommen,
 * da WordPress rest_url() intern über home_url() aufbaut und sonst
 * der Slash zwischen Domain und Pfad fehlt (z.B. "aykutaskeri.dewp-json").
 *
 * @since 1.0.1
 */
add_filter('home_url', function($url, $path, $scheme) {
    // Nur für eingeloggte User im Admin-Bereich
    if (!is_user_logged_in() || !is_admin()) {
        return $url;
    }

    // REST-API-Pfade NICHT umschreiben (würde rest_url() kaputtmachen)
    if (strpos($path, 'wp-json') !== false || strpos($path, 'wp-login') !== false) {
        return $url;
    }

    return 'https://aykutaskeri.de/' . ltrim($path, '/');
}, 10, 3);

add_filter('post_link', function($permalink, $post) {
    // Für eingeloggte User: URL zur Hauptdomain korrigieren
    if (is_user_logged_in() && is_admin()) {
        return str_replace('https://wp.aykutaskeri.de', 'https://aykutaskeri.de', $permalink);
    }
    return $permalink;
}, 10, 2);

/**
 * ============================================
 * DEVELOPMENT HELPERS
 * ============================================
 * 
 * Diese Funktionen helfen bei der Entwicklung.
 * In Produktion können sie auskommentiert werden.
 */

/**
 * Debug Info im Admin anzeigen (nur für Admins)
 * 
 * @since 1.0.0
 */
// add_action('admin_notices', function() {
//     if (current_user_can('manage_options')) {
//         echo '<div class="notice notice-info">';
//         echo '<p><strong>Headless Theme:</strong> Aktiv</p>';
//         echo '</div>';
//     }
// });
