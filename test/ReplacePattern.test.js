/**
 * Created by ssehacker on 2016/10/17.
 */
import assert from 'assert';
import {Readable, Duplex, Writable} from 'stream';
import ReplacePattern from '../lib/ReplacePattern';

describe('ReplacePattern test', () => {
  describe('#createInstance()', () => {
    it('create instance', () => {
      let pattern = ReplacePattern.createInstance({});
      assert.equal(pattern instanceof ReplacePattern, true);
    });
  });

  describe('#_transform', () => {
    it('replace pattern', (done) => {
      let pattern = ReplacePattern.createInstance({name: 'zhouyong'});
      let initStr = '{name} test....';

      let rs = new Readable();
      rs.push(initStr);
      rs.push(null);

      let ws = new Writable();
      let stash = '';
      ws._write = function (chunk, enc, next) {
        stash += chunk && chunk.toString() || '';
        next && next();
      };

      rs
        .pipe(pattern)
        .pipe(ws)
        .on('finish', function () {
          if(stash === initStr.replace(/\{name\}/g, 'zhouyong')) {
            done();
          }
        })

    })
  })
});
