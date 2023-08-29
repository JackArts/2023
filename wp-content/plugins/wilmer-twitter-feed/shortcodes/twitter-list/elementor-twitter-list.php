<?php

class WilmerTwitterFeedElementorTwitterList extends \Elementor\Widget_Base {

    public function get_name() {
        return 'mkdf_twitter_list';
    }

    public function get_title() {
        return esc_html__( 'Twitter List', 'wilmer-twitter-feed' );
    }

    public function get_icon() {
        return 'wilmer-elementor-custom-icon wilmer-elementor-twitter-list';
    }

    public function get_categories() {
        return [ 'mikado' ];
    }

    protected function _register_controls() {
        $this->start_controls_section(
            'general',
            [
                'label' => esc_html__( 'General', 'wilmer-twitter-feed' ),
                'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
            ]
        );

		$this->add_control(
			'user_id',
			[
				'label'       => esc_html__( 'User ID', 'wilmer-twitter-feed' ),
				'type'        => \Elementor\Controls_Manager::TEXT,
			]
		);

        $this->add_control(
            'number_of_columns',
            [
                'label'       => esc_html__( 'Number of Columns', 'wilmer-twitter-feed' ),
                'type'        => \Elementor\Controls_Manager::SELECT,
				'options'     => wilmer_mikado_get_number_of_columns_array( false, array( 'one' ) ),
                'default'     => 'four'
            ]
        );

        $this->add_control(
            'space_between_columns',
            [
                'label'   => esc_html__( 'Space Between Items', 'wilmer-twitter-feed' ),
                'type'    => \Elementor\Controls_Manager::SELECT,
				'options' => wilmer_mikado_get_space_between_items_array(),
                'default' => 'normal'
            ]
        );

        $this->add_control(
            'number_of_tweets',
            [
                'label'       => esc_html__( 'Number of Tweets', 'wilmer-twitter-feed' ),
                'type'        => \Elementor\Controls_Manager::TEXT,
            ]
        );

		$this->add_control(
			'transient_time',
			[
				'label'       => esc_html__( 'Images Cache Time', 'wilmer-twitter-feed' ),
				'type'        => \Elementor\Controls_Manager::TEXT,
				'default'     => ''
			]
		);

        $this->end_controls_section();
    }

    public function render() {

		$params = $this->get_settings_for_display();

		$params['holder_classes'] = $this->getHolderClasses( $params );

		$twitter_api           = new \WilmerTwitterApi();
		$params['twitter_api'] = $twitter_api;

		if ( $twitter_api->hasUserConnected() ) {
			$response = $twitter_api->fetchTweets( $params['user_id'], $params['number_of_tweets'], array(
				'transient_time' => $params['transient_time'],
				'transient_id'   => 'mkdf_twitter_' . rand( 0, 1000 )
			) );

			$params['response'] = $response;
		}

		//Get HTML from template based on type of team
		echo wilmer_twitter_get_shortcode_module_template_part( 'holder', 'twitter-list', '', $params );
    }

	public function getHolderClasses( $params ) {
		$holderClasses = array();

		$holderClasses[] = 'mkdf-' . $params['number_of_columns'] . '-columns';
		$holderClasses[] = 'mkdf-' . $params['space_between_columns'] . '-space';

		return implode( ' ', $holderClasses );
	}

}

\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new WilmerTwitterFeedElementorTwitterList() );