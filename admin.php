<?php
//session_save_path("/tmp");
session_start();

header('Content-Type: text/html; charset=utf-8');

if(!$_SESSION['user'])
    header('Location: index.php');

$user = $_SESSION['user']['usuario'];
$user = $user ? $user : 'Admin';
?>
<!doctype>
<html>
	<head>
		<meta charset="utf-8">
		
		<link rel="stylesheet" type="text/css" href="css/normalize.css">
		<link rel="stylesheet" type="text/css" href="css/font-awesome.css">
		<link rel="stylesheet" type="text/css" href="css/foundation.min.css">
		<link rel="stylesheet" type="text/css" href="css/foundation-datepicker.css">
		<link rel="stylesheet" type="text/css" href="css/style.css">
		<link rel="stylesheet" type="text/css" href="css/typeahead.css">
		<link rel="stylesheet" type="text/css" href="estilos.css">

		<script type="text/javascript" src="js/jquery-2.0.3.min.js"></script>
		<script type='text/javascript' src='js/jquery.percentageloader-0.1.min.js'></script>
		<script type="text/javascript" src="js/lodash.underscore.min.js"></script>
		<script type="text/javascript" src="js/backbone-min.js"></script>
		<script type="text/javascript" src="js/typeahead.js"></script>
		<script type="text/javascript" src="js/foundation.min.js"></script>
		<script type="text/javascript" src="js/foundation-datepicker.js"></script>
		<script type="text/javascript" src="js/handlebars.js"></script>
		<script type="text/javascript" src="js/utilerias/viewsBase.js"></script>
		<script type="text/javascript" src="js/utilerias/base.js"></script>
		<script type="text/javascript" src="js/utilerias/templates.js"></script>
		<script type="text/javascript" src="js/views.js"></script>
		<script type="text/javascript" src="js/app.js"></script>
		
		<script class="tmp_opt_clientes" type="text/x-handlebars-template">
			{{#clientes}}
				<option value="{{idCliente}}" data-email="{{email}}">{{nombre}}</option>
			{{/clientes}}
		</script>
		<script class="tmp_tr_cliente" type="text/x-handlebars-template">
            {{#data}}
            <tr data-id="{{idCliente}}">
                <td><i class="fa fa-repeat"></i> | <i class="fa fa-minus"></i> </td>
                <td>{{nombre}}</td>
                <td>{{email}}</td>
            </tr>
            {{/data}}
        </script>
        <script class="tmp_body_save_cliente" type="text/x-handlebars-template">
            <div class="small-12 columns">
				<label>
					Cliente:
					<input type="text" data-field="nombre" placeholder="Nombre del cliente..." />
				</label>
			</div>

			<div class="small-12 columns">
				<label>
					E-mail:
					<input type="text" data-field="email" placeholder="email..." />
				</label>
			</div>
        </script>

        <script class="tmp_tr_post" type="text/x-handlebars-template">
            {{#data}}
            <tr data-id="{{idPost}}">
                <td><i class="fa fa-repeat"></i> | <i class="fa fa-minus"></i> </td>
                <td>{{titulo}}</td>
                <td>{{fecha}}</td>
            </tr>
            {{/data}}
        </script>
        <script class="tmp_body_save_post" type="text/x-handlebars-template">
            <div class="small-8 columns">
				<label>
					Titulo:
					<input type="text" data-field="titulo" placeholder="Nombre del post..." />
				</label>
			</div>
			<div class="small-4 columns">
				<label>
					Fecha:
					<input type="text" data-field="fecha" placeholder="Fecha del post..." class="date" />
				</label>
			</div>

			<div class="small-12 columns">
				<label>
					Texto:
					<textarea data-field="texto" rows="5" placeholder="texto del post..."></textarea>
				</label>
			</div>
			<div class="small-12 columns">
				<label>
					Link:
					<input type="text" data-field="link" placeholder="link del post..." />
				</label>
			</div>
			<div class="small-12 columns">
				<label>
					Video:
					<input type="text" data-field="video" placeholder="video del post..." />
				</label>
			</div>
        </script>

        <script class="tmp_tr_reporte_galeria" type="text/x-handlebars-template">
            {{#data}}
            	<tr data-id="{{idReporteImagen}}" data-reporte="{{idReporte}}">
            		<td><i class="fa fa-minus"></i></td>
            		<td>{{alias}}</td>
            	</tr>
            {{/data}}
        </script>
        <script class="tmp_tr_reporte" type="text/x-handlebars-template">
            {{#data}}
            <tr data-id="{{idReporte}}">
                <td><i class="fa fa-repeat"></i> | <i class="fa fa-minus"></i> | <i class="fa fa-camera-retro"></i> </td>
                <td><a href="{{GetOrigin}}/reportes.php?c={{idCliente}}&r={{idReporte}}" target='_blank'>{{idReporte}}</a></td>
                <td>{{cliente}}</td>
                <td>{{GetTipoReporte tipo}}</td>
                <td>{{fechaIni}}</td>
                <td>{{hora}}</td>
                <td>{{GetTipoPumbometro pumbometro}}</td>
            </tr>
            {{/data}}
        </script>
        <script class="tmp_body_save_reporte" type="text/x-handlebars-template">
            <div class="small-2 columns">
				<label>
					Folio:
					<input type="text" data-field="folio" placeholder="Folio..." disabled="disabled" />
				</label>
			</div>
			<div class="small-10 columns">
				<label>
					Cliente:
					<select data-field="idCliente"></select>
				</label>
			</div>

			<div class="small-12 columns">
				<label>
					E-mail:
					<textarea data-field="email" placeholder="E-mail de la persona..."></textarea>
				</label>
			</div>

			<div class="small-2 columns">
				<label>
					Tipo:
					<select data-field="tipo">
						<option value="1">Mantenimiento</option>
						<option value="2">Garantia</option>
						<option value="3">Nuevo servicio</option>
					</select>
				</label>
			</div>
			<div class="small-5 columns">
				<label>
					Responsable:
					<input type="text" data-field="responsable" placeholder="Persona responsable..." />
				</label>
			</div>
			<div class="small-5 columns">
				<label>
					Atendio:
					<input type="text" data-field="atendio" placeholder="Persona que atendio..." />
				</label>
			</div>

			<div class="small-3 columns">
				<label>
					Facturas:
					<input type="text" data-field="factura" placeholder="Numero de la factura..." />
				</label>
			</div>
			<div class="small-3 columns">
				<label>
					Plumbometro:
					<select data-field="pumbometro">
						<option value="1">Baja</option>
						<option value="2">Media</option>
						<option value="3">Alta</option>
					</select>
				</label>
			</div>
			<div class="small-3 columns">
				<label>
					Fecha:
					<input type="text" data-field="fechaIni" class="date" placeholder="Fecha..." />
				</label>
			</div>
			<div class="small-3 columns">
				<label>
					Hora:
					<input type="text" data-field="hora" placeholder="Hora..." />
				</label>
			</div>

			<div class="small-12 columns isHidden">
				<label>
					Fecha final:
					<input type="text" data-field="fechaFin" class="date" placeholder="Fecha final..." />
				</label>
			</div>

			<div class="small-12 columns">
				<label>
					Link de video:
					<input type="text" data-field="video" />
				</label>
			</div>
			<div class="small-12 columns">
				<label>
					Areas trabajadas:
					<textarea data-field="areas" placeholder="Areas trabajadas..."></textarea>
				</label>
			</div>
			<div class="small-12 columns">
				<label>
					Sugerencias:
					<textarea data-field="sugerencias" placeholder="Sugerencias..."></textarea>
				</label>
			</div>
			<div class="small-12 columns">
				<label>
					Observaciones:
					<textarea data-field="observaciones" placeholder="observaciones..."></textarea>
				</label>
			</div>
        </script>

        <script class="tmp_modal_base" type="text/x-handlebars-template">
            <div class="reveal-modal large {{class_control}}" data-reveal="data-reveal">
                <section class="pop-head">
                    <h4 class="pop-title"></h4>
                </section>
                <section class="pop-body">
                    <form class="row form-data" enctype="multipart/form-data"></form>
                </section>
                <section class="pop-foot row">
                    <div class="small-12 columns">
                        <br />
                        <button type="button" class="button small success btnAceptar">Guardar</button>
                        <button type="button" class="button small alert btnCancelar">Cancelar</button>
                    </div>
                </section>
            </div>
        </script>

        <script class="tmp_acc_galeria" type="text/x-handlebars-template">
			<dd class="accordion-navigation">
				<a href="#cat{{idCategoria}}"><i class="fa fa-times" data-idcategoria="{{idCategoria}}"></i> {{nombre}}</a>
				<div id="cat{{idCategoria}}" data-idcategoria="{{idCategoria}}" class="content">
					<div class="row">
						<div class="small-12 columns">
                            <table class="table table-custom gv-images-categorias">
                                <thead>
                                    <tr>
                                        <td class="options">Operaciones</td>
                                        <td>Direccion</td>
                                    </tr>
                                </thead>
                                <tbody>
                                {{#imagenes}}
					            	<tr data-id="{{idReporteImagen}}" data-reporte="{{idReporte}}">
					            		<td><i class="fa fa-minus"></i></td>
					            		<td>{{alias}}</td>
					            	</tr>
					            {{/imagenes}}
                                </tbody>
                                <tfoot>
                                	<tr>
                                		<td colspan="2">
                                			<form action="" method="post" enctype="multipart/form-data" class="multi-image">
												<input type="file" data-idcategoria="{{idCategoria}}" class="file-galeria" name="files[]" multiple="multiple" accept="image/*" />
											</form>
                                		</td>
                                	</tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                    <br/><br/>
                    <div class="row">
						<div class="small-10 columns">
							<label>
								Nombre:
								<input type="text" data-field="nombre" />
							</label>
						</div>
						<div class="small-2 columns">
							<label>
								<br/>
								<button type="button" class="button tiny success expand btnAddSubCategoria">Agregar subcategoria</button>
							</label>
						</div>
					</div>
					<div class="row pnl-subcategoria">
						<div class="small-12 columns">
							<dl class="accor-subgaleria accordion" data-accordion>
							</dl>
						</div>
					</div>
				</div>
			</dd>
        </script>
	</head>
	<body>
		<nav class="top-bar" data-topbar role="navigation">
			<ul class="title-area">
				<li class="name">
					<h1><a href="#">Admin</a></h1>
				</li>
				<li class="toggle-topbar menu-icon"><a href="#"><span>Menu</span></a></li>
			</ul>

			<section class="top-bar-section">
				<ul class="left">
					<li><a href="#clientes">Clientes</a></li>
					<li><a href="#reportes">Reportes</a></li>
					<li><a href="#posts">Post</a></li>
				</ul>

				<ul class="right">
					<li class="has-dropdown">
						<a href="#">Admin</a>
						<ul class="dropdown">
							<li><a href="logout.php">Cerrar Sesion</a></li>
						</ul>
					</li>
				</ul>
			</section>
		</nav>
		<br/><br/>
		<div id="pnl_img_logo" class="container">	
			<div class="row">
				<div class="logo_admin"><img src="img/drenajesyfugas.png"> 
				</div> 
			</div>
	    </div>


		<div id="pnl_clientes" class="row isHidden">
			<div class="small-2 columns">
				<h3>Clientes</h3>
			</div>

			<div class="small-12 columns">
				<table class="gvDatos table table-custom">
					<thead>
						<tr>
							<td class="options">Operaciones</td>
							<td>Nombre</td>
							<td>E-mail</td>
						</tr>
					</thead>
					<tbody></tbody>
				</table>
			</div>

			<div class="small-12 columns">
				<button type="button" class="button btnAdd">Nuevo</button>
			</div>
		</div>

		<div id="pnl_reportes" class="row isHidden">
			<div class="small-2 columns">
				<h3>Reportes</h3>
			</div>

			<div class="small-12 columns">
				<table class="gvDatos table table-custom">
					<thead>
						<tr>
							<td class="options">Operaciones</td>
							<td>Folio</td>
							<td>Cliente</td>
							<td>Tipo</td>
							<td>Fecha</td>
							<td>Hora</td>
							<td>Plumbometro</td>
						</tr>
					</thead>
					<tbody></tbody>
				</table>
			</div>

			<div class="reveal-modal popGaleria" data-reveal="data-reveal">
                <section class="pop-head">
                    <h4 class="pop-title">Galeria</h4>
                </section>
                <section class="pop-body">
					<div class="row">
						<div class="small-10 columns">
							<label>
								Nombre:
								<input type="text" data-field="nombre" />
							</label>
						</div>
						<div class="small-2 columns">
							<label>
								<br/>
								<button type="button" class="button tiny success btnAddCategoria">Agregar categoria</button>
							</label>
						</div>
					</div>
					<div class="row">
						<div class="small-12 columns">
							<dl class="accor-galeria accordion" data-accordion>
							</dl>
						</div>
					</div>

                    <!--div class="row">
                        <div class="small-12 columns">
                            <table class="table table-custom gvData">
                                <thead>
                                    <tr>
                                        <td class="options">Operaciones</td>
                                        <td>Direccion</td>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                        
                        <div class="small-12 columns">
                            <form action="" method="post" enctype="multipart/form-data" class="multi-image">
                                <input type="file" id="file" name="files[]" multiple="multiple" accept="image/*" />
                            </form>
                        </div>
                    </div-->
                </section>
                <section class="pop-foot row">
                    <div class="small-12 columns">
                        <br />
                        <button type="button" class="button small success btnUpload">Cargar</button>
                        <button type="button" class="button small alert btnCancelar">Salir</button>
                    </div>
                </section>
            </div>

			<div class="small-12 columns">
				<button type="button" class="button btnAdd">Nuevo</button>
			</div>
		</div>

		<div id="pnl_posts" class="row isHidden">
			<div class="small-2 columns">
				<h3>Posts</h3>
			</div>

			<div class="small-12 columns">
				<table class="gvDatos table table-custom">
					<thead>
						<tr>
							<td class="options">Operaciones</td>
							<td>Titulo</td>
							<td>Fecha</td>
						</tr>
					</thead>
					<tbody></tbody>
				</table>
			</div>

			<div class="small-12 columns">
				<button type="button" class="button btnAdd">Nuevo</button>
			</div>
		</div>

		<div class="loading isHidden">
			<div id="topLoader">
			</div>
			<button type="button" class="button alert expand btnCancelarCarga">Cancelar carga de archivos</button>
		</div>

		<div id="popConfirmacion" class="reveal-modal small popConfirmacion" data-reveal="data-reveal">
			<section class="pop-head">
				<h4>Eliminar</h4>
			</section>
			<section class="pop-body">
				<label class='pregunta'>¿Desea eliminar el registro seleccionado?</label>
			</section>
			<section class="pop-foot">
				<button type="button" class="button success tiny btn-aceptar">Aceptar</button>
				<button type="button" class="button alert tiny btn-cancelar">Cancelar</button>
			</section>
		</div>

		<div class="reveal-modal medium" id="popAdvertencia" data-reveal>
			<section>
				<h4>Advertencia</h4>
			</section>
			<section class="modal-body text-left">
				<label class="mensaje"></label>
			</section>
			<section>
				<button type="button" class="button tiny success custom-button btn-aceptar">Aceptar</button>
			</section>
		</div>
	</body>
</html>