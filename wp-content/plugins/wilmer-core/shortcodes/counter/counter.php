<?php
namespace WilmerCore\CPT\Shortcodes\Counter;

use WilmerCore\Lib;

class Counter implements Lib\ShortcodeInterface {
	private $base;
	
	public function __construct() {
		$this->base = 'mkdf_counter';
		
		add_action( 'vc_before_init', array( $this, 'vcMap' ) );
	}
	
	public function getBase() {
		return $this->base;
	}
	
	public function vcMap() {
		if ( function_exists( 'vc_map' ) ) {
			vc_map(
				array(
					'name'                      => esc_html__( 'Counter', 'wilmer-core' ),
					'base'                      => $this->getBase(),
					'category'                  => esc_html__( 'by WILMER', 'wilmer-core' ),
					'icon'                      => 'icon-wpb-counter extended-custom-icon',
					'allowed_container_element' => 'vc_row',
					'params'                    => array(
						array(
							'type'        => 'textfield',
							'param_name'  => 'custom_class',
							'heading'     => esc_html__( 'Custom CSS Class', 'wilmer-core' ),
							'description' => esc_html__( 'Style particular content element differently - add a class name and refer to it in custom CSS', 'wilmer-core' )
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'type',
							'heading'     => esc_html__( 'Type', 'wilmer-core' ),
							'value'       => array(
								esc_html__( 'Zero Counter', 'wilmer-core' )   => 'mkdf-zero-counter',
								esc_html__( 'Random Counter', 'wilmer-core' ) => 'mkdf-random-counter'
							),
							'save_always' => true,
						),
                        array(
                            'type'        => 'dropdown',
                            'param_name'  => 'skin',
                            'heading'     => esc_html__( 'Skin', 'wilmer-core' ),
                            'value'       => array(
                                esc_html__( 'Transparent', 'wilmer-core' ) => 'transparent',
                                esc_html__( 'Bold', 'wilmer-core' )    => 'bold'
                            )
                        ),
                        array(
                            'type'       => 'colorpicker',
                            'param_name' => 'outline_color',
                            'heading'    => esc_html__( 'Outline Color', 'wilmer-core' ),
                            'dependency' => array( 'element' => 'skin', 'value' => 'transparent' )
                        ),
						array(
							'type'       => 'textfield',
							'param_name' => 'digit',
							'heading'    => esc_html__( 'Digit', 'wilmer-core' )
						),
						array(
							'type'       => 'textfield',
							'param_name' => 'digit_font_size',
							'heading'    => esc_html__( 'Digit Font Size (px)', 'wilmer-core' ),
							'dependency' => array( 'element' => 'digit', 'not_empty' => true )
						),
                        array(
                            'type'       => 'textfield',
                            'param_name' => 'digit_font_responsive_size',
                            'heading'    => esc_html__( 'Digit Font Smaller Devices Size (px)', 'wilmer-core' ),
                            'dependency' => array( 'element' => 'skin', 'value' => array('bold') )
                        ),
						array(
							'type'       => 'colorpicker',
							'param_name' => 'digit_color',
							'heading'    => esc_html__( 'Digit Color', 'wilmer-core' ),
							'dependency' => array( 'element' => 'digit', 'not_empty' => true )
						),
                        array(
                            'type'       => 'dropdown',
                            'param_name' => 'centered_text',
                            'heading'    => esc_html__( 'Centered Text', 'wilmer-core' ),
                            'value'       => array_flip(wilmer_mikado_get_yes_no_select_array(false, false)),
                            'dependency' => array( 'element' => 'type', 'skin' => 'bold' )
                        ),
						array(
							'type'       => 'textfield',
							'param_name' => 'title',
							'heading'    => esc_html__( 'Title', 'wilmer-core' )
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'title_tag',
							'heading'     => esc_html__( 'Title Tag', 'wilmer-core' ),
							'value'       => array_flip( wilmer_mikado_get_title_tag( true ) ),
							'save_always' => true,
							'dependency'  => array( 'element' => 'title', 'not_empty' => true )
						),
						array(
							'type'       => 'colorpicker',
							'param_name' => 'title_color',
							'heading'    => esc_html__( 'Title Color', 'wilmer-core' ),
							'dependency' => array( 'element' => 'title', 'not_empty' => true )
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'title_font_weight',
							'heading'     => esc_html__( 'Title Font Weight', 'wilmer-core' ),
							'value'       => array_flip( wilmer_mikado_get_font_weight_array( true ) ),
							'save_always' => true,
							'dependency'  => array( 'element' => 'title', 'not_empty' => true )
						),
						array(
							'type'       => 'textarea',
							'param_name' => 'text',
							'heading'    => esc_html__( 'Text', 'wilmer-core' )
						),
						array(
							'type'       => 'colorpicker',
							'param_name' => 'text_color',
							'heading'    => esc_html__( 'Text Color', 'wilmer-core' ),
							'dependency' => array( 'element' => 'text', 'not_empty' => true )
						)
					)
				)
			);
		}
	}
	
	public function render( $atts, $content = null ) {
		$args   = array(
			'custom_class'                  => '',
			'type'                          => 'mkdf-zero-counter',
			'skin'                          => 'transparent',
			'outline_color'                 => '',
			'digit'                         => '123',
			'digit_font_size'               => '',
            'digit_font_responsive_size'    => '',
			'digit_color'                   => '',
			'title'                         => '',
			'title_tag'                     => 'h6',
			'title_color'                   => '',
			'title_font_weight'             => '',
			'text'                          => '',
			'text_color'                    => '',
            'centered_text'                 => 'no'
		);
		$params = shortcode_atts( $args, $atts );
		
		$params['holder_classes']       = $this->getHolderClasses( $params );
		$params['counter_styles']       = $this->getCounterStyles( $params );
		$params['counter_title_styles'] = $this->getCounterTitleStyles( $params );
		$params['counter_text_styles']  = $this->getCounterTextStyles( $params );
		$params['counter_data']         = $this->getcounterData($params);
        $params['outline_color']        = $this->getCounterOutlineStyles( $params );

		$params['title_tag'] = ! empty( $params['title_tag'] ) ? $params['title_tag'] : $args['title_tag'];
		
		$html = wilmer_core_get_shortcode_module_template_part( 'templates/counter', 'counter', '', $params );
		
		return $html;
	}
	
	private function getHolderClasses( $params ) {
		$holderClasses = array();
		
		$holderClasses[] = ! empty( $params['custom_class'] ) ? esc_attr( $params['custom_class'] ) : '';

		$holderClasses[] = $params['skin'] == 'bold' ? 'mkdf-counter-left' : '';

        $holderClasses[] = 'mkdf-counter-'.$params['skin'].'-skin';
		
		return implode( ' ', $holderClasses );
	}
	
	private function getCounterStyles( $params ) {
		$styles = array();
		
		if ( ! empty( $params['digit_font_size'] ) ) {
			$styles[] = 'font-size: ' . wilmer_mikado_filter_px( $params['digit_font_size'] ) . 'px';
		}

		if ( ! empty( $params['skin'] ) && ! empty( $params['digit_color'] ) ) {
		    if( $params['skin'] == 'transparent' ) {
                $styles[] = 'color: ' . $params['digit_color'];
            } else{
                $styles[] = 'color: ' . $params['digit_color'];
            }
		}
		
		return implode( ';', $styles );
	}
	
	private function getCounterTitleStyles( $params ) {
		$styles = array();
		
		if ( ! empty( $params['title_color'] ) ) {
			$styles[] = 'color: ' . $params['title_color'];
		}
		
		if ( ! empty( $params['title_font_weight'] ) ) {
			$styles[] = 'font-weight: ' . $params['title_font_weight'];
		}
		
		return implode( ';', $styles );
	}
	
	private function getCounterTextStyles( $params ) {
		$styles = array();
		
		if ( ! empty( $params['text_color'] ) ) {
			$styles[] = 'color: ' . $params['text_color'];
		}
		
		return implode( ';', $styles );
	}
    private function getCounterOutlineStyles( $params ) {
        $styles = array();

        if ( ! empty( $params['outline_color'] ) ) {
            $styles[] = '-webkit-text-stroke-color: ' . $params['outline_color'];
        }

        return implode( ';', $styles );
    }
    private function getcounterData( $params ) {
        $counter_data = array();


        if ( ! empty( $params['digit_font_responsive_size'] ) ) {
            $counter_data['data-responsive-font-size'] = wilmer_mikado_filter_px( $params['digit_font_responsive_size'] );
        }

        return $counter_data;
    }
}