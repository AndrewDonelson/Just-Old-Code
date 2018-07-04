/**
 * Internal Google Class - Google Tracking & adSense 
 *
 *  h5c3.Google
 * @class  h5c3.Google
 *  h5c3.Base
 */
h5c3.Google = h5c3.Base.extend('h5c3.Google', {
	_CLASSNAME: 'Google',
	_CLASSVERSION:'0.1.2'
},{
	/**
	 * This is your User Account (UA) ID from google
	 *
	 * @property String UID 
	 * 
	 *  H5C3
	 */
	UID: '',
	
	/**
	 * This property is used to see if tracking is actually performed. It is used for debugging. If H5C3.devMode it true or location.protocol is "file" then this value is false.
	 *
	 * @property String enabled 
	 * 
	 *  H5C3
	 */
	enabled: false,
	loaded: false,
	version:"",	
	domain: null,
	
	gaJsHost: null,
	
	/**
	 * Initialization
	 *
	 *  H5C3
	 * @function
	 * 
	 */
	init: function(UID) {
		//this._super();
		this.gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
		this.UID = UID;
		
		if (document.location.protocol!=="file:") {
			this.load(this.gaJsHost + "google-analytics.com/ga.js");
		} 
		else { _DBG_("Google Integration is ready, But your running in developer mode.",this.Class); }
	},
	
	load: function ($src) {
		if (this.enabled!=true) return;
		_DBG_("Requesting Google API.",this.Class);
        var $script = DOC().createElement("script");
        $script.type = "application/javascript";
        $script.src = $src;
        $script.async = true;
		$script.onloaded=h5c3.bind(this, this._onLoaded);
		$script.onerror=h5c3.bind(this, this._onError);

		GET("head")[0].appendChild($script);
		window.setTimeout(function(){
			_DBG_([{msg:"Google API, no loaded event after 5 seconds."}],this.Class);
			h5c3.google._onError();
		},5000);
	},
	
	//Skip pushing google ads if on local file protocol
	push:function() {		
		if (this.enabled===true) {
			_DBG_("Google Push.",this.Class);
			(adsbygoogle = window.adsbygoogle || []).push({});
		} else {
			ads = $(".adsbygoogle").css('background','#333');
		}
	},
	track: function () {
		if (this.enabled!=true) return;
		_DBG_("Google Track.",this.Class);
		try {
			window._gaq.push(['_setAccount',this.UID]); 
			window._gaq.push(['_setDomainName',document.location.host]);
			window._gaq.push(['_addIgnoredOrganic',document.location.host]);
			window._gaq.push(['_trackPageview']);
		} catch(err) {
			_DBG_(printStrackTrace({e:e},this.Class));
		}
	},
	
	getVersion:function() {
		try {
			var pageTracker = _gat._getTrackerByName(); // Gets the default tracker.
			return VLD(this.version = pageTracker._getVersion());
		} catch(err) {
			_DBG_(printStrackTrace({e:e},this.Class));
			return false;
		}
	},
	
	lookForGoogle:function() {
		_DBG_("Determining issue with Google...",this.Class);
		var $scripts = document.getElementsByTagName('script');
		for (var i in $scripts) {
			// go through all the scripts:
			if (typeof($scripts[i].src) !== 'undefined' && $scripts[i].src.split('?')[0].match(/ga\.js$/)) {
				_DBG_("The Google API IS Loaded.",this.Class);
				this.loaded=true;
				if (this.getVersion()) {
					_DBG_("Google API v"+this.version+" is active.",this.Class);
					this.enabled=true;
				}
			}
		}	
	},
	_onLoaded:function(){ 
		_DBG_("Google code received.",this.Class);
		this.google.loaded=true; 
		this.onReady();
	},

	_onError:function(){ 
		_DBG_([{msg:"Google code failed to load."}],this.Class);
		h5c3.google.loaded=false; 
		h5c3.google.enabled=false;

		this.lookForGoogle();
		h5c3.google.onReady();
	},
	
	start:function() {
		if (this.UID==='') _DBG_('You did not set your Google Unique ID in the config file.',this.Class); else _DBG_('Using your Google Unique ID ' + this.UID,this.Class);
		if (!this.enabled) _DBG_('Google communication is NOT enabled.',this.Class); else _DBG_('Google communication is enabled.',this.Class);	
	}
});
