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
    // load image slide
    cycle.on('cycle-before', function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
        var slide = jQuery(incomingSlideEl);
        var newSrc = slide.data('src');

        $('.slide-stage').css('background-image', 'url(' + newSrc + ')')
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
    if ($('body').hasClass('work')) {
        $('.work-wrap').lightGallery({
            selector: '.work-item',
            videojs: true
        });
    }
});