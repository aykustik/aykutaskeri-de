<?php
/**
 * Plugin Name: SameSite Cookie Support
 * Description: Sets SameSite=None for authentication cookies to enable cross-origin requests from Next.js frontend
 * Version: 1.0
 */

if (!defined('ABSPATH')) {
    exit;
}

// Only override if WordPress doesn't have native support
if (!function_exists('wp_set_auth_cookie')) :

function wp_set_auth_cookie(int $user_id, bool $remember = false, $secure = '', string $token = '') {
    if ($remember) {
        $expiration = time() + apply_filters('auth_cookie_expiration', 14 * DAY_IN_SECONDS, $user_id, $remember);
        $expire = $expiration + (12 * HOUR_IN_SECONDS);
    } else {
        $expiration = time() + apply_filters('auth_cookie_expiration', 2 * DAY_IN_SECONDS, $user_id, $remember);
        $expire = 0;
    }

    if ('' === $secure) {
        $secure = is_ssl();
    }

    $secure_logged_in_cookie = $secure && 'https' === parse_url(get_option('home'), PHP_URL_SCHEME);
    $secure = apply_filters('secure_auth_cookie', $secure, $user_id);
    $secure_logged_in_cookie = apply_filters('secure_logged_in_cookie', $secure_logged_in_cookie, $user_id, $secure);

    if ($secure) {
        $auth_cookie_name = SECURE_AUTH_COOKIE;
        $scheme = 'secure_auth';
    } else {
        $auth_cookie_name = AUTH_COOKIE;
        $scheme = 'auth';
    }

    if ('' === $token) {
        $manager = WP_Session_Tokens::get_instance($user_id);
        $token = $manager->create($expiration);
    }

    $auth_cookie = wp_generate_auth_cookie($user_id, $expiration, $scheme, $token);
    $logged_in_cookie = wp_generate_auth_cookie($user_id, $expiration, 'logged_in', $token);

    do_action('set_auth_cookie', $auth_cookie, $expire, $expiration, $user_id, $scheme, $token);
    do_action('set_logged_in_cookie', $logged_in_cookie, $expire, $expiration, $user_id, 'logged_in', $token);

    if (!apply_filters('send_auth_cookies', true, $expire, $expiration, $user_id, $scheme, $token)) {
        return;
    }

    // SameSite=None for cross-origin support
    $samesite = 'None';

    $base_options = [
        'expires' => $expire,
        'domain' => COOKIE_DOMAIN,
        'httponly' => true,
        'samesite' => $samesite,
    ];

    // Set cookies with SameSite=None
    samesite_setcookie($auth_cookie_name, $auth_cookie, $base_options + ['secure' => $secure, 'path' => PLUGINS_COOKIE_PATH]);
    samesite_setcookie($auth_cookie_name, $auth_cookie, $base_options + ['secure' => $secure, 'path' => ADMIN_COOKIE_PATH]);
    samesite_setcookie(LOGGED_IN_COOKIE, $logged_in_cookie, $base_options + ['secure' => $secure_logged_in_cookie, 'path' => COOKIEPATH]);
    if (COOKIEPATH != SITECOOKIEPATH) {
        samesite_setcookie(LOGGED_IN_COOKIE, $logged_in_cookie, $base_options + ['secure' => $secure_logged_in_cookie, 'path' => SITECOOKIEPATH]);
    }
}

/**
 * Custom setcookie function with SameSite support for PHP < 7.3
 */
function samesite_setcookie($name, $value, array $options) {
    $header = 'Set-Cookie:';
    $header .= rawurlencode($name) . '=' . rawurlencode($value) . ';';

    if (!empty($options['expires']) && $options['expires'] > 0) {
        $header .= 'expires=' . gmdate('D, d-M-Y H:i:s T', (int)$options['expires']) . ';';
        $header .= 'Max-Age=' . max(0, (int)($options['expires'] - time())) . ';';
    }

    $header .= 'path=' . rawurlencode($options['path']) . ';';
    if (!empty($options['domain'])) {
        $header .= 'domain=' . rawurlencode($options['domain']) . ';';
    }

    if (!empty($options['secure'])) {
        $header .= 'secure;';
    }
    $header .= 'httponly;';
    $header .= 'SameSite=' . rawurlencode($options['samesite']);

    header($header, false);
    $_COOKIE[$name] = $value;
}

endif;
