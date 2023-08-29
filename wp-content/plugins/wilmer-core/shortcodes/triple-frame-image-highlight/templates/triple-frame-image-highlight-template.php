<div class="mkdf-triple-frame-image-highlight-holder <?php echo esc_attr($holder_classes); ?>">
    <div class="mkdf-triple-frame-image-highlight">
        <div class="mkdf-tfih-inner">
            <?php 
                $images = array('centered', 'left', 'right');
            ?>
            <?php foreach ($images as $image) { ?>
                <div class="mkdf-tfih-image-holder mkdf-tfih-<?php echo "{$image}" ?>-image-holder">
                    <?php if($enable_frame == 'yes'){ ?>
                        <div class=mkdf-tfih-frame>
                            <div class="mkdf-tfih-top-bar">
                                <div class="mkdf-tfih-top-bar-left">
                                    <span class="mkdf-tfih-dot"></span>
                                    <span class="mkdf-tfih-dot"></span>
                                    <span class="mkdf-tfih-dot"></span>
                                </div>
                                <div class="mkdf-tfih-top-bar-right">
                                    <span class="mkdf-tfih-dot"></span>
                                    <span class="mkdf-tfih-dot"></span>
                                    <span class="mkdf-tfih-dot"></span>
                                </div>
                            </div>
                        </div>
                    <?php } ?>
                    <?php if (!empty(${$image.'_image_link'})) { ?>
                        <a class="mkdf-tfih-link" 
                            href="<?php echo esc_url(${$image.'_image_link'}) ?>" 
                            target="<?php echo esc_attr($link_target) ?>">
                        </a>
                    <?php } ?>
                    <img class="mkdf-tfih-<?php echo "{$image}" ?>-image" 
                        src="<?php echo wp_get_attachment_url(${$image.'_image'}); ?>" 
                        alt="<?php echo get_the_title(${$image.'_image'}) ?>" />
                </div>
            <?php } ?>
        </div>
        <div class="mkdf-tfih-left-trigger"></div>
        <div class="mkdf-tfih-right-trigger"></div>
    </div>
    <?php if ($enable_navigation == 'yes') { ?>
        <span class="mkdf-tfih-nav mkdf-tfih-left">
            <span class="arrow_carrot-left"></span>
        </span>
        <span class="mkdf-tfih-nav mkdf-tfih-right">
            <span class="arrow_carrot-right"></span>
        </span>
    <?php } ?>
</div>
