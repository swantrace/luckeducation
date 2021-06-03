<?php
/**
 * @package    HaruTheme
 * @version    1.0.0
 * @author     Administrator <admin@harutheme.com>
 * @copyright  Copyright (c) 2017, HaruTheme
 * @license    http://opensource.org/licenses/gpl-2.0.php GPL v2 or later
 * @link       http://harutheme.com
*/

$show_archive_title = haru_get_option('haru_show_archive_title');
// Set default
if ( empty($show_archive_title) && $show_archive_title === false ) {
    $show_archive_title = 1;
}

$on_front           = get_option('show_on_front'); // core in redux
$page_title         = '';
$page_sub_title     = strip_tags(term_description());

if (!have_posts()) {
    $page_title = esc_html__( 'Nothing Found', 'graneon' );
} elseif (is_home()) {
    if (($on_front == 'page' && get_queried_object_id() == get_post(get_option('page_for_posts'))->ID) || ($on_front == 'posts')) {
        $page_title = esc_html__( 'Blog', 'graneon' );
    } else {
        $page_title = '';
    }
} elseif (is_category()) {
    $page_title = single_cat_title('', false);
} elseif (is_tag()) {
    $page_title = single_tag_title(esc_html__( 'Tags: ', 'graneon' ), false);
} elseif (is_author()) {
    $page_title = sprintf(esc_html__( 'Author: %s', 'graneon' ), get_the_author());
} elseif (is_day()) {
    $page_title = sprintf(esc_html__( 'Daily Archives: %s', 'graneon' ), get_the_date());
} elseif (is_month()) {
    $page_title = sprintf(esc_html__( 'Monthly Archives: %s', 'graneon' ), get_the_date(_x('F Y', 'monthly archives date format', 'graneon')));
} elseif (is_year()) {
    $page_title = sprintf(esc_html__( 'Yearly Archives: %s', 'graneon' ), get_the_date(_x('Y', 'yearly archives date format', 'graneon')));
} elseif (is_search()) {
    $page_title = sprintf(esc_html__( 'Search Results for: %s', 'graneon' ), get_search_query());
} elseif (is_tax('post_format', 'post-format-aside')) {
    $page_title = esc_html__( 'Asides', 'graneon' );
} elseif (is_tax('post_format', 'post-format-gallery')) {
    $page_title = esc_html__( 'Galleries', 'graneon' );
} elseif (is_tax('post_format', 'post-format-image')) {
    $page_title = esc_html__( 'Images', 'graneon' );
} elseif (is_tax('post_format', 'post-format-video')) {
    $page_title = esc_html__( 'Videos', 'graneon' );
} elseif (is_tax('post_format', 'post-format-quote')) {
    $page_title = esc_html__( 'Quotes', 'graneon' );
} elseif (is_tax('post_format', 'post-format-link')) {
    $page_title = esc_html__( 'Links', 'graneon' );
} elseif (is_tax('post_format', 'post-format-status')) {
    $page_title = esc_html__( 'Statuses', 'graneon' );
} elseif (is_tax('post_format', 'post-format-audio')) {
    $page_title = esc_html__( 'Audios', 'graneon' );
} elseif (is_tax('post_format', 'post-format-chat')) {
    $page_title = esc_html__( 'Chats', 'graneon' );
// Custom Post type
} elseif (is_post_type_archive( 'forum' ) ) {
    $page_title = esc_html__( 'Luck论坛', 'graneon');
} elseif (is_archive('haru_salon')) {
    $page_title = esc_html__( 'Salon', 'graneon' );
} elseif (is_post_type_archive( 'forum' ) ) {
    $page_title = esc_html__( 'Luck论坛', 'graneon');
} else {
    $page_title = esc_html__( 'Archives', 'graneon' );
}

// Process archive title layout
$section_page_title_class = array('haru-page-title-section');
$archive_title_layout     = haru_get_option('haru_archive_title_layout');
if ( in_array($archive_title_layout, array('container')) ) {
    $section_page_title_class[] = $archive_title_layout;
}

// Process archive title background image
$page_title_bg_image = '';
$cat                 = get_queried_object();
if ($cat && property_exists( $cat, 'term_id' )) {
    $page_title_bg_image = get_tax_meta($cat, 'haru_'.'page_title_background'); // Category page title
}

if( !$page_title_bg_image || ($page_title_bg_image === '') ) {
    $page_title_bg_image = haru_get_option('haru_archive_title_bg_image');
}

if (isset($page_title_bg_image) && isset($page_title_bg_image['url'])) {
    $page_title_bg_image_url = $page_title_bg_image['url'];
} else {
    $page_title_bg_image_url = '';
}
// Set default
if ( empty($page_title_bg_image_url) ) {
    $page_title_bg_image_url = '';
}

// Process style archive_title_bg_image and archive_title_parallax
$page_title_wrap_class   = array();
$page_title_wrap_class[] = 'haru-page-title-wrapper';

$custom_styles = array();

if ($page_title_bg_image_url != '') {
    $page_title_wrap_class[] = 'page-title-wrap-bg';
    $custom_styles[]         = 'background-image: url(' . $page_title_bg_image_url . ');';
}

$custom_style = '';
if ($custom_styles) {
    $custom_style = 'style="'. join(';', $custom_styles).'"';
}

$page_title_parallax = haru_get_option('haru_archive_title_parallax');

if ( !empty($page_title_bg_image_url) && ($page_title_parallax == '1') ) {
    $custom_style            .= ' data-stellar-background-ratio="0.5"';
    $page_title_wrap_class[] = 'page-title-parallax';
}

// Process breadcrumbs_in_archive_title
$breadcrumbs_in_archive_title = isset($_GET['breadcrumbs']) ? $_GET['breadcrumbs'] : '';
if (!in_array($breadcrumbs_in_archive_title, array('1','0'))) {
    $breadcrumbs_in_archive_title = haru_get_option('haru_breadcrumbs_in_archive_title');
}
// Set default
if (empty($breadcrumbs_in_archive_title)) {
    $breadcrumbs_in_archive_title = 0;
}
// Add class for style when not use breadcrumbs
if ( $breadcrumbs_in_archive_title != 1 ) {
    $page_title_wrap_class[] = 'no-breadcrumbs';
}
?>

<?php if( ($show_archive_title == 1) || ($breadcrumbs_in_archive_title == 1) ): ?>
    <div class="<?php echo esc_attr( join(' ', $section_page_title_class) ); ?>" <?php echo wp_kses_post($custom_style); ?>>
        <?php if($show_archive_title == 1): ?>
            <section class="<?php echo esc_attr( join(' ',$page_title_wrap_class) ); ?>" >
                <div class="container">
                    <div class="page-title-inner">
                        <div class="block-center-inner">
                            <h2><?php echo esc_html($page_title); ?></h2>
                            <?php if ($page_sub_title != '') : ?>
                                <span class="page-sub-title"><?php echo esc_html($page_sub_title); ?></span>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
            </section>
        <?php endif; ?>
        <?php if( $breadcrumbs_in_archive_title == 1 ): ?>
            <div class="haru-breadcrumb-wrapper">
                <div class="container">
                    <?php get_template_part( 'templates/breadcrumb' ); ?>
                </div>
            </div>
        <?php endif; ?>
    </div>
<?php endif; ?>