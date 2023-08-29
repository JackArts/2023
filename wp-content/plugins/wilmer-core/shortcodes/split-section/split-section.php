<?php
namespace WilmerCore\CPT\Shortcodes\SplitSection;

use WilmerCore\Lib;

class SplitSection implements Lib\ShortcodeInterface {
    private $base;
	
    public function __construct() {
        $this->base = 'mkdf_split_section';

        add_action('vc_before_init', array($this, 'vcMap'));
    }
	
    public function getBase() {
        return $this->base;
    }
	
	public function vcMap() {
		if ( function_exists( 'vc_map' ) ) {
			vc_map(
				array(
					'name'     => esc_html__( 'Split Section', 'wilmer-core' ),
					'base'     => $this->base,
					'category' => esc_html__( 'by WILMER', 'wilmer-core' ),
					'icon'     => 'icon-wpb-split-section extended-custom-icon',
					'params'   => array(
					    array(
                            'type'        => 'dropdown',
                            'param_name'  => 'enable_full_height',
                            'heading'     => esc_html__( 'Full Height Sections', 'wilmer-core' ),
                            'value'       => array_flip(wilmer_mikado_get_yes_no_select_array(false, false)),
                            'save_always' => true
                        ),
                        array(
                            'type'        => 'dropdown',
                            'param_name'  => 'skin',
                            'heading'     => esc_html__( 'Text Skin', 'wilmer-core' ),
                            'value'       => array(
                                esc_html__( 'Dark', 'wilmer-core' )  => 'dark',
                                esc_html__( 'Light', 'wilmer-core' ) => 'light'
                            ),
                            'save_always' => true
                        ),
						array(
							'type'       => 'attach_image',
							'param_name' => 'image',
							'heading'    => esc_html__( 'Image', 'wilmer-core' )
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'image_position',
							'heading'     => esc_html__( 'Image Position', 'wilmer-core' ),
							'value'       => array(
								esc_html__( 'Left', 'wilmer-core' )  => 'left',
								esc_html__( 'Right', 'wilmer-core' ) => 'right'
							),
							'save_always' => true
						),
						array(
							'type'       => 'colorpicker',
							'param_name' => 'content_background',
							'heading'    => esc_html__( 'Content Background Color', 'wilmer-core' )
						),
                        array(
                            'type'        => 'textfield',
                            'param_name'  => 'centered_text',
                            'heading'     => esc_html__( 'Centered Text', 'wilmer-core' ),
                        ),
                        array(
                            'type'        => 'colorpicker',
                            'param_name'  => 'centered_text_outline_color',
                            'heading'     => esc_html__( 'Centered Text Outline Color', 'wilmer-core' ),
                        ),
                        array(
                            'type'        => 'textfield',
                            'param_name'  => 'upper_subtitle',
                            'heading'     => esc_html__( 'Upper Subtitle', 'wilmer-core' ),
                            'admin_label' => true
                        ),
                        array(
                            'type'        => 'textfield',
                            'param_name'  => 'upper_title',
                            'heading'     => esc_html__( 'Upper Title', 'wilmer-core' ),
                            'admin_label' => true
                        ),
                        array(
                            'type'        => 'textfield',
                            'param_name'  => 'lower_subtitle',
                            'heading'     => esc_html__( 'Lower Subtitle', 'wilmer-core' ),
                            'admin_label' => true
                        ),
                        array(
                            'type'        => 'textfield',
                            'param_name'  => 'lower_title',
                            'heading'     => esc_html__( 'Lower Title', 'wilmer-core' ),
                            'admin_label' => true
                        ),
						array(
							'type'       => 'textfield',
							'param_name' => 'button_text',
							'heading'    => esc_html__( 'Button Text', 'wilmer-core' )
						),
                        array(
                            'type'        => 'dropdown',
                            'param_name'  => 'button_skin',
                            'heading'     => esc_html__( 'Button Skin', 'wilmer-core' ),
                            'value'       => array(
                                esc_html__( 'Default', 'wilmer-core' ) => 'default',
                                esc_html__( 'Light', 'wilmer-core' ) => 'light',
                                esc_html__( 'Dark', 'wilmer-core' )    => 'dark'
                            ),
                            'group'      => esc_html__( 'Button Style', 'wilmer-core' )
                        ),
						array(
							'type'       => 'textfield',
							'param_name' => 'button_link',
							'heading'    => esc_html__( 'Button Link', 'wilmer-core' ),
							'dependency' => array( 'element' => 'button_text', 'not_empty' => true ),
							'group'      => esc_html__( 'Button Style', 'wilmer-core' )
						),
						array(
							'type'       => 'dropdown',
							'param_name' => 'button_target',
							'heading'    => esc_html__( 'Button Link Target', 'wilmer-core' ),
							'value'      => array_flip( wilmer_mikado_get_link_target_array() ),
							'dependency' => array( 'element' => 'button_link', 'not_empty' => true ),
							'group'      => esc_html__( 'Button Style', 'wilmer-core' )
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'breakpoint',
							'heading'     => esc_html__( 'Responsive Breakpoint', 'wilmer-core' ),
							'value'       => array(
								esc_html__( 'Never', 'wilmer-core' )        => '',
								esc_html__( 'Below 1366px', 'wilmer-core' ) => '1366',
								esc_html__( 'Below 1024px', 'wilmer-core' ) => '1024',
								esc_html__( 'Below 768px', 'wilmer-core' )  => '768',
								esc_html__( 'Below 680px', 'wilmer-core' )  => '680',
								esc_html__( 'Below 480px', 'wilmer-core' )  => '480'
							),
							'description' => esc_html__( 'Choose on which stage you want to break image and text content to be one under other', 'wilmer-core' ),
							'save_always' => true
						)
					)
				)
			);
		}
	}
	
	public function render( $atts, $content = null ) {
		$default_atts = array(
		    'enable_full_height'            => 'no',
			'skin'                          => 'dark',
			'image'                         => '',
			'image_position'                => 'left',
			'content_background'            => '',
			'centered_text'                 => '',
			'centered_text_outline_color'   => '',
			'upper_subtitle'                => '',
			'upper_title'                   => '',
            'lower_subtitle'                => '',
            'lower_title'                   => '',
			'text_top_margin'               => '',
			'button_text'                   => '',
			'button_skin'                   => 'default',
			'button_link'                   => '',
			'button_target'                 => '_self',
			'breakpoint'                    => ''
		);
		$params       = shortcode_atts( $default_atts, $atts );
		
		$params['holder_classes'] = $this->getHolderClasses( $params );
		$params['content_style']  = $this->getContentStyles( $params );
		$params['image_styles']   = $this->getImageBackgroundStyles( $params );
		$params['background_text_style'] = $this->getBackgroundTextStyle( $params );
		//$params['title_tag']      = ! empty( $params['title_tag'] ) ? $params['title_tag'] : $default_atts['title_tag'];
		//$params['title_styles']   = $this->getTitleStyles( $params );
		//$params['text_tag']       = ! empty( $params['text_tag'] ) ? $params['text_tag'] : $default_atts['text_tag'];
		//$params['text_styles']    = $this->getTextStyles( $params );
		
		$html = wilmer_core_get_shortcode_module_template_part( 'templates/split-section', 'split-section', '', $params );
		
		return $html;
	}
	
	private function getHolderClasses( $params ) {
		$holderClasses = array();
		
		$holderClasses[] = 'mkdf-ss-image-' . $params['image_position'];
		$holderClasses[] = ! empty( $params['breakpoint'] ) ? 'mkdf-ss-break-' . $params['breakpoint'] : '';
		$holderClasses[] = ! empty( $params['skin'] ) ? 'mkdf-ss-' . $params['skin'] . '-skin' : '';
		$holderClasses[] = $params['enable_full_height'] == 'yes' ? 'mkdf-ss-full-height' : '';

		return implode( ' ', $holderClasses );
	}
	
	private function getImageBackgroundStyles( $params ) {
		$styles = array();
		
		if ( ! empty( $params['image'] ) ) {
			$image_src = wp_get_attachment_image_src( $params['image'], 'full' );
			
			if ( is_array( $image_src ) ) {
				$image_src = $image_src[0];
			}
			
			$styles[] = 'background-image: url(' . $image_src . ')';
		}
		
		return implode( ';', $styles );
	}
	
	private function getContentStyles($params) {
		$styles   = array();

		if(!empty($params['content_background'])) {
			$styles[] = 'background-color:'. $params['content_background'];
		}

		return implode( ';', $styles );
	}

	private function getBackgroundTextStyle( $params ) {
		$styles = array();

		if ( ! empty( $params['centered_text_outline_color'] ) ) {
			$styles[] = '-webkit-text-stroke-color: ' . $params['centered_text_outline_color'];
		}

		return implode( ';', $styles );
	}


}