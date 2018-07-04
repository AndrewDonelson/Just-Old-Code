/** 
 *  Encoder/Decoder(s) Interface for Maestro
 *
 * @file maestro.encoders.js (#6) in combine sequence.
 * FINALIZED
 */

 
/**
 * this interface provides several different encoder/decoders
 *
 * @class I$Encoders
 * @extends I$Alias
 * @memberof Maestro
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Alias',

	//What is the name of your new interface?
	'I$Encoders',
	
	/** @lends M$.I$Alias */
	{		
		toString:function(){return 'I$Encoders Class'},
		/** 
		 * This is an API so there can only be one instance.
		 *
		 * @property {number} maxTotalObjects
		 * @expose 
		 */
		maxTotalObjects:1,
		
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
		 *		$.b64.enc("I will be encoded in Base64");
		 *		//To use NanoFW encode..
		 *		$.enc("I will be turn in to a JSON, Encoded and Compressed.");
		 *
		 * @class b64
		 * @expose
		 * @memberof I$Encoders
		 */
		b64 : {

			/**
			 * @private
			 * @type string
			 * @memberof b64
			 */
			$keyStr : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

			/**
			 * public method for encoding
			 * @method enc
			 * @param {string} input
			 * @returns string
			 * @this {b64}			 
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
					if (argString === null || typeof argString === 'undefined') {
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
			 * @this {b64}
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
		 * 		$.lzw.enc("Test String");
		 * 		var a = $.lzw.dec($compressed);
		 *		//To use NanoFW encode..
		 *		$.enc("I will be turn in to a JSON, Encoded and Compressed.");
		 *
		 * @class lzw
		 * @expose 
		 * @memberof I$Encoders
		 */
		lzw : {
			/**
			 * Compress an string to LZW-encoded
			 * @method enc
			 * @param {mixed} s
			 * @returns string
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
		}
	},
	/** @lends I$Alias.prototype */
	{
		toString:function(){return 'I$Encoders Object';},
				
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
			this['_super']()
			this['expose']({
				'b64Encode'	: function(a) {return this['Class'].b64.enc(a)},
				'b64Decode'	: function(a) {return this['Class'].b64.dec(a)},
				'lzwEncode'	: function(a) {return this['Class'].lzw4.enc(a)},
				'lzwdecode'	: function(a) {return this['Class'].lzw.dec(a)},
				'encode'	: function(a) {return this.enc(a)},
				'decode'	: function(a) {return this.dec(a)}
			});
		},
		/**
		 * Encodes data by converting to JSON, then converting to base64 and finally lzw compression
		 *
		 * @method enc
		 * @param {object} $p	p.x= 'enc', p.y=any variable, array or object
		 * @returns {string}
		 * @memberof I$Encoders
		 * @expose
		 */
		enc : function ($p) {
			$p=JSON.stringify($p);
			$p=this['Class']['b64']['enc']($p);
			return this['Class']['lzw']['enc']($p);
			//return JSON.stringify($m.pf.b64.enc($m.pf.lzw.enc($p)));
		},

		/**
		 * Parses previously maestro encoded data back into a JSON
		 *
		 * @method dec
		 * @param {object} $p	p.x= 'dec', p.y=any variable, array or object
		 * @returns {string}
		 * @memberof I$Encoders
		 * @expose
		 */
		dec : function ($p) {
			return JSON.parse(((this['Class']['b64']['dec'](this['Class']['lzw']['dec']($p))).join('')));
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
		/** @export Member */
		/*
		someMethod:I$InterfaceMethod,
		...
		someMethod:I$InterfaceMethod
		*/
	]
);