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
	
});