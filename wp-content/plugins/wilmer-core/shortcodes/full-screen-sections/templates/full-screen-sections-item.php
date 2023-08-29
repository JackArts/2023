<div class="mkdf-fss-item <?php echo esc_attr($holder_classes); ?>" <?php echo wilmer_mikado_get_inline_attrs($holder_data); ?> <?php wilmer_mikado_inline_style($holder_styles); ?>>
	<div class="mkdf-fss-item-inner" <?php wilmer_mikado_inline_style($item_inner_styles); ?>>
		<?php echo do_shortcode($content); ?>
	</div>
	<?php if(!empty($link)) { ?>
		<a itemprop="url" class="mkdf-fss-item-link" href="<?php echo esc_url($link); ?>" target="<?php echo esc_attr($link_target); ?>"></a>
	<?php } ?>
</div>