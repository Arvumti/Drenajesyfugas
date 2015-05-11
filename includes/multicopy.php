<?php

	$names = Array();
	$valid_formats = array("jpg", "png", "gif", "zip", "bmp");
	$max_file_size = 1024*100; //100 kb
	$path = "../uploads/"; // Upload directory
	$count = 0;
	include_once 'getExtension.php';

	if(isset($_POST) and $_SERVER['REQUEST_METHOD'] == "POST"){
		// Loop $_FILES to exeicute all files
		foreach ($_FILES['files']['name'] as $f => $name) {     
		    if ($_FILES['files']['error'][$f] == 4) {
		        continue; // Skip file if any error found
		    }	       
		    if ($_FILES['files']['error'][$f] == 0) {	           
		        if ($_FILES['files']['size'][$f] > $max_file_size) {
		            $message[] = "$name is too large!.";
		            continue; // Skip large files
		        }
				elseif( ! in_array(pathinfo($name, PATHINFO_EXTENSION), $valid_formats) ){
					$message[] = "$name is not a valid format";
					continue; // Skip invalid file formats
				}
		        else{ // No error found! Move uploaded files 
		        	$ext = strtolower(getExtension($name));
					$milliseconds = round(microtime(true) * 1000);
					$filename = $path."F".(date('ymdHis').$milliseconds.$count.'.'.$ext);

					array_push($names, $_FILES["files"]["tmp_name"][$f]);
		            if(move_uploaded_file($_FILES["files"]["tmp_name"][$f], $path.$filename))
		            $count++; // Number of successfully uploaded file
		        }
		    }
		}
	}
	echo json_encode($names);
?>