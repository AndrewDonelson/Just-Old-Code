/**
 * 
 * The Loader takes care of loading resources (downloading) and then notifying you when everything
 * is ready. The loader is a static class that will always be constructed by the engine and accessible through the
 * $m.df.loader member.
 * 
 * Using the loader you can load <a href='$m.df.Image'>$m.df.Image</a>'s, <a href='$m.df.DataResource'>$m.df.DataResources</a>'s,
 * and <a href='$m.df.Sound'>$m.df.Sound</a>'s.
 * 
 * Typically you use the loader from within your game class onReady method (called automatically by the engine).
 * 
 * TheGame = $m.df.Game.extend('TheGame',
 * {},
 * {
 *     onReady:function ()
 *     {
 *         this._super(); // call the base class' onReady
 *
 *         // disable caching when developing
 *         if ($m.df.devMode===true)
 *             $m.df.loader.setDisableCache();
 *
 *         // load up resources
 *         $m.df.loader.add(new $m.df.Image('spaceship', 'images/spaceship.png'));
 *
 *         // fire up the loader (with a callback once done)
 *         $m.df.loader.start(this.onLoading.bind(this), this.onLoaded.bind(this));
 *     },
 *
 *     onLoading:function (percentageComplete)
 *     {
 *         // display progress, such as a loading bar
 *     },
 *
 *     onLoaded:function ()
 *     {
 *         // we're ready; make the magic happen
 *     }
 * });
 * (end)
 * You can disable caching using setDisableCache. This is the default when in devMode (when the engine has not been
 * packed/minified.
 * @module R2WL
 * @extends $m.df.Base
 * @class  $m.df.Loader
 */
$m.df.Loader = $m.df.Base.extend('$m.df.Loader', {
	/** @lends $m.df.base */
},{
	State:{ QUEUED:0, LOADING:1, READY:2, FAILED:3 },

	timer:null,
	/** A hashtable of all the resources, keyed by the resource name */
	resources:new $m.df.CS2I.Hashtable(),
	/** Function called after each new resource has been loaded */
	loadingListener:null,
	/** Function called after all resources have been loaded or errored */
	loadedListener:null,
	/** Progress of the loader (number of items loaded so far) */
	progress:0,
	/** Total number of resources to be loaded */
	totalBeingLoaded:0,
	/** Number of resources that had a problem */
	errored:0,
	/** Optional baseURI prepended to resource URI's */
	baseUrl:'',
	times: {
		start:0,	//when loader started
		end:0,		//when loader ended
		lapsed:0	//total time loading?
	},
	/**
	 * True if loader.start() has been called. Typically resources use this to check
	 * if they should just load immediately (after game start) or hold on loading until the loader calls (triggered
	 * by loader.start()
	 */
	started:false,
	/** True if the resource loader has finished loading everything */
	finished:true,

	_noCacheString:'',

	/**
	 * Constructor -- typically called by the engine to automatically construct $m.df.loader.
	 * @method init
	 */
	init:function ()
	{
		this._super();
		_DBG_('Loader timer started.',this.Class);
		//this.timer = new $m.df.AccuTimer(-1, .5, 
		//	function()
		//	{
		//	  r2wl.loader.start();
		//	}
		//	,function() {_DBG_('Loader timer stopped.',this.Class);}		
	},

	/**
	 * Tells the resource loader to disable caching in the browser by modifying the resource src
	 * by appending the current date/time
	 * @method setDisableCache
	 */
	setDisableCache:function ()
	{
		this._noCacheString = '?nocache=' + Date.now();
	},

	/**
	 * Sets an optional listener
	 * @param  {Function} loadingListener Function to call when each resource is loaded
	 * @param  {Function} loadedListener Function to call when all resources have been loaded
	 */
	setListener:function (loadingListener, loadedListener)
	{
		this.loadingListener = loadingListener;
		this.loadedListener = loadedListener;
	},

	/**
	 * Add a resource to the loader queue
	 * @method add
	 * @param  {$m.df.Image|$m.df.Sound|$m.df.DataResource} resource Resource to load
	 */
	add:function (resource)
	{
		// resource.src already has the baseUrl set by the resource class (i.e. $m.df.Image)
		// so no need to add it here
		resource.name = resource.name.toLowerCase();
		this.resources.put(resource.name.toLowerCase(), { resource:resource, state:this.State.QUEUED });
		_DBG_('Adding resource ' + resource.src + ' to the queue.',this.Class);
	},

	/**
	 * Retrieve a resource from the loader
	 * @method get
	 * @param  String name Name of the resource
	 * @return {$m.df.Image|$m.df.Sound|$m.df.DataResource} Resource
	 */
	get:function (name)
	{
		var res = this.resources.get(name.toLowerCase());
		
		if (!$n('vld',res)) {
			this.error(this.uniqueId + 'Unable to get resource '+name+'. Did you forget to add it to the config?');
			res=null;
		}
		return res;
	},

	/**
	 * Get all the sound resources
	 * @method getAllSounds
	 * @return Array An array of all the sounds
	 */
	getAllSounds:function ()
	{
		var sounds = [],
			keys = this.resources.keys(),
			i,res;

		for (i = 0; i < keys.length; i++)
		{
			res = this.resources.get(keys[i]).resource;
			if (res.Class.isA('$m.df.Sound')) {
				sounds.push(res);
			}
		}
		return sounds;
	},

	/**
	 * Get all the image resources
	 * @method getAllImages
	 * @return Array An array of all the images
	 */
	getAllImages:function ()
	{
		var images = [],
			keys = this.resources.keys(),
			i,res;

		for (i = 0; i < keys.length; i++)
		{
			res = this.resources.get(keys[i]);
			if (res.isA('$m.df.Image')) {
				images.push(res);
			}
		}

		return images;
	},

	/**
	 * Starts the resource loader
	 * @method start
	 * @param  {Function} loadingListener Function to call after each resource is loaded
	 * @param  {Function} loadedListener Function to call after all resources have been loaded or errored.
	 * @return 
	 */
	start:function (loadingListener, loadedListener)
	{
		if (this.started) return;
		this.started = true;
		this.times.start = new Date().getTime();
		var i,keys,res;
		this.setListener(loadingListener, loadedListener);

		this.progress = 0;
		this.errored = 0;

		// ask all of the resources to get busy loading
		keys = this.resources.keys();

		for (i = 0; i < keys.length; i++)
		{
			res = this.resources.get(keys[i]);
			if (res.state === this.State.QUEUED)
			{
				res.resource.load(this._onLoad.bind(this), this._onError.bind(this), this._onError.bind(this));
				res.state = this.State.LOADING;
				this.totalBeingLoaded++;
			}
		}
		_DBG_('Loading ' + this.totalBeingLoaded + ' resource(s).',this.Class);
	},

	/**
	 * Generates a URL using a src string (by prepending the baseURL and appending the optional no-cache string
	 * @method makeUrl
	 * @param  String src Source URI
	 * @return String A full resource URI
	 */
	makeUrl:function (src)
	{
		return this.baseUrl + src + this._noCacheString;
	},
	
	/**
	 * Description
	 * @method _onLoad
	 * @param {} resource
	 * @return 
	 */
	_onLoad:function (resource)
	{
		var res = this.resources.get(resource.name);
		if (!$n('vld',res)) {
			this.error('Unable to get resource ['+resource.name+'] - Please make sure you are using all lowercase.');
		} else { 
			res.state = this.State.READY;
			this.progress++;

			if ($n('vld',this.loadingListener)) {
				this.loadingListener(Math.round((this.progress / this.totalBeingLoaded) * 100));
			}

			_DBG_(resource.Class.shortName+' - '+ resource.name + ' loaded (' + Math.round((this.progress / this.totalBeingLoaded) * 100) + '% done)',this.Class);
		}
		this._checkAllDone();
	},

	/**
	 * Description
	 * @method _onError
	 * @param {} resource
	 * @return 
	 */
	_onError:function (resource)
	{
		var res = this.resources.get(resource.name);
		res.state = this.State.FAILED;
		this.progress++;
		this.errored++;

		if ($n('vld',this.loadingListener)) {
			this.loadingListener(this.progress / this.totalBeingLoaded);
		}
		this.warn(resource.name + ' (' + resource.src + ') failed.');

		this._checkAllDone();
	},

	/**
	 * Description
	 * @method _checkAllDone
	 * @return 
	 */
	_checkAllDone:function ()
	{
		if (this.progress >= this.totalBeingLoaded)
		{
			this.times.end = new Date().getTime();
			this.times.lapsed = (this.times.start-this.times.end);
			this.finished = true;
			this.started = false;
			if ($n('vld',this.loadedListener)) this.loadedListener(this.progress, this.errored);
			_DBG_('Resource Loader idle.',this.Class);
			this.progress = 0;
			this.errored = 0;
			this.totalBeingLoaded = 0;
		}

	}
});
