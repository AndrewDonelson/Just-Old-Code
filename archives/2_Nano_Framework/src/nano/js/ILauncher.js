 
/**
 * @module R2WL
 *
 * @class I$Launcher
 * @extends I$Interface
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Interface',

	//What is the name of your new interface?
	'I$Launcher',
	
	/** @lends I$Interface */
	{		
		/** 
		 * This is an API so there can only be one instance.
		 *
		 * @property {number} maxTotalObjects
		 * @expose 
		 */
		maxTotalObjects:1,
		
		appPaused : false,
		appRunning : false,
		btnPlay: null,
		canvas: null,
		gameClass:null,
		gldlActive:false,
		/**
		 * Description
		 * @method enableFS
		 * @return 
		 */
		enableFS: function() {
			if (this['canvas'] && !this['canvas'].fullScreen) {
				if(this['canvas'].requestFullscreen)
					this['canvas'].requestFullscreen();
				else if(this['canvas'].webkitRequestFullscreen)
					this['canvas'].webkitRequestFullscreen();
				else if(this['canvas'].mozRequestFullScreen)
					this['canvas'].mozRequestFullScreen();
				else if(this['canvas'].msRequestFullscreen)
					this['canvas'].msRequestFullscreen();
			}
		},

		/**
		 * Description
		 * @method disableFS
		 * @return 
		 */
		disableFS: function() {
			if (this['canvas'] && this['canvas'].fullScreen) {
				if (D$.exitFullscreen) {
					D$.exitFullscreen();
				} else if (D$.mozCancelFullScreen) {
					D$.mozCancelFullScreen();
				} else if (D$.webkitCancelFullScreen) {
					D$.webkitCancelFullScreen();
				} else if (D$.msExitFullScreen) {
					D$.msExitFullScreen();
				}
			}
		}
		
	},
	/** @lends I$Interface.prototype */
	{
		/**
		 * Object Initialization
		 * @method init
		 * @return 
		 */
		init: function() {
			this['_super']();
			this.test = create('I$DeviceTest');
			//this.toggle('loader',true,true);
		},
		
		getCanvas:function() { return this['Class'].canvas; },
		
		isActive:function() { return (nldr['config']['modules'].gldl && typeof gldl != "undefined")?true:false; },
		
		//if game running or play button is enabled and orientation 
		//is not approved by game then pause and display warning
		/**
		 * Determine device orientation and respond accordinaly
		 * @method testOrientation
		 * @return 
		 */
		testOrientation: function() {
			if (window.innerWidth > window.innerHeight) {
				//this.toggle('main',true,true);
				//jQuery("#main").show();
				//jQuery("#page_warning").hide();
				this['Class'].appPaused = false;
			} else {
				this['Class'].appPaused = true;
				//this.toggle('warning',true,true);
				//jQuery("#page_warning").show();
				//jQuery("#main").hide();
			}
		},

		/*---/ Load Support Files/--------------------*/
		dependentFiles:function() {
			if (!M$['getDevMode']()) {
				nldr.addFile('i2tm/js/gldl.release.js');
				return ['js/game.min.js'];
			} else {
				nldr.addFile('i2tm/js/gldl.local.js');
				return [
					'src/class.ai.js','src/class.enemy.js','src/class.fighter.js','src/class.weapon.js',
					'src/layer.game.js','src/layer.hud.js','src/layer.stars.js',
					'src/scene.game.js','src/scene.loading.js','src/scene.publisher.js',
					'src/system.prizedropper.js','src/tools.js',
					'src/physics.js','src/game.js'
				];
			}
		},
		
		createGame:function() {
		
			/*---/ Load Game Library Development Layer (GLDL) /-----------------------*/
			if (this['vld'](nldr['config']['modules'].gldl))
				nldr.que(this.dependentFiles(),true);
		},
		
		onLoad:function() {
			gldl = create('I$GLDL');
			this.onLoaded();
			gldl.device.boot(this.getCanvas().id, 'TheGame');
			r2wl.launcher.play();	
		},
		/**
		 * Pause GLDL app
		 * @method pauseGame
		 * @return 
		 */
		pauseGame: function() {
			if (!this.isActive()) return;
			this['Class'].btnPlay.textContent = 'Resume';
			if (typeof(gldl.device.game)!='undefined')
				gldl.device.game.pause();
				
			M$['on']("btnQuit");
			M$['on']("btnReset");
			this.toggle('main',true,true);
			this['Class'].appPaused = true;
		},

		/**
		 * Resume the GLDL app
		 * @method resumeGame
		 * @return 
		 */
		resumeGame: function() {
			if (!this.isActive()) return;
			if (typeof(gldl.device.game)!='undefined')
				gldl.device.game.resume();
				
			this.toggle('game',true,true);
			this['Class'].appPaused = false;
		},
			
		/**
		 * Enter into fullscreen mode
		 * @method enableFullscreen
		 * @return 
		 */
		enableFullscreen: function() {
			this['Class'].enableFS();
		},

		/**
		 * Disable or exit fullscreen mode
		 * @method disableFullscreen
		 * @return 
		 */
		disableFullscreen: function() {
			this['Class'].disableFS();
		},
		
		/**
		 * Reset the GLDL app
		 * @method reset
		 * @return 
		 */
		reset: function() {
			if (!this.isActive()) return;
			gldl.device.game.reset();
			jQuery("#btnQuit").hide();
		},
		
		/**
		 * Quit the GLDL app
		 * @method quit
		 * @return 
		 */
		quit: function() {
			if (!this.isActive()) return;
			if (r2wl.launcher.Class.btnPlay) {
				M$['off']("btnQuit");
				M$['off']("btnReset");
				this['Class'].btnPlay.textContent = 'Play';
			}
			
			this.disableFullscreen();
			this['Class'].appRunning = false;
			this['Class'].appPaused = false;
			
			if ((typeof gldl.device != "undefined") && (typeof gldl.device.game != "undefined"))
				delete gldl.device.game;
				
			this.toggle('main',true,true);
		},

		/**
		 * Start the GLDL App
		 * @method play
		 * @return 
		 */
		play: function() {
			//using HTML5 for fullscreen (only newest Chrome + FF)
			if (!this.isActive()) {this.createGame();return;}
			
			if (!this['vld'](gldl.device.game)) return;
			
			if (!this['Class'].appPaused) {
				this.toggle('game',true,true);
						
				this['Class'].canvas.width = screen.width;
				this['Class'].canvas.height = screen.height;
				this['Class'].canvas.style.width = this['Class'].canvas.width+"px";
				this['Class'].canvas.style.height = this['Class'].canvas.height+"px";
				this['Class'].canvas.style.background = "black";
				
				this.enableFullscreen();
				this['Class'].appRunning = false;
			} else {
				this.enableFullscreen();
				this.resumeGame();
			}
		},

		/**
		 * toggle displaying / hiding sections
		 * @method toggle
		 * @param {string} section
		 * @param {boolean} show
		 * @param {boolean} othersOff
		 * @return 
		 */
		toggle:function(section,show,othersOff) {
			section = section.toLowerCase();

			if (othersOff==true) {
				M$['off']("main");
				M$['off']("page_warning");
				M$['off']("page_game");
				M$['off']("page_loader");
			}
			
			switch (section) {
				case 'body':
					if (show) M$['on']("body"); else M$['off']("body");
					break;
					
				case 'main':
					if (show) M$['on']("main"); else M$['off']("main");
					break;
					
				case 'warning':
					if (show) M$['on']("page_warning"); else M$['off']("page_warning");
					break;
					
				case 'game':
					if (show) M$['on']("page_game"); else M$['off']("page_game");
					break;
					
				case 'loader':
					if (show) {
						//M$['on']("page_loader");
						//get("body")[0].style.visibility="hidden";
					} else {
						//get("body")[0].style.visibility="visible";
						//M$['off']("page_loader");
					}
					break;
			}
		},
		/**
		 * Called after document is loaded
		 * @method onLoaded
		 * @return 
		 */
		onLoaded:function() {
			var $l=r2wl.launcher;
			if (GLDL && nldr['config']['modules'].gldl) {
				this['info']('Game Mode Detected...');
				//Load WEBGAME API			
				
			}
			if (this.isActive()) {
				if (!$l.Class.btnPlay) {
					$l.Class.btnPlay = M$['gei']('btnPlay');
					$l.Class.btnPlay.innerHTML = 'Play';
				}
				
				if (!$l.Class.canvas) {
					$l.Class.canvas = M$['gei']("page_game");
					$l.Class.canvas.allowfullscreen = true;
				}
				$l.quit();
				
				window.addEventListener("orientationchange", function() {
					$l.testOrientation();
				}, false);

				// Listen for resize changes
				window.addEventListener("resize", function() {
					$l.testOrientation();		
				}, false);

				$l.testOrientation();
				
				r2wl.redraw();
				//r2wl.test.init();
				
			}
			//Turn off Page_Loader
			$l.toggle("main",true,false);
			//$l.toggle('loader',false,false);
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

