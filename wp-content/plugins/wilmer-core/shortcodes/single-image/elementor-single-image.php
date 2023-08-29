<?php
class WilmerCoreElementorSingleImage extends \Elementor\Widget_Base {

	public function get_name() {
		return 'mkdf_single_image'; 
	}

	public function get_title() {
		return esc_html__( 'Single Image', 'wilmer-core' );
	}

	public function get_icon() {
		return 'wilmer-elementor-custom-icon wilmer-elementor-single-image';
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
			'image',
			[
				'label'     => esc_html__( 'Image', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::MEDIA,
				'description' => esc_html__( 'Select image from media library', 'wilmer-core' )
			]
		);

		$this->add_control(
			'image_size',
			[
				'label'     => esc_html__( 'Image Size', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'description' => esc_html__( 'Enter image size. Example: thumbnail, medium, large, full or other sizes defined by current theme. Alternatively enter image size in pixels: 200x100 (Width x Height). Leave empty to use &quot;thumbnail&quot; size', 'wilmer-core' )
			]
		);

		$this->add_control(
			'enable_image_shadow',
			[
				'label'     => esc_html__( 'Enable Image Shadow', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'no' => esc_html__( 'No', 'wilmer-core'), 
					'yes' => esc_html__( 'Yes', 'wilmer-core')
				),
				'default' => 'no'
			]
		);

		$this->add_control(
			'image_behavior',
			[
				'label'     => esc_html__( 'Image Behavior', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'' => esc_html__( 'None', 'wilmer-core'), 
					'lightbox' => esc_html__( 'Open Lightbox', 'wilmer-core'), 
					'custom-link' => esc_html__( 'Open Custom Link', 'wilmer-core'), 
					'zoom' => esc_html__( 'Zoom', 'wilmer-core'), 
					'grayscale' => esc_html__( 'Grayscale', 'wilmer-core'), 
					'moving' => esc_html__( 'Moving on Hover', 'wilmer-core')
				),
				'default' => ''
			]
		);

		$this->add_control(
			'custom_link',
			[
				'label'     => esc_html__( 'Custom Link', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'condition' => [
					'image_behavior' => array( 'custom-link' )
				]
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
				'default' => '_self',
				'condition' => [
					'image_behavior' => array( 'custom-link' )
				]
			]
		);


		$this->end_controls_section();
	}
	public function render() {

		$params = $this->get_settings_for_display();

        if ( ! empty( $params['image'] ) ) {
            $params['image'] = $params['image']['id'];
        }
		
		$params['holder_classes']     = $this->getHolderClasses( $params );
		$params['holder_styles']      = $this->getHolderStyles( $params );
		$params['image']              = $this->getImage( $params );
		$params['image_size']         = $this->getImageSize( $params['image_size'] );
		$params['custom_link_target'] = ! empty( $params['custom_link_target'] ) ? $params['custom_link_target'] : '_self';

        echo wilmer_core_get_shortcode_module_template_part( 'templates/single-image', 'single-image', '', $params );

	}

	private function getHolderClasses( $params ) {
		$holderClasses = array();
		
		$holderClasses[] = ! empty( $params['custom_class'] ) ? esc_attr( $params['custom_class'] ) : '';
		$holderClasses[] = $params['enable_image_shadow'] === 'yes' ? 'mkdf-has-shadow' : '';
		$holderClasses[] = ! empty( $params['image_behavior'] ) ? 'mkdf-image-behavior-' . $params['image_behavior'] : '';
		
		return implode( ' ', $holderClasses );
	}

	private function getHolderStyles( $params ) {
		$styles = array();
		
		if ( ! empty( $params['image'] ) && $params['image_behavior'] === 'moving' ) {
			$image_original = wp_get_attachment_image_src( $params['image'], 'full' );
			
			$styles[] = 'background-image: url(' . $image_original[0] . ')';
		}
		
		return implode( ';', $styles );
	}

	private function getImage( $params ) {
		$image = array();
		
		if ( ! empty( $params['image'] ) ) {
			$id = $params['image'];
			
			$image['image_id'] = $id;
			$image_original    = wp_get_attachment_image_src( $id, 'full' );
			$image['url']      = $image_original[0];
			$image['alt']      = get_post_meta( $id, '_wp_attachment_image_alt', true );
		}
		
		return $image;
	}

	private function getImageSize( $image_size ) {
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
			return 'thumbnail';
		}
	}

}
\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new WilmerCoreElementorSingleImage() );