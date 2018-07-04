/**
 * Short Description
 *
 * @class I$ConfigManager
 * @extends I$Interface
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Interface',

	//What is the name of your new interface?
	'I$ConfigManager',
		
	/** @lends I$Interface */
	{		
		/** 
		 * This is an API so there can only be one instance.
		 *
		 * @property {number} maxTotalObjects
		 * @expose 
		 */
		maxTotalObjects:1,		
		/** 
		 * Set to true by system after members are exposed. This is read only.
		 * 
		 * @property {boolean} exposed
		 * @expose 
		 */
		exposed:false,

		path: {
			//Landing Page - Primary location
			app: 		window.location.protocol + "//" + window.location.host + window.location.pathname.split("/").slice(0, -1).join("/") + "/",
			shared:		'/content/shared/',			//'http://cdn.i2tmlabs.com/content/shared/',
			
			//Publisher if for registered developers and sharing
			publisher:	'/content/',				//http://cdn.i2tmlabs.com/content/{PUBLISHER NAME FROM JSON}/',
			
			//Vendor is for approved Nano FW 3rd party libraries
			vendor:		'/vendor/'					//'http://cdn.i2tmlabs.com/vendor/',
			
		},
		
		/**
		 * @property {boolean}		ready  [true|false]
		 * 
		 * True 	- Everything was fine, 
		 * False 	- “Danger, Will Robinson!” The universe could be destroyed without proper configuration.
		 */
		ready: false,

		/**
		 * @property {boolean}		filesLoaded  [true|false]
		 * 
		 * True 	- Everything was fine, 
		 * False 	- “Danger, Will Robinson!” The universe could be destroyed without proper configuration.
		 */
		filesLoaded: false,
		
		/**
		 * @property {boolean}		filesLoaded  [true|false]
		 * 
		 * True 	- Everything was fine, 
		 * False 	- “Danger, Will Robinson!” The universe could be destroyed without proper configuration.
		 */
		configLoaded: false,

		_onSuccessCallback:null,
		_onFailedCallback:null,
		
		/**
		 * Return a string name for this interface class
		 *
		 * @method toString
		 * @expose 
		 * @this {I$Interface}
		 * @returns {string}
		 */
		toString:function (){return 'I$ConfigManager Class';}
	},
	/** @lends I$Interface.prototype */
	{
		
		/**
		 * Configuration Settings
		 *
		 * @property config
		 * @expose
		 */
		config:null,
		
		/**
		 * Populated by parseConfigFiles(). The cloud app will push these into the load que.
		 *
		 * @property filesNeeded
		 * @expose
		 */
		filesNeeded:null,
		
		/**
		 * Interface Initialization method
		 * @constructor init
		 * @expose
		 */
		init:function (onSuccess,onFailed)
		{
			this['_super']();
			this['_onSuccessCallback']=onSuccess;
			this['_onFailedCallback']=onFailed;			
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
			this['config']=M$['config'];
		},
		/**
		 * This is triggered by the core after this interface is completely
		 * initialized.
		 *
		 * @event I$ConfigManager#onReady
		 * @expose
		 */
		onReady:function(){
			if (!this['config']) {
				M$.xhr(
					this['getPath'](null,'app')+'index.json',
					this._onConfigSuccess.bind(this),
					this._onConfigFailed.bind(this),
					'get',
					null,
					false
				)
			} else {
				this._onConfigSuccess(null);
			}		
		},
		
		/**
		 * Use to obtain a path to a resource
		 * @method getPath
		 * @param {string} $entity	
		 * @param {boolean} $app		use cloudapp resources or shared resources	
		 * @expose
		 * @return 
		 */
		getPath:function($what,$where,$appFolder) {
			function textize(s){
				return s.replace(/([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\/? ])+/g, '-').replace(/^(-)+|(-)+$/g,'');
			}
			
			var $base=window.location.protocol+M$['db'][2][0];
			//if (window.location.pathname.indexOf('/local/')!=-1) $base=location.origin+'/cdn';			//DEBUG
			
			$appFolder=$appFolder||false;
			
			$where=$where||'nanofw';
				
			//WHERE? APP or CDN?
			switch ($where.toLowerCase()) {
				// i2tm Labs CDN						http://cdn.i2tmlabs.com/
				case 	'home': 	return $base; break;
				// App Folder							http://apps.i2tmlabs.com/{PUBLISHER}/{APPNAME}/
				case 	'app': 		return this['Class']['path']['app']; break;	
				//nano Vendor Location (3rd libraries)	home+vendor/
				case 	'vendor': 	$base+=this['Class']['path']['vendor']; break;		
				
				//nano Public Shared Folder				home+vendor/i2tm/
				case 	'shared': 	$base+=this['Class']['path']['shared']; break;		
				//Publisher Assets Folder				home+content/{PUBLISHER}/assets/
				case 	'publisher':$base+='/content/'+textize(this['config']['app']['publisher'])+'/assets/';break;
			}
			
			$what=$what||'applets';
			
			//WHAT?
			switch ($what.toLowerCase()) {
				case 	'layouts':	$base+='layouts/'; break;		//Layouts folder
				case 	'applets':	$base+='applets/'; break;		//Applets	
				case 	'scripts':	$base+='js/'; break;			//JavaScripts folder
				case 	'styles':	$base+='css/'; break;			//Stylesheets folder
				case 	'images':	$base+='img/'; break;			//images folder
				case 	'sounds':	$base+='snd/'; break;			//sounds folder
				case 	'libraries':$base+='lib/'; break;			//plugins folder
			}
			
			//Publisher?
			if ($where=='publisher'&&$appFolder==true&&$what) $base+=textize(this['config']['app']['name'])+'/';
			
			return $base;			
		},
		
		/** @expose */
		parseConfigFiles:function(){			
			var $where=['publisher','shared','vendor'],
				$what=['styles','scripts','applets','libraries'],
				$files=[],tmp,$w,$e
				self=this,
				$res=this['config']['files'];

				
			try {
				this['debug']('Parsing Application Files...');
				this['filesNeeded']=[];
				
				$what.forEach(function($w){
					if (typeof $res[$w]!="undefined") {
						$where.forEach(function($e){
							tmp=$res[$w][$e];
							if (typeof tmp==="string"&&tmp.length>0) {
								tmp=$res[$w][$e].split(",");
								if (typeof tmp==="object"&&tmp.length>0) {
									$files=$res[$w][$e].split(",");	
									for (i=0;i<$files.length;i++)
										self['filesNeeded'].push(self['getPath']($w,$e)+$files[i]);
								}	
							}
						});			
					}
				});				
			} catch (e) {
				this['error'](e,_,Array.prototype.slice.call(arguments, 0));
				return false;
			}
			this['debug']('Parsing Complete. '+this['filesNeeded'].length+' files to be queued.');
			return true;
		},
		
		//We have a config file, run cloudapp mode
		/** @expose */
		_onConfigSuccess:function($req){
			if (!this['config']) this['config'] = JSON.parse($req);
			this['Class']['configLoaded']=true;
			this['debug']('Configuration file found, running in CloudApp mode.');
			
			try {
				if (this['parseConfigFiles'](this))
					this['Class']['filesLoaded']=true;
					
				else this['debug']('Error parsing apps files settings.');
			} catch (e) {
				this['error'](e,_,Array.prototype.slice.call(arguments, 0));
				return false;
			}
					
			//Set Application title
			if (M$['isDevMode']()) D$['title']=this['config']['app']['name']+' [DEBUG]';
			this['Class']['ready']=(this['Class']['configLoaded']==true&&this['Class']['filesLoaded']==true);
			if (this['_onSuccessCallback']) this['_onSuccessCallback'](this['filesNeeded']);
		},
		
		//no config file, run normal webpage mode
		/** @expose */
		_onConfigFailed:function() {
			this['debug']('No Configuration file not found, running in normal webpage mode.');
			this['Class']['ready']==false
			if(this['_onFailedCallback']) this['_onFailedCallback']([]);
		},

		/** @expose */
		get:function get(what) {
			what=what||false;
			if (what) {
				what=what.split('.');
				if (what.length>0) {
					// switch (what.length) {
						// 1:	if (this['config'].what[0]) return this['config'].what[0]; break;
						// 2:	if (this['config'].what[0].what[1]) return this['config'].what[0].what[1]; break;
						// 3:	if (this['config'].what[0].what[1].what[2]) return this['config'].what[0].what[2]; break;
						// 4:	if (this['config'].what[0].what[1].what[2].what[3]) return this['config'].what[0].what[2].what[3]; break;
					// }
				}
			} 
		},

		set:function set(what,value){
		
		},

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
				'I$ConfigManager':
				this['Class']['fullName'] + ' [id: ' + (this['objectId']||0) + ']';
				
		}
	},
	//=-=|Optional|=-=//
	{
		/** @augments I$ConfigManager */
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
		someMethod:I$InterfaceMethod,
		...
		someMethod:I$InterfaceMethod
		*/
	]
);

