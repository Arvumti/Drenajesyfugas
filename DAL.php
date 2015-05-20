<?php
error_reporting(E_ALL ^ E_WARNING ^ E_NOTICE);
header('Content-Type: text/html; charset=utf-8');
include('funciones_db.php');
include_once 'includes/move.php';

function copy_file($file, $nombre) {
	$milliseconds = round(microtime(true) * 1000);
	$img_noticia = '';
	if(isset($nombre) && isset($file[$nombre]) && $file[$nombre]["size"] > 0) {
		$algo = explode('/', $file[$nombre]["type"]);
		$img_noticia = "img/db_imgs/F".(date('ymdHis').$milliseconds.'.'.($algo[1]));
		move_uploaded_file($file[$nombre]["tmp_name"], $img_noticia);
	}

	return $img_noticia;
}

function GetInfoAdmin($options, $data) {
	switch ($options['opcion']) {
		case 1://Obtiene la informacion de los reportes
			$and = '';
			if(isset($data['idReporte']))
				$and = ' AND idReporte = "'.$data['idReporte'].'"';

			$consulta = '   SELECT  idReporte, idCliente, responsable, atendio, email,
									CASE tipo WHEN 1 THEN \'Mantenimiento\' WHEN 2 THEN \'Garantia\' ELSE \'Nuevo servicio\' END tipo, 
									areas, factura, 
									fechaIni, fechaFin, observaciones, sugerencias, pumbometro, video, hora
							FROM reportes
							WHERE idCliente = "'.$data['idCliente'].'"
							'.$and; 
			break;
		case 2://Obtiene la informacion de los clientes
			$consulta = '   SELECT  idCliente, nombre, email
							FROM clientes
							WHERE idCliente = "'.$data['idCliente'].'"'; 
			break;
		case 3://Obtiene la informacion de las  imagenes de los reportes
			$consulta = '   SELECT  idReporteImagen, idCategoria, direccion, alias
							FROM reportes_imagenes
							WHERE idCategoria = "'.$data['idCategoria'].'"'; 
			break;
		case 4://Obtiene la informacion de los posts
			$consulta = '   SELECT  idPost, texto, titulo, link, video, fecha
							FROM posts
							ORDER BY fecha DEsc'; 
			break;
		case 5://Obtiene la informacion de los posts
			$consulta = '   SELECT 	a.idCategoria, a.nombre, a.tipo, a.idPadre,
									b.idReporteImagen, b.direccion, b.alias
							FROM categorias a
							LEFT JOIN reportes_imagenes b
							ON a.idCategoria = b.idCategoria
							AND a.idReporte = '.$data['idReporte']; 
			break;
		default:
			$consulta = 'SELECT 1;';
			break;
	}

	$res = select($consulta);
	return $res;
}

function GetInfo($options, $data) {
	switch ($options['opcion']) {
		case 1://Obtiene la informacion de los reportes
			$consulta = '   SELECT  a.idReporte, a.idReporte folio, a.idCliente, a.responsable, a.atendio, a.tipo, a.areas, a.factura, 
											a.fechaIni, a.fechaFin, a.observaciones, a.sugerencias, a.pumbometro, a.video, a.email,
											b.nombre cliente, a.hora
							FROM reportes a
							LEFT JOIN clientes b
							ON a.idCliente = b.idCliente'; 
			break;
		case 2://Obtiene la informacion de los clientes
			$consulta = '   SELECT  idCliente, nombre, email
							FROM clientes'; 
			break;
		case 3://Obtiene la informacion de las  imagenes de los reportes
			$consulta = '   SELECT  idReporteImagen, idCategoria, direccion, alias
							FROM reportes_imagenes
							WHERE idCategoria = "'.$data['idCategoria'].'"'; 
			break;
		case 4://Obtiene la informacion de los posts
			$consulta = '   SELECT  idPost, texto, titulo, link, video, fecha
							FROM posts
							ORDER BY fecha DESC'; 
			break;
		case 5://Obtiene la informacion de los posts
			$consulta = '   SELECT 	a.idCategoria, a.nombre, a.tipo, a.idPadre,
									b.idReporteImagen, b.direccion, b.alias
							FROM categorias a
							LEFT JOIN reportes_imagenes b
							ON a.idCategoria = b.idCategoria
							WHERE a.idReporte = '.$data['idReporte']; 
			break;
		default:
			$consulta = 'SELECT 1;';
			break;
	}

	$res = select($consulta);
	return array('data' => $res, 'consulta' => $consulta);
}

function SaveInfo($options, $data) {//Inserta la informacion de la reportes
	$update = Array();

    if($options['crud'] == 1) {
        switch ($options['opcion']) {
            case 1://Inserta la informacion del reporte
                $consulta = '   INSERT INTO reportes (  idCliente, responsable, atendio, 
											tipo, areas, factura, email, 
											fechaIni, fechaFin, observaciones, 
											sugerencias, pumbometro, video, hora)
								VALUES ("'.$data['idCliente'].'", "'.$data['responsable'].'", "'.$data['atendio'].'", 
										"'.$data['tipo'].'", "'.$data['areas'].'", "'.$data['factura'].'", "'.$data['email'].'", 
										"'.$data['fechaIni'].'", "'.$data['fechaFin'].'", "'.$data['observaciones'].'", 
										"'.$data['sugerencias'].'", "'.$data['pumbometro'].'", "'.$data['video'].'", "'.$data['hora'].'");';
                break;
            case 2://Inserta la informacion del cliente
                $consulta = '   INSERT INTO clientes (nombre, email)
								VALUES ("'.$data['nombre'].'", "'.$data['email'].'");';
                break;
            case 3://Inserta la galeria de los reportes
                $res = LoadGalery($data['idCategoria']);
            	return $res;
                break;
			case 4://Inserta la informacion de los posts
				$consulta = '   INSERT INTO posts  (idPost, texto, titulo, link, video, fecha)
								VALUES ("'.$data['idPost'].'", "'.$data['texto'].'", "'.$data['titulo'].'", 
										"'.$data['link'].'", "'.$data['video'].'", "'.$data['fecha'].'")'; 
				break;
			case 5://Inserta la informacion de las categorias
				$idPadre = '"'.$data['idPadre'].'"';
				if($data['idPadre'] == "0" || $data['idPadre'] == 0)
					$idPadre = '(NULL)';
				$consulta = '   INSERT INTO categorias  (nombre, tipo, idPadre, idReporte)
								VALUES ("'.$data['nombre'].'", "'.$data['tipo'].'", 
										'.$idPadre.', "'.$data['idReporte'].'")'; 
				break;
            default:
                $consulta = 'SELECT 1;';
                break;
        }
    }
    else if($options['crud'] == 2) {
        switch ($options['opcion']) {
            case 1://Modifica la informacion del reporte
                $consulta = '   UPDATE reportes 
                				SET idCliente = "'.$data['idCliente'].'", responsable = "'.$data['responsable'].'", 
            						atendio = "'.$data['atendio'].'", tipo = "'.$data['tipo'].'", areas = "'.$data['areas'].'", 
            						factura = "'.$data['factura'].'", fechaIni = "'.$data['fechaIni'].'", 
            						fechaFin = "'.$data['fechaFin'].'", observaciones = "'.$data['observaciones'].'", 
									sugerencias = "'.$data['sugerencias'].'", pumbometro = "'.$data['pumbometro'].'", 
									email = "'.$data['email'].'", video = "'.$data['video'].'", hora = "'.$data['hora'].'"
								WHERE idReporte="'.$data['idReporte'].'";
                                ';
                break;
            case 2://Modifica la informacion del cliente
                $consulta = '   UPDATE clientes 
                				SET nombre = "'.$data['nombre'].'", email = "'.$data['email'].'"
            						WHERE idCliente="'.$data['idCliente'].'";								
                                ';
                break;
			case 4://Modifica la informacion de los posts
				$consulta = '   UPDATE posts
								SET texto = "'.$data['texto'].'", titulo = "'.$data['titulo'].'", 
									link = "'.$data['link'].'", video = "'.$data['video'].'", fecha = "'.$data['fecha'].'"
								WHERE idPost = "'.$data['idPost'].'"'; 
				break;
            default:
                $consulta = 'SELECT 2;';
                break;
        }
    }
    else if($options['crud'] == 3) {
        switch ($options['opcion']) {
            case 1://Elimina la informacion del reporte
            	$row = select('	SELECT direccion 
            					FROM reportes_imagenes 
            					WHERE idCategoria IN (
                                						SELECT idReporte 
                                						FROM categorias
                                						WHERE idReporte = "'.$data['idReporte'].'"
                                					 );');
            	for($i = 0; $i<count($row); $i++){
                    if(file_exists($row[$i]['direccion']))
                        unlink($row[$i]['direccion']);
            	}

            	$consulta = '   DELETE FROM reportes_imagenes
                                WHERE idCategoria IN (
                                						SELECT idReporte 
                                						FROM categorias
                                						WHERE idReporte = "'.$data['idReporte'].'"
                                					 );'; 
                $res = execQuery($consulta);

                $consulta = '   DELETE FROM categorias
                                WHERE idReporte="'.$data['idReporte'].'";'; 
                $res = execQuery($consulta);

                $consulta = '   DELETE FROM reportes
                                WHERE idReporte="'.$data['idReporte'].'";'; 
                break;
            case 2://Elimina la informacion del cliente
                $consulta = '   DELETE FROM clientes
                                WHERE idCliente="'.$data['idCliente'].'";'; 
                break;
            case 3://Elimina la imagen de la galeria de reportes
            	$row = select('SELECT direccion FROM reportes_imagenes WHERE idReporteImagen="'.$data['idReporteImagen'].'";');
                    if(file_exists($row[0]['direccion']))
                        unlink($row[0]['direccion']);

                $consulta = '   DELETE FROM reportes_imagenes
                                WHERE idReporteImagen="'.$data['idReporteImagen'].'";'; 
                break;
			case 4://Elimina la informacion de los posts
				$consulta = '   DELETE FROM posts
								WHERE idPost = "'.$data['idPost'].'"'; 
				break;
			case 5://Elimina la informacion de una categoria
            	$row = select('	SELECT direccion 
            					FROM reportes_imagenes 
            					WHERE idCategoria = "'.$data['idCategoria'].'";');
            	for($i = 0; $i<count($row); $i++){
                    if(file_exists($row[$i]['direccion']))
                        unlink($row[$i]['direccion']);
            	}

            	$consulta = '   DELETE FROM reportes_imagenes
                                WHERE idCategoria = "'.$data['idCategoria'].'";'; 
                $res = execQuery($consulta);

                $consulta = '   DELETE FROM categorias
                                WHERE idCategoria="'.$data['idCategoria'].'";'; 
                break;
            default:
                $consulta = 'SELECT 3;';
                break;
        }
    }

	//$resx = LoadGalery($res['idkey']);

	$res = execQuery($consulta);

	if($options['crud'] == 1 && $options['opcion'] == 1 && strlen($data['email']) > 0) {
		$url = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
		$url = explode('?', $url);
		$url = $url[0];
		$url = str_replace('DAL.php', 'reportes.php', $url);

		$to      = $data['email'];
		$subject = 'Reporte del cliente: '.$data['cliente'];
		$message = $url.'?c='.$data['idCliente'].'&r='.$res['idkey'];
		$headers = 'From: Drenajes y Fugas <info@drenajesyfugas.com>' . "\r\n" .
		    'Reply-To: Drenajes y Fugas <info@drenajesyfugas.com>' . "\r\n" .
		    'X-Mailer: PHP/' . phpversion();
		mail($to, $subject, $message, $headers);
	}

	return array('data' => $res, 'consulta' => $consulta, 'update' => $update, 'files' => $_FILES, 'dataX' => $options);
}

function LoadGalery($idCategoria) {
	$arr = multycopy();
	$images = $arr['images'];
	$alias = $arr['alias'];
	$errors = $arr['error'];

	$consultas = Array();
	for ($i=0; $i < count($images); $i++) { 
		$consulta = '   INSERT INTO reportes_imagenes (idCategoria, direccion, alias)
						VALUES ("'.$idCategoria.'", "'.$images[$i].'", "'.$alias[$i].'");';

		array_push($consultas, $consulta);
	}

	$res = execArr($consultas);

	$consultaRep = 'SELECT idReporteImagen, direccion, alias
					FROM reportes_imagenes
					WHERE idCategoria = '.$idCategoria;
	$imagesDB = select($consultaRep);
	return array('data' => $res, 'consulta' => $consultas, 'images' => $imagesDB, 'errors' => $errors, 'images_copy' => $arr);
}

if(isset($_POST['has_image'])) {
	$entro = 1;
	$options = (array)json_decode($_POST['options']);
	
	$data = (array)json_decode($_POST['data']);

	$opcion = $options['opcion'];
	$mod = $options['mod'];
}
else {
	$entro = 2;
	$options = $_POST['options'] > 0 ? $_POST['options'] : $_GET['options'];
	$data = $_POST['data'] > 0 ? $_POST['data'] : $_GET['data'];

	$opcion = $options['opcion'];
	$mod = $options['mod'];
}
$res = Array('res' => 0, 'err' => 'x');


switch ($mod) {
	case 1:
		$res = SaveInfo($options, $data);
		break;
	case 10:
		$res = GetInfo($options, $data);
		break;
	default:
		$res = Array('res' => 0, 'err' => 'nothing', 'data' => $data, 'opcion' => $opcion, 'mod' => $mod, 'entro' => $entro);
		break;
}

if(!isset($isAdmin)) {
	//$res['consulta'] = '-1';
	echo json_encode($res);
}

?>