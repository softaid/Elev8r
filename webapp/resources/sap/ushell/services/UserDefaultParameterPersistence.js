// Copyright (c) 2009-2022 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/thirdparty/jquery","sap/base/util/ObjectPath","sap/base/Log"],function(e,t,r){"use strict";var n=["value","extendedValue","noEdit","alwaysAskPlugin","_shellData","pluginData"];function i(e){this._oAdapter=e;this._oData={}}i.prototype._cleanseValue=function(t){var r=e.extend(true,{},t);for(var i in r){if(r.hasOwnProperty(i)&&n.indexOf(i)<0){delete r[i]}}return r};i.prototype._getSystemContextPromise=function(e){if(!e){r.warning("UserDefaultParameterPersistence: The systemContext was not provided, using defaultSystemContext as fallback");return sap.ushell.Container.getServiceAsync("ClientSideTargetResolution").then(function(e){return e.getSystemContext()})}return Promise.resolve(e)};i.prototype.loadParameterValue=function(n,i){var s=new e.Deferred;this._getSystemContextPromise(i).then(function(e){var i=t.get([e.id,n],this._oData);if(i!==undefined){s.resolve(i)}else{this._oAdapter.loadParameterValue(n,e).done(function(i){var a=this._cleanseValue(i);t.set([e.id,n],a,this._oData);r.debug('[UserDefaults] Fetched "'+n+'" for SystemContext='+e.id+" from Persistence",JSON.stringify(a,null,2));s.resolve(a)}.bind(this)).fail(s.reject.bind(this))}}.bind(this));return s.promise()};i.prototype.saveParameterValue=function(n,i,s){var a=new e.Deferred;var o;this._getSystemContextPromise(s).then(function(e){if(!i){return this.deleteParameter(n,e).done(a.resolve).fail(a.reject)}o=this._cleanseValue(i);if(i&&i.noStore===true){r.debug('[UserDefaults] Skipped Save "'+n+'" for SystemContext='+e.id,"noStore=true");return a.resolve()}r.debug('[UserDefaults] Saving "'+n+'" for SystemContext='+e.id+" to Persistence",JSON.stringify(o,null,2));t.set([e.id,n],o,this._oData);return this._oAdapter.saveParameterValue(n,o,e).done(a.resolve).fail(a.reject)}.bind(this));return a.promise()};i.prototype.deleteParameter=function(t,n){var i=new e.Deferred;this._getSystemContextPromise(n).then(function(e){if(this._oData[e.id]){r.debug('[UserDefaults] Deleting "'+t+'" for SystemContext='+e.id+" from Persistence");delete this._oData[e.id][t]}return this._oAdapter.deleteParameter(t,e).done(i.resolve).fail(i.reject)}.bind(this));return i.promise()};i.prototype.getStoredParameterNames=function(t){var r=new e.Deferred;this._getSystemContextPromise(t).then(function(e){this._oAdapter.getStoredParameterNames(e).done(function(e){e.sort();r.resolve(e)}).fail(r.reject.bind(r))}.bind(this));return r.promise()};i.hasNoAdapter=false;return i},true);