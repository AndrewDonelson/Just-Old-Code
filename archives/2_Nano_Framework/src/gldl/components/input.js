/**
 * Playcraft Engine - (C)2012 Playcraft Labs, Inc.
 * See licence.txt for details
 */

/**
 * Convenience component that lets you bind input states and actions to an entity.
 * In options provide an array of states and actions, with the associated input, e.g.
 * <pre><code>
 * states:
 * [
 *      ['moving right', ['D', 'TOUCH', 'RIGHT']],
 *      ['moving left', ['A', 'LEFT']],
 *      ['jumping', ['W', 'UP']],
 *      ['jumping', ['MOUSE_BUTTON_LEFT_DOWN', 'SPACE'], false],
 * ],
 * actions:
 * [
 *      ['fire', ['SPACE']]
 * ]
 * </code></pre>
 * Note the use of a positional input (the mouse left button click for attack). This takes an optional extra
 * boolean to set whether the positional event should be contained with the on-screen spatial rectangle of the entity.
 * In this case, true means only engage the attack state if the click is on the player; false means you can click
 * anywhere on-screen.
 * @module GLDL
 * @submodule Components
 * @class $m.df.components.Input
 */
$m.df.components.Input = $m.df.components.Component.extend('$m.df.components.Input',
    /** @lends $m.df.components.Input */
    {
        /**
         * Constructs (or acquires from the pool) an input component.
         * @param {Array} options.states Array of states, e.g. states:['fire',['SPACE','D']];
         * @param {Array} options.actions Array of actions, e.g. actions:['fire',['SPACE','D']];
         * @param {$m.df.Entity} [options.target] Optional target entity. If set, actions and states will be set on this,
         * not the entity that contains the component. It will only be used for spatial positional.
         * @return {$m.df.components.Spatial} A shiny new input component
         */
        create:function (options)
        {
            var n = this._super();
            n.config(options);
            return n;
        }
    },
    /** @lends $m.df.components.Input.prototype */
    {
        /** target entity where states and actions will be sent */
        target: null,

        /** array of input states */
        states:null,
        /** array of input actions */
        actions: null,

        _bound: false,

        /**
         * Internal constructor: use .create
         */
        init:function (options)
        {
            this._super('input');
        },

        /**
         * Configures the component. See create method for options
         * @param {Object} options Options
         */
        config:function (options)
        {
            if (!options.states && !options.actions)
                throw 'Input requires at least an action or state set';

            this.states = options.states;
            this.actions = options.actions;
            this.target = options.target;
        }
    });

