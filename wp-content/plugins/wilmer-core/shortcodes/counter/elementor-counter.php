<?php
class WilmerCoreElementorCounter extends \Elementor\Widget_Base {

	public function get_name() {
		return 'mkdf_counter'; 
	}

	public function get_title() {
		return esc_html__( 'Counter', 'wilmer-core' );
	}

	public function get_icon() {
		return 'wilmer-elementor-custom-icon wilmer-elementor-counter';
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
					'mkdf-zero-counter' => esc_html__( 'Zero Counter', 'wilmer-core'), 
					'mkdf-random-counter' => esc_html__( 'Random Counter', 'wilmer-core')
				),
				'default' => 'mkdf-zero-counter'
			]
		);

		$this->add_control(
			'skin',
			[
				'label'     => esc_html__( 'Skin', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'transparent' => esc_html__( 'Transparent', 'wilmer-core'), 
					'bold' => esc_html__( 'Bold', 'wilmer-core')
				),
				'default' => 'transparent'
			]
		);

		$this->add_control(
			'outline_color',
			[
				'label'     => esc_html__( 'Outline Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'condition' => [
					'skin' => array( 'transparent' )
				]
			]
		);

		$this->add_control(
			'digit',
			[
				'label'     => esc_html__( 'Digit', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$this->add_control(
			'digit_font_size',
			[
				'label'     => esc_html__( 'Digit Font Size (px)', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'condition' => [
					'digit!' => ''
				]
			]
		);

		$this->add_control(
			'digit_font_responsive_size',
			[
				'label'     => esc_html__( 'Digit Font Smaller Devices Size (px)', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'condition' => [
					'skin' => array( 'bold' )
				]
			]
		);

		$this->add_control(
			'digit_color',
			[
				'label'     => esc_html__( 'Digit Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'condition' => [
					'digit!' => ''
				]
			]
		);

		$this->add_control(
			'centered_text',
			[
				'label'     => esc_html__( 'Centered Text', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'no' => esc_html__( 'No', 'wilmer-core'), 
					'yes' => esc_html__( 'Yes', 'wilmer-core')
				),
				'default' => 'no',
				'condition' => [
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
				'default' => 'h6',
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
			'title_font_weight',
			[
				'label'     => esc_html__( 'Title Font Weight', 'wilmer-core' ),
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
				'default' => '',
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


		$this->end_controls_section();
	}
	public function render() {

		$params = $this->get_settings_for_display();

		$params['holder_classes']       = $this->getHolderClasses( $params );
		$params['counter_styles']       = $this->getCounterStyles( $params );
		$params['counter_title_styles'] = $this->getCounterTitleStyles( $params );
		$params['counter_text_styles']  = $this->getCounterTextStyles( $params );
		$params['counter_data']         = $this->getcounterData($params);
        $params['outline_color']        = $this->getCounterOutlineStyles( $params );

		$params['title_tag'] = ! empty( $params['title_tag'] ) ? $params['title_tag'] : 'h6';

        echo wilmer_core_get_shortcode_module_template_part( 'templates/counter', 'counter', '', $params );

	}

	private function getHolderClasses( $params ) {
		$holderClasses = array();
		
		$holderClasses[] = ! empty( $params['custom_class'] ) ? esc_attr( $params['custom_class'] ) : '';

		$holderClasses[] = $params['skin'] == 'bold' ? 'mkdf-counter-left' : '';

        $holderClasses[] = 'mkdf-counter-'.$params['skin'].'-skin';
		
		return implode( ' ', $holderClasses );
	}

	private function getCounterStyles( $params ) {
		$styles = array();
		
		if ( ! empty( $params['digit_font_size'] ) ) {
			$styles[] = 'font-size: ' . wilmer_mikado_filter_px( $params['digit_font_size'] ) . 'px';
		}

		if ( ! empty( $params['skin'] ) && ! empty( $params['digit_color'] ) ) {
		    if( $params['skin'] == 'transparent' ) {
                $styles[] = 'color: ' . $params['digit_color'];
            } else{
                $styles[] = 'color: ' . $params['digit_color'];
            }
		}
		
		return implode( ';', $styles );
	}

	private function getCounterTitleStyles( $params ) {
		$styles = array();
		
		if ( ! empty( $params['title_color'] ) ) {
			$styles[] = 'color: ' . $params['title_color'];
		}
		
		if ( ! empty( $params['title_font_weight'] ) ) {
			$styles[] = 'font-weight: ' . $params['title_font_weight'];
		}
		
		return implode( ';', $styles );
	}

	private function getCounterTextStyles( $params ) {
		$styles = array();
		
		if ( ! empty( $params['text_color'] ) ) {
			$styles[] = 'color: ' . $params['text_color'];
		}
		
		return implode( ';', $styles );
	}

    private function getCounterOutlineStyles( $params ) {
        $styles = array();

        if ( ! empty( $params['outline_color'] ) ) {
            $styles[] = '-webkit-text-stroke-color: ' . $params['outline_color'];
        }

        return implode( ';', $styles );
    }

    private function getcounterData( $params ) {
        $counter_data = array();


        if ( ! empty( $params['digit_font_responsive_size'] ) ) {
            $counter_data['data-responsive-font-size'] = wilmer_mikado_filter_px( $params['digit_font_responsive_size'] );
        }

        return $counter_data;
    }

}
\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new WilmerCoreElementorCounter() );