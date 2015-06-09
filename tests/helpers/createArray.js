import Ember from "ember";
import EmberArrayModifier from "ember-array-modifier";

export default Ember.Test.registerAsyncHelper('createArray', function (app, assert) {
  Ember.run(function() {
    assert.array = Ember.ArrayProxy.createWithMixins(EmberArrayModifier.ArrayModifierMixin, {
      content : Ember.A([
        Ember.Object.create({vara : "test1", varb : "test_1", varc : "test_c_1"}),
        Ember.Object.create({vara : "test5", varb : "test_1", varc : "test_c_2"}),
        Ember.Object.create({vara : "test2", varb : "test_2", varc : "test_c_3"}),
        Ember.Object.create({vara : "test4", varb : "test_4", varc : "test_c_4"}),
        Ember.Object.create({vara : "test6", varb : "test_2", varc : "test_c_5"}),
        Ember.Object.create({vara : "test3", varb : "test_1", varc : "test_c_6"}),
        Ember.Object.create({vara : "test8", varb : "test_3", varc : "test_c_7"}),
        Ember.Object.create({vara : "test7", varb : "test_1", varc : "test_c_8"}),
      ]),
      unique_id : "test",
    });
  });
});
