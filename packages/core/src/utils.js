import {execaSync} from 'execa';
import { readdirSync, statSync } from 'node:fs';
import {fileURLToPath} from "node:url";
import {dirname} from "node:path";

const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';

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
    const subProcess = execaSync(command, options);
    subProcess.stdout.pipe(process.stdout);
    subProcess.stdout.on('close', resolve);
    subProcess.stdout.on('error', reject);
  });
}



function hasYarn() {
  try {
    execaSync('yarn -v', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}
function hasPnpm() {
  try {
    execaSync('pnpm -v', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

function validTool(tool) {
  if (tool === 'yarn') {
    return hasYarn() ? tool : false
  }
  if (tool === 'pnpm') {
    return hasPnpm() ? tool : false
  }
  return npm;
}

function getDirname() {
  const filename = fileURLToPath(import.meta.url);
  return dirname(filename);
}

export { getDirname, recursiveDir, exec, hasYarn, hasPnpm, validTool };
