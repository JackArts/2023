<?php

if ( ! function_exists( 'wilmer_core_add__frame_slider_shortcodes' ) ) {
	function wilmer_core_add__frame_slider_shortcodes( $shortcodes_class_name ) {
		$shortcodes = array(
			'WilmerCore\CPT\Shortcodes\FrameSlider\FrameSlider'
		);
		
		$shortcodes_class_name = array_merge( $shortcodes_class_name, $shortcodes );
		
		return $shortcodes_class_name;
	}
	
	add_filter( 'wilmer_core_filter_add_vc_shortcode', 'wilmer_core_add__frame_slider_shortcodes' );
}

if ( ! function_exists( 'wilmer_core_set__frame_slider_icon_class_name_for_vc_shortcodes' ) ) {
	/**
	 * Function that set custom icon class name for expanded gallery shortcode to set our icon for Visual Composer shortcodes panel
	 */
	function wilmer_core_set__frame_slider_icon_class_name_for_vc_shortcodes( $shortcodes_icon_class_array ) {
		$shortcodes_icon_class_array[] = '.icon-wpb-frame-slider';
		
		return $shortcodes_icon_class_array;
	}
	
	add_filter( 'wilmer_core_filter_add_vc_shortcodes_custom_icon_class', 'wilmer_core_set__frame_slider_icon_class_name_for_vc_shortcodes' );
}