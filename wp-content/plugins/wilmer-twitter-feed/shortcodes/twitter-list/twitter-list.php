<?php

namespace WilmerTwitter\Shortcodes\TwitterList;

use WilmerTwitter\Lib;

class TwitterList implements Lib\ShortcodeInterface {
	private $base;
	
	public function __construct() {
		$this->base = 'mkdf_twitter_list';
		
		add_action( 'vc_before_init', array( $this, 'vcMap' ) );
	}
	
	public function getBase() {
		return $this->base;
	}
	
	public function vcMap() {
		if ( function_exists( 'vc_map' ) ) {
			vc_map(
				array(
					'name'                      => esc_html__( 'Twitter List', 'wilmer-twitter-feed' ),
					'base'                      => $this->base,
					'category'                  => esc_html__( 'by WILMER', 'wilmer-twitter-feed' ),
					'icon'                      => 'icon-wpb-twitter-list extended-custom-icon',
					'allowed_container_element' => 'vc_row',
					'params'                    => array(
						array(
							'type'        => 'textfield',
							'param_name'  => 'user_id',
							'heading'     => esc_html__( 'User ID', 'wilmer-twitter-feed' ),
							'admin_label' => true
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'number_of_columns',
							'heading'     => esc_html__( 'Number of Columns', 'wilmer-twitter-feed' ),
							'value'       => array_flip( wilmer_mikado_get_number_of_columns_array( false, array( 'one' ) ) ),
							'save_always' => true
						),
						array(
							'type'       => 'dropdown',
							'param_name' => 'space_between_columns',
							'heading'    => esc_html__( 'Space Between Columns', 'wilmer-twitter-feed' ),
							'value'      => array_flip( wilmer_mikado_get_space_between_items_array() )
						),
						array(
							'type'       => 'textfield',
							'param_name' => 'number_of_tweets',
							'heading'    => esc_html__( 'Number of Tweets', 'wilmer-twitter-feed' )
						),
						array(
							'type'       => 'textfield',
							'param_name' => 'transient_time',
							'heading'    => esc_html__( 'Tweets Cache Time', 'wilmer-twitter-feed' )
						)
					)
				)
			);
		}
	}
	
	public function render( $atts, $content = null ) {
		$args   = array(
			'user_id'               => '',
			'number_of_columns'     => 'four',
			'space_between_columns' => 'normal',
			'number_of_tweets'      => '',
			'transient_time'        => ''
		);
		$params = shortcode_atts( $args, $atts );
		extract( $params );
		
		$params['holder_classes'] = $this->getHolderClasses( $params, $args );
		
		$twitter_api           = new \WilmerTwitterApi();
		$params['twitter_api'] = $twitter_api;
		
		if ( $twitter_api->hasUserConnected() ) {
			$response = $twitter_api->fetchTweets( $user_id, $number_of_tweets, array(
				'transient_time' => $transient_time,
				'transient_id'   => 'mkdf_twitter_' . rand( 0, 1000 )
			) );
			
			$params['response'] = $response;
		}
		
		//Get HTML from template based on type of team
		$html = wilmer_twitter_get_shortcode_module_template_part( 'holder', 'twitter-list', '', $params );
		
		return $html;
	}
	
	public function getHolderClasses( $params, $args ) {
		$holderClasses = array();
		
		$holderClasses[] = ! empty( $params['number_of_columns'] ) ? 'mkdf-' . $params['number_of_columns'] . '-columns' : 'mkdf-' . $args['number_of_columns'] . '-columns';
		$holderClasses[] = ! empty( $params['space_between_columns'] ) ? 'mkdf-' . $params['space_between_columns'] . '-space' : 'mkdf-' . $args['space_between_columns'] . '-space';
		
		return implode( ' ', $holderClasses );
	}
}