/**
 * @namespace 3rd_Party
 * @global 
 * @object  Base64
 * @description
 *  Base64 encode / decode
 *  Updated _utf8_encode & _utf8_decode - Andrew Donelson 31JAN2013
 *  
 *  See <http://www.webtoolkit.info/>
 */
var Base64 = {
	
	/**
	* @private
	*/
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
 
    /**
	 * @member Base64
	 * @access public
	 * @description public method for encoding
     * 
	 * @param Mixed	input	Unencoded String
	 *
	 * @return String	Output	Base64 Encoded String
     */	
	encode : function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
 
		input = Base64._utf8_encode(input);
 
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
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
 
		}
 
		return output;
	},
 
	// 
    /**
	 * @member Base64
	 * @access public
	 * @description
	 *
	 * public method for decoding
     * 
	 * @param String	Intput	Base64 Encoded String
	 *
	 * @return String	Output	Unencoded String
     */	
	decode : function (input) {
		var output = [];
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
 
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
		while (i < input.length) {
 
			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));
 
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
 
//		output = Base64._utf8_decode(output);

        output.join('');
		return output;
 
	},
 
   /** 
	* @member Base64
	* @access public
    *
	* @link 	<http://kevin.vanzonneveld.net>
	* @link   original by: Webtoolkit.info <http://www.webtoolkit.info/>
	* @link   improved by: Kevin van Zonneveld <http://kevin.vanzonneveld.net>
	*
	* @description
	*   improved by: sowberry
	*   tweaked by: Jack
	*   bugfixed by: Onno Marsman
	*   improved by: Yves Sucaet
	*   bugfixed by: Onno Marsman
	*   bugfixed by: Ulrich
	*   bugfixed by: Rafal Kukawski
	*   improved by: kirilloid
	*
	*   @example  utf8_encode('Kevin van Zonneveld');
	*
	*   @return 1  'Kevin van Zonneveld'
	*/
	_utf8_encode:function(argString) {
	  if (argString === null || typeof argString === "undefined") {
		return "";
	  }

	  var string = (argString + ''); // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");
	  var utftext = '',
		start, end, stringl = 0;

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
	},
 
	/**
	 * @member Base64
	 * @access public
	 * @description
	 * http://kevin.vanzonneveld.net
	 * original by: Webtoolkit.info (http://www.webtoolkit.info/)
	 * 	input by: Aman Gupta
	 *	improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	 *	improved by: Norman "zEh" Fuchs
	 *	bugfixed by: hitwork
	 *	bugfixed by: Onno Marsman
	 *	input by: Brett Zamir (http://brett-zamir.me)
	 *	bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	 *
	 *	@example 	1 	utf8_decode('Kevin van Zonneveld');
	 *	@return 	1 	'Kevin van Zonneveld'
	 */
	_utf8_decode:function(str_data) {
	  var tmp_arr = [],
		i = 0,
		ac = 0,
		c1 = 0,
		c2 = 0,
		c3 = 0;

	  str_data += '';

	  while (i < str_data.length) {
		c1 = str_data.charCodeAt(i);
		if (c1 < 128) {
		  tmp_arr[ac++] = String.fromCharCode(c1);
		  i++;
		} else if (c1 > 191 && c1 < 224) {
		  c2 = str_data.charCodeAt(i + 1);
		  tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
		  i += 2;
		} else {
		  c2 = str_data.charCodeAt(i + 1);
		  c3 = str_data.charCodeAt(i + 2);
		  tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
		  i += 3;
		}
	  }

	  return tmp_arr.join('');
	} 
};
