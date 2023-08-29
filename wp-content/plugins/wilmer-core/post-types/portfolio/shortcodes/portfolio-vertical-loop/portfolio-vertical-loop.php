<?php

namespace WilmerCore\CPT\Shortcodes\Portfolio;

use WilmerCore\Lib;

class PortfolioVerticalLoop implements Lib\ShortcodeInterface {
	private $base;

	public function __construct() {
		$this->base = 'mkdf_portfolio_vertical_loop';

		add_action( 'vc_before_init', array( $this, 'vcMap' ) );

		//Portfolio category filter
		add_filter( 'vc_autocomplete_mkdf_portfolio_vertical_loop_category_callback', array( &$this, 'portfolioCategoryAutocompleteSuggester', ), 10, 1 ); // Get suggestion(find). Must return an array

		//Portfolio category render
		add_filter( 'vc_autocomplete_mkdf_portfolio_vertical_loop_category_render', array( &$this, 'portfolioCategoryAutocompleteRender', ), 10, 1 ); // Get suggestion(find). Must return an array

	}

	public function getBase() {
		return $this->base;
	}

	public function vcMap() {
		if ( function_exists( 'vc_map' ) ) {
			vc_map( array(
					'name'     => esc_html__( 'Portfolio Vertical Loop', 'wilmer-core' ),
					'base'     => $this->getBase(),
					'category' => esc_html__( 'by WILMER', 'wilmer-core' ),
					'icon'     => 'icon-wpb-portfolio-vertical-loop extended-custom-icon',
					'params'   => array(
						array(
							'type'        => 'autocomplete',
							'param_name'  => 'category',
							'heading'     => esc_html__( 'One-Category Portfolio Loop', 'wilmer-core' ),
							'description' => esc_html__( 'Enter one category slug (leave empty for showing all categories)', 'wilmer-core' )
						)
					)
				)
			);
		}
	}

	public function render( $atts, $content = null ) {
		$args   = array(
			'category'     => '',
            'next_item_id' => '',
            'id'           => ''
		);
		$params = shortcode_atts( $args, $atts );

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

		$html = wilmer_core_get_cpt_shortcode_module_template_part( 'portfolio', 'portfolio-vertical-loop', 'portfolio-vertical-loop-holder', '', $params, $additional_params );

		return $html;
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

	/**
	 * Filter portfolio categories
	 *
	 * @param $query
	 *
	 * @return array
	 */
	public function portfolioCategoryAutocompleteSuggester( $query ) {
		global $wpdb;
		$post_meta_infos = $wpdb->get_results( $wpdb->prepare( "SELECT a.slug AS slug, a.name AS portfolio_category_title
					FROM {$wpdb->terms} AS a
					LEFT JOIN ( SELECT term_id, taxonomy  FROM {$wpdb->term_taxonomy} ) AS b ON b.term_id = a.term_id
					WHERE b.taxonomy = 'portfolio-category' AND a.name LIKE '%%%s%%'", stripslashes( $query ) ), ARRAY_A );

		$results = array();
		if ( is_array( $post_meta_infos ) && ! empty( $post_meta_infos ) ) {
			foreach ( $post_meta_infos as $value ) {
				$data          = array();
				$data['value'] = $value['slug'];
				$data['label'] = ( ( strlen( $value['portfolio_category_title'] ) > 0 ) ? esc_html__( 'Category', 'wilmer-core' ) . ': ' . $value['portfolio_category_title'] : '' );
				$results[]     = $data;
			}
		}

		return $results;
	}

	/**
	 * Find portfolio category by slug
	 * @since 4.4
	 *
	 * @param $query
	 *
	 * @return bool|array
	 */
	public function portfolioCategoryAutocompleteRender( $query ) {
		$query = trim( $query['value'] ); // get value from requested
		if ( ! empty( $query ) ) {
			// get portfolio category
			$portfolio_category = get_term_by( 'slug', $query, 'portfolio-category' );
			if ( is_object( $portfolio_category ) ) {

				$portfolio_category_slug  = $portfolio_category->slug;
				$portfolio_category_title = $portfolio_category->name;

				$portfolio_category_title_display = '';
				if ( ! empty( $portfolio_category_title ) ) {
					$portfolio_category_title_display = esc_html__( 'Category', 'wilmer-core' ) . ': ' . $portfolio_category_title;
				}

				$data          = array();
				$data['value'] = $portfolio_category_slug;
				$data['label'] = $portfolio_category_title_display;

				return ! empty( $data ) ? $data : false;
			}

			return false;
		}

		return false;
	}
}