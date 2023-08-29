<?php
class WilmerCoreElementorPortfolioCategoryList extends \Elementor\Widget_Base {

	public function get_name() {
		return 'mkdf_portfolio_category_list'; 
	}

	public function get_title() {
		return esc_html__( 'Portfolio Category List', 'wilmer-core' );
	}

	public function get_icon() {
		return 'wilmer-elementor-custom-icon wilmer-elementor-portfolio-category-list';
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
			'number_of_columns',
			[
				'label'     => esc_html__( 'Number of Columns', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'description' => esc_html__( 'Default value is Three', 'wilmer-core' ),
				'options' => array(
					'' => esc_html__( 'Default', 'wilmer-core'), 
					'two' => esc_html__( 'Two', 'wilmer-core'), 
					'three' => esc_html__( 'Three', 'wilmer-core'), 
					'four' => esc_html__( 'Four', 'wilmer-core'), 
					'five' => esc_html__( 'Five', 'wilmer-core'), 
					'six' => esc_html__( 'Six', 'wilmer-core')
				),
				'default' => 'three'
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
			'number_of_items',
			[
				'label'     => esc_html__( 'Number of Items Per Page', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'description' => esc_html__( 'Set number of items for your portfolio category list. Default value is 6', 'wilmer-core' ),
                'default' => 6
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

		$this->add_control(
			'image_proportions',
			[
				'label'     => esc_html__( 'Image Proportions', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'description' => esc_html__( 'Set image proportions for your portfolio category list', 'wilmer-core' ),
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
				'default' => 'h3'
			]
		);


		$this->end_controls_section();
	}
	public function render() {

		$params = $this->get_settings_for_display();

		$query_array              = $this->getQueryArray( $params );
		$params['query_results']  = get_terms( $query_array );
		$params['holder_classes'] = $this->getHolderClasses( $params );
		$params['image_size']     = $this->getImageSize( $params );

        echo wilmer_core_get_cpt_shortcode_module_template_part( 'portfolio', 'portfolio-category-list', 'portfolio-category-holder', '', $params );

	}

	public function getQueryArray( $params ) {
		$query_array = array(
			'taxonomy'   => 'portfolio-category',
			'number'     => $params['number_of_items'],
			'orderby'    => $params['orderby'],
			'order'      => $params['order'],
			'hide_empty' => true
		);
		
		return $query_array;
	}

	public function getHolderClasses( $params ) {
		$classes = array();
		
		$classes[] = ! empty( $params['number_of_columns'] ) ? 'mkdf-' . $params['number_of_columns'] . '-columns' : '';
		$classes[] = ! empty( $params['space_between_items'] ) ? 'mkdf-' . $params['space_between_items'] . '-space' : '';
		
		return implode( ' ', $classes );
	}

	public function getImageSize( $params ) {
		$thumb_size = 'full';
		
		if ( ! empty( $params['image_proportions'] ) ) {
			$image_size = $params['image_proportions'];
			
			switch ( $image_size ) {
				case 'landscape':
					$thumb_size = 'wilmer_mikado_image_landscape';
					break;
				case 'portrait':
					$thumb_size = 'wilmer_mikado_image_portrait';
					break;
				case 'square':
					$thumb_size = 'wilmer_mikado_image_square';
					break;
				case 'medium':
					$thumb_size = 'medium';
					break;
				case 'large':
					$thumb_size = 'large';
					break;
				case 'full':
					$thumb_size = 'full';
					break;
			}
		}
		
		return $thumb_size;
	}

}
\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new WilmerCoreElementorPortfolioCategoryList() );