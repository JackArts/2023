<div class="mkdf-crossfade-images">
	<?php if ( $link != '' ) { ?>
        <a class="mkdf-cfi-link" href="<?php echo esc_url( $link ) ?>" target="<?php echo esc_attr( $link_target ) ?>"></a>
	<?php } ?>
    <div class="mkdf-cfi-img-holder" style=" background-color: <?php echo esc_attr( $background_color ) ?>;">
        <div class="mkdf-cfi-img-holder-inner">
            <img src="<?php echo wp_get_attachment_url( $initial_image, 'full' ); ?>" alt="<?php esc_attr__( 'Initial image', 'wilmer-core' ); ?>"/>
            <div class="mkdf-cfi-image-hover" style="background-image: url(<?php echo wp_get_attachment_url( $hover_image, 'full' ); ?>);"></div>
        </div>
    </div>
	<?php if ( $title != '' ) { ?>
        <div class="mkdf-cfi-title-holder">
            <h3 class="mkdf-cfi-title"><?php echo esc_attr( $title ) ?></h3>
        </div>
	<?php } ?>
</div>