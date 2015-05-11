var load_content = null;

function bases(){
    jQuery.fn.extend({
        doFocus: function() {
            var that = this;
            setTimeout(function() { 
                that.focus();
            }, 1000);
        }
    });
    
    if (typeof Number.prototype.getDecimals != 'function') {
        // see below for better implementation!
        Number.prototype.round = function (value){
            var num = this || 0,
                decimales = value || 0;
        
            var tmp = this.toString().split('.');
            var p1 = tmp[0],
                p2 = '';
            if(tmp[1] && decimales > 0)
                p2 = '.' + tmp[1].substr(0, decimales);
        
            return parseFloat(p1 + p2);
        };
    }
    
    if (typeof String.prototype.startsWith != 'function') {
        // see below for better implementation!
        String.prototype.startsWith = function (str){
            return this.indexOf(str) == 0;
        };
    }
    
    if (typeof Number.prototype.round != 'function') {
        // see below for better implementation!
        Number.prototype.round = function (value){
            var num = this || 0,
                decimales = '1',
                tope = value || 0;
            for (var i = 0; i < tope; i++)
                decimales += '0';
            decimales = parseInt(decimales);
        
            return Math.round(parseFloat(num) * decimales) / decimales;
        };
    }
    
    if (typeof String.prototype.toInt != 'function') {
        // see below for better implementation!
        String.prototype.toInt = function (value){
            var val = parseInt(this);
            return val || value || 0;
        };
    }
    
    if (typeof String.prototype.toShortDate != 'function') {
        // see below for better implementation!
        String.prototype.toShortDate = function (){
            var fecha = new Date(this.toString()),
                anio = fecha.getFullYear(),
                mes = fecha.getMonth()+1,
                dia = fecha.getDate();        
            dia = dia.toString().length == 1 ? '0' + dia : dia;
            mes = mes.toString().length == 1 ? '0' + mes : mes;
            
            return anio + '-' + mes + '-' + dia;
        };
    }
}

function utilerias() {
    var __loading = $('.loading'),
        __isLoading = false,
        __petXHR = 0;
    
    return {
        alerta  : Alerta,
        confirm : Confirm,
        datediff: DateMeasure,
        get     : Get,
        getJson : GetJson,
        hide    : Hide,
        meses   : GetMeses(),
        message : Message,
        print   : Print,
        post    : post,
        request : Request,
        search  : Search,
        show    : Show,
        toWords : ToWords,
        tyAhead : Typeahead
    };
    
    function Request(options) {
        var url = options.url,
            type = options.type || 'GET',
            data = options.data || {},
            done = options.done || fnDone,
            err = options.err || fnErr,
            dataType = options.dataType || 'json',
            loading = options.loading || false;

        var xhr = null;
        if(type == 'GET')
            xhr = $.get(url, data);
        else
            xhr = $.ajax({
                url: url,  //Server script to process data
                type: type,
                data: JSON.stringify(data),
                //Options to tell jQuery not to process data or worry about content-type.
                dataType: dataType,
                cache: false,
                contentType: 'application/json',
                processData: false
            });

        xhr.done(fnNext).fail(err).always(always);
        if (loading)
            Show();

        function fnNext(data){
            var cbkData = data;

            switch(dataType) {
                case 'json':
                    console.log(data);
                    cbkData = data.length == 0 ? {res:-1} : JSON.parse(data);
                    break;
                default://text
                    cbkData = data;
                    break;
            }

            done(cbkData);
        }

        function fnDone(data){
            console.log(data);
        }

        function fnErr(xhr, err, x){
            console.log(xhr);
        }

        function always(){
            console.log('finish');
            if (loading)
                hide();
        }
    }

    function show() {
        $('#loading').fadeIn().removeClass('isHidden');
    }

    function hide(fn, p_arrs) {
        $('#loading').fadeOut(function(){
            $(this).addClass('isHidden');
            next(fn, p_arrs);
        });
    }

    /*
     * p_url        : url a la cual se va a hacer la peticion
     * p_data       : objeto tipo JSON que contiene la informacion a mandas
     * p_done       : funcion que se ejecutara si todo sale bien
     * p_err        : funcion que se ejecutara si ocurrio algun error
     * p_type       : tipo de dato que se espera recibir [json, html, text]
     * p_loading    : true/false para activar o no el loading panel
     */
    function post(p_params) {
        var url = p_params.url || '/',
            done = p_params.done || fnDone,
            err = p_params.err || fnErr,
            type = p_params.type || 'text',
            data = p_params.data || {},
            loading = p_params.loading === undefined ? true : p_params.loading;
            _ajax = p_params.get ? $.get : $.post;

        if (loading)
            show();
        _ajax(url, data).done(fnNext).fail(err);

        function fnNext(data){
            var cbkData = data;

            switch(type) {
                case 'json':
                    console.log(data);
                    cbkData = data.length == 0 ? {res:-1} : JSON.parse(data);
                    break;
                default://text
                    cbkData = data;
                    break;
            }

            done(cbkData, hide);

            if (loading)
                hide();
        }

        function fnDone(data, fnHide){
            console.log(data);
            fnHide();
        }

        function fnErr(xhr, err, x){
            console.log(xhr);
            if (loading)
                hide();
        }
    }

    function hide() {
        $('#loading').fadeOut(function(){
            $(this).addClass('isHidden')
        });
    }

    // { header, body, dataID, fnA, fnC }
    function Message (json) {
        var modal = json.el || $('#popAdvertencia')
            texto = json.text || '';

        modal.find('.mensaje').text(texto);

        modal.find('.btn-aceptar').off('click').on('click', fnDone);

        modal.foundation('reveal', 'open');

        function fnDone() {
            modal.foundation('reveal', 'close');
        }
    }

    // { header, body, dataID, done, fnC }
    function Confirm (json) {
        var modal = json.el || $('#popConfirmacion'),
            validacion = false,
            valores = json || {},
            header = valores.header || 'Modal',
            body = valores.body || '/',
            dataID = valores.dataID || 0;

        modal.data('close', true);
        modal.find('.modal-title').text(header);
        modal.find('.modal-body').html(body);

        modal.find('.btn-aceptar').removeData().data('idKey', dataID).off('click').on('click', fnDone);
        modal.find('.btn-cancelar').off('click').on('click', fnHide);
        modal.off('close').on('close', fnHide);

        modal.foundation('reveal', 'open');

        function fnDone() {
            modal.off('close');
            if(valores.done && typeof valores.done === "function")
                valores.done(modal);
            
            if(modal.data('close'))
                modal.foundation('reveal', 'close');
        }

        function fnHide(e) {            
            if(valores.fnC && typeof valores.fnC === "function") {
                valores.fnC();
                modal.off('close');
            }
            if(e.type != 'close')
                modal.foundation('reveal', 'close');
        }
    }
    
    function DateMeasure(ms) {
        var d, h, m, s;
        s = Math.floor(ms / 1000);
        m = Math.floor(s / 60);
        s = s % 60;
        h = Math.floor(m / 60);
        m = m % 60;
        d = Math.floor(h / 24);
        h = h % 24;

        this.days = d;
        this.hours = h;
        this.minutes = m;
        this.seconds = s;
    }
    
    /*
     * p_url        : url a la cual se va a hacer la peticion
     * p_data       : objeto tipo JSON que contiene la informacion a mandas
     * p_done       : funcion que se ejecutara si todo sale bien
     * p_err        : funcion que se ejecutara si ocurrio algun error
     * p_type       : tipo de dato que se espera recibir [json, html, text]
     * p_loading    : true/false para activar o no el loading panel
     */
    function Get(p_params) {
        var url = p_params.url || '/PVenta',
            done = p_params.done || fnDone,
            err = p_params.err || fnErr,
            type = p_params.type || 'text',
            data = p_params.data || {},
            loading = p_params.loading === undefined ? true : p_params.loading;

        if (loading)
            show();
        $.get(url, data, type).done(fnNext).fail(err);

        function fnNext(data){
            done(data, hide);
        }

        function fnDone(data, fnHide){
            console.log(data);
            fnHide();
        }

        function fnErr(xhr, err, x){
            console.log(xhr);
            if (loading)
                hide();
        }
    }
    
    function GetJson(json) {
        __petXHR++;        
        if(!__isLoading)
            Show();
        
        var _Done = json.done || __Fake,
            _Fail = json.fail || __Fake;
        
        function _WrapDone(data) {
            _Done(data);
            _WatchLoad();
        }
        
        function _WrapFail(xrh, err) {
            _Fail(xrh, err);
            _WatchLoad();
        }
        
        function _WatchLoad() {
            __petXHR--;
            if(__petXHR == 0)
                Hide();
        }
        
        var xrh = $.getJSON(json.url);
        xrh.done(_WrapDone)
        .fail(_WrapFail);
        
        return xrh;
    }
    
    function GetMeses() {
        var meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        return meses;
    }
    
    function Hide(fn, p_arrs) {
        __isLoading = false;
        __loading.fadeOut();
    }

    function Alerta(json) {
        var message = json.text || '',
            time = json.time || 2000,
            alerta = $(app.templates.alerta({texto:message}));
        
        $.fx.speeds.slow = time;
        $('.pnlAlert').prepend(alerta);
        alerta.fadeOut('slow', function() {
            alerta.find('.close').click();
        });
    }
    
    function Print(json) {
        var modal = json.el || $('#popImprimir'),
            body = json.body || '/',
            clase = json.class || '';
        
        $('#print-area').removeClass().addClass(clase).html(body);
        modal.find('#modal-body').removeClass().addClass(clase).html(body);

        modal.find('#btnImprimir').off('click').on('click', fnDone);
        modal.find('#btnCancelar').off('click').on('click', fnHide);
        modal.off('close').on('close', fnHide);

        modal.foundation('reveal', 'open');

        function fnDone() {
            modal.off('close');
            window.print();
            modal.foundation('reveal', 'close');
        }

        function fnHide(e) {
            modal.off('close');
            if(e.type != 'close')
                modal.foundation('reveal', 'close');
        }
    }
    
    function Search(json) {
        var elem = json.elem,
            _done = json.done,
            _timeout = json.timeout || 1000,
            search = '',
            currSearch = '',
            callback = null;
        
        elem.on('keyup', keyup_search);
        function keyup_search(e) {
            search = e.currentTarget.value;
            
            if(currSearch == search) {
                clearTimeout(callback);
            }
            else if(e.keyCode == 13) {
                clearTimeout(callback);
                ExecSearch();
                return;
            }
            else {            
                if(callback != null)
                    clearTimeout(callback);
                
                callback = setTimeout(ExecSearch, _timeout);
            }
        }
        
        function ExecSearch() {
            currSearch = search;
            _done(search);
            callback = null;
        }
    }
    
    function Show() {
        var h1 = $(document).height();
        var h2 = $('body').height();
        var h3 = $('html').height();
        var max = 0;
        
        if(h1 > h2 && h1 > h3)
            max = h1;
        else if (h2 > h3)
            max = h2;
        else
            max = h3;
        
        console.log($(document).height());
        console.log($('body').height());
        console.log($('html').height());
        console.log(max);
        var top = $(document).scrollTop() + 250;
        
        __isLoading = true;
        __loading.css({height:max + 'px'}).fadeIn().children('#topLoader').css({top:top + 'px'});
    }
    
    function ToWords(value) {
        
        function Unidades(num) {
            switch(num)
            {
                case 1: return 'UN';
                case 2: return 'DOS';
                case 3: return 'TRES';
                case 4: return 'CUATRO';
                case 5: return 'CINCO';
                case 6: return 'SEIS';
                case 7: return 'SIETE';
                case 8: return 'OCHO';
                case 9: return 'NUEVE';
            }    
            return '';
        }
        
        function Decenas(num) {
            decena = Math.floor(num/10);
            unidad = num - (decena * 10);
        
            switch(decena)
            {
                case 1:   
                    switch(unidad)
                    {
                        case 0: return 'DIEZ';
                        case 1: return 'ONCE';
                        case 2: return 'DOCE';
                        case 3: return 'TRECE';
                        case 4: return 'CATORCE';
                        case 5: return 'QUINCE';
                        default: return 'DIECI' + Unidades(unidad);
                    }
                case 2:
                    switch(unidad)
                    {
                        case 0: return 'VEINTE';
                        default: return 'VEINTI' + Unidades(unidad);
                    }
                case 3: return DecenasY('TREINTA', unidad);
                case 4: return DecenasY('CUARENTA', unidad);
                case 5: return DecenasY('CINCUENTA', unidad);
                case 6: return DecenasY('SESENTA', unidad);
                case 7: return DecenasY('SETENTA', unidad);
                case 8: return DecenasY('OCHENTA', unidad);
                case 9: return DecenasY('NOVENTA', unidad);
                case 0: return Unidades(unidad);
            }
        }//Unidades()
        
        function DecenasY(strSin, numUnidades) {
            if (numUnidades > 0)
            return strSin + ' Y ' + Unidades(numUnidades)
            
            return strSin;
        }//DecenasY()
        
        function Centenas(num) {
            centenas = Math.floor(num / 100);
            decenas = num - (centenas * 100);
            
            switch(centenas)
            {
                case 1:
                    if (decenas > 0)
                        return 'CIENTO ' + Decenas(decenas);
                    return 'CIEN';
                case 2: return 'DOSCIENTOS ' + Decenas(decenas);
                case 3: return 'TRESCIENTOS ' + Decenas(decenas);
                case 4: return 'CUATROCIENTOS ' + Decenas(decenas);
                case 5: return 'QUINIENTOS ' + Decenas(decenas);
                case 6: return 'SEISCIENTOS ' + Decenas(decenas);
                case 7: return 'SETECIENTOS ' + Decenas(decenas);
                case 8: return 'OCHOCIENTOS ' + Decenas(decenas);
                case 9: return 'NOVECIENTOS ' + Decenas(decenas);
            }
            
            return Decenas(decenas);
        }//Centenas()
        
        function Seccion(num, divisor, strSingular, strPlural) {
            cientos = Math.floor(num / divisor)
            resto = num - (cientos * divisor)
            
            letras = '';
            
            if (cientos > 0)
                if (cientos > 1)
                    letras = Centenas(cientos) + ' ' + strPlural;
            else
                letras = strSingular;
            
            if (resto > 0)
                letras += '';
            
            return letras;
        }//Seccion()
        
        function Miles(num) {
            divisor = 1000;
            cientos = Math.floor(num / divisor)
            resto = num - (cientos * divisor)
            
            strMiles = Seccion(num, divisor, 'MIL', 'MIL');
            strCentenas = Centenas(resto);
            
            if(strMiles == '')
                return strCentenas;
            
            return strMiles + ' ' + strCentenas;
            
            //return Seccion(num, divisor, 'UN MIL', 'MIL') + ' ' + Centenas(resto);
        }//Miles()
        
        function Millones(num) {
            divisor = 1000000;
            cientos = Math.floor(num / divisor)
            resto = num - (cientos * divisor)
            
            strMillones = Seccion(num, divisor, 'UN MILLON', 'MILLONES');
            strMiles = Miles(resto);
            
            if(strMillones == '')
                return strMiles;
            
            return strMillones + ' ' + strMiles;
            
            //return Seccion(num, divisor, 'UN MILLON', 'MILLONES') + ' ' + Miles(resto);
        }//Millones()
        
        function NumeroALetras(num) {
            var data = {
                numero: num,
                enteros: Math.floor(num),
                centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
                letrasCentavos: '',
                letrasMonedaPlural: 'PESOS',
                letrasMonedaSingular: 'PESO'
            };
        
            if (data.centavos > 0)
                data.letrasCentavos = 'CON ' + data.centavos + '/100 M.N.';
            else
                data.letrasCentavos = 'CON 00/100 M.N.';
                
        
            if(data.enteros == 0)
                return 'CERO ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
            if (data.enteros == 1)
                return Millones(data.enteros) + ' ' + data.letrasMonedaSingular + ' ' + data.letrasCentavos;
            else
                return Millones(data.enteros) + ' ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
        }
        
        return NumeroALetras(value);
    }
    
    function Typeahead(json) {
        var arr = json.arr || [],
            elem = json.elem,
            url = json.url || '',
            displayKey = json.dKey || 'nombre',
            template = json.tmp || app.templates.tyaTmp,
            fail = json.fail || __Fake,
            done = json.done || _FakeAhead,
            _filters = json.filters || [{filter:'nombre'}],
            _callSearch = null,
            _query = null,
            _process = null,
            _timeout = 500,
            _metodo = url.length > 0 ? searchQuery : prepareCollection();
        
        elem.typeahead(null, {
            name: 'familias',
            displayKey: displayKey,
            source: _metodo,
            templates: {
                suggestion: template
            }
        })
        .data('dKey', displayKey)
        .on('typeahead:selected typeahead:autocompleted', function(e, datum) {
            var curElem = $(e.currentTarget);
            curElem.data('current', datum).val(datum[curElem.data('dKey')]);
            console.log(datum)
        })
        .on('blur', function(e) {
            var elem = $(e.currentTarget);
            if(elem.data('current')) {
                if(elem.data('current').nombre != elem.val()) {
                    var datum = elem.data('current');
                    elem.val(datum.dKey);
                }
                parent.find('.tya-clear').css({display:'inline-block'});
            }
            else {
                elem.val('');
                parent.find('.tya-clear').css({display:'none'});
            }
        });
        
        var parent = elem.parents('.twitter-typeahead');
        parent.append('<i class="icon-cross tya-clear"></i>');
        parent.append('<i class="icon-spinner tya-loading icon-spin"></i>');
        
        parent.on('click', '.tya-clear', function() {
            elem.data('current', null).val('');
            parent.find('.tya-clear').css({display:'none'});
        });
        
        function execQuery() {
            if(_callSearch)
                clearTimeout(_callSearch);
            
            fSeacrh();
        }
        
        function fSeacrh() {
            parent.find('.tya-loading').css({display:'inline-block'});
            console.log('init');
            $.get('/controles/tya/' + url, {query:_query, filters:_filters, displayKey: displayKey}).done(wrapDone).fail(wrapFail).always(always);
            
            function always() {
                parent.find('.tya-loading').css({display:'none'});
                console.log('fin');
                _query = null;
                _callSearch = null;
            }
            function wrapFail(xhr, err) {
                fail(xhr, err);
            }
            function wrapDone(data) {
                done(data.data, _process, displayKey);
            }
        }
        
        function prepareCollection() {
            var nombres = new Bloodhound({
              datumTokenizer: function(datum) {
                  return Bloodhound.tokenizers.whitespace(datum.dKey); 
              },
              queryTokenizer: Bloodhound.tokenizers.whitespace,
              local: arr
            });
            
            nombres.initialize();
            
            return nombres.ttAdapter();
        }
        
        function searchQuery(query, process) {
            _query = query;
            _process = process;
            
            console.log(query);
            if(_callSearch)
                clearTimeout(_callSearch);
            
            _callSearch = setTimeout(fSeacrh, _timeout);
        }
        
        function selectSource() {
            return url.length > 0 ? searchQuery : prepareCollection();
        }
        
        function _FakeAhead(data, process, displayKey) {
            for (var i = 0; i < data.length; i++) {
                data[i].dKey = data[i][displayKey];
            }

            process(data);
        }
        
        return {
            execQuery: execQuery
        };
    }
    
    function __Fake(xhr) {
        console.log(xhr);
    }
}

function loadAsync(modulo, deps) {
    var dependencias = deps || [];
    var dirsJS = ['/templates/views/' + modulo + '.js'];

    for(var i=0; i<dependencias.length; i++) {
        dirsJS.push('/templates/views/' + dependencias[i] + '.js');
    }

    var dfd = $.Deferred();

    if(!app.views[modulo]) {
        $.get('/template/find/' + modulo).done(function(data) {
            load_content.append(data);

            require(dirsJS, function (async) {
                app.currView.close();
                app.currView = app.views[modulo] || (app.views[modulo] = new async.view());
                app.currView.render();

                dfd.resolve(app.currView);
            });
            
        }).fail(function(xhr) {
            dfd.reject();
        });
    }
    else {
        app.currView.close();
        app.currView = app.views[modulo];
        app.currView.render();

        dfd.resolve(app.currView);
    }
    

    dfd.then(function(async) {
    });
    
    return dfd.promise;
}