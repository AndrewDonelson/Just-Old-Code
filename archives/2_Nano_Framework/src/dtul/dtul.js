/**
 * @object dtul
 * @author Andrew Donelson  <andrew@i2tmlabs.com>
 * @version {VERSION}
 * @distro {DISTRO}
 * 
 * <h1>H5C3 Framework Developer Tools & Utilities Layer {DISTRO}-{VERSION}</h1>
 *
 * <p>
 * This object provides everything needed to create, encode and otherwise manage webapps, applets, and components for the H5C3 Framework. It is referred to as the Developer Tools and Utilities Layer (DTUL).
 * This object is only available through the Official Website. 
 * </p>
 *
 * 	Features
 *	========
 *	<pre>
 *	</pre>
 */
if (!nano) nano={};

$n.df.dtul = {

	/**
	 * @property String NAME
	 *
	 * Holds the name of this framework
	 */
	NAME: 'Developer Tools and Utilities Layer',
	/**
	 * @property String VERSION 
	 *
	 * Holds the current version of the framework
	 */
	VERSION: '{VERSION}',
	/**
	 * @property String DISTRO 
	 *
	 * Holds the distribution tag of the framework
	 */
	DISTRO: '{DISTRO}',
	/**
	 * @property String DISTRO 
	 *
	 * Holds the distribution tag of the framework
	 */
	BUILT: '{TIMESTAMP}',

	/**
	 * @property Boolean 	devMode 		
	 * True if we are debugging, False otherwise
	 */
	devMode: false,
	
	/**
	 * @constructor init()
	 * 
	 * Initialization
	 * @return {boolean}
	 */
	init: function() {
		_DBG_("Initializing...",this);
		
		this.devMode = (this.DISTRO==="Developer") ? true : false;
		if (window.console) console.log(this.tag()+' -> devMode ['+$n.df.dtul.devMode+']');
	},
	/**
	 * @method tag()
	 * 
	 * Returns the layers current Name
	 * 
	 * @return String	Full name and version of the framework.
	 */
	tag: function() { return this.NAME+' v'+this.VERSION+'-'+this.DISTRO; },

	/**
	 * @method version()
	 * 
	 * inserts Library info into html elements or Returns as single string
	 * 
	 * @return String	Full name and version of the framework.
	 */
	version:function($html) {
		try {
			if ($html===true) {
				GEI("dtulbuilt").innerHTML = "Build Date: "+$n.df.dtul.BUILT;
				GEI("dtulversion").innerHTML = "Version: "+$n.df.dtul.DISTRO+'-'+$n.df.dtul.VERSION;
			}
		} catch (e) {
			_DBG_("ERROR: Unable to insert version info into elements [dtulversion] or [dtulbuilt].",this);
		} finally {
			return this.tag() +"["+$n.df.dtul.BUILT+"]";
		}
	},
	makeHeader:function($role,$name,$version,$uuid) {
		if (!VLD($role)) $role = "applet";
		if (!VLD($name)) $name = "Noname";
		if (!VLD($version)) $version = "0.0.1";
		if (!VLD($uuid) || !$$header.validUUID($uuid)) $uuid = $header.generateUUID();
		
		var html = '<div ';
		html+='	data-role="'+$role+'" ';
		html+='	data-name="'+$name+'" ';
		html+='	data-version="'+$version+'" ';
		html+='	data-uuid="'+$uuid+'" ';
		html+='	data-author="" ';
		html+='	data-copyright="" ';
		html+='	data-scale="1" ';
		html+='/>\n';

		return html;
	},
	
    /**
	 * @method verify()
	 *
	 * Scans a applet and verifies that it is contructed/configured correctly. All applets need a minimum
	 * of 4 data attributes (role, name, version and uuid)
     * 
	 * @param
	 * None
	 *
	 * @return 
	 * None
     */		
	verify_applet:function($applet,$autofix) {
		var $result,$uuid,$name,$version,$wrapper,$content = false;
		var $msg="Validating->";
		$result=0;

		//Check for applet role
		if (!VLD($applet.dataset.role)) {
			$msg+="Missing data-role->"
			if ($autofix) {
				$applet.dataset.role="applet";
				$msg+="Fixed->"; 
			} else $result++;
		} //End Role
		
		if (!VLD($applet.dataset.name)) {
			$msg+="Missing data-name->";
			if ($autofix) {
				$applet.dataset.name="GIVE_ME_A_NAME";
				$msg+="Fixed->"; 
			} else $result++;

		} else if ($applet.dataset.name==="") {
			$msg+="data-name is empty->";
			if ($autofix) {
				$applet.dataset.name="GIVE_ME_A_NAME";
				$msg+="Fixed->"; 
			} else $result++;
		} //End Name
		
		if (!VLD($applet.dataset.version)) {
			$msg+="Missing data-version->";
			if ($autofix) {
				$applet.dataset.version="0.0.1";
				$msg+="Fixed->"; 
			} else $result++;
		} else if ($applet.dataset.version==="") {
			$msg+="data-version is empty->";
			if ($autofix) {
				$applet.dataset.name="0.0.1";
				$msg+="Fixed->"; 
			} else $result++;
		} //End Version
		
		//Validate/Create UUID
		if (!mwdl.validUUID($applet.dataset.uuid)) {
			$msg+="Missing data-uuid->"
			if ($autofix) {
				if ($applet.dataset.uuid = mwdl.generateUUID()) {
					$msg+="Created UUID->"; 
				} else {
					$msg+="Aborted: Unable to generateUUID."; 
				}
			} else $result++;
		} //End UUID
			
		if ($result===0 && $autofix!=true) {
			$msg+="PERFECT!->"; 		
		} else {
			$msg+="Failed ("+$result+") issues->"; 		
		}
		$msg+="Done."; 		
		return {result:$result,message:$msg,applet:$applet}		
	}
};
