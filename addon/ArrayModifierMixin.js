import Ember from "ember";
import EmberObjectUtils from "ember-object-utils";
import EmberTimerUtils from "ember-timer-utils";
import binaryInsert from "./binaryInsert";
import ArrayModifierTypes from "./array-modifier-types/index";
import ArrayModifierGroups from "./array-modifier-groups/index";

/**
 * ArrayModifierMixin modifies array in "content" and puts it in "arrangedContent".
 *
 * @class ArrayModifier.ArrayModifierMixin
 */
//TODO : revisit the observers addition and deletion
export default Ember.Mixin.create(EmberObjectUtils.ObjectWithArrayMixin, {
  init : function() {
    this._super();
    //add a sort on _originalIndex with least priority to maintain the original order at the end
    this.get("arrayModifierGrps").pushObject(ArrayModifierGroups.ArrayModifierGroupsMap.sort.create({
      arrayModifiers : Ember.A([
        ArrayModifierTypes.ArrayModifiersMap.sort.create({
          property : "_originalIndex",
          priority : 10,
        }),
      ]),
    }));
  },

  unique_id : Ember.computed(function() {
    return EmberObjectUtils.getEmberId(this);
  }),

  /**
   * Array mods added to the controller.
   *
   * @property arrayModifiers
   * @type Array
   */
  arrayModifiers : EmberObjectUtils.hasMany(ArrayModifierTypes.ArrayModifiersMap, "type"),
  //arrayModifiers : null,

  /**
   * Array mods groups formed by arrayModifiers.
   *
   * @property arrayModifierGrps
   * @type Array
   * @readOnly
   */
  arrayModifierGrps : EmberObjectUtils.hasMany(ArrayModifierGroups.ArrayModifierGroupsMap, "type"),
  //arrayModifierGrps : null,

  arrayProps : ["arrayModifiers", "arrayModifierGrps"],
  //not firing on adding new objects!
  isModified : Ember.computed("arrayModifierGrps.@each", function() {
    var arrayModifierGrps = this.get("arrayModifierGrps");
    return !!arrayModifierGrps && arrayModifierGrps.length > 0;
  }),

  addArrayModifierToGroup : function(arrayModifier) {
    var arrayModifierGrps = this.get("arrayModifierGrps"), arrayModifierGrp = arrayModifierGrps.findBy("type", arrayModifier.get("groupType")),
        arrayModifiers = this.get("arrayModifiers");
    if(arrayModifierGrp) {
      binaryInsert(arrayModifierGrp.get("arrayModifiers"), arrayModifier, function(a, b) {
        var priority = ArrayModifierGroups.compare(a.get("priority"), b.get("priority"));
        if(priority === 0) {
          return ArrayModifierGroups.compare(arrayModifiers.indexOf(a), arrayModifiers.indexOf(b));
        }
        return priority;
      });
    }
    else {
      arrayModifierGrp = ArrayModifierGroups.ArrayModifierGroupsMap[arrayModifier.get("groupType")].create({
        arrayModifiers : Ember.A([arrayModifier]),
      });
      binaryInsert(arrayModifierGrps, arrayModifierGrp, function(a, b) {
        return ArrayModifierGroups.compare(a.get("priority"), b.get("priority"));
      });
    }
  },

  removeArrayModifierFromGroup : function(arrayModifier) {
    var arrayModifierGrps = this.get("arrayModifierGrps"), arrayModifierGrp = arrayModifierGrps.findBy("type", arrayModifier.get("groupType")),
        arrayModifiers = arrayModifierGrp.get("arrayModifiers");
    if(arrayModifierGrp) {
      arrayModifiers.removeObject(arrayModifier);
      if(arrayModifiers.length === 0) {
        arrayModifierGrps.removeObject(arrayModifierGrp);
      }
    }
  },

  arrayModifiersWillBeDeleted : function(deletedArrayModifiers/*, idx*/) {
    var content = this.get("content") || Ember.A([]), arrangedContent = this.get("arrangedContent"),
        that = this;
    deletedArrayModifiers.forEach(function(arrayModifier) {
      arrayModifier.removeModifierObservers(this, "arrayModifiersDidChange");
      content.forEach(function(item) {
        if(arrayModifier.get("addObserverToAll") || arrangedContent.contains(item)) {
          Ember.addObserver(item, arrayModifier.get("property"), this, "contentItemPropertyDidChange");
        }
      }, this);
      this.removeArrayModifierFromGroup(arrayModifier);
    }, this);
    EmberTimerUtils.addToQue(this.get("unique_id")+"__ArrayModifierChanged", 250).then(function() {
      that.notifyPropertyChange("arrangedContent");
    });
  },

  arrayModifiersWasAdded : function(addedArrayModifiers/*, idx*/) {
    var content = this.get("content") || Ember.A([]), arrangedContent = this.get("arrangedContent"),
        that = this;
    addedArrayModifiers.forEach(function(arrayModifier) {
      arrayModifier.addModifierObservers(this, "arrayModifiersDidChange");
      content.forEach(function(item) {
        if(arrayModifier.get("addObserverToAll") || arrangedContent.contains(item)) {
          Ember.removeObserver(item, arrayModifier.get("property"), this, "contentItemPropertyDidChange");
        }
      }, this);
      this.addArrayModifierToGroup(arrayModifier);
    }, this);
    EmberTimerUtils.addToQue(this.get("unique_id")+"__ArrayModifierChanged", 250).then(function() {
      that.notifyPropertyChange("arrangedContent");
    });
  },

  addObserversToItemsPerModifier : function(override, arranged, propKey) {
    var arrayModifiers = this.get("arrayModifiers");
    arrayModifiers.forEach(function(arrayModifier) {
      this.addObserversToItems(arrayModifier, override, arranged, propKey);
    }, this);
  },

  addObserversToItems : function(arrayModifier, override, arranged, propKey) {
    var content = override || this.get("content") || Ember.A([]), arrangedContent = arranged || this.get("arrangedContent"),
        _propKey = propKey || "property";
    content.forEach(function(item) {
      if(arrayModifier.get("addObserverToAll") || arrangedContent.contains(item)) {
        Ember.addObserver(item, arrayModifier.get(_propKey), this, "contentItemPropertyDidChange");
      }
    }, this);
  },

  removeObserversFromItemsPerModifier : function(override, arranged, propKey) {
    var arrayModifiers = this.get("arrayModifiers");
    arrayModifiers.forEach(function(arrayModifier) {
      this.removeObserversFromItems(arrayModifier, override, arranged, propKey);
    }, this);
  },

  removeObserversFromItems : function(arrayModifier, override, arranged, propKey) {
    var content = override || this.get("content") || Ember.A([]), arrangedContent = arranged || this.get("arrangedContent"),
        _propKey = propKey || "property";
    content.forEach(function(item) {
      if(arrayModifier.get("addObserverToAll") || arrangedContent.contains(item)) {
        Ember.removeObserver(item, arrayModifier.get(_propKey), this, "contentItemPropertyDidChange");
      }
    }, this);
  },

  arrayModifiersDidChange : function(obj, key) {
    var that = this, lastVal = obj.get("_" + key);
    if(key === "property" && lastVal) {
      this.removeObserversFromItems(obj, null, null, "_" + key); 
    }
    EmberTimerUtils.addToQue(this.get("unique_id")+"__ArrayModifierChanged", 250).then(function() {
      that.notifyPropertyChange("arrangedContent");
    });
  },

  arrayModifiersDidChange_each : function(/*obj, key*/) {
    var that = this;
    EmberTimerUtils.addToQue(this.get("unique_id")+"__ArrayModifierChanged_Each", 500).then(function() {
      var content = that.get("content"), arrangedContent = that.get("arrangedContent"),
          arrayModifierGrps = that.get("arrayModifierGrps");
      //enclose the operation in a run loop to decrease the view render overhead
      Ember.run(function() {
        content.forEach(function(item) {
          var inArrangedContent = arrangedContent.contains(item),
              canAdd = true;
          arrayModifierGrps.forEach(function(arrayModifierGrp) {
            if(!arrayModifierGrp.canAdd(item)) {
              canAdd = false;
            }
          }, this);
          if(inArrangedContent && !canAdd) {
            arrangedContent.removeObject(item);
          }
          else if(!inArrangedContent && canAdd) {
            //need break functionality, so using for
            for(var j = 0; j < arrayModifierGrps.length; j++) {
              if(!arrayModifierGrps[j].modifySingle(arrangedContent, item, arrangedContent.indexOf(item))) {
                break;
              }
            }
          }
        }, this);
      });
    });
  },

  destroy : function() {
    this.removeObserversFromItemsPerModifier();
    return this._super();
  },

  arrangedContent : Ember.computed("content", function() {
    var content = this.get("content"), arrangedContent,
        arrayModifierGrps = this.get("arrayModifierGrps"),
        isModified = !!arrayModifierGrps && arrayModifierGrps.length > 0,
        hasContent = content && (content.length > 0 || (content.get && content.get("length") > 0));

    if(hasContent) {
      content.forEach(function(item, idx) {
        item.set("_originalIndex", idx);
      });
      arrangedContent = Ember.A(content.slice());
      if(isModified) {
        arrayModifierGrps.forEach(function(arrayModifierGrp) {
          if(arrangedContent.length > 0) {
            arrangedContent = arrayModifierGrp.modify(arrangedContent);
          }
        }, this);
        this.addObserversToItemsPerModifier(content, arrangedContent);
      }
      return Ember.A(arrangedContent);
    }

    return Ember.A([]);
  }),

  _contentWillChange : Ember.beforeObserver("content", function() {
    this.removeObserversFromItemsPerModifier();
    this._super();
  }),

  contentArrayWillChange : function(array, idx, removedCount/*, addedCount*/) {
    var isModified = this.get("isModified");
    if(isModified) {
      var arrangedContent = this.get("arrangedContent"),
          removedObjects = array.slice(idx, idx+removedCount);
      this.removeObserversFromItemsPerModifier(removedObjects);
      removedObjects.forEach(function(item) {
        item.set("_originalIndex", -1);
        arrangedContent.removeObject(item);
      });
    }
  },

  contentArrayDidChange : function(array, idx, removedCount, addedCount) {
    var isModified = this.get("isModified");
    if(isModified) {
      var arrangedContent = this.get("arrangedContent"),
          addedObjects = array.slice(idx, idx+addedCount),
          arrayModifierGrps = this.get("arrayModifierGrps");
      this.addObserversToItemsPerModifier(addedObjects);
      //TODO : handle this in a better way than looping through the whole array
      for(var i = idx + 1; i < array.length; i++) {
        array[i].set("_originalIndex", i);
      }
      addedObjects.forEach(function(item, i) {
        item.set("_originalIndex", i + idx);
        for(var j = 0; j < arrayModifierGrps.length; j++) {
          if(!arrayModifierGrps[j].modifySingle(arrangedContent, item, arrangedContent.indexOf(item))) {
            break;
          }
        }
      });
    }
  },

  contentItemPropertyDidChange : function(item) {
    var arrayModifierGrps = this.get("arrayModifierGrps"),
        arrangedContent = this.get("arrangedContent");
    for(var i = 0; i < arrayModifierGrps.length; i++) {
      if(!arrayModifierGrps[i].modifySingle(arrangedContent, item, arrangedContent.indexOf(item))) {
        break;
      }
    }
  },
});
