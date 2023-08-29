<?php

namespace DynamicContentForElementor;

if (!\defined('ABSPATH')) {
    exit;
}
class SaveGuard
{
    private $unsafe_widgets = [];
    private $unsafe_controls = [];
    private $unsafe_dynamic_tags = ['dce-dynamic-tag-php', 'dce-token'];
    public function register_unsafe_widget($type)
    {
        $this->unsafe_widgets[] = $type;
    }
    /**
     * Use $wiget_type 'any' for controls that could be on any element.  Use
     * $value_should_not_be '!empty' for letting settings through only when
     * they are empty. Or pass a function for custom checks.
     */
    public function register_unsafe_control($widget_type, $control_path, $value_should_not_be)
    {
        if (!isset($this->unsafe_controls[$widget_type])) {
            $this->unsafe_controls[$widget_type] = [];
        }
        $this->unsafe_controls[$widget_type][$control_path] = $value_should_not_be;
    }
    private function denied()
    {
        throw new \Exception(esc_html__('Only administrators can edit this Elementor Page', 'dynamic-content-for-elementor'));
    }
    private function inspect_dynamic_tags($settings)
    {
        foreach ($settings as $key => $val) {
            if ($key === '__dynamic__') {
                foreach ($val as $dt) {
                    foreach ($this->unsafe_dynamic_tags as $udt) {
                        if (\strpos($dt, $udt)) {
                            $this->denied();
                        }
                    }
                }
            } elseif (\is_array($val)) {
                $this->inspect_dynamic_tags($val);
            }
        }
    }
    private function inspect_settings_for_tokens($settings)
    {
        foreach ($settings as $key => $val) {
            if (\is_string($val)) {
                if (\preg_match('/\\[(?:author|query|wp_query|system):/', $val)) {
                    $this->denied();
                }
                if (\preg_match('/\\[[\\w-]+(\\||:.*\\|)/', $val)) {
                    $this->denied();
                }
            } elseif (\is_array($val)) {
                $this->inspect_settings_for_tokens($val);
            }
        }
    }
    private function inspect_settings_value($value, $should_not_be)
    {
        if (\is_callable($should_not_be)) {
            if ($should_not_be($value)) {
                $this->denied();
            }
        }
        if ($should_not_be === '!empty') {
            if ($value !== '') {
                $this->denied();
            }
        } elseif ($value === $should_not_be) {
            $this->denied();
        }
    }
    private function inspect_settings($settings, $widget_type)
    {
        $this->inspect_dynamic_tags($settings);
        $this->inspect_settings_for_tokens($settings);
        $controls = $this->unsafe_controls[$widget_type] ?? [];
        $controls += $this->unsafe_controls['any'] ?? [];
        foreach ($controls as $key => $should_not_be) {
            // if the control is inside a repeater:
            if (\strpos($key, '::')) {
                list($repeater, $subkey) = \explode('::', $key);
                // look through all the repeater fields:
                foreach ($settings[$repeater] ?? [] as $field) {
                    if (isset($field[$subkey])) {
                        $this->inspect_settings_value($field[$subkey], $should_not_be);
                    }
                }
            }
            if (isset($settings[$key])) {
                $this->inspect_settings_value($settings[$key], $should_not_be);
            }
        }
    }
    private function inspect_element($element)
    {
        $type = $element['widgetType'] ?? \false;
        if ($type && \in_array($type, $this->unsafe_widgets, \true)) {
            $this->denied();
        }
        if (isset($element['settings'])) {
            $this->inspect_settings($element['settings'], $type);
        }
        foreach ($element['elements'] as $index => $el) {
            $this->inspect_element($el);
        }
    }
    public function should_not_include($item)
    {
        return function ($value) use($item) {
            return \in_array($item, $value, \true);
        };
    }
    public function inspect_save_data($document, $data)
    {
        if (current_user_can('administrator')) {
            return;
        }
        $this->inspect_element($data);
    }
    public function __construct()
    {
        add_action('elementor/document/before_save', [$this, 'inspect_save_data'], 10, 2);
    }
}
