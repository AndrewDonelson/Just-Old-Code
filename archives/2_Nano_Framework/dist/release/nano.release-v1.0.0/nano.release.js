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
/**
 * @project maestro
 * @author Andrew Donelson <andrew@i2tmlabs.com>
 * @license http://i2tmlabs.com/license.html
 * @namespace
 * @name CS2I
 */

/**
 * Runs an applet
 * @function
 * @global
 * @param {string} $applet
 * @memberof CS2I
 */
RUN = function ($applet) {
	if (this['vld'](nldr.bootstrap)) r2wl.applets.use({file:$applet});
}

/**
 * Enhanced function for determining the given parameter in a standard accurate way.
 * @method isa
 * @param {mixed} $e
 * @returns {string} $t
 * @memberof CS2I
 */
ISA=function($e) {
	/**
	 * Figure out what the parameter is
	 * @method what
	 * @param {mixed} $e
	 * @returns {string}
	 * @private
	 * @memberof fn.isa
	 */
	 //replace( '[' || /./g, '' )
	what = function($e) { return Object.prototype.toString.call($e).replace( '[' || /./g, '' ).replace( ']' || /./g, '' ).split(' ').pop(); }
	/**
	 * Determine the kind
	 * @method kind
	 * @param {mixed} $k
	 * @param {mixed} $e
	 * @private
	 * @returns string
	 * @memberof fn.isa
	 */
	kind = function($k,$e) {
		if ($e===null) return 'null'; 
		else if ($e==='undefined') return 'undefined'; 
		else if ($k!=='Object' && $k!=='Function') return $k;
		
		if ($k==='Object') {
			//object Object = Class?
			if (typeof ($e.constructor) !== 'undefined') { 	//Simple Object at least
				if (typeof ($e.Class) !== 'undefined') { 	//Child Object at least
					if (typeof ($e.Class._CLASSNAME) !== 'undefined') { 	//Decendent of H5C3 
						return $e.Class._CLASSNAME; 
					} else if (typeof ($e.name) !== 'undefined'&&$e.name!=='') return 'Object:'+$e.name; else return 'Object:Unnamed';
				} else return 'Object:Simple';
			} else if (typeof $e.toString !== 'undefined') {
				return $k;
			} else return 'Object';
		} else if ($k==='Function') {
			//object Object = Class?
			if (typeof ($e.arguments) !== 'undefined') {
				if (typeof ($e.prototype) !== 'undefined')
					if (typeof ($e.name) !== 'undefined'&&$e.name!=='') return 'Method:'+$e.name; else return 'Method:Unnamed';
				else return $k;
			} else {
				var klass=null;
			}
		}
	}
	var $t = kind(what($e),$e);
		return $t;
}

/**
 * Static class with lots of device information.
 *
 * @class I$Device
 * @extends I$Interface
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Interface',

	//What is the name of your new interface?
	'I$Device',
	
	/** @lends I$Interface */
	{		
		/** 
		 * This is an API so there can only be one instance.
		 *
		 * @property {number} maxTotalObjects
		 * @expose 
		 */
		maxTotalObjects:0,
        pixelRatio:0,
        isiPhone:false,
        isiPhone4:false,
        isiPad:false,
        isiPod: false,
        isAndroid:false,
        isTouch:false,
        isFirefox:false,
        isChrome:false,
        isOpera:false,
        isIE:false,
        ieVersion:0,
        requestAnimFrame:null,
        hasMemoryProfiling:false,
        canPlayOgg: false,
        canPlayMP3: false,
        canPlayWav: false,

        /**
         * Description
         * @method init
         * @returns none 
         */
        init:function ()
        {
            this.pixelRatio = window.devicePixelRatio || 1;
            this.isiPhone = navigator.userAgent.toLowerCase().indexOf('iphone') != -1;
            this.isiPod = navigator.userAgent.toLowerCase().indexOf('ipod') != -1;
            this.isiPhone4 = (this.pixelRatio == 2 && this.isiPhone);
            this.isiPad = navigator.userAgent.toLowerCase().indexOf('ipad') != -1;
            this.isAndroid = navigator.userAgent.toLowerCase().indexOf('android') != -1;
            this.isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') != -1;
            this.isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') != -1;
            this.isOpera = navigator.userAgent.toLowerCase().indexOf('opera') != -1;
            this.isTouch = window.ontouchstart !== 'undefined';
            this.isiOS = (this.isiPhone || this.iPad || this.isiPod);

            if (window.performance != undefined)
                this.hasMemoryProfiling = (window.performance.memory);

            if (/MSIE (\d+\.\d+);/.test(navigator.userAgent))
            {
                this.ieVersion = new Number(RegExp.$1);
                this.isIE = true;
            }

            // determine what sound formats we can play
            var check = new Audio();
            if (check.canPlayType('audio/ogg')) this.canPlayOgg = true;
            if (check.canPlayType('audio/mpeg')) this.canPlayMP3 = true;
            if (check.canPlayType('audio/x-wav')) this.canPlayWav = true;

            this.requestAnimFrame = (function ()
            {
                var request =
                    window.requestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.oRequestAnimationFrame ||
                        window.msRequestAnimationFrame ||
                        function (callback, element)
                        {
                            window.setTimeout(callback, 16, Date.now());
                        };

                // apply to our window global to avoid illegal invocations (it's a native)
                return function (callback, element)
                {
                    request.apply(window, [callback, element]);
                };
            })();

            // todo:
            // highres timer
            // game pads
            // fullscreen api
            // mouse lock
        },

        /**
         * Description
         * @method canPlay
         * @param {} format
         * @returns Literal
         */
        canPlay: function(format)
        {
            if (format.toLowerCase() === 'mp3' && this.canPlayMP3) return true;
            if (format.toLowerCase() === 'ogg' && this.canPlayOgg) return true;
            if (format.toLowerCase() === 'wav' && this.canPlayWav) return true;
            return false;
        },

        /**
         * Description
         * @method getUsedHeap
         * @returns ConditionalExpression
         */
        getUsedHeap:function ()
        {
            return this.hasMemoryProfiling ? window.performance.memory.usedJSHeapSize : 0;
        },

        /**
         * Description
         * @method getTotalHeap
         * @returns ConditionalExpression
         */
        getTotalHeap:function ()
        {
            return this.hasMemoryProfiling ? window.performance.memory.totalJSHeapSize : 0;
        }
	},
	/** @lends I$Interface.prototype */
	{
		// Singleton static class, so nothing required here
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

/**
 * A map of linked lists mapped by a string value
 *
 * @class I$HashList
 * @extends I$Interface
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Interface',

	//What is the name of your new interface?
	'I$HashList',
	
	/** @lends I$Interface */
	{		
	},
	/** @lends I$Interface.prototype */
	{
        /** Internal hash table of lists */
        hashtable: null,

        /**
         * Constructs a new hash list
         * @constructor init
         * @returns none
         */
        init: function()
        {
            this['hashtable'] = create('I$Hashtable');
        },

        /**
         * Add an object to a list based on the given key. If the list doesn't yet exist it will be constructed.
         * @method add
         * @param {String} key Key
         * @param {Object} object Object to store
         */
        add: function(key, object)
        {
            // find the list associated with this key and add the object to it
            var list = this['hastable']['get'](key);
            if (list == null)
            {
                // no list associated with this key yet, so let's make one
                list = create('LinkedList');
                this['hastable']['put'](key, list);
            }
            list['add'](object);
        },

        /**
         * Removes an object from the list
         * @method remove
         * @param {String} key Key for the list to remove the object from
         * @param {Object} object Object to remove
         */
        remove: function(key, object)
        {
            var list = this['hastable']['get'](key);
            if (list == null) throw "No list for a key in hashlist when removing";
            list['remove'](object);
        },

        /**
         * Get a list associated with a given key
         * @method get
         * @param {String} key The key
         * @returns {LinkedList} The list
         */
        get: function(key)
        {
            return this['hastable']['get'](key);
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
	
/**
 * Copyright 2010 Tim Down.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Author: Tim Down <tim@timdown.co.uk>
 * Version: 2.1
 * Build date: 21 March 2010
 * Website: http://www.timdown.co.uk/jshashtable
 *
 * (Slight mod to add to CS2I namespace -- martin@playcraftlabs.com)
 *
 * jshashtable is a JavaScript implementation of a hash table. It creates a single constructor function called Hashtable
 * in the global scope.
 * Example:
 * <code>
 *     var map = new CS2I.Hashtable();
 *     map.put('test1', obj);
 *     var obj = map.get('test1');
 * </code>
 * @class CS2I.Hashtable
 * @memberof CS2I
 */
P$['interfaces']['Classes']['Hashtable'] = (function ()
{
    var FUNCTION = "function";

    var arrayRemoveAt = (typeof Array.prototype.splice == FUNCTION) ?
        function (arr, idx)
        {
            arr.splice(idx, 1);
        } :

        function (arr, idx)
        {
            var itemsAfterDeleted, i, len;
            if (idx === arr.length - 1)
            {
                arr.length = idx;
            } else
            {
                itemsAfterDeleted = arr.slice(idx + 1);
                arr.length = idx;
                for (i = 0, len = itemsAfterDeleted.length; i < len; ++i)
                {
                    arr[idx + i] = itemsAfterDeleted[i];
                }
            }
        };

    /**
     * Description
     * @method hashObject
     * @param {} obj
     * @returns none 
     */
    function hashObject(obj)
    {
        var hashCode;
        if (typeof obj == "string")
        {
            return obj;
        } else if (typeof obj.hashCode == FUNCTION)
        {
            // Check the hashCode method really has returned a string
            hashCode = obj.hashCode();
            return (typeof hashCode == "string") ? hashCode : hashObject(hashCode);
        } else if (typeof obj.toString == FUNCTION)
        {
            return obj.toString();
        } else
        {
            try
            {
                return String(obj);
            }
            catch (ex)
            {
                // For host objects (such as ActiveObjects in IE) that have no toString() method and throw an error when
                // passed to String()
                return Object.prototype.toString.call(obj);
            }
        }
    }

    /**
     * Description
     * @method equals_fixedValueHasEquals
     * @param {} fixedValue
     * @param {} variableValue
     * @returns CallExpression
     */
    function equals_fixedValueHasEquals(fixedValue, variableValue)
    {
        return fixedValue.equals(variableValue);
    }

    /**
     * Description
     * @method equals_fixedValueNoEquals
     * @param {} fixedValue
     * @param {} variableValue
     * @returns ConditionalExpression
     */
    function equals_fixedValueNoEquals(fixedValue, variableValue)
    {
        return (typeof variableValue.equals == FUNCTION) ?
            variableValue.equals(fixedValue) : (fixedValue === variableValue);
    }

    /**
     * Description
     * @method createKeyValCheck
     * @param {} kvStr
     * @returns FunctionExpression
     */
    function createKeyValCheck(kvStr)
    {
        return function (kv)
        {
            if (kv === null)
            {
                throw new Error("null is not a valid " + kvStr);
            } else if (typeof kv == "undefined")
            {
                throw new Error(kvStr + " must not be undefined");
            }
        };
    }

    var checkKey = createKeyValCheck("key"), checkValue = createKeyValCheck("value");

    /**
     * Description
     * @method Bucket
     * @param {} hash
     * @param {} firstKey
     * @param {} firstValue
     * @param {} equalityFunction
     * @returns none
     */
    function Bucket(hash, firstKey, firstValue, equalityFunction)
    {
        this[0] = hash;
        this.entries = [];
        this['add']['Entry'](firstKey, firstValue);

        if (equalityFunction !== null)
        {
            /**
             * Description
             * @method getEqualityFunction
             * @returns equalityFunction
             */
            this.getEqualityFunction = function ()
            {
                return equalityFunction;
            };
        }
    }

    var EXISTENCE = 0, ENTRY = 1, ENTRY_INDEX_AND_VALUE = 2;

    /**
     * Description
     * @method createBucketSearcher
     * @param {} mode
     * @returns FunctionExpression
     */
    function createBucketSearcher(mode)
    {
        return function (key)
        {
            var i = this.entries.length, entry, equals = this.getEqualityFunction(key);
            while (i--)
            {
                entry = this.entries[i];
                if (equals(key, entry[0]))
                {
                    switch (mode)
                    {
                        case EXISTENCE:
                            return true;
                        case ENTRY:
                            return entry;
                        case ENTRY_INDEX_AND_VALUE:
                            return [ i, entry[1] ];
                    }
                }
            }
            return false;
        };
    }

    /**
     * Description
     * @method createBucketLister
     * @param {} entryProperty
     * @returns FunctionExpression
     */
    function createBucketLister(entryProperty)
    {
        return function (aggregatedArr)
        {
            var startIndex = aggregatedArr.length;
            for (var i = 0, len = this.entries.length; i < len; ++i)
            {
                aggregatedArr[startIndex + i] = this.entries[i][entryProperty];
            }
        };
    }

    Bucket.prototype = {
        /**
         * Description
         * @method getEqualityFunction
         * @param {} searchValue
         * @returns ConditionalExpression
         */
        getEqualityFunction:function (searchValue)
        {
            return (typeof searchValue.equals == FUNCTION) ? equals_fixedValueHasEquals : equals_fixedValueNoEquals;
        },

        getEntryForKey:createBucketSearcher(ENTRY),

        getEntryAndIndexForKey:createBucketSearcher(ENTRY_INDEX_AND_VALUE),

        /**
         * Description
         * @method removeEntryForKey
         * @param {} key
         * @returns Literal
         */
        removeEntryForKey:function (key)
        {
            var result = this.getEntryAndIndexForKey(key);
            if (result)
            {
                arrayRemoveAt(this.entries, result[0]);
                return result[1];
            }
            return null;
        },

        /**
         * Description
         * @method addEntry
         * @param {} key
         * @param {} value
         * @returns none 
         */
        addEntry:function (key, value)
        {
            this.entries[this.entries.length] = [key, value];
        },

        keys:createBucketLister(0),

        values:createBucketLister(1),

        /**
         * Description
         * @method getEntries
         * @param {} entries
         * @returns none 
         */
        getEntries:function (entries)
        {
            var startIndex = entries.length;
            for (var i = 0, len = this.entries.length; i < len; ++i)
            {
                // Clone the entry stored in the bucket before adding to array
                entries[startIndex + i] = this.entries[i].slice(0);
            }
        },

        containsKey:createBucketSearcher(EXISTENCE),

        /**
         * Description
         * @method containsValue
         * @param {} value
         * @returns Literal
         */
        containsValue:function (value)
        {
            var i = this.entries.length;
            while (i--)
            {
                if (value === this.entries[i][1])
                {
                    return true;
                }
            }
            return false;
        }
    };

    // Supporting functions for searching hashtable buckets

    /**
     * Description
     * @method searchBuckets
     * @param {} buckets
     * @param {} hash
     * @returns Literal
     */
    function searchBuckets(buckets, hash)
    {
        var i = buckets.length, bucket;
        while (i--)
        {
            bucket = buckets[i];
            if (hash === bucket[0])
            {
                return i;
            }
        }
        return null;
    }

    /**
     * Description
     * @method getBucketForHash
     * @param {} bucketsByHash
     * @param {} hash
     * @returns ConditionalExpression
     */
    function getBucketForHash(bucketsByHash, hash)
    {
        var bucket = bucketsByHash[hash];

        // Check that this is a genuine bucket and not something inherited from the bucketsByHash's prototype
        return ( bucket && (bucket instanceof Bucket) ) ? bucket : null;
    }

    /**
     * Description
     * @method Hashtable
     * @param {} hashingFunctionParam
     * @param {} equalityFunctionParam
     * @returns none   
     */
    function Hashtable(hashingFunctionParam, equalityFunctionParam)
    {
        var that = this;
        var buckets = [];
        var bucketsByHash = {};

        var hashingFunction = (typeof hashingFunctionParam == FUNCTION) ? hashingFunctionParam : hashObject;
        var equalityFunction = (typeof equalityFunctionParam == FUNCTION) ? equalityFunctionParam : null;

        /**
         * Description
         * @method put
         * @param {} key
         * @param {} value
         * @returns oldValue
         */
        this.put = function (key, value)
        {
            checkKey(key);
            checkValue(value);
            var hash = hashingFunction(key), bucket, bucketEntry, oldValue = null;

            // Check if a bucket exists for the bucket key
            bucket = getBucketForHash(bucketsByHash, hash);
            if (bucket)
            {
                // Check this bucket to see if it already contains this key
                bucketEntry = bucket.getEntryForKey(key);
                if (bucketEntry)
                {
                    // This bucket entry is the current mapping of key to value, so replace old value and we're done.
                    oldValue = bucketEntry[1];
                    bucketEntry[1] = value;
                } else
                {
                    // The bucket does not contain an entry for this key, so add one
                    bucket.addEntry(key, value);
                }
            } else
            {
                // No bucket exists for the key, so create one and put our key/value mapping in
                bucket = new Bucket(hash, key, value, equalityFunction);
                buckets[buckets.length] = bucket;
                bucketsByHash[hash] = bucket;
            }
            return oldValue;
        };

        /**
         * Description
         * @method get
         * @param {} key
         * @returns Literal
         */
        this.get = function (key)
        {
            checkKey(key);

            var hash = hashingFunction(key);

            // Check if a bucket exists for the bucket key
            var bucket = getBucketForHash(bucketsByHash, hash);
            if (bucket)
            {
                // Check this bucket to see if it contains this key
                var bucketEntry = bucket.getEntryForKey(key);
                if (bucketEntry)
                {
                    // This bucket entry is the current mapping of key to value, so return the value.
                    return bucketEntry[1];
                }
            }
            return null;
        };

        /**
         * Description
         * @method containsKey
         * @param {} key
         * @returns ConditionalExpression
         */
        this.containsKey = function (key)
        {
            checkKey(key);
            var bucketKey = hashingFunction(key);

            // Check if a bucket exists for the bucket key
            var bucket = getBucketForHash(bucketsByHash, bucketKey);

            return bucket ? bucket.containsKey(key) : false;
        };

        /**
         * Description
         * @method containsValue
         * @param {} value
         * @returns Literal
         */
        this.containsValue = function (value)
        {
            checkValue(value);
            var i = buckets.length;
            while (i--)
            {
                if (buckets[i].containsValue(value))
                {
                    return true;
                }
            }
            return false;
        };

        /**
         * Description
         * @method clear
         * @returns none 
         */
        this.clear = function ()
        {
            buckets.length = 0;
            bucketsByHash = {};
        };

        /**
         * Description
         * @method isEmpty
         * @returns {boolean}
         */
        this.isEmpty = function ()
        {
            return !buckets.length;
        };

        /**
         * Description
         * @method createBucketAggregator
         * @param {} bucketFuncName
         * @returns FunctionExpression
         */
        var createBucketAggregator = function (bucketFuncName)
        {
            return function ()
            {
                var aggregated = [], i = buckets.length;
                while (i--)
                {
                    buckets[i][bucketFuncName](aggregated);
                }
                return aggregated;
            };
        };

        this.keys = createBucketAggregator("keys");
        this.values = createBucketAggregator("values");
        this.entries = createBucketAggregator("getEntries");

        /**
         * Description
         * @method remove
         * @param {} key
         * @returns oldValue
         */
        this.remove = function (key)
        {
            checkKey(key);

            var hash = hashingFunction(key), bucketIndex, oldValue = null;

            // Check if a bucket exists for the bucket key
            var bucket = getBucketForHash(bucketsByHash, hash);

            if (bucket)
            {
                // Remove entry from this bucket for this key
                oldValue = bucket.removeEntryForKey(key);
                if (oldValue !== null)
                {
                    // Entry was removed, so check if bucket is empty
                    if (!bucket.entries.length)
                    {
                        // Bucket is empty, so remove it from the bucket collections
                        bucketIndex = searchBuckets(buckets, hash);
                        arrayRemoveAt(buckets, bucketIndex);
                        delete bucketsByHash[hash];
                    }
                }
            }
            return oldValue;
        };

        /**
         * Description
         * @method size
         * @returns total
         */
        this.size = function ()
        {
            var total = 0, i = buckets.length;
            while (i--)
            {
                total += buckets[i].entries.length;
            }
            return total;
        };

        /**
         * Description
         * @method each
         * @param {} callback
         * @returns none
         */
        this.each = function (callback)
        {
            var entries = that.entries(), i = entries.length, entry;
            while (i--)
            {
                entry = entries[i];
                callback(entry[0], entry[1]);
            }
        };

        /**
         * Description
         * @method putAll
         * @param {} hashtable
         * @param {} conflictCallback
         * @returns none
         */
        this.putAll = function (hashtable, conflictCallback)
        {
            var entries = hashtable.entries();
            var entry, key, value, thisValue, i = entries.length;
            var hasConflictCallback = (typeof conflictCallback == FUNCTION);
            while (i--)
            {
                entry = entries[i];
                key = entry[0];
                value = entry[1];

                // Check for a conflict. The default behaviour is to overwrite the value for an existing key
                if (hasConflictCallback && (thisValue = that.get(key)))
                {
                    value = conflictCallback(key, thisValue, value);
                }
                that.put(key, value);
            }
        };

        /**
         * Description
         * @method clone
         * @returns clone
         */
        this.clone = function ()
        {
            var clone = new Hashtable(hashingFunctionParam, equalityFunctionParam);
            clone.putAll(that);
            return clone;
        };

        /**
         * Description
         * @method toString
         * @returns result
         */
        this.toString = function ()
        {
            var result = '';
            var keys = this.keys();
            for (var i = 0; i < keys.length; i++)
            {
                var obj = this.get(keys[i]);
                result += keys[i].toString() + ' = ' + obj.toString() + '\n';
            }

            return result;
        }
    }

    return Hashtable;
})();


	
/**
 * A high-performance doubly-linked list intended for use in gaming
 *
 * @class I$LinkedListNode
 * @extends I$Interface
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Interface',

	//What is the name of your new interface?
	'I$LinkedListNode',
	
	/** @lends I$Interface */
	{		
	},
	/** @lends I$Interface.prototype */
	{
        obj:null, // the object reference
        nextLinked:null, // link to next object in the list
        prevLinked:null, // link to previous object in the list
        free:true,

        /**
         * Navigate to the next node in the list
         * @method next
         * @returns {CS2I.LinkedListNode} Next node on the list
		 * @memberof LinkedListNode
         */
        next:function ()
        {
            return this['nextLinked'];
        },

        /**
         * Object this node represents on the list
         * @method object
         * @returns {Object} 
		 * @memberof LinkedListNode
         */
        object:function ()
        {
            return this['obj'];
        },

        /**
         * Navigate to the previous node in the list
         * @method prev
         * @returns {CS2I.LinkedListNode} Prev node on the list
		 * @memberof LinkedListNode
         */
        prev:function ()
        {
            return this['prevLinked'];
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

/**
 * A high-speed doubly linked list of objects. Note that for speed reasons (using a dictionary lookup of
 * cached nodes) there can only be a single instance of an object in the list at the same time. Adding the same
 * object a second time will result in a silent return from the add method.
 * <p>
 * In order to keep a track of node links, an object must be able to identify itself with a getUniqueId() function.
 * <p>
 * To add an item use:
 * <pre><code>
 *   list.add(newItem);
 * </code></pre>
 * <p>
 * You can iterate using the first and next members, such as:
 * <pre><code>
 *   var node = list.first;
 *   while (node)
 *   {
 *       node['obj']ect().DOSOMETHING();
 *       node = node['next']();
 *   }
 * </code></pre>
 *
 * @class I$LinkedList
 * @extends I$Interface
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Interface',

	//What is the name of your new interface?
	'I$LinkedList',
	
	/** @lends I$Interface */
	{		
	},
	/** @lends I$Interface.prototype */
	{
        first:null,
        last:null,
        count:0,
        objToNodeMap:null, // a quick lookup list to map linked list nodes to objects

        /**
         * Constructs a new linked list
         * @method init
		 * @memberof LinkedList
         */
        init:function ()
        {
            this['_super']();
            this['objToNodeMap'] = P$['create']('Hashtable');
        },

        /**
         * Get the LinkedListNode for this object.
         * @method getNode
         * @param obj The object to get the node for
         * @returns CallExpression
		 * @memberof LinkedList
         */
        getNode:function (obj)
        {
            // objects added to a list must implement a getUniqueId which returns a unique object identifier string
            // or just extend CS2I.Base to get it for free
            return this['objToNodeMap']['get'](obj['getUniqueId']());
        },

        /**
         * Adds a specific node to the list -- typically only used internally unless you're doing something funky
         * Use add() to add an object to the list, not this.
         * @method addNode
         * @param {object} obj
         * @returns node
		 * @memberof LinkedList
         */
        addNode:function (obj)
        {
            var node = new CS2I.LinkedNode();
            node['obj'] = obj;
            node['prevLinked'] = null;
            node['nextLinked'] = null;
            node['free'] = false;
            this['objToNodeMap']['put'](obj['getUniqueId'](), node);
            return node;
        },

        /**
         * Add an item to the list
         * @method add
         * @param obj The object to add
		 * @memberof LinkedList
         */
        add:function (obj)
        {
            var node = this['getNode'](obj);
            if (node == null)
            {
                node = this['addNode'](obj);
            } else
            {
                // if the object is already in the list just throw an (can't add an object more than once)
                // if you want to quickly check if an item is already in a list, then call list.has(obj)
                if (node['free'] == false)
                    throw 'Attempting to add object: ' + obj['getUniqueId']() + ' twice to list ' + this['getUniqueId']();

                // reusing a node, so we clean it up
                // this caching of node/object pairs is the reason an object can only exist
                // once in a list -- which also makes things faster (not always creating new node
                // object every time objects are moving on and off the list
                node['obj'] = obj;
                node['free'] = false;
                node['nextLinked'] = null;
                node['prevLinked'] = null;
            }

            // append this obj to the end of the list
            if (this['first'] == null) // is this the first?
            {
                this['first'] = node;
                this['last'] = node;
                node['nextLinked'] = null; // clear just in case
                node['prevLinked'] = null;
            } else
            {
                if (this['last'] == null)
                    throw "Hmm, no last in the list -- that shouldn't happen here";

                // add this entry to the end of the list
                this['last']['nextLinked'] = node; // current end of list points to the new end
                node['prevLinked'] = this['last'];
                this['last'] = node;            // new object to add becomes last in the list
                node['nextLinked'] = null;      // just in case this was previously set
            }
            this.count++;

        },

        /**
         * Description
         * @method has
         * @param {object} obj
         * @returns {boolean}
		 * @memberof LinkedList
         */
        has:function (obj)
        {
            var node = this['getNode'](obj);
            return !(node == null || node['free'] == true);
        },

        /**
         * Moves this item upwards in the list
         * @method moveUp
         * @param obj
		 * @memberof LinkedList
         */
        moveUp:function (obj)
        {
            this['dump']('before move up');
            var c = this['getNode'](obj);
            if (!c) throw "Oops, trying to move an object that isn't in the list";
            if (c['prevLinked'] == null) return; // already first, ignore

            // This operation makes C swap places with B:
            // A <-> B <-> C <-> D
            // A <-> C <-> B <-> D

            var b = c['prevLinked'];
            var a = b['prevLinked'];

            // fix last
            if (c == this['last'])
                this['last'] = b;

            var oldCNext = c['nextLinked'];

            if (a)
                a['nextLinked'] = c;
            c['nextLinked'] = b;
            c['prevLinked'] = b['prevLinked'];

            b['nextLinked'] = oldCNext;
            b['prevLinked'] = c;

            // check to see if we are now first
            if (this['first'] == b)
                this['first'] = c;
        },

        /**
         * Moves this item downwards in the list
         * @method moveDown
         * @param obj
         * @returns none 
		 * @memberof LinkedList
         */
        moveDown:function (obj)
        {
            var b = this['getNode'](obj);
            if (!b) throw "Oops, trying to move an object that isn't in the list";
            if (b['nextLinked'] == null) return; // already last, ignore

            // This operation makes B swap places with C:
            // A <-> B <-> C <-> D
            // A <-> C <-> B <-> D

            var c = b['nextLinked'];
            this.moveUp(c['obj']);

            // check to see if we are now last
            if (this['last'] == c)
                this['last'] = b;
        },

        /**
         * sort list
         * @method sort
         * @param {} compare
         * @returns none 
		 * @memberof LinkedList
         */
        sort:function (compare)
        {
            // take everything off the list and put it in an array
            var sortArray = [];
            var node = this['first'];
            while (node)
            {
                sortArray.push(node['obj']['ect']());
                node = node['next']();
            }

            this.clear();

            // sort it
            sortArray.sort(compare);

            // then put it back
            for (var i = 0; i < sortArray.length; i++)
                this['add'](sortArray[i]);
        },

        /**
         * Removes an item from the list
         * @method remove
         * @param obj The object to remove
         * @returns boolean true if the item was removed, false if the item was not on the list
		 * @memberof LinkedList
         */
        remove:function (obj)
        {
            var node = this['getNode'](obj);
            if (node == null || node['free'] == true)
                return false; // ignore this error (trying to remove something not there
            //throw ('Error: trying to remove a node (' + obj + ') that isnt on the list ');

            // pull this object out and tie up the ends
            if (node['prevLinked'] != null)
                node['prevLinked']['nextLinked'] = node['nextLinked'];
            if (node['nextLinked'] != null)
                node['nextLinked']['prevLinked'] = node['prevLinked'];

            // fix first and last
            if (node['prevLinked'] == null) // if this was first on the list
                this['first'] = node['nextLinked']; // make the next on the list first (can be null)
            if (node['nextLinked'] == null) // if this was the last
                this['last'] = node['prevLinked']; // then this nodes previous becomes last

            node['free'] = true;
            node['prevLinked'] = null;
            node['nextLinked'] = null;

            this.count--;

            return true;
        },

        /**
         * Clears the list out
         * @method clear
		 * @memberof LinkedList
         */
        clear:function ()
        {
            // sweep the list and free all the nodes
            var next = this['first'];
            while (next != null)
            {
                next['free'] = true;
                next = next['nextLinked'];
            }
            this['first'] = null;
            this.count = 0;
        },

        /**
         * Description
         * @method length
         * @returns MemberExpression
		 * @memberof LinkedList
         */
        length:function ()
        {
            return this['count'];
        },

        /**
         * @method dump
         * @param {string} msg
         * @returns none 
		 * @memberof LinkedList
         */
        dump:function (msg)
        {
            var a = this['first'];
            while (a != null)
            {
                a = a['next']();
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
		/** @export Member */
		/*
		someMethod:I$InterfaceMethod,
		...
		someMethod:I$InterfaceMethod
		*/
	]
);


/**
 * Example:
 * <code>
 * var measure = new CS2I.PerformanceMeasure('A test');
 * // ... do something
 * log(measure.end()); // end returns a string you can easily log
 * </code>
 *
 * The memory count is an idea based on a delta of the useJSHeapSize exposed by Chrome.
 * You will need to restart Chrome with --enable-memory-info to have this exposed.
 * It is however, not very reliable as the value will jump around due to gc runs (I think).
 * So far it seems to produce reliable results that are consistent, however memStart > memEnd
 * cases still occur and it would be good to understand this more (is it limited only to GC
 * runs? if so, why is it so consistent?).
 *
 * @class I$PerformanceMeasure
 * @extends I$Interface
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Interface',

	//What is the name of your new interface?
	'I$PerformanceMeasure',
	
	/** @lends I$Interface */
	{		
		history: [],

		/**
		 * Clears the performance history
		 * @method clearHistory
		 * @memberof PerformanceMeasure
		 */
		clearHistory: function()
		{
			history['length'] = 0;
		}
	},
	/** @lends I$Interface.prototype */
	{
		timeStart: 0,
		timeEnd: 0,
		timeDelat: 0,
		memStart: 0,
		memEnd: 0,
		memDelta: 0,
		description: null,

		/**
		 * Constructs a new performance measure with description
		 * @method init
		 * @param description
		 * @memberof PerformanceMeasure
		 */
		init: function(description)
		{
			this.description = description;
			this.start();
			this['Class'].history.push(this);
		},

		/**
		 * Starts a performance measure
		 * @method start
		 * @returns none 
		 * @memberof PerformanceMeasure
		 */
		start: function()
		{
			this.timeStart = Date.now();
			this.memStart = CS2I.Device.getUsedHeap();
		},

		/**
		 * Ends a performance measure, and for convenience returns a toString of the measurement
		 * @method end
		 * @returns String representing the measurement
		 * @memberof PerformanceMeasure
		 */
		end: function()
		{
			this.timeEnd = Date.now();
			this.timeDelta = this.timeEnd - this.timeStart;
			this.memEnd = CS2I.Device.getUsedHeap();

			if (this.memEnd < this.memStart)
				this.memDelta = 0;
			else
				this.memDelta = this.memEnd - this.memStart;
			return this.toString();
		},

		/**
		 * Reports the performance measurement in a nice clean way
		 * @method toString
		 * @returns {boolean}
		 * @memberof PerformanceMeasure
		 */
		toString: function()
		{
			return this.description + ' took ' + this.timeDelta + 'ms, ' +
				(this.memDelta == 0 ? 'unknown':this.memDelta) + ' byte(s)';
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

/**
 * Easy (high-performance) object pooling
 *
 * A pool of objects for use in situations where you want to minimize object life cycling (and
 * subsequently garbage collection). It also serves as a very high speed, minimal overhead
 * collection for small numbers of objects.
 * <p>
 * This class maintains mutual an array of objects which are free. If you wish to maintain a list of both
 * free and used then see the CS2I.DualPool.
 * <p>
 * Pools are managed by class type, and will auto-expand as required. You can create a custom initial pool
 * size by deriving from the Pool class and statically overriding INITIAL_POOL_SIZE.
 * <p>
 * Keep in mind that objects that are pooled are not constructed; they are "reset" when handed out.
 * You need to "acquire" one and then reset its state, usually via a static create factory method.
 * <p>
 * Example:
 * <pre><code>
 * Point = CS2I.Pooled('Point',
 * {
 *   // Static constructor
 *   create:function (x, y)
 *   {
 *      var n = this['_super']();
 *      n.x = x;
 *      n.y = y;
 *      return n;
 *   }
 * },
 * {
 *    x:0, y:0,   // instance
 *
 *    init: function(x, y)
 *    {
 *       this.x = x;
 *       this.y = y;
 *    }
 * }
 * </code></pre>
 * To then access the object from the pool, use create, instead of new. Then release it.
 * <pre><code>
 * var p = Point.create(100, 100);
 * // ... do something
 * p.release();
 * </code></pre>
 *
 * @class I$Pool
 * @extends I$Interface
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Interface',

	//What is the name of your new interface?
	'I$Pool',
	
	/** @lends I$Interface */
	{		
        /** Initial size of all object pools */
        INITIAL_POOL_SIZE:1,

        /** Hashtable of ALL the object pools */
        pools:new P$['interfaces']['Classes']['Hashtable'](),
        /** total objects in all pools */
        totalPooled:0,
        /** total objects in use right now */
        totalUsed:0,

        /**
         * Acquire an object from a pool based on the class[name]. Typically this method is
         * automatically called from Pooled.create method and should not be used directly.
         * @method acquire
         * @param {String} classType Class of object to create
         * @returns {CS2I.Pooled} A shiny object you can then configure
		 * @memberof Pool
         */
        acquire:function (classType)
        {
            var pool = this.getPool(classType);
            if (pool == undefined || pool == null)
            {
                // create a pool for this type of class
                //this['info']('Constructing a new pool for ' + classType.fullName + ' objects.');
                pool = new CS2I.Pool(classType, this.INITIAL_POOL_SIZE);
                this.pools.put(classType.fullName, pool);
            }

            return pool.acquire();
        },

        /**
         * Releases an object back into it's corresponding object pool
         * @method release
         * @param {CS2I.Pooled} pooledObj Object to return to the pool
		 * @memberof Pool
         */
        release:function (pooledObj)
        {
            var pool = this.pools.get(pooledObj.Class.fullName);
            if (pool == undefined)
                throw "Oops, trying to release an object of type " + pooledObj.Class.fullName +
                    " but no pool exists. Did you new an object instead of using create.";

            pool.release(pooledObj);
        },

        /**
         * Returns the pool associated with the given classType, or null if no pool currently exists.
         * @method getPool
         * @returns {CS2I.Pool} Object pool associated with the class type
		 * @memberof Pool
         */
        getPool:function (classType)
        {
            return this.pools.get(classType.fullName);
        },

        /**
         * Gets stats on the usage of all pools.
         * @method getStats
         * @returns {String} Stats string
		 * @memberof Pool
         */
        getStats:function ()
        {
            var s = '';

            var keys = this.pools.keys();
            for (var i = 0; i < keys.length; i++)
            {
                var key = keys[i];
                var pool = this.pools.get(key);
                s += key + ': ' + pool.getStats()  + '\n';
            }

            return s;
        }
	},
	/** @lends I$Interface.prototype */
	{
        /** Linked list of currently free objects residing in the pool */
        freeList:null,
        /** Current number of items to expand by: will increase with every expansion */
        expansion: 1,
        /** Array of traces currently active. Tracing must be on. */
        traces: null,

        /**
         * Constructs a pool. Will automatically be called by the static pool method. Generally not called directly.
         * @method init
         * @param {String} classType Class name of the type of objects in the pool
         * @param {Number} initial Starting number of objects in the pool
		 * @memberof Pool
         */
        init:function (classType, initial)
        {
            this['_super']();
            this.classType = classType;
            this.freeList = [];

            // instantiate the initial objects for the pool
            this.expand(initial);
        },

        /**
         * Enables tracing on this pool.
         * @method startTracing
		 * @memberof Pool
         */
        startTracing:function ()
        {
            if (this.tracing) return;
            this.tracing = true;
            if (this.traces)
                this.traces.clear();
            else
                this.traces = new CS2I.Hashtable();
        },

        /**
         * Disables tracing on this pool.
         * @method stopTracing
		 * @memberof Pool
         */
        stopTracing:function ()
        {
            this.tracing = false;
        },

        /**
         * Expand the pool of objects by constructing a bunch of new ones. The pool will
         * automatically expand itself by 10% each time it runs out of space, so generally you
         * shouldn't need to use this.
         * @method expand
         * @param {Number} howMany Number of new objects you want to add
		 * @memberof Pool
         */
        expand:function (howMany)
        {
            CS2I.Pool.totalPooled += howMany;


            for (var i = 0; i < howMany; i++)
                this.freeList.push(new this.classType());
        },

        /**
         * Gets the free count of objects left in the pool
         * @method getFreeCount
         * @returns {Number} Number free
		 * @memberof Pool
         */
        getFreeCount: function()
        {
            return this.freeList.length;
        },

        /**
         * Returns the next free object by moving it from the free pool to the used one. If no free objects are
         * available it will expand the pool
         * @method acquire
         * @returns {CS2I.Pooled} A pooled object
		 * @memberof Pool
         */
        acquire:function ()
        {
            // check if we have anymore to give out
            if (this.freeList.length <= 0)
            {
                // create some more space (expand by 20%, minimum 1)
                this.expansion = Math.round(this.expansion*1.2)+1;
                this.expand(this.expansion);
            }

            // if (this.tracing)
            // {
                // var stack = printStackTrace();
                // var pos = stack.length - 1;
                // while (stack[pos].indexOf('Class.addTo') == 0 && pos > 0)
                    // pos--;
                // var count = this.traces.get(stack[pos]);
                // if (count == null)
                    // this.traces.put(stack[pos], { value:1 });
                // else
                    // count.value++;
            // }

            return this.freeList.pop();
        },

        /**
         * Releases an object by moving it back onto the free pool
         * @method release
         * @param {CS2I.Pooled} obj The obj to release back into the pool
         * @returns none 
		 * @memberof Pool
         */
        release:function (obj)
        {
            this.freeList.push(obj);
        },

        /**
         * Gets stats about the pool
         * @method getStats
         * @returns {String} Stats
		 * @memberof Pool
         */
        getStats:function ()
        {
            var s = this['Class'].fullName + ' stats: ' + this.freeList.length + ' free.';

            if (this.tracing)
            {
                s += 'TRACING\n';
                var traceKeys = this.traces.keys();
                for (var k in traceKeys)
                    s += traceKeys[k] + ' (' + this.traces.get(traceKeys[k]).value + ')\n';
            }
            return s;
        },

        /**
         * system, mostly.
         * @method dump
         * @param {String} msg A string to write before the dump
		 * @memberof Pool
         */
        dump:function (msg)
        {
            this['info']('================== ' + msg + ' ===================');
            this['info']('FREE');
            this.freeList.dump();
        },

        /**
         * Returns the number of objects in the pool
         * @method size
         * @returns {Number} Total objects
		 * @memberof Pool
         */
        size:function ()
        {
            return this.freeList.length;
        },

        /**
         * Returns the LinkedList of currently free objects in the pool
         * @method getFreeList
         * @returns {CS2I.LinkedList} List of free objects
		 * @memberof Pool
         */
        getFreeList:function ()
        {
            return this.freeList;
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

 
/**
 * Easy (high-performance) object pooling
 *
 * A pool of objects for use in situations where you want to minimize object life cycling (and
 * subsequently garbage collection). It also serves as a very high speed, minimal overhead
 * collection for small numbers of objects.
 * <p>
 * This class maintains mutual set of doubly-linked lists in order to differentiate between
 * objects that are in use and those that are unallocated from the pool. This allows for much
 * faster cycling of only the in-use objects.
 * <p>
 * Pools are managed by class type, and will auto-expand as required. You can create a custom initial pool
 * size by deriving from the Pool class and statically overriding INITIAL_POOL_SIZE.
 * <p>
 * Keep in mind that objects that are pooled are not constructed; they are "reset" when handed out.
 * You need to "acquire" one and then reset its state, usually via a static create factory method.
 * <p>
 * Example:
 * <code>
 * Point = CS2I.Pooled('Point',
 * {
 *   // Static constructor
 *   create:function (x, y)
 *   {
 *      var n = this['_super']();
 *      n.x = x;
 *      n.y = y;
 *      return n;
 *   }
 * },
 * {
 *    x:0, y:0,   // instance
 *
 *    init: function(x, y)
 *    {
 *       this.x = x;
 *       this.y = y;
 *    }
 * }
 * </code>
 * To then access the object from the pool, use create, instead of new. Then release it.
 * <code>
 * var p = Point.create(100, 100);
 * // ... do something
 * p.release();
 * </code>
 *
 * @class I$DualPool
 * @extends I$Pool
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Pool',

	//What is the name of your new interface?
	'I$DualPool',
	
	/** @lends I$Pool */
	{		
        /**
         * Acquire an object from a pool based on the class[name]. Typically this method is
         * automatically called from Pooled.create method and should not be used directly.
         * @method acquire
		 * @protected
         * @param {String} classType Class of object to create
         * @returns {CS2I.Pooled} A shiny object you can then configure
		 * @memberof DualPool
         */
        acquire:function (classType)
        {
            var pool = this.getPool(classType);
            if (pool == undefined || pool == null)
            {
                pool = new CS2I.DualPool(classType, this.INITIAL_POOL_SIZE);
                this.pools.put(classType.fullName, pool);
            }

            return pool.acquire();
        },

        /**
         * Gets stats on the usage of all pools.
         * @method getStats
		 * @protected
		 * @memberof DualPool
         * @returns {String} Stats string
         */
        getStats:function ()
        {
            var s = '';

            var keys = this.pools.keys();
            for (var i = 0; i < keys.length; i++)
            {
                var key = keys[i];
                var pool = this.pools.get(key);
                s += key + ' (free: ' + pool.freeList.length() + ' used: ' + pool.usedList.length() + ')\n';
            }
            return s;
        }
	},
	/** @lends I$Pool.prototype */
	{
        /** Linked list of currently free objects residing in the pool */
        freeList:null,
        /** Linked list of currently used objects not in the pool */
        usedList:null,

        /**
         * Constructs a pool. Will automatically be called by the static pool method. Generally not called directly.
         * @method init
		 * @memberof DualPool
         * @param {String} classType Class name of the type of objects in the pool
         * @param {Number} initial Starting number of objects in the pool
         */
        init:function (classType, initial)
        {
            this.classType = classType;
            this.usedList = new CS2I.LinkedList();
            this.freeList = new CS2I.LinkedList();

            // instantiate the initial objects for the pool
            this.expand(initial);
        },

        /**
         * Expand the pool of objects by constructing a bunch of new ones. The pool will
         * automatically expand itself by 10% each time it runs out of space, so generally you
         * shouldn't need to use this.
         * @method expand
		 * @memberof DualPool
         * @param {Number} howMany Number of new objects you want to add
         */
        expand:function (howMany)
        {
            CS2I.Pool.totalPooled += howMany;
            for (var i = 0; i < howMany; i++)
                this.freeList.add(new this.classType());
        },

        returnObj:null,

        /**
         * Returns the next free object by moving it from the free pool to the used one.
         * @method acquire
		 * @memberof DualPool
         * @returns {CS2I.DualPooled} A pooled object you can then configure
         */
        acquire:function ()
        {
            // check if we have anymore to give out
            if (this.freeList.first == null)
            // create some more space (expand by 20%, minimum 1)
                this.expand(Math.round(this.size() / 5) + 1);

            this.returnObj = this.freeList.first.obj;
            this.freeList.remove(this.returnObj);
            this.returnObj.destroyed = false;
            this.usedList.add(this.returnObj);

            // if (this.tracing)
            // {
                // var stack = printStackTrace();
                // var pos = stack.length - 1;
                // while (stack[pos].indexOf('Class.addTo') == 0 && pos > 0)
                    // pos--;
                // var count = this.traces.get(stack[pos]);
                // if (count == null)
                    // this.traces.put(stack[pos], { value:1 });
                // else
                    // count.value++;
            // }

            return this.returnObj;
        },

        /**
         * Releases an object by moving it from the used list back to the free list.
         * @param obj {CS2I.DualPooled} The obj to release back into the pool
		 * @memberof DualPool
         * @method release
         */
        release:function (obj)
        {
            this.freeList.add(obj);
            this.usedList.remove(obj);
        },

        /**
         * @method dump
		 * @memberof DualPool
         * @param {String} msg Message to display before the dump
         */
        dump:function (msg)
        {
            this['info']('================== ' + msg + ' ===================');
            this['info']('FREE');
            this.freeList.dump();
            this['info']('USED');
            this.usedList.dump();
        },

        /**
         * Returns the number of objects in both the free and used pool
         * @method size
		 * @memberof DualPool
         * @returns {boolean}
         */
        size:function ()
        {
            return this.freeList.count + this.usedList.count;
        },

        /**
         * Returns the LinkedList of current used objects
         * @method getUsedList
		 * @memberof DualPool
         * @returns {CS2I.LinkedList}
         */
        getUsedList:function ()
        {
            return this.usedList;
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


/**
 * Used as a base class for objects which are life cycle managed in an object pool.
 *
 * @class I$Pooled
 * @extends I$Interface
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Interface',

	//What is the name of your new interface?
	'I$Pooled',
	
	/** @lends I$Interface */
	{		
        /**
         * Static factory method for creating a new object based on its class. This method
         * should be called using this['_super'] from the Class.create that derives from this.
         * @method create
		 * @memberof Pooled
         * @returns {CS2I.Pooled} An object from the pool
         */
        create:function ()
        {
            return CS2I.Pool.acquire(this);
        },

        /**
         * Get the object pool associated with this object class
         * @method getPool
		 * @memberof Pooled
         * @returns {CS2I.Pool} The object pool
         */
        getPool:function ()
        {
            return CS2I.Pool.getPool(this);
        }

	},
	/** @lends I$Interface.prototype */
	{
        /** Has the object been destroyed (returned to the pool) */
        destroyed:false,

        /**
         * Constructor for the object (default calls base class init)
		 * @memberof Pooled
         * @method init
         */
        init:function ()
        {
            this['_super']();
        },

        /**
         * Release the object back into the pool
         * @method release
		 * @memberof Pooled
         */
        release:function ()
        {
            this.onRelease();
            CS2I.Pool.release(this);
        },

        /**
         * Template callback when an object is released; gives you a chance to do your own cleanup / releasing
         * @method onRelease
		 * @memberof Pooled
         */
        onRelease:function ()
        {
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


/**
 * Used as a base class for objects which are life cycle managed in an object pool (the DualPool edition)
 *
 * @class I$DualPooled
 * @extends I$Interface
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Interface',

	//What is the name of your new interface?
	'I$DualPooled',
	
	/** @lends I$Interface */
	{		
        /**
         * Static factory method for creating a new object based on its class. This method
         * should be called using this['_super'] from the Class.create that derives from this.
         * @method create
		 * @memberof DualPooled
         * @returns {CS2I.Pooled} An object from the pool
         */
        create:function ()
        {
            return CS2I.DualPool.acquire(this);
        },

        /**
         * Get the object pool associated with this object class
         * @method getPool
		 * @memberof DualPooled
         * @returns {CS2I.Pool} The object pool
         */
        getPool:function ()
        {
            return CS2I.DualPool.getPool(this);
        }
	},
	/** @lends I$Interface.prototype */
	{
        /** Has the object been destroyed (returned to the pool) */
        destroyed:false,

        /**
         * Constructor for the object (default calls base class init)
         * @method init
		 * @memberof DualPooled
         */
        init:function ()
        {
            this['_super']();
        },

        /**
         * Release the object back into the pool
         * @method release
		 * @memberof DualPooled
         */
        release:function ()
        {
            this.onRelease();
            CS2I.DualPool.release(this);
        },

        /**
         * Template callback when an object is released; gives you a chance to do your own cleanup / releasing
         * @method onRelease
		 * @memberof DualPooled
         */
        onRelease:function ()
        {
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

	
if (!Function.prototype.bind)
{
    Function.prototype.bind = function (oThis)
    {
        if (typeof this !== "function") // closest thing possible to the ECMAScript 5 internal IsCallable function
            throw new TypeError("Function.prototype.bind - what is trying to be fBound is not callable");

        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function ()
            {
            },
            fBound = function ()
            {
                return fToBind.apply(this instanceof fNOP ? this : oThis || window, aArgs.concat(Array.prototype.slice.call(arguments)));
            };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();
        return fBound;
    };
}

if (!Array.prototype.indexOf)
{
    Array.prototype.indexOf = function (searchElement /*, fromIndex */)
    {
        "use strict";
        if (this == null)
        {
            throw new TypeError();
        }
        var t = Object(this);
        var len = t.length >>> 0;
        if (len === 0)
        {
            return -1;
        }
        var n = 0;
        if (arguments.length > 0)
        {
            n = Number(arguments[1]);
            if (n != n)
            { // shortcut for verifying if it's NaN
                n = 0;
            } else if (n != 0 && n != Infinity && n != -Infinity)
            {
                n = (n > 0 || -1) * Math.floor(Math.abs(n));
            }
        }
        if (n >= len)
        {
            return -1;
        }
        var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
        for (; k < len; k++)
        {
            if (k in t && t[k] === searchElement)
            {
                return k;
            }
        }
        return -1;
    }
}

/**
 *  Accurate self adjusting global timer
 * See the example:
 *
 *     @example
 *     // Run for 5 secs @ 10 FPS will fire trigger every 100ms
 *     AccuTimer(5000, 10, function($steps,$count,$fps)
 *     {
 *     		//Add code here for every interval
 *		},
 *		function()
 *		{
 *			//Timer done, add cleanup code here 
 *		});
 *
 * @class I$AccuTimer
 * @extends I$Interface
 * @memberof Maestro
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Interface',

	//What is the name of your new interface?
	'I$AccuTimer', 
    {
		timer:null,
		
		/**
		 * Sets a new timer
		 *
		 * @method set
		 * @access private
		 * @param  {number} $length time in milliseconds to run for
		 * @param  {number} $fps desired FPS, ie 60 $fps = 16.66ms interval
		 * @param  {function} on_instance called each interval
		 * @param  {function} oncomplete called when desired interval reached
		 * @returns none 
		 * @memberof AccuTimer
		 */
		create : function($length, $fps, $oninterval, $ondone)
		{
			//86,400,000 ms in a day
			if ($length <=0 ) {
				$length = 86400000;		//No $length? set default to 24hrs
			}
			if ($fps <=0 ) {
				$fps = 1;				//No resolution? set default 1 fps
			}
			
			var $steps = (($length / 100) * ($fps / 10)),		//how many $steps/triggers?
				$speed = ($length / $steps),					//milliseconds between triggers
				$count = 0,									//reset $count
				$start = new Date().getTime();				//get current system time
			
			/**
			 * Create's and $starts a new timer
			 * @instance
			 * @access private
			 * @memberof AccuTimer.set
			 */
			function _instance()
			{
				if ($count++ >= $steps)
				{
					$ondone($steps, $count);
				}
				else
				{
					$oninterval($steps, $count, $fps);
					var diff = ((new Date().getTime() - $start) - ($count * $speed));
					this['timer']=setTimeout(_instance, ($speed - diff));
				}
				
			}
			this['timer']=setTimeout(_instance, $speed);
		},

		/**
		 * Callback function for AccuTimer object
		 * @method CallMebackIn
		 * @access private
		 * @param {number} ms
		 * @param {function} callback
		 * @returns number 
		 * @memberof AccuTimer
		 */
		CallMebackIn : function(ms,callback) {
			if(this['vld'](callback)) return window.setTimeout(callback, ms);
		}
    },
    {
        // Singleton static class, so nothing required here
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
/**
 * Short Description
 *
 * @class I$FactoryWorker
 * @extends I$Pooled
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Pooled',

	//What is the name of your new interface?
	'I$FactoryWorker',
	
	/** @lends I$Pooled */
	{		
		/** 
		 * This is an API so there can only be one instance.
		 *
		 * @property {number} maxTotalObjects
		 * @expose 
		 */
		maxTotalObjects:0,
		
		//Used by factory to clean house if enabled.
		_lastUsed: 0,

		/**
		 *
		 * @param  
		 * {url} url url to the applet - http://applets.i2tmlabs.com/ + path/to/applet/applet.someAppletName.html
		 * @return {Applet} A Applet if successful, Applet Name if failed.
		 */
		create: function($data)
		{
			var n = this['_super']();

			if (n.parse($data))
				return n
			else
				return n.name;
		}
	},
	/** @lends I$Pooled.prototype */
	{
	},
	{
	},
	[]
);


/**
 * For creating like objects. Just an interface class that allows you extend from to create a factory
 * that allows easy creation, use and removal of like objects, like Entities or Sounds, Layers, ect.
 *
 * @class I$Factory
 * @extends I$Interface
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Interface',

	//What is the name of your new interface?
	'I$Factory',
	
	/** @lends I$Interface */
	{		
		/** 
		 * This is an API so there can only be one instance.
		 *
		 * @property {number} maxTotalObjects
		 * @expose 
		 */
		maxTotalObjects:0		
	},
	/** @lends I$Interface.prototype */
	{
		//called when an object is added or removed
		onChanged:function() {},
		
		/** Object Store **/
		objects: {},

		//Set this to how many seconds an object can sit idle (no use() call before it is discarded.
		//0 is default and indefinite.
		idleLifeSpan: 0,
					
		//the number of objects loaded in factory
		count:	0,
		
		init:function($name,$lifespan)
		{
			this['_super']();
			M$.chk($name,'Undefined Factory');
			M$.chk($lifespan,0);
			this.factoryType = $name;
			this.setLife($lifespan);
		},
		
		setLife:function($seconds) {
			var $tmp = ($seconds*1000);
			if (this.idleLifeSpan != $tmp) {
				this.idleLifeSpan = $tmp;
			}
		},
		/**
		 * Used to create a new object and add it to the store. You MUST override this method
		 * in your own Object Factory. Look at Template entity.factory.js and sound.factory.js
		 * for a great example of usage.
		 */
		create:function ()
		{},

		/**
		 * Adds a new object to the store
		 *
		 * String name  Name for the object (NO SPACES)
		 * Object obj The actual object to store in this.objects[name]
		 * return Object
		 */
		add:function($name,$obj)
		{
			if (!this['vld']($obj)) {
			} else {
				if (typeof this.onChanged === 'function') this.onChanged({name:$name,action:'Added'});
				this.objects[$name] = $obj;
				this.count++;
				return this.objects[$name];
			}
		},

		/**
		 * Removes an object from the store
		 *
		 * String name  Name for the object (NO SPACES)
		 * Object obj The actual object to store in this.objects[name]
		 * return Object
		 */
		remove:function($name)
		{
			if (!this.exists($name)) return;
			
			try {
				if (typeof this.onChanged === 'function') this.onChanged({name:$name,action:'Removed'});
				delete this.objects[$name];
				this.count--;
				if (this.count<0) this.count=0;
			} catch (e) {
				return false;
			}
		},
		
		/**
		 * Checks to see if an object exists in the store
		 *
		 * String name  Name for the object (NO SPACES)
		 * return Boolean
		 */
		exists:function($name)
		{
			var $result;
			
			if (this.objects.hasOwnProperty($name)) {
				$result = true;
			} else {
				$result = true;
			}
			return $result;
		},
		
		/**
		 * Returns the requested object
		 *
		 * @param  String name String type of the object to use
		 * @param  Object options Simple object containing options for the desired entity/sound
		 * @return  {Sound|Entity}
		 */
		use:function($options)
		{
			var result;
			
			if (typeof $options != null && typeof $options === 'object') {
				if (this.exists($options.name)) {
					result = this.objects[$options.name];
				} else {
					result = this.create($options);
					//result = this.create($options);
					
				}
			} else {
				this['info']('Factory::use(object) - No longer takes 2 params, use object format.');
				result = null;
			}
			return result;
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
/**
 * <p>
 * Used to store files and variables on client device for offline use.
 * </p>
 * Client storage structure
 * common.*
 * domain.webapp.*
 * 
 * <pre><code>
 * 
 * </code></pre>
 *
 * @class I$DeviceStorage
 * @extends I$Interface
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Interface',

	//What is the name of your new interface?
	'I$DeviceStorage',
	
	/** @lends I$Interface */
	{		
		/** 
		 * This is an API so there can only be one instance.
		 *
		 * @property {number} maxTotalObjects
		 * @expose 
		 */
		maxTotalObjects:0,
		
		/**
		 * @property {boolean} supported
		 * @default false
		 * @memberof LocalStorage
		 */
		supported: null,
		
		config:null,
		
		/**
		 * Description
		 * @method create
		 * @param {} $manifest
		 * @return {boolean}
		 * @constructor 
		 */
		create: function(appcfg,$manifest) {
			this['config']=appcfg;
			this._addMethods(this);
			
			if (this._prepare($manifest))
				return this.prototype;
			else
				return false;
		},	
		
		/**
		 * Description
		 * @method _addMethods
		 * @return 
		 */
		_addMethods:function(self) {
			//Extend the localStorageObject to get/set objects
			/**
			 * Description
			 * @method setObject
			 * @param {} $key
			 * @param {} $value
			 * @return 
			 */
			Storage.prototype.setObject = function($key,$value) {
				var $tmp = JSON.stringify($value);
				this.setItem($key, $tmp);
			}

			//we only need to load once on page load
			/**
			 * Description
			 * @method getObject
			 * @param {} $key
			 * @return $tmp2
			 */
			Storage.prototype.getObject = function($key) {
				var $tmp = this.getItem($key);
				if (!self['vld']($tmp)) return;
				$tmp2 = JSON.parse($tmp);
				return $tmp2;
			}
		},
		
		/**
		 * Description
		 * @method setup
		 * @param {} $what
		 * @return 
		 */
		setup:function($what) {
			if (ISA($what)!=='String') return;
			if (!this['vld'](this.prototype.data[$what])) 
				this.prototype.data[$what] = {};
				
			if (!this['vld'](this.prototype.data[$what]['cfg'])) 
				this.prototype.data[$what]['cfg'] = {};
				
			if (!this['vld'](this.prototype.data[$what]['files'])) 
				this.prototype.data[$what]['files'] = {};
				
			//localStorage.setObject($what,this.prototype.data[$what]);
		},
		
		/**
		 * Description
		 * @method isSupported
		 * @return MemberExpression
		 */
		isSupported:function() {
			if (this.prototype.supported === true || this.prototype.supported === false) return this.prototype.supported; 
			var $msg = "Checking for Local Storage Support...";
			if (typeof(Storage)!=="undefined") {
			  $msg+="Supported.";
			  this.prototype.supported = true;
			} else {
			  $msg+="Not Supported.";
			  this.prototype.supported = false;
			}	
			this['info']($msg);
			return this.prototype.supported;
		},
		
		/**
		 * Description
		 * @method load
		 * @param {} $app
		 * @return 
		 */
		load:function($app) {
			this.prototype.data['global'] = localStorage.getObject('global');
			this.prototype.data[$app] = localStorage.getObject($app);
			this.setup('global');
			this.setup($app);
		},

		/**
		 * Description
		 * @method remove
		 * @param {} $where
		 * @return 
		 */
		remove:function($where) {
			if (this.isSupported()) {
				if ($where===0) $use='global'; else $use=this['config']['name'];
				localStorage.removeItem($use);
			}
		},

		/**
		 * Description
		 * @method what_where
		 * @param {} $n
		 * @return 
		 */
		what_where:function($n) {
			if ($n===0) return {where:'global',what:'cfg'};
			else if ($n===1) return {where:'global',what:'files'};
			else if ($n===2) return {where:this['config']['name'],what:'cfg'};
			else if ($n===3) return {where:this['config']['name'],what:'files'};
			else return null;
		},
		
		/**
		 * Description
		 * @method get
		 * @param {} $key
		 * @param {} $loc
		 * @return Literal
		 */
		get:function($key,$loc) {
			if (this.isSupported()) {
				$use = this.what_where($loc);
					
				try {
					if ($key in this.prototype.data[$use.where][$use.what])
						return this.prototype.data[$use.where][$use.what][$key];
				} catch (e) {
					var foo='bar';
					// localStorage.removeItem(this.prototype.data[$use.where][$use.what][$key]);
				}
			}
			return null;
		},
			
		/**
		 * Save data to localStorage for this domain.
		 * Data can settings that are Global to the domain or local to the cloudapp using (global & app or blank)
		 * data can be files from that are gloabl to the domain or to the cloud app using
		 * 
		 */
		/**
		 * Description
		 * @method set
		 * @param {} $key
		 * @param {} $value
		 * @param {} $loc
		 * @return 
		 */
		set:function($key,$value,$loc) {
			if (this.isSupported()) {
				var $use = this.what_where($loc);
								
				try {
					this.prototype.data[$use.where][$use.what][$key]=$value;
					localStorage.setObject($use.where,this.prototype.data[$use.where]);
					return this.prototype.data[$use.where][$use.what][$key];
				} catch (e) {
				}
			}
		},

		/**
		 * Description
		 * @method _prepare
		 * @param {} $manifest
		 * @return Literal
		 */
		_prepare:function($manifest) {
			if (this.isSupported()) {
				
				this['config']['name'] = new String(this['config']['name'].split(' ').join('')).toLowerCase();

				//this.remove(0);
				//this.remove(1);
				//localStorage.clear();
				this.load(this['config']['name']);

				//See if core nano object data exist. if not new user? erased?
				if (!('firstVisit' in this.prototype.data.global.cfg))	{			
					//nano Global domain (everything on the actual domain. say devzone.i2tmlabs.com
					this.set('firstVisit', true,0);
					this.set('firstVisitTime', Date.now(),0);
				}
				if (!('firstVisit' in this.prototype.data[this['config']['name']].cfg))	{
					//App Domain
					this.set('firstVisit', true,2);
					this.set('firstVisitTime', Date.now(),2);
				}
			}
			return true;
		}
	},
	/** @lends I$Interface.prototype */
	{
		data:{},
			
		/**
		 * @public
		 * @method
		 * @memberof LocalStorage
		 * @desc
		 * </p>
		 * Handles / manages a the Local Starage system on HTML5 enabled devices
		 * </p>
		 */
		/**
		 * Description
		 * @method init
		 * @return 
		 */
		init: function () {
			this['_super']();
		},
		
		/**
		 * Description
		 * @method removeGlobal
		 * @return 
		 */
		removeGlobal:function() { this['Class'].remove(0); },
		/**
		 * Description
		 * @method removeApp
		 * @return 
		 */
		removeApp:function() { this['Class'].remove(1); },
		
		/**
		 * Description
		 * @method getGlobalCfg
		 * @param {} $key
		 * @return CallExpression
		 */
		getGlobalCfg:function($key) 		{ return this['Class'].get($key,0); },	
		/**
		 * Description
		 * @method setGlobalCfg
		 * @param {} $key
		 * @param {} $value
		 * @return 
		 */
		setGlobalCfg:function($key,$value) 	{ this['Class'].set($key,$value,0); },
		/**
		 * Description
		 * @method getGlobalFile
		 * @param {} $key
		 * @return CallExpression
		 */
		getGlobalFile:function($key) 		{ return this['Class'].get($key,1) },	
		/**
		 * Description
		 * @method setGlobalFile
		 * @param {} $key
		 * @param {} $value
		 * @return 
		 */
		setGlobalFile:function($key,$value)	{ this['Class'].set($key,$value,1); },

		/**
		 * Description
		 * @method getAppCfg
		 * @param {} $key
		 * @return CallExpression
		 */
		getAppCfg:function($key) 			{ return this['Class'].get($key,2) },	
		/**
		 * Description
		 * @method setAppCfg
		 * @param {} $key
		 * @param {} $value
		 * @return 
		 */
		setAppCfg:function($key,$value) 	{ this['Class'].set($key,$value,2); },
		/**
		 * Description
		 * @method getAppFile
		 * @param {} $key
		 * @return CallExpression
		 */
		getAppFile:function($key) 			{ return /*this['Class'].get($key,3)*/ },	
		/**
		 * Description
		 * @method setAppFile
		 * @param {} $key
		 * @param {} $value
		 * @return 
		 */
		setAppFile:function($key,$value) 	{ this['Class'].set($key,$value,3); }
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
/**
 * My computer scores			0.0845
 * Galaxy Note 2 scores			1.25 (4.3 pixel)
 * Carolyns Notebook scores 	0.15
 * @module R2WL
 * @augments Base
 * @class DeviceTest
 */
 
/**
 * Device Performance Benchmark
 *
 * @class I$DeviceTest
 * @extends I$Interface
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Interface',

	//What is the name of your new interface?
	'I$DeviceTest',
	
	/** @lends I$Interface */
	{		
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
		canvas:null,
		startTime:0,
		results:[],
		
		/**
		 * object initialization
		 * @method init
		 * @return Literal
		 */
		init:function() {
			this['_super']();
			this['canvas'] = M$['gei']("testCanvas");
			return true;
		},

		/**
		 * Send text to Game Log
		 * @method log
		 * @param {string} s
		 * @param {boolean} eol
		 * @return 
		 */
		log:function(s,eol) {
			var el = M$['gei']('testLog');
			el.value += s;
			if (eol) el.value += '\n';
			el.scrollTop = el.scrollHeight;
		},
		
		/**
		 * Execute the CloudApp Landing Page
		 * @method run
		 * @return 
		 */
		run:function() {
			var elapsed=0,dateTotal=0,pixelTotal=0,mathTotal=0,memTotal=0;
			
			this.testScreen();
			
			if ( this.testBrowser() ) {
				for (i=0;i<=4;i++) {
					elapsed = this.testDate();
					dateTotal+=elapsed;
				}
				this.results['date'] = (dateTotal/3);
				this.log("Date Test: "+this.results['date']+"sec",true);
				
				for (i=0;i<=4;i++) {
					elapsed = this.testPixels();
					pixelTotal+=elapsed;
				}
				this.results['pixels'] = (pixelTotal/3);
				this.log("Pixel Test: "+this.results['pixels']+"sec",true);			
				
				for (i=0;i<=4;i++) {
					elapsed = this.testMath();
					mathTotal+=elapsed;
				}
				this.results['math'] = (mathTotal/3);
				this.log("Math Test: "+this.results['math']+"sec",true);			
			
				for (i=0;i<=4;i++) {
					elapsed = this.testMemory();
					memTotal+=elapsed;
				}
				this.results['mem'] = (memTotal/3);
				this.log("Memory Test: "+this.results['mem']+"sec",true);			
			}
			
			var avg = (this.results['date']+this.results['pixels']+this.results['math']+this.results['mem']) / 4;
			this.log("Your performance index is: "+avg,true);			
		},
		
		/**
		 * Start a single shot 1 second timer
		 * @method startTimer
		 * @return {number} startTime
		 */
		startTimer:function() {
			this.startTime=new Date();
			this.startTime=this.startTime.getTime();
			return this.startTime;
		},

		/**
		 * Stop timer
		 * @method stopTimer
		 * @return {number} nowTime
		 */
		stopTimer:function() {
			var nowTime=new Date();
			nowTime=nowTime.getTime();
			nowTime=(nowTime-this.startTime)/1000;
			return nowTime;
		},	
		
		/**
		 * Determine the browser and version
		 * @method testBrowser
		 * @return Literal
		 */
		testBrowser:function() {

			var platform = "Unknown OS",
				browserName = "Unknown Browser",	
				UA = navigator.userAgent.toLowerCase(),
				index;

			if (navigator.appVersion.indexOf("Win")!=-1) this.platform="Windows";
			if (navigator.appVersion.indexOf("Mac")!=-1) this.platform="MacOS";
			if (navigator.appVersion.indexOf("X11")!=-1) this.platform="UNIX";
			if (navigator.appVersion.indexOf("Linux")!=-1) this.platform="Linux";		
			if (navigator.appVersion.indexOf("Android")!=-1) this.platform="Android";		
			if (navigator.appVersion.indexOf("iOS")!=-1) this.platform="iOS";		
			this.log("Detected "+this.platform+" OS and ",false);
			
			if (document.documentMode) {
				index = UA.indexOf('msie');
				this.browserCheck = "IE";
				this.browserName = "Internet Explorer";
				this.browserVersion = "" + document.documentMode;
			}
			else if (UA.indexOf('chrome') > -1) {
				index = UA.indexOf('chrome');
				this.browserCheck = "Chrome";
				this.browserName = "Google Chrome";
				this.browserVersion = "" + parseFloat('' + UA.substring(index + 7));
			}
			else if (UA.indexOf('firefox') > -1) {
				index = UA.indexOf('firefox');
				this.browserCheck = "Firefox";
				this.browserName = "Mozilla Firefox";
				this.browserVersion = "" + parseFloat('' + UA.substring(index + 8));
			}
			else if (UA.indexOf('minefield') > -1) {
				index = UA.indexOf('minefield');
				this.browserCheck = "Firefox";
				this.browserName = "Mozilla Firefox Minefield";
				this.browserVersion = "" + parseFloat('' + UA.substring(index + 10));
			}
			else if (UA.indexOf('opera') > -1) {
				this.browserCheck = "Opera";
				this.browserName = "Opera";
				this.browserVersion = "";
			}
			else if (UA.indexOf('safari') > -1) {
				index = UA.indexOf('safari');
				this.browserCheck = "Safari";
				this.browserName = "Apple Safari";
				this.browserVersion = "" + parseFloat('' + UA.substring(index + 7));
			}
		
			this.log(this.browserName+" v"+this.browserVersion+" Browser.",false);
			if (this.browserCheck === "Chrome" || this.browserCheck==="Firefox" || this.browserCheck==="Opera") {
				if (this.browserCheck === "Chrome" && this.browserVersion >= 30) {
					this.log("[Pass]",true);
					return true;
				} else if (this.browserCheck === "Firefox" && this.browserVersion >= 25) {
					this.log("[Pass]",true);
					return true;			
				} else if (this.browserCheck === "Opera" && this.browserVersion >= 18) {
					this.log("[Pass]",true);
					return true;			
				}
			}
			this.log("[Fail]",true);
			return false;
		},
		
		/**
		 * Determine the screen resolution via CSS
		 * @method testScreen
		 * @return 
		 */
		testScreen:function() {
			this.log("Resolution is "+screen.width+"x"+screen.height+" - ",false);
			var dpp = M$['gei']('dpp');
			var style = window.getComputedStyle(dpp, null).getPropertyValue('font-size');
			if (style==="3px") {
			} else if (style==="3px") {
				this.results.dppx=3;
			} else if (style==="2px") {
				this.results.dppx=2;
			} else if (style==="1.5px") {
				this.results.dppx=1.5;
			} else {
				this.results.dppx=1;
			}
			this.log(this.results.dppx+" dppx",true);
		},
		
		/**
		 * Determine the time required to render 100k random color pixels
		 */
		/**
		 * Description
		 * @method testPixels
		 * @return CallExpression
		 */
		testPixels:function() {
			var ctx = this['canvas'].getContext("2d"),
				id = ctx.createImageData(1,1),
				x,y,
				d  = id.data;
			
			this['canvas'].width = this['canvas'].width;
			this.startTimer();
			for (i=0;i<=1000000;i++) {
				d[0]   = Math.floor((Math.random()*255));
				d[1]   = Math.floor((Math.random()*255));
				d[2]   = Math.floor((Math.random()*255));
				d[3]   = 255;
				x = Math.floor(Math.random()*this['canvas'].width);
				y = Math.floor(Math.random()*this['canvas'].height);
				ctx.putImageData( id, x, y );
			}
			return this.stopTimer();	
		},
		
		/**
		 * Calculate what date of the week falls on for the next 1000 years
		 */
		/**
		 * Description
		 * @method testDate
		 * @return CallExpression
		 */
		testDate:function() {

			this.startTimer();		
			for (i=2000;i<=102000;i++) {
				var xmasdate=new Date("Dec 24, "+i)
				var xmas=xmasdate.getDay()
				if (xmas==0) {xmas="Sunday"}
				if (xmas==1) {xmas="Monday"}
				if (xmas==2) {xmas="Tuesday"}
				if (xmas==3) {xmas="Wednesday"}
				if (xmas==4) {xmas="Thursday"}
				if (xmas==5) {xmas="Friday"}
				if (xmas==6) {xmas="Saturday"}
				
			}
			return this.stopTimer();
		},
		
		/**
		 * Perform 400k math problems
		 */
		/**
		 * Description
		 * @method testMath
		 * @return CallExpression
		 */
		testMath:function() {
			var a,b,c,d = 0;
			this.startTimer();		
			for (i=0;i<=100000;i++) {
				a=(Math.random()*screen.availWidth)+(Math.random()*screen.availHeight);
				b=(Math.random()*screen.availWidth)-(Math.random()*screen.availHeight);
				c=(Math.random()*screen.availWidth)*(Math.random()*screen.availHeight);
				d=(Math.random()*screen.availWidth)/(Math.random()*screen.availHeight);
			}
			return this.stopTimer();
		},

		/**
		 * Perform 400k math problems
		 */
		/**
		 * Description
		 * @method testMemory
		 * @return CallExpression
		 */
		testMemory:function() {
			var a = new Array();
			var	b = {bool:false,str:'A String',integer:1234,real:3.14159};
				
			this.startTimer();		
			for (i=0;i<=1000000;i++) {
				a.push(b);
			}
			delete a;
			
			return this.stopTimer();
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

 
/**
 * @module R2WL
 *
 * @class I$Launcher
 * @extends I$Interface
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Interface',

	//What is the name of your new interface?
	'I$Launcher',
	
	/** @lends I$Interface */
	{		
		/** 
		 * This is an API so there can only be one instance.
		 *
		 * @property {number} maxTotalObjects
		 * @expose 
		 */
		maxTotalObjects:1,
		
		appPaused : false,
		appRunning : false,
		btnPlay: null,
		canvas: null,
		gameClass:null,
		gldlActive:false,
		/**
		 * Description
		 * @method enableFS
		 * @return 
		 */
		enableFS: function() {
			if (this['canvas'] && !this['canvas'].fullScreen) {
				if(this['canvas'].requestFullscreen)
					this['canvas'].requestFullscreen();
				else if(this['canvas'].webkitRequestFullscreen)
					this['canvas'].webkitRequestFullscreen();
				else if(this['canvas'].mozRequestFullScreen)
					this['canvas'].mozRequestFullScreen();
				else if(this['canvas'].msRequestFullscreen)
					this['canvas'].msRequestFullscreen();
			}
		},

		/**
		 * Description
		 * @method disableFS
		 * @return 
		 */
		disableFS: function() {
			if (this['canvas'] && this['canvas'].fullScreen) {
				if (D$.exitFullscreen) {
					D$.exitFullscreen();
				} else if (D$.mozCancelFullScreen) {
					D$.mozCancelFullScreen();
				} else if (D$.webkitCancelFullScreen) {
					D$.webkitCancelFullScreen();
				} else if (D$.msExitFullScreen) {
					D$.msExitFullScreen();
				}
			}
		}
		
	},
	/** @lends I$Interface.prototype */
	{
		/**
		 * Object Initialization
		 * @method init
		 * @return 
		 */
		init: function() {
			this['_super']();
			this.test = create('I$DeviceTest');
			//this.toggle('loader',true,true);
		},
		
		getCanvas:function() { return this['Class'].canvas; },
		
		isActive:function() { return (nldr['config']['modules'].gldl && typeof gldl != "undefined")?true:false; },
		
		//if game running or play button is enabled and orientation 
		//is not approved by game then pause and display warning
		/**
		 * Determine device orientation and respond accordinaly
		 * @method testOrientation
		 * @return 
		 */
		testOrientation: function() {
			if (window.innerWidth > window.innerHeight) {
				//this.toggle('main',true,true);
				//jQuery("#main").show();
				//jQuery("#page_warning").hide();
				this['Class'].appPaused = false;
			} else {
				this['Class'].appPaused = true;
				//this.toggle('warning',true,true);
				//jQuery("#page_warning").show();
				//jQuery("#main").hide();
			}
		},

		/*---/ Load Support Files/--------------------*/
		dependentFiles:function() {
			if (!M$['getDevMode']()) {
				nldr.addFile('i2tm/js/gldl.release.js');
				return ['js/game.min.js'];
			} else {
				nldr.addFile('i2tm/js/gldl.local.js');
				return [
					'src/class.ai.js','src/class.enemy.js','src/class.fighter.js','src/class.weapon.js',
					'src/layer.game.js','src/layer.hud.js','src/layer.stars.js',
					'src/scene.game.js','src/scene.loading.js','src/scene.publisher.js',
					'src/system.prizedropper.js','src/tools.js',
					'src/physics.js','src/game.js'
				];
			}
		},
		
		createGame:function() {
		
			/*---/ Load Game Library Development Layer (GLDL) /-----------------------*/
			if (this['vld'](nldr['config']['modules'].gldl))
				nldr.que(this.dependentFiles(),true);
		},
		
		onLoad:function() {
			gldl = create('I$GLDL');
			this.onLoaded();
			gldl.device.boot(this.getCanvas().id, 'TheGame');
			r2wl.launcher.play();	
		},
		/**
		 * Pause GLDL app
		 * @method pauseGame
		 * @return 
		 */
		pauseGame: function() {
			if (!this.isActive()) return;
			this['Class'].btnPlay.textContent = 'Resume';
			if (typeof(gldl.device.game)!='undefined')
				gldl.device.game.pause();
				
			M$['on']("btnQuit");
			M$['on']("btnReset");
			this.toggle('main',true,true);
			this['Class'].appPaused = true;
		},

		/**
		 * Resume the GLDL app
		 * @method resumeGame
		 * @return 
		 */
		resumeGame: function() {
			if (!this.isActive()) return;
			if (typeof(gldl.device.game)!='undefined')
				gldl.device.game.resume();
				
			this.toggle('game',true,true);
			this['Class'].appPaused = false;
		},
			
		/**
		 * Enter into fullscreen mode
		 * @method enableFullscreen
		 * @return 
		 */
		enableFullscreen: function() {
			this['Class'].enableFS();
		},

		/**
		 * Disable or exit fullscreen mode
		 * @method disableFullscreen
		 * @return 
		 */
		disableFullscreen: function() {
			this['Class'].disableFS();
		},
		
		/**
		 * Reset the GLDL app
		 * @method reset
		 * @return 
		 */
		reset: function() {
			if (!this.isActive()) return;
			gldl.device.game.reset();
			jQuery("#btnQuit").hide();
		},
		
		/**
		 * Quit the GLDL app
		 * @method quit
		 * @return 
		 */
		quit: function() {
			if (!this.isActive()) return;
			if (r2wl.launcher.Class.btnPlay) {
				M$['off']("btnQuit");
				M$['off']("btnReset");
				this['Class'].btnPlay.textContent = 'Play';
			}
			
			this.disableFullscreen();
			this['Class'].appRunning = false;
			this['Class'].appPaused = false;
			
			if ((typeof gldl.device != "undefined") && (typeof gldl.device.game != "undefined"))
				delete gldl.device.game;
				
			this.toggle('main',true,true);
		},

		/**
		 * Start the GLDL App
		 * @method play
		 * @return 
		 */
		play: function() {
			//using HTML5 for fullscreen (only newest Chrome + FF)
			if (!this.isActive()) {this.createGame();return;}
			
			if (!this['vld'](gldl.device.game)) return;
			
			if (!this['Class'].appPaused) {
				this.toggle('game',true,true);
						
				this['Class'].canvas.width = screen.width;
				this['Class'].canvas.height = screen.height;
				this['Class'].canvas.style.width = this['Class'].canvas.width+"px";
				this['Class'].canvas.style.height = this['Class'].canvas.height+"px";
				this['Class'].canvas.style.background = "black";
				
				this.enableFullscreen();
				this['Class'].appRunning = false;
			} else {
				this.enableFullscreen();
				this.resumeGame();
			}
		},

		/**
		 * toggle displaying / hiding sections
		 * @method toggle
		 * @param {string} section
		 * @param {boolean} show
		 * @param {boolean} othersOff
		 * @return 
		 */
		toggle:function(section,show,othersOff) {
			section = section.toLowerCase();

			if (othersOff==true) {
				M$['off']("main");
				M$['off']("page_warning");
				M$['off']("page_game");
				M$['off']("page_loader");
			}
			
			switch (section) {
				case 'body':
					if (show) M$['on']("body"); else M$['off']("body");
					break;
					
				case 'main':
					if (show) M$['on']("main"); else M$['off']("main");
					break;
					
				case 'warning':
					if (show) M$['on']("page_warning"); else M$['off']("page_warning");
					break;
					
				case 'game':
					if (show) M$['on']("page_game"); else M$['off']("page_game");
					break;
					
				case 'loader':
					if (show) {
						//M$['on']("page_loader");
						//get("body")[0].style.visibility="hidden";
					} else {
						//get("body")[0].style.visibility="visible";
						//M$['off']("page_loader");
					}
					break;
			}
		},
		/**
		 * Called after document is loaded
		 * @method onLoaded
		 * @return 
		 */
		onLoaded:function() {
			var $l=r2wl.launcher;
			if (GLDL && nldr['config']['modules'].gldl) {
				this['info']('Game Mode Detected...');
				//Load WEBGAME API			
				
			}
			if (this.isActive()) {
				if (!$l.Class.btnPlay) {
					$l.Class.btnPlay = M$['gei']('btnPlay');
					$l.Class.btnPlay.innerHTML = 'Play';
				}
				
				if (!$l.Class.canvas) {
					$l.Class.canvas = M$['gei']("page_game");
					$l.Class.canvas.allowfullscreen = true;
				}
				$l.quit();
				
				window.addEventListener("orientationchange", function() {
					$l.testOrientation();
				}, false);

				// Listen for resize changes
				window.addEventListener("resize", function() {
					$l.testOrientation();		
				}, false);

				$l.testOrientation();
				
				r2wl.redraw();
				//r2wl.test.init();
				
			}
			//Turn off Page_Loader
			$l.toggle("main",true,false);
			//$l.toggle('loader',false,false);
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


/**
 * Internal Google Class - Google Tracking & adSense 
 *
 * @module MWDL
 * @class  Google
 */
/**
 * Short Description
 *
 * @class I$Google
 * @extends I$Interface
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Interface',

	//What is the name of your new interface?
	'I$Google',
	
	/** @lends I$Interface */
	{		
		/** 
		 * This is an API so there can only be one instance.
		 *
		 * @property {number} maxTotalObjects
		 * @expose 
		 */
		maxTotalObjects:0		
	},
	/** @lends I$Interface.prototype */
	{
		/**
		 *
		 * @property String $enabled 
		 * 
		 *  H5C3
		 */
		$enabled:false,
		$loaded:false,
		$analyticsLoaded:false,
		$adSenseLoaded:false,	
		$version:"",	
		$domain: null,
		$gaJsHost: null,
		$resizeTimer:null,
		
		/**
		 * Analytics and AdSense settings from Application Config
		 */
		config:{
			analytics:{
				trackingId:"",
				pageviews:true,
				clicks:true
			},
			ads:{
				clientId:"",
				ads:{}
			}
		},	
		
		/** @expose */
		parent:null,
		
		/**
		 * Initialization
		 *
		 * @constructor
		 */
		init: function(parent,cfg) {
			this['_super']();
			this['parent']=parent;
			this['config']=cfg;
			try {
				var _={};
				if (typeof cfg != "object") {
					return
				} else {
					if (this['config']['analytics']['trackingid']==='') 
						this['warn']('You did not set your Google Unique ID in the config file.');
					this['enabled']=true;
				}
			} catch (e) {
				this['error'](e,_,Array.prototype.slice.call(arguments, 0));
			}
		},
		/**
		 * Main Google Command Function
		 *
		 * @method
		 */
		ga: function(i,s,o,g,r,a,m) {
			if (!this.$analyticsLoaded) return;
			window.ga(i,s,o,g,r,a,m);		
		},	
		
		push: function() {		
			if (this.$adSenseLoaded) {
				var _={};
				this['info']("Google Push.");
				try {
					(adsbygoogle = window.adsbygoogle || []).push({});
				} catch (e) {
					this['error'](e,_,Array.prototype.slice.call(arguments, 0));
				}
			} else {
				ads = $(".adsbygoogle").css('background','#333');
			}
		},
		
		connect: function () {
			if (!this.$analyticsLoaded) return;
				var _={};
			
			try {
				window.ga('_setAccount',this['config']['analytics']['trackingid']); 
				window.ga('_setDomainName',document.location.host);
				window.ga('_addIgnoredOrganic',document.location.host);
				window.ga('_trackPageview');
				
			} catch(e) {
				this['error'](e,_,Array.prototype.slice.call(arguments, 0));
			}
		},
		
		remove:function($fromResize) {
			if (!this.$adSenseLoaded) return;
			var $ads,$slots=gec('adsbygoogle');
			if ($slots.length>0) {
				for (i=0;i<$slots.length-1;i++) {
					$slots[i].style.display='none';
					$slots[i].style.width='initial';
					$slots[i].removeAttribute('data-adsbygoogle-status');
					$slots[i].removeAttribute('data-ad-slot');
					//$slots[i].innerHTML='';
				}
				
				if ($fromResize) setTimeout(this['parent'].google.insert(),1000);
			}
		},
		
		insert:function() {
			getAds=function(config,$theme){
				if (typeof config.ads[$theme]=='object') {
					return $.map(config.ads[$theme], function(value, index) {
						return [value];
					});			
				}
			}

			try {
				//All local variables defined in object _
				var _={ads:0,slots:0,abg:M$.gec('adsbygoogle'),result:false};
				
				//Don't do this anymore
				//var $total,$ads,$slots,$abg=gec('adsbygoogle');
				
				_.slots=(this['vld'](_.abg))?_.abg:[];
				
				if (_.slots.length>0) {
					_.ads=getAds(this.config,this['config']['app']['theme']);
					
					//both of these lines are removed in production
										
					//this line removed in production
					
					for (i=0;i<_.ads.length;i++) {
						_.slots[i].style.display='block';
						M$['esa'](_.slots[i],'data-ad-client',this.config.ads.clientId);
						M$['esa'](_.slots[i],'data-ad-slot',_.ads[i]);
						M$['esa'](_.slots[i],'data-ad-format','auto');
						this.push();
					}
					this.$adSenseLoaded=false;
					_.result=true;
				} 
				//this line removed in production		
				else {
					this['enabled']=false;
				}
			} catch (e) {
				this['error'](e,_,Array.prototype.slice.call(arguments, 0));
				this['enabled']=false;
				_.result=false;
			}
			return _.result;
		},
		
		delay:function() {
			//Disable display any more ads for 30 seconds to protect google interests
			this.$adSenseLoaded=false;
			this.resizeTimer=setTimeout(function(){this['parent'].google.$adSenseLoaded=true;window.clearTimeout(this['parent'].google.resizeTimer)},30000);			
		},
		
		load:function() {
			if (this['enabled']) {
				if (this.config.analytics) {
					this['parent']['addFile']('analytics.js','google','vendor');	
				}	
				if (this.config.ads) {
					this['parent']['addFile']('adsbygoogle.js','google','vendor');
				}
			}
		},
		
		check:function() {
			this.$analyticsLoaded=(M$['gei']('analytics.js')!=null)?true:false;
			this.$adSenseLoaded=(M$['gei']('adsbygoogle.js')!=null)?true:false;
		},
		
		loaded:function() {
			if (this['enabled']) {
				this.check();
				if (this.$analyticsLoaded==true) this.connect();
				if (this.$adSenseLoaded==true) this.insert();
			} 
		},
		
		onResize:function(){
			//Hide ads
			//this.remove(true);
			//wait a short time (after size change) then redisplay ads
			//setTimeout(this['parent'].google.insert(),250);	
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
/**
 * @namespace 
 * @name R2WL
 * @class  Applet
 * @requires maestro.CS2I
 */
 
/**
 * <p>A Applet resource. You can use this class to acquire Applets (loaded from a URI) and then use them in your CloudApp.</p>
 *
 * @class I$Applet
 * @extends I$Pooled
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Pooled',

	//What is the name of your new interface?
	'I$Applet',
	
	/** @lends I$Pooled */
	{		
		/** 
		 * This is an API so there can only be one instance.
		 *
		 * @property {number} maxTotalObjects
		 * @expose 
		 */
		maxTotalObjects:0,
		
		/** 
		 * @property {object} 
		 * @memberof Applet
		 * @todo Move to private
		 */
		params: {
			/** 
			 * @property {array} 
			 * @memberof Applet.params
			 */
			required: ['role','name','version','uuid'],
			/** 
			 * @property {array} 
			 * @memberof Applet.params
			 */
			optional: ['author','copyright','shared','scale']
		},
			
		/**
		 * Constructs an Applet by acquiring it from the object pool. An applet had 4 required attributes
		 * ['role','name','version','uuid'] and 3 optional attributes ['author','copyright','scale'].
		 * 
		 * The name must be unique to your Applet Store. The UUID must be a valid and H5C3 Genuine which matches it
		 * to you, company or personal. It is strongly suggested that you use the version. End Users have the option
		 * of Automatically using the latest Applications and Applets, but that usually means stability issues. Using
		 * the version allows for saftey and less issues.
		 *
		 * @contructor
		 * @param  {string} url url to the applet - http://applets.i2tmlabs.com/ + path/to/applet/applet.someAppletName.html
		 * @returns {df.Applet} A df.Applet if successful, Applet Name if failed.
		 * @memberof Applet
		 */
		create: function($data,$active)
		{
			var n = this['_super']();
			if (n.parse(data,$active))
				return n
			else
				return n.name;
		}	
	},
	/** @lends I$Pooled.prototype */
	{
		State:{ QUEUED:0, LOADING:1, READY:2, ACTIVE:3, FAILED:4 },

		/** 
		 * @property {object} Header
		 * @memberof Applet
		 */
		header: {
			/** 
			 * @property {string} Applets Role 
			 * @memberof Applet.header
			 */
			role:		"applet",

			/** 
			 * @property {string} Applets Name 
			 * @memberof Applet.header
			 */
			name:		"default", 

			/** 
			 * @property {string} Applets version 
			 * @memberof Applet.header
			 */
			version:	"0.0.0", 

			/** 
			 * @property {string} Short Description
			 * @memberof Applet.header
			 */
			description:"",
					
			/** 
			 * @property {string} Applets Universally unique identifier 
			 * @memberof Applet.header
			 */
			uuid:		"XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",

			/** 
			 * @property {string} Name of Registered Publisher
			 * @memberof Applet.header
			 */
			publisher:		"",

			/** 
			 * @property {string} Applets Author 
			 * @memberof Applet.header
			 */
			author:		"", 

			/** 
			 * @property {string} Applets Copyright 
			 * @memberof Applet.header
			 */
			copyright:	"2014 by {YOU} - All rights reserved.",

			/** 
			* @property {string} the Applets stylesheet-will be added/removed to head automatically 
			* @memberof Applet
			*/
			style:		"",

			/** 
			* @property {string} the Applets javascript-will be added/removed to head automatically 
			* @memberof Applet
			*/
			script:		"",

			/** 
			 * @property {string} the Applets html- place as variable {$applet:someAppletName} 
			 * @memberof Applet
			 */
			html:		"",
			
			/** 
			 * @callback {method} Define in applet JS to execute code when applet 
			 * is loaded but not yet displayed.
			 * @memberof Applet
			 */
			onload:null,

			/** 
			 * @callback {method} Define in applet JS to execute code when applet 
			 * is loaded but not yet displayed.
			 * @memberof Applet
			 */
			onunload:null
		},

		uri:		'',
		
		id:			"{AUTOSET}",		//role + . + name
			
		/** 
		 * @property {number} Current state of this applet
		 * @memberof Applet
		 */
		state: -1,
		
		
		/**
		 * Constructs a new Applet. If the loader has already started then the image will be
		 * immediately loaded, otherwise it will wait for the resource loader to handle the loading.
		 * @instance
		 * @param  String name Name to give the image resource
		 * @param  String src URI for the image
		 * @memberof Applet
		 */
		init:function ($data)
		{
			this['_super']();
			$data=$data[0];
			try {
				//IMPORTANT! if creating this applet fails, you must delete it
				if (this.makeURI($data)) {
					this.setState(0);
				}
			} catch (e) {
				var _={};
				this['error'](e,_,Array.prototype.slice.call(arguments, 0));			}
			},

		setState:function(state){
			if (state<0||state>4) {
				this['warn']('Invalid State [QUEUED:0, LOADING:1, READY:2, FAILED:3]');
			} else {
				if (this.state!=state) {
					this.state=state;
					switch (this.state) {
						case this['State']['QUEUED']:
							break;
						case this['State']['LOADING']:
							this.fetch();
							break;
						case this['State']['READY']:
							this.embed();
							break;
						case this['State']['ACTIVE']:
							break;
						case this['State']['FAILED']:
							break;
					}
				}
			}
		},
			
		makeURI:function($data) {
			var _={path:null,fileName:null,ext:null};
			
			try {
				
				//Prepare basic header
				this['header']['name']=(this['vld']($data['dataset']['applet']))?$data['dataset']['applet']:false;
				this['header']['role']=(this['vld']($data['dataset']['role']))?$data['dataset']['role']:'content';
				this['header']['local']=(!this['vld']($data['dataset']['local'])||$data['dataset']['local']=='no')?false:true;
				this['header']['publisher']=(this['vld']($data['dataset']['publisher']))?$data['dataset']['publisher']:'';
				//=-=|if no publisher force local|=-=//
				this['header']['local']=(this['header']['publisher']=='')?1:0;
				this['id']=this['header']['name'];
				if (!this['header']['name']||!this['header']['role']) {
					this['setState'](this['state']['FAILED']);
					return false;
				}
				
				//_.ext=($m.devMode)?'.html':'.nfw';
				_.ext='.html';
				_.fileName='applet'+'.'+this['header']['name']+_.ext;

				//Prepare the URI
				if (!this['vld'](_.path=nldr['getPath']('applets','publisher'))){
					this['warn']('Publisher path not found.');
					return false
				}
				this.uri=_.path+_.fileName;
				// } else {
					// if (!this['vld'](_.path=nldr['getPath']('publisher',this['header'].publisher))){
						// this['warn']('Publisher path not found.');
						// return false
					// }
					// this.uri=_.path+'applets/'+_.fileName;
				// }
				
				
				return true;
			} catch (e) {	
				this['error'](e,_,Array.prototype.slice.call(arguments, 0));			}
				return false;
			},
		
		pack:function(){
			getFunc=function($func){
				$func = $func.toString(); 
				var body = $func.slice($func.indexOf("{") + 1, $func.lastIndexOf("}"));
				return body;
			}
			
			var _={
					obj:null,hdr:null};
				
			_.obj=this['header'];
			_.hdr=(_.obj.role==='applet')?'~A|':'~L|';
			
			try {
				_.obj = JSON.stringify(this['header']);
				_.obj = $m.pf.lzw.enc(_.obj);
				_.obj = _.hdr+_.obj;
				console.log(_obj.name+'->'+_.obj);
				return _.obj;		
			} catch (e) {
				this['error'](e,_,Array.prototype.slice.call(arguments, 0));
			}
			
			return false;
		},
		
		unpack:function($data){
			setFunc=function($func,$body) {
				this[$func]=$body;
			}
			
			var _={obj:null,hdr:''};
			
			try {
				_.hdr=$data.substring(0,3);
				if (_.hdr=='~A|' || _.hdr=='~L|') {
					_.obj=$data.substring(3,$data.length);
					_.obj=$m.pf.lzw.dec(_.obj);
					this['header']=JSON.parse(_.obj);
					if (_.obj['publisher']&&_.obj['name']&&_.obj['role']&&_.obj['local']) {
						//Insert Functions
						
						return _.obj;
					} else
						this['warn']('Valid object with invalid properies. Discarding.');					
				} else {
					this['warn']('Not a valid compiled Applet or Layout data.');
				}
			} catch (e) {
				this['error'](e,_,Array.prototype.slice.call(arguments, 0));
			}		
			return false;
		},
		
		/**
		 * Insert an applet into the DOM
		 *
		 * @param  {String} $html	HTML Content
		 * @param  {String} $into	ID of Element to insert into
		 * @memberof Applet
		 * @todo insert applet style and javascript
		 */
		embed:function () {
			if (this.onShow) this.onShow();
			if (this['header'].script && this['header'].script.text.length>0) 
				M$['gei']("tail").appendChild(this['header'].script);
				
			if (this['header'].style && this['header'].style.textContent.length>0) 
				M$['get']("head")[0].appendChild(this['header'].style);

			var tmp = $("div[data-applet='"+this['header'].name+"']").append(this['header'].html);
			tmp[0].id=this.id;
			//this.setDraggable();
			this.setState(3);
		},

		/**
		 * Remove an applet from the DOM
		 * @returns	none
		 * @memberof Applet
		 * @todo Dont forget to remove the style and script!!!
		 */
		unbed:function () {
			if (!this.active) return;
			this.onUnloaded();
			this.active = false;
			if (this.onHide) this.onHide();
			$a=M$['get']('head')[0];
			$a.removeChild(this['header'].name+"_script");
			$a.removeChild(this['header'].name+"_style");
		},
			
		fetch:function(){
			var _={msg:null,fromLocal:false,applet:null};
			try {
				_.msg = "Received request for: "+this['header'].name+'... ';
				_.applet = r2wl['local']['getAppFile'](this['header'].name);
				if (this['vld'](_.applet)) {
					_.msg += "Found in local Storage.";
					this.onLoad(_.applet);
					_.fromlocal=true;
				}
				
				if (!_.fromLocal) {
					//See if the applet we want is in history (cached)
					//var tmp = this['Class']._history[$data.name];
					
					//if (typeof tmp != 'undefined') {
					//	this._tracker.fromCache++;
					//	_.msg += "Found in cache. ";
					//	if (this['vld'](tmp.div)) this.onLoad(tmp.div);
					//	this.checkQue();
					//	return true;
					//} else if (!$fromlocal) {
					//	$msg += "Not cached. ";
				//	}
				}
				//No, We'll have to load it with Ajax				
				try {
					_.msg += "Requesting from via AJAX.";
					M$.xhr(
						this.uri,
						this._onLoad.bind(this),
						this._onError.bind(this),
						'get',
						null,
						false
					)
				} catch (e) { 
					this['error'](e,_,Array.prototype.slice.call(arguments, 0));
				}

			} catch (e) {
				this['error'](e,_,Array.prototype.slice.call(arguments, 0));
			}
		},
			
		setDraggable:function() {
			$(function() {
				$('#wrapper').on('mousedown', 'div', function() {
					if(this.draggable===true) {
						$(this).addClass('draggable');
						$(this).addClass('dragging').parents().on('mousemove', function(e) {
							$('.dragging').offset({
								top: e.pageY - $('.dragging').outerHeight() / 2,
								left: e.pageX - $('.dragging').outerWidth() / 2
							}).on('mouseup', function() {
								$(this).removeClass('dragging');
							});
							if (typeof e != 'undefined') e.preventDefault();
						});
					} else {
						$('.draggable').removeClass('draggable');
						$(this).removeClass('dragging');
					}
				}).on('mouseup', function() {
					$('.draggable').removeClass('draggable');
				});
			});
		},
		
		htmlToApplet:function($html){
			var _={div:null};
			try {
				_.div = window.document.createElement('div');
				_.div.innerHTML=$html;
				//Ok we have a Applet DOM Ready
				//Lets return to the factory and add it to our Applet
				return _.div.firstChild;
				
			} catch (e) {
				this['error'](e,_,Array.prototype.slice.call(arguments, 0));
			}
		},
		
		/**
		 * Called after applet is loaded (cache, Remote or Storage)
		 * 
		 * @memberof Applet
		 */
		onLoaded:function(){
			this.loaded = true;
			$evt=this['header'].name+"_onload";
			if (typeof window.$evt === 'function') {
				window.$evt();
			}
		},	

		/**
		 * Called after applet is loaded (cache, Remote or Storage)
		 * 
		 * @memberof Applet
		 */
		onUnLoaded:function(){
			this.unload = true;
			$evt=this['header'].name+"_onload";
			if (typeof window.$evt === 'function') {
				window.$evt();
			}
		},
		
		_onLoad:function($data) {
			if (!this['vld']($data)) {
				return false
			}
			
			$data = this.htmlToApplet($data);
			if ($data.tagName=='DIV' && $data['dataset']['name']) {
				//Its a valid DOM Ready Applet, add it to the Mother Applet
				(function(a,d){
					a.onLoaded();
					for (var i=0;i<3;i++) {
						if (d.children[i].tagName=='STYLE') {
							a.header.style=d.children[0];
							a.header.style.id=a.id+"_style";
						} else if (d.children[i].tagName=='SCRIPT') {
							a.header.script=d.children[1];
							a.header.script.id=a.id+"_script";
						} else if (d.children[i].tagName=='DIV')
							a.header.html=d.children[2].innerHTML;						
					}
					for (var property in d.dataset) {
						a.header[property]=d.dataset[property];
					}				
					//a.header.onload=this.onLoaded();
					//a.header.onunload=this.onUnLoaded();
					
					//var b = a.pack();
					//var c = a.unpack(b);
					a.setState(2);
					r2wl.applets.scan($data.innerHTML,false);
					
				})(r2wl.applets.objects[$data['dataset']['name']],$data);			
				
			}
			
			//var level1 = r2wl.applets.getApplets($data.innerHTML,false);
			//for (var i=0;i<level1.length;i++){
			//	this.create(level1[i]);
			//}
			
			//r2wl.applets.scanAnchors($data.innerHTML);
			//Default Applet is now loaded, display it.

			//return $result;
		},
			
		_onError:function(data) {
			this['warn']('Error loading applet resource.');
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
/**
 * For creating entities (mostly just an interface class you extend from to create an entity factory).
 * No need to create an instance yourself...it is created automatically by Game::onReady()
 * entityFactory = new AppletFactory();
 *
 * @class I$AppletFactory
 * @extends I$Factory
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Factory',

	//What is the name of your new interface?
	'I$AppletFactory',
	
	/** @lends I$Factory */
	{		
		/** 
		 * This is an API so there can only be one instance.
		 *
		 * @property {number} maxTotalObjects
		 * @expose 
		 */
		maxTotalObjects:0,
		
		//Private array that stores elements name if it was scanned for links
		_scanned: [],

		//Private array that stores applets name and attributes if it is currently active
		_active: [],
		
		//Private array that stores a history of applets to keep form reloading. Page Reload wipes this
		_history: [],
		
		//Private array that stores elements name if it is waiting to be loaded 
		_loadQue: []
	},
	/** @lends I$Factory.prototype */
	{

		started: false,
		
		finished: false,
		
		_tracker: {
			failed: 0,
			loading: 0,
			loaded: 0,
			fromConn: 0,
			fromCache: 0,
			loops: 0,
			indexed:false
		},
			
		/**
		 * Initialization Method
		 */	
		init:function() 
		{
			this['_super']('Applet');
		},
			
		/**
		 * Called by the entity loader
		 *
		 * @param  {Object}		$data String type of the entity to create
		 * {Layer} layer Layer the entity should be placed on
		 * @return {Applet}
		 */
		create:function ($data)
		{		

			var _={obj:null,attr:[]};
			try {		
				_.obj=create('I$Applet',[$data]);
				//($data);
				//if (this['Class']._scanned[_.obj.name]){
				if (_.obj['state']===4){
					delete(_.obj);
				} else if (_.obj.state===0) {
					this.add(_.obj.id,_.obj);
					_.obj.setState(1); //changed to queued
				}
			} catch (e) {
				this['error'](e,_,Array.prototype.slice.call(arguments, 0));
			}	
		},
		
		add:function($name,$obj) {
			this['_super']($name,$obj);
			this['Class']._scanned.push($name);
		},
		
		reset:function() {
			this['Class']._loadQue	= [];
			this._tracker	= {failed:0, loading: 0,loaded: 0,fromConn: 0,fromCache: 0,loops: 0};
		},

		stop:function() {
			//pld();
			this.started	= false;
			this.finished	= true;
			this.reset();
		},
		
		//Start loading all applets in our que
		start:function() {
			if (this.started) return;
			this.started = true;
			this.finished = false;
			r2wl.ready = false;
		},
		
		scan:function($html) {
			//Get layouts document
			var level1 = this.getApplets($html,false);
			for (var i=0;i<level1.length;i++){
				div_i=level1[i];
				this.create(level1[i]);
				// var level2 = this.getApplets(level1[i].innerHTML,false);
				// for (var j=0;j<level2.length;j++){
					// div_j=level2[j];
					// this.create(level2[j]);
					// var level3 = this.getApplets(level2[j].innerHTML,false);
					// for (var k=0;k<level3.length;k++){
						// div_k=level3[k];
						// this.create(level3[k]);
					// }
				// }
			}
			//this.requestApplet({name:nldr['config']['app'].layout});		
		},
				
		/**
		 * @method onHREFClick()
		 *
		 * Any Cloud Application links are captured and handled here. It tells the asks to use the
		 * applet detected in onClick event. The applet is aquired from cache or network and then
		 * is scanHTMLned or other applets via static include or links and added to the load que.
		 * 
		 * @param
		 * EVENT	e		onClick event
		 *
		 * @return 
		 * 	None
		 */	
		onHREFClick:function($evt) {
			try {
				r2wl.applets.setpage(this.name);
			} catch (e) {
				ast(null,e.stack);
			}
		},

		onHREFHover:function($evt) {},
		
		/**
		 * @method isActive
		 *
		 * Will return true if the given applet is currently active (should be embeded( otherwise false.
		 * 
		 * @param	{string}	$applet
		 * @return {boolean}
		 * @memberof AppletFactory
		 */	
		isActive:function($applet){
			return (typeof this['Class']._active[$applet] == "object")?true:false;
		},
		
		setpage:function($applet_name) {
			if ($applet_name==="") return;
			try {
				var $applet = r2wl.applets.use({name:$applet_name}), $tmp;
				if (!$applet) return;
					var $DIVs = this.getApplets("self");
					
					for (i=0;i<$DIVs.length;i++) {
						var $name=$($DIVs[i]).attr('data-applet');
						$tmp = r2wl.applets.use({name:$name});
						var tmp = $("div[data-applet='"+this['header'].name+"']").append($html);		
					}
							
				if (nldr['config']['options'].crossfade) {
					if ($("#main").css("opacity")!="0") {
						this.lastContent = M$['gei']("main").innerHTML;
						$("#main").fadeOut(250, function() {
							M$['gei']("main").innerHTML =  $applet.html;
							$("#main").fadeIn(250,"linear");				
						});				
					}
				} else {
					this.lastContent = M$['gei']("main").innerHTML;
					M$['gei']("main").innerHTML =  $applet.html;
				}
				//save current app & page to localstorage for resume
				r2wl['local'].setAppCfg('currentPage',$applet.name);
			} catch (e) {
				ast(null,e.stack);
			}		
		},
		
		/**
		 * @method scanAnchors()
		 *
		 * Scans HTML document (CloudApp) or Loaded Applets for link to other applets and adds them to laod que
		 * 
		 * @param	HTML		$html		optional html (applet) to search for other applets (nested)
		 *
		 * @return 	ARRAY 		All Applets detected in $HTML or BODY if no parameter
		 */	
		scanAnchors:function($html) {
			var _={};
			try {
				var $msg="Scanning ",$elName,total=0,cached=0,load=0;
				if (this['vld']($html)) { $html = $($html); } else { $html = $("body"); }

				if ($html[0].id!="") {
					//Its in history..then we already scanned it.
					$elName=$html[0].id; 
					
					if (this['Class']._scanned.indexOf($elName) != -1) return true;
				} else {
					$elName=$html[0].nodeName;
				}
				
				$msg+=$elName+' for Links...';
				var links = get('a'),$shared=false;
				for (i = 0; i < links.length; i++) {
					//Possible Applet Link?
					if (links[i].hash!="") {
						var n=links[i].hash.split(".");
						if (n[0]=='#applet') {
							if (n[1]!="") {
								//Yep, its a applet link, add handler and pre-cache it
								links[i].addEventListener('click', this.onHREFClick, false);
								links[i].addEventListener('hover', this.onHREFHover, false);
								if (this['Class']._scanned.indexOf(n[1]) === -1) {
									$shared = (links[i].dataset.shared!="") ? true : false;	
									this['Class']._loadQue.push({name:n[1],shared:$shared});
									this['Class']._scanned.push(n[1]);
									load++;
								} else {
									cached++;
								}
									
								links[i].name=n[1];
								
								total++;
							}
						}
					}
					
				}
				return total;

			} catch (e) {
				this['error'](e,_,Array.prototype.slice.call(arguments, 0));
			}	
		},
		
		
		/**
		 * Scans the HTML of an applet for more embedded applets
		 * @param  {String} $html	HTMl Content
		 * @returns	{Array}	array of all applets found (divs)
		 * @memberof Applet
		 */
		getApplets:function($html,$layout) {
			var _={role:null,roleName:null};

			try {
				var $self=false;
				
				_.role=($layout==true||$layout==false)?$layout:false;
				_.roleName=($layout==true)?'layout':'applet';
				
				if ($html==="self") {
					$html = this.$html
					$self=true;
				} else if (this['vld']($html)) { 
					$html = $($html); 
				} else { 
					$html = $("body"); 
				}
				if (!this['vld']($html)) return 0;
				
				//Ok we found all applets (if any)
				var $DIVs = $($html).find("div").filter(function(data) {
					return $(this).data(_.roleName) !== undefined;
				});
				
				if ($self && $DIVs.length>0) this.hasChildren=true;
				return $DIVs
			} catch (e) {
				this['error'](e,_,Array.prototype.slice.call(arguments, 0));
			}
			return [];
		},

		/**
		 * @method findApplets
		 *
		 * Scans HTML document (CloudApp) for all elements with a [data-applet] tag
		 * and saves them in the HashTable This does not scanHTML a applet for data-tags -
		 * that is handled by the Applet class.
		 * - Scan BODY and add to que - for each applet found:
		 * - scan Applet HTML and add to que
		 * - Scan Applet for Links to Other applets add to que
		 * - make sure que is unique applets
		 * - find MAIN applet and push load que
		 * - find ACTIVE applets and push to load que
		 * - 
		 * @param 	HTML	$html	optional html (applet) to search for other applets (nested)
		 * @return  ARRAY	All Applets detected in $HTML or BODY if no parameter
		 */	
		findApplets:function($html,$setActive) {
			
			//Get Data attributes
			getAttributes=function($self,$where,$id,$active) {
				var _={};
				try {
					var $attr,$foo,$data={};
					$el=M$['gei']($id);
					$attr=M$.gda($id,1); 
					$foo=$($where).find($id);
					if ($attr!=false && $attr.applet!='') {
						$data.name=$id;
						$data.target= (typeof $attr.target==M$.db[0][7])?$html.parentElement:$attr.target;
						if ($data.target==null) $data.target="body";
						$data.shared= (typeof $attr.shared==M$.db[0][7])?'publisher':'shared';
						$data.active= $active;
						$data.path=	nldr['getPath']('applets',$data.shared);
						$self.Class._loadQue.push($data);
						return $data;
					}
				} catch (e) {
				this['error'](e,_,Array.prototype.slice.call(arguments, 0));
				}
			}
			
			var _={};
			try {
				var DIVs,$attr,$data,$shared=false;
				$html=(!this['vld']($html))?$html=get("body")[0]:$html=$($html)[0];
				
				//if we are scanning the body then set all applets to active
				$setActive=(typeof $setActive===M$.db[0][7])?0:1;	
				
				//Set this applets data
				//$data=($html.tagName=="BODY")?null:getAttributes(this,$html,$html.id,$setActive);
				
				//Scan this applet for applets
				DIVs = this.getApplets($html);
				
				//Process any applets we found
				for (i=0;i<DIVs.length;i++) {
					//no id? add it
					if (DIVs[i].id==="") DIVs[i].id=DIVs[i].dataset.applet;
					$data=getAttributes(this,$html,DIVs[i].id,$setActive);	
					this['Class']._active[DIVs[i].dataset.applet] = $data;			
					DIVs[i].style.display = ($setActive) ? 'block' : 'none';
				}
				
				//How many Applets from Static Includes? (In Page)
				this._tracker.loading = this['Class']._loadQue.length;
				

			} catch (e) {
				this['error'](e,_,Array.prototype.slice.call(arguments, 0));
			}
			
		},
		
		checkQue:function() {
			//Are there applets in the que? if so start the loader.
			if (this['Class']._loadQue.length>0&&this.started==false) this.start();
			
			if (this['Class']._loadQue.length<=0) {
				//auto resume
				var $resume = r2wl['local'].getAppCfg('currentPage');
				if (this['vld']($resume)) 
					this.setpage($resume);
				else
					this.setpage(nldr['config']['app'].applet);
				
				return true;
			}
			//No Duplicates		
			if (this['Class']._loadQue.length>2) {
				var $uniqueQue = this['Class']._loadQue.filter(
					function(elem, pos) {
						return r2wl.applets.Class._loadQue.indexOf(elem) == pos;
					});	
				this['Class']._loadQue = $uniqueQue;
			}

			this._tracker.loading=this['Class']._loadQue.length;
			//load one from que.
			this.requestApplet(this['Class']._loadQue.shift());
			this._checkAllDone();
		},
		
		/**
		 * Request an applet. Verified good request data, then tries to load it from device storage.
		 * If not is storage it will check current memory (history) and load it.
		 * If all else fails it is obtained from server via AJAX request.
		 *
		 * @method requestApplet()
		 * 
		 * @param {mixed} $data
		 * @return none
		 */		
		requestApplet:function($data) {
			var _={};
			try {
				if (!this['vld']($data)||(typeof $data.target==M$.db[0][7])) return false;
				
				var $msg = "Received request for: "+$data.name+'... ';
				var $fromlocal=false;
				var $applet = r2wl['local'].getAppFile($data.name);
				if (this['vld']($applet)) {
					$msg += "Found in local Storage.";
					this.onLoad($applet);
					$fromlocal=true;
				}
				
				//See if the applet we want is in history (cached)
				var tmp = this['Class']._history[$data.name];
				
				if (typeof tmp != 'undefined') {
					this._tracker.fromCache++;
					$msg += "Found in cache. ";
					if (this['vld'](tmp.div)) this.onLoad(tmp.div);
					this.checkQue();
					return true;
				} else if (!$fromlocal) {
					$msg += "Not cached. ";
				}

				//No, We'll have to load it with Ajax
				if ($data.name=="") return false;
				this['Class']._history[$data.name] = {
					name:$data.name,
					src:nldr['getPath']('applets',$data.shared)+'applet.'+$data.name+'.html',
					div:$data.div
				};
				if (!$fromlocal) {
					try {
						$msg += "Requesting from via AJAX.";
						M$.xhr(this['Class']._history[$data.name].src,bnd(this,this.onLoad),bnd(this,this.onError),'get',null,false);//works
					} catch (e) { 
						ast(e.stack);
					}
				}

			} catch (e) {
				this['error'](e,_,Array.prototype.slice.call(arguments, 0));
			}
		},

		_checkAllDone:function() {		
			if (this['Class']._loadQue.length<=0) {
				//All Applets have been loaded
				this.stop();			
				r2wl.ready = true;
				return true;
			} else {
				this.checkQue();
				this._tracker.loops++;
				if (this._tracker.loops > this._tracker.loading) {
					return true;
				}
				return false;
			}	
		},
		
		onLoad:function($data) {
			this._checkAllDone();
			if (!this['vld']($data)) {
				this['error']('No data return from Ajax Request.');
				return false;
			}
			var $fromlocal;
			var a = ISA($data);
			if (ISA($data) ==="Object:Simple") {
				//we got it from localstorage already created.
				$fromlocal = true;
				var $obj = Applet.create($data,this['Class']._active);
				$result = r2wl.applets.add($obj.header.name,$obj)
			} else {
				//Create an applet loaded from net
				$fromlocal = false;
				var $toObj=$($data);
				var $obj = Applet.create($data,this.isActive($toObj[0].dataset.name));
			}
						
			this._tracker.loaded++;
			this._tracker.loading--;
			
			if (typeof $obj === "object") {
				if (!$fromlocal) 
					//r2wl['local'].setAppFile($obj.header.name,$obj);
					$obj=$obj;
				else 
					if ($obj.header.name in this['Class']._history && (typeof this['Class']._history[$obj.header.name].src !== 'undefined')) 
						$obj.src = this['Class']._history[$obj.header.name].src;
					
				this._tracker.fromConn++;
				this.scan($obj.html);		
				this.scanAnchors($obj.html)
				$result = r2wl.applets.add($obj.header.name,$obj);
				//TODO: Fix Applet Events
				//if ($result.onLoaded) $result.onLoaded();

				//Default Applet is now loaded, display it.
				if ($obj.header.name==nldr['config']['app'].applet) 
					r2wl.applets.setpage($obj.header.name);
			} else {
				//Remove Applet we just created. Remove from History as well. Display message
				this._tracker.failed++;
				delete this['Class']._history[$obj];
				this.remove($obj);
				this['warn'](("Unable to identify applet, discarding. [").toString($data)+"]");
				$result = false;
			}

			return $result;
		},
			
		onError:function(data) {
			return null	
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
/**
 * Short Description
 *
 * @class I$ConfigManager
 * @extends I$Interface
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Interface',

	//What is the name of your new interface?
	'I$ConfigManager',
		
	/** @lends I$Interface */
	{		
		/** 
		 * This is an API so there can only be one instance.
		 *
		 * @property {number} maxTotalObjects
		 * @expose 
		 */
		maxTotalObjects:1,		
		/** 
		 * Set to true by system after members are exposed. This is read only.
		 * 
		 * @property {boolean} exposed
		 * @expose 
		 */
		exposed:false,

		path: {
			//Landing Page - Primary location
			app: 		window.location.protocol + "//" + window.location.host + window.location.pathname.split("/").slice(0, -1).join("/") + "/",
			shared:		'/content/shared/',			//'http://cdn.i2tmlabs.com/content/shared/',
			
			//Publisher if for registered developers and sharing
			publisher:	'/content/',				//http://cdn.i2tmlabs.com/content/{PUBLISHER NAME FROM JSON}/',
			
			//Vendor is for approved Nano FW 3rd party libraries
			vendor:		'/vendor/'					//'http://cdn.i2tmlabs.com/vendor/',
			
		},
		
		/**
		 * @property {boolean}		ready  [true|false]
		 * 
		 * True 	- Everything was fine, 
		 * False 	- “Danger, Will Robinson!” The universe could be destroyed without proper configuration.
		 */
		ready: false,

		/**
		 * @property {boolean}		filesLoaded  [true|false]
		 * 
		 * True 	- Everything was fine, 
		 * False 	- “Danger, Will Robinson!” The universe could be destroyed without proper configuration.
		 */
		filesLoaded: false,
		
		/**
		 * @property {boolean}		filesLoaded  [true|false]
		 * 
		 * True 	- Everything was fine, 
		 * False 	- “Danger, Will Robinson!” The universe could be destroyed without proper configuration.
		 */
		configLoaded: false,

		_onSuccessCallback:null,
		_onFailedCallback:null,
		
		/**
		 * Return a string name for this interface class
		 *
		 * @method toString
		 * @expose 
		 * @this {I$Interface}
		 * @returns {string}
		 */
		toString:function (){return 'I$ConfigManager Class';}
	},
	/** @lends I$Interface.prototype */
	{
		
		/**
		 * Configuration Settings
		 *
		 * @property config
		 * @expose
		 */
		config:null,
		
		/**
		 * Populated by parseConfigFiles(). The cloud app will push these into the load que.
		 *
		 * @property filesNeeded
		 * @expose
		 */
		filesNeeded:null,
		
		/**
		 * Interface Initialization method
		 * @constructor init
		 * @expose
		 */
		init:function (onSuccess,onFailed)
		{
			this['_super']();
			this['_onSuccessCallback']=onSuccess;
			this['_onFailedCallback']=onFailed;			
		},
		/**
		 * Prepare the interfaces object before init is called. Excellent place
		 * to do property and method export and other preparations before init()
		 * is called.
		 * @method setup
		 * @expose
		 */
		setup:function(){
			this['_super']();	
			this['config']=M$['config'];
		},
		/**
		 * This is triggered by the core after this interface is completely
		 * initialized.
		 *
		 * @event I$ConfigManager#onReady
		 * @expose
		 */
		onReady:function(){
			if (!this['config']) {
				M$.xhr(
					this['getPath'](null,'app')+'index.json',
					this._onConfigSuccess.bind(this),
					this._onConfigFailed.bind(this),
					'get',
					null,
					false
				)
			} else {
				this._onConfigSuccess(null);
			}		
		},
		
		/**
		 * Use to obtain a path to a resource
		 * @method getPath
		 * @param {string} $entity	
		 * @param {boolean} $app		use cloudapp resources or shared resources	
		 * @expose
		 * @return 
		 */
		getPath:function($what,$where,$appFolder) {
			function textize(s){
				return s.replace(/([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\/? ])+/g, '-').replace(/^(-)+|(-)+$/g,'');
			}
			
			var $base=window.location.protocol+M$['db'][2][0];
			
			$appFolder=$appFolder||false;
			
			$where=$where||'nanofw';
				
			//WHERE? APP or CDN?
			switch ($where.toLowerCase()) {
				// i2tm Labs CDN						http://cdn.i2tmlabs.com/
				case 	'home': 	return $base; break;
				// App Folder							http://apps.i2tmlabs.com/{PUBLISHER}/{APPNAME}/
				case 	'app': 		return this['Class']['path']['app']; break;	
				//nano Vendor Location (3rd libraries)	home+vendor/
				case 	'vendor': 	$base+=this['Class']['path']['vendor']; break;		
				
				//nano Public Shared Folder				home+vendor/i2tm/
				case 	'shared': 	$base+=this['Class']['path']['shared']; break;		
				//Publisher Assets Folder				home+content/{PUBLISHER}/assets/
				case 	'publisher':$base+='/content/'+textize(this['config']['app']['publisher'])+'/assets/';break;
			}
			
			$what=$what||'applets';
			
			//WHAT?
			switch ($what.toLowerCase()) {
				case 	'layouts':	$base+='layouts/'; break;		//Layouts folder
				case 	'applets':	$base+='applets/'; break;		//Applets	
				case 	'scripts':	$base+='js/'; break;			//JavaScripts folder
				case 	'styles':	$base+='css/'; break;			//Stylesheets folder
				case 	'images':	$base+='img/'; break;			//images folder
				case 	'sounds':	$base+='snd/'; break;			//sounds folder
				case 	'libraries':$base+='lib/'; break;			//plugins folder
			}
			
			//Publisher?
			if ($where=='publisher'&&$appFolder==true&&$what) $base+=textize(this['config']['app']['name'])+'/';
			
			return $base;			
		},
		
		/** @expose */
		parseConfigFiles:function(){			
			var $where=['publisher','shared','vendor'],
				$what=['styles','scripts','applets','libraries'],
				$files=[],tmp,$w,$e
				self=this,
				$res=this['config']['files'];

				
			try {
				this['filesNeeded']=[];
				
				$what.forEach(function($w){
					if (typeof $res[$w]!="undefined") {
						$where.forEach(function($e){
							tmp=$res[$w][$e];
							if (typeof tmp==="string"&&tmp.length>0) {
								tmp=$res[$w][$e].split(",");
								if (typeof tmp==="object"&&tmp.length>0) {
									$files=$res[$w][$e].split(",");	
									for (i=0;i<$files.length;i++)
										self['filesNeeded'].push(self['getPath']($w,$e)+$files[i]);
								}	
							}
						});			
					}
				});				
			} catch (e) {
				this['error'](e,_,Array.prototype.slice.call(arguments, 0));
				return false;
			}
			return true;
		},
		
		//We have a config file, run cloudapp mode
		/** @expose */
		_onConfigSuccess:function($req){
			if (!this['config']) this['config'] = JSON.parse($req);
			this['Class']['configLoaded']=true;
			
			try {
				if (this['parseConfigFiles'](this))
					this['Class']['filesLoaded']=true;
					
			} catch (e) {
				this['error'](e,_,Array.prototype.slice.call(arguments, 0));
				return false;
			}
					
			//Set Application title
			this['Class']['ready']=(this['Class']['configLoaded']==true&&this['Class']['filesLoaded']==true);
			if (this['_onSuccessCallback']) this['_onSuccessCallback'](this['filesNeeded']);
		},
		
		//no config file, run normal webpage mode
		/** @expose */
		_onConfigFailed:function() {
			this['Class']['ready']==false
			if(this['_onFailedCallback']) this['_onFailedCallback']([]);
		},

		/** @expose */
		get:function get(what) {
			what=what||false;
			if (what) {
				what=what.split('.');
				if (what.length>0) {
					// switch (what.length) {
						// 1:	if (this['config'].what[0]) return this['config'].what[0]; break;
						// 2:	if (this['config'].what[0].what[1]) return this['config'].what[0].what[1]; break;
						// 3:	if (this['config'].what[0].what[1].what[2]) return this['config'].what[0].what[2]; break;
						// 4:	if (this['config'].what[0].what[1].what[2].what[3]) return this['config'].what[0].what[2].what[3]; break;
					// }
				}
			} 
		},

		set:function set(what,value){
		
		},

		/**
		 * Return a string name for this interface prototype
		 *
		 * @method toString
		 * @expose 
		 * @this {I$Interface}
		 * @returns {string}
		 */
		toString:function ()
		{
			return (this['Class']===undefined)?
				'I$ConfigManager':
				this['Class']['fullName'] + ' [id: ' + (this['objectId']||0) + ']';
				
		}
	},
	//=-=|Optional|=-=//
	{
		/** @augments I$ConfigManager */
		/*
		someInterfaceName:I$SomeInterface,
		...
		someInterfaceName:I$SomeInterface
		*/
	},
	//=-=|Optional|=-=//
	[
		/** @export Member */
		/*
		someMethod:I$InterfaceMethod,
		...
		someMethod:I$InterfaceMethod
		*/
	]
);

/**
 * Short Description
 *
 * @class I$CloudApplication
 * @extends I$Alias
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Alias',

	//What is the name of your new interface?
	'I$CloudApplication',
	
	/** @lends I$Alias */
	{		
		/** 
		 * This is an API so there can only be one instance.
		 *
		 * @property {number} maxTotalObjects
		 * @expose 
		 */
		maxTotalObjects:1,		
		/** 
		 * Set to true by system after members are exposed. This is read only.
		 * 
		 * @property {boolean} exposed
		 * @expose 
		 */
		exposed:false,
	
		/**
		 * Turns off fie Caching
		 * @property {string} 
		 * @private
		 * @noexpose
		 */
		noCacheString: '',
	
		/** @expose */
		predefined:["{!DATE}","{!TIME}","{!DATETIME}","{!APPNAME}",
			"{!APPVERSION}","{!COPYRIGHT}","{!AUTHOR}",
			"{!APPLET|[name,loc[local|nanofw|vendor|publisher]]}"
			],
	
		/** @expose */
		_ATTRIBUTES:[
			'role',				//application||applet||plugin [REQUIRED]
			'name',				//"H5C3 Homepage" [REQUIRED]
			'version',			//0.1.0 [REQUIRED]
			'uuid',				//4473182a-b5e9-4989-aac6-479f2b9ee49a[REQUIRED]
			'layout',			//Any registered layout
			'skin',				//Any skin scheme
			'shared',			//True is nanofw share, false is app and VENDER_ID is vendors url
			'target',			//What element (#) insert into or what position:weight (!) to into
			'cols'				//xs,sm,md,lg column sizes 12,8,6,12
		],
				
				
		/**
		 * Internal timer used for housekeeping, queues, etc. Runs at 2fps.
		 * @expose 
		 */
		timer:null,
		
		/**
		 * Stores the information about the current layout
		 *
		 * @property {object} layout
		 * @expose
		 */					
		layout:{repo:'i2tm',name:'starter'},
		
		/**
		 * Application Configuration Manager
		 *
		 * @property {object}	config	I$ConfigManager
		 * @expose
		 */			
		config:null,
			
		/**
		 * Stores total amount size of all content loaded.
		 *
		 * @property {number}	$totalBytesLoaded	
		 * @expose
		 */			
		$totalBytesLoaded: 0,
		
		/**
		 * Google Analytics & AdSense Interface
		 *
		 * @property {object}	google	I$Google
		 * @expose
		 */			
		google	: null,
		
		/**
		 * Local Client Side storage support Interface
		 *
		 * @property {object}	local	I$DeviceStorage
		 * @expose
		 */			
		local	: null,
		
		/**
		 * Applet Factory - Handles everything to to with applets
		 *
		 * @property {object} applets	I$AppletFactory
		 * @expose
		 */			
		applets	: null,
		
		//=-=| 2D Game Only |=-=//
		/**
		 * Game Engine Object
		 *
		 * @property {object} game	I$GameEngine
		 * @expose
		 */			
		game	: null,
		
		/**
		 * Launcher - Game Launcher
		 *
		 * @property {object} launcher	I$Launcher
		 * @expose
		 */			
		launcher: null,
		
		/**
		 * Device Performance tester
		 *
		 * @property {object} test	I$DeviceTest
		 * @expose
		 */			
		test	: null,
		
		/**
		 * True 	- Everything was fine, we can load the Engine and optionally the framework
		 * False 	- “Danger, Will Robinson!” The universe could be destroyed without proper configuration.
		 *
		 * @property {boolean}	ready  [true|false]
		 * @expose
		 */
		ready: false,
		
		/**
		 * set to true after call tot he nanoREADY() function
		 *
		 * @property {boolean}	readyCalled
		 * @expose
		 */			
		
		readyCalled: false,
						
		/**
		 * Framework has finished loading.
		 *
		 * @property {boolean} finished	
		 * @expose
		 */
		finished: false,
				
		//getPath:function(){},
		
		/**
		 * An array of all scripts
		 *
		 * @property {array} scripts
		 * @expose
		 */
		scripts: [],

		
		/**
		 * Return a string name for this interface class
		 *
		 * @method toString
		 * @expose 
		 * @this {I$Interface}
		 * @returns {string}
		 */
		toString:function (){return 'I$CloudApplication Class';}
	},
	/** @lends I$Alias.prototype */
	{
		/**
		 * Interface Initialization method
		 * @constructor
		 * @expose
		 */
		init:function ()
		{
			this['_super']();

			this['$loc'] = this['gfn'](document.location.href);

			
			//if (typeof this['config']['config']['google'] === "object")
			//	this['google'] = create('I$Google',this,this['config']['config']['google']);
		
			if (this['clientFS_exists']())
				this['local'] = P$['interfaces']['Store']['I$DeviceStorage'].create(this['config']['config']['app']);    //.create();
			
			
			this['applets'] = create('I$AppletFactory');					

			this.ha();

			this.ready = true;
		},
		/**
		 * Prepare the interfaces object before init is called. Excellent place
		 * to do property and method export and other preparations before init()
		 * is called.
		 * @method
		 * @expose
		 */
		setup:function(){
			this['info']('nano Framework v1.0.0');
			this['_super']();	
			this.initEvents();
			
			//give maestro 15 seconds to get R2WL in ready state otherwise stop timer
			this['timer'] = P$['interfaces']['Store']['I$AccuTimer']['create'](
				-1, 
				2, 
				M$.bnd(this,this._onInterval),
				M$.bnd(this,this._onTimerDone)
			)
			
			//this['scripts'].push(this['getPath']('modernizr','vendor')+'modernizr.min.js');	

			this['config'] = create('I$ConfigManager',
				M$.bnd(this,function(files){
					this['scripts'] = files;
				}),
				M$.bnd(this,function(files){
				})
			);

			this['getPath']=this['config']['getpath'];
		},
		/**
		 * This is triggered by the core after this interface is completely
		 * initialized.
		 *
		 * @event I$CloudApplication#onReady
		 * @expose
		 */
		onReady:function(){
			this['_super']();	
			this['createMeta']();
			this['getlayout']();
			
			this.prepare();
			//if (this.applets.onReady) this.applets.onReady();
			window.APP = this; //Make a global shortcut, i know its messy but look at the rest of this crap LOL

			if (this['google']) this['google']['load']();

			this['autoSizeACE']();

			this['applets']['scan']();		

			if (this['config']['config']['modules']['gldl']) {
				this['launcher'] = create('I$Launcher');
				this['game']= create('I$GameEngine','wrapper');
			}
		},
								
		/**
		 * Called to test if we have client storage access
		 *
		 * @method
		 * @expose 
		 * @return boolean
		 */
		clientFS_exists:function() {
			var mod = 'maestro';
			try {
				localStorage.setItem(mod, mod);
				localStorage.removeItem(mod);
				return true;
			} catch(e) {
				return false;
			}
		},
		
		/**
		 * parses the current document for template tags {%TAG|OPTIONS%}
		 *
		 * @method
		 * @noexpose
		 */		
		template:function() {
			var $el = M$['gei']('wrapper'),$html=$el.innerHTML;
		},
		
		/**
		 * Loads saved options and data from device storage if available
		 *
		 * @method
		 * @noexpose
		 */		
		prepare:function() {
			this.colorOverride = M$.chk(this['local'].getGlobalCfg('colorOverride'),false);
			//Load Skin
			if (this.colorOverride)
				this.skin = M$.chk(this['local'].getGlobalCfg('mySkin'),this.skin);			
			else
				this.skin = M$.chk(this['local'].getAppCfg('skin'),this.skin);					
		},
		
		/**
		 * embeds the loaded layout
		 *
		 * @method
		 * @noexpose
		 */		
		getlayout:function() {
			var tmp=this['config']['config']['app']['layout'];
			if (!this['vld'](tmp) || tmp.indexOf('|')==-1) {
				tmp="i2tm|starter";
			}
			tmp=tmp.split('|');
			this['addFile'](tmp[1]+'.nano','layouts',tmp[0]);
		},
		
		/** @expose */
		getFontSize:function() {
			var $style,$el = M$['gei']('wrapper');
			if (this['vld']($el)) {
				$style = window.getComputedStyle($el, null).getPropertyValue('font-size');
				return parseFloat($style);
			}
			return 16;
		},

		/** @expose */
		reviewResolution:function() {
			//check application attributes for the layout we are using
			if (d = D$.documentElement.dataset) {
			
				if (!this.layout.isValid(d.layout)) {
				} else {
					this.appLayout = d.layout;
					if (this.appLayout==='absolute-all') {
						//subtract sidebars and then calculate
						return this.setResolution((window.innerWidth-400));
					} else {
						return this.setResolution();			
					}
				}
			}
		},
			
		/** @expose */
		initEvents:function() {
			$(window).resize(function(){
				clearTimeout(this.resizeTimer);
				this.resizeTimer = setTimeout(this._onResizeComplete, 200);
			});		
		},
		

		/**
		 * return true if cloudApp is NOT in auto mode for orientation. 
		 * Set in config.options.orientation.
		 * @expose 
		 */
		lockOrientation:function() {
			return (this['config']['config']['options'].orientation=='landscape'||this['config']['config']['options'].orientation=='portrait')?true:false;
		},
		
		/** @expose */
		autoSizeACE:function() {
			var el,h;
			h=window.innerHeight-64;
			if (P$['interfaces']['Core'].isObject(window.ace)) {
				//Auto Size Ace
				el = M$['gei']('ide');
				if (el)	el.style.height=h+'px';
			}
			
			if (P$['interfaces']['Core'].isObject(window.nanofm)) {
				//Auto Size Nano File Manager
				el = M$['gei']('ide_fm');
				if (el)	el.style.height=h+'px';
			}
		},
		
		/**
		 * Determine device orientation and respond accordinaly
		 * @method testOrientation
		 * @expose
		 * @return 
		 */
		testOrientation: function() {
			if (this.lockOrientation()==false) return;
			if (this['config']['config']['options'].orientation=='landscape') {
				if (window.innerWidth > window.innerHeight) {
					M$['pld']();
					M$['off']('page_warning');
					this['Class'].appPaused = false;
				} else {
					this['Class'].appPaused = true;
					M$['gei']('orientation').innerHTML='Landscape';
					M$['ple']();
					M$['on']('page_warning');
				}
			} else if (this['config']['config']['options'].orientation=='portrait') {
				if (window.innerWidth < window.innerHeight) {
					M$['pld']();
					M$['off']('page_warning');
					this['Class'].appPaused = false;
				} else {
					this['Class'].appPaused = true;
					M$['gei']('orientation').innerHTML='Portrait';
					M$['ple']();
					M$['on']('page_warning');
				}		
			}
		},
		
		/** @expose */
		forceRedraw:function() {	
			M$['gei']("wrapper").style.display="none";
			location.reload();
		},
		
		/** @expose */
		forceResize:function() {
			var width, height;

			if (navigator.appName.indexOf("Microsoft") != -1) {
				width  = document.body.offsetWidth;
				height = document.body.offsetHeight;
			} else {
				width  = window.outerWidth;
				height = window.outerHeight;
			}

			window.resizeTo(width - 1, height);
			window.resizeTo(width + 1, height);
		},	
		
		/** @expose */
		checkScreenMode:function() {		// No L/R		 L only     L & R      ALL 
			var current = this.mode;		//0 = <720, 1 = 721-959, 2= 960-1920, 3=1921 >
			if (window.innerWidth < 721 && current != 0) {
				// We changed down to mode 0  = No Sidebars + Mobile menu
				this.mode = 0;
			} else if ((window.innerWidth > 720 && window.innerWidth < 961) && current != 1) {				
				// We changed into mode 1  = No Right Sidebar + Mobile menu
				this.mode = 1;
			} else if ((window.innerWidth > 960 && window.innerWidth < 1921) && current != 2) {				
				// We changed into mode 2	= Both sidebars no mobile menu
				this.mode = 2;
			} else if (window.innerWidth > 1920 && current != 3) {
				// We changed into mode 2   = Both sidebars no mobile menu
				this.mode = 3;
			}

			if (this.mode != current)
				this._onScreenSizeChanged();
		},
		
		save:function() {
			this['local'].setGlobalCfg('colorOverride',this.colorOverride);
			this['local'].setAppCfg('skin',this.skin);
		},
		
		addToHead:function($tag,$id,$content){
			var $s;
			if ($tag=="script") {
				$s = D$.createElement($tag);
				$s.id = $id;
				$s.type = 'application/javascript';
				$s.innerHTML = $content;
			} else if ($tag=="style") {
				$s = D$.createElement($tag);
				$s.id = $id;
				$s.type = 'text/css';
				$s.innerHTML = $content;
			} else {
				this['warn']('Attempting to add unknown element '+$tag+' to DOM.');
			}
			
			$a=get("head")[0];
			$a=get("head")[0].appendChild($s);
		},
		createWindow:function($applet,$opts) {
			if (ISA($applet)==="applet") {
			}
			if (ISA($opts)!=='object') 
				$opts={id:'window',height:'17.14em',width:'22.85em',title:'Unamed Window',statusbar:'',body:'',color:'clr-dark'};
			var window = DOC.createElement('div');
			window.id=$opts.id;
			window.className = 'this_window '+$opts.color;
			$html = '<div class="this_window.this_titleBar">\n';
			$html += '<div class="this_title left"><span id="windowName">'+$title+'</span></div>\n';
			$html += '<div class="icons right">\n';
			$html += '<i class="icon icon-move uiButton"></i>\n';
			$html += '<i class="icon icon-collapse-alt uiButton"></i>\n';
			$html += '<i class="icon icon-expand-alt uiButton"></i>\n';
			$html += '</div>\n';
			$html += '</div>\n';
			$html += '<div id="windowBody" class="this_body">'+$body+'</div>\n';
			$html += '<div class="this_statusBar">\n';
			$html += '<div id="windowStatusBar">'+$status+'</div>\n';
			$html += '</div>\n';
			window.innerHTML=$html;
		},
		
		/**
		 * Tells the resource loader to disable caching in the browser by modifying the resource src by appending the current time
		 * @method setDisableCache
		 * @return 
		 */
		setDisableCache: function () {
			
			this['Class']['noCacheString'] = (M$['isDevMode']()) ? '?nocache=' + Date.now():'';
		},

		/**
		 * Add a script or stylesheet to the que. Do not call directly.
		 * @method addFile
		 * @param {string} $file
		 * @return 
		 */
		addFile: function ($file,$what,$where) {
			this['scripts'].push(this['config']['getPath']($what,$where)+$file);			
		},

		/**
		 * Add multiple scripts to the que. Do not call directly.
		 * @method que
		 * @param {} scripts
		 * @param {} $engineBaseURL
		 * @return 
		 */
		que: function (scripts,$what,$where) {
			var $i = 0;
			for (var $i = 0; $i < scripts.length; $i++) {
				this.addFile(scripts[$i],$what,$where);
			}
			//this._start(); 
		},
		
		compile:function($applet) {
			return lzw.enc(encodeURIComponent($applet));
		},

		decompile:function($applet) {
			return lzw.dec(encodeURIComponent($applet));
		},
		
		validUUID:function($uuid) {
		
			if (this['vld']($uuid) && $uuid!=="") { 
			
				if (( ($uuid.split("-").length - 1) ==4 )?true:false) {
					if ($uuid.charAt(4)=="1" && $uuid.charAt(17)=="9" && $uuid.charAt(22)=="6" && $uuid.charAt(30)=="9") {
						return true;
					} else {
						if (location.protocol==='file:' && M$['getDevMode']()) {
							this['error']('Validation Failed, Bad UUID!');
							return false;		
						}
					} /* Embedded Code Check */
					
				} /* Format Check */
				
			} /* General Valid Check */
			
		},
		
		generateUUID:function() {
			return 'xxxx1xxx-xxxx-4xx9-yxx6-xxxxxx9xxxxx'.replace(/[xy]/g, function(c) {
				var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
				return v.toString(16);
			});
		},
								
		/**
		 * Called to force document to update itself
		 * @method redraw
		 * @return 
		 */
		redraw:function() {
			var $body = D$.getElementsByTagName("body")[0];
			$body.style.display='none';
			$body.offsetHeight=$body.offsetHeight;
			$body.style.display='block';	
		},
		
		/**
		 * Add a META tag to the head of the document
		 *
		 * @method
		 * @param {string} $name
		 * @param {string} $content
		 */
		addMeta:function($name,$content) {
			try {
				var _={el:null,head:H$};
				
				if (!_.head.contains($name)) {
					_.el=D$.createElement('meta');
					_.el.id=_.el.name=$name;
					_.el.content = $content;
					_.head.appendChild(_.el);
				}
			} catch (e) {
				M$['err'](this,e,_,Array.prototype.slice.call(arguments, 0));
			}
		},

		createMeta:function() {
			/*---/ Add META Tags /------------------------*/
			
			//this.addMeta('viewport','width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
			//this.addMeta('viewport','width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
			//this.addMeta('http-equiv="Cache-control"',this['config']['config']['app'].htmlCacheCtrl);
			this.addMeta('description',this['config']['config']['app']['description']);
			this.addMeta('author',this['config']['config']['app'].author);
			this.addMeta('keywords',this['config']['config']['app'].keywords);
			this.addMeta('copyright',this['config']['config']['app'].copyright);
		},
		
		/**
		 * I2tm Labs Analytics/Error Reports/etc.
		 * http://ipduh.com/ip/?66.249.75.190 IP Address Lookup
		 58.22.17.59 China {Hacker BOT?}
		 192.187.106.210	European Union	
		 157.55.32.149		msn.com
		 66.249.75.190		googlebot.com
		 66.249.73.44		googlebot.com		crawl-66-249-73-44.googlebot.com
		 */
		ha:function(i,s,o,g,r,a,m) {
			//$n({a:'clk',b:'element'});
		},
		/**
		 * Google analytics wrapper.methods, Only send requests when in live mode not developer. MWDL required to enable
		 * @method
		 * @param {} i
		 * @param {} s
		 * @param {} o
		 * @param {} g
		 * @param {} r
		 * @param {} a
		 * @param {} m
		 * @expose 
		 */
		ga:function(i,s,o,g,r,a,m) {if (this.google) this['google']['ga'](i,s,o,g,r,a,m);},

		//===================================================================================================//
		//=-=|EVENTS|=-======================================================================================//
		//===================================================================================================//
		/** @expose */
		_onScreenSizeChanged:function() {
			
			if (this.layout !== 'absolute') return;
		},
		/** @expose */
		_onResizeComplete:function() {
			
			//Updated displayed ads if display size has changed.
			if (this.google.$adSenseLoaded)
				this.google.onResize();
				
			//If ACE & NanoFM are loaded set height value
			this.autoSizeACE();
			this.testOrientation();
		},

		/**
		 *  Called when switching in/out of fullscreen mode.
		 * @method _onFullscreenChange
		 * @expose
		 * @return 
		 */
		_onFullscreenChange: function () {
		   var $c = M$['gei']('waCANVAS');
			if (document.mozFullScreen || document.webkitIsFullScreen) {
				$c.style.width = window.screen.width + 'px';
				$c.style.height = window.screen.height + 'px';
			} else {
				$c.style.width = this.config.screen.width + 'px';
				$c.style.height = this.config.screen.height + 'px';
			}
		},

		/** @expose */
		onLayoutLoaded:function(html) {
			this['gei']('wrapper').innerHTML=html;
		},
		
		//Called when each file is loaded
		/** @expose */
		_onLoaded:function($res,$src) {
			var _={};
			//=-=|TODO: Re-write this to use Maestro|=-=//
			if (this['vld']($src)) {	
				_.ext = M$['gex']($src),
				_.path,
				_.fileName = M$['gfn']($src);
				_.parts = $src.split("?"),
				_.size = $res.length;
		
				if (_.fileName==="") {
					this['warn']('Invalid Ajax URI received: '+$src);
					return;
				}
				this.$totalBytesLoaded+=_.size;
				if (_.parts.length==1) {
					_.path = $src.substring($src.lastIndexOf('/') + 1);
				} else {
					_.ext = M$['gex'](_.parts[0]),
					_.path = _.parts[0].substring(0, _.parts[0].lastIndexOf("/"));
				}

				if (_.fileName=="modernizr.min.js") {					
					var a=D$.createElement('script');
					a.id='modernizr'
					a.type='application/javascript';
					a.text='\n\r/* '+_.fileName+' */\n\r'+$res;
					M$['get']("head")[0].appendChild(a);				
				} else if (_.ext==="nano") {
					this['onLayoutLoaded']($res);
				} else if (_.ext==="css") {
					//Create Primary Stylesheet Element
					var $script = D$.createElement("style");
					$script.id=_.fileName;
					$script.rel = "stylesheet";
					$script.type = "text/css";
					$script.media ="all";
					$script.textContent='.define_'+_.fileName+'\n\r'+$res;
					try {
						M$['get']("head")[0].appendChild($script);
					} catch (e) {
						_.args = Array.prototype.slice.call(arguments, 0);
						M$['err'](this,e,_,Array.prototype.slice.call(arguments, 0));
					}				
				} else if (_.ext==="js") {
					//Create Primary Javascript Element
					var $script = D$.createElement("script");
					$script.id=_.fileName;
					$script.type = "application/javascript";
					$script.text=$res;
					try {
						M$['gei']("tail").appendChild($script);
					} catch (e) {
						_.args = Array.prototype.slice.call(arguments, 0);
						M$['err'](this,e,_,Array.prototype.slice.call(arguments, 0));
					}
				}
				
			}
		},
		
		//Called when each file has failed
		_onErrored:function($res) {
		},
						
		_onInterval:function($steps,$count,$fps){
			if (this['scripts']['length']>0) {
				this['finished']=false;
				var $src = this['scripts'].shift();
				M$.xhr(
					$src,
					this._onLoaded.bind(this),
					this._onErrored.bind(this),
					'get',
					null,
					false
				);
			} else {
				this['finished']=true;
				if (this['google']) this['google']['loaded']();
			}

			if (this['finished']&&this['ready'] && !this['readyCalled']) {
				if (typeof(window.nanoREADY) === "function") {
					window.nanoREADY();
				}
				this['readyCalled']=true;
				M$['pld']();				
			} 
		},
		
		_onTimerDone:function(self) {
			if (!this.finished) {
				var $m = 'Unable to load & initialize application within 15 seconds, aborting.';
				this['info']($m);
				alert($m);
			}	
			M$['pld']();
		},
		
		/**
		 * Return a string name for this interface prototype
		 *
		 * @method toString
		 * @expose 
		 * @this {I$Interface}
		 * @returns {string}
		 */
		toString:function ()
		{
			return (this['Class']===undefined)?
				'I$CloudApplication':
				this['Class']['fullName'] + ' [id: ' + (this['objectId']||0) + ']';
				
		}
	},
	//=-=|Optional|=-=//
	{
		/** @augments I$CloudApplication */
		/*
		someInterfaceName:I$SomeInterface,
		...
		someInterfaceName:I$SomeInterface
		*/
	},
	//=-=|Optional|=-=//
	[
		/** @export Member */
		/*
		someMethod:I$InterfaceMethod,
		...
		someMethod:I$InterfaceMethod
		*/
	]
);

