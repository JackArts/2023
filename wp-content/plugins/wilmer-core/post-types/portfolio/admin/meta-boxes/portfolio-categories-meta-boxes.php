<?php

if ( ! function_exists( 'wilmer_mikado_portfolio_category_additional_fields' ) ) {
	function wilmer_mikado_portfolio_category_additional_fields() {
		
		$fields = wilmer_mikado_add_taxonomy_fields(
			array(
				'scope' => 'portfolio-category',
				'name'  => 'portfolio_category_options'
			)
		);
		
		wilmer_mikado_add_taxonomy_field(
			array(
				'name'   => 'mkdf_portfolio_category_image_meta',
				'type'   => 'image',
				'label'  => esc_html__( 'Category Image', 'wilmer-core' ),
				'parent' => $fields
			)
		);
	}
	
	add_action( 'wilmer_mikado_action_custom_taxonomy_fields', 'wilmer_mikado_portfolio_category_additional_fields' );
}