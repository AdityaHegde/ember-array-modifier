import Ember from "ember";
import ArrayModifierTypes from "./array-modifier-types/index";
import ArrayModifierGroups from "./array-modifier-groups/index";
import ArrayModifierMixin from "./ArrayModifierMixin";

/**
 * Module to handle array modification like sorting, searching and filtering.
 *
 * @module ember-array-modifier
 */

var
arrayModModules = [ArrayModifierGroups, ArrayModifierTypes],
EmberArrayModifier = Ember.Namespace.create();
EmberArrayModifier.ArrayModifierMixin = ArrayModifierMixin;

for(var i = 0; i < arrayModModules.length; i++) {
  for(var k in arrayModModules[i]) {
    if(arrayModModules[i].hasOwnProperty(k)) {
      EmberArrayModifier[k] = arrayModModules[i][k];
    }
  }
}

export default EmberArrayModifier;
