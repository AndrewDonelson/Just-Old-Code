/**
 * Playcraft Engine - (C)2012 Playcraft Labs, Inc.
 * See licence.txt for details
 */

/**
 * Used to lay another sprite over an entity, with options to automagically expire after a certain time limit.
 * Good for things like smoke, explosive damage or muzzle flashs, and where you don't need to create a complete
 * entity.
 * @module GLDL
 * @submodule Components
 * @class $m.df.components.Overlay
 */
$m.df.components.Overlay = $m.df.components.Component.extend('$m.df.components.Overlay',
    /** @lends $m.df.components.Overlay */
    {
        /**
         * Constructs (or acquires an object from the pool) with the given options.
         * @param {Number} options.lifetime Lifetime of the overlay (will automatically remove itself)
         * @param {$m.df.SpriteSheet} options.spriteSheet Sprite sheet to use for the animation
         * @param {String} options.animationStart Which animation to play in the sprite
         * @param {Number} options.animationStartDelay Amount of time in ms to increase or decrease the animation speed
         * @return {$m.df.components.Overlay} An overlay component
         */
        create: function(options)
        {
            var n = this._super();
            n.config(options);
            return n;
        }
    },
    /** @lends $m.df.components.Overlay.prototype */
    {
        /** lifetime the overlay will display for */
        lifetime: 0,
        /** sprite object this overlay displays */
        sprite: null,

        /**
         * Constructs a new component. See create method for options
         * @param {Object} options Options
         */
        init: function(options)
        {
            this._super('overlay');
            this.sprite = $m.df.Sprite.create();
            if ($m.df.valid(options))
                this.config(options);
        },

        /**
         * Configures the component. See create method for options
         * @param {Object} options Options
         */
        config: function(options)
        {
            this.lifetime = $m.df.checked(options.lifetime, 1000);

            var spriteSheet = $m.df.checked(options.spriteSheet, null);
            if (spriteSheet == null)
                throw this.getUniqueId() + ': no spritesheet specified';

            this.sprite.setSpriteSheet(spriteSheet);

            var animationStart = $m.df.checked(options.animationStart, null);
            var animationStartDelay = $m.df.checked(options.animationStartDelay, 0);
            if (animationStart != null)
                this.sprite.setAnimation(animationStart, animationStartDelay);
        },

        /**
         * Descreases the amount of time the sprite should stay alive for
         * @param {Number} time Time to reduce by in ms
         */
        decrease: function(time)    { this.lifetime -= time;  },

        /**
         * Tests if the sprite has expired already
         * @return {Boolean} True if it has expired
         */
        hasExpired: function()      { return this.lifetime <= 0; }

    });

