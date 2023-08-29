<div class="mkdf-full-screen-sections <?php echo esc_attr( $holder_classes ); ?>" <?php echo wilmer_mikado_get_inline_attrs( $holder_data ); ?>>
	<div class="mkdf-fss-wrapper">
		<?php echo do_shortcode( $content ); ?>
	</div>
	<?php if ( $enable_navigation === 'yes' ) { ?>
		<div class="mkdf-fss-nav-holder">
			<a id="mkdf-fss-nav-up" href="#"><span class='icon-arrows-up'></span></a>
			<a id="mkdf-fss-nav-down" href="#"><span class='icon-arrows-down'></span></a>
		</div>
	<?php } ?>
</div>