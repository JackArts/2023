<?php
class WilmerCoreElementorFullScreenImageSlider extends \Elementor\Widget_Base {

	public function get_name() {
		return 'mkdf_full_screen_image_slider'; 
	}

	public function get_title() {
		return esc_html__( 'Full Screen Image Slider', 'wilmer-core' );
	}

	public function get_icon() {
		return 'wilmer-elementor-custom-icon wilmer-elementor-full-screen-image-slider';
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
			'custom_class',
			[
				'label'     => esc_html__( 'Custom CSS Class', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'description' => esc_html__( 'Style particular content element differently - add a class name and refer to it in custom CSS', 'wilmer-core' )
			]
		);

		$repeater->add_control(
			'background_image',
			[
				'label'     => esc_html__( 'Background Image', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::MEDIA
			]
		);

		$repeater->add_control(
			'image_top',
			[
				'label'     => esc_html__( 'Content Image Top', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::MEDIA,
				'description' => esc_html__( 'Select image from media library', 'wilmer-core' )
			]
		);

		$repeater->add_control(
			'image_left',
			[
				'label'     => esc_html__( 'Content Image Left', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::MEDIA,
				'description' => esc_html__( 'Select image from media library', 'wilmer-core' )
			]
		);

		$repeater->add_control(
			'image_right',
			[
				'label'     => esc_html__( 'Content Image Right', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::MEDIA,
				'description' => esc_html__( 'Select image from media library', 'wilmer-core' )
			]
		);

		$repeater->add_control(
			'title',
			[
				'label'     => esc_html__( 'Title', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$repeater->add_control(
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
				'default' => 'h1',
				'condition' => [
					'title!' => ''
				]
			]
		);

		$repeater->add_control(
			'title_color',
			[
				'label'     => esc_html__( 'Title Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'condition' => [
					'title!' => ''
				]
			]
		);

		$repeater->add_control(
			'subtitle',
			[
				'label'     => esc_html__( 'Subitle', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$repeater->add_control(
			'subtitle_tag',
			[
				'label'     => esc_html__( 'Subitle Tag', 'wilmer-core' ),
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
				'default' => 'h5',
				'condition' => [
					'subtitle!' => ''
				]
			]
		);

		$repeater->add_control(
			'subtitle_color',
			[
				'label'     => esc_html__( 'Subitle Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'condition' => [
					'subtitle!' => ''
				]
			]
		);

		$this->add_control(
			'full_screen_image_slider_item',
			[
				'label'     => esc_html__( 'Full Screen Image Slider Item', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::REPEATER,
				'fields'     => $repeater->get_controls(),
				'title_field'     => esc_html__( 'Item', 'wilmer-core' )
			]
		);


		$this->end_controls_section();
	}
	public function render() {

		$params = $this->get_settings_for_display();


		
		$params['holder_classes'] = $this->getHolderClasses( $params );
		$params['slider_data']    = $this->getSliderData( $params );
        ?>
        <div class="mkdf-full-screen-image-slider <?php echo esc_attr($params['holder_classes']); ?>">
            <div class="mkdf-fsis-slider mkdf-owl-slider" <?php echo wilmer_mikado_get_inline_attrs($params['slider_data']); ?>>
                <?php foreach ( $params['full_screen_image_slider_item'] as $fsisi ) {

                    $fsisi['holder_classes'] = $this->getItemHolderClasses( $fsisi );
                    $fsisi['image_styles']   = $this->getItemImageStyles( $fsisi );
                    $fsisi['title_styles']   = $this->getItemTitleStyles( $fsisi );
                    $fsisi['subtitle_styles']   = $this->getItemSubitleStyles( $fsisi );
                    $fsisi['image_top']     = !empty($fsisi['image_top']) ? $fsisi['image_top']['id'] : '';
                    $fsisi['image_left']    = !empty($fsisi['image_left']) ? $fsisi['image_left']['id'] : '';
                    $fsisi['image_right']   = !empty($fsisi['image_right']) ? $fsisi['image_right']['id'] : '';

                    echo wilmer_core_get_shortcode_module_template_part( 'templates/full-screen-image-slider-item', 'full-screen-image-slider', '', $fsisi  );
                } ?>
            </div>
            <div class="mkdf-fsis-thumb-nav mkdf-fsis-prev-nav"></div>
            <div class="mkdf-fsis-thumb-nav mkdf-fsis-next-nav"></div>
            <div class="mkdf-fsis-slider-mask"></div>
        </div>
		<?php
	}

	private function getHolderClasses( $params ) {
		$holderClasses = array();
		
		$holderClasses[] = ! empty( $params['custom_class'] ) ? esc_attr( $params['custom_class'] ) : '';
		
		return implode( ' ', $holderClasses );
	}

	private function getSliderData( $params ) {
		$slider_data = array();
		
		$slider_data['data-number-of-items']             = '1';
		$slider_data['data-enable-loop']                 = 'yes';
		$slider_data['data-enable-autoplay']             = 'yes';
		$slider_data['data-enable-autoplay-hover-pause'] = 'yes';
		$slider_data['data-slider-padding']              = 'no';
		$slider_data['data-slider-speed']                = ! empty( $params['slider_speed'] ) ? $params['slider_speed'] : '6000';
		$slider_data['data-slider-speed-animation']      = ! empty( $params['slider_speed_animation'] ) ? $params['slider_speed_animation'] : '1000';
		$slider_data['data-enable-navigation']           = ! empty( $params['slider_navigation'] ) ? $params['slider_navigation'] : 'yes';
		$slider_data['data-enable-pagination']           = ! empty( $params['slider_pagination'] ) ? $params['slider_pagination'] : 'yes';
		
		return $slider_data;
	}

    private function getItemHolderClasses( $params ) {
        $holderClasses = array();

        $holderClasses[] = ! empty( $params['custom_class'] ) ? esc_attr( $params['custom_class'] ) : '';

        return implode( ' ', $holderClasses );
    }

    private function getItemImageStyles( $params ) {
        $styles = array();

        if ( ! empty( $params['background_image'] ) ) {
            $styles[] = 'background-image: url(' . wp_get_attachment_url( $params['background_image']['id'] ) . ')';
        }

        return implode( ';', $styles );
    }

    private function getItemTitleStyles( $params ) {
        $styles = array();

        if ( ! empty( $params['title_color'] ) ) {
            $styles[] = 'color: ' . $params['title_color'];
        }

        return implode( ';', $styles );
    }

    private function getItemSubitleStyles( $params ) {
        $styles = array();

        if ( ! empty( $params['subtitle_color'] ) ) {
            $styles[] = 'color: ' . $params['subtitle_color'];
        }

        return implode( ';', $styles );
    }

}
\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new WilmerCoreElementorFullScreenImageSlider() );