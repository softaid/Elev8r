/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/ui/core/util/reflection/JsControlTreeModifier","sap/ui/core/Core","sap/ui/core/Element","sap/ui/fl/apply/_internal/flexState/FlexState","sap/ui/fl/apply/_internal/controlVariants/Utils","sap/ui/fl/apply/api/ControlVariantApplyAPI","sap/ui/fl/apply/api/FlexRuntimeInfoAPI","sap/ui/fl/initial/_internal/changeHandlers/ChangeHandlerStorage","sap/ui/fl/registry/Settings","sap/ui/fl/FlexControllerFactory","sap/ui/fl/Layer","sap/ui/fl/Utils"],function(e,n,t,r,o,a,i,c,l,s,u,f,p){"use strict";var g={};function d(e,t){if(!e.changeSpecificData){return Promise.reject(new Error("No changeSpecificData available"))}if(!e.changeSpecificData.changeType){return Promise.reject(new Error("No valid changeType"))}if(!(e.selectorControl instanceof r)){return Promise.reject(new Error("No valid selectorControl"))}var o=e.selectorControl.getMetadata().getName();return l.getChangeHandler(e.changeSpecificData.changeType,o,e.selectorControl,n,t)}function h(e,t,r){var o=a.getRelevantVariantManagementControlId(t,[],r);return n.getSelector(o,e).id}function m(e){var r=a.getAllVariantManagementControlIds(e);return r.reduce(function(r,o){var a=t.byId(o).getFor();if(a.length){r.push(n.getSelector(o,e).id)}return r},[])}function C(n){e.error(n);return Promise.reject(n)}var v={add:function(n){if(!n.changes.length){return Promise.resolve([])}var t=n.changes[0].selectorElement||n.changes[0].selectorControl;var r=p.getAppComponentForControl(t);var a=c.getFlexReference({element:t});var l=u.createForControl(r);var s=r.getModel(i.getVariantModelName());var m=f.USER;var C=[];function v(){var t=[];return n.changes.reduce(function(o,a){return o.then(function(){a.selectorControl=a.selectorElement;return d(a,m)}).then(function(){if(!n.ignoreVariantManagement){if(!a.changeSpecificData.variantReference){var e=h(r,a.selectorControl,n.useStaticArea);if(e){var t=s.oData[e].currentVariant;a.changeSpecificData.variantReference=t}}}else{delete a.changeSpecificData.variantReference}a.changeSpecificData=Object.assign(a.changeSpecificData,{developerMode:false,layer:m});return l.addChange(a.changeSpecificData,a.selectorControl)}).then(function(e){t.push({changeInstance:e,selectorControl:a.selectorControl})}).catch(function(n){e.error("A Change was not added successfully. Reason: ",n.message)})},Promise.resolve()).then(function(){return t})}function y(n){return n.reduce(function(n,t){return n.then(function(){return l.applyChange(t.changeInstance,t.selectorControl)}).then(function(e){C.push(e)}).catch(function(n){e.error("A Change was not applied successfully. Reason:",n.message)})},Promise.resolve())}return o.initialize({componentId:r.getId()}).then(function(){return v().then(y).then(function(){(g[a]||[]).forEach(function(e){e(C)});return C})})},reset:function(e){if(!e.selectors||e.selectors.length===0){return C("At least one control ID has to be provided as a parameter")}var n=e.selectors[0].appComponent||p.getAppComponentForControl(e.selectors[0]);if(!n){return C("App Component could not be determined")}var t=e.selectors.map(function(e){var t=e.id||e.getId();var r=n.getLocalId(t);return r||t});var r=u.createForControl(n);if(o.isInitialized({control:n})){return r.resetChanges(f.USER,undefined,n,t,e.changeTypes)}return Promise.resolve()},restore:function(e){if(!e||!e.selector){return Promise.reject("No selector was provided")}var n=p.getAppComponentForControl(e.selector);if(!n){return Promise.reject("App Component could not be determined")}var t=u.createForControl(n);if(o.isInitialized({control:n})){return t.removeDirtyChanges(f.USER,n,e.selector,e.generator,e.changeTypes)}return Promise.resolve()},save:function(e){var n=e.selector.appComponent||p.getAppComponentForControl(e.selector);if(!n){return C("App Component could not be determined")}var t=u.createForControl(n);var r=n.getModel(i.getVariantModelName());var a=m(n);if(o.isInitialized({control:n})){return t.saveSequenceOfDirtyChanges(e.changes,n).then(function(e){if(r){r.checkDirtyStateForControlModels(a)}return e})}return Promise.resolve()},buildSelectorFromElementIdAndType:function(e){var n=p.getAppComponentForControl(e.element);if(!n||!e.elementId||!e.elementType){throw new Error("Not enough information given to build selector.")}return{elementId:e.elementId,elementType:e.elementType,appComponent:n,id:e.elementId,controlType:e.elementType}},isCondensingEnabled:function(){return s.getInstance().then(function(e){return e.isCondensingEnabled(f.USER)})},attachChangeCreation:function(e,n){var t=c.getFlexReference({element:e});g[t]=(g[t]||[]).concat(n)},detachChangeCreation:function(e,n){var t=c.getFlexReference({element:e});if(Array.isArray(g[t])){g[t]=g[t].filter(function(e){return e!==n})}},detachAllChangeCreationListeners:function(e){if(e){var n=c.getFlexReference({element:e});delete g[n]}else{g={}}}};return v});