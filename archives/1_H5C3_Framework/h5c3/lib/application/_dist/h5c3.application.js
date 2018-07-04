
/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * Playcraft Engine - (C)2012 Playcraft Labs, Inc.
 * See licence.txt for details
 */

/**
 * @class  h5c3.Image
 * 
 * 
 * 
 * A basic image resource. You can use this class to acquire images (loaded from a URI) and then draw them on-screen
 * with effects such as scaling, rotation, compositing and alpha.
 */
h5c3.Image = h5c3.Base.extend('h5c3.Image',
    /** Interface: h5c3.Image */
    {
		_CLASSNAME: 'Image',
		_CLASSVERSION:'0.1.0'
	},
    /** Interface: h5c3.Image.prototype */
    {
        /** Width of the image; set upon loading, can be overridden after load */
        width:0,
        /** Height of the image; set upon loading, can be overridden after load */
        height:0,
        /** Source image element */
        image:null,
        /** Source URI used to load the image */
        src:null,
        /** Resource name */
        name:null,
        /** Whether the image has been loaded yet */
        loaded:false,
        /** Optional function called after this image loads */
        onLoadCallback:null,
        /** Optional function called if this image fails to load */
        onErrorCallback:null,
        /** x-scale to draw the image at */
        scaleX:1,
        /** y-scale to draw the image at */
        scaleY:1,
        /** alpha level to draw the image at (0.5=50% transparent) */
        alpha:1,
        /** Composite operation to draw the image with, e.g. 'lighter' */
        compositeOperation:null,

        /**
         * Constructs a new h5c3.Image. If the h5c3.loader has already started then the image will be
         * immediately loaded, otherwise it will wait for the resource loader to handle the loading.
         * @param  String name Name to give the image resource
         * @param  String src URI for the image
         * @param  {Function} onLoadCallback Function to be called once the image has been loaded
         * @param  {Function} onErrorCallback Function to be called if the image fails to load
         */
        init:function (name, src, onLoadCallback, onErrorCallback)
        {
            this._super();

            this.name = name;
            this.src = h5c3.loader.makeUrl(src);
            this.image = new Image();

            this.onLoadCallback = onLoadCallback;
            this.onErrorCallback = onErrorCallback;

            // setup our own handlers
            this.image.onload = this._onLoad.bind(this);
            this.image.onerror = this._onError.bind(this);
            this.scaleX = 1;
            this.scaleY = 1;
            this.alpha = 1;

            if (h5c3.loader.started) // load now if the loader has already been started
                this.load();
        },

        /**
         * Change the alpha level to draw the image at (0.5 = 50% transparent)
         * @param  Number a Alpha level
         */
        setAlpha:function (a)
        {
            this.alpha = a;
        },

        /**
         * Change the x and/or y scale to draw the image at.
         * @param  Number scaleX x-scale to draw at (2 = 200% wide, -1 = reversed normal on x)
         * @param  Number scaleY y-scale to draw at (2 = 200% high, -1 = reversed normal on y)
         */
        setScale:function (scaleX, scaleY)
        {
            this.scaleX = scaleX;
            this.scaleY = scaleY;
        },

        /**
         * Sets the componsite drawing operation for this image.
         * @param  String o Operation to use (e.g. 'lighter')
         */
        setCompositeOperation:function (o)
        {
            this.compositeOperation = o;
        },

        /**
         * Load an image directly
         * @param  {Function} onLoadCallback Function to be called once the image has been loaded
         * @param  {Function} onErrorCallback Function to be called if the image fails to load
         */
        load:function (onLoadCallback, onErrorCallback)
        {
            this.onLoadCallback = onLoadCallback;
            this.onErrorCallback = onErrorCallback;

            if (this.loaded && onLoadCallback) this.onLoadCallback(this);

            this.image.onload = this._onLoad.bind(this);
            this.image.onerror = this._onError.bind(this);
            this.image.src = this.src;
        },

        /**
         * Force this image to be reloaded
         */
        reload:function ()
        {
            this.loaded = false;
            this.load();
        },

        /**
         * Draw the image onto a context
         * @param  {Context} ctx Context to draw the sprite image on
         * @param  Number sx Source position in the image (or detination x if only 3 params)
         * @param  Number sy Source position in the image (or destination y if only 3 params)
         * @param  Number x x-position destination x position to draw the image at
         * @param  Number y y-position destination y position to draw the image at
         * @param  Number width Width to draw (will clip the image edge)
         * @param  Number height Height to draw (will clip the image edge)
         * @param  Number rotationAngle Angle to draw the image at
         */
        draw:function (ctx, sx, sy, x, y, width, height, rotationAngle)
        {
            // scale testing
            if (this.compositeOperation != null)
                ctx.globalCompositeOperation = this.compositeOperation;

            if (arguments.length == 3)
            {
                ctx.save();
                if (this.alpha != 1)
                    ctx.globalAlpha = this.alpha;
                ctx.translate(sx + (this.width / 2), sy + (this.height / 2));
                ctx.scale(this.scaleX, this.scaleY);
                ctx.drawImage(this.image, 0, 0, this.width, this.height, (-this.width / 2),
                    (-this.height / 2), this.width, this.height);
                ctx.restore();
            }
            else
            {
                if (VLD(rotationAngle))
                {
                    ctx.save();

                    if (this.alpha != 1)
                        ctx.globalAlpha = this.alpha;
                    if (this.scaleX < 0 || this.scaleY < 0)
                    {
                        var yf = this.scaleY == 1 ? 0 : this.scaleY;
                        var xf = this.scaleX == 1 ? 0 : this.scaleX;

                        ctx.translate((x + (width / 2) * xf), (y + (height / 2) * yf));
                    } else
                        ctx.translate(x + (width / 2), y + (height / 2));

                    ctx.rotate(rotationAngle * (Math.PI / 180));
                    ctx.scale(this.scaleX, this.scaleY);
                    ctx.drawImage(this.image, sx, sy, width, height, (-width / 2), (-height / 2), width, height);
                    ctx.restore();
                }
                else
                {
                    ctx.save();

                    if (this.alpha != 1)
                        ctx.globalAlpha = this.alpha;
                    if (this.scaleX < 0 || this.scaleY < 0)
                    {
                        var yf2 = this.scaleY == 1 ? 0 : this.scaleY;
                        var xf2 = this.scaleX == 1 ? 0 : this.scaleX;

                        ctx.translate(x + (-(width / 2) * xf2), y + (-(height / 2) * yf2));
                    } else
                        ctx.translate(x, y);

                    ctx.scale(this.scaleX, this.scaleY);
                    ctx.drawImage(this.image, sx, sy, width, height, 0, 0, width, height);
                    ctx.restore();
                }
            }

            if (this.compositeOperation != null)
                ctx.globalCompositeOperation = 'source-over';
            h5c3.device.elementsDrawn++;

        },

        _onLoad:function ()
        {
            this.loaded = true;

            this.width = this.image.width;
            this.height = this.image.height;

            if (this.onLoadCallback)
                this.onLoadCallback(this);
        },

        _onError:function ()
        {
            if (this.onErrorCallback)
                this.onErrorCallback(this);
        },

        /**
         * Expands the image by adding blank pixels to the bottom and side
         * @param  Number extraWidth Amount of width to add
         * @param  Number extraHeight Amount of height to add
         */
        expand:function (extraWidth, extraHeight)
        {
            this.image.width = this.width + extraWidth;
            this.image.height = this.height + extraHeight;
            this.width = this.image.width;
            this.height = this.image.height;
        },

        resize:function (scaleX, scaleY)
        {
            var sw = this.width * scaleX;
            var sh = this.height * scaleY;

            var startingImage = document.createElement('canvas');
            startingImage.width = this.width;
            startingImage.height = this.height;

            var result = document.createElement('canvas');
            result.width = sw;
            result.height = sh;

            var ctx = result.getContext('2d');
            var resultPixels = ctx.getImageData(0, 0, sw, sh);

            var startingCtx = startingImage.getContext('2d');
            startingCtx.drawImage(this.image, 0, 0, this.width, this.height, 0, 0, this.width, this.height);
            var startingPixels = startingCtx.getImageData(0, 0, this.width, this.height);

            for (var y = 0; y < sh; y++)
            {
                for (var x = 0; x < sw; x++)
                {
                    var i = (Math.floor(y / scaleY) * this.width + Math.floor(x / scaleX)) * 4;
                    var is = (y * sw + x) * 4;
                    for (var j = 0; j < 4; j++)
                        resultPixels.data[is + j] = startingPixels.data[i + j];
                }
            }

            ctx.putImageData(resultPixels, 0, 0);
            this.image = result;
            return this;
        }
    });

// todo: this should be derived from image (or at least a common base -- merge things like scaling factor api)
h5c3.CanvasImage = h5c3.Base.extend('h5c3.CanvasImage', {},
    {
        width:0,
        height:0,
        canvas:null,
        loaded:true,
        scaleX:1,
        scaleY:1,

        init:function (canvas)
        {
            this.canvas = canvas;
            this.width = canvas.width;
            this.height = canvas.height;
        },

        draw:function (ctx, sx, sy, x, y, width, height)
        {
            if (width == undefined || height == undefined || width == 0 || height == 0)
                ctx.drawImage(this.canvas, sx, sy);
            else
                ctx.drawImage(this.canvas, sx, sy, width, height, x * this.scaleX, y * this.scaleY,
                    width * this.scaleX, height * this.scaleY);
        },

        setScale:function (scaleX, scaleY)
        {
            this.scaleX = scaleX;
            this.scaleY = scaleY;
        }

    });


h5c3.ImageTools = h5c3.Base.extend('h5c3.ImageTools',
    {
        /**
         * Rotates an image by the given number of directions
         * @param  image Source image
         * @param  w Width of the image
         * @param  h Height of the image
         * @param  directions Number of directions you want back
         * @return {h5c3.CanvasImage} A new h5c3.CanvasImage with the rotations
         */
        rotate:function (image, w, h, directions)
        {
            // create an destination canvas big enough
            var resultCanvas = document.createElement('canvas');
            resultCanvas.width = w * directions;
            resultCanvas.height = h;

            var ctx = resultCanvas.getContext('2d');

            // find center of the source image
            //var cx = w / 2;
            //var cy = h / 2;

            for (var d = 0; d < directions; d++)
            {
                ctx.save();
                ctx.translate(d * w + (w / 2), h / 2);
                ctx.rotate(((360 / directions) * d) * (Math.PI / 180));
                ctx.drawImage(image, -(w / 2), -(h / 2));
                ctx.restore();
            }

            return new h5c3.CanvasImage(resultCanvas);
        }
    },
    {});/**
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
/**
 * @class  h5c3.Resources
 *
 * @descsription 
 * Loading of resources is handled internally. DO NOT CALL THESE FUNCTIONS DIRECTLY.
 */
h5c3.Resources = h5c3.Base.extend('h5c3.Resources', {
	_CLASSNAME: 'Resources',
	_CLASSVERSION:'0.3.3'
},{

    /**
     * @property Object 	resources	
	 * @descsription Holds all resources for the application
     */
    resources: null,

    /**
	 * @constructor Initialization method. 
	 * @descsription Adds Publisher and Framework resources to loading Que. Then processes the Config to get all resources for loading.
     * 
	 * @return none
     */
    init: function () {
        this._super();
        this.loadResources();		
    },

    /**
	 * @method loadResources()
	 * @descsription This method parses the embeded XML resource data into an array
	 * @return none
     */
    loadResources: function () {
       _DBG_("Queing internal resources.",this.Class);
        /** Required Engine images - Loaded automatically **/
        //h5c3.device.loader.add(new h5c3.Image('publisher', 'http://h5c3.i2tmlabs.com/img/logo-i2tmlabs-hd.png'));
        //h5c3.device.loader.add(new h5c3.Image('h5c3', 'http://h5c3.i2tmlabs.com/img/logo-h5c3-hd.png'));
        //h5c3.device.loader.add(new h5c3.Image('btnDebug', 'http://h5c3.i2tmlabs.com/img/buttons_debug.png'));
        //h5c3.device.loader.add(new h5c3.Image('touchpad', 'http://h5c3.i2tmlabs.com/img/touchpad_buttons.png'));
        /** Required Engine sound - Loaded automatically **/
        //h5c3.device.loader.add(new h5c3.Sound('i2tm', 'http://h5c3.i2tmlabs.com/snd/i2tm', ['ogg'], 1));
        this.loadGraphics();
        this.loadAudio();
    },

    /**
	 * @method loadGraphics() 
	 * @descsription Parse array and que all graphics for loading
	 * @return none
     */
    loadGraphics: function () {
		if (VLD(h5c3.config.resources)) {
			_DBG_("Queing images resources.",this.Class);
			var i, data = h5c3.config.resources.images;

			for (i = 0; i < data.length; ++i) {
				h5c3.loader.add(new h5c3.Image(data[i].name, data[i].file));
			}
		} 
		else _DBG_("No graphic resources to que. (Did you forget to add them to the config?)",this.Class);
    },

    /**
	 * @method loadAudio()
	 * @descsription Parse array and que all audio for loading
	 * @return none
     */
    loadAudio: function () {
		if (VLD(h5c3.config.resources)) {
			_DBG_("Queing audio resources.",this.Class);
			var 
				i, f1, f2, data = h5c3.config.resources.sounds;

			for (i = 0; i < data.length; i++) {
				if (data[i].ogg === "true") {
					f1 = "ogg";
				} else {
					f1 = "";
				}
				if (data[i].mp3 === "true") {
					f2 = "mp3";
				} else {
					f2 = "";
				}
				h5c3.loader.add(new h5c3.Sound(data[i].name, data[i].file, [f1, f2], data[i].channels));
			}
		} 
		else _DBG_("No audio resources to que. (Did you forget to add them to the config?)",this.Class);
    }
});
/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * Playcraft Engine - (C)2012 Playcraft Labs, Inc.
 * See licence.txt for details
 */

/*******************************************************************************************
 * Enumeration: h5c3.SCREEN_CELLS
 *
 * Class used to provide better access and easy scaling/placement of entitys using Layout
 * (start code)
 *  GRIDX1:		0x0000, 	0000000 - The screen is the cell
 *  GRIDX2:		0x0001, 	0000001 - The screen is broke up into 2x2 cells
 *  GRIDX3:		0x0002, 	0000010 - The screen is broke up into 3x3 cells
 *  GRIDX4:		0x0004, 	0000100 - The screen is broke up into 4x4 cells
 *  GRIDX5:		0x0008  	0001000 - The screen is broke up into 5x5 cells
 * (end)
 *
 *******************************************************************************************/	
h5c3.SCREEN_CELLS =
{
    GRIDX1:		0x0000, // 0000000 - The screen is the cell
    GRIDX2:		0x0001, // 0000001 - The screen is broke up into 2x2 cells
    GRIDX3:		0x0002, // 0000010 - The screen is broke up into 3x3 cells
    GRIDX4:		0x0004, // 0000100 - The screen is broke up into 4x4 cells
    GRIDX5:		0x0008  // 0001000 - The screen is broke up into 5x5 cells
};

/**
 * @@class  h5c3.Device
 * 
 * @description
 * h5c3.Device is the primary interface between your game and the underlying hardware. It's a singleton instance
 * that will be constructed automatically and is globally accessible at all times as h5c3.device
 * 
 * h5c3.device will automatically be setup once h5c3.JSLoader has completed loading all required javascipt through a call
 * to h5c3.device.boot passing in the Id of the canvas element for your game as well as the name of the game class
 * which h5c3.device will then dynamically construct. Typically you do not need to construct your own h5c3.Device, h5c3.start
 * will take care of it for you.
 */
h5c3.Device = h5c3.Base.extend('h5c3.Device',
    { 
		_CLASSNAME: 'Device',
		_CLASSVERSION:'0.1.0'
	},
    {	
		/** @property device		Game core device object */
		device:h5c3.Device,					
		
		/** @property media			object- browser information */
		media:h5c3.Media,					
        
		/** @property page			h5c3.Page page object */
		page:null,								
        
		/** @property loader		primary resource loader */
		loader:null,							
        
		/** h5c3.Input handler global instance */
		input:null,								
		
		/** Holds a AccuTimer object used for input timing. Default is 6 FPS */
		inputTimer:null,						
		
		/** Holds a AccuTimer object used for process timing. Default is 30 FPS */
		processTimer:null,						
        
		/** used to provide a DOM XML parser */
		xmlParser:null,							
		
		/** hold the state of the application resources **/
		resourcesLoaded:false,					
        
		/** TRUE if the engine is initialized. Different than running */
		started:false,							
        
		/** whether the device is running */
		running:true,							
        
		/** current requested or desired frame rate. */
		fps:30,
        
		/** last render frame rate */
		currentFPS:0,
		
		/** Contains the current average FPS */
		averageFPS:0,							
		
		/** used by render() to calulate the average FPS */		
		totalFPS:0,								
		
		/** used by render() to calulate the average FPS */
		frameCount:0,							
        
		/** used to hold the total number of milliseconds between animation frames */
		tick:0,									
        
		/** Used to define if we are using  pooling or not */
		enablePooling:true,						
        
		/** whether sound is enabled */
		soundEnabled:true,						
        
		/** number of elements drawn in the last render */
		elementsDrawn:0,						
        
		/** how long in ms the last process render took */
		lastProcessMS:0,						
        
		/** how long in ms the last draw render took */
		lastDrawMS:0,							
        
		/** amount of time the last render took in ms */
		elapsed:0,								
        
		/** time the last frame render was started */
		lastFrame:0,							
        
		/** the time now */
		now:Date.now(),							
        
		/** Used by render method for timing */
        startTime:0,							
        
		/** h5c3.Rect of the current screen dimensions */
		screen:null,							
		
		/** pixel ratio of the screen -- typically 1 unless on a retina display where it's 2 */
		pixelRatio:h5c3.Device.pixelRatio,	
        
		/** is this device an iPhone */
		isiPhone:h5c3.Device.isiPhone,		
		
		/** is this device an iPhone 4 */
		isiPhone4:h5c3.Device.isiPhone4,	
        
		/** is this device an iPad*/
		isiPad:h5c3.Device.isiPad,			
        
		/** is this device an Android*/
		isAndroid:h5c3.Device.isAndroid,	
        
		/** is this a touch device */
		isTouch:h5c3.Device.isTouch,		
		
		/** Is touchpad enbale or not? */
		useTouch:h5c3.Device.useTouch,		
        
		/** is this an ios device */
		isiOS: h5c3.Device.isiOS,			
        
		/** is this an iPod device */
		isiPod: h5c3.Device.isiPod,			
        
		/** whether the debug panel should be updated/drawn */
		showDebug:h5c3.devMode,					
        
		/** whether the game is running in development mode; false = production */
		devMode: h5c3.devMode,					
		
		/** Used by layout for determining how many region cells to break canvas into */
		gameScreenCells:1,						

		/**
		 * @constructor init()
		 *
		 * @param
		 * None
		 *
		 * @return 
		 * None
		 */	
		init:function() {
			this._super();
			_DBG_("Initialization started.",this.Class);
			this.loader = h5c3.loader;
            this.input = new h5c3.Input();
		},
		
		/**
		 * @method
		 *
         * Setup the system interface for the game. Typically this will just be automatically called
         * by the game object and you don't need to worry about it.
		 * 
		 * @param
		 * None
		 *
		 * @return 
		 * None
		 */	
        boot:function ()
        {
			_DBG_("boot initiated.",this.Class);
			this.page = new h5c3.Page(this,'H5C3 Unanamed App');
			this.game = this.page.game; //Simple helper / shorten
            this.tick = 1000 / this.fps;
			this.requestAnimFrame = h5c3.Device.requestAnimFrame;
            this.onReady();
			_DBG_("boot complete.",this.Class);
        }, //end boot()
						
		/**
		 * @method 
		 *
		 * Initialize the default layout to a 1x1 grid
		 * 
		 * @param
		 * None
		 *
		 * @return 
		 * None
		 */	
		initLayout:function() 
		{
			this.layout = {
				cells: h5c3.SCREEN_CELLS.GRIDX1
			};
		}, //end initLayout()
				
		/**
		 * @method
		 *
         * Indicates whether a sound format is playable on the current device
		 *
         * @param  
		 *	String 	format 	Sound format to test: 'mp3', 'ogg' or 'wav'
		 *
         * @return 
		 *	Boolean		True is the format can be played
		 */	        canPlay: function(format)
        {
            return h5c3.Device.canPlay(format);
        }, //end canPlay()
				
		/**
         * Automatically called once the device is ready
		 */	
        onReady:function ()
        {
			_DBG_("Dispatching Ready",this.Class);
            if (this.started) { return; }// check we haven't already started
            //this.onResize();
            this.page.onReady();
            this.input._onReady();
			/** Everything is loaded and ready at this point **/
            this.lastFrame = Date.now();
            // start the central game timer
			window.requestAnimationFrame(this.render.bind(this));
			this.handleTimers(true);
            this.started = true;
        }, //end onReady()
			
		/**
		 * @method
         * @desc Automatically called once the device is exiting
		 */	
		onExit:function () 
		{
			this.handleTimers(false);				//Turn off Timers
			window.cancelAnimationFrame(true);		//Cancel Animation frame binding
			_DBG_("Animation frame binding canceled.",this.Class);
		},
		
		/**
		 * @method
		 *
		 * The engine uses timers to monitor and adjust timing on Rendering and Input. This method sets up and starts the timers.
		 * 
		 * @param
		 * Boolean	State	Start/Stop timers
		 *
		 * @return 
		 * None
		 */	
		handleTimers:function(state) 
		{
			if (state===true) {
				_DBG_("Loader timer started.",this.Class);
				this.inputTimer = new h5c3.AccuTimer(0, 6, 
					function(steps,count,fps)
					{
					  h5c3.device.input.process();
					}
					,function() {_DBG_("Loader Timer terminated.",this.Class);}
				);

				//The processes run @ 30FPS - Seperate from the Rendering
				this.processTimer = new h5c3.AccuTimer(0, 30, 
					function(steps,count,fps)
					{
						h5c3.device.running = !h5c3.device.page.game.obj.process();
					}
					,function() {_DBG_("Process Timer terminated.",this.Class);}
				);
			} else {
				_DBG_("Stop all timers.",this.Class);
				this.inputTimer = null;
				this.processTimer = null;
			}
		},
		
		/**
		 * @method
		 *
         * Called once per game cycle
		 * 
		 * @param
		 * Number	time	system time in ms
		 *
		 * @return 
		 * None
		 */	
        render:function (time)
        {
            if (this.running !== false)
            {
				try {
					this.now = this.startTime = Date.now();
					this.elapsed = this.now - this.lastFrame;
					this.lastDrawMS = 0;
					this.elementsDrawn = 0;
					this.currentFPS = 1000.0 / this.elapsed;
					this.totalFPS = this.totalFPS +this.currentFPS;
					this.frameCount++;
					this.lastProcessMS = (Date.now() - this.startTime) - this.lastDrawMS;
					this.lastFrame = this.now;
					this.page.render();
					window.requestAnimationFrame(this.render.bind(this));
				} catch (e) {	
					AST(null,printStackTrace(e));
				}
            } else {
				//We are exiting the game
				
			}
        }, //end render()

        /**
		 * @method
		 *
         * Test whether a given rectangle overlaps any part of the device screen
		 *
         * @param  
		 *	Number 	x 	x position of the top left of the rectangle to test
         * 	Number 	y 	y position of the top left of the rectangle to test
         * 	Number 	w 	width of the rectangle
         * 	Number 	h 	height of the rectangle
         * @return 
		 *	Boolean 	true is it's on screen
         */
        isOnScreen:function (x, y, w, h)
        {
            return h5c3.Math.isRectColliding(x, y, w, h, 0, 0, this.game.dim.w, this.game.dim.h);
        } //end isOnScreen()						
    });
	
/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * Playcraft Engine - (C)2012 Playcraft Labs, Inc.
 * See licence.txt for details
 */

/**
 * @class  h5c3.Input
 * 
 * 
 * 
 * This class provides a way of binding and reacting to input in a convenient and device independent way. The
 * engine will automatically construct a single, global input class which is accessible via the global h5c3.device.input.
 * 
 * There are two kinds of inputs that can be handled, actions and states. An action is a single event that occurs
 * as a reaction to an input such as clicking the mouse or pressing a key. Typical actions are having a player jump, or
 * open a door. States are when an input is in an on/off state, such as turning a ship or firing a weapon.
 * 
 * <h5>Actions</h5>
 * Reacting to action involves 'binding' an action, such as 'open door' or 'jump' to an object in the game which will
 * trigger a call to the object's onAction method.
 * 
 * MyGame = h5c3.Game('MyGame',
 * {},
 * {
 *    onLoaded:function (loaded, errored)
 *    {
 *       // bind the jump action to the space key
 *       this.input.bindAction(this, 'jump', 'SPACE');
 *       // as well as a mouse click
 *       this.input.bindAction(this, 'jump', 'MOUSE_LEFT_CLICK');
 *    },
 *
 *    // this onAction method will be called when an action relating to
 *    // this object is triggered
 *    onAction:function(actionName)
 *    {
 *       if (actionName ==== 'jump')
 *       {
 *          // player.jump!
 *       }
 *    }
 *
 * });
 * (end)
 * 
 * <h5>States</h5>
 * States are used to indicate when a key or input control is currently active or not. Typically a state is used
 * when you want to react for the entire time an input is engaged, such as holding down a key to accelerate a car.
 * 
 * To use an input state, bind it to an object the same way you do an action. You will then need to separately check
 * if the state is on at the appropriate time for your game. Most commonly this is done in a process function. See
 * the <a href='h5c3.Game'>game</a>, <a href='h5c3.Layer'>layer</a> or <a href='h5c3.Scene'>scene</a> classes for more
 * information on overriding a process function.
 * 
 * // bind the state to an input and an object
 * this.input.bindState(this, 'moving left', 'LEFT');
 *
 * // check for the state being active in the game, layer or scene process
 * process:function ()
 * {
 *    if (h5c3.device.input.isInputState(this, 'moving left'))
 *       // move the player left
 * }
 * (end)
 * You can see an example of both input actions and states in the Asteroids sample game.
 * 
 * Rather than using this class directly, you can also use the <a href='h5c3.components.Input'>input component</a>
 * and <a href='h5c3.systems.Input'>system</a> which lets you bind input to an entity as a component.
 */
h5c3.Input = h5c3.Base.extend('h5c3.Input',
    /** Interface: h5c3.Input */
    {
		_CLASSNAME: 'Input',
		_CLASSVERSION:'0.1.0',
        _eventPos: null, // cached for speed

        /**
         * Extracts the position from an event (in a cross-browser way),and then sets the passed in pos
         * @param  Object e Event to extract the position from
         * @param  {h5c3.Point} [pos] Position object to set. Leave out to have a new (pooled) point returned
         */
        getEventPosition:function(e, pos)
        {
            if (this._eventPos === null) {
                this._eventPos = h5c3.Point.create(0,0);
			}

            var r = pos;
            if (!VLD(pos)) {
                r = this._eventPos;
			}

            if (e.pageX || e.pageY)
            {
                r.x = e.pageX;
                r.y = e.pageY;
            } else
            {
                r.x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                r.y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }

            return r;
        }

    },
    /** Interface: h5c3.Input.prototype */
    {
        /** Current state bindings */
        stateBindings:null,
        /** Currently active states */
        states:null,
        /** Action bindings */
        actionBindings:null,
        /** Current position of the mouse on-screen, updated continuously */
        mousePos: null,
        /** indicates if the left mouse button is currently down */
        mouseLeftButtonDown: false,
        /** indicates if the right mouse button is currently down */
        mouseRightButtonDown: false,
        /** indicates if the middle mouse button is currently down */
        mouseMiddleButtonDown: false,

        init:function ()
        {
            this._super();
            this.stateBindings = new h5c3.Hashtable();
            this.states = new h5c3.Hashtable();
            this.actionBindings = new h5c3.Hashtable();
            this.mousePos = h5c3.Point.create(0,0);
        },

        /**
         * Binds an input state to an object, such as 'turning left' or 'firing' to an input code.
         * You can bind an input to any object, however typically it's to a layer, scene or game. The input will not
         * trigger if the object is not presently active.
         * If you specify a UIElement (optional), the state is only triggered if the event occurs inside
         * the bounds of the element (typically a positional event like a touch start or mouse move)
         * @param  Object obj An object to bind the state to
         * @param  String stateName The name of the state, e.g. "turning left"
         * @param  String input The name of the input, i.e. 'LEFT' (see h5c3.InputType)
         * @param  Object [uiTarget] Optional UI object to bind the input to
         */
        bindState:function (obj, stateName, input, uiTarget)
        {
            if (obj.uniqueId === null) {
                throw "Oops, you can't bind a state to an object if it doesn't have a uniqueId function";
			}

            input = input.toUpperCase();
            // There can be many bindings associated with a particular input, so we see
            // if there is already one, and then append this to the array, otherwise
            // we create the array
            var binding = { stateName:stateName, object:obj, input:input, state:{on:false, event:null}, uiTarget:uiTarget },
				bindingSet = this.stateBindings.get(input);
            if (bindingSet === null) {
                this.stateBindings.put(input, [ binding ]);
			} else {
                // otherwise append a new binding
                bindingSet.push(binding);
			}
            // now setup a state for this object/input combination
            this.states.put(obj.uniqueId + '\\\\' + stateName, {on: false, event: null});

            // if this is a positional type binding, add it to the positional tracking array
            if (h5c3.InputType.isPositional(h5c3.InputType.getCode(input))) {
                this._positionals.push(binding);
			}
        },


        /**
         * Clears any on states related to an object.
         * @param  Object obj The object to clear states for
         */
        clearStates:function (obj)
        {
            var b,i,binding,state,bindingSet,bindings = this.stateBindings.entries();

            for (b=0; b < bindings.length; b++)
            {
                bindingSet = bindings[b];
                for (i = 0; i < bindingSet.length; i++)
                {
                    binding = bindingSet[i];
                    if (binding.object === obj)
                    {
                        state = this.states.get(next.object.uniqueId + '\\\\' + next.stateName);
                        state.on = false;
                        state.event = null;
                        if (h5c3.InputType.isPositional(binding.input)) {
                            h5c3.tools.arrayRemove(this._positionals, binding);
						}
                    }
                }
            }
        },

        /**
         * Returns true if the named state is currently active. If you need anything more than the state boolean
         * use getInputState, which includes the actual event.
         * @param  Object obj Object to check the binding against
         * @param  String stateName A string representing a previously setup state, i.e. 'turning left'
         * @return  Boolean true if the state is currently on (such as a key being down)
         */
        isInputState:function (obj, stateName)
        {
            // lookup is very slow; have to find the state for a certain stateName and object
            // TODO: oops this is creating strings for every check (usually every frame)-- get rid of it
            // add a state property to the bound object and update it when the state changes
            var state = this.states.get(obj.uniqueId + '\\\\' + stateName);
            if (state === null) { throw 'Ooops, unknown state ' + stateName; }
            return state.on;
        },

        /**
         * Gets the present input state object (which includes the event data).
         * @param  Object obj Object to check against (such as a layer, scene or game)
         * @param  String stateName Name of the state to check for
         * @return Object state object containing the state.state and state.event data
         */
        getInputState:function (obj, stateName)
        {
            return this.states.get(obj.uniqueId + '\\\\' + stateName);
        },

        /**
         * Binds an input event to an action and object; e.g. bindAction(playerShip, 'fire', 'CTRL')
         * will trigger an action callback on the playerShip entity when the CTRL key is pressed down.
         * You can bind an input to a layer, scene or entity. The input will not trigger if the object
         * is not presently active.
         * 
         * For positional events (such as a mouse or touch input) the action will only fire if the position
         * of the event is within the bounds of the object (based on a call to getScreenRect). You can optionally
         * provide a uiTarget object to provide a different bounding rectangle. If the object provides no getScreenRect
         * method, then no bounding check will be carried out.
         * 
         * For (start code)
         * var menuLayer = new Layer();                     // a menu layer
         * var menuOption = new TextElement('New Game');    // a menu item
         *
         * // trigger the 'new game' action for the menuLayer, when a mouse click occurs within the menuOption element
         * h5c3.device.input.bindAction(menuLayer, 'new game', 'MOUSE_LEFT_BUTTON', menuOption);
         * (end)
         * Note: If the uiTarget element is not provided, the bounding rectangle of the obj is used (as long as
         * the object provides a getScreenRect() method, otherwise there is no checking
         *
         * @param  {h5c3.Base} obj The entity, layer or scene to bind this action to (must implement onAction)
         * @param  String actionName The name of the action, e.g. 'FIRE' or 'JUMP'
         * @param  String input The input code as a string
         * @param  {h5c3.Base} [uiTarget] An optional element to limit the input to only within the bounds of the element (must
         * implement getScreenRect)
         */
        bindAction:function (obj, actionName, input, uiTarget)
        {
            // There can be many bindings associated with a particular input event, so we see
            // if there is already one, and then append this to the array, otherwise
            // we create the array
            input = input.toUpperCase();

            var bindingSet = this.actionBindings.get(input);
            if (bindingSet === null) {
                this.actionBindings.put(input, [
                    { actionName:actionName, object:obj, input:input, uiTarget:uiTarget }
                ]);
			} else {
                // otherwise append a new binding
                bindingSet.push({ actionName:actionName, input:input, object:obj, uiTarget:uiTarget });
			}
        },

        /**
         * Triggers an action to be fired. Typically this will be fired in response to an input, but it can
         * also be used to simulate an event.
         * @param  Number eventCode event code
         * @param  {Event} event An event object
         */
        fireAction:function (eventCode, event)
        {
            var i,binding,obj,pos,er,bindingSet = this.actionBindings.get(h5c3.InputType.getName(eventCode));
            if (bindingSet === null) { return false; }

            // cycle through all the bindings against this input type and fire the object callbacks
            for (i = 0; i < bindingSet.length; i++)
            {
                binding = bindingSet[i];
                obj = bindingSet[i].object;
                if (!obj.isActive || obj.isActive())
                {
                    // if it's a positional event type (like a mouse down or move, then we only
                    // fire events to objects where the event is within its spatial bounds
                    if (h5c3.InputType.isPositional(eventCode))
                    {
                        pos = this.Class.getEventPosition(event);
                        er = null;
                        if (VLD(binding.uiTarget)) {
                            er = binding.uiTarget.getScreenRect();
						} else {
                            er = obj.getScreenRect ? obj.getScreenRect() : null;
						}

                        if (er && er.containsPoint(pos)) {
                            obj.onAction(binding.actionName, event, pos, binding.uiTarget);
						}
                    } else {
                        obj.onAction(binding.actionName);
					}
                }
            }
            return true;
        },

        /*** INTERNALS **/
        
        _onReady:function ()
        {
			_DBG_("onReady Event.",this.Class);
			/**
			if (h5c3.device.useTouch) {
				h5c3.device.game.canvas.addEventListener('touchstart', this._touchStart.bind(this), true);
				h5c3.device.game.canvas.addEventListener('touchend', this._touchEnd.bind(this), true);
				h5c3.device.game.canvas.addEventListener('touchmove', this._touchMove.bind(this), true);

				h5c3.device.touchpad.canvas.addEventListener('touchstart', this._touchStart.bind(this), true);
				h5c3.device.touchpad.canvas.addEventListener('touchend', this._touchEnd.bind(this), true);
				h5c3.device.touchpad.canvas.addEventListener('touchmove', this._touchMove.bind(this), true);
			} else {		
				// mouse input	
				//fixes a problem where double clicking causes text to get selected on the canvas
				h5c3.device.game.canvas.addEventListener('selectstart', function(event) { event.preventDefault(); return false; }, false);		
				h5c3.device.game.canvas.addEventListener('mouseup', this._mouseUp.bind(this), true);
				h5c3.device.game.canvas.addEventListener('mousedown', this._mouseDown.bind(this), true);
				h5c3.device.game.canvas.addEventListener('mousemove', this._mouseMove.bind(this), true);
				h5c3.device.game.canvas.addEventListener('mousewheel', this._mouseWheel.bind(this), true);
				h5c3.device.game.canvas.addEventListener('contextmenu', this._contextMenu.bind(this), true);
			}
			**/
			h5c3.device.game.obj.attachTouchEvents(this);
            // key input
            window.addEventListener('keydown', this._keyDown.bind(this), true);
            window.addEventListener('keyup', this._keyUp.bind(this), true);
        },

        _positionals: [], // array of bindings that need to be checked against positional events like mouse move and touch

        // Checks the positional event to see if it's a new event INSIDE an on-screen rectangle that has been
        // bound to a state. This is so when a positional event, like a mouse move, 'slides' over an element
        // we can turn the state on, as well as detecting when it slides out of the area of the uiTarget

        _checkPositional: function(moveEvent)
        {
			var i,binding,er,state,state2;
            // check existing tracked states -- did we move out of an element
            for (i=0; i < this._positionals.length; i++)
            {
                binding = this._positionals[i];

                if (moveEvent.type === 'mousemove' && h5c3.InputType.isTouch(h5c3.InputType.getCode(binding.input))) {
                    continue;
				}

                if (moveEvent.type === 'touchmove' && !h5c3.InputType.isTouch(h5c3.InputType.getCode(binding.input))) {
                    continue;
				}

                if (h5c3.InputType.getCode(binding.input) === h5c3.InputType.MOUSE_BUTTON_LEFT_UP ||
                    h5c3.InputType.getCode(binding.input) === h5c3.InputType.MOUSE_BUTTON_LEFT_DOWN ||
                    h5c3.InputType.getCode(binding.input) === h5c3.InputType.MOUSE_BUTTON_RIGHT_UP ||
                    h5c3.InputType.getCode(binding.input) === h5c3.InputType.MOUSE_BUTTON_RIGHT_DOWN ||
                    h5c3.InputType.getCode(binding.input) === h5c3.InputType.MOUSE_BUTTON_MIDDLE_UP ||
                    h5c3.InputType.getCode(binding.input) === h5c3.InputType.MOUSE_BUTTON_MIDDLE_DOWN ||
                    h5c3.InputType.getCode(binding.input) === h5c3.InputType.MOUSE_CLICK
                    ) {
                    continue;
				}

                er = null;
                if (VLD(binding.uiTarget)) {
                    er = binding.uiTarget.getScreenRect();
                } else {
                    er = binding.object.getScreenRect ? binding.object.getScreenRect() : null;
				}

                if (er)
                {
                    if (!er.containsPoint( this.Class.getEventPosition(moveEvent) ))
                    {
                        // no longer in the right position, turn state off
                        state = this.states.get(binding.object.uniqueId + '\\\\' + binding.stateName);
                        state.on = false;
                        state.event = moveEvent;
                    } else {
                        // moved into position, turn back on
                        state2 = this.states.get(binding.object.uniqueId + '\\\\' + binding.stateName);
                        state2.on = true;
                        state2.event = moveEvent;
                    }
                }
            }
        },

        _changeState:function (eventCode, stateOn, event)
        {
            // grab all the bindings to this event code
            var i,bindingSet,binding,pos,er,state,keyName = h5c3.InputType.getName(eventCode);
            if (keyName === null)
            {
                this.warn("Unknown keycode = " + eventCode);
                return false;
            }

            bindingSet = this.stateBindings.get(keyName);
            //this.debug('change state = ' + this.inputType.getName(event.keyCode,+ ' bindings=' + bindingSet));
            if (bindingSet === null) { return false; }

            // cycle through all the bindings against this input type and change the state
            for (i = 0; i < bindingSet.length; i++)
            {
                binding = bindingSet[i];
                if (!binding.object.isActive || binding.object.isActive())
                {
                    if (h5c3.InputType.isPositional(eventCode))
                    {
                        // if binding has a uiElement, then make sure the event hit is within the on-screen
                        // rectangle
                        pos = this.Class.getEventPosition(event);
                        er = null;

                        if (VLD(binding.uiTarget)) {
                            er = binding.uiTarget.getScreenRect();
                        } else {
                            er = binding.object.getScreenRect ? binding.object.getScreenRect() : null;
						}

                        if (er)
                        {
                            if (er.containsPoint(pos))
                            {
                                state = this.states.get(binding.object.uniqueId + '\\\\' + binding.stateName);
                                state.on = stateOn;
                                state.event = event;
                            }
                        } else
                        {
                            // positional, but no uiTarget
                            state = this.states.get(binding.object.uniqueId + '\\\\' + binding.stateName);
                            state.on = stateOn;
                            state.event = event;
                        }
                    }
                    else
                    {
                        state = this.states.get(binding.object.uniqueId + '\\\\' + binding.stateName);
                        state.on = stateOn;
                        state.event = event;
                    }
                }
            }
            return true;
        },

        _lastMouseMove: null,

        /**
         * Called by the h5c3.device main loop to process any move events received. We only handle events
         * here so they are processed once per cycle, not every time we get them (i.e. stop handling
         * a flood of mouse move or touch events
         */
        process: function()
        {
            if (this._lastMouseMove)
            {
                this._checkPositional(this._lastMouseMove);
                this.fireAction(h5c3.InputType.MOUSE_MOVE, this._lastMouseMove);
                this.Class.getEventPosition(this._lastMouseMove, this.mousePos);
                this._lastMouseMove = null;
            }
        },

        ///////////////////////////////////////////////////////////////////////////////////
        //
        //  EVENT HANDLERS
        //
        ///////////////////////////////////////////////////////////////////////////////////

        _keyDown:function (event)
        {
            if (this._changeState(event.keyCode, true, event)) {
                event.preventDefault();
			}

            if (this.fireAction(event.keyCode, event)) {
                event.preventDefault();
			}
        },

        _keyUp:function (event)
        {
            if (this._changeState(event.keyCode, false, event)) {
                event.preventDefault();
			}
        },

        _touchStart:function (event)
        {
			var i;
            for(i=0, len=event.touches.length; i < len; i++)
            {
                this._changeState(h5c3.InputType.TOUCH, true, event.touches[i]);
                this.fireAction(h5c3.InputType.TOUCH, event.touches[i]);
            }
            event.preventDefault();
        },

        _touchEnd:function (event)
        {
			var i;
            for(i=0, len=event.changedTouches.length; i < len; i++) {
                this._changeState(h5c3.InputType.TOUCH, false, event.changedTouches[i]);
			}
            event.preventDefault();
        },

        _touchMove:function (event)
        {
			var i;
            for(i=0, len=event.touches.length; i < len; i++) {
                this._checkPositional(event.touches[i]);
			}
            event.preventDefault();
        },

		_mouseButton:function (event, down) 
		{
           switch (event.button) 
		   {
                case 0: //Left Button
                    this._changeState(h5c3.InputType.MOUSE_BUTTON_LEFT_DOWN, down, event);
                    this._changeState(h5c3.InputType.MOUSE_BUTTON_LEFT_UP, !down, event);
                    this.fireAction(h5c3.InputType.MOUSE_BUTTON_LEFT_DOWN, event);
                    this.mouseLeftButtonDown = true;
                break;
                case 1: //Middle Button
                    this._changeState(h5c3.InputType.MOUSE_BUTTON_MIDDLE_DOWN, down, event);
                    this._changeState(h5c3.InputType.MOUSE_BUTTON_MIDDLE_UP, !down, event);
                    this.fireAction(h5c3.InputType.MOUSE_BUTTON_MIDDLE_DOWN, event);
                    this.mouseMiddleButtonDown = true;
                break;
                case 2: //Right Button
                    this._changeState(h5c3.InputType.MOUSE_BUTTON_RIGHT_DOWN, down, event);
                    this._changeState(h5c3.InputType.MOUSE_BUTTON_RIGHT_UP, !down, event);
                    this.fireAction(h5c3.InputType.MOUSE_BUTTON_RIGHT_DOWN, event);
                    this.mouseRightButtonDown = true;
                break;         
            }

            this.fireAction(h5c3.InputType.MOUSE_CLICK, event);
            // turn off specific states
            event.preventDefault();
		},
		
        _mouseUp:function (event)
        {
			this._mouseButton(event,false);
        },

        _mouseDown:function (event)
        {
			this._mouseButton(event,true);
        },

        _mouseMove:function (event)
        {
            this._lastMouseMove = event;
            event.preventDefault();
        },
				
        _contextMenu: function(event)
        {
            this._changeState(h5c3.InputType.MOUSE_BUTTON_RIGHT_UP, true, event);
            this.fireAction(h5c3.InputType.MOUSE_BUTTON_RIGHT_DOWN, event);
        },

        _mouseWheel:function (event)
        {
            if (event.wheelDelta > 0) {
                this.fireAction(h5c3.InputType.MOUSE_WHEEL_UP, event);
            } else {
                this.fireAction(h5c3.InputType.MOUSE_WHEEL_DOWN, event);
			}	
            event.preventDefault();
        }
    });

h5c3.InputType = h5c3.Base.extend('h5c3.InputType',
    {
        // STATICS
        nameToCode:null,
        codeToName:null,

        POSITIONAL_EVENT_START:     1000,
        MOUSE_MOVE:                 1100, // Basic mouse movement
		MOUSE_CLICK:				1110,
        MOUSE_BUTTON_LEFT_UP:       1200,
        MOUSE_BUTTON_LEFT_DOWN:     1201,
        MOUSE_BUTTON_RIGHT_UP:      1220,
        MOUSE_BUTTON_RIGHT_DOWN:    1221,
        MOUSE_BUTTON_MIDDLE_UP:     1230,
        MOUSE_BUTTON_MIDDLE_DOWN:   1231,
        MOUSE_WHEEL_UP:             1300,
        MOUSE_WHEEL_DOWN:           1301,
		
        TOUCH:                      1000,
        TOUCH_MOVE:                 1001,
        TOUCH_START:                1002,
        TOUCH_END:                  1003,
        TOUCH_CANCEL:               1004,
        TOUCH_LEAVE:                1005,

        init:function ()
        {
			var c,ch;
            this.nameToCode = new h5c3.Hashtable();
            this.codeToName = new h5c3.Hashtable();

            this.addInput(8, 'BACKSPACE');
            this.addInput(9, 'TAB');
            this.addInput(13, 'ENTER');
            this.addInput(16, 'SHIFT');
            this.addInput(17, 'CTRL');
            this.addInput(18, 'ALT');
            this.addInput(19, 'PAUSE');
            this.addInput(20, 'CAPS');
            this.addInput(27, 'ESC');
            this.addInput(32, 'SPACE');
            this.addInput(33, 'PAGE_UP');
            this.addInput(34, 'PAGE_DOWN');
            this.addInput(35, 'END');
            this.addInput(36, 'HOME');
            this.addInput(37, 'LEFT');
            this.addInput(38, 'UP');
            this.addInput(39, 'RIGHT');
            this.addInput(40, 'DOWN');
            this.addInput(45, 'INSERT');
            this.addInput(46, 'DELETE');

            // add alphanumierics
            for (c=48; c < 91; c++)
            {
                ch = String.fromCharCode(c);
                this.addInput(c, ch);
            }

            this.addInput(91, 'WINDOW_LEFT');
            this.addInput(92, 'WINDOW_RIGHT');
            this.addInput(93, 'SELECT');
            this.addInput(96, 'NUM_0');
            this.addInput(97, 'NUM_1');
            this.addInput(98, 'NUM_2');
            this.addInput(99, 'NUM_3');
            this.addInput(100, 'NUM_4');
            this.addInput(101, 'NUM_5');
            this.addInput(102, 'NUM_6');
            this.addInput(103, 'NUM_7');
            this.addInput(104, 'NUM_8');
            this.addInput(105, 'NUM_9');
            this.addInput(106, '*');
            this.addInput(107, '+');
            this.addInput(109, '-');
            this.addInput(110, '.');
            this.addInput(111, '/');
            this.addInput(112, 'F1');
            this.addInput(113, 'F2');
            this.addInput(114, 'F3');
            this.addInput(115, 'F4');
            this.addInput(116, 'F5');
            this.addInput(117, 'F6');
            this.addInput(118, 'F7');
            this.addInput(119, 'F8');
            this.addInput(120, 'F9');
            this.addInput(121, 'F10');
            this.addInput(122, 'F11');
            this.addInput(123, 'F12');
            this.addInput(144, 'NUM_LOCK');
            this.addInput(145, 'SCROLL_LOCK');
            this.addInput(186, ';');
            this.addInput(187, '=');
            this.addInput(188, ',');
            this.addInput(189, '-');
            this.addInput(190, '.');
            this.addInput(191, '/');
            this.addInput(192, '`');
            this.addInput(219, '[');
            this.addInput(220, '\\');
            this.addInput(221, ']');
            this.addInput(222, '\'');

            this.addInput(this.TOUCH, 'TOUCH');
//            this.addInput(this.TOUCH_MOVE, 'touchmove');
//            this.addInput(this.TOUCH_START, 'touchstart'); 
//            this.addInput(this.TOUCH_END, 'touchend');
//            this.addInput(this.TOUCH_CANCEL, 'touchcancel'); 
//            this.addInput(this.TOUCH_LEAVE, 'touchleave'); 

            this.addInput(this.MOUSE_BUTTON_LEFT_DOWN, 'MOUSE_BUTTON_LEFT_DOWN');
            this.addInput(this.MOUSE_BUTTON_LEFT_UP, 'MOUSE_BUTTON_LEFT_UP');
            this.addInput(this.MOUSE_BUTTON_RIGHT_DOWN, 'MOUSE_BUTTON_RIGHT_DOWN');
            this.addInput(this.MOUSE_BUTTON_RIGHT_UP, 'MOUSE_BUTTON_RIGHT_UP');
            this.addInput(this.MOUSE_BUTTON_MIDDLE_DOWN, 'MOUSE_BUTTON_MIDDLE_DOWN');
            this.addInput(this.MOUSE_BUTTON_MIDDLE_UP, 'MOUSE_BUTTON_MIDDLE_UP');
            this.addInput(this.MOUSE_WHEEL_UP, 'MOUSE_WHEEL_UP');
            this.addInput(this.MOUSE_WHEEL_DOWN, 'MOUSE_WHEEL_DOWN');
            this.addInput(this.MOUSE_MOVE, 'MOUSE_MOVE');
            this.addInput(this.MOUSE_CLICK, 'MOUSE_CLICK');
        },

        isTouch:function(inputCode)
        {
            return inputCode === this.TOUCH;
        },

        isPositional:function (inputCode)
        {
            return inputCode >= this.POSITIONAL_EVENT_START;
        },

        /**
         * Private utility method used by the constructor to add the input codes and lookup
         * names to both indexes/hash tables
         * @param  inputCode event input code (i.e. event.keyCode)
         * @param  inputName the human name of the input
         */
        addInput:function (inputCode, inputName)
        {
            this.codeToName.put(inputCode, inputName);
            this.nameToCode.put(inputName, inputCode);
        },

        /**
         * Returns the name of an input based on the event code
         * @param  inputCode
         */
        getName:function (inputCode)
        {
            return this.codeToName.get(inputCode);
        },

        /**
         * Returns the code of an input based on the input name
         * @param  inputName
         */
        getCode:function (inputName)
        {
            return this.nameToCode.get(inputName);
        }

    },
    {}
);

/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * See licence.txt for details
 */

 /**
 * Page - this class is used to create & manipulate the document in which the 
 * DIV and Canvas elements reside. It determines the device OS, Screen Dimensions
 * and orientation and reacts accordinaly. There is no need to interact with the
 * object. Everything is internal and automatic to the engine.
 */
h5c3.Page = h5c3.Base.extend('h5c3.Page',
    { 
		_CLASSNAME: 'Page',
		_CLASSVERSION:'0.1.0'
	},
    {
		device: null,
		wrapper:
		{
			div:null,			/** Container DIV for all other elements */
			dim:{w:0,h:0}		/** Actual wrapper div dimensions */
		},
		banner: 
		{
			name: null,			/** the name of the banner class that was constructed */
			obj: null,			/** the banner object constructed at startup */
			id:null,			/** element Id of the banner canvas */
			div:null,			/** div element upon which all banner drawing will occur */
			dim:{w:0,h:0}		/** Actual banner canvas dimensions */
		},	
		game:
		{
			name: null,			/** the name of the game class that was constructed */
			obj: null,			/** the game object constructed at startup */
			id:null,			/** element Id of the game/app canvas */
			canvas:null,		/** canvas element upon which all game/app drawing will occur */
			ctx:null,			/** current Game/App 2D draw context */		
			dim:{w:0,h:0}		/** Actual game/app canvas dimensions */
		},
		touchpad:
		{
			name: null,			/** the name of the touchpad class that was constructed */		        
			obj: null,			/** the tocupad object constructed at startup */
			id:null,			/** element Id of the touch canvas */        
			canvas:null,		/** canvas element upon which all touchpad drawing will occur */
			ctx:null,			/** current Touchpad 2D draw context */
			dim:{w:0,h:0}		/** Actual touchpad canvas dimensions */
		},
		
		options: {
			desktopsuspend:true,		/** Suspend/resume on losing or gaining focus */
			suspend:true,		/** Suspend/resume on losing or gaining focus */
			network:true		/** trigger events for going online or offline */
		},
        
		orientation: {
			event: false,		/** Whether or not we are reacting to the deviceorientation event */
			state: null			/** Orientation of the display/device. Determined by Engine */
		},						/** Landscape is for Desktop/Notebook non touch devices only. **/
								/** ALL touch devices are rendered in Portrait. **/
		devWindow:null,			/** Integrated Developer Window */
		
		init:function(owner,title)
		{
			this._super();
			this.device = owner;
			CHK(title,'Undefined Page');
			DOC().title = title;
			this.wrapper.div = GEI('waDIV');
			//this.waDIV(true); //Save waDIV innerHTML, False restores
			
			this.debug('Initialization started.');
			this.debug('UA='+window.navigator.userAgent);
			this.debug('Detected Device Screen Dimensions are ['+window.screen.availWidth+'x'+window.screen.availHeight+']');
			this.debug('Detected Device Usable Dimensions are ['+window.innerWidth+'x'+window.innerHeight+']');
			/** if touch device create canvas for touchpad **/
			if (this.device.useTouch) { 
				this.debug('Mobile Media Detected '+this.device.media.browser.name+' v'+this.device.media.browser.version+' on '+this.device.media.OS.name);
				this.initBanner();			
				this.initGame();
				this.initTouchPad();
			} else { 
				this.debug('Static Media Detected '+this.device.media.browser.name+' v'+this.device.media.browser.version+' on '+this.device.media.OS.name);
				//if (h5c3.devMode===true) { this.initBanner(); }
				this.initGame();
			}
						
			if (this.options.suspend===true) {
				this.debug('OPTION: Suspened on focus enabled.');
				window.addEventListener('blur', this._onBlur.bind(this), true);
				window.addEventListener('focus', this._onFocus.bind(this), true);
			} else {
				this.debug('OPTION: Suspened on focus disabled.');
			}
			
			if (this.options.network===true) {
				this.debug('OPTION: Network monitoring enabled.');
				window.document.addEventListener('offline', this._onOffline.bind(this), true);
				window.document.addEventListener('online', this._onOnline.bind(this), true);
			} else {
				this.debug('OPTION: Network monitoring disabled.');
			}
            window.onresize = this._onResize.bind(this);
		},
		
		initBanner:function()
		{
			var e = GEI('waDIV');
			this.banner.div = document.createElement("div"); 
			this.banner.div.id = this.banner.id = "waBannerDIV";
			this.banner.div.width = window.innerWidth;
			this.banner.div.height= 32;
			e.appendChild(this.banner.div);
			
			if (!this.banner.div) {	this.debug('Could not get a banner element using the id [' + this.banner.id + ']. '); }

			this.banner.obj = new h5c3.Banners(this.banner.div);
			if (!this.banner.obj) {	this.debug('Invalid Banner class. Must be named [Banners]'); }

			this.banner.dim = {w:this.banner.div.width, h:this.banner.div.height};
			this.debug('Created Banner panel ['+this.banner.dim.w+'x'+this.banner.dim.h+']');
		},
			
		initGame:function()
		{
			this.setOrientation();
			if (!VLD(this.game.canvas = GEI('waCANVAS'))) { 
				this.debug('ERROR: Could not attach to a canvas element using the id [' + this.game.id + ']. ');
			} else {
				this.game.ctx = this.game.canvas.getContext('2d');
				this.game.dim = {w:this.game.canvas.width, h:this.game.canvas.height};
				if (typeof Game === 'function') {
					this.game.obj = new Game(this.game);
				   if (!VLD(this.game.obj)) {
						this.debug('ERROR: Invalid Game class, Must be named [Game]');
					} else {
						this.debug('Created Game panel ['+this.game.dim.w+'x'+this.game.dim.h+']');
					}
				}
			}
		},
		
		initTouchPad:function()
		{
			var e = GEI('waDIV');
			this.touchpad.canvas = document.createElement("canvas"); 
			this.touchpad.canvas.id = this.touchpad.id = "pcTouchCanvas";
			this.touchpad.canvas.width = 1080;
			this.touchpad.canvas.height= 540;
			e.appendChild(this.touchpad.canvas);
			
            if (!this.touchpad.canvas) {
                throw 'device.js::initTouchpad() - Abort! Could not attach to a canvas element using the id [' + this.touchpad.id + ']. ';
			}

            this.touchpad.ctx = this.touchpad.canvas.getContext('2d');
			this.touchpad.dim = {w:this.touchpad.canvas.width, h:this.touchpad.canvas.height};
			this.touchpad.obj = new h5c3.TouchPad(this.touchpad.ctx,this.touchpad.dim);
            if (!this.touchpad.obj) {
                throw "device.js::initTouchpad() - Invalid touchpad class. Must be named [TouchPad]";
			}

			this.debug('Created Touchpad panel ['+this.touchpad.dim.w+'x'+this.touchpad.dim.h+']');
		},
		
		setOrientation:function() 
		{
			if (!this.device.started) {
				return;
			}
			if (window.DeviceOrientationEvent) {
				this.orientation.event = true;
				this.debug("Device Orientation is supported - Event Hooked Added.");
				window.addEventListener('deviceorientation', this.onDeviceMotion, false);
			} else {
				this.orientation.event = false;
				this.debug("Device Orientation not supported");
			}	
			
			if (h5c3.device.useTouch || window.innerHeight > window.innerWidth) {
				this.orientation.state = H5c3.ORIENTATION.PORTRAIT;
			} else {
				this.orientation.state = H5C3.ORIENTATION.LANDSCAPE;
			}
		},
		
		onDeviceMotion:function(event) {
			if (event.alpha===null || event.beta===null || event.gamma===null) {
				if (h5c3.device.page.orientation.event === true) {
					window.removeEventListener('deviceorientation', this.onDeviceMotion, false);
					h5c3.device.page.orientation.event = false;
					h5c3.device.page.debug("This device does not REALLY have orientation capabilities - Event Hooked Removed.");
				}
			}
		},
		
        _calcScreenSize:function ()
        {			
			if (this.orientation.state===H5C3.ORIENTATION.LANDSCAPE)
			{
				this.debug('Orientation set to Landscape.');
				if (!document.fullScreen) {
					GEI('waCANVAS').webkitRequestFullScreen();
				}
				this.wrapper.dim.w = window.innerWidth; this.wrapper.div.width = this.wrapper.dim.w+"px"; this.wrapper.div.style.width = this.wrapper.dim.w+"px";
				this.wrapper.dim.h = window.innerHeight; this.wrapper.div.height = this.wrapper.dim.h+"px"; this.wrapper.div.style.height = this.wrapper.dim.h+"px";
			}
			else
			{
				this.debug('Orientation set to Portrait.');
				this.wrapper.dim.w = window.innerWidth; this.wrapper.div.width = this.wrapper.dim.w+"px"; this.wrapper.div.style.width = this.wrapper.dim.w+"px";
				this.wrapper.dim.h = window.innerHeight; this.wrapper.div.height = this.wrapper.dim.h+"px"; this.wrapper.div.style.height = this.wrapper.dim.h+"px";
			}

			this.debug('Calculated screen space is ['+this.wrapper.dim.w+'x'+this.wrapper.dim.h+']');
			var remainingHeight = this.wrapper.dim.h;

			//Now assign all other dimension based off wrapper
			/** If in Portrait view, render single ad bar at top otherwise	**/
			/** use the extra space on either side of the game canvas		**/
			//if (h5c3.devMode===true) {
			//	this.banner.dim.w = this.wrapper.dim.w; 
			////	this.banner.div.width = this.banner.dim.w; 
			//	this.banner.div.style.width = this.banner.dim.w+"px";
			//	this.banner.dim.h = this.banner.div.height = 32; 
			//	this.banner.div.style.height = "32px";
			//	remainingHeight -= this.banner.dim.h;
			//}
			
			if (h5c3.device.useTouch) {
				this.game.dim.w = this.wrapper.dim.w; 
				this.game.canvas.style.width = this.game.dim.w+"px";
				this.game.dim.h = this.wrapper.dim.w; 
				this.game.canvas.style.height = this.game.dim.h+"px";
				remainingHeight -=this.game.dim.h;

				this.touchpad.dim.w = this.wrapper.dim.w; 
				this.touchpad.canvas.style.width = this.touchpad.dim.w+"px";
				this.touchpad.dim.h = remainingHeight; 
				this.touchpad.canvas.style.height = this.touchpad.dim.h+"px";
				remainingHeight -= this.touchpad.dim.h;
			} else {
				this.game.dim.w = this.wrapper.dim.w; 
				this.game.canvas.style.width = this.game.dim.w+"px";
				this.game.dim.h = this.wrapper.dim.h; 
				this.game.canvas.style.height = remainingHeight+"px";
				remainingHeight -=remainingHeight;
			}


			//if (h5c3.devMode) {
			//	this.debug('Used ['+this.banner.dim.w+'x'+this.banner.dim.h+'] for Banner Panel.');
			//}
			this.debug('Used ['+this.game.dim.w+'x'+this.game.dim.h+'] for Game Panel.');
			this.debug('Used ['+this.touchpad.dim.w+'x'+this.touchpad.dim.h+'] for Touchpad Panel.');
			
			if (remainingHeight !== 0) { this.debug("Layout was not done correctly. "+remainingHeight+'px difference.'); }
		},
		
		render:function()
		{
			//if (h5c3.devMode===true) { this.devWindow.objStats.update(h5c3.device.elapsed);	this.devWindow.objStats.draw();	}
		},
		
		waDIV:function(clear)
		{
			CHK(clear,true);
			this.wrapper.div.display = 'none';
			if (clear===true) {
				this.wrapper.div.innerHTML = '';
			} else {
				document.location.reload();
			}
			this.wrapper.div.display = 'block';
		},
				
		/**
		 * Triggers when the page loses focus
		*/
		_onBlur:function(event)
		{
			this.game.obj.onBlur();
		},
		
		/**
		 * Triggers when the page gets focus
		 */
		_onFocus:function(event)
		{
			this.game.obj.onFocus();
		},
		
		/**
		 * Triggers when the page goes offline
		*/
		_onOffline:function(event)
		{
			this.debug('Lost network connection.');
		},

		/**
		 * Triggers when the page come online
		*/
		_onOnline:function(event)
		{
			this.debug('Gained network connection.');
		},
		
		/**
		 * Triggers when the page is resized
		 */
        _onResize:function (e)
        {
			this.debug('Dimension changed detected.');
            this._calcScreenSize();
            this.game.dim.w = this.game.canvas.width;
            this.game.dim.h = this.game.canvas.height;
            this.game.obj.onResize(this.game.dim.w, this.game.dim.h);
			//if (h5c3.device.showDebug) this.devWindow.onResize();
        }, //end onResize()
		
        /**
         * Automatically called by onReady()
         */
        onReady:function ()
        {
			this.debug('onReady Called.');
			//if (h5c3.devMode) { this.banner.obj.onReady(); this.devWindow.onReady(); }
            this.game.obj.onReady();
            if (h5c3.device.useTouch) {
				this.touchpad.obj.onReady();
			}
			
        } //end onReady()
    });

/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * See licence.txt for details
 */

/**
 *  Engine
 *  H5C3 Framework
 *  Engine
 * @class  h5c3.Main
 *  h5c3.Base
 * 
 * 
 * 
 * h5c3.Main is the primary base class for creating a game and drives resources, core processing (cycling) your
 * game, and serves as a placeholder for scenes.
 * <h5>Basic Usage</h5>
 * 
 * Typically a h5c3.Main is constructed by the h5c3.start method call made from within your games index.html:
 * 
 * &ltscript&gt
 *    // h5c3.start will construct an instance of TheGame once the device (browser) is ready
 *    h5c3.start('waCANVAS', 'TheGame', '/mygame/js/', ['mygame.js']);
 * &lt/script&gt
 * (end)
 * When the h5c3.start system has finished preparing everything, it will dynamically construct an instance of
 * the class parameter (in the above example 'TheGame'). You can always gain access to the game from the global
 * h5c3.device:
 * 
 * var myGame = this;
 * (end)
 * 
 * To create a h5c3.Main, extend it and override what you need:
 * 
 * TheGame = h5c3.Main.extend('TheGame',
 * {},
 * {
 *     // onReady is called when the browser DOM is ready
 *     onReady:function ()
 *     {
 *         this._super();
 *
 *         // load resources
 *         // declare a base URL; saves you typing
 *         h5c3.loader.setBaseUrl('images/');
 *
 *         // add an image to the resource loader's queue
 *         h5c3.loader.add(new h5c3.Image('player-ship', 'ship1.png'));
 *
 *         // start the resource loader
 *         h5c3.loader.start(this.onLoading.bind(this), this.onLoaded.bind(this));
 *     },
 *
 *     onLoading:function (percentageComplete)
 *     {
 *         // draw title screen -- with loading bar
 *     }
 *
 * });
 * (end)
 * See the h5c3.Loader for more information on using the resource loader and the onLoading/onLoaded callbacks.
 * 

 * <h5>Pause/Resume</h5>
 * 
 * You can pause/resume individual scenes, or you can pause/resume all scenes by calling pause on the game:
 * 
 * myGame.pause();
 * myGame.resume();
 * myGame.togglePauseResume();
 * (end)
 *
 * <h5>Debugging</h5>
 * h5c3.Main sets up the following default input keys for debugging:
 * <ul>
 *     <li>F8 to enable/disable showing development window.</li>
 *     <li>F9 to enable/disable physics debugging across all layers.</li>
 *     <li>F10 to dump stats on the object pools.</li>
 *     <li>F11 toggle sound.</li>
 * </ul>
 */
h5c3.Main = h5c3.Base.extend('h5c3.Main', 
	{
		_CLASSNAME: 'Main',
		_CLASSVERSION:'0.1.0'
	},
    /** Interface: h5c3.Main.prototype */
    {
        scenes:			null,	/** (h5c3.LinkedList) List of all scenes in the game */       	
        activeScenes:	null, 	/** (h5c3.LinkedList) List of scenes current active */
        paused:			false,	/** (Boolean) Whether the game is currently paused. You can theGame.paused=true; to suspend all scenes **/
		ctx:			null,	/** current 2D draw context */
		dim:			null,		
		bQuit:			false,
		
        /**
         * Constructs a new WebApp using the supplied 2D Context, Size & optional FPS
         * @param  {Context} 2D Device Context for drawing
         * @param  {h5c3.Point} width and height for inital size
         * @param  Number fps Base frame rate in frames per second (fastest cycle time)
         */
        //init:function (ctx,size)
        init:function (obj)
        {
            this._super();
			_DBG_('Initializing '+this.Class.shortName+' object.',this.Class);
			this.ctx = obj.ctx;
			this.dim = obj.dim;
			this.canvas = obj.canvas;
            this.scenes = new h5c3.LinkedList();
            this.activeScenes = new h5c3.LinkedList();

            if (h5c3.devMode===true)
            {
                // bind some special keys for general debugging use
                h5c3.device.input.bindAction(this, 'developer window', 'F6');
                h5c3.device.input.bindAction(this, 'physics debug', 'F7');
                h5c3.device.input.bindAction(this, 'pool dump', 'F8');
                h5c3.device.input.bindAction(this, 'toggle sound', 'F9');
                h5c3.device.input.bindAction(this, 'reset', 'F10');
                h5c3.device.input.bindAction(this, 'exit', 'F12');
            }
            _DBG_("Initialization completed.",this.Class);
        },

        /**
         * Processes all active scenes (called automatically by h5c3.Device.cycle)
         * @return Boolean false indicates the device should stop running the game loop
         */
        process:function ()
        {
            if (this.paused || this.bQuit) return this.bQuit;

            var scene = this.getFirstActiveScene();
            while (scene)
            {
                scene.object().process();
                scene = scene.next();
            }

            return this.bQuit; // returns true to quit the update loop
        },

        stopAllSounds: function()
        {
            // stop any current sounds from playing
            var sounds = h5c3.loader.getAllSounds();
            for (var i = 0; i < sounds.length; i++)
            {
                if (h5c3.device.soundEnabled)
                    sounds[i].stop();
            }
        },

        /**
         * Base handler for input actions. This gives the game a chance to intercept and act on actions like
         * F9 and F10 for debugging. See h5c3.Input for more information on input handlers
         * @param  String actionName Name of the action to be handled
         */
        onAction:function (actionName)
        {
			switch (actionName) {
				case 'reset': h5c3.device.boot();
					break;
					
				case 'exit': this.quit();
					break;

				case 'developer window':
					if (VLD(h5c3.device.page.devWindow)) {
						_DBG_("Developer Window activated.",this.Class);
						h5c3.device.page.devWindow.toggleShow();
					} 
					else {_DBG_("Developer Window not available. Did you include the Plugin in your config? Are you running the debug.html version of your app?'",this.Class);}
					break;

				case 'toggle sound':
					this.stopAllSounds();
					h5c3.device.soundEnabled = !h5c3.device.soundEnabled;
					if (h5c3.device.soundEnabled) {
						h5c3.device.page.devWindow.send2Console('Sound Enabled.');
					} else {
						h5c3.device.page.devWindow.send2Console('Sound Disabled.');
					}
					break;
					
				case 'pool dump':
					h5c3.device.page.devWindow.send2Console('Object Pool Dump:\n===================');
					h5c3.device.page.devWindow.send2Console(h5c3.Pool.getStats());
					break;
					
				case 'physics debug':
					// find all physics systems, and toggle debug
					var sceneNode = this.getFirstScene();
					while (sceneNode)
					{
						var layerNode = sceneNode.object().getFirstActiveLayer();
						while (layerNode)
						{
							var layer = layerNode.object();
							if (layer.Class.isA('h5c3.EntityLayer'))
							{
								var systemNode = layer.systemManager.systems.first;
								while (systemNode)
								{
									var system = systemNode.object();
									if (system.Class.isA('h5c3.systems.Physics'))
										system.setDebug(!system.debug);
									systemNode = systemNode.next();
								}
							}
							layerNode = layerNode.next();
						}
						sceneNode = sceneNode.next();
					}
					break;
			} //End Switch
        },

        //
        // SCENES
        //
        /**
         * Add a scene to the game. Automatically makes the scene active. Once added, the game's onSceneAdded method
         * will be called.
         * @param  {h5c3.Scene} scene Scene to add
         */
        addScene:function (scene)
        {
			try {
				scene.ctx = this.ctx;
				this.scenes.add(scene);
				this.activeScenes.add(scene);
				this.onSceneAdded(scene);
			} catch (err) {
				AST(null,'Error Adding scene ['+scene+']: '+err);
			}
        },

        /**
         * Called whenever a scene is added to the game. Useful for handling setup or detecting when new scenes are
         * being added.
         * @param  {h5c3.Scene} scene Scene that was added
         */
        onSceneAdded:function (scene)
        {
        },

        /**
         * Removes a scene from the game. Will trigger a notifier call to onSceneRemoved
         * @param  {h5c3.Scene} scene Scene to remove
         */
        removeScene:function (scene)
        {
            this.scenes.remove(scene);
            this.activeScenes.remove(scene);
            this.onSceneRemoved(scene);
        },

        /**
         * Notifier callback when a scene is removed from this game
         * @param  {h5c3.Scene} scene Scene being removed
         */
        onSceneRemoved:function (scene)
        {
        },

        /**
         * Activates a scene (it will be rendered and processed)
         * @param  {h5c3.Scene} scene Scene you want to make active
         */
        activateScene:function (scene)
        {
			if (typeof(scene) !== "undefined") { 
				if (scene.active) return;

				this.activeScenes.add(scene);
				scene.active = true;
				this.onSceneActivated(scene);
				scene.onActivated();
			}
        },

        /**
         * Called when a scene has been activated.
         * @param  {h5c3.Scene} scene Scene that has been activated.
         */
        onSceneActivated:function (scene)
        {
        },

        /**
         * Deactivate a given scene
         * @param  {h5c3.Scene} scene Scene to deactivate
         */
        deactivateScene:function (scene)
        {
            if (!scene.active) return;

            this.activeScenes.remove(scene);
            scene.active = false;
            this.onSceneDeactivated(scene);
            scene.onDeactivated();
        },
		
        /**
         * Called when a scene has been deactviated
         * @param  {h5c3.Scene} scene Scene that was deactivated
         */
        onSceneDeactivated:function (scene)
        {
        },

        /**
         * Get the first active scene from the active scenes linked list
         * @return {h5c3.LinkedNode} Linked list node pointing to the first active scene (use getFirstActiveScene().object())
         * to get the scene.
         */
        getFirstActiveScene:function ()
        {
            return this.activeScenes.first;
        },

        /**
         * Get the first scene from the scene linkedlist
         * @return {h5c3.LinkedNode} Linked node pointing to the first scene
         */
        getFirstScene:function ()
        {
            return this.scenes.first;
        },

        //
        // lifecycle
        //

        /**
         * Pauses all scenes, which means no drawing or updates will occur. If you wish to pause game play and leave a menu
         * still running, then just pause the scene associated with game play, and not the menu scenes.
         */
        pause:function ()
        {
			if (!this.paused) {
				h5c3.device.handleTimers(false);
				this.paused = true;

				var nextScene = this.getFirstScene();
				while (nextScene)
				{
					nextScene.object().pause();
					nextScene = nextScene.next();
				}
			}
        },

        /**
         * @return Boolean True is the game is active (not paused)
         */
        isActive:function ()
        {
            return !this.paused;
        },

        /**
         * Resumes all scenes (after being paused)
         */
        resume:function ()
        {
			if (this.paused) {
				h5c3.device.handleTimers(true);
				this.paused = false;

				var nextScene = this.getFirstScene();
				while (nextScene)
				{
					nextScene.object().resume();
					nextScene = nextScene.next();
				}
			}
        },

        /**
         * Toggles pause/resume of the game
         */
        togglePauseResume:function ()
        {
            if (this.paused)
                this.resume();
            else
                this.pause();
        },

		quit:function($msg) {
			CHK($msg,'Quit Signal Received.');
			_DBG_($msg,this.Class);
			//h5c3.device.page.waDIV(false); //Save waDIV innerHTML, False restores
            this.onExit();			
			this.bQuit = true;
		},
		
		onExit:function()
		{
			_DBG_("CloudApp Exiting...",this.Class);
		},
		
        /**
         * Resets all scenes back to their starting state (by calling reset() on all scenes), then calling
         * clear() on all scenes, before finally calling the game class onReady
         */
        reset:function ()
        {
            // clear all scenes, layers, entities
            var nextScene = this.getFirstScene();
            while (nextScene)
            {
                nextScene.obj.reset();
                nextScene = nextScene.next();
            }

            this.scenes.clear();
            this.activeScenes.clear();

            // then restart the game
            this.onReady();
        },

		attachTouchEvents:function(obj)
		{
			if (h5c3.device.useTouch) {
				_DBG_("Attached Touch Events",this.Class);
				this.canvas.addEventListener('touchstart', obj._touchStart.bind(obj), true);
				this.canvas.addEventListener('touchend', obj._touchEnd.bind(obj), true);
				this.canvas.addEventListener('touchmove', obj._touchMove.bind(obj), true);

				h5c3.device.touchpad.canvas.addEventListener('touchstart', obj._touchStart.bind(obj), true);
				h5c3.device.touchpad.canvas.addEventListener('touchend', obj._touchEnd.bind(obj), true);
				h5c3.device.touchpad.canvas.addEventListener('touchmove', obj._touchMove.bind(obj), true);
			} else {		
				// mouse input	
				//fixes a problem where double clicking causes text to get selected on the canvas
				_DBG_("Attached Mouse & Keyboard Events",this.Class);
				this.canvas.addEventListener('selectstart', function(event) { event.preventDefault(); return false; }, false);		
				this.canvas.addEventListener('mouseup', obj._mouseUp.bind(obj), true);
				this.canvas.addEventListener('mousedown', obj._mouseDown.bind(obj), true);
				this.canvas.addEventListener('mousemove', obj._mouseMove.bind(obj), true);
				this.canvas.addEventListener('mousewheel', obj._mouseWheel.bind(obj), true);
				this.canvas.addEventListener('contextmenu', obj._contextMenu.bind(obj), true);
			}
		},
		
        /**
         * Called by the h5c3.Device when the game is ready to be started (also called when a reset() is done)
         */
        onReady:function ()
        {
			_DBG_("onReady received.",this.Class);
            // disable caching when developing
            if (h5c3.devMode===true) h5c3.loader.setDisableCache();
			if (h5c3.device.resourcesLoaded===false)
			{
				try {
					h5c3.resources.loadResources();
					h5c3.loader.start(this.onLoading.bind(this), this.onLoaded.bind(this));
					h5c3.device.resourcesLoaded = true;
				} catch (err) {
					console.log('ERROR: '+err);
				}
			}
        },
		
        /**
         * Called when the device canvas changes size (such as when a browser is resized)
         * @param  width Width of the canvas
         * @param  height Height of the canvas
         */
        onResize:function (width, height)
        {
            var nextScene = this.getFirstActiveScene();
            while (nextScene)
            {
                nextScene.obj.onResize(width, height);
                nextScene = nextScene.next();
            }
        },

		/**
		 * Triggers when the page loses focus
		*/
		onBlur:function(event)
		{
			if (!this.paused) {
				this.pause();
				_DBG_("Lost focus - Paused.",this.Class);
			}
		},
		
		/**
		 * Triggers when the page gets focus
		 */
		onFocus:function(event)
		{
			if (this.paused) {
				this.resume();
				_DBG_("Gained focus - Resuming.",this.Class);
			}
		},
		
        onLoading:function (percentageComplete)
        {},

        onLoaded:function (loaded, errored)
        {},

        /**
         * Convenience function to grab the size of the associated device screen
         * @return {h5c3.Rect} Rectangle of the current canvas
         */
        getScreenRect:function ()
        {
            return h5c3.Rect.create(0, 0, h5c3.device.dimGame.w, h5c3.device.dimGame.h);
        }
    });



/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * See licence.txt for details
 */

h5c3.systems = {};

/**
 * @class  h5c3.systems.System
 * 
 * 
 * 
 * The base class for all systems. See the entity systems guide for more information on creating your own systems.
 */

h5c3.systems.System = h5c3.Base.extend('h5c3.System', {
/** Interface: h5c3.systems.System */
	_CLASSNAME: 'Systems',
	_CLASSVERSION:'0.1.0'
},{
/** Interface: h5c3.systems.System.prototype */
	/** layer this system is on */
	layer: null,
	/** array of string component types this system handles */
	componentTypes: null,
	/** reference to the systems system manager (read-only) */
	systemManager: null,
	/** optional delay for running this system, default is 0 (which means run every cycle) */
	delay: 0,

	_lastRun: 0,

	/**
	 * Constructs a new system
	 * @param  Array componentTypes Array of strings representing the component types this system will handle
	 * @param  Number delay Amount of time delay in ms between runs. i.e. systems that don't need to run every.
	 */
	init: function(componentTypes, delay)
	{
		this._super();
		this.delay = CHK(delay, 0);
		if (!componentTypes instanceof Array)
			throw "Invalid component types array. Use a blank array ([]) if there are no components handled by the system.";
		this.componentTypes = componentTypes;
	},

	/**
	 * Called by the system manager to allow this system to take care of business. This default does nothing.
	 */
	processAll: function()
	{
	},

	/**
	 * Called by the system when the layer has changed size
	 */
	onResize: function()
	{
	},

	/**
	 * Called by the system when the origin changes
	 */
	onOriginChange: function(x, y)
	{
	},

	/**
	 * Called when this system instance is added to a layer
	 */
	onAddedToLayer: function(layer)
	{
	},

	/**
	 * Called when this system instance is removed from a layer
	 */
	onRemovedFromLayer:function (layer)
	{
	}
});

/**
 * @class  h5c3.systems.EntitySystem
 * 
 * [Extends <a href='h5c3.Base'>h5c3.System</a>]
 * 
 * A system that processes entities.
 */
h5c3.systems.EntitySystem = h5c3.systems.System.extend('h5c3.systems.EntitySystem', {
/** Interface: h5c3.systems.EntitySystem */
	_CLASSNAME: 'EntitySystem',
	_CLASSVERSION:'0.1.0'
},{
/** Interface: h5c3.systems.EntitySystem.prototype */
	/** list of entities that are to be process by this system */
	entities: null,
	/** holding place for entities that are to be removed at the end of each cycle */
	suicides: null,

	/**
	 * Constructor for a system
	 * @param  Array componentTypes An array of component types this system is interested in. Any entity with
	 * a component matching this type will be sent to this system for processing.
	 * @param  Number delay Amount of time between cycles for this system (default = 0)
	 */
	init: function(componentTypes, delay)
	{
		this._super(componentTypes, delay);
		this.entities = new h5c3.LinkedList();
		this.suicides = new h5c3.LinkedList();
	},

	/**
	 * Adds an entity to this system, but only if the entity has a component type matching one of the types
	 * used by this system (this.componentTypes)
	 * @param  {h5c3.Entity} entity Entity to add (if the entity's component type matches the systems
	 */
	addIfMatched: function(entity)
	{
		// checks the entity to see if it should be added to this system
		for (var i=0; i < this.componentTypes.length; i++)
			if (entity.hasComponentOfType(this.componentTypes[i]))
			{
				this.entities.add(entity);
				this.onEntityAdded(entity);
				return; // we only need to add an entity once
			}
	},

	/**
	 * Adds an entity to the system
	 * @param  {h5c3.Entity} entity Entity to add
	 */
	add: function(entity)
	{
		if (this.entities.has(entity)) return; // already in the list
		this.entities.add(entity);
		this.onEntityAdded(entity);
	},

	/**
	 * Removes an entity from this system -- ignored if the entity isn't there
	 * @param  {h5c3.Entity} entity Entity to remove
	 */
	remove: function(entity)
	{
		if (this.entities.remove(entity)) // return true if one was removed
			this.onEntityRemoved(entity);
	},

	/**
	 * Removes an entity from this system, but checks to see if it still matches first (has a component of
	 * the correct type). This is called by the entity manager when a component is removed
	 * @param  {h5c3.Entity} entity Entity to remove
	 */
	removeIfNotMatched: function(entity)
	{
		// checks the entity to see if it should be added to this system
		for (var i=0; i < this.componentTypes.length; i++)
		{
			if (entity.hasComponentOfType(this.componentTypes[i]))
				return; // still matches, abort removing
		}

		// we got to here, so nothing matched, ok to remove the entity
		this.remove(entity);
	},

	/**
	 * Processes all entities. If you override this method, make sure you call this._super() to give the entity
	 * system a chance to process and clean up all entities.
	 */
	processAll: function()
	{
		var next = this.entities.first;
		while (next)
		{
			this.process(next.obj);
			next = next.next();
		}

		next = this.suicides.first;
		while (next)
		{
			this.remove(next.obj);
			next = next.next();
		}
		this.suicides.clear();

	},

	/**
	 * Override this in your system to handle updating of matching entities
	 * @param  {h5c3.Entity} entity Entity to update
	 */
	process: function(entity) {},

	/**
	 * Adds the entity to the suicide list; it will be removed at the end of the cycle.
	 * @param  entity
	 */
	suicide: function(entity)
	{
		this.suicides.add(entity);
	},

	/**
	 * Called when an entity has been added to this system
	 * @param  {h5c3.Entity} entity Entity that was added
	 */
	onEntityAdded: function(entity) {},

	/**
	 * Called when an entity has been removed from this system
	 * @param  {h5c3.Entity} entity Entity that was removed
	 */
	onEntityRemoved: function(entity) {},

	/**
	 * Called when a component is added to an entity
	 * @param  {h5c3.Entity} entity Entity the component was added to
	 * @param  {h5c3.components.Component} component Component that was added
	 */
	onComponentAdded: function(entity, component) {},

	/**
	 * Called when a component is removed from an entity
	 * @param  {h5c3.Entity} entity Entity the component was removed from
	 * @param  {h5c3.components.Component} component Component that was removed
	 */
	onComponentRemoved: function(entity, component) {}

});

h5c3.components = {};

/**
 * @class  h5c3.components.Component
 * 
 * [Extends <a href='h5c3.Pooled'>h5c3.Pooled</a>]
 * 
 * The base class for components you want to create.
 */
h5c3.components.Component = h5c3.Pooled.extend('h5c3.components.Component',
/** Interface: h5c3.components.Component */
{
	_CLASSNAME: 'Component',
	_CLASSVERSION:'0.1.0',
	/**
	 * Constructor that acquires the component from an object pool.
	 * @return {h5c3.components.Component} A component object
	 */
	create:function ()
	{
		var c = this._super();
		c.active = true;
		return  c;		
	}
},
/** Interface: h5c3.components.Component.prototype */
{
	/** entity I am on, or null if I'm not on an entity */
	_entity: null,

	_type:null,

	/**
	 * Constructs a new component using the given type string
	 * @param  String type The type to assign the component
	 */
	init:function (type)
	{
		this._super();
		this._type = type;
	},

	/**
	 * Get the component type
	 * @return String The type
	 */
	getType:function ()
	{
		return this._type.toLowerCase();
	},

	/**
	 * Get the entity this component is currently in; null if not in an entity
	 * @return {h5c3.Entity} Entity
	 */
	getEntity: function()
	{
		return this._entity;
	},

	/**
	 * Called when the system is about to remove this component, which gives you a chance
	 * to override and do something about it
	 */
	onBeforeRemoved:function ()
	{
	}


});

/**
 * @class  h5c3.SystemManager
 * 
 * 
 * 
 * Manages systems that are within a layer.
 *
 * Unless you are building your own systems in a complex way, you should be using the h5c3.EntityLayer to handle
 * general system management.
 */
h5c3.SystemManager = h5c3.Base.extend('h5c3.SystemManager',
/** Interface: h5c3.SystemManager */
{
	_CLASSNAME: 'SystemManager',
	_CLASSVERSION:'0.1.0'
},
/** Interface: h5c3.SystemManager.prototype */
{
	/** h5c3.LinkedList of systems */
	systems:null,
	/** Index of the systems by component type */
	systemsByComponentType:null,
	/** layer the system is on */
	layer:null,

	/**
	 * Constructs a system manager.
	 */
	init:function (layer)
	{
		this.systems = new h5c3.LinkedList();
		this.systemsByComponentType = new h5c3.Hashtable();
		this.layer = layer;
	},

	/**
	 * Adds a system to the system manager
	 * @param  {h5c3.systems.System} system System to add
	 */
	add:function (system)
	{
		system.layer = this.layer;
		system.systemManager = this;

		this.systems.add(system);

		if (!VLD(system.componentTypes))
			throw 'systemmanager.js::add() - Invalid component types: it can be empty, but not undefined. Did you forget to ' +
				'add an init method to your system and/or not call this._super(componentTypes)';

		for (var i = 0; i < system.componentTypes.length; i++)
		{
			var ctype = system.componentTypes[i].toLowerCase();

			var list = this.systemsByComponentType.get(ctype);
			if (list == null)
			{
				// create a new linked list for systems matching this component type
				list = new h5c3.LinkedList();
				this.systemsByComponentType.put(ctype, list);
			}

			// add this system to the component type map, but only if it hasn't been added already
			if (!list.has(system))
				list.add(system);
		}

		// add all the entities to this system
		var entity = this.layer.entityManager.entities.first;
		while (entity)
		{
			this._handleEntityAdded(entity.object());
			entity = entity.next();
		}

		system.onAddedToLayer(this.layer);
	},

	/**
	 * Removes a system from the system manager
	 * @param  {h5c3.systems.System} system System to remove
	 */
	remove:function (system)
	{
		system.onRemovedFromLayer(system.layer);
		this.systems.remove(system);

		for (var i = 0; i < system.componentTypes; i++)
		{
			var list = this.systemsByComponentType.get(system.componentTypes[i].toLowerCase());
			assert(list != null, "Oops, trying to remove a system and it's not in the by type list");

			system.systemManager = null;
			list.remove(system);
		}
	},

	/**
	 * Gets systems based on a component type
	 * @param  String componentType Component type
	 * @return {h5c3.LinkedList} A linked list of the systems that have the given component type
	 */
	getByComponentType:function (componentType)
	{
		return this.systemsByComponentType.get(componentType);
	},

	/**
	 * Called when the origin of the layer changes
	 * @param  Number x x-position of the origin
	 * @param  Number y y-position of the origin
	 */
	onOriginChange:function (x, y)
	{
		var system = this.systems.first;
		while (system)
		{
			system.object().onOriginChange(x, y);
			system = system.next();
		}
	},

	_handleEntityAdded:function (entity)
	{
		// grab a list of all the component types from the entity
		var componentTypes = entity.getComponentTypes();
		for (var i = 0; i < componentTypes.length; i++)
		{
			// for every type, grab all the systems that use this type and add this entity
			var systems = this.systemsByComponentType.get(componentTypes[i].toLowerCase());
			if (systems)
			{
				var next = systems.first;
				while (next)
				{
					// add will check to make sure this entity isn't in there already
					next.obj.add(entity);
					next = next.next();
				}
			}
		}
	},

	_handleEntityRemoved:function (entity)
	{
		// grab a list of all the component types from the entity
		var componentMap = entity.getAllComponents();
		if (componentMap == null) return;
		var componentTypes = componentMap.keys();

		for (var i = 0; i < componentTypes.length; i++)
		{
			// for every type, grab all the systems that use this type and add this entity
			var systems = this.systemsByComponentType.get(componentTypes[i].toLowerCase());
			if (systems)
			{
				var next = systems.first;
				while (next)
				{
					// just a plain removal, since this entity is going entirely
					next.obj.remove(entity);
					next = next.next();
				}
			}
		}
	},

	_handleComponentAdded:function (entity, component)
	{
		// get a list of all the systems that are processing components of this type
		// then ask that system to add this entity, if it's not already there
		var list = this.systemsByComponentType.get(component.getType());
		if (list == null)
		{
			// this.warn('Entity (' + entity.toString() + ' added component ' + component + ' but no system is ' +
			//    ' handling components of type: ' + component.getType() +'. Did you forget to add a system' +
			//    ' to the system manager (and was it added to the same layer as this entity)?');
			return;
		}

		// todo: the systemsByComponentType map doesn't work well if systems support
		// multiple components; need to take a fresh look at that if multiple component types
		// support is added to systems (probably change the systemsByComponentType map support combinations
		// of components as a compound key (which map to a set of matching systems with no duplicates
		var next = list.first;
		while (next)
		{
			next.obj.add(entity);
			next.obj.onComponentAdded(entity, component);
			next = next.next();
		}
	},

	_handleComponentRemoved:function (entity, component)
	{
		// get a list of all the systems that are processing components of a given type
		var list = this.systemsByComponentType.get(component.getType());
		if (list == null) return;

		var next = list.first;
		while (next)
		{
			// then ask that system to remove this entity, but be careful that it no longer matches
			// another type might still apply to a given system
			next.obj.removeIfNotMatched(entity);
			next.obj.onComponentRemoved(entity, component);
			next = next.next();
		}

	},

	/**
	 * Process all the systems
	 */
	processAll:function ()
	{
		var next = this.systems.first;
		while (next)
		{
			if (next.obj.delay == 0 || (h5c3.device.now - next.obj._lastRun > next.obj.delay))
			{
				next.obj.processAll();
				if (next.obj.delay != 0)
					next.obj._lastRun = h5c3.device.now;
			}
			next = next.next();
		}
	},

	/**
	 * Called when the layer resizes
	 * @param  Number width Width of the layer
	 * @param  Number height Height of the layer
	 */
	onResize:function (width, height)
	{
		var next = this.systems.first;
		while (next)
		{
			next.obj.onResize(width, height);
			next = next.next();
		}
	}



});

/**
 * @class  h5c3.EntityManager
 * 
 * 
 * 
 * Manages entities in a layer. This is the primary entity manager for the entity system. It contains, indexes and
 * handles the lifecycle of all entities.
 *
 * Unless you are building your own systems in a complex way, you should be using the h5c3.EntityLayer to handle
 * general entity management.
 */
h5c3.EntityManager = h5c3.Base.extend('h5c3.EntityManager',
/** Interface: h5c3.EntityManager */
{
	_CLASSNAME: 'EntityManager',
	_CLASSVERSION:'0.1.0'
},
/** Interface: h5c3.EntityManager.prototype */
{
	/** Index of all entities by tag */
	entitiesByTag: null,
	/** All the components indexed by entityID (as a linked list) */
	componentsByEntity: null,
	/** All the components, indexed by entityId and componentType (catted) */
	componentsByEntityPlusType: null,

	/** Linked list of all entities */
	entities: null,
	/** entities to be removed at the end of processing */
	entitySuicides: null,
	/** the layer this entitymanager is within (set by the layer class) */
	layer: null,

	/**
	 * Constructs a new entity manager
	 * @param  {h5c3.EntityLayer} layer The entity layer this entity manager is doing work for
	 */
	init: function(layer)
	{
		this.layer = layer;
		this.entitiesByTag = new h5c3.HashList();
		this.entities = new h5c3.LinkedList();
		this.componentsByEntity = new h5c3.Hashmap();
		this.componentsByEntityPlusType = new h5c3.Hashmap();
		this.entitySuicides = new h5c3.LinkedList();
	},

	/**
	 * Called by the core game loop to give the manager a chance to cleanup
	 */
	cleanup: function()
	{
		var entity = this.entitySuicides.first;
		while (entity)
		{
			this._doRemoveEntity(entity.object());
			entity = entity.next();
		}

		this.entitySuicides.clear();
	},

	/**
	 * Adds an entity to the manager
	 * @param  {h5c3.Entity} entity Entity to add
	 * @param  String [tag] A convenient way to add an entity and tag at the same time
	 */
	add: function(entity, tag)
	{
		// add the entity to our big global map
		this.entities.add(entity);
		if (tag != undefined)
			this.entitiesByTag.add(tag, entity);

		// add this entity to the component type indexes
		var componentMap = entity.getAllComponents();
		if (componentMap != null)
		{
			var components = componentMap.values();
			for (var i=0; i < components.length; i++)
				this._addToComponentMap(entity, components[i]);
		}

		// let the system manager take care of business
		this.layer.systemManager._handleEntityAdded(entity);
	},

	/**
	 * Removes an entity from the manager
	 * @param  {h5c3.Entity} entity Entity to remove
	 */
	remove: function(entity)
	{
		if (!this.entitySuicides.has(entity))
		{
			this.entitySuicides.add(entity);
			entity.active = false;
		}
	},

	/**
	 * Removes a component from an entity, and releases it back to the pool
	 * @param  {h5c3.Entity} entity Entity to remove the component from
	 * @param  {h5c3.components.Component} component Component to remove
	 */
	removeComponent: function(entity, component)
	{
		this._removeFromComponentMap(entity, component);
		this.layer.systemManager._handleComponentRemoved(entity, component);
		entity._handleComponentRemoved(component);
		component._entity = null;
	},

	/**
	 * Adds a tag to an entity
	 * @param  {h5c3.Entity} entity Entity to add the tag to
	 * @param  String tag Tag to assign to the entity
	 */
	addTag: function(entity, tag)
	{
		if (entity.tags.indexOf(tag.toLowerCase()) != -1) return;

		this.entitiesByTag.add(tag.toLowerCase(), entity);
		entity.tags.push(tag.toLowerCase());
	},

	/**
	 * Removes a tag from an entity
	 * @param  {h5c3.Entity} entity Entity to remove the tag from
	 * @param  String tag Tag to remove
	 */
	removeTag: function(entity, tag)
	{
		this.entitiesByTag.remove(tag.toLowerCase(), entity);
		entity.tags.remove(tag.toLowerCase());
	},

	/**
	 * Gets all the entities that have a given tag
	 * @param  String tag Tag to match
	 * @return {h5c3.LinkedList} List of entities
	 */
	getTagged: function(tag)
	{
		return this.entitiesByTag.get(tag.toLowerCase());
	},

	/**
	 * Makes an entity active (processed by systems).
	 * @param  entity {h5c3.Entity} Entity to make active
	 */
	activate: function(entity)
	{
		if (entity.active) return;

		this.layer.systemManager._handleEntityAdded(entity);
		entity.active = true;
	},

	/**
	 * Makes an entity inactive (no longer processed)
	 * @param  {h5c3.Entity} entity Entity to deactivate
	 */
	deactivate: function(entity)
	{
		if (!entity.active) return;

		// remove from the systems - we still keep it in the entitymanager lists, but remove it
		// from the systems so it wont be processed anymore
		this.layer.systemManager._handleEntityRemoved(entity);

		// mark as inactive
		entity.active = false;
	},

	_doRemoveEntity: function(entity)
	{
		this.entities.remove(entity);
		var componentMap = entity.getAllComponents();
		if (componentMap != null)
		{
			var components = componentMap.values();
			for (var i=0; i < components.length; i++)
				this._removeFromComponentMap(entity, components[i]);
		}

		// remove entities from any tag map it exists in
		for (var t=0; t < entity.tags.length; t++)
			this.entitiesByTag.remove(entity.tags[t], entity);

		this.layer.systemManager._handleEntityRemoved(entity);

		entity.release();
	},

	/**
	 * Add a component to an entity
	 * @param  {h5c3.Entity} entity Entity to add the component to
	 * @param  {h5c3.components.Component} component Component to add
	 * @return {h5c3.components.Component} Component that was added (for convience)
	 */
	addComponent: function(entity, component)
	{
		// make sure this entity is in the correct component maps
		this._addToComponentMap(entity, component);
		entity._handleComponentAdded(component);
		this.layer.systemManager._handleComponentAdded(entity, component);
		component._entity = entity;
		return component;
	},

	/**
	 * Get a component of a given class from an entity
	 * @param  {h5c3.Entity} entity Entity that has the component you're looking for
	 * @param  String componentType Class of component to get (e.g. h5c3.component.Position)
	 */
	getComponent: function(entity, componentType)
	{
		return this.componentsByEntityPlusType.get(entity.objectId + ':' + componentType);
	},

	/**
	 * Gets the components in an entity
	 * @param  {h5c3.Entity} entity Entity you want the components of
	 * @return {h5c3.Hashtable} Hashtable of components keyed by component type
	 */
	getComponents: function(entity)
	{
		return this.componentsByEntity.get(entity.objectId);
	},

	/**
	 * Checks if a given entity contains a component of a given type
	 * @param  {h5c3.Entity} entity Entity to check
	 * @param  String componentType Type to check for
	 */
	hasComponentOfType: function(entity, componentType)
	{
		return this.componentsByEntityPlusType.containsKey(entity.objectId + ':' + componentType);
	},

	//
	// INTERNALS
	//
	_addToComponentMap: function(entity, component)
	{
		// Seeing a getType error here? Likely, you didn't call .create on your component? just maybe? hint hint
		if (this.componentsByEntityPlusType.get(entity.objectId + ':' + component.getType()))
		{
			// multiple components of the same type are not supported due to performance reasons
			throw ('entitymanager.js::_addToComponentMap() - adding component ' + component.getType() +
				' to entity ' + entity + ' when it already has one of that type');
		}
		this.componentsByEntityPlusType.put(entity.objectId + ':' + component.getType(), component);
		// seeing a getType error above? -- you forgot to use .create when constructing the component
		this.componentsByEntity.put(entity.objectId, component);
	},

	_removeFromComponentMap: function(entity, component)
	{
		// need to handle removing an entity that has attachments, remove the attached entities as well
		component.onBeforeRemoved();

		this.componentsByEntityPlusType.remove(entity.objectId + ':' + component.getType());
		this.componentsByEntity.remove(entity.objectId);
		component.release();
	}
});