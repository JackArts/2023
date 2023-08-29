<?php if ( wilmer_mikado_options()->getOptionValue( 'enable_social_share' ) == 'yes' && wilmer_mikado_options()->getOptionValue( 'enable_social_share_on_portfolio_item' ) == 'yes' ) : ?>
	<div class="mkdf-ps-info-item mkdf-ps-social-share">
		<?php
		/**
		 * Available params type, icon_type and title
		 *
		 * Return social share html
		 */
		echo wilmer_mikado_get_social_share_html( array( 'type'  => 'list', 'title' => esc_attr__( 'Share:', 'wilmer-core' ) ) ); ?>
	</div>
<?php endif; ?>