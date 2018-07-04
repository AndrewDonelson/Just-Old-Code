/**
 * Playcraft Engine - (C)2012 Playcraft Labs, Inc.
 * See licence.txt for details
 */

/**
 * Adds a fade effects to the entity. e.g.
 * <pre><code>
 * entity.addComponent(
 *      $m.df.components.Fade.create( { holdTime: 1300, fadeOutTime:200 } ) );
 * </code></pre>
 * @module GLDL
 * @submodule Components
 * @class $m.df.components.Fade
 */
$m.df.components.Fade = $m.df.components.Component.extend('$m.df.components.Fade',
    /** @lends $m.df.components.Fade */
    {
        /**
         * Constructs (or acquires from the pool) a fade component
         * @param {Number} options.startDelay ms to wait before doing anything
         * @param {Number} options.fadeInTime time to fade in (in ms)
         * @param {Number} options.fadeOutTime time to fade out (in ms)
         * @param {Number} options.holdTime time to hold between fading in and fading out (in ms)
         * @param {Number} options.loops number of loops (0=infinite)
         * @return {$m.df.components.Fade} A configured fade component
         */
        create:function (options)
        {
            var n = this._super();
            n.config(options);
            return n;
        }
    },
    /** @lends $m.df.components.Fade.prototype */
    {
        /** ms to wait before doing anything */
        startDelay:0,
        /** time to fade in (in ms) */
        fadeInTime:0,
        /** time to fade out (in ms) */
        fadeOutTime:0,
        /** time to hold between fading in and fading out (in ms) */
        holdTime:0,
        /** when the current state started */
        startTime:0,
        /** how long before we need to change states */
        timeLimit:0,
        /** current state */
        state:0,
        /** number of loops (0=infinite) */
        loops:1,

        /** read-only for how many loops have been completed */
        loopsSoFar:0,

        /**
         * Constructs a new component. See create method for options
         */
        init:function ()
        {
            this._super('fade');
        },

        /**
         * Configures the component. See create method for options
         * @param {Object} options Options
         */
        config:function (options)
        {
            this.startDelay = $m.df.checked(options.startDelay, 0);
            this.fadeInTime = $m.df.checked(options.fadeInTime, 0);
            this.fadeOutTime = $m.df.checked(options.fadeOutTime, 0);
            this.holdTime = $m.df.checked(options.holdTime, 0);
            this.loops = $m.df.checked(options.loops, 1);
            this.timeLimit = 0;
            this.state = 0;
            this.loopsSoFar = 0;
        }
    });