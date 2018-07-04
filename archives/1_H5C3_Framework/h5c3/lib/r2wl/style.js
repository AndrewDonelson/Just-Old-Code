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
