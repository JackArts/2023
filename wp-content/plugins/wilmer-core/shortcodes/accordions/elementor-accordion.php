<?php
class WilmerCoreElementorAccordion extends \Elementor\Widget_Base {

	public function get_name() {
		return 'mkdf_accordion'; 
	}

	public function get_title() {
		return esc_html__( 'Accordion', 'wilmer-core' );
	}

	public function get_icon() {
		return 'wilmer-elementor-custom-icon wilmer-elementor-accordions';
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
			'enable_bg_pattern',
			[
				'label'     => esc_html__( 'Enable Background Pattern', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'description' => esc_html__( 'Enable this option if you want to have default theme pattern applied as background of accordion', 'wilmer-core' ),
				'options' => array(
					'no' => esc_html__( 'No', 'wilmer-core'), 
					'yes' => esc_html__( 'Yes', 'wilmer-core')
				),
				'default' => 'no'
			]
		);

		$this->add_control(
			'enable_accordion_number',
			[
				'label'     => esc_html__( 'Enable Accordion Order Number', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'description' => esc_html__( 'Enabling this option will show order number before each accordion', 'wilmer-core' ),
				'options' => array(
					'no' => esc_html__( 'No', 'wilmer-core'), 
					'yes' => esc_html__( 'Yes', 'wilmer-core')
				),
				'default' => 'no'
			]
		);

		$this->add_control(
			'style',
			[
				'label'     => esc_html__( 'Style', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'accordion' => esc_html__( 'Accordion', 'wilmer-core'), 
					'toggle' => esc_html__( 'Toggle', 'wilmer-core')
				),
				'default' => 'accordion'
			]
		);

		$this->add_control(
			'layout',
			[
				'label'     => esc_html__( 'Layout', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'boxed' => esc_html__( 'Boxed', 'wilmer-core'), 
					'simple' => esc_html__( 'Simple', 'wilmer-core')
				),
				'default' => 'boxed'
			]
		);

		$this->add_control(
			'background_skin',
			[
				'label'     => esc_html__( 'Background Skin', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'' => esc_html__( 'Default', 'wilmer-core'), 
					'white' => esc_html__( 'White', 'wilmer-core'), 
					'dark' => esc_html__( 'Dark', 'wilmer-core')
				),
				'default' => '',
				'condition' => [
					'layout' => array( 'boxed', 'simple' )
				]
			]
		);

		$repeater = new \Elementor\Repeater();

		$repeater->add_control(
			'title',
			[
				'label'     => esc_html__( 'Title', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'description' => esc_html__( 'Enter accordion section title', 'wilmer-core' )
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
					'h6' => esc_html__( 'h6', 'wilmer-core'), 
					'p' => esc_html__( 'p', 'wilmer-core')
				),
				'default' => 'h5'
			]
		);

		$repeater->add_control(
			'title_color',
			[
				'label'     => esc_html__( 'Title color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR
			]
		);

        $repeater->add_control(
            'text',
            [
                'label'       => esc_html__( 'Text', 'wilmer-core' ),
                'type'        => \Elementor\Controls_Manager::WYSIWYG,
            ]
        );

		$this->add_control(
			'accordion_tab',
			[
				'label'     => esc_html__( 'Accordion Tab', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::REPEATER,
				'fields'     => $repeater->get_controls(),
				'title_field'     => esc_html__( 'Item', 'wilmer-core' )
			]
		);


		$this->end_controls_section();
	}
	public function render() {

		$params = $this->get_settings_for_display();
		$params['holder_classes'] = $this->getHolderClasses($params);
		?>

        <div class="mkdf-accordion-holder <?php echo esc_attr( $params['holder_classes'] ); ?> clearfix">
            <?php foreach ( $params['accordion_tab'] as $tab ) {
                echo wilmer_core_get_shortcode_module_template_part( 'templates/elementor-accordion-template', 'accordions', '', $tab );
            } ?>
        </div>
    <?php
	}

	private function getHolderClasses( $params ) {
		$holder_classes = array( 'mkdf-ac-default' );
		
		$holder_classes[] = ! empty( $params['custom_class'] ) ? esc_attr( $params['custom_class'] ) : '';
		$holder_classes[] = $params['style'] == 'toggle' ? 'mkdf-toggle' : 'mkdf-accordion';
		$holder_classes[] = ! empty( $params['layout'] ) ? 'mkdf-ac-' . esc_attr( $params['layout'] ) : '';
		$holder_classes[] = ! empty( $params['background_skin'] ) ? 'mkdf-' . esc_attr( $params['background_skin'] ) . '-skin' : '';
		$holder_classes[] = $params['enable_bg_pattern'] == 'yes' ? 'mkdf-ac-with-bg-pattern' : '';
		$holder_classes[] = $params['enable_accordion_number'] == 'yes' ? 'mkdf-ac-with-order-number' : '';

		return implode( ' ', $holder_classes );
	}

}
\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new WilmerCoreElementorAccordion() );