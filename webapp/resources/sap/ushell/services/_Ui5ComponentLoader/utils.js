// Copyright (c) 2009-2022 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/thirdparty/jquery","sap/base/util/UriParameters","sap/ui/core/util/AsyncHintsHelper","sap/base/Log","sap/ui/core/Component","sap/ui/thirdparty/URI","sap/ushell/bootstrap/common/common.load.core-min"],function(e,r,n,a,t,o,s){"use strict";var i=sap.ushell&&sap.ushell.Container&&sap.ushell.Container.getLogonSystem().getPlatform()==="abap";var u={name:"core-ext-light",count:4,debugName:undefined,path:i?"sap/ushell_abap/bootstrap/evo/":"sap/fiori/"};function p(r,n){var a=new e.Deferred;r.componentData=n;if(r.manifest===undefined){r.manifest=false}else if(n.technicalParameters&&n.technicalParameters.hasOwnProperty("sap-ui-fl-version")){if(typeof r.manifest==="string"&&r.manifest.length>0){var s=new o(r.manifest);s.addQuery("version",n.technicalParameters["sap-ui-fl-version"][0]);r.manifest=s.toString()}}t.create(r).then(function(e){a.resolve(e)},function(e){a.reject(e)});return a.promise()}function l(e){var r=e&&e.hasOwnProperty("amendedLoading")?e.amendedLoading:true;return r}function c(e){var r=true;if(e.hasOwnProperty("loadCoreExt")){r=e.loadCoreExt}return r}function f(e,r,n){var a=true;if(e.hasOwnProperty("loadDefaultDependencies")){a=e.loadDefaultDependencies}if(r&&r.hasOwnProperty("loadDefaultDependencies")){a=a&&r.loadDefaultDependencies}a=a&&n;return a}function d(e){var r=e.semanticObject||null;var n=e.action||null;if(!r||!n){return null}return"application-"+r+"-"+n+"-component"}function m(e){return e&&e.indexOf("?")>=0}function y(e){var r=new RegExp("[/]~[\\w-]+~[A-Z0-9]?");return e.replace(r,"")}function h(e){if(!e){return e}var r=e.indexOf("?");if(r>=0){return e.slice(0,r)}return e}function g(e,r,n,t,o){var s="The issue is most likely caused by application "+e,i="Failed to load UI5 component with properties: '"+o+"'.";if(t){i+=" Error likely caused by:\n"+t}else{i+=" Error: '"+r+"'"}if(n==="parsererror"){s+=", as one or more of its resources could not be parsed"}s+=". Please create a support incident and assign it to the support component of the respective application.";a.error(s,i,e)}function C(e){var n=new r(e||window.location.href).mParams,a=n["sap-xapp-state"],t;delete n["sap-xapp-state"];t={startupParameters:n};if(a){t["sap-xapp-state"]=a}return t}function v(e,r){if(!Array.isArray(r)){return}r.forEach(function(r){var n=String.prototype.toLowerCase.call(r.severity||"");n=["trace","debug","info","warning","error","fatal"].indexOf(n)!==-1?n:"error";a[n](r.text,r.details,e)})}function b(e){var r,n={name:"CoreResourcesComplement"};if(w(e)){r=e}else{r=u}if(window["sap-ui-debug"]===true){if(r.debugName!==undefined){n.aResources=[r.path+r.debugName+".js"]}else{n.aResources=[]}}else if(s.loaded){n.aResources=P(r.name,r.path,r.count)}else{n.aResources=[]}return n}function P(e,r,n){var t=arguments[3]||[],o=r;if(typeof e!=="string"||typeof o!=="string"||typeof n!=="number"){a.error("Ui5ComponentLoader: _buildBundleResourcesArray called with invalid arguments");return null}if(o.substr(-1)!=="/"){o+="/"}if(n===1){t.push(o+e+".js")}if(t.length>=n){return t}t.push(o+e+"-"+t.length+".js");return P(e,o,n,t)}function w(e){var r=true;if(!e){return false}if(!e.name||typeof e.name!=="string"){a.error("Ui5ComponentLoader: Configured CoreResourcesComplement Bundle has incorrect 'name' property");r=false}if(!e.count||typeof e.count!=="number"){a.error("Ui5ComponentLoader: Configured CoreResourcesComplement Bundle has incorrect 'count' property");r=false}if(!e.debugName||typeof e.debugName!=="string"){a.error("Ui5ComponentLoader: Configured CoreResourcesComplement Bundle has incorrect 'debugName' property");r=false}if(!e.path||typeof e.path!=="string"){a.error("Ui5ComponentLoader: Configured CoreResourcesComplement Bundle has incorrect 'path' property");r=false}return r}function x(e){if(!e||!Array.isArray(e.aResources)||!e.name){a.error("Ui5ComponentLoader: loadBundle called with invalid arguments");return null}return Promise.all(e.aResources.map(function(e){return sap.ui.loader._.loadJSResourceAsync(e)})).catch(function(){a.error("Ui5ComponentLoader: failed to load bundle: "+e.name);return Promise.reject()})}function R(r,a,t,o,s,i,u,p,l){var c=e.extend(true,{},s);if(!c.asyncHints){c.asyncHints=a?{libs:["sap.ca.scfld.md","sap.ca.ui","sap.me","sap.ui.unified"]}:{}}if(r){c.asyncHints.preloadBundles=c.asyncHints.preloadBundles||[];c.asyncHints.preloadBundles=c.asyncHints.preloadBundles.concat(l.aResources)}if(o){c.asyncHints.waitFor=o}if(!c.name){c.name=i}if(u){c.url=h(u)}if(p){c.id=p}if(t&&c.asyncHints){n.modifyUrls(c.asyncHints,y)}return c}function L(r,n,a,t){var o=e.extend(true,{startupParameters:{}},r);if(a){o.config=a}if(t){o.technicalParameters=t}if(m(n)){var s=C(n);o.startupParameters=s.startupParameters;if(s["sap-xapp-state"]){o["sap-xapp-state"]=s["sap-xapp-state"]}}return o}return{constructAppComponentId:d,getParameterMap:C,logAnyApplicationDependenciesMessages:v,logInstantiateComponentError:g,shouldLoadCoreExt:c,shouldLoadDefaultDependencies:f,shouldUseAmendedLoading:l,urlHasParameters:m,removeParametersFromUrl:h,createUi5Component:p,prepareBundle:b,loadBundle:x,createComponentProperties:R,createComponentData:L,buildBundleResourcesArray:P}},false);