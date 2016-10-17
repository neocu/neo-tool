/**
 * Created by ssehacker on 2016/10/13.
 */
// 支持ES6 语法
const assert = require('assert');
// import assert from 'assert';
const neo = require('../lib');

describe('Demo test', () => {
  describe('#getHello()', () => {
    it('should return hello', () => {
      assert.equal(neo.getHello(), 'hello');
    });
  });
});
