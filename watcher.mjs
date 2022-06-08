import chokidar from 'chokidar';
import { exec } from 'child_process';

// Initialize watcher.
const watcher = chokidar.watch('packages', {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
    ignoreInitial: true,
  });
  
// Something to use when events are received.
const log = console.log.bind(console);
// Add event listeners.
watcher
.on('add', path => log(`File ${path} has been added`))
.on('change', path => {
        log(`File ${path} has been changed`);
        let dir = path.substring(0,path.lastIndexOf("\/")+1);
        log(`${dir}`);
        // exec(`${dir}yarn build`);
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
.on('unlink', path => log(`File ${path} has been removed`));

console.log("Chokidar watcher is running")