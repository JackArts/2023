<?php
class WilmerCoreElementorPortfolioVerticalLoop extends \Elementor\Widget_Base {

	public function get_name() {
		return 'mkdf_portfolio_vertical_loop'; 
	}

	public function get_title() {
		return esc_html__( 'Portfolio Vertical Loop', 'wilmer-core' );
	}

	public function get_icon() {
		return 'wilmer-elementor-custom-icon wilmer-elementor-portfolio-vertical-loop';
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
			'category',
			[
				'label'     => esc_html__( 'One-Category Portfolio Loop', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'description' => esc_html__( 'Enter one category slug (leave empty for showing all categories)', 'wilmer-core' )
			]
		);


		$this->end_controls_section();
	}
	public function render() {

		$params = $this->get_settings_for_display();



		/***
		 * @params query_results
		 * @params holder_data
		 * @params holder_classes
		 * @params holder_inner_classes
		 */
        $additional_params = array();

		$query_array                        = $this->getQueryArray( $params );
		$query_results                      = new \WP_Query( $query_array );
		$additional_params['query_results'] = $query_results;

		$additional_params['holder_data']          = wilmer_mikado_get_holder_data_for_cpt( $params, $additional_params );

		$params['this_object'] = $this;

        echo wilmer_core_get_cpt_shortcode_module_template_part( 'portfolio', 'portfolio-vertical-loop', 'portfolio-vertical-loop-holder', '', $params, $additional_params );

	}

	public function getQueryArray( $params ) {
		$query_array = array(
			'post_status'    => 'publish',
			'post_type'      => 'portfolio-item',
			'posts_per_page' => '1',
			'orderby'        => 'date',
			'order'          => 'ASC'
		);

		if ( ! empty( $params['category'] ) ) {
			$query_array['portfolio-category'] = $params['category'];
		}

        $project_ids = null;
        if (! empty( $params['id'] ) && ! empty( $params['next_item_id'] ) ) {
            $project_ids = explode( ',', $params['next_item_id'] );
            $query_array['orderby'] = 'post__in';
            $query_array['post__in'] = $project_ids;
        }

		return $query_array;
	}

	public function getArticleClasses() {
		$classes = array();

        $article_classes = get_post_class( $classes );

		return implode( ' ', $article_classes );
	}

	public function getItemLink() {
		$portfolio_link_meta = get_post_meta( get_the_ID(), 'portfolio_external_link', true );
		$portfolio_link      = ! empty( $portfolio_link_meta ) ? $portfolio_link_meta : get_permalink( get_the_ID() );

		return apply_filters( 'wilmer_mikado_filter_portfolio_external_link', $portfolio_link );
	}

	public function getItemLinkTarget() {
		$portfolio_link_meta   = get_post_meta( get_the_ID(), 'portfolio_external_link', true );
		$portfolio_link_target = ! empty( $portfolio_link_meta ) ? '_blank' : '_self';

		return apply_filters( 'wilmer_mikado_filter_portfolio_external_link_target', $portfolio_link_target );
	}

}
\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new WilmerCoreElementorPortfolioVerticalLoop() );