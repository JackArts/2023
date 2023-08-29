<?php
$categories   = wp_get_post_terms(get_the_ID(), 'portfolio-category');
if(is_array($categories) && count($categories)) : ?>
    <div class="mkdf-pvl-info-item mkdf-pvl-categories">
        <?php echo wilmer_core_get_cpt_shortcode_module_template_part('portfolio', 'portfolio-vertical-loop', 'parts/info-title', 'standard', array( 'title' => esc_attr__('Category:', 'wilmer-core') )); ?>
        <?php foreach($categories as $cat) { ?>
            <a itemprop="url" class="mkdf-pvl-info-category" href="<?php echo esc_url(get_term_link($cat->term_id)); ?>"><?php echo esc_html($cat->name); ?></a>
        <?php } ?>
    </div>
<?php endif; ?>

