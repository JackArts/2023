<div class="mkdf-horizontal-timeline" data-distance="<?php echo esc_attr( $distance ); ?>">
	<div class="mkdf-ht-nav">
		<div class="mkdf-ht-nav-wrapper">
			<div class="mkdf-ht-nav-inner">
				<ol>
                    <?php foreach ( $dates as $date ) { ?>
                        <li>
                            <a href="#" data-date="<?php echo esc_attr( $date['formatted'] ); ?>"><?php echo esc_html( $date['date_label'] ); ?></a>
                        </li>
                    <?php } ?>
				</ol>
				<span class="mkdf-ht-nav-filling-line" aria-hidden="true"></span>
			</div>
		</div>
		<ul class="mkdf-ht-nav-navigation">
			<li><a href="#" class="mkdf-prev mkdf-inactive"></a></li>
			<li><a href="#" class="mkdf-next"></a></li>
		</ul>
	</div>
	<div class="mkdf-ht-content">
		<ol>
            <?php foreach ( $horizontal_timeline_item as $item) { ?>
                <li data-date="<?php echo esc_attr( $item['date'] ); ?>">
                    <div class="mkdf-hti-content-inner <?php echo esc_attr( $this_object->getItemHolderClasses($item) ); ?>">
                        <?php if ( ! empty(  $item['content_image'] ) ): ?>
                            <div class="mkdf-hti-content-image">
                                <?php echo wp_get_attachment_image( $item['content_image']['id'], 'full' ); ?>
                            </div>
                        <?php endif; ?>
                        <div class="mkdf-hti-content-value">
                            <?php echo Elementor\Plugin::instance()->frontend->get_builder_content_for_display($item['template_id']) ?>
                        </div>
                    </div>
                </li>
            <?php } ?>
		</ol>
	</div>
</div>