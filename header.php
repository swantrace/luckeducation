<?php
/**
 * The template for displaying the header
 *
 * @package    HaruTheme
 * @version    1.0.0
 * @author     Administrator <admin@harutheme.com>
 * @copyright  Copyright (c) 2017, HaruTheme
 * @license    http://opensource.org/licenses/gpl-2.0.php GPL v2 or later
 * @link       http://harutheme.com
 */

?>
<!DOCTYPE html>
<!-- Open HTML -->
<html <?php language_attributes(); ?>>
    <!-- Open Head -->
    <head>
        <meta charset="<?php bloginfo( 'charset' ); ?>">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="profile" href="//gmpg.org/xfn/11">
        <?php if ( ! function_exists( 'has_site_icon' ) || ! has_site_icon() ) : ?>
            <?php 
                $custom_favicon = haru_get_option('haru_custom_favicon');
                if ( isset($custom_favicon) && !empty($custom_favicon['url']) ) : 
            ?>
                <link rel="shortcut icon" href="<?php echo esc_url(haru_get_option('haru_custom_favicon')['url']); ?>" />
            <?php endif; ?>
        <?php endif; ?>
        <?php wp_head(); ?>
    </head>
    <!-- Close Head -->
    <?php  
    function get_current_user_role() {
        if( is_user_logged_in() ) { // check if there is a logged in user 
            $user = wp_get_current_user(); // getting & setting the current user 
            $roles = ( array ) $user->roles; // obtaining the role 
            return $roles; // return the role for the current user 
            } else {
            return array(); // if there is no logged in user return empty array  
            }
    }?>
    <body <?php body_class(array_map(function($role){ return 'role-' . $role;}, get_current_user_role())); ?>>
        <?php wp_body_open(); ?>
        <?php 
            /*
            *   @hooked - haru_site_preloader - 5;
            *   @hooked - haru_newsletter_popup - 10;
            *   @hooked - haru_onepage_navigation - 15;
            */
            do_action( 'haru_before_page_main' );
        ?>
        <!-- Open haru main -->
        <div id="haru-main">
            <?php 
                /*
                *   @hooked - haru_page_top_header - 5
                *   @hooked - haru_page_header - 10
                */
                do_action( 'haru_before_page_wrapper_content' );
            ?>
            <!-- Open HARU Content Main -->
            <div id="haru-content-main" class="clearfix">
            <?php 
                /*
                *   @hooked - haru_main_content start
                */
                do_action( 'haru_main_content_start' );
            ?>