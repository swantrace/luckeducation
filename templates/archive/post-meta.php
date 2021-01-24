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
<?php if ( has_category() ) : ?>
<div class="post-category-wrap">
    <span><?php echo esc_html__( 'Posted in', 'graneon' ); ?></span>
    <span class="post-category">
        <?php echo get_the_category_list(', '); ?>
    </span>
</div>
<?php endif; ?>
<div class="post-meta-author"><span class="post-by"><?php echo esc_html__('by', 'graneon') ?></span>
    <?php printf('<a href="%1$s">%2$s</a>', esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ), esc_html( get_the_author() )); ?>
</div>
<div class="post-meta-date">
    <i class="fa fa-calendar"></i><?php echo date_i18n( get_option( 'date_format' ), strtotime(get_the_date('Y-m-d')) ); ?>
</div>
<div class="post-meta-comment">
    <i class="ion ion-md-chatboxes"></i>
    <?php 
        $num_comments = get_comments_number();
        if ( $num_comments == 0 ) {
            $comments = esc_html__( 'No Comments', 'graneon' );
        } elseif ( $num_comments > 1 ) {
            $comments = $num_comments . esc_html__( ' Comments', 'graneon' );
        } else {
            $comments = esc_html__( '1 Comment', 'graneon' );
        }
        printf('<a href="%1$s">%2$s</a>', esc_url( get_comments_link() ), $comments ); 
    ?>
</div>
<?php if ( is_sticky() ) : ?>
<div class="post-meta-sticky"><i class="fa fa-flag"></i><?php echo esc_html__( 'Sticky', 'graneon' ); ?></div>
<?php endif; ?>