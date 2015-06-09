import Ember from "ember";
import ArrayFilterModifier from "./ArrayFilterModifier";

/**
 * Class to search for a string in the array elements.
 *
 * @class ArrayModifier.ArraySearchModifier
 * @extends ArrayModifier.ArrayFilterModifier
 * @module ember-array-modifier
 * @submodule ember-array-modifier-types
 */
export default ArrayFilterModifier.extend({
  type : "search",

  /**
   * Search string.
   *
   * @property searchString
   * @type String
   */
  searchString : "",

  /**
   * If set to true, all elements matching searchString will be removed, else all elements not matching searchString will be removed.
   *
   * @property negate
   * @type Boolean
   * @default false
   */
  negate : false,

  /**
   * Search string regex object.
   *
   * @property searchRegex
   * @type RegEx
   * @private
   */
  searchRegex : Ember.computed("searchString", function() {
    var searchString = this.get("searchString") || "";
    searchString = searchString.replace(/([\.\[\]\?\+\*])/g, "\\$1");
    return new RegExp(searchString, "i");
  }),

  /**
   * Method called to modify a single element. Does a regex match with searchRegex and negates it based on negate value.
   *
   * @method modFun
   * @param {Class} item The item to modify.
   * @param {any} value The value to modfiy on.
   */
  modFun : function(item, value) {
    var negate = this.get("negate"), filter = this.get("searchRegex").test(value);
    return (negate && !filter) || (!negate && filter);
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
    //handle this seperately
    Ember.addObserver(this, "searchString", context, method+"_each");
    Ember.addObserver(this, "negate", context, method+"_each");
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
    Ember.removeObserver(this, "searchString", context, method+"_each");
    Ember.removeObserver(this, "negate", context, method+"_each");
  },
});
