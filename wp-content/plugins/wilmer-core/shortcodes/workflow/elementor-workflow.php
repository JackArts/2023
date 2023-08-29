<?php
class WilmerCoreElementorWorkflow extends \Elementor\Widget_Base {

	public function get_name() {
		return 'mkdf_workflow'; 
	}

	public function get_title() {
		return esc_html__( 'Workflow', 'wilmer-core' );
	}

	public function get_icon() {
		return 'wilmer-elementor-custom-icon wilmer-elementor-workflow';
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
			'custom_clas',
			[
				'label'     => esc_html__( 'Extra class name', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'description' => esc_html__( 'Style particular content element differently - add a class name and refer to it in custom CSS.', 'wilmer-core' )
			]
		);

		$this->add_control(
			'line_color',
			[
				'label'     => esc_html__( 'Workflow line color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'description' => esc_html__( 'Pick a color for the workflow line.', 'wilmer-core' )
			]
		);

		$this->add_control(
			'animate',
			[
				'label'     => esc_html__( 'Animate Workflow', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'description' => esc_html__( 'Animate Workflow shortcode when it comes into viewport', 'wilmer-core' ),
				'options' => array(
					'yes' => esc_html__( 'Yes', 'wilmer-core'), 
					'no' => esc_html__( 'No', 'wilmer-core')
				),
				'default' => 'yes'
			]
		);

		$repeater = new \Elementor\Repeater();

		$repeater->add_control(
			'title',
			[
				'label'     => esc_html__( 'Title', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'description' => esc_html__( 'Enter workflow item title.', 'wilmer-core' )
			]
		);

		$repeater->add_control(
			'text',
			[
				'label'     => esc_html__( 'Text', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXTAREA,
				'description' => esc_html__( 'Enter workflow item text.', 'wilmer-core' )
			]
		);

		$repeater->add_control(
			'image',
			[
				'label'     => esc_html__( 'Image', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::MEDIA,
				'description' => esc_html__( 'Insert workflow item image.', 'wilmer-core' )
			]
		);

		$repeater->add_control(
			'circle_border_color',
			[
				'label'     => esc_html__( 'Circle border color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'description' => esc_html__( 'Pick a color for the circle border color.', 'wilmer-core' )
			]
		);

		$repeater->add_control(
			'circle_background_color',
			[
				'label'     => esc_html__( 'Circle background color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'description' => esc_html__( 'Pick a color for the circle background color.', 'wilmer-core' )
			]
		);

		$this->add_control(
			'workflow_item',
			[
				'label'     => esc_html__( 'Workflow Item', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::REPEATER,
				'fields'     => $repeater->get_controls(),
				'title_field'     => esc_html__( 'Item', 'wilmer-core' )
			]
		);


		$this->end_controls_section();
	}
	public function render() {

		$params = $this->get_settings_for_display();

        $style_params = $this->getStyleProperties($params);
        $params       = array_merge($params, $style_params);

        $params['custom_class'] = $this->getWorkflowClasses($params); ?>

        <div class="mkdf-workflow <?php echo esc_attr($params['custom_class']) ?>">
            <span class="main-line" style="<?php echo esc_attr($params['main_line_style']); ?>"></span>
            <?php foreach ($params['workflow_item'] as $wi) {

                $wi['holder_classes']          = $this->getItemStyleProperties( $wi );
                if(!empty($wi['image'])){
                   $wi['image'] = $wi['image']['id'];
                }

                echo wilmer_core_get_shortcode_module_template_part('templates/workflow-item-template', 'workflow', '', $wi);

            } ?>
        </div>



<?php
	}

    private function getWorkflowClasses($params) {

        $custom_clas = '';
        $class    = $params['custom_clas'];

        if($class !== '') {
            $custom_clas = $class;
        }

        if($params['animate'] == 'yes') {
            $custom_clas = 'mkdf-workflow-animate';
        }

        return $custom_clas;
    }

    private function getStyleProperties($params) {

        $style                    = array();
        $style['main_line_style'] = '';

        if($params['line_color'] !== '') {
            $style['main_line_style'] = 'background-color:'.$params['line_color'].';';
        }

        return $style;
    }

    private function getItemStyleProperties($params) {

        $style                            = array();
        $style['circle_border_color']     = '';
        $style['circle_background_color'] = '';
        $style['line_color']              = '';

        if($params['circle_border_color'] !== '') {
            $style['circle_border_color'] = 'border-color:'.$params['circle_border_color'].';';
        }
        if($params['circle_background_color'] !== '') {
            $style['circle_background_color'] = 'background-color:'.$params['circle_background_color'].';';
        }

        return $style;
    }

}
\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new WilmerCoreElementorWorkflow() );