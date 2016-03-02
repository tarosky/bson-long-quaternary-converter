(function () {
  'use strict';

  var its = function(fn) {
    it(fn.toString(), fn);
  };

  var bson = require('bson');
  var blqc = require('../bson-long-quaternary-converter.js');

  var NumberLong = bson.Long.fromString;
  var bsonLongToQuaternary = blqc.bsonLongToQuaternary;
  var quaternaryToBsonLong = blqc.quaternaryToBsonLong;

  describe("test/util/bitmap-helper", function() {
    var ex = [
      '22322_22222 00000_00000 00000_00000 00000_00000 00000_00000',
      '00000_00003 22000_00000 02223_22222 22000_00000 00000_00000',
      '00000_00000 00000_00000 00000_00000 00000_00000 00000_00000',
      '00000_00000 00000_00000 00000_00000 00000_00000 00000_00000',
      '00000_00000 00000_00000 00000_00000 00000_00000 00300_00000',
      '00000_0'
    ];

    var d = [
      NumberLong("-5860696043208835072"), 928, NumberLong("754997805449216"),
      0, 0, 0, 0, 201326592
    ];

    describe("quaternaryToBsonLong", function() {
      var strs = function(ls) {
        return ls.map(function(l) {
          return l.toString();
        });
      };

      its(function() {
        expect(strs(quaternaryToBsonLong(ex))).toEqual(strs(d));
      });
    });

    describe("bsonLongToQuaternary", function() {
      its(function() {
        expect(bsonLongToQuaternary(d)).toEqual(ex);
      });
      its(function() {
        expect(bsonLongToQuaternary([])).toEqual([]);
      });
    });
  });
}());
