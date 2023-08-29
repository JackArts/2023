<?php
namespace WilmerCore\CPT\Shortcodes\imageMarquee;

use WilmerCore\Lib;

class ImageMarquee implements Lib\ShortcodeInterface {
	private $base;
	
	public function __construct() {
		$this->base = 'mkdf_image_marquee';
		
		add_action( 'vc_before_init', array( $this, 'vcMap' ) );
	}
	
	public function getBase() {
		return $this->base;
	}
	
	public function vcMap() {
		if ( function_exists( 'vc_map' ) ) {
			vc_map(
				array(
					'name'                      => esc_html__( 'Image Marquee', 'wilmer-core' ),
					'base'                      => $this->getBase(),
					'category'                  => esc_html__( 'by WILMER', 'wilmer-core' ),
					'icon'                      => 'icon-wpb-image-marquee extended-custom-icon',
					'allowed_container_element' => 'vc_row',
					'params'                    => array(
						array(
							'type'       => 'dropdown',
							'param_name' => 'marquee_type',
							'heading'    => esc_html__( 'Marquee Type', 'wilmer-core' ),
							'value'      => array(
								esc_html__( 'Simple', 'wilmer-core' )		=> 'simple',
								esc_html__( 'With Content', 'wilmer-core' )	=> 'with-content'
							),
							'admin_label' => true,
							'group'			=> esc_html__( 'Marquee Options', 'wilmer-core' )
						),
						array(
							'type'       => 'dropdown',
							'param_name' => 'marquee_layout',
							'heading'    => esc_html__( 'Marquee Layout', 'wilmer-core' ),
							'value'      => array(
								esc_html__( 'Default', 'wilmer-core' )		=> 'default',
								esc_html__( 'Full Height', 'wilmer-core' )	=> 'full-height'
							),
							'admin_label' => true,
							'group'			=> esc_html__( 'Marquee Options', 'wilmer-core' )
						),
						array(
							'type'			=> 'attach_image',
							'param_name'	=> 'marquee_image',
							'heading'		=> esc_html__( 'Marquee Image', 'wilmer-core' ),
							'description'	=> esc_html__( 'Select image from media library', 'wilmer-core' ),
							'group'			=> esc_html__( 'Marquee Options', 'wilmer-core' )
						),
						array(
							'type'        	=> 'attach_image',
							'param_name'	=> 'content_image',
							'heading'    	=> esc_html__( 'Content Image', 'wilmer-core' ),
							'description' 	=> esc_html__( 'Select image from media library', 'wilmer-core' ),
							'dependency' 	=> array( 'element' => 'marquee_type', 'value' => 'with-content' ),
							'group'			=> esc_html__( 'Content Options', 'wilmer-core' )
						),
						array(
							'type'			=> 'textfield',
							'param_name'	=> 'bold_title',
							'heading'		=> esc_html__( 'Bold Title', 'wilmer-core' ),
							'dependency' 	=> array( 'element' => 'marquee_type', 'value' => 'with-content' ),
							'admin_label' 	=> true,
							'group'			=> esc_html__( 'Content Options', 'wilmer-core' )
						),
						array(
							'type'			=> 'textfield',
							'param_name'	=> 'regular_title',
							'heading'		=> esc_html__( 'Regular Title', 'wilmer-core' ),
							'dependency' 	=> array( 'element' => 'marquee_type', 'value' => 'with-content' ),
							'admin_label' 	=> true,
							'group'			=> esc_html__( 'Content Options', 'wilmer-core' )
						),
						array(
							'type'       	=> 'colorpicker',
							'param_name' 	=> 'titles_color',
							'heading'   	=> esc_html__( 'Titles Color', 'wilmer-core' ),
							'dependency'	=> array( 'element' => 'marquee_type', 'value' => 'with-content' ),
							'group'			=> esc_html__( 'Content Options', 'wilmer-core' )
						),
						array(
							'type'        	=> 'textfield',
							'param_name'  	=> 'button_text',
							'heading'     	=> esc_html__( 'Button Text', 'wilmer-core' ),
							'dependency' 	=> array( 'element' => 'marquee_type', 'value' => 'with-content' ),
							'admin_label' 	=> true,
							'group'			=> esc_html__( 'Content Options', 'wilmer-core' )
						),
						array(
							'type'      	=> 'textfield',
							'param_name' 	=> 'button_link',
							'heading'    	=> esc_html__( 'Button Link', 'wilmer-core' ),
							'dependency' 	=> array( 'element' => 'button_text', 'not_empty' => true ),
							'admin_label' 	=> true,
							'group'			=> esc_html__( 'Content Options', 'wilmer-core' )
						),
						array(
							'type'       	=> 'colorpicker',
							'param_name' 	=> 'button_color',
							'heading'   	=> esc_html__( 'Button Color', 'wilmer-core' ),
							'dependency' 	=> array( 'element' => 'button_text', 'not_empty' => true ),
							'group'			=> esc_html__( 'Content Options', 'wilmer-core' )
						),
						array(
							'type'       	=> 'colorpicker',
							'param_name' 	=> 'button_background_color',
							'heading'   	=> esc_html__( 'Button Background Color', 'wilmer-core' ),
							'dependency' 	=> array( 'element' => 'button_text', 'not_empty' => true ),
							'group'			=> esc_html__( 'Content Options', 'wilmer-core' )
						),
					)
				)
			);
		}
	}
	
	public function render( $atts, $content = null ) {
		$args   = array(
			'marquee_type'		=> 'simple',
			'marquee_layout'	=> 'default',
			'marquee_image' 	=> '',
			'content_image' 	=> '',
			'bold_title' 		=> '',
			'regular_title' 	=> '',
			'titles_color' 		=> '',
			'button_text' 		=> '',
			'button_link' 		=> '',
			'button_color' 		=> '',
			'button_color' 		=> '',
			'button_background_color' => ''
		);
		
		$params = shortcode_atts( $args, $atts );

		$params['holder_classes'] 	= $this->getHolderClasses( $params, $args );
		$params['titles_color']		= $this->getTitlesStyles( $params );
		$params['button_params']	= $this->getButtonParameters( $params );

		$html = wilmer_core_get_shortcode_module_template_part( 'templates/image-marquee-template', 'image-marquee', '', $params );
		
		return $html;
	}

	private function getHolderClasses( $params ) {
		$holderClasses = array();
		
		$holderClasses[] = ! empty( $params['marquee_layout'] ) ? 'mkdf-im-' . $params['marquee_layout'] : '';
		$holderClasses[] = ! empty( $params['marquee_type'] ) ? 'mkdf-im-' . $params['marquee_type'] : '';
		
		return implode( ' ', $holderClasses );
	}

	private function getTitlesStyles( $params ) {
		$styles = array();
		
		if ( ! empty( $params['titles_color'] ) ) {
			$styles[] = 'color: ' . $params['titles_color'];
		}
		
		return implode( ';', $styles );
	}

	private function getButtonParameters( $params ) {
		$button_params_array = array();
		
		if ( ! empty( $params['button_text'] ) ) {
			$button_params_array['text'] = $params['button_text'];
		}

		if ( ! empty( $params['button_link'] ) ) {
			$button_params_array['link'] = $params['button_link'];
		}
		
		
		if ( ! empty( $params['button_color'] ) ) {
			$button_params_array['color'] = $params['button_color'];
		}
		
		if ( ! empty( $params['button_background_color'] ) ) {
			$button_params_array['background_color'] = $params['button_background_color'];
		}

		$button_params_array['type'] = 'solid';
		$button_params_array['size'] = 'large';
		$button_params_array['target'] = '_self';
		$button_params_array['custom_class'] = 'mkdf-im-btn';
		
		return $button_params_array;
	}
}