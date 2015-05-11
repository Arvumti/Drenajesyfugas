function viewsBase() {
    var ViBase = Backbone.View.extend({
        getData: function(elem_content) {
            var datos = elem_content.find('[data-field]:not(.tt-hint)'),
                json = {};

            for(var i=0; i<datos.length; i++) {
                var elem = datos.eq(i),
                    info = null;
                
                if(elem.hasClass('tya')) {
                    var current = elem.data('current');
                    json['dKey' + elem.data('field')] = null;

                    if(current) {
                        info = current[elem.data('field')];
                        json['dKey' + elem.data('field')] = current.nombre;
                    }
                }
                /*else if(elem.hasClass('date')) {
                    var compose = elem.val().split('-');
                    if(compose.length > 0) {
                        info = new Date(compose[1] + '-' + compose[0] + '-' + compose[2]);
                    }

                    if(info == 'Invalid Date')
                        info = null;
                }*/
                else if(elem.hasClass('table')) {
                    var trs = elem.find('tbody tr');
                    info = [];

                    for (var j = 0; j < trs.length; j++)
                        info.push(trs.eq(j).data('row'));
                }
                else if(elem[0].type == 'checkbox')
                    info = elem.prop('checked') ? 1 : 0;
                else
                    info = elem.val();
            
                json[elem.data('field')] = info;
            }
            return json;
        },
        setData: function(data, form) {
            for(var name in data) {
                var elem = form.find('[data-field="'+name+'"]:not(.tt-hint)');
                
                if(elem.length > 0) {                
                    if(elem.hasClass('tya')) {
                        var tyaData = {};

                        tyaData[name] = data[name];
                        if(tyaData[name]) {
                            tyaData['nombre'] = data['dKey' + name];
                            tyaData['dKey'] = data['dKey' + name];
                            elem.data('current', tyaData).val(tyaData.dKey).blur();
                        }
                        else
                            elem.data('current', null).val('').blur();
                    }
                    /*else if(elem.hasClass('date')) {
                        var fecha = new Date(data[name]).toLocaleDateString().replace(/\//g, '-');
                        if(fecha == 'Invalid Date')
                            elem.val('');
                        else
                            elem.val(fecha);
                    }*/
                    else if(elem[0].type == 'checkbox')
                        elem.prop('checked', data[name]);
                    else
                        elem.val(data[name]);
                }
            }
        },
    });

    /*
    	columns: columnas del grid
    	model: modelo [opcional]
    	pk: primary key
    	url: ruta del api
    */
    var ViABC = Backbone.View.extend({
        /*-------------------------- Base --------------------------*/
        initialize: function(columns) {
            this.gvDatosEl = this.$el.find('.gvDatos');
            this.popSave = this.$el.find('.modal-save');
            
            this.model || (this.model = app.models.moRow);
            this.extras || (this.extras = {locked:[], clean:[]});

            var command = {select: false},
                extras = {
                    select: true,
                    primaryKey: this.pk
                };

            this.gvGrid = new app.controles.grid({model:this.model, columns:columns, command:command, extras:extras, url:'/controles/grid' + this.url, el:this.gvDatosEl});
            
            this.tbody = this.gvDatosEl.children('tbody');

            this.popAction = new ViPopSaveABC({url:this.url, pk:this.pk, parentView:this, el:this.popSave});
          
            this.events['click .btn-nuevo'] = 'click_nuevo';
            this.events['click .btn-modificar'] = 'click_modificar';
            this.events['click .btn-eliminar'] = 'click_eliminar';

            this.$el.foundation();
        },
        render: function(data){
            this.$el.removeClass('isHidden');
        },
        addRow: function(data){
            switch(data.crud) {
                case 1:
                    for(var key in data) 
                        data[key] = data[key].toString();
                    var mrow = new this.model(data);
                    this.gvGrid.addTR(mrow);
                    break;
                case 2:
                    this.gvGrid.modifyTR(data);
                    break;
            }
        },
        close: function() {
            this.$el.addClass('isHidden');
        },
        /*-------------------------- Eventos --------------------------*/
        click_nuevo: function() {
            this.popAction.render({crud:1});
        },
        click_modificar: function() {
            var row = this.tbody.find('.isSelected');
            if(row.length == 0)
                app.ut.message({text:'tiene que seleccionar un registro'});
            else {
                var model = this.gvGrid.collection.get(row.data('cid'));
                this.popAction.render({crud:2, model:model});
            }
        },
        click_eliminar: function() {
            var that = this,
                row = this.tbody.find('.isSelected');
            if(row.length == 0)
                app.ut.message({text:'Tiene que seleccionar un registro'});
            else {
                var model = this.gvGrid.collection.get(row.data('cid'));
                popConfirm.render(function() {
                	app.ut.request({url:that.url + '/' + row.data('pkey'), data:{model:model.toJSON()}, done:done, type:'DELETE'});
            
                    function done(data) {
                        popConfirm.click_cancelar();
                        that.gvGrid.collection.remove(model, {silent:true});
                        row.remove();
                    }
                });
            }
        },
    });

    var ViPopSaveABC = Backbone.View.extend({
        events: {
            'click .btn-aceptar'    : 'click_aceptar',
            'click .btn-cancelar'   : 'click_cancelar',
            'keyup' : 'keyup_pop',
        },
        initialize: function(data) {
            var that = this;

            this.modelBase = new data.parentView.model();
            this.mode = {
                SaveAndContinue: false
            };

            this.parentView = data.parentView;
                
            this.url = data.url;
            this.form = this.$el.find('form');     
            
            this.thead = this.$el.children('.pop-head');
            this.tbody = this.$el.children('.pop-body');
            
            this.crud = 1;
            this.pk = data.pk;
            
            this.form.find('.date').fdatepicker({format: 'dd-mm-yyyy'});

            var tyas = this.form.find('.tya');
            /*for (var i = 0; i < tyas.length; i++) {
                var fk = this.parentView.fks[tyas.eq(i).data('field')];
                if(fk)
                    app.ut.tyAhead({elem:tyas.eq(i), url:fk.url, filters:fk.filters, dKey:fk.dKey});
            };*/
            this.linkFks(tyas, this.parentView.fks);

            this.$el.find('.tya.tt-hint').removeAttr('required');

            this.form.on('valid', function (e) {
                e.preventDefault();
                that.save();
            }).on('submit', function (e) {
                e.preventDefault();
            });
        },
        /*-------------------------- Base --------------------------*/
        linkFks: function(tyas, pfks) {
            for (var i = 0; i < tyas.length; i++) {
                var fk = pfks[tyas.eq(i).data('field')];
                if(fk)
                    app.ut.tyAhead({elem:tyas.eq(i), url:fk.url, filters:fk.filters, dKey:fk.dKey, done:fk.done});
            };

            tyas.find('.tt-hint').removeAttr('required');
        },
        render: function(data){
            this.model = data.model;
            this.crud = data.crud || 1;
            this.clear();
            
            if(this.crud == 2) {
                this.setData(this.model.toJSON() || {});
                var locked = this.parentView.extras.locked || [];

                for(var i = 0; i < locked.length; i++) {
                    var elem = this.$el.find('[data-field="' + locked[i] + '"]');
                    elem.attr('disabled', 'disabled');
                }
            }
            
            this.$el.foundation('reveal', 'open');
        },
        clear: function() {
            this.form[0].reset();
            this.$el.find('[data-field]').removeAttr('disabled');
            this.$el.find('.tya-clear').click();
        },
        clean: function() {
            var clean = this.parentView.extras.clean;
            if(clean.length == 0)
                return;

            for(var i=0; i<clean.length; i++) {
                var elem = this.$el.find('[data-field="' + clean[i] + '"]');
                elem.val('');

                if(elem.hasClass('tya'))
                    elem.find('.tya-clear').click();
            }

            this.$el.find('[data-field="' + clean[0] + '"]').focus();
        },
        getData: function() {
            return ViBase.prototype.getData.call(this, this.form);
        },
        setData: function(data) {
            ViBase.prototype.setData.call(this, data, this.form);
        },
        save: function() {
            var that = this,
                json = that.getData();
            
            var type = 'POST';
            var url = this.url;
            if(this.crud == 2) {
                type = 'PUT';
                url += '/' + this.model.get(this.pk);
                _.defaults(json, this.model.attributes);
            }
            else
                _.defaults(json, this.modelBase.defaults);

            app.ut.request({url:url, data:json, done:done, type:type});
            
            function done(data) {
                if(data.error) {
                    alert(data.error);
                    return false;
                }
                else if(that.mode && that.mode.SaveAndContinue && that.crud == 1)
                    that.clean();
                else
                    that.click_cancelar(that);
                data.crud = that.crud;
                that.parentView.addRow(data);
            }
        },
        /*-------------------------- Eventos --------------------------*/
        click_aceptar: function() {
            this.form.submit();
        },
        click_cancelar: function() {
            this.$el.foundation('reveal', 'close');
        },
        keyup_pop: function(e) {
            if((e.keyCode ? e.keyCode : e.which) == 13)
                this.form.submit();
        },
    });

    var ViPopConfirmacion = Backbone.View.extend({
        el: '#popConfirmacion',
        events: {
            'click .btn-cancelar'   : 'click_cancelar',
        },
        initialize: function() {
            this.btnAceptar = this.$el.find('.btn-aceptar');
        },
        /*-------------------------- Base --------------------------*/
        render: function(fn){
            this.btnAceptar.off('click').on('click', fn);
            
            this.$el.foundation('reveal', 'open');
        },
        /*-------------------------- Eventos --------------------------*/
        click_cancelar: function() {
            this.$el.foundation('reveal', 'close');
        },
    });
    var popConfirm = new ViPopConfirmacion();

    return {abc: ViABC, popAbc: ViPopSaveABC, base:ViBase, confirm: popConfirm};
}