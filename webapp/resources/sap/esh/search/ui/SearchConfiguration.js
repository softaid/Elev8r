/*! 
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	 
 */
(function(){sap.ui.define(["sap/esh/search/ui/controls/SearchResultListSelectionHandler","./controls/SearchResultListItemNote","./SearchConfigurationSettings","sap/base/Log"],function(e,t,r,o){function a(e){return e&&e.__esModule&&typeof e.default!=="undefined"?e.default:e}function n(e){"@babel/helpers - typeof";return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n(e)}function i(e,t){if(!(e instanceof t)){throw new TypeError("Cannot call a class as a function")}}function s(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||false;o.configurable=true;if("value"in o)o.writable=true;Object.defineProperty(e,o.key,o)}}function u(e,t,r){if(t)s(e.prototype,t);if(r)s(e,r);Object.defineProperty(e,"prototype",{writable:false});return e}function c(e,t){if(typeof t!=="function"&&t!==null){throw new TypeError("Super expression must either be null or a function")}e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:true,configurable:true}});Object.defineProperty(e,"prototype",{writable:false});if(t)l(e,t)}function l(e,t){l=Object.setPrototypeOf||function e(t,r){t.__proto__=r;return t};return l(e,t)}function f(e){var t=g();return function r(){var o=m(e),a;if(t){var n=m(this).constructor;a=Reflect.construct(o,arguments,n)}else{a=o.apply(this,arguments)}return d(this,a)}}function d(e,t){if(t&&(typeof t==="object"||typeof t==="function")){return t}else if(t!==void 0){throw new TypeError("Derived constructors may only return object or undefined")}return h(e)}function h(e){if(e===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return e}function g(){if(typeof Reflect==="undefined"||!Reflect.construct)return false;if(Reflect.construct.sham)return false;if(typeof Proxy==="function")return true;try{Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}));return true}catch(e){return false}}function m(e){m=Object.setPrototypeOf?Object.getPrototypeOf:function e(t){return t.__proto__||Object.getPrototypeOf(t)};return m(e)}function p(e,t,r){if(t in e){Object.defineProperty(e,t,{value:r,enumerable:true,configurable:true,writable:true})}else{e[t]=r}return e}var y=a(t);var S=a(r);var v=r["defaultSearchConfigurationSettings"];function C(e,t,r){if(r){return t?t(e()):e()}try{var o=Promise.resolve(e());return t?o.then(t):o}catch(e){return Promise.reject(e)}}var b=function(t){c(a,t);var r=f(a);function a(e){var t;i(this,a);t=r.call(this);p(h(t),"log",o.getLogger("sap.esh.search.ui.SearchConfiguration"));p(h(t),"dataSourceConfigurations_Regexes",[]);p(h(t),"defaultDataSourceConfig",{});jQuery.extend(h(t),e);if(t.isUshell){t.readUshellConfiguration();t.readOutdatedUshellConfiguration()}t.updateConfigFromUrlParameters();t.initDataSourceConfig();t.initDefaultDataSourceConfig();t.setModulePaths();t.setSinaLanguageDefault();return t}u(a,[{key:"setSinaLanguageDefault",value:function e(){if(this.isUshell){return}if(this.sinaConfiguration&&!this.sinaConfiguration.getLanguage){var t=function e(){return sap.ui.getCore().getConfiguration().getLanguage()};this.sinaConfiguration["getLanguage"]=t}}},{key:"setModulePaths",value:function e(){if(!this.modulePaths){return}for(var t=0;t<this.modulePaths.length;++t){var r=this.modulePaths[t];var o=r.urlPrefix.replace("${host}",window.location.protocol+"//"+window.location.host);jQuery.sap.registerModulePath(r.moduleName,o)}}},{key:"readUshellConfiguration",value:function e(){try{var t=window["sap-ushell-config"].renderers.fiori2.componentData.config.esearch;jQuery.extend(true,this,t)}catch(e){}}},{key:"readOutdatedUshellConfiguration",value:function e(){try{var t=window["sap-ushell-config"].renderers.fiori2.componentData.config;if(typeof t.searchBusinessObjects!=="undefined"){if(t.searchBusinessObjects==="hidden"||t.searchBusinessObjects===false){this.searchBusinessObjects=false}else{this.searchBusinessObjects=true}}}catch(e){}}},{key:"initDataSourceConfig",value:function e(){this.dataSourceConfigurations={};this.dataSourceConfigurations_Regexes=[];if(this.dataSources){for(var t=0;t<this.dataSources.length;t++){var r=this.dataSources[t];if(r.id){this.dataSourceConfigurations[r.id]=r}else if(r.regex){var o=r.regexFlags||undefined;var a=new RegExp(r.regex,o);if(a){r.regex=a;this.dataSourceConfigurations_Regexes.push(r)}}else{var n="Following datasource configuration does neither include a valid id nor a regular expression, therefore it is ignored:\n"+JSON.stringify(r);this.log.warning(n)}}}this.dataSources=undefined;this.documentDataSource={searchResultListItem:"sap.esh.search.ui.controls.SearchResultListItemDocument"};this.dataSourceConfigurations.noteprocessorurl=this.dataSourceConfigurations.noteprocessorurl||{};this.dataSourceConfigurations.noteprocessorurl.searchResultListItem=this.dataSourceConfigurations.noteprocessorurl.searchResultListItem||new y;this.dataSourceConfigurations.noteprocessorurl.searchResultListSelectionHandler=this.dataSourceConfigurations.noteprocessorurl.searchResultListSelectionHandler||"sap.esh.search.ui.controls.SearchResultListSelectionHandlerNote"}},{key:"initDefaultDataSourceConfig",value:function t(){this.defaultDataSourceConfig={searchResultListItem:undefined,searchResultListItemControl:undefined,searchResultListItemContent:undefined,searchResultListItemContentControl:undefined,searchResultListSelectionHandler:e["getMetadata"]().getName(),searchResultListSelectionHandlerControl:e}}},{key:"getParameterType",value:function e(t){if(!v.hasOwnProperty(t)){return""}return n(v[t])}},{key:"parseBoolean",value:function e(t){if(t.toLowerCase()==="true"){return true}return false}},{key:"parseEsDevConfig",value:function e(t){var r=JSON.parse(t);jQuery.extend(this,r)}},{key:"updateConfigFromUrlParameters",value:function e(){var t=this.parseUrlParameters();for(var r in t){var o=t[r];var a=this.getParameterType(r);if(r.startsWith("sina")){continue}if(r==="demoMode"){this.searchBusinessObjects=true;continue}if(r==="resultViewTypes"){var n=o.split(",");n=n.filter(function(e){return e.length>0});this.resultViewTypes=n;continue}if(r==="esDevConfig"){this.parseEsDevConfig(o);continue}switch(a){case"string":this[r]=o;break;case"number":this[r]=parseInt(o);break;case"boolean":this[r]=this.parseBoolean(o);break;default:}}}},{key:"parseUrlParameters",value:function e(){if(!URLSearchParams){return{}}var t=new URLSearchParams(window.location.search);return Object.fromEntries(t.entries())}},{key:"loadCustomModulesAsync",value:function e(){if(this._loadCustomModulesProm){return this._loadCustomModulesProm}var t;var r=[];for(var o in this.dataSourceConfigurations){t=this.loadCustomModulesForDataSourceIdAsync(o);r.push(t)}this._loadCustomModulesProm=Promise.all(r);return this._loadCustomModulesProm}},{key:"loadCustomModulesForDataSourcesAsync",value:function e(t,r){var o=this;return C(function(){var e=[];for(var a=0;a<t.length;a++){var n=Array.isArray(r)&&r.length>a&&r[a]||{};var i=o.loadCustomModulesForDataSourceAsync(t[a],n);e.push(i)}return Promise.all(e)})}},{key:"loadCustomModulesForDataSourceAsync",value:function e(t){var r=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};r=r||{};return this.loadCustomModulesForDataSourceIdAsync(t.id,r)}},{key:"loadCustomModulesForDataSourceIdAsync",value:function e(t,r){if(!t){return Promise.resolve()}this._dataSourceLoadingProms=this._dataSourceLoadingProms||{};var o=this._dataSourceLoadingProms[t];if(!o){var a=[{moduleAttrName:"searchResultListItem",controlAttrName:"searchResultListItemControl"},{moduleAttrName:"searchResultListItemContent",controlAttrName:"searchResultListItemContentControl"},{moduleAttrName:"searchResultListSelectionHandler",controlAttrName:"searchResultListSelectionHandlerControl"}];var n=this._prepareDataSourceConfigurationForDataSource(t,r);var i;var s=[];for(var u=0;u<a.length;u++){i=this._doLoadCustomModulesAsync(t,n,a[u].moduleAttrName,a[u].controlAttrName);s.push(i)}o=Promise.all(s);o._resolvedOrFailed=false;o.then(function(){o._resolvedOrFailed=true});this._dataSourceLoadingProms[t]=o}return o}},{key:"_doLoadCustomModulesAsync",value:function e(t,r,o,a,n,i){var s=this;return new Promise(function(e){if(r[o]&&(!r[a]||r[a]==s.defaultDataSourceConfig[a])){try{sap.ui.require([r[o].replace(/[.]/g,"/")],function(t){r[a]=t;e()})}catch(c){var u="Could not load custom module '"+r[o]+"' for data source with id '"+t+"'. ";u+="Falling back to default data source configuration.";s.log.warning(u);r[o]=n||s.defaultDataSourceConfig[o];r[a]=i||s.defaultDataSourceConfig[a];e()}}else{if(!r[a]){r[o]=n||s.defaultDataSourceConfig[o];r[a]=i||s.defaultDataSourceConfig[a]}e()}})}},{key:"getDataSourceConfig",value:function e(t){if(this._dataSourceLoadingProms&&this._dataSourceLoadingProms[t.id]&&!this._dataSourceLoadingProms[t.id]._resolvedOrFailed){return this.defaultDataSourceConfig}var r=this.dataSourceConfigurations[t.id];if(!r){r=this.defaultDataSourceConfig;this.dataSourceConfigurations[t.id]=r}return r}},{key:"_prepareDataSourceConfigurationForDataSource",value:function e(t,r){var o={};if(this.dataSourceConfigurations[t]){o=this.dataSourceConfigurations[t]}else{for(var a=0;a<this.dataSourceConfigurations_Regexes.length;a++){if(this.dataSourceConfigurations_Regexes[a].regex.test(t)){o=this.dataSourceConfigurations_Regexes[a];break}}}if(r&&r.isDocumentConnector){if(!o.searchResultListItem){o.searchResultListItem=this.documentDataSource.searchResultListItem}else{var n="Will attempt to load '"+o.searchResultListItem+"' instead of '"+this.documentDataSource.searchResultListItem+"' for data source '"+t+"'";this.log.warning(n)}}this.dataSourceConfigurations[t]=o;return o}}]);return a}(S);return b})})();