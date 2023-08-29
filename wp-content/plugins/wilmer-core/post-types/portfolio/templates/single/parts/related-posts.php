<?php

$show_related_posts = wilmer_mikado_options()->getOptionValue('portfolio_single_related_posts') == 'yes' ? true : false;

$post_id = get_the_ID();
$portfolio_type = wilmer_mikado_get_meta_field_intersect('portfolio_single_template', $post_id);

    if (strpos($portfolio_type,'small') === false) {
        $number_of_items = 4;
    }
    else{
        $number_of_items = 3;
    }

$related_posts = wilmer_core_get_portfolio_single_related_posts($post_id, $number_of_items);

?>
<?php if($show_related_posts) { ?>
    <div class="mkdf-ps-related-posts-holder">
        <?php
            //get portfolio info section title
            wilmer_core_get_cpt_single_module_template_part('templates/single/parts/info-section-title', 'portfolio', '', array( 'title' => esc_attr__('Related projects', 'wilmer-core'), 'title_tag' => 'h3' ) );
        ?>
        <div class="mkdf-ps-related-posts">
            <?php
	            if ( $related_posts && $related_posts->have_posts() ) :
	                while ( $related_posts->have_posts() ) : $related_posts->the_post(); ?>
	                <?php $post_id = get_the_ID(); ?>
                        <div class="mkdf-ps-related-post mkdf-ps-related-posts-<?php echo $number_of_items; ?>">
			                <?php if(has_post_thumbnail()) { ?>
		                        <div class="mkdf-ps-related-image">
			                        <a itemprop="url" href="<?php the_permalink(); ?>">
				                        <?php the_post_thumbnail('full'); ?>
			                        </a>
	                            </div>
			                <?php } ?>
	                        <div class="mkdf-ps-related-text">
		                        <?php $categories = wp_get_post_terms($post_id, 'portfolio-category'); ?>
		                        <?php if(!empty($categories)) { ?>
			                        <div class="mkdf-ps-related-categories">
				                        <?php foreach ($categories as $cat) { ?>
					                        <a itemprop="url" class="mkdf-ps-related-category" href="<?php echo esc_url(get_term_link($cat->term_id)); ?>"><?php echo esc_html($cat->name); ?></a>
				                        <?php } ?>
			                        </div>
		                        <?php } ?>
                                <h4 itemprop="name" class="mkdf-ps-related-title entry-title">
                                    <a itemprop="url" href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                </h4>
	                        </div>
                        </div>
	                <?php
	                endwhile;
	            endif;
            
                wp_reset_postdata();
            ?>
        </div>
    </div>
<?php } ?>
