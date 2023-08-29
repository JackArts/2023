<button type="submit" <?php wilmer_mikado_inline_style($button_styles); ?> <?php wilmer_mikado_class_attribute($button_classes); ?> <?php echo wilmer_mikado_get_inline_attrs($button_data); ?> <?php echo wilmer_mikado_get_inline_attrs($button_custom_attrs); ?>>
    <span class="mkdf-btn-text"><?php echo esc_html($text); ?></span>
    <?php echo wilmer_mikado_icon_collections()->renderIcon($icon, $icon_pack); ?>
</button>