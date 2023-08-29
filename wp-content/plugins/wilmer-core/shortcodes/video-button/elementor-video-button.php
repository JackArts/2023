<?php
class WilmerCoreElementorVideoButton extends \Elementor\Widget_Base {

	public function get_name() {
		return 'mkdf_video_button'; 
	}

	public function get_title() {
		return esc_html__( 'Video Button', 'wilmer-core' );
	}

	public function get_icon() {
		return 'wilmer-elementor-custom-icon wilmer-elementor-video-button';
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
			'custom_class',
			[
				'label'     => esc_html__( 'Custom CSS Class', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'description' => esc_html__( 'Style particular content element differently - add a class name and refer to it in custom CSS', 'wilmer-core' )
			]
		);

		$this->add_control(
			'video_link',
			[
				'label'     => esc_html__( 'Video Link', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$this->add_control(
			'video_image',
			[
				'label'     => esc_html__( 'Video Image', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::MEDIA,
				'description' => esc_html__( 'Select image from media library', 'wilmer-core' )
			]
		);

		$this->add_control(
			'play_button_color',
			[
				'label'     => esc_html__( 'Play Button Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR
			]
		);

		$this->add_control(
			'play_button_size',
			[
				'label'     => esc_html__( 'Play Button Size (px)', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$this->add_control(
			'play_button_image',
			[
				'label'     => esc_html__( 'Play Button Custom Image', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::MEDIA,
				'description' => esc_html__( 'Select image from media library. If you use this field then play button color and button size options will not work', 'wilmer-core' )
			]
		);

		$this->add_control(
			'play_button_hover_image',
			[
				'label'     => esc_html__( 'Play Button Custom Hover Image', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::MEDIA,
				'description' => esc_html__( 'Select image from media library. If you use this field then play button color and button size options will not work', 'wilmer-core' )
			]
		);


		$this->end_controls_section();
	}
	public function render() {

		$params = $this->get_settings_for_display();


        if ( ! empty( $params['video_image'] ) ) {
            $params['video_image'] = $params['video_image']['id'];
        }

        if ( ! empty( $params['play_button_image'] ) ) {
            $params['play_button_image'] = $params['play_button_image']['id'];
        }

        if ( ! empty( $params['play_button_hover_image'] ) ) {
            $params['play_button_hover_image'] = $params['play_button_hover_image']['id'];
        }
		$params['holder_classes']     = $this->getHolderClasses( $params );
		$params['play_button_styles'] = $this->getPlayButtonStyles( $params );

        echo wilmer_core_get_shortcode_module_template_part( 'templates/video-button', 'video-button', '', $params );
	}

	private function getHolderClasses( $params ) {
		$holderClasses = array();
		
		$holderClasses[] = ! empty( $params['custom_class'] ) ? esc_attr( $params['custom_class'] ) : '';
		$holderClasses[] = ! empty( $params['video_image'] ) ? 'mkdf-vb-has-img' : '';
		
		return implode( ' ', $holderClasses );
	}

	private function getPlayButtonStyles( $params ) {
		$styles = array();
		
		if ( ! empty( $params['play_button_color'] ) ) {
			$styles[] = 'color: ' . $params['play_button_color'];
		}
		
		if ( ! empty( $params['play_button_size'] ) ) {
			$styles[] = 'height: ' . wilmer_mikado_filter_px( $params['play_button_size'] ) . 'px';
			$styles[] = 'width: ' . wilmer_mikado_filter_px( $params['play_button_size'] ) . 'px';
		}
		
		return implode( ';', $styles );
	}

}
\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new WilmerCoreElementorVideoButton() );