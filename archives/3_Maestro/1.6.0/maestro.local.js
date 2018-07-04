/*!
 * Maestro local 1.6.0 - Mon, May 05, 2014  5:37:35 AM
 * Copyright 2012-2014 by i2tm Labs - All rights reserved.
 * License (http://static.i2tmlabs.com/LICENSE)
 */ 

/** 
 * JavaScript language extensions for Maestro
 *
 * @namespace window
 * @file maestro.window.js (#1) in combine sequence.
 * FINALIZED
 */
window['log']=function(){if (console) console.log(arguments)}

/** 
 * Character codes to string
 *
 * @example
 *      s='http://www.somedomain.com/?JSON="{"field1:"value1",field2:"value2"}"';
 *      a = s.str2CharCodes(s);
 *      s = s.charCodes2Str(a);
 *      console.log(s);
 *
 * @param {Array} b An array of character byte codes
 * @expose
 * @return {String|null}
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
 * @param {String} c A string to convert to array of byte codes
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
 * @param {String} a the string.
 * @return {String|null} a string with the first character capitalized.
 * @memberof window
 */
String.prototype.capitalize=function(a){return a.charAt(0).toUpperCase()+a.substr(1)};

/**
 * Like camelize, but the first part is also capitalized
 *
 * @expose
 * @method classize
 * @param {String} c
 * @param {String} d
 * @return {String|null} the classized string
 * @memberof window
 */
String.prototype.classize=function(c,d){for(var a=c.split(/_|-/),b=0;b<a.length;b++)a[b]=String.a(a[b]);return a.join(d||"")};

/**
 * Camelize a string
 * 
 * @expose
 * @method camelize
 * @param {String} a
 * @return {String} a the camelized string
 * @memberof window
 */
String.prototype.camelize=function(a){a=String.a(a);return a.charAt(0).toLowerCase()+a.substr(1)};

/**
 * Description
 * 
 * @expose
 * @method niceName
 * @param {String} s
 * @return {String} the niceName
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
window['W$']=window;

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
W$['M$']={};

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

Function.prototype.bind = function(scope) {
  var _fn = this;
  
  return function() {
	return _fn.apply(scope, arguments);
  }
};	

window.onload=function() {
	//W$['M$']=W$['create']('I$Maestro')
	//if(M$) M$['run']();
}; 

////!$(func,[args],[scopes])


/**
 * Prototypal Inheritance with deep Object Cloning Object
 *
 * @instance
 * @expose
 */
if (!W$['P$']){

	W$['P$']={
		devMode:false,
		db:[
		[
		'script','link','put','get','clk','msg','unknown','undefined','object','Array',
		'Error',
		'closed opacity20',
		'head',
		'tail',
		'cpanel',
		'cpTable',
		'tbody',
		'<h1>&#98',
		'</h1><h3>',
		'</h3>',
		'div',
		'ul',
		'li',
		'common',
		'mLoader',
		'mView',
		'INFO',
		'text-info',
		'info">',
		'WARN',
		'text-warning',
		'warn">',
		'ERROR',
		'text-danger',
		'error">',
		'DEBUG',
		'text-warning',
		'debug">',
		'open opacity100',
		'Only Javascript and Stylesheets can be loaded local or remote.',
		'wrapper',
		'URL provided is invalid [',
		'function',
		'String',
		'Object',
		'html',
		'application',
		'document',
		'light',
		'neutral',
		'dark',
		'anonymous',
		'shortName',
		'ancestry',
		'What: ',
		'Where: ',
		'Local: [',
		'Params: [',
		'-10000px',	
		'\n\r',
		'Prototypal Layer',
		'cloudapp',
		'vanish',
		'appear',			
		'<span class="mli mli-',
		'content',
		'layouts',
		'applets',
		'scripts',
		'styles',
		'images',
		'sounds',
		'libraries',
		'publisher',
		'shared',
		'vendor',
		'config'
		],
		
		/* [1] */
		['nano','.release','.debug','.js','.css'],
		
		/* [2] */
		['//cdn.i2tmlabs.com'],
		
		/* [3] */
		['__utm.gif?','Microsoft.XMLHTTP','application/javascript','text/css','stylesheet'],
		
		/* [4] */
		[
			/* [4][0] */
			'',
			/* [4][1] */
			[[33,'o'],[35,'r'],[37,'t'],[34,'s'],[36,'e'],[33,'a'],[34,'m']]
		],
		
		/* [5] */
		[
			/* [5][0] */
			[""],
			[2048,1920,1536,1440,1366,1280,1136,1025,960,768,720,640,480,320],
			[1,1.3,1.5,2,3],
			[96,124,144,192,288],
			[100,100,100,100,100],
			['{FONTSIZE}','{DEVICEWIDTH}','{DPP}','{DPI}','{FONTPCT}'],
			['<div id="cpHead"><span class="pull-left">Maestro cPanel&nbsp;v</span><span id="msv">v0.0.0</span><span id="btn_cpanel" class="pull-right cpText glyphicon glyphicon-cog" onclick="M$.tgc(\'cpanel\');"></span></div><div id="cpLog"><table id="cpTable" class="table table-hover table-striped"><thead><tr><th>Type</th><th>Object:ID</th><th>Message</th></tr></thead><tbody></tbody></table></div>','<span class="glyphicon glyphicon-']
		],
		
		/* [6] */
		[
		'copy', 'cut', 'paste',
		'beforeunload', 'blur', 'change', 'click', 'contextmenu', 'dblclick', 'focus', 'keydown', 'keypress', 'keyup', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'resize', 'scroll',
		'DOMNodeInserted', 'DOMNodeRemoved', 'DOMNodeRemovedFromDocument', 'DOMNodeInsertedIntoDocument', 'DOMAttrModified', 'DOMCharacterDataModified', 'DOMElementNameChanged', 'DOMAttributeNameChanged', 'DOMActivate', 'DOMFocusIn', 'DOMFocusOut', 'online', 'offline', 'textInput',
		'abort', 'close', 'dragdrop', 'load', 'paint', 'reset', 'select', 'submit', 'unload'
		]
		]	
	};
		
	(function(p){
		/** This line should get removed for production - otherwise it will set devMode to true */
		p['devMode']=(window)?true:false;						/*|DEBUG|*/
		
		p['toString']=function(){return 'Prototypal Layer'};	
		
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
		p['timer']=function timer(){										
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
		/**
		 * Test if all main elements are present, if not wipe body and create it ourselves.
		 * @method
		 */
		p['setBody']=function setBody() {
			var
				good=0,
				missing='',
				divs=[P$['db'][0][40],P$['db'][0][23],P$['db'][0][24],P$['db'][0][25],P$['db'][0][14],P$['db'][0][13]];
			for (var i=0;i<6;i++) 
				if (D$.getElementById(divs[i])) 
					good++;
				else
					missing+=divs[i]+',';
				
				
			//wrapper,common,mLoader,mView,cpanel,tail
			if (good!=6)
				B$.innerHTML='<!-- CloudApp is missing '+(6-good)+' core elements -->\n'+B$.innerHTML;
				//B$.innerHTML='<div id="wrapper" class="opacity0"></div><div id="common"><div id="mLoader" class="opacity100" style="background-color: rgb(238, 238, 238); visibility: visible; background-position: initial initial; background-repeat: initial initial;"><ul id="mView"><li><h1>♩</h1><h3>o</h3></li><li><h1>♫</h1><h3>r</h3></li><li><h1>♭</h1><h3>t</h3></li><li><h1>♪</h1><h3>s</h3></li><li><h1>♬</h1><h3>e</h3></li><li><h1>♩</h1><h3>a</h3></li><li><h1>♪</h1><h3>m</h3></li></ul></div><div id="cpanel" class="closed opacity20"><div id="cpHead"><span id="mvi" class="pull-left"></span><span id="btn_cpanel" class="pull-right cpText glyphicon glyphicon-cog" onclick="M$[\'tgc\'](\'cpanel\');"></span></div><div id="cpLog"><table id="cpTable" class="table table-hover table-striped"><thead><tr><th style="width:20%">Type</th><th style="width:30%">Object:ID</th><th>Message</th></tr></thead><tbody></tbody></table></div></div></div><tail id="tail" class="mdw dpp"></tail>';

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
					W$['debug']('Creating an new Interface requires at least the name of said interface :)');
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
						else {W$['error']('Maximum number of '+intfName+' Interfaces reached, aborting')} //DEBUG
					} 
					else {W$['error']('Error: Interface definition '+intfName+' not found in store.')}	//debug
				}	
			} catch (e) {
				W$['error']('Error: Maestro::Create('+intf.toString()+') - '+e.stack);					//debug
			}
		}
		
	p['setBody']();
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
P$['console']=(function() {	
	var	
	/**
	 * @property {string}
	 * @expose
	 */
	logID			= null,
	
	/**
	 * @property {function}
	 * @expose
	 */
	gOldOnError		= null,
	
	/**
	 * @property {array}
	 * @expose
	 */
	logItems		= [],

	addEntry=function($args) {
		logItems.push($args);

		if (logItems.length > 250)
			logItems.shift();		
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
	 * @expose
	 */
	log=function ($type, $args, $id) {
		if ($args.length==3) {
			$type=$args[0];
			$id=$args[2];
			$msg=$args[1];
		}

		$type = $type.toUpperCase();
		$id=(typeof $id==='undefined')?'unknown':$id;
		
		if ($type=='ERROR') {
			//=-=|Handle Special Case for Error|=-=//
			if ($args.hasOwnProperty(P$['db'][0][53])) {
				$msg=P$['db'][0][54]+$args['what']+'<br>';
				$msg+=P$['db'][0][55];
			
				$args['where'].forEach(
					function(ln){
						$msg+=ln+'<br>'
					}
				);
				$msg+=P$['db'][0][56]+Object.keys($args['local']).length+'<br>'
				for(var prop in $args['local']){
					$msg+='\t'+prop+'\t{'+$args['local'][prop].constructor.name.toString()+'}\t'+$args['local'][prop]+'<br>'
				}
				$msg+=P$['db'][0][57]+$args['params'].length+'<br>'
				for(var prop in $args['params']){
					$msg+='\t'+prop+'\t{'+prop.constructor.name+'}\t'+$args['local'][prop]+'<br>'
				}
			}
		} else {
			//=-=|Handle debug/info message|=-=//
			$msg = $args[0];			
		}

		//if we are in devMode display the console, other wise do an alert
		if (logID!=null&&P$['devMode']==true) {
			$nr = logID.insertRow(-1);

			if ($type == P$['db'][0][26]) {
				//INFO
				$nr.className += P$['db'][0][27];	//Info Icon
				$nt0 = P$['db'][0][64] + P$['db'][0][28];
			} else if ($type == P$['db'][0][32]) {
				//ERROR
				$nr.className += P$['db'][0][33];	
				$nt0 = P$['db'][0][64] + P$['db'][0][34];	//Remove Icon
				if (P$['devMode'] && console.log) console.log($msg); //debug
				$msg='<pre class="bg-danger">'+$msg+'</pre>';
				tgc(true);
				M$['pld']();
			} else if ($type == P$['db'][0][29]) {
				//WARN
				$nr.className += P$['db'][0][30];
				$nt0 = P$['db'][0][64] + P$['db'][0][31];
			} else {
				//DEBUG
				$type = P$['db'][0][35];
				$nr.className += P$['db'][0][36];
				$nt0 = P$['db'][0][64] + P$['db'][0][37];
			}

			$nr.insertCell(0).innerHTML = $nt0+'</span>';
			$nr.insertCell(1).innerHTML = '<i>' + $id + '</i>';
			$nr.insertCell(2).innerHTML = $msg;

			addEntry($args);
		}			
	},

	/**
	 * Interface Initialization method
	 * @expose
	 * @constructor init
	 */
	init=function ()
	{
		if (logID==null) {
			setup();
			if (typeof W$['debug']==='undefined')
				W$['debug']=function(message){log('DEBUG',arguments)}
				
			if (typeof W$['info']==='undefined')
				W$['info']=function(message){log('INFO',arguments)}
			
			if (typeof W$['error']==='undefined')
				W$['error']=function(message){log('ERROR',arguments)}

				//Save Old Handler
			gOldOnError = W$['onerror']
			
			// Override previous handler.
			W$['onerror'] = W$['error'];	
		}
		return true;		
	},
	
	setup=function(){
		if (D$.getElementById(P$['db'][0][40])){
			//if (!P$['devMode']) {D$.getElementById(P$['db'][0][14]).remove();return;}
			//D$.getElementById(P$['db'][0][14]).remove();
			W$['tgc']=tgc;
			/* ==|== Create cPanel ========================================== */
			logID = (D$.getElementById(P$['db'][0][15])).getElementsByTagName(P$['db'][0][16])[0];
			//add padding to top of wrapper for debug bar
			D$.getElementById(P$['db'][0][40]).style.paddingTop="20px";			
		}// No Wrapper
	},
			
	/** @expose */
	err=function() {
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
				var fname = fn.substring(fn.indexOf(P$['db'][0][42]) + 8, fn.indexOf('')) || 'anonymous';
				callstack.push(fname);
				currentFunction = currentFunction.caller;
			}
		}
		
		try {
			var name,ancestry;
			
			name=(arguments[0].Class['shortName'])?arguments[0].Class['shortName']:null;
			if (!name) name=(arguments[0]['name'])?arguments[0]['name']:null;
			if (!name) name=(arguments[0].constructor.name)?arguments[0].constructor.name:P$['db'][0][6];
			
			ancestry=(arguments[0].Class['_fullTypeName'])?arguments[0].Class['_fullTypeName']:P$['db'][0][6];
		} catch (e) {
			name=P$['db'][0][6];
		}

		if (isCallstackPopulated){
			lines.shift();
		} else
			lines=[P$['db'][0][6]];

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
			
			log('ERROR',NanoError,NanoError['who']);
		}
						
		// Just let default handler run.
		return //M$['devMode'];
	},

	/**
	 * Toggles Maestro Control Panel on/off.
	 *
	 * @method tgc
	 * @param {boolean} $on	optional parameter to force state
	 * @memberof I$Alias
	 * @expose
	 */
	tgc=function ($on) {
		function hasClass(element, cls) {
			return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
		}

		//=-=|get handle to cpanel|=-=//
		var $el=M$['cnt'](P$['db'][0][14]);
		//=-=|if no cpanel handle exit|=-=//
		if (!$el) return;
		//=-=|toggle visible state of cpanel|=-=//
		if (!$on || hasClass($el, 'open')) {
			//=-=|close|=-=//
			$el.className = P$['db'][0][11];
		} else if ($on || hasClass($el, 'closed')){
		//=-=|open|=-=//
			$el.className = P$['db'][0][38];
		}else return false;
	},
	
	/** @expose */
	dmp=function (array, return_val) {
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

			if (typeof obj === P$['db'][0][8] && obj !== null && obj.constructor && getFuncName(obj.constructor) !== 'PHPJS_Resource') {
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
			if (B$) {if (this['debug']) this['debug'](this['uniqueId'], 'INFO', output);}
			return true;
		}

		return output;
	}
	
	//=-=|Func Main|=-=//
	if (init()) {
	}
});

P$['console']();
info('Maestro Console Initialized.');/** 
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
//=-=|BEGIN MAESTRO COMPONENT/ELEMENT CODE|=-=//
(function (m$) {
	m$['Component']={};
	m$['Element']={};
	
	m$['Element'].registerComponents= function() {
		/**
		 * Nano Framework Enhanced Search Element
		 *
		 * @example <m-nano component="search"></m-nano>
		 */	
		m$['Component']['search'] = {
			init:function(self,args) {
				var css='/*[Component:Search]*/',html="";
				
				//Normalize CSS
				css+="input#nav-search.form-control{border-radius:2em 0em 0em 2em;background-color:#008000;color:#FFF;width:50px;border:none}";
				css+="input#nav-search.form-control:active,input#nav-search.form-control:focus{width:150px;border:none}";
				css+="m-nano .btn-i2tm-search{height:2.4em;background-color:#008000}";
				
				//Normalize HTML 
				html+="<style>"+css+"</style>";
				html+='<form class="navbar-form" role="search" action="#" onclick="">';		
				html+='<div class="input-group">';		
				html+='<input type="text" class="form-control" name="nav-search" id="nav-search" x-webkit-speech="">';		
				html+='<input name="siteurl" type="hidden" value="i2tmlabs.com/">';		
				html+='<div class="input-group-btn">';		
				html+='<button class="btn btn-i2tm-search" type="submit"><i class="glyphicon glyphicon-search"></i></button>';		
				html+='</div></div></form>';		
				
				return [css,html]
			}
		};


		/**
		 * Nano Framework CloudLett Element
		 *
		 * @example <m-nano component="applet"></m-nano>
		 */	
		m$['Component']['applet'] = {
			init:function(self,args) {
				var css="",html="";			
				return [css,html]
			}
		};
		
		/**
		 * Nano Framework Enhanced Auto Awareness Header Element
		 *
		 * @example <m-nano component="header" size="auto|xs|sm|md|lg|xl"></m-nano>
		 * DONE
		 */ 
		m$['Component']['header'] = {
			init:function(self,args) {
				var css="",html="";
				
				//Normalize HTML 		
				self.innerHTML=this.parse(self.innerHTML);		

				//Normalize CSS
				self.children[0].css="font-family:neuropol;color:green;text-transform:uppercase";
				self.children[1].css="color:white;text-trassform:lowercase";
		
				return true;
			},
			
			parse:function(text) {
					
				var res = text.split(" ");
				if (res.length && res.length>1) {
					res1 = res.slice(0, res.length/2);
					res2 = res.slice(res.length/2, res.length);
					return '<h1>'+res1.join(" ")+'&nbsp;<small>'+res2.join(" ")+'</small></h1><hr>';
				}
			}
		};


		/**
		 * @example <m-nano component="led" 
		 *					shape="round|square|rectangle" 
		 *					color="blue|red|green|yellow" 
		 *					state="on|off"
		 *			></m-nano>
		 * DONE
		 */
		m$['Component']['led'] = {
			init:function(self,args) {
				var html='',css='';
				css+='margin:0.75em;display:inline-block;';			
				css+=this.getShape(args['shape']);	
				css+=this.getColorState(args['color'],args['state']);
				
				return [css,html]
			},
			
			getShape:function(s){
				var css='';
				
				if(s=='square')
					css+='width:1em;height:1em;border-radius:0%;';
				else if (s=='rectangle')
					css+='width:2em;height:1em;border-radius:0%;';
				else
					css+='width:1em;height:1em;border-radius:50%;';
				
				return css;
			},
			
			getColorState:function(c,s){
				var css='';
				
				//=-=|Set to red on/off|=-=//
				if (c=='red'&&s=='on')
					css+='background-color:#F40;box-shadow:#000 0 -1px 7px 1px, inset #600 0 -1px 9px, #F00 0 2px 1em;';
				else if (c=='red'&&s=='off')			
					css+='background-color:#690606;box-shadow:#000 0 -1px 7px 1px, inset #300 0 -1px 9px, #600 0 2px 1em;';
			
				//=-=|Set to green on/off|=-=//
				else if (c=='green'&&s=='on')
					css+='background-color:#393;box-shadow:#000 0 -1px 7px 1px, inset #0F0 0 -1px 9px, #7D0 0 2px 1em;';
				else if  (c=='green'&&s=='off')
					css+='background-color:#250;box-shadow:#000 0 -1px 7px 1px, inset #020 0 -1px 9px, #040 0 2px 1em;';
			
				//=-=|Set to blue on/off|=-=//
				else if (c=='blue'&&s=='on')
					css+='background-color:#0BF;box-shadow:#000 0 -1px 7px 1px, inset #006 0 -1px 9px, #0BF 0 2px 1em;';
				else if (c=='blue'&&s=='off')
					css+='background-color:#060669;box-shadow: #000 0 -1px 7px 1px, inset #003 0 -1px 9px, #006 0 2px 1em;';
					
				//=-=|Set to yellow on/off|=-=//
				else if (c=='yellow'&&s=='on')
					css+='background-color:#FF0;box-shadow:#000 0 -1px 7px 1px, inset #660 0 -1px 9px, #FF0 0 2px 1em;';
				else
					css+='background-color:#A90;box-shadow:#000 0 -1px 7px 1px, inset #220 0 -1px 9px, #440 0 2px 1em;';
				
				return css;
			},		
			onchanged:function(self,args) {
				self.style.cssText=this['init'](self,args)[0];			
				//return this.prototype.init(self,args);
			}
		};
		
		
		/**
		 * A standard i2tm Labs Feature component
		 *
		 * - options.titleBig	title to display, Big Gold part
		 * - options.titleSmall	title to display, Small Orange part
		 * - options.content	content to display
		 * - options.linkHref	the uri for a link (optional)
		 * - options.linkName	title of button
		 * - options.heightGrp	a group of container elements that will have height monitored and all elements with have same maximum height.
		 *
		 * CSS Classes: 
		 * - i2tm: headerDIV greenBG headerBigGold headerSmall btn-i2tm
		 * - Bootstrap: btn
		 *
		 * @example <m-nano component="applet"></m-nano>
		 *
		 * @method
		 * @param {Element} Target container element
		 * @param {object} options for feature 
		 * @this {Maestro2}
		 * @expose
		 */
		// feature:function (parent,options) {
			// var nel=D$.createElement('div');
				// nel.innerHTML='<div class="headerDIV greenBG"><span class="headerBigGold">'+options.titleBig+'</span><span class="headerSmall">'+options.titleSmall+'</span></div>';
				// nel.innerHTML+='<p class="greenBG">'+options.content+'</p>';
				// if (options.linkHref&&options.linkHref!='')
					// nel.innerHTML+='<p><a class="btn btn-i2tm" href="'+options.linkHref+'" role="button">'+options.linkName+'</a></p>';	
			// this['component'](parent,nel);
		// }, //End feature()	
		m$['Component']['feature'] = {
			init:function(self,args) {
				var css="",html="";	
				html+='<div class="headerDIV greenBG"><span class="headerBigGold">'+options.titleBig+'</span><span class="headerSmall">'+options.titleSmall+'</span></div>';
				html+='<p class="greenBG">'+options.content+'</p>';
				if (options.linkHref&&options.linkHref!='')
					html+='<p><a class="btn btn-i2tm" href="'+options.linkHref+'" role="button">'+options.linkName+'</a></p>';	
					
				return [css,html]
			}
		};

		/**
		 * a standard i2tm Labs Jumbotron component
		 *
		 * - options.title		title to display
		 * - options.content	content to display
		 *
		 * CSS Classes: 
		 * - i2tm: greenBG
		 * - Bootstrap: jumbotron
		 *
		 * @method
		 * @param {Element} Target container element
		 * @param {object} options for feature 
		 * @this {Maestro2}
		 * @expose
		 */
		m$['Component']['jumbotron'] = {
			init:function(self,args) {
				var css="",html="";	
				html+='<div class="jumbotron"><h1>'+options.title+'</h1><p>'+options.content+'</p></div>';
				return [css,html]
			}
		};

		/**
		 * Article
		 *
		 * @method
		 * @this {Maestro2}
		 * @expose
		 */
		m$['Component']['article'] = {
			init:function(self,args) {
				var css="",html="";	
				//nel.innerHTML='<div class="page-header">';
				//nel.innerHTML=this['getDB'](0,'Article','header','image_src','content paragraph1','content paragraph2'); //HEADER
				//</div>
				//<img id="logo" class="img-responsive" src="img/logo-i2tmlabs.png">
				//<p>i2tm Labs started as Donelson Entertainment back in 1995 and the owner Andrew Donelson has been programming computers since 1985 when he started with a top of the line Commodore 64. Primarily focusing on ANSI C or C++ and the MS-DOS / Windows Platforms he has developed everything from an Operating system, PCDesk a Windows 3.1 competitor to Games such as Epic Online, a short lived Sci-Fi strategy MMOG. In 1992 he was hired by Net-Connect, Ltd to create software to handle &amp; track customers connecting via modems to the new Internet Service Provider for billing purposes and was also tasked to create the ISP's official website in HTML 1.</p>
				//<p>Since then he has contacted with companies such as GoDaddy, i4Vegas, Hotels.com and many more to create new or upgrade content. In mid 2012 he moved completely to Web Development using the upcoming release of HTML5/CSS3/JavaScript. He started the H5C3 Framework which was initially going to be solely for web gaming but it has developed into much more and is getting close to public release but is already being used in i2tm Labs products and services.</p>
				return [css,html]
			}
		};
		
		
	} //end registerComponents()
	
	m$['Element']['prototype'] = Object.create(HTMLModElement.prototype);
	/**
	 * an instance of the element is created - Normalize HTML & CSS
	 * @this {Maestro}
	 */
	m$['Element']['prototype']['createdCallback'] = function() {
		var args = this.parseAttributes();
		this['init'](args);
	};
	/**
	 * an instance was inserted into the document
	 * @this {Maestro}
	 */
	m$['Element']['prototype']['attachedCallback'] = function() {
		if(m$['Component'][this['component']]['oninsert'])
			m$['Component'][this['component']]['oninsert'](this,arguments);
	};
	/**
	 * an instance was removed from the document
	 * @this {Maestro}
	 */
	m$['Element']['prototype']['detachedCallback'] = function() {
		if(m$['Component'][this['component']]['onremove'])
			m$['Component'][this['component']]['onremove'](this,arguments);
	};
	/**
	 * an attribute was added, removed, or updated
	 * @this {Maestro}
	 */
	m$['Element']['prototype']['attributeChangedCallback'] = function() {
		if(m$['Component'][this['component']]['onchanged'])
			m$['Component'][this['component']]['onchanged'](this,this['parseAttributes']());
	};

	/**
	 * @this {Maestro}
	 */
	m$['Element']['prototype']['parseAttributes'] = function() {
		var name,value,args={},
			builtin=['component'];
			
		for (var i=0;i<this.attributes.length;i++) {
			name=this.attributes[i].name.toLowerCase()||'';
			value=this.attributes[i].value||'';
			if (builtin.indexOf(name)!=-1)
				this[name]=value;
			else
				args[name]=value;
		}
		return args;
	};

	/**
	 * @this {Maestro}
	 */
	m$['Element']['prototype'].init = function(args) {
		if (typeof m$['Component'][this['component']] === 'undefined')
			m$['Element'].registerComponents();
			
		var result = m$['Component'][this['component']]['init'](this,args);
		if (result===true) return; //Component handled applying html and css		
		this['style']=result[0];
		this['innerHTML']=result[1];

	};

	// 2. Define a property read-only "bar".
	//Object.defineProperty(m$['Element']['prototype'], "css", {value: ''});

	// 3. Register m-nano's definition.
	m$['Element'] = D$['registerElement']('m-nano', {prototype: m$['Element']['prototype']});
	//=-=|END MAESTRO COMPONENT/ELEMENT CODE|=-=//

})(P$);
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
		expose : function expose(what) {
			if(this['exposed']===false && typeof what==='Array' && what.length>0) {
				var func,iname=this['Class']['shortName'];
				for (name in this.expose) {
					func=M$[name]=(this['expose'][name].bind(this));
					func.prototype.constructor.toString=function(){return iname}
				}
				this['Class']['exposed']=true;
			}
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
		init:function init()
		{
			this.name=this['toString']();
			if (this['debug']) this['debug']('Initializing.');
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
		setup:function setup(){
			if (this['debug']) this['debug']('Performing setup.');
		},

		/**
		 *
		 * @method onReady
		 * @expose 
		 */
		onReady:function onReady() {
			if (this['debug']) this['debug']('onReady invoked.');
		},
		
		/**
		 * reference to private method
		 * @method vld
		 * @param {*} a
		 * @returns {boolean}
		 * @expose 
		 */
		vld:function vld(a)
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
		chk:function chk(a,d)
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
		
		/** @expose */
		info:function info($m){
			W$['info']('INFO',$m,this.toString());
		},

		/** @expose */
		error:function error($m){
			W$['error']('ERROR',$m,this.toString());
		},

		/** @expose */
		debug:function debug($m){W$['debug']('DEBUG',$m,this.toString())},
		
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
		toString:function(){return 'I$Alias Class'},
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
		},
		toString:function(){return 'I$Alias Object';},
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
				if ($el === P$['db'][0][45] || "body" || "head")
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
			try{this['cnt']($el).setAttribute($var, $val)}catch(e){return false}
			return true;
		},

		/**
		 * Alias for element.getAttribute()
		 * Get all data attributes for the given element.
		 *
		 * @example
		 * 		var btnColor = this('ega',"button","color");
		 *
		 * @method ega
		 * @param 	{*}		$el 	The name of an element or the actual element
		 * @param 	{string} 	$var	The name of the attribute you want to get
		 * @memberof I$Alias
		 * @expose
		 */
		ega : function ($el, $var) {
			return this['cnt']($el).getAttribute($var);
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
			var $el = this['cnt']($el);
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
			var $el = this['cnt']($el);
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
		 * Returns file extension from a url string
		 *
		 * @method gex
		 * @param {String}	a	
		 * @return (String|null) extension
		 * @expose 
		 */
		gex : function(a){
			if (typeof a==='undefined'||a=='') return ''; else return /(?:\.([^.]+))?$/.exec(a)[1].toLowerCase()
		},
		
		/**
		 * Returns file name from a url string
		 *
		 * @method gfn
		 * @param {String}	a	
		 * @return (String|null) filename
		 * @expose 
		 */
		gfn : function(a){
			return a.substring(a.lastIndexOf("/")+1)
		},
		
		/**
		 *  Tests a boolean evaluation and throws an exception with the error string. (Assert)
		 *
		 * @example
		 *   	this('ast',foo,'BOOYA!');
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
		 * Utility function for loading JavaScript or Stylesheets.
		 * No other file formats are supported.
		 *
		 * @method bnd
		 * @param {string} $fileType 	either script or link
		 * @param {string} $id 			element ID of this file
		 * @param {string} $url 		full path to file, local or remote
		 * @param {boolean} $tail		set to true if you want script loaded into tail.
		 * @param {string} $after 		make sure loaded file is after this given file
		 * @param {callback} $onLoad 	optional
		 * @param {callback} $onError 	optional
		 * @memberof I$Alias
		 * @expose
		 */
		lds : function ($filetype, $id, $url, $tail, $after,$onLoad, $onError) {
			
			function _onLoaded() {}

			function _onErrored() {}
			
			function insert(self) {
				//tail or head? .. or applet?
				c = ($tail==true)?self['gei'](P$['db'][0][13]):self['get'](P$['db'][0][12])[0];
				
				if (typeof $after!='string') $after='last';
				
				if ($after=='first'){
					//=-=|Insert before all other scripts|=-=//
					c.firstElementChild(a);
					return true;
				} else if ($after=='last'){
					//=-=|Insert before all other scripts|=-=//
					c.appendChild(a);
					return true;
				} else {
					//=-=|find $after and insert after|=-=//
					c=self['gei']($after);
					if (typeof c !='undefined'){
						if (c.nextElementSibling!=null) {
							c.nextElementSibling.insertBefore(a);
							return true;
						}
					}
				}
				return false;
			}
		
			var a,b,c,d = $url.indexOf("applet.");
					
			//=-=|Prepare required parameters|=-=//
			for (var i = 0;i<3;i++) {
				arguments[i]=this['chk'](arguments[i],false);
				if (arguments[i]===false) {
					throw(new Error(this['uniqueId']+'::'+'lds()'+'Invalid or Missing required parameters.'));
				}
			}
			this['chk']($after,false);	
			if (arguments[0] == P$['db'][0][0]) {
				a = D$.createElement(P$['db'][0][0]);
				a.async = 1;
				a.src = $url; 
				a.type = P$['db'][3][2];
			} else if (arguments[0] == P$['db'][0][1]) {
				a= D$.createElement(P$['db'][0][1]);
				a.href = $url;
				a.rel = P$['db'][3][4];
				a.type = P$['db'][3][3];
			} else {
				this['warn']('Only Javascript and Stylesheet files can be loaded locally. ('+$url+')');
				return false
			}
			
			a.id=arguments[1];
			a.onload = ($onLoad) ? $onLoad : _onLoaded.bind(this);
			a.onerror = ($onError)? $onError : _onErrored.bind(this);
			
			if ($tail===-1)
				return true;
			else
				return insert(this);
		},

		/**
		 * This function accepts a URL and will convert its parameters to an object and return it. 
		 * Optionally, if you call without a parameter it will use the current location object instead.
		 * //http://localhost:8080/cdn/?nv=auto&nb=local&local=1
		 *
		 * @method upo
		 * @param {object} url
		 * @returns {object}
		 * @memberof I$Alias
		 * @expose
		 */				 
		upo:function upo(url){
			
			if (!url) url = location.search.substring(1);
			if (url=='')
				return false;
			else
				return url?JSON.parse('{"' + url.replace(/&/g, '","').replace(/=/g,'":"') + '"}',function(key, value) { return key===""?value:decodeURIComponent(value) }):{}
		},
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
			// Create the XHR object.
			createCORSRequest = function (method, url) {
				var xhr = new XMLHttpRequest();
				if ("withCredentials" in xhr) {
					// XHR for Chrome/Firefox/Opera/Safari.
					xhr.open(method, url, true);
				} else if (typeof XDomainRequest != "undefined") {
					// XDomainRequest for IE.
				xhr = new XDomainRequest();
					xr.open(method, url);
				} else {
				// CORS not supported.
					xhr = null;
				}
				return xhr;
			}

			// Helper method to parse the title tag from the response.
			getTitle = function (text) {
				return text.match('<title>(.*)?</title>')[1];
			}

			// Make the actual CORS request.
			makeCorsRequest = function ($url, $onLoad, $data) {
				if (Maestro['gei']('Maestro-XHR-LED-RCV'))
					Maestro['gei']('Maestro-XHR-LED-RCV').className='led round red-on';

				var xhr = createCORSRequest('GET', $url);
					if (!xhr) {
						alert('CORS not supported');
					return;
				}

				xhr.onloadstart = function(){
					//check for Loading LEDs or Progress Bar and update
					if (Maestro['gei']('Maestro-XHR-LED-SND'))
						Maestro['gei']('Maestro-XHR-LED-SND').className='led round red-on';

					if (Maestro['gei']('Maestro-XHR-PRGBAR'))
						Maestro['gei']('Maestro-XHR-PRGBAR').value=0;
				}
				
				xhr.onloadend = function(){
					//check for Loading LEDs or Progress Bar and update
					if (Maestro['gei']('Maestro-XHR-LED-SND'))
						Maestro['gei']('Maestro-XHR-LED-SND').className='led round red-off';
						
					if (Maestro['gei']('Maestro-XHR-PRGBAR'))
						Maestro['gei']('Maestro-XHR-PRGBAR').value=100;

					if (typeof window['appletOnLoaded']=='function')
						window['appletOnLoaded']();
				}	
				
				// Response handlers.
				xhr.onload = function() {
					var el;
					if ($onLoad!=null) {
						if (el=Maestro2['gei']($onLoad)) {
							el.innerHTML=xhr.responseText;
						} else if (typeof $onLoad == 'function') {
							$onLoad(xhr.responseText);
						}
					}
				};

				xhr.onerror = function() {
					alert('Woops, there was an error making the request.');
				};

				
				xhr.send();
				 
				if (Maestro['gei']('Maestro-XHR-LED-RCV'))
					Maestro['gei']('Maestro-XHR-LED-RCV').className='led round red-off';
			} //makeCorsRequest()
			
			makeCorsRequest($url, $onLoad, $onError, $method, $data);
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
					this.prototype.b64(//<-- LZW Base64 Encoded
						this.prototype.lzw.enc(//<-- JSON COMPRESSED
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
				this.prototype.lzw.dec(
					this.prototype.b64($p.a));
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
		 * @param {String} 	this 		text for die message
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
				e.objectName = (!$object) ? P$['db'][0][6] : $object;
				e.arguments = (!$args) ? 'none' : $args;
				if (typeof window.onError === P$['db'][0][42])
					window.onError(e)
			},
				false);

			window.onError = function (e) {
				this['Class']['log']('DIE!!!', P$['db'][0][10], e);
			}

			for (var i = 0; i < P$['db'][6].length; i++) {
				window.addEventListener(P$['db'][6][i], function (e) {
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
				var $el=this['cnt']($el);if (!$el) return;
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
				err(this,e,{local:{},args:Array.prototype.slice.call(arguments, 0)})
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
			var $el=this['cnt']($el);if (!$el) return;
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
			var $el=this['cnt']($el);if (!$el) return;
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
			var $el=this['cnt']($el);if (!$el) return;
			//Start transition to off
			this.cls($el,'replace','opacity100','opacity0');
			//if not cpanel, then set timeout to set visibility to hidden
			if ($el.id!=P$['db'][0][14])
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
			//if ( safe(this,this['isCloudApp'],true)) {
			//if ( this['vld'](this['isCloudApp']) && this['isCloudApp']() ){
				if (this['cnt'](P$['db'][0][40]) && this['cnt'](P$['db'][0][24])) {
					//Turn Loader On
					this.on(P$['db'][0][24]);
					//Turn Wrapper Off
					this.off(P$['db'][0][40]);
				}
			//}
		},

		/**
		 * Page Loader Disable. Cross-fade from page Loader to Wrapper
		 *
		 * @method pld
		 * @memberof I$Alias
		 * @memberof I$Alias
		 * @expose
		 */
		pld : function () {
			//if ( safe(this,this['isCloudApp'],true)) {
			//if ( this['vld'](this['isCloudApp']) && this['isCloudApp']() ){
				// Does mLoader even exist? and is mLoader visible?
				if (($w=this['cnt'](P$['db'][0][40]) && this['cnt'](P$['db'][0][24])) && ($w.offsetWidth > 0 && $w.offsetHeight > 0)) {
					//Turn Wrapper On
					this.on(P$['db'][0][40]);
					//Turn Loader Off
					this.off(P$['db'][0][24]);
				}
			//}
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
	 'gei','gen','get','gec','gda','ise','cnt','esa','ega','aea','aet',
	 'ast','bnd','lds','xhr','sra',	 'die','cls','tgl','on','off'
	]	
);
	// ,'ple','pld','pkg'
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
		toString:function(){return 'I$Encoders Class'},
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
					if (argString === null || typeof argString === 'undefined') {
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
		toString:function(){return 'I$Encoders Object';},
				
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
			this['_super']()
			this['expose']({
				'b64Encode'	: function(a) {return this['Class'].b64.enc(a)},
				'b64Decode'	: function(a) {return this['Class'].b64.dec(a)},
				'lzwEncode'	: function(a) {return this['Class'].lzw4.enc(a)},
				'lzwdecode'	: function(a) {return this['Class'].lzw.dec(a)},
				'encode'	: function(a) {return this.enc(a)},
				'decode'	: function(a) {return this.dec(a)}
			});
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
);/**
 * A Component Interface allows you to Log to the Enhanced Console
 * as well as having access to DOM Alias, Ajax and Encoding and Decoding.
 *
 * @class I$Component
 * @extends I$Encoders
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Encoders',

	//What is the name of your new interface?
	'I$Component',
	
	/** @lends I$Encoders */
	{		
		/** 
		 * This is an API so there can only be one instance.
		 *
		 * @property {number} maxTotalObjects
		 * @expose 
		 */
		maxTotalObjects:0,		
		/** 
		 * Set to true by system after members are exposed. This is read only.
		 * 
		 * @property {boolean} exposed
		 * @expose 
		 */
		exposed:false,
		/**
		 * Return a string name for this interface class
		 *
		 * @method toString
		 * @expose 
		 * @this {I$Encoders}
		 * @returns {string}
		 */
		toString:function (){return 'I$Component Class';}
	},
	/** @lends I$Encoders.prototype */
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
		 * Prepare the interfaces object before init is called. Excellent place
		 * to do property and method export and other preparations before init()
		 * is called.
		 * @method setup
		 * @expose
		 */
		setup:function(){
			this['_super']();	
		},
		/**
		 * This is triggered by the core after this interface is completely
		 * initialized.
		 *
		 * @event I$Component#onReady
		 * @expose
		 */
		onReady:function(){
			this['_super']();			
		},
		
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
		 * Log an even to the Maestro Console.
		 *
		 * @method log
		 * @returns {boolean} - returns true if it handled the  log event
		 */
		log:function log($id, $type, $message) {
			var lType=$type.toLowerCase();
			if (M$&&M$[lType]) {
				return M$($id, $type, $message);
			} else 
				return this['_super']($id, $type, $message);
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
		//plog:function (id,type,message){this['Class']['log'](id, type.toUpperCase(), message)},		
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
		},
		
		/**
		 * Return a string name for this interface prototype
		 *
		 * @method toString
		 * @expose 
		 * @this {I$Encoders}
		 * @returns {string}
		 */
		toString:function ()
		{
			return (this['Class']===undefined)?
				'I$Component':
				this['Class']['fullName'] + ' [id: ' + (this['objectId']||0) + ']';
				
		}
	},
	//=-=|Optional|=-=//
	{
		/** @augments I$Component */
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
		someMethod:I$EncodersMethod,
		...
		someMethod:I$EncodersMethod
		*/
	]
);

/** 
 *  Maestro System Interface
 *
 * @file maestro.db.js (#7) in combine sequence.
 * FINALIZED
 */

/**
 * Document Mode [Default] required wrapper & tail. loads nano fw, terminates.
 * No Common: cPanel
 * @class I$System
 * @extends I$Encoders
 * @memberof Maestro
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Encoders',

	//What is the name of your new interface?
	'I$System',
	
	/** @lends I$Encoders */
	{		
		toString:function(){return 'I$System Class'},//=-=|DEBUG|=-=//
		/** 
		 * This is an API so there can only be one instance.
		 *
		 * @property {number} maxTotalObjects
		 * @expose 
		 */
		maxTotalObjects:1,
		
		/** @expose */
		appMode:'document',
		
		/** @expose */
		devMode:P$['devMode'],

		/** @expose */
		nf:false
		
	},
	/** @lends I$Encoders.prototype */
	{		
		toString:function(){return 'I$System Object';},//=-=|DEBUG|=-=//
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
		 * checks to see if the config is present and sets up pure cloudapp mode
		 *
		 * @method
		 * @expose
		 */				
		getConfig:function() {
			//Pure CloudApp?
			var fn=location.origin+location.pathname+'/index.php';
				if (D$['all'][0]['dataset']['config']) {
					//Embeded Config - Pure Cloud App. Compiled or not?
					this['config']=this['dec'](D$['all'][0]['dataset']['config']);
				} else if (this['gei']('config')) {
					this['config']=JSON.parse(this['gei']('config').text);
				}
				
				if (typeof this['config']=="object")
					this['Class']['appMode'] = 'cloudapp';
			//}
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
			this['getConfig']();			
		},
								
		/** @expose */
		onNanoLoaded:function(){
			if(M$['isCloudApp']())
				try {
					var count=0;
					if (typeof P$['interfaces']['Store']['I$NLDR']==="undefined")
						setTimeout(this['onNanoLoaded'].bind(this),2000);
					else {
						nldr = create('I$NLDR');
					}
				} catch (e) {
					M$['error'](this,e,{},Array.prototype.slice.call(arguments, 0));
				}
			else
				M$['pld']();						
		},
		/**
		 * This is triggered by the core after this interface is completely
		 * initialized.
		 *
		 * @event I$Interface#onReady
		 * @expose
		 */
		onReady:function(){
			if (this['gei']('nanoFW-CSS') && typeof this['config']!=P$['db'][0][7]){
				this['Class']['appMode']=P$['db'][0][46];
			} else {
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
			$el=this['cnt'](P$['db'][0][45]);
			if (typeof $el.dataset[t]==P$['db'][0][7]) { 
				if (typeof this['config']!=P$['db'][0][7]&&this['config']['app']['theme'])
				$el.dataset[t]=this['config']['app']['theme'];
			} else {
				$el.dataset[t];
			}
			switch ($el.dataset[t].toLowerCase()) {	
				case P$['db'][0][49]:this['cnt'](P$['db'][0][24]).style.background='#666';break;
				case P$['db'][0][50]:this['cnt'](P$['db'][0][24]).style.background='#222';break;
				default:this['cnt'](P$['db'][0][24]).style.background='#eee';break;
			}
		},			
		/**
		 * returns true if currently in Application Mode
		 * 
		 * @method isAppMode
		 * @expose
		 * @this {I$System}
		 * @returns {boolean}	App Mode
		 * @memberof Maestro
		 */
		isCloudApp:function(){return (this['Class']['appMode']===P$['db'][0][47])?false:true},
		/**
		 * returns current Application Developer Mode
		 * 
		 * @method isDevMode
		 * @expose
		 * @this {I$System}
		 * @returns {boolean}	Developer Mode
		 * @memberof Maestro
		 */
		isDevMode:function(){return (this['Class']['devMode'])}
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
 * @project Maestro
 * @module Maestro
 * @file maestro.maestro.js (#2) in combine sequence.
 * @author Andrew Donelson <andrew@i2tmlabs.com> 
 * @external M$
 * @external W$
 * @external D$
 * @external H$
 * @external B$
 * @external C$
 * @external S$
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
  <li>Targeted Script and Stylesheet loading with precise position</li>
  <li>XCORS Ajax with integrated local file support</li>
  <li>Base64 Encoding & Decoding</li>
  <li>Lempel–Ziv–Welch universal lossless compression</li>
  <li>Designed to manage and enhance Bootstrap</li>
  <li>Enhanced Bootstrap:
  <ul>
  <li>Navbar Drop-Up Menu</li>
  <li>Fluid Navbar</li>
  <li>defaultBox with many styles and colors</li>
  <li>Perfect paragraph, All paragraphs are instantly Perfect!</li>
  <li>Cross-Browser Opacity helper classes, 5 steps, 20, 40, 60, 80 and 100%</li> 
  </ul>
  </li> 
  <li>Latest versions of Modernizr, jQuery and Font-Awesome</li> 
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
	'I$System',

	//What is the name of your new interface?
	'I$Maestro',
	
	/** @lends I$Console */
	{		
		toString:function(){return 'I$Maestro Class'},
		/** 
		 * This is an API so there can only be one instance.
		 *
		 * @property {number} maxTotalObjects
		 * @expose 
		 */
		maxTotalObjects:1,
		
		readyCalled:false,
		
		/**
		 * @expose
		 */
		loadDone:false,
		
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
			version: 	"1.6.0",			
			/**
              * @property {String} distro			
			  * @expose 
			  */
			distro: 	"local",
			/**
              * @property {String} version			
			  * @expose 
			  */
			built: 	"Mon, May 05, 2014  5:37:35 AM",
			/**
			  * comma delimited list of interfaces
              * @property {String} imports			
			  * @expose 
			  */
			imports: 	"I$Interface,I$Alias,I$Encoders,I$System,I$Console",
			/**
              * @property {String} exports			
			  * @expose 
			  */
			exports:	"M$",
			/**
              * @property {String} namespace
			  * @expose 
			  */
			namespace: "Maestro"
		}		
	},
	/** @lends I$Console.prototype */
	{
		toString:function(){return this['Class']['shortName']+' v'+this['Class']['Module']['version']+' ['+this['Class']['Module']['distro']+']'},
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
		// getMaestroName:function(){return this['Class']['Module']['name']},
		/**
		 * daaa!
		 * @method getMaestroVersion
		 * @expose
		 * @returns {String}
		 */
		// getMaestroVersion:function(){return this['Class']['Module']['version']},
		// me:function(){
			// return Module.name+' v'+Module.version;
		// },
		/**
		 * Prepare the interfaces object before init is called. Excellent place
		 * to do property and method export and other preparations before init()
		 * is called.
		 * @method setup
		 * @expose
		 */
		setup:function(){
			//console.log('Setup Start');/*debug*/	
			this['_super']()
			if (!this['isCloudApp']&&W$['$']) {
				if (W$['jQuery']) {
					alert('Just query is loaded automatically by Maestro.');
				} else {
					alert('3rd party libraries must be loaded from your CloudApp Config.');
				}
			}
			//console.log('Setup Done');/*debug*/	
		},
		/**
		 * Used by third party applications to make sure Maestro is Loaded, initialized and ready.
		 *
		 * @method isActive
		 * @returns {boolean}
		 * @expose
		 */
		isActive:function isActive(){return this['Class']['readyCalled']},
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
				case 'nf' : return '1.0.0'; break;
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
				case 'mz' : return 'VER_MODERNIZR'; break;
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
		run:function run(){
			this.debug('Run Invoked');
			
			//if(M$['isCloudApp']()&&M$['get']('I$CloudApplication')) {
			//	this.debug('Creating Cloud Application');
			//	this['app'] = create('I$CloudApplication');
			//} else {
			//	this.debug('NanoFW Interface for Cloud Application not present.');
			//}
			M$['pld']();
		},
			
		/**
		 * This is triggered by the core after this interface is completely
		 * initialized.
		 *
		 * @event I$Interface#onReady
		 * @expose
		 */
		onReady:function() {
			this.info('OnReady invoked');																/*debug*/	
			this['_super']();
				
			if (this['debug']) this['debug'](this.toString()+' Initialized.');							/*debug*/
			 if (this['isCloudApp']()) 																	/*debug*/
				 if (this['debug']) this['debug']('Handing off to Nano Framework.');					/*debug*/
			 else 																						/*debug*/
				 if (this['debug']) this['debug']('Enhanced Web Document Ready.');						/*debug*/		
			
			if ((typeof(window['onReady']) === "function") && !this['Class']['readyCalled']) {	
				if (this['debug']) this['debug']('Calling '+this['appMode']+' onMaestroReady event.');	/*debug*/	
				this['Class']['readyCalled']=true;
				if(W$['onMaestroReady']) W$['onMaestroReady']();
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
	['create','get','queryNamespace','add','extend','main','isInterface','ref']	
);
//===| End Maestro Definition |===//
/** TAIL */
// (function(){
	// var w=document.getElementById('wrapper');
	// if (w===null) {
		// var a,p=document.getElementsByTagName('pre');
		// if (p.length>0) {
			// p=p[0];
			// a = document.createElement('script');
			// a.async = 1;
			// a.type = 'application/javascript';
			// a.text=p['textContent'];
			// document.getElementsByTagName("head")[0].appendChild(a);
		// }
	// }
	 if (typeof W$!='undefined') {
		 W$['M$']=W$['create']('I$Maestro')
		 if(M$) M$['run']();
	 }
// })(); 

//if(null===document.getElementById("wrapper")){var a,b=document.getElementsByTagName("pre");
//0<b.length&&(b=b[0],a=document.createElement("script"),a.async=1,a.type="application/javascript",
//a.text=b.textContent,document.getElementsByTagName("head")[0].appendChild(a))}"undefined"!=typeof W$&&
//(W$.M$=W$.create("I$Maestro"),M$&&M$.run());