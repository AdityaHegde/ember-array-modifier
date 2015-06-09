import Ember from "ember";
import ArrayModifier from "./ArrayModifier";

/**
 * Class to sort elements in the array.
 *
 * @class ArrayModifier.ArraySortModifier
 * @extends ArrayModifier.ArrayModifier
 * @module ember-array-modifier
 * @submodule ember-array-modifier-types
 */
export default ArrayModifier.extend({
  type : "sort",
  groupType : "sort",

  /**
   * Order to sort by. true for ascending, false for descending
   *
   * @property order
   * @type String
   * @default true
   */
  order : true,

  /**
   * Set to true if a listener on all objects in the array should be added.
   *
   * @property addObserverToAll
   * @type Boolean
   * @default false
   */
  addObserverToAll : false,

  /**
   * Method called to modify an entire array.
   *
   * @method modify
   * @param {Array} array The array to modify.
   */
  modify : function(array) {
    console.log("Sorting!!");
    array.sortBy(this.get("property"));
    if(!this.get("order")) {
      array.reverseObjects();
    }
    return array;
  },

  /**
   * Function called when observers are supposed to be added.
   *
   * @method addModifierObservers
   * @param {Class} context Context to add the observer to.
   * @param {String|Function} method Method to be called when observer is called.
   */
  addModifierObservers : function(context, method) {
    this._super(context, method);
    Ember.addObserver(this, "order", context, method);
  },

  /**
   * Function called when observers are supposed to be removed.
   *
   * @method removeModifierObservers
   * @param {Class} context Context to add the observer to.
   * @param {String|Function} method Method to be called when observer is called.
   */
  removeModifierObservers : function(context, method) {
    this._super(context, method);
    Ember.removeObserver(this, "order", context, method);
  },
});
