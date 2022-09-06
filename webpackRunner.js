const { spawn } = require('child_process');
const child = spawn('./node_modules/.bin/webpack', ['--mode=development', '--watch']);

if (child.error) {
  console.log('error', child.error);
} else {
  console.log(`A webpack process has been spawned for building the client's 
\`bundle.js\` file. It will stay running, watching for  
modifications to files in the \`client\` folder. When a  
modification is detected, it will initiate another build and 
place the resulting \`bundle.js\` in the \`public\` folder. 
Its PID is ${child.pid}. If you wish to kill it, execute 
in the Shell pane: \`kill ${child.pid}\` or press \`Ctrl+C\`
in the Console pane.
  
You'll soon see some console output below as the first build 
completes. (The first build takes about 10 seconds. Subsequent 
builds are typically sub-second.)

Try changing the "Hello from React component!" text in 
\`/client/index.js\`. After you save your change, you'll see 
in the Console that a webpack build has been triggered. You 
should then see your change reflected in the web view. A click
of the web view's refresh icon is necessary if the build took 
more than about a second.

The Express HTTP server currently exists in this project solely 
for the purpose of serving static assets from the \`public\` 
folder, but its ready for you to add any backend services your 
React client may need.
`);
}

// Log the child process' stdout and stderr output to the console
// https://stackoverflow.com/q/14332721

child.stdout.setEncoding('utf8');
child.stdout.on('data', function(data) {
  console.log(`
-----------------
  webpack build
-----------------
${data}
`);
});
child.stderr.setEncoding('utf8');
child.stderr.on('data', function(data) {
  console.log('webpack stderr: ' + data);
});
child.on('close', function(exitCode, signal) {
  console.log('The webpack watch process has closed');
  if (exitCode) {
    console.log("It's exit code was %s", exitCode);
  }
  if (signal) {
    console.log("It had received signal %s", signal);
  }
});
