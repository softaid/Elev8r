/*!
 * SAPUI5
 * (c) Copyright 2009-2022 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/ui/fl/changeHandler/Base","sap/ui/fl/apply/api/DelegateMediatorAPI","sap/ui/core/util/reflection/JsControlTreeModifier","sap/base/util/merge","sap/base/util/ObjectPath"],function(e,t,r,n,o){"use strict";function i(e){return typeof e==="function"}function a(e,t){return e+"-element"+t}function l(e){var t=false;t=e.field&&(e.field.selector||e.field.id)&&e.field.jsTypes&&e.field.value&&e.field.valueProperty;if(!t){throw new Error("Change does not contain sufficient information to be applied.")}}function u(e,t){var r=n({},e);r.fieldSelector.id=a(r.fieldSelector.id,0);return t.createControlForProperty(r).then(function(r){var n=e.modifier.getId(r.control);e.labelFor=n;return t.createLabel(e).then(function(e){return{label:e,control:r.control}})})}function f(e,t){var r=n({aggregationName:"formElements",payload:e.payload||{}},t);var a=e.instance;return Promise.resolve().then(function(){if(i(a.createLayout)){return a.createLayout(r)}}).then(function(e){if(o.get("control",e)){e.layoutControl=true;return e}return u(r,a)})}var d={};d.applyChange=function(t,r,n){var o=t.getContent();var i=n.modifier;var a=n.appComponent;var u=o.field.selector;var f=n.view;var s=o.field.id;if(i.bySelector(u||s,a,f)){return e.markAsNotApplicable("Control to be created already exists:"+u||s,true)}var c=o.field.index;var g=t.getDependentControl("form",n);var p=g&&i.getFlexDelegate(g);if(!p){l(o);var v;return Promise.resolve().then(i.createControl.bind(i,"sap.ui.comp.smartform.GroupElement",a,f,u||s)).then(function(e){v=e;if(!u){u=i.getSelector(s,a)}t.setRevertData({newFieldSelector:u});return o.field.jsTypes.reduce(function(e,t,r){var n=o.field.valueProperty[r];var l=o.field.value[r];var u=o.field.entitySet;return e.then(this.addElementIntoGroupElement.bind(this,i,f,v,t,n,l,u,r,a))}.bind(this),Promise.resolve())}.bind(this)).then(function(){return i.insertAggregation(r,"groupElements",v,c)})}return d._addFieldFromDelegate(g,r,u,s,c,o.field.value[0],t,i,f,a)};d._addFieldFromDelegate=function(e,r,n,o,i,a,l,u,d,s){var c;var g;return t.getDelegateForControl({control:e,modifier:u}).then(function(t){var r={appComponent:s,view:d,fieldSelector:n||o,bindingPath:a,modifier:u,element:e};return f(t,r)}).then(function(e){g=e;if(!g.layoutControl){return Promise.resolve().then(u.createControl.bind(u,"sap.ui.comp.smartform.GroupElement",s,d,n||o)).then(function(e){c=e;return Promise.resolve().then(u.insertAggregation.bind(u,c,"label",g.label,0,d)).then(u.insertAggregation.bind(u,c,"fields",g.control,0,d)).then(function(){return c})})}return g.control}).then(function(e){return u.insertAggregation(r,"groupElements",e,i,d)}).then(function(){if(g.valueHelp){return u.insertAggregation(e,"dependents",g.valueHelp,0,d)}}).then(function(){if(!n){n=u.getSelector(o,s)}l.setRevertData({newFieldSelector:n,valueHelpSelector:g.valueHelp&&u.getSelector(g.valueHelp,s)})})};d.addElementIntoGroupElement=function(t,r,n,o,i,l,u,f,d){var s;var c=t.getId(n);var g=a(c,f);return Promise.resolve().then(t.createControl.bind(t,o,d,r,g)).then(function(e){s=e;t.bindProperty(s,i,l);t.setProperty(s,"expandNavigationProperties",true);return t.insertAggregation(n,"elements",s,f,r,true)}).then(function(){if(u){t.setProperty(s,"entitySet",u)}}).catch(function(t){return e.markAsNotApplicable(t&&t.message||"Control couldn't be created",true)})};d.completeChangeContent=function(e,t,n){var o=n.appComponent;var i={field:{}};if(t.fieldValues){i.field.value=t.fieldValues}else if(t.bindingPath){i.field.value=[t.bindingPath]}else{throw new Error("oSpecificChangeInfo.fieldValue or bindingPath attribute required")}if(t.valueProperty){i.field.valueProperty=t.valueProperty}else if(t.bindingPath){i.field.valueProperty=["value"]}else{throw new Error("oSpecificChangeInfo.valueProperty or bindingPath attribute required")}if(t.newControlId){i.field.selector=r.getSelector(t.newControlId,o)}else{throw new Error("oSpecificChangeInfo.newControlId attribute required")}if(t.jsTypes){i.field.jsTypes=t.jsTypes}else if(t.bindingPath){i.field.jsTypes=["sap.ui.comp.smartfield.SmartField"]}else{throw new Error("oSpecificChangeInfo.jsTypes or bindingPath attribute required")}if(t.index===undefined){throw new Error("oSpecificChangeInfo.index attribute required")}else{i.field.index=t.index}if(t.entitySet){i.field.entitySet=t.entitySet}e.setContent(i);if(t.relevantContainerId){e.addDependentControl(t.relevantContainerId,"form",n)}};d.revertChange=function(e,t,r){var n=r.appComponent;var o=r.view;var i=r.modifier;var a=e.getRevertData();var l=a.newFieldSelector;var u=i.bySelector(l,n,o);return Promise.resolve().then(i.removeAggregation.bind(i,t,"groupElements",u)).then(function(){i.destroy(u);var t=a.valueHelpSelector;if(t){var l=i.bySelector(t,n,o);var f=e.getDependentControl("form",r);return Promise.resolve().then(i.removeAggregation.bind(i,f,"dependents",l)).then(function(){i.destroy(l)})}}).then(function(){e.resetRevertData()})};d.getCondenserInfo=function(e){return{affectedControl:e.getContent().field.selector,classification:sap.ui.fl.condenser.Classification.Create,targetContainer:e.getSelector(),targetAggregation:"groupElements",setTargetIndex:function(e,t){e.getContent().field.index=t},getTargetIndex:function(e){return e.getContent().field.index}}};d.getChangeVisualizationInfo=function(e){return{affectedControls:[e.getContent().field.selector]}};return d},true);