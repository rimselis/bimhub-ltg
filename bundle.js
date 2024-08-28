(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function () {
  var WorkspaceAPI = require("trimble-connect-workspace-api");

  async function initializeExtension() {
    this.API = await WorkspaceAPI.connect(
      window.parent,
      (event, args) => {
        console.log("Event: ", event);
        switch (event) {
          case "extension.command":
            // "Command executed by the user: args.data"
            switch (args.data) {
              case "main_nav_menu_clicked":
                // window.open("", "_blank");
                break;
            }
            break;
          case "extension.accessToken":
            //"AccessToken or status: args.data"
            break;
          case "extension.userSettingsChanged":
            //"User settings changed!"
            break;
          default:
        }
      },
      30000
    );

    if (this.API && this.API.ui) {
      this.API.ui.setMenu({
        title: "LTG team chat",
        icon: "http://extension.bimhub.lt/wp-content/uploads/2023/10/bimhub-logo.png",
        command: "main_nav_menu_clicked",
      });
    } else {
      console.warn("API or API.ui is not defined.");
    }
  }

  initializeExtension();
})();
},{"trimble-connect-workspace-api":2}],2:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const e={postMessage:(e,t)=>{const n=JSON.stringify(e);connectWsApiIntegrator.postMessage(n)}},t={postMessage:(e,t)=>{window.chrome.webview.postMessage(e)}},n=()=>crypto.randomUUID(),r=()=>{const e=window;return!!(e&&e.chrome&&e.chrome.webview)},i=()=>{const e=window;return!(!e||!("CefSharp"in e))},o=async()=>(window.connectWsApiIntegrator||await CefSharp.BindObjectAsync("connectWsApiIntegrator"),e),s=()=>t,c=async e=>{let t;return t=e===window?i()?await o():r()?s():e:e,t},a="Trimble.dispatcher.v1",p={},u={};let d=1;function f(e){const t=m();return u[t]=e,()=>delete u[t]}function l(e,t,n,r,i=3e5){return new Promise(((o,s)=>{const c=m(),u={scope:a,type:"request",id:c,api:n,args:r};let d;i>0&&(d=setTimeout((()=>{delete p[c],s(new Error("dispatcher.ts | sendRequest(): Operation timed out."))}),i)),p[c]=e=>{delete p[c],d&&clearTimeout(d),e.error?s(e.error):o(e.result)},e.postMessage(u,t)}))}function w(e,t,n,r){const i={scope:a,type:"event",event:n,data:r};c(e).then((e=>{e.postMessage(i,t)})).catch((e=>{console.error("sendEvent() call failed",e)}))}async function g(e){const t="null"===e.origin?"*":e.origin,n=e.data;if(function(e){return y(e)&&"event"===e.type}(n))for(const r in u){if(!u.hasOwnProperty(r))continue;const i=u[r].event;if(i){i(e.source,t,n.event,n.data)}}else if(function(e){return y(e)&&"request"===e.type}(n)){const r=await c(e.source);let i;for(const e in u){if(!u.hasOwnProperty(e))continue;const o=u[e].request;if(o&&!i){const e=o(r,t,n.api,n.args);if(void 0!==e)try{i={scope:a,type:"response",id:n.id,api:n.api,result:await e}}catch(e){i={scope:a,type:"response",id:n.id,api:n.api,error:String(e)}}}}i||(i={scope:a,type:"response",id:n.id,api:n.api,error:"Not supported"}),r.postMessage(i,t)}else if(function(e){return y(e)&&"response"===e.type}(n)){const e=p[n.id];e&&e(n)}}function y(e){return!!e&&e.scope===a}function m(){return d++}const v={},h=[];let b;const S=new Promise((e=>{b=()=>{b=()=>{},e()}}));let M;function x(e){if("object"!=typeof e)throw new Error("Api must be an object");O(v,e),b()}const P=(e,t,n,r)=>{if(n.origin){let i;i=n.identifier&&r&&n.identifier===r?Object.assign(Object.assign({},t),{origin:{isSelf:!0}}):t,w(n.dispatcher,n.origin,e,i)}};function E(e,t){return"function"==typeof e&&"function"==typeof t&&e.name===t.name||("string"==typeof e&&"string"==typeof t||"number"==typeof e&&"number"==typeof t)}function O(e,t){for(const n in t){const r=t[n];if(r)if(n in e){const t=e[n];if("object"==typeof r&&"object"==typeof t)O(t,r);else{if(!E(r,t))throw new Error(`Cannot merge ${n} (${t} and ${r})`);e[n]=r}}else switch(typeof r){case"object":{const t={};O(t,r),e[n]=t;break}default:e[n]=r}}}function _(e,t,n){const r={};for(const i in e){const o=e[i];if((void 0!==n||"onConnect"!==i&&"onRequest"!==i)&&o)if("object"==typeof o){const e=n&&n+"."+String(i)||String(i);r[i]=_(o,t,e)}else r[i]=t(i,e[i],n)}return r}var T,j;f({request:(e,t,r,i)=>{if(".connect_api_client_v1"===r)return S.then((()=>{let r=h.find((t=>t.dispatcher===e));if(r)r.origin=t;else{if(!e)return;r={dispatcher:e,origin:t,identifier:n()},h.push(r)}var i;(i=v)&&"function"==typeof i.onConnect&&v.onConnect(r);return _(v,((e,t)=>"function"==typeof t?".api_function_v1":t))}));{const n=h.find((n=>n.dispatcher===e&&n.origin===t));if(n){if((o=v)&&"function"==typeof o.onRequest){const e=v.onRequest(n,r,i);if(void 0!==e)return e}const e=function(e,t){const n=t.split(".");let r=e;for(const e of n)r="object"==typeof r&&r&&e in r?r[e]:void 0;return r}(v,r);if("function"==typeof e){const t=e.apply(void 0,i);return void 0===t?Promise.resolve(t):t}return Promise.resolve(e)}return}var o}}),exports.PropertyType=void 0,(T=exports.PropertyType||(exports.PropertyType={}))[T.LengthMeasure=0]="LengthMeasure",T[T.AreaMeasure=1]="AreaMeasure",T[T.VolumeMeasure=2]="VolumeMeasure",T[T.MassMeasure=3]="MassMeasure",T[T.AngleMeasure=4]="AngleMeasure",T[T.StringValue=5]="StringValue",T[T.IntValue=6]="IntValue",T[T.DoubleValue=7]="DoubleValue",T[T.DateTime=8]="DateTime",T[T.Logical=9]="Logical",T[T.Boolean=10]="Boolean",exports.ViewEntityStates=void 0,(j=exports.ViewEntityStates||(exports.ViewEntityStates={}))[j.Selected=1]="Selected",j[j.Hidden=4]="Hidden",j[j.SelectedHidden=5]="SelectedHidden",j[j.Visible=6]="Visible",j[j.SelectedVisible=7]="SelectedVisible",j[j.Highlighted=8]="Highlighted";var C,V;function k(e){return g(e)}exports.CameraMode=void 0,(C=exports.CameraMode||(exports.CameraMode={})).LookAround="look_around",C.Pan="pan",C.Panorama="panorama",C.Rotate="rotate",C.Walk="walk",exports.SortDirection=void 0,(V=exports.SortDirection||(exports.SortDirection={}))[V.SORT_NONE=0]="SORT_NONE",V[V.SORT_UP=1]="SORT_UP",V[V.SORT_DOWN=-1]="SORT_DOWN",exports.TOOLS=["reset","selection","areaSelection","measurement","pointMarkup","cloudMarkup","arrowMarkup","lineMarkup","textMarkup","freelineMarkup","clipPlane","verticalClipPlane","picking"],exports.TOOL_SNAP_TYPES=["edge","point","surface"],exports.connect=function(e,t,n){return window.removeEventListener("message",k),window.addEventListener("message",k),M&&M(),function(e,t,n=1e4){async function c(e,t){const r=await l(e,t,".connect_api_client_v1",[],0);if(r&&"object"==typeof r)return _(r,((r,i,o)=>{if(".api_function_v1"===i){const i=o?o+"."+String(r):String(r);return(...r)=>l(e,t,i,r,n)}return i}));throw new Error("Failed to connect")}function a(e){if(!e)return"*";try{return new URL(e).origin}catch(e){return"*"}}if(t&&(M=f({event:(e,n,r,i)=>t(r,i)})),e===window)return 0!==Object.keys(v).length?Promise.resolve(v):i()?new Promise((async e=>{const t=await o();e(await c(t,"*"))})):r()?c(s(),"*"):Promise.resolve(v);if((p=e)&&"function"==typeof p.postMessage)return c(e,"*");if((e=>e&&"object"==typeof e.contentWindow)(e)){const t=[];return t.push(new Promise(((t,n)=>{const r=async()=>{e.removeEventListener("load",r),e.contentWindow?t(await c(e.contentWindow,a(e.src))):n(new Error("Cannot access the target content window"))};e.addEventListener("load",r)}))),e.contentWindow&&t.push(c(e.contentWindow,a(e.src))),Promise.race(t)}return Promise.reject(new Error("Target must be a window or an iframe"));var p}(e,t,n)},exports.dispatcherEventListener=k,exports.expose=function(e){return x(e)},exports.getConnectEmbedUrl=function(e="prod"){return`https://${{int:"web.int",qa:"web.qa",stage:"web.stage",prod:"web"}[e]}.connect.trimble.com?isEmbedded=true`},exports.isApplicationEmbedded=function(){try{return window.self!==window.top||i()||r()}catch(e){return!0}},exports.preregister=function(e){const t=h.find((t=>t.dispatcher===e.dispatcher));if(t)return t.identifier=e.identifier||t.identifier,t.origin=e.origin||t.origin,t;if(e.dispatcher){if(e.identifier){if(h.find((t=>t.identifier===e.identifier)))throw new Error(`[Workspace API] Client with identifier '${e.identifier}' already registered!`)}else e.identifier=n();return h.push(e),e}},exports.removeClient=function(e){const t=h.findIndex((t=>t.dispatcher===e.dispatcher));-1!==t&&h.splice(t,1)},exports.sendEvent=function(e,t,n,r){w(e,t,n,r)},exports.sendEventToAllClients=function(e,t,n,r){if(n&&n.identifier){const i=h.find((e=>e.identifier===n.identifier));i&&P(e,t,i,r)}else for(const n of h)P(e,t,n,r)};

},{}]},{},[1]);
