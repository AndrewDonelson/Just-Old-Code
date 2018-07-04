/*******************************************************************************************
 * Main program - A skeleton project for you to start from
 *
 * @package	com.i2tm.web.template
 * @author Andrew Donelson (nlaakald@gmail.com)
 * @version 0.1.0-alpha [dev|alpha|beta|chi|prod]
 *******************************************************************************************/
var 
	GAMENAME = 'I2TM Template',
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
		mainmenuScene:	null,
		gameScene:		null,
		
		init:function(obj)
		{
		    this._super(obj);
      	},

		inactivateAllScenes:function()
		{
			this.setLayerInactive(this.mainmenuScene);
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