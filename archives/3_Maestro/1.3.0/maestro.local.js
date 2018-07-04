// ==ClosureCompiler==
// @compilation_level ADVANCED_OPTIMIZATIONS
// @output_file_name maestro.min.js
// @warning_level VERBOSE
// @extern maestro
// @extern $m
// @extern window.maestro
// ==/ClosureCompiler==

/**
 * @project maestro
 * @author Andrew Donelson <andrew@i2tmlabs.com>
 * @license http://i2tmlabs.com/license.html
 */

/**
  @classdesc <h1>Maestro <small>Object</small></h1>
  <img src="http://code.nanofw.com/i2tm/img/maestro_logo.png" style="display:block;max-width:100%;height:auto;">
  <p>Maestro is the main object or interface for the Nano Framework.</p>
  <p>It is time to take control of your web applications. There are plenty of
  libraries and frameworks out there but none are designed to work together.
  That is where Nano Framework comes in. We decided on Bootstrap for document
  structure and flow and jQuery for JavaScript coding. We have also added
  Modernizr for maximum compatibility and Font-Awesome for even more fonts.
  </p>
  <div>
  <h3>Features</h3>
  <ul>
  <li>XCORS Ajax</li>
  <li>Base64 Encoding & Decoding</li>
  <li>Lempel–Ziv–Welch universal lossless compression</li>
  <li>Integrated Versions Object (Even Bootstrap)</li>
  <li>Auto Loading</li>
  <li>Designed to manage and enhance Bootstrap</li>
  <li>Packager for Apps, Applets and Modules.</li>
  <li>Structured and Modular design for more versatile reuse of assets.</li>
  </ul>
  </div>
  <div>
  <h3 style="color:orange">
  Please note that while there is no charge to develop with the Nano Framework the
  software is private commercial code and there are some basic restrictions. It IS
  designed and built for developers. It's purpose is to allow developers to create
  versatile web applications that work on any platform with ease as well as having
  little to no development costs or licensing fees. You can only load the library
  from i2tm Labs CDN - Your ARE NOT authorised to load locally from your web server.
  To learn more please visit the website for complete licensing and detailed information.
  </h3>
  </div>
 
  <p>There are two ways in which you can load and use the the Nano Framework:</p>
 
  <h3>Normal Web Document Mode</h3>
 
  <p>This gives you Modernizr, Bootstrap, jQuery, Font-awesome and the Nano Framework
   but the the Nano framework will just load the libraries efficiently in the order
  and location they belong. It will not parse the CloudApp Configuration JSON so the
  framework will terminate execution, but you have access if you want to use this and
  that. So at the very least you can use ONE line of code to load all popular libraries
  and just start coding.</p>
 
  <h3>Nano CloudApp Mode</h3>
 
  <p>
  This mode will handle just about everything for you. Loading the libraries, creating and
  embedding the correct meta tags including Author, Copyright with auto date update for year,
  etc. It also provides local storage for application, publish, global and user settings and
  information. Applets for Rapid Application development - Applets have their styling and
  JavaScript embedded with them and they are encoded and compressed into a package. Applets
  can be included with a single line of code. You also get access to the Game Library (2DGL)
  Layouts, Skins Smart Color, Dynamic Configurations and more.
  </p>
  
  @todo 
  @namespace
  @name maestro
  @interface
  @copyright 2012-2014 by i2tm Labs - All rights reserved
 **/
 
/** @expose */ 
var $m = {};

/** @expose */ 
var maestro=$m;
 
/**
 * Alias for window.document
 * @example doc().addEventListener('webkitfullscreenchange', $m.fn.bootstrap._onFullscreenChange);
 * @returns document
 * @method doc
 * @memberof maestro.fn
 * @expose
 */
doc = function () {
	return window.document;
};

/**
 * Alias for window.document.getElementById
 *
 * @example
 * 		var element = gei("myDIV");
 *
 * @method gei
 * @param {string} $p
 * @returns element
 * @memberof maestro.fn
 * @expose
 */
gei = function ($p,$src) {
	return doc().getElementById($p);
};

/**
 * Alias for window.document.getElementsByName()
 *
 * @example
 *		var elements = gen("DIV");
 *
 * @method gen
 * @param {string} $p
 * @returns element
 * @memberof maestro.fn
 * @expose
 */
gen = function ($p) {
	return doc().getElementsByName($p);
};

/**
 * Alias for window.document.getElementsByClass()
 *
 * @example
 *		var elements = gec("red");
 *
 * @method gec
 * @param {string} $p
 * @returns element
 * @memberof maestro.fn
 * @expose
 */
gec = function ($p) {
	return doc().getElementsByClassName($p);
};

/**
 * Alias for window.GET()
 *
 * @example
 * 		get("head")[0].appendChild($script);
 *
 * @method gec
 * @param {string} $p The tag name of the elements you want returned, ie. HEAD
 * @returns {Collection} Returns the collection of elements with the given tag name
 * @memberof maestro.fn
 * @expose
 */
get = function ($p) {
	return doc().getElementsByTagName($p);
};

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
 * @memberof maestro.fn
 * @expose
 */
gda = function ($el, $useid) {
	var $result = false,
	$data = {};
	if ($useid == true) {
		if ($el = gei($el))
			$result = true;
	} else {
		if ($el === $m.z[0][45] || "body" || "head")
			$el = get($el)[0];
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
};

/**
 * Returns true if object parameter is a DOM Element and false otherwise.
 *
 * @param {object} Object to test
 * @return {boolean}
 * @expose
 */
ise=function($obj){
	try {
		return ($obj.constructor.__proto__.prototype.constructor.name)?true:false;
	}catch(e){
		return false;
	}
};

/**
 *
 * Checks node parameter. Returns an element no mater if the element is passed in or the name of an element.
 *
 * @example
 * 		var $el = cnt($element);
 *
 * @method cnt
 * @param {mixed} $el The name of an element or the actual element
 * @param {boolean} $all If more than one return all
 * @returns {Element} returns the Element
 * @memberof maestro.fn
 * @expose
 */
cnt = function ($p,$a) {
	var $result;
	if (typeof $p === "string") {
		$result = gei($p);
		if (!$result) $result = (!$a)?get($p)[0]:get($p);
		if (!$result) $result = (!$a)?gec($p)[0]:gec($p);
	} else if (ise($p)){
		$result = $p;
	} else $result=false;

	return $result;
};

/** @expose */		
esa = function ($el, $var, $val) {
	try{cnt($el).setAttribute($var, $val)}catch(e){return false}
	return true;
};

/**
 * Alias for element.getAttribute()
 * Get all data attributes for the given element.
 *
 * @example
 * 		var btnColor = $m('ega',"button","color");
 *
 * @method ega
 * @param 	{mixed}		$el 	The name of an element or the actual element
 * @param 	{string} 	$var	The name of the attribute you want to get
 * @memberof maestro.fn
 * @expose
 */
ega = function ($el, $var) {
	return cnt($el).getAttribute($var);
};

/**
 * Inserts a new element before a given element
 *
 * @example
 * 		aea('someElementID','DIV','newDivID','This is inner HTML');
 *
 * @method aea
 * @param 	{mixed} 	$el 	The name of an element or the actual element
 * @param  	{string} 	$ne 	element to insert
 * @param  	{string}	$id 	ID of the new element
 * @param  	{string} 	$html 	HTML to insert into new element
 * @returns {string} 	$id    Parent nodes id
 * @memberof maestro.fn
 * @expose
 */
aea = function ($el, $ne, $id, $html) {
	var $el = cnt($el);
	$ne = doc().createElement($ne);
	if ($id)
		$ne.id = $id;
	if ($html)
		$ne.innerHTML = $html;
	$el.parentNode.insertBefore($ne, $el);
	return $ne;
};

/**
 * Inserts a new element into a given element
 *
 * @example
 * 		aet('newDivID','h1','newH1ID','This is inner HTML');
 *
 * @method aet
 * @param 	{mixed} 	$el 	The name of an element or the actual element
 * @param  	{string} 	$ne 	element to insert
 * @param  	{string}	$id 	ID of the new element
 * @param  	{string} 	$html 	HTML to insert into new element
 * @returns Element returns the element just created & appended.
 * @memberof maestro.fn
 * @expose
 */
aet = function ($el, $ne, $id, $html) {
	var $el = cnt($el);
	$ne = doc().createElement($ne);
	if ($id)
		$ne.id = $id;
	if ($html)
		$ne.innerHTML = $html;
	$el.appendChild($ne);
	return $ne;
};

/**
 * Check if a value is valid (not null, undefined or empty)
 *
 * @example
 * 		if !(vld(foo)) { someFunction(); }
 *
 * @method vld
 * @param {mixed}	$p 	A value
 * @returns {boolean} true if the value is not undefined and not null
 * @memberof maestro.fn
 * @expose
 */
vld=function(a){return!(null===a||"undefined"===typeof a||!1===a||""===a)};

/**
 *  Checks if a param is valid (null or undefined) in which case the default value will be returned
 *
 * @example
 * 		if (foo=chk(foo,"bar")) { someFunction(); }
 *
 * @method chk
 * @param 	{mixed} 	$p			Parameter to check
 * @param 	{mixed} 	$def		Default value to return if p is either null or undefined
 * @returns {mixed} 	if valid, otherwise def (default)
 * @memberof maestro.fn
 * @todo Remove function
 * @expose
 */
chk = function ($p, $def) {
	return (!vld($p)) ? $def : $p;
};

/**
 *  Tests a boolean evaluation and throws an exception with the error string. (Assert)
 *
 * @example
 *   	$m('ast',foo,'BOOYA!');
 *
 * @method ast
 * @param  	{boolean} 	$test 	A boolean result test
 * @param 	{string} 	$error 	A string to throw with the exception
 * @memberof maestro.fn
 * @todo Remove function
 * @expose
 */
ast = function ($test, $error) {
	if (!$test) {
		throw $error;
	}
};

/** @expose */
dmp = function (array, return_val) {
	// http://kevin.vanzonneveld.net
	// +   original by: Michael White (http://getsprink.com)
	// +   improved by: Ben Bryan
	// +      input by: Brett Zamir (http://brett-zamir.me)
	// +      improved by: Brett Zamir (http://brett-zamir.me)
	// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// -    depends on: echo
	// *     example 1: print_r(1, true);
	// *     returns 1: 1
	var
	output = '',
	pad_char = ' ',
	pad_val = 4,
	d = doc(),

	getFuncName = function (fn) {
		var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
		if (!name) {
			return '(Anonymous)';
		}
		return name[1];
	},

	repeat_char = function (len, pad_char) {
		var str = '';
		for (var i = 0; i < len; i++) {
			str += pad_char;
		}
		return str;
	},

	formatArray = function (obj, cur_depth, pad_val, pad_char) {
		if (cur_depth > 0)
			cur_depth++;

		var
		base_pad = repeat_char(pad_val * cur_depth, pad_char),
		thick_pad = repeat_char(pad_val * (cur_depth + 1), pad_char),
		str = '';

		if (typeof obj === $m.z[0][8] && obj !== null && obj.constructor && getFuncName(obj.constructor) !== 'PHPJS_Resource') {
			str += 'Array\n' + base_pad + '(\n';
			for (var key in obj) {
				if (Object.prototype.toString.call(obj[key]) === '[object Array]') {
					str += thick_pad + '[' + key + '] => ' + formatArray(obj[key], cur_depth + 1, pad_val, pad_char);
				} else {
					str += thick_pad + '[' + key + '] => ' + obj[key] + '\n';
				}
			}
			str += base_pad + ')\n';
		} else if (obj === null || obj === undefined) {
			str = '';
		} else { // for our "resource" class
			str = obj.toString();
		}

		return str;
	};

	output = formatArray(array, 0, pad_val, pad_char);

	if (return_val !== true) {
		if (d.body) {
			//this.echo(output);
			//$id, $type, $args
			log($id, $type, output);
		}
		return true;
	}

	return output;
};

/**
 * Utility function for wrapping a callback function with its reference
 * @method bnd
 * @param {object} $scope
 * @param {function} $fn
 * @returns function
 * @memberof maestro.fn
 * @expose
 */
bnd = function ($scope, $fn) {
	return function () {
		$fn.apply($scope, arguments);
	};
};

/**
 * Utility function for loading javscript or Stylesheets.
 * No other file formats are supported.
 *
 * @example $m('lds','script','path/to/some/script.js');
 *
 * @method bnd
 * @param {string} $fileType either script or link
 * @param {string} $url full path to file, local or remote
 * @param {callback} $onLoad optional
 * @param {callback} $onError optional
 * @memberof maestro.fn
 * @expose
 */
lds = function ($filetype, $url, $onLoad, $onError) {
	var $p = {};
	if ($filetype == $m.z[0][0]) {
		$p.a.async = 1;
		$p.a.src = $url; //.js || .debug.js
		$p.a.type = $m.z[3][2];
		$p.a.onLoad = $onLoad;
		$p.a.onError = $onError;
		if ($p.c = gei($m.z[0][13]))
			$p.c.appendChild($p.a);
	} else if ($filetype == $m.z[0][1]) {
		$p.a.href = $url; //.css || .debug.css
		$p.a.rel = $m.z[3][4];
		$p.a.type = $m.z[3][3];
		$p.a.onLoad = $onLoad;
		$p.a.onError = $onError;
		if ($p.c = get($m.z[0][12]))
			$p.c[0].appendChild($p.a);
	} else {
		die(this, arguments, $m.z[0][39]);
	}
};

/** @expose */
// mrg = function(o, a, b) {
// var r, k, v, ov, bv, inR,
	// isArray = Array.isArray(a),
	// hasConflicts, conflicts = {},
	// newInA = {}, newInB = {},
	// updatedInA = {}, updatedInB = {},
	// keyUnion = {},
	// deep = true;
  
	// r = isArray ? [] : {};
	// deep = !objOrShallow;
  
	// for (k in b) {
		// if (isArray && isNaN((k = parseInt(k)))) continue;
		// v = b[k];
		// r[k] = v;
		// if (!(k in o)) {
			// newInB[k] = v;
		// } else if (v !== o[k]) {
			// updatedInB[k] = v;
		// }
	// }
  
	// for (k in a) {
		// if (isArray && isNaN((k = parseInt(k)))) continue;
		// v = a[k];
		// ov = o[k];
		// inR = (k in r);
		// if (!inR) {
			// r[k] = v;
		// } else if (r[k] !== v) {
			// bv = b[k];
			// if (deep && typeof v === $m.z[0][8] && typeof bv === $m.z[0][8]) {
				// bv = $m.mrg((k in o && typeof ov === $m.z[0][8]) ? ov : {}, v, bv);
				// r[k] = bv.merged;
				// if (bv.conflicts) {
					// conflicts[k] = {conflicts:bv.conflicts};
					// hasConflicts = true;
				// }
			// } else {
				// if (bv === ov) {
					// r[k] = v;
				// } else if (v !== ov) {
					// if (k in o)
						// conflicts[k] = {a:v, o:ov, b:bv};
					// else
						// conflicts[k] = {a:v, b:bv};
					
					// hasConflicts = true;
				// }
			// }
		// }
	
		// if (k in o) {
			// if (v !== ov)
			// updatedInA[k] = v;
		// } else {
			// newInA[k] = v;
		// }
	// }
  
	// return r;
// };

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
 * @memberof maestro.fn
 * @expose
 */
xhr = function ($url, $onLoad, $onError, $method, $data, $trace) {
	/**
	 * default dummy method
	 * @method _onLoad
	 * @private
	 * @memberof fn.xhr
	 */
	_onLoad = function () {}
	/**
	 * default dummy method
	 * @method _onError
	 * @private
	 * @memberof fn.xhr
	 */
	_onError = function () {}
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
				if ($opts.trace === true) {
					/** @this {Object} */
					var tmp = {
						url : $opts.url,
						state : this.readyState,
						status : /**
						 * Short Description
						 *
						 * @example
						 * @method name
						 * @param {type}	name	short description
						 * @return {type}
						 */
						status,
						text : this.statusText
					};
				}
				if ($opts.req.readyState === 4) {
					if ($opts.req.status >= 200 && $opts.req.status < 400) {
						$opts.onLoad($opts.req.responseText, $opts.url);
					} else {
						$opts.req.abort();
					}
				}
			};

			try {
				$opts.req.send($opts.data);
			} catch (e) {
				_.args = Array.prototype.slice.call(arguments, 0);
				err(this,e,_);
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

	getExt = function ($src) {
		var re = /(?:\.([^.]+))?$/;
		var ext = (re.exec($src)[1]).toLowerCase();
		return ext;
	}

	/* BEGIN */
	var _={opts:null};
	
	if (!vld($url) || $url === "") {
		$onError(new Error($m.z[0][41] + $url + ']'));
	} else {
		$trace = ($m.devMode)?$m.devMode:false;
		_.opts = {
			req : '',
			url : $url,
			trace : $trace
		};

		_.opts.method = chk($method, 'GET');
		_.opts.onLoad = chk($onLoad, _onLoad);
		_.opts.onError = chk($onError, _onError);
		_.opts.data = chk($data, 0);

		var h = $url.indexOf("http");
		a = $url.indexOf("applet.");
		if (h < 0) {
			//Local JavaScript or Stylesheet file?
			lds(getExt($url), $url);
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
				_.args = Array.prototype.slice.call(arguments, 0);
				err(this,e,_);
			}
		}
	}
};
/* end xhr */

/**
 *  Obtains a package, initializes and executes it.
 *
 * @method pkg
 * @param {mixed} 	$p			Parameter to check
 * @returns	{mixed}	if valid, otherwise def (default)
 * @memberof maestro.fn
 * @expose
 */
pkg = function ($p) {
	$p.a = ($p.x = 1) ?
	/**
	 *  pack a module.
	 *
	 * @method pack
	 * @param 	{mixed} 	$p			Parameter to check
	 * @returns {string} 	if valid, otherwise def (default)
	 * @memberof pkg
	 */
	function ($p) {
		/*pack*/
		$p.b = //<--Wrapper for package
			$m.prototype.b64(//<-- LZW Base64 Encoded
				$m.prototype.lzw.enc(//<-- JSON COMPRESSED
					JSON.stringify($p.y) //<-- Data to JSON
				))
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
	function ($p) {
		/*unpack*/
		$p.a = JSON.parse($p.y);
		$m.prototype.lzw.dec(
			$m.prototype.b64($p.a));
	}
	//$param.y = data
};

/**
 * Encodes data by converting to JSON, then converting to base64 and finally lzw compression
 *
 * @method enc
 * @param {object} $p	p.x= 'enc', p.y=any variable, array or object
 * @returns {string}
 * @memberof maestro.fn
 * @expose
 */
enc = function ($p) {
	$p=JSON.stringify($p);
	$p=$m.pf.b64.enc($p);
	return $m.pf.lzw.enc($p);
	//return JSON.stringify($m.pf.b64.enc($m.pf.lzw.enc($p)));
};

/**
 * Parses previously maestro encoded data back into a JSON
 *
 * @method dec
 * @param {object} $p	p.x= 'dec', p.y=any variable, array or object
 * @returns {string}
 * @memberof maestro.fn
 * @expose
 */
dec = function ($p) {
return JSON.parse((($m.pf.b64.dec($m.pf.lzw.dec($p))).join('')));
};

/**
 * Replace all occurrences of $p.y with $p.z in $p.z
 *
 * @method sra
 * @param {object} $p	p.x= find, p.y=new and p.z source
 * @returns {string}
 * @memberof maestro.fn
 * @expose
 */
sra = function ($find,$replace,$str) {
	return $str.replace(new RegExp($find, 'g'), $replace);
};

//
/**
 * Takes an array module names required by this app. Do not add an extension
 * and only add path after base path. review information on your content namespace.
 *
 * @method req
 * @param {array} $modules	
 * @memberof maestro.fn
 * @expose
 */
req = function($modules) {return 0};

/**
 * An equivalent to PHPs die() function
 *
 * @method die
 * @param {$object} $object	Nano Framework object or string name.
 * @param {Mixed} 	$args 	parameters or error event details
 * @param {String} 	$m 		text for die message
 * @memberof maestro.fn
 * @expose
 */
die = function ($object, $args, $m) {
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
		e.objectName = (!$object) ? $m.z[0][6] : $object;
		e.arguments = (!$args) ? 'none' : $args;
		if (typeof window.onError === $m.z[0][42])
			window.onError(e)
	},
		false);

	window.onError = function (e) {
		log('DIE!!!', $m.z[0][10], e);
	}

	for (var i = 0; i < $m.z[6].length; i++) {
		window.addEventListener($m.z[6][i], function (e) {
			stopPropagation(e);
		}, true);
	}

	if (window.stop) {
		window.stop();
	}

	throw '';
};


/**
 * Set, add, remove or replace an elements classes. the second class $c2
 * is only needed when using the replace action.
 *
 * @method cls
 * @param {string} $el  	element id
 * @param {string} $action	action [set|clear|add|remove|replace|toggle]
 * @param {string} $c1		name of class to work with
 * @param {string} $c2 		name of class used in replace of $c1
 * @memberof maestro.fn
 * @expose
 */
cls = function($el,$action,$c1,$c2) {
	try {
		var $el=cnt($el);if (!$el) return;
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
		err($m,e,{local:{},args:Array.prototype.slice.call(arguments, 0)})
	}
	
};

/** @expose */
err = function() {
	var callstack = [],
		isCallstackPopulated = false;
	
	//try {
		//i.dont.exist+=0 //doesn't exist- that's the point
	//} catch(e) {
		if (arguments[1].stack) { //Firefox
			var lines = arguments[1].stack.split('\n'),
				len=lines.length;
				
			for (var i=0;i<len;i++)
				if (lines[i].match(/^\s*[A-Za-z0-9\-_\$]+\(/))
					callstack.push(lines[i])
			
			//Remove call to printStackTrace()
			callstack.shift();
			isCallstackPopulated = true;
		} else if (window.opera && e.message) { //Opera
			var lines = e.message.split('\n'),
				len=lines.length;
				
			for (var i=0; i<len; i++) {
				if (lines[i].match(/^\s*[A-Za-z0-9\-_\$]+\(/)) {
					var entry = lines[i];
					//Append next line also since it has the file info
					if (lines[i+1]) {
						entry += ' at ' + lines[i+1];
						i++;
					}
					callstack.push(entry);
				}
			}
			//Remove call to printStackTrace()
			callstack.shift();
			isCallstackPopulated = true;
		}
	//}
	
	if (!isCallstackPopulated) { //IE and Safari
		var currentFunction = arguments.callee.caller;
		while (currentFunction) {
			var fn = currentFunction.toString();
			var fname = fn.substring(fn.indexOf($m.z[0][42]) + 8, fn.indexOf('')) || 'anonymous';
			callstack.push(fname);
			currentFunction = currentFunction.caller;
		}
	}
	
	try {
		var name,ancestry;
		
		name=(arguments[0].Class['shortName'])?arguments[0].Class['shortName']:null;
		if (!name) name=(arguments[0]['name'])?arguments[0]['name']:null;
		if (!name) name=(arguments[0].constructor.name)?arguments[0].constructor.name:$m.z[0][6];
		
		ancestry=(arguments[0].Class['_fullTypeName'])?arguments[0].Class['_fullTypeName']:$m.z[0][6];
	} catch (e) {
		name=$m.z[0][6];
	}

	if (isCallstackPopulated){
		lines.shift();
	} else
		lines=[$m.z[0][6]];

	//if (arguments[0].hasOwnProperty('shortName')) {
	if (name) {
		// Must be NanoFW object
		var NanoError=new Error();
		NanoError.who=name;
		NanoError.ancestry=ancestry;
		NanoError.what=arguments[1].name+": "+arguments[1].message;
		NanoError.where=lines;
		NanoError.local=arguments[1][1];
		NanoError.params=arguments[1][2];
		
		log(NanoError.who,'ERROR',NanoError);
	}
					
	// Just let default handler run.
	return $m.devMode;
};

/**
 * Toggles Maestro Control Panel on/off.
 *
 * @method tgc
 * @param {boolean} $on	optional parameter to force state
 * @memberof maestro.fn
 * @expose
 */
tgc = function ($on) {
	function hasClass(element, cls) {
		return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
	}

	if ($m.appMode==$m.z[0][47]) return;
	var $el=cnt($m.z[0][14]);if (!$el) return;
	if (!$on || hasClass($el, 'open')) {
		$el.className = $m.z[0][11];
	} else if ($on || hasClass($el, 'closed')){
		$el.className = $m.z[0][38];
	}else return false;
};

/**
 * Toggles an elements visible state.
 *
 * @method tgl
 * @param {string} $el  element
 * @memberof maestro.fn
 * @expose
 */
tgl = function ($el) {
	var $el=cnt($el);if (!$el) return;
	if ($el.style.visibility != 'hidden')
		off($el);
	else
		on($el);
};

/**
 * show an element, all elements of tagname or name or class
 *
 * @method on
 * @param {string} $el ordered by Id->TagName->Name->Class
 * @memberof maestro.fn
 * @expose
 */
on = function ($el) {
	var $el=cnt($el);if (!$el) return;
	$el.style.visibility='visible';
	cls($el,'replace','opacity0','opacity100');
};

/**
 * hide an element, all elements of tagname or name or class
 * Verified fully functional
 *
 * @method off
 * @param {string} $el  ordered by Id->TagName->Name->Class
 * @returns none
 * @memberof maestro.fn
 * @expose
 */
off = function ($el) {
	var $el=cnt($el);if (!$el) return;
	//Start transition to off
	cls($el,'replace','opacity100','opacity0');
	//if not cpanel, then set timeout to set visibility to hidden
	if ($el.id!=$m.z[0][14])
		setTimeout($m.pf.hideCallback.bind(undefined, $el),1000);
};

/**
 * Page Loader Enable. Cross-fade from Wrapper to Page Loader
 *
 * @method ple
 * @memberof maestro.fn
 * @expose
 */
ple = function () {
	if (cnt($m.z[0][40]) && cnt($m.z[0][24])) {
		//Turn Loader On
		on($m.z[0][24]);
		//Turn Wrapper Off
		off($m.z[0][40]);
	}
};

/**
 * Page Loader Disable. Cross-fade from page Loader to Wrapper
 *
 * @method pld
 * @memberof maestro.fn
 * @expose
 */
pld = function () {
	// Does mLoader even exist? and is mLoader visible?
	if (($w=cnt($m.z[0][40]) && cnt($m.z[0][24])) && ($w.offsetWidth > 0 && $w.offsetHeight > 0)) {
		//Turn Wrapper On
		on($m.z[0][40]);
		//Turn Loader Off
		off($m.z[0][24]);
	}
};
 
/**
 * Enhanced Cross-Browser cPanel/Console
 *
 * @method log
 * @public
 * @param {string} $id		Calling object name
 * @param {string} $type	type of call [DEBUG,INFO,WARN,ERROR]
 * @param {mixed} $args		Parameters, Stack or Error events
 * @memberof maestro
 */
log = function ($id, $type, $args) {
	var $msg,
	$nr,
	$nc,
	$nt;
	
	if ($id)
		$id = $id;
	else
		$id = $m.z[0][6]; //unknown
		
	$type = $type.toUpperCase();
	$args.local=(typeof $args.local===$m.z[0][7])?{}:$args.local;
	$args.params=(typeof $args.params===$m.z[0][7])?[]:$args.params;
	
	if ($args.constructor.name == $m.z[0][10]) {  //Error
		if ($args.hasOwnProperty($m.z[0][53])) {
			$msg=$m.z[0][54]+$args.what+'<br>';
			$msg+=$m.z[0][55];
		
			$args.where.forEach(
				function(ln){
					$msg+=ln+'<br>'
				}
			);
			$msg+=$m.z[0][56]+Object.keys($args.local).length+'<br>'
			for(var prop in $args.local){
				$msg+='\t'+prop+'\t{'+$args.local[prop].constructor.name.toString()+'}\t'+$args.local[prop]+'<br>'
			}
			$msg+=$m.z[0][57]+$args.params.length+'<br>'
			for(var prop in $args.params){
				$msg+='\t'+prop+'\t{'+prop.constructor.name+'}\t'+$args.local[prop]+'<br>'
			}
		}
	}else if ($args.constructor.name == $m.z[0][10]) {
		$msg = dmp($args, 1);
	} else if ($args.constructor.name == $m.z[0][9]&&$args.length>1) {
		$msg = new String().concat(Array.prototype.slice.call($args));
	} else
		$msg = $args[0];
		
	if ($m.appMode!=$m.z[0][47]&&$m.devMode>0) {
		$nr = $m.pf.$logID.insertRow(-1);

		if ($type == $m.z[0][26]) {
			//INFO
			$nr.className += $m.z[0][27];
			$nt0 = $m.z[5][6][1] + $m.z[0][28]
		} else if ($type == $m.z[0][32]) {
			//ERROR
			pld();
			$nr.className += $m.z[0][33];
			$nt0 = $m.z[5][6][1] + $m.z[0][34]
			//if we are in devMode display the console, other wise do an alert
			if ($m.appMode!=$m.z[0][47]&&$m.devMode>0)
				tgc(true);
			else
				if (console.log) console.log($msg);
		} else if ($type == $m.z[0][29]) {
			//WARN
			$nr.className += $m.z[0][30];
			$nt0 = $m.z[5][6][1] + $m.z[0][31]
		} else {
			//DEBUG
			$type = $m.z[0][35];
			$nr.className += $m.z[0][36];
			$nt0 = $m.z[5][6][1] + $m.z[0][37]
		}

		$nr.insertCell(0).innerHTML = $nt0;
		$nr.insertCell(1).innerHTML = '<i>' + $id + '</i>';
		$nr.insertCell(2).innerHTML = $msg;

		$m.pf.$log.push($args);

		if ($m.pf.$log.length > 100)
			$m.pf.$log.shift();
		
	}

};


(function($){
	var	
		z,
		vars = { NF : false	},
		name = null,
		version = null,
		devMode = false,
		appMode ='',
		gOldOnError = window.onerror;
	
	/** @expose */
	window.$m = $;
	
	/**
	 * Define a local copy of maestro
	 *
	 * @constructor
	 * @param {string}	selector	a short description
	 * @param {string}	content		a short description
	 * @type contructor
	 * @returns object
	 */
	maestro = function (selector, context) {
		// The maestro object is actually just the init constructor 'enhanced'
		// Need init if maestro is called (just allow error to be thrown if not included)
		if ($.fn[selector])
			return $.fn[selector].apply(this, Array.prototype.slice.call(arguments, 1));
		else
			return new $.fn.init(selector, context);
	};

	/**
	 * Returns a string version of a vendor library.
	 *
	 * @static
	 * @type Object
	 * @memberof maestro.fn
	 * @expose
	 */
	$.ver = function($lib){
		switch ($lib.toLowerCase()) {
			/**
			 * <img src="http://code.nanofw.com/i2tm/img/nano_banner_xs.jpg">
			 * <h4>Nano Framework Version</h4>
			 *
			 * @property nf
			 * @type String
			 * @memberof versions
			 */
			case 'nf' : return ''; break;
			/**
			 * <img src="http://code.nanofw.com/i2tm/img/bootstrap_sm.png">
			 * <h4>Bootstrap Version</h4>
			 *
			 * @property bs
			 * @type String
			 * @memberof fn.versions
			 */
			case 'bs' : return '3.1.1'; break;
			/**
			 * <img src="http://code.nanofw.com/i2tm/img/jquery_sm.png">
			 * <h4>jQuery Version</h4>
			 *
			 * @property jq
			 * @type String
			 * @memberof fn.versions
			 */
			case 'jq' : return '2.1.1pre'; break;
			/**
			 * <img src="http://code.nanofw.com/i2tm/img/modernizr_sm.png">
			 * <h4>Modernizr Version</h4>
			 *
			 * @property mz
			 * @type String
			 * @memberof fn.versions
			 */
			case 'mz' : return '3.0.0pre'; break;
			/**
			 * <img src="http://code.nanofw.com/i2tm/img/font-awesome_sm.png">
			 * <h4>Font-Awesome Version</h4>
			 *
			 * @property fa
			 * @type String
			 * @memberof fn.versions
			 */
			case 'fa' : return '4.0.3'; break;
		}
	}
	
	/**
	 * Object in which all private (internal) functions are stored
	 *
	 * @class pf
	 * @expose
	 * @type {object}
	 * @memberof maestro
	 */
	$.pf = $.prototype = {
		$logID : null,
		$log : [],
		
		/** 
		 * given a calling function name for maestro this returns a _fullPathName and shortName
		 */
		who:function($func) {
			$func=(typeof $func===$.z[0][7])?'':$func;
			return {_fullPathName:'Maestro|'+$func,shortName:'{NAME}'};
		},
		
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
		ldf : function ($p) {

			$p.a = $p.b = $p.c = 0;
			//Load Nano Framework
			$p.a = doc().createElement($p.x);
			$p.z = chk($p.z, '');
			$p.c = $p.z + '/' + $p.y;
			$p.w = chk($p.w, $.z[1][2]);

			if ($p.x == $.z[0][0]) {
				$p.a.async = 1;
				$p.a.src = $p.c + $p.w + $.z[1][3]; //.js || .debug.js
				$p.a.type = $.z[3][2];
				if ($p.c = gei($.z[0][13]))
					$p.c.appendChild($p.a);
			} else {
				$p.a.href = $p.c + $p.w + $.z[1][4]; //.css || .debug.css
				$p.a.rel = $.z[3][4];
				$p.a.type = $.z[3][3];
				if ($p.c = get($.z[0][12]))
					$p.c[0].appendChild($p.a);
			}
		},

		hideCallback : function($el) {
			$el.style.visibility='hidden'
		},
		
		/**
		 * Initialize Maestro. Creates dynamic media queries, combines with
		 * core styling and embeds in the document using a style tag.
		 * Verified fully functional
		 * @method dmq
		 * @private
		 * @param {object} $p		null - not needed
		 * @memberof maestro.pf
		 */
		dmq : function ($p) {

			/** create dynamic media queries
			 * @method cmq
			 * @param {object}	$p
			 * @private
			 * @memberof dmq
			 */
			function cmq($p) {
				$p.a = "";
				$p.a += $p.b[0][0].replace($p.b[5][0], '16');
				for (i = 0; i < 13; i++)
					$p.a += sra(
						$p.b[5][1],
						$p.b[1][i],
						$p.b[0][1]
					);
				for (i = 0; i < 5; i++)
					$p.a += sra(
						$p.b[5][3],
						$p.b[3][i],
						sra(
							$p.b[5][4],
							$p.b[4][i],
							sra(
								$p.b[5][2],
								$p.b[2][i],
								$p.b[0][2]
							)
						)
					);
				return $p.a;
			}

			$p.a = $p.b = $p.c = 0;
			$p.c = cmq({
					a : '',
					b : $.z[5]
				});
				
			/* ==|== Insert Maestro (Nano Core CSS)========================== */
			$p.a = doc().createElement('style');
			$p.a.rel = $.z[3][4];
			$p.a.type = $.z[3][3];
			$p.a.innerText = ($p.c + $.z[4][0]);
			$p.a.id = "maestro";
			//insert in head
			if ($p.c = get($.z[0][12]))
				$p.c[0].appendChild($p.a);
			
			//Create Maestro Common Container
			aea($.z[0][13], $.z[0][20], $.z[0][23]);

			/* ==|== Create mLoader ======================================== */
			$tmp=aet($.z[0][23], $.z[0][20],$.z[0][24]);
			//Add Class for mLoader
			$.pf.setTheme();
			//Create Ul (Animated notes)
			$mlUl = aet($.z[0][24], $.z[0][21], $.z[0][25]);
			//Create LI (Animated Maestro Text)
			$tmp = $.z[4][1];
			for (var i = 0; i < $tmp.length; i++)
				aet($mlUl, $.z[0][22], false, ($.z[0][17] + $tmp[i][0] + $.z[0][18] + $tmp[i][1] + $.z[0][19]));

			/* ==|== Create cPanel ========================================== */
			if ($.devMode>0) {
				$p.a = aet($.z[0][23], $.z[0][20], $.z[0][14], $.z[5][6][0]);
				$p.a.className = $.z[0][11];
				$.pf.$logID = gei($.z[0][15]).getElementsByTagName($.z[0][16])[0];
				//add padding to top of wrapper for debug bar
				cnt($.z[0][40]).style.paddingTop="20px";
			}
			
			//cleanup
			delete $tmp;
			delete $mlUl;
		},
		
		/**
		 * Check for the HTML data attribute theme [light|neutral|dark].
		 * defaults to light.
		 *
		 * Theme
		 * - Light	
		 * 		Maestro Notes 		ul#mView h1,h3{color:#222}
		 * 		Bubbles				ul#mView li {background-color: #888}
		 * 		Maestro background	#mLoader {background:#eee}
		 * - Neutral	
		 * 		Maestro Notes 		ul#mView h1,h3{color:#aaa}
		 * 		Bubbles				ul#mView li {background-color: #888}
		 * 		Maestro background	#mLoader {background:#666}
		 * - Dark	
		 * 		Maestro Notes 		ul#mView h1,h3{color:#eee}
		 * 		Bubbles				ul#mView li {background-color: #888}
		 * 		Maestro background	#mLoader {background:#222}
		 */
		setTheme:function() {
			var t='theme';
			$el=cnt($.z[0][45]);
			$el.dataset[t]=(typeof $el.dataset[t]==$.z[0][7])?$.z[0][48]:$el.dataset[t];
			switch ($el.dataset[t].toLowerCase()) {
	
				case $.z[0][49]:cnt($.z[0][24]).style.background='#666';break;
				case $.z[0][50]:cnt($.z[0][24]).style.background='#222';break;
				default:cnt($.z[0][24]).style.background='#eee';break;
			}
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
		 * 		$m.fn.lzw.enc("Test String");
		 * 		var a = $m.fn.lzw.dec($compressed);
		 *		//To use NanoFW encode..
		 *		$m.enc("I will be turn in to a JSON, Encoded and Compressed.");
		 *
		 * @class lzw
		 * @static
		 * @memberof maestro
		 */
		lzw : {
			/**
			 * Compress an string to LZW-encoded
			 * @method enc
			 * @param {mixed} s
			 * @returns string
			 * @memberof fn.lzw
			 */
			enc : function (s) {
				var dict = {};
				var data = (s + "").split("");
				var out = [];
				var currChar;
				var phrase = data[0];
				var code = 256;
				for (var i = 1; i < data.length; i++) {
					currChar = data[i];
					if (dict[phrase + currChar] != null) {
						phrase += currChar;
					} else {
						out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
						dict[phrase + currChar] = code;
						code++;
						phrase = currChar;
					}
				}
				out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
				for (var i = 0; i < out.length; i++) {
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
			dec : function (s) {
				var dict = {};
				var data = (s + "").split("");
				var currChar = data[0];
				var oldPhrase = currChar;
				var out = [currChar];
				var code = 256;
				var phrase;
				for (var i = 1; i < data.length; i++) {
					var currCode = data[i].charCodeAt(0);
					if (currCode < 256) {
						phrase = data[i];
					} else {
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
		 *		$m.fn.b64.enc("I will be encoded in Base64");
		 *		//To use NanoFW encode..
		 *		$m.enc("I will be turn in to a JSON, Encoded and Compressed.");
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
				var chr1,
				chr2,
				chr3,
				enc1,
				enc2,
				enc3,
				enc4;
				var i = 0;

				input = function (argString) {
					if (argString === null || typeof argString === $.z[0][7]) {
						return "";
					}

					var string = (argString + '');
					var utftext = '',
					start,
					end,
					stringl = 0;

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
				}
				(input);
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
			 * @memberof pf.b64
			 */
			dec : function (input) {
				var output = [];
				var chr1,
				chr2,
				chr3;
				var enc1,
				enc2,
				enc3,
				enc4;
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
		}
		
	};

	/**
	 * Object in which all classes are stored
	 *
	 * 	 $m.df.AccuTimer = $m.df.Base.extend('$m.df.AccuTimer',
	 *	 { ... },
	 *	 {
	 *	 	// Singleton static class, so nothing required here
	 *	 });
	 *
	 * @class df
	 * @expose
	 * @type object
	 * @memberof maestro
	 */
	$.df = $.prototype = {};

	/**
	 * Object in which all functions are stored
	 *
	 * You can define a function in the nano namespace like this:
	 *
	 * 	 $m.fn.foo = function($params) {
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
	 * @expose
	 * @memberof maestro
	 */
	$.fn = $.prototype = {};
	
	foo = function(f){
		constructor = maestro;
		
		length = 0;
		
		/**
		 * Sends a message to the server using AJAX. You may call this directly to send a custom message.
		 * it is also used internally for sending analytics event data to your account.
		 *
		 * @example
		 * 		$m({x:'msg',y:'Nano Framework Rocks!'});
		 *
		 * @method msg
		 * @param {object} $p
		 * @param {object} maestro	internal the meastro object
		 * @returns {boolean}	true is no error sending
		 * @memberof maestro.fn
		 * @expose
		 */
		f.msg = function ($p, maestro) {
			//encode Data
			$p = enc($p);
			try {
				xhr($m.z[2][0] + $m.z[3][1] + $p, function () {}, function () {}, 'get', $p, false);
			} catch (e) {
				log(e.stack);
			}
		};

		/** @expose */
		f.evt = function (element, event, fn) {
			if (element.addEventListener)
				element.addEventListener(event, fn, false);
			else if (element.attachEvent)
				element.attachEvent('on' + event, fn);
		}
	
	}($.fn);
	
	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	/**
	 * @param string	selector	function, element, tag or class
	 * @nosideeffects
	 * @memberof maestro
	 * @constructor
	 * @expose
	 */
	init = $.fn.init = function (selector, context) {
		
		if (!selector) { return this; }

		var	params 	 = Array.prototype.slice.call( params, 1 );
		
		if (selector.constructor.name!='Window') {
			if (selector.constructor.name===$.z[0][43]) {
				if ($.fn[selector]) {
					
					// Call existing public Entity
					return $.fn[selector].apply( this, params );
				} else if ($.df[selector]) {
					
					// Create a new existing class form the df
					return new $.df[ selector ].apply( this, params );
				} else if (params.length==1 && !$.df[selector]) {
					
					// Defining the base Class, called once
					return $.df[selector] = params[0];
				} else if (!$.df[selector] && params.length==3) {
					
					// Defining a new Class, called once
					//params0=new class name,1-array of classes to use,2-private object,3-public object
					if (params[0].constructor.name===$.z[0][9]&&
						params[1].constructor.name===$.z[0][44]&&
						params[2].constructor.name===$.z[0][44]) {
						
						//we have a valid multiple inheritance
						//Start with the Base CLASS 
						$.df[ selector ]=$.df['Class'];
						
						//now add the array of classes to inherit from (not Class)
						// params[0].forEach(function(cls) {
							// $.df[ selector ]=meastro.mrg($.df[ selector ],cls);
						// });
						
						//now take the private and public props from the new object and merge
						//$.df[ selector ]=meastro.mrg(params[1],params[2]);
						
						//return the new object definition
						return $.df[selector];
					}
				}			
			} else if ( typeof selector === $.z[0][8] || ! params ) {
				// Default to "init"
				return $.fn.init.apply( this, params );
			} else {
				//Don't gripe about it, just ignore it.
			}
		}
		return (selector, this);
	};

	// Give the init function the prototype for later instantiation
	init.prototype = $.fn;
	init.prototype.toString = function() { return "Maestro" }


	//First run - Load Release version of JavaScript and Style-sheet if no Parameters
	//Initialize Object
	/*
	$.z=[
	['script','link','put','get','clk','msg','unknown','undefined','object','Array',
	'Error',
	'closed opacity20',
	'head',
	'tail',
	'cpanel',
	'cpText',
	'tbody',
	'<h1>&#98',
	'</h1><h3>',
	'</h3>',
	'div',
	'ul',
	'li',
	'common',
	'mLoader',
	'mView',
	'INFO',
	'text-info',
	'info-sign">',
	'WARN',
	'text-warning',
	'exclamation-sign">',
	'ERROR',
	'text-danger',
	'remove-sign">',
	'DEBUG',
	'text-default',
	'wrench">',
	'open opacity100',
	'Only Javascript and Stylesheets can be loaded local or remote.',
	'wrapper',
	'URL provided is invalid [',
	'function',
	'String',
	'Object',
	'html',
	'webpage',
	'document',
	'light',
	'neutral',
	'dark',

	'anonymous',
	'shortName',
	'ancestry',
	'What: ',
	'Where: ',
	'Local: [',
	'Params: [',
	'-10000px',	
	'\n\r'
	
	],
	['nano','.release','.debug','.js','.css'],
	['//cdn.i2tmlabs.com'],
	['__utm.gif?','Microsoft.XMLHTTP','application/javascript','text/css','stylesheet'],
	[
	'html,body,#wrapper{padding:0;margin:0;z-index:10}#tail,tail{opacity:0;visibility:hidden;top:-10000}#cpanel{position:fixed;top:0;left:0;right:0;z-index:10003;background-color:#fff;color:#000;font-size:1em;padding:0;margin:0}#cpHead{width:100%;top:0;max-height:20px;background-color:#000;color:#fff;padding:0 10px 0 10px}#cpText{font-family:ubuntu}#cpLog{position:absolute;bottom:0;top:21px;width:100%;border:0;overflow:auto;color:black;text-shadow:none;font-size:70%;text-align:left}#cpanel.open{bottom:0;visibility:visible}#cpanel.closed{height:20px}.cpText{vertical-align:top;top:3px}.msgBox{position:fixed;top:10%;left:50%;width:300px;height:300px;text-align:center;margin-left:-150px;border:5px solid #888;box-shadow:0 10px 10px #ccc;background-color:#f5f5f5;z-index:10002;overflow:hidden}.deadCenter{position:fixed;top:22.5%;left:50%;width:320px;height:320px;text-align:center;margin-top:-160px;margin-left:-160px;border:5px solid #888;box-shadow:0 10px 10px #ccc;background-color:#f5f5f5;z-index:10002;overflow:hidden}.opacity0{filter:alpha(opacity=0);-moz-opacity:0;-khtml-opacity:0;opacity:0;transition:opacity 1s linear}.opacity20{filter:alpha(opacity=20);-moz-opacity:.2;-khtml-opacity:.2;opacity:.2;transition:opacity 1s linear}.opacity40{filter:alpha(opacity=40);-moz-opacity:.4;-khtml-opacity:.4;opacity:.4;transition:opacity 1s linear}.opacity60{filter:alpha(opacity=60);-moz-opacity:.6;-khtml-opacity:.6;opacity:.6;transition:opacity 1s linear}.opacity80{filter:alpha(opacity=80);-moz-opacity:.8;-khtml-opacity:.8;opacity:.8;transition:opacity 1s linear}.opacity100{filter:alpha(opacity=100);-moz-opacity:1;-khtml-opacity:1;opacity:1;transition:opacity 1s linear}@font-face{font-family:Neuropol;font-weight:normal;font-style:normal;src:url(http://cdn.i2tmlabs.com/content/i2tm/assets/fonts/neuropol.ttf)}.neuropol{font-family:Neuropol;font-weight:200;letter-spacing:12px}@font-face{font-family:Ubuntu;font-weight:normal;font-style:normal;src:url(http://cdn.i2tmlabs.com/content/i2tm/assets/fonts/ubuntu-r.ttf)}.ubuntu{font-family:Ubuntu;font-weight:normal}@font-face{font-family:TopGun;font-weight:normal;font-style:normal;src:url(http://cdn.i2tmlabs.com/content/i2tm/assets/fonts/top_gun.ttf)}.topgun{font-family:TopGun;font-weight:normal}@font-face{font-family:Edwardian;font-weight:normal;font-style:normal;src:url(http://cdn.i2tmlabs.com/content/i2tm/assets/fonts/itcedscr.ttf)}.edwardian{font-family:Edwardian;font-weight:normal}#mLoader{display:block;position:fixed;top:0;left:0;bottom:0;right:0;z-index:10000}#mView{position:absolute;margin:-30px -110px;top:45%;left:50%;width:220px;height:60px;list-style:none;text-align:center;padding:0;z-index:10001}ul#mView li{background-color:#888;width:25px;height:20px;float:right;margin-right:6px;box-shadow:0 100px 20px rgba(0,0,0,0.2);border-radius:10px 10px}ul#mView h1,h3{color:#444!important;font-size:150%!important;text-decoration:none!important;text-shadow:none!important}@-webkit-keyframes loadbars{0%{height:1px;margin-top:25px}50%{height:50px;margin-top:0}100%{height:1px;margin-top:25px}}ul#mView li:first-child{-webkit-animation:loadbars 2.0s cubic-bezier(0.645,0.045,0.355,1) infinite 0s}ul#mView li:nth-child(2){-webkit-animation:loadbars 2.1s ease-in-out infinite -0.5s}ul#mView li:nth-child(3){-webkit-animation:loadbars 2.2s ease-in-out infinite -0.5s}ul#mView li:nth-child(4){-webkit-animation:loadbars 2.3s ease-in-out infinite -0.5s}ul#mView li:nth-child(5){-webkit-animation:loadbars 2.4s ease-in-out infinite -0.5s}ul#mView li:nth-child(6){-webkit-animation:loadbars 2.5s ease-in-out infinite -0.5s}ul#mView li:nth-child(7){-webkit-animation:loadbars 2.6s ease-in-out infinite -0.5s}',
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
	['<div id="cpHead"><span class="cpText">Maestro cPanel</span><span id="btn_cpanel" class="pull-right cpText glyphicon glyphicon-cog" onclick="tgc(\'cpanel\');"></span></div><div id="cpLog"><table id="cpText" class="table table-hover table-striped"><thead><tr><th>Type</th><th>Object:ID</th><th>Message</th></tr></thead><tbody></tbody></table></div>','<span class="glyphicon glyphicon-']
	],
	[
	'copy', 'cut', 'paste',
	'beforeunload', 'blur', 'change', 'click', 'contextmenu', 'dblclick', 'focus', 'keydown', 'keypress', 'keyup', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'resize', 'scroll',
	'DOMNodeInserted', 'DOMNodeRemoved', 'DOMNodeRemovedFromDocument', 'DOMNodeInsertedIntoDocument', 'DOMAttrModified', 'DOMCharacterDataModified', 'DOMElementNameChanged', 'DOMAttributeNameChanged', 'DOMActivate', 'DOMFocusIn', 'DOMFocusOut', 'online', 'offline', 'textInput',
	'abort', 'close', 'dragdrop', 'load', 'paint', 'reset', 'select', 'submit', 'unload'
	]
	];

	//		[100,97,95,80,70],
	$.z=enc($.z)
	//$.z=JSON.stringify($.z);			//4374
	//$.z=$.pf.b64.enc($.z);		//6324
	//$.z=$.pf.lzw.enc($.z);		//2969 || 2098

	window.console.log('$.z='+$.z+';');
	vars.NF=true;
	*/
	if (!vars.NF)
		$.z="W1sic2NyaXB0IiwibGluayIsInB1dCĖImdlĜĞmNsĔĤ1zZĕėnVē25vd24iLCJ1bmRlZmĒZWQĸĺvYmplY3ņĹJBcnJheSĞkVycm9ĕčiY2xvĄVkIG9wYWNpdHkyMĝėmhōŅŇJ0ůlėŢŎBhĽVƃĎƅUZXhċŢdGJvZŴŇI8aDE+JiM5OŸIjwvƜƞPGgzPiĞƧƩDM+ČĎZđ2ƸidWĎőħřŹNvbĀǇƱŹ1Mb2FkƎČőtVłĢĭIklORk8ž0ƎƐLWŃmǡőpĽZvLXűZĲcƦķőXQVJOƽƓV4Ĝ13YXJēW5nƽǤjĐFtȅRǬĶtĄlnblĎưŚVSUk9řƒGȀȂkůȊǓžyń1ĴmUȖ2ȘȚȜǋǛRFQlVHǾȦȁC1ǒWZhƿxƑĎd3JlĽNoXĝƷŢb3BɑiBŧGFjĈR5MTAwƽTĲsŘBKȅɈĄĆĈĊūFuZCBTųƂƎɓńV0cyBjů4gŊUgĐ9hƺũūŦŤFėŬĕHɐǈ9ǣSǷĺ3ŞFwcȦšĎVǻMIHByəZpʒŪđzūĒdmʗaŅgWǚmZļĥ0ʾ9uƽU3RćȉȋŢɫJqńNɌiaHRtbƥnġYęʑ2UžkǏNļWİģŹxʴ2ƐƽƈěʛƇƥľhŞĂőƇşueǉdXMžzaʙdE5ƇW˦˾ɒlcˍyŘĞĢoȅQ6Iƥ̙ƎɐOiAžǎąƇDoˀǚlƆʤȖz̫ˁĞi0xMDɨMʯ4ƽXG5cciJdLʗďʼubǚi5ȮWxōǱlƽLľōįˑǁŋʸŢ͘Nzʅ͈͆˽y9jƺ4ēTſǈxhˢMuŤ9tIl0sˁJfX3ʃbSȊʾY/ɪǧjŞ9zǏZ0LlhNTEhUVF̥˾cʯħŰɉđǊ9qɱ˻ąćĉ˘ǿɃͩ̔̆őzɾsʀoʂċͺͼyJoƓāLƔƖŴė3dyȅBw̡7ʧǑƺŃ̲wO21˻ĠǬjoϓ3otʾ5ǒXg6ɦB9IˍhʾwsƓFǬHtɟɡɣƣjA7ʻl̈WJǬđ0eTpoʾǟń4ϺŬϓ̶̸̺w̼0ʈɚ˿ƉeɚŧȵˇWˉO˃peȦkOˍŧ̪ϓťŀn̜̹tˏdξШХϞϠϢϤɦ̻Ƶ7Ŋϵ2χəİɺ1ȎťŧϚͪ˃mϔǆʏỵMБ̺7ŁˉȂ̈XŌOjFɑTtŮWǟϠnћϹǈFȮȵuћϧIąwSȦʑϲ3Їˇ̪ЏAǝЦcгϕŗɄηǧn˚ЭjϊeDtţŰrZɏĴȉkǦэʙѐђϹͶsəI̝2ŁZjѠůѣːѦgϦweCɨIƝʦHhϨѰVɂųtmǏ5Αɇ̎ƂЃp1ˢ˭HVҴNwTŬnИɞȗМОʼă29ϮXĿϔƕųRǇTϛХӝѾoŶĉ4Хdʴ˛oћEБCUмşȮʨѦ7ʲ̓˃Ҝʣ6ȅ΂ztхŦcjpďɠɢԀǣƏΑǱ̚ѢĴzp͌ĲǝҠǇЬȴl6Zӟ3ŷӱέȂƇđșԅεɇ0fSN΋ɠɹǀ͌ɚɑnҌəR0Ǐ0ϥҋ2ĈűŊƂ϶OnʳȗԇӇѯӉȪɑC5ȎŬīѢ7̉V˱ƐћIұҳ͡wҶȧϲҠȆМN˸ϖĐȶԅԹ3ϹƓŭћӉeH0͌ǱЬş4ӎКͺˈѬРТũӡЧo̸ӰӷȦĠ̪ǍֆĵlkƓиzɨΞgՔȦ՗0ћё̼BӧˍlղQȑ͒˱4ӽ2˭ӵҀŞөbiāńΐ̷̣Ε҉ҋďɏϢҞNӦʮҖ֎̞MӧD֕Ŋ94ǰɓҥԑϛүӮ֔ҩT҉ҭʈąjӚͲ2tnΌ˅֢қҝҟY1ҢǗΕt6ǦŃɂӭҙяӕբJҺŬ3ПhʴGĿbnմʒʑENԴĿŔѠəűƓlǇԅmĈŻZҋիAϥjIuNȠևǗd֊ԠϺȵ֏ƭϥʸұ֕Օ֚֘Ŷ̽ӡ֠Hן֤ǳ֦Ť֩Ŝϔϖ֬Ǭ֯ؑשΖ2֜ӧ֫Ϙְ֮ԩֳxԭֶԶֹǓ6ּ֝־ǇđŪCׂOׄӲׇ׉ԏӝdϒ׎ؤבדAוԭטŤכםĽןӕӻҞѯףץĥџשǧɹ׬jӮ̹Aׯ9ױ׳9׵ź׸׺׼ԲƆŤͺЃBєłϮӵʼsʧhhKЌů؇Ŵ9ŷk7ǦȰe֯ϴɢӘϷϹǦtξGπНѡڗkԼϳώڢɤӶųŖ׻؇Σbԅڡ϶үFʸG˰ƈ˻ڄəچЛЃ՚eҠϱ؃ԅƇʯ̚ShڼڣPT՚KTs˝НٳŭږŲŴשؔڜWڧοsǦ۠ŰۢڮLۥۆיڈӟuMңʄ͋ӐսП۬ڭҩ̅ʎđ԰ѩԫĳڱ϶NDڊŁƂǿяڏڑړڕۭųȢ܊ApOy1˝ϝܞۇ۴oؖDۜa˲Թǀܠ۳Ђ۵܊ڰԈՃi4֙̕ȪјȓǏ֦۲ڇЂSAxʅBΠ5͔J9͘۾ۮؽϲ،͒ԋҞůxw̉EoܼۈT0ؽCڛڝvڟȰ܈ڣ̣42ܛ1r˚˜˞ݢܱݤܳݧӕڬۮۤYϺ˷ڷŲڹڻݣɤھۀۂmVۄմݘ۴gҫیb˛̓ۏތBے۔ݾ5ۗމۚۜʝ۟ݴܖۤ֕ڦڨڪ݊ޝ۰֕އܭܣٕt۹ɸۻНվޣŴ܀M܂ŃW܅΄ەɤйފʳތێpېޑYۓ޺ޕΖӯݞǉݡ߆ӭۦۨک۪ګۡޝɦܰϵݤٷݸڶnڸ؉ںp߆ހʔǬރۄ1AѕuȂmږ֠ԗ׻֢ŁȐʾxƣk݅̄ƕʧӖϔǮ߱tĵՖǳ՘m܇mէҋҺĲԍ˗͓̂ПࠇࠉtͣmM6ߺsڔƐųؒLͨͪGͬaͮܩͱͳ͵ӕtLąԘڃQƩࠥ΃ʐ̔؁ųMƖ̀࠷Ǉރ1ΌwǏw߫˛mKXކ࠽࠿ǏxڋіɄ߭ĀϱڮTࡉşࡀ2wࡍ߫Ʉ3ńȘ҆ؓɨϔ͓Ӝܱ̓֯ͣҧٷŝҲ9QG߿ԙ߳ͪXҹһҽɈǈӀЄVӄࡃӱߪȂ࡝҄ࡠĽŠѨs߾Ԙ֢̔ɤĐU6ࢆʱ޷ࢉ3ĆYԒ࠾mwІ˛ʄ̪ǯą˨͏pMnݬɠăyՏԺŉӕ߫Ȧ࡛9ࢥࢧࠫǐͣ֨ʄͨࠋҼʅ9ӃįࡿȖ͏0ƓYp܆ࣀӅV࡚߬ů1ࡒ6VϾļࢧ1ࢊࠀࠂاࠆŧࠈېߨࢁࡏ߮ۋࡱ߲ʼϟ͒ƣlӢEdļңࢼԍġʾб؛ԓəJ֣࡙࣡ĪδԝࣷɏࣺύɏחįʱChξ˛Ѝ8ࢮRu͘ŵ۩ůJz͡ǇSͩࡷńҼࠬऒG0ŉǱīӘख߰ࢧखѽF9ˠWͬӜࡅࡇࢰŭҐİࣤࢋt߳ࣨ߶O࣫ŧ࣭࣯ࡶࠌǰࣳWࣵDऀࣹݒ࡮ࡰसࡳƎूझҾࡺɭЄFƗdϗȓʉ࣍࡜࡞҅ح࢑ӳ࢈ࣘԙࢍ5࢏ॢࢇ࢔Х࢙ࢗŞ࢜ݫ࢟oࢡNࢣ5ࢴࢨFࢪࢬ2डͶࢰ˭Cࢳࢦ˜ࠬڿŨࢺ9ࣱࢾݻ؁Ɨԭ̈́Ҽࣆࣈ΄ŀHख़Şज़ȉढ़1ࡐ࣐ތڮRѢȄȆkʾɸ॥֢ࣚࠄ֙ࣜŞէճȎUʕѢ̓ԵধǱࡀɠƣmJҜąrХӏЛۼտУւӣЩ͓ZЬگָԸԺگавӠܟжƎиɧђѮϕWʾV3պޮӒॻĄӖ̄әـ֭ϚtMz١৮߈֔ЋկjQ1JџԨֲjUw৺tѶѢѸӤ۷و҃࡟ॡهҫҋħǱࠍЂ͒ǝࣜĽԡҷɄԤթpͪȉݐύɠǒ܃Zϒдࣨϡ৙ϥ৛̹फƿwȎVʳƎc޵Ӳор΁ɹɄԂчoחׄ֞өƗRӬؔ࠾Hإ֗ভՙؤڋʕǹ6ŞਊQӷ޷ѪĒǰϿੋͪ਍ىgȴڒƺٿҨ޼אਇҫɻѪŖK̺sŷwwL̺۶iڛ׆ӴŜਖ਼ʑđ࠾̸̲̽ٞΞҳਮਰਲX਴ƪħDNм٫סIzQ0NCϰbĉŧࢧƇЬঝјњٷ֋UϫĀࡀɏƀਞث֡हȦȎɏ΢ߟԅԔ݅IǧȖ̊ԯ؛ޫǤࠍٚԑࣷԕ઴lશŠϯࡃߨॄōmtŲɄҏXlm̰Ǝ޴ʏ੻ŖŔઌŷ࣌ئਜ਼ʥҊtȑȆ҅मࠁЌՙੇҳΕѻۋŻࣴ৕Ǎت৫ظ1غВѺ߯૭ॆ৕݁ੈ੕ѩǳ੘Әփyٍ4Ϳ1ļCNǖǘχ݃ࠤp،Ȇγ਻̉ɿHۜࠂ˙ЛǦɸʾϖ؈؊pীǑнŝyٺ۰Bۀ˪ՁjǦɐeǘ̈́މ۰YઓSੰ۰Aସ଺jM1ؗwxKSBߥ޾łʟ֓3ଈ˞ଋǗlǙଏЄࢰ੟Ť׷ĐQŏlڜXˡ૊ૌէłૡܹĶ࢑Ŭ૖ۄ޴̆4݁ʆ͔؁תऐНěɻୈߥͺZܿ৮C4࠾୍ଉ୐଍ʆħ୕֐ȑ˲Ѐ୛My୞ૈŊોԣĽૂȒȔܻ୪ƺ૗n୭ܳଧɛȅ୳ٴ۫୷େǭ୺ୋ୾஀̔୎ଊଌ୒଎இԓஉ୘஌oઔஐୠૉஓਙக୦஘୩ʐ஛୬ҩܳͣୱ஢l୴஥Ĝ஧Рகபŷ஬ஂ୏ர୓ளୖஊ୙G୛ؗ஺ୡ஽୤஖Әு૕௄Ŕஞܴ݂୲ோத୶௎୹௑୼A஫஁ம஄றஆଐ௚ஶ୚ஸi௠஼ୣ˿௤୧ங௃Ɣ௅୮࠾௉͕ௌ௰୸ந௳୽௓௷ஃௗல௼வ஋௿Ćంஒఄி஗ܺூ୫௩ெݦ௬ொఐࢿ௱ఓ୊௴௶̔0ĸȐb৯MŹǡXSxసzUĮČఽి৯cĮņ౅ీQĮ̆ో৯YŹ˦౐z఺ğEi్ౕğవXVě͈˝ǛBहѢp߄ƆĐwg૬ܩ౬षࠀȗԜЄ7ǟ9OΚNJWś9৴ͿవőAǈũʾEgɳ͑İɷ਺Aݗ޷׈শϻͪSȃѷƜ̫e0ȻũlDRVdJȻRIͿ֝୅ڊ͘ɅٜԆֱࣝʍۋэࢧԴ̜J3tEಡZJ઒VఽURUSH1੨d9ԫŚ౥ńज़୆࠼߶־΋ރɜ౪mQgKफ़Ͼݪǹ۝੘ಓłಕೇ؍Ս1ψ௥bԒ౶FBQԫஐľʦैiರŞ࣌ঀǿ̪߫ӍಜQUճn܆kʧڮŊǗࣸ߯಴࠯6ಸ಺UEl9ಸ1ޡ۪ςƗk౭धࢌȵ౴p౶Ȣ౹೮Dȿ0͖કǬઘŔRછ੔ಁౚాసϸ֙CୃOۘੱƝǍz౒ɦ઒੯̸ാ2ੲEя੭ɦEzNčЏI1ੲkݜw࢖jgs͢՚ੲଷ੯֙൉أ౐ହx۰఺Mʠ൑DĖୀͻWz൓െ଄ഷنD్ɦŵੲIӧF൭zٸ൳ٹ੮৛െӯୃ̹B͇͉ಛZۗ࣫TSՖFೋĮ಺಼ಾ0ೀȠೃ೅ಂĺ೭೯ඓĘഐഒϨŢඋඍRQ৸RϨκ̴8ϐƼّPVƋɚIńǑɕI+PHՋमʋť˻ԟ9ɕJ΋FĿղRǵj5NůVγʛvūNQՌbDƨ̔౪j48ෞƇɝʴD࠾ğͯഓԮɸń݁Čʇȏͣz෨ęļGwȖłॠ೙ƌ઻ūdɭĉІŰǊBșHțଖх4ஊबරʎĲՐlԉ෵RnYygธЕƈsJyڛරලঃࡨɸPƳනศxহYgʾQෆĺ΋EŦ˄Ȝjɋऔε୆෦෨ĥ՞ҷʥƱGĦ஢Ưඵƾࢩ࢏gϯԇȳ̉ټǓํ๋GȳࢍΪɛZใหˇѳ؏෡ų඼඾੄P࣫͂๖8Lˍo๝ƜޕŊŌŎ̜ȠQ๪๬๮DැʀാॆlPঃѸ෡๫ˎศƨƓŻůQල˛ď2ɤຆĴങŴฤʞ฻ԝ຃ຏŲ෠ƙ෢ฝɝՐঈ෴ǵĠขޑʾэɝจชđฌ͸lౡ͉ͶҫǄğ˪ˮĘ̯֟ƽഈҺɏĢȉତŪƄmx࠾ȹĥԏȫີĥΠNrຼࢯԢکԴ̐ĺȩ໅ณɢ˂ǮŎීƽܧV5੢3֮Ĥt֠ĉȮण໠֨5̄Μĺܞී೎ĴĶž໳ՒȰʻ໖ࣹсՒమ˹໻͕Ӹ̈́ĩĴ͕໰ȭʀСȲ̇Ŏƕ౫žEݚࣗǏĿSȉतſńŐĺ༔0༖ຏlUރܞZŀƥkRۗUĳʒSȯȱũท༑ೂŉ΁౦ҼƽRE9ΕşǒUĒŨyǿk༙Ҽbಜ༸V༺˘༽༿QӘʄkȰϐݎʓŢདෘ˲ϗɡ܏RɠƀUབྷđཙໃĎཛྷণ͓ಅ߫̌̎VD̉෭֨ཀྵiཛྷནԸ੒ƾӘlࡔȐZU׊ː༝༓༕BŎȓʻർ୼Ś༬Tƍཌྷz༙ʡJ༠1G˩࠾0༁Ĥˉըɹ໌ঋŁނ໽ԋƐཉw̄༞Ŗ੷ຸໍ؆͖ŢƗŖǳˎə໱িǏǑƽώǬЬ་༉˟؁ĐVjຸߝӃࠈૌĞࣁ௧ĺྫྷ==";
	$.z = dec($.z);
	
	
	//Initialize HTML:data-role attribute
	$tmp=cnt($.z[0][45]);
	
	var vr='role';
	/** @expose **/
	$.appMode=(typeof $tmp.dataset[vr]===$.z[0][7])?$.z[0][46]:$tmp.dataset[vr].toLowerCase();
	if (gei($.z[0][13])==null||gei($.z[0][40]==null)) 
		$.appMode=$.z[0][47];
	
	/** @expose **/
	$.devMode = ("yes"==="yes"||$tmp.dataset.debug=="yes")?1:0;	

	// Override previous handler.
	window.onerror = $.pf.err;

	$.toString = function() {return 'Maestro!'};

	/** @expose **/
	$.version = '1.3.0';
	/** @expose **/
	$.name = 'Maestro!';
		
	//if name is set and we have both wrapper and tail then 
	//this is most likely a nanoFW document
	if ($.name.length!=7&&$.appMode!=$.z[0][47]) {
		$.pf.dmq({});
		off('cpanel');

		//Execute on Load
		if (!vars.NF && location.protocol != "file:") {
			$.pf.ldf({
				x : 'script',
				y : 'nano',
				z : '{VERPATH}',
				w : '{VERTYPE}'
			});
			$.pf.ldf({
				x : 'link',
				y : 'nano',
				z : '{VERPATH}',
				w : '{VERTYPE}'
			});
		}		
	} else pld();
		
	//Cleanup
	delete vars;
	delete vr;
	
	/** @expose */
	window.maestro = $;
	
	log($.name, $.z[0][26], [$.name+' v'+$.version]);
	
	return $;

})(maestro);
