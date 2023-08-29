<?php
class WilmerCoreElementorPortfolioSlider extends \Elementor\Widget_Base {

	public function get_name() {
		return 'mkdf_portfolio_slider'; 
	}

	public function get_title() {
		return esc_html__( 'Portfolio Slider', 'wilmer-core' );
	}

	public function get_icon() {
		return 'wilmer-elementor-custom-icon wilmer-elementor-portfolio-slider';
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
				'default' => 'four',
				'condition' => [
					'navigation_position' => array( 'standard' )
				]
			]
		);

		$this->add_control(
			'navigation_position',
			[
				'label'     => esc_html__( 'Navigation Position', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'description' => esc_html__( 'Please choose whether you want navigation to be standard or placed left from slider. Please note that if you choose &quot;Left From Slider&quot; option your slider will be auto-width type', 'wilmer-core' ),
				'options' => array(
					'standard' => esc_html__( 'Standard', 'wilmer-core'), 
					'left-from-slider' => esc_html__( 'Left from slider', 'wilmer-core')
				),
				'default' => 'standard'
			]
		);

		$this->add_control(
			'space_between_items',
			[
				'label'     => esc_html__( 'Space Between Items', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'huge' => esc_html__( 'Huge (40)', 'wilmer-core'), 
					'large' => esc_html__( 'Large (25)', 'wilmer-core'), 
					'medium' => esc_html__( 'Medium (20)', 'wilmer-core'), 
					'normal' => esc_html__( 'Normal (15)', 'wilmer-core'), 
					'small' => esc_html__( 'Small (10)', 'wilmer-core'), 
					'tiny' => esc_html__( 'Tiny (5)', 'wilmer-core'), 
					'no' => esc_html__( 'No (0)', 'wilmer-core')
				),
				'default' => 'normal'
			]
		);

		$this->add_control(
			'image_proportions',
			[
				'label'     => esc_html__( 'Image Proportions', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'description' => esc_html__( 'Set image proportions for your portfolio slider.', 'wilmer-core' ),
				'options' => array(
					'full' => esc_html__( 'Original', 'wilmer-core'), 
					'square' => esc_html__( 'Square', 'wilmer-core'), 
					'landscape' => esc_html__( 'Landscape', 'wilmer-core'), 
					'portrait' => esc_html__( 'Portrait', 'wilmer-core'), 
					'medium' => esc_html__( 'Medium', 'wilmer-core'), 
					'large' => esc_html__( 'Large', 'wilmer-core')
				),
				'default' => 'full'
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
			'item_style',
			[
				'label'     => esc_html__( 'Item Style', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'standard-shader' => esc_html__( 'Standard - Shader', 'wilmer-core'), 
					'standard-switch-images' => esc_html__( 'Standard - Switch Featured Images', 'wilmer-core'), 
					'gallery-overlay' => esc_html__( 'Gallery - Overlay', 'wilmer-core'), 
					'gallery-slide-from-image-bottom' => esc_html__( 'Gallery - Slide From Image Bottom', 'wilmer-core')
				),
				'default' => 'standard-shader'
			]
		);

		$this->add_control(
			'content_top_margin',
			[
				'label'     => esc_html__( 'Content Top Margin (px or %)', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'condition' => [
					'item_style' => array( 'standard-shader', 'standard-switch-images' )
				]
			]
		);

		$this->add_control(
			'content_bottom_margin',
			[
				'label'     => esc_html__( 'Content Bottom Margin (px or %)', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'condition' => [
					'item_style' => array( 'standard-shader', 'standard-switch-images' )
				]
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
					'none' => esc_html__( 'None', 'wilmer-core'), 
					'capitalize' => esc_html__( 'Capitalize', 'wilmer-core'), 
					'uppercase' => esc_html__( 'Uppercase', 'wilmer-core'), 
					'lowercase' => esc_html__( 'Lowercase', 'wilmer-core'), 
					'initial' => esc_html__( 'Initial', 'wilmer-core'), 
					'inherit' => esc_html__( 'Inherit', 'wilmer-core')
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
				'default' => 'no'
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
				'default' => 'no',
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
			'slider_speed',
			[
				'label'     => esc_html__( 'Slide Duration', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'description' => esc_html__( 'Default value is 5000 (ms)', 'wilmer-core' )
			]
		);

		$this->add_control(
			'slider_speed_animation',
			[
				'label'     => esc_html__( 'Slide Animation Duration', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'description' => esc_html__( 'Speed of slide animation in milliseconds. Default value is 600.', 'wilmer-core' )
			]
		);

		$this->add_control(
			'slider_skin',
			[
				'label'     => esc_html__( 'Slider Skin', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'light' => esc_html__( 'Light', 'wilmer-core'), 
					'dark' => esc_html__( 'Dark', 'wilmer-core')
				),
				'default' => 'light'
			]
		);

		$this->add_control(
			'enable_navigation',
			[
				'label'     => esc_html__( 'Enable Slider Navigation Arrows', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'yes' => esc_html__( 'Yes', 'wilmer-core'), 
					'no' => esc_html__( 'No', 'wilmer-core')
				),
				'default' => 'yes'
			]
		);

		$this->add_control(
			'navigation_skin',
			[
				'label'     => esc_html__( 'Navigation Skin', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'' => esc_html__( 'Default', 'wilmer-core'), 
					'light' => esc_html__( 'Light', 'wilmer-core'), 
					'dark' => esc_html__( 'Dark', 'wilmer-core')
				),
				'default' => '',
				'condition' => [
					'enable_navigation' => array( 'yes' )
				]
			]
		);

		$this->add_control(
			'enable_pagination',
			[
				'label'     => esc_html__( 'Enable Slider Pagination', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'yes' => esc_html__( 'Yes', 'wilmer-core'), 
					'no' => esc_html__( 'No', 'wilmer-core')
				),
				'default' => 'yes'
			]
		);

		$this->add_control(
			'pagination_skin',
			[
				'label'     => esc_html__( 'Pagination Skin', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'' => esc_html__( 'Default', 'wilmer-core'), 
					'light' => esc_html__( 'Light', 'wilmer-core'), 
					'dark' => esc_html__( 'Dark', 'wilmer-core')
				),
				'default' => '',
				'condition' => [
					'enable_pagination' => array( 'yes' )
				]
			]
		);

		$this->add_control(
			'pagination_position',
			[
				'label'     => esc_html__( 'Pagination Position', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'below-slider' => esc_html__( 'Below Slider', 'wilmer-core'), 
					'on-slider' => esc_html__( 'On Slider', 'wilmer-core')
				),
				'default' => 'below-slider',
				'condition' => [
					'enable_pagination' => array( 'yes' )
				]
			]
		);


		$this->end_controls_section();
	}
	public function render() {

        $args   = array(
            'number_of_items'        => '9',
            'item_type'              => '',
            'navigation_position'    => '',
            'number_of_columns'      => 'four',
            'space_between_items'    => 'normal',
            'image_proportions'      => 'full',
            'category'               => '',
            'selected_projects'      => '',
            'tag'                    => '',
            'orderby'                => 'date',
            'order'                  => 'ASC',
            'item_style'             => 'standard-shader',
            'content_top_margin'     => '',
            'content_bottom_margin'  => '',
            'enable_title'           => 'yes',
            'title_tag'              => 'h4',
            'title_text_transform'   => '',
            'enable_category'        => 'yes',
            'enable_count_images'    => 'yes',
            'enable_excerpt'         => 'no',
            'excerpt_length'         => '20',
            'readmore'               => 'no',
            'enable_loop'            => 'no',
            'enable_autoplay'        => 'yes',
            'slider_speed'           => '5000',
            'slider_speed_animation' => '600',
            'enable_navigation'      => 'yes',
            'navigation_skin'        => '',
            'enable_pagination'      => 'yes',
            'pagination_skin'        => '',
            'pagination_position'    => 'below-slider',
            'slider_skin'            => 'light'
        );
        $params = shortcode_atts( $args, $this->get_settings_for_display() );

        $params['type']                = 'gallery';
        $params['portfolio_slider_on'] = 'yes';

        if(! empty($params['navigation_position']) && $params['navigation_position'] == 'left-from-slider'){
            $params['enable_auto_width'] = 'yes';
        }

		$holder_classes = 'mkdf-portfolio-slider-holder';

        $holder_classes .= !empty($params['navigation_position']) ? ' mkdf-portfolio-slider-navigation-' . $params['navigation_position'] : ' mkdf-portfolio-slider-navigation-standard';

        $holder_classes .= ' mkdf-ps-'.$params['slider_skin'].'-skin';
		
		$html = '<div class="' . $holder_classes . '">';
			$html .= wilmer_mikado_execute_shortcode( 'mkdf_portfolio_list', $params );
		$html .= '</div>';
		
		echo wilmer_mikado_get_module_part($html);
	}

}
\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new WilmerCoreElementorPortfolioSlider() );