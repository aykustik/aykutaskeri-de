<?php
/**
 * Plugin Name: Headless API
 * Description: REST-API Endpoints für das Next.js Headless-Frontend auf aykutaskeri.de
 * Version: 1.0
 *
 * Endpoints:
 * - POST /wp-json/custom/v1/send-contact  — Kontaktformular
 * - GET  /wp-json/custom/v1/auth-status   — Login-Status für Admin Floating Button
 */

if (!defined('ABSPATH')) {
    exit;
}

// ============================================================================
// CORS: Erlaubt Requests mit Credentials vom Next.js Frontend
// Muss vor rest_api_init laufen damit OPTIONS Preflight korrekt beantwortet wird
// ============================================================================

/**
 * Hilfsfunktion: Prüft ob Origin erlaubt ist
 */
function headless_api_is_allowed_origin(string $origin): bool {
    $allowed = [
        'https://aykutaskeri.de',
        'https://staging.aykutaskeri.de',
        'http://localhost:3000',
    ];
    return in_array($origin, $allowed, true)
        || (strlen($origin) > 0 && preg_match('#^https://aykutaskeri(-[a-z0-9]+)?-aykustik\.vercel\.app$#', $origin));
}

// OPTIONS Preflight früh abfangen (vor WordPress-Routing)
add_action('init', function() {
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
        if (headless_api_is_allowed_origin($origin)) {
            header('Access-Control-Allow-Origin: ' . $origin);
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
            header('Access-Control-Allow-Headers: Content-Type, Authorization');
            status_header(200);
            exit;
        }
    }
});

// ============================================================================
// SAMESITE=NONE: WordPress-Login-Cookie für Cross-Origin-Requests freigeben
//
// Browser blockieren standardmäßig Cookies von fremden Domains (SameSite=Lax).
// Da das Next.js Frontend (aykutaskeri.de) Cookies von wp.aykutaskeri.de
// mitsenden muss, werden die WP-Auth-Cookies beim Login mit
// SameSite=None; Secure neu gesetzt.
//
// Betrifft nur den Login-Vorgang — danach trägt der Browser den Cookie
// automatisch bei jedem credentials: 'include' Fetch mit.
// ============================================================================

add_action('set_logged_in_cookie', function(
    string $logged_in_cookie,
    int $expire,
    int $expiration,
    int $user_id,
    string $scheme,
    string $token
) {
    // Standard-Cookie-Name ermitteln
    $cookie_name = LOGGED_IN_COOKIE;

    // Cookie mit SameSite=None; Secure überschreiben
    // (PHP 7.3+ unterstützt SameSite als Array-Option)
    if (PHP_VERSION_ID >= 70300) {
        setcookie($cookie_name, $logged_in_cookie, [
            'expires'  => $expire,
            'path'     => COOKIEPATH,
            'domain'   => COOKIE_DOMAIN,
            'secure'   => true,
            'httponly' => true,
            'samesite' => 'None',
        ]);
    } else {
        // Fallback für ältere PHP-Versionen
        header(sprintf(
            'Set-Cookie: %s=%s; expires=%s; path=%s; domain=%s; Secure; HttpOnly; SameSite=None',
            $cookie_name,
            rawurlencode($logged_in_cookie),
            gmdate('D, d M Y H:i:s T', $expire),
            COOKIEPATH,
            COOKIE_DOMAIN
        ), false);
    }
}, 10, 6);

// CORS-Header für alle REST API Responses setzen
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');

    add_filter('rest_pre_serve_request', function($served, $result, $request, $server) {
        $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
        if (headless_api_is_allowed_origin($origin)) {
            header('Access-Control-Allow-Origin: ' . $origin);
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
            header('Access-Control-Allow-Headers: Content-Type, Authorization');
        }
        return $served;
    }, 10, 4);
});

// ============================================================================
// ENDPOINT: Kontaktformular
// POST /wp-json/custom/v1/send-contact
// ============================================================================

add_action('rest_api_init', function() {
    register_rest_route('custom/v1', '/send-contact', [
        'methods'  => 'POST',
        'callback' => function(WP_REST_Request $request) {
            $data = $request->get_json_params();

            $absender_email     = sanitize_email($data['absender_email'] ?? '');
            $cv_email           = sanitize_email($data['cv_email'] ?? '');
            $stellenbezeichnung = sanitize_text_field($data['stellenbezeichnung'] ?? '');
            $anstellungsart_gew = sanitize_text_field($data['anstellungsart_gewunscht'] ?? '');
            $beworbene_anst     = sanitize_text_field($data['beworbene_anstellungsart'] ?? '');
            $cv_firma           = sanitize_text_field($data['cv_firma'] ?? '-');
            $cv_ansprechpartner = sanitize_text_field($data['cv_ansprechpartner'] ?? '');
            $response           = sanitize_text_field($data['response'] ?? '');
            $nachricht          = sanitize_textarea_field($data['nachricht'] ?? '');
            $url                = esc_url_raw($data['url'] ?? '');
            $datum              = sanitize_text_field($data['datum'] ?? '');
            $uhrzeit            = sanitize_text_field($data['uhrzeit'] ?? '');

            if (!$absender_email || !$cv_email) {
                return rest_ensure_response([
                    'success' => false,
                    'message' => 'E-Mail-Adresse fehlt.'
                ]);
            }

            $subject = $response === 'yes'
                ? "Positive R\u{00FC}ckmeldung von $cv_firma auf \u{201E}aykutaskeri.de\u{201C}"
                : "Negative R\u{00FC}ckmeldung von $cv_firma auf \u{201E}aykutaskeri.de\u{201C}";

            $from_name = $cv_ansprechpartner && $cv_ansprechpartner !== '-'
                ? "$cv_ansprechpartner von $cv_firma"
                : $cv_firma;
            $from = "$from_name <kontakt@aykutaskeri.de>";

            $body  = "Stellenbezeichnung: $stellenbezeichnung\n";
            $body .= "Anstellungsart (gewünscht): $anstellungsart_gew\n";
            $body .= "Anstellungsart (beworben): $beworbene_anst\n";
            $body .= "Firma: $cv_firma\n";
            $body .= "Ansprechpartner: $cv_ansprechpartner\n";
            $body .= "\n";
            $body .= "Sollen wir uns kennenlernen: " . ($response === 'yes' ? 'Ja' : 'Nein') . "\n";
            $body .= "Nachricht: $nachricht\n";
            $body .= "\n---\n";
            $body .= "Datum: $datum\n";
            $body .= "Uhrzeit: $uhrzeit\n";
            $body .= "URL: $url";

            $headers = [
                'Content-Type: text/plain; charset=UTF-8',
                "From: $from",
                "Reply-To: $absender_email",
            ];

            $sent = wp_mail($cv_email, $subject, $body, $headers);

            return rest_ensure_response([
                'success' => $sent,
                'message' => $sent
                    ? 'E-Mail wurde erfolgreich gesendet.'
                    : 'Fehler beim Senden der E-Mail.'
            ]);
        },
        'permission_callback' => '__return_true',
    ]);

    // ============================================================================
    // ENDPOINT: Auth-Status
    // GET /wp-json/custom/v1/auth-status
    //
    // Gibt zurück ob der aktuelle Browser-User in WordPress eingeloggt ist.
    // Wird vom AdminFloatingButton im Next.js Frontend genutzt.
    // Authentifizierung läuft ausschließlich über den WP Session Cookie —
    // kein Token, kein separates Auth-System nötig.
    // ============================================================================

    register_rest_route('custom/v1', '/auth-status', [
        'methods'  => 'GET',
        'callback' => function(WP_REST_Request $request) {
            $logged_in = is_user_logged_in();

            if (!$logged_in) {
                return rest_ensure_response([
                    'logged_in' => false,
                ]);
            }

            $user      = wp_get_current_user();
            $can_edit  = user_can($user, 'edit_posts');

            return rest_ensure_response([
                'logged_in'    => true,
                'display_name' => $user->display_name,
                'can_edit'     => $can_edit,
            ]);
        },
        'permission_callback' => '__return_true',
    ]);
});
