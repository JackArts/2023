<?php
class WilmerCoreElementorIconWithText extends \Elementor\Widget_Base {

	public function get_name() {
		return 'mkdf_icon_with_text'; 
	}

	public function get_title() {
		return esc_html__( 'Icon With Text', 'wilmer-core' );
	}

	public function get_icon() {
		return 'wilmer-elementor-custom-icon wilmer-elementor-icon-with-text';
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
			'custom_class',
			[
				'label'     => esc_html__( 'Custom CSS Class', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'description' => esc_html__( 'Style particular content element differently - add a class name and refer to it in custom CSS', 'wilmer-core' )
			]
		);

		$this->add_control(
			'type',
			[
				'label'     => esc_html__( 'Type', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'icon-left' => esc_html__( 'Icon Left From Text', 'wilmer-core'), 
					'icon-left-from-title' => esc_html__( 'Icon Left From Title', 'wilmer-core'), 
					'icon-top' => esc_html__( 'Icon Top', 'wilmer-core'), 
					'icon-top-centered' => esc_html__( 'Icon Top Centered', 'wilmer-core')
				),
				'default' => 'icon-left'
			]
		);

		$this->add_control(
			'boxed_type',
			[
				'label'     => esc_html__( 'Enable Icon Box', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'description' => esc_html__( 'Enable this option if you want icon with text ot be placed inside box with borders', 'wilmer-core' ),
				'options' => array(
					'no' => esc_html__( 'No', 'wilmer-core'), 
					'yes' => esc_html__( 'Yes', 'wilmer-core')
				),
				'default' => 'no',
				'condition' => [
					'type' => array( 'icon-top', 'icon-top-centered' )
				]
			]
		);

		wilmer_mikado_icon_collections()->getElementorParamsArray( $this, '', '' );

		$this->add_control(
			'custom_icon',
			[
				'label'     => esc_html__( 'Custom Icon', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::MEDIA
			]
		);

		$this->add_control(
			'icon_custom_svg',
			[
				'label'     => esc_html__( 'Custom Icon SVG', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXTAREA
			]
		);

		$this->add_control(
			'title',
			[
				'label'     => esc_html__( 'Title', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$this->add_control(
			'caption',
			[
				'label'     => esc_html__( 'Caption', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$this->add_control(
			'text',
			[
				'label'     => esc_html__( 'Text', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXTAREA
			]
		);

		$this->add_control(
			'link',
			[
				'label'     => esc_html__( 'Link', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'description' => esc_html__( 'Set link around icon and title', 'wilmer-core' )
			]
		);

		$this->add_control(
			'target',
			[
				'label'     => esc_html__( 'Target', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'_self' => esc_html__( 'Same Window', 'wilmer-core'), 
					'_blank' => esc_html__( 'New Window', 'wilmer-core')
				),
				'default' => '_self',
				'condition' => [
					'link!' => ''
				]
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'icon_settings',
			[
				'label' => esc_html__( 'Icon Settings', 'wilmer-core' ),
				'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
			]
		);
		$this->add_control(
			'icon_type',
			[
				'label'     => esc_html__( 'Icon Type', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'mkdf-normal' => esc_html__( 'Normal', 'wilmer-core'), 
					'mkdf-circle' => esc_html__( 'Circle', 'wilmer-core'), 
					'mkdf-square' => esc_html__( 'Square', 'wilmer-core')
				),
				'default' => 'mkdf-normal'
			]
		);

		$this->add_control(
			'icon_size',
			[
				'label'     => esc_html__( 'Icon Size', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'mkdf-icon-medium' => esc_html__( 'Medium', 'wilmer-core'), 
					'mkdf-icon-tiny' => esc_html__( 'Tiny', 'wilmer-core'), 
					'mkdf-icon-small' => esc_html__( 'Small', 'wilmer-core'), 
					'mkdf-icon-large' => esc_html__( 'Large', 'wilmer-core'), 
					'mkdf-icon-huge' => esc_html__( 'Very Large', 'wilmer-core')
				),
				'default' => 'mkdf-icon-medium'
			]
		);

		$this->add_control(
			'custom_icon_size',
			[
				'label'     => esc_html__( 'Custom Icon Size (px)', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$this->add_control(
			'shape_size',
			[
				'label'     => esc_html__( 'Shape Size (px)', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$this->add_control(
			'icon_color',
			[
				'label'     => esc_html__( 'Icon Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR
			]
		);

		$this->add_control(
			'icon_hover_color',
			[
				'label'     => esc_html__( 'Icon Hover Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR
			]
		);

		$this->add_control(
			'icon_background_color',
			[
				'label'     => esc_html__( 'Icon Background Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'condition' => [
					'icon_type' => array( 'mkdf-square', 'mkdf-circle' )
				]
			]
		);

		$this->add_control(
			'icon_hover_background_color',
			[
				'label'     => esc_html__( 'Icon Hover Background Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'condition' => [
					'icon_type' => array( 'mkdf-square', 'mkdf-circle' )
				]
			]
		);

		$this->add_control(
			'icon_border_color',
			[
				'label'     => esc_html__( 'Icon Border Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'condition' => [
					'icon_type' => array( 'mkdf-square', 'mkdf-circle' )
				]
			]
		);

		$this->add_control(
			'icon_border_hover_color',
			[
				'label'     => esc_html__( 'Icon Border Hover Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'condition' => [
					'icon_type' => array( 'mkdf-square', 'mkdf-circle' )
				]
			]
		);

		$this->add_control(
			'icon_border_width',
			[
				'label'     => esc_html__( 'Border Width (px)', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'condition' => [
					'icon_type' => array( 'mkdf-square', 'mkdf-circle' )
				]
			]
		);

		$this->add_control(
			'icon_animation',
			[
				'label'     => esc_html__( 'Icon Animation', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'no' => esc_html__( 'No', 'wilmer-core'), 
					'yes' => esc_html__( 'Yes', 'wilmer-core')
				),
				'default' => 'no'
			]
		);

		$this->add_control(
			'icon_animation_delay',
			[
				'label'     => esc_html__( 'Icon Animation Delay (ms)', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'condition' => [
					'icon_animation' => array( 'yes' )
				]
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'text_settings',
			[
				'label' => esc_html__( 'Text Settings', 'wilmer-core' ),
				'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
			]
		);
		$this->add_control(
			'content_top_padding',
			[
				'label'     => esc_html__( 'Content top padding (px)', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'description' => esc_html__( 'Works with Icon Top and Icon Top Centered', 'wilmer-core' )
			]
		);

		$this->add_control(
			'title_tag',
			[
				'label'     => esc_html__( 'Title Tag', 'wilmer-core' ),
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
					'title!' => ''
				]
			]
		);

		$this->add_control(
			'title_color',
			[
				'label'     => esc_html__( 'Title Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'condition' => [
					'title!' => ''
				]
			]
		);

		$this->add_control(
			'title_hover_color',
			[
				'label'     => esc_html__( 'Title Hover Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'condition' => [
					'title!' => ''
				]
			]
		);

		$this->add_control(
			'title_top_margin',
			[
				'label'     => esc_html__( 'Title Top Margin (px)', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'condition' => [
					'title!' => ''
				]
			]
		);

		$this->add_control(
			'text_color',
			[
				'label'     => esc_html__( 'Text Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'condition' => [
					'text!' => ''
				]
			]
		);

		$this->add_control(
			'text_top_margin',
			[
				'label'     => esc_html__( 'Text Top Margin (px)', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'condition' => [
					'text!' => ''
				]
			]
		);

		$this->add_control(
			'text_padding',
			[
				'label'     => esc_html__( 'Text Padding (px)', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'description' => esc_html__( 'Set left or top padding dependence of type for your text holder. Default value is 13 for left type and 25 for top icon with text type', 'wilmer-core' ),
				'condition' => [
					'type' => array( 'icon-left', 'icon-top' )
				]
			]
		);

		$this->add_control(
			'caption_color',
			[
				'label'     => esc_html__( 'Caption Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'condition' => [
					'caption!' => ''
				]
			]
		);


		$this->end_controls_section();
	}
	public function render() {

		$params = $this->get_settings_for_display();

        if ( ! empty( $params['custom_icon'] ) ) {
            $params['custom_icon'] = $params['custom_icon']['id'];
        }
        if ( ! empty( $params['icon_custom_svg'] ) ) {
            $params['icon_custom_svg'] = base64_encode(urlencode($params['icon_custom_svg']));
        }

		$params['icon_parameters'] = $this->getIconParameters( $params );
		$params['holder_classes']  = $this->getHolderClasses( $params );
		$params['content_styles']  = $this->getContentStyles( $params );
		$params['title_styles']    = $this->getTitleStyles( $params );
		$params['text_styles']     = $this->getTextStyles( $params );
        $params['caption_styles']  = $this->getCaptionStyles( $params );
        $params['icon_data']       = $this->getIconDataAttr( $params );

		echo wilmer_core_get_shortcode_module_template_part( 'templates/iwt', 'icon-with-text', $params['type'], $params );
	}

	private function getIconParameters( $params ) {
		$params_array = array();
		
		if ( empty( $params['custom_icon'] ) && empty( $params['icon_custom_svg'] )) {
			$iconPackName = wilmer_mikado_icon_collections()->getIconCollectionParamNameByKey( $params['icon_pack'] );
			
			$params_array['icon_pack']     = $params['icon_pack'];
			$params_array[ $iconPackName ] = $params[ $iconPackName ];
			
			if ( ! empty( $params['icon_size'] ) ) {
				$params_array['size'] = $params['icon_size'];
			}
			
			if ( ! empty( $params['custom_icon_size'] ) ) {
				$params_array['custom_size'] = wilmer_mikado_filter_px( $params['custom_icon_size'] ) . 'px';
			}
			
			if ( ! empty( $params['icon_type'] ) ) {
				$params_array['type'] = $params['icon_type'];
			}
			
			if ( ! empty( $params['shape_size'] ) ) {
				$params_array['shape_size'] = wilmer_mikado_filter_px( $params['shape_size'] ) . 'px';
			}
			
			if ( ! empty( $params['icon_border_color'] ) ) {
				$params_array['border_color'] = $params['icon_border_color'];
			}
			
			if ( ! empty( $params['icon_border_hover_color'] ) ) {
				$params_array['hover_border_color'] = $params['icon_border_hover_color'];
			}
			
			if ( $params['icon_border_width'] !== '' ) {
				$params_array['border_width'] = wilmer_mikado_filter_px( $params['icon_border_width'] ) . 'px';
			}

            if ( $params['title_hover_color'] !== '' ) {
                $params_array['title_hover_color'] = $params['title_hover_color'];
            }

			if ( ! empty( $params['icon_background_color'] ) ) {
				$params_array['background_color'] = $params['icon_background_color'];
			}
			
			if ( ! empty( $params['icon_hover_background_color'] ) ) {
				$params_array['hover_background_color'] = $params['icon_hover_background_color'];
			}
			
			$params_array['icon_color'] = $params['icon_color'];
			
			if ( ! empty( $params['icon_hover_color'] ) ) {
				$params_array['hover_icon_color'] = $params['icon_hover_color'];
			}
			
			$params_array['icon_animation']       = $params['icon_animation'];
			$params_array['icon_animation_delay'] = $params['icon_animation_delay'];
		}
		
		return $params_array;
	}

    private function getIconDataAttr( $params ) {
        $data = array();

        if ( $params['title_color'] !== '' ) {
            $data['data-title-color'] = $params['title_color'];
        }

        if ( $params['title_hover_color'] !== '' ) {
            $data['data-title-hover-color'] = $params['title_hover_color'];
        }

        return $data;
    }

	private function getHolderClasses( $params ) {
		$holderClasses = array( 'mkdf-iwt', 'clearfix' );
		
		$holderClasses[] = ! empty( $params['custom_class'] ) ? esc_attr( $params['custom_class'] ) : '';
		$holderClasses[] = ! empty( $params['type'] ) ? 'mkdf-iwt-' . $params['type'] : '';
		$holderClasses[] = $params['boxed_type'] == 'yes' ? 'mkdf-iwt-boxed' : '';
		$holderClasses[] = ! empty( $params['icon_size'] ) ? 'mkdf-iwt-' . str_replace( 'mkdf-', '', $params['icon_size'] ) : '';
		
		return $holderClasses;
	}

	private function getContentStyles( $params ) {
		$styles = array();
		
		if ( $params['text_padding'] !== '' && $params['type'] === 'icon-left' ) {
			$styles[] = 'padding-left: ' . wilmer_mikado_filter_px( $params['text_padding'] ) . 'px';
		}
		
		if ( $params['text_padding'] !== '' && $params['type'] === 'icon-top' ) {
			$styles[] = 'padding-top: ' . wilmer_mikado_filter_px( $params['text_padding'] ) . 'px';
		}

        if ( $params['content_top_padding'] !== '' && $params['type'] === 'icon-top' || $params['type'] === 'icon-top-centered' ) {
            $styles[] = 'padding-top: ' . wilmer_mikado_filter_px( $params['content_top_padding'] ) . 'px';
        }
		
		return implode( ';', $styles );
	}

	private function getTitleStyles( $params ) {
		$styles = array();
		
		if ( ! empty( $params['title_color'] ) ) {
			$styles[] = 'color: ' . $params['title_color'];
		}
		
		if ( $params['title_top_margin'] !== '' ) {
			$styles[] = 'margin-top: ' . wilmer_mikado_filter_px( $params['title_top_margin'] ) . 'px';
		}
		
		return implode( ';', $styles );
	}

	private function getTextStyles( $params ) {
		$styles = array();
		
		if ( ! empty( $params['text_color'] ) ) {
			$styles[] = 'color: ' . $params['text_color'];
		}
		
		if ( $params['text_top_margin'] !== '' ) {
			$styles[] = 'margin-top: ' . wilmer_mikado_filter_px( $params['text_top_margin'] ) . 'px';
		}
		
		return implode( ';', $styles );
	}

    private function getCaptionStyles( $params ) {
        $styles = array();

        if ( ! empty( $params['caption_color'] ) ) {
            $styles[] = 'color: ' . $params['text_color'];
        }

        return implode( ';', $styles );
    }

}
\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new WilmerCoreElementorIconWithText() );