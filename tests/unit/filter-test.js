import Ember from "ember";
import EmberArrayModifier from "ember-array-modifier";
import { module, test } from "qunit";
import startApp from '../helpers/start-app';

var tests = Ember.A([{
  testName : "Filter on varb",
  arrayModifiers : [{
    type : "tagSearch",
    property : "varb",
    tags : [
      {label : "test_1", val : "test_1", checked : false},
      {label : "test_2", val : "test_2", checked : true},
      {label : "test_3", val : "test_3", checked : false},
      {label : "test_4", val : "test_4", checked : true},
    ],
  }],
  initialOutput : ["test2", "test4", "test6"],
  oprns : [{
    modify : {
      "arrayModifiers.0.tags.0.checked" : true,
      "arrayModifiers.0.tags.1.checked" : false,
      "arrayModifiers.0.tags.2.checked" : true,
      "arrayModifiers.0.tags.3.checked" : false,
    },
    key : "vara",
    output : ["test1", "test5", "test3", "test8", "test7"],
  }, {
    insert : [{
      index  : 0,
      object : {
        vara : "test9",
        varb : "test_1",
        varc : "test_nc_1",
      },
    }, {
      index  : 0,
      object : {
        vara : "test10",
        varb : "test_2",
        varc : "test_nc_2",
      },
    }, {
      index  : 10,
      object : {
        vara : "test11",
        varb : "test_3",
        varc : "test_nc_3",
      },
    }],
    remove : [{
      index : 7,
    }],
    modify : {
      "content.8.varb" : "test_2",
    },
    key : "vara",
    output : ["test9", "test1", "test5", "test8", "test11"],
  }],
}]),
testNameToDataMap = {};

module("Filter", {
  beforeEach : function(assert) {
    assert.application = startApp();
    assert.testData = testNameToDataMap[assert.test.testName];
  },
  afterEach : function(assert) {
    Ember.run(assert.application, 'destroy');
  },
});

tests.forEach(function(testData) {
  testNameToDataMap[testData.testName] = testData;

  test(testData.testName, function(assert) {
    createArray(assert);

    andThen(function() {
      Ember.run(function() {
        assert.array.set("arrayModifiers", assert.testData.arrayModifiers);
      });
    });

    andThen(function() {
      assert.equal(assert.array.get("arrayModifiers.length"), assert.testData.arrayModifiers.length);
      assert.ok(assert.array.get("arrayModifierGrps.length") > 0);
    });

    for(var i = 0; i < assert.testData.oprns.length; i++) {
      arrayOperation(assert, assert.testData.oprns[i]);
    }
  });
});
