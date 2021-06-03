<?php 
/**
 * @package    HaruTheme
 * @version    1.0.0
 * @author     Administrator <admin@harutheme.com>
 * @copyright  Copyright (c) 2017, HaruTheme
 * @license    http://opensource.org/licenses/gpl-2.0.php GPL v2 or later
 * @link       http://harutheme.com
*/
get_header();
// Process Archive layout
$archive_layout = isset($_GET['layout']) ? $_GET['layout'] : '';
if ( !in_array($archive_layout, array('full','container')) ) {
    $archive_layout = haru_get_option('haru_archive_layout');
}
// Set Default
if ( empty($archive_layout) ) {
    $archive_layout = 'container';
}

// Process sidebar
$archive_sidebar = isset($_GET['sidebar']) ? $_GET['sidebar'] : '';
if( !in_array($archive_sidebar, array('none','left','right')) ) {
    $archive_sidebar = haru_get_option('haru_archive_sidebar');
}
// Set Default
if ( empty($archive_sidebar) ) {
    $archive_sidebar = 'right';
}

$archive_left_sidebar  = haru_get_option('haru_archive_left_sidebar');
$archive_right_sidebar = haru_get_option('haru_archive_right_sidebar');
// Set Default
if ( empty($archive_left_sidebar) ) {
    $archive_left_sidebar = 'sidebar-1';
}
if ( empty($archive_right_sidebar) ) {
    $archive_right_sidebar = 'sidebar-1';
}

if( $archive_sidebar != 'none' && (is_active_sidebar( $archive_left_sidebar ) || is_active_sidebar( $archive_right_sidebar )) ) {
    $archive_content_col = 9;
} else {
    $archive_content_col = 12;
}

// Process display type and display columns and paging style
$archive_display_type = haru_get_option('haru_archive_display_type');
// Set Default
if ( empty($archive_display_type) ) {
    $archive_display_type = 'large-image';
}

$archive_display_columns = isset($_GET['columns']) ? $_GET['columns'] : '';
if ( !in_array($archive_display_columns, array('2','3','4')) ) {
    $archive_display_columns = haru_get_option('haru_archive_display_columns');
}

// Process paging
$archive_paging_style = isset($_GET['paging']) ? $_GET['paging'] : '';
if ( !in_array($archive_paging_style, array('default','load-more','infinity-scroll')) ) {
    $archive_paging_style = haru_get_option('haru_archive_paging_style');
}
// Set Default
if ( empty($archive_paging_style) ) {
    $archive_paging_style = 'default';
}

?>
<?php 
    /*
    *   @hooked - haru_archive_heading - 5
    */
    do_action( 'haru_before_archive' );
?>
<div class="haru-archive-blog">
    <?php if( $archive_layout != 'full' ) : ?>
        <div class="<?php echo esc_attr($archive_layout) ?> ">
    <?php endif; ?>
        <?php if( ($archive_content_col != 12) || ($archive_layout != 'full') ) : ?>
            <div class="row">
        <?php endif; ?>         
          <!-- Archive content -->
          <?php do_action( 'bbp_before_main_content' ); ?>
          <?php do_action( 'bbp_template_notices' ); ?>
          <div id="forum-front" class="bbp-forum-front">
            <!-- <h1 class="entry-title"><?php bbp_forum_archive_title(); ?></h1> -->
            <div class="entry-content">
              <?php bbp_get_template_part( 'content', 'archive-forum' ); ?>
            </div>
          </div><!-- #forum-front -->
          <?php do_action( 'bbp_after_main_content' ); ?>
          <!-- Archive content -->
            <!-- <?php if ( is_active_sidebar( $archive_left_sidebar ) && ( $archive_sidebar == 'left' ) ) : ?>
                <div class="archive-sidebar left-sidebar col-md-3 col-sm-12 col-xs-12">
                    <?php dynamic_sidebar( $archive_left_sidebar ); ?>
                </div>
                <div class="archive-sidebar left-sidebar col-md-3 col-sm-12 col-xs-12 hidden-sidebar">
                    <?php dynamic_sidebar( $archive_left_sidebar ); ?>
                </div>
            <?php endif; ?>
            <?php if ( is_active_sidebar( $archive_right_sidebar ) && ( $archive_sidebar == 'right' ) ) : ?>
                <div class="archive-sidebar right-sidebar col-md-3 col-sm-12 col-xs-12">
                    <?php dynamic_sidebar( $archive_right_sidebar );?>
                </div>
                <div class="archive-sidebar right-sidebar col-md-3 col-sm-12 col-xs-12 hidden-sidebar">
                    <?php dynamic_sidebar( $archive_right_sidebar );?>
                </div>
            <?php endif; ?> -->
        <?php if ( ($archive_content_col != 12) || ($archive_layout != 'full') ) : ?>
            </div>
        <?php endif; ?>
    <?php if ( $archive_layout != 'full' ) : ?>
        </div>
    <?php endif; ?>
</div>
<?php get_footer();
