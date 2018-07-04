<?php
/** 
 *   
 * @package     Maestro Server-Side 
 * @version     1.0.0 
 * @author      i2tm Labs http://i2tmlabs.com 
 * @copyright   Copyright (C) 2013 i2tm Labs 
 * @license     Private 
 **/

// Define framework version.   
define('_MAESTRO', 1);

/**
	Maestro Themed Icon Set
	color			rgb
	-------------------------------- 
	black			0,0,0		
	blue			0,0,255
	cyan			0,192,255
	green			0,255,0
	lavender		96,64,128
	neutral			127,127,127
	orange			255,128,0
	pink			240,220,230
	purple			150,0,255
	red				255,0,0
	tan				220,160,120
	teal			64,128,96
	yellow			192,192,0

*/
//Templating?
//$find = array('{VERPATH}', '{VERTYPE}');
//$value   = array($BASEPATH.'nano/'.$USE_NANO_VERSION, '.'.$USE_NANO_BUILD);
//$MAESTRO = str_replace($find, $value, $MAESTRO);

class MaestroCore
{	
	private $render = array('css'=>'','js'=>'','html'=>'');
	public $LAYOUTS = null;
	public $TEMPLATES = null;
	
	//holds all variables that are search & replace in template
	public $vars = array();
	public $publisher = "i2tm";				//$USE_PUB
	public $app = "apperror";				//$USE_APP
	public $build = "release";				//$USE_BUILD
	public $devMode = false;				//$DEVMODE
	
	public $console = array();	
	public $layout = '';
	public $params = null;
	public $doc = null;							//CloudApp JSON Config
	public $user = null;

    //browser objects    
    //public $browser;
    //public $platform;
    
    public static function getInstance()
    {
        static $instance;
        if (!isset($instance)) {
            $instance = New MaestroCore();
        }
        return $instance;
    }
    
	public function getVars() {
		return $this->vars;
	}

    public function __construct()
    {
    	global $USE_PUB, $USE_APP, $USE_BUILD, $DEVMODE;
    	 
		$this->publisher = $USE_PUB;				
		$this->app = $USE_APP;		
		$this->build = $USE_BUILD;					
		$this->devMode = $DEVMODE;	
		error_reporting(E_ERROR);	
		$this->ERRORS=array();
		
		$this->log('Request: Publisher=' . $this->publisher . ", Application=" . $this->app . ", Developer Mode=" . $this->devMode);
		
		$this->TEMPLATES=array(
			'brushed',
			'cover',
			'justified-nav',
			'starter'
		);

		$this->LAYOUTS=array(
			'Blog'=>'blog.html',
			'Carousel'=>'carousel.html',
			'Cover Page'=>'coverpage.html',
			'Dashboard'=>'dashboard.html',
			'Default'=>'default.html',
			'Enhanced Nav Panel'=>'enhanced_nav_panel.html',
			'Floating Narrow'=>'example.floating-narrow.html',
			'Fixed Navigation & Footer'=>'fixed_nav_footer.html',
			'Jumbotron Narrow'=>'jumbotron-narrow.html',
			'Jumbotron Wide'=>'jumbotron-wide.html',
			'Marketing'=>'marketing.html',
			'Off Canvas'=>'offcanvas.html',
			'Showcase'=>'showcase.html',
			'Starter'=>'starter.html'
		);
		
		$this->publishers = scanPublishers();
		$this->apps = scanApps();
		scanAllApps();
		
		//try	{
			//$this->auth();
		//} catch( Exception $e ){ 
		//	die(print_r($e));
		//}
		
		$this->doc = new MCloudAppCfg($this, $this->publisher, $this->app);				
		if ($this->devMode && $this->doc!=null)			
		$this->log(sprintf("Creating CloudApp %s [%s] v%s by %s",$this->doc->cfg['app']['fullname'],$this->build,$this->doc->cfg['app']['version'],$this->publisher));
		
		$this->initColors();
		
		$this->processBody();
		
		$this->vars['debug_obj'] = json_encode($this);
    }
	
	function log($msg) { array_push($this->console,$msg);}

	function error($msg) { array_push($this->ERRORS,$msg);}
	
	function initColors() {
		$s = $this->doc->cfg['app']['skin']; 
		$t = MaestroColor::getThemeColors($this->doc->cfg['app']['theme']);
		$this->vars['clrPri'] = 'rgba('.implode(",",$t[0]).',0.75)'; 		//Primary Color (Foreground color)
		$this->vars['clrSha'] = 'rgba('.implode(",",$t[0]).',0.55)'; 		//Primary Color Shadow (Borders)
		$this->vars['clrHig'] = 'rgba('.implode(",",$t[0]).',0.87)';		//Primary Color Highlight (link, H#)
		$this->vars['clrHov'] = 'rgba('.implode(",",$t[0]).',1.00)';		//Primary Color Hover

		//Theme Options [Dark, Medium, Light or Color] Default is Light
		if ( $s === 'dark') {			
			$this->vars['fcolor'] = 'rgba(221,221,221,.9)';
			$this->vars['scolor'] = 'rgba(0,0,0,.9)';
			
		} else if ($s === 'medium') {
			$this->vars['fcolor'] = 'rgba(160,160,160,.9)';
			$this->vars['scolor'] = 'rgba(96,96,96,.9)';
			
		} else if ($s === 'color') {
			$parr = $t[0];
			
			///average
			$avg = ($parr[0]+$parr[1]+$parr[2])/3;
			
			//normalize
			$red= ($parr[0]+128)/2;
			$grn= ($parr[1]+128)/2;
			$blu= ($parr[2]+128)/2;
			
			if ($avg < 86) {
				//go lighter on font
				$red=floor($red*1.5); $grn=floor($grn*1.5); $blu=floor($blu*1.5); 
			} else if ($avg > 168) {
				//go darker on font
				$red=floor($red*0.5); $grn=floor($grn*0.5); $blu=floor($blu*0.5); 
			} else {
				//neutral go black
				$red=0; $grn=0; $blu=0;
			}
			
			$t[0] = $red.','.$grn.','.$blu;
			
			$this->vars['fcolor'] = 'rgba('.$parr.',1.00)';
			$this->vars['scolor'] = 'rgba('.implode(",",$t[1]).',1.00)';
		} else {
			if ($s=='dark') {
				$parr[0] = ($t[0][0] / 2);
				$parr[1] = ($t[0][1] / 2);
				$parr[2] = ($t[0][2] / 2);
				$this->vars['scolor'] = '#333';
			} else if ($s=='light') {
				$parr[0] = ($t[0][0] +255) / 2;
				$parr[1] = ($t[0][1] +255) / 2;
				$parr[2] = ($t[0][2] +255) / 2;
				$this->vars['scolor'] = '#fff';
			} else {
				$parr[0] = $t[0][0];
				$parr[1] = $t[0][1];
				$parr[2] = $t[0][2];
				$this->vars['scolor'] = '#ddd';
			}
			$this->vars['fcolor'] = 'rgba('.implode(",",$parr).',1.00)';
			
		}
	}
	
	public function searchandreplace() {
		//$html = 
		foreach ($this->vars as $key => $value) {
			$find = ("{".$key."}");
			$this->layoutContents = str_replace($find, $value, $this->layoutContents );
		}
	}

	public function render($what) {
		if ($what=='css'&&$this->render['css']!='') 
			echo '<style id="'.$this->doc->cfg['app']['template'].'-CSS" rel="stylesheet" type="text/css">'.$this->render['css'].'</style>'; 
			
		else if ($what=='js'&&$this->render['js']!='') 
			echo '<script id="'.$this->doc->cfg['app']['template'].'-JS" type="application/javascript">/*<![CDATA[*/'.$this->render['js'].'/*]]>*/</script>';
			
		else if ($what=='html'&&$this->render['html']!='') 
			echo $this->render['html'];
			
		else return;
	}
	
	private function processBody() {
		$result = array();
		
		if (isset($this->doc->cfg['app']['template'])) {
			$template=strtolower($this->doc->cfg['app']['template']);
			$template=($template=='')?'default':$template;			
			$file = TEMPLATES.$template.'.html';
			//Load template HTML
			if (file_exists(TEMPLATES.$template.'.html')) {
				$this->render['html']=file_get_contents(TEMPLATES.$template.'.html');
			} else {
				$this->render['html']='<div class="alert alert-warning alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><strong>Error</strong> '.$template.' is not a valid Template.</div>';    			
			}		
			//Load template STYLESHEET
			if (file_exists(TEMPLATES.$template.'.css')) {
				$this->render['css']=file_get_contents(TEMPLATES.$template.'.css');
			}		
			//Load template SCRIPT
			if (file_exists(TEMPLATES.$template.'.js')) {
				$this->render['js']=file_get_contents(TEMPLATES.$template.'.js');
			}		
		} else if (isset($this->doc->cfg['app']['layout'])) {
			$layout=strtolower($this->doc->cfg['app']['layout']);
			$layout=($layout=='')?'default':$layout;
			if (file_exists(LAYOUTS.$layout.'.html')) {
				$this->render['html']=file_get_contents(LAYOUTS.$layout.'.html');
			} else {
				$this->render['html']='<div class="alert alert-warning alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><strong>Error</strong> '.$layout.' is not a valid Layout.</div>';    			
			}
		} else {
			//=-=|You must define either a TEMPLATE or LAYOUT|=-=//
			$this->render['html']='<div class="alert alert-warning alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><strong>Error</strong> You must define either a TEMPLATE or LAYOUT.</div>';    			
		}	
	}    		
	protected function auth() {
		$this->log('Authenticate');
		// start a new session (required for Hybridauth)
		session_start(); 
	  
		// change the following paths if necessary 
		$this->authcfg = MPATH_BASE . '/libs/hybridauth/config.php';
		require_once MPATH_BASE . '/libs/hybridauth/Hybrid/Auth.php';

		try{
			// create an instance for Hybridauth with the configuration file path as parameter
			$this->hybridauth = new Hybrid_Auth( $this->authcfg );

			// authenticate the current user with Twitter
			$this->user['twitter'] = $this->hybridauth->authenticate( "Twitter",array ("hauth_return_to" => "http://apps.i2tmlabs.com/login.php") ); 
			$this->user['facebook'] = $this->hybridauth->authenticate( "Facebook" ); 
			$this->user['google'] = $this->hybridauth->authenticate( "Google" ); 
			
			// get the user profile 
			//$twitter_user_profile = $this->user['twitter']->getUserProfile();

			//echo "Ohai there! U are connected with: <b>{$twitter->id}</b><br />"; 
			//echo "As: <b>{$twitter_user_profile->displayName}</b><br />"; 
			//echo "And your provider user identifier is: <b>{$twitter_user_profile->identifier}</b><br />"; 
			$this->log('Connected to twitter [{$twitter->id}]');

			// debug the user profile
			//$this->log(print_r( $twitter_user_profile,true ));

			// exp of using the twitter social api: Returns settings for the authenticating user.
			//$account_settings = $this->user['twitter']->api()->get( 'account/settings.json' );

			// print recived settings 
			//$this->log( "Your account settings on Twitter: " . print_r( $account_settings, true ));

			// disconnect the user ONLY form twitter
			// this will not disconnect the user from others providers if any used nor from your application
			//echo "Logging out.."; 
			//$this->user['twitter']->logout(); 
		}
		catch( Exception $e ){  
		// Display the recived error, 
		// to know more please refer to Exceptions handling section on the userguide
		switch( $e->getCode() ){ 
		  case 0 : $this->error("Unspecified error."); break;
		  case 1 : $this->error("HybridAuth configuration error."); break;
		  case 2 : $this->error("Provider not properly configured."); break;
		  case 3 : $this->error("Unknown or disabled provider."); break;
		  case 4 : $this->error("Missing provider application credentials."); break;
		  case 5 : $this->error("Authentication failed. The user has cancelled the authentication or the provider refused the connection."); break;
		  case 6 : $this->error("User profile request failed. Most likely the user is not connected "
					  . "to the provider and he should authenticate again."); 
				   $twitter->logout(); 
				   break;
		  case 7 : $this->error("User not connected to the provider."); 
				   $twitter->logout(); 
				   break;
		  case 8 : $this->error("Provider does not support this feature."); break;
		} 
	 
		// well, basically your should not display this to the end user, just give him a hint and move on..
		$this->error( 'ERROR: ' . $e->getMessage());
	  }
	}

	/*
	public function customstyle() {
		$style = '
			<style>
			body {
				color: {fcolor};
				background-color: {scolor};
			}

			.row {
				max-width:{width};
			}

			::-webkit-scrollbar {width: .5em}
			::-webkit-scrollbar-track {-webkit-box-shadow: inset 0 0 .25em rgba(0,128,0,0.3);-webkit-border-radius: .5em;border-radius: .5em}
			::-webkit-scrollbar-thumb {-webkit-border-radius: .5em;border-radius: .5em;background: rgba(0,128,0,0.8);-webkit-box-shadow: inset 0 0 .25em rgba(0,128,0,0.5)}
			::-webkit-scrollbar-thumb:window-inactive {background: rgba(0,128,0,0.4)}	
			
			a, h1, h2, h3, h4, h5, h6 {color:{clrPri};}
			
			a:hover 
			{color:{clrHov};}

			form input,
			form input:not([type]),
			form input[type=reset],
			form input[type=color],
			form input[type=email],
			form input[type=number],
			form input[type=range],
			form input[type=search],
			form input[type=datetime-local],
			form input[type=submit],
			form input[type=button],
			form input[type=file],
			form input[type=text],
			form input[type=url],
			form input[type=tel],
			form input[type=time],
			form input[type=week],
			form input[type=month],
			form input[type=password],
			form input.text,
			form select,
			form textarea{-webkit-appearance:none;display:block;border:0;outline-color:transparent;color:#0c0;background:#1F2f1f;box-shadow:inset 0 0 1px 0 #001000;border-radius:.35em;width:100%;-moz-transition:all .25s ease-in-out;-webkit-transition:all .25s ease-in-out;-o-transition:all .25s ease-in-out;-ms-transition:all .25s ease-in-out;transition:all .25s ease-in-out;padding:.25em}
			
			form input:hover,
			form input:not([type]):hover,
			form input[type=reset]:hover,
			form input[type=color]:hover,
			form input[type=email]:hover,
			form input[type=number]:hover,
			form input[type=range]:hover,
			form input[type=search]:hover,
			form input[type=datetime-local]:hover,
			form input[type=submit]:hover,
			form input[type=file]:hover,
			form input[type=button]:hover,
			form input[type=text]:hover,
			form input[type=url]:hover,
			form input[type=tel]:hover,
			form input[type=time]:hover,
			form input[type=week]:hover,
			form input[type=month]:hover,
			form input[type=password]:hover,
			form input.text:hover,
			form select:hover,
			form textarea:hover{color:#0f0;background:#3F4f3f}
			
			form input:focus,
			form input:not([type]):focus,
			form input[type=reset]:focus,
			form input[type=color]:focus,
			form input[type=email]:focus,
			form input[type=number]:focus,
			form input[type=range]:focus,
			form input[type=search]:focus,
			form input[type=datetime-local]:focus,
			form input[type=submit]:focus,
			form input[type=file]:focus,
			form input[type=button]:focus,
			form input[type=text]:focus,
			form input[type=url]:focus,
			form input[type=tel]:focus,
			form input[type=time]:focus,
			form input[type=week]:focus,
			form input[type=month]:focus,
			form input[type=password]:focus,
			form input.text:focus,
			form select:focus,
			form textarea:focus{color:#0c0;background:#6F8f6f}
			form textarea{min-height:10em}
			
			hr, 
			.alert-box,
			.top-bar-section .dropdown li label, 
			.panel.callout, 
			.button {
				border-color:{clrSha};
			}

			.button {
				background-color:{clrPri};
			}

			.button:hover {
				background-color:{clrHov};
			}
						
			.top-bar-section .dropdown li label 
			{color:white; background-color:{clrHig};}
			
			pre {
				text-align: left;
				font-family: 'Droid Sans Mono', Courier;
				padding: 10px 20px;
				background: rgba(255, 0, 0, 0.05);
				-webkit-border-radius: 8px;
				-khtml-border-radius: 8px;
				-moz-border-radius: 8px;
				border-radius: 8px;
				border: 1px solid rgba(255, 0, 0, 0.2);
			}
		</style>\n';	
		foreach ($this->vars as $key => $value) {
			$find = ("{".$key."}");
			$style = str_replace($find, $value, $style );
		}
		echo $style;
	}
	*/
	
}

//$maestro = MaestroCore::getInstance();
/**
 * File Loader
 *
 * This function will load file form given paths. Joomla default path style
 *
 * @access	public
 * @param	string	the directory path
 * @return	void
 */
function maestro_import($paths)
{
    $paths = str_replace("\\", '/', $paths);
    $file  = realpath(dirname(__FILE__)) . '/' . $paths . '.php';
    if (file_exists($file)) {
        include_once($file);
    } else {
        die("error: $file does not exist.");
    }
}

function maestro_log($str) {
	echo htmlspecialchars( '<!-- '.chr(13).$str.chr(13).' -->'.chr(13) );
}


function scanLayoutFolder() {

	foreach(glob($this->templatePath . '/assets/layouts/html/*.html') as $filename){
		$path_parts = pathinfo($filename);
		$this->layouts[ $path_parts['filename'] ] = $filename;
	}
	
	foreach(glob($this->templatePath . '/assets/layouts/off-canvas/*.html') as $filename){
		$path_parts = pathinfo($filename);
		$this->layouts[ $path_parts['filename'] ] = $filename;
	}	
}

function scanPublishers($filter="*") {
	$list=[];
	foreach(array_filter(glob('../cdn/static/' . $filter), 'is_dir') as $item){
		if (basename($item)!='assets'&&basename($item)!='shared')
			$list[basename($item)]=ucwords(basename($item));  
	}
	return $list;
}

function scanApps($publisher="*",$filter="*") {
	$list=[];
	
	foreach(array_filter(glob('../cdn/static/' . $publisher . '/' . $filter), 'is_dir') as $item){
		if (basename($item)!='assets'&&basename($item)!='shared')
			$list[basename($item)]=ucwords(basename($item));  
	}
	return $list;
}

function scanAllApps() {
	$list=[];
	
	foreach(array_filter(glob('../cdn/static/*'), 'is_dir') as $item){
		if (basename($item)!='assets'&&basename($item)!='shared')
			$list[basename($item)]=scanApps(basename($item));  
	}
	return $list;
}
?>   