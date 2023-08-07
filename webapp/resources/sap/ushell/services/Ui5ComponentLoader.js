// Copyright (c) 2009-2022 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/Config","sap/ushell/utils","sap/ushell/services/Ui5ComponentHandle","sap/ushell/services/_Ui5ComponentLoader/utils","sap/ushell/EventHub","sap/ui/thirdparty/jquery"],function(e,o,t,n,s,r){"use strict";function i(e,i,a,c){this._oConfig=c&&c.config||{};this._oAdapter=e;this._logStackTrace=function(e,o){var t=JSON.stringify(e,null,4);n.logInstantiateComponentError(e.name,o+"",o.status,o.stack,t);return Promise.reject(o)};this.modifyComponentProperties=function(e,o){if(!this._oAdapter.modifyComponentProperties){return Promise.resolve(e)}return this._oAdapter.modifyComponentProperties(e.componentProperties,o).then(function(o){e.componentProperties=o;return e})};this.createComponent=function(e,o,t,n){var s=new r.Deferred,i=this;this.createComponentData(e,o,t).then(function(e){return i.modifyComponentProperties(e,n)}).then(function(e){i.instantiateComponent(e).then(s.resolve,s.reject)},function(){s.resolve(e)});return s.promise()};this.createComponentData=function(e,t,s){var r=this;return new Promise(function(i,a){var c={},p=e||{},l=n.shouldLoadCoreExt(p),u=n.shouldUseAmendedLoading(r._oConfig),m=n.shouldLoadDefaultDependencies(p,r._oConfig,u),d=o.getParameterValueBoolean("sap-ushell-nocb"),C=p.applicationDependencies||{};n.logAnyApplicationDependenciesMessages(C.name,C.messages);if(!p.ui5ComponentName){a();return}delete p.loadCoreExt;delete p.loadDefaultDependencies;var f=n.createComponentData(p.componentData||{},p.url,p.applicationConfiguration,p.reservedParameters);if(p.getExtensions){f.getExtensions=p.getExtensions;delete p.getExtensions}if(p.oPostMessageInterface){f.oPostMessageInterface=p.oPostMessageInterface;delete p.oPostMessageInterface}var h=n.constructAppComponentId(t||{}),g=l&&u,P=n.prepareBundle(r._oConfig.coreResourcesComplement),v=n.createComponentProperties(g,m,d,s,p.applicationDependencies||{},p.ui5ComponentName,p.url,h,P);c.componentData=f;c.componentProperties=v;c.appPropertiesSafe=p;c.loadCoreExt=l;i(c)})};this.instantiateComponent=function(e){var o=e.componentProperties;var i=e.componentData;var a=e.appPropertiesSafe;var c=e.loadCoreExt;t.onBeforeApplicationInstanceCreated.call(null,o);var p=new r.Deferred;n.createUi5Component(o,i).then(function(e){var o=new t(e);a.componentHandle=o;var n=c;if(n){a.coreResourcesFullyLoaded=n;s.emit("CoreResourcesComplementLoaded",{status:"success"})}p.resolve(a)}).fail(this._logStackTrace.bind(this,o)).catch(p.reject);return p.promise()};this.getCoreResourcesComplementBundle=function(){return n.prepareBundle(this._oConfig.coreResourcesComplement)};this.loadCoreResourcesComplement=function(){if(!this.loadCoreResourcesComplementPromise){this.loadCoreResourcesComplementPromise=new Promise(function(e,o){var t=n.prepareBundle(this._oConfig.coreResourcesComplement);n.loadBundle(t).then(function(){s.emit("CoreResourcesComplementLoaded",{status:"success"});e()}).catch(function(){s.emit("CoreResourcesComplementLoaded",{status:"failed"});o()})}.bind(this));this.loadCoreResourcesComplementPromise.finally(function(){this.loadCoreResourcesComplementPromise=undefined}.bind(this))}return this.loadCoreResourcesComplementPromise};s.once("loadCoreResourcesComplement").do(function(){this.loadCoreResourcesComplement()}.bind(this))}i.hasNoAdapter=false;return i});