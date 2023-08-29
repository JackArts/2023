<div class="mkdf-pvli-content-holder">
    <div class="mkdf-pvli-background-text">
        <?php echo esc_html__( 'Next', 'wilmer-core' ); ?>
    </div>
    <div class="mkdf-pvli-image-holder">
        <div class="mkdf-pvli-image-inner">
            <?php echo wilmer_core_get_cpt_shortcode_module_template_part('portfolio', 'portfolio-vertical-loop', 'parts/image', 'standard', $params); ?>
            <div class="mkdf-pvli-image-title">
                <div class="mkdf-pvli-image-title-inner">
                    <div class="mkdf-pvli-info">
                        <?php echo wilmer_core_get_cpt_shortcode_module_template_part('portfolio', 'portfolio-vertical-loop', 'parts/category', 'standard', $params); ?>
                    </div>
                    <?php echo wilmer_core_get_cpt_shortcode_module_template_part('portfolio', 'portfolio-vertical-loop', 'parts/title', 'standard', $params); ?>
                </div>
            </div>
        </div>
    </div>
    <div class="mkdf-pvli-text">
        <div class="mkdf-pvli-text-inner">
            <?php echo wilmer_core_get_cpt_shortcode_module_template_part('portfolio', 'portfolio-vertical-loop', 'parts/title', 'standard', $params); ?>
            <div class="mkdf-pvli-info">
                <?php echo wilmer_core_get_cpt_shortcode_module_template_part('portfolio', 'portfolio-vertical-loop', 'parts/category', 'standard', $params); ?>
            </div>
            <div class="mkdf-container">
                <div class="mkdf-container-inner clearfix">
                    <div class="mkdf-grid-row">
                        <div class="mkdf-grid-col-10">
                            <?php echo wilmer_core_get_cpt_shortcode_module_template_part('portfolio', 'portfolio-vertical-loop', 'parts/excerpt', 'standard', $params); ?>
                            <?php
                            //get portfolio tags section
                            echo wilmer_core_get_cpt_shortcode_module_template_part('portfolio', 'portfolio-vertical-loop', 'parts/tags', 'standard', $params); ?>
                        </div>
                        <div class="mkdf-grid-col-2">
                            <div class="mkdf-pvl-info-holder">
                                <?php
                                //get portfolio custom fields section
                                echo wilmer_core_get_cpt_shortcode_module_template_part('portfolio', 'portfolio-vertical-loop', 'parts/custom-fields', 'standard', $params);

                                //get portfolio categories section
                                echo wilmer_core_get_cpt_shortcode_module_template_part('portfolio', 'portfolio-vertical-loop', 'parts/content-categories', 'standard', $params);

                                //get portfolio date section
                                echo wilmer_core_get_cpt_shortcode_module_template_part('portfolio', 'portfolio-vertical-loop', 'parts/date', 'standard', $params);
                                ?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mkdf-full-width">
                <div class="mkdf-full-width-inner">
                    <?php the_content();?>
                </div>
            </div>
        </div>
    </div>
    <a href="#" class="mkdf-pvli-content-link"></a>
</div>