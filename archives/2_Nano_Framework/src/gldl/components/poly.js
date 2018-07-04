/**
 * Playcraft Engine - (C)2012 Playcraft Labs, Inc.
 * See licence.txt for details
 */

/**
 * @class $m.df.components.Poly
 * @description
 * [Extends <a href='$m.df.components.Component'>$m.df.components.Component</a>]<BR>
 * [Used in <a href='$m.df.systems.Render'>$m.df.systems.Render</a>]
 * <p>
 * Draw a polygon
 */
$m.df.components.Poly = $m.df.components.Component.extend('$m.df.components.Poly',
    /** @lends $m.df.components.Poly */
    {
        /**
         * Constructs (or acquires from the pool) a rectangle component.
         * @param {String} options.color Fill color in the form of #RRGGBB.
         * @param {String} options.lineColor Line color in the form of #RRGGBB
         * @param {Number} options.lineWidth Stroke width
         * @param {Number} options.points Array of points to draw
         * @return {$m.df.components.Poly} The new component
         */
        create:function (options)
        {
            var n = this._super();
            n.config(options);
            return n;
        }
    },
    /** @lends $m.df.components.Poly.prototype */
    {
        /** $m.df.Color representing fill color */
        color:null,
        /** $m.df.Color representing stroke color */
        lineColor:null,
        /** Stroke width */
        lineWidth:0,
        /** array of points to draw */
        points:[],

        /**
         * Constructs a new component. See create method for options
         * @param {Object} options Options
         */
        init:function (options)
        {
            this._super('poly');
            this.color = $m.df.Color.create('#ffffff');
            this.lineColor = null;
            if ($m.df.valid(options))
                this.config(options);
        },

        /**
         * Configures the component. See create method for options
         * @param {Object} options Options
         */
        config:function (options)
        {
            if (!options.color)
                this.color.set('#ffffff');
            else
                this.color.set($m.df.checked(options.color, '#ffffff'));

            if ($m.df.valid(options.lineColor))
            {
                if (this.lineColor == null)
                    this.lineColor = $m.df.Color.create(options.lineColor);
                else
                    this.lineColor.set($m.df.checked(options.lineColor, '#888888'));
            }
            this.lineWidth = $m.df.checked(options.lineWidth, 0);
            if (options.points.length < 3)
                throw 'Invalid polygon, requires at least 3 points';
            this.points = options.points;
        }

    });

