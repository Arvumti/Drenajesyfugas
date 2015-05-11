window.app = {};
window.$topLoader = null;
function lShow() {
	var h1 = $(document).height();
	var h2 = $('body').height();
	var h3 = $('html').height();
	var  max = 0;
	
	if(h1 > h2 && h1 > h3)
		max = h1;
	else if (h2 > h3)
		max = h2;
	else
		max = h3;
	
	var top = $(document).scrollTop() + 250;
	
	$('.loading').css({height:max + 'px'}).removeClass('isHidden').children('#topLoader').css({top:top + 'px'});
}

function lHide() {
	$('.loading').addClass('isHidden');
}

$(document).on('ready', inicio);

function inicio () {
	$(document).foundation();
	
	app.xhr = null;

	$('.loading button.btnCancelarCarga').on('click', function() {
		if(app.xhr)
			app.xhr.abort();
	});
	$topLoader = $("#topLoader").percentageLoader({width: 256, height: 256, controllable : true, progress : 0, onProgressUpdate : function(val) {
		$topLoader.setValue(Math.round(val * 100.0));
	}});

	window.app = {
		views_base: viewsBase(),
		ut: new utilerias(),
		templates: new templates(),
		views: {},
		currView: {
			close: function() {}
		},
	};

	app.router = new router;
	
	Backbone.history.start({
		root: '/'
	});
}