/**
 * Playcraft Engine - (C)2012 Playcraft Labs, Inc.
 * See licence.txt for details
 */

/**
 * A system that processes entities.
 * @module GLDL
 * @submodule Systems
 * @class $m.df.systems.EntitySystem
 */
$m.df.systems.EntitySystem = $m.df.systems.System.extend('$m.df.systems.EntitySystem',
    /** @lends $m.df.systems.EntitySystem */
    {},
    /** @lends $m.df.systems.EntitySystem.prototype */
    {
        /** list of entities that are to be process by this system */
        entities: null,
        /** holding place for entities that are to be removed at the end of each cycle */
        suicides: null,

        /**
         * Constructor for a system
         * @param {Array} componentTypes An array of component types this system is interested in. Any entity with
         * a component matching this type will be sent to this system for processing.
         * @param {Number} delay Amount of time between cycles for this system (default = 0)
         */
        init: function(componentTypes, delay)
        {
            this._super(componentTypes, delay);
            this.entities = new $m.df.LinkedList();
            this.suicides = new $m.df.LinkedList();
        },

        /**
         * Adds an entity to this system, but only if the entity has a component type matching one of the types
         * used by this system (this.componentTypes)
         * @param {$m.df.Entity} entity Entity to add (if the entity's component type matches the systems
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
         * @param {$m.df.Entity} entity Entity to add
         */
        add: function(entity)
        {
            if (this.entities.has(entity)) return; // already in the list
            this.entities.add(entity);
            this.onEntityAdded(entity);
        },

        /**
         * Removes an entity from this system -- ignored if the entity isn't there
         * @param {$m.df.Entity} entity Entity to remove
         */
        remove: function(entity)
        {
            if (this.entities.remove(entity)) // return true if one was removed
                this.onEntityRemoved(entity);
        },

        /**
         * Removes an entity from this system, but checks to see if it still matches first (has a component of
         * the correct type). This is called by the entity manager when a component is removed. Typically
         * this is called after a component has been removed. We then check if it's ok to pull the entity which
         * contained the component from the system, but we have to make sure there isn't another component on the
         * entity that still matches for this system (in which case we don't remove it).
         * @param {object} entity Entity to remove
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
         * @param {object}	entity Entity to update
         */
        process: function(entity) {},

        /**
         * Adds the entity to the suicide list; it will be removed at the end of the cycle.
         * @param {object}	entity
         */
        suicide: function(entity)
        {
            this.suicides.add(entity);
        },

        /**
         * Called when an entity has been added to this system
         * @param {object} entity Entity that was added
         */
        onEntityAdded: function(entity) {},

        /**
         * Called when an entity has been removed from this system
         * @param {object} entity Entity that was removed
         */
        onEntityRemoved: function(entity) {},

        /**
         * Called when a component is added to an entity
         * @param {object} entity Entity the component was added to
         * @param {$m.df.components.Component} component Component that was added
         */
        onComponentAdded: function(entity, component) {},

        /**
         * Called when a component is removed from an entity
         * @param {object} entity Entity the component was removed from
         * @param {$m.df.components.Component} component Component that was removed
         */
        onComponentRemoved: function(entity, component) {}

    });

