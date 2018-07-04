
/**
 * Playcraft Engine - (C)2012 Playcraft Labs, Inc.
 * See licence.txt for details
 */

/**
 * @class  h5c3.Loader
 * 
 * 
 * 
 * The Loader takes care of loading resources (downloading) and then notifying you when everything
 * is ready. The loader is a static class that will always be constructed by the engine and accessible through th
 * h5c3.loader member.
 * 
 * Using the loader you can load <a href='h5c3.Image'>h5c3.Image</a>'s, <a href='h5c3.DataResource'>h5c3.DataResources</a>'s,
 * and <a href='h5c3.Sound'>h5c3.Sound</a>'s.
 * 
 * Typically you use the loader from within your game class onReady method (called automatically by the engine).
 * 
 * TheGame = h5c3.Game.extend('TheGame',
 * {},
 * {
 *     onReady:function ()
 *     {
 *         this._super(); // call the base class' onReady
 *
 *         // disable caching when developing
 *         if (h5c3.devMode===true)
 *             h5c3.loader.setDisableCache();
 *
 *         // load up resources
 *         h5c3.loader.add(new h5c3.Image('spaceship', 'images/spaceship.png'));
 *
 *         // fire up the loader (with a callback once done)
 *         h5c3.loader.start(this.onLoading.bind(this), this.onLoaded.bind(this));
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
 */

h5c3.Loader = h5c3.Base.extend('h5c3.Loader', {
	_CLASSNAME: 'Loader',
	_CLASSVERSION:'0.6.3'
},{
	State:{ QUEUED:0, LOADING:1, READY:2, FAILED:3 },

	timer:null,
	/** A hashtable of all the resources, keyed by the resource name */
	resources:new h5c3.Hashtable(),
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
	 * Constructor -- typically called by the engine to automatically construct h5c3.loader.
	 */
	init:function ()
	{
		this._super();
		_DBG_('Loader timer started.',this.Class);
		this.timer = new h5c3.AccuTimer(-1, .5, 
			function()
			{
			  h5c3.loader.start();
			}
			,function() {_DBG_('Loader timer stopped.',this.Class);}
		);
		
	},

	/**
	 * Tells the resource loader to disable caching in the browser by modifying the resource src
	 * by appending the current date/time
	 */
	setDisableCache:function ()
	{
		this._noCacheString = '?nocache=' + Date.now();
	},

	/**
	 * Sets a base URI to save you type. Applies to all resources added until the next setBaseURL is called.
	 * @param  String url URI to preprend
	 */
	setBaseUrl:function (url)
	{
		this.baseUrl = url;
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
	 * Used to dynamically load any file into the head of the document. Mainly used for including 
	 * Javascript or CSS files after the document has already loaded.
	 *
	 * @param  {Function} loadingListener Function to call when each resource is loaded
	 * @param  {Function} loadedListener Function to call when all resources have been loaded
	 */
	loadFile:function (filename) {
	
		var fileref = null,
			ext = filename.substr(filename.lastIndexOf('.') + 1);
		
		if (ext === "js") { 
			//if filename is a external JavaScript file
			fileref=document.createElement('script');
			fileref.setAttribute("type","text/javascript");
			fileref.setAttribute("src", filename);
		} else if (ext === "css") { 
			//if filename is an external CSS file
			fileref=document.createElement("link");
			fileref.setAttribute("rel", "stylesheet");
			fileref.setAttribute("type", "text/css");
			fileref.setAttribute("href", filename);
		} else if (ext === "html") { 
			//if filename is an external HTML file
			fileref=document.createElement("applet");
			fileref.setAttribute("type", "text/html");
			fileref.setAttribute("href", filename);
		}
		if (fileref !== "undefined") {
			document.getElementsByTagName("head")[0].appendChild(fileref);
		}
	},
	
	/**
	 * Add a resource to the loader queue
	 * @param  {h5c3.Image|h5c3.Sound|h5c3.DataResource} resource Resource to load
	 */
	add:function (resource)
	{
		// resource.src already has the baseUrl set by the resource class (i.e. h5c3.Image)
		// so no need to add it here
		resource.name = resource.name.toLowerCase();
		this.resources.put(resource.name.toLowerCase(), { resource:resource, state:this.State.QUEUED });
		_DBG_('Adding resource ' + resource.src + ' to the queue.',this.Class);
	},

	/**
	 * Retrieve a resource from the loader
	 * @param  String name Name of the resource
	 * @return {h5c3.Image|h5c3.Sound|h5c3.DataResource} Resource
	 */
	get:function (name)
	{
		var res = this.resources.get(name.toLowerCase());
		
		if (!VLD(res)) {
			this.error(this.uniqueId + 'Unable to get resource '+name+'. Did you forget to add it to the config?');
			res=null;
		}
		return res;
	},

	/**
	 * Get all the sound resources
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
			if (res.Class.isA('h5c3.Sound')) {
				sounds.push(res);
			}
		}
		return sounds;
	},

	/**
	 * Get all the image resources
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
			if (res.isA('h5c3.Image')) {
				images.push(res);
			}
		}

		return images;
	},

	/**
	 * Starts the resource loader
	 * @param  {Function} loadingListener Function to call after each resource is loaded
	 * @param  {Function} loadedListener Function to call after all resources have been loaded or errored.
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
				res.resource.load(this._onLoad.bind(this), this._onError.bind(this));
				res.state = this.State.LOADING;
				this.totalBeingLoaded++;
			}
		}
		_DBG_('Loading ' + this.totalBeingLoaded + ' resource(s).',this.Class);
	},

	/**
	 * Generates a URL using a src string (by prepending the baseURL and appending the optional no-cache string
	 * @param  String src Source URI
	 * @return String A full resource URI
	 */
	makeUrl:function (src)
	{
		return this.baseUrl + src + this._noCacheString;
	},
	
	/**
	* Andrew: 
	*    fixed minor bug where if you used uppercase characters in key name res would return null
	*    because it did not fins the key in the hashtable. Just displayed and error notice to console.
	*/
	_onLoad:function (resource)
	{
		var res = this.resources.get(resource.name);
		if (!VLD(res)) {
			this.error('Unable to get resource ['+resource.name+'] - Please make sure you are using all lowercase.');
		} else { 
			res.state = this.State.READY;
			this.progress++;

			if (VLD(this.loadingListener)) {
				this.loadingListener(Math.round((this.progress / this.totalBeingLoaded) * 100));
			}

			_DBG_(resource.Class.shortName+' - '+ resource.name + ' loaded (' + Math.round((this.progress / this.totalBeingLoaded) * 100) + '% done)',this.Class);
		}
		this._checkAllDone();
	},

	_onError:function (resource)
	{
		var res = this.resources.get(resource.name);
		res.state = this.State.FAILED;
		this.progress++;
		this.errored++;

		if (VLD(this.loadingListener)) {
			this.loadingListener(this.progress / this.totalBeingLoaded);
		}
		this.warn(resource.name + ' (' + resource.src + ') failed.');

		this._checkAllDone();
	},

	_checkAllDone:function ()
	{
		if (this.progress >= this.totalBeingLoaded)
		{
			this.times.end = new Date().getTime();
			this.times.lapsed = (this.times.start-this.times.end);
			this.finished = true;
			this.started = false;
			if (VLD(this.loadedListener)) this.loadedListener(this.progress, this.errored);
			_DBG_('Resource Loader idle.',this.Class);
			this.progress = 0;
			this.errored = 0;
			this.totalBeingLoaded = 0;
		}

	}
});
