<?php
class WilmerCoreElementorImageWithText extends \Elementor\Widget_Base {

	public function get_name() {
		return 'mkdf_image_with_text'; 
	}

	public function get_title() {
		return esc_html__( 'Image With Text', 'wilmer-core' );
	}

	public function get_icon() {
		return 'wilmer-elementor-custom-icon wilmer-elementor-image-with-text';
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
            'type',
            [
                'label'     => esc_html__( 'Type', 'wilmer-core' ),
                'type'      => \Elementor\Controls_Manager::SELECT,
                'options' => array(
                    'standard'       => esc_html__( 'Standard', 'wilmer-core'),
                    'links-on-hover' => esc_html__( 'Links On Hover', 'wilmer-core')
                ),
                'default' => 'standard'
            ]
        );
		$this->add_control(
			'image',
			[
				'label'     => esc_html__( 'Image', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::MEDIA,
				'description' => esc_html__( 'Select image from media library', 'wilmer-core' )
			]
		);

		$this->add_control(
			'image_size',
			[
				'label'     => esc_html__( 'Image Size', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'description' => esc_html__( 'Enter image size. Example: thumbnail, medium, large, full or other sizes defined by current theme. Alternatively enter image size in pixels: 200x100 (Width x Height). Leave empty to use &quot;thumbnail&quot; size', 'wilmer-core' )
			]
		);

		$this->add_control(
			'enable_image_shadow',
			[
				'label'     => esc_html__( 'Enable Image Shadow', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'no' => esc_html__( 'No', 'wilmer-core'), 
					'yes' => esc_html__( 'Yes', 'wilmer-core')
				),
				'default' => 'no'
			]
		);

		$this->add_control(
			'image_behavior',
			[
				'label'     => esc_html__( 'Image Behavior', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'' => esc_html__( 'None', 'wilmer-core'), 
					'lightbox' => esc_html__( 'Open Lightbox', 'wilmer-core'), 
					'custom-link' => esc_html__( 'Open Custom Link', 'wilmer-core'), 
					'zoom' => esc_html__( 'Zoom', 'wilmer-core'), 
					'grayscale' => esc_html__( 'Grayscale', 'wilmer-core')
				),
				'default' => ''
			]
		);

		$this->add_control(
			'custom_link',
			[
				'label'     => esc_html__( 'Custom Link', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'condition' => [
					'image_behavior' => array( 'custom-link' )
				]
			]
		);

		$this->add_control(
			'custom_link_target',
			[
				'label'     => esc_html__( 'Custom Link Target', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'_self' => esc_html__( 'Same Window', 'wilmer-core'), 
					'_blank' => esc_html__( 'New Window', 'wilmer-core')
				),
				'default' => '_self',
				'condition' => [
					'image_behavior' => array( 'custom-link' )
				]
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
			'title_tag',
			[
				'label'     => esc_html__( 'Title Tag', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'' => esc_html__( 'Default', 'wilmer-core'), 
					'h1' => esc_html__( 'h1', 'wilmer-core'), 
					'h2' => esc_html__( 'h2', 'wilmer-core'), 
					'h3' => esc_html__( 'h3', 'wilmer-core'), 
					'h4' => esc_html__( 'h4', 'wilmer-core'), 
					'h5' => esc_html__( 'h5', 'wilmer-core'), 
					'h6' => esc_html__( 'h6', 'wilmer-core')
				),
				'default' => 'h4',
				'condition' => [
					'title!' => ''
				]
			]
		);

		$this->add_control(
			'title_color',
			[
				'label'     => esc_html__( 'Title Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'condition' => [
					'title!' => ''
				]
			]
		);

		$this->add_control(
			'title_top_margin',
			[
				'label'     => esc_html__( 'Title Top Margin (px)', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'condition' => [
					'title!' => ''
				]
			]
		);

		$this->add_control(
			'text',
			[
				'label'     => esc_html__( 'Text', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXTAREA
			]
		);

		$this->add_control(
			'text_color',
			[
				'label'     => esc_html__( 'Text Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'condition' => [
					'text!' => ''
				]
			]
		);

		$this->add_control(
			'text_top_margin',
			[
				'label'     => esc_html__( 'Text Top Margin (px)', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'condition' => [
					'text!' => ''
				]
			]
		);

        $this->add_control(
            'custom_link_1',
            [
                'label'     => esc_html__( 'Custom Link 1', 'wilmer-core' ),
                'type'      => \Elementor\Controls_Manager::TEXT,
                'condition' => [
                    'type' => 'links-on-hover'
                ]
            ]
        );

        $this->add_control(
            'custom_link_1_text',
            [
                'label'     => esc_html__( 'Custom Link 1 Text', 'wilmer-core' ),
                'type'      => \Elementor\Controls_Manager::TEXT,
                'condition' => [
                    'custom_link_1!' => ''
                ]
            ]
        );
        $this->add_control(
            'custom_link_1_target',
            [
                'label'     => esc_html__( 'Custom Link 1 Target', 'wilmer-core' ),
                'type'      => \Elementor\Controls_Manager::SELECT,
                'options' => array(
                    '_self' => esc_html__( 'Same Window', 'wilmer-core'),
                    '_blank' => esc_html__( 'New Window', 'wilmer-core')
                ),
                'default' => '_self',
                'condition' => [
                    'custom_link_1!' => ''
                ]
            ]
        );
        $this->add_control(
            'custom_link_2',
            [
                'label'     => esc_html__( 'Custom Link 2', 'wilmer-core' ),
                'type'      => \Elementor\Controls_Manager::TEXT,
                'condition' => [
                    'type' => 'links-on-hover'
                ]
            ]
        );

        $this->add_control(
            'custom_link_2_text',
            [
                'label'     => esc_html__( 'Custom Link 2 Text', 'wilmer-core' ),
                'type'      => \Elementor\Controls_Manager::TEXT,
                'condition' => [
                    'custom_link_2!' => ''
                ]
            ]
        );
        $this->add_control(
            'custom_link_2_target',
            [
                'label'     => esc_html__( 'Custom Link 2 Target', 'wilmer-core' ),
                'type'      => \Elementor\Controls_Manager::SELECT,
                'options' => array(
                    '_self' => esc_html__( 'Same Window', 'wilmer-core'),
                    '_blank' => esc_html__( 'New Window', 'wilmer-core')
                ),
                'default' => '_self',
                'condition' => [
                    'custom_link_2!' => ''
                ]
            ]
        );

		$this->end_controls_section();
	}
	public function render() {

		$params = $this->get_settings_for_display();

        if ( ! empty( $params['image'] ) ) {
            $params['image'] = $params['image']['id'];
        }

		
		$params['holder_classes']     = $this->getHolderClasses( $params );
		$params['image']              = $this->getImage( $params );
		$params['image_size']         = $this->getImageSize( $params['image_size'] );
		$params['title_styles']       = $this->getTitleStyles( $params );
		$params['text_styles']        = $this->getTextStyles( $params );

        echo wilmer_core_get_shortcode_module_template_part( 'templates/image-with-text', 'image-with-text', '', $params );

	}

	private function getHolderClasses( $params ) {
		$holderClasses = array();
		
		$holderClasses[] = ! empty( $params['custom_class'] ) ? esc_attr( $params['custom_class'] ) : '';
		$holderClasses[] = $params['enable_image_shadow'] === 'yes' ? 'mkdf-has-shadow' : '';
		$holderClasses[] = ! empty( $params['image_behavior'] ) ? 'mkdf-image-behavior-' . $params['image_behavior'] : '';
        $holderClasses[] = ! empty( $params['type'] ) ? 'mkdf-type-' . $params['type'] : '';

		return implode( ' ', $holderClasses );
	}

	private function getImage( $params ) {
		$image = array();
		
		if ( ! empty( $params['image'] ) ) {
			$id = $params['image'];
			
			$image['image_id'] = $id;
			$image_original    = wp_get_attachment_image_src( $id, 'full' );
			$image['url']      = $image_original[0];
			$image['alt']      = get_post_meta( $id, '_wp_attachment_image_alt', true );
		}
		
		return $image;
	}

	private function getImageSize( $image_size ) {
		$image_size = trim( $image_size );
		//Find digits
		preg_match_all( '/\d+/', $image_size, $matches );
		if ( in_array( $image_size, array( 'thumbnail', 'thumb', 'medium', 'large', 'full' ) ) ) {
			return $image_size;
		} elseif ( ! empty( $matches[0] ) ) {
			return array(
				$matches[0][0],
				$matches[0][1]
			);
		} else {
			return 'thumbnail';
		}
	}

	private function getTitleStyles( $params ) {
		$styles = array();
		
		if ( ! empty( $params['title_color'] ) ) {
			$styles[] = 'color: ' . $params['title_color'];
		}
		
		if ( $params['title_top_margin'] !== '' ) {
			$styles[] = 'margin-top: ' . wilmer_mikado_filter_px( $params['title_top_margin'] ) . 'px';
		}
		
		return implode( ';', $styles );
	}

	private function getTextStyles( $params ) {
		$styles = array();
		
		if ( ! empty( $params['text_color'] ) ) {
			$styles[] = 'color: ' . $params['text_color'];
		}
		
		if ( $params['text_top_margin'] !== '' ) {
			$styles[] = 'margin-top: ' . wilmer_mikado_filter_px( $params['text_top_margin'] ) . 'px';
		}
		
		return implode( ';', $styles );
	}

}
\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new WilmerCoreElementorImageWithText() );