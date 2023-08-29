<?php
namespace WilmerCore\CPT\Shortcodes\ItemShowcase;

use WilmerCore\Lib;

class ItemShowcaseItem implements Lib\ShortcodeInterface {
	private $base;
	
	function __construct() {
		$this->base = 'mkdf_item_showcase_item';
		add_action( 'vc_before_init', array( $this, 'vcMap' ) );
	}
	
	public function getBase() {
		return $this->base;
	}
	
	public function vcMap() {
		if ( function_exists( 'vc_map' ) ) {
			vc_map(
				array(
					'name'                    => esc_html__( 'Item Showcase List Item', 'wilmer-core' ),
					'base'                    => $this->base,
					'as_child'                => array( 'only' => 'mkdf_item_showcase' ),
					'as_parent'               => array( 'except' => 'vc_row' ),
					'content_element'         => true,
					'category'                => esc_html__( 'by WILMER', 'wilmer-core' ),
					'icon'                    => 'icon-wpb-item-showcase-item extended-custom-icon',
					'show_settings_on_create' => true,
					'params'                  => array(
						array(
							'type'        => 'dropdown',
							'param_name'  => 'item_position',
							'heading'     => esc_html__( 'Item Position', 'wilmer-core' ),
							'value'       => array(
								esc_html__( 'Left', 'wilmer-core' )  => 'left',
								esc_html__( 'Right', 'wilmer-core' ) => 'right'
							),
							'save_always' => true,
							'admin_label' => true
						),
						array(
							'type'        => 'textfield',
							'param_name'  => 'item_title',
							'heading'     => esc_html__( 'Item Title', 'wilmer-core' ),
							'admin_label' => true
						),
						array(
							'type'       => 'textfield',
							'param_name' => 'item_link',
							'heading'    => esc_html__( 'Item Link', 'wilmer-core' ),
							'dependency' => array( 'element' => 'item_title', 'not_empty' => true )
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'item_target',
							'heading'     => esc_html__( 'Item Target', 'wilmer-core' ),
							'value'       => array_flip( wilmer_mikado_get_link_target_array() ),
							'dependency'  => array( 'element' => 'item_link', 'not_empty' => true ),
							'save_always' => true
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'item_title_tag',
							'heading'     => esc_html__( 'Item Title Tag', 'wilmer-core' ),
							'value'       => array_flip( wilmer_mikado_get_title_tag( true ) ),
							'save_always' => true,
							'dependency'  => array( 'element' => 'item_title', 'not_empty' => true )
						),
						array(
							'type'       => 'colorpicker',
							'param_name' => 'item_title_color',
							'heading'    => esc_html__( 'Item Title Color', 'wilmer-core' ),
							'dependency' => array( 'element' => 'item_title', 'not_empty' => true )
						),
						array(
							'type'       => 'textarea',
							'param_name' => 'item_text',
							'heading'    => esc_html__( 'Item Text', 'wilmer-core' )
						),
						array(
							'type'       => 'colorpicker',
							'param_name' => 'item_text_color',
							'heading'    => esc_html__( 'Item Text Color', 'wilmer-core' ),
							'dependency' => array( 'element' => 'item_text', 'not_empty' => true )
						)
					)
				)
			);
		}
	}
	
	public function render( $atts, $content = null ) {
		$args   = array(
			'item_position'    => 'left',
			'item_title'       => '',
			'item_link'        => '',
			'item_target'      => '_self',
			'item_title_tag'   => 'h4',
			'item_title_color' => '',
			'item_text'        => '',
			'item_text_color'  => ''
		);
		$params = shortcode_atts( $args, $atts );
		
		$params['showcase_item_class'] = $this->getShowcaseItemClasses( $params );
		$params['item_target']         = ! empty( $params['item_target'] ) ? $params['item_target'] : $args['item_target'];
		$params['item_title_tag']      = ! empty( $params['item_title_tag'] ) ? $params['item_title_tag'] : $args['item_title_tag'];
		$params['item_title_styles']   = $this->getTitleStyles( $params );
		$params['item_text_styles']    = $this->getTextStyles( $params );
		
		$html = wilmer_core_get_shortcode_module_template_part( 'templates/item-showcase-item', 'item-showcase', '', $params );
		
		return $html;
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
