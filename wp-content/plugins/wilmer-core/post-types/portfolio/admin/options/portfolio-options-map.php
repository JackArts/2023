<?php

if ( ! function_exists( 'wilmer_mikado_portfolio_options_map' ) ) {
	function wilmer_mikado_portfolio_options_map() {
		
		wilmer_mikado_add_admin_page(
			array(
				'slug'  => '_portfolio',
				'title' => esc_html__( 'Portfolio', 'wilmer-core' ),
				'icon'  => 'fa fa-camera-retro'
			)
		);
		
		$panel_archive = wilmer_mikado_add_admin_panel(
			array(
				'title' => esc_html__( 'Portfolio Archive', 'wilmer-core' ),
				'name'  => 'panel_portfolio_archive',
				'page'  => '_portfolio'
			)
		);
		
		wilmer_mikado_add_admin_field(
			array(
				'name'        => 'portfolio_archive_number_of_items',
				'type'        => 'text',
				'label'       => esc_html__( 'Number of Items', 'wilmer-core' ),
				'description' => esc_html__( 'Set number of items for your portfolio list on archive pages. Default value is 12', 'wilmer-core' ),
				'parent'      => $panel_archive,
				'args'        => array(
					'col_width' => 3
				)
			)
		);
		
		wilmer_mikado_add_admin_field(
			array(
				'name'          => 'portfolio_archive_number_of_columns',
				'type'          => 'select',
				'label'         => esc_html__( 'Number of Columns', 'wilmer-core' ),
				'default_value' => 'four',
				'description'   => esc_html__( 'Set number of columns for your portfolio list on archive pages. Default value is Four columns', 'wilmer-core' ),
				'parent'        => $panel_archive,
				'options'       => wilmer_mikado_get_number_of_columns_array( false, array( 'one', 'six' ) )
			)
		);
		
		wilmer_mikado_add_admin_field(
			array(
				'name'          => 'portfolio_archive_space_between_items',
				'type'          => 'select',
				'label'         => esc_html__( 'Space Between Items', 'wilmer-core' ),
				'description'   => esc_html__( 'Set space size between portfolio items for your portfolio list on archive pages. Default value is normal', 'wilmer-core' ),
				'default_value' => 'normal',
				'options'       => wilmer_mikado_get_space_between_items_array(),
				'parent'        => $panel_archive
			)
		);
		
		wilmer_mikado_add_admin_field(
			array(
				'name'          => 'portfolio_archive_image_size',
				'type'          => 'select',
				'label'         => esc_html__( 'Image Proportions', 'wilmer-core' ),
				'default_value' => 'landscape',
				'description'   => esc_html__( 'Set image proportions for your portfolio list on archive pages. Default value is landscape', 'wilmer-core' ),
				'parent'        => $panel_archive,
				'options'       => array(
					'full'      => esc_html__( 'Original', 'wilmer-core' ),
					'landscape' => esc_html__( 'Landscape', 'wilmer-core' ),
					'portrait'  => esc_html__( 'Portrait', 'wilmer-core' ),
					'square'    => esc_html__( 'Square', 'wilmer-core' )
				)
			)
		);
		
		wilmer_mikado_add_admin_field(
			array(
				'name'          => 'portfolio_archive_item_layout',
				'type'          => 'select',
				'label'         => esc_html__( 'Item Style', 'wilmer-core' ),
				'default_value' => 'standard-shader',
				'description'   => esc_html__( 'Set item style for your portfolio list on archive pages. Default value is Standard - Shader', 'wilmer-core' ),
				'parent'        => $panel_archive,
				'options'       => array(
					'standard-shader' => esc_html__( 'Standard - Shader', 'wilmer-core' ),
					'gallery-overlay' => esc_html__( 'Gallery - Overlay', 'wilmer-core' )
				)
			)
		);
		
		$panel = wilmer_mikado_add_admin_panel(
			array(
				'title' => esc_html__( 'Portfolio Single', 'wilmer-core' ),
				'name'  => 'panel_portfolio_single',
				'page'  => '_portfolio'
			)
		);
		
		wilmer_mikado_add_admin_field(
			array(
				'name'          => 'portfolio_single_template',
				'type'          => 'select',
				'label'         => esc_html__( 'Portfolio Type', 'wilmer-core' ),
				'default_value' => 'small-images',
				'description'   => esc_html__( 'Choose a default type for Single Project pages', 'wilmer-core' ),
				'parent'        => $panel,
				'options'       => array(
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
			)
		);
		
		/***************** Gallery Layout *****************/
		
		$portfolio_gallery_container = wilmer_mikado_add_admin_container(
			array(
				'parent'          => $panel,
				'name'            => 'portfolio_gallery_container',
				'dependency' => array(
					'show' => array(
						'portfolio_single_template'  => array(
							'gallery',
							'small-gallery'
						)
					)
				)
			)
		);
		
		wilmer_mikado_add_admin_field(
			array(
				'name'          => 'portfolio_single_gallery_columns_number',
				'type'          => 'select',
				'label'         => esc_html__( 'Number of Columns', 'wilmer-core' ),
				'default_value' => 'three',
				'description'   => esc_html__( 'Set number of columns for portfolio gallery type', 'wilmer-core' ),
				'parent'        => $portfolio_gallery_container,
				'options'       => wilmer_mikado_get_number_of_columns_array( false, array( 'one', 'five', 'six' ) )
			)
		);
		
		wilmer_mikado_add_admin_field(
			array(
				'name'          => 'portfolio_single_gallery_space_between_items',
				'type'          => 'select',
				'label'         => esc_html__( 'Space Between Items', 'wilmer-core' ),
				'description'   => esc_html__( 'Set space size between columns for portfolio gallery type', 'wilmer-core' ),
				'default_value' => 'normal',
				'options'       => wilmer_mikado_get_space_between_items_array(),
				'parent'        => $portfolio_gallery_container
			)
		);
		
		/***************** Gallery Layout *****************/
		
		/***************** Masonry Layout *****************/
		
		$portfolio_masonry_container = wilmer_mikado_add_admin_container(
			array(
				'parent'          => $panel,
				'name'            => 'portfolio_masonry_container',
				'dependency' => array(
					'show' => array(
						'portfolio_single_template'  => array(
							'masonry',
							'small-masonry'
						)
					)
				)
			)
		);
		
		wilmer_mikado_add_admin_field(
			array(
				'name'          => 'portfolio_single_masonry_columns_number',
				'type'          => 'select',
				'label'         => esc_html__( 'Number of Columns', 'wilmer-core' ),
				'default_value' => 'three',
				'description'   => esc_html__( 'Set number of columns for portfolio masonry type', 'wilmer-core' ),
				'parent'        => $portfolio_masonry_container,
				'options'       => wilmer_mikado_get_number_of_columns_array( false, array( 'one', 'five', 'six' ) )
			)
		);
		
		wilmer_mikado_add_admin_field(
			array(
				'name'          => 'portfolio_single_masonry_space_between_items',
				'type'          => 'select',
				'label'         => esc_html__( 'Space Between Items', 'wilmer-core' ),
				'description'   => esc_html__( 'Set space size between columns for portfolio masonry type', 'wilmer-core' ),
				'default_value' => 'normal',
				'options'       => wilmer_mikado_get_space_between_items_array(),
				'parent'        => $portfolio_masonry_container
			)
		);
		
		/***************** Masonry Layout *****************/
		
		wilmer_mikado_add_admin_field(
			array(
				'type'          => 'select',
				'name'          => 'show_title_area_portfolio_single',
				'default_value' => '',
				'label'         => esc_html__( 'Show Title Area', 'wilmer-core' ),
				'description'   => esc_html__( 'Enabling this option will show title area on single projects', 'wilmer-core' ),
				'parent'        => $panel,
				'options'       => array(
					''    => esc_html__( 'Default', 'wilmer-core' ),
					'yes' => esc_html__( 'Yes', 'wilmer-core' ),
					'no'  => esc_html__( 'No', 'wilmer-core' )
				),
				'args'          => array(
					'col_width' => 3
				)
			)
		);
		
		wilmer_mikado_add_admin_field(
			array(
				'name'          => 'portfolio_single_lightbox_images',
				'type'          => 'yesno',
				'label'         => esc_html__( 'Enable Lightbox for Images', 'wilmer-core' ),
				'description'   => esc_html__( 'Enabling this option will turn on lightbox functionality for projects with images', 'wilmer-core' ),
				'parent'        => $panel,
				'default_value' => 'yes'
			)
		);
		
		wilmer_mikado_add_admin_field(
			array(
				'name'          => 'portfolio_single_lightbox_videos',
				'type'          => 'yesno',
				'label'         => esc_html__( 'Enable Lightbox for Videos', 'wilmer-core' ),
				'description'   => esc_html__( 'Enabling this option will turn on lightbox functionality for YouTube/Vimeo projects', 'wilmer-core' ),
				'parent'        => $panel,
				'default_value' => 'no'
			)
		);
		
		wilmer_mikado_add_admin_field(
			array(
				'name'          => 'portfolio_single_enable_categories',
				'type'          => 'yesno',
				'label'         => esc_html__( 'Enable Categories', 'wilmer-core' ),
				'description'   => esc_html__( 'Enabling this option will enable category meta description on single projects', 'wilmer-core' ),
				'parent'        => $panel,
				'default_value' => 'yes'
			)
		);
		
		wilmer_mikado_add_admin_field(
			array(
				'name'          => 'portfolio_single_hide_date',
				'type'          => 'yesno',
				'label'         => esc_html__( 'Enable Date', 'wilmer-core' ),
				'description'   => esc_html__( 'Enabling this option will enable date meta on single projects', 'wilmer-core' ),
				'parent'        => $panel,
				'default_value' => 'yes'
			)
		);
		
		wilmer_mikado_add_admin_field(
			array(
				'name'          => 'portfolio_single_sticky_sidebar',
				'type'          => 'yesno',
				'label'         => esc_html__( 'Enable Sticky Side Text', 'wilmer-core' ),
				'description'   => esc_html__( 'Enabling this option will make side text sticky on Single Project pages. This option works only for Full Width Images, Small Images, Small Gallery and Small Masonry portfolio types', 'wilmer-core' ),
				'parent'        => $panel,
				'default_value' => 'yes'
			)
		);

        wilmer_mikado_add_admin_field(
            array(
                'name'          => 'portfolio_single_related_posts',
                'type'          => 'yesno',
                'label'         => esc_html__( 'Enable related projects', 'wilmer-core' ),
                'description'   => esc_html__( 'Enabling this option will make related projects section appear on Single Project pages. This option works only for Portfolio Images and Small Images portfolio types', 'wilmer-core' ),
                'parent'        => $panel,
                'default_value' => 'no'
            )
        );

		wilmer_mikado_add_admin_field(
			array(
				'name'          => 'portfolio_single_comments',
				'type'          => 'yesno',
				'label'         => esc_html__( 'Show Comments', 'wilmer-core' ),
				'description'   => esc_html__( 'Enabling this option will show comments on your page', 'wilmer-core' ),
				'parent'        => $panel,
				'default_value' => 'no'
			)
		);
		
		wilmer_mikado_add_admin_field(
			array(
				'name'          => 'portfolio_single_hide_pagination',
				'type'          => 'yesno',
				'label'         => esc_html__( 'Hide Pagination', 'wilmer-core' ),
				'description'   => esc_html__( 'Enabling this option will turn off portfolio pagination functionality', 'wilmer-core' ),
				'parent'        => $panel,
				'default_value' => 'no'
			)
		);
		
		$container_navigate_category = wilmer_mikado_add_admin_container(
			array(
				'name'            => 'navigate_same_category_container',
				'parent'          => $panel,
				'dependency' => array(
					'hide' => array(
						'portfolio_single_hide_pagination'  => array(
							'yes'
						)
					)
				)
			)
		);
		
		wilmer_mikado_add_admin_field(
			array(
				'name'          => 'portfolio_single_nav_same_category',
				'type'          => 'yesno',
				'label'         => esc_html__( 'Enable Pagination Through Same Category', 'wilmer-core' ),
				'description'   => esc_html__( 'Enabling this option will make portfolio pagination sort through current category', 'wilmer-core' ),
				'parent'        => $container_navigate_category,
				'default_value' => 'no'
			)
		);
		
		wilmer_mikado_add_admin_field(
			array(
				'name'        => 'portfolio_single_slug',
				'type'        => 'text',
				'label'       => esc_html__( 'Portfolio Single Slug', 'wilmer-core' ),
				'description' => esc_html__( 'Enter if you wish to use a different Single Project slug (Note: After entering slug, navigate to Settings -> Permalinks and click "Save" in order for changes to take effect)', 'wilmer-core' ),
				'parent'      => $panel,
				'args'        => array(
					'col_width' => 3
				)
			)
		);
	}
	
	add_action( 'wilmer_mikado_action_options_map', 'wilmer_mikado_portfolio_options_map', wilmer_mikado_set_options_map_position( 'portfolio' ) );
}