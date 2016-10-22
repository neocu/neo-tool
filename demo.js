/**
 * Created by ssehacker on 2016/10/22.
 */
'use strict';
const stream = require('stream');

class MyWriteStream extends stream.Writable {
  constructor(props){
    super(props);
    this.stash ='';
  }
  _write(chunk, enc, callback) {
    console.log('==',chunk.toString());
    this.stash += chunk && chunk.toString();
    callback && callback();
  }
}

process.stdin.on('readable', function(){
  let a = process.stdin.read(3);
  console.dir(a);
  // process.stdin.read(0);
  // console.log('==', b);
});

