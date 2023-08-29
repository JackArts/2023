<?php

/**
 * This code was generated by
 * \ / _    _  _|   _  _
 * | (_)\/(_)(_|\/| |(/_  v1.0.0
 * /       /
 */

namespace Twilio\Rest\Authy\V1\Service;

use Twilio\Exceptions\TwilioException;
use Twilio\InstanceContext;
use Twilio\Rest\Authy\V1\Service\Entity\FactorList;
use Twilio\Values;
use Twilio\Version;

/**
 * PLEASE NOTE that this class contains preview products that are subject to change. Use them with caution. If you currently do not have developer preview access, please contact help@twilio.com.
 *
 * @property \Twilio\Rest\Authy\V1\Service\Entity\FactorList factors
 * @method \Twilio\Rest\Authy\V1\Service\Entity\FactorContext factors( string $sid )
 */
class EntityContext extends InstanceContext {
	protected $_factors = null;

	/**
	 * Initialize the EntityContext
	 *
	 * @param \Twilio\Version $version Version that contains the resource
	 * @param string $serviceSid Service Sid.
	 * @param string $identity Unique identity of the Entity
	 *
	 * @return \Twilio\Rest\Authy\V1\Service\EntityContext
	 */
	public function __construct( Version $version, $serviceSid, $identity ) {
		parent::__construct( $version );

		// Path Solution
		$this->solution = array( 'serviceSid' => $serviceSid, 'identity' => $identity, );

		$this->uri = '/Services/' . rawurlencode( $serviceSid ) . '/Entities/' . rawurlencode( $identity ) . '';
	}

	/**
	 * Deletes the EntityInstance
	 *
	 * @return boolean True if delete succeeds, false otherwise
	 * @throws TwilioException When an HTTP error occurs.
	 */
	public function delete() {
		return $this->version->delete( 'delete', $this->uri );
	}

	/**
	 * Fetch a EntityInstance
	 *
	 * @return EntityInstance Fetched EntityInstance
	 * @throws TwilioException When an HTTP error occurs.
	 */
	public function fetch() {
		$params = Values::of( array() );

		$payload = $this->version->fetch(
			'GET',
			$this->uri,
			$params
		);

		return new EntityInstance(
			$this->version,
			$payload,
			$this->solution['serviceSid'],
			$this->solution['identity']
		);
	}

	/**
	 * Magic getter to lazy load subresources
	 *
	 * @param string $name Subresource to return
	 *
	 * @return \Twilio\ListResource The requested subresource
	 * @throws \Twilio\Exceptions\TwilioException For unknown subresources
	 */
	public function __get( $name ) {
		if ( property_exists( $this, '_' . $name ) ) {
			$method = 'get' . ucfirst( $name );

			return $this->$method();
		}

		throw new TwilioException( 'Unknown subresource ' . $name );
	}

	/**
	 * Magic caller to get resource contexts
	 *
	 * @param string $name Resource to return
	 * @param array $arguments Context parameters
	 *
	 * @return \Twilio\InstanceContext The requested resource context
	 * @throws \Twilio\Exceptions\TwilioException For unknown resource
	 */
	public function __call( $name, $arguments ) {
		$property = $this->$name;
		if ( method_exists( $property, 'getContext' ) ) {
			return call_user_func_array( array( $property, 'getContext' ), $arguments );
		}

		throw new TwilioException( 'Resource does not have a context' );
	}

	/**
	 * Provide a friendly representation
	 *
	 * @return string Machine friendly representation
	 */
	public function __toString() {
		$context = array();
		foreach ( $this->solution as $key => $value ) {
			$context[] = "$key=$value";
		}

		return '[Twilio.Authy.V1.EntityContext ' . implode( ' ', $context ) . ']';
	}

	/**
	 * Access the factors
	 *
	 * @return \Twilio\Rest\Authy\V1\Service\Entity\FactorList
	 */
	protected function getFactors() {
		if ( ! $this->_factors ) {
			$this->_factors = new FactorList(
				$this->version,
				$this->solution['serviceSid'],
				$this->solution['identity']
			);
		}

		return $this->_factors;
	}
}