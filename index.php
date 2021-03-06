<?php
//session_save_path("/tmp");
session_start();

?>
<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content="">
	<meta name="author" content="">

	<title>Drenajes & Fugas</title>

	<link href="css/bootstrap.min.css" rel="stylesheet">
  <link href="css/bootstrap.css" rel="stylesheet">

    
	<link href="estilos.css" rel="stylesheet">
	<link href="css/custom.css" rel="stylesheet">
	<link href="css/responsive.css" rel="stylesheet">
    <link rel="stylesheet" href="css/theme-options.css" media="all">
   
    
    
	<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
	<!--[if lt IE 9]>
	  <script src="assets/js/html5shiv.js"></script>
	  <script src="assets/js/respond.min.js"></script>
	<![endif]-->

	<!-- Favicons -->
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
   
  <?php 
  $active_index_mn='menu_multi_nivel active';
  include('header.php');
  ?>
    
    <section class="container ">
      <div class="col-md-9 margen_slide">
        <ul class="galeria_sencilla nav-inside">
            <li>
                <a rel="prettyPhoto[gallery2]" href="img/inspeccion con camara.jpg" class="prettyPhoto"><img src="img/inspeccion con camara.jpg"></a>
                <!--<div class="bot_slider">
                    <h5>Inspección de drenaje con cámara de TV</h5>
                </div>-->
            </li>
            <li>
              <a rel="prettyPhoto[gallery2]" href="img/drenaje con camion.jpg" class="prettyPhoto"><img src="img/drenaje con camion.jpg"></a>
              <!--<div class="bot_slider">
                <h5>Desazolve de drenaje municipal</h5>
              </div>-->
            </li>
            <li>
              <a rel="prettyPhoto[gallery2]" href="img/deteccion de fugas.jpg" class="prettyPhoto"><img src="img/deteccion de fugas.jpg"></a>
              <!--<div class="bot_slider">
                  <h5>Detección de fuga para tuberías de agua y gas</h5>
                </div>-->
              </li>
      			<li>
              <a rel="prettyPhoto[gallery2]" href="img/tornado en casa.jpg" class="prettyPhoto"><img src="img/tornado en casa.jpg"></a>
              <!--<div class="bot_slider">
                <h5>Destape de drenaje residencial</h5>
              </div>-->
            </li>
      			<li>
              <a rel="prettyPhoto[gallery2]" href="img/roto sonda.jpg" class="prettyPhoto"><img src="img/roto sonda.jpg"></a>
              <!--<div class="bot_slider">
                <h5>Destape de drenaje con roto-sondeo</h5>
              </div>-->
            </li>
        </ul>

      </div>
    </section> 
     <section class="h3-intro">
    	<div class="container">
        	<div class="row ">
            	<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
               	<center>
                		<h1><span class="color-texto-resaltar texto-azul">Mantenemos bien, </span>lo que haces bien.</h1>
                		
                      <br><br>  
                 	</center>
                	
               </div>
          	</div>
            
           <div class="row ">
            	
            	<div class="col-lg-3 col-md-3 col-sm-6">
               	<div class="caja_servicios icono_sencillo">
                      <div class="caja_icono">
                        <img src="img/tubo.png">
                  	</div>
                      <div class="sc_contenido">
                        <h3>SOLUCIONES PARA DRENAJES</h3>
                        <span>Brota Agua por Registros</span><br>
						<span>Drenaje Tapado</span><br>
						<span>Malos Olores</span>
						<p>Contamos con todos los equipos necesarios para solucionar sus problemas de drenaje</p>
                      </div>
                 </div>
          		</div>
                
                
              <div class="col-lg-3 col-md-3 col-sm-6">
               	<div class="caja_servicios icono_sencillo">
                      <div class="caja_icono">
                        <img src="img/llave1.png">
                  	</div>
                      <div class="sc_contenido">
                        <h3>SOLUCIONES PARA FUGAS</h3>
                         <span>Incremento en Recibo Mensual</span><br>
						 <span>Manchas de Humedad</span><br>
						 <span>Medidor Girando</span>
						 <p>Tenemos la tecnología necesaria para ubicar y resolver problemas</p>
                      </div>
                 </div>
          		</div>
                
                
                
              <div class="col-lg-3 col-md-3 col-sm-6">
               	<div class="caja_servicios icono_sencillo">
                      <div class="caja_icono">
                        <img src="img/llave2.png">
                  	</div>
                      <div class="sc_contenido">
                        <h3>SOLUCIONES DE PLOMERÍA</h3>
                         <span>Baja Presión de Agua o Gas</span><br>
						 <span>Ubicación de Tubería</span><br>
						 <span>Mantenimiento de Fluxómetros</span>
						 <p>Nuestros técnicos cuentan con la capacitación requerida para atenderle de manera profesional</p>
                      </div>
                 </div>
          		</div>
                
                
              <div class="col-lg-3 col-md-3 col-sm-6">
               	<div class="caja_servicios icono_sencillo">
                      <div class="caja_icono">
                        <img src="img/cinta.png">
                  	</div>
                      <div class="sc_contenido">
                        <h3>SOLUCIONES PARA ESPACIOS CONFINADOS</h3>
                         <span>Desechos Sanitarios</span><br>
						 <span>Disposición de Grasas Alimenticias</span><br>
						 <span>Succión de Lodos</span>
						 <p>Hacemos el trabajo que para muchos es difícil de hacer</p>
                      </div>
                 </div>
          		</div>
                
           </div>
                      
       	</div>
    </section>
    
    
    <section class="index_opciones">
    	<div class="container">
        	<div class="row">
            	<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
               	<center><img style="margin-top: 30px;" src="img/camioneta.png"></center>
               </div>
               <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
               	<div class="encabezado_texto linea"> <h3>RAZONES PARA ELEGIRNOS</h3> </div>
                	<div class="row">
                  	<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    		<div class="caja_servicios icono_sencillo caja_standar">
                            	<div class="caja_icono">
                             	<i class="fa fa-wrench"></i>   
                             </div>
                            	<div class="sc_contenido">
                         			<h3>SOMOS PROFESIONALES</h3>
                             	<p>Nuestros técnicos cuentan con capacitación, equipo y herramientas requeridas para atenderle de manera profesional en su casa, comercio o industria</p>
                             </div>
                         </div>
                    	</div>
                        
                        
                      <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    		<div class="caja_servicios icono_sencillo caja_standar">
                            	<div class="caja_icono">
                             	<i class="fa fa-bolt"></i>   
                             </div>
                            	<div class="sc_contenido">
                         			<h3>CONTAMOS CON TECNOLOGIA</h3>
                             	<p>Usamos tecnología de punta para resolver cualquier problema en tuberías de agua, gas, drenaje o espacios confinados</p>
                             </div>
                         </div>
                    	</div>
                        
                        
                        
                      <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    		<div class="caja_servicios icono_sencillo caja_standar">
                            	<div class="caja_icono">
                             	<i class="fa fa-check-circle"></i>   
                             </div>
                            	<div class="sc_contenido">
                         			<h3>TRABAJOS GARANTIZADOS</h3>
                             	<p>Cada caso es diferente y todo tiene una solución. Le atendemos de manera personal para asegurarnos que quedará satisfecho con nuestro servicio</p>
                             </div>
                         </div>
                    	</div>
                        
                        
                     <!--<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    		<div class="caja_servicios icono_sencillo caja_standar">
                            	<div class="caja_icono">
                             	<i class="fa fa-check-circle"></i>   
                             </div>
                            	<div class="sc_contenido">
                         			<h3>Precios accesibles</h3>
                             	<p>Duis sit amet orci et lectus dictum auctor a nec enim. Donec suscipit fringilla elementum.. Vestibulum hendrerit diam nunc, in tempus urna rhoncus faucibus.</p>
                             </div>
                         </div>
                    	</div>-->
                        
                          
                  </div>
               </div>
          	</div>
       	</div>
    </section>
    
    
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
