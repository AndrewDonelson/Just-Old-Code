/** 
 * Class Inheritance for Maestro
 *
 * @namespace Core
 * @file maestro.core.js (#3) in combine sequence.
 * @memberof Maestro
 * FINALIZED
 */

/** 
 * @class Core
 * @expose
 * @memberof Maestro
 * Advanced Optimization Compliant
 */
(function (m$) {
	m$['toString']=function(){return 'Maestro Core'};
	/** 
	 * Place holder for all Exposed method and properties
	 * @expose 
	 * @memberof Core
	 */
    m$['expose']={};
	/** 
	 * Place holder for Class Definition
	 * @expose 
	 * @memberof Core
	 */
    m$['Class']=undefined;
	
	/** 
	 * @expose 
	 * @memberof Core
	 */
    m$['hasOwn']=Object.prototype.hasOwnProperty;

	/**
	 * Get a property name as a string.
	 *
	 * @example var pn = propName(fruit, fruit.apple); // returns 'apple'
	 * @method propName
	 * @expose
	 * @param {string} prop
	 * @param {string} value
	 * @returns {string|undefined}
	 * @memberof Core
	 */
	m$['propName']=function (prop, value)
	{
		for (var i in prop) {
			if (typeof prop[i] == 'object') {
				if (propName(prop[i], value)) {
					return res;
				}
			} else {
				if (prop[i] == value) {
					res = i;
					return res;
				}
			}
		}
		return undefined;
	};
	
	/**
	 * Description
	 * @method isFunction
	 * @expose
	 * @param {*} obj
	 * @returns {boolean}
	 * @memberof Core
	 */
    m$['isFunction']=function (obj)
    {
       return !!(obj && obj.constructor && obj.call && obj.apply);
    };

	/**
	 * returns true if object is window
	 * @method isWindow
	 * @expose
	 * @param {*} obj
	 * @returns {boolean}
	 * @memberof Core
	 */
    m$['isWindow']=function (obj)
    {
        return !!(obj && obj.setInterval);
    };

	/**
	 * returns true if parameter is an array
	 * @method isArray
	 * @expose
	 * @param {*} obj
	 * @returns {boolean}
	 * @memberof Core
	 */
    m$['isArray']=Array.isArray || function (obj)
    {
        return (obj.constructor === Array);
    };

	/**
	 * Returns true if parameter is a string
	 * @method isString
	 * @expose
	 * @param {*} obj
	 * @returns {boolean}
	 * @memberof Core
	 */
    m$['isString']=function (obj)
    {
        return (typeof obj == 'string');
    };

	/**
	 * returns true if parameter is an object
	 * @method isObject
	 * @expose
	 * @param {*} obj
	 * @returns {boolean}
	 * @memberof Core
	 */
    m$['isObject']=function (obj)
    {
        return obj === Object(obj);
    };

	/**
	 * Returns true if the parameter is a Plain object
	 * @method isPlainObject
	 * @expose
	 * @this {Object}
	 * @param {*} obj
	 * @returns {boolean}
	 * @memberof Core
	 */
    m$['isPlainObject']=function (obj)
    {
        // Must be an Object.
        // Because of IE, we also have to check the presence of the constructor property.
        // Make sure that DOM nodes and window objects don't pass through, as well
        if (!obj || this.isObject(obj) || obj.nodeType || this.isWindow(obj))
            return false;

        try
        {
            // Not own constructor property must be Object
            if (obj.constructor && !this.hasOwn.call(obj, "constructor") && !this.hasOwn.call(obj.constructor.prototype, "isPrototypeOf"))
                return false;

        } catch (e)
        {
            // IE8,9 Will throw exceptions on certain host objects #9897
            return false;
        }

        // own properties are enumerated firstly, so to speed up, if last one is own, then all properties are own.
        var key;
        for (key in obj)
        {
        }

        return key === undefined || this.hasOwn.call(obj, key);
    };
	
	/**
	 * Returns true if the given parameter is either a function or object
	 *
	 * @method isContainer
	 * @expose
	 * @param {*} current
	 * @returns {*} 
	 * @memberof Core
	 */
	m$['isContainer']=function (current)
	{
		var type = typeof current;
		return type && (  type == 'function' || type == 'object' );
	};
	
	/**
	 * Extends a class
	 * @method extend
	 * @expose
	 * @this {Object}
	 * @returns {Object}
	 * @memberof Core
	 */
    m$['extend']=function ()
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
        if (typeof target !== "object" && !m$['isFunction'](target))
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
                    if (deep && copy && ( m$['isPlainObject'](copy) || (copyIsArray = m$['isArray'](copy)) ))
                    {
                        if (copyIsArray)
                        {
                            copyIsArray = false;
                            clone = src && this['isArray'](src) ? src : [];

                        } else
                        {
                            clone = src && this['isPlainObject'](src) ? src : {};
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
    }
})(P$['interfaces']['Core']);
//};


P$['interfaces']['Core'].push = Array.prototype.push;

/**
 * Merge two objects into one
 *
 * @method merge
 * @expose
 * @param {Object} first
 * @param {Object} second
 * @returns {Object} first
 * @memberof Core
 */
P$['interfaces']['Core'].merge = function (first, second)
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

/**
 * creates on array
 * @method makeArray
 * @expose
 * @param {Array} array
 * @param {Array} results
 * @returns Array
 * @memberof Core
 */
P$['interfaces']['Core']['makeArray'] = function (array, results)
{
    var a=P$['interfaces']['Core'],ret = results || [];

    if (array != null)
    {
        // The window, strings (and functions) also have 'length'
        // Tweaked logic slightly to handle Blackberry 4.7 RegExp issues #6930
        if (array.length == null || a['isString'](array) || a['isFunction'](array) || a['isWindow'](array))
            a['push'].call(ret, array);
        else
            a['merge'](ret, array);
    }

    return ret;
};


/**
 * 
 * @method each
 * @expose
 * @param {Object} object
 * @callback callback
 * @param {Object} args
 * @returns Object
 * @memberof Core
 */
P$['interfaces']['Core'].each = function (object, callback, args)
{
    var name, i = 0,
        length = object.length,
        isObj = length === undefined || P$['interfaces']['Core'].isFunction(object);

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
 * @expose 
 * @memberof Core
 */
P$['interfaces']['Core']._flagsCache = {};

/**
 * 
 * @method createFlags
 * @expose
 * @param {Object} flags
 * @returns Object
 * @memberof Core
 */
P$['interfaces']['Core'].createFlags = function (flags)
{
    var object = P$['interfaces']['Core']._flagsCache[ flags ] = {}, i, length;
    flags = flags.split(/\s+/);
    for (i = 0, length = flags.length; i < length; i++)
        object[ flags[i] ] = true;
    return object;
};

/**
 * 
 * @method Callbacks
 * @expose
 * @param {Object} flags
 * @returns self
 * @namespace Callbacks
 * @memberof Core
 */
P$['interfaces']['Core'].Callbacks = function (flags)
{
    // Convert flags from String-formatted to Object-formatted
    // (we check in cache first)
    flags = flags ? ( P$['interfaces']['Core']._flagsCache[ flags ] || P$['interfaces']['Core'].createFlags(flags) ) : {};

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
		
		/**
		 * Add one or several callbacks to the list
		 *
		 * @method add
		 * @expose
		 * @param {Array}	args
		 * @memberof Callbacks
		 */	
        add = function (args)
        {
            var i, length, elem, actual;

            for (i = 0, length = args.length; i < length; i++)
            {
                elem = args[ i ];
                if (P$['interfaces']['Core'].isArray(elem))
                {
                    // Inspect recursively
                    add(elem);
                } else if (P$['interfaces']['Core'].isFunction(elem))
                {
                    // Add if not in unique mode and callback is not in
                    if (!flags.unique || !self.has(elem))
                    {
                        list.push(elem);
                    }
                }
            }
        },
		/**
		 * Fire callbacks
		 *
		 * @method fire
		 * @expose
		 * @param {Object}	context
		 * @param {Array}	args
		 * @memberof Callbacks
		 */
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
		/**
		 * Actual Callbacks object
		 *
		 * @instance self
		 * @expose
		 * @memberof Callbacks
		 */
        self = {
			toString : function(){return 'Callbacks'},
			/**
			 * Add a callback or a collection of callbacks to the list
			 *
			 * @method add
			 * @expose
			 * @returns {Array|null}
			 * @namespace self
			 * @memberof Callbacks
			 */
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
			/**
			 * Remove a callback from the list
			 *
			 * @method remove
			 * @expose
			 * @returns {Object}
			 * @memberof self
			 */
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
			/**
			 * Control if a given callback is in the list
			 *
			 * @method has
			 * @expose
			 * @param {function} fn
			 * @returns {boolean}
			 * @memberof self
			 */
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
			/**
			 * Remove all callbacks from the list
			 *
			 * @method empty
			 * @expose
			 * @returns {Object}
			 * @memberof self
			 */
            empty:function ()
            {
                list = [];
                return this;
            },
			/**
			 * Have the list do nothing any more
			 *
			 * @method disable
			 * @expose
			 * @returns {Object}
			 * @memberof self
			 */
			disable:function ()
            {
                list = stack = memory = undefined;
                return this;
            },
			/**
			 * Is it disabled?
			 *
			 * @method disabled
			 * @expose
			 * @returns {boolean}
			 * @memberof self
			 */
            disabled:function ()
            {
                return !list;
            },
			/**
			 * Lock the list in its current state
			 *
			 * @method lock
			 * @expose
			 * @returns {Object}
			 * @memberof self
			 */
            lock:function ()
            {
                stack = undefined;
                if (!memory || memory === true)
                {
                    self.disable();
                }
                return this;
            },
			/**
			 * Is it locked?
			 *
			 * @method locked
			 * @expose
			 * @returns {boolean}
			 * @memberof self
			 */
            locked:function ()
            {
                return !stack;
            },
			/**
			 * Call all callbacks with the given context and arguments
			 *
			 * @method fireWith
			 * @expose
			 * @param {Object} context
			 * @param {Array} args
			 * @returns {Object}
			 * @memberof self
			 */
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
			/**
			 * Call all the callbacks with the given arguments
			 *
			 * @method fire
			 * @expose
			 * @returns {Array|null}
			 * @memberof self
			 */
            fire:function ()
            {
                self.fireWith(this, arguments);
                return this;
            },
			/**
			 * To know if the callbacks have already been called at least once
			 *
			 * @method fired
			 * @expose
			 * @returns {boolean}
			 * @memberof self
			 */
            fired:function ()
            {
                return !!memory;
            }
        };

    return self;
};

/**
 * @class Deferred
 * @memberof Core
 */
P$['interfaces']['Core'].extend({

	/**
	 * A constructor function that returns a chainable utility 
	 * object with methods to register multiple callbacks into 
	 * callback queues, invoke callback queues, and relay the 
	 * success or failure state of any synchronous or asynchronous 
	 * function. This is a modified version of jQuery.Deferred 
	 * for native JavaScript.
	 *
	 * @constructor Deferred
	 * @expose
	 * @param {Function} func (optional)
	 * @returns deferred
	 * @memberof Callbacks
	 */
    Deferred:function (func)
    {
        var doneList = P$['interfaces']['Core'].Callbacks("once memory"),
            failList = P$['interfaces']['Core'].Callbacks("once memory"),
            progressList = P$['interfaces']['Core'].Callbacks("memory"),
            state = "pending",
            lists = {
                resolve:doneList,
                reject:failList,
                notify:progressList
            },
			toString = function(){return 'Deferred Object'},//=-=|DEBUG|=-=//
			/**
			 * @expose
			 * @instance
			 * @namespace promise
			 * @memberof Deferred
			 */
            promise = {
				toString : function(){return 'Promise Object'},//=-=|DEBUG|=-=//
                done:doneList.add,
                fail:failList.add,
                progress:progressList.add,

				/**
				 * Description
				 * @method state
				 * @expose
				 * @returns state
				 * @memberof promise
				 */
                state:function ()
                {
                    return state;
                },

                // Deprecated
                isResolved:doneList.fired,
                isRejected:failList.fired,

				/**
				 * Add handlers to be called when the Deferred object is 
				 * resolved, rejected, or still in progress.
				 *
				 * @method then
				 * @expose
				 * @param {Function} doneCallbacks
				 * @param {Function} failCallbacks
				 * @param {Function} progressCallbacks
				 * @returns {Object} Promise
				 * @memberof promise
				 */
                then:function (doneCallbacks, failCallbacks, progressCallbacks)
                {
                    deferred.done(doneCallbacks).fail(failCallbacks).progress(progressCallbacks);
                    return this;
                },
				/**
				 * Add handlers to be called when the Deferred object 
				 * is either resolved or rejected.
				 *
				 * @method always
				 * @expose
				 * @returns {Object} Deferred
				 * @memberof promise
				 */
                always:function ()
                {
                    deferred.done.apply(deferred, arguments).fail.apply(deferred, arguments);
                    return this;
                },
				/**
				 * Utility method to filter and/or chain Deferreds.
				 *
				 * @method pipe
				 * @expose
				 * @param {Function} fnDone
				 * @param {Function} fnFail
				 * @param {Function} fnProgress
				 * @returns {Object} Promise
				 * @memberof promise
				 */
                pipe:function (fnDone, fnFail, fnProgress)
                {
                    return P$['interfaces']['Core'].Deferred(function (newDefer)
                    {
                        P$['interfaces']['Core'].each({
                            done:[ fnDone, "resolve" ],
                            fail:[ fnFail, "reject" ],
                            progress:[ fnProgress, "notify" ]
                        }, function (handler, data)
                        {
                            var fn = data[ 0 ],
                                action = data[ 1 ],
                                returned;
                            if (P$['interfaces']['Core'].isFunction(fn))
                            {
                                deferred[ handler ](function ()
                                {
                                    returned = fn.apply(this, arguments);
                                    if (returned && P$['interfaces']['Core'].isFunction(returned.promise))
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
				/**
				 * Get a promise for this deferred. If obj is provided, the 
				 * promise aspect is added to the object
				 * @constructor
				 * @expose
				 * @param {} obj
				 * @returns obj
				 * @memberof promise
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

        // Handle state
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

	/**
	 * Deferred helper
	 * @method when
	 * @expose
	 * @param {} firstParam
	 * @returns promise
	 * @memberof Callbacks
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
            pCount = length,
            deferred = length <= 1 && firstParam && P$['interfaces']['Core'].isFunction(firstParam.promise) ?
                firstParam :
                P$['interfaces']['Core'].Deferred(),
            promise = deferred.promise();

		/**
		 * Description
		 * @method resolveFunc
		 * @expose
		 * @param {} i
		 * @returns FunctionExpression
		 * @memberof Callbacks
		 */
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

		/**
		 * Description
		 * @method progressFunc
		 * @param {} i
		 * @returns FunctionExpression
		 * @memberof Callbacks
		 */
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
                if (args[ i ] && args[ i ].promise && P$['interfaces']['Core'].isFunction(args[ i ].promise))
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

/**
 * A modified version of class.js to cater to static inheritance and deep object cloning
 * Based almost completely on class.js (Javascript MVC -- Justin Meyer, Brian Moschel, Michael Mayer and others)
 * (http://javascriptmvc.com/contribute.html)
 * Some portions adapted from Prototype JavaScript framework, version 1.6.0.1 (c) 2005-2007 Sam Stephenson
 * Some portions extracted from jQuery 1.7
 * <p>
 * Class system for javascript
 * <p>
 * <code>
 *   var Fighter = P$['interfaces']['Core'].Base.extend('Fighter',
 *   {
 *       // static (this is inherited as well)
 *       firingSpeed: 1000
 *   },
 *   {
 *       // instance
 *
 *       hp: 0,
 *       lastFireTime: 0,
 *
 *       init: function(hp)
 *       {
 *           this.hp = hp;
 *       },
 *
 *       fire: function()
 *       {
 *           this._super(); // super methods!
 *
 *           // do firing!
 *       }
 *   });
 *
 *  var gunship = new Fighter(100);
 * </code>
 *
 * Introspection:
 * <code>
 *   P$['interfaces']['Core'].Base.extend(‘Fighter.Gunship’);
 *   Fighter.Gunship.shortName; // ‘Gunship’
 *   Fighter.Gunship.fullName;  // ‘Fighter.Gunship’
 *   Fighter.Gunship.namespace; // ‘Fighter’
 * </code>
 * <p>
 * Setup method will be called prior to any init -- nice if you want to do things without needing the
 * users to call _super in the init, as well as for normalizing parameters.
 * <code>
 *   setup: function()
 *   {
 *      this.objectId = this.Class.totalObjects++;
 *      this.uniqueId = this.Class.fullName + ':' + this.objectId;
 *   }
 * </code>
 * @class Class
 * @memberof Core
 */
(function (m$)
{
	/**
	 * @method getNext
	 * @expose
	 * @param {*} current
	 * @param {string} nextPart
	 * @param {boolean} add
	 * @returns {*} 
	 * @memberof Core
	 */
	m$['getNext'] = function (current, nextPart, add)
	{
		return current[nextPart] || ( add && (current[nextPart] = {}) );
	};
	/**
	 * Gets an object from a string.
	 *
	 * @method getObject
	 * @expose
	 * @param {String} name the name of the object to look for
	 * @param {Array} [roots] an array of root objects to look for the name
	 * @param {Boolean} [add] true to add missing objects to
	 *  the path. false to remove found properties. undefined to
	 *  not modify the root object
	 * @returns {String} 
	 * @memberof Core
	 */
	m$['getObject'] = function (objectName, roots, add)
	{
		var parts = objectName ? objectName.split(/\./) : [],
			length = parts.length,
			currents = m$['isArray'](roots) ? roots : [roots || window],
			current,
			ret,
			i,
			c = 0,
			type;

		if (length == 0)
		{
			return currents[0];
		}
		while (current = currents[c++])
		{
			for (i = 0; i < length - 1 && m$['isContainer'](current); i++)
			{
				current = m$['getNext'](current, parts[i], add);
			}
			if (m$['isContainer'](current))
			{

				ret = m$['getNext'](current, parts[i], add);

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
	}

})(P$['interfaces']['Core']);


(function (m$)
{

    var initializing = false,
        makeArray = m$['makeArray'],
        isFunction = m$['isFunction'],
        isArray = m$['isArray'],
        extend = m$['extend'],

		/**
		 * @method cloneObject
		 * @expose
		 * @param {Object} object
		 * @returns {Object}
		 * @memberof Core
		 */
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

		/**
		 * @method concatArgs
		 * @expose
		 * @param {Array} arr
		 * @param {Array} args
		 * @returns {Array}
		 * @memberof Core
		 */
        concatArgs = function (arr, args)
        {
            return arr.concat(m$['makeArray'](args));
        },
		
		/**
		 * @method inheritProps
		 * @expose
		 * @param {Object} newProps
		 * @param {Object} oldProps
		 * @param {Object} addTo
		 * @returns {*} 
		 * @memberof Core
		 */
        inheritProps = function (newProps, oldProps, addTo)
        {
			var toString = function(){return 'Inheritance Object'};//=-=|DEBUG|=-=//
		
		
			/**
			 * tests if we can get super in .toString()
			 *
			 * @method fnTest
			 * @expose
			 * @returns {String}
			 * @memberof Core
			 */
			fnTest = /xyz/.test(function ()
			{
				xyz;
			}) ? /\b_super\b/ : /.*/;
            // overwrites an object with methods, sets up _super
            // newProps - new properties
            // oldProps - where the old properties might be
            // addTo - what we are adding to
            addTo = addTo || newProps
            for (var name in newProps) {
					
                // Check if we're overwriting an existing function
                addTo[name] = 
					m$['isFunction'](newProps[name]) &&
                    m$['isFunction'](oldProps[name]) &&
                    fnTest.test(newProps[name]) 
					? 
					(function (name, fn) {
						return function () {
							//save our current _super
							var tmp = this['_super'], ret;
							
							// Add a new ._super() method that is the same method but on 
							// the super-class
							this['_super'] = oldProps[name];

							// The method only need to be bound temporarily, so we remove 
							// it when we're done executing
							ret = fn.apply(this, arguments);
							
							//reassign our original _super
							this['_super'] = tmp;
							return ret;
						};
					})(name, newProps[name]) : newProps[name];
					
				// if (m$['isFunction'](newProps[name])&&typeof newProps[name]['fname']=='undefined')			
					// (function(){
						// newProps[name]['fname']=name;
						// newProps[name].prototype.constructor.toString=(function(){return (newProps['type']+' Method')})
					// })()
            }	//END For
        },		//END inheritProps

	clss = 
	/**
	 * Base Class definition
	 *
	 * @export Interface
	 * @method 
	 * @returns {object}  Interface 
	 * @memberof Core
	 * @expose
	 */	 
	 m$['Class'] = function () {
		if (arguments.length) {
			return clss['extend'].apply(clss, arguments);
		}
	};

	/**
	 * Extend Base Class definition
	 * @class Class
	 * @expose
	 * @static
	 * @memberof Core
	 * @returns {Object} 
	 */
	extend(clss, {
		/**
		 * @method callback
		 * @expose
		 * @param {String|Array} funcs
		 * @returns {function}
		 * @memberof Class
		 */
        callback:function (funcs)
        {
            //args that should be curried
            var args = m$['makeArray'](arguments),
                self;

            funcs = args.shift();

            if (!m$['isArray'](funcs))
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

        getObject:m$.getObject,
		/**
		 * @expose
		 * @memberof Class
		 */
		_fullTypeName:'Class|',
		/**
		 * @expose
		 * @memberof Class
		 */
		fullName:'Class',
		/**
		 * @expose
		 * @memberof Class
		 */
		shortName:'Class',
		
		/**
		 * @method newInstance
		 * @expose
		 * @returns inst
		 * @memberof Class
		 */
        newInstance:function ()
        {
            //var i = this['rawInstance']();
            var args;
            initializing = true;
            var i = new this();
            initializing = false;

			i['objectId'] = i['Class']['totalObjects']++;
			i['uniqueId'] = i['Class']['fullName'] + ':' + i['objectId'];
			self=i;
			
			//TODO: maybe put expose here? its on new Instance, before setup and init!
            
			if (i['setup'])
                args = i['setup'].apply(i, arguments);

            // Added by martin@playcraftlabs.com -- fix for deep cloning of properties
           for (var prop in i['__proto__'])
               i[prop] = cloneObject(i[prop]);

            if (i['init'])
                i['init'].apply(i, isArray(args) ? args : arguments);
			
            return i;
        },

		/**
		 * @method setup
		 * @expose
		 * @param {*} baseInterface
		 * @param {*} fullName
		 * @returns arguments
		 * @memberof Class
		 */
        setup:function (baseClass, fullName)
        {
            this.defaults = extend(true, {}, baseClass.defaults, this.defaults);
            
			if (this['_types'] == undefined) 
				this['_types'] = [];
            
			this['_types'].push(this.fullName);
            
			if (this['_fullTypeName'] == undefined) 
				this['_fullTypeName'] = '|';
            
			this['_fullTypeName'] += this['fullName'] + '|';
            
			return arguments;
        },

		/**
		 * Use to create a new Interface by extending another. If
		 *
		 * @method extend
		 * @expose
		 * @param {String} fullName
		 * @param {Object} klass
		 * @param {Object} proto
		 * @param {Array} expose
		 * @returns {Object} Interface
		 * @memberof Class
		 */
        extend:function (fullName, klass, proto, augments, expose)
        {
		
			function setMethodNames(){
				var mthdName;
				this['Class'][name]['fname']=name;
				this['Class'][name]['owner']=this['shortName'];
				if (typeof this['Class'][name]==='function'){
					mthdName=this['shortName']+'::'+name+' Method';
					this['Class'][name].prototype.constructor.toString=function (){return mthdName};
				}
			}
		
			var _super_class 	= this,
				_super 			= this.prototype,
				name, ok=false,
				shortName, 
				namespace, 
				prototype;
						
			if (arguments.length!=5) {				//Determine what we got
				if (arguments.length==4) {			//No Expose
					if (typeof arguments[0]==="string"&&typeof arguments[1]==="object"&&typeof arguments[2]==="object"&&typeof arguments[2]==="object")
						ok=true;
					if (arguments.length==3) {		//Singleton/Abstract (No Augments/Expose)
						if (typeof arguments[0]==="string"&&typeof arguments[1]==="object"&&typeof arguments[2]==="object")
							ok=true;
					}			
				}			
			} else {			//Full Interface Implementation
				ok=true;
			}		
			
			if (!ok)return false;
			
			augments=augments||[];
			/** 
			 * @expose 
			 * @static
			 * @type {Class}
			 */
			this['Class']=null;
			//this['Class']=P$['get'](this['shortName']);
	
			//=-=|If we did direct copy skip all base class stuff|=-=//
			//if (!this['Class']) {
				//W$['log']('Creating Class ');
				
				// figure out what was passed
				if (typeof fullName != 'string') {
					proto = klass;
					klass = fullName;
					fullName = null;
				}
				if (!proto)	{
					proto = klass;
					klass = null;
				}

				proto = proto || {};
				
				// var _super_class 	= this,
					// _super 			= this.prototype,
					// name, 
					// shortName, 
					// namespace, 
					// prototype;
					
				this['exposed']=[];
				/**
				 * Given valid Maestro Interface types, this will return a 
				 * numeric value representing thier lineage.
				 * 
				 *		//this._fullTypeName = "Class|I$Interface|I$Alias|I$Encoders|"
				 *		//something._fullTypeName = "Class|I$Interface|I$Alias|I$Db|"
				 * 
				 *      //test against self 
				 *		this['Class']['lineage']('I$Interface');  //returns [0,2]
				 * 
				 * @method hasAncestor
				 * @expose
				 * @param {String} typeName A valid Maestro Interface type
				 * @returns {boolean}
				 */
				this['lineage'] = function (typeA,typeB){
					function relation(arr,a,b){
						if (arr.length>1){
							if ((a instanceof arr)&&(b instanceof arr)) {
							var a=arr.indexOf(a),
								b=arr.indexOf(b);
													
								return [a,b];
							} else return false;
						} else return false;
					} //End relation
					
					if (typeof typeA==="string" && typeB==="string") {
						if (typeA.length>2 && typeB.length>2) {
							var arrA=typeA.split('|'),
								arrB=typeA.split('|'),
								relA=relation(arrA,typeA,typeB),
								relB=relation(arrB,typeA,typeB);
							var foo='bar';								
						}
					}				
				};
				/**
				 * Given a valid Maestro Interface type, this will return true if param 
				 * type in question is of the same type.
				 *
				 * @method isA
				 * @expose
				 * @param {String} typeName A valid Maestro Interface type
				 * @returns {boolean}
				 */
				this['isA'] = function (typeName){
					return this._fullTypeName.indexOf('|' + typeName + '|') != -1;
				};
				/**
				 * Test if a given Interface has already been exposed to parent
				 *
				 * @method isExposed
				 * @expose
				 * @param {String} typeName A valid Maestro Interface type
				 * @returns {boolean}
				 */
				this['isExposed'] = function(intf) {
					if (this['Class']['exposed']&&typeof this['Class']['exposed']==='array' && this['Class']['exposed'].length>0)
						return this['Class']['exposed'].indexOf(intf);
					else
						return false;
				};
				/**
				 * Given a valid Maestro Interface type, this will return true if param 
				 * type in question is an ancestor interface
				 *
				 * @method hasAncestor
				 * @expose
				 * @param {String} ancestor A valid Maestro Interface type
				 * @returns {boolean}
				 */
				this['hasAncestor'] = function (ancestor){
					var arr=clss['lineage'](ancestor,shortName);
					return ((arr!=false)&&(arr[0]<arr[1]));
				};
				/**
				 * Given a valid Maestro Interface type, this will return true if param 
				 * type in question is a descendant of interface
				 *
				 * @method hasDescendant
				 * @expose
				 * @param {String} descendant A valid Maestro Interface type
				 * @returns {boolean}
				 */
				this['hasDescendant'] = function (descendant){
					var arr=clss['lineage'](descendant,shortName);
					return ((arr!=false)&&(arr[0]>arr[1]));
				};
				/**
				 * Check if a value is valid (not null, undefined or empty)
				 *
				 * @example
				 * 		if !(vld(foo)) { someFunction(); }
				 *
				 * @method vld
				 * @param {*}	a 	A value
				 * @returns {boolean} true if the value is not undefined and not null
				 * @memberof I$Alias
				 * @expose
				 */
				this['vld'] = function(a){return!(null===a||"undefined"===typeof a||!1===a||""===a)};

				/**
				 *  Checks if a param is valid (null or undefined) in which case the default value will be returned
				 *
				 * @example
				 * 		if (foo=chk(foo,"bar")) { someFunction(); }
				 *
				 * @method chk
				 * @param 	{*} 	$p			Parameter to check
				 * @param 	{*} 	$def		Default value to return if p is either null or undefined
				 * @returns {*} 	if valid, otherwise def (default)
				 * @memberof I$Alias
				 * @todo Remove function
				 * @expose
				 */
				this['chk'] = function($p,$def){return (!clss['vld']($p))?$def:$p;};
				
				/**
				 * Safely invoke Interface methods and test properties.
				 *
				 * @method safe
				 * @expose
				 * @param {*} what 
				 * @param {*} condition		(optional)
				 * @returns {*}
				 */
				this['safe'] = function(self,what,condition) {
					if ( clss['vld'](what) && typeof what==="function") {
						if (typeof condition!='undefined') {
							return ( what.apply(self,arguments)==condition )?1:0;
						} else {
							return what.apply(self,arguments) 
						}
					}
				};
				W$['safe']=this['safe'];
				
			//} else {//End Base Class Setup
			//	W$['log']('Copied existing Class.');				
			//}

			// Instantiate a base class (but only create the instance,
			// don't run the init constructor)
			initializing = true;
			prototype = new this();
			initializing = false;			
			
			proto['type']=fullName;
			// Copy the properties over onto the new prototype
			inheritProps(proto, _super, prototype);

			/**
			 * The dummy class constructor
			 * @namespace Interface
			 * @memberof Core
			 * @constructor
			 * @expose
			 * @returns {Object}
			 */
			this['Class']=function()
			{/*
  Maestro Base Class
 
  Do not derive from this Class directly or your app will
  be unstable at the very least. Derive all new Interfaces
  from I$Interface or another existing interface.
  - All construction is actually done in the init method
  - setup method is called before init and even without new.
 
				*/
				//this.constructor.toString=(function(){return "Maestro Interface"});
				if (initializing) return;

				if (this.constructor !== this['Class'] && arguments.length)
				{ //we are being called w/o new
					return arguments.callee.extend.apply(arguments.callee, arguments)
				} else
				{ //we are being called w/ new
					// copy objects
					if(this['newInstance'])
						return this['Class']['newInstance'].apply(this['Class'], arguments)
						
					else if (arguments['callee']['newInstance'])
						return arguments['callee']['newInstance'].apply(arguments['callee'], arguments[0])
				}
			}//end Class dummy constructor

			// Copy old stuff onto class
			//=-=|Copy members from parent class over|=-=//
			// for (name in this)
				// if (this.hasOwnProperty(name)) 
				   // this['Class'][name] = cloneObject(this[name]);
			for (name in this)
				if (this.hasOwnProperty(name)) {
					this['Class'][name] = cloneObject(this[name]);
				}	
					
			// copy new props on class
			inheritProps(klass, this, this['Class']);

			// do namespace stuff
			if (fullName)
			{
				var parts = fullName.split(/\./);
				var shortName = parts.pop();

				// Martin Wells (playcraft): bug fix. Don't add a namespace 
				//object if the class name has no namespace elements (i.e. 
				//it's just "MyClass", not "MyProject.MyClass")
				if (parts.length > 0)
				{
					//get current namespace object (parent)
					//current = m$['getObject'](parts.join('.'), window, true),
					current = m$['getObject'](parts.join('.'), P$['interfaces']['Store'], true),
					//set new interface namespace
					namespace = current;
				}
				//current[shortName] = Class;
			}
			
            // set things that can't be overwritten
            extend(this['Class'], {
                prototype:prototype,
                namespace:namespace,
                shortName:shortName,
                constructor:this['Class'],
                fullName:fullName
            });

			var arrAug=[];
			//=-=|Augments|=-=//
			(function augment_interface(self){
				if ((augments instanceof Array)){
					W$['log'](self);//=-=|DEBUG|=-=//
					for (prop in augments) {
						arrAug.push[prop];
					}
				}
			})(this);
				
            /* Expose props and methods */
			if ((expose instanceof Array)&&expose.length>0){
				if (!this['Class']['isExposed'](this['Class']['shortName'])){
					(function expose_members(self){
						
						var pfunc,iname='';
						for (var i=0;i<expose.length;i++) {
							self[expose[i]]=proto[expose[i]];
						}
						self['exposed'].push(self['shortName']);
					})(this['Class'])
				}
			}//end expose
			
			var desc=
				shortName+' Class\n'
				+'> Extends: '+_super_class['shortName']+'\n'
				+'> Uses: '+((arrAug.length>0)?arrAug.join(',')+'\n':'Nothing\n')
				+'> Exposes: '+((expose.length>0)?expose.join(',')+'\n':'Nothing\n');
			
            //make sure our prototype looks nice
			this['Class']['toString'] = 
			function(){return desc}
				
            this['Class'].prototype['Class'] = 
			this['Class'].prototype.constructor = 
			this['Class'];

            var args = this['Class'].setup.apply(this['Class'], concatArgs([_super_class], arguments));
			if (this['Class']['uniqueId']=='undefined'){
				this['Class']['objectId'] = this['Class']['totalObjects']++;
				this['Class']['uniqueId'] = this['Class']['fullName'] + ':' + this['Class']['objectId'];
			}
            if (this['Class']['init'])
                this['Class']['init'].apply(this['Class'], args || []);

			//this['Class']['toString'] = function(){return this['Class']['shortName']+' Extends '+shortName};//=-=|DEBUG|=-=//

			//add to Maestro Interface Store
			P$.add(this['Class']);
            return this['Class'];
        }
    });

    clss.prototype.callback = clss.callback

})(P$['interfaces']['Core']);
