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
 * @expose
 * @returns {Object} Maestro object
 * @memberof window
 */
(function(){return void 0!=W$.M$?W$.M$:null});

Function.prototype.bind = function(scope) {
  var _fn = this;
  
  return function() {
	return _fn.apply(scope, arguments);
  }
};	


window.onload=function() {
	Maestro2.addEvents();
	Maestro2.onResizeComplete();

	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','http://static.i2tmlabs.com/i2tm/assets/js/analytics.js','ga');

	ga('create', 'UA-35732532-1', 'i2tmlabs.com');
	ga('send', 'pageview');
	
	W$['M$']=W$['Maestro2'];
	if (W$['MaestroReady']) 
		W$['MaestroReady']();
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
*/
var Maestro2 = {
	//STATIC_CONTENT:'http://static.i2tmlabs.com/',
	STATIC_CONTENT:'../static/',
	resizeTimer:null,
	
	addEvent:    function(obj, type, fn) { obj.addEventListener(type, fn, false);    },
	removeEvent: function(obj, type, fn) { obj.removeEventListener(type, fn, false); },

	windowWidth:  function() { return window.innerWidth  || /* ie */ document.documentElement.offsetWidth;  },

    addEvents: function() {

		//Maestro2.addEvent(B$,'change',(adsbygoogle = window.adsbygoogle || []).push({}));
		Maestro2.addEvent(W$,'resize',  this.resize.bind(this));
		//Maestro2.addEvent(viewport, 'onchange',  this.viewchanged.bind(this));
    },

	viewchanged:function() {
		this.autoHeight();
		//this.insertAds();
	},
	
	insertAds:function() {
		var cell=B$.getElementsByClassName("googleAd");
		//<ins id="adRight" class="adsbygoogle hidden-xs" style="display:inline-block;width:auto;height:auto" data-ad-client="ca-pub-7431399643348196" data-ad-slot="5778036465"></ins>
		//(adsbygoogle = window.adsbygoogle || []).push({});
	},

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
	
    resize: function() {
		clearTimeout(this.resizeTimer);
		this.resizeTimer = setTimeout(this.onResizeComplete, 250);
	},
	
    onResizeComplete: function() {
		Maestro2['autoHeight']();  //Make sure all cells with classname are same height in row
		Maestro2['autoScale'](); //any element with autoScale Class will keep aspect ratio and screen<-->image proportions
	},

	/**
	 * @method
	 * @expose
	 */
	getDB:function (idx,replace) {
		var result,	args=[], MAP={}, HTML=[];

		//=-=|Header=>[titleBig,titleSmall]|=-=//
		HTML[0]='<div class="headerDIV greenBG"><span class="headerBigGold">VAR0</span><span class="headerSmall">VAR1</span></div>';
		//=-=|Paragraph->[content]|=-=//
		HTML[1]='<p class="greenBG">VAR0</p>';
		//=-=|Jumbotron->[title,content]|=-=//
		HTML[2]='<div class="jumbotron greenBG"><h1>VAR0</h1><p>VAR1</p></div>';
		HTML[3]='';
		//=-=|Maestro Animated Logo|=-=//
		HTML[17] = '<h1>&#98';
		HTML[18] = '</h1><h3>';
		HTML[19] = '</h3>';
		HTML[20] = 'div';
		HTML[21] = 'ul';
		HTML[22] = 'li';
		HTML[23] = 'common';
		HTML[24] = 'mLoader';
		HTML[25] = 'mView';

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
	 * @method
	 * @expose
	 * @this {Maestro2}
	 */
	component:function (parent,child) {
		var el = this['gei'](parent);
		if (el) {el.appendChild(child)}
	}, //End feature()

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
	 * @this {Maestro2}
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
	 * @this {Maestro2}
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
	 * @this {Maestro2}
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

	play:function(app){
		if (app=='kuiperassult') {
			ga('send', 'event', 'button', 'click', app);
			location.href="http://apps.i2tmlabs.com/i2tm/kuiperassult/";
		}
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
	 * @memberof I$Alias
	 * @expose
	 */
	cls : function($el,$action,$c1,$c2) {
		try {
			$el=($el!='string')?$el:this['gei']($el);
			if (!$el) return;
			//var $el=this['gei']($el);if (!$el) return;
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
					$el.classList.remove($c1);
					break;
					
				case 'replace': 
					$el.classList.remove($c1);
					$el.classList.add($c2);
					break;
					
				case 'toggle':
					$el.classList.toggle($c1);
					break;
			}
		} catch(e) {
			err(this,e,{local:{},args:Array.prototype.slice.call(arguments, 0)})
		}
		
	},
	
	/**
	 * @method
	 * @expose
	 * @this {Maestro2}
	 */
	click:function(url) {
		function _onLoad(data) {
			var applet=Maestro2.parseApplet(data);
				
			if (typeof applet==="object"&&applet['attributes']['component']['value']=="applet") {
				var target=applet.attributes['target']['value']||'body';
				
				//=-=|Process external css/js files|=-=//
				if (applet.attributes['files'].value!='') {
					//lds : function ($filetype, $id, $url, $tail, $after,$onLoad, $onError) {
					var ext,tail,files=applet.attributes['files'].value.split(',');
					var dir=Maestro2.STATIC_CONTENT+applet.attributes.publisher.value+'/assets/';
					for (var i=0;i<files.length;i++){
						ext=Maestro2['gex'](files[i]);
						if(ext=='js'){
							Maestro2['lds']('script','',dir+files[i],true);
						} else if (ext=='css'){
							Maestro2['lds']('link','',dir+files[i],false);
						}
					}
				}
				
				//=-=|clear existing?|=-=//
				if (applet.attributes['render'].value=='replace')
					Maestro2['gei'](target).innerHTML='';
					
				//=-=|attach to DOM|=-=//	
				Maestro2['gei'](target).appendChild(applet);
				
				if (typeof window['onAppletLoaded']=='function')
					window['onAppletLoaded']();
				
				if(window['hljs']) {
					hljs.initHighlightingOnLoad();
					$('pre code').each(function(i, e) {hljs.highlightBlock(e)});
				}
			} else {
				var el = M$['gei']('viewport');
				if (el) el.innerHTML=data;
			}
		}
		function _onError(data) {
			var el = M$['gei']('viewport');
			if (el) el.innerHTML=data;
		}
		function updateActive(el){
			var nav=el.parentElement;
			for (var i=0;i<nav.children.length;i++)
				Maestro2['cls'](nav.children[i],'remove','active');
				
			Maestro2['cls'](el,'add','active');
		}
		
		if (arguments&&arguments.callee&&arguments.callee.caller&&arguments.callee.caller.arguments&&arguments.callee.caller.arguments[0]['srcElement'])
			var el=arguments.callee.caller.arguments&&arguments.callee.caller.arguments[0]['srcElement'].parentElement;
		
		updateActive(el);
		ga('send', 'event', 'button', 'click', url);
		M$['xhr']("assets/applets/"+url+'.html',_onLoad);
	},
	/**
	 * Create Animated Maestro Logo (mLoader)
		HTML[17] = '<h1>&#98';
		HTML[18] = '</h1><h3>';
		HTML[19] = '</h3>';
		HTML[20] = 'div';
		HTML[21] = 'ul';
		HTML[22] = 'li';
		HTML[23] = 'common';
		HTML[24] = 'mLoader';
		HTML[25] = 'mView';
	 *
	 * @method 
	 * @param {string}	parent	target container element
	 * @param {number}	scale	final scale of Logo (0.0-1.0)
	 * @expose
	 */		
	insertLogo:function(parent,scale) {

		var li='',arr = [[33,'o'],[35,'r'],[37,'t'],[34,'s'],[36,'e'],[33,'a'],[34,'m']]
		/* ==|== Create mLoader ======================================== */
		var $tmp=this.aet(parent, this['getDB'](20),this['getDB'](24));
		//Create Title (Cloud Application Loading)
		$tmp = this.aet(this['getDB'](24), 'h1', 'mTitle');
		$tmp.innerHTML='Cloud Application is Loading';
		$tmp.className='';
		
		//Create Ul (Animated notes)
		$lUl = this.aet(this['getDB'](24), this['getDB'](21), this['getDB'](25));
		//Create LI (Animated Maestro Text)
		for (var i = 0; i < arr.length; i++)
			li+='<li>'+this['getDB'](17) + arr[i][0] + this['getDB'](18) + arr[i][1] + this['getDB'](19)+'</li>';
			//this.aet($lUl, this['getDB'](22), false, (this['getDB'](17) + arr[i][0] + this['getDB'](18) + arr[i][1] + this['getDB'](19)));
			$lUl.innerHTML=li;
		
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
	 * @memberof maestro.fn
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
	 * @memberof I$Alias
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
	 * @memberof I$Alias
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
	 * @memberof I$Alias
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
	 * @expose 
	 */
	gfn : function(a){
		return a.substring(a.lastIndexOf("/")+1)
	},
	
	/**
	 * Utility function for wrapping a callback function with its reference
	 * @method bnd
	 * @param {object} $scope
	 * @param {function} $fn
	 * @returns function
	 * @memberof I$Alias
	 * @expose
	 */
	bnd : function ($scope, $fn) {
		return function () {
			$fn.apply($scope, arguments);
		};
	},

	/**
	 * Utility function for loading JavaScript or Stylesheets.
	 * No other file formats are supported.
	 *
	 * @method bnd
	 * @param {string} $fileType 	either script or link
	 * @param {string} $id 			element ID of this file
	 * @param {string} $url 		full path to file, local or remote
	 * @param {boolean} $tail		set to true if you want script loaded into tail.
	 * @param {string} $after 		make sure loaded file is after this given file
	 * @param {callback} $onLoad 	optional
	 * @param {callback} $onError 	optional
	 * @this {Maestro2}
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
				return true;
			} else if ($after=='last'){
				//=-=|Insert before all other scripts|=-=//
				c.appendChild(a);
				return true;
			} else {
				//=-=|find $after and insert after|=-=//
				c=self['gei']($after);
				if (typeof c !='undefined'){
					if (c.nextElementSibling!=null) {
						c.nextElementSibling.insertBefore(a);
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
				if (console) console.log('Error')
			}
		}
		this['chk']($after,false);	
		if (arguments[0] == 'script') {
			a = D$.createElement('script');
			a.async = 1;
			a.src = $url; 
			a.type = 'application/javascript';
		} else if (arguments[0] == 'link') {
			a= D$.createElement('link');
			a.href = $url;
			a.rel = 'stylesheet';
			a.type = 'text/css';
		} else {
			return false
		}
		
		a.id=arguments[1];
		a.onload = ($onLoad) ? $onLoad : _onLoaded.bind(this);
		a.onerror = ($onError)? $onError : _onErrored.bind(this);
		
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
	 * @memberof I$Alias
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
	 * This method takes a string and determines if it is html and a valid applet. it initializes all attributes
	 * adds javascript and css.
	 *
	 *	publisher		this allows the processor to find the applets external resources 		"i2tm" 
	 *	target			a container element in which to insert/append this applet 				"viewport" 
	 *	render			how to attach to dom, replace current content or append to 				"replace"
	 *	files			comma deimited list of external files 									"js/styles/default.css,highlight.pack.js"
	 *
	 * @method 
	 * @param String	data	html 
	 * @return string|object
	 * @expose
	 */		
	parseApplet:function(data) {
		
		var parser = new DOMParser(),
			doc = parser.parseFromString(data,'text/html'),
			tags = doc.getElementsByTagName('m-nano'),
			el = tags[0];			
		if (el&&el['tageName']){
			if (el['tagName']=='M-NANO' && el.attributes['component'] && el.attributes.component.value=='applet') {
				el.attributes['publisher']=el.attributes['publisher']||'shared';
				el.attributes['target']=el.attributes['target']||'viewport';
				el.attributes['render']=el.attributes['render']||'replace';
				el.attributes['files']=el.attributes['files']||'';
				return el;
			}
		}
		return data;
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
	 * @this {Maestro2}
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
			}
			return xhr;
		}

		// Helper method to parse the title tag from the response.
		getTitle = function (text) {
			return text.match('<title>(.*)?</title>')[1];
		}

		// Make the actual CORS request.
		makeCorsRequest = function ($url, $onLoad, $data) {
			//Maestro2['gei']('LED-Rec').className='led round green-on';

			var xhr = createCORSRequest('GET', $url);
				if (!xhr) {
					alert('CORS not supported');
				return;
			}

			xhr.onloadstart = function(){
				//Maestro2['gei']('LED-Snd').className='led round red-on';
				//console.log('Load Start.');
			}
			
			xhr.onloadend = function(){
				//Maestro2['gei']('LED-Snd').className='led round red-off';
				if (typeof window['appletOnLoaded']=='function')
					window['appletOnLoaded']();
			}	
			
			// Response handlers.
			xhr.onload = function() {
				var el;
				if ($onLoad!=null) {
					if (el=Maestro2['gei']($onLoad)) {
						el.innerHTML=xhr.responseText;
					} else if (typeof $onLoad == 'function') {
						$onLoad(xhr.responseText);
					}
				}
			};

			xhr.onerror = function() {
				alert('Woops, there was an error making the request.');
			};

			 xhr.send();
			// Maestro2['gei']('LED-Rec').className='led round green-off';
		} //makeCorsRequest()
		
		makeCorsRequest($url, $onLoad, $onError, $method, $data);
	}// end Ajax() 	
}


//=-=|BEGIN MAESTRO COMPONENT/ELEMENT CODE|=-=//
Maestro2['Component']={};
Maestro2['Element']={};
Maestro2['Element'].prototype = Object.create(HTMLModElement.prototype);
/**
 * an instance of the element is created - Normalize HTML & CSS
 */
Maestro2['Element'].prototype.createdCallback = function() {
	var args = this.parseAttributes();
	this['init'](args);
};
/**
 * an instance was inserted into the document
 */
Maestro2['Element'].prototype.attachedCallback = function() {
	if(Maestro2['Component'][this['component']]['oninsert'])
		Maestro2['Component'][this['component']]['oninsert'](this,arguments);
};
/**
 * an instance was removed from the document
 */
Maestro2['Element'].prototype.detachedCallback = function() {
	if(Maestro2['Component'][this['component']]['onremove'])
		Maestro2['Component'][this['component']]['onremove'](this,arguments);
};
/**
 * an attribute was added, removed, or updated
 */
Maestro2['Element'].prototype.attributeChangedCallback = function() {
	if(Maestro2['Component'][this['component']]['onchanged'])
		Maestro2['Component'][this['component']]['onchanged'](this,this.parseAttributes());
};

Maestro2['Element'].prototype.parseAttributes = function() {
	var name,value,args={},
		builtin=['component'];
		
	for (var i=0;i<this.attributes.length;i++) {
		name=this.attributes[i].name.toLowerCase()||'';
		value=this.attributes[i].value||'';
		if (builtin.indexOf(name)!=-1)
			this[name]=value;
		else
			args[name]=value;
	}
	return args;
};

Maestro2['Element'].prototype.init = function(args) {
	if (typeof Maestro2['Component'][this['component']] === 'undefined')
		registerComponents();
		
	var result = Maestro2['Component'][this['component']]['init'](this,args);
	if (result===true) return; //Component handled applying html and css		
	this.style.css=result[0];
	this.innerHTML=result[1];

};

// 2. Define a property read-only "bar".
//Object.defineProperty(Maestro2['Element'].prototype, "css", {value: ''});

// 3. Register m-nano's definition.
Maestro2['Element'] = document.registerElement('m-nano', {prototype: Maestro2['Element'].prototype});
//=-=|END MAESTRO COMPONENT/ELEMENT CODE|=-=//
