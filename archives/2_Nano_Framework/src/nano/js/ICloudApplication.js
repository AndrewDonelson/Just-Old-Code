/**
 * Short Description
 *
 * @class I$CloudApplication
 * @extends I$Alias
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Alias',

	//What is the name of your new interface?
	'I$CloudApplication',
	
	/** @lends I$Alias */
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
	
		/**
		 * Turns off fie Caching
		 * @property {string} 
		 * @private
		 * @noexpose
		 */
		noCacheString: '',
	
		/** @expose */
		predefined:["{!DATE}","{!TIME}","{!DATETIME}","{!APPNAME}",
			"{!APPVERSION}","{!COPYRIGHT}","{!AUTHOR}",
			"{!APPLET|[name,loc[local|nanofw|vendor|publisher]]}"
			],
	
		/** @expose */
		_ATTRIBUTES:[
			'role',				//application||applet||plugin [REQUIRED]
			'name',				//"H5C3 Homepage" [REQUIRED]
			'version',			//0.1.0 [REQUIRED]
			'uuid',				//4473182a-b5e9-4989-aac6-479f2b9ee49a[REQUIRED]
			'layout',			//Any registered layout
			'skin',				//Any skin scheme
			'shared',			//True is nanofw share, false is app and VENDER_ID is vendors url
			'target',			//What element (#) insert into or what position:weight (!) to into
			'cols'				//xs,sm,md,lg column sizes 12,8,6,12
		],
				
				
		/**
		 * Internal timer used for housekeeping, queues, etc. Runs at 2fps.
		 * @expose 
		 */
		timer:null,
		
		/**
		 * Stores the information about the current layout
		 *
		 * @property {object} layout
		 * @expose
		 */					
		layout:{repo:'i2tm',name:'starter'},
		
		/**
		 * Application Configuration Manager
		 *
		 * @property {object}	config	I$ConfigManager
		 * @expose
		 */			
		config:null,
			
		/**
		 * Stores total amount size of all content loaded.
		 *
		 * @property {number}	$totalBytesLoaded	
		 * @expose
		 */			
		$totalBytesLoaded: 0,
		
		/**
		 * Google Analytics & AdSense Interface
		 *
		 * @property {object}	google	I$Google
		 * @expose
		 */			
		google	: null,
		
		/**
		 * Local Client Side storage support Interface
		 *
		 * @property {object}	local	I$DeviceStorage
		 * @expose
		 */			
		local	: null,
		
		/**
		 * Applet Factory - Handles everything to to with applets
		 *
		 * @property {object} applets	I$AppletFactory
		 * @expose
		 */			
		applets	: null,
		
		//=-=| 2D Game Only |=-=//
		/**
		 * Game Engine Object
		 *
		 * @property {object} game	I$GameEngine
		 * @expose
		 */			
		game	: null,
		
		/**
		 * Launcher - Game Launcher
		 *
		 * @property {object} launcher	I$Launcher
		 * @expose
		 */			
		launcher: null,
		
		/**
		 * Device Performance tester
		 *
		 * @property {object} test	I$DeviceTest
		 * @expose
		 */			
		test	: null,
		
		/**
		 * True 	- Everything was fine, we can load the Engine and optionally the framework
		 * False 	- “Danger, Will Robinson!” The universe could be destroyed without proper configuration.
		 *
		 * @property {boolean}	ready  [true|false]
		 * @expose
		 */
		ready: false,
		
		/**
		 * set to true after call tot he nanoREADY() function
		 *
		 * @property {boolean}	readyCalled
		 * @expose
		 */			
		
		readyCalled: false,
						
		/**
		 * Framework has finished loading.
		 *
		 * @property {boolean} finished	
		 * @expose
		 */
		finished: false,
				
		//getPath:function(){},
		
		/**
		 * An array of all scripts
		 *
		 * @property {array} scripts
		 * @expose
		 */
		scripts: [],

		
		/**
		 * Return a string name for this interface class
		 *
		 * @method toString
		 * @expose 
		 * @this {I$Interface}
		 * @returns {string}
		 */
		toString:function (){return 'I$CloudApplication Class';}
	},
	/** @lends I$Alias.prototype */
	{
		/**
		 * Interface Initialization method
		 * @constructor
		 * @expose
		 */
		init:function ()
		{
			this['_super']();

			this['$loc'] = this['gfn'](document.location.href);

			
			//if (typeof this['config']['config']['google'] === "object")
			//	this['google'] = create('I$Google',this,this['config']['config']['google']);
		
			if (this['clientFS_exists']())
				this['local'] = P$['interfaces']['Store']['I$DeviceStorage'].create(this['config']['config']['app']);    //.create();
			
			
			this['applets'] = create('I$AppletFactory');					

			this.ha();

			this.ready = true;
		},
		/**
		 * Prepare the interfaces object before init is called. Excellent place
		 * to do property and method export and other preparations before init()
		 * is called.
		 * @method
		 * @expose
		 */
		setup:function(){
			this['info']('nano Framework v1.0.0');
			this['_super']();	
			this.initEvents();
			
			//give maestro 15 seconds to get R2WL in ready state otherwise stop timer
			this['timer'] = P$['interfaces']['Store']['I$AccuTimer']['create'](
				-1, 
				2, 
				M$.bnd(this,this._onInterval),
				M$.bnd(this,this._onTimerDone)
			)
			
			//this['scripts'].push(this['getPath']('modernizr','vendor')+'modernizr.min.js');	

			this['config'] = create('I$ConfigManager',
				M$.bnd(this,function(files){
					this['debug'](files.length+' file(s) added to the que - Configuration Complete.');
					this['scripts'] = files;
				}),
				M$.bnd(this,function(files){
					this['debug']('Configuration Failed.')
				})
			);

			this['getPath']=this['config']['getpath'];
		},
		/**
		 * This is triggered by the core after this interface is completely
		 * initialized.
		 *
		 * @event I$CloudApplication#onReady
		 * @expose
		 */
		onReady:function(){
			this['_super']();	
			this['createMeta']();
			this['getlayout']();
			
			this.prepare();
			//if (this.applets.onReady) this.applets.onReady();
			window.APP = this; //Make a global shortcut, i know its messy but look at the rest of this crap LOL

			if (this['google']) this['google']['load']();

			this['autoSizeACE']();

			this['applets']['scan']();		

			if (this['config']['config']['modules']['gldl']) {
				this['launcher'] = create('I$Launcher');
				this['game']= create('I$GameEngine','wrapper');
			}
		},
								
		/**
		 * Called to test if we have client storage access
		 *
		 * @method
		 * @expose 
		 * @return boolean
		 */
		clientFS_exists:function() {
			var mod = 'maestro';
			try {
				localStorage.setItem(mod, mod);
				localStorage.removeItem(mod);
				return true;
			} catch(e) {
				return false;
			}
		},
		
		/**
		 * parses the current document for template tags {%TAG|OPTIONS%}
		 *
		 * @method
		 * @noexpose
		 */		
		template:function() {
			var $el = M$['gei']('wrapper'),$html=$el.innerHTML;
		},
		
		/**
		 * Loads saved options and data from device storage if available
		 *
		 * @method
		 * @noexpose
		 */		
		prepare:function() {
			this.colorOverride = M$.chk(this['local'].getGlobalCfg('colorOverride'),false);
			//Load Skin
			if (this.colorOverride)
				this.skin = M$.chk(this['local'].getGlobalCfg('mySkin'),this.skin);			
			else
				this.skin = M$.chk(this['local'].getAppCfg('skin'),this.skin);					
		},
		
		/**
		 * embeds the loaded layout
		 *
		 * @method
		 * @noexpose
		 */		
		getlayout:function() {
			var tmp=this['config']['config']['app']['layout'];
			if (!this['vld'](tmp) || tmp.indexOf('|')==-1) {
				this['debug']('Invalid format for Layout. use PUBLISHER|LAYOUT with no extention.');
				tmp="i2tm|starter";
			}
			tmp=tmp.split('|');
			this['addFile'](tmp[1]+'.nano','layouts',tmp[0]);
		},
		
		/** @expose */
		getFontSize:function() {
			var $style,$el = M$['gei']('wrapper');
			if (this['vld']($el)) {
				$style = window.getComputedStyle($el, null).getPropertyValue('font-size');
				return parseFloat($style);
			}
			return 16;
		},

		/** @expose */
		reviewResolution:function() {
			//check application attributes for the layout we are using
			if (d = D$.documentElement.dataset) {
			
				if (!this.layout.isValid(d.layout)) {
					this['debug']('Not a valid layout. ['+d.layout+']');
				} else {
					this['debug']('Valid Layout ['+d.layout+'] detected.');
					this.appLayout = d.layout;
					if (this.appLayout==='absolute-all') {
						//subtract sidebars and then calculate
						return this.setResolution((window.innerWidth-400));
					} else {
						return this.setResolution();			
					}
				}
			}
		},
			
		/** @expose */
		initEvents:function() {
			$(window).resize(function(){
				clearTimeout(this.resizeTimer);
				this.resizeTimer = setTimeout(this._onResizeComplete, 200);
			});		
		},
		

		/**
		 * return true if cloudApp is NOT in auto mode for orientation. 
		 * Set in config.options.orientation.
		 * @expose 
		 */
		lockOrientation:function() {
			return (this['config']['config']['options'].orientation=='landscape'||this['config']['config']['options'].orientation=='portrait')?true:false;
		},
		
		/** @expose */
		autoSizeACE:function() {
			var el,h;
			h=window.innerHeight-64;
			if (P$['interfaces']['Core'].isObject(window.ace)) {
				//Auto Size Ace
				el = M$['gei']('ide');
				if (el)	el.style.height=h+'px';
			}
			
			if (P$['interfaces']['Core'].isObject(window.nanofm)) {
				//Auto Size Nano File Manager
				el = M$['gei']('ide_fm');
				if (el)	el.style.height=h+'px';
			}
		},
		
		/**
		 * Determine device orientation and respond accordinaly
		 * @method testOrientation
		 * @expose
		 * @return 
		 */
		testOrientation: function() {
			if (this.lockOrientation()==false) return;
			if (this['config']['config']['options'].orientation=='landscape') {
				if (window.innerWidth > window.innerHeight) {
					M$['pld']();
					M$['off']('page_warning');
					this['Class'].appPaused = false;
				} else {
					this['Class'].appPaused = true;
					M$['gei']('orientation').innerHTML='Landscape';
					M$['ple']();
					M$['on']('page_warning');
				}
			} else if (this['config']['config']['options'].orientation=='portrait') {
				if (window.innerWidth < window.innerHeight) {
					M$['pld']();
					M$['off']('page_warning');
					this['Class'].appPaused = false;
				} else {
					this['Class'].appPaused = true;
					M$['gei']('orientation').innerHTML='Portrait';
					M$['ple']();
					M$['on']('page_warning');
				}		
			}
		},
		
		/** @expose */
		forceRedraw:function() {	
			M$['gei']("wrapper").style.display="none";
			location.reload();
		},
		
		/** @expose */
		forceResize:function() {
			var width, height;

			if (navigator.appName.indexOf("Microsoft") != -1) {
				width  = document.body.offsetWidth;
				height = document.body.offsetHeight;
			} else {
				width  = window.outerWidth;
				height = window.outerHeight;
			}

			window.resizeTo(width - 1, height);
			window.resizeTo(width + 1, height);
		},	
		
		/** @expose */
		checkScreenMode:function() {		// No L/R		 L only     L & R      ALL 
			var current = this.mode;		//0 = <720, 1 = 721-959, 2= 960-1920, 3=1921 >
			if (window.innerWidth < 721 && current != 0) {
				// We changed down to mode 0  = No Sidebars + Mobile menu
				this.mode = 0;
			} else if ((window.innerWidth > 720 && window.innerWidth < 961) && current != 1) {				
				// We changed into mode 1  = No Right Sidebar + Mobile menu
				this.mode = 1;
			} else if ((window.innerWidth > 960 && window.innerWidth < 1921) && current != 2) {				
				// We changed into mode 2	= Both sidebars no mobile menu
				this.mode = 2;
			} else if (window.innerWidth > 1920 && current != 3) {
				// We changed into mode 2   = Both sidebars no mobile menu
				this.mode = 3;
			}

			if (this.mode != current)
				this._onScreenSizeChanged();
		},
		
		save:function() {
			this['local'].setGlobalCfg('colorOverride',this.colorOverride);
			this['local'].setAppCfg('skin',this.skin);
		},
		
		addToHead:function($tag,$id,$content){
			var $s;
			if ($tag=="script") {
				$s = D$.createElement($tag);
				$s.id = $id;
				$s.type = 'application/javascript';
				$s.innerHTML = $content;
			} else if ($tag=="style") {
				$s = D$.createElement($tag);
				$s.id = $id;
				$s.type = 'text/css';
				$s.innerHTML = $content;
			} else {
				this['warn']('Attempting to add unknown element '+$tag+' to DOM.');
			}
			
			$a=get("head")[0];
			$a=get("head")[0].appendChild($s);
		},
		createWindow:function($applet,$opts) {
			if (ISA($applet)==="applet") {
			}
			if (ISA($opts)!=='object') 
				$opts={id:'window',height:'17.14em',width:'22.85em',title:'Unamed Window',statusbar:'',body:'',color:'clr-dark'};
			var window = DOC.createElement('div');
			window.id=$opts.id;
			window.className = 'this_window '+$opts.color;
			$html = '<div class="this_window.this_titleBar">\n';
			$html += '<div class="this_title left"><span id="windowName">'+$title+'</span></div>\n';
			$html += '<div class="icons right">\n';
			$html += '<i class="icon icon-move uiButton"></i>\n';
			$html += '<i class="icon icon-collapse-alt uiButton"></i>\n';
			$html += '<i class="icon icon-expand-alt uiButton"></i>\n';
			$html += '</div>\n';
			$html += '</div>\n';
			$html += '<div id="windowBody" class="this_body">'+$body+'</div>\n';
			$html += '<div class="this_statusBar">\n';
			$html += '<div id="windowStatusBar">'+$status+'</div>\n';
			$html += '</div>\n';
			window.innerHTML=$html;
		},
		
		/**
		 * Tells the resource loader to disable caching in the browser by modifying the resource src by appending the current time
		 * @method setDisableCache
		 * @return 
		 */
		setDisableCache: function () {
			
			this['Class']['noCacheString'] = (M$['isDevMode']()) ? '?nocache=' + Date.now():'';
		},

		/**
		 * Add a script or stylesheet to the que. Do not call directly.
		 * @method addFile
		 * @param {string} $file
		 * @return 
		 */
		addFile: function ($file,$what,$where) {
			this['debug']('Added '+$what+' '+$where+' file '+$file+' to que.');
			this['scripts'].push(this['config']['getPath']($what,$where)+$file);			
		},

		/**
		 * Add multiple scripts to the que. Do not call directly.
		 * @method que
		 * @param {} scripts
		 * @param {} $engineBaseURL
		 * @return 
		 */
		que: function (scripts,$what,$where) {
			var $i = 0;
			for (var $i = 0; $i < scripts.length; $i++) {
				this.addFile(scripts[$i],$what,$where);
			}
			//this._start(); 
		},
		
		compile:function($applet) {
			return lzw.enc(encodeURIComponent($applet));
		},

		decompile:function($applet) {
			return lzw.dec(encodeURIComponent($applet));
		},
		
		validUUID:function($uuid) {
		
			if (this['vld']($uuid) && $uuid!=="") { 
			
				if (( ($uuid.split("-").length - 1) ==4 )?true:false) {
					if ($uuid.charAt(4)=="1" && $uuid.charAt(17)=="9" && $uuid.charAt(22)=="6" && $uuid.charAt(30)=="9") {
						return true;
					} else {
						if (location.protocol==='file:' && M$['getDevMode']()) {
							this['error']('Validation Failed, Bad UUID!');
							return false;		
						}
					} /* Embedded Code Check */
					
				} /* Format Check */
				
			} /* General Valid Check */
			
		},
		
		generateUUID:function() {
			return 'xxxx1xxx-xxxx-4xx9-yxx6-xxxxxx9xxxxx'.replace(/[xy]/g, function(c) {
				var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
				return v.toString(16);
			});
		},
								
		/**
		 * Called to force document to update itself
		 * @method redraw
		 * @return 
		 */
		redraw:function() {
			var $body = D$.getElementsByTagName("body")[0];
			$body.style.display='none';
			$body.offsetHeight=$body.offsetHeight;
			$body.style.display='block';	
		},
		
		/**
		 * Add a META tag to the head of the document
		 *
		 * @method
		 * @param {string} $name
		 * @param {string} $content
		 */
		addMeta:function($name,$content) {
			try {
				var _={el:null,head:H$};
				
				if (!_.head.contains($name)) {
					_.el=D$.createElement('meta');
					_.el.id=_.el.name=$name;
					_.el.content = $content;
					_.head.appendChild(_.el);
				}
			} catch (e) {
				M$['err'](this,e,_,Array.prototype.slice.call(arguments, 0));
			}
		},

		createMeta:function() {
			/*---/ Add META Tags /------------------------*/
			
			//this.addMeta('viewport','width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
			//this.addMeta('viewport','width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
			//this.addMeta('http-equiv="Cache-control"',this['config']['config']['app'].htmlCacheCtrl);
			this.addMeta('description',this['config']['config']['app']['description']);
			this.addMeta('author',this['config']['config']['app'].author);
			this.addMeta('keywords',this['config']['config']['app'].keywords);
			this.addMeta('copyright',this['config']['config']['app'].copyright);
		},
		
		/**
		 * I2tm Labs Analytics/Error Reports/etc.
		 * http://ipduh.com/ip/?66.249.75.190 IP Address Lookup
		 58.22.17.59 China {Hacker BOT?}
		 192.187.106.210	European Union	
		 157.55.32.149		msn.com
		 66.249.75.190		googlebot.com
		 66.249.73.44		googlebot.com		crawl-66-249-73-44.googlebot.com
		 */
		ha:function(i,s,o,g,r,a,m) {
			//$n({a:'clk',b:'element'});
		},
		/**
		 * Google analytics wrapper.methods, Only send requests when in live mode not developer. MWDL required to enable
		 * @method
		 * @param {} i
		 * @param {} s
		 * @param {} o
		 * @param {} g
		 * @param {} r
		 * @param {} a
		 * @param {} m
		 * @expose 
		 */
		ga:function(i,s,o,g,r,a,m) {if (this.google) this['google']['ga'](i,s,o,g,r,a,m);},

		//===================================================================================================//
		//=-=|EVENTS|=-======================================================================================//
		//===================================================================================================//
		/** @expose */
		_onScreenSizeChanged:function() {
			this['debug']('Window Size has changed.');
			
			if (this.layout !== 'absolute') return;
		},
		/** @expose */
		_onResizeComplete:function() {
			this.debug('Window resize detected.');
			
			//Updated displayed ads if display size has changed.
			if (this.google.$adSenseLoaded)
				this.google.onResize();
				
			//If ACE & NanoFM are loaded set height value
			this.autoSizeACE();
			this.testOrientation();
		},

		/**
		 *  Called when switching in/out of fullscreen mode.
		 * @method _onFullscreenChange
		 * @expose
		 * @return 
		 */
		_onFullscreenChange: function () {
		   var $c = M$['gei']('waCANVAS');
			if (document.mozFullScreen || document.webkitIsFullScreen) {
				$c.style.width = window.screen.width + 'px';
				$c.style.height = window.screen.height + 'px';
			} else {
				$c.style.width = this.config.screen.width + 'px';
				$c.style.height = this.config.screen.height + 'px';
			}
		},

		/** @expose */
		onLayoutLoaded:function(html) {
			this['gei']('wrapper').innerHTML=html;
			this['debug']('Layout loaded and active.');
		},
		
		//Called when each file is loaded
		/** @expose */
		_onLoaded:function($res,$src) {
			var _={};
			//=-=|TODO: Re-write this to use Maestro|=-=//
			if (this['vld']($src)) {	
				_.ext = M$['gex']($src),
				_.path,
				_.fileName = M$['gfn']($src);
				_.parts = $src.split("?"),
				_.size = $res.length;
		
				if (_.fileName==="") {
					this['warn']('Invalid Ajax URI received: '+$src);
					return;
				}
				this.$totalBytesLoaded+=_.size;
				if (_.parts.length==1) {
					_.path = $src.substring($src.lastIndexOf('/') + 1);
				} else {
					_.ext = M$['gex'](_.parts[0]),
					_.path = _.parts[0].substring(0, _.parts[0].lastIndexOf("/"));
				}

				if (_.fileName=="modernizr.min.js") {					
					var a=D$.createElement('script');
					a.id='modernizr'
					a.type='application/javascript';
					a.text='\n\r/* '+_.fileName+' */\n\r'+$res;
					M$['get']("head")[0].appendChild(a);				
				} else if (_.ext==="nano") {
					this['onLayoutLoaded']($res);
				} else if (_.ext==="css") {
					//Create Primary Stylesheet Element
					var $script = D$.createElement("style");
					$script.id=_.fileName;
					$script.rel = "stylesheet";
					$script.type = "text/css";
					$script.media ="all";
					$script.textContent='.define_'+_.fileName+'\n\r'+$res;
					try {
						M$['get']("head")[0].appendChild($script);
					} catch (e) {
						_.args = Array.prototype.slice.call(arguments, 0);
						M$['err'](this,e,_,Array.prototype.slice.call(arguments, 0));
					}				
				} else if (_.ext==="js") {
					//Create Primary Javascript Element
					var $script = D$.createElement("script");
					$script.id=_.fileName;
					$script.type = "application/javascript";
					$script.text=$res;
					try {
						M$['gei']("tail").appendChild($script);
					} catch (e) {
						_.args = Array.prototype.slice.call(arguments, 0);
						M$['err'](this,e,_,Array.prototype.slice.call(arguments, 0));
					}
				}
				
				this['debug']('Loaded: '+_.fileName+" ("+_.size+" bytes)");
			}
		},
		
		//Called when each file has failed
		_onErrored:function($res) {
			this['debug']('Failed: ',this['Class']);
		},
						
		_onInterval:function($steps,$count,$fps){
			if (this['scripts']['length']>0) {
				this['finished']=false;
				this['debug']('Processing que...'+this['scripts']['length']+' files left.');
				var $src = this['scripts'].shift();
				M$.xhr(
					$src,
					this._onLoaded.bind(this),
					this._onErrored.bind(this),
					'get',
					null,
					false
				);
			} else {
				if (!this['finished']) this['debug']('Transfers complete, sleeping...');
				this['finished']=true;
				if (this['google']) this['google']['loaded']();
			}

			if (this['finished']&&this['ready'] && !this['readyCalled']) {
				if (typeof(window.nanoREADY) === "function") {
					this['debug']('nanoREADY found, Invoking...');
					window.nanoREADY();
				}
				this['readyCalled']=true;
				this['debug']('Application is Ready...');
				M$['pld']();				
			} 
		},
		
		_onTimerDone:function(self) {
			if (!this.finished) {
				var $m = 'Unable to load & initialize application within 15 seconds, aborting.';
				this['info']($m);
				alert($m);
			}	
			M$['pld']();
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
				'I$CloudApplication':
				this['Class']['fullName'] + ' [id: ' + (this['objectId']||0) + ']';
				
		}
	},
	//=-=|Optional|=-=//
	{
		/** @augments I$CloudApplication */
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

