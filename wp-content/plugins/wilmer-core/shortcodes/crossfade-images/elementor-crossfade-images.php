<?php
class WilmerCoreElementorCrossfadeImages extends \Elementor\Widget_Base {

	public function get_name() {
		return 'mkdf_crossfade_images'; 
	}

	public function get_title() {
		return esc_html__( 'Crossfade Images', 'wilmer-core' );
	}

	public function get_icon() {
		return 'wilmer-elementor-custom-icon wilmer-elementor-crossfade-images';
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
			'initial_image',
			[
				'label'     => esc_html__( 'Initial Image', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::MEDIA
			]
		);

		$this->add_control(
			'hover_image',
			[
				'label'     => esc_html__( 'Hover Image', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::MEDIA
			]
		);

		$this->add_control(
			'title',
			[
				'label'     => esc_html__( 'Title', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$this->add_control(
			'link',
			[
				'label'     => esc_html__( 'Link', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$this->add_control(
			'link_target',
			[
				'label'     => esc_html__( 'Link target', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'_blank' => esc_html__( 'New Window', 'wilmer-core'), 
					'_self' => esc_html__( 'Same Window', 'wilmer-core')
				),
				'default' => '_blank',
				'condition' => [
					'link!' => ''
				]
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'design_options',
			[
				'label' => esc_html__( 'Design Options', 'wilmer-core' ),
				'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
			]
		);
		$this->add_control(
			'background_color',
			[
				'label'     => esc_html__( 'Background Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR
			]
		);


		$this->end_controls_section();
	}
	public function render() {

		$params = $this->get_settings_for_display();

        if ( ! empty( $params['initial_image'] ) ) {
            $params['initial_image'] = $params['initial_image']['id'];
        }

        if ( ! empty( $params['hover_image'] ) ) {
            $params['hover_image'] = $params['hover_image']['id'];
        }

        echo wilmer_core_get_shortcode_module_template_part('templates/crossfade-images-template', 'crossfade-images', '', $params);
	}

}
\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new WilmerCoreElementorCrossfadeImages() );