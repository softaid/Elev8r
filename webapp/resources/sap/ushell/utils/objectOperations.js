// Copyright (c) 2009-2022 SAP SE, All Rights Reserved
sap.ui.define([],function(){"use strict";var r={};r.getMember=function(r,e){var n=e.split("."),t=r;if(!r){return undefined}n.forEach(function(r){if(typeof t!=="object"){return undefined}t=t[r.replace(/[|]/g,".")]});return t};r.updateProperties=function(r,e){Object.keys(r).forEach(function(n){if(e.hasOwnProperty(n)){r[n]=e[n]}})};r.getNestedObjectProperty=function(r,e,n){var t="Missing or invalid parameter";if(!r||!Array.isArray(r)||r.length==0||!e){throw new Error(t)}if(Array.isArray(e)&&e.length!=r.length){throw new Error(t)}var i=e;if(!Array.isArray(e)){i=Array.apply(null,Array(r.length)).map(function(){return e})}var u=r.reduce(function(r,e,n){if(r!==undefined){return r}return this.getMember(e,i[n])}.bind(this),undefined);return u!=undefined?u:n};return r},false);