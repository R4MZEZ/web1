<?php

function validateX($x) {
	$x_max = 5;
	$x_min = -5;
	
	if (!isset($x)) 
		return false;
	
	$numX = str_replace(',', '.', $x);
	return is_numeric($numX) && $numX >= $x_min && $numX <= $x_max;
}

function validateY($y) {
	$y_max = 3;
	$y_min = -5;
	
	if (!isset($y)) 
		return false;
	
	$numY = str_replace(',', '.', $y);
	return is_numeric($numY) && $numY >= $y_min && $numY <= $y_max;
}

function validateR($r) {
	return isset($r);
}

function validate($x, $y, $r) {
	return validateX($x)&&validateY($y)&&validateR($r);
}

function checkTriangle($x, $y, $r) {
	return $x <= 0 && $y <= 0 && $x >= -$r && $y >= -$r/2;
}

function checkRectangle($x, $y, $r) {
	return $x >= 0 && $y <= 0 && $x <= $r && $y >= -$r/2;
}

function checkCircle($x, $y, $r) {
	return $x <= 0 && $y >= 0 && $x*$x+$y*$y <= $r*$r;
}

function checkHit($x, $y, $r) {
	return checkTriangle($x, $y, $r)||checkRectangle($x, $y, $r)||checkCircle($x, $y, $r);
}

$start = microtime(true);
$r = (int)$_GET["r"];
$x = (float)$_GET["x"];
$y = (float)$_GET["y"];
$isValid = validate($x, $y, $r) ? true : false; 
$hit = $isValid ? checkHit($x, $y, $r) : "Невалидные данные";
$hit = $hit ? 'Точное попадание' : 'Промах';
$current_time = date('H:i:s', time()-$_GET['time']*60);;
$script_time = (microtime(true)-$start);

$jsonData = "{".
	"\"x\":\"$_GET["x"]\",".
	"\"y\":\"$_GET["y"]\",".
	"\"r\":\"$_GET["r"]\",".
	"\"currentTime\":\"$current_time\",".
	"\"scriptTime\":\"$script_time\",".
	"\"hit\":\"$hit\"".
	"}";

header('Access-Control-Allow-Origin: *');
echo $jsonData;

?>