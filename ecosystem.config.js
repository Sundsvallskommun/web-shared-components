require('dotenv').config({ path: '.env' });

module.exports = {
  apps: [
    {
      name: process.env.CONTAINER_NAME,
      script: 'storybook:prod', // Directly specify the yarn script
      interpreter: 'yarn', // Use yarn as the interpreter
      args: ['-p', process.env.PORT], // Pass the port as an argument
      cwd: '.',
      exec_mode: 'fork',
      autorestart: true,
      windowsHide: true,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
