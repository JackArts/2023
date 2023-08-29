<?php
class WilmerCoreElementorPortfolioFullheightSlider extends \Elementor\Widget_Base {

	public function get_name() {
		return 'mkdf_portfolio_fullheight_slider'; 
	}

	public function get_title() {
		return esc_html__( 'Portfolio Full Height Slider', 'wilmer-core' );
	}

	public function get_icon() {
		return 'wilmer-elementor-custom-icon wilmer-elementor-portfolio-fullheight-slider';
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
			'number_of_items',
			[
				'label'     => esc_html__( 'Number of Portfolios Items', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'description' => esc_html__( 'Set number of items for your portfolio slider. Enter -1 to show all', 'wilmer-core' )
			]
		);

		$this->add_control(
			'item_type',
			[
				'label'     => esc_html__( 'Click Behavior', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'' => esc_html__( 'Open portfolio single page on click', 'wilmer-core'), 
					'gallery' => esc_html__( 'Open gallery in Pretty Photo on click', 'wilmer-core')
				),
				'default' => ''
			]
		);

		$this->add_control(
			'number_of_columns',
			[
				'label'     => esc_html__( 'Number of Columns', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'description' => esc_html__( 'Number of portfolios that are showing at the same time in slider (on smaller screens is responsive so there will be less items shown). Default value is Four', 'wilmer-core' ),
				'options' => array(
					'' => esc_html__( 'Default', 'wilmer-core'), 
					'one' => esc_html__( 'One', 'wilmer-core'), 
					'two' => esc_html__( 'Two', 'wilmer-core'), 
					'three' => esc_html__( 'Three', 'wilmer-core'), 
					'four' => esc_html__( 'Four', 'wilmer-core'), 
					'five' => esc_html__( 'Five', 'wilmer-core'), 
					'six' => esc_html__( 'Six', 'wilmer-core')
				),
				'default' => '3'
			]
		);

		$this->add_control(
			'category',
			[
				'label'     => esc_html__( 'One-Category Portfolio List', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'description' => esc_html__( 'Enter one category slug (leave empty for showing all categories)', 'wilmer-core' )
			]
		);

		$this->add_control(
			'selected_projects',
			[
				'label'     => esc_html__( 'Show Only Projects with Listed IDs', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'description' => esc_html__( 'Delimit ID numbers by comma (leave empty for all)', 'wilmer-core' )
			]
		);

		$this->add_control(
			'tag',
			[
				'label'     => esc_html__( 'One-Tag Portfolio List', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'description' => esc_html__( 'Enter one tag slug (leave empty for showing all tags)', 'wilmer-core' )
			]
		);

		$this->add_control(
			'orderby',
			[
				'label'     => esc_html__( 'Order By', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'date' => esc_html__( 'Date', 'wilmer-core'), 
					'ID' => esc_html__( 'ID', 'wilmer-core'), 
					'menu_order' => esc_html__( 'Menu Order', 'wilmer-core'), 
					'name' => esc_html__( 'Post Name', 'wilmer-core'), 
					'rand' => esc_html__( 'Random', 'wilmer-core'), 
					'title' => esc_html__( 'Title', 'wilmer-core')
				),
				'default' => 'date'
			]
		);

		$this->add_control(
			'order',
			[
				'label'     => esc_html__( 'Order', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'ASC' => esc_html__( 'ASC', 'wilmer-core'), 
					'DESC' => esc_html__( 'DESC', 'wilmer-core')
				),
				'default' => 'ASC'
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'content_layout',
			[
				'label' => esc_html__( 'Content Layout', 'wilmer-core' ),
				'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
			]
		);
		$this->add_control(
			'enable_title',
			[
				'label'     => esc_html__( 'Enable Title', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'yes' => esc_html__( 'Yes', 'wilmer-core'), 
					'no' => esc_html__( 'No', 'wilmer-core')
				),
				'default' => 'yes'
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
				'default' => 'h4',
				'condition' => [
					'enable_title' => array( 'yes' )
				]
			]
		);

		$this->add_control(
			'title_text_transform',
			[
				'label'     => esc_html__( 'Title Text Transform', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'' => esc_html__( 'Default', 'wilmer-core'), 
					'no' => esc_html__( 'No', 'wilmer-core'), 
					'yes' => esc_html__( 'Yes', 'wilmer-core')
				),
				'default' => '',
				'condition' => [
					'enable_title' => array( 'yes' )
				]
			]
		);

		$this->add_control(
			'enable_category',
			[
				'label'     => esc_html__( 'Enable Category', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'yes' => esc_html__( 'Yes', 'wilmer-core'), 
					'no' => esc_html__( 'No', 'wilmer-core')
				),
				'default' => 'yes'
			]
		);

		$this->add_control(
			'enable_count_images',
			[
				'label'     => esc_html__( 'Enable Number of Images', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'yes' => esc_html__( 'Yes', 'wilmer-core'), 
					'no' => esc_html__( 'No', 'wilmer-core')
				),
				'default' => 'yes',
				'condition' => [
					'item_type' => array( 'gallery' )
				]
			]
		);

		$this->add_control(
			'enable_excerpt',
			[
				'label'     => esc_html__( 'Enable Excerpt', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'no' => esc_html__( 'No', 'wilmer-core'), 
					'yes' => esc_html__( 'Yes', 'wilmer-core')
				),
				'default' => 'no'
			]
		);

		$this->add_control(
			'excerpt_length',
			[
				'label'     => esc_html__( 'Excerpt Length', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'description' => esc_html__( 'Number of characters', 'wilmer-core' ),
				'condition' => [
					'enable_excerpt' => array( 'yes' )
				]
			]
		);

		$this->add_control(
			'readmore',
			[
				'label'     => esc_html__( 'Enable Read More button', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'yes' => esc_html__( 'Yes', 'wilmer-core'), 
					'no' => esc_html__( 'No', 'wilmer-core')
				),
				'default' => ''
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'slider_settings',
			[
				'label' => esc_html__( 'Slider Settings', 'wilmer-core' ),
				'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
			]
		);
		$this->add_control(
			'enable_loop',
			[
				'label'     => esc_html__( 'Enable Slider Loop', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'no' => esc_html__( 'No', 'wilmer-core'), 
					'yes' => esc_html__( 'Yes', 'wilmer-core')
				),
				'default' => 'yes',
				'condition' => [
					'item_type' => array( '' )
				]
			]
		);

		$this->add_control(
			'enable_autoplay',
			[
				'label'     => esc_html__( 'Enable Slider Autoplay', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'yes' => esc_html__( 'Yes', 'wilmer-core'), 
					'no' => esc_html__( 'No', 'wilmer-core')
				),
				'default' => 'yes'
			]
		);

		$this->add_control(
			'enable_mousescroll',
			[
				'label'     => esc_html__( 'Enable Slide Change On Mouse Wheel', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'yes' => esc_html__( 'Yes', 'wilmer-core'), 
					'no' => esc_html__( 'No', 'wilmer-core')
				),
				'default' => 'yse'
			]
		);

		$this->add_control(
			'slider_speed',
			[
				'label'     => esc_html__( 'Slide Duration', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'description' => esc_html__( 'Default value is 5000 (ms)', 'wilmer-core' )
			]
		);


		$this->end_controls_section();
	}
	public function render() {

        $args   = array(
            'number_of_items'        => '9',
            'item_type'              => '',
            'number_of_columns'      => '3',
            'category'               => '',
            'selected_projects'      => '',
            'tag'                    => '',
            'orderby'                => 'date',
            'order'                  => 'ASC',
            'enable_title'           => 'yes',
            'title_tag'              => 'h4',
            'title_text_transform'   => '',
            'enable_category'        => 'yes',
            'enable_count_images'    => 'yes',
            'enable_excerpt'         => 'no',
            'excerpt_length'         => '20',
            'enable_loop'            => 'yes',
            'enable_autoplay'        => 'yes',
            'enable_mousescroll'     => 'yse',
            'slider_speed'           => '5000'
        );
        $params = shortcode_atts( $args, $this->get_settings_for_display() );

		$params['type'] = 'gallery';
		$params['item_style'] = 'fullheight-slider';
		$params['portfolio_slider_on'] = 'yes';
		$params['space_between_items']='no';
		$params['image_proportions']='full';
		$params['slider_speed_animation']='600';
		$params['enable_navigation']='no';
		$params['enable_pagination']='yes';
        $params['additional_class']='';
		if(!empty($params['enable_mousescroll']) && $params['enable_mousescroll'] == 'yes' ){
		    $params['additional_class']='mkdf-slide-on-mouse-scroll';
        }

		$html = '<div class="mkdf-portfolio-fullheight-slider-holder ' . $params['additional_class'] . '">';
		    $html .= wilmer_mikado_execute_shortcode( 'mkdf_portfolio_list', $params );
		$html .= '</div>';
		
		echo wilmer_mikado_get_module_part($html);
	}

}
\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new WilmerCoreElementorPortfolioFullheightSlider() );