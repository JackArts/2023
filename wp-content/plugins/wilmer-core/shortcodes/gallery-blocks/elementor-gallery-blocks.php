<?php
class WilmerCoreElementorGalleryBlocks extends \Elementor\Widget_Base {

	public function get_name() {
		return 'mkdf_gallery_blocks'; 
	}

	public function get_title() {
		return esc_html__( 'Gallery Blocks', 'wilmer-core' );
	}

	public function get_icon() {
		return 'wilmer-elementor-custom-icon wilmer-elementor-gallery-blocks';
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
			'images',
			[
				'label'     => esc_html__( 'Images', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::GALLERY,
				'description' => esc_html__( 'Select images from media library. The first image you upload will be set as the featured image if you set Featured Image Size.', 'wilmer-core' )
			]
		);

		$this->add_control(
			'featured_image_size',
			[
				'label'     => esc_html__( 'Featured Image Size', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'description' => esc_html__( 'Enter image size. Example: thumbnail, medium, large, full or other sizes defined by current theme. Alternatively enter image size in pixels: 200x100 (Width x Height). Leave empty to use &quot;thumbnail&quot; size', 'wilmer-core' )
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
			'enable_lightbox',
			[
				'label'     => esc_html__( 'Enable Lightbox Functionality', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'no' => esc_html__( 'No', 'wilmer-core'), 
					'yes' => esc_html__( 'Yes', 'wilmer-core')
				),
				'default' => 'no'
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


		$this->end_controls_section();
	}
	public function render() {

		$params = $this->get_settings_for_display();

        $args   = array(
            'custom_class'        => '',
            'images'              => '',
            'featured_image_size' => '',
            'image_size'          => 'full',
            'enable_lightbox'     => '',
            'space_between_items' => 'normal'
        );
		
		$params['holder_classes']      = $this->getHolderClasses( $params, $args );
		$params['images']              = $this->getImages( $params );
		$params['featured_image_size'] = $this->getFeaturedImageSize( $params['featured_image_size'] );
		$params['image_size']          = $this->getImageSize( $params['image_size'] );
		$params['enable_lightbox']     = ( $params['enable_lightbox'] === 'yes' ) ? true : false;

        echo wilmer_core_get_shortcode_module_template_part( 'templates/gallery-blocks', 'gallery-blocks', '', $params );

	}

	private function getHolderClasses( $params, $args ) {
		$holderClasses = array();
		
		$holderClasses[] = ! empty( $params['custom_class'] ) ? esc_attr( $params['custom_class'] ) : '';
		$holderClasses[] = ! empty( $params['space_between_items'] ) ? 'mkdf-' . $params['space_between_items'] . '-space' : 'mkdf-' . $args['space_between_items'] . '-space';
		
		return implode( ' ', $holderClasses );
	}

	private function getImages( $params ) {
		$image_ids = array();
		$images    = array();

        if ( $params['images'] !== '' ) {
            foreach ( $params['images'] as $image ) {
                $image_ids[] = $image['id'];
            }
        }
		
		foreach ( $image_ids as $id ) {
			$image['id']    = $id;
			$image_original = wp_get_attachment_image_src( $id, 'full' );
			$image['url']   = $image_original[0];
			$image['alt']   = get_post_meta( $id, '_wp_attachment_image_alt', true );
			
			$images[] = $image;
		}
		
		return $images;
	}

	private function getFeaturedImageSize( $featured_image_size ) {
		$featured_image_size = trim( $featured_image_size );
		//Find digits
		preg_match_all( '/\d+/', $featured_image_size, $matches );
		if ( in_array( $featured_image_size, array( 'thumbnail', 'thumb', 'medium', 'large', 'full' ) ) ) {
			return $featured_image_size;
		} elseif ( ! empty( $matches[0] ) ) {
			return array(
				$matches[0][0],
				$matches[0][1]
			);
		} else {
			return 'no-image';
		}
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
\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new WilmerCoreElementorGalleryBlocks() );