<?php

$shadow_counter = '';

if($skin == "transparent"){
    $shadow_counter = 'mkdf-shadow-counter';
}

?>
<div class="mkdf-counter-holder <?php echo esc_attr($shadow_counter); ?> <?php echo esc_attr($holder_classes); ?>" <?php echo wilmer_mikado_get_inline_attrs($counter_data); ?>>
	<div class="mkdf-counter-inner clearfix">
        <div class="mkdf-counter-number <?php echo esc_attr($shadow_counter); ?> clearfix">
            <?php if(!empty($digit)) { ?>
                <?php
                if($shadow_counter != ''){?>
                    <span class="mkdf-counter-background"  <?php echo wilmer_mikado_get_inline_style($outline_color); ?>><?php echo esc_html($digit); ?></span>
                <?php } ?>
                <span class="mkdf-counter <?php echo esc_attr($shadow_counter); ?> <?php echo esc_attr($type) ?>" <?php echo wilmer_mikado_get_inline_style($counter_styles); ?>><?php echo esc_html($digit); ?></span>
            <?php } ?>
        </div>
        <div class="mkdf-counter-content <?php echo esc_attr($shadow_counter); ?>">
            <?php if(!empty($text)) { ?>
                <p class="mkdf-counter-text" <?php echo wilmer_mikado_get_inline_style($counter_text_styles); ?>><?php echo esc_html($text); ?></p>
            <?php } ?>
            <?php if(!empty($title)) { ?>
                <<?php echo esc_attr($title_tag); ?> class="mkdf-counter-title" <?php echo wilmer_mikado_get_inline_style($counter_title_styles); ?>>
                    <?php echo esc_html($title); ?>
                </<?php echo esc_attr($title_tag); ?>>
            <?php } ?>
        </div>
	</div>
</div>