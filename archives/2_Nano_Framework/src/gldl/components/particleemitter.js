/**
 * Playcraft Engine - (C)2012 Playcraft Labs, Inc.
 * See licence.txt for details
 */

/**
 * @class $m.df.components.ParticleEmitter
 * @description
 * [Extends <a href='$m.df.components.Component'>$m.df.components.Component</a>]<BR>
 * [Used in <a href='$m.df.systems.Particles'>$m.df.systems.Particles</a>]
 * <p>
 * A particle generator.
 */
$m.df.components.ParticleEmitter = $m.df.components.Component.extend('$m.df.components.ParticleEmitter',
    /** @lends $m.df.components.ParticleEmitter */
    {
        /**
         * Constructs (or acquires from the pool) a particle emitter component
         * @param {Object} options See member list for available options
         * @return {$m.df.components.ParticleEmitter} A newly configured emitter component
         */
        create:function (options)
        {
            var n = this._super();
            n.config(options);
            return n;
        }
    },
    /** @lends $m.df.components.ParticleEmitter.prototype */
    {
        /** set to false to pause the emitter (and all emissions) */
        active: true,
        /** set to false to stop new emissions, but still update existing ones */
        emitting: true,
        /** minimum amount to grow particles at (negative values shrink) x-axis */
        growXMin:0,
        /** maximum amount to grow particles at x-axis (defaults to growXMin) */
        growXMax:0,
        /** minimum amount to grow particles at (negative values shrink) y-axis */
        growYMin:0,
        /** maximum amount to grow particles at y-axis (defaults to growYMin) */
        growYMax:0,
        /** scaling of the image on x-axis (minimum) */
        scaleXMin: 0,
        /** scaling maximum. if different to min a random scale is chosen */
        scaleXMax: 0,
        /** scaling of the image on y-axis (minimum) */
        scaleYMin: 0,
        /** scaling maximum. if different to min a random scale is chosen */
        scaleYMax: 0,
        /** time to spend fading in the particle */
        fadeInTime: 0,
        /** time spent fading out the particle */
        fadeOutTime: 0,
        /** minimum angle (direction) to fire a particle in */
        angleMin: 0,
        /** maximum angle (direction) to fire a particle in */
        angleMax: 0,
        /** minimum speed */
        thrustMin: 0,
        /** (optional) maximum speed (default is speed minimum */
        thrustMax: 0,
        /** how long to thrust for */
        thrustTime: 0,
        /** min amount of spin on the particle (in degrees per second) */
        spinMin: 0,
        /** max spin (random spin chosen between min and max) */
        spinMax: 0,
        /** distribution of particles over x range */
        rangeX: 1,
        /** distribution of particles over y */
        rangeY: 1,
        /** number to fire out on each emission */
        burst: 1,
        /** delay time between emissions in ms */
        delay: 25,
        /** spritesheet to use (a particle = a frame) */
        spriteSheet: null,
        /** minimum life span of particles */
        lifeMin: 0,
        /** max life span (random life span = max-min) */
        lifeMax: 0,
        /** whether sprite should rotate with angle changes */
        rotateSprite: false,
        /** x position offset (from the position of the entity) */
        offsetX: null,
        /** y position offset (from the position of the entity) */
        offsetY: null,
        /** composite operation on the image */
        compositeOperation: null,
        /** whether particle angles should be relative to the entity I'm attached to */
        relativeAngle: true,
        /** number of shots the emitter shold fire (self destructs after this). 0=repeat continuously */
        shots: 0,
        /** minimum range of alpha to randomly change opacity/alpha */
        alphaMin: 1,
        /** minimum range of alpha to randomly change opacity/alpha */
        alphaMax: 1,
        /** delay before changing alpha */
        alphaDelay: 0,

        _particles: null,
        _lastEmitTime: 0,
        _shotCount: 0,

        /**
         * Constructs a new component. See create method for options
         * @param {Object} options Options
         */
        init:function (options)
        {
            this._super('emitter');
            if ($m.df.valid(options))
                this.config(options);
        },

        /**
         * Reset the emitter to start again
         */
        reset: function()
        {
            this._shotCount = 0;
            this._lastEmitTime = 0;
        },

        /**
         * Configures the component. See create method for options
         * @param {Object} options Options
         */
        config:function (options)
        {
            this._lastEmitTime = 0;
            this._shotCount = 0;

            this.active = $m.df.checked(options.active, true);
            this.emitting = $m.df.checked(options.emitting, true);
            this.growXMin = $m.df.checked(options.growXMin, 0);
            this.growXMax = $m.df.checked(options.growXMax, this.growXMin);
            this.growYMin = $m.df.checked(options.growYMin, 0);
            this.growYMax = $m.df.checked(options.growYMax, this.growYMin);
            this.scaleXMin = $m.df.checked(options.scaleXMin, 1);
            this.scaleYMin = $m.df.checked(options.scaleYMin, 1);
            this.scaleXMax = $m.df.checked(options.scaleXMax, 1);
            this.scaleYMax = $m.df.checked(options.scaleYMax, 1);
            this.compositeOperation = $m.df.checked(options.compositeOperation, null);
            this.alphaMin = $m.df.checked(options.alphaMin, 1);
            this.alphaMax = $m.df.checked(options.alphaMax, this.alphaMin);
            this.alphaDelay = $m.df.checked(options.alphaDelay, 50);
            this.shots = $m.df.checked(options.shots, 0);
            this.relativeAngle = $m.df.checked(options.relativeAngle, true);

            this.rangeX = $m.df.checked(options.rangeX, 1);
            this.rangeY = $m.df.checked(options.rangeY, 1);
            this.fadeInTime = $m.df.checked(options.fadeInTime, 0);
            this.fadeOutTime = $m.df.checked(options.fadeOutTime, 0);
            this.angleMin = $m.df.checked(options.angleMin, 0);
            this.angleMax = $m.df.checked(options.angleMax, 359);
            this.thrustMin = $m.df.checked(options.thrustMin, 1);
            this.thrustMax = $m.df.checked(options.thrustMax, this.thrustMin);
            this.thrustTime = $m.df.checked(options.thrustTime, 100);
            this.burst = $m.df.checked(options.burst, 1);
            this.delay = $m.df.checked(options.delay, 25);
            this.lifeMin = $m.df.checked(options.lifeMin, 100);
            this.lifeMax = $m.df.checked(options.lifeMin, this.lifeMin);
            this.rotateSprite = $m.df.checked(options.rotateSprite, false);
            this.spinMin = $m.df.checked(options.spinMin, 0);
            this.spinMax = $m.df.checked(options.spinMax, this.spinMin);
            this.offsetX = $m.df.checked(options.offsetX, 0);
            this.offsetY = $m.df.checked(options.offsetY, 0);
            this.gravityX = $m.df.checked(options.gravityX, 0);
            this.gravityY = $m.df.checked(options.gravityY, 0);
            this.maxVelX = $m.df.checked(options.maxVelX, 50);
            this.maxVelY = $m.df.checked(options.maxVelY, 50);

            if (!$m.df.valid(options.spriteSheet))
                throw "A spritesheet is required for the emitter";
            else
                this.spriteSheet = options.spriteSheet;

            if (!Array.isArray(this._particles))
                this._particles = new $m.df.LinkedList();
            else
                this._particles.clear();
        },

        onBeforeRemoved: function()
        {
            // being removed from entity, so need to release any particles that
            // are left back into the pool
            var p = this._particles.first;
            while (p)
            {
                p.obj.release();
                p = p.next();
            }
        }

    });