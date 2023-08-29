<?php if(wilmer_mikado_options()->getOptionValue('portfolio_single_hide_date') === 'yes') : ?>
    <div class="mkdf-ps-info-item mkdf-ps-date">
	    <?php wilmer_core_get_cpt_single_module_template_part('templates/single/parts/info-title', 'portfolio', '', array( 'title' => esc_attr__('Date:', 'wilmer-core') ) ); ?>
        <h6 itemprop="dateCreated" class="mkdf-ps-info-date entry-date updated"><?php the_time(get_option('date_format')); ?></h6>
        <meta itemprop="interactionCount" content="UserComments: <?php echo get_comments_number(wilmer_mikado_get_page_id()); ?>"/>
    </div>
<?php endif; ?>