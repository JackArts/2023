<?php
namespace WilmerCore\CPT\Shortcodes\UncoveringSections;

use WilmerCore\Lib;

class UncoveringSections implements Lib\ShortcodeInterface {
	private $base;
	
	function __construct() {
		$this->base = 'mkdf_uncovering_sections';
		add_action( 'vc_before_init', array( $this, 'vcMap' ) );
	}
	
	public function getBase() {
		return $this->base;
	}
	
	public function vcMap() {
		if ( function_exists( 'vc_map' ) ) {
			vc_map(
				array(
					'name'      => esc_html__( 'Uncovering Sections', 'wilmer-core' ),
					'base'      => $this->base,
					'icon'      => 'icon-wpb-uncovering-sections extended-custom-icon',
					'category'  => esc_html__( 'by WILMER', 'wilmer-core' ),
					'as_parent' => array( 'only' => 'mkdf_uncovering_sections_item' ),
					'js_view'   => 'VcColumnView',
					'params'    => array()
				)
			);
		}
	}
	
	public function render( $atts, $content = null ) {
		$args   = array(

		);
		$params = shortcode_atts( $args, $atts );

		$params['content']        = $content;
		
		$html = wilmer_core_get_shortcode_module_template_part( 'templates/uncovering-sections', 'uncovering-sections', '', $params );
		
		return $html;
	}
}
