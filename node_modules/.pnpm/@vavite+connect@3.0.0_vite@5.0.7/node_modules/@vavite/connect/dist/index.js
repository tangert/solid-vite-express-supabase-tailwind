// src/index.ts
import path from "node:path";
import url from "node:url";
var dirname = typeof __dirname === "undefined" ? url.fileURLToPath(new URL(".", import.meta.url)) : __dirname;
function vaviteConnect(options = {}) {
  const {
    handlerEntry = "/handler",
    customServerEntry,
    serveClientAssetsInDev = false,
    standalone = true,
    clientAssetsDir = null,
    bundleSirv = true
  } = options;
  return [
    {
      name: "@vavite/connect:resolve",
      enforce: "pre",
      async resolveId(id) {
        if (id === "/virtual:vavite-connect-handler") {
          return this.resolve(handlerEntry);
        } else if (id === "/virtual:vavite-connect-server") {
          return path.resolve(
            dirname,
            clientAssetsDir ? bundleSirv ? "entry-standalone-bundled-sirv.js" : "entry-standalone-imported-sirv.js" : "entry-standalone.js"
          ).replace(/\\/g, "/");
        }
      }
    },
    {
      name: "@vavite/connect:server",
      config(config, env) {
        var _a;
        const common = {
          optimizeDeps: {
            // This silences the "could not auto-determine entry point" warning
            include: []
          }
        };
        if (env.command === "build" && ((_a = config.build) == null ? void 0 : _a.ssr)) {
          return {
            ...common,
            build: {
              rollupOptions: {
                input: {
                  index: customServerEntry || (standalone ? "/virtual:vavite-connect-server" : "/virtual:vavite-connect-handler")
                }
              }
            },
            define: clientAssetsDir ? {
              __VAVITE_CLIENT_BUILD_OUTPUT_DIR: JSON.stringify(clientAssetsDir)
            } : {}
          };
        }
        return common;
      },
      configureServer(server) {
        function addMiddleware() {
          server.middlewares.use(async (req, res) => {
            function renderError(status, message) {
              res.statusCode = status;
              res.end(message);
            }
            req.url = req.originalUrl || req.url;
            try {
              const module = await server.ssrLoadModule(handlerEntry);
              await module.default(req, res, () => {
                if (!res.writableEnded)
                  renderError(404, "Not found");
              });
            } catch (err) {
              if (err instanceof Error) {
                server.ssrFixStacktrace(err);
                renderError(500, err.stack || err.message);
              } else {
                renderError(500, "Unknown error");
              }
            }
          });
        }
        if (serveClientAssetsInDev) {
          return addMiddleware;
        } else {
          addMiddleware();
        }
      }
    }
  ];
}
export {
  vaviteConnect
};
