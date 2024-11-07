require('dotenv').config({ path: '.env' });

module.exports = {
  apps: [
    {
      name: process.env.CONTAINER_NAME,
      script: 'npx',
      args: ['http-server', 'storybook-static/', '-p', process.env.PORT],
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
