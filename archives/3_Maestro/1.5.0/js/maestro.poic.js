/**
 * Prototypal Inheritance with deep Object Cloning Object
 *
 * @instance
 * @expose
 */
if (!W$['P$']){
	W$['P$']={};
		
	(function(p){
		p['toString']=function(){return 'Prototypal Layer'};	/*|DEBUG|*/
		
		p['log']=function() {if (typeof M$==='object'&&M$['error'])M$['error'](arguments);else W$['log'](arguments)},
		
		/**
		 * JavaScript Timer Object
		 *
		 * NOT AVAILABLE IN PRODUCTION RELEASE
		 *
		 * 		var now=timer['elapsed']();	
		 * 		timer['stop']();
		 *		timer['start']();
		 * 		timer['reset']();
		 * 
		 * @expose
		 * @method 
		 * @return {number}
		 */
		p['timer']=function(){										
			var a=Date.now();										
			b=0;													
			return{													
				/** @expose */
				start:function(){return a=Date.now()},				
				/** @expose */
				stop:function(){return Date.now()},					
				/** @expose */
				elapsed:function(){return b=Date.now()-a},			
				/** @expose */									
				reset:function(){return a=0}						
			}														
		}(),														
								
		p['interfaces']={
			toString:function(){return 'Interfaces'},/*|DEBUG|*/
			
			/**
			 * Container object for all Interface instances
			 *
			 * @property {Object} Cache
			 * @expose 
			 */
			Cache : {
				toString:function(){return 'Cache'}/*|DEBUG|*/
			},
			
			/**
			 * Container object for all Interface definitions
			 *
			 * @property {Object} Store
			 * @expose 
			 */
			Store : {
				toString:function(){return 'Store'}/*|DEBUG|*/
			},
			
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
			Core : {
				toString:function(){return 'Core'}/*|DEBUG|*/
			},
			/**
			 * Container for legacy classes - Will be removed after nano framework
			 * if completely updated to use interfaces. Do not use.
			 *
			 * @property {Object} Classes
			 * @expose 
			 */
			Classes : {
				toString:function(){return 'Classes'}/*|DEBUG|*/
			}
			
		};
		p['interfaces']['Classes']['Class']=null;
		p['setName']=function setName(m){
			m.prototype.constructor.toString=function(){return 'POIC Method'};
		};
		p['extend']=function extend(intf,name,clss,proto,augments,expose){
			var obj = P$['reference'](intf);
			if (typeof obj=='function'||typeof obj=='object')
				obj=obj.extend(name,clss,proto,augments,expose);
							
			return (typeof obj==='function')?true:false
		};

		p['find']=function find(where,what){
			return (typeof where[what]!='undefined')?true:false;
		};
		
		p['reference']=function reference(what){
			var order,
				intf=P$['interfaces'];
			switch (arguments['callee']['caller']['name']) {
				case 'extend': 
					if (P$['find'](intf['Store'],what)===true) return intf['Store'][what];
					else if (P$['find'](intf['Core'],what)===true) return intf['Core'][what];
					else if (P$['find'](intf['Cache'],what)===true) return intf['Cache'][what];
					else return false;
					break;
				case 'create': 
					if (P$['find'](intf['Cache'],what)===true) return intf['Cache'][what];
					else if (P$['find'](intf['Store'],what)===true) return intf['Store'][what];
					else if (P$['find'](intf['Core'],what)===true) return intf['Core'][what];
					else return false;
					break;
				default: 
					order=[P$['interfaces']['Core'],P$['interfaces']['Store'],P$['interfaces']['Cache']];
					if (P$['find'](intf['Core'],what)===true) return intf['Core'][what];
					else if (P$['find'](intf['Store'],what)===true) return intf['Store'][what];
					else if (P$['find'](intf['Cache'],what)===true) return intf['Cache'][what];
					else return false;
					break;
			}
		};
		p['isInterface']=function isInterface(obj){
			if (typeof obj=='function'||typeof obj=='object'){
				return (obj['_fullTypeName']&&obj['uniqueId'])?'Cache':'Store';
			} else return false;
		};
		p['add']=function add(obj){
			var where=P$['isInterface'](obj);
			if (where!=false){
				p['interfaces'][where][obj.shortName]=obj;
			}
		};
		p['get']=function get(intf){
			return (typeof p['interfaces']['Store'][intf]!="undefined")
			?
			p['interfaces']['Store'][intf]
			:
			null;
		};
		p['queryNamespace']=function queryNamespace(fullName) {
			var intfName=null,ns,
			core	= P$['interfaces']['Core'],
			cache	= P$['interfaces']['Cache'],
			store	= P$['interfaces']['Store'],
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
		};
		/**
		 * @method 
		 * @returns {object|boolean}
		 */
		p['create']=function create() {
			var 
			intf,
			intfName= null,
			ns,
			found;
			
			try {
				if (!arguments) {
					W$['log']('Creating an new Interface requires at least the name of said interface :)');
					return false;
				}
				
				args=Array.prototype.slice.call(arguments, 0);
				intf=args.shift();
				
				intfName=(typeof intf==="string")?intf:intf['shortName'];
				
				found = P$['reference'](intfName);
				//if there already an instance created? just copy it and reset props
				if (found&&found['uniqueId']!=undefined)
					return found;
					
				if (intfName!=null) {
					var loc	= P$['interfaces']['Store'];
					if (typeof loc[intfName]!="undefined") {
						//if (typeof args==="undefined")
						//	var obj = new loc[intfName]();
						//else
							var obj = new loc[intfName](args||null);
						//Make sure we don't create more than the Interface allows
						if (obj['Class'].maxTotalObjects==0||obj['Class'].totalObjects <= obj['Class'].maxTotalObjects) {
							var ns = P$['queryNamespace'](intf);
							loc	= P$['interfaces']['Cache'];
							if (typeof loc[ns.shortName]==="undefined"){
								loc[ns.shortName]={};
							}
							if (obj['onReady']) obj['onReady']();
							return loc[ns.shortName][obj.uniqueId]=obj;
						} 
						else {P$['log']('Maximum number of '+intfName+' Interfaces reached, aborting')} //DEBUG
					} 
					else {P$['log']('Error: Interface definition not found. '+intfName)}//debug
				}	
			} catch (e) {
				P$['log']('Error: Maestro::Create('+intf.toString()+') - '+e.stack);//debug
			}
		}
	})(W$['P$']) //End closure scope
}

//=-=|Prototypal Layer takes over logging|=-=//
/** @expose */
//W$['log']=P$['log'];

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
 * @fires I$Interface#onReady
 *
 * @method create
 * @expose
 * @param {String|Object} intf	String name or actual interface definition
 * @returns {Object}	The new interface
 */
Window.prototype.create=W$['P$']['create'];
						
