<div class="mkdf-fsis-item">
	<div class="mkdf-fsis-image" <?php wilmer_mikado_inline_style( $image_styles ); ?>>
		<div class="mkdf-fsis-image-wrapper">
			<div class="mkdf-fsis-image-inner">
				<?php if ( ! empty( $image_top ) ) { ?>
					<div class="mkdf-fsis-content-image mkdf-fsis-image-top">
						<?php echo wp_get_attachment_image( $image_top, 'full' ); ?>
					</div>
				<?php } ?>
				<?php if ( ! empty( $image_left ) ) { ?>
					<div class="mkdf-fsis-content-image mkdf-fsis-image-left">
						<?php echo wp_get_attachment_image( $image_left, 'full' ); ?>
					</div>
				<?php } ?>
				<?php if ( ! empty( $image_right ) ) { ?>
					<div class="mkdf-fsis-content-image mkdf-fsis-image-right">
						<?php echo wp_get_attachment_image( $image_right, 'full' ); ?>
					</div>
				<?php } ?>
				<?php if ( ! empty( $title ) ) { ?>
					<<?php echo esc_attr( $title_tag ); ?> class="mkdf-fsis-title" <?php echo wilmer_mikado_get_inline_style( $title_styles ); ?>><?php echo wp_kses( $title, array( 'br' => true ) ); ?></<?php echo esc_attr( $title_tag ); ?>>
				<?php } ?>
				<?php if ( ! empty( $subtitle ) ) { ?>
					<<?php echo esc_attr( $subtitle_tag ); ?> class="mkdf-fsis-subtitle" <?php echo wilmer_mikado_get_inline_style( $subtitle_styles ); ?>><?php echo wp_kses( $subtitle, array( 'br' => true ) ); ?></<?php echo esc_attr( $subtitle_tag ); ?>>
				<?php } ?>
			</div>
		</div>
	</div>
	<div class="mkdf-fsis-frame mkdf-fsis-frame-top"></div>
	<div class="mkdf-fsis-frame mkdf-fsis-frame-right"></div>
	<div class="mkdf-fsis-frame mkdf-fsis-frame-bottom"></div>
	<div class="mkdf-fsis-frame mkdf-fsis-frame-left"></div>
</div>