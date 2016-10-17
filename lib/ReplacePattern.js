/**
 * Created by ssehacker on 2016/10/14.
 */
import stream from 'stream';
import format from 'string-template';

class ReplacePattern extends stream.Transform{
  constructor(pattern){
    super(pattern);
    this.pattern = Object.assign({}, pattern);
  }
  
  _transform(chunk, enc, cb) {
    var upperChunk = chunk.toString();
    upperChunk = format(upperChunk, this.pattern);
    this.push(upperChunk);
    cb();
  }
  
  static createInstance(pattern) {
    return new ReplacePattern(pattern);
  }
}
export default ReplacePattern;
