<div class="mkdf-pie-chart-holder <?php echo esc_attr($holder_classes); ?>">
	<div class="mkdf-pc-percentage" <?php echo wilmer_mikado_get_inline_attrs($pie_chart_data); ?>>
		<span class="mkdf-pc-percent" <?php echo wilmer_mikado_get_inline_style($percent_styles); ?>><?php echo esc_html($percent); ?></span>
        <svg class="mkdf-pie-chart-svg" x="0px" y="0px" width="190px" height="190px" viewBox="0 0 190 190">
            <g>
                <path style="<?php echo esc_attr($svg_style); ?>" d="M95,1c51.832,0,94,42.168,94,94s-42.168,94-94,94S1,146.832,1,95S43.168,1,95,1 M95,0 C42.533,0,0,42.533,0,95s42.533,95,95,95s95-42.533,95-95S147.467,0,95,0L95,0z"/>
            </g>
        </svg>
    </div>
	<?php if(!empty($title) || !empty($text)) { ?>
		<div class="mkdf-pc-text-holder">
            <?php if(!empty($caption)) { ?>
                <p class="mkdf-caption-text" <?php echo wilmer_mikado_get_inline_style($caption_styles); ?>><?php echo esc_html($caption); ?></p>
            <?php } ?>
			<?php if(!empty($title)) { ?>
				<<?php echo esc_attr($title_tag); ?> class="mkdf-pc-title" <?php echo wilmer_mikado_get_inline_style($title_styles); ?>><?php echo esc_html($title); ?></<?php echo esc_attr($title_tag); ?>>
			<?php } ?>
			<?php if(!empty($text)) { ?>
				<p class="mkdf-pc-text" <?php echo wilmer_mikado_get_inline_style($text_styles); ?>><?php echo esc_html($text); ?></p>
			<?php } ?>
		</div>
	<?php } ?>
</div>