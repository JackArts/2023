<?php
class WilmerCoreElementorProcess extends \Elementor\Widget_Base {

	public function get_name() {
		return 'mkdf_process'; 
	}

	public function get_title() {
		return esc_html__( 'Process', 'wilmer-core' );
	}

	public function get_icon() {
		return 'wilmer-elementor-custom-icon wilmer-elementor-process';
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
			'number_of_columns',
			[
				'label'     => esc_html__( 'Number Of Columns', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'two' => esc_html__( 'Two', 'wilmer-core'), 
					'three' => esc_html__( 'Three', 'wilmer-core'), 
					'four' => esc_html__( 'Four', 'wilmer-core')
				),
				'default' => 'three'
			]
		);

		$this->add_control(
			'switch_to_one_column',
			[
				'label'     => esc_html__( 'Switch to One Column', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'description' => esc_html__( 'Choose on which stage item will be in one column', 'wilmer-core' ),
				'options' => array(
					'' => esc_html__( 'Default None', 'wilmer-core'), 
					'1366' => esc_html__( 'Below 1366px', 'wilmer-core'), 
					'1024' => esc_html__( 'Below 1024px', 'wilmer-core'), 
					'768' => esc_html__( 'Below 768px', 'wilmer-core'), 
					'680' => esc_html__( 'Below 680px', 'wilmer-core'), 
					'480' => esc_html__( 'Below 480px', 'wilmer-core')
				),
				'default' => ''
			]
		);

		$repeater = new \Elementor\Repeater();

		$repeater->add_control(
			'custom_class',
			[
				'label'     => esc_html__( 'Custom CSS Class', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'description' => esc_html__( 'Style particular content element differently - add a class name and refer to it in custom CSS', 'wilmer-core' )
			]
		);

		$repeater->add_control(
			'title',
			[
				'label'     => esc_html__( 'Title', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$repeater->add_control(
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

		$repeater->add_control(
			'title_color',
			[
				'label'     => esc_html__( 'Title Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'condition' => [
					'title!' => ''
				]
			]
		);

		$repeater->add_control(
			'text',
			[
				'label'     => esc_html__( 'Text', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXTAREA
			]
		);

		$repeater->add_control(
			'text_color',
			[
				'label'     => esc_html__( 'Text Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'condition' => [
					'text!' => ''
				]
			]
		);

		$repeater->add_control(
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
			'process_item',
			[
				'label'     => esc_html__( 'Process Item', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::REPEATER,
				'fields'     => $repeater->get_controls(),
				'title_field'     => esc_html__( 'Item', 'wilmer-core' )
			]
		);


		$this->end_controls_section();
	}
	public function render() {

		$params = $this->get_settings_for_display();


		
		$params['holder_classes']  = $this->getHolderClasses( $params );
		$params['number_of_items'] = $this->getNumberOfItems( $params['number_of_columns'] );
		$params['this_object'] = $this;

        echo wilmer_core_get_shortcode_module_template_part( 'templates/elementor-process-template', 'process', '', $params );

	}

	private function getHolderClasses( $params ) {
		$holderClasses = array();
		
		$holderClasses[] = ! empty( $params['custom_class'] ) ? esc_attr( $params['custom_class'] ) : '';
		$holderClasses[] = ! empty( $params['number_of_columns'] ) ? 'mkdf-' . $params['number_of_columns'] . '-columns' : '';
		$holderClasses[] = ! empty( $params['switch_to_one_column'] ) ? 'mkdf-responsive-' . $params['switch_to_one_column'] : '';
		
		return implode( ' ', $holderClasses );
	}

	private function getNumberOfItems( $params ) {
		$number = 3;
		
		switch ($params) {
			case 'two':
				$number = 2;
				break;
			case 'three':
				$number = 3;
				break;
			case 'four':
				$number = 4;
				break;
		}
		
		return $number;
	}

    public function getItemHolderClasses( $params ) {
        $holderClasses = array();

        $holderClasses[] = ! empty( $params['custom_class'] ) ? esc_attr( $params['custom_class'] ) : '';

        return implode( ' ', $holderClasses );
    }

    public function getItemTitleStyles( $params ) {
        $styles = array();

        if ( ! empty( $params['title_color'] ) ) {
            $styles[] = 'color: ' . $params['title_color'];
        }

        return implode( ';', $styles );
    }

    public function getItemTextStyles( $params ) {
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
\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new WilmerCoreElementorProcess() );