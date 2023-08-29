<div class="mkdf-pli-image-holder" style="background-image: url('<?php echo get_the_post_thumbnail_url(get_the_ID()); ?>')">
</div>
<div class="mkdf-pli-text-holder">
    <div class="mkdf-pli-text-wrapper">
        <div class="mkdf-pli-text">
            <?php echo wilmer_core_get_cpt_shortcode_module_template_part('portfolio', 'portfolio-list', 'parts/category', $item_style, $params); ?>

            <?php echo wilmer_core_get_cpt_shortcode_module_template_part('portfolio', 'portfolio-list', 'parts/title', $item_style, $params); ?>

            <?php echo wilmer_core_get_cpt_shortcode_module_template_part('portfolio', 'portfolio-list', 'parts/excerpt', $item_style, $params); ?>

            <?php echo wilmer_core_get_cpt_shortcode_module_template_part('portfolio', 'portfolio-list', 'parts/read-more', $item_style, $params); ?>
        </div>
    </div>
</div>