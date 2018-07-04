/**
 * string.js
 * James Padolsey
 * http://james.padolsey.com
 * -
 * Some useful additional methods for String.prototype.
 * - Added Huffamn encoding & decoding.
 */

(function(){
    
    var methods = {
        			
        /**
         * Returns string with all instances of "-word" replaced with "Word", E.g. "background-color" -> "backgroundColor"
		 *
         * @method camelize
         * @return {string}
         */
        camelize: function() {
                        
            return this.replace(/\-(\w)/g, function( $0, $1 ) {
                return $1.toUpperCase();
            });
        
        },
        
        /**
         * Returns boolean indicating whether or not a substring exists within the string
		 *
         * @method contains
         * @param {string} $what
         * @return {boolean}
         */
        contains: function( $what ) {
            
            $what = typeof $what === 'string' ? $what : $what.toString();
            
            return this.indexOf( $what ) > -1;
            
        },
        
        /**
         * Returns a number indicating how many times a substring or regex is matched within the string
		 *
         * @method count
         * @param {string} $what
         * @return {number}
         */
        count: function( $what ) {
            
            if ( Object.prototype.toString.call($what) !== '[object RegExp]' ) {
                $what = $what.toString().replace(/\$\^\[\]\{\}\(\)\?\:\.\+\*/g, '\\$1');
            }
            
            $what = RegExp( $what ? $what.source : '.', 'g' );
            
            return (this.match( what ) || []).length;
        },
        
        /**
         * Returns string with all instances of -w replaced with W, e.g. "background-color" -> "backgroundColor"
		 * TODO: Verifiy this function
         * @method enclose
         * @param {} a
         * @param {} b
         * @return BinaryExpression
         */
        enclose: function( a, b ) {
            
            return (a = a || '') + this + (b ? b : a);
            
        },
        
        /**
		  * Matches the string against the passed regex and the returns the group specified by _n_
		  * 
		  * E.g.
		  *     ('hi #boo and #adam').extract(/#(\w+)/g, 1);
		  *       => ['boo', 'adam']
		  *       
		  * If the regex is global then an array is returned otherwise just the matched group is returned.
		  *
         * @method extract
         * @param {string} regex
         * @param {number} n
         * @return {mixed}
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
         * Runs the passed function on every character, similar to Array.prototype.forEach
		 *
         * @method forEach
         * @param {function} fn
         * @return Literal
         */
        forEach: function( $fn ) {
            
            var c, i = -1;
            
            while ( (c = this[++i]) ) {
                $fn.call( this, c, i );
            }
            
            return true;
        
        },
        
        /**
         * Runs the passed function on every word, similar to Array.prototype.forEach
		 *
         * @method forEachWord
         * @param {function} fn
         * @return Literal
         */
        forEachWord: function( $fn ) {
            
            var string = this,
                i = -1;
            
            string.replace(/\b([\w\-]+)\b/g, function( match, word ){
                $fn.call( string, word, ++i );
                return match;
            });
            
            return true;
        
        },
        
        /**
         * Returns a string with all URLs replaced with HTML anchor tags.
		 *
         * @method linkify
         * @param {} replacement
         * @return CallExpression
         */
        linkify: function( $replacement ) {
            
            return this.replace(/(^|\s)((?:f|ht)tps?:\/\/[^\s]+)/g, $replacement || '$1<a href="$2">$2</a>');
            
        },
        
        /**
         * Returns a string which is made up of _n_ instances of the original string. E.g. "a".many(3) => "aaa"
		 *
         * @method many
         * @param {number} n
         * @return {string}
         */
        many: function( n ) {
            
            return Array(n ? n + 1 : 2).join(this);
            
        },
        
        /**
         * Randomizes a string; messes up all the characters. E.g. "abcdef".randomize() => "bcfdea"
		 *
         * @method randomize
         * @return CallExpression
         */
        randomize: function() {
            
            return this.split('').sort(function(){
                return Math.random() > 0.5 ? -1 : 1;
            }).join('');
            
        },
        
        /**
         * Returns a string with all matches of $what (regex) removed.
		 *
         * @method remove
         * @param {string} $what
         * @return {string}
         */
        remove: function( $what ) {
            
            return this.replace( $what || /./g, '' );
            
        },
        
        /**
         * Returns the string, reversed.
		 *
         * @method reverse
         * @return {string}
         */
        reverse: function() {
            
            return this.split('').reverse().join('');
            
        },
        
        /**
         * Shortens the string by the specified amount and appends the token.
         * E.g.
         * "this is a long sentance".shorten(10, '...');
         *  => "this is a ..."
         * 
         * @method shorten
         * @param {} $length
         * @param {} token
         * @return BinaryExpression
         */
        shorten: function( $length, $token ) {
            
            var substrd = this.substring( 0, $length || this.length );
            
            return substrd + ( substrd === this ? '' : ($token || '') );
            
        },
        
        /**
         * Runs the Array.sort() method on every character of the string.
		 *
         * @method sort
         * @return CallExpression
         */
        sort: function() {
            
            return Array.prototype.sort.apply( this.split(''), arguments ).join('');
        
        },
        
        /**
         * Returns the DOM representation of the string, in the form of an array of DOM nodes.
		 *
         * @method toDOM
         * @return CallExpression
         */
        toDOM: function() {
            
            var temp = document.createElement('div');
            temp.innerHTML = this;
            
            return Array.prototype.slice.call( div.childNodes );
            
        },
        
        /**
         * Returns the string with leading and trailing spaces removed.
		 *
         * @method trim
         * @return CallExpression
         */
        trim: function() {
            
            return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        
        },
        
        /**
         * Wraps the string.
         * E.g.
         * "the dog realllly wet".wrap(4, '<br/>')
         *  => "the <br/>dog <br/>realllly <br/>wet"
         * 
         * @method wrap
         * @param {number} width
         * @param {string} brk
         * @param {} cut
         * @return {string}
         */
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
