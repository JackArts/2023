<?php
namespace WilmerCore\CPT\Shortcodes\Countdown;

use WilmerCore\Lib;

class Countdown implements Lib\ShortcodeInterface {
	private $base;
	
	public function __construct() {
		$this->base = 'mkdf_countdown';
		
		add_action( 'vc_before_init', array( $this, 'vcMap' ) );
	}
	
	public function getBase() {
		return $this->base;
	}
	
	public function vcMap() {
		if ( function_exists( 'vc_map' ) ) {
			vc_map(
				array(
					'name'                      => esc_html__( 'Countdown', 'wilmer-core' ),
					'base'                      => $this->getBase(),
					'category'                  => esc_html__( 'by WILMER', 'wilmer-core' ),
					'icon'                      => 'icon-wpb-countdown extended-custom-icon',
					'allowed_container_element' => 'vc_row',
					'params'                    => array(
						array(
							'type'        => 'textfield',
							'param_name'  => 'custom_class',
							'heading'     => esc_html__( 'Custom CSS Class', 'wilmer-core' ),
							'description' => esc_html__( 'Style particular content element differently - add a class name and refer to it in custom CSS', 'wilmer-core' )
						),
						array(
							'type'       => 'dropdown',
							'param_name' => 'skin',
							'heading'    => esc_html__( 'Skin', 'wilmer-core' ),
							'value'      => array(
								esc_html__( 'Default', 'wilmer-core' ) => '',
								esc_html__( 'Light', 'wilmer-core' )   => 'mkdf-light-skin',
							),
							'save_always' => true
						),
                        array(
                            'type'       => 'dropdown',
                            'param_name' => 'text_align',
                            'heading'    => esc_html__( 'Text align', 'wilmer-core' ),
                            'value'      => array(
                                esc_html__( 'Center', 'wilmer-core' ) => 'center',
                                esc_html__( 'Left', 'wilmer-core' )   => 'left',
                            )
                        ),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'year',
							'heading'     => esc_html__( 'Year', 'wilmer-core' ),
							'value'       => array(
								'2019' => '2019',
								'2020' => '2020',
								'2021' => '2021',
								'2022' => '2022',
                                '2023' => '2023',
                                '2024' => '2024',
                                '2025' => '2025'
							),
							'admin_label' => true,
                            'save_always' => true
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'month',
							'heading'     => esc_html__( 'Month', 'wilmer-core' ),
							'value'       => array(
								esc_html__( 'January', 'wilmer-core' )   => '1',
								esc_html__( 'February', 'wilmer-core' )  => '2',
								esc_html__( 'March', 'wilmer-core' )     => '3',
								esc_html__( 'April', 'wilmer-core' )     => '4',
								esc_html__( 'May', 'wilmer-core' )       => '5',
								esc_html__( 'June', 'wilmer-core' )      => '6',
								esc_html__( 'July', 'wilmer-core' )      => '7',
								esc_html__( 'August', 'wilmer-core' )    => '8',
								esc_html__( 'September', 'wilmer-core' ) => '9',
								esc_html__( 'October', 'wilmer-core' )   => '10',
								esc_html__( 'November', 'wilmer-core' )  => '11',
								esc_html__( 'December', 'wilmer-core' )  => '12'
							),
							'save_always' => true
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'day',
							'heading'     => esc_html__( 'Day', 'wilmer-core' ),
							'value'       => array(
								'1'  => '1',
								'2'  => '2',
								'3'  => '3',
								'4'  => '4',
								'5'  => '5',
								'6'  => '6',
								'7'  => '7',
								'8'  => '8',
								'9'  => '9',
								'10' => '10',
								'11' => '11',
								'12' => '12',
								'13' => '13',
								'14' => '14',
								'15' => '15',
								'16' => '16',
								'17' => '17',
								'18' => '18',
								'19' => '19',
								'20' => '20',
								'21' => '21',
								'22' => '22',
								'23' => '23',
								'24' => '24',
								'25' => '25',
								'26' => '26',
								'27' => '27',
								'28' => '28',
								'29' => '29',
								'30' => '30',
								'31' => '31',
							),
							'save_always' => true
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'hour',
							'heading'     => esc_html__( 'Hour', 'wilmer-core' ),
							'value'       => array(
								'0'  => '0',
								'1'  => '1',
								'2'  => '2',
								'3'  => '3',
								'4'  => '4',
								'5'  => '5',
								'6'  => '6',
								'7'  => '7',
								'8'  => '8',
								'9'  => '9',
								'10' => '10',
								'11' => '11',
								'12' => '12',
								'13' => '13',
								'14' => '14',
								'15' => '15',
								'16' => '16',
								'17' => '17',
								'18' => '18',
								'19' => '19',
								'20' => '20',
								'21' => '21',
								'22' => '22',
								'23' => '23',
								'24' => '24'
							),
							'save_always' => true
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'minute',
							'heading'     => esc_html__( 'Minute', 'wilmer-core' ),
							'value'       => array(
								'0'  => '0',
								'1'  => '1',
								'2'  => '2',
								'3'  => '3',
								'4'  => '4',
								'5'  => '5',
								'6'  => '6',
								'7'  => '7',
								'8'  => '8',
								'9'  => '9',
								'10' => '10',
								'11' => '11',
								'12' => '12',
								'13' => '13',
								'14' => '14',
								'15' => '15',
								'16' => '16',
								'17' => '17',
								'18' => '18',
								'19' => '19',
								'20' => '20',
								'21' => '21',
								'22' => '22',
								'23' => '23',
								'24' => '24',
								'25' => '25',
								'26' => '26',
								'27' => '27',
								'28' => '28',
								'29' => '29',
								'30' => '30',
								'31' => '31',
								'32' => '32',
								'33' => '33',
								'34' => '34',
								'35' => '35',
								'36' => '36',
								'37' => '37',
								'38' => '38',
								'39' => '39',
								'40' => '40',
								'41' => '41',
								'42' => '42',
								'43' => '43',
								'44' => '44',
								'45' => '45',
								'46' => '46',
								'47' => '47',
								'48' => '48',
								'49' => '49',
								'50' => '50',
								'51' => '51',
								'52' => '52',
								'53' => '53',
								'54' => '54',
								'55' => '55',
								'56' => '56',
								'57' => '57',
								'58' => '58',
								'59' => '59',
								'60' => '60',
							),
							'save_always' => true
						),
						array(
							'type'       => 'textfield',
							'param_name' => 'month_label',
							'heading'    => esc_html__( 'Month Label', 'wilmer-core' )
						),
						array(
							'type'       => 'textfield',
							'param_name' => 'day_label',
							'heading'    => esc_html__( 'Day Label', 'wilmer-core' )
						),
						array(
							'type'       => 'textfield',
							'param_name' => 'hour_label',
							'heading'    => esc_html__( 'Hour Label', 'wilmer-core' )
						),
						array(
							'type'       => 'textfield',
							'param_name' => 'minute_label',
							'heading'    => esc_html__( 'Minute Label', 'wilmer-core' )
						),
						array(
							'type'       => 'textfield',
							'param_name' => 'second_label',
							'heading'    => esc_html__( 'Second Label', 'wilmer-core' )
						),
						array(
							'type'       => 'textfield',
							'param_name' => 'digit_font_size',
							'heading'    => esc_html__( 'Digit Font Size (px)', 'wilmer-core' )
						),
                        array(
                            'type'       => 'textfield',
                            'param_name' => 'digit_font_size_responsive',
                            'heading'    => esc_html__( 'Digit Font Size for smaller resolutions (px)', 'wilmer-core' )
                        ),
						array(
							'type'       => 'textfield',
							'param_name' => 'label_font_size',
							'heading'    => esc_html__( 'Label Font Size (px)', 'wilmer-core' )
						),
						array(
							'type'       => 'textfield',
							'param_name' => 'label_font_size_responsive',
							'heading'    => esc_html__( 'Label Font Size for smaller resolutions (px)', 'wilmer-core' )
						)
					)
				)
			);
		}
	}
	
	public function render( $atts, $content = null ) {
		$args   = array(
			'custom_class'    => '',
			'skin'            => '',
			'text_align'      => 'center',
			'year'            => '',
			'month'           => '',
			'day'             => '',
			'hour'            => '',
			'minute'          => '',
			'month_label'     => 'Months',
			'day_label'       => 'Days',
			'hour_label'      => 'Hours',
			'minute_label'    => 'Minutes',
			'second_label'    => 'Seconds',
			'digit_font_size' => '',
			'digit_font_size_responsive' => '',
			'label_font_size' => '',
			'label_font_size_responsive' => '',
		);
		$params = shortcode_atts( $args, $atts );
		
		$params['id']             = mt_rand( 1000, 9999 );
		$params['holder_classes'] = $this->getHolderClasses( $params );
		$params['holder_data']    = $this->getHolderData( $params );
		$params['text_align'] = $this->getTextAlignment($params);

		$html = wilmer_core_get_shortcode_module_template_part( 'templates/countdown', 'countdown', '', $params );
		
		return $html;
	}
	
	private function getHolderClasses( $params ) {
		$holderClasses = array();
		
		$holderClasses[] = ! empty( $params['custom_class'] ) ? esc_attr( $params['custom_class'] ) : '';
		$holderClasses[] = ! empty( $params['skin'] ) ? $params['skin'] : '';
		
		return implode( ' ', $holderClasses );
	}
	
	private function getHolderData( $params ) {
		$holderData = array();
		
		$holderData['data-year']         = ! empty( $params['year'] ) ? $params['year'] : '';
		$holderData['data-month']        = ! empty( $params['month'] ) ? $params['month'] : '';
		$holderData['data-day']          = ! empty( $params['day'] ) ? $params['day'] : '';
		$holderData['data-hour']         = $params['hour'] !== '' ? $params['hour'] : '';
		$holderData['data-minute']       = $params['minute'] !== '' ? $params['minute'] : '';
		$holderData['data-month-label']  = ! empty( $params['month_label'] ) ? $params['month_label'] : esc_html__( 'Months', 'wilmer-core' );
		$holderData['data-day-label']    = ! empty( $params['day_label'] ) ? $params['day_label'] : esc_html__( 'Days', 'wilmer-core' );
		$holderData['data-hour-label']   = ! empty( $params['hour_label'] ) ? $params['hour_label'] : esc_html__( 'Hours', 'wilmer-core' );
		$holderData['data-minute-label'] = ! empty( $params['minute_label'] ) ? $params['minute_label'] : esc_html__( 'Minutes', 'wilmer-core' );
		$holderData['data-second-label'] = ! empty( $params['second_label'] ) ? $params['second_label'] : esc_html__( 'Seconds', 'wilmer-core' );
		$holderData['data-digit-size']   = ! empty( $params['digit_font_size'] ) ? $params['digit_font_size'] : '';
		$holderData['data-digit-size-responsive']   = ! empty( $params['digit_font_size_responsive'] ) ? $params['digit_font_size_responsive'] : '';
		$holderData['data-label-size']   = ! empty( $params['label_font_size'] ) ? $params['label_font_size'] : '';
		$holderData['data-label-size-responsive']   = ! empty( $params['label_font_size_responsive'] ) ? $params['label_font_size_responsive'] : '';

		return $holderData;
	}
    private function getTextAlignment( $params ) {
        $text_alignment = array();

        if($params['text_align'] == 'center'){
            $text_alignmentp[] = 'text-align: center';
        }
        else{
            $text_alignment[] = 'text-align: left';
        }

        return implode('; ', $text_alignment);
    }
}