<?php
class WilmerCoreElementorHorizontalTimeline extends \Elementor\Widget_Base {

	public function get_name() {
		return 'mkdf_horizontal_timeline'; 
	}

	public function get_title() {
		return esc_html__( 'Horizontal Timeline', 'wilmer-core' );
	}

	public function get_icon() {
		return 'wilmer-elementor-custom-icon wilmer-elementor-horizontal-timeline';
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
			'timeline_format',
			[
				'label'     => esc_html__( 'Timeline displays?', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'Y' => esc_html__( 'Only Years', 'wilmer-core'), 
					'M Y' => esc_html__( 'Years and Months', 'wilmer-core'), 
					'M d, \'y' => esc_html__( 'Years, Months and Days', 'wilmer-core'), 
					'M d' => esc_html__( 'Months and Days', 'wilmer-core')
				),
				'default' => 'Y'
			]
		);

		$this->add_control(
			'distance',
			[
				'label'     => esc_html__( 'Minimal Distance Between Dates?', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'description' => esc_html__( 'Default value is 60', 'wilmer-core' ),
                'default' => 60
			]
		);

		$repeater = new \Elementor\Repeater();

		$repeater->add_control(
			'date',
			[
				'label'     => esc_html__( 'Timeline Date', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'description' => esc_html__( 'Enter date in format dd/mm/yyyy.', 'wilmer-core' )
			]
		);

		$repeater->add_control(
			'content_image',
			[
				'label'     => esc_html__( 'Content Image', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::MEDIA
			]
		);

        wilmer_core_generate_elementor_templates_control( $repeater );

		$this->add_control(
			'horizontal_timeline_item',
			[
				'label'     => esc_html__( 'Elated Horizontal Timeline Item', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::REPEATER,
				'fields'     => $repeater->get_controls(),
				'title_field'     => esc_html__( 'Item', 'wilmer-core' )
			]
		);


		$this->end_controls_section();
	}
	public function render() {

		$params = $this->get_settings_for_display();
		$params['this_object'] = $this;
        $params['dates']   = $this->getDates($params, $params['timeline_format']);

		echo wilmer_core_get_shortcode_module_template_part( 'templates/elementor-horizontal-timeline', 'horizontal-timeline', '', $params );
	}

    private function getDates( $params, $timeline_format ) {
        $datesArray = array();

        foreach ( $params['horizontal_timeline_item'] as $item ) {
            if ( ! empty( $item ) ) {

                $date      = new \DateTime( str_replace( '/', '-', $item['date'] ) );
                $date_info = getdate( $date->getTimestamp() );

                switch ( $date_info['month'] ) {
                    case 'January':
                        $month = esc_attr__( 'Jan', 'wilmer-core' );
                        break;
                    case 'February':
                        $month = esc_attr__( 'Feb', 'wilmer-core' );
                        break;
                    case 'March':
                        $month = esc_attr__( 'Mar', 'wilmer-core' );
                        break;
                    case 'April':
                        $month = esc_attr__( 'Apr', 'wilmer-core' );
                        break;
                    case 'May':
                        $month = esc_attr__( 'May', 'wilmer-core' );
                        break;
                    case 'June':
                        $month = esc_attr__( 'Jun', 'wilmer-core' );
                        break;
                    case 'July':
                        $month = esc_attr__( 'Jul', 'wilmer-core' );
                        break;
                    case 'August':
                        $month = esc_attr__( 'Aug', 'wilmer-core' );
                        break;
                    case 'September':
                        $month = esc_attr__( 'Sep', 'wilmer-core' );
                        break;
                    case 'October':
                        $month = esc_attr__( 'Oct', 'wilmer-core' );
                        break;
                    case 'November':
                        $month = esc_attr__( 'Nov', 'wilmer-core' );
                        break;
                    case 'December':
                        $month = esc_attr__( 'Dec', 'wilmer-core' );
                        break;
                    default:
                        $month = $date_info['month'];
                        break;
                }

                switch ( $timeline_format ) {
                    case 'Y':
                        $date_label = $date_info['year'];
                        break;
                    case 'M Y':
                        $date_label = $month . ' ' . $date_info['year'];
                        break;
                    case 'M d, \'y':
                        $date_label = $month . ' ' . $date_info['mday'] . ', ' . $date_info['year'];
                        break;
                    case 'M d':
                        $date_label = $month . ' ' . $date_info['mday'];
                        break;
                    default:
                        $date_label = $date_info['year'];
                        break;
                }

                $currentDate = array(
                    'formatted'  => $item['date'],
                    'date_label' => $date_label
                );

                $datesArray[] = $currentDate;
            }
        }

        return $datesArray;
    }

    public function getItemHolderClasses( $params ) {
        $holderClasses = array();

        $holderClasses[] = ! empty( $params['content_image'] ) ? 'mkdf-timeline-has-image' : 'mkdf-timeline-no-image';

        return implode( ' ', $holderClasses );
    }

}
\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new WilmerCoreElementorHorizontalTimeline() );