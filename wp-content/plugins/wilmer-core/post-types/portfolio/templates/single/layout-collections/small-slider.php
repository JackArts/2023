<div class="mkdf-grid-row mkdf-ps-small">
	<div class="mkdf-grid-col-9">
		<div class="mkdf-ps-image-holder">
			<div class="mkdf-ps-image-inner mkdf-owl-slider">
				<?php
				$media = wilmer_core_get_portfolio_single_media();
				
				if(is_array($media) && count($media)) : ?>
					<?php foreach($media as $single_media) : ?>
						<div class="mkdf-ps-image">
							<?php wilmer_core_get_portfolio_single_media_html($single_media); ?>
						</div>
					<?php endforeach; ?>
				<?php endif; ?>
			</div>
		</div>
	</div>
	<div class="mkdf-grid-col-3">
		<div class="mkdf-ps-info-holder">
            <?php
            //get portfolio title section
            wilmer_core_get_cpt_single_module_template_part('templates/single/parts/title', 'portfolio', $item_layout);
            //get portfolio content section
            wilmer_core_get_cpt_single_module_template_part('templates/single/parts/content', 'portfolio', $item_layout);

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