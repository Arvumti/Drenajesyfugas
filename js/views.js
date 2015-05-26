var MoReporte = Backbone.Model.extend({}),
	MoCliente = Backbone.Model.extend({}),
	MoPost = Backbone.Model.extend({});

var CoClienteList = Backbone.Collection.extend({
	model: new MoCliente(),
}),
CoReporteList = Backbone.Collection.extend({
	model: new MoReporte(),
}),
CoPostList = Backbone.Collection.extend({
	model: new MoPost(),
});

var ViBase = Backbone.View.extend({
    events: {
        'click .btnAdd' : 'click_btnAdd',        
        'click .gvDatos tbody .fa.fa-repeat' : 'click_update',        
        'click .gvDatos tbody .fa.fa-minus' : 'click_delete',        
    },
    initialize: function() {
        this.listenTo(this.collection, 'add', this.addTr);
        this.listenTo(this.collection, 'change', this.updateTr);

        var pop = this.templates.modal_save({class_control:'modal-save'});
        this.$el.append(pop);
        this.$el.foundation();

        this.template = this.templates.tr;
        this.modalSave = this.$el.find('.modal-save');
        this.modalSave.find('.pop-body .form-data').html(this.templates.modal_save_body({}));

        this.gvDatos = this.$el.find('.gvDatos');
        this.gvDatosBody = this.gvDatos.children('tbody');

        this.config = {
            el: this.modalSave,
            bindings: this.save_bindings,
            model: this.collection.model,
            parentView: this,
            dal_opc: this.dal_opc || 0,
            linker: this.linker || [],
            mode: {
            	fm: this.modeFM || false,//Activa o desactiva el modo formdata
            },
        };
        
        if(!this.customSave)
            this.popSave = new ViPopSave(this.config);
    },
    /*-------------------------- Collections --------------------------*/
    addTr: function(model) {
        this.gvDatosBody.prepend(this.templates.tr({data:model.toJSON()}));
    },
    updateTr: function(model) {
        var newTR = this.templates.tr({data:model.toJSON()});

        var elem = this.gvDatosBody.find('tr[data-id="' + model.get(this.pk) + '"]');
        elem.html($(newTR).html());
    },
    /*-------------------------- Base --------------------------*/
    render: function() {
        this.collection.reset();
        var dfd = $.Deferred();

        this.$el.removeClass('isHidden');
        var that = this;
        app.ut.post({url:'DAL.php', done:done, type:'json', data:{options:{opcion:this.dal_opc, mod:10}}, get:true });

        function done(data) {
            console.log(data);
            for(var i=0; i<data.data.length; i++) {
                data.data[i][that.pk] = parseInt(data.data[i][that.pk], 10);
                var item = new that.baseModel(data.data[i]);
                that.collection.add(item, {silent:true});
            }

            that.gvDatosBody.html(that.templates.tr({data:data.data}));
            dfd.resolve();
        }

        return dfd;
    },
    close: function() {
        this.$el.addClass('isHidden');
    },
    /*-------------------------- Eventos --------------------------*/
    click_btnAdd: function() {
        this.popSave.render({crud:1});
    },
    click_update: function(e) {
        var id = $(e.currentTarget).parents('tr').data('id'),
            busqueda = {};

        busqueda[this.pk] = id;

        var model = this.collection.findWhere(busqueda);

        this.popSave.render({crud:2, json:model.toJSON(), cid:model.cid});
    },
    click_delete: function(e) {
        var that = this,
            elem = $(e.currentTarget).parents('tr'),
            id = elem.data('id'),
            busqueda = {};
        busqueda[this.pk] = id;
        var model = this.collection.findWhere(busqueda);

        app.ut.confirm({done:done});
        function done() {
            app.ut.post({url:'DAL.php', done:done, type:'json', data:{options:{opcion:that.dal_opc, crud:3, mod:1}, data:model.toJSON()}});

            function done (data) {
                if(data.data.err)
                    alert('Error: ' + data.data.err)
                else {
                    that.collection.remove(model);
                    elem.remove();
                }
            }
        }
    },
});
var ViPopSave = Backbone.View.extend({
    events: {
        'click .btnAceptar' : 'click_btnAceptar',
        'click .btnCancelar' : 'click_btnCancelar',
    },
    initialize: function(data) {
        this.parentView = data.parentView;
        this.dal_opc = data.dal_opc;
        this.mode = data.mode;
        
        this.crud = 1;
        this.mocid = null;

        this.form = this.$el.find('form');

        this.$el.find('.date').fdatepicker({format: 'yyyy-mm-dd'});
    },
    /*-------------------------- Base --------------------------*/
    render: function(options) {
        this.crud = options.crud || 1;

        this.form[0].reset();
        this.mocid = null;
        
        if(this.crud == 2) {
            this.mocid = options.cid;
            this.model.set(options.json || {});
            this.setData();
        }

        this.$el.foundation('reveal', 'open');
    },
    close: function() {
        this.$el.foundation('reveal', 'close');
    },
	getData: function() {
		var json = app.views_base.base.prototype.getData(this.$el);
		json[this.parentView.pk] = this.model.get(this.parentView.pk);

		return json;
	},
    setData: function() {
    	app.views_base.base.prototype.setData(this.model.toJSON(), this.$el)
    },
    updateModel: function(model, updateData) {
		if(updateData) {
    		for (var index in updateData) {
    			var json = {};
    			json[index] = updateData[index];
    			model.set(json);
	        }
    	}
    },
    /*-------------------------- Eventos --------------------------*/
    click_btnAceptar: function() {
        var that = this,
            json = this.getData();

        var newModel = new this.parentView.baseModel(json),
        	jdata = {opcion:this.dal_opc, crud:this.crud, mod:1};

        if(this.mode.fm) {
			lShow();
			var formData = new FormData(this.form[0]);
			formData.append("options", JSON.stringify(jdata));
			formData.append("data", JSON.stringify(json));
			formData.append("has_image", true);

		
			app.xhr = $.ajax({
				url: 'DAL.php',  //Server script to process data
				type: 'POST',
				success: done,
				error: function(xhr){debugger},
				xhr: function() {  // Custom XMLHttpRequest
					var myXhr = $.ajaxSettings.xhr();
					if(myXhr.upload){ // Check if upload property exists
						myXhr.upload.addEventListener('progress', progressHandlingFunction, false); // For handling the progress of the upload
					}
					return myXhr;
				},
				data: formData, //Options to tell jQuery not to process data or worry about content-type.
				dataType: "json",
				cache: false,
				contentType: false,
				processData: false
			});

            app.xhr.always(function() {
                lHide();
            });

            function progressHandlingFunction(e){
                console.log(e);
                if(e.lengthComputable){
                    console.log({value:e.loaded, max:e.total});
                    
                    $topLoader.setProgress(0);
                    $topLoader.setValue('0kb');
                    var kb = e.loaded;
                    var totalKb = e.total + 100;
                    
                    $topLoader.setProgress(kb / totalKb);
                    $topLoader.setValue(kb.toString() + 'kb');
                }
            }
	    }
	    else
        	app.ut.post({url:'DAL.php', done:done, type:'json', data:{options:jdata, data:json}});

        function done (data) {
            if(data.data.err) {
                alert('Error: ' + data.data.err)
            }
            else {

                if(that.crud == 1) {
                	that.updateModel(newModel, data.update);

                    var newId = {};
                    newId[that.parentView.pk] = parseInt(data.data.idkey, 0);

                    newModel.set(newId);
                    that.parentView.collection.add(newModel);
                }
                else if(that.crud == 2) {
                	that.updateModel(that.model, data.update);
                	
                    var model = that.parentView.collection.get(that.mocid);
                    model.set(newModel.toJSON());
                }

                that.close();
            }
        }
    },
    click_btnCancelar: function() {
        this.close();
    },
});

var ViCliente = ViBase.extend({
    el:'#pnl_clientes',
    initialize: function() {
        var that = this;
        this.dal_opc = 2;
        this.baseModel = MoCliente;
        this.pk = 'idCliente';

        this.collection = new CoClienteList();
        this.templates = {
            modal_save: app.templates.modal_base,
            modal_save_body: app.templates.body_save_cliente,
            tr: app.templates.tr_cliente,
        };

        ViBase.prototype.initialize.call(this);
    },
    /*-------------------------- Collections --------------------------*/
    /*-------------------------- Base --------------------------*/
    /*-------------------------- Eventos --------------------------*/
});

var ViReporte = ViBase.extend({
    el:'#pnl_reportes',
    initialize: function() {
        var that = this;
        this.dal_opc = 1;
        this.baseModel = MoReporte;
        this.pk = 'idReporte';

        this.collection = new CoReporteList();
        this.templates = {
            modal_save: app.templates.modal_base,
            modal_save_body: app.templates.body_save_reporte,
            tr: app.templates.tr_reporte,
        };
        this.customSave = true;

        ViBase.prototype.initialize.call(this);
        
        this.popSave = new ViPopReporte(this.config);

        this.events['click .gvDatos .fa-camera-retro'] = 'click_galeria';
        this.popGaleria = new ViPopGaleria();
    },
    /*-------------------------- Collections --------------------------*/
    /*-------------------------- Base --------------------------*/
    /*-------------------------- Eventos --------------------------*/
    click_galeria: function(e) {
        var id = $(e.currentTarget).parents('tr').data('id');
        this.popGaleria.render(id);
    },
});
var ViPopReporte = ViPopSave.extend({
	initialize: function(data) {
		this.cboClientes = this.$el.find('[data-field="idCliente"]');
		this.txaEmail = this.$el.find('[data-field="email"]');

		ViPopSave.prototype.initialize.call(this, data);
        this.events['change [data-field="idCliente"]'] = 'change_cliente';
	},
	/*--------------------- Base ---------------------*/
	render: function(options) {
		var that = this;
		app.ut.request({url:'DAL.php', data:{options:{opcion:2, mod:10}}, done:done});
		function done(data) {
            if(data.data.length == 0)
                app.ut.message({text:'Tiene que dar de alta por lo menos un cliente.'});
            else {
    			var opts = app.templates.opt_clientes({clientes:data.data});

    			if(that.crud == 1) {
    				that.txaEmail.text(data.data[0].email);
    			}
    			that.cboClientes.html(opts);
    			ViPopSave.prototype.render.call(that, options);
            }
		}
	},
	getData: function() {
		var json = ViPopSave.prototype.getData.call(this);
		json.cliente = this.cboClientes.find('option:selected').text();

		return json;
	},
	/*--------------------- Eventos ---------------------*/
	change_cliente: function(e) {
		this.txaEmail.text($(e.currentTarget).find('option:selected').data('email'));
	},
});
var ViPopGaleria = Backbone.View.extend({
    el: '.popGaleria',
    events: {
        'click .btnCancelar' : 'click_btnCancelar',
        'click .btnUpload' : 'click_btnUpload',
        'click .gvData .fa-minus' : 'click_delete',
        'click .accordion-navigation .fa-times' : 'click_delete_categoria',
    },
    initialize: function() {
        this.dal_opc = 5;
        this.dal_opc_up = 3;
        this.idReporte = null;

        this.form = this.$el.find('.multi-image');
        this.files = this.$el.find('input[name="files[]"]');
        this.gvData = this.$el.find('.gvData');

        this.tempalteTR = app.templates.tr_reporte_galeria;

        this.accorGaleria = this.$el.find('.accor-galeria');
        this.acc_galeria = app.templates.acc_galeria;

        this.events['click .btnAddCategoria'] = 'add_categoria';
        this.events['click .btnAddSubCategoria'] = 'add_subcategoria';
        this.events['click .btnComentarCategoria'] = 'add_comentar';
        this.events['click .accordion-navigation > a'] = 'click_accordeon';
        this.events['change .file-galeria'] = 'change_images';
    },
    /*-------------------------- Base --------------------------*/
    render: function(id) {
        this.idReporte = id || 0;
        this.clear();
        
        this.loadImages(true);
    },
    clear: function() {
        //this.form[0].reset();
    },
    close: function() {
        this.$el.foundation('reveal', 'close');
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
        this.accorGaleria.html('');
        app.ut.post({url:'DAL.php', done:done, type:'json', data:{options:{opcion:this.dal_opc, mod:10}, data:{idReporte:this.idReporte}}});

        function done(data) {
            if(init)
                that.$el.foundation('reveal', 'open');

            var json = data.data;
            var grCategorias = _.groupBy(json, 'idCategoria');
            var arrCategorias = Array();
            for(var key in grCategorias) {
                var currCategoria = {
                    idCategoria: grCategorias[key][0].idCategoria,
                    nombre: grCategorias[key][0].nombre,
                    tipo: grCategorias[key][0].tipo,
                    idPadre: grCategorias[key][0].idPadre,
                    comentarios: grCategorias[key][0].comentarios,
                    imagenes: grCategorias[key],
                };

                arrCategorias.push(currCategoria);
            }

            var jIni = _.where(arrCategorias, {tipo:'1'});
            if(jIni.length == 0)
                return;

            for (var i = 0; i < jIni.length; i++) {
                var accInit = $(that.acc_galeria(jIni[i]));

                var next = 0;
                var idCategoria = jIni[i].idCategoria;
                that.recursiveRender(accInit, idCategoria, arrCategorias);
                that.accorGaleria.append(accInit);
            }            

            that.$el.foundation();
            /*
            for (var i = 0; i < json.length; i++) {
                var acc = that.acc_galeria(json[i]);
            };

            var trs = that.tempalteTR(data);
            that.gvData.find('tbody').html(trs);*/
        }
    },
    saveCategorias: function(json, elem) {
        var that = this;
        var acc = this.accorGaleria.find('.accordion-navigation');
        if(acc.length == 0)
            json.tipo = 1; 

        app.ut.post({url:'DAL.php', done:done, type:'json', data:{options:{opcion:this.dal_opc, crud:1, mod:1}, data:json}});
        //done({data:{data:{idkey:1}}});
        function done(data) {
            json.idCategoria = data.data.idkey;
            var acc = that.acc_galeria(json);
            elem.append(acc);
            that.$el.foundation();
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
    /*-------------------------- Eventos --------------------------*/
    click_delete_categoria: function(e) {
        e.preventDefault();
        e.stopPropagation();

        var that = this,
            elem = $(e.currentTarget),
            idCategoria = elem.data('idcategoria');
        app.ut.post({url:'DAL.php', done:done, type:'json', data:{options:{opcion:that.dal_opc, crud:3, mod:1}, data:{idCategoria:idCategoria}}});

        function done (data) {
            if(data.data.err)
                alert('Error: ' + data.data.err)
            else {
                $('[href="#cat' + idCategoria + '"], #cat' + idCategoria).remove();
            }
        }
    },
    change_images: function(e) {
        var elem = $(e.currentTarget);
        var form = elem.parent('form');

        var that = this;
        var idCategoria = elem.data('idcategoria');
        var jdata = {opcion:this.dal_opc_up, crud:1, mod:1};
        
        lShow();
        var formData = new FormData(form[0]);
        formData.append("data", JSON.stringify({idCategoria:idCategoria}));
        formData.append("options", JSON.stringify(jdata));
        formData.append("has_image", true);
    
        app.xhr = $.ajax({
            url: 'DAL.php',  //Server script to process data
            type: 'POST',
            success: done,
            error: function(xhr){debugger},
            xhr: function() {  // Custom XMLHttpRequest
                var myXhr = $.ajaxSettings.xhr();
                if(myXhr.upload){ // Check if upload property exists
                    myXhr.upload.addEventListener('progress', progressHandlingFunction, false); // For handling the progress of the upload
                }
                return myXhr;
            },
            data: formData, //Options to tell jQuery not to process data or worry about content-type.
            dataType: "json",
            cache: false,
            contentType: false,
            processData: false
        });

        app.xhr.always(function() {
            lHide();
        });

        function progressHandlingFunction(e){
            console.log(e);
            if(e.lengthComputable){
                console.log({value:e.loaded, max:e.total});
                
                $topLoader.setProgress(0);
                $topLoader.setValue('0kb');
                var kb = e.loaded;
                var totalKb = e.total + 100;
                
                $topLoader.setProgress(kb / totalKb);
                $topLoader.setValue(kb.toString() + 'kb');
            }
        }

        function done (data) {
            if(data.errors && data.errors.length > 0){
                var errores = data.errors.join(', ');
                alert(errores);
            }
            
            if(data.data || data.data.res == 1) {
                var trs = app.templates.tr_reporte_galeria({data:data.images});
                form.parents('table').find('tbody').html(trs);
            }
            else
                alert('error al cargar las imagenes' + data.data.err);
            
            form[0].reset();
        }
    },
    add_comentar: function(e) {
        debugger
        var that = this;

        var elem = $(e.currentTarget);
        var id = elem.data('idcategoria');
        var parent = elem.parents('#cat' + id);
        var txa = parent.find('.txa-' + id);

        var json = {
            comentarios: txa.val(),
            idCategoria: id,
        };

        app.ut.post({url:'DAL.php', done:done, type:'json', data:{options:{opcion:this.dal_opc, crud:2, mod:1}, data:json}});

        function done(data) {
            alert('Comentario guardado');
        }
    },
    add_categoria: function(e) {
        var nombre = $(e.currentTarget).closest('.row').find('input').val();
        var json = {
            idCategoria:0,
            nombre:nombre,
            tipo:1,
            idReporte:this.idReporte,
            idPadre:0,
        };          

        this.saveCategorias(json, this.accorGaleria);
    },
    add_subcategoria: function(e) {
        var nombre = $(e.currentTarget).closest('.row').find('input:text').val();
        var content = $(e.currentTarget).closest('.content');
        var subGaleria = content.children('.row').children('.columns').children('.accor-subgaleria');

        var json = {
            idCategoria:0,
            nombre:nombre,
            tipo:0,
            idReporte:this.idReporte,
            idPadre:content.data('idcategoria'),
        };           

        this.saveCategorias(json, subGaleria);
    },
    click_delete: function(e) {
        var tr = $(e.currentTarget).parents('tr');
        var idImagen = tr.data('id');
        var that = this;

        app.ut.post({url:'DAL.php', done:done, type:'json', data:{options:{opcion:this.dal_opc, crud:3, mod:1}, data:{idReporteImagen:idImagen}}});

        function done (data) {
            if(data.data.err)
                alert('Error: ' + data.data.err);
            else
                tr.remove();
        }
    },
    click_btnCancelar: function() {
        this.close();
    },
    click_btnUpload: function() {
    	var that = this;
        var jdata = {opcion:this.dal_opc_up, crud:1, mod:1};
        
		lShow();
		var formData = new FormData(this.form[0]);
        formData.append("data", JSON.stringify({idReporte:this.idReporte}));
		formData.append("options", JSON.stringify(jdata));
		formData.append("has_image", true);
	
		app.xhr = $.ajax({
			url: 'DAL.php',  //Server script to process data
			type: 'POST',
			success: done,
			error: function(xhr){debugger},
			xhr: function() {  // Custom XMLHttpRequest
				var myXhr = $.ajaxSettings.xhr();
				if(myXhr.upload){ // Check if upload property exists
					myXhr.upload.addEventListener('progress', progressHandlingFunction, false); // For handling the progress of the upload
				}
				return myXhr;
			},
			data: formData, //Options to tell jQuery not to process data or worry about content-type.
			dataType: "json",
			cache: false,
			contentType: false,
			processData: false
		});

		app.xhr.always(function() {
			lHide();
		});

		function progressHandlingFunction(e){
			console.log(e);
			if(e.lengthComputable){
				console.log({value:e.loaded, max:e.total});
				
				$topLoader.setProgress(0);
				$topLoader.setValue('0kb');
				var kb = e.loaded;
				var totalKb = e.total + 100;
				
				$topLoader.setProgress(kb / totalKb);
				$topLoader.setValue(kb.toString() + 'kb');
			}
		}

        function done (data) {
            if(data.errors && data.errors.length > 0){
                var errores = data.errors.join(', ');
                alert(errores);
            }
            
            if(data.data || data.data.res == 1) {
                that.loadImages(false);
            }
            else
                alert('error al cargar las imagenes' + data.data.err);
            
            that.form[0].reset();
        }
    },
});

var ViPost = ViBase.extend({
    el:'#pnl_posts',
    initialize: function() {
        var that = this;
        this.dal_opc = 4;
        this.baseModel = MoPost;
        this.pk = 'idPost';

        this.collection = new CoPostList();
        this.templates = {
            modal_save: app.templates.modal_base,
            modal_save_body: app.templates.body_save_post,
            tr: app.templates.tr_post,
        };

        ViBase.prototype.initialize.call(this);
    },
    /*-------------------------- Collections --------------------------*/
    /*-------------------------- Base --------------------------*/
    /*-------------------------- Eventos --------------------------*/
});

var router = Backbone.Router.extend({
    routes: {
        '' : 'index',
        'clientes' : 'clientes',
        'reportes' : 'reportes',
        'posts' : 'posts',
    },
    index: function() {
        console.log('---- INDEX ----');
        app.currView.close();
        $('#pnl_img_logo').removeClass('isHidden');
    },
    clientes: function() {
        $('#pnl_img_logo').addClass('isHidden');
        app.currView.close();
        app.currView = app.views.clientes || (app.views.clientes = new ViCliente());
        app.currView.render();
    },
    reportes: function() {
        $('#pnl_img_logo').addClass('isHidden');
        app.currView.close();
        app.currView = app.views.reportes || (app.views.reportes = new ViReporte());
        app.currView.render();
    },
    posts: function() {
        $('#pnl_img_logo').addClass('isHidden');
        app.currView.close();
        app.currView = app.views.posts || (app.views.posts = new ViPost());
        app.currView.render();
    },
});