<?php
class WilmerCoreElementorTeamCarousel extends \Elementor\Widget_Base {

	public function get_name() {
		return 'mkdf_team_carousel'; 
	}

	public function get_title() {
		return esc_html__( 'Team Carousel', 'wilmer-core' );
	}

	public function get_icon() {
		return 'wilmer-elementor-custom-icon wilmer-elementor-team-carousel';
	}

	public function get_categories() {
		return [ 'mikado' ];
	}

	protected function _register_controls() {

		$this->start_controls_section(
			'general',
			[
				'label' => esc_html__( 'General', 'wilmer-core' ),
				'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
			]
		);
		$this->add_control(
			'number_of_visible_items',
			[
				'label'     => esc_html__( 'Number of Visible Items', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'1' => esc_html__( 'One', 'wilmer-core'), 
					'2' => esc_html__( 'Two', 'wilmer-core'), 
					'3' => esc_html__( 'Three', 'wilmer-core'), 
					'4' => esc_html__( 'Four', 'wilmer-core'), 
					'5' => esc_html__( 'Five', 'wilmer-core'), 
					'6' => esc_html__( 'Six', 'wilmer-core')
				),
				'default' => '3'
			]
		);

		$this->add_control(
			'space_between_items',
			[
				'label'     => esc_html__( 'Space Between Items', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'huge' => esc_html__( 'Huge (40)', 'wilmer-core'), 
					'large' => esc_html__( 'Large (25)', 'wilmer-core'), 
					'medium' => esc_html__( 'Medium (20)', 'wilmer-core'), 
					'normal' => esc_html__( 'Normal (15)', 'wilmer-core'), 
					'small' => esc_html__( 'Small (10)', 'wilmer-core'), 
					'tiny' => esc_html__( 'Tiny (5)', 'wilmer-core'), 
					'no' => esc_html__( 'No (0)', 'wilmer-core')
				),
				'default' => 'normal'
			]
		);

		$this->add_control(
			'slider_loop',
			[
				'label'     => esc_html__( 'Enable Slider Loop', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'yes' => esc_html__( 'Yes', 'wilmer-core'), 
					'no' => esc_html__( 'No', 'wilmer-core')
				),
				'default' => 'yes'
			]
		);

		$this->add_control(
			'slider_autoplay',
			[
				'label'     => esc_html__( 'Enable Slider Autoplay', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'yes' => esc_html__( 'Yes', 'wilmer-core'), 
					'no' => esc_html__( 'No', 'wilmer-core')
				),
				'default' => 'yes'
			]
		);

		$this->add_control(
			'slider_speed',
			[
				'label'     => esc_html__( 'Slide Duration', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'description' => esc_html__( 'Default value is 5000 (ms)', 'wilmer-core' )
			]
		);

		$this->add_control(
			'slider_speed_animation',
			[
				'label'     => esc_html__( 'Slide Animation Duration', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'description' => esc_html__( 'Speed of slide animation in milliseconds. Default value is 600.', 'wilmer-core' )
			]
		);

		$this->add_control(
			'slider_navigation',
			[
				'label'     => esc_html__( 'Enable Slider Navigation Arrows', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'yes' => esc_html__( 'Yes', 'wilmer-core'), 
					'no' => esc_html__( 'No', 'wilmer-core')
				),
				'default' => 'yes'
			]
		);

		$this->add_control(
			'slider_pagination',
			[
				'label'     => esc_html__( 'Enable Slider Pagination', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'yes' => esc_html__( 'Yes', 'wilmer-core'), 
					'no' => esc_html__( 'No', 'wilmer-core')
				),
				'default' => 'yes'
			]
		);

		$repeater = new \Elementor\Repeater();

		$repeater->add_control(
			'type',
			[
				'label'     => esc_html__( 'Type', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'info-below-image' => esc_html__( 'Info Below Image', 'wilmer-core'), 
					'info-on-image' => esc_html__( 'Info On Image Hover', 'wilmer-core')
				),
				'default' => 'info-below-image'
			]
		);

		$repeater->add_control(
			'team_overlay_color',
			[
				'label'     => esc_html__( 'Overlay Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR
			]
		);

//		$repeater->add_control(
//			'team_social_icons_color',
//			[
//				'label'     => esc_html__( 'Social Icons Color', 'wilmer-core' ),
//				'type'      => \Elementor\Controls_Manager::COLOR
//			]
//		);

		$repeater->add_control(
			'team_image',
			[
				'label'     => esc_html__( 'Image', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::MEDIA
			]
		);

		$repeater->add_control(
			'team_name',
			[
				'label'     => esc_html__( 'Name', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$repeater->add_control(
			'team_name_tag',
			[
				'label'     => esc_html__( 'Name Tag', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'' => esc_html__( 'Default', 'wilmer-core'), 
					'h1' => esc_html__( 'h1', 'wilmer-core'), 
					'h2' => esc_html__( 'h2', 'wilmer-core'), 
					'h3' => esc_html__( 'h3', 'wilmer-core'), 
					'h4' => esc_html__( 'h4', 'wilmer-core'), 
					'h5' => esc_html__( 'h5', 'wilmer-core'), 
					'h6' => esc_html__( 'h6', 'wilmer-core')
				),
				'default' => 'h4',
				'condition' => [
					'team_name!' => ''
				]
			]
		);

		$repeater->add_control(
			'team_name_color',
			[
				'label'     => esc_html__( 'Name Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'condition' => [
					'team_name!' => ''
				]
			]
		);

		$repeater->add_control(
			'team_position',
			[
				'label'     => esc_html__( 'Position', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$repeater->add_control(
			'team_position_color',
			[
				'label'     => esc_html__( 'Position Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'condition' => [
					'team_position!' => ''
				]
			]
		);

		$repeater->add_control(
			'team_text',
			[
				'label'     => esc_html__( 'Text', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$repeater->add_control(
			'team_text_color',
			[
				'label'     => esc_html__( 'Text Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'condition' => [
					'team_text!' => ''
				]
			]
		);

        $this->add_control(
			'team_item',
			[
				'label'     => esc_html__( 'Team', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::REPEATER,
				'fields'     => $repeater->get_controls(),
				'title_field'     => esc_html__( 'Item', 'wilmer-core' )
			]
		);


		$this->end_controls_section();
	}
	public function render() {

		$params = $this->get_settings_for_display();

		$holder_classes = $this->getHolderClasses( $params );
		$slider_data    = $this->getSliderData( $params ); ?>

        <div class="mkdf-team-carousel-holder <?php echo esc_attr( $holder_classes ); ?>">
            <div class="mkdf-tc-inner mkdf-owl-slider" <?php echo wilmer_mikado_get_inline_attrs( $slider_data ) ?>>
                <?php foreach ( $params['team_item'] as $team ) {

                    if ( ! empty( $team['team_image'] ) ) {
                        $team['team_image'] = $team['team_image']['id'];
                    }

                    $team['holder_classes']         = $this->getItemHolderClasses( $team );
//                  $team['team_social_icons']      = $this->getTeamSocialIcons( $params );
                    $team['team_social_icons']      = '';
                    $team['team_name_styles']       = $this->getTeamNameStyles( $team );
                    $team['team_position_styles']   = $this->getTeamPositionStyles( $team );
                    $team['team_text_styles']       = $this->getTeamTextStyles( $team );
                    $team['team_overlay_styles']     = $this->getTeamOverlayStyles( $team );
                    $team['team_social_icons_color'] = $this->getTeamSocialIconsStyles( $team );

                    echo wilmer_core_get_shortcode_module_template_part( 'templates/'. $team['type'], 'team', '', $team );
                } ?>
            </div>
        </div>

	<?php
	}

	private function getHolderClasses( $params ) {
		$holderClasses = array();
		
		$holderClasses[] = ! empty( $params['space_between_items'] ) ? 'mkdf-' . $params['space_between_items'] . '-space' : '';
		
		return implode( ' ', $holderClasses );
	}

	private function getSliderData( $params ) {
		$slider_data = array();
		
		$slider_data['data-number-of-items']        = $params['number_of_visible_items'] !== '' ? $params['number_of_visible_items'] : '3';
		$slider_data['data-enable-loop']            = ! empty( $params['slider_loop'] ) ? $params['slider_loop'] : '';
		$slider_data['data-enable-autoplay']        = ! empty( $params['slider_autoplay'] ) ? $params['slider_autoplay'] : '';
		$slider_data['data-slider-speed']           = ! empty( $params['slider_speed'] ) ? $params['slider_speed'] : '5000';
		$slider_data['data-slider-speed-animation'] = ! empty( $params['slider_speed_animation'] ) ? $params['slider_speed_animation'] : '600';
		$slider_data['data-enable-navigation']      = ! empty( $params['slider_navigation'] ) ? $params['slider_navigation'] : '';
		$slider_data['data-enable-pagination']      = ! empty( $params['slider_pagination'] ) ? $params['slider_pagination'] : '';
		
		return $slider_data;
	}

    private function getItemHolderClasses( $params ) {
        $holderClasses = array();

        $holderClasses[] = ! empty( $params['type'] ) ? 'mkdf-team-' . $params['type'] : '';

        return implode( ' ', $holderClasses );
    }

//    private function getTeamSocialIcons( $params ) {
//        extract( $params );
//        $social_icons = array();
//
//        if ( $team_social_icon_pack !== '' ) {
//
//            $icon_pack                    = wilmer_mikado_icon_collections()->getIconCollection( $team_social_icon_pack );
//            $team_social_icon_type_label  = 'team_social_' . $icon_pack->param;
//            $team_social_icon_param_label = $icon_pack->param;
//
//            for ( $i = 1; $i <= $params['number_of_social_icons']; $i ++ ) {
//
//                $team_social_icon   = ${$team_social_icon_type_label . '_' . $i};
//                $team_social_link   = ${'team_social_icon_' . $i . '_link'};
//                $team_social_target = ${'team_social_icon_' . $i . '_target'};
//
//                if ( $team_social_icon !== '' ) {
//
//                    $team_icon_params                                  = array();
//                    $team_icon_params['icon_pack']                     = $team_social_icon_pack;
//                    $team_icon_params[ $team_social_icon_param_label ] = $team_social_icon;
//                    $team_icon_params['link']                          = ( $team_social_link !== '' ) ? $team_social_link : '';
//                    $team_icon_params['target']                        = ( $team_social_target !== '' ) ? $team_social_target : '';
//
//                    $social_icons[] = wilmer_mikado_execute_shortcode( 'mkdf_icon', $team_icon_params );
//                }
//            }
//        }
//
//        return $social_icons;
//    }

    private function getTeamNameStyles( $params ) {
        $styles = array();

        if ( ! empty( $params['team_name_color'] ) ) {
            $styles[] = 'color: ' . $params['team_name_color'];
        }

        return implode( ';', $styles );
    }

    private function getTeamPositionStyles( $params ) {
        $styles = array();

        if ( ! empty( $params['team_position_color'] ) ) {
            $styles[] = 'color: ' . $params['team_position_color'];
        }

        return implode( ';', $styles );
    }

    private function getTeamTextStyles( $params ) {
        $styles = array();

        if ( ! empty( $params['team_text_color'] ) ) {
            $styles[] = 'color: ' . $params['team_text_color'];
        }

        return implode( ';', $styles );
    }

    private function getTeamOverlayStyles( $params ) {
        $styles = array();

        if ( ! empty( $params['team_overlay_color'] ) ) {
            $styles[] = 'background-color: ' . $params['team_overlay_color'];
        }

        return implode( ';', $styles );
    }

    private function getTeamSocialIconsStyles( $params ) {
        $styles = array();

        if ( ! empty( $params['team_social_icons_color'] ) ) {
            $styles[] = 'color: ' . $params['team_social_icons_color'];
        }

        return implode( ';', $styles );
    }

}
\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new WilmerCoreElementorTeamCarousel() );