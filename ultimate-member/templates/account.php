<?php 
if(strpos("https://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'], um_get_core_page( 'account' )) !== false){
  wp_redirect("https://www.luckeducation.com/user/" . wp_get_current_user()->user_login . "/");
} 
?>