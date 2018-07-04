/**
 * @object h5c3
 * @author Andrew Donelson  <andrew@i2tmlabs.com>
 * @version {VERSION}
 * @distro {DISTRO}
 * 
 * <h1>H5C3 Framework {DISTRO}-{VERSION}</h1>
 *
 * <p>This is the main object for the entire H5C3 Framrwork. Basically the namespace.</p>
 *
 * 	Features
 *	========
 *	<pre>
 *	- 100% HTM5 & CSS3 Compliant
 *	- Easy to use, Rapid Application Development
 *	- Integrated Developer Window w/ Console Logging, Statisical Graphs and Profiler
 *	- Total size of Framework is 94kb!
 *	- Users never have to download & install, Updates are instant & users can use on all platforms.
 *	- Simple efficient way of Creating & Extending Scenes, Layers 
 *	- Super Accurate Timer, it ajusts for drift and gives precise FPS
 *	- Advanced Throttling you can use for whatever you app needs to keep it smooth and balanced.
 *	- Factory / Worker system makes it extremely easy to manage large amounts of grouped (Factory) objects (Worker)
 *	- Simple JSON config file include on your page, reset is done for you.
 *	- Automatic Intro (I2TM Splash, H5C3 Splash)
 *	- Application / Game State Manager
 *	- Full Physics Engine powered by Box2D
 *	- Entity manager for all graphic objects
 *	- Automatic device detection (Touchpad integration)
 *	- Seamless Banner (advertising) Just right the Cloud Application / Applet and get paid.
 *	- Wide range of platforms supported
 *	- Smart AJAX 2 enabled including local filesystem access
 *	- Advanced Event Driven Error Handler with an Attitude wrapped around StackTrace.js
 *	- Intellegent Google adSense and Analytics integration.
 *	</pre>
 */

var h5c3 = {

	_CLASSNAME: 'H5C3',
	_CLASSVERSION:'0.5.1',
	/**
	 * @property String NAME
	 *
	 * Holds the name of this framework
	 */
	NAME: 'H5C3 Framework',
	/**
	 * @property String VERSION 
	 *
	 * Holds the current version of the framework
	 */
	VERSION: '{VERSION}',
	/**
	 * @property String DISTRO 
	 *
	 * Holds the distrobution tag of the framework
	 */
	DISTRO: '{DISTRO}',
	/**
	 * @property String DISTRO 
	 *
	 * Holds the distrobution tag of the framework
	 */
	BUILT: '{TIMESTAMP}',
	//Developers Collaborative 
	/**
	 * @property {object} 	path 		
	 * Holds pre-set paths
	 */
	path: {
		//Landing Page - Primary location
		home:		'http://h5c3.i2tmlabs.com/',
		//file base path
		base:		'public/sandbox/',
		applets:	'public/applets/',
		scripts:	'public/shared/js/',
		styles:		'public/shared/css/',
		images:		'public/shared/img/',
		plugins:	'public/shared/plugins/',
		user:		'public/users/',
		app: window.location.protocol + "//" + window.location.host + window.location.pathname.split("/").slice(0, -1).join("/") + "/"
	},
				
	/**
	 * @property String DISTRO 
	 *
	 * Holds the distrobution tag of the framework
	 */
	hasOwn:Object.prototype.hasOwnProperty,

	/** 
		@method 
		@param {object}
	*/
	isH5C3:function($obj) {
		return (typeof $obj === 'object' && typeof $obj.isH5C3 === 'function');
	},
	
	/** 
		@method 
		@param {object}
	*/
	isFunction:function ($obj)
	{
	   return !!($obj && $obj.constructor && $obj.call && $obj.apply);
	},

	/** 
		@method 
		@param {object}
	*/
	isWindow:function ($obj)
	{
		return !!($obj && $obj.setInterval);
	},

	/** 
		@method 
		@param {object}
	*/
	isArray:Array.isArray || function ($obj)
	{
		return ($obj.constructor === Array);
	},

	/** 
		@method 
		@param {object}
	*/
	isString:function ($obj)
	{
		return (typeof $obj == 'string');
	},

	/** 
		@method 
		@param {object}
	*/
	isObject:function ($obj)
	{
		return $obj === Object($obj);
	},

	/** 
		@method 
		@param {object}
	*/
	isPlainObject:function ($obj)
	{
		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if (!$obj || this.isObject($obj) || $obj.nodeType || this.isWindow($obj))
			return false;

		try
		{
			// Not own constructor property must be Object
			if ($obj.constructor && !this.hasOwn.call($obj, "constructor") && !this.hasOwn.call($obj.constructor.prototype, "isPrototypeOf"))
				return false;

		} catch (e)
		{
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// own properties are enumerated firstly, so to speed up, if last one is own, then all properties are own.
		var $key;
		for ($key in $obj)
		{
		}

		return $key === undefined || this.hasOwn.call($obj, $key);
	},

	/**
	 * @method bind()
	 *
	 * Utility function for wrapping a callback function with its reference
	 * 
	 * @example someobject.addEventListener("click", h5c3.bind(this, this.onclick), false);
	 *
	 * @param scope		the scope you want on other end
	 * @param function	the callback function to call
	 *
	 * @return  function
	 */	
	bind:function($scope, $fn) { 
		return function () {
			$fn.apply($scope, arguments);
		};
	},

	/** @method */
	extend:function ()
	{
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if (typeof target === "boolean")
		{
			deep = target;
			target = arguments[1] || {};
			// skip the boolean and the target
			i = 2;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if (typeof target !== "object" && !h5c3.isFunction(target))
			target = {};

		if (length === i)
		{
			target = this;
			--i;
		}

		for (; i < length; i++)
		{
			// Only deal with non-null/undefined values
			if ((options = arguments[ i ]) != null)
			{
				// Extend the base object
				for (name in options)
				{
					src = target[ name ];
					copy = options[ name ];

					// Prevent never-ending loop
					if (target === copy)
					{
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if (deep && copy && ( this.isPlainObject(copy) || (copyIsArray = this.isArray(copy)) ))
					{
						if (copyIsArray)
						{
							copyIsArray = false;
							clone = src && this.isArray(src) ? src : [];

						} else
						{
							clone = src && this.isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[ name ] = this.extend(deep, clone, copy);

						// Don't bring in undefined values
					} else if (copy !== undefined)
					{
						target[ name ] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	},

	/**
	 * @property Boolean 	devMode 		
	 * True if we are debugging, False otherwise
	 */
	devMode: false,

	/**
	 * @property Boolean		ready  [true|false]
	 * 
	 * True 	- Everything was fine, we can load the Engine and optionally the framework
	 * False 	- “Danger, Will Robinson!” The universe could be destroyed without proper configuration.
	 */
	ready: false,

	/**
	 * @constructor init()
	 * 
	 * Initialization
	 * @return {boolean}
	 */
	init: function() {
		_DBG_("Initializing...",this);
		var $msg  = 'No Configuration file detected.\n';
			$msg += 'Your very first script tag should be as below. You can change the path/file for the data-config attribute.\n';
			$msg += 'EXAMPLE: <script src="'+this.usePath('script')+'int/h5c3.debug.min.js" data-config="assets/config.js"></script>';
		/* Don't trust config - double check developer mode */
		if (!config || !config.app || !config.options) {
			if(AST(!this.getConfig(),$msg)) return this.ready; 
		} else {
			this.config = config;
			this.ready = true;
		}
		this.devMode = (this.DISTRO==="Developer"||this.DISTRO==="{DISTRO}") ? true : false;
		return this.ready;
	},
	usePath:function($path) {
		switch ($path.toLowerCase()) {
			case 	'home': 	return this.path.home; break;
			case 	'base':		return this.path.home+path.base; break;
			case 	'applets':	return this.path.home+path.applets; break;
			case 	'scripts':	return this.path.home+path.scripts; break;
			case 	'styles':	return this.path.home+path.styles; break;
			case 	'images':	return this.path.home+path.images; break;
			case 	'plugins':	return this.path.home+path.plugins; break;
			case 	'user':		return this.path.home+path.user; break;
			case 	'app':		return this.path.app; break;
		}		
	},
	getConfig:function() {
		var $result = true;
		if (location.protocol==='file:') return;
		if("undefined"===typeof this.config) { 
			var s = document.getElementsByTagName("script")[0];
			if (s.children.length===0) {
				if (s.dataset.config) {
					this.path.config = this.path.app+s.dataset.config;
				}
			} else {
				for (i=0;i<s.children.length;i++) {
					if (s.children[i].dataset.config) {
						this.path.config = this.path.app+s.children[i].dataset.config;
					}
				}
			}
			
			if (this.path.config) {
				this.XHR(
					this.path.config
					, function(){_DBG_('Loaded');}, function(){_DBG_('Error');}
				);
			} else
				$result = false;
		}
	},
	/**
	 * @method tag()
	 * 
	 * Returns the Frameworks current Name
	 * 
	 * @return String	Full name and version of the framework.
	 */
	tag: function() { return this.NAME+' v'+this.VERSION+'-'+this.DISTRO; },

	/**
	 * @method XHR()
	 * Given a complete url this function will use AJAX to load a file. It support the latest standards and CORS.
	 *
	 *
	 * @param  {String} url Source URI 	(Required)
	 * @param  {Function} onLoad Callback funtion for Successful load	(Required)
	 * @param  {Function} onError Callback function for Failed load		 
	 * @param  {string} method  HTTP verb ('GET', 'POST', 'DELETE', etc.)
	 * @param  {String} data request body
	 * @param  {boolean} trace (developer) will dump url,status, stae, and text to console.
	 */
	XHR:function($url, $onLoad, $onError, $method, $data,$trace) {

		function _onLoad() {}
		function _onError() {}
		
		function XMLReq($opts) {
			$opts.req = printStackTrace.implementation.prototype.createXMLHTTPObject();
			if('withCredentials' in $opts.req) {
				$opts.req.open($opts.method, $opts.url, true);
				$opts.req.onerror = $opts.onError;
				$opts.req.onreadystatechange = function() {
					if ($opts.trace===true) {
						var tmp = {url:$opts.url,state:this.readyState,status:this.status,text:this.statusText};
						_DBG_(String.prototype.objToString(tmp,false),h5c3);
					}
					if ($opts.req.readyState === 4) {
						if ($opts.req.status >= 200 && $opts.req.status < 400) {
							_DBG_($opts.url+' SUCCESSFUL',h5c3);
							$opts.onLoad($opts.req.responseText);
						} else {
							_DBG_($opts.url+' UNSUCCESSFUL - Check path & Filename.',h5c3);
							$opts.req.abort();
						}
					}
				};
				
				try {
					$opts.req.send($opts.data);
				} catch (e) {
					AST(null,printStackTrace({e:e}));
				}
			}
		} /* END XMLReq() */

		function XDOReq($opts) {
			$opts.req = new XDomainRequest();
			$opts.req.open($opts.method, $opts.url);
			$opts.req.onerror = $opts.onError;
			$opts.req.onload = function() {
				$onLoad($opts.req.responseText);
			};
			$opts.req.send($opts.data);
		} /* END CORReq() */
		
		
		/* BEGIN */
		if (!VLD($url)||$url==="") {
			$onError(new Error('URL provided is invalid ['+$url+']'));						
		} else {
			if (h5c3.devMode && $trace != true) $trace=false; else $trace=true;
			var $opts = {req:'', url:$url,trace:$trace};

			$opts.method 	= CHK($method,'GET');
			$opts.onLoad 	= CHK($onLoad,this._onLoad);		
			$opts.onError 	= CHK($onError,this._onError);
			$opts.data		= CHK($onError,0);
				
			
			var h=$url.indexOf("http");
				a=$url.indexOf("applet.");
			if (a && h === -1) {
				//you can load a applet locally off file system.
				_DBG_("You cannot load Applets off local filesystem. Trying H5C3 Public archive...");
				
			}
			
			try {
				if(XMLHttpRequest) { 			/* Rest of the world */
					return XMLReq($opts);
				}
				if(XDomainRequest) {			/* Microsoft IE */
					return XDOReq($opts);
				}
			} catch (e) {}
		}
	},
	
	/**
	 * @method clientFS_exists()
	 * 
	 * Called to test if we have client storage access
	 *
	 */
	clientFS_exists:function($fileName, $callback) {
		storageRootEntry.getFile($fileName, {create : false}, function() {
			$callback(true);
		}, function() {
			$callback(false);
		});
	},
	
	/**
	 * @method run()
	 * 
	 * Called via the onload event to start execution
	 *
	 */
	run: function() { 
		//if (this.ready && !VLD(this.bootstrap)) this.bootstrap = new h5c3.Bootstrap(); 
		if (!VLD(this.bootstrap)) this.bootstrap = new h5c3.Bootstrap(); 
	}	
};


/** @static */
h5c3.push = Array.prototype.push;

/** @static */
h5c3.merge = function (first, second)
{
    var i = first.length, j = 0;

    if (typeof second.length === "number")
    {
        for (var l = second.length; j < l; j++)
            first[ i++ ] = second[ j ];
    } else
    {
        while (second[j] !== undefined)
            first[ i++ ] = second[ j++ ];
    }
    first.length = i;
    return first;
};

/** @static */
h5c3.makeArray = function (array, results)
{
    var ret = results || [];

    if (array != null)
    {
        // The window, strings (and functions) also have 'length'
        // Tweaked logic slightly to handle Blackberry 4.7 RegExp issues #6930
        if (array.length == null || h5c3.isString(array) || h5c3.isFunction(array) || h5c3.isWindow(array))
            h5c3.push.call(ret, array);
        else
            h5c3.merge(ret, array);
    }

    return ret;
};


/**
 @static
 Allows for stepping through the objects
 */
h5c3.each = function (object, callback, args)
{
    var name, i = 0,
        length = object.length,
        isObj = length === undefined || h5c3.isFunction(object);

    if (args)
    {
        if (isObj)
        {
            for (name in object)
            {
                if (callback.apply(object[ name ], args) === false)
                {
                    break;
                }
            }
        } else
        {
            for (; i < length;)
            {
                if (callback.apply(object[ i++ ], args) === false)
                {
                    break;
                }
            }
        }

        // A special, fast, case for the most common use of each
    } else
    {
        if (isObj)
        {
            for (name in object)
            {
                if (callback.call(object[ name ], name, object[ name ]) === false)
                {
                    break;
                }
            }
        } else
        {
            for (; i < length;)
            {
                if (callback.call(object[ i ], i, object[ i++ ]) === false)
                {
                    break;
                }
            }
        }
    }

    return object;
};


/**
 @static
*/
h5c3._flagsCache = {};

/**
 @static
 Allow for flag creation
 */
h5c3.createFlags = function (flags)
{
    var object = h5c3._flagsCache[ flags ] = {}, i, length;
    flags = flags.split(/\s+/);
    for (i = 0, length = flags.length; i < length; i++)
        object[ flags[i] ] = true;
    return object;
};


/**
 @static
 Allow for callback by child classes
 */
h5c3.Callbacks = function (flags)
{
    // Convert flags from String-formatted to Object-formatted
    // (we check in cache first)
    flags = flags ? ( h5c3._flagsCache[ flags ] || h5c3.createFlags(flags) ) : {};

    var // Actual callback list
        list = [],
    // Stack of fire calls for repeatable lists
        stack = [],
    // Last fire value (for non-forgettable lists)
        memory,
    // Flag to know if list is currently firing
        firing,
    // First callback to fire (used internally by add and fireWith)
        firingStart,
    // End of the loop when firing
        firingLength,
    // Index of currently firing callback (modified by remove if needed)
        firingIndex,
    // Add one or several callbacks to the list
        add = function (args)
        {
            var i, length, elem;

            for (i = 0, length = args.length; i < length; i++)
            {
                elem = args[ i ];
                if (h5c3.isArray(elem))
                {
                    // Inspect recursively
                    add(elem);
                } else if (h5c3.isFunction(elem))
                {
                    // Add if not in unique mode and callback is not in
                    if (!flags.unique || !self.has(elem))
                    {
                        list.push(elem);
                    }
                }
            }
        },
    // Fire callbacks
        fire = function (context, args)
        {
            args = args || [];
            memory = !flags.memory || [ context, args ];
            firing = true;
            firingIndex = firingStart || 0;
            firingStart = 0;
            firingLength = list.length;
            for (; list && firingIndex < firingLength; firingIndex++)
            {
                if (list[ firingIndex ].apply(context, args) === false && flags.stopOnFalse)
                {
                    memory = true; // Mark as halted
                    break;
                }
            }
            firing = false;
            if (list)
            {
                if (!flags.once)
                {
                    if (stack && stack.length)
                    {
                        memory = stack.shift();
                        self.fireWith(memory[ 0 ], memory[ 1 ]);
                    }
                } else if (memory === true)
                {
                    self.disable();
                } else
                {
                    list = [];
                }
            }
        },
    // Actual Callbacks object
        self = {
            // Add a callback or a collection of callbacks to the list
            add:function ()
            {
                if (list)
                {
                    var length = list.length;
                    add(arguments);
                    // Do we need to add the callbacks to the
                    // current firing batch?
                    if (firing)
                    {
                        firingLength = list.length;
                        // With memory, if we're not firing then
                        // we should call right away, unless previous
                        // firing was halted (stopOnFalse)
                    } else if (memory && memory !== true)
                    {
                        firingStart = length;
                        fire(memory[ 0 ], memory[ 1 ]);
                    }
                }
                return this;
            },
            // Remove a callback from the list
            remove:function ()
            {
                if (list)
                {
                    var args = arguments,
                        argIndex = 0,
                        argLength = args.length;
                    for (; argIndex < argLength; argIndex++)
                    {
                        for (var i = 0; i < list.length; i++)
                        {
                            if (args[ argIndex ] === list[ i ])
                            {
                                // Handle firingIndex and firingLength
                                if (firing)
                                {
                                    if (i <= firingLength)
                                    {
                                        firingLength--;
                                        if (i <= firingIndex)
                                        {
                                            firingIndex--;
                                        }
                                    }
                                }
                                // Remove the element
                                list.splice(i--, 1);
                                // If we have some unicity property then
                                // we only need to do this once
                                if (flags.unique)
                                {
                                    break;
                                }
                            }
                        }
                    }
                }
                return this;
            },
            // Control if a given callback is in the list
            has:function (fn)
            {
                if (list)
                {
                    var i = 0,
                        length = list.length;
                    for (; i < length; i++)
                    {
                        if (fn === list[ i ])
                        {
                            return true;
                        }
                    }
                }
                return false;
            },
            // Remove all callbacks from the list
            empty:function ()
            {
                list = [];
                return this;
            },
            // Have the list do nothing anymore
            disable:function ()
            {
                list = stack = memory = undefined;
                return this;
            },
            // Is it disabled?
            disabled:function ()
            {
                return !list;
            },
            // Lock the list in its current state
            lock:function ()
            {
                stack = undefined;
                if (!memory || memory === true)
                {
                    self.disable();
                }
                return this;
            },
            // Is it locked?
            locked:function ()
            {
                return !stack;
            },
            // Call all callbacks with the given context and arguments
            fireWith:function (context, args)
            {
                if (stack)
                {
                    if (firing)
                    {
                        if (!flags.once)
                        {
                            stack.push([ context, args ]);
                        }
                    } else if (!( flags.once && memory ))
                    {
                        fire(context, args);
                    }
                }
                return this;
            },
            // Call all the callbacks with the given arguments
            fire:function ()
            {
                self.fireWith(this, arguments);
                return this;
            },
            // To know if the callbacks have already been called at least once
            fired:function ()
            {
                return !!memory;
            }
        };

    return self;
};

/**
 @static
 
 Allows the extending of child classes
*/
h5c3.extend({

	/** @method */
    Deferred:function (func)
    {
        var doneList = h5c3.Callbacks("once memory"),
            failList = h5c3.Callbacks("once memory"),
            progressList = h5c3.Callbacks("memory"),
            state = "pending",
            lists = {
                resolve:doneList,
                reject:failList,
                notify:progressList
            },
            promise = {
                done:doneList.add,
                fail:failList.add,
                progress:progressList.add,

                state:function ()
                {
                    return state;
                },

                // Deprecated
                isResolved:doneList.fired,
                isRejected:failList.fired,

                then:function (doneCallbacks, failCallbacks, progressCallbacks)
                {
                    deferred.done(doneCallbacks).fail(failCallbacks).progress(progressCallbacks);
                    return this;
                },
                always:function ()
                {
                    deferred.done.apply(deferred, arguments).fail.apply(deferred, arguments);
                    return this;
                },
                pipe:function (fnDone, fnFail, fnProgress)
                {
                    return h5c3.Deferred(function (newDefer)
                    {
                        h5c3.each({
                            done:[ fnDone, "resolve" ],
                            fail:[ fnFail, "reject" ],
                            progress:[ fnProgress, "notify" ]
                        }, function (handler, data)
                        {
                            var fn = data[ 0 ],
                                action = data[ 1 ],
                                returned;
                            if (h5c3.isFunction(fn))
                            {
                                deferred[ handler ](function ()
                                {
                                    returned = fn.apply(this, arguments);
                                    if (returned && h5c3.isFunction(returned.promise))
                                    {
                                        returned.promise().then(newDefer.resolve, newDefer.reject, newDefer.notify);
                                    } else
                                    {
                                        newDefer[ action + "With" ](this === deferred ? newDefer : this, [ returned ]);
                                    }
                                });
                            } else
                            {
                                deferred[ handler ](newDefer[ action ]);
                            }
                        });
                    }).promise();
                },

				/** @method 
					Get a promise for this deferred
					If obj is provided, the promise aspect is added to the object
					@param {object}
				*/
                promise:function (obj)
                {
                    if (obj == null)
                    {
                        obj = promise;
                    } else
                    {
                        for (var key in promise)
                        {
                            obj[ key ] = promise[ key ];
                        }
                    }
                    return obj;
                }
            },
            deferred = promise.promise({}),
            key;

        for (key in lists)
        {
            deferred[ key ] = lists[ key ].fire;
            deferred[ key + "With" ] = lists[ key ].fireWith;
        }

		/** @method
            Handle state
		*/
        deferred.done(function ()
        {
            state = "resolved";
        }, failList.disable, progressList.lock).fail(function ()
            {
                state = "rejected";
            }, doneList.disable, progressList.lock);

        // Call given func if any
        if (func)
        {
            func.call(deferred, deferred);
        }

        // All done!
        return deferred;
    },

	/** @method 
        Deferred helper
	*/
    when:function (firstParam)
    {
        var // Static reference to slice
            sliceDeferred = [].slice;
        var args = sliceDeferred.call(arguments, 0),
            i = 0,
            length = args.length,
            pValues = new Array(length),
            count = length,
            deferred = length <= 1 && firstParam && h5c3.isFunction(firstParam.promise) ?
                firstParam :
                h5c3.Deferred(),
            promise = deferred.promise();

        function resolveFunc(i)
        {
            return function (value)
            {
                args[ i ] = arguments.length > 1 ? sliceDeferred.call(arguments, 0) : value;
                if (!( --count ))
                {
                    deferred.resolveWith(deferred, args);
                }
            };
        }

        function progressFunc(i)
        {
            return function (value)
            {
                pValues[ i ] = arguments.length > 1 ? sliceDeferred.call(arguments, 0) : value;
                deferred.notifyWith(promise, pValues);
            };
        }

        if (length > 1)
        {
            for (; i < length; i++)
            {
                if (args[ i ] && args[ i ].promise && h5c3.isFunction(args[ i ].promise))
                {
                    args[ i ].promise().then(resolveFunc(i), deferred.reject, progressFunc(i));
                } else
                {
                    --count;
                }
            }
            if (!count)
            {
                deferred.resolveWith(deferred, args);
            }
        } else if (deferred !== firstParam)
        {
            deferred.resolveWith(deferred, length ? [ firstParam ] : []);
        }
        return promise;
    }
});

(function (gc)
{
    var regs = {
            undHash:/_|-/,
            colons:/::/,
            words:/([A-Z]+)([A-Z][a-z])/g,
            lowUp:/([a-z\d])([A-Z])/g,
            dash:/([a-z\d])([A-Z])/g,
            replacer:/\{([^\}]+)\}/g,
            dot:/\./
        },
        getNext = function (current, nextPart, add)
        {
            return current[nextPart] || ( add && (current[nextPart] = {}) );
        },
        isContainer = function (current)
        {
            var type = typeof current;
            return type && (  type == 'function' || type == 'object' );
        },
        getObject = function (objectName, roots, add)
        {
            var parts = objectName ? objectName.split(regs.dot) : [],
                length = parts.length,
                currents = gc.isArray(roots) ? roots : [roots || window],
                current,
                ret,
                i,
                c = 0;

            if (length == 0)
            {
                return currents[0];
            }
            while (current = currents[c++])
            {
                for (i = 0; i < length - 1 && isContainer(current); i++)
                {
                    current = getNext(current, parts[i], add);
                }
                if (isContainer(current))
                {

                    ret = getNext(current, parts[i], add);

                    if (ret !== undefined)
                    {

                        if (add === false)
                        {
                            delete current[parts[i]];
                        }
                        return ret;

                    }

                }
            }
        },

        /**
         * A collection of useful string helpers.
         */
        str = gc.String = {
            /**
             * @function
             * @desc Gets an object from a string.
             * @param {String} name the name of the object to look for
             * @param {Array} [roots] an array of root objects to look for the name
             * @param {Boolean} [add] true to add missing objects to
             *  the path. false to remove found properties. undefined to
             *  not modify the root object
             */
            getObject:getObject,

            /**
             * Capitalizes a string
             * @param {String} s the string.
             * @return {String} a string with the first character capitalized.
             */
            capitalize:function (s)
            {
                return s.charAt(0).toUpperCase() + s.substr(1);
            },
            /**
             * Capitalizes a string from something undercored. Examples:
             * @codestart
             * h5c3.String.camelize("one_two") //-> "oneTwo"
             * "three-four".camelize() //-> threeFour
             * @codeend
             * @param {String} s
             * @return {String} a the camelized string
             */
            camelize:function (s)
            {
                s = str.classize(s);
                return s.charAt(0).toLowerCase() + s.substr(1);
            },
            /**
             * Like camelize, but the first part is also capitalized
             * @param {String} s
             * @return {String} the classized string
             */
            classize:function (s, join)
            {
                var parts = s.split(regs.undHash),
                    i = 0;
                for (; i < parts.length; i++)
                {
                    parts[i] = str.capitalize(parts[i]);
                }

                return parts.join(join || '');
            },
            /**
             * Like [h5c3.String.classize|classize], but a space separates each 'word'
             * @codestart
             * h5c3.String.niceName("one_two") //-> "One Two"
             * @codeend
             * @param {String} s
             * @return {String} the niceName
             */
            niceName:function (s)
            {
                return str.classize(s, ' ');
            },

            /**
             * Underscores a string.
             * @codestart
             * h5c3.String.underscore("OneTwo") //-> "one_two"
             * @codeend
             * @param {String} s
             * @return {String} the underscored string
             */
            underscore:function (s)
            {
                return s.replace(regs.colons, '/').replace(regs.words, '$1_$2').replace(regs.lowUp, '$1_$2').replace(regs.dash, '_').toLowerCase();
            },
            /**
             * Returns a string with {param} replaced values from data.
             *
             *     h5c3.String.sub("foo {bar}",{bar: "far"})
             *     //-> "foo far"
             *
             * @param {String} s The string to replace
             * @param {Object} data The data to be used to look for properties.  If it's an array, multiple
             * objects can be used.
             * @param {Boolean} [remove] if a match is found, remove the property from the object
             */
            sub:function (s, data, remove)
            {
                var obs = [];
                obs.push(s.replace(regs.replacer, function (whole, inside)
                {
                    //convert inside to type
                    var ob = getObject(inside, data, typeof remove == 'boolean' ? !remove : remove),
                        type = typeof ob;
                    if ((type === 'object' || type === 'function') && type !== null)
                    {
                        obs.push(ob);
                        return "";
                    } else
                    {
                        return "" + ob;
                    }
                }));
                return obs.length <= 1 ? obs[0] : obs;
            }
        }

})(h5c3);

(function (gc)
{

    // if we are initializing a new class
    var initializing = false,
        makeArray = gc.makeArray,
        isFunction = gc.isFunction,
        isArray = gc.isArray,
        extend = gc.extend,

        cloneObject = function (object)
        {
            if (!object || typeof(object) != 'object')
                return object;

            // special case handling of array (deep copy them)
            if (object instanceof Array)
            {
                var clone = [];
                for (var c = 0; c < object.length; c++)
                    clone[c] = cloneObject(object[c]);
                return clone;
            }
            else // otherwise, it's a normal object, clone it's properties
            {
                var cloneObj = {};
                for (var prop in object)
                    cloneObj[prop] = cloneObject(object[prop]);
                return cloneObj;
            }
        },

        concatArgs = function (arr, args)
        {
            return arr.concat(makeArray(args));
        },

        // tests if we can get super in .toString()
        fnTest = /xyz/.test(function ()
        {
            xyz;
        }) ? /\b_super\b/ : /.*/,

        inheritProps = function (newProps, oldProps, addTo)
        {
            // overwrites an object with methods, sets up _super
            // newProps - new properties
            // oldProps - where the old properties might be
            // addTo - what we are adding to
            addTo = addTo || newProps
            for (var name in newProps)
            {
                // Check if we're overwriting an existing function
                addTo[name] = isFunction(newProps[name]) &&
                    isFunction(oldProps[name]) &&
                    fnTest.test(newProps[name]) ? (function (name, fn)
                {
                    return function ()
                    {
                        var tmp = this._super, ret;

                        // Add a new ._super() method that is the same method but on the super-class
                        this._super = oldProps[name];

                        // The method only need to be bound temporarily, so we remove it when we're done executing
                        ret = fn.apply(this, arguments);
                        this._super = tmp;
                        return ret;
                    };
                })(name, newProps[name]) : newProps[name];
            }
        },

        clss = gc.Class = function ()
        {
            if (arguments.length)
            {
                return clss.extend.apply(clss, arguments);
            }
        };

    /* @Static*/
    extend(clss, {
        callback:function (funcs)
        {
            //args that should be curried
            var args = makeArray(arguments),
                self;

            funcs = args.shift();

            if (!isArray(funcs))
            {
                funcs = [funcs];
            }

            self = this;

            return function class_cb()
            {
                var cur = concatArgs(args, arguments),
                    isString,
                    length = funcs.length,
                    f = 0,
                    func;

                for (; f < length; f++)
                {
                    func = funcs[f];
                    if (!func)
                        continue;

                    isString = typeof func == "string";
                    if (isString && self._set_called)
                        self.called = func;

                    cur = (isString ? self[func] : func).apply(self, cur || []);
                    if (f < length - 1)
                        cur = !isArray(cur) || cur._use_call ? [cur] : cur
                }
                return cur;
            }
        },

        getObject:gc.String.getObject,

        newInstance:function ()
        {
            var inst = this.rawInstance();
            var args;

            if (inst.setup)
                args = inst.setup.apply(inst, arguments);

            // Added by martin@playcraftlabs.com -- fix for deep cloning of properties
           for (var prop in inst.__proto__)
               inst[prop] = cloneObject(inst[prop]);

            if (inst.init)
                inst.init.apply(inst, isArray(args) ? args : arguments);

            return inst;
        },

        setup:function (baseClass, fullName)
        {
            this.defaults = extend(true, {}, baseClass.defaults, this.defaults);
            if (this._types == undefined) this._types = [];
            this._types.push(this.fullName);
            if (this._fullTypeName == undefined) this._fullTypeName = '|';
            this._fullTypeName += this.fullName + '|';
            return arguments;
        },
        rawInstance:function ()
        {
            initializing = true;
            var inst = new this();
            initializing = false;
            return inst;
        },

        extend:function (fullName, klass, proto)
        {
            // figure out what was passed
            if (typeof fullName != 'string')
            {
                proto = klass;
                klass = fullName;
                fullName = null;
            }
            if (!proto)
            {
                proto = klass;
                klass = null;
            }

            proto = proto || {};
            var _super_class = this,
                _super = this.prototype,
                name, shortName, namespace, prototype;

            // append the isA function
            this.isA = function (typeName)
            {
                return this._fullTypeName.indexOf('|' + typeName + '|') != -1;
            };

            // Instantiate a base class (but only create the instance,
            // don't run the init constructor)
            initializing = true;
            prototype = new this();
            initializing = false;
            // Copy the properties over onto the new prototype
            inheritProps(proto, _super, prototype);

            // The dummy class constructor

            function Class()
            {
                // All construction is actually done in the init method
                if (initializing) return;
				try {
					if (this.constructor !== Class && arguments.length)
					{ //we are being called w/o new
						return arguments.callee.extend.apply(arguments.callee, arguments)
					} else
					{ //we are being called w/ new
						// copy objects
						return this.Class.newInstance.apply(this.Class, arguments)
					}
				} catch (e) {
					_DBG_(printStackTrace({e:e}),this.Class);
					return null;
				}
            }

            // Copy old stuff onto class
            for (name in this)
                if (this.hasOwnProperty(name))
                    Class[name] = cloneObject(this[name]);

            // copy new props on class
            inheritProps(klass, this, Class);

            // do namespace stuff
            if (fullName)
            {
                var parts = fullName.split(/\./);
                var shortName = parts.pop();
				var current='';

                // Martin Wells (playcraft): bug fix. Don't add a namespace object if the class name
                // has no namespace elements (i.e. it's just "MyClass", not "MyProject.MyClass")
                if (parts.length > 0)
                {
                    current = clss.getObject(parts.join('.'), window, true),
                    namespace = current;
                }

                current[shortName] = Class;
            }

            // set things that can't be overwritten
            extend(Class, {
                prototype:prototype,
                namespace:namespace,
                shortName:shortName,
                constructor:Class,
                fullName:fullName
            });

            //make sure our prototype looks nice
            Class.prototype.Class = Class.prototype.constructor = Class;

            var args = Class.setup.apply(Class, concatArgs([_super_class], arguments));

            if (Class.init)
                Class.init.apply(Class, args || []);

            /* @Prototype*/

            return Class;
        }
    });

    clss.prototype.callback = clss.callback;

})(h5c3);


/**
 * @class h5c3.Base
 * 
 * A base class providing logging, object counting and unique object id's
 * Examples:
 *
 * Unique ID and total objects:
 * <pre><code>
 * var Fighter = h5c3.Base.extend('Fighter', {}, {});
 * var fighter1 = new Fighter();
 * var fighter2 = new Fighter();
 * fighter1.uniqueId;    // -> 'Fighter:0'
 * fighter2.uniqueId;    // -> 'Fighter:1'
 * Fighter.totalObjects; // -> 2
 * </code></pre>
 *
 * Logging: (log, info, warn, error, debug)
 * <pre><code>
 * fighter1.warn('oops'); // == console.log('Fighter:0 [WARN] oops');
 * </code></pre>
 */
h5c3.Base = h5c3.Class('h5c3.Base',
    /** @lends h5c3.Base */
    {
		_CLASSVERSION:'0.4.3',
        totalObjects:0,
        WARN:'WARN',
        DEBUG:'DEBUG',
        ERROR:'ERROR',
        INFO:'INFO',

		/*
        log:function (id, type, args)
        {
            var idString = '';
            if (id) idString = ':' + id;
            //console.log(this.fullName + idString + ' [' + type + '] ' + message);
            console.log.apply(console, [this.fullName + idString + ' [' + type + '] '].concat(Array.prototype.slice.call(args)));
        },
		*/

		log: function (id, type, args) {
			var $log = GEI("waConsoleLog");
            var idString = '';
            if (id) idString = ':' + id;
			var $msg = [this.fullName + idString + '\t\t [' + type + '] \t\t'].concat(Array.prototype.slice.call(args));

			if (VLD($log)) {
				$log.value += $msg + '\n';
				$log.scrollTop = $log.scrollHeight;
			}
			window.console.log.apply(console, $msg);
		},
        warn:function ($message)
        {
            this.log(null, this.WARN, $message);
        },

        debug:function ($message)
        {
            this.log(null, this.DEBUG, $message);
        },

        error:function ($message)
        {
            this.log(null, this.ERROR, $message);
        },

        info:function ($message)
        {
            this.log(null, this.INFO, $message);
        },

        assert:function ($msg, $condition)
        {
            if (!$condition)
                throw $msg;
        }

    },
    /** @lends h5c3.Base.prototype */
    {
        objectId:0,
        uniqueId:null,

        init:function ()
        {
        },

        setup:function ()
        {
            this.objectId = this.Class.totalObjects++;
            this.uniqueId = this.Class.fullName + ':' + this.objectId;
        },

        /**
         * @return {String} A system-wide unique Id for this object instance
         */
        getUniqueId:function ()
        {
            // if you see a null error here, then likely you have forgotten to call
            // this._super in a subclassed init method.
            return this.uniqueId;
        },

        /**
         * @return {String} A hash matching this object. Override this to implement different
         * kinds of object hashing in derived classes.
         */
        hashCode:function ()
        {
            return this.getUniqueId();
        },

        warn:function ()
        {
            this.Class.log(this.objectId, this.Class.WARN, arguments);
        },
        debug:function ()
        {
            this.Class.log(this.objectId, this.Class.DEBUG, arguments);
        },
        error:function ()
        {
            this.Class.log(this.objectId, this.Class.ERROR, arguments);
        },
        info:function ()
        {
            this.Class.log(this.objectId, this.Class.INFO, arguments);
        },

        toString:function ()
        {
            return this.Class.fullName + ' [id: ' + this.objectId + ']';
        }
    });


/**
 * @class h5c3.Device
 * Staic class with lots of device information.
 */
h5c3.Device = h5c3.Base.extend('h5c3.Device', {
	_CLASSNAME: 'Device',
	_CLASSVERSION:'1.1.0',
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
	 @constructor
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
					//function (callback, element)
					function (callback)
					{
						window.setTimeout(callback, 16, Date.now());
					};

			// apply to our window global to avoid illegal invocations (it's a native)
			return function (callback, element)
			{
				request.apply(window, [callback, element]);
			};
		})();

	},

	/**
	 * @method canPlay()
	 * 
	 * Check to see which media sound formats can be played
	 *
	 * @return {boolean}
	 */
	canPlay: function(format)
	{
		if (format.toLowerCase() === 'mp3' && this.canPlayMP3) return true;
		if (format.toLowerCase() === 'ogg' && this.canPlayOgg) return true;
		if (format.toLowerCase() === 'wav' && this.canPlayWav) return true;
		return false;
	},

	/**
	 * @method canPlay()
	 * 
	 * Return the amount of memory we are using
	 *
	 * @return {number}
	 */
	getUsedHeap:function ()
	{
		return this.hasMemoryProfiling ? window.performance.memory.usedJSHeapSize : 0;
	},

	/**
	 * @method canPlay()
	 * 
	 * Return he total amount of memory available
	 *
	 * @return {number}
	 */
	getTotalHeap:function ()
	{
		return this.hasMemoryProfiling ? window.performance.memory.totalJSHeapSize : 0;
	}
},{
        // Singleton static class, so nothing required here
});


/**
 * @class h5c3.HashList
 * 
 * A map of linked lists mapped by a string value
 */
h5c3.HashList = h5c3.Base.extend('h5c3.HashList', {
	_CLASSNAME: 'HashList',
	_CLASSVERSION:'0.4.4'
	},
    /** @lends h5c3.HashList */
    {
        /** Internal hash table of lists */
        hashtable: null,

        /**
		 * @constructor
         * Constructs a new hash list
         */
        init: function()
        {
            this.hashtable = new h5c3.Hashtable();
        },

        /**
         * Add an object to a list based on the given key. If the list doesn't yet exist it will be constructed.
         * @param {String} key Key
         * @param {Object} object Object to store
         */
        add: function(key, object)
        {
            // find the list associated with this key and add the object to it
            var list = this.hashtable.get(key);
            if (list == null)
            {
                // no list associated with this key yet, so let's make one
                list = new pc.LinkedList();
                this.hashtable.put(key, list);
            }
            list.add(object);
        },

        /**
         * Removes an object from the list
         * @param {String} key Key for the list to remove the object from
         * @param {Object} object Object to remove
         */
        remove: function(key, object)
        {
            var list = this.hashtable.get(key);
            if (list == null) throw "No list for a key in hashlist when removing";
            list.remove(object);
        },

        /**
         * Get a list associated with a given key
         * @param {String} key The key
         * @return {h5c3.LinkedList} The list
         */
        get: function(key)
        {
            return this.hashtable.get(key);
        }
    });
	
	
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
 * (Slight mod to add to h5c3 namespace -- martin@playcraftlabs.com)
 */

/**
 * @class h5c3.Hashtable
 *
 * jshashtable is a JavaScript implementation of a hash table. It creates a single constructor function called Hashtable
 * in the global scope.
 * Example:
 * <code>
 *     var map = new h5c3.Hashtable();
 *     map.put('test1', obj);
 *     var obj = map.get('test1');
 * </code>
 */
h5c3.Hashtable = (function ()
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

    function equals_fixedValueHasEquals(fixedValue, variableValue)
    {
        return fixedValue.equals(variableValue);
    }

    function equals_fixedValueNoEquals(fixedValue, variableValue)
    {
        return (typeof variableValue.equals == FUNCTION) ?
            variableValue.equals(fixedValue) : (fixedValue === variableValue);
    }

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

    /*----------------------------------------------------------------------------------------------------------------*/

    function Bucket(hash, firstKey, firstValue, equalityFunction)
    {
        this[0] = hash;
        this.entries = [];
        this.addEntry(firstKey, firstValue);

        if (equalityFunction !== null)
        {
            this.getEqualityFunction = function ()
            {
                return equalityFunction;
            };
        }
    }

    var EXISTENCE = 0, ENTRY = 1, ENTRY_INDEX_AND_VALUE = 2;

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
        getEqualityFunction:function (searchValue)
        {
            return (typeof searchValue.equals == FUNCTION) ? equals_fixedValueHasEquals : equals_fixedValueNoEquals;
        },

        getEntryForKey:createBucketSearcher(ENTRY),

        getEntryAndIndexForKey:createBucketSearcher(ENTRY_INDEX_AND_VALUE),

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

        addEntry:function (key, value)
        {
            this.entries[this.entries.length] = [key, value];
        },

        keys:createBucketLister(0),

        values:createBucketLister(1),

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

    /*----------------------------------------------------------------------------------------------------------------*/

    // Supporting functions for searching hashtable buckets

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

    function getBucketForHash(bucketsByHash, hash)
    {
        var bucket = bucketsByHash[hash];

        // Check that this is a genuine bucket and not something inherited from the bucketsByHash's prototype
        return ( bucket && (bucket instanceof Bucket) ) ? bucket : null;
    }

    /*----------------------------------------------------------------------------------------------------------------*/

    function Hashtable(hashingFunctionParam, equalityFunctionParam)
    {
        var that = this;
        var buckets = [];
        var bucketsByHash = {};

        var hashingFunction = (typeof hashingFunctionParam == FUNCTION) ? hashingFunctionParam : hashObject;
        var equalityFunction = (typeof equalityFunctionParam == FUNCTION) ? equalityFunctionParam : null;

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

        this.containsKey = function (key)
        {
            checkKey(key);
            var bucketKey = hashingFunction(key);

            // Check if a bucket exists for the bucket key
            var bucket = getBucketForHash(bucketsByHash, bucketKey);

            return bucket ? bucket.containsKey(key) : false;
        };

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

        this.clear = function ()
        {
            buckets.length = 0;
            bucketsByHash = {};
        };

        this.isEmpty = function ()
        {
            return !buckets.length;
        };

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

        this.size = function ()
        {
            var total = 0, i = buckets.length;
            while (i--)
            {
                total += buckets[i].entries.length;
            }
            return total;
        };

        this.each = function (callback)
        {
            var entries = that.entries(), i = entries.length, entry;
            while (i--)
            {
                entry = entries[i];
                callback(entry[0], entry[1]);
            }
        };

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

        this.clone = function ()
        {
            var clone = new Hashtable(hashingFunctionParam, equalityFunctionParam);
            clone.putAll(that);
            return clone;
        };

        /**
         * Added by martin@playcratlabs.com to support debug dumping of hash arrays
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
 * @class h5c3.LinkedNode
 * 
 * Represents an item stored in a linked list.
 */
h5c3.LinkedNode = h5c3.Base.extend('h5c3.LinkedNode', {
	_CLASSVERSION:'0.1.0'
	},
    /** @lends h5c3.LinkedNode.prototype */
    {
        obj:null, // the object reference
        nextLinked:null, // link to next object in the list
        prevLinked:null, // link to previous object in the list
        free:true,

        /**
		 * @constructor
         * Constructs a new linked Node
         */
        init:function ()
        {
            this._super();
        },

        /**
		 * @method next()
         * @return {pc.LinkedListNode} Next node on the list
         */
        next:function ()
        {
            return this.nextLinked;
        },

        /**
		 * @method object()
         * @return {Object} Object this node represents on the list
         */
        object:function ()
        {
            return this.obj;
        },

        /**
		 * @method prev()
         * @return {pc.LinkedListNode} Prev node on the list
         */
        prev:function ()
        {
            return this.prevLinked;
        }

    });

/**
 * @class h5c3.LinkedList
 * 
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
 *       node.object().DOSOMETHING();
 *       node = node.next();
 *   }
 * </code></pre>
 */
h5c3.LinkedList = h5c3.Base.extend('h5c3.LinkedList', {
    /** @lends h5c3.LinkedList */
	_CLASSNAME: 'LinkedList',
	_CLASSVERSION:'0.1.0'
    },
    /** @lends h5c3.LinkedList.prototype */
    {
        first:null,
        last:null,
        count:0,
        objToNodeMap:null, // a quick lookup list to map linked list nodes to objects

        /**
		 * @constructor
         * Constructs a new linked list
         */
        init:function ()
        {
            this._super();
            this.objToNodeMap = new h5c3.Hashtable();
        },

        /**
		 * @method getNode()
         * Get the LinkedListNode for this object.
         * @param obj The object to get the node for
         */
        getNode:function (obj)
        {
            // objects added to a list must implement a getUniqueId which returns a unique object identifier string
            // or just extend h5c3.Base to get it for free
            return this.objToNodeMap.get(obj.getUniqueId());
        },

        /**
		 * @method addNode()
         * Adds a specific node to the list -- typically only used internally unless you're doing something funky
         * Use add() to add an object to the list, not this.
         */
        addNode:function (obj)
        {
            var node = new h5c3.LinkedNode();
            node.obj = obj;
            node.prevLinked = null;
            node.nextLinked = null;
            node.free = false;
            this.objToNodeMap.put(obj.getUniqueId(), node);
            return node;
        },

        /**
		 * @method add()
         * Add an item to the list
         * @param obj The object to add
         */
        add:function (obj)
        {
            var node = this.getNode(obj);
            if (node == null)
            {
                node = this.addNode(obj);
            } else
            {
                // if the object is already in the list just throw an (can't add an object more than once)
                // if you want to quickly check if an item is already in a list, then call list.has(obj)
                if (node.free === false)
                    throw 'Attempting to add object: ' + obj.getUniqueId() + ' twice to list ' + this.getUniqueId();

                // reusing a node, so we clean it up
                // this caching of node/object pairs is the reason an object can only exist
                // once in a list -- which also makes things faster (not always creating new node
                // object every time objects are moving on and off the list
                node.obj = obj;
                node.free = false;
                node.nextLinked = null;
                node.prevLinked = null;
            }

            // append this obj to the end of the list
            if (this.first == null) // is this the first?
            {
                this.first = node;
                this.last = node;
                node.nextLinked = null; // clear just in case
                node.prevLinked = null;
            } else
            {
                if (this.last == null)
                    throw "Hmm, no last in the list -- that shouldn't happen here";

                // add this entry to the end of the list
                this.last.nextLinked = node; // current end of list points to the new end
                node.prevLinked = this.last;
                this.last = node;            // new object to add becomes last in the list
                node.nextLinked = null;      // just in case this was previously set
            }
            this.count++;

            if (this.showDebug) this.dump('after add');
        },

		/**
		 * @method has()
		 * @param {object}
		 * @return {boolean}
		 */
        has:function (obj)
        {
            var node = this.getNode(obj);
            return !(node === null || node.free === true);
        },

        /**
         * Moves this item upwards in the list
		 * @method moveUp()
         * @param obj
         */
        moveUp:function (obj)
        {
            this.dump('before move up');
            var c = this.getNode(obj);
            if (!c) throw "Oops, trying to move an object that isn't in the list";
            if (c.prevLinked == null) return; // already first, ignore

            // This operation makes C swap places with B:
            // A <-> B <-> C <-> D
            // A <-> C <-> B <-> D

            var b = c.prevLinked;
            var a = b.prevLinked;

            // fix last
            if (c == this.last)
                this.last = b;

            var oldCNext = c.nextLinked;

            if (a)
                a.nextLinked = c;
            c.nextLinked = b;
            c.prevLinked = b.prevLinked;

            b.nextLinked = oldCNext;
            b.prevLinked = c;

            // check to see if we are now first
            if (this.first == b)
                this.first = c;
        },

        /**
         * Moves this item downwards in the list
		 * @method moveDown()
         * @param obj
         */
        moveDown:function (obj)
        {
            var b = this.getNode(obj);
            if (!b) throw "Oops, trying to move an object that isn't in the list";
            if (b.nextLinked == null) return; // already last, ignore

            // This operation makes B swap places with C:
            // A <-> B <-> C <-> D
            // A <-> C <-> B <-> D

            var c = b.nextLinked;
            this.moveUp(c.obj);

            // check to see if we are now last
            if (this.last == c)
                this.last = b;
        },

        /**
         * Sorts the list
		 * @method sort()
         * @param obj
         */
        sort:function (compare)
        {
            // take everything off the list and put it in an array
            var sortArray = [];
            var node = this.first;
            while (node)
            {
                sortArray.push(node.object());
                node = node.next();
            }

            this.clear();

            // sort it
            sortArray.sort(compare);

            // then put it back
            for (var i = 0; i < sortArray.length; i++)
                this.add(sortArray[i]);
        },

        /**
         * Removes an item from the list
		 * @method remove()
         * @param obj The object to remove
         * @return boolean true if the item was removed, false if the item was not on the list
         */
        remove:function (obj)
        {
            if (this.showDebug) this.dump('before remove of ' + obj);
            var node = this.getNode(obj);
            if (node === null || node.free === true)
                return false; // ignore this error (trying to remove something not there
            //throw ('Error: trying to remove a node (' + obj + ') that isnt on the list ');

            // pull this object out and tie up the ends
            if (node.prevLinked != null)
                node.prevLinked.nextLinked = node.nextLinked;
            if (node.nextLinked != null)
                node.nextLinked.prevLinked = node.prevLinked;

            // fix first and last
            if (node.prevLinked == null) // if this was first on the list
                this.first = node.nextLinked; // make the next on the list first (can be null)
            if (node.nextLinked == null) // if this was the last
                this.last = node.prevLinked; // then this nodes previous becomes last

            node.free = true;
            node.prevLinked = null;
            node.nextLinked = null;

            this.count--;
            if (this.showDebug) this.dump('after remove');

            return true;
        },

        /**
         * Clears the list out
		 * @method clear()
         */
        clear:function ()
        {
            // sweep the list and free all the nodes
            var next = this.first;
            while (next != null)
            {
                next.free = true;
                next = next.nextLinked;
            }
            this.first = null;
            this.count = 0;
        },

        /**
		 * get the total number of nodes
		 * @method sort()
         * @return number of items in the list
         */
        length:function ()
        {
            return this.count;
        },

        /**
		 * @method dump()
         * Outputs the contents of the current list. Usually for debugging.
         */
        dump:function (msg)
        {
           _DBG_('====================' + msg + '=====================',this.Class);
            var a = this.first;
            while (a != null) {
                _DBG_("{" + a.obj.toString() + "} previous=" + ( a.prevLinked ? a.prevLinked.obj : "NULL"),this.Class);
                a = a.next();
            }
			
			var $out = "Last: {" + (this.last ? this.last.obj : 'NULL') + "} First: {" + (this.first ? this.first.obj : 'NULL') + "}";

           _DBG_("===================================",this.Class);
           _DBG_($out,this.Class);
        }

    });

/**
 * @class h5c3.PerformanceMeasure
 * Example:
 * <code>
 * var measure = new h5c3.PerformanceMeasure('A test');
 * // ... do something
 * console.log(measure.end()); // end returns a string you can easily log
 * </code>
 *
 * The memory count is an idea based on a delta of the useJSHeapSize exposed by Chrome.
 * You will need to restart Chrome with --enable-memory-info to have this exposed.
 * It is however, not very reliable as the value will jump around due to gc runs (I think).
 * So far it seems to produce reliable results that are consistent, however memStart > memEnd
 * cases still occur and it would be good to understand this more (is it limited only to GC
 * runs? if so, why is it so consistent?).
 */
h5c3.PerformanceMeasure = h5c3.Base.extend('h5c3.PerformanceMeasure',
    /** @lends h5c3.PerformanceMeasure */
{
	_CLASSNAME: 'PerformanceMeasure',
	_CLASSVERSION:'0.1.0',
    history: [],

    /**
	 * @method clearhistory()
     * Clears the performance history
     */
    clearHistory: function()
    {
        history.length = 0;
    }
},{
	/** @property timeStart */
    timeStart: 0,

	/** @property timeEnd */
    timeEnd: 0,

	/** @property timeDelat */
    timeDelat: 0,

	/** @property memStart */
    memStart: 0,

	/** @property memEnd */
    memEnd: 0,

	/** @property memDelta */
    memDelta: 0,

	/** @property description */
    description: null,

    /**
     * Constructs a new performance measure with description
	 * @constructor
     * @param description
     */
    init: function(description)
    {
        this.description = description;
        this.start();
        this.Class.history.push(this);
    },

    /**
     * Starts a performance measure
	 * @method start()
	 * @return {none}
     */
    start: function()
    {
        this.timeStart = Date.now();
        this.memStart = h5c3.Device.getUsedHeap();
    },

    /**
     * Ends a performance measure, and for convenience returns a toString of the measurement
	 * @method end()
     * @return String representing the measurement
     */
    end: function()
    {
        this.timeEnd = Date.now();
        this.timeDelta = this.timeEnd - this.timeStart;
        this.memEnd = h5c3.Device.getUsedHeap();

        if (this.memEnd < this.memStart)
            this.memDelta = 0;
        else
            this.memDelta = this.memEnd - this.memStart;
        return this.toString();
    },

    /**
     * Reports the performance measurement in a nice clean way
	 * @method toString()
	 * @return {String}
     */
    toString: function()
    {
        return this.description + ' took ' + this.timeDelta + 'ms, ' +
            (this.memDelta == 0 ? 'unknown':this.memDelta) + ' byte(s)';
    }

});

/**
 * @class h5c3.Pool
 * Easy (high-performance) object pooling
 *
 * A pool of objects for use in situations where you want to minimize object life cycling (and
 * subsequently garbage collection). It also serves as a very high speed, minimal overhead
 * collection for small numbers of objects.
 * <p>
 * This class maintains mutual an array of objects which are free. If you wish to maintain a list of both
 * free and used then see the h5c3.DualPool.
 * <p>
 * Pools are managed by class type, and will auto-expand as required. You can create a custom initial pool
 * size by deriving from the Pool class and statically overriding INITIAL_POOL_SIZE.
 * <p>
 * Keep in mind that objects that are pooled are not constructed; they are "reset" when handed out.
 * You need to "acquire" one and then reset its state, usually via a static create factory method.
 * <p>
 * Example:
 * <pre><code>
 * Point = h5c3.Pooled('Point',
 * {
 *   // Static constructor
 *   create:function (x, y)
 *   {
 *      var n = this._super();
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
 */
h5c3.Pool = h5c3.Base.extend('h5c3.Pool',
    /** @lends h5c3.Pool */
    {
		_CLASSNAME:'Pool',
		_CLASSVERSION:'0.1.0',
        /** Initial size of all object pools */
        INITIAL_POOL_SIZE:1,

        /** Hashtable of ALL the object pools */
        pools:new h5c3.Hashtable(),
        /** total objects in all pools */
        totalPooled:0,
        /** total objects in use right now */
        totalUsed:0,

        /**
         * Acquire an object from a pool based on the class[name]. Typically this method is
         * automatically called from Pooled.create method and should not be used directly.
		 * @method acquire()
         * @param {String} classType Class of object to create
         * @return {h5c3.Pooled} A shiny object you can then configure
         */
        acquire:function (classType)
        {
            var pool = this.getPool(classType);
            if (pool == undefined || pool == null)
            {
                // create a pool for this type of class
                //this.info('Constructing a new pool for ' + classType.fullName + ' objects.');
                pool = new h5c3.Pool(classType, this.INITIAL_POOL_SIZE);
                this.pools.put(classType.fullName, pool);
            }

            return pool.acquire();
        },

        /**
         * Releases an object back into it's corresponding object pool
		 * @method release()
         * @param {h5c3.Pooled} pooledObj Object to return to the pool
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
		 * @method getPool()
         * @return {h5c3.Pool} Object pool associated with the class type
         */
        getPool:function (classType)
        {
            return this.pools.get(classType.fullName);
        },

        /**
         * Gets stats on the usage of all pools.
		 * @method getStats()
         * @return {String} Stats string
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
    /** @lends h5c3.Pool.prototype */
    {
        /** Linked list of currently free objects residing in the pool */
        freeList:null,
        /** Current number of items to expand by: will increase with every expansion */
        expansion: 1,
        /** Array of traces currently active. Tracing must be on. */
        traces: null,

        /**
         * Constructs a pool. Will automatically be called by the static pool method. Generally not called directly.
		 * @constructor 
         * @param {String} classType Class name of the type of objects in the pool
         * @param {Number} initial Starting number of objects in the pool
         */
        init:function (classType, initial)
        {
            this._super();
            this.classType = classType;
            this.freeList = [];

            // instantiate the initial objects for the pool
            this.expand(initial);
        },

        /**
         * Enables tracing on this pool.
		 * @method startTracing()
         */
        startTracing:function ()
        {
            if (this.tracing) return;
            this.tracing = true;
            if (this.traces)
                this.traces.clear();
            else
                this.traces = new h5c3.Hashtable();
        },

        /**
         * Disables tracing on this pool.
		 * @method stopTracing()
         */
        stopTracing:function ()
        {
            this.tracing = false;
        },

        /**
         * Expand the pool of objects by constructing a bunch of new ones. The pool will
         * automatically expand itself by 10% each time it runs out of space, so generally you
         * shouldn't need to use this.
		 * @method expand()
         * @param {Number} howMany Number of new objects you want to add
         */
        expand:function (howMany)
        {
            h5c3.Pool.totalPooled += howMany;

            //debug: if you want to track expansion
            //this.debug('expanding ' + this.classType.fullName + ' by ' + howMany + ' total=' + h5c3.Pool.totalPooled);

            for (var i = 0; i < howMany; i++)
                this.freeList.push(new this.classType());
        },

        /**
         * Gets the free count of objects left in the pool
		 * @method getFreeCount()
         * @return {Number} Number free
         */
        getFreeCount: function()
        {
            return this.freeList.length;
        },

        /**
         * Returns the next free object by moving it from the free pool to the used one. If no free objects are
         * available it will expand the pool
		 * @method acquire()
         * @return {h5c3.Pooled} A pooled object
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

            if (this.tracing)
            {
                var stack = printStackTrace();
                var pos = stack.length - 1;
                while (stack[pos].indexOf('Class.addTo') == 0 && pos > 0)
                    pos--;
                var count = this.traces.get(stack[pos]);
                if (count == null)
                    this.traces.put(stack[pos], { value:1 });
                else
                    count.value++;
            }

            return this.freeList.pop();
        },

        /**
         * Releases an object by moving it back onto the free pool
		 * @method release()
         * @param {h5c3.Pooled} obj The obj to release back into the pool
         */
        release:function (obj)
        {
            this.freeList.push(obj);
        },

        /**
         * Gets stats about the pool
		 * @method getStats()
         * @return {String} Stats
         */
        getStats:function ()
        {
            var s = this.Class.fullName + ' stats: ' + this.freeList.length + ' free.';

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
		 * @method dump()
         * @param {String} msg A string to write before the dump
         */
        dump:function (msg)
        {
            this.info('================== ' + msg + ' ===================');
            this.info('FREE');
            this.freeList.dump();
        },

        /**
         * Returns the number of objects in the pool
		 * @method size()
         * @return {Number} Total objects
         */
        size:function ()
        {
            return this.freeList.length;
        },

        /**
         * Returns the LinkedList of currently free objects in the pool
		 * @method getFreeList()
         * @return {h5c3.LinkedList} List of free objects
         */
        getFreeList:function ()
        {
            return this.freeList;
        }

    });

/**
 * @class h5c3.DualPool
 * 
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
 * Point = h5c3.Pooled('Point',
 * {
 *   // Static constructor
 *   create:function (x, y)
 *   {
 *      var n = this._super();
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
 */
h5c3.DualPool = h5c3.Pool.extend('h5c3.DualPool',
    /** @lends h5c3.DualPool */
    {
		_CLASSNAME: 'DualPool',
		_CLASSVERSION:'0.1.0',
        /**
         * Acquire an object from a pool based on the class[name]. Typically this method is
         * automatically called from Pooled.create method and should not be used directly.
		 * @method acquire()
         * @param {String} classType Class of object to create
         * @return {h5c3.Pooled} A shiny object you can then configure
         */
        acquire:function (classType)
        {
            var pool = this.getPool(classType);
            if (pool == undefined || pool == null)
            {
                pool = new h5c3.DualPool(classType, this.INITIAL_POOL_SIZE);
                this.pools.put(classType.fullName, pool);
            }

            return pool.acquire();
        },

        /**
         * Gets stats on the usage of all pools.
		 * @method getStats()
         * @return {String} Stats string
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
    /** @lends h5c3.DualPool.prototype */
    {
        /** Linked list of currently free objects residing in the pool */
        freeList:null,
        /** Linked list of currently used objects not in the pool */
        usedList:null,

        /**
         * Constructs a pool. Will automatically be called by the static pool method. Generally not called directly.
		 * @constructor 
         * @param {String} classType Class name of the type of objects in the pool
         * @param {Number} initial Starting number of objects in the pool
         */
        init:function (classType, initial)
        {
            this.classType = classType;
            this.usedList = new h5c3.LinkedList();
            this.freeList = new h5c3.LinkedList();

            // instantiate the initial objects for the pool
            this.expand(initial);
        },

        /**
         * Expand the pool of objects by constructing a bunch of new ones. The pool will
         * automatically expand itself by 10% each time it runs out of space, so generally you
         * shouldn't need to use this.
		 * @method expand()
         * @param {Number} howMany Number of new objects you want to add
         */
        expand:function (howMany)
        {
            h5c3.Pool.totalPooled += howMany;
            for (var i = 0; i < howMany; i++)
                this.freeList.add(new this.classType());
        },

        returnObj:null,

        /**
         * Returns the next free object by moving it from the free pool to the used one.
		 * @method acquire()
         * @return {h5c3.DualPooled} A pooled object you can then configure
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

            if (this.tracing)
            {
                var stack = printStackTrace();
                var pos = stack.length - 1;
                while (stack[pos].indexOf('Class.addTo') == 0 && pos > 0)
                    pos--;
                var count = this.traces.get(stack[pos]);
                if (count == null)
                    this.traces.put(stack[pos], { value:1 });
                else
                    count.value++;
            }

            return this.returnObj;
        },

        /**
         * Releases an object by moving it from the used list back to the free list.
		 * @method release()
         * @param obj {h5c3.DualPooled} The obj to release back into the pool
         */
        release:function (obj)
        {
            this.freeList.add(obj);
            this.usedList.remove(obj);
        },

        /**
         * Dumps stats about usage to the debug info (generally console)
		 * @method dump()
         * @param {String} msg Message to display before the dump
         */
        dump:function (msg)
        {
            this.info('================== ' + msg + ' ===================');
            this.info('FREE');
            this.freeList.dump();
            this.info('USED');
            this.usedList.dump();
        },

        /**
         * Returns the number of objects in both the free and used pool
         */
        size:function ()
        {
            return this.freeList.count + this.usedList.count;
        },

        /**
         * Returns the LinkedList of current used objects
		 * @method getUsedList()
         * @return {h5c3.LinkedList}
         */
        getUsedList:function ()
        {
            return this.usedList;
        }
    });

/**
 * @class h5c3.Pooled
 * 
 * Used as a base class for objects which are life cycle managed in an object pool.
 */
h5c3.Pooled = h5c3.Base.extend('h5c3.Pooled', {
    /** @lends h5c3.Pooled */ 
		_CLASSNAME: 'Pooled',
		_CLASSVERSION:'0.1.0',
        /**
         * Static factory method for creating a new object based on its class. This method
         * should be called using this._super from the Class.create that derives from this.
         * @return {h5c3.Pooled} An object from the pool
         */
        create:function ()
        {
            return h5c3.Pool.acquire(this);
        },

        /**
         * Get the object pool associated with this object class
		 * @method getPool()
         * @return {h5c3.Pool} The object pool
         */
        getPool:function ()
        {
            return h5c3.Pool.getPool(this);
        }

    },
    /** @lends h5c3.Pooled.prototype */
    {
        /** Has the object been destroyed (returned to the pool) */
        destroyed:false,

        /**
         * Constructor for the object (default calls base class init)
		 * @method init()
         */
        init:function ()
        {
            this._super();
        },

        /**
         * Release the object back into the pool
		 * @method release()
         */
        release:function ()
        {
            this.onRelease();
            h5c3.Pool.release(this);
        },

        /**
         * Template callback when an object is released; gives you a chance to do your own cleanup / releasing
		 * @event acquire()
         */
        onRelease:function ()
        {
        }

    });

/**
 * @class h5c3.DualPooled
 * 
 * Used as a base class for objects which are life cycle managed in an object pool (the DualPool edition)
 */
h5c3.DualPooled = h5c3.Base.extend('h5c3.DualPooled', {
    /** @lends h5c3.DualPool */
		_CLASSNAME: 'DualPooled',
		_CLASSVERSION:'0.1.0',
        /**
         * Static factory method for creating a new object based on its class. This method
         * should be called using this._super from the Class.create that derives from this.
         * @return {h5c3.Pooled} An object from the pool
         */
        create:function ()
        {
            return h5c3.DualPool.acquire(this);
        },

        /**
         * Get the object pool associated with this object class
		 * @method getPool()
         * @return {h5c3.Pool} The object pool
         */
        getPool:function ()
        {
            return h5c3.DualPool.getPool(this);
        }

    },
    /** @lends h5c3.DualPool.prototype */
    {
        /** Has the object been destroyed (returned to the pool) */
        destroyed:false,

        /**
         * Constructor for the object (default calls base class init)
		 * @method init()
         */
        init:function ()
        {
            this._super();
        },

        /**
         * Release the object back into the pool
		 * @method release()
         */
        release:function ()
        {
            this.onRelease();
            h5c3.DualPool.release(this);
        },

        /**
         * Template callback when an object is released; gives you a chance to do your own cleanup / releasing
		 * @event acquire()
         */
        onRelease:function ()
        {
        }

    });
	
/**
 * @property factories	Container
 * Container for all Factory objects.
 */
h5c3.factories = {};
/**
 * @property Array 	plugin	
 * Container for all plugins components.
 */
h5c3.plugin = new h5c3.Hashtable();
/**
 * @property Array systems		
 * Container for all loaded Systems.
 */
h5c3.systems = new h5c3.Hashtable();
/**
 * @property Array components		
 * Container for all loaded components.
 */
h5c3.components = new h5c3.Hashtable();

_DBG_(h5c3.tag() + ' loaded.',h5c3);
