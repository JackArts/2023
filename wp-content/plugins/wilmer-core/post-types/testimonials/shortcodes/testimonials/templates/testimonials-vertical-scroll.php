<div class="mkdf-testimonials-holder clearfix <?php echo esc_attr($holder_classes); ?>" >
    <div class="mkdf-testimonials" <?php echo wilmer_mikado_get_inline_attrs( $data_attr ) ?>>
        <div class="mkdf-testimonials-quote-holder">
            <svg x="0px" y="0px" width="154px" height="123px" viewBox="130 335.5 154 123" style="enable-background:new 130 335.5 154 123;" xml:space="preserve">
                <g>
                    <g>
                        <path d="M278.031,336.505v26.709c-15.584,0.437-23.484,11.185-23.484,31.964v6.833v1h1H283V457.5h-57.434
                            c-5.813-18.085-8.76-35.984-8.76-53.211c0-20.312,5.314-36.878,15.794-49.236C242.868,342.944,258.149,336.707,278.031,336.505
                             M192.677,336.505v26.708c-15.885,0.428-23.936,11.177-23.936,31.964v6.833v1h1h27.903V457.5h-57.448
                            c-6.103-17.809-9.197-35.708-9.197-53.211c0-20.307,5.389-36.871,16.016-49.231C157.436,342.946,172.794,336.707,192.677,336.505
                             M279.031,335.5c-20.773,0-36.509,6.306-47.193,18.905c-10.69,12.606-16.032,29.234-16.032,49.883
                            c0,17.617,3.006,35.69,9.032,54.211H284v-56.489h-28.453v-6.833c0-20.649,7.827-30.977,23.484-30.977V335.5L279.031,335.5z
                             M193.677,335.5c-20.774,0-36.581,6.306-47.419,18.905C135.419,367.012,130,383.639,130,404.289
                            c0,17.924,3.161,35.989,9.484,54.211h59.161v-56.489h-28.903v-6.833c0-20.649,7.974-30.977,23.936-30.977V335.5L193.677,335.5z"/>
                    </g>
                </g>
            </svg>
        </div>
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <?php if ( $query_results->have_posts() ):
                    while ( $query_results->have_posts() ) : $query_results->the_post();
                        $title    = get_post_meta( get_the_ID(), 'mkdf_testimonial_title', true );
                        $text     = get_post_meta( get_the_ID(), 'mkdf_testimonial_text', true );
                        $author   = get_post_meta( get_the_ID(), 'mkdf_testimonial_author', true );
                        $position = get_post_meta( get_the_ID(), 'mkdf_testimonial_author_position', true );

                        $current_id = get_the_ID();
                        ?>

                        <div class="mkdf-testimonial-content swiper-slide" id="mkdf-testimonials-<?php echo esc_attr( $current_id ) ?>">
                            <?php if ( has_post_thumbnail() ) { ?>
                                <div class="mkdf-testimonial-image">
                                    <?php echo get_the_post_thumbnail( get_the_ID(), array( 193, 193 ) ); ?>
                                </div>
                            <?php } ?>
                            <div class="mkdf-testimonial-text-holder">
                                <?php if ( ! empty( $text ) ) { ?>
                                    <p class="mkdf-testimonial-text"><?php echo esc_html( $text ); ?></p>
                                <?php } ?>
                                <?php if ( ! empty( $author ) ) { ?>
                                    <h6 class="mkdf-testimonial-author">
                                        <?php if ( ! empty( $position ) ) { ?>
                                            <span class="mkdf-testimonials-author-job"><?php echo esc_html( $position ); ?></span>
                                        <?php } ?>
                                    </h6>
                                    <h4 class="mkdf-testimonial-author">
                                        <span class="mkdf-testimonials-author-name"><?php echo esc_html( $author ); ?></span>
                                    </h4>
                                <?php } ?>
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
        <div class="swiper-pagination"></div>
        <?php if($slider_navigation === 'yes') { ?>
            <div class="swiper-navigation">
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
            </div>
        <?php } ?>
    </div>
</div>