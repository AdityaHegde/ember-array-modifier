import Ember from "ember";
import EmberArrayModifier from "ember-array-modifier";
import { module, test } from "qunit";
import startApp from '../helpers/start-app';

var tests = Ember.A([{
  testName : "ascending order",
  arrayModifiers : [{
    type : "sort",
    property : "vara",
  }],
  initialOutput : ["test1", "test2", "test3", "test4", "test5", "test6", "test7", "test8"],
  oprns : [{
    insert : [{
      index  : 0,
      object : {
        vara : "test9",
        varc : "test_nc_1",
      },
    }, {
      index  : 0,
      object : {
        vara : "test51",
        varc : "test_nc_2",
      },
    }, {
      index  : 10,
      object : {
        vara : "test11",
        varc : "test_nc_3",
      },
    }],
    remove : [{
      index : 8,
    }],
    modify : {
      "content.7.vara" : "test61",
    },
    key : "vara",
    output : ["test1", "test11", "test2", "test4", "test5", "test51", "test6", "test61", "test7", "test9"],
  }, {
    modify : {
      "content.4.vara" : "test5",
    },
    key : "varc",
    output : ["test_c_1", "test_nc_3", "test_c_4", "test_c_2", "test_c_3", "test_nc_2", "test_c_5", "test_c_6", "test_c_8", "test_nc_1"],
  }],
}, {
  testName : "descending order",
  arrayModifiers : [{
    type : "sort",
    property : "vara",
    order : false
  }],
  initialOutput : ["test8", "test7", "test6", "test5", "test4", "test3", "test2", "test1"],
  oprns : [{
    insert : [{
      index  : 0,
      object : {
        vara : "test10",
        varc : "test_nc_1",
      },
    }, {
      index  : 0,
      object : {
        vara : "test51",
        varc : "test_nc_2",
      },
    }, {
      index  : 10,
      object : {
        vara : "test9",
        varc : "test_nc_3",
      },
    }],
    remove : [{
      index : 7,
    }],
    modify : {
      "content.5.vara" : "test61",
    },
    key : "vara",
    output : ["test9", "test8", "test7", "test61", "test6", "test51", "test5", "test2", "test10", "test1"],
  }, {
    modify : {
      "content.2.vara" : "test8",
    },
    key : "varc",
    output : ["test_nc_3", "test_c_1", "test_c_7", "test_c_8", "test_c_4", "test_c_5", "test_nc_2", "test_c_2", "test_c_3", "test_nc_1"],
  }],
}, {
  testName : "descending with varb and ascending with vara",
  arrayModifiers : [{
    type : "sort",
    property : "varb",
    order : false,
  }, {
    type : "sort",
    property : "vara",
  }],
  initialOutput : ["test4", "test8", "test2", "test6", "test1", "test3", "test5", "test7"],
  oprns : [{
    insert : [{
      index  : 8,
      object : {
        vara : "test9",
        varb : "test_1",
      },
    }, {
      index  : 9,
      object : {
        vara : "test10",
        varb : "test_2",
      },
    }],
    remove : [{
      index : 5,
    }],
    modify : {
      "content.5.varb" : "test_1",
      "content.6.varb" : "test_2",
    },
    key : "vara",
    output : ["test4",  "test10", "test2",  "test6",  "test7",  "test1",  "test5",  "test8",  "test9"],
  }, {
    key : "varb",
    output : ["test_4", "test_2", "test_2", "test_2", "test_2", "test_1", "test_1", "test_1", "test_1"],
  }],
}]),
testNameToDataMap = {};

module("Sorting", {
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
