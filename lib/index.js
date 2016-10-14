/**
 * Created by ssehacker on 2016/10/13.
 */
import program from 'commander';
import format from 'string-template';
import fs from 'fs';
import path from 'path';
import pkg from '../package.json';

program
  .version(pkg.version)
  .usage('<command> [options]');

// create pages.
program
  .command('page [name]').alias('p')
  .description('Create new page')
  .action(async (name)=> {

    //todo: operator replace with stream;
    await new Promise((resolve, reject) => {
      let dir = path.resolve('./src/page/', name);
      fs.mkdir(dir, (err)=> {
        if(err) {
          console.error(`Can't create directory:${dir}\n`, err);
          process.exit(1);
        }else{
          resolve();
        }
      });
    });

    let transferredString = await new Promise( (resolve, reject) => {
      let filePath = path.resolve('./node_modules/neo-tool','template/page/index.js');
      fs.readFile(filePath, (err, data)=> {
        if(err) {
          console.error(`Can't read file:${filePath}\n`, err);
          process.exit(1);
        }else{
          let generatedTmpl = format(data.toString(), {
            name,
          });
          resolve(generatedTmpl.toString());
        }
      });
    });

    await new Promise((resolve, reject) => {
      fs.writeFile(
        path.resolve('./src/page',name, name+'.js'),
        transferredString.toString(),
        {flag: 'w+'},
        (err) => {
          if(err) {
            console.error(err);
            process.exit(1);
          }else{
            resolve();
          }
        }
      );
    });

  });

//remove page
program
  .command('rm [page]')
  .description('Remove page')
  .action((page) => {
    console.log(`remove page: ${page}`);
  });

program.parse(process.argv);

export const getHello = () => ('hello');
