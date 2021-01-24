<?php
/**
 * @package    HaruTheme
 * @version    1.0.0
 * @author     Administrator <admin@harutheme.com>
 * @copyright  Copyright (c) 2017, HaruTheme
 * @license    http://opensource.org/licenses/gpl-2.0.php GPL v2 or later
 * @link       http://harutheme.com
*/
?>
<?php if (is_home() && current_user_can('publish_posts')): ?>
    <div class="col-md-12">
        <p><?php printf(wp_kses_post(__( 'Ready to publish your first post? <a href="%1$s">Get started here</a>.', 'graneon' )), admin_url('post-new.php')); ?></p>
    </div>
<?php elseif (is_search()) : ?>
    <div class="col-md-12">
        <p class="search-not-found"><?php echo esc_html__( 'Sorry, but nothing matched your search terms. Please try again with different keywords.', 'graneon' ); ?></p>
        <?php get_search_form(); ?>
    </div>
<?php else: ?>
    <div class="col-md-12">
        <p><?php echo esc_html__( 'It seems we can&rsquo;t find what you&rsquo;re looking for. Perhaps searching can help.', 'graneon' ); ?></p>
        <?php get_search_form(); ?>
    </div>
<?php endif; ?>