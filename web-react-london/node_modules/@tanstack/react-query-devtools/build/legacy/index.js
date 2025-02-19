"use client";

// src/index.ts
import * as devtools from "./devtools.js";
var ReactQueryDevtools2 = process.env.NODE_ENV !== "development" ? function() {
  return null;
} : devtools.ReactQueryDevtools;
export {
  ReactQueryDevtools2 as ReactQueryDevtools
};
//# sourceMappingURL=index.js.map