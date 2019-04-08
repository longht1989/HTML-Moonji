/* ====================================
   Onload functions
   ==================================== */
$(function() {
    // Start home slideshow
    var cycle = $('.site-index .slideshow').cycle({
        fx: 'scrollHorz',
        speed: 800,
        timeout: 20000,
        slides: '> .slide',
        allowWrap: true,
        manualTrump: false,
        autoHeight: false,
        slideActiveClass: 'active',
        next: '> .next',
        prev: '> .prev'
    });
    var videoHome = $('.home #slideVideo0');
    // load image slide
    cycle.on('cycle-before', function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
        var slide = jQuery(incomingSlideEl);
        var newSrc = slide.data('src');
        // $('.slide.active .slide-stage').css('background-image', 'url(' + newSrc + ')')
        if ($('.slide').hasClass('slideVideo')) {
            videoHome.get(0).play();
            console.log(videoHome.get(0));
        } else videoHome.get(0).pause();
    });
    // Mouse control
    $('body.home').scrollsteps({
        up: function() {
            cycle.cycle('prev');
            cycle.cycle('pause');
        },
        down: function() {
            cycle.cycle('next');
            cycle.cycle('pause');
        }
    });
    $('body.about').scrollsteps({
        up: function() {
            cycle.cycle('prev');
            cycle.cycle('pause');
        },
        down: function() {
            cycle.cycle('next');
            cycle.cycle('pause');
        }
    });
    // affix for blog page
    $('.blog #site-header').affix({
        offset: {
            top: $('.blog #site-header').outerHeight(),
        }
    });
    // lightbox
    if ($('body').hasClass('home')) {
        $('.slideshow').lightGallery({
            selector: '.slide .btn',
            videojs: true
        });
    }
    if ($('body').hasClass('work')) {
        $('.work-wrap').lightGallery({
            selector: '.work-item',
            videojs: true
        });
        $('.work-item').mouseenter(function() {
            var videoChild = $(this).find('.work__video video');
            videoChild.get(0).play();
        });
        $('.work-item').mouseleave(function() {
            var videoChild = $(this).find('.work__video video');
            videoChild.get(0).pause()
        })
        // work page
        var $lg = $('.work-wrap');

        $lg.lightGallery();
        $lg.on('onAfterSlide.lg', function(event, prevIndex, index, fromTouch, fromThumb) {

            var galleryLength = $('.work-item');
            var orderNext, orderPrev;
            if (index == galleryLength.length - 1) {
                orderNext = 0;
            } else {
                orderNext = index + 1;
            }
            if (index == 0) {
                orderPrev = galleryLength.length - 1;
            } else {
                orderPrev = index - 1;
            }

            setNext(orderNext);
            setPrev(orderPrev);

            // hover next
            $('.lg-next').mouseenter(function() {
                $(this).addClass('hoverNext');
                $('.lg-video-cont').addClass('hoverNext');
            });

            $('.lg-next').mouseleave(function() {
                $(this).removeClass('hoverNext');;
                $('.lg-video-cont').removeClass('hoverNext');
            })
            // hover prev
            $('.lg-prev').mouseenter(function() {
                $(this).addClass('hoverPrev');
                $('.lg-video-cont').addClass('hoverPrev');
            });

            $('.lg-prev').mouseleave(function() {
                $(this).removeClass('hoverPrev');;
                $('.lg-video-cont').removeClass('hoverPrev');
            })

        });

        function setNext(dataOrder) {
            var nextItem = $('[data-order="' + dataOrder + '"');
            var nextThumb = nextItem.find('.work__thumb').wrap("<div></div>").parent().html();
            var nextTitle = nextItem.find('.work__title').wrap("<div></div>").parent().html();
            $('.lg-next').html('<div class="lg-direction"><p>Next</p>' + nextThumb + nextTitle + '</div>');
        };

        function setPrev(dataOrder) {
            var prevItem = $('[data-order="' + dataOrder + '"');
            var prevThumb = prevItem.find('.work__thumb').wrap("<div></div>").parent().html();
            var prevTitle = prevItem.find('.work__title').wrap("<div></div>").parent().html();
            $('.lg-prev').html('<div class="lg-direction"><p>Prev</p>' + prevThumb + prevTitle + '</div>');
        };
    }
});