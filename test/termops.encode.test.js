var termops = require('../lib/util/termops');
var token = require('../lib/util/token');
var test = require('tape');

test('termops.encodeTerm', function(assert) {
    assert.deepEqual(termops.encodeTerm('main'), 3935363584, 'encodes term');
    assert.deepEqual(termops.encodeTerm('{"type":"range","min":539,"max":550}'), 147639638784 + 1, 'encodes dataterm with weight 1');
    assert.end();
});

test('termops.encodeData, termops.decodeData', function(assert) {
    var data = { type: 'range', min: 539, max: 550 };
    var encoded = 147639638784;
    assert.deepEqual(termops.encodeData(data), encoded, 'encodes');
    assert.deepEqual(termops.decodeData(encoded), data, 'decodes');

    data = { type: 'invalid' };
    assert.throws(function() { termops.encodeData(data); }, /Unknown type invalid/, 'validates type');

    data = { type: 'range', min:-1 };
    assert.throws(function() { termops.encodeData(data); }, /Range min must be between 0-1048575/, 'validates min');

    data = { type: 'range', min:1048576 };
    assert.throws(function() { termops.encodeData(data); }, /Range min must be between 0-1048575/, 'validates min');

    data = { type: 'range', min:0, max:-1 };
    assert.throws(function() { termops.encodeData(data); }, /Range max must be between 0-1048575/, 'validates max');

    data = { type: 'range', min:0, max:1048576 };
    assert.throws(function() { termops.encodeData(data); }, /Range max must be between 0-1048575/, 'validates max');

    assert.end();
});

