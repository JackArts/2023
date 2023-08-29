<?php
if ( ! function_exists( 'wilmer_core_dashboard_load_files' ) ) {
	function wilmer_core_dashboard_load_files() {
		require_once WILMER_CORE_ABS_PATH . '/core-dashboard/core-dashboard.php';
		require_once WILMER_CORE_ABS_PATH . '/core-dashboard/rest/include.php';
		require_once WILMER_CORE_ABS_PATH . '/core-dashboard/registration-rest.php';
		require_once WILMER_CORE_ABS_PATH . '/core-dashboard/core-dashboard-theme-validation.php';
		require_once WILMER_CORE_ABS_PATH . '/core-dashboard/sub-pages/sub-page.php';

		foreach (glob(WILMER_CORE_ABS_PATH . '/core-dashboard/sub-pages/*/load.php') as $subpages) {
			include_once $subpages;
		}
	}

	add_action('after_setup_theme', 'wilmer_core_dashboard_load_files');
}