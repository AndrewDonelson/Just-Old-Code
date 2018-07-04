/**
 * Playcraft Engine - (C)2012 Playcraft Labs, Inc.
 * See licence.txt for details
 */

/**
 * Expiry system. See the <a href='$m.df.components.Expiry'>expiry component</a> for more information.
 * @module GLDL
 * @submodule Systems
 * @class $m.df.systems.Expiration
 */
$m.df.systems.Expiration = $m.df.systems.EntitySystem.extend('$m.df.systems.Expiration',
    /** @lends $m.df.systems.Expiration */
    {},
    /** @lends $m.df.systems.Expiration.prototype */
    {
        init: function()
        {
            this._super(['expiry']);
        },

        process: function(entity)
        {
            var c = entity.getComponent('expiry');
            if (!c.active) return;

            c.decrease(gldl.device.elapsed);
            if (c.hasExpired())
                entity.remove();
        }

    });
