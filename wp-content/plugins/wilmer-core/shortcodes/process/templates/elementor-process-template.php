<div class="mkdf-process-holder <?php echo esc_attr( $holder_classes ); ?>">
	<div class="mkdf-mark-horizontal-holder">
		<?php for ( $i = 1; $i <= $number_of_items; $i ++ ) { ?>
			<div class="mkdf-process-mark">
				<div class="mkdf-process-line"></div>
				<div class="mkdf-process-circle"><?php echo esc_attr( $i ); ?></div>
			</div>
		<?php } ?>
	</div>
	<div class="mkdf-mark-vertical-holder">
		<?php for ( $i = 1; $i <= $number_of_items; $i ++ ) { ?>
			<div class="mkdf-process-mark">
				<div class="mkdf-process-line"></div>
				<div class="mkdf-process-circle"><?php echo esc_attr( $i ); ?></div>
			</div>
		<?php } ?>
	</div>
	<div class="mkdf-process-inner">
        <?php foreach ( $params['process_item'] as $pi ) {

            $pi['holder_classes'] = $this_object->getItemHolderClasses( $pi );
            $pi['title_styles']   = $this_object->getItemTitleStyles( $pi );
            $pi['text_styles']    = $this_object->getItemTextStyles( $pi );

            echo wilmer_core_get_shortcode_module_template_part( 'templates/process-item-template', 'process', '', $pi );
        } ?>
	</div>
</div>