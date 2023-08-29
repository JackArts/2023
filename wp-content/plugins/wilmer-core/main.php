<?php
/*
Plugin Name: Wilmer Core
Description: Plugin that adds all post types needed by our theme
Author: Mikado Themes
Version: 2.2.1
*/

require_once 'load.php';

add_action( 'after_setup_theme', array( WilmerCore\CPT\PostTypesRegister::getInstance(), 'register' ) );

if ( ! function_exists( 'wilmer_core_activation' ) ) {
	/**
	 * Triggers when plugin is activated. It calls flush_rewrite_rules
	 * and defines wilmer_mikado_action_core_on_activate action
	 */
	function wilmer_core_activation() {
		do_action( 'wilmer_mikado_action_core_on_activate' );
		
		WilmerCore\CPT\PostTypesRegister::getInstance()->register();
		flush_rewrite_rules();
	}
	
	register_activation_hook( __FILE__, 'wilmer_core_activation' );
}

if ( ! function_exists( 'wilmer_core_text_domain' ) ) {
	/**
	 * Loads plugin text domain so it can be used in translation
	 */
	function wilmer_core_text_domain() {
		load_plugin_textdomain( 'wilmer-core', false, WILMER_CORE_REL_PATH . '/languages' );
	}
	
	add_action( 'plugins_loaded', 'wilmer_core_text_domain' );
}

if ( ! function_exists( 'wilmer_core_version_class' ) ) {
	/**
	 * Adds plugins version class to body
	 *
	 * @param $classes
	 *
	 * @return array
	 */
	function wilmer_core_version_class( $classes ) {
		$classes[] = 'wilmer-core-' . WILMER_CORE_VERSION;
		
		return $classes;
	}
	
	add_filter( 'body_class', 'wilmer_core_version_class' );
}

if ( ! function_exists( 'wilmer_core_theme_installed' ) ) {
	/**
	 * Checks whether theme is installed or not
	 * @return bool
	 */
	function wilmer_core_theme_installed() {
		return defined( 'MIKADO_ROOT' );
	}
}

if ( ! function_exists( 'wilmer_core_is_instagram_plugin_installed' ) ) {
    //is Wilmer Instagram installed?
    function wilmer_core_is_instagram_plugin_installed() {
        return defined( 'WILMER_INSTAGRAM_FEED_VERSION' );
    }
}
if ( ! function_exists( 'wilmer_core_is_twitter_plugin_installed' ) ) {
    //is Wilmer Twitter installed?
    function wilmer_core_is_twitter_plugin_installed() {
        return defined( 'WILMER_TWITTER_FEED_VERSION' );
    }
}

if ( ! function_exists( 'wilmer_core_visual_composer_installed' ) ) {
	/**
	 * Function that checks if Visual Composer plugin installed
	 *
	 * @return bool
	 */
	function wilmer_core_visual_composer_installed() {
		return class_exists( 'WPBakeryVisualComposerAbstract' );
	}
}

if ( ! function_exists( 'wilmer_core_is_woocommerce_installed' ) ) {
	/**
	 * Function that checks if woocommerce is installed
	 *
	 * @return bool
	 */
	function wilmer_core_is_woocommerce_installed() {
		return function_exists( 'is_woocommerce' );
	}
}

if ( ! function_exists( 'wilmer_core_is_woocommerce_integration_installed' ) ) {
	//is Mikado Woocommerce Integration installed?
	function wilmer_core_is_woocommerce_integration_installed() {
		return defined( 'WILMER_CHECKOUT_INTEGRATION' );
	}
}

if ( ! function_exists( 'wilmer_core_is_revolution_slider_installed' ) ) {
	function wilmer_core_is_revolution_slider_installed() {
		return class_exists( 'RevSliderFront' );
	}
}

if ( ! function_exists( 'wilmer_core_is_wpml_installed' ) ) {
	/**
	 * Function that checks if WPML plugin is installed
	 * @return bool
	 *
	 * @version 0.1
	 */
	function wilmer_core_is_wpml_installed() {
		return defined( 'ICL_SITEPRESS_VERSION' );
	}
}

if ( ! function_exists( 'wilmer_core_theme_menu' ) ) {
	/**
	 * Function that generates admin menu for options page.
	 * It generates one admin page per options page.
	 */
	function wilmer_core_theme_menu() {
		if ( wilmer_core_theme_installed() && wilmer_core_is_theme_registered() ) {
			
			global $wilmer_mikado_global_Framework;
			wilmer_mikado_init_theme_options();
			
			$page_hook_suffix = add_menu_page(
				esc_html__( 'Wilmer Options', 'wilmer-core' ),                                             // The value used to populate the browser's title bar when the menu page is active
				esc_html__( 'Wilmer Options', 'wilmer-core' ),                                             // The text of the menu in the administrator's sidebar
				'administrator',                                                                               // What roles are able to access the menu
				MIKADO_OPTIONS_SLUG,                                                                             // The ID used to bind submenu items to this menu
				array( $wilmer_mikado_global_Framework->getSkin(), 'renderOptions' ),                         // The callback function used to render this menu
				$wilmer_mikado_global_Framework->getSkin()->getSkinURI() . '/assets/img/admin-logo-icon.png', // Icon For menu Item
				4                                                                                            // Position
			);
			
			foreach ( $wilmer_mikado_global_Framework->mkdOptions->adminPages as $key => $value ) {
				$slug = ! empty( $value->slug ) ? '_tab' . $value->slug : '';
				
				$subpage_hook_suffix = add_submenu_page(
					MIKADO_OPTIONS_SLUG,
					esc_html__( 'Wilmer Options - ', 'wilmer-core' ) . $value->title, // The value used to populate the browser's title bar when the menu page is active
					$value->title,                                                        // The text of the menu in the administrator's sidebar
					'administrator',                                                      // What roles are able to access the menu
					MIKADO_OPTIONS_SLUG . $slug,                                            // The ID used to bind submenu items to this menu
					array( $wilmer_mikado_global_Framework->getSkin(), 'renderOptions' )
				);
				
				add_action( 'admin_print_scripts-' . $subpage_hook_suffix, 'wilmer_mikado_enqueue_admin_scripts' );
				add_action( 'admin_print_styles-' . $subpage_hook_suffix, 'wilmer_mikado_enqueue_admin_styles' );
			};
			
			add_action( 'admin_print_scripts-' . $page_hook_suffix, 'wilmer_mikado_enqueue_admin_scripts' );
			add_action( 'admin_print_styles-' . $page_hook_suffix, 'wilmer_mikado_enqueue_admin_styles' );
		}
	}
	
	add_action( 'admin_menu', 'wilmer_core_theme_menu' );
}

if ( ! function_exists( 'wilmer_core_theme_menu_backup_options' ) ) {
	/**
	 * Function that generates admin menu for options page.
	 * It generates one admin page per options page.
	 */
	function wilmer_core_theme_menu_backup_options() {
		if ( wilmer_core_theme_installed() ) {
			global $wilmer_mikado_global_Framework;
			
			$slug             = "_backup_options";
			$page_hook_suffix = add_submenu_page(
				MIKADO_OPTIONS_SLUG,
				esc_html__( 'Wilmer Options - Backup Options', 'wilmer-core' ), // The value used to populate the browser's title bar when the menu page is active
				esc_html__( 'Backup Options', 'wilmer-core' ),                // The text of the menu in the administrator's sidebar
				'administrator',                                             // What roles are able to access the menu
				MIKADO_OPTIONS_SLUG . $slug,                     // The ID used to bind submenu items to this menu
				array( $wilmer_mikado_global_Framework->getSkin(), 'renderBackupOptions' )
			);
			
			add_action( 'admin_print_scripts-' . $page_hook_suffix, 'wilmer_mikado_enqueue_admin_scripts' );
			add_action( 'admin_print_styles-' . $page_hook_suffix, 'wilmer_mikado_enqueue_admin_styles' );
		}
	}
	
	add_action( 'admin_menu', 'wilmer_core_theme_menu_backup_options' );
}

if ( ! function_exists( 'wilmer_core_theme_admin_bar_menu_options' ) ) {
	/**
	 * Add a link to the WP Toolbar
	 */
	function wilmer_core_theme_admin_bar_menu_options( $wp_admin_bar ) {
		if ( wilmer_core_theme_installed() && current_user_can( 'edit_theme_options' ) && wilmer_core_is_theme_registered() ) {
			global $wilmer_mikado_global_Framework;
			
			$args = array(
				'id'    => 'wilmer-admin-bar-options',
				'title' => sprintf( '<span class="ab-icon dashicons-before dashicons-admin-generic"></span> %s', esc_html__( 'Wilmer Options', 'wilmer-core' ) ),
				'href'  => esc_url( admin_url( 'admin.php?page=' . MIKADO_OPTIONS_SLUG ) )
			);
			
			$wp_admin_bar->add_node( $args );
			
			foreach ( $wilmer_mikado_global_Framework->mkdOptions->adminPages as $key => $value ) {
				$suffix = ! empty( $value->slug ) ? '_tab' . $value->slug : '';
				
				$args = array(
					'id'     => 'wilmer-admin-bar-options-' . $suffix,
					'title'  => $value->title,
					'parent' => 'wilmer-admin-bar-options',
					'href'   => esc_url( admin_url( 'admin.php?page=' . MIKADO_OPTIONS_SLUG . $suffix ) )
				);
				
				$wp_admin_bar->add_node( $args );
			};
		}
	}
	
	add_action( 'admin_bar_menu', 'wilmer_core_theme_admin_bar_menu_options', 999 );
}

if ( ! function_exists( 'wilmer_core_enqueue_our_prettyphoto_scripts_for_theme' ) ) {
	/**
	 * Function that includes our prettyphoto script
	 */
	function wilmer_core_enqueue_our_prettyphoto_scripts_for_theme() {
		
		if ( wilmer_core_theme_installed() && wilmer_core_visual_composer_installed() ) {
			wp_deregister_script( 'prettyphoto' );
			wp_enqueue_script( 'prettyphoto', MIKADO_ASSETS_ROOT . '/js/modules/plugins/jquery.prettyPhoto.js', array( 'jquery' ), false, true );
		}
	}
	
	add_action( 'wilmer_mikado_action_enqueue_third_party_scripts', 'wilmer_core_enqueue_our_prettyphoto_scripts_for_theme' );
}

if( ! function_exists( 'wilmer_core_is_theme_registered' ) ) {
    function wilmer_core_is_theme_registered() {
        return class_exists('WilmerCoreDashboard') ? WilmerCoreDashboard::get_instance()->is_theme_registered() : true;
    }
}