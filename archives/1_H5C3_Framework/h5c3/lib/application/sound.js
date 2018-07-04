/**
 * Playcraft Engine - (C)2012 Playcraft Labs, Inc.
 * See licence.txt for details
 */

/**
 * @class  h5c3.Sound
 * 
 * 
 * 
 * A sound resource can be loaded from a URI and played, including support for managing multichannel sound
 * (playing multiple sounds at once) and different formats used by different browsers.
 * 
 * In order to support all modern browsers, sounds need to be provided in both 'ogg' and 'mp3' formats. This is
 * becuase IE supports mp3 (but not ogg), chrome supports ogg and mp3, but safari and firefox only supports ogg. You
 * will need to create sound files into both ogg and mp3 to support all browsers.
 * 
 * To play a sound, you first need to load it from a URI:
 * 
 * // check if sound is enabled
 * if (h5c3.device.soundEnabled)
 * {
 *    // add the sound to the resource loader
 *    h5c3.loader.add(
 *       // construct a new sound named shotgun, loading formats for
 *       // ogg and mp3 (shotgun.mp3 and shotgun.ogg)
 *       // and setup to play up to 5 of these sounds simultaneously
 *       new h5c3.Sound('shotgun', 'sounds/shotgun', ['ogg', 'mp3'], 5));
 * }
 * (end)
 * 
 * Once you have the sound loaded you can play it:
 * 
 * // grab the sound resource from the resource loader
 * var shotgunSound = h5c3.loader.get('shotgun').resource;
 * // play the sound (without looping)
 * shotgunSound.play(false);
 * (end)
 * 
 * If the sound is looping, or it's a long sound you can stop it:
 * 
 * shotgunSound.stop();
 * (end)
 * You can adjust the volume of a sound:
 * 
 * // set the volume to 50%
 * shotgunSound.setVolume(0.5);
 * (end)
 * 
 * You can also change the starting position of sound or music using setPlayPosition:
 * 
 * // start half way through
 * shotgunSound.setPlayPosition( shotgunSound.getDuration() / 2 );
 * (end)
 */
h5c3.Sound = h5c3.Base.extend('h5c3.Sound', {
	_CLASSNAME: 'SoundFactory',
	_CLASSVERSION:'0.1.2'
},{
	/** Array of the sound elements -- multichannel sound requires multiple element copies to play */
	sounds: [],
	/** Source URI for the sound resource */
	src:null,
	/** String name for the sound */
	name: null,
	/** Number of sounds loaded */
	numLoaded: 0,
	/** Whether the sound is loaded */
	loaded:false,
	/** Whether an error occured loading the sound */
	errored:false,
	/** Number of channels for the sound. No more than this number can be played at once */
	channels:1,
	/** Optional call back once the sound is loaded */
	onLoadCallback:null,
	/** Optional call back if the sound errors whilst loading */
	onErrorCallback:null,

	/**
	 * Construct a new sound, if the resource loader has already start the sound will be immediately loaded.
	 * @param  String name Resource name (tag) you want to use
	 * @param  String src URI for the sound
	 * @param  Number channels Number of channels this sound can play at once
	 * @param  {Function} [onLoadCallback] Function to be called once the sound has been loaded (including all channels)
	 * @param  {Function} [onErrorCallback] Function to be called if the sound fails to load (on first error)
	 */
	init:function (name, src, formats, channels, onLoadCallback, onErrorCallback)
	{
		this._super();
		this.name = name;
		this.channels = channels;

		// append an extension to the src attribute that matches the format with what the device can play
		var canplay = false;
		for (var i=0; i < formats.length; i++)
		{
			if (h5c3.device.canPlay(formats[i]))
			{
				this.src = h5c3.loader.makeUrl(src + '.' + formats[i]);
				canplay = true;
				break; // we set the src based on the first type we find (in the order they are provided)
			}
		}

		if (canplay)
		{
			if (h5c3.loader.started) // load now if the loader has already been started
				this.load(onLoadCallback, onErrorCallback);
		} else
			this.errored = true;
		_DBG_('Initializaed.',this.Class);
	},

	/**
	 * Pauses the sound (on all channels)
	 */
	pause: function()
	{
		if (!this.canPlay()) return;
		for (var i=0, len=this.sounds.length; i < len; i++)
			this.sounds[i].pause();
		_DBG_("Paused.",this.Class);
	},

	/**
	 * Stop playing a sound (on all channels) -- actually just a synonym for pause
	 */
	stop: function()
	{
		if (!this.canPlay()) return;
		this.pause();
	},

	/**
	 * Volume to play the sound at for ALL channels
	 * @param  Number volume Volume as a range from 0 to 1 (0.5 is half volume)
	 */
	setVolume: function(volume)
	{
		if (!this.canPlay()) return;
		for (var i=0, len=this.sounds.length; i < len; i++)
			this.sounds[i].volume = volume;
		_DBG_("Volume set to "+volume+" for all channels.",this.Class);
	},

	/**
	 * Volume to play the sound at for ALL channels
	 * @param  Boolean loop Repeat until stopped?
	 */
	setLoop: function(loop)
	{
		if (!this.canPlay()) return;
		for (var i=0, len=this.sounds.length; i < len; i++)
			this.sounds[i].loop = loop;
	},
	
	/**
	 * Gets the duration of the sound in seconds
	 * @return Number The duration in seconds
	 */
	getDuration: function()
	{
		if (!this.canPlay()) return -1;
		return this.sounds[0].duration;
	},

	/**
	 * Sets the playback rate of the sound where 0 is not playing and 2 is double speed. Negative values cause
	 * the sound to play backwards.
	 * WARNING: Only currently supported by Safari and Chrome.
	 * @param  Number r The speed to play the sound at
	 */
	setPlaybackRate:function (r)
	{
		if (!this.canPlay()) return;
		for (var i = 0, len = this.sounds.length; i < len; i++)
			this.sounds[i].playbackRate = r;
	},

	/**
	 * Start playing the sound at the specified time (instead of 0)
	 * @param  Number time time (in seconds to start at)
	 */
	setPlayPosition: function(time)
	{
		if (!this.canPlay()) return;
		for (var i=0, len=this.sounds.length; i < len; i++)
			this.sounds[i].currentTime = time;
	},

	/**
	 * Load a sound. If the game hasn't started then the sound resource
	 * will be added to the resource manager's queue.
	 * @param  {Function} onLoadCallback function to call once the sound is loaded
	 * @param  {Function} onLoadCallback function to call if the sound errors
	 */
	load:function (onLoadCallback, onErrorCallback)
	{
		// user customized callbacks
		this.onLoadCallback = onLoadCallback;
		this.onErrorCallback = onErrorCallback;

		if (this.loaded && onLoadCallback)
		{
			this.onLoadCallback(this);
			return;
		}
		// load up multiple copies of the sound, one for each channel
		for (var i=0; i < this.channels; i++)
		{
			var n = new Audio();
			n.preload = 'auto';

			// setup event handlers for this class -- we'll call the callbacks from there
			n.addEventListener("canplaythrough", this.onLoad.bind(this), false);
			n.addEventListener("error", this.onError.bind(this), false);
			n.onerror = this.onError.bind(this);
			n.onload = this.onLoad.bind(this);
			n.src = this.src;
			n.load();
			this.sounds.push(n);

			if (h5c3.device.isAppMobi)
				// force an onload for appmodi -- since it wont create one and the load is almost instant
				this.onLoad(null);
		}
	},

	/**
	 * Force this sound to be reloaded
	 */
	reload:function ()
	{
		this.loaded = false;
		this.errored = false;
		this.load();
	},

	onLoad:function (ev)
	{
		this.numLoaded++;
		_DBG_('Loaded ('+this.numLoaded+')',this.Class);

		// remove the event listener so we don't get this happening multiple times
		if (!h5c3.device.isAppMobi)
			ev.target.removeEventListener("canplaythrough", this.onLoad.bind(this), false);

		if (this.numLoaded == this.channels)
		{
			this.loaded = true;
			this.errored = false;
			if (this.onLoadCallback)
				this.onLoadCallback(this);
		}
	},

	onError:function ()
	{
		_DBG_('Error on load.',this.Class);
		this.errored = true;
		this.loaded = false;
		if (this.onErrorCallback)
			this.onErrorCallback(this);
	},

	/**
	 * Plays a sound
	 * @param  Boolean loop True if you want the sound to just keep looking.
	 * @return Object Sound element that was played
	 */
	play:function(loop)
	{
		if (!this.canPlay()) return null;

		// find a free channel and play the sound (if there is one free)
		for (var i=0, len=this.sounds.length; i < len; i++)
		{
			if (this.sounds[i].paused || this.sounds[i].ended)
			{
				if (loop)
					this.sounds[i].loop = true;
				this.sounds[i].play();
				return this.sounds[i];
			}
		}

		// no sounds were free, so we just do nothing
		this.warn(this.name + ' - all channels are in use');
		return null;
	},

	/**
	 * @return Boolean true if the sound can be played
	 */
	canPlay: function()
	{
		return (this.loaded && h5c3.device.soundEnabled && !this.errored);
	}
});

/**
 * @class
 * SoundFactory -- for creating sounds (mostly just an interface class you extend from to create an sound factory).
 */
h5c3.SoundFactory = h5c3.Factory.extend('h5c3.SoundFactory', {
	_CLASSNAME: 'SoundFactory',
	_CLASSVERSION:'0.1.2'
},{
	init:function() 
	{
		this._super('Sound');
	},
	
	/**
	 * Called by the sound loader
	 * @param  String name String Name of the sound to create
	 * @param  Object options Properties assigned to the object
	 */
	create:function(name,options)
	{
		CHK(options,{volume:0.5,loop:false});
		var obj = h5c3.loader.get(name).resource;
		obj.setVolume(options.volume);
		obj.setLoop(options.loop);
		return this.add(name,obj);
	},
	
	play:function(name,options)
	{
		this.use(name,options).play(options.loop);
	}		
});