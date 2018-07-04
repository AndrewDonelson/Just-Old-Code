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
		 * Call this method to make you primary members available 
		 * directly from Maestro.
		 *
		 * 		this['expose'](
		 * 		{
		 *			propAExposeName:thisInterfacePropA,
		 *			methodAExposeName:thisInterfaceMethodA
		 *		});
		 *
		 *		// Or
		 *
		 *		this['expose']({
		 *			'b64Encode'	: function(a) {return this['Class'].b64.enc(a)},
		 *			'b64Decode'	: function(a) {return this['Class'].b64.dec(a)},
		 *			'lzwEncode'	: function(a) {return this['Class'].lzw4.enc(a)},
		 *			'lzwdecode'	: function(a) {return this['Class'].lzw.dec(a)},
		 *			'encode'	: function(a) {return this.enc(a)},
		 *			'decode'	: function(a) {return this.dec(a)}
		 *		});
		 *
		 * @method expose
		 * @param {Object} what	members to expose
		 * @this {I$Interface}
		 * @expose
		 */		 
		expose : function(what) {
			if(this['exposed']===false && typeof what==='Array' && what.length>0) {
				var func,iname=this['Class']['shortName'];
				for (name in this.expose) {
					func=M$[name]=(this['expose'][name].bind(this));
					func.prototype.constructor.toString=function(){return iname}
				}
				this['Class']['exposed']=true;
			}
		},
		log:function log() {
			if (arguments) {
				var fn=null;
				fn=(arguments[1])?arguments[1].toLowerCase():'log';
				try {
					if (M$&&M$['info']){
						if (typeof arguments[2]!=='String'&&arguments[2].length==1)
							M$[fn](null,fn,arguments[2][0],arguments[0]);
						else
							console.log(arguments);
					}
					else if (W$['console']) W$['console'][type](arguments[2]);
				} catch (e) {
					console.error(e);
				}
			}
					
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
			this['log'](this['shortName'], this['WARN'], message);
		},

		/**
		 * Description
		 * @method debug
		 * @expose 
		 * @param {string} message
		 * @this {I$Interface}
		 */
		debug:function (message){this['log'](this['shortName'], this['DEBUG'], message)},

		/**
		 * Description
		 * @method error
		 * @expose 
		 * @this {I$Interface}
		 */
		error:function ()
		{
			this['log'](this['shortName'], this['ERROR'], message);
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
			this['log'](this['shortName'], this['INFO'], message);
		},
		
		/**
		 * Return a string name for this interface class
		 *
		 * @method toString
		 * @expose 
		 * @this {I$Interface}
		 * @returns {string}
		 */
		toString:function (){return 'I$Interface Class';}

	},
	//Define your public class properties and methods.
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
		{
			this['debug']('Initializing.');
		},

		/**
		 * Prepare the interfaces object before init is called. Excellent place
		 * to do property and method export and other preparations before init()
		 * is called.
		 * - Makes method safe global
		 *
		 * @method setup
		 * @expose 
		 */
		setup:function (){
			this['debug']('Performing setup.');
		},

		/**
		 *
		 * @method onReady
		 * @expose 
		 */
		onReady:function() {
			this['debug']('onReady invoked.');
		},
		
		/**
		 * reference to private method
		 * @method vld
		 * @param {*} a
		 * @returns {boolean}
		 * @expose 
		 */
		vld:function (a)
		{
			return this['Class']['vld'](a);
		},
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
		 * @todo Remove function
		 * @expose
		 */
		chk:function (a,d)
		{
			return this['Class']['chk'](a,d);
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
			return this['uniqueId'];
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
			return this['getUniqueId']();
		},
		
		/** @expose */
		expose:function(what) {this['Class']['expose'](what)},
		
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
				'I$Interface':
				this['Class']['fullName'] + ' [id: ' + (this['objectId']||0) + ']';
				
		},
		/**
		 * if in developer mode, send a Warning message to console.
		 *
		 * @method warn
		 * @expose 
		 * @param {string} message
		 * @this {I$Interface}
		 */
		warn:function ()
		{
			this['Class']['log'](this['uniqueId'], this['Class']['WARN'], arguments);
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
		debug:function (){this['Class']['log'](this['uniqueId'], this['Class']['DEBUG'], arguments);},
		/**
		 * INTERNAL-DEBUG only
		 *
		 * @method plog
		 * @expose 
		 * @this {I$Interface}
		 */
		plog:function (id,type,message){this['Class']['log'](id, type.toUpperCase(), message)},		
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
			this['Class']['log'](this['uniqueId'], this['Class']['ERROR'], arguments);
		},
										
		/**
		 * if in developer mode, send a Informational message to console.
		 *
		 * @method info
		 * @expose 
		 * @param {string} message
		 * @this {I$Interface}
		 */
		info:function ()
		{
			this['Class']['log'](this['uniqueId'], this['Class']['INFO'], arguments);
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
