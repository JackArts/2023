<?php
class WilmerCoreElementorClientsCarousel extends \Elementor\Widget_Base {

	public function get_name() {
		return 'mkdf_clients_carousel'; 
	}

	public function get_title() {
		return esc_html__( 'Clients Carousel', 'wilmer-core' );
	}

	public function get_icon() {
		return 'wilmer-elementor-custom-icon wilmer-elementor-clients-carousel';
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
				'label'     => esc_html__( 'Number Of Visible Items', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'1' => esc_html__( 'One', 'wilmer-core'), 
					'2' => esc_html__( 'Two', 'wilmer-core'), 
					'3' => esc_html__( 'Three', 'wilmer-core'), 
					'4' => esc_html__( 'Four', 'wilmer-core'), 
					'5' => esc_html__( 'Five', 'wilmer-core'), 
					'6' => esc_html__( 'Six', 'wilmer-core')
				),
				'default' => '4'
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
					'no' => esc_html__( 'No', 'wilmer-core'), 
					'yes' => esc_html__( 'Yes', 'wilmer-core')
				),
				'default' => 'no'
			]
		);

		$this->add_control(
			'slider_pagination',
			[
				'label'     => esc_html__( 'Enable Slider Pagination', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'no' => esc_html__( 'No', 'wilmer-core'), 
					'yes' => esc_html__( 'Yes', 'wilmer-core')
				),
				'default' => 'no'
			]
		);

		$this->add_control(
			'items_hover_animation',
			[
				'label'     => esc_html__( 'Items Hover Animation', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'switch-images' => esc_html__( 'Switch Images', 'wilmer-core'), 
					'roll-over' => esc_html__( 'Roll Over', 'wilmer-core')
				),
				'default' => 'switch-images'
			]
		);

		$repeater = new \Elementor\Repeater();

		$repeater->add_control(
			'image',
			[
				'label'     => esc_html__( 'Image', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::MEDIA,
				'description' => esc_html__( 'Select image from media library', 'wilmer-core' )
			]
		);

		$repeater->add_control(
			'hover_image',
			[
				'label'     => esc_html__( 'Hover Image', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::MEDIA,
				'description' => esc_html__( 'Select image from media library', 'wilmer-core' )
			]
		);

		$repeater->add_control(
			'image_size',
			[
				'label'     => esc_html__( 'Image Size', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'description' => esc_html__( 'Enter image size. Example: thumbnail, medium, large, full or other sizes defined by current theme. Alternatively enter image size in pixels: 200x100 (Width x Height). Leave empty to use &quot;thumbnail&quot; size', 'wilmer-core' )
			]
		);

		$repeater->add_control(
			'link',
			[
				'label'     => esc_html__( 'Custom Link', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$repeater->add_control(
			'target',
			[
				'label'     => esc_html__( 'Custom Link Target', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'_self' => esc_html__( 'Same Window', 'wilmer-core'), 
					'_blank' => esc_html__( 'New Window', 'wilmer-core')
				),
				'default' => '_self'
			]
		);

		$this->add_control(
			'clients_carousel_item',
			[
				'label'     => esc_html__( 'Clients Item', 'wilmer-core' ),
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
		$params['carousel_data']  = $this->getSliderData( $params );
        ?>
        <div class="mkdf-clients-carousel-holder <?php echo esc_attr($params['holder_classes']); ?>">
            <div class="mkdf-cc-inner mkdf-owl-slider" <?php echo wilmer_mikado_get_inline_attrs($params['carousel_data']); ?>>
                <?php foreach ( $params['clients_carousel_item'] as $client ) {

                    $client['holder_classes']   = $this->getItemHolderClasses( $client );
                    $client['image']            = $this->getItemCarouselImage( $client );
                    $client['hover_image']      = $this->getItemCarouselHoverImage( $client );

                    echo wilmer_core_get_shortcode_module_template_part( 'templates/clients-carousel-item', 'clients-carousel', '', $client );
                } ?>
            </div>
        </div>
			<?php

	}

	private function getHolderClasses( $params ) {
		$holderClasses = array();
		
		$holderClasses[] = ! empty( $params['items_hover_animation'] ) ? 'mkdf-cc-hover-' . $params['items_hover_animation'] : 'mkdf-cc-hover-switch-images';
		
		return implode( ' ', $holderClasses );
	}

	private function getSliderData( $params ) {
		$slider_data = array();
		
		$slider_data['data-number-of-items']        = ! empty( $params['number_of_visible_items'] ) ? $params['number_of_visible_items'] : '4';
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

        $holderClasses[] = ! empty( $params['link'] ) ? 'mkdf-cci-has-link' : 'mkdf-cci-no-link';

        return implode( ' ', $holderClasses );
    }

    private function getItemCarouselImage( $params ) {
        $image_meta = array();

        if ( ! empty( $params['image'] ) ) {
            $image_size  = $this->getItemCarouselImageSize( $params['image_size'] );
            $image_id       = $params['image']['id'];
            $image_original = wp_get_attachment_image_src( $image_id, $image_size );
            $image['url']   = $image_original[0];
            $image['alt']   = get_post_meta( $image_id, '_wp_attachment_image_alt', true );

            $image_meta = $image;
        }

        return $image_meta;
    }

    private function getItemCarouselHoverImage( $params ) {
        $image_meta = array();

        if ( ! empty( $params['hover_image'] ) ) {
            $image_size  = $this->getItemCarouselImageSize( $params['image_size'] );
            $image_id       = $params['hover_image']['id'];
            $image_original = wp_get_attachment_image_src( $image_id, $image_size );
            $image['url']   = $image_original[0];
            $image['alt']   = get_post_meta( $image_id, '_wp_attachment_image_alt', true );

            $image_meta = $image;
        }

        return $image_meta;
    }

    private function getItemCarouselImageSize( $image_size ) {
        $image_size = trim( $image_size );

        //Find digits
        preg_match_all( '/\d+/', $image_size, $matches );

        if ( in_array( $image_size, array( 'thumbnail', 'thumb', 'medium', 'large', 'full' ) ) ) {
            return $image_size;
        } elseif ( ! empty( $matches[0] ) ) {
            return array(
                $matches[0][0],
                $matches[0][1]
            );
        } else {
            return 'full';
        }
    }

}
\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new WilmerCoreElementorClientsCarousel() );