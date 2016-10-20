/**
 * Created by ssehacker on 2016/10/13.
 */
// 支持ES6 语法
import assert from 'assert';
import neo from '../lib';

describe('Demo test', () => {
  describe('#getHello()', () => {
    it('should return hello', () => {
      assert.equal(neo(), 'hello');
    });
  });
});
