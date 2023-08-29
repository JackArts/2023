<?php
class WilmerCoreElementorAnimatedSwitchSlider extends \Elementor\Widget_Base {

	public function get_name() {
		return 'mkdf_animated_switch_slider'; 
	}

	public function get_title() {
		return esc_html__( 'Animated Switch Slider', 'wilmer-core' );
	}

	public function get_icon() {
		return 'wilmer-elementor-custom-icon wilmer-elementor-animated-switch-slider';
	}

	public function get_categories() {
		return [ 'mikado' ];
	}

	protected function _register_controls() {

		$this->start_controls_section(
			'general',
			[
				'label' => esc_html__( 'General', 'wilmer-core' ),
				'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
			]
		);
		$this->add_control(
			'change_header_skin',
			[
				'label'     => esc_html__( 'Change Header skin', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'description' => esc_html__( 'Enable this option if you want header skin to change according to the slide skin', 'wilmer-core' ),
				'options' => array(
					'no' => esc_html__( 'No', 'wilmer-core'), 
					'yes' => esc_html__( 'Yes', 'wilmer-core')
				),
				'default' => 'no'
			]
		);

		$repeater = new \Elementor\Repeater();

		$repeater->add_control(
			'header_skin',
			[
				'label'     => esc_html__( 'Header Skin', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'default' => esc_html__( 'Default', 'wilmer-core'), 
					'light' => esc_html__( 'Light', 'wilmer-core'), 
					'dark' => esc_html__( 'Dark', 'wilmer-core')
				),
				'default' => 'default'
			]
		);

		$repeater->add_control(
			'item_skin',
			[
				'label'     => esc_html__( 'Item Skin', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'dark' => esc_html__( 'Dark', 'wilmer-core'), 
					'light' => esc_html__( 'Light', 'wilmer-core')
				),
				'default' => 'dark'
			]
		);

		$repeater->add_control(
			'background_color',
			[
				'label'     => esc_html__( 'Background Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR
			]
		);

		$repeater->add_control(
			'background_image',
			[
				'label'     => esc_html__( 'Background Image', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::MEDIA
			]
		);

		$repeater->add_control(
			'centered_text',
			[
				'label'     => esc_html__( 'Centered Text', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$repeater->add_control(
			'centered_text_outline_color',
			[
				'label'     => esc_html__( 'Centered Text Outline Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR
			]
		);

		$repeater->add_control(
			'upper_subtitle',
			[
				'label'     => esc_html__( 'Upper Subtitle', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$repeater->add_control(
			'upper_title',
			[
				'label'     => esc_html__( 'Upper Title', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$repeater->add_control(
			'lower_subtitle',
			[
				'label'     => esc_html__( 'Lower Subtitle', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$repeater->add_control(
			'lower_title',
			[
				'label'     => esc_html__( 'Lower Title', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$repeater->add_control(
			'link',
			[
				'label'     => esc_html__( 'Link', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$repeater->add_control(
			'link_text',
			[
				'label'     => esc_html__( 'Link Text', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'condition' => [
					'link!' => ''
				]
			]
		);

		$repeater->add_control(
			'link_skin',
			[
				'label'     => esc_html__( 'Button Skin', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'default' => esc_html__( 'Default', 'wilmer-core'), 
					'light' => esc_html__( 'Light', 'wilmer-core'), 
					'dark' => esc_html__( 'Dark', 'wilmer-core')
				),
				'default' => 'default',
				'condition' => [
					'link!' => ''
				]
			]
		);

		$this->add_control(
			'slider_items',
			[
				'label'     => esc_html__( 'Slider Items', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::REPEATER,
				'fields'     => $repeater->get_controls(),
				'title_field'     => esc_html__( 'Item', 'wilmer-core' )
			]
		);


		$this->end_controls_section();
	}
	public function render() {

		$params = $this->get_settings_for_display();

        for ($i = 0; $i < count($params['slider_items']); $i++) {
            $params['slider_items'][$i]['background_image'] =  $params['slider_items'][$i]['background_image']['id'];
        }

        echo wilmer_core_get_shortcode_module_template_part('templates/animated-switch-slider-template', 'animated-switch-slider', '', $params);

	}

}
\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new WilmerCoreElementorAnimatedSwitchSlider() );