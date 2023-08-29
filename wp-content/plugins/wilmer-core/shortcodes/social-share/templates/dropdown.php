<div class="mkdf-social-share-holder mkdf-dropdown <?php echo esc_attr( $dropdown_class ); ?>">
	<a class="mkdf-social-share-dropdown-opener" href="javascript:void(0)">
		<span class="mkdf-social-share-title"><?php echo ! empty( $title ) ? esc_html( $title ) : esc_html__( 'Share', 'wilmer-core' ); ?></span>
		<i class="social_share"></i>
	</a>
	<div class="mkdf-social-share-dropdown">
		<ul>
			<?php foreach ( $networks as $net ) {
				echo wp_kses( $net, array(
					'li'   => array(
						'class' => true
					),
					'a'    => array(
						'itemprop' => true,
						'class'    => true,
						'href'     => true,
						'target'   => true,
						'onclick'  => true
					),
					'img'  => array(
						'itemprop' => true,
						'class'    => true,
						'src'      => true,
						'alt'      => true
					),
					'span' => array(
						'class' => true
					)
				) );
			} ?>
		</ul>
	</div>
</div>