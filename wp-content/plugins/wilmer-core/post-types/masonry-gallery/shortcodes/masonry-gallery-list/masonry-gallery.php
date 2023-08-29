<?php

namespace WilmerCore\CPT\Shortcodes\MasonryGallery;

use WilmerCore\Lib;

class MasonryGallery implements Lib\ShortcodeInterface {
	private $base;
	
	public function __construct() {
		$this->base = 'mkdf_masonry_gallery';
		
		add_action( 'vc_before_init', array( $this, 'vcMap' ) );
		
		//Masonry Gallery category filter
		add_filter( 'vc_autocomplete_mkdf_masonry_gallery_category_callback', array( &$this, 'masonryGalleryCategoryAutocompleteSuggester', ), 10, 1 ); // Get suggestion(find). Must return an array
		
		//Masonry Gallery category render
		add_filter( 'vc_autocomplete_mkdf_masonry_gallery_category_render', array( &$this, 'masonryGalleryCategoryAutocompleteRender', ), 10, 1 ); // Get suggestion(find). Must return an array
	}
	
	public function getBase() {
		return $this->base;
	}
	
	public function vcMap() {
		if ( function_exists( 'vc_map' ) ) {
			vc_map(
				array(
					'name'                      => esc_html__( 'Masonry Gallery', 'wilmer-core' ),
					'base'                      => $this->base,
					'category'                  => esc_html__( 'by WILMER', 'wilmer-core' ),
					'icon'                      => 'icon-wpb-masonry-gallery extended-custom-icon',
					'allowed_container_element' => 'vc_row',
					'params'                    => array(
						array(
							'type'       => 'textfield',
							'param_name' => 'number',
							'heading'    => esc_html__( 'Number of Items', 'wilmer-core' )
						),
						array(
                            'type'       => 'dropdown',
                            'param_name' => 'show_title',
                            'heading'    => esc_html__( 'Show Title', 'wilmer-core' ),
                            'value'      => array_flip(wilmer_mikado_get_yes_no_select_array(false, false))
                        ),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'space_between_items',
							'heading'     => esc_html__( 'Space Between Items', 'wilmer-core' ),
							'value'       => array_flip( wilmer_mikado_get_space_between_items_array() ),
							'save_always' => true
						),
						array(
							'type'        => 'autocomplete',
							'param_name'  => 'category',
							'heading'     => esc_html__( 'Category', 'wilmer-core' ),
							'description' => esc_html__( 'Enter one category slug (leave empty for showing all categories)', 'wilmer-core' )
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'orderby',
							'heading'     => esc_html__( 'Order By', 'wilmer-core' ),
							'value'       => array_flip( wilmer_mikado_get_query_order_by_array() ),
							'save_always' => true
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'order',
							'heading'     => esc_html__( 'Order', 'wilmer-core' ),
							'value'       => array_flip( wilmer_mikado_get_query_order_array() ),
							'save_always' => true
						)
					)
				)
			);
		}
	}
	
	public function render( $atts, $content = null ) {
		$default_args = array(
			'number'              => - 1,
			'show_title'          => 'no',
			'space_between_items' => 'normal',
			'category'            => '',
			'orderby'             => 'date',
			'order'               => 'ASC'
		);
		extract( shortcode_atts( $default_args, $atts ) );
		
		/* Query for items */
		$query_args = array(
			'post_type'      => 'masonry-gallery',
			'orderby'        => $orderby,
			'order'          => $order,
			'posts_per_page' => $number
		);
		
		if ( ! empty( $category ) ) {
			$query_args['masonry-gallery-category'] = $category;
		}
		
		$holder_classes = '';
		if ( ! empty( $space_between_items ) ) {
			$holder_classes = 'mkdf-' . $space_between_items . '-space';
		}
		
		$query = new \WP_Query( $query_args );
		
		$html = '<div class="mkdf-masonry-gallery-holder mkdf-disable-bottom-space ' . esc_attr( $holder_classes ) . '">';
			$html .= '<div class="mkdf-mg-inner mkdf-outer-space">';
				$html .= '<div class="mkdf-mg-grid-sizer"></div>';
				$html .= '<div class="mkdf-mg-grid-gutter"></div>';
				
				if ( $query->have_posts() ) :
					while ( $query->have_posts() ) : $query->the_post();
						$itemID         = get_the_ID();
						$typeOption     = get_post_meta( $itemID, 'mkdf_masonry_gallery_item_type', true );
						$title          = get_the_title( $itemID );
						$titleTagOption = get_post_meta( $itemID, 'mkdf_masonry_gallery_item_title_tag', true );
						$text           = get_post_meta( $itemID, 'mkdf_masonry_gallery_item_content', true );
						$link           = get_post_meta( $itemID, 'mkdf_masonry_gallery_item_link', true );
						$target         = get_post_meta( $itemID, 'mkdf_masonry_gallery_item_link_target', true );

						
						$type                           = ! empty( $typeOption ) ? $typeOption : 'standard';
						$params['item_title']           = ! empty( $title ) ? $title : '';
                        $params['show_title']           = $show_title;
						$params['item_title_tag']       = ! empty( $titleTagOption ) ? $titleTagOption : 'h4';
						$params['item_content']         = ! empty( $text ) ? $text : '';
						$params['item_link']            = ! empty( $link ) ? $link : '';
						$params['item_link_target']     = ! empty( $target ) ? $target : '_self';
						$params['item_button_label']    = ! empty( $button_label ) ? $button_label : '';
						$params['current_id']           = $itemID;
						$params['item_classes']         = $this->getItemClasses();
						$params['item_image']           = $this->getItemImage( $params );
						$params['background_color']     = $this->getBackgroundColor( $params );
						$params['item_padding']         = $this->getPadding( $params );

						$html .= wilmer_core_get_cpt_shortcode_module_template_part( 'masonry-gallery', 'masonry-gallery-list', 'masonry-gallery-' . $type . '-template', '', $params );
					
					endwhile;
				else:
					$html .= esc_html__( 'Sorry, no posts matched your criteria.', 'wilmer-core' );
				endif;
				wp_reset_postdata();
			$html .= '</div>';
		$html .= '</div>';
		
		return $html;
	}
	
	private function getItemClasses() {
		$classes = array( 'mkdf-mg-item' );
		
		$itemID          = get_the_ID();
		$type            = get_post_meta( $itemID, 'mkdf_masonry_gallery_item_type', true );
		$image_size      = get_post_meta( $itemID, 'mkdf_masonry_gallery_item_size', true );
		$background_skin = get_post_meta( $itemID, 'mkdf_masonry_gallery_simple_content_background_skin', true );
		$vertical_alignment = get_post_meta( $itemID, 'mkdf_masonry_gallery_item_vertical_align', true );
		$advanced_responsive_padding = get_post_meta( $itemID, 'mkdf_masonry_gallery_item_advanced_responsive_padding', true );

		if(! empty($advanced_responsive_padding) && $advanced_responsive_padding == 'yes'){
		    $classes[] = 'mkdf-mg-advanced-responsive-padding';
        }

		if ( ! empty( $type ) ) {
			$classes[] = 'mkdf-mg-' . $type;
		}
		
		if ( ! empty( $image_size ) ) {
			$classes[] = 'mkdf-masonry-size-' . $image_size;
		}
		
		if ( ! empty( $background_skin ) ) {
			$classes[] = 'mkdf-mg-skin-' . $background_skin;
		}

		if ( ! empty( $vertical_alignment ) ) {
			$classes[] = 'mkdf-mg-vertical-align-' . $vertical_alignment;
		}
		
		return implode( ' ', $classes );
	}
	
	public function getItemImage( $params ) {
		$output = '';

        $id = $params['current_id'];

        $fixed_image_size = get_post_meta( $id, 'mkdf_masonry_gallery_item_size', true );

        switch ( $fixed_image_size ) {
            case 'small' :
                $thumb_size = 'wilmer_mikado_image_square';
                break;
            case 'large-width':
                $thumb_size = 'wilmer_mikado_image_landscape';
                break;
            case 'large-height':
                $thumb_size = 'wilmer_mikado_image_portrait';
                break;
            case 'large-width-height':
                $thumb_size = 'wilmer_mikado_image_huge';
                break;
            default :
                $thumb_size = 'full';
                break;
        }

        $output .= get_the_post_thumbnail( $id, $thumb_size );

        return $output;
	}

    public function getBackgroundColor( $params ) {
        $background_color = get_post_meta( $params['current_id'], 'mkdf_masonry_gallery_item_bg_color', true );

        return $background_color;
    }

    public function getPadding( $params ) {
        $item_padding = get_post_meta( $params['current_id'], 'mkdf_masonry_gallery_item_padding', true );

        return $item_padding;
    }
	
	/**
	 * Filter masonry gallery categories
	 *
	 * @param $query
	 *
	 * @return array
	 */
	public function masonryGalleryCategoryAutocompleteSuggester( $query ) {
		global $wpdb;
		$post_meta_infos = $wpdb->get_results( $wpdb->prepare( "SELECT a.slug AS slug, a.name AS masonry_gallery_category_title
					FROM {$wpdb->terms} AS a
					LEFT JOIN ( SELECT term_id, taxonomy  FROM {$wpdb->term_taxonomy} ) AS b ON b.term_id = a.term_id
					WHERE b.taxonomy = 'masonry-gallery-category' AND a.name LIKE '%%%s%%'", stripslashes( $query ) ), ARRAY_A );
		
		$results = array();
		if ( is_array( $post_meta_infos ) && ! empty( $post_meta_infos ) ) {
			foreach ( $post_meta_infos as $value ) {
				$data          = array();
				$data['value'] = $value['slug'];
				$data['label'] = ( ( strlen( $value['masonry_gallery_category_title'] ) > 0 ) ? esc_html__( 'Category', 'wilmer-core' ) . ': ' . $value['masonry_gallery_category_title'] : '' );
				$results[]     = $data;
			}
		}
		
		return $results;
	}
	
	/**
	 * Find masonry gallery category by slug
	 * @since 4.4
	 *
	 * @param $query
	 *
	 * @return bool|array
	 */
	public function masonryGalleryCategoryAutocompleteRender( $query ) {
		$query = trim( $query['value'] ); // get value from requested
		if ( ! empty( $query ) ) {
			// get portfolio category
			$masonry_gallery_category = get_term_by( 'slug', $query, 'masonry-gallery-category' );
			if ( is_object( $masonry_gallery_category ) ) {
				
				$masonry_gallery_category_slug  = $masonry_gallery_category->slug;
				$masonry_gallery_category_title = $masonry_gallery_category->name;
				
				$masonry_gallery_category_title_display = '';
				if ( ! empty( $masonry_gallery_category_title ) ) {
					$masonry_gallery_category_title_display = esc_html__( 'Category', 'wilmer-core' ) . ': ' . $masonry_gallery_category_title;
				}
				
				$data          = array();
				$data['value'] = $masonry_gallery_category_slug;
				$data['label'] = $masonry_gallery_category_title_display;
				
				return ! empty( $data ) ? $data : false;
			}
			
			return false;
		}
		
		return false;
	}
}