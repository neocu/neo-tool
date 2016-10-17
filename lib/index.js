/**
 * Created by ssehacker on 2016/10/13.
 */
import program from 'commander';
import fs from 'fs';
import path from 'path';
import pkg from '../package.json';
import ReplacePattern from './ReplacePattern';

program
  .version(pkg.version)
  .usage('<command> [options]');

// create pages.
program
  .command('page [name]').alias('p')
  .description('Create new page')
  .action(async (name)=> {

    createPageDir(name);
    copyPage(name);

  });

//remove page
program
  .command('rm [page]')
  .description('Remove page')
  .action((page) => {
    console.log(`remove page: ${page}`);
  });

program.parse(process.argv);

async function createPageDir(name){
  await new Promise((resolve, reject) => {
    let dir = path.resolve('src','pages', name);
    fs.mkdir(dir, (err)=> {
      if(err) {
        console.error(`Can't create directory:${dir}\n`, err);
        process.exit(1);
      }else{
        resolve();
      }
    });
  });
}

function copyPage(name){
  let className = `${name.substring(0,1).toUpperCase()}${name.substring(1)}`;
  let pattern = {
    name,
    className,
  };
  let baseUrl = path.resolve(__dirname, '../');
  console.log(baseUrl);

  try{
    let indexOriginalPath = path.resolve(baseUrl, 'template/pages/index_js');
    let indexSavePath = path.resolve('./src/pages',name, 'index.js');
    copyFile(indexOriginalPath, indexSavePath, ReplacePattern.createInstance(pattern), () => {
      console.log('create file index.js');
    });

    let classOriginalPath = path.resolve(baseUrl, 'template/pages/Demo_js');
    let classSavePath = path.resolve('./src/pages',name, className+'.js');
    copyFile(classOriginalPath, classSavePath, ReplacePattern.createInstance(pattern), () => {
      console.log(`create file ${className}.js`);
    });

    let cssOriginalPath = path.resolve(baseUrl, 'template/pages/Demo_less');
    let cssSavePath = path.resolve('./src/pages',name, className+'.less');
    copyFile(cssOriginalPath, cssSavePath, ReplacePattern.createInstance(pattern), () => {
      console.log(`create file ${className}.less`);
    });
  }catch(e){
    console.error(e);
  }
  
}

function copyFile(from, to, pattern, callback){
  let original = fs.createReadStream(from);
  let transferred = fs.createWriteStream(to);
  original
    .pipe(pattern)
    .pipe(transferred)
    .on('finish', () => {
      callback && callback();
    });
}

export const getHello = () => ('hello');
