<?php
class WilmerCoreElementorClientsGrid extends \Elementor\Widget_Base {

	public function get_name() {
		return 'mkdf_clients_grid'; 
	}

	public function get_title() {
		return esc_html__( 'Clients Grid', 'wilmer-core' );
	}

	public function get_icon() {
		return 'wilmer-elementor-custom-icon wilmer-elementor-clients-grid';
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
				'default' => 'three'
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
			'image_alignment',
			[
				'label'     => esc_html__( 'Items Horizontal Alignment', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'' => esc_html__( 'Default Center', 'wilmer-core'), 
					'left' => esc_html__( 'Left', 'wilmer-core'), 
					'right' => esc_html__( 'Right', 'wilmer-core')
				),
				'default' => ''
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
		
		$params['holder_classes'] = $this->getHolderClasses( $params ); ?>
        <div class="mkdf-clients-grid-holder mkdf-grid-list mkdf-disable-bottom-space <?php echo esc_attr( $params['holder_classes'] ); ?>">
            <div class="mkdf-cg-inner mkdf-outer-space">
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
		
		$holderClasses[] = ! empty( $params['number_of_columns'] ) ? 'mkdf-' . $params['number_of_columns'] . '-columns' : '';
		$holderClasses[] = ! empty( $params['space_between_items'] ) ? 'mkdf-' . $params['space_between_items'] . '-space' : '';
		$holderClasses[] = ! empty( $params['image_alignment'] ) ? 'mkdf-cg-alignment-' . $params['image_alignment'] : '';
		$holderClasses[] = ! empty( $params['items_hover_animation'] ) ? 'mkdf-cc-hover-' . $params['items_hover_animation'] : '';
		
		return implode( ' ', $holderClasses );
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
\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new WilmerCoreElementorClientsGrid() );