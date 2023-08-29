<?php

if ( ! function_exists( 'wilmer_core_map_masonry_gallery_meta' ) ) {
	function wilmer_core_map_masonry_gallery_meta() {
		
		$masonry_gallery_meta_box = wilmer_mikado_create_meta_box(
			array(
				'scope' => array( 'masonry-gallery' ),
				'title' => esc_html__( 'Masonry Gallery General', 'wilmer-core' ),
				'name'  => 'masonry_gallery_meta'
			)
		);

		wilmer_mikado_create_meta_box_field(
			array(
				'name'          => 'mkdf_masonry_gallery_item_title_tag',
				'type'          => 'select',
				'default_value' => 'h4',
				'label'         => esc_html__( 'Title Tag', 'wilmer-core' ),
				'parent'        => $masonry_gallery_meta_box,
				'options'       => wilmer_mikado_get_title_tag()
			)
		);

        wilmer_mikado_create_meta_box_field(
            array(
                'name'          => 'mkdf_masonry_gallery_item_type',
                'type'          => 'select',
                'default_value' => 'standard',
                'label'         => esc_html__( 'Type', 'wilmer-core' ),
                'parent'        => $masonry_gallery_meta_box,
                'options'=> array(
                    'standard' => esc_html__('Standard', 'wilmer-core'),
                    'image' => esc_html__('Only Image', 'wilmer-core'),
                )
            )
        );

        $standard_type_meta_container = wilmer_mikado_add_admin_container(
            array(
                'parent'          => $masonry_gallery_meta_box,
                'name'            => 'mkdf_standard_type_meta_container',
                'dependency' => array(
                    'show' => array(
                        'mkdf_masonry_gallery_item_type'  => 'standard'
                    )
                )
            )
        );

        wilmer_mikado_create_meta_box_field(
            array(
                'name'   => 'mkdf_masonry_gallery_item_bg_color',
                'type'   => 'color',
                'label'  => esc_html__( 'Masonry Item Background Color', 'wilmer-core' ),
                'parent' => $standard_type_meta_container
            )
        );

        wilmer_mikado_create_meta_box_field(
            array(
                'name'   => 'mkdf_masonry_gallery_item_padding',
                'type'   => 'text',
                'label'  => esc_html__( 'Masonry Item Padding', 'wilmer-core' ),
                'parent' => $standard_type_meta_container
            )
        );

        wilmer_mikado_create_meta_box_field(
            array(
                'name'          => 'mkdf_masonry_gallery_item_advanced_responsive_padding',
                'type'          => 'select',
                'default_value' => 'no',
                'label'         => esc_html__( 'Advanced Responsive Padding', 'wilmer-core' ),
                'parent'        => $standard_type_meta_container,
                'options'       => wilmer_mikado_get_yes_no_select_array(false, false)
            )
        );
		
		wilmer_mikado_create_meta_box_field(
			array(
				'name'   => 'mkdf_masonry_gallery_item_content',
				'type'   => 'textareahtml',
				'label'  => esc_html__( 'Masonry Item Content', 'wilmer-core' ),
				'parent' => $standard_type_meta_container
			)
		);

        wilmer_mikado_create_meta_box_field(
            array(
                'name'          => 'mkdf_masonry_gallery_item_vertical_align',
                'type'          => 'select',
                'default_value' => 'middle',
                'label'         => esc_html__( 'Masonry Item Vertical Alignment', 'wilmer-core' ),
                'parent'        => $standard_type_meta_container,
                'options'       => array(
                    'top'    => esc_html__('Top', 'wilmer-core'),
                    'middle' => esc_html__('Middle', 'wilmer-core'),
                    'bottom' => esc_html__('Bottom', 'wilmer-core'),
                )
            )
        );
		
		wilmer_mikado_create_meta_box_field(
			array(
				'name'   => 'mkdf_masonry_gallery_item_link',
				'type'   => 'text',
				'label'  => esc_html__( 'Link', 'wilmer-core' ),
				'parent' => $masonry_gallery_meta_box
			)
		);
		
		wilmer_mikado_create_meta_box_field(
			array(
				'name'          => 'mkdf_masonry_gallery_item_link_target',
				'type'          => 'select',
				'default_value' => '_self',
				'label'         => esc_html__( 'Link Target', 'wilmer-core' ),
				'parent'        => $masonry_gallery_meta_box,
				'options'       => wilmer_mikado_get_link_target_array()
			)
		);
		
		wilmer_mikado_add_admin_section_title( array(
			'name'   => 'mkdf_section_style_title',
			'parent' => $masonry_gallery_meta_box,
			'title'  => esc_html__( 'Masonry Gallery Item Style', 'wilmer-core' )
		) );
		
		wilmer_mikado_create_meta_box_field(
			array(
				'name'          => 'mkdf_masonry_gallery_item_size',
				'type'          => 'select',
				'default_value' => 'small',
				'label'         => esc_html__( 'Size', 'wilmer-core' ),
				'parent'        => $masonry_gallery_meta_box,
				'options'       => array(
					'small'              => esc_html__( 'Small', 'wilmer-core' ),
					'large-width'        => esc_html__( 'Large Width', 'wilmer-core' ),
					'large-height'       => esc_html__( 'Large Height', 'wilmer-core' ),
					'large-width-height' => esc_html__( 'Large Width/Height', 'wilmer-core' )
				)
			)
		);
	}
	
	add_action( 'wilmer_mikado_action_meta_boxes_map', 'wilmer_core_map_masonry_gallery_meta', 45 );
}