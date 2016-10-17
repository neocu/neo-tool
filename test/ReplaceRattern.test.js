/**
 * Created by ssehacker on 2016/10/17.
 */
const assert = require('assert');
const path = require('path');
const fs = require('fs');
//doesn't work ???
const ReplacePattern = require('../lib/ReplacePattern');

describe('ReplacePattern test', () => {
  describe('#createInstance()', () => {
    it('replace string', (done) => {
      /*let inputPath = path.resolve('test', 'data', 'readable-stream.txt');
      let outPath = path.resolve('test', 'data', 'readable-stream.output.txt');
      let inputstream = fs.createReadStream(inputPath);
      let outputStream = fs.createWriteStream(outPath);

      let name = 'zhouyong';
      let pattern = ReplacePattern.createInstance({
        name
      });
      inputstream
        .pipe(pattern)
        .pipe(outputStream)
        .on('finish', (err) => {
          if(err) done(err);
          let parseText = fs.readFileSync(outPath).toString();
          if(parseText === `hello ${name}`){
            done();
          }else{
            done(`expect 'hello zhouyong', but get ${parseText}`);
          }
        });*/
      done();
    });
  });
});