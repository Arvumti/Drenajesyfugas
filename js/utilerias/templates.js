function templates(){
    Handlebars.registerHelper('GetFecha', function(fecha) {
        if(!fecha)
            return '';

        var tmpFecha = new Date(fecha);

        var dia = tmpFecha.getDate().toString(),
            mes = tmpFecha.getMonth().toString(),
            anio = tmpFecha.getFullYear().toString();

        var strFecha = (dia.length == 1 ? '0' + dia : dia) + '-' + (mes.length == 1 ? '0' + mes : mes) + '-' + anio;
        return new Handlebars.SafeString(strFecha);
    });
    Handlebars.registerHelper('GetTipoReporte', function(tipo) {
        var strtipo = '';
        switch(parseInt(tipo, 10)) {
            case 1:
                strtipo = 'Mantenimiento';
                break;
            case 2:
                strtipo = 'Garantia';
                break;
            case 3:
                strtipo = 'Nuevo servicio';
                break;
            default:
                strtipo = 'Otro';
                break;
        }

        return new Handlebars.SafeString(strtipo);
    });
    Handlebars.registerHelper('GetTipoPumbometro', function(tipo) {
        var strtipo = '';
        switch(parseInt(tipo, 10)) {
            case 1:
                strtipo = '<i class="icon-thermometer small green"></i>';
                break;
            case 2:
                strtipo = '<i class="icon-thermometer small yellow"></i>';
                break;
            default:
                strtipo = '<i class="icon-thermometer small red"></i>';
                break;
        }

        return new Handlebars.SafeString(strtipo);
    });

    Handlebars.registerHelper('GetOrigin', function() {
        var arr = window.location.href.split('/');
        arr.pop();
        var origin = arr.join('/');
        return new Handlebars.SafeString(origin);
    });

    var alerta = Handlebars.compile('<div class="alert-box alert special altMenssage pop-alert" data-alert="data-alert"><span class="spnTexto">{{texto}}<a class="close" href="#">×</a></span></div>'),
        cbo = Handlebars.compile('{{#data}} <option value="{{_id}}">{{nombre}}</option> {{/data}}'),
        tyaBase = Handlebars.compile('NT-{{sku}} - {{nombre}}'),
        tyaTmp = Handlebars.compile('{{dKey}}'),

        tmp_opt_clientes = Handlebars.compile($('.tmp_opt_clientes').html()),

        tmp_tr_cliente = Handlebars.compile($('.tmp_tr_cliente').html()),
        tmp_body_save_cliente = Handlebars.compile($('.tmp_body_save_cliente').html()),
        
        tmp_tr_reporte_galeria = Handlebars.compile($('.tmp_tr_reporte_galeria').html()),
        tmp_tr_reporte = Handlebars.compile($('.tmp_tr_reporte').html()),
        tmp_body_save_reporte = Handlebars.compile($('.tmp_body_save_reporte').html()),

        tmp_tr_post = Handlebars.compile($('.tmp_tr_post').html()),
        tmp_body_save_post = Handlebars.compile($('.tmp_body_save_post').html()),

        tmp_modal_base = Handlebars.compile($('.tmp_modal_base').html())
        ;
    
	return {        
        alerta: alerta,
        tyaBase: tyaBase,
        tyaTmp: tyaTmp,
        opt_clientes: tmp_opt_clientes,

        tr_cliente: tmp_tr_cliente,
        body_save_cliente: tmp_body_save_cliente,

        tr_reporte_galeria: tmp_tr_reporte_galeria,
        tr_reporte: tmp_tr_reporte,
        body_save_reporte: tmp_body_save_reporte,

        tr_post: tmp_tr_post,
        body_save_post: tmp_body_save_post,

        modal_base: tmp_modal_base,
	}
}