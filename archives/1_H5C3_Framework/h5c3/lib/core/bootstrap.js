/**
 * @namespace Core
 * @class  h5c3.bootstrap
 * @augments h5c3.Base
 * @description
 * [Extends <a href='h5c3.Base'>h5c3.Base</a>]
 *
 * Handles preparing the document, loading resources, and starting webapp.
 * All methods of this class are private. An instance is created upon load.
 *
 */
h5c3.Bootstrap = h5c3.Base.extend('h5c3.Bootstrap', {
	_CLASSNAME: 'Bootstrap',
	_CLASSVERSION:'0.2.2'
},{ 
	/**
	 * @property String $baseUrl
	 * Holds the base URL for resources & scripts
	 */
    $baseUrl: '',
	
	/**
	 * @property Number $current
	 * Internal. Used to count what resource we are on. i.e. Progress Bar on loading.
	 */
    $current: 0,
	
	/**
	 * @property Boolean $finished	
	 * Framework has finished loading.
	 */
    $finished: false,
	
	/**
	 * @property String
	 * Turns off fie Caching
	 */
    $noCacheString: '',
	
	/**
	 * @property Array
	 * An array of all scripts
	 */
    $scripts: [],
	
    /**
	 * @constructor init()
	 *
     * @description main initilaiztion for the Bootstrap object. Makes sure the browser is chrome,
     * and then creates the canvas and inserts into the document. Also sets the fullscreen listener.
     * 
     */
    init: function () {
		_DBG_("Initializing.",this.Class);
		this.$loc = this.getFileName();
		
		this._BrowserIsChrome();		
		
        this.setBaseUrl(h5c3.path.home+h5c3.path.scripts+'ext/');					
				
		if (!VLD(window.Modernizr)) { 
			this.add('modernizr.all.release.js'); 
		}
		
		if (!VLD(window.jQuery)) { 
			this.add('jquery/jquery-1.10.2.min.js'); 
		}				
		
		/* if we are in local file system - then we need to immediately load scripts then continue */
		if (h5c3.devMode) {
			this.handleFiles();
		}				
  
        this._start();
    },
	
	prepareRWD:function() {
		h5c3.loader = new h5c3.Loader();
		h5c3.lzw = new h5c3.LZW();
		h5c3.local = h5c3.LocalStorage.create();
		h5c3.resources = new h5c3.Resources();
		h5c3.r2wl = new h5c3.R2WLCommon();
		
		h5c3.r2wl.start();
		h5c3.loader.start();
				
		$(window).load(function() {
			//window.editor = ace.edit("editor");
			//window.editor.setTheme("ace/theme/ambiance");
			//window.editor.getSession().setMode("ace/mode/javascript");			
		});

		$(document).ready(function() {
		});
	},
	
    /**
	 * @method createCanvas()
     * 
	 * Starts execution.
     * 
	 * @param None
     * 
	 * @return Boolean
     * 
     */
    createCanvas: function () {
		var $waDIVSize = GEI('waDIV'), 
            scrn = { 
                w:$waDIVSize.clientWidth,
                h:$waDIVSize.clientHeight,
                tw:h5c3.config.screen.target.width,
				th:h5c3.config.screen.target.height
            };
        		
		var $c = AET('waDIV', 'canvas', 'waCANVAS');

		$c.style.width = scrn.w + 'px';
		$c.style.height = scrn.h + 'px';
		
		$c.style.minWidth = scrn.w + 'px';
		$c.style.minHeight = scrn.h + 'px';

		$c.style.maxWidth = scrn.w + 'px';
		$c.style.maxHeight = scrn.h + 'px';
		
		$c.width = scrn.tw;
		$c.height = scrn.th;
		$c.style.background = 'Black';

        if (h5c3.config.options.fullscreen) {
			_DBG_('OPTION: Fullscreen mode enabled.',this.Class);
            DOC().addEventListener('webkitfullscreenchange', h5c3.bootstrap._onFullscreenChange);
            $c.webkitRequestFullScreen();
        } 
		else _DBG_('OPTION: Fullscreen mode disabled.',this.Class);
		return true;
    },

    /**
	 * @method handleFiles()
     * 
	 * This feature is only available in-house.
     * 
	 * @param None
     * 
	 * @return Boolean
     * 
     */
	handleFiles:function() {
		if (!VLD(h5c3.config)) {
			_DBG_("h5c3.config is not defined. Cannot load and configure properly.",this.Class);
			return
		}
		
		if (h5c3.config.files.length > 0) {
			_DBG_("Loading application files.",this.Class);
			this.que(h5c3.config.files, 'assets/js/');
		}

		if (h5c3.config.plugins.length > 0) {
			_DBG_("Loading application plugins.",this.Class);
			this.loadPlugins(h5c3.config.plugins, h5c3.path.base+h5c3.path.plugins);
		}
			
		//Full Blown Cloud App
		if (!h5c3.config.rwdOnly)
			this.que(['game.min.js'],'assets/js/');
		
	},
	
    /**
     * Looks at the current page and gets the name of the html file.
	 *
	 * @method getFileName()
	 *
	 * @return  String HTML filename
     */
    getFileName: function () {
        var $url = document.location.href;
        $url = $url.substring(0, ($url.indexOf("#") === -1) ? $url.length : $url.indexOf("#"));
        $url = $url.substring(0, ($url.indexOf("?") === -1) ? $url.length : $url.indexOf("?"));
        $url = $url.substring($url.lastIndexOf("/") + 1, $url.length);
        return $url;
    },

    /**
	 * @method _onFullscreenChange()
     * 
	 * @description  Called when switching in/out of fullscreen mode.
	 *
	 * @param None
	 *
	 * @return None
     */
    _onFullscreenChange: function () {
       var $c = GEI('waCANVAS');
        if (document.mozFullScreen || document.webkitIsFullScreen) {
            $c.style.width = window.screen.width + 'px';
            $c.style.height = window.screen.height + 'px';
        } else {
            $c.style.width = h5c3.config.screen.width + 'px';
            $c.style.height = h5c3.config.screen.height + 'px';
        }
    },

   /**
	 * @method _BrowserIsChrome()
     * 
     * @description Check to see if the browser is chrome and hide or show the play button depending on the outcome.
	 *
	 * @param None
	 *
	 * @return None
     */
	_BrowserIsChrome: function () {
        var $ok = /chrome/.test(window.navigator.userAgent.toLowerCase()),
            $pn = GEI('playnow'),
            $cp = GEI('cantplay');

        if ($pn!=null && $cp!=null) {
            if ($ok) {
                $pn.style.display = 'block';
                $cp.style.display = 'none';
				return true;
            } else {
                $pn.style.display = 'none';
                $cp.style.display = 'block';
				return false;
            }
        }
    },

    /**
	 * @method setDisableCache()
     * 
     * @description Tells the resource loader to disable caching in the browser by modifying the resource src by appending the current time
	 *
	 * @param None
	 *
	 * @return None
     */
    setDisableCache: function () {
		
        this.$noCacheString = (h5c3.config.devMode) ? '?nocache=' + Date.now():'';
    },

	/** 
	 * @method setBaseUrl()
     * 
	 * @description Sets the directory/path to load from. Do not call directly.
	 *
	 * @param String $url desired path.
	 *
     */	 
    setBaseUrl: function ($url) {
        this.$baseUrl = $url;
    },

	/** 
	 * @method _makeUrl()
     * 
	 * @description Given a script name creates and returns a valid URL
	 *
	 * @param  String $src - File to load
     * 
	 * @return  String URL
     */	 
    _makeUrl: function ($src) {
        return this.$baseUrl + $src + this.$noCacheString;
    },

	/** 
	 * @method add()
     * 
	 * @description Add a script to the que. Do not call directly.
	 *
	 * @param  String $src - File to load
     * 
	 * @return None
     */	 
    add: function ($src) {
		_DBG_('Added '+$src+' to download que.',this.Class);
        this.$scripts.push(this._makeUrl($src));
    },

	/** 
	 * Start loading all files in que. Do not call directly.
	 *
	 * @method _start()
     * 
	 * @param None
     * 
	 * @return  None
     */	 
    _start: function () {
      _DBG_('Loading source files...',this.Class);
        this.$current = 0;
        this._loadNextScript();
    },

	loadScript:function ($src,$onloaded,$onerror) {
		if (!VLD($src)||$src==='') return false;
		$src = this._makeUrl($src);
		
        var $script = DOC().createElement("script");

        $script.type = "application/javascript";
        $script.src = $src;
        $script.async = false;
		$script.onloaded=$onloaded;
		$script.onerror=$onerror;
		
		GET("head")[0].appendChild($script);
		//GET(tag) = window.document.getElementsByTagName
	},
	
	/** 
	 * @method _loadNextScript()
     * 
	 * Load the next script in que. Do not call directly.
	 *
	 * @param 
	 * None
     * 
	 * @return  
	 * None
	 */	 
    _loadNextScript: function () {
        var 
			$src = this.$scripts[this.$current],
			$script = window.document.createElement("script");

        $script.type = "application/javascript";
        $script.src = $src;
        $script.async = false;
		if (VLD($src)) {	
			$script.onload = function () {				
				h5c3.bootstrap._checkAllDone();
			};

			$script.onerror = function () {_DBG_('h5c3.Bootstrap::_loadNextScript() - Could not load javascript file: ' + $script.src);};

			window.document.getElementsByTagName("head")[0].appendChild($script);
		}
		//h5c3.bootstrap._checkAllDone();
    },

	/** 
	 * @method finalize()
     * 
	 * This method is called after all files are loaded. It then finalize the engine start up by creating al required objects
	 * before starting the framework and cloud application startup.
	 *
	 * @param 
	 * None
     * 
	 * @return  
	 * None
     */	 
	finalize: function () {
		if (this.createCanvas()) {
			h5c3.device = new h5c3.Device();
			_DBG_('CloudApp Mode Requested...',this.Class);
			h5c3.device.boot();
		} 
		else _DBG_('ERROR: Something went wrong with preparing the canvas. Do you have a DIV with the ID of waCANVAS in your document?',this.Class);
	},
	
	
	/** 
	 * @method _onReady()
     * 
	 * Internal. Called when engine is loaded and ready to go. This includes jQuery and jQueryMobile
	 * It will call the application or Applets onH5C3Ready() event as well as call to a global [CloudApp|Applet]onReady 
	 * event. below is the usage.
	 * this onH5C3Ready() is not the same thing as [main|game]:onReady() which is called much later. You need both if making 
	 * a CloudApp, or just onH5C3Ready() for a R2WL page.
	 *
	 * (start code)
	 * function AppletOnReady(h5c3Ver, jQVer, jQMVer) {
	 * 		.. Your Code here ...
	 * }
	 * (end)
	 *	 
	 or 
	 *
	 * (start code)
	 * function CloudAppOnReady(h5c3Ver, jQVer, jQMVer) {
	 * 		.. Your Code here ...
	 * }
	 * (end)
	 *
	 * @param 
	 * None
     * 
	 * @return  
	 * None
     */	 
	_onReady:function() {	
		//Handle Internal stuff first; then call child events
		this.prepareRWD();		
		
		// if (h5c3.stylesheet.onReady) h5c3.stylesheet.onReady();
		// if (h5c3.layout.onReady) h5c3.layout.onReady();
		// if (h5c3.brand.onReady) h5c3.brand.onReady();
		// if (h5c3.applets.onReady) h5c3.applets.onReady();
		// if (h5c3.google.onReady) h5c3.google.onReady();
		
		if (h5c3.r2wl.onReady) h5c3.r2wl.onReady();
		
		$('#OVERLAY').fadeOut(750,"linear",function(){
			$('#WRAPPER').fadeIn(1500,"ease-in");
		});

		if (typeof(window.H5C3READY) != "undefined") { 
			window.H5C3READY(h5c3.VERSION,window.Modernizr._version,$().jquery);
		}			

	},
	/** 
	 * @method _checkAllDone()
     * 
	 * See if all scripts are loaded. Do not call directly.
	 *
	 * @param 
	 * None
     * 
	 * @return  
	 * None
     */	 
    _checkAllDone: function () {
        if (!this.$finished) {
            if (this.$scripts.length - 1 === this.$current) {
				//Engine is loaded
				if (VLD(window.Modernizr)) { _DBG_('Modernizr v'+window.Modernizr._version+' detected.',this.Class); }
				if (VLD(window.jQuery)) { _DBG_('jQuery v'+$().jquery+' detected.',this.Class); }
				this._onReady();
                this.$finished = true;
				
				//Do we need the 2D/3D/Physics and such or just RWD?
				if (VLD(h5c3.config.rwdOnly) && h5c3.config.rwdOnly===false) this.finalize();
				_DBG_('H5C3 Framework successfully loaded.',this.Class);
            } else {
                this.$current++;
                this._loadNextScript();
            }
        }
    },

	/** 
	 * @method que()
	 *
	 * Add multiple scripts to the que. Do not call directly.
     * 
	 * @param 
	 * Array	$scripts		- Array of scripts to load.
	 * String	$enginebaseURL	- Location of files.
     * 
	 * @return  
	 * None
     */	 
    que: function ($scripts, $engineBaseURL) {
       _DBG_('que(' + $engineBaseURL + ')',this.Class);
        var $i = 0;
        this.setBaseUrl($engineBaseURL);
        for ($i = 0; $i < $scripts.length; $i++) {
            this.add($scripts[$i]);
        }
    },
	 
	/** 
	 * @method loadPlugins()
     * 
	 * Used to load all plugins required by the application. Do not call directly, engine handles automatically.
	 *
	 * @param 
	 * Array	$scripts		- Array of scripts to load.
	 * String	$enginebaseURL	- Location of files.
     * 
	 * @return  
	 * None
	 *
     */	 
	 //<script id="scr1" src="http://www.example.com/some/action?callback=cb" type="text/javascript></script>
    // loadApplets: function ($scripts) {
        // this.debug('loadApplets(' + h5c3.config.options.path + ')');
        // var $i = 0;

        // this.setBaseUrl(h5c3.config.options.path);
        // for ($i = 0; $i < $scripts.length; $i++) {
			// var $script = window.document.createElement("script");
		
			// $script.type = "application/javascript";
			// $script.id=$scripts[$i].name
			// $script.src = $scripts[$i].file;
			// $script.title = "APPLET";
			// $script.async = false;
			// window.document.getElementsByTagName("head")[0].appendChild($script);
        // }
    // },
	
	/** 
	 * @method loadPlugins()
     * 
	 * Used to load all plugins required by the application. Do not call directly, engine handles automatically.
	 *
	 * @param 
	 * Array	$scripts		- Array of scripts to load.
	 * String	$enginebaseURL	- Location of files.
     * 
	 * @return  
	 * None
	 *
     */	 
    loadPlugins: function ($scripts, $engineBaseURL) {
        _DBG_('loadPlugins(' + $engineBaseURL + ')',this.Class);
        var $i = 0;
        this.setBaseUrl($engineBaseURL);
        for ($i = 0; $i < $scripts.length; $i++) {
            this.add($scripts[$i] + '.js');
        }
    }
});
