/**
 *
 * @namespace h5c3.R2WL
 * @class h5c3.R2WLCommon
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
window.h5c3.R2WLCommon = h5c3.Base.extend('h5c3.R2WLCommon', { 
	_CLASSNAME: 'R2WLCommon',
	_CLASSVERSION:'0.1.0'
}, {
    /**
     * @property {CloudApp object} app
     * @default null
	 * @memberof h5c3.R2WLCommon
     */
    app: null,

    /**
	 * @public
	 * @method
	 * @memberof h5c3.R2WLCommon
	 * @desc
     * </p>
	 * Description of this method
	 * </p>
     */
    init: function () {
        this._super();
		//this.requestCallbacks('start','onready','onresize');
		_DBG_('Rich & Responsive Web Layer (R2WL) Initialized.',this.Class);
    },
	
	start:function() {
		var $h = h5c3.r2wl.parseHeader(DOC().all[0].dataset);
		if (!$h) {
			_DBG_('Invalid Application header.',this);
			return false;
		}
		
		this.brand = new h5c3.Brand();
		this.google = new h5c3.Google('UA-35732532-1');
		this.app = new h5c3.CloudApp($h);
		this.brand.start();
		this.google.start();
		this.app.start();
	},
		
	parseHeader: function($data) {
		
		me = function($h) {
			return $h.role+" : "+$h.name+" v"+$h.version+"("+$h.uuid+")";
		}

		if (ISA($data) !== 'DOMStringMap') {
			return;
			_DBG_('Failed: Method requires a single aprameter of type DOMStringMap.',this);
		} else {
			if (VLD($data.role)&&VLD($data.name)&&VLD($data.version)&&VLD($data.uuid)) {
			$good = this.validUUID($data.uuid);
				if (!$good) {
					_DBG_(me($data)+" Invalid or Not a Genuine UUID.",this);
					return false;
				}
				
				//ok we got enough for a valid applet.
				if ($data.role.toLowerCase()==='application') {
					CHK($data.layout,'absolute-all');
					CHK($data.typo,'default');
					CHK($data.skin,'default');
					CHK($data.applet,'default');					
				}
				_DBG_(me($data)+" Validated.",this);
				return $data
			} else
				return false;
		}
	},
	
	makeHeader:function($role,$name,$version,$uuid) {
		if (!VLD($role)) $role = "applet";
		if (!VLD($name)) $name = "Noname";
		if (!VLD($version)) $version = "0.0.1";
		if (!VLD($uuid) || !$$header.validUUID($uuid)) $uuid = $header.generateUUID();
		
		var html = '<div ';
		html+='	data-role="'+$role+'" ';
		html+='	data-name="'+$name+'" ';
		html+='	data-version="'+$version+'" ';
		html+='	data-uuid="'+$uuid+'" ';
		html+='	data-author="" ';
		html+='	data-copyright="" ';
		html+='	data-scale="1" ';
		html+='/>\n';

		return html;
	},
	
	compile:function($applet) {
		return h5c3.lzw.encode(encodeURIComponent($applet));
	},

	decompile:function($applet) {
		return h5c3.lzw.decode(encodeURIComponent($applet));
	},
	
	validUUID:function($uuid) {
	
		if (VLD($uuid) && $uuid!=="") { 
		
			if (( ($uuid.split("-").length - 1) ==4 )?true:false) {
				//var a=$uuid.charAt(4), b=$uuid.charAt(17), c=$uuid.charAt(22), d=$uuid.charAt(30);
				//if (a && b && c && d) {
				if ($uuid.charAt(4)=="1" && $uuid.charAt(17)=="9" && $uuid.charAt(22)=="6" && $uuid.charAt(30)=="9") {
					return true;
				} else {
					if (location.protocol==='file:' && h5c3.config.devMode) {
						//console.log( 'Thats a bad UUID! Here is a good one '+this.generateUUID() );
						_DBG_('Validation Failed, Bad UUID!',this);
						return false;		
					}
				} /* Embeded Code Check */
				
			} /* Format Check */
			
		} /* General Valid Check */
		
	},
	
	generateUUID:function() {
		return 'xxxx1xxx-xxxx-4xx9-yxx6-xxxxxx9xxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
			return v.toString(16);
		});
	},
	
	onReady:function() {
	}
	
});/**
 *
 * @namespace Core
 * @class h5c3.Brand
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
h5c3.Brand = h5c3.Base.extend('h5c3.Brand', {
	_CLASSNAME		:'Brand',
	_CLASSVERSION	:'0.0.2'
},{
    /**
	 * @public
	 * @method
	 * @memberof h5c3.Brand
	 * @desc
     * </p>
	 * Simply creates the I2TM labs / H5C3 Branding object
	 * </p>
     */
    init:function() {
        this._super();
    },
	
	update:function() {
		$("#h5c3built").text(h5c3.BUILT);
		$("#h5c3version").text(h5c3.DISTRO+'-'+h5c3.VERSION);
		if (h5c3.devMode===true)
			$("#h5c3version").css("color","#FF0000");
		else
			$("#h5c3version").css("color","#ddffdd");
	},
	
	populate:function() {
		var $css;
		$css='<style id="h5c3-logo">#h5c3_logo {font-size:1em;display: block;}';
		$css+='#hlmc {position: relative;display:block;top:0px;left:0px;width:100%;height:100%;font-family: Neuropol, sans-serif;text-transform: uppercase;text-align: center;}';   
		$css+='#h5c3_logo .c_H { display:inline; font-size: 100%; color: #e98900; }#h5c3_logo .c_5 { display:inline; font-size: 50%; color: #e98900; }#h5c3_logo .c_C { display:inline; font-size: 100%; color: #000beb; }#h5c3_logo .c_3	{ display:inline; font-size: 50%; color: #000beb; }#h5c3_logo .w_FW { display:block; font-size: 42%; color: #444444;}</style>\n';		
		$css+='#i2tm_logo{font-size:3em;display:block;}#i2tm_logo .w_il{display:inline;font-size:100%;color:#00cc00;}';
		$css+='#ilmc {position:relative;display:block;top:0px;left:0px;width:100%;height:100%;font-family:Neuropol,sans-serif;text-transform:uppercase;text-align:center;padding-top:6.25%;}</style>\n';
		h5c3.r2wl.app.stylesheet.add('brand-logos',$css,'R2WL');
	},
	
	logoI2TM:function($scale) {
		$scale = CHK($scale,4);
		return '<div id="i2tm_logo" data-role="applet" style="font-size:'+$scale+'em"><div id="ilmc"><div class="w_il backlight">i2tm Labs</div></div></div>\n';
	},
	
	logoH5C3:function($scale) {
		$scale = CHK($scale,4);
		return '<div id="h5c3_logo" class="animateIn" data-role="applet" style="font-size:'+$scale+'em"><div id="hlmc"><div class="c_H emboss backlight">H</div><div class="c_5 emboss backlight">5</div><div class="c_C emboss backlight">C</div><div class="c_3 emboss backlight">3</div><div class="w_FW emboss backlight">framework</div></div></div>\n';
	},
	
	youAreRunning:function() {
		var $html='';
		$html+='<h3 style="margin:0">You are running</h3>';
		$html+=this.logoI2TM(4);
		$html+=this.logoH5C3(5);
		$html+='<p id="h5c3version" class="center">version</p>';
		$html+='<p id="h5c3built" class="center">built on</p>';	
		return $html;
	},
	
	poweredBy:function($scale) {
		$scale = CHK($scale,0.5);
		var $clr = (h5c3.devMode) ? 'red' : 'green';
		return '<div style="font-size:'+$scale+'em;color:'+$clr+';width:23%;letter-spacing:0.20em;position: relative;margin:0 auto">Powered By '+h5c3.tag()+'</div>';
	},
	
	start:function() {
		this.populate();
		this.update();
	}

});/**
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
/**
+-----------------------------------------------------------+
| File:		style.js										|
| Version:	0.0.1											|
| Author: Andrew Donelson	andrew@i2tmlabs.com				|
| H5C3 Framework - (c) 2013 <i2tm Labs http://i2tmlabs.com>	|
| This file contains an H5C3 core object that creates a 	|
| dynamic stylesheet. This is the basis for every single	|
| H5C3 CloudApp created weather its a Rich Document or Full |
| Applications.												|
|															|
| Requires: css/h5c3.rwd.style.js (loaded after)			|
+-----------------------------------------------------------+
*/
h5c3.StyleSheet = h5c3.Base.extend('h5c3.StyleSheet',  {
	_CLASSNAME: 'Google',
	_CLASSVERSION:'0.1.0',

	//This is the percentange of window width to 12px standard font. Used to calc for EM
	// so 1em = (Screen width / _EMPCT)
	_EMPCT : 85,
	
	_FONTSIZE: 16, //in pixels
	
	_MODES : [
		{w:2560,f:19},
		{w:1920,f:18},
		{w:1600,f:17},
		{w:1440,f:16},
		{w:1366,f:15},
		{w:1280,f:14},
		{w:1024,f:13},
		{w:768,f:12},
		{w:480,f:11},
		{w:320,f:10}]
},{
	r2wl: null,

	useMQ: true,				//false uses dynamic on the fly calculations, otherwise media queries are created and used.d
	
	appLayout:'',
	
	/* Mobile mode is considered any resolution under 720px width with a higher value in height. ie. 720x721 is mobile */
	mode: 2,				//NULL on purpose - triggers for event

	mobile: null,			//The mobile menu button (DIV)
	
	reloadRedraw: false,
	
	resizeTimer:0,
	
	/**
	 * Initialization Method
	 */	
	init:function ($layout,$r2wl) {
        this._super();
		this.r2wl=$r2wl;
		this.createMediaQueries();
		this.checkScreenMode();				//save current orientation
		//this.createLayouts();

		this.initEvents();
		this.mobile = DOC().createElement('div');
	},
	
	start:function() {
		this.reviewResolution();
	},
	
	add:function($id,$style,$type) {
	//add:function($name,$style) {
		if ( $style==="" ||$style.length<40 || !VLD($id) || !VLD($type) ) return;
		//Already present
		if (GEI($id)) return;
		//Remove any tags, just want css
		$style = $($style);
		$($style).data("role",$type);
		var $s = DOC().createElement('style');
		$s.id = $id;
		$s.type = 'text/css';
		//$s.dataset.data("role",$type);
		$s.innerHTML = $($style).text();
		
		//$htmlDiv.innerHTML = '<style></style>\n';
		document.getElementsByTagName('head')[0].appendChild($s);
		
		_DBG_('Added Stylesheet '+$id,this.Class);
	},
	
	remove:function(name) {
		if (VLD(name)) return;
	
	},

	reviewResolution:function() {
		//check application attributes for the layout we are using
		if (d = DOC().documentElement.dataset) {
		
			if (!h5c3.r2wl.app.layout.isValid(d.layout)) {
				_DBG_('Not a valid layout. ['+d.layout+']',this.Class);
			} else {
				_DBG_('Valid Layout ['+d.layout+'] detected.',this.Class);
				this.appLayout = d.layout;
				if (this.appLayout==='absolute-all') {
					//subtract sidebars and then calulate
					return this.setResolution((window.innerWidth-400));
				} else {
					return this.setResolution();			
				}
			}
		}
	},
		
	initEvents:function() {
		$(window).resize(function(){
		  clearTimeout(h5c3.r2wl.app.stylesheet.resizeTimer);
		  h5c3.r2wl.app.stylesheet.resizeTimer = setTimeout(h5c3.r2wl.app.stylesheet._onResizeComplete, 200);
		});		
	},
	
	_onScreenSizeChanged:function() {
		_DBG_('Window Size has changed.',this.Class);
		if (this.layout !== 'absolute') return;
		//721 to 959 Drop Right sidebar
		if (this.mode < 2) {
			$("#RIGHTBAR").css({display:"none",width:"0"});
			$("#CONTENT").css({right:"0"});
		} else {
			$("#RIGHTBAR").css({display:"block",width:"12.5em"});
			$("#CONTENT").css({right:"12.5em"});
		}
		
		//0 to 720 Drop left sidebar
		if (this.mode < 1) {
			$("#LEFTBAR").css({display:"none",width:"0"});
			$("#CONTENT").css({left:"0"});
		} else {
			$("#LEFTBAR").css({display:"block",width:"15em"});
			$("#CONTENT").css({left:"15em"});
		}		
	},

	_onResizeComplete:function() {
		_DBG_('Window resize detected.');
		h5c3.r2wl.app.stylesheet.checkScreenMode();
		if (this.reloadRedraw===true)
			h5c3.r2wl.app.stylesheet.forceRedraw();
		else
			h5c3.r2wl.app.layout.reCalc();
	},

	forceRedraw:function() {	
		GEI("WRAPPER").style.display="none";
		location.reload();
	},
	
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
	
	getFontSize:function() {
		var el = GEI('WRAPPER');
		if (VLD(el)) {
			var style = window.getComputedStyle(el, null).getPropertyValue('font-size');
			return fontSize = parseFloat(style);
		}
		return 14;
	},
	
	/**
	{GUTTER}		1em Default (about 12 px)
	{SWIDTH}		Actual Window With, ie. 1920px	
	{OUTER}			Desired content width. ie. 960px R2WL uses 90% up to full HD then its static at 1920px full width, 100% on mobile
	{INNER}			Actual content width = ({OUTER}-{GUTTER})
	*/
	calcRWDValues:function($width) {
		var $obj 			= {scrn:$width};
			$obj.gutter		= 1;
			$obj.em 		= this.getFontSize();//8-12
	
		if (this.mobile) {
			//We are going to use 90% for out outer window content
			$obj.full=
			$obj.outer= 	
			$obj.cellwidth=	
			$obj.sixth=		
			$obj.fourth=	
			$obj.third=		
			$obj.half=		
			$obj.width		= Math.floor($width / $obj.em);

			$obj.cellheight	= Math.floor( ((window.innerHeight/$obj.em)-$obj.gutter) *.10);		
			$obj.maxHeight	= (window.innerHeight / $obj.em).toFixed(2);
		} else {
			//We are going to use 90% for out outer window content
			$obj.width		= Math.floor($width / $obj.em);
			$obj.full=
			$obj.outer 		= ( ($width * 0.90) / $obj.em).toFixed(2);
			
			$obj.cellwidth	= Math.floor( ($obj.outer-$obj.gutter) *.10);		
			$obj.sixth		= ($obj.outer / 6).toFixed(2);
			$obj.fourth		= ($obj.outer / 4).toFixed(2);
			$obj.third		= ($obj.outer / 3).toFixed(2);
			$obj.half		= ($obj.outer / 2).toFixed(2);
			$obj.cellheight	= Math.floor( ((window.innerHeight/$obj.em)-$obj.gutter) *.10);		
			$obj.maxHeight	= (window.innerHeight / $obj.em).toFixed(2);
		}
		return $obj;
	},
	
	onReady:function() {
		_DBG_('Stylesheet Ready.',this.Class);
	},
	
	//Create media queries for the devices actual dimensions
	createMediaQueries:function() {
		//10 media queries for any resolution
		var fs=14, //0.4 per step
			step = ((window.screen.availWidth-320) / 10).toFixed(2),
			css ='<style data-role="Application">\n';
			
		for (i=window.screen.availWidth;i>319;i=i-step) {
			css+="@media all and (max-width:"+i+"px) {body,#WRAPPER {font-size:"+fs+"px;}}\n";
			fs=(fs-0.4).toFixed(2);
		}		
		css+="</style>\n";

		_DBG_('Dynamic Media Queries for ['+window.screen.availWidth+'x'+window.screen.availHeight+'] created.',this.Class);
		this.add('Media-Queries',css,'R2WL');
	},
	zoom:function($el,$in) {
		//find the window element
		var $t;
		for (i=0;i<9;i++) {
			$el=$el.parentElement;
			if ($el.className.indexOf('r2wl_window ')!==-1) break;
		}
		var $val = $el.dataset.zoom;
		if (!VLD($val)) $val = 1;
		if ($in && $val < 7) {
			$val++;
			if ($val > 1) $val = 7;
		} else if ($val >1) {
			$val--;
			if ($val < 1) $val = 1;
		}
		$el.dataset.zoom = $val;
	},
	
	setResolution:function($width) {
		if (!VLD($width)) { $width = window.innerWidth; }
		
		var $obj = this.calcRWDValues($width),
			css ='<style data-role="Application">';
		
		// css+="body{font-size:"+$obj.em+"px;width: 100%;height: 100%;}";
		// css+=".cell{min-height:"+$obj.cellheight+"em;max-height:"+$obj.cellheight+"em;min-width:"+$obj.cellwidth+"em;max-width:"+$obj.cellwidth+"em;margin:"+$obj.gutter+"em}";
		// css+=".box{margin:"+$obj.gutter+"em}";
		// css+=".lightbox{padding:"+$obj.gutter+"em;margin:"+$obj.gutter+"em}";
		// css+=".full{min-width:"+$obj.width+"em;width:"+$obj.width+"em;margin:"+$obj.gutter+"em;}";
		// css+=".fill{min-width:100%;width:100%;min-width:100%;width:100%;margin:0em;}";
		// css+=".half{min-width:"+$obj.half+"em;width:"+$obj.half+"em;}";
		// css+=".third{min-width:"+$obj.third+"em;width:"+$obj.third+"em;}";
		// css+=".fourth{min-width:"+$obj.fourth+"em;width:"+$obj.fourth+"em;}";
		// css+=".sixth{min-width:"+$obj.sixth+"em;width:"+$obj.sixth+"em;}";	
		
		// if (this.mode!=2) {
			//Individual Column Sizes
			// css+=".pct100 {width:100%;}\n";
			// css+=".pct90 {width:100%;}\n";
			// css+=".pct80 {width:100%;}\n";
			// css+=".pct70 {width:100%;}\n";
			// css+=".pct60 {width:100%;}\n";
			// css+=".pct50 {width:100%;}\n";
			// css+=".pct40 {width:100%;}\n";
			// css+=".pct30 {width:100%;}\n";
			// css+=".pct20 {width:100%;}\n";
			// css+=".pct10 {width:100%;}\n";
		// } else {		
			//Individual Column Sizes
			// css+=".pct100 {width:"+$obj.width+"em;}\n";
			// css+=".pct90 {width:"+(($obj.width)*0.9).toFixed(2)+"em;}\n";
			// css+=".pct80 {width:"+(($obj.width)*0.8).toFixed(2)+"em;}\n";
			// css+=".pct70 {width:"+(($obj.width)*0.7).toFixed(2)+"em;}\n";
			// css+=".pct60 {width:"+(($obj.width)*0.6).toFixed(2)+"em;}\n";
			// css+=".pct50 {width:"+(($obj.width)*0.5).toFixed(2)+"em;}\n";
			// css+=".pct40 {width:"+(($obj.width)*0.4).toFixed(2)+"em;}\n";
			// css+=".pct30 {width:"+(($obj.width)*0.3).toFixed(2)+"em;}\n";
			// css+=".pct20 {width:"+(($obj.width)*0.2).toFixed(2)+"em;}\n";
			// css+=".pct10 {width:"+(($obj.width)*0.1).toFixed(2)+"em;}\n";
		// }
		
		css+="[class*='pct'] {float:left;min-height:3em;min-width:4em}\n";
		css+="#waDIV {width:48em; height:27em;position:relative;}\n";
		css+="#waCanvas {width:100%;height:100%;}\n";
		css+=".h5c3_applet {width:0px;height:0px;display:none;}\n";
		css+="#HEADER.normal,.HEADER,#LEFTBAR.normal,.LEFTBAR,#RIGHTBAR.normal,.RIGHTBAR,#FOOTER.normal,.FOOTER { background: rgba(255, 255, 255, 0.85); color: rgba(60, 100, 190, 0.85); }\n";
		css+="#HEADER.light,.HEADER,#LEFTBAR.light,.LEFTBAR,#RIGHTBAR.light,.RIGHTBAR,#FOOTER.light,.FOOTER { background: rgba(255, 255, 255, 0.85); color: rgba(60, 100, 190, 0.85); }\n";
		css+="#HEADER.dark,.HEADER,#LEFTBAR.dark,.LEFTBAR,#RIGHTBAR.dark,.RIGHTBAR,#FOOTER.dark,.FOOTER { background: rgba(255, 255, 255, 0.85); color: rgba(60, 100, 190, 0.85); }\n";
		css+="</style>\n";
		_DBG_('Dynamic Stylesheet created for '+$width,this.Class);
		this.add('common',css,'R2WL');
	}
});
/**
+-----------------------------------------------------------+
| File:		HEAD.min.js										|
| Version:	0.0.1											|
| Author: Andrew Donelson	andrew@i2tmlabs.com				|
| H5C3 Framework - (c) 2013 <i2tm Labs http://i2tmlabs.com>	|
+-----------------------------------------------------------+
*/

/**
 *
 * @namespace h5c3.Layout
 * @class h5c3.Layout
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
h5c3.Layout = h5c3.Base.extend('h5c3.Layout', { 
	_CLASSNAME: 'Layout',
	_CLASSVERSION:'0.1.0',
	
	_layouts: ["standard","landing","absolute"]
}, {
	r2wl: null,
    /**
     * @property {object} resources
     * @default null
	 * @memberof h5c3.Layout
     */
    layout: null,

	header: false,
	leftbar: false,
	rightbar: false,
	footer: false,
	
	dim:{t:5,b:2.5,l:15,r:12.5},
	
    /**
	 * @public
	 * @method
	 * @memberof h5c3.Layout
	 * @desc
     * </p>
	 * Description of this method
	 * </p>
     */
    init: function ($layout,$r2wl) {
        this._super();
		this.r2wl=$r2wl;
		if (this.isValid($layout)) {
			this.layout = $layout;
			_DBG_('Valid layout ['+$layout+'] detected.',this);		
		} else {
			_DBG_('Unknown layout ['+$layout+'] Did you forget to load the plugin that implements is?',this);
		}
    },

	start:function() {
		if (this.isValid(this.layout)) {
			this.setLayout(this.layout);
		} else {
			this.setLayout('standard');			
		}
	},
	
	isValid:function($layout) {
		if (!VLD($layout)) return false;
		$layout.toLowerCase();
		var $t = $layout.split('-');
		return (this.Class._layouts.indexOf($t[0]) > -1);
	},
	
	setLayout:function($name) {
		this.layout = $name;
		//if ($name===this.Class._layouts[2]) { 
			//BEGIN Absolute
			var $t = $name.split('-');
			for (i=0;i<$t.length;i++) {
				if ($t[i]==='all') {
					this.header = true;
					this.leftbar = true;
					this.rightbar = true;
					this.footer = true;
					break;
				}
				else if ($t[i]==='header') this.header = true;
				else if ($t[i]==='left') this.leftbar = true;
				else if ($t[i]==='right') this.rightbar = true;
				else if ($t[i]==='footer') this.footer = true;
			}
			this.absolute();
		//} 	//END Absolute
	},
	
	//Usually called when there was a window resize and the iser does not want the browser reload.
	reCalc:function() {
	
	},

	//absolute
	absolute:function() {
		DOC().body.id='DESKTOP';

		if (document.body.innerHTML.length<11) {
			var $css='',$html='';
			var $top=this.dim.t,
				$bot=this.dim.b,
				$lw=this.dim.l,
				$rw=this.dim.r;
			
			$css+='<style>#WRAPPER {position:absolute;min-height: 100%;min-width: 100%;height: 100% !important;height: 100% !important;overflow:hidden;}\n',
			$html+='<div id="WRAPPER" data-type="application" data-layout="absolute">\n';
					
			if (VLD(this.r2wl.app.header.applet)) {
				$applet='<div data-applet="'+this.r2wl.app.header.applet+'">';
			} else {
				$applet='<div data-applet="none">';
				$applet += this.r2wl.brand.logoI2TM(4);
				$applet += this.r2wl.brand.logoH5C3(12);
				$applet += this.r2wl.brand.poweredBy(1);	
				$applet += '<p style="text-align:center"><br />Negative ghostrider!...You have not assigned a default applet.<br />Documentation can be found <a href="http://devzone.i2tmlabs.com/">HERE</a>.<p>';
				$applet += '</div>';
			}
			
			if (this.layout.header) {
				$css+='#HEADER {position: fixed;z-index: 9999;width: 100% !important;top: 0;height:'+$top+'em !important;}\n';
				$html+='<div id="HEADER" ></div>\n';
				$html+='<div id="CONTENT">\n';		
			} else {
				$top=0;
				$html+='<div id="CONTENT">\n';		
			}
			
			if (this.layout.leftbar) {
				$css+='#LEFTBAR {position:fixed;z-index: 9999;top:'+$top+'em;bottom:'+$bot+'em;left:0px;width:'+$lw+'em;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;-o-box-sizing:border-box;-ms-box-sizing:border-box;box-sizing:border-box;}\n';
				$html+='<div id="LEFTBAR"></div>	\n';
				$html+='<div id="VIEWPORT">'+$applet+'</div>\n';
			} else {
				$lw=0;
				$css+='#LEFTBAR {position:fixed;z-index: 9999;top:'+$top+'em;bottom:'+$bot+'em;left:0px;width:'+$lw+'em;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;-o-box-sizing:border-box;-ms-box-sizing:border-box;box-sizing:border-box;}\n';
				$html+='<div id="VIEWPORT">'+$applet+'</div>\n';
			}
			
			if (this.layout.rightbar) {
				$css+='#RIGHTBAR {position:fixed;z-index: 9999;top:'+$top+'em;bottom:'+$bot+'em;right:0px;width:'+$rw+'em;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;-o-box-sizing:border-box;-ms-box-sizing:border-box;box-sizing:border-box;}\n';
				$html+='<div id="RIGHTBAR"></div>\n';
				$html+='</div><!-- CONTENT -->\n';
			} else {
				$rw=0;
				$html+='</div><!-- CONTENT -->\n';
			}
			
			if (this.layout.footer) {
				$css+='#FOOTER {position: fixed;z-index:9999;width:100%;height:'+$bot+'em !important;bottom:0;}\n';
				$html+='<div id="FOOTER"></div>\n';
				$html+='</div>\n';
			} else {
				$bot=0;
				$html+='</div>\n';
			}
			$css+='#CONTENT {position: absolute;right:'+$rw+'em;left:'+$lw+'em;top:'+$top+'em;bottom:'+$bot+'em;padding:0em;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;-o-box-sizing: border-box;-ms-box-sizing: border-box;box-sizing: border-box;overflow: hidden;}\n';
			$css+='#VIEWPORT {width: 100%;height: 100%;overflow: auto;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;-o-box-sizing: border-box;-ms-box-sizing: border-box;box-sizing: border-box;}</style>\n';
			this.r2wl.app.stylesheet.add(this.layout,$css,'R2WL');
			document.body.innerHTML = $html;
		} else {
			_DBG_('Hand coded '+this.layout+' layout detected, Skipping Dynamic creation.',this);
		}
		
	}
	
});/**
 *
 * @namespace h5c3
 * @class h5c3.SmartMenu
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
h5c3.SmartMenu = h5c3.Base.extend('h5c3.SmartMenu', { 
	_CLASSNAME: 'SmartMenu',
	_CLASSVERSION:'0.0.1'
},{
    /**
     * @property {object} resources
     * @default null
	 * @memberof h5c3.SmartMenu
     */
    $_menu: null,

    /**
	 * @public
	 * @method
	 * @memberof h5c3.SmartMenu
	 * @desc
     * </p>
	 * Description of this method
	 * </p>
     */
    init: function () {
        this._super();
		if (typeof h5c3.config.smartmenu === 'object') {
			this.$_menu = h5c3.config.smartmenu;
		}
    }
});/**
 * @class  h5c3.Applet
 * 
 * A Applet resource. You can use this class to acquire Applets (loaded from a URI) and then use them in your CloudApp
 */
h5c3.Applet = h5c3.Pooled.extend('h5c3.Applet', {
	_CLASSNAME: 'Applet',
	_CLASSVERSION:'0.1.0',

	params: {
		required: ['role','name','version','uuid'],
		optional: ['author','copyright','scale']
	},
	
	//True if this applet has 1 or more applets
	hasChildren:false,
	
	children:[],
	
	/**
	 * Constructs an Applet by acquiring it from the object pool. An applet had 4 required attributes
	 * ['role','name','version','uuid'] and 3 optional attributes ['author','copyright','scale'].
	 * 
	 * The name must be unique to your Applet Store. The UUID must be a valid and H5C3 Genuine which matches it
	 * to you, company or personal. It is strongly suggested that you use the version. End Users have the option
	 * of Automatically using the latest Applications and Applets, but that usually means stability issues. Using
	 * the version allows for saftey and less issues.
	 *
	 * @param  
	 * {h5c3.url} url url to the applet - http://applets.i2tmlabs.com/ + path/to/applet/applet.someAppletName.html
	 * @return {h5c3.Applet} A h5c3.Applet if successful, Applet Name if failed.
	 */
	create: function($data)
	{
		var n = this._super();
		if (ISA($data)==="Object:Simple" && $data.header.name!==null) {
			for (var $key in $data) {
				n[$key] = $data[$key];
			}
			
		} 
		
		if (n.parse($data))
			return n
		else
			return n.name;
	}	
},
/** Interface: h5c3.Applet.prototype */
{
	/** the Applets stylesheet-will be added/removed to head automatically */
	style:'',

	/** the Applets javascript-will be added/removed to head automatically */
	script:'',

	/** the Applets html- place as variable {$applet:someAppletName} */
	html:'',
	
	/** Source URI used to load the image */
	src:null,

	header: {
		/** Applets Name */
		name:null,
		
		/** Applets version */
		version:'',
			
		/** Applets Universally unique identifier */
		uuid: '',
		
		role: '',
		
		author: '',
		
		copyright: ''
	},
	
	/** When the this object was created */
	created: 0,				
	
	/** when the this object was last used */
	accessed: 0,

	/** Loaded, parsed, Verified and ready to use? */
	ready: false,

	/** Whether the image has been loaded yet */
	loaded:false,
	
	/** is this applet con the current page? yes make it active otherwise disable it **/
	active: false,
	
	
	/**
	 * Constructs a new h5c3.Applet. If the h5c3.loader has already started then the image will be
	 * immediately loaded, otherwise it will wait for the resource loader to handle the loading.
	 * @param  String name Name to give the image resource
	 * @param  String src URI for the image
	 */
	init:function ()
	{
		this._super();	
	},

	//me:function() {
	//	return this.uniqueId+" : "+this.header.name+" v"+this.header.version+"("+this.header.uuid+")";
	//},
	
	scanForApplets:function($html) {
		var $self=false;
		CHK($html,"");
		if ($html==="self") {
			$html = this.$html
			$self=true;
		} else if (VLD($html)) { 
			$html = $($html); 
		} else { 
			$html = $("body"); 
		}
		if (!VLD($html)) return 0;
		_DBG_('Scanning '+$html[0].nodeName+' for applets...',this.Class);
		
		//Ok we found all applets (if any)
		var $DIVs = $($html).find("div").filter(function(data) {
			return $(this).data("applet") !== undefined;
		});
		if ($self && $DIVs.length>0) this.hasChildren=true;
		return $DIVs
	},
	
	embed:function ($html,$into) {
		//if (this.active) return;	
		var tmp = $("div[data-applet='"+this.header.name+"']").append($html);		
		this.active = true;
		this.setDraggable();
	},

	unbed:function () {
		if (!this.active) return;
		this.active = false;
		// dont forget to remove the style and script!!!
	},
		
	setDraggable:function() {
		$(function() {
			$('#VIEWPORT').on('mousedown', 'div', function() {
				if(this.draggable===true) {
					$(this).addClass('draggable');
					$(this).addClass('dragging').parents().on('mousemove', function(e) {
						$('.dragging').offset({
							top: e.pageY - $('.dragging').outerHeight() / 2,
							left: e.pageX - $('.dragging').outerWidth() / 2
						}).on('mouseup', function() {
							$(this).removeClass('dragging');
						});
						if (typeof e != 'undefined') e.preventDefault();
					});
				} else {
					$('.draggable').removeClass('draggable');
					$(this).removeClass('dragging');
				}
			}).on('mouseup', function() {
				$('.draggable').removeClass('draggable');
			});
		});
	},
	parse:function($data) {
		var $result = true, $el=null;

		if (ISA($data)==="Object:Simple" && $data.header.name!==null) 
			$el=$data; 
		else {
			$el=$($data);
			this.header = h5c3.r2wl.parseHeader($el[0].dataset);
			if (!this.header) return false;
			$data = $($data).not("comment").not("text");
		}
		
		for (i=0;i<$data.length;i++) {
			if ($data[i].dataset.role==='applet' && $data[i].dataset.type==='content') {
				this.html = $data[i].outerHTML
			} else if ($data[i].dataset.role==='applet' && $data[i].dataset.type==='style') {
				this.style = $data[i].outerHTML;
			} else if ($data[i].dataset.role==='applet' && $data[i].dataset.type==='script') {
				this.script = $data[i].outerHTML;				
			}
		}
		
		//Hide it initially - it will fade in 
		if (this.style)		h5c3.r2wl.app.stylesheet.add(this.header.name,this.style,'Applet');
		if (this.script)	h5c3.r2wl.app.stylesheet.add(this.header.name,this.script,'Applet');
		if (this.html) {
			this.embed(this.html);
		}	
		return $result;
	},
		
	makeHeader:function($role,$name,$version,$uuid) {
		if (!VLD($role)) $role = "applet";
		if (!VLD($name)) $name = "Noname";
		if (!VLD($version)) $version = "0.0.1";
		if (!VLD($uuid) || !h5c3.r2wl.validUUID($uuid)) $uuid = h5c3.r2wl.generateUUID();
		
		var html = '<div ';
		html+='	data-role="'+$role+'" ';
		html+='	data-name="'+$name+'" ';
		html+='	data-version="'+$version+'" ';
		html+='	data-uuid="'+$uuid+'" ';
		html+='	data-author="" ';
		html+='	data-copyright="" ';
		html+='	data-scale="1" ';
		html+='/>\n';

		return html;
	},
	
	parseStyle:function($data) {
		return $($data).filter("style").each(function(data) {
			h5c3.r2wl.app.stylesheet.add(this.header.name,this.outerHTML,'Applet');
			return this.outerHTML.toString();
		});		
	},
	
	parseScript:function($data) {
		return $($data).filter("script").each(function(data) {
			h5c3.r2wl.app.stylesheet.add(this.header.name,this.outerHTML,'Applet');
			return this.outerHTML.toString();
		});		
	},
	
    /**
	 * @method verify()
	 *
	 * Scans a applet and verifies that it is contructed/configured correctly. All applets need a minimum
	 * of 4 data attributes (role, name, version and uuid)
     * 
	 * @param
	 * None
	 *
	 * @return 
	 * None
     */		
	verify:function($applet,$autofix) {
		var $result,$uuid,$name,$version,$wrapper,$content = false;
		var $msg="Validating->";
		$result=0;

		//Check for applet role
		if (!VLD($applet.dataset.role)) {
			$msg+="Missing data-role->"
			if ($autofix) {
				$applet.dataset.role="applet";
				$msg+="Fixed->"; 
			} else $result++;
		} //End Role
		
		if (!VLD($applet.dataset.name)) {
			$msg+="Missing data-name->";
			if ($autofix) {
				$applet.dataset.name="GIVE_ME_A_NAME";
				$msg+="Fixed->"; 
			} else $result++;

		} else if ($applet.dataset.name==="") {
			$msg+="data-name is empty->";
			if ($autofix) {
				$applet.dataset.name="GIVE_ME_A_NAME";
				$msg+="Fixed->"; 
			} else $result++;
		} //End Name
		
		if (!VLD($applet.dataset.version)) {
			$msg+="Missing data-version->";
			if ($autofix) {
				$applet.dataset.version="0.0.1";
				$msg+="Fixed->"; 
			} else $result++;
		} else if ($applet.dataset.version==="") {
			$msg+="data-version is empty->";
			if ($autofix) {
				$applet.dataset.name="0.0.1";
				$msg+="Fixed->"; 
			} else $result++;
		} //End Version
		
		//Validate/Create UUID
		if (!h5c3.r2wl.validUUID($applet.dataset.uuid)) {
			$msg+="Missing data-uuid->"
			if ($autofix) {
				if ($applet.dataset.uuid = h5c3.r2wl.generateUUID()) {
					$msg+="Created UUID->"; 
				} else {
					$msg+="Aborted: Unable to generateUUID."; 
				}
			} else $result++;
		} //End UUID
			
		if ($result===0 && $autofix!=true) {
			$msg+="PERFECT!->"; 		
		} else {
			$msg+="Failed ("+$result+") issues->"; 		
		}
		$msg+="Done."; 		
		return {result:$result,message:$msg,applet:$applet}		
	}		
});


/**
 * @class  h5c3.AppletFactory
 *
 * For creating entities (mostly just an interface class you extend from to create an entity factory).
 * No need to create an instance yourself...it is created automatically by Game::onReady()
 *
 * 
 *	h5c3.entityFactory = new AppletFactory();
 * (end)
 */
h5c3.AppletFactory = h5c3.Factory.extend('h5c3.AppletFactory',  {
	_CLASSNAME: 'AppletFactory',
	_CLASSVERSION:'0.3.1',
	
	getAppletPath:function($usecfg) {
		if ($usecfg && h5c3.config.options.path!='') 
			return h5c3.config.options.path+'applets/';
		else
			return h5c3.path.home+h5c3.path.applets;
	}
},{
	//Private array that stores elements name if it was scanned for links
	_scanned: [],

	//Private array that stores a history of applets to keeep form reloading. Page Reload wipes this
	_history: [],
	
	//Private array that stores elements name if it is waiting to be loaded
	_loadQue: [],
	
	started: false,
	
	r2wl: null,
	
	style: null,
	
	layout: null,
	
	_tracker: {
		failed: 0,
		loading: 0,
		loaded: 0,
		fromConn: 0,
		fromCache: 0,
		loops: 0,
		indexed:false
	},
		
	throttle: null,			//AJAX/Applet Throttle

	/**
	 * Initialization Method
	 */	
	init:function($r2wl) 
	{
		this._super('Applet');
		this.r2wl = $r2wl;
	},
		
	/**
	 * Called by the entity loader
	 *
	 * @param  {Object}		$data String type of the entity to create
	 * {h5c3.Layer} layer Layer the entity should be placed on
	 * @return {h5c3.Applet}
	 */
	create:function ($data)
	{		
		//load applet
		return this.requestApplet($data);
	},
	
	add:function($name,$obj) {
		this._super($name,$obj);
		
	},
	
	reset:function() {
		this._loadQue	= [];
		this._tracker	= {failed:0, loading: 0,loaded: 0,fromConn: 0,fromCache: 0,loops: 0};
	},

	stop:function() {
		this.started	= false;	
	},
	
	//Start loading all applets in our que
	start:function() {
		if (this.started) return;
		this.reset();
		this.started = true;
	},
	
	/**
	 * @method onHREFClick()
	 *
	 * Any Cloud Application links are captured and handled here. It tells the asks to use the
	 * applet detected in onClick event. The applet is aquired from cache or network and then
	 * is scanHTMLned or other applets via static include or links and added to the load que.
     * 
	 * @param
	 * EVENT	e		onClick event
	 *
	 * @return 
	 * 	None
     */	
	onHREFClick:function($evt) {
		try {
			h5c3.r2wl.app.applets.setpage(this.name);
		} catch (e) {
			AST(null,printStackTrace({e:e}));
		}
	},

	setpage:function($applet_name) {
		try {
			var $applet = h5c3.r2wl.app.applets.use({name:$applet_name}), $tmp;
			if (!$applet) return;
				var $DIVs = $applet.scanForApplets("self");
				
				for (i=0;i<$DIVs.length;i++) {
					var $name=$($DIVs[i]).attr('data-applet');
					$tmp = h5c3.r2wl.app.applets.use({name:$name});
					var tmp = $("div[data-applet='"+this.header.name+"']").append($html);		
				}
						
			if ($("#VIEWPORT").css("opacity")!="0") {
				this.lastContent = GEI("VIEWPORT").innerHTML;
				$("#VIEWPORT").fadeOut(250, function() {
					GEI("VIEWPORT").innerHTML =  $applet.html;
					$("#VIEWPORT").fadeIn(250,"linear");				
				});				
				//save current app & page to localstorage for resume
				h5c3.local.setAppCfg('currentPage',$applet.name);
			}
		} catch (e) {
			AST(null,printStackTrace({e:e}));
		}		
	},
	
    /**
	 * @method scanAnchors()
	 *
	 * Scans HTML document (CloudApp) or Loaded Applets for link to other applets and adds them to laod que
     * 
	 * @param	HTML		$html		optional html (applet) to seaqrch for other applets (nested)
	 *
	 * @return 	ARRAY 		All Applets detected in $HTML or BODY if no parameter
     */	
	scanAnchors:function($html) {
		var $msg="Scanning ",$elName,total=0,cached=0,load=0;
		if (VLD($html)) { $html = $($html); } else { $html = $("body"); }

		if ($html[0].id!="") {
			//Its in history..then we are ready scanned it.
			$elName=$html[0].id; 
			
			if (this._scanned.indexOf($elName) != -1) return true;
		} else {
			$elName=$html[0].nodeName;
		}
		
		$msg+=$elName+' for Links...';
		var links = GET('a');
		for (i = 0; i < links.length; i++) {
			//Possible Applet Link?
			if (links[i].hash!="") {
				var n=links[i].hash.split(".");
				if (n[0]=='#applet') {
					if (n[1]!="") {
						//Yep, its a applet link, add handler and pre-cache it
						links[i].addEventListener('click', this.onHREFClick, false);
						
						if (this._scanned.indexOf(n[1]) === -1) {
							this._loadQue.push(n[1]);
							this._scanned.push(n[1]);
							load++;
						} else {
							cached++;
						}
							
						links[i].name=n[1];
						
						total++;
					}
				}
			}
			
		}
		_DBG_($msg+'Found '+total+' linked applets. [Cached:'+cached+', Qued:'+load+', Total:'+total+']',this.Class);
		return total;
	},
	
    /**
	 * @method scanHTML()
	 *
	 * Scans HTML document (CloudApp) for all elements with a [data-applet] tag and saves them in the HashTable
	 * This does not scanHTML a applet for data-tags - that is handled by the Applet class.
     * 
	 * @param
	 * 	HTML		$html		optional html (applet) to seaqrch for other applets (nested)
	 *
	 * @return 
	 *	ARRAY 		All Applets detected in $HTML or BODY if no parameter
     */	
	scanHTML: function ($html) {
		var $setActive;
		
		if (VLD($html)) { 
		//	$html = $($html); 
			$setActive = false;		//[Not in use] - its in the cache so its not visible
		} else { 
		//	$html = $("body"); 
			$setActive = true;		//[In use] - its inthe app body so its visible
		}
		
		var DIVs = h5c3.Applet.prototype.scanForApplets($html);
		
		for (i=0;i<DIVs.length;i++) {
			if ($setActive === true) 
				DIVs[i].style.display = 'block';
			else 
				DIVs[i].style.display = 'none';
				
			this._loadQue.push(DIVs[i].dataset.applet);
		}
		//How many Applets from Static Includes? (In Page)
		this._tracker.loading = this._loadQue.length;
		
		_DBG_('A total of '+this._tracker.loading+' applets were found.',this.Class);
		
	},

	checkQue:function() {
		_DBG_('Checking Que...',this.Class);
		if (this._loadQue.length<=0) {
			//auto resume
			var $resume = h5c3.local.getAppCfg('currentPage');
			if (VLD($resume)) this.setpage($resume);
			return true;
		}
		//No Duplicates		
		if (this._loadQue.length>2) {
			var $uniqueQue = this._loadQue.filter(
				function(elem, pos) {
					return h5c3.r2wl.app.applets._loadQue.indexOf(elem) == pos;
				});	
			this._loadQue = $uniqueQue;
		}

		this._tracker.loading=this._loadQue.length;
		//load one from que.
		//var $applet = this._loadQue.pop();
		var $applet = this._loadQue.shift();
		this.requestApplet({ name: $applet });
	},
	
    /**
	 * requestApplet()
	 *
	 * Desc
     * 
	 * @param
	 * None
	 *
	 * @return 
	 * None
     */		
	requestApplet:function($data) {
		if (!VLD($data)) return false;
		
		var $msg = "Received request for: "+$data.name+'... ';
		var $fromlocal=false;
		var $applet = h5c3.local.getAppFile($data.name);
		if (VLD($applet)) {
			$msg += "Found in local Storage.";
			this.onLoad($applet);
			$fromlocal=true;
		}
		
		//See if the applet we want is in history (cached)
		var tmp = this._history[$data.name];
		
		if (typeof tmp != 'undefined') {
			this._tracker.fromCache++;
			$msg += "Found in cache. ";
			_DBG_($msg,this.Class);
			if (VLD(tmp.div)) this.onLoad(tmp.div);
			this.checkQue();
			return true;
		} else if (!$fromlocal) {
			$msg += "Not cached. ";
		}

		//No, We'll have to load it with Ajax
		this._history[$data.name] = {name:$data.name,src:this.Class.getAppletPath(1)+'applet.'+$data.name+'.html',div:$data.div};
		if (!$fromlocal) {
			try {
				$msg += "Requesting remote transfer. ";
				h5c3.XHR(this._history[$data.name].src,h5c3.bind(this, this.onLoad),h5c3.bind(this, this.onError));									
			} catch (e) { 
				AST(null,printStackTrace({e:e}));
			}
		}
		_DBG_($msg,this.Class);
	},

	_checkAllDone:function() {		
		if (this._loadQue.length<=0) {
			//All Applets have been loaded
			_DBG_("Load Complete. Cache: "+this._tracker.fromCache+", Remote: "+this._tracker.fromConn+", Failed: "+this._tracker.failed+", Total: "+this._tracker.loaded,this.Class);
			this.stop();			
			return true;
		} else {
			this.checkQue();
			this._tracker.loops++;
			if (this._tracker.loops > this._tracker.loading) {
				return true;
			}
			return false;
		}	
	},
	
	onLoad:function($data) {
		if ($data==="") return false;
		var $fromlocal;
		var a = ISA($data);
		if (ISA($data) ==="Object:Simple") {
			//we got it from localstorage already created.
			$fromlocal = true;
			//$obj = $data;
			//$data.parse($data);
			var $obj = h5c3.Applet.create($data);
		} else {
			//Create an applet loaded from net
			$fromlocal = false;
			var $obj = h5c3.Applet.create($data);
		}
		
		this._tracker.loaded++;
		this._tracker.loading--;
		
		if (typeof $obj === "object") {
			if (!$fromlocal) 
				h5c3.local.setAppFile($obj.header.name,$obj);
			else 
				if ($obj.header.name in this._history && (typeof this._history[$obj.header.name].src !== 'undefined')) 
					$obj.src = this._history[$obj.header.name].src;
				//if (this._history[$obj.header.name].src) $obj.src = this._history[$obj.header.name].src;
				
			this._tracker.fromConn++;
			this.scanHTML($obj.html);		
			this.scanAnchors($obj.html)
			$result = h5c3.r2wl.app.applets.add($obj.header.name,$obj)
		} else {
			//Remove Applet we just created. Remove from History as well. Display message
			this._tracker.failed++;
			delete this._history[$obj];
			this.remove($obj);
			_DBG_(["Unable to identify applet, discarding.",$data]);
			$result = false;
		}

		this.started = !this._checkAllDone();
		
		return $result;
	},
		
	onError:function(data) {
		return null	
	},
	
	onReady:function() {
		if (this.started) return;
		this.scanHTML();		
		this.scanAnchors();
		this.checkQue();
	}
});
/**
 *
 * @namespace h5c3.CloudApp
 * @class h5c3.CloudApp
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
window.h5c3.CloudApp = h5c3.Base.extend('h5c3.CloudApp', { 
	_CLASSNAME: 'CloudApp',
	_CLASSVERSION:'0.0.0'
}, {
	header: null,
	
    /**
     * @property {string} skin
     * @default null
	 * @memberof h5c3.CloudApp
     */
	skin: {
		fg:{ light: "#cccccc", normal: '#808080', dark: "#303030" },
		bg:{ light: "#aaaaaa", normal: "#404040", dark: "#000000" }
	},
	
	colorOverride:false,
	
    /**
	 * @public
	 * @method
	 * @memberof h5c3.CloudApp
	 * @desc
     * </p>
	 * Description of this method
	 * </p>
     */
    init: function ($app) {
        this._super();
		this.header = $app;
		this.prepare();
    },
	
	prepare:function() {
		this.colorOverride = CHK(h5c3.local.getGlobalCfg('colorOverride'),false);
		//Load Skin
		if (this.colorOverride)
			this.skin = CHK(h5c3.local.getGlobalCfg('mySkin'),this.skin);			
		else
			this.skin = CHK(h5c3.local.getAppCfg('skin'),this.skin);			
		
		this.applets = new h5c3.AppletFactory(h5c3.r2wl);				
		this.stylesheet = new h5c3.StyleSheet(this.header.style, h5c3.r2wl);		
		this.layout = new h5c3.Layout(this.header.layout, h5c3.r2wl);		
	},
	
	save:function() {
		h5c3.local.setGlobalCfg('colorOverride',this.colorOverride);
		h5c3.local.setAppCfg('skin',this.skin);
	},
	
	start:function() {
		this.stylesheet.start();
		this.layout.start();
		if (this.applets.onReady) this.applets.onReady();
		window.APP = this; ///Make a global shutcut, i know its messy but look at the rest of this crap LOL
	},

	createWindow:function($applet,$opts) {
		if (ISA($applet)==="applet") {
		}
		if (ISA($opts)!=='object') 
			$opts={id:'window',height:'17.14em',width:'22.85em',title:'Unamed Window',statusbar:'',body:'',color:'clr-dark'};
		var window = DOC.createElement('div');
		window.id=$opts.id;
		window.className = 'r2wl_window '+$opts.color;
		$html = '<div class="r2wl_window.r2wl_titleBar">\n';
		$html += '<div class="r2wl_title left"><span id="windowName">'+$title+'</span></div>\n';
		$html += '<div class="icons right">\n';
		$html += '<i class="icon icon-move uiButton"></i>\n';
		$html += '<i class="icon icon-collapse-alt uiButton"></i>\n';
		$html += '<i class="icon icon-expand-alt uiButton"></i>\n';
		$html += '</div>\n';
		$html += '</div>\n';
		$html += '<div id="windowBody" class="r2wl_body">'+$body+'</div>\n';
		$html += '<div class="r2wl_statusBar">\n';
		$html += '<div id="windowStatusBar">'+$status+'</div>\n';
		$html += '</div>\n';
		window.innerHTML=$html;
	},
	zoomIn:function($el) { 
		return this.stylesheet.zoom($el,1);
	},
	zoomOut:function($el) { 
		return this.stylesheet.zoom($el,0);
	},
	
	onReady:function() {}
});