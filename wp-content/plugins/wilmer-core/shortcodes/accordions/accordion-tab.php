<?php

namespace WilmerCore\CPT\Shortcodes\AccordionTab;

use WilmerCore\Lib;

class AccordionTab implements Lib\ShortcodeInterface {
	private $base;
	
	function __construct() {
		$this->base = 'mkdf_accordion_tab';
		add_action( 'vc_before_init', array( $this, 'vcMap' ) );
	}
	
	public function getBase() {
		return $this->base;
	}
	
	public function vcMap() {
		if ( function_exists( 'vc_map' ) ) {
			vc_map(
				array(
					"name"                    => esc_html__( 'Accordion Tab', 'wilmer-core' ),
					"base"                    => $this->base,
					"as_child"                => array( 'only' => 'mkdf_accordion' ),
					'is_container'            => true,
					"category"                => esc_html__( 'by WILMER', 'wilmer-core' ),
					"icon"                    => "icon-wpb-accordion-tab extended-custom-icon",
					"show_settings_on_create" => true,
					"js_view"                 => 'VcColumnView',
					"params"                  => array(
						array(
							'type'        => 'textfield',
							'param_name'  => 'title',
							'heading'     => esc_html__( 'Title', 'wilmer-core' ),
							'description' => esc_html__( 'Enter accordion section title', 'wilmer-core' )
						),
						array(
							'type'       => 'dropdown',
							'param_name' => 'title_tag',
							'heading'    => esc_html__( 'Title Tag', 'wilmer-core' ),
							'value'      => array_flip( wilmer_mikado_get_title_tag( true, array( 'p' => 'p' ) ) ),
						),
                        array(
                            'type'       => 'colorpicker',
                            'param_name' => 'title_color',
                            'heading'    => esc_html__( 'Title color', 'wilmer-core' )
                        )
					)
				)
			);
		}
	}
	
	public function render( $atts, $content = null ) {
		$default_atts = array(
			'title'     => 'Section',
			'title_tag' => 'h5',
            'title_color' => ''
		);
		$params       = shortcode_atts( $default_atts, $atts );
		
		$params['content']        = $content;
		$params['title_tag']      = ! empty( $params['title_tag'] ) ? $params['title_tag'] : $default_atts['title_tag'];
        $params['title_color']    = $this->getTitleColor($params);
		
		$output = wilmer_core_get_shortcode_module_template_part( 'templates/accordion-template', 'accordions', '', $params );
		
		return $output;
	}

    private function getTitleColor( $params ) {
        $styles = array();

        if ( ! empty( $params['title_color'] ) ) {
            $styles[] = 'color: ' . $params['title_color'];
        }

        return $styles;
    }
}