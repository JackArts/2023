<?php if ($enable_title === 'yes') {
	$title_tag = !empty($title_tag) ? $title_tag : 'h4';
	$title_styles = $this_object->getTitleStyles($params);
	?>
    <a href="<?php echo esc_url( $this_object->getItemLink() ); ?>">
	<<?php echo esc_attr($title_tag); ?> itemprop="name" class="mkdf-pli-title entry-title" <?php wilmer_mikado_inline_style($title_styles); ?>>
		<?php echo esc_attr(get_the_title()); ?>
	</<?php echo esc_attr($title_tag); ?>>
    </a>
<?php } ?>