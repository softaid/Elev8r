// Copyright (c) 2009-2022 SAP SE, All Rights Reserved
sap.ui.define(["sap/base/Log","sap/ushell/services/AppConfiguration","sap/base/util/restricted/_curry","sap/base/util/restricted/_zipObject","sap/ui/VersionInfo","sap/ushell/Config"],function(e,n,t,r,i,a){"use strict";var o="LAUNCHPAD";function u(e){var n=e.applicationType;if(n==="TR"){n="GUI"}return n}function p(){return n.getCurrentApplication().appCapabilities||{}}function c(n){function t(e){return(e.version||"")+(" ("+(e.buildTimestamp||"")+")")||""}if(u(n)==="UI5"){return i.load().then(t).catch(function(){e.error("VersionInfo could not be loaded")})}return undefined}function s(e){return Promise.resolve().then(function(){var n=e.componentInstance;if(n){var t=n.getManifestEntry("/sap.app/applicationVersion/version");return t}return undefined})}function f(e){var n=e.getTechnicalParameter("sap-ach");return n.then(function(e){var n=e&&e[0];if(n){return n}return p().appSupportInfo})}function l(e){function t(){var e=n.getMetadata();return e.technicalName}var r={UI5:function(){var n=e.componentInstance;if(n){var r=n.getMetadata().getManifestEntry("/sap.ui5/componentName");if(!r){r=n.getMetadata().getComponentName()}return r}return t()},TR:function(){return(t()||"").replace(/\s[(]TCODE[)]$/,"")},WDA:t,NWBC:t,URL:function(){return Promise.resolve().then(function(){var e=n.getCurrentApplication();if(e.appCapabilities.technicalAppComponentId){return e.appCapabilities.technicalAppComponentId}return undefined})}};var i=e.applicationType;if(r.hasOwnProperty(i)){return r[i]()}return undefined}function d(e){var n="";return e.getTechnicalParameter("sap-fiori-id").then(function(t){if(e.homePage){if(t&&typeof t[0]==="string"){if(t[0]!==""){n=o+" ("+t[0]+")"}else{n=o}}else{n=o}}else if(t&&typeof t[0]==="string"){n=t[0]}else{n=p().appId||e.inboundPermanentKey}return n})}function m(e){return sap.ushell.Container.getServiceAsync("ReferenceResolver").then(function(n){return new Promise(function(t,r){n.resolveReferences([e]).then(function(n){t(n[e])}).catch(r)})})}function h(e){return Promise.resolve().then(function(){var t=n.getCurrentApplication();var r=u(e);if(r&&r!=="URL"){return r}return t.appCapabilities&&t.appCapabilities.appFrameworkId}).then(function(e){var n={NWBC:"WDA",TR:"GUI"};return n[e]||e})}function v(e,n){return n.getSystemContext().then(function(n){return n.getProperty(e)})}function g(){var e=window.hasher&&window.hasher.getHash();if(!e){return Promise.reject("Could not identify current application hash")}return Promise.resolve().then(function(){return e})}var C={theme:m.bind(null,"User.env.sap-theme-NWBC"),languageTag:m.bind(null,"User.env.sap-languagebcp47"),appIntent:g,appFrameworkId:h,appFrameworkVersion:c,appSupportInfo:f,technicalAppComponentId:l,appId:d,appVersion:s,productName:t(v)("productName")};function I(e){return!C[e]&&/[.]/.test(e)}function P(n,i){var a=n.map(function(n){if(I(n)){C[n]=t(v)(n)}if(!C[n]){e.error(n+" is not a valid app info parameter");return undefined}return C[n](i)});return Promise.all(a).then(function(e){return r(n,e)})}return{getInfo:function(e,n){if(!n){return Promise.reject("Parameter application missing")}return P(["appFrameworkId"],n).then(function(){return P(e,n)})}}},false);