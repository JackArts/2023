<?php
class WilmerCoreElementorPricingTable extends \Elementor\Widget_Base {

	public function get_name() {
		return 'mkdf_pricing_table'; 
	}

	public function get_title() {
		return esc_html__( 'Pricing Table', 'wilmer-core' );
	}

	public function get_icon() {
		return 'wilmer-elementor-custom-icon wilmer-elementor-pricing-table';
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
			'set_active_item',
			[
				'label'     => esc_html__( 'Set Item As Active', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'no' => esc_html__( 'No', 'wilmer-core'), 
					'yes' => esc_html__( 'Yes', 'wilmer-core')
				),
				'default' => 'no'
			]
		);

		$repeater->add_control(
			'content_background_color',
			[
				'label'     => esc_html__( 'Content Background Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR
			]
		);

		$repeater->add_control(
			'title',
			[
				'label'     => esc_html__( 'Title', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$repeater->add_control(
			'title_color',
			[
				'label'     => esc_html__( 'Title Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'condition' => [
					'title!' => ''
				]
			]
		);

		$repeater->add_control(
			'title_border_color',
			[
				'label'     => esc_html__( 'Title Bottom Border Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'condition' => [
					'title!' => ''
				]
			]
		);

		$repeater->add_control(
			'price',
			[
				'label'     => esc_html__( 'Price', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$repeater->add_control(
			'price_color',
			[
				'label'     => esc_html__( 'Price Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'condition' => [
					'price!' => ''
				]
			]
		);

		$repeater->add_control(
			'currency',
			[
				'label'     => esc_html__( 'Currency', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'description' => esc_html__( 'Default mark is $', 'wilmer-core' )
			]
		);

		$repeater->add_control(
			'currency_color',
			[
				'label'     => esc_html__( 'Currency Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'condition' => [
					'currency!' => ''
				]
			]
		);

		$repeater->add_control(
			'price_period',
			[
				'label'     => esc_html__( 'Price Period', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'description' => esc_html__( 'Default label is monthly', 'wilmer-core' )
			]
		);

		$repeater->add_control(
			'price_period_color',
			[
				'label'     => esc_html__( 'Price Period Color', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'condition' => [
					'price_period!' => ''
				]
			]
		);

		$repeater->add_control(
			'button_text',
			[
				'label'     => esc_html__( 'Button Text', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);

		$repeater->add_control(
			'link',
			[
				'label'     => esc_html__( 'Button Link', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'condition' => [
					'button_text!' => ''
				]
			]
		);

		$repeater->add_control(
			'button_type',
			[
				'label'     => esc_html__( 'Button Type', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'solid' => esc_html__( 'Solid', 'wilmer-core'), 
					'outline' => esc_html__( 'Outline', 'wilmer-core')
				),
				'default' => 'solid',
				'condition' => [
					'button_text!' => ''
				]
			]
		);

		$repeater->add_control(
			'content',
			[
				'label'     => esc_html__( 'Content', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::WYSIWYG
			]
		);

		$this->add_control(
			'pricing_table_item',
			[
				'label'     => esc_html__( 'Pricing Table Item', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::REPEATER,
				'fields'     => $repeater->get_controls(),
				'title_field'     => esc_html__( 'Item', 'wilmer-core' )
			]
		);


		$this->end_controls_section();
	}
	public function render() {

		$params = $this->get_settings_for_display();

		$holder_class = $this->getHolderClasses( $params );
		?>
		<div class="mkdf-pricing-tables mkdf-grid-list mkdf-disable-bottom-space clearfix  <?php echo esc_attr( $holder_class ); ?>">
			<div class="mkdf-pt-wrapper mkdf-outer-space">
                <?php foreach ( $params['pricing_table_item'] as $pti ) {

                    $pti['holder_classes']          = $this->getItemHolderClasses( $pti );
                    $pti['holder_styles']           = $this->getHolderStyles( $pti );
                    $pti['title_styles']            = $this->getTitleStyles( $pti );
                    $pti['price_styles']            = $this->getPriceStyles( $pti );
                    $pti['currency_styles']         = $this->getCurrencyStyles( $pti );
                    $pti['price_period_styles']     = $this->getPricePeriodStyles( $pti );

                    echo wilmer_core_get_shortcode_module_template_part( 'templates/pricing-table-template', 'pricing-table', '', $pti );
                } ?>
                </div>
		</div>

<?php
	}

	private function getHolderClasses( $params ) {
		$holderClasses = array();
		
		$holderClasses[] = ! empty( $params['number_of_columns'] ) ? 'mkdf-' . $params['number_of_columns'] . '-columns' : '';
		$holderClasses[] = ! empty( $params['space_between_items'] ) ? 'mkdf-' . $params['space_between_items'] . '-space' : '';
		
		return implode( ' ', $holderClasses );
	}

    private function getItemHolderClasses( $params ) {
        $holderClasses = array();

        $holderClasses[] = ! empty( $params['custom_class'] ) ? esc_attr( $params['custom_class'] ) : '';
        $holderClasses[] = $params['set_active_item'] === 'yes' ? 'mkdf-pt-active-item' : '';

        return implode( ' ', $holderClasses );
    }

    private function getHolderStyles( $params ) {
        $itemStyle = array();

        if ( ! empty( $params['content_background_color'] ) ) {
            $itemStyle[] = 'background-color: ' . $params['content_background_color'];
        }

        return implode( ';', $itemStyle );
    }

    private function getTitleStyles( $params ) {
        $itemStyle = array();

        if ( ! empty( $params['title_color'] ) ) {
            $itemStyle[] = 'color: ' . $params['title_color'];
        }

        if ( ! empty( $params['title_border_color'] ) ) {
            $itemStyle[] = 'border-color: ' . $params['title_border_color'];
        }

        return implode( ';', $itemStyle );
    }

    private function getPriceStyles( $params ) {
        $itemStyle = array();

        if ( ! empty( $params['price_color'] ) ) {
            $itemStyle[] = 'color: ' . $params['price_color'];
        }

        return implode( ';', $itemStyle );
    }

    private function getCurrencyStyles( $params ) {
        $itemStyle = array();

        if ( ! empty( $params['currency_color'] ) ) {
            $itemStyle[] = 'color: ' . $params['currency_color'];
        }

        return implode( ';', $itemStyle );
    }

    private function getPricePeriodStyles( $params ) {
        $itemStyle = array();

        if ( ! empty( $params['price_period_color'] ) ) {
            $itemStyle[] = 'color: ' . $params['price_period_color'];
        }

        return implode( ';', $itemStyle );
    }

}
\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new WilmerCoreElementorPricingTable() );