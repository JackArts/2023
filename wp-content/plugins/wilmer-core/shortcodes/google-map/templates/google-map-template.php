<div class="mkdf-google-map-holder">
	<?php if ( ! empty( $address1 ) && isset($enable_direction_link) === 'yes' ) {
		$get_direction_link = 'https://maps.google.com?q=' . esc_attr( str_replace( array( ' ', ',' ), array( '+', '' ), $address1 ) );
		?>
		<a itemprop="url" class="mkdf-google-map-direction" href="<?php echo esc_url( $get_direction_link ); ?>" target="_blank"><?php esc_html_e( 'Get direction', 'wilmer-core' ); ?></a>
	<?php } ?>
	<div class="mkdf-google-map" id="<?php echo esc_attr( $map_id ); ?>" <?php echo wp_kses( $map_data, array( 'data' ) ); ?>></div>
	<?php if ( $params['snazzy_map_style'] === 'yes' ) { ?>
        <?php if( isset( $is_elementor ) && $is_elementor ){
            $params['snazzy_map_code'] = str_replace( array("[", "]", '"'), array("`{`", "`}`", '``'), $params['snazzy_map_code'] );
        } ?>
		<input type="hidden" class="mkdf-snazzy-map" value="<?php echo str_replace( '<br />', '', $params['snazzy_map_code'] ); ?>"/>
	<?php } ?>
	<?php if ( $scroll_wheel == 'no' ) { ?>
		<div class="mkdf-google-map-overlay"></div>
	<?php } ?>
</div>