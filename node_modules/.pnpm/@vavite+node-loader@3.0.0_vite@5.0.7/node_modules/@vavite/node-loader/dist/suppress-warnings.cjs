"use strict";

// src/suppress-warnings.ts
var ignoreWarnings = /* @__PURE__ */ new Set([
  "--experimental-loader is an experimental feature. This feature could change at any time",
  "Custom ESM Loaders is an experimental feature. This feature could change at any time",
  "Custom ESM Loaders is an experimental feature and might change at any time"
]);
var { emit } = process;
process.emit = function(event, warning) {
  if (event === "warning" && ignoreWarnings.has(warning.message)) {
    return;
  }
  return Reflect.apply(emit, this, arguments);
};
