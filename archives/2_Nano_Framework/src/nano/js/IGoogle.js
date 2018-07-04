
/**
 * Internal Google Class - Google Tracking & adSense 
 *
 * @module MWDL
 * @class  Google
 */
/**
 * Short Description
 *
 * @class I$Google
 * @extends I$Interface
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Interface',

	//What is the name of your new interface?
	'I$Google',
	
	/** @lends I$Interface */
	{		
		/** 
		 * This is an API so there can only be one instance.
		 *
		 * @property {number} maxTotalObjects
		 * @expose 
		 */
		maxTotalObjects:0		
	},
	/** @lends I$Interface.prototype */
	{
		/**
		 * This property is used to see if tracking is actually performed. It is used for debugging. If H5C3.devMode it true or location.protocol is "file" then this value is false.
		 *
		 * @property String $enabled 
		 * 
		 *  H5C3
		 */
		$enabled:false,
		$loaded:false,
		$analyticsLoaded:false,
		$adSenseLoaded:false,	
		$version:"",	
		$domain: null,
		$gaJsHost: null,
		$resizeTimer:null,
		
		/**
		 * Analytics and AdSense settings from Application Config
		 */
		config:{
			analytics:{
				trackingId:"",
				pageviews:true,
				clicks:true
			},
			ads:{
				clientId:"",
				ads:{}
			}
		},	
		
		/** @expose */
		parent:null,
		
		/**
		 * Initialization
		 *
		 * @constructor
		 */
		init: function(parent,cfg) {
			this['_super']();
			this['parent']=parent;
			this['config']=cfg;
			try {
				var _={};
				if (typeof cfg != "object") {
					this['debug']('No google configuration found in Application Config.');
					return
				} else {
					this['debug']("Preparing Google Analytics...");
					if (this['config']['analytics']['trackingid']==='') 
						this['warn']('You did not set your Google Unique ID in the config file.');
					else this['debug']('Using your Google Unique ID ' + this['config']['analytics']['trackingid']);
					this['enabled']=true;
				}
			} catch (e) {
				this['error'](e,_,Array.prototype.slice.call(arguments, 0));
			}
		},
		/**
		 * Main Google Command Function
		 *
		 * @method
		 */
		ga: function(i,s,o,g,r,a,m) {
			if (!this.$analyticsLoaded) return;
			window.ga(i,s,o,g,r,a,m);		
		},	
		
		push: function() {		
			if (this.$adSenseLoaded) {
				var _={};
				this['info']("Google Push.");
				try {
					(adsbygoogle = window.adsbygoogle || []).push({});
				} catch (e) {
					this['error'](e,_,Array.prototype.slice.call(arguments, 0));
				}
			} else {
				ads = $(".adsbygoogle").css('background','#333');
			}
		},
		
		connect: function () {
			if (!this.$analyticsLoaded) return;
				var _={};
			
				this['debug']("Google Track.");
			try {
				window.ga('_setAccount',this['config']['analytics']['trackingid']); 
				window.ga('_setDomainName',document.location.host);
				window.ga('_addIgnoredOrganic',document.location.host);
				window.ga('_trackPageview');
				
			} catch(e) {
				this['error'](e,_,Array.prototype.slice.call(arguments, 0));
			}
		},
		
		remove:function($fromResize) {
			if (!this.$adSenseLoaded) return;
			var $ads,$slots=gec('adsbygoogle');
			if ($slots.length>0) {
				for (i=0;i<$slots.length-1;i++) {
					$slots[i].style.display='none';
					$slots[i].style.width='initial';
					$slots[i].removeAttribute('data-adsbygoogle-status');
					$slots[i].removeAttribute('data-ad-slot');
					//$slots[i].innerHTML='';
				}
				
				if ($fromResize) setTimeout(this['parent'].google.insert(),1000);
			}
		},
		
		insert:function() {
			getAds=function(config,$theme){
				if (typeof config.ads[$theme]=='object') {
					return $.map(config.ads[$theme], function(value, index) {
						return [value];
					});			
				}
				else this['parent'].google.debug('You have no ad slots designated for '+$theme+' theme.');
			}

			try {
				//All local variables defined in object _
				var _={ads:0,slots:0,abg:M$.gec('adsbygoogle'),result:false};
				
				//Don't do this anymore
				//var $total,$ads,$slots,$abg=gec('adsbygoogle');
				
				_.slots=(this['vld'](_.abg))?_.abg:[];
				
				if (_.slots.length>0) {
					_.ads=getAds(this.config,this['config']['app']['theme']);
					
					//both of these lines are removed in production
					if (_.ads.length<_.slots.length) this['debug'](_.slots.length+' Ad slots where found and only '+_.ads.length+' defined. Plese define '+(_.ads.length-_.slots.length)+' more ads for '+this['parent'].app.header.theme+' theme.');
					else this['debug'](_.slots.length+' Ad slots where found and '+_.ads.length+' defined.');
										
					//this line removed in production
					this['debug']('Inserting '+_.total+' Ads.');
					
					for (i=0;i<_.ads.length;i++) {
						_.slots[i].style.display='block';
						M$['esa'](_.slots[i],'data-ad-client',this.config.ads.clientId);
						M$['esa'](_.slots[i],'data-ad-slot',_.ads[i]);
						M$['esa'](_.slots[i],'data-ad-format','auto');
						this.push();
					}
					this.$adSenseLoaded=false;
					_.result=true;
				} 
				//this line removed in production		
				else {
					this['debug']('No Ad slots where found.');
					this['enabled']=false;
				}
			} catch (e) {
				this['error'](e,_,Array.prototype.slice.call(arguments, 0));
				this['enabled']=false;
				_.result=false;
			}
			return _.result;
		},
		
		delay:function() {
			//Disable display any more ads for 30 seconds to protect google interests
			this.$adSenseLoaded=false;
			this.resizeTimer=setTimeout(function(){this['parent'].google.$adSenseLoaded=true;window.clearTimeout(this['parent'].google.resizeTimer)},30000);			
		},
		
		load:function() {
			if (this['enabled']) {
				if (this.config.analytics) {
					this['parent']['addFile']('analytics.js','google','vendor');	
					this['debug']('Google Analytics API added to que.');
				}	
				if (this.config.ads) {
					this['parent']['addFile']('adsbygoogle.js','google','vendor');
					this['debug']('Google AdSense API added to que.');
				}
			}
		},
		
		check:function() {
			this.$analyticsLoaded=(M$['gei']('analytics.js')!=null)?true:false;
			this.$adSenseLoaded=(M$['gei']('adsbygoogle.js')!=null)?true:false;
		},
		
		loaded:function() {
			if (this['enabled']) {
				this.check();
				if (this.$analyticsLoaded==true) this.connect();
				if (this.$adSenseLoaded==true) this.insert();
			} 
			else {if (!this['enabled']) this['debug']('Google communication is NOT enabled.');}
		},
		
		onResize:function(){
			//Hide ads
			//this.remove(true);
			//wait a short time (after size change) then redisplay ads
			//setTimeout(this['parent'].google.insert(),250);	
		}
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
