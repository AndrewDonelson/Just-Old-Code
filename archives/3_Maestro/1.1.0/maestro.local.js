/**
 * @project maestro
 * @author Andrew Donelson <andrew@i2tmlabs.com>
 * @license http://i2tmlabs.com/license.html
 */

/**
 * @classdesc <h1>Maestro <small>Object</small></h1> 
 * <img src="http://code.nanofw.com/i2tm/img/maestro_logo.png" style="display:block;max-width:100%;height:auto;">
 * <p>Maestro is the main object or interface for the Nano Framework.</p>
 * <p>It is time to take control of your web applications. There are plenty of 
 * libraries and frameworks out there but none are designed to work together. 
 * That is where Nano Framework comes in. We decided on Bootstrap for document 
 * structure and flow and jQuery for JavaScript coding. We have also added 
 * Modernizr for maximum compatibility and Font-Awesome for even more fonts.
 * </p>
 * <div>
 * <h3>Features</h3>
 * <ul>
 * <li>XCORS Ajax</li>
 * <li>Base64 Encoding & Decoding</li>
 * <li>Lempel–Ziv–Welch universal lossless compression</li>
 * <li>Integrated Versions Object (Even Bootstrap)</li>
 * <li>Auto Loading</li>
 * <li>Designed to manage and enhance Bootstrap</li>
 * <li>Packager for Apps, Applets and Modules.</li>
 * <li>Structured and Modular design for more versatile reuse of assets.</li>
 * </ul>
 * </div>
 * <div>
 * <h3 style="color:orange">
 * Please note that while there is no charge to develop with the Nano Framework the 
 * software is private commercial code and there are some basic restrictions. It IS
 * designed and built for developers. It's purpose is to allow developers to create
 * versatile web applications that work on any platform with ease as well as having
 * little to no development costs or licensing fees. You can only load the library
 * from i2tm Labs CDN - Your ARE NOT authorised to load locally from your web server.
 * To learn more please visit the website for complete licensing and detailed information.
 * </h3>
 * </div>
 * 
 * <p>There are two ways in which you can load and use the the Nano Framework:</p>
 *
 * <h3>Normal Web Document Mode</h3>
 *
 * <p>This gives you Modernizr, Bootstrap, jQuery, Font-awesome and the Nano Framework
 *  but the the Nano framework will just load the libraries efficiently in the order 
 * and location they belong. It will not parse the CloudApp Configuration JSON so the 
 * framework will terminate execution, but you have access if you want to use this and 
 * that. So at the very least you can use ONE line of code to load all popular libraries
 * and just start coding.</p>
 * 
 * <h3>Nano CloudApp Mode</h3>
 *
 * <p>
 * This mode will handle just about everything for you. Loading the libraries, creating and 
 * embedding the correct meta tags including Author, Copyright with auto date update for year,
 * etc. It also provides local storage for application, publish, global and user settings and 
 * information. Applets for Rapid Application development - Applets have their styling and 
 * JavaScript embedded with them and they are encoded and compressed into a package. Applets 
 * can be included with a single line of code. You also get access to the Game Library (2DGL)
 * Layouts, Skins Smart Color, Dynamic Configurations and more. 
 * </p>
 *
 * @todo Add support for inverse loader (black on white and white on black) in application attributes
 * @namespace
 * @name maestro
 * @copyright 2012-2014 by i2tm Labs - All rights reserved
 */
(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "maestro requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

	var
		version = "1.1.3",
		devMode = false,
		vars = {NF:false},

		/**
		 * Define a local copy of maestro
		 *
		 * @constructor
		 * @param {string}	selector	a short description
		 * @param {string}	content		a short description
		 * @type contructor
		 * @returns object
		 */
		maestro = function( selector, context ) {
			// The maestro object is actually just the init constructor 'enhanced'
			// Need init if maestro is called (just allow error to be thrown if not included)
			if ( maestro.fn[selector]) 
				return maestro.fn[selector].apply( this, Array.prototype.slice.call( arguments, 1 ));
			else
				return new maestro.fn.init( selector, context );
		};

	maestro.log = function($id, $type, $args) {
		var $m,$nr,$nc,$nt;
		if ($id) $id=$id; else $id = 'Unknown';
		$type=$type.toUpperCase();
		if ($args.constructor.name=='ErrorEvent'){
			$m=new String();
			$m+=('Message: '+$args.message+'<br />');
			$m+=('File: '+$args.filename+'<br />');
			$m+=('Location: [Line:'+$args.lineno+', Column:'+$args.colno+']'+'<br />');
			$m+=('Source Element: '+$args.srcElement.toString()+'<br />');
			$m+=('Product of: '+$args.isPrototypeOf.toString()+'<br />');				
			$m+=('Arguments: '+new String().concat(Array.prototype.slice.call($args.arguments))+'<br />');				
		} else if ($args.constructor.name=='Array'){
			$m=new String().concat(Array.prototype.slice.call($args));
		} else 
			$m=$args[0];

		$nr=maestro.pf.$logID.insertRow(-1);
		
		if ($type=="INFO"){$nr.className+='text-info';$nt0=maestro.s[5][6][1]+'info-sign">'}					
		else if ($type=="ERROR"){$nr.className+='text-danger';$nt0=maestro.s[5][6][1]+'remove-sign">'}
		else if ($type=="WARN"){$nr.className+='text-warning';$nt0=maestro.s[5][6][1]+'exclamation-sign">'}
		else {$type="DEBUG";$nr.className+='text-default';$nt0=maestro.s[5][6][1]+'wrench">'}
	
		$nr.insertCell(0).innerHTML=$nt0;
		$nr.insertCell(1).innerHTML='<i>'+$id+'</i>';
		$nr.insertCell(2).innerHTML=$m;

		maestro.pf.$log.push($args);
		if (window.console) console.log($m);

		if(maestro.pf.$log.length>100)
			maestro.pf.$log.shift();
	};
		
	/**
	 * Object in which all private (internal) functions are stored
	 *
	 * @class pf
	 * @static
	 * @type {object}
	 * @memberof maestro
	 */	
	maestro.pf = maestro.prototype = {
		$logID:null,
		$log:['Maestro v'+version],
		
		/** Nano framework/module Loader - Loaded the Javascript and Stylesheet
		 * Thats everything from NanoFW, Bootstrap, Font-Awesome, jQuery and Modernizr 
		 * 
		 * Verified fully functional
		 * @method ld
		 * @private
		 * @param {object} $p
		 * @returns none			 
		 * @memberof maestro.pf
		 */
		ldf:function($p) {
		
			$p.a=$p.b=$p.c=0;
			//Load Nano Framework
			$p.a=maestro.fn.doc().createElement($p.x);
			$p.z=maestro.fn.chk($p.z,'');
			$p.c=$p.z +'/'+ $p.y;
			$p.w=maestro.fn.chk($p.w,maestro.s[1][2]);
			maestro.devMode=($p.w==maestro.s[1][1])?0:1;
				
			if ($p.x==maestro.s[0][0]) {
				$p.a.async=1;			
				$p.a.src = $p.c+$p.w+maestro.s[1][3];		//.js || .debug.js
				$p.a.type = maestro.s[3][2];
				if ($p.c=maestro.fn.gei('tail')) $p.c.appendChild($p.a);
			} else {
				$p.a.href = $p.c+$p.w+maestro.s[1][4];  	//.css || .debug.css
				$p.a.rel = maestro.s[3][4];
				$p.a.type = maestro.s[3][3];
				if ($p.c=maestro.fn.gel('head'))$p.c[0].appendChild($p.a);
			}
		},
		
		/**
		 * Initialize Maestro. Creates dynamic media queries, combines with 
		 * core styling and embeds in the document using a style tag.
		 * Verified fully functional
		 * @method dmq
		 * @private
		 * @param {object} $p		null - not needed
		 * @returns none
		 * @memberof maestro.pf
		 */
		dmq:function($p) {
		
			/** create dynamic media queries 
			 * @method cmq
			 * @param {object}	$p
			 * @private
			 * @memberof dmp
			 */
			function cmq($p) {
				$p.a="";
				$p.a+=$p.b[0][0].replace($p.b[5][0],'16');
				for (i=0;i<13;i++)$p.a+=maestro.fn.sra({x:$p.b[5][1],y:$p.b[1][i],z:$p.b[0][1]});
				for (i=0;i<5;i++)$p.a+=maestro.fn.sra({x:$p.b[5][3],y:$p.b[3][i],z:maestro.fn.sra({x:$p.b[5][4],y:$p.b[4][i],z:maestro.fn.sra({x:$p.b[5][2],y:$p.b[2][i],z:$p.b[0][2]})})});
				return $p.a;
			}
			
			$p.a=$p.b=$p.c=0;
			$p.c=cmq({a:'',b:maestro.s[5]});
			//Insert Maestro (Nano Core CSS)
			$p.a=maestro.fn.doc().createElement('style');
			$p.a.rel = maestro.s[3][4];
			$p.a.type = maestro.s[3][3];
			$p.a.innerText=($p.c+maestro.s[4][0]);
			$p.a.id="maestro";
			if ($p.c=maestro.fn.gel('head'))$p.c[0].appendChild($p.a);

			//Create Maestro Common Container
			maestro.fn.aea('tail','div',"common");
			
			//Create Maestro Loader
			maestro.fn.aet('common','div',"mLoader");
			$mlUl=maestro.fn.aet('mLoader','ul',"mView");
			$tmp=maestro.s[4][1];
			for (var i=0;i<$tmp.length;i++)
				maestro.fn.aet($mlUl,'li',false,('<h1>&#98'+$tmp[i][0]+'</h1><h3>'+$tmp[i][1]+'</h3>'));
			
			//Create Maestro cPanel
			$p.a=maestro.fn.aet('common','div',"cpanel",maestro.s[5][6][0]);
			$p.a.className='closed';
			maestro.pf.$logID=maestro.fn.gei('cpText').getElementsByTagName('tbody')[0];
		}
	};
		
	/**
	 * Object in which all classes are stored
	 *
	 * 	 $n.df.AccuTimer = $n.df.Base.extend('$n.df.AccuTimer',
	 *	 { ... },
	 *	 {
	 *	 	// Singleton static class, so nothing required here
	 *	 });
	 *
	 * @class df
	 * @static
	 * @type object
	 * @memberof maestro
	 */	
	maestro.df = maestro.prototype = {
	};
	
	/**
	 * Object in which all functions are stored
	 *
	 * You can define a function in the nano namespace like this:
	 *
	 * 	 $n.fn.foo = function($params) {
	 *	  ... 
	 *	 };
	 *
	 * However it is suggested that you create a package that will be loaded. A package
	 * will allow for a private namespace and easier access.
	 * 	 var MyObject = (function( window ) {
	 *		var 
	 *			property;
	 *
	 *		method=function() {};
	 *
	 *	 	return MyObject;
	 *	})( window );
	 *
	 * @class fn
	 * @static
	 * @memberof maestro
	 */	
	maestro.fn = maestro.prototype = {
		/**
		 * Current Maestro Version
		 *
		 * @property	version
		 * @type String
		 * @memberof maestro.fn
		 */			
		maestro: version,
		/**
		 * Simple object that stores vendor library versions even Bootstrap.
		 *
		 * @class versions
		 * @static
		 * @type Object
		 * @memberof maestro.fn
		 */			
		versions:{
			/**
			 * <img src="http://code.nanofw.com/i2tm/img/nano_banner_xs.jpg">
			 * <h4>Nano Framework Version</h4>
			 *
			 * @property nf
			 * @type String
			 * @memberof versions
			 */					
			nf:'',
			/**
			 * <img src="http://code.nanofw.com/i2tm/img/bootstrap_sm.png">
			 * <h4>Bootstrap Version</h4>
			 *
			 * @property bs
			 * @type String
			 * @memberof fn.versions
			 */					
			bs:'',
			/**
			 * <img src="http://code.nanofw.com/i2tm/img/jquery_sm.png">
			 * <h4>jQuery Version</h4>
			 *
			 * @property jq
			 * @type String
			 * @memberof fn.versions
			 */					
			jq:'',
			/**
			 * <img src="http://code.nanofw.com/i2tm/img/modernizr_sm.png">
			 * <h4>Modernizr Version</h4>
			 *
			 * @property mz
			 * @type String
			 * @memberof fn.versions
			 */					
			mz:'',
			/**
			 * <img src="http://code.nanofw.com/i2tm/img/font-awesome_sm.png">
			 * <h4>Font-Awesome Version</h4>
			 * 
			 * @property fa
			 * @type String
			 * @memberof fn.versions
			 */					
			fa:''
		},

		constructor: maestro,

		// The default length of a maestro object is 0
		length: 0,
				
		/**
		 * Alias for window.document
		 * @example
		 * 		$n('doc').addEventListener('webkitfullscreenchange', $n.fn.bootstrap._onFullscreenChange);
		 * @returns document
		 * @method doc
		 * @memberof maestro.fn
		 */
		doc:function() { return window.document; },
		
		/**
		 * Alias for window.document.getElementById
		 *
		 * @example
		 * 		var element = $n('gei',"myDIV");
		 *
		 * @method gei
		 * @param {string} $p
		 * @returns CallExpression
		 * @memberof maestro.fn
		 */
		gei:function ($p) { return maestro.prototype.doc().getElementById($p); },

		/**
		 * Alias for window.document.getElementsByName()
		 *
		 * @example
		 *		var elements = $n('gen',"DIV");
		 *
		 * @method gen
		 * @param {string} $p
		 * @returns CallExpression
		 * @memberof maestro.fn
		 */
		gen:function ($p) { return maestro.prototype.doc().getElementsByName($p); },
		
		/**
		 * Alias for window.document.getElementsByClass()
		 *
		 * @example
		 *		var elements = $n('gec',"red");
		 *
		 * @method gec
		 * @param {string} $p
		 * @returns CallExpression
		 * @memberof maestro.fn
		 */
		gec:function ($p) { return maestro.prototype.doc().getElementsByClassName($p); },
		
		/**
		 * Alias for window.GET()
		 *
		 * @example
		 * 		$n('get',"head")[0].appendChild($script);
		 *
		 * @method gec
		 * @param {string} $p The tag name of the elements you want returned, ie. HEAD
		 * @returns {Collection} Returns the collection of elements with the given tag name
		 * @memberof maestro.fn
		 */
		get:function ($p) { return maestro.prototype.doc().getElementsByTagName($p); },
		
		/**
		 *  Get all data attributes for the given element.
		 *
		 * @example
		 * 		var attr = $n('gda',"APPLET");
		 *
		 * @method gda
		 * @param {string} $el Element tag name or Id you want to get the data attributes from
		 * @param {string} $id set tp true to use elements id
		 * @returns {object} Returns the object containing all attributes
		 * @memberof maestro.fn
		 */
		gda:function ($el,$useid) {
			var $result=false,$data = {};
			if ($useid==true) {
				if ($el=maestro.prototype.gei($el))
					$result=true;
			} else {
				if ($el==="html"||"body"||"head")$el=maestro.prototype.get($el)[0];
				$result=true;
			}
			if ($result===true) {
				[].forEach.call($el.attributes, function(attr) {
					if (/^data-/.test(attr.name)) {
						var camelCaseName = attr.name.substr(5).replace(/-(.)/g, function ($0, $1) {
							return $1.toUpperCase();
						});
						$data[camelCaseName] = attr.value;
					}
				});
				return $data;
			}
			return false;
		},
		
		/**
		 * 
		 * Checks node parameter. Returns an element no mater if the element is passed in or the name of an element.
		 *
		 * @example
		 * 		var $el = $n('cnt',$element);
		 *
		 * @method cnt
		 * @param {mixed} $element The name of an element or the actual element to append to
		 * @returns {element} returns the element
		 * @memberof maestro.fn
		 */
		cnt:function ($p) { 
			var $result; 
			if (typeof $p === "string") { 
				$result = maestro.prototype.gei($p);
				if (!$result) $result = maestro.prototype.get($p)[0];
			} else { 
				$result = $p; 
			} 
			
			return $result; 
		},
		
		esa:function ($el,$var,$val) { maestro.prototype.cnt($el).setAttribute($var, $val); },
		/**
		 * Alias for element.getAttribute()
		 * Get all data attributes for the given element.
		 *
		 * @example
		 * 		var btnColor = $n('ega',"button","color");
		 *
		 * @method ega
		 * @param 	{mixed}		$el 	The name of an element or the actual element
		 * @param 	{string} 	$var	The name of the attribute you want to get
		 * @returns None
		 * @memberof maestro.fn
		 */
		ega:function ($el,$var) { maestro.prototype.cnt($el).getAttribute($var); },
		
		/**
		 * Inserts a new element before a given element
		 *
		 * @example
		 * 		$n('aea','someElementID','DIV','newDivID','This is inner HTML');
		 *
		 * @method aea
		 * @param 	{mixed} 	$el 	The name of an element or the actual element
		 * @param  	{string} 	$ne 	element to insert
		 * @param  	{string}	$id 	ID of the new element
		 * @param  	{string} 	$html 	HTML to insert into new element
		 * @returns {string} 	$id    Parent nodes id
		 * @memberof maestro.fn
		 */		 
		aea:function($el,$ne,$id,$html) {
			var $el = maestro.prototype.cnt($el);
				$ne = maestro.prototype.doc().createElement($ne);
			if ($id)$ne.id=$id;
			if ($html) $ne.innerHTML=$html;
			$el.parentNode.insertBefore($ne, $el);
			return $ne;
		},
		
		/**
		 * Inserts a new element into a given element
		 *
		 * @example
		 * 		$n('aet','someElementID','DIV','newDivID','This is inner HTML');
		 *
		 * @method aet
		 * @param 	{mixed} 	$el 	The name of an element or the actual element
		 * @param  	{string} 	$ne 	element to insert
		 * @param  	{string}	$id 	ID of the new element
		 * @param  	{string} 	$html 	HTML to insert into new element
		 * @returns Element returns the element just created & appended.
		 * @memberof maestro.fn
		 */
		aet:function ($el,$ne,$id,$html) {
			var $el = maestro.prototype.cnt($el);
				$ne = maestro.prototype.doc().createElement($ne);
			if ($id)$ne.id=$id;
			if ($html)$ne.innerHTML=$html;
			$el.appendChild($ne);
			return $ne;
		},
		
		/**
		 * Check if a value is valid (not null, undefined or empty)
		 *
		 * @example
		 * 		if !($n('vld',foo)) { someFunction(); }
		 *
		 * @method vld
		 * @param {mixed}	$p 	A value
		 * @returns {boolean} true if the value is not undefined and not null 
		 * @memberof maestro.fn
		 */
		vld:function($p) { 
			return ($p==null || $p==undefined || typeof $p=="undefined") ? false:true;
		},

		/**
		 *  Checks if a param is valid (null or undefined) in which case the default value will be returned
		 *
		 * @example
		 * 		if (foo=$n('chk',foo,"bar")) { someFunction(); }
		 *
		 * @method chk
		 * @param 	{mixed} 	$p			Parameter to check
		 * @param 	{mixed} 	$def		Default value to return if p is either null or undefined
		 * @returns {mixed} 	if valid, otherwise def (default)
		 * @memberof maestro.fn
		 */
		chk:function ($p, $def) { 
			return (!maestro.prototype.vld($p)) ? $def : $p;
		},

		/**
		 *  Tests a boolean evaluation and throws an exception with the error string. (Assert)
		 *
		 * @example
		 *   	$n('ast',foo,'BOOYA!');
		 *
		 * @method ast
		 * @param  	{boolean} 	$test 	A boolean result test
		 * @param 	{string} 	$error 	A string to throw with the exception
		 * @returns none
		 * @memberof maestro.fn
		 */
		ast:function($test,$error) { if (!$test) { throw $error; } },

		/**
		 * Utility function for wrapping a callback function with its reference
		 * @method bnd
		 * @param {object} $scope
		 * @param {function} $fn
		 * @returns FunctionExpression
		 * @memberof maestro.fn
		 */
		bnd:function($scope, $fn) { 
			return function () {
				$fn.apply($scope, arguments);
			};
		},

		/**
		 * Utility function for loading javscript or Stylesheets. 
		 * No other file formats are supported.
		 * 
		 * @example $n('lds','script','path/to/some/script.js');
		 *
		 * @method bnd
		 * @param {string} $fileType either script or link
		 * @param {string} $url full path to file, local or remote
		 * @param {callback} $onLoad optional
		 * @param {callback} $onError optional
		 * @memberof maestro.fn
		 */
		lds:function($filetype,$url,$onLoad,$onError) {
			var $p={};
			if ($filetype==maestro.s[0][0]) {
				$p.a.async=1;			
				$p.a.src = $url;		//.js || .debug.js
				$p.a.type = maestro.s[3][2];
				$p.a.onLoad=$onLoad;
				$p.a.onError=$onError;
				if ($p.c=maestro.fn.gei('tail')) $p.c.appendChild($p.a);
			} else if ($filetype==maestro.s[0][1]) {
				$p.a.href = $url;  	//.css || .debug.css
				$p.a.rel = maestro.s[3][4];
				$p.a.type = maestro.s[3][3];
				$p.a.onLoad=$onLoad;
				$p.a.onError=$onError;
				if ($p.c=maestro.fn.gel('head'))$p.c[0].appendChild($p.a);
			} else {
				maestro.prototype.die(this,arguments,'Only Javascript and Stylesheets can be loaded local or remote.');
			}
		},
		
		/**
		 * <h1>XHR - XMLHttpRequest</h1>
		 * <p>This is an API available to web browsers. It is used to send
		 * HTTP or HTTPS requests to a web server and load the server response data back
		 * into the script.[1] Development versions of all major browsers support URI schemes 
		 * beyond http: and https:, in particular, blob: URLs are supported.</p>
		 *
		 * <p>Given a complete URL this function will use AJAX to load a file. It supports the 
		 * latest standards and CORS. If you get errors make sure your server is configured
		 * for Cross-Domain Access.</p>
		 *
		 * <h3>Typical setting for .htaccess</h3>
		 *
		 *
		 * @example
		 *		<IfModule mod_headers.c>
		 *			Header set Access-Control-Allow-Origin "*"
		 *		</IfModule>
		 *		And if it only concerns .js scripts you should wrap the above code inside this:
		 *		<FilesMatch "\.(js)$">
		 *		...
		 *		</FilesMatch>
		 *
		 *
		 * @method xhr
		 * @param {string}		$url
		 * @param {function} 	$onLoad
		 * @param {function} 	$onError
		 * @param {string} 		$method
		 * @param {string} 		$data
		 * @param {boolean} 	$trace
		 * @returns {boolean}
		 * @memberof maestrofn
		 */
		xhr:function($url,$onLoad,$onError,$method,$data,$trace) {
			/**
			 * default dummy method
			 * @method _onLoad
			 * @private
			 * @returns none
			 * @memberof fn.xhr
			 */
			_onLoad=function () {}
			/**
			 * default dummy method
			 * @method _onError
			 * @private
			 * @returns none
			 * @memberof fn.xhr
			 */
			_onError=function () {}		
			/**
			 * Prepares and sends the request - all other browsers
			 * @method XMLReq
			 * @private
			 * @param {object} $opts
			 * @returns boolean
			 * @memberof fn.xhr
			 */
			XMLReq=function ($opts) {
				$opts.req = new XMLHttpRequest();
				if('withCredentials' in $opts.req) {
					$opts.req.open($opts.method, $opts.url, true);
					$opts.req.onerror = $opts.onError;
					$opts.req.onreadystatechange = function() {
						if ($opts.trace===true) {
							var tmp = {url:$opts.url,state:this.readyState,status:/**
							 * Short Description
							 *
							 * @example 
							 * @method name
							 * @param {type}	name	short description
							 * @return {type}
							 */
							status,text:this.statusText};
						}
						if ($opts.req.readyState === 4) {
							if ($opts.req.status >= 200 && $opts.req.status < 400) {
								$opts.onLoad($opts.req.responseText,$opts.url);
							} else {
								$opts.req.abort();
							}
						}
					};
					
					try {
						$opts.req.send($opts.data);
					} catch (e) {
						return false;
					}
				}
				return true;
			} /* END XMLReq() */

			/**
			 * prepares and send the IE request
			 *
			 * @method XDOReq
			 * @private
			 * @param {object} $opts
			 * @returns boolean
			 * @memberof fn.xhr
			 */
			XDOReq=function ($opts) {
				$opts.req = new XDomainRequest();
				$opts.req.open($opts.method, $opts.url);
				$opts.req.onerror = $opts.onError;
				$opts.req.onload = function() {
					$onLoad($opts.req.responseText);
				};
				$opts.req.send($opts.data);
			} /* END CORReq() */
			
			getExt=function($src) {
				var re = /(?:\.([^.]+))?$/;
				var ext = (re.exec($src)[1]).toLowerCase();
				return ext;
			}			
			
			/* BEGIN */
			if (!maestro.prototype.vld($url)||$url==="") {
				$onError(new Error('URL provided is invalid ['+$url+']'));						
			} else {
				$trace=(window.$n.devMode)?window.$n.devMode:false;
				var $opts = {req:'', url:$url,trace:$trace};

				$opts.method 	= maestro.prototype.chk($method,'GET');
				$opts.onLoad 	= maestro.prototype.chk($onLoad,_onLoad);		
				$opts.onError 	= maestro.prototype.chk($onError,_onError);
				$opts.data		= maestro.prototype.chk($data,0);
					
				
				var h=$url.indexOf("http");
					a=$url.indexOf("applet.");
				if (h<0) {
					//Local JavaScript or Stylesheet file?
					maestro.prototype.lds(getExt($url),$url);
				} else {
					try {
						if(XMLHttpRequest) {
							return XMLReq($opts);
						}
						if(XDomainRequest) {			/* Microsoft IE */
							return XDOReq($opts);
						}
					} catch (e) {die(e)}
				}
			}
		}, /* end xhr */
		
		/**
		 *  Obtains a package, initializes and executes it.
		 * 		
		 * @method pkg
		 * @param {mixed} 	$p			Parameter to check
		 * @returns	{mixed}	if valid, otherwise def (default)
		 * @memberof maestro.fn
		 */
		pkg: function($p){
			$p.a=($p.x=1)?
			/**
			 *  pack a module.
			 * 		
			 * @method pack
			 * @param 	{mixed} 	$p			Parameter to check
			 * @returns {string} 	if valid, otherwise def (default)
			 * @memberof pkg
			 */
			function($p){
				/*pack*/
				$p.b=								//<--Wrapper for package
					maestro.prototype.b64(						//<-- LZW Base64 Encoded
						maestro.prototype.lzw.enc(				//<-- JSON COMPRESSED
							JSON.stringify($p.y)	//<-- Data to JSON
						)
					)
			}
			:
			/**
			 *  unpack a module.
			 * 		
			 * @method unpack
			 * @param 	{mixed} 	$p			Parameter to check
			 * @returns {string} 	if valid, otherwise def (default)
			 * @memberof maestro.pkg
			 */
			function($p){
				/*unpack*/
				$p.a=JSON.parse($p.y);
				maestro.prototype.lzw.dec(
					maestro.prototype.b64( $p.a )
				);
			}
			//$param.y = data
		},

		/**
		 * <h1>LZW Compression Object</h1>
		 * <p>LZW starts out with a dictionary of 256 characters (in the case of 8 bits) 
		 * and uses those as the "standard" character set. It then reads data 8 bits at a 
		 * time (e.g., 't', 'r', etc.) and encodes the data as the number that represents 
		 * its index in the dictionary. Everytime it comes across a new substring (say, "tr"), 
		 * it adds it to the dictionary; everytime it comes across a substring it has already 
		 * seen, it just reads in a new character and concatenates it with the current string 
		 * to get a new substring. The next time LZW revisits a substring, it will be encoded
		 * using a single number. Usually a maximum number of entries (say, 4096) is defined
		 * for the dictionary, so that the process doesn't run away with memory. Thus, the 
		 * codes which are taking place of the substrings in this example are 12 bits long 
		 * (2^12 = 4096). It is necessary for the codes to be longer in bits than the characters
		 * (12 vs. 8 bits), but since many frequently occuring substrings will be replaced by a 
		 * single code, in the long haul, compression is achieved. 
		 * <a href="http://www.cs.duke.edu/csed/curious/compression/lzw.html" target="_blank">Source</a>
		 * <p>
		 *
		 * <h3>Usage</h3>
		 *
		 *
		 * @example
		 *		//To Base64 use manually...
		 * 		$n.fn.lzw.enc("Test String");
		 * 		var a = $n.fn.lzw.dec($compressed);
		 *		//To use NanoFW encode..
		 *		$n.enc("I will be turn in to a JSON, Encoded and Compressed.");
		 *
		 * @class lzw
		 * @static
		 * @memberof maestro
		 */
		lzw: {
			/**
			 * Compress an string to LZW-encoded
			 * @method enc
			 * @param {mixed} s
			 * @returns string
			 * @memberof fn.lzw
			 */
			enc:function(s) {
				var dict = {};
				var data = (s + "").split("");
				var out = [];
				var currChar;
				var phrase = data[0];
				var code = 256;
				for (var i=1; i<data.length; i++) {
					currChar=data[i];
					if (dict[phrase + currChar] != null) {
						phrase += currChar;
					}
					else {
						out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
						dict[phrase + currChar] = code;
						code++;
						phrase=currChar;
					}
				}
				out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
				for (var i=0; i<out.length; i++) {
					out[i] = String.fromCharCode(out[i]);
				}
				return out.join("");
			},

			/**
			 * Decompress an LZW-encoded string
			 * @method dec
			 * @param {mixed} s
			 * @returns string
			 * @memberof fn.lzw
			 */
			dec:function(s) {
				var dict = {};
				var data = (s + "").split("");
				var currChar = data[0];
				var oldPhrase = currChar;
				var out = [currChar];
				var code = 256;
				var phrase;
				for (var i=1; i<data.length; i++) {
					var currCode = data[i].charCodeAt(0);
					if (currCode < 256) {
						phrase = data[i];
					}
					else {
					   phrase = dict[currCode] ? dict[currCode] : (oldPhrase + currChar);
					}
					out.push(phrase);
					currChar = phrase.charAt(0);
					dict[code] = oldPhrase + currChar;
					code++;
					oldPhrase = phrase;
				}
				return out.join("");
			}	
		},
		
		/**
		 * <h1>Base64 Encoding Object</h1>
		 * <p>Base64 is a generic term for a number of similar encoding schemes that 
		 * encode binary data by treating it numerically and translating it into a base 64 
		 * representation. The Base64 term originates from a specific MIME content transfer 
		 * encoding.</p>
		 * <p>Base64 encoding schemes are commonly used when there is a need to encode
		 * binary data that needs be stored and transferred over media that are designed to 
		 * deal with textual data. This is to ensure that the data remains intact without 
		 * modification during transport. Base64 is used commonly in a number of applications 
		 * including email via MIME, and storing complex data in XML.<p>
		 *
		 * <h3>Usage</h3>
		 *
		 *
		 * @example
		 *		//To Base64 use manually...
		 *		$n.fn.b64.enc("I will be encoded in Base64");
		 *		//To use NanoFW encode..
		 *		$n.enc("I will be turn in to a JSON, Encoded and Compressed.");
		 *
		 * @class b64
		 * @static
		 * @memberof maestro
		 */
		b64 : {
			
			/**
			* @private
			* @type string
			* @memberof fn.b64
			*/
			$keyStr : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
		 
			/**
			 * public method for encoding
			 * @method enc
			 * @param string input
			 * @returns string
			 * @memberof b64
			 */
			enc : function (input) {
				var output = "";
				var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
				var i = 0;
		 
				input = function(argString) {
					if (argString === null || typeof argString === "undefined") {
						return "";
					}

					var string = (argString + '');
					var utftext = '', start, end, stringl = 0;

					start = end = 0;
					stringl = string.length;
					for (var n = 0; n < stringl; n++) {
						var c1 = string.charCodeAt(n);
						var enc = null;

						if (c1 < 128) {
							end++;
						} else if (c1 > 127 && c1 < 2048) {
							enc = String.fromCharCode((c1 >> 6) | 192, (c1 & 63) | 128);
						} else {
							enc = String.fromCharCode((c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128);
						}
						if (enc !== null) {
							if (end > start) {
								utftext += string.slice(start, end);
							}
							utftext += enc;
							start = end = n + 1;
						}
					}

					if (end > start) {
						utftext += string.slice(start, stringl);
					}

					return utftext;
				}(input);
		 
				while (i < input.length) {
		 
					chr1 = input.charCodeAt(i++);
					chr2 = input.charCodeAt(i++);
					chr3 = input.charCodeAt(i++);
		 
					enc1 = chr1 >> 2;
					enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
					enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
					enc4 = chr3 & 63;
		 
					if (isNaN(chr2)) {
						enc3 = enc4 = 64;
					} else if (isNaN(chr3)) {
						enc4 = 64;
					}
		 
					output = output +
					this.$keyStr.charAt(enc1) + this.$keyStr.charAt(enc2) +
					this.$keyStr.charAt(enc3) + this.$keyStr.charAt(enc4);
		 
				}
			 
				return output;
			},
		 
			/**
			 * public method for decoding
			 * @method dec
			 * @param string input
			 * @returns string
			 * @memberof fn.b64
			 */
			dec : function (input) {
				var output = [];
				var chr1, chr2, chr3;
				var enc1, enc2, enc3, enc4;
				var i = 0;
		 
				input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		 
				while (i < input.length) {
		 
					enc1 = this.$keyStr.indexOf(input.charAt(i++));
					enc2 = this.$keyStr.indexOf(input.charAt(i++));
					enc3 = this.$keyStr.indexOf(input.charAt(i++));
					enc4 = this.$keyStr.indexOf(input.charAt(i++));
		 
					chr1 = (enc1 << 2) | (enc2 >> 4);
					chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
					chr3 = ((enc3 & 3) << 6) | enc4;
		 
					output.push(String.fromCharCode(chr1));
		 
					if (enc3 != 64) {
						output.push(String.fromCharCode(chr2));
					}
					if (enc4 != 64) {
						output.push(String.fromCharCode(chr3));
					}
		 
				}
		 
				output.join('');
				return output;
		 
			}
		},
		
		/**
		 * Encodes data by converting to JSON, then converting to base64 and finally lzw compression
		 *
		 * @method enc
		 * @param {object} $p	p.x= 'enc', p.y=any variable, array or object
		 * @returns {string}
		 * @memberof maestro.fn
		 */
		enc:function($p) {
			return JSON.stringify(maestro.prototype.b64.enc(maestro.prototype.lzw.enc($p)));
		},
		
		/**
		 * Parses previously maestro encoded data back into a JSON
		 *
		 * @method dec
		 * @param {object} $p	p.x= 'dec', p.y=any variable, array or object
		 * @returns {string}
		 * @memberof maestro.fn
		 */
		dec:function($p){
			return JSON.parse(((maestro.prototype.b64.dec(maestro.prototype.lzw.dec($p))).join('')));
		},
		
		/**
		 * Replace all occurances of $p.y with $p.z in $p.z
		 *
		 * @method sra
		 * @param {object} $p	p.x= find, p.y=new and p.z source
		 * @returns {string}
		 * @memberof maestro.fn
		 */
		sra:function($p) {
			return $p.z.replace(new RegExp($p.x,'g'),$p.y);
		},
		 
		/**
		 * Attempts to return $el by checking Id, Tag Name, Name then class
		 *
		 * @method gel
		 * @param {object} $p	p.x= find, p.y=new and p.z source
		 * @returns {DOMElemnt}
		 * @memberof maestro.fn
		 */
		gel:function($el,$target) {
			var $result,$target;
			$target = maestro.prototype.chk($target,window.document);
			if ($result=$target.getElementById($el)) return $result;
			if ($result=$target.getElementsByTagName($el))return $result;
			if ($result=$target.getElementsByName($el))return $result;
			if ($result=$target.getElementsByClassName($el))return $result;
			return null;			
		},
		/**
		 * An equivalent to PHPs die() function
		 *
		 * @method die
		 * @param {object} $p.y  is a string message or error object of the event.
		 * @returns none
		 * @memberof maestro.fn
		 */			
		die:function( $object,$args,$m ) {
			/**
			 * @method stopPropagation
			 * @private
			 * @memberof fn.die
			 */
			function stopPropagation (e) {
				e.stopPropagation();
				// e.preventDefault(); // Stop for the form controls, etc., too?
			}

			window.addEventListener('error', function (e) {
				e.preventDefault();
				e.stopPropagation();
				e.objectName=(!$object)?"Unknown":$object;
				e.arguments=(!$args)?'none':$args;
				if(typeof window.onError==="function")
					window.onError(e)}, 
				false
			);

			window.onError=function(e){
				maestro.log(null,'Error',e);
			}

			for (var i=0; i < maestro.s[6].length; i++) {
				window.addEventListener(maestro.s[6][i], function (e) {stopPropagation(e);}, true);
			}

			if (window.stop) {
				window.stop();
			}

			throw '';
		},
		
		tgc:function() {
			function hasClass(element, cls) {
				return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
			}
			
			var $el=maestro.prototype.gei('cpanel');
			if(hasClass($el,'open')){
				$el.className="closed";
			}else{
				$el.className="open";			
			}
		},
		tgl:function($el) {
			$el = maestro.prototype.gei($el);
			if ($el.style.display!='none')
				maestro.prototype.off($el);
			else
				maestro.prototype.on($el);			
		},
		
		/**
		 * show an element, all elements of tagname or name or class
		 * Verified fully functional
		 *
		 * @method on
		 * @param {string} $p.y  ordered by Id->TagName->Name->Class
		 * @returns none
		 * @memberof maestro.fn
		 */
		on:function($el) {
			$el = maestro.prototype.cnt($el);
			if ($el) {
				$el.style.opacity=1;
				$el.style.display = 'block';
				$el.style.visibility = 'visible';
			}
		},
		
		/**
		 * hide an element, all elements of tagname or name or class
		 * Verified fully functional
		 *
		 * @method off
		 * @param {string} $el  ordered by Id->TagName->Name->Class
		 * @returns none
		 * @memberof maestro.fn
		 */
		off:function($el) {
			$el = maestro.prototype.cnt($el);
			if ($el) {
				$el.style.opacity=0;
				$el.style.display = 'none';
				$el.style.visibility = 'hidden';
			}
		},
		
		/**
		 * Page Loader Enable. Shows wrapper then fades out
		 *
		 * @method ple
		 * @memberof maestro.fn
		 */
		ple:function() {
			if (maestro.prototype.gei('wrapper') && maestro.prototype.gei('mLoader')) {
				maestro.prototype.on('mLoader');
				maestro.prototype.off('wrapper');
			}
		},
		
		/**
		 * Page Loader Disable. Fades out then hides wrapper
		 *
		 * @method pld
		 * @memberof maestro.fn
		 */
		pld:function() {
			if (maestro.prototype.gei('wrapper') && maestro.prototype.gei('mLoader')) {
				maestro.prototype.on('wrapper');
				maestro.prototype.off('mLoader');
			}
		},
		/** 
		 * Sends a message to the server using AJAX. You may call this directly to send a custom message.
		 * it is also used internally for sending analytics event data to your account.
		 * 
		 * @example 
		 * 		$n({x:'msg',y:'Nano Framework Rocks!'});
		 *
		 * @method msg
		 * @param {object} $p
		 * @param {object} maestro	internal the meastro object
		 * @returns {boolean}	true is no error sending
		 * @memberof maestro.fn
		 */
		msg:function($p,maestro) {
			//encode Data
			$p=maestro.prototype.enc($p);
			try {
				maestro.prototype.xhr(maestro.s[2][0]+maestro.s[3][1]+$p,function() {},function() {},'get',$p,false);
			} catch (e) {
				maestro.log(e.stack);
			}
		},
		
		evt:function(element, event, fn) {
			if (element.addEventListener)
				element.addEventListener(event, fn, false);
			else if (element.attachEvent)
				element.attachEvent('on' + event, fn);
		}	
	};
	
	// A central reference to the root maestro(document)
	var rootmaestro,
		
	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,
	/**
	 * @method init
	 * @param string	selector	function, element, tag or class
	 * @memberof maestro
	 */
	init = maestro.fn.init = function( selector, context ) {
		// HANDLE: $n(""), $n(null), $n(undefined), $n(false)
		if ( !selector ) {
			return this;
		}
		
		// HANDLE: $n("") strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "*" && selector.length >= 3 ) {
				// Assume that strings that start with * All requests. ie *Tdiv return all div's ,
				// *CmyButton return all elements with myButton class
				return match = [ null, selector, null ];
			} else if ( selector.charAt(0) === "+" && selector.length >= 2 ) {
				//$n(+MyObject(),'myObj');
				// Assume that strings that start with + are create new object requests.
				return match = [ null, selector, null ];
			} else if ( selector.charAt(0) === "-" && selector.length >= 2 ) {
				//$n(-div); or $n(-MyObject);
				// Assume that strings that start with - are delete object requests.
				return match = [ null, selector, null ];
			} else if ( maestro.fn[selector] ) {		
				//Call method
				return maestro.fn[ selector ].apply( this, Array.prototype.slice.call( arguments, 1 ));
			}
		}
		
		// HANDLE: $n(DOMElement)
		if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;
		}
		// HANDLE: $n.function
		else if ( maestro.fn.selector ) {
				return maestro.fn.selector.apply( this, Array.prototype.slice.call( arguments, 1 ));
		
		// HANDLE: $n(function)
		// Shortcut for document ready
		//} else if ( maestro.isFunction( selector ) ) {
		} else if ( typeof ( selector ) === "function" ) {
			
			return typeof rootmaestro.ready !== "undefined" ?
				rootmaestro.ready( selector ) :
				// Execute immediately if ready is not present
				selector( maestro );
		} else if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}
		
		return ( selector, this );
	};
	
	// Give the init function the jQuery prototype for later instantiation
	init.prototype = maestro.fn;
	
	// Initialize central reference
	rootmaestro = maestro( document );
	
	if ( typeof define === "function" && define.amd ) {
		define( "maestro", [], function() {
			return maestro;
		});
	}
		
	//First run - Load Release version of JavaScript and Style-sheet if no Parameters
	//Initialize Object
	/*
	maestro.s=[
		['script','link','put','get','clk','msg'],
		['nano','.release','.debug','.js','.css'],
		['//cdn.i2tmlabs.com'],
		['__utm.gif?','Microsoft.XMLHTTP','application/javascript','text/css','stylesheet'],
		[
		'#tail,tail{display:none;visibility:hidden}#wrapper{-webkit-opacity:0;-moz-opacity:0;opacity:0}#cpanel{position:fixed;top:0;left:0;right:0;z-index:15000;background-color:#fff;color:#000;font-size:1em;padding:0;margin:0}#cpHead{width:100%;top:0;max-height:20px;background-color:#000;color:#fff;padding:0 10px 0 10px}#cpText{font-family:ubuntu}#cpLog{position:absolute;bottom:17px;top:21px;width:100%;border:0;overflow:auto}#cpCmd{position:absolute;bottom:0;width:100%;max-height:16px;border:0}#cpanel.open{bottom:0;display:block;visibility:visible}#cpanel.closed{height:20px;-webkit-opacity:0;-moz-opacity:0;opacity:0}.cpText{vertical-align:top;top:3px}@font-face{font-family:Neuropol;font-weight:normal;font-style:normal;src:url(http://code.nanofw.com/i2tm/fonts/neuropol.ttf)}.neuropol{font-family:Neuropol;font-weight:200;letter-spacing:12px}@font-face{font-family:Ubuntu;font-weight:normal;font-style:normal;src:url(http://code.nanofw.com/i2tm/fonts/ubuntu-r.ttf)}.ubuntu{font-family:Ubuntu;font-weight:normal}@font-face{font-family:TopGun;font-weight:normal;font-style:normal;src:url(http://code.nanofw.com/i2tm/fonts/top_gun.ttf)}.topgun{font-family:TopGun;font-weight:normal}@font-face{font-family:Edwardian;font-weight:normal;font-style:normal;src:url(http://code.nanofw.com/i2tm/fonts/itcedscr.ttf)}.edwardian{font-family:Edwardian;font-weight:normal}#mLoader{display:block;position:fixed;top:0;left:0;z-index:100000;background:white;width:100%;height:100%}#mView{position:relative;z-index:3;margin:0 auto;top:45%;width:220px;height:60px;list-style:none;text-align:center;padding:0}ul#mView li{background-color:#888;width:25px;height:20px;float:right;margin-right:6px;box-shadow:0 100px 20px rgba(0,0,0,0.2);border-radius:10px 10px}ul#mView h1,h3{color:black}@-webkit-keyframes loadbars{0%{height:1px;margin-top:25px}50%{height:50px;margin-top:0}100%{height:1px;margin-top:25px}}ul#mView li:first-child{-webkit-animation:loadbars 2.0s cubic-bezier(0.645,0.045,0.355,1) infinite 0s}ul#mView li:nth-child(2){-webkit-animation:loadbars 2.1s ease-in-out infinite -0.5s}ul#mView li:nth-child(3){-webkit-animation:loadbars 2.2s ease-in-out infinite -0.5s}ul#mView li:nth-child(4){-webkit-animation:loadbars 2.3s ease-in-out infinite -0.5s}ul#mView li:nth-child(5){-webkit-animation:loadbars 2.4s ease-in-out infinite -0.5s}ul#mView li:nth-child(6){-webkit-animation:loadbars 2.5s ease-in-out infinite -0.5s}ul#mView li:nth-child(7){-webkit-animation:loadbars 2.6s ease-in-out infinite -0.5s}',
		[[33,'o'],[35,'r'],[37,'t'],[34,'s'],[36,'e'],[33,'a'],[34,'m']]
		],
		[
			[
				"@media all {html {font-size:{FONTSIZE}px;}}",
				"@media screen and (max-device-width: {DEVICEWIDTH}px) {.mdw:before {content:'{DEVICEWIDTH}px'}}",
				"@media only screen and (-webkit-min-device-pixel-ratio:{DPP}){.dpp:before{content:'{DPP}'}.dpi:before{content:'{DPI}'}html,body {font-size:{FONTPCT}% !important;}}"
			],
			[2048,1920,1536,1440,1366,1280,1136,1025,960,768,720,640,480,320],
			[1,1.3,1.5,2,3],
			[96,124,144,192,288],
			[100,100,100,100,100],
			['{FONTSIZE}','{DEVICEWIDTH}','{DPP}','{DPI}','{FONTPCT}'],
			['<div id="cpHead"><span class="cpText">Maestro cPanel</span><span id="btn_cpanel" class="pull-right cpText glyphicon glyphicon-cog" onclick="$n(\'tgc\',\'cpanel\');"></span></div><div id="cpLog"><table id="cpText" class="table table-hover table-striped"><thead><tr><th>Type</th><th>Object:ID</th><th>Message</th></tr></thead><tbody></tbody></table></div><input id="cpCmd" type="text" placeholder=">">','<span class="glyphicon glyphicon-']
		],
		[
			'copy', 'cut', 'paste',
			'beforeunload', 'blur', 'change', 'click', 'contextmenu', 'dblclick', 'focus', 'keydown', 'keypress', 'keyup', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'resize', 'scroll',
			'DOMNodeInserted', 'DOMNodeRemoved', 'DOMNodeRemovedFromDocument', 'DOMNodeInsertedIntoDocument', 'DOMAttrModified', 'DOMCharacterDataModified', 'DOMElementNameChanged', 'DOMAttributeNameChanged', 'DOMActivate', 'DOMFocusIn', 'DOMFocusOut', 'online', 'offline', 'textInput',
			'abort', 'close', 'dragdrop', 'load', 'paint', 'reset', 'select', 'submit', 'unload'
		]			
	];
	
	//		[100,97,95,80,70],
	//maestro.s=maestro.fn.enc(maestro.s)
	maestro.s=JSON.stringify(maestro.s);
	maestro.s=maestro.fn.b64.enc(maestro.s);
	maestro.s=maestro.fn.lzw.enc(maestro.s);
	
	window.console.log('maestro.s='+maestro.s+';');	
	vars.NF=true;
	*/
	if (!vars.NF) maestro.s="W1sic2NyaXB0IiwibGluayIsInB1dCĖImdlĜĞmNsĔĤ1zZyJdLFĂbmFubĕėi5yZWxlYXNlČĎLmRŀnVnŅiŇpzŎŇNzcĭįıŏy9jZG4ēTJ0bľhYnMuY29tIl0sWĭfX3VťS5naWY/ŎTWljcm9zb2Z0LlhNTEhUVFAŏCJhcHBħWNhdđvbi9qŁZƞąćĉċčiƦV4Ĝŝc3MƛJzdHlsZłoĽźűųŵIjƦFpbCx0Yƅse2RpƻơŁk6ĳ9uZTt2ĈNpYmǃĈR5Omhpşŉbn0ǎ3ƝƟBlcnstd2Via2ŲLW9wǖǪǁǠMDȃŦ96ȌȎȐpȒ6ȔtvcGFjǯǱjB9IąȏW5lbHtwb3ȑƧbjpmĈhlZDtť3AȟɂǄWƎOjA7ƈlžHQɇtșƅǤGƷɌE1ȔAwO2Ɲŭtnƈ91ĳQtŭ9sȶI6ȬZmZjtjƌxȢjojɟɡƍƨnɬĄl6ǥoxĽ0ɏȤkşĒZzoʂ1ƞĠǑɾwfSNƇƕŀWR7ȅlkƦgȟTɠJǦɄɆȠɭXgtaɚǵ2h0ɌIwƟg7ǬȥȉdyȶVǤC1ɺ2ɼcɾʀDɠɢNƨG9yOiNɶmYʏFʑđǤʕwIDEˀHggMCAxMƠ4ʞʠcFŉeHʥɵǣĜ1ˠĀǑHǠdWJɪnR1˷ʡɼZ3ȴȶȸlƨȻŨn˗Ȳźǥtď3Rť20ʬdweɂʱȟjF̩ɂ3ſ̣aDʋɟlɢJȢňȀʜɢ9ƍXJmĐ93ǲFě˙ȫȭQ21ke3BȢȊ0ſǣ͉ăŮsdXŉ̺vǁRƨTʖO3dǵ˽oɜw˰U7ŦF4Ȍȿſdod̶xNę4͢ƈŉˑʖ̏ȣĵĽwĶ͔ȱn̠ȶ̣ƌ̦ȠkǩȵȤǱmJɰąrͩZǜȊȈľȝ̆6dǭzſΜǅǺY͔hĳVsŔɰȷɀȳǇƅɒɔMȩ̰ȃȅȇȉȋȍȮȑΧȔȖȍɗțƣΦȓɂȢȤȦ͠ȨȪŔwVɚƸȳ͂ŤſƤǒʘĐɑȺpʱʦ˙ɡjN̩H1A˿ú̃ŃǙZʄɬɵFʷľǱkȰ̻͟ȣɯɢϺǸɬσʺʼǲ5̼ϥɂͅ25Əł0eľ̹mАƈВtŖmMΨ̓sKGʼǁɆLŜˎŉŇ5βƉĠy5ˎ0vaţŻ9ДЖŗǣǅVˈ͔ƨCЖƦYpʞ5ǤXфȶ͕ȲtпƏɊβǗeTpOухѓГƌЖLXġ͹ͻ̶yɟͳɚ0ƶyѥϯȜĳcʬJϰϲϴ϶ȐlϹϻtϽϿxǱlȇ̈щǦіѥѧWͺͼpΌJɭWw7ѻˌǀǂǄќҒҔҖƻJjOŋˈChͻ˽ɡi8vɮʑżŬȯvZɧŬŮtL2kyƦйѻHMͣ̉̋̍ѥIϵ˽mKX0ϵӄǸ̍ѿЊҁĴ҃҅҇ȯѯҊѣЗҍҏDґȶғǖx9QGЉʅӕȥǅѕӝȌƮŦǃћpUђḦ4җƉϵˌ3ĽɑaɓǡƉˈWıЈҀƻǰĐUԅ˚ʹsͩĆYzp1ƈwoԃ̣c̶vҺ˗şUĶĴĶƍ3ŔƨS9pM̌ҹʃӑzL̢ȢF9nӺӉRӋӍϵϬ̒ˊӓӫ҂ſ҄OlͥcEdɪɸҋѦlѨҐҞӥӧөҀϽŞXӯЕїӲњќFZӹʙǛǖӻҘ1ԀμԃɔǢԇԉԳӫԌ5ԎԐճԓȷyԖԘԚԜ˽0ԟoԡąҴGԥĳĵƌ̒ԫbԭԯԱҺӪRԵ͗ŭVkĄĆĽ0Zil9Ň֛ȅFļđβΏҋјӳǘդզdըǫWիӽ́ծԂԄղԒ˷tT˙hşфǙǛǝsǟ6ǬɼŭsʏƊǯǑ24ʉǭ4ĽQϫȎɌɎĐVĠ̶ɡ3oϿ5ʑʵʬɠʁ̺Ũ2ɦɨɪmɔȅǴƦͲʧʩGʫMʭwʯtλּξ׿JӍɺVΡǅdבΫ͠הזƈδŁǛΩͲei1Ǒ̪̽ozɢʘƈͫȺʖIȤ͋8לϭQ1؁̲ʤ͘ѪοB̰؂ԁν6ʠص̪tħИѲЙЛЏƨm׹ϝ́βđnϨŞӚǅIˢˤʓ˧ŷδȬ1WſV3اxpǙɤװɧƉ׳ɬɮηɲIzg΁̱̳زoyNĉ΁ʻՔҎѩٲ˴BٶZΝFʽnJЍʽ͐ʙؤؚćٹͼo2ˁ˃ƉͶǆǖͥd˧˩˫ټ4˩ʿˁgأiYSgwL˔s˰wڦjIѝɣ̼΄ڊڕȝXФ׾ؼ˱˳˵ٖė͐ٚWٜاgxL׼zǙ̜˙˛Λ׊ƣrfUAȄȆȈ͗ȌtѾɊվĀȀyơƌˣ˄yƻs؀՞؃عMٵءڈǑؚ̬οVϰ0ɞCV7ʸVڅɌUˬ˂ʹļȊuѥՌףfƔͰ۷۹ʹZʻʽ̮ضʴJžַȄϬʾԙHh9ڽ٘ۀۂGٟǲΡȁNїNԜľ͒yխĽJrĈ٧ȯǑԈ͘ȍuǲ׎ʤڢ̓ŒDӈ˴MgΰτWMɭmV6ٛyK˔uʠحڧAuȔݓݐMzU1ڧEpاʓǭē͠ńDBzܞڿٛٝܢѝН͘ˌȦđǄCgݎXςەυїĵſʘƦ̗ϨڀkۣŗAѱ̮ŒɚƯUϿ4tˉċ˥ɵĒǯńC0ڬVݩѐھٙݬٞݯЖaݲʸǃZݶzӌݺτۗԈēĀƥȹȻބކyވLjƿاVލޏޑŹޓݢޖݥIޙޛޝٗݫہݭܣݰޥˍާݵg0ެ۔ޮφݾ޲ށ̘p޶Ĵۤ޸މŕ޽޿ſސޒݡǤݣޗ߇ޚ޺ޜݪޠߍޢЏݱߒݴީg1ߗσۖߚޱހ޴ߟۡޅߡއމ֗ߦĄގߨ߁ǉޔ߭߆߈߱ߊޟܠߎޣ߸ݳިݶ2߾ݻޯߛࠃނ޵ࠆ޷޹jޜࠌ2ࠎܖߪࠒ߅ŉ߯߉߳࠙߶ߐަߺݶ3ࠡߙݽࠂ޳ࠦࠅ2ۢࠈߣ޺ʔ࠭࠯ߩ߂߫ޕݤ࠴ࠕࠫݩSĖĀszMyĎķĮİ࡚NSĎciࡠızĆĎĜࡨࡢCࡥŘࡡࡪƴZS࡮࡛࡝ڢࡷř࡯࡞ࡼѐǋāiӨ1ɀ֫اıǒB۹˽ޑCࢌլ؏p̹ΏGT05UU0ՔRX1ضܝࡗėkBҁʤǫSݨΰJɀַ݄ȯk߇hʴʶׅǨƣlҌͬRͮiࢌREVWSUNFźlࣃƕ9ˁݠHsĶʤ͈ΛɀԆࡶࢌɮՁˊڍne0RࣉklDRVdJ࣢RIŷٽJ31ȫƴࢅࢇƑاǣȲkڠưǈuࢉˋAoҌŀmtȝˌ߀ࢸϢࢻĉ٠ɚἐࡃvҤtEUFȪެǤƠɡࣖ˿ļ՞ˎЖĽЖ˜؍࣢BQʞd֥ňwлpiĽϺؓ˃Ůࣜϵ̶ࣟ࣡QSӍnfWʼŦw׊Ɖ͒ࢫӼ̀ҙĈ࢔क࢙࢛ࢗENUʞUgIƅtІҽȤऺtࢣ࡮ѫDQͶ˪5οAکTUࡴw;॥ڦ˪ࡪjY६I4ڪ˳TM2ݞͰjUԓTYॳĄOࡰƼɍsݒॳ०ڪ࡛ȩࡽۅ˪ݖ࡝ۅংکčzXSxbOঅॸƏ˪0NࡰxঢĖο٭ঞঠ׾ɠঀॻɟ६ল˪ͰځŴĭ7Rk9OƘNJWkVࣳĎ࣠࣢֛ࣩ࣭ࣥࣧ࣫ࢤĘखघȪŎ৊ाӍƾঽিুङDVH0iযbǍxΖXYgſQ9XƜʡȿڕcǍ48ǝβࣀɺȤŖzԙğϯϜƷd̯iPkʘǅܧƈ8݄1BгδPCƊΈuPjxŖय़ݡkP۳ڢ̌uXȭǖȰbਆاĦŁŕਠࡥHδϤڋҏ࢐Ƈ˺Ѿɓg܎҄ȣǴࣛاdǘĉܪؚ̜ˎd৵ࣀمĦϢrਯࡧŠoࣰRnYۤsJਦȯȱCcѝࢡਇjwȢαȺ৷Һؖj৷ʒ2ਞ੐ΰBMƌ੉৶8Ǐď֊৬W৮ৰҢ˹˻˽੊BৼF৾਀̌ŨmĿI˽ઊĿͷͣ݊ĕ઎׍ऍ਌ǭwĽR৵੫੷ЩʣQ+P˽yਙǔ̵࢚eĉlਔ9ز৷ʪ+TɣqĽܧOࣤEમરટgળہŖࡆnǥ੤લ઼ˑ੨̢λˣધǕैћ૊Rďǚ5ਙ૆Ȥ੹Uણਕ৩Yણ˥Ɵࠑʨੰ͔DŦજČĊફǿ੐ƶƸਪƠێŃʸɯׅદਡPlĎPiĞਚਜĵਫ׊łz੐਼5ਾǫसੁ੃B੅ƨiৣࢁ঻Ңђ5Ŏ݅Ƴࡥ৽׸ƾळɊ̼V׳ܻQଟ̝ĕƴŭhгġଙˏଋĂLৱӝǅॄہϵ৒ň੹੍ۏŎ˿ǎڶƾrǅʨȶdࣿƴȉVଉHࢮƻƽଳܰ୅ԙĝėm1ͣłࢇ͇Ʃĩ୚Ńȗƍ଺୙͟ୡࡏƴȗԙȆ઒фŎ୪ĄଣcୖĘ୏Ȋʉ৒̛ƇƉɰ୴kRP७АׅJǸŃȁŉީĞ୿஁UஃɚSĽ୥݊ࢳƴࣂ9ƓैZVࢮୢછGɨtR˙ǎ۝ЊƾE࢘1OƌŉSȯī̓֡ʤஅ̌vணŝ̈ࢆ஧୒ன۵BͤyƄ9ΖɊǵ੼நபDʸ֩Ȑ֡̓Eؕh௃௅؋ை஽பFנࢨЖTӖZࣇoਧૄௗƜாਐுά͋VOǖࢆ͏ବĳġஊࢥ஀७ȥށ2ؕń஖E஘Ծஹłஅ૾௵஍Ϻ݅zT୨࡞ЕƢȰ୯ƍͅޔ୹ઁRவĚģୗF̡Ťଯː࠮ƾ֜Ĵૄ୎Ȣ୴ઋҮ௥ѸǖĒఙ୵ȀȆଛ͜δષలƻȇӳల҈ބűě";

	maestro.s=maestro.fn.dec(maestro.s);
	
	maestro.pf.dmq({});
	
	//Execute on Load
	if (!vars.NF && location.protocol!="file:") { 
		//maestro.pf.ldf({x:'script',y:'nano',z:null,w:null});
		//maestro.pf.ldf({x:'link',y:'nano',z:null,w:null});
		maestro.pf.ldf({x:'script',y:'nano',z:'{VERPATH}',w:'{VERTYPE}'});
		maestro.pf.ldf({x:'link',y:'nano',z:'{VERPATH}',w:'{VERTYPE}'});
	} else {
		maestro.pf.ldf({x:'script',y:'nano',z:'../../cdn/framework/1.0.0',w:'.local'});
		maestro.pf.ldf({x:'link',y:'nano',z:'../../cdn/framework/1.0.0',w:'.local'});
		maestro.fn.pld();
	}
			
	// Expose maestro and $n identifiers, even in
	if ( typeof noGlobal === "undefined" ) {
		window.maestro = window.$n = maestro;
	}
	
	//Cleanup
	delete vars.NF;

	maestro['name']='Maestro!';
	return maestro;

}));

//$n('evt',window,'load',function(){$n('off','mLoader')});

//var $TEST;
//$TEST=$n('doc');
//$TEST=$n('isa',$TEST);
//$TEST=$n('aea','tail','p',false,"Testing");				
//$n('on','page_loader');