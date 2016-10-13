/**
 * Created by ssehacker on 2016/10/13.
 */
// 支持ES6 语法
import assert from 'assert';

describe('Demo test', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', () => {
      assert.equal(-1, [1, 2, 3].indexOf(4));
    });
  });
});
