SoundFactory = h5c3.SoundFactory.extend('SoundFactory',
    { },
    {
        init:function ()
        {
			this._super();
			if (!h5c3.device.soundEnabled) return;
        },

        play:function (name, loop)
        {
			if (!h5c3.device.soundEnabled) return;
            h5c3.checked(loop,false);

            switch (name)
            {
                case 'i2tm':
					this.i2tm.play(false);
					return;
				
            } //End Switch

            throw "Unknown sound: " + name;
        } //end createEntity()
    });
