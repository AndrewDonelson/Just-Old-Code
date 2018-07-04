/**
 * Playcraft Engine - (C)2012 Playcraft Labs, Inc.
 * See licence.txt for details
 */

/**
 * Draw a circle. The size is based on the width and height of the associated spatial.
 * @module GLDL
 * @submodule Components
 * @class $m.df.components.Circle
 */
$m.df.components.Circle = $m.df.components.Component.extend('$m.df.components.Circle',
    /** @lends $m.df.components.Circle */
    {
        /**
         * Constructs (or acquires from the pool) a rectangle component.
         * @param {String} options.color Fill color in the form of #RRGGBB.
         * @param {String} options.lineColor Line color in the form of #RRGGBB
         * @param {Number} options.lineWidth Stroke width
         * @return {$m.df.components.Circle} The new component
         */
        create:function (options)
        {
            var n = this._super();
            n.config(options);
            return n;
        }
    },
    /** @lends $m.df.components.Circle.prototype */
    {
        /** $m.df.Color representing fill color */
        color:null,
        /** $m.df.Color representing stroke color */
        lineColor:null,
        /** Stroke width */
        lineWidth:0,

        /**
         * Constructs a new component. See create method for options
         */
        init:function ()
        {
            this._super('circle');
        },

        /**
         * Configures the component. See create method for options
         * @param {Object} options Options
         */
        config:function (options)
        {
            if (options.color)
            {
                if (this.color == null)
                    this.color = $m.df.Color.create(options.color);
                else
                    this.color.set(options.color);
            } else
                this.color = null;

            if (options.lineColor)
            {
                if (this.lineColor == null)
                    this.lineColor = $m.df.Color.create(options.lineColor);
                else
                    this.lineColor.set(options.lineColor);
            } else
                this.lineColor = null;

            this.lineWidth = $m.df.checked(options.lineWidth, 0);
        }

    });

