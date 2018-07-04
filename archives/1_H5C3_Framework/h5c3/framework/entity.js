
/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * Playcraft Engine - (C)2012 Playcraft Labs, Inc.
 * See licence.txt for details
 */

window.STATES =
{
    SELECTABLE:	0x0001,
    DRAGGABLE:	0x0002,
    HOVERABLE:	0x0003
};
 
/**
 * @class  h5c3.Entity
 * 
 * Entities are the primary 'things' that are in a game. They serve as the primary container for components.
 * 
 * To add an entity to a game you must place it within an <a href='h5c3.EntityLayer'>entity layer</a>.
 * 
 * 
 * var entityLayer = new h5c3.EntityLayer('my entity layer', 10000, 10000);
 * (end)
 * 
 * You can then construct an entity by allocating it from the entity pool, and assigning it to the layer:
 *
 * 
 * var newEntity = h5c3.Entity.create(entityLayer);
 * (end)
 *
 * <h5>Components</h5>
 * To add functionality to the entity, you need to add components. Components are discreet bits of functionality
 * you can use across many entities. A spaceship for example, might have a sprite component for the artwork, a spatial
 * component (where it is in the world), an input handling component and a physics component. All of these components
 * combine together let you create an awesome flying menace.
 * 
 * For example, to create a simple entity that consists of a red box, we add two components, one for the spatial (its
 * position and dimensions), and one to indicate we want to draw a rectangle.
 * 
 * // add a spatial component
 * box.addComponent( h5c3.components.Spatial.create({ x:100, y: 100, w:50, h:50 }) );
 *
 * // add a red rectangle
 * box.addComponent( h5c3.components.Rect.create({ color:'#ff2222' }) );
 * (end)
 * <h5>Tagging</h5>
 * Entities can be tagged and searched for. You can add multiple tags to a single entity to categorize it in different
 * ways. Tags are the primary way you should 'type' an entity - as opposed to using a class hierarchy.
 * 
 * To add a tag an entity use:
 * 
 * entity.addTag('enemy');
 * entity.addTag('monster');
 * (end)
 * You can then grab all entities in a layer that have a tag:
 * 
 * entityLayer.entityManager.getTagged('enemy'); // return a h5c3.LinkedList
 * (end)
 * You can remove a tag:
 * 
 * entity.removeTag('monster');
 * (end)
 * And quickly test if an entity has a tag:
 * 
 * entity.hasTag('enemy') == true;
 * (end)
 * And finally, you can inspect all the tags an entity has by looking at the tags member:
 * 
 * entity.tags[0] === 'enemy';
 * (end)
 */
h5c3.Entity = h5c3.Pooled.extend('h5c3.Entity',
    {
        /**
         * Constructs an entity by acquiring it from the object pool
         * @param  
		 * {h5c3.Layer} layer Layer the entity should be added to
         * @return {h5c3.Entity} A h5c3.Entity
         */
        create: function(layer)
        {
            var n = this._super();
            $AST(layer, 'Entity requires a valid layer to be placed on');
            n.config(layer);
            return n;
        }
    },
    {
        /** layer this entity is on */
        layer: null,
        /** array of strings representing the tags this entity has (read-only) */
        tags: [],
        /** whether this entity is presently active (read-only) */
        active: true,

        _componentCache: null,  // cache of components for entity -- not to be used for anything but speed reading

        /**
         * Constructs a new entity by acquiring it from the object pool
         * @param  
		 * {h5c3.Layer} layer Layer the entity should be added to
         */
        init: function(layer)
        {
            this._super();
            this._componentCache = new h5c3.Hashmap();
            if ($VLD(layer)) {
                this.config(layer);
			}
        },

        /**
         * Configures an entity with the given layer (typically this is called by create or init and does not
         * need to be called directly.
         * @param  
		 * {h5c3.EntityLayer} layer Layer to add the entity too
         */
        config: function(layer)
        {
            this.layer = layer;
            this.active = true;
            layer.entityManager.add(this);
        },

        /**
         * Releases the entity back into the object pool. Should not be used directly unless you know what you're
         * doing. Use entity.remove for most sitations.
         */
        release: function()
        {
            this.tags.length = 0;
            this.active = false;
            this._componentCache.clear();
            this._super();
        },

        /**
         * Add a tag to the entity - actually just a pass through function to entity.layer.entityManager.addTag
         * @param  
		 * String tag Tag to add to the entity.
         */
        addTag: function(tag)
        {
            this.layer.entityManager.addTag(this, tag);
        },

        /**
         * Tests if this entity has a given tag
         * @param  
		 * String tag The tag to look for
         * @return 
		 * Boolean true if the tag exists on this entity
         */
        hasTag: function(tag)
        {
			var i = 0;
            for (i=0; i < this.tags.length; i++) {
                if (this.tags[i].toLowerCase() === tag.toLowerCase()) {
					return true;
				}
			}
            return false;
        },

        /**
         * Removes a tag from an entity
         * @param  
		 * String tag Tag to remove
         */
        removeTag: function(tag)
        {
            this.layer.entityManager.removeTag(this, tag);
        },

        /**
         * Add a component to this entity
         * @param  
		 * {h5c3.components.Component} component Component to add
         * @return 
		 * {h5c3.components.Component} Component that was added
         */
        addComponent: function(component)
        {
            return this.layer.entityManager.addComponent(this, component);
        },

        /**
         * Remove a component from the entity
         * @param  
		 * {h5c3.components.Component} component Component to remove
         */
        removeComponent: function(component)
        {
            this.layer.entityManager.removeComponent(this, component);
        },

        /**
         * Remove the component of a given type
         * @param  
		 * String componentType Component type to remove (e.g. 'physics')
         */
        removeComponentByType: function(componentType)
        {
			this.removeComponent(this._componentCache.get(componentType.toLowerCase()));
        },

        /**
         * Retrieves a reference to a component on the entity using a given type
         * @param  
		 * String componentType Type string of the component to get
         * @return 
		 * {h5c3.components.Component} The component matching the type
         */
        getComponent: function(componentType)
        {
			return this._componentCache.get(componentType.toLowerCase());
        },

        /**
         * Get the components in this entity
         * @return 
		 * {h5c3.Hashtable} A hashtable of component objects keyed by component type
         */
        getAllComponents: function()
        {
            // use internal cache for speed
            return this._componentCache;
        },

        /**
         * Get an array containing strings of all the types of components on this entity
         * @return 
		 * Array Array of strings with all the component types
         */
        getComponentTypes: function()
        {
            // todo: could optimize this if required by caching the types as well (instead of generating
            // an array on every check. Don't think it's used very often though.
            return this._componentCache.keys();
        },

        /**
         * Check whether the entity has a component of a given type
         * @param  
		 * String componentType Component type to check for
         * @return 
		 * Boolean true if a component with the given type is on the entity
         */
        hasComponentOfType: function(componentType)
        {
			return this._componentCache.hasKey(componentType.toLowerCase());
        },

        /**
         * Remove this entity from the layer
         */
        remove: function()
        {
            this.layer.entityManager.remove(this);
			this.onRemoved();
        },

		onRemoved: function() 
		{
			this.debug('Entity '+this.uniqueId+' has been removed.');
		},
		
        // INTERNALS
        _handleComponentRemoved: function(component)
        {
            this._componentCache.remove(component.getType());
        },

        _handleComponentAdded: function(component)
        {
            this._componentCache.put(component.getType(), component);
        }
    });

/**
 * @class  h5c3.EntityFactory
 *
 * For creating entities (mostly just an interface class you extend from to create an entity factory).
 * No need to create an instance yourself...it is created automatically by Game::onReady()
 *
 * 
 *	h5c3.entityFactory = new EntityFactory();
 * (end)
 */
h5c3.EntityFactory = h5c3.Factory.extend('h5c3.EntityFactory',
    {},
    {
        
		/**
		 * Initialization Method
		 */	
		init:function() 
		{
			this._super('Entity');
		},
				
		/**
         * Called by the entity loader
		 *
         * @param  
		 * String name String type of the entity to create
		 * {h5c3.Layer} layer Layer the entity should be placed on
		 * @return
		 * h5c3.Entity
         */
        create:function (name, options)
		{
			$CHK(name,false);
			$CHK(options.layer,false);
			if (!name || !options.layer) {
				throw('entity.js::create() - You must provide a name & layer for first use.');
			}
			var obj = h5c3.Entity.create(options.layer);
			obj.addTag(name);
			return this.add(name,obj);
		}		
    });

//Create the Entity Factory
h5c3.factories.entity = new h5c3.EntityFactory();