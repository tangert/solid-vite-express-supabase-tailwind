// src/plugin.ts
var hasLoader = global.__vavite_loader__;
function nodeLoaderPlugin() {
  return {
    name: "@vavite/node-loader",
    enforce: "pre",
    apply: "serve",
    config() {
      if (hasLoader) {
        return {
          experimental: {
            skipSsrTransform: true
          }
        };
      }
    },
    configResolved(config) {
      if (!hasLoader) {
        config.logger.warn(
          "@vavite/node-loader/plugin: @vavite/node-loader is not enabled. Please run with `node --experimental-loader=@vavite/node-loader`."
        );
      }
    },
    configureServer(server) {
      if (hasLoader) {
        global.__vite_dev_server__ = server;
        server.ssrLoadModule = (id) => import(id + "?ssrLoadModuleEntry");
        server.ssrFixStacktrace = () => {
        };
        server.ssrRewriteStacktrace = (s) => s;
      }
    },
    buildEnd() {
      global.__vite_dev_server__ = void 0;
    }
  };
}
export {
  nodeLoaderPlugin
};
