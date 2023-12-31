<?php
class WilmerCoreElementorTabs extends \Elementor\Widget_Base {

	public function get_name() {
		return 'mkdf_tabs'; 
	}

	public function get_title() {
		return esc_html__( 'Tabs', 'wilmer-core' );
	}

	public function get_icon() {
		return 'wilmer-elementor-custom-icon wilmer-elementor-tabs';
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
					'boxed' => esc_html__( 'Boxed', 'wilmer-core'), 
					'simple' => esc_html__( 'Simple', 'wilmer-core'), 
					'vertical' => esc_html__( 'Vertical', 'wilmer-core')
				),
				'default' => 'standard'
			]
		);

		$this->add_control(
			'skin',
			[
				'label'     => esc_html__( 'Skin', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'default' => esc_html__( 'Default', 'wilmer-core'), 
					'light' => esc_html__( 'Light', 'wilmer-core')
				),
				'default' => 'default'
			]
		);

		$repeater = new \Elementor\Repeater();

		$repeater->add_control(
			'tab_title',
			[
				'label'     => esc_html__( 'Title', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

        $repeater->add_control(
            'tab_text',
            [
                'label'       => esc_html__( 'Text', 'wilmer-core' ),
                'type'        => \Elementor\Controls_Manager::WYSIWYG,
            ]
        );

        $this->add_control(
			'tabs_item',
			[
				'label'     => esc_html__( 'Tabs Item', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::REPEATER,
				'fields'     => $repeater->get_controls(),
				'title_field'     => esc_html__( 'Item', 'wilmer-core' )
			]
		);


		$this->end_controls_section();
	}

    public function render() {
        $params = $this->get_settings_for_display();

        $params['holder_classes'] = $this->getHolderClasses( $params );
        ?>

        <div class="mkdf-tabs <?php echo esc_attr( $params['holder_classes'] ); ?>">
            <ul class="mkdf-tabs-nav clearfix">
                <?php foreach ( $params['tabs_item'] as $tab ) { ?>
                    <li>
                        <?php if ( ! empty( $tab['tab_title'] ) ) { ?>
                            <a href="#tab-<?php echo sanitize_title( $tab['tab_title'] ) ?>"><?php echo esc_html( $tab['tab_title'] ); ?></a>
                        <?php } ?>
                    </li>
                <?php } ?>
            </ul>

            <?php foreach ( $params['tabs_item'] as $tab ) {

                $rand_number         = rand( 0, 1000 );
                $tab['tab_title'] = $tab['tab_title'] . '-' . $rand_number;

                echo wilmer_core_get_shortcode_module_template_part( 'templates/elementor-tab-content', 'tabs', '', $tab );
            } ?>

        </div>
        <?php
    }

	private function getHolderClasses( $params ) {
		$holderClasses = array();
		
		$holderClasses[] = ! empty( $params['custom_class'] ) ? esc_attr( $params['custom_class'] ) : '';
		$holderClasses[] = ! empty( $params['type'] ) ? 'mkdf-tabs-' . esc_attr( $params['type'] ) : 'mkdf-tabs-standard';
		$holderClasses[] = 'mkdf-'.$params['skin'].'-skin';
		
		return implode( ' ', $holderClasses );
	}

}
\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new WilmerCoreElementorTabs() );