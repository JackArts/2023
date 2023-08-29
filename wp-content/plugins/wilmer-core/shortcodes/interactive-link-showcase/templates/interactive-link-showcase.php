<div class="mkdf-ils-holder <?php echo esc_attr( $holder_classes ); ?>">
	<?php if ( ! empty( $link_items ) ) { ?>
		<div class="mkdf-ils-image-holder" <?php wilmer_mikado_inline_style( $image_holder_styles ); ?>>
			<?php foreach ( $link_items as $link_item ): ?>
				<?php if ( isset( $link_item['image'] ) ) { ?>
					<?php
						$item_style   = array();
						$item_style[] = 'background-image: url(' . wp_get_attachment_url( $link_item['image'] ) . ')';
					?>
					<div class="mkdf-ils-item-image" <?php wilmer_mikado_inline_style( $item_style ); ?>>
						<?php echo wp_get_attachment_image( $link_item['image'], 'full' ); ?>
					</div>
				<?php } ?>
			<?php endforeach; ?>
		</div>
		<div class="mkdf-ils-content-holder">
			<div class="mkdf-ils-content-inner">
				<div class="mkdf-ils-item-content">
					<?php
						$i = 0;
						
						foreach ( $link_items as $link_item ): ?>
						<?php if ( isset( $link_item['title'] ) ) { ?>
							<a itemprop="url" class="mkdf-ils-item-link" data-index="<?php echo esc_attr($i); ?>" href="<?php echo esc_url( $link_item['link'] ); ?>" target="<?php echo esc_attr( $link_target ); ?>">
								<span class="mkdf-ils-item-title"><?php echo esc_html( $link_item['title'] ); ?></span>
							</a>
						<?php
						$i++;
						} ?>
					<?php endforeach; ?>
				</div>
			</div>
		</div>
	<?php } ?>
</div>