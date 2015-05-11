<?php

function moveImage ($nameFile, $dirImg, $dims) {
	include_once 'includes/getExtension.php';
	$path = "img/db_imgs/";
	$filename = '';
	$err = '';

	$imagename = $_FILES[$nameFile]['name'];
	$valid_formats = array("jpg", "png", "gif", "bmp","jpeg","PNG","JPG","JPEG","GIF","BMP");

	$ext = strtolower(getExtension($imagename));
	if(in_array($ext, $valid_formats)/* && $size<(1024*1024)*/) {

		$actual_image_name = time()."1.".$ext;
		$uploadedfile = $_FILES[$nameFile]['tmp_name'];

		//Re-sizing image. 
		include 'includes/compressImage.php';
		$filename = compressImage($ext, $uploadedfile, $path, $actual_image_name, $dims);

		if(file_exists($dirImg))
            unlink($dirImg);
		//move_uploaded_file($uploadedfile, $path.$actual_image_name);
	}
	else
		$err = 'Longitud excedente o formato incorrecto';

	return Array("filename" => $filename, "err" => $err);
}

function multycopy() {
	$images = Array();
	$alias = Array();
	$error = Array();
	$names = Array();
	$extra = Array();

	$valid_formats = array("jpg", "png", "gif", "zip", "bmp");
	$max_file_size = 1024*100; //100 kb
	$path = "img/db_imgs/"; // Upload directory
	$count = 0;
	include_once 'getExtension.php';
	
	if(isset($_POST) and $_SERVER['REQUEST_METHOD'] == "POST") {
		// Loop $_FILES to exeicute all files
		foreach ($_FILES['files']['name'] as $f => $name) {
			if ($_FILES['files']['error'][$f] == 4) {
		    	array_push($error, "un error.");
		        continue; // Skip file if any error found
		    }	       
		    if ($_FILES['files']['error'][$f] == 0) {	           
		        /*if ($_FILES['files']['size'][$f] > $max_file_size) {
		            array_push($error, "$name is too large!.");
		            continue; // Skip large files
		        }
				else*/if( ! in_array(pathinfo($name, PATHINFO_EXTENSION), $valid_formats) ){
					array_push($error, "$name is not a valid format");
					continue; // Skip invalid file formats
				}
		        else{ // No error found! Move uploaded files 
		        	$ext = strtolower(getExtension($name));
					$milliseconds = round(microtime(true) * 1000);
					$prefilename = $path."F".(date('ymdHis').$milliseconds.$count.'.'.$ext);
					$filename = getcwd().'/'.$prefilename;

					array_push($names, $prefilename);
					array_push($extra, $_FILES["files"]);

		            if(move_uploaded_file($_FILES["files"]["tmp_name"][$f], $filename)) {
		            	array_push($images, $prefilename);
		            	array_push($alias, $_FILES["files"]["name"][$f]);
		            	$count++; // Number of successfully uploaded file
		            }
		        }
		    }
		}
	}

	return Array('images' => $images, 'alias' => $alias, 'error' => $error, 'ok' => $names, 'path' => $path, 'extra' => $extra);
}

?>