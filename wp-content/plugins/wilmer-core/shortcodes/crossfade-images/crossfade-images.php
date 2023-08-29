<?php
namespace WilmerCore\CPT\Shortcodes\CrossfadeImages;

use WilmerCore\Lib;

class CrossfadeImages implements Lib\ShortcodeInterface {
    /**
     * @var string
     */
	private $base; 
	
    /**
     * CrossfadeImages constructor.
     */
	function __construct() {
		$this->base = 'mkdf_crossfade_images';

		add_action('vc_before_init', array($this, 'vcMap'));
	}
	
	/**
		* Returns base for shortcode
		* @return string
	 */
	public function getBase() {
		return $this->base;
	}	
    
	public function vcMap() {
						
		vc_map( array(
			'name' => 'Crossfade Images',
			'base' => $this->getBase(),
			'category' => esc_html__('by Wilmer', 'wilmer-core'),
			'icon' => 'icon-wpb-crossfade-images extended-custom-icon',
			'params' =>	array(
                array(
                    'type' => 'attach_image',
                    'heading' => esc_html__('Initial Image', 'wilmer-core'),
                    'param_name' => 'initial_image'
                ),
                array(
                    'type' => 'attach_image',
                    'heading' => esc_html__('Hover Image', 'wilmer-core'),
                    'param_name' => 'hover_image'
                ),
                array(
                    'type' => 'textfield',
                    'heading' => esc_html__('Title', 'wilmer-core'),
                    'param_name' => 'title',
                    'admin_label' => true,
                ),
                array(
                    'type'        => 'textfield',
                    'heading'     => esc_html__('Link', 'wilmer-core'),
                    'param_name'  => 'link',
                    'admin_label' => true
                ),
                array(
                    'type'        => 'dropdown',
                    'heading'     => esc_html__('Link target', 'wilmer-core'),
                    'param_name'  => 'link_target',
                    'description' => '',
                    'value'       => array(
                        esc_html__('New Window', 'wilmer-core') => '_blank',
                        esc_html__('Same Window', 'wilmer-core')  => '_self'
                    ),
                    'save_always' => true,
                    'dependency' => array( 'element' => 'link', 'not_empty' => true )
                ),
                array(
                    'type'        => 'colorpicker',
                    'heading'     => esc_html__('Background Color', 'wilmer-core'),
                    'param_name'  => 'background_color',
                    'group'       => 'Design Options'
                ),
            )
		) );

	}

	public function render($atts, $content = null) {
		
		$args = array(
            'initial_image'    => '',
            'hover_image'      => '',
            'title'            => '',
            'link'             => '',
            'link_target'      => '',
            'background_color' => 'transparent',
        );

        $params = shortcode_atts($args, $atts);

        extract($params);

        return wilmer_core_get_shortcode_module_template_part('templates/crossfade-images-template', 'crossfade-images', '', $params);
    }
}