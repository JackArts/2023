<?php
class WilmerCoreElementorTeam extends \Elementor\Widget_Base {

	public function get_name() {
		return 'mkdf_team'; 
	}

	public function get_title() {
		return esc_html__( 'Team', 'wilmer-core' );
	}

	public function get_icon() {
		return 'wilmer-elementor-custom-icon wilmer-elementor-team';
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

		$this->add_control(
			'team_overlay_color',
			[
				'label'     => esc_html__( 'Overlay Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR
			]
		);

		$this->add_control(
			'team_social_icons_color',
			[
				'label'     => esc_html__( 'Social Icons Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR
			]
		);

		$this->add_control(
			'team_image',
			[
				'label'     => esc_html__( 'Image', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::MEDIA
			]
		);

		$this->add_control(
			'team_name',
			[
				'label'     => esc_html__( 'Name', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$this->add_control(
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

		$this->add_control(
			'team_name_color',
			[
				'label'     => esc_html__( 'Name Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'condition' => [
					'team_name!' => ''
				]
			]
		);

		$this->add_control(
			'team_position',
			[
				'label'     => esc_html__( 'Position', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$this->add_control(
			'team_position_color',
			[
				'label'     => esc_html__( 'Position Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'condition' => [
					'team_position!' => ''
				]
			]
		);

		$this->add_control(
			'team_text',
			[
				'label'     => esc_html__( 'Text', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$this->add_control(
			'team_text_color',
			[
				'label'     => esc_html__( 'Text Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'condition' => [
					'team_text!' => ''
				]
			]
		);


        $repeater = new \Elementor\Repeater();

        wilmer_mikado_icon_collections()->getElementorParamsArray( $repeater, '', '' );

        $repeater->add_control(
            'team_social_icon_link',
            [
                'label' => esc_html__( 'Social Icon Link', 'wilmer-core' ),
                'type'  => \Elementor\Controls_Manager::TEXT,
            ]
        );

        $repeater->add_control(
            'team_social_icon_target',
            [
                'label'   => esc_html__( 'Social Icon Target', 'wilmer-core' ),
                'type'    => \Elementor\Controls_Manager::SELECT,
                'options' => wilmer_mikado_get_link_target_array()
            ]
        );

        $this->add_control(
            'social_icon',
            [
                'label'       => esc_html__( 'Social Icons', 'wilmer-core' ),
                'type'        => \Elementor\Controls_Manager::REPEATER,
                'fields'      => $repeater->get_controls(),
                'title_field' => esc_html__( 'Social Icon' ),
            ]
        );

		$this->end_controls_section();
	}
	public function render() {

		$params = $this->get_settings_for_display();


        if ( ! empty( $params['team_image'] ) ) {
            $params['team_image'] = $params['team_image']['id'];
        }
		$params['number_of_social_icons'] = 5;
		$params['holder_classes']       = $this->getHolderClasses( $params );
		$params['team_social_icons']    = $this->getTeamSocialIcons( $params );
		$params['team_name_styles']     = $this->getTeamNameStyles( $params );
		$params['team_position_styles'] = $this->getTeamPositionStyles( $params );
		$params['team_text_styles']     = $this->getTeamTextStyles( $params );
        $params['team_overlay_styles']     = $this->getTeamOverlayStyles( $params );
        $params['team_social_icons_color'] = $this->getTeamSocialIconsStyles( $params );
		
		//Get HTML from template based on type of team
        echo wilmer_core_get_shortcode_module_template_part( 'templates/' . $params['type'], 'team', '', $params );

	}

	private function getHolderClasses( $params ) {
		$holderClasses = array();
		
		$holderClasses[] = ! empty( $params['type'] ) ? 'mkdf-team-' . $params['type'] : '';
		
		return implode( ' ', $holderClasses );
	}

	private function getTeamSocialIcons( $params ) {
        $team_social_icons = array();

        if ( $params['social_icon'] !== '' ) {

            foreach ( $params['social_icon'] as $icon ) {

                $iconPackName = wilmer_mikado_icon_collections()->getIconCollectionParamNameByKey( $icon['icon_pack'] );

                $team_icon_params                  = array();
                $team_icon_params['icon_pack']     = $icon['icon_pack'];
                $team_icon_params[ $iconPackName ] = $icon[ $iconPackName ];
                $team_icon_params['link']          = $icon['team_social_icon_link'];
                $team_icon_params['target']        = $icon['team_social_icon_target'];

                $team_social_icons[] = wilmer_mikado_execute_shortcode( 'mkdf_icon', $team_icon_params );
            }
        }

        return $team_social_icons;
	}

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
\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new WilmerCoreElementorTeam() );