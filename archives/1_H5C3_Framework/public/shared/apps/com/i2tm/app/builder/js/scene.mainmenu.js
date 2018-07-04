/*******************************************************************************************
 * Scene Class - A example Titlescreen/Menu scene for you to start from.
 * You may add your background, game title and menu here.
 * use
 *
 * @package	com.i2tm.web.skeleton
 * @author Andrew Donelson (nlaakald@gmail.com)
 * @version 0.1.0-alpha [dev|alpha|beta|chi|prod]
 *******************************************************************************************/

MainMenuScene = h5c3.Scene.extend('MainMenuScene',
    { },
    {
        layer:	null,	//Property to hold the Layer object of this scene
		sprite:	null,	//Property used to hold the Entity object

        init:function ()
        {
            this._super('MainMenu Scene');
            this.layer = this.addLayer(new h5c3.EntityLayer({scene:this, name:'mainmenuLayer', worldSizeX:this.ctx.canvas.width, worldSizeY:this.ctx.canvas.height}));					
            this.layer.addSystem(new h5c3.systems.Render());
			this.layer.addSystem(new h5c3.systems.Layout());
			this.sprite = h5c3.entityFactory.create('mainmenu',{layer:this.layer});

            h5c3.device.input.bindAction(this, 'skip', 'SPACE');
            h5c3.device.input.bindAction(this, 'skip', 'MOUSE_CLICK');
            h5c3.device.input.bindAction(this, 'skip', 'TOUCH');
        },

        onAction:function (actionName, event, pos)
        {
			if (actionName === 'skip') {
				h5c3.device.game.obj.setScene(this,SceneID.GAME);
			}			
        }
    });
