<?php
namespace WilmerCore\CPT\Shortcodes\Banner;

use WilmerCore\Lib;

class Banner implements Lib\ShortcodeInterface {
	private $base;
	
	public function __construct() {
		$this->base = 'mkdf_banner';
		
		add_action( 'vc_before_init', array( $this, 'vcMap' ) );
	}
	
	public function getBase() {
		return $this->base;
	}
	
	public function vcMap() {
		if ( function_exists( 'vc_map' ) ) {
			vc_map(
				array(
					'name'                      => esc_html__( 'Banner', 'wilmer-core' ),
					'base'                      => $this->getBase(),
					'category'                  => esc_html__( 'by WILMER', 'wilmer-core' ),
					'icon'                      => 'icon-wpb-banner extended-custom-icon',
					'allowed_container_element' => 'vc_row',
					'params'                    => array(
						array(
							'type'        => 'textfield',
							'param_name'  => 'custom_class',
							'heading'     => esc_html__( 'Custom CSS Class', 'wilmer-core' ),
							'description' => esc_html__( 'Style particular content element differently - add a class name and refer to it in custom CSS', 'wilmer-core' )
						),
						array(
							'type'        => 'attach_image',
							'param_name'  => 'image',
							'heading'     => esc_html__( 'Image', 'wilmer-core' ),
							'description' => esc_html__( 'Select image from media library', 'wilmer-core' ),
                            'dependency'  => array('element' => 'hover_behavior', 'value' => array('mkdf-visible-on-hover', 'mkdf-visible-on-default', 'mkdf-disabled'))
						),
						array(
							'type'       => 'colorpicker',
							'param_name' => 'overlay_color',
							'heading'    => esc_html__( 'Image Overlay Color', 'wilmer-core' )
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'hover_behavior',
							'heading'     => esc_html__( 'Hover Behavior', 'wilmer-core' ),
							'value'       => array(
								esc_html__( 'Visible on Hover', 'wilmer-core' )       => 'mkdf-visible-on-hover',
								esc_html__( 'Visible on Default', 'wilmer-core' )     => 'mkdf-visible-on-default',
                                esc_html__( 'Hover background color', 'wilmer-core' ) => 'mkdf-hover-background-color',
								esc_html__( 'Disabled', 'wilmer-core' )               => 'mkdf-disabled'
							),
							'save_always' => true
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'info_position',
							'heading'     => esc_html__( 'Info Position', 'wilmer-core' ),
							'value'       => array(
								esc_html__( 'Default', 'wilmer-core' )  => 'default',
								esc_html__( 'Centered', 'wilmer-core' ) => 'centered'
							),
							'save_always' => true
						),
						array(
							'type'        => 'textfield',
							'param_name'  => 'info_content_padding',
							'heading'     => esc_html__( 'Info Content Padding', 'wilmer-core' ),
							'description' => esc_html__( 'Please insert padding in format top right bottom left', 'wilmer-core' )
						),
						array(
							'type'       => 'textfield',
							'param_name' => 'subtitle',
							'heading'    => esc_html__( 'Subtitle', 'wilmer-core' )
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'subtitle_tag',
							'heading'     => esc_html__( 'Subtitle Tag', 'wilmer-core' ),
							'value'       => array_flip( wilmer_mikado_get_title_tag( true, array( 'p' => 'p' ) ) ),
							'save_always' => true,
							'dependency'  => array( 'element' => 'subtitle', 'not_empty' => true )
						),
                        array(
                            'type'        => 'textfield',
                            'param_name'  => 'subtitle_font_size',
                            'heading'     => esc_html__( 'Subtitle Font Size', 'wilmer-core' ),
                            'save_always' => true,
                            'dependency'  => array( 'element' => 'subtitle', 'not_empty' => true )
                        ),
						array(
							'type'       => 'colorpicker',
							'param_name' => 'subtitle_color',
							'heading'    => esc_html__( 'Subtitle Color', 'wilmer-core' ),
							'dependency' => array( 'element' => 'subtitle', 'not_empty' => true )
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
							'value'       => array_flip( wilmer_mikado_get_title_tag( true, array( 'p' => 'p' ) ) ),
							'save_always' => true,
							'dependency'  => array( 'element' => 'title', 'not_empty' => true )
						),
						array(
							'type'        => 'textfield',
							'param_name'  => 'title_light_words',
							'heading'     => esc_html__( 'Words with Light Font Weight', 'wilmer-core' ),
							'description' => esc_html__( 'Enter the positions of the words you would like to display in a "light" font weight. Separate the positions with commas (e.g. if you would like the first, third, and fourth word to have a light font weight, you would enter "1,3,4")', 'wilmer-core' ),
							'dependency'  => array( 'element' => 'title', 'not_empty' => true )
						),
						array(
							'type'       => 'colorpicker',
							'param_name' => 'title_color',
							'heading'    => esc_html__( 'Title Color', 'wilmer-core' ),
							'dependency' => array( 'element' => 'title', 'not_empty' => true )
						),
						array(
							'type'       => 'textfield',
							'param_name' => 'title_top_margin',
							'heading'    => esc_html__( 'Title Top Margin (px)', 'wilmer-core' ),
							'dependency' => array( 'element' => 'title', 'not_empty' => true )
						),
						array(
							'type'       => 'textfield',
							'param_name' => 'link',
							'heading'    => esc_html__( 'Link', 'wilmer-core' )
						),
						array(
							'type'       => 'dropdown',
							'param_name' => 'target',
							'heading'    => esc_html__( 'Target', 'wilmer-core' ),
							'value'      => array_flip( wilmer_mikado_get_link_target_array() ),
							'dependency' => array( 'element' => 'link', 'not_empty' => true )
						),
						array(
							'type'       => 'textfield',
							'param_name' => 'link_text',
							'heading'    => esc_html__( 'Link Text', 'wilmer-core' ),
							'dependency' => array( 'element' => 'link', 'not_empty' => true )
						),
						array(
							'type'       => 'colorpicker',
							'param_name' => 'link_color',
							'heading'    => esc_html__( 'Link Text Color', 'wilmer-core' ),
							'dependency' => array( 'element' => 'link', 'not_empty' => true )
						),
                        array(
                            'type'       => 'colorpicker',
                            'param_name' => 'border_bottom_color',
                            'heading'    => esc_html__( 'Border bottom color', 'wilmer-core' )
                        ),
						array(
							'type'       => 'textfield',
							'param_name' => 'link_top_margin',
							'heading'    => esc_html__( 'Link Text Top Margin (px)', 'wilmer-core' ),
							'dependency' => array( 'element' => 'link', 'not_empty' => true )
						)
					)
				)
			);
		}
	}
	
	public function render( $atts, $content = null ) {
		$args   = array(
			'custom_class'         => '',
			'image'                => '',
			'overlay_color'        => '',
			'hover_behavior'       => 'mkdf-visible-on-hover',
			'info_position'        => 'default',
			'info_content_padding' => '',
			'subtitle'             => '',
			'subtitle_tag'         => 'h5',
			'subtitle_font_size'   => '',
			'subtitle_color'       => '',
			'title'                => '',
			'title_tag'            => 'h2',
			'title_light_words'    => '',
			'title_color'          => '',
			'title_top_margin'     => '',
			'link'                 => '',
			'target'               => '_self',
			'link_text'            => '',
			'link_color'           => '',
			'link_top_margin'      => '',
            'border_bottom_color'  => ''
		);
		$params = shortcode_atts( $args, $atts );
		
		$params['holder_classes']  = $this->getHolderClasses( $params, $args );
		$params['overlay_styles']  = $this->getOverlayStyles( $params );
		$params['subtitle_tag']    = ! empty( $params['subtitle_tag'] ) ? $params['subtitle_tag'] : $args['subtitle_tag'];
		$params['subtitle_styles'] = $this->getSubitleStyles( $params );
		$params['title']           = $this->getModifiedTitle( $params );
		$params['title_tag']       = ! empty( $params['title_tag'] ) ? $params['title_tag'] : $args['title_tag'];
		$params['title_styles']    = $this->getTitleStyles( $params );
		$params['link_styles']     = $this->getLinkStyles( $params );
		$params['border_bottom_color'] = $this->getBorderBottomColor($params);
		
		$html = wilmer_core_get_shortcode_module_template_part( 'templates/banner', 'banner', '', $params );
		
		return $html;
	}
	
	private function getHolderClasses( $params, $args ) {
		$holderClasses = array();
		
		$holderClasses[] = ! empty( $params['custom_class'] ) ? esc_attr( $params['custom_class'] ) : '';
		$holderClasses[] = ! empty( $params['hover_behavior'] ) ? $params['hover_behavior'] : $args['hover_behavior'];
		$holderClasses[] = ! empty( $params['info_position'] ) ? 'mkdf-banner-info-' . $params['info_position'] : 'mkdf-banner-info-' . $args['info_position'];
		
		return implode( ' ', $holderClasses );
	}
	
	private function getOverlayStyles( $params ) {
		$styles = array();
		
		if ( ! empty( $params['overlay_color'] ) ) {
			$styles[] = 'background-color: ' . $params['overlay_color'];
		}
		
		if ( ! empty( $params['info_content_padding'] ) ) {
			$styles[] = 'padding: ' . $params['info_content_padding'];
		}

		return implode( ';', $styles );
	}
	
	private function getSubitleStyles( $params ) {
		$styles = array();
		
		if ( ! empty( $params['subtitle_font_size'] ) ) {
			$styles[] = 'font-size: ' . wilmer_mikado_filter_px($params['subtitle_font_size']) . 'px';
		}

		if ( ! empty( $params['subtitle_color'] ) ) {
			$styles[] = 'color: ' . $params['subtitle_color'];
		}
		
		return implode( ';', $styles );
	}
	
	private function getModifiedTitle( $params ) {
		$title             = $params['title'];
		$title_light_words = str_replace( ' ', '', $params['title_light_words'] );
		
		if ( ! empty( $title ) ) {
			$light_words = explode( ',', $title_light_words );
			$split_title = explode( ' ', $title );
			
			if ( ! empty( $title_light_words ) ) {
				foreach ( $light_words as $value ) {
                    $value = intval($value);
					if ( ! empty( $split_title[ $value - 1 ] ) ) {
						$split_title[ $value - 1 ] = '<span class="mkdf-banner-title-light">' . $split_title[ $value - 1 ] . '</span>';
					}
				}
			}
			
			$title = implode( ' ', $split_title );
		}
		
		return $title;
	}
	
	private function getTitleStyles( $params ) {
		$styles = array();
		
		if ( ! empty( $params['title_color'] ) ) {
			$styles[] = 'color: ' . $params['title_color'];
		}
		
		if ( ! empty( $params['title_top_margin'] ) ) {
			$styles[] = 'margin-top: ' . wilmer_mikado_filter_px( $params['title_top_margin'] ) . 'px';
		}
		
		return implode( ';', $styles );
	}
	
	private function getLinkStyles( $params ) {
		$styles = array();
		
		if ( ! empty( $params['link_color'] ) ) {
			$styles[] = 'color: ' . $params['link_color'];
		}
		
		if ( ! empty( $params['link_top_margin'] ) ) {
			$styles[] = 'margin-top: ' . wilmer_mikado_filter_px( $params['link_top_margin'] ) . 'px';
		}
		
		return implode( ';', $styles );
	}

    private function getBorderBottomColor( $params ) {
        $styles = array();

        if ( ! empty( $params['border_bottom_color'] ) ) {
            $styles[] = 'background: ' . $params['border_bottom_color'];
        }

        return implode( ';', $styles );
    }
}