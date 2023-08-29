<?php
if ($readmore === 'yes') {

    ?>

    <div class="mkdf-pl-read-more-holder">
    <?php

    $label = $item_style == 'gallery-bordered-overlay' ? '' : esc_html__('Find out more','wilmer-core');

    ?>

    <?php

    echo do_shortcode( '[mkdf_button 
                                             link="' . get_the_permalink() . '"
                                             type="simple" 
                                             text="' . $label . '"
                                             
                                ]');

    ?>

    </div>

    <?php
}