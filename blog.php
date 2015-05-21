<?php

$isAdmin = 1;
$idLoad = 1;
include('DAL.php');

$posts = GetInfoAdmin(Array('opcion' => 4));

$posts_html = '';
for ($i=0; $i < count($posts); $i++) {
  $link = '';
  if(strlen($posts[$i]['link']) > 0)
    $link = '<a href="'.$posts[$i]['link'].'" class="link">'.$posts[$i]['link'].'</a>';

  $video = '';
  if(strlen($posts[$i]['video']) > 0)
    $video = '<div class="entrada_thumb text-center">
                  <iframe width="800" height="400" src="//www.youtube.com/embed/'.(explode('v=', $posts[$i]['video'])[1]).'"" frameborder="0" allowfullscreen></iframe>
                  <div class="clear"></div>
              </div>';

  $posts_html .= '
              <article class="post format-link">
                <div class="entrada_contenido">
                  <h2 class="entrada_titulo" >'.$posts[$i]['titulo'].'</h2>
                  <div class="entrada_texto">
                    '.$link.'
                    <p>'.$posts[$i]['texto'].'</p>
                  </div>
                  '.$video.'
                  <div class="entrada_meta">
                    <!--<ul>
                      <li class="fecha"><i class="fa fa-calendar"></i>  '.$posts[$i]['fecha'].'</li>
                      <li class="autor"><i class="fa fa-user"></i> <a href="#">Juan Lira</a></li>
                      <li class="categoria"><i class="fa fa-folder"></i>  <a href="#">Algo sobre drenajes</a></li>
                      <li class="comentarios"><i class="fa fa-comments"></i>  <a href="#">5 Comentarios</a></li>
                      <li class="etiquetas"><i class="fa fa-tags"></i>  <a href="#">drenajes</a>, <a href="#">Fugas</a>,  <a href="#">design</a>, <a href="#">Temas</a>,  <a href="#">Empresa</a>,</li>
                     </ul>-->
                  </div>
                </div>
              </article>
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
</head>

<body>
   <div id="cargar_web">
        <div class="cargar_item">
            <img src="img/ok.gif" alt='loader' />
        </div>
    </div>

<div class="marco_principal">
    
<?php
$active_blog_mn= 'menu_multi_nivel active';
include('header.php');
?>
    
    
    
    <div class="header_pagina title-center">
    	<div class="container">
        	<div class="row">
        	<div class="col-lg-12">
       			<h1>BLOG</h1>
               <ul class="ubicacion_web">
                  <li><a href="index1.html">Home</a></li>
                  <li><a href="blog.html">Blog</a></li>
               </ul>  
        	</div>
            </div>
       </div>
    </div>
    
    
    <div id="main">
    	<div class="container">
        	<div class="row">
            	<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
               <?php echo $posts_html; ?>
                  
                  
                  <!--div class="pagination">
                  	<a href="#" class="prev-btn"><i class="fa fa-angle-left"></i></a>
                    	<div class="pages">
                      <a href="#">1</a>
                      <a href="#" class="active">2</a>
                      <a href="#">3</a>
                      <a href="#">4</a>
                      <a href="#">5</a>
                      <a href="#">6</a>
                      <a href="#">7</a>
                      </div> 
                      <a href="#" class="next-btn"><i class="fa fa-angle-right"></i> </a>                
                  </div-->
    
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
