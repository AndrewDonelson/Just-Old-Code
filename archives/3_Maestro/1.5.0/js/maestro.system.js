/** 
 *  Maestro System Interface
 *
 * @file maestro.db.js (#7) in combine sequence.
 * FINALIZED
 */

/**
 * Document Mode [Default] required wrapper & tail. loads nano fw, terminates.
 * No Common: cPanel
 * @class I$System
 * @extends I$Db
 * @memberof Maestro
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Db',

	//What is the name of your new interface?
	'I$System',
	
	/** @lends I$Db */
	{		
		toString:function(){return 'I$System Class'},//=-=|DEBUG|=-=//
		/** 
		 * This is an API so there can only be one instance.
		 *
		 * @property {number} maxTotalObjects
		 * @expose 
		 */
		maxTotalObjects:1,
		
		/** @expose */
		appMode:'document',
		
		/** @expose */
		devMode:false,

		/** @expose */
		nf:false
		
	},
	/** @lends I$Db.prototype */
	{		
		toString:function(){return 'I$System Object';},//=-=|DEBUG|=-=//
		/**
		 * Interface Initialization method
		 * @constructor init
		 * @expose
		 * @memberof Maestro
		 */
		init:function ()
		{
			this['_super']();
		},

		/**
		 * checks to see if the config is present and sets up pure cloudapp mode
		 *
		 * @method
		 * @expose
		 */				
		getConfig:function() {
			//Pure CloudApp?
			var fn=location.origin+location.pathname+'/index.php';
			//var ext = this['gex'](fn) || 'php';
			//if (ext=="php") {
				if (D$['all'][0]['dataset']['config']) {
					//Embeded Config - Pure Cloud App. Compiled or not?
					this['config']=this['dec'](D$['all'][0]['dataset']['config']);
				} else if (this['gei']('config')) {
					this['config']=JSON.parse(this['gei']('config').text);
				}
				
				if (typeof this['config']=="object")
					this['Class']['appMode'] = 'cloudapp';
			//}
		},
		
		/**
		 * Prepare the interfaces object before init is called. Excellent place
		 * to do property and method export and other preparations before init()
		 * is called.
		 * @method setup
		 * @expose
		 * @this {I$System}
		 * @memberof Maestro
		 */
		setup:function(){
			this['_super']();
			this['Class']['devMode'] =(this['debug'])?1:0;
			
			this['getConfig']();			
		},
		
		/**
		 * Initialize Maestro. Creates dynamic media queries, combines with
		 * core styling and embeds in the document using a style tag.
		 * Verified fully functional
		 * @method dmq
		 * @private
		 * @param {object} $p		null - not needed
		 * @memberof Maestro
		 * @expose
		 * @this {i$System}
		 */
		dmq : function ($p) {

			/** create dynamic media queries
			 * @method cmq
			 * @param {object}	$p
			 * @private
			 * @memberof dmq
			 */
			function cmq($p,$t) {
				$p.a = "";
				$p.a += $p.b[0][0].replace($p.b[5][0], '18');
				for (i = 0; i < 13; i++)
					$p.a += $t['sra'](
						$p.b[5][1],
						$p.b[1][i],
						$p.b[0][1]
					);
				for (i = 0; i < 5; i++)
					$p.a += $t['sra'](
						$p.b[5][3],
						$p.b[3][i],
						$t['sra'](
							$p.b[5][4],
							$p.b[4][i],
							$t['sra'](
								$p.b[5][2],
								$p.b[2][i],
								$p.b[0][2]
							)
						)
					);
				return $p.a;
			}

			a = b = c = 0;
			c = cmq({
					a : '',
					b : this['db'][5]
				},this);
				
			/* ==|== Insert Maestro (Nano Core CSS)========================== */
			a = D$.createElement('style');
			a.id = "Maestro";
			a.rel = this['db'][3][4];
			a.type = this['db'][3][3];
			a.innerText = (c + this['db'][4][0]);
			//insert in head
			if (c = this['get'](this['db'][0][12]))
				c[0].appendChild(a);

			//if Pure CloudApp mode then create body
			if (this['isCloudApp']()) {
				c=this['aet'](D$.body, this['db'][0][20], this['db'][0][40]);//Create Wrapper
				this['cls'](this['db'][0][40],'set','opacity0');
				c=this['aea'](c, this['db'][0][20], this['db'][0][13]);//Create Tail
				this['cls'](this['db'][0][13],'set','mdw dpp');
				c['style']['visibility']="hidden";
				c['style']['display']="none";				
			}
			
			//Create Maestro Common Container
			this['aea'](this['db'][0][13], this['db'][0][20], this['db'][0][23]);

			/* ==|== Create mLoader ======================================== */
			$tmp=this['aet'](this['db'][0][23], this['db'][0][20],this['db'][0][24]);
			//Add Class for mLoader
			this.setTheme();
			//Create Ul (Animated notes)
			$lUl = this['aet'](this['db'][0][24], this['db'][0][21], this['db'][0][25]);
			//Create LI (Animated Maestro Text)
			$tmp = this['db'][4][1];
			for (var i = 0; i < $tmp.length; i++)
				this['aet']($lUl, this['db'][0][22], false, (this['db'][0][17] + $tmp[i][0] + this['db'][0][18] + $tmp[i][1] + this['db'][0][19]));
			
			//cleanup
			delete $tmp;
			delete $lUl;
		},
		
		/**
		 * @method sys		
		 * @expose 
	     * @this {i$System}
		 */
		sys:function(){
			//Initialize HTML:data-role attribute
			var $tmp=this['cnt'](this['db'][0][45]);
						
			//=-=|Set appMode based off HTML data-role attribute|=-=//
			if (!this['isCloudApp']()) {
			//if (this['Class']['appMode']!='cloudapp') {
				if ($tmp['dataset']['role']==this['db'][0][46])
					this['Class']['appMode']=this['db'][0][46];
				else
					this['Class']['appMode']=this['db'][0][47];
			} 
			if (this['isCloudApp']()) {
				 this['expose']({
					 'ple'	: function(a) {return this['pld']()},
					 'pld'	: function(a) {return this['ple']()}
				 });
			
				this['dmq']({});
				this['off']('cpanel');
			} else {
				this['pld']();
			}
				
			if (!this['config']) {
				//Execute on Load
				if (location.protocol != "file:") {
					this['ldf']({
						x : 'script',
						y : 'nano',
						z : '{VERPATH}',
						w : '{VERTYPE}'
					});
					this['ldf']({
						x : 'link',
						y : 'nano',
						z : '{VERPATH}',
						w : '{VERTYPE}'
					});
				}
			}
		},
		
		
		/** Nano framework/module Loader - Loaded the Javascript and Stylesheet
		 * Thats everything from NanoFW, Bootstrap, Font-Awesome, jQuery and Modernizr
		 *
		 * Verified fully functional
		 * @method ldf
		 * @expose
		 * @private
		 * @param {object} $p
		 * @memberof Maestro
		 */
		ldf : function ($p) {

			$p.a = $p.b = $p.c = 0;
			this['devMode']=($p.z===this['db'][1][1])?0:1;
			//Load Nano Framework
			//$p.a = D$.createElement($p.x);
			id="nanoFW";
			$p.z = this['chk']($p.z, '');
			$p.c = $p.z + '/' + $p.y;
			$p.w = this['chk']($p.w, this['db'][1][2]);

			try {
				if ($p.x == this['db'][0][0]) {
					this['lds'](this['db'][0][0],id,($p.c + $p.w + this['db'][1][3]),true,false,this['onNanoLoaded'].bind(this));				
				} else {
					this['lds'](this['db'][0][1],id,($p.c + $p.w + this['db'][1][4]),false);
				}
			} catch (e) {
				M$['err'](this,e,{},Array.prototype.slice.call(arguments, 0));
			}		
		},
		/** @expose */
		onNanoLoaded:function(){
			if(M$['isCloudApp']())
				try {
					var count=0;
					if (typeof P$['interfaces']['Store']['I$NLDR']==="undefined")
						setTimeout(this['onNanoLoaded'].bind(this),2000);
					else {
						nldr = create('I$NLDR');
					}
				} catch (e) {
					M$['err'](this,e,{},Array.prototype.slice.call(arguments, 0));
				}
			else
				M$['pld']();						
		},
		/**
		 * This is triggered by the core after this interface is completely
		 * initialized.
		 *
		 * @event I$Interface#onReady
		 * @expose
		 */
		onReady:function(){
			this['sys']();
		},
		
		/**
		 * Check for the HTML data attribute theme [light|neutral|dark].
		 * defaults to light.
		 *
		 * Theme
		 * - Light	
		 * 		Maestro Notes 		ul#mView h1,h3{color:#222}
		 * 		Bubbles				ul#mView li {background-color: #888}
		 * 		Maestro background	#mLoader {background:#eee}
		 * - Neutral	
		 * 		Maestro Notes 		ul#mView h1,h3{color:#aaa}
		 * 		Bubbles				ul#mView li {background-color: #888}
		 * 		Maestro background	#mLoader {background:#666}
		 * - Dark	
		 * 		Maestro Notes 		ul#mView h1,h3{color:#eee}
		 * 		Bubbles				ul#mView li {background-color: #888}
		 * 		Maestro background	#mLoader {background:#222}
		 */
		setTheme:function() {
			var t='theme';
			$el=this['cnt'](this['db'][0][45]);
			$el.dataset[t]=(typeof $el.dataset[t]==this['db'][0][7])?this['db'][0][48]:$el.dataset[t];
			switch ($el.dataset[t].toLowerCase()) {	
				case this['db'][0][49]:this['cnt'](this['db'][0][24]).style.background='#666';break;
				case this['db'][0][50]:this['cnt'](this['db'][0][24]).style.background='#222';break;
				default:this['cnt'](this['db'][0][24]).style.background='#eee';break;
			}
		},
				
		/**
		 * returns true if currently in Application Mode
		 * 
		 * @method isAppMode
		 * @expose
		 * @this {I$System}
		 * @returns {boolean}	App Mode
		 * @memberof Maestro
		 */
		isCloudApp:function(){return (this['Class']['appMode']===this['db'][0][47])?false:true},
		/**
		 * returns current Application Developer Mode
		 * 
		 * @method isDevMode
		 * @expose
		 * @this {I$System}
		 * @returns {boolean}	Developer Mode
		 * @memberof Maestro
		 */
		isDevMode:function(){return (this['Class']['devMode'])}
	},
	{
		/** @augments I$NAME */
		/*
		someInterfaceName:I$SomeInterface,
		...
		someInterfaceName:I$SomeInterface
		*/
	},
	[
		/** @export Member */
		/*
		someMethod:I$InterfaceMethod,
		...
		someMethod:I$InterfaceMethod
		*/
	]
);

