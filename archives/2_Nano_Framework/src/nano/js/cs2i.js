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
         * Added by martin@playcratlabs.com to support debug dumping of hash arrays
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

            if (this['showDebug']) this['dump']('after add');
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
            if (this['showDebug']) this['dump']('before remove of ' + obj);
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
            if (this['showDebug']) this['dump']('after remove');

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
         * Outputs the contents of the current list. Usually for debugging.
         * @method dump
         * @param {string} msg
         * @returns none 
		 * @memberof LinkedList
         */
        dump:function (msg)
        {
            this['debug']('====================' + msg + '=====================');
            var a = this['first'];
            while (a != null)
            {
                this['debug']("{" + a['obj'].toString() + "} previous=" + ( a['prevLinked'] ? a['prevLinked']['obj'] : "NULL"));
                a = a['next']();
            }
            this['debug']("===================================");
            this['debug']("Last: {" + (this['last'] ? this['last']['obj'] : 'NULL') + "} " + "First: {" + (this['first'] ? this['first']['obj'] : 'NULL') + "}");
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

            //debug: if you want to track expansion
            //this['debug']('expanding ' + this.classType.fullName + ' by ' + howMany + ' total=' + CS2I.Pool.totalPooled);

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
         * Dumps contents of the pool to through info logging (usually console). Mostly used for debugging the pooling
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
         * Dumps stats about usage to the debug info (generally console)
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
