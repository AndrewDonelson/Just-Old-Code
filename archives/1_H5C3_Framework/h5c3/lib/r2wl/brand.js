/**
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

});