/**
 * Forked from Playcraft Engine v0.5.6 on Nov 2012 - (C)2012 Playcraft Labs, Inc.
 * See licence.txt for details
 * @module GLDL
 * @submodule Components
 */

/**
 * <p>
 * Causes an entity to be inactive (no rendering or physics etc) until another entity moves within range of it.
 * Great for autosleeping all your monsters until the player gets close.
 * </p>
 * @module GLDL
 * @submodule Components
 * @class $m.df.components.Activator
 */
$m.df.components.Activator = $m.df.components.Component.extend('$m.df.components.Activator',
    /** @lends $m.df.components.Activator */
    {
        /**
         * Constructs a new activator component (by acquiring it from the pool).
         * @param {String} options.tag Tag to look for. When an entity with this tag gets close... bing!
         * @param {$m.df.Layer} options.layer The layer the target enitty is on
         * @param {Number} options.range How close the tagged entity has to be to cause activation
         * @param {Boolean} options.stayActive Stay active once active, otherwise go inactive if range exceeds (default false)
         * @return {$m.df.components.Activator} The component
         */
        create:function (options)
        {
            var n = this._super();
            n.config(options);
            return n;
        }
    },
    /** @lends $m.df.components.Activator.prototype */
    {
        /**
         * entities with this tag to track -- if entity moves within range, the entity with this component will become active
         */
        tag:null,

        /**
         * Layer name to look for the activation entity, default is the same layer as the entity (null)
         */
        layer: null,

        /**
         * Range (in pixels) to cause activation.
         */
        range:0,

        /**
         * Whether the entity should stay active once activated, otherwise if the range exceeds the distance the
         * entity will go back to sleep
         */
        stayActive: false,

        _cacheLayer:null,

        /**
         * Constructs a clipping component
         */
        init:function ()
        {
            this._super('activator');
        },

        /**
         * Configures the component. See create method for options.
         * @param {Object} options Options
         */
        config:function (options)
        {
            if (!options.tag)
                throw 'Activator requires an entity to track against';

            this.tag = options.tag;
            this.layer = $m.df.checked(options.layer, null);
            this.range = $m.df.checked(options.range, 300);
            this.stayActive = $m.df.checked(options.stayActive, false);
        }



    });

