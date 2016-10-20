/**
 * Created by ssehacker on 2016/10/17.
 */
import assert from 'assert';
import {Readable, Duplex} from 'stream';
import ReplacePattern from '../lib/ReplacePattern';

describe('ReplacePattern test', () => {
  describe('#createInstance()', () => {
    it('create instance', () => {
      let pattern = ReplacePattern.createInstance({});
      assert.equal(pattern instanceof ReplacePattern, true);
    });
  });

  describe('#_transform', () => {
    it('replace pattern', () => {
      let pattern = ReplacePattern.createInstance({name: 'zhouyong'});

      pattern.pipe(process.stdout);

      setTimeout(() => {
        pattern.write('{name} test....');
        pattern.end();
        pattern.write('after end method: {name}');
      });
      pattern.write('hello {name}');

    })
  })
});
