/*******************************************************************************************
 * Main program - The debugger used for H5C3 Applications
 *
 * @package	com.i2tm.web.debugger
 * @author Andrew Donelson (nlaakald@gmail.com)
 * @version 0.1.0-alpha [dev|alpha|beta|chi|prod]
 *******************************************************************************************/
var 
	GAMENAME = 'I2TM Debugger',
	GAMEVERSION = '0.1.0-alpha',
	GAMETAG = GAMENAME + ' v' + GAMEVERSION;

MySceneID = 
{
    MYSCENE01:	0x0010,
    MYSCENE02:	0x0011,
    MYSCENE03:	0x0012
};

Game = h5c3.Game.extend('Game',
    { },
    {
		//mainmenuScene:	null,
		gameScene:		null,
		
		init:function(obj)
		{
		    this._super(obj);
			h5c3.device.loader.loadFile('css/default.css');
			dbugger=new h5c3.Debugger();		
      	},

		inactivateAllScenes:function()
		{
			//this.setLayerInactive(this.mainmenuScene);
			this.setLayerInactive(this.gameScene);
		},
				
		setScene:function(a,b) 
		{
			this._super(a,b);
		},
		
        onReady:function ()
        {
            this._super();
			
        },
		
		onExit:function()
		{
			this._super();
		}
    });