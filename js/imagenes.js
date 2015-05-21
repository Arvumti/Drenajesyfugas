var ViPopGaleria = Backbone.View.extend({
    el: 'body',
    events: {
        'click .accordion-navigation > a' : 'click_accordeon',
    },
    initialize: function() {
        this.dal_opc = 5;
        this.idReporte = window.location.href.split('&r=')[1];

        this.accorGaleria = this.$el.find('.accor-galeria');
        this.acc_galeria = Handlebars.compile($('.tmp_acc_galeria').html());
    },
    /*-------------------------- Base --------------------------*/
    render: function(id) {
        this.loadImages(true);
    },
    recursiveRender: function(elemBase, idPadre, data) {
        var categorias = _.where(data, {idPadre:idPadre.toString()});
        if(!categorias || categorias.length == 0)
            return;

        for (var i = 0; i < categorias.length; i++) {
            var jCategoria = categorias[i];

            var htmlCats = this.acc_galeria(jCategoria);
            var sub = elemBase.find('#cat' + jCategoria.idPadre + ' > .pnl-subcategoria').children('.columns').children('.accor-subgaleria');
            sub.append(htmlCats);

            this.recursiveRender(elemBase, jCategoria.idCategoria, data);
        };
    },
    loadImages: function(init) {
        var that = this;
        app.ut.post({url:'DAL.php', done:done, type:'json', data:{options:{opcion:this.dal_opc, mod:10}, data:{idReporte:this.idReporte}}});

        function done(data) {
            var json = data.data;
            var grCategorias = _.groupBy(json, 'idCategoria');
            var arrCategorias = Array();
            for(var key in grCategorias) {
                var currCategoria = {
                    idCategoria: grCategorias[key][0].idCategoria,
                    nombre: grCategorias[key][0].nombre,
                    tipo: grCategorias[key][0].tipo,
                    idPadre: grCategorias[key][0].idPadre,
                    imagenes: grCategorias[key],
                };

                arrCategorias.push(currCategoria);
            }

            debugger
            var jIni = _.where(arrCategorias, {tipo:'1'});
            if(jIni.length == 0) {
                $('.gals-container').addClass('hidden');
                return;
            }

            for (var i = 0; i < jIni.length; i++) {
                var accInit = $(that.acc_galeria(jIni[i]));

                var next = 0;
                var idCategoria = jIni[i].idCategoria;
                that.recursiveRender(accInit, idCategoria, arrCategorias);
                that.accorGaleria.append(accInit);
            } 
            that.$el.foundation();
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
            /*
            for (var i = 0; i < json.length; i++) {
                var acc = that.acc_galeria(json[i]);
            };

            var trs = that.tempalteTR(data);
            that.gvData.find('tbody').html(trs);*/
        }
    },
    /*-------------------------- Foundation --------------------------*/
    click_accordeon: function(e) {
        e.preventDefault();
        var currContent = $(e.currentTarget).next();
        var hasClass = currContent.hasClass('active');

        $(e.currentTarget).closest('.accordion').find('.content').removeClass('active');
        if(!hasClass)
            $(e.currentTarget).next().addClass('active');
    },
});

window.app = {};
$(document).on('ready', inicio);

function inicio () {
    window.app = Object();
    window.app.ut = new utilerias();
    window.app.view = new ViPopGaleria();
    window.app.view.render();

    $(document).foundation();
}