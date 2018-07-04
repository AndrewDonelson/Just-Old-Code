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

window.onload=function() {
	W$['M$']=W$['create']('I$Maestro')
	if(M$) M$['run']();
} 
