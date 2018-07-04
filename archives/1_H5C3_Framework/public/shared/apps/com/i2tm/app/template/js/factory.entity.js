h5c3.EntityFactory = h5c3.EntityFactory.extend('EntityFactory',
    {},
    {
		
        init:function ()
        {
			this._super();
			//Setup All Sheets
            this.sheetMainmenu = new h5c3.SpriteSheet({ image:h5c3.device.loader.get('title').resource, frameWidth:512, frameHeight:128 });
			this.sheetPlayer = new h5c3.SpriteSheet({  image:h5c3.device.loader.get('puppy').resource, useRotation:true, frameWidth:70, frameHeight:124 });
            this.sheetPlayer.addAnimation({ offset:0, name:'floating', time:1500, frameCount:9 });
		},
				
        //create:function (layer, type, x, y, dir, shape)
        create:function (name,options)
        {
			$CHK(options.layer,null);
			$CHK(options.x,0);
			$CHK(options.y,0);
			$CHK(options.dir,0);
			$CHK(options.shape,0);
			
            var e = null;
			if (this.objects.type) return this.objects.type;

            switch (name)
            {
				case 'mainmenu':
                    e = h5c3.Entity.create(options.layer);
                    e.addTag(name);
					e.addComponent(h5c3.components.Sprite.create({ spriteSheet:this.sheetMainmenu}));
					e.addComponent(h5c3.components.Spatial.create(
						{
							w:this.sheetMainmenu.frameWidth, 
							h:this.sheetMainmenu.frameHeight
						}));
					e.addComponent(h5c3.components.Layout.create({ vertical:'center', horizontal:'center' }));
					return this.add(name,e);

				case 'player':
                    e = h5c3.Entity.create(options.layer);
					e.addTag(name);
					e.addComponent(h5c3.components.Sprite.create({ spriteSheet:this.sheetPlayer}));
					e.addComponent(h5c3.components.Spatial.create({w:this.sheetPlayer.frameWidth,h:this.sheetPlayer.frameHeight}));
					e.addComponent(h5c3.components.Layout.create({ vertical:'center', horizontal:'center' }));
					e.addComponent(h5c3.components.Input.create(
						{
							states:[
								['btnUp', ['UP']],
								['btnDn', ['DOWN']],
								['btnLf', ['LEFT']],
								['btnRt', ['RIGHT']],
								['btnA', ['1']],
								['btnB', ['2']],
								['btnB', ['3']],
								['btnX', ['4']]
							]
						}));
					return this.add(name,e);
            } //End Switch

            throw "Unknown entity type: " + type;
        } //end createEntity()
    });
