/**
 * Playcraft Engine - (C)2012 Playcraft Labs, Inc.
 * See licence.txt for details
 */

/**
 * @class $m.df.components.Spatial
 * @description
 * [Extends <a href='$m.df.components.Component'>$m.df.components.Component</a>]<BR>
 * [Used in <a href='$m.df.systems.Render'>$m.df.systems.Render</a>, <a href='$m.df.systems.Physics'>$m.df.systems.Physics</a>,
 * <a href='$m.df.systems.Layout'>$m.df.systems.Layout</a>]
 * <p>
 * Represents where an entity exists in 2D space (x, y, width and height). This component is mostly for use by other
 * systems to update and use.
 */
$m.df.components.Spatial = $m.df.components.Component.extend('$m.df.components.Spatial',
    /** @lends $m.df.components.Spatial */
    {
        /**
         * Constructs (or acquires from the pool) a spatial component configuring it with the given options
         * @param {Number} [options.x=0] Entity horizontal coordinate (pixels from the left)
         * @param {Number} [options.y=0] Entity vertical coordinate (pixels from the top)
         * @param {Number} [options.w=0] Entity width (pixels)
         * @param {Number} [options.h=0] Entity height (pixels)
         * @param {Number} [options.dir=0] Rotation; 0 is upright, rotation is clockwise
         * @param {Number} [options.scaleX=1] Horizontal scaling factor (1 is no scaling, -1 flips horizontally)
         * @param {Number} [options.scaleY=1] Vertical scaling factor (1 is no scaling, -1 flips vertically)
         * @return {$m.df.components.Spatial} A shiney new component
         */
        create: function(options)
        {
            var n = this._super();
            n.config(options);
            return n;
        }
    },
    /** @lends $m.df.components.Spatial.prototype */
    {
        /** Last movement in 2D space */
        lastMove: null,

        /** position of the entity as a $m.df.Point object (use pos.x and pos.y). */
        pos: null,
        /** dimension of the entity as a $m.df.Dim object (use dim.x for width and dim.y for height) */
        dim: null,
        /** amount the spatial is scaled on x-axis */
        scaleX: 0,
        /** amount the spatial is scaled on y-axis */
        scaleY: 0,
        dir: 0,

        _centerPos: null, // cache of the current center
        _screenRect: null, // cache of the getScreenRect return

        /**
         * Constructs a new component. See create method for options
         * @param {Object} options Options
         */
        init: function(options)
        {
            this._super('spatial');

            this.pos = $m.df.Point.create(0, 0);
            this.dim = $m.df.Dim.create(0, 0);
            this._screenRect = $m.df.Rect.create(0, 0, 0, 0);
            this._centerPos = $m.df.Point.create(0, 0);
            this._unscaledPos = $m.df.Point.create(0,0);
            this._unscaledDim = $m.df.Point.create(0,0);
            this.lastMove = $m.df.Dim.create(0, 0);
            this.scaleX = 1;
            this.scaleY = 1;

            if ($m.df.valid(options))
                this.config(options);
        },

        /**
         * Configures the component. See create method for options
         * @param {Object} options Options
         */
        config: function(options)
        {
            this.pos.x = $m.df.checked(options.x, 0);
            this.pos.y = $m.df.checked(options.y, 0);
            this.dim.x = $m.df.checked(options.w, 0);
            this.dim.y = $m.df.checked(options.h, 0);
            this.dir = $m.df.checked(options.dir, 0);
            this.scaleX = $m.df.checked(options.scaleX, 1);
            this.scaleY = $m.df.checked(options.scaleY, 1);

            this._centerPos.x = 0;
            this._centerPos.y = 0;
            this._screenRect.x = 0;
            this._screenRect.y = 0;
            this._screenRect.w = 0;
            this._screenRect.h = 0;
            this.lastMove.x = 0;
            this.lastMove.y = 0;
        },

        /**
         * Get the current position
         * @return {$m.df.Point} the current position
         */
        getPos: function()
        {
            return this.pos;
        },

        /**
         * Get the current dimensions (x, y)
         * @return {$m.df.Dim} Reference to the current $m.df.Dim for this spatial
         */
        getDim: function()
        {
            return this.dim;
        },

		setWidth:function(w) {
			this.dim.x = w;
		},
		
        /**
         * Increase the dimensions of the spatial by the given x and y scales. Scaling occurs relative to the
         * center of the spatial, so the position is moved accordingly
         * @param {Number} x x-axis scale to apply (can be negative to shrink)
         * @param {Number} y y-axis scale to apply (can be negative to shrink)
         */
        addScale:function(x, y)
        {
            this.pos.x -= Math.abs((this.dim.x - (this.dim.x * x)) / 2);
            this.pos.y -= Math.abs((this.dim.y - (this.dim.y * y)) / 2);
            this.dim.x *= (x);
            this.dim.y *= (y);
            this.scaleX += x;
            this.scaleY += y;
        },

        _unscaledPos: null,

        /**
         * Gets the spatial position, without any scaling effects
         * @return {$m.df.Point} The unscaled position
         */
        getUnscaledPos:function()
        {
            this._unscaledPos.x = this.pos.x / this.scaleX;
            this._unscaledPos.y = this.pos.y / this.scaleY;
            return this._unscaledPos;
        },

        _unscaledDim: null,

        /**
         * Gets the spatial dimensions, without any scaling effects
         * @return {$m.df.Dim} The unscaled dimensions
         */
        getUnscaledDim:function()
        {
            this._unscaledDim.x = this.dim.x / this.scaleX;
            this._unscaledDim.y = this.dim.y / this.scaleY;
            return this._unscaledDim;
        },

        /**
         * Reduces the scale of the spatial. See addScale for details
         * @param {Number} x x-axis scale to reduce by
         * @param {Number} y y-axis scale to reduce by
         */
        subtractScale:function (x, y)
        {
            this.addScale(-x, -y);
        },

        /**
         * Set the spatial direction
         * @param {Number} d Direction to set
         */
        setDir:function(d)
        {
            this.dir = d;
        },

        /**
         * Get the current direction
         * @return {Number} Direction
         */
        getDir:function ()
        {
            return this.dir;
        },

        /**
         * Get the center pos of the spatial (calculated when you call this)
         * @return {$m.df.Point} A $m.df.Point representing the center of the spatial (cached so you do not need to release it)
         */
        getCenterPos: function()
        {
            this._centerPos.x = this.pos.x + (this.dim.x/2);
            this._centerPos.y = this.pos.y + (this.dim.y/2);
            return this._centerPos;
        },

        /**
         * Gets a $m.df.Rect of the screen relative location of this spatial (i.e. not world space)
         * @return {$m.df.Rect} on-screen rectangle (cached, so you should not release it). Null if not on a layer.
         */
        getScreenRect: function()
        {
            if (this._entity && this._entity.layer)
            {
                this._screenRect.x = this._entity.layer.screenX(this.pos.x);
                this._screenRect.y = this._entity.layer.screenY(this.pos.y);
                this._screenRect.w = this.dim.x;
                this._screenRect.h = this.dim.y;
                return this._screenRect;
            }
            return null;
        },

        /**
         * A nice string representation of the spatial
         * @return {String} A string representation
         */
        toString: function()
        {
            return 'x: ' + this.x + ' y: ' + this.y + ' z: ' + this.z + ' dir: '+ this.dir;
        }


    });