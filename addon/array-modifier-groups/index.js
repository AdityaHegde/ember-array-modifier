import Ember from "ember";
import ArrayModifierGroup from "./ArrayModifierGroup";
import ArrayFilterGroup from "./ArrayFilterGroup";
import ArraySortGroup from "./ArraySortGroup";
import compare from "./compare";

/**
 * Module to handle array modification like sorting, searching and filtering.
 *
 * @submodule ember-array-modifier-groups
 * @module ember-array-modifier
 */
var ArrayModifierGroups = Ember.Namespace.create();
ArrayModifierGroups.ArrayModifierGroup = ArrayModifierGroup;
ArrayModifierGroups.ArrayFilterGroup = ArrayFilterGroup;
ArrayModifierGroups.ArraySortGroup = ArraySortGroup;
ArrayModifierGroups.compare = compare;

ArrayModifierGroups.ArrayModifierGroupsMap = {
  basic  : ArrayModifierGroup,
  filter : ArrayFilterGroup,
  sort   : ArraySortGroup,
};

export default ArrayModifierGroups;
