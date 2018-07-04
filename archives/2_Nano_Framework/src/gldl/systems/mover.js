/**
 * Playcraft Engine - (C)2013 Playcraft Labs, Inc.
 * See licence.txt for details
 */

/**
 * [Used in <a href='$m.df.systems.Mover'>$m.df.systems.Mover</a>]
 * <p>
 * Moves an entity to a target location, with tweening effects.
 * <p>
 * Just add a Mover component to make an entity move around, i.e.
 * <pre><code>
 * box.addComponent($m.df.components.Mover.create(
 * {
 *   targetPos: { x:200, y:200 },
 *   easing: $m.df.Easing.QUADRATIC_IN_OUT,
 *   duration: 3000
 * }));
 *
 * myLayer.addSystem( new $m.df.systems.Mover() );
 * </code></pre>
 * You can look at all the easing types in the $m.df.Easing class (inside math.js)
 * @module GLDL
 * @submodule Systems
 * @class $m.df.systems.Mover
 */
$m.df.systems.Mover = $m.df.systems.EntitySystem.extend('MoverSystem',
  /** @lends $m.df.systems.Mover */
  {},
  /** @lends $m.df.systems.Mover.prototype */
  {
    /** number of entities moving */
    numMoving: 0,

    init:function ()
    {
      this._super(['mover']);
      this.numMoving = 0;
    },

    processAll: function()
    {
      // reset the number of moving entities
      this.numMoving = 0;
      // this will call process for every entity
      this._super();
    },

    process:function (entity)
    {
      var mover = entity.getComponent('mover');
      var spatial = entity.getComponent('spatial');

      if (!mover._bound)
      {
        // set the distance we need to cover on the first run through
        mover._bound = true;
        mover._startTime = gldl.device.now;
        mover._startPos = spatial.pos.clone();
      }

      var elapsed = ( gldl.device.now - mover._startTime ) / mover.duration;
      elapsed = elapsed > 1 ? 1 : elapsed;

      var value = $m.df.Easing.ease(mover.easing, elapsed);
      spatial.pos.x = mover._startPos.x + ( mover.targetPos.x - mover._startPos.x ) * value;
      spatial.pos.y = mover._startPos.y + ( mover.targetPos.y - mover._startPos.y ) * value;

      // are we at an end?
      if (elapsed == 1)
      {
        mover.active = false;
        // force a move to the final position (to be exact)
        spatial.pos = $m.df.Point.create(mover.targetPos.x, mover.targetPos.y);
        if (mover.onComplete)
          mover.onComplete(entity);
        entity.removeComponent(mover);
      }
      else
        // keep count of the number of things moving in this system
        this.numMoving++; // this is reset at the start of every cycle by processAll above
    }

  });

