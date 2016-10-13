/**
 * Created by ssehacker on 2016/10/13.
 */
// 支持ES6 语法
const assert = require('assert');
// import assert from 'assert';
const test = require('../lib');

describe('Demo test', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', () => {
      assert.equal(test(), 'hello');
    });
  });
});
