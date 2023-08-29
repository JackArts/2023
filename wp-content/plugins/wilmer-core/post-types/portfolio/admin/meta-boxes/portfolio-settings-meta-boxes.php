<?php

if ( ! function_exists( 'wilmer_core_map_portfolio_settings_meta' ) ) {
	function wilmer_core_map_portfolio_settings_meta() {
		$meta_box = wilmer_mikado_create_meta_box( array(
			'scope' => 'portfolio-item',
			'title' => esc_html__( 'Portfolio Settings', 'wilmer-core' ),
			'name'  => 'portfolio_settings_meta_box'
		) );
		
		wilmer_mikado_create_meta_box_field( array(
			'name'        => 'mkdf_portfolio_single_template_meta',
			'type'        => 'select',
			'label'       => esc_html__( 'Portfolio Type', 'wilmer-core' ),
			'description' => esc_html__( 'Choose a default type for Single Project pages', 'wilmer-core' ),
			'parent'      => $meta_box,
			'options'     => array(
				''                  => esc_html__( 'Default', 'wilmer-core' ),
				'huge-images'       => esc_html__( 'Portfolio Full Width Images', 'wilmer-core' ),
				'images'            => esc_html__( 'Portfolio Images', 'wilmer-core' ),
				'small-images'      => esc_html__( 'Portfolio Small Images', 'wilmer-core' ),
				'slider'            => esc_html__( 'Portfolio Slider', 'wilmer-core' ),
				'small-slider'      => esc_html__( 'Portfolio Small Slider', 'wilmer-core' ),
				'gallery'           => esc_html__( 'Portfolio Gallery', 'wilmer-core' ),
				'small-gallery'     => esc_html__( 'Portfolio Small Gallery', 'wilmer-core' ),
				'masonry'           => esc_html__( 'Portfolio Masonry', 'wilmer-core' ),
				'small-masonry'     => esc_html__( 'Portfolio Small Masonry', 'wilmer-core' ),
				'custom'            => esc_html__( 'Portfolio Custom', 'wilmer-core' ),
				'full-width-custom' => esc_html__( 'Portfolio Full Width Custom', 'wilmer-core' )
			)
		) );
		
		/***************** Gallery Layout *****************/
		
		$gallery_type_meta_container = wilmer_mikado_add_admin_container(
			array(
				'parent'          => $meta_box,
				'name'            => 'mkdf_gallery_type_meta_container',
				'dependency' => array(
					'show' => array(
						'mkdf_portfolio_single_template_meta'  => array(
							'gallery',
							'small-gallery'
						)
					)
				)
			)
		);
		
		wilmer_mikado_create_meta_box_field(
			array(
				'name'          => 'mkdf_portfolio_single_gallery_columns_number_meta',
				'type'          => 'select',
				'label'         => esc_html__( 'Number of Columns', 'wilmer-core' ),
				'default_value' => '',
				'description'   => esc_html__( 'Set number of columns for portfolio gallery type', 'wilmer-core' ),
				'parent'        => $gallery_type_meta_container,
				'options'       => wilmer_mikado_get_number_of_columns_array( true, array( 'one', 'five', 'six' ) )
			)
		);
		
		wilmer_mikado_create_meta_box_field(
			array(
				'name'          => 'mkdf_portfolio_single_gallery_space_between_items_meta',
				'type'          => 'select',
				'label'         => esc_html__( 'Space Between Items', 'wilmer-core' ),
				'description'   => esc_html__( 'Set space size between columns for portfolio gallery type', 'wilmer-core' ),
				'default_value' => '',
				'options'       => wilmer_mikado_get_space_between_items_array( true ),
				'parent'        => $gallery_type_meta_container
			)
		);
		
		/***************** Gallery Layout *****************/
		
		/***************** Masonry Layout *****************/
		
		$masonry_type_meta_container = wilmer_mikado_add_admin_container(
			array(
				'parent'          => $meta_box,
				'name'            => 'mkdf_masonry_type_meta_container',
				'dependency' => array(
					'show' => array(
						'mkdf_portfolio_single_template_meta'  => array(
							'masonry',
							'small-masonry'
						)
					)
				)
			)
		);
		
		wilmer_mikado_create_meta_box_field(
			array(
				'name'          => 'mkdf_portfolio_single_masonry_columns_number_meta',
				'type'          => 'select',
				'label'         => esc_html__( 'Number of Columns', 'wilmer-core' ),
				'default_value' => '',
				'description'   => esc_html__( 'Set number of columns for portfolio masonry type', 'wilmer-core' ),
				'parent'        => $masonry_type_meta_container,
				'options'       => wilmer_mikado_get_number_of_columns_array( true, array( 'one', 'five', 'six' ) )
			)
		);
		
		wilmer_mikado_create_meta_box_field(
			array(
				'name'          => 'mkdf_portfolio_single_masonry_space_between_items_meta',
				'type'          => 'select',
				'label'         => esc_html__( 'Space Between Items', 'wilmer-core' ),
				'description'   => esc_html__( 'Set space size between columns for portfolio masonry type', 'wilmer-core' ),
				'default_value' => '',
				'options'       => wilmer_mikado_get_space_between_items_array( true ),
				'parent'        => $masonry_type_meta_container
			)
		);
		
		/***************** Masonry Layout *****************/
		
		wilmer_mikado_create_meta_box_field(
			array(
				'name'          => 'mkdf_show_title_area_portfolio_single_meta',
				'type'          => 'select',
				'default_value' => '',
				'label'         => esc_html__( 'Show Title Area', 'wilmer-core' ),
				'description'   => esc_html__( 'Enabling this option will show title area on your single portfolio page', 'wilmer-core' ),
				'parent'        => $meta_box,
				'options'       => wilmer_mikado_get_yes_no_select_array()
			)
		);
		
		wilmer_mikado_create_meta_box_field(
			array(
				'name'        => 'portfolio_info_top_padding',
				'type'        => 'text',
				'label'       => esc_html__( 'Portfolio Info Top Padding', 'wilmer-core' ),
				'description' => esc_html__( 'Set top padding for portfolio info elements holder. This option works only for Portfolio Images, Slider, Gallery and Masonry portfolio types', 'wilmer-core' ),
				'parent'      => $meta_box,
				'args'        => array(
					'col_width' => 3,
					'suffix'    => 'px'
				)
			)
		);
		
		wilmer_mikado_create_meta_box_field(
			array(
				'name'        => 'portfolio_external_link',
				'type'        => 'text',
				'label'       => esc_html__( 'Portfolio External Link', 'wilmer-core' ),
				'description' => esc_html__( 'Enter URL to link from Portfolio List page', 'wilmer-core' ),
				'parent'      => $meta_box,
				'args'        => array(
					'col_width' => 3
				)
			)
		);
		
		wilmer_mikado_create_meta_box_field(
			array(
				'name'        => 'mkdf_portfolio_featured_image_meta',
				'type'        => 'image',
				'label'       => esc_html__( 'Featured Image', 'wilmer-core' ),
				'description' => esc_html__( 'Choose an image for Portfolio Lists shortcode where Hover Type option is Switch Featured Images', 'wilmer-core' ),
				'parent'      => $meta_box
			)
		);
		
		wilmer_mikado_create_meta_box_field(
			array(
				'name'          => 'mkdf_portfolio_masonry_fixed_dimensions_meta',
				'type'          => 'select',
				'label'         => esc_html__( 'Dimensions for Masonry - Image Fixed Proportion', 'wilmer-core' ),
				'description'   => esc_html__( 'Choose image layout when it appears in Masonry type portfolio lists where image proportion is fixed', 'wilmer-core' ),
				'default_value' => '',
				'parent'        => $meta_box,
				'options'       => array(
					''                   => esc_html__( 'Default', 'wilmer-core' ),
					'small'              => esc_html__( 'Small', 'wilmer-core' ),
					'large-width'        => esc_html__( 'Large Width', 'wilmer-core' ),
					'large-height'       => esc_html__( 'Large Height', 'wilmer-core' ),
					'large-width-height' => esc_html__( 'Large Width/Height', 'wilmer-core' )
				)
			)
		);
		
		wilmer_mikado_create_meta_box_field(
			array(
				'name'          => 'mkdf_portfolio_masonry_original_dimensions_meta',
				'type'          => 'select',
				'label'         => esc_html__( 'Dimensions for Masonry - Image Original Proportion', 'wilmer-core' ),
				'description'   => esc_html__( 'Choose image layout when it appears in Masonry type portfolio lists where image proportion is original', 'wilmer-core' ),
				'default_value' => '',
				'parent'        => $meta_box,
				'options'       => array(
					''            => esc_html__( 'Default', 'wilmer-core' ),
					'large-width' => esc_html__( 'Large Width', 'wilmer-core' )
				)
			)
		);
		
		$all_pages = array();
		$pages     = get_pages();
		foreach ( $pages as $page ) {
			$all_pages[ $page->ID ] = $page->post_title;
		}
		
		wilmer_mikado_create_meta_box_field(
			array(
				'name'        => 'portfolio_single_back_to_link',
				'type'        => 'select',
				'label'       => esc_html__( '"Back To" Link', 'wilmer-core' ),
				'description' => esc_html__( 'Choose "Back To" page to link from portfolio Single Project page', 'wilmer-core' ),
				'parent'      => $meta_box,
				'options'     => $all_pages,
				'args'        => array(
					'select2' => true
				)
			)
		);
	}
	
	add_action( 'wilmer_mikado_action_meta_boxes_map', 'wilmer_core_map_portfolio_settings_meta', 41 );
}