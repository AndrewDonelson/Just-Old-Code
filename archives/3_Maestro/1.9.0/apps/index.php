<?php
/**
 * @package    Maestro.Site
 *
 * @copyright  Copyright (C) 2012 - 2014 I2TM Labs - All rights reserved.
 * @license    private
 */

if (version_compare(PHP_VERSION, '5.3.1', '<'))
{
	die('Your host needs to use PHP 5.3.1 or higher to run this version of Maestro!');
}

/**
 * Constant that is checked in included files to prevent direct access.
 * define() is used in the installation folder rather than "const" to not error for PHP 5.2 and lower
 */
define('_MEXEC', 1);

if (!defined('_MAESTRO')) {
	
	$LATEST_NANO_VERSION="1.0.0";
	
	$LATEST_MAESTRO_VERSION="1.8.6";
	
	//define directory separator
	defined('DS') or define('DS', '/');

	/** Requesting specific build? ?nb=debug **/
	$USE_BUILD=(isset($_GET['bld']))?$_GET['bld']:"release";
	$USE_BUILD=(isset($_GET['debug_host']))?$USE_BUILD:"debug";			//Debugger running?
	$DEVMODE=($USE_BUILD=="release")?false:true;
	
	/*
	 If either pub or app is NOT set then default to app store
	*/
	if (!isset($_GET['pub'])||!isset($_GET['app'])) {
		$USE_PUB="maestro";
		$USE_APP="store";
	} else {
		$USE_PUB=$_GET['pub'];
		$USE_APP=$_GET['app'];
	}

	// Maestro system checks.
	@ini_set('magic_quotes_runtime', 0);

	global $USE_PUB,$USE_APP,$USE_BUILD, $DEVMODE;
	//if (!$INHOUSE) $USE_BUILD='release';
	
	if ($DEVMODE) {
		$CDN_DIR='//localhost/i2tmlabs.com/cdn/';
		$STATIC_URI=$CDN_DIR . 'static/';
	} else {
		$CDN_DIR='//cdn.i2tmlabs.com/';
		$STATIC_URI='//static.i2tmlabs.com/';
	}
	
	$ROOT_DIR='/public_html/';
	$FRAMEWORK='../cdn/framework/';
	$VENDOR='../cdn/vendor/';
	$TIMESTAMP=strftime("%Y.%m.%d.%H%M%S"); //2014.01.01.123456
			
	$MSG="CLOUDAPP REQUEST [".$TIMESTAMP."]\n\r";
	$err=false;
	//Only in-house can get source code, and dont count sends
	$INHOUSE=($_SERVER['REMOTE_ADDR']=='99.53.100.7'||$_SERVER['REMOTE_ADDR']=='127.0.0.1')?true:false;
	
	defined('PUBFOLDER') or define('PUBFOLDER', '../cdn/static/' . $USE_PUB . DS);
	defined('APPFOLDER') or define('APPFOLDER', PUBFOLDER . $USE_APP . DS);
	
	define('MPATH_BASE', __DIR__);
	require_once MPATH_BASE . '/libs/appcfg.php';
	require_once MPATH_BASE . '/libs/color.php';
	require_once MPATH_BASE . '/libs/maestro.php';

	//declare global var
	$maestro = new MaestroCore();
	global $maestro;
}

$maestro->log('POST Vars: ' . print_r($_POST,true));				
$maestro->log('GET Vars: ' . print_r($_GET,true));				
$maestro->log('SERVER Vars: ' . print_r($_SERVER,true));				

$maestro->log('check for contact form submission?');				
if (isset($_POST['contactform'])) {
	$maestro->log('Processing contact form...');				
	$errors = '';
	$recipients = array(
		'andrew@donelson.net',
		'carolyn@donelson.net'
	);
	$myemail = implode(',', $recipients);
	if(empty($_POST['name'])  || 
	   empty($_POST['email']) || 
	   empty($_POST['subject']) || 
	   empty($_POST['message']))
	{
		$maestro->error( 'ERROR: All fields are required.');
	}
	 
	$name = $_POST['name']; 
	$email_address = $_POST['email']; 
	$subject = $_POST['subject']; 
	$message = $_POST['message']; 
	 
	if (!preg_match(
	"/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i", 
	$email_address))
	{
		$errors .= "\n Error: Invalid email address";
		$maestro->error('ERROR: Invalid email address.');
	}

	if( empty($errors)) {		 
		$maestro->log('Attempting to send email...');				
		
		$to = $myemail;
		 
		$email_subject = "WFG: $name [$subject]";
		 
		$email_body = "You have received a new message. ".
		 
		" Here are the details:\n Name: $name \n ".
		 
		"Email: $email_address\n Message \n $message";
		 
		$headers = "From: $myemail\n";
		 
		$headers .= "Reply-To: $email_address";
		 
		$sentmail = @mail($to,$email_subject,$email_body,$headers);	
		
		if (!$sentmail) {
			$maestro->error('Could not send the email.');				
		} else {
			$maestro->log('Mail Sent, Thank You!');
		}
	}
} //end contactform

$maestro->log('Preparing Code Base.');				

$MODERNIZRJS=file_get_contents('http://cdn.i2tmlabs.com/vendor/modernizr/modernizr.min.js');

$USE_MAESTRO=$FRAMEWORK.'maestro/js/maestro.'.$USE_BUILD.'.js';
$MSG.="Maestro JS: ".$USE_MAESTRO;
$MAESTROJS=file_get_contents($USE_MAESTRO);

$USE_MAESTRO_CSS=$FRAMEWORK.'maestro/css/maestro.'.$USE_BUILD.'.css';
$MSG.="- Maestro CSS: ".$USE_MAESTRO_CSS;
$MAESTROCSS=file_get_contents($USE_MAESTRO_CSS);

$MSG.='- Publisher: '.$USE_PUB.', CloudApp: '.$USE_APP."\n";
		
$APP_ASSETS_DIR=sprintf($STATIC_URI.'%s/%s/',$USE_PUB,$USE_APP);	
$MSG.="Application Assets Folder is ".$APP_ASSETS_DIR;

if ($err==false)
	$MSG.="Using Maestro [".$USE_BUILD."v".$LATEST_MAESTRO_VERSION."] & Sent Nano FW [".$LATEST_NANO_VERSION."][".$USE_BUILD."]";
else 
	$MSG.="Aborted.";
	

/** Create Log Entry if not in-house **/
if (!$INHOUSE) {
	$LOG=sprintf("%s\t%s\t%s\n",$TIMESTAMP,$_SERVER['REMOTE_ADDR'],$MSG);	
	file_put_contents("./nano.log", $LOG, FILE_APPEND);
}else{
	$LOG=sprintf("%s\t%s\t%s\n",$TIMESTAMP,$_SERVER['REMOTE_ADDR'],$MSG);	
	file_put_contents("./nano.dev.log", $LOG, FILE_APPEND);
}

$maestro->log($LOG);
//if (substr_count($_SERVER['HTTP_ACCEPT_ENCODING'], 'gzip')) ob_start("ob_gzhandler"); else 
/** Send maestro with desired framework version **/
// seconds, minutes, hours, days
if ($err==false) {
} else {	
	exit;
}
	
$RENDER_APPFILE 	= ($maestro->doc!='')?true:false;
$RENDER_APPNAME 	= $RENDER_APPFILE;
$RENDER_CODE 		= ($MAESTROJS=='')?false:true;
$maestro->log("Start document render.");
ob_start();
?>
<!DOCTYPE html>
<html lang=en data-maestro="<?php echo $LATEST_MAESTRO_VERSION;?>">
<head>
<?php if ($DEVMODE==true) {?>
<script>
/** Written by Andrew Donelson <@AndrewDonelson> - Copyright 2014 by i2tm Labs - All rights reserved. */
window.dbg=function(){function f(c){var b=c.slice(-1),d=c.slice(-3),e=h++ +"\t@\t"+Math.round((new Date).getTime()/1E3)+"\t";a.value+="..."===d?e+c+"\n":"."===b?e+c+"\n":e+c+".\n";a.scrollTop=a.scrollHeight}var b=" v1.0.0\tWritten by Andrew Donelson <@AndrewDonelson> - Copyright 2014 by i2tm Labs - All rights reserved.\n{position:fixed;height:5%;bottom:52px;left:5%;width:90%;z-index:1000000;background-color:rgba(128,128,128, 0.85);color:black;font-family:Ubuntu;font-size:18px{application/x-www-form-urlencoded{Content-Type{Msxml2.XMLHTTP{textarea{cmcdata{http://cdn.i2tmlabs.com/cmc.php{CmC hooked into onError() and Attached to DOM.".split("{"),h=0,g=0,a=document.createElement(b[5]);a.id="CmC";a.value=a.id+b[0];a.readOnly=!0;a.spellcheck=!1;a.setAttribute("style",b[1]);a.onfocus=function(){this.style.height="50%"};a.onblur=function(){this.style.height="5%"};g=setTimeout(function(){if (document.body){document.body.appendChild(a);}clearTimeout(g);f(b[8])},1E3);return function(){1===arguments.length&&"String"===arguments[0].constructor.name&&f(arguments[0]);return a}}();
dbg('Top of Document.');
</script>
<?php } else echo "<script>function dbg(){}</script>";?>
<meta http-equiv=content-type content="text/html;  charset=utf-8">
<title><?php echo $maestro->doc->cfg['app']['fullname']; ?></title>
<meta name=viewport content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<meta name="apple-mobile-web-app-capable" content="yes">
<!--[if IE]><meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1'><![endif]-->
<meta name="apple-touch-fullscreen" content="yes">
<meta name=generator content="<?php echo 'Maestro v' . $LATEST_MAESTRO_VERSION ?>">
<meta name=description content="">
<meta name=keywords content="">
<link rel="shortcut icon" type="image/x-icon" href="http://static.i2tmlabs.com/i2tm/assets/img/favicon.ico" />		
<style rel="stylesheet" type="text/css"><?php echo file_get_contents($FRAMEWORK.'maestro/css/production.css') . $MAESTROCSS;?></style>
<style>
/** Dynamic **/
.skin{background-color:<?php echo $maestro->vars['scolor'];?>;color:<?php echo $maestro->vars['fcolor'];?>}

h1,h2,h3,h4,h5,h6,
a,a:visited {color:<?php echo $maestro->vars['clrHig'];?>}

a:hover,a:active {color:<?php echo $maestro->vars['clrHov'];?>}

</style>
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<script id="NANOJS" type="application/javascript"><?php 
echo $MODERNIZRJS . file_get_contents($FRAMEWORK.'maestro/js/production.js');
?>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-35732532-1', 'auto');
ga('send', 'pageview');
</script>
</head>
<body class="skin">
<div id=bg1 class="bg layer-1 i2tm-bg opacity100"></div>
<div id=bg2 class="bg layer-2 opacity100"></div>
<div id=bg3 class="bg layer-3 opacity100"></div>
<div id=wrapper class="wrapper opacity100">
</div>
<div id="adbar" class="skin navbar-fixed-bottom">
	<div class="adSlot">
		<!-- adSlot01 -->
		<ins class="adsbygoogle"
			 style="display:inline-block;width:320px;height:50px"
			 data-ad-client="ca-pub-7431399643348196"
			 data-ad-slot="8977969668"></ins>
		<script>
		(adsbygoogle = window.adsbygoogle || []).push({});
		</script>		
	</div>
	<div class="adSlot hidden-xs">
		<!-- adSlot2 -->
		<ins class="adsbygoogle"
			 style="display:inline-block;width:320px;height:50px"
			 data-ad-client="ca-pub-7431399643348196"
			 data-ad-slot="1873505262"
			 data-ad-format="auto"></ins>
		<script>
		(adsbygoogle = window.adsbygoogle || []).push({});
		</script>
	</div>
	<div class="adSlot hidden-xs hidden-sm">
		<!-- adSlot3 -->
		<ins class="adsbygoogle"
			 style="display:inline-block;width:320px;height:50px"
			 data-ad-client="ca-pub-7431399643348196"
			 data-ad-slot="3350238464"
			 data-ad-format="auto"></ins>
		<script>
		(adsbygoogle = window.adsbygoogle || []).push({});
		</script>
	</div>
	<div class="adSlot hidden-xs hidden-sm hidden-md">
		<!-- adSlot4 -->
		<ins class="adsbygoogle"
			 style="display:inline-block;width:320px;height:50px"
			 data-ad-client="ca-pub-7431399643348196"
			 data-ad-slot="6303704867"
			 data-ad-format="auto"></ins>
		<script>
		(adsbygoogle = window.adsbygoogle || []).push({});
		</script>
	</div>
</div>
<div id=tail class="vanish dpp dpi mdw">
<i id=dpp></i><i id=dpi></i><i id=mdw></i>
<?php if ($DEVMODE==true) {?>	
<script id=Maestro-JS type="application/javascript" src="<?php echo 'http://cdn.i2tmlabs.com/framework/maestro/js/maestro.debug.js';?>"></script>
<?php } ?>			
<script>
<?php if ($DEVMODE==false) {echo $MAESTROJS;} ?>
function MaestroReady(){dbg("MaestroReady called.")}
<?php 
if ($maestro->doc->json) 
	echo "M$['config'] = " . $maestro->doc->json .";";

if ($DEVMODE==true) 
	echo "M$['phpDebug'] = ".json_encode($maestro).";";
?>
</script>	
</div>
<?php
if ($DEVMODE) echo "<script>dbg('Bottom of Document.');</script>";
?>
</body>
</html>
<?php  
ob_end_flush();
?>
