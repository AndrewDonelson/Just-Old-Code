<?php
switch($_SERVER['REQUEST_METHOD'])
{
	case 'GET': $_REQUEST = &$_GET; break;
	case 'POST': $_REQUEST = &$_POST; break;
	default:
}

date_default_timezone_set('US/Arizona');
//$url = 'http://username:password@hostname/path?arg=value#anchor';
$err=false;
$FRAMEWORK="framework/";
$FILEPATH=dirname(__FILE__).'/'.$FRAMEWORK;
//$BASEPATH='//cdn.i2tmlabs.com'.'/'.$FRAMEWORK;
$BASEPATH='//localhost:8080/cdn/'.$FRAMEWORK;
$TIMESTAMP=strftime("%Y.%m.%d.%H%M%S"); //2014.01.01.123456
$LATEST_NANO_VERSION="1.0.0";
$LATEST_MAESTRO_VERSION="1.7.0";


if (isset($_GET['nv'])||isset($_GET['nb'])) {
	$USE_NANO_VERSION=(isset($_GET['nv']))?$_GET['nv']:$LATEST_NANO_VERSION;
	$USE_NANO_BUILD=(isset($_GET['nb']))?$_GET['nb']:"release";

	if ($USE_NANO_VERSION && $USE_NANO_BUILD) {
		
		//Only in-house can get source code, and dont count sends 
		$INHOUSE=($_SERVER['REMOTE_ADDR']=='76.178.60.97'||$_SERVER['REMOTE_ADDR']=='127.0.0.1')?true:false;
		
		if ($USE_NANO_VERSION=='auto') 
			$USE_NANO_VERSION=$LATEST_NANO_VERSION;

		if (!$INHOUSE) $USE_NANO_BUILD='release';
		
		$USE_MAESTRO_BUILD=($INHOUSE==true&&isset($_GET['local']))?"local":$USE_NANO_BUILD;
			
		//=-=|Make sure files for sending|=-=//
		$MSG="ACTION:";
		/** See if its a valid version, if so use it. If not, Use current **/
		if (!file_exists("./framework/nano/".$USE_NANO_VERSION.'/nano.'.$USE_NANO_BUILD.'.js')) {
			$MSG="ERROR:Invalid Request [".$USE_NANO_VERSION."][".$USE_NANO_BUILD."] - \n\r";
			$MSG=$BASEPATH."nano/".$USE_NANO_VERSION.'/nano.'.$USE_NANO_BUILD.'.js';
			$USE_NANO_VERSION=$LATEST_NANO_VERSION;
			$err=true;
		}
					
		if (file_exists($FRAMEWORK."maestro/".$LATEST_MAESTRO_VERSION."/maestro.".$USE_MAESTRO_BUILD.".js")) {
						
			/** Cloud App request for Maestro **/
			$MAESTRO=file_get_contents('./'.$FRAMEWORK."maestro/".$LATEST_MAESTRO_VERSION."/maestro.".$USE_MAESTRO_BUILD.".js");
			
			$find = array('{VERPATH}', '{VERTYPE}');
			$value   = array($BASEPATH.'nano/'.$USE_NANO_VERSION, '.'.$USE_NANO_BUILD);
			$MAESTRO = str_replace($find, $value, $MAESTRO);

			if ($err==false)
				$MSG.="Using Maestro [".$USE_MAESTRO_BUILD."v".$LATEST_MAESTRO_VERSION."] & Sent Nano FW [".$USE_NANO_VERSION."][".$USE_NANO_BUILD."]";
			else 
				$MSG.="Aborted.";
			

			/** Create Log Entry if not in-house **/
			if (!$INHOUSE) {
				$LOG=sprintf("%s\t%s\t%s\n",$TIMESTAMP,$_SERVER['REMOTE_ADDR'],$MSG);	
				file_put_contents("nano.log", $LOG, FILE_APPEND);
			}else{
				$LOG=sprintf("%s\t%s\t%s\n",$TIMESTAMP,$_SERVER['REMOTE_ADDR'],$MSG);	
				file_put_contents("nano.dev.log", $LOG, FILE_APPEND);
			}
			
			/** Send maestro with desired framework version **/
			// seconds, minutes, hours, days
			if ($err==false) {
				$expires = 60*60*24*14;
				header("content-type: application/javascript; charset=UTF-8");
				header("Maestro: ".$USE_MAESTRO_BUILD." version ".$LATEST_MAESTRO_VERSION);
				header("Pragma: public");
				header("Cache-Control: maxage=".$expires);
				header('Expires: ' . gmdate('D, d M Y H:i:s', time()+$expires) . ' GMT');	
				echo $MAESTRO;
				
				exit;
			}
		}
	}
}
/** BOT, Error or Page visit **/
$file="nano.log";
$linecount = 0;
$handle = fopen($file, "r");
while(!feof($handle)){
  $line = fgets($handle);
  $linecount++;
}
fclose($handle);
try {
$fsMaestro = number_format(filesize($FILEPATH.'maestro/js/maestro.release.js')).' bytes';
$fsNFJS = number_format(filesize($FILEPATH.'nano/'.$LATEST_NANO_VERSION.'/nano.release.js')).' bytes';
$fsNFCSS = number_format(filesize($FILEPATH.'nano/'.$LATEST_NANO_VERSION.'/nano.release.css')).' bytes';
$MAESTROCSS=file_get_contents($FILEPATH.'maestro/css/maestro.release.css');
} catch (Exception $e) {
	$MSG+=$e;
	$err==true;
	$fsMaestro = 'OFFLINE';
	$fsNFJS = 'OFFLINE';
	$fsNFCSS = 'OFFLINE';		
}

if ($err==true) {
	header("content-type: text/html; charset=UTF-8");
	header("Pragma: public");
	header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
	header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // Date in the past	
}
?>
<!DOCTYPE html> 
<html lang="en" charset="utf-8">
	<head>
		<meta http-equiv="Content-type" content="text/html" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, minimum-scale=1.0,  maximum-scale=1.0, initial-scale=1.0" />
		<title>Current Maestro Status</title>
		<link href="http://cdn.i2tmlabs.com/static/shared/vendors/bootstrap/css/bootstrap.min.css" rel="stylesheet">
		<style rel="stylesheet" type="text/css"><?php echo $MAESTROCSS;?></style>
		<style type="text/css">	
			@media
			only screen and (orientation:landscape),
			only screen and (-webkit-min-device-pixel-ratio: 3),
			only screen and (   min--moz-device-pixel-ratio: 3),
			only screen and (     -o-min-device-pixel-ratio: 3/1),
			only screen and (        min-device-pixel-ratio: 3),
			only screen and (                min-resolution: 288dpi),
			only screen and (                min-resolution: 3dppx) { 
			  
				.page-wrap {background-color:#ccc;zoom:.55}

			}			

						@media
			only screen and (orientation:landscape),
			only screen and (-webkit-min-device-pixel-ratio: 2),
			only screen and (   min--moz-device-pixel-ratio: 2),
			only screen and (     -o-min-device-pixel-ratio: 2/1),
			only screen and (        min-device-pixel-ratio: 2),
			only screen and (                min-resolution: 192dpi),
			only screen and (                min-resolution: 2dppx) { 
			  
				.page-wrap {background-color:#ddd;zoom:.5}

			}			

			@media
			only screen and (orientation:landscape),
			only screen and (-webkit-min-device-pixel-ratio: 1.5),
			only screen and (   min--moz-device-pixel-ratio: 1.5),
			only screen and (     -o-min-device-pixel-ratio: 1.5/1),
			only screen and (        min-device-pixel-ratio: 1.5),
			only screen and (                min-resolution: 144dpi),
			only screen and (                min-resolution: 1.5dppx) { 
			  
				.page-wrap {background-color:#eee;zoom:.75}

			}			

			
			#warning-message { backgroud-color:yellow;color:red;font-size:2em;display: none; }
		*{margin:0}
		header {
			background: #000;
			color: #FFF;
			height: 6em;
			position: absolute;
			z-index: 100;
			width: 100%;
			top: 0;
		}

		html,body{height:100%;font-family:ubuntu;overflow:hidden}
		.site-footer{position:fixed;bottom:0;width:100%;z-index:100;height:4em;font-size:75% !important;background:black;color:white}
		header{background:black;color:white;height:6em}
		h2{font-family:neuropol;background-color:black;color:white;padding:1em;letter-spacing:.25em;font-size:1.5em}
		.pull-right{float:right !important;padding:1em}.pull-left{float:left !important;padding:1em}.cell{font-size:.75em;text-align:center;white-space:nowrap;vertical-align:middle;width:33%;min-width:33%;height:3em;padding:1em 0 0 0 !important}a,a:visited{color:white;text-decoration:none}a:hover{color:silver;text-decoration:underline}.btn{display:inline-block;font-family:ubuntu;text-transform:uppercase;background:black;color:white;border-radius:1em;border:0;padding:.33em .66em;margin-bottom:0;font-size:1em;font-weight:normal;line-height:1.428571429;text-align:center;white-space:nowrap;vertical-align:middle;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;-o-user-select:none;user-select:none;background-image:none}.btn:focus{outline:thin dotted;outline:5px auto -webkit-focus-ring-color;outline-offset:-2px}.btn:hover,.btn:focus{color:#333;text-decoration:none}.btn:active,.btn.active{background-image:none;outline:0;-webkit-box-shadow:inset 0 3px 5px rgba(0,0,0,.125);box-shadow:inset 0 3px 5px rgba(0,0,0,.125)}header>div>span{display:inherit}.responsive{display:block;max-height:50%;width:auto}body{padding:0 !important;margin:0 !important}
		
		/* Carousel base class */
		.carousel {
		  margin-bottom: 60px;
		}
		/* Since positioning the image, we need to help out the caption */
		.carousel-caption {
			position: absolute;
			right: 15%;
			top: 6em;
			left: 15%;
			z-index: 10;
			color: #FFF;
			text-align: center;
			text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
		}

		/* Declare heights because of positioning of img element */
		.carousel .item {
		  background-color: #eee;
		}
		.carousel-inner > .item > img {
		  position: absolute;
		  top: 0;
		  left: 0;
		  min-width: 100%;
		}
		
		</style>
	</head>
	<body>
		<header>
			<h5 style="background-color:black;color:silver;text-align:center;letter-spacing:1em;text-transform:uppercase">Content Delivery Network</h5>
			<div class="cell pull-left"><span>Maestro</span><span><?php echo $fsMaestro;?></span></div>
			<div class="cell pull-left"><span>Nano Framework JS</span><span><?php echo $fsNFJS;?></span></div>
			<div class="cell pull-left"><span>Nano Framework CSS</span><span><?php echo $fsNFCSS;?></span></div>
		</header>

		<?if ($err==true) {?>
		<div id="error">There seems to be a problem: <?echo $MSG;?></div>
		<?}else{?>
			<!-- Carousel -->
			<div id="myCarousel" class="carousel slide" data-ride="carousel" data-interval="10000">
				<div class="carousel-inner">
					<!-- Maestro Splash/Logo -->
					<div class="item active">
						<img src="http://static.i2tmlabs.com/i2tm/assets/img/maestro_logo.png" class="img-responsive dpiScale" />
					</div>
					<!-- Current Versions -->
					<div class="item">
						<img src="http://static.i2tmlabs.com/i2tm/assets/img/blank.gif" />
						<div class="container">
							<div class="carousel-caption" style="padding-bottom:25%">
								<h2 class="neuropol" style="text-align:center;padding-top:2em;">Maestro Version <? echo $LATEST_MAESTRO_VERSION;?><br /> & <br />Nano Framework Version <? echo $LATEST_NANO_VERSION;?></h3>
							</div>
						</div>
					</div>
					<!-- Total Served -->
					<div class="item">
						<img src="http://static.i2tmlabs.com/i2tm/assets/img/blank.gif" />
						<div class="container">
							<div class="carousel-caption" style="padding-bottom:25%">
								<h2><?php echo $linecount." CloudApps served!"; ?></h2>	
							</div>
						</div>
					</div>
					<!-- Visitor Info-->
					<div class="item">
						<img src="http://static.i2tmlabs.com/i2tm/assets/img/blank.gif" />
						<div class="container">
							<div class="carousel-caption" style="padding-bottom:25%">
								<h2>Detected device resolution is [<i id="dpp" class="dpp"> dpp</i> or <i id="dpi" class="dpi"> dpi</i>] and resolution is <script>document.write(screen.width+'x'+screen.height);</script>. Your IP Address is <?php echo $_SERVER['REMOTE_ADDR'];?></h4>
							</div>
						</div>
					</div>
				</div>
			</div><!-- /.carousel -->
		<?}?>			

		<footer class="site-footer">
			<div class="row">
					<span class="pull-left" style="padding-left:30px">Copyright 2012-1014 by i2tm Labs - All rights reserved.</span>
					<span class="pull-right" style="padding-right:30px"><a id="nav-privacy" href="http://apps.i2tmlabs.com/i2tm/home/privacy/">Privacy Policy</a>&nbsp;&nbsp;&nbsp;<a id="nav-terms" href="http://apps.i2tmlabs.com/i2tm/home/terms/">Terms of Service</a></span>
			</div>
		</footer>
		
		<script id="JQuery-JS" type="application/javascript" src="http://cdn.i2tmlabs.com/shared/vendors/jquery/jquery.min.js"></script>
		<script id="Bootstrap-JS" type="application/javascript" src="http://cdn.i2tmlabs.com/shared/vendors/bootstrap/js/bootstrap.min.js"></script>
		<script>
		function getStyleProp(elem, prop){
			if(window.getComputedStyle && typeof elem != null)
				return window.getComputedStyle(elem, null).getPropertyValue(prop);
			else if(elem.currentStyle) return elem.currentStyle[prop]; //IE
		}		
		
		var DEVICE = {
			DPP:getStyleProp(window.document.getElementById('dpp'), "content"),
			SW:screen.width,
			SH:screen.height,
			AW:innerWidth,
			AH:innerHeight
		}
		//document.write(DEVICE.DPP);
		/******************************************************************************
			Transforms the basic Twitter Bootstrap Carousel into Fullscreen Mode
			@author Fabio Mangolini
			 http://www.responsivewebmobile.com
		******************************************************************************/
		jQuery(document).ready(function() {
			$('.carousel').carousel({
				pause: "false",
				interval: 4000
			});

			$('.carousel').css({'margin': 0, 'width': $(window).outerWidth(), 'height': $(window).outerHeight()});
			$('.carousel .item').css({'position': 'fixed', 'width': '100%', 'height': '100%'});
			$('.carousel-inner div.item img').each(function() {
				var imgSrc = $(this).attr('src');
				$(this).parent().css({'background': 'url('+imgSrc+') center center no-repeat', '-webkit-background-size': '100% ', '-moz-background-size': '100%', '-o-background-size': '100%', 'background-size': '100%', '-webkit-background-size': 'cover', '-moz-background-size': 'cover', '-o-background-size': 'cover', 'background-size': 'cover'});
				$(this).remove();
			});

			$(window).on('resize', function() {
				$('.carousel').css({'width': $(window).outerWidth(), 'height': $(window).outerHeight()});
			});
		}); 		
		</script>
	</body>
</html>		
