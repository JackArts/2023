<?php
class WilmerCoreElementorUncoveringSections extends \Elementor\Widget_Base {

	public function get_name() {
		return 'mkdf_uncovering_sections'; 
	}

	public function get_title() {
		return esc_html__( 'Uncovering Sections', 'wilmer-core' );
	}

	public function get_icon() {
		return 'wilmer-elementor-custom-icon wilmer-elementor-uncovering-sections';
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
			'background_color',
			[
				'label'     => esc_html__( 'Background Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR
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
			'background_position',
			[
				'label'     => esc_html__( 'Background Image Position', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'description' => esc_html__( 'Please insert position in format horizontal vertical position, example - center center', 'wilmer-core' ),
				'condition' => [
					'background_image!' => ''
				]
			]
		);

		$repeater->add_control(
			'background_size',
			[
				'label'     => esc_html__( 'Background Image Size', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'cover' => esc_html__( 'Cover', 'wilmer-core'), 
					'contain' => esc_html__( 'Contain', 'wilmer-core'), 
					'inherit' => esc_html__( 'Inherit', 'wilmer-core')
				),
				'default' => 'cover',
				'condition' => [
					'background_image!' => ''
				]
			]
		);

		$repeater->add_control(
			'padding',
			[
				'label'     => esc_html__( 'Content Padding', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'description' => esc_html__( 'Please insert padding in format top right bottom left. You can use px or %', 'wilmer-core' )
			]
		);

		$repeater->add_control(
			'vertical_alignment',
			[
				'label'     => esc_html__( 'Content Vertical Alignment', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'' => esc_html__( 'Default', 'wilmer-core'), 
					'top' => esc_html__( 'Top', 'wilmer-core'), 
					'middle' => esc_html__( 'Middle', 'wilmer-core'), 
					'bottom' => esc_html__( 'Bottom', 'wilmer-core')
				),
				'default' => ''
			]
		);

		$repeater->add_control(
			'horizontal_alignment',
			[
				'label'     => esc_html__( 'Content Horizontal Alignment', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'' => esc_html__( 'Default', 'wilmer-core'), 
					'left' => esc_html__( 'Left', 'wilmer-core'), 
					'center' => esc_html__( 'Center', 'wilmer-core'), 
					'right' => esc_html__( 'Right', 'wilmer-core')
				),
				'default' => ''
			]
		);

		$repeater->add_control(
			'link',
			[
				'label'     => esc_html__( 'Link', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'description' => esc_html__( 'Set custom link around item', 'wilmer-core' )
			]
		);

		$repeater->add_control(
			'link_target',
			[
				'label'     => esc_html__( 'Custom Link Target', 'wilmer-core' ),
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

		$repeater->add_control(
			'header_skin',
			[
				'label'     => esc_html__( 'Header Skin', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'description' => esc_html__( 'Choose a predefined header style for header elements', 'wilmer-core' ),
				'options' => array(
					'' => esc_html__( 'Default', 'wilmer-core'), 
					'light' => esc_html__( 'Light', 'wilmer-core'), 
					'dark' => esc_html__( 'Dark', 'wilmer-core')
				),
				'default' => ''
			]
		);

		$repeater->add_control(
			'image_laptop',
			[
				'label'     => esc_html__( 'Background Image for Laptops', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::MEDIA
			]
		);

		$repeater->add_control(
			'image_tablet',
			[
				'label'     => esc_html__( 'Background Image for Tablets - Landscape', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::MEDIA
			]
		);

		$repeater->add_control(
			'image_tablet_portrait',
			[
				'label'     => esc_html__( 'Background Image for Tablets - Portrait', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::MEDIA
			]
		);

		$repeater->add_control(
			'image_mobile',
			[
				'label'     => esc_html__( 'Background Image for Mobiles', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::MEDIA
			]
		);

        wilmer_core_generate_elementor_templates_control( $repeater );

		$this->add_control(
			'uncovering_sections_item',
			[
				'label'     => esc_html__( 'Uncovering Sections Item', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::REPEATER,
				'fields'     => $repeater->get_controls(),
				'title_field'     => esc_html__( 'Item', 'wilmer-core' )
			]
		);


		$this->end_controls_section();
	}
	public function render() {

		$params = $this->get_settings_for_display(); ?>

		<div class="mkdf-uncovering-sections">
			<ul class="mkdf-us-wrapper curtains" data-image-holder-name=".mkdf-uss-image-holder" data-fade-element-name=".mkdf-fss-shadow">
				<?php foreach ($params['uncovering_sections_item'] as $item) {
					$rand_class = 'mkdf-uss-custom-' . mt_rand(100000,1000000);

					$item['holder_unique_class'] = $rand_class;
					$item['holder_classes']      = $this->getHolderClasses( $item );
					$item['holder_data']         = $this->getHolderData( $item );
					$item['image_data']          = $this->getImageData( $item );
					$item['holder_styles']       = $this->getHolderStyles( $item );
					$item['item_inner_styles']   = $this->getItemInnerStyles( $item );

					$left['content'] = Elementor\Plugin::instance()->frontend->get_builder_content_for_display($item['template_id']);

					echo wilmer_core_get_shortcode_module_template_part('templates/uncovering-sections-item', 'uncovering-sections', '', $item );
				} ?>
			</ul>
			<div class="mkdf-fss-shadow"></div>
		</div>

	<?php  }

    private function getHolderClasses( $params ) {
        $holderClasses = array();

        $holderClasses[] = ! empty( $params['custom_class'] ) ? esc_attr( $params['custom_class'] ) : '';
        $holderClasses[] = ! empty( $params['holder_unique_class'] ) ? $params['holder_unique_class'] : '';
        $holderClasses[] = ! empty( $params['vertical_alignment'] ) ? 'mkdf-uss-item-va-' . $params['vertical_alignment'] : '';
        $holderClasses[] = ! empty( $params['horizontal_alignment'] ) ? 'mkdf-uss-item-ha-' . $params['horizontal_alignment'] : '';
        $holderClasses[] = ! empty( $params['link'] ) ? 'mkdf-uss-item-has-link' : '';
        $holderClasses[] = ! empty( $params['header_skin'] ) ? 'mkdf-uss-item-has-style' : '';

        return implode( ' ', $holderClasses );
    }

    private function getHolderData( $params ) {
        $data                    = array();
        $data['data-item-class'] = $params['holder_unique_class'];

        if ( ! empty( $params['header_skin'] ) ) {
            $data['data-header-style'] = $params['header_skin'];
        }

        return $data;
    }

    private function getImageData( $params ) {
        $data                    = array();

        if ( ! empty( $params['image_laptop'] ) ) {
            $image                     = wp_get_attachment_image_src( $params['image_laptop']['id'], 'full' );
            $data['data-laptop-image'] = $image[0];
        }

        if ( ! empty( $params['image_tablet'] ) ) {
            $image                     = wp_get_attachment_image_src( $params['image_tablet']['id'], 'full' );
            $data['data-tablet-image'] = $image[0];
        }

        if ( ! empty( $params['image_tablet_portrait'] ) ) {
            $image                              = wp_get_attachment_image_src( $params['image_tablet_portrait']['id'], 'full' );
            $data['data-tablet-portrait-image'] = $image[0];
        }

        if ( ! empty( $params['image_mobile'] ) ) {
            $image                     = wp_get_attachment_image_src( $params['image_mobile']['id'], 'full' );
            $data['data-mobile-image'] = $image[0];
        }

        return $data;
    }

    private function getHolderStyles( $params ) {
        $styles = array();

        if ( ! empty( $params['background_color'] ) ) {
            $styles[] = 'background-color: ' . $params['background_color'];
        }

        if ( ! empty( $params['background_image'] ) ) {
            $styles[] = 'background-image: url(' . wp_get_attachment_url( $params['background_image']['id'] ) . ')';

            if ( ! empty( $params['background_position'] ) ) {
                $styles[] = 'background-position:' . $params['background_position'];
            }

            if ( ! empty( $params['background_size'] ) ) {
                $styles[] = 'background-size:' . $params['background_size'];
            }
        }

        return implode( ';', $styles );
    }

    private function getItemInnerStyles( $params ) {
        $styles = array();

        if ( $params['padding'] !== '' ) {
            $styles[] = 'padding: ' . $params['padding'];
        }

        return implode( ';', $styles );
    }

}
\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new WilmerCoreElementorUncoveringSections() );