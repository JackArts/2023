<?php

if ( ! function_exists( 'wilmer_core_map_portfolio_meta' ) ) {
	function wilmer_core_map_portfolio_meta() {
		global $wilmer_mikado_global_Framework;
		
		$wilmer_pages = array();
		$pages      = get_pages();
		foreach ( $pages as $page ) {
			$wilmer_pages[ $page->ID ] = $page->post_title;
		}
		
		//Portfolio Images
		
		$wilmer_portfolio_images = new WilmerMikadoClassMetaBox( 'portfolio-item', esc_html__( 'Portfolio Images (multiple upload)', 'wilmer-core' ), '', '', 'portfolio_images' );
		$wilmer_mikado_global_Framework->mkdMetaBoxes->addMetaBox( 'portfolio_images', $wilmer_portfolio_images );
		
		$wilmer_portfolio_image_gallery = new WilmerMikadoClassMultipleImages( 'mkdf-portfolio-image-gallery', esc_html__( 'Portfolio Images', 'wilmer-core' ), esc_html__( 'Choose your portfolio images', 'wilmer-core' ) );
		$wilmer_portfolio_images->addChild( 'mkdf-portfolio-image-gallery', $wilmer_portfolio_image_gallery );
		
		//Portfolio Single Upload Images/Videos 
		
		$wilmer_portfolio_images_videos = wilmer_mikado_create_meta_box(
			array(
				'scope' => array( 'portfolio-item' ),
				'title' => esc_html__( 'Portfolio Images/Videos (single upload)', 'wilmer-core' ),
				'name'  => 'mkdf_portfolio_images_videos'
			)
		);
		wilmer_mikado_add_repeater_field(
			array(
				'name'        => 'mkdf_portfolio_single_upload',
				'parent'      => $wilmer_portfolio_images_videos,
				'button_text' => esc_html__( 'Add Image/Video', 'wilmer-core' ),
				'fields'      => array(
					array(
						'type'        => 'select',
						'name'        => 'file_type',
						'label'       => esc_html__( 'File Type', 'wilmer-core' ),
						'options' => array(
							'image' => esc_html__('Image','wilmer-core'),
							'video' => esc_html__('Video','wilmer-core'),
						)
					),
					array(
						'type'        => 'image',
						'name'        => 'single_image',
						'label'       => esc_html__( 'Image', 'wilmer-core' ),
						'dependency' => array(
							'show' => array(
								'file_type'  => 'image'
							)
						)
					),
					array(
						'type'        => 'select',
						'name'        => 'video_type',
						'label'       => esc_html__( 'Video Type', 'wilmer-core' ),
						'options'	  => array(
							'youtube' => esc_html__('YouTube', 'wilmer-core'),
							'vimeo' => esc_html__('Vimeo', 'wilmer-core'),
							'self' => esc_html__('Self Hosted', 'wilmer-core'),
						),
						'dependency' => array(
							'show' => array(
								'file_type'  => 'video'
							)
						)
					),
					array(
						'type'        => 'text',
						'name'        => 'video_id',
						'label'       => esc_html__( 'Video ID', 'wilmer-core' ),
						'dependency' => array(
							'show' => array(
								'file_type' => 'video',
								'video_type'  => array('youtube','vimeo')
							)
						)
					),
					array(
						'type'        => 'text',
						'name'        => 'video_mp4',
						'label'       => esc_html__( 'Video mp4', 'wilmer-core' ),
						'dependency' => array(
							'show' => array(
								'file_type' => 'video',
								'video_type'  => 'self'
							)
						)
					),
					array(
						'type'        => 'image',
						'name'        => 'video_cover_image',
						'label'       => esc_html__( 'Video Cover Image', 'wilmer-core' ),
						'dependency' => array(
							'show' => array(
								'file_type' => 'video',
								'video_type'  => 'self'
							)
						)
					)
				)
			)
		);
		
		//Portfolio Additional Sidebar Items
		
		$wilmer_additional_sidebar_items = wilmer_mikado_create_meta_box(
			array(
				'scope' => array( 'portfolio-item' ),
				'title' => esc_html__( 'Additional Portfolio Sidebar Items', 'wilmer-core' ),
				'name'  => 'portfolio_properties'
			)
		);

		wilmer_mikado_add_repeater_field(
			array(
				'name'        => 'mkdf_portfolio_properties',
				'parent'      => $wilmer_additional_sidebar_items,
				'button_text' => esc_html__( 'Add New Item', 'wilmer-core' ),
				'fields'      => array(
					array(
						'type'        => 'text',
						'name'        => 'item_title',
						'label'       => esc_html__( 'Item Title', 'wilmer-core' ),
					),
					array(
						'type'        => 'text',
						'name'        => 'item_text',
						'label'       => esc_html__( 'Item Text', 'wilmer-core' )
					),
					array(
						'type'        => 'text',
						'name'        => 'item_url',
						'label'       => esc_html__( 'Enter Full URL for Item Text Link', 'wilmer-core' )
					)
				)
			)
		);
	}
	
	add_action( 'wilmer_mikado_action_meta_boxes_map', 'wilmer_core_map_portfolio_meta', 40 );
}