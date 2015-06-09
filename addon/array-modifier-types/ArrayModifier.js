import Ember from "ember";

/**
 * Base class for array modifier
 *
 * @class ArrayModifier.ArrayModifier
 * @module ember-array-modifier
 * @submodule ember-array-modifier-types
 */
export default Ember.Object.extend({
  /**
   * Type of the array modifier.
   *
   * @property type
   * @type String
   * @default "basic"
   * @readonly
   */
  type : "basic",

  /**
   * Array modifier group type the modifier belongs to.
   *
   * @property groupType
   * @type String
   * @default "basic"
   * @readonly
   */
  groupType : "basic",

  /**
   * Property the modifier applies on.
   *
   * @property property
   * @type String
   */
  property : "",

  /**
   * Priority to run this modifier
   *
   * @property priority
   * @type Number
   * @default 1
   */
  priority : 1,

  /**
   * Set to true if a listener on all objects in the array should be added.
   *
   * @property addObserverToAll
   * @type Boolean
   * @default true
   */
  addObserverToAll : true,

  /**
   * Function called when observers are supposed to be added.
   *
   * @method addModifierObservers
   * @param {Class} context Context to add the observer to.
   * @param {String|Function} method Method to be called when observer is called.
   */
  addModifierObservers : function(context, method) {
    Ember.addObserver(this, "property", context, method);
  },

  /**
   * Function called when observers are supposed to be removed.
   *
   * @method removeModifierObservers
   * @param {Class} context Context to add the observer to.
   * @param {String|Function} method Method to be called when observer is called.
   */
  removeModifierObservers : function(context, method) {
    Ember.removeObserver(this, "property", context, method);
  },
});
