/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/base/assert","sap/base/Log"],function(t,e,i){"use strict";var o=t.extend("sap.ui.core.service.Service",{metadata:{abstract:true,library:"sap.ui.core"},constructor:function(i){t.apply(this);if(i){e(typeof i.scopeObject==="object","The service context requires a scope object!");e(typeof i.scopeType==="string","The service context requires a scope type!")}this._oServiceContext=i;if(typeof this.init==="function"){this.init()}}});o.create=function(t){var e=function e(r){for(var n in t){if(!n.match(/^(metadata|constructor|getContext|destroy)$/)){this[n]=t[n]}else{i.warning("The member "+n+" is not allowed for anonymous service declaration and will be ignored!")}}o.apply(this,arguments)};e.prototype=Object.create(o.prototype);return e};o.prototype.getInterface=function(){var t=Object.create(null);for(var e in this){if(!e.match(/^_|^metadata$|^constructor$|^getInterface$|^destroy$|^init$|^exit$|^getContext$/)&&typeof this[e]==="function"){t[e]=this[e].bind(this)}}this.getInterface=function(){return t};return t};o.prototype.getContext=function(){return this._oServiceContext};o.prototype.destroy=function(){if(typeof this.exit==="function"){this.exit()}t.prototype.destroy.apply(this,arguments);delete this._oServiceContext};return o});