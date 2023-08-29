<?php
$gallery_classes   = '';
$number_of_columns = wilmer_mikado_get_meta_field_intersect( 'portfolio_single_gallery_columns_number' );
if ( ! empty( $number_of_columns ) ) {
	$gallery_classes .= ' mkdf-' . $number_of_columns . '-columns';
}
$space_between_items = wilmer_mikado_get_meta_field_intersect( 'portfolio_single_gallery_space_between_items' );
if ( ! empty( $space_between_items ) ) {
	$gallery_classes .= ' mkdf-' . $space_between_items . '-space';
}
?>
<div class="mkdf-ps-image-holder mkdf-ps-gallery-images mkdf-ps-big mkdf-grid-list mkdf-disable-bottom-space <?php echo esc_attr($gallery_classes); ?>">
	<div class="mkdf-ps-image-inner mkdf-outer-space">
		<?php
		$media = wilmer_core_get_portfolio_single_media();
		
		if(is_array($media) && count($media)) : ?>
			<?php foreach($media as $single_media) : ?>
				<div class="mkdf-ps-image mkdf-item-space">
					<?php wilmer_core_get_portfolio_single_media_html($single_media); ?>
				</div>
			<?php endforeach; ?>
		<?php endif; ?>
	</div>
</div>
<div class="mkdf-grid-row mkdf-ps-big">
	<div class="mkdf-grid-col-9">

        <?php wilmer_core_get_cpt_single_module_template_part('templates/single/parts/title', 'portfolio', $item_layout); ?>

        <?php wilmer_core_get_cpt_single_module_template_part('templates/single/parts/content', 'portfolio', $item_layout); ?>

	</div>
	<div class="mkdf-grid-col-3">
		<div class="mkdf-ps-info-holder">
			<?php
            //get portfolio info section title
            wilmer_core_get_cpt_single_module_template_part('templates/single/parts/info-section-title', 'portfolio', '', array( 'title' => esc_attr__('Project Info', 'wilmer-core') ) );

			//get portfolio custom fields section
			wilmer_core_get_cpt_single_module_template_part('templates/single/parts/custom-fields', 'portfolio', $item_layout);
			
			//get portfolio categories section
			wilmer_core_get_cpt_single_module_template_part('templates/single/parts/categories', 'portfolio', $item_layout);
			
			//get portfolio date section
			wilmer_core_get_cpt_single_module_template_part('templates/single/parts/date', 'portfolio', $item_layout);
			
			//get portfolio tags section
			wilmer_core_get_cpt_single_module_template_part('templates/single/parts/tags', 'portfolio', $item_layout);
			
			//get portfolio share section
			wilmer_core_get_cpt_single_module_template_part('templates/single/parts/social', 'portfolio', $item_layout);
			?>
		</div>
	</div>
</div>