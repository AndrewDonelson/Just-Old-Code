/**
 * Playcraft Engine - (C)2012 Playcraft Labs, Inc.
 * See licence.txt for details
 */

/**
 * @class $m.df.EntityManager
 * @description
 * [Extends <a href='$m.df.Base'>$m.df.Base</a>]
 * <p>
 * Manages entities in a layer. This is the primary entity manager for the entity system. It contains, indexes and
 * handles the lifecycle of all entities.
 *
 * Unless you are building your own systems in a complex way, you should be using the $m.df.EntityLayer to handle
 * general entity management.
 */
$m.df.EntityManager = $m.df.Base.extend('$m.df.EntityManager',
  /** @lends $m.df.EntityManager */
  {},
  /** @lends $m.df.EntityManager.prototype */
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
     * @param {$m.df.EntityLayer} layer The entity layer this entity manager is doing work for
     */
    init: function (layer)
    {
      this.layer = layer;
      this.entitiesByTag = new $m.df.HashList();
      this.entities = new $m.df.LinkedList();
      this.componentsByEntity = new $m.df.Hashmap();
      this.componentsByEntityPlusType = new $m.df.Hashmap();
      this.entitySuicides = new $m.df.LinkedList();
    },

    /**
     * Called by the core game loop to give the manager a chance to cleanup
     */
    cleanup: function ()
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
     * @param {$m.df.Entity} entity Entity to add
     * @param {String} [tag] A convenient way to add an entity and tag at the same time
     */
    add: function (entity, tag)
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
        for (var i = 0; i < components.length; i++)
          this._addToComponentMap(entity, components[i]);
      }

      // let the system manager take care of business
      this.layer.systemManager._handleEntityAdded(entity);
    },

    /**
     * Removes an entity from the manager
     * @param {$m.df.Entity} entity Entity to remove
     */
    remove: function (entity)
    {
      if (!this.entitySuicides.has(entity))
      {
        this.entitySuicides.add(entity);
        entity.active = false;
      }
    },

    /**
     * Removes a component from an entity, and releases it back to the pool
     * @param {$m.df.Entity} entity Entity to remove the component from
     * @param {$m.df.components.Component} component Component to remove
     */
    removeComponent: function (entity, component)
    {
      this._removeFromComponentMap(entity, component);
      entity._handleComponentRemoved(component);
      this.layer.systemManager._handleComponentRemoved(entity, component);
      component._entity = null;
    },

    /**
     * Adds a tag to an entity
     * @param {$m.df.Entity} entity Entity to add the tag to
     * @param {String} tag Tag to assign to the entity
     */
    addTag: function (entity, tag)
    {
      if (entity.tags.indexOf(tag.toLowerCase()) != -1) return;

      this.entitiesByTag.add(tag.toLowerCase(), entity);
      entity.tags.push(tag.toLowerCase());
    },

    /**
     * Removes a tag from an entity
     * @param {$m.df.Entity} entity Entity to remove the tag from
     * @param {String} tag Tag to remove
     */
    removeTag: function (entity, tag)
    {
      this.entitiesByTag.remove(tag.toLowerCase(), entity);
      $m.df.Tools.arrayRemove(entity.tags, tag.toLowerCase());
    },

    /**
     * Gets all the entities that have a given tag
     * @param {String} tag Tag to match
     * @return {$m.df.LinkedList} List of entities
     */
    getTagged: function (tag)
    {
      return this.entitiesByTag.get(tag.toLowerCase());
    },

    /**
     * Makes an entity active (processed by systems).
     * @param entity {$m.df.Entity} Entity to make active
     */
    activate: function (entity)
    {
      if (entity.active) return;

      this.layer.systemManager._handleEntityAdded(entity);
      entity.active = true;
    },

    /**
     * Makes an entity inactive (no longer processed)
     * @param {$m.df.Entity} entity Entity to deactivate
     */
    deactivate: function (entity)
    {
      if (!entity.active) return;

      // remove from the systems - we still keep it in the entitymanager lists, but remove it
      // from the systems so it wont be processed anymore
      this.layer.systemManager._handleEntityRemoved(entity);

      // mark as inactive
      entity.active = false;
    },

    _doRemoveEntity: function (entity)
    {
      this.entities.remove(entity);
      var componentMap = entity.getAllComponents();
      if (componentMap != null)
      {
        var components = componentMap.values();
        for (var i = 0; i < components.length; i++)
          this._removeFromComponentMap(entity, components[i]);
      }

      // remove entities from any tag map it exists in
      for (var t = 0; t < entity.tags.length; t++)
        this.entitiesByTag.remove(entity.tags[t], entity);

      this.layer.systemManager._handleEntityRemoved(entity);

      entity.release();
    },

    /**
     * Add a component to an entity
     * @param {$m.df.Entity} entity Entity to add the component to
     * @param {$m.df.components.Component} component Component to add
     * @return {$m.df.components.Component} Component that was added (for convience)
     */
    addComponent: function (entity, component)
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
     * @param {$m.df.Entity} entity Entity that has the component you're looking for
     * @param {String} componentType Class of component to get (e.g. $m.df.component.Position)
     */
    getComponent: function (entity, componentType)
    {
      return this.componentsByEntityPlusType.get(entity.uniqueId + ':' + componentType);
    },

    /**
     * Gets the components in an entity
     * @param {$m.df.Entity} entity Entity you want the components of
     * @return {$m.df.Hashtable} Hashtable of components keyed by component type
     */
    getComponents: function (entity)
    {
      return this.componentsByEntity.get(entity.uniqueId);
    },

    /**
     * Checks if a given entity contains a component of a given type
     * @param {$m.df.Entity} entity Entity to check
     * @param {String} componentType Type to check for
     */
    hasComponentOfType: function (entity, componentType)
    {
      return this.componentsByEntityPlusType.containsKey(entity.uniqueId + ':' + componentType);
    },

    //
    // INTERNALS
    //
    _addToComponentMap: function (entity, component)
    {
      // Seeing a getType error here? Likely, you didn't call .create on your component? just maybe? hint hint
      if (this.componentsByEntityPlusType.get(entity.uniqueId + ':' + component.getType()))
      {
        // multiple components of the same type are not supported due to performance reasons
        throw ('adding component ' + component.getType() +
          ' to entity ' + entity + ' when it already has one of that type');
      }
      this.componentsByEntityPlusType.put(entity.uniqueId + ':' + component.getType(), component);
      // seeing a getType error above? -- you forgot to use .create when constructing the component
      this.componentsByEntity.put(entity.uniqueId, component);
    },

    _removeFromComponentMap: function (entity, component)
    {
      // need to handle removing an entity that has attachments, remove the attached entities as well
      component.onBeforeRemoved();

      this.componentsByEntityPlusType.remove(entity.uniqueId + ':' + component.getType());
      this.componentsByEntity.remove(entity.uniqueId);
      component.release();
    }



  });

