
/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * See licence.txt for details
 */
/**
 *  H5C3 Framework
 *  Engine
 * @class  h5c3.IntroLayer
 *  h5c3.Entitylayer
 *  Handles the Publisher Splash screen, the Framework splash screen and will 
 * optionally handle the WebApp splash screen. See below how to enable automatic 
 * display of the WebApp splash.
 * @example
 * In your HTML file embded XML include this:
 * 
 * <image name="splash" file="images/splash.png" /> 
 * (end)
 */
h5c3.IntroLayer = h5c3.EntityLayer.extend('h5c3.IntroLayer',
    { },
    {
		/**
		 * @property {h5c3.Entity} i2tmlabs Property used to hold the I2TM Publisher object
		 * Default: null
		 */
		i2tmlabs:	null,

		/**
		 * @property {h5c3.Entity} h5c3 Property used to hold the H5C3 Framework object
		 * Default: null
		 */
		h5c3:		null,

		/**
		 * @property {h5c3.Entity} splash Property used to hold the Application Splash object (optional)
		 * Default: null
		 */
		splash:		null,
	
		/**
		* Initialization method. Adds Publisher & Framework resources to loading Que.
		* Then parses the embded XML and ques all resources for loading.
		* @param  Object config {scene, name, worldSizeX, worldSizeY, zIndex}
		* @requires config.scene & congi.name
		* @
		*/	
        init:function (config)
        {
            this._super(config);		
            this.addSystem(new h5c3.systems.Render());
			this.addSystem(new h5c3.systems.Layout());
            this.addSystem(new h5c3.systems.Expiration());
            this.addSystem(new h5c3.systems.Effects());
			this.show('i2tm');
        },

		/**
		 * Used to select which Entity to display. 
		 *
		 * @param  String name Which Entity [i2tm|h5c3|splash]
		 */	
		show:function(name)
		{
			try {
				if (name==='i2tm') {
					this.sheetPublisher = new h5c3.SpriteSheet({ image:h5c3.loader.get('publisher').resource, frameWidth:1920, frameHeight:1080 });
					this.i2tmlabs = this.createEntity('i2tmlabs');
					h5c3.soundFactory.play('i2tm',{volume:0.5,loop:false});
				} else if (name==='h5c3') {
					this.sheetH5C3 = new h5c3.SpriteSheet({ image:h5c3.loader.get('h5c3').resource, frameWidth:1920, frameHeight:1080 });
					this.h5c3 = this.createEntity('h5c3');
				}
			} catch (err) {
				$_DBG_(printStatckTrack(err),this.Class);
			}
		},
		
		onEntityRemoved:function(entity)
		{
			$_DBG_(entity+' has been removed.',this.Class);
		},
		
		/**
		 * Used to crate an entity
		 *
		 * @param  String name Which Entity [i2tm|h5c3|splash]
		 */	
		createEntity:function(name)
		{
            var e = h5c3.Entity.create(this);
            e.addTag(name);
            switch (name)
            {
				case 'i2tmlabs':
					e.addComponent(h5c3.components.Sprite.create({ spriteSheet:this.sheetPublisher}));
					e.addComponent(h5c3.components.Spatial.create({w:this.sheetPublisher.frameWidth, h:this.sheetPublisher.frameHeight}));
					e.onRemoved = function() {
						h5c3.device.game.obj.publisherScene.layer.show('h5c3');
					};
					break;

				case 'h5c3':
					e.addComponent(h5c3.components.Sprite.create({ spriteSheet:this.sheetH5C3}));
					e.addComponent(h5c3.components.Spatial.create({w:this.sheetH5C3.frameWidth, h:this.sheetH5C3.frameHeight}));
					e.onRemoved = function() {h5c3.device.game.obj.setScene(h5c3.device.game.obj.publisherScene,SceneID.MAINMENU);};
					break;					
            } //End Switch
			e.addComponent(h5c3.components.Layout.create({ vertical:'center', horizontal:'center' }));					
			e.addComponent(h5c3.components.Expiry.create({lifetime:1000}));
			return e;
		}
	});
	
/**
 *  H5C3 Framework
 *  Engine
 * @class  h5c3.IntroScene
 *  h5c3.Scene
 *  Handles the Publisher Splash screen, the Framework splash screen and will 
 * optionally handle the WebApp splash screen. See below how to enable automatic 
 * display of the WebApp splash.
 * @example
 * In your HTML file embded XML include this:
 * 
 * <image name="splash" file="images/splash.png" /> 
 * (end)
 */
h5c3.IntroScene = h5c3.Scene.extend('h5c3.IntroScene',
    { },
    {
		/**
		 * @property {h5c3.EntityLayer} layer Property used to hold the layer object
		 * Default: null
		 */
        layer:null,

		/**
		* Initialization method.
		*/	
        init:function ()
        {
            this._super('Intro Scene');			
            this.layer = new h5c3.IntroLayer({scene:this, name:'introLayer', worldSizeX:this.ctx.canvas.width, worldSizeY:this.ctx.canvas.height});
			this.addLayer(this.layer);
            h5c3.device.input.bindAction(this, 'skip', 'SPACE');
            h5c3.device.input.bindAction(this, 'skip', 'MOUSE_CLICK');
            h5c3.device.input.bindAction(this, 'skip', 'TOUCH');
        },

        onAction:function (actionName, event, pos)
        {
			if (actionName === 'skip') {
				h5c3.device.game.obj.setScene(this,SceneID.MAINMENU);
			}			
        }
    });
