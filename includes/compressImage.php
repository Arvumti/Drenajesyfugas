<?php
function compressImage($ext, $uploadedfile, $path, $actual_image_name, $dims)
{

	if($ext=="jpg" || $ext=="jpeg" )
	{
		$src = imagecreatefromjpeg($uploadedfile);
	}
	else if($ext=="png")
	{
		$src = imagecreatefrompng($uploadedfile);
	}
	else if($ext=="gif")
	{
		$src = imagecreatefromgif($uploadedfile);
	}
	else
	{
		$src = imagecreatefrombmp($uploadedfile);
	}

	$milliseconds = round(microtime(true) * 1000);
	list($width, $height)=getimagesize($uploadedfile);
	$tmp=imagecreatetruecolor($dims['w'], $dims['h']);
	imagecopyresampled($tmp, $src, 0, 0, 0, 0, $dims['w'], $dims['h'], $width, $height);
	$parts = explode('/', $file[$nombre]["type"]);
	$parte = $parts[1];
	$filename = $path."F".(date('ymdHis').$milliseconds.'.'.($parte)).$ext; //PixelSize_TimeStamp.jpg
	imagejpeg($tmp, $filename, 100);
	imagedestroy($tmp);
	return $filename;
}
?>