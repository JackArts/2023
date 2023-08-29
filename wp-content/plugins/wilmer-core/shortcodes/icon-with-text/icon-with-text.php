<?php
namespace WilmerCore\CPT\Shortcodes\IconWithText;

use WilmerCore\Lib;

class IconWithText implements Lib\ShortcodeInterface {
	private $base;
	
	public function __construct() {
		$this->base = 'mkdf_icon_with_text';
		
		add_action( 'vc_before_init', array( $this, 'vcMap' ) );
	}
	
	public function getBase() {
		return $this->base;
	}
	
	public function vcMap() {
		if ( function_exists( 'vc_map' ) ) {
			vc_map(
				array(
					'name'                      => esc_html__( 'Icon With Text', 'wilmer-core' ),
					'base'                      => $this->base,
					'icon'                      => 'icon-wpb-icon-with-text extended-custom-icon',
					'category'                  => esc_html__( 'by WILMER', 'wilmer-core' ),
					'allowed_container_element' => 'vc_row',
					'params'                    => array_merge(
						array(
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
									esc_html__( 'Icon Left From Text', 'wilmer-core' )  => 'icon-left',
									esc_html__( 'Icon Left From Title', 'wilmer-core' ) => 'icon-left-from-title',
									esc_html__( 'Icon Top', 'wilmer-core' )             => 'icon-top',
                                    esc_html__( 'Icon Top Centered', 'wilmer-core' )    => 'icon-top-centered'
								),
								'save_always' => true
							),
                            array(
                                'type'         => 'dropdown',
                                'param_name'   => 'boxed_type',
                                'heading'      => esc_html__('Enable Icon Box', 'wilmer-core'),
                                'description'  => esc_html__('Enable this option if you want icon with text ot be placed inside box with borders', 'wilmer-core'),
                                'value'        => array_flip(wilmer_mikado_get_yes_no_select_array(false, false)),
                                'save_always' => true,
                                'dependency'  => array('element' => 'type', 'value' => array('icon-top', 'icon-top-centered'))
                            )
						),
						wilmer_mikado_icon_collections()->getVCParamsArray(),
						array(
							array(
								'type'       => 'attach_image',
								'param_name' => 'custom_icon',
								'heading'    => esc_html__( 'Custom Icon', 'wilmer-core' )
							),
							array(
								'type'       => 'dropdown',
								'param_name' => 'icon_type',
								'heading'    => esc_html__( 'Icon Type', 'wilmer-core' ),
								'value'      => array(
									esc_html__( 'Normal', 'wilmer-core' ) => 'mkdf-normal',
									esc_html__( 'Circle', 'wilmer-core' ) => 'mkdf-circle',
									esc_html__( 'Square', 'wilmer-core' ) => 'mkdf-square'
								),
								'group'      => esc_html__( 'Icon Settings', 'wilmer-core' )
							),
							array(
								'type'       => 'dropdown',
								'param_name' => 'icon_size',
								'heading'    => esc_html__( 'Icon Size', 'wilmer-core' ),
								'value'      => array(
									esc_html__( 'Medium', 'wilmer-core' )     => 'mkdf-icon-medium',
									esc_html__( 'Tiny', 'wilmer-core' )       => 'mkdf-icon-tiny',
									esc_html__( 'Small', 'wilmer-core' )      => 'mkdf-icon-small',
									esc_html__( 'Large', 'wilmer-core' )      => 'mkdf-icon-large',
									esc_html__( 'Very Large', 'wilmer-core' ) => 'mkdf-icon-huge'
								),
								'group'      => esc_html__( 'Icon Settings', 'wilmer-core' )
							),
							array(
								'type'       => 'textfield',
								'param_name' => 'custom_icon_size',
								'heading'    => esc_html__( 'Custom Icon Size (px)', 'wilmer-core' ),
								'group'      => esc_html__( 'Icon Settings', 'wilmer-core' )
							),
							array(
								'type'       => 'textfield',
								'param_name' => 'shape_size',
								'heading'    => esc_html__( 'Shape Size (px)', 'wilmer-core' ),
								'group'      => esc_html__( 'Icon Settings', 'wilmer-core' )
							),
							array(
								'type'       => 'colorpicker',
								'param_name' => 'icon_color',
								'heading'    => esc_html__( 'Icon Color', 'wilmer-core' ),
								'group'      => esc_html__( 'Icon Settings', 'wilmer-core' )
							),
							array(
								'type'       => 'colorpicker',
								'param_name' => 'icon_hover_color',
								'heading'    => esc_html__( 'Icon Hover Color', 'wilmer-core' ),
								'group'      => esc_html__( 'Icon Settings', 'wilmer-core' )
							),
							array(
								'type'       => 'colorpicker',
								'param_name' => 'icon_background_color',
								'heading'    => esc_html__( 'Icon Background Color', 'wilmer-core' ),
								'dependency' => array(
									'element' => 'icon_type',
									'value'   => array( 'mkdf-square', 'mkdf-circle' )
								),
								'group'      => esc_html__( 'Icon Settings', 'wilmer-core' )
							),
							array(
								'type'       => 'colorpicker',
								'param_name' => 'icon_hover_background_color',
								'heading'    => esc_html__( 'Icon Hover Background Color', 'wilmer-core' ),
								'dependency' => array(
									'element' => 'icon_type',
									'value'   => array( 'mkdf-square', 'mkdf-circle' )
								),
								'group'      => esc_html__( 'Icon Settings', 'wilmer-core' )
							),
							array(
								'type'       => 'colorpicker',
								'param_name' => 'icon_border_color',
								'heading'    => esc_html__( 'Icon Border Color', 'wilmer-core' ),
								'dependency' => array(
									'element' => 'icon_type',
									'value'   => array( 'mkdf-square', 'mkdf-circle' )
								),
								'group'      => esc_html__( 'Icon Settings', 'wilmer-core' )
							),
							array(
								'type'       => 'colorpicker',
								'param_name' => 'icon_border_hover_color',
								'heading'    => esc_html__( 'Icon Border Hover Color', 'wilmer-core' ),
								'dependency' => array(
									'element' => 'icon_type',
									'value'   => array( 'mkdf-square', 'mkdf-circle' )
								),
								'group'      => esc_html__( 'Icon Settings', 'wilmer-core' )
							),
							array(
								'type'       => 'textfield',
								'param_name' => 'icon_border_width',
								'heading'    => esc_html__( 'Border Width (px)', 'wilmer-core' ),
								'dependency' => array(
									'element' => 'icon_type',
									'value'   => array( 'mkdf-square', 'mkdf-circle' )
								),
								'group'      => esc_html__( 'Icon Settings', 'wilmer-core' )
							),
							array(
								'type'       => 'dropdown',
								'param_name' => 'icon_animation',
								'heading'    => esc_html__( 'Icon Animation', 'wilmer-core' ),
								'value'      => array_flip( wilmer_mikado_get_yes_no_select_array( false ) ),
								'group'      => esc_html__( 'Icon Settings', 'wilmer-core' )
							),
							array(
								'type'       => 'textfield',
								'param_name' => 'icon_animation_delay',
								'heading'    => esc_html__( 'Icon Animation Delay (ms)', 'wilmer-core' ),
								'dependency' => array( 'element' => 'icon_animation', 'value' => array( 'yes' ) ),
								'group'      => esc_html__( 'Icon Settings', 'wilmer-core' )
							),
                            array(
                                'type'       => 'textarea_raw_html',
                                'param_name' => 'icon_custom_svg',
                                'heading'    => esc_html__( 'Custom Icon SVG', 'wilmer-core' )
                            ),
							array(
								'type'       => 'textfield',
								'param_name' => 'title',
								'heading'    => esc_html__( 'Title', 'wilmer-core' )
							),
                            array(
                                'type'        => 'textfield',
                                'param_name'  => 'content_top_padding',
                                'heading'     => esc_html__( 'Content top padding (px)', 'content-top-margin' ),
                                'group'       => esc_html__( 'Text Settings', 'wilmer-core' ),
                                'description' => 'Works with Icon Top and Icon Top Centered'
                            ),
							array(
								'type'        => 'dropdown',
								'param_name'  => 'title_tag',
								'heading'     => esc_html__( 'Title Tag', 'wilmer-core' ),
								'value'       => array_flip( wilmer_mikado_get_title_tag( true ) ),
								'save_always' => true,
								'dependency'  => array( 'element' => 'title', 'not_empty' => true ),
								'group'       => esc_html__( 'Text Settings', 'wilmer-core' )
							),
                            array(
                                'type'       => 'textfield',
                                'param_name' => 'caption',
                                'heading'    => esc_html__( 'Caption', 'wilmer-core' )
                            ),
							array(
								'type'       => 'colorpicker',
								'param_name' => 'title_color',
								'heading'    => esc_html__( 'Title Color', 'wilmer-core' ),
								'dependency' => array( 'element' => 'title', 'not_empty' => true ),
								'group'      => esc_html__( 'Text Settings', 'wilmer-core' )
							),
                            array(
                                'type'       => 'colorpicker',
                                'param_name' => 'title_hover_color',
                                'heading'    => esc_html__( 'Title Hover Color', 'wilmer-core' ),
                                'dependency' => array( 'element' => 'title', 'not_empty' => true ),
                                'group'      => esc_html__( 'Text Settings', 'wilmer-core' )
                            ),
							array(
								'type'       => 'textfield',
								'param_name' => 'title_top_margin',
								'heading'    => esc_html__( 'Title Top Margin (px)', 'wilmer-core' ),
								'dependency' => array( 'element' => 'title', 'not_empty' => true ),
								'group'      => esc_html__( 'Text Settings', 'wilmer-core' )
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
								'dependency' => array( 'element' => 'text', 'not_empty' => true ),
								'group'      => esc_html__( 'Text Settings', 'wilmer-core' )
							),
							array(
								'type'       => 'textfield',
								'param_name' => 'text_top_margin',
								'heading'    => esc_html__( 'Text Top Margin (px)', 'wilmer-core' ),
								'dependency' => array( 'element' => 'text', 'not_empty' => true ),
								'group'      => esc_html__( 'Text Settings', 'wilmer-core' )
							),
							array(
								'type'        => 'textfield',
								'param_name'  => 'link',
								'heading'     => esc_html__( 'Link', 'wilmer-core' ),
								'description' => esc_html__( 'Set link around icon and title', 'wilmer-core' )
							),
							array(
								'type'       => 'dropdown',
								'param_name' => 'target',
								'heading'    => esc_html__( 'Target', 'wilmer-core' ),
								'value'      => array_flip( wilmer_mikado_get_link_target_array() ),
								'dependency' => array( 'element' => 'link', 'not_empty' => true ),
							),
							array(
								'type'        => 'textfield',
								'param_name'  => 'text_padding',
								'heading'     => esc_html__( 'Text Padding (px)', 'wilmer-core' ),
								'description' => esc_html__( 'Set left or top padding dependence of type for your text holder. Default value is 13 for left type and 25 for top icon with text type', 'wilmer-core' ),
								'dependency'  => array( 'element' => 'type', 'value'   => array( 'icon-left', 'icon-top' ) ),
								'group'       => esc_html__( 'Text Settings', 'wilmer-core' )
							),
                            array(
                                'type'       => 'colorpicker',
                                'param_name' => 'caption_color',
                                'heading'    => esc_html__( 'Caption Color', 'wilmer-core' ),
                                'dependency' => array( 'element' => 'caption', 'not_empty' => true ),
                                'group'      => esc_html__( 'Text Settings', 'wilmer-core' )
                            )
						)
					)
				)
			);
		}
	}
	
	public function render( $atts, $content = null ) {
		$default_atts = array(
			'custom_class'                => '',
			'type'                        => 'icon-left',
			'custom_icon'                 => '',
			'icon_type'                   => 'mkdf-normal',
			'boxed_type'                  => 'no',
			'icon_size'                   => 'mkdf-icon-medium',
			'custom_icon_size'            => '',
			'shape_size'                  => '',
			'icon_color'                  => '',
			'icon_hover_color'            => '',
			'icon_background_color'       => '',
			'icon_hover_background_color' => '',
			'icon_border_color'           => '',
			'icon_border_hover_color'     => '',
			'icon_border_width'           => '',
			'icon_animation'              => '',
			'icon_animation_delay'        => '',
			'content_top_padding'         => '',
			'icon_custom_svg'             => '',
			'title'                       => '',
			'title_tag'                   => 'h4',
            'caption'                     => '',
            'caption_color'               => '',
			'title_color'                 => '',
            'title_hover_color'           => '',
			'title_top_margin'            => '',
			'text'                        => '',
			'text_color'                  => '',
			'text_top_margin'             => '',
			'link'                        => '',
			'target'                      => '_self',
			'text_padding'                => ''
		);
		$default_atts = array_merge( $default_atts, wilmer_mikado_icon_collections()->getShortcodeParams() );
		$params       = shortcode_atts( $default_atts, $atts );
		
		$params['type'] = ! empty( $params['type'] ) ? $params['type'] : $default_atts['type'];
		
		$params['icon_parameters'] = $this->getIconParameters( $params );
		$params['holder_classes']  = $this->getHolderClasses( $params );
		$params['content_styles']  = $this->getContentStyles( $params );
		$params['title_styles']    = $this->getTitleStyles( $params );
		$params['title_tag']       = ! empty( $params['title_tag'] ) ? $params['title_tag'] : $default_atts['title_tag'];
		$params['text_styles']     = $this->getTextStyles( $params );
		$params['target']          = ! empty( $params['target'] ) ? $params['target'] : $default_atts['target'];
        $params['caption_styles']  = $this->getCaptionStyles( $params );
        $params['icon_data']       = $this->getIconDataAttr( $params );

		return wilmer_core_get_shortcode_module_template_part( 'templates/iwt', 'icon-with-text', $params['type'], $params );
	}
	
	private function getIconParameters( $params ) {
		$params_array = array();
		
		if ( empty( $params['custom_icon'] ) ) {
			$iconPackName = wilmer_mikado_icon_collections()->getIconCollectionParamNameByKey( $params['icon_pack'] );
			
			$params_array['icon_pack']     = $params['icon_pack'];
			$params_array[ $iconPackName ] = $params[ $iconPackName ];
			
			if ( ! empty( $params['icon_size'] ) ) {
				$params_array['size'] = $params['icon_size'];
			}
			
			if ( ! empty( $params['custom_icon_size'] ) ) {
				$params_array['custom_size'] = wilmer_mikado_filter_px( $params['custom_icon_size'] ) . 'px';
			}
			
			if ( ! empty( $params['icon_type'] ) ) {
				$params_array['type'] = $params['icon_type'];
			}
			
			if ( ! empty( $params['shape_size'] ) ) {
				$params_array['shape_size'] = wilmer_mikado_filter_px( $params['shape_size'] ) . 'px';
			}
			
			if ( ! empty( $params['icon_border_color'] ) ) {
				$params_array['border_color'] = $params['icon_border_color'];
			}
			
			if ( ! empty( $params['icon_border_hover_color'] ) ) {
				$params_array['hover_border_color'] = $params['icon_border_hover_color'];
			}
			
			if ( $params['icon_border_width'] !== '' ) {
				$params_array['border_width'] = wilmer_mikado_filter_px( $params['icon_border_width'] ) . 'px';
			}

            if ( $params['title_hover_color'] !== '' ) {
                $params_array['title_hover_color'] = $params['title_hover_color'];
            }

			if ( ! empty( $params['icon_background_color'] ) ) {
				$params_array['background_color'] = $params['icon_background_color'];
			}
			
			if ( ! empty( $params['icon_hover_background_color'] ) ) {
				$params_array['hover_background_color'] = $params['icon_hover_background_color'];
			}
			
			$params_array['icon_color'] = $params['icon_color'];
			
			if ( ! empty( $params['icon_hover_color'] ) ) {
				$params_array['hover_icon_color'] = $params['icon_hover_color'];
			}
			
			$params_array['icon_animation']       = $params['icon_animation'];
			$params_array['icon_animation_delay'] = $params['icon_animation_delay'];
		}
		
		return $params_array;
	}

    private function getIconDataAttr( $params ) {
        $data = array();

        if ( $params['title_color'] !== '' ) {
            $data['data-title-color'] = $params['title_color'];
        }

        if ( $params['title_hover_color'] !== '' ) {
            $data['data-title-hover-color'] = $params['title_hover_color'];
        }

        return $data;
    }
	
	private function getHolderClasses( $params ) {
		$holderClasses = array( 'mkdf-iwt', 'clearfix' );
		
		$holderClasses[] = ! empty( $params['custom_class'] ) ? esc_attr( $params['custom_class'] ) : '';
		$holderClasses[] = ! empty( $params['type'] ) ? 'mkdf-iwt-' . $params['type'] : '';
		$holderClasses[] = $params['boxed_type'] == 'yes' ? 'mkdf-iwt-boxed' : '';
		$holderClasses[] = ! empty( $params['icon_size'] ) ? 'mkdf-iwt-' . str_replace( 'mkdf-', '', $params['icon_size'] ) : '';
		
		return $holderClasses;
	}
	
	private function getContentStyles( $params ) {
		$styles = array();
		
		if ( $params['text_padding'] !== '' && $params['type'] === 'icon-left' ) {
			$styles[] = 'padding-left: ' . wilmer_mikado_filter_px( $params['text_padding'] ) . 'px';
		}
		
		if ( $params['text_padding'] !== '' && $params['type'] === 'icon-top' ) {
			$styles[] = 'padding-top: ' . wilmer_mikado_filter_px( $params['text_padding'] ) . 'px';
		}

        if ( $params['content_top_padding'] !== '' && $params['type'] === 'icon-top' || $params['type'] === 'icon-top-centered' ) {
            $styles[] = 'padding-top: ' . wilmer_mikado_filter_px( $params['content_top_padding'] ) . 'px';
        }
		
		return implode( ';', $styles );
	}
	
	private function getTitleStyles( $params ) {
		$styles = array();
		
		if ( ! empty( $params['title_color'] ) ) {
			$styles[] = 'color: ' . $params['title_color'];
		}
		
		if ( $params['title_top_margin'] !== '' ) {
			$styles[] = 'margin-top: ' . wilmer_mikado_filter_px( $params['title_top_margin'] ) . 'px';
		}
		
		return implode( ';', $styles );
	}
	
	private function getTextStyles( $params ) {
		$styles = array();
		
		if ( ! empty( $params['text_color'] ) ) {
			$styles[] = 'color: ' . $params['text_color'];
		}
		
		if ( $params['text_top_margin'] !== '' ) {
			$styles[] = 'margin-top: ' . wilmer_mikado_filter_px( $params['text_top_margin'] ) . 'px';
		}
		
		return implode( ';', $styles );
	}
    private function getCaptionStyles( $params ) {
        $styles = array();

        if ( ! empty( $params['caption_color'] ) ) {
            $styles[] = 'color: ' . $params['text_color'];
        }

        return implode( ';', $styles );
    }
}