<!DOCTYPE html>
<html lang="es">
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
</head>

<body>
<?php include_once("analyticstracking.php") ?>
    <div id="cargar_web">
        <div class="cargar_item">
            <img src="img/ok.gif" alt='loader' />
        </div>
    </div>

<div class="marco_principal">
    
<!--Esta bien chida nuestra web-->
    
   <?php
$active_contacto_mn= 'menu_multi_nivel active';
include('header.php');
?>
        
    <section class="portada_contacto">
           <img src="img/contacto.jpg"/>
    </section> 
                        
    
    <div id="main">
    	<div class="container">
        	<div class="row">
           	<div class="col-lg-9 col-md-9 col-sm-9 col-xs-12">
            
                 <div  class="row">
                 		<div class="col-md-12">
                        	<div class="encabezado_texto linea"> <h3> Contactanos</h3> </div>
                         
                         <div class="contact-wrap">
                         		<form id="contact-form" action="enviarMail.php" method="post">
                              <p class="input-block">
                                 <label class="required" for="nombre">Nombre<span>*</span></label>
                                 <input class="valid" type="text" name="nombre" id="nombre" value="">
                              </p>
                              <p class="input-block">
                                 <label class="required" for="email">Email <span>*</span></label>
                                 <input type="email" class="valid" name="email" id="email" value="">
                              </p>
                              <p class="input-block end">   
                                 <label class="required" for="telefono">Teléfono</label>                                                            
                                 <input type="text" id="telefono" name="telefono">
                              </p>   
                              <p class="textarea-block">                        
                                  <label class="required" for="mensaje">Mensaje <span>*</span></label>
                                    <textarea rows="6" cols="40" id="mensaje" name="mensaje"></textarea>
                              </p>
                              <p>                    
                                  <button class="btn btn-violet btn-lg btn-block" type="submit" id="btnEnviar" name="btnEnviar" value="submit"> Enviar </button>
                              </p>      	
                            </form>
                            
                         </div>
                      </div>
                 </div>
                 
                        
                    
                      
            	</div>
            
            
              
              
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
	<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>     
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
	<script>
    	window.onload = function () {

		'use strict';
	
		var latlng = new google.maps.LatLng(25.6866142, -100.3161126);
		var styles = [
	
		];
	
		var myOptions = {
			zoom: 17,
			center: latlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			disableDefaultUI: true,
			scrollwheel: false,
			styles: styles
		};
	
		var contentString = '<div id="content">' +
			'<div id="siteNotice">' +
			'</div>' +
			'<h4>Estamos aqui</h4>' +
			'<p>Descripcion' +
			'</p>' +
			'</div>';
	
		var infowindow = new google.maps.InfoWindow({
			content: contentString
		});
	
		var map = new google.maps.Map(document.getElementById('map'), myOptions);
	
		var myLatlng = new google.maps.LatLng(25.6866142, -100.3161126);
	
		var image = 'img/marker.png';
		var marker = new google.maps.Marker({
			position: myLatlng,
			map: map,
			title: 'Hello World!',
			icon: image
		});
	
		google.maps.event.addListener(marker, 'click', function () {
			infowindow.open(map, marker);
		});
	
	}
    </script>     
    


</body>
</html>
