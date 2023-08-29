<?php
class WilmerCoreElementorInteractiveLinkShowcase extends \Elementor\Widget_Base {

	public function get_name() {
		return 'mkdf_interactive_link_showcase'; 
	}

	public function get_title() {
		return esc_html__( 'Interactive Link Showcase', 'wilmer-core' );
	}

	public function get_icon() {
		return 'wilmer-elementor-custom-icon wilmer-elementor-interactive-link-showcase';
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
			'skin',
			[
				'label'     => esc_html__( 'Link Skin', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'' => esc_html__( 'Default', 'wilmer-core'), 
					'light' => esc_html__( 'Light', 'wilmer-core')
				),
				'default' => ''
			]
		);

		$this->add_control(
			'background_color',
			[
				'label'     => esc_html__( 'Background Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR
			]
		);

		$this->add_control(
			'link_target',
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

		$repeater = new \Elementor\Repeater();

		$repeater->add_control(
			'title',
			[
				'label'     => esc_html__( 'Title', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$repeater->add_control(
			'link',
			[
				'label'     => esc_html__( 'Link', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$repeater->add_control(
			'image',
			[
				'label'     => esc_html__( 'Image', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::MEDIA,
				'description' => esc_html__( 'Select image from media library', 'wilmer-core' )
			]
		);

		$this->add_control(
			'link_items',
			[
				'label'     => esc_html__( 'Link Items', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::REPEATER,
				'fields'     => $repeater->get_controls(),
				'title_field'     => esc_html__( 'Item', 'wilmer-core' )
			]
		);


		$this->end_controls_section();
	}
	public function render() {

		$params = $this->get_settings_for_display();
		
		$params['holder_classes']      = $this->getHolderClasses( $params );
		$params['image_holder_styles'] = $this->getImageHolderStyles( $params );

        for ($i = 0; $i < count($params['link_items']); $i++) {
            $params['link_items'][$i]['image'] =  $params['link_items'][$i]['image']['id'];
        }

        echo wilmer_core_get_shortcode_module_template_part( 'templates/interactive-link-showcase', 'interactive-link-showcase', '', $params );

	}

	private function getHolderClasses( $params ) {
		$holderClasses = array();
		
		$holderClasses[] = ! empty( $params['skin'] ) ? 'mkdf-ils-skin-' . $params['skin'] : '';
		
		return implode( ' ', $holderClasses );
	}

	private function getImageHolderStyles( $params ) {
		$styles = array();
		
		if ( ! empty( $params['background_color'] ) ) {
			$styles[] = 'background-color: ' . $params['background_color'];
		}
		
		return implode( ';', $styles );
	}

}
\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new WilmerCoreElementorInteractiveLinkShowcase() );