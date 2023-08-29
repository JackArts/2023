<?php
class WilmerCoreElementorImageMarquee extends \Elementor\Widget_Base {

	public function get_name() {
		return 'mkdf_image_marquee'; 
	}

	public function get_title() {
		return esc_html__( 'Image Marquee', 'wilmer-core' );
	}

	public function get_icon() {
		return 'wilmer-elementor-custom-icon wilmer-elementor-image-marquee';
	}

	public function get_categories() {
		return [ 'mikado' ];
	}

	protected function _register_controls() {

		$this->start_controls_section(
			'marquee_options',
			[
				'label' => esc_html__( 'Marquee Options', 'wilmer-core' ),
				'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
			]
		);
		$this->add_control(
			'marquee_type',
			[
				'label'     => esc_html__( 'Marquee Type', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'simple' => esc_html__( 'Simple', 'wilmer-core'), 
					'with-content' => esc_html__( 'With Content', 'wilmer-core')
				),
				'default' => 'simple'
			]
		);

		$this->add_control(
			'marquee_layout',
			[
				'label'     => esc_html__( 'Marquee Layout', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'default' => esc_html__( 'Default', 'wilmer-core'), 
					'full-height' => esc_html__( 'Full Height', 'wilmer-core')
				),
				'default' => 'default'
			]
		);

		$this->add_control(
			'marquee_image',
			[
				'label'     => esc_html__( 'Marquee Image', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::MEDIA,
				'description' => esc_html__( 'Select image from media library', 'wilmer-core' )
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'content_options',
			[
				'label' => esc_html__( 'Content Options', 'wilmer-core' ),
				'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
			]
		);
		$this->add_control(
			'content_image',
			[
				'label'     => esc_html__( 'Content Image', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::MEDIA,
				'description' => esc_html__( 'Select image from media library', 'wilmer-core' ),
				'condition' => [
					'marquee_type' => array( 'with-content' )
				]
			]
		);

		$this->add_control(
			'bold_title',
			[
				'label'     => esc_html__( 'Bold Title', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'condition' => [
					'marquee_type' => array( 'with-content' )
				]
			]
		);

		$this->add_control(
			'regular_title',
			[
				'label'     => esc_html__( 'Regular Title', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'condition' => [
					'marquee_type' => array( 'with-content' )
				]
			]
		);

		$this->add_control(
			'titles_color',
			[
				'label'     => esc_html__( 'Titles Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'condition' => [
					'marquee_type' => array( 'with-content' )
				]
			]
		);

		$this->add_control(
			'button_text',
			[
				'label'     => esc_html__( 'Button Text', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'condition' => [
					'marquee_type' => array( 'with-content' )
				]
			]
		);

		$this->add_control(
			'button_link',
			[
				'label'     => esc_html__( 'Button Link', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'condition' => [
					'button_text!' => ''
				]
			]
		);

		$this->add_control(
			'button_color',
			[
				'label'     => esc_html__( 'Button Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'condition' => [
					'button_text!' => ''
				]
			]
		);

		$this->add_control(
			'button_background_color',
			[
				'label'     => esc_html__( 'Button Background Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'condition' => [
					'button_text!' => ''
				]
			]
		);


		$this->end_controls_section();
	}
	public function render() {

		$params = $this->get_settings_for_display();

        if ( ! empty( $params['marquee_image'] ) ) {
            $params['marquee_image'] = $params['marquee_image']['id'];
        }

        if ( ! empty( $params['content_image'] ) ) {
            $params['content_image'] = $params['content_image']['id'];
        }

		$params['holder_classes'] 	= $this->getHolderClasses( $params );
		$params['titles_color']		= $this->getTitlesStyles( $params );
		$params['button_params']	= $this->getButtonParameters( $params );

        echo wilmer_core_get_shortcode_module_template_part( 'templates/image-marquee-template', 'image-marquee', '', $params );

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
\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new WilmerCoreElementorImageMarquee() );