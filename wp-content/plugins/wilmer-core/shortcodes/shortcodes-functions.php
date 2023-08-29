<?php

if ( ! function_exists( 'wilmer_core_include_shortcodes_file' ) ) {
	/**
	 * Loades all shortcodes by going through all folders that are placed directly in shortcodes folder
	 */
	function wilmer_core_include_shortcodes_file() {
		if ( wilmer_core_theme_installed() && wilmer_core_is_theme_registered() ) {
			foreach ( glob( WILMER_CORE_SHORTCODES_PATH . '/*/load.php' ) as $shortcode ) {
				if ( wilmer_mikado_is_customizer_item_enabled( $shortcode, 'wilmer_performance_disable_shortcode_' ) ) {
					include_once $shortcode;
				}
			}
		}
		
		do_action( 'wilmer_core_action_include_shortcodes_file' );
	}
	
	add_action( 'init', 'wilmer_core_include_shortcodes_file', 6 ); // permission 6 is set to be before vc_before_init hook that has permission 9
}

if ( ! function_exists( 'wilmer_core_load_shortcodes' ) ) {
	function wilmer_core_load_shortcodes() {
		include_once WILMER_CORE_ABS_PATH . '/lib/shortcode-loader.php';
		
		WilmerCore\Lib\ShortcodeLoader::getInstance()->load();
	}
	
	add_action( 'init', 'wilmer_core_load_shortcodes', 7 ); // permission 7 is set to be before vc_before_init hook that has permission 9 and after wilmer_core_include_shortcodes_file hook
}

if ( ! function_exists( 'wilmer_core_add_admin_shortcodes_styles' ) ) {
	/**
	 * Function that includes shortcodes core styles for admin
	 */
	function wilmer_core_add_admin_shortcodes_styles() {
		
		//include shortcode styles for Visual Composer
		wp_enqueue_style( 'wilmer-core-vc-shortcodes', WILMER_CORE_ASSETS_URL_PATH . '/css/admin/wilmer-vc-shortcodes.css' );
	}
	
	add_action( 'wilmer_mikado_action_admin_scripts_init', 'wilmer_core_add_admin_shortcodes_styles' );
}

if ( ! function_exists( 'wilmer_core_add_admin_shortcodes_custom_styles' ) ) {
	/**
	 * Function that print custom vc shortcodes style
	 */
	function wilmer_core_add_admin_shortcodes_custom_styles() {
		$style                  = apply_filters( 'wilmer_core_filter_add_vc_shortcodes_custom_style', $style = '' );
		$shortcodes_icon_styles = array();
		$shortcode_icon_size    = 32;
		$shortcode_position     = 0;
		
		$shortcodes_icon_class_array = apply_filters( 'wilmer_core_filter_add_vc_shortcodes_custom_icon_class', $shortcodes_icon_class_array = array() );
		sort( $shortcodes_icon_class_array );

		if ( ! empty( $shortcodes_icon_class_array ) ) {
			foreach ( $shortcodes_icon_class_array as $shortcode_icon_class ) {
				$mark = $shortcode_position != 0 ? '-' : '';
				
				$shortcodes_icon_styles[] = '.vc_element-icon.extended-custom-icon' . esc_attr( $shortcode_icon_class ) . ' {
					background-position: ' . $mark . esc_attr( $shortcode_position * $shortcode_icon_size ) . 'px 0;
				}';
				
				$shortcode_position ++;
			}
		}
		
		if ( ! empty( $shortcodes_icon_styles ) ) {
			$style .= implode( ' ', $shortcodes_icon_styles );
		}
		
		if ( ! empty( $style ) ) {
			wp_add_inline_style( 'wilmer-core-vc-shortcodes', $style );
		}
	}
	
	add_action( 'wilmer_mikado_action_admin_scripts_init', 'wilmer_core_add_admin_shortcodes_custom_styles' );
}

if ( ! function_exists( 'wilmer_core_load_elementor_shortcodes' ) ) {
    /**
     * Function that loads elementor files inside shortcodes folder
     */
    function wilmer_core_load_elementor_shortcodes() {
        if ( wilmer_core_theme_installed() && wilmer_mikado_is_plugin_installed('elementor') && wilmer_core_is_theme_registered() ) {
            foreach ( glob( WILMER_CORE_SHORTCODES_PATH . '/*/elementor-*.php' ) as $shortcode_load ) {
                include_once $shortcode_load;
            }
        }
    }

    add_action( 'elementor/widgets/widgets_registered', 'wilmer_core_load_elementor_shortcodes' );
}

if ( ! function_exists( 'wilmer_core_add_elementor_widget_categories' ) ) {
    /**
     * Registers category group
     */
    function wilmer_core_add_elementor_widget_categories( $elements_manager ) {

        $elements_manager->add_category(
            'mikado',
            [
                'title' => esc_html__( 'Mikado', 'wilmer-core' ),
                'icon'  => 'fa fa-plug',
            ]
        );

    }

    add_action( 'elementor/elements/categories_registered', 'wilmer_core_add_elementor_widget_categories' );
}

if( ! function_exists( 'wilmer_core_remove_widgets_for_elementor') ) {
    function wilmer_core_remove_widgets_for_elementor( $black_list ) {
        $black_list[] = 'WilmerMikadoClassAuthorInfoWidget';
        $black_list[] = 'WilmerMikadoClassBlogListWidget';
        $black_list[] = 'WilmerMikadoClassButtonWidget';
        $black_list[] = 'WilmerMikadoClassContactForm7Widget';
        $black_list[] = 'WilmerMikadoClassCustomFontWidget';
        $black_list[] = 'WilmerMikadoClassImageGalleryWidget';
        $black_list[] = 'WilmerMikadoClassRecentPosts';
        $black_list[] = 'WilmerMikadoClassSearchOpener';
        $black_list[] = 'WilmerMikadoClassSearchPostType';
        $black_list[] = 'WilmerMikadoClassSeparatorWidget';
        $black_list[] = 'WilmerMikadoClassSideAreaOpener';
        $black_list[] = 'WilmerMikadoClassSocialIconWidget';
        $black_list[] = 'WilmerMikadoClassClassIconsGroupWidget';
        $black_list[] = 'WilmerMikadoClassStickySidebar';
        $black_list[] = 'WilmerMikadoClassWoocommerceDropdownCart';

        return $black_list;
    }

    add_filter('elementor/widgets/black_list', 'wilmer_core_remove_widgets_for_elementor');
}

if ( ! function_exists( 'wilmer_core_return_elementor_templates' ) ) {
    /**
     * Function that returns all Elementor saved templates
     */
    function wilmer_core_return_elementor_templates() {
        return Elementor\Plugin::instance()->templates_manager->get_source( 'local' )->get_items();
    }
}

if ( ! function_exists( 'wilmer_core_generate_elementor_templates_control' ) ) {
    /**
     * Function that adds Template Elementor Control
     */
    function wilmer_core_generate_elementor_templates_control( $object ) {
        $templates = wilmer_core_return_elementor_templates();

        if ( ! empty( $templates ) ) {
            $options = [
                '0' => '— ' . esc_html__( 'Select', 'wilmer-core' ) . ' —',
            ];

            $types = [];

            foreach ( $templates as $template ) {
                $options[ $template['template_id'] ] = $template['title'] . ' (' . $template['type'] . ')';
                $types[ $template['template_id'] ]   = $template['type'];
            }

            $object->add_control(
                'template_id',
                [
                    'label'       => esc_html__( 'Choose Template', 'wilmer-core' ),
                    'type'        => \Elementor\Controls_Manager::SELECT,
                    'default'     => '0',
                    'options'     => $options,
                    'types'       => $types,
                    'label_block' => 'true'
                ]
            );
        };
    }
}

//function that maps "Anchor" option for section
if( ! function_exists('wilmer_core_map_section_anchor_option') ){
    function wilmer_core_map_section_anchor_option( $section, $args ){
        $section->start_controls_section(
            'section_mikado_anchor',
            [
                'label' => esc_html__( 'Wilmer Anchor', 'wilmer-core' ),
                'tab'   => \Elementor\Controls_Manager::TAB_ADVANCED,
            ]
        );

        $section->add_control(
            'anchor_id',
            [
                'label' => esc_html__( 'Wilmer Anchor ID', 'wilmer-core' ),
                'type'  => Elementor\Controls_Manager::TEXT,
            ]
        );

        $section->end_controls_section();
    }

    add_action('elementor/element/section/_section_responsive/after_section_end', 'wilmer_core_map_section_anchor_option', 10, 2);
}

//function that renders "Anchor" option for section
if( ! function_exists('wilmer_core_render_section_anchor_option') ) {
    function wilmer_core_render_section_anchor_option( $element )   {
        if( 'section' !== $element->get_name() ) {
            return;
        }

        $params = $element->get_settings_for_display();

        if( ! empty( $params['anchor_id'] ) ){
            $element->add_render_attribute( '_wrapper', 'data-mkdf-anchor', $params['anchor_id'] );
        }
    }

    add_action( 'elementor/frontend/section/before_render', 'wilmer_core_render_section_anchor_option');
}

//function that maps "Parallax" option for section
if ( ! function_exists( 'wilmer_core_map_section_parallax_option' ) ) {
    function wilmer_core_map_section_parallax_option( $section, $args ) {
        $section->start_controls_section(
            'section_mikado_parallax',
            [
                'label' => esc_html__( 'Wilmer Parallax', 'wilmer-core' ),
                'tab'   => \Elementor\Controls_Manager::TAB_ADVANCED,
            ]
        );

        $section->add_control(
            'mikado_enable_parallax',
            [
                'label'        => esc_html__( 'Enable Parallax', 'wilmer-core' ),
                'type'         => Elementor\Controls_Manager::SELECT,
                'default'      => 'no',
                'options'      => [
                    'no'     => esc_html__( 'No', 'wilmer-core' ),
                    'holder' => esc_html__( 'Yes', 'wilmer-core' ),
                ],
                'prefix_class' => 'mkdf-parallax-row-'
            ]
        );

        $section->add_control(
            'mikado_parallax_image',
            [
                'label'              => esc_html__( 'Parallax Image', 'wilmer-core' ),
                'type'               => Elementor\Controls_Manager::MEDIA,
                'condition'          => [
                    'mikado_enable_parallax' => 'holder'
                ],
                'frontend_available' => true,
            ]
        );

        $section->add_control(
            'mikado_parallax_speed',
            [
                'label'     => esc_html__( 'Parallax Speed', 'wilmer-core' ),
                'type'      => Elementor\Controls_Manager::TEXT,
                'condition' => [
                    'mikado_enable_parallax' => 'holder'
                ],
                'default'   => '0'
            ]
        );

        $section->add_control(
            'mikado_parallax_height',
            [
                'label'     => esc_html__( 'Parallax Section Height (px)', 'wilmer-core' ),
                'type'      => Elementor\Controls_Manager::TEXT,
                'condition' => [
                    'mikado_enable_parallax' => 'holder'
                ],
                'default'   => '0'
            ]
        );

        $section->end_controls_section();
    }

    add_action( 'elementor/element/section/_section_responsive/after_section_end', 'wilmer_core_map_section_parallax_option', 10, 2 );
}

//frontend function for "Parallax"
if ( ! function_exists( 'wilmer_core_render_section_parallax_option' ) ) {
    function wilmer_core_render_section_parallax_option( $element ) {
        if ( 'section' !== $element->get_name() ) {
            return;
        }

        $params = $element->get_settings_for_display();

        if ( ! empty( $params['mikado_parallax_image']['id'] ) ) {
            $parallax_image_src = $params['mikado_parallax_image']['url'];
            $parallax_speed     = ! empty( $params['mikado_parallax_speed'] ) ? $params['mikado_parallax_speed'] : '1';
            $parallax_height    = ! empty( $params['mikado_parallax_height'] ) ? $params['mikado_parallax_height'] : 0;

            $element->add_render_attribute( '_wrapper', 'class', 'mkdf-parallax-row-holder' );
            $element->add_render_attribute( '_wrapper', 'data-parallax-bg-speed', $parallax_speed );
            $element->add_render_attribute( '_wrapper', 'data-parallax-bg-image', $parallax_image_src );
            $element->add_render_attribute( '_wrapper', 'data-parallax-bg-height', $parallax_height );
        }
    }

    add_action( 'elementor/frontend/section/before_render', 'wilmer_core_render_section_parallax_option' );
}

//function that renders helper hidden input for parallax data attribute section
if ( ! function_exists( 'wilmer_core_generate_parallax_helper' ) ) {
    function wilmer_core_generate_parallax_helper( $template, $widget ) {
        if ( 'section' === $widget->get_name() ) {
            $template_preceding = "
            <# if( settings.mikado_enable_parallax == 'holder' ){
		        let parallaxSpeed = settings.mikado_parallax_speed !== '' ? settings.mikado_parallax_speed : '0';
	            let parallaxImage = settings.mikado_parallax_image.url !== '' ? settings.mikado_parallax_image.url : '0'
	        #>
		        <input type='hidden' class='mkdf-parallax-helper-holder' data-parallax-bg-speed='{{ parallaxSpeed }}' data-parallax-bg-image='{{ parallaxImage }}'/>
		    <# } #>";
            $template           = $template_preceding . " " . $template;
        }

        return $template;
    }

    add_action( 'elementor/section/print_template', 'wilmer_core_generate_parallax_helper', 10, 2 );
}

//function that maps "Content Alignment" option for section
if ( ! function_exists( 'wilmer_core_map_section_content_alignment_option' ) ) {
    function wilmer_core_map_section_content_alignment_option( $section, $args ) {
        $section->start_controls_section(
            'mikado_section_content_alignment',
            [
                'label' => esc_html__( 'Wilmer Content Alignment', 'wilmer-core' ),
                'tab'   => \Elementor\Controls_Manager::TAB_ADVANCED,
            ]
        );

        $section->add_control(
            'mikado_content_alignment',
            [
                'label'        => esc_html__( 'Content Alignment', 'wilmer-core' ),
                'type'         => Elementor\Controls_Manager::SELECT,
                'default'      => 'left',
                'options'      => [
                    'left'   => esc_html__( 'Left', 'wilmer-core' ),
                    'center' => esc_html__( 'Center', 'wilmer-core' ),
                    'right'  => esc_html__( 'Right', 'wilmer-core' )
                ],
                'prefix_class' => 'mkdf-content-aligment-'
            ]
        );

        $section->end_controls_section();
    }

    add_action( 'elementor/element/section/_section_responsive/after_section_end', 'wilmer_core_map_section_content_alignment_option', 10, 2 );
}

//function that maps "Grid" option for section
if ( ! function_exists( 'wilmer_core_map_section_grid_option' ) ) {
    function wilmer_core_map_section_grid_option( $section, $args ) {
        $section->start_controls_section(
            'mikado_section_grid_row',
            [
                'label' => esc_html__( 'Wilmer Grid', 'wilmer-core' ),
                'tab'   => \Elementor\Controls_Manager::TAB_ADVANCED,
            ]
        );

        $section->add_control(
            'mikado_enable_grid_row',
            [
                'label'        => esc_html__( 'Make this row "In Grid"', 'wilmer-core' ),
                'type'         => Elementor\Controls_Manager::SELECT,
                'default'      => 'no',
                'options'      => [
                    'no'      => esc_html__( 'No', 'wilmer-core' ),
                    'section' => esc_html__( 'Yes', 'wilmer-core' ),
                ],
                'prefix_class' => 'mkdf-elementor-row-grid-'
            ]
        );

        $section->end_controls_section();
    }

    add_action( 'elementor/element/section/_section_responsive/after_section_end', 'wilmer_core_map_section_grid_option', 10, 2 );
}

//function that adds maps "Disable Background" option for section
if ( ! function_exists( 'wilmer_core_map_section_disable_background' ) ) {
    function wilmer_core_map_section_disable_background( $section, $args ) {
        $section->start_controls_section(
            'mikado_section_disable_background',
            [
                'label' => esc_html__( 'Wilmer Disable Background Image', 'wilmer-core' ),
                'tab'   => \Elementor\Controls_Manager::TAB_ADVANCED,
            ]
        );

        $section->add_control(
            'mikado_disable_background',
            [
                'label'        => esc_html__( 'Disable row background', 'wilmer-core' ),
                'type'         => Elementor\Controls_Manager::SELECT,
                'default'      => 'no',
                'options'      => [
                    'no'   => esc_html__( 'Never', 'wilmer-core' ),
                    '1280' => esc_html__( 'Below 1280px', 'wilmer-core' ),
                    '1024' => esc_html__( 'Below 1024px', 'wilmer-core' ),
                    '768'  => esc_html__( 'Below 768px', 'wilmer-core' ),
                    '680'  => esc_html__( 'Below 680px', 'wilmer-core' ),
                    '480'  => esc_html__( 'Below 480px', 'wilmer-core' )
                ],
                'prefix_class' => 'mkdf-disabled-bg-image-bellow-'
            ]
        );

        $section->end_controls_section();
    }

    add_action( 'elementor/element/section/_section_responsive/after_section_end', 'wilmer_core_map_section_disable_background', 10, 2 );
}


if( ! function_exists('wilmer_core_elementor_icons_style') ){
    function wilmer_core_elementor_icons_style(){

        wp_enqueue_style( 'wilmer-core-elementor', WILMER_CORE_ASSETS_URL_PATH . '/css/admin/wilmer-elementor.css');

    }

    add_action( 'elementor/editor/before_enqueue_scripts', 'wilmer_core_elementor_icons_style' );
}


if ( ! function_exists( 'wilmer_core_get_elementor_shortcodes_path' ) ) {
    function wilmer_core_get_elementor_shortcodes_path() {
        $shortcodes       = array();
        $shortcodes_paths = array(
            WILMER_CORE_SHORTCODES_PATH . '/*' => WILMER_CORE_URL_PATH,
            WILMER_CORE_CPT_PATH . '/**/shortcodes/*' => WILMER_CORE_URL_PATH,
            WILMER_INSTAGRAM_SHORTCODES_PATH . '/*' => WILMER_INSTAGRAM_URL_PATH,
            WILMER_TWITTER_SHORTCODES_PATH . '/*' => WILMER_TWITTER_URL_PATH,
            MIKADO_FRAMEWORK_MODULES_ROOT_DIR . '/**/shortcodes/*' => MIKADO_FRAMEWORK_ROOT . '/'
        );

        foreach ( $shortcodes_paths as $dir_path => $url_path ) {
            foreach ( glob( $dir_path, GLOB_ONLYDIR ) as $shortcode_dir_path ) {
                $shortcode_name     = basename( $shortcode_dir_path );
                $shortcode_url_path = $url_path . substr( $shortcode_dir_path, strpos( $shortcode_dir_path, basename( $url_path ) ) + strlen( basename( $url_path ) ) + 1 );

                $shortcodes[ $shortcode_name ] = array(
                    'dir_path' => $shortcode_dir_path,
                    'url_path' => $shortcode_url_path
                );
            }
        }

        return $shortcodes;
    }
}
if ( ! function_exists( 'wilmer_core_add_elementor_shortcodes_custom_styles' ) ) {
    function wilmer_core_add_elementor_shortcodes_custom_styles() {
        $style                  = '';
        $shortcodes_icon_styles = array();

        $shortcodes_icon_class_array = apply_filters( 'wilmer_core_filter_add_vc_shortcodes_custom_icon_class', $shortcodes_icon_class_array = array() );
        sort( $shortcodes_icon_class_array );

        $shortcodes_path = wilmer_core_get_elementor_shortcodes_path();
        if ( ! empty( $shortcodes_icon_class_array ) ) {
            foreach ( $shortcodes_icon_class_array as $shortcode_icon_class ) {

                $shortcode_name = str_replace( '.icon-wpb-', '', esc_attr( $shortcode_icon_class ) );

                if ( key_exists( $shortcode_name, $shortcodes_path ) && file_exists( $shortcodes_path[ $shortcode_name ]['dir_path'] . '/assets/img/dashboard_icon.png' ) ) {
                    $shortcodes_icon_styles[] = '.wilmer-elementor-custom-icon.wilmer-elementor-' . $shortcode_name . ' {
                        background-image: url( "' . $shortcodes_path[ $shortcode_name ]['url_path'] . '/assets/img/dashboard_icon.png" );
                    }';
                }
            }
        }

        if ( ! empty( $shortcodes_icon_styles ) ) {
            $style = implode( ' ', $shortcodes_icon_styles );
        }
        if ( ! empty( $style ) ) {
            wp_add_inline_style( 'wilmer-core-elementor', $style );
        }
    }

    add_action( 'elementor/editor/before_enqueue_scripts', 'wilmer_core_add_elementor_shortcodes_custom_styles', 15 );
}

//function that adds maps "Row Background Text" option for section
if ( ! function_exists( 'wilmer_core_map_section_bg_text' ) ) {
    function wilmer_core_map_section_bg_text( $section, $args ) {
        $section->start_controls_section(
            'wilmer_section_background',
            [
                'label' => esc_html__( 'Wilmer Background Text', 'wilmer-core' ),
                'tab'   => \Elementor\Controls_Manager::TAB_ADVANCED,
            ]
        );

        $section->add_control(
            'row_background_text_1',
            [
                'label' => esc_html__( 'Background Text', 'wilmer-core' ),
                'type'  => \Elementor\Controls_Manager::TEXT,
                'render_type' => 'template',
            ]
        );

        $section->add_control(
            'row_background_color',
            [
                'label' => esc_html__( 'Mikado Section Background Color', 'wilmer-core' ),
                'description' => esc_html__( 'Define background color of this section', 'wilmer-core' ),
                'type'  => \Elementor\Controls_Manager::COLOR,
                'render_type' => 'template',
                'condition' => [
                    'row_background_text_1!' => ''
                ],
                'selectors' => [
                    '{{WRAPPER}}' => 'background-color: {{VALUE}};'
                ]
            ]
        );

        $section->add_control(
            'row_background_text_position',
            [
                'label' => esc_html__( 'Mikado Background Text Position', 'wilmer-core' ),
                'type'  => \Elementor\Controls_Manager::SELECT,
                'options' => [
                    'front' => esc_html__( 'Front', 'wilmer' ),
                    'back' => esc_html__( 'Back', 'wilmer' ),
                ],
                'default' => 'front',
                'condition' => [
                    'row_background_text_1!' => ''
                ]
            ]
        );

        $section->add_control(
            'row_background_text_size',
            [
                'label' => esc_html__( 'Mikado Background Text Size', 'wilmer' ),
                'description' => esc_html__( 'Set the background text size in px or em', 'wilmer' ),
                'type'  => \Elementor\Controls_Manager::TEXT,
                'condition' => [
                    'row_background_text_1!' => ''
                ]
            ]
        );

        $section->add_control(
            'row_background_text_size_1440',
            [
                'label' => esc_html__( 'Mikado Background Text Size 1280px-1440px', 'wilmer' ),
                'description' => esc_html__( 'Set the background text size in px or em', 'wilmer' ),
                'type'  => \Elementor\Controls_Manager::TEXT,
                'condition' => [
                    'row_background_text_1!' => ''
                ],
                'label_block' => true,
            ]
        );

        $section->add_control(
            'row_background_text_size_1280',
            [
                'label' => esc_html__( 'Mikado Background Text Size 1024px-1280px', 'wilmer' ),
                'description' => esc_html__( 'Set the background text size in px or em', 'wilmer' ),
                'type'  => \Elementor\Controls_Manager::TEXT,
                'condition' => [
                    'row_background_text_1!' => ''
                ],
                'label_block' => true,
            ]
        );

        $section->add_control(
            'row_background_text_color',
            [
                'label' => esc_html__( 'Mikado Background Text Color', 'wilmer-core' ),
                'type'  => \Elementor\Controls_Manager::COLOR,
                'condition' => [
                    'row_background_text_1!' => ''
                ]
            ]
        );

        $section->add_control(
            'row_background_text_align',
            [
                'label' => esc_html__( 'Mikado Background Text Align', 'wilmer-core' ),
                'type'  => \Elementor\Controls_Manager::SELECT,
                'options' => [
                    ''        => esc_html__( 'Default', 'wilmer-core' ),
                    'left'    => esc_html__( 'Left', 'wilmer-core' ),
                    'center'  => esc_html__( 'Center', 'wilmer-core' ),
                    'right'   => esc_html__( 'Right', 'wilmer-core' )
                ],
                'condition' => [
                    'row_background_text_1!' => ''
                ]
            ]
        );

        $section->add_control(
            'row_background_text_vertical_align',
            [
                'label' => esc_html__( 'Mikado Background Vertical Align', 'wilmer' ),
                'type'  => \Elementor\Controls_Manager::SELECT,
                'options' => [
                    'middle'  => esc_html__( 'Middle', 'wilmer-core' ),
                    'top'     => esc_html__( 'Top', 'wilmer-core' ),
                    'bottom'  => esc_html__( 'Bottom', 'wilmer-core' )
                ],
                'default' => 'middle',
                'condition' => [
                    'row_background_text_1!' => ''
                ]
            ]
        );

        $section->add_control(
            'row_background_text_padding_top',
            [
                'label' => esc_html__( 'Mikado Background Text Top Padding', 'wilmer' ),
                'description' => esc_html__( 'Set the value of top padding in px or %', 'wilmer' ),
                'type'  => \Elementor\Controls_Manager::TEXT,
                'condition' => [
                    'row_background_text_1!' => ''
                ],
                'label_block' => true,
            ]
        );

        $section->add_control(
            'row_background_text_padding_top_1440',
            [
                'label' => esc_html__( 'Mikado Background Text Top Padding Size 1280px-1440px', 'wilmer' ),
                'description' => esc_html__( 'Set the value of top padding in px or %', 'wilmer' ),
                'type'  => \Elementor\Controls_Manager::TEXT,
                'condition' => [
                    'row_background_text_1!' => ''
                ],
                'label_block' => true,
            ]
        );

        $section->add_control(
            'row_background_text_padding_top_1280',
            [
                'label' => esc_html__( 'Mikado Background Text Top Padding Size 1024px-1280px', 'wilmer' ),
                'description' => esc_html__( 'Set the value of top padding in px or %', 'wilmer' ),
                'type'  => \Elementor\Controls_Manager::TEXT,
                'condition' => [
                    'row_background_text_1!' => ''
                ],
                'label_block' => true,
            ]
        );

        $section->add_control(
            'row_background_text_padding_left',
            [
                'label' => esc_html__( 'Mikado Background Text Left Padding', 'wilmer' ),
                'description' => esc_html__( 'Set the value of left padding in px or %', 'wilmer' ),
                'type'  => \Elementor\Controls_Manager::TEXT,
                'condition' => [
                    'row_background_text_1!' => ''
                ],
                'label_block' => true,
            ]
        );

        $section->add_control(
            'row_background_text_padding_left_1440',
            [
                'label' => esc_html__( 'Mikado Background Text Left Padding Size 1280px-1440px', 'wilmer' ),
                'description' => esc_html__( 'Set the value of left padding in px or %', 'wilmer' ),
                'type'  => \Elementor\Controls_Manager::TEXT,
                'condition' => [
                    'row_background_text_1!' => ''
                ],
                'label_block' => true,
            ]
        );

        $section->add_control(
            'row_background_text_padding_left_1280',
            [
                'label' => esc_html__( 'Mikado Background Text Left Padding Size 1024px-1280px', 'wilmer' ),
                'description' => esc_html__( 'Set the value of left padding in px or %', 'wilmer' ),
                'type'  => \Elementor\Controls_Manager::TEXT,
                'condition' => [
                    'row_background_text_1!' => ''
                ],
                'label_block' => true,
            ]
        );

        $section->add_control(
            'row_background_text_animation',
            [
                'label' => esc_html__( 'Animate Background Text', 'wilmer' ),
                'description' => esc_html__( 'Set the value of left padding in px or %', 'wilmer' ),
                'type'  => \Elementor\Controls_Manager::SELECT,
                'options' => wilmer_mikado_get_yes_no_select_array(false, true),
                'default' => 'yes',
                'condition' => [
                    'row_background_text_1!' => ''
                ],
                'render_type' => 'template',
            ]
        );

        $section->end_controls_section();
    }

    add_action( 'elementor/element/section/_section_responsive/after_section_end', 'wilmer_core_map_section_bg_text', 10, 2 );
}

//function that adds maps "Row Background Pattern" option for section
if ( ! function_exists( 'wilmer_core_map_section_bg_pattern' ) ) {
    function wilmer_core_map_section_bg_pattern( $section, $args ) {
        $section->start_controls_section(
            'wilmer_section_pattern',
            [
                'label' => esc_html__( 'Wilmer Background Pattern', 'wilmer-core' ),
                'tab'   => \Elementor\Controls_Manager::TAB_ADVANCED,
            ]
        );

        $section->add_control(
            'enable_bg_pattern',
            [
                'label' => esc_html__( 'Mikado Background Pattern', 'wilmer-core' ),
                'type'  => \Elementor\Controls_Manager::SELECT,
                'options' => wilmer_mikado_get_yes_no_select_array(false, false),
                'default' => 'no'
            ]
        );

        $section->end_controls_section();
    }

    add_action( 'elementor/element/section/_section_responsive/after_section_end', 'wilmer_core_map_section_bg_pattern', 10, 2 );
}

//function that adds maps "Row Back To Top Skin" option for section
if ( ! function_exists( 'wilmer_core_map_section_btt_skin' ) ) {
    function wilmer_core_map_section_btt_skin( $section, $args ) {
        $section->start_controls_section(
            'wilmer_section_btt_skin',
            [
                'label' => esc_html__( 'Wilmer Section Skin', 'wilmer-core' ),
                'tab'   => \Elementor\Controls_Manager::TAB_ADVANCED,
            ]
        );

        $section->add_control(
            'row_btt_skin',
            [
                'label' => esc_html__( 'Row Skin', 'wilmer-core' ),
                'type'  => \Elementor\Controls_Manager::SELECT,
                'options' => [
                    'light' => esc_html__('Light', 'wilmer-core'),
                    'dark' => esc_html__('Dark', 'wilmer-core'),
                ],
                'default' => 'light',
                'prefix_class' => 'mkdf-row-btt-'
            ]
        );

        $section->end_controls_section();
    }

    add_action( 'elementor/element/section/_section_responsive/after_section_end', 'wilmer_core_map_section_btt_skin', 10, 2 );
}

if ( ! function_exists( 'wilmer_core_render_section_background_before' ) ) {
    function wilmer_core_render_section_background_before( $section ) {
        ob_start();
    }
    add_action( 'elementor/frontend/section/before_render', 'wilmer_core_render_section_background_before');
}

if ( ! function_exists( 'wilmer_core_render_section_after' ) ) {
    function wilmer_core_render_section_after( $section ) {

        $content = ob_get_clean();

        $params = $section->get_settings_for_display();
        extract( $params );

        $row_new_content = '';
        $row_background_text = '';
        $row_background_pattern = '';

        if ( !empty($params['row_background_text_1']) || ( !empty($enable_bg_pattern) && $enable_bg_pattern == 'yes' )) {
            $row_background_main_classes = 'mkdf-elementor-row';
            $row_background_main_styles = '';

            if( !empty($enable_bg_pattern) && $enable_bg_pattern == 'yes' ){
                $row_background_main_classes .= ' mkdf-row-with-bg-pattern';
            }

            if( ! empty( $params['row_background_text_1'] ) && ! empty( $params['row_background_color'] ) ){
                $row_background_main_styles .= 'background-color: ' . esc_attr( $params['row_background_color'] ) . ';';
                $row_background_main_classes .= ' mkdf-elementor-section-with-custom-bg-color';
            }

            $row_new_content .= '<div class="' . $row_background_main_classes . '" style="' . $row_background_main_styles . '">';

            if ( !empty($params['row_background_text_1']) ){
                $row_background_text_style = array();

                if(!empty($row_background_text_size)){
                    $row_background_text_style[] = 'font-size:' . esc_html($row_background_text_size);
                }
                if(!empty($row_background_text_color)){
                    $row_background_text_style[] = 'color:' . esc_html($row_background_text_color);
                    $row_background_text_style[] = '-webkit-text-stroke-color:' . esc_html($row_background_text_color);
                }

                if(!empty($row_background_text_align)){
                    $row_background_text_style[] = 'text-align:' . esc_html($row_background_text_align);
                }

                if(!empty($row_background_text_vertical_align)){
                    $row_background_text_style[] = 'vertical-align:' . esc_html($row_background_text_vertical_align);
                }

                if(!empty($row_background_text_padding_top)){
                    $row_background_text_style[] = 'padding-top:' . esc_html($row_background_text_padding_top);
                }

                if(!empty($row_background_text_padding_left)){
                    $row_background_text_style[] = 'padding-left:' . esc_html($row_background_text_padding_left);
                }

                $row_background_text_styles = implode(';', $row_background_text_style);



                $row_background_text_data = array();

                if(!empty($row_background_text_size_1440)){
                    $row_background_text_data[] = 'data-font-size-1440=' . esc_html($row_background_text_size_1440);
                }

                if(!empty($row_background_text_size_1280)){
                    $row_background_text_data[] = 'data-font-size-1280=' . esc_html($row_background_text_size_1280);
                }

                if(!empty($row_background_text_padding_top_1440)){
                    $row_background_text_data[] = 'data-padding-size-1440=' . esc_html($row_background_text_padding_top_1440);
                }

                if(!empty($row_background_text_padding_top_1280)){
                    $row_background_text_data[] = 'data-padding-size-1280=' . esc_html($row_background_text_padding_top_1280);
                }

                if(!empty($row_background_text_padding_left_1440)){
                    $row_background_text_data[] = 'data-padding-left-size-1440=' . esc_html($row_background_text_padding_left_1440);
                }

                if(!empty($row_background_text_padding_left_1280)){
                    $row_background_text_data[] = 'data-padding-left-size-1280=' . esc_html($row_background_text_padding_left_1280);
                }

                $row_background_text_datas = implode(' ', $row_background_text_data);

                $row_background_text_wrapper_classes = '';

                if (!empty($row_background_text_animation)) {
                    if ($row_background_text_animation == 'yes') {
                        $row_background_text_wrapper_classes .= 'mkdf-row-background-text-animation';
                    }

                    if (!empty($row_background_text_align)) {
                        $row_background_text_wrapper_classes .= ' mkdf-row-background-text-align-'.$row_background_text_align;
                    }
                }

                $row_background_text .= '<div class="mkdf-row-background-text-holder mkdf-row-background-text-'.$row_background_text_position.'">';
                $row_background_text .= '<div class="mkdf-row-background-text-wrapper '.esc_attr($row_background_text_wrapper_classes).'">';
                $row_background_text .= '<div class="mkdf-row-background-text-wrapper-inner" ' . wilmer_mikado_get_inline_style($row_background_text_styles) . ' ' . esc_html($row_background_text_datas) . '>';
                $row_background_text .= '<div class="mkdf-row-background-text-1">';
                $row_background_text .= $row_background_text_1;
                $row_background_text .= '</div>';

                if (!empty($row_background_text_2)) {
                    $row_background_text .= '<div class="mkdf-row-background-text-2">';
                    $row_background_text .= $row_background_text_2;
                    $row_background_text .= '</div>';
                }
                $row_background_text .= '</div>';
                $row_background_text .= '</div>';
                $row_background_text .= '</div>';
            }

            if( !empty($enable_bg_pattern) && $enable_bg_pattern == 'yes' ){
                $row_background_pattern .= '<div class="mkdf-row-background-pattern-holder">';
                $row_background_pattern .= '<div class="mkdf-row-background-pattern-left">';
                $row_background_pattern .= '</div>';
                $row_background_pattern .= '<div class="mkdf-row-background-pattern-right">';
                $row_background_pattern .= '</div>';
                $row_background_pattern .= '</div>';
            }

            $row_new_content .= $content;
            $row_new_content .= $row_background_text;
            $row_new_content .= $row_background_pattern;

            $row_new_content .= '</div>';

            echo wilmer_mikado_get_module_part( $row_new_content );
        } else{
            echo wilmer_mikado_get_module_part( $content );
        }
    }
    add_action( 'elementor/frontend/section/after_render', 'wilmer_core_render_section_after');
}

//function that renders background text in admin
if ( ! function_exists( 'wilmer_core_render_section_background_option_admin' ) ) {
    function wilmer_core_render_section_background_option_admin( $template, $widget ) {
        if ( 'section' === $widget->get_name() ) {

            $template_text = "
            <# 
                        
            if( settings.row_background_text_1 !== '' ){
            	let row_background_text_1 = settings.row_background_text_1;
            	            	
            	let row_background_text_position = '';
            	if( settings.row_background_text_position !== '' ){
            		row_background_text_position =  settings.row_background_text_position;
            	}
            	
            	let row_background_text_size = '';
            	if( settings.row_background_text_size !== '' ){
            		row_background_text_size =  settings.row_background_text_size;
            	}
            	
            	let row_background_text_size_1440 = '';
            	if( settings.row_background_text_size_1440 !== '' ){
            		row_background_text_size_1440 =  settings.row_background_text_size_1440;
            	}
            	
            	let row_background_text_size_1280 = '';
            	if( settings.row_background_text_size_1280 !== '' ){
            		row_background_text_size_1280 =  settings.row_background_text_size_1280;
            	}
            	
            	let row_background_text_color = '';
            	if( settings.row_background_text_color !== '' ){
            		row_background_text_color =  settings.row_background_text_color;
            	}
            	
            	let row_background_text_align = '';
            	if( settings.row_background_text_align !== '' ){
            		row_background_text_align =  settings.row_background_text_align;
            	}
            	
            	let row_background_text_vertical_align = '';
            	if( settings.row_background_text_vertical_align !== '' ){
            		row_background_text_vertical_align =  settings.row_background_text_vertical_align;
            	}
            	
            	let row_background_text_padding_top = '';
            	if( settings.row_background_text_padding_top !== '' ){
            		row_background_text_padding_top =  settings.row_background_text_padding_top;
            	}
            	
            	let row_background_text_padding_top_1440 = '';
            	if( settings.row_background_text_padding_top_1440 !== '' ){
            		row_background_text_padding_top_1440 =  settings.row_background_text_padding_top_1440;
            	}
            	
            	let row_background_text_padding_top_1280 = '';
            	if( settings.row_background_text_padding_top_1280 !== '' ){
            		row_background_text_padding_top_1280 =  settings.row_background_text_padding_top_1280;
            	}
            	
            	let row_background_text_padding_left = '';
            	if( settings.row_background_text_padding_left !== '' ){
            		row_background_text_padding_left =  settings.row_background_text_padding_left;
            	}
            	
            	let row_background_text_padding_left_1440 = '';
            	if( settings.row_background_text_padding_left_1440 !== '' ){
            		row_background_text_padding_left_1440 =  settings.row_background_text_padding_left_1440;
            	}
            	
            	let row_background_text_padding_left_1280 = '';
            	if( settings.row_background_text_padding_left_1280 !== '' ){
            		row_background_text_padding_left_1280 =  settings.row_background_text_padding_left_1280;
            	}
            	
            	let row_background_text_animation = '';
            	if( settings.row_background_text_animation !== '' ){
            		row_background_text_animation =  settings.row_background_text_animation;
            	}
            	
            	let row_background_text_wrapper_classes = '';

                if ( row_background_text_animation !== '' ) {
                    if ( row_background_text_animation == 'yes') {
                        row_background_text_wrapper_classes += 'mkdf-row-background-text-animation';
                    }
            
                    if ( row_background_text_align !== '' ) {
                        row_background_text_wrapper_classes += ' mkdf-row-background-text-align-' + row_background_text_align;
                    }
                }
                
                let row_background_text_style = 'style=';

                if( row_background_text_size !== '' ){
                    row_background_text_style += 'font-size:' + row_background_text_size + ';';
                }
                
                if( row_background_text_color !== '' ){
                    row_background_text_style += 'color:' + row_background_text_color + ';';
                    row_background_text_style += '-webkit-text-stroke-color:' + row_background_text_color + ';';
                }
            
                if( row_background_text_align !== '' ){
                    row_background_text_style += 'text-align:' + row_background_text_align + ';';
                }
            
                if( row_background_text_vertical_align !== '' ){
                    row_background_text_style += 'vertical-align:' + row_background_text_vertical_align + ';';
                }
            
                if( row_background_text_padding_top !== '' ){
                    row_background_text_style += 'padding-top:' + row_background_text_padding_top + ';';
                }
            
                if( row_background_text_padding_left !== '' ){
                    row_background_text_style += 'padding-left:' + row_background_text_padding_left + ';';
                }
                
                
                let row_background_text_data = '';

                if( row_background_text_size_1440 !== '' ){
                    row_background_text_data += 'data-font-size-1440=\"' + row_background_text_size_1440 + '\"';
                }
            
                if( row_background_text_size_1280 !== '' ){
                    row_background_text_data += 'data-font-size-1280=\"'  + row_background_text_size_1280 + '\"';
                }
            
                if( row_background_text_padding_top_1440 !== '' ){
                    row_background_text_data += 'data-padding-size-1440=\"' + row_background_text_padding_top_1440 + '\"';
                }
            
                if( row_background_text_padding_top_1280 !== '' ){
                    row_background_text_data += 'data-padding-size-1280=\"' + row_background_text_padding_top_1280 + '\"';
                }
            
                if(row_background_text_padding_left_1440 !== '' ){
                    row_background_text_data += 'data-padding-left-size-1440=\"' + row_background_text_padding_left_1440 + '\"';
                }
            
                if( row_background_text_padding_left_1280 !== '' ){
                    row_background_text_data += 'data-padding-left-size-1280=\"' + row_background_text_padding_left_1280 + '\"';
                }
                
	        #>
	        	<div class='mkdf-row-background-text-holder mkdf-row-background-text-{{ row_background_text_position }}'>
	        	    <div class='mkdf-row-background-text-wrapper {{ row_background_text_wrapper_classes }}'>
	        	        <div class='mkdf-row-background-text-wrapper-inner' {{ row_background_text_style }} {{{ row_background_text_data }}}>
	        	            <div class='mkdf-row-background-text-1'>
	        	                {{ row_background_text_1 }}
	        	            </div>
	        	        </div>
	        	    </div>	        	    
                </div>
 			<# } #>";

            $template = $template_text . " " . $template;
        }

        return $template;
    }

    add_action( 'elementor/section/print_template', 'wilmer_core_render_section_background_option_admin', 10, 2 );
}

//function that renders background pattern in admin
if ( ! function_exists( 'wilmer_core_render_section_background_pattern_admin' ) ) {
    function wilmer_core_render_section_background_pattern_admin($template, $widget)
    {
        if ('section' === $widget->get_name()) {

            $template_text = "
            <#
                if( settings.enable_bg_pattern !== '' && settings.enable_bg_pattern == 'yes' ){ #>
                  <div class='mkdf-row-background-pattern-holder'>
                    <div class='mkdf-row-background-pattern-left'>
                    </div>
                    <div class='mkdf-row-background-pattern-right'>
                    </div>
                  </div>
                <#}
	        #>";

            $template = $template_text . " " . $template;
        }

        return $template;
    }

    add_action('elementor/section/print_template', 'wilmer_core_render_section_background_pattern_admin', 10, 2);
}