(function () {
  'use strict';

  var radixConverter = require('radix-converter');
  var bson = require('bson');

  var bsonLongToQuaternary = function(longs) {
    var mapstr = longs.map(function(l) {
      return radixConverter.fillZeroes(
        radixConverter.fromBin(
          radixConverter.toBin(l.toString(), 10, 64),
          4,
          64,
          false
        ),
        32
      );
    }).join('');

    return (mapstr.match(/.{1,50}/g) || []).map(function(s) {
      return s.match(/.{1,10}/g).map(function(s2) {
        return s2.match(/.{1,5}/g).join('_');
      }).join(' ');
    });
  };

  var quaternaryToBsonLong = function(strs) {
    return strs.map(function(s) {
      return s.split('_').join('').split(' ').join('');
    }).join('').match(/.{1,32}/g).map(function(s) {
      return bson.Long.fromString(radixConverter.fromBin(
        radixConverter.toBin(s, 4, 64),
        10,
        64,
        true
      ), 10);
    });
  };

  module.exports = {
    quaternaryToBsonLong: quaternaryToBsonLong,
    bsonLongToQuaternary: bsonLongToQuaternary,
  };
}());
