import {execa} from 'execa';
import { readdirSync, statSync } from 'node:fs';

/*interface FileItem {
  file: string;
  isDir: boolean;
}*/

function recursiveDir(sourceDir) {
  const res= [];
  function traverse(dir) {
    readdirSync(dir).forEach((file) => {
      const pathname = `${dir}/${file}`; // temp/.gitignore
      const isDir = statSync(pathname).isDirectory();
      res.push({ file: pathname, isDir });
      if (isDir) {
        traverse(pathname);
      }
    })
  }
  traverse(sourceDir);
  return res;
}


function exec(command, options) {
  return new Promise((resolve, reject) => {
    const subProcess = execa.command(command, options);
    subProcess.stdout.pipe(process.stdout);
    subProcess.stdout.on('close', resolve);
    subProcess.stdout.on('error', reject);
  });
}


function hasYarn() {
  try {
    execa.commandSync('yarn -v', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}
function hasPnpm() {
  try {
    execa.commandSync('pnpm -v', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

export { recursiveDir, exec, hasYarn, hasPnpm };
