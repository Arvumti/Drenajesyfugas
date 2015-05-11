/* ==============================================
Abrir hacia abajo (drop Down) TOP bar
=============================================== */
$('.tn-language').hover(function () {
    $(this).find('.dropdown-menu').first().stop(true, true).fadeIn(400);
}, function () {
    $(this).find('.dropdown-menu').first().stop(true, true).fadeOut(400)
});

 /* ==============================================
Cargar sitio
=============================================== */

'use strict';
$(window).load(function() {
	
	/*$('a[href!=""] ').click(function (e){
			var href =  $(this).attr('href');
			if (href.indexOf('#') != false) {
				$(".cargar_item").fadeIn(500);
				$("#cargar_web").fadeIn(500);
			}
			
			
	});*/
	$(".cargar_item").delay(300).fadeOut("slow");
	$("#cargar_web").delay(1200).fadeOut("slow");
});

 /* ==============================================
 Revolution slider 
=============================================== */
var revapi;

		jQuery(document).ready(function() {
			   revapi = jQuery('.tp-banner').revolution(
				{
					delay:9000,
					startheight: 800,
					startwidth: 960,
					hideThumbs: 10,
					navigationType: "both",
					navigationArrows: "verticalcentered",
					navigationStyle: "round",
					touchenabled: "on",
					onHoverStop: "on",
					navOffsetHorizontal: 0,
					navOffsetVertical: 20,
					stopAtSlide: -1,
					stopAfterLoops: -1,
					shadow: 0,
					fullWidth:"on",
				});

		});	//ready
		
		
 /* ==============================================
Video  Responsivo=============================================== */
$(document).ready(function(){
	$(".responsive-video").fitVids();
  });

/* ==============================================
menu header sticky
=============================================== */
$(function () {
    // D
    var nav_container = $("header");
    var nav = $("div.stickmenu");
    var top_spacing = 0;
    var waypoint_offset = 50;
    nav_container.waypoint({
        handler: function (event, direction) {
            if (direction == 'down') {
                nav_container.css({
                    'height': nav.outerHeight()
                });
                nav.stop().addClass("sticky").css("top", -nav.outerHeight()).animate({
                    "top": top_spacing
                });
            } else {
                nav_container.css({
                    'height': 'auto'
                });
                nav.stop().removeClass("sticky").css("top", nav.outerHeight() + waypoint_offset).animate({
                    "top": ""
                });
            }
        },
        offset: function () {
            return -nav.outerHeight() - waypoint_offset;
        }
    });
});


/* ==============================================
HTML5 player
=============================================== */
$('audio,video').mediaelementplayer();
$('video').mediaelementplayer({
	success: function(media, node, player) {
		var events = ['loadstart', 'play','pause', 'ended'];
		
		for (var i=0, il=events.length; i<il; i++) {
			
			var eventName = events[i];
			
			media.addEventListener(events[i], function(e) {
				$('#output').append( $('<div>' + e.type + '</div>') );
			});
			
		}
	}
});

/* ==============================================
s- calidad
=============================================== */
jQuery(document).ready(function () {
    // Boton incrementará el valor
    $('.qtyplus').click(function (e) {
        // detener acting button
        e.preventDefault();
        // Obtener nombre del campo
        fieldName = $(this).attr('field');
        // Get el valor correspondiente
        var currentVal = parseInt($('input[name=' + fieldName + ']').val());
        // Si no está definido
        if (!isNaN(currentVal)) {
            // Incremento
            $('input[name=' + fieldName + ']').val(currentVal + 1);
        } else {
            // Otherwise put a 0 there
            $('input[name=' + fieldName + ']').val(0);
        }
    });
    // boton de decremento del valor till 0
    $(".qtyminus").click(function (e) {
        // detener acting como boton
        e.preventDefault();
        // obtener el nombre del campo
        fieldName = $(this).attr('field');
        // agarrar el valor
        var currentVal = parseInt($('input[name=' + fieldName + ']').val());
        // si esta indefinido o es mayor a 0
        if (!isNaN(currentVal) && currentVal > 0) {
            // decrementa uno
            $('input[name=' + fieldName + ']').val(currentVal - 1);
        } else {
            // de otra manera pone un cero ahi
            $('input[name=' + fieldName + ']').val(0);
        }
    });
});

/* ==============================================
Menu para moviles
=============================================== */

$(function () {
    $('#menu_moviles').dlmenu({
        animationClasses: {
            classin: 'dl-animate-in-2',
            classout: 'dl-animate-out-2'
        }
    });
});

/* ==============================================
Foto guapa
=============================================== */

jQuery(document).ready(function ($) {

    var lightboxArgs = {
        animation_speed: 'fast',
        overlay_gallery: true,
        autoplay_slideshow: true,
        slideshow: 5000,
        /* light_rounded / dark_rounded / light_square / dark_square / facebook */
        theme: 'pp_default',
        opacity: 0.8,
        show_title: false,
        social_tools: "",
        deeplinking: false,
        allow_resize: true,
        /* adaptar tamaño con viewport. true/false */
        counter_separator_label: '/',
        /* Separador de galeria counter */
        default_width: 940,
        default_height: 529
    };

    if (jQuery('a[href$=jpg], a[href$=JPG], a[href$=jpeg], a[href$=JPEG], a[href$=png], a[href$=gif], a[href$=bmp]:has(img), a[class^="prettyPhoto"]').length) {
        jQuery('a[href$=jpg], a[href$=JPG], a[href$=jpeg], a[href$=JPEG], a[href$=png], a[href$=gif], a[href$=bmp]:has(img), a[class^="prettyPhoto"]').prettyPhoto(lightboxArgs);
    }
    if (jQuery("a[rel^='prettyPhoto']").length) {
        jQuery("a[rel^='prettyPhoto']").prettyPhoto({
            animation_speed: 'normal',
            theme: 'pp_default',
            slideshow: 3000,
            autoplay_slideshow: true
        });
    }

});


/* ==============================================
Ir para arriba
=============================================== */

jQuery(document).ready(function ($) {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 500);
        return false;
    });
    $('.go-to-top').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 500);
        return false;
    });
});



/* ==============================================
 smooth escroll
=============================================== */	

$(function() {
		$('.scroll').bind('click', function(event) {
			var $anchor = $(this);
			var headerH = $('.contenedor_navegacion').outerHeight();
			$('html, body').stop().animate({
				scrollTop : $($anchor.attr('href')).offset().top - headerH + "px"
			}, 1200, 'easeInOutExpo');

			event.preventDefault();
		});
		
	});
/* ==============================================
Acordeon y toogles
=============================================== */
function toggleChevron(e) {
    $(e.target)
        .prev('.panel-heading')
        .find("i.indicator")
        .toggleClass('fa-angle-down fa-angle-up');
}
$('#accordion').on('hidden.bs.collapse', toggleChevron);
$('#accordion').on('shown.bs.collapse', toggleChevron);


(function ($) {
    $(document).ready(function () {
        $('#toggles .panel-title a').click(function (e) {
            var collapse_item = $('#toggles ' + this.hash)
            collapse_item.collapse('toggle')
        });
        $('#toggles').on('hidden.bs.collapse', toggleChevron);
        $('#toggles').on('shown.bs.collapse', toggleChevron);
    });
})(jQuery)


/* ==============================================
Barra del progreso
=============================================== */

$(window).ready(function (e) {
    $.each($('div.progress-bar'), function () {
        $(this).css('width', $(this).attr('aria-valuetransitiongoal') + '%');
    });
});

/* =========================================================
paralaxx
============================================================ */

$(document).ready(function () {
    $.stellar({
        horizontalScrolling: false,
        verticalOffset: 40
    });
});

/* ==============================================
owl carrusel=============================================== */
jQuery(document).ready(function (e) {
    var owl = e(".ca-list-items");
    owl.owlCarousel({
        itemsCustom: [
            [0, 1],
            [450, 2],
            [600, 2],
            [700, 3]
        ],
        navigation: false
    });
    e("#top-pro").owlCarousel({
        navigation: true
    });
});




$(document).ready(function () {
    $(".lista_servicio").owlCarousel({
        navigation: false,
		pagination: true,
		autoPlay: true,
        afterInit: function (elem) {
            var that = this
            that.owlControls.prependTo(elem)
        }
    });

});




$(document).ready(function () {

    var owl = $("#related-post");

    owl.owlCarousel({
        items: 3, //10 items cerca de 1000px 
        itemsDesktop: [1000, 3], //5 items entre 1000px y 901px
        itemsDesktopSmall: [900, 2], // entre 900px y 400px
		itemsTablet: [400, 1], //2 items entre 400 y 0
        pagination: false,
        itemsMobile: false // itemsMobile desactivado - inherit desde itemsTablet opcion
    });

    // Eventos de navegación
    $(".next").click(function () {
        owl.trigger('owl.next');
    })
    $(".prev").click(function () {
        owl.trigger('owl.prev');
    })
    $(".play").click(function () {
        owl.trigger('owl.play', 1000); //owl.play evento aceptar auto play
    })
    $(".stop").click(function () {
        owl.trigger('owl.stop');
    })

});



/* Galeriacarousel  */
$(document).ready(function () {

    $(".g-carousel").owlCarousel({
        pagination: false,
        navigation: true,
        navigationText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ],
        afterInit: function (elem) {
            var that = this
            that.owlControls.prependTo(elem)
        }

    });

});



/* =========================================================
Slide de testimonios
============================================================ */

    $(document).ready(function() {
     
    $("#testimonials-slide").owlCarousel({
    autoPlay : 3000,
    stopOnHover : true,
    navigation:true,
	navigationText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ],
    paginationSpeed : 1000,
    goToFirstSpeed : 2000,
    singleItem : true,
    autoHeight : true,
    transitionStyle:"backSlide"
    });
     
    });



/* =========================================================
Testimonio grupos
============================================================ */

    $(document).ready(function() {
     
    var sync1 = $("#testimonial");
    var sync2 = $("#client");
     
    sync2.owlCarousel({
    items : sync1.children().length ,
    itemsDesktop : [1199,8],
    itemsDesktopSmall : [979,6],
    itemsTablet : [768,4],
    itemsMobile : [350,3],
    pagination:false,
	autoHeight : true,
    responsiveRefreshRate : 100,
    afterInit : function(el){
    el.find(".owl-item").eq(0).addClass("synced");
    }
    });
	
	sync1.owlCarousel({
    singleItem : true,
    slideSpeed : 1000,
	autoPlay: true,
    navigation: false,
	 navigationText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ],
    pagination:false,
    afterAction : syncPosition,
    responsiveRefreshRate : 200,
    });
     
    function syncPosition(el){
    var current = this.currentItem;
    $("#client")
    .find(".owl-item")
    .removeClass("synced")
    .eq(current)
    .addClass("synced")
    if($("#client").data("owlCarousel") !== undefined){
    center(current)
    }
    }
     
    $("#client").on("click", ".owl-item", function(e){
    e.preventDefault();
    var number = $(this).data("owlItem");
    sync1.trigger("owl.goTo",number);
    });
     
    function center(number){
    var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
    var num = number;
    var found = false;
    for(var i in sync2visible){
    if(num === sync2visible[i]){
    var found = true;
    }
    }
     
    if(found===false){
    if(num>sync2visible[sync2visible.length-1]){
    sync2.trigger("owl.goTo", num - sync2visible.length+2)
    }else{
    if(num - 1 === -1){
    num = 0;
    }
    sync2.trigger("owl.goTo", num);
    }
    } else if(num === sync2visible[sync2visible.length-1]){
    sync2.trigger("owl.goTo", sync2visible[1])
    } else if(num === sync2visible[0]){
    sync2.trigger("owl.goTo", num-1)
    }
    }
     
    });




/* =========================================================
Galería sencilla
============================================================ */

$(document).ready(function () {
    var owl = $(".galeria_sencilla");
    owl.owlCarousel({
        navigation: true,
        navigationText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ],
        slideSpeed : 300,
		 singleItem:true,
		 pagination : false,
         autoPlay: true
    });

});


/* =========================================================
Galería sencilla con thumnbs
============================================================ */

    $(document).ready(function() {
     
    var sync1 = $("#preview");
    var sync2 = $("#thumb");
	 
    sync2.owlCarousel({
	 items : parseFloat(sync2.attr("count")) || sync1.children().length,
	 navigation: true,
    itemsDesktop : [1199,10],
    itemsDesktopSmall : [979,10],
    itemsTablet : [768,6],
    itemsMobile : [479,3],
    pagination:false,
	 navigationText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ],
    responsiveRefreshRate : 100,
    afterInit : function(el){
    el.find(".owl-item").eq(0).addClass("active");
    }
    });
     
    sync1.owlCarousel({
    singleItem : true,
    slideSpeed : 1000,
    navigation: true,
	navigationText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ],
    pagination:false,
    afterAction : syncPosition,
    responsiveRefreshRate : 200,
    });
     
    function syncPosition(el){
    var current = this.currentItem;
    $("#thumb")
    .find(".owl-item")
    .removeClass("active")
    .eq(current)
    .addClass("active")
    if($("#thumb").data("owlCarousel") !== undefined){
    center(current)
    }
    }
     
    $("#thumb").on("click", ".owl-item", function(e){
    e.preventDefault();
    var number = $(this).data("owlItem");
    sync1.trigger("owl.goTo",number);
    });
     
    function center(number){
    var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
    var num = number;
    var found = false;
    for(var i in sync2visible){
    if(num === sync2visible[i]){
    var found = true;
    }
    }
     
    if(found===false){
    if(num>sync2visible[sync2visible.length-1]){
    sync2.trigger("owl.goTo", num - sync2visible.length+2)
    }else{
    if(num - 1 === -1){
    num = 0;
    }
    sync2.trigger("owl.goTo", num);
    }
    } else if(num === sync2visible[sync2visible.length-1]){
    sync2.trigger("owl.goTo", sync2visible[1])
    } else if(num === sync2visible[0]){
    sync2.trigger("owl.goTo", num-1)
    }
    }
     
    });




/* =========================================================
Portafolio de servicios
============================================================ */

$(window).load(function() {
    // init Isotopo
    var $container = $('.port-wrap').isotope({
        itemSelector: '.port-item',
        layoutMode: 'fitRows',
    });

    // filtrar funciones
    var filterFns = {};

    // bind filtra un click
    $('#filters').on('click', 'a', function () {
        var filterValue = $(this).attr('data-filter');
        // usar filtro si hay valor
        filterValue = filterFns[filterValue] || filterValue;
        $container.isotope({
            filter: filterValue
        });
    });

    // cambios checando clase en liga
    $('.link-group').each(function (i, buttonGroup) {
        var $buttonGroup = $(buttonGroup);
        $buttonGroup.on('click', 'a', function () {
            $buttonGroup.find('.checked').removeClass('checked');
            $(this).addClass('checked');
        });
    });

});



/* =========== mansory  ==========*/

(function ($) {
    var $container = $('.man-portfolio'),
        colWidth = function () {
            var w = $container.width(),
                columnNum = 1,
                columnWidth = 0;
            if (w > 1200) {
                columnNum = 5;
            } else if (w > 900) {
                columnNum = 4;
            } else if (w > 600) {
                columnNum = 3;
            } else if (w > 300) {
                columnNum = 2;
            }
            columnWidth = Math.floor(w / columnNum);
            $container.find('.item').each(function () {
                var $item = $(this),
                    multiplier_w = $item.attr('class').match(/item-w(\d)/),
                    multiplier_h = $item.attr('class').match(/item-h(\d)/),
                    width = multiplier_w ? columnWidth * multiplier_w[1] - 4 : columnWidth - 4,
                    height = multiplier_h ? columnWidth * multiplier_h[1] * 0.5 - 4 : columnWidth * 0.5 - 4;
                $item.css({
                    width: width,
                    height: height
                });
            });
            return columnWidth;
        },
        isotope = function () {
            $container.isotope({
                resizable: false,
                itemSelector: '.item',
                masonry: {
                    columnWidth: colWidth(),
                    gutterWidth: 4
                }
            });
        };
	
	// filtrar funciones
    var filterFns = {};

    // bind filtro con un  click
    $('#filters').on('click', 'a', function () {
        var filterValue = $(this).attr('data-filter');
        // usar filterFn si hace match el valor
        filterValue = filterFns[filterValue] || filterValue;
        $container.isotope({
            filter: filterValue
        });
    });

    $('.link-group').each(function (i, buttonGroup) {
        var $buttonGroup = $(buttonGroup);
        $buttonGroup.on('click', 'a', function () {
            $buttonGroup.find('.checked').removeClass('checked');
            $(this).addClass('checked');
        });
    });
	
    isotope();
    $(window).smartresize(isotope);

	
	
}(jQuery));


/* =========================================================
blog del sitio con masonry============================================================ */



$(window).load(function() {
  
  var $container = $('.masonry-blog'),
      $body = $('body'),
      colW = 40,
      columns = null;
  
  $container.isotope({
    // resizing deshabilitado
    resizable: false,
    masonry: {
      columnWidth: colW
    }
  });
  
  $(window).smartresize(function(){
    // checar si las columnas han cambiado
    var currentColumns = Math.floor( ( $body.width() -10 ) / colW );
    if ( currentColumns !== columns ) {
      // poner un valor de nueva columna
      columns = currentColumns;
      // aplicar ancho segun
      $container.width( columns * colW )
        .isotope('reLayout');
    }
    
  }).smartresize(); // rehacer tamaño dependiendo el contenido
  
});



/* ==============================================
slider ranchero
=============================================== */
$(function () {
    $("#slider-range").slider({
        range: true,
        min: 0,
        max: 500,
        values: [75, 300],
        slide: function (event, ui) {
            $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
        }
    });
    $("#amount").val("$" + $("#slider-range").slider("values", 0) +
        " - $" + $("#slider-range").slider("values", 1));
});


/* ==============================================
Selección Fancy
=============================================== */
$('.cat-filter').fancySelect();

/* ==============================================
Categorias
=============================================== */

$('.list').on('click', function () {
    if (!$(this).hasClass('active')) {
        $('.all-products').addClass('list-style') /*.hide().fadeIn("fast")*/ ;
        $(this).addClass('active');
        $('.grid').removeClass('active');
    }

});

$('.grid').on('click', function () {
    if (!$(this).hasClass('active')) {
        $('.all-products').removeClass('list-style') /*.hide().fadeIn("fast")*/ ;
        $(this).addClass('active');
        $('.list').removeClass('active');
    }
});

/* =========================================================
Circulo del conteo
============================================================ */
$(document).ready(function () {
    $('#myCount1').circliful();
    $('#myCount2').circliful();
    $('#myCount3').circliful();
});

/* ==============================================
Pantalla completa
=============================================== */
onew = $(window).width();
oneh = $(window).height(); //- $('#top-nav').height();
$('.full-screen').height(oneh);


/* ==============================================
BACKGROUND VIDEO 
=============================================== */
jQuery(function(){
            jQuery(".player").mb_YTPlayer();
		});
		
		
/* ==============================================
COUNTER NUMBER
=============================================== */
jQuery(document).ready(function( $ ) {
        $('.counter').counterUp({
            delay: 5,
            time: 1500
        });
    });

/* ==============================================
CIRCLE COUNTDOWN 
=============================================== */
jQuery(document).ready(function( $ ) {
$(".countdown").TimeCircles({
    "animation": "smooth",
    "bg_width": 0.8,
    "fg_width": 0.016,
    "circle_bg_color": "rgba(200, 200, 200, .2)",
    "time": {
        "Days": {
            "text": "Days",
            "color": "#4796fe",
            "show": true
        },
        "Hours": {
            "text": "Hours",
            "color": "#96aafb",
            "show": true
        },
        "Minutes": {
            "text": "Minutes",
            "color": "#9b91fc",
            "show": true
        },
        "Seconds": {
            "text": "Seconds",
            "color": "#aa88fc",
            "show": true
        }
    }
});
});
/* Slide de texto*/
(function($){
  $.fn.list_ticker = function(options){
    
    var defaults = {
      speed:4000,
	  effect:'slide'
    };
    
    var options = $.extend(defaults, options);
    
    return this.each(function(){
      
      var obj = $(this);
      var list = obj.children();
      list.not(':first').hide();
      
      setInterval(function(){
        
        list = obj.children();
        list.not(':first').hide();
        
        var first_li = list.eq(0)
        var second_li = list.eq(1)
		
		if(options.effect == 'slide'){
			first_li.slideUp();
			second_li.slideDown(function(){
				first_li.remove().appendTo(obj);
			});
		} else if(options.effect == 'fade'){
			first_li.fadeOut(function(){
				second_li.fadeIn();
				first_li.remove().appendTo(obj);
			});
		}
      }, options.speed)
    });
  };
})(jQuery);



/* ==============================================
Scroll animado
=============================================== */
(function ($) {
    'use strict';
    window.scrollReveal = new scrollReveal({
        reset: true
    });

    // VER: http://stackoverflow.com/a/11381730/989439
    var isMobile = (function () {
        var check = false;
        (function (a) {
            if (/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    })();

    // la funcion regresa la propiedad CSS-transition 
    // para el TransitionEnd. e.j usage: $(el).on('transitionEnd', func(e));
    var transitionEnd = (function () {
        var t;
        var el = document.createElement('fakeelement');
        var transitions = {
            'transition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'MozTransition': 'transitionend',
            'WebkitTransition': 'webkitTransitionEnd'
        }

        for (t in transitions) {
            if (el.style[t] !== undefined) {
                return transitions[t];
            }
        }
    })();

    // Para verificar y por diversión revisamos el resultado con console log.
    // console.log("Es este el dispositivo móvil? " + isMobile + "\n" + "CSS transitions end-event name: " + transitionEnd);

})();
