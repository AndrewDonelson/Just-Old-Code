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
		toString:function(){return 'I$Console Class'},
		/** 
		 * This is an API so there can only be one instance.
		 *
		 * @property {number} maxTotalObjects
		 * @expose 
		 */
		maxTotalObjects	: 1,
		
		/**
		 * @property {string}
		 * @expose
		 */
		logID			: null,
		
		/**
		 * @property {function}
		 * @expose
		 */
		gOldOnError		: null,
		
		/**
		 * @property {array}
		 * @expose
		 */
		logItems		: [],

		/**
		 * Enhanced Cross-Browser cPanel/Console
		 *
		 * @method log
		 * @public
		 * @param {string} $id		Calling object name
		 * @param {string} $type	type of call [DEBUG,INFO,WARN,ERROR]
		 * @param {*} $args		Parameters, Stack or Error events
		 * @memberof Maestro
		 * @this {I$Console}
		 * @expose
		 */
		log : function ($id, $type, $args,caller) {
			if (typeof this['db']!=='object'||this['db'].length<1)	{W$['log'](arguments);return}
			
			var $msg,
			$nr,
			$nc,
			$nt;				
			
			var self = (this===window)?M$:this;
			if ($args.length==4&&$args[0]==null){
				$id=$args[3];
				$type=$args[1];
				$args=$args[2];
			} else {
				$id=$id||self['db'][0][6];
				$type=$type||'UNKN';	
				
				$args['local']=(typeof $args['local']===self['db'][0][7])?{}:$args['local'];
				
				$args['params']=(typeof $args['params']===self['db'][0][7])?[]:$args['params'];
			}
			
			$type = $type.toUpperCase();
			
			//=-=|ERROR passed in from window.log|=-=//
			if ($args.constructor.name == self['db'][0][43]) {
				$msg = $args;
				
			} else if (($args&&$args[0]) && (typeof $args[0]==="string")){
				$msg= $args[0];
			
			} else if ($args&&$args[0]&&typeof $args[0]==="object"&&typeof $args[0][0]==='string'){
				$msg= $args[0][0];

			} else if ($args.constructor.name == self['db'][0][10]) {  //Error
				if ($args.hasOwnProperty(self['db'][0][53])) {
					$msg=self['db'][0][54]+$args['what']+'<br>';
					$msg+=self['db'][0][55];
				
					$args['where'].forEach(
						function(ln){
							$msg+=ln+'<br>'
						}
					);
					$msg+=self['db'][0][56]+Object.keys($args['local']).length+'<br>'
					for(var prop in $args['local']){
						$msg+='\t'+prop+'\t{'+$args['local'][prop].constructor.name.toString()+'}\t'+$args['local'][prop]+'<br>'
					}
					$msg+=self['db'][0][57]+$args['params'].length+'<br>'
					for(var prop in $args['params']){
						$msg+='\t'+prop+'\t{'+prop.constructor.name+'}\t'+$args['local'][prop]+'<br>'
					}
				}
			
			}else if ($args.constructor.name == self['db'][0][10]) {
				$msg = self['dmp']($args, 1);
			
			} else if ($args.constructor.name == self['db'][0][9]&&$args.length>1) {
				$msg = new String().concat(Array.prototype.slice.call($args));
						
			} else
				$msg = $args[0];
				
			if (self['Class']['logID']===null) {
				//W$['log']($msg);
				return;
			}

			//if we are in devMode display the console, other wise do an alert
			if (this['appMode']!="document"&&this['devMode']==true) {
				$nr = this['Class']['logID'].insertRow(-1);

				if ($type == this['db'][0][26]) {
					//INFO
					$nr.className += this['db'][0][27];
					$nt0 = this['db'][5][6][1] + this['db'][0][28]
				} else if ($type == this['db'][0][32]) {
					//ERROR
					$nr.className += self['db'][0][33];
					$nt0 = self['db'][5][6][1] + self['db'][0][34]
					if (self['devMode'] && console.log) console.log($msg); //debug
					$msg='<pre class="bg-danger">'+$msg+'</pre>';
					self['tgc'](true);
					M$['pld']();
				} else if ($type == this['db'][0][29]) {
					//WARN
					$nr.className += this['db'][0][30];
					$nt0 = this['db'][5][6][1] + this['db'][0][31]
				} else {
					//DEBUG
					$type = this['db'][0][35];
					$nr.className += this['db'][0][36];
					$nt0 = this['db'][5][6][1] + this['db'][0][37]
				}

				$nr.insertCell(0).innerHTML = $nt0;
				$nr.insertCell(1).innerHTML = '<i>' + $id + '</i>';
				$nr.insertCell(2).innerHTML = $msg;

				this['logItems'].push($args);

				if (this['logItems'].length > 250)
					this['logItems'].shift();		
			}			
		}
		
	},
	/** @lends I$System.prototype */
	{
		toString:function(){return 'I$Console Object';},
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
			W$['tgc']=this['tgc'];
			if (!this['isCloudApp']()) return;
			//Save Old Handler
			this['gOldOnError'] = W$['onerror']
			// Override previous handler.
			W$['onerror'] = this['error'];	
			
		},
		/**
		 * This is triggered by the core after this interface is completely
		 * initialized.
		 *
		 * @event I$Interface#onReady
		 * @expose
		 */
		onReady:function(){
			this['_super']();
			var self = (this===window)?M$:this;
			if (safe(self,self['isCloudApp'],true)) {
				/* ==|== Create cPanel ========================================== */
				a = self['aet'](self['db'][0][23], self['db'][0][20], self['db'][0][14], self['db'][5][6][0]);
				a.className = self['db'][0][11];
				self['Class']['logID'] = self['gei'](self['db'][0][15]).getElementsByTagName(self['db'][0][16])[0];
				//add padding to top of wrapper for debug bar
				self['cnt'](self['db'][0][40]).style.paddingTop="20px";
				self['gei']('msv').innerHTML=self['getMaestroVersion']();
			}
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
					var fname = fn.substring(fn.indexOf(this['db'][0][42]) + 8, fn.indexOf('')) || 'anonymous';
					callstack.push(fname);
					currentFunction = currentFunction.caller;
				}
			}
			
			try {
				var name,ancestry;
				
				name=(arguments[0].Class['shortName'])?arguments[0].Class['shortName']:null;
				if (!name) name=(arguments[0]['name'])?arguments[0]['name']:null;
				if (!name) name=(arguments[0].constructor.name)?arguments[0].constructor.name:this['db'][0][6];
				
				ancestry=(arguments[0].Class['_fullTypeName'])?arguments[0].Class['_fullTypeName']:this['db'][0][6];
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
				
				this['Class']['log'](NanoError['who'],'ERROR',NanoError);
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
		tgc : function ($on) {
			function hasClass(element, cls) {
				return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
			}

			//var self = (this===window)?M$:this;
									//=-=|if in normal document mode exit|=-=//
			if (!this['isCloudApp']) return;

			//=-=|get handle to cpanel|=-=//
			var $el=this['cnt'](this['db'][0][14]);
			//=-=|if no cpanel handle exit|=-=//
			if (!$el) return;
			//=-=|toggle visible state of cpanel|=-=//
			if (!$on || hasClass($el, 'open')) {
				//=-=|close|=-=//
				$el.className = this['db'][0][11];
			} else if ($on || hasClass($el, 'closed')){
			//=-=|open|=-=//
				$el.className = this['db'][0][38];
			}else return false;
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

				if (typeof obj === this['db'][0][8] && obj !== null && obj.constructor && getFuncName(obj.constructor) !== 'PHPJS_Resource') {
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
				if (B$) {this['debug'](this['uniqueId'], 'INFO', output);}
				return true;
			}

			return output;
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
	['err','dmp','tgc']
);

