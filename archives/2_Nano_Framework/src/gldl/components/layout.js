/**
 * Playcraft Engine - (C)2012 Playcraft Labs, Inc.
 * See licence.txt for details
 */

/**
 * <p>
 * Automatically positions an entity on screen using a variety of layout options.
 * <p>
 * To use automated layout, add the layout system to the layer containing the entity:
 * <pre><code>
 * gameLayer.addSystem(new $m.df.systems.Layout());
 * </code></pre>
 * You can then add a layout component to an entity. The layout system will then automatically position the entity
 * bassed on the chosen alignment, and accomodating a given margin.
 * <pre><code>
 * entity.addComponent($m.df.components.Layout.create(
 *     { vertical:'middle', horizontal:'right', margin:{ right:80 } }));
 * </code></pre>
 * Multiple items will be stacked vertically.
 * @module GLDL
 * @submodule Components
 * @class $m.df.components.Layout
 */
$m.df.components.Layout = $m.df.components.Component.extend('$m.df.components.Layout',
    /** @lends $m.df.components.Layout */
    {
        /**
         * Constructs (or acquires from the pool) a layout component
         * @param {String} options.vertical Vertical positioning: 'top', 'middle', 'bottom'
         * @param {String} options.horizontal Horizontal positioning: 'left', 'center', 'right'
         * @param {Object} options.margin Margin for the entity (ie. margin.left, right, top, bottom)
         * @return {$m.df.components.Layout} A newly configured layout component
         */
        create:function (options)
        {
            var n = this._super();
            n.config(options);
            return n;
        }
    },
    /** @lends $m.df.components.Layout.prototype */
    {
        /** Vertical positioning: 'top', 'middle', 'bottom' */
        vertical:null,
        /** Horizontal positioning: 'left', 'center', 'right' */
        horizontal:null,
        /** margin offset to the position */
        margin:null,

        /**
         * Constructs a new component. See create method for options
         */
        init:function ()
        {
            this._super('layout');
            this.margin = {};
        },

        /**
         * Configures the component. See create method for options
         * @param {Object} options Options
         */
        config:function (options)
        {
            if ($m.df.checked(options.margin))
            {
                this.margin.left = $m.df.checked(options.margin.left, 0);
                this.margin.right = $m.df.checked(options.margin.right, 0);
                this.margin.top = $m.df.checked(options.margin.top, 0);
                this.margin.bottom = $m.df.checked(options.margin.bottom, 0);
            } else
            {
                this.margin.left = 0;
                this.margin.right = 0;
                this.margin.top = 0;
                this.margin.bottom = 0;
            }

            this.horizontal = $m.df.checked(options.horizontal, 'left');
            this.vertical = $m.df.checked(options.vertical, 'top');
        }


    });