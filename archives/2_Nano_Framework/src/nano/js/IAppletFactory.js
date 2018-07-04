/**
 * For creating entities (mostly just an interface class you extend from to create an entity factory).
 * No need to create an instance yourself...it is created automatically by Game::onReady()
 * entityFactory = new AppletFactory();
 *
 * @class I$AppletFactory
 * @extends I$Factory
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Factory',

	//What is the name of your new interface?
	'I$AppletFactory',
	
	/** @lends I$Factory */
	{		
		/** 
		 * This is an API so there can only be one instance.
		 *
		 * @property {number} maxTotalObjects
		 * @expose 
		 */
		maxTotalObjects:0,
		
		//Private array that stores elements name if it was scanned for links
		_scanned: [],

		//Private array that stores applets name and attributes if it is currently active
		_active: [],
		
		//Private array that stores a history of applets to keep form reloading. Page Reload wipes this
		_history: [],
		
		//Private array that stores elements name if it is waiting to be loaded 
		_loadQue: []
	},
	/** @lends I$Factory.prototype */
	{

		started: false,
		
		finished: false,
		
		_tracker: {
			failed: 0,
			loading: 0,
			loaded: 0,
			fromConn: 0,
			fromCache: 0,
			loops: 0,
			indexed:false
		},
			
		/**
		 * Initialization Method
		 */	
		init:function() 
		{
			this['_super']('Applet');
		},
			
		/**
		 * Called by the entity loader
		 *
		 * @param  {Object}		$data String type of the entity to create
		 * {Layer} layer Layer the entity should be placed on
		 * @return {Applet}
		 */
		create:function ($data)
		{		

			var _={obj:null,attr:[]};
			try {		
				_.obj=create('I$Applet',[$data]);
				//($data);
				//if (this['Class']._scanned[_.obj.name]){
				if (_.obj['state']===4){
					delete(_.obj);
				} else if (_.obj.state===0) {
					this.add(_.obj.id,_.obj);
					_.obj.setState(1); //changed to queued
				}
			} catch (e) {
				this['error'](e,_,Array.prototype.slice.call(arguments, 0));
			}	
		},
		
		add:function($name,$obj) {
			this['_super']($name,$obj);
			this['Class']._scanned.push($name);
		},
		
		reset:function() {
			this['debug']('Reset load que.');
			this['Class']._loadQue	= [];
			this._tracker	= {failed:0, loading: 0,loaded: 0,fromConn: 0,fromCache: 0,loops: 0};
		},

		stop:function() {
			//pld();
			this['debug']('Loader stopped.');
			this.started	= false;
			this.finished	= true;
			this.reset();
		},
		
		//Start loading all applets in our que
		start:function() {
			if (this.started) return;
			this['debug']('Loader started.');
			this.started = true;
			this.finished = false;
			r2wl.ready = false;
		},
		
		scan:function($html) {
			//Get layouts document
			var level1 = this.getApplets($html,false);
			for (var i=0;i<level1.length;i++){
				div_i=level1[i];
				this.create(level1[i]);
				// var level2 = this.getApplets(level1[i].innerHTML,false);
				// for (var j=0;j<level2.length;j++){
					// div_j=level2[j];
					// this.create(level2[j]);
					// var level3 = this.getApplets(level2[j].innerHTML,false);
					// for (var k=0;k<level3.length;k++){
						// div_k=level3[k];
						// this.create(level3[k]);
					// }
				// }
			}
			//this.requestApplet({name:nldr['config']['app'].layout});		
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
				r2wl.applets.setpage(this.name);
			} catch (e) {
				ast(null,e.stack);
			}
		},

		onHREFHover:function($evt) {},
		
		/**
		 * @method isActive
		 *
		 * Will return true if the given applet is currently active (should be embeded( otherwise false.
		 * 
		 * @param	{string}	$applet
		 * @return {boolean}
		 * @memberof AppletFactory
		 */	
		isActive:function($applet){
			return (typeof this['Class']._active[$applet] == "object")?true:false;
		},
		
		setpage:function($applet_name) {
			if ($applet_name==="") return;
			try {
				var $applet = r2wl.applets.use({name:$applet_name}), $tmp;
				if (!$applet) return;
					var $DIVs = this.getApplets("self");
					
					for (i=0;i<$DIVs.length;i++) {
						var $name=$($DIVs[i]).attr('data-applet');
						$tmp = r2wl.applets.use({name:$name});
						var tmp = $("div[data-applet='"+this['header'].name+"']").append($html);		
					}
							
				if (nldr['config']['options'].crossfade) {
					if ($("#main").css("opacity")!="0") {
						this.lastContent = M$['gei']("main").innerHTML;
						$("#main").fadeOut(250, function() {
							M$['gei']("main").innerHTML =  $applet.html;
							$("#main").fadeIn(250,"linear");				
						});				
					}
				} else {
					this.lastContent = M$['gei']("main").innerHTML;
					M$['gei']("main").innerHTML =  $applet.html;
				}
				//save current app & page to localstorage for resume
				r2wl['local'].setAppCfg('currentPage',$applet.name);
			} catch (e) {
				ast(null,e.stack);
			}		
		},
		
		/**
		 * @method scanAnchors()
		 *
		 * Scans HTML document (CloudApp) or Loaded Applets for link to other applets and adds them to laod que
		 * 
		 * @param	HTML		$html		optional html (applet) to search for other applets (nested)
		 *
		 * @return 	ARRAY 		All Applets detected in $HTML or BODY if no parameter
		 */	
		scanAnchors:function($html) {
			var _={};
			try {
				var $msg="Scanning ",$elName,total=0,cached=0,load=0;
				if (this['vld']($html)) { $html = $($html); } else { $html = $("body"); }

				if ($html[0].id!="") {
					//Its in history..then we already scanned it.
					$elName=$html[0].id; 
					
					if (this['Class']._scanned.indexOf($elName) != -1) return true;
				} else {
					$elName=$html[0].nodeName;
				}
				
				$msg+=$elName+' for Links...';
				var links = get('a'),$shared=false;
				for (i = 0; i < links.length; i++) {
					//Possible Applet Link?
					if (links[i].hash!="") {
						var n=links[i].hash.split(".");
						if (n[0]=='#applet') {
							if (n[1]!="") {
								//Yep, its a applet link, add handler and pre-cache it
								links[i].addEventListener('click', this.onHREFClick, false);
								links[i].addEventListener('hover', this.onHREFHover, false);
								if (this['Class']._scanned.indexOf(n[1]) === -1) {
									$shared = (links[i].dataset.shared!="") ? true : false;	
									this['Class']._loadQue.push({name:n[1],shared:$shared});
									this['Class']._scanned.push(n[1]);
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
				this['debug']($msg+'Found '+total+' linked applets. [Cached:'+cached+', Qued:'+load+', Total:'+total+']');
				return total;

			} catch (e) {
				this['error'](e,_,Array.prototype.slice.call(arguments, 0));
			}	
		},
		
		
		/**
		 * Scans the HTML of an applet for more embedded applets
		 * @param  {String} $html	HTMl Content
		 * @returns	{Array}	array of all applets found (divs)
		 * @memberof Applet
		 */
		getApplets:function($html,$layout) {
			var _={role:null,roleName:null};

			try {
				var $self=false;
				
				_.role=($layout==true||$layout==false)?$layout:false;
				_.roleName=($layout==true)?'layout':'applet';
				
				if ($html==="self") {
					$html = this.$html
					$self=true;
				} else if (this['vld']($html)) { 
					$html = $($html); 
				} else { 
					$html = $("body"); 
				}
				if (!this['vld']($html)) return 0;
				this['debug']('Scanning '+$html[0].nodeName+' for '+_.roleName+'s...');
				
				//Ok we found all applets (if any)
				var $DIVs = $($html).find("div").filter(function(data) {
					return $(this).data(_.roleName) !== undefined;
				});
				
				if ($self && $DIVs.length>0) this.hasChildren=true;
				return $DIVs
			} catch (e) {
				this['error'](e,_,Array.prototype.slice.call(arguments, 0));
			}
			return [];
		},

		/**
		 * @method findApplets
		 *
		 * Scans HTML document (CloudApp) for all elements with a [data-applet] tag
		 * and saves them in the HashTable This does not scanHTML a applet for data-tags -
		 * that is handled by the Applet class.
		 * - Scan BODY and add to que - for each applet found:
		 * - scan Applet HTML and add to que
		 * - Scan Applet for Links to Other applets add to que
		 * - make sure que is unique applets
		 * - find MAIN applet and push load que
		 * - find ACTIVE applets and push to load que
		 * - 
		 * @param 	HTML	$html	optional html (applet) to search for other applets (nested)
		 * @return  ARRAY	All Applets detected in $HTML or BODY if no parameter
		 */	
		findApplets:function($html,$setActive) {
			
			//Get Data attributes
			getAttributes=function($self,$where,$id,$active) {
				var _={};
				try {
					var $attr,$foo,$data={};
					$el=M$['gei']($id);
					$attr=M$.gda($id,1); 
					$foo=$($where).find($id);
					if ($attr!=false && $attr.applet!='') {
						$data.name=$id;
						$data.target= (typeof $attr.target==M$.db[0][7])?$html.parentElement:$attr.target;
						if ($data.target==null) $data.target="body";
						$data.shared= (typeof $attr.shared==M$.db[0][7])?'publisher':'shared';
						$data.active= $active;
						$data.path=	nldr['getPath']('applets',$data.shared);
						$self.Class._loadQue.push($data);
						return $data;
					}
				} catch (e) {
				this['error'](e,_,Array.prototype.slice.call(arguments, 0));
				}
			}
			
			var _={};
			try {
				var DIVs,$attr,$data,$shared=false;
				$html=(!this['vld']($html))?$html=get("body")[0]:$html=$($html)[0];
				
				//if we are scanning the body then set all applets to active
				$setActive=(typeof $setActive===M$.db[0][7])?0:1;	
				
				//Set this applets data
				//$data=($html.tagName=="BODY")?null:getAttributes(this,$html,$html.id,$setActive);
				
				//Scan this applet for applets
				DIVs = this.getApplets($html);
				
				//Process any applets we found
				for (i=0;i<DIVs.length;i++) {
					//no id? add it
					if (DIVs[i].id==="") DIVs[i].id=DIVs[i].dataset.applet;
					$data=getAttributes(this,$html,DIVs[i].id,$setActive);	
					this['Class']._active[DIVs[i].dataset.applet] = $data;			
					DIVs[i].style.display = ($setActive) ? 'block' : 'none';
				}
				
				//How many Applets from Static Includes? (In Page)
				this._tracker.loading = this['Class']._loadQue.length;
				
				this['debug']('A total of '+this._tracker.loading+' applets were found.');		

			} catch (e) {
				this['error'](e,_,Array.prototype.slice.call(arguments, 0));
			}
			
		},
		
		checkQue:function() {
			this['debug']('Checking Que...');
			//Are there applets in the que? if so start the loader.
			if (this['Class']._loadQue.length>0&&this.started==false) this.start();
			
			if (this['Class']._loadQue.length<=0) {
				//auto resume
				var $resume = r2wl['local'].getAppCfg('currentPage');
				if (this['vld']($resume)) 
					this.setpage($resume);
				else
					this.setpage(nldr['config']['app'].applet);
				
				return true;
			}
			//No Duplicates		
			if (this['Class']._loadQue.length>2) {
				var $uniqueQue = this['Class']._loadQue.filter(
					function(elem, pos) {
						return r2wl.applets.Class._loadQue.indexOf(elem) == pos;
					});	
				this['Class']._loadQue = $uniqueQue;
			}

			this._tracker.loading=this['Class']._loadQue.length;
			//load one from que.
			this.requestApplet(this['Class']._loadQue.shift());
			this._checkAllDone();
		},
		
		/**
		 * Request an applet. Verified good request data, then tries to load it from device storage.
		 * If not is storage it will check current memory (history) and load it.
		 * If all else fails it is obtained from server via AJAX request.
		 *
		 * @method requestApplet()
		 * 
		 * @param {mixed} $data
		 * @return none
		 */		
		requestApplet:function($data) {
			var _={};
			try {
				if (!this['vld']($data)||(typeof $data.target==M$.db[0][7])) return false;
				
				var $msg = "Received request for: "+$data.name+'... ';
				var $fromlocal=false;
				var $applet = r2wl['local'].getAppFile($data.name);
				if (this['vld']($applet)) {
					$msg += "Found in local Storage.";
					this.onLoad($applet);
					$fromlocal=true;
				}
				
				//See if the applet we want is in history (cached)
				var tmp = this['Class']._history[$data.name];
				
				if (typeof tmp != 'undefined') {
					this._tracker.fromCache++;
					$msg += "Found in cache. ";
					this['debug']($msg);
					if (this['vld'](tmp.div)) this.onLoad(tmp.div);
					this.checkQue();
					return true;
				} else if (!$fromlocal) {
					$msg += "Not cached. ";
				}

				//No, We'll have to load it with Ajax
				if ($data.name=="") return false;
				this['Class']._history[$data.name] = {
					name:$data.name,
					src:nldr['getPath']('applets',$data.shared)+'applet.'+$data.name+'.html',
					div:$data.div
				};
				if (!$fromlocal) {
					try {
						$msg += "Requesting from via AJAX.";
						M$.xhr(this['Class']._history[$data.name].src,bnd(this,this.onLoad),bnd(this,this.onError),'get',null,false);//works
					} catch (e) { 
						ast(e.stack);
					}
				}
				this['debug']($msg);

			} catch (e) {
				this['error'](e,_,Array.prototype.slice.call(arguments, 0));
			}
		},

		_checkAllDone:function() {		
			if (this['Class']._loadQue.length<=0) {
				//All Applets have been loaded
				this['debug']("Load Complete. Cache: "+this._tracker.fromCache+", Remote: "+this._tracker.fromConn+", Failed: "+this._tracker.failed+", Total: "+this._tracker.loaded);
				this.stop();			
				r2wl.ready = true;
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
			this._checkAllDone();
			if (!this['vld']($data)) {
				this['error']('No data return from Ajax Request.');
				return false;
			}
			var $fromlocal;
			var a = ISA($data);
			if (ISA($data) ==="Object:Simple") {
				//we got it from localstorage already created.
				$fromlocal = true;
				var $obj = Applet.create($data,this['Class']._active);
				$result = r2wl.applets.add($obj.header.name,$obj)
			} else {
				//Create an applet loaded from net
				$fromlocal = false;
				var $toObj=$($data);
				var $obj = Applet.create($data,this.isActive($toObj[0].dataset.name));
			}
						
			this._tracker.loaded++;
			this._tracker.loading--;
			
			if (typeof $obj === "object") {
				if (!$fromlocal) 
					//r2wl['local'].setAppFile($obj.header.name,$obj);
					$obj=$obj;
				else 
					if ($obj.header.name in this['Class']._history && (typeof this['Class']._history[$obj.header.name].src !== 'undefined')) 
						$obj.src = this['Class']._history[$obj.header.name].src;
					
				this._tracker.fromConn++;
				this.scan($obj.html);		
				this.scanAnchors($obj.html)
				$result = r2wl.applets.add($obj.header.name,$obj);
				//TODO: Fix Applet Events
				//if ($result.onLoaded) $result.onLoaded();

				//Default Applet is now loaded, display it.
				if ($obj.header.name==nldr['config']['app'].applet) 
					r2wl.applets.setpage($obj.header.name);
			} else {
				//Remove Applet we just created. Remove from History as well. Display message
				this._tracker.failed++;
				delete this['Class']._history[$obj];
				this.remove($obj);
				this['warn'](("Unable to identify applet, discarding. [").toString($data)+"]");
				$result = false;
			}

			return $result;
		},
			
		onError:function(data) {
			return null	
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
