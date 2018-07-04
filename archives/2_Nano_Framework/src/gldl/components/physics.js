/**
 * Playcraft Engine - (C)2012 Playcraft Labs, Inc.
 * See licence.txt for details
 */

/**
 * @class $m.df.components.Physics
 * @description
 * [Extends <a href='$m.df.components.Component'>$m.df.components.Component</a>]<BR>
 * [Used in <a href='$m.df.systems.Physics'>$m.df.systems.Physics</a>]
 * <p>
 * Adds 2D physics to an entity. See the <a href='/develop/guides/physics'>physics</a> and
 * <a href='/develop/guides/collisions'>collision</a> guides for more information.
 *
 * <h5>Shapes</h5>
 * You can define physics shapes by providing an array of settings, one for each shape. The available options for
 * each shape are:
 * - shape: shape type ($m.df.CollisionShape.RECT | $m.df.CollisionShape.CIRCLE | $m.df.CollisionShape.POLY)
 * - offset: (x, y, w, h) of the shape to the entity's spatial (all default to 0)
 * - type: user-set type which will be passed on in collisions
 * - sensorOnly: boolean, use true to not react to collisions, just report them
 * - collisionGroup: same as component collision group, but applies to only this fixture shape.
 * - collisionMask: same as component collision mask, but applies to only this fixture shape.
 * - collisionCategory: same as component collision category, but applies to only this fixture shape.
 *
 * Here's an example of a complex configuration of shapes (from the Scrollia player entity):
 * <pre><code>
 * e.addComponent($m.df.components.Physics.create(
 * {
 *   ...
 *
 *     shapes:[
 *         // upper torso/head
 *         { type:0, offset:{y:-20, w:-60}, shape:$m.df.CollisionShape.CIRCLE },
 *         // middle torso
 *         { type:0, offset:{y:-3, w:-60}, shape:$m.df.CollisionShape.CIRCLE },
 *         // leg area
 *         { type:0, offset:{y:12, w:-60}, shape:$m.df.CollisionShape.CIRCLE },
 *         // feet
 *         { type:1, sensorOnly:true, shape:$m.df.CollisionShape.CIRCLE, offset:{y:20, w:-68} }
 *     ],
 *
 *     ...
 * }));
 * </code></pre>
 */

$m.df.components.Physics = $m.df.components.Component.extend('$m.df.components.Physics',
    /** @lends $m.df.components.Physics */
    {
        /**
         * Creates (or acquires) a new physics component using the provided options
         * @param {Number} [options.collisionGroup] Collision group to assign (default: 0)
         * @param {Number} [options.collisionCategory] Collision category to assign (default: 0)
         * @param {Number} [options.collisionMask] Collision mask to assign (default: 0)
         * @param {Boolean} [options.sensorOnly] Don't react to collisions, just sense them (default: false)
         * @param {Boolean} [options.centered] Causes box2d body to be aligned to center (rather than top left shifted) (default: true)
         * @param {Array} [options.shapes] An array of shapes representing the fixtures (default: entity's spatial rectangle)
         * @param {$m.df.Dim} [options.maxSpeed] Maxium velocity to allow the entity to go (as an x, y vector)
         * @param {$m.df.Dim} [options.gravity] Gravity override for the entity only (x, y vector)
         * @param {Number} [options.mass] Amount of relative mass to assign to the entity
         * @param {Boolean} [options.fixedRotation] True if the object is not allow to turn (default: false)
         * @param {Number} [options.thrust] Initial thrust to apply
         * @param {Number} [options.bounce] Amount of bounciness (2=200% reverse velocity on impact)
         * @param {Boolean} [options.faceVel] Use true to have the entity always face the direction it's heading
         * @param {$m.df.CollisionShape} [options.shape] Collision shape default (if shapes array not set)
         * @param {Boolean} [options.immovable] Makes the object immovable (by any force)
         * @param {Number} [options.density] How dense the entity is
         * @param {Number} [options.friction] Amount of friction to apply
         * @param {Number} [options.linearDamping] How fast to slow down velocity (less = more slide)
         * @param {Number} [options.angularDamping] How fast to slow down spin (less = better bearings)
         * @param {Boolean} [options.bullet] Special case handling of high-speed objects (enabled CCD)
         * @param {Number} [options.torque] Amount of torque to apply (generate spin)
         * @param {Number} [options.impulse] Amount of impulse force to apply initially
         * @param {Number} [options.turn] Amount of initial spin to apply
         * @param {$m.df.Dim} [options.centerOfMass] Where to position the entities centerOfMass (x, y)
         * @param {$m.df.Dim} [options.linearVelocity] Initial linear velocity (x, y)
         */
        create:function (options)
        {
            var n = this._super();
            n.config(options);
            return n;
        }
    },
    /** @lends $m.df.components.Physics.prototype */
    {
        /** maximum speed the entity can move at ($m.df.Dim|$m.df.Point) */
        maxSpeed:null,
        /** bounciness (2 = bounce back at twice the impact speed) */
        bounce:0.5,
        /** causes the entity's direction to always match the velocity angle */
        faceVel:false,
        /** the density of the object */
        density:0,
        /** mass */
        mass:-1,
        /** level of friction (rubbing) of the surface */
        friction:0,
        /** rate at which an object will slow down movement */
        linearDamping:0,
        /** initial linear velocity */
        linearVelocity: null,
        /** rate at which ab object will slow down its rate of spin */
        angularDamping:0,
        /** stop the entity from rotating */
        fixedRotation:false,
        /** tell the physics engine to expect this object to move fast (slows things down */
        bullet:false,
        /**
         * A designated collision index, anything in the same index won't collide
         * a negative value will cause collisions with other objects, but not others of the same index
         * a positive number will cause collisions between objects of this group as well
         */
        collisionGroup:0,
        /** Advanced collisions using a bit mask. Use this to set bits on/off. */
        collisionCategory:0,
        /** Collision mask to apply to the entities */
        collisionMask:0,
        /** Senses collisions only; there will be no reaction to the collision (like pushing back) */
        sensorOnly:false,
        /** Whether the object can move in space (true gives it infinite mass) */
        immovable:false,
        /** Changes the center of mass from the default center ($m.df.Dim) */
        centerOfMass:null,
        /** causes box2d body to be aligned to center (rather than top left shifted) (default: true) */
        centered:true,

        /**
         * Custom gravity (x an y properties)
         */
        gravity:null,

        /** Shapes - an array of shapes that make up this physics body */
        shapes:null,

        /** force to apply on adding the component */
        force:0,
        /** turn (spin) to apply on adding the component */
        turn:0,
        /** torque energy to apply on adding the component */
        torque:0, // torque to apply

        _body:null, // set by the physics system, if this is attached to a physics body
        _fixtures:null, // array of fixtures attached to the body

        // internal tracking of the associated spatial to detect changes. initialized by the physics
        // component when bound
        _lastSpatialPos:null,
        _lastSpatialDim:null,
        _lastSpatialDir:0,

        /**
         * Constructs and configures a new physics component (see create for details of options)
         */
        init:function (options)
        {
            this._super('physics');
            this.centerOfMass = $m.df.Point.create(0, 0);
            this.margin = { x:0, y:0 };
            this.linearVelocity = $m.df.Dim.create(0,0);
            if ($m.df.valid(options))
                this.config(options);
            this._velReturn = $m.df.Dim.create(0, 0);
            this.gravity = {};
        },

        /**
         * Configures the physics component (see create for details of options)
         */
        config:function (options)
        {
            this._body = null;
            if (this._fixtures)
                this._fixtures.length = 0;
            else
                this._fixtures = [];

            this.collisionGroup = $m.df.checked(options.collisionGroup, 0);
            this.collisionCategory = $m.df.checked(options.collisionCategory, 0);
            this.collisionMask = $m.df.checked(options.collisionMask, 0);
            this.sensorOnly = $m.df.checked(options.sensorOnly, false);
            this.centered = $m.df.checked(options.centered, true);

            // no shape supplied, create a default one
            if (!$m.df.valid(options.shapes) && !Array.isArray(options.shapes))
            {
                options.shapes = [
                    {}
                ];
                options.shapes[0].shape = $m.df.CollisionShape.RECT;
            }

            for (var i = 0; i < options.shapes.length; i++)
            {
                var shape = options.shapes[i];

                // take the spatial, then offset
                if (!shape.offset)
                    shape.offset = {};

                shape.offset.x = $m.df.checked(shape.offset.x, 0);
                shape.offset.y = $m.df.checked(shape.offset.y, 0);
                shape.offset.w = $m.df.checked(shape.offset.w, 0);
                shape.offset.h = $m.df.checked(shape.offset.h, 0);

                shape.type = $m.df.checked(shape.type, 0);
                shape.shape = $m.df.checked(shape.shape, $m.df.CollisionShape.RECT);
                shape.sensorOnly = $m.df.checked(shape.sensorOnly, this.sensorOnly);
                shape.collisionGroup = $m.df.checked(shape.collisionGroup, this.collisionGroup);
                shape.collisionCategory = $m.df.checked(shape.collisionCategory, this.collisionCategory);
                shape.collisionMask = $m.df.checked(shape.collisionMask, this.collisionMask);
            }

            this.shapes = options.shapes;

            if (options.linearVelocity)
            {
                this.linearVelocity.x = $m.df.checked(options.linearVelocity.x, 0);
                this.linearVelocity.y = $m.df.checked(options.linearVelocity.y, 0);
            } else
            {
                this.linearVelocity.x = 0;
                this.linearVelocity.y = 0;
            }

            if (!this.maxSpeed) this.maxSpeed = {};
            if (options.maxSpeed)
            {
                this.maxSpeed.x = $m.df.checked(options.maxSpeed.x, 0);
                this.maxSpeed.y = $m.df.checked(options.maxSpeed.y, 0);
            } else
            {
                this.maxSpeed.x = 0;
                this.maxSpeed.y = 0;
            }

            if (options.gravity)
            {
                this.gravity.x = options.gravity.x;
                this.gravity.y = options.gravity.y;
            } else
            {
                this.gravity.x = undefined;
                this.gravity.y = undefined;
            }

            this.mass = $m.df.checked(options.mass, -1);

            this.fixedRotation = $m.df.checked(options.fixedRotation, false);
            this.thrust = $m.df.checked(options.thrust, 0);
            this.bounce = $m.df.checked(options.bounce, 0.5);
            this.faceVel = $m.df.checked(options.faceVel, 0);
            this.shape = $m.df.checked(options.shape, $m.df.CollisionShape.RECT);

            this.immovable = $m.df.checked(options.immovable, false);

            this.density = $m.df.checked(options.density, 1);
            this.friction = $m.df.checked(options.friction, 0.2);
            this.linearDamping = $m.df.checked(options.linearDamping, 0);
            this.angularDamping = $m.df.checked(options.angularDamping, 0);
            this.bullet = $m.df.checked(options.bullet, false);
            this.torque = $m.df.checked(options.torque, 0);
            this.impulse = $m.df.checked(options.impulse, 0);
            this.turn = $m.df.checked(options.turn, 0);
            this.force = $m.df.checked(options.force, 0);

            if ($m.df.valid(options.centerOfMass))
            {
                this.centerOfMass.x = $m.df.checked(options.centerOfMass.x);
                this.centerOfMass.y = $m.df.checked(options.centerOfMass.y);
            }
        },

        /**
         * Applies angular velocity (turn) to the physics body
         * @param {Number} d Degrees of turn to apply
         */
        applyTurn:function (d)
        {
            if (this._body)
            {
                this._body.SetAngularVelocity($m.df.Math.degToRad(d));
                this._body.SetAwake(true);
            } else
                this._pendingDir = d;
        },

        /**
         * Clears any custom gravity
         */
        clearGravity:function ()
        {
            this.setGravity();
        },

        /**
         * Changes gravity for this entity only: useful for swimming through water, climbing ladder or
         * balloons.
         * @param gravityX Gravity value (0 for no gravity)
         * @param gravityY Gravity value (0 for no gravity)
         */
        setGravity:function (gravityX, gravityY)
        {
            this.gravity.x = gravityX;
            this.gravity.y = gravityY;
            if (this._body)
            {
                if (this.gravity.x != undefined || this._body._pc_gravityX != undefined)
                    this._body._pc_gravityX = this.gravity.x;
                if (this.gravity.y != undefined || this._body._pc_gravityY != undefined)
                    this._body._pc_gravityY = this.gravity.y;
            }
        },

        /**
         * Force a direction change
         * @param {Number} d Direction to change to
         */
        setDir:function (d)
        {
            if (this._body)
            {
                this._body.SetAngle($m.df.Math.degToRad(d));
                this._body.SetAwake(true);
            } else
                this.dir = d;
        },

        /**
         * Retrieves the current direction
         * @return {Number} Current direction
         */
        getDir:function ()
        {
            if (this._body)
            {
                return $m.df.Math.radToDeg(this._body.GetAngle());
            }
            return 0;
        },

        /**
         * Applies force to the entity at a given angle
         * @param {Number} f Amount of force to apply
         * @param {Number} a Angle to apply the force at
         */
        applyForce:function (f, a)
        {
            if (this._body)
            {
                var angle = this._body.GetAngle();
                if ($m.df.valid(a))
                    angle = $m.df.Math.degToRad(a);

                this._body.ApplyForce(
                    Box2D.Common.Math.b2Vec2.Get(Math.cos(angle) * f, Math.sin(angle) * f),
                    this._body.GetWorldCenter());

            } else
                this.force = f;
        },

        /**
         * Applies immediate force to the entity at a given angle
         * @param {Number} f Amount of force to apply
         * @param {Number} a Direction to apply it at
         */
        applyImpulse:function (f, a)
        {
            if (this._body)
            {
                var angle = this._body.GetAngle();
                if ($m.df.valid(a))
                    angle = $m.df.Math.degToRad(a);

                this._body.ApplyImpulse(
                    Box2D.Common.Math.b2Vec2.Get(Math.cos(angle) * f, Math.sin(angle) * f),
                    this._body.GetWorldCenter());
            } else
                this.impulse = f;
        },

        /**
         * Applies angular force (torque/spin) to an object to rotate it
         * @param {Number} a Amount of angular force
         */
        applyTorque:function (a)
        {
            if (this._body)
            {
                this._body.ApplyTorque($m.df.Math.degToRad(a));
            } else
                this.torque = a;
        },

        /**
         * Change the center of masss
         * @param {Number} x x-position relative to the origin of the entity
         * @param {Number} y y-position relative to the origin of the entity
         */
        setCenterOfMass:function (x, y)
        {
            if (this._body)
            {
                var md = new Box2D.Collision.Shapes.b2MassData();
                md.center = Box2D.Common.Math.b2Vec2.Get($m.df.systems.Physics.toP(x), $m.df.systems.Physics.toP(y));
                this._body.SetMassData(md);
            } else
            {
                this.centerOfMass.x = x;
                this.centerOfMass.y = y;
            }
        },

        /**
         * Returns the current speed in linear velocity
         * @return {Number} Current linear velocity (the length of the speed vector)
         */
        getSpeed:function ()
        {
            if (this._body)
                return this._body.GetLinearVelocity().Length() / $m.df.systems.Physics.SCALE;
            return 0;
        },

        /**
         * Force change the speed of the entity
         * @param {Number} x x-component of a speed vector
         * @param {Number} y y-component of a speed vector
         */
        setLinearVelocity:function (x, y)
        {
            if (this._body)
            {
                this._body.SetLinearVelocity(Box2D.Common.Math.b2Vec2.Get(x * $m.df.systems.Physics.SCALE, y * $m.df.systems.Physics.SCALE));
                this._body.SetAwake(true);
            } else
            {
                this.linearVelocity.x = x;
                this.linearVelocity.y = y;
            }
        },

        _velReturn:null,

        /**
         * Current linear velocity vector
         * @return {$m.df.Dim} Current velocity as a 2d vector
         */
        getLinearVelocity:function ()
        {
            if (this._body)
            {
                var v = this._body.GetLinearVelocity();
                this._velReturn.setXY($m.df.systems.Physics.fromP(v.x), $m.df.systems.Physics.fromP(v.y));
            }
            return this._velReturn;
        },

        /**
         * Gets the angle based on the current velocity vector
         * @return {Number} Angle
         */
        getVelocityAngle:function ()
        {
            return $m.df.Math.angleFromVector(this._body.GetLinearVelocity().x, this._body.GetLinearVelocity().y);
        },

        /**
         * Forces an angular velocity (spin) change
         * @param {Number} a Amount of angular force to apply
         */
        setAngularVelocity:function (a)
        {
            if (this._body)
            {
                this._body.SetAngularVelocity(a);
                this._body.SetAwake(true);
            }
        },

        /**
         * Sets the linear damping
         * @param {Number} d Amount of damping to apply
         */
        setLinearDamping:function (d)
        {
            if (this._body)
            {
                this._body.SetLinearDamping(a);
                this._body.SetAwake(true);
            }
        },

        /**
         * Sets the friction
         * @param {Number} f Amount of friction to apply
         */
        setFriction:function (f)
        {
            if (this._body)
            {
                this._body.SetFriction(f);
                this._body.SetAwake(true);
            }
        },

        /**
         * Change the collision category (changes all shapes)
         * @param {Number} c Category to change to
         */
        setCollisionCategory:function (c)
        {
            if (!this._fixtures.length) return;

            this.collisionCategory = c;
            for (var i = 0; i < this._fixtures.length; i++)
            {
                var f = this._fixtures[i].GetFilterData();
                f.collisionCategory = c;
                this._fixtures[i].SetFilterData(f);

                this._fixtures[i].GetFilterData().categoryBits = c;
            }
        },

        /**
         * Change the collision group (changes all shapes)
         * @param {Number} g Group to change to
         */
        setCollisionGroup:function (g)
        {
            if (!this._fixtures.length) return;

            this.collisionGroup = g;
            for (var i = 0; i < this._fixtures.length; i++)
            {
                var f = this._fixtures[i].GetFilterData();
                f.groupIndex = g;
                this._fixtures[i].SetFilterData(f);
            }
        },

        /**
         * Change the collision mask (changes all shapes)
         * @param {Number} m Mask to change to
         */
        setCollisionMask:function (m)
        {
            if (!this._fixtures.length) return;

            this.collisionMask = m;
            for (var i = 0; i < this._fixtures.length; i++)
            {
                var f = this._fixtures[i].GetFilterData();
                f.maskBits = m;
                this._fixtures[i].SetFilterData(f);
            }
        },

        /**
         * Change the sensor only status of a given shape
         * @param {Boolean} s True if this is only a sensor
         * @param {Number} shapeIndex Index of the shape to change
         */
        setIsSensor:function (s, shapeIndex)
        {
            if (!this._fixtures.length) return;
            this._fixtures[shapeIndex].isSensor = s;
        }

    });

