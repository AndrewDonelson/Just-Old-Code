/**
 * Playcraft Engine - (C)2012 Playcraft Labs, Inc.
 * See licence.txt for details
 */

/**
 * Shifts the origin of the entity relative to the origin of the layer it's on, with an additional origin ratio
 * adjuster. You can use this to make an entity shift around as the layer origin moves (parallax within parallax)
 * @module GLDL
 * @submodule Components
 * @class $m.df.components.OriginShifter
 */
$m.df.components.OriginShifter = $m.df.components.Component.extend('$m.df.components.OriginShifter',
    /** @lends $m.df.components.OriginShifter */
    {
        /**
         * Constructs (or acquires from the pool) a component, configuring it with the given options.
         * @param {Number} options.ratio The ratio to shift the position by
         * @return {*}
         */
        create:function (options)
        {
            var n = this._super();
            n.config(options);
            return n;
        }
    },
    /** @lends $m.df.components.OriginShifter.prototype */
    {
        /** current shift ratio */
        ratio:1,

        _offsetX: 0,
        _offsetY: 0,

        /**
         * Constructs a new component. See create method for options
         * @param {Object} options Options
         */
        init:function (options)
        {
            this._super('originshifter');
            if ($m.df.valid(options))
                this.config(options);
        },

        /**
         * Configures the component. See create method for options
         * @param {Object} options Options
         */
        config:function (options)
        {
            this.ratio = $m.df.checked(options.ratio, 1);
        }

    });





