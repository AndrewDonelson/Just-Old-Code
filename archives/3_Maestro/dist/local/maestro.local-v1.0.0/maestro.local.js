/** 
 * JavaScript language extensions for Maestro
 *
 * @namespace window
 * @file maestro.window.js (#1) in combine sequence.
 * FINALIZED
 */

/** 
 * Character codes to string
 *
 * @example
 *      s='http://www.somedomain.com/?JSON="{"field1:"value1",field2:"value2"}"';
 *      a = s.str2CharCodes(s);
 *      s = s.charCodes2Str(a);
 *      console.log(s);
 *
 * @param {Array} bytes An array of character byte codes
 * @expose
 * @return {string}
 * @memberof window
 */
String.prototype.charCodes2Str=function(b){var a,c,d=[];a=0;for(c=b.length;a<c;)9===b[a]&&(b[a]=34),11===b[a]&&(b[a]=39),d.push(b[a++]);return String.fromCharCode.apply(null,d)};

/** 
 * String to array (Character codes)
 *
 * @example
 *      s='http://www.somedomain.com/?JSON="{"field1:"value1",field2:"value2"}"';
 *      a = s.str2CharCodes(s);
 *      s = s.charCodes2Str(a);
 *      console.log(s);
 *
 * @param {String} str A string to convert to array of byte codes
 * @expose
 * @return {Array}
 * @memberof window
 */
String.prototype.str2CharCodes=function(c){var b,a,d=[];b=0;for(n=c.length;b<n;b++)a=c.charCodeAt(b),34===a&&(a=9),39===a&&(a=11),d.push(a);return d};

/**
 * Capitalizes a string
 *
 * @expose
 * @method capitalize
 * @param {String} s the string.
 * @returns {string|null} a string with the first character capitalized.
 * @memberof window
 */
String.prototype.capitalize=function(a){return a.charAt(0).toUpperCase()+a.substr(1)};

/**
 * Like camelize, but the first part is also capitalized
 *
 * @expose
 * @method classize
 * @param {String} s
 * @param {String} join
 * @returns {string|null} the classized string
 * @memberof window
 */
String.prototype.classize=function(c,d){for(var a=c.split(/_|-/),b=0;b<a.length;b++)a[b]=String.a(a[b]);return a.join(d||"")};

/**
 * Camelize a string
 * 
 * @expose
 * @method camelize
 * @param {String} s
 * @returns {String} a the camelized string
 * @memberof window
 */
String.prototype.camelize=function(a){a=String.a(a);return a.charAt(0).toLowerCase()+a.substr(1)};

/**
 * Description
 * 
 * @expose
 * @method niceName
 * @param {String} s
 * @returns {String} the niceName
 * @memberof window
 */
String.prototype.niceName=function(s){return String.classize(s,' ')};

/**
 * Shorthand version of window
 *
 * @expose
 * @property W$
 * @type {window}
 * @memberof window
 */			
W$=window;

/**
 * Shorthand access to window.document
 *
 * @expose
 * @property D$
 * @type {document}
 * @memberof window
 */			
W$['D$']=W$.document;

/**
 * Shorthand access to window.document.head[]
 *
 * @expose
 * @property H$
 * @type {DOMElement}
 * @memberof window
 */			
W$['H$']=D$.getElementsByTagName("head")[0];

/**
 * Shorthand access to window.document.body[]
 *
 * @expose
 * @property B$
 * @type {DOMElement}
 * @memberof window
 */			
W$['B$']=D$.getElementsByTagName("body")[0];

/**
 * Shorthand access to window.document.stylesheets
 *
 * @expose
 * @property C$
 * @type {DOMEElement}
 * @memberof window
 */			
W$['C$']=D$.styleSheets;

/**
 * Shorthand access to window.document.scripts
 *
 * @expose
 * @property S$
 * @type {DOMElement}
 * @memberof window
 */			
W$['S$']=D$.scripts;

/**
 * Shorthand version of Maestro
 *
 * @global
 * @expose
 * @property Maestro
 * @type {Object}
 * @memberof window
 */			
M$={};

/** 
 * Extend Javascript function to have access to Maestro Object
 *
 * @example
 *     Maestro
 *     > Object {fn: Object, Interface: Object, Sys: Object, MVC: Object}
 *     > Interface: Object
 *     > MVC: Object
 *     > Sys: Object
 *     > fn: Object
 *     > __proto__: Object
 *
 * @expose
 * @returns {Object} Maestro object
 * @memberof window
 */
(function(){return void 0!=W$.M$?W$.M$:null});

// (function(){}).constructor.prototype.Static = function(v,r){
	// var s;
	
	// if (typeof v=='undefined')return;
	// if (typeof s=='undefined') s={};
	// s[v] = (function(r) {
		// var vr; // This is the private persistent value

		// if (typeof r!='undefined') vr=r;
		
		// return function(){return vr};
	// })(r); // Invoke the outer function after defining it.
	// return s[v]();
// }();
Function.prototype.bind = function(scope) {
  var _fn = this;
  
  return function() {
	return _fn.apply(scope, arguments);
  }
};	
/**
 * Prototypal Inheritance with deep Object Cloning Object
 *
 * @instance
 * @expose
 */
if (!W$['P$']){
	W$['P$']={};
	(function(p){
		p['interfaces']={
			/**
			 * Container object for all Interface instances
			 *
			 * @property {Object} Cache
			 * @expose 
			 */
			Cache : {},
			
			/**
			 * Container object for all Interface definitions
			 *
			 * @property {Object} Store
			 * @expose 
			 */
			Store : {},
			
			/**
			 * Lookup table object for all Interface definitions, instances and Registered Methods
			 *
			 * @property {Object} Index
			 * @expose 
			 */
			Index : {},

			/**
			 * Container for complete class inheritance system
			 *
			 * @property {Object} Core
			 * @expose 
			 */
			Core : {},
			/**
			 * Container for legacy classes - Will be removed after nano framework
			 * if completely updated to use interfaces. Do not use.
			 *
			 * @property {Object} Classes
			 * @expose 
			 */
			Classes : {}
			
		};
		p['interfaces']['Classes']['Class']=null;
		p['setName']=function(m){
			m.prototype.constructor.toString=function(){return 'POIC Method'};
		};
		p['extend']=function(intf,name,clss,proto,expose){
			var obj = this['reference'](intf);
			if (typeof obj=='function'||typeof obj=='object')
				obj=obj.extend(name,clss,proto,expose);
							
			return (typeof obj==='function')?true:false
		};
		p['reference']=function(what){

			search=function(where,what){
				return (typeof where[what]!='undefined')?true:false;
			}
			
			switch (what) {
				case 'core': return this['interfaces']['Core'];
				case 'cache': return this['interfaces']['Cache'];
				case 'store': return this['interfaces']['Store'];
				default: 
					if (search(p['interfaces']['Cache'],what)) 
						return this['interfaces']['Cache'][what];
					else if (search(p['interfaces']['Store'],what)) 
						return this['interfaces']['Store'][what];
					else if (search(p['interfaces']['Core'],what)) 
						return this['interfaces']['Core'][what];
					else
						return false;
			}
		}.bind(p);
		p['isInterface']=function(obj){
			if (typeof obj=='function'||typeof obj=='object'){
				return (obj['_fullTypeName']&&obj['uniqueId'])?'Cache':'Store';
			} else return false;
		},
		p['add']=function(obj){
			var where=this['isInterface'](obj);
			if (where!=false){
				p['interfaces'][where][obj.shortName]=obj;
			}
		}.bind(p);
		p['queryNamespace']=function(fullName) {
			var intfName=null,ns,
			core	= this['interfaces']['Core'],
			cache	= this['interfaces']['Cache'],
			store	= this['interfaces']['Store'],
			parts	= fullName.split(/\./);
			
			if (parts.length!=-1) {
				var shortName = parts.pop();
				var current, name, namespace;
				
				//fullName not given, figure it out (Slower)
				if (shortName!='Class'&&shortName!='I$Interface'&&parts.length == 0){
					if (store[shortName]) {
						current=store[shortName];
						parts=current.fullName.split(/\./);
						shortName=parts.pop();
					}
				}
				if (parts.length > 0)
				{
					parent=parts[parts.length-1].toString();
					try {
						current = core['Class'].getObject(parts.join('.'), window, true);
					} catch (e) {
						console.log('ERROR: '+e);
					}
				}

				return {
					parts:parts,
					shortName:shortName,
					fullName:fullName,
					parent:parent,
					count:0
				}
			} else return false;
		}.bind(p);
		p['create']=(function(intf,args) {
			var 
			intfName= null,
			ns,
			cache	= this['reference']('cache'),
			store	= this['reference']('store'),
			ns		= this['queryNamespace'](intf);
			try {
				if (typeof intf==="string") {
					console.log('String parameter name detected, trying cache.');
					if (cache[ns.shortName]) {
						console.log('Found in cache returning '+cache[ns.shortName].toString());
						return cache[ns.shortName];
					} else {
						console.log('Not found, must create new.');
						intfName=intf;
					}
				} else if (typeof intf==="object") {
					console.log('Object parameter name detected, trying cache.');
					if (intf['shortName']) {
						console.log('Found in cache returning '+cache[shortName].toString());
						return cache[shortName];
					} else {
						console.log('Not found, there must be an existing interface.');
						return false
					}
				}
				if (intfName!=null) {
					if (typeof store[intfName]!="undefined") {
						var obj = new store[intfName](args);
						//Make sure we dont create more than the Interface allows
						if (obj['Class'].maxTotalObjects==0||obj['Class'].totalObjects <= obj['Class'].maxTotalObjects) {
							if (typeof cache[ns.shortName]=='undefined'){
								cache[ns.shortName]={};
							}
							return cache[ns.shortName][obj.uniqueId]=obj;
						} else {
							console.log('Maximum number of '+intfName+' Interfaces reached, aborting');
						}
					} else {
						console.log('Error creating Interface '+intfName)					
					}
				}	
			} catch (e) {
				console.log('Error: Maestro::Create('+intf.toString()+') - '+e.stack);
			}
		}.bind(p))
	})(W$['P$']) //End closure scope
}

/**
 * Creates a new interface by extending an existing interface.
 * return true if successful and false otherwise.
 *
 * @method extend
 * @expose 
 * @param {Object} 	Actual interface to extend
 * @param {String} 	Namespace for new Interface
 * @param {Object} 	Private class definition
 * @param {Object} 	Public class definition
 * @param {Array}	Public method to register and expose to Maestro 
 * @returns {boolean}
 */
Window.prototype.extend=W$['P$']['extend'];

/**
 * Returns the requested namespace from prototype
 *
 * @method ref
 * @expose 
 * @param {string} what	the namespace desired [core|cache|store]
 * @returns {object} namespace 
 */
Window.prototype.reference=W$['P$']['reference'];

//Window.prototype.add=W$['P$']['add'];
/**
 * Find an interface instance or definition and return it
 *
 * @method create
 * @expose
 * @param {String} 	intf	Instance Id or interface Name
 * @param {Boolean} store	True to retrieve from interface store (Definition)
 * @returns {Object}		A interface Instance or the Definition
 */
Window.prototype.queryNamespace=W$['P$']['queryNamespace'];
/**
 * Create an instance in the main cache of the new Interface
 *
 * @method create
 * @expose
 * @param {String|Object} intf	String name or actual interface definition
 * @returns {Object}	The new interface
 */
Window.prototype.create=W$['P$']['create'];
						
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
//P$['interfaces']['Core'] = {
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
			/**
			 * @expose
			 * @instance
			 * @namespace promise
			 * @memberof Deferred
			 */
            promise = {
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
			currents = m$.isArray(roots) ? roots : [roots || window],
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
			/**
			 * Interface Method Trace. Will on be available in developer mode.
			 * It will try to log to the Maestro console, if not available it
			 * will then try Browser Console. If neither exist is will alert
			 * each trace.
			 *
			 * @method trace
			 * @expose 
			 * @param {Object} obj	__proto__ from calling method
			 * @param {String} mth	name of the calling method or message.
			 */
			trace = function (id, intf, mth,done) {							/* DEBUG */
				var	state=(done===true)?'Complete.':'Executing...';			/* DEBUG */
				var msg=intf+'::'+mth+' '+state;							/* DEBUG */
				if (typeof M$==='object'&&typeof M$['log']==='function') 	/* DEBUG */
					M$['log'](id, this.INFO, msg);							/* DEBUG */
				else if (W$.console)										/* DEBUG */
					console.log('TRACE> '+id+' > '+msg);					/* DEBUG */
				else														/* DEBUG */
					alert(msg);												/* DEBUG */
			};																/* DEBUG */
			
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
            for (var name in newProps)
            {
                // Check if we're overwriting an existing function
                addTo[name] = m$['isFunction'](newProps[name]) &&
                    m$['isFunction'](oldProps[name]) &&
                    fnTest.test(newProps[name]) ? (function (name, fn)
                {
                    return function ()
                    {
						//save our current _super
                        var tmp = this['_super'], ret;
						
						if (typeof tmp!='undefined') trace(this['uniqueId'],oldProps['Class']['shortName'],name,false); /* DEBUG */
						
                        // Add a new ._super() method that is the same method but on 
						// the super-class
                        this['_super'] = oldProps[name];

                        // The method only need to be bound temporarily, so we remove 
						// it when we're done executing
                        ret = fn.apply(this, arguments);
						
						if (typeof tmp!='undefined') trace(this['uniqueId'],oldProps['Class']['shortName'],name,true);/* DEBUG */

							//reassign our original _super
                        this['_super'] = tmp;
                        return ret;
                    };
                })(name, newProps[name]) : newProps[name];
            }
        },

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
		_fullTypeName:'Class',
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

			if (i['Class']==="undefined") alert('Fucking Class missing again!');
			
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
			
			if (i['Class']['onReady'])i['Class']['onReady']();

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
		 * Use to create a new Interface by extending another.
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
        extend:function (fullName, klass, proto, expose)
        {
			/** 
			 * @expose 
			 * @static
			 * @type {Class}
			 */
			this['Class']=null;
			
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
			/**
			 * Given a valid Maestro Interface type, this will return true if param 
			 * type in question is is of the same type.
			 *
			 * @method isA
			 * @expose
			 * @param {String} typeName A valid Maestro Interface type
			 * @returns {boolean}
			 */
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
                if (initializing) return;

                if (this.constructor !== this['Class'] && arguments.length)
                { //we are being called w/o new
                    return arguments.callee.extend.apply(arguments.callee, arguments)
                } else
                { //we are being called w/ new
                    // copy objects

                    return this['Class']['newInstance'].apply(this['Class'], arguments)
                }
            }

            // Copy old stuff onto class
            for (name in this)
                if (this.hasOwnProperty(name))
                    this['Class'][name] = cloneObject(this[name]);

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
                    current = m$['getObject'](parts.join('.'), window, true),
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

            /* Expose props and methods */
			if ((expose instanceof Array)&&expose.length>0){
				var func,pfunc,iname='';
				for (var i=0;i<expose.length;i++) {
					func=expose[i];
					//if (!M$[func]){
						pfunc=proto[func];
						if (pfunc instanceof Function) {
							test=pfunc.bind(this['Class']);
							iname=this['Class']['shortName']+' Method';
							test.prototype.constructor.toString=function(){return iname}
						} else {
							test=pfunc;
							//iname=Class['shortName']+' Property';
							//test.constructor.toString=function(){return iname}
						}
						
						m$['expose'][func]=test;
					//}
				}
			}
			
            //make sure our prototype looks nice
            this['Class'].prototype['Class'] = this['Class'].prototype.constructor = this['Class'];

            var args = this['Class'].setup.apply(this['Class'], concatArgs([_super_class], arguments));
			if (this['Class']['uniqueId']=='undefined'){
				this['Class']['objectId'] = this['Class']['totalObjects']++;
				this['Class']['uniqueId'] = this['Class']['fullName'] + ':' + this['Class']['objectId'];
			}
            if (this['Class']['init'])
                this['Class']['init'].apply(this['Class'], args || []);

			//add to Maestro Interface Store
			P$.add(this['Class']);
            return this['Class'];
        }
    });

    clss.prototype.callback = clss.callback

})(P$['interfaces']['Core']);
/** 
 *  Base Interface for Maestro
 * 
 * @file maestro.interface.js (#4) in combine sequence.
 * FINALIZED
 */
 
/**
 * A Base Interface providing logging, object counting and unique object id's
 * Examples:
 *
 * Unique ID and total objects:
 * <pre><code>
 * var Fighter = M$.I$Interface.extend('Fighter', {}, {});
 * var fighter1 = new Fighter();
 * var fighter2 = new Fighter();
 * fighter1.uniqueId;    // -> 'Fighter:0'
 * fighter2.uniqueId;    // -> 'Fighter:1'
 * Fighter.totalObjects; // -> 2
 * </code></pre>
 *
 * Logging: (log, info, warn, error, debug)
 * <pre><code>
 * fighter1.warn('oops'); // == log('Fighter:0 [WARN] oops');
 * </code></pre>
 * @class I$Interface
 * @extends Class
 * @expose 
 * Advanced Optimization Compliant
 */
extend(
	//What interface are you extending?
	'Class',

	//What is the namespace of your new interface?
	'I$Interface',

	//Define your private class properties and methods.
	/** @lends Class */
	{
		/** 
		 * @property {number} totalObjects
		 * @expose 
		 */
		totalObjects:0,
		/** 
		 * Set this value to the maximum number of Interfaces of this type
		 * can be created. For example an API needs only 1 instance, but if
		 * the interface represents a game piece maybe there is a max of 10.
		 *
		 * @property {number} maxTotalObjects
		 * @expose 
		 */
		maxTotalObjects:0,
		/** 
		 * @property {string} WARN
		 * @expose 
		 */
		WARN:'WARN',
		/** 
		 * @property {string} DEBUG
		 * @expose 
		 */
		DEBUG:'DEBUG',
		/** 
		 * @property {string} ERROR
		 * @expose 
		 */
		ERROR:'ERROR',
		/** 
		 * @property {string} INFO
		 * @expose 
		 */
		INFO:'INFO',
		
		/**
		 * Description
		 * @method log
		 * @expose 
		 * @param {string} id
		 * @param {string} type
		 * @param {*} args
		 */
		log:function ($id, $type, $args) {
			M$.log($id, $type, $args);
		},		 

		/**
		 * Description
		 * @method warn
		 * @expose 
		 * @param {string} message
		 * @this {I$Interface}
		 */
		warn:function (message)
		{
			this.log(null, this.WARN, message);
		},

		/**
		 * Description
		 * @method debug
		 * @expose 
		 * @param {string} message
		 * @this {I$Interface}
		 */
		debug:function (message)
		{
			this.log(null, this.DEBUG, message);
		},

		/**
		 * Description
		 * @method error
		 * @expose 
		 * @this {I$Interface}
		 */
		error:function ()
		{
			this.log(null, this.ERROR, message);
		},

		/**
		 * Description
		 * @method info
		 * @expose 
		 * @param {string} message
		 * @this {I$Interface}
		 */
		info:function (message)
		{
			this.log(null, this.INFO, message);
		},

		/**
		 * Description
		 * @method assert
		 * @expose 
		 * @param {string} msg
		 * @param {*} condition
		 */
		assert:function (msg, condition)
		{
			if (!condition)
				throw msg;
		}

	},
	//Define your prublic class properties and methods.
	/** @lends Class.prototype */
	{
		/**
		 * Numeric ID of object
		 * @expose 
		 * @property {number} objectId
		 */
		objectId:0,
		/**
		 * Unique ID of object (Name+Number)
		 * @expose 
		 * @property {String} uniqueId
		 */
		uniqueId:null,

		/**
		 * @constructor init
		 * @expose 
		 */
		init:function ()
		{},

		/**
		 * Prepare the interfaces object before init is called. Excellent place
		 * to do property and method export and other preparations before init()
		 * is called.
		 *
		 * @method setup
		 * @expose 
		 */
		setup:function ()
		{
		},

		/**
		 * Returns the unique id of this interface
		 *
		 * @method getUniqueId
		 * @expose 
		 * @this {I$Interface}
		 * @returns {String} A system-wide unique Id for this object instance
		 */
		getUniqueId:function ()
		{
			// if you see a null error here, then likely you have forgotten to call
			// this._super in a subclassed init method.
			return this.uniqueId;
		},

		/**
		 * kinds of object hashing in derived classes.
		 *
		 * @method hashCode
		 * @expose 
		 * @this {I$Interface}
		 * @returns {String} A hash matching this object. Override this to implement different
		 */
		hashCode:function ()
		{
			return this.getUniqueId();
		},

		/**
		 * if in developer mode, send a Warning message to console.
		 *
		 * @method warn
		 * @expose 
		 * @param {string} message
		 * @this {I$Interface}
		 */
		warn:function (message)
		{
			this.Class.log(this.uniqueId, this.Class.WARN, arguments);
		},
		/**
		 * if in developer mode, send a Debug message to console. Note that 
		 * debug messages should be removed for production, no code.
		 *
		 * @method debug
		 * @expose 
		 * @param {string} message
		 * @this {I$Interface}
		 */
		debug:function (message)
		{
			this.Class.log(this.uniqueId, this.Class.DEBUG, arguments);
		},
		/**
		 * if in developer mode, send a Error message to console.
		 * 
		 * @method error
		 * @expose 
		 * @param {string} message
		 * @this {I$Interface}
		 */
		error:function ()
		{
			err(this.Class,arguments)
		},
										
		/**
		 * if in developer mode, send a Informational message to console.
		 *
		 * @method info
		 * @expose 
		 * @param {string} message
		 * @this {I$Interface}
		 */
		info:function (message)
		{
			this.Class.log(this.uniqueId, this.Class.INFO, arguments);
		},

		/**
		 * Return a string anme for this interface
		 *
		 * @method toString
		 * @expose 
		 * @this {I$Interface}
		 * @returns {string}
		 */
		toString:function ()
		{
			return this.Class.fullName + ' [id: ' + this.objectId + ']';
		}
	},
	//Public methods to register with Maestro
	[]
);
/** 
 *  Alias Interface for Maestro
 *
 * @file maestro.alias.js (#5) in combine sequence.
 * FINALIZED
 */

 
/**
 * Adds Document Object Model Alias to some of the most used tasks
 *
 * @class I$Alias
 * @extends I$Interface
 * @memberof Maestro
 * @expose 
 */
extend(
	//What interface are you extending?
	'I$Interface',

	//What is the name of your new interface?
	'I$Alias',

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
			this['_super']();
			this['hideCallback']=function(){this.style.visibility='hidden'}

			//Public methods to register with Maestro
			// this.expose = [				
				 // 'gei','gen','get','gec','gda','ise','cnt','esa','ega',
				 // 'aea','aet','vld','chk','ast','bnd','lds','xhr','pkg',
				 // 'sra','req','die','cls','tgl','on','off','ple','pld'			
			// ];
			
			// var func,name=this['Class']['shortName'];
			// for (var i=0;i<this.expose.length;i++) {
				// func=this.expose[i];
				// test=M$[func]=(this[func]).bind(this);
				// test.prototype.constructor.toString=function(){return name}
			// }
			
		},
		/**
		 * Alias for window.document.getElementById
		 *
		 * @example
		 * 		var element = gei("myDIV");
		 *
		 * @method gei
		 * @param {string} $p
		 * @returns element
		 * @memberof I$Alias
		 * @expose
		 */
		gei : function ($p,$src) {
			return D$.getElementById($p);
		},

		/**
		 * Alias for window.document.getElementsByName()
		 *
		 * @example
		 *		var elements = gen("DIV");
		 *
		 * @method gen
		 * @param {string} $p
		 * @returns element
		 * @memberof I$Alias
		 * @expose
		 */
		gen : function ($p) {
			return D$.getElementsByName($p);
		},

		/**
		 * Alias for window.document.getElementsByClass()
		 *
		 * @example
		 *		var elements = gec("red");
		 *
		 * @method gec
		 * @param {string} $p
		 * @returns element
		 * @memberof I$Alias
		 * @expose
		 */
		gec : function ($p) {
			return D$.getElementsByClassName($p);
		},

		/**
		 * Alias for window.GET()
		 *
		 * @example
		 * 		get("head")[0].appendChild($script);
		 *
		 * @method gec
		 * @param {string} $p The tag name of the elements you want returned, ie. HEAD
		 * @returns {Collection} Returns the collection of elements with the given tag name
		 * @memberof I$Alias
		 * @expose
		 */
		get : function ($p) {
			return D$.getElementsByTagName($p);
		},

		/**
		 *  Get all data attributes for the given element.
		 *
		 * @example
		 * 		var attr = gda("APPLET");
		 *
		 * @method gda
		 * @param {string} $el Element tag name or Id you want to get the data attributes from
		 * @param {string} $id set tp true to use elements id
		 * @returns {object} Returns the object containing all attributes
		 * @memberof I$Alias
		 * @expose
		 */
		gda : function ($el, $useid) {
			var $result = false,
			$data = {};
			if ($useid == true) {
				if ($el = this['gei']($el))
					$result = true;
			} else {
				if ($el === M$['db'][0][45] || "body" || "head")
					$el = this['get']($el)[0];
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
		},

		/**
		 * Returns true if object parameter is a DOM Element and false otherwise.
		 *
		 * @param {object} Object to test
		 * @return {boolean}
		 * @expose
		 */
		ise : function($obj){
			try {
				return ($obj.constructor.__proto__.prototype.constructor.name)?true:false;
			}catch(e){
				return false;
			}
		},

		/**
		 *
		 * Checks node parameter. Returns an element no mater if the element is passed in or the name of an element.
		 *
		 * @example
		 * 		var $el = cnt($element);
		 *
		 * @method cnt
		 * @param {*} $el The name of an element or the actual element
		 * @param {boolean} $all If more than one return all
		 * @returns {Element} returns the Element
		 * @memberof I$Alias
		 * @expose
		 */
		cnt : function ($p,$a) {
			var $result;
			if (typeof $p === "string") {
				$result = this['gei']($p);
				if (!$result) $result = (!$a)?this['get']($p)[0]:this['get']($p);
				if (!$result) $result = (!$a)?this['gec']($p)[0]:this['gec']($p);
			} else if (this.ise($p)){
				$result = $p;
			} else $result=false;

			return $result;
		},

		/** @expose */		
		esa : function ($el, $var, $val) {
			try{this.cnt($el).setAttribute($var, $val)}catch(e){return false}
			return true;
		},

		/**
		 * Alias for element.getAttribute()
		 * Get all data attributes for the given element.
		 *
		 * @example
		 * 		var btnColor = M$('ega',"button","color");
		 *
		 * @method ega
		 * @param 	{*}		$el 	The name of an element or the actual element
		 * @param 	{string} 	$var	The name of the attribute you want to get
		 * @memberof I$Alias
		 * @expose
		 */
		ega : function ($el, $var) {
			return this.cnt($el).getAttribute($var);
		},

		/**
		 * Inserts a new element before a given element
		 *
		 * @example
		 * 		aea('someElementID','DIV','newDivID','This is inner HTML');
		 *
		 * @method aea
		 * @param 	{*} 	$el 	The name of an element or the actual element
		 * @param  	{string} 	$ne 	element to insert
		 * @param  	{string}	$id 	ID of the new element
		 * @param  	{string} 	$html 	HTML to insert into new element
		 * @returns {string} 	$id    Parent nodes id
		 * @memberof I$Alias
		 * @expose
		 */
		aea : function ($el, $ne, $id, $html) {
			var $el = this.cnt($el);
			if (!this['vld']($el)) return false;
			$ne = D$.createElement($ne);
			if ($id)
				$ne.id = $id;
			if ($html)
				$ne.innerHTML = $html;
			$el.parentNode.insertBefore($ne, $el);
			return $ne;
		},

		/**
		 * Inserts a new element into a given element
		 *
		 * @example
		 * 		aet('newDivID','h1','newH1ID','This is inner HTML');
		 *
		 * @method aet
		 * @param 	{*} 	$el 	The name of an element or the actual element
		 * @param  	{string} 	$ne 	element to insert
		 * @param  	{string}	$id 	ID of the new element
		 * @param  	{string} 	$html 	HTML to insert into new element
		 * @returns Element returns the element just created & appended.
		 * @memberof I$Alias
		 * @expose
		 */
		aet : function ($el, $ne, $id, $html) {
			var $el = this.cnt($el);
			if (!this['vld']($el)) return false;
			$ne = D$.createElement($ne);
			if ($id)
				$ne.id = $id;
			if ($html)
				$ne.innerHTML = $html;
			$el.appendChild($ne);
			return $ne;
		},

		/**
		 * Check if a value is valid (not null, undefined or empty)
		 *
		 * @example
		 * 		if !(vld(foo)) { someFunction(); }
		 *
		 * @method vld
		 * @param {*}	$p 	A value
		 * @returns {boolean} true if the value is not undefined and not null
		 * @memberof I$Alias
		 * @expose
		 */
		vld : function(a){return!(null===a||"undefined"===typeof a||!1===a||""===a)},

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
		chk : function ($p, $def) {
			return (!this.vld($p)) ? $def : $p;
		},

		/**
		 *  Tests a boolean evaluation and throws an exception with the error string. (Assert)
		 *
		 * @example
		 *   	M$('ast',foo,'BOOYA!');
		 *
		 * @method ast
		 * @param  	{boolean} 	$test 	A boolean result test
		 * @param 	{string} 	$error 	A string to throw with the exception
		 * @memberof I$Alias
		 * @todo Remove function
		 * @expose
		 */
		ast : function ($test, $error) {
			if (!$test) {
				throw $error;
			}
		},

		/**
		 * Utility function for wrapping a callback function with its reference
		 * @method bnd
		 * @param {object} $scope
		 * @param {function} $fn
		 * @returns function
		 * @memberof I$Alias
		 * @expose
		 */
		bnd : function ($scope, $fn) {
			return function () {
				$fn.apply($scope, arguments);
			};
		},

		/**
		 * Utility function for loading javscript or Stylesheets.
		 * No other file formats are supported.
		 *
		 * @example M$('lds','script','path/to/some/script.js');
		 *
		 * @method bnd
		 * @param {string} $fileType either script or link
		 * @param {string} $url full path to file, local or remote
		 * @param {callback} $onLoad optional
		 * @param {callback} $onError optional
		 * @memberof I$Alias
		 * @expose
		 */
		lds : function ($filetype, $url, $onLoad, $onError) {
			var a,b,c;
			if ($filetype == M$['db'][0][0]) {
				a = D$.createElement(M$['db'][0][0]);
				a.async = 1;
				a.src = $url; //.js || .debug.js
				a.type = M$['db'][3][2];
				a.onLoad = $onLoad;
				a.onError = $onError;
				if (c = this['gei'](M$['db'][0][13]))
					c.appendChild(a);
				return true;
			} else if ($filetype == M$['db'][0][1]) {
				_= D$.createElement(M$['db'][0][1]);
				a.href = $url; //.css || .debug.css
				a.rel = M$['db'][3][4];
				a.type = M$['db'][3][3];
				a.onLoad = $onLoad;
				a.onError = $onError;
				if (c = get(M$['db'][0][12]))
					c[0].appendChild(a);
				return true;
			} else {
				M$.log(this, 'WARN',arguments);
			}
			return false;
		},

		/** @expose */
		// mrg = function(o, a, b) {
		// var r, k, v, ov, bv, inR,
			// isArray = Array.isArray(a),
			// hasConflicts, conflicts = {},
			// newInA = {}, newInB = {},
			// updatedInA = {}, updatedInB = {},
			// keyUnion = {},
			// deep = true;
		  
			// r = isArray ? [] : {};
			// deep = !objOrShallow;
		  
			// for (k in b) {
				// if (isArray && isNaN((k = parseInt(k)))) continue;
				// v = b[k];
				// r[k] = v;
				// if (!(k in o)) {
					// newInB[k] = v;
				// } else if (v !== o[k]) {
					// updatedInB[k] = v;
				// }
			// }
		  
			// for (k in a) {
				// if (isArray && isNaN((k = parseInt(k)))) continue;
				// v = a[k];
				// ov = o[k];
				// inR = (k in r);
				// if (!inR) {
					// r[k] = v;
				// } else if (r[k] !== v) {
					// bv = b[k];
					// if (deep && typeof v === M$['db'][0][8] && typeof bv === M$['db'][0][8]) {
						// bv = M$.mrg((k in o && typeof ov === M$['db'][0][8]) ? ov : {}, v, bv);
						// r[k] = bv.merged;
						// if (bv.conflicts) {
							// conflicts[k] = {conflicts:bv.conflicts};
							// hasConflicts = true;
						// }
					// } else {
						// if (bv === ov) {
							// r[k] = v;
						// } else if (v !== ov) {
							// if (k in o)
								// conflicts[k] = {a:v, o:ov, b:bv};
							// else
								// conflicts[k] = {a:v, b:bv};
							
							// hasConflicts = true;
						// }
					// }
				// }
			
				// if (k in o) {
					// if (v !== ov)
					// updatedInA[k] = v;
				// } else {
					// newInA[k] = v;
				// }
			// }
		  
			// return r;
		// },

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
		 * @memberof I$Alias
		 * @expose
		 */
		xhr : function ($url, $onLoad, $onError, $method, $data, $trace) {
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
				var _={};
				$opts.req = new XMLHttpRequest();
				if ('withCredentials' in $opts.req) {
					$opts.req.open($opts.method, $opts.url, true);
					$opts.req.onerror = $opts.onError;
					$opts.req.onreadystatechange = function () {
					
						if ($opts.trace === true) {
							/** @this {Object} */
							var tmp = {
								url:$opts.url,
								state:this.readyState,
								status:this.status,
								text:this.statusText
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
						_.args = Array.prototype.slice.call(arguments, 0);
						err(this,e,_);
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
			var _={opts:null};
			
			if (!this.vld($url) || $url === "") {
				$onError(new Error(M$['db'][0][41] + $url + ']'));
			} else {
				$trace = (M$['getDevMode'])?M$['getDevMode']:false;
				_.opts = {
					req : '',
					url : $url,
					trace : $trace
				};

				_.opts.method = this.chk($method, 'GET');
				_.opts.onLoad = this.chk($onLoad, _onLoad);
				_.opts.onError = this.chk($onError, _onError);
				_.opts.data = this.chk($data, 0);

				var h = $url.indexOf("http");
				a = $url.indexOf("applet.");
				if (h < 0) {
					//Local JavaScript or Stylesheet file?
					this.lds(getExt($url), $url);
				} else {
					try {
						if (XMLHttpRequest) {
							return XMLReq(_.opts);
						}
						if (XDomainRequest) {
							/* Microsoft IE */
							return XDOReq(_.opts);
						}
					} catch (e) {
						_.args = Array.prototype.slice.call(arguments, 0);
						err(this,e,_);
					}
				}
			}
		},
		/* end xhr */

		/**
		 *  Obtains a package, initializes and executes it.
		 *
		 * @method pkg
		 * @param {*} 	$p			Parameter to check
		 * @returns	{*}	if valid, otherwise def (default)
		 * @memberof I$Alias
		 * @expose
		 */
		pkg : function ($p) {
			$p.a = ($p.x = 1) ?
			/**
			 *  pack a module.
			 *
			 * @method pack
			 * @param 	{*} 	$p			Parameter to check
			 * @returns {string} 	if valid, otherwise def (default)
			 * @memberof pkg
			 */
			function ($p) {
				/*pack*/
				$p.b = //<--Wrapper for package
					M$.prototype.b64(//<-- LZW Base64 Encoded
						M$.prototype.lzw.enc(//<-- JSON COMPRESSED
							JSON.stringify($p.y) //<-- Data to JSON
						))
			}
			 :
			/**
			 *  unpack a module.
			 *
			 * @method unpack
			 * @param 	{*} 	$p			Parameter to check
			 * @returns {string} 	if valid, otherwise def (default)
			 * @memberof Maestro.pkg
			 */
			function ($p) {
				/*unpack*/
				$p.a = JSON.parse($p.y);
				M$.prototype.lzw.dec(
					M$.prototype.b64($p.a));
			}
			//$param.y = data
		},

		/**
		 * Replace all occurrences of $p.y with $p.z in $p.z
		 *
		 * @method sra
		 * @param {object} $p	p.x= find, p.y=new and p.z source
		 * @returns {string}
		 * @memberof I$Alias
		 * @expose
		 */
		sra : function ($find,$replace,$str) {
			return $str.replace(new RegExp($find, 'g'), $replace);
		},

		/**
		 * Takes an array module names required by this app. Do not add an extension
		 * and only add path after base path. review information on your content namespace.
		 *
		 * @method req
		 * @param {array} $modules	
		 * @memberof I$Alias
		 * @expose
		 */
		req : function($modules) {return 0},

		/**
		 * An equivalent to PHPs die() function
		 *
		 * @method die
		 * @param {$object} $object	Nano Framework object or string name.
		 * @param {Mixed} 	$args 	parameters or error event details
		 * @param {String} 	M$ 		text for die message
		 * @memberof I$Alias
		 * @expose
		 */
		die : function ($object, $args, $m) {
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
				e.objectName = (!$object) ? M$['db'][0][6] : $object;
				e.arguments = (!$args) ? 'none' : $args;
				if (typeof window.onError === M$['db'][0][42])
					window.onError(e)
			},
				false);

			window.onError = function (e) {
				M$.log('DIE!!!', M$['db'][0][10], e);
			}

			for (var i = 0; i < M$['db'][6].length; i++) {
				window.addEventListener(M$['db'][6][i], function (e) {
					stopPropagation(e);
				}, true);
			}

			if (window.stop) {
				window.stop();
			}

			throw '';
		},


		/**
		 * Set, add, remove or replace an elements classes. the second class $c2
		 * is only needed when using the replace action.
		 *
		 * @method cls
		 * @param {string} $el  	element id
		 * @param {string} $action	action [set|clear|add|remove|replace|toggle]
		 * @param {string} $c1		name of class to work with
		 * @param {string} $c2 		name of class used in replace of $c1
		 * @memberof I$Alias
		 * @expose
		 */
		cls : function($el,$action,$c1,$c2) {
			try {
				var $el=this.cnt($el);if (!$el) return;
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
			} catch(e) {
				err(M$,e,{local:{},args:Array.prototype.slice.call(arguments, 0)})
			}
			
		},

		/**
		 * Toggles an elements visible state.
		 *
		 * @method tgl
		 * @param {string} $el  element
		 * @memberof I$Alias
		 * @expose
		 */
		tgl : function ($el) {
			var $el=this.cnt($el);if (!$el) return;
			if ($el.style.visibility != 'hidden')
				this.off($el);
			else
				this.on($el);
		},

		/**
		 * show an element, all elements of tagname or name or class
		 *
		 * @method on
		 * @param {string} $el ordered by Id->TagName->Name->Class
		 * @memberof I$Alias
		 * @expose
		 */
		on : function ($el) {
			var $el=this.cnt($el);if (!$el) return;
			$el.style.visibility='visible';
			this.cls($el,'replace','opacity0','opacity100');
		},

		/**
		 * hide an element, all elements of tagname or name or class
		 * Verified fully functional
		 *
		 * @method off
		 * @param {string} $el  ordered by Id->TagName->Name->Class
		 * @returns none
		 * @memberof I$Alias
		 * @expose
		 */
		off : function ($el) {
			var $el=M$['cnt']($el);if (!$el) return;
			//Start transition to off
			this.cls($el,'replace','opacity100','opacity0');
			//if not cpanel, then set timeout to set visibility to hidden
			if ($el.id!=M$['db'][0][14])
				setTimeout(this['hideCallback'].bind($el),1000);
		},

		/**
		 * Page Loader Enable. Cross-fade from Wrapper to Page Loader
		 *
		 * @method ple
		 * @memberof I$Alias
		 * @expose
		 */
		ple : function () {
			if (this.cnt(M$['db'][0][40]) && this.cnt(M$['db'][0][24])) {
				//Turn Loader On
				this.on(M$['db'][0][24]);
				//Turn Wrapper Off
				this.off(M$['db'][0][40]);
			}
		},

		/**
		 * Page Loader Disable. Cross-fade from page Loader to Wrapper
		 *
		 * @method pld
		 * @memberof I$Alias
		 * @expose
		 */
		pld : function () {
			// Does mLoader even exist? and is mLoader visible?
			if (($w=this.cnt(M$['db'][0][40]) && this.cnt(M$['db'][0][24])) && ($w.offsetWidth > 0 && $w.offsetHeight > 0)) {
				//Turn Wrapper On
				this.on(M$['db'][0][40]);
				//Turn Loader Off
				this.off(M$['db'][0][24]);
			}
		}		 
	},
	[				
	 'gei','gen','get','gec','gda','ise','cnt','esa','ega',
	 'aea','aet','vld','chk','ast','bnd','lds','xhr','pkg',
	 'sra','req','die','cls','tgl','on','off','ple','pld'			
	]	
);
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
					if (argString === null || typeof argString === M.z[0][7]) {
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
		/**
		 * Interface Initialization method
		 * @expose
		 * @constructor init
		 */
		init:function ()
		{
			this['_super']();
			this.expose = {
				'b64Encode'	: function(a) {return this['Class'].b64.enc(a)},
				'b64Decode'	: function(a) {return this['Class'].b64.dec(a)},
				'lzwEncode'	: function(a) {return this['Class'].lzw4.enc(a)},
				'lzwdecode'	: function(a) {return this['Class'].lzw.dec(a)},
				'encode'	: function(a) {return this.enc(a)},
				'decode'	: function(a) {return this.dec(a)}
			}
			var func,iname=this['Class']['shortName'];
			for (name in this.expose) {
				test=M$[name]=(this.expose[name].bind(this));
				test.prototype.constructor.toString=function(){return iname}
			}
		},
		setup:function(){
			this['_super']()
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

	}
);/** 
 *  Db Interface for Maestro
 *
 * @file maestro.db.js (#7) in combine sequence.
 * FINALIZED
 */

 
/**
 * this interface provides an array of data and strings for Maestro
 *
 * @class I$Db
 * @extends I$Encoders
 * @memberof Maestro
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Encoders',

	//What is the name of your new interface?
	'M$.I$Db',
	
	/** @lends I$Encoders */
	{		
		/** 
		 * This is an API so there can only be one instance.
		 *
		 * @property {number} maxTotalObjects
		 * @expose 
		 */
		maxTotalObjects:1		
	},
	/** @lends I$Encoders.prototype */
	{
		//===| Private Local Variables |===//
		/** @expose */
		db : [],
		/**
		 * Interface Initialization method
		 * @expose
		 * @constructor init
		 */
		init:function ()
		{
			this['_super']();
		},
		//setup:function() {
			//this['_super']();
		
			//First run - Load Release version of JavaScript and Style-sheet if no Parameters
			//Initialize Object
			
			// this.db=[
			// ['script','link','put','get','clk','msg','unknown','undefined','object','Array',
			// 'Error',
			// 'closed opacity20',
			// 'head',
			// 'tail',
			// 'cpanel',
			// 'cpText',
			// 'tbody',
			// '<h1>&#98',
			// '</h1><h3>',
			// '</h3>',
			// 'div',
			// 'ul',
			// 'li',
			// 'common',
			// 'mLoader',
			// 'mView',
			// 'INFO',
			// 'text-info',
			// 'info-sign">',
			// 'WARN',
			// 'text-warning',
			// 'exclamation-sign">',
			// 'ERROR',
			// 'text-danger',
			// 'remove-sign">',
			// 'DEBUG',
			// 'text-default',
			// 'wrench">',
			// 'open opacity100',
			// 'Only Javascript and Stylesheets can be loaded local or remote.',
			// 'wrapper',
			// 'URL provided is invalid [',
			// 'function',
			// 'String',
			// 'Object',
			// 'html',
			// 'webpage',
			// 'document',
			// 'light',
			// 'neutral',
			// 'dark',

			// 'anonymous',
			// 'shortName',
			// 'ancestry',
			// 'What: ',
			// 'Where: ',
			// 'Local: [',
			// 'Params: [',
			// '-10000px',	
			// '\n\r'
			
			// ],
			// ['nano','.release','.debug','.js','.css'],
			// ['//cdn.i2tmlabs.com'],
			// ['__utm.gif?','Microsoft.XMLHTTP','application/javascript','text/css','stylesheet'],
			// [
			// 'html,body,#wrapper{padding:0;margin:0;z-index:10}#tail,tail{opacity:0;visibility:hidden;top:-10000}#cpanel{position:fixed;top:0;left:0;right:0;z-index:10003;background-color:#fff;color:#000;font-size:1em;padding:0;margin:0}#cpHead{width:100%;top:0;max-height:20px;background-color:#000;color:#fff;padding:0 10px 0 10px}#cpText{font-family:ubuntu}#cpLog{position:absolute;bottom:0;top:21px;width:100%;border:0;overflow:auto;color:black;text-shadow:none;font-size:70%;text-align:left}#cpanel.open{bottom:0;visibility:visible}#cpanel.closed{height:20px}.cpText{vertical-align:top;top:3px}.msgBox{position:fixed;top:10%;left:50%;width:300px;height:300px;text-align:center;margin-left:-150px;border:5px solid #888;box-shadow:0 10px 10px #ccc;background-color:#f5f5f5;z-index:10002;overflow:hidden}.deadCenter{position:fixed;top:22.5%;left:50%;width:320px;height:320px;text-align:center;margin-top:-160px;margin-left:-160px;border:5px solid #888;box-shadow:0 10px 10px #ccc;background-color:#f5f5f5;z-index:10002;overflow:hidden}.opacity0{filter:alpha(opacity=0);-moz-opacity:0;-khtml-opacity:0;opacity:0;transition:opacity 1s linear}.opacity20{filter:alpha(opacity=20);-moz-opacity:.2;-khtml-opacity:.2;opacity:.2;transition:opacity 1s linear}.opacity40{filter:alpha(opacity=40);-moz-opacity:.4;-khtml-opacity:.4;opacity:.4;transition:opacity 1s linear}.opacity60{filter:alpha(opacity=60);-moz-opacity:.6;-khtml-opacity:.6;opacity:.6;transition:opacity 1s linear}.opacity80{filter:alpha(opacity=80);-moz-opacity:.8;-khtml-opacity:.8;opacity:.8;transition:opacity 1s linear}.opacity100{filter:alpha(opacity=100);-moz-opacity:1;-khtml-opacity:1;opacity:1;transition:opacity 1s linear}@font-face{font-family:Neuropol;font-weight:normal;font-style:normal;src:url(http://cdn.i2tmlabs.com/content/i2tm/assets/fonts/neuropol.ttf)}.neuropol{font-family:Neuropol;font-weight:200;letter-spacing:12px}@font-face{font-family:Ubuntu;font-weight:normal;font-style:normal;src:url(http://cdn.i2tmlabs.com/content/i2tm/assets/fonts/ubuntu-r.ttf)}.ubuntu{font-family:Ubuntu;font-weight:normal}@font-face{font-family:TopGun;font-weight:normal;font-style:normal;src:url(http://cdn.i2tmlabs.com/content/i2tm/assets/fonts/top_gun.ttf)}.topgun{font-family:TopGun;font-weight:normal}@font-face{font-family:Edwardian;font-weight:normal;font-style:normal;src:url(http://cdn.i2tmlabs.com/content/i2tm/assets/fonts/itcedscr.ttf)}.edwardian{font-family:Edwardian;font-weight:normal}#mLoader{display:block;position:fixed;top:0;left:0;bottom:0;right:0;z-index:10000}#mView{position:absolute;margin:-30px -110px;top:45%;left:50%;width:220px;height:60px;list-style:none;text-align:center;padding:0;z-index:10001}ul#mView li{background-color:#888;width:25px;height:20px;float:right;margin-right:6px;box-shadow:0 100px 20px rgba(0,0,0,0.2);border-radius:10px 10px}ul#mView h1,h3{color:#444!important;font-size:150%!important;text-decoration:none!important;text-shadow:none!important}@-webkit-keyframes loadbars{0%{height:1px;margin-top:25px}50%{height:50px;margin-top:0}100%{height:1px;margin-top:25px}}ul#mView li:first-child{-webkit-animation:loadbars 2.0s cubic-bezier(0.645,0.045,0.355,1) infinite 0s}ul#mView li:nth-child(2){-webkit-animation:loadbars 2.1s ease-in-out infinite -0.5s}ul#mView li:nth-child(3){-webkit-animation:loadbars 2.2s ease-in-out infinite -0.5s}ul#mView li:nth-child(4){-webkit-animation:loadbars 2.3s ease-in-out infinite -0.5s}ul#mView li:nth-child(5){-webkit-animation:loadbars 2.4s ease-in-out infinite -0.5s}ul#mView li:nth-child(6){-webkit-animation:loadbars 2.5s ease-in-out infinite -0.5s}ul#mView li:nth-child(7){-webkit-animation:loadbars 2.6s ease-in-out infinite -0.5s}',
			// [[33,'o'],[35,'r'],[37,'t'],[34,'s'],[36,'e'],[33,'a'],[34,'m']]
			// ],
			// [
			// [
			// "@media all {html {font-size:{FONTSIZE}px;}}",
			// "@media screen and (max-device-width: {DEVICEWIDTH}px) {.mdw:before {content:'{DEVICEWIDTH}px'}}",
			// "@media only screen and (-webkit-min-device-pixel-ratio:{DPP}){.dpp:before{content:'{DPP}'}.dpi:before{content:'{DPI}'}html,body {font-size:{FONTPCT}% !important;}}"
			// ],
			// [2048,1920,1536,1440,1366,1280,1136,1025,960,768,720,640,480,320],
			// [1,1.3,1.5,2,3],
			// [96,124,144,192,288],
			// [100,100,100,100,100],
			// ['{FONTSIZE}','{DEVICEWIDTH}','{DPP}','{DPI}','{FONTPCT}'],
			// ['<div id="cpHead"><span class="cpText">Maestro cPanel</span><span id="btn_cpanel" class="pull-right cpText glyphicon glyphicon-cog" onclick="tgc(\'cpanel\');"></span></div><div id="cpLog"><table id="cpText" class="table table-hover table-striped"><thead><tr><th>Type</th><th>Object:ID</th><th>Message</th></tr></thead><tbody></tbody></table></div>','<span class="glyphicon glyphicon-']
			// ],
			// [
			// 'copy', 'cut', 'paste',
			// 'beforeunload', 'blur', 'change', 'click', 'contextmenu', 'dblclick', 'focus', 'keydown', 'keypress', 'keyup', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'resize', 'scroll',
			// 'DOMNodeInserted', 'DOMNodeRemoved', 'DOMNodeRemovedFromDocument', 'DOMNodeInsertedIntoDocument', 'DOMAttrModified', 'DOMCharacterDataModified', 'DOMElementNameChanged', 'DOMAttributeNameChanged', 'DOMActivate', 'DOMFocusIn', 'DOMFocusOut', 'online', 'offline', 'textInput',
			// 'abort', 'close', 'dragdrop', 'load', 'paint', 'reset', 'select', 'submit', 'unload'
			// ]
			// ];
			// this.db=this.enc(this.db)
		//},
		//Setup is called before init(). Use this to prepare your interface.
		setup:function() {
			this['_super']();
			this['db'] = "W1sic2NyaXB0IiwibGluayIsInB1dCĖImdlĜĞmNsĔĤ1zZĕėnVē25vd24iLCJ1bmRlZmĒZWQĸĺvYmplY3ņĹJBcnJheSĞkVycm9ĕčiY2xvĄVkIG9wYWNpdHkyMĝėmhōŅŇJ0ůlėŢŎBhĽVƃĎƅUZXhċŢdGJvZŴŇI8aDE+JiM5OŸIjwvƜƞPGgzPiĞƧƩDM+ČĎZđ2ƸidWĎőħřŹNvbĀǇƱŹ1Mb2FkƎČőtVłĢĭIklORk8ž0ƎƐLWŃmǡőpĽZvLXűZĲcƦķőXQVJOƽƓV4Ĝ13YXJēW5nƽǤjĐFtȅRǬĶtĄlnblĎưŚVSUk9řƒGȀȂkůȊǓžyń1ĴmUȖ2ȘȚȜǋǛRFQlVHǾȦȁC1ǒWZhƿxƑĎd3JlĽNoXĝƷŢb3BɑiBŧGFjĈR5MTAwƽTĲsŘBKȅɈĄĆĈĊūFuZCBTųƂƎɓńV0cyBjů4gŊUgĐ9hƺũūŦŤFėŬĕHɐǈ9ǣSǷĺ3ŞFwcȦšĎVǻMIHByəZpʒŪđzūĒdmʗaŅgWǚmZļĥ0ʾ9uƽU3RćȉȋŢɫJqńNɌiaHRtbƥnġYęʑ2UžkǏNļWİģŹxʴ2ƐƽƈěʛƇƥľhŞĂőƇşueǉdXMžzaʙdE5ƇW˦˾ɒlcˍyŘĞĢoȅQ6Iƥ̙ƎɐOiAžǎąƇDoˀǚlƆʤȖz̫ˁĞi0xMDɨMʯ4ƽXG5cciJdLʗďʼubǚi5ȮWxōǱlƽLľōįˑǁŋʸŢ͘Nzʅ͈͆˽y9jƺ4ēTſǈxhˢMuŤ9tIl0sˁJfX3ʃbSȊʾY/ɪǧjŞ9zǏZ0LlhNTEhUVF̥˾cʯħŰɉđǊ9qɱ˻ąćĉ˘ǿɃͩ̔̆őzɾsʀoʂċͺͼyJoƓāLƔƖŴė3dyȅBw̡7ʧǑƺŃ̲wO21˻ĠǬjoϓ3otʾ5ǒXg6ɦB9IˍhʾwsƓFǬHtɟɡɣƣjA7ʻl̈WJǬđ0eTpoʾǟń4ϺŬϓ̶̸̺w̼0ʈɚ˿ƉeɚŧȵˇWˉO˃peȦkOˍŧ̪ϓťŀn̜̹tˏdξШХϞϠϢϤɦ̻Ƶ7Ŋϵ2χəİɺ1ȎťŧϚͪ˃mϔǆʏỵMБ̺7ŁˉȂ̈XŌOjFɑTtŮWǟϠnћϹǈFȮȵuћϧIąwSȦʑϲ3Їˇ̪ЏAǝЦcгϕŗɄηǧn˚ЭjϊeDtţŰrZɏĴȉkǦэʙѐђϹͶsəI̝2ŁZjѠůѣːѦgϦweCɨIƝʦHhϨѰVɂųtmǏ5Αɇ̎ƂЃp1ˢ˭HVҴNwTŬnИɞȗМОʼă29ϮXĿϔƕųRǇTϛХӝѾoŶĉ4Хdʴ˛oћEБCUмşȮʨѦ7ʲ̓˃Ҝʣ6ȅ΂ztхŦcjpďɠɢԀǣƏΑǱ̚ѢĴzp͌ĲǝҠǇЬȴl6Zӟ3ŷӱέȂƇđșԅεɇ0fSN΋ɠɹǀ͌ɚɑnҌəR0Ǐ0ϥҋ2ĈűŊƂ϶OnʳȗԇӇѯӉȪɑC5ȎŬīѢ7̉V˱ƐћIұҳ͡wҶȧϲҠȆМN˸ϖĐȶԅԹ3ϹƓŭћӉeH0͌ǱЬş4ӎКͺˈѬРТũӡЧo̸ӰӷȦĠ̪ǍֆĵlkƓиzɨΞgՔȦ՗0ћё̼BӧˍlղQȑ͒˱4ӽ2˭ӵҀŞөbiāńΐ̷̣Ε҉ҋďɏϢҞNӦʮҖ֎̞MӧD֕Ŋ94ǰɓҥԑϛүӮ֔ҩT҉ҭʈąjӚͲ2tnΌ˅֢қҝҟY1ҢǗΕt6ǦŃɂӭҙяӕբJҺŬ3ПhʴGĿbnմʒʑENԴĿŔѠəűƓlǇԅmĈŻZҋիAϥjIuNȠևǗd֊ԠϺȵ֏ƭϥʸұ֕Օ֚֘Ŷ̽ӡ֠Hן֤ǳ֦Ť֩Ŝϔϖ֬Ǭ֯ؑשΖ2֜ӧ֫Ϙְ֮ԩֳxԭֶԶֹǓ6ּ֝־ǇđŪCׂOׄӲׇ׉ԏӝdϒ׎ؤבדAוԭטŤכםĽןӕӻҞѯףץĥџשǧɹ׬jӮ̹Aׯ9ױ׳9׵ź׸׺׼ԲƆŤͺЃBєłϮӵʼsʧhhKЌů؇Ŵ9ŷk7ǦȰe֯ϴɢӘϷϹǦtξGπНѡڗkԼϳώڢɤӶųŖ׻؇Σbԅڡ϶үFʸG˰ƈ˻ڄəچЛЃ՚eҠϱ؃ԅƇʯ̚ShڼڣPT՚KTs˝НٳŭږŲŴשؔڜWڧοsǦ۠ŰۢڮLۥۆיڈӟuMңʄ͋ӐսП۬ڭҩ̅ʎđ԰ѩԫĳڱ϶NDڊŁƂǿяڏڑړڕۭųȢ܊ApOy1˝ϝܞۇ۴oؖDۜa˲Թǀܠ۳Ђ۵܊ڰԈՃi4֙̕ȪјȓǏ֦۲ڇЂSAxʅBΠ5͔J9͘۾ۮؽϲ،͒ԋҞůxw̉EoܼۈT0ؽCڛڝvڟȰ܈ڣ̣42ܛ1r˚˜˞ݢܱݤܳݧӕڬۮۤYϺ˷ڷŲڹڻݣɤھۀۂmVۄմݘ۴gҫیb˛̓ۏތBے۔ݾ5ۗމۚۜʝ۟ݴܖۤ֕ڦڨڪ݊ޝ۰֕އܭܣٕt۹ɸۻНվޣŴ܀M܂ŃW܅΄ەɤйފʳތێpېޑYۓ޺ޕΖӯݞǉݡ߆ӭۦۨک۪ګۡޝɦܰϵݤٷݸڶnڸ؉ںp߆ހʔǬރۄ1AѕuȂmږ֠ԗ׻֢ŁȐʾxƣk݅̄ƕʧӖϔǮ߱tĵՖǳ՘m܇mէҋҺĲԍ˗͓̂ПࠇࠉtͣmM6ߺsڔƐųؒLͨͪGͬaͮܩͱͳ͵ӕtLąԘڃQƩࠥ΃ʐ̔؁ųMƖ̀࠷Ǉރ1ΌwǏw߫˛mKXކ࠽࠿ǏxڋіɄ߭ĀϱڮTࡉşࡀ2wࡍ߫Ʉ3ńȘ҆ؓɨϔ͓Ӝܱ̓֯ͣҧٷŝҲ9QG߿ԙ߳ͪXҹһҽɈǈӀЄVӄࡃӱߪȂ࡝҄ࡠĽŠѨs߾Ԙ֢̔ɤĐU6ࢆʱ޷ࢉ3ĆYԒ࠾mwІ˛ʄ̪ǯą˨͏pMnݬɠăyՏԺŉӕ߫Ȧ࡛9ࢥࢧࠫǐͣ֨ʄͨࠋҼʅ9ӃįࡿȖ͏0ƓYp܆ࣀӅV࡚߬ů1ࡒ6VϾļࢧ1ࢊࠀࠂاࠆŧࠈېߨࢁࡏ߮ۋࡱ߲ʼϟ͒ƣlӢEdļңࢼԍġʾб؛ԓəJ֣࡙࣡ĪδԝࣷɏࣺύɏחįʱChξ˛Ѝ8ࢮRu͘ŵ۩ůJz͡ǇSͩࡷńҼࠬऒG0ŉǱīӘख߰ࢧखѽF9ˠWͬӜࡅࡇࢰŭҐİࣤࢋt߳ࣨ߶O࣫ŧ࣭࣯ࡶࠌǰࣳWࣵDऀࣹݒ࡮ࡰसࡳƎूझҾࡺɭЄFƗdϗȓʉ࣍࡜࡞҅ح࢑ӳ࢈ࣘԙࢍ5࢏ॢࢇ࢔Х࢙ࢗŞ࢜ݫ࢟oࢡNࢣ5ࢴࢨFࢪࢬ2डͶࢰ˭Cࢳࢦ˜ࠬڿŨࢺ9ࣱࢾݻ؁Ɨԭ̈́Ҽࣆࣈ΄ŀHख़Şज़ȉढ़1ࡐ࣐ތڮRѢȄȆkʾɸ॥֢ࣚࠄ֙ࣜŞէճȎUʕѢ̓ԵধǱࡀɠƣmJҜąrХӏЛۼտУւӣЩ͓ZЬگָԸԺگавӠܟжƎиɧђѮϕWʾV3պޮӒॻĄӖ̄әـ֭ϚtMz١৮߈֔ЋկjQ1JџԨֲjUw৺tѶѢѸӤ۷و҃࡟ॡهҫҋħǱࠍЂ͒ǝࣜĽԡҷɄԤթpͪȉݐύɠǒ܃Zϒдࣨϡ৙ϥ৛̹फƿwȎVʳƎc޵Ӳор΁ɹɄԂчoחׄ֞өƗRӬؔ࠾Hإ֗ভՙؤڋʕǹ6ŞਊQӷ޷ѪĒǰϿੋͪ਍ىgȴڒƺٿҨ޼אਇҫɻѪŖK̺sŷwwL̺۶iڛ׆ӴŜਖ਼ʑđ࠾̸̲̽ٞΞҳਮਰਲX਴ƪħDNм٫סIzQ0NCϰbĉŧࢧƇЬঝјњٷ֋UϫĀࡀɏƀਞث֡हȦȎɏ΢ߟԅԔ݅IǧȖ̊ԯ؛ޫǤࠍٚԑࣷԕ઴lશŠϯࡃߨॄōmtŲɄҏXlm̰Ǝ޴ʏ੻ŖŔઌŷ࣌ئਜ਼ʥҊtȑȆ҅मࠁЌՙੇҳΕѻۋŻࣴ৕Ǎت৫ظ1غВѺ߯૭ॆ৕݁ੈ੕ѩǳ੘Әփyٍ4Ϳ1ļCNǖǘχ݃ࠤp،Ȇγ਻̉ɿHۜࠂ˙ЛǦɸʾϖ؈؊pীǑнŝyٺ۰Bۀ˪ՁjǦɐeǘ̈́މ۰YઓSੰ۰Aସ଺jM1ؗwxKSBߥ޾łʟ֓3ଈ˞ଋǗlǙଏЄࢰ੟Ť׷ĐQŏlڜXˡ૊ૌէłૡܹĶ࢑Ŭ૖ۄ޴̆4݁ʆ͔؁תऐНěɻୈߥͺZܿ৮C4࠾୍ଉ୐଍ʆħ୕֐ȑ˲Ѐ୛My୞ૈŊોԣĽૂȒȔܻ୪ƺ૗n୭ܳଧɛȅ୳ٴ۫୷େǭ୺ୋ୾஀̔୎ଊଌ୒଎இԓஉ୘஌oઔஐୠૉஓਙக୦஘୩ʐ஛୬ҩܳͣୱ஢l୴஥Ĝ஧Рகபŷ஬ஂ୏ர୓ளୖஊ୙G୛ؗ஺ୡ஽୤஖Әு૕௄Ŕஞܴ݂୲ோத୶௎୹௑୼A஫஁ம஄றஆଐ௚ஶ୚ஸi௠஼ୣ˿௤୧ங௃Ɣ௅୮࠾௉͕ௌ௰୸ந௳୽௓௷ஃௗல௼வ஋௿Ćంஒఄி஗ܺூ୫௩ெݦ௬ொఐࢿ௱ఓ୊௴௶̔0ĸȐb৯MŹǡXSxసzUĮČఽి৯cĮņ౅ీQĮ̆ో৯YŹ˦౐z఺ğEi్ౕğవXVě͈˝ǛBहѢp߄ƆĐwg૬ܩ౬षࠀȗԜЄ7ǟ9OΚNJWś9৴ͿవőAǈũʾEgɳ͑İɷ਺Aݗ޷׈শϻͪSȃѷƜ̫e0ȻũlDRVdJȻRIͿ֝୅ڊ͘ɅٜԆֱࣝʍۋэࢧԴ̜J3tEಡZJ઒VఽURUSH1੨d9ԫŚ౥ńज़୆࠼߶־΋ރɜ౪mQgKफ़Ͼݪǹ۝੘ಓłಕೇ؍Ս1ψ௥bԒ౶FBQԫஐľʦैiರŞ࣌ঀǿ̪߫ӍಜQUճn܆kʧڮŊǗࣸ߯಴࠯6ಸ಺UEl9ಸ1ޡ۪ςƗk౭धࢌȵ౴p౶Ȣ౹೮Dȿ0͖કǬઘŔRછ੔ಁౚాసϸ֙CୃOۘੱƝǍz౒ɦ઒੯̸ാ2ੲEя੭ɦEzNčЏI1ੲkݜw࢖jgs͢՚ੲଷ੯֙൉أ౐ହx۰఺Mʠ൑DĖୀͻWz൓െ଄ഷنD్ɦŵੲIӧF൭zٸ൳ٹ੮৛െӯୃ̹B͇͉ಛZۗ࣫TSՖFೋĮ಺಼ಾ0ೀȠೃ೅ಂĺ೭೯ඓĘഐഒϨŢඋඍRQ৸RϨκ̴8ϐƼّPVƋɚIńǑɕI+PHՋमʋť˻ԟ9ɕJ΋FĿղRǵj5NůVγʛvūNQՌbDƨ̔౪j48ෞƇɝʴD࠾ğͯഓԮɸń݁Čʇȏͣz෨ęļGwȖłॠ೙ƌ઻ūdɭĉІŰǊBșHțଖх4ஊबරʎĲՐlԉ෵RnYygธЕƈsJyڛරලঃࡨɸPƳනศxহYgʾQෆĺ΋EŦ˄Ȝjɋऔε୆෦෨ĥ՞ҷʥƱGĦ஢Ưඵƾࢩ࢏gϯԇȳ̉ټǓํ๋GȳࢍΪɛZใหˇѳ؏෡ų඼඾੄P࣫͂๖8Lˍo๝ƜޕŊŌŎ̜ȠQ๪๬๮DැʀാॆlPঃѸ෡๫ˎศƨƓŻůQල˛ď2ɤຆĴങŴฤʞ฻ԝ຃ຏŲ෠ƙ෢ฝɝՐঈ෴ǵĠขޑʾэɝจชđฌ͸lౡ͉ͶҫǄğ˪ˮĘ̯֟ƽഈҺɏĢȉତŪƄmx࠾ȹĥԏȫີĥΠNrຼࢯԢکԴ̐ĺȩ໅ณɢ˂ǮŎීƽܧV5੢3֮Ĥt֠ĉȮण໠֨5̄Μĺܞී೎ĴĶž໳ՒȰʻ໖ࣹсՒమ˹໻͕Ӹ̈́ĩĴ͕໰ȭʀСȲ̇Ŏƕ౫žEݚࣗǏĿSȉतſńŐĺ༔0༖ຏlUރܞZŀƥkRۗUĳʒSȯȱũท༑ೂŉ΁౦ҼƽRE9ΕşǒUĒŨyǿk༙Ҽbಜ༸V༺˘༽༿QӘʄkȰϐݎʓŢདෘ˲ϗɡ܏RɠƀUབྷđཙໃĎཛྷণ͓ಅ߫̌̎VD̉෭֨ཀྵiཛྷནԸ੒ƾӘlࡔȐZU׊ː༝༓༕BŎȓʻർ୼Ś༬Tƍཌྷz༙ʡJ༠1G˩࠾0༁Ĥˉըɹ໌ঋŁނ໽ԋƐཉw̄༞Ŗ੷ຸໍ؆͖ŢƗŖǳˎə໱িǏǑƽώǬЬ་༉˟؁ĐVjຸߝӃࠈૌĞࣁ௧ĺྫྷ==";
			this['db'] = this.dec(this['db']);
		}
	},
	['db']
);
/** 
 *  Maestro System Interface
 *
 * @file maestro.db.js (#7) in combine sequence.
 * FINALIZED
 */

/**
 *
 * @class I$System
 * @extends I$Db
 * @memberof Maestro
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Db',

	//What is the name of your new interface?
	'I$System',
	
	/** @lends I$Db */
	{		
		/** 
		 * This is an API so there can only be one instance.
		 *
		 * @property {number} maxTotalObjects
		 * @expose 
		 */
		maxTotalObjects:1,
		
		/** @expose */
		appMode:'webpage',
		
		/** @expose */
		devMode:false,

		/** @expose */
		nf:false,

		/**
		 * Initialize Maestro. Creates dynamic media queries, combines with
		 * core styling and embeds in the document using a style tag.
		 * Verified fully functional
		 * @method dmq
		 * @private
		 * @param {object} $p		null - not needed
		 * @memberof Maestro
		 * @expose
		 * @this {i$System}
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
					$p.a += M$['sra'](
						$p.b[5][1],
						$p.b[1][i],
						$p.b[0][1]
					);
				for (i = 0; i < 5; i++)
					$p.a += M$['sra'](
						$p.b[5][3],
						$p.b[3][i],
						M$['sra'](
							$p.b[5][4],
							$p.b[4][i],
							M$['sra'](
								$p.b[5][2],
								$p.b[2][i],
								$p.b[0][2]
							)
						)
					);
				return $p.a;
			}

			a = b = c = 0;
			c = cmq({
					a : '',
					b : M$['db'][5]
				});
				
			/* ==|== Insert Maestro (Nano Core CSS)========================== */
			a = D$.createElement('style');
			a.rel = M$['db'][3][4];
			a.type = M$['db'][3][3];
			a.innerText = (c + M$['db'][4][0]);
			a.id = "maestro";
			//insert in head
			if (c = M$['get'](M$['db'][0][12]))
				c[0].appendChild(a);
			
			//Create Maestro Common Container
			M$['aea'](M$['db'][0][13], M$['db'][0][20], M$['db'][0][23]);

			/* ==|== Create mLoader ======================================== */
			$tmp=M$['aet'](M$['db'][0][23], M$['db'][0][20],M$['db'][0][24]);
			//Add Class for mLoader
			this.setTheme();
			//Create Ul (Animated notes)
			$lUl = M$['aet'](M$['db'][0][24], M$['db'][0][21], M$['db'][0][25]);
			//Create LI (Animated Maestro Text)
			$tmp = M$['db'][4][1];
			for (var i = 0; i < $tmp.length; i++)
				M$['aet']($lUl, M$['db'][0][22], false, (M$['db'][0][17] + $tmp[i][0] + M$['db'][0][18] + $tmp[i][1] + M$['db'][0][19]));
			
			//cleanup
			delete $tmp;
			delete $lUl;
		},
		
		/**
		 * @method sys		
		 * @expose 
	     * @this {i$System}
		 */
		sys:function(){
			//Initialize HTML:data-role attribute
			$tmp=M$['cnt'](M$['db'][0][45]);
			
			var vr='role';
			//=-=|Set appMode based off HTMl data-role attribute|=-=//
			this['appMode']=(typeof $tmp.dataset[vr]===M$['db'][0][7])?M$['db'][0][46]:$tmp.dataset[vr].toLowerCase();
			//=-=|Get for tail and Wrapper DIVs|=-=//
			if (M$['gei'](M$['db'][0][13])==null|M$['gei'](M$['db'][0][40]==null)) {
				//=-=|found? then assume Maestro Document|=-=//
				this['appMode']=M$['db'][0][47];
			}
	
			//if we have both wrapper and tail then 
			//this is most likely a nanoFW document
			if (this['appMode']!=M$['db'][0][47]) {
				this['dmq']({});
				M$['off']('cpanel');

				//Execute on Load
				if (!this['nf'] && location.protocol != "file:") {
					this['ldf']({
						x : 'script',
						y : 'nano',
						z : '{VERPATH}',
						w : '{VERTYPE}'
					});
					this['ldf']({
						x : 'link',
						y : 'nano',
						z : '{VERPATH}',
						w : '{VERTYPE}'
					});
				}
				this['devMode']=(z===this['db'][1][1])?0:1;
			} 
			else M$['pld']();				
		},
		
		
		/** Nano framework/module Loader - Loaded the Javascript and Stylesheet
		 * Thats everything from NanoFW, Bootstrap, Font-Awesome, jQuery and Modernizr
		 *
		 * Verified fully functional
		 * @method ldf
		 * @expose
		 * @private
		 * @param {object} $p
		 * @memberof Maestro
		 */
		ldf : function ($p) {

			$p.a = $p.b = $p.c = 0;
			//Load Nano Framework
			$p.a = D$.createElement($p.x);
			$p.z = M$['chk']($p.z, '');
			$p.c = $p.z + '/' + $p.y;
			$p.w = M$['chk']($p.w, M$['db'][1][2]);

			if ($p.x == M$['db'][0][0]) {
				$p.a.async = 1;
				$p.a.src = $p.c + $p.w + M$['db'][1][3]; //.js || .debug.js
				$p.a.type = M$['db'][3][2];
				if ($p.c = M$['gei'](M$['db'][0][13]))
					$p.c.appendChild($p.a);
			} else {
				$p.a.href = $p.c + $p.w + M$['db'][1][4]; //.css || .debug.css
				$p.a.rel = M$['db'][3][4];
				$p.a.type = M$['db'][3][3];
				if ($p.c = H$)
					$p.c.appendChild($p.a);
			}
		},
		
		/**
		 * Check for the HTML data attribute theme [light|neutral|dark].
		 * defaults to light.
		 *
		 * Theme
		 * - Light	
		 * 		Maestro Notes 		ul#mView h1,h3{color:#222}
		 * 		Bubbles				ul#mView li {background-color: #888}
		 * 		Maestro background	#mLoader {background:#eee}
		 * - Neutral	
		 * 		Maestro Notes 		ul#mView h1,h3{color:#aaa}
		 * 		Bubbles				ul#mView li {background-color: #888}
		 * 		Maestro background	#mLoader {background:#666}
		 * - Dark	
		 * 		Maestro Notes 		ul#mView h1,h3{color:#eee}
		 * 		Bubbles				ul#mView li {background-color: #888}
		 * 		Maestro background	#mLoader {background:#222}
		 */
		setTheme:function() {
			var t='theme';
			$el=M$['cnt'](M$['db'][0][45]);
			$el.dataset[t]=(typeof $el.dataset[t]==M$['db'][0][7])?M$['db'][0][48]:$el.dataset[t];
			switch ($el.dataset[t].toLowerCase()) {
	
				case M$['db'][0][49]:M$['cnt'](M$['db'][0][24]).style.background='#666';break;
				case M$['db'][0][50]:M$['cnt'](M$['db'][0][24]).style.background='#222';break;
				default:M$['cnt'](M$['db'][0][24]).style.background='#eee';break;
			}
		},
		me:function(){
			return Module.name+' v'+Module.version;
		}
		
	},
	/** @lends I$Db.prototype */
	{		
		/**
		 * Interface Initialization method
		 * @constructor init
		 * @expose
		 * @memberof Maestro
		 */
		init:function ()
		{
			this['_super']();
		},

		/**
		 * Prepare the interfaces object before init is called. Excellent place
		 * to do property and method export and other preparations before init()
		 * is called.
		 * @method setup
		 * @expose
		 * @this {I$System}
		 * @memberof Maestro
		 */
		setup:function(){
			this['_super']();

			//===|Uncomment to export some properties or methods|===//
			// this.expose = ['your','props','and','mthods'];
			// for (var i=0;i<this.expose.length;i++) {
				// M$[this.expose[i]]=this[this.expose[i]].bind(this);
			// }
		},
		
		/**
		 * returns current Application Mode
		 * 
		 * @method getAppMode
		 * @expose
		 * @this {I$System}
		 * @returns {String}	App Mode
		 * @memberof Maestro
		 */
		getAppMode:function(){return this['Class']['appMode']},
		/**
		 * returns current Application Developer Mode
		 * 
		 * @method getDevMode
		 * @expose
		 * @this {I$System}
		 * @returns {boolean}	Developer Mode
		 * @memberof Maestro
		 */
		getDevMode:function(){return this['Class']['devMode']}
	},
	[]
);

/** 
 *  Cross device Console with Error Handler for Maestro
 *
 * @file maestro.console.js (#6) in combine sequence.
 */

/**
 * this interface provides error handling and a console for all devices even mobile.
 *
 * @class I$Console
 * @extends I$System
 * @memberof Maestro
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$System',

	//What is the name of your new interface?
	'I$Console',
	
	/** @lends I$System */
	{		
		/** 
		 * This is an API so there can only be one instance.
		 *
		 * @property {number} maxTotalObjects
		 * @expose 
		 */
		maxTotalObjects	: 1,
		logID			: null,
		logItems		: [],
		gOldOnError		: W$['onerror'],
		
		createCPanel:function() {
			/* ==|== Create cPanel ========================================== */
			if (this['devMode']>0) {
				a = M$['aet'](M$['db'][0][23], M$['db'][0][20], M$['db'][0][14], M$['db'][5][6][0]);
				a.className = M$['db'][0][11];
				this['logID'] = M$['gei'](M$['db'][0][15]).getElementsByTagName(M$['db'][0][16])[0];
				//add padding to top of wrapper for debug bar
				M$['cnt'](M$['db'][0][40]).style.paddingTop="20px";
			}
		}
	},
	/** @lends I$System.prototype */
	{
		/**
		 * Interface Initialization method
		 * @expose
		 * @constructor init
		 */
		init:function ()
		{
			this['_super']();
			this['Class']['createCPanel']();
		},
		setup:function(){
			this['_super']();
			// Override previous handler.
			W$['onerror'] = M$['err'];	
		},
		/** @expose */
		err : function() {
			var callstack = [],
				isCallstackPopulated = false;
			
			try {
				i.dont.exist+=0 //doesn't exist- that's the point
			} catch(e) {
				if (arguments[1].stack) { //Firefox
					var lines = arguments[1].stack.split('\n'),
						len=lines.length;
						
					for (var i=0;i<len;i++)
						if (lines[i].match(/^\s*[A-Za-z0-9\-_\$]+\(/))
							callstack.push(lines[i])
					
					//Remove call to printStackTrace()
					callstack.shift();
					isCallstackPopulated = true;
				} else if (W$['opera'] && e['message']) { //Opera
					var lines = e['message'].split('\n'),
						len=lines.length;
						
					for (var i=0; i<len; i++) {
						if (lines[i].match(/^\s*[A-Za-z0-9\-_\$]+\(/)) {
							var entry = lines[i];
							//Append next line also since it has the file info
							if (lines[i+1]) {
								entry += ' at ' + lines[i+1];
								i++;
							}
							callstack.push(entry);
						}
					}
					//Remove call to printStackTrace()
					callstack.shift();
					isCallstackPopulated = true;
				}
			}
			
			if (!isCallstackPopulated) { //IE and Safari
				var currentFunction = arguments.callee.caller;
				while (currentFunction) {
					var fn = currentFunction.toString();
					var fname = fn.substring(fn.indexOf(M$['db'][0][42]) + 8, fn.indexOf('')) || 'anonymous';
					callstack.push(fname);
					currentFunction = currentFunction.caller;
				}
			}
			
			try {
				var name,ancestry;
				
				name=(arguments[0].Class['shortName'])?arguments[0].Class['shortName']:null;
				if (!name) name=(arguments[0]['name'])?arguments[0]['name']:null;
				if (!name) name=(arguments[0].constructor.name)?arguments[0].constructor.name:M$['db'][0][6];
				
				ancestry=(arguments[0].Class['_fullTypeName'])?arguments[0].Class['_fullTypeName']:M$['db'][0][6];
			} catch (e) {
				name=M$['db'][0][6];
			}

			if (isCallstackPopulated){
				lines.shift();
			} else
				lines=[M$['db'][0][6]];

			//if (arguments[0].hasOwnProperty('shortName')) {
			if (name) {
				// Must be NanoFW object
				var NanoError=new Error();
				NanoError['who']=name;
				NanoError['ancestry']=ancestry;
				NanoError['what']=arguments[1].name+": "+arguments[1].message;
				NanoError['where']=lines;
				NanoError['local']=arguments[1][1];
				NanoError['params']=arguments[1][2];
				
				this['log'](NanoError['who'],'ERROR',NanoError);
			}
							
			// Just let default handler run.
			return M$['getDevMode']();
		},

		/**
		 * Toggles Maestro Control Panel on/off.
		 *
		 * @method tgc
		 * @param {boolean} $on	optional parameter to force state
		 * @memberof I$Alias
		 * @expose
		 */
		tgc : function ($on) {
			function hasClass(element, cls) {
				return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
			}

			//=-=|if in normal document mode exit|=-=//
			if (M$['getAppMode']()==M$['db'][0][47]) return;
			
			//=-=|get handle to cpanel|=-=//
			var $el=M$['cnt'](M$['db'][0][14]);
			//=-=|if no cpanel handle exit|=-=//
			if (!$el) return;
			//=-=|toggle visible state of cpanel|=-=//
			if (!$on || hasClass($el, 'open')) {
				//=-=|close|=-=//
				$el.className = M$['db'][0][11];
			} else if ($on || hasClass($el, 'closed')){
			//=-=|open|=-=//
				$el.className = M$['db'][0][38];
			}else return false;
		},
		/**
		 * Enhanced Cross-Browser cPanel/Console
		 *
		 * @method log
		 * @public
		 * @param {string} $id		Calling object name
		 * @param {string} $type	type of call [DEBUG,INFO,WARN,ERROR]
		 * @param {*} $args		Parameters, Stack or Error events
		 * @memberof Maestro
		 */
		log : function ($id, $type, $args) {
			var $msg,
			$nr,
			$nc,
			$nt;
			
			//if ($id)$id = $id;else$id = M$['db'][0][6]; //unknown
			$id=$id||M$['db'][0][6];
			
			$type=$type||'UNKN';	
			
			$type = $type.toUpperCase();
			
			$args['local']=(typeof $args['local']===M$['db'][0][7])?{}:$args['local'];
			
			$args['params']=(typeof $args['params']===M$['db'][0][7])?[]:$args['params'];
			
			if ($args.constructor.name == M$['db'][0][10]) {  //Error
				if ($args.hasOwnProperty(M$['db'][0][53])) {
					$msg=M$['db'][0][54]+$args['what']+'<br>';
					$msg+=M$['db'][0][55];
				
					$args['where'].forEach(
						function(ln){
							$msg+=ln+'<br>'
						}
					);
					$msg+=M$['db'][0][56]+Object.keys($args['local']).length+'<br>'
					for(var prop in $args['local']){
						$msg+='\t'+prop+'\t{'+$args['local'][prop].constructor.name.toString()+'}\t'+$args['local'][prop]+'<br>'
					}
					$msg+=M$['db'][0][57]+$args['params'].length+'<br>'
					for(var prop in $args['params']){
						$msg+='\t'+prop+'\t{'+prop.constructor.name+'}\t'+$args['local'][prop]+'<br>'
					}
				}
			}else if ($args.constructor.name == M$['db'][0][10]) {
				$msg = this['dmp']($args, 1);
			} else if ($args.constructor.name == M$['db'][0][9]&&$args.length>1) {
				$msg = new String().concat(Array.prototype.slice.call($args));
			} else
				$msg = $args[0];
				
			if (this['logID']==null) {
				console.log($msg);
				return;
			}
			//if we are in devMode display the console, other wise do an alert
			if (M$['getAppMode']()!=M$['db'][0][47]&&M$['getDevMode']()>0) {
				$nr = this['logID'].insertRow(-1);

				if ($type == M$['db'][0][26]) {
					//INFO
					$nr.className += M$['db'][0][27];
					$nt0 = M$['db'][5][6][1] + M$['db'][0][28]
				} else if ($type == M$['db'][0][32]) {
					//ERROR
					M$['pld']();
					$nr.className += M$['db'][0][33];
					$nt0 = M$['db'][5][6][1] + M$['db'][0][34]
					this['tgc'](true);
					if (console.log) console.log($msg);
				} else if ($type == M$['db'][0][29]) {
					//WARN
					$nr.className += M$['db'][0][30];
					$nt0 = M$['db'][5][6][1] + M$['db'][0][31]
				} else {
					//DEBUG
					$type = M$['db'][0][35];
					$nr.className += M$['db'][0][36];
					$nt0 = M$['db'][5][6][1] + M$['db'][0][37]
				}

				$nr.insertCell(0).innerHTML = $nt0;
				$nr.insertCell(1).innerHTML = '<i>' + $id + '</i>';
				$nr.insertCell(2).innerHTML = $msg;

				this['logItems'].push($args);

				if (this['logItems'].length > 100)
					this['logItems'].shift();		
			}			
		},
		/** @expose */
		dmp : function (array, return_val) {
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
			d = D$,

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

				if (typeof obj === M$['db'][0][8] && obj !== null && obj.constructor && getFuncName(obj.constructor) !== 'PHPJS_Resource') {
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
				if (B$) {
					this['log'](this.uniqueId, 'INFO', output);
				}
				return true;
			}

			return output;
		}
	},
	['err','dmp','tgc','log']
);

/** 
 *  Main Maestro object
 *
 * @project Maestro
 * @module Maestro
 * @file maestro.maestro.js (#2) in combine sequence.
 * @author Andrew Donelson <andrew@i2tmlabs.com> 
 * @copyright Copyright 2012-2014 by i2tm Labs - All rights reserved.
 * @license Private Commercial Software
 * @external M$
 * @external W$
 * @external D$
 * @external H$
 * @external B$
 * @external C$
 * @external S$
 * FINALIZED
 */
 
/**
  <h1>Maestro <small>Object</small></h1>
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
  <li></li>
  <li>Structured and Modular design for more versatile reuse of assets.</li>
  <li>Prototypal Inheritance with deep Object Cloning</li>
  <li>Uses Extendible Interfaces with Smart Cache</li>
  <li>Fast execution of large amounts of JavaScript Code.</li>
  <li>Integrated Versions Object (Even Bootstrap)</li>
  <li>DOM Alias's for most used tasks. Make coding faster and code footprint smaller.</li>
  <li>Auto Loading and Invocation</li>
  <li>XCORS Ajax</li>
  <li>Base64 Encoding & Decoding</li>
  <li>Lempel–Ziv–Welch universal lossless compression</li>
  <li>Designed to manage and enhance Bootstrap</li>
  <li>Packager for CloudApps, Applets and Modules.</li>
  </ul>
  </div>
  <div>
  <h3 style="color:red !important">
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

 ### Fast Alias's
 - W$	Window
 - D$	Document
 - H$	Head
 - B$	Body
 - C$	Stylesheets
 - S$	Scripts
  
  @todo 
  @class Maestro
  @extends I$Console
  @expose 
  @final
 **/
 extend(
	//What name of the interface are you extending?
	'I$Console',

	//What is the name of your new interface?
	'I$Maestro',
	
	/** @lends I$Console */
	{		
		/** 
		 * This is an API so there can only be one instance.
		 *
		 * @property {number} maxTotalObjects
		 * @expose 
		 */
		maxTotalObjects:1,		
		/**
		 * @property {Object} Module
		 * @expose 
		 */
		Module : {
			/**
              * @property {String} name			
			  * @expose 
			  */
			name:    	"Maestro",
			/**
              * @property {String} version			
			  * @expose 
			  */
			version: 	"1.5.0",
			/**
			  * comma delimited list of interfaces
              * @property {String} imports			
			  * @expose 
			  */
			imports: 	"I$Interface,I$Alias,I$Encoders,I$Db,I$System,I$Console",
			/**
              * @property {String} exports			
			  * @expose 
			  */
			exports:	"$M",
			/**
              * @property {String} namespace
			  * @expose 
			  */
			namespace: "Maestro"
		},
		onReady:function() {
			this['sys']();
		}
		
	},
	/** @lends I$Console.prototype */
	{
		/**
		 * Interface Initialization method
		 * @constructor init
		 * @expose
		 */
		init:function ()
		{
			this['_super']();
		},
		/**
		 * daaa!
		 * @method getMaestroName
		 * @expose
		 * @returns {String}
		 */
		getMaestroName:function(){return this['Class']['Module']['name']},
		/**
		 * daaa!
		 * @method getMaestroVersion
		 * @expose
		 * @returns {String}
		 */
		getMaestroVersion:function(){return this['Class']['Module']['version']},
		/**
		 * Prepare the interfaces object before init is called. Excellent place
		 * to do property and method export and other preparations before init()
		 * is called.
		 * @method setup
		 * @expose
		 */
		setup:function(){
			//Get parent Full Interface Type -> this['__proto__']['Class']['_fullTypeName']
			//console.log(__proto__,'setup');
			this['_super']()
			//===|Uncomment to export some properties or methods|===//
			// this.expose = ['your','props','and','mthods'];
			// for (var i=0;i<this.expose.length;i++) {
				// M$[this.expose[i]]=this[this.expose[i]].bind(this);
			// }
		},
		/**
		 * Returns a string version of a vendor library.
		 *
		 * @property {Object} versions
		 * @expose
		 */
		versions : function($lib){
			switch ($lib.toLowerCase()) {
				/**
				 * <img src="http://code.nanofw.com/i2tm/img/nano_banner_xs.jpg">
				 * <h4>Nano Framework Version</h4>
				 *
				 * @property {String} nf
				 */
				case 'nf' : return ''; break;
				/**
				 * <img src="http://code.nanofw.com/i2tm/img/bootstrap_sm.png">
				 * <h4>Bootstrap Version</h4>
				 *
				 * @property {String} bs
				 */
				case 'bs' : return '3.1.1'; break;
				/**
				 * <img src="http://code.nanofw.com/i2tm/img/jquery_sm.png">
				 * <h4>jQuery Version</h4>
				 *
				 * @property {String} jq
				 */
				case 'jq' : return '2.1.1pre'; break;
				/**
				 * <img src="http://code.nanofw.com/i2tm/img/modernizr_sm.png">
				 * <h4>Modernizr Version</h4>
				 *
				 * @property {String} mz
				 */
				case 'mz' : return '3.0.0pre'; break;
				/**
				 * <img src="http://code.nanofw.com/i2tm/img/font-awesome_sm.png">
				 * <h4>Font-Awesome Version</h4>
				 *
				 * @property {String} fa
				 */
				case 'fa' : return '4.0.3'; break;
			}
		},
		
		/** 
		 * @method main
		 * @expose 
		 */
		main:function(){
			//var arr = this['Module']['imports'].split(/\,/);
			//for (var i=0;i<arr.length;i++)
			//	M$['create'](arr[i]);
			
			if (W$['$']) {
				if (W$['jQuery']) {
					alert('Just query is loaded automatically by Maestro.');
				} else {
					alert('3rd party libraries must be loaded from your CloudApp Config.');
				}
			}
			
		}		
	},
	['create','get','queryNamespace','add','extend','main','isInterface','ref']	
);
//===| End Maestro Definition |===//
//M$.name.toString=function(){return 'The Maestro!'}/**! TAIL */
console.log('Maestro loaded, Initializing...');
M$=W$['create']('I$Maestro');
if (typeof M$==="undefined") 
	alert('Holy smokes batman! There seems to be a problem with Maestro!');
else 
	M$['main']();
