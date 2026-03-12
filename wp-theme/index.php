<?php
/**
 * Index Template
 * 
 * Dieses Theme hat kein Frontend-Design.
 * Alle Anfragen werden vom Next.js Frontend bedient.
 * 
 * Diese Datei existiert nur, damit WordPress nicht meckert.
 * 
 * @package AykutAskeriHeadless
 */

// Für eingeloggte User: Admin-Übersicht anzeigen
if (is_user_logged_in()) {
    get_header();
    ?>
    <div style="max-width: 800px; margin: 50px auto; padding: 20px; font-family: sans-serif;">
        <h1>Aykut Askeri - Headless CMS</h1>
        <p>Dies ist das WordPress Backend für <a href="https://aykutaskeri.de">aykutaskeri.de</a></p>
        <p>Das Frontend wird von Next.js auf Vercel bedient.</p>
        
        <h2>Quick Links</h2>
        <ul>
            <li><a href="<?php echo admin_url('edit.php?post_type=cv'); ?>">CVs verwalten</a></li>
            <li><a href="<?php echo admin_url('edit.php?post_type=acf-field-group'); ?>">ACF Felder</a></li>
            <li><a href="https://aykutaskeri.de" target="_blank">Frontend öffnen</a></li>
        </ul>
        
        <h2>API Endpoints</h2>
        <ul>
            <li><a href="<?php echo home_url('/wp-json/wp/v2/cv'); ?>" target="_blank">CVs API</a></li>
            <li><a href="<?php echo home_url('/wp-json/acf/v3/cv'); ?>" target="_blank">ACF API</a></li>
        </ul>
    </div>
    <?php
    get_footer();
} else {
    // Nicht eingeloggte User: Zur Frontend-URL umleiten
    wp_redirect('https://aykutaskeri.de', 301);
    exit;
}
