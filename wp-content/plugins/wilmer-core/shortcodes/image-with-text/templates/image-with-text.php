<div class="mkdf-image-with-text-holder <?php echo esc_attr($holder_classes); ?>">
    <div class="mkdf-iwt-image">
        <?php if ($image_behavior === 'lightbox') { ?>
            <a itemprop="image" href="<?php echo esc_url($image['url']); ?>" data-rel="prettyPhoto[iwt_pretty_photo]" title="<?php echo esc_attr($image['alt']); ?>">
        <?php } else if ($image_behavior === 'custom-link' && !empty($custom_link)) { ?>
	            <a itemprop="url" href="<?php echo esc_url($custom_link); ?>" target="<?php echo esc_attr($custom_link_target); ?>">
        <?php } ?>
            <?php if(is_array($image_size) && count($image_size)) : ?>
                <?php echo wilmer_mikado_generate_thumbnail($image['image_id'], null, $image_size[0], $image_size[1]); ?>
            <?php else: ?>
                <?php echo wp_get_attachment_image($image['image_id'], $image_size); ?>
            <?php endif; ?>
        <?php if ($image_behavior === 'lightbox' || $image_behavior === 'custom-link') { ?>
            </a>
        <?php } ?>
    </div>
    <div class="mkdf-iwt-text-holder">
        <div class="mkdf-iwt-text-holder-inner">
            <?php if(!empty($title)) { ?>
                <<?php echo esc_attr($title_tag); ?> class="mkdf-iwt-title" <?php echo wilmer_mikado_get_inline_style($title_styles); ?>>
                     <?php if(!empty($custom_link)) { ?>
                        <a itemprop="url" href="<?php echo esc_url($custom_link); ?>" target="<?php echo esc_attr($custom_link_target); ?>">
                            <?php echo esc_html($title); ?>
                        </a>
                     <?php } else { ?>
                         <?php echo esc_html($title); ?>
                     <?php }  ?>
                </<?php echo esc_attr($title_tag); ?>>
            <?php } ?>
                <?php if ($image_behavior === 'custom-link' && !empty($custom_link)) { ?>
                    <?php
                    if(isset($type) && $type != 'links-on-hover') {
                        echo do_shortcode('[mkdf_button 
                                                 custom_class="mkdf-iwt-custom-link"
                                                 type="simple" 
                                                 text=""
                                                 link=' . $custom_link . '
                                                 target=' . $custom_link_target . '
                                                 
                                    ]');
                    }

                    ?>
                <?php } ?>
            <?php if(!empty($text)) { ?>
                <p class="mkdf-iwt-text" <?php echo wilmer_mikado_get_inline_style($text_styles); ?>><?php echo esc_html($text); ?></p>
            <?php } ?>
        </div>
    </div>
    <?php if(isset($type) && $type == 'links-on-hover') { ?>
        <div class="mkdf-iwt-text-links-holder">
            <?php
            if(!empty($custom_link_1) && !empty($custom_link_1_text)) {
                $button_1_params = array(
                    'custom_class'  => "mkdf-iwt-custom-link-2",
                    'type'         => "simple",
                    'text'         => $custom_link_1_text,
                    'link'         => $custom_link_1,
                    'target'       => $custom_link_1_target
                );

                echo wilmer_mikado_get_button_html($button_1_params);
            }
            if(!empty($custom_link_2) && !empty($custom_link_2_text)) {

                $button_2_params = array(
                    'custom_class'  => "mkdf-iwt-custom-link-2",
                    'type'         => "simple",
                    'text'         => $custom_link_2_text,
                    'link'         => $custom_link_2,
                    'target'       => $custom_link_2_target
                );

                echo wilmer_mikado_get_button_html($button_2_params);

            }
            ?>
        </div>
    <?php } ?>
</div>