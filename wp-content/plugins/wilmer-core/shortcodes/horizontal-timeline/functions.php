<?php

if ( class_exists( 'WPBakeryShortCodesContainer' ) ) {
	class WPBakeryShortCode_Mkdf_Horizontal_Timeline extends WPBakeryShortCodesContainer {}
	class WPBakeryShortCode_Mkdf_Horizontal_Timeline_Item extends WPBakeryShortCodesContainer {}
}

if ( ! function_exists( 'wilmer_core_add_horizontal_timeline_shortcodes' ) ) {
	function wilmer_core_add_horizontal_timeline_shortcodes( $shortcodes_class_name ) {
		$shortcodes = array(
			'WilmerCore\CPT\Shortcodes\HorizontalTimeline\HorizontalTimeline',
			'WilmerCore\CPT\Shortcodes\HorizontalTimeline\HorizontalTimelineItem'
		);
		
		$shortcodes_class_name = array_merge( $shortcodes_class_name, $shortcodes );
		
		return $shortcodes_class_name;
	}
	
	add_filter( 'wilmer_core_filter_add_vc_shortcode', 'wilmer_core_add_horizontal_timeline_shortcodes' );
}

if ( ! function_exists( 'wilmer_core_set_icon_horizontal_timeline_class_name_for_vc_shortcodes' ) ) {
	/**
	 * Function that set custom icon class name for horizontal timeline shortcode to set our icon for Visual Composer shortcodes panel
	 */
	function wilmer_core_set_icon_horizontal_timeline_class_name_for_vc_shortcodes( $shortcodes_icon_class_array ) {
		$shortcodes_icon_class_array[] = '.icon-wpb-horizontal-timeline';
		$shortcodes_icon_class_array[] = '.icon-wpb-horizontal-timeline-item';
		
		return $shortcodes_icon_class_array;
	}
	
	add_filter( 'wilmer_core_filter_add_vc_shortcodes_custom_icon_class', 'wilmer_core_set_icon_horizontal_timeline_class_name_for_vc_shortcodes' );
}