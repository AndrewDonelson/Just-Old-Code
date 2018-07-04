/**
 * Playcraft Engine - (C)2012 Playcraft Labs, Inc.
 * See licence.txt for details
 */

/**
 * Clips all rendering for an entity to be within the specified rect (in layer relative coordinates)
 * You can also specify an entity, which will clip based on the spatial rectangle of the other entity
 * You can also do both entity clipping as well as stacking a rectangle clip on top
 * @module GLDL
 * @submodule Components
 * @class $m.df.components.Clip
 */
$m.df.components.Clip = $m.df.components.Component.extend('$m.df.components.Clip',
    /** @lends $m.df.components.Clip */
    {
        /**
         * Constructs (or acquires) a clipping component
         * @param options
         */
        create:function (options)
        {
            var n = this._super();
            n.config(options);
            return n;
        }
    },
    /** @lends $m.df.components.Clip.prototype */
    {
        /** Clip this entity to the bounding rectangle of another entity */
        clipEntity:null,
        /** x-position of the top left of the clipping rectangle */
        x:0,
        /** y-position of the top left of the clipping rectangle */
        y:0,
        /** Width the clipping rectangle */
        w:0,
        /** Height the clipping rectangle */
        h:0,

        /**
         * Constructs (or acquires) a clipping component
         */
        init:function ()
        {
            this._super('clip');
        },

        /**
         * Configures the component. See create method for options
         * @param {Object} options Options
         */
        config:function (options)
        {
            this.clipEntity = $m.df.checked(options.clipEntity, null);
            this.x = $m.df.checked(options.x, 0);
            this.y = $m.df.checked(options.y, 0);
            this.w = $m.df.checked(options.w, 0);
            this.h = $m.df.checked(options.h, 0);
        }

    });

