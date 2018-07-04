// ==ClosureCompiler==
// @compilation_level ADVANCED_OPTIMIZATIONS
// @output_file_name maestro.min.js
// @warning_level VERBOSE
// @extern Maestro
// @extern M$
// ==/ClosureCompiler==

/**
 * @class Maestro
 * @typedef Maestro
 */
(function(cfg) {
	/**
	 * Shorthand version of window
	 *
	 * @expose
	 * @property W$
	 * @type {window}
	 * @memberof window
	 */			
	window['W$']=window;

	/**
	 * Shorthand access to window.document
	 *
	 * @expose
	 * @property D$
	 * @type {document}
	 * @memberof window
	 */			
	W$['D$']=W$.document;

	/**
	 * Shorthand access to window.document.head[]
	 *
	 * @expose
	 * @property H$
	 * @type {DOMElement}
	 * @memberof window
	 */			
	W$['H$']=D$.getElementsByTagName("head")[0];

	/**
	 * Shorthand access to window.document.tail[]
	 *
	 * @expose
	 * @property T$
	 * @type {DOMElement}
	 * @memberof window
	 */			
	W$['T$']=D$.getElementById("tail");

	/**
	 * Shorthand access to window.document.body[]
	 *
	 * @expose
	 * @property B$
	 * @type {DOMElement}
	 * @memberof window
	 */			
	W$['B$']=D$.getElementsByTagName("body")[0];

	/**
	 * Shorthand access to window.document.stylesheets
	 *
	 * @expose
	 * @property C$
	 * @type {DOMEElement}
	 * @memberof window
	 */			
	W$['C$']=D$.styleSheets;

	/**
	 * Shorthand access to window.document.scripts
	 *
	 * @expose
	 * @property S$
	 * @type {DOMElement}
	 * @memberof window
	 */			
	W$['S$']=D$.scripts;

	/**
	 * Shorthand version of Maestro
	 *
	 * @global
	 * @expose
	 * @property Maestro
	 * @type {Object}
	 * @memberof window
	 */			
	W$['M$']={};

	function log(msg,type){																	/**DEBUG**/				
		if (!console||!console.log) return;													/**DEBUG**/
		if (!type)type='info';
		console.log(type.toUpperCase()+':'+msg);											/**DEBUG**/
	}																						/**DEBUG**/
	/** 
	 * Extend Javascript function to have access to Maestro Object
	 *
	 * @example
	 *     Maestro
	 *     > Object {fn: Object, Interface: Object, Sys: Object, MVC: Object}
	 *     > Interface: Object
	 *     > MVC: Object
	 *     > Sys: Object
	 *     > fn: Object
	 *     > __proto__: Object
	 *
	 * @returns {Object} Maestro object
	 * @memberof window
	 * @expose
	 */
	(function(){return void 0!=W$.M$?W$.M$:null});

	Function.prototype.bind = function(scope) {
	  var _fn = this;
	  
	  return function() {
		return _fn.apply(scope, arguments);
	  }
	};	


	window.onload=function() {
		if (M$._I.domLoaded) return;
		M$._I.domLoaded=true;
		appts.onload=performance.now();
		M$['addEvents']();
		M$['onResizeComplete']();

		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','','ga');

		ga('create', 'UA-35732532-1', 'i2tmlabs.com');
		ga('send', 'pageview');
		
		W$['M$']=W$['M$'];						
	}; 

	
	/**
	<ul>
	<li>Block Element Auto Scale (scales with img-window proportion, keeping aspect ratio)</li>
	<li>Row Cell Auto Height (Allow you to make all or some cells in a row the same height)</li>
	<li>New HTML Element (m-nano) provides for drop in components with single line (Jumbotron, Login, headers, ect)</li>
	<li>Integrated Smart Fullscreen with auto HD detection and event trigger</li>
	<li></li>
	<li></li>
	</ul>
	* @expose
	*/
	var Maestro = {
		/**
		 * Internal tracking
		 *
		 * @expose
		 * @property _I
		 * @type {Object|null}
		 * @memberof Maestro
		 */			
		_I:{w:2000},
		/**
		 * Software Version
		 *
		 * @expose
		 * @property VERSION
		 * @type {String|null}
		 * @memberof Maestro
		 */			
		VERSION:'1.7.0',

		/**
		 * Base folder for current app
		 *
		 * @expose
		 * @property APP_BASE
		 * @type {String|null}
		 * @memberof Maestro
		 */			
		APP_BASE:'',
		/**
		 * The element in which applets are inserted when received
		 *
		 * @expose
		 * @property VIEWPORT
		 * @type {String|null}
		 * @memberof Maestro
		 */			
		VIEWPORT: 'wrapper',
		/**
		 * Used by internal resizer to make sure use is finished before resizing.
		 *
		 * @property resizeTimer
		 * @type {number|0}
		 * @memberof Maestro
		 */			
		resizeTimer:0,
		
		/**
		 * Number of files being loaded, CSS, JavaScript and Applets
		 */
		LOADING:0,
		
		/**
		 * used to add an event to an object.
		 *
		 * @param {Object|null} obj
		 * @param {String|null} type
		 * @param {Boolean} fn
		 * @memberof Maestro
		 * @expose
		 */			
		addEvent:    function(obj, type, fn) { 
			if (obj)
				obj.addEventListener(type, fn, false)
		},

		/**
		 * used to remove an event from an object.
		 *
		 * @param {Object} obj
		 * @param {String} type
		 * @param {Boolean} fn
		 * @memberof Maestro
		 * @expose
		 */			
		removeEvent: function(obj, type, fn) { obj.removeEventListener(type, fn, false); },

		/**
		 * used internally to bind maestro events on startup.
		 *
		 * @expose
		 * @memberof Maestro
		 */			
		addEvents: function() {

			M$.addEvent(W$,'resize',  this.resize.bind(this));
			M$.addEvent(M$['gei'](this.VIEWPORT), 'onchange',  this.viewchanged.bind(this));
			M$.loadAllScripts();
			
		},

		/**
		 * called when a the viewport has changed, usually means a applet what loaded.
		 *
		 * @private
		 * @memberof Maestro
		 */			
		viewchanged:function() {
			this.autoHeight();
			//this.insertAds();
		},
	
		/**
		 * called the tail (3rd party api) when its loaded.
		 *
		 * @expose
		 * @memberof Maestro
		 */			
		on3PL:function(){
			appts.on3PL=performance.now();
			M$.loadAllScripts(M$._I.scripts);
			
			//xhr : function ($url, $onLoad, $onError, $method, $data, $trace) {
			if (M$._I.applet)
				M$.xhr(M$._I.applet,M$.VIEWPORT)
			else {
				M$._I.applet=M$.APP_BASE+'/applets/applet.main.html';
				M$.xhr(M$._I.applet,M$.VIEWPORT)
			}
		},
		
		/**
		 * called by app or document to configure and start maestro
		 *
		 * @expose
		 * @param {String} applet	URL to to an applet to start with
		 * @param {String} target	destination container element for applets
		 * @param {Array} scripts	array of scripts to be loaded.
		 * @memberof Maestro
		 */			
		start:function(applet,target,scripts) {
			appts.maestrostart=performance.now();
			try{																							/**DEBUG**/
				this.APP_BASE=this.gei('base').baseURI;
			} catch (e) {																					/**DEBUG**/
				log('error','Setting APP_BASE, Unauthorized use of API possible.');							/**DEBUG**/
			}																								/**DEBUG**/
			if(location.protocol=='file:') { this.alert('error','You cannot run document locally. Please access through web server.');return false}
			if (location.hostname=='127.0.0.1'||location.hostname=='localhost') {
				this.SERVER=location.origin+'/i2tmlabs.com/';				
				this.PATH = {
					cdn:this.SERVER+'cdn/framework/',
					stc:this.SERVER+'/cdn/static/',
					shr:this.SERVER+'/cdn/static/shared/',
					app:this.SERVER+'/apps/i2tm/shared/'
				};
			} else {
				this.PATH = {
					cdn:'http://cdn.i2tmlabs.com/framework/',
					stc:'http://static.i2tmlabs.com/',
					shr:'http://static.i2tmlabs.com/shared/',
					app:'http://apps.i2tmlabs.com/'
				};
			}
			
			this.lds('link','nano-css', this.PATH.cdn+'css/production.css', 'first',false,this.contentLoaded, 
				function(){
					log('Production.css error')														/**DEBUG**/
				});
			this.lds('js','nano-js', this.PATH.cdn+'js/production_tail.js', 'last',true,this.contentLoaded, 
				function(){
					log('Production_tail.js error')													/**DEBUG**/
				});
			
			if (typeof target==='string') {
				target=this.gei(target);
				
				if (typeof target==='object')
					this.VIEWPORT=target;
			}
			this._I.scripts=scripts;
			this._I.applet=applet;
		},
		
		/**
		 * called internally to create to load a script and attach to DOM.
		 *
		 * @param {Array} files	all scripts to be loaded.
		 * @private
		 * @memberof Maestro
		 */			
		loadAllScripts:function(files) {
			
			//TODO: total number of files loading, update progress
			//load up our production css and stuff it in the head [bootstrap, font-awesome & nano framework]
			var tail=document.getElementById('tail');
			if(tail&&tail.tagName=="DIV"){
				if(files&&files.constructor.name==="Array"){
					var fn;
					do{
						fn=files.shift();
						this.lds(this.gex(fn),this.gfn(fn), fn, 'last',false,this.contentLoaded, 
							function(){
								log(fn+' Error.')														/**DEBUG**/
							});
					}while(files.length>0);					
				}
			}
		},
		
		/**
		 * @expose
		 * @memberof Maestro
		 */			
		wait:function(){
			//if (typeof window.ga!='function') return;
			var now=performance.now();
		if (now<M$._I.w){
			var a=M$.gei('position'); a.style.width=500-Math.floor(M$._I.w/now)+"%";
			M$._I.t=setTimeout(M$.wait,500);
		  } else if (M$['LOADING']<1) {
				clearTimeout(M$._I.t);
				if (!M$._I.rc) {
					M$._I.rc = true;
					//M$['addEvent'](B$,'change',(adsbygoogle = window.adsbygoogle || []).push({}));				

					if (W$['MaestroReady']) 
						W$['MaestroReady']();

					M$['cls'](M$['VIEWPORT'],"set","opacity100"); /* ON */
					M$['cls']("splash","set","vanish"); /* OFF */
				}
		  }
		},
		
		/**
		 * @expose
		 * @memberof Maestro
		 */			
		contentLoaded:function() {
			var fn=(!this.src)?this.href:this.src;
			appts[M$['gfn'](fn)+' loaded']=performance.now();	
			log(M$['gfn'](fn)+' loaded.');														/**DEBUG**/
			M$['LOADING']--;
			M$['wait']();
		},
		
		/**
		 * called internally to embed Google Ads
		 *
		 * @private
		 * @memberof Maestro
		 */			
		insertAds:function() {
			var cell=B$.getElementsByClassName("googleAd");
			//<ins id="adRight" class="adsbygoogle hidden-xs" style="display:inline-block;width:auto;height:auto" data-ad-client="ca-pub-7431399643348196" data-ad-slot="5778036465"></ins>
			//(adsbygoogle = window.adsbygoogle || []).push({});
		},

		/**
		 * called internally to handle Bootstrap container collapse
		 *
		 * @private
		 * @memberof Maestro
		 */			
		mobileMenuCollapse:function() {
			$('#bs-example-navbar-collapse-1').on('show.bs.collapse', function () {
				$('#bs-example-navbar-collapse-1').append($('#sidebar').html());
				$('#bs-example-navbar-collapse-1 ul').last().removeClass('nav-pills nav-stacked').addClass('navbar navbar-nav');
			});
				$('#bs-example-navbar-collapse-1').on('hidden.bs.collapse', function () {
				$('#bs-example-navbar-collapse-1 ul:last-child').remove();
			});
			$(window).on('resize', function () {
			  if (window.innerWidth > 768) {$('#bs-example-navbar-collapse-1').collapse('hide');}
			});
		},
		
		/**
		 * called internally on resize to auto scale any element with a class of autoScale
		 *
		 * @expose
		 * @memberof Maestro
		 */			
		autoScale:function() {
			 /**
			  * Conserve aspect ratio of the orignal region. Useful when shrinking/enlarging
			  * images to fit into a certain area.
			  *
			  * @param {Number} srcWidth Source area width
			  * @param {Number} srcHeight Source area height
			  * @param {Number} maxWidth Fittable area maximum available width
			  * @param {Number} maxHeight Fittable area maximum available height
			  * @return {Object} { width, heigth }
			  */
			function calcAspectRatio(srcWidth, srcHeight, maxWidth, maxHeight) {
				var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
				return { width: srcWidth*ratio, height: srcHeight*ratio };
			}	
			var src,dim,el=B$.getElementsByClassName("autoscale");
			for(var r=0;r<el.length;r++) {
				if (el[r].dataset['desired']) {
					src=el[r].dataset['desired'].split(',');
					dim=calcAspectRatio(window.outerWidth,window.outerHeight,src[0],src[1]);
					
					el[r].style.width=dim.width+'px';
					el[r].style.height=dim.height+'px';		
				}
			}
		},
		
		/**
		 * called internally on resize to automatically make all cells in a row the same height
		 *
		 * @expose
		 * @memberof Maestro
		 */			
		autoHeight:function() {
			var maxHeight=0,
				rows=[];
			
			rows=rows.concat(B$.getElementsByClassName("row autoheight"));
			rows=rows.concat(B$.getElementsByClassName("row-fluid autoheight"));
			
			for(var r=0;r<rows.length;r++) {
				
				if(rows[r].length>0){
					for (var k=0;k<rows[r].length;k++) {
						//=-=|Find Max-Height of Cells|=-=//
						for (var i=0;i<rows[r][k].children.length;i++)
							if (rows[r][k].children[i].clientHeight>maxHeight) maxHeight=rows[r][k].children[i].clientHeight;
							
						for (var i=0;i<rows[r][k].children.length;i++)
							rows[r][k].children[i].style.height=maxHeight;
					}
				}
			}
		},
		
		/**
		 * maestro internal resize function
		 *
		 * @private
		 * @memberof Maestro
		 */			
		resize: function() {
			clearTimeout(this.resizeTimer);
			this.resizeTimer = setTimeout(this.onResizeComplete, 250);
		},
		
		/**
		 * called internally to maestro resize function
		 *
		 * @expose
		 * @memberof Maestro
		 */			
		onResizeComplete: function() {
			M$['autoHeight']();  //Make sure all cells with classname are same height in row
			M$['autoScale'](); //any element with autoScale Class will keep aspect ratio and screen<-->image proportions
		},

		/**
		 * used to lookup and access common data within Maestro.
		 *
		 * @method
		 * @expose
		 * @memberof Maestro
		 */
		getDB:function (idx,replace) {
			var result,	args=[], MAP={}, HTML=[];

			//=-=|Header=>[titleBig,titleSmall]|=-=//
			HTML[0]='<div class="headerDIV greenBG"><span class="headerBigGold">VAR0</span><span class="headerSmall">VAR1</span></div>';
			//=-=|Paragraph->[content]|=-=//
			HTML[1]='<p class="greenBG">VAR0</p>';
			//=-=|Jumbotron->[title,content]|=-=//
			HTML[2]='<div class="jumbotron greenBG"><h1>VAR0</h1><p>VAR1</p></div>';
			HTML[3]='framework/';		//css,js,etc
			HTML[4]='static/';			//add {PUBLISHER}/{APPNAME}/
			//=-=|Maestro Animated Logo|=-=//
			HTML[17] = '<h1>&#98';
			HTML[18] = '</h1><h3>';
			HTML[19] = '</h3>';
			HTML[20] = 'div';
			HTML[21] = 'ul';
			HTML[22] = 'li';
			HTML[23] = 'common';
			HTML[24] = 'splash';
			HTML[25] = 'Application&nbsp;<small class="headerSmall">';
			//['Component']['capthover']
			HTML[50] = '<style>.CaptHover{background-color:#ccc;padding:0;position:relative;overflow:hidden;height:200px}.CaptHover:hover .caption{opacity:1;transform:translateY(-150px);-webkit-transform:translateY(-150px);-moz-transform:translateY(-150px);-ms-transform:translateY(-150px);-o-transform:translateY(-150px)}.CaptHover img{z-index:4;padding:20px;margin:0 auto}.CaptHover h3{border-top:2px solid #fff;border-bottom:2px solid #fff;padding:10px}.CaptHover .caption{position:absolute;top:150px;-webkit-transition:all .3s ease-in-out;-moz-transition:all .3s ease-in-out;-o-transition:all .3s ease-in-out;-ms-transition:all .3s ease-in-out;transition:all .3s ease-in-out;width:100%}.CaptHover .blur{background-color:rgba(10,81,117,.75);height:300px;z-index:5;position:absolute;width:100%}.CaptHover .caption-text{z-index:10;color:#fff;position:absolute;height:300px;text-align:center;top:-20px;width:100%}</style><div class="CaptHover"><p style="text-align:center;margin-top:20px"><img src="{IMG:URL}" class="img-responsive" /></p><div class="caption"><div class="blur"></div><div class="caption-text"><h3>{TITLE}</h3><p>{DESC}</p><a href="{URL}" target="{TARGET}">{LABEL}</span></a></div></div></div>';
			function replaceAll(str,mapObj){
				var re = new RegExp(Object.keys(mapObj).join("|"),"gi");

				return str.replace(re, function(matched){
					return mapObj[matched.toLowerCase()];
				});
			}	
			
			if (HTML[idx]) {
				result=HTML[idx];
				if (!replace) return result;
				
				//If we have arguments to replace build map
				if (arguments) {
					args=Array.prototype.slice.call(arguments, 0);
					idx=args.shift();
					if (args.length>0) {
						var propName;
						for (var i=0;i<args.length;i++) {
							propName='VAR'+i;
							MAP[propName]=args[i];
						}
					}
				}
				//Ok apply map (if needed) and return string
				return replaceAll(result,MAP);
			}
		},
		
		/**
		 * I have no idea what this is doing, Ill look into to again later!
		 * @method
		 * @expose
		 * @this {M$}
		 */
		component:function (parent,child) {
			var el = this['gei'](parent);
			if (el) {el.appendChild(child)}
		}, //End feature()

		/**
		 * Component: header
		 * @method
		 * @expose
		 * @this {M$}
		 */
		header:function(parent,text) {
			var p=(typeof parent=='object')?parent:this['gei'](parent);
			if (typeof p=='object') {
				var res = text.split(" ");
				if (res.length && res.length>1) {
					res1 = res.slice(0, res.length/2);
					res2 = res.slice(res.length/2, res.length);
					var out='<div class="page-header"><h1>'+res1.join(" ")+'<small>'+res2.join(" ")+'</small></h1></div>';
					parent.innerHTML=out+parent.innerHTML;
				}
			}
		
		},
		
		/**
		 * used to toggle fullscreen mode
		 *
		 * @method
		 * @expose
		 * @memberof Maestro
		 */
		toggleFullScreen:function (el) {
			//
			
			if ((D$.fullScreenElement && D$.fullScreenElement !== null) || (!D$.mozFullScreen && !D$.webkitIsFullScreen)) {
				if (D$.documentElement.requestFullScreen) {  
					D$.documentElement.requestFullScreen();  
				} else if (D$.documentElement.mozRequestFullScreen) {  
					D$.documentElement.mozRequestFullScreen();  
				} else if (D$.documentElement.webkitRequestFullScreen) {  
					D$.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
				}
				if (el.attributes[2]) {
					el.attributes[2].value='glyphicon glyphicon-remove';
					el.attributes[6].value='Cancel fullscreen'
				}
		  } else { 			
				if (D$.cancelFullScreen) {  
					D$.cancelFullScreen();  
				} else if (D$.mozCancelFullScreen) {  
					D$.mozCancelFullScreen();  
				} else if (D$.webkitCancelFullScreen) {  
					D$.webkitCancelFullScreen();  
				}  
				if (el.attributes[2]) {
					el.attributes[2].value='glyphicon glyphicon-fullscreen';
					el.attributes[6].value='Enter Fullscreen'
				}
			
			}  
		},
		
		/**
		 * Called to force document to update itself
		 * @method redraw
		 * @return 
		 * @expose
		 * @memberof Maestro
		 */
		redraw:function() {
			B$.style.display='none';
			B$.offsetHeight=B$.offsetHeight;
			B$.style.display='block';	
		},
		
		/**
		 * A standard i2tm Labs Feature component
		 *
		 * - options.titleBig	title to display, Big Gold part
		 * - options.titleSmall	title to display, Small Orange part
		 * - options.content	content to display
		 * - options.linkHref	the uri for a link (optional)
		 * - options.linkName	title of button
		 * - options.heightGrp	a group of container elements that will have height monitored and all elements with have same maximum height.
		 *
		 * CSS Classes: 
		 * - i2tm: headerDIV greenBG headerBigGold headerSmall btn-i2tm
		 * - Bootstrap: btn
		 *
		 * @method
		 * @param {Element} Target container element
		 * @param {object} options for feature 
		 * @this {M$}
		 * @expose
		 */
		feature:function (parent,options) {
			var nel=D$.createElement('div');
				nel.innerHTML='<div class="headerDIV greenBG"><span class="headerBigGold">'+options.titleBig+'</span><span class="headerSmall">'+options.titleSmall+'</span></div>';
				nel.innerHTML+='<p class="greenBG">'+options.content+'</p>';
				if (options.linkHref&&options.linkHref!='')
					nel.innerHTML+='<p><a class="btn btn-i2tm" href="'+options.linkHref+'" role="button">'+options.linkName+'</a></p>';	
			this['component'](parent,nel);
		}, //End feature()

		/**
		 * a standard i2tm Labs Jumbotron component
		 *
		 * - options.title		title to display
		 * - options.content	content to display
		 *
		 * CSS Classes: 
		 * - i2tm: greenBG
		 * - Bootstrap: jumbotron
		 *
		 * @method
		 * @param {Element} Target container element
		 * @param {object} options for feature 
		 * @this {M$}
		 * @expose
		 */
		jumbotron:function (parent,options) {
			var nel=D$.createElement('div');
				//nel.innerHTML='<div class="jumbotron greenBG"><h1>'+options.title+'</h1><p>'+options.content+'</p></div>';
				nel.innerHTML='<div class="jumbotron greenBG"><h1>'+options.title+'</h1><p>'+options.content+'</p></div>';
			this['component'](parent,nel);
		},

		/**
		 * @method
		 * @this {M$}
		 * @expose
		 */
		article:function (parent,options) {
			var nel=D$.createElement('div');
				nel.innerHTML='<div class="page-header">';
				nel.innerHTML=this['getDB'](0,'Article','header','image_src','content paragraph1','content paragraph2'); //HEADER
				//</div>
				//<img id="logo" class="img-responsive" src="img/logo-i2tmlabs.png">
				//<p>i2tm Labs started as Donelson Entertainment back in 1995 and the owner Andrew Donelson has been programming computers since 1985 when he started with a top of the line Commodore 64. Primarily focusing on ANSI C or C++ and the MS-DOS / Windows Platforms he has developed everything from an Operating system, PCDesk a Windows 3.1 competitor to Games such as Epic Online, a short lived Sci-Fi strategy MMOG. In 1992 he was hired by Net-Connect, Ltd to create software to handle &amp; track customers connecting via modems to the new Internet Service Provider for billing purposes and was also tasked to create the ISP's official website in HTML 1.</p>
				//<p>Since then he has contacted with companies such as GoDaddy, i4Vegas, Hotels.com and many more to create new or upgrade content. In mid 2012 he moved completely to Web Development using the upcoming release of HTML5/CSS3/JavaScript. He started the H5C3 Framework which was initially going to be solely for web gaming but it has developed into much more and is getting close to public release but is already being used in i2tm Labs products and services.</p>
			//this['component'](parent,nel);
		},

		/**
		 * Called to launch an app or game. Uses google analytics
		 * @method
		 * @this {M$}
		 * @expose
		 */
		play:function(app,url){
				if (ga&&app) ga('send', 'event', 'button', 'click', app);
				if (url) location.href=url;
			//if (app=='kuiperassult') {
			//	ga('send', 'event', 'button', 'click', app);
			//	location.href="http://apps.i2tmlabs.com/i2tm/kuiperassult/";
			//}
		},
		
		/**
		 * Set, add, remove or replace an elements classes. the second class $c2
		 * is only needed when using the replace action.
		 *
		 * @method cls
		 * @param {string} $el  	element id
		 * @param {string} $action	action [set|clear|add|remove|replace|toggle]
		 * @param {string} $c1		name of class to work with
		 * @param {string} $c2 		name of class used in replace of $c1
		 * @memberof Maestro
		 * @expose
		 */
		cls : function($el,$action,$c1,$c2) {
			try {
				$el=(typeof $el != 'string')
				?
				$el
				:
				this['gei']($el);
				
				if (!$el) return;
				switch ($action.toLowerCase()) {
					case 'set': 
						$el.className=$c1;
						break;
						
					case 'clear': 
						$el.className='';
						break;
						
					case 'add': 
						$el.classList.add($c1);
						break;
						
					case 'remove':
						try{$el.classList.remove($c1)}catch(e){};
						break;
						
					case 'replace': 
						try{$el.classList.remove($c1)}catch(e){};
						try{$el.classList.add($c2)}catch(e){};
						break;
						
					case 'toggle':
						$el.classList.toggle($c1);
						break;
				}
			} catch(e) {
				alert(e)
			}
			
		},
		
		/**
		 * @method
		 * @expose
		 * @this {M$}
		 * @memberof Maestro
		 */
		click:function(url) {
			function updateActive(el){
				var nav=el.parentElement;
				for (var i=0;i<nav.children.length;i++)
					M$['cls'](nav.children[i],'remove','active');
					
				M$['cls'](el,'add','active');
			}
			
			if (arguments&&arguments.callee&&arguments.callee.caller&&arguments.callee.caller.arguments&&arguments.callee.caller.arguments[0]['srcElement'])
				var el=arguments.callee.caller.arguments&&arguments.callee.caller.arguments[0]['srcElement'].parentElement;
			
			updateActive(el);
			ga('send', 'event', 'button', 'click', url);
			M$['xhr'](M$['APP_BASE']+"applets/"+url+'.html',$M['_onLoad'],$M['_onError']);
			//a.onload = ($onLoad) ? $onLoad : _onLoaded.bind(this);
			//a.onerror = ($onError)? $onError : _onErrored.bind(this);

		},

		/**
		 * Inserts a new element into a given element
		 *
		 * @example
		 * 		aet('newDivID','h1','newH1ID','This is inner HTML');
		 *
		 * @method aet
		 * @param 	{mixed} 	$el 	The name of an element or the actual element
		 * @param  	{string} 	$ne 	element to insert
		 * @param  	{string}	$id 	ID of the new element
		 * @param  	{string} 	$html 	HTML to insert into new element
		 * @returns Element returns the element just created & appended.
		 * @memberof Maestro
		 * @expose
		 */
		aet : function ($el, $ne, $id, $html) {
			var $el = this['gei']($el);
			$ne = D$.createElement($ne);
			if ($id)
				$ne.id = $id;
			if ($html)
				$ne.innerHTML = $html;
			$el.appendChild($ne);
			return $ne;
		},	
		/**
		 * Check if a value is valid (not null, undefined or empty)
		 *
		 * @example
		 * 		if !(vld(foo)) { someFunction(); }
		 *
		 * @method vld
		 * @param {*}	a 	A value
		 * @returns {boolean} true if the value is not undefined and not null
		 * @memberof Maestro
		 * @expose
		 */
		vld : function(a){return!(null===a||"undefined"===typeof a||!1===a||""===a)},

		/**
		 *  Checks if a param is valid (null or undefined) in which case the default value will be returned
		 *
		 * @example
		 * 		if (foo=chk(foo,"bar")) { someFunction(); }
		 *
		 * @method chk
		 * @param 	{*} 	$p			Parameter to check
		 * @param 	{*} 	$def		Default value to return if p is either null or undefined
		 * @returns {*} 	if valid, otherwise def (default)
		 * @memberof Maestro
		 * @todo Remove function
		 * @expose
		 */
		chk : function($p,$def){return (!this['vld']($p))?$def:$p;},
		
		/**
		 * Alias for window.document.getElementById
		 *
		 * @example
		 * 		var element = gei("myDIV");
		 *
		 * @method gei
		 * @param {string} $p
		 * @returns element
		 * @memberof Maestro
		 * @expose
		 */
		gei : function ($p,$src) {
			return D$.getElementById($p);
		},
		/**
		 * Returns file extension from a url string
		 *
		 * @method gex
		 * @param {String}	a	
		 * @return (String|null) extension
		 * @memberof Maestro
		 * @expose 
		 */
		gex : function(a){
			if (typeof a==='undefined'||a=='') return ''; else return /(?:\.([^.]+))?$/.exec(a)[1].toLowerCase()
		},
		
		/**
		 * Returns file name from a url string
		 *
		 * @method gfn
		 * @param {String}	a	
		 * @return (String|null) filename
		 * @memberof Maestro
		 * @expose 
		 */
		gfn : function(a){
			if (typeof a==='string')return a.substring(a.lastIndexOf("/")+1)
		},
		
		/**
		 * Utility function for wrapping a callback function with its reference
		 * @method bnd
		 * @param {object} $scope
		 * @param {function} $fn
		 * @returns function
		 * @memberof Maestro
		 * @expose
		 */
		bnd : function ($scope, $fn) {
			return function () {
				$fn.apply($scope, arguments);
			};
		},

		_onLoad:function(data) {
			var applet=M$.parseApplet(data);
				
			//Check if content is a valid nanofw applet and if so parse it and place it where it belongs	
			if (typeof applet==="object"&&applet['attributes']['component']['value']=="applet") {
				var target=applet.attributes['target']['value']||'body';
				
				//=-=|Process external css/js files|=-=//
				if (applet.attributes['files'].value!='') {
					//lds : function ($filetype, $id, $url, $tail, $after,$onLoad, $onError) {
					var ext,tail,files=applet.attributes['files'].value.split(',');
					var dir=M$.APP_BASE+applet.attributes.publisher.value+'/assets/';
					for (var i=0;i<files.length;i++){
						ext=M$['gex'](files[i]);
						if(ext=='js'){
							M$['lds']('script','',dir+files[i],true);
						} else if (ext=='css'){
							M$['lds']('link','',dir+files[i],false);
						}
					}
				}
				
				//=-=|clear existing?|=-=//
				if (applet.attributes['render'].value=='replace')
					M$['gei'](target).innerHTML='';
					
				//=-=|attach to DOM|=-=//	
				M$['gei'](target).appendChild(applet);
				
				if (typeof window['onAppletLoaded']=='function')
					window['onAppletLoaded']();
				
				if(window['hljs']) {
					hljs.initHighlightingOnLoad();
					$('pre code').each(function(i, e) {hljs.highlightBlock(e)});
				}
			} else {
				
				var el = M$['gei'](M$['VIEWPORT']);
				if (el) el.innerHTML=data;
			}
		},
		
		_onError:function(data) {
			var el = M$['gei'](M$['VIEWPORT']);
			if (el) el.innerHTML=data;
		},
		
		/**
		 * Utility function for loading JavaScript or Stylesheets.
		 * No other file formats are supported.
		 *
		 * @method lds
		 * @param {string} $fileType 	either script or link
		 * @param {string} $id 			element ID of this file
		 * @param {string} $url 		full path to file, local or remote
		 * @param {boolean} $tail		set to true if you want script loaded into tail.
		 * @param {string} $after 		make sure loaded file is after this given file
		 * @param {callback} $onLoad 	optional
		 * @param {callback} $onError 	optional
		 * @this {M$}
		 * @memberof Maestro
		 * @expose
		 */
		lds : function ($filetype, $id, $url, $tail, $after,$onLoad, $onError) {
			
			function _onLoaded() {}

			function _onErrored() {}
			
			function insert(self) {
				//tail or head? .. or applet?
				c = ($tail==true)?T$:H$;
				
				if (typeof $after!='string') $after='last';
				
				if ($after=='first'){
					//=-=|Insert before all other scripts|=-=//
					c.firstElementChild(a);
					M$.LOADING++;
					return true;
				} else if ($after=='last'){
					//=-=|Insert before all other scripts|=-=//
					c.appendChild(a);
					M$.LOADING++;
					return true;
				} else {
					//=-=|find $after and insert after|=-=//
					c=self['gei']($after);
					if (typeof c !='undefined'){
						if (c.nextElementSibling!=null) {
							c.nextElementSibling.insertBefore(a);
							M$.LOADING++;
							return true;
						}
					}
				}
				return false;
			}
		
			var a,b,c,d = $url.indexOf("applet.");
					
			//=-=|Prepare required parameters|=-=//
			for (var i = 0;i<3;i++) {
				arguments[i]=this['chk'](arguments[i],false);
				if (arguments[i]===false) {
					//log('Error')																		/**DEBUG**/
				}
			}
			this['chk']($after,false);	
			if (arguments[0] == 'script'||arguments[0] == 'js') {
				a = D$.createElement('script');
				a.async = 1;
				a.src = $url; 
				a.type = 'application/javascript';
			} else if (arguments[0] == 'link'||arguments[0] == 'css') {
				a= D$.createElement('link');
				a.href = $url;
				a.rel = 'stylesheet';
				a.type = 'text/css';
			} else {
				return false
			}
			
			a.id=arguments[1];
			a.onload = ($onLoad) ? $onLoad : M$.contentLoaded;
			a.onerror = ($onError)? $onError : function(){log('Error','Loading '+$url)};					/**DEBUG**/
			
			if ($tail===-1)
				return true;
			else
				return insert(this);
		},

		/**
		 * This function accepts a URL and will convert its parameters to an object and return it. 
		 * Optionally, if you call without a parameter it will use the current location object instead.
		 *
		 * @method upo
		 * @param {object} url
		 * @returns {object}
		 * @memberof Maestro
		 * @expose
		 */
		upo:function upo(url){
			//http://localhost:8080/cdn/?nv=auto&nb=local&local=1
			if (!url) url = location.search.substring(1);
			if (url=='')
				return false;
			else
				return JSON.parse('{"' + decodeURI(url).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
		},
		
		/**
	  	 * @private
		 */
		minimizeCSS:function( _content ) {
			var c = _content;
			c = c.replace( /\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, '' );
			// now all comments, newlines and tabs have been removed
			c = c.replace( / {2,}/g, ' ' );
			// now there are no more than single adjacent spaces left
			// now unnecessary: content = content.replace( /(\s)+\./g, ' .' );
			c = c.replace( / ([{:}]) /g, '$1' );
			c = c.replace( /([;,]) /g, '$1' );
			c = c.replace( / !/g, '!' );
			return c;
		},
		
		/**
		 * This method takes a string and determines if it is html and a valid applet. it initializes all attributes
		 * adds JavaScript and CSS.
		 *
		 *	publisher		this allows the processor to find the applets external resources 		"i2tm" 
		 *	target			a container element in which to insert/append this applet 				"viewport" 
		 *	render			how to attach to dom, replace current content or append to 				"replace"
		 *	files			comma deimited list of external files 									"js/styles/default.css,highlight.pack.js"
		 *
		 * @method 
		 * @param String	data	html 
		 * @return string|object
		 * @memberof Maestro
		 * @expose
		 */		
		parseApplet:function(data) {
			
			var parser = new DOMParser(),
				doc = parser.parseFromString(data,'text/html'),
				tags = doc.getElementsByTagName('m-nano'),
				applet = tags[0];	
				
			if (data&&data['tagName']){
				if (data['tagName']==='M-NANO' && data.component && data.component==='applet') {
					if (!data.dataset.publisher) data.setAttribute('data-publisher','shared')
					if (!data.dataset.target) data.setAttribute('data-target',this['VIEWPORT']);
					if (!data.dataset.render) data.setAttribute('data-render','replace');
					if (!data.dataset.files) data.setAttribute('data-files','');
					
					M$['VIEWPORT']=data.dataset['target'].value||'wrapper';
					
					//=-=|Process external css/js files|=-=//
					if (data.dataset.files!='') {
						var ext,tail,files=data.dataset.files.split(',');
						for (var i=0;i<files.length;i++){
							ext=M$['gex'](files[i]);
							if(ext=='js'){
								M$.lds('script','',M$.APP_BASE+files[i],true);
							} else if (ext=='css'){
								M$.lds('link','',M$.APP_BASE+files[i],false);
							}
						}
					}
					
					var code,src;
					code = data.getElementsByTagName('style');
					if (code.length>0) {
						for (var i=0;i<code.length;i++) {
						  src+=code[i].innerText;
						  data.removeChild(code[i]);
						} 
						
						src=this.minimizeCSS(src);
						
						var a=D$.createElement('style');
						a.rel='stylesheet';
						a.type='text/css';
						a.id=data.id+"_css";
						a.innerText=src;
						H$.appendChild(a);
					}
					
					//=-=|check for styles combine and insert into head with proper ID?|=-=//
					
					
					//=-=|clear existing?|=-=//
					if (data.dataset.render==='replace')
						M$['gei'](M$['VIEWPORT']).innerHTML='';
						
					//=-=|attach to DOM|=-=//	
					M$['gei'](M$['VIEWPORT']).appendChild(data);
					
					var $onLoadedFuncName='onApplet'+data.id+'Loaded';
					if (typeof window[$onLoadedFuncName]==='function')
						window[$onLoadedFuncName]();
					
					if(window['hljs']) {
						hljs.initHighlightingOnLoad();
						$('pre code').each(function(i, e) {hljs.highlightBlock(e)});
					}
					
					return true;
				}
			}
			
			return data;
		},
		
		/**
		 * <h1>alert - Dialog</h1>
		 * <p>This will popup a embeded responisive dialog for error, warning and info</p>
		 *
		 * @method alert
		 * @param {string}		type [error|warning|info]
		 * @param {string} 		message
		 * @this {M$}
		 * @memberof Maestro
		 * @expose
		 */
		alert:function(type,message){
			var title = this['gei']('modaltitle'),txt='Application&nbsp;<small class="headerSmall">';
			this['gei']('modaltext').innerHTML=message;
			
			switch (type.toLowerCase()) {
				case 'error':
					title.innerHTML=this['getDB'](25)+'Error</small>';
					this['cls']("modaltitle","set","headerBig modal-title-error"); /* ON */
				break;
				
				case 'warning':
					title.innerHTML=this['getDB'](25)+'Warning</small>';
					this['cls']("modaltitle","set","headerBig modal-title-warning"); /* ON */
				break;
				
				default: 
					title.innerHTML=this['getDB'](25)+'Info</small>';
					this['cls']("modaltitle","set","headerBig modal-title-info"); /* ON */					
			}
			
			this['cls']("ErrorModal","set","opacity100"); /* ON */
		},
		
		/**
		 * <h1>XHR - XMLHttpRequest</h1>
		 * <p>This is an API available to web browsers. It is used to send
		 * HTTP or HTTPS requests to a web server and load the server response data back
		 * into the script.[1] Development versions of all major browsers support URI schemes
		 * beyond http: and https:, in particular, blob: URLs are supported.</p>
		 *
		 * <p>Given a complete URL this function will use AJAX to load a file. It supports the
		 * latest standards and CORS. If you get errors make sure your server is configured
		 * for Cross-Domain Access.</p>
		 *
		 * <h3>Typical setting for .htaccess</h3>
		 *
		 *
		 * @example
		 *		<IfModule mod_headers.c>
		 *			Header set Access-Control-Allow-Origin "*"
		 *		</IfModule>
		 *		And if it only concerns .js scripts you should wrap the above code inside this:
		 *		<FilesMatch "\.(js)$">
		 *		...
		 *		</FilesMatch>
		 *
		 *
		 * @method xhr
		 * @param {string}		$url
		 * @param {function} 	$onLoad
		 * @param {function} 	$onError
		 * @param {string} 		$method
		 * @param {string} 		$data
		 * @param {boolean} 	$trace
		 * @returns {boolean}
		 * @this {M$}
		 * @memberof Maestro
		 * @expose
		 */
		xhr : function ($url, $onLoad, $onError, $method, $data, $trace) {
			//function ($url, $onLoad, $data) {
		
			// Create the XHR object.
			createCORSRequest = function (method, url) {
				var xhr = new XMLHttpRequest();
				if ("withCredentials" in xhr) {
					// XHR for Chrome/Firefox/Opera/Safari.
					xhr.open(method, url, true);
				} else if (typeof XDomainRequest != "undefined") {
					// XDomainRequest for IE.
					xhr = new XDomainRequest();
					xr.open(method, url);
				} else {
				// CORS not supported.
					xhr = null;
					M$['alert']('error',maestro2['gfn']($url)+': CORS not supported.')
				}
				return xhr;
			}

			// Helper method to parse the title tag from the response.
			getTitle = function (text) {
				return text.match('<title>(.*)?</title>')[1];
			}

			// Make the actual CORS request.
			makeCorsRequest = function ($url, $onLoad, $data) {
				if (M$['gei']('LED-Rec')) M$['gei']('LED-Rec').className='led round green-on';

				var xhr = createCORSRequest('GET', $url);
					if (!xhr) {
						alert('CORS not supported');
					return;
				}

				xhr.onloadstart = function(){
					if (M$['gei']('LED-Snd')) M$['gei']('LED-Snd').className='led round red-on';
				}
				
				xhr.onloadend = function(){
					if (M$['gei']('LED-Snd')) M$['gei']('LED-Snd').className='led round red-off';
					//if (typeof window['appletOnLoaded']=='function')
					//	window['appletOnLoaded']();
					//M$['cls'](M$['VIEWPORT'],"set","opacity100"); /* ON */
					//M$['cls']("splash","set","opacity0"); /* OFF */
				}	
				
				// Response handlers.
				xhr.onload = function() {
					
					//Valid event function passed
					if (typeof $onLoad === 'function') {
						$onLoad(xhr.responseText);
						
					//sign name for target passed in?
					} else if (typeof $onLoad === 'string') {					
						var el;
						if (el=M$['gei']($onLoad))
							el.innerHTML=xhr.responseText;
						
					} 
					else log('ERROR: [XHR] Ajax data received but no default handler found.');			/**DEBUG**/
					
				};

				xhr.onerror = function() {
					M$['alert']('error',this.responseText);
				};

				if (xhr&&xhr.send) xhr.send();
				 
				if (M$['gei']('LED-Rec')) 
					M$['gei']('LED-Rec').className='led round green-off';
					
			} //makeCorsRequest()
			
			//M$['cls'](M$['VIEWPORT'],"set","opacity0"); /* OFF */
			//M$['cls']("splash","set","opacity100"); /* ON */
			makeCorsRequest($url, $onLoad, $onError, $method, $data);
		}// end Ajax() 	
	}
	window['M$']=window['Maestro']=Maestro;
	
	
	//=-=|BEGIN MAESTRO COMPONENT/ELEMENT CODE|=-=//
	//M$['Component']=[];
	registerComponents= function() {
		//if (!M$['Component']) M$['Component'] = new Array();
	
		/**
		 * Nano Framework Enhanced Search Element
		 *
		 * @example <m-nano component="search"></m-nano>
		 */	
		M$['Component']['search'] = {
			init:function(self,args) {
				var css="",html="";
				
				//Normalize CSS
				css+="m-nano #nav-search{border-radius:2em 0em 0em 2em;background-color:#008000;color:#FFF;width:5em;border:none}";
				css+="m-nano #nav-search:active,#nav-search:focus{width:20em;border:none}";
				css+="m-nano .btn-i2tm-search{height:2.4em;background-color:#008000}";
				
				//Normalize HTML 
				html+='<form class="navbar-form" role="search" action="#" onclick="">';		
				html+='<div class="input-group">';		
				html+='<input type="text" class="form-control" name="nav-search" id="nav-search" x-webkit-speech="">';		
				html+='<input name="siteurl" type="hidden" value="i2tmlabs.com/">';		
				html+='<div class="input-group-btn">';		
				html+='<button class="btn btn-i2tm-search" type="submit"><i class="glyphicon glyphicon-search"></i></button>';		
				html+='</div></div></form>';		
				
				return [css,html]
			}
		}; M$['Component'].length++;


		/**
		 * Nano Framework CloudLett Element
		 *
		 * @example <m-nano component="applet"></m-nano>
		 */	
		M$['Component']['applet'] = {
			init:function(self,args) {
				var css="",html="",el;
				if (M$['parseApplet'](M$['gei'](args['id']))===true) 
					return true;
				else 
					return [css,html]
			}
		}; M$['Component'].length++;
		
		/**
		 * Nano Framework Enhanced Auto Awareness Header Element
		 *
		 * @example <m-nano component="header" size="auto|xs|sm|md|lg|xl"></m-nano>
		 * DONE
		 */ 
		M$['Component']['header'] = {
			init:function(self,args) {
				var css="",html="";
				
				//Normalize HTML 		
				self.innerHTML=this.parse(self.innerHTML);		

				//Normalize CSS
				self.children[0].css="font-family:neuropol;color:green;text-transform:uppercase";
				self.children[1].css="color:white;text-trassform:lowercase";
		
				return true;
			},
			
			parse:function(text) {
					
				var res = text.split(" ");
				if (res.length && res.length>1) {
					res1 = res.slice(0, res.length/2);
					res2 = res.slice(res.length/2, res.length);
					return '<h1 class="reflect">'+res1.join(" ")+'&nbsp;<small>'+res2.join(" ")+'</small></h1><hr class="reflect">';
				}
			}
		}; M$['Component'].length++;


		/**
		 * @example <m-nano component="led" 
		 *					shape="round|square|rectangle" 
		 *					color="blue|red|green|yellow" 
		 *					state="on|off"
		 *			></m-nano>
		 * DONE
		 */
		M$['Component']['led'] = {
			init:function(self,args) {
				var html='',css='';
				css+='margin:0.75em;display:inline-block;';			
				css+=this.getShape(args['shape']);	
				css+=this.getColorState(args['color'],args['state']);
				
				return [css,html]
			},
			
			getShape:function(s){
				var css='';
				
				if(s=='square')
					css+='width:1em;height:1em;border-radius:0%;';
				else if (s=='rectangle')
					css+='width:2em;height:1em;border-radius:0%;';
				else
					css+='width:1em;height:1em;border-radius:50%;';
				
				return css;
			},
			
			getColorState:function(c,s){
				var css='';
				
				//=-=|Set to red on/off|=-=//
				if (c=='red'&&s=='on')
					css+='background-color:#F40;box-shadow:#000 0 -1px 7px 1px, inset #600 0 -1px 9px, #F00 0 2px 1em;';
				else if (c=='red'&&s=='off')			
					css+='background-color:#690606;box-shadow:#000 0 -1px 7px 1px, inset #300 0 -1px 9px, #600 0 2px 1em;';
			
				//=-=|Set to green on/off|=-=//
				else if (c=='green'&&s=='on')
					css+='background-color:#393;box-shadow:#000 0 -1px 7px 1px, inset #0F0 0 -1px 9px, #7D0 0 2px 1em;';
				else if  (c=='green'&&s=='off')
					css+='background-color:#250;box-shadow:#000 0 -1px 7px 1px, inset #020 0 -1px 9px, #040 0 2px 1em;';
			
				//=-=|Set to blue on/off|=-=//
				else if (c=='blue'&&s=='on')
					css+='background-color:#0BF;box-shadow:#000 0 -1px 7px 1px, inset #006 0 -1px 9px, #0BF 0 2px 1em;';
				else if (c=='blue'&&s=='off')
					css+='background-color:#060669;box-shadow: #000 0 -1px 7px 1px, inset #003 0 -1px 9px, #006 0 2px 1em;';
					
				//=-=|Set to yellow on/off|=-=//
				else if (c=='yellow'&&s=='on')
					css+='background-color:#FF0;box-shadow:#000 0 -1px 7px 1px, inset #660 0 -1px 9px, #FF0 0 2px 1em;';
				else
					css+='background-color:#A90;box-shadow:#000 0 -1px 7px 1px, inset #220 0 -1px 9px, #440 0 2px 1em;';
				
				return css;
			},		
			onchanged:function(self,args) {
				self.style.cssText=this['init'](self,args)[0];			
				//return this.prototype.init(self,args);
			}
		}; M$['Component'].length++;
		
		
	} //end registerComponents()	


	M$['Component']=[];		
	M$['Element']={};
	registerComponents();
	//if (typeof M$['Component'][this['component']] === 'undefined') registerComponents();
			
	M$['Element'].prototype = Object.create(HTMLModElement.prototype);
	/**
	 * an instance of the element is created - Normalize HTML & CSS
	 */
	M$['Element'].prototype.createdCallback = function() {
		var args = this.parseAttributes();
		this['init'](args);
	};
	/**
	 * an instance was inserted into the document
	 */
	M$['Element'].prototype.attachedCallback = function() {
		if(M$['Component'][this['component']]['oninsert'])
			M$['Component'][this['component']]['oninsert'](this,arguments);
	};
	/**
	 * an instance was removed from the document
	 */
	M$['Element'].prototype.detachedCallback = function() {
		if(M$['Component'][this['component']]['onremove'])
			M$['Component'][this['component']]['onremove'](this,arguments);
	};
	/**
	 * an attribute was added, removed, or updated
	 */
	M$['Element'].prototype.attributeChangedCallback = function() {
		if(M$['Component'][this['component']]['onchanged'])
			M$['Component'][this['component']]['onchanged'](this,this.parseAttributes());
	};

	M$['Element'].prototype.parseAttributes = function() {
		var name,value,args={},
			builtin=['component','data-component'];
			
		for (var i=0;i<this.attributes.length;i++) {
			name=this.attributes[i].name.toLowerCase()||'';
			value=this.attributes[i].value||'';
			if (builtin.indexOf(name)!=-1)
				this['component']=value;
			else
				args[name]=value;
		}
		return args;
	};

	M$['Element'].prototype.init = function(args) {
		//if (typeof M$['Component'][this['component']] === 'undefined')
		//	registerComponents();
			
		var result = M$['Component'][this['component']]['init'](this,args);
		if (result===true) return; //Component handled applying html and css		
		this.style.css=result[0];
		this.innerHTML=result[1];

	};

	// 2. Define a property read-only "bar".
	Object.defineProperty(M$['Element'].prototype, "css", {value: ''});

	// 3. Register m-nano's definition.
	M$['Element'] = D$['registerElement']('m-nano', {prototype: M$['Element'].prototype});
	//=-=|END MAESTRO COMPONENT/ELEMENT CODE|=-=//

})();
M$.start();