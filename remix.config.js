/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
module.exports = {
  appDirectory: 'app',
  assetsBuildDirectory: 'public/build',
  devServerPort: 8002,
  ignoredRouteFiles: ['.*'],
  publicPath: '/build/',
  serverBuildDirectory: 'build',
  future: {
    v2_routeConvention: true,
  },
};
