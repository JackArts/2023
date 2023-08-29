<?php
namespace WilmerCore\CPT\Shortcodes\VerticalSplitSliderContentItem;

use WilmerCore\Lib;

class VerticalSplitSliderContentItem implements Lib\ShortcodeInterface {
	private $base;
	
	function __construct() {
		$this->base = 'mkdf_vertical_split_slider_content_item';
		add_action( 'vc_before_init', array( $this, 'vcMap' ) );
	}
	
	public function getBase() {
		return $this->base;
	}
	
	public function vcMap() {
		if ( function_exists( 'vc_map' ) ) {
			vc_map(
				array(
					'name'      => esc_html__( 'Slide Content Item', 'wilmer-core' ),
					'base'      => $this->base,
					'icon'      => 'icon-wpb-vertical-split-slider-content-item extended-custom-icon',
					'category'  => esc_html__( 'by WILMER', 'wilmer-core' ),
					'as_parent' => array( 'except' => 'vc_row' ),
					'as_child'  => array( 'only' => 'mkdf_vertical_split_slider_left_panel, mkdf_vertical_split_slider_right_panel' ),
					'js_view'   => 'VcColumnView',
					'params'    => array(
						array(
							'type'       => 'colorpicker',
							'param_name' => 'background_color',
							'heading'    => esc_html__( 'Background Color', 'wilmer-core' )
						),
						array(
							'type'       => 'attach_image',
							'param_name' => 'background_image',
							'heading'    => esc_html__( 'Background Image', 'wilmer-core' )
						),
                        array(
							'type'       => 'textfield',
							'param_name' => 'background_text',
							'heading'    => esc_html__( 'Background Text', 'wilmer-core' )
						),
						array(
                            'type'       => 'dropdown',
                            'param_name' => 'background_text_type',
                            'heading'    => esc_html__( 'Background Text Type', 'wilmer-core' ),
                            'value'      => array(
                                esc_html__('Outline', 'wilmer-core') => 'outline',
                                esc_html__('Standard', 'wilmer-core') => 'standard',
                            ),
                            'dependency' => array('element' => 'background_text', 'not_empty' => true)
                        ),
                        array(
                            'type'       => 'colorpicker',
                            'param_name' => 'background_text_color',
                            'heading'    => esc_html__( 'Background Text Color', 'wilmer-core' ),
                            'description'=> esc_html__( 'Choose desired color for outline and standard text', 'wilmer-core' ),
                            'dependency' => array('element' => 'background_text', 'not_empty' => true)
                        ),
						array(
							'type'        => 'textfield',
							'param_name'  => 'item_padding',
							'heading'     => esc_html__( 'Padding', 'wilmer-core' ),
							'description' => esc_html__( 'Insert padding in format: Top Right Bottom Left (e.g. 0px 0px 1px 0px)', 'wilmer-core' )
						),
						array(
							'type'       => 'dropdown',
							'param_name' => 'alignment',
							'heading'    => esc_html__( 'Content Alignment', 'wilmer-core' ),
							'value'      => array(
								esc_html__( 'Default', 'wilmer-core' ) => '',
								esc_html__( 'Left', 'wilmer-core' )    => 'left',
								esc_html__( 'Right', 'wilmer-core' )   => 'right',
								esc_html__( 'Center', 'wilmer-core' )  => 'center'
							)
						),
						array(
							'type'       => 'dropdown',
							'param_name' => 'header_style',
							'heading'    => esc_html__( 'Header/Bullets Style', 'wilmer-core' ),
							'value'      => array(
								esc_html__( 'Default', 'wilmer-core' ) => '',
								esc_html__( 'Light', 'wilmer-core' )   => 'light',
								esc_html__( 'Dark', 'wilmer-core' )    => 'dark'
							)
						)
					)
				)
			);
		}
	}
	
	public function render( $atts, $content = null ) {
		$args   = array(
			'background_color' => '',
			'background_text'  => '',
			'background_text_type' => 'outline',
			'background_text_color'=> '',
			'background_image' => '',
			'item_padding'     => '',
			'alignment'        => 'left',
			'header_style'     => ''
		);
		$params = shortcode_atts( $args, $atts );
		
		$params['content_classes']  = $this->getContentClasses( $params );
		$params['content_data']  = $this->getContentData( $params );
		$params['content_style'] = $this->getContentStyles( $params );
        $params['bg_text_classes']  = $this->getBgTextClasses( $params );
        $params['bg_text_styles']  = $this->getBgTextStyles( $params );
		$params['content']       = $content;
		
		$html = wilmer_core_get_shortcode_module_template_part( 'templates/vertical-split-slider-content-item-template', 'vertical-split-slider', '', $params );
		
		return $html;
	}

    private function getContentClasses( $params ) {
        $classes = array();

        $classes[] = 'mkdf-vss-ms-section';

        if ( ! empty( $params['background_text'] ) ) {
            $classes[] = 'mkdf-vss-ms-section-with-bg-text';
        }

        return implode(' ', $classes);
    }
	
	private function getContentData( $params ) {
		$data = array();
		
		if ( ! empty( $params['header_style'] ) ) {
			$data['data-header-style'] = $params['header_style'];
		}
		
		return $data;
	}
	
	private function getContentStyles( $params ) {
		$styles = array();
		
		if ( ! empty( $params['background_color'] ) ) {
			$styles[] = 'background-color: ' . $params['background_color'];
		}
		
		if ( ! empty( $params['background_image'] ) ) {
			$url      = wp_get_attachment_url( $params['background_image'] );
			$styles[] = 'background-image: url(' . $url . ')';
		}
		
		if ( ! empty( $params['item_padding'] ) ) {
			$styles[] = 'padding: ' . $params['item_padding'];
		}
		
		if ( ! empty( $params['alignment'] ) ) {
			$styles[] = 'text-align: ' . $params['alignment'];
		}
		
		return implode( ';', $styles );
	}

	private function getBgTextClasses( $params ){
        $classes = array();

        $classes[] = 'mkdf-vss-background-text';

        if ( ! empty( $params['background_text_type'] ) ) {
            $classes[] = 'mkdf-bg-text-' . $params['background_text_type'];
        }

        return implode(' ', $classes);
    }

    private function getBgTextStyles( $params ){
        $styles = array();

        if ( ! empty( $params['background_text_color'] ) ) {
            if( ! empty( $params['background_text_type'] ) && $params['background_text_type'] == 'standard' ){
                $styles[] = 'color: ' . $params['background_text_color'];
            }

            if( ! empty( $params['background_text_type'] ) && $params['background_text_type'] == 'outline' ){
                $styles[] = '-webkit-text-stroke-color: ' . $params['background_text_color'];
            }
        }

        return implode( ';', $styles );
    }
}
