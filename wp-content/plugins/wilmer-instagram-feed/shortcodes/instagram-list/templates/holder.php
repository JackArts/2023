<div class="mkdf-instagram-list-holder <?php echo esc_attr($holder_classes); ?>" <?php echo wilmer_mikado_get_inline_attrs( $data_attr ) ?>>
    <?php if ( is_array( $images_array ) && count( $images_array ) ) { ?>
	    <ul class="mkdf-instagram-feed mkdf-outer-space <?php echo esc_attr($carousel_classes); ?> clearfix">
	    <?php
	    foreach ( $images_array as $image ) { ?>
		    <li class="mkdf-il-item mkdf-item-space">
			    <a href="<?php echo esc_url( $instagram_api->getHelper()->getImageLink( $image ) ); ?>" target="_blank">
				    <?php echo wilmer_mikado_kses_img( $instagram_api->getHelper()->getImageHTML( $image ) ); ?>
				    <?php if ($show_instagram_icon =='yes' ) { ?>
                        <span class="mkdf-instagram-icon"><i class="social_instagram"></i></span>
				    <?php } ?>
			    </a>
		    </li>
	    <?php } ?>
    </ul>
    <?php } else { ?>
        <div class="mkdf-instagram-not-connected">
            <?php esc_html_e( 'It seams that you haven\'t connected with your Instagram account', 'wilmer-instagram-feed' ); ?>
        </div>
    <?php } ?>
</div>