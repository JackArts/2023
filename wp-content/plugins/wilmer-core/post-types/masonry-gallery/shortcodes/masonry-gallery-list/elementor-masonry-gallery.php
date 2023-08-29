<?php
class WilmerCoreElementorMasonryGallery extends \Elementor\Widget_Base {

	public function get_name() {
		return 'mkdf_masonry_gallery'; 
	}

	public function get_title() {
		return esc_html__( 'Masonry Gallery', 'wilmer-core' );
	}

	public function get_icon() {
		return 'wilmer-elementor-custom-icon wilmer-elementor-masonry-gallery-list';
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
			'number',
			[
				'label'     => esc_html__( 'Number of Items', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
                'default'   => -1
			]
		);

		$this->add_control(
			'show_title',
			[
				'label'     => esc_html__( 'Show Title', 'wilmer-core' ),
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

		$this->add_control(
			'category',
			[
				'label'     => esc_html__( 'Category', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'description' => esc_html__( 'Enter one category slug (leave empty for showing all categories)', 'wilmer-core' )
			]
		);

		$this->add_control(
			'orderby',
			[
				'label'     => esc_html__( 'Order By', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'date' => esc_html__( 'Date', 'wilmer-core'), 
					'ID' => esc_html__( 'ID', 'wilmer-core'), 
					'menu_order' => esc_html__( 'Menu Order', 'wilmer-core'), 
					'name' => esc_html__( 'Post Name', 'wilmer-core'), 
					'rand' => esc_html__( 'Random', 'wilmer-core'), 
					'title' => esc_html__( 'Title', 'wilmer-core')
				),
				'default' => 'date'
			]
		);

		$this->add_control(
			'order',
			[
				'label'     => esc_html__( 'Order', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'ASC' => esc_html__( 'ASC', 'wilmer-core'), 
					'DESC' => esc_html__( 'DESC', 'wilmer-core')
				),
				'default' => 'ASC'
			]
		);


		$this->end_controls_section();
	}
	public function render() {

		$params = $this->get_settings_for_display();
        extract($params);
		/* Query for items */
        $query_args = array(
            'post_type'      => 'masonry-gallery',
            'orderby'        => $params['orderby'],
            'order'          => $params['order'],
            'posts_per_page' => $params['number']
        );
		
		if ( ! empty( $params['category'] ) ) {
			$query_args['masonry-gallery-category'] = $params['category'];
		}
		
		$holder_classes = '';
		if ( ! empty( $space_between_items ) ) {
			$holder_classes = 'mkdf-' . $space_between_items . '-space';
		}
		
		$query = new \WP_Query( $query_args );
		
		$html = '<div class="mkdf-masonry-gallery-holder mkdf-disable-bottom-space ' . esc_attr( $holder_classes ) . '">';
			$html .= '<div class="mkdf-mg-inner mkdf-outer-space">';
				$html .= '<div class="mkdf-mg-grid-sizer"></div>';
				$html .= '<div class="mkdf-mg-grid-gutter"></div>';
				
				if ( $query->have_posts() ) :
					while ( $query->have_posts() ) : $query->the_post();
						$itemID         = get_the_ID();
						$typeOption     = get_post_meta( $itemID, 'mkdf_masonry_gallery_item_type', true );
						$title          = get_the_title( $itemID );
						$titleTagOption = get_post_meta( $itemID, 'mkdf_masonry_gallery_item_title_tag', true );
						$text           = get_post_meta( $itemID, 'mkdf_masonry_gallery_item_content', true );
						$link           = get_post_meta( $itemID, 'mkdf_masonry_gallery_item_link', true );
						$target         = get_post_meta( $itemID, 'mkdf_masonry_gallery_item_link_target', true );

						
						$type                           = ! empty( $typeOption ) ? $typeOption : 'standard';
						$params['item_title']           = ! empty( $title ) ? $title : '';
                        $params['show_title']           = $show_title;
						$params['item_title_tag']       = ! empty( $titleTagOption ) ? $titleTagOption : 'h4';
						$params['item_content']         = ! empty( $text ) ? $text : '';
						$params['item_link']            = ! empty( $link ) ? $link : '';
						$params['item_link_target']     = ! empty( $target ) ? $target : '_self';
						$params['item_button_label']    = ! empty( $button_label ) ? $button_label : '';
						$params['current_id']           = $itemID;
						$params['item_classes']         = $this->getItemClasses();
						$params['item_image']           = $this->getItemImage( $params );
						$params['background_color']     = $this->getBackgroundColor( $params );
						$params['item_padding']         = $this->getPadding( $params );

						$html .= wilmer_core_get_cpt_shortcode_module_template_part( 'masonry-gallery', 'masonry-gallery-list', 'masonry-gallery-' . $type . '-template', '', $params );
					
					endwhile;
				else:
					$html .= esc_html__( 'Sorry, no posts matched your criteria.', 'wilmer-core' );
				endif;
				wp_reset_postdata();
			$html .= '</div>';
		$html .= '</div>';
		
		echo $html;
	}

	private function getItemClasses() {
		$classes = array( 'mkdf-mg-item' );
		
		$itemID          = get_the_ID();
		$type            = get_post_meta( $itemID, 'mkdf_masonry_gallery_item_type', true );
		$image_size      = get_post_meta( $itemID, 'mkdf_masonry_gallery_item_size', true );
		$background_skin = get_post_meta( $itemID, 'mkdf_masonry_gallery_simple_content_background_skin', true );
		$vertical_alignment = get_post_meta( $itemID, 'mkdf_masonry_gallery_item_vertical_align', true );
		$advanced_responsive_padding = get_post_meta( $itemID, 'mkdf_masonry_gallery_item_advanced_responsive_padding', true );

		if(! empty($advanced_responsive_padding) && $advanced_responsive_padding == 'yes'){
		    $classes[] = 'mkdf-mg-advanced-responsive-padding';
        }

		if ( ! empty( $type ) ) {
			$classes[] = 'mkdf-mg-' . $type;
		}
		
		if ( ! empty( $image_size ) ) {
			$classes[] = 'mkdf-masonry-size-' . $image_size;
		}
		
		if ( ! empty( $background_skin ) ) {
			$classes[] = 'mkdf-mg-skin-' . $background_skin;
		}

		if ( ! empty( $vertical_alignment ) ) {
			$classes[] = 'mkdf-mg-vertical-align-' . $vertical_alignment;
		}
		
		return implode( ' ', $classes );
	}

	public function getItemImage( $params ) {
		$output = '';

        $id = $params['current_id'];

        $fixed_image_size = get_post_meta( $id, 'mkdf_masonry_gallery_item_size', true );

        switch ( $fixed_image_size ) {
            case 'small' :
                $thumb_size = 'wilmer_mikado_image_square';
                break;
            case 'large-width':
                $thumb_size = 'wilmer_mikado_image_landscape';
                break;
            case 'large-height':
                $thumb_size = 'wilmer_mikado_image_portrait';
                break;
            case 'large-width-height':
                $thumb_size = 'wilmer_mikado_image_huge';
                break;
            default :
                $thumb_size = 'full';
                break;
        }

        $output .= get_the_post_thumbnail( $id, $thumb_size );

        return $output;
	}

    public function getBackgroundColor( $params ) {
        $background_color = get_post_meta( $params['current_id'], 'mkdf_masonry_gallery_item_bg_color', true );

        return $background_color;
    }

    public function getPadding( $params ) {
        $item_padding = get_post_meta( $params['current_id'], 'mkdf_masonry_gallery_item_padding', true );

        return $item_padding;
    }



}
\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new WilmerCoreElementorMasonryGallery() );