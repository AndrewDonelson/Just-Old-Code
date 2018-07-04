/**
 * Playcraft Engine - (C)2012 Playcraft Labs, Inc.
 * See licence.txt for details
 */

/**
 * @class $m.df.components.Spin
 * @description
 * [Extends <a href='$m.df.components.Component'>$m.df.components.Component</a>]<BR>
 * [Used in <a href='$m.df.systems.Effects'>$m.df.systems.Effects</a>]
 * <p>
 * Makes an entity spin
 * <pre><code>
 * entity.addComponent(
 *      $m.df.components.Spin.create( { rate: 15 } ) );
 * </code></pre>
 */
$m.df.components.Spin = $m.df.components.Component.extend('$m.df.components.Spin',
    /** @lends $m.df.components.Spin */
    {
        /**
         * Constructs (or acquires from the pool) a fade component
         * @param {Number} options.rate rate of spin in degrees per second (default is 15)
         * @param {Number} options.max Amount to spin (optional, default is 0 - unlimited)
         * @param {Boolean} options.clockwise Whether to spin in a clockwise direction (default is true)
         * @return {$m.df.components.Spin} A configured component
         */
        create:function (options)
        {
            var n = this._super();
            n.config(options);
            return n;
        }
    },
    /** @lends $m.df.components.Spin.prototype */
    {
        /** rate of spin in degrees per second */
        rate:0,
        /** number of degrees to spin */
        max:0,
        /** spin clockwise or counter clockwise */
        clockwise: true,
        /** degrees spun so far */
        spinSoFar: 0,
        /** still spinning */
        spinning: true,

        /**
         * Constructs a new component. See create method for options
         * @param {Object} options Options
         */
        init:function (options)
        {
            this._super('spin');
            if ($m.df.valid(options))
                this.config(options);
        },

        /**
         * Configures the component. See create method for options
         * @param {Object} options Options
         */
        config:function (options)
        {
            this.rate = $m.df.checked(options.rate, 15);
            this.max = $m.df.checked(options.max, 0);
            this.clockwise = $m.df.checked(options.clockwise, true);
            this.spinSoFar = 0;
            this.spinning = true;
        }
    });
