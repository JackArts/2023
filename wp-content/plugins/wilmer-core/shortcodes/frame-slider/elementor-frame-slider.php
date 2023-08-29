<?php
class WilmerCoreElementorFrameSlider extends \Elementor\Widget_Base {

	public function get_name() {
		return 'mkdf_frame_slider'; 
	}

	public function get_title() {
		return esc_html__( 'Frame Slider', 'wilmer-core' );
	}

	public function get_icon() {
		return 'wilmer-elementor-custom-icon wilmer-elementor-frame-slider';
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
			'images',
			[
				'label'     => esc_html__( 'Images', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::GALLERY,
				'description' => esc_html__( 'Select images from media library', 'wilmer-core' )
			]
		);

		$this->add_control(
			'custom_links',
			[
				'label'     => esc_html__( 'Custom Links', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXTAREA,
				'description' => esc_html__( 'Delimit links by comma', 'wilmer-core' )
			]
		);

		$this->add_control(
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


		$this->end_controls_section();
	}
	public function render() {

		$params = $this->get_settings_for_display();
        $args = array(
            'images'       => '',
            'custom_links' => '',
            'target'       => '_self'
        );
		
		$params['slider_data'] = $this->getSliderData();
		$params['images']      = $this->getGalleryImages( $params );
		$params['links']       = $this->getGalleryLinks( $params );
		$params['target']      = ! empty( $params['target'] ) ? $params['target'] : $args['target'];

        echo  wilmer_core_get_shortcode_module_template_part( 'templates/frame-slider', 'frame-slider', '', $params );

	}

	private function getSliderData() {
		$slider_data = array();
		
		$slider_data['data-number-of-items']   = '5';
		$slider_data['data-enable-center']     = 'yes';
		$slider_data['data-enable-auto-width'] = 'yes';
		$slider_data['data-enable-navigation'] = 'no';
		$slider_data['data-enable-pagination'] = 'yes';
		$slider_data['data-slider-speed'] = 4000;

		return $slider_data;
	}

	private function getGalleryImages( $params ) {
		$image_ids = array();
		$images    = array();
		$i         = 0;

        if ( $params['images'] !== '' ) {
            foreach ( $params['images'] as $image ) {
                $image_ids[] = $image['id'];
            }
        }
		
		foreach ( $image_ids as $id ) {
			
			$image['image_id'] = $id;
			$image_original    = wp_get_attachment_image_src( $id, 'full' );
			$image['url']      = $image_original[0];
			$image['alt']      = get_post_meta( $id, '_wp_attachment_image_alt', true );
			
			$images[ $i ] = $image;
			$i ++;
		}
		
		return $images;
	}

	private function getGalleryLinks( $params ) {
		$custom_links = array();
		
		if ( ! empty( $params['custom_links'] ) ) {
			$custom_links = array_map( 'trim', explode( ',', $params['custom_links'] ) );
		}
		
		return $custom_links;
	}

}
\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new WilmerCoreElementorFrameSlider() );