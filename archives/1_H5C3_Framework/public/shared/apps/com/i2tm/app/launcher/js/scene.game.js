/*******************************************************************************************
 * Main program - A example game scene for you to start from
 *
 * @package	com.i2tm.web.skeleton
 * @author Andrew Donelson (nlaakald@gmail.com)
 * @version 0.1.0-alpha [dev|alpha|beta|chi|prod]
 *******************************************************************************************/
GameScene = h5c3.Scene.extend('GameScene',
    { },
    {
        layer:null,				//Property to hold the Layer object of this scene
		sprite:null,			//Property used to hold the Entity object

        init:function ()
        {
            this._super('Game Scene');
            this.layer = this.addLayer(new h5c3.EntityLayer({scene:this,name:'gameLayer',worldSizeX:this.ctx.canvas.width, worldSizeY:this.ctx.canvas.height}));
            this.layer.addSystem(new h5c3.systems.Render());
			this.layer.addSystem(new h5c3.systems.Layout());
			this.sprite = h5c3.entityFactory.create('player',{layer:this.layer});
			
			if (h5c3.device.useTouch)
				h5c3.device.touchpad.obj.touchpadScene.setTarget(this.sprite);
				
            h5c3.device.input.bindState(this, 'skip', 'ESC');
			//h5c3.device.loader.loadFile('css/form.css');
        },
		
        process:function ()
        {
            if (h5c3.device.input.isInputState(this, 'skip'))
            {
				h5c3.device.game.obj.quit();
				
			}

            // always call the super
            this._super();
        }
    });
