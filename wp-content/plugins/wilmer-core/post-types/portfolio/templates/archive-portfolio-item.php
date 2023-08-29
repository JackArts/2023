<?php
get_header();
wilmer_mikado_get_title();
do_action( 'wilmer_mikado_action_before_main_content' ); ?>
<div class="mkdf-container mkdf-default-page-template">
	<?php do_action( 'wilmer_mikado_action_after_container_open' ); ?>
	<div class="mkdf-container-inner clearfix">
		<?php
			$wilmer_taxonomy_id   = get_queried_object_id();
			$wilmer_taxonomy_type = is_tax( 'portfolio-tag' ) ? 'portfolio-tag' : 'portfolio-category';
			$wilmer_taxonomy      = ! empty( $wilmer_taxonomy_id ) ? get_term_by( 'id', $wilmer_taxonomy_id, $wilmer_taxonomy_type ) : '';
			$wilmer_taxonomy_slug = ! empty( $wilmer_taxonomy ) ? $wilmer_taxonomy->slug : '';
			$wilmer_taxonomy_name = ! empty( $wilmer_taxonomy ) ? $wilmer_taxonomy->taxonomy : '';
			
			wilmer_core_get_archive_portfolio_list( $wilmer_taxonomy_slug, $wilmer_taxonomy_name );
		?>
	</div>
	<?php do_action( 'wilmer_mikado_action_before_container_close' ); ?>
</div>
<?php get_footer(); ?>
