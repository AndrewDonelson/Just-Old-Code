/**
 * Playcraft Engine - (c) 2011 Playcraft Labs, inc.
 */

/**
 * <p>
 * A game is primarily a container for various "scenes", with each scene containing one or more layers. You can
 * construct a scene, and use addScene to add it to the game. This is typically done once all the queued resources
 * have been loaded:
 * <pre><code>
 * onLoaded:function ()
 * {
 *    // construct the game scene
 *    this.gameScene = new GameScene();
 *
 *    // add it to the game
 *    this.addScene(this.gameScene);
 * }
 * </code></pre>
 * Active scenes will be updated and drawn by the system, inactive ones will not. Adding a scene makes it active by
 * default.
 * <p>
 * To activate a scene (such as displaying a menu scene):
 * <pre><code>
 * myGame.activateScene(myMenuScene);
 * </code></pre>
 * You can likewise deactivate a scene (it will no longer be rendered or processed):
 * <pre><code>
 * myGame.deactivateScene(myMenuScene);
 * </code></pre>
 * Upon activating a scene, the game's onSceneActivated is called passing in the scene that became active. Likewise
 * onSceneDeactivated will be called when a scene is deactivated.
 * <p>
 * You can access scenes by calling getFirstScene or getFirstActiveScene which will return a $m.df.LinkedListNode you can
 * use to loop through the list of scenes:
 * <pre><code>
 * var sceneNode = myGame.getFirstScene();
 * while (sceneNode)
 * {
 *    var scene = sceneNode.object();
 *    // scene.doSomething();
 *
 *    // move to the next one (will be null if done)
 *    sceneNode = sceneNode.next();
 * }
 * </code></pre>
 * @class $m.df.Scene
 */
$m.df.Scene = $m.df.Base.extend('$m.df.Scene',
    /** @lends $m.df.Scene */
    {},
    /** @lends $m.df.Scene.prototype */
    {
        /** Name of the scene */
        name:null,
        /** An index of layers by name */
        layersByName:null,
        /** Linked list of all layers in the scene */
        layers:null,
        /** Linked list of all active layers */
        activeLayers:null,
        /** Whether the scene is currently paused (read-only) */
        paused:false,
        /** Whether the scene is active (read-only) */
        active:false,
        /** $m.df.Rect of the current viewport */
        viewPort: null,

        viewPortCenter: null, // readonly, changes when you call setViewPort

        /**
         * Constructs a new scene with the given name
         * @param {String} name Name of the scene, i.e. 'menu'
         */
        init:function (name)
        {
            this._super();
            this.active = false;
            this.name = name;
            this.layersByName = new $m.df.Hashtable();
            this.layers = new $m.df.LinkedList();
            this.activeLayers = new $m.df.LinkedList();

            this.viewPort = $m.df.Rect.create(0, 0, 0, 0); // set by setViewPort below
            this.viewPortCenter = $m.df.Point.create(0, 0);

            // set the view port to be the default size of the system canvas
            this.setViewPort(0, 0, gldl.device.canvasWidth, gldl.device.canvasHeight);

            // if the system has already started, then automatically call the onReady
            if (gldl.device.started)
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
         * @param {Number} width New width of the game canvas
         * @param {Number} height New height of the game canvas
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
         * @param {Number} x X position to render the scene within the canvas (in screen pixels)
         * @param {Number} y Y position to render the scene within the canvas (in screen pixels)
         * @param {Number} width The maximum width to render (in screen pixels)
         * @param {Number} height The maximum height to render (in screen pixels)
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
         * @param {String} actionName The name of the action that happened
         * @param {Event} event Raw event object
         * @param {$m.df.Point} pos Position, such as a touch input or mouse position
         */
        onAction:function (actionName, event, pos)
        {
        },

        /**
         * Gets whether the scene is active or not
         * @return {Boolean} True if active
         */
        isActive:function ()
        {
            return this.active;
        },

        /**
         * Gets a layer using a name
         * @param {String} name Name of the layer you want
         * @return {$m.df.Layer} The layer
         */
        get:function (name)
        {
            return this.layersByName.get(name);
        },

        /**
         * Adds a layer to the scene. The added layer will automatically be made active.
         * @param {$m.df.Layer} layer Layer you want to add
         * @return {$m.df.Layer} The layer you added, for convenience.
         */
        addLayer:function (layer)
        {
            if (!$m.df.valid(layer))
                throw "Error: invalid layer";
            if (!$m.df.valid(layer.name))
                throw "Error: trying to add a layer that has no name (forget to call this._super in your layer init?)";

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
         * @param {$m.df.Layer} layer The layer you want to remove
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
         * @param {$m.df.Layer} layer Layer you want to make active
         */
        setLayerActive:function (layer)
        {
            this.activeLayers.add(layer);
            this.sortLayers();
            layer.active = true;
        },

        /**
         * Sets the layer to inactive
         * @param {$m.df.Layer} layer Layer you want to make inactive
         */
        setLayerInactive:function (layer)
        {
            this.activeLayers.remove(layer);
            layer.active = false;
        },

        /**
         * Toggles a layer to active or inactive
         * @param {$m.df.Layer} layer Layer you want to toggle
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
         * @return {$m.df.LinkedListNode} Node pointing to the first layer
         */
        getFirstActiveLayer:function ()
        {
            return this.activeLayers.first;
        },

        /**
         * Gets the linked list node of the first layer
         * @return {$m.df.LinkedListNode} Node pointing to the first layer
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
            // draw all the layers
            var next = this.activeLayers.first;
            while (next)
            {
                if (!next.obj.paused)
                {
                    next.obj.process();

                    this.startTime = Date.now();
                    next.obj.draw();
                    gldl.device.lastDrawMS += (Date.now() - this.startTime);
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
         * @param {Number} x the screen x position
         * @param {Number} y the screen y position
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
         * @param {String} levelData XML formatted TMX data
         */
        loadFromTMX:function (levelData, entityFactory)
        {
            var xmlDoc = gldl.device.parseXML(levelData.data);
            var mapXML = xmlDoc.getElementsByTagName('map')[0];

            var tileWidth = parseInt(mapXML.getAttribute('tilewidth'));
            var tileHeight = parseInt(mapXML.getAttribute('tileheight'));

            //
            // TILESETS
            //
            var tileSets = [];
            var tileSetNodes = xmlDoc.getElementsByTagName('tileset');
            for(var i=0; i < tileSetNodes.length; i++) {
              var tileSetXML = tileSetNodes[i];
              var tsName = tileSetXML.getAttribute('name');
              var tsImageWidth = tileSetXML.getAttribute('width');
              var tsImageHeight = tileSetXML.getAttribute('height');
              var tsTileWidth = $m.df.checked(tileSetXML.getAttribute('tilewidth'), tileWidth);
              var tsTileHeight = $m.df.checked(tileSetXML.getAttribute('tileheight'), tileHeight);
              var tsIdOffset = parseInt($m.df.checked(tileSetXML.getAttribute('firstgid'), '1'))-1;
              var tileSheetLoaderItem = gldl.device.loader.get(tsName);
              $m.df.assert(tileSheetLoaderItem, 'Unable to locate tile image resource: ' + tsName + '. It must match the tileset name in tiled.');

              var tsImageResource = tileSheetLoaderItem.resource;
              var tsSpriteSheet = new $m.df.SpriteSheet({ image:tsImageResource, frameWidth:tsTileWidth, frameHeight:tsTileHeight });


              // create a tileset object which marries (one or more spritesheet's) and contains tileproperty data
              // pulled from tiled

              var tileSet = new $m.df.TileSet(tsSpriteSheet, 0,0, tsIdOffset);
              tileSets.push(tileSet);

              // load all the tile properties
              var tiles = tileSetXML.getElementsByTagName('tile');
              for (var p = 0; p < tiles.length; p++)
              {
                var tile = tiles[p];
                var tileId = parseInt(tile.getAttribute('id'));

                var pr = tile.getElementsByTagName('properties')[0];
                if(pr)
                {
                  var props = pr.getElementsByTagName('property');

                  for (var b = 0; b < props.length; b++)
                  {
                    var prop = props[b];
                    var name = prop.getAttribute('name');
                    var value = prop.getAttribute('value');
                    tileSet.addProperty(tileId + tsIdOffset, name, value);
                  }
                }
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
                        $m.df.IsoTileLayer.loadFromTMX(this, layers[m], tileWidth, tileHeight, tileSets);
                    break;

                    default:
                        $m.df.TileLayer.loadFromTMX(this, layers[m], tileWidth, tileHeight, tileSets);
                    break;
                }
            }

            // load entity layers
            var objectGroups = xmlDoc.getElementsByTagName('objectgroup');
            for (var i = 0; i < objectGroups.length; i++)
            {
                // partial construction

                // fill in the rest using the data from the TMX file
                var group = objectGroups[i];
                var tilesWide = parseInt(group.getAttribute('width'));
                var tilesHigh = parseInt(group.getAttribute('height'));
                $m.df.EntityLayer.loadFromTMX(this, group, entityFactory, tilesWide*tileWidth, tilesHigh*tileHeight);
            }

            for(var next = this.layers.first; next; next = next.next())
            {
                var layer = next.obj;
                if(layer.originTrackName) {
                    layer.originTrack = this.get(layer.originTrackName);
                    layer.originTrackName = null;
                }
            }
        },

        /**
         * Load tilemap and tilesets from a Javascript object as
         * exported by the Tiled map editor when you export to
         * JSON or JSONP.
         */
        loadFromJson: function(info, entityFactory)
        {
          var tileWidth = info.tileheight;
          var tileHeight = info.tilewidth;

          var tileSets = []
          info.tilesets.forEach(function(ts) {
            var tsName = (ts.properties.resourceName || ts.name);
            var tsImageWidth = ts.imagewidth;
            var tsImageHeight = ts.imageheight;
            var tsTileWidth = ts.tilewidth;
            var tsTileHeight = ts.tileheight;
            var tsIdOffset = ts.firstgid-1;
            tileSheetLoaderItem = gldl.device.loader.get(tsName);
            $m.df.assert(tileSheetLoaderItem, 'Unable to locate tile image resource: ' + tsName + '. It must match the tileset name in tiled.');

            var tsImageResource = tileSheetLoaderItem.resource;
            var tsSpriteSheet = new $m.df.SpriteSheet({ image:tsImageResource, frameWidth:tsTileWidth, frameHeight:tsTileHeight });


            // create a tileset object which marries (one or more spritesheet's) and contains tileproperty data
            // pulled from tiled
            var tileSet = new $m.df.TileSet(tsSpriteSheet, 0,0, tsIdOffset);
            tileSets.push(tileSet);

            if('tileproperties' in tileSet) {
              var props = tileSet.tileproperties;
              for(var idStr in  props) {
                if(!props.hasOwnProperty(idStr)) continue;
                var tileId = parseInt(idStr);
                tileProperties = props[idStr];
                for(var name in tileProperties) {
                  if(!tileProperties.hasOwnProperty(name)) continue;
                  tileSet.addProperty(tileId + tsIdOffset, name, tileProperties[name]);
                }
              }
            }
          }, this);

          info.layers.forEach(function(lyr) {
            switch(lyr.type) {
              case 'tilelayer':
                switch(info.orientation) {
                  case 'isometric':
                    $m.df.IsoTileLayer.loadFromJson(this, lyr, tileWidth, tileHeight, tileSets);
                    break;

                  default:
                    $m.df.TileLayer.loadFromJson(this, lyr, tileWidth, tileHeight, tileSets);
                    break;
                }
                break;

              case 'imagelayer':
                $m.df.ImageLayer.loadFromJson(this, lyr)
                break;

              case 'objectgroup':
                $m.df.EntityLayer.loadFromJson(this, lyr, entityFactory, lyr.width*tileWidth, lyr.height*tileHeight);
                break;

              default:
                console.log('Warning: fould tiled map layer of unsupported type: '+lyr.type);
                break;

            }
          }, this);

          for(var next = this.layers.first; next; next = next.next())
          {
            var layer = next.obj;
            if(layer.originTrackName)
            {
              layer.originTrack = this.get(layer.originTrackName);
              layer.originTrackName = null;
            }
          }
        }
    });