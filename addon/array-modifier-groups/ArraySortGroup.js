import Ember from "ember";
import ArrayModifierGroup from "./ArrayModifierGroup";
import compare from "./compare";
import binaryInsert from "../binaryInsert";

/** 
 * Array sort modifier group.
 *
 * @class ArrayModifier.ArraySortGroup
 * @extends ArrayModifier.ArrayModifierGroup
 * @module ember-array-modifier
 * @submodule ember-array-modifier-groups
 */
export default ArrayModifierGroup.extend({
  type : "sort",

  /**
   * Priority to run this modifier group
   *
   * @property priority
   * @type Number
   * @default 10
   */
  priority : 10,

  /**
   * Compare method used in sorting of array.
   *
   * @method compare
   * @param a {any}
   * @param b {any}
   */
  compare : function(a, b) {
    var arrayModifiers = this.get("arrayModifiers");
    for(var i = 0; i < arrayModifiers.length; i++) {
      var av = a.get(arrayModifiers[i].get("property")),
          bv = b.get(arrayModifiers[i].get("property")),
          cmp = compare(av, bv),
          order = arrayModifiers[i].get("order");
      if(!order) {
        cmp = -cmp;
      }
      if(cmp) {
        return cmp;
      }
      else {
        continue;
      }
    }
    return 0;
  },

  /**
   * Method called to modify an entire array. Default is to sort the array.
   *
   * @method modify
   * @param {Array} array The array to modify.
   */
  modify : function(array) {
    var that = this;
    return Ember.A(array.sort(function(a, b) {
      return that.compare(a, b);
    }, this));
  },

  /**
   * Method called to modify a single item. It remove the item if already present and uses binary insert to insert the item to array.
   *
   * @method modifySingle
   * @param array {Array} The array to modify.
   * @param item {Instance} The item to modify.
   * @param idx {Number} Index of item in array.
   */
  modifySingle : function(array, item/*, idx*/) {
    var that = this;
    if(array.contains(item)) {
      array.removeObject(item);
    }
    binaryInsert(array, item, function(a, b) {
      return that.compare(a, b);
    });
    return true;
  },
});
