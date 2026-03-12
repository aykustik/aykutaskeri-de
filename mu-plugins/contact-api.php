<?php
/**
 * Plugin Name: Contact Form API
 * Description: REST-API für das Kontaktformular auf aykutaskeri.de
 * Version: 1.2
 */

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

            // Betreff mit Firma
            $subject = $response === 'yes'
                ? "Positive R\u{00FC}ckmeldung von $cv_firma auf \u{201E}aykutaskeri.de\u{201C}"
                : "Negative R\u{00FC}ckmeldung von $cv_firma auf \u{201E}aykutaskeri.de\u{201C}";

            // From: Ansprechpartner von Firma <kontakt@aykutaskeri.de>
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

            if ($sent) {
                return rest_ensure_response([
                    'success' => true,
                    'message' => 'E-Mail wurde erfolgreich gesendet.'
                ]);
            } else {
                return rest_ensure_response([
                    'success' => false,
                    'message' => 'Fehler beim Senden der E-Mail.'
                ]);
            }
        },
        'permission_callback' => '__return_true'
    ]);
});
