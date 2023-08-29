<div class="mkdf-roadmap <?php echo esc_attr($holder_classes); ?>">
    <div class="mkdf-roadmap-line">

        <span class="mkdf-rl-arrow-left">
            <i class="mkdf-icon-font-awesome fa fa-angle-left"></i>
        </span>

        <span class="mkdf-rl-arrow-right">
            <i class="mkdf-icon-font-awesome fa fa-angle-right"></i>
        </span>
    </div>
<!--    <div class="mkdf-roadmap-holder">-->
        <?php if (is_array($stage) && count($stage)) { ?>
            <div class="mkdf-roadmap-inner-holder clearfix">
            <?php foreach($stage as $key => $stage_item) {
                $stage_item['number'] = $key;
                $additional = $this_object->getItemAdditional($stage_item);
                $item_classes = $additional['classes'];
                $item_style = $additional['style'];
                ?>
                <div <?php wilmer_mikado_class_attribute($item_classes);?>>
                    <div class="mkdf-roadmap-item-circle-holder">
                        <div class="mkdf-roadmap-item-before-circle"></div>
                        <div class="mkdf-roadmap-item-circle"></div>
                        <div class="mkdf-roadmap-item-after-circle"></div>
                    </div>
                    <div class="mkdf-roadmap-item-stage-title-holder">
                        <span class="mkdf-ris-title">
                            <?php echo esc_html($stage_item['stage_title'])?>
                        </span>
                    </div>
                    <div class="mkdf-roadmap-item-content-holder" <?php wilmer_mikado_inline_style($item_style);?>>
                        <h5 class="mkdf-ric-title">
                            <?php echo esc_html($stage_item['info_title'])?>
                        </h5>
                        <div class="mkdf-ric-content">
                            <?php echo esc_html($stage_item['info_text'])?>
                        </div>
                    </div>
                </div>
            <?php } ?>
            </div>
        <?php } ?>
<!--    </div>-->
</div>