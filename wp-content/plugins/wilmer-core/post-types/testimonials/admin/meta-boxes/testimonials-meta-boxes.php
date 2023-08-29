<?php

if ( ! function_exists( 'wilmer_core_map_testimonials_meta' ) ) {
	function wilmer_core_map_testimonials_meta() {
		$testimonial_meta_box = wilmer_mikado_create_meta_box(
			array(
				'scope' => array( 'testimonials' ),
				'title' => esc_html__( 'Testimonial', 'wilmer-core' ),
				'name'  => 'testimonial_meta'
			)
		);
		
		wilmer_mikado_create_meta_box_field(
			array(
				'name'        => 'mkdf_testimonial_title',
				'type'        => 'text',
				'label'       => esc_html__( 'Title', 'wilmer-core' ),
				'description' => esc_html__( 'Enter testimonial title', 'wilmer-core' ),
				'parent'      => $testimonial_meta_box,
			)
		);
		
		wilmer_mikado_create_meta_box_field(
			array(
				'name'        => 'mkdf_testimonial_text',
				'type'        => 'text',
				'label'       => esc_html__( 'Text', 'wilmer-core' ),
				'description' => esc_html__( 'Enter testimonial text', 'wilmer-core' ),
				'parent'      => $testimonial_meta_box,
			)
		);
		
		wilmer_mikado_create_meta_box_field(
			array(
				'name'        => 'mkdf_testimonial_author',
				'type'        => 'text',
				'label'       => esc_html__( 'Author', 'wilmer-core' ),
				'description' => esc_html__( 'Enter author name', 'wilmer-core' ),
				'parent'      => $testimonial_meta_box,
			)
		);
		
		wilmer_mikado_create_meta_box_field(
			array(
				'name'        => 'mkdf_testimonial_author_position',
				'type'        => 'text',
				'label'       => esc_html__( 'Author Position', 'wilmer-core' ),
				'description' => esc_html__( 'Enter author job position', 'wilmer-core' ),
				'parent'      => $testimonial_meta_box,
			)
		);
	}
	
	add_action( 'wilmer_mikado_action_meta_boxes_map', 'wilmer_core_map_testimonials_meta', 95 );
}