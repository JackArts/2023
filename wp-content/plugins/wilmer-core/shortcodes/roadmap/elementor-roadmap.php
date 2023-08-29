<?php
class WilmerCoreElementorRoadmap extends \Elementor\Widget_Base {

	public function get_name() {
		return 'mkdf_roadmap'; 
	}

	public function get_title() {
		return esc_html__( 'Roadmap', 'wilmer-core' );
	}

	public function get_icon() {
		return 'wilmer-elementor-custom-icon wilmer-elementor-roadmap';
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
					'light' => esc_html__( 'Light', 'wilmer-core'), 
					'dark' => esc_html__( 'Dark', 'wilmer-core')
				),
				'default' => 'light'
			]
		);

		$repeater = new \Elementor\Repeater();

		$repeater->add_control(
			'stage_title',
			[
				'label'     => esc_html__( 'Stage Title', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$repeater->add_control(
			'info_title',
			[
				'label'     => esc_html__( 'Info Title', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$repeater->add_control(
			'info_text',
			[
				'label'     => esc_html__( 'Info Text', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXTAREA
			]
		);

		$repeater->add_control(
			'stage_reached',
			[
				'label'     => esc_html__( 'Stage Reached', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'no' => esc_html__( 'No', 'wilmer-core'), 
					'yes' => esc_html__( 'Yes', 'wilmer-core')
				),
				'default' => 'no'
			]
		);

		$this->add_control(
			'stage',
			[
				'label'     => esc_html__( 'Roadmap Stage', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::REPEATER,
				'fields'     => $repeater->get_controls(),
				'title_field'     => esc_html__( 'Item', 'wilmer-core' )
			]
		);


		$this->end_controls_section();
	}
	public function render() {

		$params = $this->get_settings_for_display();


		
		$params['holder_classes']     = $this->getHolderClasses( $params );
		$params['this_object']        = $this;

        echo wilmer_core_get_shortcode_module_template_part( 'templates/roadmap-template', 'roadmap', '', $params );

	}

	private function getHolderClasses( $params ) {
		$holder_classes = array();

		$holder_classes[] = ! empty( $params['custom_class'] ) ? esc_attr( $params['custom_class'] ) : '';
		$holder_classes[] = ! empty( $params['skin'] ) ? 'mkdf-roadmap-skin-'.esc_attr( $params['skin'] ) : 'mkdf-roadmap-skin-light';

		return implode( ' ', $holder_classes );
	}

	public function getItemAdditional( $stage_params ) {
		$additional = array();
		$additional['classes'] = 'mkdf-roadmap-item';
		$additional['style'] = '';

		if ( $stage_params['number']%2 == 0 ){
			$additional['classes'] .= ' mkdf-roadmap-item-below';
		} else {
			$additional['classes'] .= ' mkdf-roadmap-item-above';
		}

		if ($stage_params['stage_reached'] == 'yes') {
			$additional['classes'] .= ' mkdf-roadmap-reached-item';
		}

		return $additional;
	}

}
\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new WilmerCoreElementorRoadmap() );