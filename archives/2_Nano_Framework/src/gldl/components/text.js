/**
 * Playcraft Engine - (C)2012 Playcraft Labs, Inc.
 * See licence.txt for details
 */

/**
 * @class $m.df.components.Text
 * @description
 * [Extends <a href='$m.df.components.Component'>$m.df.components.Component</a>]<BR>
 * [Used in <a href='$m.df.systems.Render'>$m.df.systems.Render</a>]
 * <p>
 * Adds display text to an entity.
 */
$m.df.components.Text = $m.df.components.Component.extend('$m.df.components.Text',
    /** @lends $m.df.components.Text */
    {
        /**
         * Constructs (or acquires from the pool) a text component.
         * @param {String} options.color Fill color in the form of #RRGGBB.
         * @param {String} options.strokeColor Line color in the form of #RRGGBB
         * @param {Number} options.lineWidth Stroke width
         * @param {String} options.font Name of the font
         * @param {Number} options.fontHeight Size/height of the font (i.e. 20 for 20pt)
         * @param {String} options.text String to display
         * @param {$m.df.Point} options.offset Object containing x, y properties. Offset position of the text.
         * @return {$m.df.components.Text} A text component
         */
        create: function(options)
        {
            var n = this._super();
            n.config(options);
            return n;
        }
    },
    /** @lends $m.df.components.Text.prototype */
    {
        /** $m.df.Color representing fill color */
        color: null,
        /** $m.df.Color representing stroke color */
        strokeColor: null,
        /** Font name (read-only - use setFont) */
        font: null,
        /** Font size: 20 = 20pt (read-only - use setHeight) */
        fontHeight: 0,
        /** Display text */
        text: null,
        /** Stroke width */
        lineWidth: 0,
        /** Offset position of the text relative to the entity spatial */
        offset: null,

        _fontCache: null,

        /**
         * Constructs a new component. See create method for options
         * @param {Object} options Options
         */
        init: function(options)
        {
            this._super('text');
            this.color = $m.df.Color.create('#ffffff');
            this.strokeColor = $m.df.Color.create('#888888');
            this.text = [];
            this.font = 'Calibri';
            this.fontHeight = 20;
            this.offset = $m.df.Dim.create(0,0);
            this._fontCache = '';
            if ($m.df.valid(options))
                this.config(options);
        },

        /**
         * Configures the component. See create method for options
         * @param {Object} options Options
         */
        config: function(options)
        {
            this.color.set($m.df.checked(options.color, '#ffffff'));
            this.strokeColor.set($m.df.checked(options.strokeColor, '#888888'));
            this.lineWidth = $m.df.checked(options.lineWidth, 0);
            this.text = $m.df.checked(options.text, ['']);
            this.font = $m.df.checked(options.font, 'Arial');
            this.fontHeight = $m.df.checked(options.fontHeight, 20);
            if ($m.df.valid(options.offset))
            {
                this.offset.x = $m.df.checked(options.offset.x);
                this.offset.y = $m.df.checked(options.offset.y);
            }
            this._updateFont();
        },

        /**
         * Sets the font height
         * @param {Number} height Height in points (20=20pt)
         */
        setHeight: function(height)
        {
            this.fontHeight = height;
            this._updateFont();
        },

        /**
         * Sets the font
         * @param {String} font Name of the font (i.e. 'Arial')
         */
        setFont: function(font)
        {
            this.font = font;
            this._updateFont();
        },

        _updateFont: function()
        {
            this._fontCache = '' + this.fontHeight + 'px ' + this.font;
        }


    });


