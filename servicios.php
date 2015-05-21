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
</head>

<body>
    <div id="cargar_web">
        <div class="cargar_item">
            <img src="img/ok.gif" alt='loader' />
        </div>
    </div>

<div class="marco_principal">
    
<?php
$active_servicios_mn= 'menu_multi_nivel active';
include('header.php');
?> 
    
    <div class="header_pagina title-center">
    	<div class="container">
        	<div class="row">
        	<div class="col-lg-12">
       			<h1>Servicios de la empresa</h1>
               <ul class="ubicacion_web">
                  <li><a href="index.html">Home</a></li>
               	<li>Servicios</li>
               </ul>  
        	</div>
            </div>
       </div>
    </div>
    
    
    <div id="main">
    	<div class="container">
        	
					     <div class="row">
                  	
                  
                  </div>
                 <?php 
                      include('serv.php');
                 ?>

    </div>
   <?php 
   include('footer.php');
   ?>
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
