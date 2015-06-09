import Ember from "ember";
import EmberObjectUtils from "ember-object-utils";
import ArrayFilterModifier from "./ArrayFilterModifier";

/**
 * Class for a tag. Never used directly. Passed as an object to ArrayModifier.ArrayTagSearchModifier.
 *
 * @class ArrayModifier.TagObject
 * @module ember-array-modifier
 * @submodule ember-array-modifier-types
 */
var TagObject = Ember.Object.extend({
  /**
   * Label for the tag.
   *
   * @property label
   * @type String
   */
  label : "",

  /**
   * Value for the tag.
   *
   * @property val
   * @type String
   */
  val : "",

  /**
   * Checked boolean.
   *
   * @property checked
   * @type Boolean
   * @default true
   */
  checked : true,

  /**
   * If set to true, val will be not taken if checked, else val will be taken if checked.
   *
   * @property negate
   * @type Boolean
   * @default false
   */
  negate : false,
});

/**
 * Class to filter elements based on tags.
 *
 * @class ArrayModifier.ArrayTagSearchModifier
 * @extends ArrayModifier.ArrayFilterModifier
 * @module ember-array-modifier
 * @submodule ember-array-modifier-types
 */
export default ArrayFilterModifier.extend({
  type : "tagSearch",

  /**
   * Tags to filter with. Elements are ArrayModifier.TagObject instances. But passed as objects while creating.
   *
   * @property tags
   */
  tags : EmberObjectUtils.hasMany(TagObject),

  /**
   * Tags that are taken.
   *
   * @property selectedTags
   */
  selectedTags : Ember.computed.filterBy("tags", "checked", true),

  /**
   * Joiner for the tags. Can be "or" or "and".
   *
   * @property joiner
   * @type String
   * @default "or"
   */
  joiner : "or",

  /**
   * Method called to modify a single element.
   *
   * @method modFun
   * @param {Class} item The item to modify.
   * @param {any} value The value to modfiy on.
   */
  modFun : function(item, value) {
    var tags = this.get("selectedTags"), joiner = this.get("joiner") === "and", bool = joiner;
    for(var i = 0; i < tags.length; i++) {
      var res = value === tags[i].get("val"), tagNegate = tags[i].get("negate");
      res = (tagNegate && !res) || (!tagNegate && res);
      bool = (joiner && (bool && res)) || (!joiner && (bool || res));
    }
    return bool;
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
    Ember.addObserver(this, "selectedTags.@each.val",    context, method+"_each");
    Ember.addObserver(this, "selectedTags.@each.negate", context, method+"_each");
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
    Ember.removeObserver(this, "selectedTags.@each.val",    context, method+"_each");
    Ember.removeObserver(this, "selectedTags.@each.negate", context, method+"_each");
  },
});
