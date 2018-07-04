
/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * Playcraft Engine - (C)2012 Playcraft Labs, Inc.
 * See licence.txt for details
 */

/**
 * @class  h5c3.EntityLayer
 * 
 * [Extends <a href='h5c3.Layer'>h5c3.Layer</a>]
 * 
 * An entity layer is a container for <a href='h5c3.Entity'>entities</a> and systems.
 * See the <a href='../guides/entitysystems'>entity systems</a> guide for more information on how components,
 * entities and systems work together.
 * 
 * An entity layer is constructed similarly to a regular layer, except it also has a distinct 'world' size
 * which can be referenced by systems.
 * 
 * var entityLayer = new h5c3.EntityLayer('my entity layer', 10000, 10000);
 * (end)
 * The entity layer will automatically construct both an <a href='h5c3.EntityManager'>h5c3.EntityManager</a> and a
 * <a href='h5c3.SystemManager'>h5c3.SystemManager</a>.
 * 
 * Once you have an entity layer created you will need to add it to the scene:
 * 
 * myScene.addLayer(entityLayer);
 * (end)
 * You can then add entities to the layer:
 * 
 * // create a new entity (it will automatically be added to the
 * // entity layer specified in the constructor
 * var box = h5c3.Entity.create(entityLayer);
 * box.addComponent( h5c3.components.Rect.create({ color:#ffffff }) );
 * (end)
 * Entity layers are driven by systems, which must be added to the layer in order for anything to happen.
 * When you add components to an entity, you must also remember to add the corresponding system to the layer where
 * the entity exists. You can see which systems are required for components in the "used by" list in the component
 * API documentation.
 * 
 * To add a system, just construct it and call addSystem:
 * 
 * // fire up the systems we need for the game layer
 * entityLayer.addSystem(new h5c3.systems.Physics());
 * entityLayer.addSystem(new h5c3.systems.Particles());
 * entityLayer.addSystem(new h5c3.systems.Effects());
 * entityLayer.addSystem(new h5c3.systems.Render());
 * (end)
 *
 */
h5c3.EntityLayer = h5c3.Layer.extend('h5c3.EntityLayer',
    /** Interface: h5c3.EntityLayer */
    {
        /**
         * Creates an entity layer from a TMX layer XML data resource
         * @param  String scene
         * @param  String groupXML
         * @param  {h5c3.EntityFactory} entityFactory
         */
        loadFromTMX:function (scene, groupXML, entityFactory)
        {
            var layerName = groupXML.getAttribute('name');
				n = new h5c3.EntityLayer(layerName);			// create the new layer and add it to the scene - when you have the name
				objs = groupXML.getElementsByTagName('object');
            
            scene.addLayer(n);

            // Parse object xml instances and turn them into entities
            // XML = <object type="EnemyShip" x="2080" y="256" width="32" height="32"/>
            for (var i = 0; i < objs.length; i++)
            {
                var objData = objs[i];
                var entityType = null;
                var x = parseInt(objData.getAttribute('x'));
                var y = parseInt(objData.getAttribute('y'));
                var w = parseInt(objData.getAttribute('width'));
                var h = parseInt(objData.getAttribute('height'));
                var shape = null;

                // either it's a polygon shape, or it's a rectangle (has w and h)
                var polygon = objData.getElementsByTagName("polygon");
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
                    shape = h5c3.Poly.create(x, y, points);
                }
                else
                {
                    // plain rectangle (just need the width and height)
                    shape = h5c3.Dim.create(w, h);
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
                        if (name === 'entity')
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
        }
    },
    /** Interface: h5c3.EntityLayer.prototype */
    {
        /** Size of the world */
        worldSize:null,

        /** Entity manager for this layer */
        entityManager:null,

        /** System manager for this layer */
        systemManager:null,

        /**
         * @param  String scene Name of the scene that this layer belongs to
         * @param  String name Name of the layer
         * @param  Number worldSizeX X size of the world in pixels
         * @param  Number worldSizeY Y size of the world in pixels
         * @param  {h5c3.EntityFactory} entityFactory Optional factory class to use to construct entities (primarily
         * used by level loaders to create entities specified in map files.
         */
        init:function (config)
        {
            this._super(config);
			this.entityFactory = h5c3.entityFactory;
            this.systemManager = new h5c3.SystemManager(this);
            this.entityManager = new h5c3.EntityManager(this);

            this.worldSize = h5c3.Dim.create($CHK(config.worldSizeX, 10000), $CHK(config.worldSizeY, 10000));
        },

        /**
         * Sets the origin for the layer
         * @param  Number x x origin to set
         * @param  Number y y origin to set
         * @return Boolean Whether the origin actually changed (was it already set to the passed in origin)
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
         * @return {h5c3.EntityManager}
         */
        getEntityManager:function ()
        {
            return this.entityManager;
        },

        /**
         * Get the system manager for this layer
         * @return {h5c3.SystemManager}
         */
        getSystemManager:function ()
        {
            return this.systemManager;
        },

        /**
         * Add a system to the layer
         * @param  {h5c3.systems.System} system The system to add to the layer
         */
        addSystem:function (system)
        {
            this.systemManager.add(system, this.entityManager);
        },

        /**
         * Gets all the systems that can handle a given component type, such as 'physics'
         * @param  String componentType Type of component to match
         * @return {h5c3.LinkedList} Linked list of systems that match
         */
        getSystemsByComponentType:function (componentType)
        {
            return this.systemManager.getByComponentType(componentType);
        },

        /**
         * Removes a system from this layer's system manager
         * @param  {h5c3.systems.System} system The system to remove
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
         * @param  Number width Width to resize to
         * @param  Number height Height to resize to
         */
        onResize:function (width, height)
        {
            this.systemManager.onResize(width, height);
        }
    });
