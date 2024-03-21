"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/plugin.ts
var plugin_exports = {};
__export(plugin_exports, {
  nodeLoaderPlugin: () => nodeLoaderPlugin
});
module.exports = __toCommonJS(plugin_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  nodeLoaderPlugin
});
