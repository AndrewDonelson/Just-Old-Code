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