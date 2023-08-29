<?php

namespace WilmerInstagram\Shortcodes\InstagramList;

use WilmerInstagram\Lib;


class InstagramList implements Lib\ShortcodeInterface
{
    private $base;

    public function __construct()
    {
        $this->base = 'mkdf_instagram_list';

        add_action('vc_before_init', array($this, 'vcMap'));
    }

    public function getBase()
    {
        return $this->base;
    }

    public function vcMap()
    {
        if (function_exists('vc_map')) {
            vc_map(
                array(
                    'name' => esc_html__('Mikado Instagram List', 'wilmer-instagram-feed'),
                    'base' => $this->base,
                    'category' => esc_html__('by WILMER', 'wilmer-instagram-feed'),
                    'icon' => 'icon-wpb-instagram-list extended-custom-icon',
                    'allowed_container_element' => 'vc_row',
                    'params' => array(
                        array(
                            'type' => 'dropdown',
                            'param_name' => 'number_of_columns',
                            'heading' => esc_html__('Number of Columns', 'wilmer-instagram-feed'),
                            'value' => array_flip(wilmer_mikado_get_number_of_columns_array(false, array('one', 'six'))),
                            'save_always' => true
                        ),
                        array(
                            'param_name' => 'type',
                            'type' => 'dropdown',
                            'heading' => esc_html__('Type', 'wilmer-instagram-feed'),
                            'value' => array(
                                esc_html__( 'Gallery', 'wilmer-instagram-feed') => 'gallery',
                                esc_html__( 'Carousel', 'wilmer-instagram-feed') => 'carousel'
                            )
                        ),
                        array(
                            'param_name' => 'space_between_columns',
                            'type' => 'dropdown',
                            'heading' => esc_html__('Space Between Items', 'wilmer-instagram-feed'),
                            'value' => array_flip(wilmer_mikado_get_space_between_items_array())
                        ),
                        array(
                            'type' => 'textfield',
                            'param_name' => 'number_of_photos',
                            'heading' => esc_html__('Number of Photos', 'wilmer-instagram-feed')
                        ),
                        array(
                            'type' => 'textfield',
                            'param_name' => 'transient_time',
                            'heading' => esc_html__('Images Cache Time', 'wilmer-instagram-feed'),
	                        'value' => '10800',
	                        'save_always' => true,
                        ),
                        array(
                            'param_name' => 'show_instagram_icon',
                            'type' => 'dropdown',
                            'heading' => esc_html__('Show Instagram Icon', 'wilmer-instagram-feed'),
                            'value' => array_flip(wilmer_mikado_get_yes_no_select_array(false)),
                        ),
                        array(
                            'type' => 'dropdown',
                            'param_name' => 'slider_loop',
                            'heading' => esc_html__('Enable Slider Loop', 'wilmer-instagram-feed'),
                            'value' => array_flip(wilmer_mikado_get_yes_no_select_array(false, true)),
                            'save_always' => true,
                            'group' => esc_html__('Slider Settings', 'wilmer-instagram-feed')
                        ),
                        array(
                            'type' => 'dropdown',
                            'param_name' => 'slider_autoplay',
                            'heading' => esc_html__('Enable Slider Autoplay', 'wilmer-instagram-feed'),
                            'value' => array_flip(wilmer_mikado_get_yes_no_select_array(false, true)),
                            'save_always' => true,
                            'group' => esc_html__('Slider Settings', 'wilmer-instagram-feed')
                        ),
                        array(
                            'type' => 'textfield',
                            'param_name' => 'slider_speed',
                            'heading' => esc_html__('Slide Duration', 'wilmer-instagram-feed'),
                            'description' => esc_html__('Default value is 5000 (ms)', 'wilmer-instagram-feed'),
                            'group' => esc_html__('Slider Settings', 'wilmer-instagram-feed')
                        ),
                        array(
                            'type' => 'textfield',
                            'param_name' => 'slider_speed_animation',
                            'heading' => esc_html__('Slide Animation Duration', 'wilmer-instagram-feed'),
                            'description' => esc_html__('Speed of slide animation in milliseconds. Default value is 600.', 'wilmer-instagram-feed'),
                            'group' => esc_html__('Slider Settings', 'wilmer-instagram-feed')
                        ),
                        array(
                            'type' => 'dropdown',
                            'param_name' => 'slider_navigation',
                            'heading' => esc_html__('Enable Slider Navigation Arrows', 'wilmer-instagram-feed'),
                            'value' => array_flip(wilmer_mikado_get_yes_no_select_array(false, true)),
                            'save_always' => true,
                            'group' => esc_html__('Slider Settings', 'wilmer-instagram-feed')
                        ),
                        array(
                            'type' => 'dropdown',
                            'param_name' => 'slider_pagination',
                            'heading' => esc_html__('Enable Slider Pagination', 'wilmer-instagram-feed'),
                            'value' => array_flip(wilmer_mikado_get_yes_no_select_array(false, false)),
                            'save_always' => true,
                            'group' => esc_html__('Slider Settings', 'wilmer-instagram-feed')
                        )
                    )
                )
            );
        }
    }

    public function render($atts, $content = null)
    {
        $args = array(
            'number_of_columns' => '3',
            'space_between_columns' => 'normal',
            'number_of_photos' => '',
            'transient_time' => '',
            'show_instagram_icon' => 'no',
            'type' => 'gallery',
            'slider_loop' => 'yes',
            'slider_autoplay' => 'yes',
            'slider_speed' => '5000',
            'slider_speed_animation' => '600',
            'slider_navigation' => 'yes',
            'slider_pagination' => 'no'
        );
        $params = shortcode_atts($args, $atts);
        extract($params);

        $params['holder_classes'] = $this->getHolderClasses($params);
        $params['carousel_classes'] = $this->getCarouselClasses($params);

        $instagram_api = new \WilmerInstagramApi();
        $params['instagram_api'] = $instagram_api;

        $images_array = $instagram_api->getImages($params['number_of_photos'], array(
            'use_transients' => true,
            'transient_name' => '_wilmer_instagram_api_transient_name',
            'transient_time' => $params['transient_time']
        ));

        $params['images_array'] = $images_array;
        $params['data_attr'] = $this->getSliderData($params);

        //Get HTML from template based on type of team
        $html = wilmer_instagram_get_shortcode_module_template_part('templates/holder', 'instagram-list', '', $params);

        return $html;
    }

    public function getHolderClasses($params)
    {
        $holderClasses = array();

        $holderClasses[] = 'mkdf-grid-list';
	    $holderClasses[] = 'mkdf-' . $params['number_of_columns'] . '-columns';
        $holderClasses[] = !empty($params['space_between_columns']) ? 'mkdf-' . $params['space_between_columns'] . '-space' : 'mkdf-il-normal-space';

        return implode(' ', $holderClasses);
    }


    public function getCarouselClasses($params)
    {
        $carouselClasses = array();

        if ($params['type'] === 'carousel') {
            $carouselClasses = 'mkdf-instagram-carousel mkdf-owl-slider mkdf-list-is-slider';

        } else if ($params['type'] == 'gallery') {
            $carouselClasses = 'mkdf-instagram-gallery';
        }

        return $carouselClasses;
    }

    private function getSliderData($params)
    {
    	if( $params['type'] === 'gallery' ) {
    		return;
	    }

        $slider_data = array();

        $slider_data['data-number-of-columns'] = $params['number_of_columns'];
        $slider_data['data-number-of-items'] = $params['number_of_photos'];
        $slider_data['data-enable-loop'] = !empty($params['slider_loop']) ? $params['slider_loop'] : '';
        $slider_data['data-enable-autoplay'] = !empty($params['slider_autoplay']) ? $params['slider_autoplay'] : '';
        $slider_data['data-slider-speed'] = !empty($params['slider_speed']) ? $params['slider_speed'] : '5000';
        $slider_data['data-slider-speed-animation'] = !empty($params['slider_speed_animation']) ? $params['slider_speed_animation'] : '600';
        $slider_data['data-enable-navigation'] = !empty($params['slider_navigation']) ? $params['slider_navigation'] : '';
        $slider_data['data-enable-pagination'] = !empty($params['slider_pagination']) ? $params['slider_pagination'] : '';

        return $slider_data;
    }
}