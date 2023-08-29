<?php

namespace WilmerCore\Lib;

/**
 * interface PostTypeInterface
 * @package WilmerCore\Lib;
 */
interface PostTypeInterface {
	/**
	 * @return string
	 */
	public function getBase();
	
	/**
	 * Registers custom post type with WordPress
	 */
	public function register();
}