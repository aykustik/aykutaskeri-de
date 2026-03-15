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

add_action('init', function() {
    $allowed_origins = [
        'https://aykutaskeri.de',
        'https://staging.aykutaskeri.de',
        'http://localhost:3000',
    ];

    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

    if (in_array($origin, $allowed_origins, true)) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
    }

    // OPTIONS Preflight sofort beantworten
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        status_header(200);
        exit;
    }
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
