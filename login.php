<?php
//session_save_path("/tmp");
session_start();

header('Content-Type: text/html; charset=utf-8');
include('funciones_db.php');

$error = '';

if(isset($_SESSION, $_SESSION['user'])) {
	header('Location: admin.php#home');
	die();
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
<html>
	<head>
		<meta charset="utf-8">
	</head>
	<body>
		<form action="login.php" method="post" name="login">
			<?php echo $error; ?>
			Usuario:
			<input type="text" name="usuario" />
			Contraseña:
			<input type="password" name="password" />
			<input type="submit" value="Iniciar sesion" />
		</form>
	</body>
</html>