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

if (isset($_GET['pub'])&&isset($_GET['app'])) {
	// Maestro system checks.
	@ini_set('magic_quotes_runtime', 0);
	/** Requesting specific build? ?nb=debug **/
	$USE_PUB=(isset($_GET['pub']))?$_GET['pub']:"i2tm";
	$USE_APP=(isset($_GET['app']))?$_GET['app']:"no_app_defined.nano";
	$USE_BUILD=(isset($_GET['bld']))?$_GET['bld']:"release";
	$DEVMODE=($USE_BUILD=="release")?false:true;	
	global $USE_PUB,$USE_APP,$USE_BUILD;
	//if (!$INHOUSE) $USE_BUILD='release';

	if (!defined('_MAESTRO'))
	{
		//define directory separator
		defined('DS') or define('DS', '/');
		
		$STATIC_URI='http://static.i2tmlabs.com/';
		$CDN_DIR='http://cdn.i2tmlabs.com/';
		$ROOT_DIR='/public_html/';
		$FRAMEWORK='../cdn/framework/';
		$VENDOR='../cdn/vendor/';
		$TIMESTAMP=strftime("%Y.%m.%d.%H%M%S"); //2014.01.01.123456
		$LATEST_NANO_VERSION="1.0.0";
		$LATEST_MAESTRO_VERSION="1.7.5";
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
	ob_start();
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
?>
<!DOCTYPE html>
<html lang=en data-maestro="<?php echo $LATEST_MAESTRO_VERSION;?>">
<head>
<script>appts={start:performance.now()};</script>
<meta http-equiv=content-type content="text/html;  charset=utf-8">
<title><?php echo $maestro->doc->cfg['app']['fullname'];?></title>
<meta name=viewport content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-touch-fullscreen" content="yes">
<meta name=description content="<?php echo $maestro->doc->cfg['app']['description'];?>">
<link rel="shortcut icon" type="image/x-icon" href="http://static.i2tmlabs.com/i2tm/assets/img/favicon.ico" />		
<?php if ($maestro->doc->cfg['modules']['modernizr']) {	
	$MODERNIZRJS=file_get_contents('http://cdn.i2tmlabs.com/vendor/modernizr/modernizr.min.js');
?>
<script id=Modernizr-JS type="application/javascript">/*<![CDATA[*/<?php echo $MODERNIZRJS;?>/*]]>*/</script>
<?php }	?>
<?php if ($RENDER_CODE) {?>
<style rel="stylesheet" type="text/css"><?php echo $MAESTROCSS;?></style>
<?php } ?>
<?php $maestro->render('css');?>

</head>
<body>
<div id=wrapper class=opacity0>
<?php 
if( sizeof($maestro->ERRORS) > 0){
	foreach ($maestro->ERRORS as &$msg) {
	?>
		<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><strong>Error</strong><? echo $msg; ?></div>
	<?php }
	$maestro->render('html');
}
?>
</div>
<span id=splash class=loader>One Moment Please</span>
<div id=tail class="dpp dpi mdw" style="display:none;visibility:hidden">
<i id=dpp></i><i id=dpi></i><i id=mdw></i>
<?php if (!$DEVMODE) {?>	
<script id="Maestro-JS" type="application/javascript"><?php echo $MAESTROJS;?></script>
<?php }else{ ?>
<script id=Maestro-JS type="application/javascript" src="<?php echo 'http://cdn.i2tmlabs.com/framework/maestro/js/maestro.debug.js';?>"></script>
<?php } ?>
<?php 
$maestro->render('js');
?>			
<script>
function MaestroReady(){appts.maestrodone=performance.now();console.log("Ready.")}
<?php 
echo "M$['config'] = " . $maestro->doc->json .";";
if ($DEVMODE) echo "M$['phpDebug'] = ".$maestro->vars['debug_obj'].";";
?>
</script>	
</div>
<script>appts.docloaded=performance.now();</script>
</body>
</html>
<?php } ?>
