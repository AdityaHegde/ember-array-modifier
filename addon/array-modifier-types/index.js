import Ember from "ember";
import ArrayModifier from "./ArrayModifier";
import ArrayFilterModifier from "./ArrayFilterModifier";
import ArraySearchModifier from "./ArraySearchModifier";
import ArrayTagSearchModifier from "./ArrayTagSearchModifier";
import ArraySortModifier from "./ArraySortModifier";

/**
 * Array modifier types
 *
 * @submodule ember-array-modifier-types
 * @module ember-array-modifier
 */


var ArrayModifierTypes = Ember.Namespace.create();
ArrayModifierTypes.ArrayModifier = ArrayModifier;
ArrayModifierTypes.ArrayFilterModifier = ArrayFilterModifier;
ArrayModifierTypes.ArraySearchModifier = ArraySearchModifier;
ArrayModifierTypes.ArrayTagSearchModifier = ArrayTagSearchModifier;
ArrayModifierTypes.ArraySortModifier = ArraySortModifier;

ArrayModifierTypes.ArrayModifiersMap = {
  basic     : ArrayModifier,
  filter    : ArrayFilterModifier,
  search    : ArraySearchModifier,
  tagSearch : ArrayTagSearchModifier,
  sort      : ArraySortModifier,
};

export default ArrayModifierTypes;
