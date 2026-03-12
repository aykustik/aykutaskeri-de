<?php
/**
 * Single Post Template
 * 
 * Weiterleitung zum Frontend
 * 
 * @package AykutAskeriHeadless
 */

if (is_user_logged_in()) {
    get_header();
    ?>
    <div style="max-width: 800px; margin: 50px auto; padding: 20px; font-family: sans-serif;">
        <h1><?php the_title(); ?></h1>
        <p>Dieser Inhalt wird im Next.js Frontend dargestellt.</p>
        <p><a href="<?php echo get_permalink(); ?>" target="_blank">Im Frontend ansehen</a></p>
        <hr>
        <?php the_content(); ?>
    </div>
    <?php
    get_footer();
} else {
    wp_redirect('https://aykutaskeri.de', 301);
    exit;
}
