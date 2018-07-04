/**
 * Playcraft Engine - (C)2013 Playcraft Labs, Inc.
 * See licence.txt for details
 */

/**
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
 * @submodule Components
 * @class $m.df.components.Mover
 */
$m.df.components.Mover = $m.df.components.Component.extend('$m.df.components.Mover',
  /** @lends $m.df.components.Mover */
  {
    /**
     * Constructs (or acquires from the pool) a mover component
     * @param {$m.df.Point} options.targetPos Position to move the entity to
     * @param {Number} options.duration How long to take to move there (in ms)
     * @param {$m.df.Easing} options.easing Type of easing to use
     * @param {Function} options.onComplete Function to call once the entity has reached it's destination
     * @return {$m.df.components.Mover} A newly configured mover component
     */
    create: function (options)
    {
      var n = this._super();
      n.config(options);
      return n;
    }
  },
  /** @lends $m.df.components.Mover.prototype */
  {
    /** target position for the entity to be moved to */
    targetPos:0,
    /** time frame to move over (how fast we move) */
    duration:0,
    /** optional callback when completed movement */
    onComplete: null,
    /** type of easing to use; default is linear */
    easing: $m.df.Easing.LINEAR,

    _distanceLeft: 0,
    _bound: false,
    _startTime: 0,

    /**
     * Constructs a new component. See create method for options
     */
    init:function (options)
    {
      this._super('mover');
      if ($m.df.valid(options))
        this.config(options);
    },

    config:function (options)
    {
      this._distanceLeft = 0;
      this._bound = false;

      this.targetPos = options.targetPos;
      this.duration = options.duration;
      this.onComplete = options.onComplete;
      this.easing = $m.df.checked(options.easing, $m.df.Easing.LINEAR);
    }

  });




