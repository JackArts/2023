<div class="mkdf-workflow <?php echo esc_attr($custom_clas) ?>">
    <span class="main-line" style="<?php echo esc_attr($main_line_style); ?>"></span>
    <?php echo do_shortcode( preg_replace('#^<\/p>|<p>$#', '', $content)); ?>
</div>