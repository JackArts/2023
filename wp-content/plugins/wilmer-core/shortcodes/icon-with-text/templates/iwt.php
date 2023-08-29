<div <?php wilmer_mikado_class_attribute($holder_classes); ?> <?php echo wilmer_mikado_get_inline_attrs($icon_data); ?>>
	<div class="mkdf-iwt-icon">
		<?php if(!empty($link)) : ?>
			<a itemprop="url" href="<?php echo esc_url($link); ?>" target="<?php echo esc_attr($target); ?>">
		<?php endif; ?>
			<?php if(!empty($custom_icon)) : ?>
				<?php echo wp_get_attachment_image($custom_icon, 'full'); ?>
                <?php elseif(!empty($icon_custom_svg)) : ?>
                <?php echo wilmer_mikado_get_module_part(urldecode(base64_decode($icon_custom_svg))); ?>
			<?php else: ?>
				<?php echo wilmer_core_get_shortcode_module_template_part('templates/icon', 'icon-with-text', '', array('icon_parameters' => $icon_parameters)); ?>
			<?php endif; ?>
		<?php if(!empty($link)) : ?>
			</a>
		<?php endif; ?>
	</div>
	<div class="mkdf-iwt-content" <?php wilmer_mikado_inline_style($content_styles); ?>>
        <?php if(!empty($caption)) { ?>
            <p class="mkdf-iwt-caption" <?php wilmer_mikado_inline_style($caption_styles); ?>><?php echo esc_html($caption); ?></p>
        <?php } ?>
		<?php if(!empty($title)) { ?>
			<<?php echo esc_attr($title_tag); ?> class="mkdf-iwt-title" <?php wilmer_mikado_inline_style($title_styles); ?>>
				<?php if(!empty($link)) : ?>
					<a itemprop="url" href="<?php echo esc_url($link); ?>" target="<?php echo esc_attr($target); ?>">
				<?php endif; ?>
				<span class="mkdf-iwt-title-text"><?php echo esc_html($title); ?></span>
				<?php if(!empty($link)) : ?>
					</a>
				<?php endif; ?>
			</<?php echo esc_attr($title_tag); ?>>
		<?php } ?>
		<?php if(!empty($text)) { ?>
			<p class="mkdf-iwt-text" <?php wilmer_mikado_inline_style($text_styles); ?>><?php echo esc_html($text); ?></p>
		<?php } ?>
	</div>
</div>