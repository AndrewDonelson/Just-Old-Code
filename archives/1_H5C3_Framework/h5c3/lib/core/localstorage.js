/**
 * @class h5c3.LocalStorage
 * @augments h5c3.Base
 * @description
 * [Extends <a href='h5c3.Base'>h5c3.Base</a>]
 * <p>
 * 
 * <pre><code>
 * 
 * </code></pre>
 * 
 * </p>
 */
h5c3.LocalStorage = h5c3.Base.extend('h5c3.LocalStorage', { 
	_CLASSNAME: 'LocalStorage',
	_CLASSVERSION:'0.1.5',

	create: function($manifest) {
		this._addMethods();
		
		if (this._prepare($manifest))
			return this.prototype;
		else
			return false;
	},	
	
	_addMethods:function() {
		//Extend the localStorageObject to get/set objects
		Storage.prototype.setObject = function($key,$value) {
			//var tmp = h5c3.lzw.encode(Base64.encode(JSON.stringify($value)));
			var $tmp = JSON.stringify($value);
			this.setItem($key, $tmp);
		}

		//we only need to load once on page load
		Storage.prototype.getObject = function($key) {
			var $tmp = this.getItem($key);
			if (!VLD($tmp)) return;
			//var a = h5c3.lzw.decode($tmp)
			//var b = Base64.decode(a)
			$tmp2 = JSON.parse($tmp);

			//$tmp2 = JSON.parse(Base64.decode(h5c3.lzw.decode($tmp)));
			return $tmp2;
		}
	},
	
	setup:function($what) {
		if (ISA($what)!=='String') return;
		if (!VLD(this.prototype.data[$what])) 
			this.prototype.data[$what] = {};
			
		if (!VLD(this.prototype.data[$what]['cfg'])) 
			this.prototype.data[$what]['cfg'] = {};
			
		if (!VLD(this.prototype.data[$what]['files'])) 
			this.prototype.data[$what]['files'] = {};
			
		//localStorage.setObject($what,this.prototype.data[$what]);
	},
	
	isSupported:function() {
		var $msg = "Checking for Local Storage Support...";  //_DBG_  Will delete this line for production
		if (typeof(Storage)!=="undefined") {
		  $msg+="Supported.";
		  this.prototype.supported = true;
		} else {
		  $msg+="Not Supported.";
		  this.prototype.supported = false;
		}	
		_DBG_($msg,this);
		return this.prototype.supported;
	},
	
	load:function($app) {
		this.prototype.data['global'] = localStorage.getObject('global');
		this.prototype.data[$app] = localStorage.getObject($app);
		this.setup('global');
		this.setup($app);
	},

	remove:function($where) {
		if (this.enabled && this.isSupported()) {
			if ($where===0) $use='global'; else $use=this.prototype.appName;
			localStorage.removeItem($use);
			_DBG_('Removed '+$use+'.',this);
		}
	},

	what_where:function($n) {
		if ($n===0) return {where:'global',what:'cfg'};
		else if ($n===1) return {where:'global',what:'files'};
		else if ($n===2) return {where:this.prototype.appName,what:'cfg'};
		else if ($n===3) return {where:this.prototype.appName,what:'files'};
		else return null;
	},
	
	get:function($key,$loc) {
		if (this.enabled && this.isSupported()) {
			$use = this.what_where($loc);
				
			try {
				if ($key in this.prototype.data[$use.where][$use.what])
					return this.prototype.data[$use.where][$use.what][$key];
			} catch (e) {
				 localStorage.removeItem(this.prototype.data[$use.where][$use.what][$key]);
				_DBG_('Removed corrupted entry '+$use.where+'->'+$use.what+'->'+$key,this);
				_DBG_(printStackTrace({e:e}),this);
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
	set:function($key,$value,$loc) {
		if (this.enabled && this.isSupported()) {
			var $use = this.what_where($loc);
							
			try {
				this.prototype.data[$use.where][$use.what][$key]=$value;
				localStorage.setObject($use.where,this.prototype.data[$use.where]);
				return this.prototype.data[$use.where][$use.what][$key];
			} catch (e) {
				_DBG_(printStackTrace({e:e}),this);
			}
		}
	},

	_prepare:function($manifest) {
		if (this.enabled && this.isSupported()) {
			
			this.prototype.appName = new String(config.app.name.split(' ').join('')).camelize();

			//this.remove(0);
			//this.remove(1);
			//localStorage.clear();
			this.load(this.prototype.appName);

			//See if core h5c3 object data exist. if not new user? erased?
			if (!('firstVisit' in this.prototype.data.global.cfg))	{			
				//h5c3 Global domain (everything on the actual domain. say devzone.i2tmlabs.com
				this.set('firstVisit', true,0);
				this.set('firstVisitTime', Date.now(),0);
			}
			if (!('firstVisit' in this.prototype.data[this.prototype.appName].cfg))	{
				//App Domain
				this.set('firstVisit', true,2);
				this.set('firstVisitTime', Date.now(),2);
			}
		}
		return true;
	}
	
}, {
	data:{},
    /**
     * @property {boolean} enabled
     * @default false
	 * @memberof h5c3.LocalStorage
     */
    appName: '',
	
    /**
     * @property {boolean} supported
     * @default false
	 * @memberof h5c3.LocalStorage
     */
	supported: false,
	
	enabled: false,

    /**
	 * @public
	 * @method
	 * @memberof h5c3.LocalStorage
	 * @desc
     * </p>
	 * Handles / manages a the Local Starage system on HTML5 enabled devices
	 * </p>
     */
    init: function () {
        this._super();
    },
	
	removeGlobal:function() { this.Class.remove(0); },
	removeApp:function() { this.Class.remove(1); },
	
	getGlobalCfg:function($key) 		{ return this.Class.get($key,0); },	
	setGlobalCfg:function($key,$value) 	{ this.Class.set($key,$value,0); },
	getGlobalFile:function($key) 		{ return this.Class.get($key,1) },	
	setGlobalFile:function($key,$value)	{ this.Class.set($key,$value,1); },

	getAppCfg:function($key) 			{ return this.Class.get($key,2) },	
	setAppCfg:function($key,$value) 	{ this.Class.set($key,$value,2); },
	getAppFile:function($key) 			{ return this.Class.get($key,3) },	
	setAppFile:function($key,$value) 	{ this.Class.set($key,$value,3); }
});