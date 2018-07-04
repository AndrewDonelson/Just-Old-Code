/**
 * @class  h5c3.Applet
 * 
 * A Applet resource. You can use this class to acquire Applets (loaded from a URI) and then use them in your CloudApp
 */
h5c3.Applet = h5c3.Pooled.extend('h5c3.Applet', {
	_CLASSNAME: 'Applet',
	_CLASSVERSION:'0.1.0',

	params: {
		required: ['role','name','version','uuid'],
		optional: ['author','copyright','scale']
	},
	
	//True if this applet has 1 or more applets
	hasChildren:false,
	
	children:[],
	
	/**
	 * Constructs an Applet by acquiring it from the object pool. An applet had 4 required attributes
	 * ['role','name','version','uuid'] and 3 optional attributes ['author','copyright','scale'].
	 * 
	 * The name must be unique to your Applet Store. The UUID must be a valid and H5C3 Genuine which matches it
	 * to you, company or personal. It is strongly suggested that you use the version. End Users have the option
	 * of Automatically using the latest Applications and Applets, but that usually means stability issues. Using
	 * the version allows for saftey and less issues.
	 *
	 * @param  
	 * {h5c3.url} url url to the applet - http://applets.i2tmlabs.com/ + path/to/applet/applet.someAppletName.html
	 * @return {h5c3.Applet} A h5c3.Applet if successful, Applet Name if failed.
	 */
	create: function($data)
	{
		var n = this._super();
		if (ISA($data)==="Object:Simple" && $data.header.name!==null) {
			for (var $key in $data) {
				n[$key] = $data[$key];
			}
			
		} 
		
		if (n.parse($data))
			return n
		else
			return n.name;
	}	
},
/** Interface: h5c3.Applet.prototype */
{
	/** the Applets stylesheet-will be added/removed to head automatically */
	style:'',

	/** the Applets javascript-will be added/removed to head automatically */
	script:'',

	/** the Applets html- place as variable {$applet:someAppletName} */
	html:'',
	
	/** Source URI used to load the image */
	src:null,

	header: {
		/** Applets Name */
		name:null,
		
		/** Applets version */
		version:'',
			
		/** Applets Universally unique identifier */
		uuid: '',
		
		role: '',
		
		author: '',
		
		copyright: ''
	},
	
	/** When the this object was created */
	created: 0,				
	
	/** when the this object was last used */
	accessed: 0,

	/** Loaded, parsed, Verified and ready to use? */
	ready: false,

	/** Whether the image has been loaded yet */
	loaded:false,
	
	/** is this applet con the current page? yes make it active otherwise disable it **/
	active: false,
	
	
	/**
	 * Constructs a new h5c3.Applet. If the h5c3.loader has already started then the image will be
	 * immediately loaded, otherwise it will wait for the resource loader to handle the loading.
	 * @param  String name Name to give the image resource
	 * @param  String src URI for the image
	 */
	init:function ()
	{
		this._super();	
	},

	//me:function() {
	//	return this.uniqueId+" : "+this.header.name+" v"+this.header.version+"("+this.header.uuid+")";
	//},
	
	scanForApplets:function($html) {
		var $self=false;
		CHK($html,"");
		if ($html==="self") {
			$html = this.$html
			$self=true;
		} else if (VLD($html)) { 
			$html = $($html); 
		} else { 
			$html = $("body"); 
		}
		if (!VLD($html)) return 0;
		_DBG_('Scanning '+$html[0].nodeName+' for applets...',this.Class);
		
		//Ok we found all applets (if any)
		var $DIVs = $($html).find("div").filter(function(data) {
			return $(this).data("applet") !== undefined;
		});
		if ($self && $DIVs.length>0) this.hasChildren=true;
		return $DIVs
	},
	
	embed:function ($html,$into) {
		//if (this.active) return;	
		var tmp = $("div[data-applet='"+this.header.name+"']").append($html);		
		this.active = true;
		this.setDraggable();
	},

	unbed:function () {
		if (!this.active) return;
		this.active = false;
		// dont forget to remove the style and script!!!
	},
		
	setDraggable:function() {
		$(function() {
			$('#VIEWPORT').on('mousedown', 'div', function() {
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
	parse:function($data) {
		var $result = true, $el=null;

		if (ISA($data)==="Object:Simple" && $data.header.name!==null) 
			$el=$data; 
		else {
			$el=$($data);
			this.header = h5c3.r2wl.parseHeader($el[0].dataset);
			if (!this.header) return false;
			$data = $($data).not("comment").not("text");
		}
		
		for (i=0;i<$data.length;i++) {
			if ($data[i].dataset.role==='applet' && $data[i].dataset.type==='content') {
				this.html = $data[i].outerHTML
			} else if ($data[i].dataset.role==='applet' && $data[i].dataset.type==='style') {
				this.style = $data[i].outerHTML;
			} else if ($data[i].dataset.role==='applet' && $data[i].dataset.type==='script') {
				this.script = $data[i].outerHTML;				
			}
		}
		
		//Hide it initially - it will fade in 
		if (this.style)		h5c3.r2wl.app.stylesheet.add(this.header.name,this.style,'Applet');
		if (this.script)	h5c3.r2wl.app.stylesheet.add(this.header.name,this.script,'Applet');
		if (this.html) {
			this.embed(this.html);
		}	
		return $result;
	},
		
	makeHeader:function($role,$name,$version,$uuid) {
		if (!VLD($role)) $role = "applet";
		if (!VLD($name)) $name = "Noname";
		if (!VLD($version)) $version = "0.0.1";
		if (!VLD($uuid) || !h5c3.r2wl.validUUID($uuid)) $uuid = h5c3.r2wl.generateUUID();
		
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
	
	parseStyle:function($data) {
		return $($data).filter("style").each(function(data) {
			h5c3.r2wl.app.stylesheet.add(this.header.name,this.outerHTML,'Applet');
			return this.outerHTML.toString();
		});		
	},
	
	parseScript:function($data) {
		return $($data).filter("script").each(function(data) {
			h5c3.r2wl.app.stylesheet.add(this.header.name,this.outerHTML,'Applet');
			return this.outerHTML.toString();
		});		
	},
	
    /**
	 * @method verify()
	 *
	 * Scans a applet and verifies that it is contructed/configured correctly. All applets need a minimum
	 * of 4 data attributes (role, name, version and uuid)
     * 
	 * @param
	 * None
	 *
	 * @return 
	 * None
     */		
	verify:function($applet,$autofix) {
		var $result,$uuid,$name,$version,$wrapper,$content = false;
		var $msg="Validating->";
		$result=0;

		//Check for applet role
		if (!VLD($applet.dataset.role)) {
			$msg+="Missing data-role->"
			if ($autofix) {
				$applet.dataset.role="applet";
				$msg+="Fixed->"; 
			} else $result++;
		} //End Role
		
		if (!VLD($applet.dataset.name)) {
			$msg+="Missing data-name->";
			if ($autofix) {
				$applet.dataset.name="GIVE_ME_A_NAME";
				$msg+="Fixed->"; 
			} else $result++;

		} else if ($applet.dataset.name==="") {
			$msg+="data-name is empty->";
			if ($autofix) {
				$applet.dataset.name="GIVE_ME_A_NAME";
				$msg+="Fixed->"; 
			} else $result++;
		} //End Name
		
		if (!VLD($applet.dataset.version)) {
			$msg+="Missing data-version->";
			if ($autofix) {
				$applet.dataset.version="0.0.1";
				$msg+="Fixed->"; 
			} else $result++;
		} else if ($applet.dataset.version==="") {
			$msg+="data-version is empty->";
			if ($autofix) {
				$applet.dataset.name="0.0.1";
				$msg+="Fixed->"; 
			} else $result++;
		} //End Version
		
		//Validate/Create UUID
		if (!h5c3.r2wl.validUUID($applet.dataset.uuid)) {
			$msg+="Missing data-uuid->"
			if ($autofix) {
				if ($applet.dataset.uuid = h5c3.r2wl.generateUUID()) {
					$msg+="Created UUID->"; 
				} else {
					$msg+="Aborted: Unable to generateUUID."; 
				}
			} else $result++;
		} //End UUID
			
		if ($result===0 && $autofix!=true) {
			$msg+="PERFECT!->"; 		
		} else {
			$msg+="Failed ("+$result+") issues->"; 		
		}
		$msg+="Done."; 		
		return {result:$result,message:$msg,applet:$applet}		
	}		
});


/**
 * @class  h5c3.AppletFactory
 *
 * For creating entities (mostly just an interface class you extend from to create an entity factory).
 * No need to create an instance yourself...it is created automatically by Game::onReady()
 *
 * 
 *	h5c3.entityFactory = new AppletFactory();
 * (end)
 */
h5c3.AppletFactory = h5c3.Factory.extend('h5c3.AppletFactory',  {
	_CLASSNAME: 'AppletFactory',
	_CLASSVERSION:'0.3.1',
	
	getAppletPath:function($usecfg) {
		if ($usecfg && h5c3.config.options.path!='') 
			return h5c3.config.options.path+'applets/';
		else
			return h5c3.path.home+h5c3.path.applets;
	}
},{
	//Private array that stores elements name if it was scanned for links
	_scanned: [],

	//Private array that stores a history of applets to keeep form reloading. Page Reload wipes this
	_history: [],
	
	//Private array that stores elements name if it is waiting to be loaded
	_loadQue: [],
	
	started: false,
	
	r2wl: null,
	
	style: null,
	
	layout: null,
	
	_tracker: {
		failed: 0,
		loading: 0,
		loaded: 0,
		fromConn: 0,
		fromCache: 0,
		loops: 0,
		indexed:false
	},
		
	throttle: null,			//AJAX/Applet Throttle

	/**
	 * Initialization Method
	 */	
	init:function($r2wl) 
	{
		this._super('Applet');
		this.r2wl = $r2wl;
	},
		
	/**
	 * Called by the entity loader
	 *
	 * @param  {Object}		$data String type of the entity to create
	 * {h5c3.Layer} layer Layer the entity should be placed on
	 * @return {h5c3.Applet}
	 */
	create:function ($data)
	{		
		//load applet
		return this.requestApplet($data);
	},
	
	add:function($name,$obj) {
		this._super($name,$obj);
		
	},
	
	reset:function() {
		this._loadQue	= [];
		this._tracker	= {failed:0, loading: 0,loaded: 0,fromConn: 0,fromCache: 0,loops: 0};
	},

	stop:function() {
		this.started	= false;	
	},
	
	//Start loading all applets in our que
	start:function() {
		if (this.started) return;
		this.reset();
		this.started = true;
	},
	
	/**
	 * @method onHREFClick()
	 *
	 * Any Cloud Application links are captured and handled here. It tells the asks to use the
	 * applet detected in onClick event. The applet is aquired from cache or network and then
	 * is scanHTMLned or other applets via static include or links and added to the load que.
     * 
	 * @param
	 * EVENT	e		onClick event
	 *
	 * @return 
	 * 	None
     */	
	onHREFClick:function($evt) {
		try {
			h5c3.r2wl.app.applets.setpage(this.name);
		} catch (e) {
			AST(null,printStackTrace({e:e}));
		}
	},

	setpage:function($applet_name) {
		try {
			var $applet = h5c3.r2wl.app.applets.use({name:$applet_name}), $tmp;
			if (!$applet) return;
				var $DIVs = $applet.scanForApplets("self");
				
				for (i=0;i<$DIVs.length;i++) {
					var $name=$($DIVs[i]).attr('data-applet');
					$tmp = h5c3.r2wl.app.applets.use({name:$name});
					var tmp = $("div[data-applet='"+this.header.name+"']").append($html);		
				}
						
			if ($("#VIEWPORT").css("opacity")!="0") {
				this.lastContent = GEI("VIEWPORT").innerHTML;
				$("#VIEWPORT").fadeOut(250, function() {
					GEI("VIEWPORT").innerHTML =  $applet.html;
					$("#VIEWPORT").fadeIn(250,"linear");				
				});				
				//save current app & page to localstorage for resume
				h5c3.local.setAppCfg('currentPage',$applet.name);
			}
		} catch (e) {
			AST(null,printStackTrace({e:e}));
		}		
	},
	
    /**
	 * @method scanAnchors()
	 *
	 * Scans HTML document (CloudApp) or Loaded Applets for link to other applets and adds them to laod que
     * 
	 * @param	HTML		$html		optional html (applet) to seaqrch for other applets (nested)
	 *
	 * @return 	ARRAY 		All Applets detected in $HTML or BODY if no parameter
     */	
	scanAnchors:function($html) {
		var $msg="Scanning ",$elName,total=0,cached=0,load=0;
		if (VLD($html)) { $html = $($html); } else { $html = $("body"); }

		if ($html[0].id!="") {
			//Its in history..then we are ready scanned it.
			$elName=$html[0].id; 
			
			if (this._scanned.indexOf($elName) != -1) return true;
		} else {
			$elName=$html[0].nodeName;
		}
		
		$msg+=$elName+' for Links...';
		var links = GET('a');
		for (i = 0; i < links.length; i++) {
			//Possible Applet Link?
			if (links[i].hash!="") {
				var n=links[i].hash.split(".");
				if (n[0]=='#applet') {
					if (n[1]!="") {
						//Yep, its a applet link, add handler and pre-cache it
						links[i].addEventListener('click', this.onHREFClick, false);
						
						if (this._scanned.indexOf(n[1]) === -1) {
							this._loadQue.push(n[1]);
							this._scanned.push(n[1]);
							load++;
						} else {
							cached++;
						}
							
						links[i].name=n[1];
						
						total++;
					}
				}
			}
			
		}
		_DBG_($msg+'Found '+total+' linked applets. [Cached:'+cached+', Qued:'+load+', Total:'+total+']',this.Class);
		return total;
	},
	
    /**
	 * @method scanHTML()
	 *
	 * Scans HTML document (CloudApp) for all elements with a [data-applet] tag and saves them in the HashTable
	 * This does not scanHTML a applet for data-tags - that is handled by the Applet class.
     * 
	 * @param
	 * 	HTML		$html		optional html (applet) to seaqrch for other applets (nested)
	 *
	 * @return 
	 *	ARRAY 		All Applets detected in $HTML or BODY if no parameter
     */	
	scanHTML: function ($html) {
		var $setActive;
		
		if (VLD($html)) { 
		//	$html = $($html); 
			$setActive = false;		//[Not in use] - its in the cache so its not visible
		} else { 
		//	$html = $("body"); 
			$setActive = true;		//[In use] - its inthe app body so its visible
		}
		
		var DIVs = h5c3.Applet.prototype.scanForApplets($html);
		
		for (i=0;i<DIVs.length;i++) {
			if ($setActive === true) 
				DIVs[i].style.display = 'block';
			else 
				DIVs[i].style.display = 'none';
				
			this._loadQue.push(DIVs[i].dataset.applet);
		}
		//How many Applets from Static Includes? (In Page)
		this._tracker.loading = this._loadQue.length;
		
		_DBG_('A total of '+this._tracker.loading+' applets were found.',this.Class);
		
	},

	checkQue:function() {
		_DBG_('Checking Que...',this.Class);
		if (this._loadQue.length<=0) {
			//auto resume
			var $resume = h5c3.local.getAppCfg('currentPage');
			if (VLD($resume)) this.setpage($resume);
			return true;
		}
		//No Duplicates		
		if (this._loadQue.length>2) {
			var $uniqueQue = this._loadQue.filter(
				function(elem, pos) {
					return h5c3.r2wl.app.applets._loadQue.indexOf(elem) == pos;
				});	
			this._loadQue = $uniqueQue;
		}

		this._tracker.loading=this._loadQue.length;
		//load one from que.
		//var $applet = this._loadQue.pop();
		var $applet = this._loadQue.shift();
		this.requestApplet({ name: $applet });
	},
	
    /**
	 * requestApplet()
	 *
	 * Desc
     * 
	 * @param
	 * None
	 *
	 * @return 
	 * None
     */		
	requestApplet:function($data) {
		if (!VLD($data)) return false;
		
		var $msg = "Received request for: "+$data.name+'... ';
		var $fromlocal=false;
		var $applet = h5c3.local.getAppFile($data.name);
		if (VLD($applet)) {
			$msg += "Found in local Storage.";
			this.onLoad($applet);
			$fromlocal=true;
		}
		
		//See if the applet we want is in history (cached)
		var tmp = this._history[$data.name];
		
		if (typeof tmp != 'undefined') {
			this._tracker.fromCache++;
			$msg += "Found in cache. ";
			_DBG_($msg,this.Class);
			if (VLD(tmp.div)) this.onLoad(tmp.div);
			this.checkQue();
			return true;
		} else if (!$fromlocal) {
			$msg += "Not cached. ";
		}

		//No, We'll have to load it with Ajax
		this._history[$data.name] = {name:$data.name,src:this.Class.getAppletPath(1)+'applet.'+$data.name+'.html',div:$data.div};
		if (!$fromlocal) {
			try {
				$msg += "Requesting remote transfer. ";
				h5c3.XHR(this._history[$data.name].src,h5c3.bind(this, this.onLoad),h5c3.bind(this, this.onError));									
			} catch (e) { 
				AST(null,printStackTrace({e:e}));
			}
		}
		_DBG_($msg,this.Class);
	},

	_checkAllDone:function() {		
		if (this._loadQue.length<=0) {
			//All Applets have been loaded
			_DBG_("Load Complete. Cache: "+this._tracker.fromCache+", Remote: "+this._tracker.fromConn+", Failed: "+this._tracker.failed+", Total: "+this._tracker.loaded,this.Class);
			this.stop();			
			return true;
		} else {
			this.checkQue();
			this._tracker.loops++;
			if (this._tracker.loops > this._tracker.loading) {
				return true;
			}
			return false;
		}	
	},
	
	onLoad:function($data) {
		if ($data==="") return false;
		var $fromlocal;
		var a = ISA($data);
		if (ISA($data) ==="Object:Simple") {
			//we got it from localstorage already created.
			$fromlocal = true;
			//$obj = $data;
			//$data.parse($data);
			var $obj = h5c3.Applet.create($data);
		} else {
			//Create an applet loaded from net
			$fromlocal = false;
			var $obj = h5c3.Applet.create($data);
		}
		
		this._tracker.loaded++;
		this._tracker.loading--;
		
		if (typeof $obj === "object") {
			if (!$fromlocal) 
				h5c3.local.setAppFile($obj.header.name,$obj);
			else 
				if ($obj.header.name in this._history && (typeof this._history[$obj.header.name].src !== 'undefined')) 
					$obj.src = this._history[$obj.header.name].src;
				//if (this._history[$obj.header.name].src) $obj.src = this._history[$obj.header.name].src;
				
			this._tracker.fromConn++;
			this.scanHTML($obj.html);		
			this.scanAnchors($obj.html)
			$result = h5c3.r2wl.app.applets.add($obj.header.name,$obj)
		} else {
			//Remove Applet we just created. Remove from History as well. Display message
			this._tracker.failed++;
			delete this._history[$obj];
			this.remove($obj);
			_DBG_(["Unable to identify applet, discarding.",$data]);
			$result = false;
		}

		this.started = !this._checkAllDone();
		
		return $result;
	},
		
	onError:function(data) {
		return null	
	},
	
	onReady:function() {
		if (this.started) return;
		this.scanHTML();		
		this.scanAnchors();
		this.checkQue();
	}
});
