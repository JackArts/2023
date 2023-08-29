<?php
$holder_classes = "";

$holder_classes = $change_header_skin == 'yes' ? "mkdf-enabled-header-skin-change" : "" ;

?>

<div id="mkdf-animated-switch-slider" class="<?php echo esc_attr($holder_classes); ?>">
	<div class="mkdf-animated-switch-slider-inner">
        <?php if(!empty($slider_items)) { ?>
			<?php $i = 1; $pagination_initial_skin = ''; ?>
            <?php foreach($slider_items as $item): ?>
            <div class="mkdf-switch-slide mkdf-slide-<?php echo $item['item_skin'] ?>-skin mkdf-<?php echo esc_attr($item['header_skin']); ?>-header" data-index="<?php echo esc_attr($i); ?>">
	            <div class="mkdf-content-holder">
		            <div class="mkdf-content-holder-inner">
	                	<div class="mkdf-item-text-holder mkdf-<?php echo esc_attr($item['item_skin']); ?>" >
	                		<div class="mkdf-item-text-holder-inner">
			                	<div class="mkdf-text-top">
			                		<?php if(!empty($item['upper_subtitle']) || !empty($item['upper_title'])) { ?>
				                		<div class="mkdf-item-title-holder">
				                			<div class="mkdf-item-title">
				                				<?php if (!empty($item['upper_subtitle'])) { ?>
				                					<h6 class="mkdf-upper-subtitle"><?php echo esc_attr($item['upper_subtitle']); ?></h6>
				                				<?php } if (!empty($item['upper_title'])) { ?>
				                					<h1 class="mkdf-upper-title"><?php echo esc_attr($item['upper_title']); ?></h1>
				                				<?php } ?>
				                			</div>
				                		</div>
			                		<?php } ?>
			                	</div>
			                	<div class="mkdf-text-bottom">
			                		<?php if(!empty($item['lower_subtitle'])) { ?>
                                        <h6 class="mkdf-item-lower-subtitle">
                                            <?php echo esc_attr($item['lower_subtitle']); ?>
                                        </h6>
			                		<?php } ?>
                                    <?php if(!empty($item['lower_title'])) { ?>
                                        <h4 class="mkdf-item-lower-title">
                                            <?php echo esc_attr($item['lower_title']); ?>
                                        </h4>
			                		<?php } ?>
			                		<div class="mkdf-btn-holder mkdf-btn-<?php echo esc_attr($item['link_skin']); ?>">
				                		<?php if(!empty($item['link'])) { ?>
			    							<?php echo wilmer_mikado_get_button_html(array(
			    								'link' => $item['link'],
			    								'text' => $item['link_text'],
			    								'target' => '_self',
			    								'type' => 'simple',
			    		                        'size' => 'medium',
			    		                        'custom_class' => 'mkdf-item-btn mkdf-btn-custom-hover-color'
			    							)); ?>
				                		<?php } ?>
			                		</div>
			                	</div>
		                	</div>
	                	</div>
		            </div>
	            </div>
                <?php if (!empty($item['centered_text'])) { ?>
                    <?php
                    $centered_text_outline_color = ! empty( $item['centered_text_outline_color'] ) ? $item['centered_text_outline_color'] : '#d2d2d4';
                    $outline_text_style= '';
                    if(! empty($centered_text_outline_color) ){
                        $outline_text_style .= '-webkit-text-stroke-color: ' . $centered_text_outline_color;
                    }
                    ?>
                	<div class="mkdf-item-background-text" data-index="<?php echo esc_attr($i); ?>">
						<div class="mkdf-background-text-holder" style="<?php echo esc_attr( $outline_text_style ); ?>">
                            <span class="mkdf-split-text-outer">
								<span class="mkdf-split-text-left-outer">
									<span class="mkdf-split-text-left">
										<?php echo $item['centered_text']; ?>
									</span>
								</span>
                                <span class="mkdf-split-text-right">
                                    <span class="mkdf-split-text-right-inner">
                                        <?php echo $item['centered_text']; ?>
                                    </span>
                                </span>
                            </span>
						</div>
						<!--<div class="mkdf-text-holder mkdf-text-holder-right">
							<div class="mkdf-item-text mkdf-item-text-right">
                                <?php /*echo $item['centered_text']; */?>
                            </div>
						</div>-->
                	</div>
            	<?php } ?>
                <?php
                    $style = array();
                    if(!empty($item['background_color'])){
                        $style[] = 'background-color: ' . $item['background_color'];
                    }
                ?>
                <?php
                if($i == 1){
                    $pagination_initial_skin = $item['item_skin'];
                }
                ?>
			    <div class="mkdf-item-overlay mkdf-<?php echo esc_attr($item['item_skin']); ?>" <?php wilmer_mikado_inline_style(implode('; ', $style)) ?>></div>
				<?php if(!empty($item['background_image'])) { ?>
		            <div class="mkdf-background-images-holder">
		            	<?php 
		                	$bgrnd_img_style = '';
		                	$bgrnd_img_style .= "background-image: url(" . wp_get_attachment_url($item['background_image']) . ");"; 
		            	?>
		            	<div class="mkdf-item-background-image" <?php echo wilmer_mikado_get_inline_style($bgrnd_img_style); ?> ></div>
		            </div>
	            <?php } ?>
            </div>
            <?php $i++; ?>
	        <?php endforeach ?>
        <?php } ?>
	</div>
    <div class="mkdf-animated-switch-slider-pagination-holder">
        <div class="mkdf-animated-switch-slider-pagination mkdf-<?php echo esc_attr($pagination_initial_skin); ?>-skin">
            <?php foreach($slider_items as $key => $value){ ?>
                <?php
                $button_classes = 'mkdf-animated-ss-button';
                if( $key == 0 ){
                    $button_classes .= ' mkdf-active';
                }
                ?>
                <span class="<?php echo esc_attr($button_classes); ?>" data-index="<?php echo esc_attr($key+1); ?>"></span>
            <?php } ?>
        </div>
    </div>
</div>