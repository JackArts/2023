<div class="mkdf-pvl-info-item mkdf-pvl-date">
    <?php echo wilmer_core_get_cpt_shortcode_module_template_part('portfolio', 'portfolio-vertical-loop', 'parts/info-title', 'standard', array( 'title' => esc_attr__('Date:', 'wilmer-core') )); ?>
    <p itemprop="dateCreated" class="mkdf-pvl-info-date entry-date updated"><?php the_time(get_option('date_format')); ?></p>
    <meta itemprop="interactionCount" content="UserComments: <?php echo get_comments_number(wilmer_mikado_get_page_id()); ?>"/>
</div>
