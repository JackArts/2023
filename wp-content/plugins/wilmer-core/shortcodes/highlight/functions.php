<?php

if ( ! function_exists( 'wilmer_core_add_highlight_shortcodes' ) ) {
	function wilmer_core_add_highlight_shortcodes( $shortcodes_class_name ) {
		$shortcodes = array(
			'WilmerCore\CPT\Shortcodes\Highlight\Highlight'
		);
		
		$shortcodes_class_name = array_merge( $shortcodes_class_name, $shortcodes );
		
		return $shortcodes_class_name;
	}
	
	add_filter( 'wilmer_core_filter_add_vc_shortcode', 'wilmer_core_add_highlight_shortcodes' );
}