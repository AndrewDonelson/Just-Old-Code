/**
 * Playcraft Engine - (C)2012 Playcraft Labs, Inc.
 * See licence.txt for details
 */

/**
 * @class $m.df.components.Sprite
 * @description
 * [Extends <a href='$m.df.components.Component'>$m.df.components.Component</a>]<BR>
 * [Used in <a href='$m.df.systems.Render'>$m.df.systems.Render</a>]
 * <p>
 * Adds a sprite to an entity. See the core <a href='$m.df.Sprite'>sprite</a> class for information on sprites.
 */
$m.df.components.Sprite = $m.df.components.Component.extend('$m.df.components.Sprite',
    /** @lends $m.df.components.Sprite */
    {
        /**
         * Constructs (or acquires from the pool) a sprite component.
         * @param {$m.df.SpriteSheet} options.spriteSheet SpriteSheet to use
         * @param {$m.df.Point} [options.offset] Object containing x, y properties. Offset position of the sprite.
         * @param {string} [options.animationStart] Initial animation to play
         * @param {string} [options.animationStartDelay=0] Delay in playing initial animation
         * @param {Number} [options.currentFrame=0] Starting frame, or if not animated, the image index into the sprite sheet to show
         * @return {$m.df.components.Sprite} A newly configured sprite component
         */
        create: function(options)
        {
            var n = this._super();
            n.config(options);
            return n;
        }
    },
    /** @lends $m.df.components.Sprite.prototype */
    {
        /** sprite object */
        sprite:null,
        /** Offset position of the sprite relative to the entity spatial */
        offset:null,

        /**
         * Constructs a new component. See create method for options
         * @param {Object} [options] Options
         */
        init: function(options)
        {
            this._super('sprite');
            this.sprite = $m.df.Sprite.create();
            this.offset = $m.df.Point.create(0,0);
            if ($m.df.valid(options))
                this.config(options);
        },

        /**
         * Configures the component. See create method for options
         * @param {Object} options Options
         */
        config: function(options)
        {
            var spriteSheet = $m.df.checked(options.spriteSheet, null);
            if (spriteSheet == null)
                throw this.getUniqueId() + ': no spritesheet specified';

            this.sprite.setSpriteSheet(spriteSheet);

            if ($m.df.valid(options.offset))
            {
                this.offset.x = $m.df.checked(options.offset.x, 0);
                this.offset.y = $m.df.checked(options.offset.y, 0);
            } else
            {
                this.offset.x = 0;
                this.offset.y = 0;
            }

            var animationStart = $m.df.checked(options.animationStart, null);
            var animationStartDelay = $m.df.checked(options.animationStartDelay, 0);
            if (animationStart != null)
                this.sprite.setAnimation(animationStart, animationStartDelay);

            this.sprite.currentFrame = $m.df.checked(options.currentFrame, 0);
        }



    });

