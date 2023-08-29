<?php
class WilmerCoreElementorSplitSection extends \Elementor\Widget_Base {

	public function get_name() {
		return 'mkdf_split_section'; 
	}

	public function get_title() {
		return esc_html__( 'Split Section', 'wilmer-core' );
	}

	public function get_icon() {
		return 'wilmer-elementor-custom-icon wilmer-elementor-split-section';
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
			'enable_full_height',
			[
				'label'     => esc_html__( 'Full Height Sections', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'no' => esc_html__( 'No', 'wilmer-core'), 
					'yes' => esc_html__( 'Yes', 'wilmer-core')
				),
				'default' => 'no'
			]
		);

		$this->add_control(
			'skin',
			[
				'label'     => esc_html__( 'Text Skin', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'dark' => esc_html__( 'Dark', 'wilmer-core'), 
					'light' => esc_html__( 'Light', 'wilmer-core')
				),
				'default' => 'dark'
			]
		);

		$this->add_control(
			'image',
			[
				'label'     => esc_html__( 'Image', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::MEDIA
			]
		);

		$this->add_control(
			'image_position',
			[
				'label'     => esc_html__( 'Image Position', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'left' => esc_html__( 'Left', 'wilmer-core'), 
					'right' => esc_html__( 'Right', 'wilmer-core')
				),
				'default' => 'left'
			]
		);

		$this->add_control(
			'content_background',
			[
				'label'     => esc_html__( 'Content Background Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR
			]
		);

		$this->add_control(
			'centered_text',
			[
				'label'     => esc_html__( 'Centered Text', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$this->add_control(
			'centered_text_outline_color',
			[
				'label'     => esc_html__( 'Centered Text Outline Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR
			]
		);

		$this->add_control(
			'upper_subtitle',
			[
				'label'     => esc_html__( 'Upper Subtitle', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$this->add_control(
			'upper_title',
			[
				'label'     => esc_html__( 'Upper Title', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$this->add_control(
			'lower_subtitle',
			[
				'label'     => esc_html__( 'Lower Subtitle', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$this->add_control(
			'lower_title',
			[
				'label'     => esc_html__( 'Lower Title', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$this->add_control(
			'button_text',
			[
				'label'     => esc_html__( 'Button Text', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$this->add_control(
			'breakpoint',
			[
				'label'     => esc_html__( 'Responsive Breakpoint', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'description' => esc_html__( 'Choose on which stage you want to break image and text content to be one under other', 'wilmer-core' ),
				'options' => array(
					'' => esc_html__( 'Never', 'wilmer-core'), 
					'1366' => esc_html__( 'Below 1366px', 'wilmer-core'), 
					'1024' => esc_html__( 'Below 1024px', 'wilmer-core'), 
					'768' => esc_html__( 'Below 768px', 'wilmer-core'), 
					'680' => esc_html__( 'Below 680px', 'wilmer-core'), 
					'480' => esc_html__( 'Below 480px', 'wilmer-core')
				),
				'default' => ''
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'button_style',
			[
				'label' => esc_html__( 'Button Style', 'wilmer-core' ),
				'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
			]
		);
		$this->add_control(
			'button_skin',
			[
				'label'     => esc_html__( 'Button Skin', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'default' => esc_html__( 'Default', 'wilmer-core'), 
					'light' => esc_html__( 'Light', 'wilmer-core'), 
					'dark' => esc_html__( 'Dark', 'wilmer-core')
				),
				'default' => 'default'
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
			'button_target',
			[
				'label'     => esc_html__( 'Button Link Target', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'_self' => esc_html__( 'Same Window', 'wilmer-core'), 
					'_blank' => esc_html__( 'New Window', 'wilmer-core')
				),
				'default' => '_self',
				'condition' => [
					'button_link!' => ''
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

		$params['holder_classes'] = $this->getHolderClasses( $params );
		$params['content_style']  = $this->getContentStyles( $params );
		$params['image_styles']   = $this->getImageBackgroundStyles( $params );
		$params['background_text_style'] = $this->getBackgroundTextStyle( $params );


        echo wilmer_core_get_shortcode_module_template_part( 'templates/split-section', 'split-section', '', $params );

	}

	private function getHolderClasses( $params ) {
		$holderClasses = array();
		
		$holderClasses[] = 'mkdf-ss-image-' . $params['image_position'];
		$holderClasses[] = ! empty( $params['breakpoint'] ) ? 'mkdf-ss-break-' . $params['breakpoint'] : '';
		$holderClasses[] = ! empty( $params['skin'] ) ? 'mkdf-ss-' . $params['skin'] . '-skin' : '';
		$holderClasses[] = $params['enable_full_height'] == 'yes' ? 'mkdf-ss-full-height' : '';

		return implode( ' ', $holderClasses );
	}

	private function getImageBackgroundStyles( $params ) {
		$styles = array();
		
		if ( ! empty( $params['image'] ) ) {
			$image_src = wp_get_attachment_image_src( $params['image'], 'full' );
			
			if ( is_array( $image_src ) ) {
				$image_src = $image_src[0];
			}
			
			$styles[] = 'background-image: url(' . $image_src . ')';
		}
		
		return implode( ';', $styles );
	}

	private function getContentStyles($params) {
		$styles   = array();

		if(!empty($params['content_background'])) {
			$styles[] = 'background-color:'. $params['content_background'];
		}

		return implode( ';', $styles );
	}

	private function getBackgroundTextStyle( $params ) {
		$styles = array();

		if ( ! empty( $params['centered_text_outline_color'] ) ) {
			$styles[] = '-webkit-text-stroke-color: ' . $params['centered_text_outline_color'];
		}

		return implode( ';', $styles );
	}

}
\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new WilmerCoreElementorSplitSection() );