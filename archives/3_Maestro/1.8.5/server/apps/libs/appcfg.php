<?php
/** 
 *   
 * @package     Maestro Server-Side 
 * @version     1.0.0 
 * @author      i2tm Labs http://i2tmlabs.com 
 * @copyright   Copyright (C) 2013 i2tm Labs 
 * @license     Private 
 **/

defined('_MEXEC') or die('Restricted Access.');

/**
 * CloudAppCfg Class
 *
 * This class handles the Cloud Application (JSON) Configuration. It makes sure all variables are initialized and valid
 * as well as providing read/write to filesystemn as well as compiling into nano for production
 *
 */
class MCloudAppCfg
{

	private $owner = null;
	/**
	 * @var    string Original URI
	 * @since  1.0
	 */
	protected $cfgpath = null;

	/**
	 * @var    boolean True if error with config
	 * @since  1.0
	 */
	public $cfgerr = false;

	/**
	 * @var    string  Protocol
	 * @since  1.0
	 */
	public $cfg = null;

	/**
	 * @var    string  Protocol
	 * @since  1.0
	 */
	public $json = null;
	
	/**
	 * Constructor.
	 * You can pass a URI string to the constructor to initialise a specific URI.
	 *
	 * @param   string  $uri  The optional URI string
	 *
	 * @since   11.1
	 */
	public function __construct($parent, $pub='i2tm',$app='apperror')
	{
		$this->owner = $parent;
		$this->getApplication();
	}

	private function validate($key,$in=Array(),$default) {
		if (sizeOf($in)>0 && !@array_key_exists($key,$in)) 
			$in[$key]=$default;
	}
		
	private function initialize($data) {
		if (is_array($data)) {
		
			//Verify APP Section
			$this->validate('name',$data['app'],'noname');								//required, lowercase
			$this->validate('version',$data['app'],'0.0.0');							//required
			$this->validate('uuid',$data['app'],'ERROR');								//required
			$this->validate('role',$data['app'],'application');							//required
			$this->validate('publisher',$data['app'],'shared');							//required
			$this->validate('template',$data['app'],'starter');							//required
			$this->validate('theme',$data['app'],'silver');								//required
			$this->validate('fullname',$data['app'],$data['app']['name']);				//optional
			$this->validate('skin',$data['app'],'light');								//optional
			$this->validate('author',$data['app'],'');									//optional
			$this->validate('copyright',$data['app'],'');								//optional
			$this->validate('description',$data['app'],'');								//optional
			$this->validate('keywords',$data['app'],'');								//optional
		}		
		return $data;
	}
	
	private function getApplication() {
		
		$result = $this->load(false);

		//if invalid theme set to silver
		if (!isset($this->json['app']['theme']) || !array_key_exists($this->cfg['app']['theme'], MaestroColor::$THEMES)) {
			$this->cfg['app']['theme']='silver';
		}	
		$this->cfg['app']['skin']=(!isset($this->cfg['app']['skin']))?'light':$this->cfg['app']['skin'];
		
		//Modules
		$this->cfg['modules']['modernizr']=(!isset($this->cfg['modules']['modernizr']))?true:$this->cfg['modules']['modernizr'];
		$this->cfg['modules']['font-awesome']=(!isset($this->cfg['modules']['font-awesome']))?true:$this->cfg['modules']['font-awesome'];
		$this->cfg['modules']['masonry']=(!isset($this->cfg['modules']['masonry']))?true:$this->cfg['modules']['masonry'];

		return $result;
	}
	
	/** 
	 * Clean comments of json content and decode it with json_decode(). 
	 * Work like the original php json_decode() function with the same params 
	 * 
	 * @param   string  $json    The json string being decoded 
	 * @param   bool    $assoc   When TRUE, returned objects will be converted into associative arrays. 
	 * @param   integer $depth   User specified recursion depth. (>=5.3) 
	 * @param   integer $options Bitmask of JSON decode options. (>=5.4) 
	 * @return  string 
	 */ 
	function json_clean_decode($json, $assoc = false, $depth = 512, $options = 0) { 

		// search and remove comments like /* */ and // 
		$json = preg_replace("#(/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+/)|([\s\t](//).*)#", '', $json); 

		if(version_compare(phpversion(), '5.4.0', '>=')) 
		{ 
			$json = json_decode($json, $assoc, $depth, $options); 
		} 
		elseif(version_compare(phpversion(), '5.3.0', '>=')) 
		{ 
			$json = json_decode($json, $assoc, $depth);
		} 
		else 
		{ 
			$json = json_decode($json, $assoc); 
		} 

		return $json; 
	} 	
	
	/**
	 * loads the cloudapp configuration file
	 * 
	 * @param 	boolean		$compiled		set to true to load compiled version
	 */ 
	protected function load($compiled=true) {
		
		$file = APPFOLDER . $this->owner->app  . '.json';
		//if (!$compiled) {
			//Use JSON for dev mode
			if(file_exists($file)) {
				//Load CloudApp File
				$NOT_COMPILED=true;
				$this->json = file_get_contents($file);
			} else {
				$this->cfgerr=true;
				array_push($this->owner->ERRORS, 'ERROR: cannot load application configuration file.\n' . $f);
				return false;		
			}
		//} else {
			//Use NANO for production mode Encoded & zipped
		//	if(file_exists($this->cfgpath.'/cloudapp.nano')) {
				//Load CloudApp File
		//		$NOT_COMPILED=false;
		//		$this->json = file_get_contents($this->cfgpath.'/cloudapp.nano');
		//	} else {
		//		$this->cfgerr=true;		
		//	}
		//}

		$this->cfg=$this->initialize((!$this->cfgerr)?$this->json_clean_decode($this->json,true):array());
		return true;
	}
	
	/**
	 * saves the current cloudapp configuration in memory to disk
	 * 
	 * @param 	boolean		$compiled		set to true to load compiled version
	 * 
	 */
	protected function save($compiled=true) {
		if (!$compiled) {
			//Use JSON for dev mode
			if(file_exists(APPFOLDER.$this->owner->app)) {
				//Load CloudApp File
				$NOT_COMPILED=true;
				$result=file_put_contents(APPFOLDER.$this->owner->app,$this->cfg);
			} else {
				$this->cfgerr=true;		
			}
		} else {
			//Use NANO for production mode Encoded & zipped
			if(file_exists($this->cfgpath.'/cloudapp.nano')) {
				//Load CloudApp File
				$NOT_COMPILED=false;
				
				// encode the file using base64
				$data = base64_encode($this->cfg);				
				$result=file_put_contents($this->cfgpath.'/cloudapp.nano',$data);
			} else {
				$this->cfgerr=true;		
			}
		}
	}
}
