import Ember from "ember";

export default Ember.Test.registerAsyncHelper('arrayOperation', function (app, assert, data) {
  andThen(function() {
    Ember.run(function() {
      var i;
      if(data.insert) {
        for(i = 0; i < data.insert.length; i++) {
          assert.array._replace(data.insert[i].index, 0, Ember.A([Ember.Object.create(data.insert[i].object)]));
        }
      }

      if(data.remove) {
        for(i = 0; i < data.remove.length; i++) {
          assert.array._replace(data.remove[i].index, 1);
        }
      }

      if(data.modify) {
        /*for(i = 0; i < data.modify.length; i++) {
          var obj = assert.array.objectAt(data.modify[i].index);
          obj.setProperties(data.modify[i].props);
        }*/
        assert.array.setProperties(data.modify);
      }
    });
  });
  andThen(function() {
    assert.deepEqual(assert.array.get("arrangedContent").mapBy(data.key), data.output);
  });
});
