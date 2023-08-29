<?php
/*
Plugin Name: Wilmer Twitter Feed
Description: Plugin that adds Twitter feed functionality to our theme
Author: Mikado Themes
Version: 1.1.1
*/

define( 'WILMER_TWITTER_FEED_VERSION', '1.1.1' );
define( 'WILMER_TWITTER_ABS_PATH', dirname( __FILE__ ) );
define( 'WILMER_TWITTER_REL_PATH', dirname( plugin_basename( __FILE__ ) ) );
define( 'WILMER_TWITTER_URL_PATH', plugin_dir_url( __FILE__ ) );
define( 'WILMER_TWITTER_ASSETS_PATH', WILMER_TWITTER_ABS_PATH . '/assets' );
define( 'WILMER_TWITTER_ASSETS_URL_PATH', WILMER_TWITTER_URL_PATH . 'assets' );
define( 'WILMER_TWITTER_SHORTCODES_PATH', WILMER_TWITTER_ABS_PATH . '/shortcodes' );
define( 'WILMER_TWITTER_SHORTCODES_URL_PATH', WILMER_TWITTER_URL_PATH . 'shortcodes' );

include_once 'load.php';

if ( ! function_exists( 'wilmer_twitter_theme_installed' ) ) {
	/**
	 * Checks whether theme is installed or not
	 * @return bool
	 */
	function wilmer_twitter_theme_installed() {
		return defined( 'MIKADO_ROOT' );
	}
}

if ( ! function_exists( 'wilmer_twitter_feed_text_domain' ) ) {
	/**
	 * Loads plugin text domain so it can be used in translation
	 */
	function wilmer_twitter_feed_text_domain() {
		load_plugin_textdomain( 'wilmer-twitter-feed', false, WILMER_TWITTER_REL_PATH . '/languages' );
	}
	
	add_action( 'plugins_loaded', 'wilmer_twitter_feed_text_domain' );
}