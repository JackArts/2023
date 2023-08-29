<?php
class WilmerCoreElementorExpandedGallery extends \Elementor\Widget_Base {

	public function get_name() {
		return 'mkdf_expanded_gallery'; 
	}

	public function get_title() {
		return esc_html__( 'Expanded Gallery', 'wilmer-core' );
	}

	public function get_icon() {
		return 'wilmer-elementor-custom-icon wilmer-elementor-expanded-gallery';
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
			'number_of_images',
			[
				'label'     => esc_html__( 'Number of Images', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'three' => esc_html__( 'Three', 'wilmer-core'), 
					'five' => esc_html__( 'Five', 'wilmer-core')
				),
				'default' => 'five'
			]
		);

		$this->add_control(
			'images',
			[
				'label'     => esc_html__( 'Images', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::GALLERY,
				'description' => esc_html__( 'Select images from media library. Images needs to be same size', 'wilmer-core' )
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
			'custom_link_target',
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


		
		$params['holder_classes'] = $this->getHolderClasses( $params );
		$params['images']         = $this->getGalleryImages( $params );
		$params['links']          = $this->getGalleryLinks( $params );
		$params['target']         = ! empty( $params['custom_link_target'] ) ? $params['custom_link_target'] : $args['custom_link_target'];

        echo wilmer_core_get_shortcode_module_template_part( 'templates/expanded-gallery', 'expanded-gallery', '', $params );

	}

	private function getHolderClasses( $params ) {
		$holderClasses = array();
		
		$holderClasses[] = ! empty( $params['custom_class'] ) ? esc_attr( $params['custom_class'] ) : '';
		$holderClasses[] = ! empty( $params['number_of_images'] ) ? ' mkdf-eg-' . $params['number_of_images'] : ' mkdf-eg-five';
		
		return implode( ' ', $holderClasses );
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
\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new WilmerCoreElementorExpandedGallery() );