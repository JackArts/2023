<?php

    if(!empty($title_tag)){
        $title_tag = $title_tag;
    }else{
        $title_tag = 'h4';
    }

?>
<<?php echo $title_tag; ?> class="mkdf-ps-info-section-title"><?php echo esc_html( $title ); ?></<?php echo $title_tag; ?>>