<?php 
/**
 *
 * [Graneon] child theme functions and definitions
 * 
 * @package [Graneon]
 * @author  HaruTheme <admin@harutheme.com>
 * @license http://www.gnu.org/licenses/gpl-2.0.html GNU Public License
 * 
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * When using a child theme you can override certain functions (those wrapped
 * in a function_exists() call) by defining them first in your child theme's
 * functions.php file. The child theme's functions.php file is included before
 * the parent theme's file, so the child theme functions would be used.
 *
 * @link https://codex.wordpress.org/Theme_Development
 * @link https://codex.wordpress.org/Child_Themes
 *
 * Functions that are not pluggable (not wrapped in function_exists()) are
 * instead attached to a filter or action hook.
 *
 * For more information on hooks, actions, and filters,
 * {@link https://codex.wordpress.org/Plugin_API}
 */

function haru_child_theme_enqueue_scripts() {
    wp_enqueue_style( 'haru-theme-child-style', get_stylesheet_directory_uri(). '/style.css', array('haru-theme-style') );
    wp_enqueue_script(
        'custom-script',
        get_stylesheet_directory_uri() . '/assets/js/haru-custom-script.js',
        array( 'jquery' )
    );
}
add_action( 'wp_enqueue_scripts', 'haru_child_theme_enqueue_scripts', 12 );

function therewego_child_theme_enqueue_scripts() {
    wp_enqueue_script(
        'therewego-custom-script',
        get_stylesheet_directory_uri() . '/assets/js/therewego-custom-script.js'
    );
}
add_action( 'wp_enqueue_scripts', 'therewego_child_theme_enqueue_scripts', 13 );

// 配置邮件
add_action('phpmailer_init', 'mail_smtp');
function mail_smtp( $phpmailer ) {
	$phpmailer->FromName = '锦鲤君'; // 发件人昵称
	$phpmailer->Host = 'smtp.163.com'; // 邮箱SMTP服务器
	$phpmailer->Port = 465; // SMTP端口，不需要改
	$phpmailer->Username = 'luckedu2020@163.com'; // 邮箱账户
	$phpmailer->Password = 'BEMBROJZTXOWXONL'; // 此处填写邮箱生成的授权码，不是邮箱登录密码
	$phpmailer->From = 'luckedu2020@163.com'; // 邮箱账户同上
	$phpmailer->SMTPAuth = true;
	$phpmailer->SMTPSecure = 'ssl'; // 端口25时 留空，465时 ssl，不需要改
	$phpmailer->IsSMTP();
}

function avatar_add_timestamp( $avatar = '' ) {
	$pattern = '/src="(.+\?)(\d+)"/';
    $timestamp = strval(time());
	$avatar = preg_replace($pattern, 'src="${1}'."$timestamp\"", $avatar);
    return $avatar;
}
add_filter( 'get_avatar', 'avatar_add_timestamp', 100000, 1 );


$user = wp_get_current_user();
if ( in_array( 'editor', (array) $user->roles ) ) {
    add_action( 'admin_menu', 'remove_admin_menu_items', 999 );
    function remove_admin_menu_items() {
       remove_menu_page('tools.php');
       remove_menu_page('vc-welcome');
    }
}

function bbp_enable_visual_editor( $args = array() ) {
    $args['tinymce'] = true;
    return $args;
}
add_filter( 'bbp_after_get_the_content_parse_args', 'bbp_enable_visual_editor' );

add_filter( 'bbp_get_forum_archive_title', 'custom_forum_title');

function custom_forum_title () {
	Return 'Luck论坛' ;
}

add_filter( 'register_post_type_args', 'change_qsm_quiz_post_type_args', 99, 2 );
function change_qsm_quiz_post_type_args( $args, $post_name )
{
    if ( $post_name != 'qsm_quiz' )
        return $args;

    // die($post_name);
    $args['show_in_menu'] = true;
    // 
    // other arguments

    // die(print_r($args, false));
    return $args;
}

add_filter('bbp_get_user_display_role', function($role, $user_id) {
    um_fetch_user($user_id);
    // $role = um_user("role_select");
    if(trim(um_user("role_select")) !== ''){
      $role = $role . " / " . um_user("role_select");
    }
    if(um_user("lucky_credits") > 0){
        $role = $role . "<br />幸运值：" . um_user("lucky_credits");
    }
    return $role;
}, 999, 2);
um_reset_user();
?>