// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
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

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/nev.js":[function(require,module,exports) {
window.onload = function () {
  //设置半径为20，并查找所有.neitem子元素的i标签（可以改为.neitem i)
  var r = 20;
  var imgNodes = document.querySelectorAll(".neitem > a > i");
  var contentLiNodes = document.querySelectorAll(".procontent li");
  var circleLiNodes = document.querySelectorAll(".circle li");
  var procontent = document.querySelector(".procontent");
  var leftarrow = document.querySelector(".project .la");
  var rightarrow = document.querySelector(".project .ra");

  //第一屏3D效果
  var oldIndex = 0;
  var timer3D = "11";
  var autoIndex = 0;
  document.onmousemove = function (event) {
    event = event || window.event;
    for (var i = 0; i < imgNodes.length; i++) {
      var a = imgNodes[i].getBoundingClientRect().left + imgNodes[i].offsetWidth / 2 - event.clientX;
      var b = imgNodes[i].getBoundingClientRect().top + imgNodes[i].offsetHeight / 2 - event.clientY;
      var c = Math.sqrt(a * a + b * b);
      if (c >= r) {
        c = r;
      }
      imgNodes[i].style.fontSize = 2 - c * 0.04 + "em";
      imgNodes[i].style.fontWeight = 900 - c * 15;
    }
  };
  home3D();
  function home3D() {
    for (var i = 0; i < circleLiNodes.length; i++) {
      circleLiNodes[i].index = i;
      //注册回调函数(同步)   执行回调函数(异步)
      circleLiNodes[i].onclick = function () {
        clearInterval(timer3D);
        for (var i = 0; i < circleLiNodes.length; i++) {
          circleLiNodes[i].classList.remove("active");
        }
        this.classList.add("active");

        //从左往右  当前索引大于上一次索引  rightShow
        if (this.index > oldIndex) {
          contentLiNodes[this.index].classList.remove("leftShow");
          contentLiNodes[this.index].classList.remove("leftHide");
          contentLiNodes[this.index].classList.remove("rightHide");
          contentLiNodes[this.index].classList.add("rightShow");
          contentLiNodes[oldIndex].classList.remove("leftShow");
          contentLiNodes[oldIndex].classList.remove("rightShow");
          contentLiNodes[oldIndex].classList.remove("rightHide");
          contentLiNodes[oldIndex].classList.add("leftHide");
        }

        //从右往左  当前索引小于上一次索引 leftShow
        if (this.index < oldIndex) {
          contentLiNodes[this.index].classList.remove("rightShow");
          contentLiNodes[this.index].classList.remove("leftHide");
          contentLiNodes[this.index].classList.remove("rightHide");
          contentLiNodes[this.index].classList.add("leftShow");
          contentLiNodes[oldIndex].classList.remove("leftShow");
          contentLiNodes[oldIndex].classList.remove("rightShow");
          contentLiNodes[oldIndex].classList.remove("leftHide");
          contentLiNodes[oldIndex].classList.add("rightHide");
        }
        oldIndex = this.index;

        //手动轮播  ---> 自动轮播的同步问题！！
        //手动点完是需要自动轮播的，自动轮播从哪个面开始播？--->手动点的这个面开始自动轮播
        //手动轮播的逻辑必须药告诉自动轮播 我刚刚点了哪一个面
        autoIndex = this.index;

        //重新开启自动轮播
        //move();
      };
    }
  }

  move();
  function move() {
    clearInterval(timer3D); //定时器的调用(同步)  定时器回调函数的执行(异步)
    timer3D = setInterval(function () {
      autoIndex++;

      //无缝
      if (autoIndex == contentLiNodes.length) {
        autoIndex = 0;
      }
      for (var i = 0; i < circleLiNodes.length; i++) {
        circleLiNodes[i].classList.remove("active");
      }
      circleLiNodes[autoIndex].classList.add("active");
      contentLiNodes[autoIndex].classList.remove("leftShow");
      contentLiNodes[autoIndex].classList.remove("leftHide");
      contentLiNodes[autoIndex].classList.remove("rightHide");
      contentLiNodes[autoIndex].classList.add("rightShow");
      contentLiNodes[oldIndex].classList.remove("leftShow");
      contentLiNodes[oldIndex].classList.remove("rightShow");
      contentLiNodes[oldIndex].classList.remove("rightHide");
      contentLiNodes[oldIndex].classList.add("leftHide");

      //自动轮播 --> 手动轮播的同步问题！！
      //自动轮播一直运行...autoIndex一直在加加,自动轮播到一半时有可能触发手动轮播
      //这个时候自动轮播的逻辑必须要告诉手动轮播  我播到哪一个面上了
      oldIndex = autoIndex;
    }, 10000);
  }

  // arrowclick();
  // function arrowclick(){
  //     la.onclick=function(){
  //         clearInterval(timer3D);
  //             for(var i=0;i<circleLiNodes.length;i++){
  //                 circleLiNodes[i].classList.remove("active");
  //             }
  //             circleLiNodes[autoIndex-1].classList.add("active");

  //                 contentLiNodes[autoIndex-1].classList.remove("rightShow");
  //                 contentLiNodes[autoIndex-1].classList.remove("leftHide");
  //                 contentLiNodes[autoIndex-1].classList.remove("rightHide");
  //                 contentLiNodes[autoIndex-1].classList.add("leftShow");

  //                 contentLiNodes[oldIndex-1].classList.remove("leftShow");
  //                 contentLiNodes[oldIndex-1].classList.remove("rightShow");
  //                 contentLiNodes[oldIndex-1].classList.remove("leftHide");
  //                 contentLiNodes[oldIndex-1].classList.add("rightHide");

  //             oldIndex = oldIndex -1;
  //             autoIndex = autoIndex-1;
  //     }

  // }

  procontent.onmouseenter = function () {
    clearInterval(timer3D);
  };
  procontent.onmouseleave = function () {
    move();
  };
};
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "7542" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/nev.js"], null)
//# sourceMappingURL=/js/nev.js.map