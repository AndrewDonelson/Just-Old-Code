/**
 * @namespace Core
 * @class h5c3.LZW
 * @description
 * [Extends <a href='h5c3.Base'>h5c3.Base</a>]
 * <p>
 * 
 * <pre><code>
 * 
 * </code></pre>
 * 
 * </p>
 */
h5c3.LZW = h5c3.Base.extend('h5c3.LZW', {
	/** @lends h5c3.base */
	_CLASSNAME: 'LZW',
	_CLASSVERSION:'1.0.0'
},{
	/** @augments h5c3.Base */
	
    /**
	 * @contructor
	 * @memberof Core
	 * @desc
     * </p>
	 * Description of this method
	 * </p>
     */
    init: function () {
        this._super();
    },
	
    /**
	 * @member
	 * @access public
	 * @memberof Core
	 * @desc
     * </p>
	 * LZW-compress a string
	 * </p>
     */	
	encode:function(s) {
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
	 * @member
	 * @access public
	 * @memberof Core
	 * @desc
     * </p>
	 *  Decompress an LZW-encoded string
	 * </p>
     */
	decode:function(s) {
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
});