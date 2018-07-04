/**
 * @namespace 3rd_Party
 * @global
 * @object String
 * @description
 * string.js
 * James Padolsey
 * http://james.padolsey.com
 * -
 * Some useful additional methods for String.prototype.
 */
(function(){
    
    var methods = {
		/**        
		 * @memberof 3rd_Party
		 * @function
		 * @global
		 * @description pad a string with any character you want to a given length
		 */
		pad: function($str, $totalChars, $padWith) {
			$str = $str + ""; // force num to be string
			$padWith = ($padWith) ? $padWith :" "; // set default pad
			if ( $str.length < $totalChars ) {
				while ( $str.length < $totalChars ) {
					$str += $padWith;
				}
			}
			return $str;
		},
		
		/**        
		 * @function
		 * @global
		 * @description Converts an object into a string.
		 * @param {obj} Object to convert
		 * @param {boolean} if true each property is seperated by comma (single line"Default") otherwise new line for each property.
		 * @Return {string} 
		 */
		objToString:function($obj,$inline) {
			if (typeof $obj === 'undefined') return $obj;
			if (typeof $inline==='undefined' || $inline === false) $lf=', '; else $lf='\n';
			var $str = '';
			for (var p in $obj) {
				if ($obj.hasOwnProperty(p)) {
				
					if (typeof $obj[p] === 'object') {
						$str+='\n';
						$obj[p] = this.objToString($obj[p],$inline);
					}
					$str += p + '::' + $obj[p] + $lf;
				}
			}
			$str += $lf;
			return $str;
		},
		
		/**        
		 * @memberof 3rd_Party
		 * @function
		 * @global
		 * @description
		 * Returns string with all instances of
		 * "-word" replaced with "Word", E.g.
		 * "background-color" -> "backgroundColor"
		 */
        camelize: function() {
            
            return this.replace(/\-(\w)/g, function( $0, $1 ) {
                return $1.toUpperCase();
            });
        
        },
        
		/**        
		 * @memberof 3rd_Party
		 * @function
		 * @global
		 * @description
		 * Returns boolean indicating whether
		 * or not a substring exists within the string
		 */
        contains: function( what ) {
            
            what = typeof what === 'string' ? what : what.toString();
            
            return this.indexOf( what ) > -1;
            
        },
        
		/**        
		 * @memberof 3rd_Party
		 * @function
		 * @global
		 * @description
		 * Returns a number indicating how many times
		 * a substring or regex is matched within the string
		 */
        count: function( what ) {
            
            if ( Object.prototype.toString.call(what) !== '[object RegExp]' ) {
                what = what.toString().replace(/\$\^\[\]\{\}\(\)\?\:\.\+\*/g, '\\$1');
            }
            
            what = RegExp( what ? what.source : '.', 'g' );
            
            return (this.match( what ) || []).length;
            
        },
        
		/**        
		 * @memberof 3rd_Party
		 * @function
		 * @global
		 * @description
		 * Returns string with all instances
		 * of -w replaced with W, e.g.
		 * "background-color" -> "backgroundColor"
		 */
        enclose: function( a, b ) {
            
            return (a = a || '') + this + (b ? b : a);
            
        },
        
		/**        
		 * @memberof 3rd_Party
		 * @function
		 * @global
		 * @description
		 * Matches the string against the passed regex
		 * and the returns the group specified by _n_
		 * 
		 * E.g.
		 *     ""('hi @boo and @adam').extract(/@(\w+)/g, 1);""
		 *       => ['boo', 'adam']
		 *       
		 * If the regex is global then an array is returned
		 * otherwise just the matched group is returned.
		 */
        extract: function( regex, n ) {
            
            n = n === undefined ? 0 : n;
            
            if ( !regex.global ) {
                return this.match(regex)[n] || '';
            }
            
            var match,
                extracted = [];
                
            while ( (match = regex.exec(this)) ) {
                extracted[extracted.length] = match[n] || '';
            }
            
            return extracted;
            
        },
        
		/**        
		 * @memberof 3rd_Party
		 * @function
		 * @global
		 * @description
		 * Runs the passed function on every character,
		 * similar to Array.prototype.forEach
		 */
        forEach: function( fn ) {
        
            var c, i = -1;
            
            while ( (c = this[++i]) ) {
                fn.call( this, c, i );
            }
            
            return true;
        
        },
        
		/**        
		 * @memberof 3rd_Party
		 * @function
		 * @global
		 * @description
		 * Runs the passed function on every word,
		 * similar to Array.prototype.forEach
		 */
        forEachWord: function( fn ) {
            
            var string = this,
                i = -1;
            
            string.replace(/\b([\w\-]+)\b/g, function( match, word ){
                fn.call( string, word, ++i );
                return match;
            });
            
            return true;
        
        },
        
		/**        
		 * @memberof 3rd_Party
		 * @function
		 * @global
		 * @description
		 * Returns a string with all URLs replaced
		 * with HTML anchor tags.
		 */
        linkify: function( replacement ) {
            
            return this.replace(/(^|\s)((?:f|ht)tps?:\/\/[^\s]+)/g, replacement || '$1<a href="$2">$2</a>');
            
        },
        
		/**        
		 * @memberof 3rd_Party
		 * @function
		 * @global
		 * @description
		 * Returns a string which is made up of
		 * _n_ instances of the original string.
		 * E.g. "a".many(3) => "aaa"
		 */
        many: function( n ) {
                        
            return Array(n ? n + 1 : 2).join(this);
            
        },
        
		/**        
		 * @memberof 3rd_Party
		 * @function
		 * @global
		 * @description
		 * Randomizes a string; messes up all the characters.
		 * E.g. "abcdef".randomize() => "bcfdea"
		 */
        randomize: function() {
                        
            return this.split('').sort(function(){
                return Math.random() > 0.5 ? -1 : 1;
            }).join('');
            
        },
        
		/**        
		 * @memberof 3rd_Party
		 * @function
		 * @global
		 * @description
		 * Returns a string with all matches of
         * what (regex) removed.
		 */
        remove: function( what ) {
            
            return this.replace( what || /./g, '' );
            
        },
        
		/**        
		 * @memberof 3rd_Party
		 * @function
		 * @global
		 * @description
         * Returns the string, reversed.
		 */
        reverse: function() {
            
            return this.split('').reverse().join('');
            
        },
        
		/**        
		 * @memberof 3rd_Party
		 * @function
		 * @global
		 * @description
		 * Shortens the string by the specified amount
		 * and appends the token.
		 * E.g.
		 * "this is a long sentance".shorten(10, '...');
		 *  => "this is a ..."
		 */
        shorten: function( length, token ) {
            
            var substrd = this.substring( 0, length || this.length );
            
            return substrd + ( substrd === this ? '' : (token || '') );
            
        },
        
		/**        
		 * @memberof 3rd_Party
		 * @function
		 * @global
		 * @description
		 * Runs the Array.sort() method on every
		 * character of the string.
		 */
        sort: function() {
            
            return Array.prototype.sort.apply( this.split(''), arguments ).join('');
        
        },
        
		/**        
		 * @memberof 3rd_Party
		 * @function
		 * @global
		 * @description
		 * Returns the DOM representation of the string,
		 * in the form of an array of DOM nodes.
		 */
        toDOM: function() {
            
            var temp = document.createElement('div');
            temp.innerHTML = this;
            
            return Array.prototype.slice.call( div.childNodes );
            
        },
        
		/**        
		 * @memberof 3rd_Party
		 * @function
		 * @global
		 * @description
		 * Returns the string with leading and
		 * trailing spaces removed.
		 */
        trim: function() {
            
            return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        
        },
        
		/**
		 * @memberof 3rd_Party
		 * @function
		 * @global
		 * @description
		 * Wraps the string.
		 * E.g.
		 * "the dog realllly wet".wrap(4, '<br/>')
		 *  => "the <br/>dog <br/>realllly <br/>wet"
		 **/
        wrap: function( width, brk, cut ) {
                       
            brk = brk || '\n';
            width = width || 75;
            cut = cut || false;
         
            if (!this) { return this; }
         
            var regex = '.{1,' +width+ '}(\\s|$)' + (cut ? '|.{' +width+ '}|.+$' : '|\\S+?(\\s|$)');
         
            return this.match( RegExp(regex, 'g') ).join( brk );
            
        }
        
    };
    
    /* This is where each method is added to String.prototype
       ( assuming it's not already there ) */
    for (var method in methods) {
        String.prototype[method] = String.prototype[method] || methods[method];
    }
    
})();
