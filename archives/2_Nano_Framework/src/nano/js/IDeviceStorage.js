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
				this['debug']('Removed '+$use+'.');
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
					//this['debug']('Removed corrupted entry '+$use.where+'->'+$use.what+'->'+$key,this);
					//this['debug'](e.stack,this);
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
					this['debug'](e.stack);
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
