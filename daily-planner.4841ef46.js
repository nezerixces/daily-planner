// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (
  modules,
  entry,
  mainEntry,
  parcelRequireName,
  externals,
  distDir,
  publicUrl,
  devServer
) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var importMap = previousRequire.i || {};
  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        if (externals[name]) {
          return externals[name];
        }
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      if (res === false) {
        return {};
      }
      // Synthesize a module to follow re-exports.
      if (Array.isArray(res)) {
        var m = {__esModule: true};
        res.forEach(function (v) {
          var key = v[0];
          var id = v[1];
          var exp = v[2] || v[0];
          var x = newRequire(id);
          if (key === '*') {
            Object.keys(x).forEach(function (key) {
              if (
                key === 'default' ||
                key === '__esModule' ||
                Object.prototype.hasOwnProperty.call(m, key)
              ) {
                return;
              }

              Object.defineProperty(m, key, {
                enumerable: true,
                get: function () {
                  return x[key];
                },
              });
            });
          } else if (exp === '*') {
            Object.defineProperty(m, key, {
              enumerable: true,
              value: x,
            });
          } else {
            Object.defineProperty(m, key, {
              enumerable: true,
              get: function () {
                if (exp === 'default') {
                  return x.__esModule ? x.default : x;
                }
                return x[exp];
              },
            });
          }
        });
        return m;
      }
      return newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.require = nodeRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.distDir = distDir;
  newRequire.publicUrl = publicUrl;
  newRequire.devServer = devServer;
  newRequire.i = importMap;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  // Only insert newRequire.load when it is actually used.
  // The code in this file is linted against ES5, so dynamic import is not allowed.
  function $parcel$resolve(url) {  url = importMap[url] || url;  return import.meta.resolve(distDir + url);}newRequire.resolve = $parcel$resolve;

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });
    }
  }
})({"huHYX":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SERVER_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "439701173a9199ea";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "1d23b73e4841ef46";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_SERVER_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_SERVER_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ , bundleNotFound = false;
function getHostname() {
    return HMR_HOST || (typeof location !== 'undefined' && location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || (typeof location !== 'undefined' ? location.port : HMR_SERVER_PORT);
}
// eslint-disable-next-line no-redeclare
let WebSocket = globalThis.WebSocket;
if (!WebSocket && typeof module.bundle.root === 'function') try {
    // eslint-disable-next-line no-global-assign
    WebSocket = module.bundle.root('ws');
} catch  {
// ignore.
}
var hostname = getHostname();
var port = getPort();
var protocol = HMR_SECURE || typeof location !== 'undefined' && location.protocol === 'https:' && ![
    'localhost',
    '127.0.0.1',
    '0.0.0.0'
].includes(hostname) ? 'wss' : 'ws';
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if (!parent || !parent.isParcelRequire) {
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        // If we're running in the dev server's node runner, listen for messages on the parent port.
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) {
            parentPort.on('message', async (message)=>{
                try {
                    await handleMessage(message);
                    parentPort.postMessage('updated');
                } catch  {
                    parentPort.postMessage('restart');
                }
            });
            // After the bundle has finished running, notify the dev server that the HMR update is complete.
            queueMicrotask(()=>parentPort.postMessage('ready'));
        }
    } catch  {
        if (typeof WebSocket !== 'undefined') try {
            ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
        } catch (err) {
            // Ignore cloudflare workers error.
            if (err.message && !err.message.includes('Disallowed operation called within global scope')) console.error(err.message);
        }
    }
    if (ws) {
        // $FlowFixMe
        ws.onmessage = async function(event /*: {data: string, ...} */ ) {
            var data /*: HMRMessage */  = JSON.parse(event.data);
            await handleMessage(data);
        };
        if (ws instanceof WebSocket) {
            ws.onerror = function(e) {
                if (e.message) console.error(e.message);
            };
            ws.onclose = function() {
                console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
            };
        }
    }
}
async function handleMessage(data /*: HMRMessage */ ) {
    checkedAssets = {} /*: {|[string]: boolean|} */ ;
    disposedAssets = {} /*: {|[string]: boolean|} */ ;
    assetsToAccept = [];
    assetsToDispose = [];
    bundleNotFound = false;
    if (data.type === 'reload') fullReload();
    else if (data.type === 'update') {
        // Remove error overlay if there is one
        if (typeof document !== 'undefined') removeErrorOverlay();
        let assets = data.assets;
        // Handle HMR Update
        let handled = assets.every((asset)=>{
            return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        });
        // Dispatch a custom event in case a bundle was not found. This might mean
        // an asset on the server changed and we should reload the page. This event
        // gives the client an opportunity to refresh without losing state
        // (e.g. via React Server Components). If e.preventDefault() is not called,
        // we will trigger a full page reload.
        if (handled && bundleNotFound && assets.some((a)=>a.envHash !== HMR_ENV_HASH) && typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') handled = !window.dispatchEvent(new CustomEvent('parcelhmrreload', {
            cancelable: true
        }));
        if (handled) {
            console.clear();
            // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
            if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
            await hmrApplyUpdates(assets);
            hmrDisposeQueue();
            // Run accept callbacks. This will also re-execute other disposed assets in topological order.
            let processedAssets = {};
            for(let i = 0; i < assetsToAccept.length; i++){
                let id = assetsToAccept[i][1];
                if (!processedAssets[id]) {
                    hmrAccept(assetsToAccept[i][0], id);
                    processedAssets[id] = true;
                }
            }
        } else fullReload();
    }
    if (data.type === 'error') {
        // Log parcel errors to console
        for (let ansiDiagnostic of data.diagnostics.ansi){
            let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
            console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
        }
        if (typeof document !== 'undefined') {
            // Render the fancy html overlay
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html);
            // $FlowFixMe
            document.body.appendChild(overlay);
        }
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="${protocol === 'wss' ? 'https' : 'http'}://${hostname}:${port}/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if (typeof location !== 'undefined' && 'reload' in location) location.reload();
    else if (typeof extCtx !== 'undefined' && extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
    else try {
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) parentPort.postMessage('restart');
    } catch (err) {
        console.error("[parcel] \u26A0\uFE0F An HMR update was not accepted. Please restart the process.");
    }
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout || typeof document === 'undefined') return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    checkedAssets = {};
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else if (a !== null) {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) {
            bundleNotFound = true;
            return true;
        }
        return hmrAcceptCheckOne(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return null;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    if (!cached) return true;
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
    return false;
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"3Aj1C":[function(require,module,exports,__globalThis) {
var _eventsJs = require("./events.js");
var _storageJs = require("./storage.js");
var _tasksJs = require("./tasks.js");
// ==========================================
// 1. ЭЛЕМЕНТЫ ИНТЕРФЕЙСА
// ==========================================
// Элементы событий
const addEventButton = document.querySelector('.add-event-button');
const todayButton = document.querySelector('.today-button');
const modal = document.querySelector('#event-modal');
const closeModalButton = document.querySelector('.close-modal');
const cancelButton = document.querySelector('.cancel-button');
const eventForm = document.querySelector('#event-form');
const dateInput = document.querySelector('#event-date');
const startInput = document.querySelector('#event-start');
const endInput = document.querySelector('#event-end');
const titleInput = document.querySelector('#event-title');
const categoryInput = document.querySelector('#event-category');
const descriptionInput = document.querySelector('#event-description');
const modalTitle = document.querySelector('.modal-header h2');
const saveButton = document.querySelector('.save-button');
const dateHeading = document.querySelector('.schedule-header h2');
const eventError = document.querySelector('#event-error');
// Элементы задач
const addTaskButton = document.querySelector('#add-task-button');
const taskForm = document.querySelector('#task-form');
const taskTitleInput = document.querySelector('#task-title');
const taskSubmitButton = document.querySelector('#task-submit-button');
const taskCancelButton = document.querySelector('#task-cancel-button');
const taskError = document.querySelector('#task-error');
const confirmModal = document.querySelector('#confirm-modal');
const confirmTitle = document.querySelector('#confirm-title');
const confirmMessage = document.querySelector('#confirm-message');
const confirmDeleteButton = document.querySelector('#confirm-delete');
const confirmCancelButton = document.querySelector('#confirm-cancel');
const confirmCloseButton = document.querySelector('#confirm-close');
let confirmCallback = null;
// ==========================================
// 2. СОСТОЯНИЕ ПРИЛОЖЕНИЯ
// ==========================================
let selectedDate = getLocalDate();
let displayedMonth = new Date(Number(selectedDate.slice(0, 4)), Number(selectedDate.slice(5, 7)) - 1, 1);
const calendarGrid = document.querySelector('.calendar-grid');
const calendarMonth = document.querySelector('#calendar-month');
const prevMonthButton = document.querySelector('#prev-month');
const nextMonthButton = document.querySelector('#next-month');
let events = (0, _storageJs.loadEvents)();
let editingEventId = null;
let tasks = (0, _tasksJs.loadTasks)();
let editingTaskId = null;
// ==========================================
// 3. РАБОТА С ДАТОЙ
// ==========================================
function getLocalDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
function updateDateHeading() {
    const [year, month, day] = selectedDate.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    dateHeading.textContent = date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    });
}
// ==========================================
// 4. ОТОБРАЖЕНИЕ СОБЫТИЙ
// ==========================================
function updateTimeline() {
    updateDateHeading();
    (0, _eventsJs.renderTimeline)(events, selectedDate, openEditModal, deleteEvent);
}
function renderCalendar() {
    // Удаляем старые даты, сохраняя дни недели
    calendarGrid.querySelectorAll('.day, .empty').forEach((cell)=>{
        cell.remove();
    });
    const year = displayedMonth.getFullYear();
    const month = displayedMonth.getMonth();
    // Название месяца
    calendarMonth.textContent = displayedMonth.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
    });
    // Количество дней в месяце
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    // День недели первого числа (понедельник = 0)
    const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
    // Пустые ячейки перед первым числом
    for(let i = 0; i < firstDay; i++){
        const empty = document.createElement('span');
        empty.classList.add('empty');
        calendarGrid.append(empty);
    }
    // Создаём кнопки с датами
    for(let day = 1; day <= daysInMonth; day++){
        const button = document.createElement('button');
        button.type = 'button';
        button.classList.add('day');
        button.textContent = day;
        const date = [
            year,
            String(month + 1).padStart(2, '0'),
            String(day).padStart(2, '0')
        ].join('-');
        if (date === selectedDate) button.classList.add('selected');
        button.addEventListener('click', ()=>{
            selectedDate = date;
            renderCalendar();
            updateTimeline();
            updateTasks();
        });
        calendarGrid.append(button);
    }
}
// ==========================================
// 5. СОЗДАНИЕ И РЕДАКТИРОВАНИЕ СОБЫТИЙ
// ==========================================
function openModal() {
    editingEventId = null;
    eventForm.reset();
    dateInput.value = selectedDate;
    modalTitle.textContent = 'New event';
    saveButton.textContent = 'Save event';
    modal.hidden = false;
}
function openEditModal(eventId) {
    const event = events.find((item)=>item.id === eventId);
    if (!event) return;
    editingEventId = eventId;
    titleInput.value = event.title;
    dateInput.value = event.date;
    startInput.value = event.start;
    endInput.value = event.end;
    categoryInput.value = event.category;
    descriptionInput.value = event.description || '';
    modalTitle.textContent = 'Edit event';
    saveButton.textContent = 'Save changes';
    modal.hidden = false;
}
function closeModal() {
    modal.hidden = true;
    eventForm.reset();
    editingEventId = null;
    clearEventError();
}
// ==========================================
// 6. УДАЛЕНИЕ И ПРОВЕРКА СОБЫТИЙ
// ==========================================
function deleteEvent(eventId) {
    const event = events.find((event)=>event.id === eventId);
    if (!event) return;
    openConfirmModal('Delete event?', `Are you sure you want to delete "${event.title}"?`, ()=>{
        events = events.filter((event)=>event.id !== eventId);
        (0, _storageJs.saveEvents)(events);
        updateTimeline();
    });
}
function hasTimeConflict(newEvent) {
    return events.some((event)=>{
        if (event.date !== newEvent.date || event.id === editingEventId) return false;
        return newEvent.start < event.end && newEvent.end > event.start;
    });
}
function showEventError(message) {
    eventError.textContent = message;
    eventError.hidden = false;
}
function clearEventError() {
    eventError.textContent = '';
    eventError.hidden = true;
}
function showTaskError(message) {
    taskError.textContent = message;
    taskError.hidden = false;
}
function clearTaskError() {
    taskError.textContent = '';
    taskError.hidden = true;
}
function openConfirmModal(title, message, callback) {
    confirmTitle.textContent = title;
    confirmMessage.textContent = message;
    confirmCallback = callback;
    confirmModal.hidden = false;
}
function closeConfirmModal() {
    confirmModal.hidden = true;
    confirmCallback = null;
}
confirmDeleteButton.addEventListener('click', ()=>{
    if (confirmCallback) confirmCallback();
    closeConfirmModal();
});
confirmCancelButton.addEventListener('click', closeConfirmModal);
confirmCloseButton.addEventListener('click', closeConfirmModal);
confirmModal.addEventListener('click', (event)=>{
    if (event.target === confirmModal) closeConfirmModal();
});
// ==========================================
// Уникальные функции для подтвержения удаления события или задачи
// ==========================================
function openConfirmModal(title, message, callback) {
    confirmTitle.textContent = title;
    confirmMessage.textContent = message;
    confirmCallback = callback;
    confirmModal.hidden = false;
}
function closeConfirmModal() {
    confirmModal.hidden = true;
    confirmCallback = null;
}
confirmDeleteButton.addEventListener('click', ()=>{
    if (confirmCallback) confirmCallback();
    closeConfirmModal();
});
confirmCancelButton.addEventListener('click', closeConfirmModal);
confirmCloseButton.addEventListener('click', closeConfirmModal);
confirmModal.addEventListener('click', (event)=>{
    if (event.target === confirmModal) closeConfirmModal();
});
// ==========================================
// 7. СОХРАНЕНИЕ СОБЫТИЙ
// ==========================================
function handleEventSubmit(event) {
    event.preventDefault();
    clearEventError();
    const newEvent = {
        id: editingEventId || crypto.randomUUID(),
        title: titleInput.value.trim(),
        date: dateInput.value,
        start: startInput.value,
        end: endInput.value,
        category: categoryInput.value,
        description: descriptionInput.value.trim()
    };
    // Проверяем обязательные поля
    if (!newEvent.title || !newEvent.date || !newEvent.start || !newEvent.end) {
        showEventError('Please fill in all required fields.');
        return;
    }
    // Проверяем корректность даты
    const date = new Date(`${newEvent.date}T00:00:00`);
    if (Number.isNaN(date.getTime())) {
        showEventError('Please enter a valid date.');
        return;
    }
    // Проверяем формат времени
    const timePattern = /^([01]\d|2[0-3]):[0-5]\d$/;
    if (!timePattern.test(newEvent.start) || !timePattern.test(newEvent.end)) {
        showEventError('Please enter valid times.');
        return;
    }
    // Расписание начинается в 06:00
    if (newEvent.start < '06:00') {
        showEventError('Events cannot start before 06:00.');
        return;
    }
    // Проверяем продолжительность события
    if (newEvent.end <= newEvent.start) {
        showEventError('End time must be later than start time.');
        return;
    }
    if (hasTimeConflict(newEvent)) {
        showEventError('This event overlaps with another event.');
        return;
    }
    if (editingEventId) events = events.map((event)=>event.id === editingEventId ? newEvent : event);
    else events.push(newEvent);
    (0, _storageJs.saveEvents)(events);
    // Переключаемся на дату события
    selectedDate = newEvent.date;
    displayedMonth = new Date(Number(selectedDate.slice(0, 4)), Number(selectedDate.slice(5, 7)) - 1, 1);
    renderCalendar();
    updateTimeline();
    updateTasks();
    closeModal();
}
// ==========================================
// 8. ОТОБРАЖЕНИЕ ЗАДАЧ
// ==========================================
function updateTasks() {
    const hasUndatedTasks = tasks.some((task)=>!task.date);
    if (hasUndatedTasks) {
        tasks = tasks.map((task)=>({
                ...task,
                date: task.date || selectedDate
            }));
        (0, _tasksJs.saveTasks)(tasks);
    }
    const dayTasks = tasks.filter((task)=>task.date === selectedDate);
    const completedCount = dayTasks.filter((task)=>task.completed).length;
    const totalCount = dayTasks.length;
    const remainingCount = totalCount - completedCount;
    document.querySelector('#tasks-count').textContent = `${totalCount} tasks`;
    document.querySelector('#tasks-completed').textContent = `${completedCount} completed \xb7 ${remainingCount} remaining`;
    const progress = totalCount === 0 ? 0 : completedCount / totalCount * 100;
    document.querySelector('#progress-fill').style.width = `${progress}%`;
    (0, _tasksJs.renderTasks)(dayTasks, toggleTask, openEditTaskForm, deleteTask);
}
// ==========================================
// 9. СОЗДАНИЕ И РЕДАКТИРОВАНИЕ ЗАДАЧ
// ==========================================
function openTaskForm() {
    editingTaskId = null;
    taskForm.reset();
    taskForm.hidden = false;
    taskSubmitButton.textContent = 'Add';
    taskTitleInput.focus();
}
function openEditTaskForm(taskId) {
    const task = tasks.find((item)=>item.id === taskId);
    if (!task) return;
    editingTaskId = taskId;
    taskTitleInput.value = task.title;
    taskSubmitButton.textContent = 'Save changes';
    taskForm.hidden = false;
    taskTitleInput.focus();
}
function closeTaskForm() {
    taskForm.hidden = true;
    taskForm.reset();
    editingTaskId = null;
    clearTaskError();
}
// ==========================================
// 10. СОХРАНЕНИЕ ЗАДАЧ
// ==========================================
function handleTaskSubmit(event) {
    event.preventDefault();
    clearTaskError();
    const title = taskTitleInput.value.trim();
    if (!title) {
        showTaskError('Please enter a task name.');
        return;
    }
    if (editingTaskId) tasks = tasks.map((task)=>task.id === editingTaskId ? {
            ...task,
            title
        } : task);
    else tasks.push({
        id: crypto.randomUUID(),
        title,
        completed: false,
        date: selectedDate
    });
    (0, _tasksJs.saveTasks)(tasks);
    updateTasks();
    closeTaskForm();
}
// ==========================================
// 11. ОТМЕТКА ВЫПОЛНЕНИЯ ЗАДАЧ
// ==========================================
function toggleTask(taskId) {
    tasks = tasks.map((task)=>task.id === taskId ? {
            ...task,
            completed: !task.completed
        } : task);
    (0, _tasksJs.saveTasks)(tasks);
    updateTasks();
}
// ==========================================
// 12. УДАЛЕНИЕ ЗАДАЧ
// ==========================================
function deleteTask(taskId) {
    const task = tasks.find((task)=>task.id === taskId);
    if (!task) return;
    openConfirmModal('Delete task?', `Are you sure you want to delete "${task.title}"?`, ()=>{
        tasks = tasks.filter((task)=>task.id !== taskId);
        (0, _tasksJs.saveTasks)(tasks);
        updateTasks();
    });
}
// ==========================================
// 13. ОБРАБОТЧИКИ СОБЫТИЙ И ИНТЕРФЕЙСА
// ==========================================
// События
addEventButton.addEventListener('click', openModal);
closeModalButton.addEventListener('click', closeModal);
cancelButton.addEventListener('click', closeModal);
eventForm.addEventListener('submit', handleEventSubmit);
// Кнопка Today
todayButton.addEventListener('click', ()=>{
    selectedDate = getLocalDate();
    displayedMonth = new Date(Number(selectedDate.slice(0, 4)), Number(selectedDate.slice(5, 7)) - 1, 1);
    renderCalendar();
    updateTimeline();
    updateTasks();
});
// Закрытие модального окна при клике вне него
modal.addEventListener('click', (event)=>{
    if (event.target === modal) closeModal();
});
// Задачи
addTaskButton.addEventListener('click', openTaskForm);
taskCancelButton.addEventListener('click', closeTaskForm);
taskForm.addEventListener('submit', handleTaskSubmit);
// Закрытие форм клавишей Escape
document.addEventListener('keydown', (event)=>{
    if (event.key === 'Escape') {
        if (!modal.hidden) closeModal();
        if (!taskForm.hidden) closeTaskForm();
    }
});
// Oбработчики переключения месяцев
prevMonthButton.addEventListener('click', ()=>{
    displayedMonth.setMonth(displayedMonth.getMonth() - 1);
    renderCalendar();
});
nextMonthButton.addEventListener('click', ()=>{
    displayedMonth.setMonth(displayedMonth.getMonth() + 1);
    renderCalendar();
});
// ==========================================
// 14. ПЕРВОНАЧАЛЬНАЯ ЗАГРУЗКА
// ==========================================
updateTimeline();
updateTasks();
renderCalendar();
// ==========================================
// 15. РЕГИСТРАЦИЯ Service Worker
// ==========================================
if ('serviceWorker' in navigator) window.addEventListener('load', ()=>{
    navigator.serviceWorker.register(require("525893bc22155ac3")).then(()=>console.log('PWA is ready')).catch((error)=>console.error('PWA error:', error));
});

},{"./events.js":"hlCtE","./storage.js":"d5KoN","./tasks.js":"1TTqb","525893bc22155ac3":"170CW"}],"hlCtE":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "renderTimeline", ()=>renderTimeline);
const START_HOUR = 6;
const END_HOUR = 24;
const HOUR_HEIGHT = 64;
function renderTimeline(events, selectedDate, onEdit, onDelete) {
    const timeline = document.querySelector('#timeline');
    timeline.innerHTML = '';
    for(let hour = START_HOUR; hour < END_HOUR; hour++){
        const row = document.createElement('div');
        row.classList.add('time-row');
        row.innerHTML = `
      <span>${String(hour).padStart(2, '0')}:00</span>
      <div></div>
    `;
        timeline.append(row);
    }
    const dayEvents = events.filter((event)=>event.date === selectedDate);
    dayEvents.forEach((event)=>{
        const [startHour, startMinute] = event.start.split(':').map(Number);
        const [endHour, endMinute] = event.end.split(':').map(Number);
        const start = startHour * 60 + startMinute;
        const end = endHour * 60 + endMinute;
        const top = (start - START_HOUR * 60) / 60 * HOUR_HEIGHT;
        const height = (end - start) / 60 * HOUR_HEIGHT;
        const card = document.createElement('article');
        card.classList.add('event', `event-${event.category}`);
        card.style.top = `${top}px`;
        card.style.height = `${height}px`;
        const title = document.createElement('h3');
        title.textContent = event.title;
        const time = document.createElement('p');
        time.textContent = `${event.start} \u{2014} ${event.end}`;
        const actions = document.createElement('div');
        actions.classList.add('event-actions');
        const editButton = document.createElement('button');
        editButton.type = 'button';
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', ()=>onEdit(event.id));
        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', ()=>onDelete(event.id));
        actions.append(editButton, deleteButton);
        card.append(title, time, actions);
        if (event.description) {
            const description = document.createElement('p');
            description.textContent = event.description;
            card.append(description);
        }
        timeline.append(card);
    });
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"jnFvT":[function(require,module,exports,__globalThis) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"d5KoN":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "loadEvents", ()=>loadEvents);
parcelHelpers.export(exports, "saveEvents", ()=>saveEvents);
const STORAGE_KEY = 'daily-planner-events';
function loadEvents() {
    try {
        const savedEvents = localStorage.getItem(STORAGE_KEY);
        return savedEvents ? JSON.parse(savedEvents) : [];
    } catch (error) {
        console.error('Failed to load events:', error);
        return [];
    }
}
function saveEvents(events) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    } catch (error) {
        console.error('Failed to save events:', error);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"1TTqb":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// Получаем сохранённые задачи
parcelHelpers.export(exports, "loadTasks", ()=>loadTasks);
// Сохраняем задачи
parcelHelpers.export(exports, "saveTasks", ()=>saveTasks);
// Отображаем список задач
parcelHelpers.export(exports, "renderTasks", ()=>renderTasks);
const STORAGE_KEY = 'daily-planner-tasks';
function loadTasks() {
    try {
        const savedTasks = localStorage.getItem(STORAGE_KEY);
        return savedTasks ? JSON.parse(savedTasks) : [];
    } catch (error) {
        console.error('Failed to load tasks:', error);
        return [];
    }
}
function saveTasks(tasks) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
        console.error('Failed to save tasks:', error);
    }
}
function renderTasks(tasks, onToggle, onEdit, onDelete) {
    const taskList = document.querySelector('#task-list');
    taskList.innerHTML = '';
    tasks.forEach((task)=>{
        const item = document.createElement('li');
        item.classList.add('task-item');
        if (task.completed) item.classList.add('completed');
        // Название и отметка выполнения
        const label = document.createElement('label');
        label.classList.add('task-label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', ()=>{
            onToggle(task.id);
        });
        const title = document.createElement('span');
        title.textContent = task.title;
        label.append(checkbox, title);
        // Кнопки редактирования и удаления
        const actions = document.createElement('div');
        actions.classList.add('task-actions');
        const editButton = document.createElement('button');
        editButton.type = 'button';
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', ()=>{
            onEdit(task.id);
        });
        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', ()=>{
            onDelete(task.id);
        });
        actions.append(editButton, deleteButton);
        item.append(label, actions);
        taskList.append(item);
    });
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"170CW":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("service-worker.js");

},{}]},["huHYX","3Aj1C"], "3Aj1C", "parcelRequiredce5", {}, "./", "/")

//# sourceMappingURL=daily-planner.4841ef46.js.map
