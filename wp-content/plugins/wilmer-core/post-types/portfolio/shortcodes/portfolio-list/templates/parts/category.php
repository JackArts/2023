<?php if ($enable_category === 'yes') {
	$categories = wp_get_post_terms(get_the_ID(), 'portfolio-category');

	if(!empty($categories)) { ?>
		<h6 class="mkdf-pli-category-holder">
			<?php foreach ($categories as $cat) { ?>
				<a itemprop="url" class="mkdf-pli-category" href="<?php echo esc_url(get_term_link($cat->term_id)); ?>"><?php echo esc_html($cat->name); ?></a>
			<?php } ?>
		</h6>
	<?php } ?>
<?php } ?>