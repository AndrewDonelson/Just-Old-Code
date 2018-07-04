
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



