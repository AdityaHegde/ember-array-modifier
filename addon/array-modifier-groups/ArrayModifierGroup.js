import Ember from "ember";
import ArrayModifierTypes from "../array-modifier-types/index";
import EmberObjectUtils from "ember-object-utils";

/** 
 * Basic array modifier group.
 *
 * @class ArrayModifier.ArrayModifierGroup
 * @module ember-array-modifier
 * @submodule ember-array-modifier-groups
 */
export default Ember.Object.extend(EmberObjectUtils.ObjectWithArrayMixin, {
  type : "basic",

  /**
   * Array modifiers present in the group. Use object while creating.
   *
   * @property arrayModifiers
   * @type Array
   */
  arrayModifiers : EmberObjectUtils.hasMany(ArrayModifierTypes.ArrayModifiersMap, "type"),

  arrayProps : ['arrayModifiers'],
  /**
   * Priority to run this modifier group
   *
   * @property priority
   * @type Number
   * @default 5
   */
  priority : 5,
  idx : 0,

  /**
   * Method that returns whether an item can be added or not.
   *
   * @method canAdd
   * @param {Class} item Item that is to be checked whether it can be added or not.
   * @return {Boolean}
   */
  canAdd : function(/*item*/) {
    return true;
  },

  /**
   * Method called to modify an entire array.
   *
   * @method modify
   * @param {Array} array The array to modify.
   */
  modify : function(array) {
    var arrayModifiers = this.get("arrayModifiers");
    for(var i = 0; i < arrayModifiers.length; i++) {
      array = arrayModifiers[i].modify(array);
    }
    return array;
  },
});
