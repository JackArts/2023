<div class="<?php echo esc_attr($content_classes); ?>" <?php echo wilmer_mikado_get_inline_attrs($content_data); ?> <?php wilmer_mikado_inline_style($content_style);?>>
	<?php echo do_shortcode($content); ?>
    <?php if( ! empty($background_text) ) { ?>
        <div class=" <?php echo esc_attr($bg_text_classes); ?>" <?php wilmer_mikado_inline_style($bg_text_styles);?>>
            <?php echo esc_html($background_text); ?>
        </div>
    <?php } ?>
</div>