<?php
namespace WilmerCore\CPT\Shortcodes\HorizontalTimeline;

use WilmerCore\Lib;

class HorizontalTimeline implements Lib\ShortcodeInterface {
	private $base;
	
	function __construct() {
		$this->base = 'mkdf_horizontal_timeline';
		
		add_action( 'vc_before_init', array( $this, 'vcMap' ) );
	}
	
	public function getBase() {
		return $this->base;
	}
	
	public function vcMap() {
		if ( function_exists( 'vc_map' ) ) {
			vc_map(
				array(
					'name'                    => esc_html__( 'Horizontal Timeline', 'wilmer-core' ),
					'base'                    => $this->base,
					'category'                => esc_html__( 'by WILMER', 'wilmer-core' ),
					'icon'                    => 'icon-wpb-horizontal-timeline extended-custom-icon',
					'as_parent'               => array( 'only' => 'mkdf_horizontal_timeline_item' ),
					'js_view'                 => 'VcColumnView',
					'content_element'         => true,
					'show_settings_on_create' => false,
					'params'                  => array(
						array(
							'type'        => 'dropdown',
							'param_name'  => 'timeline_format',
							'heading'     => esc_html__( 'Timeline displays?', 'wilmer-core' ),
							'value'       => array(
								esc_html__( 'Only Years', 'wilmer-core' )             => 'Y',
								esc_html__( 'Years and Months', 'wilmer-core' )       => 'M Y',
								esc_html__( 'Years, Months and Days', 'wilmer-core' ) => 'M d, \'y',
								esc_html__( 'Months and Days', 'wilmer-core' )        => 'M d'
							),
							'admin_label' => true
						),
						array(
							'type'        => 'textfield',
							'param_name'  => 'distance',
							'heading'     => esc_html__( 'Minimal Distance Between Dates?', 'wilmer-core' ),
							'description' => esc_html__( 'Default value is 60', 'wilmer-core' ),
							'admin_label' => true
						)
					)
				)
			);
		}
	}
	
	/**
	 * Renders HTML for product list shortcode
	 *
	 * @param array $atts
	 * @param null  $content
	 *
	 * @return string
	 */
	public function render( $atts, $content = null ) {
		$args   = array(
			'timeline_format' => 'Y',
			'distance'        => '60'
		);
		$params = shortcode_atts( $args, $atts );
		
		$params['content'] = $content;
		$params['dates']   = $this->getDates($content, $params['timeline_format']);
		
		$html = wilmer_core_get_shortcode_module_template_part( 'templates/horizontal-timeline-holder', 'horizontal-timeline', '', $params );
		
		return $html;
	}
	
	private function getDates( $content, $timeline_format ) {
		$datesArray = array();
		
		preg_match_all( '/date="(.*?)"/i', $content, $matches );
        if ( isset( $matches[1] ) && is_array( $matches[1] ) ) {
            foreach ( $matches[1] as $match ) {
                if ( ! empty( $match ) ) {
                    $date      = new \DateTime( str_replace( '/', '-', $match ) );
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
                        'formatted'  => $match,
                        'date_label' => $date_label
                    );

                    $datesArray[] = $currentDate;
                }
            }
        }
		
		return $datesArray;
	}
}