<?php
$tags = wp_get_post_terms(get_the_ID(), 'portfolio-tag');
$tag_names = array();

if(is_array($tags) && count($tags)) : ?>
    <div class="mkdf-pvl-info-item mkdf-pvl-tags">
        <?php foreach($tags as $tag) { ?>
            <a itemprop="url" class="mkdf-pvl-info-tag" href="<?php echo esc_url(get_term_link($tag->term_id)); ?>"><?php echo esc_html($tag->name); ?></a>
        <?php } ?>
    </div>
<?php endif; ?>