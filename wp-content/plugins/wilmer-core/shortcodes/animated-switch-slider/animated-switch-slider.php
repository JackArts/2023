<?php
namespace WilmerCore\CPT\Shortcodes\AnimatedSwitchSlider;

use WilmerCore\Lib;

class AnimatedSwitchSlider implements Lib\ShortcodeInterface {
	private $base;
	
	public function __construct() {
		$this->base = 'mkdf_animated_switch_slider';

		add_action('vc_before_init', array($this, 'vcMap'));
	}

	/**
	 * Returns base for shortcode
	 * @return string
	 */
	public function getBase() {
		return $this->base;
	}

	/**
	 * Maps shortcode to Visual Composer. Hooked on vc_before_init
	 */
	public function vcMap() {
		if(function_exists('vc_map')) {
			vc_map(
				array(
					'name'                      => esc_html__( 'Animated Switch Slider', 'wilmer-core' ),
					'base'                      => $this->getBase(),
					'category'                  => esc_html__( 'by WILMER', 'wilmer-core' ),
					'icon'                      => 'icon-wpb-animated-switch-slider extended-custom-icon',
                    'allowed_container_element' => 'vc_row',
					'params'                    => array(
                        array(
                            'type'        => 'dropdown',
                            'param_name'  => 'change_header_skin',
                            'heading'     => esc_html__( 'Change Header skin', 'wilmer-core' ),
                            'description' => esc_html__( 'Enable this option if you want header skin to change according to the slide skin', 'wilmer-core' ),
                            'value'       => array_flip(wilmer_mikado_get_yes_no_select_array(false, false))
                        ),
                        array(
                            'type' => 'param_group',
                            'heading' => esc_html__( 'Slider Items', 'wilmer-core' ),
                            'param_name' => 'slider_items',
                            'params' => array(
                                array(
                                    'type'        => 'dropdown',
                                    'param_name'  => 'header_skin',
                                    'heading'     => esc_html__( 'Header Skin', 'wilmer-core' ),
                                    'value'       => array(
                                        esc_html__('Default', 'wilmer-core') => 'default',
                                        esc_html__('Light', 'wilmer-core') => 'light',
                                        esc_html__('Dark', 'wilmer-core')  => 'dark',
                                    )
                                ),
                            	array(
                            		'type'        => 'dropdown',
                            		'param_name'  => 'item_skin',
                            		'heading'     => esc_html__( 'Item Skin', 'wilmer-core' ),
                            		'value'       => array(
                            			esc_html__( 'Dark', 'wilmer-core' )     => 'dark',
                                        esc_html__( 'Light', 'wilmer-core' )	 => 'light',
                            		),
                                    'admin_label' => true
                            	),
                                array(
                                    'type'        => 'colorpicker',
                                    'param_name'  => 'background_color',
                                    'heading'     => esc_html__( 'Background Color', 'wilmer-core' ),
                                ),
                            	array(
                            	    'type'        => 'attach_image',
                            	    'param_name'  => 'background_image',
                            	    'heading'     => esc_html__( 'Background Image', 'wilmer-core' ),
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
                                    'type'        => 'textfield',
                                    'param_name'  => 'link',
                                    'heading'     => esc_html__( 'Link', 'wilmer-core' ),
                                    'admin_label' => true
                                ),
                                array(
                                    'type'        => 'textfield',
                                    'param_name'  => 'link_text',
                                    'heading'     => esc_html__( 'Link Text', 'wilmer-core' ),
									'dependency'  => array( 'element' => 'link', 'not_empty' => true )
                                ),
                                array(
                                    'type'        => 'dropdown',
                                    'param_name'  => 'link_skin',
                                    'heading'     => esc_html__( 'Button Skin', 'wilmer-core' ),
									'dependency'  => array( 'element' => 'link', 'not_empty' => true ),
                                    'value'       => array(
                                        esc_html__('Default', 'wilmer-core')  => 'default',
                                        esc_html__('Light', 'wilmer-core') => 'light',
                                        esc_html__('Dark', 'wilmer-core')  => 'dark',
                                    )
                                )
                            )
                        ),
                    )
				)
			);
		}
	}

	/**
	 * Renders shortcodes HTML
	 *
	 * @param $atts array of shortcode params
	 * @param $content string shortcode content
	 * @return string
	 */
	public function render($atts, $content = null) {
		$args = array(
		    'change_header_skin' => 'no',
            'slider_items' => '',
		);
		
		$params = shortcode_atts($args, $atts);
        $params['content'] = $content;
        $params['slider_items'] = json_decode(urldecode($params['slider_items']), true);

		$html = wilmer_core_get_shortcode_module_template_part('templates/animated-switch-slider-template', 'animated-switch-slider', '', $params);
		
		return $html;
	}
}