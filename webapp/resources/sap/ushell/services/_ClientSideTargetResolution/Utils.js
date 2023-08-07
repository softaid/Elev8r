// Copyright (c) 2009-2022 SAP SE, All Rights Reserved
sap.ui.define(["sap/base/util/deepExtend"],function(e){"use strict";function r(e,r,t){var n={};r.forEach(function(a){var i=t[a].dominatedBy;var u=i.some(function(t){var n=!!e[t];var i=t!==a;var u=r.indexOf(t)===-1;return n&&u&&i});if(u){n[a]=true}});return n}function t(e){var r={},t={};Object.keys(e).forEach(function(n){var a=e[n].renameTo||n;t[a]=t[a]||{renameTo:a,dominatedBy:[]};t[a].dominatedBy.push(n);t[a].dominatedBy=t[a].dominatedBy.sort();r[n]=t[a]});return r}function n(r,t,n){var a=n?r:e({},r);Object.keys(a).forEach(function(e){if(t(e)===false){delete a[e]}});return a}function a(e,r){var t;t=Object.keys(e).reduce(function(t,n){var a=e[n];if(r(n,a)){t[n]=a}return t},{});return t}function i(e,r){return r.every(function(r){var t,n,a;a=r.name;n=r.options;t=e[a];return Object.keys(n).every(function(e){var r=n[e];if(e==="required"){return!!(t||{}).required===r}return false})})}function u(e,r){var t={};e.forEach(function(e){if(r[e]){t[e]=r[e];delete r[e]}});return t}return{inboundSignatureMeetsParameterOptions:i,filterObjectKeys:n,filterObject:a,constructParameterDominatorMap:t,findDominatedDefaultParameters:r,extractParameters:u}});