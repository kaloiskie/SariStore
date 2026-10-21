module.exports = {
  apps: [
    {
      name: 'saristore-api-dev',
      script: 'node_modules/tsx/dist/cli.mjs',
      args: 'apps/api/src/server.ts',
      interpreter: 'node',
      env: {
        NODE_ENV: 'development',
        SARISTORE_HOST: process.env.SARISTORE_TAILSCALE_IP || '127.0.0.1',
        SARISTORE_API_PORT: process.env.SARISTORE_API_PORT || '4300',
        SARISTORE_DATABASE_PATH: process.env.SARISTORE_DATABASE_PATH || './data/saristore.sqlite'
      }
    },
    {
      name: 'saristore-web-dev',
      script: 'node_modules/next/dist/bin/next',
      args: 'dev apps/web',
      env: {
        NODE_ENV: 'development',
        HOSTNAME: process.env.SARISTORE_TAILSCALE_IP || '127.0.0.1',
        PORT: process.env.SARISTORE_WEB_PORT || '4301'
      }
    }
  ]
};
