<?php
class WilmerCoreElementorSocialShare extends \Elementor\Widget_Base {

	public function get_name() {
		return 'mkdf_social_share'; 
	}

	public function get_title() {
		return esc_html__( 'Social Share', 'wilmer-core' );
	}

	public function get_icon() {
		return 'wilmer-elementor-custom-icon wilmer-elementor-social-share';
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
			'type',
			[
				'label'     => esc_html__( 'Type', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'list' => esc_html__( 'List', 'wilmer-core'), 
					'dropdown' => esc_html__( 'Dropdown', 'wilmer-core'), 
					'text' => esc_html__( 'Text', 'wilmer-core')
				),
				'default' => 'list'
			]
		);

		$this->add_control(
			'dropdown_behavior',
			[
				'label'     => esc_html__( 'DropDown Hover Behavior', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'bottom' => esc_html__( 'On Bottom Animation', 'wilmer-core'), 
					'right' => esc_html__( 'On Right Animation', 'wilmer-core'), 
					'left' => esc_html__( 'On Left Animation', 'wilmer-core')
				),
				'default' => 'bottom',
				'condition' => [
					'type' => array( 'dropdown' )
				]
			]
		);

		$this->add_control(
			'icon_type',
			[
				'label'     => esc_html__( 'Icons Type', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'font-awesome' => esc_html__( 'Font Awesome', 'wilmer-core'), 
					'font-elegant' => esc_html__( 'Font Elegant', 'wilmer-core')
				),
				'default' => 'font-elegant',
				'condition' => [
					'type' => array( 'list', 'dropdown' )
				]
			]
		);

		$this->add_control(
			'title',
			[
				'label'     => esc_html__( 'Social Share Title', 'wilmer-core' ),
				'type'      => \Elementor\Controls_Manager::TEXT
			]
		);


		$this->end_controls_section();
	}
	public function render() {

		$params = $this->get_settings_for_display();


		
		//Is social share enabled
		$params['enable_social_share'] = wilmer_mikado_options()->getOptionValue( 'enable_social_share' ) === 'yes';
		
		//Is social share enabled for post type
		$post_type         = str_replace( '-', '_', get_post_type() );
		$params['enabled'] = wilmer_mikado_options()->getOptionValue( 'enable_social_share_on_' . $post_type ) === 'yes';
		
		//Social Networks Data
		$params['networks'] = $this->getSocialNetworksParams( $params );
		
		$params['dropdown_class'] = ! empty( $params['dropdown_behavior'] ) ? 'mkdf-' . $params['dropdown_behavior'] : '';
		
		if ( $params['enable_social_share'] && $params['enabled'] ) {
            echo wilmer_core_get_shortcode_module_template_part( 'templates/' . $params['type'], 'social-share', '', $params );
		}

	}

	public function getSocialNetworks() {
		return $this->socialNetworks;
	}

	private function getSocialNetworksParams( $params ) {
		$networks   = array();
		$icons_type = $params['icon_type'];
		$type       = $params['type'];
		
		foreach ( $this->socialNetworks as $net ) {
			$html = '';
			
			if ( wilmer_mikado_options()->getOptionValue( 'enable_' . $net . '_share' ) == 'yes' ) {
				$image                 = wp_get_attachment_image_src( get_post_thumbnail_id(), 'full' );
				$params                = array(
					'name' => $net,
					'type' => $type
				);

				$params['link']        = $this->getSocialNetworkShareLink( $net, $image );

				if ($type == 'text') {
					$params['text']    = $this->getSocialNetworkText( $net );
				} else {
					$params['icon']    = $this->getSocialNetworkIcon( $net, $icons_type );
				}

				$params['custom_icon'] = ( wilmer_mikado_options()->getOptionValue( $net . '_icon' ) ) ? wilmer_mikado_options()->getOptionValue( $net . '_icon' ) : '';
				
				$html = wilmer_core_get_shortcode_module_template_part( 'templates/parts/network', 'social-share', '', $params );
			}
			
			$networks[ $net ] = $html;
		}
		
		return $networks;
	}

    private function getSocialNetworkShareLink($net, $image) {
        switch ($net) {
            case 'facebook':
                if (wp_is_mobile()) {
                    $link = 'window.open(\'http://m.facebook.com/sharer.php?u=' . urlencode(get_permalink()) . '\');';
                } else {
                    $link = 'window.open(\'http://www.facebook.com/sharer.php?u=' . urlencode(get_permalink()) . '\', \'sharer\', \'toolbar=0,status=0,width=620,height=280\');';
                }
                break;
            case 'twitter':
                $count_char = (isset($_SERVER['https'])) ? 23 : 22;
                $twitter_via = (wilmer_mikado_options()->getOptionValue('twitter_via') !== '') ? ' via ' . wilmer_mikado_options()->getOptionValue('twitter_via') . ' ' : '';
				$link =  'window.open(\'https://twitter.com/intent/tweet?text=' . urlencode( wilmer_mikado_the_excerpt_max_charlength( $count_char ) . $twitter_via ) . ' ' . get_permalink() . '\', \'popupwindow\', \'scrollbars=yes,width=800,height=400\');';
                break;
            case 'linkedin':
                $link = 'popUp=window.open(\'http://linkedin.com/shareArticle?mini=true&amp;url=' . urlencode(get_permalink()) . '&amp;title=' . urlencode(get_the_title()) . '\', \'popupwindow\', \'scrollbars=yes,width=800,height=400\');popUp.focus();return false;';
                break;
            case 'tumblr':
                $link = 'popUp=window.open(\'http://www.tumblr.com/share/link?url=' . urlencode(get_permalink()) . '&amp;name=' . urlencode(get_the_title()) . '&amp;description=' . urlencode(get_the_excerpt()) . '\', \'popupwindow\', \'scrollbars=yes,width=800,height=400\');popUp.focus();return false;';
                break;
            case 'pinterest':
                $media = ( $image ) ? '&amp;image=' . urlencode( $image[0] ) : '';
                $link = 'popUp=window.open(\'http://pinterest.com/pin/create/button/?url=' . urlencode(get_permalink()) . '&amp;description=' . sanitize_title(get_the_title()) . $media . '\', \'popupwindow\', \'scrollbars=yes,width=800,height=400\');popUp.focus();return false;';
                break;
            case 'vk':
                $media = ( $image ) ? '&amp;image=' . urlencode( $image[0] ) : '';
                $link = 'popUp=window.open(\'http://vkontakte.ru/share.php?url=' . urlencode(get_permalink()) . '&amp;title=' . urlencode(get_the_title()) . '&amp;description=' . urlencode(get_the_excerpt()) . $media . '\', \'popupwindow\', \'scrollbars=yes,width=800,height=400\');popUp.focus();return false;';
                break;
            default:
                $link = '';
        }

        return $link;
    }

	private function getSocialNetworkIcon( $net, $type ) {
		switch ( $net ) {
			case 'facebook':
				$icon = ( $type == 'font-elegant' ) ? 'social_facebook' : 'fab fa-facebook';
				break;
			case 'twitter':
				$icon = ( $type == 'font-elegant' ) ? 'social_twitter' : 'fab fa-twitter';
				break;
			case 'linkedin':
				$icon = ( $type == 'font-elegant' ) ? 'social_linkedin' : 'fab fa-linkedin';
				break;
			case 'tumblr':
				$icon = ( $type == 'font-elegant' ) ? 'social_tumblr' : 'fab fa-tumblr';
				break;
			case 'pinterest':
				$icon = ( $type == 'font-elegant' ) ? 'social_pinterest' : 'fab fa-pinterest';
				break;
			case 'vk':
				$icon = 'fab fa-vk';
				break;
			default:
				$icon = '';
		}
		
		return $icon;
	}

	private function getSocialNetworkText( $net ) {
		switch ( $net ) {
			case 'facebook':
				$text = esc_html__( 'fb', 'wilmer-core');
				break;
			case 'twitter':
				$text = esc_html__( 'tw', 'wilmer-core');
				break;
			case 'linkedin':
				$text = esc_html__( 'lnkd', 'wilmer-core');
				break;
			case 'tumblr':
				$text = esc_html__( 'tmb', 'wilmer-core');
				break;
			case 'pinterest':
				$text = esc_html__( 'pin', 'wilmer-core');
				break;
			case 'vk':
				$text = esc_html__( 'vk', 'wilmer-core');
				break;
			default:
				$text = '';
		}
		
		return $text;
	}

}
\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new WilmerCoreElementorSocialShare() );