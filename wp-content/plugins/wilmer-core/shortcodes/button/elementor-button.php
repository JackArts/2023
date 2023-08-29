<?php
class WilmerCoreElementorButton extends \Elementor\Widget_Base {

	public function get_name() {
		return 'mkdf_button'; 
	}

	public function get_title() {
		return esc_html__( 'Button', 'wilmer-core' );
	}

	public function get_icon() {
		return 'wilmer-elementor-custom-icon wilmer-elementor-button';
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
					'solid' => esc_html__( 'Solid', 'wilmer-core'), 
					'outline' => esc_html__( 'Outline', 'wilmer-core'), 
					'simple' => esc_html__( 'Simple', 'wilmer-core')
				),
				'default' => 'solid'
			]
		);

		$this->add_control(
			'size',
			[
				'label'     => esc_html__( 'Size', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'' => esc_html__( 'Default', 'wilmer-core'), 
					'small' => esc_html__( 'Small', 'wilmer-core'), 
					'medium' => esc_html__( 'Medium', 'wilmer-core'), 
					'large' => esc_html__( 'Large', 'wilmer-core'), 
					'huge' => esc_html__( 'Huge', 'wilmer-core')
				),
				'default' => '',
				'condition' => [
					'type' => array( 'solid', 'outline' )
				]
			]
		);

		$this->add_control(
			'text',
			[
				'label'     => esc_html__( 'Text', 'wilmer-core' ),
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
			'target',
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

		wilmer_mikado_icon_collections()->getElementorParamsArray( $this, '', '' );
		$this->end_controls_section();

		$this->start_controls_section(
			'design_options',
			[
				'label' => esc_html__( 'Design Options', 'wilmer-core' ),
				'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
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
			'hover_color',
			[
				'label'     => esc_html__( 'Hover Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR
			]
		);

		$this->add_control(
			'background_color',
			[
				'label'     => esc_html__( 'Background Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'condition' => [
					'type' => array( 'solid' )
				]
			]
		);

		$this->add_control(
			'hover_background_color',
			[
				'label'     => esc_html__( 'Hover Background Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'condition' => [
					'type' => array( 'outline' )
				]
			]
		);

		$this->add_control(
			'border_color',
			[
				'label'     => esc_html__( 'Border Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'condition' => [
					'type' => array( 'solid', 'outline' )
				]
			]
		);

		$this->add_control(
			'hover_border_color',
			[
				'label'     => esc_html__( 'Hover Border Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'condition' => [
					'type' => array( 'solid', 'outline' )
				]
			]
		);

		$this->add_control(
			'font_size',
			[
				'label'     => esc_html__( 'Font Size (px)', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$this->add_control(
			'font_weight',
			[
				'label'     => esc_html__( 'Font Weight', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'' => esc_html__( 'Default', 'wilmer-core'), 
					'100' => esc_html__( '100 Thin', 'wilmer-core'), 
					'200' => esc_html__( '200 Thin-Light', 'wilmer-core'), 
					'300' => esc_html__( '300 Light', 'wilmer-core'), 
					'400' => esc_html__( '400 Normal', 'wilmer-core'), 
					'500' => esc_html__( '500 Medium', 'wilmer-core'), 
					'600' => esc_html__( '600 Semi-Bold', 'wilmer-core'), 
					'700' => esc_html__( '700 Bold', 'wilmer-core'), 
					'800' => esc_html__( '800 Extra-Bold', 'wilmer-core'), 
					'900' => esc_html__( '900 Ultra-Bold', 'wilmer-core')
				),
				'default' => ''
			]
		);

		$this->add_control(
			'text_transform',
			[
				'label'     => esc_html__( 'Text Transform', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'' => esc_html__( 'Default', 'wilmer-core'), 
					'none' => esc_html__( 'None', 'wilmer-core'), 
					'capitalize' => esc_html__( 'Capitalize', 'wilmer-core'), 
					'uppercase' => esc_html__( 'Uppercase', 'wilmer-core'), 
					'lowercase' => esc_html__( 'Lowercase', 'wilmer-core'), 
					'initial' => esc_html__( 'Initial', 'wilmer-core'), 
					'inherit' => esc_html__( 'Inherit', 'wilmer-core')
				),
				'default' => ''
			]
		);

		$this->add_control(
			'margin',
			[
				'label'     => esc_html__( 'Margin', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'description' => esc_html__( 'Insert margin in format: top right bottom left (e.g. 10px 5px 10px 5px)', 'wilmer-core' )
			]
		);

		$this->add_control(
			'padding',
			[
				'label'     => esc_html__( 'Button Padding', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'description' => esc_html__( 'Insert padding in format: top right bottom left (e.g. 10px 5px 10px 5px)', 'wilmer-core' ),
				'condition' => [
					'type' => array( 'solid', 'outline' )
				]
			]
		);


		$this->end_controls_section();
	}
	public function render() {

		$params = $this->get_settings_for_display();


        $default_atts = array(
            'size'                   => '',
            'type'                   => 'solid',
            'text'                   => '',
            'link'                   => '',
            'target'                 => '_self',
            'color'                  => '',
            'hover_color'            => '',
            'background_color'       => '',
            'hover_background_color' => '',
            'border_color'           => '',
            'hover_border_color'     => '',
            'font_size'              => '',
            'font_weight'            => '',
            'text_transform'         => '',
            'margin'                 => '',
            'padding'                => '',
            'custom_class'           => '',
            'html_type'              => 'anchor',
            'input_name'             => '',
            'custom_attrs'           => array()
        );

        $default_atts = array_merge( $default_atts, wilmer_mikado_icon_collections()->getShortcodeParams() );

        $params['html_type'] = 'anchor';
		if ( $params['html_type'] !== 'input' ) {
			$iconPackName   = wilmer_mikado_icon_collections()->getIconCollectionParamNameByKey( $params['icon_pack'] );
			$params['icon'] = $iconPackName ? $params[ $iconPackName ] : '';
		}
		
		$params['size'] = ! empty( $params['size'] ) ? $params['size'] : 'medium';
		$params['type'] = ! empty( $params['type'] ) ? $params['type'] : 'solid';
		
		$params['link']   = ! empty( $params['link'] ) ? $params['link'] : '#';
		$params['target'] = ! empty( $params['target'] ) ? $params['target'] : $default_atts['target'];
		
		$params['button_classes']      = $this->getButtonClasses( $params );
		$params['button_custom_attrs'] = ! empty( $params['custom_attrs'] ) ? $params['custom_attrs'] : 
		$params['button_styles']       = $this->getButtonStyles( $params );
		$params['button_data']         = $this->getButtonDataAttr( $params );
		
		echo wilmer_core_get_shortcode_module_template_part( 'templates/' . $params['html_type'], 'button', '', $params );
	}

	private function getButtonStyles( $params ) {
		$styles = array();
		
		if ( ! empty( $params['color'] ) ) {
			$styles[] = 'color: ' . $params['color'];
		}
		
		if ( ! empty( $params['background_color'] ) && $params['type'] !== 'outline' ) {
			$styles[] = 'background-color: ' . $params['background_color'];
		}
		
		if ( ! empty( $params['border_color'] ) ) {
			$styles[] = 'border-color: ' . $params['border_color'];
		}
		
		if ( ! empty( $params['font_size'] ) ) {
			$styles[] = 'font-size: ' . wilmer_mikado_filter_px( $params['font_size'] ) . 'px';
		}
		
		if ( ! empty( $params['font_weight'] ) && $params['font_weight'] !== '' ) {
			$styles[] = 'font-weight: ' . $params['font_weight'];
		}
		
		if ( ! empty( $params['text_transform'] ) ) {
			$styles[] = 'text-transform: ' . $params['text_transform'];
		}
		
		if ( $params['margin'] !== '' ) {
			$styles[] = 'margin: ' . $params['margin'];
		}
		
		if ( $params['padding'] !== '' ) {
			$styles[] = 'padding: ' . $params['padding'];
		}
		
		return $styles;
	}

	private function getButtonDataAttr( $params ) {
		$data = array();
		
		if ( ! empty( $params['hover_color'] ) ) {
			$data['data-hover-color'] = $params['hover_color'];
		}
		
		if ( ! empty( $params['hover_background_color'] ) ) {
			$data['data-hover-bg-color'] = $params['hover_background_color'];
		}
		
		if ( ! empty( $params['hover_border_color'] ) ) {
			$data['data-hover-border-color'] = $params['hover_border_color'];
		}
		
		return $data;
	}

	private function getButtonClasses( $params ) {
		$buttonClasses = array(
			'mkdf-btn',
			'mkdf-btn-' . $params['size'],
			'mkdf-btn-' . $params['type']
		);
		
		if ( ! empty( $params['hover_background_color'] ) ) {
			$buttonClasses[] = 'mkdf-btn-custom-hover-bg';
		}
		
		if ( ! empty( $params['hover_border_color'] ) ) {
			$buttonClasses[] = 'mkdf-btn-custom-border-hover';
		}
		
		if ( ! empty( $params['hover_color'] ) ) {
			$buttonClasses[] = 'mkdf-btn-custom-hover-color';
		}
		
		if ( ! empty( $params['icon'] ) ) {
			$buttonClasses[] = 'mkdf-btn-icon';
		}
		
		if ( ! empty( $params['custom_class'] ) ) {
			$buttonClasses[] = esc_attr( $params['custom_class'] );
		}
		
		return $buttonClasses;
	}

}
\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new WilmerCoreElementorButton() );