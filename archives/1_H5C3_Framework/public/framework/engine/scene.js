/**
 * Playcraft Engine - (c) 2011 Playcraft Labs, inc.
 */

/**
 * @class  h5c3.Scene
 * 
 * 
 * 
 * A game is primarily a container for various "scenes", with each scene containing one or more layers. You can
 * construct a scene, and use addScene to add it to the game. This is typically done once all the queued resources
 * have been loaded:
 * 
 * onLoaded:function ()
 * {
 *    // construct the game scene
 *    this.gameScene = new GameScene();
 *
 *    // add it to the game
 *    this.addScene(this.gameScene);
 * }
 * (end)
 * Active scenes will be updated and drawn by the system, inactive ones will not. Adding a scene makes it active by
 * default.
 * 
 * To activate a scene (such as displaying a menu scene):
 * 
 * myGame.activateScene(myMenuScene);
 * (end)
 * You can likewise deactivate a scene (it will no longer be rendered or processed):
 * 
 * myGame.deactivateScene(myMenuScene);
 * (end)
 * Upon activating a scene, the game's onSceneActivated is called passing in the scene that became active. Likewise
 * onSceneDeactivated will be called when a scene is deactivated.
 * 
 * You can access scenes by calling getFirstScene or getFirstActiveScene which will return a h5c3.LinkedListNode you can
 * use to loop through the list of scenes:
 * 
 * var sceneNode = myGame.getFirstScene();
 * while (sceneNode)
 * {
 *    var scene = sceneNode.object();
 *    // scene.doSomething();
 *
 *    // move to the next one (will be null if done)
 *    sceneNode = sceneNode.next();
 * }
 * (end)
 */
h5c3.Scene = h5c3.Base.extend('h5c3.Scene',
    /** Interface: h5c3.Scene */
    {},
    /** Interface: h5c3.Scene.prototype */
    {
        name:null,				/** Name of the scene */
        layersByName:null,		/** An index of layers by name */
        layers:null,			/** Linked list of all layers in the scene */
        activeLayers:null,		/** Linked list of all active layers */
        paused:false,			/** Whether the scene is currently paused (read-only) */
        active:true,			/** Whether the scene is active (read-only) */
        viewPort: null,			/** h5c3.Rect of the current viewport */
		ctx:null,				/** current 2D draw context */
        viewPortCenter: null, 	/** readonly, changes when you call setViewPort */

        /**
         * Constructs a new scene with the given name
		 *
         * @param  String name Name of the scene, i.e. 'menu'
         * @param  String ctx current 2D draw context
         */
        init:function (name,ctx)
        {
            this._super();
			if (this.name = $CHK(name, null)) 
				this.name = name;
			if (!ctx) 
				this.ctx = h5c3.device.game.ctx; 
			else 
				this.ctx=ctx;
			
            this.layersByName = new h5c3.Hashtable();
            this.layers = new h5c3.LinkedList();
            this.activeLayers = new h5c3.LinkedList();

            this.viewPort = h5c3.Rect.create(0, 0, 0, 0); // set by setViewPort below
            this.viewPortCenter = h5c3.Point.create(0, 0);

            // set the view port to be the default size of the system canvas
            this.setViewPort(0, 0, h5c3.device.game.dim.w, h5c3.device.game.dim.h);

            // if the system has already started, then automatically call the onReady
            if (h5c3.device.started)
                this.onReady();
        },

        /**
         * Called when the device is ready
         */
        onReady:function ()
        {
            // signal all the layers that we're ready
            var next = this.layers.first;
            while (next)
            {
                next.obj.onReady();
                next = next.next();
            }
        },

        /**
         * Called when this scene is being activated
         */
        onActivated:function ()
        {
        },

        /**
         * Called when this scene has been deactivated
         */
        onDeactivated:function ()
        {
        },

        /**
         * Event notifier when the underlying game canvas is being resized
         * @param  Number width New width of the game canvas
         * @param  Number height New height of the game canvas
         */
        onResize:function (width, height)
        {
            this.setViewPort(this.viewPort.x, this.viewPort.y, width, height);

            var next = this.layers.first;
            while (next)
            {
                next.obj.onResize(width, height);
                next = next.next();
            }
        },

        /**
         * Sets the view port to the given top left postion (x, y) and dimensions (width and height)
         * The view port represents the on-screen pixels dimensions of the game relative to the
         * associated canvas. Use the view port dimensions to render different scenes at different
         * positions on screen. e.g. a game layer would typically be 0, 0, canvas.width, canvas.height
         * whereas a mini map may just be in the top left corner of the screen (0, 0, 100, 100).
         * @param  Number x X position to render the scene within the canvas (in screen pixels)
         * @param  Number y Y position to render the scene within the canvas (in screen pixels)
         * @param  Number width The maximum width to render (in screen pixels)
         * @param  Number height The maximum height to render (in screen pixels)
         */
        setViewPort:function (x, y, width, height)
        {
            this.viewPort.x = x;
            this.viewPort.y = y;
            this.viewPort.w = width;
            this.viewPort.h = height;
            this.viewPortCenter.x = this.viewPort.w / 2;
            this.viewPortCenter.y = this.viewPort.h / 2;
        },

        /**
         * Gets the current viewport (essentially an alias for viewPort used by abstract interfaces (such as
         * the input system). You can use it to if you want to write generic code that again layers, scenes and
         * entities, since this method is the same across all. Otherwise you can just read the viewport member
         * directly.
         */
        getScreenRect:function ()
        {
            return this.viewPort;
        },

        /**
         * Resorts layer processing/drawing order based on each layers zIndex value
         */
        sortLayers: function()
        {
            this.activeLayers.sort(
                function(a, b)
                {
                    return a.zIndex - b.zIndex;
                });
        },

        /**
         * Fired when a bound event/action is triggered in the input system. Use bindAction
         * to set one up. Override this in your subclass to do something about it.
         * @param  String actionName The name of the action that happened
         * @param  {Event} event Raw event object
         * @param  {h5c3.Point} pos Position, such as a touch input or mouse position
         */
        onAction:function (actionName, event, pos)
        {
        },

        /**
         * Gets whether the scene is active or not
         * @return Boolean True if active
         */
        isActive:function ()
        {
            return this.active;
        },

        /**
         * Gets a layer using a name
         * @param  String name Name of the layer you want
         * @return {h5c3.Layer} The layer
         */
        get:function (name)
        {
            return this.layersByName.get(name);
        },

        /**
         * Adds a layer to the scene. The added layer will automatically be made active.
         * @param  {h5c3.Layer} layer Layer you want to add
         * @return {h5c3.Layer} The layer you added, for convenience.
         */
        addLayer:function (layer)
        {
            if (!$VLD(layer)) {
                $_DBG_("Error: invalid layer",this.Class);
			}
            if (!$VLD(layer.name)) {
                $_DBG_("Error: trying to add a layer that has no name (forget to call this._super in your layer init?)",this.Class);
			}

            this.layersByName.put(layer.name, layer);
            this.layers.add(layer);
            this.activeLayers.add(layer);
            layer.active = true;
            layer.scene = this;
            layer.onAddedToScene();
            this.sortLayers();

            return layer;
        },

        /**
         * Remove a layer
         * @param  {h5c3.Layer} layer The layer you want to remove
         */
        removeLayer:function (layer)
        {
            this.layersByName.remove(layer.name);
            this.layers.remove(layer);
            this.activeLayers.remove(layer);
            layer.active = false;
            layer.scene = null;
            layer.onRemovedFromScene();
        },

        /**
         * Sets the layer to active
         * @param  {h5c3.Layer} layer Layer you want to make active
         */
        setLayerActive:function (layer)
        {
            this.activeLayers.add(layer);
            this.sortLayers();
            layer.active = true;
        },

        /**
         * Sets the layer to inactive
         * @param  {h5c3.Layer} layer Layer you want to make inactive
         */
        setLayerInactive:function (layer)
        {
            this.activeLayers.remove(layer);
            layer.active = false;
        },

        /**
         * Toggles a layer to active or inactive
         * @param  {h5c3.Layer} layer Layer you want to toggle
         */
        toggleLayerActive: function(layer)
        {
            if (layer.active)
                this.setLayerInactive(layer);
            else
                this.setLayerActive(layer);
        },

        /**
         * Gets the linked list node of the first active layer
         * @return {h5c3.LinkedListNode} Node pointing to the first layer
         */
        getFirstActiveLayer:function ()
        {
            return this.activeLayers.first;
        },

        /**
         * Gets the linked list node of the first layer
         * @return {h5c3.LinkedListNode} Node pointing to the first layer
         */
        getFirstLayer:function ()
        {
            return this.layers.first;
        },

        //
        // LIFECYCLE
        //
        startTime: 0,

        process:function ()
        {
			this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            // draw all the layers
            var next = this.activeLayers.first;
            while (next)
            {
                if (!next.obj.paused)
                {
                    next.obj.process();

                    this.startTime = Date.now();
                    next.obj.draw();
                    h5c3.device.lastDrawMS += (Date.now() - this.startTime);
                }
                next = next.next();
            }
        },

        /**
         * Pauses all active layers
         */
        pause:function ()
        {
            this.paused = true;
            var next = this.activeLayers.first;
            while (next)
            {
                next.obj.pause();
                next = next.next();
            }
        },

        /**
         * Resumes all active layers
         */
        resume:function ()
        {
            this.paused = false;
            var next = this.activeLayers.first;
            while (next)
            {
                next.obj.resume();
                next = next.next();
            }
        },

        /**
         * Resets all layers
         */
        reset:function ()
        {
            var next = this.layers.first;
            while (next)
            {
                next.obj.reset();
                next = next.next();
            }

            this.layers.clear();
            this.activeLayers.clear();
        },

        /**
         * Ask all the layers etc for any entities under the x, y position
         * @param  Number x the screen x position
         * @param  Number y the screen y position
         */
        entitiesUnderXY:function (x, y)
        {
            var found = [];
            var next = this.layers.first;
            while (next)
            {
                found.push(next.obj.entitiesUnderXY(x, y));
                next = next.next();
            }
        },


        /**
         * Loads all of the layers from a Tiled (TMX) map file. Tile layers will become instances of
         * TileLayer, objectgroups will become EntityLayers. Tile sets must have a name that matches an
         * available spritesheet image resource. Note that only a single tilesheet is currently supported.
         * @param  String levelData XML formatted TMX data
         */
        loadFromTMX:function (levelData, SceneFactory)
        {
            var xmlDoc = h5c3.device.parseXML(levelData.data);
            var mapXML = xmlDoc.getElementsByTagName('map')[0];

            var tileWidth = parseInt(mapXML.getAttribute('tilewidth'));
            var tileHeight = parseInt(mapXML.getAttribute('tileheight'));

            // load up the tilesets (note: only 1 is supported right now)
            // todo: add support for multiple tile sets

            //
            // TILESET
            //
            var tileSetXML = xmlDoc.getElementsByTagName('tileset')[0];
            var tsName = tileSetXML.getAttribute('name');
            //var tsImageWidth = tileSetXML.getAttribute('width');
            //var tsImageHeight = tileSetXML.getAttribute('height');
            var tileSheet = h5c3.loader.get(tsName);
            $AST(tileSheet, 'Unable to locate tile image resource: ' + tsName + '. It must match the tileset name in tiled.');

            var tsImageResource = h5c3.loader.get(tsName).resource;
            var tsSpriteSheet = new h5c3.SpriteSheet({ image:tsImageResource, frameWidth:tileWidth, frameHeight:tileHeight });

            // create a tileset object which marries (one or more spritesheet's) and contains tileproperty data
            // pulled from tiled

            var tileSet = new h5c3.TileSet(tsSpriteSheet);

            // load all the tile properties
            var tiles = xmlDoc.getElementsByTagName('tile');
            for (var p = 0; p < tiles.length; p++)
            {
                var tile = tiles[p];
                var tileId = parseInt(tile.getAttribute('id'));

                var pr = tile.getElementsByTagName('properties')[0];
                var props = pr.getElementsByTagName('property');

                for (var b = 0; b < props.length; b++)
                {
                    var prop = props[b];
                    var name = prop.getAttribute('name');
                    var value = prop.getAttribute('value');
                    tileSet.addProperty(tileId, name, value);
                }
            }

            //
            // LAYERS
            //
            var layers = xmlDoc.getElementsByTagName('layer');
            for (var m = 0; m < layers.length; m++)
            {
                switch(mapXML.getAttribute('orientation')) {
                    case 'isometric':
                        h5c3.IsoTileLayer.loadFromTMX(this, layers[m], tileWidth, tileHeight, tileSet);
                    break;

                    default:
                        h5c3.TileLayer.loadFromTMX(this, layers[m], tileWidth, tileHeight, tileSet);
                    break;
                }				
            }

            // load entity layers
            var objectGroups = xmlDoc.getElementsByTagName('objectgroup');
            for (var i = 0; i < objectGroups.length; i++)
            {
                // partial construction

                // fill in the rest using the data from the TMX file
                h5c3.EntityLayer.loadFromTMX(this, objectGroups[i], SceneFactory);
            }
        }
    });

/**
 * SceneFactory -- for creating & managing scenes (mostly just an interface class you extend from to create an scene factory).
 */
h5c3.SceneFactory = h5c3.Factory.extend('h5c3.SceneFactory',
    { },
    {
        
		init:function() 
		{
			this._super('Scene');
		},
				
		/**
         * Called by the Scene loader
		 *
		 * options = {name:'mySceneNoSpaces',sceneID:0x0010,ctx:aDifferentCtxThanGame.ctx}
		 *
         * @param  String name String type of the scene to create
         * @param  {h5c3.Layer} layer Layer the entity should be placed on
         */
        create:function (options)
		{
			$CHK(options.name,false);
			$CHK(options.sceneID,false);
			if (!opions.name || !options.sceneID) throw('You must provide a name & sceneID.');
			$CHK(options.ctx,h5c3.game.ctx);

			if (this.exists(options.name)) {
				this.activateScene(options.name);
			} else {
				var obj = new h5c3.Scene({name:'loading',sceneID:SceneID.LOADING});

			}
			return this.add(options.name,obj);
		}		
    });
