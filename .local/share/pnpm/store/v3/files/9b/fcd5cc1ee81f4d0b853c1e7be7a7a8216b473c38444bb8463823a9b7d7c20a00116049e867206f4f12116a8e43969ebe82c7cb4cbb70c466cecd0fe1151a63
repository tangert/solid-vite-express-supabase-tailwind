"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  vaviteConnect: () => vaviteConnect
});
module.exports = __toCommonJS(src_exports);
var import_node_path = __toESM(require("path"), 1);
var import_node_url = __toESM(require("url"), 1);
var import_meta = {};
var dirname = typeof __dirname === "undefined" ? import_node_url.default.fileURLToPath(new URL(".", import_meta.url)) : __dirname;
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
          return import_node_path.default.resolve(
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
              const module2 = await server.ssrLoadModule(handlerEntry);
              await module2.default(req, res, () => {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  vaviteConnect
});
