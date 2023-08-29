<?php
namespace WilmerCore\CPT\Shortcodes\Workflow;

use WilmerCore\Lib;

class Workflow implements Lib\ShortcodeInterface {
    private $base;

    function __construct() {
        $this->base = 'mkdf_workflow';
        add_action('vc_before_init', array($this, 'vcMap'));
    }

    public function getBase() {
        return $this->base;
    }

    public function vcMap() {
        if ( function_exists( 'vc_map' ) ) {
            vc_map(
                array(
                    'name'                      => esc_html__('Workflow', 'wilmer-core'),
                    'base'                      => $this->base,
                    'as_parent'                 => array('only' => 'mkdf_workflow_item'),
                    'content_element'           => true,
                    'category'                  => esc_html__('by WILMER', 'wilmer-core'),
                    'icon'                      => 'icon-wpb-workflow extended-custom-icon',
                    'show_settings_on_create'   => true,
                    'js_view'                   => 'VcColumnView',
                    'params' => array(
                            array(
                                'type' => 'textfield',
                                'heading' => esc_html__('Extra class name', 'wilmer-core'),
                                'param_name' => 'custom_clas',
                                'description' => esc_html__('Style particular content element differently - add a class name and refer to it in custom CSS.', 'wilmer-core')
                            ),
                            array(
                                'type' => 'colorpicker',
                                'heading' => esc_html__('Workflow line color', 'wilmer-core'),
                                'param_name' => 'line_color',
                                'description' => esc_html__('Pick a color for the workflow line.', 'wilmer-core')
                            ),
                            array(
                                'type' => 'dropdown',
                                'heading' => esc_html__('Animate Workflow', 'wilmer-core'),
                                'param_name' => 'animate',
                                'value' => array(
                                    esc_html__('Yes', 'wilmer-core') => 'yes',
                                    esc_html__('No', 'wilmer-core') => 'no',
                                ),
                                'description' => esc_html__('Animate Workflow shortcode when it comes into viewport', 'wilmer-core'),
                                'save_always' => true,
                            )
                    )
                )
            );
        }
    }

    public function render($atts, $content = null) {
        $default_atts = (array(
            'custom_clas'     => '',
            'line_color'   => '',
            'circle_color' => '',
            'animate'      => 'yes',
        ));

        $params       = shortcode_atts($default_atts, $atts);
        $style_params = $this->getStyleProperties($params);
        $params       = array_merge($params, $style_params);
        extract($params);

        $params['custom_clas'] = $this->getWorkflowClasses($params);
        $params['content']  = $content;
        $output             = '';

        $output .= wilmer_core_get_shortcode_module_template_part('templates/workflow-holder-template', 'workflow', '', $params);

        return $output;
    }

    private function getWorkflowClasses($params) {

        $custom_clas = '';
        $class    = $params['custom_clas'];

        if($class !== '') {
            $custom_clas = $class;
        }

        if($params['animate'] == 'yes') {
            $custom_clas = 'mkdf-workflow-animate';
        }

        return $custom_clas;
    }

    private function getStyleProperties($params) {

        $style                    = array();
        $style['main_line_style'] = '';

        if($params['line_color'] !== '') {
            $style['main_line_style'] = 'background-color:'.$params['line_color'].';';
        }

        return $style;
    }
}
