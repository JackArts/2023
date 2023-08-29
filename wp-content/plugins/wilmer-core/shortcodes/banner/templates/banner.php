<div class="mkdf-banner-holder <?php echo esc_attr($holder_classes); ?>">
    <div class="mkdf-banner-image">
        <?php echo wp_get_attachment_image($image, 'full'); ?>
    </div>
    <div class="mkdf-banner-text-holder" <?php echo wilmer_mikado_get_inline_style($overlay_styles); ?>>
	    <div class="mkdf-banner-text-outer">
		    <div class="mkdf-banner-text-inner">
		        <?php if(!empty($subtitle)) { ?>
		            <<?php echo esc_attr($subtitle_tag); ?> class="mkdf-banner-subtitle" <?php echo wilmer_mikado_get_inline_style($subtitle_styles); ?>>
			            <?php echo esc_html($subtitle); ?>
		            </<?php echo esc_attr($subtitle_tag); ?>>
		        <?php } ?>
		        <?php if(!empty($title)) { ?>
		            <<?php echo esc_attr($title_tag); ?> class="mkdf-banner-title" <?php echo wilmer_mikado_get_inline_style($title_styles); ?>>
		                <?php echo wp_kses($title, array('span' => array('class' => true))); ?>
	                </<?php echo esc_attr($title_tag); ?>>
		        <?php } ?>
				<?php if(!empty($link)) { ?>
                    <?php echo do_shortcode('[mkdf_button 
                                                          type                  = "simple"                                                          
                                                          text                  = ""
                                                          link                  = "'.esc_html($link).'"
                                                          target                = "'.esc_html($target).'"
                                                          color                 = "'.esc_html($link_color).'"                                                          
                                                          ]'
                    );?>
		        <?php } ?>
			</div>
		</div>
	</div>
	<?php if (!empty($link)) { ?>
        <a itemprop="url" class="mkdf-banner-link" href="<?php echo esc_url($link); ?>" target="<?php echo esc_attr($target); ?>"></a>
    <?php } ?>
<div class="mkdf-banner-bottom-line" <?php echo wilmer_mikado_get_inline_style($border_bottom_color); ?>></div>
</div>