<?php
class WilmerCoreElementorTestimonials extends \Elementor\Widget_Base {

	public function get_name() {
		return 'mkdf_testimonials'; 
	}

	public function get_title() {
		return esc_html__( 'Testimonials', 'wilmer-core' );
	}

	public function get_icon() {
		return 'wilmer-elementor-custom-icon wilmer-elementor-testimonials';
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
			'type',
			[
				'label'     => esc_html__( 'Type', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'standard' => esc_html__( 'Standard', 'wilmer-core'), 
					'vertical-scroll' => esc_html__( 'Vertical Scroll', 'wilmer-core')
				),
				'default' => 'standard'
			]
		);

		$this->add_control(
			'skin',
			[
				'label'     => esc_html__( 'Skin', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'' => esc_html__( 'Default', 'wilmer-core'), 
					'light' => esc_html__( 'Light', 'wilmer-core')
				),
				'default' => ''
			]
		);

		$this->add_control(
			'number',
			[
				'label'     => esc_html__( 'Number of Testimonials', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
                'default'   => -1
			]
		);

		$this->add_control(
			'category',
			[
				'label'     => esc_html__( 'Category', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'description' => esc_html__( 'Enter one category slug (leave empty for showing all categories)', 'wilmer-core' )
			]
		);

		$this->add_control(
			'box_color',
			[
				'label'     => esc_html__( 'Content Box Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'condition' => [
					'type' => array( 'boxed' )
				]
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'slider_settings',
			[
				'label' => esc_html__( 'Slider Settings', 'wilmer-core' ),
				'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
			]
		);
		$this->add_control(
			'number_of_visible_items',
			[
				'label'     => esc_html__( 'Number Of Visible Items', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'1' => esc_html__( 'One', 'wilmer-core'), 
					'2' => esc_html__( 'Two', 'wilmer-core'), 
					'3' => esc_html__( 'Three', 'wilmer-core'), 
					'4' => esc_html__( 'Four', 'wilmer-core'), 
					'5' => esc_html__( 'Five', 'wilmer-core'), 
					'6' => esc_html__( 'Six', 'wilmer-core')
				),
				'default' => '3',
				'condition' => [
					'type' => array( 'boxed', 'boxed-text' )
				]
			]
		);

		$this->add_control(
			'slider_loop',
			[
				'label'     => esc_html__( 'Enable Slider Loop', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'yes' => esc_html__( 'Yes', 'wilmer-core'), 
					'no' => esc_html__( 'No', 'wilmer-core')
				),
				'default' => 'yes'
			]
		);

		$this->add_control(
			'slider_autoplay',
			[
				'label'     => esc_html__( 'Enable Slider Autoplay', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'yes' => esc_html__( 'Yes', 'wilmer-core'), 
					'no' => esc_html__( 'No', 'wilmer-core')
				),
				'default' => 'yes'
			]
		);

		$this->add_control(
			'slider_speed',
			[
				'label'     => esc_html__( 'Slide Duration', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'description' => esc_html__( 'Default value is 5000 (ms)', 'wilmer-core' ),
                'default'   => 5000
			]
		);

		$this->add_control(
			'slider_speed_animation',
			[
				'label'     => esc_html__( 'Slide Animation Duration', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'description' => esc_html__( 'Speed of slide animation in milliseconds. Default value is 600.', 'wilmer-core' ),
                'default'   => 600
			]
		);

		$this->add_control(
			'slider_navigation',
			[
				'label'     => esc_html__( 'Enable Slider Navigation Arrows', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'yes' => esc_html__( 'Yes', 'wilmer-core'), 
					'no' => esc_html__( 'No', 'wilmer-core')
				),
				'default' => 'yes'
			]
		);

		$this->add_control(
			'slider_pagination',
			[
				'label'     => esc_html__( 'Enable Slider Pagination', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'yes' => esc_html__( 'Yes', 'wilmer-core'), 
					'no' => esc_html__( 'No', 'wilmer-core')
				),
				'default' => 'yes'
			]
		);


		$this->end_controls_section();
	}
	public function render() {

		$params = $this->get_settings_for_display();
		
		$params['type'] = ! empty( $params['type'] ) ? $params['type'] : 'standard';
		$params['number_of_visible_items'] = ! empty( $params['number_of_visible_items'] ) ? $params['number_of_visible_items'] : '3';

		$params['holder_classes'] = $this->getHolderClasses( $params );

		$params['query_args']    = $this->getQueryParams( $params );
		$params['query_results'] = new \WP_Query( $params['query_args'] );
		
		$params['box_styles'] = $this->getBoxStyles( $params );
		$params['data_attr'] = $this->getSliderData( $params );

        echo wilmer_core_get_cpt_shortcode_module_template_part( 'testimonials', 'testimonials', 'testimonials-' . $params['type'], '', $params );

	}

	private function getHolderClasses( $params ) {
		$holderClasses = array();
		
		$holderClasses[] = 'mkdf-testimonials-' . $params['type'];
		$holderClasses[] = ! empty( $params['skin'] ) ? 'mkdf-testimonials-' . $params['skin'] : '';
		
		return implode( ' ', $holderClasses );
	}

	private function getQueryParams( $params ) {
		$args = array(
			'post_status'    => 'publish',
			'post_type'      => 'testimonials',
			'orderby'        => 'date',
			'order'          => 'DESC',
			'posts_per_page' => $params['number']
		);
		
		if ( $params['category'] != '' ) {
			$args['testimonials-category'] = $params['category'];
		}
		
		return $args;
	}

	public function getBoxStyles( $params ) {
		$styles = array();
		
		if ( $params['type'] === 'boxed' && ! empty( $params['box_color'] ) ) {
			$styles[] = 'background-color: ' . $params['box_color'];
		}
		
		return $styles;
	}

	private function getSliderData( $params ) {
		$slider_data = array();
		
		$slider_data['data-number-of-items']        = ! empty( $params['number_of_visible_items'] ) && in_array($params['type'], array('standard')) ? '2' : '1';
		$slider_data['data-enable-loop']            = ! empty( $params['slider_loop'] ) ? $params['slider_loop'] : '';
		$slider_data['data-enable-autoplay']        = ! empty( $params['slider_autoplay'] ) ? $params['slider_autoplay'] : '';
		$slider_data['data-slider-speed']           = ! empty( $params['slider_speed'] ) ? $params['slider_speed'] : '5000';
		$slider_data['data-slider-speed-animation'] = ! empty( $params['slider_speed_animation'] ) ? $params['slider_speed_animation'] : '600';
		$slider_data['data-enable-navigation']      = ! empty( $params['slider_navigation'] ) ? $params['slider_navigation'] : '';
		$slider_data['data-enable-pagination']      = ! empty( $params['slider_pagination'] ) ? $params['slider_pagination'] : '';
		$slider_data['data-slider-margin']          = in_array($params['type'], array('standard')) ? 30 : '';

		return $slider_data;
	}

}
\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new WilmerCoreElementorTestimonials() );