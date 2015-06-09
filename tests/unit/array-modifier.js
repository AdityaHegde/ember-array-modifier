import Ember from "ember";
import EmberArrayModifier from "ember-array-modifier";
import { module, test } from "qunit";
import startApp from '../helpers/start-app';

/*EmberTests.TestCase.ArrayModifierTC = EmberTests.TestCase.TestCase.extend({
  initialize : function() {
    this.set("testData.arrayController", Ember.ArrayProxy.create({
      content : [
        Ember.Object.create({vara : "test1", varb : "test_1"}),
        Ember.Object.create({vara : "test5", varb : "test_1"}),
        Ember.Object.create({vara : "test2", varb : "test_2"}),
        Ember.Object.create({vara : "test4", varb : "test_4"}),
        Ember.Object.create({vara : "test6", varb : "test_2"}),
        Ember.Object.create({vara : "test3", varb : "test_1"}),
        Ember.Object.create({vara : "test8", varb : "test_3"}),
        Ember.Object.create({vara : "test7", varb : "test_1"}),
      ],
      unique_id : "test",
    }));
  },
});
EmberTests.TestCase.addToTestHierarchy("arrayMod", EmberTests.TestCase.ArrayModifierTC, "tc");

EmberTests.TestCase.TestSuit.create({
  suitName : "array-modifier",
  testCases : [{
    title : "sort - descending on varb and ascending on vara",
    type : "arrayMod",
    testData : {},
    testBlocks : [
      ["baseTestBlock", [
        ["assignValues", [
          //"type", "path", "putPath", "value", "param", "valuePath"
          ["base", "arrayController.arrayMods", "", ArrayMod.ArraySortModifier.create({ property : "varb", order : false, }), "push"],
          ["base", "arrayController.arrayMods", "", ArrayMod.ArraySortModifier.create({ property : "vara" }),                 "push"],
        ]],
      ]],
      ["baseTestBlock", [
        ["checkValues", [
          //"type", "path", "value"
          ["base", "arrayController.@.vara", ["test4", "test8", "test2", "test6", "test1", "test3", "test5", "test7"]],
        ]],
        ["assignValues", [
          //"type", "path", "putPath", "value", "param", "valuePath"
          ["base", "arrayController",                      "",     Ember.Object.create({ vara : "test9", varb : "test_4" }),  "push"   ],
          ["base", "arrayController",                      "",     Ember.Object.create({ vara : "test10", varb : "test_1" }), "unshift"],
          ["base", "arrayController",                      "",     Ember.Object.create({ vara : "test80", varb : "test_1" }), "unshift"],
          ["base", "arrayController.content.[vara=test5]", "varb", "test_3"],
          ["base", "arrayController",                      "",     "",                                                        "remove" , "arrayController.content.[vara=test4]"],
        ]],
      ]],
      ["baseTestBlock", [
        ["checkValues", [
          //"type", "path", "value"
          ["base", "arrayController.@.vara", ["test9", "test5", "test8", "test2", "test6", "test1", "test10", "test3", "test7", "test80"]],
        ]],
        ["assignValues", [
          //"type", "path", "putPath", "value", "param", "valuePath"
          ["base", "arrayController.arrayMods", 1, "", "removeAt"],
        ]],
      ]],
      ["baseTestBlock", [
        ["checkValues", [
          //"type", "path", "value"
          ["base", "arrayController.@.vara", ["test9", "test5", "test8", "test2", "test6", "test80", "test10", "test1", "test3", "test7"]],
        ]],
        ["assignValues", [
          //"type", "path", "putPath", "value", "param", "valuePath"
          ["base", "arrayController.arrayMods", 0, "", "removeAt"],
        ]],
      ]],
      ["checkValues", [
          //"type", "path", "value"
          ["base", "arrayController.@.vara", ["test80", "test10", "test1", "test5", "test2", "test6", "test3", "test8", "test7", "test9"]],
      ]],
    ],
  }, {
    type : "arrayMod",
    title : "search - on varb with 'test_1'",
    testData : {},
    testBlocks : [
      ["baseTestBlock", [
        ["assignValues", [
          //"type", "path", "putPath", "value", "param", "valuePath"
          ["base", "arrayController.arrayMods", "", ArrayMod.ArraySearchModifier.create({ property : "varb", searchString : "test_1" }), "push"],
        ]],
      ]],
      ["baseTestBlock", [
        ["checkValues", [
          //"type", "path", "value"
          ["base", "arrayController.@.vara", ["test1", "test3", "test5", "test7"]],
        ]],
        ["assignValues", [
          //"type", "path", "putPath", "value", "param", "valuePath"
          ["base", "arrayController",                      "",     Ember.Object.create({ vara : "test9", varb : "test_1" }),  "push"],
          ["base", "arrayController",                      "",     Ember.Object.create({ vara : "test10", varb : "test_2" }), "push"],
          ["base", "arrayController.content.[vara=test5]", "varb", "test_3"],
          ["base", "arrayController.content.[vara=test6]", "varb", "test_1"],
        ]],
      ]],
      ["baseTestBlock", [
        ["checkValues", [
          //"type", "path", "value"
          ["base", "arrayController.@.vara", ["test1", "test3", "test6", "test7", "test9"]],
        ]],
        ["assignValues", [
          //"type", "path", "putPath", "value", "param", "valuePath"
          ["base", "arrayController.arrayMods.0", "searchString", "test_2"],
        ]],
      ]],
      ["baseTestBlock", [
        ["checkValues", [
          //"type", "path", "value"
          ["base", "arrayController.@.vara", ["test2", "test10"]],
        ]],
        ["assignValues", [
          //"type", "path", "putPath", "value", "param", "valuePath"
          ["base", "arrayController.arrayMods.0", "property",     "vara"],
          ["base", "arrayController.arrayMods.0", "searchString", "test1"],
        ]],
      ]],
      ["baseTestBlock", [
        ["checkValues", [
          //"type", "path", "value"
          ["base", "arrayController.@.vara", ["test1", "test10"]],
        ]],
        ["assignValues", [
          //"type", "path", "putPath", "value", "param", "valuePath"
          ["base", "arrayController.arrayMods.0", "negate", true],
        ]],
      ]],
      ["baseTestBlock", [
        ["checkValues", [
          //"type", "path", "value"
          ["base", "arrayController.@.vara", ["test5", "test2", "test4", "test6", "test3", "test8", "test7", "test9"]],
        ]],
        ["assignValues", [
          //"type", "path", "putPath", "value", "param", "valuePath"
          ["base", "arrayController.arrayMods", 0, "", "removeAt"],
        ]],
      ]],
      ["checkValues", [
          //"type", "path", "value"
          ["base", "arrayController.@.vara", ["test1", "test5", "test2", "test4", "test6", "test3", "test8", "test7", "test9", "test10"]],
      ]],
    ],
  }, {
    type : "arrayMod",
    title : "filter - on varb with tags 'test_2' and 'test_4'",
    testData : {},
    testBlocks : [
      ["baseTestBlock", [
        ["assignValues", [
          //"type", "path", "putPath", "value", "param", "valuePath"
          ["base", "arrayController.arrayMods", "", ArrayMod.ArrayTagSearchModifier.create({
            property : "varb",
            tags : [
              {label : "test_1", val : "test_1", checked : false},
              {label : "test_2", val : "test_2", checked : true},
              {label : "test_3", val : "test_3", checked : false},
              {label : "test_4", val : "test_4", checked : true},
            ],
          }), "push"],
        ]],
      ]],
      ["baseTestBlock", [
        ["checkValues", [
          //"type", "path", "value"
          ["base", "arrayController.@.vara", ["test2", "test4", "test6"]],
        ]],
        ["assignValues", [
          //"type", "path", "putPath", "value", "param", "valuePath"
          ["base", "arrayController",                      "",     Ember.Object.create({ vara : "test9",  varb : "test_1" }), "push"],
          ["base", "arrayController",                      "",     Ember.Object.create({ vara : "test10", varb : "test_2" }), "push"],
          ["base", "arrayController.content.[vara=test5]", "varb", "test_2"],
          ["base", "arrayController.content.[vara=test6]", "varb", "test_1"],
        ]],
      ]],
      ["baseTestBlock", [
        ["checkValues", [
          //"type", "path", "value"
          ["base", "arrayController.@.vara", ["test2", "test4", "test5", "test10"]],
        ]],
        ["assignValues", [
          //"type", "path", "putPath", "value", "param", "valuePath"
          ["base", "arrayController.arrayMods.0.tags.1", "checked", false],
          ["base", "arrayController.arrayMods.0.tags.2", "checked", true],
        ]],
      ]],
      ["baseTestBlock", [
        ["checkValues", [
          //"type", "path", "value"
          ["base", "arrayController.@.vara", ["test4", "test8"]],
        ]],
        ["assignValues", [
          //"type", "path", "putPath", "value", "param", "valuePath"
          ["base", "arrayController.arrayMods.0.tags.2", "negate",  true],
          ["base", "arrayController.arrayMods.0.tags.3", "checked", false],
        ]],
      ]],
      ["baseTestBlock", [
        ["checkValues", [
          //"type", "path", "value"
          ["base", "arrayController.@.vara", ["test4", "test1", "test5", "test2", "test6", "test3", "test7", "test9", "test10"]],
        ]],
        ["assignValues", [
          //"type", "path", "putPath", "value", "param", "valuePath"
          ["base", "arrayController.arrayMods", 0, "", "removeAt"],
        ]],
      ]],
      ["checkValues", [
        //"type", "path", "value"
        ["base", "arrayController.@.vara", ["test1", "test5", "test2", "test4", "test6", "test3", "test8", "test7", "test9", "test10"]],
      ]],
    ],
  }],
});*/
