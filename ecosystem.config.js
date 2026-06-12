require('dotenv').config({ path: '.env' });

module.exports = {
  apps: [
    {
      name: process.env.CONTAINER_NAME,
      // Serves both the static styleguide and the MCP endpoint at /mcp.
      // Requires the manifest to be generated first (yarn mcp:manifest).
      script: 'mcp-server/server.mjs',
      cwd: '.',
      exec_mode: 'fork',
      autorestart: true,
      windowsHide: true,
      env: {
        NODE_ENV: 'production',
        PORT: process.env.PORT,
      },
    },
  ],
};
