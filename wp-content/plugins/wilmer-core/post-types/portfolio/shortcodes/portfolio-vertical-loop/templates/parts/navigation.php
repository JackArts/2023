<?php
$back_to_link = get_post_meta(get_the_ID(), 'portfolio_single_back_to_link', true);

$portfolio_items_args = array(
    'posts_per_page'     => 1,
    'order'              => 'DSC',
    'post_status'        => 'publish',
    'post_type'          => 'portfolio-item',
    'orderby'            => 'date'
);

?>
<div class="mkdf-pvl-navigation">
    <div class="mkdf-pvl-prev">
        <?php
        if($category !== '' && $category !== null) {
            if (get_adjacent_post(true, '', true, 'portfolio-category')) {
                previous_post_link('%link', 'Previous Project', true, '', 'portfolio-category');
            } else {
                $portfolio_items_args['portfolio-category'] = $category;
                $portfolio_items = get_posts($portfolio_items_args); ?>
                <a href="<?php echo get_permalink($portfolio_items[0]->ID); ?>">
                    <?php echo esc_html__('Previous Project', 'wilmer-core'); ?>
                </a>
            <?php }
        } else {
            if (get_adjacent_post(false, '', true)) {
                previous_post_link('%link', 'Previous Project');
            } else {
                $portfolio_items = get_posts($portfolio_items_args); ?>
                <a href="<?php echo get_permalink($portfolio_items[0]->ID); ?>">
                    <?php echo esc_html__('Previous Project', 'wilmer-core'); ?>
                </a>
            <?php }
        }
        ?>
    </div>

    <?php if ($back_to_link !== '') : ?>
        <div class="mkdf-pvl-back-btn">
            <a itemprop="url" href="<?php echo esc_url(get_permalink($back_to_link)); ?>">
                <?php echo esc_html__('Return', 'wilmer-core'); ?>
            </a>
        </div>
    <?php endif; ?>

    <div class="mkdf-pvl-next">
        <?php if($category !== '' && $category !== null) {
            if (get_adjacent_post(true, '', false, 'portfolio-category')) {
                next_post_link('%link', 'Next Project', true, '', 'portfolio-category');
            } else {
                $portfolio_items_args['portfolio-category'] = $category;
                $portfolio_items_args['order'] = 'ASC';
                $portfolio_items = get_posts($portfolio_items_args);
                ?>
                <a href="<?php echo get_permalink($portfolio_items[0]->ID); ?>">
                    <?php echo esc_html__('Next Project', 'wilmer-core'); ?>
                </a>
            <?php }
        } else {
            if (get_adjacent_post(false, '', false)) {
                next_post_link('%link', 'Next Project');
            } else {
                $portfolio_items_args['order'] = 'ASC';
                $portfolio_items = get_posts($portfolio_items_args); ?>
                <a href="<?php echo get_permalink($portfolio_items[0]->ID); ?>">
                    <?php echo esc_html__('Next Project', 'wilmer-core'); ?>
                </a>
            <?php }
        }
        ?>
    </div>
</div>