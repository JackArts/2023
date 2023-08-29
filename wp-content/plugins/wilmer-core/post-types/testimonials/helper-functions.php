<?php

if ( ! function_exists( 'wilmer_core_testimonials_meta_box_functions' ) ) {
	function wilmer_core_testimonials_meta_box_functions( $post_types ) {
		$post_types[] = 'testimonials';
		
		return $post_types;
	}
	
	add_filter( 'wilmer_mikado_filter_meta_box_post_types_save', 'wilmer_core_testimonials_meta_box_functions' );
	add_filter( 'wilmer_mikado_filter_meta_box_post_types_remove', 'wilmer_core_testimonials_meta_box_functions' );
}

if ( ! function_exists( 'wilmer_core_register_testimonials_cpt' ) ) {
	function wilmer_core_register_testimonials_cpt( $cpt_class_name ) {
		$cpt_class = array(
			'WilmerCore\CPT\Testimonials\TestimonialsRegister'
		);
		
		$cpt_class_name = array_merge( $cpt_class_name, $cpt_class );
		
		return $cpt_class_name;
	}
	
	add_filter( 'wilmer_core_filter_register_custom_post_types', 'wilmer_core_register_testimonials_cpt' );
}

// Load testimonials shortcodes
if ( ! function_exists( 'wilmer_core_include_testimonials_shortcodes_files' ) ) {
	/**
	 * Loades all shortcodes by going through all folders that are placed directly in shortcodes folder
	 */
	function wilmer_core_include_testimonials_shortcodes_files() {
	    if(wilmer_core_is_theme_registered()) {
            foreach ( glob( WILMER_CORE_CPT_PATH . '/testimonials/shortcodes/*/load.php' ) as $shortcode_load ) {
                include_once $shortcode_load;
            }
        }
	}
	
	add_action( 'wilmer_core_action_include_shortcodes_file', 'wilmer_core_include_testimonials_shortcodes_files' );
}

// Load portfolio elementor widgets
if ( ! function_exists( 'wilmer_core_include_testimonials_elementor_widgets_files' ) ) {
    /**
     * Loades all shortcodes by going through all folders that are placed directly in shortcodes folder
     */
    function wilmer_core_include_testimonials_elementor_widgets_files() {
        if ( wilmer_core_theme_installed() && wilmer_mikado_is_plugin_installed('elementor') && wilmer_core_is_theme_registered() ) {
            foreach (glob(WILMER_CORE_CPT_PATH . '/testimonials/shortcodes/*/elementor-*.php') as $shortcode_load) {
                include_once $shortcode_load;
            }
        }
    }

    add_action( 'elementor/widgets/widgets_registered', 'wilmer_core_include_testimonials_elementor_widgets_files' );
}