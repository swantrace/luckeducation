<?php

/**
 * Search 
 *
 * @package bbPress
 * @subpackage Theme
 */

// Exit if accessed directly
defined( 'ABSPATH' ) || exit;

if ( bbp_allow_search() ) : ?>

	<div class="bbp-search-form" style="margin-bottom: 10px;">
		<form role="search" method="get" id="bbp-search-form">
			<div class="input-group">
				<input type="text" class="form-control" placeholder="Search for..." value="<?php bbp_search_terms(); ?>" name="bbp_search" id="bbp_search" style="border-radius: 0">
				<span class="input-group-append">
					<button class="btn btn-default" type="submit" id="bbp_search_submit" style="border-radius: 0; border-left: none;">搜索</button>
				</span>
			</div><!-- /input-group -->
			<input type="hidden" name="action" value="bbp-search-request" />
		</form>
	</div>

<?php endif;
