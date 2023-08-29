<?php
class WilmerCoreElementorSectionTitle extends \Elementor\Widget_Base {

	public function get_name() {
		return 'mkdf_section_title'; 
	}

	public function get_title() {
		return esc_html__( 'Section Title', 'wilmer-core' );
	}

	public function get_icon() {
		return 'wilmer-elementor-custom-icon wilmer-elementor-section-title';
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
					'standard' => esc_html__( 'Standard', 'wilmer-core'), 
					'two-columns' => esc_html__( 'Two Columns', 'wilmer-core')
				),
				'default' => 'standard'
			]
		);

		$this->add_control(
			'title_position',
			[
				'label'     => esc_html__( 'Title - Text Position', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'title-left' => esc_html__( 'Title Left - Text Right', 'wilmer-core'), 
					'title-right' => esc_html__( 'Title Right - Text Left', 'wilmer-core')
				),
				'default' => 'title-left',
				'condition' => [
					'type' => array( 'two-columns' )
				]
			]
		);

		$this->add_control(
			'columns_space',
			[
				'label'     => esc_html__( 'Space Between Columns', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'normal' => esc_html__( 'Normal', 'wilmer-core'), 
					'small' => esc_html__( 'Small', 'wilmer-core'), 
					'tiny' => esc_html__( 'Tiny', 'wilmer-core')
				),
				'default' => 'normal',
				'condition' => [
					'type' => array( 'two-columns' )
				]
			]
		);

		$this->add_control(
			'position',
			[
				'label'     => esc_html__( 'Horizontal Position', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'' => esc_html__( 'Default', 'wilmer-core'), 
					'left' => esc_html__( 'Left', 'wilmer-core'), 
					'center' => esc_html__( 'Center', 'wilmer-core'), 
					'right' => esc_html__( 'Right', 'wilmer-core')
				),
				'default' => '',
				'condition' => [
					'type' => array( 'standard' )
				]
			]
		);

		$this->add_control(
			'holder_padding',
			[
				'label'     => esc_html__( 'Holder Side Padding (px or %)', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$this->add_control(
			'intro_title',
			[
				'label'     => esc_html__( 'Intro Title', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'description' => esc_html__( 'Intro text which will be placed before section title', 'wilmer-core' )
			]
		);

		$this->add_control(
			'intro_title_tag',
			[
				'label'     => esc_html__( 'Intro Title Tag', 'wilmer-core' ),
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
					'intro_title!' => ''
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
			'text',
			[
				'label'     => esc_html__( 'Text', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXTAREA
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'title_style',
			[
				'label' => esc_html__( 'Title Style', 'wilmer-core' ),
				'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
			]
		);
		$this->add_control(
			'intro_title_color',
			[
				'label'     => esc_html__( 'Intro Title Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'condition' => [
					'title!' => ''
				]
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
				'default' => 'h2',
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
			'title_bold_words',
			[
				'label'     => esc_html__( 'Words with Bold Font Weight', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'description' => esc_html__( 'Enter the positions of the words you would like to display in a &quot;bold&quot; font weight. Separate the positions with commas (e.g. if you would like the first, second, and third word to have a light font weight, you would enter &quot;1,2,3&quot;)', 'wilmer-core' ),
				'condition' => [
					'title!' => ''
				]
			]
		);

		$this->add_control(
			'title_light_words',
			[
				'label'     => esc_html__( 'Words with Light Font Weight', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'description' => esc_html__( 'Enter the positions of the words you would like to display in a &quot;light&quot; font weight. Separate the positions with commas (e.g. if you would like the first, third, and fourth word to have a light font weight, you would enter &quot;1,3,4&quot;)', 'wilmer-core' ),
				'condition' => [
					'title!' => ''
				]
			]
		);

		$this->add_control(
			'title_break_words',
			[
				'label'     => esc_html__( 'Position of Line Break', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'description' => esc_html__( 'Enter the position of the word after which you would like to create a line break (e.g. if you would like the line break after the 3rd word, you would enter &quot;3&quot;)', 'wilmer-core' ),
				'condition' => [
					'title!' => ''
				]
			]
		);

		$this->add_control(
			'disable_break_words',
			[
				'label'     => esc_html__( 'Disable Line Break for Smaller Screens', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'no' => esc_html__( 'No', 'wilmer-core'), 
					'yes' => esc_html__( 'Yes', 'wilmer-core')
				),
				'default' => 'no',
				'condition' => [
					'title!' => ''
				]
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'text_style',
			[
				'label' => esc_html__( 'Text Style', 'wilmer-core' ),
				'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
			]
		);
		$this->add_control(
			'text_tag',
			[
				'label'     => esc_html__( 'Text Tag', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'' => esc_html__( 'Default', 'wilmer-core'), 
					'h1' => esc_html__( 'h1', 'wilmer-core'), 
					'h2' => esc_html__( 'h2', 'wilmer-core'), 
					'h3' => esc_html__( 'h3', 'wilmer-core'), 
					'h4' => esc_html__( 'h4', 'wilmer-core'), 
					'h5' => esc_html__( 'h5', 'wilmer-core'), 
					'h6' => esc_html__( 'h6', 'wilmer-core'), 
					'p' => esc_html__( 'p', 'wilmer-core')
				),
				'default' => 'h5',
				'condition' => [
					'text!' => ''
				]
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
			'text_font_size',
			[
				'label'     => esc_html__( 'Text Font Size (px)', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'condition' => [
					'text!' => ''
				]
			]
		);

		$this->add_control(
			'text_line_height',
			[
				'label'     => esc_html__( 'Text Line Height (px)', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'condition' => [
					'text!' => ''
				]
			]
		);

		$this->add_control(
			'text_font_weight',
			[
				'label'     => esc_html__( 'Text Font Weight', 'wilmer-core' ),
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
					'text!' => ''
				]
			]
		);

		$this->add_control(
			'text_margin',
			[
				'label'     => esc_html__( 'Text Top Margin (px)', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'condition' => [
					'text!' => ''
				]
			]
		);


		$this->end_controls_section();
	}
	public function render() {

		$params = $this->get_settings_for_display();


        $params['title_tag']            = ! empty( $params['title_tag'] ) ? $params['title_tag'] : 'h2';
        $params['intro_title_tag']      = ! empty( $params['intro_title_tag'] ) ? $params['intro_title_tag'] : 'h6';
        $params['text_tag']             = ! empty( $params['text_tag'] ) ? $params['text_tag'] : 'h5';
        $params['holder_classes']       = $this->getHolderClasses( $params );
		$params['holder_styles']        = $this->getHolderStyles( $params );
		$params['title']                = $this->getModifiedTitle( $params );
		$params['title_styles']         = $this->getTitleStyles( $params );
        $params['intro_title_styles']   = $this->getIntroTitleStyles( $params );
		$params['text_styles']          = $this->getTextStyles( $params );

        echo wilmer_core_get_shortcode_module_template_part( 'templates/section-title', 'section-title', '', $params );

	}

	private function getHolderClasses( $params ) {
		$holderClasses = array();
		
		$holderClasses[] = ! empty( $params['custom_class'] ) ? esc_attr( $params['custom_class'] ) : '';
		$holderClasses[] = ! empty( $params['type'] ) ? 'mkdf-st-' . $params['type'] : '';
		$holderClasses[] = ! empty( $params['title_position'] ) ? 'mkdf-st-' . $params['title_position'] : '';
		$holderClasses[] = ! empty( $params['columns_space'] ) ? 'mkdf-st-' . $params['columns_space'] . '-space' : '';
		$holderClasses[] = $params['disable_break_words'] === 'yes' ? 'mkdf-st-disable-title-break' : '';
		
		return implode( ' ', $holderClasses );
	}

	private function getHolderStyles( $params ) {
		$styles = array();
		
		if ( ! empty( $params['holder_padding'] ) ) {
			$styles[] = 'padding: 0 ' . $params['holder_padding'];
		}
		
		if ( ! empty( $params['position'] ) ) {
			$styles[] = 'text-align: ' . $params['position'];
		}
		
		return implode( ';', $styles );
	}

	private function getModifiedTitle( $params ) {
		$title             = $params['title'];
		$title_bold_words  = str_replace( ' ', '', $params['title_bold_words'] );
		$title_light_words = str_replace( ' ', '', $params['title_light_words'] );
		$title_break_words = str_replace( ' ', '', $params['title_break_words'] );
		
		if ( ! empty( $title ) ) {
			$bold_words  = explode( ',', $title_bold_words );
			$light_words = explode( ',', $title_light_words );
			$split_title = explode( ' ', $title );
			
			if ( ! empty( $title_bold_words ) ) {
				foreach ( $bold_words as $value ) {
					if ( ! empty( $split_title[ $value - 1 ] ) ) {
						$split_title[ $value - 1 ] = '<span class="mkdf-st-title-bold">' . $split_title[ $value - 1 ] . '</span>';
					}
				}
			}
			
			if ( ! empty( $title_light_words ) ) {
				foreach ( $light_words as $value ) {
					if ( ! empty( $split_title[ $value - 1 ] ) ) {
						$split_title[ $value - 1 ] = '<span class="mkdf-st-title-light">' . $split_title[ $value - 1 ] . '</span>';
					}
				}
			}
			
			if ( ! empty( $title_break_words ) ) {
				if ( ! empty( $split_title[ $title_break_words - 1 ] ) ) {
					$split_title[ $title_break_words - 1 ] = $split_title[ $title_break_words - 1 ] . '<br />';
				}
			}
			
			$title = implode( ' ', $split_title );
		}
		
		return $title;
	}

	private function getTitleStyles( $params ) {
		$styles = array();
		
		if ( ! empty( $params['title_color'] ) ) {
			$styles[] = 'color: ' . $params['title_color'];
		}
		
		return implode( ';', $styles );
	}

    private function getIntroTitleStyles( $params ) {
        $styles = array();

        if ( ! empty( $params['intro_title_color'] ) ) {
            $styles[] = 'color: ' . $params['intro_title_color'];
        }

        return implode( ';', $styles );
    }

	private function getTextStyles( $params ) {
		$styles = array();
		
		if ( ! empty( $params['text_color'] ) ) {
			$styles[] = 'color: ' . $params['text_color'];
		}
		
		if ( ! empty( $params['text_font_size'] ) ) {
			$styles[] = 'font-size: ' . wilmer_mikado_filter_px( $params['text_font_size'] ) . 'px';
		}
		
		if ( ! empty( $params['text_line_height'] ) ) {
			$styles[] = 'line-height: ' . wilmer_mikado_filter_px( $params['text_line_height'] ) . 'px';
		}
		
		if ( ! empty( $params['text_font_weight'] ) ) {
			$styles[] = 'font-weight: ' . $params['text_font_weight'];
		}
		
		if ( $params['text_margin'] !== '' ) {
			$styles[] = 'margin-top: ' . wilmer_mikado_filter_px( $params['text_margin'] ) . 'px';
		}
		
		return implode( ';', $styles );
	}

}
\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new WilmerCoreElementorSectionTitle() );