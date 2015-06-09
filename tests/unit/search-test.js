import Ember from "ember";
import EmberArrayModifier from "ember-array-modifier";
import { module, test } from "qunit";
import startApp from '../helpers/start-app';

var tests = Ember.A([{
  testName : "search on vara",
  arrayModifiers : [{
    type : "search",
    property : "vara",
    searchString : "1",
  }],
  initialOutput : ["test1"],
  oprns : [{
    insert : [{
      index  : 0,
      object : {
        vara : "test9",
        varb : "test_4",
      },
    }, {
      index  : 0,
      object : {
        vara : "test51",
        varb : "test_3",
      },
    }, {
      index  : 10,
      object : {
        vara : "test11",
        varb : "test_2",
      },
    }],
    remove : [{
      index : 8,
    }],
    modify : {
      "content.3.vara" : "test61",
      "content.3.varb" : "test_4",
    },
    key : "vara",
    output : ["test51", "test1", "test61", "test11"],
  }, {
    modify : {
      "arrayModifiers.0.property" : "varb",
      "arrayModifiers.0.searchString" : "test_4",
    },
    key : "vara",
    output : ["test9", "test61", "test4"],
  }, {
    modify : {
      "content.3.varb" : "test_2",
      "content.2.varb" : "test_4",
    },
    key : "vara",
    output : ["test9", "test1", "test4"],
  }],
}, {
  testName : "search on vara and varb",
  arrayModifiers : [{
    type : "search",
    property : "varb",
    searchString : "test_1",
  }, {
    type : "search",
    property : "vara",
    searchString : "1",
  }],
  initialOutput : ["test1"],
  oprns : [{
    insert : [{
      index  : 0,
      object : {
        vara : "test9",
        varb : "test_3",
      },
    }, {
      index  : 0,
      object : {
        vara : "test51",
        varb : "test_4",
      },
    }, {
      index  : 10,
      object : {
        vara : "test11",
        varb : "test_2",
      },
    }],
    remove : [{
      index : 8,
    }],
    modify : {
      "content.3.vara" : "test61",
      "content.3.varb" : "test_4",
      "arrayModifiers.0.searchString" : "test_4",
    },
    key : "vara",
    output : ["test51", "test61"],
  }, {
    modify : {
      "content.3.varb" : "test_2",
      "content.2.varb" : "test_4",
    },
    key : "vara",
    output : ["test51", "test1"],
  }],
}]),
testNameToDataMap = {};

module("Searching", {
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
      assert.ok(assert.array.get("arrayModifierGrps.length") > 1);
    });

    for(var i = 0; i < assert.testData.oprns.length; i++) {
      arrayOperation(assert, assert.testData.oprns[i]);
    }
  });
});
