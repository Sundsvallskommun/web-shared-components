import chokidar from 'chokidar';
import { exec } from 'child_process';

// Package: https://www.npmjs.com/package/chokidar

// Initialize watcher.
const watcher = chokidar.watch('**/*.ts, **/*.tsx', {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
    ignoreInitial: true,
    cwd: '.',
    ignored: ['**/node_modules/**'],
  });
  
// Something to use when events are received.
const log = console.log.bind(console);
// Add event listeners.
watcher
.on('change', filePath => {
    log(`File ${filePath} has been changed`);
    let dir = filePath.substring(0,filePath.lastIndexOf("\/")+1);
    log(`..running yarn --cwd ./${dir} build`);
    exec(`yarn --cwd ./${dir} build`, (error, stdout, stderr) => {
      if (error) {
        console.error(`error: ${error.message}`);
        return;
      }
    
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
    
      console.log(`stdout:\n${stdout}`);
    });
})

console.log("Chokidar watcher is running")