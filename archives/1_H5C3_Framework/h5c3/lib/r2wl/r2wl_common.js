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
	
});