<?php

if ( class_exists( 'WPBakeryShortCodesContainer' ) ) {
	class WPBakeryShortCode_Mkdf_Clients_Carousel extends WPBakeryShortCodesContainer {}
}

if ( ! function_exists( 'wilmer_core_add_clients_carousel_shortcodes' ) ) {
	function wilmer_core_add_clients_carousel_shortcodes( $shortcodes_class_name ) {
		$shortcodes = array(
			'WilmerCore\CPT\Shortcodes\ClientsCarousel\ClientsCarousel',
			'WilmerCore\CPT\Shortcodes\ClientsCarouselItem\ClientsCarouselItem'
		);
		
		$shortcodes_class_name = array_merge( $shortcodes_class_name, $shortcodes );
		
		return $shortcodes_class_name;
	}
	
	add_filter( 'wilmer_core_filter_add_vc_shortcode', 'wilmer_core_add_clients_carousel_shortcodes' );
}

if ( ! function_exists( 'wilmer_core_set_clients_carousel_custom_style_for_vc_shortcodes' ) ) {
	/**
	 * Function that set custom css style for clients carousel shortcode
	 */
	function wilmer_core_set_clients_carousel_custom_style_for_vc_shortcodes( $style ) {
		$current_style = '.wpb_content_element.wpb_mkdf_clients_carousel_item > .wpb_element_wrapper { 
			background-color: #f4f4f4; 
		}';
		
		$style .= $current_style;
		
		return $style;
	}
	
	add_filter( 'wilmer_core_filter_add_vc_shortcodes_custom_style', 'wilmer_core_set_clients_carousel_custom_style_for_vc_shortcodes' );
}

if ( ! function_exists( 'wilmer_core_set_clients_carousel_icon_class_name_for_vc_shortcodes' ) ) {
	/**
	 * Function that set custom icon class name for clients carousel shortcode to set our icon for Visual Composer shortcodes panel
	 */
	function wilmer_core_set_clients_carousel_icon_class_name_for_vc_shortcodes( $shortcodes_icon_class_array ) {
		$shortcodes_icon_class_array[] = '.icon-wpb-clients-carousel';
		$shortcodes_icon_class_array[] = '.icon-wpb-clients-carousel-item';
		
		return $shortcodes_icon_class_array;
	}
	
	add_filter( 'wilmer_core_filter_add_vc_shortcodes_custom_icon_class', 'wilmer_core_set_clients_carousel_icon_class_name_for_vc_shortcodes' );
}