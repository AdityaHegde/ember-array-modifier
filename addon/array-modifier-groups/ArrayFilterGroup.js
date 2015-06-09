import Ember from "ember";
import ArrayModifierGroup from "./ArrayModifierGroup";

/** 
 * Array filter modifier group which has ArrayModifier.ArrayFilterModifier and ArrayModifier.ArraySearchModifier
 *
 * @class ArrayModifier.ArrayFilterGroup
 * @extends ArrayModifier.ArrayModifierGroup
 * @module ember-array-modifier
 * @submodule ember-array-modifier-groups
 */
export default ArrayModifierGroup.extend({
  type : "filter",

  /**
   * Priority to run this modifier group
   *
   * @property priority
   * @type Number
   * @default 2
   */
  priority : 2,

  /**
   * Method that returns whether an item can be added or not.
   *
   * @method canAdd
   * @param {Class} item Item that is to be checked whether it can be added or not.
   * @return {Boolean}
   */
  canAdd : function(item) {
    var arrayModifiers = this.get("arrayModifiers");
    for(var i = 0; i < arrayModifiers.length; i++) {
      var value = item.get(arrayModifiers[i].get("property"));
      if(!arrayModifiers[i].modFun(item, value)) {
        return false;
      }
    }
    return true;
  },

  /**
   * Method called to modify an entire array. Filters the array based on canAdd method.
   *
   * @method modify
   * @param {Array} array The array to modify.
   */
  modify : function(array) {
    var that = this;
    return Ember.A(array.filter(function(item) {
      return that.canAdd(item);
    }, this));
  },

  /**
   * Method called to modify a single item. Checks canAdd and adds the item if true, else removes it.
   *
   * @method modifySingle
   * @param array {Array} The array to modify.
   * @param item {Instance} The item to modify.
   * @param idx {Number} Index of item in array.
   */
  modifySingle : function(array, item, idx) {
    if(this.canAdd(item)) {
      if(!array.contains(item)) {
        if(idx === -1) {
          array.pushObject(item);
        }
        else {
          array.insertAt(idx, item);
        }
      }
      return true;
    }
    else if(array.contains(item)) {
      array.removeObject(item);
    }
    return false;
  },
});
