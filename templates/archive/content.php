<?php
/**
 * @package    HaruTheme
 * @version    1.0.0
 * @author     Administrator <admin@harutheme.com>
 * @copyright  Copyright (c) 2017, HaruTheme
 * @license    http://opensource.org/licenses/gpl-2.0.php GPL v2 or later
 * @link       http://harutheme.com
*/

// Process archive post class
$archive_display_columns = isset($_GET['columns']) ? $_GET['columns'] : '';
if ( !in_array($archive_display_columns, array('2','3','4')) ) {
    $archive_display_columns = haru_get_option('haru_archive_display_columns');
} 
// Class archive blog
$archive_display_type = isset($_GET['style']) ? $_GET['style'] : '';
if ( $archive_display_type == '' ) {
    $archive_display_type = haru_get_option('haru_archive_display_type');
}

// Set Default
if ( empty($archive_display_type) ) {
    $archive_display_type = 'large-image';
}

$post_classes[] = $archive_display_type;
if ( in_array($archive_display_type, array('grid','masonry')) ) {
    if ( $archive_display_columns == '2' ) {
        $post_classes[] = 'col-md-6 col-sm-6 col-xs-12';
    } elseif ( $archive_display_columns == '3' ) {
        $post_classes[] = 'col-md-4 col-sm-6 col-xs-12';
    } elseif ( $archive_display_columns == '4' ) {
        $post_classes[] = 'col-md-3 col-sm-6 col-xs-12';
    }
} else {
    $post_classes[] = 'col-md-12 col-sm-12 col-xs-12';
}

$post_excerpt = haru_get_option('haru_archive_number_exceprt');
if ( !empty($post_excerpt) ) {
    $post_excerpt = haru_get_option('haru_archive_number_exceprt');
}
// Set Default
else {
    $post_excerpt = 30; // Need to change to other number to show all post_content
}

?>
<article id="post-<?php the_ID(); ?>" <?php post_class($post_classes); ?> >
    <div class="post-wrapper clearfix">
        <?php
        $thumbnail = haru_post_thumbnail();
        if ( !empty($thumbnail) ) : ?>
            <div class="post-thumbnail-wrapper">
                <?php echo wp_kses_post( $thumbnail ); ?>
                
            </div>
        <?php endif; ?>
        <div class="post-content-wrapper">
            <div class="post-detail">
                <div class="post-meta-info">
                    <?php get_template_part( 'templates/archive/post-meta' ); ?>
                </div>
                <div class="post-detail-content">
                    <h3 class="post-title">
                        <a href="<?php the_permalink(); ?>" rel="bookmark" title="<?php the_title_attribute(); ?>"><?php the_title(); ?></a>
                    </h3>
                    <div class="post-excerpt">
                        <?php 
                            if ( has_excerpt() ) {
                                echo wp_trim_words( get_the_excerpt(), $post_excerpt, '...' );
                            } else {
                                echo wp_trim_words( get_the_content(), $post_excerpt, '...' ); 
                            }
                        ?>
                    </div>
                    <div class="post-read-more">
                        <a href="<?php the_permalink(); ?>" class="read-more" rel="bookmark" title="<?php the_title_attribute(); ?>"><?php echo esc_html__( '阅读全文', 'graneon' ); ?><i class="zmdi zmdi-chevron-right"></i></a>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</article>