<?php
/*
Plugin Name: Wilmer Instagram Feed
Description: Plugin that adds Instagram feed functionality to our theme
Author: Mikado Themes
Version: 2.0.2
*/
define('WILMER_INSTAGRAM_FEED_VERSION', '2.0.2');
define('WILMER_INSTAGRAM_ABS_PATH', dirname(__FILE__));
define('WILMER_INSTAGRAM_REL_PATH', dirname(plugin_basename(__FILE__ )));
define( 'WILMER_INSTAGRAM_URL_PATH', plugin_dir_url( __FILE__ ) );
define( 'WILMER_INSTAGRAM_ASSETS_PATH', WILMER_INSTAGRAM_ABS_PATH . '/assets' );
define( 'WILMER_INSTAGRAM_ASSETS_URL_PATH', WILMER_INSTAGRAM_URL_PATH . 'assets' );
define( 'WILMER_INSTAGRAM_SHORTCODES_PATH', WILMER_INSTAGRAM_ABS_PATH . '/shortcodes' );
define( 'WILMER_INSTAGRAM_SHORTCODES_URL_PATH', WILMER_INSTAGRAM_URL_PATH . 'shortcodes' );

include_once 'load.php';

if ( ! function_exists( 'wilmer_instagram_theme_installed' ) ) {
    /**
     * Checks whether theme is installed or not
     * @return bool
     */
    function wilmer_instagram_theme_installed() {
        return defined( 'MIKADO_ROOT' );
    }
}

if ( ! function_exists( 'wilmer_instagram_feed_text_domain' ) ) {
	/**
	 * Loads plugin text domain so it can be used in translation
	 */
	function wilmer_instagram_feed_text_domain() {
		load_plugin_textdomain( 'wilmer-instagram-feed', false, WILMER_INSTAGRAM_REL_PATH . '/languages' );
	}
	
	add_action( 'plugins_loaded', 'wilmer_instagram_feed_text_domain' );
}
