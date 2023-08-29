<?php if(wilmer_mikado_options()->getOptionValue('portfolio_single_hide_pagination') !== 'yes') : ?>
    <?php
    $back_to_link = get_post_meta(get_the_ID(), 'portfolio_single_back_to_link', true);
    $nav_same_category = wilmer_mikado_options()->getOptionValue('portfolio_single_nav_same_category') == 'yes';
    ?>
    <div class="mkdf-ps-navigation">
        <?php if(get_previous_post() !== '') : ?>
            <div class="mkdf-ps-prev">
                <?php if($nav_same_category) {
	                previous_post_link('%link','<span class="mkdf-ps-nav-mark arrow_carrot-left"></span><span class="mkdf-ps-nav-label">'.esc_html__('Previous Project', 'wilmer-core').'</span>', true, '', 'portfolio-category');
                } else {
	                previous_post_link('%link','<span class="mkdf-ps-nav-mark arrow_carrot-left"></span></span><span class="mkdf-ps-nav-label">'.esc_html__('Previous Project', 'wilmer-core').'</span>');
                } ?>
            </div>
        <?php endif; ?>

        <?php if($back_to_link !== '') : ?>
            <div class="mkdf-ps-back-btn">
                <a itemprop="url" href="<?php echo esc_url(get_permalink($back_to_link)); ?>">
                    <span class="social_flickr"></span>
                </a>
            </div>
        <?php endif; ?>

        <?php if(get_next_post() !== '') : ?>
            <div class="mkdf-ps-next">
                <?php if($nav_same_category) {
                    next_post_link('%link', '<span class="mkdf-ps-nav-label">'.esc_html__('Next Project', 'wilmer-core').'</span><span class="mkdf-ps-nav-mark arrow_carrot-right"></span>', true, '', 'portfolio-category');
                } else {
                    next_post_link('%link', '<span class="mkdf-ps-nav-label">'.esc_html__('Next Project', 'wilmer-core').'</span><span class="mkdf-ps-nav-mark arrow_carrot-right"></span>');
                } ?>
            </div>
        <?php endif; ?>
    </div>
<?php endif; ?>