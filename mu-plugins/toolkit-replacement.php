<?php
/**
 * Plugin Name: Toolkit Replacement
 * Description: Ersetzt Toolkit Master Features nach Migration
 * Version: 1.0.0
 * Author: ACF CLI Tool
 */

// Verhindere direkten Zugriff
if (!defined('ABSPATH')) {
    exit;
}

/**
 * ============================================
 * 1. WP BLOAT REMOVAL (Sichere Features)
 * ============================================
 */

// Emojis deaktivieren
add_action('init', function() {
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('admin_print_scripts', 'print_emoji_detection_script');
    remove_action('wp_print_styles', 'print_emoji_styles');
    remove_action('admin_print_styles', 'print_emoji_styles');
    remove_filter('the_content_feed', 'wp_staticize_emoji');
    remove_filter('comment_text_rss', 'wp_staticize_emoji');
    remove_filter('wp_mail', 'wp_staticize_emoji_for_email');
    
    // TinyMCE Emojis entfernen
    add_filter('tiny_mce_plugins', function($plugins) {
        if (is_array($plugins)) {
            return array_diff($plugins, ['wpemoji']);
        }
        return [];
    });
});

// Dashicons für nicht-Admin-User entfernen
add_action('wp_enqueue_scripts', function() {
    if (!is_admin_bar_showing()) {
        wp_deregister_style('dashicons');
    }
});

// oEmbed deaktivieren
add_action('init', function() {
    // oEmbed Discovery Links entfernen
    remove_action('wp_head', 'wp_oembed_add_discovery_links');
    remove_action('wp_head', 'wp_oembed_add_host_js');
    
    // oEmbed Endpoints deaktivieren
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

// XML-RPC deaktivieren
add_filter('xmlrpc_enabled', '__return_false');
add_filter('xmlrpc_methods', function($methods) {
    return [];
});
add_action('init', function() {
    // XML-RPC Pingback deaktivieren
    add_filter('wp_headers', function($headers) {
        unset($headers['X-Pingback']);
        return $headers;
    });
});

// Query Strings aus statischen Assets entfernen
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

// Feed Links aus Header entfernen
add_action('init', function() {
    remove_action('wp_head', 'feed_links', 2);
    remove_action('wp_head', 'feed_links_extra', 3);
});

// RSD Link entfernen (Really Simple Discovery)
remove_action('wp_head', 'rsd_link');

// Shortlink Meta-Tag entfernen
remove_action('wp_head', 'wp_shortlink_wp_head', 10);
remove_action('template_redirect', 'wp_shortlink_header', 11);

// Windows Live Writer Link entfernen
remove_action('wp_head', 'wlwmanifest_link');

// REST API Links aus Header entfernen (für Frontend)
remove_action('wp_head', 'rest_output_link_wp_head', 10);
remove_action('template_redirect', 'rest_output_link_header', 11);

// WP Generator Meta-Tag entfernen
remove_action('wp_head', 'wp_generator');

/**
 * ============================================
 * 2. AUTOSAVE INTERVALL (2 Minuten)
 * ============================================
 */

define('AUTOSAVE_INTERVAL', 120); // 120 Sekunden = 2 Minuten

/**
 * ============================================
 * 3. DASHBOARD CLEANUP
 * ============================================
 */

add_action('wp_dashboard_setup', function() {
    // Standard Dashboard Widgets entfernen
    remove_meta_box('dashboard_activity', 'dashboard', 'normal');
    remove_meta_box('dashboard_right_now', 'dashboard', 'normal');
    remove_meta_box('dashboard_quick_press', 'dashboard', 'side');
    remove_meta_box('dashboard_primary', 'dashboard', 'side');
    remove_meta_box('dashboard_site_health', 'dashboard', 'normal');
    remove_meta_box('dashboard_browser_nag', 'dashboard', 'normal');
    remove_meta_box('dashboard_php_nag', 'dashboard', 'normal');
}, 999);

/**
 * ============================================
 * 4. ADMIN ACCESS RESTRICTIONS
 * ============================================
 */

// Plugin-Seite nur für Administratoren
add_action('admin_init', function() {
    if (!current_user_can('manage_options') && !defined('DOING_AJAX')) {
        // Nur auf der Plugin-Seite restricten
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

// Plugin-Menü für Nicht-Admins ausblenden
add_action('admin_menu', function() {
    if (!current_user_can('manage_options')) {
        remove_menu_page('plugins.php');
    }
}, 999);

/**
 * ============================================
 * 5. SICHERHEITS-HEADER
 * ============================================
 */

// X-Frame-Options Header (Clickjacking Protection)
add_action('send_headers', function() {
    if (!is_admin()) {
        header('X-Frame-Options: SAMEORIGIN');
        header('X-Content-Type-Options: nosniff');
        header('Referrer-Policy: strict-origin-when-cross-origin');
    }
});

/**
 * ============================================
 * 6. PERFORMANCE OPTIMIERUNGEN
 * ============================================
 */

// Heartbeat API Standard lassen (15 Sekunden ist WordPress Default)
// KEINE Modifikation hier!

// jQuery Migrate deaktivieren (wenn nicht benötigt)
add_action('wp_default_scripts', function($scripts) {
    if (!is_admin() && isset($scripts->registered['jquery'])) {
        $script = $scripts->registered['jquery'];
        if ($script->deps) {
            $script->deps = array_diff($script->deps, ['jquery-migrate']);
        }
    }
});

// WordPress Version aus Scripts/Styles entfernen
add_filter('style_loader_src', 'toolkit_replacement_remove_wp_version', 15);
add_filter('script_loader_src', 'toolkit_replacement_remove_wp_version', 15);

function toolkit_replacement_remove_wp_version($src) {
    global $wp_version;
    if (strpos($src, 'ver=' . $wp_version)) {
        $src = remove_query_arg('ver', $src);
    }
    return $src;
}

/**
 * ============================================
 * 7. DEBUG INFO
 * ============================================
 */

// Admin Notice wenn Plugin aktiv
add_action('admin_notices', function() {
    if (current_user_can('manage_options')) {
        echo '<div class="notice notice-success is-dismissible">';
        echo '<p><strong>Toolkit Replacement:</strong> Toolkit Master Features erfolgreich migriert.</p>';
        echo '</div>';
    }
});
