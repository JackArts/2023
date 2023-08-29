<?php
class WilmerCoreElementorCountdown extends \Elementor\Widget_Base {

	public function get_name() {
		return 'mkdf_countdown'; 
	}

	public function get_title() {
		return esc_html__( 'Countdown', 'wilmer-core' );
	}

	public function get_icon() {
		return 'wilmer-elementor-custom-icon wilmer-elementor-countdown';
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
			'skin',
			[
				'label'     => esc_html__( 'Skin', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'' => esc_html__( 'Default', 'wilmer-core'), 
					'mkdf-light-skin' => esc_html__( 'Light', 'wilmer-core')
				),
				'default' => ''
			]
		);

		$this->add_control(
			'text_align',
			[
				'label'     => esc_html__( 'Text align', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'center' => esc_html__( 'Center', 'wilmer-core'), 
					'left' => esc_html__( 'Left', 'wilmer-core')
				),
				'default' => 'center'
			]
		);

		$this->add_control(
			'year',
			[
				'label'     => esc_html__( 'Year', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'2020' => esc_html__( '2020', 'wilmer-core'), 
					'2021' => esc_html__( '2021', 'wilmer-core'), 
					'2022' => esc_html__( '2022', 'wilmer-core'),
                    '2023' => esc_html__( '2023', 'wilmer-core'),
                    '2024' => esc_html__( '2024', 'wilmer-core'),
                    '2025' => esc_html__( '2025', 'wilmer-core')
				),
				'default' => '2021'
			]
		);

		$this->add_control(
			'month',
			[
				'label'     => esc_html__( 'Month', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'1' => esc_html__( 'January', 'wilmer-core'), 
					'2' => esc_html__( 'February', 'wilmer-core'), 
					'3' => esc_html__( 'March', 'wilmer-core'), 
					'4' => esc_html__( 'April', 'wilmer-core'), 
					'5' => esc_html__( 'May', 'wilmer-core'), 
					'6' => esc_html__( 'June', 'wilmer-core'), 
					'7' => esc_html__( 'July', 'wilmer-core'), 
					'8' => esc_html__( 'August', 'wilmer-core'), 
					'9' => esc_html__( 'September', 'wilmer-core'), 
					'10' => esc_html__( 'October', 'wilmer-core'), 
					'11' => esc_html__( 'November', 'wilmer-core'), 
					'12' => esc_html__( 'December', 'wilmer-core')
				),
				'default' => '1'
			]
		);

		$this->add_control(
			'day',
			[
				'label'     => esc_html__( 'Day', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'1' => esc_html__( '1', 'wilmer-core'), 
					'2' => esc_html__( '2', 'wilmer-core'), 
					'3' => esc_html__( '3', 'wilmer-core'), 
					'4' => esc_html__( '4', 'wilmer-core'), 
					'5' => esc_html__( '5', 'wilmer-core'), 
					'6' => esc_html__( '6', 'wilmer-core'), 
					'7' => esc_html__( '7', 'wilmer-core'), 
					'8' => esc_html__( '8', 'wilmer-core'), 
					'9' => esc_html__( '9', 'wilmer-core'), 
					'10' => esc_html__( '10', 'wilmer-core'), 
					'11' => esc_html__( '11', 'wilmer-core'), 
					'12' => esc_html__( '12', 'wilmer-core'), 
					'13' => esc_html__( '13', 'wilmer-core'), 
					'14' => esc_html__( '14', 'wilmer-core'), 
					'15' => esc_html__( '15', 'wilmer-core'), 
					'16' => esc_html__( '16', 'wilmer-core'), 
					'17' => esc_html__( '17', 'wilmer-core'), 
					'18' => esc_html__( '18', 'wilmer-core'), 
					'19' => esc_html__( '19', 'wilmer-core'), 
					'20' => esc_html__( '20', 'wilmer-core'), 
					'21' => esc_html__( '21', 'wilmer-core'), 
					'22' => esc_html__( '22', 'wilmer-core'), 
					'23' => esc_html__( '23', 'wilmer-core'), 
					'24' => esc_html__( '24', 'wilmer-core'), 
					'25' => esc_html__( '25', 'wilmer-core'), 
					'26' => esc_html__( '26', 'wilmer-core'), 
					'27' => esc_html__( '27', 'wilmer-core'), 
					'28' => esc_html__( '28', 'wilmer-core'), 
					'29' => esc_html__( '29', 'wilmer-core'), 
					'30' => esc_html__( '30', 'wilmer-core'), 
					'31' => esc_html__( '31', 'wilmer-core')
				),
				'default' => '1'
			]
		);

		$this->add_control(
			'hour',
			[
				'label'     => esc_html__( 'Hour', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'0' => esc_html__( '0', 'wilmer-core'), 
					'1' => esc_html__( '1', 'wilmer-core'), 
					'2' => esc_html__( '2', 'wilmer-core'), 
					'3' => esc_html__( '3', 'wilmer-core'), 
					'4' => esc_html__( '4', 'wilmer-core'), 
					'5' => esc_html__( '5', 'wilmer-core'), 
					'6' => esc_html__( '6', 'wilmer-core'), 
					'7' => esc_html__( '7', 'wilmer-core'), 
					'8' => esc_html__( '8', 'wilmer-core'), 
					'9' => esc_html__( '9', 'wilmer-core'), 
					'10' => esc_html__( '10', 'wilmer-core'), 
					'11' => esc_html__( '11', 'wilmer-core'), 
					'12' => esc_html__( '12', 'wilmer-core'), 
					'13' => esc_html__( '13', 'wilmer-core'), 
					'14' => esc_html__( '14', 'wilmer-core'), 
					'15' => esc_html__( '15', 'wilmer-core'), 
					'16' => esc_html__( '16', 'wilmer-core'), 
					'17' => esc_html__( '17', 'wilmer-core'), 
					'18' => esc_html__( '18', 'wilmer-core'), 
					'19' => esc_html__( '19', 'wilmer-core'), 
					'20' => esc_html__( '20', 'wilmer-core'), 
					'21' => esc_html__( '21', 'wilmer-core'), 
					'22' => esc_html__( '22', 'wilmer-core'), 
					'23' => esc_html__( '23', 'wilmer-core'), 
					'24' => esc_html__( '24', 'wilmer-core')
				),
				'default' => '0'
			]
		);

		$this->add_control(
			'minute',
			[
				'label'     => esc_html__( 'Minute', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'0' => esc_html__( '0', 'wilmer-core'), 
					'1' => esc_html__( '1', 'wilmer-core'), 
					'2' => esc_html__( '2', 'wilmer-core'), 
					'3' => esc_html__( '3', 'wilmer-core'), 
					'4' => esc_html__( '4', 'wilmer-core'), 
					'5' => esc_html__( '5', 'wilmer-core'), 
					'6' => esc_html__( '6', 'wilmer-core'), 
					'7' => esc_html__( '7', 'wilmer-core'), 
					'8' => esc_html__( '8', 'wilmer-core'), 
					'9' => esc_html__( '9', 'wilmer-core'), 
					'10' => esc_html__( '10', 'wilmer-core'), 
					'11' => esc_html__( '11', 'wilmer-core'), 
					'12' => esc_html__( '12', 'wilmer-core'), 
					'13' => esc_html__( '13', 'wilmer-core'), 
					'14' => esc_html__( '14', 'wilmer-core'), 
					'15' => esc_html__( '15', 'wilmer-core'), 
					'16' => esc_html__( '16', 'wilmer-core'), 
					'17' => esc_html__( '17', 'wilmer-core'), 
					'18' => esc_html__( '18', 'wilmer-core'), 
					'19' => esc_html__( '19', 'wilmer-core'), 
					'20' => esc_html__( '20', 'wilmer-core'), 
					'21' => esc_html__( '21', 'wilmer-core'), 
					'22' => esc_html__( '22', 'wilmer-core'), 
					'23' => esc_html__( '23', 'wilmer-core'), 
					'24' => esc_html__( '24', 'wilmer-core'), 
					'25' => esc_html__( '25', 'wilmer-core'), 
					'26' => esc_html__( '26', 'wilmer-core'), 
					'27' => esc_html__( '27', 'wilmer-core'), 
					'28' => esc_html__( '28', 'wilmer-core'), 
					'29' => esc_html__( '29', 'wilmer-core'), 
					'30' => esc_html__( '30', 'wilmer-core'), 
					'31' => esc_html__( '31', 'wilmer-core'), 
					'32' => esc_html__( '32', 'wilmer-core'), 
					'33' => esc_html__( '33', 'wilmer-core'), 
					'34' => esc_html__( '34', 'wilmer-core'), 
					'35' => esc_html__( '35', 'wilmer-core'), 
					'36' => esc_html__( '36', 'wilmer-core'), 
					'37' => esc_html__( '37', 'wilmer-core'), 
					'38' => esc_html__( '38', 'wilmer-core'), 
					'39' => esc_html__( '39', 'wilmer-core'), 
					'40' => esc_html__( '40', 'wilmer-core'), 
					'41' => esc_html__( '41', 'wilmer-core'), 
					'42' => esc_html__( '42', 'wilmer-core'), 
					'43' => esc_html__( '43', 'wilmer-core'), 
					'44' => esc_html__( '44', 'wilmer-core'), 
					'45' => esc_html__( '45', 'wilmer-core'), 
					'46' => esc_html__( '46', 'wilmer-core'), 
					'47' => esc_html__( '47', 'wilmer-core'), 
					'48' => esc_html__( '48', 'wilmer-core'), 
					'49' => esc_html__( '49', 'wilmer-core'), 
					'50' => esc_html__( '50', 'wilmer-core'), 
					'51' => esc_html__( '51', 'wilmer-core'), 
					'52' => esc_html__( '52', 'wilmer-core'), 
					'53' => esc_html__( '53', 'wilmer-core'), 
					'54' => esc_html__( '54', 'wilmer-core'), 
					'55' => esc_html__( '55', 'wilmer-core'), 
					'56' => esc_html__( '56', 'wilmer-core'), 
					'57' => esc_html__( '57', 'wilmer-core'), 
					'58' => esc_html__( '58', 'wilmer-core'), 
					'59' => esc_html__( '59', 'wilmer-core'), 
					'60' => esc_html__( '60', 'wilmer-core')
				),
				'default' => '0'
			]
		);

		$this->add_control(
			'month_label',
			[
				'label'     => esc_html__( 'Month Label', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$this->add_control(
			'day_label',
			[
				'label'     => esc_html__( 'Day Label', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$this->add_control(
			'hour_label',
			[
				'label'     => esc_html__( 'Hour Label', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$this->add_control(
			'minute_label',
			[
				'label'     => esc_html__( 'Minute Label', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$this->add_control(
			'second_label',
			[
				'label'     => esc_html__( 'Second Label', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$this->add_control(
			'digit_font_size',
			[
				'label'     => esc_html__( 'Digit Font Size (px)', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$this->add_control(
			'digit_font_size_responsive',
			[
				'label'     => esc_html__( 'Digit Font Size for smaller resolutions (px)', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$this->add_control(
			'label_font_size',
			[
				'label'     => esc_html__( 'Label Font Size (px)', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$this->add_control(
			'label_font_size_responsive',
			[
				'label'     => esc_html__( 'Label Font Size for smaller resolutions (px)', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);


		$this->end_controls_section();
	}
	public function render() {

		$params = $this->get_settings_for_display();


		
		$params['id']             = mt_rand( 1000, 9999 );
		$params['holder_classes'] = $this->getHolderClasses( $params );
		$params['holder_data']    = $this->getHolderData( $params );
		$params['text_align'] = $this->getTextAlignment($params);

        echo wilmer_core_get_shortcode_module_template_part( 'templates/countdown', 'countdown', '', $params );

	}

	private function getHolderClasses( $params ) {
		$holderClasses = array();
		
		$holderClasses[] = ! empty( $params['custom_class'] ) ? esc_attr( $params['custom_class'] ) : '';
		$holderClasses[] = ! empty( $params['skin'] ) ? $params['skin'] : '';
		
		return implode( ' ', $holderClasses );
	}

	private function getHolderData( $params ) {
		$holderData = array();
		
		$holderData['data-year']         = ! empty( $params['year'] ) ? $params['year'] : '';
		$holderData['data-month']        = ! empty( $params['month'] ) ? $params['month'] : '';
		$holderData['data-day']          = ! empty( $params['day'] ) ? $params['day'] : '';
		$holderData['data-hour']         = $params['hour'] !== '' ? $params['hour'] : '';
		$holderData['data-minute']       = $params['minute'] !== '' ? $params['minute'] : '';
		$holderData['data-month-label']  = ! empty( $params['month_label'] ) ? $params['month_label'] : esc_html__( 'Months', 'wilmer-core' );
		$holderData['data-day-label']    = ! empty( $params['day_label'] ) ? $params['day_label'] : esc_html__( 'Days', 'wilmer-core' );
		$holderData['data-hour-label']   = ! empty( $params['hour_label'] ) ? $params['hour_label'] : esc_html__( 'Hours', 'wilmer-core' );
		$holderData['data-minute-label'] = ! empty( $params['minute_label'] ) ? $params['minute_label'] : esc_html__( 'Minutes', 'wilmer-core' );
		$holderData['data-second-label'] = ! empty( $params['second_label'] ) ? $params['second_label'] : esc_html__( 'Seconds', 'wilmer-core' );
		$holderData['data-digit-size']   = ! empty( $params['digit_font_size'] ) ? $params['digit_font_size'] : '';
		$holderData['data-digit-size-responsive']   = ! empty( $params['digit_font_size_responsive'] ) ? $params['digit_font_size_responsive'] : '';
		$holderData['data-label-size']   = ! empty( $params['label_font_size'] ) ? $params['label_font_size'] : '';
		$holderData['data-label-size-responsive']   = ! empty( $params['label_font_size_responsive'] ) ? $params['label_font_size_responsive'] : '';

		return $holderData;
	}

    private function getTextAlignment( $params ) {
        $text_alignment = array();

        if($params['text_align'] == 'center'){
            $text_alignmentp[] = 'text-align: center';
        }
        else{
            $text_alignment[] = 'text-align: left';
        }

        return implode('; ', $text_alignment);
    }

}
\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new WilmerCoreElementorCountdown() );