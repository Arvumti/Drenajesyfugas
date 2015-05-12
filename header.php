<?php
header('Content-Type: text/html; charset=utf-8');
if(!isset($idLoad))
  include('funciones_db.php');

$error = '';

$login = '<a href="#login_caja"  data-toggle="modal">  <i class="fa fa-user"></i>  Login</a>';
if(isset($_SESSION, $_SESSION['user'])) {
  $login = '<a href="admin.php">  <i class="fa fa-user"></i> Admin</a>';//'.$_SESSION['user']['usuario'].'
}

if (isset($_POST['usuario'], $_POST['password'])) {
  $res = select('SELECT idUsuario, usuario, password FROM usuarios WHERE usuario="'.$_POST['usuario'].'" AND password="'.$_POST['password'].'"');

  if($res) {
    $_SESSION['user'] = $res[0];
    header('Location: admin.php#home');
    die();
  }
  else
    $error = '<span>El usuario y/o el password no son correctos</span><br/>';
}

?>

 <header>
    	<section class="barra_superior clearfix">
    <div class="container">
    	<div class="row">
        	<div class="t-izquierdo col-sm-6 clearfix">
           	<span>	<i class="fa fa-envelope"></i> <a href="mailto:info@drenajesyfugas.com">info@drenajesyfugas.com</a></span> 
           	<span>	<i class="fa fa-phone"></i> (81) 8372-0322 / 8374-0919</span> 
           </div>
           <div class="t-derecho col-sm-6 clearfix">
            	<ul class="nav">
                  <li><?php echo $login; ?></li>
              </ul>
           </div>

        <!--modal login caja clases del modal en bootstrap-->
               <div class="modal fade" id="login_caja">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">Ingreso Admin</h4>
                      </div>
                      <form action="login.php" method="post" name="login">
                      <div class="modal-body row">
                      <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        		<p>
                                <label for="usuario"> Usuario:</label>
                                <input id="usuario" type="text" aria-required="true" size="20" value="" name="usuario">
                            	</p>
                        </div>
                          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        		<p>
                                <label for="clave"> Clave:</label>
                                <input id="clave" type="password" aria-required="true" size="25" value="" name="password">
                            	</p>
                        </div>
                      </div>
                      <?php echo $error; ?>
                      <div class="modal-footer">
                        <button type="submit" class="btn btn-primary btn-violet">Login</button>
                      </div>
                      </form>
                    </div>
                  </div>
               </div>
        </div>
    </div>
    </section>
         <div class="contenedor_navegacion stickmenu clearfix">
          <div class="logo"><a href="index.php">
                <img src="img/drenajesyfugas.png"/> 
               </a>
            </div> 
         <div class="interno">
                
           <ul class="menu_principal">
               <li class="<?php echo $active_index_mn ?>"><a href="index.php">Home</a></li>
               <li class="<?php echo $active_servicios_mn ?>"><a href="servicios.php">Servicios</a></li>
               <li class="<?php echo $active_blog_mn ?>"><a href="blog.php">Blog</a></li>
               <li class="<?php echo $active_chat_mn ?>"><a href="faq.php">FAQ</a></li>
               <li class="<?php echo $active_chat_mn ?>"><a href="contacto.php">Contacto</a></li>

           </ul>
           <div id="menu_moviles" class="dl-menuwrapper">
                <button class="dl-trigger"><i class="fa fa-bars"></i></button>
                <ul class="dl-menu">
                    <li><a href="index.php">Home</a></li>
                    <li><a href="servicios.php">Servicios</a></li>
                    <li><a href="blog.php">Blog</a></li>
                    <li><a href="faq.php">FAQ</a></li>
                    <li><a href="contacto.php">Contacto</a></li>

                </ul>
            </div>
         </div>
           </div>
          
    </header>