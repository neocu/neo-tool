/**
 * Created by ssehacker on 2016/10/13.
 */
import program from 'commander';
import fs from 'fs-extra';
import path from 'path';
import pkg from '../package.json';
import ReplacePattern from './ReplacePattern';

program
  .version(pkg.version)
  .usage('<command> [options]');

// create pages.
program
  .command('page [name]').alias('p')
  .description('create new page')
  .action(async (name)=> {
    let isNeoProject = checkFolderStruct();
    if(!isNeoProject){
      console.error('Error: could not create page since it\'s not a NEO project.');
      return;
    }

    createParentDir(name, 'page');
    copyTemplate(name, 'page');

  });

// create component.
program
  .command('component [name]').alias('c')
  .description('create new component')
  .action(async (name)=> {
    let isNeoProject = checkFolderStruct();
    if(!isNeoProject){
      console.error('Error: could not create page since it\'s not a NEO project.');
      return;
    }
    createParentDir(name, 'component');
    copyTemplate(name, 'component');

  });

// init project
program
  .command('init [name]').alias('i')
  .description('init new project')
  .action(async (name) => {
    // 判断当前路径下是否已经存在文件夹为<name>
    let dir = path.resolve(name);
    const exist = fs.existsSync(dir);
    if (exist) {
      console.error(`Error: folder was existed: ${dir}`);
      return;
    }
    let moduleName = `${name.substring(0,1).toUpperCase()}${name.substring(1)}`;
    let pattern = {
      name,
      moduleName,
    };
    let baseUrl = path.resolve(__dirname, '../');
    const from = path.resolve(baseUrl, 'template', 'init');
    copyFile(from, dir, pattern);

    console.log('init completed!');
    /*fs.copy(from, dir, err => {
      if (err) return console.error(err);
      console.log('init project success.');
    });*/
  });

//remove page
program
  .command('rm [page]')
  .description('remove page')
  .action((page) => {
    console.log(`remove page: ${page}`);
  });

program.parse(process.argv);

async function createParentDir(name, type){
  let dirName = 'pages';
  if (type === 'page') {
    dirName = 'pages';
  } else {
    dirName = 'components';
  }
  await new Promise((resolve, reject) => {

    let dir = path.resolve('src',dirName, name);
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

function copyTemplate(name, type){

  let dir = 'pages';
  if (type === 'page') {
    dir = 'pages';
  } else {
    dir = 'components';
  }

  let className = `${name.substring(0,1).toUpperCase()}${name.substring(1)}`;
  let pattern = {
    name,
    className,
  };
  let baseUrl = path.resolve(__dirname, '../');
  console.log(baseUrl);

  try{
    let indexOriginalPath = path.resolve(baseUrl, 'template', dir, 'index_js');
    let indexSavePath = path.resolve('./src', dir, name, 'index.js');
    copyFile(indexOriginalPath, indexSavePath, pattern, () => {
      console.log('create file index.js');
    });

    let classOriginalPath = path.resolve(baseUrl, 'template', dir, 'Demo_js');
    let classSavePath = path.resolve('./src', dir, name, className+'.js');
    copyFile(classOriginalPath, classSavePath, pattern, () => {
      console.log(`create file ${className}.js`);
    });

    let cssOriginalPath = path.resolve(baseUrl, 'template', dir, 'Demo_less');
    let cssSavePath = path.resolve('./src', dir, name, className+'.less');
    copyFile(cssOriginalPath, cssSavePath, pattern, () => {
      console.log(`create file ${className}.less`);
    });
  }catch(e){
    console.error(e);
  }
  
}

function copyFile(from, to, pattern, callback) {
  try {
    let filename = path.parse(from).name;
    if (fs.statSync(from).isDirectory()) {
      if (!fs.existsSync(to)) {
        fs.mkdirSync(path.resolve(to));
      }
      var files = fs.readdirSync(from);
      for(var i=0; i<files.length; i++ ) {
        copyFile(path.resolve(from, files[i]), path.resolve(to, files[i]), pattern, callback);
      }
    } else {
      let rs = fs.createReadStream(from);
      let ws = fs.createWriteStream(to);
      rs.pipe(ReplacePattern.createInstance(pattern)).pipe(ws);
      // rs.on('end', function() {
      //   callback && callback(from, to);
      // });
    }
  } catch (e) {
    console.dir(e);
  }

}

/*function copyFile(from, to, pattern, callback){
  let original = fs.createReadStream(from);
  let transferred = fs.createWriteStream(to);
  original
    .pipe(pattern)
    .pipe(transferred)
    .on('finish', () => {
      callback && callback();
    });
}*/

function checkFolderStruct(){
  let srcExist = fs.existsSync('./src');
  let pagesDirExist = fs.existsSync('./src/pages');
  let componentDirExist = fs.existsSync('./src/components');
  return srcExist && pagesDirExist && componentDirExist;
}

export default () => ('hello');
