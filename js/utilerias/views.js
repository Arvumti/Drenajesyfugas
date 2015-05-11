window.app = window.app || {
    currView: {
        close: function() {}
    },
    views: {},
};

function readURL(input, image) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            image.attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

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
        app.ut.post({url:'DAL.php', done:done, type:'json', data:{info:{opcion:this.dal_opc}, mod:1}, get:true });

        function done(data) {
            console.log(data);
            for(var i=0; i<data.data.length; i++) {
                data.data[i][that.pk] = parseInt(data.data[i][that.pk], 10);
                var item = new MoHome(data.data[i]);
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

        app.ut.post({url:'DAL.php', done:done, type:'json', data:{info:{opcion:this.dal_opc, curd:3, data:model.toJSON()}, mod:2} });

        function done (data) {
            if(data.data.err)
                alert('Error: ' + data.data.err)
            else {
                that.collection.remove(model);
                elem.remove();
            }
        }
    },
});
var ViPopSave = Backbone.Epoxy.View.extend({
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

        this.linked(data);
    },
    /*-------------------------- Base --------------------------*/
    linked: function(data) {
        this.isLink = data.linker.length > 0;
        this.elems = {};
        this.elemsUp = {};
        var that = this;
        for (var i = 0; i < data.linker.length; i++) {
            var field = data.linker[i];
            this.elems[field] = this.form.find('[data-field="' + field + '"]');
            this.elemsUp[field] = this.form.find('input[name="' + field + '"]');

            this.elemsUp[field].on('change', function(){
                readURL(this, that.elems[this.name]);
            });
        }
    },
    clear: function () {
    	if(this.isLink) {
    		for (var index in this.elems) {
    			var elem = this.elems[index];

    			switch(elem.data('type')) {
    				case 'img':
    					elem.attr('src', '');
    					break;
    			}
	        }
    	}
    },
    setData: function() {
    	if(this.isLink) {
    		for (var index in this.elems) {
    			var elem = this.elems[index];

    			switch(elem.data('type')) {
    				case 'img':
    					elem.attr('src', this.model.get(index));
    					break;
    			}
	        }
    	}
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
    render: function(options) {
        this.crud = options.crud || 1;

        this.clear();
        this.form[0].reset();
        this.mocid = null;
        this.model.set(this.model.defaults);
        
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
    /*-------------------------- Eventos --------------------------*/
    click_btnAceptar: function() {
        var that = this,
            json = this.model.toJSON();

        var newModel = new this.parentView.baseModel(json),
        	jdata = {info:{opcion:this.dal_opc, curd:this.crud, data:json}, mod:2};

        if(this.mode.fm) {
            lShow();
	        var formData = new FormData(this.form[0]);
	        formData.append("fdata", JSON.stringify(json));
	        formData.append("data", JSON.stringify(jdata));
        
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
	            data: formData,
	            //Options to tell jQuery not to process data or worry about content-type.
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
        	app.ut.post({url:'DAL.php', done:done, type:'json', data:jdata});

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
                    model.set(that.model.toJSON());
                }

                that.close();
            }
        }
    },
    click_btnCancelar: function() {
        this.close();
    },
});


var ViHome = ViBase.extend({
    el:'#pnl_home',
    initialize: function() {
        var that = this;
        this.dal_opc = 1;
        this.baseModel = MoHome;
        this.pk = 'idElemento';

        this.templates = {
            modal_save: app.templates.modal_base,
            modal_save_body: app.templates.body_save_home,
            tr: app.templates.tr_home,
        };

        this.collection = new CoHomeList();
        this.save_bindings = {
            'input[data-field="nombre"]': 'value:nombre',
            'input[data-field="link"]': 'value:link',
            'textarea[data-field="info"]': 'value:info',
            'input[data-field="activo"]': 'checked:activo',
        };
        this.linker = ['dirImg'];
        this.modeFM = true;

        ViBase.prototype.initialize.call(this);
    },
    /*-------------------------- Collections --------------------------*/
    /*-------------------------- Base --------------------------*/
    /*-------------------------- Eventos --------------------------*/
});
var ViDirectorio = ViBase.extend({
    el:'#pnl_directorio',
    initialize: function() {
        this.dal_opc = 2;
        this.baseModel = MoDirectorio;
        this.pk = 'idDir';

        this.templates = {
            modal_save: app.templates.modal_base,
            modal_save_body: app.templates.body_save_directorio,
            tr: app.templates.tr_directorio,
        };

        this.collection = new CoDirectorioList();
        this.save_bindings = {
            'input[data-field="nombreDir"]': 'value:nombreDir',
            'input[data-field="puestoDir"]': 'value:puestoDir',
            'input[data-field="mailDir"]': 'value:mailDir',
            'input[data-field="telDir"]': 'value:telDir',
        };

        ViBase.prototype.initialize.call(this);
    },
    /*-------------------------- Collections --------------------------*/
    /*-------------------------- Base --------------------------*/
    /*-------------------------- Eventos --------------------------*/
});
var ViEvento = ViBase.extend({
    el:'#pnl_evento',
    initialize: function() {
        this.dal_opc = 3;
        this.baseModel = MoEvento;
        this.pk = 'idEvento';

        this.templates = {
            modal_save: app.templates.modal_base,
            modal_save_body: app.templates.body_save_evento,
            tr: app.templates.tr_evento,
        };

        this.collection = new CoEventoList();
        this.save_bindings = {
            'input[data-field="titulo_evento"]': 'value:titulo_evento',
            'input[data-field="lugar"]': 'value:lugar',
            'input[data-field="fecha"]': 'value:fecha',
            'input[data-field="hora"]': 'value:hora',
            'textarea[data-field="descripcion_evento"]': 'value:descripcion_evento',
            'input[data-field="activo"]': 'checked:activo',
        };
        this.linker = ['img_evento'];
        this.modeFM = true;
        this.customSave = true;

        ViBase.prototype.initialize.call(this);
        
        this.events['click .gvDatos .fa-camera-retro'] = 'click_galeria';
        
        this.popSave = new ViEventoSave(this.config);
    },
    /*-------------------------- Collections --------------------------*/
    /*-------------------------- Base --------------------------*/
    /*-------------------------- Eventos --------------------------*/
});
var ViEventoSave = ViPopSave.extend({
    initialize: function (options) {
        ViPopSave.prototype.initialize.call(this, options);
        
        this.cboTemplate = Handlebars.compile('{{#data}}<option value="{{idGal}}">{{nombreGal}}</option>{{/data}}'),
        this.cboGaleria = this.$el.find('select[data-field="idGaleria"]');
    },
    render: function(options) {
        var that = this;
        app.ut.post({url:'DAL.php', done:done, type:'json', data:{info:{opcion:4}, mod:1}, get:true });

        function done(data) {
            debugger
            ViPopSave.prototype.render.call(that, options);
            
            console.log(data);
            var optionsHTML = that.cboTemplate(data);            
            that.cboGaleria.html(optionsHTML);
            
            if(options.crud == 1 && data.data.length)
                that.model.set({idGaleria:data.data[0].idGal});
            else
                that.cboGaleria.find('option[value="'+that.model.get('idGaleria')+'"]').attr('selected', 'selected');
        }
    },
});
var ViGaleria = ViBase.extend({
    el:'#pnl_galeria',
    initialize: function() {
        this.dal_opc = 4;
        this.baseModel = MoGaleria;
        this.pk = 'idGal';

        this.templates = {
            modal_save: app.templates.modal_base,
            modal_save_body: app.templates.body_save_galeria,
            tr: app.templates.tr_galeria,
        };

        this.collection = new CoGaleriaList();
        this.save_bindings = {
            'input[data-field="nombreGal"]': 'value:nombreGal',
            'select[data-field="categoriaGal"]': 'value:categoriaGal',
        };
        this.linker = ['imgGal'];
        this.modeFM = true;

        ViBase.prototype.initialize.call(this);

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
var ViPopGaleria = Backbone.View.extend({
    el: '.popGaleria',
    events: {
        'click .btnCancelar' : 'click_btnCancelar',
        'click .btnUpload' : 'click_btnUpload',
        'click .gvData .fa-minus' : 'click_delete',
    },
    initialize: function() {
        this.dal_opc = 11;
        this.idGaleria = null;

        this.form = this.$el.find('.multi-image');
        this.files = this.$el.find('input[name="files[]"]');
        this.gvData = this.$el.find('.gvData');

        this.tempalteTR = Handlebars.compile('{{#data}}<tr data-id="{{idImagen}}" data-noticia="{{idGaleria}}"><td><i class="fa fa-minus"></i></td><td>{{direccion}}</td></tr>{{/data}}');
    },
    /*-------------------------- Base --------------------------*/
    render: function(id) {
        this.idGaleria = id || 0;
        this.clear();
        
        this.loadImages(true);
    },
    clear: function() {
        this.form[0].reset();
    },
    close: function() {
        this.$el.foundation('reveal', 'close');
    },
    loadImages: function(init) {
        var that = this;
        app.ut.post({url:'DAL.php', done:done, type:'json', data:{info:{opcion:this.dal_opc, idGaleria:this.idGaleria}, mod:1}});

        function done(data) {
            var trs = that.tempalteTR(data);
            that.gvData.find('tbody').html(trs);

            if(init)
                that.$el.foundation('reveal', 'open');
        }
    },
    /*-------------------------- Eventos --------------------------*/
    click_delete: function(e) {
        var tr = $(e.currentTarget).parents('tr');
        var idImagen = tr.data('id');
        var that = this;

        app.ut.post({url:'DAL.php', done:done, type:'json', data:{info:{opcion:this.dal_opc, curd:3, data:{idImagen:idImagen}}, mod:2} });

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
        lShow();
        var that = this;
        var formData = new FormData(this.form[0]);
        formData.append("data", JSON.stringify({info:{idKey:this.idGaleria}, mod:102}));
        
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
            data: formData,
            //Options to tell jQuery not to process data or worry about content-type.
            dataType: "json",
            cache: false,
            contentType: false,
            processData: false
        });

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
    },
});
var ViNoticia = ViBase.extend({
    el:'#pnl_noticia',
    initialize: function() {
        this.dal_opc = 5;
        this.baseModel = MoNoticia;
        this.pk = 'idNoticia';

        this.templates = {
            modal_save: app.templates.modal_base,
            modal_save_body: app.templates.body_save_noticia,
            tr: app.templates.tr_noticia,
        };

        this.collection = new CoNoticiaList();
        this.save_bindings = {
            'input[data-field="titulo_noticia"]': 'value:titulo_noticia',
            'input[data-field="activo"]': 'checked:activo',
            'input[data-field="fecha_noticia"]': 'value:fecha_noticia',
            'input[data-field="fecha_vencimiento"]': 'value:fecha_vencimiento',
            'input[data-field="lugar"]': 'value:lugar',
            'select[data-field="idGaleria"]': 'value:idGaleria',
            'textarea[data-field="nota_noticia"]': 'value:nota_noticia',
        };
        this.linker = ['img_noticia'];
        this.modeFM = true;
        this.customSave = true;

        ViBase.prototype.initialize.call(this);

        this.events['click .gvDatos .fa-camera-retro'] = 'click_galeria';
        this.popGaleria = new ViPopGaleriaNoticia();
        
        this.popSave = new ViNoticiaSave(this.config);
    },
    /*-------------------------- Collections --------------------------*/
    /*-------------------------- Base --------------------------*/
    /*-------------------------- Eventos --------------------------*/
    click_galeria: function(e) {
        var id = $(e.currentTarget).parents('tr').data('id');
        this.popGaleria.render(id);
    },
});
var ViNoticiaSave = ViEventoSave.extend();

var ViPopGaleriaNoticia = Backbone.View.extend({
    el: '.popGaleriaNoticia',
    events: {
        'click .btnCancelar' : 'click_btnCancelar',
        'click .btnUpload' : 'click_btnUpload',
        'click .gvData .fa-minus' : 'click_delete',
    },
    initialize: function() {
        this.dal_opc = 7;
        this.idNoticia = null;

        this.form = this.$el.find('.multi-image');
        this.files = this.$el.find('input[name="files[]"]');
        this.gvData = this.$el.find('.gvData');

        this.tempalteTR = Handlebars.compile('{{#data}}<tr data-id="{{idImagen}}" data-noticia="{{idNoticia}}"><td><i class="fa fa-minus"></i></td><td>{{direccion}}</td></tr>{{/data}}');
    },
    /*-------------------------- Base --------------------------*/
    render: function(id) {
        this.idNoticia = id || 0;
        this.form[0].reset();

        this.loadImages(true);
    },
    close: function() {
        this.$el.foundation('reveal', 'close');
    },
    loadImages: function(init) {
        var that = this;
        app.ut.post({url:'DAL.php', done:done, type:'json', data:{info:{opcion:this.dal_opc, idNoticia:this.idNoticia}, mod:1}});

        function done(data) {
            var trs = that.tempalteTR(data);
            that.gvData.find('tbody').html(trs);

            if(init)
                that.$el.foundation('reveal', 'open');
        }
    },
    /*-------------------------- Eventos --------------------------*/
    click_delete: function(e) {
        var tr = $(e.currentTarget).parents('tr');
        var idImagen = tr.data('id');
        var that = this;

        app.ut.post({url:'DAL.php', done:done, type:'json', data:{info:{opcion:this.dal_opc, curd:3, data:{idImagen:idImagen}}, mod:2} });

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
        var formData = new FormData(this.form[0]);
        formData.append("data", JSON.stringify({info:{idKey: this.idNoticia}, mod:101}));
    
        $.ajax({
            url: 'DAL.php',  //Server script to process data
            type: 'POST',
            success: done,
            error: function(xhr){debugger},
            data: formData,
            //Options to tell jQuery not to process data or worry about content-type.
            dataType: "json",
            cache: false,
            contentType: false,
            processData: false
        });

        function done (data) {
            debugger
            if(data.data.res == 1) {
                that.loadImages(false);
                alert('imagenes cargadas');
            }
            else
                alert('error al cargar las imagenes' + data.data.err);

            that.form[0].reset();
        }
    },
});
var ViPlantel = ViBase.extend({
    el:'#pnl_plantel',
    initialize: function() {
        var that = this;
        this.dal_opc = 6;
        this.baseModel = MoPlantel;
        this.pk = 'pltId';

        this.templates = {
            modal_save: app.templates.modal_base,
            modal_save_body: app.templates.body_save_plantel,
            tr: app.templates.tr_plantel,
        };

        this.collection = new CoPlantelList();
        this.save_bindings = {
            'input[data-field="pltNombre"]': 'value:pltNombre',
            'input[data-field="pltDirector"]': 'value:pltDirector',
            'select[data-field="pltModalidad"]': 'value:pltModalidad',
            'input[data-field="pltMunicipio"]': 'value:pltMunicipio',
            'input[data-field="pltLocalidad"]': 'value:pltLocalidad',
            'input[data-field="pltServicios"]': 'value:pltServicios',
            'input[data-field="pltCarreras"]': 'value:pltCarreras',
            'input[data-field="pltMatricula"]': 'value:pltMatricula',
            'input[data-field="pltExescolar"]': 'value:pltExescolar',
            'textarea[data-field="texto"]': 'value:texto',
            'input[data-field="numero"]': 'value:numero',
        };

        this.linker = ['dir_imagen'];
        this.modeFM = true;

        this.popMapa = this.$el.find('.popMapa');
        this.itemsMapa = this.$el.find('.mapa-items');
        this.imgMapa = this.$el.find('.mapa-img');

        ViBase.prototype.initialize.call(this);
        this.events['click .btnMapa'] = 'click_btnMapa';
        this.popMapa.find('.btnAceptar').on('click', function() {
            var items = that.getPositions();
            if(items.length > 0) {
                
                app.ut.post({url:'DAL.php', done:done, type:'json', data:{info: items, mod:100}});
                function done (data) {
                    if(data.err || data.data.err) {
                        alert('Error: ' + (data.data.err || data.err))
                    }
                    else {
                        debugger
                        for (var i = 0; i < items.length; i++) {
                            var item = items[i];
                            var model = that.collection.findWhere({pltId:item.pkey});
                            if(model)
                                model.set({posX: item.left, posY: item.top, isLinked:1 });
                        };
                        alert('Datos guardados');
                    }
                }
            }
        });

        this.popMapa.find('.btnCancelar').on('click', function() {
            that.popMapa.foundation('reveal', 'close');
        });        

        this.templateItemMapa = Handlebars.compile('{{#data}}<label data-id="{{cid}}" data-pkey="{{attributes.pltId}}" class="mapa-item"><i class="fa fa-flash"></i>{{attributes.pltNombre}}</label>{{/data}}');
    },
    /*-------------------------- Collections --------------------------*/
    /*-------------------------- Base --------------------------*/
    getPositions: function() {
        var items = [];
        var elems = this.imgMapa.find('.mapa-item-inner');

        for (var i = 0; i < elems.length; i++) {
            var elem = elems.eq(i);
            var position = {
                top: elem.css('top'),
                left: elem.css('left'),
                pkey: elem.data('pkey'),
            };
            items.push(position);
        }

        return items;
    },
    setPositions: function() {
        this.imgMapa.find('.mapa-item-inner').remove();

        for (var i = 0; i < this.collection.length; i++) {
            var item = this.collection.at(i);
            if(item.get('isLinked') == 1) {
                var elem = $(this.templateItemMapa({data:item})).removeClass('mapa-item').addClass('mapa-item-inner');
                this.imgMapa.append(elem);
                elem.draggable({ containment: 'parent' });

                var position = {top: item.get('posY'), left: item.get('posX') };
                elem.position(position);
                elem.css(position);
            }
        }
    },
    /*-------------------------- Eventos --------------------------*/
    click_btnMapa: function(data) {
        this.popMapa.foundation('reveal', 'open');

        debugger
        this.imgMapa.find('.mapa-item-inner').remove();
        this.setPositions();
        
        this.itemsMapa.html(this.templateItemMapa({data:this.collection.toArray()}));

        this.itemsMapa.find('label').draggable({ revert: true, helper: 'clone' });
        this.imgMapa.droppable({
            accept: ".mapa-item",
            activeClass: "ui-state-hover",
            hoverClass: "ui-state-active",
            drop: function( event, ui ) {
                var parent = $(this);
                var findelem = parent.find('[data-id="' + ui.helper.data('id') + '"]');

                if(findelem.length == 0) {
                    var elem = ui.helper.clone().removeClass('mapa-item').addClass('mapa-item-inner');
                    parent.append(elem);
                    elem.draggable({ containment: 'parent' });
                }
            }
        });
    },
});
var ViEquipos = ViBase.extend({
    el:'#pnl_equipos',
    initialize: function() {
        var that = this;
        this.dal_opc = 10;
        this.baseModel = MoEquipos;
        this.pk = 'idKey';

        this.templates = {
            modal_save: app.templates.modal_base,
            modal_save_body: app.templates.body_save_equipos,
            tr: app.templates.tr_equipos,
        };

        this.collection = new CoEquiposList();
        this.save_bindings = {
            'input[data-field="nombre"]': 'value:nombre',
            'input[data-field="puesto"]': 'value:puesto',
            'input[data-field="twitter"]': 'value:twitter',
            'input[data-field="facebook"]': 'value:facebook',
            'input[data-field="linkedin"]': 'value:linkedin',
            'textarea[data-field="mensaje"]': 'value:mensaje',
        };
        this.linker = ['foto'];
        this.modeFM = true;

        ViBase.prototype.initialize.call(this);
    },
    /*-------------------------- Collections --------------------------*/
    /*-------------------------- Base --------------------------*/
    /*-------------------------- Eventos --------------------------*/
});
var ViConvenios = ViBase.extend({
    el:'#pnl_convenios',
    initialize: function() {
        var that = this;
        this.dal_opc = 13;
        this.baseModel = MoConvenio;
        this.pk = 'idKey';

        this.templates = {
            modal_save: app.templates.modal_base,
            modal_save_body: app.templates.body_save_convenios,
            tr: app.templates.tr_convenios,
        };

        this.collection = new CoConveniosList();
        this.save_bindings = {
            'textarea[data-field="texto"]': 'value:texto',
            'input[data-field="fechaCreacion"]': 'value:fechaCreacion',
            'input[data-field="fechaVencimiento"]': 'value:fechaVencimiento',
            'input[data-field="link"]': 'value:link',
            'input[data-field="activo"]': 'checked:activo',
        };
        this.linker = ['imagen'];
        this.modeFM = true;

        ViBase.prototype.initialize.call(this);
    },
    /*-------------------------- Collections --------------------------*/
    /*-------------------------- Base --------------------------*/
    /*-------------------------- Eventos --------------------------*/
});
var ViSucesos = ViBase.extend({
    el:'#pnl_sucesos',
    initialize: function() {
        var that = this;
        this.dal_opc = 12;
        this.baseModel = MoSucesos;
        this.pk = 'idSuceso';

        this.templates = {
            modal_save: app.templates.modal_base,
            modal_save_body: app.templates.body_save_sucesos,
            tr: app.templates.tr_sucesos,
        };

        this.collection = new CoSucesosList();
        this.save_bindings = {
            'input[data-field="titulo"]': 'value:titulo',
            'input[data-field="subtitulo"]': 'value:subtitulo',
            'textarea[data-field="descripcion"]': 'value:descripcion',
            'input[data-field="activo"]': 'checked:activo',
        };
        this.linker = ['foto'];
        this.modeFM = true;

        ViBase.prototype.initialize.call(this);

        this.events['click .fa-code'] = 'click_code';
        this.popCode = new ViPopCode({model:new this.baseModel, parentView:this});
    },
    /*-------------------------- Collections --------------------------*/
    /*-------------------------- Base --------------------------*/
    /*-------------------------- Eventos --------------------------*/
    click_code: function(e) {
        var id = $(e.currentTarget).parents('tr').data('id');
        var model = this.collection.findWhere({idSuceso:id});

        this.popCode.render(model);
    },
});
var ViPopCode = Backbone.View.extend({
    el: '.popCodigoSuceso',
    events: {
        'blur textarea[data-field="codigo"]' : 'preview_code',
        'click .btnAceptar' : 'click_btnAceptar',
        'click .btnCancelar' : 'click_btnCancelar',
    },
    initialize: function(options) {
        this.dal_opc = 12;
        this.idSuceso = null;
        this.crud = 2;

        this.parentView = options.parentView;
        this.form = this.$el.find('form');
        this.txaCodigo = this.form.find('textarea[data-field="codigo"]');
        this.pnlPreview = this.form.find('.preview');
    },
    /*-------------------------- Base --------------------------*/
    render: function(model) {
        this.model = model;

        this.idSuceso = this.model.get('idSuceso');
        this.txaCodigo.val(this.model.get('codigo'));
        this.preview();

        this.$el.foundation('reveal', 'open');
    },
    close: function() {
        this.$el.foundation('reveal', 'close');
    },
    preview: function() {
        var code = this.txaCodigo.val().replace(/"/g, "'");
        this.txaCodigo.val(code);

        var preview = Handlebars.compile(code);
        this.pnlPreview.html(preview({}));
    },
    /*-------------------------- Eventos --------------------------*/
    preview_code: function() {
        this.preview();
    },
    click_btnCancelar: function() {
        this.close();
    },
    click_btnAceptar: function() {
        var that = this,
            json = this.model.toJSON();

        var jdata = {info:{opcion:this.dal_opc, curd:this.crud, data:json}, mod:2};

        var formData = new FormData(this.form[0]);
        formData.append("fdata", JSON.stringify(json));
        formData.append("data", JSON.stringify(jdata));
        
        app.xhr = $.ajax({
            url: 'DAL.php',  //Server script to process data
            type: 'POST',
            success: done,
            error: function(xhr){debugger},
            data: formData,
            //Options to tell jQuery not to process data or worry about content-type.
            dataType: "json",
            cache: false,
            contentType: false,
            processData: false
        });

        function done (data) {
            debugger
            if(data.data.err) {
                alert('Error: ' + data.data.err)
            }
            else {
                that.model.set({codigo:that.txaCodigo.val()});
                //that.close();
            }
        }
    },
});

var ViQuienes = Backbone.Epoxy.View.extend({
    el: '#pnl_quienes',
    model: new MoQuienes(),
    events: {
        'click .btnGuardar' : 'click_btnGuardar',       
    },
    bindings: {
        'input[data-field="director"]' : 'value:director',
        'input[data-field="puesto"]' : 'value:puesto',
        'input[data-field="twitter"]' : 'value:twitter',
        'input[data-field="facebook"]' : 'value:facebook',
        'input[data-field="linkedin"]' : 'value:linkedin',
        
        'textarea[data-field="mensaje"]' : 'value:mensaje',
        'textarea[data-field="mision"]' : 'value:mision',
        'textarea[data-field="vision"]' : 'value:vision',
        'textarea[data-field="valores"]' : 'value:valores',
        'textarea[data-field="antecedentes"]' : 'value:antecedentes',
        'textarea[data-field="marco"]' : 'value:marco',
    },
    initialize: function() {
        var that = this;
        this.dal_opc = 9;
        this.crud = 2;
        
        this.form = this.$el.find('form');
        this.img = this.form.find('img[data-field="direccion_foto"]');
        this.upload = this.form.find('input[name="direccion_foto"]');
        
        this.upload.on('change', function(){
            readURL(this, that.img);
        });
    },
    /*-------------------------- Collections --------------------------*/
    /*-------------------------- Base --------------------------*/
    render: function() {
        this.$el.removeClass('isHidden');
        var that = this;
        app.ut.post({url:'DAL.php', done:done, type:'json', data:{info:{opcion:this.dal_opc}, mod:1}, get:true });

        function done(data) {
            that.model.set(data.data[0]);
            that.img.attr('src', data.data[0].direccion_foto)
        }
    },
    close: function() {
        this.$el.addClass('isHidden');
    },
    /*-------------------------- Eventos --------------------------*/
    click_btnGuardar: function() {
        var that = this,
            json = this.model.toJSON();

        var jdata = {info:{opcion:this.dal_opc, curd:this.crud, data:json}, mod:2};
        
        lShow();
        var formData = new FormData(this.form[0]);
        formData.append("fdata", JSON.stringify(json));
        formData.append("data", JSON.stringify(jdata));

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
            data: formData,
            //Options to tell jQuery not to process data or worry about content-type.
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
            debugger
            if(data.data.err)
                alert('Error: ' + data.data.err);
            else
                alert('Datos guardados');
        }
    },
});

var ViEduProgLid = Backbone.Epoxy.View.extend({
    el: '#pnl_EduProgLid',
    model: new MoEduProgLid(),
    events: {
        'click .btnGuardar' : 'click_btnGuardar',       
    },
    bindings: {
        'textarea[data-field="EduTexto"]' : 'value:EduTexto',
        'input[data-field="EduTitulo"]' : 'value:EduTitulo',
        'textarea[data-field="EduCorta"]' : 'value:EduCorta',
        'textarea[data-field="ProTexto"]' : 'value:ProTexto',
        'input[data-field="ProTitulo"]' : 'value:ProTitulo',
        'textarea[data-field="ProCorta"]' : 'value:ProCorta',
        'textarea[data-field="LidTexto"]' : 'value:LidTexto',
        'input[data-field="LidTitulo"]' : 'value:LidTitulo',
        'textarea[data-field="LidCorta"]' : 'value:LidCorta',
        'textarea[data-field="LogoIzq"]' : 'value:LogoIzq',
        'textarea[data-field="LogoDer"]' : 'value:LogoDer',
    },
    initialize: function() {
        this.dal_opc = 8;
        this.crud = 2;

        this.form = this.$el.find('form');

        var linkers = {linker : ['EduFoto', 'ProFoto', 'LidFoto', 'LogoIzq', 'LogoDer']};

        ViPopSave.prototype.linked.call(this, linkers);
    },
    /*-------------------------- Collections --------------------------*/
    /*-------------------------- Base --------------------------*/
    setData: function() {
        ViPopSave.prototype.setData.call(this);
    },
    render: function() {
        this.$el.removeClass('isHidden');
        var that = this;
        app.ut.post({url:'DAL.php', done:done, type:'json', data:{info:{opcion:this.dal_opc}, mod:1}, get:true });

        function done(data) {
            that.model.set(data.data[0]);
            that.setData();
        }
    },
    close: function() {
        this.$el.addClass('isHidden');
    },
    /*-------------------------- Eventos --------------------------*/
    click_btnGuardar: function() {
        var that = this,
            json = this.model.toJSON();

        var jdata = {info:{opcion:this.dal_opc, curd:this.crud, data:json}, mod:2};

        lShow();
        var formData = new FormData(this.form[0]);
        formData.append("fdata", JSON.stringify(json));
        formData.append("data", JSON.stringify(jdata));
    
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
            data: formData,
            //Options to tell jQuery not to process data or worry about content-type.
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
            if(data.data.err)
                alert('Error: ' + data.data.err);
            else
                alert('Datos guardados');
        }
    },
});

var router = Backbone.Router.extend({
    routes: {
        '' : 'index',
        'home' : 'home',
        'directorio' : 'directorio',
        'eventos' : 'eventos',
        'galeria' : 'galeria',
        'noticias' : 'noticias',
        'planteles' : 'planteles',
        'eduproglid' : 'eduproglid',
        'quienes' : 'quienes',
        'equipos' : 'equipos',
        'sucesos' : 'sucesos',
        'convenios' : 'convenios',
    },
    index: function() {
        console.log('---- INDEX ----');
    },
    home: function() {
        app.currView.close();
        app.currView = app.views.home || (app.views.home = new ViHome());
        app.currView.render();
    },
    directorio: function() {
        app.currView.close();
        app.currView = app.views.directorio || (app.views.directorio = new ViDirectorio());
        app.currView.render();
    },
    eventos: function() {
        app.currView.close();
        app.currView = app.views.evento || (app.views.evento = new ViEvento());
        app.currView.render();
    },
    galeria: function() {
        app.currView.close();
        app.currView = app.views.galeria || (app.views.galeria = new ViGaleria());
        app.currView.render();
    },
    noticias: function() {
        app.currView.close();
        app.currView = app.views.noticias || (app.views.noticias = new ViNoticia());
        app.currView.render();
    },
    planteles: function() {
        app.currView.close();
        app.currView = app.views.planteles || (app.views.planteles = new ViPlantel());
        var dfd = app.currView.render();
    },
    eduproglid: function() {
        app.currView.close();
        app.currView = app.views.eduproglid || (app.views.eduproglid = new ViEduProgLid());
        app.currView.render();
    },
    quienes: function() {
        app.currView.close();
        app.currView = app.views.quienes || (app.views.quienes = new ViQuienes());
        app.currView.render();
    },
    equipos: function() {
        app.currView.close();
        app.currView = app.views.equipos || (app.views.equipos = new ViEquipos());
        app.currView.render();
    },
    sucesos: function() {
        app.currView.close();
        app.currView = app.views.sucesos || (app.views.sucesos = new ViSucesos());
        app.currView.render();
    },
    convenios: function() {
        app.currView.close();
        app.currView = app.views.convenios || (app.views.convenios = new ViConvenios());
        app.currView.render();
    },
});