
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
	