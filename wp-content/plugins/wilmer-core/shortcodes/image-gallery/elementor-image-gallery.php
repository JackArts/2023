<?php
class WilmerCoreElementorImageGallery extends \Elementor\Widget_Base {

	public function get_name() {
		return 'mkdf_image_gallery'; 
	}

	public function get_title() {
		return esc_html__( 'Image Gallery', 'wilmer-core' );
	}

	public function get_icon() {
		return 'wilmer-elementor-custom-icon wilmer-elementor-image-gallery';
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
				'label'     => esc_html__( 'Gallery Type', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'grid' => esc_html__( 'Image Grid', 'wilmer-core'), 
					'masonry' => esc_html__( 'Masonry', 'wilmer-core'), 
					'slider' => esc_html__( 'Slider', 'wilmer-core'), 
					'carousel' => esc_html__( 'Carousel', 'wilmer-core')
				),
				'default' => 'grid'
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
			'image_size',
			[
				'label'     => esc_html__( 'Image Size', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'description' => esc_html__( 'Enter image size. Example: thumbnail, medium, large, full or other sizes defined by current theme. Alternatively enter image size in pixels: 200x100 (Width x Height). Leave empty to use &quot;full&quot; size', 'wilmer-core' )
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
					'grayscale' => esc_html__( 'Grayscale', 'wilmer-core')
				),
				'default' => ''
			]
		);

		$this->add_control(
			'custom_links',
			[
				'label'     => esc_html__( 'Custom Links', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXTAREA,
				'description' => esc_html__( 'Delimit links by comma', 'wilmer-core' ),
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

		$this->add_control(
			'number_of_columns',
			[
				'label'     => esc_html__( 'Number of Columns', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'' => esc_html__( 'Default', 'wilmer-core'), 
					'one' => esc_html__( 'One', 'wilmer-core'), 
					'two' => esc_html__( 'Two', 'wilmer-core'), 
					'three' => esc_html__( 'Three', 'wilmer-core'), 
					'four' => esc_html__( 'Four', 'wilmer-core'), 
					'five' => esc_html__( 'Five', 'wilmer-core'), 
					'six' => esc_html__( 'Six', 'wilmer-core')
				),
				'default' => 'three',
				'condition' => [
					'type' => array( 'grid', 'masonry' )
				]
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

		$this->start_controls_section(
			'slider_settings',
			[
				'label' => esc_html__( 'Slider Settings', 'wilmer-core' ),
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
				'default' => '1',
				'condition' => [
					'type' => array( 'carousel' )
				]
			]
		);

		$this->add_control(
			'slider_overflow',
			[
				'label'     => esc_html__( 'Enable slider overflow', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'description' => esc_html__( 'Enabling this options will make rest of your slides visible out of the boundaries of slider', 'wilmer-core' ),
				'options' => array(
					'no' => esc_html__( 'No', 'wilmer-core'), 
					'yes' => esc_html__( 'Yes', 'wilmer-core')
				),
				'default' => 'no',
				'condition' => [
					'type' => array( 'carousel', 'slider' )
				]
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
				'default' => 'yes',
				'condition' => [
					'type' => array( 'slider', 'carousel' )
				]
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
				'default' => 'yes',
				'condition' => [
					'type' => array( 'slider', 'carousel' )
				]
			]
		);

		$this->add_control(
			'slider_speed',
			[
				'label'     => esc_html__( 'Slide Duration', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'description' => esc_html__( 'Default value is 5000 (ms)', 'wilmer-core' ),
				'condition' => [
					'type' => array( 'slider', 'carousel' )
				]
			]
		);

		$this->add_control(
			'slider_speed_animation',
			[
				'label'     => esc_html__( 'Slide Animation Duration', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'description' => esc_html__( 'Speed of slide animation in milliseconds. Default value is 600.', 'wilmer-core' ),
				'condition' => [
					'type' => array( 'slider', 'carousel' )
				]
			]
		);

		$this->add_control(
			'slider_padding',
			[
				'label'     => esc_html__( 'Enable Slider Padding', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'description' => esc_html__( 'Padding left and right on stage (can see neighbours).', 'wilmer-core' ),
				'options' => array(
					'no' => esc_html__( 'No', 'wilmer-core'), 
					'yes' => esc_html__( 'Yes', 'wilmer-core')
				),
				'default' => 'no',
				'condition' => [
					'type' => array( 'slider' )
				]
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
				'default' => 'yes',
				'condition' => [
					'type' => array( 'slider', 'carousel' )
				]
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
				'default' => 'yes',
				'condition' => [
					'type' => array( 'slider', 'carousel' )
				]
			]
		);


		$this->end_controls_section();
	}
	public function render() {

		$params = $this->get_settings_for_display();

        $args   = array(
            'custom_class'            => '',
            'type'                    => 'grid',
            'images'                  => '',
            'image_size'              => 'full',
            'enable_image_shadow'     => 'no',
            'image_behavior'          => '',
            'custom_links'            => '',
            'custom_link_target'      => '_self',
            'number_of_columns'       => 'three',
            'space_between_items'     => 'normal',
            'number_of_visible_items' => '1',
            'slider_overflow'         => 'no',
            'slider_loop'             => 'yes',
            'slider_autoplay'         => 'yes',
            'slider_speed'            => '5000',
            'slider_speed_animation'  => '600',
            'slider_padding'          => 'no',
            'slider_navigation'       => 'yes',
            'slider_pagination'       => 'yes'
        );
		
		$params['holder_classes'] = $this->getHolderClasses( $params, $args );
		$params['slider_data']    = $this->getSliderData( $params );
		
		$params['type']               = ! empty( $params['type'] ) ? $params['type'] : $args['type'];
		$params['images']             = $this->getGalleryImages( $params );
		$params['image_size']         = $this->getImageSize( $params['image_size'] );
		$params['image_behavior']     = ! empty( $params['image_behavior'] ) ? $params['image_behavior'] : $args['image_behavior'];
		$params['custom_links']       = $this->getCustomLinks( $params );
		$params['custom_link_target'] = ! empty( $params['custom_link_target'] ) ? $params['custom_link_target'] : $args['custom_link_target'];

        echo wilmer_core_get_shortcode_module_template_part( 'templates/' . $params['type'], 'image-gallery', '', $params );

	}

	private function getHolderClasses( $params, $args ) {
		$holderClasses = array();
		
		$holderClasses[] = ! empty( $params['custom_class'] ) ? esc_attr( $params['custom_class'] ) : '';
		$holderClasses[] = ! empty( $params['type'] ) ? 'mkdf-ig-' . $params['type'] . '-type' : 'mkdf-ig-' . $args['type'] . '-type';
		$holderClasses[] = ! empty( $params['number_of_columns'] ) ? 'mkdf-' . $params['number_of_columns'] . '-columns' : 'mkdf-' . $args['number_of_columns'] . '-columns';
		$holderClasses[] = ! empty( $params['space_between_items'] ) ? 'mkdf-' . $params['space_between_items'] . '-space' : 'mkdf-' . $args['space_between_items'] . '-space';
		$holderClasses[] = $params['enable_image_shadow'] === 'yes' ? 'mkdf-has-shadow' : '';
		$holderClasses[] = ! empty( $params['image_behavior'] ) ? 'mkdf-image-behavior-' . $params['image_behavior'] : '';
        $holderClasses[] = $params['slider_overflow'] === 'yes' ? 'mkdf-slider-overflow-visible' : '';

		return implode( ' ', $holderClasses );
	}

	private function getSliderData( $params ) {
		$slider_data = array();

		$slider_data['data-number-of-items']        = $params['number_of_visible_items'] !== '' && $params['type'] === 'carousel' ? $params['number_of_visible_items'] : '1';
		$slider_data['data-enable-loop']            = ! empty( $params['slider_loop'] ) ? $params['slider_loop'] : '';
		$slider_data['data-enable-autoplay']        = ! empty( $params['slider_autoplay'] ) ? $params['slider_autoplay'] : '';
		$slider_data['data-slider-speed']           = ! empty( $params['slider_speed'] ) ? $params['slider_speed'] : '5000';
		$slider_data['data-slider-speed-animation'] = ! empty( $params['slider_speed_animation'] ) ? $params['slider_speed_animation'] : '600';
		$slider_data['data-slider-padding']         = ! empty( $params['slider_padding'] ) ? $params['slider_padding'] : '';
		$slider_data['data-enable-navigation']      = ! empty( $params['slider_navigation'] ) ? $params['slider_navigation'] : '';
		$slider_data['data-enable-pagination']      = ! empty( $params['slider_pagination'] ) ? $params['slider_pagination'] : '';

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
			$image['url']      = is_array($image_original) ? $image_original[0] : '';
			$image['title']    = get_the_title( $id );
			$image['alt']      = get_post_meta( $id, '_wp_attachment_image_alt', true );
			
			$images[ $i ] = $image;
			$i ++;
		}
		
		return $images;
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
			return 'full';
		}
	}

	private function getCustomLinks( $params ) {
		$custom_links = array();
		
		if ( ! empty( $params['custom_links'] ) ) {
			$custom_links = array_map( 'trim', explode( ',', $params['custom_links'] ) );
		}
		
		return $custom_links;
	}

}
\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new WilmerCoreElementorImageGallery() );