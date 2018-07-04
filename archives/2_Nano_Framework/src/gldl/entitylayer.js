/**
 * Playcraft Engine - (C)2012 Playcraft Labs, Inc.
 * See licence.txt for details
 */

/**
 * <p>
 * An entity layer is a container for <a href='$m.df.Entity'>entities</a> and systems.
 * See the <a href='../guides/entitysystems'>entity systems</a> guide for more information on how components,
 * entities and systems work together.
 * <p>
 * An entity layer is constructed similarly to a regular layer, except it also has a distinct 'world' size
 * which can be referenced by systems.
 * <pre><code>
 * var entityLayer = new $m.df.EntityLayer('my entity layer', 10000, 10000);
 * </code></pre>
 * The entity layer will automatically construct both an <a href='$m.df.EntityManager'>$m.df.EntityManager</a> and a
 * <a href='$m.df.SystemManager'>$m.df.SystemManager</a>.
 * <p>
 * Once you have an entity layer created you will need to add it to the scene:
 * <pre><code>
 * myScene.addLayer(entityLayer);
 * </code></pre>
 * You can then add entities to the layer:
 * <pre><code>
 * // create a new entity (it will automatically be added to the
 * // entity layer specified in the constructor
 * var box = $m.df.Entity.create(entityLayer);
 * box.addComponent( $m.df.components.Rect.create({ color:#ffffff }) );
 * </code></pre>
 * Entity layers are driven by systems, which must be added to the layer in order for anything to happen.
 * When you add components to an entity, you must also remember to add the corresponding system to the layer where
 * the entity exists. You can see which systems are required for components in the "used by" list in the component
 * API documentation.
 * <p>
 * To add a system, just construct it and call addSystem:
 * <pre><code>
 * // fire up the systems we need for the game layer
 * entityLayer.addSystem(new $m.df.systems.Physics());
 * entityLayer.addSystem(new $m.df.systems.Particles());
 * entityLayer.addSystem(new $m.df.systems.Effects());
 * entityLayer.addSystem(new $m.df.systems.Render());
 * </code></pre>
 *
 * @class $m.df.EntityLayer
 */
$m.df.EntityLayer = $m.df.Layer.extend('$m.df.EntityLayer',
    /** @lends $m.df.EntityLayer */
    {
        /**
         * Creates an entity layer from a TMX layer XML data resource
         * @param {String} scene
         * @param {String} groupXML
         * @param {$m.df.EntityFactory} entityFactory
         */
        loadFromTMX:function (scene, groupXML, entityFactory, worldSizeX, worldSizeY)
        {
            var layerName = groupXML.getAttribute('name');

            // create the new layer and add it to the scene - when you have the name
            var n = new $m.df.EntityLayer(layerName, worldSizeX, worldSizeY, entityFactory);
            n.configFromTMX(groupXML);
            scene.addLayer(n);

            // Parse object xml instances and turn them into entities
            // XML = <object type="EnemyShip" x="2080" y="256" width="32" height="32"/>
            var objs = groupXML.getElementsByTagName('object');
            for (var i = 0; i < objs.length; i++)
            {
                var objData = objs[i];
                var entityType = objData.getAttribute('type');
                var x = parseInt(objData.getAttribute('x'));
                var y = parseInt(objData.getAttribute('y'));
                var w = parseInt(objData.getAttribute('width'));
                var h = parseInt(objData.getAttribute('height'));
                var shape = null;

                // either it's a polygon shape, or it's a rectangle (has w and h)
                var polygon = objData.getElementsByTagName("polygon");
                if(polygon.length == 0) polygon = objData.getElementsByTagName("polyline");
                if (polygon.length > 0)
                {
                    var pointsString = polygon[0].getAttribute('points');
                    var points = [];
                    var pairs = pointsString.split(' ');
                    for (var j = 0; j < pairs.length; j++)
                    {
                        var nums = pairs[j].split(',');
                        points.push([parseInt(nums[0]), (parseInt(nums[1]))]);
                    }
                    shape = $m.df.Poly.create(x, y, points);
                }
                else
                {
                    // plain rectangle (just need the width and height)
                    shape = $m.df.Dim.create(w, h);
                }

                // parse parameters into options
                var options = {};
                var ps = objData.getElementsByTagName("properties");

                if (ps.length)
                {
                    var props = ps[0].getElementsByTagName("property");
                    for (var p = 0; p < props.length; p++)
                    {
                        var name = props[p].getAttribute("name");
                        var value = props[p].getAttribute("value");
                        options[name] = value;
                        if (name.toLowerCase() === 'entity')
                            entityType = value;
                    }
                }

                // create a new entity
                // ask the entity factory to create entity of this type and on this layer
                //
                if (entityType)
                    entityFactory.createEntity(n, entityType, x, y, 0, shape, options);
                else
                    this.warn('Entity loaded from map with no "entity" type property set. x=' + x + ' y=' + y)
            }

        },

      /**
       * Creates an entity layer from a Javascript object from a Tiled JSON/JSONP file
       * @param {String} scene
       * @param {String} info Json data for the entity layer
       * @param {$m.df.EntityFactory} entityFactory
       */
      loadFromJson:function (scene, info, entityFactory, worldSizeX, worldSizeY)
      {
        var layerName = info.name;

        // create the new layer and add it to the scene - when you have the name
        var n = new $m.df.EntityLayer(layerName, worldSizeX, worldSizeY, entityFactory);
        n.configFromJson(info);
        scene.addLayer(n);

        // Parse object xml instances and turn them into entities
        // XML = <object type="EnemyShip" x="2080" y="256" width="32" height="32"/>
        var objs = info.objects;
        for (var i = 0; i < objs.length; i++)
        {
          var objData = objs[i];
          var entityType = objData.type;
          var x = objData.x;
          var y = objData.y;
          var w = objData.width;
          var h = objData.height;
          var shape = null;

          // either it's a polygon shape, or it's a rectangle (has w and h)
          var polygon = $m.df.checked(objData.polygon, objData.polyline);
          if($m.df.valid(polygon))
          {
            shape = $m.df.Poly.create(x, y, polygon);
          }
          else
          {
            // plain rectangle (just need the width and height)
            shape = $m.df.Dim.create(w, h);
          }

          // parse parameters into options
          var options = objData.properties;

          if('entity' in options)
          {
            entityType = options.entity;
          }

          // create a new entity
          // ask the entity factory to create entity of this type and on this layer
          //
          if (entityType)
            entityFactory.createEntity(n, entityType, x, y, 0, shape, options);
          else
            this.warn('Entity loaded from map with no "entity" type property set. x=' + x + ' y=' + y)
        }

      }


    },
    /** @lends $m.df.EntityLayer.prototype */
    {
        /** Size of the world */
        worldSize:null,

        /** Entity manager for this layer */
        entityManager:null,

        /** System manager for this layer */
        systemManager:null,

        /**
         * @param {String} name Name of the layer
         * @param {Number} worldSizeX X size of the world in pixels
         * @param {Number} worldSizeY Y size of the world in pixels
         * @param {$m.df.EntityFactory} entityFactory Optional factory class to use to construct entities (primarily
         * used by level loaders to create entities specified in map files.
         */
        init:function (name, worldSizeX, worldSizeY, entityFactory)
        {
            this._super(name);
            this.entityFactory = entityFactory;
            this.systemManager = new $m.df.SystemManager(this);
            this.entityManager = new $m.df.EntityManager(this);

            this.worldSize = $m.df.Dim.create($m.df.checked(worldSizeX, 10000), $m.df.checked(worldSizeY, 10000));
        },

        /**
         * Sets the origin for the layer
         * @param {Number} x x origin to set
         * @param {Number} y y origin to set
         * @return {Boolean} Whether the origin actually changed (was it already set to the passed in origin)
         */
        setOrigin:function (x, y)
        {
            var didChange = this._super(x, y);
            if (didChange)
                this.systemManager.onOriginChange(x, y);
            return didChange;
        },

        /**
         * Get the entity manager for this layer
         * @return {$m.df.EntityManager}
         */
        getEntityManager:function ()
        {
            return this.entityManager;
        },

        /**
         * Get the system manager for this layer
         * @return {$m.df.SystemManager}
         */
        getSystemManager:function ()
        {
            return this.systemManager;
        },

        /**
         * Add a system to the layer
         * @param {$m.df.systems.System} system The system to add to the layer
         */
        addSystem:function (system)
        {
            this.systemManager.add(system, this.entityManager);
        },

        /**
         * Gets all the systems that can handle a given component type, such as 'physics'
         * @param {String} componentType Type of component to match
         * @return {$m.df.LinkedList} Linked list of systems that match
         */
        getSystemsByComponentType:function (componentType)
        {
            return this.systemManager.getByComponentType(componentType);
        },
		
        /**
         * Removes a system from this layer's system manager
         * @param {$m.df.systems.System} system The system to remove
         */
        removeSystem:function (system)
        {
            this.systemManager.remove(system);
        },

        /**
         * Master process for the layer
         */
        process:function ()
        {
            this._super();
            this.systemManager.processAll();
            this.entityManager.cleanup();
        },

        /**
         * Called automatically when the viewport is changing size.
         * @param {Number} width Width to resize to
         * @param {Number} height Height to resize to
         */
        onResize:function (width, height)
        {
            this.systemManager.onResize(width, height);
        }


    });
