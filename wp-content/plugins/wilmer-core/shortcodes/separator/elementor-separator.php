<?php
class WilmerCoreElementorSeparator extends \Elementor\Widget_Base {

	public function get_name() {
		return 'mkdf_separator'; 
	}

	public function get_title() {
		return esc_html__( 'Separator', 'wilmer-core' );
	}

	public function get_icon() {
		return 'wilmer-elementor-custom-icon wilmer-elementor-separator';
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
					'normal' => esc_html__( 'Normal', 'wilmer-core'), 
					'full-width' => esc_html__( 'Full Width', 'wilmer-core')
				),
				'default' => 'normal'
			]
		);

		$this->add_control(
			'position',
			[
				'label'     => esc_html__( 'Position', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'center' => esc_html__( 'Center', 'wilmer-core'), 
					'left' => esc_html__( 'Left', 'wilmer-core'), 
					'right' => esc_html__( 'Right', 'wilmer-core')
				),
				'default' => 'center',
				'condition' => [
					'type' => array( 'normal' )
				]
			]
		);

		$this->add_control(
			'color',
			[
				'label'     => esc_html__( 'Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR
			]
		);

		$this->add_control(
			'border_style',
			[
				'label'     => esc_html__( 'Style', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'' => esc_html__( 'Default', 'wilmer-core'), 
					'dashed' => esc_html__( 'Dashed', 'wilmer-core'), 
					'solid' => esc_html__( 'Solid', 'wilmer-core'), 
					'dotted' => esc_html__( 'Dotted', 'wilmer-core')
				),
				'default' => ''
			]
		);

		$this->add_control(
			'width',
			[
				'label'     => esc_html__( 'Width (px or %)', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'condition' => [
					'type' => array( 'normal' )
				]
			]
		);

		$this->add_control(
			'thickness',
			[
				'label'     => esc_html__( 'Thickness (px)', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$this->add_control(
			'top_margin',
			[
				'label'     => esc_html__( 'Top Margin (px or %)', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$this->add_control(
			'bottom_margin',
			[
				'label'     => esc_html__( 'Bottom Margin (px or %)', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);


		$this->end_controls_section();
	}
	public function render() {

		$params = $this->get_settings_for_display();


		
		$params['holder_classes'] = $this->getHolderClasses( $params );
		$params['holder_styles']  = $this->getHolderStyles( $params );

        echo wilmer_core_get_shortcode_module_template_part( 'templates/separator-template', 'separator', '', $params );

	}

	private function getHolderClasses( $params ) {
		$holderClasses = array();
		
		$holderClasses[] = ! empty( $params['custom_class'] ) ? esc_attr( $params['custom_class'] ) : '';
		$holderClasses[] = ! empty( $params['position'] ) ? 'mkdf-separator-' . $params['position'] : '';
		$holderClasses[] = ! empty( $params['type'] ) ? 'mkdf-separator-' . $params['type'] : '';
		
		return implode( ' ', $holderClasses );
	}

	private function getHolderStyles( $params ) {
		$styles = array();
		
		if ( $params['color'] !== '' ) {
			$styles[] = 'border-color: ' . $params['color'];
		}
		
		if ( $params['border_style'] !== '' ) {
			$styles[] = 'border-style: ' . $params['border_style'];
		}
		
		if ( $params['width'] !== '' ) {
			if ( wilmer_mikado_string_ends_with( $params['width'], '%' ) || wilmer_mikado_string_ends_with( $params['width'], 'px' ) ) {
				$styles[] = 'width: ' . $params['width'];
			} else {
				$styles[] = 'width: ' . wilmer_mikado_filter_px( $params['width'] ) . 'px';
			}
		}
		
		if ( $params['thickness'] !== '' ) {
			$styles[] = 'border-bottom-width: ' . wilmer_mikado_filter_px( $params['thickness'] ) . 'px';
		}
		
		if ( $params['top_margin'] !== '' ) {
			if ( wilmer_mikado_string_ends_with( $params['top_margin'], '%' ) || wilmer_mikado_string_ends_with( $params['top_margin'], 'px' ) ) {
				$styles[] = 'margin-top: ' . $params['top_margin'];
			} else {
				$styles[] = 'margin-top: ' . wilmer_mikado_filter_px( $params['top_margin'] ) . 'px';
			}
		}
		
		if ( $params['bottom_margin'] !== '' ) {
			if ( wilmer_mikado_string_ends_with( $params['bottom_margin'], '%' ) || wilmer_mikado_string_ends_with( $params['bottom_margin'], 'px' ) ) {
				$styles[] = 'margin-bottom: ' . $params['bottom_margin'];
			} else {
				$styles[] = 'margin-bottom: ' . wilmer_mikado_filter_px( $params['bottom_margin'] ) . 'px';
			}
		}
		
		return implode( ';', $styles );
	}

}
\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new WilmerCoreElementorSeparator() );