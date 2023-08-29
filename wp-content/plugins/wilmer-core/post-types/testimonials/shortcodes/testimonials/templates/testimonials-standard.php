<div class="mkdf-testimonials-holder clearfix <?php echo esc_attr($holder_classes); ?>">
    <div class="mkdf-testimonials mkdf-owl-slider" <?php echo wilmer_mikado_get_inline_attrs( $data_attr ) ?>>

    <?php if ( $query_results->have_posts() ):
        while ( $query_results->have_posts() ) : $query_results->the_post();
            $title    = get_post_meta( get_the_ID(), 'mkdf_testimonial_title', true );
            $text     = get_post_meta( get_the_ID(), 'mkdf_testimonial_text', true );
            $author   = get_post_meta( get_the_ID(), 'mkdf_testimonial_author', true );
            $position = get_post_meta( get_the_ID(), 'mkdf_testimonial_author_position', true );

            $current_id = get_the_ID();
    ?>

            <div class="mkdf-testimonial-content" id="mkdf-testimonials-<?php echo esc_attr( $current_id ) ?>">
                <div class="mkdf-testimonial-content-inner clearfix">
                    <div class="mkdf-testimonial-image-holder">
                        <?php if ( has_post_thumbnail() ) { ?>
                            <div class="mkdf-testimonial-image">
                                <?php echo get_the_post_thumbnail( get_the_ID(), array( 80, 80 ) ); ?>
                            </div>
                        <?php } ?>
                        <div class="mkdf-quote-sign-holder">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                 viewBox="0 0 69 55" enable-background="new 0 0 69 55" xml:space="preserve">
                            <g>
                                <path fill="#fff" d="M0,30.759c0-9.233,2.428-16.668,7.285-22.306C12.141,2.82,19.223,0,28.531,0v12.834
                                    c-7.152,0-10.724,4.618-10.724,13.852v3.056h12.95V55H4.249C1.416,46.852,0,38.774,0,30.759z M38.446,30.759
                                    c0-9.233,2.393-16.668,7.183-22.306C50.415,2.82,57.466,0,66.774,0v12.834c-7.016,0-10.522,4.618-10.522,13.852v3.056H69V55H42.493
                                    C39.792,46.718,38.446,38.637,38.446,30.759z"/>
                            </g>
                            </svg>
                        </div>
                    </div>
                    <div class="mkdf-testimonial-text-holder">
                        <?php if ( ! empty( $author ) ) { ?>
                            <h6 class="mkdf-testimonial-position">
                                <?php if ( ! empty( $position ) ) { ?>
                                    <span class="mkdf-testimonials-author-job"><?php echo esc_html( $position ); ?></span>
                                <?php } ?>
                            </h6>
                            <h4 class="mkdf-testimonial-author">
                                <span class="mkdf-testimonials-author-name"><?php echo esc_html( $author ); ?></span>
                            </h4>
                        <?php } ?>
                        <?php if ( ! empty( $title ) ) { ?>
                            <h2 itemprop="name" class="mkdf-testimonial-title entry-title"><?php echo esc_html( $title ); ?></h2>
                        <?php } ?>
                        <?php if ( ! empty( $text ) ) { ?>
                            <p class="mkdf-testimonial-text"><?php echo esc_html( $text ); ?></p>
                        <?php } ?>

                    </div>
                </div>
            </div>

    <?php
        endwhile;
    else:
        echo esc_html__( 'Sorry, no posts matched your criteria.', 'wilmer-core' );
    endif;

    wp_reset_postdata();
    ?>

    </div>
</div>