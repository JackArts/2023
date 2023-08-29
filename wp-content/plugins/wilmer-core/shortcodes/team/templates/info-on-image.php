<div class="mkdf-team-holder <?php echo esc_attr($holder_classes); ?>">
	<div class="mkdf-team-inner">
		<?php if ($team_image !== '') { ?>
			<div class="mkdf-team-image">
                <?php if (!empty($team_social_icons)) { ?>
                    <div class="mkdf-team-social-holder">
                                    <span class="mkdf-team-icon mkdf-team-social-opener">
                                        <span class="mkdf-icon-shortcode mkdf-normal">
                                            <a href="#">
                                                <span class="social_share mkdf-icon-element"></span>
                                            </a>
                                        </span>
                                    </span>
                        <?php foreach( $team_social_icons as $team_social_icon ) { ?>
                            <span class="mkdf-team-icon" <?php echo wilmer_mikado_get_inline_style($team_social_icons_color); ?>><?php echo wp_kses_post($team_social_icon); ?></span>
                        <?php } ?>
                    </div>
                <?php } ?>
                <?php echo wp_get_attachment_image($team_image, 'full'); ?>
				<div class="mkdf-team-social-wrapper" <?php echo wilmer_mikado_get_inline_style($team_overlay_styles); ?>>
					<div class="mkdf-team-social-outer">
						<div class="mkdf-team-social-inner" <?php echo wilmer_mikado_get_inline_style($team_name_styles); ?>>
                            <?php if ($team_position !== "") { ?>
                                <h6 class="mkdf-team-position" <?php echo wilmer_mikado_get_inline_style($team_position_styles); ?>><?php echo esc_html($team_position); ?></h6>
                            <?php } ?>
							<?php if ($team_name !== '') { ?>
								<<?php echo esc_attr($team_name_tag); ?> class="mkdf-team-name" <?php echo wilmer_mikado_get_inline_style($team_name_styles); ?>><?php echo esc_html($team_name); ?></<?php echo esc_attr($team_name_tag); ?>>
							<?php } ?>
							<?php if ($team_text !== "") { ?>
								<p class="mkdf-team-text" <?php echo wilmer_mikado_get_inline_style($team_text_styles); ?>><?php echo esc_html($team_text); ?></p>
							<?php } ?>
						</div>
					</div>
				</div>
			</div>
		<?php } ?>
	</div>
</div>