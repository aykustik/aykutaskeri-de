<?php
/**
 * Archive Template
 * 
 * Weiterleitung zum Frontend
 * 
 * @package AykutAskeriHeadless
 */

if (is_user_logged_in()) {
    get_header();
    ?>
    <div style="max-width: 800px; margin: 50px auto; padding: 20px; font-family: sans-serif;">
        <h1>Archive</h1>
        <p>Archive werden im Next.js Frontend dargestellt.</p>
        <p><a href="https://aykutaskeri.de">Zum Frontend</a></p>
    </div>
    <?php
    get_footer();
} else {
    wp_redirect('https://aykutaskeri.de', 301);
    exit;
}
