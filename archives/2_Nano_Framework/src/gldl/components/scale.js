/**
 * Playcraft Engine - (C)2012 Playcraft Labs, Inc.
 * See licence.txt for details
 */

/**
 * @class $m.df.components.Scale
 * @description
 * [Extends <a href='$m.df.components.Component'>$m.df.components.Component</a>]<BR>
 * [Used in <a href='$m.df.systems.Effects'>$m.df.systems.Effects</a>]
 * <p>
 * Change the draw scale of an entity
 * <pre><code>
 * entity.addComponent(
 *      $m.df.components.Scale.create( { x: 0.1, y: 0.1, growX: 4, growY: 4, maxX: 8, maxY: 8 } ) );
 * </code></pre>
 */
$m.df.components.Scale = $m.df.components.Component.extend('$m.df.components.Scale',
    /** @lends $m.df.components.Scale */
    {
        /**
         * Constructs (or acquires from the pool) a scale component
         * @param {Number} options.x initial x-axis scale
         * @param {Number} options.y initial y-axis scale
         * @param {Number} options.growX amount to grow x-axis per second (can be negative)
         * @param {Number} options.growY amount to grow y-axis per second (can be negative)
         * @param {Number} options.maxX maximum x-axis scale change
         * @param {Number} options.maxY maximum y-axis scale change
         * @return {$m.df.components.Scale} A configured component
         */
        create:function (options)
        {
            var n = this._super();
            n.config(options);
            return n;
        }
    },
    /** @lends $m.df.components.Scale.prototype */
    {
        /** original scale applied to the spatial (only done once when binding the component) */
        x:1,
        /** original scale applied to the spatial (only done once when binding the component) */
        y:1,
        /** rate to grow the x-axis scale (can be negative) */
        growX:0,
        /** rate to grow the y-axis scale (can be negative) */
        growY:0,
        /** maximum x-axis scale change (positive or negative) */
        maxX:0,
        /** maximum y-axis scale change (positive or negative) */
        maxY:0,
        /** amount we have scaled so far (read-only) */
        scaledXSoFar:0,
        /** amount we have scaled so far (read-only) */
        scaledYSoFar:0,
        /** still scaling or not */
        scaling: true,

        _bound:false,

        /**
         * Constructs a new component. See create method for options
         * @param {Object} options Options
         */
        init:function (options)
        {
            this._super('scale');
            if ($m.df.valid(options))
                this.config(options);
        },

        /**
         * Configures the component. See create method for options
         * @param {Object} options Options
         */
        config:function (options)
        {
            this.x = $m.df.checked(options.x, 1);
            this.y = $m.df.checked(options.y, 1);
            this.growX = $m.df.checked(options.growX, 0);
            this.growY = $m.df.checked(options.growY, 0);
            this.maxX = $m.df.checked(options.maxX, 0);
            this.maxY = $m.df.checked(options.maxY, 0);
            this.scaledXSoFar = 0;
            this.scaledYSoFar = 0;
        }
    });
