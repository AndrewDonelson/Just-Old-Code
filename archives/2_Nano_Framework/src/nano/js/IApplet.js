/**
 * @namespace 
 * @name R2WL
 * @class  Applet
 * @requires maestro.CS2I
 */
 
/**
 * <p>A Applet resource. You can use this class to acquire Applets (loaded from a URI) and then use them in your CloudApp.</p>
 *
 * @class I$Applet
 * @extends I$Pooled
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Pooled',

	//What is the name of your new interface?
	'I$Applet',
	
	/** @lends I$Pooled */
	{		
		/** 
		 * This is an API so there can only be one instance.
		 *
		 * @property {number} maxTotalObjects
		 * @expose 
		 */
		maxTotalObjects:0,
		
		/** 
		 * @property {object} 
		 * @memberof Applet
		 * @todo Move to private
		 */
		params: {
			/** 
			 * @property {array} 
			 * @memberof Applet.params
			 */
			required: ['role','name','version','uuid'],
			/** 
			 * @property {array} 
			 * @memberof Applet.params
			 */
			optional: ['author','copyright','shared','scale']
		},
			
		/**
		 * Constructs an Applet by acquiring it from the object pool. An applet had 4 required attributes
		 * ['role','name','version','uuid'] and 3 optional attributes ['author','copyright','scale'].
		 * 
		 * The name must be unique to your Applet Store. The UUID must be a valid and H5C3 Genuine which matches it
		 * to you, company or personal. It is strongly suggested that you use the version. End Users have the option
		 * of Automatically using the latest Applications and Applets, but that usually means stability issues. Using
		 * the version allows for saftey and less issues.
		 *
		 * @contructor
		 * @param  {string} url url to the applet - http://applets.i2tmlabs.com/ + path/to/applet/applet.someAppletName.html
		 * @returns {df.Applet} A df.Applet if successful, Applet Name if failed.
		 * @memberof Applet
		 */
		create: function($data,$active)
		{
			var n = this['_super']();
			if (n.parse(data,$active))
				return n
			else
				return n.name;
		}	
	},
	/** @lends I$Pooled.prototype */
	{
		State:{ QUEUED:0, LOADING:1, READY:2, ACTIVE:3, FAILED:4 },

		/** 
		 * @property {object} Header
		 * @memberof Applet
		 */
		header: {
			/** 
			 * @property {string} Applets Role 
			 * @memberof Applet.header
			 */
			role:		"applet",

			/** 
			 * @property {string} Applets Name 
			 * @memberof Applet.header
			 */
			name:		"default", 

			/** 
			 * @property {string} Applets version 
			 * @memberof Applet.header
			 */
			version:	"0.0.0", 

			/** 
			 * @property {string} Short Description
			 * @memberof Applet.header
			 */
			description:"",
					
			/** 
			 * @property {string} Applets Universally unique identifier 
			 * @memberof Applet.header
			 */
			uuid:		"XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",

			/** 
			 * @property {string} Name of Registered Publisher
			 * @memberof Applet.header
			 */
			publisher:		"",

			/** 
			 * @property {string} Applets Author 
			 * @memberof Applet.header
			 */
			author:		"", 

			/** 
			 * @property {string} Applets Copyright 
			 * @memberof Applet.header
			 */
			copyright:	"2014 by {YOU} - All rights reserved.",

			/** 
			* @property {string} the Applets stylesheet-will be added/removed to head automatically 
			* @memberof Applet
			*/
			style:		"",

			/** 
			* @property {string} the Applets javascript-will be added/removed to head automatically 
			* @memberof Applet
			*/
			script:		"",

			/** 
			 * @property {string} the Applets html- place as variable {$applet:someAppletName} 
			 * @memberof Applet
			 */
			html:		"",
			
			/** 
			 * @callback {method} Define in applet JS to execute code when applet 
			 * is loaded but not yet displayed.
			 * @memberof Applet
			 */
			onload:null,

			/** 
			 * @callback {method} Define in applet JS to execute code when applet 
			 * is loaded but not yet displayed.
			 * @memberof Applet
			 */
			onunload:null
		},

		uri:		'',
		
		id:			"{AUTOSET}",		//role + . + name
			
		/** 
		 * @property {number} Current state of this applet
		 * @memberof Applet
		 */
		state: -1,
		
		
		/**
		 * Constructs a new Applet. If the loader has already started then the image will be
		 * immediately loaded, otherwise it will wait for the resource loader to handle the loading.
		 * @instance
		 * @param  String name Name to give the image resource
		 * @param  String src URI for the image
		 * @memberof Applet
		 */
		init:function ($data)
		{
			this['_super']();
			$data=$data[0];
			try {
				//IMPORTANT! if creating this applet fails, you must delete it
				if (this.makeURI($data)) {
					this.setState(0);
				}
			} catch (e) {
				var _={};
				this['error'](e,_,Array.prototype.slice.call(arguments, 0));			}
			},

		setState:function(state){
			if (state<0||state>4) {
				this['warn']('Invalid State [QUEUED:0, LOADING:1, READY:2, FAILED:3]');
			} else {
				if (this.state!=state) {
					this.state=state;
					switch (this.state) {
						case this['State']['QUEUED']:
							this['debug'](this['header'].name+' has been queued.');
							break;
						case this['State']['LOADING']:
							this['debug'](this['header'].name+' is  being loaded.');
							this.fetch();
							break;
						case this['State']['READY']:
							this['debug'](this['header'].name+' is being embeded into the document.');
							this.embed();
							break;
						case this['State']['ACTIVE']:
							this['debug'](this['header'].name+' is now Active.');
							break;
						case this['State']['FAILED']:
							this['debug'](this['header'].name+' has failed.');
							break;
					}
				this['debug'](this['header'].name+' state changed.');				
				}
			}
		},
			
		makeURI:function($data) {
			var _={path:null,fileName:null,ext:null};
			
			try {
				//this['debug']('Processing '+this['header'].name);
				
				//Prepare basic header
				this['header']['name']=(this['vld']($data['dataset']['applet']))?$data['dataset']['applet']:false;
				this['header']['role']=(this['vld']($data['dataset']['role']))?$data['dataset']['role']:'content';
				this['header']['local']=(!this['vld']($data['dataset']['local'])||$data['dataset']['local']=='no')?false:true;
				this['header']['publisher']=(this['vld']($data['dataset']['publisher']))?$data['dataset']['publisher']:'';
				//=-=|if no publisher force local|=-=//
				this['header']['local']=(this['header']['publisher']=='')?1:0;
				this['id']=this['header']['name'];
				if (!this['header']['name']||!this['header']['role']) {
					this['error']('You must provide at least a (Name/role/publisher) properties when using applets.');//debug
					this['setState'](this['state']['FAILED']);
					return false;
				}
				
				//_.ext=($m.devMode)?'.html':'.nfw';
				_.ext='.html';
				_.fileName='applet'+'.'+this['header']['name']+_.ext;

				//Prepare the URI
				if (!this['vld'](_.path=nldr['getPath']('applets','publisher'))){
					this['warn']('Publisher path not found.');
					return false
				}
				this.uri=_.path+_.fileName;
				// } else {
					// if (!this['vld'](_.path=nldr['getPath']('publisher',this['header'].publisher))){
						// this['warn']('Publisher path not found.');
						// return false
					// }
					// this.uri=_.path+'applets/'+_.fileName;
				// }
				
				
				return true;
			} catch (e) {	
				this['error'](e,_,Array.prototype.slice.call(arguments, 0));			}
				return false;
			},
		
		pack:function(){
			getFunc=function($func){
				$func = $func.toString(); 
				var body = $func.slice($func.indexOf("{") + 1, $func.lastIndexOf("}"));
				return body;
			}
			
			var _={
					obj:null,hdr:null};
				
			_.obj=this['header'];
			_.hdr=(_.obj.role==='applet')?'~A|':'~L|';
			
			try {
				this['debug']('Packing '+this['header'].name);
				_.obj = JSON.stringify(this['header']);
				_.obj = $m.pf.lzw.enc(_.obj);
				_.obj = _.hdr+_.obj;
				console.log(_obj.name+'->'+_.obj);
				return _.obj;		
			} catch (e) {
				this['error'](e,_,Array.prototype.slice.call(arguments, 0));
			}
			
			return false;
		},
		
		unpack:function($data){
			setFunc=function($func,$body) {
				this[$func]=$body;
			}
			
			var _={obj:null,hdr:''};
			
			try {
				this['debug']('Unpacking '+this['header'].name);
				_.hdr=$data.substring(0,3);
				if (_.hdr=='~A|' || _.hdr=='~L|') {
					_.obj=$data.substring(3,$data.length);
					_.obj=$m.pf.lzw.dec(_.obj);
					this['header']=JSON.parse(_.obj);
					if (_.obj['publisher']&&_.obj['name']&&_.obj['role']&&_.obj['local']) {
						//Insert Functions
						
						return _.obj;
					} else
						this['warn']('Valid object with invalid properies. Discarding.');					
				} else {
					this['warn']('Not a valid compiled Applet or Layout data.');
				}
			} catch (e) {
				this['error'](e,_,Array.prototype.slice.call(arguments, 0));
			}		
			return false;
		},
		
		/**
		 * Insert an applet into the DOM
		 *
		 * @param  {String} $html	HTML Content
		 * @param  {String} $into	ID of Element to insert into
		 * @memberof Applet
		 * @todo insert applet style and javascript
		 */
		embed:function () {
			this['debug']('Embeding '+this['header'].name);
			if (this.onShow) this.onShow();
			if (this['header'].script && this['header'].script.text.length>0) 
				M$['gei']("tail").appendChild(this['header'].script);
				
			if (this['header'].style && this['header'].style.textContent.length>0) 
				M$['get']("head")[0].appendChild(this['header'].style);

			var tmp = $("div[data-applet='"+this['header'].name+"']").append(this['header'].html);
			tmp[0].id=this.id;
			//this.setDraggable();
			this.setState(3);
		},

		/**
		 * Remove an applet from the DOM
		 * @returns	none
		 * @memberof Applet
		 * @todo Dont forget to remove the style and script!!!
		 */
		unbed:function () {
			if (!this.active) return;
			this['debug']('Unembeding '+this['header'].name);
			this.onUnloaded();
			this.active = false;
			if (this.onHide) this.onHide();
			$a=M$['get']('head')[0];
			$a.removeChild(this['header'].name+"_script");
			$a.removeChild(this['header'].name+"_style");
		},
			
		fetch:function(){
			var _={msg:null,fromLocal:false,applet:null};
			try {
				_.msg = "Received request for: "+this['header'].name+'... ';
				_.applet = r2wl['local']['getAppFile'](this['header'].name);
				if (this['vld'](_.applet)) {
					_.msg += "Found in local Storage.";
					this.onLoad(_.applet);
					_.fromlocal=true;
				}
				
				if (!_.fromLocal) {
					//See if the applet we want is in history (cached)
					//var tmp = this['Class']._history[$data.name];
					
					//if (typeof tmp != 'undefined') {
					//	this._tracker.fromCache++;
					//	_.msg += "Found in cache. ";
					//	this['debug']($msg,this);
					//	if (this['vld'](tmp.div)) this.onLoad(tmp.div);
					//	this.checkQue();
					//	return true;
					//} else if (!$fromlocal) {
					//	$msg += "Not cached. ";
				//	}
				}
				//No, We'll have to load it with Ajax				
				try {
					_.msg += "Requesting from via AJAX.";
					M$.xhr(
						this.uri,
						this._onLoad.bind(this),
						this._onError.bind(this),
						'get',
						null,
						false
					)
				} catch (e) { 
					this['error'](e,_,Array.prototype.slice.call(arguments, 0));
				}
				this['debug'](_.msg);

			} catch (e) {
				this['error'](e,_,Array.prototype.slice.call(arguments, 0));
			}
		},
			
		setDraggable:function() {
			$(function() {
				$('#wrapper').on('mousedown', 'div', function() {
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
		
		htmlToApplet:function($html){
			var _={div:null};
			try {
				_.div = window.document.createElement('div');
				_.div.innerHTML=$html;
				//Ok we have a Applet DOM Ready
				//Lets return to the factory and add it to our Applet
				return _.div.firstChild;
				
			} catch (e) {
				this['error'](e,_,Array.prototype.slice.call(arguments, 0));
			}
		},
		
		/**
		 * Called after applet is loaded (cache, Remote or Storage)
		 * 
		 * @memberof Applet
		 */
		onLoaded:function(){
			this.loaded = true;
			$evt=this['header'].name+"_onload";
			if (typeof window.$evt === 'function') {
				window.$evt();
			}
		},	

		/**
		 * Called after applet is loaded (cache, Remote or Storage)
		 * 
		 * @memberof Applet
		 */
		onUnLoaded:function(){
			this.unload = true;
			$evt=this['header'].name+"_onload";
			if (typeof window.$evt === 'function') {
				window.$evt();
			}
		},
		
		_onLoad:function($data) {
			if (!this['vld']($data)) {
				this['error']('No data return from Ajax Request.');//debug
				return false
			}
			
			$data = this.htmlToApplet($data);
			if ($data.tagName=='DIV' && $data['dataset']['name']) {
				this['debug']('Received '+this['header'].name);
				//Its a valid DOM Ready Applet, add it to the Mother Applet
				(function(a,d){
					a.onLoaded();
					for (var i=0;i<3;i++) {
						if (d.children[i].tagName=='STYLE') {
							a.header.style=d.children[0];
							a.header.style.id=a.id+"_style";
						} else if (d.children[i].tagName=='SCRIPT') {
							a.header.script=d.children[1];
							a.header.script.id=a.id+"_script";
						} else if (d.children[i].tagName=='DIV')
							a.header.html=d.children[2].innerHTML;						
					}
					for (var property in d.dataset) {
						a.header[property]=d.dataset[property];
					}				
					//a.header.onload=this.onLoaded();
					//a.header.onunload=this.onUnLoaded();
					
					//var b = a.pack();
					//var c = a.unpack(b);
					a.setState(2);
					r2wl.applets.scan($data.innerHTML,false);
					
				})(r2wl.applets.objects[$data['dataset']['name']],$data);			
				
			}
			
			//var level1 = r2wl.applets.getApplets($data.innerHTML,false);
			//for (var i=0;i<level1.length;i++){
			//	this.create(level1[i]);
			//}
			
			//r2wl.applets.scanAnchors($data.innerHTML);
			//Default Applet is now loaded, display it.

			//return $result;
		},
			
		_onError:function(data) {
			this['warn']('Error loading applet resource.');
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
