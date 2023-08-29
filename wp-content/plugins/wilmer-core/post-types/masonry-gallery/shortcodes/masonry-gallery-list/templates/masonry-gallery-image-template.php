<article class="mkdf-item-space <?php echo esc_attr($item_classes) ?>">
	<div class="mkdf-mg-content">
		<?php if (has_post_thumbnail()) { ?>
            <?php echo wilmer_mikado_get_formated_output($item_image);?>
		<?php } ?>
        <?php if (!empty($item_link)) { ?>
            <a itemprop="url" href="<?php echo esc_url($item_link); ?>" target="<?php echo esc_attr($item_link_target); ?>" class="mkdf-mg-item-link"></a>
        <?php } ?>
	</div>
</article>