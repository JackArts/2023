<?php
class WilmerCoreElementorItemShowcase extends \Elementor\Widget_Base {

	public function get_name() {
		return 'mkdf_item_showcase'; 
	}

	public function get_title() {
		return esc_html__( 'Item Showcase', 'wilmer-core' );
	}

	public function get_icon() {
		return 'wilmer-elementor-custom-icon wilmer-elementor-item-showcase';
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
			'item_image',
			[
				'label'     => esc_html__( 'Image', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::MEDIA
			]
		);

		$this->add_control(
			'image_top_offset',
			[
				'label'     => esc_html__( 'Image Top Offset', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$repeater = new \Elementor\Repeater();

		$repeater->add_control(
			'item_position',
			[
				'label'     => esc_html__( 'Item Position', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'left' => esc_html__( 'Left', 'wilmer-core'), 
					'right' => esc_html__( 'Right', 'wilmer-core')
				),
				'default' => 'left'
			]
		);

		$repeater->add_control(
			'item_title',
			[
				'label'     => esc_html__( 'Item Title', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$repeater->add_control(
			'item_link',
			[
				'label'     => esc_html__( 'Item Link', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'condition' => [
					'item_title!' => ''
				]
			]
		);

		$repeater->add_control(
			'item_target',
			[
				'label'     => esc_html__( 'Item Target', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'_self' => esc_html__( 'Same Window', 'wilmer-core'), 
					'_blank' => esc_html__( 'New Window', 'wilmer-core')
				),
				'default' => '_self',
				'condition' => [
					'item_link!' => ''
				]
			]
		);

		$repeater->add_control(
			'item_title_tag',
			[
				'label'     => esc_html__( 'Item Title Tag', 'wilmer-core' ),
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
				'default' => 'h4',
				'condition' => [
					'item_title!' => ''
				]
			]
		);

		$repeater->add_control(
			'item_title_color',
			[
				'label'     => esc_html__( 'Item Title Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'condition' => [
					'item_title!' => ''
				]
			]
		);

		$repeater->add_control(
			'item_text',
			[
				'label'     => esc_html__( 'Item Text', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXTAREA
			]
		);

		$repeater->add_control(
			'item_text_color',
			[
				'label'     => esc_html__( 'Item Text Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'condition' => [
					'item_text!' => ''
				]
			]
		);

		$this->add_control(
			'item_showcase_item',
			[
				'label'     => esc_html__( 'Item Showcase List Item', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::REPEATER,
				'fields'     => $repeater->get_controls(),
				'title_field'     => esc_html__( 'Item', 'wilmer-core' )
			]
		);


		$this->end_controls_section();
	}
	public function render() {

		$params = $this->get_settings_for_display();


		$item_image_style = '';
		if ( ! empty( $params['image_top_offset'] ) ) {
			$item_image_style = 'margin-top: ' . wilmer_mikado_filter_px( $params['image_top_offset'] ) . 'px';
		}
		?>
		<div class="mkdf-item-showcase-holder clearfix">
            <?php foreach ( $params['item_showcase_item'] as $isi ) {

                $isi['showcase_item_class'] = $this->getShowcaseItemClasses( $isi );
                $isi['item_title_styles']   = $this->getTitleStyles( $isi );
                $isi['item_text_styles']    = $this->getTextStyles( $isi );

                echo wilmer_core_get_shortcode_module_template_part( 'templates/item-showcase-item', 'item-showcase', '', $isi );
            }
			if ( ! empty( $params['item_image'] ) ) {
                $params['item_image'] = $params['item_image']['id'];
                ?>
				<div class="mkdf-is-image" <?php wilmer_mikado_get_inline_style( $item_image_style ); ?>>
					 <?php echo wp_get_attachment_image( $params['item_image'], 'full' ); ?>
				</div>
			<?php } ?>
		</div>
<?php
	}

    private function getShowcaseItemClasses( $params ) {
        $itemClass = array();

        if ( ! empty( $params['item_position'] ) ) {
            $itemClass[] = 'mkdf-is-' . $params['item_position'];
        }

        return implode( ' ', $itemClass );
    }

    private function getTitleStyles( $params ) {
        $styles = array();

        if ( ! empty( $params['item_title_color'] ) ) {
            $styles[] = 'color: ' . $params['item_title_color'];
        }

        return implode( ';', $styles );
    }

    private function getTextStyles( $params ) {
        $styles = array();

        if ( ! empty( $params['item_text_color'] ) ) {
            $styles[] = 'color: ' . $params['item_text_color'];
        }

        return implode( ';', $styles );
    }

}
\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new WilmerCoreElementorItemShowcase() );