/**
 * Playcraft Engine - (C)2012 Playcraft Labs, Inc.
 * See licence.txt for details
 */

/**
 * A particle system. See the particle component for more information.
 * @module GLDL
 * @submodule Systems
 * @class $m.df.systems.Particles
 */
$m.df.systems.Particles = $m.df.systems.EntitySystem.extend('$m.df.systems.Particles',
    /** @lends $m.df.systems.Particles */
    { },
    /** @lends $m.df.systems.Particles.prototype */
    {
        /**
         * Constructs a new particle system
         */
        init:function ()
        {
            this._super([ 'emitter' ]);
        },

        _drawStartTime: 0,

        process:function (entity)
        {
            if (!entity.active) return;

            var em = entity.getComponent('emitter');
            if (!em.active) return;

            var sp = entity.getComponent('spatial');
            if (!sp)
                sp = entity.addComponent(new $m.df.components.Spatial({}));

            if (em)
            {
                if (!em.active) return;

                // New emissions
                if (em.emitting && Date.now() - em._lastEmitTime > em.delay && (em.shots == 0 || em._shotCount < em.shots))
                {
                    for (var b = 0; b < em.burst; b++)
                    {
                        // if this sprite sheet has no animations, then we just use the spritesheet frames
                        var frame = 0;
                        if (em.spriteSheet.animations.size() == 0)
                            // pick a random frame to use
                            frame = $m.df.Math.rand(0, (em.spriteSheet.framesHigh * em.spriteSheet.framesWide)-1);

                        em._particles.add(
                            $m.df._Particle.create(
                                sp.pos.x + em.offsetX + $m.df.Math.rand(-(em.rangeX/2), em.rangeX/2),
                                sp.pos.y + em.offsetY + $m.df.Math.rand(-(em.rangeY/2), em.rangeY/2),
                                $m.df.Math.rotate(em.relativeAngle ? sp.dir : 0, $m.df.Math.rand(em.angleMin, em.angleMax)),
                                $m.df.Math.randFloat(em.thrustMin, em.thrustMax),
                                $m.df.Math.randFloat(em.lifeMin, em.lifeMax),
                                $m.df.Math.randFloat(em.spinMin, em.spinMax),
                                $m.df.Math.randFloat(em.growXMin, em.growXMax),
                                $m.df.Math.randFloat(em.growYMin, em.growYMax),
                                $m.df.Math.randFloat(em.scaleXMin, em.scaleXMax),
                                $m.df.Math.randFloat(em.scaleYMin, em.scaleYMax),
                                em.fadeInTime, em.fadeOutTime,
                                em.alphaMin, em.alphaMax,
                                em.spriteSheet,
                                em.compositeOperation,
                                frame));
                    }

                    em._lastEmitTime = Date.now();
                    em._shotCount++;
                }

                // update all the particles
                var next = em._particles.first;
                while (next)
                {
                    var p = next.obj;

                    // move the particles in the right direction
                    if (gldl.device.now - p.start > em.thrustTime)
                        p.thrust = 0;

                    var accelX = p.thrust * Math.cos( $m.df.Math.degToRad(p.dir) );
                    var accelY = p.thrust * Math.sin( $m.df.Math.degToRad(p.dir) );

                    // add the acceleration to velocity
                    p.velX += (accelX * (gldl.device.elapsed/1000)) + em.gravityX;
                    p.velY += (accelY * (gldl.device.elapsed/1000)) + em.gravityY;
                    p.velX = $m.df.Math.limit(p.velX, -em.maxVelX, em.maxVelX);
                    p.velY = $m.df.Math.limit(p.velY, -em.maxVelY, em.maxVelY);
                    p.x += p.velX;
                    p.y += p.velY;

                    // render aspects (spin, grow, fade etc)
                    if (p.spin)
                        p.rotation = $m.df.Math.rotate(p.rotation, p.spin * (gldl.device.elapsed/1000));
                    if (p.growXRate != 0 || p.growYRate != 0)
                    {
                        p.scaleX += p.growXRate * (gldl.device.elapsed/1000);
                        p.scaleY += p.growYRate * (gldl.device.elapsed/1000);
                    }

                    if (p.fadeState == 0) // fading in
                    {
                        p.sprite.addAlpha((gldl.device.elapsed * (100 / p.fadeInTime)) / 100);
                        if (gldl.device.now - p.fadeStateStart > p.fadeInTime)
                        {
                            p.fadeState++;
                            p.fadeStateStart = gldl.device.now;
                        }
                    }

                    if (p.fadeState == 1)
                    {
                        if (gldl.device.now - p.fadeStateStart > p.holdTime)
                        {
                            p.fadeState++;
                            p.fadeStateStart = gldl.device.now;
                        }
                    }

                    if (p.fadeState == 2) // fading out
                    {
                        if (p.fadeOutTime > 0)// && p.sprite.alpha > 0)
                        {
                            var fa = (gldl.device.elapsed * (100 / p.fadeOutTime)) / 100;
                            p.sprite.subAlpha(fa);
                            // doesn't need to time ending because lifetime will take over
                            // down below and kill this particle
                        }
                    }

                    // pick a random alpha
                    if (p.alphaMin != 1 || p.alphaMax != 1)
                    {
                        if (gldl.device.now - p.lastAlpha > em.alphaDelay)
                        {
                            p.sprite.setAlpha($m.df.Math.rand(p.alphaMin, p.alphaMax));
                            p.lastAlpha = gldl.device.now;
                        }
                    }

                    // draw it
                    this.drawStartTime = Date.now();
                    if (p.scaleX != 1 || p.scaleY != 1)
                        em.spriteSheet.setScale(p.scaleX, p.scaleY);

                    if (!p.sprite.currentAnim)
                    {
                        p.sprite.drawFrame(gldl.device.ctx, p.frame % em.spriteSheet.framesWide,
                            Math.floor(p.frame / em.spriteSheet.framesWide),
                            p.x - entity.layer.origin.x - entity.layer.scene.viewPort.x,
                            p.y - entity.layer.origin.y - entity.layer.scene.viewPort.y,
                            em.rotateSprite ? p.rotation : p.dir);
                        gldl.device.lastDrawMS += (Date.now() - this.drawStartTime);
                    }
                    else
                    {
                        p.sprite.draw(gldl.device.ctx,
                            p.x - entity.layer.origin.x - entity.layer.scene.viewPort.x,
                            p.y - entity.layer.origin.y - entity.layer.scene.viewPort.y,
                            p.dir);
                        gldl.device.lastDrawMS += (Date.now() - this.drawStartTime);
                        p.sprite.update(gldl.device.elapsed);
                    }

                    if (p.scaleX != 1 || p.scaleY != 1)
                        em.spriteSheet.setScale(1, 1);

                    // assign next before we (maybe) remove this one
                    next = next.next();

                    // time to die?
                    if (gldl.device.now - p.start > p.lifetime)
                    {
                        p.release();
                        em._particles.remove(p);
                    }
                }

                // if all the particles are done, and the shot count is finished, time to kill the emitter
                if (em.shots != 0)
                {
                    if (em._particles.first == null && em._shotCount >= em.shots)
                       em.active = false;
                }

            }
        }


    });


/**
 * @module GLDL
 * @class $m.df._Particle
 */
$m.df._Particle = $m.df.Pooled.extend('$m.df._Particle',
    {
        create:function (x, y, dir, thrust, lifetime, spin, growXRate, growYRate, scaleX, scaleY,
                         fadeInTime, fadeOutTime, alphaMin, alphaMax, spriteSheet, compositeOperation, frame)
        {
            var n = this._super();
            n.x = x;
            n.y = y;
            n.dir = dir;
            n.thrust = thrust;
            n.frame = frame;
            n.lifetime = lifetime;
            n.spin = spin;
            n.growXRate = growXRate;
            n.growYRate = growYRate;
            n.scaleX = scaleX;
            n.scaleY = scaleY;
            if (n.sprite == null)
                n.sprite = $m.df.Sprite.create(spriteSheet);
            else
                n.sprite.setSpriteSheet(spriteSheet);
            n.start = gldl.device.now;
            n.fadeStart = 0;
            n.velX = 0;
            n.velY = 0;
            n.rotation = 0;
            n.alphaMin = alphaMin;
            n.alphaMax = alphaMax;
            n.lastAlpha = gldl.device.now;
            n.fadeInTime = fadeInTime;
            n.fadeOutTime = fadeOutTime;
            n.holdTime = n.lifetime - (n.fadeInTime + n.fadeOutTime);
            if (compositeOperation)
                n.sprite.setCompositeOperation(compositeOperation);
            else
                n.sprite.setCompositeOperation('source-over');

            n.fadeState = 1;    // 0=fading in, 1 = displaying, 2 = fading out
            n.fadeStateStart = gldl.device.now;
            if (n.fadeInTime > 0)
            {
                n.fadeState = 0;
                n.sprite.setAlpha(0);
            } else
                n.sprite.setAlpha(1);

            return n;
        }
    },
    {
        x: 0,
        y: 0,
        dir: 0,
        rotation: 0,
        thrust: 0,
        sprite: null,
        start: 0,
        frame: 0,
        fadeStart: 0,
        velX: 0,
        velY: 0,
        spin: 0,
        growXRate: 0,
        growYRate: 0,
        scaleX: 1,
        scaleY: 1,
        fadeInTime: 0,
        fadeOutTime: 0,
        fadeStateStart: 0,
        holdTime: 0,
        fadeState: 1,
        alphaMin: 1,
        alphaMax: 1,
        lastAlpha: 0 // time of last alpha change

    });














