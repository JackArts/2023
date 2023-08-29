<article class="mkdf-item-space <?php echo esc_attr($item_classes) ?>">
	<div class="mkdf-mg-content">
        <div class="mkdf-mg-item-inner">
            <?php
            $content_style = array();
            $additional_class = '';
            if(! empty($background_color) ){
                $content_style[] = 'background-color: ' . $background_color;
            }
            if(! empty($item_padding) ){
                $content_style[] = 'padding: ' . $item_padding;
                $additional_class .= 'mkdf-mg-with-custom-padding';
            }
            ?>
            <div class="mkdf-mg-item-content <?php echo esc_attr($additional_class); ?>" style="<?php echo implode(';', $content_style); ?>">
                <?php if( $show_title == 'yes' ) { ?>
                    <?php if (!empty($item_title)) { ?>
                        <<?php echo esc_attr($item_title_tag); ?> itemprop="name" class="mkdf-mg-item-title entry-title"><?php echo esc_html($item_title); ?></<?php echo esc_attr($item_title_tag); ?>>
                    <?php } ?>
                <?php } ?>
                <?php if (!empty($item_content)) { ?>
                    <div class="mkdf-mg-item-text"><?php echo do_shortcode($item_content); ?></div>
                <?php } ?>
            </div>
            <?php if (!empty($item_link)) { ?>
                <a itemprop="url" href="<?php echo esc_url($item_link); ?>" target="<?php echo esc_attr($item_link_target); ?>" class="mkdf-mg-item-link"></a>
            <?php } ?>
        </div>
	</div>
</article>
