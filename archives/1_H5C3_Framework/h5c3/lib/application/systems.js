/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * See licence.txt for details
 */

h5c3.systems = {};

/**
 * @class  h5c3.systems.System
 * 
 * 
 * 
 * The base class for all systems. See the entity systems guide for more information on creating your own systems.
 */

h5c3.systems.System = h5c3.Base.extend('h5c3.System', {
/** Interface: h5c3.systems.System */
	_CLASSNAME: 'Systems',
	_CLASSVERSION:'0.1.0'
},{
/** Interface: h5c3.systems.System.prototype */
	/** layer this system is on */
	layer: null,
	/** array of string component types this system handles */
	componentTypes: null,
	/** reference to the systems system manager (read-only) */
	systemManager: null,
	/** optional delay for running this system, default is 0 (which means run every cycle) */
	delay: 0,

	_lastRun: 0,

	/**
	 * Constructs a new system
	 * @param  Array componentTypes Array of strings representing the component types this system will handle
	 * @param  Number delay Amount of time delay in ms between runs. i.e. systems that don't need to run every.
	 */
	init: function(componentTypes, delay)
	{
		this._super();
		this.delay = CHK(delay, 0);
		if (!componentTypes instanceof Array)
			throw "Invalid component types array. Use a blank array ([]) if there are no components handled by the system.";
		this.componentTypes = componentTypes;
	},

	/**
	 * Called by the system manager to allow this system to take care of business. This default does nothing.
	 */
	processAll: function()
	{
	},

	/**
	 * Called by the system when the layer has changed size
	 */
	onResize: function()
	{
	},

	/**
	 * Called by the system when the origin changes
	 */
	onOriginChange: function(x, y)
	{
	},

	/**
	 * Called when this system instance is added to a layer
	 */
	onAddedToLayer: function(layer)
	{
	},

	/**
	 * Called when this system instance is removed from a layer
	 */
	onRemovedFromLayer:function (layer)
	{
	}
});

/**
 * @class  h5c3.systems.EntitySystem
 * 
 * [Extends <a href='h5c3.Base'>h5c3.System</a>]
 * 
 * A system that processes entities.
 */
h5c3.systems.EntitySystem = h5c3.systems.System.extend('h5c3.systems.EntitySystem', {
/** Interface: h5c3.systems.EntitySystem */
	_CLASSNAME: 'EntitySystem',
	_CLASSVERSION:'0.1.0'
},{
/** Interface: h5c3.systems.EntitySystem.prototype */
	/** list of entities that are to be process by this system */
	entities: null,
	/** holding place for entities that are to be removed at the end of each cycle */
	suicides: null,

	/**
	 * Constructor for a system
	 * @param  Array componentTypes An array of component types this system is interested in. Any entity with
	 * a component matching this type will be sent to this system for processing.
	 * @param  Number delay Amount of time between cycles for this system (default = 0)
	 */
	init: function(componentTypes, delay)
	{
		this._super(componentTypes, delay);
		this.entities = new h5c3.LinkedList();
		this.suicides = new h5c3.LinkedList();
	},

	/**
	 * Adds an entity to this system, but only if the entity has a component type matching one of the types
	 * used by this system (this.componentTypes)
	 * @param  {h5c3.Entity} entity Entity to add (if the entity's component type matches the systems
	 */
	addIfMatched: function(entity)
	{
		// checks the entity to see if it should be added to this system
		for (var i=0; i < this.componentTypes.length; i++)
			if (entity.hasComponentOfType(this.componentTypes[i]))
			{
				this.entities.add(entity);
				this.onEntityAdded(entity);
				return; // we only need to add an entity once
			}
	},

	/**
	 * Adds an entity to the system
	 * @param  {h5c3.Entity} entity Entity to add
	 */
	add: function(entity)
	{
		if (this.entities.has(entity)) return; // already in the list
		this.entities.add(entity);
		this.onEntityAdded(entity);
	},

	/**
	 * Removes an entity from this system -- ignored if the entity isn't there
	 * @param  {h5c3.Entity} entity Entity to remove
	 */
	remove: function(entity)
	{
		if (this.entities.remove(entity)) // return true if one was removed
			this.onEntityRemoved(entity);
	},

	/**
	 * Removes an entity from this system, but checks to see if it still matches first (has a component of
	 * the correct type). This is called by the entity manager when a component is removed
	 * @param  {h5c3.Entity} entity Entity to remove
	 */
	removeIfNotMatched: function(entity)
	{
		// checks the entity to see if it should be added to this system
		for (var i=0; i < this.componentTypes.length; i++)
		{
			if (entity.hasComponentOfType(this.componentTypes[i]))
				return; // still matches, abort removing
		}

		// we got to here, so nothing matched, ok to remove the entity
		this.remove(entity);
	},

	/**
	 * Processes all entities. If you override this method, make sure you call this._super() to give the entity
	 * system a chance to process and clean up all entities.
	 */
	processAll: function()
	{
		var next = this.entities.first;
		while (next)
		{
			this.process(next.obj);
			next = next.next();
		}

		next = this.suicides.first;
		while (next)
		{
			this.remove(next.obj);
			next = next.next();
		}
		this.suicides.clear();

	},

	/**
	 * Override this in your system to handle updating of matching entities
	 * @param  {h5c3.Entity} entity Entity to update
	 */
	process: function(entity) {},

	/**
	 * Adds the entity to the suicide list; it will be removed at the end of the cycle.
	 * @param  entity
	 */
	suicide: function(entity)
	{
		this.suicides.add(entity);
	},

	/**
	 * Called when an entity has been added to this system
	 * @param  {h5c3.Entity} entity Entity that was added
	 */
	onEntityAdded: function(entity) {},

	/**
	 * Called when an entity has been removed from this system
	 * @param  {h5c3.Entity} entity Entity that was removed
	 */
	onEntityRemoved: function(entity) {},

	/**
	 * Called when a component is added to an entity
	 * @param  {h5c3.Entity} entity Entity the component was added to
	 * @param  {h5c3.components.Component} component Component that was added
	 */
	onComponentAdded: function(entity, component) {},

	/**
	 * Called when a component is removed from an entity
	 * @param  {h5c3.Entity} entity Entity the component was removed from
	 * @param  {h5c3.components.Component} component Component that was removed
	 */
	onComponentRemoved: function(entity, component) {}

});

h5c3.components = {};

/**
 * @class  h5c3.components.Component
 * 
 * [Extends <a href='h5c3.Pooled'>h5c3.Pooled</a>]
 * 
 * The base class for components you want to create.
 */
h5c3.components.Component = h5c3.Pooled.extend('h5c3.components.Component',
/** Interface: h5c3.components.Component */
{
	_CLASSNAME: 'Component',
	_CLASSVERSION:'0.1.0',
	/**
	 * Constructor that acquires the component from an object pool.
	 * @return {h5c3.components.Component} A component object
	 */
	create:function ()
	{
		var c = this._super();
		c.active = true;
		return  c;		
	}
},
/** Interface: h5c3.components.Component.prototype */
{
	/** entity I am on, or null if I'm not on an entity */
	_entity: null,

	_type:null,

	/**
	 * Constructs a new component using the given type string
	 * @param  String type The type to assign the component
	 */
	init:function (type)
	{
		this._super();
		this._type = type;
	},

	/**
	 * Get the component type
	 * @return String The type
	 */
	getType:function ()
	{
		return this._type.toLowerCase();
	},

	/**
	 * Get the entity this component is currently in; null if not in an entity
	 * @return {h5c3.Entity} Entity
	 */
	getEntity: function()
	{
		return this._entity;
	},

	/**
	 * Called when the system is about to remove this component, which gives you a chance
	 * to override and do something about it
	 */
	onBeforeRemoved:function ()
	{
	}


});

/**
 * @class  h5c3.SystemManager
 * 
 * 
 * 
 * Manages systems that are within a layer.
 *
 * Unless you are building your own systems in a complex way, you should be using the h5c3.EntityLayer to handle
 * general system management.
 */
h5c3.SystemManager = h5c3.Base.extend('h5c3.SystemManager',
/** Interface: h5c3.SystemManager */
{
	_CLASSNAME: 'SystemManager',
	_CLASSVERSION:'0.1.0'
},
/** Interface: h5c3.SystemManager.prototype */
{
	/** h5c3.LinkedList of systems */
	systems:null,
	/** Index of the systems by component type */
	systemsByComponentType:null,
	/** layer the system is on */
	layer:null,

	/**
	 * Constructs a system manager.
	 */
	init:function (layer)
	{
		this.systems = new h5c3.LinkedList();
		this.systemsByComponentType = new h5c3.Hashtable();
		this.layer = layer;
	},

	/**
	 * Adds a system to the system manager
	 * @param  {h5c3.systems.System} system System to add
	 */
	add:function (system)
	{
		system.layer = this.layer;
		system.systemManager = this;

		this.systems.add(system);

		if (!VLD(system.componentTypes))
			throw 'systemmanager.js::add() - Invalid component types: it can be empty, but not undefined. Did you forget to ' +
				'add an init method to your system and/or not call this._super(componentTypes)';

		for (var i = 0; i < system.componentTypes.length; i++)
		{
			var ctype = system.componentTypes[i].toLowerCase();

			var list = this.systemsByComponentType.get(ctype);
			if (list == null)
			{
				// create a new linked list for systems matching this component type
				list = new h5c3.LinkedList();
				this.systemsByComponentType.put(ctype, list);
			}

			// add this system to the component type map, but only if it hasn't been added already
			if (!list.has(system))
				list.add(system);
		}

		// add all the entities to this system
		var entity = this.layer.entityManager.entities.first;
		while (entity)
		{
			this._handleEntityAdded(entity.object());
			entity = entity.next();
		}

		system.onAddedToLayer(this.layer);
	},

	/**
	 * Removes a system from the system manager
	 * @param  {h5c3.systems.System} system System to remove
	 */
	remove:function (system)
	{
		system.onRemovedFromLayer(system.layer);
		this.systems.remove(system);

		for (var i = 0; i < system.componentTypes; i++)
		{
			var list = this.systemsByComponentType.get(system.componentTypes[i].toLowerCase());
			assert(list != null, "Oops, trying to remove a system and it's not in the by type list");

			system.systemManager = null;
			list.remove(system);
		}
	},

	/**
	 * Gets systems based on a component type
	 * @param  String componentType Component type
	 * @return {h5c3.LinkedList} A linked list of the systems that have the given component type
	 */
	getByComponentType:function (componentType)
	{
		return this.systemsByComponentType.get(componentType);
	},

	/**
	 * Called when the origin of the layer changes
	 * @param  Number x x-position of the origin
	 * @param  Number y y-position of the origin
	 */
	onOriginChange:function (x, y)
	{
		var system = this.systems.first;
		while (system)
		{
			system.object().onOriginChange(x, y);
			system = system.next();
		}
	},

	_handleEntityAdded:function (entity)
	{
		// grab a list of all the component types from the entity
		var componentTypes = entity.getComponentTypes();
		for (var i = 0; i < componentTypes.length; i++)
		{
			// for every type, grab all the systems that use this type and add this entity
			var systems = this.systemsByComponentType.get(componentTypes[i].toLowerCase());
			if (systems)
			{
				var next = systems.first;
				while (next)
				{
					// add will check to make sure this entity isn't in there already
					next.obj.add(entity);
					next = next.next();
				}
			}
		}
	},

	_handleEntityRemoved:function (entity)
	{
		// grab a list of all the component types from the entity
		var componentMap = entity.getAllComponents();
		if (componentMap == null) return;
		var componentTypes = componentMap.keys();

		for (var i = 0; i < componentTypes.length; i++)
		{
			// for every type, grab all the systems that use this type and add this entity
			var systems = this.systemsByComponentType.get(componentTypes[i].toLowerCase());
			if (systems)
			{
				var next = systems.first;
				while (next)
				{
					// just a plain removal, since this entity is going entirely
					next.obj.remove(entity);
					next = next.next();
				}
			}
		}
	},

	_handleComponentAdded:function (entity, component)
	{
		// get a list of all the systems that are processing components of this type
		// then ask that system to add this entity, if it's not already there
		var list = this.systemsByComponentType.get(component.getType());
		if (list == null)
		{
			// this.warn('Entity (' + entity.toString() + ' added component ' + component + ' but no system is ' +
			//    ' handling components of type: ' + component.getType() +'. Did you forget to add a system' +
			//    ' to the system manager (and was it added to the same layer as this entity)?');
			return;
		}

		// todo: the systemsByComponentType map doesn't work well if systems support
		// multiple components; need to take a fresh look at that if multiple component types
		// support is added to systems (probably change the systemsByComponentType map support combinations
		// of components as a compound key (which map to a set of matching systems with no duplicates
		var next = list.first;
		while (next)
		{
			next.obj.add(entity);
			next.obj.onComponentAdded(entity, component);
			next = next.next();
		}
	},

	_handleComponentRemoved:function (entity, component)
	{
		// get a list of all the systems that are processing components of a given type
		var list = this.systemsByComponentType.get(component.getType());
		if (list == null) return;

		var next = list.first;
		while (next)
		{
			// then ask that system to remove this entity, but be careful that it no longer matches
			// another type might still apply to a given system
			next.obj.removeIfNotMatched(entity);
			next.obj.onComponentRemoved(entity, component);
			next = next.next();
		}

	},

	/**
	 * Process all the systems
	 */
	processAll:function ()
	{
		var next = this.systems.first;
		while (next)
		{
			if (next.obj.delay == 0 || (h5c3.device.now - next.obj._lastRun > next.obj.delay))
			{
				next.obj.processAll();
				if (next.obj.delay != 0)
					next.obj._lastRun = h5c3.device.now;
			}
			next = next.next();
		}
	},

	/**
	 * Called when the layer resizes
	 * @param  Number width Width of the layer
	 * @param  Number height Height of the layer
	 */
	onResize:function (width, height)
	{
		var next = this.systems.first;
		while (next)
		{
			next.obj.onResize(width, height);
			next = next.next();
		}
	}



});

/**
 * @class  h5c3.EntityManager
 * 
 * 
 * 
 * Manages entities in a layer. This is the primary entity manager for the entity system. It contains, indexes and
 * handles the lifecycle of all entities.
 *
 * Unless you are building your own systems in a complex way, you should be using the h5c3.EntityLayer to handle
 * general entity management.
 */
h5c3.EntityManager = h5c3.Base.extend('h5c3.EntityManager',
/** Interface: h5c3.EntityManager */
{
	_CLASSNAME: 'EntityManager',
	_CLASSVERSION:'0.1.0'
},
/** Interface: h5c3.EntityManager.prototype */
{
	/** Index of all entities by tag */
	entitiesByTag: null,
	/** All the components indexed by entityID (as a linked list) */
	componentsByEntity: null,
	/** All the components, indexed by entityId and componentType (catted) */
	componentsByEntityPlusType: null,

	/** Linked list of all entities */
	entities: null,
	/** entities to be removed at the end of processing */
	entitySuicides: null,
	/** the layer this entitymanager is within (set by the layer class) */
	layer: null,

	/**
	 * Constructs a new entity manager
	 * @param  {h5c3.EntityLayer} layer The entity layer this entity manager is doing work for
	 */
	init: function(layer)
	{
		this.layer = layer;
		this.entitiesByTag = new h5c3.HashList();
		this.entities = new h5c3.LinkedList();
		this.componentsByEntity = new h5c3.Hashmap();
		this.componentsByEntityPlusType = new h5c3.Hashmap();
		this.entitySuicides = new h5c3.LinkedList();
	},

	/**
	 * Called by the core game loop to give the manager a chance to cleanup
	 */
	cleanup: function()
	{
		var entity = this.entitySuicides.first;
		while (entity)
		{
			this._doRemoveEntity(entity.object());
			entity = entity.next();
		}

		this.entitySuicides.clear();
	},

	/**
	 * Adds an entity to the manager
	 * @param  {h5c3.Entity} entity Entity to add
	 * @param  String [tag] A convenient way to add an entity and tag at the same time
	 */
	add: function(entity, tag)
	{
		// add the entity to our big global map
		this.entities.add(entity);
		if (tag != undefined)
			this.entitiesByTag.add(tag, entity);

		// add this entity to the component type indexes
		var componentMap = entity.getAllComponents();
		if (componentMap != null)
		{
			var components = componentMap.values();
			for (var i=0; i < components.length; i++)
				this._addToComponentMap(entity, components[i]);
		}

		// let the system manager take care of business
		this.layer.systemManager._handleEntityAdded(entity);
	},

	/**
	 * Removes an entity from the manager
	 * @param  {h5c3.Entity} entity Entity to remove
	 */
	remove: function(entity)
	{
		if (!this.entitySuicides.has(entity))
		{
			this.entitySuicides.add(entity);
			entity.active = false;
		}
	},

	/**
	 * Removes a component from an entity, and releases it back to the pool
	 * @param  {h5c3.Entity} entity Entity to remove the component from
	 * @param  {h5c3.components.Component} component Component to remove
	 */
	removeComponent: function(entity, component)
	{
		this._removeFromComponentMap(entity, component);
		this.layer.systemManager._handleComponentRemoved(entity, component);
		entity._handleComponentRemoved(component);
		component._entity = null;
	},

	/**
	 * Adds a tag to an entity
	 * @param  {h5c3.Entity} entity Entity to add the tag to
	 * @param  String tag Tag to assign to the entity
	 */
	addTag: function(entity, tag)
	{
		if (entity.tags.indexOf(tag.toLowerCase()) != -1) return;

		this.entitiesByTag.add(tag.toLowerCase(), entity);
		entity.tags.push(tag.toLowerCase());
	},

	/**
	 * Removes a tag from an entity
	 * @param  {h5c3.Entity} entity Entity to remove the tag from
	 * @param  String tag Tag to remove
	 */
	removeTag: function(entity, tag)
	{
		this.entitiesByTag.remove(tag.toLowerCase(), entity);
		entity.tags.remove(tag.toLowerCase());
	},

	/**
	 * Gets all the entities that have a given tag
	 * @param  String tag Tag to match
	 * @return {h5c3.LinkedList} List of entities
	 */
	getTagged: function(tag)
	{
		return this.entitiesByTag.get(tag.toLowerCase());
	},

	/**
	 * Makes an entity active (processed by systems).
	 * @param  entity {h5c3.Entity} Entity to make active
	 */
	activate: function(entity)
	{
		if (entity.active) return;

		this.layer.systemManager._handleEntityAdded(entity);
		entity.active = true;
	},

	/**
	 * Makes an entity inactive (no longer processed)
	 * @param  {h5c3.Entity} entity Entity to deactivate
	 */
	deactivate: function(entity)
	{
		if (!entity.active) return;

		// remove from the systems - we still keep it in the entitymanager lists, but remove it
		// from the systems so it wont be processed anymore
		this.layer.systemManager._handleEntityRemoved(entity);

		// mark as inactive
		entity.active = false;
	},

	_doRemoveEntity: function(entity)
	{
		this.entities.remove(entity);
		var componentMap = entity.getAllComponents();
		if (componentMap != null)
		{
			var components = componentMap.values();
			for (var i=0; i < components.length; i++)
				this._removeFromComponentMap(entity, components[i]);
		}

		// remove entities from any tag map it exists in
		for (var t=0; t < entity.tags.length; t++)
			this.entitiesByTag.remove(entity.tags[t], entity);

		this.layer.systemManager._handleEntityRemoved(entity);

		entity.release();
	},

	/**
	 * Add a component to an entity
	 * @param  {h5c3.Entity} entity Entity to add the component to
	 * @param  {h5c3.components.Component} component Component to add
	 * @return {h5c3.components.Component} Component that was added (for convience)
	 */
	addComponent: function(entity, component)
	{
		// make sure this entity is in the correct component maps
		this._addToComponentMap(entity, component);
		entity._handleComponentAdded(component);
		this.layer.systemManager._handleComponentAdded(entity, component);
		component._entity = entity;
		return component;
	},

	/**
	 * Get a component of a given class from an entity
	 * @param  {h5c3.Entity} entity Entity that has the component you're looking for
	 * @param  String componentType Class of component to get (e.g. h5c3.component.Position)
	 */
	getComponent: function(entity, componentType)
	{
		return this.componentsByEntityPlusType.get(entity.objectId + ':' + componentType);
	},

	/**
	 * Gets the components in an entity
	 * @param  {h5c3.Entity} entity Entity you want the components of
	 * @return {h5c3.Hashtable} Hashtable of components keyed by component type
	 */
	getComponents: function(entity)
	{
		return this.componentsByEntity.get(entity.objectId);
	},

	/**
	 * Checks if a given entity contains a component of a given type
	 * @param  {h5c3.Entity} entity Entity to check
	 * @param  String componentType Type to check for
	 */
	hasComponentOfType: function(entity, componentType)
	{
		return this.componentsByEntityPlusType.containsKey(entity.objectId + ':' + componentType);
	},

	//
	// INTERNALS
	//
	_addToComponentMap: function(entity, component)
	{
		// Seeing a getType error here? Likely, you didn't call .create on your component? just maybe? hint hint
		if (this.componentsByEntityPlusType.get(entity.objectId + ':' + component.getType()))
		{
			// multiple components of the same type are not supported due to performance reasons
			throw ('entitymanager.js::_addToComponentMap() - adding component ' + component.getType() +
				' to entity ' + entity + ' when it already has one of that type');
		}
		this.componentsByEntityPlusType.put(entity.objectId + ':' + component.getType(), component);
		// seeing a getType error above? -- you forgot to use .create when constructing the component
		this.componentsByEntity.put(entity.objectId, component);
	},

	_removeFromComponentMap: function(entity, component)
	{
		// need to handle removing an entity that has attachments, remove the attached entities as well
		component.onBeforeRemoved();

		this.componentsByEntityPlusType.remove(entity.objectId + ':' + component.getType());
		this.componentsByEntity.remove(entity.objectId);
		component.release();
	}
});