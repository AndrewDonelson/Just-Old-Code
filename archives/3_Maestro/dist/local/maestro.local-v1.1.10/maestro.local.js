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
 
  
  @todo Add support for inverse loader (black on white and white on black) in application attributes
  @namespace
  @name maestro
  @interface
  @copyright 2012-2014 by i2tm Labs - All rights reserved
 **/
(function($){

	var	vars = { NF : false	},

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
		if (maestro.fn[selector])
			return maestro.fn[selector].apply(this, Array.prototype.slice.call(arguments, 1));
		else
			return new maestro.fn.init(selector, context);
	};

	/**
	 * Returns a string version of a vendor library.
	 *
	 * @static
	 * @type Object
	 * @memberof maestro.fn
	 * @expose
	 */
	maestro.ver = function($lib){
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
	 * Enhanced Cross-Browser cPanel/Console
	 *
	 * @method log
	 * @public
	 * @param {string} $id		Calling object name
	 * @param {string} $type	type of call [DEBUG,INFO,WARN,ERROR]
	 * @param {mixed} $args		Parameters, Stack or Error events
	 * @memberof maestro
	 */
	maestro.log = function ($id, $type, $args) {
		var $m,
		$nr,
		$nc,
		$nt;
		
		if ($id)
			$id = $id;
		else
			$id = maestro.pf.db[0][6]; //unknown
			
		$type = $type.toUpperCase();
		
		if ($args.constructor.name == maestro.pf.db[0][10]) {
			$m = maestro.fn.dmp($args, 1);
		} else if ($args.constructor.name == maestro.pf.db[0][9]) {
			$m = new String().concat(Array.prototype.slice.call($args));
		} else
			$m = $args[0];
			
		if (maestro.devMode>0) {
			$nr = maestro.pf.$logID.insertRow(-1);

			if ($type == maestro.pf.db[0][26]) {
				$nr.className += maestro.pf.db[0][27];
				$nt0 = maestro.pf.db[5][6][1] + maestro.pf.db[0][28]
			} else if ($type == maestro.pf.db[0][32]) {
				$nr.className += maestro.pf.db[0][33];
				$nt0 = maestro.pf.db[5][6][1] + maestro.pf.db[0][34]
			} else if ($type == maestro.pf.db[0][29]) {
				$nr.className += maestro.pf.db[0][30];
				$nt0 = maestro.pf.db[5][6][1] + maestro.pf.db[0][31]
			} else {
				$type = maestro.pf.db[0][35];
				$nr.className += maestro.pf.db[0][36];
				$nt0 = maestro.pf.db[5][6][1] + maestro.pf.db[0][37]
			}

			$nr.insertCell(0).innerHTML = $nt0;
			$nr.insertCell(1).innerHTML = '<i>' + $id + '</i>';
			$nr.insertCell(2).innerHTML = $m;

			maestro.pf.$log.push($args);

			if (maestro.pf.$log.length > 100)
				maestro.pf.$log.shift();
			
		} else {
			if (window.console)
				window.console.log($m);
		}
	};

	/**
	 * Object in which all private (internal) functions are stored
	 *
	 * @class pf
	 * @expose
	 * @type {object}
	 * @memberof maestro
	 */
	maestro.pf = maestro.prototype = {
		$logID : null,
		$log : [],

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
			$p.a = maestro.fn.doc().createElement($p.x);
			$p.z = maestro.fn.chk($p.z, '');
			$p.c = $p.z + '/' + $p.y;
			$p.w = maestro.fn.chk($p.w, maestro.pf.db[1][2]);

			if ($p.x == maestro.pf.db[0][0]) {
				$p.a.async = 1;
				$p.a.src = $p.c + $p.w + maestro.pf.db[1][3]; //.js || .debug.js
				$p.a.type = maestro.pf.db[3][2];
				if ($p.c = maestro.fn.gei(maestro.pf.db[0][13]))
					$p.c.appendChild($p.a);
			} else {
				$p.a.href = $p.c + $p.w + maestro.pf.db[1][4]; //.css || .debug.css
				$p.a.rel = maestro.pf.db[3][4];
				$p.a.type = maestro.pf.db[3][3];
				if ($p.c = maestro.fn.get(maestro.pf.db[0][12]))
					$p.c[0].appendChild($p.a);
			}
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
					$p.a += maestro.fn.sra(
						$p.b[5][1],
						$p.b[1][i],
						$p.b[0][1]
					);
				for (i = 0; i < 5; i++)
					$p.a += maestro.fn.sra(
						$p.b[5][3],
						$p.b[3][i],
						maestro.fn.sra(
							$p.b[5][4],
							$p.b[4][i],
							maestro.fn.sra(
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
					b : maestro.pf.db[5]
				});
			//Insert Maestro (Nano Core CSS)
			$p.a = maestro.fn.doc().createElement('style');
			$p.a.rel = maestro.pf.db[3][4];
			$p.a.type = maestro.pf.db[3][3];
			$p.a.innerText = ($p.c + maestro.pf.db[4][0]);
			$p.a.id = "maestro";
			if ($p.c = maestro.fn.get(maestro.pf.db[0][12]))
				$p.c[0].appendChild($p.a);

			//Create Maestro Common Container
			maestro.fn.aea(maestro.pf.db[0][13], maestro.pf.db[0][20], maestro.pf.db[0][23]);

			//Create Maestro Loader
			maestro.fn.aet(maestro.pf.db[0][23], maestro.pf.db[0][20],maestro.pf.db[0][24]);
			$mlUl = maestro.fn.aet(maestro.pf.db[0][24], maestro.pf.db[0][21], maestro.pf.db[0][25]);
			$tmp = maestro.pf.db[4][1];
			for (var i = 0; i < $tmp.length; i++)
				maestro.fn.aet($mlUl, maestro.pf.db[0][22], false, (maestro.pf.db[0][17] + $tmp[i][0] + maestro.pf.db[0][18] + $tmp[i][1] + maestro.pf.db[0][19]));

			//Create Maestro cPanel
			if (maestro.devMode>0) {
				$p.a = maestro.fn.aet(maestro.pf.db[0][23], maestro.pf.db[0][20], maestro.pf.db[0][14], maestro.pf.db[5][6][0]);
				$p.a.className = maestro.pf.db[0][11];
				maestro.pf.$logID = maestro.fn.gei(maestro.pf.db[0][15]).getElementsByTagName(maestro.pf.db[0][16])[0];
			}
			delete $tmp;
			delete $mlUl;
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
				var chr1,
				chr2,
				chr3,
				enc1,
				enc2,
				enc3,
				enc4;
				var i = 0;

				input = function (argString) {
					if (argString === null || typeof argString === maestro.pf.db[0][7]) {
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
	 * 	 $n.df.AccuTimer = $n.df.Base.extend('$n.df.AccuTimer',
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
	maestro.df = maestro.prototype = {};

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
	 * @expose
	 * @memberof maestro
	 */
	maestro.fn = maestro.prototype = {};
	
	foo = function($){
		constructor = maestro;
		
		length = 0;
		
		/**
		 * Alias for window.document
		 * @example $n('doc').addEventListener('webkitfullscreenchange', $n.fn.bootstrap._onFullscreenChange);
		 * @returns document
		 * @method doc
		 * @memberof maestro.fn
		 * @expose
		 */
		$.doc = function () {
			return window.document;
		};

		/**
		 * Alias for window.document.getElementById
		 *
		 * @example
		 * 		var element = $n('gei',"myDIV");
		 *
		 * @method gei
		 * @param {string} $p
		 * @returns element
		 * @memberof maestro.fn
		 * @expose
		 */
		$.gei = function ($p) {
			return maestro.fn.doc().getElementById($p);
		};

		/**
		 * Alias for window.document.getElementsByName()
		 *
		 * @example
		 *		var elements = $n('gen',"DIV");
		 *
		 * @method gen
		 * @param {string} $p
		 * @returns element
		 * @memberof maestro.fn
		 * @expose
		 */
		$.gen = function ($p) {
			return maestro.fn.doc().getElementsByName($p);
		};

		/**
		 * Alias for window.document.getElementsByClass()
		 *
		 * @example
		 *		var elements = $n('gec',"red");
		 *
		 * @method gec
		 * @param {string} $p
		 * @returns element
		 * @memberof maestro.fn
		 * @expose
		 */
		$.gec = function ($p) {
			return maestro.fn.doc().getElementsByClassName($p);
		};

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
		 * @expose
		 */
		$.get = function ($p) {
			return maestro.fn.doc().getElementsByTagName($p);
		};

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
		 * @expose
		 */
		$.gda = function ($el, $useid) {
			var $result = false,
			$data = {};
			if ($useid == true) {
				if ($el = maestro.fn.gei($el))
					$result = true;
			} else {
				if ($el === "html" || "body" || "head")
					$el = maestro.fn.get($el)[0];
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
		 * @expose
		 */
		$.cnt = function ($p) {
			var $result;
			if (typeof $p === "string") {
				$result = maestro.fn.gei($p);
				if (!$result)
					$result = maestro.fn.get($p)[0];
			} else {
				$result = $p;
			}

			return $result;
		},

		$.esa = function ($el, $var, $val) {
			maestro.fn.cnt($el).setAttribute($var, $val);
		};

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
		 * @expose
		 */
		$.ega = function ($el, $var) {
			maestro.fn.cnt($el).getAttribute($var);
		};

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
		 * @expose
		 */
		$.aea = function ($el, $ne, $id, $html) {
			var $el = maestro.fn.cnt($el);
			$ne = maestro.fn.doc().createElement($ne);
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
		 * 		$n('aet','someElementID','DIV','newDivID','This is inner HTML');
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
		$.aet = function ($el, $ne, $id, $html) {
			var $el = maestro.fn.cnt($el);
			$ne = maestro.fn.doc().createElement($ne);
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
		 * 		if !($n('vld',foo)) { someFunction(); }
		 *
		 * @method vld
		 * @param {mixed}	$p 	A value
		 * @returns {boolean} true if the value is not undefined and not null
		 * @memberof maestro.fn
		 * @expose
		 */
		$.vld = function ($p) {
			return ($p == null || $p == undefined || typeof $p == maestro.pf.db[0][7]) ? false : true;
		};

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
		 * @expose
		 */
		$.chk = function ($p, $def) {
			return (!maestro.fn.vld($p)) ? $def : $p;
		};

		/**
		 *  Tests a boolean evaluation and throws an exception with the error string. (Assert)
		 *
		 * @example
		 *   	$n('ast',foo,'BOOYA!');
		 *
		 * @method ast
		 * @param  	{boolean} 	$test 	A boolean result test
		 * @param 	{string} 	$error 	A string to throw with the exception
		 * @memberof maestro.fn
		 * @expose
		 */
		$.ast = function ($test, $error) {
			if (!$test) {
				throw $error;
			}
		};

		$.dmp = function (array, return_val) {
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
			d = maestro.fn.doc(),

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

				if (typeof obj === maestro.pf.db[0][8] && obj !== null && obj.constructor && getFuncName(obj.constructor) !== 'PHPJS_Resource') {
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
					maestro.log($id, $type, output);
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
		$.bnd = function ($scope, $fn) {
			return function () {
				$fn.apply($scope, arguments);
			};
		};

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
		 * @expose
		 */
		$.lds = function ($filetype, $url, $onLoad, $onError) {
			var $p = {};
			if ($filetype == maestro.pf.db[0][0]) {
				$p.a.async = 1;
				$p.a.src = $url; //.js || .debug.js
				$p.a.type = maestro.pf.db[3][2];
				$p.a.onLoad = $onLoad;
				$p.a.onError = $onError;
				if ($p.c = maestro.fn.gei(maestro.pf.db[0][13]))
					$p.c.appendChild($p.a);
			} else if ($filetype == maestro.pf.db[0][1]) {
				$p.a.href = $url; //.css || .debug.css
				$p.a.rel = maestro.pf.db[3][4];
				$p.a.type = maestro.pf.db[3][3];
				$p.a.onLoad = $onLoad;
				$p.a.onError = $onError;
				if ($p.c = maestro.fn.get(maestro.pf.db[0][12]))
					$p.c[0].appendChild($p.a);
			} else {
				maestro.prototype.die(this, arguments, maestro.pf.db[0][39]);
			}
		};

		/** @expose */
		$.mrg = function(o, a, b) {
		var r, k, v, ov, bv, inR,
			isArray = Array.isArray(a),
			hasConflicts, conflicts = {},
			newInA = {}, newInB = {},
			updatedInA = {}, updatedInB = {},
			keyUnion = {},
			deep = true;
		  
			r = isArray ? [] : {};
			deep = !objOrShallow;
		  
			for (k in b) {
				if (isArray && isNaN((k = parseInt(k)))) continue;
				v = b[k];
				r[k] = v;
				if (!(k in o)) {
					newInB[k] = v;
				} else if (v !== o[k]) {
					updatedInB[k] = v;
				}
			}
		  
			for (k in a) {
				if (isArray && isNaN((k = parseInt(k)))) continue;
				v = a[k];
				ov = o[k];
				inR = (k in r);
				if (!inR) {
					r[k] = v;
				} else if (r[k] !== v) {
					bv = b[k];
					if (deep && typeof v === maestro.pf.db[0][8] && typeof bv === maestro.pf.db[0][8]) {
						bv = maestro.mrg((k in o && typeof ov === maestro.pf.db[0][8]) ? ov : {}, v, bv);
						r[k] = bv.merged;
						if (bv.conflicts) {
							conflicts[k] = {conflicts:bv.conflicts};
							hasConflicts = true;
						}
					} else {
						if (bv === ov) {
							r[k] = v;
						} else if (v !== ov) {
							if (k in o)
								conflicts[k] = {a:v, o:ov, b:bv};
							else
								conflicts[k] = {a:v, b:bv};
							
							hasConflicts = true;
						}
					}
				}
			
				if (k in o) {
					if (v !== ov)
					updatedInA[k] = v;
				} else {
					newInA[k] = v;
				}
			}
		  
			return r;
		};
		
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
		$.xhr = function ($url, $onLoad, $onError, $method, $data, $trace) {
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
				$opts.req = new XMLHttpRequest();
				if ('withCredentials' in $opts.req) {
					$opts.req.open($opts.method, $opts.url, true);
					$opts.req.onerror = $opts.onError;
					$opts.req.onreadystatechange = function () {
						if ($opts.trace === true) {
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
			if (!maestro.prototype.vld($url) || $url === "") {
				$onError(new Error(maestro.pf.db[0][41] + $url + ']'));
			} else {
				$trace = (window.maestro.devMode) ? window.maestro.devMode : false;
				var $opts = {
					req : '',
					url : $url,
					trace : $trace
				};

				$opts.method = maestro.prototype.chk($method, 'GET');
				$opts.onLoad = maestro.prototype.chk($onLoad, _onLoad);
				$opts.onError = maestro.prototype.chk($onError, _onError);
				$opts.data = maestro.prototype.chk($data, 0);

				var h = $url.indexOf("http");
				a = $url.indexOf("applet.");
				if (h < 0) {
					//Local JavaScript or Stylesheet file?
					maestro.prototype.lds(getExt($url), $url);
				} else {
					try {
						if (XMLHttpRequest) {
							return XMLReq($opts);
						}
						if (XDomainRequest) {
							/* Microsoft IE */
							return XDOReq($opts);
						}
					} catch (e) {
						die(e)
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
		$.pkg = function ($p) {
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
					maestro.prototype.b64(//<-- LZW Base64 Encoded
						maestro.prototype.lzw.enc(//<-- JSON COMPRESSED
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
				maestro.prototype.lzw.dec(
					maestro.prototype.b64($p.a));
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
		$.enc = function ($p) {
			$p=JSON.stringify($p);
			$p=maestro.pf.b64.enc($p);
			return maestro.pf.lzw.enc($p);
			//return JSON.stringify(maestro.pf.b64.enc(maestro.pf.lzw.enc($p)));
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
		$.dec = function ($p) {
		return JSON.parse(((maestro.pf.b64.dec(maestro.pf.lzw.dec($p))).join('')));
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
		$.sra = function ($find,$replace,$str) {
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
		$.req = function($modules) {return 0};
		
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
		$.die = function ($object, $args, $m) {
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
				e.objectName = (!$object) ? 'Unknown' : $object;
				e.arguments = (!$args) ? 'none' : $args;
				if (typeof window.onError === "function")
					window.onError(e)
			},
				false);

			window.onError = function (e) {
				maestro.log(null, 'Error', e);
			}

			for (var i = 0; i < maestro.pf.db[6].length; i++) {
				window.addEventListener(maestro.pf.db[6][i], function (e) {
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
			$el = maestro.fn.gei($el);
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
			
		};
		
		/**
		 * Toggles Maestro Control Panel on/off.
		 *
		 * @method tgc
		 * @memberof maestro.fn
		 * @expose
		 */
		$.tgc = function () {
			function hasClass(element, cls) {
				return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
			}

			var $el = maestro.fn.gei(maestro.pf.db[0][14]);
			if (hasClass($el, 'open')) {
				$el.className = maestro.pf.db[0][11];
			} else {
				$el.className = maestro.pf.db[0][38];
			}
		};

		/**
		 * Toggles an elements visible state.
		 *
		 * @method tgl
		 * @param {string} $el  element
		 * @memberof maestro.fn
		 * @expose
		 */
		$.tgl = function ($el) {
			$el = maestro.fn.gei($el);
			//if ($el.style.display != 'none')
			if ($el.style.visibility != 'hidden')
				maestro.fn.off($el);
			else
				maestro.fn.on($el);
		};

		/**
		 * show an element, all elements of tagname or name or class
		 *
		 * @method on
		 * @param {string} $el ordered by Id->TagName->Name->Class
		 * @memberof maestro.fn
		 * @expose
		 */
		$.on = function ($el) {
			$el = maestro.fn.cnt($el);
			if ($el) {
				$el.style.opacity = 1;
				//$el.style.display = 'block';
				$el.style.visibility = 'visible';
			}
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
		$.off = function ($el) {
			$el = maestro.fn.cnt($el);
			if ($el) {
				$el.style.opacity = 0;
				//$el.style.display = 'none';
				$el.style.visibility = 'hidden';
			}
		};

		/**
		 * Page Loader Enable. Shows wrapper then fades out
		 *
		 * @method ple
		 * @memberof maestro.fn
		 * @expose
		 */
		$.ple = function () {
			if (maestro.fn.gei(maestro.pf.db[0][40]) && maestro.fn.gei(maestro.pf.db[0][24])) {
				maestro.fn.on(maestro.pf.db[0][24]);
				maestro.fn.off(maestro.pf.db[0][40]);
			}
		};

		/**
		 * Page Loader Disable. Fades out then hides wrapper
		 *
		 * @method pld
		 * @memberof maestro.fn
		 * @expose
		 */
		$.pld = function () {
			if (maestro.fn.gei(maestro.pf.db[0][40]) && maestro.fn.gei(maestro.pf.db[0][24])) {
				maestro.fn.on(maestro.pf.db[0][40]);
				maestro.fn.off(maestro.pf.db[0][24]);
			}
		};

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
		 * @expose
		 */
		$.msg = function ($p, maestro) {
			//encode Data
			$p = maestro.fn.enc($p);
			try {
				maestro.fn.xhr(maestro.pf.db[2][0] + maestro.pf.db[3][1] + $p, function () {}, function () {}, 'get', $p, false);
			} catch (e) {
				maestro.log(e.stack);
			}
		};

		/** @expose */
		$.evt = function (element, event, fn) {
			if (element.addEventListener)
				element.addEventListener(event, fn, false);
			else if (element.attachEvent)
				element.attachEvent('on' + event, fn);
		}
	
	}(maestro.fn);
	
	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	/**
	 * @method init
	 * @param string	selector	function, element, tag or class
	 * @nosideeffects
	 * @memberof maestro
	 */
	init = maestro.fn.init = function (selector, context) {
		
		if (!selector) { return this; }

		var	params 	 = Array.prototype.slice.call( params, 1 );
		
		if (selector.constructor.name!='Window') {
			if (selector.constructor.name==='String') {
				if (maestro.fn[selector]) {
					
					// Call existing public Entity
					return maestro.fn[selector].apply( this, params );
				} else if (maestro.df[selector]) {
					
					// Create a new existing class form the df
					return new maestro.df[ selector ].apply( this, params );
				} else if (params.length==1 && !maestro.df[selector]) {
					
					// Defining the base Class, called once
					return maestro.df[selector] = params[0];
				} else if (!maestro.df[selector] && params.length==3) {
					
					// Defining a new Class, called once
					//params0=new class name,1-array of classes to use,2-private object,3-public object
					if (params[0].constructor.name===maestro.pf.db[0][9]&&
						params[1].constructor.name==='Object'&&
						params[2].constructor.name==='Object') {
						
						//we have a valid multiple inheritance
						//Start with the Base CLASS 
						maestro.df[ selector ]=maestro.df['Class'];
						
						//now add the array of classes to inherit from (not Class)
						params[0].forEach(function(cls) {
							maestro.df[ selector ]=meastro.mrg(maestro.df[ selector ],cls);
						});
						
						//now take the private and public props from the new object and merge
						maestro.df[ selector ]=meastro.mrg(params[1],params[2]);
						
						//return the new object definition
						return maestro.df[selector];
					}
				}			
			} else if ( typeof selector === maestro.pf.db[0][8] || ! params ) {
				// Default to "init"
				return maestro.fn.init.apply( this, params );
			} else {
				//Don't gripe about it, just ignore it.
			}
		}
		return (selector, this);
	};

	// Give the init function the jQuery prototype for later instantiation
	init.prototype = maestro.fn;

	//First run - Load Release version of JavaScript and Style-sheet if no Parameters
	//Initialize Object
	/*
	maestro.pf.db=[
	['script','link','put','get','clk','msg','unknown','undefined','object','Array',
	'ErrorEvent',
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
	'URL provided is invalid ['
	],
	['nano','.release','.debug','.js','.css'],
	['//cdn.i2tmlabs.com'],
	['__utm.gif?','Microsoft.XMLHTTP','application/javascript','text/css','stylesheet'],
	[
	'body{padding:2em 0 2em 0}#tail,tail,#wrapper{display:none;visibility:hidden}#cpanel{position:fixed;top:0;left:0;right:0;z-index:15000;background-color:#fff;color:#000;font-size:1em;padding:0;margin:0}#cpHead{width:100%;top:0;max-height:20px;background-color:#000;color:#fff;padding:0 10px 0 10px}#cpText{font-family:ubuntu}#cpLog{position:absolute;bottom:0;top:21px;width:100%;border:0;overflow:auto}#cpanel.open{bottom:0;display:block;visibility:visible}#cpanel.closed{height:20px}.cpText{vertical-align:top;top:3px}.deadCenter{position:fixed;top:22.5%;left:50%;width:320px;height:320px;text-align:center;margin-top:-160px;margin-left:-160px;border:5px solid #888;box-shadow:0 10px 10px #ccc;background-color:#f5f5f5;z-index:1000001;overflow:hidden}@font-face{font-family:Neuropol;font-weight:normal;font-style:normal;src:url(http://code.nanofw.com/i2tm/fonts/neuropol.ttf)}.neuropol{font-family:Neuropol;font-weight:200;letter-spacing:12px}@font-face{font-family:Ubuntu;font-weight:normal;font-style:normal;src:url(http://code.nanofw.com/i2tm/fonts/ubuntu-r.ttf)}.ubuntu{font-family:Ubuntu;font-weight:normal}@font-face{font-family:TopGun;font-weight:normal;font-style:normal;src:url(http://code.nanofw.com/i2tm/fonts/top_gun.ttf)}.topgun{font-family:TopGun;font-weight:normal}@font-face{font-family:Edwardian;font-weight:normal;font-style:normal;src:url(http://code.nanofw.com/i2tm/fonts/itcedscr.ttf)}.edwardian{font-family:Edwardian;font-weight:normal}#mLoader{display:block;position:fixed;top:0;left:0;z-index:100000;background:white;width:100%;height:100%}#mView{position:relative;z-index:3;margin:0 auto;top:45%;width:220px;height:60px;list-style:none;text-align:center;padding:0}ul#mView li{background-color:#888;width:25px;height:20px;float:right;margin-right:6px;box-shadow:0 100px 20px rgba(0,0,0,0.2);border-radius:10px 10px}ul#mView h1,h3{color:black}@-webkit-keyframes loadbars{0%{height:1px;margin-top:25px}50%{height:50px;margin-top:0}100%{height:1px;margin-top:25px}}ul#mView li:first-child{-webkit-animation:loadbars 2.0s cubic-bezier(0.645,0.045,0.355,1) infinite 0s}ul#mView li:nth-child(2){-webkit-animation:loadbars 2.1s ease-in-out infinite -0.5s}ul#mView li:nth-child(3){-webkit-animation:loadbars 2.2s ease-in-out infinite -0.5s}ul#mView li:nth-child(4){-webkit-animation:loadbars 2.3s ease-in-out infinite -0.5s}ul#mView li:nth-child(5){-webkit-animation:loadbars 2.4s ease-in-out infinite -0.5s}ul#mView li:nth-child(6){-webkit-animation:loadbars 2.5s ease-in-out infinite -0.5s}ul#mView li:nth-child(7){-webkit-animation:loadbars 2.6s ease-in-out infinite -0.5s}',
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
	['<div id="cpHead"><span class="cpText">Maestro cPanel</span><span id="btn_cpanel" class="pull-right cpText glyphicon glyphicon-cog" onclick="$n(\'tgc\',\'cpanel\');"></span></div><div id="cpLog"><table id="cpText" class="table table-hover table-striped"><thead><tr><th>Type</th><th>Object:ID</th><th>Message</th></tr></thead><tbody></tbody></table></div>','<span class="glyphicon glyphicon-']
	],
	[
	'copy', 'cut', 'paste',
	'beforeunload', 'blur', 'change', 'click', 'contextmenu', 'dblclick', 'focus', 'keydown', 'keypress', 'keyup', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'resize', 'scroll',
	'DOMNodeInserted', 'DOMNodeRemoved', 'DOMNodeRemovedFromDocument', 'DOMNodeInsertedIntoDocument', 'DOMAttrModified', 'DOMCharacterDataModified', 'DOMElementNameChanged', 'DOMAttributeNameChanged', 'DOMActivate', 'DOMFocusIn', 'DOMFocusOut', 'online', 'offline', 'textInput',
	'abort', 'close', 'dragdrop', 'load', 'paint', 'reset', 'select', 'submit', 'unload'
	]
	];

	//		[100,97,95,80,70],
	maestro.pf.db=maestro.fn.enc(maestro.pf.db)
	//maestro.pf.db=JSON.stringify(maestro.pf.db);			//4374
	//maestro.pf.db=maestro.pf.b64.enc(maestro.pf.db);		//6324
	//maestro.pf.db=maestro.pf.lzw.enc(maestro.pf.db);		//2969 || 2098

	window.console.log('maestro.pf.db='+maestro.pf.db+';');
	vars.NF=true;
	*/
	if (!vars.NF)
		maestro.pf.db="W1sic2NyaXB0IiwibGluayIsInB1dCĖImdlĜĞmNsĔĤ1zZĕėnVē25vd24iLCJ1bmRlZmĒZWQĸĺvYmplY3ņĹJBcnJheSĞkVycm9yRXZlbnŐĺjĐ9īŅgb3BhY2l0eTIwČĎaGVhZĝĮRhaWĎőjcGFuńƉũcFĿeHŨJ0Ŋ9kŘĞjxoMT4mIzk4żiPC9ƢƤ8aDM+ƫƭƯMzķőkĈYŇĻbƃğxpƫŴ9tbW9uƫbUxŉWĿciĩWƇV3ƫSU5GTĭĘƕƗtƇ5mbǤłƏm8tĄlnblĎPǘėĢBUƩǁ0ZXh0LXdhŞ5pĽǗőleGĦYĀhdđvbiĪƇduXĝƶčiRVJST1ČőȁȃȅǕhĽġǗĞŕťǍ2ZSȜWȞȠIȢĎREVCVUȎĺȭȄLǕŀmFļƗǁ3ŞİŴȉIjƼňƌİIG9wȔNpdHkxMDAǁPĽx5IEpȖɐzŎJpcƗgȔ5kIFNŷWxlĄhŀXRzɠNȱiBiȺBsb2FkńQůɡjȔwůǝgɖǋ3ĿLǺĘdyYĉwȂȫĺɇkʢɼJĴłʛŮĈMgǩ2ȔǆƂBbIŶsWyJuɿvƫLȶĐƀĄUŇIƏſidWɉ˙anM˘ˎ3NʎˉˋIvLąkȚȋMnRǋƍăy5Ū20iXSxˇl9fdʌtLĠpZj8ǁNƇĆŰNvZŧuWE1MSƔUUǄɐwƌǆŴF0Ƈǎ˭ɵdɷɹɻɓȬȂɌązcǤnʄeʆʈ2ʊȂņ˾̀ğʹZHl7ƌʚZđƏzoyń0gMCA͐W͒MH0jȗFȌCxƚWlsĹNɕ̡ɞye2Rɻűsʯk6ĽǎZTt2ĈɥŊͥĈR5Omh̊GĿŦ͜ŎŲĽVseűvǳ̧Ǎu΃ZpȑVkOʨΒDowO2ʇ̕Q6ɫtćȽodΠ΢3oǨWʀȂgΨTUwɫA7ŊFja2ʭŰİƂ1˺ǓcjojŁŁΣ̓ūyOiMλɬ7ŁǎĜȜXŌOjFť͹ɣǕƾδnϡνǌF͐ŵΖjB9IąwSſƁHt3ƇŖΠɪɬlΝRΟΡΣ1ŗC1ońǴaƗΨϲweDtiɤrZ3ʹ˝ʀɍϒɡϔϖϘνǉʗǝ6ϵϏjtϦRϨ5ϪjA͓TBЕ͕ŻDE̢Hhϴ϶Vſ4ɧtǫĲȯZȱͤΏTp1YįuɧVтNwTɡnΐBΒŵΔǎ΃Fă29s̅ĿΣОHІbTЈΞcΠyMĉ4Νd̊Ѯoϡо͔Uξş͐ſϔе7ŰŤŞZЩc6ʯV0ŰΊűȱmΎ̈ɢń5҃90ȗǊϫϚđ̵Gxŗѐďʟazͺͼp;ħʌ΂nΘǳҫїϵљɿťC˹ūŭR7žV̊̽0ϡźɼс̈љфVцϻȹXƙ̐ȱЌȱđǵjpғ3νҡ΢jљƖ0˚ƀZENť˳ʈnЯ̒ɦȘbӝmĈ̾ЗӟAГ˙Nǟ҉ſĠΠ̚C҂ĵlkȗηƺӋHgӄſӇȄϡMѶHBѹʨȐǧ˃Ӈ4Ґ2İȗŜЉȉ̉Ț1ӻ6LTE2͚ԙԦŞѻԩsńZӉi0xNДЖИŰJʛXI6NѸIHТԉICMѹDԐƛ4ȆNoȔІd͎моɼgзйe͕ʠąjѬų2tnŞ9ļmQtШŰՆϵY1̋Vĥ͹ԬͤӨѹjҀɬϘE҉3ҋmҍŰҏžԉ͋İfUBщ5ыթVϚşѕЌmȔ1Ȍɨ6TҘ1խwʘw֙ϜЌևͤnБΧͶyϭsΣZșŧǲʨ5ĐU͵ִ҄ΝĆYzёŞwoБϿѴoˬą̔GUuĽƎʘМӎșS9p˲˴˭ַŦʍ˭5ĢӕΒɡͦ˳ȁî̈פ̅ʹƌѨͭנֹŁFγɱOkׯצײֵȹָձĵӆZӈӊϘtԷʌȭIֺŲŴŃ͎ɪę4֑֓ʘ֕ɍьŴ֘ϛ֛1֝Ā֠ʹVWǂ˳1ֶ؂t؄ԓӉmĳŞЊbЗ֔ȅX̹̻΃زmشЗ̵mM6װsKGȄɧӼLy9˺ʩرҗ9Ġ˸˺0vaTƙbךط̶ծѓԣHUǲi֕ȗYpfS5ђєі֪ؠآ֟b֡ئبRت؁Ŧ؃ԢدؼΒؾȱH1A؟ϝآӬ״ج׷׹΂lІcEdļЮطȆġȝέDpדНղƈٱϝzɧͥ͸ڝՂڠ֩cНէįֳChέѮ΢i8ŉѧʛ٬ˎδ̔լˎѧ̇2kyȗٗڇHMĴɡwXσļ٦ҠG٩٫֕ŰBnПڢ֜֞ؤ6фɢR3İثټحپ؆Ԕرځشڄچ֚ڈɤȐٻ׶ɐڎ׻ΛĵϮ͋lȱږؙظڙάήڨڟʡۛĪڥԷѐڞJڪ͈ڭOگǃڲɧRڵڷǉں5ڼĳ̕cۀǊ˭ۄۆ̔۰ۉ٘ʌώǕɸǝѕѮmKXӧńۢʯՃƇƎڋۦڍƇ׺śԊʙ҅۽ӵш܀ژlښ܄܍ڠxт̚ʘ͊ӕҤlҦҨŸpҫَҭӱ˦ӳlșӶӸŀӺŰӼΩԷWԹңețȌľȐЁμЦ҃πςτۣƏڜϽđȁ͹ϽǕЀoЂAЄ̽݉܃ݲЃ٫NtպlĢ3ݝɥȗݠӵp͗ҨޕȹռɍŃхԕ҉WۻϰϫɾXҒbҮԫNDUЄ3ѻͅRѾjIԗԲއ݊Π԰ԘѹΤͰձڬ΁ֽֿͷ͹ɋȯFħȽΖĥӭǖЮавдϳ˝wŪVΘȂcʞ͇ορσֳݹχωΒόէՒԚ޲ѽӊ֥ԏԑ؅؇޶пԐŁǓʯΧŞАƗޢޤĒȆɺ۩ӉώЕЗď3gǲ̽Ɓɡ3ަƣAߵ͓ԿCBϯŖKɬs͔wwLɬuˣkҞ҅Ŝࠁࠍl֥ؓԱƪнпсߗߙߛXߝƳEħDNξѧЩՆŊҨŴt9Q֬ńJrĈձςV5̕ŖǌVʎҧǔRЙӕzezޅͭʊ޻ރ՟߾ϯࠀʌЇyՈԙfιwJXtЎְ֮Շиࠆtղӕ֯W4حیϡϳࠑ࡬࡮ࡰ߼Χѷ޹ЊԴȌțԫMjVЕڄ9࠲bߚ̊࠵ʞʹŁlŝŏղ̽Ȍ·7݈ŊtɦәĽlࡷͯʘԠūࠍŖŔʿˣ4̢yB͝اұy1ʔϟ࢖IƢC4ąޮࠜࣂwޭUࣆ4zNιࠜSkˀδӷδӳU͓Ջ࢒ƈ࠳࢖ߝĐʹסoС׉ʆkࠚIΙࢻ֭ࡈࡊڠȋϭѢߎ߸ǕࡗJʎD˙ѷʿńFīȻࢊ1ĴXʝǩࣕȋȗࣘԭAuՈNࣛߘ࢔࠴ࣟG࣡˳ࣣW՗ܾࣧƴ࣪1࣬ࡉऄ࣯Ȍޣࣲ΃ࣴࡖܷࣺࣸˢgࣽࣿٴțःअࣔǩࣗgऋऍعऐࣝߜ࢘͵गࣤछࠚQञठ࣮ɿत̨̦ࣳࡕࣶफࠢ3ࣼޣरँळ࣓ǪशउसTऌऎ़ऒࣞि࣢ूࣦࠚUॆࡇडձॉࣱौधॎपIࣹऍۉम॔Ⱥऱं̅ऴख़ࣖज़हय़࢓࢕ा࣠ी޴॥xज٩e࣫४ैࣖ८Ε॰ՙॏॳӾX॓ࣾॹॖॼक़इषঁऻঃओॣुङࣥঊࠚc३ا५ण঒ѣmनখॴNभयজԩॗआग़בड़फ़ऻČ̀Wzƺőː˩৆1őĕ৊M3Ȭˈ0ˊ৆ȅĺ˨৔৅M2ȏ৓৕েĺhয়৛ৗ܎ˈě́ǌˌAࡑϨEɾʆėϻέGāՊ݆ъՖΙm־eȁPTڐTSӆFfѸΝ1ϴȣQ৶ŀđৣՋƋҘťʒҗʝهЊգ1ՄΘŴ٤ԈԊGη৸EȥZJQ0V˾URUSڄк࣒঍5tͅҏŊպՂl৸˺֕ҜԺd7ɃئǟNFҒlɄEс՟nਈ˼ő৭WΛƇৰؙΏSBܭJŀࡺৱʀՎࠊ؄iςŶɍॺਞұ2٤ƌl4ƐǲɐΔ86৿RQU͛࣪ʀɼӼ਻ǫН۳ϒӮټ6JޒEUFϳઊܴԘp΃੟ϛ͐࡮ੀȁδ੃੅઎J٫d9׊ǋ͡ďͮɲϻڗعৼ৾਀ਂ੺Q1R9ȧAƆĀ֧Нͣ֕ਊϴ৊źޭgࠜTۄࠝԽTড়ࠠE0ޭAૃড়Nčɪjgࠟнɪɸૃ͖ӿw5Ծ૎˧YՕD̶ࠝࣄૠՒ૖ԖM̦৕࠸̛࣌૊ऍSwyࠠNdLߋ૞૒ࢍQૃਫ૊5ˣ૵ODȖૺsބ૚૖ҀCwଋࢀ৪ĘtǢ05̞0݉Ţ੓ĺ੅ɄWੈ੊ଚ੍сƫ੹੻͛ǁઝBટřĮକTଗ̞ӫU٫JૹߋƬ·ɦʒ̊D֥ğљϸөFǸƠҦƎʏͲعzP࢏ЙűU̲0ȿ+TޣʈʨֳࢶjUƍƏƈ8L˦Ϧ4+PՋ୦࣓Q9ȠJ˜G5f΋җΎȿɾΤȉ॒୮ĺw˝xͦӕدʏwӐцࠖǵ͆w֍˺4मΤ5ƌ΅ǉuС̔1ĎɠǎŴ̤2s୽I˯igۙGdjJywn୵΍sபࠤୖƸ୉uPjwאl2ஷঊƿ୬୽JƋEǓZஙƬƠͣJԷੜିୁĥஆхd୆ǘȒୌ˧୏Ď͞ҫࣘ௛ֽǨɡӔIg௞בֺRćĉŀ௔஽̧ϹZD48ɧɀ୩޴Pڐஒבୣʨo௭Ƴ5PŊŌŎΧǟQ௼௷௉ఀNȂૡȽlƸЀ௲୤௨ஷஹȗʊȔQ୨Ѯદ΁గۋ̈́ɨ୨Ʈொ܋ఔͮɦɛ˘8ڬΌʒŪƍ̵z௏dΏĉࣥϒʒஊǷ஍ࢬt২ହĂǉЕଯୂěǄę୻ĿǈҘઃ੟Пʗʙʁȣࡀ֥ʫĥ՘ϩȺĤĦ̐rǈѧѕ௒ਏŦ˗ƽࡀలlρǭַŎࡒƫࡌࡎࠎȚĤtȐĉગ˧౲Ԣ5̅ɭőʧࡒܵĴĶǁಃŭॻ৽ಈυŭծģėؾःӬҊʈౙॻعץಁĺ౻બǁਫ਼șGƑJEଲتʘĿSδīӕચƘದ0ನͮlUҘʧŤƂŚRਁǠאVSńಋΛRŕșਯŉۣਸછƫɃ9࣎şʛޯuĄŜԤkಫۖ0І౰ೋ್֕E೏Q،ckंۼࣕΛೠೢࠌŞπԤšƍƚU೧đ೩ౕɂೡNR̻ࡑѕE5эVDžƎ؆೪ȣ೎Nೣ׋ł˜ʌl֣׸ZU՗ɿҶŅǁಱ1BŎ̬̦ͯౝėk಼ι౯ۣzಫɜಥಧGʘN֥0ಐ̠ǎĐŃేş։঳ݯ౨Ɋ୔೙୿ऄǁų҄಑ୂЩӬƫͅŖ؆௨ݦǁ౓ʚƫ͉Ȍŧǁ౻Ģొಕſ͝൚ђؾࢦȵİࢮƂସऄ==";
	maestro.pf.db = maestro.fn.dec(maestro.pf.db);
	
	//bytes 1024
	//APPLET
	//- header
	//- js
	//- css
	
	//prepCode
	//$TMP = maestro.fn.toString();					// 1403 bytes
	//$TMP = $TMP.replace(/\t+/g, '');				// 1128 bytes
	//$TMP = $TMP.replace(/\n+/g, '');				// 1066 bytes
	//$TMP = $TMP.replace(/\r+/g, '');				// 1004 bytes
	//$TMP = encodeURI($TMP);							// 1532 bytes
	//$TMP = maestro.pf.lzw.enc($TMP);				// 604 bytes
	
	//console.log($TMP);

	//$TMP = maestro.pf.lzw.dec($TMP);				// 1532 bytes
	//$TMP = decodeURI($TMP);							// 1004 bytes
	//$fName='merge';
	//maestro[$fName]=new Function("o","a","b",$TMP);			// bytes

	/** @expose **/
	maestro.devMode = ("yes"==="yes")?1:0;
	
	maestro.pf.dmq({});

	//Execute on Load
	if (!vars.NF && location.protocol != "file:") {
		maestro.pf.ldf({
			x : 'script',
			y : 'nano',
			z : '{VERPATH}',
			w : '{VERTYPE}'
		});
		maestro.pf.ldf({
			x : 'link',
			y : 'nano',
			z : '{VERPATH}',
			w : '{VERTYPE}'
		});
	}

	/** @expose */
	window.maestro = maestro;

	/** @expose */
	window.$n = maestro;
	
	//Cleanup
	delete vars.NF;

	/** @expose **/
	maestro.name = 'Maestro';

	/** @expose **/
	maestro.version = '1.1.10';
	
	return maestro;

})(window);
