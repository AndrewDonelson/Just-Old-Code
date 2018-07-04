/** 
 *  Alias Interface for Maestro
 *
 * @file maestro.alias.js (#5) in combine sequence.
 * FINALIZED
 */

 
/**
 * Adds Document Object Model Alias to some of the most used tasks
 *
 * @class I$Alias
 * @extends I$Interface
 * @memberof Maestro
 * @expose 
 */
extend(
	//What interface are you extending?
	'I$Interface',

	//What is the name of your new interface?
	'I$Alias',

	/** @lends I$Interface */
	{
		toString:function(){return 'I$Alias Class'},
		/** 
		 * This is an API so there can only be one instance.
		 *
		 * @property {number} maxTotalObjects
		 * @expose 
		 */
		maxTotalObjects:1
	},
	/** @lends I$Interface.prototype */
	{
		/**
		 * Interface Initialization method
		 * @expose
		 * @constructor init
		 */
		init:function ()
		{
			this['_super']();
		},
		setup:function(){
			this['_super']();
			this['hideCallback']=function(){this.style.visibility='hidden'}
		},
		toString:function(){return 'I$Alias Object';},
		/**
		 * Alias for window.document.getElementById
		 *
		 * @example
		 * 		var element = gei("myDIV");
		 *
		 * @method gei
		 * @param {string} $p
		 * @returns element
		 * @memberof I$Alias
		 * @expose
		 */
		gei : function ($p,$src) {
			return D$.getElementById($p);
		},

		/**
		 * Alias for window.document.getElementsByName()
		 *
		 * @example
		 *		var elements = gen("DIV");
		 *
		 * @method gen
		 * @param {string} $p
		 * @returns element
		 * @memberof I$Alias
		 * @expose
		 */
		gen : function ($p) {
			return D$.getElementsByName($p);
		},

		/**
		 * Alias for window.document.getElementsByClass()
		 *
		 * @example
		 *		var elements = gec("red");
		 *
		 * @method gec
		 * @param {string} $p
		 * @returns element
		 * @memberof I$Alias
		 * @expose
		 */
		gec : function ($p) {
			return D$.getElementsByClassName($p);
		},

		/**
		 * Alias for window.GET()
		 *
		 * @example
		 * 		get("head")[0].appendChild($script);
		 *
		 * @method gec
		 * @param {string} $p The tag name of the elements you want returned, ie. HEAD
		 * @returns {Collection} Returns the collection of elements with the given tag name
		 * @memberof I$Alias
		 * @expose
		 */
		get : function ($p) {
			return D$.getElementsByTagName($p);
		},

		/**
		 *  Get all data attributes for the given element.
		 *
		 * @example
		 * 		var attr = gda("APPLET");
		 *
		 * @method gda
		 * @param {string} $el Element tag name or Id you want to get the data attributes from
		 * @param {string} $id set tp true to use elements id
		 * @returns {object} Returns the object containing all attributes
		 * @memberof I$Alias
		 * @expose
		 */
		gda : function ($el, $useid) {
			var $result = false,
			$data = {};
			if ($useid == true) {
				if ($el = this['gei']($el))
					$result = true;
			} else {
				if ($el === this['db'][0][45] || "body" || "head")
					$el = this['get']($el)[0];
				$result = true;
			}
			if ($result === true) {
				[].forEach.call($el.attributes, function (attr) {
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
		 * Returns true if object parameter is a DOM Element and false otherwise.
		 *
		 * @param {object} Object to test
		 * @return {boolean}
		 * @expose
		 */
		ise : function($obj){
			try {
				return ($obj.constructor.__proto__.prototype.constructor.name)?true:false;
			}catch(e){
				return false;
			}
		},

		/**
		 *
		 * Checks node parameter. Returns an element no mater if the element is passed in or the name of an element.
		 *
		 * @example
		 * 		var $el = cnt($element);
		 *
		 * @method cnt
		 * @param {*} $el The name of an element or the actual element
		 * @param {boolean} $all If more than one return all
		 * @returns {Element} returns the Element
		 * @memberof I$Alias
		 * @expose
		 */
		cnt : function ($p,$a) {
			var $result;
			if (typeof $p === "string") {
				$result = this['gei']($p);
				if (!$result) $result = (!$a)?this['get']($p)[0]:this['get']($p);
				if (!$result) $result = (!$a)?this['gec']($p)[0]:this['gec']($p);
			} else if (this.ise($p)){
				$result = $p;
			} else $result=false;

			return $result;
		},

		/** @expose */		
		esa : function ($el, $var, $val) {
			try{this['cnt']($el).setAttribute($var, $val)}catch(e){return false}
			return true;
		},

		/**
		 * Alias for element.getAttribute()
		 * Get all data attributes for the given element.
		 *
		 * @example
		 * 		var btnColor = this('ega',"button","color");
		 *
		 * @method ega
		 * @param 	{*}		$el 	The name of an element or the actual element
		 * @param 	{string} 	$var	The name of the attribute you want to get
		 * @memberof I$Alias
		 * @expose
		 */
		ega : function ($el, $var) {
			return this['cnt']($el).getAttribute($var);
		},

		/**
		 * Inserts a new element before a given element
		 *
		 * @example
		 * 		aea('someElementID','DIV','newDivID','This is inner HTML');
		 *
		 * @method aea
		 * @param 	{*} 	$el 	The name of an element or the actual element
		 * @param  	{string} 	$ne 	element to insert
		 * @param  	{string}	$id 	ID of the new element
		 * @param  	{string} 	$html 	HTML to insert into new element
		 * @returns {string} 	$id    Parent nodes id
		 * @memberof I$Alias
		 * @expose
		 */
		aea : function ($el, $ne, $id, $html) {
			var $el = this['cnt']($el);
			if (!this['vld']($el)) return false;
			$ne = D$.createElement($ne);
			if ($id)
				$ne.id = $id;
			if ($html)
				$ne.innerHTML = $html;
			$el.parentNode.insertBefore($ne, $el);
			return $ne;
		},

		/**
		 * Inserts a new element into a given element
		 *
		 * @example
		 * 		aet('newDivID','h1','newH1ID','This is inner HTML');
		 *
		 * @method aet
		 * @param 	{*} 	$el 	The name of an element or the actual element
		 * @param  	{string} 	$ne 	element to insert
		 * @param  	{string}	$id 	ID of the new element
		 * @param  	{string} 	$html 	HTML to insert into new element
		 * @returns Element returns the element just created & appended.
		 * @memberof I$Alias
		 * @expose
		 */
		aet : function ($el, $ne, $id, $html) {
			var $el = this['cnt']($el);
			if (!this['vld']($el)) return false;
			$ne = D$.createElement($ne);
			if ($id)
				$ne.id = $id;
			if ($html)
				$ne.innerHTML = $html;
			$el.appendChild($ne);
			return $ne;
		},

		/**
		 * Returns file extension from a url string
		 *
		 * @method gex
		 * @param {String}	a	
		 * @return (String|null) extension
		 * @expose 
		 */
		gex : function(a){
			if (typeof a==='undefined'||a=='') return ''; else return /(?:\.([^.]+))?$/.exec(a)[1].toLowerCase()
		},
		
		/**
		 * Returns file name from a url string
		 *
		 * @method gfn
		 * @param {String}	a	
		 * @return (String|null) filename
		 * @expose 
		 */
		gfn : function(a){
			return a.substring(a.lastIndexOf("/")+1)
		},
		
		/**
		 *  Tests a boolean evaluation and throws an exception with the error string. (Assert)
		 *
		 * @example
		 *   	this('ast',foo,'BOOYA!');
		 *
		 * @method ast
		 * @param  	{boolean} 	$test 	A boolean result test
		 * @param 	{string} 	$error 	A string to throw with the exception
		 * @memberof I$Alias
		 * @todo Remove function
		 * @expose
		 */
		ast : function ($test, $error) {
			if (!$test) {
				throw $error;
			}
		},

		/**
		 * Utility function for wrapping a callback function with its reference
		 * @method bnd
		 * @param {object} $scope
		 * @param {function} $fn
		 * @returns function
		 * @memberof I$Alias
		 * @expose
		 */
		bnd : function ($scope, $fn) {
			return function () {
				$fn.apply($scope, arguments);
			};
		},

		/**
		 * Utility function for loading JavaScript or Stylesheets.
		 * No other file formats are supported.
		 *
		 * @method bnd
		 * @param {string} $fileType 	either script or link
		 * @param {string} $id 			element ID of this file
		 * @param {string} $url 		full path to file, local or remote
		 * @param {boolean} $tail		set to true if you want script loaded into tail.
		 * @param {string} $after 		make sure loaded file is after this given file
		 * @param {callback} $onLoad 	optional
		 * @param {callback} $onError 	optional
		 * @memberof I$Alias
		 * @expose
		 */
		lds : function ($filetype, $id, $url, $tail, $after,$onLoad, $onError) {
			
			function _onLoaded() {}

			function _onErrored() {}
			
			function insert(self) {
				//tail or head? .. or applet?
				c = ($tail==true)?self['gei'](self['db'][0][13]):self['get'](self['db'][0][12])[0];
				
				if (typeof $after!='string') $after='last';
				
				if ($after=='first'){
					//=-=|Insert before all other scripts|=-=//
					c.firstElementChild(a);
					return true;
				} else if ($after=='last'){
					//=-=|Insert before all other scripts|=-=//
					c.appendChild(a);
					return true;
				} else {
					//=-=|find $after and insert after|=-=//
					c=self['gei']($after);
					if (typeof c !='undefined'){
						if (c.nextElementSibling!=null) {
							c.nextElementSibling.insertBefore(a);
							return true;
						}
					}
				}
				return false;
			}
		
			var a,b,c,d = $url.indexOf("applet.");
					
			//=-=|Prepare required parameters|=-=//
			for (var i = 0;i<3;i++) {
				arguments[i]=this['chk'](arguments[i],false);
				if (arguments[i]===false) {
					throw(new Error(this['uniqueId']+'::'+'lds()'+'Invalid or Missing required parameters.'));
				}
			}
			this['chk']($after,false);	
			if (arguments[0] == this['db'][0][0]) {
				a = D$.createElement(this['db'][0][0]);
				a.async = 1;
				a.src = $url; 
				a.type = this['db'][3][2];
			} else if (arguments[0] == this['db'][0][1]) {
				a= D$.createElement(this['db'][0][1]);
				a.href = $url;
				a.rel = this['db'][3][4];
				a.type = this['db'][3][3];
			} else {
				this['warn']('Only Javascript and Stylesheet files can be loaded locally. ('+$url+')');
				return false
			}
			
			a.id=arguments[1];
			a.onload = ($onLoad) ? $onLoad : _onLoaded.bind(this);
			a.onerror = ($onError)? $onError : _onErrored.bind(this);
			
			if ($tail===-1)
				return true;
			else
				return insert(this);
		},

		/**
		 * This function accepts a URL and will convert its parameters to an object and return it. 
		 * Optionally, if you call without a parameter it will use the current location object instead.
		 *
		 * @method upo
		 * @param {object} url
		 * @returns {object}
		 * @memberof I$Alias
		 * @expose
		 */
		upo:function upo(url){
			//http://localhost:8080/cdn/?nv=auto&nb=local&local=1
			if (!url) url = location.search.substring(1);
			if (url=='')
				return false;
			else
				return JSON.parse('{"' + decodeURI(url).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
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
		 * @memberof I$Alias
		 * @expose
		 */
		xhr : function ($url, $onLoad, $onError, $method, $data, $trace) {
			/**
			 * default dummy method
			 * @method _onLoad
			 * @private
			 * @memberof fn.xhr
			 */
			_onLoad = function () {
			
			}
			
			/**
			 * default dummy method
			 * @method _onError
			 * @private
			 * @memberof fn.xhr
			 */
			_onError = function () {
			}
						
			/**
			 * Prepares and sends the request - all other browsers
			 * @method XMLReq
			 * @private
			 * @param {object} $opts
			 * @returns boolean
			 * @memberof fn.xhr
			 */
			XMLReq = function ($opts) {
				var _={};
				$opts.req = new XMLHttpRequest();
				if ('withCredentials' in $opts.req) {
					$opts.req.open($opts.method, $opts.url, true);
					$opts.req.onerror = $opts.onError;
					$opts.req.onreadystatechange = function () {
					
						// if ($opts.trace>0) {
							// msg='XHRCORS: '+$opts['owner']['gfn']($opts['url'])+' ';
							// switch (this['readyState']) {
								// case 0: msg+=' request not initialized.'; break; 
								// case 1: msg+=' server connection established.'; break;
								// case 2: msg+=' request received.'; break; 
								// case 3: msg+=' processing request.'; break; 
								// case 4: msg+=' request finished and response is ready.'; break;
							// }
							// $opts['owner']['debug'](msg);
						// }

						if ($opts.req.readyState === 4) {
							if ($opts.req.status >= 200 && $opts.req.status < 400) {
								$opts.onLoad($opts.req.responseText, $opts.url);
							} else {
								$opts.req.abort();
								$opts.onError($opts.req);
							}
						}
					};

					try {
						$opts.req.send($opts.data);
					} catch (e) {
						this['error'](e,_,Array.prototype.slice.call(arguments, 0));
						return false;
					}
				}
				return true;
			}
			/* END XMLReq() */

			/**
			 * prepares and send the IE request
			 *
			 * @method XDOReq
			 * @private
			 * @param {object} $opts
			 * @returns boolean
			 * @memberof fn.xhr
			 */
			XDOReq = function ($opts) {
				$opts.req = new XDomainRequest();
				$opts.req.open($opts.method, $opts.url);
				$opts.req.onerror = $opts.onError;
				$opts.req.onload = function () {
					$onLoad($opts.req.responseText);
				};
				$opts.req.send($opts.data);
			}
			/* END CORReq() */

			/* BEGIN */
			var _={opts:null};
			
			if (!this['vld']($url) || $url === "") {
				$onError(new Error(this['db'][0][41] + $url + ']'));
			} else {
				$trace = this['isDevMode']()||false;
				_.opts = {
					req : '',
					url : $url,
					trace : $trace
				};

				_.opts.owner=this;
				_.opts.method = this['chk']($method, 'GET');
				_.opts.onLoad = this['chk']($onLoad, _onLoad);
				_.opts.onError = this['chk']($onError, _onError);
				_.opts.data = this['chk']($data, 0);

				_.h = $url.indexOf("http");
				//_.a = $url.indexOf("applet.") && $url.indexOf(".nano");
				if (!$url) return false;
				
				if (_.h < 0) {
					var fn=this['gfn']($url);
					var ext=this['gex']($url);
					this['lds'](ext,fn,$url,true,null,_.opts.onLoad,_.opts.onError);					
				} else {
					try {
						if (XMLHttpRequest) {
							return XMLReq(_.opts);
						}
						if (XDomainRequest) {
							/* Microsoft IE */
							return XDOReq(_.opts);
						}
					} catch (e) {
						this['error'](e,_,Array.prototype.slice.call(arguments, 0));
					}
				}
			}
		},
		/* end xhr */

		/**
		 *  Obtains a package, initializes and executes it.
		 *
		 * @method pkg
		 * @param {*} 	$p			Parameter to check
		 * @returns	{*}	if valid, otherwise def (default)
		 * @memberof I$Alias
		 * @expose
		 */
		pkg : function ($p) {
			$p.a = ($p.x = 1) ?
			/**
			 *  pack a module.
			 *
			 * @method pack
			 * @param 	{*} 	$p			Parameter to check
			 * @returns {string} 	if valid, otherwise def (default)
			 * @memberof pkg
			 */
			function ($p) {
				/*pack*/
				$p.b = //<--Wrapper for package
					this.prototype.b64(//<-- LZW Base64 Encoded
						this.prototype.lzw.enc(//<-- JSON COMPRESSED
							JSON.stringify($p.y) //<-- Data to JSON
						))
			}
			 :
			/**
			 *  unpack a module.
			 *
			 * @method unpack
			 * @param 	{*} 	$p			Parameter to check
			 * @returns {string} 	if valid, otherwise def (default)
			 * @memberof Maestro.pkg
			 */
			function ($p) {
				/*unpack*/
				$p.a = JSON.parse($p.y);
				this.prototype.lzw.dec(
					this.prototype.b64($p.a));
			}
			//$param.y = data
		},

		/**
		 * Replace all occurrences of $p.y with $p.z in $p.z
		 *
		 * @method sra
		 * @param {object} $p	p.x= find, p.y=new and p.z source
		 * @returns {string}
		 * @memberof I$Alias
		 * @expose
		 */
		sra : function ($find,$replace,$str) {
			return $str.replace(new RegExp($find, 'g'), $replace);
		},

		/**
		 * Takes an array module names required by this app. Do not add an extension
		 * and only add path after base path. review information on your content namespace.
		 *
		 * @method req
		 * @param {array} $modules	
		 * @memberof I$Alias
		 * @expose
		 */
		req : function($modules) {return 0},

		/**
		 * An equivalent to PHPs die() function
		 *
		 * @method die
		 * @param {$object} $object	Nano Framework object or string name.
		 * @param {Mixed} 	$args 	parameters or error event details
		 * @param {String} 	this 		text for die message
		 * @memberof I$Alias
		 * @expose
		 */
		die : function ($object, $args, $m) {
			/**
			 * @method stopPropagation
			 * @private
			 * @memberof fn.die
			 */
			function stopPropagation(e) {
				e.stopPropagation();
				// e.preventDefault(); // Stop for the form controls, etc., too?
			}

			window.addEventListener('error', function (e) {
				e.preventDefault();
				e.stopPropagation();
				e.objectName = (!$object) ? this['db'][0][6] : $object;
				e.arguments = (!$args) ? 'none' : $args;
				if (typeof window.onError === this['db'][0][42])
					window.onError(e)
			},
				false);

			window.onError = function (e) {
				this['Class']['log']('DIE!!!', this['db'][0][10], e);
			}

			for (var i = 0; i < this['db'][6].length; i++) {
				window.addEventListener(this['db'][6][i], function (e) {
					stopPropagation(e);
				}, true);
			}

			if (window.stop) {
				window.stop();
			}

			throw '';
		},


		/**
		 * Set, add, remove or replace an elements classes. the second class $c2
		 * is only needed when using the replace action.
		 *
		 * @method cls
		 * @param {string} $el  	element id
		 * @param {string} $action	action [set|clear|add|remove|replace|toggle]
		 * @param {string} $c1		name of class to work with
		 * @param {string} $c2 		name of class used in replace of $c1
		 * @memberof I$Alias
		 * @expose
		 */
		cls : function($el,$action,$c1,$c2) {
			try {
				var $el=this['cnt']($el);if (!$el) return;
				switch ($action.toLowerCase()) {
					case 'set': 
						$el.className=$c1;
						break;
						
					case 'clear': 
						$el.className='';
						break;
						
					case 'add': 
						$el.classList.add($c1);
						break;
						
					case 'remove':
						$el.classList.remove($c1);
						break;
						
					case 'replace': 
						$el.classList.remove($c1);
						$el.classList.add($c2);
						break;
						
					case 'toggle':
						$el.classList.toggle($c1);
						break;
				}
			} catch(e) {
				err(this,e,{local:{},args:Array.prototype.slice.call(arguments, 0)})
			}
			
		},

		/**
		 * Toggles an elements visible state.
		 *
		 * @method tgl
		 * @param {string} $el  element
		 * @memberof I$Alias
		 * @expose
		 */
		tgl : function ($el) {
			var $el=this['cnt']($el);if (!$el) return;
			if ($el.style.visibility != 'hidden')
				this.off($el);
			else
				this.on($el);
		},

		/**
		 * show an element, all elements of tagname or name or class
		 *
		 * @method on
		 * @param {string} $el ordered by Id->TagName->Name->Class
		 * @memberof I$Alias
		 * @expose
		 */
		on : function ($el) {
			var $el=this['cnt']($el);if (!$el) return;
			$el.style.visibility='visible';
			this.cls($el,'replace','opacity0','opacity100');
		},

		/**
		 * hide an element, all elements of tagname or name or class
		 * Verified fully functional
		 *
		 * @method off
		 * @param {string} $el  ordered by Id->TagName->Name->Class
		 * @returns none
		 * @memberof I$Alias
		 * @expose
		 */
		off : function ($el) {
			var $el=this['cnt']($el);if (!$el) return;
			//Start transition to off
			this.cls($el,'replace','opacity100','opacity0');
			//if not cpanel, then set timeout to set visibility to hidden
			if ($el.id!=this['db'][0][14])
				setTimeout(this['hideCallback'].bind($el),1000);
		},

		/**
		 * Page Loader Enable. Cross-fade from Wrapper to Page Loader
		 *
		 * @method ple
		 * @memberof I$Alias
		 * @expose
		 */
		ple : function () {
			if ( safe(this,this['isCloudApp'],true)) {
			//if ( this['vld'](this['isCloudApp']) && this['isCloudApp']() ){
				if (this['cnt'](this['db'][0][40]) && this['cnt'](this['db'][0][24])) {
					//Turn Loader On
					this.on(this['db'][0][24]);
					//Turn Wrapper Off
					this.off(this['db'][0][40]);
				}
			}
		},

		/**
		 * Page Loader Disable. Cross-fade from page Loader to Wrapper
		 *
		 * @method pld
		 * @memberof I$Alias
		 * @memberof I$Alias
		 * @expose
		 */
		pld : function () {
			if ( safe(this,this['isCloudApp'],true)) {
			//if ( this['vld'](this['isCloudApp']) && this['isCloudApp']() ){
				// Does mLoader even exist? and is mLoader visible?
				if (($w=this['cnt'](this['db'][0][40]) && this['cnt'](this['db'][0][24])) && ($w.offsetWidth > 0 && $w.offsetHeight > 0)) {
					//Turn Wrapper On
					this.on(this['db'][0][40]);
					//Turn Loader Off
					this.off(this['db'][0][24]);
				}
			}
		}		 
	},
	{
		/** @augments I$NAME */
		/*
		someInterfaceName:I$SomeInterface,
		...
		someInterfaceName:I$SomeInterface
		*/
	},
	[				
	 'gei','gen','get','gec','gda','ise','cnt','esa','ega','aea','aet',
	 'ast','bnd','lds','xhr','sra',	 'die','cls','tgl','on','off'
	]	
);
	// ,'ple','pld','pkg'
