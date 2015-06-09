import ArrayModifier from "./ArrayModifier";

/**
 * Base class for array filter, which removes/adds elements.
 *
 * @class ArrayModifier.ArrayFilterModifier
 * @extends ArrayModifier.ArrayModifier
 * @module ember-array-modifier
 * @submodule ember-array-modifier-types
 */
export default ArrayModifier.extend({
  type : "filter",
  groupType : "filter",

  /**
   * Method called to modify an entire array.
   *
   * @method modify
   * @param {Array} array The array to modify.
   */
  modify : function(array) {
    return array.filter(function(item) {
      var value = item.get(this.get("property"));
      this.modFun(item, value);
    }, this);
  },

  /**
   * Method called to modify a single element.
   *
   * @method modFun
   * @param {Class} item The item to modify.
   * @param {any} value The value to modfiy on.
   */
  modFun : function(/*item, value*/) {
    return true;
  },
});
