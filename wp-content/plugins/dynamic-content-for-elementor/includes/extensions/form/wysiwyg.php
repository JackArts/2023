<?php

namespace DynamicContentForElementor\Extensions;

use Elementor\Controls_Manager;
use ElementorPro\Plugin;
if (!\defined('ABSPATH')) {
    exit;
    // Exit if accessed directly
}
class WYSIWYG extends \ElementorPro\Modules\Forms\Fields\Field_Base
{
    private $is_common = \false;
    public $has_action = \false;
    public $depended_scripts = ['dce-tinymce-js', 'dce-wysiwyg'];
    public $depended_styles = [];
    public function get_script_depends()
    {
        return $this->depended_scripts;
    }
    public function get_style_depends()
    {
        return $this->depended_styles;
    }
    public function get_name()
    {
        return __('WYSIWYG', 'dynamic-content-for-elementor');
    }
    public function get_type()
    {
        return 'dce_wysiwyg';
    }
    public function update_controls($widget)
    {
        $elementor = Plugin::elementor();
        $control_data = $elementor->controls_manager->get_control_from_stack($widget->get_unique_name(), 'form_fields');
        if (is_wp_error($control_data)) {
            return;
        }
        $field_controls = ['dce_rows' => ['name' => 'dce_rows', 'label' => __('Rows', 'dynamic-content-for-elementor'), 'type' => Controls_Manager::NUMBER, 'default' => 4, 'conditions' => ['terms' => [['name' => 'field_type', 'value' => $this->get_type()]]], 'tabs_wrapper' => 'form_fields_tabs', 'tab' => 'content', 'inner_tab' => 'form_fields_content_tab']];
        $control_data['fields'] = $this->inject_field_controls($control_data['fields'], $field_controls);
        $widget->update_control('form_fields', $control_data);
    }
    public function render($item, $item_index, $form)
    {
        $form->add_render_attribute('textarea' . $item_index, ['class' => ['elementor-field-textual', 'elementor-field', esc_attr($item['css_classes']), 'elementor-size-' . $item['input_size']], 'name' => $form->get_attribute_name($item), 'id' => $form->get_attribute_id($item), 'rows' => $item['dce_rows']]);
        if ($item['placeholder']) {
            $form->add_render_attribute('textarea' . $item_index, 'placeholder', $item['placeholder']);
        }
        $value = empty($item['field_value']) ? '' : $item['field_value'];
        echo '<textarea ' . $form->get_render_attribute_string('textarea' . $item_index) . '>' . $value . '</textarea>';
    }
    public function sanitize_field($value, $field)
    {
        return wp_kses_post($value);
    }
}
