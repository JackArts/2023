<?php
class WilmerCoreElementorCallToAction extends \Elementor\Widget_Base {

	public function get_name() {
		return 'mkdf_call_to_action'; 
	}

	public function get_title() {
		return esc_html__( 'Call To Action', 'wilmer-core' );
	}

	public function get_icon() {
		return 'wilmer-elementor-custom-icon wilmer-elementor-call-to-action';
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
			'layout',
			[
				'label'     => esc_html__( 'Layout', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'normal' => esc_html__( 'Normal', 'wilmer-core'), 
					'simple' => esc_html__( 'Simple', 'wilmer-core')
				),
				'default' => 'normal'
			]
		);

		$this->add_control(
			'content_in_grid',
			[
				'label'     => esc_html__( 'Set Content In Grid', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'no' => esc_html__( 'No', 'wilmer-core'), 
					'yes' => esc_html__( 'Yes', 'wilmer-core')
				),
				'default' => 'no',
				'condition' => [
					'layout' => array( 'normal' )
				]
			]
		);

		$this->add_control(
			'content_elements_proportion',
			[
				'label'     => esc_html__( 'Content Elements Proportion', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'80' => esc_html__( '80/20', 'wilmer-core'), 
					'75' => esc_html__( '75/25', 'wilmer-core'), 
					'66' => esc_html__( '66/33', 'wilmer-core'), 
					'50' => esc_html__( '50/50', 'wilmer-core')
				),
				'default' => '75',
				'condition' => [
					'layout' => array( 'normal' )
				]
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
			'content',
			[
				'label'     => esc_html__( 'Content', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXTAREA
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
			'button_top_margin',
			[
				'label'     => esc_html__( 'Button Top Margin (px)', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'condition' => [
					'layout' => array( 'simple' )
				]
			]
		);

		$this->add_control(
			'button_type',
			[
				'label'     => esc_html__( 'Button Type', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'solid' => esc_html__( 'Solid', 'wilmer-core'), 
					'outline' => esc_html__( 'Outline', 'wilmer-core')
				),
				'default' => 'solid'
			]
		);

		$this->add_control(
			'button_size',
			[
				'label'     => esc_html__( 'Button Size', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'' => esc_html__( 'Default', 'wilmer-core'), 
					'small' => esc_html__( 'Small', 'wilmer-core'), 
					'medium' => esc_html__( 'Medium', 'wilmer-core'), 
					'large' => esc_html__( 'Large', 'wilmer-core')
				),
				'default' => 'medium',
				'condition' => [
					'button_type' => array( 'solid', 'outline' )
				]
			]
		);

		$this->add_control(
			'button_link',
			[
				'label'     => esc_html__( 'Button Link', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
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
				'default' => '_self'
			]
		);

		$this->add_control(
			'button_color',
			[
				'label'     => esc_html__( 'Button Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR
			]
		);

		$this->add_control(
			'button_hover_color',
			[
				'label'     => esc_html__( 'Button Hover Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR
			]
		);

		$this->add_control(
			'button_background_color',
			[
				'label'     => esc_html__( 'Button Background Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'condition' => [
					'button_type' => array( 'solid' )
				]
			]
		);

		$this->add_control(
			'button_hover_background_color',
			[
				'label'     => esc_html__( 'Button Hover Background Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR
			]
		);

		$this->add_control(
			'button_border_color',
			[
				'label'     => esc_html__( 'Button Border Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR
			]
		);

		$this->add_control(
			'button_hover_border_color',
			[
				'label'     => esc_html__( 'Button Hover Border Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR
			]
		);


		$this->end_controls_section();
	}
	public function render() {

		$params = $this->get_settings_for_display();


		
		$params['content'] = preg_replace( '#^<\/p>|<p>$#', '', $params['content'] );
		$params['holder_classes']       = $this->getHolderClasses( $params );
		$params['inner_classes']        = $this->getInnerClasses( $params );
		$params['button_holder_styles'] = $this->getButtonHolderStyles( $params );
		$params['button_parameters']    = $this->getButtonParameters( $params );

        echo wilmer_core_get_shortcode_module_template_part( 'templates/call-to-action', 'call-to-action', '', $params );

	}

	private function getHolderClasses( $params ) {
		$holderClasses = array();
		
		$holderClasses[] = ! empty( $params['custom_class'] ) ? esc_attr( $params['custom_class'] ) : '';
		$holderClasses[] = ! empty( $params['layout'] ) ? 'mkdf-' . $params['layout'] . '-layout' : '';
		$holderClasses[] = $params['content_in_grid'] === 'yes' && $params['layout'] === 'normal' ? 'mkdf-content-in-grid' : '';
		
		$content_elements_proportion = $params['content_elements_proportion'];
		if ( $params['layout'] === 'normal' ) {
			switch ( $content_elements_proportion ):
				case '80':
					$holderClasses[] = 'mkdf-four-fifths-columns';
					break;
				case '75':
					$holderClasses[] = 'mkdf-three-quarters-columns';
					break;
				case '66':
					$holderClasses[] = 'mkdf-two-thirds-columns';
					break;
				case '50':
					$holderClasses[] = 'mkdf-two-halves-columns';
					break;
				default:
					$holderClasses[] = 'mkdf-three-quarters-columns';
					break;
			endswitch;
		}
		
		return implode( ' ', $holderClasses );
	}

	private function getInnerClasses( $params ) {
		$innerClasses = array();
		
		$innerClasses[] = $params['layout'] === 'normal' && $params['content_in_grid'] === 'yes' ? 'mkdf-grid' : '';
		
		return implode( ' ', $innerClasses );
	}

	private function getButtonHolderStyles( $params ) {
		$styles = array();
		
		if ( ! empty( $params['button_top_margin'] ) && $params['layout'] === 'simple' ) {
			$styles[] = 'margin-top: ' . wilmer_mikado_filter_px( $params['button_top_margin'] ) . 'px';
		}
		
		return implode( ';', $styles );
	}

	private function getButtonParameters( $params ) {
		$button_params_array = array();
		
		if ( ! empty( $params['button_text'] ) ) {
			$button_params_array['text'] = $params['button_text'];
		}
		
		if ( ! empty( $params['button_type'] ) ) {
			$button_params_array['type'] = $params['button_type'];
		}
		
		if ( ! empty( $params['button_size'] ) ) {
			$button_params_array['size'] = $params['button_size'];
		}
		
		if ( ! empty( $params['button_link'] ) ) {
			$button_params_array['link'] = $params['button_link'];
		}
		
		$button_params_array['target'] = ! empty( $params['button_target'] ) ? $params['button_target'] : '_self';
		
		if ( ! empty( $params['button_color'] ) ) {
			$button_params_array['color'] = $params['button_color'];
		}
		
		if ( ! empty( $params['button_hover_color'] ) ) {
			$button_params_array['hover_color'] = $params['button_hover_color'];
		}
		
		if ( ! empty( $params['button_background_color'] ) ) {
			$button_params_array['background_color'] = $params['button_background_color'];
		}
		
		if ( ! empty( $params['button_hover_background_color'] ) ) {
			$button_params_array['hover_background_color'] = $params['button_hover_background_color'];
		}
		
		if ( ! empty( $params['button_border_color'] ) ) {
			$button_params_array['border_color'] = $params['button_border_color'];
		}
		
		if ( ! empty( $params['button_hover_border_color'] ) ) {
			$button_params_array['hover_border_color'] = $params['button_hover_border_color'];
		}
		
		return $button_params_array;
	}

}
\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new WilmerCoreElementorCallToAction() );