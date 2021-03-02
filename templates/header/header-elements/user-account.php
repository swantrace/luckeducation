<?php
/**
 * @package    HaruTheme
 * @version    1.0.0
 * @author     Administrator <admin@harutheme.com>
 * @copyright  Copyright (c) 2017, HaruTheme
 * @license    http://opensource.org/licenses/gpl-2.0.php GPL v2 or later
 * @link       http://harutheme.com
*/

$login_url     = '';
$register_url  = '';
$account_url   = '';
if ( class_exists( 'WooCommerce' ) ) {
    global $woocommerce;
    $myaccount_page_id = wc_get_page_id('myaccount');
    if ( $myaccount_page_id > 0 ) {
        $login_url    = get_permalink( $myaccount_page_id );
        $register_url = get_permalink( $myaccount_page_id );
        $account_url  = get_permalink( $myaccount_page_id );
    }
    else {
        $login_url    = wp_login_url( get_permalink() );
        $register_url = wp_registration_url();
        $account_url  = get_edit_user_link();
    }
}
else {
    $login_url    = wp_login_url( get_permalink() );
    $register_url = wp_registration_url();
    $account_url  = get_edit_user_link();
}

?>
<div class="header-elements-item user-account-wrap">
    <?php if ( is_user_logged_in() ) : ?>
        <div class="user-account-content logged-in">
            <a href="<?php echo "https://www.luckeducation.com/user/" . wp_get_current_user()->user_login . "/"; ?>" class="header-icon">
                <?php 
                $profile_photo = UM()->uploader()->get_upload_base_url() . um_user( 'ID' ) . "/" . um_profile( 'profile_photo' );

                $data = um_get_user_avatar_data( um_user( 'ID' ) );
                echo sprintf( '<img src="%s" class="avatar avatar-45 photo avatar-default" alt="%s" data-default="%s" onerror="%s" height="45" width="45" />',
                    esc_url( $profile_photo ),
                    esc_attr( $data['alt'] ),
                    esc_attr( $data['default'] ),
                    'if ( ! this.getAttribute(\'data-load-error\') ){ this.setAttribute(\'data-load-error\', \'1\');this.setAttribute(\'src\', this.getAttribute(\'data-default\'));}'
                ); ?>
            </a>
            <ul class="user-account-menu">
                <li>
                    <a href="<?php echo "https://www.luckeducation.com/user/" . wp_get_current_user()->user_login . "/?um_action=edit"; ?>"><?php echo esc_html__( '编辑个人资料', 'graneon' ); ?></a>
                </li>
                <li>
                    <a href="https://www.luckeducation.com/login/password-reset/"><?php echo esc_html__( '重设密码', 'graneon' ); ?></a>
                </li>
                <li>
                    <a href="https://www.luckeducation.com/logout"><?php echo esc_html__( '注销', 'graneon' ); ?></a>
                </li>
            </ul>
        </div>
    <?php else : ?>
        <div class="user-account-content logged-out">
            <a href="<?php echo "https://www.luckeducation.com/login/"; ?>" class="login-popup-link" id="login-popup-link"><i class="header-icon zmdi zmdi-account"></i></a>
        </div>
    <?php endif; ?>
</div>