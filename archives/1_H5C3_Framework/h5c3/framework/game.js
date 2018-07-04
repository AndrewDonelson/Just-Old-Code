/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * Playcraft Engine - (C)2012 Playcraft Labs, Inc.
 * See licence.txt for details
 */
 
/**
 * 
 * @property Object SceneID Container for default game states
 * @property Number SceneID.LOADING The game is currently in a loading state
 * @property Number SceneID.PUBLISHER The game is currently in a intro state
 * @property Number SceneID.TITLE The game is currently in a title screen state
 * @property Number SceneID.MAINMENU The game is currently in a mainmenu state
 * @property Number SceneID.GAME The game is currently in a game state
 * @property Number SceneID.GAMEOVER The game is currently in a game over state
 * @property Number SceneID.CREDITS The game is currently in a credits state
 * Default:
 */
window.SceneID = 
{
    LOADING:	0x0000,
    PUBLISHER:	0x0001,
    TITLE:		0x0002,
    MAINMENU:   0x0003,
    GAME:		0x0004,
    GAMEOVER:	0x0005,
    CREDITS:	0x0006
};

/**
 * @property {SceneID} GAMESTATE Hold the current state of the game
 * Default: LOADING
 */
var GAMESTATE = SceneID.LOADING; 

/**
 * 
 *  H5C3 Framework
 *  Engine
 * @class  h5c3.Game
 *  h5c3.Main
 * 
 * [Extends <a href='h5c3.Base'>h5c3.Main</a>]
 * 
 * h5c3.Game is the primary base class for creating a game and drives resources, core processing (cycling) your
 * game, and serves as a placeholder for scenes.
 * <h5>Basic Usage</h5>
 * 
 * Typically a h5c3.Game is constructed by the h5c3.start method call made from within your games index.html:
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
 * To create a h5c3.Game, extend it and override what you need:
 * 
 * TheGame = h5c3.Game.extend('TheGame',
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
 */
h5c3.Game = h5c3.Main.extend('h5c3.Game', 
{},
    /** Interface: h5c3.Game.prototype */
    {
		/**
		 * @property {h5c3.Scene} loadingScene 
		 * Default: null
		 */
        loadingScene:	null,
		/**
		 * @property {h5c3.IntroScene} publisherScene 
		 * Default: null
		 */
		publisherScene:	null,
		
        /**
         * Constructs a new WebApp using the supplied 2D Context, Size & optional FPS
         * @param  {Context} 2D Device Context for drawing
         * @param  {h5c3.Point} width and height for inital size
         * @param  Number fps Base frame rate in frames per second (fastest cycle time)
         */
        //init:function (ctx,size)
        init:function (obj)
        {
            this._super(obj);
        },

        /**
         * Base handler for input actions. This gives the game a chance to intercept and act on actions
         * @param  String actionName Name of the action to be handled
         */
        onAction:function (actionName)
        {
			this._super(actionName);
        },

		setZoom:function(level) {
			
		},
		
        /**
         * Constructs a new WebApp using the supplied 2D Context, Size & optional FPS
         * @param  {h5c3.Scene} scene - A valid Scene
         * @param  Number scene_id - A valid SceneID
         * @return  None
         */
		setScene:function(scene, scene_id) {
			var scene_changed = false, scene_name = '';
			switch (scene_id) {
				case SceneID.LOADING:
					if (!$VLD(this.loadingScene)) {
						this.loadingScene = new h5c3.Scene('Loading Scene');
						this.loadingLayer = new h5c3.Layer({scene:this.loadingScene,name:'LoadingLayer'});
						this.loadingScene.addLayer(this.loadingLayer);
					} else {
						this.activateScene(this.loadingLayer);
					}
					scene_changed = true;
					scene_name = this.loadingScene.name;
					break;

				case SceneID.PUBLISHER:
					if (!$VLD(this.publisherScene)) {
						this.publisherScene = new h5c3.IntroScene();
						this.addScene(this.publisherScene);
					} else {
						this.activateScene(this.publisherScene);
					}
					scene_changed = true;
					scene_name = this.publisherScene.name;
					break;

				case SceneID.MAINMENU:
					if (!$VLD(this.mainmenuScene)) {
						this.mainmenuScene = new MainMenuScene();
						this.addScene(this.mainmenuScene);
					} else {
						this.activateScene(this.mainmenuScene);
					}
					scene_changed = true;
					scene_name = this.mainmenuScene.name;
					break;

				case SceneID.GAME:
					if (!$VLD(this.gameScene)) {
						this.gameScene = new GameScene();
						this.addScene(this.gameScene);
					} else {
						this.activateScene(this.GameScene);
					}
					scene_changed = true;
					scene_name = this.gameScene.name;
					break;
			} //End Switch
			
			if (scene_changed && scene !== null) {
				this.deactivateScene(scene);
				$_DBG_('Deactivated '+scene.name+', Activated '+scene_name,this.Class);
			}
		},
		
        /**
         * Called by the h5c3.Device when the game is ready to be started (also called when a reset() is done)
         */
        onReady:function ()
        {
			this._super();
			$_DBG_("onReady received.",this.Class);
			this.setScene(null,SceneID.LOADING);
        },

		/**
		* Displays the loading screen
		*
		* @param  Number percentageComplete The total percentage of loading being complete 0-100%
		* @return  None
		*/	
        onLoading:function (percentageComplete)
        {
			var centerX = (this.dim.w) / 2,	centerY = (this.dim.h) / 2;
			var width = 320*(percentageComplete/100);
			this.ctx.textAlign = 'center';
            this.ctx.clearRect(0, 0, this.dim.w, this.dim.h);
            this.ctx.fillStyle = "#00FF00";
            this.ctx.font = "normal 18px Verdana";
            this.ctx.fillText('Loading: ' + percentageComplete + '%', centerX, centerY+9);
			this.ctx.fillRect(centerX-160, centerY+80,width,16);
			this.ctx.fillStyle = '#00FF00';
			this.ctx.fill();
		},

		/**
		* Called when loading is completed. Changes the Game State publisher (intro scene)
		*
		* @param  Number loaded The total number of resources loaded.
		* @param  Number errored The total number of resources not loaded due to an error
		* @return  None
		*/	
        onLoaded:function (loaded, errored)
        {
			/** Everything is Loaded - Setup internal Factories **/
			
			//MOVED TO h5c3 main object as to be accessable by R2WL
			//h5c3.entityFactory = new h5c3.EntityFactory();
			//h5c3.soundFactory = new h5c3.SoundFactory();
			this.setScene(this.loadingScene,SceneID.PUBLISHER);
        }
	});
