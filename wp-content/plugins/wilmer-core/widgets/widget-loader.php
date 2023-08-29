<?php

if ( ! function_exists( 'wilmer_mikado_register_widgets' ) ) {
	function wilmer_mikado_register_widgets() {
		$widgets = apply_filters( 'wilmer_core_filter_register_widgets', $widgets = array() );
		
		foreach ( $widgets as $widget ) {
			register_widget( $widget );
		}
	}
	
	add_action( 'widgets_init', 'wilmer_mikado_register_widgets' );
}