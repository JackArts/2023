<?php
class WilmerCoreElementorTripleFrameImageHighlight extends \Elementor\Widget_Base {

	public function get_name() {
		return 'mkdf_triple_frame_image_highlight'; 
	}

	public function get_title() {
		return esc_html__( 'Triple Frame Image Highlight', 'wilmer-core' );
	}

	public function get_icon() {
		return 'wilmer-elementor-custom-icon wilmer-elementor-triple-frame-image-highlight';
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
			'enable_frame',
			[
				'label'     => esc_html__( 'Enable Frame', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'no' => esc_html__( 'No', 'wilmer-core'), 
					'yes' => esc_html__( 'Yes', 'wilmer-core')
				),
				'default' => 'no'
			]
		);

		$this->add_control(
			'centered_image',
			[
				'label'     => esc_html__( 'Centered Image', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::MEDIA
			]
		);

		$this->add_control(
			'centered_image_link',
			[
				'label'     => esc_html__( 'Centered Image Link', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$this->add_control(
			'left_image',
			[
				'label'     => esc_html__( 'Left Image', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::MEDIA
			]
		);

		$this->add_control(
			'left_image_link',
			[
				'label'     => esc_html__( 'Left Image Link', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$this->add_control(
			'right_image',
			[
				'label'     => esc_html__( 'Right Image', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::MEDIA
			]
		);

		$this->add_control(
			'right_image_link',
			[
				'label'     => esc_html__( 'Right Image Link', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$this->add_control(
			'enable_navigation',
			[
				'label'     => esc_html__( 'Enable Navigation', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'no' => esc_html__( 'No', 'wilmer-core'), 
					'yes' => esc_html__( 'Yes', 'wilmer-core')
				),
				'default' => 'no'
			]
		);

		$this->add_control(
			'link_target',
			[
				'label'     => esc_html__( 'Link Target', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'_self' => esc_html__( 'Same Window', 'wilmer-core'), 
					'_blank' => esc_html__( 'New Window', 'wilmer-core')
				),
				'default' => '_self'
			]
		);


		$this->end_controls_section();
	}
	public function render() {

		$params = $this->get_settings_for_display();

        if ( ! empty( $params['centered_image'] ) ) {
            $params['centered_image'] = $params['centered_image']['id'];
        }
        if ( ! empty( $params['left_image'] ) ) {
            $params['left_image'] = $params['left_image']['id'];
        }
        if ( ! empty( $params['right_image'] ) ) {
            $params['right_image'] = $params['right_image']['id'];
        }

        $params['holder_classes'] = $this->getHolderClasses( $params );

        echo  wilmer_core_get_shortcode_module_template_part('templates/triple-frame-image-highlight-template', 'triple-frame-image-highlight', '', $params);

	}

    private function getHolderClasses( $params ) {
		$holderClasses = array();

		$holderClasses[] = ($params['enable_frame'] == 'yes') ? 'mkdf-tfih-with-frame' : '';
		$holderClasses[] = !empty($params['layout']) ? 'mkdf-tfih-'.$params['layout'] : '';
		$holderClasses[] = ($params['enable_navigation'] == 'yes') ? 'mkdf-tfih-with-nav' : '';
		
		return implode( ' ', $holderClasses );
    }

}
\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new WilmerCoreElementorTripleFrameImageHighlight() );