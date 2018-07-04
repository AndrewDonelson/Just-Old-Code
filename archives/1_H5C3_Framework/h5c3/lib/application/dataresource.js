
/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * Playcraft Engine - (C)2012 Playcraft Labs, Inc.
 * See licence.txt for details
 */
/**
 * @class  h5c3.DataResource
 * 
 * @description 
 * A generic resource you can load data, such as JSON, XML or config files from a URL, just like an image or sound file.
 * 
 * To load a resource, use the h5c3.Loader to add a resource:
 * 
 * >	h5c3.loader.add(new h5c3.DataResource('level1', 'data/level1.tmx'));
 * 
 * Once you have the resource loaded you can access the contents of the resource using the data member:
 * 
 * >	var xmlData = h5c3.loader.get('level1').resource.data;
 * 
 * You can optionally provide a function to be called when the resource has finished loading or has an error.
 * 
 * (start code)
 * function onLevelDataLoaded(dataResource)
 * {
 *    // dataResource.data
 * }
 * h5c3.loader.add(new h5c3.DataResource('level1', 'data/level1.tmx', onLevelDataLoaded));
 * (end)
 */
h5c3.DataResource = h5c3.Base.extend('h5c3.DataResource',
{
	_CLASSNAME: 'DataResource',
	_CLASSVERSION:'0.1.0'
},
{
	/** Data resource that has been loaded */
	data:null,
	/** HTTP request object used to load the data */
	request:null,
	/** src URL */
	src:null,
	/** Short name for this resource */
	name: null,
	/** boolean indicating whether the resource has been loaded yet */
	loaded:false,
	/** current callback when the resource has been loaded */
	onLoadCallback:null,
	/** current callback if an error occurs whilst loading the resource */
	onErrorCallback:null,

	/**
	 * @constructor init(name, src, onLoadCallback, onErrorCallback)
	 *
	 * @return none
	 * Loads data from a remote (URI) resource.
	 *
	 * @param  
	 *	String name Name to give the resource
	 * 	String src URI for the data
	 * 	Function 	onLoadCallback		Function to be called once the resource has been loaded
	 * 	Function 	onErrorCallback		Function to be called if the resource fails to load
	 *
	 * @return
	 * None
	 */
	init:function (name, src, onLoadCallback, onErrorCallback)
	{
		this._super();
		this.src = h5c3.loader.makeUrl(src);
		this.name = name;
		this.onLoadCallback = onLoadCallback;
		this.onErrorCallback = onErrorCallback;
		this.request = new XMLHttpRequest();
		this.request.onreadystatechange = this.onReadyStateChange.bind(this);
		this.request.onload = this.onReadyStateChange.bind(this);
		this.request.onloadend = this.onReadyStateChange.bind(this);
		this.load();
	},

	/**
	 * @method load(onLoadCallback, onErrorCallback)
	 *
	 * @description
	 * Triggers an immediate load of the resource. Use only if you're manually loading a resource, otherwise
	 * the h5c3.Loader will automatically call load when it starts.
	 *
	 * @param  
	 *	Function	onLoadCallback		Optional function called when the resource has finished loading
	 * 	Function	onErrorCallback		Optional function called if the resource fails to load
	 *
	 * @return
	 * None
	 */
	load:function (onLoadCallback, onErrorCallback)
	{
		this.onLoadCallback = onLoadCallback;
		this.onErrorCallback = onErrorCallback;

		try {
			this.request.open('get', this.src);
			this.request.send(null);
		} catch (err) {
		} finally {
		}
	},

    /**
	 * @method reload()
	 *
	 * @description
	 * Force the reloading of a resource (by marking it not loaded and calling load
     * 
	 * @param
	 * None
	 *
	 * @return 
	 * None
     */	
	reload:function ()
	{
		this.loaded = false;
		this.load();
	},

    /**
	 * @method onReadyStateChange()
	 *
	 * @description
	 * Called when the resource is loaded/ready. Generally this is used internally, and you should use the
	 * onLoadCallback function optionally pass to the load method or constructor
     * 
	 * @param
	 * None
	 *
	 * @return 
	 * None
     */	
	onReadyStateChange:function()
	{
		if (this.loaded) {
			return;
		}

		if (this.request.readyState === 4)
		{
			if (this.request.status === 200)
			{
				this.loaded = true;

				this.data = this.request.responseText;

				if (this.onLoadCallback) {
					this.onLoadCallback(this);
				}
			} else
			if (this.request.status === 404)
			{
				this.warn('resource ' + this.src + ' error ' + this.request.status);
				if (this.onErrorCallback) {
					this.onErrorCallback(this);
				}
			}
		}
	}
});
