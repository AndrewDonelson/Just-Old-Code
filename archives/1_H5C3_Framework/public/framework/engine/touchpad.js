/*******************************************************************************************
 * Default H5C3 Integrated Touchpad
 *
 * @class  TouchPad
 * @extends h5c3.Game
 * @package	com.i2tm.web.h5c3
 * @author Andrew Donelson (nlaakald@gmail.com)
 * @version 0.1.2 beta
 *******************************************************************************************/
 
h5c3.TouchPad = h5c3.Main.extend('h5c3.TouchPad',
{},
{
	touchpadScene:null,
			
	init:function(ctx,dim)
	{
	    this._super(ctx,dim);
	},
	
	setInputTarget:function(entity)
	{
		if (this.touchpadScene) 
			this.touchpadScene.setTarget(entity);
	},
	
	onReady:function ()
	{
		this._super();
		this.touchpadScene = new h5c3.TouchpadScene(this.ctx,this.dim);
		this.addScene(this.touchpadScene);
	}
});
	
h5c3.TouchpadSystem = h5c3.systems.Input.extend('h5c3.TouchpadSystem',
{},
{

	init:function ()
	{
		this._super([ 'input' ], 10);
	},

	onAction:function (actionName, event, pos, uiTarget)
	{
	},

	process:function (entity)
	{
		this._super(entity);

		if (entity.hasTag('player'))
		{

			if (this.isInputState(entity, 'btnUp')) {this.debug(entity.tags[0]);}
			if (this.isInputState(entity, 'btnDn')) {this.debug(entity.tags[0]);}
			if (this.isInputState(entity, 'btnLf')) {this.debug(entity.tags[0]);}
			if (this.isInputState(entity, 'btnRt')) {this.debug(entity.tags[0]);}
			if (this.isInputState(entity, 'btnA')) {this.debug(entity.tags[0]);}
			if (this.isInputState(entity, 'btnB')) {this.debug(entity.tags[0]);}
			if (this.isInputState(entity, 'btnX')) {this.debug(entity.tags[0]);}
			if (this.isInputState(entity, 'btnY')) {this.debug(entity.tags[0]);}
		}
	}
});
	
h5c3.TouchpadScene = h5c3.Scene.extend('h5c3.TouchpadScene',
    { },
    {
		target:null,
        layer:null,
		btnUp:null,
		btnDn:null,
		btnLf:null,
		btnRt:null,
		btnA:null,
		btnB:null,
		btnX:null,
		btnY:null,
		
				
		/*******************************************************************************************
		 * Initialization method for this class
		 *******************************************************************************************/	
        init:function (ctx,dim)
        {
			this.ctx=ctx;
			this.dim=dim;
            this._super('TouchPad Scene');
            this.layer = this.addLayer(new h5c3.EntityLayer({scene:this, name:'touchpadLayer', worldSizeX:this.dim.w, worldSizeY:this.dim.h}));		
            this.layer.addSystem(new h5c3.systems.Render());
			this.layer.addSystem(new h5c3.systems.Layout());
            this.layer.addSystem(new h5c3.TouchpadSystem());
						
			this.touchpadSheet = new h5c3.SpriteSheet({ image:h5c3.loader.get('touchpad').resource, frameWidth:120, frameHeight:120, framesWide:5, framesHigh:1, useRotation:true});
			this.touchpadSheet.addAnimation({ name:'btnUp', frameX:0,frameCount:1});
			this.touchpadSheet.addAnimation({ name:'btnDn', frameX:0,frameCount:1});
			this.touchpadSheet.addAnimation({ name:'btnLf', frameX:0,frameCount:1});
			this.touchpadSheet.addAnimation({ name:'btnRt', frameX:0,frameCount:1});
			this.touchpadSheet.addAnimation({ name:'btnA', frameX:1,frameCount:1});
			this.touchpadSheet.addAnimation({ name:'btnB', frameX:2,frameCount:1});
			this.touchpadSheet.addAnimation({ name:'btnX', frameX:3,frameCount:1});
			this.touchpadSheet.addAnimation({ name:'btnY', frameX:4,frameCount:1});	
			
			this.initTouchpad();
		},
				
		setTarget:function(entity)
		{
			this.target=entity;
            this.btnUp.addComponent(h5c3.components.Input.create({ target:this.target, states:[['btnUp', ['TOUCH', 'MOUSE_LEFT_BUTTON','UP'], true]]}));
            this.btnDn.addComponent(h5c3.components.Input.create({ target:this.target, states:[['btnDn', ['TOUCH', 'MOUSE_LEFT_BUTTON','DOWN'], true]]}));
            this.btnLf.addComponent(h5c3.components.Input.create({ target:this.target, states:[['btnLf', ['TOUCH', 'MOUSE_LEFT_BUTTON','LEFT'], true]]}));
            this.btnRt.addComponent(h5c3.components.Input.create({ target:this.target, states:[['btnRt', ['TOUCH', 'MOUSE_LEFT_BUTTON','RIGHT'], true]]}));
            this.btnA.addComponent(h5c3.components.Input.create({ target:this.target, states:[['btnA', ['TOUCH', 'MOUSE_LEFT_BUTTON','1'], true]]}));
            this.btnB.addComponent(h5c3.components.Input.create({ target:this.target, states:[['btnB', ['TOUCH', 'MOUSE_LEFT_BUTTON','2'], true]]}));
            this.btnX.addComponent(h5c3.components.Input.create({ target:this.target, states:[['btnX', ['TOUCH', 'MOUSE_LEFT_BUTTON','3'], true]]}));
            this.btnY.addComponent(h5c3.components.Input.create({ target:this.target, states:[['btnY', ['TOUCH', 'MOUSE_LEFT_BUTTON','4'], true]]}));
		},
		
		createButton:function(tag,pos,dir)
		{
			var obj = h5c3.Entity.create(this.layer);
			obj.addTag(tag);
			obj.addComponent(h5c3.components.Sprite.create({ spriteSheet:this.touchpadSheet,currentAnim:tag}));
			obj.addComponent(h5c3.components.Spatial.create({x:pos.x, y:pos.y, dir:dir, w:this.touchpadSheet.frameWidth, h:this.touchpadSheet.frameHeight}));
			return obj;
		},
		
		initTouchpad:function()
		{
			var
				top = (this.dim.h-this.touchpadSheet.frameWidth)/2,
				left = this.touchpadSheet.frameWidth,
				right = this.dim.w-(this.touchpadSheet.frameWidth*2);
			
			this.btnUp = this.createButton('btnUp',{x:left+100,y:top+0},0); 	
			this.btnLf = this.createButton('btnLf',{x:left+0,y:top+100},-90);
			this.btnRt = this.createButton('btnRt',{x:left+200,y:top+100},90);
			this.btnDn = this.createButton('btnDn',{x:left+100,y:top+200},180);

			this.btnY = this.createButton('btnY',{x:right-100,y:top+0},0); 	
			this.btnX = this.createButton('btnX',{x:right-0,y:top+100},0);
			this.btnB = this.createButton('btnB',{x:right-200,y:top+100},0);
			this.btnA = this.createButton('btnA',{x:right-100,y:top+200},0);
		},
				
		/*******************************************************************************************
		 * Initialization method for player input. Called by init()
		 *******************************************************************************************/	
		initInput:function() 
		{
            if (h5c3.devMode===true) { this.debug('Initializing Touchpad Input'); }		
            h5c3.device.input.bindState(this, 'btnRight', 'RIGHT');	
            h5c3.device.input.bindState(this, 'btnLeft', 'LEFT');		
            h5c3.device.input.bindState(this, 'btnUp', 'UP');			
            h5c3.device.input.bindState(this, 'btnDn', 'DOWN');		
            h5c3.device.input.bindState(this, 'btnA', '1');
            h5c3.device.input.bindState(this, 'btnB', '2');
            h5c3.device.input.bindState(this, 'btnX', '3');
            h5c3.device.input.bindState(this, 'btnY', '4');

            h5c3.device.input.bindAction(this, 'Toggle Pause/Help/Resume', 'ESC');
            h5c3.device.input.bindAction(this, 'Toggle Sound', 'F11');
		},
								
		/*******************************************************************************************
		 * Event call by engine to handle action input from player
		 *******************************************************************************************/	
        onAction:function (actionName, event, pos)
        {
        },
				
		/*******************************************************************************************
		 * this classes main processing loop
		 *******************************************************************************************/	
        process:function ()
        {
            this.ctx.clearRect(0, 0, this.dim.w, this.dim.h);
            this._super();
        }
});
