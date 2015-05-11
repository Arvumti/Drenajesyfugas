<?php

$isAdmin = 1;
$idLoad = 1;
include('DAL.php');

$idCliente = $_GET['c'];
$idReporte = $_GET['r'];


if(isset($idCliente) && isset($idReporte)) {
	$cliente = GetInfoAdmin(Array('opcion' => 2), Array('idCliente' => $idCliente));
	$reporte = GetInfoAdmin(Array('opcion' => 1), Array('idCliente' => $idCliente, 'idReporte' => $idReporte));
	$reportes = GetInfoAdmin(Array('opcion' => 1), Array('idCliente' => $idCliente));

	$cliente = $cliente[0];
	$correos = '';

	$paginacion_html = '';
	$url = 'http://'.$_SERVER[HTTP_HOST].$_SERVER[REQUEST_URI];
	$url = explode('?', $url);
	$url = $url[0];

	for ($i=0; $i < count($reportes); $i++)
		$paginacion_html .= '
								<li><a href="'.$url.'?c='.$idCliente.'&r='.$reportes[$i]['idReporte'].'">'.$reportes[$i]['idReporte'].'</a></li>
							';

	$reporte_html = '';
	for ($i=0; $i < count($reporte); $i++) {		
		$correos = $reporte[$i]['email'];

		$imagenes = GetInfoAdmin(Array('opcion' => 3), Array('idReporte' => $reporte[$i]['idReporte']));

		$imagenes_html = '';
		if(count($imagenes) > 0) {
			$imagenes_html = '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 reporte_img">
									<h2>Imagenes</h2>
									<ul class="galeria_sencilla nav-inside">';
			for ($j=0; $j < count($imagenes); $j++) {
				$imagenes_html .= '
									<li><a href="'.$imagenes[$j]['direccion'].'" class="prettyPhoto" data-rel="prettyPhoto[gallery-reporte'.$imagenes[$j]['idReporte'].']"><img src="'.$imagenes[$j]['direccion'].'"></a></li>
								';
			}
			$imagenes_html .= '		</ul> 
								</div>';
		}

		$video = '';
		if(strlen($reporte[$i]['video']) > 0) {
			$video = '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 vid_servicio">
							<h2>Video</h2>
							<iframe width="600" height="400" src="//www.youtube.com/embed/'.(explode('v=', $reporte[$i]['video'])[1]).'"" frameborder="0" allowfullscreen></iframe>
						</div>';
		}

		switch ($reporte[$i]['pumbometro']) {
			case 1:
				$pumbometro = ' <p>Plumbómetro:<i class="icon-thermometer green"></i> </p>';
				break;
			case 2:
				$pumbometro = ' <p>Plumbómetro:<i class="icon-thermometer yellow"></i> </p>';
				break;
			default:
				$pumbometro = ' <p>Plumbómetro:<i class="icon-thermometer red"></i> </p>';
				break;
		}

	  	$reporte_html .= '<p><b>Folio: </b>'.$reporte[$i]['idReporte'].'</p>
	  					  <p><b>Tipo de servicio: </b>'.$reporte[$i]['tipo'].'</p>
	  					  <p><b>Fecha: </b>'.$reporte[$i]['fechaIni'].'</p>
	  					  <p><b>Hora: </b>'.$reporte[$i]['hora'].'</p>
	  					  <p><b>Atendió: </b>'.$reporte[$i]['atendio'].'</p>
	  					  <p><b>Responsable: </b>'.$reporte[$i]['responsable'].'</p>
	  					  <p><b>Áreas: </b>'.$reporte[$i]['areas'].'</p>
	  					  <p><b>Observaciones: </b>'.$reporte[$i]['observaciones'].'</p>
	  					  <p><b>Sugerencias: </b>'.$reporte[$i]['sugerencias'].'</p>'.
	  					  $pumbometro.
	  					  $imagenes_html.
	  					  $video;
	}

	$cliente_html = '
					  <ul>
						 <li class="nombre_empresa">'.$cliente['nombre'].'</li> 
						 <li>'.$correos.'</li>
					  </ul> 
	';
}

?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content="">
	<meta name="author" content="">

	<title>Drenajes & Fugas</title>

	<link href="css/bootstrap.min.css" rel="stylesheet">
	
	<link href="estilos.css" rel="stylesheet">
	<link href="css/custom.css" rel="stylesheet">
	<link href="css/responsive.css" rel="stylesheet">
	<link rel="stylesheet" href="css/theme-options.css" media="all">
   
	
	
  <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!--[if lt IE 9]>
	<script src="assets/js/html5shiv.js"></script>
	<script src="assets/js/respond.min.js"></script>
  <![endif]-->

  <link rel="apple-touch-icon" href="placeholders/ico/apple-touch-icon.png" />
  <link rel="apple-touch-icon" sizes="57x57" href="placeholders/ico/apple-touch-icon-57x57.png">
  <link rel="apple-touch-icon" sizes="72x72" href="placeholders/ico/apple-touch-icon-72x72.png">
  <link rel="apple-touch-icon" sizes="114x114" href="placeholders/ico/apple-touch-icon-114x114.png">
  <link rel="apple-touch-icon" sizes="144x144" href="placeholders/ico/apple-touch-icon-144x144.png">
  <script>
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	ga('create', 'UA-46810500-1', 'auto');
	ga('send', 'pageview');

  </script>
</head>

	<body>
		<div id="cargar_web">
			<div class="cargar_item">
				<img src="img/ok.gif" alt='loader' />
			</div>
		</div>

	<div class="marco_principal">
		<?php
		include('header.php');
		?>  

		<div class="header_pagina title-center">
			<div class="container">
				<div class="row">
					<div class="col-lg-12">
						<h1>Reportes</h1>
						<ul class="ubicacion_web">
							<li><a href="index.html">Home</a></li>
							<li>Reportes</li>
						</ul>  
					</div>
				</div>
			</div>
		</div>


		<div id="main">
			<div class="container">

				<div class="row">
					<div class="row borde_servicio">
						<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
							<div class="encabezado_texto encabezado_largo">
								<h1>Reportes</h1>
								<span><h5 class="16px">Listado de los servicios prestados a su empresa..</h5></span>

							    <!-- <h5 class="16px"><b>Páginas de reportes..</b></h5> -->

								<ul class="pagination">
									<?php echo $paginacion_html; ?>
								</ul>
							</div>
						</div>

						<div class="img_empresa"><img src="img/arvum.png" alt="logo_cliente"/></div>  
						<div class="info_empresa">
							<?php echo $cliente_html; ?>
						</div>
					</div>
				</div>
				<div class="row borde_servicio">
					<?php echo $reporte_html; ?>
				</div>
			</div>
		</div>


		<?php 
			include('footer.php');
		?>
		<a href="#" class="back-to-top"> <i class="fa fa-angle-up"></i> </a>
	</div> 


	<script type="text/javascript" src="js/jquery-1.10.2.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/stellar.js"></script>
	<script type="text/javascript" src="js/fancySelect.js"></script>
	<script type="text/javascript" src="js/jquery-ui.js"></script>
	<script type="text/javascript" src="js/jquery.prettyPhoto.js"></script>
	<script type="text/javascript" src="js/waypoints.min.js" ></script>
	<script type="text/javascript" src="js/modernizr.custom.js"></script>
	<script type="text/javascript" src="js/jquery.dlmenu.js"></script>
	<script type="text/javascript" src="js/owl.carousel.js"></script>
	<script type="text/javascript" src="js/isotope.pkgd.min.js"></script>
	<script type="text/javascript" src="js/jquery.circliful.min.js"></script>         
	<script type="text/javascript" src="js/scrollReveal.js"></script>
	<script type="text/javascript" src="js/mediaelement-and-player.min.js"></script>
	<script type="text/javascript" src="js/TimeCircles.js"></script>
	<script type="text/javascript" src="js/jquery-counterup.js"></script> 
	<script type="text/javascript" src="js/jquery.fitvids.js"></script>
	<script type="text/javascript" src="js/fss.js"></script>
	<script type="text/javascript" src="js/jquery.themepunch.plugins.min.js"></script>
	<script type="text/javascript" src="js/jquery.themepunch.revolution.min.js"></script>    
	<script type="text/javascript" src="js/jQuery-scrollnav.js"></script>        
	<script type="text/javascript" src="js/jquery.mb.YTPlayer.js"></script>             
	<script type="text/javascript" src="js/retina.js"></script>
	<script type="text/javascript" src="js/main.js"></script>  



	</body>
</html>
