<div class="mkdf-ss-holder <?php echo esc_attr( $holder_classes ); ?>">
	<?php if ( ! empty( $image ) ) { ?>
		<div class="mkdf-ss-image" <?php echo wilmer_mikado_get_inline_style( $image_styles ); ?>>
			<?php echo wp_get_attachment_image( $image, 'full' ); ?>
		</div>
	<?php } ?>
	<div class="mkdf-ss-content">
        <div class="mkdf-ss-content-inner">
            <?php if ( ! empty( $upper_subtitle ) || ! empty( $upper_title ) ) { ?>
                <div class="mkdf-ss-top-content">
                    <?php if ( ! empty( $upper_subtitle ) ) { ?>
                        <h6 class="mkdf-ss-upper-subtitle">
                            <?php echo esc_html($upper_subtitle); ?>
                        </h6>
                    <?php } ?>

                    <?php if ( ! empty( $upper_title ) ) { ?>
                        <h1 class="mkdf-ss-upper-title">
                            <?php echo esc_html($upper_title); ?>
                        </h1>
                    <?php } ?>
                </div>
            <?php } ?>
            <?php if ( ! empty( $lower_subtitle ) || ! empty( $lower_title ) ) { ?>
                <div class="mkdf-ss-bottom-content">
                    <?php if ( ! empty( $lower_subtitle ) ) { ?>
                        <h6 class="mkdf-ss-lower-subtitle">
                            <?php echo esc_html($lower_subtitle); ?>
                        </h6>
                    <?php } ?>

                    <?php if ( ! empty( $lower_title ) ) { ?>
                        <h4 class="mkdf-ss-lower-title">
                            <?php echo esc_html($lower_title); ?>
                        </h4>
                    <?php } ?>
                </div>
            <?php } ?>
            <?php if ( ! empty( $button_text ) ): ?>
                <?php echo wilmer_mikado_get_button_html( array(
                    'custom_class'           => 'mkdf-ss-link-'.$button_skin,
                    'text'                   => esc_html( $button_text ),
                    'type'                   => 'simple',
                    'link'                   => ! empty( $button_link ) ? esc_url( $button_link ) : '#',
                    'target'                 => ! empty( $button_target ) ? esc_attr( $button_target ) : '_self',
                ) ); ?>
            <?php endif; ?>
        </div>
        <div class="mkdf-ss-background-holder" <?php echo wilmer_mikado_get_inline_style( $content_style ); ?>></div>
	</div>
    <?php if(! empty($centered_text) ) { ?>
        <div class="mkdf-item-background-text">
            <div class="mkdf-background-text-holder" style="<?php echo esc_attr($background_text_style);?>">
                <div class="mkdf-split-text-outer">
                    <span class="mkdf-split-text-left">
                        <span class="mkdf-split-text-left-inner">
                            <?php echo esc_html($centered_text); ?>
                        </span>
                    </span>
                    <span class="mkdf-split-text-right">
                        <span class="mkdf-split-text-right-inner">
                            <?php echo esc_html($centered_text); ?>
                        </span>
                    </span>
                </div>
            </div>
        </div>
    <?php } ?>
</div>