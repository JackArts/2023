<?php

if ( ! function_exists( 'wilmer_core_masonry_gallery_meta_box_functions' ) ) {
	function wilmer_core_masonry_gallery_meta_box_functions( $post_types ) {
		$post_types[] = 'masonry-gallery';
		
		return $post_types;
	}
	
	add_filter( 'wilmer_mikado_filter_meta_box_post_types_save', 'wilmer_core_masonry_gallery_meta_box_functions' );
	add_filter( 'wilmer_mikado_filter_meta_box_post_types_remove', 'wilmer_core_masonry_gallery_meta_box_functions' );
}

if ( ! function_exists( 'wilmer_core_register_masonry_gallery_cpt' ) ) {
	function wilmer_core_register_masonry_gallery_cpt( $cpt_class_name ) {
		$cpt_class = array(
			'WilmerCore\CPT\MasonryGallery\MasonryGalleryRegister'
		);
		
		$cpt_class_name = array_merge( $cpt_class_name, $cpt_class );
		
		return $cpt_class_name;
	}
	
	add_filter( 'wilmer_core_filter_register_custom_post_types', 'wilmer_core_register_masonry_gallery_cpt' );
}

if ( ! function_exists( 'wilmer_core_add_proofing_gallery_to_search_types' ) ) {
	function wilmer_core_add_proofing_gallery_to_search_types( $post_types ) {
		$post_types['masonry-gallery'] = esc_html__( 'Masonry Gallery', 'wilmer-core' );
		
		return $post_types;
	}
	
	add_filter( 'wilmer_mikado_filter_search_post_type_widget_params_post_type', 'wilmer_core_add_proofing_gallery_to_search_types' );
}

// Load masonry gallery shortcodes
if ( ! function_exists( 'wilmer_core_include_masonry_gallery_shortcodes_files' ) ) {
	/**
	 * Loades all shortcodes by going through all folders that are placed directly in shortcodes folder
	 */
	function wilmer_core_include_masonry_gallery_shortcodes_files() {
	    if(wilmer_core_is_theme_registered()) {
	        foreach ( glob( WILMER_CORE_CPT_PATH . '/masonry-gallery/shortcodes/*/load.php' ) as $shortcode_load ) {
                include_once $shortcode_load;
            }
		}
	}
	
	add_action( 'wilmer_core_action_include_shortcodes_file', 'wilmer_core_include_masonry_gallery_shortcodes_files' );
}

// Load portfolio elementor widgets
if ( ! function_exists( 'wilmer_core_include_masonry_gallery_elementor_widgets_files' ) ) {
    /**
     * Loades all shortcodes by going through all folders that are placed directly in shortcodes folder
     */
    function wilmer_core_include_masonry_gallery_elementor_widgets_files() {
        if ( wilmer_core_theme_installed() && wilmer_mikado_is_plugin_installed('elementor') && wilmer_core_is_theme_registered() ) {
            foreach (glob(WILMER_CORE_CPT_PATH . '/masonry-gallery/shortcodes/*/elementor-*.php') as $shortcode_load) {
                include_once $shortcode_load;
            }
        }
    }

    add_action( 'elementor/widgets/widgets_registered', 'wilmer_core_include_masonry_gallery_elementor_widgets_files' );
}